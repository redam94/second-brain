---
title: "Index: Time Series Analysis"
tags:
  - type/index
  - source/ingested
  - topic/market-response
parent: "[[../_Index|Market Response Models]]"
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
| Single Time Series | [[Single Marketing Time Series]] | concept | [[Markets Data and Sales Drivers]], [[Carryover Effects and Distributed Lags]] | Stationarity (Eqs 6.5-6.6); AR/MA/ARMA/ARIMA; ACF/PACF; Box-Jenkins 4 stages |
| Transfer Functions | [[Transfer Function Model]] | concept | [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]] | TF model (Eqs 7.7-7.8); prewhitening (Eqs 7.9-7.12); CCF patterns; intervention analysis |
| VAR & Cointegration | [[Multivariate Persistence and Cointegration]] | concept | [[Transfer Function Model]], [[Single Marketing Time Series]] | VAR (Eq 7.22); 6 persistence channels; cointegration (Eq 7.26); ECM (Eq 7.29); 4 strategic scenarios |
| Causal Ordering | [[Empirical Causal Ordering]] | concept | [[Multivariate Persistence and Cointegration]], [[Reaction Functions and Competitive Dynamics]] | Granger causality; IRF; FEVD; Cholesky decomposition; reverse causality tests |
