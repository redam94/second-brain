---
title: "Banbura 2013 - News Decomposition and Real-Time Vintages"
tags:
  - source/ingested
  - topic/nowcasting
  - type/theorem
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Sec. 2.3 and Sec. 3 (real-time design, filter uncertainty, news, Figs 2-3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]]"
used_by:
  - "[[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]]"
aliases:
  - "model-based news"
  - "nowcast revision decomposition"
  - "data vintages"
---

# Banbura 2013 - News Decomposition and Real-Time Vintages

> [!summary]
> A nowcast revises only because of news: the part of a release that differs from the model's expectation. The revision equals a weighted sum of news terms with model-implied weights, which generalises the Kalman update to asynchronous releases and lets one say which release moved the nowcast and why.

## Overview
Setup: consecutive vintages $\Omega_v\subset\Omega_{v+1}$; $\Omega_{v+1}\setminus\Omega_v=\{y_{t_j,n_j}\}_{j=1..J_{v+1}}$. Data revisions of past observations are abstracted away in the theory (the application separates them: total change = effect of news + effect of revisions).

## Main Content

> [!definition] News
> $A_{v+1}=(a_{v+1,1},\dots,a_{v+1,J_{v+1}})'$ with $a_{v+1,j}=y_{t_j,n_j}-E[y_{t_j,n_j}\mid\Omega_v]$: the part of each new figure orthogonal to $\Omega_v$ (unexpected relative to the model). ^def-news

> [!theorem] Nowcast revision as weighted news
> By the projection property of conditional expectation,
> $$E[y_{t,1}\mid\Omega_{v+1}]-E[y_{t,1}\mid\Omega_v]=D_{v+1}A_{v+1}=\sum_j\delta_{v+1,j}\big(y_{t_j,n_j}-E[y_{t_j,n_j}\mid\Omega_v]\big),$$
> with $D_{v+1}=E[y_{t,1}A_{v+1}']\,E[A_{v+1}A_{v+1}']^{-1}$. Components for a diagonal $\Sigma_G$: $E[y_{t,1}a_{v+1,j}]=\zeta_1E[(X_t-E[X_t|\Omega_v])(X_{t_j}-E[X_{t_j}|\Omega_v])']\zeta_{n_j}'$ and $E[a_{v+1,j}a_{v+1,l}]=\zeta_{n_j}E[(X_{t_j}-\cdot)(X_{t_l}-\cdot)']\zeta_{n_l}'+\Sigma_{G,jl}\mathbf 1_{j=l}$; the Kalman filter and smoother supply the moments. If there is no news the nowcast is not revised. Filter uncertainty decreases with the release and that reduction decomposes along the same lines. ^thm-news

Contrast with the "change in overall contribution" measure of Bańbura & Rünstler (2011): that also changes when correlated predictors are exploited without new information, so news is the better tool for attributing revisions. Partial models (bridge, MIDAS) have no joint model and cannot produce news.

**Real-time design.** Out-of-sample evaluation uses true data vintages from ALFRED (St. Louis Fed), not "pseudo real time" with final revised data, which ignores revisions that can be sizable (Croushore 2011). Updates at the 7th, 14th, 21st and 28th of each month; model re-estimated each time.

**Application findings (US GDP, 24 series).** Total filter uncertainty from the start of the quarter to the GDP release falls 0.066 -> 0.015; 92% of the reduction comes from macro (monthly/weekly) releases, 8% from daily financial data; the large spikes are the employment report, smaller ones industrial production; previous-quarter GDP matters little once current-quarter information arrives. In the 2008Q4 nowcast, September industrial production (published mid-October) caused the largest downward revision, confirmed by later surveys and hard data; daily financial news was large but volatile and of mixed sign, so net effects cancel.

## Examples

> [!example] Scalar news
> Prior nowcast of quarterly growth 0.5%. A release has model expectation 100.0 and prints 98.0 (news $-2.0$). With weight $\delta=0.15$ the nowcast falls by $0.30$ to 0.20. A print of 100.0 would change nothing even if its level is strong. ^ex-news

```python
import numpy as np
def news_weights(Pxx, Zy, Zr, H):
    """Pxx: prior state cov (smoother) for stacked [target-state, release-state]; Zy,Zr: loading rows."""
    cov_yA = Zy @ Pxx @ Zr.T
    cov_AA = Zr @ Pxx @ Zr.T + H
    return cov_yA @ np.linalg.inv(cov_AA)        # D_{v+1}
```

## Connections
For E98 (real-time GDP/GDI vintages) a vintage-specific "revision noise" term plays the role of data revisions separated from news. Marketing: attribute changes in a latest-weeks MMM estimate to specific data feeds arriving.

## See Also
[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]] · [[The Kalman Filter]]
