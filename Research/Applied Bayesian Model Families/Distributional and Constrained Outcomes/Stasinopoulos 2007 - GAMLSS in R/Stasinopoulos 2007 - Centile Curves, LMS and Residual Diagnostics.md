---
title: "Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/example
  - type/theorem
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 3.5 and Eqs. (10)-(11), pp. 33-44"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
  - "[[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]"
used_by:
  - "[[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]"
aliases:
  - LMS method
  - Box-Cox Cole-Green centiles
  - growth centile charts
  - worm plot
  - Q statistics
---

# Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics

> [!summary]
> Growth charts are conditional quantile curves $y_\alpha(x)$ of a response given age. The LMS method (BCCG) models skewness through a Box-Cox power $\nu(x)$; the Box-Cox $t$ adds a kurtosis parameter $\tau(x)$. On the Fourth Dutch Growth Study head circumference (7,040 boys) a BCT GAMLSS with smooth $\mu,\sigma$ fits with no worm-plot violations, and worm plots plus Q-statistics localise misfit by age range.

## Overview

GAMLSS was adopted by the WHO for the world standard child growth curves (WHO Multicentre Growth Reference Study Group 2006). Centile curves are obtained by fitting a four-parameter distribution whose parameters vary smoothly in age and then inverting the cdf.

## Main Content

> [!definition] Box-Cox Cole-Green (LMS) and BCT
> *(Standard definitions; the paper lists the families in Table 1 and cites Cole and Green 1992, Rigby and Stasinopoulos 2004, 2006 for the formulas.)* If $Y>0$ with median $\mu$, scale $\sigma$ (approximately a coefficient of variation) and Box-Cox power $\nu$, the LMS/BCCG model states that
> $$Z=\frac{(Y/\mu)^{\nu}-1}{\nu\sigma}\ (\nu\ne0),\qquad Z=\frac{\log(Y/\mu)}{\sigma}\ (\nu=0)$$
> is (truncated) standard normal. BCT replaces the normal by a $t$ distribution with $\tau$ degrees of freedom, so $\tau$ controls kurtosis. In the LMS acronym, $L=\nu$ (Lambda), $M=\mu$ (Mu), $S=\sigma$ (Sigma).
^def-lms-bct

> [!theorem] Centile curve (Eq. 11)
> For a BCT$(\mu,\sigma,\nu,\tau)$ response, the $100\alpha$-th centile at covariate $x$ is approximately
> $$y_\alpha(x)=\mu(x)\{1+\nu(x)\sigma(x)\,t_{\tau(x),\alpha}\}^{1/\nu(x)}$$
> where $t_{\tau,\alpha}$ is the $100\alpha$ centile of a standard $t$ distribution with $\tau$ degrees of freedom. The paper notes "Strictly the exact formula for $y_\alpha$ is given in Rigby and Stasinopoulos (2006, Appendix A)." The curve is traced by evaluating fitted $(\hat\mu,\hat\sigma,\hat\nu,\hat\tau)$ over a grid of $x$.
^thm-centile

### Model for head circumference (Eq. 10)

