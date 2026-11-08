---
title: "Girosi King 2007 - Lee-Carter Model Estimation and Forecasting"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/definition
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Sec. 1, pp. 2-6; Eqs. 1-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on: []
used_by:
  - "[[Girosi King 2007 - Information Loss with One Principal Component]]"
  - "[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]"
  - "[[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]"
  - "[[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]"
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "Lee-Carter model"
  - "Lee-Carter SVD estimation"
  - "Lee-Carter forecast random walk with drift"
---

# Girosi King 2007 - Lee-Carter Model Estimation and Forecasting

> [!summary]
> Lee-Carter models log mortality $m_{at}=\alpha_a+\beta_a\gamma_t+\epsilon_{at}$. With identification constraints $\sum_t\gamma_t=0$ and $\sum_a\beta_a^2=1$ (Girosi-King convention; Lee-Carter use $\sum_a\beta_a=1$), $\alpha_a$ is the time average and $(\beta,\gamma)$ come from the first singular vectors of the centred matrix. The index $\gamma_t$ is forecast as a random walk with drift, so forecasts are a straight line through the first and last $\hat\gamma$.

## Overview

For one country, $m_{at}$ is log mortality in age group $a=1..A$ and year $t=1..T$. The model is a rank-one product, a special case of log-linear contingency-table models with independence of age and time effects.

## Main Content

> [!definition] Lee-Carter model (Eqs. 1-3)
> $$m_{at}=\alpha_a+\beta_a\gamma_t+\epsilon_{at}.$$ Non-unique: invariant to $\beta\to c\beta,\ \gamma\to\gamma/c$ and $\alpha_a\to\alpha_a-\beta_a c,\ \gamma_t\to\gamma_t+c$. Constraints $\sum_t\gamma_t=0$ and $\sum_a\beta_a^2=1$ imply $\alpha_a=\bar m_a$ (time average). Centred model $\tilde m_{at}=m_{at}-\bar m_a\sim N(\beta_a\gamma_t,\sigma^2)$ uses $A+T$ parameters for $A\times T$ cells. Interpretation: $\beta_a$ is the sensitivity of age group $a$ to the index; independence assumption = no age$\times$time interaction (the age shape $\beta$ is constant over time).
^def-lee-carter

> [!definition] Estimation by SVD (Sec. 1.2)
> Maximum likelihood under Gaussian errors is solved by the SVD $\tilde m=BLU'$: $\hat\beta$ is the first left singular vector (unit length) and $\hat\gamma_t=\hat\beta'\tilde m_t$. Equivalently $\hat\beta$ is the leading eigenvector of $C=\tilde m\tilde m'$. Likelihood has many equivalent maxima, so SVD avoids optimiser trouble. Lee and Carter also propose a **second-stage re-estimation** of $\gamma_t$ (see [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]).
^def-lc-svd

> [!definition] Forecast model for the index (Eqs. 4-9)
> $\hat\gamma_t=\hat\gamma_{t-1}+\theta+\xi_t$, $\xi_t\sim N(0,\sigma_{rw}^2)$. MLE of the drift is $\hat\theta=(\hat\gamma_T-\hat\gamma_1)/(T-1)$ (depends only on first and last values), $\text{Var}[\hat\theta]=\sigma_{rw}^2/(T-1)$. Forecast: $\hat\gamma_{T+\Delta t}=\hat\gamma_T+\Delta t\,\hat\theta+\sum_{l=1}^{\Delta t}\xi_{T+l-1}$, conditional SE grows as $\sqrt{\Delta t}$. Point forecast of log mortality: $\mu_{T+\Delta t}=\bar m+\hat\beta[\hat\gamma_T+\Delta t\,\hat\theta]$, linear in $\Delta t$ (Eq. 8). Example: forecast for 2030 from data 1950-2000: $\hat\mu_{2030}=\bar m+\hat\beta[\hat\gamma_{2000}+30(\hat\gamma_{2000}-\hat\gamma_{1950})/50]$.
^def-lc-forecast

Other ARIMA models for $\gamma_t$ are possible, but random walk with drift "has been used almost exclusively". Lee and Miller (2001) note the evidence is against constant $\beta_a$ and recommend starting from 1950 (Tuljapurkar, Li and Boe 2000); Booth, Maindonald and Smith (2002) show this fails in some countries; Carter and Prskawetz (2000) extend to structural shifts.

## Examples

> [!example] Rank-1 fit on synthetic data
> Setup: $A=17$ age groups, $T=50$ years, truth $\beta\propto|\sin(a/4)|+0.3$, $\gamma$ falling linearly from 4 to -4 plus noise. Solution: centre by age, SVD, take the first singular pair. Result: the first component explains 97% of centred variance; forecast mean profile $\bar m+\hat\beta[\hat\gamma_T+\Delta t\hat\theta]$.
^ex-lc-fit
```python
import numpy as np
def lee_carter(m):                       # m: A x T log-mortality
    mbar = m.mean(1); mt = m - mbar[:, None]
    U, S, Vt = np.linalg.svd(mt, full_matrices=False)
    beta = U[:, 0] * np.sign(U[:, 0].sum()); g = beta @ mt
    theta = (g[-1] - g[0]) / (m.shape[1] - 1)
    return mbar, beta, g, theta, S[0]**2 / (S**2).sum()
def forecast(mbar, beta, g, theta, h): return mbar + beta * (g[-1] + h * theta)
```

**PyMC-style Bayesian version (untested).** E111 replaces the Gaussian-on-log-rate with counts: $d_{at}\sim\text{NegBin}(E_{at}e^{\alpha_a+\beta_a\gamma_t},\phi)$, $\gamma_t$ a random walk with drift, zero-sum identification on $\gamma$ and unit-norm or simplex constraint on $\beta$ (the E111 text notes an unidentified level shown failing). This follows Wilmoth's Poisson/MLE suggestion ([[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]).

## Connections
[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]], [[Factor Analysis and PPCA]], [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]].

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
