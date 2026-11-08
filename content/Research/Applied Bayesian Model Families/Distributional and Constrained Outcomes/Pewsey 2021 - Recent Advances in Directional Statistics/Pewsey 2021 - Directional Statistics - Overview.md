---
title: "Pewsey 2021 - Directional Statistics - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Entire paper, TEST 30 (2021), arXiv 2005.06889, 61 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on: []
used_by:
  - "[[Pewsey 2021 - Circular Distributions and Constructions]]"
  - "[[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]]"
  - "[[Pewsey 2021 - Circular Regression and Serial Dependence]]"
  - "[[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]]"
  - "[[Pewsey 2021 - Circular Models in PyMC]]"
aliases:
  - Pewsey and Garcia-Portugues 2021
  - directional statistics review
---

# Pewsey 2021 - Directional Statistics - Overview

> [!summary]
> Pewsey and García-Portugués (2021, TEST) review developments in directional statistics since Mardia and Jupp (1999): data on circles (angles, times of day), spheres, tori and cylinders. Standard linear methods can be "thoroughly misleading" because supports are compact manifolds. The paper surveys distributions, inference, testing, regression, smoothing, dimension reduction, clustering, time series, spatial models and software.

## Overview

**Question.** What has changed in modelling and inference for directional data since 1999?

**Contribution.** A concise, near-exhaustive survey with pointers to sources, 14 sections, ~300+ references. Models are no longer insisted to be exponential-family; flexible skewness/peakedness, mixtures, Bayesian and score-matching inference are now common.

**Key result (for applied use).** The von Mises is derivable five ways and closely approximated by the wrapped normal; regression for angular responses is done through (a) link functions such as $2\tan^{-1}$ or (b) projecting a latent bivariate normal, with Bayesian estimation avoiding the ML pathologies of link-based models.

## Motivating PyMC examples

**E81** "Circular data: directions, times of day and seasons" (Santa Barbara hourly wind 2021-23; Barro Colorado camera traps; Oklahoma quakes as a null) — mean resultant vector, von Mises / wrapped / projected normal, tan-half vs canonical link, wrapped-prior and step-mode failures, harmonic circular predictor — at <https://redam94.github.io/pymc-challenges/examples.html>. See [[Pewsey 2021 - Circular Models in PyMC]].

## Main Content — Source Map

| Paper section | Covered in |
|---|---|
| 1 Introduction (S^1, S^2, tori, cylinders, axial data, applications) | this note |
| 2 Exploratory data analysis (rose diagrams, circular boxplot, CircSiZer, WiZer) | [[Pewsey 2021 - Circular Distributions and Constructions]] |
| 3.1 Circular models (wrapped, projected, perturbed; vM, WC, cardioid, sine-skewed, Jones-Pewsey, Kato-Jones, Möbius, mixtures, generalized vM) | [[Pewsey 2021 - Circular Distributions and Constructions]] |
| 3.2 Toroidal, 3.3 cylindrical, 3.4 spherical models | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] |
| 4 General approaches to inference | [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]] |
| 5 Hypothesis testing (uniformity, symmetry, GOF) | [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]] |
| 6 Correlation and regression | [[Pewsey 2021 - Circular Regression and Serial Dependence]] |
| 7 Nonparametric curve estimation (KDE, Nadaraya-Watson) | [[Pewsey 2021 - Circular Regression and Serial Dependence]] |
| 8-9 Dimension reduction, classification, clustering | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] |
| 10 Serial dependence | [[Pewsey 2021 - Circular Regression and Serial Dependence]] |
| 11 Spatial and spatio-temporal | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] |
| 12 Other topics (depth, experiments, outliers, compositional) | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] |
| 13 Software; 14 Conclusions | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] |
| (concept translation) | [[Pewsey 2021 - Circular Models in PyMC]] |

## Relevance to marketing measurement

Time-of-day and day-of-week/season effects (ad exposure hours, purchase timing, seasonal campaign response) are periodic variables; treating hour as linear splits 23:59 from 00:01. Circular distributions and harmonic predictors respect the wrap-around. See also [[Local Linear Trend and Seasonality]].

## Connections

Compositional data connect to the sphere through the square-root transform ([[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]).

## See Also

[[Hilbert Space Gaussian Processes]] (periodic GPs for the same seasonal effects)
