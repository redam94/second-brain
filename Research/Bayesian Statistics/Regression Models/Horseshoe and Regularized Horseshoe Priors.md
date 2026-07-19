---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - type/concept
  - topic/bayesian-statistics
  - topic/regression
  - topic/sparse-inference
  - topic/shrinkage-priors
date_ingested: 2026-07-19
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by: []
aliases:
  - Horseshoe prior
  - Regularized horseshoe
  - Global-local shrinkage prior
  - RHS prior
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior is a global-local shrinkage prior for sparse Bayesian regression. It aggressively shrinks near-zero coefficients toward zero (like Lasso) while leaving large signals nearly unshrunk (unlike Ridge). The regularized horseshoe adds a finite-variance modification for better computational behavior. Both are state-of-the-art priors for high-dimensional problems where most predictors are irrelevant.

> [!note] Stub Note
> This note is a placeholder created to resolve broken wikilinks. It requires expansion from a detailed source on horseshoe priors (e.g., Piironen & Vehtari 2017, Carvalho et al. 2010).

## Overview

Standard shrinkage priors face a trade-off:
- **Ridge** ($\beta_j \sim N(0, \tau^2)$): uniform shrinkage — shrinks large signals too much
- **Lasso** ($\beta_j \sim \text{Laplace}(0, \lambda)$): induces sparsity but has a discontinuous mode

The **horseshoe prior** achieves the ideal: near-zero coefficients are shrunk to zero, large coefficients are left free.

## The Horseshoe Prior

> [!definition] Definition: Horseshoe Prior (Carvalho, Polson & Scott 2010)
> $$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
> $$\lambda_j \sim \text{Half-Cauchy}(0, 1)$$
> $$\tau \sim \text{Half-Cauchy}(0, \tau_0)$$
>
> where $\lambda_j$ is the **local shrinkage** parameter for predictor $j$, and $\tau$ is the **global shrinkage** parameter controlling overall sparsity.
^def-horseshoe

The marginal prior on $\beta_j$ has heavy tails — it places substantial mass both near zero AND in the tails, creating the "horseshoe" shape when plotted in terms of the shrinkage factor.

## The Regularized Horseshoe

The original horseshoe has infinite variance, causing computational instability in HMC/NUTS. Piironen & Vehtari (2017) propose the **regularized horseshoe**:

$$\tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$

This caps the local variance at $c^2$, giving proper posteriors and better HMC geometry.

## Connections

- [[Bayesian Linear Regression]] — horseshoe is the recommended prior for sparse high-dimensional regression
- [[Copula Estimation]] — LKJ prior for correlation matrices plays an analogous role (weakly informative, sensible shrinkage)

## See Also

- Carvalho, Polson & Scott (2010) — original horseshoe paper
- Piironen & Vehtari (2017) — regularized horseshoe
