---
title: "Girosi King 2007 - Understanding the Lee-Carter Method - Overview"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/overview
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Whole paper, pp. 1-35 (working paper, 14 Sep 2007)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
  - "[[Girosi King 2007 - Information Loss with One Principal Component]]"
  - "[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]"
  - "[[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]"
  - "[[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]"
used_by: []
aliases:
  - "Girosi King Lee-Carter overview"
  - "Lee-Carter critique overview"
---

# Girosi King 2007 - Understanding the Lee-Carter Method - Overview

> [!summary]
> Girosi and King (2007) show that the Lee-Carter log-bilinear mortality model $m_{at}=\alpha_a+\beta_a\gamma_t+\epsilon_{at}$ with a random-walk-with-drift index is a special case of a multivariate random walk with drift (RWD) whose error covariance is tied to the drift. It is unbiased when the data come from that structure but biased otherwise, and, because forecasts are linear in time, the forecast age profile becomes ever less smooth, for any quadratic smoothness measure and regardless of the data.

## Overview

**Research question.** What are the unrecognised properties of the leading demographic forecasting model, and when is it applicable?

**Contributions.** (1) PCA diagnostic: percent of variance explained by one component across 240 data sets (24 causes x 10 countries; Table 1 reproduces the male table with 24 countries). (2) Equivalence with RWD and a bias result. (3) A theorem-like argument that nonsmoothness of the forecast profile is $\propto\gamma_t^2$ and must eventually grow forever. (4) Critique of second-stage re-estimation (0, 1 or 2 solutions) and of Wilmoth's WLS estimator (not a valid likelihood), endorsing the Poisson MLE.

### Motivating PyMC examples
**E111** "The path we were on: years of life Europe lost to COVID, and whether it came back" (Eurostat 2000-2024; abridged life table; Lee-Carter by SVD against a Bayesian negative-binomial version) - [example gallery](https://redam94.github.io/pymc-challenges/examples.html). For the life-table and counterfactual-path ideas, see [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]].

### Source Map

| Paper section | Pages | Note |
|---|---|---|
| Introduction, motivation, roadmap | 1-2 | this note |
| 1.1 The model, identification, contingency-table view | 2-4 | [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]] |
| 1.2 Estimation by SVD; 1.3 Forecasting with RWD for $\gamma_t$, Eqs. 4-9 | 4-6 | [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]] |
| 2 Information loss with one principal component, Figure 1, Table 1 | 6-10 | [[Girosi King 2007 - Information Loss with One Principal Component]] |
| 3 Lee-Carter and the random walk with drift, Eqs. 11-19, Figure 2 | 11-16 | [[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]] |
| 4 Smoothness of age profiles, Figures 3-5, Eqs. 20-24 | 16-26 | [[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]] |
| 5.1 Second-stage reestimation; 5.2 Wilmoth WLS vs Poisson MLE | 26-30 | [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]] |
| 6 Concluding remarks, references | 30-35 | this note, [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]] |

## Main Content
Detail notes give the formal statements. Practical guidance from the paper: use Lee-Carter for all-cause mortality in places where one component explains at least about 90% of variance, over short horizons, and when the linear fan-out is acceptable; otherwise prefer unrestricted RWD or models that impose smoothness.

## Connections
[[Factor Analysis and PPCA]] (rank-1 PCA), [[Forecast Evaluation and Backtesting]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]], [[Survival Analysis]] (life tables are discrete-time hazards), [[Hierarchical Models]].

> [!tip] Relevance to marketing measurement
> Rank-1 "level times shape" decompositions are common (seasonality profiles times a trend; cohort retention curves). The paper's lesson (one linear factor extrapolated linearly makes shape differences grow without limit) applies to any such forecast.

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method/_Index]]
