---
title: "Reinhart 2018 - ETAS Earthquake Models and Omori Law"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Sec. 4.1, pp. 19-22"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]"
  - "[[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]]"
used_by:
  - "[[Reinhart 2018 - Crime, Epidemic and Network Applications]]"
aliases:
  - "ETAS"
  - "Omori-Utsu law"
  - "aftershock forecasting"
  - "Gutenberg-Richter"
---

# Reinhart 2018 - ETAS Earthquake Models and Omori Law

> [!summary]
> The Epidemic-Type Aftershock Sequence (ETAS) model is a Hawkes process whose triggering function is the modified Omori law scaled by magnitude: $\lambda(t)=\mu+\sum_{t_i<t}K_0e^{\alpha(M_i-M_0)}/(t-t_i+c)^p$. It is the template for PyMC example E65 (Ridgecrest). Branching ratio and background-fit quality control forecasts.

## Overview
After a large earthquake aftershocks cluster near the epicentre in the following days and weeks. ETAS (Ogata 1988, 1999) treats all earthquakes as capable of triggering; magnitudes are unpredictable marks.

## Main Content

> [!definition] Temporal ETAS (Sec. 4.1)
> $$\lambda(t)=\mu+\sum_{i:t_i<t}\frac{K_i}{(t-t_i+c)^p},\qquad K_i=K_0\,e^{\alpha(M_i-M_0)},$$
> $\mu$ background rate; $M_0$ catalogue completeness magnitude; $K_0,\alpha,c,p$ constants. The kernel in $t$ is the **modified Omori formula** (empirical); magnitudes $M_i$ are unpredictable marks.

^def-etas-temporal

The spatio-temporal extension has the form of eq. 2 with kernels ranging from bivariate normal to power laws, some with magnitude-dependent range; $\mu(s)$ from a kernel density estimate (Musmeci & Vere-Jones 1992) or declustering ([[Reinhart 2018 - Stochastic Declustering]]).

> [!theorem] Branching ratio of ETAS (derived from the definition of $m$; not stated in the paper)
> For $p>1$, an event of magnitude $M$ has expected direct offspring $m(M)=K_0e^{\alpha(M-M_0)}\,c^{1-p}/(p-1)$. If magnitudes follow Gutenberg-Richter, $M-M_0\sim\text{Exp}(\beta)$ with $\beta=b\ln10$, then $\mathbb E[e^{\alpha(M-M_0)}]=\beta/(\beta-\alpha)$ (needs $\alpha<\beta$), so
> $$m=\frac{K_0\,c^{1-p}}{p-1}\cdot\frac{\beta}{\beta-\alpha}.$$
> Subcritical iff $m<1$; $p\le1$ gives infinite integral (non-integrable Omori tail).

^thm-etas-branching-ratio

Findings in the review:
- Zhuang et al. (2004) used declustering on 19,139 JMA earthquakes to test assumptions; some failed, giving a revised model.
- AIC comparison: spatial **power-law** triggering beat normal kernels (long-range triggering; productivity depends on mainshock magnitude), improving forecasts (Zhuang 2011).
- Harte (2012): a bad background fit inflates triggering and $m$.
- Non-homogeneous parameters: Ogata, Katsura & Tanemura (2003, Delaunay interpolation with smoothness penalty); Nandan et al. (2017, Voronoi cells, $q$ chosen by BIC). Temporal non-stationarity: Kumazawa & Ogata (2014; change-point versus spline-in-time parameters; AIC).

## Examples

> [!example] E65-style workflow (Ridgecrest 2019, 6,909 M2+ events 2016-2019)
> Notation per the example list: conditional intensity and branching ratio, closed-form compensator, Omori-Utsu ETAS with Gutenberg-Richter $b$-value, $O(n^2)$ vs $O(n)$ recursion vs power law as a mixture of exponentials. Because $1/(t+c)^p=\frac{1}{\Gamma(p)}\int_0^\infty s^{p-1}e^{-s(t+c)}ds$, a power law is a (continuous) mixture of exponentials, so finite mixtures of exponentials give an $O(Kn)$ recursion for ETAS.

Untested PyMC 5 sketch (compensator closed form: $\int_{t_i}^{T}\frac{K_i}{(t-t_i+c)^p}dt=\frac{K_i}{p-1}\big[c^{1-p}-(T-t_i+c)^{1-p}\big]$):
```python
import numpy as np, pymc as pm, pytensor.tensor as pt
# t: sorted event times (days), M: magnitudes, M0: completeness magnitude, T: window end
dt = t[:, None] - t[None, :]; mask = np.tril(np.ones_like(dt), -1).astype(bool)
with pm.Model():
    mu = pm.LogNormal("mu", np.log(0.1), 1); K0 = pm.LogNormal("K0", np.log(0.02), 1)
    alpha = pm.HalfNormal("alpha", 1.5); c = pm.LogNormal("c", np.log(0.01), 1)
    p = 1 + pm.HalfNormal("p_minus_1", 0.5)
    Ki = K0 * pt.exp(alpha * (M - M0))
    g = Ki[None, :] / (pt.where(mask, dt, 0.0) + c) ** p * mask
    lam = mu + g.sum(axis=1)
    comp = mu * T + pt.sum(Ki / (p - 1) * (c ** (1 - p) - (T - t + c) ** (1 - p)))
    pm.Potential("loglik", pt.log(lam).sum() - comp)
    # b-value: M - M0 ~ Exponential(b*ln 10)  (Gutenberg-Richter)  -> separate likelihood term
    b = pm.HalfNormal("b", 2); pm.Exponential("mag", b * np.log(10), observed=M - M0)
```
Pitfalls: strong $(K_0,\alpha,p,c)$ correlation, boundary effects at the catalogue start, and incomplete short-term detection after large events (not discussed in the review).

## Connections
- [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] (general form); [[Reinhart 2018 - Simulation, Inference and Diagnostics]] (simulate forecasts).
- Contrast: Oklahoma induced seismicity in E07 is modelled with an LGCP, [[Simpson 2016 - Going Off Grid - Overview]].

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
