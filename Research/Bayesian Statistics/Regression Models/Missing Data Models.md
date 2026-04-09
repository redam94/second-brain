---
title: "Missing Data Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/missing-data
  - topic/multiple-imputation
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Multiple imputation"
  - "MCAR"
  - "MAR"
  - "MNAR"
---

# Missing Data Models

> [!summary]
> Chapter 18 of BDA3 presents the Bayesian framework for handling missing data. Multiple imputation — drawing multiple plausible completions of the data from the posterior predictive distribution — propagates missing-data uncertainty into final inferences.

## Missing Data Mechanisms

- **MCAR** (Missing Completely At Random): missingness independent of all data
- **MAR** (Missing At Random): missingness depends only on observed values — mechanism is [[Data Collection Models|ignorable]]
- **MNAR** (Missing Not At Random): missingness depends on the missing values — requires explicit modeling of the mechanism

## Multiple Imputation

1. Draw $M$ completed datasets from $p(y_{\text{mis}} \mid y_{\text{obs}})$
2. Analyze each completed dataset separately
3. Combine results using **Rubin's rules**:
   - Point estimate: $\bar{Q} = \frac{1}{M}\sum_{m=1}^M \hat{Q}_m$
   - Variance: $T = \bar{U} + (1 + 1/M) B$ where $\bar{U}$ is within-imputation variance and $B$ is between-imputation variance

> [!tip]
> In a fully Bayesian analysis, missing data are simply additional unknown parameters — they are sampled alongside model parameters in each MCMC iteration. Multiple imputation approximates this for non-Bayesian analyses.

## Key Applications

- **Polls with missing demographic data**: imputing covariates for poststratification
- **Counted data**: handling partially observed counts (e.g., election data with missing precincts)

## See Also

- [[Data Collection Models]] — ignorability conditions (Ch 8)
- [[Hierarchical Models]] — hierarchical imputation models
- [[Missing Data - Statistical Rethinking]] — DAG-based treatment of missing data mechanisms from Statistical Rethinking (companion note)
- [[MCMC Basics]] — in a fully Bayesian analysis, missing values are sampled alongside model parameters in each MCMC iteration
