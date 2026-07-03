---
title: "Index: Econometrics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-07-03
concept_count: 56
---

# Econometrics

> [!abstract] Routing Summary
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, DAG tutorials, Bayesian propensity weighting, **classical propensity score matching (PSM)**, simulation-based estimation, staggered difference-in-differences, and high-dimensional dependence (copula) modelling including **vine copulas (Aas et al. 2009) and copula architecture comparison**. Contains 56 notes across 6 sub-topics.
> - Need research design fundamentals, selection bias, or DAGs? -> [[Foundations/_Index|Foundations]]
> - Need regression interpretation or OVB? -> [[Regression Foundations/_Index|Regression Foundations]]
> - Need IV, DiD (canonical), RD, synthetic control, GSC, DAGs, or propensity weighting? -> [[Identification Strategies/_Index|Identification Strategies]]
> - Need **staggered/multi-period DiD** (group-time ATT, doubly-robust estimands, event-study aggregation, multiplier-bootstrap inference)? -> [[Difference-in-Differences/_Index|Difference-in-Differences]]
> - Need quantile regression, discrete choice, or SEs? -> [[Extensions/_Index|Extensions]]
> - Need simulation-based estimation (MSM, indirect inference, EMM, copula SMM)? -> [[Extensions/_Index|Extensions]]
> - Need high-dimensional dependence / copulas, tail dependence, factor copulas, or **vine copulas**? -> [[Dependence Modeling/_Index|Dependence Modeling]]

## Book Overview

- [[Identification Strategies/Mostly Harmless Econometrics - Overview|Mostly Harmless Econometrics - Overview]] — Master index for the book's concepts and structure (moved to Identification Strategies/)

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 4 | Research questions, experimental ideal, selection bias, DAGs (MHE Part I + Pearl) |
| [[Regression Foundations/_Index\|Regression Foundations]] | 3 | CEF, CIA, omitted variables bias (MHE Ch 3) |
| [[Identification Strategies/_Index\|Identification Strategies]] | 19 | IV, LATE, DD, RD, synthetic control, GSC, DAGs, Bayesian IPTW, **classical PSM (Rosenbaum-Rubin matching framework + diagnostics)** — quasi-experimental methods (MHE Ch 4-6 + Abadie 2021 + Xu 2017 + extras) |
| [[Difference-in-Differences/_Index\|Difference-in-Differences]] | 6 | Staggered/multi-period DiD: group-time ATT(g,t), parallel-trends/no-anticipation/overlap assumptions, OR/IPW/doubly-robust estimands, event-study/group/calendar aggregation, multiplier-bootstrap uniform inference, TWFE critique (Callaway & Sant'Anna 2020) |
| [[Extensions/_Index\|Extensions]] | 12 | Quantile regression, discrete choice, standard errors (MHE Ch 7-8), simulation-based estimation: MSM, indirect inference, EMM, SMM for copulas (Liesenfeld & Breitung 1998, Oh & Patton 2011) |
| [[Dependence Modeling/_Index\|Dependence Modeling]] | 11 | High-dimensional copulas: factor copulas (Oh & Patton 2012, $n\geq50$, SMM) and vine copulas (Aas et al. 2009; Bedford & Cooke 2002, $n\lesssim20$, sequential MLE); tail dependence via EVT; architecture comparison |

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
- [[raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md]] — Survey synthesis: Rosenbaum & Rubin (1983) Biometrika, Rosenbaum & Rubin (1985) AmStat, Stuart (2010) Statistical Science, Imbens (2004) RESTAT — classical propensity score matching framework, algorithms, and balance diagnostics
- [[raw/Vine-Copulas-Aas-BedfordCooke-Survey.md]] — Survey synthesis: Aas et al. (2009) Insurance: Math. & Econ. 44:182-198 (pair-copula constructions); Bedford & Cooke (2002) Ann. Stat. 30:1031-1068 (vine graphical model); Czado (2010) Springer LNS 198 (practitioner review); Dißmann et al. (2013) CSDA 59:52-69 (R-vine selection and estimation)

## See Also

- [[Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian perspective on regression and inference
- [[Research Methodology/_Index|Research Methodology]] — Multiple comparisons and causal inference challenges
