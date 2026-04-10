---
title: "Post-hoc Factor Score Recovery"
tags:
  - source/ingested
  - topic/bayesian
  - topic/latent-variables
  - topic/conjugate-prior
  - method/factor-analysis
aliases:
  - Factor Score Recovery
  - Recovering F After Marginalization
date_ingested: 2026-04-09
raw: "[[raw/Factor analysis]]"
folder: "Bayesian Statistics/Advanced Models"
---

# Post-hoc Factor Score Recovery

> [!abstract] Summary
> When factor analysis uses [[Amortized Inference|amortized inference]] (marginalizing out $F$), the latent factor scores are not directly available from the fitted model. They can be recovered **post-hoc** using a conjugate normal update: for each posterior sample of $W$ and $\sigma$, the conditional distribution of $F$ given the data is a known multivariate normal.

## The Problem

After fitting the amortized model $X \mid W \sim \mathcal{N}(0, WW^\top + \sigma^2 I)$, we have posterior samples for $W$ and $\sigma$ but no samples for the factor scores $F$. Yet $F$ is often the primary output of interest -- it provides the low-dimensional representation used for dimensionality reduction, clustering, or downstream modeling.

## Conjugate Posterior Derivation

Starting from the conditional model:

$$X \mid W, F \sim \mathcal{N}(WF, \sigma^2 I)$$

Rearrange to isolate $F$:

$$(W^\top W)^{-1} W^\top X \mid W, F \sim \mathcal{N}\left(F,\ \sigma^2 (W^\top W)^{-1}\right)$$

This is a normal likelihood for $F$ with known precision. Using the conjugate prior $F \sim \mathcal{N}(0, I)$ and applying the standard [conjugate update](https://en.wikipedia.org/wiki/Conjugate_prior):

$$F \mid X, W \sim \mathcal{N}(\mu_F, \Sigma_F)$$

where:

$$\Sigma_F = \left(I + \sigma^{-2} W^\top W\right)^{-1}$$

$$\mu_F = \Sigma_F \cdot \sigma^{-2} W^\top X$$

## Implementation with xarray-einstats

The PyMC tutorial uses `xarray-einstats` for vectorized linear algebra over posterior samples:

```python
post = trace_vi.posterior
obs = trace.observed_data

# W^T W with proper dimension handling
WW = linalg.matmul(post["W"], post["W"],
    dims=("latent_columns", "observed_columns", "latent_columns"))

# Identity matrix in xarray
I = xr.zeros_like(WW)
idx = xr.DataArray(WW.coords["latent_columns"])
I.loc[{"latent_columns": idx, "latent_columns2": idx}] = 1

# Sigma_F = (I + sigma^{-2} W^T W)^{-1}
Sigma_F = linalg.inv(I + post["sigma"] ** (-2) * WW)

# mu_F = Sigma_F @ sigma^{-2} @ W^T @ X
X_transform = linalg.matmul(Sigma_F,
    post["sigma"] ** (-2) * post["W"],
    dims=("latent_columns2", "latent_columns", "observed_columns"))
mu_F = xr.dot(X_transform, obs["X"], dims="observed_columns") \
    .rename(latent_columns2="latent_columns")

# Sample F from the conditional posterior
Sigma_chol = linalg.cholesky(Sigma_F)
norm_dist = XrContinuousRV(sp.stats.norm, xr.zeros_like(mu_F))
F_sampled = mu_F + linalg.matmul(
    post["sigma"] * Sigma_F, norm_dist.rvs(),
    dims=(("latent_columns", "latent_columns2"),
          ("latent_columns", "rows")))
```

## Reconstruction Check

After recovering $F$, verify quality by reconstructing $\hat{X} = WF$ and comparing to the original data:

```python
X_reconstructed = linalg.matmul(post["W"], F_sampled,
    dims=("observed_columns", "latent_columns", "rows"))
reconstruction_mean = X_reconstructed.mean(dim=("chain", "draw")).values
```

Plot observed vs. reconstructed with $R^2$ from linear regression as a diagnostic.

## Key Points

> [!tip] Practical Notes
> - This step is **mandatory** when using amortized inference if you need per-observation latent representations
> - Each posterior sample of $(W, \sigma)$ yields a different distribution over $F$ -- propagating this uncertainty is a key advantage over point-estimate methods like standard PCA
> - The computation is embarrassingly parallel across posterior samples
> - For very large $n$, this step can itself be batched

## See Also

- [[Amortized Inference]] -- The marginalization strategy that necessitates post-hoc recovery
- [[Factor Analysis and PPCA]] -- The full model context
- [[Probability and Bayesian Inference]] -- Conjugate prior theory
- [[Multiparameter Models]] -- Conditional posteriors in multiparameter settings
