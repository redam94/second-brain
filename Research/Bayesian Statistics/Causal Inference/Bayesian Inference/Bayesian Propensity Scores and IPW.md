---
title: Bayesian Propensity Scores and Inverse Probability Weights
aliases:
  - Bayesian Propensity Scores and IPW
  - Bayesian IPW
  - Liao-Zigler method
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/article
source: "[[Clippings/How to use Bayesian propensity scores and inverse probability weights]]"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: concept
source_location: "Andrew Heiss blog post (2021-12-18); Liao & Zigler (2020)"
depends_on:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[General Structure of Bayesian CI]]"
used_by: []
---

# Bayesian Propensity Scores and Inverse Probability Weights

> [!summary]
> Classical IPW cannot be directly used in Bayesian inference because Bayesian posterior inference should ignore the propensity score (Robins, Hernán & Wasserman). Liao & Zigler (2020) propose a two-stage Bayesian approach: (1) model the propensity score in the design stage, propagating uncertainty into the analysis stage; (2) use the uncertain propensity scores as weights in the outcome model. This preserves the Bayesian coherence while enabling IPW-style causal estimation.

## The Core Problem

Standard IPW requires computing propensity scores $\hat{e}(X) = \hat{P}(Z=1 \mid X)$ and using them as weights in an outcome model. In frequentist settings this is straightforward. However, in a fully Bayesian analysis, the propensity score drops from the likelihood under the ignorability assumption (since $Y \perp Z \mid X$ makes the treatment mechanism ancillary), meaning **a properly specified Bayesian model should not include propensity scores at all**.

## Liao-Zigler Two-Stage Approach

The resolution is to **treat propensity score uncertainty as a design-stage input**, not an outcome-model covariate:

1. **Design stage**: Fit a Bayesian model for the treatment assignment $P(Z \mid X)$. Draw posterior samples of propensity scores $e^{(s)}(X)$ for $s = 1, \ldots, S$.
2. **Analysis stage**: For each posterior draw $e^{(s)}$, compute IPTW weights and fit the outcome model. This propagates design-stage uncertainty into the final inference.

This approach avoids "double-dipping" the propensity score in both stages while maintaining coherent Bayesian uncertainty propagation.

## Implementation

The Heiss (2021) tutorial implements this in R using `brms` and Stan:
- Design stage: logistic regression via `brm()` for treatment model
- Extract posterior draws of propensity scores
- Compute stabilized IPTW: $w_i = P(Z=z_i) / P(Z=z_i \mid X_i)$
- Outcome stage: weighted Bayesian regression using the draws

## See Also

- [[Propensity Score in Bayesian CI]] — theoretical framework from Li et al. (2022)
- [[General Structure of Bayesian CI]] — overview of Bayesian causal inference components
- [[Bayesian Outcome Models]] — alternative: fully model-based approach without propensity scores
