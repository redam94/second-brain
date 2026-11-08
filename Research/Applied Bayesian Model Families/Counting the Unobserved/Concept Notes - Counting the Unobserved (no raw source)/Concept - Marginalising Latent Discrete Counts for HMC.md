---
title: "Concept - Marginalising Latent Discrete Counts for HMC"
tags:
  - source/ingested
  - topic/population-estimation
  - type/concept
  - doc/paper
source: "Concept note, no raw source (sources: MacKenzie et al. 2002; Barker et al. 2018; Silverman 2020; PyMC documentation)"
source_location: "n/a (synthesis)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Concept Notes - Counting the Unobserved (no raw source)"
doc_type: concept
depends_on:
  - "[[MacKenzie 2002 - Occupancy Model and Likelihood]]"
  - "[[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]"
used_by:
  - "[[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]"
aliases:
  - summing out discrete latent variables
  - marginalisation for NUTS
  - pymc_extras marginalize
---

# Concept - Marginalising Latent Discrete Counts for HMC

> [!summary]
> Hamiltonian Monte Carlo cannot sample integer latents directly. For occupancy, N-mixture and latent-class models the discrete variable (presence $z_i$, abundance $N_i$, class $c_i$) has a small or truncatable support, so it is summed out of the likelihood in log space and, if needed, recovered afterwards from its conditional posterior.

## Overview

Every model in this cluster has a likelihood of the form $p(y\mid\theta)=\sum_{z}p(z\mid\theta)\,p(y\mid z,\theta)$ with independent units. Removing $z$ turns a mixed discrete-continuous posterior into a smooth continuous one that NUTS can handle, usually improves effective sample size, and makes the model compatible with `pm.CustomDist` / `pm.Potential` or `pymc_extras.marginalize` (as in PyMC example E28 and E109, where classes are "summed out").

## Main Content

> [!definition] Log-space marginalisation
> For unit $i$ with finite support $\mathcal Z$: $\ell_i(\theta)=\operatorname{logsumexp}_{z\in\mathcal Z}\big[\log p(z\mid\theta)+\log p(y_i\mid z,\theta)\big]$. Use `logsumexp` (never exponentiate and add) to avoid underflow in products over visits.
^def-marginalise-logsumexp

| Model | Latent | Support | Marginal log-likelihood per unit |
|---|---|---|---|
| Occupancy ([[MacKenzie 2002 - Occupancy Model and Likelihood]]) | $z_i\in\{0,1\}$ | 2 values | detected: $\log\psi+\sum_t\log p(y_{it}\mid z{=}1)$; not detected: $\operatorname{logaddexp}(\log\psi+\sum_t\log(1-p_{it}),\log(1-\psi))$ |
| N-mixture ([[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]) | $N_i\in\{0,1,\dots\}$ | unbounded; truncate at $N_{\max}$ | $\operatorname{logsumexp}_{N=\max_jy_{ij}}^{N_{\max}}\big[\log\text{Pois}(N;\lambda_i)+\sum_j\log\text{Bin}(y_{ij};N,p_{ij})\big]$ |
| Latent class ([[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]) | $c_i\in\{1..J\}$ | $J$ values | $\operatorname{logsumexp}_j[\log\nu_j+\sum_k\log\text{Bern}(y_{ik};\lambda_{jk})]$ |
| MSE data augmentation | inclusion indicator of $M-n$ unseen slots | 2 values | $\operatorname{logaddexp}(\log\omega+\sum_k\log(1-p_k),\log(1-\omega))$ |

> [!theorem] Truncation error for the N-mixture sum
> Let $\mu=\lambda_i$. The neglected tail is $P(N_i>N_{\max})\cdot$(likelihood bound $\le1$), so the marginal likelihood error per site is at most $P(\text{Pois}(\mu)>N_{\max})$. Choose $N_{\max}$ so this is below tolerance at the largest plausible $\mu$ (e.g. $N_{\max}=\max_{ij}y_{ij}+$ several multiples of $\sqrt{\mu}+$ margin), and **re-run with a larger $N_{\max}$ as a check**: if estimates drift, the truncation (or an unidentified $N$; see [[Barker 2018 - Poisson Alternative and Model Discrimination]]) is driving the result. The same issue arises with the dark-figure grid in Madigan-York ([[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]).
^thm-truncation-check

**Recovering the latent values.** After sampling $\theta$, draw $z_i$ from $p(z_i\mid y_i,\theta)\propto p(z_i\mid\theta)p(y_i\mid z_i,\theta)$: for occupancy, $P(z_i=1\mid\text{all zeros})=\psi\prod(1-p)/[\psi\prod(1-p)+1-\psi]$; for detected sites $z_i=1$. This is how finite-sample occupancy (the number of occupied sites among those surveyed) is reported: sum the sampled $z_i$ (E28).

**Pitfalls.** (1) Label switching in latent classes: mixture components are exchangeable, so chains can swap labels; constrain by ordering (e.g. $\lambda_{j1}$ increasing) or a better-than-chance (Youden) constraint for diagnostic raters (E69). (2) Weak identification: marginalisation does not create information; a flat marginal likelihood in $(N,p)$ gives a ridge that HMC will show as divergences or high $\hat R$ ([[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]). (3) Existing vault note on the sampling trouble discrete latents cause: [[Sampling Problems with Latent Variables - No Vehicles in the Park]].

## Examples

> [!example] N-mixture marginal in numpy and in PyMC (untested PyMC)
> ```python
> import numpy as np
> from scipy.special import logsumexp
> from scipy.stats import poisson, binom
> def nmix_loglik(y, lam, p, Nmax=200):         # y: (J,) counts at one site
>     N = np.arange(y.max(), Nmax+1)
>     lp = poisson.logpmf(N, lam) + sum(binom.logpmf(yj, N, p) for yj in y)
>     return logsumexp(lp)
> print(nmix_loglik(np.array([3, 5, 2]), lam=10, p=0.4))
> ```
> PyMC 5:
> ```python
> import pymc as pm, pytensor.tensor as pt
> # y: (I, J) ints; Nmax int
> N = pt.arange(Nmax + 1)[None, :]                       # (1, Nmax+1)
> with pm.Model() as nm:
>     lam = pm.Gamma("lam", 2, 0.1); p = pm.Beta("p", 2, 2)
>     logp_N = pm.logp(pm.Poisson.dist(lam), N)           # (1, Nmax+1)
>     ll = 0
>     for j in range(y.shape[1]):
>         ll += pm.logp(pm.Binomial.dist(n=N, p=p), y[:, [j]])   # (I, Nmax+1); -inf where N<y
>     pm.Potential("lik", pt.sum(pm.math.logsumexp(logp_N + ll, axis=1)))
> ```
> Alternative: declare `N = pm.Poisson("N", ...)` and let `pymc_extras.marginalize(model, ["N"])` generate the sum automatically (as E28 checks against its hand-written version).

> [!example] Why it matters for marketing models
> Many marketing models have discrete latents: customer segments (latent class), churn state (alive/dead in BG/NBD), conversion-attribution paths. The same recipe applies: sum the segment out, keep the segment-posterior as a derived quantity. See [[Monsters and Mixtures]] for mixture likelihoods and [[Hierarchical Models]] for the continuous-latent analogue.

## Connections

- Zero-inflated Poisson is the two-support case: [[Monsters and Mixtures]].
- Calibration check of marginalised models: [[SBC Case Studies]], [[Posterior Predictive Checking]].

## See Also

- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
