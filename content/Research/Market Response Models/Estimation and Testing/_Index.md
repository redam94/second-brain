---
title: "Index: Estimation and Testing"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-07-01
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
| Parameter estimation toolkit | [[Parameter Estimation in Market Response]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]], [[Functional Forms in Marketing]], [[Market Share Models]] | OLS, GLS/FGLS, SUR, 2SLS/3SLS, Bayesian HB/EB estimation toolkit |
| Model testing & specification | [[Model Testing and Specification]] | concept | [[Parameter Estimation in Market Response]] | Validates models via F-tests, t-tests, RESET, and seven error types |
| Flexible functional forms | [[Flexible Functional Forms]] | concept | [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]] | Second-order approximations without parametric commitments |
| Model selection & EDA | [[Model Selection and Exploratory Analysis]] | concept | [[Model Testing and Specification]], [[Flexible Functional Forms]], [[Parameter Estimation in Market Response]] | Choose forms, lags, and variables via AIC, BIC, cross-validation |

## Notes

- [[Parameter Estimation in Market Response]] — CONTAINS: variable classification (exogenous/predetermined/current endogenous), OLS with eight Gauss-Markov assumptions, generalized least squares (GLS/FGLS), seemingly unrelated regressions (SUR), 2SLS and 3SLS, indirect least squares (ILS), Bayesian posterior estimation, hierarchical Bayes (HB) shrinkage estimator, empirical Bayes (EB), and the Hausman endogeneity test.
- [[Model Testing and Specification]] — CONTAINS: F-test for model significance, t-test for individual coefficients, Ramsey RESET test for general misspecification, the seven specification-error types, restricted least squares, nested vs non-nested tests, Durbin-Watson statistic, and the Box-Cox test for functional form.
- [[Flexible Functional Forms]] — CONTAINS: translog (transcendental logarithmic) form, Box-Cox power transformation, locally weighted regression (LOESS), and regression splines.
- [[Model Selection and Exploratory Analysis]] — CONTAINS: information criteria (AIC, BIC), hold-out cross-validation, manager elicitation, exploratory data analysis (EDA), and multiple-testing / garden-of-forking-paths cautions with pre-registration.

## Sources

- [[Market Response Models Econometric and Time Series Analysis.pdf|Hanssens, Parsons & Schultz (2001), Market Response Models, 2nd Ed., Ch. 5]]

## See Also

- [[../_Index|Market Response Models]]
