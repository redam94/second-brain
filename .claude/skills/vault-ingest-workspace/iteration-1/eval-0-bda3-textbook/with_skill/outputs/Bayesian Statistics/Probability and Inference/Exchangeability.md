---
title: "Exchangeability"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/definition
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.2, pp. 5-6"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Statistical Notation and Framework]]"
used_by:
  - "[[Bayes Theorem]]"
  - "[[Predictive Distributions]]"
aliases:
  - Exchangeable
  - Exchangeable distribution
  - iid assumption
---

# Exchangeability

> [!summary]
> Exchangeability is the foundational modeling assumption in Bayesian statistics: a sequence of random variables is exchangeable if their joint distribution is invariant to permutation of the indices. This assumption justifies modeling data as iid given parameters and underpins the entire Bayesian parametric framework via de Finetti's theorem (Chapter 5).

## Overview

Exchangeability is the usual starting point of a statistical analysis. It is a weaker assumption than independence and identical distribution (iid), yet through de Finetti's theorem it implies the existence of a parameter and a prior distribution. The concept is fundamental to statistics and recurs throughout BDA3.

## Main Content

> [!definition] Definition: Exchangeability (BDA3, Ch. 1, Sec. 1.2)
> The $n$ values $y_i$ may be regarded as **exchangeable** if we express uncertainty as a joint probability density $p(y_1, \ldots, y_n)$ that is invariant to permutations of the indices.
>
> Formally, for any permutation $\pi$ of $\{1, \ldots, n\}$:
> $$p(y_1, \ldots, y_n) = p(y_{\pi(1)}, \ldots, y_{\pi(n)})$$
>
> A nonexchangeable model would be appropriate if information relevant to the outcome were conveyed in the unit indexes rather than by explanatory variables.
^def-exchangeability

> [!definition] Definition: Exchangeability with Covariates (BDA3, Ch. 1, Sec. 1.2)
> Treating $X$ (explanatory variables) as random, the notion of exchangeability can be extended to require the distribution of the $n$ values of $(x, y)_i$ to be unchanged by arbitrary permutations of the indexes.
>
> It is *always* appropriate to assume an exchangeable model after incorporating sufficient relevant information in $X$ that the indexes can be thought of as randomly assigned.
>
> **Consequence:** From the assumption of exchangeability, the distribution of $y$, given $x$, is the same for all units in the study in the sense that if two units have the same value of $x$, then their distributions of $y$ are the same.
^def-exchangeability-covariates

### Connection to iid Modeling

We commonly model data from an exchangeable distribution as **independently and identically distributed (iid)** given some unknown parameter vector $\theta$ with distribution $p(\theta)$. In the clinical trial example, we might model the outcomes $y_i$ as iid, given $\theta$, the unknown probability of survival.

### Hierarchical Exchangeability

In **hierarchical models** (Chapter 5 and subsequent), exchangeability operates at multiple levels. For example, in a multi-city medical trial:
- Patients within each city may be treated as exchangeable
- The cities themselves may be treated as exchangeable

This leads to hierarchical/multilevel models, which allow the parameters of a prior or population distribution to be estimated from data.

## Connections

- **De Finetti's theorem** (Chapter 5, Sec. 5.2) formally proves that infinite exchangeability implies the existence of a parameter $\theta$ and prior $p(\theta)$, justifying the entire Bayesian modeling approach
- Exchangeability is a weaker assumption than iid — it does not require conditional independence
- Any explanatory variable $x$ can be moved into the $y$ category if we wish to model it, maintaining exchangeability
- The concept connects directly to [[Bayes Theorem]] because exchangeability + iid given $\theta$ produces the standard likelihood function

## See Also
- [[Statistical Notation and Framework]] — Defines the symbols used in the exchangeability definition
- [[Bayes Theorem]] — The inference procedure that operates on exchangeable data
- [[Predictive Distributions]] — Predictions derived under exchangeability assumptions
