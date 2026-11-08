---
title: "Banbura 2013 - Factor Models, Estimation and the Ragged Edge"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Sec. 2.2.1-2.2.3, factor model, estimation, daily model, mixed-frequency VAR"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
used_by:
  - "[[Banbura 2013 - News Decomposition and Real-Time Vintages]]"
aliases:
  - "dynamic factor nowcasting"
  - "EM for factor models with missing data"
---

# Banbura 2013 - Factor Models, Estimation and the Ragged Edge

> [!summary]
> A dynamic factor model with a VAR factor process is the workhorse joint model: few factors carry the co-movement of many series, idiosyncratic errors absorb the rest. Estimation by principal components, the two-step procedure, or ML via EM (the review's state of the art); the Kalman smoother copes with the ragged edge; VAR alternatives need shrinkage in large systems.

## Overview
The factor structure is parsimonious and robust: the Doz-Giannone-Reichlin results show that misspecification (omitted serial or cross-sectional correlation in the idiosyncratic part, non-normality) has negligible effect on factor estimation for large $T$ and $N$, with substantial robustness already for a handful of series.

## Main Content

> [!definition] Factor model (Eqs 3-4)
> $Y_t=\mu+\Lambda F_t+E_t,\ E_t\sim N(0,\Sigma_E)$ ($\Sigma_E$ diagonal, estimates robust to violations); $F_t=\Phi(L)F_t+U_t,\ U_t\sim N(0,\Sigma_U)$ (VAR; reduced rank of $\Sigma_U$ often imposed). With only monthly observed variables this is a state-space model and the Kalman filter/smoother gives $F_{t|\Omega_v}$. Giannone-Reichlin-Small (2008) then nowcast via a bridge regression of GDP on temporally aggregated factor estimates, $y_t^{k_1}=\alpha+\beta\hat F^{k_1}_{t|\Omega_v}+e_t$. ^def-dfm

> [!definition] Estimation methods
> (a) Principal components on a balanced panel (the sample where all series are available), then re-estimate factors with the smoother on the full ragged data ("two-step", Giannone et al. 2008). (b) Maximum likelihood by EM (Doz et al. 2012; Bańbura & Modugno 2010): E-step computes expected sufficient statistics via the smoother, including the uncertainty in the factors; M-step re-estimates parameters; ML is more efficient in small systems, handles missing data, and permits restrictions (loadings reflecting temporal aggregation; group-specific factors). Consistency: Doz et al. (2011) for two-step, (2012) for ML. ^def-estimation

> [!definition] Model with daily data and flows (Sec 2.2.2)
> Each high-frequency concept follows (3)-(4); a variable observed at interval $k_n$ links to the model through $y_{t,n}^{k_n}=\sum_i\omega_i^{k_n,\cdot}y_{t-i,n}$ with weights from [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]. Irregular month lengths are treated in the appendix (time-varying $k_n$). ^def-daily-model

**Mixed-frequency VAR.** Specify a VAR for the high-frequency concepts and use the approximate aggregation as the measurement equation (Mariano & Murasawa 2010; Giannone-Reichlin-Simonelli 2009; Kuzin-Marcellino-Schumacher 2011; earlier Zadrozny 1990; Mittnik & Zadrozny). Alternative "blocking": a low-frequency VAR with the high-frequency information distributed into multiple series (e.g. three monthly series per quarter; Chen et al. 2012; McCracken et al. 2013). VARs are less parsimonious; remedies are forecast combination or Bayesian shrinkage (Bańbura-Giannone-Reichlin 2010; Giannone-Lenza-Primiceri 2012; Koop 2013).

## Examples

> [!example] Why the smoother handles the ragged edge
> Two series, industrial production (published mid-month, lag 15 days) and a survey (published before month end). On day 20 of month $m$ the survey for $m$ is available and IP for $m-1$ is the latest hard datum. The measurement matrix is just the full one with the missing IP row dropped for $m$; the smoother's factor estimate for month $m$ leans on the survey, and the filter uncertainty is correspondingly larger than after the IP release. ^ex-ragged

```python
# Minimal Kalman filter with missing observations (NaN rows skipped), for y_t = Z x_t + e, x_t = T x_{t-1} + eta
import numpy as np
def kf_missing(y, Z, T, Q, H, x0, P0):
    x, P, ll = x0, P0, 0.0
    for yt in y:
        x, P = T@x, T@P@T.T + Q
        m = ~np.isnan(yt)
        if m.any():
            Zm, Hm = Z[m], H[np.ix_(m,m)]
            S = Zm@P@Zm.T + Hm; K = P@Zm.T@np.linalg.inv(S); v = yt[m]-Zm@x
            x, P = x + K@v, P - K@Zm@P
            ll += -0.5*(np.log(np.linalg.det(2*np.pi*S)) + v@np.linalg.solve(S,v))
    return x, P, ll
```

## Connections
Likelihood evaluation matches [[Marginal Likelihood via the Kalman Filter]]; smoothing is [[The RTS Smoother]]; model class is [[Linear-Gaussian State-Space Models]]; high-dimensional shrinkage relates to [[Global-Local Shrinkage Priors]].

## See Also
[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]
