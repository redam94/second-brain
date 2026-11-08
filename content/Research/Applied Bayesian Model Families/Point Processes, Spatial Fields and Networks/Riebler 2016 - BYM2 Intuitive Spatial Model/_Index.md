---
title: "Index: Riebler 2016 - BYM2 Intuitive Spatial Model"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 5
---

# Riebler 2016 - BYM2 Intuitive Spatial Model

> [!abstract] Routing Summary
> Full capture of Riebler, Sorbye, Simpson and Rue (2016), *An intuitive Bayesian spatial model for disease mapping that accounts for scaling* (SMMR; arXiv:1601.01180): the BYM2 parameterisation, graph-dependent scaling, PC priors for $(\tau_b,\phi)$, simulation and Sardinia IDDM application.
> - Need the paper on one page, PyMC example E18, section map? -> [[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
> - Need Besag, BYM, Leroux, Dean definitions? -> [[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]]
> - Need scaling factor, BYM2 definition, sparse form, PyMC sketch? -> [[Riebler 2016 - Scaling and the BYM2 Construction]]
> - Need PC priors and KLD derivation? -> [[Riebler 2016 - Penalised Complexity Priors for BYM2]]
> - Need Tables 1-3, simulation design, Sardinia results? -> [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Besag/BYM/Leroux/Dean | [[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]] | definition | none | Leroux cannot be scaled |
| Scaling, BYM2 | [[Riebler 2016 - Scaling and the BYM2 Construction]] | theorem | classical models | $\sigma^2_{GV}$ varies 0.29 to 4.78 across maps |
| PC priors | [[Riebler 2016 - Penalised Complexity Priors for BYM2]] | theorem | BYM2 | $\theta=-\ln\alpha/U$; type-2 Gumbel |
| Simulation, Sardinia | [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] | example | PC priors | shrinks to both base models |

## Notes

- [[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]] — CONTAINS: question, contributions, E18 link, Source Map.
- [[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]] — CONTAINS: Poisson setup, four latent models.
- [[Riebler 2016 - Scaling and the BYM2 Construction]] — CONTAINS: generalised variance, BYM2, sparse form, scaling code, PyMC sketch.
- [[Riebler 2016 - Penalised Complexity Priors for BYM2]] — CONTAINS: PC principles, $\tau_b$ and $\phi$ priors, KLD derivation, code.
- [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] — CONTAINS: Tables 1-3, discussion, INLA call.

## Sources
Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping

## See Also
[[Spatial Models - BYM]] | [[Simpson 2016 - Going Off Grid - Overview]]
