---
title: "Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/concept
source: "concept note, no raw source"
source_location: "Concept note, no raw source (Rabiner 1989 is the vault source for the algorithms; extensions from Hughes and Guttorp 1994; Stephens 2000; Jasra et al. 2005; Langrock and Zucchini 2011; Zucchini, MacDonald and Langrock 2016; Morales et al. 2004)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Concept Notes - Discrete Latents and Inference Frontier"
doc_type: concept
depends_on:
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
  - "[[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]"
  - "[[Model Building with Latent Variables - Animal Movement]]"
used_by:
  - "[[Rabiner 1989 - HMM Tutorial - Overview]]"
aliases:
  - "Bayesian hidden Markov models"
  - "Label switching and ordering constraints in Bayesian HMMs"
  - "Non-homogeneous HMM"
  - "HMM dwell times"
---

# Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times

> [!summary]
> A Bayesian HMM places priors on the transition rows and emission parameters, marginalises the hidden path with the forward algorithm, samples the continuous parameters with NUTS, and decodes states per posterior draw with forward-backward and Viterbi. The posterior is invariant to relabelling states (label switching), handled by ordering constraints; covariate-driven (non-homogeneous) transitions use softmax rows; geometric dwell times are a model assumption that hidden semi-Markov or phase-type constructions relax. This is a concept note with no raw source; the algorithms are those of [[Rabiner 1989 - HMM Tutorial - Overview]].

## Overview

