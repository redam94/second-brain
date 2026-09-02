---
title: "Single Marketing Time Series"
aliases:
  - "ARIMA Marketing"
  - "Univariate Time Series Marketing"
  - "Box-Jenkins Marketing"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/time-series
  - topic/ARIMA
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 6"
chapter: "6"
status: complete
doc_type: concept
source_location: "Ch. 6, pp. 251-284"
depends_on:
  - "[[Markets Data and Sales Drivers]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Design of Dynamic Response Models]]"
used_by:
  - "[[Transfer Function Model]]"
  - "[[Multivariate Persistence and Cointegration]]"
date_ingested: 2026-04-11
folder: "Market Response Models/Time Series Analysis"
---

# Single Marketing Time Series

> [!abstract] Summary
> Chapter 6 applies Box-Jenkins ARIMA methodology to individual marketing time series (sales, advertising, price). The goal is to characterize the within-series stochastic structure before modeling inter-series relationships (Ch.7). Covers stationarity, ACF/PACF diagnostics, AR/MA/ARMA/ARIMA model families, and Box-Cox transformation.

## Two-Step Extraction Framework

Every marketing time series $Z_t$ can be decomposed:
1. **Remove deterministic components**: trend, seasonality, cyclicality, heteroscedasticity
2. **Model stochastic component**: the residual $z_t$ as ARMA

> [!definition] Stationarity
> A time series $\{z_t\}$ is **weakly stationary** (covariance-stationary) if:
>
> $$E(z_t) = \mu \quad \forall t \tag{Eq 6.5}$$
> $$\text{Var}(z_t) = \sigma^2_z \quad \forall t \tag{Eq 6.6}$$
> $$\text{Cov}(z_t, z_{t+k}) = \gamma_k \quad \text{depends only on lag } k$$
>
> Non-stationarity (unit root) requires differencing before ARMA modeling.
> ^def-stationarity

## Deterministic Components

Four types that must be removed before modeling the stochastic component:

| Component | Type | Treatment |
|-----------|------|-----------|
| Trend | Linear or nonlinear | Differencing or detrending |
| Seasonality | Regular, periodic | Seasonal dummies or seasonal differencing |
| Cyclicality | Business cycle | Differencing at cycle frequency |
| Heteroscedasticity | Variance changes with level | Box-Cox transformation |

## Yule's Linear Filter / ARMA Representation

> [!theorem] Linear Filter
> Any stationary ARMA process is a linear filter of white noise:
>
> $$z_t = \Psi(L) w_t = \sum_{j=0}^{\infty} \psi_j w_{t-j} \tag{Eq 6.10}$$
>
> where $w_t \sim \text{WN}(0, \sigma^2_w)$ and $\Psi(L) = 1 + \psi_1 L + \psi_2 L^2 + \cdots$ is a (possibly infinite) lag polynomial.
>
> The general ARMA form (Eq 6.11):
> $$\Phi(L) z_t = \Theta(L) w_t$$
> $$\Phi(L) = 1 - \phi_1 L - \cdots - \phi_p L^p \quad \text{(AR polynomial)}$$
> $$\Theta(L) = 1 - \theta_1 L - \cdots - \theta_q L^q \quad \text{(MA polynomial)}$$
> ^thm-linear-filter

## ACF and PACF

> [!definition] Sample ACF and PACF
> **Autocorrelation function (ACF)**:
> $$r_k = \frac{\sum_{t=k+1}^T (z_t - \bar{z})(z_{t-k} - \bar{z})}{\sum_{t=1}^T (z_t - \bar{z})^2} \tag{Eq 6.27}$$
>
> **Approximate variance of $r_k$** (Bartlett):
> $$\text{Var}(r_k) \approx \frac{1}{T}\left(1 + 2\sum_{v=1}^{k-1} \rho_v^2\right) \tag{Eq 6.28}$$
>
> **Partial autocorrelation function (PACF)**: $\phi_{kk}$ = the coefficient on $z_{t-k}$ in an AR($k$) regression on $z_t, z_{t-1}, \ldots, z_{t-k}$. Captures the direct effect at lag $k$, removing effects of intermediate lags.
> ^def-acf-pacf

## AR(p) Models

