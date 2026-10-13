---
title: "Index: Feature Importance"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Model Validation]]"
date_updated: 2026-10-13
concept_count: 5
---

# Feature Importance

> [!abstract] Routing Summary
> This folder covers how tree-based and permutation importance measures are biased, unstable, and credit correlated proxies — and the remedies. Contains 5 reference notes.
> - Need Gini/permutation importance bias? → [[Strobl et al 2007 - Bias in Random Forest Variable Importance]]
> - Need correlated predictors credited as drivers? → [[Strobl et al 2008 - Conditional Variable Importance]]
> - Need why permute-and-predict (and some SHAP) mislead? → [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]]
> - Need importance across all near-optimal models (Rashomon set)? → [[Fisher et al 2019 - Model Class Reliance]]
> - Need which variables survive resampling; error control? → [[Meinshausen and Buhlmann 2010 - Stability Selection]]

## Concept Map

| Note | Type | Key Result |
|------|------|------------|
| [[Strobl et al 2007 - Bias in Random Forest Variable Importance]] | definition | Importance favours predictors with more cut-points; fix: cforest with subsampling |
| [[Strobl et al 2008 - Conditional Variable Importance]] | definition | Marginal permutation tests $X_j \perp (Y,Z)$; conditional tests $X_j \perp Y \mid Z$ |
| [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] | definition | Permutation evaluates off-manifold; linear case $2\beta^2\mathrm{Var}(X_j)$ vs conditional $2\beta^2E[\mathrm{Var}(X_j\mid X_{-j})]$ |
| [[Fisher et al 2019 - Model Class Reliance]] | definition | Model class reliance interval $[MCR_-, MCR_+]$ over $\mathcal{R}(\epsilon)$ |
| [[Meinshausen and Buhlmann 2010 - Stability Selection]] | theorem | $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$ |

## Notes

- [[Strobl et al 2007 - Bias in Random Forest Variable Importance]] — CONTAINS: Gini & permutation importance defs; bias sources; unbiased cforest
- [[Strobl et al 2008 - Conditional Variable Importance]] — CONTAINS: Conditional permutation importance (^def-conditional-permutation-importance)
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] — CONTAINS: Permute-and-predict def; LOCO / condition-and-predict alternatives
- [[Fisher et al 2019 - Model Class Reliance]] — CONTAINS: Model reliance $MR=e_{switch}/e_{orig}$; MCR; finite-sample bounds
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] — CONTAINS: Stability selection def; Theorem 1 error bound; randomised lasso

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]] — bibliography and verified quotations

## See Also
- [[../_Index|Model Validation]] — parent topic
