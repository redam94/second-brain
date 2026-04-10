---
title: "Bayesian Structural Time-Series Model"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/time-series
  - topic/bayesian-statistics
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§2, pp. 251-258"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Brodersen 2015 - Overview]]"
used_by:
  - "[[Local Linear Trend and Seasonality]]"
  - "[[Spike-and-Slab Prior for Covariate Selection]]"
  - "[[MCMC Inference for CausalImpact]]"
  - "[[Counterfactual Impact Estimation]]"
aliases:
  - structural time-series model
  - BSTS model
  - diffusion-regression model
---

# Bayesian Structural Time-Series Model

> [!summary]
> The Bayesian Structural Time-Series (BSTS) model is a state-space model that decomposes a time series into a local trend, seasonal components, and a regression on contemporaneous covariates (control series). Inference via MCMC produces the posterior predictive distribution over the counterfactual, from which causal impact is derived.

## Overview

The model is defined by two equations: an **observation equation** linking observed data to a latent state, and a **state equation** governing state evolution.

## Main Content

> [!definition] Definition: BSTS State-Space Form
> The model is defined by:
>
> **Observation equation:**
> $$y_t = Z_t^\top \alpha_t + \varepsilon_t, \quad \varepsilon_t \sim \mathcal{N}(0, \sigma_\varepsilon^2) \tag{2.1}$$
>
> **State equation:**
> $$\alpha_{t+1} = T_t \alpha_t + R_t \eta_t, \quad \eta_t \sim \mathcal{N}(0, Q_t) \tag{2.2}$$
>
> **Dimensions:**
> - $y_t$: scalar observed outcome at time $t$
> - $\alpha_t$: $d$-dimensional latent state vector
> - $Z_t$: $d$-dimensional output vector
> - $T_t$: $d \times d$ transition matrix
> - $R_t$: $d \times q$ control matrix
> - $\varepsilon_t$: scalar observation noise with variance $\sigma_\varepsilon^2$
> - $\eta_t$: $q$-dimensional system error with $q \times q$ diffusion matrix $Q_t$, where $q \leq d$
^def-bsts

**Key property:** The state vector $\alpha_t$ is assembled from *independent components* (trend, seasonality, regression), making the model modular. Adding a new component = adding blocks to $Z_t$, $T_t$, $R_t$, $Q_t$.

## State Components

The full state vector is a concatenation of:

| Component | Notes |
|-----------|-------|
| Local trend | See [[Local Linear Trend and Seasonality]] |
| Seasonality | See [[Local Linear Trend and Seasonality]] |
| Static regression | Fixed regression coefficients $\beta_0$ on covariates $x_t$ |
| Dynamic regression | Time-varying coefficients $\beta_{j,t}$ on covariates |

## Static Regression Component

A static linear regression on control series $\mathbf{x}_t$:

$$Z_t = \beta^\top \mathbf{x}_t, \quad \alpha_t = 1$$

This writes the regression contribution in state-space form with $Z_t = \beta^\top \mathbf{x}_t$ and zero variance.

**Key advantage of Bayesian treatment:** The spike-and-slab prior (see [[Spike-and-Slab Prior for Covariate Selection]]) allows automatic selection of which controls to include from potentially tens or hundreds of candidates.

## Dynamic Regression Component

Time-varying coefficients $\beta_{j,t}$ evolve as independent random walks:

$$\mathbf{x}_t^\top \beta_t = \sum_{j=1}^J x_{j,t} \beta_{j,t}, \quad \beta_{j,t+1} = \beta_{j,t} + \eta_{\beta,j,t} \tag{2.6}$$

where $\eta_{\beta,j,t} \sim \mathcal{N}(0, \sigma_{\beta_j}^2)$. Written in state-space form: $Z_t = \mathbf{x}_t$ and $\alpha_t = \beta_t$.

**When to use:** When the relationship between treatment and control series is believed to change over time.

## Prior Distribution on State Variance

Most state components depend on a small set of diffusion variance parameters. The default prior:

$$\frac{1}{\sigma^2} \sim \mathcal{G}\left(\frac{\nu}{2}, \frac{s}{2}\right) \tag{2.7}$$

where $\mathcal{G}(a, b)$ is Gamma with expectation $a/b$. Thus $s/\nu$ is a prior estimate of $\sigma^2$, and $\nu$ is the prior weight in units of sample size.

**Default choice:** $\nu = 1$, $s/\nu = 0.1\sigma_y^2$ (i.e., prior diffusion variance is about 10% of the sample variance).

## Graphical Model (Fig. 2 in paper)

The model shows:
- Pre-intervention period: $y_1, \ldots, y_n$ observed along with controls $x_1, \ldots, x_n$
- Post-intervention period: $\tilde{y}_{n+1}, \ldots, \tilde{y}_m$ are the *unobserved counterfactuals*
- The model is fit on pre-intervention data; posterior predictive distribution gives counterfactuals

## Connections

- Components detailed in [[Local Linear Trend and Seasonality]]
- Variable selection in [[Spike-and-Slab Prior for Covariate Selection]]
- Inference in [[MCMC Inference for CausalImpact]]
- Counterfactual and causal impact derivation in [[Counterfactual Impact Estimation]]

## See Also

- [[Brodersen 2015 - Overview]] — paper context
- [[Local Linear Trend and Seasonality]] — trend and seasonal components
