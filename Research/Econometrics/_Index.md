---
title: "Index: Econometrics"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-04-11
concept_count: 24
---

# Econometrics

> [!abstract] Routing Summary
> This folder covers applied econometrics and causal inference from Mostly Harmless Econometrics plus Bayesian DiD, synthetic control, and DAG tutorials. Contains 17 notes across 4 sub-topics.
> - Need research design fundamentals, selection bias, or DAGs? -> [[Foundations/_Index|Foundations]]
> - Need regression interpretation or OVB? -> [[Regression Foundations/_Index|Regression Foundations]]
> - Need IV, DiD, RD, or synthetic control designs? -> [[Identification Strategies/_Index|Identification Strategies]]
> - Need quantile regression, discrete choice, or SEs? -> [[Extensions/_Index|Extensions]]

## Book Overview

- [[Identification Strategies/Mostly Harmless Econometrics - Overview|Mostly Harmless Econometrics - Overview]] — Master index for the book's concepts and structure (moved to Identification Strategies/)

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 4 | Research questions, experimental ideal, selection bias, DAGs (MHE Part I + Pearl) |
| [[Regression Foundations/_Index\|Regression Foundations]] | 3 | CEF, CIA, omitted variables bias (MHE Ch 3) |
| [[Identification Strategies/_Index\|Identification Strategies]] | 14 | IV, LATE, DD, RD, synthetic control, GSC — quasi-experimental methods (MHE Ch 4-6 + Abadie 2021 + Xu 2017) |
| [[Extensions/_Index\|Extensions]] | 3 | Quantile regression, discrete choice, standard errors (MHE Ch 7-8) |

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Full textbook PDF (Angrist & Pischke, 2008)
- [[raw/Discrete Choice and Random Utility Models]] — PyMC tutorial: Bayesian discrete choice models (McFadden framework)
- [[raw/Difference in differences]] — PyMC tutorial: Bayesian DiD with counterfactual prediction
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: synthetic control with Python (scipy, sklearn)
- [[raw/Abadie 2021 - Using Synthetic Controls.pdf]] — Abadie (2021) JEL: authoritative guide to synthetic controls, bias theory, requirements, extensions
- [[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]] — Xu (2017) Political Analysis: GSC method unifying DID and SC via IFE model
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023): comprehensive DAG tutorial

## See Also

- [[Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian perspective on regression and inference
- [[Research Methodology/_Index|Research Methodology]] — Multiple comparisons and causal inference challenges
