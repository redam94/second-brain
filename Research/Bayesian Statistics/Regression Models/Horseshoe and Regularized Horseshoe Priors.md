---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - type/concept
  - topic/bayesian-statistics
  - topic/shrinkage-priors
  - topic/sparse-regression
  - doc/stub
source: ""
source_location: ""
date_ingested: 2026-11-11
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
aliases:
  - horseshoe prior
  - regularized horseshoe
  - global-local shrinkage
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Bayesian Linear Regression]]"
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> **Stub note** — created to resolve broken wikilinks. The horseshoe prior (Carvalho et al. 2010) and its regularized variant (Piironen & Vehtari 2017) are global-local shrinkage priors for sparse high-dimensional regression. They allow large signals to pass through nearly unregularized while aggressively shrinking noise toward zero — state of the art for $p \gg n$ sparse problems.

## Overview

The horseshoe prior has the form:

$$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
$$\lambda_j \sim \text{Half-Cauchy}(0, 1)$$
$$\tau \sim \text{Half-Cauchy}(0, \tau_0)$$

where $\lambda_j$ are **local** shrinkage parameters (per-coefficient) and $\tau$ is a **global** shrinkage parameter. The half-Cauchy distribution for $\lambda_j$ creates the characteristic horseshoe shape in the shrinkage profile: near-zero coefficients are shrunk hard, large coefficients escape shrinkage almost entirely.

The **regularized horseshoe** (Piironen & Vehtari 2017) replaces the unbounded local scale with a regularized version that prevents exploding coefficients and improves MCMC sampling.

## Key Properties

- **Sparse signal recovery**: near-oracle rates in the ultra-sparse regime
- **No hard threshold**: unlike lasso/SCAD, the boundary is smooth
- **Bayesian uncertainty**: full posterior over $\beta$, not a point estimate
- **Stan/brms**: the `hs()` prior function in brms implements the regularized horseshoe

## Connections

- [[Bayesian Linear Regression]] — the linear model this prior is placed on
- [[Generalized Linear Models]] — horseshoe extends naturally to GLMs

## See Also

- Carvalho, Polson, Scott (2010) — "The horseshoe estimator for sparse signals"
- Piironen & Vehtari (2017) — "Sparsity information and regularization in the horseshoe and other shrinkage priors"
