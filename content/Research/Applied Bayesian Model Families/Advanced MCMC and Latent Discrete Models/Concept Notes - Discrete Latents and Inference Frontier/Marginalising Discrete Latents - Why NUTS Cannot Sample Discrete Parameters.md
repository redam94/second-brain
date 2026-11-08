---
title: "Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/concept
source: "concept note, no raw source"
source_location: "Concept note, no raw source (Stan User's Guide on latent discrete parameters; Carlin, Gelfand and Smith 1992; Neal 2020 as cited in MEADS)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Concept Notes - Discrete Latents and Inference Frontier"
doc_type: concept
depends_on:
  - "[[Efficient MCMC]]"
  - "[[HMC and Stan in Practice]]"
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
used_by:
  - "[[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]"
  - "[[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]"
aliases:
  - "Marginalising discrete parameters"
  - "Changepoint marginalisation"
  - "Why NUTS cannot sample discrete variables"
---

# Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters

> [!summary]
> Hamiltonian samplers (HMC, NUTS, ChEES, MEADS) move along gradients of the log density in continuous space, so a discrete parameter (changepoint index, mixture assignment, hidden state) cannot be a sampled coordinate. The standard fix is to sum the discrete variable out analytically, $p(y\mid\theta)=\sum_zp(y,z\mid\theta)$, sample only continuous parameters, and recover $p(z\mid y,\theta)$ afterwards. This note is a concept note: it cites the literature and has no raw source in the vault.

## Overview

