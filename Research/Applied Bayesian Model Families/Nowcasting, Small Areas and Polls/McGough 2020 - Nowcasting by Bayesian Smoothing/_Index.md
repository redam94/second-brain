---
title: "Index: McGough 2020 - Nowcasting by Bayesian Smoothing"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Nowcasting, Small Areas and Polls]]"
date_updated: 2026-11-08
concept_count: 6
---

# McGough 2020 - Nowcasting by Bayesian Smoothing

> [!abstract] Routing Summary
> Full capture of McGough, Johansson, Lipsitch & Menzies (2020), PLoS Comput Biol 16(4): e1007735 (NobBS). 5 notes.
> - Need the one-page paper summary and section map? -> [[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]
> - Need reporting triangles, right truncation, chain ladder? -> [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]]
> - Need the NobBS likelihood, random walk, Dirichlet and other priors? -> [[McGough 2020 - NobBS Model and Priors]]
> - Need Tables 1-3, the log score, NobBS vs HH? -> [[McGough 2020 - Evaluation Design and Results]]
> - Need the hazard parameterisation, renewal equation or decision rule (E38/E90)? -> [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]]
> - Need time-varying delays, moving windows, limitations? -> [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Reporting triangle, right truncation | [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] | definition | [[Survival Analysis]] | $N_t=\sum_d n_{t,d}$ |
| NobBS model | [[McGough 2020 - NobBS Model and Priors]] | definition | chain ladder | $\lambda_{t,d}=e^{\alpha_t}\beta_d$, RW on $\alpha$ |
| Log score evaluation | [[McGough 2020 - Evaluation Design and Results]] | example | [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] | dengue rRMSE 0.464 vs 1.24 |
| Window trade-off | [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]] | concept | NobBS model | $W=5$ rRMSE 7.38; $W\ge12$ about 0.6 |

## Notes
- [[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]] — CONTAINS: question, contribution, key result, Source Map, PyMC example link.
- [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] — CONTAINS: triangle, truncation, chain ladder, data, worked triangle, PyMC sketch.
- [[McGough 2020 - NobBS Model and Priors]] — CONTAINS: observation model, priors, nowcast quantity, package defaults, Python simulation.
- [[McGough 2020 - Evaluation Design and Results]] — CONTAINS: metrics, binned log score, Tables 1-3.
- [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]] — CONTAINS: concept note (no raw source) on discrete delay hazards, spurious wave end, renewal equation as triangular solve, decision call (E38, E90).
- [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]] — CONTAINS: delay-0 share, simulated ILI, window study, discussion.

## Sources
- [[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]

## See Also
[[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]] · [[Linear-Gaussian State-Space Models]]
