---
title: "Aggregation of Relations"
aliases:
  - "Aggregation Bias in Marketing"
  - "Individual to Aggregate Response"
tags:
  - type/concept
  - topic/market-response
  - topic/aggregation
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 3"
chapter: "3"
status: complete
doc_type: concept
source_location: "Ch. 3, Sec. 3.3, pp. 129-137"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Markets Data and Sales Drivers]]"
used_by:
  - "[[Design of Static Response Models]]"
  - "[[Carryover Effects and Distributed Lags]]"
---

# Aggregation of Relations

> [!abstract] Summary
> Market response models are almost always estimated on aggregate data (stores, markets, or national), while the underlying behavioral processes occur at the individual level. This note covers the conditions under which aggregate models correctly recover individual parameters, and when aggregation bias arises.

## The Aggregation Problem

> [!definition] Aggregation Bias
> **Aggregation bias** occurs when the functional form of an individual-level response function does not carry over to the aggregate level. If individual $i$ has response $Q_i = f(X_i; \beta_i)$, the aggregate $Q = \sum_i Q_i$ generally cannot be written as $f(\bar{X}; \bar{\beta})$ unless $f$ is linear or strong distributional assumptions hold.
> ^def-aggregation-bias

## Conditions for Exact Aggregation

> [!theorem] Exact Aggregation (Linear Case)
> For the linear model $Q_i = \beta_0 + \beta_1 X_i + \epsilon_i$, summing over $N$ individuals:
>
> $$Q = N\beta_0 + \beta_1 \sum_i X_i + \sum_i \epsilon_i = N\beta_0 + \beta_1 N\bar{X} + N\bar{\epsilon}$$
>
> The aggregate OLS on $\bar{Q}$ and $\bar{X}$ recovers the same $\beta_1$. **Exact aggregation holds for linear models.**
> ^thm-exact-agg

For **nonlinear** forms (log-log, logistic, etc.), exact aggregation fails except in special cases. The aggregate elasticity is a weighted average of individual elasticities, and the weights depend on the distribution of $X_i$ across the population.

## Approximate Aggregation (Second-Order Correction)

For a nonlinear function $f(X)$, a second-order Taylor expansion around the mean $\bar{X}$ gives:

$$E[f(X)] \approx f(\bar{X}) + \frac{1}{2} f''(\bar{X}) \cdot \text{Var}(X)$$

The **correction term** $\frac{1}{2} f''(\bar{X}) \cdot \text{Var}(X)$ is:
- Zero for linear $f$ (exact aggregation)
- Negative for concave $f$ (aggregate overestimates mean individual response)
- Positive for convex $f$ (aggregate underestimates mean individual response)

## Marketing Implications

> [!example] Aggregation and Advertising Response
> If individual advertising response is concave (diminishing returns at the individual level), the aggregate response function is also concave but may appear more linear. The slope at the aggregate mean understates diminishing returns — i.e., the aggregate model overestimates the return to further advertising at the margin.
>
> This matters for budget optimization: optima derived from aggregate models may differ from those that maximize individual-level expected utility.
> ^ex-agg-advertising

## Cross-Sectional Heterogeneity and Random Coefficients

When $\beta_i$ varies across individuals (heterogeneous response), the aggregate model picks up an average effect. The **random coefficients model** (see [[Functional Forms in Marketing]]) explicitly models this heterogeneity:

$$Q_{it} = \beta_{0i} + \beta_{1i} X_{it} + \epsilon_{it}$$

where $\beta_{ji} \sim (\bar\beta_j, \sigma^2_\beta)$. The aggregate-level regression recovers $\bar\beta_j$ but conceals the distribution of individual effects, which matters for targeted marketing decisions.

## Temporal vs. Cross-Sectional Aggregation

| Type | Mechanism | Key Bias |
|------|-----------|----------|
| Temporal (weekly → monthly) | Carryover effects compressed | Retention rate $\lambda$ inflated (Clarke 1976) |
| Cross-sectional (store → market) | Heterogeneous responses averaged | Elasticity biased toward mean |
| Functional-form | Nonlinear $f$ aggregated | Second-order correction term |

See [[Carryover Effects and Distributed Lags]] for temporal aggregation corrections.

## Cross-Links

- Functional forms: [[Functional Forms in Marketing]]
- Temporal aggregation bias: [[Carryover Effects and Distributed Lags]]
- Hierarchical models for heterogeneity: [[Hierarchical Linear Models]]
- Random coefficients: [[Functional Forms in Marketing]]
