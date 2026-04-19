---
title: "Index: Time Series Analysis"
tags:
  - type/index
  - source/ingested
  - topic/market-response
date_updated: 2026-04-19
concept_count: 4
---

# Time Series Analysis

> [!abstract] Routing Summary
> ARIMA, transfer functions, VAR, cointegration, ECM, and Granger causality for marketing time series. Source: Hanssens, Parsons & Schultz (2001) Ch. 6–7.
> - Need stationarity, ARMA/ARIMA, ACF/PACF, and Box-Jenkins identification? → [[Single Marketing Time Series]]
> - Need transfer function models, prewhitening, and intervention analysis? → [[Transfer Function Model]]
> - Need VAR, impulse response, cointegration, ECM, and 4 strategic scenarios? → [[Multivariate Persistence and Cointegration]]
> - Need Granger causality, IRF, FEVD, and Cholesky ordering? → [[Empirical Causal Ordering]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Stationarity, ARMA/ARIMA, ACF/PACF, Box-Jenkins | [[Single Marketing Time Series]] | concept | [[Markets Data and Sales Drivers]], [[Carryover Effects and Distributed Lags]] | ARMA Eq 6.11; Box-Jenkins 3-stage procedure |
| TF model, prewhitening, intervention analysis | [[Transfer Function Model]] | concept | [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]] | TF impulse response Eq 7.7–7.8; $\nu(B) = \omega(B)/\delta(B)$ |
| VAR, persistence, cointegration, ECM, 4 strategic scenarios | [[Multivariate Persistence and Cointegration]] | concept | [[Transfer Function Model]], [[Single Marketing Time Series]] | VAR Eq 7.22; ECM Eq 7.29; 4 long-run equilibrium scenarios |
| Granger causality, IRF, FEVD, Cholesky decomposition | [[Empirical Causal Ordering]] | concept | [[Multivariate Persistence and Cointegration]], [[Reaction Functions and Competitive Dynamics]] | Granger causality identifies marketing spend → sales direction |

## Notes

- [[Single Marketing Time Series]] — CONTAINS: stationarity test (Eqs 6.5–6.6), AR/MA/ARMA/ARIMA model classes, ACF and PACF identification patterns, Box-Jenkins 3-stage (identification, estimation, diagnostic), seasonal ARIMA, marketing time series examples
- [[Transfer Function Model]] — CONTAINS: TF model (Eqs 7.7–7.8), prewhitening procedure (Eqs 7.9–7.12), CCF pattern identification, deadtime and decay parameter estimation, intervention analysis, advertising pulse detection
- [[Multivariate Persistence and Cointegration]] — CONTAINS: VAR model (Eq 7.22), 6 information channels in VAR, persistence and impulse response, cointegration test (Eq 7.26), error-correction model (Eq 7.29), 4 strategic scenarios (stationary/cointegrated/unit-root combinations)
- [[Empirical Causal Ordering]] — CONTAINS: Granger causality definition and test, impulse response functions (IRF), forecast error variance decomposition (FEVD), Cholesky ordering and sensitivity, empirical causal order in marketing spending/sales systems

## Sources

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf]] — Hanssens, Parsons & Schultz (2001), Ch. 6–7
