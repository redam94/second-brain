---
title: Quantile Regression
aliases:
  - QTE
  - Quantile Treatment Effects
tags:
  - source/ingested
  - topic/econometrics
  - topic/regression
  - topic/distributional-effects
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Extensions"
doc_type: concept
source_location: "MHE Ch. 7, pp. 203-219"
depends_on:
  - "[[Regression and the CEF]]"
  - "[[Local Average Treatment Effects]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Mostly Harmless Econometrics - Overview]]"
  - "[[Discrete Choice Models]]"
  - "[[Conformalized Quantile Regression]]"
  - "[[Conformal Prediction - Overview]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
---

# Quantile Regression

> [!summary]
> Quantile regression models the effect of covariates on different parts of the outcome distribution, not just the mean. It reveals whether treatment compresses or expands the distribution — information invisible to standard (mean) regression.

## Motivation

- 95% of applied econometrics focuses on averages, but distributions matter
- Wage inequality: upper quantiles rising, lower quantiles falling
- A training program might raise average wages but only help those at the top

## The Quantile Regression Model

The $\tau$-th conditional quantile:
$$Q_\tau(Y_i|X_i) = X_i'\beta(\tau)$$

Estimated by minimizing:
$$\min_b \sum_i \rho_\tau(Y_i - X_i'b)$$

where $\rho_\tau(u) = u(\tau - 1(u < 0))$ is the check function.

## Quantile Treatment Effects (QTE)

For binary treatment $D_i$:
$$QTE(\tau) = Q_\tau(Y_{1i}) - Q_\tau(Y_{0i})$$

> [!warning] QTE ≠ Effect on Individuals at Quantile τ
> The QTE compares the τ-th quantile of the treated distribution with the τ-th quantile of the untreated distribution. The people at quantile τ may be *different individuals* in each group.

## The Approximation Property

Just as regression approximates the CEF, quantile regression approximates the conditional quantile function — even when the linear model is misspecified, it provides a useful weighted average of quantile partial effects.

## See Also

- [[Regression and the CEF]] — mean regression as the baseline to compare against
- [[Local Average Treatment Effects]] — LATE vs QTE: both are local/distributional, not ATE
- [[Bayesian Linear Regression]] — Bayesian quantile regression uses asymmetric Laplace likelihood
- [[Discrete Choice Models]] — another approach to modeling non-mean outcomes
- [[Mostly Harmless Econometrics - Overview]]
- [[Conformalized Quantile Regression]] — gives quantile regression a finite-sample predictive coverage guarantee
- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — pinball loss is a proper score for quantiles
- [[Generalized Random Forests - Local Moment Equations]] — nonparametric quantile forests
