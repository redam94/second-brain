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

| Concept | Note | Type | Key Result |
|---------|------|------|-----------|
| Stationarity, ARMA, Box-Jenkins, ACF/PACF | [[Single Marketing Time Series]] | concept | ARIMA(p,d,q) for integrated series; ACF/PACF identify orders |
| Transfer function, prewhitening, intervention | [[Transfer Function Model]] | concept | Prewhitening isolates input-output relationship from noise |
| VAR, cointegration, ECM, 4 strategic scenarios | [[Multivariate Persistence and Cointegration]] | concept | Cointegration implies ECM; 4 scenarios classify persistence-cointegration combinations |
| Granger causality, IRF, FEVD, causal ordering | [[Empirical Causal Ordering]] | concept | Cholesky ordering resolves contemporaneous simultaneity; IRF traces dynamic effects |

## Notes
- [[Single Marketing Time Series]] — CONTAINS: Stationarity tests (Eqs 6.5-6.6), AR/MA/ARMA/ARIMA models, ACF/PACF diagnostics, Box-Jenkins procedure
- [[Transfer Function Model]] — CONTAINS: Transfer function model (Eqs 7.7-7.8), prewhitening (Eqs 7.9-7.12), CCF patterns, intervention analysis
- [[Multivariate Persistence and Cointegration]] — CONTAINS: VAR (Eq 7.22), persistence channels, cointegration (Eq 7.26), ECM (Eq 7.29), 4 strategic scenarios table
- [[Empirical Causal Ordering]] — CONTAINS: Granger causality test, impulse response functions, forecast error variance decomposition, Cholesky ordering
