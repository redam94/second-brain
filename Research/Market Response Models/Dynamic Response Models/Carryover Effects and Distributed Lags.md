---
title: "Carryover Effects and Distributed Lags"
aliases:
  - "Koyck Model"
  - "Geometric Distributed Lag"
  - "Advertising Carryover"
  - "ADL Model Marketing"
tags:
  - type/concept
  - topic/market-response
  - topic/dynamic-models
  - topic/time-series
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 4"
chapter: "4"
status: complete
doc_type: concept
source_location: "Ch. 4, Sec. 4.2, pp. 142-155"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Markets Data and Sales Drivers]]"
  - "[[Design of Static Response Models]]"
used_by:
  - "[[Design of Dynamic Response Models]]"
  - "[[Shape of the Marketing Response Function]]"
  - "[[Transfer Function Model]]"
  - "[[Single Marketing Time Series]]"
  - "[[Advertising and Promotion Effects]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
  - "[[Implementation of Market Response Models]]"
folder: "Research/Market Response Models/Dynamic Response Models"
date_ingested: 2026-04-08
---

# Carryover Effects and Distributed Lags

> [!abstract] Summary
> Chapter 4 is the dynamic core of the book. Marketing effects typically extend beyond the current period through carryover (advertising goodwill, habit, word-of-mouth). This note covers the Koyck geometric lag, Almon polynomial distributed lag (PDL), geometric lag with purchase feedback (GLPF), the general ADL model, and the temporal aggregation bias with recovery procedures.

## Why Carryover Matters

Advertising in period $t$ may influence sales in periods $t, t+1, t+2, \ldots$ through:
- **Memory**: consumers recall brand messages
- **Goodwill stock**: cumulative brand awareness
- **Purchase feedback**: a new buyer is more likely to repurchase
- **Word-of-mouth**: buyers influence non-buyers

The **retention rate** $\lambda \in (0,1)$ governs how quickly these effects decay.

## 1. Geometric (Koyck) Distributed Lag

> [!definition] Koyck / Geometric Lag
> Starting from an infinite distributed lag:
> $$Q_t = \beta_0 + \sum_{k=0}^{\infty} \beta_{1,k} X_{t-k} + w_t$$
>
> Imposing geometric decay $\beta_{1,k} = \beta_1 \lambda^k$ and applying the Koyck transformation yields:
>
> $$Q_t = (1-\lambda)\beta_0 + \beta_1(1-\lambda)X_t + \lambda Q_{t-1} + (w_t - \lambda w_{t-1}) \tag{Eq 4.10}$$
>
> - $\lambda$: **carryover** (retention rate); $0 < \lambda < 1$
> - $\beta_1(1-\lambda)$: short-run effect
> - $\beta_1$: **long-run effect** (total cumulative effect of a permanent unit increase)
> - The error $v_t = w_t - \lambda w_{t-1}$ is MA(1), requiring GLS for efficient estimation
> ^def-koyck

> [!theorem] Long-Run Multiplier
> For the Koyck model, the long-run effect of a permanent unit increase in $X$ is:
>
> $$\text{LRM} = \frac{\beta_1(1-\lambda)}{1-\lambda} = \beta_1$$
>
> The **mean lag** (average delay before the effect materializes) is $\lambda/(1-\lambda)$ periods.
> ^thm-lrm

## 2. Geometric Lag with Purchase Feedback (GLPF)

> [!definition] GLPF Model
> Augments the Koyck model with **purchase feedback**: a new customer created by advertising in period $t$ generates repeat purchases in future periods. The model (Eq 4.21):
>
> $$Q_t = \alpha + \beta_1 X_t + \phi Q_{t-1} + \text{Purchase feedback term} + u_t$$
>
> where $\phi$ captures both advertising carryover and the repeat-purchase rate. Identification requires separating $\lambda$ (advertising decay) from the repurchase probability.
> ^def-glpf

## 3. Almon Polynomial Distributed Lag (PDL)

> [!definition] Almon PDL
> Instead of geometric decay, the PDL places polynomial restrictions on the lag coefficients:
>
> $$\beta_k = \alpha_0 + \alpha_1 k + \alpha_2 k^2 + \cdots + \alpha_p k^p, \quad k = 0, 1, \ldots, K$$
>
> This smoothness restriction reduces the number of free parameters from $K+1$ to $p+1$ while allowing flexible lag shapes (inverted-U, hump-shaped, etc.).
>
> The model is estimated by OLS on transformed regressors $Z_j = \sum_{k=0}^K k^j X_{t-k}$ for $j = 0, \ldots, p$.
> ^def-pdl

## 4. Autoregressive Distributed Lag (ADL)

