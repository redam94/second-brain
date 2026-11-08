---
title: "Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 3.3, pp. 5-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]"
used_by:
  - "[[Heath 2015 - Influenza Vaccine Case Study and Table 1]]"
  - "[[Heath 2015 - Discussion Limitations and Practical Guidance]]"
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
aliases:
  - Regression EVPPI
  - EVPPI by non-parametric regression
---

# Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)

> [!summary]
> Oakley and Strong et al. rewrite the inner conditional expectation of Eq. (1) as a regression: $NB_t(\theta^s)=g_t(\phi^s)+\varepsilon^s$. Fitting $g_t$ with a GAM or a Gaussian process to the PSA sample gives EVPPI for any subset $\phi$ from a five-step recipe with no extra model runs. The paper judges this "the best method for calculating the EVPPI efficiently".

## Overview

Because $\mathbb{E}_{\psi\mid\phi}[NB_t(\phi,\psi)]$ is a function of $\phi$ only, the noisy simulated values $NB_t(\theta^s)$ are unbiased observations of it at the points $\phi^s$. Any flexible smoother then estimates the inner expectation; the noise $\varepsilon^s\sim N(0,\sigma_\varepsilon^2)$ is the contribution of $\psi$ given $\phi$.

## Main Content

> [!definition] Regression model for the inner expectation
> $$NB_t(\theta^s)=\mathbb{E}_{\psi\mid\phi^s}\!\big[NB_t(\phi^s,\psi^s)\big]+\varepsilon^s=g_t(\phi^s)+\varepsilon^s,\qquad \varepsilon^s\sim N(0,\sigma_\varepsilon^2).$$
> The $\phi^s$ are "observed covariates" and $NB_t(\theta^s)$ the "observed response", $s=1..S$ simulations.
^def-evppi-regression

> [!theorem] Regression EVPPI estimator (Strong et al. 2014)
> Fit $\hat g_t$ for each option $t$ and let $\hat g_t(\phi^s)$ be the fitted values. Then
> $$\widehat{\text{EVPPI}}=\frac1S\sum_{s=1}^S\max_t\hat g_t(\phi^s)-\max_t\frac1S\sum_{s=1}^S\hat g_t(\phi^s).$$
> The five steps: (1) sample $\theta^s$; (2) compute $NB_t(\theta^s)$; (3) regress each $NB_t$ on $\phi$; (4) take fitted values; (5) apply the formula. Strong et al. supply R code with **GAM** (spline smoothers; `gam` chooses basis dimension automatically) and **Gaussian process** regression (a specific structure with analytic results, so no user-supplied model).
^thm-evppi-regression

*Implementations.* R functions of Strong et al., the web app **SAVI** (Sheffield Accelerated Value of Information) with standardised graphics and tables, and the R package **BCEA**.

*Properties.* GAM: negligible cost for one parameter; user must specify interaction structure for larger subsets; "mathematically unstable for larger subsets of parameters ($\geq 6$)". GP: feasible for large subsets, but compute is proportional to $N^3$ for a PSA of size $N$; an extension using geostatistics (INLA/SPDE, ref. [20]) is "being investigated".

## Examples

Verified toy example (run in this session): option 0 has $NB=0$, option 1 has $NB=0.3+0.5\phi+0.5\psi$ with independent standard normals, $S=200{,}000$. A degree-5 polynomial regression stands in for the GAM.

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(1); S = 200_000
phi, psi = rng.normal(size=S), rng.normal(size=S)
NB = np.stack([np.zeros(S), 0.3 + 0.5*phi + 0.5*psi])
base = NB.mean(1).max()
evpi = NB.max(0).mean() - base                     # 0.1575 (analytic 0.1571)
g = np.stack([np.polyval(np.polyfit(phi, NB[t], 5), phi) for t in range(2)])
evppi = g.max(0).mean() - g.mean(1).max()          # 0.0845 (analytic 0.0843)
```

Analytic values use $\mathbb{E}[\max(m+sZ,0)]=s\varphi(m/s)+m\Phi(m/s)$ with $m=0.3$ and $s=\sqrt{0.5}$ (EVPI) or $s=0.5$ (EVPPI).

PyMC-style sketch (untested): draw the posterior with `pm.sample`, compute net-benefit arrays from `idata.posterior`, then call a GP/GAM regression (e.g. `pm.gp.Marginal` or `pygam`) on the chosen parameter column; the five-step formula above is pure NumPy on the fitted values.

## Connections
- Estimating EVPPI is a regression of decision value on a parameter, so it inherits regression pathologies (extrapolation at tails, overfit with small $S$); report to 1-2 decimals as the paper advises.
- Marketing: with posterior draws from an MMM, run this for each channel's response parameters to rank where better data pays; this is the decision-oriented complement of a sensitivity analysis.
- GP regression machinery: [[Gaussian Process Regression]], and for large $N$ [[Hilbert Space Gaussian Processes]].

## See Also
- [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]]
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
