---
title: "Stasinopoulos 2007 - Distributions and Additive Terms"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 1.3-1.4, Tables 1-3, pp. 4-11"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - GAMLSS Model Framework]]"
used_by:
  - "[[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]"
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
aliases:
  - gamlss.family distributions
  - GAMLSS P-splines
  - penalized splines in GAMLSS
---

# Stasinopoulos 2007 - Distributions and Additive Terms

> [!summary]
> The `gamlss.family` catalogue spans 1-4 parameter continuous and discrete distributions with default links; ten additive-term functions (cubic splines, P-splines, loess, fractional polynomials, random effects, ...) build the smooth predictors. The P-spline term is a B-spline basis with an $r$-th order difference penalty on coefficients — the same construction used in Bayesian distributional regression.

## Overview

Section 1.3 lists the distributions (Tables 1-2); Section 1.4 the smoothers (Table 3). Every family exposes `d`, `p`, `q`, `r` functions (e.g. `dGA`, `pGA`, `qGA`, `rGA` for the gamma) and a fitting function that supplies links, first and (approximate) expected second derivatives and starting values.

## Main Content

### Continuous families (Table 1, selected, with default links $\mu,\sigma,\nu,\tau$)

| Distribution | Name | $\mu$ | $\sigma$ | $\nu$ | $\tau$ |
|---|---|---|---|---|---|
| normal | `NO` | identity | log | - | - |
| gamma | `GA` | log | log | - | - |
| inverse Gaussian | `IG` | log | log | - | - |
| log-normal | `LOGNO` | log | log | - | - |
| Weibull | `WEI` | log | log | - | - |
| Gumbel / reverse Gumbel | `GU`, `RG` | identity | log | - | - |
| beta | `BE` | logit | logit | - | - |
| zero/one-inflated beta | `BEINF` | logit | logit | log | log |
| Box-Cox Cole-Green (BCCG) | `BCCG` | identity | log | identity | - |
| Box-Cox power exponential | `BCPE` | identity | log | identity | log |
| Box-Cox $t$ | `BCT` | identity | log | identity | log |
| Johnson SU | `JSU` | identity | log | identity | log |
| skew $t$ (types 1-5) | `ST1`-`ST5` | identity | log | identity or log | log |
| skew power exponential (1-4) | `SEP1`-`SEP4` | identity | log | identity or log | log |
| sinh-arcsinh | `SHASH` | identity | log | log | log |
| generalized beta type 2 | `GB2` | log | identity | log | log |

Table 1 also includes exponential, exponential Gaussian, generalized gamma, generalized inverse Gaussian, logistic, power exponential, NET, $t$ family and zero-adjusted inverse Gaussian.

> [!definition] BCCG = LMS
> The BCCG distribution is the Box-Cox transformation model of Cole and Green (1992), also known as the **LMS method** of centile estimation. BCPE (Rigby and Stasinopoulos 2004) and BCT (2006) generalise it to model both skewness *and* kurtosis. See [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]].
^def-bccg-lms

### Discrete families (Table 2)

Poisson `PO` (log), binomial `BI` (logit), negative binomial type I/II `NBI`/`NBII` (log, log), Poisson inverse Gaussian `PIG`, Sichel `SI`/`SICHEL` (log, log, identity), Delaporte `DEL`, beta binomial `BB` (logit, log), zero-inflated Poisson `ZIP`/`ZIP2` (log, logit).

**Parameterisations.** Several have alternatives, e.g. Weibull: `WEI` $f=\sigma y^{\sigma-1}\mu^{-\sigma}\exp\{-(y/\mu)^\sigma\}$; `WEI2` $f=\sigma\mu y^{\sigma-1}e^{-\mu y^\sigma}$ (proportional hazards); `WEI3` has $\mu$ equal to the mean via $\beta=\mu/[\Gamma(1/\sigma)+1]$. Choice affects optimisation: near-orthogonal parameters fit more easily.

**Extending the families:** (i) write a new `gamlss.family` (needs the pdf), (ii) truncate (`gamlss.tr`, `gen.trun()`), (iii) censor (`gamlss.cens`, `gen.cens()`), (iv) mix (`gamlss.mx`, `gamlssMX()`, `gamlssNP()`).

### Additive terms (Table 3)

| Function | Term |
|---|---|
| `cs()` | cubic smoothing spline (every distinct $x$ is a knot; penalty $\lambda\int h''(t)^2dt$; solution is a natural cubic spline) |
| `vc()` | varying coefficient $\beta(r)x$ (Hastie and Tibshirani 1993) |
| `ps()` | penalized (P-)spline (Eilers and Marx 1996) |
| `lo()` | loess (only term allowing smoothing in several variables) |
| `fp()` | fractional polynomials (Royston and Altman 1994), powers from $\{-2,-1,-0.5,0,0.5,1,2,3\}$ |
| `pp()` | power polynomials, powers estimated non-linearly (experimental) |
| `nl()` | non-linear fit (`gamlss.nl`) |
| `random()`, `ra()`, `rc()` | random effects, augmented-least-squares version, random coefficient |

> [!definition] P-spline term
> For a distribution parameter $\boldsymbol\theta$, $\boldsymbol\theta=\mathbf Z(x)\boldsymbol\gamma$, where $\mathbf Z(x)$ is the $n\times q$ B-spline basis (degree `degree`) on $q$ knots (`ps.intervals`, equally spaced) and $\boldsymbol\gamma\in\mathbb R^q$ satisfies $\mathbf D\boldsymbol\gamma\sim N(\mathbf 0,\lambda^{-1}\mathbf I)$, equivalently $\boldsymbol\gamma\sim N(\mathbf 0,\lambda^{-1}\mathbf K^-)$ with $\mathbf K=\mathbf D^\top\mathbf D$. $\mathbf D$ is the $(q-r)\times q$ $r$-th order difference matrix (`order`). Smoothness is set by `df` (equivalent degrees of freedom) or `lambda`.
^def-pspline

Degrees of freedom of smoothers are counted *beyond* the constant and linear part: `cs(x, df=3)` gives 5 total df; this differs from `gam::s(x, df=4)`.

**Backfitting convention.** The linear part of an additive term is placed in the linear design matrix and the smoother is fitted as a deviation (modified backfitting). Output components per parameter: `mu.s` (smoother fits), `mu.var`, `mu.df`, `mu.lambda`, `mu.coefSmo`. Random-effect terms estimate $\boldsymbol\gamma$ *given* $\lambda$; hyperparameters come from Rigby and Stasinopoulos (2005, App. A) or from `gamlssNP()` with Gaussian quadrature.

## Examples

> [!example] Why not a polynomial? (CD4 data)
> A degree-7 polynomial minimised both AIC and SBC for the CD4 mean but looked "wobbly at the end of the age range" (p. 19) — typical polynomial behaviour. The penalized/smoothing-spline alternatives are in [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]].
^ex-poly-wobble

## Connections

- Hilbert-space/GP alternatives to P-splines: [[Hilbert Space Gaussian Processes]].
- Count families (NBI, PIG, Sichel, ZIP) vs [[Generalized Linear Models]].

## See Also

[[Stasinopoulos 2007 - GAMLSS Model Framework]], [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]