**Motivating PyMC example:** **E04** "Changepoints and discrete latents" (UK coal-mining disasters; "why NUTS cannot do discrete, compound steps, marginalisation"), from [the examples page](https://redam94.github.io/pymc-challenges/examples.html). Related: E24 (HMM), E59 (kinesin dwell-time HMM).

## Main Content

> [!definition] Why gradient-based samplers need continuous parameters
> HMC augments $\theta\in\mathbb R^D$ with momentum and integrates Hamilton's equations, which use $\nabla_\theta\log p(\theta)$ (see [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]). A discrete $z\in\{1..K\}$ has no gradient and no continuous flow; a leapfrog step cannot move it. NUTS/HMC in PyMC therefore only apply to the continuous block.
^def-no-gradient-discrete

**Compound steps.** PyMC's fallback is a *compound step*: NUTS updates the continuous parameters while a Metropolis or categorical-Gibbs step updates each discrete variable. This is valid but can mix badly: when $z$ and $\theta$ are strongly coupled (a changepoint location and the two rates it separates) the discrete move is conditioned on current rates and vice versa, producing the same slow, Gibbs-like random walks that Betancourt & Girolami describe ([[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]). Gradient-based adaptation (step size, ChEES trajectory length) also sees a target that changes whenever $z$ jumps.

> [!theorem] Marginalisation
> If the discrete variable has a finite state space, $p(y\mid\theta)=\sum_{z}p(z\mid\theta)\,p(y\mid z,\theta)$ is a finite sum, differentiable in $\theta$. Sampling $\theta\mid y$ from this marginal is exactly equivalent (it is the marginal posterior of $\theta$), usually mixes far better, and the discrete posterior is recovered by Rao-Blackwellisation: $p(z\mid y)=\mathbb E_{\theta\mid y}[p(z\mid y,\theta)]$, with $p(z\mid y,\theta)\propto p(z\mid\theta)p(y\mid z,\theta)$ computed for each posterior draw. In log space use `logsumexp`.
^thm-marginalisation

> [!example] Changepoint model (coal-mining disasters)
> Data (Jarrett 1979; the setting of Carlin, Gelfand and Smith 1992): yearly counts $y_t$, $t=1..T$ ($T=112$ years, 1851-1962), of coal-mining disasters. Model: switchpoint $s\sim\text{DiscreteUniform}\{1..T-1\}$; rates $\lambda_1,\lambda_2$ with Exponential or Gamma priors; $y_t\sim\text{Poisson}(\lambda_1)$ for $t\le s$ and $\text{Poisson}(\lambda_2)$ for $t>s$. In the literature the analysis finds a drop in the rate around 1890 (roughly three per year before, one per year after); these figures are from the commonly reported analyses, not from a vault source.
> **Marginal likelihood.** $p(y\mid\lambda_1,\lambda_2)=\dfrac1{T-1}\sum_{s=1}^{T-1}\Big[\prod_{t\le s}\text{Pois}(y_t\mid\lambda_1)\prod_{t>s}\text{Pois}(y_t\mid\lambda_2)\Big]$, evaluated in $O(T)$ with cumulative sums of log pmf (prefix sum for $\lambda_1$, suffix sum for $\lambda_2$).
> **Recovering the changepoint.** $p(s\mid y,\lambda_1,\lambda_2)\propto$ the $s$-th summand, averaged over posterior draws of $(\lambda_1,\lambda_2)$.
^ex-coal-changepoint

```python
import numpy as np
from scipy.special import logsumexp
from scipy.stats import poisson
rng = np.random.default_rng(0)
T, s_true = 112, 40
y = np.r_[rng.poisson(3.0, s_true), rng.poisson(1.0, T - s_true)]     # simulated, NOT the real coal data

def log_marginal(y, l1, l2):
    c1 = np.cumsum(poisson.logpmf(y, l1))                  # prefix sums: first s obs under l1
    c2 = np.cumsum(poisson.logpmf(y, l2)[::-1])[::-1]      # suffix sums: obs after s under l2
    s = np.arange(1, len(y))
    lj = c1[s-1] + c2[s] - np.log(len(y) - 1)              # uniform prior over s
    return logsumexp(lj), lj                               # (log p(y|l1,l2), log joint per s)

lm, lj = log_marginal(y, 3.0, 1.0)
post_s = np.exp(lj - lm)
print(1 + post_s.argmax(), post_s[36:43].sum())            # MAP s = 40; 0.58 mass within +-3 of the true switch
```
(Tested: the sum matches brute-force enumeration to machine precision, $-186.936$ for the simulated series.)

> [!example] Mixture models
> $p(y_i\mid\theta)=\sum_{k=1}^Kw_k\,f_k(y_i\mid\theta_k)$: assignments $z_i$ are summed out per observation in $O(KN)$ via `logsumexp`; responsibilities $r_{ik}=w_kf_k(y_i)/\sum_jw_jf_j(y_i)$ recover them. Marginalising introduces label switching (below and in [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]); compare [[Monsters and Mixtures]].
^ex-mixture-marginal

> [!example] Hidden Markov models
> The hidden path $z_{1:T}$ has $K^T$ configurations but the forward algorithm sums them out in $O(K^2T)$ ([[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]). Changepoints are the special case of a left-right chain with one transition.
^ex-hmm-marginal

**When marginalisation is infeasible.** If the joint discrete state space is exponentially large and does not factorise (e.g. many interacting discrete variables), alternatives are Gibbs/Metropolis blocks for the discrete part, interleaving GHMC with Gibbs updates (Neal 2020, noted as a future direction in [[Hoffman 2022 - MEADS - Experiments and Ablations]]), or approximate continuous relaxations (Concrete/Gumbel-softmax; Maddison et al. 2017, Jang et al. 2017), which are biased.

## Examples (PyMC-style)

Untested PyMC 5 sketch of the marginalised changepoint (E04):
```python
import numpy as np, pymc as pm, pytensor.tensor as pt
T = len(y); s = np.arange(1, T)
with pm.Model():
    l1 = pm.Exponential("l1", 1.0); l2 = pm.Exponential("l2", 1.0)
    lp1 = pm.logp(pm.Poisson.dist(l1), y); lp2 = pm.logp(pm.Poisson.dist(l2), y)
    c1 = pt.cumsum(lp1); c2 = pt.cumsum(lp2[::-1])[::-1]
    lj = c1[s-1] + c2[s] - np.log(T-1)
    pm.Potential("marg", pt.logsumexp(lj))
    pm.Deterministic("logpost_s", lj - pt.logsumexp(lj))     # recover p(s | y, theta) per draw
    idata = pm.sample()                                      # NUTS on the continuous rates only
```
Recent `pymc_extras` also offers an automatic `marginalize` transform for finite discrete variables (as used in E24); check its documentation for the current API.

## Relevance to marketing measurement

Discrete latents recur in measurement models: structural breaks in baseline sales or attribution (changepoints), customer-segment membership (mixtures), and regime states (HMMs). Marginalisation keeps the model compatible with gradient-based Bayesian fitting used in MMM tooling.

## Connections

[[Efficient MCMC]], [[HMC and Stan in Practice]]; hidden-state models: [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]; existing mixture note: [[Monsters and Mixtures]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]

## References (cited, not ingested)
Jarrett, R.G. (1979) *A note on the intervals between coal-mining disasters*, Biometrika 66; Carlin, B.P., Gelfand, A.E. and Smith, A.F.M. (1992) *Hierarchical Bayesian analysis of changepoint problems*, JRSS C 41; Neal, R.M. (2020) arXiv:2001.11950 (as cited in Hoffman and Sountsov 2022); Maddison, Mnih and Teh (2017) *The Concrete distribution*, ICLR; Jang, Gu and Poole (2017) *Categorical reparameterization with Gumbel-softmax*, ICLR; Stan Development Team, *Stan User's Guide*, chapters on latent discrete parameters and HMMs (HTML only, https://mc-stan.org/docs/).
