---
title: "Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]"
source_location: "Sec. EBLUPs based on a spatial FH model; spatio-temporal FH model; Examples 2-3, pp. 86-89"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Molina Marhuenda 2015 - sae Small Area Estimation"
doc_type: paper
depends_on:
  - "[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]"
used_by:
  - "[[Molina 2015 - Bayesian Fay-Herriot, Surprise Maps and Variance Functions (Concept Note)]]"
aliases:
  - "spatial Fay-Herriot"
  - "SFH"
  - "STFH"
---

# Molina 2015 - Spatial and Spatio-Temporal Fay-Herriot Models

> [!summary]
> When neighbouring areas have correlated unexplained effects, the FH area effects can follow a SAR(1) process; with several periods, time effects nested within areas follow an AR(1). Bootstrap MSE is preferred for these richer models. Both reduce CVs relative to direct estimates in the paper's examples.

## Overview
Spatial and spatio-temporal extensions keep the sampling model of [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]] and change only the covariance of the area effects.

## Main Content

> [!definition] Spatial Fay-Herriot (SFH)
> Same combined model $\hat\delta_d^{\text{DIR}}=x_d^\top\beta+u_d+e_d$, but $u=\rho_1Wu+\epsilon$, $\epsilon\sim N(0,\sigma_1^2I_D)$. $\rho_1\in(-1,1)$ is the autoregression parameter; $W$ is a row-standardised proximity matrix (zeros on the diagonal, 1 for neighbours before standardising). Hence $u\sim N\big(0,\sigma_1^2[(I-\rho_1W)^\top(I-\rho_1W)]^{-1}\big)$. EBLUP: Petrucci & Salvati (2006). Analytic MSE: Singh et al. (2005) under ML/REML; parametric and non-parametric bootstrap MSE: Molina et al. (2009). ^def-sfh

> [!definition] Spatio-temporal Fay-Herriot (STFH; Marhuenda et al. 2013)
> $\hat\delta_{dt}^{\text{DIR}}=x_{dt}^\top\beta+u_d+v_{dt}+e_{dt}$, $e_{dt}\sim N(0,\psi_d)$; $u$ follows the SAR(1) of the SFH; for each area, $v_{dt}=\rho_2v_{d,t-1}+\epsilon_{2dt}$, $\epsilon_{2dt}\sim N(0,\sigma_2^2)$ (AR(1)), independent across areas. Only AR(1) is used since $T$ is typically small; MA processes are not implemented. EBLUP with parametric-bootstrap MSE; REML only; requires all $T$ periods for all $D$ areas, sorted by period within domain; `model="ST"` (AR(1)) or `"S"` (independent time effects). ^def-stfh

`sae` calls: `eblupSFH`, `mseSFH`, `pbmseSFH`, `npbmseSFH` (argument `proxmat`; use $B>200$ bootstrap replicates, default 100), `eblupSTFH`, `pbmseSTFH`.

## Examples

> [!example] Example 2: Tuscany grape production, 274 municipalities (synthetic)
> `mseSFH` with auxiliary variables `area` and `workdays`, proximity from `grapesprox`. EBLUPs are more stable than direct estimates and have smaller CVs for most municipalities, with remarkable gains where the direct CV was largest (Fig 2). ^ex-grapes

> [!example] Example 3: spacetime data, $D=11$, $T=3$
> Last-period results (selected rows of the printed table):
>
> | Area | DIR | EBLUP STFH | CV DIR (%) | CV STFH (%) |
> |---|---|---|---|---|
> | 2 | 0.2615 | 0.2734 | 10.94 | 7.65 |
> | 12 | 0.1222 | 0.1374 | 21.90 | 14.80 |
> | 16 | 0.4121 | 0.3189 | 13.58 | 9.22 |
> | 17 | 0.0579 | 0.0691 | 25.20 | 20.31 |
> | 46 | 0.1379 | 0.1435 | 8.85 | 8.36 |
>
> Even with only 11 areas and 3 periods the CV of the EBLUP is smaller in all areas. ^ex-spacetime

## Connections
A SAR(1) random effect is the frequentist counterpart of the CAR/BYM spatial priors; in PyMC use `pm.CAR` or a precision matrix $\sigma^{-2}(I-\rho W)^\top(I-\rho W)$. The AR(1) time effect is a state-space component ([[Linear-Gaussian State-Space Models]]).

## See Also
[[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]
