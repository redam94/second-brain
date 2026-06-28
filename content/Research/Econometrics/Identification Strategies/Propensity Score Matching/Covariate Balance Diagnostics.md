---
title: Covariate Balance Diagnostics
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Stuart 2010 - Matching Methods for Causal Inference - A Review.pdf]]"
source_location: "Section 4, pp. 11-13"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Propensity Score and the Balancing Property]]"
  - "[[Matching Methods and Distance Measures]]"
used_by:
  - "[[Propensity Score Matching - Overview]]"
aliases:
  - Balance Diagnostics
  - Standardized Mean Difference
  - Standardized Bias
  - Variance Ratio
  - QQ Plot Balance
---

# Covariate Balance Diagnostics

> [!summary]
> Diagnosing match quality is "perhaps the most important step." The goal is **covariate balance** — the matched treated and control groups should have similar empirical covariate distributions, $\tilde p(X\mid T=1) = \tilde p(X\mid T=0)$. Numerical diagnostics (standardized difference in means, variance ratios) and graphical diagnostics (propensity-score distributions, QQ plots, before/after standardized-difference plots) are used. Crucially, **balance, not the p-value of a balance hypothesis test, is the target**.

## Overview

Since matching only equates the *observed* covariates, balance is the in-sample property we can actually verify. Because no single summary captures a multivariate distribution, run **several** types of balance checks (means, variances, interactions, squares, QQ plots) for a fuller picture. All balance metrics should be computed **the same way the outcome analysis will be run** — within subclasses then aggregated for subclassification, and using the IPTW / variable-ratio / full-matching weights if those will be used in the analysis.

## Main Content

> [!definition] Standardized difference in means (standardized bias) ^def-smd
> For each covariate, the **standardized difference in means** is
> $$
> \text{SMD} = \frac{\bar X_t - \bar X_c}{\sigma_t},
> $$
> where $\sigma_t$ is the standard deviation in the **full treated group** (the *same* standardization is used before and after matching so the comparison is meaningful). It is like an effect size and is compared before vs. after matching. Compute it for each covariate **and for two-way interactions and squares**. For binary covariates, use the same formula or a simple difference in proportions.

> [!definition] Rubin (2001)'s three balance measures ^def-rubin-three
> A comprehensive view of balance:
> 1. The **standardized difference of means of the propensity score**.
> 2. The **ratio of the variances of the propensity score** in the treated and control groups.
> 3. For each covariate, the **ratio of the variances of the residuals** orthogonal to the propensity score.
>
> Rules of thumb for regression adjustment to be trustworthy: absolute standardized differences of means **< 0.25**, and **variance ratios between 0.5 and 2**.

> [!warning] Do not use hypothesis tests / p-values as balance measures ^warn-balance-test
> Hypothesis tests and p-values that incorporate sample size (e.g., t-tests) **should not** be used to assess balance, for two reasons:
> 1. **Balance is an in-sample property** of the matched data — it makes no reference to a super-population, so a hypothesis test about a population is conceptually inappropriate.
> 2. **Tests conflate balance with power.** As matching discards controls, sample size (and power) falls, so a balance test's p-value can rise — *appearing* to show improved balance simply because of reduced power. A test should not be used in a stopping rule when matched samples have varying sizes.
> Report standardized differences and variance ratios instead.

> [!definition] Graphical diagnostics ^def-graphical
> - **Distribution of propensity scores** across unmatched/matched treated and control units — also assesses common support; for weighting/subclassification, plot dot sizes proportional to weights.
> - **Quantile-quantile (QQ) plots** for continuous covariates — compare the quantiles of a variable in treated vs. control; identical distributions fall on the 45-degree line. Can also be done for squares and interactions (second moments).
> - **Before/after standardized-difference plot** (one line per covariate) — a quick overview of whether balance improved on each covariate.

## Examples

Stuart and Green (2008), 1:1 nearest-neighbor on the propensity score: the propensity-score distribution plot shows matched treated and control units occupying the same range with a good match for each treated unit, while many unmatched controls fall outside that range. A companion plot of absolute standardized differences for 10 covariates shows nearly all dropping below the 0.2 threshold after matching — though a few covariates with *small* initial imbalance can *worsen* (they barely enter the propensity model); this matters only if those covariates are strongly related to the outcome, in which case add Mahalanobis matching on them within calipers.

## Connections

- Verifies the [[Propensity Score and the Balancing Property]] holds in the realized sample.
- Step 3 of the workflow in [[Propensity Score Matching - Overview]]; feeds back into [[Matching Methods and Distance Measures]] when re-matching.
- The propensity-score distribution plot doubles as a check of [[Common Support and Overlap]].
- Distinct from the unverifiable [[Conditional Independence Assumption]] (balance on *observed* covariates does not prove unconfoundedness); sensitivity analysis addresses the unobserved part — relevant to [[Omitted Variables Bias]].

## See Also

- [[Propensity Score Matching - Overview]]
- [[Common Support and Overlap]]
- [[Matching Methods and Distance Measures]]
- [[_Index]]
