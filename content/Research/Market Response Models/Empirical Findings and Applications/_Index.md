---
title: "Index: Empirical Findings and Applications"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-07-01
---

# Empirical Findings and Applications

> [!abstract] Routing Summary
> Empirical generalizations, optimal decisions, and implementation.
> - What makes a generalization; meta-analysis; primary vs selective demand → [[Marketing Generalizations Overview]]
> - Advertising elasticity ≈ 0.10; duration 6-9 months; coupon elasticity; promotions → [[Advertising and Promotion Effects]]
> - Price elasticity ≈ −2.5; cross-effects ≈ 0.5; asymmetry; neighborhood effects → [[Price and Distribution Effects]]
> - Dorfman-Steiner; ADBUDG optimization; VAR forecasting → [[Optimal Marketing Decisions and Forecasting]]
> - Barriers to adoption, DSS, Kalman filter updating → [[Implementation of Market Response Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| What makes a generalization | [[Marketing Generalizations Overview]] | concept | [[Parameter Estimation in Market Response]], [[Markets Data and Sales Drivers]] | Empirical regularities across studies via meta-analysis, with measurement-error caution |
| Advertising & promotion effects | [[Advertising and Promotion Effects]] | concept | [[Marketing Generalizations Overview]], [[Carryover Effects and Distributed Lags]], [[Functional Forms in Marketing]] | Short-run advertising elasticity ≈ 0.10; long-run roughly doubles; low coupon elasticity |
| Price & distribution effects | [[Price and Distribution Effects]] | concept | [[Marketing Generalizations Overview]], [[Market Share Models]], [[Reaction Functions and Competitive Dynamics]], [[Multivariate Persistence and Cointegration]] | Own-price elasticity ≈ −2.5; cross-effects ≈ 0.52; distribution exceeds advertising |
| Optimal decisions & forecasting | [[Optimal Marketing Decisions and Forecasting]] | concept | [[Advertising and Promotion Effects]], [[Price and Distribution Effects]], [[Shape of the Marketing Response Function]], [[Multivariate Persistence and Cointegration]], [[Functional Forms in Marketing]], [[Response Models for Marketing Management]] | Dorfman-Steiner optimality, ADBUDG allocation, dynamic control, forecasting methods |
| Implementation | [[Implementation of Market Response Models]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]], [[Parameter Estimation in Market Response]], [[Optimal Marketing Decisions and Forecasting]] | Organizational barriers, manager-model interface, and DSS adoption |

## Notes

- [[Marketing Generalizations Overview]] — CONTAINS: the marketing-generalization definition (six criteria), three discovery methods (informal observation, literature review, meta-analysis), meta-analysis framework, key null-hypothesis values table, Schultz-Wittink primary-vs-selective demand decomposition, and the measurement-error caveat ($O = T + E$, Eqs 8.11-8.12).
- [[Advertising and Promotion Effects]] — CONTAINS: the Leone-Schultz [LS] short-term advertising-elasticity generalization, long-run effect theorem, duration-interval theorem (Eq 8.13), life-cycle moderation, advertising-price-sensitivity generalizations, coupon-elasticity theorem, temporary price reductions (TPR), trade-promotion pass-through, display/feature multipliers, and the Frito-Lay BehaviorScan advertising-weight tests.
- [[Price and Distribution Effects]] — CONTAINS: the price-elasticity generalization (meta-analytic mean −2.5), upside/downside price asymmetry, cross-price elasticity theorem (0.52) with cross-price asymmetry, competitive clout and vulnerability measures (Eqs 8.14-8.15), neighborhood price effects [SSK] (Eq 8.16), life-cycle price dynamics, distribution-and-share example, and the Russell-Kamakura LSES model.
- [[Optimal Marketing Decisions and Forecasting]] — CONTAINS: Dorfman-Steiner optimality condition, ADBUDG response-function optimization, dynamic optimization / optimal control, Bertrand-Nash competitive pricing, multi-instrument marketing-mix optimization, four forecasting methods (ARIMA, transfer function, regression/ADL, VAR/ECM), the HP inkjet-printer case study, and forecast-accuracy metrics (MAPE, RMSE, Theil U, MAE).
- [[Implementation of Market Response Models]] — CONTAINS: five barriers to implementation (complexity, data, silos, credibility, staleness), calibration vs pure-estimation paradigms, hybrid Bayesian estimation, decision-support-system (DSS) architecture, adaptive estimation (rolling window, Kalman filter), five organizational success conditions, and MRM capabilities and limitations.

## Sources

- [[Market Response Models Econometric and Time Series Analysis.pdf|Hanssens, Parsons & Schultz (2001), Market Response Models, 2nd Ed., Chs. 8-10]]

## See Also

- [[../_Index|Market Response Models]]
