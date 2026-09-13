---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/regularization
  - topic/sparsity
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "BDA3 Ch.14, pp. 376-380; Piironen & Vehtari (2017) Stat. Comput."
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
aliases:
  - horseshoe prior
  - regularized horseshoe
  - global-local shrinkage
  - RHS prior
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Bayesian Linear Regression]]"
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior is a global-local shrinkage prior for sparse regression. It uses a half-Cauchy distribution for the local scales, allowing large signals to pass through while aggressively shrinking near-zero coefficients. The regularized horseshoe (RHS, Piironen & Vehtari 2017) adds a Student-$t$ slab for numerical stability in HMC samplers.

## The Horseshoe Prior

For a high-dimensional linear model $y = X\beta + \varepsilon$, the horseshoe prior is:

$$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
$$\lambda_j \sim \text{Half-Cauchy}(0, 1) \quad \text{(local scale)}$$
$$\tau \sim \text{Half-Cauchy}(0, \tau_0) \quad \text{(global scale)}$$

The **local scales** $\lambda_j$ are the key: each coefficient gets its own scale, so large signals ($|\beta_j| \gg 0$) set $\lambda_j$ large and avoid shrinkage, while near-zero signals have $\lambda_j \approx 0$ and are shrunk toward zero. The horseshoe shape of the marginal prior gives the prior its name — the density has a spike at zero and heavy tails.

## Regularized Horseshoe (Piironen & Vehtari 2017)

The plain horseshoe has heavy tails that cause numerical issues with HMC. The regularized horseshoe replaces the Cauchy tails with a Student-$t$ slab:

$$\beta_j \mid \lambda_j, \tau, c \sim N\!\left(0, \tau^2 \tilde{\lambda}_j^2\right)$$
$$\tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$

where $c^2 \sim \text{Inverse-Gamma}(\alpha, \beta)$ controls the slab width. This caps the effective local scale at $c$, ensuring signals cannot grow unbounded.

## Choosing the Global Scale $\tau_0$

Piironen & Vehtari recommend setting $\tau_0$ based on the expected fraction of non-zero signals $p_0$:

$$\tau_0 = \frac{p_0}{p - p_0} \cdot \frac{\sigma}{\sqrt{n}}$$

where $p$ is the total number of predictors and $n$ is sample size.

## Comparison with Other Priors

| Prior | Spike at 0 | Tail weight | Stan-friendly |
|-------|------------|-------------|---------------|
| Ridge ($N(0,\tau^2)$) | No | Light | Yes |
| Lasso (Laplace) | No | Heavier | Moderately |
| Horseshoe | Yes | Heavy (Cauchy) | Challenging |
| Reg. Horseshoe | Yes | Student-$t$ slab | Yes |

## See Also

- [[Bayesian Linear Regression]] — context for when horseshoe priors are used
- [[MCMC Basics]] — HMC sampling for horseshoe models
- [[Factor Analysis and PPCA]] — alternative dimensionality reduction approach
