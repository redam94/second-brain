---
title: "Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 1.2 (Eq. 6) and 1.4 (P-splines); Bayesian translation is concept note, not in the paper"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - GAMLSS Model Framework]]"
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
used_by:
  - "[[Stasinopoulos 2007 - GAMLSS in R - Overview]]"
aliases:
  - Bayesian distributional regression PyMC
  - Bayesian P-splines RW2
  - GAMLSS in PyMC
---

# Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC

> [!summary]
> GAMLSS's penalized likelihood $\ell_p$ is the log-posterior of a model with Gaussian random-walk priors on spline coefficients. In PyMC you give each distribution parameter its own P-spline with a second-order random-walk (RW2) prior, a log link for positive scales, and a hyperprior on the smoothing variance. This note is a *concept translation* (not in the 2007 paper); the PyMC code is **untested pseudo-real code**.

## Overview

Equation (6) of the paper, $\ell_p=\ell-\tfrac12\sum\lambda_{jk}\boldsymbol\gamma_{jk}^\top\mathbf G_{jk}\boldsymbol\gamma_{jk}$, equals $\log p(\mathbf y\mid\boldsymbol\gamma)+\log p(\boldsymbol\gamma\mid\lambda)$ up to constants with prior $\boldsymbol\gamma\sim N(0,(\lambda\mathbf K)^-)$. GAMLSS therefore returns the *posterior mode* for fixed $\lambda$; a Bayesian analysis samples $(\boldsymbol\gamma,\lambda)$ jointly and propagates smoothing uncertainty into the centile curves.

## Main Content

> [!definition] Bayesian P-spline (RW2)
> For parameter $k$, with B-spline basis $\mathbf B(x)\in\mathbb R^{n\times q}$ and difference matrix $\mathbf D_2$ ($(q-2)\times q$),
> $$\eta_k(x)=\beta_{0k}+\mathbf B(x)\boldsymbol\gamma_k,\quad \mathbf D_2\boldsymbol\gamma_k\sim N(\mathbf 0,\tau_k^2\mathbf I),\quad \tau_k\sim \text{HalfNormal}.$$
> The smoothing parameter is $\lambda_k=\tau_k^{-2}$; the null space of $\mathbf D_2'\mathbf D_2$ (constant and linear) is handled by the intercept and a free linear slope ("centred RW2"). Equivalent GAMLSS `ps(x, order=2)`.
^def-bayes-pspline

> [!example] Growth-chart model for E41 (PyMC 5 sketch, untested)
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt
> from patsy import dmatrix
>
> # x = age (or age**xi), y = BMI, B = (n, q) cubic B-spline design matrix
> B = np.asarray(dmatrix("bs(x, df=20, degree=3, include_intercept=False) - 1",
>                        {"x": x}))
> q = B.shape[1]
>
> def rw2_spline(name, scale_sd=1.0):
>     tau = pm.HalfNormal(f"tau_{name}", scale_sd)
>     z = pm.Normal(f"z_{name}", 0, 1, shape=q)            # non-centred increments
>     g = pt.cumsum(pt.cumsum(z * tau)) / q                # RW2 via double cumsum
>     b0 = pm.Normal(f"b0_{name}", 0, 2)
>     b1 = pm.Normal(f"b1_{name}", 0, 1)                   # linear part
>     return b0 + b1 * x_std + pt.dot(B, g)
>
> with pm.Model() as m:
>     mu = rw2_spline("mu")                    # identity link (centred on data scale)
>     sigma = pt.exp(rw2_spline("sigma", 0.5)) # log link
>     nu = rw2_spline("nu", 0.5)               # Box-Cox power, identity
>     # LMS: Z = ((y/M)**nu - 1)/(nu*S) ~ Normal(0,1), with Jacobian y**(nu-1)/(M**nu * S)
>     M = pt.exp(mu)
>     z = ((y / M) ** nu - 1) / (nu * sigma)
>     pm.Potential("lms", pt.sum(-0.5 * z**2 + (nu - 1) * pt.log(y) - nu * pt.log(M) - pt.log(sigma)))
>     idata = pm.sample(1000, tune=1000, target_accept=0.95)
> ```
> Notes: (i) replace Normal by Student-$t$ for BCT (add a `tau = 2 + HalfNormal`-type df); (ii) the Jacobian term is the Box-Cox change of variables; (iii) restrict $|\nu\sigma z|<1$ or the support is violated — use a centred parametrisation and tight priors on $\nu$; (iv) E41 compares constant spread, smooth spread, skewed and heavy-tailed variants by LOO.
^ex-pymc-lms

**Comparing variants.** Fit (a) $\sigma$ constant, (b) smooth $\sigma$, (c) add $\nu$ (skew), (d) add $\tau$ (heavy tails) and compare by PSIS-LOO or by held-out log score; the Bayesian counterpart of GAIC/VGD ([[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]). Check calibration by PIT / normalised quantile residuals binned by age (worm-plot analogue; [[Posterior Predictive Checking]]).

**Pitfalls.** BCCG/BCT likelihood has a data-dependent support when $\nu\ne0$; the paper warns about likelihood singularities for small samples (penalise $\sigma\to0$). With many P-spline blocks use non-centred increments and `target_accept` $\ge0.9$.

## Examples

Alternative smoother: a [[Hilbert Space Gaussian Processes]] prior on each $\eta_k(x)$ gives the same distributional structure with kernel-based smoothness and fewer knot-placement decisions.

## Connections

[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]], [[Hierarchical Models]] (random-effect terms in $\mathbf Z\boldsymbol\gamma$ as partial pooling), [[Prior Predictive Checking]] for the smoothing priors.

## See Also

[[Quantile Regression]], [[Generalized Linear Models]]
