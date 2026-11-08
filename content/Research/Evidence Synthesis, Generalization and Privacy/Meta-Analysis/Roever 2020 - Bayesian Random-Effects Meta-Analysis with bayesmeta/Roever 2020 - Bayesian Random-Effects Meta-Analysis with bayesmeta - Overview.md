---
title: "Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Whole paper (arXiv:1711.08683v2, J. Stat. Softw. 93(6)), pp. 1-43"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]"
used_by:
  - "[[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]]"
  - "[[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]"
  - "[[Roever 2020 - Priors for the Effect and Heterogeneity]]"
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
  - "[[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]"
  - "[[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]]"
  - "[[Roever 2020 - DIRECT Algorithm Implementation and Calibration]]"
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - bayesmeta paper
  - Roever bayesmeta JSS 2020
---

# Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview

> [!summary]
> Röver (2020) shows that the two-parameter normal-normal hierarchical model (NNHM) behind random-effects meta-analysis can be analysed fully Bayesianly without MCMC. The marginal posterior of the heterogeneity $\tau$ is a one-dimensional integral, the effect $\mu$ given $\tau$ is exactly normal, and the DIRECT algorithm turns the resulting mixture into an accurate discrete normal mixture. The `bayesmeta` R package delivers posteriors, predictions, shrinkage estimates, prior sensitivity checks and posterior predictive $p$-values, which matter most when a meta-analysis has only a few studies.

## Overview

**Research question.** Meta-analyses are often tiny (Cochrane median 3 studies, 75th percentile 6), so plug-in estimates of heterogeneity and large-sample theory are unreliable. How can analysts get exact Bayesian inference, with flexible priors, quickly and reproducibly?

**Contribution.** (1) A catalogue of priors for $\mu$ (uniform, normal) and $\tau$ (informative, proper non-informative, improper); (2) closed-form marginal likelihood and conditional posteriors; (3) the "partly analytical, partly numerical" computation via the DIRECT algorithm (Röver and Friede 2017); (4) prediction, shrinkage, credible intervals, prior predictive checks and posterior predictive $p$-values; (5) a pediatric liver transplantation example (six studies) and a calibration check.

**Key result (example).** With $\mu\sim N(0,4^2)$ and $\tau\sim\text{half-normal}(0.5)$: posterior median log-OR $-1.57$ with 95% shortest credible interval $[-2.23,-0.93]$; posterior $\tau$ median 0.34, $P(\tau>1)=2.1\%$; predictive interval $[-2.77,-0.41]$; $P(\mu>0)=6.2\times10^{-5}$.

## Main Content

### Source Map

| Paper section (pages) | Content | Covered in |
|---|---|---|
| 1.1-1.2 Meta-analysis, NNHM (pp. 1-3) | Motivation, small-$k$ statistics | [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] |
| 1.3 Analysis within NNHM (pp. 2-6) | Bayesian vs frequentist, software | [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] |
| 1.4 Outline (p. 6) | Structure | this note |
| 2.1 NNHM (pp. 6-7) | Eq. (1)-(3) | [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]] |
| 2.2 Prior distributions (pp. 7-13) | Eq. (4)-(12), Table 1, Fig. 1 | [[Roever 2020 - Priors for the Effect and Heterogeneity]] |
| 2.3 Likelihood (p. 13) | Eq. (13)-(14) | [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]] |
| 2.4 Marginal likelihood (pp. 13-15) | Eq. (15)-(22) | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] |
| 2.5-2.6 Conditional, marginal and joint posterior (pp. 15-16) | Eq. (23)-(26) | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] |
| 2.7 Predictive distribution (p. 16) | Eq. (27) | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] |
| 2.8 Shrinkage (pp. 16-17) | Eq. (28)-(29) | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] |
| 2.9 Credible intervals (p. 17) | Central, shortest, HPD | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] |
| 2.10 Posterior predictive checks (pp. 17-18) | Concept | [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] |
| 2.11 Internals (p. 18) | Mixture approximation | [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] |
| 3.1-3.2 Example data (pp. 19-20) | Table 2-3, log-OR, escalc | [[Roever 2020 - Pediatric Liver Transplant Worked Example]] |
| 3.3 Performing the analysis (pp. 20-29) | `bayesmeta()`, forest, plot, `$summary`, `$rposterior`, risk difference, Figs. 2-4 | [[Roever 2020 - Pediatric Liver Transplant Worked Example]] |
| 3.4 Prior variations (pp. 29-32) | Prior predictive, Turner/Rhodes priors, Fig. 5 | [[Roever 2020 - Priors for the Effect and Heterogeneity]] |
| 3.5 Frequentist connection (pp. 32-33) | REML vs conditional posterior | [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] |
| 3.6 Posterior predictive checks (pp. 33-37) | Two-study example, Figs. 6-7 | [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] |
| 4 Summary (p. 37) | Conclusions | this note; [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] |
| Appendix A.1 Unit information priors (p. 38) | log-OR, log-RR | [[Roever 2020 - Priors for the Effect and Heterogeneity]] |
| A.2 Conservatism of uniform prior (pp. 38-39) | Eq. (30)-(31) | [[Roever 2020 - Priors for the Effect and Heterogeneity]] |
| A.3 Marginal likelihood derivation (pp. 39-40) | Eq. (32)-(44) | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] |
| A.4 Mixture implementation (p. 40) | Eq. (45) | [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] |
| A.5 Calibration check (pp. 41-42) | PIT simulation, Fig. 8 | [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] |
| References (pp. 43-48+) | | [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] (reference groups) |

### Headline example numbers

| Quantity | Value |
|---|---|
| Posterior mean/median $\mu$ (log-OR) | -1.576 / -1.573; sd 0.330 |
| Shortest 95% interval for $\mu$ | [-2.231, -0.926] |
| Posterior median $\tau$ | 0.345 (mean 0.381, sd 0.259, mode 0.245) |
| Shortest 95% interval for $\tau$ | [0, 0.861]; 99% upper limit 1.109 |
| $P(\tau>1\mid y)$ | 0.0210 |
| $P(\mu>0\mid y)$ | $6.19\times10^{-5}$ |
| Predictive $\theta_{k+1}$ | median -1.570, 95% interval [-2.766, -0.407] |
| Risk difference (control risk 0.5) | median -0.328, 95% CI [-0.403, -0.215] |

## Examples

All numbers above were independently recomputed with a grid approximation in Python in [[Roever 2020 - Pediatric Liver Transplant Worked Example]].

## Connections

- Frequentist counterpart: [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]; the Knapp-Hartung (HKSJ) approach to the same small-$k$ problem is in [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]].
- Relevance to marketing measurement: this is the exact model for combining experiment estimates (lift tests, geo tests) into a prior for a Bayesian MMM or for the next test. The posterior predictive for $\theta_{k+1}$ is the right prior for a new market, and shrinkage estimates ($\theta_i\mid y$) give partially pooled estimates for each test. See [[Hierarchical Models]], [[Constructing Priors for Effect Sizes]] and [[Geo-Experiment Methodology - Overview]].

## See Also

- [[Posterior Sampling and Summarization]]
- [[Partial Pooling as Multiple Comparisons Correction]]
