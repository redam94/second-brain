---
title: "Design of Static Response Models"
aliases:
  - "Static Marketing Models"
  - "Cross-Sectional Response Models"
tags:
  - type/concept
  - topic/market-response
  - topic/model-design
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 3"
chapter: "3"
status: complete
doc_type: concept
source_location: "Ch. 3, pp. 89-137"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Market Share Models]]"
  - "[[Aggregation of Relations]]"
used_by:
  - "[[Design of Dynamic Response Models]]"
  - "[[Parameter Estimation in Market Response]]"
  - "[[Implementation of Market Response Models]]"
---

# Design of Static Response Models

> [!abstract] Summary
> A static response model estimates the contemporaneous (same-period) relationship between marketing instruments and sales. This note covers the design choices — variable selection, functional form, competition specification — that precede estimation. Static models are the foundation; Chapter 4 adds dynamic extensions.

## When Static Models Are Appropriate

A static model is appropriate when:
1. Carryover effects are negligible (very fast decay, $\lambda \approx 0$)
2. The data are cross-sectional (many brands/markets at one time point)
3. The researcher seeks a reduced-form summary of long-run effects only

When dynamics are important, the static model will mis-attribute carryover to current period and bias elasticities upward. See [[Carryover Effects and Distributed Lags]].

## Variable Selection Principles

> [!definition] Model Completeness
> A well-specified static response model must include:
> - **Focal instrument**: the marketing variable of primary interest (e.g., advertising, price)
> - **Control variables**: other marketing mix elements that affect sales (price, distribution, promotion)
> - **Competitive variables**: rival brands' price, advertising, and promotions
> - **Environmental variables**: seasonality, economic conditions, category trend
>
> Omitting relevant variables biases included coefficients — see [[Omitted Variables Bias]].
> ^def-model-completeness

## Competitive Specification

Three main approaches to incorporate competition:

| Approach | Model | Advantage |
|----------|-------|-----------|
| Absolute levels | $Q = f(X_{\text{own}}, X_{\text{rival}})$ | Direct interpretation |
| Share of voice | $Q = f(\text{SOV})$ where SOV $= X_{\text{own}} / \sum X_j$ | Captures competitive intensity |
| Market share | $MS = g(X_{\text{own}}, \mathbf{X}_{\text{rivals}})$ | Bounded outcome, MCI/MNL structure |

The market-share approach ensures logical consistency (shares sum to 1) — see [[Market Share Models]].

## Interaction Terms

Static models can capture **moderation** via interaction terms:

$$
Q = \beta_0 + \beta_1 A + \beta_2 P + \beta_3 (A \times P) + \epsilon
$$

where $\beta_3$ captures how advertising modifies price sensitivity (or vice versa). This is equivalent to letting $\partial Q / \partial P$ be a function of $A$:

$$
\frac{\partial Q}{\partial P} = \beta_2 + \beta_3 A
$$

Related to [[Bayesian moderation analysis]] in the Bayesian statistics module.

## Dummy Variables and Categorical Marketing Variables

Feature advertising and display are typically binary:
- $F_{it} = 1$ if brand $i$ ran feature ad in week $t$, else 0
- $D_{it} = 1$ if brand $i$ had in-store display in week $t$, else 0

In multiplicative models, dummies enter as:

$$
Q = \beta_0 \cdot e^{\gamma_F F + \gamma_D D} \cdot (\text{other terms})
$$

so $e^{\gamma_F}$ is the **feature multiplier** (ratio of sales with feature to sales without feature).

## Specification Checklist

Before estimating, verify:
- [ ] All key marketing instruments included (avoid OVB)
- [ ] Functional form consistent with prior theory (concavity, saturation)
- [ ] Competitive variables included or argued to be orthogonal to focal instrument
- [ ] Seasonality and trend controlled (dummy variables or detrending)
- [ ] Sample period homogeneous (no structural breaks)
- [ ] Data level appropriate (store/market/national match advertising measurement)

## Connection to Dynamic and Hierarchical Models

Static models are estimated equation-by-equation. When:
- Multiple time periods exist: extend to dynamic models (ADL, distributed lags)
- Multiple brands/markets exist: extend to panel models (SUR, random effects)
- Bayesian shrinkage is desired: extend to hierarchical Bayes

## Cross-Links

- Functional forms catalogue: [[Functional Forms in Marketing]]
- Market share systems: [[Market Share Models]]
- Aggregation issues: [[Aggregation of Relations]]
- Dynamic extension: [[Design of Dynamic Response Models]]
- Estimation: [[Parameter Estimation in Market Response]]
- OVB: [[Omitted Variables Bias]]
