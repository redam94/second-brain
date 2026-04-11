---
title: "Index: Extensions"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-09
concept_count: 3
---

# Extensions

> [!abstract] Routing Summary
> This folder covers extensions to the core econometric toolkit from MHE Chapters 7-8 and PyMC tutorials. Contains 3 notes.
> - Need distributional effects or QTE? -> [[Quantile Regression]]
> - Need multinomial logit/probit or random utility? -> [[Discrete Choice Models]]
> - Need robust SEs, clustering, or Moulton factor? -> [[Standard Errors and Clustering]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Conditional quantiles, QTE, approximation property | [[Quantile Regression]] | concept | [[Regression and the CEF]], [[Local Average Treatment Effects]], [[The Selection Problem]] | QR estimates treatment effects across the distribution |
| Random utility, multinomial logit/probit, Bayesian discrete choice | [[Discrete Choice Models]] | tutorial | [[Regression and the CEF]], [[Instrumental Variables]], [[Quantile Regression]] | McFadden's random utility framework for categorical outcomes |
| Robust SEs, Moulton factor, serial correlation, few-cluster corrections | [[Standard Errors and Clustering]] | concept | [[Regression and the CEF]], [[Differences-in-Differences]], [[Research Questions in Econometrics]] | Cluster at the level of treatment assignment |

## Notes
- [[Quantile Regression]] — CONTAINS: Conditional quantile functions, quantile treatment effects (QTE), approximation property, distributional effects
- [[Discrete Choice Models]] — CONTAINS: Random utility model, multinomial logit/probit, IIA assumption, Bayesian discrete choice in PyMC, McFadden framework
- [[Standard Errors and Clustering]] — CONTAINS: Heteroskedasticity-robust SEs, Moulton factor, serial correlation in panels, few-cluster corrections, wild bootstrap

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 7-8
- [[raw/Discrete Choice and Random Utility Models]] — PyMC tutorial: Bayesian discrete choice models

## See Also

- [[Generalized Linear Models]] — Bayesian approach to logistic/Poisson regression
- [[Monsters and Mixtures]] — Maximum entropy justification for categorical models
