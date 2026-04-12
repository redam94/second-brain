---
title: "Index: Estimation and Testing"
tags:
  - type/index
  - source/ingested
  - topic/market-response
parent: "[[../_Index|Market Response Models]]"
date_updated: 2026-04-11
---

# Estimation and Testing

> [!abstract] Routing Summary
> Covers OLS, GLS, SUR, 2SLS, Bayesian HB/EB estimation; specification testing; flexible forms; model selection.
> - OLS, GLS, SUR, 2SLS, 3SLS, Bayesian HB/EB, IV, Hausman test → [[Parameter Estimation in Market Response]]
> - F-test, t-test, RESET, 7 specification errors, autocorrelation, Box-Cox → [[Model Testing and Specification]]
> - Translog, Box-Cox transformation, LOESS, splines → [[Flexible Functional Forms]]
> - AIC, BIC, cross-validation, managerial calibration, pre-registration → [[Model Selection and Exploratory Analysis]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Parameter Estimation | [[Parameter Estimation in Market Response]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]] | OLS (Eq 5.5), GLS, SUR, 2SLS/3SLS; Bayesian posterior (Eq 5.27); HB shrinkage (Eq 5.30) |
| Specification Testing | [[Model Testing and Specification]] | concept | [[Parameter Estimation in Market Response]] | F-test (Eq 5.35), RESET (Eq 5.40), 7 specification errors; DW/BG autocorrelation |
| Flexible Functional Forms | [[Flexible Functional Forms]] | concept | [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]] | Translog, Box-Cox λ transformation, LOESS, B-splines |
| Model Selection | [[Model Selection and Exploratory Analysis]] | concept | [[Model Testing and Specification]], [[Flexible Functional Forms]] | AIC/BIC, LOO-CV, EDA, pre-registration, multiple testing controls |
