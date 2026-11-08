---
title: "Stasinopoulos 2007 - GAMLSS in R - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Entire paper, J. Stat. Softw. 23(7), pp. 1-46"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Generalized Linear Models]]"
used_by:
  - "[[Stasinopoulos 2007 - GAMLSS Model Framework]]"
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
  - "[[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]"
  - "[[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]]"
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
  - "[[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]"
aliases:
  - GAMLSS in R overview
  - Stasinopoulos and Rigby 2007
---

# Stasinopoulos 2007 - GAMLSS in R - Overview

> [!summary]
> Stasinopoulos and Rigby (2007) define **GAMLSS** (generalized additive models for location, scale and shape): regression where *every* parameter of a flexible response distribution (mean $\mu$, scale $\sigma$, skewness $\nu$, kurtosis $\tau$) gets its own additive predictor. The paper documents the `gamlss` R package and works four examples, ending with BMI/head-circumference centile curves from the Fourth Dutch Growth Study. Key takeaway: model the whole conditional distribution, not only the mean.

## Overview

**Research question.** GLMs and GAMs restrict the response to the exponential family and model only the mean (plus a dispersion that is constant or tied to the mean). How can one regress on a response that is skewed, heavy-tailed or overdispersed, with spread and shape that change with covariates?

**Contribution.** (1) A unified model class (see [[Stasinopoulos 2007 - GAMLSS Model Framework]]); (2) a catalogue of >50 continuous and discrete distributions and ten additive-term types ([[Stasinopoulos 2007 - Distributions and Additive Terms]]); (3) the RS and CG penalized-likelihood fitting algorithms with GAIC/validation tuning ([[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]); (4) four worked examples ([[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]], [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]).

**Key result.** On the head-circumference data a Box-Cox-t (BCT) GAMLSS with smooth $\mu,\sigma$ and linear $\nu,\tau$ had no worm-plot violations, whereas the earlier LMS fit had 16 violations (van Buuren and Fredriks 2001).

## Motivating PyMC examples

This paper underlies the PyMC example "Is my child normal? Distributional regression (GAMLSS/LMS) and growth centile charts" (**E41**; Fourth Dutch Growth Study BMI of 7,294 boys) at <https://redam94.github.io/pymc-challenges/examples.html>. E41 compares constant-spread, smooth-spread, skewed and heavy-tailed models with Bayesian P-splines for every distribution parameter; see [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]. The same ideas appear in E83 (quantile regression) and E108 (usual-intake distributions).

## Main Content — Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| 1.1 Introduction | 1-2 | this note; [[Stasinopoulos 2007 - GAMLSS Model Framework]] |
| 1.2 The GAMLSS model, Eqs. (1)-(6) | 2-4 | [[Stasinopoulos 2007 - GAMLSS Model Framework]] |
| 1.3 Distributions, Tables 1-2, censoring, truncation, mixtures | 4-7 | [[Stasinopoulos 2007 - Distributions and Additive Terms]] |
| 1.4 Additive terms, Table 3, P-splines | 7-11 | [[Stasinopoulos 2007 - Distributions and Additive Terms]] |
| 1.5 Algorithms (CG, RS) | 11 | [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] |
| 2 The R packages and functions | 12-13 | [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] |
| 3.2 Lice data (count distributions) | 13-16 | [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]] |
| 3.3 CD4 data (mean/variance smoothing) | 16-25 | [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]] |
| 3.4 Third-party claims (term selection) | 26-33 | [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]] |
| 3.5 Head circumference, BCT, worm plot, Q statistics | 33-44 | [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]] |
| 4 Conclusions | 44-45 | [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] |
| (not in paper) Bayesian reading, PyMC sketch | — | [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]] |

## Examples

See the example note; the compact comparison is: Poisson AIC 29,174.8 vs Sichel 4,646.2 on the lice counts; CD4 with a smooth $\sigma$ lowers the needed $\mu$ complexity (df 3.72 and 1.81 under AIC); head circumference BCT total df $(\mu,\sigma,\nu,\tau)$ = (17.77, 10.05, 2, 2) (extra smoothing df 15.77 and 8.05 plus constant and linear parts; linear $\nu,\tau$) with age power $\xi = 0.28$.

## Relevance to marketing measurement

Revenue, spend and conversion outcomes are skewed and heteroscedastic (spread grows with level). GAMLSS-style models let the variance and tail of KPI distributions depend on channel mix or seasonality, giving calibrated predictive intervals rather than a single mean response — useful when an MMM's residuals are clearly non-Gaussian. Related vault notes: [[Generalized Linear Models]], [[Quantile Regression]], [[Hilbert Space Gaussian Processes]] (an alternative smoother).

## Connections

Depends on [[Generalized Linear Models]]. Contrasts with quantile approaches ([[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]), which leave the distribution unspecified.

## See Also

- [[Overfitting and Information Criteria]], [[Posterior Predictive Checking]]
