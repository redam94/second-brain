---
title: "Index: Concept Notes - Discrete Latents and Inference Frontier"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Advanced MCMC and Latent Discrete Models]]"
date_updated: 2026-11-08
concept_count: 8
---

# Concept Notes - Discrete Latents and Inference Frontier

> [!abstract] Routing Summary
> Three concept notes with no raw source, covering topics in the cluster that the four ingested sources do not teach directly: why NUTS cannot sample discrete parameters and how to marginalise them (E04), stochastic volatility and the inference frontier (E12), and Bayesian HMM practice: label switching, non-homogeneous HMMs, movement HMMs, dwell times (E24, E48, E59, E57). Every note cites the literature and reuses numbers from the ingested sources where available.
> - Need why discrete parameters break NUTS, compound steps or changepoint/mixture marginalisation? → [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]]
> - Need stochastic volatility, funnels in state-space models or Pareto $\hat k$ trust diagnostics? → [[Stochastic Volatility and the Inference Frontier]]
> - Need label switching, NHMM, dwell times or per-draw decoding? → [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Marginalisation of discrete latents | [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]] | theorem | — | $p(y|\theta)=\sum_zp(y,z|\theta)$ |
| Coal-mining changepoint | [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]] | example | marginalisation | $O(T)$ prefix/suffix sums |
| Stochastic volatility model | [[Stochastic Volatility and the Inference Frontier]] | definition | — | non-centred innovations $z_n$ |
| SV benchmarks across sources | [[Stochastic Volatility and the Inference Frontier]] | example | ChEES/MEADS tables | ChEES 2.8x NUTS ESS/gradient |
| Inference frontier options | [[Stochastic Volatility and the Inference Frontier]] | theorem | SV | reparameterise, adapt, many-chain, approximate, Pareto $\hat k$ |
| Bayesian HMM | [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]] | definition | forward algorithm | Dirichlet rows, marginalised path |
| Label switching | [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]] | theorem | Bayesian HMM | $K!$ modes; ordering |
| NHMM | [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]] | definition | HMM | softmax transitions with covariates |

## Notes

- [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]] — CONTAINS: Def. no gradient for discrete; compound steps; Thm. marginalisation; coal-mining changepoint with tested code; mixtures; HMM; infeasible cases; PyMC sketch.
- [[Stochastic Volatility and the Inference Frontier]] — CONTAINS: SV model; why hard; benchmark table from ChEES/MEADS; options along the frontier; simulation code; PyMC sketch.
- [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]] — CONTAINS: Bayesian HMM; EM vs Bayes; label switching; NHMM; movement HMM; dwell times; model checking; single-particle tracking; code.

## Sources
- No raw source: concept notes citing Jarrett (1979), Carlin, Gelfand and Smith (1992), Kim, Shephard and Chib (1998), Hughes and Guttorp (1994), Stephens (2000), Jasra et al. (2005), Langrock and Zucchini (2011), Zucchini et al. (2016), Yao et al. (2018), and the Stan User's Guide (HTML only). Quantitative numbers are taken from the ingested sources in this cluster.

## See Also
- [[Rabiner 1989 - HMM Tutorial - Overview]], [[Hoffman 2021 - ChEES-HMC - Overview]], [[Hoffman 2022 - MEADS - Overview]], [[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Monsters and Mixtures]], [[Efficient MCMC]].
