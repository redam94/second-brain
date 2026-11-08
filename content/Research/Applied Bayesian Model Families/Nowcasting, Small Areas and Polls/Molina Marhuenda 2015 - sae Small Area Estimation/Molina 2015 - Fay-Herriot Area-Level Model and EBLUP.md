---
title: "Molina 2015 - Fay-Herriot Area-Level Model and EBLUP"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]"
source_location: "Sec. Design vs model-based inference, Notation, EBLUPs based on a FH model, Example 1, pp. 82-86"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Molina Marhuenda 2015 - sae Small Area Estimation"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
used_by:
  - "[[Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models]]"
  - "[[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]]"
aliases:
  - "Fay-Herriot model"
  - "EBLUP"
  - "area-level model"
---

# Molina 2015 - Fay-Herriot Area-Level Model and EBLUP

> [!summary]
> The Fay-Herriot model has a sampling model (direct estimate = truth + noise with known variance $\psi_d$) and a linking model (truth = regression + area effect with variance $A$). The EBLUP is a precision-weighted average of the direct estimate and the regression-synthetic estimate with weight $\gamma_d=A/(A+\psi_d)$.

## Overview
Notation: a finite population $U$ is partitioned into $D$ areas of size $N_d$; the target is $\delta_d=h(y_d)$ (often the mean $\bar Y_d$). Area-level models use only area aggregates $x_d$ as covariates; unit-level models (see [[Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters]]) use microdata. Design-based inference averages over samples; model-based inference treats measurements as random and links areas.

## Main Content

> [!definition] Fay-Herriot model
> Sampling model: $\hat\delta_d^{\text{DIR}}=\delta_d+e_d,\ e_d\sim N(0,\psi_d)$ with $\psi_d$ **known**. Linking model: $\delta_d=x_d^\top\beta+u_d,\ u_d\sim N(0,A)$. Combined: $\hat\delta_d^{\text{DIR}}=x_d^\top\beta+u_d+e_d$, $u_d\perp e_d$. Normality is needed only for MSE estimation. ^def-fh

> [!theorem] BLUP and EBLUP under FH (Henderson 1975)
> $\tilde\delta_d^{\text{BLUP}}=x_d^\top\tilde\beta(A)+\tilde u_d(A)$ with $\tilde u_d=\gamma_d(\hat\delta_d^{\text{DIR}}-x_d^\top\tilde\beta)$, $\gamma_d=A/(A+\psi_d)\in(0,1)$ and $\tilde\beta(A)=\big[\sum_d(A+\psi_d)^{-1}x_dx_d^\top\big]^{-1}\sum_d(A+\psi_d)^{-1}x_d\hat\delta_d^{\text{DIR}}$. Replacing $A$ by a consistent $\hat A$ gives the EBLUP
> $$
> \hat\delta_d^{\text{EBLUP}}=\hat\gamma_d\hat\delta_d^{\text{DIR}}+(1-\hat\gamma_d)x_d^\top\hat\beta.
> $$
> If $\hat A$ is an even, translation-invariant function of the data (true for FH, ML, REML), the EBLUP stays unbiased (Kackar-Harville 1984). ^thm-eblup

Interpretation: if $\psi_d\ll\hat A$ the EBLUP is close to the direct estimator; if $\psi_d\gg\hat A$ it is close to the regression-synthetic estimate. Regression is used only where strength must be borrowed.

> [!definition] Fitting $A$ and fit measures
> Methods: Fay-Herriot moment method, ML, and REML (default; accounts for degrees of freedom lost in $\beta$, so less finite-sample bias). Log-likelihood $\ell(A,\beta)=-\tfrac12\big[D\log(2\pi)+\sum_d\log(A+\psi_d)+\sum_d(A+\psi_d)^{-1}(\hat\delta_d^{\text{DIR}}-x_d^\top\beta)^2\big]$; $\text{AIC}=-2\ell+2(p+1)$, $\text{BIC}=-2\ell+(p+1)\log D$. ^def-fh-fit

**MSE.** Analytic large-sample estimates: Prasad-Rao (1990) for the moment estimator, Datta-Lahiri (2000) for ML/REML, Datta et al. (2005) for the FH method. In `sae`: `eblupFH(formula, vardir, method="REML")` and `mseFH(...)`; areas must have non-zero sample size; no NA values. Direct estimates and variances come from `direct()`, `survey` or `sampling`.

## Examples

> [!example] Example 1: fresh milk expenditure (43 areas, 1989)
> Data `milk` (Arora & Lahiri 1997): area sample sizes `ni`, direct estimates `yi`, standard deviations `SD`, CVs and major areas (You & Chapman 2006). Model: `mseFH(yi ~ as.factor(MajorArea), SD^2)`; CV of EBLUP = $100\sqrt{\text{mse}}/\text{eblup}$. Result (Fig. 1): EBLUPs follow direct estimates but are less volatile; EBLUP CVs are smaller in every area and none exceeds the usual 20% publication cutoff, whereas several direct CVs do; gains are larger for small-sample areas. ^ex-milk

> [!example] Shrinkage by hand
> $A=0.04$, $x^\top\beta=1.0$. Area 1: $\hat\delta^{\text{DIR}}=1.5$, $\psi=0.16$ gives $\gamma=0.04/0.20=0.2$, EBLUP $=0.2\cdot1.5+0.8\cdot1.0=1.10$. Area 2: $\hat\delta^{\text{DIR}}=1.5$, $\psi=0.01$ gives $\gamma=0.8$, EBLUP $=1.40$. Same direct estimate, different shrinkage. ^ex-shrink

```python
import numpy as np
from scipy.optimize import minimize_scalar
def fh_reml(y, X, psi):
    def nll(logA):
        A=np.exp(logA); V=1/(A+psi); W=V
        XtWX=(X*W[:,None]).T@X; b=np.linalg.solve(XtWX,(X*W[:,None]).T@y)
        r=y-X@b
        return 0.5*(np.log(A+psi).sum()+np.log(np.linalg.det(XtWX))+(W*r**2).sum())
    A=np.exp(minimize_scalar(nll,bounds=(-12,5),method="bounded").x)
    W=1/(A+psi); b=np.linalg.solve((X*W[:,None]).T@X,(X*W[:,None]).T@y)
    g=A/(A+psi); return g*y+(1-g)*X@b, A, g
```

## Connections
In a Bayesian reading, $\hat\delta^{\text{EBLUP}}$ is the posterior mean of $\delta_d$ under a flat prior on $\beta$ and a plugged-in $A$ ([[Hierarchical Models]]; eight-schools form). PyMC sketch (untested): `A=pm.HalfNormal("A",1); u=pm.Normal("u",0,A,shape=D); delta=X@beta+u; pm.Normal("y",delta,sigma=np.sqrt(psi),observed=y_dir)`.

## See Also
[[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]
