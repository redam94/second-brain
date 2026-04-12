---
title: "Multivariate Persistence and Cointegration"
aliases:
  - "VAR Marketing"
  - "Cointegration Marketing"
  - "Error Correction Marketing"
  - "Multivariate Persistence"
tags:
  - type/concept
  - topic/market-response
  - topic/time-series
  - topic/VAR
  - topic/cointegration
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 7"
chapter: "7"
status: complete
doc_type: concept
source_location: "Ch. 7, Sec. 7.2, pp. 298-308"
depends_on:
  - "[[Transfer Function Model]]"
  - "[[Single Marketing Time Series]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
used_by:
  - "[[Empirical Causal Ordering]]"
  - "[[Price and Distribution Effects]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
---

# Multivariate Persistence and Cointegration

> [!abstract] Summary
> When marketing variables are jointly evolving (nonstationary), VAR models capture the full dynamic system including six channels of total impact (contemporaneous, carryover, purchase reinforcement, feedback, decision rules, competitive reaction). Cointegration tests for long-run equilibrium between evolving variables; error-correction models (ECM) incorporate that equilibrium into short-run dynamics.

## VARMA and VAR Models

> [!definition] VARMA Model
> The **Vector ARMA** model for a $k \times 1$ vector of stationary observations $\mathbf{z}_t$ (Eq 7.21):
>
> $$
> \boldsymbol\Phi(L)\mathbf{z}_t = \boldsymbol\alpha_0 + \boldsymbol\Theta(L)\mathbf{w}_t
> $$
>
> where:
> - $\boldsymbol\Phi(L) = \mathbf{I} - \boldsymbol\phi_1 L - \cdots - \boldsymbol\phi_p L^p$ ($k \times k$ AR matrix polynomial)
> - $\boldsymbol\Theta(L) = \mathbf{I} - \boldsymbol\theta_1 L - \cdots - \boldsymbol\theta_q L^q$ ($k \times k$ MA matrix polynomial)
> - $\mathbf{w}_t \sim \text{i.i.d. MVN}(\mathbf{0}, \boldsymbol\Sigma)$
> ^def-varma

> [!definition] VAR Model
> The **Vector Autoregressive** model — VARMA with $\boldsymbol\Theta(L) = \mathbf{I}$ (Eq 7.22):
>
> $$
> \boldsymbol\Phi(L)\mathbf{z}_t = \boldsymbol\alpha_0 + \mathbf{w}_t
> $$
>
> Advantages over VARMA: (1) straightforward OLS estimation equation-by-equation, (2) no nonlinear MA terms, (3) easily extends to cointegrated systems.
> ^def-var

### Bivariate Sales-Advertising VAR

$$
\begin{bmatrix} Q_t \\ ADV_t \end{bmatrix} = \begin{bmatrix} \pi^1_{11} & \pi^1_{12} \\ \pi^1_{21} & \pi^1_{22} \end{bmatrix} \begin{bmatrix} Q_{t-1} \\ ADV_{t-1} \end{bmatrix} + \cdots + \begin{bmatrix} \pi^I_{11} & \pi^I_{12} \\ \pi^I_{21} & \pi^I_{22} \end{bmatrix} \begin{bmatrix} Q_{t-I} \\ ADV_{t-I} \end{bmatrix} + \begin{bmatrix} w_{Q,t} \\ w_{ADV,t} \end{bmatrix} \tag{Eq 7.23}
$$

