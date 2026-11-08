---
title: "Concept Notes - Log-Pearson III Flood Frequency and Historic Floods"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "concept note, no raw source"
source_location: "Concept note citing Bulletin 17B/17C (England et al. 2019), Pearson (1895), Philip et al. 2020 Sec. 4.2 for context; figures from memory of standard literature, verify before use"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Concept Notes - Usual Intake and Flood Frequency"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Extreme Value Distributions for Attribution]]"
used_by:
  - "[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]"
aliases:
  - log-Pearson type III
  - LP3 flood frequency
  - historic floods censored data
  - Bulletin 17C
  - expected moments algorithm
---

# Concept Notes - Log-Pearson III Flood Frequency and Historic Floods

> [!summary]
> **Concept note, no raw source.** US flood-frequency practice (Bulletin 17B/17C) models the base-10 logarithm of annual peak flow with a Pearson type III distribution (log-Pearson III, LP3). Floods known to have exceeded a high threshold in an ungauged historical period ("floods nobody gauged") are *censored data*, not extra annual maxima. A Bayesian LP3 treats them with a likelihood for "all other years stayed below the perception threshold".

## Overview

Motivating PyMC example **E113**: "Is the 100-year flood still a 100-year flood? Two centuries of Susquehanna peaks and the floods nobody gauged" (USGS NWIS annual peaks, 12 gauges; 1,351 gauged and 20 historic peaks) at <https://redam94.github.io/pymc-challenges/examples.html>. Method list from the example: LP3 in PyTensor, a wrong library gradient replaced by quadrature, a support clamp that rewards the impossible, historic floods as censored data, a latent perception threshold summed out, neighbour checks of "nothing above the mark".

## Main Content

> [!definition] Log-Pearson III
> $Y=\log_{10}Q$ follows a Pearson III (shifted gamma) distribution with mean $m$, standard deviation $s$ and skew $\gamma$:
> $$f_Y(y)=\frac{|\beta|}{\Gamma(\alpha)}\{\beta(y-\tau)\}^{\alpha-1}e^{-\beta(y-\tau)},\quad \alpha=\frac4{\gamma^2},\ \beta=\frac{2}{s\gamma},\ \tau=m-\frac{2s}{\gamma}.$$
> For $\gamma>0$ the support is $y>\tau$ (lower bound); for $\gamma<0$ it is $y<\tau$ (upper bound, $\beta<0$). $\gamma\to0$ gives the log-normal. The $T$-year flow is $\hat Q_T=10^{m+K_T(\gamma)s}$ with frequency factor $K_T$ (Wilson-Hilferty approximation: $K=\frac2\gamma\{(1+\frac{\gamma z}{6}-\frac{\gamma^2}{36})^3-1\}$, $z=\Phi^{-1}(1-1/T)$).
^def-lp3

> [!definition] Historic information as censoring (conceptual)
> A gauge record covers $n_g$ years; a historical period of $H$ years before it is known to have had $k$ floods exceeding a **perception threshold** $X_H$ (e.g. flood marks, newspaper accounts) and none other. Likelihood contribution: for the $k$ known historic peaks $\prod f_Y(y_j)$; for the other $H-k$ years the interval-censored term $F_Y(\log X_H)^{H-k}$. If $X_H$ is not known exactly it is a latent variable summed (integrated) out. The Expected Moments Algorithm (EMA; Cohn et al. 1997; Bulletin 17C, England et al. 2019) is the moment-based frequentist treatment of the same idea, also handling low outliers (PILFs), regional skew and interval data.
^def-historic-censoring

**Pitfalls (as indicated by E113's list).**
- *Library gradients*: the CDF of the gamma/Pearson III in the incomplete-gamma form may have a wrong or missing gradient wrt the shape; replace by quadrature or a custom Op when sampling with NUTS.
- *Support clamp that rewards the impossible*: clamping $y$ into the support or truncating the log-density to $-10^{10}$ can create a likelihood region where impossible parameter values look good; the support must enter as a proper constraint/reparameterisation (compare the GEV support wall in [[Philip 2020 - Bayesian GEV Attribution in PyMC]]).
- *Skew uncertainty*: station skew from short records is unreliable; Bulletin 17B/C combine with a regional skew (weighted by MSE). In Bayesian terms a regional-skew prior; hierarchical pooling across gauges ([[Hierarchical Models]]).
- *"Nothing above the mark"*: the censored period statement should be checked at neighbouring gauges - if a neighbour saw a huge flood in a year your gauge's historic list says nothing above the mark, the data conflict.

## Examples

> [!example] Python: LP3 quantile with frequency factor, and censored historic likelihood
> ```python
> import numpy as np
> from scipy import stats
> def lp3_quantile(m, s, g, T):
>     z = stats.norm.ppf(1 - 1/T)
>     K = (2/g) * ((1 + g*z/6 - g**2/36)**3 - 1) if abs(g) > 1e-6 else z
>     return 10 ** (m + K*s)
> print(lp3_quantile(4.5, 0.25, 0.1, 100))           # m3/s-like units, illustrative
>
> def lp3_loglik(y_gauged, y_hist, n_hist_years, log_X_H, m, s, g):
>     a, b, tau = 4/g**2, 2/(s*g), m - 2*s/g
>     dist = stats.gamma(a, loc=tau, scale=1/b)             # positive-skew case only
>     ll = dist.logpdf(y_gauged).sum() + dist.logpdf(y_hist).sum()
>     n_below = n_hist_years - len(y_hist)
>     ll += n_below * dist.logcdf(log_X_H)                # "nothing above the mark" years
>     return ll
> ```
> (The negative-skew branch should reflect $y$ to use the gamma upper-bounded form; shown only for the positive-skew case. Untested pseudo-code.)
^ex-lp3-python

## Connections

[[Philip 2020 - Extreme Value Distributions for Attribution]] (GEV/GPD alternatives; the attribution protocol excludes the trigger event for the same selection-bias reason historic floods are modelled as censored information), [[Survival Analysis]] (censored likelihoods).

## See Also

[[Concept Notes - Usual Intake from Repeated Short-Term Measurements]]
