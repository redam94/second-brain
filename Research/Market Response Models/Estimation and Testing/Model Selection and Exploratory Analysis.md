---
title: "Model Selection and Exploratory Analysis"
aliases:
  - "MRM Model Selection"
  - "Exploratory Data Analysis Marketing"
tags:
  - type/concept
  - topic/market-response
  - topic/model-comparison
  - source/hanssens-parsons-schultz-2001
date_ingested: 2026-04-11
date_updated: 2026-07-27
folder: "Market Response Models/Estimation and Testing"
source: "Hanssens, Parsons & Schultz (2001) Ch. 5"
chapter: "5"
status: complete
doc_type: concept
source_location: "Ch. 5, Sec. 5.4, pp. 229-247"
depends_on:
  - "[[Model Testing and Specification]]"
  - "[[Flexible Functional Forms]]"
  - "[[Parameter Estimation in Market Response]]"
used_by: []
---

# Model Selection and Exploratory Analysis

> [!abstract] Summary
> Model selection for market response models involves choosing among candidate functional forms, lag structures, and variable sets. This note covers information criteria (AIC, BIC), cross-validation, prior knowledge integration, and the role of exploratory data analysis (EDA) before formal model estimation.

## The Model Selection Problem in Marketing

Market response modeling faces three nested selection problems:
1. **Variable selection**: which marketing instruments to include
2. **Functional form selection**: linear, log-log, ADBUDG, etc.
3. **Lag structure selection**: Koyck, PDL, or unrestricted ADL

These cannot be tested simultaneously within a single classical framework without inflating Type I error — related to [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]].

## Information Criteria

> [!definition] AIC and BIC
> For a model with $k$ free parameters and log-likelihood $\ln\hat{L}$:
>
> $$\text{AIC} = -2\ln\hat{L} + 2k$$
> $$\text{BIC} = -2\ln\hat{L} + k\ln T$$
>
> Select the model with **lowest** AIC or BIC. BIC penalizes complexity more heavily and tends toward parsimony. For large $T$, BIC is consistent (selects the true model if it is in the candidate set); AIC selects the best approximating model.
>
> Both are equivalent to Bayesian model comparison with flat priors (AIC) or reference priors (BIC) — see [[Model Comparison]] and [[Overfitting and Information Criteria]].
> ^def-aic-bic

## Cross-Validation for Predictive Model Selection

> [!definition] Hold-Out Cross-Validation
> Split the time series into **estimation period** and **validation period**:
> 1. Estimate model on first $T_1$ observations
> 2. Forecast for observations $T_1 + 1, \ldots, T$
> 3. Compare forecasts to actual values (MAPE, RMSE)
>
> This directly targets **predictive accuracy** rather than in-sample fit. Cross-validation favors models that generalize rather than overfit.
>
> For time series, use **rolling window** or **recursive** forecasting rather than random k-fold splits (to avoid look-ahead bias).
> ^def-cv

## Role of Prior Knowledge in Model Selection

> [!example] Manager Elicitation
> Before estimation, managers can provide:
> - **Response at current spending**: point estimate of current sales
> - **Response at zero spending**: baseline sales estimate
> - **Saturation level**: maximum achievable sales
> - **Shape**: concave vs. S-shaped based on industry experience
>
> These constraints can be incorporated as **Bayesian priors** or as parameter bounds in nonlinear estimation, reducing the effective model selection problem to a constrained search. This approach aligns with ADBUDG calibration (Little 1970) and managerial judgment methods.
> ^ex-manager-elicitation

## Exploratory Data Analysis for Marketing Data

Before formal estimation:

1. **Plot raw series**: identify trends, seasonality, outliers
2. **Scatter plots $Q$ vs. $X_j$**: visual indication of linearity vs. concavity
3. **Correlation matrix**: flag multicollinearity among instruments
4. **ACF/PACF of $Q$**: determine if dynamic model is needed (see [[Single Marketing Time Series]])
5. **CCF between $Q$ and $X$**: identify transfer function structure (see [[Transfer Function Model]])
6. **Box plots by promotion status**: quantify lift from feature/display

## Multiple Testing and the Garden of Forking Paths

Running many specification tests on the same data inflates the overall Type I error rate. Key connections:

- **Pre-registration** of model specification before seeing data
- **Bonferroni correction** for multiple elasticity comparisons: see [[Multiple Testing Corrections]]
- **Bayesian model averaging**: assign posterior probability to each model and average predictions

The more researchers test, the more likely a spuriously good-fitting model will be found. Reporting AIC alongside p-values mitigates this.

## Cross-Links

- Specification testing: [[Model Testing and Specification]]
- Flexible forms for comparison: [[Flexible Functional Forms]]
- Bayesian model comparison: [[Model Comparison]], [[Overfitting and Information Criteria]]
- Multiple testing: [[Multiple Testing Corrections]], [[Garden of Forking Paths]], [[Forking Paths and Bayesian Approaches]]
- ARIMA identification (EDA for time series): [[Single Marketing Time Series]]

## See Also

- [[Bayesian Workflow - Overview]] — information criteria (WAIC/LOO) appear at the model-comparison step of the Bayesian workflow
- [[MMM Model Selection and Application]] — applies these model selection tools in the Bayesian MMM context (geometric vs. delayed adstock, saturation specification)
- [[Researcher Degrees of Freedom]] — the multiple-comparison risk when searching over variable sets, functional forms, and lag structures simultaneously
