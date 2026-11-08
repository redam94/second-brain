---
title: "Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/overview
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "Whole paper, pp. 337-360"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on:
  - "[[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]]"
  - "[[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]]"
  - "[[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]]"
  - "[[Bronk Ramsey 2009 - Deposition Models and Sequences]]"
  - "[[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]"
used_by: []
aliases:
  - "Bronk Ramsey radiocarbon Bayesian overview"
  - "OxCal models overview"
---

# Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview

> [!summary]
> Bronk Ramsey (2009) shows that radiocarbon calibration is a single-event Bayesian update (likelihood from the calibration curve) and that multi-date chronologies are built by adding *prior* structure on event dates: order constraints, "uniform phase" group priors chosen so the prior on the phase span is neutral, and deposition models, all explored by Metropolis-Hastings MCMC in OxCal 4. The central warning is that the naive flat prior on every date strongly favours long spans (density $\propto s^{n-2}$).

## Overview

**Research question.** A 14C result is an isotope-ratio measurement, not a date; calibrated densities are multimodal and non-normal. How should many such results, plus stratigraphic and archaeological context, be combined coherently?

**Contribution.** A modular formulation: events $t_i$ on a continuous timescale; calendar information enters the likelihood, relative information (order, grouping) the prior; models are assembled from boundaries, phases and sequences; output and diagnostic tools (HPD ranges, agreement indices, simulation checks, outlier analysis).

**Key results.** (1) Standard calibration, Eq. 9 below. (2) Uniform-phase prior, Eq. 16, makes the span prior flat. (3) Agreement index $A_i=100F_i$ with a rule-of-thumb threshold of 60%.

### Motivating PyMC examples
**E39** "How old is it? Radiocarbon calibration and Bayesian chronologies" (IntCal20 curve; Shroud of Turin measurements; Sluggan Bog core with Bchron) - [example gallery](https://redam94.github.io/pymc-challenges/examples.html). E39 finds that NUTS on a calendar date fails ($\hat R=2.85$) because the posterior is multimodal, so the date is summed out on a 1-year grid; see [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]].

### Source Map

| Paper section | Pages | Note |
|---|---|---|
| Abstract, Introduction | 337-338 | this note, [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]] |
| Bayes' theorem: the underlying methodology (events, calendar vs relative information, null prior, CQL) | 338-339 | [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] |
| Calendar date information: timescale, PDFs, calibration Eqs. 3-11, Figures 1-2 | 339-342 | [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]] |
| Relative constraints, Eqs. 12-13, Fig. 3 | 342 | [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] |
| Groupings: span problem, uniform phase Eqs. 14-16 | 342-345 | [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] |
| Other distributions (ramped, exponential, normal) Eqs. 17-22, Figs. 4-5 | 345-347 | [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]] |
| Multiple phases Eqs. 23-25, refinements Eqs. 26-30, Figs. 6-7, cross-referencing | 348-352 | [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]] |
| Specific models: defined deposition rate (Eq. 32), other deposition models | 352 | [[Bronk Ramsey 2009 - Deposition Models and Sequences]] |
| Analysis methods (MCMC), model outputs, ranges, interrogation | 353-354 | [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]] |
| Diagnosis: testing models, simulations, Fig. 8, agreement indices Eqs. 33-39, MCMC problems, other problems | 354-358 | [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]] |
| Conclusions, references | 358-360 | this note |

## Main Content
The five detail notes follow the paper. Calibration first (single event), then priors for several events (order, phase, others), then deposition-sequence models, then computation and diagnosis.

## Connections
[[Survival Analysis]] (interval-censored events in time), [[Hierarchical Models]] (phase boundaries act like hyperparameters), [[MCMC Basics]], [[Posterior Predictive Checking]] and [[Simulation-Based Calibration - Overview]] (the paper's simulate-then-recover test is a forerunner of SBC).

> [!tip] Relevance to marketing measurement
> The span-prior problem is the same trap as using flat priors on many exchangeable effects: the implied prior on a derived quantity (here the span, elsewhere total lift or max of effects) can be wildly informative. The paper's check of running the model with *no data* to see what the prior alone does is a good prior-predictive habit ([[Prior Predictive Checking]]).

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates/_Index]]
