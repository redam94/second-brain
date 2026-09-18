---
title: "Counterfactual Impact Estimation"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/time-series
  - topic/bayesian-statistics
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§2.4, pp. 260-261"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[MCMC Inference for CausalImpact]]"
  - "[[Bayesian Structural Time-Series Model]]"
used_by:
  - "[[CausalImpact Empirical Application]]"
aliases:
  - CausalImpact estimation
  - causal effect time series
  - pointwise causal impact
  - cumulative causal impact
---

# Counterfactual Impact Estimation

> [!summary]
> Given posterior predictive samples of the counterfactual time series, causal impact is estimated as the difference between observed outcomes and predicted counterfactuals. Three quantities are reported: (1) pointwise impact $\phi_t$, (2) cumulative impact, and (3) running average impact. All are distributions (not point estimates) with credible intervals.

## Overview

The core idea: after fitting the BSTS model on pre-intervention data, the model is used to *predict* what would have happened in the absence of the intervention. The causal effect is the difference between observed outcomes and these counterfactual predictions.

## Definitions

> [!definition] Definition: Pointwise Causal Impact
> For each posterior draw $\tau$ and each post-intervention time point $t = n+1, \ldots, m$:
>
> $$\phi_t^{(\tau)} := y_t - \tilde{y}_t^{(\tau)} \tag{2.15}$$
>
> where $y_t$ is the observed outcome and $\tilde{y}_t^{(\tau)}$ is the $\tau$-th draw from the posterior predictive counterfactual distribution.
>
> The collection $\{\phi_t^{(\tau)}\}_\tau$ yields the posterior predictive density of the causal effect at each time point.
^def-pointwise-impact

> [!definition] Definition: Cumulative Causal Impact
> The cumulative effect of the intervention from $t = n+1$ through $t$:
>
> $$\sum_{t'=n+1}^{t} \phi_{t'}^{(\tau)} \quad \forall t = n+1, \ldots, m \tag{2.16}$$
>
> **When to use:** Appropriate when $y_t$ is a **flow** variable — measured over an interval (e.g., number of searches per day, sales per week).
>
> **When NOT to use:** Inappropriate for **stock** variables (e.g., total subscribers at a point in time) — use running average instead.
^def-cumulative-impact

> [!definition] Definition: Running Average Causal Impact
> The average causal effect per time period from $t = n+1$ through $t$:
>
> $$\frac{1}{t-n} \sum_{t'=n+1}^{t} \phi_{t'}^{(\tau)} \quad \forall t = n+1, \ldots, m \tag{2.17}$$
>
> **Always interpretable** regardless of whether $y_t$ is a flow or stock.
>
> **Caution:** As the forecasting period grows, probability intervals widen (more uncertain predictions further in the future), so the running average's uncertainty increases even as the estimate stabilizes in expectation.
^def-running-average

## Posterior Summary

For each quantity, the standard Bayesian summary is:
- **Point estimate:** Posterior mean = average over $\tau$ draws
- **Uncertainty:** Central 95% posterior probability interval (not a confidence interval)
- **Significance test:** Effect is "significant" if the 95% PI excludes zero

## Temporal Structure of Uncertainty

A key feature: prediction intervals **widen progressively** as we forecast further post-intervention. This is because:
1. The local linear trend $\delta_t$ drifts as a random walk → future trend increasingly uncertain
2. The longer the campaign period, the more the counterfactual can diverge from the true outcome

This is appropriate: we genuinely know less about what would have happened further in the future.

**Implication for estimation accuracy:** The absolute percentage estimation error increases with forecasting horizon (see Fig. 4a in paper). Structural breaks (sudden changes in the DGP) accelerate this degradation.

## Connection to Difference-in-Differences

The pointwise impact $\phi_t$ is the time-series analog of the DiD estimate $(\bar{y}_{post}^{treat} - \bar{y}_{pre}^{treat}) - (\bar{y}_{post}^{control} - \bar{y}_{pre}^{control})$. CausalImpact generalizes this by:
- Modeling the full counterfactual trajectory (not just pre/post means)
- Incorporating temporal autocorrelation
- Using a spike-and-slab prior to select which controls matter

## Connections

- Draws $\tilde{y}_t^{(\tau)}$ come from [[MCMC Inference for CausalImpact]]
- Applied in [[CausalImpact Empirical Application]]
- Generalizes [[Differences-in-Differences]] to time series
- Conceptually related to [[Counterfactual Inference]] (existing vault note on BART counterfactuals)

## See Also

- [[MCMC Inference for CausalImpact]] — how counterfactual draws are generated
- [[CausalImpact Empirical Application]] — how these quantities are reported in practice
- [[Bayesian Structural Time-Series Model]] — the model being predicted from
- [[Forecast Evaluation and Backtesting]] — placebo backtests of the counterfactual forecast
