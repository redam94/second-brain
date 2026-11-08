---
title: "Index: Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 6
---

# Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates

> [!abstract] Routing Summary
> This folder captures Bronk Ramsey (2009), *Bayesian analysis of radiocarbon dates* (Radiocarbon 51(1):337-360). 6 notes including the overview.
> - Whole-paper map and the span-prior warning? -> [[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
> - Need the calibration likelihood Eq. 9 and multimodal calendar posteriors? -> [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]]
> - Need order constraints, the $s^{n-2}$ span problem and uniform phase? -> [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]]
> - Need ramped/exponential/normal groups, multiphase models, cross-references? -> [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]]
> - Need deposition models, tree-ring wiggle matching, Bchron context? -> [[Bronk Ramsey 2009 - Deposition Models and Sequences]]
> - Need MCMC, HPD ranges, simulation checks, agreement indices, outliers? -> [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Bayes for chronologies | [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]] | definition | - | calendar info = likelihood, relative info = prior |
| Calibration equation | [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]] | theorem | curve prior | Eq. 9 convolves measurement and curve variances |
| Span problem | [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] | theorem | flat prior | span prior $\propto s^{n-2}$ |
| Uniform phase | [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] | definition | span problem | $p\propto p_H/(t_b-t_a)^n$ |
| Group priors and multiphase | [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]] | definition | uniform phase | ramp, exponential, normal; contiguous/hiatus |
| Deposition models | [[Bronk Ramsey 2009 - Deposition Models and Sequences]] | concept | groups | defined rate has one free variable |
| Agreement index | [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]] | definition | posterior | $A_i=100F_i\gtrsim60\%$ |

## Notes

- [[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]] — CONTAINS: question, contribution, Source Map, motivating example E39.
- [[Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve]] — CONTAINS: timescale, Eqs. 1-11, calibration derivation, HPD ranges, multimodal toy example, grid-sum PyMC sketch.
- [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]] — CONTAINS: Eqs. 12-16, span problem theorem, uniform phase, simulation of span bias.
- [[Bronk Ramsey 2009 - Other Group Priors Multiphase Models and Cross-Referencing]] — CONTAINS: Eqs. 17-31, group priors, multiphase, refinements, cross-reference, Stonehenge example.
- [[Bronk Ramsey 2009 - Deposition Models and Sequences]] — CONTAINS: Eq. 32, deposition-model catalogue, Bchron note, wiggle-match sketch.
- [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]] — CONTAINS: MCMC, outputs, Eqs. 33-39 agreement indices, simulations, outliers, limits.

## Sources
- [[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]] - Bronk Ramsey C (2009), Radiocarbon 51(1):337-360, 24 pages (open copy via Cambridge Core).

## See Also
- [[Survival Analysis]], [[Hierarchical Models]], [[MCMC Basics]], [[Prior Predictive Checking]]
