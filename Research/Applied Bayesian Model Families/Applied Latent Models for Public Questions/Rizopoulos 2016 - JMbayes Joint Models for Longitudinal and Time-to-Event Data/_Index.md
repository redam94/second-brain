---
title: "Index: Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 7
---

# Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data

> [!abstract] Routing Summary
> This folder captures Rizopoulos (2016), *The R package JMbayes for fitting joint models for longitudinal and time-to-event data using MCMC* (J. Stat. Softw. 72(7)). 7 notes.
> - Whole paper map and key result? -> [[Rizopoulos 2016 - JMbayes Joint Models Overview]]
> - Need the model equations and posterior? -> [[Rizopoulos 2016 - Joint Model Specification and Posterior]]
> - Need MCMC defaults, baseline-hazard splines, speed? -> [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]]
> - Need the PBC fits and Student-t/binary/censored extensions? -> [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]]
> - Need value/slope/area/weighted/shared-RE association structures? -> [[Rizopoulos 2016 - Association Structures and Transformation Functions]]
> - Need dynamic predictions and Bayesian model averaging? -> [[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]]
> - Need AUC, dynamic C, prediction error, cross-validation? -> [[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Joint model | [[Rizopoulos 2016 - Joint Model Specification and Posterior]] | definition | - | GLMM + relative-risk hazard linked by $f(H,b,\alpha)$ |
| Posterior factorisation | [[Rizopoulos 2016 - Joint Model Specification and Posterior]] | theorem | joint model | conditional independence given $b_i$ |
| Implementation | [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]] | concept | posterior | RWM, penalised B-splines, 1 long chain |
| PBC results | [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]] | example | joint model | $\alpha=1.41$, HR 2.7 per doubling |
| Association structures | [[Rizopoulos 2016 - Association Structures and Transformation Functions]] | definition | joint model | value, slope, area, weights, shared RE |
| Dynamic prediction, BMA | [[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]] | theorem | joint model | $\pi_j(u|t)$ with subject-specific weights |
| Accuracy | [[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]] | concept | prediction | AUC 0.854, C_dyn 0.791, CV AUC 0.851 |

## Notes

- [[Rizopoulos 2016 - JMbayes Joint Models Overview]] — CONTAINS: question, key result, Source Map, E25 link.
- [[Rizopoulos 2016 - Joint Model Specification and Posterior]] — CONTAINS: Eqs. 1-7, priors, Gauss-Legendre cumulative hazard check, PyMC sketch.
- [[Rizopoulos 2016 - Implementation MCMC and Baseline Hazard]] — CONTAINS: design, defaults, convergence, speed, knots.
- [[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]] — CONTAINS: PBC basic fit table and extended longitudinal outcomes.
- [[Rizopoulos 2016 - Association Structures and Transformation Functions]] — CONTAINS: five association structures, PBC estimate table, transformations.
- [[Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging]] — CONTAINS: dynamic predictions, Patient 2, BMA theorem.
- [[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]] — CONTAINS: AUC, dynamic C, PE estimators, accuracy table, validation recipe.

## Sources
- [[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]] - Rizopoulos D (2016), J. Stat. Softw. 72(7), 46 pages.

## See Also
- [[Survival Analysis]], [[Hierarchical Models]], [[Missing Data Models]]
