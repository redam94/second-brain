---
title: "Index: Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Counting the Unobserved]]"
date_updated: 2026-11-08
concept_count: 8
---

# Silverman 2020 - Multiple Systems Analysis for Modern Slavery

> [!abstract] Routing Summary
> Full capture of Silverman (arXiv:1902.06078v3; JRSS-A 183(3): 691-736): Poisson log-linear MSE, frequentist and Bayesian model-selection instabilities on UK, Netherlands, New Orleans and Kosovo data, and the Bayesian/threshold method. 8 notes, Tables 1-15 captured (UK Table 1 cell patterns summarised, others reproduced).
> - Need the paper in one page? -> [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
> - Need the data sets (Tables 1-4)? -> [[Silverman 2020 - Data Sets for Multiple Systems Estimation]]
> - Need the log-linear model and dark-figure formula? -> [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]
> - Need stepwise AIC/BIC results (Tables 5-6)? -> [[Silverman 2020 - Frequentist Model Selection Results]]
> - Need extended MLE, empty overlaps, posterior at minus infinity? -> [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]
> - Need Madigan-York and LCMCR benchmarks (Tables 7-8)? -> [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]
> - Need the Bayesian/threshold algorithm and PyMC sketch? -> [[Silverman 2020 - Bayesian-Threshold Method]]
> - Need posterior tables 9-14, Table 15, conclusions? -> [[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| UK/NL/NOLA/Kosovo data | [[Silverman 2020 - Data Sets for Multiple Systems Estimation]] | example | - | 2744 / 8234 / 185 / 4400 cases |
| Poisson log-linear MSE | [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]] | definition | data | $\hat N=n+e^{\hat\mu}$ |
| Stepwise AIC instability | [[Silverman 2020 - Frequentist Model Selection Results]] | example | log-linear | NL 60.3k -> 146.0k on merging |
| Empty-overlap posterior | [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]] | theorem | log-linear | $\beta_{12}=-\infty$ atom |
| Madigan-York / LCMCR | [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]] | example | log-linear | bimodal / flip between modes |
| Bayesian/threshold | [[Silverman 2020 - Bayesian-Threshold Method]] | definition | empty overlaps | variance 1, $\tau=2$ default |
| Results and conclusions | [[Silverman 2020 - Bayesian-Threshold Results and Conclusions]] | example | method | UK ~12.3k (11-14k) |

## Notes

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]] — CONTAINS: question, findings, E109 link, Source Map.
- [[Silverman 2020 - Data Sets for Multiple Systems Estimation]] — CONTAINS: list definitions, totals, variants, Kosovo Table 4 decoded.
- [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]] — CONTAINS: Eq. 1, dark figure, multinomial link, Lincoln-Petersen special case, Python.
- [[Silverman 2020 - Frequentist Model Selection Results]] — CONTAINS: stepwise AIC, all-subsets BIC, Tables 5-6.
- [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]] — CONTAINS: three estimability problems, empty-overlap theorem, UK cell counts.
- [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]] — CONTAINS: Tables 7-8, Figs. 5-6 discussion.
- [[Silverman 2020 - Bayesian-Threshold Method]] — CONTAINS: algorithm, implementation, PyMC sketch.
- [[Silverman 2020 - Bayesian-Threshold Results and Conclusions]] — CONTAINS: Tables 9-15, conclusions.

## Sources
- [[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]] — arXiv:1902.06078v3, 31 pp.

## See Also
- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]], [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]], [[Horseshoe and Regularized Horseshoe Priors]].
