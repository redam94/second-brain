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
|---------|------|------|------------|------------|
| Carryover / distributed lags | [[Carryover Effects and Distributed Lags]] | concept | Functional Forms, Static Design | Koyck $q_t = \lambda q_{t-1} + (1-\lambda)a_t$; PDL, GLPF, ADL(r,s), temporal aggregation bias |
| Competitive reaction functions | [[Reaction Functions and Competitive Dynamics]] | concept | Carryover, Market Share Models | Cournot/Bertrand/Stackelberg/Sweezy reaction; absolute vs relative reaction; Tobit spillovers |
| Shape of response function | [[Shape of the Marketing Response Function]] | concept | Functional Forms, Carryover | Concave → constant spend; S-shaped → pulsing optimal; hysteresis; threshold; 4 prior-knowledge levels |
| Dynamic model design | [[Design of Dynamic Response Models]] | concept | Carryover, Reaction | Lag selection, short vs long-run effects, simultaneity, ARMAX, 4 special cases |

## Notes

- [[Carryover Effects and Distributed Lags]] — CONTAINS: Koyck geometric-lag model; polynomial distributed lag (PDL); GLPF; ADL(r,s); ratchet and hysteresis models; temporal aggregation bias derivation; Ch. 4, Sec. 4.2, pp. 142-155.
- [[Reaction Functions and Competitive Dynamics]] — CONTAINS: Cournot, Bertrand, Stackelberg, Sweezy reaction specifications; absolute vs relative reaction; Tobit reaction for competitive spillovers; empirical reaction patterns; Ch. 4, Sec. 4.4, pp. 166-172.
- [[Shape of the Marketing Response Function]] — CONTAINS: concave, S-shaped, convex, and linear response shapes; four prior-knowledge levels; budget implications (constant spend vs pulsing); threshold effects; Ch. 4, Sec. 4.3, pp. 156-165.
- [[Design of Dynamic Response Models]] — CONTAINS: lag order selection criteria; short vs long-run effect decomposition; simultaneity and instrumental variable corrections; ARMAX representation; 4 special dynamic cases; Ch. 4, pp. 139-181.
