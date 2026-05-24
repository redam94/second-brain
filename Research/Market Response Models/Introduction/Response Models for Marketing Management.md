---
title: "Response Models for Marketing Management"
aliases:
  - "MRM Management Applications"
  - "Marketing Planning Cycle"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/marketing-management
  - source/hanssens-parsons-schultz-2001
  - doc/textbook
date_created: 2026-04-11
date_ingested: 2026-04-11
date_updated: 2026-04-11
folder: "Market Response Models/Introduction"
source: "[[Research/Market Response Models/raw/Market Response Models Econometric and Time Series Analysis.pdf]]"
chapter: "1"
status: complete
doc_type: concept
source_location: "Ch. 1, pp. 3-21"
depends_on:
  - "[[Market Response Models - Overview]]"
used_by:
  - "[[Markets Data and Sales Drivers]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
  - "[[Implementation of Market Response Models]]"
---

# Response Models for Marketing Management

> [!abstract] Summary
> Chapter 1 establishes the normative framework for using market response models in management. It defines the four management tasks (planning, budgeting, forecasting, controlling), introduces the simultaneous system linking sales response to spending decisions, and describes the iterative model-based planning cycle.

## The Sales Response Function

> [!definition] Sales Response Function
> The **sales response function** expresses unit sales as a function of marketing instruments and environment:
>
> $$Q_t = f(A_t, E_t)$$
>
> - $Q_t$: unit sales in period $t$
> - $A_t$: vector of marketing effort (advertising spend, price, distribution, promotion)
> - $E_t$: environmental factors (competitor actions, macro conditions, seasonal index)
> ^def-srf

Marketing management operates in a feedback loop: observed $Q_{t-1}$ and revenue $R_{t-1}$ inform future spending decisions, captured by the **decision rule**:

$$A_t = g(P_{t-1}, Q_{t-1})$$

## The Simultaneous System

When both equations are modeled together, the result is a simultaneous structural system:

$$Q_t = \gamma_{12} A_t + \beta_{11} Y_t + \beta_{12} N_t + \beta_{13} + u_{1t} \tag{sales equation}$$
$$A_t = \beta_{21} R_{t-1} + u_{2t} \tag{spending rule}$$

where $Y_t$ = consumer income, $N_t$ = competitor advertising, $R_{t-1}$ = lagged revenue. Simultaneity means OLS on the sales equation alone is biased — see [[Parameter Estimation in Market Response]] for 2SLS/3SLS remedies.

## Four Management Tasks

> [!example] Task 1: Planning
> Identify which marketing instruments to deploy and at what relative intensity. Response models inform whether advertising or price promotion achieves higher ROI for a given brand and market context.
> ^ex-planning

> [!example] Task 2: Budgeting
> Determine the total marketing budget. The model-based optimum sets marginal response equal to marginal cost:
>
> $$\frac{\partial Q}{\partial A} \cdot m = 1$$
>
> where $m$ is the contribution margin per unit. Budget rules derived from concave response functions (e.g., ADBUDG, logistic) differ from those under convex forms.
> ^ex-budgeting

> [!example] Task 3: Forecasting
> Use estimated parameters to project $\hat{Q}_{t+k}$ given alternative marketing scenarios. Dynamic models (ADL, ARIMA transfer functions) can incorporate carryover effects for multi-period forecasts.
> ^ex-forecasting

> [!example] Task 4: Controlling
> Monitor actual versus model-predicted sales. Systematic deviations signal model misspecification, structural breaks, or competitive activity not captured in $E_t$.
> ^ex-controlling

## The Model-Based Planning Cycle

```
Set objectives
     ↓
Specify model (functional form, variables)
     ↓
Estimate parameters (OLS, GLS, Bayesian)
     ↓
Optimize marketing mix
     ↓
Implement decision
     ↓
Monitor results → Update model → (repeat)
```

This iterative process is what distinguishes **model-based management** from rules-of-thumb (e.g., percent-of-sales budgeting). The cycle also motivates why dynamic models (Ch.4) and time-series methods (Ch.6-7) matter: carryover effects from past decisions affect current outcomes.

## Why Models?

Three reasons to use formal response models rather than managerial intuition:
1. **Consistency**: the model applies the same logic across all brands/markets
2. **Accountability**: parameters are estimated and can be revised with new data
3. **Optimization**: calculus-based optima replace arbitrary budget rules

## Cross-Links

- Book overview: [[Market Response Models - Overview]]
- Data and measurement: [[Markets Data and Sales Drivers]]
- Functional form choices: [[Functional Forms in Marketing]]
- Optimal decisions: [[Optimal Marketing Decisions and Forecasting]]
- Causal inference context: [[Activity Bias in Advertising]]
