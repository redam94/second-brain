---
title: "Amortized Inference"
tags:
  - source/ingested
  - topic/bayesian
  - topic/scalability
  - topic/variational-inference
  - method/amortized-inference
aliases:
  - Marginalization of Latent Variables
  - Integrating Out Latent Variables
date_ingested: 2026-04-09
raw: "[[raw/Factor analysis]]"
folder: "Bayesian Statistics/Advanced Models"
---

# Amortized Inference

> [!abstract] Summary
> Amortized inference is a strategy for making latent variable models scalable: instead of sampling per-observation latent variables during fitting, **integrate them out analytically** and recover them post-hoc. This reduces the parameter space dramatically and enables minibatch training. The cost is fixing the prior on the latent variables and potentially slower per-sample computation due to covariance inversion.

## Motivation

In models like factor analysis, each observation $i$ has its own latent representation $F_i$. Sampling all $k \times n$ entries of $F$ is:
- **Expensive**: the parameter space grows linearly with $n$
- **Incompatible with minibatching**: each $X_i$ is linked to a specific $F_i$, so streaming data requires carrying the corresponding latent variables

## The Marginalization Trick

Starting from the conditional model:

$$X \mid WF \sim \mathcal{N}(WF, \sigma^2 I)$$

Write $X = WF + \sigma I \epsilon$ where $F \sim \mathcal{N}(0, I)$ and $\epsilon \sim \mathcal{N}(0, I)$. Since $X$ is the sum of two Gaussian variables:

$$X \mid W \sim \mathcal{N}(0,\ WW^\top + \sigma^2 I)$$

The latent variables $F$ have been **analytically marginalized**. The model now only has parameters $W$ and $\sigma$.

## Tradeoffs

| Aspect | Explicit $F$ | Amortized (marginalized) |
|--------|-------------|------------------------|
| Parameters | $W + F$ ($k \times n$ extra) | $W + \sigma$ only |
| Minibatch | Not possible | Yes (via `pm.Minibatch`) |
| Per-sample cost | Low (matrix multiply) | High ($d \times d$ covariance inversion) |
| Prior flexibility | Can modify $P(F)$ | Fixes $F \sim \mathcal{N}(0, I)$ |
| MCMC speed | Slow for large $n$ | Moderate |
| VI compatibility | Limited | Excellent (FullRankADVI) |

## PyMC Implementation

### MCMC on Amortized Model

```python
with pm.Model(coords=coords) as PPCA_amortized:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y.T,
                    dims=("rows", "observed_columns"))
```

### Minibatch ADVI

```python
with pm.Model(coords=coords) as PPCA_amortized_batched:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    Y_mb = pm.Minibatch(Y.T, batch_size=50)
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y_mb)
    trace_vi = pm.fit(n=50000, method="fullrank_advi", obj_n_mc=1).sample()
```

## When to Use Amortized Inference

> [!tip] Guidelines
> - **Large $n$, small $d$**: amortized inference wins -- the covariance inversion is cheap but the parameter reduction is massive
> - **Large $d$**: the $d \times d$ covariance inversion becomes the bottleneck; consider the explicit model with efficient samplers
> - **Need minibatching**: amortized is the only option compatible with `pm.Minibatch`
> - **Flexible priors on $F$**: must use the explicit model

## Recovering Latent Variables Post-hoc

After fitting the amortized model, individual latent values $F_i$ can be recovered from the conjugate posterior. See [[Post-hoc Factor Score Recovery]] for the derivation.

## See Also

- [[Factor Analysis and PPCA]] -- Primary application of amortized inference
- [[Approximation Methods]] -- ADVI and variational methods used with amortized models
- [[Efficient MCMC]] -- Strategies for scaling MCMC to large datasets
