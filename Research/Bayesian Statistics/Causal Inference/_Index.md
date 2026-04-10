---
title: "Index: Bayesian Causal Inference"
tags:
  - type/index
  - source/ingested
parent: "[[../Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-10
concept_count: 10
---

# Bayesian Causal Inference

> [!abstract] Routing Summary
> This folder covers the Bayesian approach to causal inference under the potential outcomes framework, based on Li, Ding & Mealli (2022). Contains 10 notes across 3 sub-topics.
> - For potential outcomes setup, SUTVA, ignorability, propensity score? → [[Foundations/_Index|Foundations]]
> - For Bayesian CI likelihood factorization, BART/GP/BCF outcome models, propensity score strategies? → [[Bayesian Inference/_Index|Bayesian Inference]]
> - For sensitivity analysis (E-value, copula), IV/principal stratification, time-varying treatments? → [[Sensitivity and Complex Mechanisms/_Index|Sensitivity and Complex Mechanisms]]
> - For paper overview, key contributions, paper structure map? → [[Li et al 2022 - Overview]]

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 3 | Potential outcomes, SUTVA, ignorability, causal estimands, frequentist methods |
| [[Bayesian Inference/_Index\|Bayesian Inference]] | 3 | Bayesian CI structure, outcome models (BART/GP/BCF), propensity score strategies |
| [[Sensitivity and Complex Mechanisms/_Index\|Sensitivity and Complex Mechanisms]] | 3 | E-value, copula sensitivity, IV/principal stratification, g-formula, time-varying treatments |

## Paper Overview

- [[Li et al 2022 - Overview]] — "Bayesian causal inference: a critical review", Li, Ding & Mealli (2022), *Phil. Trans. R. Soc. A* 381

## Key Concept Dependency Chain

```
Potential Outcomes Framework
  └─► Causal Estimands (ITE, SATE, CATE, PATE, MATE)
        └─► Frequentist Causal Estimation (IPW, DR, matching)
  └─► General Structure of Bayesian CI (factorization, Assumption 3.2)
        └─► Bayesian Outcome Models (BART, BCF, GP, regularization-induced confounding)
        └─► Propensity Score in Bayesian CI (3 strategies)
  └─► Sensitivity Analysis in Observational Studies (E-value, copula)
  └─► Instrumental Variables and Principal Stratification (CACE, compliance strata)
  └─► Time-Varying Treatments and G-computation (g-formula, sequential ignorability)
```

## Cross-Cutting Themes

- **Propensity score paradox**: Drops from Bayesian likelihood under ignorability, yet essential for design/overlap — appears in [[General Structure of Bayesian CI]], [[Propensity Score in Bayesian CI]], [[Bayesian Outcome Models]]
- **Regularization-induced confounding**: In high dimensions, standard Bayesian priors can bias causal estimates — see [[Bayesian Outcome Models#^warn-reg-confounding]] and [[General Structure of Bayesian CI#^warn-prior-dogmatism]]
- **Transparent parametrization**: Separating identifiable from non-identifiable parameters — see [[Sensitivity Analysis in Observational Studies]], [[General Structure of Bayesian CI]]

## Sources

- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li F, Ding P, Mealli F. 2023. *Phil. Trans. R. Soc. A* 381: 20220153

## Cross-Links to Existing Vault Notes

- [[Bayesian Propensity Scores and IPW]] — Bayesian IPW via Liao-Zigler two-stage method (Heiss blog) — related to [[Propensity Score in Bayesian CI]] Strategy 3
- [[Nonparametric Causal Inference]] — BART and non-parametric Bayesian causal methods — related to [[Bayesian Outcome Models]]
- [[Copula Estimation]] — copula methods used in sensitivity analysis — related to [[Sensitivity Analysis in Observational Studies]]
