---
title: "Identifiability in Factor Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/dimensionality-reduction
  - type/concept
  - doc/tutorial
  - method/factor-analysis
  - method/pymc
source: "[[raw/Factor analysis]]"
source_location: "Alternative parametrization section"
date_ingested: 2026-04-09
folder: "Research/Factor Analysis"
doc_type: concept
depends_on:
  - "[[Factor Analysis Model]]"
used_by:
  - "[[PyMC Factor Analysis Tutorial]]"
  - "[[Amortized Inference for Factor Analysis]]"
aliases:
  - Constrained factor loading matrix
  - Factor model identifiability
---

# Identifiability in Factor Models

> [!summary]
> The naive factor analysis model is non-identified: the loading matrix $W$ and factor scores $F$ can be freely rotated, reflected, and permuted without changing the likelihood. The fix is to constrain $W$ to be lower-triangular with positive, increasing diagonal entries. This eliminates rotational, sign, and permutation ambiguities, enabling MCMC chains to converge.

## Overview

Identifiability is the central practical challenge in fitting factor analysis and PPCA models with MCMC. Without constraints, the sampler explores equivalent parameterizations, producing divergent chain means and heavy autocorrelation. This note describes the problem and its standard solution.

## Main Content

### The Problem

> [!definition] Definition: Non-Identifiability in Factor Analysis
> In the factor analysis model $X \sim \mathcal{N}(WF, \Psi)$, only the product $WF$ enters the likelihood. For any invertible $k \times k$ matrix $\Omega$:
> $$P(X \mid W, F) = P(X \mid W\Omega, \Omega^{-1}F)$$
> The posterior over $(W, F)$ is therefore invariant under the transformation $(W, F) \mapsto (W\Omega, \Omega^{-1}F)$.
^def-non-identifiability

While the priors on $W$ and $F$ constrain $|\Omega|$ from growing too large or small, three symmetries remain:
1. **Rotation**: $\Omega$ can be any orthogonal matrix
2. **Reflection**: columns of $W$ can flip sign
3. **Permutation**: columns of $W$ (and corresponding rows of $F$) can be reordered

> [!warning] Diagnostic Symptoms
> - $\hat{R} > 1.01$ for entries of $W$
> - Very low effective sample size (ESS)
> - Chains have different sample means
> - Long-range trends (heavy autocorrelation) in traceplots

### The Solution: Constrained $W$

> [!theorem] Theorem: Identifiability via Triangular Constraint
> Restricting $W$ to be:
> 1. **Lower triangular** (eliminates rotational freedom)
> 2. **Positive and increasing diagonal entries** (eliminates sign and permutation ambiguity)
>
> produces an identified model where the posterior has a unique mode (up to the prior).
^thm-triangular-constraint

### Implementation

The `expand_packed_block_triangular` function fills out a non-square $d \times k$ lower-triangular matrix from a packed representation:

```python
def expand_packed_block_triangular(d, k, packed, diag=None, mtype="pytensor"):
    assert mtype in {"pytensor", "numpy"}
    assert d >= k

    def set_(M, i_, v_):
        if mtype == "pytensor":
            return pt.set_subtensor(M[i_], v_)
        M[i_] = v_
        return M

    out = pt.zeros((d, k), dtype=float) if mtype == "pytensor" else np.zeros((d, k), dtype=float)
    if diag is None:
        idxs = np.tril_indices(d, m=k)
        out = set_(out, idxs, packed)
    else:
        idxs = np.tril_indices(d, k=-1, m=k)
        out = set_(out, idxs, packed)
        idxs = (np.arange(k), np.arange(k))
        out = set_(out, idxs, diag)
    return out
```

The `makeW` function constructs the constrained loading matrix using a cumulative sum trick for the positive increasing diagonal:

```python
def makeW(d, k, dim_names):
    n_od = int(k * d - k * (k - 1) / 2 - k)
    # Cumulative sum of HalfNormal ensures positive increasing diagonal
    z = pm.HalfNormal("W_z", 1.0, dims="latent_columns")
    b = pm.Normal("W_b", 0.0, 1.0, shape=(n_od,), dims="packed_dim")
    L = expand_packed_block_triangular(d, k, b, pt.ones(k))
    W = pm.Deterministic("W", L @ pt.diag(pt.extra_ops.cumsum(z)), dims=dim_names)
    return W
```

> [!tip] Key Trick
> Using `cumsum` of `HalfNormal` draws guarantees the diagonal entries are positive and increasing, which simultaneously fixes sign and permutation ambiguity.

## Examples

> [!example] Example: Before vs. After Identification
> **Before** (naive model): Sampling 4 chains for 2000 tune + 1000 draw iterations produces $\hat{R} > 1.01$ warnings, each chain has a different sample mean for $W$ entries, and traceplots show heavy autocorrelation.
>
> **After** (constrained $W$): Same sampling configuration yields chains that agree on posterior means. Some autocorrelation remains but convergence diagnostics improve substantially.

## Connections

- This is a general issue in Bayesian latent variable models, not specific to factor analysis
- Related to label switching in [[Nonparametric Models Overview|mixture models]]
- The constrained parametrization is necessary before applying [[Amortized Inference for Factor Analysis]]

## See Also
- [[Factor Analysis Model]] -- The base model that needs this fix
- [[Amortized Inference for Factor Analysis]] -- Next step: marginalizing $F$ for scalability
- [[Computational Troubleshooting]] -- General MCMC convergence diagnostics
- [[raw/Factor analysis]] -- Original source with traceplots showing the problem
