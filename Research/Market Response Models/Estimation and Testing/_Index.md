---
title: "Index: Estimation and Testing"
tags:
  - type/index
  - source/ingested
  - topic/market-response
date_updated: 2026-04-19
concept_count: 4
---

# Estimation and Testing

> [!abstract] Routing Summary
> Covers estimation methods (OLS through Bayesian HB), specification testing, flexible functional forms, and model selection. Source: Hanssens, Parsons & Schultz (2001) Ch. 5.
> - Need OLS, GLS, SUR, 2SLS, Bayesian HB/EB, IV, and Hausman test? → [[Parameter Estimation in Market Response]]
> - Need F-test, t-test, RESET, multicollinearity, and the 7 specification errors? → [[Model Testing and Specification]]
> - Need translog, Box-Cox, LOESS, and splines for flexible forms? → [[Flexible Functional Forms]]
> - Need AIC, BIC, cross-validation, and pre-registration for model selection? → [[Model Selection and Exploratory Analysis]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| OLS/GLS/SUR/2SLS/Bayesian HB estimation | [[Parameter Estimation in Market Response]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]] | OLS Eq 5.5; Bayes posterior Eq 5.27; HB shrinkage Eq 5.30 |
| F-test, RESET, 7 specification errors, multicollinearity | [[Model Testing and Specification]] | concept | [[Parameter Estimation in Market Response]] | RESET Eq 5.40; variance inflation factor; 7 error types |
| Translog, Box-Cox, LOESS, spline flexible forms | [[Flexible Functional Forms]] | concept | [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]] | Box-Cox nests linear and log-log as special cases |
| AIC/BIC, cross-validation, EDA, pre-registration | [[Model Selection and Exploratory Analysis]] | concept | [[Model Testing and Specification]], [[Flexible Functional Forms]] | Information criteria trade-off fit vs parsimony |

## Notes

- [[Parameter Estimation in Market Response]] — CONTAINS: OLS estimator (Eq 5.5–5.6), GLS for autocorrelation/heteroskedasticity, SUR for cross-equation restrictions, 2SLS/3SLS for endogenous regressors, Bayesian posterior (Eq 5.27), hierarchical Bayes shrinkage (Eq 5.30), empirical Bayes, Hausman endogeneity test
- [[Model Testing and Specification]] — CONTAINS: F-test (Eq 5.35), t-test (Eq 5.37), RESET test (Eq 5.40), 7 specification error types (omitted variables, wrong functional form, measurement error, simultaneous equations, autocorrelation, heteroskedasticity, multicollinearity), VIF diagnostics
- [[Flexible Functional Forms]] — CONTAINS: translog form, Box-Cox power transformation (nests linear and log-log), LOESS nonparametric smoothing, spline regression, when to use flexible vs parametric forms, estimation challenges
- [[Model Selection and Exploratory Analysis]] — CONTAINS: AIC/BIC information criteria, leave-one-out cross-validation, exploratory data analysis tools, confirmatory vs exploratory research design, multiple testing in model search, pre-registration discipline

## Sources

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf]] — Hanssens, Parsons & Schultz (2001), Ch. 5
