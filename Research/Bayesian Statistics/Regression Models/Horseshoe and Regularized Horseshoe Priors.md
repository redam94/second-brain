---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regularization
  - topic/priors
  - type/concept
  - doc/paper
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-08-12
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
source_location: "Piironen & Vehtari 2017 (RHS); Carvalho et al. 2010 (HS)"
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Bayesian Linear Regression]]"
aliases:
  - "horseshoe prior"
  - "regularized horseshoe"
  - "RHS prior"
  - "global-local shrinkage"
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior (Carvalho et al. 2010) and its regularized variant (Piironen & Vehtari 2017) are global-local shrinkage priors for sparse Bayesian regression. They shrink small coefficients aggressively toward zero (like a spike-and-slab) while leaving large signals nearly unshrunk — unlike the Lasso, which penalizes all coefficients equally. The regularized horseshoe adds a slab component that avoids computational pathologies near zero.

## The Horseshoe Prior

> [!definition] Definition: Horseshoe Prior (Carvalho et al. 2010)
> $$\beta_j \mid \lambda_j, \tau \sim N(0, \lambda_j^2 \tau^2)$$
> $$\lambda_j \sim \text{Half-Cauchy}(0, 1)$$
> $$\tau \sim \text{Half-Cauchy}(0, \tau_0)$$
> where $\lambda_j$ is the **local shrinkage parameter** (per-coefficient) and $\tau$ is the **global shrinkage parameter** (shared across all coefficients).
^def-horseshoe

**Key property**: the horseshoe-shaped marginal prior on $\beta_j$ has a spike at zero (shrinks noise) and heavy tails (preserves signals). The kappa factor $\kappa_j = 1/(1 + \lambda_j^2 \tau^2)$ measures how much coefficient $j$ is shrunk: $\kappa_j \approx 1$ means shrunk to zero; $\kappa_j \approx 0$ means unshrunk.

## The Regularized Horseshoe (Piironen & Vehtari 2017)

> [!definition] Definition: Regularized Horseshoe Prior (RHS)
> $$\beta_j \mid \tilde{\lambda}_j, \tau, c \sim N\!\left(0,\, \tau^2 \tilde{\lambda}_j^2\right), \quad \tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$
> The slab variance $c^2$ regularizes the largest local scales, preventing the Cauchy tails from causing numerical issues and enabling efficient HMC sampling.
^def-rhs

**Advantages over plain horseshoe**: better computational behavior in Stan/NUTS; the slab controls how large signals can be (important when $n < p$).

## Global Shrinkage and Sparsity

The global scale $\tau$ controls the overall sparsity level. A principled choice:
$$\tau_0 = \frac{p_0}{p - p_0} \cdot \frac{\sigma}{\sqrt{n}}$$
where $p_0$ is the expected number of relevant predictors (prior guess).

## Comparison with Other Priors

| Prior | Tail behavior | Spike at zero | Computational cost |
|-------|--------------|---------------|-------------------|
| Ridge ($N(0, \tau^2)$) | Gaussian (light) | No | Low |
| Lasso ($\text{Laplace}$) | Exponential | No | Moderate |
| Spike-and-slab | Heavy | Yes (exact) | High (discrete) |
| Horseshoe | Cauchy (very heavy) | Yes (soft) | Moderate-High |
| Regularized Horseshoe | Bounded heavy tails | Yes (soft) | Moderate |

## See Also

- [[Bayesian Linear Regression]] — context where horseshoe priors are applied
- [[Approximation Methods]] — variational inference as an alternative to MCMC for horseshoe posteriors
- [[Nonparametric Models Overview]] — sparse GP models use related ideas
