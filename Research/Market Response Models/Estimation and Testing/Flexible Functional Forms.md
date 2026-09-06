---
title: "Flexible Functional Forms"
aliases:
  - "Translog Model Marketing"
  - "Flexible MRM Specifications"
tags:
  - type/concept
  - topic/market-response
  - topic/functional-forms
  - topic/estimation
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 5"
chapter: "5"
status: complete
doc_type: concept
source_location: "Ch. 5, Sec. 5.3, pp. 225-228"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Parameter Estimation in Market Response]]"
used_by:
  - "[[Model Selection and Exploratory Analysis]]"
folder: "Research/Market Response Models/Estimation and Testing"
date_ingested: 2026-04-08
---

# Flexible Functional Forms

> [!abstract] Summary
> Flexible functional forms provide second-order approximations to an arbitrary unknown response function without committing to a specific parametric shape. They are particularly useful when the shape of the marketing response is uncertain and the data should drive the specification.

## Motivation

Standard functional forms (linear, log-log, ADBUDG) impose strong a priori shape restrictions. When theory is ambiguous about whether response is concave, S-shaped, or convex, a flexible form lets the data determine the local curvature.

## The Translog (Transcendental Logarithmic) Form

> [!definition] Translog
> A second-order Taylor expansion in logs around the sample mean:
>
> $$\ln Q = \alpha_0 + \sum_j \beta_j \ln X_j + \frac{1}{2}\sum_j \sum_k \gamma_{jk} \ln X_j \cdot \ln X_k + \epsilon$$
>
> The translog nests:
> - Log-log (power): when all $\gamma_{jk} = 0$
> - Interaction effects between instruments: $\gamma_{jk} \neq 0$
>
> **Symmetry restriction:** $\gamma_{jk} = \gamma_{kj}$ (curvature matrix is symmetric)
>
> **Own-price elasticity:** $\eta_j = \beta_j + \sum_k \gamma_{jk} \ln X_k$ (non-constant, varies with marketing levels)
> ^def-translog

## The Box-Cox Transformation

> [!definition] Box-Cox Power Transformation
> The Box-Cox transformation:
>
> $$Q^{(\lambda)} = \frac{Q^\lambda - 1}{\lambda}, \quad \lambda \to 0 \Rightarrow \ln Q$$
>
> Applied to both the dependent and independent variables with potentially different $\lambda$:
> $$Q^{(\lambda_0)} = \alpha + \sum_j \beta_j X_j^{(\lambda_j)} + \epsilon$$
>
> MLE over the $\lambda$ parameters yields a data-driven choice of transformation. If $\hat\lambda_0 \approx 0$, log transformation of $Q$ is appropriate. If $\hat\lambda_j \approx 0$, log transformation of $X_j$ is appropriate.
>
> See also Box-Cox for variance stabilization in ARIMA — [[Single Marketing Time Series]].
> ^def-box-cox

## Locally Weighted Regression (LOESS)

For purely nonparametric estimation of the response function $Q = f(X)$ without any parametric restriction:

- Fit a weighted local polynomial at each evaluation point $x_0$
- Weight observations by proximity: $w_i = K((X_i - x_0)/h)$ with bandwidth $h$
- The estimated $\hat f(x_0)$ traces the nonparametric response

Tradeoff: high flexibility but low interpretability and poor out-of-sample performance. Useful as a diagnostic check against parametric forms.

## Spline Models

> [!definition] Regression Spline
> Splines fit piecewise polynomials with continuity constraints at **knots** $\tau_1, \ldots, \tau_K$:
>
> $$Q = \sum_{j=0}^p \beta_j X^j + \sum_{k=1}^K \delta_k (X - \tau_k)_+^p + \epsilon$$
>
> where $(X - \tau_k)_+ = \max(0, X - \tau_k)$. The knot positions can be pre-specified or estimated.
>
> Marketing application: different response regimes at low, medium, and high advertising levels (captures both S-shape and saturation in separate segments).
> ^def-spline

## Comparison of Flexible Forms

| Form | Parameters | Globally valid? | Marketing Use |
|------|-----------|-----------------|---------------|
| Translog | $\sim J^2/2$ | No (local approx) | Multi-instrument response |
| Box-Cox | $J+1$ ($\lambda$'s) | Yes (nests linear & log) | Form selection |
| LOESS | Nonparametric | Locally only | Diagnostic |
| Spline | $p + K + 1$ | By segment | Threshold + saturation |

## Cross-Links

- Standard parametric forms: [[Functional Forms in Marketing]]
- Specification testing: [[Model Testing and Specification]]
- Model selection: [[Model Selection and Exploratory Analysis]]
- Nonparametric Bayes: [[Nonparametric Models Overview]]
