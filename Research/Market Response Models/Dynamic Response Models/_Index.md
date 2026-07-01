---
title: "Index: Dynamic Response Models"
tags:
  - type/index
  - topic/market-response
date_updated: 2026-07-01
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
| Carryover & distributed lags | [[Carryover Effects and Distributed Lags]] | concept | [[Functional Forms in Marketing]], [[Markets Data and Sales Drivers]], [[Design of Static Response Models]] | Temporal carryover via geometric lags, PDL, feedback, and bias correction |
| Competitive reaction functions | [[Reaction Functions and Competitive Dynamics]] | concept | [[Carryover Effects and Distributed Lags]], [[Market Share Models]] | Competitor reaction functions via Cournot, Bertrand, Stackelberg, Sweezy |
| Shape of the response function | [[Shape of the Marketing Response Function]] | concept | [[Functional Forms in Marketing]], [[Carryover Effects and Distributed Lags]] | Response shape (concave/S/convex) drives optimal budget allocation |
| Dynamic model design | [[Design of Dynamic Response Models]] | concept | [[Design of Static Response Models]], [[Carryover Effects and Distributed Lags]], [[Reaction Functions and Competitive Dynamics]] | Extends static to dynamic via time, lags, and short/long-run effects |

## Notes

- [[Carryover Effects and Distributed Lags]] — CONTAINS: Koyck/geometric distributed lag, long-run multiplier theorem, geometric lag with purchase feedback (GLPF), Almon polynomial distributed lag (PDL), autoregressive distributed lag (ADL), Doyle-Saunders lead-lag taxonomy (6 cases), return-to-normality time-varying-parameter model, ratchet (asymmetric) models, Clarke (1976) aggregation-bias theorem, and the Bass-Leone and Weiss-Weinberg-Windal recovery procedures.
- [[Reaction Functions and Competitive Dynamics]] — CONTAINS: Cournot, Bertrand, and Stackelberg (leader-follower) reaction functions, Sweezy kinked demand curve, absolute-change and relative (log-log) reaction models, the generalized reaction matrix (VAR system), Tobit model for censored reactions, and distributed reaction lags.
- [[Shape of the Marketing Response Function]] — CONTAINS: prior-knowledge levels (0/1/2), concave (diminishing returns) theorem, S-shaped (convex-concave) response with threshold, convex (increasing returns) response, threshold-effect kinked-linear model, hysteresis and path dependence via unit root, pulsing-strategy table by shape, and ratchet (historical-maximum) models.
- [[Design of Dynamic Response Models]] — CONTAINS: ADL framework, direct-lag identification strategy, short-run vs long-run effects (impact vs total multiplier) theorem, model-order selection (AIC, BIC, adjusted $R^2$, Ljung-Box Q), simultaneity/endogeneity assessment, and the ARIMA/ARMAX / transfer-function connection.

## Sources

- [[Market Response Models Econometric and Time Series Analysis.pdf|Hanssens, Parsons & Schultz (2001), Market Response Models, 2nd Ed., Ch. 4]]

## See Also

- [[../_Index|Market Response Models]]