> [!definition] AR(1) Model
> $$z_t = \alpha_0 + \phi z_{t-1} + w_t$$
>
> **Stationarity:** $|\phi| < 1$ (root of $1 - \phi L = 0$ must exceed 1 in absolute value)
>
> **ACF:** $\rho_k = \phi^k$ — exponential decay (Eq 6.40)
>
> **PACF:** Cuts off after lag 1 — $\phi_{11} = \phi$, $\phi_{kk} = 0$ for $k > 1$ (Eq 6.42)
>
> For $\phi > 0$: positive, monotone decay. For $\phi < 0$: oscillating decay.
> ^def-ar1

## MA(q) Models

> [!definition] MA(1) Model
> $$z_t = \mu + w_t - \theta_1 w_{t-1}$$
>
> **Invertibility:** $|\theta_1| < 1$ (root of $1 - \theta_1 L = 0$ outside unit circle)
>
> **ACF:** Single spike at lag 1 only:
> $$\rho_1 = \frac{-\theta_1}{1 + \theta_1^2}, \quad \rho_k = 0 \text{ for } k > 1$$
>
> **PACF:** Dies out geometrically (infinite AR representation)
> ^def-ma1

## ACF/PACF Diagnostic Summary (Table 6-2)

| Model | ACF | PACF |
|-------|-----|------|
| AR($p$) | Decays to zero geometrically | Cuts off after lag $p$ |
| MA($q$) | Cuts off after lag $q$ | Decays to zero |
| ARMA($p$,$q$) | Decays after lag $q$ | Decays after lag $p$ |
| White noise | No significant spikes | No significant spikes |
| Unit root (I(1)) | Very slow, linear decay | Spike near 1.0 at lag 1 |

## Box-Jenkins Identification Procedure (Figure 6-4)

> [!example] Three-Step Box-Jenkins Method
> **Step 1: Identification**
> - Plot series; apply Box-Cox if variance non-constant
> - Difference until stationary (ADF unit root test)
> - Examine ACF/PACF to determine tentative $p$, $q$
>
> **Step 2: Estimation**
> - Estimate ARMA parameters by conditional or exact MLE
> - Check standard errors and parameter significance
>
> **Step 3: Diagnostic Checking**
> - Residuals should be white noise: Ljung-Box Q test
> - ACF of residuals should show no pattern
> - If inadequate: return to Step 1 with revised order
> ^ex-box-jenkins

## ARIMA(p, d, q)

> [!definition] ARIMA
> Regular differencing to achieve stationarity (order $d$):
>
> $$z_t = (1 - L)^d Z_t \tag{Eq 6.76}$$
>
> For $d = 1$ (most common): $z_t = Z_t - Z_{t-1}$ (first difference = period-over-period change)
>
> **Seasonal ARIMA** (Box-Jenkins seasonal model) adds seasonal differencing:
> $$z_t = (1 - L^s)^{d_s} Z_t \tag{Eq 6.79}$$
>
> where $s$ is the seasonal period (12 for monthly, 52 for weekly). Full model:
> $$\Phi(L)\Phi_s(L^s)(1-L)^d(1-L^s)^{d_s} Z_t = \Theta(L)\Theta_s(L^s) w_t$$
> ^def-arima

## Box-Cox Variance Stabilization

$$Z'_t = \frac{(Z_t + c)^\lambda - 1}{\lambda} \tag{Eq 6.74}$$

Common choices: $\lambda = 0.5$ (square root), $\lambda \to 0$ (log), $\lambda = 1$ (no transform). Choose $\lambda$ by profile MLE or visual inspection of the variance-mean plot.

## Marketing Applications of ARIMA

- **Sales forecasting**: pure ARIMA for baseline forecast without explanatory variables
- **Prewhitening** input series before transfer function identification (Ch.7)
- **Unit root testing**: determine if sales is I(0) or I(1) before using in ECM
- **Seasonality modeling**: seasonal ARIMA for weekly scanner data

## Cross-Links

- Transfer function extension: [[Transfer Function Model]]
- VAR and cointegration: [[Multivariate Persistence and Cointegration]]
- Carryover and ADL: [[Carryover Effects and Distributed Lags]]
- Causal ordering from prewhitened series: [[Empirical Causal Ordering]]
- Parameter estimation methods for ARIMA models: [[Parameter Estimation in Market Response]]
- Bayesian state-space alternative to ARIMA: [[Bayesian Structural Time-Series Model]]
- Model selection (AIC/BIC for order selection): [[Model Selection and Exploratory Analysis]]
