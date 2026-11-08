---
title: "Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/dose-response
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Mitscherlich 1909 law of diminishing returns; Broadbalk long-term experiment at Rothamsted, started 1843; Andrews & Herzberg 1985 Data for Broadbalk wheat yields)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Hierarchical Models]]"
  - "[[Decision Analysis]]"
used_by:
  - "[[Surplus-Production State-Space Models for Fisheries (Concept Note)]]"
aliases:
  - Mitscherlich response curve
  - fertiliser response
  - Broadbalk
  - dose-response with year effects
---

# Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)

> [!summary]
> Concept note, no raw source; dataset facts are from memory and the example description, verify before reuse. A long-term field trial applies fixed treatment doses (fertiliser rates) to plots over many years; yield varies with dose (diminishing returns, plateau) and with each year's weather. A Bayesian model puts a saturating dose-response curve with plot/year structure and **weather as a modifier of the curve** (it changes the asymptote and the half-saturation dose), then derives the economic optimum: apply fertiliser until the marginal yield equals the price ratio. Example E115.

## Overview

Two sources of variation need separating: *treatment* (dose) and *year* (weather, shared by all plots in a year). Because all plots in a year share the weather, year effects are a random effect or are replaced by weather covariates; fertiliser response is then estimated from within-year contrasts, with the covariates explaining part of the between-year variation. The question 'what is the last bag of fertiliser worth?' is a marginal analysis of the response curve, conditional on weather.

## Main Content

> [!definition] Weather-modified saturating response (Mitscherlich form)
> For plot $p$ in year $t$ with nitrogen dose $N_p$ (kg/ha) and weather summary $w_t$ (e.g., standardised spring rainfall),
> $$y_{pt}\sim\text{Normal}\big(A_t\,[1-\exp(-c_t\,(N_p+b))],\ \sigma^2\big),\quad \log A_t=\alpha_0+\alpha_1w_t+u_t,\quad \log c_t=\gamma_0+\gamma_1w_t,$$
> with $A_t$ the yield plateau in year $t$, $c_t$ the response rate, $b$ the soil N supply (yield at $N=0$ is $A_t[1-e^{-c_tb}]$), $u_t\sim N(0,\tau^2)$ a residual year effect. Alternatives: linear-plateau, quadratic-plateau (kinked, with an unknown join point — hard to sample), or a Hill curve.
^def-weather-mitscherlich

> [!theorem] Economic optimum dose
> Profit per hectare is $\pi(N)=P\,y(N)-cN$ with grain price $P$ and N cost $c$ per kg. The first-order condition gives $y'(N^*)=c/P$ (the 'price ratio'). For the Mitscherlich curve,
> $$N^*_t=\frac1{c_t}\log\!\Big(\frac{A_tc_tP}{c}\Big)-b,\quad\text{if positive; otherwise }N^*=0.$$
> Since $A_t$ and $c_t$ depend on weather, $N^*$ is a *posterior distribution* over years and prices; the decision to fix $N$ before knowing the weather maximises expected profit over the weather distribution, $N^{**}=\arg\max_N\mathbb E_{t,\theta}[\pi_t(N)]$.
^thm-economic-optimum

**Modelling choices.**
1. **Long series (e.g. 74 years, 1852-1925, 16 strips).** Treat strip as a grouping factor (plots do not turn over) with strip-level offsets; allow slow trends (varieties, soil drift, weed pressure) via a smooth year term or random walk, or the weather effect will absorb them.
2. **Treatment hand-coding.** Many historic treatments are combinations (manure, N, P, K, salts); aggregate to an N-dose and an indicator for other nutrients or fit a factor model; mis-coding treatments is a common error source.
3. **Weather as covariates vs as year effects.** Weather covariates give interpretable mechanisms and prediction for new years; residual year effects absorb the rest. Check that $\gamma_1,\alpha_1$ are not confounded with a time trend (use detrended weather or include trend).
4. **Heteroskedasticity.** Variance rises with the mean; use a lognormal or a variance linked to the fitted mean.

## Examples

**Optimal N under weather uncertainty (runs; illustrative parameters).**
```python
import numpy as np
rng = np.random.default_rng(0)
P, c = 0.20, 1.0                        # grain 0.20 per kg, N 1.0 per kg
b = 30.
w = rng.normal(size=5000)               # standardised rainfall
A = 8000*np.exp(0.15*w); cc = 0.012*np.exp(0.3*w)      # plateau (kg/ha) and rate
Ngrid = np.arange(0, 301, 10.)
y = A[:, None]*(1 - np.exp(-cc[:, None]*(Ngrid[None, :] + b)))
profit = P*y - c*Ngrid[None, :]
print(Ngrid[profit.mean(0).argmax()])                  # 210: expected-profit-optimal single dose
Nstar = np.log(A*cc*P/c)/cc - b                         # year-specific optimum
print(np.percentile(Nstar, [10, 50, 90]).round(0))      # [170 217 260]: spread across weather (verified)
```
**Interpretation.** The optimum dose varies across weather states (the 10th to 90th percentile is 170 to 260 kg/ha in this illustration (parameters are illustrative, not fitted to Broadbalk)), yet one dose must be chosen before the season; the Bayesian answer averages profit over the posterior and weather distribution, and the cost of being wrong is asymmetric (under-dosing forfeits yield, over-dosing wastes N and pollutes).

**PyMC sketch (untested).** Parameters `alpha0, alpha1, gamma0, gamma1, b, tau, sigma`; `u = pm.Normal("u", 0, tau, dims="year")`; `mu = A[year]*(1-pt.exp(-c[year]*(N+b)))`; likelihood `pm.Normal("y", mu, sigma, observed=yield_)`; derive `N_star` in `pm.Deterministic`.

## Relevance to marketing measurement

This is the structure of a saturating media-response curve with time-varying modifiers (seasonality, category demand shocks) and a budget decision: 'the last bag of fertiliser' is the marginal ROI of the last dollar, set equal to its cost. The same marginal analysis and the same need to condition on shared shocks (weather = macro conditions) apply. Compare [[Bayesian Estimation and Priors for MMM]] and [[Decision Analysis]].

## Connections

[[Hierarchical Models]], [[Posterior Predictive Checking]], [[Local vs Global Sensitivity Analysis]], [[Partial Pooling as Multiple Comparisons Correction]].

## See Also

[[Surplus-Production State-Space Models for Fisheries (Concept Note)]], [[Population PK Dosing Decisions from the Posterior (Concept Note)]] (dose-response with decision).
