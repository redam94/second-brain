---
title: "Local Linear Trend and Seasonality"
tags:
  - source/ingested
  - topic/time-series
  - topic/bayesian-statistics
  - type/definition
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§2.1, pp. 252-254"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Bayesian Structural Time-Series Model]]"
used_by:
  - "[[MCMC Inference for CausalImpact]]"
aliases:
  - local linear trend model
  - state-space trend
  - seasonal component BSTS
---

# Local Linear Trend and Seasonality

> [!summary]
> The BSTS model decomposes trend as a local linear trend with a stochastic slope (random walk with drift) and seasonality as a sum-to-zero constraint over $S$ seasons. Both are modular state-space components that can be combined independently. The local linear trend adapts quickly to short-term variation but can produce implausibly wide uncertainty for long-horizon predictions.

## Local Linear Trend

> [!definition] Definition: Local Linear Trend
> The level $\mu_t$ and slope $\delta_t$ evolve as:
>
> $$
> \mu_{t+1} = \mu_t + \delta_t + \eta_{\mu,t}, \quad \eta_{\mu,t} \sim \mathcal{N}(0, \sigma_\mu^2) \tag{2.3}
> $$
> $$
> \delta_{t+1} = \delta_t + \eta_{\delta,t}, \quad \eta_{\delta,t} \sim \mathcal{N}(0, \sigma_\delta^2)
> $$
>
> - $\mu_t$: current level (value of trend at time $t$)
> - $\delta_t$: slope (expected increment in $\mu$ per time step)
>
> Both the level and slope evolve as random walks.
^def-local-linear-trend

**Interpretation:**
- $\sigma_\mu^2$ controls level noise — how quickly the trend level jumps
- $\sigma_\delta^2$ controls slope noise — how quickly the trend slope changes

**Trade-off:** Very flexible (adapts to local variation), but produces wide prediction intervals for long-horizon forecasting since the slope itself drifts.

## Generalization: AR(1) Slope

A more stable variant allows the slope to exhibit AR(1) variation around a long-term slope $D$:

$$
\mu_{t+1} = \mu_t + \delta_t + \eta_{\mu,t}
$$
$$
\delta_{t+1} = D + \rho(\delta_t - D) + \eta_{\delta,t} \tag{2.4}
$$

where $|\rho| < 1$ is the learning rate. This model balances short-term local variation with a long-term slope $D$, preventing the slope from drifting without bound.

## Seasonality Component

> [!definition] Definition: Seasonal State Component
> For $S$ seasons, the seasonal effect $\gamma_t$ evolves as:
>
> $$
> \gamma_{t+1} = -\sum_{s=0}^{S-2} \gamma_{t-s} + \eta_{\gamma,t} \tag{2.5}
> $$
>
> where $S$ is the number of seasons per period and $\gamma_t$ denotes their joint contribution to the observed response.
>
> **Key property:** The mean of $\gamma_{t+1}$ is zero when summed over $S$ seasons — this is the sum-to-zero seasonal constraint.
^def-seasonality

**Example:** For monthly seasonality ($S = 12$), each new month's seasonal effect is minus the sum of the previous 11 months' effects, plus noise.

**Transition matrix $T_t$ for seasonality:** An $(S-1) \times (S-1)$ matrix with $-1$'s along the top row, $1$'s along the subdiagonal, and $0$'s elsewhere.

**Multiple seasonal periods:** For daily data, one might include $S=7$ (day-of-week) and $S=52$ (annual). The $S=52$ cycle: set $T_t = I_{S-1}$ when not a new week, standard seasonal matrix when starting a new week.

## Combining Components

The full state vector $\alpha_t$ concatenates all components:
$$
\alpha_t = (\mu_t, \delta_t, \gamma_t, \gamma_{t-1}, \ldots, \beta_t, \ldots)^\top
$$

The overall matrices $T_t$, $R_t$, $Q_t$ become **block-diagonal** with one block per component (assuming independent component errors).

## Choosing Components in Practice

- **Always include:** Local level (at minimum $\sigma_\delta^2 = 0$ gives random walk)
- **Seasonality:** Include when seasonal pattern is obvious by inspection
- **Trend:** Include local linear trend for data with visible trend; use AR(1) slope for longer-range forecasting
- **Static vs. dynamic regression:** Static when treatment-control relationship is stable; dynamic when relationship changes over time

## Connections

- Components of [[Bayesian Structural Time-Series Model]]
- Fits are used in [[MCMC Inference for CausalImpact]] (Kalman filter/smoother)
- The resulting counterfactual prediction drives [[Counterfactual Impact Estimation]]

## See Also

- [[Bayesian Structural Time-Series Model]] — full state-space setup
- [[MCMC Inference for CausalImpact]] — how these components are estimated
