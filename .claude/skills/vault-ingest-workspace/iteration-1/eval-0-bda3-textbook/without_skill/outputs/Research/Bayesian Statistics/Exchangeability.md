---
title: "Exchangeability"
aliases:
  - "exchangeable"
  - "exchangeability"
tags:
  - concept/definition
  - topic/bayesian-statistics
  - topic/probability
created: 2026-04-09
---

# Exchangeability

## Definition

> [!abstract] Definition
> The $n$ values $y_1, \ldots, y_n$ are **exchangeable** if their joint probability density $p(y_1, \ldots, y_n)$ is invariant to permutations of the indexes. That is, the joint distribution does not depend on the ordering of the observations.

## Relationship to iid

- Exchangeable data are commonly modeled as **independently and identically distributed** (*iid*) given some unknown parameter vector $\theta$ with distribution $p(\theta)$
- iid given $\theta$ implies exchangeability, but exchangeability is a weaker condition
- De Finetti's theorem: under certain regularity conditions, an infinite exchangeable sequence can be represented as a mixture of iid sequences

## When to Assume Exchangeability

- Appropriate when information relevant to the outcome is *not* conveyed by the unit indexes
- After incorporating sufficient relevant information in explanatory variables $x$, it is *always* appropriate to assume exchangeability (given $x$)
- If two units have the same value of $x$, their distributions of $y$ are the same

## Conditional Exchangeability

When explanatory variables $X$ are treated as random, exchangeability can be extended to require the distribution of the $n$ values of $(x, y)_i$ to be unchanged by arbitrary permutations of the indexes.

## In Hierarchical Models

- Exchangeability can apply at each level of a [[Hierarchical Models|hierarchical model]]
- Example: patients within a city may be exchangeable, and cities themselves may be exchangeable
- Including relevant explanatory variables at each level makes the conditional distributions exchangeable

## Significance

Exchangeability is **fundamental to statistics** and recurs throughout Bayesian data analysis. It provides the justification for treating observations as coming from a common distribution and is the starting point for constructing probability models.

## References

- [[BDA3 - S1.2 - General Notation for Statistical Inference]] -- initial definition
- [[BDA3 - Ch05 - Hierarchical Models]] -- exchangeability at multiple levels
