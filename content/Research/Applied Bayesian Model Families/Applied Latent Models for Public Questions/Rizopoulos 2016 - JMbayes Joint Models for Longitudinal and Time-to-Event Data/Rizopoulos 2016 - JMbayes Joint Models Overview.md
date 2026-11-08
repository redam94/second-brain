---
title: "Rizopoulos 2016 - JMbayes Joint Models Overview"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/overview
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Whole paper, JSS 72(7), pp. 1-46"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Joint Model Specification and Posterior]]"
  - "[[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]]"
  - "[[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]]"
  - "[[Rizopoulos 2016 - Association Structures and Transformation Functions]]"
  - "[[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]"
  - "[[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]]"
used_by: []
aliases:
  - "JMbayes paper overview"
  - "Rizopoulos joint models overview"
---

# Rizopoulos 2016 - JMbayes Joint Models Overview

> [!summary]
> Rizopoulos (2016) presents the R package JMbayes, which fits Bayesian joint models: a generalised linear mixed model for a longitudinal biomarker linked, through the subject's random effects (via current value, slope, cumulative area, weighted history, or the random effects themselves), to a relative-risk hazard for an event time with a penalised B-spline baseline. It also gives dynamic predictions, Bayesian model averaging over association structures, and time-dependent AUC and prediction-error validation, illustrated on the Mayo Clinic PBC data.

## Overview

**Why joint models.** (1) Endogenous time-varying covariates (biomarkers) are measured with error and their future path depends on survival; the time-dependent Cox model is not optimal. (2) Informative dropout: if missingness depends on unobserved longitudinal values, the longitudinal and dropout processes must be modelled jointly (selection, pattern-mixture, shared-parameter frameworks; here dropout is a continuous-time event).

**Key result (PBC).** A doubling of serum bilirubin multiplies the hazard of death or transplantation by about 2.7 (95% CI 2.3-3.0) in the basic model, with time-dependent AUC around 0.85 at $t=5$, $\Delta t=2$.

### Motivating PyMC examples
**E25** "Joint longitudinal-survival models" (Mayo Clinic PBC: mixed model plus Weibull hazard sharing LKJ random effects, Gauss-Legendre cumulative hazard, baseline/LOCF/two-stage biases, informative dropout, centred vs non-centred parametrisations) - [example gallery](https://redam94.github.io/pymc-challenges/examples.html). Closely related: **E36** MRP (for hierarchical/multilevel structure) and **E117** (selection model; see [[Concept Note - Forecasting Replication from Published Effects]]).

### Source Map

| Paper section | Pages | Note |
|---|---|---|
| Abstract, 1 Introduction, software landscape | 1-3 | this note |
| 2 Theoretical framework, Eqs. 1-7, priors | 3-5 | [[Rizopoulos 2016 - Joint Model Specification and Posterior]] |
| 3.1-3.3 Design, implementation, speed | 5-7 | [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]] |
| 4.1 Basic joint model (PBC), Table of estimates, left truncation | 7-12 | [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]] |
| 4.2 Extended joint models: Student-$t$, binary, left-censored | 12-15 | [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]] |
| 4.3 Association structures, Eqs. 8-9 | 16-21 | [[Rizopoulos 2016 - Association Structures and Transformation Functions]] |
| 4.4 Transformation functions; 4.5 supporting functions | 21-23 | [[Rizopoulos 2016 - Association Structures and Transformation Functions]] |
| 5.1 Dynamic predictions | 23-27 | [[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]] |
| 5.2 Bayesian model averaging, Eq. 10 | 27-30 | [[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]] |
| 5.3 Predictive accuracy: discrimination, prediction error, validation; 6 Future plans | 30-37 | [[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]] |
| Appendices A-C (knots sensitivity, diagnostics, left truncation), references | 38-46 | [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]], [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]] |

## Connections
[[Survival Analysis]], [[Hierarchical Models]], [[Missing Data Models]] (dropout), [[Efficient MCMC]] (hierarchical centering), [[Model Comparison]], [[Research/Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model/_Index|HDDM]] (hazard-like first-passage modelling).

> [!tip] Relevance to marketing measurement
> A latent customer trajectory (engagement, spend) linked to a churn or conversion hazard is the same structure; ignoring measurement error and dropout biases the apparent effect of engagement on churn. The paper's evidence is clinical; the mapping is analogy.

## See Also
[[Research/Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data/_Index]]
