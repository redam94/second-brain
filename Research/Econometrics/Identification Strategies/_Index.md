---
title: "Index: Identification Strategies"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-09
---

# Identification Strategies

> [!abstract] Summary
> MHE Chapters 4–6: The core quasi-experimental methods — instrumental variables, differences-in-differences, and regression discontinuity. Each exploits a different source of exogenous variation to estimate causal effects when randomized experiments aren't available. Extended with a Bayesian DiD implementation in PyMC.

## Notes

- [[Instrumental Variables]] — 2SLS, the Wald estimator, exclusion restriction, quarter-of-birth and draft lottery examples
- [[Local Average Treatment Effects]] — LATE theorem, compliers/always-takers/never-takers, characterizing compliers
- [[Differences-in-Differences]] — Fixed effects, common trends, Card & Krueger minimum wage example
- [[Regression Discontinuity Designs]] — Sharp and fuzzy RD, Lee incumbency example, Maimonides' Rule
- [[Bayesian Difference in Differences]] — PyMC implementation: posterior over $\Delta$, explicit counterfactual prediction, parallel trends as a model constraint

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 4–6
- [[raw/Difference in differences]] — PyMC example: Bayesian DiD with counterfactual inference
