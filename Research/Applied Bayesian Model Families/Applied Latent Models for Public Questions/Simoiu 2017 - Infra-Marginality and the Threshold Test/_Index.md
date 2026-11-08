---
title: "Index: Simoiu 2017 - Infra-Marginality and the Threshold Test"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 6
---

# Simoiu 2017 - Infra-Marginality and the Threshold Test

> [!abstract] Routing Summary
> This folder captures Simoiu, Corbett-Davies and Goel (2017), *The problem of infra-marginality in outcome tests for discrimination* (Ann. Appl. Stat.; arXiv:1607.05376v5). 6 notes.
> - Whole paper map and key result? -> [[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
> - Need benchmark vs outcome test, infra-marginality and Figure 1? -> [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]]
> - Need the generative model, priors, Eq. 3 likelihood and parameter counting? -> [[Simoiu 2017 - Threshold Test Generative Model]]
> - Need North Carolina data, Tables 1-2, Raleigh? -> [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]]
> - Need posterior predictive, heterogeneity, placebo tests? -> [[Simoiu 2017 - Model Checks Robustness and Placebo Tests]]
> - Need limitations, extensions, identification ridge (E110)? -> [[Simoiu 2017 - Limitations Extensions and Identification Ridge]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Threshold model of search | [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] | definition | - | search iff signal above threshold |
| Infra-marginality | [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] | theorem | threshold model | same search/hit rates, opposite thresholds |
| Generative model and priors | [[Simoiu 2017 - Threshold Test Generative Model]] | definition | threshold model | beta signal, additive logit/log structure |
| Sufficient-statistic likelihood | [[Simoiu 2017 - Threshold Test Generative Model]] | theorem | generative model | binomial with $q=\phi(1-I(\mu,\lambda+1))/(1-I(\phi,\lambda))$ |
| NC results | [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] | example | likelihood | thresholds W 15%, B 7%, H 6%, A 13% |
| Robustness and placebo | [[Simoiu 2017 - Model Checks Robustness and Placebo Tests]] | concept | NC results | gap stable to heterogeneity and subsets |
| Identification ridge | [[Simoiu 2017 - Limitations Extensions and Identification Ridge]] | theorem | counting | levels weak, gaps strong (E110) |

## Notes

- [[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]] — CONTAINS: question, method, key results, Source Map, E110 link.
- [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] — CONTAINS: benchmark and outcome tests, related work, Figure 1 reproduced.
- [[Simoiu 2017 - Threshold Test Generative Model]] — CONTAINS: model, priors, Eq. 3 with proof, parameter counting, PyMC sketch.
- [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] — CONTAINS: data, Tables 1-2, Raleigh example.
- [[Simoiu 2017 - Model Checks Robustness and Placebo Tests]] — CONTAINS: posterior predictive, heterogeneity, omitted variables, search type, placebo.
- [[Simoiu 2017 - Limitations Extensions and Identification Ridge]] — CONTAINS: limitations, extensions, identification ridge.

## Sources
- [[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]] - Simoiu C, Corbett-Davies S, Goel S (2017), arXiv:1607.05376v5, 21 pages.

## See Also
- [[Hierarchical Models]], [[Posterior Predictive Checking]], [[Type S and Type M Errors]]
- [[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model/_Index|Wiecki 2013]] - another latent-threshold model
