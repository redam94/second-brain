---
title: "Index: Econometrics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-04-16
concept_count: 36
---

# Econometrics

> [!abstract] Routing Summary
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, DAG tutorials, Bayesian propensity weighting, and simulation-based estimation. Contains 36 notes across 4 sub-topics.
> - Need research design fundamentals, selection bias, or DAGs? -> [[Foundations/_Index|Foundations]]
> - Need regression interpretation or OVB? -> [[Research/Econometrics/Regression Foundations/_Index|Regression Foundations]]
> - Need IV, DiD, RD, synthetic control, GSC, DAGs, or propensity weighting? -> [[Research/Econometrics/Identification Strategies/_Index|Identification Strategies]]
> - Need quantile regression, discrete choice, or SEs? -> [[Research/Econometrics/Extensions/_Index|Extensions]]
> - Need simulation-based estimation (MSM, indirect inference, EMM, copula SMM)? -> [[Research/Econometrics/Extensions/_Index|Extensions]]

## Book Overview

- [[Identification Strategies/Mostly Harmless Econometrics - Overview|Mostly Harmless Econometrics - Overview]] — Master index for the book's concepts and structure (moved to Identification Strategies/)

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 4 | Research questions, experimental ideal, selection bias, DAGs (MHE Part I + Pearl) |
| [[Research/Econometrics/Regression Foundations/_Index\|Regression Foundations]] | 3 | CEF, CIA, omitted variables bias (MHE Ch 3) |
| [[Research/Econometrics/Identification Strategies/_Index\|Identification Strategies]] | 16 | IV, LATE, DD, RD, synthetic control, GSC, DAGs, Bayesian IPTW — quasi-experimental methods (MHE Ch 4-6 + Abadie 2021 + Xu 2017 + extras) |
| [[Research/Econometrics/Extensions/_Index\|Extensions]] | 12 | Quantile regression, discrete choice, standard errors (MHE Ch 7-8), simulation-based estimation: MSM, indirect inference, EMM, SMM for copulas (Liesenfeld & Breitung 1998, Oh & Patton 2011) |

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

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian perspective on regression and inference
- [[Research/Research Methodology/_Index|Research Methodology]] — Multiple comparisons and causal inference challenges