Order $I$ determined by AIC/BIC. Off-diagonal elements $\pi_{12}^i$ (advertising's effect on sales at lag $i$) and $\pi_{21}^i$ (sales feedback to advertising) capture the full dynamic structure.

## Six Channels of Total Impact (Dekimpe & Hanssens 1995a)

A marketing shock propagates through:

| Channel | Mechanism |
|---------|-----------|
| **Contemporaneous** | Direct same-period effect |
| **Carryover** | Past advertising influences current sales via goodwill |
| **Purchase reinforcement** | New buyers from ad increase repeat purchase base |
| **Feedback** | Higher sales → higher budgets → more advertising |
| **Decision rules** | Firm's spending patterns (momentum) affect future spending |
| **Competitive reactions** | Rivals match or counter, dampening/amplifying net effect |

The VAR captures all six simultaneously without imposing causal structure a priori.

## Multivariate Persistence

> [!definition] Impulse Response and Persistence
> Writing the VAR as an infinite-order VMA:
>
> $$
> \begin{bmatrix} Q_t \\ ADV_t \end{bmatrix} = \mathbf{I}\begin{bmatrix} w_{Q,t} \\ w_{ADV,t} \end{bmatrix} + \boldsymbol\alpha^1 \begin{bmatrix} w_{Q,t-1} \\ w_{ADV,t-1} \end{bmatrix} + \boldsymbol\alpha^2 \begin{bmatrix} w_{Q,t-2} \\ w_{ADV,t-2} \end{bmatrix} + \cdots \tag{Eq 7.24}
> $$
>
> $\alpha^k_{12}$: impact on $Q_t$ of a one-unit advertising shock $k$ periods ago.
>
> **Multivariate persistence** = $\lim_{k\to\infty} \alpha^k_{12}$
>
> - **Zero persistence** (stationary system): impulse response decays to zero, brand returns to pre-shock baseline
> - **Non-zero persistence** (evolving system): shock has a permanent effect — see "hysteresis" scenario
> ^def-persistence

## Four Strategic Scenarios (Dekimpe & Hanssens 1999)

| Market Performance | Marketing Mix | Scenario | Implication |
|-------------------|---------------|----------|-------------|
| Stationary I(0) | Stationary I(0) | **Business as usual** | Temporary marketing effects only |
| Stationary I(0) | Evolving I(1) | **Escalation** | Marketing spending battles; no long-run gain |
| Evolving I(1) | Stationary I(0) | **Hysteresis** | Temporary marketing creates permanent sales change |
| Evolving I(1) | Evolving I(1) | **Co-evolution** | Long-run equilibrium; ECM required |

## Cointegration

> [!definition] Cointegration (Engle-Granger 1987)
> Two I(1) series $Y_t$ and $X_t$ are **cointegrated** if there exists $\beta_1$ such that:
>
> $$
> e_t = Y_t - \beta_0 - \beta_1 X_t \tag{Eq 7.26}
> $$
>
> is stationary I(0). Cointegration means a long-run equilibrium relationship exists between the two evolving series — they cannot drift arbitrarily far apart.
>
> **Engle-Granger test**: (1) OLS of $Y_t$ on $X_t$; (2) ADF unit root test on residuals $\hat e_t$ (with different critical values)
>
> **Johansen FIML test** (Eq 7.27-7.28): full-information maximum likelihood; handles multiple cointegrating vectors. Starting from VAR($k$):
> $$
> \tilde{\mathbf{X}}_t = \mathbf{c} + \mathbf{\Pi}_1 \tilde{\mathbf{X}}_{t-1} + \cdots + \mathbf{\Pi}_k \tilde{\mathbf{X}}_{t-k} + \mathbf{w}_t
> $$
> The number of cointegrating vectors = rank of $\mathbf{\Gamma}_k = -\mathbf{I}_N + \mathbf{\Pi}_1 + \cdots + \mathbf{\Pi}_k$ ($= \mathbf{w}\boldsymbol\beta'$).
> ^def-cointegration

## Error-Correction Model (ECM)

> [!definition] Error-Correction Model
> If $Y_t$ and $X_t$ are cointegrated with equilibrium error $e_t = Y_t - \beta_0 - \beta_1 X_t$, the Engle-Granger ECM is (Eq 7.29):
>
> $$
> \Delta Y_t = \alpha_0 + \alpha_1 \Delta Y_{t-1} + \alpha_2 \Delta X_{t-1} + \alpha_3 e_{t-1} + u_t
> $$
>
> where $\alpha_3 < 0$ is the **speed of adjustment** parameter. When $Y_{t-1}$ is too high relative to the equilibrium, $\alpha_3 e_{t-1}$ pulls it back down in period $t$.
>
> **Marketing interpretation**: if sales are unusually high given current advertising, the ECM predicts sales will fall back toward the long-run advertising-supported level.
>
> Incorporating ECM in transfer function models significantly improves long-horizon forecasting accuracy (Hanssens 1998: 63% improvement over univariate models).
> ^def-ecm

## Key Empirical Findings (Table 7-1)

| Study | Period | Variable | Key Finding |
|-------|--------|---------|-------------|
| Dekimpe & Hanssens (1995b) | — | Sales/market share | Sales series mostly evolving; market share mostly stationary |
| Bronnenberg et al. (2000) | Weekly | Market share | Distribution coverage drives long-run share |
| Dekimpe et al. (1999) | Weekly | Industry sales | Little evidence of long-run promotional effects in FPCG |
| Hanssens (1998) | Monthly | Factory orders | Factory orders and retail sales cointegrated; ECM forecasts 63% better |
| Hanssens & Ouyang (2000) | Monthly | Sales | Hysteresis: long-run profit-maximizing rules differ from short-run |

## Cross-Links

- Transfer function model (single equation): [[Transfer Function Model]]
- ARIMA foundation: [[Single Marketing Time Series]]
- Reaction functions within VAR: [[Reaction Functions and Competitive Dynamics]]
- Causal ordering: [[Empirical Causal Ordering]]
- Cointegration in econometrics: [[Differences-in-Differences]]
- Bayesian structural time series: [[Bayesian Structural Time-Series Model]]
