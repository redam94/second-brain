---
title: "Index: Time Series Analysis"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-07-01
---

# Time Series Analysis

> [!abstract] Routing Summary
> ARIMA, transfer functions, VAR, cointegration, ECM, and Granger causality for marketing time series.
> - Stationarity, ARMA, ARIMA, ACF/PACF, Box-Jenkins → [[Single Marketing Time Series]]
> - Transfer function model, prewhitening, intervention analysis → [[Transfer Function Model]]
> - VAR, impulse response, cointegration, ECM, 4 strategic scenarios → [[Multivariate Persistence and Cointegration]]
> - Granger causality, IRF, FEVD, Cholesky ordering → [[Empirical Causal Ordering]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| Univariate ARIMA / Box-Jenkins | [[Single Marketing Time Series]] | concept | [[Markets Data and Sales Drivers]], [[Carryover Effects and Distributed Lags]], [[Design of Dynamic Response Models]] | Box-Jenkins ARIMA characterizes univariate marketing series structure |
| Transfer function models | [[Transfer Function Model]] | concept | [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]], [[Design of Dynamic Response Models]] | Relates marketing output to inputs with autocorrelated noise |
| Persistence & cointegration | [[Multivariate Persistence and Cointegration]] | concept | [[Transfer Function Model]], [[Single Marketing Time Series]], [[Reaction Functions and Competitive Dynamics]] | VAR captures six channels; cointegration tests long-run equilibrium |
| Empirical causal ordering | [[Empirical Causal Ordering]] | concept | [[Multivariate Persistence and Cointegration]], [[Reaction Functions and Competitive Dynamics]] | VAR causal ordering via Granger tests, impulse responses, variance decomposition |

## Notes

- [[Single Marketing Time Series]] — CONTAINS: weak/covariance stationarity (Eqs 6.5-6.6), deterministic components (trend, seasonality, cyclicality, heteroscedasticity), linear-filter representation (Eq 6.10), ARMA (Eq 6.11), ACF (Eq 6.27) and PACF, AR(1) (Eqs 6.40, 6.42) and MA(1) models, the ACF/PACF diagnostic summary (Table 6-2), the Box-Jenkins identification procedure, ARIMA(p,d,q) (Eq 6.76), seasonal ARIMA (Eq 6.79), and Box-Cox variance stabilization (Eq 6.74).
- [[Transfer Function Model]] — CONTAINS: single-input transfer function (Eqs 7.7-7.8), two-input TF model (Eqs 7.14-7.15), prewhitening identification (Eqs 7.9-7.12), cross-correlation function (CCF) patterns, Liu-Hanssens (1982) direct-lag regression (Eq 7.16), intervention analysis (Box-Tiao 1975, Eqs 7.19-7.20), pulse and step interventions with response scenarios, and residual ACF/CCF diagnostic checking.
- [[Multivariate Persistence and Cointegration]] — CONTAINS: VARMA (Eq 7.21), VAR (Eq 7.22), bivariate sales-advertising VAR (Eq 7.23), the six channels of total impact (Dekimpe & Hanssens 1995a), multivariate persistence (Eq 7.24), four strategic scenarios (business-as-usual, escalation, hysteresis, co-evolution), cointegration (Engle-Granger 1987, Eq 7.26), Engle-Granger and Johansen FIML tests (Eqs 7.27-7.28), and the error-correction model (ECM, Eq 7.29).
- [[Empirical Causal Ordering]] — CONTAINS: Granger causality tests (F-test, likelihood ratio), impulse response function (IRF), forecast error variance decomposition (FEVD), Cholesky (triangular) decomposition, structural VAR (SVAR), the Evans-Wells (1983) method, and short-interval-data causal ordering (advertising → price → sales).

## Sources

- [[Market Response Models Econometric and Time Series Analysis.pdf|Hanssens, Parsons & Schultz (2001), Market Response Models, 2nd Ed., Chs. 6-7]]

## See Also

- [[../_Index|Market Response Models]]
