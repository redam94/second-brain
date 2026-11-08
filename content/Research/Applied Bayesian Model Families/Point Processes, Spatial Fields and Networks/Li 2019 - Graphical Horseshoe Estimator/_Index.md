---
title: "Index: Li 2019 - Graphical Horseshoe Estimator"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 4
---

# Li 2019 - Graphical Horseshoe Estimator

> [!abstract] Routing Summary
> Full capture of Li, Craig and Bhadra (2019), *The Graphical Horseshoe Estimator for Inverse Covariance Matrices* (arXiv:1707.06661; J. Multivariate Analysis): prior, Gibbs sampler, KL-risk and bias theorems, simulations, gene network.
> - Need the paper on one page, PyMC example E19, section map? -> [[Li 2019 - Graphical Horseshoe Estimator - Overview]]
> - Need the prior, conditionals, Algorithm 1, working code? -> [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]]
> - Need Thm 3.2 (KL risk) or Thm 4.1 (bias)? -> [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]]
> - Need simulation tables and the CEU gene network? -> [[Li 2019 - Simulation Study and Gene Expression Application]]
> - Need G-Wishart, neighbourhood selection, graph posterior? -> [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| GHS prior and sampler | [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]] | definition | none | closed-form column conditionals preserve PD |
| KL risk and bias | [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]] | theorem | prior | $E(Z)=O(1/\hat\omega^2)$ |
| Simulations, gene data | [[Li 2019 - Simulation Study and Gene Expression Application]] | example | theory | best Stein loss in 11/12 settings |
| G-Wishart etc. | [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]] | concept | GHS | graph-constrained precision priors |

## Notes

- [[Li 2019 - Graphical Horseshoe Estimator - Overview]] — CONTAINS: question, contributions, E19 link, Source Map.
- [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]] — CONTAINS: GL/BGL/GSCAD, GHS prior, conditionals, PD proof, Python sampler.
- [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]] — CONTAINS: Lemma 3.1, Thm 3.2, Thm 4.1 with interpretation.
- [[Li 2019 - Simulation Study and Gene Expression Application]] — CONTAINS: design, Tables 1 and 3 excerpts, CEU results.
- [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]] — CONTAINS: concept note, no raw source.

## Sources
Li 2019 - The Graphical Horseshoe Estimator (arXiv:1707.06661v3).

## See Also
[[Joint Priors and Covariance Matrices]] | [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
