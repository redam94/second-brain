---
title: Shrinkage Priors — Index
tags:
  - type/index
  - source/ingested
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
date_ingested: 2026-06-28
---

# Shrinkage Priors

Notes ingested from Piironen & Vehtari (2017), "Sparsity information and regularization in the horseshoe and other shrinkage priors" (Electronic Journal of Statistics). Sparse Bayesian regression via global-local continuous shrinkage priors: the horseshoe, how to set its global scale, and the regularized (Finnish) horseshoe.

> [!abstract] Routing Summary
> - Need the big picture / one entry point? → [[Horseshoe and Regularized Horseshoe Priors]]
> - Need the general scale-mixture framework, $\kappa_j$, ridge vs lasso vs horseshoe? → [[Global-Local Shrinkage Priors]]
> - Need the horseshoe definition + the $\text{Beta}(\tfrac12,\tfrac12)$ "horseshoe" $\kappa$ density + tail-robustness? → [[The Horseshoe Prior]]
> - Need to set $\tau$ from a guess $p_0$ of relevant variables ($m_\text{eff}$, $\tau_0$ formula)? → [[Choosing the Global Scale and Effective Nonzeros]]
> - Need to cap the largest coefficients / fix separation in logistic regression (slab scale $c$)? → [[Regularized Horseshoe (Finnish Horseshoe)]]
> - Need Stan / rstanarm code & parameterization advice? → [[Regularized Horseshoe (Finnish Horseshoe)]] (Examples)

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Cluster overview | [[Horseshoe and Regularized Horseshoe Priors]] | overview | the four below + [[Bayesian Linear Regression]] | Two fixes: $m_\text{eff}$-based $\tau$ and slab regularization |
| Scale-mixture framework | [[Global-Local Shrinkage Priors]] | concept | [[Bayesian Linear Regression]] | $\kappa_j=\big(1+n\sigma^{-2}\tau^2 s_j^2\lambda_j^2\big)^{-1}$, holds for any Gaussian scale mixture |
| Horseshoe prior | [[The Horseshoe Prior]] | definition | [[Global-Local Shrinkage Priors]] | $\lambda_j\sim\mathrm{C}^{+}(0,1)$ ⇒ $\kappa_j\sim\text{Beta}(\tfrac12,\tfrac12)$ |
| Global scale & $m_\text{eff}$ | [[Choosing the Global Scale and Effective Nonzeros]] | concept | [[The Horseshoe Prior]] | $\tau_0=\frac{p_0}{D-p_0}\frac{\sigma}{\sqrt n}$ from $\mathrm{E}(m_\text{eff})=p_0$ |
| Regularized horseshoe | [[Regularized Horseshoe (Finnish Horseshoe)]] | definition | [[The Horseshoe Prior]], [[Choosing the Global Scale and Effective Nonzeros]] | $\tilde\lambda_j^2=\frac{c^2\lambda_j^2}{c^2+\tau^2\lambda_j^2}$; soft slab cap at $c$ |

## Notes

- [[Horseshoe and Regularized Horseshoe Priors]] — CONTAINS: paper overview, model setup, both main contributions, worked $\tau_0$ example, separation example.
- [[Global-Local Shrinkage Priors]] — CONTAINS: scale-mixture definition, shrinkage factor $\kappa_j$, $p(\kappa_j)$ density, ridge/lasso/horseshoe comparison in $\kappa$-space, why to standardize predictors.
- [[The Horseshoe Prior]] — CONTAINS: half-Cauchy definition, horseshoe-shaped $\text{Beta}(\tfrac12,\tfrac12)$ density, tail-robustness, spike-and-slab limit.
- [[Choosing the Global Scale and Effective Nonzeros]] — CONTAINS: $m_\text{eff}=\sum(1-\kappa_j)$, prior mean/variance, $\tau_0$ formula, oracle $\tau^\ast=p^\ast/n$ link, critique of $\mathrm{C}^{+}(0,1)$ default.
- [[Regularized Horseshoe (Finnish Horseshoe)]] — CONTAINS: slab definition, product-of-factors view, regularized $\kappa$ and $\bar m_\text{eff}=(1-b)m_\text{eff}$, Inv-Gamma slab / Student-$t$, GLM pseudo-variance, Stan & rstanarm code.

## Cross-Cluster Links

- [[Bayesian Linear Regression]] — underlying regression model
- [[Spike-and-Slab Prior for Covariate Selection]] — discrete-mixture counterpart
- [[Hierarchical Linear Models]] — global scale as a shared hyperparameter
- [[Overfitting and Information Criteria]] — effective model size / regularization
- [[Partial Pooling as Multiple Comparisons Correction]] — shrinkage as multiplicity control

## Sources
- [[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]] — Piironen & Vehtari (2017), Electronic Journal of Statistics.
