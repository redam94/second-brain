---
title: "Post-hoc Factor Score Recovery"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/dimensionality-reduction
  - type/concept
  - doc/tutorial
  - method/factor-analysis
  - method/pymc
source: "[[raw/Factor analysis]]"
source_location: "Post-hoc identification of F section"
date_ingested: 2026-04-09
folder: "Research/Factor Analysis"
doc_type: concept
depends_on:
  - "[[Factor Analysis Model]]"
  - "[[Amortized Inference for Factor Analysis]]"
used_by:
  - "[[PyMC Factor Analysis Tutorial]]"
aliases:
  - Recovering factor scores
  - Post-hoc F recovery
---

# Post-hoc Factor Score Recovery

> [!summary]
> After fitting a factor analysis model with $F$ marginalized out, the factor scores can be recovered analytically using the conjugate normal posterior. Given posterior samples of $W$ and $\sigma$, the conditional $F \mid X, W$ is multivariate normal with known mean and covariance, enabling direct sampling without additional MCMC.

## Overview

In the amortized factor analysis model (see [[Amortized Inference for Factor Analysis]]), the factor score matrix $F$ is integrated out to reduce the parameter space. However, $F$ is typically needed for downstream tasks like dimensionality reduction and feature extraction. This note derives the closed-form conditional posterior for $F$ and shows how to sample from it.

## Main Content

### Derivation

Starting from the likelihood:

$$X \mid W, F \sim \mathcal{N}(WF, \sigma^2 I)$$

Rearranging:

$$(W^\top W)^{-1} W^\top X \mid W, F \sim \mathcal{N}(F, \sigma^2 (W^\top W)^{-1})$$

Using the prior $F \sim \mathcal{N}(0, I)$ and the conjugate normal update rule:

> [!theorem] Theorem: Conditional Posterior of Factor Scores
> $$F \mid X, W \sim \mathcal{N}(\mu_F, \Sigma_F)$$
> where:
> $$\mu_F = \left(I + \sigma^{-2} W^\top W\right)^{-1} \sigma^{-2} W^\top X$$
> $$\Sigma_F = \left(I + \sigma^{-2} W^\top W\right)^{-1}$$
>
> For each posterior sample of $(W, \sigma)$, a corresponding sample of $F$ can be drawn from this distribution.
^thm-conditional-posterior-F

### Implementation with xarray-einstats

The recovery uses `xarray-einstats` for array operations over posterior samples:

```python
post = trace_vi.posterior
obs = trace.observed_data

WW = linalg.matmul(
    post["W"], post["W"],
    dims=("latent_columns", "observed_columns", "latent_columns")
)

# Identity matrix construction
I = xr.zeros_like(WW)
idx = xr.DataArray(WW.coords["latent_columns"])
I.loc[{"latent_columns": idx, "latent_columns2": idx}] = 1

Sigma_F = linalg.inv(I + post["sigma"] ** (-2) * WW)

X_transform = linalg.matmul(
    Sigma_F,
    post["sigma"] ** (-2) * post["W"],
    dims=("latent_columns2", "latent_columns", "observed_columns"),
)

mu_F = xr.dot(X_transform, obs["X"], dims="observed_columns").rename(
    latent_columns2="latent_columns"
)

Sigma_chol = linalg.cholesky(Sigma_F)
norm_dist = XrContinuousRV(sp.stats.norm, xr.zeros_like(mu_F))

F_sampled = mu_F + linalg.matmul(
    post["sigma"] * Sigma_F,
    norm_dist.rvs(),
    dims=(("latent_columns", "latent_columns2"), ("latent_columns", "rows")),
)
```

### Reconstruction Quality Assessment

Model quality is assessed by comparing reconstruction $\hat{X} = WF$ against original data:

```python
X_sampled = linalg.matmul(
    post["W"], F_sampled,
    dims=("observed_columns", "latent_columns", "rows"),
)
reconstruction_mean = X_sampled.mean(dim=("chain", "draw")).values
```

A scatter plot of observed vs. reconstructed values with $R^2$ from linear regression provides a quick diagnostic. Even with $k=2$ latent factors (vs. the true $k=4$), the model captures substantial variation.

## Connections

- This technique is an instance of Bayesian conjugate updating for the multivariate normal
- The same principle applies to any model where a latent variable can be integrated out then recovered
- Related to the E-step in the EM algorithm for factor analysis

## See Also
- [[Amortized Inference for Factor Analysis]] -- The marginalization step that necessitates this recovery
- [[Factor Analysis Model]] -- Base model formulation
- [[Multiparameter Models]] -- Conjugate normal theory
- [[raw/Factor analysis]] -- Full code with reconstruction plots
