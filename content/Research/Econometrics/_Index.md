---
title: "Index: Econometrics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
<<<<<<< HEAD
date_updated: 2026-06-27
concept_count: 60
=======
date_updated: 2026-06-28
concept_count: 51
>>>>>>> main
---

# Econometrics

> [!abstract] Routing Summary
<<<<<<< HEAD
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, DAG tutorials, Bayesian propensity weighting, simulation-based estimation, staggered difference-in-differences, high-dimensional dependence (copula) modelling, and quasi-Bayesian GMM under plausible (non-exact) moment conditions. Contains 53 notes across 7 sub-topics.
=======
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, DAG tutorials, Bayesian propensity weighting, **classical propensity score matching (PSM)**, simulation-based estimation, staggered difference-in-differences, and high-dimensional dependence (copula) modelling. Contains 51 notes across 6 sub-topics.
>>>>>>> main
> - Need research design fundamentals, selection bias, or DAGs? -> [[Foundations/_Index|Foundations]]
> - Need regression interpretation or OVB? -> [[Research/Econometrics/Regression Foundations/_Index|Regression Foundations]]
> - Need IV, DiD (canonical), RD, synthetic control, GSC, DAGs, or propensity weighting? -> [[Research/Econometrics/Identification Strategies/_Index|Identification Strategies]]
> - Need **staggered/multi-period DiD** (group-time ATT, doubly-robust estimands, event-study aggregation, multiplier-bootstrap inference)? -> [[Research/Econometrics/Difference-in-Differences/_Index|Difference-in-Differences]]
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
| [[Research/Econometrics/Identification Strategies/_Index\|Identification Strategies]] | 19 | IV, LATE, DD, RD, synthetic control, GSC, DAGs, Bayesian IPTW, **classical PSM (Rosenbaum-Rubin matching framework + diagnostics)** — quasi-experimental methods (MHE Ch 4-6 + Abadie 2021 + Xu 2017 + extras) |
| [[Research/Econometrics/Difference-in-Differences/_Index\|Difference-in-Differences]] | 6 | Staggered/multi-period DiD: group-time ATT(g,t), parallel-trends/no-anticipation/overlap assumptions, OR/IPW/doubly-robust estimands, event-study/group/calendar aggregation, multiplier-bootstrap uniform inference, TWFE critique (Callaway & Sant'Anna 2020) |
| [[Research/Econometrics/Extensions/_Index\|Extensions]] | 23 | Quantile regression, discrete choice, standard errors (MHE Ch 7-8), simulation-based estimation: MSM, indirect inference, EMM, SMM for copulas, and foundational time-series SME theory (Liesenfeld & Breitung 1998, Evans 2024, Oh & Patton 2011, Duffie & Singleton 1993) |
| [[Research/Econometrics/Dependence Modeling/_Index\|Dependence Modeling]] | 6 | High-dimensional copulas, factor-copula construction, tail dependence via EVT, multi-factor/block structures, rank-based SMM, S&P 100 & systemic risk (Oh & Patton 2012) |
| [[Research/Econometrics/Plausible GMM/_Index\|Plausible GMM]] | 5 | Quasi-Bayesian inference when moment conditions are plausible but not exact: plausibility characteristic $\mu_*$, proper prior over misspecification, CU-GMM quasi-posterior, local Gaussian prior approximation & "no free lunch", institutions-and-GDP IV application (Chernozhukov, Hansen, Kong & Wang 2026) |

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Full textbook PDF (Angrist & Pischke, 2008)
- [[raw/Discrete Choice and Random Utility Models]] — PyMC tutorial: Bayesian discrete choice models (McFadden framework)
- [[raw/Difference in differences]] — PyMC tutorial: Bayesian DiD with counterfactual prediction
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: synthetic control with Python (scipy, sklearn)
- [[raw/Abadie 2021 - Using Synthetic Controls.pdf]] — Abadie (2021) JEL: authoritative guide to synthetic controls, bias theory, requirements, extensions
- [[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]] — Xu (2017) Political Analysis: GSC method unifying DID and SC via IFE model
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023): comprehensive DAG tutorial
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"
- [[raw/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]] — Evans (2024), CompMethods Ch. 19: full Python SMM tutorial + Brock-Mirman structural macro exercise
- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas" (Duke): factor copulas, EVT tail dependence, rank-based SMM, S&P 100 systemic risk
- [[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]] — Callaway & Sant'Anna (2020), "Difference-in-Differences with Multiple Time Periods" (J. Econometrics): group-time ATT, doubly-robust estimands, aggregation schemes, multiplier-bootstrap inference, minimum-wage application
<<<<<<< HEAD
- [[raw/Plausible GMM - A Quasi-Bayesian Approach]] — Chernozhukov, Hansen, Kong & Wang (2026), arXiv:2507.00555 (econ.EM): quasi-Bayesian GMM under plausible (non-exact) moment conditions, priors over misspecification, Bernstein–von Mises concentration, institutions-and-GDP IV application
- [[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]] — Duffie & Singleton (1993), Econometrica 61(4):929–952: foundational Simulated Moments Estimator (SME) theory for time-series Markov asset-pricing models — geometric ergodicity, AUC condition, consistency, asymptotic normality
=======
- [[raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md]] — Survey synthesis: Rosenbaum & Rubin (1983) Biometrika, Rosenbaum & Rubin (1985) AmStat, Stuart (2010) Statistical Science, Imbens (2004) RESTAT — classical propensity score matching framework, algorithms, and balance diagnostics
>>>>>>> main

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian perspective on regression and inference
- [[Research/Research Methodology/_Index|Research Methodology]] — Multiple comparisons and causal inference challenges
