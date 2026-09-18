---
title: Carryover (Adstock) Functional Forms
tags:
  - source/ingested
  - topic/market-response-models
  - type/definition
  - doc/paper
  - method/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 2.1, pp. 3-4 (Eqs. 1-3)"
date_ingested: 2026-06-17
date_updated: 2026-07-27
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Carryover Effects and Distributed Lags]]"
used_by:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
aliases:
  - Adstock
  - Geometric Adstock
  - Delayed Adstock
  - Peak Adstock
  - Carryover Effect
---

# Carryover (Adstock) Functional Forms

> [!summary]
> The **adstock** transformation captures advertising's carryover (lag) effect by replacing current spend with a finite, normalized weighted average of current and past spend over $L$ periods. Jin et al. give two weight functions: **geometric decay** (effect peaks at the exposure period and decays by a retention rate $\alpha_m$) and **delayed adstock** (effect peaks $\theta_m$ periods later, a Gaussian-shaped radial kernel). Geometric adstock is the continuous analog of the Koyck distributed lag.

## Overview

Some media build effect immediately (peak at exposure); others (e.g. brand TV) take time to peak. The adstock function transforms the raw spend time series so the regression sees the *cumulative* media effect rather than instantaneous spend. The maximum carryover duration $L$ truncates the window; for the chosen simulation parameters $L=13$ weeks approximates infinity (weights $< 10^{-7}$ beyond 13 weeks), and $L=13$ is also used in the real-data application.

## Main Content

> [!definition] Adstock transformation (finite-window, normalized)
> $$
> \text{adstock}(x_{t-L+1,m},\dots,x_{t,m};\,w_m,L) = \frac{\sum_{l=0}^{L-1} w_m(l)\,x_{t-l,m}}{\sum_{l=0}^{L-1} w_m(l)},
> $$
> where $x_{t,m}$ is spend of channel $m$ at week $t$, $w_m(\cdot) \ge 0$ is a weight function, $L$ is the maximum carryover duration (common across media for simplicity). The denominator **normalizes** the weights so adstock is a proper weighted average (preserving the spend scale). A large $L$ approximates an infinite window. (Eq. 1)
^adstock-eq

> [!definition] Geometric decay weights
> $$
> w^{g}_m(l;\alpha_m) = \alpha_m^{\,l}, \qquad l = 0,\dots,L-1, \quad 0 < \alpha_m < 1.
> $$
> $\alpha_m$ is the **retention rate** of the ad effect from one period to the next. The effect peaks at the same period as the exposure ($l=0$) and decays geometrically. This is the discrete geometric distributed lag — the marketing analog of the **Koyck lag** (see [[Carryover Effects and Distributed Lags]]). (Eq. 2)
^geometric-decay

> [!definition] Delayed (peak) adstock weights
> $$
> w^{d}_m(l;\alpha_m,\theta_m) = \alpha_m^{\,(l-\theta_m)^2}, \qquad l = 0,\dots,L-1, \quad 0 < \alpha_m < 1, \quad 0 \le \theta_m \le L-1.
> $$
> $\theta_m$ is the **delay of the peak effect**: the weight is maximized at lag $l=\theta_m$ rather than at $l=0$. The form is proportional to a normal density with mean $\theta_m$ and variance $-1/(2\log\alpha_m)$ — equivalently the **radial (Gaussian) kernel** used in local regression (Friedman, Hastie & Tibshirani 2009, p. 212). Setting $\theta_m = 0$ recovers geometric decay. Other delayed forms (e.g. negative-binomial density, Hanssens et al. 2003) work too. (Eq. 3)
^delayed-adstock

**Intuition (Figure 1).** With the same $\alpha_m = 0.8$: geometric adstock decays monotonically from lag 0; delayed adstock with $\theta_m = 5$ rises to a peak around lag 5 then falls off — a "pulse" of delayed response.

## Examples

> [!example] Simulation generating parameters (Sec. 5, Table 1)
> The simulated dataset uses **delayed adstock**. Per-media: retention $\alpha = (0.6, 0.8, 0.8)$, delay $\theta = (5, 3, 4)$ for Media 1/2/3, with $L = 13$. Estimation recovery (Sec. 6): the delay $\theta$ is estimated with **low bias and only moderate uncertainty even in small samples**, while $\alpha$ shows somewhat more bias/uncertainty in small samples but is precise for large samples. Adstock parameters are recovered better for stronger-signal media (Media 1, 2) than the weak Media 3.

> [!example] Real-data preference for geometric adstock (Sec. 8)
> In the shampoo application the delay $\theta$ is **not estimated well** (its posterior nearly equals the uniform prior), so the authors prefer the simpler geometric adstock; the more flexible delayed form does not improve fit. See [[MMM Model Selection and Application]].

## Connections

- Direct generalization of the **Koyck / geometric distributed lag** model: [[Carryover Effects and Distributed Lags]]. The retention rate $\alpha_m$ plays the role of the Koyck carryover coefficient $\lambda$.
- Feeds the combined model in [[Bayesian Media Mix Modeling - Overview]] (adstock applied before Hill shape transform).
- Prior choices for $\alpha_m$ (beta/uniform on $[0,1)$) and $\theta_m$ (uniform on $[0,L-1]$): [[Bayesian Estimation and Priors for MMM]].

## See Also

- [[Shape (Saturation) Effects]]
- [[Carryover Effects and Distributed Lags]]
- [[Bayesian Media Mix Modeling - Overview]]
- [[Design of Dynamic Response Models]] — covers the broader design space for dynamic marketing response (Koyck, PDL, ARMA transfer functions) of which adstock is a special case
- [[_Index|Index: Bayesian Media Mix Modeling]]
