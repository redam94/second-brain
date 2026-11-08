---
title: "Index: Betancourt Girolami 2015 - HMC for Hierarchical Models"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Advanced MCMC and Latent Discrete Models]]"
date_updated: 2026-11-08
concept_count: 9
---

# Betancourt Girolami 2015 - HMC for Hierarchical Models

> [!abstract] Routing Summary
> This folder fully captures Betancourt & Girolami (2015), *Hamiltonian Monte Carlo for Hierarchical Models* (arXiv:1312.0906): hierarchical geometry and the funnel, failure of Gibbs/Metropolis, reparameterisation, the two weaknesses of Euclidean HMC, Riemannian HMC with SoftAbs, the 800-group one-way normal benchmark (Table I) and all Stan models. 6 notes. Motivating PyMC examples: E12, E86.
> - Need the paper on one page or the section map? → [[Betancourt 2015 - HMC for Hierarchical Models - Overview]]
> - Need the funnel distribution, hierarchical model definition or position-dependent curvature? → [[Betancourt 2015 - Hierarchical Geometry and the Funnel]]
> - Need why Gibbs/RWM fail, parameter expansion or non-centred parameterisation? → [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]
> - Need the step-size stability condition, the $d/2$ density-variation limit or the adaptation hazard? → [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]
> - Need Riemannian HMC, the log-determinant reservoir or SoftAbs? → [[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]]
> - Need Table I, the speed-up ratios or the Stan models? → [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| One-level hierarchy | [[Betancourt 2015 - Hierarchical Geometry and the Funnel]] | definition | — | funnel when data are sparse |
| Funnel distribution | [[Betancourt 2015 - Hierarchical Geometry and the Funnel]] | definition | hierarchy | $v\sim\mathcal N(0,3^2)$, curvature varies |
| Why Gibbs/RWM fail | [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]] | theorem | funnel | conditional variance $\ll$ marginal variance |
| Non-centred parameterisation | [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]] | definition | — | $\theta=\mu+\tau\vartheta$, $\vartheta\sim\mathcal N(0,1)$ |
| Step-size stability | [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]] | theorem | leapfrog | $\epsilon\sqrt{\lambda_i}<2$ |
| Density variation limit | [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]] | theorem | $H$ conserved | $\Delta V=\Delta T\sim d/2$ |
| Riemannian HMC | [[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]] | definition | [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]] | log-det term allows large $\Delta V$ |
| SoftAbs metric | [[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]] | definition | Hessian | positive-definite Hessian |
| Table I | [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]] | example | all | EHMC 75x/18x (CP) and 49x/66x (NCP) vs Metropolis/Gibbs |

## Notes

- [[Betancourt 2015 - HMC for Hierarchical Models - Overview]] — CONTAINS: research question, contributions, Source Map, PyMC examples, marketing relevance.
- [[Betancourt 2015 - Hierarchical Geometry and the Funnel]] — CONTAINS: Def. one-level hierarchy, one-way normal, funnel; position-dependent correlation; numpy funnel; PyMC CP/NCP sketch.
- [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]] — CONTAINS: Thm. naive failure; Figure 3 statistics; parameter expansion; non-centring; data-strength example.
- [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]] — CONTAINS: Euclidean HMC; step-size stability; adaptation hazard and rule; density-variation limit; energy calculation.
- [[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]] — CONTAINS: RHMC definition; log-determinant reservoir; SoftAbs; Figure 11; positivity check.
- [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]] — CONTAINS: Benchmark setup, Table I and computed ratios, Stan models, conclusion, references, PyMC sketch.

## Sources
- Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models — Betancourt M, Girolami M (2015), arXiv:1312.0906v1, 11 pages.

## See Also
- [[Hierarchical Models]], [[Hierarchical Linear Models]], [[Efficient MCMC]], [[HMC and Stan in Practice]], [[The Typical Set and the Log Posterior Density]].
- [[Stochastic Volatility and the Inference Frontier]] — funnel geometry in a state-space model.
