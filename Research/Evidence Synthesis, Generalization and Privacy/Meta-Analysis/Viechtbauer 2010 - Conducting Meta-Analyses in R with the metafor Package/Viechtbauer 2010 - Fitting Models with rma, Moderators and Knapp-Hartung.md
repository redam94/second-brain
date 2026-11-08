---
title: "Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.3, pp. 11-13; Knapp-Hartung examples Sec. 3.4, pp. 20-21"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]"
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
used_by:
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
  - "[[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]"
aliases:
  - rma.uni function
  - Knapp and Hartung adjustment
  - meta-regression moderators in metafor
---

# Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung

> [!summary]
> `rma.uni()` (alias `rma()`) fits fixed, random and mixed-effects models from `(yi, vi)` or raw 2x2/continuous data, with moderators supplied as a matrix or an R formula. Wald tests use the normal/$\chi^2$ distributions by default; the Knapp-Hartung adjustment (`knha=TRUE`) rescales the coefficient covariance for the uncertainty in $\hat\tau^2$ and uses $t$ and $F$ reference distributions with $k-p$ degrees of freedom, bringing Type I error nearer nominal.

## Overview

The call, with defaults from Sec. 3.3:

`rma.uni(yi, vi, sei, ai, bi, ci, di, n1i, n2i, m1i, m2i, sd1i, sd2i, xi, mi, ri, ni, mods=NULL, data=NULL, intercept=TRUE, slab=NULL, subset=NULL, measure="GEN", add=1/2, to="only0", vtype="LS", method="REML", weighted=TRUE, level=95, digits=4, btt=NULL, tau2=NULL, knha=FALSE, control=list())`

## Main Content

### Specifying data and model

- **Data.** Supply `yi` with `vi` (or `sei`) and keep `measure="GEN"`, or pass the `escalc()` arguments and a `measure`; effect sizes are then computed internally ([[Viechtbauer 2010 - Effect Size Measures and escalc]]).
- **Random effects:** `rma(yi, vi, data=dat)`; `method` picks the $\tau^2$ estimator (default REML).
- **Fixed effects:** `method="FE"`; one must decide between `weighted=TRUE` (default) and unweighted least squares ([[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]).
- **Moderators:** `mods` accepts a vector, a $k\times p'$ design matrix (`cbind(mod1,mod2)`) or a one-sided formula `~ mod1 + mod2` (interactions, polynomials, `factor()`); with a formula, `intercept` is ignored and `- 1` removes the intercept.
- `subset`, `slab` (study labels), `tau2` (fix $\tau^2$), `control` (algorithm).

### Omnibus test and `btt`

> [!definition] Omnibus test of moderators
> For a model with moderators, the default omnibus test is of $H_0:\beta_1=\dots=\beta_{p'}=0$ (the intercept is excluded if present); its statistic $Q_M$ is $\chi^2_m$ with $m$ the number of coefficients tested. Without an intercept the test includes all coefficients. `btt` selects coefficient indices: `btt=c(3,4)` tests the third and fourth coefficients (with an intercept, the intercept is index 1).
^def-omnibus-test

### Categorical moderators

Handled by dummy coding, manually or via `factor()`. Fitting separate random-effects models per subgroup (`subset=`) is possible but "not an ideal approach" because $\tau^2$ is then estimated within each level from fewer studies. A single mixed model with a dummy-coded factor is preferred; remove the intercept (`~ factor(alloc) - 1`) to read off one mean per level, and keep the intercept to test differences between levels (the omnibus $Q_M$ is invariant to the reference level).

### Knapp-Hartung adjustment

> [!definition] Knapp and Hartung (2003) adjustment
> By default tests of individual coefficients use $z$ (normal), and the omnibus uses $\chi^2_m$. With `knha=TRUE` the standard errors are adjusted to account for the uncertainty in $\hat\tau^2$; coefficient tests and CIs use the $t$-distribution with $k-p$ df and the omnibus test uses $F_{m,\,k-p}$ ($p$ = number of coefficients including intercept). Only meant for random/mixed-effects models.
>
> Formula (Knapp and Hartung 2003; not printed in the metafor paper, but verified against its output below): with $W=\text{diag}(1/(v_i+\hat\tau^2))$, $\hat\beta=(X^\top WX)^{-1}X^\top Wy$ and residuals $r=y-X\hat\beta$,
> $$\widehat{\text{Var}}_{KH}(\hat\beta)=s^2\,(X^\top WX)^{-1},\qquad s^2=\frac{r^\top W r}{k-p}.$$
> For the intercept-only case this is $\widehat{\text{Var}}(\hat\mu)=\dfrac{\sum w_i^*(y_i-\hat\mu)^2}{(k-1)\sum w_i^*}$, the HKSJ variance ([[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]).
^def-knapp-hartung

Usually KH gives more conservative $p$-values, though not guaranteed in a particular case; in general Type I error and CI coverage are closer to nominal.

## Examples

> [!example] Knapp-Hartung on BCG with allocation factor and latitude
> Model `~ factor(alloc) + ablat`, REML, `knha=TRUE`: $\hat\tau^2=0.1446$ (SE 0.1124), $Q_E(9)=26.2034$ ($p=0.0019$), omnibus $F(3,9)=3.4471$ ($p=0.0650$); coefficients (intercept 0.2932, random -0.2675, systematic 0.0585, ablat -0.0273) have $t$-based SEs 0.4188, 0.3624, 0.3925, 0.0095 and $\text{ablat}$ $t=-2.8669$, $p=0.0186$ on 9 df. Independent Python reproduction (using $s^2=1.0696$, which scales the covariance up, not down) gives identical numbers; see [[Viechtbauer 2010 - BCG Vaccine Worked Example]].
^ex-kh-bcg

```python
import numpy as np
from scipy import optimize, stats
def meta_reg(y, v, X, knha=True):
    k, p = X.shape
    def nll(t):                       # REML negative log-likelihood
        W = 1/(v+t); A = X.T@(W[:,None]*X); b = np.linalg.solve(A, X.T@(W*y)); r = y-X@b
        return .5*(np.log(v+t).sum() + np.linalg.slogdet(A)[1] + (W*r**2).sum())
    t = optimize.minimize_scalar(nll, bounds=(0,5), method="bounded").x
    W = 1/(v+t); cov = np.linalg.inv(X.T@(W[:,None]*X)); b = cov@X.T@(W*y); r = y-X@b
    if knha: cov = cov*(W*r**2).sum()/(k-p)
    se = np.sqrt(np.diag(cov)); stat = b/se
    pv = 2*stats.t.sf(abs(stat), k-p) if knha else 2*stats.norm.sf(abs(stat))
    return t, b, se, pv
```

## Connections

- For marketing meta-analysis, moderators (channel, geography, funnel stage, budget share) with few experiments quickly exhaust degrees of freedom; KH's $k-p$ df makes this explicit, and the rule "decide the model before looking" mirrors [[Researcher Degrees of Freedom]].
- The same hierarchical logic with proper uncertainty in $\tau$ appears in [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[IntHout 2014 - Simulation Results and Error Rates]]
