---
title: "Researcher Degrees of Freedom"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/replication-crisis
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
folder: "Research Methodology"
aliases:
  - "Analytic flexibility"
  - "Data-contingent analysis"
doc_type: concept
source_location: "p_hacking.pdf pp. 1-14"
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[The Experimental Ideal]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Pre-registration and Open Science - Overview]]"
---

# Researcher Degrees of Freedom

> [!summary]
> The concept of "researcher degrees of freedom" describes how the many decision points in data analysis — each seemingly innocuous — create an enormous space of possible analyses. Even without intent to deceive, this flexibility inflates false positive rates.

## Sources of Analytic Flexibility

From the examples in [[Garden of Forking Paths]], degrees of freedom include:

### Variable and Comparison Choices
- Which main effects vs. interactions to examine
- How to define subgroups (e.g., "single" vs. "married" definitions)
- Which covariates to include or exclude
- Whether to combine or separate samples

### Data Processing Decisions
- Inclusion/exclusion criteria (e.g., which days count as "peak fertility")
- How to handle outliers or missing data
- How to code categorical variables
- Whether to transform variables

### Statistical Modeling Choices
- Parametric vs. nonparametric tests
- Whether to pool across studies or analyze separately
- Fixed vs. random effects
- One-tailed vs. two-tailed tests

## The Combinatorial Explosion

Each decision multiplies the number of possible analyses. With just 5 binary choices, there are $2^5 = 32$ possible analysis paths. In real studies, the number is far larger. The probability that *at least one* path yields $p < 0.05$ is much higher than 5%.

## Connection to the Replication Crisis

This mechanism explains why:
- Published findings often fail to replicate
- Effect sizes shrink dramatically in replication attempts
- The problem is worst with small samples, noisy measurements, and small effects
- Pre-registration helps but cannot eliminate all flexibility

## See Also

- [[Garden of Forking Paths]] — the full paper and theoretical framework
- [[Forking Paths and Bayesian Approaches]] — alternatives to p-value-based inference
- [[Omitted Variables Bias]] — a related source of analytical error
- [[Hierarchical Models]] — partial pooling provides a structural solution by shrinking estimates across researcher-chosen subgroups
- [[Pre-registration and Open Science - Overview]] — pre-registration constrains these degrees of freedom
- [[The Peeking Problem and Optional Stopping]] — data-dependent stopping as a researcher degree of freedom
