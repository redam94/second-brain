---
title: "Philip 2020 - Extreme Value Distributions for Attribution"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Sec. 4.2 (Eqs. 1-4) and Sec. 4.1, pp. 182-187"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Probability Framing, Event Definition and Return Periods]]"
used_by:
  - "[[Philip 2020 - Trend Models and Natural Variability]]"
  - "[[Philip 2020 - Bayesian GEV Attribution in PyMC]]"
aliases:
  - generalized extreme value
  - GEV
  - generalized Pareto
  - GPD
  - peaks over threshold
  - block maxima
  - Gumbel
  - return levels
---

# Philip 2020 - Extreme Value Distributions for Attribution

> [!summary]
> The protocol fits one of five statistical models to the observed severity variable: Gaussian (moderate extremes), GPD (peaks over threshold), GEV (block maxima), Gumbel (GEV with $\xi=0$), or gamma (precipitation). GEV and GPD shape parameters $\xi$ are kept in a physically plausible range ($|\xi|\le0.4$) by a penalty; bootstrap gives confidence intervals; the trigger event itself is generally excluded from the fit but the fitted distribution must give it non-zero probability.

## Overview

Sec. 4.1 on data: ideally 150 years of homogeneous observations; station data are preferred for extremes (gridded data have variable station counts, damping variability); regional/gridded and reanalyses for large areas; satellite and radar are too short. Pooling nearby stations to increase sample requires accounting for spatial dependence (decorrelation length) or taking the spatial maximum.

## Main Content

> [!definition] Generalized extreme value (Eq. 2)
> For the maximum of a large sample (annual or seasonal block maxima),
> $$P(x)=\exp\left[-\left(1+\xi\,\frac{x-\mu}{\sigma}\right)^{-1/\xi}\right],\qquad 1+\xi\frac{x-\mu}{\sigma}>0,$$
> $\mu$ location, $\sigma>0$ scale, $\xi$ shape (tail). $\xi>0$ heavy upper tail (Fréchet), $\xi=0$ Gumbel, $\xi<0$ bounded upper tail (reversed Weibull; upper limit $\mu-\sigma/\xi$). Extension: the $r$ largest values per year (Coles 2001) - more data but requires declustering.
^def-gev

> [!definition] Generalized Pareto, peaks over threshold (Eq. 1)
> A low tail is first converted to a high tail by multiplying the variable by $-1$. For exceedances over threshold $\mu$ (written for the upper tail as the paper does, with $x$ the excess variable),
> $$H(\mu-x)=1-\left(1-\frac{\xi x}{\sigma}\right)^{-1/\xi},$$
> $\sigma$ scale, $\xi$ shape. Penalise $|\xi|\gtrsim0.4$ (Katz et al. 2002). Precipitation lows: demand zero probability below zero ($\xi<0$, $\sigma<\mu\xi$-type constraint). For $\xi<0$ require the observed event below the upper limit.
^def-gpd

> [!definition] Gumbel
> GEV with $\xi=0$; sometimes reachable by transformation, e.g. daily precipitation raised to the power 3/2 (van den Brink and Können 2011). Gives smaller uncertainty if a Gumbel fit is adequate and there is a physical reason for $\xi=0$.
^def-gumbel

> [!definition] Gaussian and gamma
> **Gaussian**: ordinary least squares trend; tails decay as $\exp(-z^2)$, usually too fast, so only for moderate extremes with low return periods. **Gamma** (Eq. 3): $G(x)=\dfrac{1}{\sigma\Gamma(\xi)}(x/\sigma)^{\xi-1}e^{-x/\sigma}$ with scale $\sigma$ and shape $\xi$; for daily or sub-weekly data with a wet-day fraction $n$ (Eq. 4): $G(x)=(1-n)\delta(x)+\dfrac{n}{\sigma\Gamma(\xi)}(x/\sigma)^{\xi-1}e^{-x/\sigma}$ with $\delta$ the Dirac delta (dry days; threshold usually $P<1$ mm). Used with covariates e.g. Gudmundsson and Seneviratne (2016).
^def-gamma

**Return level** (standard EVT result, not printed in this paper): for GEV the $T$-year return level is $x_T=\mu-\frac\sigma\xi\{1-[-\log(1-1/T)]^{-\xi}\}$ ($\xi\ne0$), $x_T=\mu-\sigma\log[-\log(1-1/T)]$ ($\xi=0$).

**Block maxima vs POT.** POT can be used on all timescales but requires declustering exceedances into distinct events, "not easy to do automatically", so the authors prefer block maxima and a GEV for daily data. Threshold choice trades closeness to the GPD limit against sample size; for annual values they fit the highest 10-20% of the distribution, which is "not very extreme" so the justification from EVT is weak and the model is treated as a flexible empirical description; try several thresholds (Coles 2001) and discard unstable results; check q-q or return-period plot plus an objective goodness-of-fit test.

**Confidence intervals and the triggering event.** Non-parametric bootstrap (about 1000 resamples of (covariate, observation) pairs). Two-sided 95% CI (2.5-97.5%) if the sign of the effect is unknown a priori; one-sided (5%) if known from previous research (warming of temperature extremes, intensification of short precipitation extremes). The observed trigger event is **not** used in the fit ("we could have known before the event"), because including it biases the trend towards the extreme; but all bootstrap fits must give it non-zero probability (affects temperature extremes with upper bounds).

## Examples

> [!example] Python: fit a stationary GEV to annual maxima and compute a return level
> ```python
> import numpy as np
> from scipy import stats
> rng = np.random.default_rng(0)
> ann_max = stats.genextreme.rvs(c=0.1, loc=33, scale=1.5, size=80, random_state=rng)  # c = -xi
> c, loc, scale = stats.genextreme.fit(ann_max)
> xi = -c
> T = 100
> x100 = stats.genextreme.isf(1/T, c, loc, scale)
> print(xi, loc, scale, x100)          # compare |xi| <= 0.4 plausibility
> ```
^ex-gev-fit

## Connections

Hydrology uses the log-Pearson III with historic floods: [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]]. Bayesian fitting: [[Philip 2020 - Bayesian GEV Attribution in PyMC]]. Survival-analysis tail models: [[Survival Analysis]].

## See Also

[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
