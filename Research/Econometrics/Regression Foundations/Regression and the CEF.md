---
title: Regression and the Conditional Expectation Function
aliases:
  - Regression and the CEF
  - Making Regression Make Sense
  - CEF
  - Conditional Expectation Function
tags:
  - source/ingested
  - topic/econometrics
  - topic/regression
  - topic/statistics
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Regression Foundations"
doc_type: concept
source_location: "MHE Ch. 3, pp. 21-82"
depends_on:
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
  - "[[Research Questions in Econometrics]]"
used_by:
  - "[[Conditional Independence Assumption]]"
  - "[[Omitted Variables Bias]]"
  - "[[Instrumental Variables]]"
  - "[[Quantile Regression]]"
  - "[[Standard Errors and Clustering]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
---

# Regression and the CEF

> [!summary]
> The population regression function is the best linear approximation to the conditional expectation function (CEF). This relationship holds regardless of whether the CEF is actually linear, giving regression a robust interpretation even when functional form assumptions fail.

## The CEF

The conditional expectation function $E[Y_i|X_i]$ is:
- The **best predictor** of $Y_i$ given $X_i$ (minimizes mean squared error)
- A function that **decomposes** any random variable: $Y_i = E[Y_i|X_i] + \varepsilon_i$ where $\varepsilon_i$ is uncorrelated with any function of $X_i$

## Three Justifications for Regression

### 1. Linear CEF Theorem
If the CEF is linear, then the population regression function equals the CEF.

### 2. Best Linear Predictor Theorem
The regression function $X_i'\beta$ is the **best linear predictor** of $Y_i$ given $X_i$ in the MMSE sense.

### 3. Regression-CEF Theorem (the key one)
Even when the CEF is nonlinear, regression provides the **MMSE linear approximation** to it:
$$\beta = \arg\min_b E\{(E[Y_i|X_i] - X_i'b)^2\}$$

## Regression Anatomy

The coefficient on regressor $k$ in a multivariate regression:
$$\beta_k = \frac{Cov(Y_i, \tilde{x}_{ki})}{V(\tilde{x}_{ki})}$$

where $\tilde{x}_{ki}$ is the residual from regressing $x_{ki}$ on all other covariates. This is the **Frisch-Waugh** result: each multivariate coefficient equals the bivariate coefficient after "partialling out" other variables.

## Robust Standard Errors

The heteroskedasticity-consistent (robust) covariance matrix:
$$E[X_iX_i']^{-1} E[X_iX_i'e_i^2] E[X_iX_i']^{-1}$$

> [!tip] Always Use Robust Standard Errors
> Since regression approximates a possibly nonlinear CEF, heteroskedasticity is the natural state of affairs. Robust and conventional standard errors that differ by more than 30% may indicate a problem.

## Saturated Models

A saturated model has a separate parameter for every possible covariate combination — it fits the CEF perfectly and is inherently linear. Example: with two dummies $x_1, x_2$, the saturated model includes both main effects and their interaction.

## See Also

- [[Conditional Independence Assumption]]
- [[Omitted Variables Bias]]
- [[Mostly Harmless Econometrics - Overview]]
- [[Bayesian Linear Regression]] — the Bayesian perspective on regression, with priors providing natural regularization
- [[Asymptotics and Frequentist Connections]] — Bayesian posteriors converge to OLS estimates under flat priors
