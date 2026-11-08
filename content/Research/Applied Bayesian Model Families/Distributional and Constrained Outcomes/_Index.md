---
title: "Index: Distributional and Constrained Outcomes"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 39
---

# Distributional and Constrained Outcomes

> [!abstract] Routing Summary
> This cluster covers outcomes that need more than a mean on the real line: GAMLSS/LMS centile curves, compositional data (log-ratios, Dirichlet, zeros), circular data, Bayesian quantile regression and its misleading intervals, extreme values and event attribution, usual-intake and flood-frequency models. It has 7 sub-folders and 39 notes, written to cover the methods used in the PyMC worked examples E37, E41, E70, E81, E83, E108, E113 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Greenacre 2023: [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
> - Ji 2024: [[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
> - Pewsey 2021: [[Pewsey 2021 - Directional Statistics - Overview]]
> - Philip 2020: [[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
> - Stasinopoulos 2007: [[Stasinopoulos 2007 - GAMLSS in R - Overview]]
> - Tsagris 2018: [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
^routing-summary

## Sub-topics

- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Concept Notes - Usual Intake and Flood Frequency/_Index|Concept Notes - Usual Intake and Flood Frequency]] (2 notes) — COVERS: Concept notes: [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]], [[Concept Notes - Usual Intake from Repeated Short-Term Measurements]]
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On/_Index|Greenacre 2023 - Aitchison Compositional Data Analysis 40 Years On]] (6 notes) — COVERS: Greenacre, Grunsky, Bacon-Shone, Erb and Quinn (2023) review Aitchison's logratio approach to compositional data (data on the simplex, sum-to-one) 40 years after his 1982 read paper. Their thesis: exact *subcompositional coherence* and exact *isometry* are not needed; simple pairwise/additive logratios (ALR) or even Box-Cox power transforms are "quasi-coherent" and "quasi-isometric" enough, and…
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression/_Index|Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression]] (6 notes) — COVERS: Bayesian quantile regression almost always uses the asymmetric Laplace (AL) distribution as a *working* likelihood because its maximiser equals the Koenker-Bassett estimator. Point estimates are consistent, but posterior standard deviations (as in brms and Stata `bayes:qreg`) are wrong: they scale with an arbitrary AL scale parameter and give poor frequentist coverage. Ji, Lee and Rabe-Hesketh…
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics/_Index|Pewsey 2021 - Recent Advances in Directional Statistics]] (6 notes) — COVERS: Pewsey and García-Portugués (2021, TEST) review developments in directional statistics since Mardia and Jupp (1999): data on circles (angles, times of day), spheres, tori and cylinders. Standard linear methods can be "thoroughly misleading" because supports are compact manifolds. The paper surveys distributions, inference, testing, regression, smoothing, dimension reduction, clustering, time…
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution/_Index|Philip 2020 - Protocol for Probabilistic Extreme Event Attribution]] (7 notes) — COVERS: Philip et al. (2020) document the eight-step World Weather Attribution (WWA) protocol: analysis trigger, event definition, observed probability and trend, model evaluation, multi-method multi-model attribution, hazard synthesis, vulnerability/exposure, communication. The statistical core is extreme-value distributions (GEV, GPD, Gumbel, Gaussian, gamma) whose location/scale shifts with smoothed…
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R/_Index|Stasinopoulos 2007 - GAMLSS in R]] (7 notes) — COVERS: Stasinopoulos and Rigby (2007) define **GAMLSS** (generalized additive models for location, scale and shape): regression where *every* parameter of a flexible response distribution (mean $\mu$, scale $\sigma$, skewness $\nu$, kurtosis $\tau$) gets its own additive predictor. The paper documents the `gamlss` R package and works four examples, ending with BMI/head-circumference centile curves from…
- [[Research/Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros/_Index|Tsagris 2018 - Dirichlet Regression with Zeros]] (5 notes) — COVERS: Tsagris and Stewart modify the Dirichlet regression log-likelihood so compositions containing exact zeros can be modelled *without imputing them*: each zero pattern is a "population" whose non-zero components follow a Dirichlet with the same coefficients and precision. The resulting ZADR model competes with Aitchison's imputed log-ratio regression and the Kent/square-root model, and wins when…

## Motivating PyMC examples

E37, E41, E70, E81, E83, E108, E113 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On
- Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression
- Pewsey 2021 - Recent Advances in Directional Statistics
- Philip 2020 - Protocol for Probabilistic Extreme Event Attribution
- Stasinopoulos 2007 - GAMLSS in R
- Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
