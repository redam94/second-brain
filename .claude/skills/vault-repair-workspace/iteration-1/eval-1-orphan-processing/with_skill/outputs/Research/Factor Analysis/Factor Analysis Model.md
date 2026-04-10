---
title: "Factor Analysis Model"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/dimensionality-reduction
  - type/concept
  - doc/tutorial
  - method/factor-analysis
source: "[[raw/Factor analysis]]"
source_location: "Model section"
date_ingested: 2026-04-09
folder: "Research/Factor Analysis"
doc_type: concept
depends_on:
  - "[[Multiparameter Models]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Identifiability in Factor Models]]"
  - "[[Amortized Inference for Factor Analysis]]"
  - "[[PyMC Factor Analysis Tutorial]]"
aliases:
  - FA
  - Probabilistic PCA
  - PPCA
---

# Factor Analysis Model

> [!summary]
> Factor analysis (FA) is a probabilistic model for identifying low-rank structure in multivariate data through latent variables. It models observed data as a noisy linear transformation of a smaller set of latent factors. Probabilistic PCA (PPCA) is a special case with isotropic noise. Both are linear Gaussian models.

## Overview

Factor analysis is widely used for dimensionality reduction and latent structure discovery. Unlike standard PCA which is a deterministic method, factor analysis and probabilistic PCA frame the problem generatively, enabling uncertainty quantification, missing data handling, and Bayesian model comparison.

The key insight is that high-dimensional observations can often be explained by a small number of unobserved (latent) factors plus noise.

## Main Content

> [!definition] Definition: Factor Analysis Model
> The factor analysis model is the probabilistic matrix factorization:
> $$X_{(d,n)} \mid W_{(d,k)}, F_{(k,n)} \sim \mathcal{N}(WF, \Psi)$$
> where:
> - $X$ is the $d \times n$ observed data matrix ($d$ variables, $n$ observations)
> - $W$ is the $d \times k$ **loading matrix** relating latent factors to observations
> - $F$ is the $k \times n$ **factor score matrix** (latent representation), with prior $F_{ij} \sim \mathcal{N}(0, 1)$
> - $\Psi$ is a **diagonal** noise covariance matrix
> - $k \ll d$ so that $WW^\top$ is low rank
^def-factor-analysis

> [!definition] Definition: Probabilistic PCA (PPCA)
> Probabilistic PCA is the special case of factor analysis where the noise covariance is isotropic:
> $$\Psi = \sigma^2 I$$
> All observed dimensions share the same noise variance $\sigma^2$.
^def-ppca

### Relationship Between Models

| Model | Prior on $F$ | Noise $\Psi$ |
|-------|-------------|--------------|
| PCA (standard) | Deterministic | -- |
| PPCA | $\mathcal{N}(0, I)$ | $\sigma^2 I$ (isotropic) |
| Factor Analysis | $\mathcal{N}(0, I)$ | $\text{diag}(\psi_1, \ldots, \psi_d)$ |

The fundamental assumption shared by all three is that $WW^\top$ is **low rank**: most variance in $X$ is captured by a small number of latent directions.

### Direct PyMC Implementation

A basic PPCA model in PyMC:

```python
k = 2
coords = {
    "latent_columns": np.arange(k),
    "rows": np.arange(n),
    "observed_columns": np.arange(d),
}

with pm.Model(coords=coords) as PPCA:
    W = pm.Normal("W", dims=("observed_columns", "latent_columns"))
    F = pm.Normal("F", dims=("latent_columns", "rows"))
    sigma = pm.HalfNormal("sigma", 1.0)
    X = pm.Normal("X", mu=W @ F, sigma=sigma, observed=Y,
                  dims=("observed_columns", "rows"))
```

> [!warning] Identifiability
> This naive implementation suffers from non-identifiability. The product $WF$ is all that matters for the likelihood, so $P(X \mid W, F) = P(X \mid W\Omega, \Omega^{-1}F)$ for any invertible $\Omega$. See [[Identifiability in Factor Models]] for the fix.

## Connections

- Factor analysis is closely related to [[Bayesian Linear Regression]] -- both are linear Gaussian models
- For a high-level view of how FA relates to other models, see the Ghahramani and Roweis diagram
- The identifiability problem and its solution are covered in [[Identifiability in Factor Models]]
- Marginalizing out $F$ for scalability is covered in [[Amortized Inference for Factor Analysis]]

## See Also
- [[Identifiability in Factor Models]] -- Constrained parametrization to fix rotational invariance
- [[Amortized Inference for Factor Analysis]] -- Integrating out $F$ for scalable inference
- [[PyMC Factor Analysis Tutorial]] -- Complete worked tutorial with code
- [[Nonparametric Models Overview]] -- Gaussian processes as infinite-dimensional factor models
- [[raw/Factor analysis]] -- Original PyMC tutorial source
