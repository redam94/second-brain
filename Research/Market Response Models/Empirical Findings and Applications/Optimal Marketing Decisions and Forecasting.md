---
title: "Optimal Marketing Decisions and Forecasting"
aliases:
  - "Optimal Marketing Budget"
  - "Marketing Mix Optimization"
tags:
  - type/concept
  - topic/market-response
  - topic/optimization
  - topic/forecasting
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Chs. 9-10"
chapter: "9-10"
status: complete
---

# Optimal Marketing Decisions and Forecasting

> [!abstract] Summary
> Given estimated market response functions, Chapter 9 derives optimal marketing decisions (budget, allocation, timing) and optimal prices. Chapter 10 covers sales forecasting methods. This note summarizes the optimization conditions for static and dynamic models, the Dorfman-Steiner theorem, pulsing strategies, and the HP forecasting case study.

## Static Optimization: The Profit-Maximizing Budget

> [!theorem] Dorfman-Steiner Optimality Condition
> For a profit-maximizing firm with margin $m$ and sales response $Q(A)$:
>
> $$\max_A \Pi = (P - c) Q(A) - A$$
>
> First-order condition: $(P-c) \frac{\partial Q}{\partial A} = 1$
>
> Rearranging: $\frac{A}{(P-c)Q} = \frac{A}{S} = \eta_{QA} \cdot \frac{A/S}{A/S} = \eta_{QA}$
>
> So the **optimal advertising-to-sales ratio**:
> $$\frac{A^*}{S^*} = \eta_{QA} \cdot \frac{1}{m/P} = \frac{\eta_{QA}}{\eta_{QP}}$$
>
> where $\eta_{QP}$ is the absolute price elasticity. The optimal advertising-to-sales ratio equals the ratio of advertising elasticity to price elasticity. With $\eta_{QA} = 0.10$ and $\eta_{QP} = 2.5$: optimal A/S = 4%.
> ^thm-dorfman-steiner

## ADBUDG Optimization

For the ADBUDG response function $Q = \beta_0 + (\beta_1 - \beta_0) A^{\beta_2}/(\beta_3^{\beta_2} + A^{\beta_2})$:

Set marginal profit = marginal cost of advertising:

$$m \cdot \frac{\partial Q}{\partial A} = 1$$

$$m(\beta_1 - \beta_0) \frac{\beta_2 \beta_3^{\beta_2} A^{\beta_2-1}}{(\beta_3^{\beta_2} + A^{\beta_2})^2} = 1$$

Solved numerically. The ADBUDG parameters are calibrated from managerial judgments (current sales, saturation, zero-advertising baseline, midpoint advertising) making the optimization directly actionable.

## Dynamic Optimization: Optimal Control

For dynamic systems, optimal advertising over time solves:

$$\max_{A_t} \sum_{t=0}^T \rho^t [(P-c)Q_t - A_t]$$

subject to the state equation (goodwill dynamics):

$$G_t = A_t + \lambda G_{t-1}$$

and $Q_t = f(G_t)$.

**Key result**: the optimal policy is generally to maintain advertising at a continuous rate (maintenance spending), with pulses justified only under S-shaped response. See [[Shape of the Marketing Response Function]].

## Competitive Pricing Optimization

For Nash equilibrium in price competition (Bertrand-Nash):

$$P^*_i = \frac{c_i \eta_{ii}}{\eta_{ii} + 1} + \frac{\text{competitive adjustments}}{\eta_{ii} + 1}$$

Cross-price effects shift the Nash equilibrium prices. Markets with higher cross-price elasticities equilibrate at lower prices (more competitive).

## Multi-Instrument Optimization (Marketing Mix)

With multiplicative response $Q = K \cdot A^{\alpha} P^{-\beta} D^{\gamma}$, optimal conditions yield:

$$\frac{A^*}{S^*} = \frac{\alpha}{m}, \quad \frac{d^*}{S^*} = \frac{\gamma}{m}, \quad P^* = \frac{c\beta}{\beta - 1}$$

where $d$ is distribution spending and $m = (P-c)/P$ is the margin.

## Forecasting Methods

> [!example] Sales Forecasting Framework
> Four types of forecasting models in market response:
>
> 1. **Univariate ARIMA**: pure time-series forecast, no marketing inputs. Benchmark model.
>
> 2. **Transfer function**: ARIMA with marketing inputs (TF model of Ch.7). Better than ARIMA if marketing variables are predictable.
>
> 3. **Regression / ADL**: includes marketing mix and controls. Standard in practice.
>
> 4. **VAR/ECM**: captures feedback between sales and marketing spending. Best for long horizons when cointegration exists (ECM improves 63% over univariate — Hanssens 1998).
>
> **HP Inkjet Printer Case**: 6 years of data sufficient for reliable regression-based forecasts. Model: $\text{sales}(t) = f(\text{sales}(t-1), \text{ad spend}, \text{distribution}, \text{price}, \text{product feature index})$. Explains up to 90% of sales variance ex post.
> ^ex-hp-forecasting

## Forecasting Accuracy Metrics

| Metric | Formula | Use |
|--------|---------|-----|
| MAPE | $100 \cdot E[|Q_t - \hat Q_t|/Q_t]$ | Overall accuracy |
| RMSE | $\sqrt{E[(Q_t - \hat Q_t)^2]}$ | Penalizes large errors |
| Theil U | RMSE / RMSE of random walk | Relative to naive benchmark |
| MAE | $E[|Q_t - \hat Q_t|]$ | Robust to outliers |

## Implementation Success Factors

From Chapter 10 (Implementation):
1. **Model simplicity**: complex models are harder to use and explain to management
2. **Manager involvement**: response to model calibration increases acceptance
3. **Gradual rollout**: pilot in one product/market before full deployment
4. **Adaptive updating**: re-estimate quarterly as new data arrive
5. **Scenario planning**: present multiple scenarios (optimistic/base/pessimistic) rather than point forecasts

## Cross-Links

- ADBUDG form for calibration: [[Functional Forms in Marketing]]
- Dynamic optimization and carryover: [[Carryover Effects and Distributed Lags]]
- Pulsing strategies: [[Shape of the Marketing Response Function]]
- VAR/ECM forecasting: [[Multivariate Persistence and Cointegration]]
- Implementation context: [[Implementation of Market Response Models]]
