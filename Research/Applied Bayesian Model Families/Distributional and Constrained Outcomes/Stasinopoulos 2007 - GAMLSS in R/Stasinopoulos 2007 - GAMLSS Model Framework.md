---
title: "Stasinopoulos 2007 - GAMLSS Model Framework"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 1.1-1.2, Eqs. (1)-(6), pp. 1-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Generalized Linear Models]]"
used_by:
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
  - "[[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]"
  - "[[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]"
aliases:
  - GAMLSS definition
  - location scale and shape model
---

# Stasinopoulos 2007 - GAMLSS Model Framework

> [!summary]
> A GAMLSS assumes independent observations $y_i \sim f(y_i\mid\mu_i,\sigma_i,\nu_i,\tau_i)$ and gives each distribution parameter its own monotone link and an additive predictor of linear terms plus smooth or random-effect terms. It strictly generalises GLM and GAM by dropping the exponential-family restriction and by letting scale and shape depend on covariates.

## Overview

GLMs model $E(y)$ through a link and treat dispersion as constant or mean-tied. GAMs add smooth terms to the mean. GAMLSS (Rigby and Stasinopoulos 2001, 2005; Akantziliotou et al. 2002) are "semi-parametric": a parametric distribution assumption for $y$ ("parametric") with non-parametric smooths in the parameter predictors ("semi"). The framework suits leptokurtic/platykurtic, skewed, or overdispersed responses and heterogeneity where scale or shape moves with covariates.

## Main Content

> [!definition] GAMLSS model (Eq. 1)
> Independent $y_i$ ($i=1,\dots,n$) have density $f(y_i\mid\boldsymbol\theta_i)$ with $\boldsymbol\theta_i=(\theta_{1i},\theta_{2i},\theta_{3i},\theta_{4i})=(\mu_i,\sigma_i,\nu_i,\tau_i)$. For $k=1,\dots,4$, with monotone known links $g_k(\cdot)$,
> $$g_k(\boldsymbol\theta_k)=\boldsymbol\eta_k=\mathbf X_k\boldsymbol\beta_k+\sum_{j=1}^{J_k}\mathbf Z_{jk}\boldsymbol\gamma_{jk}$$
> where $\mathbf X_k$ is a known $n\times J_k'$ design matrix, $\boldsymbol\beta_k$ the linear coefficients, $\mathbf Z_{jk}$ known $n\times q_{jk}$ design matrices, and $\boldsymbol\gamma_{jk}\sim N_{q_{jk}}(\mathbf 0,\mathbf G_{jk}^{-1})$ with $\mathbf G_{jk}=\mathbf G_{jk}(\boldsymbol\lambda_{jk})$ a (generalised-inverse) symmetric precision matrix depending on hyperparameters $\boldsymbol\lambda_{jk}$. If $\mathbf G_{jk}$ is singular, $\boldsymbol\gamma_{jk}$ has improper density $\propto\exp(-\tfrac12\boldsymbol\gamma_{jk}^\top\mathbf G_{jk}\boldsymbol\gamma_{jk})$.
^def-gamlss

The first two parameters are conventionally location ($\mu$) and scale ($\sigma$); remaining parameters are shape (skewness $\nu$, kurtosis $\tau$). Seldom do all parameters need covariates.

> [!definition] Sub-models (Eqs. 2-5)
> - **Semi-parametric additive** ($\mathbf Z_{jk}=\mathbf I_n$, $\boldsymbol\gamma_{jk}=h_{jk}(x_{jk})$): $g_k(\boldsymbol\theta_k)=\mathbf X_k\boldsymbol\beta_k+\sum_j h_{jk}(x_{jk})$ (Eq. 2).
> - **Parametric linear** (no additive terms): $g_k(\boldsymbol\theta_k)=\mathbf X_k\boldsymbol\beta_k$ (Eq. 3).
> - **Non-linear semi-parametric** : $g_k(\boldsymbol\theta_k)=h_k(\mathbf X_k,\boldsymbol\beta_k)+\sum_j h_{jk}(x_{jk})$ (Eq. 4).
> - **Non-linear parametric**: $g_k(\boldsymbol\theta_k)=h_k(\mathbf X_k,\boldsymbol\beta_k)$ (Eq. 5).
^def-gamlss-submodels

> [!definition] Penalized log-likelihood (Eq. 6)
> For fixed hyperparameters $\lambda_{jk}$, the $\boldsymbol\beta_k,\boldsymbol\gamma_{jk}$ maximise
> $$\ell_p=\ell-\tfrac12\sum_{k=1}^{p}\sum_{j=1}^{J_k}\lambda_{jk}\,\boldsymbol\gamma_{jk}^\top\mathbf G_{jk}\boldsymbol\gamma_{jk},\qquad \ell=\sum_{i=1}^n\log f(y_i\mid\boldsymbol\theta_i).$$
> For parametric models $\ell_p=\ell$.
^def-penalized-likelihood

**Restrictions in the R implementation.** Only $\log f$ and its first (optionally expected second and cross) derivatives wrt each parameter must be computable; numerical derivatives are allowed. Information-orthogonal parameters (cross derivatives zero) make fitting easier; the authors prefer parameterisations in which $\mu$ is a location (mean, median or mode).

**Interval-censored data** (Eqs. 7-8): the likelihood $L(\theta)=\prod f(y_i\mid\theta)$ becomes $L(\theta)=\prod[F(y_{2i}\mid\theta)-F(y_{1i}\mid\theta)]$ for observed intervals $(y_{1i},y_{2i}]$. **Finite mixtures** (Eq. 9): $f_Y(y\mid\psi)=\sum_{k=1}^K\pi_kf_k(y\mid\theta_k)$, fitted by EM; mixing probabilities may themselves depend on covariates.

## Examples

> [!example] Reading the formula for the CD4 model
> For CD4 counts vs age the paper fits `cd4 ~ cs(age), sigma.fo = ~cs(age)` with the normal family. Here $k=1$: $g_1=\mathrm{identity}$, $\eta_1=\beta_{01}+h_{11}(\text{age})$; $k=2$: $g_2=\log$, $\log\sigma=\beta_{02}+h_{12}(\text{age})$. This is a smooth mean *and* smooth log-standard-deviation. See [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]].
^ex-cd4-formula

## Connections

- Strictly contains GLMs ([[Generalized Linear Models]]) and GAMs.
- Smooth terms are penalised (P-splines, cubic smoothing splines) — see [[Stasinopoulos 2007 - Distributions and Additive Terms]]. The Bayesian reading: $\boldsymbol\gamma_{jk}\sim N(0,\lambda^{-1}\mathbf K^-)$ is a (partially improper) Gaussian prior and Eq. 6 gives the posterior mode; see [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]].
- Hierarchical analogue: random-effect terms $\mathbf Z\boldsymbol\gamma$ are partial pooling ([[Hierarchical Models]]).

## See Also

[[Stasinopoulos 2007 - GAMLSS in R - Overview]], [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]
