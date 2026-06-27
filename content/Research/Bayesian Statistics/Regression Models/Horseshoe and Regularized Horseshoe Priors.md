---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/reference
source: "Carvalho, Polson & Scott (2010), Biometrika; Piironen & Vehtari (2017), EJS"
source_location: "Reference note (global-local shrinkage literature)"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Hierarchical Models]]"
used_by: []
aliases:
  - horseshoe prior
  - regularized horseshoe
  - global-local shrinkage
  - Finnish horseshoe
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> The **horseshoe** is a global-local shrinkage prior for sparse high-dimensional regression (Carvalho, Polson & Scott 2010). Each coefficient gets its own heavy-tailed local scale $\lambda_j$ multiplied by a global scale $\tau$, so the prior aggressively shrinks noise coefficients toward zero while leaving genuinely large signals essentially unpenalized. The **regularized ("Finnish") horseshoe** (Piironen & Vehtari 2017) adds a slab that caps the effective scale of the largest coefficients, fixing the heavy-tail instability of the plain horseshoe in weakly-identified or separable problems and letting the user encode a prior guess at the number of relevant predictors.

## Overview

In high-dimensional regression where most coefficients are expected to be (near) zero but a few are large, neither a single Gaussian ridge prior (over-shrinks signals) nor a Laplace/LASSO prior (under-shrinks noise, biases signals) is ideal. **Global-local shrinkage priors** resolve this by giving every coefficient its own scale, drawn from a heavy-tailed distribution. The horseshoe is the canonical example and a default choice for sparse Bayesian regression. This note supports [[Bayesian Linear Regression]], where it appears as the state-of-the-art shrinkage option.

## Main Content

> [!definition] Definition: Horseshoe prior (Carvalho, Polson & Scott 2010)
> For regression coefficients $\beta_j$, $j = 1, \dots, D$:
> $$
> \beta_j \mid \lambda_j, \tau \;\sim\; \mathcal{N}\!\left(0,\ \lambda_j^2\,\tau^2\right),
> \qquad
> \lambda_j \;\sim\; \mathcal{C}^{+}(0, 1),
> \qquad
> \tau \;\sim\; \mathcal{C}^{+}(0, \tau_0),
> $$
> where $\mathcal{C}^{+}$ is the half-Cauchy distribution, $\lambda_j$ is the **local** (per-coefficient) scale, and $\tau$ is the **global** scale shared across coefficients.
>
> **Name / intuition.** With $\tau = 1$ and unit noise, the shrinkage factor $\kappa_j = 1/(1 + \lambda_j^2)$ has a $\text{Beta}(1/2, 1/2)$ distribution — a symmetric "horseshoe" shape with mass piled at $\kappa_j \approx 0$ (no shrinkage, signal kept) and $\kappa_j \approx 1$ (total shrinkage, noise killed). The half-Cauchy tails on $\lambda_j$ allow arbitrarily large signals to escape shrinkage; the global $\tau$ controls overall sparsity.
> ^def-horseshoe

> [!definition] Definition: Regularized (Finnish) horseshoe (Piironen & Vehtari 2017)
> Replace the local scale $\lambda_j$ with a **slab-truncated** version $\tilde\lambda_j$:
> $$
> \beta_j \mid \lambda_j, \tau, c \;\sim\; \mathcal{N}\!\left(0,\ \tilde\lambda_j^2\,\tau^2\right),
> \qquad
> \tilde\lambda_j^2 = \frac{c^2\,\lambda_j^2}{c^2 + \tau^2 \lambda_j^2},
> \qquad
> c^2 \sim \text{Inv-Gamma}(\nu/2,\ \nu s^2/2).
> $$
> For coefficients far below the slab scale ($\tau\lambda_j \ll c$) this reduces to the ordinary horseshoe; for coefficients far above it ($\tau\lambda_j \gg c$) the prior tends to $\mathcal{N}(0, c^2)$ — a Gaussian **slab** of width $c$ that regularizes otherwise unbounded large coefficients.
>
> **Choosing the global scale.** Piironen & Vehtari recommend setting $\tau_0$ from a prior guess $p_0$ of the number of relevant predictors:
> $$
> \tau_0 = \frac{p_0}{D - p_0}\cdot\frac{\sigma}{\sqrt{n}},
> $$
> where $D$ is the number of predictors, $n$ the sample size, and $\sigma$ the noise scale. This turns vague sparsity beliefs into a calibrated prior.
> ^def-regularized-horseshoe

### Why "regularized"

The plain horseshoe's Cauchy tails place no bound on the largest coefficients. In well-identified problems this is harmless, but under weak identification or separation (e.g. logistic regression with quasi-separable data) the unbounded tails cause poorly-behaved, hard-to-sample posteriors. The slab term $c$ caps the effective prior variance of large signals, restoring stable, geometry-friendly posteriors while preserving the horseshoe's sharp noise-vs-signal separation.

## Connections

- A **shrinkage prior** for [[Bayesian Linear Regression]] — contrasts with ridge (Gaussian, over-shrinks signals) and Bayesian LASSO (Laplace, under-shrinks noise).
- Conceptually a continuous relaxation of spike-and-slab variable selection; compare the [[Spike-and-Slab Prior for Covariate Selection]] used in structural time-series.
- Global-local scale mixtures are estimated with the same HMC/NUTS machinery as other hierarchical priors ([[Efficient MCMC]], [[Hierarchical Models]]); non-centered parameterization of $\lambda_j, \tau$ is usually needed for good geometry.

## See Also

- [[Bayesian Linear Regression]] — where the horseshoe is the recommended sparse-regression prior
- [[Hierarchical Models]] — the scale-mixture structure underlying global-local priors
- [[Spike-and-Slab Prior for Covariate Selection]] — discrete-selection alternative
