---
title: Bayesian Propensity Scores and IPW
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/article
source: "https://www.andrewheiss.com/blog/2021/12/18/bayesian-propensity-scores-weights/"
source_location: "Full article"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: article
depends_on:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Frequentist Causal Estimation]]"
used_by:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - Bayesian IPW
  - Liao-Zigler method
  - Bayesian inverse probability weighting
---

# Bayesian Propensity Scores and Inverse Probability Weights

> [!summary]
> Bayesian inference and propensity-score IPW are philosophically in tension (Robins, Hernán & Wasserman: "Bayesian inference must ignore the propensity score"), but Liao & Zigler provide a practical two-stage solution. Stage 1 fits a Bayesian propensity score model; Stage 2 plugs the resulting posterior-predictive weights into a Bayesian outcome model. This preserves the double-robustness property of IPW while enabling posterior inference about causal estimands.

## The Core Tension

Under the standard ignorability assumption, the propensity score $e(X) = \Pr(Z=1 \mid X)$ drops out of the Bayesian likelihood — the posterior for causal estimands depends only on the outcome model. This is the **likelihood argument** against Bayesian IPW.

In contrast, the **practical argument** for IPW is that it ensures covariate balance and overlap, making the outcome model less sensitive to misspecification.

## The Liao-Zigler Two-Stage Approach

The key insight from Liao & Zigler: separate the *design stage* (propensity score estimation for balance) from the *analysis stage* (Bayesian outcome modeling with weights).

**Stage 1**: Fit a Bayesian propensity score model to obtain posterior draws $\tilde{e}^{(s)}(X)$.

**Stage 2**: For each posterior draw $s$, compute IPW weights $w_i^{(s)} = Z_i / \tilde{e}^{(s)}(X_i) + (1-Z_i)/(1-\tilde{e}^{(s)}(X_i))$ and fit the weighted outcome model.

This produces a **posterior distribution for the ATE** that propagates uncertainty from both the propensity score model and the outcome model.

> [!definition] Definition: Bayesian IPW Estimator (Liao & Zigler)
> Given propensity score posterior draws $\{\tilde{e}^{(s)}\}_{s=1}^S$ and outcome model posterior draws, the Bayesian IPW estimate of the ATE is:
> $$\hat{\tau}^{\text{Bayes-IPW}} = \frac{1}{S}\sum_s \left[ \frac{\sum_i Z_i Y_i / \tilde{e}^{(s)}(X_i)}{\sum_i Z_i / \tilde{e}^{(s)}(X_i)} - \frac{\sum_i (1-Z_i) Y_i / (1-\tilde{e}^{(s)}(X_i))}{\sum_i (1-Z_i) / (1-\tilde{e}^{(s)}(X_i))} \right]$$
> ^def-bayes-ipw

## Relationship to Vault's Strategy 3

This approach corresponds to **Strategy 3 (Posterior Predictive P-values)** in [[Propensity Score in Bayesian CI]]: draw posterior samples from both models and plug into the doubly-robust estimator. It provides proper uncertainty quantification while combining Bayesian and Frequentist tools.

## Implementation Notes

- The Heiss blog post implements this in `brms` + Stan (R), using the `tidyverse` stack
- The key practical challenge is ensuring the propensity score model achieves overlap before feeding weights into the outcome model
- Compare with the **feedback problem** in joint modeling: fitting the propensity score and outcome model simultaneously causes the outcome model to distort the propensity score's balancing property

## See Also

- [[Propensity Score in Bayesian CI]] — vault treatment of the three strategies for Bayesian propensity scores (from Li et al. 2022)
- [[General Structure of Bayesian CI]] — why propensity score drops from likelihood under ignorability
- [[Frequentist Causal Estimation]] — frequentist IPW and doubly-robust estimators
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — survey of causal methods including IPW
- [[Clippings/How to use Bayesian propensity scores and inverse probability weights]] — full worked example in R/brms
