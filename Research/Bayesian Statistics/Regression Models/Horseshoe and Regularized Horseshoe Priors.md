---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/regularization
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "horseshoe prior"
  - "regularized horseshoe"
  - "RHS prior"
doc_type: concept
source_location: "BDA3 Ch.14, pp. 376-380"
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by: []
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> Global-local shrinkage priors for high-dimensional sparse regression. The horseshoe prior uses a Cauchy half-distribution for local scales, allowing large signals to pass through unshrunken while aggressively shrinking noise. The regularized horseshoe (Piironen & Vehtari 2017) adds a slab component for improved regularization of the large signals.

## Overview

Standard regularization priors (ridge/lasso) shrink all coefficients uniformly. When the true signal is sparse — a few large effects among many near-zero ones — global-local priors are superior: they learn a global shrinkage scale while allowing each coefficient its own local scale.

## The Horseshoe Prior

For a sparse regression $y = X\beta + \epsilon$:

$$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
$$\lambda_j \sim C^+(0, 1) \quad \text{(half-Cauchy local scales)}$$
$$\tau \sim C^+(0, \tau_0) \quad \text{(global shrinkage scale)}$$

The horseshoe's key property: the posterior for a large signal $\beta_j$ is nearly unshrunken, while small signals are pulled strongly toward zero — the characteristic "horseshoe" shape of the shrinkage profile.

## Regularized Horseshoe (Piironen & Vehtari 2017)

Replaces the unbounded slab with a Student-$t$ slab for signals that survive shrinkage:

$$\beta_j \mid \lambda_j, \tau, c \sim N\!\left(0,\; \tilde\lambda_j^2 \tau^2\right), \quad \tilde\lambda_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$

This caps the effective local scale at $c$, preventing numerical issues and improving posterior geometry for HMC.

## Setting the Global Scale

The recommended default sets $\tau_0 = p_0 / (p - p_0) \cdot \sigma / \sqrt{n}$, where $p_0$ is the prior guess of the number of relevant predictors. This encodes sparsity structure directly into the prior.

## See Also

- [[Bayesian Linear Regression]] — the broader regularization context in which horseshoe priors appear
- [[MCMC Basics]] — HMC is needed for efficient posterior sampling with global-local priors
- [[Hierarchical Models]] — global-local structure is a form of hierarchical prior on coefficients
