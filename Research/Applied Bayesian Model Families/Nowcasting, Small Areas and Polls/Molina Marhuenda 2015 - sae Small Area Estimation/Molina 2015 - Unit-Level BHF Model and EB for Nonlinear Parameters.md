---
title: "Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Molina Marhuenda 2015 - sae An R Package for Small Area Estimation.pdf]]"
source_location: "Sec. EBLUPs based on BHF model; EB estimators of nonlinear parameters, pp. 89-94"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Molina Marhuenda 2015 - sae Small Area Estimation"
doc_type: paper
depends_on:
  - "[[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]"
  - "[[Poststratification]]"
used_by:
  - "[[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]]"
aliases:
  - "BHF model"
  - "nested error regression"
  - "empirical best predictor poverty"
---

# Molina 2015 - Unit-Level BHF Model and EB for Nonlinear Parameters

> [!summary]
> With microdata and known area covariate means, the nested-error (BHF) model gives EBLUPs of area means that need only $\bar X_d$ and $N_d$. For nonlinear targets such as poverty rates the best predictor is an integral over the unobserved units, approximated by Monte Carlo (EB of Molina & Rao 2010) after a normalising transformation.

## Overview
Unit-level models use $(Y_{dj},x_{dj})$ for each sampled person $j$ in area $d$; they are typically more efficient than area-level models because they use richer information, but require census-level auxiliary totals.

## Main Content

> [!definition] BHF nested-error model
> $Y_{dj}=x_{dj}^\top\beta+u_d+e_{dj}$, $u_d\sim N(0,\sigma_u^2)$, $e_{dj}\sim N(0,\sigma_e^2)$, independent; the model holds for all population units and sampling is non-informative. ^def-bhf

> [!theorem] EBLUP of an area mean (Royall 1970)
> With $\gamma_d=\sigma_u^2/(\sigma_u^2+\sigma_e^2/n_d)$, $\tilde u_d=\gamma_d(\bar y_{ds}-\bar x_{ds}^\top\tilde\beta)$ and sampling fraction $f_d=n_d/N_d$,
> $$\hat{\bar Y}_d^{\text{EBLUP}}=f_d\bar y_{ds}+(\bar X_d-f_d\bar x_{ds})^\top\hat\beta+(1-f_d)\hat u_d.$$
> Needs true covariate means $\bar X_d$ and sizes $N_d$. MSE by the González-Manteiga et al. (2008) parametric bootstrap. Works for areas with zero sample size using the synthetic part. ^thm-bhf-eblup

> [!theorem] Empirical best (EB) estimator for nonlinear $\delta_d=h(y_d)$
> The best predictor is $\tilde\delta_d^B=E[h(y_d)\mid y_{ds}]=\int h(y_d)f(y_{dr}\mid y_{ds})\,dy_{dr}$ (Eq 9). Estimate $\beta,\theta=(\sigma_u^2,\sigma_e^2)$ by ML/REML, simulate $L$ out-of-sample vectors $y_{dr}^{(\ell)}$ from the fitted conditional distribution, attach the sample, compute $h$ on each census $y_d^{(\ell)}$ and average: $\hat\delta_d^{EB}\approx L^{-1}\sum_\ell h(y_d^{(\ell)})$. Efficient simulation uses only univariate draws: $y_{dj}^{(\ell)}=x_{dj}^\top\hat\beta+\hat u_d+v_d+\varepsilon_{dj}$ with $v_d\sim N(0,\hat\sigma_u^2(1-\hat\gamma_d))$ and $\varepsilon_{dj}\sim N(0,\hat\sigma_e^2)$. ^thm-eb

> [!definition] Poverty incidence with transformation
> Poverty incidence $\delta_d=N_d^{-1}\sum_j I(O_{dj}<z)$ for income $O_{dj}$ and line $z$. Because income is skewed, model $Y_{dj}=T(O_{dj})$ with Box-Cox / power transform $T(O)=((O+c)^\lambda-1)/\lambda$ (log when $\lambda=0$) and express the target through $O=T^{-1}(Y)$. Functions: `ebBHF`, `pbmseebBHF` (arguments `transform`, `lambda`, `constant`, `indicator`, `MC`). ^def-poverty

## Examples

> [!example] Example 4: county corn hectares (Iowa, Battese et al. 1988)
> 12 counties, sample segments as units, covariates = LANDSAT pixels of corn and soybeans; county means $\bar X_d$ and $N_d$ from `cornsoybeanmeans`; outlier observation 33 removed. `pbmseBHF(CornHec ~ CornPix + SoyBeansPix, dom=County, meanxpop=Xmean, popnsize=Popn, B=200)`. Printed rows: Cerro Gordo ($n_d=1$) EBLUP 122.20, CV 8.07%; Hardin ($n_d=5$) EBLUP 143.03, CV 3.50%. Results closely match Battese et al. (1988). ^ex-iowa

```python
import numpy as np
def eb_poverty(ys, xbeta_r, xbeta_s, su2, se2, Nd, z, L=500, seed=0):
    """ys: sampled log-income; xbeta_*: fitted fixed part for sampled/non-sampled units."""
    rng=np.random.default_rng(seed); nd=len(ys)
    g=su2/(su2+se2/nd); uhat=g*np.mean(ys-xbeta_s)
    out=[]
    for _ in range(L):
        v=rng.normal(0,np.sqrt(su2*(1-g)))
        yr=xbeta_r + uhat + v + rng.normal(0,np.sqrt(se2),Nd-nd)
        out.append((np.concatenate([ys,yr])<np.log(z)).mean())
    return np.mean(out)
```

## Connections
EB with simulated out-of-sample units is the frequentist analogue of posterior-predictive poststratification ([[Poststratification]]): fit on the sample, predict every non-sampled unit, aggregate to the area.

## See Also
[[Molina Marhuenda 2015 - sae Small Area Estimation - Overview]] · [[Molina 2015 - Fay-Herriot Area-Level Model and EBLUP]]
