---
title: "Roever 2020 - Prediction, Shrinkage and Credible Intervals"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.7-2.9 (pp. 16-17, Eq. 27-29); App. A.4 (p. 40)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
used_by:
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - posterior predictive distribution of a new study
  - Bayesian shrinkage estimates in meta-analysis
  - shortest credible interval
---

# Roever 2020 - Prediction, Shrinkage and Credible Intervals

> [!summary]
> Conditional on $\tau$, both the predictive distribution of a future study's effect $\theta_{k+1}$ and the posterior of each study's own true effect $\theta_j$ are normal, with closed-form moments. Marginalising over $\tau$ gives normal mixtures. The predictive variance adds $\tau^2$ to the effect's variance; shrinkage pulls each $\theta_j$ toward $\hat\mu(\tau)$ by an amount that grows as $\tau$ falls. Shortest (or HPD) intervals are preferred to central intervals for skewed posteriors such as that of $\tau$.

## Overview

These are the outputs that turn a meta-analysis into decision inputs: where will the next study's true effect fall (prediction), and what should I believe about *this* study given the others (shrinkage, "borrowing strength").

## Main Content

> [!theorem] Predictive distribution of a new study (Sec. 2.7, Eq. 27)
> For a uniform or normal effect prior and a given $\tau$, $\theta_{k+1}\mid\tau,\vec y,\vec\sigma$ is normal with
> $$
> E[\theta_{k+1}\mid\tau,\vec y,\vec\sigma]=\hat\mu(\tau),\qquad\text{Var}(\theta_{k+1}\mid\tau,\vec y,\vec\sigma)=\hat\sigma^2(\tau)+\tau^2 .
> $$
> The unconditional predictive is the mixture over $p(\tau\mid y)$. Because the conditional means of $\mu\mid\tau$ and $\theta_{k+1}\mid\tau$ coincide and the latter variance is at least as large, the $\tau$-grid built for $\mu$ is valid for prediction.
^thm-predictive-distribution

> [!theorem] Shrinkage estimates of study effects (Sec. 2.8, Eq. 28-29)
> Given $\tau$, $\theta_j\mid\tau,\vec y,\vec\sigma$ is normal with
> $$
> E[\theta_j\mid\tau,\vec y,\vec\sigma]=\frac{\frac1{\sigma_j^2}y_j+\frac1{\tau^2}\hat\mu(\tau)}{\frac1{\sigma_j^2}+\frac1{\tau^2}},
> $$
> $$
> \text{Var}(\theta_j\mid\tau,\vec y,\vec\sigma)=\frac{1}{\frac1{\sigma_j^2}+\frac1{\tau^2}}+\left(\frac{\frac1{\tau^2}}{\frac1{\sigma_j^2}+\frac1{\tau^2}}\right)^2\hat\sigma^2(\tau)
> $$
> (Gelman et al. 2014 Sec. 5.5). The mean is a precision-weighted average of the study's own estimate and the common mean; as $\tau\to0$ it tends to $\hat\mu$, as $\tau\to\infty$ to $y_j$. The variance has two parts: posterior uncertainty about $\theta_j$ given $\mu$, plus propagated uncertainty about $\mu$. Marginal posteriors integrate over $\tau$.
^thm-shrinkage

> [!definition] Credible intervals (Sec. 2.9)
> A central interval uses the $\alpha/2$ and $1-\alpha/2$ quantiles. If the posterior is skewed or runs to the parameter-space boundary (as for $\tau$), the **highest posterior density (HPD) region**, enclosing $1-\alpha$ probability where the density is highest, or the **shortest interval** (identical for unimodal distributions) is more sensible. `bayesmeta` reports shortest intervals by default; `interval.type="central"` is cheaper to compute.
^def-credible-intervals

Implementation notes (App. A.4): the three mixtures (effect posterior, shrinkage posteriors, prediction) are approximated by finite normal mixtures; the grid in $\tau$ is chosen using the maximum symmetrised divergence across the effect posterior and all $k$ shrinkage distributions, so one grid serves all.

## Examples

> [!example] Shrinkage in the transplant data
> For Heffron 2003 ($y_1=-2.31$, $\sigma_1=0.60$) the posterior (half-normal(0.5) on $\tau$, $N(0,4^2)$ on $\mu$) has median $-1.74$, mean $-1.78$, sd 0.42 and 95% interval $[-2.66,-0.99]$ (shortest), versus the raw interval $-2.31\pm1.96\times0.60=[-3.48,-1.13]$: the estimate is pulled toward the pooled $-1.57$ and the interval narrows. For Gibelli 2004 ($y=-0.46$) the shift is larger: median $-1.28$. The prediction interval for a new study is $[-2.77,-0.41]$ versus the effect interval $[-2.23,-0.93]$, wider by exactly the $\tau^2$ term. Python reproduction (grid) gives median $-1.742$ for study 1 and prediction central interval $[-2.75,-0.40]$ (central versus shortest explains the small difference).
^ex-shrinkage-transplant

```python
import numpy as np
from scipy import stats
def shrink_moments(tau, y, sigma, j, mu_hat, sd_hat):
    prec = 1/sigma[j]**2 + 1/tau**2
    mean = (y[j]/sigma[j]**2 + mu_hat/tau**2)/prec
    var = 1/prec + (1/tau**2/prec)**2 * sd_hat**2
    return mean, np.sqrt(var)
def predict_moments(mu_hat, sd_hat, tau):
    return mu_hat, np.sqrt(sd_hat**2 + tau**2)
```

## Connections

- Marketing measurement: $\theta_{k+1}\mid y$ is the prior for the incrementality of the next campaign or market; $\theta_j\mid y$ shrinks a noisy, small-market test toward the portfolio mean, the same logic as hierarchical channel effects in a Bayesian MMM ([[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]]).
- Frequentist analogues: BLUPs and the credibility interval in [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] (those condition on $\hat\tau$).

## See Also

- [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
