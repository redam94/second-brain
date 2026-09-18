---
title: "Garden of Forking Paths"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/p-values
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
folder: "Research Methodology"
aliases:
  - "Forking paths"
  - "p-hacking"
doc_type: concept
source_location: "p_hacking.pdf pp. 1-14"
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Research Questions in Econometrics]]"
used_by:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Prediction vs Postdiction]]"
---

# The Garden of Forking Paths

> [!summary]
> Gelman & Loken (2013) argue that multiple comparisons can be a problem even when researchers perform only a single analysis and have their hypothesis in advance. The problem arises because the *details* of data analysis are contingent on the data — a "garden of forking paths" where different data would have led to different but equally justifiable analyses.

## The Core Argument

The key distinction is between four testing procedures:

1. **Simple classical test**: fixed test $T$, applied to data → $T(y)$
2. **Pre-registered test**: test chosen from a set, with $\phi$ pre-specified → $T(y; \phi)$
3. **Researcher degrees of freedom**: single test, but a *different* test would have been run on different data → $T(y; \phi(y))$
4. **Fishing/p-hacking**: explicitly trying many tests and reporting the best → $T(y; \phi^{\text{best}}(y))$

> [!warning]
> Researchers claim they are doing #2 (hypothesis specified in advance), critics accuse them of #4 (fishing). Gelman & Loken argue the real issue is #3 — the analysis is data-contingent even without explicit fishing.

## Why It Doesn't "Feel" Like Fishing

Conditional on the observed data, each analytic choice seems like the *only* reasonable choice. The researcher doesn't feel like they're making arbitrary decisions. But with different data, they would have made different — equally reasonable — choices. The result: the published p-value does not account for this implicit multiplicity.

## Key Examples

- **Arm circumference and political attitudes**: interaction reported as main finding, but many other interactions would have been equally reportable
- **ESP study (Bem 2011)**: nine experiments with many possible comparisons in each
- **Menstrual cycle and voting**: two similar studies in the same journal made different data-analytic choices, both finding significance
- **Red/pink clothing and fertility**: data exclusion rules, color coding choices, and date definitions all represent forking paths

## The Bayesian Connection

> [!tip]
> Once we abandon the claim of statistical significance, we can take a Bayesian view: treat the observed result as data and update our beliefs. A 53.1% hit rate with a flat prior gives a posterior that is barely distinguishable from chance — the "significant" p-value was misleading.

## See Also

- [[Researcher Degrees of Freedom]] — deeper dive into analytic flexibility
- [[Forking Paths and Bayesian Approaches]] — how Bayesian methods address this
- [[The Experimental Ideal]] — why randomized experiments mitigate these issues
- [[Hierarchical Models]] — partial pooling provides a structural Bayesian solution to the multiplicity problem
- [[Prediction vs Postdiction]] — pre-commitment makes the confirmatory/exploratory line explicit
- [[The Peeking Problem and Optional Stopping]] — the stopping rule as a forking path
