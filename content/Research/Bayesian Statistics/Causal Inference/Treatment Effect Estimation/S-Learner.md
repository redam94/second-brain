---
title: "S-Learner"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/treatment-effects
  - topic/machine-learning
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]]"
source_location: "S-Learner section, pp. 4158-4159"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: paper
depends_on:
  - "[[Metalearners for CATE]]"
used_by:
  - "[[Metalearner Simulation Results]]"
aliases:
  - single learner
  - S-RF
---

# S-Learner

> [!summary]
> The S-learner (single learner) estimates the CATE by fitting a single regression model $\hat{\mu}(x, w)$ on all data with the treatment indicator $W$ included as a feature. The CATE estimate is the difference in predictions with $W=1$ vs. $W=0$. Simple to implement but may underperform when base learners regularize the treatment indicator toward zero.

## Overview

The S-learner is the most straightforward metalearner. It treats treatment status $W$ as just another covariate and delegates all structure learning to the base learner.

## Definition and Algorithm

> [!definition] Definition: S-Learner
> **Step 1:** Fit a single response function $\hat{\mu}$ using all observed data:
> $$
> \hat{\mu}(x, w) = \mathbb{E}[Y \mid X = x, W = w]
> $$
> using any supervised learning method that estimates the conditional mean.
>
> **Step 2:** Estimate the CATE as the difference in predictions:
> $$
> \hat{\tau}^S(x) = \hat{\mu}(x, 1) - \hat{\mu}(x, 0)
> $$
^def-s-learner

## Properties and Performance

**Key advantage:**
- Borrows strength across treatment and control groups — all data used in one model
- With linear base learner, $\hat{\mu}(x, w) = \beta_0 + \beta_W w + \beta_X x$ gives $\hat{\tau}^S(x) = \beta_W$ (constant ATE)

**Key weakness:**
- Many ML algorithms (e.g., random forests) regularize features equally. If the treatment effect is small relative to other variation, the treatment indicator $W$ may effectively be shrunk toward zero → $\hat{\tau}^S(x) \approx 0$ even when effects are heterogeneous
- **RF as base learner:** Treatment indicator $W$ assigned the same split probability as $p$ covariates, so it is selected $\approx 1/(p+1)$ of the time → treatment effect underestimated proportionally

**When S-learner performs well:**
- Treatment effect is constant (or close to constant) and truly small
- The CATE function is simpler than either response function
- Large datasets where regularization pressure is low

**When it fails:**
- Highly heterogeneous CATE
- Base learner regularizes features to zero (random forests, LASSO)
- Propensity score far from 0.5

## Illustration (Fig. 1A, 1B)

In a simple example with one covariate $x \in [-1, 1]$ and piecewise linear $\tau(x)$:
- $\hat{\mu}_0(x)$ (blue) fits the control group — matches data well
- $\hat{\mu}_1(x)$ (dashed) fits the treated group — but without borrowing, it is relatively poor
- The S-learner combines both, producing smoother but potentially biased $\hat{\tau}^S$

## Connections

- Part of [[Metalearners for CATE]] framework
- Contrast with [[T-Learner and Minimax Rate]] (separate models) and [[X-Learner]] (two-stage imputation)
- [[Nonparametric Causal Inference]] — BART S-learner is common in Bayesian causal inference

## See Also

- [[Metalearners for CATE]] — framework context
- [[T-Learner and Minimax Rate]] — next level: separate models per arm
- [[X-Learner]] — most sophisticated metalearner