Data: Fourth Dutch Growth Study (Fredriks et al. 2000a,b), cross-sectional ages 0-22 years, 7,482 males and 7,018 females; head circumference $y$ for males has 7,040 observations (442 missing). Explanatory variable $x=\text{age}^{\xi}$. Model: $Y\mid X=x\sim\text{BCT}(\mu,\sigma,\nu,\tau)$ with $g_k(\theta_k)=h_k(x)$ for smooth $h_k$; identity links for $\mu,\nu$, log links for $\sigma,\tau$. Hyperparameters: links, power $\xi$, and total smoother df $(\text{df}_\mu,\text{df}_\sigma,\text{df}_\nu,\text{df}_\tau)$, chosen by minimising GAIC($\#$) via `find.hyper()` (van Buuren and Fredriks (2001) had found strong kurtosis they could not model).

| Selection | $(\text{df}_\mu,\text{df}_\sigma,\text{df}_\nu,\text{df}_\tau,\xi)$ (extra df) | Notes |
|---|---|---|
| GAIC(2) | (18.44, 2.68, 1.00, about 6.8, about 0.08-0.09); crit 26780.56 | ~1 hour of computing |
| GAIC(3) (R&S 2006) | (12.3, 5.7, 2, 2, 0.33) | |
| VGD (60/40 split) | (15.77, 8.05, 2, 2, 0.28) | $\nu,\tau$ linear in $x$; refit on all data: global deviance 26732.04 after 9 iterations |

### Diagnostics

> [!definition] Normalised randomised quantile residuals
> $r_i=\Phi^{-1}\{F(y_i\mid\hat{\boldsymbol\theta}_i)\}$ (randomised for discrete $y$). If the model is correct, $r_i\sim N(0,1)$ (Dunn and Smyth 1996).
^def-rqr

> [!definition] Worm plot (van Buuren and Fredriks 2001)
> Split the range of $x$ into 20 contiguous, equal-count intervals. In each, draw a *de-trended* normal Q-Q plot of the residuals. Fit a cubic $\hat b_0+\hat b_1z+\hat b_2z^2+\hat b_3z^3$ to each worm; $\hat b_0,\hat b_1,\hat b_2,\hat b_3$ flag differences between empirical and model residual mean, variance, skewness and kurtosis within the interval. The first two flagging thresholds for $|\hat b|$ are 0.10, 0.10 (remaining thresholds are in van Buuren and Fredriks 2001, Table II).
^def-worm

> [!definition] Q statistics (Royston and Wright 2000)
> In each of $G$ age groups compute $Z_{g1},\dots,Z_{g4}$ testing residual mean 0, variance 1, skewness 0 and kurtosis 3. Then $Q_j=\sum_g Z_{gj}^2$, $j=1,\dots,4$. Significant $Q_1,Q_2,Q_3,Q_4$ point to inadequacy in the models for $\mu,\sigma,\nu,\tau$ respectively. Rule of thumb: $|Z_{gj}|>2$ indicates a problematic group. Significance levels are "a guide to model inadequacy."
^def-qstats

`Q.stats(mBCT, xvar = db$age, n.inter = 20)` output for the selected model:

| | $Q_1$ | $Q_2$ | $Q_3$ | $Q_4$ | Total |
|---|---|---|---|---|---|
| Q statistic | 6.970 | 14.314 | 27.353 | 28.636 | 55.990 |
| df | 4.228 | 15.474 | 18 | 18 | 36 |
| p-value | 0.155 | 0.537 | 0.0726 | 0.0530 | 0.0180 |

The paper highlights misfit in the $\nu,\tau$ models in the age range 1.255-1.755 years (highly skewed, kurtotic residuals), "or perhaps the presence of outliers."

**Worm-plot comparison with the LMS model.** van Buuren and Fredriks (2001) used LMS with a rescaled age transformation (Cole, Freeman and Preece 1998) and chose 9 df for $\mu$, 5 for $\sigma$ and constant $\nu=1$, but had **16 worm-coefficient violations**. The GAMLSS BCT $(15.77,8.05,2,2,0.28)$ had **none**. Normal Q-Q plot shows seven extreme upper-tail outliers (0.1% of data); removing the 14 most extreme observations (7 per tail) "substantially improved" Q statistics and centile estimates, i.e. outliers distorted the fit.

**Centile output.** Nine curves for $100\alpha=0.4,2,10,25,50,75,90,98,99.6$ (Fig. 16), plotted separately for ages 0-2.5 and 2.5-22 years. `centiles.split()` compares sample proportions below each curve with nominal, agreeing "reasonably well."

## Examples

> [!example] Reading a centile chart
> A boy whose head circumference at age 2 sits at the model 98th centile has $\Pr(Y\le y_{obs}\mid\text{age}=2)=0.98$ under the fitted conditional BCT. Equivalently his normalised residual is $\Phi^{-1}(0.98)\approx2.05$. A "z-score" is exactly the normalised quantile residual; centile charts, z-scores and the residual diagnostics are one object.
^ex-centile-reading

> [!example] Python: BCT centile from fitted parameters
> ```python
> import numpy as np
> from scipy import stats
> def bct_centile(mu, sigma, nu, tau, alpha):
>     t = stats.t.ppf(alpha, df=tau)
>     return mu * (1 + nu * sigma * t) ** (1 / nu)   # Eq. 11 (approximate)
> # illustrative values (not from the paper): median 50 cm, CV 3%, nu=1.5, tau=8
> print(bct_centile(50, 0.03, 1.5, 8, np.array([0.004, 0.5, 0.996])))
> ```
^ex-bct-python

## Relevance to marketing measurement

Treat revenue-per-customer or latency as the response and "age" as tenure: centile curves give a reference distribution to flag unusual customers/markets (normalised residual beyond $\pm2$), and worm-style residual checks by tenure bins diagnose mean, spread, skew and tail mismatch of any outcome model.

## Connections

- Growth charts vs [[Quantile Regression]]: LMS yields coherent, non-crossing quantile curves from one parametric family; quantile regression estimates each curve separately and can cross.
- Residual-based checking parallels [[Posterior Predictive Checking]].

## See Also

[[Stasinopoulos 2007 - GAMLSS in R - Overview]], [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]
