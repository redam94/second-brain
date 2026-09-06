---
title: "Empirical Causal Ordering"
aliases:
  - "Granger Causality Marketing"
  - "Causal Ordering VAR"
tags:
  - type/concept
  - topic/market-response
  - topic/causal-inference
  - topic/time-series
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 7"
chapter: "7"
status: complete
doc_type: concept
source_location: "Ch. 7, Sec. 7.3, pp. 309-314"
depends_on:
  - "[[Multivariate Persistence and Cointegration]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
used_by: []
folder: "Research/Market Response Models/Time Series Analysis"
date_ingested: 2026-04-08
---

# Empirical Causal Ordering

> [!abstract] Summary
> VAR models make no a priori causal distinction between variables. Empirical methods for causal ordering — Granger causality tests, innovation accounting (impulse response functions, variance decomposition), and Cholesky decomposition — help researchers infer directional relationships from time-series data.

## Granger Causality

> [!definition] Granger Causality
> Variable $X$ **Granger-causes** $Y$ if past values of $X$ contain information about $Y$ beyond what is already contained in past values of $Y$ itself:
>
> $$E[Y_{t+1} | Y_t, Y_{t-1}, \ldots, X_t, X_{t-1}, \ldots] \neq E[Y_{t+1} | Y_t, Y_{t-1}, \ldots]$$
>
> **Test**: In a bivariate VAR, test whether the block of lagged $X$ coefficients in the $Y$ equation is jointly zero:
>
> $$Y_t = \sum_{i=1}^I a_i Y_{t-i} + \sum_{i=1}^I b_i X_{t-i} + w_{Y,t}$$
>
> $H_0: b_1 = \cdots = b_I = 0$ (X does not Granger-cause Y). Test via F-test or likelihood ratio.
>
> **Important caveat**: Granger causality is about predictive priority, not structural causation. It can be confounded by omitted common causes and does not imply that manipulating $X$ will change $Y$ — see [[Directed Acyclic Graphs]] and [[Conditional Independence Assumption]].
> ^def-granger

## Innovation Accounting

Two tools for understanding system dynamics in estimated VAR:

### Impulse Response Function (IRF)

> [!definition] Impulse Response Function
> The IRF traces the dynamic response of variable $Y$ to a one-time shock (innovation) in variable $X$:
>
> $$\text{IRF}(k) = \frac{\partial Y_{t+k}}{\partial w_{X,t}}$$
>
> For stationary systems: IRF → 0 as $k \to \infty$ (temporary effect)
> For I(1) systems: IRF → non-zero constant as $k \to \infty$ (multivariate persistence)
>
> IRFs are typically plotted with 95% confidence bands computed by bootstrap or delta method. Used to visualize whether advertising shocks have persistent (Figure 7-3 right) or temporary (Figure 7-3 left) effects on sales.
> ^def-irf

### Variance Decomposition (FEVD)

The **forecast error variance decomposition** (FEVD) decomposes the $h$-period-ahead forecast error variance of $Y$ into shares attributable to shocks in each variable:

$$\text{FEVD}_{Y|X}(h) = \frac{\sum_{k=0}^{h-1} (\alpha^k_{YX})^2}{\sum_{j} \sum_{k=0}^{h-1} (\alpha^k_{Yj})^2}$$

At short horizons: $Y$'s own shocks dominate. At long horizons: $X$ may explain a larger share if Granger causality is strong.

## The Causal Ordering Problem

Both IRF and FEVD require **orthogonalization** of shocks because contemporaneous effects ($w_{Y,t}$ and $w_{X,t}$ may be correlated). The **Cholesky decomposition** imposes a triangular ordering:

- If advertising is ordered first, the full contemporaneous effect of advertising on sales is attributed to advertising
- If sales is ordered first, the full contemporaneous effect is attributed to sales

**Sensitivity check**: Good practice requires checking that key results are robust to alternative Cholesky orderings, or using alternative identification methods:
- **Structural VAR (SVAR)**: impose economic theory to identify contemporaneous effects
- **Evans-Wells (1983)** method: simulate correlated shocks without requiring causal ordering

## Causal Ordering in Marketing Contexts

> [!example] Short-Interval Data Ordering
> For weekly scanner data, a natural causal ordering is:
> 1. **Advertising** (pre-planned, set before the period)
> 2. **Price** (set by retailers, partially responding to brand decisions)
> 3. **Sales** (outcome, contemporaneously affected by advertising and price)
>
> This ordering is defensible because consumers react to advertising and price within the measurement week, while competitor and firm decision rules operate at longer lags. Dekimpe & Hanssens (1999) argue high-frequency data makes causal ordering easier to justify.
> ^ex-short-interval

## Connection to Structural Causal Models

Granger causality is a predictive concept distinct from the structural causality in [[Directed Acyclic Graphs]] (DAGs). A Granger-causal relationship:
- May be spurious if a common cause $Z$ drives both $X$ and $Y$ with different lags
- Does not imply that an intervention on $X$ will change $Y$ (only that observing $X$ predicts $Y$)

For managerial decisions (manipulating advertising), structural identification (IV, DiD, RCT) is required — see [[Instrumental Variables]], [[Differences-in-Differences]].

## Cross-Links

- VAR framework: [[Multivariate Persistence and Cointegration]]
- Granger causality and DAGs: [[Directed Acyclic Graphs]]
- Structural causal identification: [[Instrumental Variables]], [[Conditional Independence Assumption]]
- Reaction functions (inter-firm Granger causality): [[Reaction Functions and Competitive Dynamics]]
