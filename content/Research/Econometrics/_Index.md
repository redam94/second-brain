---
title: "Index: Econometrics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-09-18
concept_count: 77
---

# Econometrics

> [!abstract] Routing Summary
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, DAG tutorials, Bayesian propensity weighting, classical propensity score matching (PSM), simulation-based estimation, staggered difference-in-differences, high-dimensional dependence (copula) modelling, and quasi-Bayesian GMM under plausible (non-exact) moment conditions. Contains 53 notes across 7 sub-topics.
> - Need research design fundamentals, selection bias, or DAGs? -> [[Foundations/_Index|Foundations]]
> - Need regression interpretation or OVB? -> [[Research/Econometrics/Regression Foundations/_Index|Regression Foundations]]
> - Need IV, DiD (canonical), RD, synthetic control, GSC, DAGs, or propensity weighting? -> [[Research/Econometrics/Identification Strategies/_Index|Identification Strategies]]
> - Need **staggered/multi-period DiD** (group-time ATT, doubly-robust estimands, event-study aggregation, multiplier-bootstrap inference)? -> [[Research/Econometrics/Difference-in-Differences/_Index|Difference-in-Differences]]
> - Need **synthetic DiD, event studies, pre-trend testing or Honest DiD**? -> [[Research/Econometrics/Identification Strategies/Synthetic Difference-in-Differences/_Index|Synthetic Difference-in-Differences]]
> - Need **causal machine learning** (double/debiased ML, Neyman orthogonality, cross-fitting, causal forests / GRF, R-learner)? -> [[Research/Econometrics/Causal Machine Learning/_Index|Causal Machine Learning]]
> - Need quantile regression, discrete choice, or SEs? -> [[Research/Econometrics/Extensions/_Index|Extensions]]
> - Need simulation-based estimation (MSM, indirect inference, EMM, copula SMM)? -> [[Research/Econometrics/Extensions/_Index|Extensions]]
> - Need high-dimensional dependence / copulas, tail dependence, or factor copulas? -> [[Research/Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
> - Need **quasi-Bayesian GMM with plausible (non-exact) moment conditions**, priors over misspecification, or the "no free lunch" weighting trade-off? -> [[Research/Econometrics/Plausible GMM/_Index|Plausible GMM]]

## Book Overview

- [[Identification Strategies/Mostly Harmless Econometrics - Overview|Mostly Harmless Econometrics - Overview]] — Master index for the book's concepts and structure (moved to Identification Strategies/)

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 4 | Research questions, experimental ideal, selection bias, DAGs (MHE Part I + Pearl) |
| [[Research/Econometrics/Regression Foundations/_Index\|Regression Foundations]] | 3 | CEF, CIA, omitted variables bias (MHE Ch 3) |
| [[Research/Econometrics/Identification Strategies/_Index\|Identification Strategies]] | 27 | IV, LATE, DD, RD, synthetic control, GSC, DAGs, Bayesian IPTW, **classical PSM (Rosenbaum-Rubin matching framework + diagnostics)** — quasi-experimental methods (MHE Ch 4-6 + Abadie 2021 + Xu 2017 + extras); **Synthetic DiD sub-topic (8 notes: SDID estimator and inference, geo-experiment application, event studies, pre-trend testing, Honest DiD)** |
| [[Research/Econometrics/Difference-in-Differences/_Index\|Difference-in-Differences]] | 6 | Staggered/multi-period DiD: group-time ATT(g,t), parallel-trends/no-anticipation/overlap assumptions, OR/IPW/doubly-robust estimands, event-study/group/calendar aggregation, multiplier-bootstrap uniform inference, TWFE critique (Callaway & Sant'Anna 2020) |
| [[Research/Econometrics/Extensions/_Index\|Extensions]] | 23 | Quantile regression, discrete choice, standard errors (MHE Ch 7-8), simulation-based estimation: MSM, indirect inference, EMM, SMM for copulas, and foundational time-series SME theory (Liesenfeld & Breitung 1998, Evans 2024, Oh & Patton 2011, Duffie & Singleton 1993) |
| [[Research/Econometrics/Dependence Modeling/_Index\|Dependence Modeling]] | 6 | High-dimensional copulas, factor-copula construction, tail dependence via EVT, multi-factor/block structures, rank-based SMM, S&P 100 & systemic risk (Oh & Patton 2012) |
| [[Research/Econometrics/Plausible GMM/_Index\|Plausible GMM]] | 5 | Quasi-Bayesian inference when moment conditions are plausible but not exact: plausibility characteristic $\mu_*$, proper prior over misspecification, CU-GMM quasi-posterior, local Gaussian prior approximation & "no free lunch", institutions-and-GDP IV application (Chernozhukov, Hansen, Kong & Wang 2026) |
| [[Research/Econometrics/Causal Machine Learning/_Index\|Causal Machine Learning]] | 9 | Regularization bias and the partially linear model, Neyman orthogonality, cross-fitting (DML1/DML2), DML for ATE / ATTE / LATE with AIPW scores, honest trees and causal forests, generalized random forests (local moment equations), forest asymptotics and inference, R-learner — Chernozhukov et al. 2018, Wager & Athey 2018, Athey-Tibshirani-Wager 2019, Nie & Wager 2021 |

## Sources

- Mostly Harmless Econometrics — Full textbook PDF (Angrist & Pischke, 2008)
- Discrete Choice and Random Utility Models — PyMC tutorial: Bayesian discrete choice models (McFadden framework)
- Difference in differences — PyMC tutorial: Bayesian DiD with counterfactual prediction
- 15 - Synthetic Control — Causal Inference for the Brave and True — Causal Inference for the Brave and True, Ch. 15: synthetic control with Python (scipy, sklearn)
- Abadie 2021 - Using Synthetic Controls — Abadie (2021) JEL: authoritative guide to synthetic controls, bias theory, requirements, extensions
- Xu 2016 - Generalized Synthetic Control Method — Xu (2017) Political Analysis: GSC method unifying DID and SC via IFE model
- Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs — Graham Harrison, Towards Data Science (2023): comprehensive DAG tutorial
- How to use Bayesian propensity scores and inverse probability weights — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- tdb136 — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- Oh_Patton_SMM_copulas_nov11 — Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"
- 19 — Evans (2024), CompMethods Ch. 19: full Python SMM tutorial + Brock-Mirman structural macro exercise
- Oh-Patton-2012-Factor-Copulas — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas" (Duke): factor copulas, EVT tail dependence, rank-based SMM, S&P 100 systemic risk
- 1803.09015-Callaway-SantAnna-DiD-Multiple-Periods — Callaway & Sant'Anna (2020), "Difference-in-Differences with Multiple Time Periods" (J. Econometrics): group-time ATT, doubly-robust estimands, aggregation schemes, multiplier-bootstrap inference, minimum-wage application
- Plausible GMM - A Quasi-Bayesian Approach — Chernozhukov, Hansen, Kong & Wang (2026), arXiv:2507.00555 (econ.EM): quasi-Bayesian GMM under plausible (non-exact) moment conditions, priors over misspecification, Bernstein–von Mises concentration, institutions-and-GDP IV application
- Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices — Duffie & Singleton (1993), Econometrica 61(4):929–952: foundational Simulated Moments Estimator (SME) theory for time-series Markov asset-pricing models — geometric ergodicity, AUC condition, consistency, asymptotic normality
- PSM-Rosenbaum-Rubin-Stuart-Survey — Survey synthesis: Rosenbaum & Rubin (1983) Biometrika, Rosenbaum & Rubin (1985) AmStat, Stuart (2010) Statistical Science, Imbens (2004) RESTAT — classical propensity score matching framework, algorithms, and balance diagnostics

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian perspective on regression and inference
- [[Research/Research Methodology/_Index|Research Methodology]] — Multiple comparisons and causal inference challenges
