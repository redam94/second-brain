---
title: "Betancourt 2015 - Hierarchical Geometry and the Funnel"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Sec. I, pp. 1-2; eqs 1-2; Figures 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
used_by:
  - "[[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]"
  - "[[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]"
aliases:
  - "Funnel distribution"
  - "Hierarchical model pathologies"
---

# Betancourt 2015 - Hierarchical Geometry and the Funnel

> [!summary]
> A hierarchical model groups local parameters $\theta_i$ under shared global parameters $\phi$. With sparse data the posterior is a funnel: a region of high density but low volume below a region of low density but high volume, with comparable probability mass and sharply varying curvature. Because the correlation between the log-scale $v$ and each $\theta_i$ flips strongly with position, no global rotation or rescaling removes it.

## Overview

The exposition treats the one-level hierarchy as typical of all hierarchical pathologies. The footnote notes that not all parameters need share one hierarchy (multilevel models).

## Main Content

> [!definition] One-level hierarchical model (eq. 1, Fig. 1)
> Data $D=(D_i)$, local parameters $\theta=(\theta_i)$, global parameters $\phi$:
> $$\pi(\theta,\phi\mid D)\propto\prod_{i=1}^n\pi(D_i\mid\theta_i)\,\pi(\theta_i\mid\phi)\,\pi(\phi).$$
> The $\theta_i$ interact only through $\phi$, which lets data inform all of the $\theta_i$ (partial pooling).
^def-one-level-hierarchy

> [!example] One-way normal model (eq. 2)
> $y_i\sim\mathcal N(\theta_i,\sigma_i^2)$, $\theta_i\sim\mathcal N(\mu,\tau^2)$, $i=1..I$. In the general notation $D=(y_i,\sigma_i)$, $\phi=(\mu,\tau)$, $\theta=(\theta_i)$. "Global" and "local" labels break down in multi-layer models.
^ex-one-way-normal

**Why it is pathological.** All $n$ contributions at the bottom depend on $\phi$, so a small change in $\phi$ produces large changes in density. With sparse data the density has a funnel shape. Both regions carry comparable probability mass, so a successful sampler must cope with dramatic variation in curvature.

> [!definition] The funnel distribution (Neal 2003; Fig. 2)
> With no data, $\mu=0$ and a log-normal prior on the variance $\tau^2=e^v$:
> $$\pi(\theta_1,\dots,\theta_n,v)\propto\prod_{i=1}^n\mathcal N\big(\theta_i\mid0,(e^{-v/2})^2\big)\,\mathcal N(v\mid0,3^2).$$
> Notation note: the formula as printed in Sec. I uses $x_i$ for the local variables and scale $e^{-v/2}$, while the Appendix Stan model is `theta ~ normal(0, exp(v/2))`. The two differ by $v\to-v$ and describe the same funnel up to reflection; $v\sim\mathcal N(0,3^2)$ marginally either way. Footnote 2: the exponential link between latent $v$ and variance arises naturally whenever a positive parameter is transformed to an unconstrained one for sampling.
^def-funnel

> [!theorem] Position-dependent correlation
> The hierarchy induces large correlations between $v$ and each $\theta_i$, with a strength that varies strongly with position (Fig. 2 visualises the eigenvectors of $\sqrt{|\partial^2\log p/\partial\theta_i\partial\theta_j|}$ scaled by eigenvalues). The funnel's symmetry makes the correlations cancel globally, so no global correction (rotation or rescaling of parameters) can simplify the distribution.
^thm-position-dependent-correlation

> [!example] Reproducing the funnel in numpy
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> n, N = 100, 100000
> v = rng.normal(0, 3, N)                          # marginal of v
> theta = rng.normal(0, np.exp(v/2)[:, None], (N, n))  # Stan model: theta ~ normal(0, exp(v/2))
> # A fixed step size h must satisfy h*sqrt(curvature) < 2: curvature in theta_i is exp(-v), so
> print(np.exp(-v).min(), np.exp(-v).max())        # curvature spans many orders of magnitude
> ```
> With $v\sim\mathcal N(0,9)$ the curvature $e^{-v}$ varies over more than ten orders of magnitude across draws, which is why one step size cannot serve the whole funnel.
^ex-funnel-numpy

## Examples (PyMC-style)

Centred (funnel-prone) vs non-centred parameterisation in PyMC 5 (*untested sketch*):
```python
import pymc as pm
with pm.Model() as centred:
    mu = pm.Normal("mu", 0, 5); tau = pm.HalfCauchy("tau", 2.5)
    theta = pm.Normal("theta", mu, tau, shape=J)            # funnel: divergences when tau -> 0
    pm.Normal("y", theta, sigma, observed=y)
with pm.Model() as noncentred:
    mu = pm.Normal("mu", 0, 5); tau = pm.HalfCauchy("tau", 2.5)
    z = pm.Normal("z", 0, 1, shape=J); theta = pm.Deterministic("theta", mu + tau*z)
    pm.Normal("y", theta, sigma, observed=y)
```

## Connections

[[Hierarchical Models]] and [[Hierarchical Linear Models]] introduce partial pooling; [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]] explains why the funnel defeats naive samplers; [[Stochastic Volatility and the Inference Frontier]] shows the same geometry in a time-series state-space model.

## See Also
[[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[The Typical Set and the Log Posterior Density]]
