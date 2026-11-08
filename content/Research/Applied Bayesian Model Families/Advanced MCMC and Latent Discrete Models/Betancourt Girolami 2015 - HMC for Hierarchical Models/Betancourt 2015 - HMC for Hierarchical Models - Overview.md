---
title: "Betancourt 2015 - HMC for Hierarchical Models - Overview"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/overview
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Whole paper, pp. 1-11 (arXiv 1312.0906v1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Efficient MCMC]]"
used_by:
  - "[[Betancourt 2015 - Hierarchical Geometry and the Funnel]]"
  - "[[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]"
  - "[[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]"
  - "[[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]]"
  - "[[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]"
aliases:
  - "Betancourt Girolami 2015"
  - "HMC for hierarchical models overview"
---

# Betancourt 2015 - HMC for Hierarchical Models - Overview

> [!summary]
> Betancourt & Girolami (2015, arXiv:1312.0906), *Hamiltonian Monte Carlo for Hierarchical Models*, explain why hierarchical posteriors have funnel geometry whose curvature varies with position, why random-walk Metropolis and Gibbs degrade into random walks on them, and how Euclidean HMC (with non-centred parameterisations and carefully relaxed adaptation) or Riemannian HMC with the SoftAbs metric restores efficient exploration. Takeaway: the funnel is a geometry problem, so fix it with parameterisation or a position-dependent metric, not just a better trajectory length.

## Overview

**Research question.** Why are hierarchical models hard for generic MCMC, and what makes HMC (as in Stan) the practical solution?

**Contributions.**
1. A geometric account of hierarchical pathologies: high-density/low-volume region below low-density/high-volume region ([[Betancourt 2015 - Hierarchical Geometry and the Funnel]]).
2. Why Metropolis and Gibbs fail, and what parameter expansion and non-centred parameterisation buy ([[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]).
3. Two weaknesses of Euclidean HMC on hierarchies (a characteristic step-size scale; limited density variation within a trajectory), plus a warning that adaptation can bias inference ([[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]).
4. Riemannian HMC with the SoftAbs metric as a general cure ([[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]]).
5. A 800-group one-way normal benchmark: EHMC is at least an order of magnitude more efficient than Metropolis and Gibbs in both parameterisations ([[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]).

**Key result.** On the non-centred one-way normal, EHMC's time per effective sample is $2.94\times10^{-2}$ s vs 1.44 s (Metropolis) and 1.95 s (Gibbs); on the centred form 16.2 s vs 1220 s and 297 s.

## Source Map

| Paper section | Content | Note |
|---|---|---|
| Abstract, introduction | partial pooling, pathologies | [[Betancourt 2015 - Hierarchical Geometry and the Funnel]] |
| I Hierarchical models (eqs 1-2, Figs 1-2) | one-level hierarchy, funnel | [[Betancourt 2015 - Hierarchical Geometry and the Funnel]] |
| II.A Naive implementations (Fig. 3) | RWM, Gibbs | [[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]] |
| II.B Efficient implementations (Fig. 4) | parameter expansion, non-centred parameterisation | same |
| III HMC for hierarchical models, III.A Euclidean HMC | Hamiltonian, kinetic/potential energy | [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]] |
| III.A.1 Characteristic length scale (Fig. 5) | stability, adaptation bias | same |
| III.A.2 Limited density variations (Figs 6-8) | $\Delta V=\Delta T\sim d/2$ | same |
| III.B Riemannian HMC (Figs 10-11) | metric, log-determinant, SoftAbs | [[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]] |
| IV Example (Fig. 12, Table I) | 800-node one-way normal | [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]] |
| V Conclusion | Stan | [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]] |
| Appendix A Stan models | funnel, data generation, CP/NCP | same |
| References [1]-[22] | | [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]] |

## Motivating PyMC examples

From [the examples page](https://redam94.github.io/pymc-challenges/examples.html): **E12** "The inference frontier: when plain NUTS is not enough" (latent stochastic volatility, reference posterior, low-rank and normalizing-flow adapted NUTS, Laplace/ADVI/Pathfinder) is a direct instance of the funnel/curvature problem; **E86** large latent-field models (log-Gaussian Cox process with Kronecker HSGP basis) rely on non-centred/whitened parameterisations. See also [[Stochastic Volatility and the Inference Frontier]].

## Connections

Existing vault: [[Hierarchical Models]], [[Hierarchical Linear Models]], [[Efficient MCMC]], [[HMC and Stan in Practice]], [[The Typical Set and the Log Posterior Density]]. Sibling sources: [[Hoffman 2021 - ChEES-HMC - Overview]] and [[Hoffman 2022 - MEADS - Overview]] (tuning, not geometry).

## Relevance to marketing measurement

Hierarchical MMM (brand/region/channel effects with partial pooling) and hierarchical geo-lift models are one-level or multi-level hierarchies of exactly this kind. With sparse data per group the posterior is funnel-shaped; divergences in Stan/PyMC are the signature. The paper's practical advice (non-centre when data are weak, centre when data are strong, check that inference is stable as target acceptance rises, run an auxiliary chain at smaller step size) maps directly onto diagnosing MMM sampling problems.

## See Also
[[Hierarchical Models]], [[Efficient MCMC]], [[HMC and Stan in Practice]], [[Hoffman 2021 - ChEES-HMC - Overview]]
