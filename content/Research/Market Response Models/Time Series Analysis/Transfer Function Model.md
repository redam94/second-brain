---
title: "Transfer Function Model"
aliases:
  - "TF Model Marketing"
  - "Prewhitening Marketing"
  - "Intervention Analysis Marketing"
tags:
  - type/concept
  - topic/market-response
  - topic/time-series
  - topic/transfer-function
  - source/hanssens-parsons-schultz-2001
date_ingested: 2026-04-11
date_created: 2026-04-11
date_updated: 2026-04-11
folder: "Market Response Models/Time Series Analysis"
source: "Hanssens, Parsons & Schultz (2001) Ch. 7"
chapter: "7"
status: complete
doc_type: concept
source_location: "Ch. 7, Sec. 7.1, pp. 286-297"
depends_on:
  - "[[Single Marketing Time Series]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Design of Dynamic Response Models]]"
used_by:
  - "[[Multivariate Persistence and Cointegration]]"
---

# Transfer Function Model

> [!abstract] Summary
> Transfer function (TF) models relate a marketing output series $y_t$ (sales) to one or more input series $x_t$ (advertising, price) while accounting for the autocorrelated noise structure. They combine the ARIMA framework (Ch.6) with regression, generalizing the ADL model to include arbitrary lag structures and correlated errors.

## Transfer Function Framework

> [!definition] Transfer Function Model (Single Input)
> The general single-input TF model (impulse response form):
>
> $$
> y_t = \alpha_0 + (v_0 + v_1 L + v_2 L^2 + \cdots) x_t + n_t \tag{Eq 7.7}
> $$
>
> or compactly:
> $$
> y_t = \alpha_0 + V(L) x_t + n_t \tag{Eq 7.8}
> $$
>
> where:
> - $v_j$: **impulse response weights** (effect of $x$ on $y$ at lag $j$)
> - $n_t$: added noise process, typically modeled as ARMA($p$,$q$)
> - $V(L) = \omega(L)/\delta(L) \cdot L^b$: rational polynomial in $L$ with $b$-period delay
>
> When $r = 0$ (no denominator), $V(L)$ is a finite polynomial; when $r > 0$, it is an infinite series (like the Koyck model).
> ^def-tf-model

## Two-Input TF Model

$$y_t = \alpha_0 + \frac{\omega_1(L)}{\delta_1(L)} L^{b_1} x_{1t} + \frac{\omega_2(L)}{\delta_2(L)} L^{b_2} x_{2t} + \frac{\Theta(L)}{\Phi(L)} w_t \tag{Eq 7.14}$$

Impulse response form: $y_t = \alpha_0 + V_1(L) x_{1t} + V_2(L) x_{2t} + n_t$ (Eq 7.15)

## Prewhitening Identification (Box-Jenkins Method)

> [!example] Three-Step Prewhitening
> **Step 1**: Find the ARMA model for input $x_t$ (prewhiten):
>
> $$
> \hat\Phi(L) x_t = \hat\Theta(L) \hat w_t \tag{Eq 7.9}
> $$
> $$
> \hat w_t = \hat\Theta(L)^{-1} \hat\Phi(L) x_t \tag{Eq 7.10}
> $$
>
> **Step 2**: Apply the same filter to output $y_t$:
>
> $$
> \hat\beta_t = \hat\Theta(L)^{-1} \hat\Phi(L) y_t \tag{Eq 7.11}
> $$
>
> **Step 3**: Compute CCF (cross-correlation function) between $\hat w_t$ and $\hat\beta_t$:
>
> $$
> \hat v_j = \frac{s_{\hat\beta}}{s_{\hat w}} r_{\hat w \hat\beta}(j) \tag{Eq 7.12}
> $$
>
> The CCF pattern directly reveals the impulse response weights $v_j$ and identifies the TF order $(r, s, b)$.
> ^ex-prewhitening

## CCF Patterns and Transfer Function Shapes

Figure 7-1 patterns (from the book):

