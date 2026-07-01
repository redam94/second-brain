---
title: "Index: MRM Introduction"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-07-01
---

# Introduction to Market Response Models

> [!abstract] Routing Summary
> Foundational concepts for market response modeling: the MRM framework, management tasks, and data sources.
> - Overview of the full book and ETS approach → [[Market Response Models - Overview]]
> - Management tasks (planning, budgeting, forecasting, controlling), planning cycle → [[Response Models for Marketing Management]]
> - Data sources (scanner, panels, GRPs), variable types, aggregation → [[Markets Data and Sales Drivers]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| ETS framework & book map | [[Market Response Models - Overview]] | overview | — | Econometric framework linking marketing inputs to outcomes across static and dynamic models |
| Four management tasks & planning cycle | [[Response Models for Marketing Management]] | concept | [[Market Response Models - Overview]] | Four management tasks and the iterative model-based planning cycle |
| Marketing data & sales drivers | [[Markets Data and Sales Drivers]] | concept | [[Market Response Models - Overview]], [[Response Models for Marketing Management]] | Scanner sources, variable measurement, and aggregation choices for empirical models |

## Notes

- [[Market Response Models - Overview]] — CONTAINS: canonical response model $Q_t = f(A_t, E_t)$, simultaneous structural system (sales equation + spending rule), the four management tasks, the ETS approach, and previews of Koyck lags, MCI/MNL share models, transfer functions, VAR, ARIMA, Box-Cox and translog forms.
- [[Response Models for Marketing Management]] — CONTAINS: sales response function $Q_t = f(A_t, E_t)$, decision rule $A_t = g(P_{t-1}, Q_{t-1})$, two-equation simultaneous system, four management tasks (planning, budgeting, forecasting, controlling), budget-optimization rule $\frac{\partial Q}{\partial A}\cdot m = 1$, model-based planning cycle, ADBUDG, logistic response, ADL and ARIMA transfer functions.
- [[Markets Data and Sales Drivers]] — CONTAINS: scanner/POS-UPC data, stock variables and advertising goodwill $G_t = A_t + \lambda G_{t-1}$, relative index variables (RIX/RCX/RBX), GRPs (Reach × Frequency), baseline volume decomposition, market share $MS_t = Q_t/Q_{T,t}$, temporal aggregation bias (Clarke 1976), cross-sectional aggregation levels, and the Schultz-Wittink primary-vs-selective demand decomposition.

## Sources

- [[Market Response Models Econometric and Time Series Analysis.pdf|Hanssens, Parsons & Schultz (2001), Market Response Models: Econometric and Time Series Analysis, 2nd Ed.]]

## See Also

- [[../_Index|Market Response Models]]
