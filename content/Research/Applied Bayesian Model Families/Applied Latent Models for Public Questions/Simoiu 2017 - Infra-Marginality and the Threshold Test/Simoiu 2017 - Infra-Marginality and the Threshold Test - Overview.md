---
title: "Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/overview
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Whole paper, arXiv:1607.05376v5, pp. 1-21 (Ann. Appl. Stat. 2017)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on:
  - "[[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]]"
  - "[[Simoiu 2017 - Threshold Test Generative Model]]"
  - "[[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]]"
  - "[[Simoiu 2017 - Model Checks Robustness and Placebo Tests]]"
  - "[[Simoiu 2017 - Limitations Extensions and Identification Ridge]]"
used_by: []
aliases:
  - "Simoiu Corbett-Davies Goel overview"
  - "threshold test paper overview"
---

# Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview

> [!summary]
> Simoiu, Corbett-Davies and Goel (2017) show that the outcome (hit-rate) test and the benchmark (search-rate) test for discrimination can point the wrong way when groups have different risk distributions (infra-marginality). Their **threshold test** infers group-specific decision thresholds jointly with latent risk (signal) distributions using a hierarchical Bayesian beta/threshold model. On 4.5 million North Carolina stops it finds lower search thresholds for black (7%) and Hispanic (6%) drivers than white (15%) and Asian (13%).

## Overview

**Research question.** Does a lower hit rate or higher search rate for one group actually reveal a lower threshold for that group? **Answer.** No: Figure 1 shows two worlds with identical search and hit rates but opposite threshold orderings. **Method.** Model each stop as a draw $p\sim\text{Beta}$ from a race-by-department signal distribution; search iff $p$ exceeds threshold $t_{rd}$; contraband found with probability $p$. Observed search/hit counts then identify thresholds under structural restrictions plus hierarchical priors.

### Motivating PyMC examples
**E110** "Is the bar the same for everyone? The threshold test on Raleigh traffic stops" (Stanford Open Policing Project, 856,400 stops, 214 officers) - [example gallery](https://redam94.github.io/pymc-challenges/examples.html). E110 reports "a ridge of exact solutions" (an identification issue), closed-form and Gauss-Legendre likelihoods; see [[Simoiu 2017 - Limitations Extensions and Identification Ridge]].

### Source Map

| Paper section | Pages | Note |
|---|---|---|
| Abstract, 1 Introduction, Related work | 1-2 | [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] |
| 2.1 A model of decision making, Figure 1 | 2-4 | [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] |
| 2.2 The problem of infra-marginality | 4 | [[Simoiu 2017 - Benchmark and Outcome Tests and the Infra-Marginality Problem]] |
| 2.3 Inferring search thresholds: model, priors, sufficient statistics, Eq. 3, Figure 2 | 4-8 | [[Simoiu 2017 - Threshold Test Generative Model]] |
| 3.1 The data | 8-9 | [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] |
| 3.2 Benchmark and outcome results, Table 1, Figure 3 | 9-10 | [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] |
| 3.3 Threshold test results, Table 2, Figures 4-5 | 9-12 | [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] |
| 3.4 Effects of infra-marginality (Raleigh), Fig. 6 | 11-13 | [[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]] |
| 3.5 Model checks: posterior predictive, heterogeneity, omitted variables, placebo; Figs. 7-10 | 13-17 | [[Simoiu 2017 - Model Checks Robustness and Placebo Tests]] |
| 4 Conclusion, limits | 17-18 | [[Simoiu 2017 - Limitations Extensions and Identification Ridge]] |

## Connections
[[Hierarchical Models]] (department-level partial pooling), [[Posterior Predictive Checking]], [[Type S and Type M Errors]] (sign errors when group tests disagree), [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]] (another latent-threshold model).

> [!tip] Relevance to marketing measurement
> Any "who gets targeted" audit (lookalike audiences, credit or offer allocation, holdout selection) faces the same ambiguity: compare response rates among the treated and you confound a threshold with a risk distribution. The threshold-test logic suggests modelling the allocation rule explicitly. This is an analogy; the paper studies policing only.

## See Also
[[Research/Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test/_Index]]
