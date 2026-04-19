---
title: "Index: Static Response Models"
tags:
  - type/index
  - source/ingested
  - topic/market-response
date_updated: 2026-04-19
concept_count: 4
---

# Static Response Models

> [!abstract] Routing Summary
> Static models estimate same-period marketing effects with no lag or time structure. Source: Hanssens, Parsons & Schultz (2001) Ch. 3.
> - Need all ten functional forms with full LaTeX and elasticities? → [[Functional Forms in Marketing]]
> - Need MCI/MNL market share models and IIA property? → [[Market Share Models]]
> - Need aggregation bias (temporal and cross-sectional)? → [[Aggregation of Relations]]
> - Need model design decisions (variable selection, competitive specification)? → [[Design of Static Response Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| 10 functional forms, constant elasticity, ADBUDG, SCAN*PRO | [[Functional Forms in Marketing]] | concept | [[Markets Data and Sales Drivers]], [[Response Models for Marketing Management]] | Power form: $Q = e^{\beta_0}X^{\beta_1}$, $\eta = \beta_1$ constant |
| MCI/MNL market share, IIA property, attraction models | [[Market Share Models]] | concept | [[Functional Forms in Marketing]], [[Markets Data and Sales Drivers]] | $m_i = e^{\lambda_i} / \sum_j e^{\lambda_j}$ (MNL) |
| Temporal and cross-sectional aggregation bias | [[Aggregation of Relations]] | concept | [[Functional Forms in Marketing]], [[Markets Data and Sales Drivers]] | Aggregation can change functional form and elasticity estimates |
| Variable selection, competitive structure, interaction terms | [[Design of Static Response Models]] | concept | [[Functional Forms in Marketing]], [[Market Share Models]] | Competitive specification determines model validity |

## Notes

- [[Functional Forms in Marketing]] — CONTAINS: 10 functional forms (linear, power, semi-log, log-reciprocal, logistic, Gompertz, ADBUDG, SCAN*PRO, random coefficients), LaTeX equations, elasticity formulas, when to use each form
- [[Market Share Models]] — CONTAINS: MCI model definition, MNL (logit) model, IIA property and limitations, attraction model theory, estimation via conditional logit, SCAN*PRO market share extension
- [[Aggregation of Relations]] — CONTAINS: temporal aggregation bias, cross-sectional aggregation, exact vs approximate aggregation conditions, Jensen's inequality and nonlinear models, cross-sectional heterogeneity effects
- [[Design of Static Response Models]] — CONTAINS: variable selection criteria, competitive variable specification (absolute vs relative), interaction term design, endogeneity issues in price variables, multiplicative vs additive forms

## Sources

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf]] — Hanssens, Parsons & Schultz (2001), Ch. 3
