---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/regularization
  - topic/shrinkage
  - type/concept
  - doc/paper
date_ingested: 2026-10-21
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by: []
aliases:
  - Horseshoe Prior
  - Regularized Horseshoe
  - Finnish Horseshoe
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior (Carvalho et al. 2010) and its regularized variant (Piironen & Vehtari 2017) are continuous global-local shrinkage priors for sparse high-dimensional regression. Unlike LASSO/Ridge which apply uniform shrinkage, horseshoe priors place near-zero mass on a "horseshoe" around zero combined with heavy tails — aggressively shrinking noise while leaving strong signals largely unshrunk.

## Overview

In high-dimensional sparse regression where $p \gg n$ or $p \approx n$, we want priors that:
1. Strongly shrink noise coefficients toward zero
2. Leave large "signal" coefficients relatively unshrunk
3. Enable efficient posterior computation

The horseshoe prior achieves this via a hierarchical construction with **global** and **local** shrinkage parameters.

## The Horseshoe Prior

> [!definition] Definition: Horseshoe Prior (Carvalho, Polson & Scott, 2010)
> For regression coefficients $\beta_j$, $j = 1, \ldots, p$:
> $$\beta_j \mid \lambda_j, \tau \sim \mathcal{N}(0, \lambda_j^2 \tau^2)$$
> $$\lambda_j \sim \text{Half-Cauchy}(0, 1) \quad \text{(local shrinkage)}$$
> $$\tau \sim \text{Half-Cauchy}(0, \tau_0) \quad \text{(global shrinkage)}$$
> The local parameters $\lambda_j$ allow individual coefficients to escape shrinkage; $\tau$ sets the global level.
^def-horseshoe

The **shrinkage factor** for coefficient $j$ is $\kappa_j = 1/(1 + \lambda_j^2 \tau^2)$. Values near 1 shrink toward zero; values near 0 leave the coefficient unshrunk. The marginal prior on $\kappa_j$ under Half-Cauchy $\lambda_j$ has the characteristic "horseshoe" shape: bimodal at 0 and 1.

## Regularized Horseshoe (Finnish Horseshoe)

> [!definition] Definition: Regularized Horseshoe Prior (Piironen & Vehtari, 2017)
> To improve numerical stability, the local parameters are regularized:
> $$\beta_j \mid \lambda_j, \tau, c \sim \mathcal{N}\!\left(0, \tilde{\lambda}_j^2 \tau^2\right), \quad \tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$
> where $c^2 \sim \text{Inv-Gamma}(\nu/2, \nu s^2/2)$ caps the local shrinkage. Defaults: $\nu = 4$, $s^2 = \hat{\sigma}^2$.
^def-reg-horseshoe

The regularization parameter $c$ bounds how large any individual $\tilde\lambda_j$ can grow, preventing degenerate posteriors in small-$n$ settings.

## Setting the Global Scale $\tau_0$

A key practical choice: the global scale should reflect prior beliefs about sparsity. If we expect $p_0$ non-zero coefficients out of $p$ total:
$$\tau_0 = \frac{p_0}{p - p_0} \cdot \frac{\sigma}{\sqrt{n}}$$

## Connections

- [[Bayesian Linear Regression]] — broader context of Bayesian regularization approaches (LASSO, ridge, shrinkage priors)
- [[Nonparametric Models Overview]] — in high-dimensional settings, horseshoe is an alternative to GP-based approaches

## See Also
- Carvalho, Polson & Scott (2010) "The Horseshoe Estimator for Sparse Signals"
- Piironen & Vehtari (2017) "Sparsity information and regularization in the horseshoe and other shrinkage priors"
