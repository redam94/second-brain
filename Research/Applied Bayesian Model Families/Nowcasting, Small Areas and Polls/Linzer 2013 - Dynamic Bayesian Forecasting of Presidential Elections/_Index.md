---
title: "Index: Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Nowcasting, Small Areas and Polls]]"
date_updated: 2026-11-08
concept_count: 4
---

# Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections

> [!abstract] Routing Summary
> Full capture of Linzer (2013), JASA 108(501): 124-134, plus one concept note on extensions (E40, E94, E95). 5 notes.
> - Need the paper on a page and section map? -> [[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]
> - Need the binomial / logit / reverse random-walk model and priors? -> [[Linzer 2013 - Reverse Random-Walk Model and Priors]]
> - Need state win probability or Electoral College simulation? -> [[Linzer 2013 - Forecast Computation and Electoral College Simulation]]
> - Need the 2008 data, priors, MAD, calibration? -> [[Linzer 2013 - 2008 Application and Results]]
> - Need house effects, correlated states, election-night reweighting? -> [[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Reverse random walk | [[Linzer 2013 - Reverse Random-Walk Model and Priors]] | definition | [[Linear-Gaussian State-Space Models]] | polls to fundamentals as $j\to$ early |
| EC probability | [[Linzer 2013 - Forecast Computation and Electoral College Simulation]] | definition | posterior draws | $\Pr(EV\ge270)$ from joint draws |
| 2008 results | [[Linzer 2013 - 2008 Application and Results]] | example | model | MAD 1.4%, 338-387 EV |
| Importance reweighting | [[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]] | theorem | frozen draws | weights = interval likelihoods, ESS |

## Notes
- [[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]] — CONTAINS: summary, E40/E94/E95 links, Source Map.
- [[Linzer 2013 - Reverse Random-Walk Model and Priors]] — CONTAINS: Eqs 1-3, windowing, PyMC sketch.
- [[Linzer 2013 - Forecast Computation and Electoral College Simulation]] — CONTAINS: state and EC probabilities, swing states, Python.
- [[Linzer 2013 - 2008 Application and Results]] — CONTAINS: data, priors table, results, calibration, trends.
- [[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]] — CONTAINS: house effects, correlated states, learned prior, reweighting theorem, Python.

## Sources
- [[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]

## See Also
[[Hierarchical Models]] · [[Linear-Gaussian State-Space Models]]
