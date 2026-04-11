---
title: "Data Collection Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/ignorability
  - topic/missing-data
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Model Assessment"
aliases:
  - "Ignorability"
  - "Missing data mechanism"
doc_type: concept
source_location: "BDA3 Ch.8:197-232"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Model Checking]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Missing Data Models]]"
  - "[[Missing Data - Statistical Rethinking]]"
  - "[[Nonparametric Causal Inference]]"
---

# Data Collection Models

> [!summary]
> Chapter 8 of BDA3 addresses how the data collection process affects Bayesian inference. The key concept is **ignorability**: when the data collection mechanism can be safely ignored in the likelihood.

## Ignorability

A data collection mechanism is **ignorable** if:
1. The inclusion/missingness mechanism depends only on observed data (missing at random — MAR)
2. The parameters of the data model and inclusion model are distinct (parameter distinctness)

When ignorable, we can perform inference using only the observed-data likelihood without modeling the selection process.

## Applications

- **Sample surveys**: design weights and poststratification for non-representative samples
- **Designed experiments**: randomization ensures ignorability — connects to [[The Experimental Ideal]]
- **Observational studies**: ignorability is an assumption, not guaranteed — relates to [[The Selection Problem]] and [[Conditional Independence Assumption]]
- **Censoring and truncation**: requires explicit modeling when not ignorable

## Connection to Causal Inference

The ignorability concept directly parallels the **unconfoundedness** assumption in causal inference. When treatment assignment is not ignorable (depends on unobserved potential outcomes), observational estimates are biased — see [[Activity Bias in Advertising]] for a dramatic example.

## See Also

- [[Missing Data Models]] — explicit treatment of missing data (Ch 18)
- [[Omitted Variables Bias]] — what happens when ignorability fails
- [[Observational vs Experimental Methods in Advertising]] — observational methods failing
- [[Instrumental Variables]] — IV ensures ignorability through exogenous variation rather than conditioning
- [[The Selection Problem]] — the frequentist framing of the same challenge ignorability addresses
- [[Regression and the CEF]] — regression as an estimator when the data collection mechanism is ignorable
