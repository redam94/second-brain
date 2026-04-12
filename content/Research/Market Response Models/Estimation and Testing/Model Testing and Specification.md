---
title: "Model Testing and Specification"
aliases:
  - "MRM Specification Tests"
  - "RESET Test Marketing"
  - "Specification Errors"
tags:
  - type/concept
  - topic/market-response
  - topic/hypothesis-testing
  - topic/specification
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 5"
chapter: "5"
status: complete
doc_type: concept
source_location: "Ch. 5, Sec. 5.2, pp. 201-224"
depends_on:
  - "[[Parameter Estimation in Market Response]]"
used_by:
  - "[[Model Selection and Exploratory Analysis]]"
---

# Model Testing and Specification

> [!abstract] Summary
> After estimation, models must be validated: coefficients tested for significance, overall fit assessed, and specification errors detected. This note covers F-tests, t-tests, the RESET general misspecification test, seven types of specification error, and detection procedures.

## Significance Tests

> [!theorem] F-Test for Model Significance
> Tests whether all slope coefficients are jointly zero:
>
> $$
> F = \frac{(\text{TSS} - \text{RSS})/k}{\text{RSS}/(T - k - 1)} \sim F(k,\ T-k-1) \tag{Eq 5.35}
> $$
>
> Reject $H_0: \beta_1 = \cdots = \beta_k = 0$ when $F > F_{\alpha}(k, T-k-1)$.
> ^thm-f-test

> [!theorem] t-Test for Individual Coefficients
> $$
> t = \frac{\hat\beta_j}{\text{se}(\hat\beta_j)} \sim t(T - k - 1) \tag{Eq 5.37}
> $$
>
> Under $H_0: \beta_j = 0$. Two-sided $|t| > t_{\alpha/2}$ implies rejection. For advertising elasticities, use one-sided test ($H_1: \beta_j > 0$).
> ^thm-t-test

## RESET Test for General Misspecification

> [!definition] Ramsey RESET
> The **Regression Equation Specification Error Test** (Ramsey 1969):
>
> 1. Estimate the original model; save fitted values $\hat{Q}$
> 2. Add powers of fitted values as regressors: $\hat{Q}^2, \hat{Q}^3, \hat{Q}^4$
> 3. Test their joint significance via F-test (Eq 5.40)
>
> Significant RESET statistic indicates general misspecification: wrong functional form, omitted nonlinear terms, or structural breaks. Does **not** identify the specific misspecification.
> ^def-reset

## Seven Specification Error Types

| # | Error Type | Detection Method | Consequence for OLS |
|---|-----------|-----------------|---------------------|
| 1 | Omitted variable | Compare $R^2$ with/without; theory | Biased, inconsistent |
| 2 | Irrelevant variable (over-specification) | t-test; BIC | Inefficient but unbiased |
| 3 | Wrong functional form | RESET; Box-Cox; nested tests | Biased |
| 4 | Measurement error in $X$ | Compare IV vs. OLS | Attenuation bias |
| 5 | Autocorrelation in $u$ | DW test; Ljung-Box Q | Inefficient; SE wrong |
| 6 | Heteroscedasticity | Breusch-Pagan; White test | SE wrong (OLS valid) |
| 7 | Simultaneity | Hausman test | Biased, inconsistent |

Errors 1, 4, and 7 cause **inconsistency**; errors 2, 5, 6 cause **inefficiency** but not bias.

## Restricted Least Squares

When theory imposes restrictions (e.g., homogeneity, adding-up conditions in share models), **restricted OLS** imposes these as linear constraints $\mathbf{R}\boldsymbol{\beta} = \mathbf{r}$:

$$\hat{\boldsymbol{\beta}}_{\text{RLS}} = \hat{\boldsymbol{\beta}}_{\text{OLS}} - (\mathbf{X}'\mathbf{X})^{-1}\mathbf{R}'[\mathbf{R}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{R}']^{-1}(\mathbf{R}\hat{\boldsymbol{\beta}}_{\text{OLS}} - \mathbf{r})$$

The restrictions can be tested via an **F-test** on the incremental RSS from imposing them.

## Nested vs. Non-Nested Tests

- **Nested**: test whether a special case (linear) fits as well as the general (ADBUDG) via F-test on restrictions
- **Non-nested**: compare log-log vs. linear using Davidson-MacKinnon J-test or AIC/BIC

## Detecting Autocorrelation

The **Durbin-Watson (DW)** statistic tests AR(1) residual autocorrelation:

$$d = \frac{\sum_{t=2}^T (\hat u_t - \hat u_{t-1})^2}{\sum_{t=1}^T \hat u_t^2} \approx 2(1 - \hat\rho)$$

$d \approx 2$: no autocorrelation; $d < 2$: positive AR; $d > 2$: negative AR.

For higher-order autocorrelation or models with lagged dependent variables: use the **Ljung-Box Q statistic** on residuals at multiple lags.

## Box-Cox Test for Functional Form

To test linear vs. log-linear form, the **Box-Cox transformation** (Eq 5 in Ch.5 context):

$$Q^{(\lambda)} = \frac{Q^\lambda - 1}{\lambda}$$

MLE over $\lambda$ with $\lambda = 1$ (linear) or $\lambda \to 0$ (log-linear). Confidence interval on $\hat\lambda$ indicates whether the data prefer linear or log transformation.

Related to Box-Cox variance stabilization in ARIMA — see [[Single Marketing Time Series]].

## Cross-Links

- Estimation: [[Parameter Estimation in Market Response]]
- Flexible functional forms: [[Flexible Functional Forms]]
- Model selection: [[Model Selection and Exploratory Analysis]]
- Bayesian model comparison: [[Model Comparison]], [[Overfitting and Information Criteria]]
- Research methodology: [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]]
