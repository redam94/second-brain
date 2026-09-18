---
title: "MCMC Inference for CausalImpact"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - topic/time-series
  - topic/mcmc
  - type/concept
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§2.3, pp. 258-260"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Local Linear Trend and Seasonality]]"
  - "[[Spike-and-Slab Prior for Covariate Selection]]"
used_by:
  - "[[Counterfactual Impact Estimation]]"
  - "[[The Kalman Filter]]"
aliases:
  - Gibbs sampler CausalImpact
  - Kalman filter smoother BSTS
  - posterior inference BSTS
---

# MCMC Inference for CausalImpact

> [!summary]
> Posterior inference in the BSTS model uses a Gibbs sampler that alternates between a data-augmentation step (sampling states $\alpha$ given parameters $\theta$, using the Kalman filter and fast mean smoother) and a parameter-simulation step (sampling $\theta$ given states, with the spike-and-slab Gibbs draw for variable selection). The algorithm is linear in the number of time points and runs in < 30 seconds for typical datasets.

## Overview

The posterior $p(\theta, \alpha \mid \mathbf{y})$ is not available in closed form due to the spike-and-slab prior. The Gibbs sampler alternates two steps:

## Gibbs Sampler Steps

### Step 1 — Data Augmentation (State Simulation)

Sample the full state sequence $\alpha = (\alpha_1, \ldots, \alpha_m)$ given parameters $\theta$ and data $\mathbf{y}_{1:n}$:

$$
(\alpha \mid \mathbf{y}_{1:n}, \theta)
$$

**Algorithm:** Uses the simulation smoother of Durbin & Koopman (2002), which improves on the earlier forward-filtering, backward-sampling algorithms (Carter & Kohn 1994, Frühwirth-Schnatter 1994).

**Key property:** Because $p(\mathbf{y}_{1:n} \mid \alpha, \theta)$ is jointly multivariate Gaussian, the variance of $p(\alpha \mid \mathbf{y}_{1:n}, \theta)$ does not depend on $\mathbf{y}_{1:n}$. The sampler:
1. Generates $(\tilde{y}_{1:n}^*, \alpha^*) \sim p(\mathbf{y}_{1:n}, \alpha \mid \theta)$
2. Subtracts $E(\alpha^* \mid \tilde{y}_{1:n}^*, \theta)$ to get zero-mean noise
3. Adds $E(\alpha \mid \mathbf{y}_{1:n}, \theta)$ (via Kalman filter) to restore the correct mean

**Computational complexity:** Linear in $m$ (total time points, pre + post), quadratic in $d$ (state dimension). For $m = 500$, $J = 10$ covariates, 10,000 iterations: < 30 seconds.

### Step 2 — Parameter Simulation

Sample $\theta = (\sigma^2_\mu, \sigma^2_\delta, \ldots, \varrho, \beta, \sigma^2_\varepsilon)$ given states $\alpha$ and data.

**For variance parameters** ($\sigma^2_\mu$, $\sigma^2_\delta$, etc.): Because error terms $\eta_t = \alpha_{t+1} - T_t \alpha_t$ are available given $\alpha$, the posterior is Gamma by conjugacy (from the inverse-Gamma prior in Eq. 2.7).

**For static regression coefficients** ($\varrho$, $\beta_\varrho$, $\sigma^2_\varepsilon$): Gibbs sampling from the spike-and-slab posterior (see [[Spike-and-Slab Prior for Covariate Selection]]). Each $\varrho_j$ is drawn independently given $\varrho_{-j}$, then $\beta_\varrho \mid \varrho, \sigma^2_\varepsilon$ and $1/\sigma^2_\varepsilon \mid \varrho, \beta_\varrho$ are drawn using conjugate formulae.

## Posterior Predictive Simulation

After fitting the model on pre-intervention data $\mathbf{y}_{1:n}$, the key quantity is the **posterior predictive distribution over counterfactuals**:

$$
p(\tilde{\mathbf{y}}_{n+1:m} \mid \mathbf{y}_{1:n}, \mathbf{x}_{1:m}) \tag{2.14}
$$

This is the distribution of what would have happened had no intervention occurred. It:
- Is conditioned only on pre-intervention outcomes and all control series (not on parameter estimates)
- Integrates out all $\beta$ and $\sigma^2_\varepsilon$ — no commitment to any particular set of covariates
- Is a **joint** distribution over all post-intervention time points (not a collection of marginals) — preserves serial correlation

**Sampling:** Each Gibbs iteration draws a complete counterfactual trajectory $\tilde{\mathbf{y}}_{n+1:m}^{(\tau)}$ using the Kalman filter run forward through the post-intervention period.

## Why Integrating Out Parameters Matters

- Integrating out $\beta$ and $\sigma^2_\varepsilon$ means **no arbitrary covariate selection** — the posterior predictive averages over all candidate subsets weighted by posterior probability
- Integrating out $\sigma^2_\varepsilon$ means no commitment to point estimates of noise — full propagation of uncertainty
- The result is wider but properly calibrated uncertainty intervals

## Connections

- Uses [[Local Linear Trend and Seasonality]] Kalman filter/smoother
- Uses [[Spike-and-Slab Prior for Covariate Selection]] Gibbs update for $\varrho$
- Output feeds [[Counterfactual Impact Estimation]]
- Same MCMC paradigm as [[MCMC Basics]] (Gibbs sampling)

## See Also

- [[Bayesian Structural Time-Series Model]] — model being inferred
- [[Counterfactual Impact Estimation]] — how posterior predictive draws are used
- [[The Kalman Filter]] — the simulation smoother builds on the Kalman recursion
- [[Brodersen 2015 - Overview]] — paper overview and empirical application context
- [[CausalImpact Empirical Application]] — applied use of this inference algorithm
- [[Fitting and Validating Computation]] — SBC and fake-data checks for validating MCMC algorithms like this one
- [[MCMC Basics]] — Gibbs sampling theory underlying Step 1 and Step 2
