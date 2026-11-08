---
title: "Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 5.1-5.2, Tables 7-8, Figs. 5-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
used_by:
  - "[[Silverman 2020 - Bayesian-Threshold Method]]"
aliases:
  - Madigan York graphical model MSE
  - LCMCR benchmark on modern slavery data
---

# Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks

> [!summary]
> Two existing Bayesian methods for human-rights MSE are tested: Madigan-York model averaging over decomposable graphical models (`dga`) and Manrique-Vallier's Dirichlet-process latent-class sampler (`LCMCR`). Neither escapes instability: Madigan-York is bimodal on UK five-list and Netherlands data; DP mixtures give 23.0k on UK six lists versus 12.0k on four lists and 150.3k vs 49.1k on Netherlands six vs five lists.

## Overview

Both methods average over models rather than selecting one. The comparison uses the same data variants as the frequentist study ([[Silverman 2020 - Data Sets for Multiple Systems Estimation]]).

## Main Content

### Graphical models: Madigan and York (1997), package `dga`
> [!definition] Madigan-York model averaging
> Enumerate every decomposable graphical model for dependencies among the $K$ lists and compute the joint posterior of (model, total population size). The routine `bma.cr` needs a grid for the dark figure; the standard range is 0 to 10 times the number of observed cases. Fully implemented only for 3, 4 and 5 lists, where the numbers of models are 8, 61 and 822. Six or more lists are infeasible, so only five-list UK, Netherlands and New Orleans, four-list UK and Kosovo are analysed.
^def-madigan-york

**Table 7 (reproduced; thousands).**

| Data | Max. population (extended) | 2.5% | 10% | 50% | 90% | 97.5% |
|---|---|---|---|---|---|---|
| UK five lists | 40 | 10.4 | 11.3 | 23.0 | 29.6 | 33.3 |
| UK four lists (GP omitted) | default | 9.5 | 10.1 | 11.4 | 12.7 | 13.5 |
| Netherlands five lists | default | 40.8 | 43.5 | 47.9 | 52.6 | 55.4 |
| Netherlands five lists | 250 | 41.5 | 44.3 | 50.3 | 177.4 | 202.8 |
| New Orleans five lists | default | 0.5 | 0.6 | 0.9 | 1.3 | 1.6 |
| Kosovo | default | 9.8 | 10.8 | 12.6 | 14.9 | 16.5 |

UK five lists showed strong bimodality extending beyond the default range, so the range was extended to 40,000 (Fig. 5: 822 dotted curves for individual models; solid curve = marginal posterior). Quantiles do not describe the bimodal distribution adequately. Netherlands: no second mode within 10x observed (Fig. 6, upper), but extending to 250k reveals a mode with posterior mass about 34%. The probability of the top model: New Orleans about 0.05 (no dominant model), Kosovo nearly 0.99, UK (extended range) 0.44, Netherlands (extended) 0.67.

### Dirichlet process mixtures: Manrique-Vallier (2016), package `LCMCR`
A Bayesian latent-class (infinite mixture of product-Bernoulli) model sampled by MCMC; no limit on the number of lists. Settings used: seed 12345, thinning 100, burn-in 100K for better mixing than defaults.

**Table 8 (reproduced; thousands).**

| Data | 2.5% | 10% | 50% | 90% | 97.5% |
|---|---|---|---|---|---|
| UK six lists | 17.2 | 18.8 | 23.0 | 29.5 | 34.2 |
| UK five lists | 15.1 | 17.4 | 22.0 | 28.8 | 35.2 |
| UK four lists | 10.1 | 10.7 | 12.0 | 13.6 | 14.5 |
| Netherlands | 115.7 | 126.1 | 150.3 | 189.9 | 250.3 |
| Netherlands five lists | 43.0 | 44.7 | 49.1 | 54.2 | 58.3 |
| New Orleans | 0.5 | 0.6 | 0.7 | 0.9 | 1.1 |
| New Orleans five lists | 0.6 | 0.6 | 0.8 | 1.1 | 1.3 |
| Kosovo | 8.5 | 9.4 | 10.4 | 12.3 | 14.6 |

> [!example] Interpretation
> UK without omitting GP: the DP approach essentially ignores the lower component of the Madigan-York posterior; once GP is omitted the two methods agree (about 11-12k). Netherlands: DP homes in on the **upper** mode for six lists (150.3k) and the **lower** mode for five lists (49.1k), "the reverse of the behaviour of the AIC" stepwise selection. Merging two small lists should be harmless but flips the answer, so neither Bayesian method is stable. Aleshin-Guendel (2020) later shows the default LCMCR family is typically not identifiable for $K<10$: [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]].
^ex-bayes-benchmarks

## Examples

> [!example] Range sensitivity as a model-checking tool
> Extending the grid for $N$ from 10x to 250k for the Netherlands data increased the 97.5% quantile from 55.4k to 202.8k. An upper limit chosen "reasonably" can hide a mode that carries 34% of the posterior mass. Always report how truncation of a discrete latent size was chosen and test it; compare the N-mixture truncation check in [[Concept - Marginalising Latent Discrete Counts for HMC]].

## Connections

- Latent-class mechanics: [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]].
- Nonparametric Bayes background: [[Nonparametric Models Overview]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
- [[Silverman 2020 - Bayesian-Threshold Method]]
