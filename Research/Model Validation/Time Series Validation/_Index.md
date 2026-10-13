---
title: "Index: Time Series Validation"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Model Validation]]"
date_updated: 2026-10-13
concept_count: 5
---

# Time Series Validation

> [!abstract] Routing Summary
> This folder covers spurious correlation between autocorrelated series and how to validate models on time-ordered data. Contains 5 reference notes.
> - Need why unrelated trending series correlate? → [[Yule 1926 - Nonsense Correlations Between Time Series]]
> - Need spurious regression between random walks? → [[Granger and Newbold 1974 - Spurious Regressions]]
> - Need when is a levels regression valid (cointegration / ECM)? → [[Granger 2003 - Nobel Lecture on Cointegration]]
> - Need test-set accuracy as the criterion; Rashomon effect? → [[Breiman 2001 - Statistical Modeling The Two Cultures]]
> - Need is K-fold CV valid for time series? → [[Bergmeir et al 2018 - Cross-Validation for Time Series]]

## Concept Map

| Note | Type | Key Result |
|------|------|------------|
| [[Yule 1926 - Nonsense Correlations Between Time Series]] | definition | Correlation of integrated series has a U-shaped sampling distribution near ±1 |
| [[Granger and Newbold 1974 - Spurious Regressions]] | definition | Independent random walks reject null ~75% at n≈50; $R^2 > DW$ warning sign |
| [[Granger 2003 - Nobel Lecture on Cointegration]] | theorem | Cointegrated I(1) series have an error-correction representation |
| [[Breiman 2001 - Statistical Modeling The Two Cultures]] | definition | Many equally good models disagree on which variables matter |
| [[Bergmeir et al 2018 - Cross-Validation for Time Series]] | theorem | K-fold CV valid only for pure AR models with uncorrelated errors; otherwise use time-ordered holdout |

## Notes

- [[Yule 1926 - Nonsense Correlations Between Time Series]] — CONTAINS: Nonsense correlation definition; marriages/mortality r≈0.95; effective sample size
- [[Granger and Newbold 1974 - Spurious Regressions]] — CONTAINS: Spurious regression definition; Monte Carlo; Phillips (1986) asymptotics
- [[Granger 2003 - Nobel Lecture on Cointegration]] — CONTAINS: I(d), cointegration definition, Granger representation theorem
- [[Breiman 2001 - Statistical Modeling The Two Cultures]] — CONTAINS: Two cultures; Rashomon effect (^def-rashomon-effect); permutation importance
- [[Bergmeir et al 2018 - Cross-Validation for Time Series]] — CONTAINS: CV validity theorem; Monte Carlo of CV vs OOS holdout; Ljung–Box residual check

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]] — bibliography and verified quotations

## See Also
- [[../_Index|Model Validation]] — parent topic
