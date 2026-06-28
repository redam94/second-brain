---
title: "State-Space Models and the Kalman Filter - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - type/overview
  - doc/textbook
source: "[[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]]"
source_location: "Ch. 1, 4, 8, 12; pp. 51-62, 134-140, 174-188"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter"
doc_type: textbook
depends_on: []
used_by:
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[The Kalman Filter]]"
  - "[[The RTS Smoother]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
aliases:
  - Kalman filter overview
  - Bayesian filtering and smoothing overview
  - state-space overview
---

# State-Space Models and the Kalman Filter - Overview

> [!summary]
> A **state-space model** describes a time series through a hidden Markov state that evolves over time (the *transition equation*) and is observed only noisily (the *observation equation*). **Bayesian filtering** computes the posterior of the state given past data via a recursive **predict → update** cycle; for the **linear-Gaussian** case this cycle has a closed form — the **Kalman filter**. The backward **RTS smoother** refines those estimates using all the data, and the filter's by-product, the **prediction-error decomposition**, yields the marginal likelihood that makes MCMC over model parameters tractable. This is the machinery underneath [[Bayesian Structural Time-Series Model]].

## Overview

This folder ingests the linear-Gaussian core of Särkkä (2013), *Bayesian Filtering and Smoothing*. The four companion notes build a single recursive pipeline:

1. [[Linear-Gaussian State-Space Models]] — the model: a Markovian latent state with a linear transition and a linear-Gaussian observation. Defines every symbol.
2. [[The Kalman Filter]] — the forward recursion: `predict` (Chapman–Kolmogorov) then `update` (Bayes' rule), giving the filtering distribution $p(\mathbf{x}_k \mid \mathbf{y}_{1:k})$ in closed form.
3. [[The RTS Smoother]] — the backward recursion: a second pass that conditions each state on the *entire* data record $\mathbf{y}_{1:T}$, giving $p(\mathbf{x}_k \mid \mathbf{y}_{1:T})$.
4. [[Marginal Likelihood via the Kalman Filter]] — the filter's innovations $\mathbf{v}_k$ and their covariances $\mathbf{S}_k$ factor the likelihood $p(\mathbf{y}_{1:T} \mid \boldsymbol\theta)$, enabling MAP estimation, MCMC, and EM over parameters $\boldsymbol\theta$.

## Main Content

> [!abstract] The recursive pipeline
> The general probabilistic state-space model (Särkkä Def. 4.1) is
> $$
> \mathbf{x}_k \sim p(\mathbf{x}_k \mid \mathbf{x}_{k-1}), \qquad \mathbf{y}_k \sim p(\mathbf{y}_k \mid \mathbf{x}_k).
> $$
> The **Bayesian filtering equations** (Särkkä Thm. 4.1) compute the filtering distribution recursively:
> - **Predict** (Chapman–Kolmogorov): $p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1}) = \int p(\mathbf{x}_k \mid \mathbf{x}_{k-1})\, p(\mathbf{x}_{k-1} \mid \mathbf{y}_{1:k-1})\, \mathrm{d}\mathbf{x}_{k-1}$
> - **Update** (Bayes): $p(\mathbf{x}_k \mid \mathbf{y}_{1:k}) = \tfrac{1}{Z_k}\, p(\mathbf{y}_k \mid \mathbf{x}_k)\, p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1})$
>
> When the model is linear-Gaussian, every distribution stays Gaussian and these integrals collapse to matrix algebra — the **Kalman filter** (forward) and **RTS smoother** (backward).
^pipeline

> [!note] Why state-space form matters
> - **Constant cost per step.** Naïve Bayes over the full joint $p(\mathbf{x}_{0:T} \mid \mathbf{y}_{1:T})$ costs more at every new observation; the recursive filter does $O(1)$ work per time step.
> - **Modularity.** Independent state components (level, slope, seasonal, regression) stack as block-diagonal $\mathbf{A}$, $\mathbf{Q}$ and concatenated $\mathbf{H}$ — exactly how [[Local Linear Trend and Seasonality]] assembles a BSTS model.
> - **Tractable likelihood.** The prediction-error decomposition (see [[Marginal Likelihood via the Kalman Filter]]) gives $p(\mathbf{y}_{1:T} \mid \boldsymbol\theta)$ analytically, so parameter inference (MAP / MCMC / EM) needs only the filter.
^why

## Examples

The running example across these notes is the **Gaussian random walk plus noise** (local level model), Särkkä Examples 4.1, 4.2, 8.1, 12.1:
$$
x_k = x_{k-1} + q_{k-1}, \quad q_{k-1}\sim\mathcal{N}(0,Q); \qquad y_k = x_k + r_k, \quad r_k\sim\mathcal{N}(0,R).
$$
It is filtered in [[The Kalman Filter]], smoothed in [[The RTS Smoother]], and has its noise variance $R$ inferred in [[Marginal Likelihood via the Kalman Filter]]. This is the simplest BSTS state component.

## Connections

- [[Linear-Gaussian State-Space Models]] — formal model definition
- [[The Kalman Filter]] — forward predict/update recursion
- [[The RTS Smoother]] — backward smoothing recursion
- [[Marginal Likelihood via the Kalman Filter]] — likelihood and parameter inference
- [[Bayesian Structural Time-Series Model]] — the applied state-space model this machinery powers
- [[Local Linear Trend and Seasonality]] — concrete state components in Kalman form

## See Also

- [[MCMC Inference for CausalImpact]] — uses a simulation smoother (Durbin–Koopman) closely related to the RTS pass
- [[Single Marketing Time Series]] — ARIMA-based univariate alternative
- [[Hilbert Space Gaussian Processes]] — GPs admit equivalent state-space (Kalman) representations
