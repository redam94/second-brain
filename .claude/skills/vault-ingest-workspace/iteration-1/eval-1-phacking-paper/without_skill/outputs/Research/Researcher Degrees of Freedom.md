---
title: Researcher Degrees of Freedom
type: concept
tags:
  - statistics
  - methodology
  - research-methods
aliases:
  - researcher degrees of freedom
  - analytic degrees of freedom
---

# Researcher Degrees of Freedom

The many choices available to researchers during data collection and analysis that can affect statistical results. The term was introduced by [[Simmons Nelson and Simonsohn 2011]] and further developed in [[Gelman and Loken 2013 - The Garden of Forking Paths]].

## Types of Researcher Choices

- Which statistical test to perform
- What data to include or exclude
- What measures to study
- What interactions to consider
- How to code variables (e.g., continuous vs. categorical)
- How to define subgroups
- Whether to focus on main effects or interactions
- How to combine data across studies or samples
- Which covariates to include

## Why It Matters

These choices are often not pre-specified and are made contingent on the observed data. Even when each individual choice seems reasonable, the cumulative flexibility creates a [[Multiple Comparisons Problem]] that inflates false-positive rates. This occurs even when only a single analysis is reported -- the [[Garden of Forking Paths]] captures the full space of analyses that could have been conducted.

## Relationship to P-Hacking

Researcher degrees of freedom is a broader concept than [[P-Hacking]]. P-hacking implies deliberate exploration; researcher degrees of freedom can operate unconsciously through reasonable, theory-motivated choices that happen to be data-contingent.

## Sources

- [[Gelman and Loken 2013 - The Garden of Forking Paths]]
- [[Simmons Nelson and Simonsohn 2011]]

## Related Concepts

- [[Garden of Forking Paths]]
- [[Multiple Comparisons Problem]]
- [[P-Hacking]]
- [[Pre-registration]]
