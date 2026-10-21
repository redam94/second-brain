---
title: "Design of Dynamic Response Models"
aliases:
  - "Dynamic Marketing Models"
  - "Marketing Time Series Models"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/dynamic-models
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-06-29
folder: "Market Response Models/Dynamic Response Models"
source: "Hanssens, Parsons & Schultz (2001) Ch. 4"
chapter: "4"
status: complete
doc_type: concept
source_location: "Ch. 4, pp. 139-181"
depends_on:
  - "[[Design of Static Response Models]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
used_by:
  - "[[Transfer Function Model]]"
  - "[[Parameter Estimation in Market Response]]"
  - "[[Implementation of Market Response Models]]"
---

# Design of Dynamic Response Models

> [!abstract] Summary
> Dynamic models extend static response models by incorporating time: current sales depend on past advertising, past sales (carryover), and past competitive actions. This note covers the design decisions for dynamic models — order selection, identification of lag structures, and the distinction between short-run and long-run effects.

## From Static to Dynamic

The static model $Q_t = \beta_0 + \beta_1 X_t + \epsilon_t$ assumes marketing effects are fully realized within the measurement period. In practice, advertising creates awareness that decays gradually, price promotions can cause inter-temporal substitution (stockpiling), and distribution gains persist.

Adding dynamics means asking:
1. **How many lags?** Determine maximum lag length $K$
2. **What shape?** Geometric (Koyck), polynomial (Almon), or unrestricted
3. **What type of lagged dependent variable?** Autoregressive, error correction, or pure MA

## The General ADL Framework

Any linear dynamic model can be expressed as an ADL (Autoregressive Distributed Lag):

$$Q_t = \alpha + \sum_{i=1}^r \gamma_i Q_{t-i} + \sum_{k=0}^s \beta_k X_{t-k} + w_t$$

Key design choices:
- **$r$ (AR order)**: test using AIC, BIC, or Ljung-Box test on residuals
- **$s$ (lag order on $X$)**: test using pattern of OLS coefficients or AIC
- **Restrictions**: impose geometric decay (Koyck) or polynomial smoothness (Almon) to reduce parameters

See [[Carryover Effects and Distributed Lags]] for the full specification.

## Identification Strategy

> [!definition] Direct-Lag Identification
> The preferred identification strategy for lag structure is the **direct-lag regression**: estimate an OLS model with many lags of $X$ (and possibly of $Q$), then examine the pattern of estimated coefficients to determine where they cut off vs. die out (analogous to PACF/ACF in ARIMA identification — see [[Single Marketing Time Series]]).
>
> If coefficients cut off sharply after lag $s$: use MA($s$) noise / no autoregression
> If coefficients die out gradually: impose geometric decay (Koyck)
> If coefficients form a smooth hump: use Almon PDL
> ^def-direct-lag

## Short-Run vs. Long-Run Effects

> [!theorem] Distinction of Short and Long Run
> For ADL(1,0): $Q_t = \alpha + \gamma Q_{t-1} + \beta_0 X_t + w_t$
>
> - **Short-run effect (impact multiplier)**: $\beta_0$
> - **Long-run effect (total multiplier)**: $\beta_0 / (1 - \gamma)$
>
> The long-run effect exceeds the short-run effect whenever $\gamma > 0$ (positive carryover). A common error is to report only the short-run coefficient and interpret it as the "advertising elasticity" — this understates the true ROI by a factor of $1/(1-\gamma)$.
> ^thm-sr-lr

## Model Order Selection

| Criterion | Formula | Use |
|-----------|---------|-----|
| AIC | $-2\ln\hat{L} + 2k$ | Minimize; rewards fit, penalizes parameters |
| BIC | $-2\ln\hat{L} + k\ln T$ | Stricter penalty, prefers parsimonious models |
| Adjusted R² | $1-(1-R^2)(T-1)/(T-k-1)$ | Maximize |
| Ljung-Box Q | Tests residual autocorrelation | Diagnostic, not selection |

## Simultaneity and Endogeneity

A key design decision is whether marketing variables are **endogenous** (jointly determined with sales) or **exogenous**. The decision rule (spending = function of lagged sales) means advertising is predetermined but not strictly exogenous. Simultaneity biases OLS — see [[Parameter Estimation in Market Response]] for 2SLS.

## Connecting to ARIMA

Dynamic response models can be written in the ADL form, which relates to the ARIMA framework:

- Noise component of ADL: if $w_t$ follows ARMA($p$,$q$), the model is an **ARMAX**
- Removing the $X$ terms yields pure ARIMA — see [[Single Marketing Time Series]]
- Adding multiple inputs yields the transfer function model — see [[Transfer Function Model]]

## Cross-Links

- Koyck, PDL, ADL details: [[Carryover Effects and Distributed Lags]]
- Transfer function extension: [[Transfer Function Model]]
- Estimation issues: [[Parameter Estimation in Market Response]]
- Time series tools: [[Single Marketing Time Series]]
- Reaction dynamics: [[Reaction Functions and Competitive Dynamics]]

## See Also

- [[Bayesian Structural Time-Series Model]] — state-space alternative for decomposing trend, seasonality, and marketing effects in the same ADL spirit
- [[Hilbert Space Gaussian Processes]] — non-parametric alternative for flexible trend and seasonal decomposition
- [[Instrumental Variables]] — 2SLS motivation for endogenous advertising and price in ADL models
- [[Method of Simulated Moments]] — simulation-based estimation applicable to structural dynamic response models
