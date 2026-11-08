---
title: "Molina Marhuenda 2015 - sae Small Area Estimation - Overview"
tags:
  - source/ingested
  - topic/nowcasting
  - type/overview
  - doc/paper
source: "[[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]"
source_location: "Whole paper, pp. 81-98 (R Journal 7/1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Molina Marhuenda 2015 - sae Small Area Estimation"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Poststratification]]"
used_by:
  - "[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]"
  - "[[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]]"
  - "[[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]]"
  - "[[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]]"
aliases:
  - "sae package overview"
  - "small area estimation overview"
---

# Molina Marhuenda 2015 - sae Small Area Estimation - Overview

> [!summary]
> Molina & Marhuenda (2015, *The R Journal* 7(1): 81-98) describe the `sae` package and, with it, the standard frequentist toolkit for small area estimation (SAE): the Fay-Herriot (FH) area-level model, its spatial and spatio-temporal extensions, the Battese-Harter-Fuller (BHF) unit-level model, and empirical-best estimators for nonlinear targets such as poverty rates. The shared idea is shrinking noisy direct survey estimates toward a regression prediction in proportion to their sampling variance.

## Overview
**Problem.** A survey designed for national or regional figures leaves some areas with tiny samples. A direct estimator from the area's own data is unbiased but has huge variance. Model-based indirect estimators "borrow strength" through a regression common to all areas, improving efficiency as long as the model holds.

**Contribution.** A single reference with the model equations (area-level 1-5, SAR(1) spatial 6, AR(1) time, nested-error 7-8, best predictor 9-12), the fitting and MSE methods (Fay-Herriot, ML, REML; Prasad-Rao analytic MSE; parametric and non-parametric bootstrap), and four worked examples (milk expenditure, Tuscany grapes, a synthetic spatio-temporal set, Iowa corn/soybean).

**Key result.** FH EBLUPs track direct estimates but are less volatile, and cut the coefficient of variation (CV) below the 20% publication limit for all 43 milk areas where several direct CVs exceeded it; gains are largest where samples are smallest.

## Motivating PyMC examples
[E112](https://redam94.github.io/pymc-challenges/examples.html) ("How many children in your county are poor? Small-area estimates and a surprise map": Fay-Herriot from scratch for 3,142 US counties with ACS margins of error, logit classic model, generalised variance functions, censored zeros). The Bayesian version and the map idea are in [[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]].

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, package at a glance, Introduction | 81-82 | this note |
| Design vs model-based inference; Notation | 82-83 | [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] |
| EBLUPs based on a FH model; fitting methods; MSE; Example 1 (milk) | 83-86 | [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] |
| Spatial FH (SAR(1)); Example 2 (grapes) | 86-87 | [[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]] |
| Spatio-temporal FH; Example 3 | 87-89 | [[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]] |
| Unit-level BHF model; Example 4 (Iowa) | 89-91 | [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]] |
| EB for nonlinear parameters (poverty), Box-Cox | 91-94 | [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]] |
| Other software, summary | 94-98 | this note (list only) and the concept note |

## Connections
SAE is partial pooling: the FH shrinkage factor $\gamma_d=A/(A+\psi_d)$ is the classical form of the pooling weight in [[Hierarchical Models]] and [[Partial Pooling as Multiple Comparisons Correction]]. Poststratifying a model to small cells is the unit-level cousin ([[Poststratification]]).

## Relevance to marketing measurement
Geo-level or DMA-level response with few observations per cell is the same problem: noisy per-geo lift estimates should be shrunk toward a covariate-driven mean by precision. Known sampling variances $\psi_d$ play the role of per-geo standard errors in a geo-experiment meta-analysis.

## See Also
[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]
