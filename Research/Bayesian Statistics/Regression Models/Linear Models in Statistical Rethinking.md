---
title: "Linear Models in Statistical Rethinking"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/linear-models
  - type/concept
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Gaussian model"
  - "MAP estimation"
  - "rethinking linear model"
doc_type: concept
source_location: "Statistical Rethinking Ch.9:267-290"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Bayesian Workflow - Overview]]"
used_by:
  - "[[Spurious Association and Confounds]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Monsters and Mixtures]]"
  - "[[Statistical Rethinking - Overview]]"
---

# Linear Models in Statistical Rethinking

> [!summary]
> Chapter 4 of Statistical Rethinking builds Bayesian linear regression from scratch. Why normal distributions arise from addition (CLT), how to write models in mathematical notation and translate to R code, and how to generate posterior predictions with uncertainty intervals.

## Why Normal Distributions Are Normal

The Gaussian distribution arises naturally from **addition** of many small effects (Central Limit Theorem). McElreath demonstrates this with a soccer field simulation: random steps left/right converge to a bell curve regardless of step size distribution.

Two justifications for using Gaussian likelihoods:
1. **Ontological**: many natural measurements are approximately Gaussian because they arise from additive processes
2. **Epistemological**: the Gaussian is the maximum entropy distribution for a given mean and variance — it assumes the least about the data

## The Model Language

A complete Bayesian model specifies likelihood and priors:

$$h_i \sim \text{Normal}(\mu_i, \sigma)$$
$$\mu_i = \alpha + \beta x_i$$
$$\alpha \sim \text{Normal}(178, 100)$$
$$\beta \sim \text{Normal}(0, 10)$$
$$\sigma \sim \text{Uniform}(0, 50)$$

The R `map` function fits this by finding the **maximum a posteriori** (MAP) estimate and approximating the posterior as multivariate Gaussian.

## Prior Predictive Simulation

> [!tip] Always Simulate from Priors First
> Before fitting, simulate predictions from the prior to check that your priors produce sensible outcomes. This is a key step in [[Bayesian Workflow - Overview|Bayesian workflow]].

## Generating Predictions

Three-step recipe for any fitted model:
1. Use `link` to generate posterior distributions of $\mu$ at each predictor value
2. Use `mean`/`HPDI`/`PI` to summarize those distributions
3. Use `sim` to generate full posterior predictions (incorporating $\sigma$)

The **two kinds of uncertainty**:
- **Narrow interval** (around $\mu$): uncertainty about the average outcome at each predictor value
- **Wide interval** (from `sim`): uncertainty about individual observations, including residual variation $\sigma$

## Polynomial Regression

Polynomial models $\mu_i = \alpha + \beta_1 x_i + \beta_2 x_i^2$ can capture curvature but:
- Hard to interpret coefficients
- Better to use a mechanistic model when possible
- Always **standardize** predictors first for numerical stability

## See Also

- [[Bayesian Linear Regression]] — BDA3's treatment (Ch 14), more mathematical
- [[Regression and the CEF]] — the frequentist perspective on regression
- [[Spurious Association and Confounds]] — Ch 5, extending to multiple predictors
- [[Overfitting and Information Criteria]] — Ch 6, when polynomial models go wrong
- [[Statistical Rethinking - Overview]]
- [[Hierarchical Models]] — the multilevel extension of the Gaussian model introduced here; McElreath's "parameters all the way down" (Ch. 12–13)
