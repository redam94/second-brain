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
|---------|------|------|------------|------------|
| Parameter estimation | [[Parameter Estimation in Market Response]] | concept | Functional Forms, Static Design | OLS (Eqs 5.5-5.6), GLS, SUR, 2SLS/3SLS, Bayesian posterior (Eq 5.27), HB shrinkage (Eq 5.30) |
| Model testing | [[Model Testing and Specification]] | concept | Parameter Estimation | F-test (Eq 5.35), t-test (Eq 5.37), RESET (Eq 5.40); 7 specification error types; autocorrelation tests |
| Flexible functional forms | [[Flexible Functional Forms]] | concept | Functional Forms | Translog, Box-Cox transformation, LOESS, splines for non-parametric response |
| Model selection & EDA | [[Model Selection and Exploratory Analysis]] | concept | Model Testing | AIC/BIC, leave-one-out cross-validation, EDA plots, multiple testing correction, pre-registration |

## Notes

- [[Parameter Estimation in Market Response]] — CONTAINS: OLS normal equations (Eqs 5.5-5.6); GLS for autocorrelation; SUR for cross-equation constraints; 2SLS/3SLS for endogeneity; Bayesian posterior (Eq 5.27); hierarchical Bayes shrinkage (Eq 5.30); IV specification.
- [[Model Testing and Specification]] — CONTAINS: F-test (Eq 5.35) and t-test (Eq 5.37) for parameter restrictions; RESET test (Eq 5.40) for functional form; 7 common specification errors; Durbin-Watson autocorrelation; Box-Cox transformation test.
- [[Flexible Functional Forms]] — CONTAINS: translog flexible form for market-level models; Box-Cox power transformation; LOESS local smoothing; spline representations; when to use each flexible alternative.
- [[Model Selection and Exploratory Analysis]] — CONTAINS: AIC/BIC formulas and selection logic; leave-one-out and k-fold cross-validation; EDA checklist for marketing data; multiple testing problem in model selection; pre-registration for managerial calibration.
