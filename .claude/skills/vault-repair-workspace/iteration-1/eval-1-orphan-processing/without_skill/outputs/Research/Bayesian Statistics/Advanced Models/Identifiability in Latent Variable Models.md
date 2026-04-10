---
title: "Identifiability in Latent Variable Models"
tags:
  - source/ingested
  - topic/bayesian
  - topic/identifiability
  - topic/latent-variables
  - method/factor-analysis
aliases:
  - Non-identifiability
  - Rotational Invariance
date_ingested: 2026-04-09
raw: "[[raw/Factor analysis]]"
folder: "Bayesian Statistics/Advanced Models"
---

# Identifiability in Latent Variable Models

> [!abstract] Summary
> Latent variable models like factor analysis and probabilistic PCA suffer from a fundamental **identifiability problem**: the likelihood is invariant to rotations, reflections, and permutations of the latent space. This causes MCMC chains to explore equivalent solutions, producing poor convergence diagnostics. The standard fix is a **constrained parametrisation** that pins the loading matrix $W$ to a unique form.

## The Problem

In factor analysis, the observed data model is:

$$X \mid W, F \sim \mathcal{N}(WF, \Psi)$$

Only the product $WF$ enters the likelihood. For any invertible matrix $\Omega$:

$$P(X \mid W, F) = P(X \mid W\Omega, \Omega^{-1}F)$$

This means the model has a continuous family of equivalent parametrisations. The posterior is **multi-modal**: every rotation/reflection/permutation of the latent space yields the same likelihood.

## Symptoms in MCMC

> [!warning] Diagnostic Red Flags
> - $\hat{R} > 1.01$ for entries of $W$ or $F$
> - Very low effective sample size (ESS < 100 per chain)
> - Different chains converge to different means
> - Heavy autocorrelation visible in traceplots
> - Long-range trends (drift) within a single chain

These symptoms arise because the sampler is exploring rotationally equivalent regions of the posterior, not because it has failed mechanically.

## The Constrained Parametrisation Fix

Restrict $W$ to eliminate the degrees of freedom that cause non-identifiability:

1. **Lower triangular structure** -- eliminates rotational and reflective freedom. The first latent factor only loads on the first observed variable, the second on the first two, etc.

2. **Positive, increasing diagonal** -- eliminates permutation and sign ambiguity. Achieved by defining diagonal entries as a cumulative sum of half-normal draws:

$$W_{ii} = \sum_{j=1}^{i} z_j, \quad z_j \sim \text{HalfNormal}(1)$$

### PyMC Implementation

```python
def expand_packed_block_triangular(d, k, packed, diag=None, mtype="pytensor"):
    """Fill a (d x k) lower-triangular matrix from packed off-diagonal + diagonal."""
    out = pt.zeros((d, k), dtype=float)
    if diag is None:
        idxs = np.tril_indices(d, m=k)
        out = pt.set_subtensor(out[idxs], packed)
    else:
        idxs = np.tril_indices(d, k=-1, m=k)
        out = pt.set_subtensor(out[idxs], packed)
        idxs = (np.arange(k), np.arange(k))
        out = pt.set_subtensor(out[idxs], diag)
    return out

def makeW(d, k, dim_names):
    n_od = int(k * d - k * (k - 1) / 2 - k)
    z = pm.HalfNormal("W_z", 1.0, dims="latent_columns")
    b = pm.Normal("W_b", 0.0, 1.0, shape=(n_od,), dims="packed_dim")
    L = expand_packed_block_triangular(d, k, b, pt.ones(k))
    W = pm.Deterministic("W", L @ pt.diag(pt.extra_ops.cumsum(z)), dims=dim_names)
    return W
```

## Effect on Inference

With the constrained parametrisation:
- Chains agree on posterior means for $W$
- $\hat{R}$ values drop below 1.01
- Some autocorrelation may remain, but the fundamental multi-modality is resolved

> [!tip] Rule of Thumb
> Always use a constrained $W$ for factor analysis and PPCA in MCMC. The unconstrained model will appear to sample but the posteriors are meaningless mixtures of equivalent rotations.

## Broader Context

Non-identifiability is common across latent variable models:
- **Mixture models**: label switching (permutation of components)
- **ICA**: scaling and permutation ambiguity
- **Neural network latent spaces**: arbitrary rotations in bottleneck layers

The general principle is the same: impose constraints that select a unique representative from each equivalence class.

## See Also

- [[Factor Analysis and PPCA]] -- The full factor analysis model where this fix is applied
- [[Computational Troubleshooting]] -- General MCMC convergence diagnostics
- [[Confirmatory Factor Analysis and SEM]] -- CFA uses theory-driven constraints that also aid identifiability
