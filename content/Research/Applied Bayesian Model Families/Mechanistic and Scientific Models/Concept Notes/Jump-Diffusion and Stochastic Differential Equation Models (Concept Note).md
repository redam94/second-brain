---
title: "Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/stochastic-differential-equations
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Merton 1976, J. Financial Economics 3:125-144; Kou 2002, Management Science 48:1086-1101; Eraker, Johannes & Polson 2003, J. Finance 58:1269-1300)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
used_by:
  - "[[Chen 2018 - Scope, Limitations and Statistical Use]]"
aliases:
  - Merton jump diffusion
  - compound Poisson jump model
  - SDE likelihood Euler-Maruyama
---

# Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)

> [!summary]
> Concept note, no raw source. A jump-diffusion adds a compound-Poisson process to a Brownian SDE. For constant coefficients the transition density of the log-return over an interval $\Delta$ is an *exact Poisson mixture of normals* (Merton 1976), so the likelihood is available by summing out the jump count; Euler discretization of the SDE is only an approximation and misattributes jumps to volatility. This is the pattern behind PyMC example E49 (S&P 500 jumps).

## Overview

A pure diffusion $dX=\mu\,dt+\sigma\,dW$ cannot produce the heavy tails of daily returns (excess kurtosis far above 0). Adding rare large jumps does, and the mixture structure makes inference tractable. The same idea (a latent count summed out of a mixture likelihood) reappears for clone counts in [[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]].

## Main Content

> [!definition] Merton jump-diffusion for log-prices
> $$
> d\log S_t=(\mu-\tfrac12\sigma^2)\,dt+\sigma\,dW_t+J\,dN_t,\qquad N_t\sim\text{Poisson process}(\lambda),\quad J\sim N(\mu_J,\sigma_J^2).
> $$
> $\lambda$ jump intensity (per unit time), $\mu_J,\sigma_J$ jump-size mean and sd. (Written as the log-price process without the compensator for the mean jump.)
^def-merton-jd

> [!theorem] Poisson-mixture transition density
> The log-return $r=\log S_{t+\Delta}-\log S_t$ has density
> $$
> p(r\mid\theta)=\sum_{n=0}^{\infty}\frac{e^{-\lambda\Delta}(\lambda\Delta)^n}{n!}\ \mathcal N\!\big(r;\ (\mu-\tfrac12\sigma^2)\Delta+n\mu_J,\ \sigma^2\Delta+n\sigma_J^2\big).
> $$
> *Reason:* conditional on $n$ jumps in the interval, the return is the Brownian increment plus a sum of $n$ independent normal jumps, which is normal with the stated mean and variance; weight by the Poisson probability of $n$.
^thm-merton-mixture

In practice truncate at $n_{\max}\approx 10$-30 (the Poisson tail beyond is negligible when $\lambda\Delta$ is small), or use `pm.Mixture` / `logsumexp` over $n$ so the discrete jump count is *summed out* and NUTS sees only continuous parameters.

| Aspect | Euler-Maruyama on a daily grid | Exact Poisson mixture |
|---|---|---|
| Likelihood | Normal increments plus a Bernoulli jump per step | Poisson-weighted sum of normals |
| Bias | At most one jump per step, and large jumps appear as volatility | None in constant-coefficient case |
| Latent jumps | Needed (discrete, hard for HMC) | Summed out |
| Identification | Jump size and volatility trade off, especially with daily data | Same, but via tails: $\lambda,\sigma_J$ governed by kurtosis |

**Identification.** With $\lambda\Delta$ small, a few big returns identify $\lambda,\mu_J,\sigma_J$; if jumps are frequent and small the model collapses to a diffusion with larger $\sigma$ (the "jumps absorbing volatility" issue). Priors that enforce $\lambda\ll1/\Delta$ and $\sigma_J>\sigma\sqrt\Delta$ help.

**Extensions.** Kou (2002): double-exponential jumps (asymmetry); stochastic volatility and jumps in volatility (Eraker, Johannes & Polson 2003) require latent-state methods (particle filters, MCMC data augmentation).

## Examples

**Density check and kurtosis (runs; verified).**
```python
import numpy as np
from scipy import stats
mu, sig, lam, muJ, sJ, dt = 0.0004, 0.01, 0.05, -0.02, 0.04, 1.0     # daily
def merton_pdf(x, nmax=30):
    n = np.arange(nmax); w = stats.poisson.pmf(n, lam*dt)
    m = (mu - 0.5*sig**2)*dt + n*muJ; s = np.sqrt(sig**2*dt + n*sJ**2)
    return (w[:, None]*stats.norm.pdf(x[None, :], m[:, None], s[:, None])).sum(0)
x = np.linspace(-0.4, 0.4, 40001); f = merton_pdf(x)
print(np.trapezoid(f, x))                                   # 1.0
rng = np.random.default_rng(0); N = rng.poisson(lam*dt, 400000)
r = (mu-0.5*sig**2)*dt + sig*np.sqrt(dt)*rng.normal(size=N.size) + N*muJ + np.sqrt(N)*sJ*rng.normal(size=N.size)
print(stats.kurtosis(r))                                    # about 14: heavy tails from 5% jump days
```
Simulation mean/variance (-0.00064, 0.00020) match the density's moments (-0.00065, 0.00020).

**PyMC sketch (untested).**
```python
with pm.Model() as jd:
    mu, sig = pm.Normal("mu", 0, 0.01), pm.HalfNormal("sig", 0.02)
    lam, muJ, sJ = pm.Beta("lam", 1, 20), pm.Normal("muJ", 0, 0.05), pm.HalfNormal("sJ", 0.05)
    n = np.arange(15)
    comps = pm.Normal.dist((mu-0.5*sig**2)+n*muJ, pt.sqrt(sig**2 + n*sJ**2))
    pm.Mixture("r", w=pt.exp(pm.logp(pm.Poisson.dist(lam), n)), comp_dists=comps, observed=returns)
```

## Relevance to marketing measurement

Heavy-tailed daily series (viral spikes, outages, stock-outs) are better modelled with a jump component than by inflating Gaussian variance, which would otherwise make credible intervals for ordinary days far too wide. Jump days also contaminate adstock and elasticity estimates if left as Gaussian noise; the mixture lets those days be down-weighted automatically. Related: robust likelihoods in [[Tail Behavior and Prior-Likelihood Conflict]].

## Connections

[[Linear-Gaussian State-Space Models]], [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]] (process noise), [[Monsters and Mixtures]] (mixture likelihoods and identification).

## See Also

[[Likelihoods Built on Differential Equations (Concept Note)]], [[Chen 2018 - Latent ODE Time-Series Model]].
