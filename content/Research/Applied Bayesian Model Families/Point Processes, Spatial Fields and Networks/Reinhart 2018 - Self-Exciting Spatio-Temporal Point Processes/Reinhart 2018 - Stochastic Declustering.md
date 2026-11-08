---
title: "Reinhart 2018 - Stochastic Declustering"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 3.2, pp. 11-14, Alg. 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]]"
used_by:
  - "[[Reinhart 2018 - Simulation, Inference and Diagnostics]]"
aliases:
  - "stochastic declustering"
  - "MISD"
  - "FLP"
---

# Reinhart 2018 - Stochastic Declustering

> [!summary]
> Stochastic declustering separates background from triggered events using the estimated parent probabilities $\Pr(u_i=j)$. The Zhuang-Ogata-Vere-Jones (ZOV) algorithm alternates parametric fitting of $g$ with weighted kernel estimation of $\mu(s)$ from background-weighted events; FLP and MISD are alternatives that tune smoothing or avoid a parametric $g$.

## Overview
A nonparametric $\mu(s)$ fitted on *all* events would absorb triggered events. Declustering removes them probabilistically, and also supports testing model assumptions (e.g. same magnitude distribution for mainshocks and aftershocks).

## Main Content

> [!theorem] Declustering identity (eqs. 11-13)
> With total spatial intensity $m_1(s)=\lim_{T\to\infty}\frac1T\int_0^T\lambda(s,t)dt$, we have $\mu(s)\approx m_1(s)-\frac1T\sum_i\int_0^T g(s-s_i,t-t_i)\,dt$. With kernel $k$: $\hat m_1(s)=\frac1T\sum_ik(s-s_i)$, $\hat\gamma(s)=\frac1T\sum_i\Pr(u_i\ne0)k(s-s_i)$, hence
> $$
> \hat\mu(s)=\frac1T\sum_{i=1}^n\big(1-\Pr(u_i\neq0)\big)\,k(s-s_i)=\frac1T\sum_i\Pr(u_i=0)\,k(s-s_i).
> $$

^thm-declustering-identity

**Algorithm 1 (ZOV 2002).** Start $\hat\mu\equiv1$. (1) Fit $\Theta$ of $g$ by ML given $\hat\mu$; (2) compute $\Pr(u_i\ne0)$ via eq. 10; (3) update $\hat\mu^*$ by eq. 13; (4) stop if $\max_s|\hat\mu-\hat\mu^*|<\epsilon$. *Thinning:* keep event $i$ with probability $1-\Pr(u_i\neq0)$. The original used an adaptive bandwidth: radius of the smallest disk around event $i$ containing $\ge n_p$ other events ($n_p\in[10,100]$), floored at a small $\epsilon$ near location error.

**Algorithm 2 (family tree).** For each $i$ draw $R_i\sim U(0,1)$; if $R_i<\Pr(u_i=0)$ mark background; else choose the smallest $J$ with $R_i<\Pr(u_i=0)+\sum_{j\le J}\Pr(u_i=j)$ and set parent $=J$. Repeating reveals declustering uncertainty.

> [!definition] Forward Likelihood-based Predictive (FLP) approach (Chiodi & Adelfio 2011)
> Maximising the likelihood over a kernel bandwidth collapses it to zero (point masses). FLP instead scores one-step-ahead predictions: $\delta_{k,k+1}(\Theta\mid\mathcal H_{t_k})=\log\lambda(s_{k+1},t_{k+1})-\int_{t_k}^{t_{k+1}}\!\!\int_{\mathcal X}\lambda$, with $\mu$ estimated from the first $k$ events only, and $\text{FLP}(\hat\Theta)=\sum_{k=k_1}^{n-1}\delta_{k,k+1}$, $k_1=\lfloor n/2\rfloor$. Algorithm 3 alternates ML for triggering parameters $\Theta$ with FLP maximisation for smoothing $\Sigma$ (Silverman start).

^def-flp

> [!definition] Model-independent stochastic declustering (MISD; Marsan & Lengline 2008)
> Takes $\lambda=\lambda_0+\sum g(s-s_i,t-t_i)$ with $g$ piecewise constant on space-time bins, estimated by EM (E step: $\Pr(u_i=j)$; M step: bin averages and $\lambda_0$). Fox, Schoenberg & Gordon (2016) allow spatially varying background and bootstrap uncertainty.

^def-misd

## Examples
Zhuang, Ogata & Vere-Jones (2004) declustered a 19,139-event JMA catalogue and found some standard ETAS assumptions fail, leading to revised models (Ogata & Zhuang 2006). Harte (2012): a poor background fit biases towards labelling background events as triggered, inflating $m$.

```python
import numpy as np
def parent_probs(t, mu, g):            # g(dt) vectorised triggering kernel
    n = len(t); P = np.zeros((n, n)); lam = np.full(n, mu)
    for i in range(1, n):
        w = g(t[i]-t[:i]); lam[i] += w.sum(); P[i,:i] = w
    P /= lam[:,None]; p0 = mu/lam
    return p0, P
t = np.sort(np.random.default_rng(2).uniform(0,20,40))
p0, P = parent_probs(t, .5, lambda d: .4*2*np.exp(-2*d)); print(p0[:5], (p0+P.sum(1))[:3])  # rows sum to 1
```

## Connections
[[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] supplies $\Pr(u_i=j)$. In marketing terms, declustering = splitting conversions into organic vs. contagion-driven.

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
