---
title: "Index: Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 4
---

# Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model

> [!abstract] Routing Summary
> This folder captures Wiecki, Sofer and Frank (2013), *HDDM: Hierarchical Bayesian estimation of the drift-diffusion model in Python* (Front. Neuroinform. 7:14). 4 notes.
> - Need the paper on one page or section-to-note map? -> [[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]
> - Need the DDM definition, Wiener first-passage density, speed-accuracy closed forms or the SPRT optimality background? -> [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]]
> - Need priors, workflow, `depends_on`, regression, DIC and posterior tests? -> [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]]
> - Need the three simulation experiments and results? -> [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Drift-diffusion model | [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]] | definition | - | $v,a,z,t$ parameterize choice+RT |
| Wiener first-passage density | [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]] | theorem | DDM | series; Navarro-Fuss switch |
| Hierarchical DDM priors | [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] | definition | DDM | group-level shrinkage; $s_v,s_t,s_z$ group-only |
| HDDMRegressor | [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] | definition | hierarchical DDM | theta-on-threshold reversal with DBS |
| Simulation design and findings | [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]] | example | hierarchical DDM | HB beats ML, quantiles, nHB; up to +20 pts power |

## Notes

- [[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]] — CONTAINS: research question, contributions, Source Map, motivating PyMC example E71.
- [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]] — CONTAINS: DDM definition, Wiener density with proof sketch, full DDM, speed-accuracy closed forms, SPRT background, numerical check, PyMC sketch.
- [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] — CONTAINS: full prior list, workflow, convergence, DIC, regression, PyMC sketch.
- [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]] — CONTAINS: Experiments 1-3 design, detection rules, results, planning example, limitations.

## Sources
- Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python - Wiecki TV, Sofer I, Frank MJ (2013), Front. Neuroinform. 7:14, 10 pages.

## See Also
- [[Hierarchical Models]], [[Model Comparison]], [[MCMC Basics]], [[Survival Analysis]]
- [[Research/Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test/_Index|Simoiu 2017]] - a latent-threshold model in a different field
