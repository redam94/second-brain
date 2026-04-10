---
title: Multiple Comparisons Problem
type: concept
tags:
  - statistics
  - methodology
aliases:
  - multiple comparisons
  - multiplicity
  - multiple testing problem
---

# Multiple Comparisons Problem

The statistical problem that arises when multiple statistical tests are performed simultaneously: the probability of obtaining at least one spurious significant result increases with the number of comparisons.

## Classical View

In the classical framework, if you perform 20 independent tests at the p < .05 level, you expect one false positive on average even when nothing is going on. Corrections such as Bonferroni adjustment account for this.

## Extended View (Gelman and Loken)

[[Gelman and Loken 2013 - The Garden of Forking Paths]] argue that the multiple comparisons problem extends beyond explicit testing of multiple hypotheses. Even when only one test is performed, if the *choice* of that test is contingent on the data, the researcher is effectively navigating a [[Garden of Forking Paths]] of potential comparisons. The problem is one of *potential* comparisons, not just performed comparisons.

## Conditions That Worsen the Problem

The problem is most severe when:
- Effect sizes are small
- Sample sizes are small
- Measurement error is large
- Variation is high

It is less problematic with large real differences, large samples, and precise measurement.

## Solutions

- [[Pre-registration]] of analyses
- [[Multilevel Modeling]] to handle all comparisons simultaneously
- [[Pre-publication Replication]]
- Bayesian approaches using informative priors
- Distinguishing [[Exploratory vs Confirmatory Research]]

## Sources

- [[Gelman and Loken 2013 - The Garden of Forking Paths]]

## Related Concepts

- [[Researcher Degrees of Freedom]]
- [[P-Hacking]]
- [[Statistical Significance]]
