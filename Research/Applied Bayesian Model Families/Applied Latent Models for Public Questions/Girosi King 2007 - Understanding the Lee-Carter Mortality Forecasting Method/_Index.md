---
title: "Index: Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 6
---

# Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method

> [!abstract] Routing Summary
> This folder captures Girosi and King (2007), *Understanding the Lee-Carter mortality forecasting method* (working paper, 35 pages). 6 notes.
> - Whole paper map and key result? -> [[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
> - Need the model, SVD estimation and RWD forecast of the index? -> [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]
> - Need percent of variance explained and Table 1 across 24 countries x 10 causes? -> [[Girosi King 2007 - Information Loss with One Principal Component]]
> - Need the RWD equivalence and bias theorem? -> [[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]
> - Need universal increasing nonsmoothness? -> [[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]
> - Need second-stage reestimation and Wilmoth WLS vs Poisson MLE? -> [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Lee-Carter model | [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]] | definition | - | $m=\alpha+\beta\gamma+\epsilon$ |
| Variance explained | [[Girosi King 2007 - Information Loss with One Principal Component]] | example | SVD | one PC > 90% for 14/24 countries (all-cause) |
| RWD equivalence | [[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]] | theorem | LC model | $\Sigma_{LC}=\sigma^2\psi\psi'/\|\psi\|^2+2\sigma^2I$ |
| Bias asymmetry | [[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]] | theorem | RWD equivalence | LC biased under general $\Sigma$ |
| Nonsmoothness | [[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]] | theorem | linear forecast | $\propto\gamma_t^2$, grows without bound |
| Second stage / WLS / MLE | [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]] | definition | LC model | 0, 1 or 2 roots; WLS invalid; Poisson MLE valid |

## Notes

- [[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]] — CONTAINS: question, contributions, Source Map, E111 link.
- [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]] — CONTAINS: Eqs. 1-9, identification, SVD, forecasting, code.
- [[Girosi King 2007 - Information Loss with One Principal Component]] — CONTAINS: Eq. 10, Figure 1, full Table 1 reproduced.
- [[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]] — CONTAINS: Eqs. 11-19, equivalence, bias theorem, example.
- [[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]] — CONTAINS: Eqs. 20-24, nonsmoothness theorem, empirical patterns, U-shape example.
- [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]] — CONTAINS: Eqs. 25-27, root counting, WLS critique, Poisson MLE, concluding remarks.

## Sources
- [[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]] - Girosi F, King G (2007), working paper, 35 pages (author copy from gking.harvard.edu).

## See Also
- [[Factor Analysis and PPCA]], [[Forecast Evaluation and Backtesting]]
- [[Concept Notes - Life Tables and Replication Forecasting/_Index|Concept notes]] - life tables and counterfactual mortality path
