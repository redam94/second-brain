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

| Concept | Note | Type | Key Result |
|---------|------|------|-----------|
| Koyck/PDL/ADL carryover, temporal aggregation | [[Carryover Effects and Distributed Lags]] | concept | Koyck: $Q_t = (1-\lambda)\beta X_t + \lambda Q_{t-1}$; long-run effect = $\beta/(1-\lambda)$ |
| Cournot/Bertrand/Stackelberg reaction functions | [[Reaction Functions and Competitive Dynamics]] | concept | Reaction functions define competitive equilibrium strategy |
| Concave/S-shaped response, pulsing, hysteresis | [[Shape of the Marketing Response Function]] | concept | S-shape justifies advertising pulsing over continuous spend |
| Lag order, simultaneity, short vs long-run | [[Design of Dynamic Response Models]] | concept | ADL model nests Koyck and PDL; model selection via AIC/BIC |

## Notes
- [[Carryover Effects and Distributed Lags]] — CONTAINS: Koyck transformation, PDL, GLPF, ADL(r,s), ratchet/hysteresis models, temporal aggregation bias theorem
- [[Reaction Functions and Competitive Dynamics]] — CONTAINS: Cournot/Bertrand/Stackelberg/Sweezy equilibria, absolute/relative reaction functions, Tobit censoring
- [[Shape of the Marketing Response Function]] — CONTAINS: Concave vs S-shaped response, hysteresis, threshold effects, pulsing strategies, Sasieni constant
- [[Design of Dynamic Response Models]] — CONTAINS: Lag order selection, short/long-run effect decomposition, simultaneity, ARMAX specification
