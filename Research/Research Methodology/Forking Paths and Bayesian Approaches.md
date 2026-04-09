---
title: "Forking Paths and Bayesian Approaches"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/bayesian-statistics
  - topic/multiple-comparisons
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
folder: "Research Methodology"
aliases:
  - "Bayesian approach to multiple comparisons"
---

# Forking Paths and Bayesian Approaches

> [!summary]
> The [[Garden of Forking Paths]] problem is fundamentally about frequentist p-values being invalid when analysis is data-contingent. Bayesian and multilevel approaches offer a principled alternative by regularizing estimates and naturally accounting for multiplicity.

## Why P-Values Are Vulnerable

The p-value's interpretation depends on the sampling distribution of the test statistic *under repetition of the same procedure*. But if the procedure itself changes with the data ($T(y; \phi(y))$), the standard sampling distribution is wrong. The p-value is computed as if the test were pre-specified when it wasn't.

## The Bayesian Alternative

As Gelman & Loken note at the end of their paper, once we abandon the p-value framework:

> We can take the observed result as data and update beliefs using Bayes' theorem.

For example, Bem's ESP result (53.1% hit rate, $p = 0.01$) can be reanalyzed: with a reasonable prior, the posterior probability of a meaningful effect is far lower than the p-value suggests.

## Hierarchical Models as Natural Regularization

[[Hierarchical Models]] provide a structural solution to the multiple comparisons problem:

- **Partial pooling**: estimates for many groups are automatically shrunk toward the grand mean
- Groups with less data are regularized more heavily
- This is equivalent to an implicit multiplicity correction — but derived from the model structure, not an ad hoc penalty
- The James-Stein phenomenon: pooled estimates dominate unpooled ones

## Practical Recommendations

1. **Use multilevel models** when studying effects across many groups or conditions
2. **Report uncertainty**: full posterior intervals convey strength of evidence better than p-values
3. **Pre-register** analyses to reduce (but not eliminate) forking paths
4. **Regularize**: priors that incorporate domain knowledge prevent extreme estimates from noisy data

## See Also

- [[Garden of Forking Paths]] — the problem statement
- [[Researcher Degrees of Freedom]] — the sources of analytic flexibility
- [[Hierarchical Models]] — the Bayesian solution
- [[Model Checking]] — evaluating whether the model is adequate
