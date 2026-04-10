---
title: "Index: Causal Inference Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Causal Inference]]"
date_updated: 2026-04-10
concept_count: 3
---

# Causal Inference Foundations

> [!abstract] Routing Summary
> This folder covers the foundational setup for causal inference under the potential outcomes framework. Contains 3 notes.
> - Need the potential outcomes setup, SUTVA, ignorability, overlap? → [[Potential Outcomes Framework]]
> - Need formal definitions of ITE, SATE, CATE, PATE, MATE? → [[Causal Estimands]]
> - Need Frequentist estimators (IPW, outcome modeling, doubly-robust)? → [[Frequentist Causal Estimation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| SUTVA | [[Potential Outcomes Framework]] | definition | — | No interference, no multiple versions |
| Ignorability | [[Potential Outcomes Framework]] | definition | — | Unconfoundedness + overlap → identification |
| Propensity score | [[Potential Outcomes Framework]] | definition | SUTVA | $e(x) = \Pr(Z=1\mid X=x)$; balancing score |
| ITE | [[Causal Estimands]] | definition | Potential Outcomes Framework | $\tau_i = Y_i(1) - Y_i(0)$ |
| CATE | [[Causal Estimands]] | definition | ITE | $\tau(x) = \mu_1(x) - \mu_0(x)$ |
| PATE / SATE / MATE | [[Causal Estimands]] | definition | ITE | Population vs. sample vs. empirical-$X$ average |
| IPW estimator | [[Frequentist Causal Estimation]] | theorem | Ignorability | Consistent if propensity score model correct |
| Doubly-robust estimator | [[Frequentist Causal Estimation]] | theorem | IPW + outcome model | Consistent if *either* model correct |

## Notes

- [[Potential Outcomes Framework]] — CONTAINS: SUTVA (Assumption), Ignorability/Overlap (Assumption 2.1), identification equation, design vs. analysis stage distinction
- [[Causal Estimands]] — CONTAINS: ITE, SATE, CATE, PATE, MATE formal definitions with LaTeX; principal causal effects (IV preview)
- [[Frequentist Causal Estimation]] — CONTAINS: outcome modeling estimator, IPW (definition), Hájek IPW, doubly-robust estimator (definition + double robustness theorem), matching/weighting overview

## Sources

- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — §2, pp. 2–5

## See Also
- [[Bayesian Inference/_Index|Bayesian Inference]] — how Bayesian CI builds on these foundations
