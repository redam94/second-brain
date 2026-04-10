---
title: "Index: Factor Analysis"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/Advanced Models/_Index|Advanced Models]]"
date_updated: 2026-04-09
concept_count: 4
---

# Factor Analysis

> [!abstract] Routing Summary
> This folder covers probabilistic factor analysis and PPCA as implemented in PyMC. Contains 5 notes spanning the model formulation, identifiability constraints, amortized inference, post-hoc factor recovery, and a complete tutorial.
> - Need the model definition (FA vs. PPCA)? --> [[Factor Analysis Model]]
> - Need to fix non-identifiability / convergence issues? --> [[Identifiability in Factor Models]]
> - Need scalable inference (large $n$)? --> [[Amortized Inference for Factor Analysis]]
> - Need to recover factor scores after amortized fitting? --> [[Post-hoc Factor Score Recovery]]
> - Need the full PyMC code walkthrough? --> [[PyMC Factor Analysis Tutorial]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| FA/PPCA model | [[Factor Analysis Model]] | concept | [[Multiparameter Models]], [[Bayesian Linear Regression]] | $X \mid W, F \sim \mathcal{N}(WF, \Psi)$ |
| Non-identifiability | [[Identifiability in Factor Models]] | concept | [[Factor Analysis Model]] | Constrain $W$ lower-triangular with positive increasing diagonal |
| Marginalizing $F$ | [[Amortized Inference for Factor Analysis]] | concept | [[Identifiability in Factor Models]] | $X \mid W \sim \mathcal{N}(0, WW^\top + \sigma^2 I)$ |
| Recovering $F$ | [[Post-hoc Factor Score Recovery]] | concept | [[Amortized Inference for Factor Analysis]] | $F \mid X, W \sim \mathcal{N}(\mu_F, \Sigma_F)$ closed-form |
| Full tutorial | [[PyMC Factor Analysis Tutorial]] | example | All above | Complete PyMC implementation with 3 model variants |

## Notes

- [[Factor Analysis Model]] -- CONTAINS: FA model definition, PPCA definition, relationship table (PCA vs PPCA vs FA), naive PyMC implementation
- [[Identifiability in Factor Models]] -- CONTAINS: non-identifiability definition, triangular constraint theorem, `expand_packed_block_triangular` and `makeW` implementations, diagnostic symptoms
- [[Amortized Inference for Factor Analysis]] -- CONTAINS: marginal likelihood derivation, amortized PyMC model, minibatch ADVI code, scalability comparison table
- [[Post-hoc Factor Score Recovery]] -- CONTAINS: conjugate posterior theorem for $F \mid X, W$, xarray-einstats implementation, reconstruction quality assessment
- [[PyMC Factor Analysis Tutorial]] -- CONTAINS: complete end-to-end tutorial with simulated data, three model variants, posterior comparison, reconstruction plots

## Sources
- [[raw/Factor analysis]] -- PyMC tutorial: factor analysis and PPCA with identifiability fixes

## See Also
- [[Confirmatory Factor Analysis and SEM]] -- CFA and structural equation models for psychometrics
- [[Nonparametric Models Overview]] -- Gaussian processes as infinite-dimensional factor models
- [[Approximation Methods]] -- ADVI and variational inference methods used here
