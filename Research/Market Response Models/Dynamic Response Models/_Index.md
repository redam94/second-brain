---
title: "Index: Dynamic Response Models"
tags:
  - type/index
  - source/ingested
  - topic/market-response
date_updated: 2026-04-19
concept_count: 4
---

# Dynamic Response Models

> [!abstract] Routing Summary
> Dynamic models add time structure: carryover effects, distributed lags, competitive reactions, and time-varying response shapes. Source: Hanssens, Parsons & Schultz (2001) Ch. 4.
> - Need Koyck, PDL, GLPF, ADL, temporal aggregation, and ratchet models? → [[Carryover Effects and Distributed Lags]]
> - Need Cournot/Bertrand/Stackelberg/Sweezy reaction functions? → [[Reaction Functions and Competitive Dynamics]]
> - Need concave/S-shaped response, hysteresis, threshold effects, pulsing? → [[Shape of the Marketing Response Function]]
> - Need lag order selection, short vs long-run effects, ARMAX specification? → [[Design of Dynamic Response Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Koyck, PDL, GLPF, ADL carryover, ratchet, temporal aggregation | [[Carryover Effects and Distributed Lags]] | concept | [[Functional Forms in Marketing]], [[Markets Data and Sales Drivers]] | Koyck: $Q_t = (1-\lambda)\beta_0 + \beta_1(1-\lambda)X_t + \lambda Q_{t-1}$ |
| Cournot, Bertrand, Stackelberg, Sweezy competitive reaction | [[Reaction Functions and Competitive Dynamics]] | concept | [[Carryover Effects and Distributed Lags]], [[Market Share Models]] | Nash equilibrium reaction functions; absolute vs relative reaction |
| Concave/S-shape, hysteresis, supersaturation, pulsing | [[Shape of the Marketing Response Function]] | concept | [[Functional Forms in Marketing]], [[Carryover Effects and Distributed Lags]] | S-shape requires threshold; pulsing optimal under supersaturation |
| Lag order, short vs long-run, simultaneity, error correction | [[Design of Dynamic Response Models]] | concept | [[Design of Static Response Models]], [[Carryover Effects and Distributed Lags]] | Partial adjustment vs ECM; AIC/BIC for lag selection |

## Notes

- [[Carryover Effects and Distributed Lags]] — CONTAINS: carryover effect definition, Koyck model (Eq 4.10), Almon PDL, geometric lag distribution, GLPF, ADL(r,s) model, ratchet/hysteresis models, temporal aggregation bias on lag structure
- [[Reaction Functions and Competitive Dynamics]] — CONTAINS: Cournot quantity competition, Bertrand price competition, Stackelberg leadership, Sweezy kinked demand, absolute vs relative competitive reaction functions, Tobit for censored competitive data, Nash equilibrium conditions
- [[Shape of the Marketing Response Function]] — CONTAINS: concave vs S-shaped response debate, threshold effects, supersaturation/wear-out, hysteresis and ratchet effects, pulsing strategies under S-shape, empirical evidence for S-shape
- [[Design of Dynamic Response Models]] — CONTAINS: lag order selection (AIC/BIC/LR), short vs long-run effect decomposition, partial adjustment model, simultaneity and instrument selection, ARMAX specification, error-correction model design

## Sources

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf]] — Hanssens, Parsons & Schultz (2001), Ch. 4
