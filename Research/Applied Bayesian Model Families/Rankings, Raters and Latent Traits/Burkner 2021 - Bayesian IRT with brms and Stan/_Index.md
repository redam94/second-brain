---
title: "Index: Bürkner 2021 - Bayesian IRT with brms and Stan"
tags:
  - type/index
  - source/ingested
  - topic/latent-traits
parent: "[[../_Index|Rankings, Raters and Latent Traits]]"
date_updated: 2026-11-08
concept_count: 8
---

# Bürkner 2021 - Bayesian IRT with brms and Stan

> [!abstract] Routing Summary
> Full capture of Bürkner (JSS 2021): IRT models (Rasch/1PL, 2PL, 3PL, GRM, PCM, response-time and diffusion models) as multilevel distributional regressions in brms/Stan, with hierarchical priors, identification, covariates, DIF and LOO comparison. 8 notes.
> - Need paper summary and source map? -> [[Bürkner 2021 - Bayesian IRT with brms Overview]]
> - Need response families (Bernoulli, cumulative, adjacent-category, Wiener...)? -> [[Bürkner 2021 - Response Families and Distributional IRT]]
> - Need 1PL/2PL/3PL definitions and identification? -> [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]
> - Need covariates and DIF? -> [[Bürkner 2021 - Covariates and Differential Item Functioning]]
> - Need priors, partial pooling, identification? -> [[Bürkner 2021 - Priors Hierarchical Pooling and Identification]]
> - Need brms syntax, Stan code, post-processing? -> [[Bürkner 2021 - brms Specification Stan Code and Post-Processing]]
> - Need VerbAgg results? -> [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]
> - Need ordinal, response-time, package comparison? -> [[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Response families | [[Bürkner 2021 - Response Families and Distributional IRT]] | definition | Overview | each family gives an IRT model |
| Rasch, 2PL, 3PL | [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]] | definition | families | 2PL scale non-identifiable |
| Explanatory IRT, DIF | [[Bürkner 2021 - Covariates and Differential Item Functioning]] | definition | 1PL | DIF = person x item interaction |
| IRT priors, identification | [[Bürkner 2021 - Priors Hierarchical Pooling and Identification]] | theorem | 2PL | fix $\sigma_\theta=1$ |
| brms workflow | [[Bürkner 2021 - brms Specification Stan Code and Post-Processing]] | concept | priors | non-centered Stan code |
| VerbAgg | [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]] | example | all above | 2PL adds nothing; DIF b=-0.94 |
| Ordinal and RT | [[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]] | example | VerbAgg | PCM category-specific effects |

## Notes

- [[Bürkner 2021 - Bayesian IRT with brms Overview]] — CONTAINS: summary, source map, E116 link.
- [[Bürkner 2021 - Response Families and Distributional IRT]] — CONTAINS: Sec. 2.1 table.
- [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]] — CONTAINS: Rasch, 2PL, 3PL, identification theorem, Python, PyMC.
- [[Bürkner 2021 - Covariates and Differential Item Functioning]] — CONTAINS: Sec. 2.3-2.4.
- [[Bürkner 2021 - Priors Hierarchical Pooling and Identification]] — CONTAINS: Sec. 2.5-2.6.
- [[Bürkner 2021 - brms Specification Stan Code and Post-Processing]] — CONTAINS: Sec. 3-4.
- [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]] — CONTAINS: Sec. 5.1 tables.
- [[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]] — CONTAINS: Sec. 5.2-5.3, 6, 7.

## Sources

[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]

## See Also

[[Confirmatory Factor Analysis and SEM]] · [[Hierarchical Models]]
