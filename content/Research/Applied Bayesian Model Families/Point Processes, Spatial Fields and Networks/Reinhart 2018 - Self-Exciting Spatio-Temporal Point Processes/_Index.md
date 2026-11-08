---
title: "Index: Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 6
---

# Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes

> [!abstract] Routing Summary
> Full capture of Reinhart (2018), *A Review of Self-Exciting Spatio-Temporal Point Processes and Their Applications* (Stat. Sci., arXiv:1708.02647): Hawkes/ETAS conditional intensity, likelihood and EM, declustering, simulation, inference, diagnostics, and applications.
> - Need the paper on one page or the section map? -> [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
> - Need definitions of conditional intensity, Hawkes, branching ratio, marks? -> [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]
> - Need the likelihood, compensator, EM algorithm, Bayesian sampling? -> [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]]
> - Need ZOV declustering, FLP, MISD? -> [[Reinhart 2018 - Stochastic Declustering]]
> - Need simulation, bootstrap, residual diagnostics? -> [[Reinhart 2018 - Simulation, Inference and Diagnostics]]
> - Need ETAS / Omori-Utsu / Gutenberg-Richter and a PyMC sketch (E65)? -> [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]
> - Need crime, epidemic, network applications and the caveat? -> [[Reinhart 2018 - Crime, Epidemic and Network Applications]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Conditional intensity, Hawkes, cluster representation | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] | definition | none | $m=\int g<1$ gives cluster size $1/(1-m)$ |
| Likelihood, EM, Bayesian | [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] | theorem | Hawkes | $\ell=\sum\log\lambda-\iint\lambda$; $\Pr(u_i=j)=g_{ij}/\lambda_i$ |
| Declustering | [[Reinhart 2018 - Stochastic Declustering]] | theorem | EM | $\hat\mu=\frac1T\sum\Pr(u_i=0)k(s-s_i)$ |
| Simulation, inference, diagnostics | [[Reinhart 2018 - Simulation, Inference and Diagnostics]] | theorem | declustering | cluster simulation; bootstrap; Voronoi residuals |
| ETAS / Omori | [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]] | example | Hawkes, EM | $m=\frac{K_0c^{1-p}}{p-1}\frac{\beta}{\beta-\alpha}$ |
| Crime, epidemic, networks | [[Reinhart 2018 - Crime, Epidemic and Network Applications]] | example | ETAS | background/triggered split needs care |

## Notes

- [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]] — CONTAINS: question, contributions, motivating PyMC examples (E65, E07), Source Map.
- [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] — CONTAINS: conditional intensity, Hawkes, cluster theorem, marks, Figs. 1-2, Python simulation.
- [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] — CONTAINS: Janossy derivation, compensator approximations, EM, boundary bias, Ross partition, O(n) recursion code, PyMC sketch.
- [[Reinhart 2018 - Stochastic Declustering]] — CONTAINS: ZOV Alg. 1-2, FLP Alg. 3, MISD, Python.
- [[Reinhart 2018 - Simulation, Inference and Diagnostics]] — CONTAINS: Alg. 4-6, asymptotics, partial likelihood, thinning/super-thinning, Voronoi residuals.
- [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]] — CONTAINS: temporal ETAS, branching ratio derivation, findings, E65 PyMC sketch.
- [[Reinhart 2018 - Crime, Epidemic and Network Applications]] — CONTAINS: Mohler, Meyer, Schoenberg, Fox, Zipkin, Green models; conclusion.

## Sources
Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review (arXiv:1708.02647v2).

## See Also
[[Simpson 2016 - Going Off Grid - Overview]] | [[Social Network Models]] | [[Survival Analysis]]
