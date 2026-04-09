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
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
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

- [[Regression and the CEF]]
- [[Mostly Harmless Econometrics - Overview]]
