---
title: "Index: Dynamic Response Models"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-04-11
---

# Dynamic Response Models

> [!abstract] Routing Summary
> Dynamic models add time structure: carryover, lags, competitive reaction, and time-varying parameters.
> - Koyck, PDL, GLPF, ADL, temporal aggregation → [[Carryover Effects and Distributed Lags]]
> - Cournot/Bertrand/Stackelberg reaction functions → [[Reaction Functions and Competitive Dynamics]]
> - Concave/S-shaped/convex response, hysteresis, pulsing → [[Shape of the Marketing Response Function]]
> - Design decisions for dynamic models → [[Design of Dynamic Response Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Koyck model, PDL, ADL, temporal aggregation bias | [[Carryover Effects and Distributed Lags]] | concept | [[Functional Forms in Marketing]] | Advertising effects persist across periods; Koyck λ encodes retention rate; temporal aggregation biases carryover estimates |
| Cournot/Bertrand/Stackelberg reaction, Tobit censoring | [[Reaction Functions and Competitive Dynamics]] | concept | [[Carryover Effects and Distributed Lags]], [[Design of Dynamic Response Models]] | Competitive reaction functions determine equilibrium marketing spend; Tobit handles zero-spend censoring |
| Concave vs S-shaped, hysteresis, threshold, pulsing | [[Shape of the Marketing Response Function]] | concept | [[Functional Forms in Marketing]] | Response shape determines optimal spending pattern; S-shaped responses favor pulsing; hysteresis means order-of-advertising matters |
| Lag order, short/long-run effects, simultaneity, ARMAX | [[Design of Dynamic Response Models]] | concept | [[Design of Static Response Models]], [[Carryover Effects and Distributed Lags]] | Dynamic model design choices: lag order selection, separating short vs long-run elasticity, handling simultaneity |

## Notes
- [[Carryover Effects and Distributed Lags]] — CONTAINS: Koyck geometric lag model, polynomial distributed lags (PDL), GLPF, ADL(r,s) form, ratchet models for irreversible effects, temporal aggregation bias
- [[Reaction Functions and Competitive Dynamics]] — CONTAINS: Cournot, Bertrand, Stackelberg, Sweezy kinked demand; absolute/relative/difference reaction specifications; Tobit for zero-spend; Nash equilibrium marketing mix
- [[Shape of the Marketing Response Function]] — CONTAINS: Concave vs S-shaped characterization, hysteresis (spend order matters), threshold effects, pulsing vs continuous strategy comparison
- [[Design of Dynamic Response Models]] — CONTAINS: Lag order selection criteria, short-run vs long-run elasticity decomposition, simultaneity problems, ARMAX specification
