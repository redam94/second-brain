---
title: "Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates.pdf]]"
source_location: "pp. 338-342: Bayes' theorem, Calendar date information, Eqs. 1-11, Figs. 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates"
doc_type: paper
depends_on: []
used_by:
  - "[[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]]"
  - "[[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]]"
  - "[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]"
aliases:
  - "radiocarbon calibration likelihood"
  - "IntCal calibration equation"
  - "calibration curve Bayesian"
---

# Bronk Ramsey 2009 - Calibration Likelihood and the Calibration Curve

> [!summary]
> A 14C measurement $r_i\pm s_i$ is the likelihood for the sample's true 14C ratio $\rho_i$; the calibration curve $r(t)\pm s(t)$ acts as a prior linking $\rho_i$ to calendar date $t_i$. Integrating out $\rho_i$ gives the standard calibration likelihood $\propto \exp\{-(r_i-r(t_i))^2/2(s_i^2+s(t_i)^2)\}/\sqrt{s_i^2+s(t_i)^2}$. Because $r(t)$ wiggles and has plateaus, the posterior over $t_i$ is multimodal and not normal.

## Overview

The paper's framework: **events** are points on a continuous (floating-point) timescale; observations give likelihoods for event dates. Calendar information (historical records, scientific dating) is likelihood; relative information (stratigraphy) is prior. The timescale must be well defined: OxCal uses a fractional-year ISO-8601-based scale (1.0 = 0001-01-01 00:00 UT, year length 365.2425 days); "cal BP" means years before the middle of AD 1950.

## Main Content

> [!definition] Bayes' theorem for chronologies (Eq. 1)
> $$p(\mathbf t\mid\mathbf y)\propto p(\mathbf y\mid\mathbf t)\,p(\mathbf t),$$ where $\mathbf t$ are event dates, $\mathbf y$ measurements, $p(\mathbf t)$ the prior (relative information) and $p(\mathbf y\mid\mathbf t)$ the likelihood (calendar information). The *null prior* $p_0(\mathbf t)\propto\text{const}$ (Eq. 2) is "quite inappropriate" when there are many dates.
^def-bayes-chron

> [!definition] Non-14C likelihoods (Eqs. 3-4)
> A historical range gives $p(y_i\mid t_i)\sim U(1066.995,\,1087.703)$ (reign of William the Conqueror). An Ar-Ar age of $29{,}500\pm560$ BP (Laacher See Tephra) gives $p(y_i\mid t_i)\sim N(1995-29500,\,560)$.
^def-non14c-lik

> [!theorem] Standard calibration equation (Eqs. 5-11)
> Let $\rho_i$ be the true 14C ratio. Measurement model (Eq. 5): $p(y_i\mid\rho_i)=\dfrac{1}{s_i\sqrt{2\pi}}\exp\{-(r_i-\rho_i)^2/2s_i^2\}$. Curve prior (Eq. 6): $p(\rho_i,t_i)\propto\dfrac{1}{s(t_i)}\exp\{-(\rho_i-r(t_i))^2/2s(t_i)^2\}$, neutral with respect to date because it integrates to a constant over $\rho_i$. Integrating out $\rho_i$ (Eqs. 7-8):
> $$p(y_i\mid t_i)\propto\frac{\exp\!\big\{-\dfrac{(r_i-r(t_i))^2}{2\,(s_i^2+s(t_i)^2)}\big\}}{\sqrt{s_i^2+s(t_i)^2}}\quad\text{(Eq. 9)}.$$
> With a single event and a flat prior (Eq. 10), the posterior equals this likelihood: $p(t_i\mid y_i)\propto p(y_i\mid t_i)$ (Eq. 11).
>
> *Proof sketch.* The product of two Gaussians in $\rho_i$ integrates to a Gaussian in $r_i-r(t_i)$ with summed variance.
^thm-calibration

**Practical points from the paper.**
- Express near-background measurements as the ratio $F^{14}\text{C}$, not the 14C age, because errors are approximately normal on the ratio but far from normal for the age; calibrate older dates against the ratio.
- Eq. 9 already contains prior information from the curve, so repeated 14C measurements on the *same* sample must be combined *before* calibration; otherwise the curve prior is counted several times.
- The probability method (Eq. 9) is "essentially Bayesian"; the older intercept method gives only ranges.
- Reported ranges are **highest probability density (HPD)** regions at 68% and 95%, not "1 sigma/2 sigma" (those words belong to the intercept method).

## Examples

> [!example] Multimodal calendar posterior from a toy curve
> Setup: grid of calendar years 1000-1600; toy curve $r(t)=1000+0.9(t-1000)+60\sin((t-1000)/18)$ with $s(t)=12$; measurement $r=1300\pm20$. Solution: evaluate Eq. 9 on the grid and normalise. Result: three local maxima near 1259, 1338 and 1419; 95% HPD set $\approx[1239,1282]\cup[1327,1349]\cup[1401,1436]$. Interpretation: the curve crosses 1300 three times, so three distinct calendar windows are plausible. A single interval or a normal summary misrepresents this; a gradient-based sampler on $t$ would find one mode only.
^ex-multimodal

```python
import numpy as np
from scipy.signal import find_peaks
cal = np.arange(1000, 1601)
r = 1000 + 0.9*(cal-1000) + 60*np.sin((cal-1000)/18)   # toy curve (not IntCal)
s = 12.0
lik = np.exp(-0.5*(1300-r)**2/(20**2+s**2))/np.sqrt(20**2+s**2)
post = lik/lik.sum()
print(cal[find_peaks(post, height=0.2*post.max())[0]])   # [1259 1338 1419]
idx = np.argsort(post)[::-1]; keep = np.sort(cal[idx[:np.searchsorted(np.cumsum(post[idx]), .95)+1]])
```

**Why E39 sums the date out on a grid.** With a discrete 1-year grid, the date is a categorical parameter: the marginal likelihood of each measurement is $\sum_{t}p(t)\,p(y\mid t)$, so only continuous nuisance parameters (lab offsets) remain for NUTS. This avoids sampling a multimodal continuous $t$. This is the example's design (see [the gallery](https://redam94.github.io/pymc-challenges/examples.html)), not a claim of the paper.

**PyMC-style sketch (untested pseudocode).**
```python
with pm.Model():
    log_p_t = pm.math.log(prior_on_grid)                    # (G,)
    mu = curve_mean + lab_offset[lab]                       # (N,G)
    ll = pm.logp(pm.Normal.dist(mu, pt.sqrt(s_obs[:,None]**2 + curve_sd**2)), y[:,None])
    pm.Potential("ll", pm.math.logsumexp(ll + log_p_t, axis=1).sum())
```

## Connections
- Order and group priors: [[Bronk Ramsey 2009 - Order Constraints and the Uniform Phase Prior]].
- Diagnostics: [[Bronk Ramsey 2009 - MCMC Outputs Diagnostics and Agreement Indices]].
- Convolution of uncertainties (measurement plus curve) resembles error-in-variables models: [[Missing Data Models]] for the general latent-variable view.

## See Also
[[Bronk Ramsey 2009 - Bayesian Analysis of Radiocarbon Dates - Overview]]
