---
title: "Hilbert Space Gaussian Processes (HSGPs)"
tags:
  - source/ingested
  - topic/gaussian-processes
  - topic/time-series
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - HSGP
  - Hilbert Space GP
date_ingested: 2026-04-09
date_updated: 2026-06-29
folder: "Bayesian Statistics/Advanced Models"
doc_type: concept
source: "[[raw/Baby Births Modelling with HSGPs]]"
source_location: "raw/Baby Births Modelling with HSGPs"
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Bayesian Linear Regression]]"
  - "[[Spatial Models - BYM]]"
used_by:
  - "[[Spatial Models - BYM]]"
  - "[[State-Space Models and the Kalman Filter - Overview]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
---

# Hilbert Space Gaussian Processes (HSGPs)

> [!abstract] Summary
> HSGPs approximate a full Gaussian Process as a linear combination of basis functions derived from the spectral decomposition of the Laplace operator. This makes GP-based time series models dramatically faster while preserving the key properties of the chosen kernel.

## The Core Idea

A standard [[Nonparametric Models Overview|Gaussian Process]] uses a kernel $k(x, x')$ that must be evaluated at all pairs of points — $O(n^3)$ cost. The HSGP approximation decomposes the kernel as a sum of orthonormal basis functions on a bounded domain $[-L, L]$:

$$
\text{GP} \approx \sum_{j=1}^{m} \beta_j \phi_j(x)
$$

where $\phi_j$ are eigenfunctions of the Laplace operator on $L^2([-L, L])$ (analogous to Fourier basis functions on a circle). Crucially, **the basis functions $\phi_j$ do not depend on the kernel hyperparameters**, so they can be precomputed once and a linear model fitted in the $\beta_j$ coefficients. This reduces cost to $O(nm^2)$.

## Key Parameters

| Parameter | Role |
|-----------|------|
| $m$ | Number of basis vectors (more = better approximation, higher cost) |
| $L$ | Boundary of the domain; all data must lie in $[-L, L]$ |
| $c$ | Proportion extension factor: $L = c \cdot \max\|X\|$ (alternative to setting $L$ directly) |

> [!tip] Rule of thumb
> Set $c \geq 1.5$ so that $L$ extends beyond the observed data range. Increase $m$ until the approximation stabilizes.

## PyMC API

PyMC provides two HSGP classes:

- **`pm.gp.HSGP`** — stationary kernels (Matérn, squared exponential, etc.) on a non-periodic domain
- **`pm.gp.HSGPPeriodic`** — periodic kernels for seasonal components

```python
with pm.Model() as model:
    # Slow trend (non-periodic)
    ls = pm.InverseGamma("ls", alpha=3, beta=1)
    cov_trend = pm.gp.cov.ExpQuad(1, ls=ls)
    gp_trend = pm.gp.HSGP(m=[20], L=1.5 * T, cov_func=cov_trend)
    trend = gp_trend.prior("trend", X=t[:, None])

    # Seasonal component (periodic)
    ls_season = pm.InverseGamma("ls_season", alpha=3, beta=1)
    cov_season = pm.gp.cov.Periodic(1, period=365.25, ls=ls_season)
    gp_season = pm.gp.HSGPPeriodic(m=10, cov_func=cov_season)
    season = gp_season.prior("season", X=t[:, None])
```

## Births Example (Gelman et al., BDA3 Ch. 21)

The *birthdays* dataset (USA, 1969–1988) uses three additive HSGP components:

1. **Slow trend** — long-term drift in birth rates (squared exponential kernel, large length-scale)
2. **Yearly seasonal trend** — annual cycle (periodic kernel, period = 365.25 days)
3. **Day-of-week effect** — categorical deflection per weekday

$$
\mu_t = \alpha + f_\text{trend}(t) + f_\text{season}(t) + \beta_\text{dow}[\text{dow}(t)]
$$

The HSGP decomposition makes sampling feasible on daily data over 20 years.

## Connections

- Related to [[Nonparametric Models Overview]] (GP priors for regression)
- The orthonormal basis is analogous to the **spectral representation** of stationary processes
- For spatial data, see [[Spatial Models - BYM]] (ICAR uses graph Laplacian, conceptually related)

## Source

- [[raw/Baby Births Modelling with HSGPs]] — PyMC example: HSGP for time series, birthdays dataset
- Original case study by Aki Vehtari (Stan): iterative GP components for birth rate modelling

## See Also

- [[Nonparametric Models Overview]] — Gaussian process priors in general
- [[Spatial Models - BYM]] — graph Laplacian ICAR model, conceptually related via spectral decomposition
- [[Local Linear Trend and Seasonality]] — state-space counterpart for trend + seasonal decomposition
- [[Bayesian Structural Time-Series Model]] — classical modular decomposition that HSGP can replace or augment
- [[State-Space Models and the Kalman Filter - Overview]] — GP/state-space duality for time series
