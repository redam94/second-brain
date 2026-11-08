---
title: "Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Entire paper, arXiv 2407.09772v4, 50 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Quantile Regression]]"
used_by:
  - "[[Ji 2024 - Asymmetric Laplace Working Likelihood]]"
  - "[[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]"
  - "[[Ji 2024 - Infinitesimal Jackknife Standard Errors]]"
  - "[[Ji 2024 - Simulation Results and Applications]]"
  - "[[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]]"
aliases:
  - Ji Lee Rabe-Hesketh 2024
  - Bayesian quantile regression asymmetric Laplace coverage
---

# Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview

> [!summary]
> Bayesian quantile regression almost always uses the asymmetric Laplace (AL) distribution as a *working* likelihood because its maximiser equals the Koenker-Bassett estimator. Point estimates are consistent, but posterior standard deviations (as in brms and Stata `bayes:qreg`) are wrong: they scale with an arbitrary AL scale parameter and give poor frequentist coverage. Ji, Lee and Rabe-Hesketh propose infinitesimal-jackknife (IJ) standard errors computed from one MCMC run, including a clustered version.

## Overview

**Question.** When is a credible interval from AL-based Bayesian quantile regression trustworthy, and how can it be corrected cheaply?

**Contribution.** (1) Show the Yang-Wang-He (2016) sandwich adjustment is sensitive to the AL scale $\sigma$ at small/moderate $n$; (2) adapt Giordano-Broderick infinitesimal-jackknife SEs to quantile regression, and to cluster data; (3) R package `IJSE` for `brms`/Stan.

**Key result.** IJ SEs have relative error near 0 across $\sigma\in[0.1,10]$ and 90% coverage near nominal for $\tau\in\{0.3,0.5,0.7\}$ (plain posterior SDs can be up to 300% off); at extreme quantiles with large $\sigma$ the *point estimator* is biased (skewed posterior), so even IJ SEs undercover.

## Motivating PyMC examples

**E83** "Bayesian quantile regression, and when it lies" (20,000 US singleton births, NCHS 2023, plus known-truth simulation): check loss and Frisch-Newton LP solver, the quantile process, AL working likelihood (mode right, spread wrong, units trap), coverage simulation, Yang-Wang-He sandwich, Gibbs posterior with a bootstrap-calibrated learning rate — at <https://redam94.github.io/pymc-challenges/examples.html>. The Yang-Wang-He (2016) paper itself is paywalled; this open paper reviews and tests its adjustment (concept summary: [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]). The Gibbs-posterior idea is in [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] (concept note, no raw source).

## Main Content — Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note; [[Ji 2024 - Asymmetric Laplace Working Likelihood]] |
| 2.1 The AL likelihood (check loss, scale mixture, priors on $\sigma$) | [[Ji 2024 - Asymmetric Laplace Working Likelihood]] |
| 2.2 Standard error adjustment (Yang et al.; Sriram) | [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] |
| 3 Infinitesimal jackknife SEs, 3.1 clustered data | [[Ji 2024 - Infinitesimal Jackknife Standard Errors]] |
| 4 Evaluation, independent data (Models 1-2; Figs. 1-4) | [[Ji 2024 - Simulation Results and Applications]] |
| 5 Evaluation, clustered data (Figs. 5-6) | [[Ji 2024 - Simulation Results and Applications]] |
| 6 Applications (Engel food expenditure; Project STAR) | [[Ji 2024 - Simulation Results and Applications]] |
| 7 Concluding remarks | [[Ji 2024 - Simulation Results and Applications]], [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] |

## Relevance to marketing measurement

Effects on the upper tail of customer value or lag times (the 90th percentile of time-to-convert, the 10th percentile of lift) are often reported with quantile regression. Treat default Bayesian credible intervals as unreliable unless calibrated; use bootstrap/IJ/sandwich SEs, especially with clustered markets or stores (geo experiments). See [[Geo-Experiment Methodology - Overview]].

## Connections

[[Quantile Regression]] (frequentist), [[Conformalized Quantile Regression]] (distribution-free intervals for quantile-based predictors), [[Stasinopoulos 2007 - GAMLSS in R - Overview]] (parametric alternative to estimate all quantiles coherently).

## See Also

[[Simulation-Based Calibration - Overview]]
