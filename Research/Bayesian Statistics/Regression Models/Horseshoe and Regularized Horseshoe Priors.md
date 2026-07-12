---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/shrinkage-priors
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "BDA3 Ch.14, §14.8; Carvalho et al. 2010; Piironen & Vehtari 2017"
date_ingested: 2026-07-12
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[Bayesian Linear Regression]]"
aliases:
  - horseshoe prior
  - regularized horseshoe
  - global-local shrinkage prior
  - Finnish horseshoe
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The horseshoe prior (Carvalho et al. 2010) is a global-local shrinkage prior for sparse Bayesian regression. It aggressively shrinks noise coefficients toward zero while leaving large signals nearly unshrunk — the "horseshoe" shape of the prior density at zero. The **regularized horseshoe** (Finnish horseshoe; Piironen & Vehtari 2017) adds a slab component that softly bounds large coefficients, preventing pathological posterior behavior in Stan.

## Model

The horseshoe prior places a half-Cauchy hyperprior on each coefficient's local scale:

$$\beta_j \mid \lambda_j, \tau \sim \mathcal{N}(0, \lambda_j^2 \tau^2)$$
$$\lambda_j \sim \text{Half-Cauchy}(0, 1), \quad \tau \sim \text{Half-Cauchy}(0, \tau_0)$$

- $\tau$ is the **global shrinkage parameter**: controls overall sparsity level
- $\lambda_j$ is the **local scale** for coefficient $j$: allows large signals to escape shrinkage

The resulting marginal prior on $\beta_j$ has a horseshoe shape — a spike at zero and heavy tails — which does not penalize large signals.

> [!definition] Definition: Horseshoe Prior
> The horseshoe prior for $\beta_j$ is obtained by the Normal-Half-Cauchy hierarchy above. Its marginal prior density satisfies:
> $$p(\beta_j \mid \tau) \propto \log\!\left(1 + \frac{4\tau^2}{\beta_j^2}\right)$$
> which has a pole-like spike at zero and Cauchy-like heavy tails.
^horseshoe-prior

## Regularized (Finnish) Horseshoe

The standard horseshoe has pathological behavior in Stan: the Cauchy tails make HMC sampling difficult with flat priors on $\lambda_j$. Piironen & Vehtari (2017) propose the **regularized horseshoe** which introduces a slab:

$$\tilde{\lambda}_j^2 = \frac{c^2 \lambda_j^2}{c^2 + \tau^2 \lambda_j^2}$$
$$\beta_j \mid \tilde{\lambda}_j, \tau \sim \mathcal{N}(0, \tilde{\lambda}_j^2 \tau^2)$$

where $c^2 \sim \text{Inv-Gamma}(\alpha, \beta)$ is a slab-scale hyperparameter. This truncates extreme $\lambda_j$ values, making the model well-behaved for HMC while preserving the horseshoe's sparsity-inducing properties.

## Setting $\tau_0$

A practical recommendation (Piironen & Vehtari 2017): set the global scale based on the expected fraction of non-zero coefficients $p_0$:

$$\tau_0 = \frac{p_0}{p - p_0} \cdot \frac{\sigma}{\sqrt{n}}$$

where $p$ is total predictors and $n$ is sample size. This encodes an informative prior on sparsity.

## Connection to BDA3

BDA3 Ch. 14.8 introduces the horseshoe as the state-of-the-art regularization prior for high-dimensional sparse regression, contrasting it with the ridge ($\mathcal{N}(0, \tau^2)$) and Lasso (Laplace) priors that shrink all coefficients uniformly.

## Connections

- [[Bayesian Linear Regression]] — horseshoe as the preferred regularization prior for sparse problems
- [[Nonparametric Models Overview]] — Gaussian processes and Dirichlet processes as alternative nonparametric priors
- [[Approximation Methods]] — variational inference approximations to the horseshoe posterior

## See Also

- Carvalho, Polson & Scott (2010). *The horseshoe estimator for sparse signals.* Biometrika.
- Piironen & Vehtari (2017). *Sparsity information and regularization in the horseshoe and other shrinkage priors.* Electronic Journal of Statistics.
