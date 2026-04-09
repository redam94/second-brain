---
title: "Index: Research Methodology"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-04-08
---

# Research Methodology

> [!abstract] Summary
> Notes on statistical methodology, the replication crisis, causal inference challenges, and experimental design tools. Covers forking paths / multiple comparisons, activity bias in advertising, power analysis, multiple testing corrections, and survival analysis.

## Experimental Design

- [[Experimental Design/_Index|Experimental Design]] — Power analysis, multiple testing corrections, and survival analysis
  - [[Power Analysis and Sample Size]] — Sample size formulas and practical guidelines
  - [[Multiple Testing Corrections]] — Bonferroni (FWER), Benjamini-Hochberg (FDR), q-values
  - [[Survival Analysis]] — Kaplan-Meier, log-rank test, Cox proportional hazards

## Multiple Comparisons and P-values

- [[Garden of Forking Paths]] — Why multiple comparisons are a problem even without explicit p-hacking (Gelman & Loken, 2013)
- [[Researcher Degrees of Freedom]] — Sources of analytic flexibility that inflate false positives
- [[Forking Paths and Bayesian Approaches]] — How Bayesian/hierarchical methods address multiplicity

## Causal Inference in Advertising

- [[Activity Bias in Advertising]] — Observational methods massively overestimate ad effects (Lewis, Rao, & Reiley, 2011)
- [[Observational vs Experimental Methods in Advertising]] — Why regression controls and matching fail

## Sources

- [[raw/p_hacking.pdf]] — "The Garden of Forking Paths" (Gelman & Loken, 2013)
- [[raw/ssrn-2080235.pdf]] — "Here, There, and Everywhere" (Lewis, Rao, & Reiley, 2011)

## See Also

- [[Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian alternatives to p-value-based inference
- [[The Experimental Ideal]] — Why randomized experiments are the benchmark
- [[The Selection Problem]] — The fundamental challenge of causal inference
