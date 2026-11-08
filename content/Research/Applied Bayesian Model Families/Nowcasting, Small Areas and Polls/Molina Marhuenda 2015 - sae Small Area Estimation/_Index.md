---
title: "Index: Molina Marhuenda 2015 - sae Small Area Estimation"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Nowcasting, Small Areas and Polls]]"
date_updated: 2026-11-08
concept_count: 4
---

# Molina Marhuenda 2015 - sae Small Area Estimation

> [!abstract] Routing Summary
> Full capture of Molina & Marhuenda (2015), The R Journal 7(1): 81-98, plus one concept note (Bayesian FH, E112). 5 notes.
> - Need paper summary and section map? -> [[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]
> - Need FH equations, EBLUP, shrinkage, REML, MSE, milk example? -> [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]
> - Need SAR(1) spatial or AR(1) spatio-temporal FH? -> [[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]]
> - Need BHF unit-level or EB poverty estimation? -> [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]]
> - Need hierarchical Bayes FH, logit, GVF, surprise maps? -> [[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Fay-Herriot model | [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] | definition | [[Hierarchical Models]] | $\hat\delta=\hat\gamma\,\text{DIR}+(1-\hat\gamma)x^\top\hat\beta$ |
| EBLUP | [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] | theorem | FH | $\gamma_d=A/(A+\psi_d)$ |
| SFH / STFH | [[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]] | definition | FH | SAR(1) + AR(1) effects |
| BHF, EB | [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]] | theorem | FH, [[Poststratification]] | Monte Carlo best predictor |
| HB FH, surprise map | [[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]] | concept | FH | full posterior, GVF |

## Notes
- [[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]] — CONTAINS: summary, E112 link, Source Map.
- [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] — CONTAINS: model, BLUP/EBLUP, fitting, MSE, milk example, Python REML.
- [[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]] — CONTAINS: SFH, STFH, grape and spacetime examples.
- [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]] — CONTAINS: BHF EBLUP, EB, Box-Cox poverty, Iowa example.
- [[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]] — CONTAINS: HB FH, logit, censored zeros, GVF, surprise map, PyMC sketch.

## Sources
- Molina Marhuenda 2015 - sae An R Package for Small Area Estimation

## See Also
[[Hierarchical Models]] · [[Poststratification]]
