---
title: "Amortized Inference for Factor Analysis"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/dimensionality-reduction
  - type/concept
  - doc/tutorial
  - method/factor-analysis
  - method/pymc
source: "[[raw/Factor analysis]]"
source_location: "Alternative parametrization section, amortized inference"
date_ingested: 2026-04-09
folder: "Research/Factor Analysis"
doc_type: concept
depends_on:
  - "[[Factor Analysis Model]]"
  - "[[Identifiability in Factor Models]]"
  - "[[Approximation Methods]]"
used_by:
  - "[[Post-hoc Factor Score Recovery]]"
  - "[[PyMC Factor Analysis Tutorial]]"
aliases:
  - Marginalized factor analysis
  - Integrating out F
---

# Amortized Inference for Factor Analysis

> [!summary]
> Explicitly sampling the $k \times n$ factor score matrix $F$ is expensive for large $n$ and prevents minibatch inference. By analytically integrating $F$ out, the marginal likelihood becomes $X \mid W \sim \mathcal{N}(0, WW^\top + \sigma^2 I)$, reducing the parameter space to $W$ and $\sigma$ only. This enables scalable inference via minibatch FullRank ADVI, at the cost of requiring post-hoc recovery of $F$.

## Overview

In the standard factor analysis model, the factor scores $F$ are a $k \times n$ matrix of latent variables. Sampling all $k \times n$ entries via MCMC is expensive and prevents streaming inference with minibatching. The solution is to marginalize $F$ out analytically, leveraging the linear Gaussian structure of the model.

## Main Content

### Derivation of the Marginal Likelihood

Starting from the generative model with $F_{ij} \sim \mathcal{N}(0, 1)$:

$$X \mid W, F \sim \mathcal{N}(WF, \sigma^2 I)$$

We can write $X = WF + \sigma I \epsilon$ where $\epsilon \sim \mathcal{N}(0, I)$.

> [!theorem] Theorem: Marginal Distribution of Factor Analysis
> Fixing $W$ and treating $F \sim \mathcal{N}(0, I)$ and $\epsilon \sim \mathcal{N}(0, I)$ as random, $X$ is the sum of two multivariate normals with covariances $WW^\top$ and $\sigma^2 I$ respectively. Therefore:
> $$X \mid W \sim \mathcal{N}(0, WW^\top + \sigma^2 I)$$
> This eliminates $F$ from the model entirely.
^thm-marginal-fa

### PyMC Implementation

```python
with pm.Model(coords=coords) as PPCA_amortized:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    # MvNormal parametrizes covariance of columns, so transpose Y
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y.T,
                    dims=("rows", "observed_columns"))
```

### Scalability via Minibatch ADVI

The amortized model enables minibatch variational inference:

```python
with pm.Model(coords=coords) as PPCA_amortized_batched:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    Y_mb = pm.Minibatch(Y.T, batch_size=50)
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y_mb)
    trace_vi = pm.fit(n=50000, method="fullrank_advi", obj_n_mc=1).sample()
```

### Scalability Comparison

| Approach | Fits large $n$? | Minibatch? | Notes |
|----------|----------------|------------|-------|
| Explicit $F$ (MCMC) | No -- $k \times n$ params | No | Simplest but slow |
| Amortized (MCMC) | Moderate | No | Covariance inversion bottleneck |
| Amortized (ADVI) | Yes | Yes | FullRankADVI + Minibatch |

> [!warning] Tradeoff
> Computing the log-probability of the `MvNormal` requires inverting the $d \times d$ covariance matrix, which is $O(d^3)$. MCMC on the amortized model is slower per sample but the reduced parameter count offsets this for large $n$.

## Connections

- The marginalization exploits the linear Gaussian structure -- the same technique appears in Gaussian process regression
- After fitting, factor scores must be recovered post-hoc; see [[Post-hoc Factor Score Recovery]]
- Variational inference methods used here are covered in [[Approximation Methods]]

## See Also
- [[Factor Analysis Model]] -- Base model formulation
- [[Identifiability in Factor Models]] -- Required constraint on $W$ before amortization
- [[Post-hoc Factor Score Recovery]] -- Recovering $F$ after marginalized fitting
- [[Approximation Methods]] -- ADVI and variational inference methods
- [[raw/Factor analysis]] -- Original source with full code
