---
title: "Bayesian Propensity Scores and IPW"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/tutorial
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights.md]]"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: concept
source_location: "Heiss (2021) blog post — full article"
depends_on:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Frequentist Causal Estimation]]"
used_by:
  - "[[Frequentist Causal Estimation]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Bayesian Outcome Models]]"
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Li et al 2022 - Overview]]"
aliases:
  - Bayesian IPW
  - Liao-Zigler method
  - Bayesian inverse probability weighting
---

# Bayesian Propensity Scores and IPW

> [!summary]
> Andrew Heiss (2021) demonstrates how to implement Bayesian propensity score weighting and inverse probability weighting (IPW) using brms/Stan. The post implements the two-stage approach recommended by Liao and Zigler (2020): fit a Bayesian propensity model first, draw samples of propensity scores from the posterior, then use those samples to construct stabilized IPW weights for a Bayesian outcome model.

## Overview

Standard frequentist IPW uses a point estimate of $\hat{e}(x)$ from a logistic regression to construct weights. A fully Bayesian approach should propagate propensity score uncertainty into the outcome model.

The Liao–Zigler two-stage procedure:
1. Fit a Bayesian model for treatment assignment: $\Pr(Z = 1 \mid X) \sim \text{logistic}(X\beta)$
2. Draw $S$ samples of propensity scores $\hat{e}^{(s)}(x)$ from the posterior
3. For each draw, compute stabilized weights: $w^{(s)}_i = \frac{\Pr(Z_i)}{\hat{e}^{(s)}(x_i)}$
4. Fit the outcome model weighted by $w^{(s)}_i$, marginalizing over the $S$ draws

This propagates uncertainty from the propensity model into the final causal estimate, unlike the frequentist plug-in approach.

## Implementation Notes

See the Clippings note [[How to use Bayesian propensity scores and inverse probability weights]] for the full implementation in R with brms.

## See Also

- [[Propensity Score in Bayesian CI]] — Li et al. (2022) theoretical framework for Bayesian propensity scores
- [[Frequentist Causal Estimation]] — the frequentist IPW baseline
- [[Bayesian Outcome Models]] — outcome modeling as an alternative to IPW
- [[General Structure of Bayesian CI]] — broader framework for Bayesian causal inference
