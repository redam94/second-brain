---
title: "Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Sec. 2 (notation, 2.1 Temporal aggregation, 2.2 intro)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]]"
aliases:
  - "Mariano-Murasawa aggregation"
  - "temporal aggregation in nowcasting"
---

# Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation

> [!summary]
> Specify the model at the highest frequency; low-frequency series are the same latent high-frequency series observed periodically (stocks) or as a weighted sum (flows). For log-differenced flows the Mariano-Murasawa approximation keeps the aggregation linear, with the weights $1,2,3,2,1$ for quarterly GDP in a monthly model.

## Overview
Notation: $y_t^k$ is the counterpart of $y_t$ defined over an observation interval of $k$ periods, observed at $t=k,2k,3k,\dots$ (periodically missing for $k>1$). A vintage's information set is $\Omega_v=\{y_{t,n}^{k_n},\ t=k_n,2k_n,\dots,T_n(v),\ n=1..N\}$; $T_n(v)\ne T_m(v)$ gives the ragged edge. High-frequency construct: $y_t=y_t^1$.

## Main Content

> [!definition] Stock and flow aggregation
> Stock: $z_t^k=z_t$ at $t=k,2k,\dots$. Flow: $z_t^k=\sum_{i=0}^{k-1}z_{t-i}$. ^def-stock-flow

> [!theorem] Aggregation of differenced variables
> With $y_t=\Delta z_t$: for stocks $y_t^k=z_t^k-z_{t-k}^k=\sum_{i=0}^{k-1}y_{t-i}$ (weights $\omega_i^{k,s}=1$ for $i<k$). For flows, $y_t^k=z^k_t-z^k_{t-k}=\sum_{i=0}^{2k-2}\omega_i^{k,f}y_{t-i}$ with $\omega_i^{k,f}=i+1$ for $0\le i\le k-1$, $2k-i-1$ for $k\le i\le 2k-2$, and 0 otherwise (a triangular kernel). ^thm-aggregation

> [!definition] Mariano-Murasawa approximation (log-differenced flows)
> If $y_t=\Delta\log z_t$ and $y_t^k=\log z_t^k-\log z_{t-k}^k$, the approximation $\log\sum_{i=0}^{k-1}z_{t-i}\approx\sum_{i=0}^{k-1}\log z_{t-i}$ (suitably centred) gives the same linear weights $\omega_i^{k,f}$, so the observational constraint stays linear. For quarterly GDP growth in a monthly model:
> $$
> y_t^3=y_t+2y_{t-1}+3y_{t-2}+2y_{t-3}+y_{t-4},\quad t=3,6,\dots
> $$

^def-mm

> [!definition] General state-space form
> $Y_t^{K_Y}=\mu+\zeta(\theta)X_t+G_t,\ G_t\sim N(0,\Sigma_G)$; $X_t=\phi(\theta)X_{t-1}+H_t,\ H_t\sim N(0,\Sigma_H)$. Given $\theta$, the Kalman filter and smoother yield $X_{t|\Omega_v}$ and $P_{t|\Omega_v}$ and handle missing observations directly; nowcasts and forecasts of any variable come from the same pass. $\zeta P\zeta^\top$ is the "filter uncertainty" (signal extraction part of the uncertainty). Mixed frequency and ragged edges are missing-data problems. ^def-ss

## Examples

> [!example] Quarterly growth from a monthly path
> Monthly growth (%) for the last five months, oldest to newest: $0.0,\ 0.4,\ 0.1,\ 0.3,\ 0.2$, i.e. $y_{t-4}=0.0,\ y_{t-3}=0.4,\ y_{t-2}=0.1,\ y_{t-1}=0.3,\ y_t=0.2$. Then $0.2+2(0.3)+3(0.1)+2(0.4)+1(0.0)=1.9$. The weights sum to 9, so this kernel is applied to monthly growth and then rescaled by the normalisation chosen for the log approximation (dividing by 3 gives the quarterly growth of the three-month average level, as in the original Mariano-Murasawa construction). ^ex-mm

```python
import numpy as np
w=np.array([1,2,3,2,1])               # Mariano-Murasawa weights for k=3
def quarterly_from_monthly(y):       # y: monthly latent growth; returns y^3_t at t=2,5,8... (0-based)
    return np.array([w@y[t-4:t+1][::-1] for t in range(4,len(y),3)])
# state-space observation row for GDP: Z = [w[0],...,w[4]] on lags of y_t (state stacked with 4 lags)
```

## Connections
Missing-data view: periods without the low-frequency print are simply rows with NaN observations ([[The Kalman Filter]]). Integrating the path out with banded precision matrices (E98) is the same likelihood as [[Marginal Likelihood via the Kalman Filter]] but in precision form.

## See Also
[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]
