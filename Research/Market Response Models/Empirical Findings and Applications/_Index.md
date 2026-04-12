---
title: "Index: Empirical Findings and Applications"
tags:
  - type/index
  - source/ingested
  - topic/market-response
parent: "[[../_Index|Market Response Models]]"
date_updated: 2026-04-11
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
|---------|------|------|-----------|------------|
| Generalizations | [[Marketing Generalizations Overview]] | concept | [[Parameter Estimation in Market Response]], [[Markets Data and Sales Drivers]] | Meta-analysis methodology; primary vs selective demand; measurement error adjustments |
| Advertising & Promotion | [[Advertising and Promotion Effects]] | concept | [[Marketing Generalizations Overview]], [[Carryover Effects and Distributed Lags]] | Advertising elasticity ≈ 0.10; duration 6–9 months; coupon 0.07; display/feature multipliers |
| Price & Distribution | [[Price and Distribution Effects]] | concept | [[Marketing Generalizations Overview]], [[Market Share Models]] | Own-price ≈ −2.5; cross-price ≈ +0.5; price asymmetry; clout/vulnerability matrix |
| Optimal Decisions | [[Optimal Marketing Decisions and Forecasting]] | concept | [[Advertising and Promotion Effects]], [[Price and Distribution Effects]] | Dorfman-Steiner ($A^*/S^* = \eta_{QA}/|\eta_{QP}|$); ADBUDG optimization; Holt-Winters forecasting |
| Implementation | [[Implementation of Market Response Models]] | concept | [[Design of Static Response Models]], [[Design of Dynamic Response Models]], [[Parameter Estimation in Market Response]] | DSS architecture; calibration vs estimation; Kalman adaptive updating; organizational barriers |
