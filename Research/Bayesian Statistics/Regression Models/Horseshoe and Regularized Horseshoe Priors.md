---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/shrinkage-priors
  - topic/sparse-regression
  - type/concept
  - doc/stub
date_ingested: 2026-08-19
folder: "Bayesian Statistics/Regression Models"
aliases:
  - horseshoe prior
  - regularized horseshoe
  - RHS prior
  - global-local shrinkage
doc_type: concept
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by: []
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior is a global-local shrinkage prior for sparse high-dimensional regression. It has heavy tails (allowing large signals to be retained) while its horseshoe shape aggressively shrinks small signals toward zero. The regularized horseshoe (RHS, Piironen & Vehtari 2017) adds a slab component for improved tail behavior and Stan compatibility.

> [!note] Stub
> This is a stub note created to resolve broken wikilinks. Expand with content from Piironen & Vehtari 2017 or BDA3 Ch. 14 sparse priors discussion.

## Overview

The horseshoe prior places a half-Cauchy on local shrinkage parameters $\lambda_j$ and a global shrinkage parameter $\tau$:

$$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
$$\lambda_j \sim \text{Half-Cauchy}(0, 1), \quad \tau \sim \text{Half-Cauchy}(0, \tau_0)$$

Key properties:
- **Heavy tails**: large signals $|\beta_j| \gg \tau$ are preserved — $\lambda_j$ adapts to allow them
- **Aggressive shrinkage**: for noise coefficients, the horseshoe shape shrinks toward zero
- **Global scale**: $\tau$ controls overall sparsity level; can be set via prior on expected number of non-zero coefficients

## Regularized Horseshoe (RHS)

Piironen & Vehtari (2017) propose the regularized horseshoe to fix numerical issues with the heavy Cauchy tails:

$$\tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$

The slab parameter $c$ bounds the effective local scale, ensuring stable Stan sampling while preserving the shrinkage properties.

## See Also

- [[Bayesian Linear Regression]] — BDA3 Ch. 14 discusses Bayesian Lasso and other shrinkage priors in the same family
- [[Nonparametric Models Overview]] — GP and mixture models as alternative approaches to flexible priors