**Motivating PyMC examples** (from [the examples page](https://redam94.github.io/pymc-challenges/examples.html)): **E24** HMMs (USGS M7+ earthquake counts 1900-2024; elk GPS tracks of Morales et al. 2004; forward algorithm in `pytensor.scan` vs `pymc_extras` `DiscreteMarkovChain` + `marginalize`; label switching and ordering; forward-backward and Viterbi per draw; dwell times; pseudo-residuals; integrated LOO and leave-future-out; padded multi-track HMM), **E48** Bayesian NHMM for a seasonally forced Lorenz-84 system (seasonal softmax transitions, choosing regime variables), **E59** kinesin stepping (hypoexponential dwells, 2-phase lattice HMM, ordered rates and label switching), **E57** single-particle tracking (diffusion-state mixtures, GPB1 switching HMM in `scan`).

## Main Content

> [!definition] Bayesian HMM
> Hidden states $z_t\in\{1..K\}$, $z_1\sim\pi$, $P(z_t=j\mid z_{t-1}=i)=A_{ij}$; emissions $y_t\mid z_t=k\sim f(\cdot\mid\theta_k)$. Priors: rows $A_{i\cdot}\sim\text{Dirichlet}(\alpha_i)$, $\theta_k\sim p(\theta)$, $\pi$ fixed, Dirichlet or the stationary distribution of $A$. The marginal likelihood $p(y\mid A,\theta,\pi)$ is the forward algorithm ([[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]); the discrete path is never sampled ([[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]]).
^def-bayes-hmm

**Learning: EM vs Bayesian.** Baum-Welch ([[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]) returns a local MLE. The Bayesian version gives posterior uncertainty on $A,\theta$, allows informative priors (e.g. sticky self-transitions), and quantifies uncertainty of the decoded regime path by decoding per draw: for each posterior draw run forward-backward to get $\gamma_t^{(s)}(k)$ and optionally Viterbi, then average.

> [!theorem] Label switching
> The HMM likelihood and any exchangeable prior are invariant to permuting state labels: for a permutation matrix $P$, $p(y\mid A,\theta,\pi)=p(y\mid PAP^\top,P\theta,P\pi)$, so the posterior has $K!$ equivalent modes. Chains may sit in different modes, or one chain may jump between them, making marginal summaries of "state 1" meaningless. Verified numerically on a simulated 2-state Poisson HMM: log-likelihood $-1145.0417$ for both the original and the swapped parameters.
> **Remedies:** (i) **ordering constraint** on an emission parameter, e.g. ordered means or rates (`pm.Normal(..., transform=pm.distributions.transforms.ordered)`), valid when states are separated along that parameter; (ii) relabel by post-processing (Stephens 2000; Jasra, Holmes and Stephens 2005); (iii) summarise label-invariant quantities (state-averaged predictions, the posterior of $\sum_t\mathbf 1[z_t=k]$ after sorting). Ordering fails when states overlap in the ordered parameter: the constraint then cuts through a mode and distorts the posterior.
^thm-label-switching

> [!definition] Non-homogeneous HMM (NHMM; Hughes and Guttorp 1994)
> Transitions depend on covariates $x_t$: $P(z_t=j\mid z_{t-1}=i,x_t)=\text{softmax}_j(\beta_{ij0}+\beta_{ij}^\top x_t)$ with a reference category per row. The forward recursion is unchanged except $A\to A_t$: $\alpha_t(j)=b_j(y_t)\sum_i\alpha_{t-1}(i)A_{t,ij}$. E48 uses seasonal terms $x_t=(\sin\tfrac{2\pi t}{365},\cos\tfrac{2\pi t}{365})$ so regime persistence varies through the year; the choice of regime variable (E48: eddy amplitude rather than phase) is a modelling decision outside the HMM machinery.
^def-nhmm

> [!definition] HMMs for movement and step data (E24; Morales et al. 2004)
> Observations are step lengths $\ell_t$ (gamma or Weibull) and turning angles $\psi_t$ (von Mises or wrapped Cauchy); states are behavioural modes (encamped/exploring/travelling) with state-specific parameters. Tracks are conditionally independent given parameters, so the likelihood is a sum over tracks of forward log-likelihoods (the "padded multi-track HMM" runs one batched recursion with masks). See [[Model Building with Latent Variables - Animal Movement]] for the vault's treatment of latent movement models.
^def-movement-hmm

> [!theorem] Dwell times in HMMs and hidden semi-Markov alternatives
> In an HMM the dwell time in state $i$ is geometric: $P(D=d)=A_{ii}^{d-1}(1-A_{ii})$, mean $1/(1-A_{ii})$, mode at 1 ([[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]], eq. 5). Options when this is wrong: (i) explicit-duration (semi-Markov) HMMs ([[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]], eq. 68; cost $\propto D^2$); (ii) **phase-type** dwell: replace a state by a chain of $r$ sub-states with ordered rates (hypoexponential/Erlang dwell), as in E59's 2-phase lattice HMM for kinesin steps, which needs ordered rates to avoid label switching; (iii) negative-binomial dwell via state aggregates (Langrock and Zucchini 2011).
^thm-dwell

> [!example] Posterior dwell-time summary (illustration)
> Given draws $A^{(s)}$, the implied mean dwell of state $i$ is $1/(1-A^{(s)}_{ii})$; report its posterior median and interval. For $A_{ii}=0.9$ this is 10 steps; for $0.99$, 100 steps. A dwell histogram from the decoded paths can be compared against the geometric implied by $A_{ii}$ as a model check: systematic departure (a mode away from 1) points to semi-Markov or phase-type structure.
^ex-dwell-summary

**Model checking.** *Pseudo-residuals* (Zucchini, MacDonald and Langrock 2016): with one-step predictive state probabilities $\hat\pi_t=\hat\alpha_{t-1}A$ (filtered $\hat\alpha_{t-1}$), $u_t=\sum_j\hat\pi_t(j)F_j(y_t)$ (randomised for discrete data), $r_t=\Phi^{-1}(u_t)$, which should look iid $\mathcal N(0,1)$ if the model is right. *Predictive comparison:* integrated LOO (leave out $y_t$ and integrate the hidden path) vs leave-future-out (refit to $y_{1:t}$, predict $y_{t+1}$), per E24.

> [!example] Single-particle tracking connection (E57)
> Diffusion in several states (immobile, slow, fast) is a mixture of Brownian motions with diffusion coefficients $D_k$; allowing particles to switch states within a track gives a switching state-space model. The exact marginal over continuous state and discrete regime is intractable for general linear-Gaussian switching, so first-order generalised pseudo-Bayes (GPB1) collapses the mixture of Gaussian filter outputs to one Gaussian at each step (the standard Bar-Shalom approach). E57 implements the GPB1 filter in `pytensor.scan`. Connection to [[The Kalman Filter]]: each regime runs a Kalman filter, and regime probabilities follow an HMM-style recursion.
^ex-spt

```python
import numpy as np
from scipy.special import logsumexp, softmax
from scipy.stats import poisson
def nh_forward(y, X, lam, pi, beta0, beta):
    N = len(lam)
    def A_t(x):                                         # softmax rows with reference category 0
        A = np.zeros((N, N))
        for i in range(N):
            lg = beta0[i] + beta[i] @ x; A[i] = softmax(lg - lg[0])
        return A
    la = np.log(pi) + poisson.logpmf(y[0], lam)
    for t in range(1, len(y)):
        la = poisson.logpmf(y[t], lam) + logsumexp(la[:, None] + np.log(A_t(X[t])), axis=0)
    return logsumexp(la)
# Tested on a simulated 730-day NHMM with seasonal sin/cos covariates (finite loglik); the permutation invariance above was checked for the homogeneous version.
```

## Examples (PyMC-style)

Untested sketch of an ordered-rate Poisson HMM with Dirichlet rows (E24, earthquake counts):
```python
import numpy as np, pymc as pm, pytensor, pytensor.tensor as pt
K = 2
with pm.Model() as hmm:
    A = pm.Dirichlet("A", a=np.full((K, K), 1.0) + 8*np.eye(K), shape=(K, K))   # sticky prior
    lam = pm.Gamma("lam", 2, 0.5, shape=K, transform=pm.distributions.transforms.ordered,
                   initval=np.array([2.0, 10.0]))                              # ordering breaks label switching
    pi = pt.ones(K)/K
    logB = pm.logp(pm.Poisson.dist(lam), y[:, None])
    def step(lb, la_prev, logA): return lb + pt.logsumexp(la_prev[:, None] + logA, axis=0)
    la, _ = pytensor.scan(step, sequences=logB[1:], outputs_info=pt.log(pi) + logB[0], non_sequences=pt.log(A))
    pm.Potential("loglik", pt.logsumexp(la[-1]))
    idata = pm.sample()
```
Then decode each draw with the `forward`/`backward`/`viterbi` functions from [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]].

## Relevance to marketing measurement

Regime-switching baselines (promotion vs normal periods), customer lifecycle states with seasonal drivers (NHMM), and dwell-time structure in engagement sessions are direct analogues. Note that naive per-draw state decoding conveys regime uncertainty that a single Viterbi path hides, which matters for attribution that depends on the regime label.

## Connections

[[Rabiner 1989 - HMM Tutorial - Overview]], [[Model Building with Latent Variables - Animal Movement]], [[State-Space Models and the Kalman Filter - Overview]], [[Marginal Likelihood via the Kalman Filter]], [[Hierarchical Models]] (hierarchy across tracks or cells).

## See Also
[[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]], [[Stochastic Volatility and the Inference Frontier]]

## References (cited, not ingested)
Hughes, J.P. and Guttorp, P. (1994) *A class of stochastic models for relating synoptic atmospheric patterns to regional hydrologic phenomena*, Water Resources Research 30; Stephens, M. (2000) *Dealing with label switching in mixture models*, JRSS B 62; Jasra, A., Holmes, C.C. and Stephens, D.A. (2005) *Markov chain Monte Carlo methods and the label switching problem in Bayesian mixture modelling*, Statistical Science 20; Langrock, R. and Zucchini, W. (2011) *Hidden Markov models with arbitrary state dwell-time distributions*, CSDA 55; Zucchini, W., MacDonald, I.L. and Langrock, R. (2016) *Hidden Markov Models for Time Series*, 2nd ed., CRC; Morales, J.M. et al. (2004) *Extracting more out of relocation data*, Ecology 85; Bar-Shalom, Li and Kirubarajan (2001) *Estimation with Applications to Tracking and Navigation*.
