---
title: "Index: Mechanistic and Scientific Models - Concept Notes"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
parent: "[[../_Index|Mechanistic and Scientific Models]]"
date_updated: 2026-11-08
concept_count: 8
---

# Mechanistic and Scientific Models - Concept Notes

> [!abstract] Routing Summary
> Eight synthesis notes ("concept note, no raw source") covering PyMC-example topics that no ingested paper covers directly: ODE likelihoods, universal differential equations, chaos and data assimilation, jump-diffusion SDEs, popPK dosing decisions, surplus-production fisheries models, Luria-Delbruck / telegraph count likelihoods, and weather-modified dose-response. Citations are from memory and flagged for verification.
> - Need the general template for putting an ODE/PDE solver inside a likelihood (gradients, custom Ops, pitfalls)? -> [[Likelihoods Built on Differential Equations (Concept Note)]]
> - Need neural networks inside ODEs, Bayesian treatment? -> [[Universal Differential Equations and Scientific ML (Concept Note)]]
> - Need why chaotic likelihoods are rough and the remedies? -> [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]]
> - Need jump-diffusion likelihoods? -> [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]]
> - Need dosing decisions from a popPK posterior? -> [[Population PK Dosing Decisions from the Posterior (Concept Note)]]
> - Need surplus-production state-space models? -> [[Surplus-Production State-Space Models for Fisheries (Concept Note)]]
> - Need Luria-Delbruck or bursting count likelihoods? -> [[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]]
> - Need dose-response with weather covariates? -> [[Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| ODE-likelihood template | [[Likelihoods Built on Differential Equations (Concept Note)]] | definition | adjoint, sensitivities | solve, observe, add noise, differentiate |
| UDE | [[Universal Differential Equations and Scientific ML (Concept Note)]] | definition | neural ODE | NN replaces unknown terms |
| Ricker map benchmark | [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]] | definition | Wood 2010 | rough trajectory-matching likelihood |
| Merton mixture density | [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]] | theorem | compound Poisson | Poisson-weighted normals |
| PTA and EU dosing | [[Population PK Dosing Decisions from the Posterior (Concept Note)]] | definition | popPK posterior | PTA peaks about 0.90 for 900-1200 mg q12h |
| Schaefer state-space model | [[Surplus-Production State-Space Models for Fisheries (Concept Note)]] | definition | logistic growth | MSY $=rK/4$ |
| LD recursion; Poisson-Beta | [[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]] | theorem | compound Poisson | $p_r=\frac mr\sum p_i/(r-i+1)$ |
| Weather-modified Mitscherlich | [[Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)]] | definition | Hierarchical Models | $y'(N^*)=c/P$ |

## Notes

- [[Likelihoods Built on Differential Equations (Concept Note)]] — CONTAINS: template, design-choice table, custom Op/VJP sketch, pitfalls, runnable fit.
- [[Universal Differential Equations and Scientific ML (Concept Note)]] — CONTAINS: UDE definition, Bayesian issue table, forward-model code.
- [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]] — CONTAINS: Ricker benchmark, strategy table (synthetic likelihood, multiple shooting, data assimilation, particle MCMC), verified Lyapunov code.
- [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]] — CONTAINS: Merton model, mixture theorem, Euler vs exact, verified density check.
- [[Population PK Dosing Decisions from the Posterior (Concept Note)]] — CONTAINS: PTA, expected-utility dosing, verified PTA table.
- [[Surplus-Production State-Space Models for Fisheries (Concept Note)]] — CONTAINS: Schaefer SSM, identifiability table, verified collapse simulation.
- [[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]] — CONTAINS: LD model and recursion (verified), telegraph Poisson-Beta (SSA-verified), identifiability.
- [[Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)]] — CONTAINS: weather-modified curve, economic-optimum theorem, simulation.

## Sources

No raw sources; see each note's `source` field for literature to verify. Related ingested material: [[Synthetic Likelihood - Overview]], [[Neural Simulation-Based Inference - Overview]], [[ODE Filters and Smoothers]].

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]], [[Chen 2018 - Neural ODEs - Overview]].
