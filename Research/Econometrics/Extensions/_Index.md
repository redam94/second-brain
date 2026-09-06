---
title: "Index: Extensions"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-11
concept_count: 16
doc_type: index
folder: "Research/Econometrics/Extensions"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Extensions

> [!abstract] Routing Summary
> This folder covers extensions to the core econometric toolkit: three standalone method notes (MHE Ch. 7–8 + PyMC) plus two sub-topics on simulation-based estimation. Contains 15 notes across 3 areas.
> - Need distributional effects or QTE? → [[Quantile Regression]]
> - Need multinomial logit/probit or random utility? → [[Discrete Choice Models]]
> - Need robust SEs, clustering, or Moulton factor? → [[Standard Errors and Clustering]]
> - Need simulation-based estimation (MSM, indirect inference, EMM, weighting, Python code)? → [[Simulation-Based Estimation/_Index|Simulation-Based Estimation]]
> - Need SMM applied to copulas (Oh & Patton: theory, testing, application)? → [[Copula SMM/_Index|Copula SMM]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Simulation-Based Estimation/_Index|Simulation-Based Estimation]] | 8 | General MSM/SMM/indirect inference/EMM theory and implementation — Liesenfeld & Breitung (1998) + Evans (2024) |
| [[Copula SMM/_Index|Copula SMM]] | 5 | SMM for copula models: dependence measures, estimator, asymptotic theory, J-test, Monte Carlo — Oh & Patton (2011) |

## Standalone Notes

- [[Quantile Regression]] — CONTAINS: Conditional quantile functions, quantile treatment effects (QTE), approximation property, distributional effects
- [[Discrete Choice Models]] — CONTAINS: Random utility model, multinomial logit/probit, IIA assumption, Bayesian discrete choice in PyMC, McFadden framework
- [[Standard Errors and Clustering]] — CONTAINS: Heteroskedasticity-robust SEs, Moulton factor, serial correlation in panels, few-cluster corrections, wild bootstrap

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 7–8
- [[raw/Discrete Choice and Random Utility Models]] — PyMC tutorial: Bayesian discrete choice models
- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"
- [Computational Methods for Economists — Ch. 19](https://opensourceecon.github.io/CompMethods/struct_est/SMM.html) — Evans (2024)

## See Also

- [[Generalized Linear Models]] — Bayesian approach to logistic/Poisson regression
- [[Monsters and Mixtures]] — Maximum entropy justification for categorical models
- [[Copula Estimation]] — Bayesian copula estimation (complementary approach to Copula SMM)