> [!definition] ADL Model
> The general **ADL(r, s)** model combines lagged dependent variable (autoregression) with distributed lags of the input:
>
> $$Q_t = \alpha + \sum_{i=1}^{r} \gamma_i Q_{t-i} + \sum_{k=0}^{s} \beta_k X_{t-k} + w_t \tag{Eq 4.24}$$
>
> - $r$: autoregressive order (number of lagged sales terms)
> - $s$: distributed lag order (number of lagged advertising terms)
> - The Koyck model is the special case ADL(1,0) with $\gamma_1 = \lambda$
>
> **Long-run effect:** $\text{LRE} = \frac{\sum_{k=0}^s \beta_k}{1 - \sum_{i=1}^r \gamma_i}$
> ^def-adl

## 5. Lead-Lag Taxonomy (Doyle & Saunders 1985)

Six cases for the lead/lag relationship between advertising $X_t$ and sales $Q_t$ (Eqs 4.25-4.31):

| Case | Pattern | Interpretation |
|------|---------|----------------|
| 1 | Only $X_t$ significant | Pure contemporaneous |
| 2 | $X_t$ + $X_{t-1}$ | Short carryover |
| 3 | $X_t$ + $Q_{t-1}$ | Koyck carryover |
| 4 | $X_{t+1}$ + $X_t$ | Anticipatory (lead) effect |
| 5 | Only $Q_{t-1}$ | Habitual purchase, no ad effect |
| 6 | $X_t$ leads $Q_t$ via sales momentum | Feedback loop |

## 6. Time-Varying Parameters

> [!definition] Return-to-Normality Model
> Parameters can evolve stochastically. The **return-to-normality** model (Eq 4.36):
>
> $$\beta_t = (1-\phi)\bar{\beta} + \phi \beta_{t-1} + \nu_t$$
>
> where $\bar{\beta}$ is the long-run mean and $\phi$ governs persistence. When $\phi = 0$, $\beta_t = \bar{\beta} + \nu_t$ (IID noise around mean). Estimated via Kalman filter.
>
> The **Cooley-Prescott** nonstationary parameter model (Eqs 4.37-4.40) allows $\bar{\beta}$ itself to evolve with a random walk, capturing structural change.
> ^def-rtn

## 7. Ratchet Models (Asymmetric Response)

> [!definition] Ratchet Model
> **Asymmetric response**: sales react differently to increasing vs. decreasing advertising:
>
> $$Q_t = \beta_0 + \beta_1 X^I_t + \beta_2 X^D_t, \quad \beta_1 > \beta_2 \tag{Eq 4.45}$$
>
> where $X^I_t = X_t - X_{t-1}$ when $X_t > X_{t-1}$ (else 0) and $X^D_t = X_t - X_{t-1}$ when $X_t < X_{t-1}$ (else 0).
>
> Alternative: **historical maximum** model
> $$Q_t = \beta_0 + \beta_1 X_t + \beta_2 \max_{i \leq t}(X_i) \tag{Eq 4.47}$$
>
> capturing **hysteresis**: once a high advertising level has been achieved, a reduction does not fully undo the brand-building effect (fast learning/slow forgetting, Figure 4-2 in book).
> ^def-ratchet

## 8. Temporal Aggregation Bias

> [!theorem] Clarke (1976) Aggregation Bias
> Estimating carryover $\lambda$ from annual data yields estimates **20–50× longer** than from monthly data for the same underlying process. The reason: monthly carryover effects are summed during temporal aggregation, inflating the apparent retention rate.
>
> **Recovery procedures:**
> - **Bass-Leone** (Eqs 4.60-4.61): algebraic relationship between weekly and monthly $\lambda$
> - **Weiss-Weinberg-Windal** (Eq 4.62): instrumental variable approach
> - **Direct aggregation** (Eq 4.63): explicitly aggregate the weekly model to match observed monthly data
>
> Recommendation: use the shortest available data interval. Aggregation-adjusted monthly $\lambda \approx 0.7$ (empirical generalization — see [[Advertising and Promotion Effects]]).
> ^thm-clarke

## Lag Operator Notation (Appendix)

For reference, the lag operator notation used in the book:

$$L X_t \equiv X_{t-1} \tag{Eq 4.64}$$
$$L^k X_t = X_{t-k}$$

The Koyck model in lag polynomial form:

$$(1 - \lambda L) Q_t = (1-\lambda)\beta_0 + \beta_1(1-\lambda) X_t + w_t - \lambda w_{t-1}$$

A general rational lag is $B(L)/C(L)$ (Eq 4.72), which nests ADL models.

## Cross-Links

- Static baseline: [[Functional Forms in Marketing]]
- Reaction functions and competitive dynamics: [[Reaction Functions and Competitive Dynamics]]
- ARIMA extension: [[Single Marketing Time Series]]
- Transfer function extension: [[Transfer Function Model]]
- Empirical carryover estimate ($\lambda \approx 0.43$ monthly): [[Advertising and Promotion Effects]]
- Hysteresis in long-run analysis: [[Multivariate Persistence and Cointegration]]