| CCF Pattern | Transfer Function | Marketing Example |
|-------------|-----------------|-------------------|
| Single spike at $j=0$, negative at $j=1$ | $(\omega_0 + \omega_1 L)x_t$, $\omega_1 < 0$ | Dynamic effects of dealing (promotion with stockpiling) |
| Monotone decay starting at $j=0$ | $\omega_0/(1-\delta L)$, $0 < \delta < 1$ | Monotonic advertising carryover |
| Spike then decay | $(\omega_0 + \omega_1 L + \omega_2 L^2)/(1-\delta L)$ | Advertising buildup then decay |

## Multi-Input Identification (Liu-Hanssens Method)

The prewhitening approach becomes cumbersome with many inputs (each requires separate prewhitening). The **Liu-Hanssens (1982) direct-lag regression** approach:

1. Estimate a long-lag OLS regression (Eq 7.16):
$$y_t = \alpha_0 + \sum_{k=0}^{K_1} v_{1k} x_{1,t-k} + \sum_{k=0}^{K_2} v_{2k} x_{2,t-k} + u_t$$

2. Examine pattern of OLS coefficients $\hat v_{jk}$ to identify cutoffs vs. dying-out patterns

3. If inputs are highly autocorrelated (AR-dominated), apply a common filter to reduce collinearity

Problem 1 (collinearity): if $x_t$ is AR(1) with $\phi = 0.9$, adjacent lags are $\rho = 0.9$ correlated. Remedy: filter out the AR component with a common filter before OLS.
Problem 2 (non-white residuals): use GLS — estimate ARMA structure from OLS residuals, transform, re-estimate.

## Intervention Analysis

> [!definition] Intervention Analysis (Box-Tiao 1975)
> Qualitative events (advertising copy changes, competitor entry, regulation) that cannot be quantified as continuous variables are modeled as **dummy variable inputs**.
>
> **Pulse intervention** (temporary):
> $$
> D_{\text{pulse},t} = \begin{cases} 0 & t < k \\ 1 & k \leq t \leq k+l \\ 0 & t > k+l \end{cases}
> $$
>
> **Step intervention** (permanent):
> $$
> D_{\text{step},t} = \begin{cases} 0 & t < k \\ 1 & t \geq k \end{cases}
> $$
>
> Note: $(1-L) D_{\text{step},t} = D_{\text{pulse},t}$ (Eq 7.20) — the first difference of a step is a pulse.
>
> General pulse intervention TF model (Eq 7.19):
> $$
> Y_t = \alpha_0 + \frac{\omega(L)}{\delta(L)} L^b D_{\text{pulse},t} + \frac{\Theta(L)}{\Phi(L)} w_t
> $$
> ^def-intervention

### Intervention Scenarios (Figure 7-2)

Four canonical response patterns to pulse input + step input:

| TF | Pulse Response | Step Response | Example |
|----|---------------|---------------|---------|
| $y_t = \alpha_0 + \omega_0 x_t$ | Immediate, temporary | Level shift | Static sales response |
| $y_t = \alpha_0 + \frac{\omega_0}{1-\delta L} x_t$ | Gradual decay | Trending up | Advertising carryover |
| $y_t = \alpha_0 + \frac{\omega_0}{1-L} x_t$ | Permanent | Linear trend | Sustained competitive advantage |
| $y_t = \alpha_0 + (\omega_0 + \omega_1 L) x_t$ | Temporary blip | Blip then back | Promotion with stockpiling |

## Diagnostic Checking for TF Models

Two residual checks:
1. **ACF of residuals** should be flat (no autocorrelation) — adjust $\Phi(L)$/$\Theta(L)$ if not
2. **CCF of residuals with prewhitened input** should be flat — a spike at lag $k=2$ indicates a lag-2 response was omitted from the TF

## Cross-Links

- ARIMA background: [[Single Marketing Time Series]]
- Koyck model (special case): [[Carryover Effects and Distributed Lags]]
- Multi-input extension: [[Multivariate Persistence and Cointegration]]
- Intervention analysis in causal inference context: [[Bayesian Structural Time-Series Model]]
- ADL model: [[Design of Dynamic Response Models]]
- Causal ordering of inputs: [[Empirical Causal Ordering]] — determining whether $x_t$ leads or lags $y_t$ before specifying the TF delay $b$
