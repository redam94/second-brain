---
title: "Index: Friedman 2000 - Being Bayesian about Network Structure"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 4
---

# Friedman 2000 - Being Bayesian about Network Structure

> [!abstract] Routing Summary
> Full capture of Friedman and Koller (UAI 2000; arXiv:1301.3856), *Being Bayesian about Network Structure*: feature posteriors for Bayesian network structure via closed-form sums for a fixed ordering and MCMC over orderings. (Journal version: Machine Learning 2003; conference version used here.)
> - Need the paper on one page, PyMC example E20, section map? -> [[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
> - Need priors, modularity, Theorem 2.1, why averaging is hard? -> [[Friedman 2000 - Bayesian Structure Learning Framework]]
> - Need eq. 6, edge and Markov-blanket posteriors? -> [[Friedman 2000 - Closed Form for a Known Ordering]]
> - Need order-MCMC and tricks? -> [[Friedman 2000 - MCMC over Orderings and Computational Tricks]]
> - Need experiments (Flare, Vote, Alarm, bootstrap)? -> [[Friedman 2000 - Experiments Mixing and Feature Recovery]]
> - Need BGe, Sachs interventions, Gaussian graphical models? -> [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Feature posterior, modularity | [[Friedman 2000 - Bayesian Structure Learning Framework]] | definition | none | $P(D\mid G)=\prod\text{score}$ |
| Sum over DAGs given ordering | [[Friedman 2000 - Closed Form for a Known Ordering]] | theorem | framework | cost $n^{k+1}$ |
| Order-MCMC | [[Friedman 2000 - MCMC over Orderings and Computational Tricks]] | theorem | closed form | flip and cut proposals |
| Experiments | [[Friedman 2000 - Experiments Mixing and Feature Recovery]] | example | order-MCMC | faster mixing than structure-MCMC |

## Notes

- [[Friedman 2000 - Being Bayesian about Network Structure - Overview]] — CONTAINS: question, contributions, E20 link, Source Map.
- [[Friedman 2000 - Bayesian Structure Learning Framework]] — CONTAINS: eq. 1-4, priors, Thm 2.1, why averaging is hard.
- [[Friedman 2000 - Closed Form for a Known Ordering]] — CONTAINS: eq. 5-8, Prop. 3.1-3.2, verification code.
- [[Friedman 2000 - MCMC over Orderings and Computational Tricks]] — CONTAINS: order-MCMC, four tricks, code skeleton.
- [[Friedman 2000 - Experiments Mixing and Feature Recovery]] — CONTAINS: Flare/Vote/Alarm results, Figs. 1-7, discussion.

## Sources
[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]] (arXiv:1301.3856).

## See Also
[[Causal Discovery - Overview]] | [[GES and Score-Based Discovery]] | [[PC Algorithm and Constraint-Based Discovery]]
