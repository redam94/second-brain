---
title: "Index: Extensions"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Econometrics/_Index|Econometrics]]"
date_updated: 2026-06-28
concept_count: 23
---

# Extensions

> [!abstract] Routing Summary
> This folder covers extensions to the core econometric toolkit: three standalone method notes (MHE Ch. 7–8 + PyMC) plus three sub-topics (simulation-based estimation, copula SMM, BLP demand). Contains 23 notes across 4 areas.
> - Need distributional effects or QTE? → [[Quantile Regression]]
> - Need multinomial logit/probit or random utility? → [[Discrete Choice Models]]
> - Need robust SEs, clustering, or Moulton factor? → [[Standard Errors and Clustering]]
> - Need random-coefficients logit / BLP demand estimation (contraction mapping, GMM instruments, PyBLP)? → [[Research/Econometrics/Extensions/BLP Demand Estimation/_Index|BLP Demand Estimation]]
> - Need simulation-based estimation (MSM, indirect inference, EMM, weighting, Python code)? → [[Research/Econometrics/Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]]
> - Need SMM applied to copulas (Oh & Patton: theory, testing, application)? → [[Research/Econometrics/Extensions/Copula SMM/_Index|Copula SMM]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Research/Econometrics/Extensions/BLP Demand Estimation/_Index\|BLP Demand Estimation]] | 6 | Random-coefficients logit demand, the BLP contraction mapping, GMM estimation with instruments for price endogeneity, numerical integration/optimization, supply side & markups — Conlon & Gortmaker (2020), PyBLP |
| [[Research/Econometrics/Extensions/Simulation-Based Estimation/_Index\|Simulation-Based Estimation]] | 15 | General MSM/SMM/indirect inference/EMM theory and implementation — Liesenfeld & Breitung (1998), Evans (2024) — plus the foundational time-series SME theory (geometric ergodicity, AUC condition, consistency, asymptotic normality) — Duffie & Singleton (1993) |
| [[Research/Econometrics/Extensions/Copula SMM/_Index\|Copula SMM]] | 5 | SMM for copula models: dependence measures, estimator, asymptotic theory, J-test, Monte Carlo — Oh & Patton (2011) |

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
- [[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]] — Duffie & Singleton (1993), Econometrica 61(4):929–952

## See Also

- [[Generalized Linear Models]] — Bayesian approach to logistic/Poisson regression
- [[Monsters and Mixtures]] — Maximum entropy justification for categorical models
- [[Copula Estimation]] — Bayesian copula estimation (complementary approach to Copula SMM)
