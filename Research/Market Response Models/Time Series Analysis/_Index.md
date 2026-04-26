---
title: "Index: Time Series Analysis"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-04-11
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
|---------|------|------|-----------|------------|
| Stationarity, ARMA/ARIMA, Box-Jenkins ACF/PACF | [[Single Marketing Time Series]] | concept | [[Markets Data and Sales Drivers]] | Most marketing series are non-stationary; Box-Jenkins identifies ARIMA model order via ACF/PACF patterns |
| Transfer function model, prewhitening, CCF, intervention | [[Transfer Function Model]] | concept | [[Single Marketing Time Series]] | Prewhitening isolates cross-correlation structure; intervention analysis estimates pulse/step effects |
| VAR, cointegration, ECM, 4 strategic scenarios | [[Multivariate Persistence and Cointegration]] | concept | [[Transfer Function Model]], [[Single Marketing Time Series]] | Cointegration implies long-run equilibrium; ECM separates short-run dynamics from long-run adjustment |
| Granger causality, IRF, FEVD, Cholesky ordering | [[Empirical Causal Ordering]] | concept | [[Multivariate Persistence and Cointegration]] | Granger causality tests temporal precedence; IRF/FEVD quantify dynamic marketing effects across competitors |

## Notes
- [[Single Marketing Time Series]] — CONTAINS: Stationarity tests (Eqs 6.5-6.6), AR/MA/ARMA/ARIMA models, ACF/PACF diagnostic patterns, Box-Jenkins identification procedure
- [[Transfer Function Model]] — CONTAINS: TF model structure (Eqs 7.7-7.8), prewhitening procedure (Eqs 7.9-7.12), CCF pattern interpretation, intervention analysis for promotions/events
- [[Multivariate Persistence and Cointegration]] — CONTAINS: VAR model (Eq 7.22), 6 persistence channels, Engle-Granger cointegration (Eq 7.26), ECM representation (Eq 7.29), 4 strategic scenarios (both/neither cointegrated)
- [[Empirical Causal Ordering]] — CONTAINS: Granger causality tests, impulse response functions, forecast error variance decomposition (FEVD), Cholesky ordering for marketing VAR, empirical causal ordering examples
