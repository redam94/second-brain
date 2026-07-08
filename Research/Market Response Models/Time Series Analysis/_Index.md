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
|---------|------|------|------------|------------|
| Single time series | [[Single Marketing Time Series]] | concept | Carryover Effects | Stationarity (Eqs 6.5-6.6); AR/MA/ARMA/ARIMA; ACF/PACF identification; Box-Jenkins procedure |
| Transfer function | [[Transfer Function Model]] | concept | Single TS, Carryover | TF model (Eqs 7.7-7.8); prewhitening (Eqs 7.9-7.12); CCF patterns; intervention analysis |
| VAR and cointegration | [[Multivariate Persistence and Cointegration]] | concept | Transfer Function | VAR (Eq 7.22); 6 persistence channels; cointegration (Eq 7.26); ECM (Eq 7.29); 4 strategic scenarios |
| Causal ordering | [[Empirical Causal Ordering]] | concept | VAR | Granger causality; IRF; FEVD; Cholesky decomposition; causal ordering controversies in marketing |

## Notes

- [[Single Marketing Time Series]] — CONTAINS: stationarity definitions and tests (Eqs 6.5-6.6); AR, MA, ARMA, ARIMA models; ACF/PACF pattern identification table; Box-Jenkins identification-estimation-diagnostic procedure; unit root implications.
- [[Transfer Function Model]] — CONTAINS: transfer function model structure (Eqs 7.7-7.8); prewhitening procedure and cross-correlation function (Eqs 7.9-7.12); CCF pattern interpretation table; intervention analysis for marketing events; carryover in TF form.
- [[Multivariate Persistence and Cointegration]] — CONTAINS: VAR representation (Eq 7.22); 6 channels of persistence (own/cross/price/distribution/competitive/structural); cointegration test (Eq 7.26); error correction model (Eq 7.29); 4 strategic scenarios (escalation/equilibrium/dominance/irrelevance).
- [[Empirical Causal Ordering]] — CONTAINS: Granger causality test; impulse response functions (IRF) and their marketing interpretation; forecast error variance decomposition (FEVD); Cholesky decomposition sensitivity; causal ordering debate in marketing science.
