---
title: "Index: Estimation and Testing"
tags:
  - type/index
  - topic/market-response
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
| OLS/GLS/SUR/2SLS, Bayesian HB/EB, IV, Hausman test | [[Parameter Estimation in Market Response]] | concept | [[Functional Forms in Marketing]], [[Market Share Models]] | SUR improves efficiency for equation systems; Bayesian HB shrinks individual estimates toward pooled mean |
| F/t-tests, RESET, 7 specification errors, autocorrelation | [[Model Testing and Specification]] | concept | [[Parameter Estimation in Market Response]] | RESET detects functional form misspecification; 7 specification errors cover omitted variables, aggregation, measurement |
| Translog, Box-Cox, LOESS, splines | [[Flexible Functional Forms]] | concept | [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]] | Flexible forms allow data to determine curvature rather than imposing it; Box-Cox nests linear and log forms |
| AIC/BIC, cross-validation, EDA, pre-registration | [[Model Selection and Exploratory Analysis]] | concept | [[Parameter Estimation in Market Response]], [[Flexible Functional Forms]] | Information criteria penalize complexity; cross-validation assesses predictive validity; pre-registration prevents p-hacking |

## Notes
- [[Parameter Estimation in Market Response]] — CONTAINS: OLS normal equations (Eqs 5.5-5.6), GLS for autocorrelation, SUR for equation systems, 2SLS/3SLS for endogeneity, Bayesian posterior (Eq 5.27), hierarchical Bayes shrinkage (Eq 5.30), IV and Hausman test
- [[Model Testing and Specification]] — CONTAINS: F-test for restrictions (Eq 5.35), t-test for coefficients (Eq 5.37), Ramsey RESET test (Eq 5.40), 7 types of specification error, autocorrelation diagnostics, Box-Cox test for functional form
- [[Flexible Functional Forms]] — CONTAINS: Translog second-order approximation, Box-Cox power transformation, LOESS non-parametric regression, spline bases for flexible response
- [[Model Selection and Exploratory Analysis]] — CONTAINS: AIC/BIC model selection criteria, leave-one-out cross-validation, EDA for marketing data, multiple testing corrections, pre-registration rationale
