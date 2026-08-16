---
title: "Bayesian Propensity Scores and Inverse Probability Weighting"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/tutorial
source: "https://www.andrewheiss.com/blog/2021/12/18/bayesian-propensity-scores-weights/"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: concept
source_location: "Full blog post (Heiss 2021)"
depends_on:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[General Structure of Bayesian CI]]"
used_by:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Bayesian Outcome Models]]"
  - "[[General Structure of Bayesian CI]]"
aliases:
  - Bayesian IPW
  - Liao-Zigler method
---

# Bayesian Propensity Scores and Inverse Probability Weighting

> [!summary]
> Andrew Heiss (2021) translates the Liao & Zigler two-stage Bayesian propensity score method into `brms`/Stan. The core tension: under ignorability, the propensity score $e(x) = \Pr(Z=1\mid X)$ drops from the Bayesian likelihood, so classical frequentist IPW cannot be naively applied in a Bayesian framework. Liao & Zigler resolve this with a **two-stage procedure** that propagates uncertainty from the design stage (propensity model) into the analysis stage (outcome model).

## The Core Problem

Robins, Hernán & Wasserman (2007) showed that *Bayesian inference must ignore the propensity score*: conditioning on the propensity score in the likelihood is unnecessary under ignorability. This means classical IPW — weighting observations by $1/e(x)$ estimated in a first stage — cannot be straightforwardly embedded in a Bayesian posterior.

## The Liao-Zigler Two-Stage Solution

1. **Design stage**: fit a Bayesian propensity model $\Pr(Z=1 \mid X)$ and draw posterior samples of $e(x)$.
2. **Analysis stage**: for each posterior draw of propensity scores, compute IPTW weights and fit a weighted Bayesian outcome model.
3. **Propagation**: uncertainty from stage 1 is carried through to the outcome model posterior, giving full Bayesian uncertainty quantification over the ATE.

This avoids the "ignore the propensity score" critique by treating the propensity as a latent quantity with posterior uncertainty rather than a fixed plug-in weight.

## Implementation (brms/Stan)

The Heiss tutorial implements the two stages using `brms`:
- Stage 1: logistic Bayesian model for treatment given confounders
- Stage 2: weighted linear Bayesian model for outcome, using posterior propensity draws as weights
- Integration over stage-1 uncertainty via nested posterior sampling

## Connections

- [[Propensity Score in Bayesian CI]] — the theoretical framework (Li et al. 2022 review)
- [[General Structure of Bayesian CI]] — why the propensity drops from the Bayesian likelihood
- [[Bayesian Outcome Models]] — outcome modeling that avoids the propensity altogether
- [[Frequentist Causal Estimation]] — the classical IPW approach this Bayesianizes

## See Also

- Liao & Zigler (2020) — the epidemiology paper this tutorial implements
- Saarela et al. — earlier work on Bayesian propensity approaches
