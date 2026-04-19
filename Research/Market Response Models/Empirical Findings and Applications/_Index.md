---
title: "Index: Empirical Findings and Applications"
tags:
  - type/index
  - source/ingested
  - topic/market-response
date_updated: 2026-04-19
concept_count: 5
---

# Empirical Findings and Applications

> [!abstract] Routing Summary
> Empirical generalizations from market response research, optimal marketing decisions, and implementation. Source: Hanssens, Parsons & Schultz (2001) Ch. 8–10.
> - Need meta-analysis criteria and what makes a generalization? → [[Marketing Generalizations Overview]]
> - Need advertising elasticity ≈ 0.10, duration 6–9 months, promotions? → [[Advertising and Promotion Effects]]
> - Need price elasticity ≈ −2.5, cross-effects, asymmetry, distribution? → [[Price and Distribution Effects]]
> - Need Dorfman-Steiner theorem, ADBUDG optimization, VAR forecasting? → [[Optimal Marketing Decisions and Forecasting]]
> - Need DSS, Kalman filter updating, and organizational adoption barriers? → [[Implementation of Market Response Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Meta-analysis criteria, primary/selective demand, measurement error | [[Marketing Generalizations Overview]] | concept | [[Parameter Estimation in Market Response]], [[Markets Data and Sales Drivers]] | Criteria for valid generalizations; null hypothesis benchmarks |
| Advertising elasticity, duration, coupon, TPR, display | [[Advertising and Promotion Effects]] | concept | [[Marketing Generalizations Overview]], [[Carryover Effects and Distributed Lags]] | Short-run elasticity ≈ 0.10; long-run ≈ 2× short-run; duration 6–9 months |
| Own-price elasticity, cross-price, asymmetry, distribution | [[Price and Distribution Effects]] | concept | [[Marketing Generalizations Overview]], [[Market Share Models]] | Own-price ≈ −2.5; cross-price ≈ +0.52; distribution: high and sticky |
| Dorfman-Steiner theorem, ADBUDG, VAR forecasting | [[Optimal Marketing Decisions and Forecasting]] | concept | [[Advertising and Promotion Effects]], [[Price and Distribution Effects]] | $A^*/S^* = \eta_{QA}/|\eta_{QP}|$ (Dorfman-Steiner) |
| DSS, calibration, adaptive Kalman updating, organizational conditions | [[Implementation of Market Response Models]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]] | Barriers to adoption; Kalman filter for real-time updating |

## Notes

- [[Marketing Generalizations Overview]] — CONTAINS: definition of empirical generalization, meta-analysis validity criteria, primary vs selective demand distinction, measurement error corrections, null hypothesis benchmark values for marketing elasticities
- [[Advertising and Promotion Effects]] — CONTAINS: advertising short-run elasticity ≈ 0.10 (Assmus et al.), long-run ≈ 0.22, duration 6–9 months (90% decay), coupon elasticity ≈ 0.07, TPR/display multiplier 1.5–2.6×, Frito-Lay case study, diminishing returns evidence
- [[Price and Distribution Effects]] — CONTAINS: own-price elasticity ≈ −2.5 (Tellis), cross-price ≈ +0.52, price asymmetry (gains vs losses), clout/vulnerability matrix, neighborhood price effects, distribution elasticity (high, sticky, long-run), coverage vs merchandising
- [[Optimal Marketing Decisions and Forecasting]] — CONTAINS: Dorfman-Steiner optimality condition, ADBUDG budget optimization, budget allocation across products and markets, VAR-based scenario forecasting, HP instrument pricing case, tracking system design
- [[Implementation of Market Response Models]] — CONTAINS: DSS integration, calibration vs estimation distinction, Kalman filter for adaptive parameter updating, organizational barriers to model adoption, managerial interface design, reporting formats

## Sources

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf]] — Hanssens, Parsons & Schultz (2001), Ch. 8–10
