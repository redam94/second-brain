---
title: "Spike-and-Slab Prior for Covariate Selection"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - topic/causal-inference
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§2.2, pp. 255-258"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Bayesian Structural Time-Series Model]]"
used_by:
  - "[[MCMC Inference for CausalImpact]]"
aliases:
  - spike-and-slab prior
  - Bayesian variable selection BSTS
  - Zellner g-prior
---

# Spike-and-Slab Prior for Covariate Selection

> [!summary]
> The spike-and-slab prior enables automatic selection of which control time series to include in the regression component of the BSTS model. The "spike" places point mass at zero (a variable is excluded); the "slab" is a weakly informative Gaussian for included variables. A Gibbs sampler updates the binary inclusion vector jointly with regression coefficients, allowing selection from tens or hundreds of candidates without overfitting.

## Overview

When constructing a synthetic control, there may be many candidate predictor series. Including all of them would cause overfitting; pre-selecting a subset requires strong domain knowledge. The spike-and-slab prior provides an automatic Bayesian solution.

## Main Content

> [!definition] Definition: Spike-and-Slab Prior
> Let $\varrho = (\varrho_1, \ldots, \varrho_J)$ be binary inclusion indicators, where $\varrho_j = 1$ if $\beta_j \neq 0$ and $\varrho_j = 0$ otherwise. The full prior factorizes as:
>
> $$
> p(\varrho, \beta, 1/\sigma_\varepsilon^2) = p(\varrho) \cdot p(\sigma_\varepsilon^2 \mid \varrho) \cdot p(\beta_\varrho \mid \varrho, \sigma_\varepsilon^2) \tag{2.8}
> $$
>
> **Spike (inclusion probability):**
> $$
> p(\varrho) = \prod_{j=1}^J \pi_j^{\varrho_j} (1 - \pi_j)^{1-\varrho_j} \tag{2.9}
> $$
> where $\pi_j$ is the prior probability of including predictor $j$.
>
> **Slab (Gaussian prior for included coefficients):**
> $$
> \beta_\varrho \mid \varrho, \sigma_\varepsilon^2 \sim \mathcal{N}(\mathbf{b}_\varrho, \sigma_\varepsilon^2 (\Sigma_\varrho^{-1})^{-1}) \tag{2.10}
> $$
>
> **Inverse-Gamma prior on error variance:**
> $$
> \frac{1}{\sigma_\varepsilon^2} \sim \mathcal{G}\left(\frac{\nu_\varepsilon}{2}, \frac{s_\varepsilon}{2}\right) \tag{2.11}
> $$
^def-spike-slab

## Setting the Inclusion Prior $\pi_j$

Rather than setting $\pi_j$ individually, the recommended approach is to elicit an **expected model size** $M$ and set:

$$\pi_j = \frac{M}{J}$$

This scales naturally with $J$ (total number of predictors) and avoids having to specify a hierarchical prior.

**Special cases:**
- $\pi_j = 1$: Force predictor $j$ into the model
- $\pi_j = 0$: Force predictor $j$ out of the model

## Zellner's g-Prior for the Slab

The precision matrix $\Sigma^{-1}$ in equation (2.10) uses a **g-prior** (Zellner 1986):

$$\Sigma^{-1} = \frac{g}{n} \left\{ w X^\top X + (1 - w) \text{diag}(X^\top X) \right\} \tag{2.12}$$

- $g$: number of observations worth of prior weight; default $g = 1$
- $w$: mixing weight between $X^\top X$ (full correlation structure) and diagonal (independent); default $w = 0.5$
- $n$: number of observations

**Interpretation:** $g$ observations worth of prior information; $g/n \cdot X^\top X$ is the prior information matrix. The averaging with the diagonal ensures propriety when $X^\top X$ is not positive definite.

## Sufficient Statistics for Posterior Sampling

Given the spike-and-slab structure, the posterior sufficient statistics for $(\varrho, \beta, \sigma_\varepsilon^2)$ are:

$$V_\varrho^{-1} = (X^\top X)_\varrho + \Sigma_\varrho^{-1}, \quad \tilde{\beta}_\varrho = (V_\varrho^{-1})^{-1}(X_\varrho^\top \dot{y}_{1:n} + \Sigma_\varrho^{-1} b_\varrho) \tag{2.13}$$

$$N = \nu_\varepsilon + n, \quad S_\varrho = s_\varepsilon + \dot{y}_{1:n}^\top \dot{y}_{1:n} + b_\varrho^\top \Sigma_\varrho^{-1} b_\varrho - \tilde{\beta}_\varrho^\top V_\varrho^{-1} \tilde{\beta}_\varrho$$

These are updated efficiently in the Gibbs sampler by drawing each $\varrho_j$ given $\varrho_{-j}$ (all others fixed).

## Computational Efficiency

Each full-conditional $p(\varrho_j \mid \varrho_{-j}, \ldots)$ evaluates easily because $\varrho_j$ takes only two values. The dimension of matrices in (2.13) is $\sum_j \varrho_j$ (number of included variables), which is small if the model is truly sparse. Thus even with hundreds of candidates, the algorithm is fast.

## Connections

- Used by [[MCMC Inference for CausalImpact]] — Gibbs sampler updates $\varrho$
- Part of [[Bayesian Structural Time-Series Model]] — applies to the static regression component
- Related to [[Nonparametric Models Overview]] — different approach to regularization
- In the advertising application ([[CausalImpact Empirical Application]]), expected model size $M = 3$ with $R^2 \approx 0.8$ expected

## See Also

- [[Bayesian Structural Time-Series Model]] — full model
- [[MCMC Inference for CausalImpact]] — how this prior is sampled
