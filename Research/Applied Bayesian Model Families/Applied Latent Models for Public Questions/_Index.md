---
title: "Index: Applied Latent Models for Public Questions"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 31
---

# Applied Latent Models for Public Questions

> [!abstract] Routing Summary
> This cluster covers latent-variable models behind public-facing questions: drift diffusion, radiocarbon calibration and chronologies, Lee-Carter mortality and life tables, the threshold test for discrimination, joint longitudinal-survival models, and forecasting replication. It has 6 sub-folders and 31 notes, written to cover the methods used in the PyMC worked examples E25, E36, E39, E71, E110, E111, E117 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Bronk Ramsey 2009: [[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
> - Girosi King 2007: [[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
> - Rizopoulos 2016: [[Rizopoulos 2016 - JMbayes Joint Models Overview]]
> - Simoiu 2017: [[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
> - Wiecki 2013: [[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]
^routing-summary

## Sub-topics

- [[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates/_Index|Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates]] (6 notes) — COVERS: Bronk Ramsey (2009) shows that radiocarbon calibration is a single-event Bayesian update (likelihood from the calibration curve) and that multi-date chronologies are built by adding *prior* structure on event dates: order constraints, "uniform phase" group priors chosen so the prior on the phase span is neutral, and deposition models, all explored by Metropolis-Hastings MCMC in OxCal 4. The…
- [[Concept Notes - Life Tables and Replication Forecasting/_Index|Concept Notes - Life Tables and Replication Forecasting]] (2 notes) — COVERS: Concept notes: [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]], [[Concept Note - Forecasting Replication from Published Effects]]
- [[Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method/_Index|Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method]] (6 notes) — COVERS: Girosi and King (2007) show that the Lee-Carter log-bilinear mortality model $m_{at}=\alpha_a+\beta_a\gamma_t+\epsilon_{at}$ with a random-walk-with-drift index is a special case of a multivariate random walk with drift (RWD) whose error covariance is tied to the drift. It is unbiased when the data come from that structure but biased otherwise, and, because forecasts are linear in time, the…
- [[Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data/_Index|Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data]] (7 notes) — COVERS: Rizopoulos (2016) presents the R package JMbayes, which fits Bayesian joint models: a generalised linear mixed model for a longitudinal biomarker linked, through the subject's random effects (via current value, slope, cumulative area, weighted history, or the random effects themselves), to a relative-risk hazard for an event time with a penalised B-spline baseline. It also gives dynamic…
- [[Simoiu 2017 - Infra-Marginality and the Threshold Test/_Index|Simoiu 2017 - Infra-Marginality and the Threshold Test]] (6 notes) — COVERS: Simoiu, Corbett-Davies and Goel (2017) show that the outcome (hit-rate) test and the benchmark (search-rate) test for discrimination can point the wrong way when groups have different risk distributions (infra-marginality). Their **threshold test** infers group-specific decision thresholds jointly with latent risk (signal) distributions using a hierarchical Bayesian beta/threshold model. On 4.5…
- [[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model/_Index|Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model]] (4 notes) — COVERS: Wiecki, Sofer and Frank (2013) present **HDDM**, a Python toolbox that fits the drift-diffusion model (DDM) of two-choice response times by hierarchical Bayesian MCMC (PyMC 2, Cython-compiled Wiener first-passage likelihood). Because subject parameters are shrunk toward a group distribution, the hierarchical fit recovers parameters and detects drift-rate and trial-by-trial brain-covariate effects…

## Motivating PyMC examples

E25, E36, E39, E71, E110, E111, E117 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]
- [[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]
- [[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]
- [[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]
- [[raw/Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
