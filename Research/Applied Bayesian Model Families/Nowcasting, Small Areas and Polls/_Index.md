---
title: "Index: Nowcasting, Small Areas and Polls"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 27
---

# Nowcasting, Small Areas and Polls

> [!abstract] Routing Summary
> This cluster covers real-time and small-sample estimation: reporting-delay nowcasts, Rt from the renewal equation, Fay-Herriot small-area estimation, dynamic poll aggregation and election-night updating, mixed-frequency and multi-sensor state-space fusion. It has 5 sub-folders and 27 notes, written to cover the methods used in the PyMC worked examples E38, E40, E90, E94-E99, E112 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Banbura et al 2013: [[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]
> - Gostic 2020: [[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]]
> - Linzer 2013: [[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]
> - McGough 2020: [[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]
> - Molina Marhuenda 2015: [[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]
^routing-summary

## Sub-topics

- [[Banbura et al 2013 - Now-casting and the Real-Time Data Flow/_Index|Banbura et al 2013 - Now-casting and the Real-Time Data Flow]] (6 notes) — COVERS: Bańbura, Giannone, Modugno & Reichlin (2013, ECB Working Paper 1564; Handbook of Economic Forecasting vol. 2) review now-casting: estimating the present value of a slowly published, low-frequency target (such as GDP) from a ragged, mixed-frequency stream of releases. Their preferred framework is a joint state-space (dynamic factor) model fitted at high frequency, in which mixed frequency and…
- [[Gostic 2020 - Practical Considerations for Measuring Rt/_Index|Gostic 2020 - Practical Considerations for Measuring Rt]] (5 notes) — COVERS: Gostic et al. (2020, *PLoS Comput Biol* 16(12): e1008409) is a methods Perspective on estimating the effective reproductive number $R_t$ from surveillance data. Using synthetic SEIR data it recommends the Cori et al. (2013) instantaneous-$R_t$ estimator for real-time use and shows that the dominant errors come from the generation-interval specification, delays between infection and observation,…
- [[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections/_Index|Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections]] (5 notes) — COVERS: Linzer (2013, *JASA* 108(501): 124-134) unifies structural (fundamentals) election forecasts with state-level trial-heat polls in one dynamic Bayesian model. A historical forecast gives an informative prior for the Election-Day logit vote share in each state; a "reverse" random walk anchored on Election Day carries that prior back through the campaign, so each state's daily opinion is a…
- [[McGough 2020 - Nowcasting by Bayesian Smoothing/_Index|McGough 2020 - Nowcasting by Bayesian Smoothing]] (6 notes) — COVERS: McGough, Johansson, Lipsitch & Menzies (2020, *PLoS Comput Biol* 16(4): e1007735) propose **NobBS**, a Bayesian log-linear chain-ladder nowcast whose weekly "true signal" follows a first-order (geometric) random walk and whose delay distribution has a Dirichlet prior. Linking cases across weeks makes nowcasts smoother and more robust than a pure delay-hazard model when the reporting delay drifts…
- [[Molina Marhuenda 2015 - sae Small Area Estimation/_Index|Molina Marhuenda 2015 - sae Small Area Estimation]] (5 notes) — COVERS: Molina & Marhuenda (2015, *The R Journal* 7(1): 81-98) describe the `sae` package and, with it, the standard frequentist toolkit for small area estimation (SAE): the Fay-Herriot (FH) area-level model, its spatial and spatio-temporal extensions, the Battese-Harter-Fuller (BHF) unit-level model, and empirical-best estimators for nonlinear targets such as poverty rates. The shared idea is shrinking…

## Motivating PyMC examples

E38, E40, E90, E94-E99, E112 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]
- [[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]
- [[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]
- [[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]
- [[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
