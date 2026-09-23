---
title: "Index: Sensitivity Analysis"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Agent-Based Modeling/Calibration and Validation/_Index|Calibration and Validation]]"
date_updated: 2026-06-28
concept_count: 5
---

# Sensitivity Analysis

> [!abstract] Routing Summary
> This folder covers **global sensitivity analysis (GSA)** for ABM parameter spaces — variance-based Sobol indices, Morris screening, and Saltelli/FAST estimation. Source: Sadeghi & Matwin (2024). Contains 5 notes.
> - Need the big picture, the four GSA families, and screen-vs-quantify guidance? -> [[Global Sensitivity Analysis - Overview]]
> - Need the ANOVA variance decomposition and first-order / total-effect index formulas? -> [[Variance-Based Sensitivity and Sobol Indices]]
> - Need cheap factor screening with $\mu^*$ and $\sigma$? -> [[Morris Elementary Effects Screening]]
> - Need the Saltelli sampling scheme, run-count cost, FAST, or SALib? -> [[Sampling and Estimation for Sobol Indices]]
> - Need to know why OAT/local SA is misleading for high-dim interacting ABMs? -> [[Local vs Global Sensitivity Analysis]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| GSA overview & method families | [[Global Sensitivity Analysis - Overview]] | overview | [[Local vs Global Sensitivity Analysis]] | Sample-then-analyze; variance/derivative/distribution families; screen then quantify |
| Sobol indices & ANOVA decomposition | [[Variance-Based Sensitivity and Sobol Indices]] | definition | [[Global Sensitivity Analysis - Overview]] | $S_i=V_i/V(Y)$, $S_{Ti}=\sum_{k\in\#i}S_k$; $S_{Ti}-S_i$ = interactions |
| Morris elementary-effects screening | [[Morris Elementary Effects Screening]] | definition | [[Global Sensitivity Analysis - Overview]] | $\mu^*,\sigma$ at $O(r(p{+}1))$ runs; $\mu^*$ ranks like $S_{Ti}$ |
| Saltelli/FAST estimation & cost | [[Sampling and Estimation for Sobol Indices]] | concept | [[Variance-Based Sensitivity and Sobol Indices]] | Saltelli $N(p{+}2)$ runs; FAST spectral; SALib |
| Local vs global SA | [[Local vs Global Sensitivity Analysis]] | concept | [[Global Sensitivity Analysis - Overview]] | OAT misses interactions & high-dim coverage; global captures both |

## Notes

- [[Global Sensitivity Analysis - Overview]] — CONTAINS: two-phase sample/analyze paradigm, four GSA families (variance/derivative/distribution/feature-additive), screening vs quantification, factor prioritization/fixing/interaction questions, cost overview, MNIST case-study findings
- [[Variance-Based Sensitivity and Sobol Indices]] — CONTAINS: ANOVA/Sobol-Hoeffding variance decomposition $V(Y)=\sum V_i+\sum V_{ij}+\dots$, $V_i=V(E(Y|X_i))$, first-order $S_i$, second-order $S_{ij}$, total-effect $S_{Ti}$, additivity identity $\sum S_i\le 1$, interaction detection
- [[Morris Elementary Effects Screening]] — CONTAINS: elementary effect $EE_i$, mean $\mu_i$, std $\sigma_i$, Campolongo $\mu_i^*$ (absolute), $(\mu^*,\sigma)$ plane interpretation, DGSM generalization, screening cost
- [[Sampling and Estimation for Sobol Indices]] — CONTAINS: Saltelli A/B/$A_B^{(i)}$ design and $N(p+2)$ cost, FAST Fourier/Parseval spectral estimation, RBD/FAST_RBD, Table 1 sample budgets, SALib usage
- [[Local vs Global Sensitivity Analysis]] — CONTAINS: OAT definition, assumptions of linearity/independence, OAT pitfalls (no interactions, baseline dependence, vanishing high-dim coverage, non-monotonicity), pure-interaction $Y=ab$ counterexample

## Sources
- Review of Global Sensitivity Analysis Methods 2024 — Sadeghi & Matwin (2024), "A Review of Global Sensitivity Analysis Methods and a Comparative Case Study on Digit Classification"
