---
title: "Philip 2020 - Trend Models and Natural Variability"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Sec. 4.3-4.4, Figs. 4-6, pp. 187-190"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Extreme Value Distributions for Attribution]]"
used_by:
  - "[[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]]"
  - "[[Philip 2020 - Bayesian GEV Attribution in PyMC]]"
aliases:
  - non-stationary GEV
  - shift fit
  - scale fit
  - index flood assumption
  - pattern scaling GMST
---

# Philip 2020 - Trend Models and Natural Variability

> [!summary]
> Non-stationarity is introduced by making distribution parameters functions of a covariate: the 4-year smoothed global mean surface temperature anomaly $T'$. Temperature: the distribution **shifts** ($\mu=\mu_0+\alpha T'$, $\sigma=\sigma_0$). Precipitation and wind: it **scales** ($\mu=\mu_0e^{\alpha T'/\mu_0}$, $\sigma=\sigma_0e^{\alpha T'/\mu_0}$), constant dispersion $\sigma/\mu$ (index-flood assumption). Evaluate at $T_0'$ and $T_1'$ to get $p_0,p_1$ and $PR$. Natural modes (ENSO, AMO) can be regressed out.

## Overview

Covariate choice: smoothed GMST is used because (i) smoothing removes ENSO fluctuations that would contaminate the global warming fingerprint, (ii) CO$_2$ concentration or radiative forcing give nearly the same result ($r(T',CO_2)=0.93$ for annual means), (iii) a linear time trend misses the non-linear forcing increase and depends strongly on start date, (iv) non-parametric trend tests like Mann-Kendall ignore the time evolution of the climate signal.

## Main Content

> [!definition] Shift fit
> For a temperature event assume the trend shifts with GMST: $\mu=\mu_0+\alpha T'$, $\sigma=\sigma_0$, $\xi$ constant; $\alpha$ is fitted jointly with $\mu_0,\sigma_0$. Intensity change independent of event magnitude: $\Delta I=\alpha(T_1'-T_0')$. $PR$ varies strongly with magnitude for heat events. Significance: a one- or two-sided 95% CI for $\Delta I$ excluding zero.
^def-shift

> [!definition] Scale fit
> For precipitation, drought, wind: $\mu=\mu_0\exp(\alpha T'/\mu_0)$, $\sigma=\sigma_0\exp(\alpha T'/\mu_0)$, so $\sigma/\mu=\sigma_0/\mu_0$ (the dispersion parameter) is constant - reducing the parameter count and justified by the index-flood assumption in hydrology (Hanel et al. 2009), tested with large ensembles (Otto et al. 2018a; Philip et al. 2018b). Exponential dependence mirrors Clausius-Clapeyron (Allen and Ingram 2002; Lenderink and van Meijgaard 2008). Relative change: $100\,\Delta I/I=100[\exp(\alpha(T_1'-T_0')/\mu_0)-1]$ percent.
^def-scale

**Shift and scale** fit (both relaxed): two trend parameters, larger uncertainty (Risser and Wehner 2017).

**Probability ratios** are obtained by inverting the covariate-dependent function: evaluate the distribution for year $T_0'$ (past) and $T_1'$ (present), $p_0,p_1$, return periods $\tau_0=1/p_0,\tau_1=1/p_1$; bootstrap CIs; if the CI of $PR$ excludes 1 the climates differ significantly.

> [!example] Worked examples from the paper
> | Event | Model | Result |
> |---|---|---|
> | Peru JJA 2013 cold wave (min temperature; CRU TS4.00) | Normal shifting with GMST (GPD fits also good) | return period 17 y (95% CI 7-75); $PR=0.08$ (0.02-0.21): 4 to 50 times more often before warming |
> | De Bilt 2018 highest daily mean temperature (29.7 C; record broken by 1.6 C) | GEV shifting with GMST, 1901-2017 | trend 2-4 x GMST; return period roughly 300 y (95% CI > 30 y); event above the 1900 upper limit so formally impossible, $PR=\infty$ - stated as "extremely unlikely around 1900" |
> | Southern Louisiana August 2016, 3-day precipitation (19 stations >= 80 y, >= 0.5 deg apart) | GEV scaling with GMST; bootstrap in blocks of cross-correlated stations $r>1/e$ (average 2.3 stations, ~8 d.o.f.) | return period ~500 y (360-1400); $PR=2.8$ (1.7-3.8); intensity +17% (10-21%) |
^ex-trend-examples

### Natural variability (4.4)

ENSO influences temperature and precipitation but not everywhere (weak in Europe). Quantify with lagged correlation of Nino3.4. Philip et al. (2018c) Ethiopia 2015 drought: remove the ENSO effect (regression slope of Nino3.4 on log precipitation) from 2015 only; return period few hundred years (lowest estimate 60 y) became 80 y (lowest 20 y) under ENSO-neutral conditions - "less severe but still exceptional". Decadal variability can mask the trend; if a known index (AMO) correlates strongly and physically, regress it out; residual autocorrelation absent means trend detection is valid (van Oldenborgh et al. 2016a, polar winter temperatures vs AMO). Murakami et al. (2015): El Nino and decadal variability interplayed with anthropogenic forcing in the 2014 Hawaii tropical cyclone season.

## Examples

> [!example] Python: scale-fit log-likelihood for a GEV with covariate (maximum likelihood)
> ```python
> import numpy as np
> from scipy import stats, optimize
> def nll(par, x, T):
>     mu0, log_s0, alpha, xi = par
>     mu = mu0 * np.exp(alpha * T / mu0)               # scale fit
>     sig = np.exp(log_s0) * np.exp(alpha * T / mu0)
>     if abs(xi) > 0.4: return 1e12                    # |xi|<=0.4 penalty
>     return -stats.genextreme.logpdf(x, -xi, loc=mu, scale=sig).sum()
> rng = np.random.default_rng(1); T = np.linspace(0, 1.2, 70)
> g = np.exp(3.0 * T / 50)                              # true alpha = 3.0, mu0 = 50, sigma0 = 6
x = stats.genextreme.rvs(0.05, loc=50 * g, scale=6 * g, size=70, random_state=rng)   # scipy c = -xi
> fit = optimize.minimize(nll, [x.mean(), np.log(x.std()), 0.5, -0.05], args=(x, T), method="Nelder-Mead")
> print(fit.x)
> ```
^ex-scale-fit

## Connections

[[Philip 2020 - Bayesian GEV Attribution in PyMC]] places priors on $(\mu_0,\sigma_0,\alpha,\xi)$. Linear-trend time-series analogues: [[Local Linear Trend and Seasonality]].

## See Also

[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
