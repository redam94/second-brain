---
title: "Pewsey 2021 - Circular Models in PyMC"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]]"
source_location: "Sec. 3.1, 4, 6.2 (Bayesian translation is a concept note, not in the paper)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Pewsey 2021 - Recent Advances in Directional Statistics"
doc_type: paper
depends_on:
  - "[[Pewsey 2021 - Circular Distributions and Constructions]]"
  - "[[Pewsey 2021 - Circular Regression and Serial Dependence]]"
  - "[[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]]"
used_by:
  - "[[Pewsey 2021 - Directional Statistics - Overview]]"
aliases:
  - von Mises PyMC
  - circular regression PyMC
  - projected normal PyMC
  - wrapped normal PyMC
---

# Pewsey 2021 - Circular Models in PyMC

> [!summary]
> Practical Bayesian circular modelling: the von Mises likelihood with a harmonic mean, the projected normal via two latent Gaussians, and the pitfalls that E81 documents — wrapped priors on the mean direction create multimodal posteriors, and tan-half links break step-size adaptation. Concept note; code is **untested**.

## Overview

Pewsey and García-Portugués emphasise that link-based circular regression (tan-half) is hard to fit and that projected-normal and Bayesian priors help (Sec. 6.2.2). This note turns those points into PyMC patterns for times of day, seasons and wind direction.

## Main Content

> [!definition] Mean resultant vector
> For angles $\theta_i$: $\bar C=\frac1n\sum\cos\theta_i$, $\bar S=\frac1n\sum\sin\theta_i$, $\bar\theta=\operatorname{atan2}(\bar S,\bar C)$, $\bar R=\sqrt{\bar C^2+\bar S^2}\in[0,1]$. $\bar R=0$ uniform-like; $\bar R=1$ all identical. The circular variance is $1-\bar R$.
^def-resultant

**Pattern 1 — von Mises with harmonic mean (canonical link).** Instead of a tan-half link, regress on the *vector* mean: the vM kernel $\kappa\cos(\theta-\mu)=\kappa\cos\mu\cos\theta+\kappa\sin\mu\sin\theta$ is linear in $(\kappa\cos\mu,\kappa\sin\mu)$ — the natural (canonical) parameters. Let $\eta_{1}(x)=\mathbf x^\top\boldsymbol\beta_c$, $\eta_2(x)=\mathbf x^\top\boldsymbol\beta_s$; then $\mu=\operatorname{atan2}(\eta_2,\eta_1)$ and $\kappa=\sqrt{\eta_1^2+\eta_2^2}$ (E81 "natural-parameter link"). This avoids the wrapped-prior problem because the prior lives on $\mathbb R^2$.

> [!example] PyMC 5 sketch (untested)
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt
> # theta: angles in (-pi, pi]; t: hour (0-24); build harmonic design
> w = 2*np.pi*t/24
> H = np.column_stack([np.cos(w), np.sin(w), np.cos(2*w), np.sin(2*w)])   # (n, 4)
>
> with pm.Model() as vm_harmonic:
>     bc = pm.Normal("bc", 0, 1, shape=1+H.shape[1])      # cos-component coefficients
>     bs = pm.Normal("bs", 0, 1, shape=1+H.shape[1])      # sin-component coefficients
>     X = pt.concatenate([pt.ones((len(t), 1)), H], axis=1)
>     e1, e2 = pt.dot(X, bc), pt.dot(X, bs)
>     mu = pt.arctan2(e2, e1)
>     kappa = pt.sqrt(e1**2 + e2**2 + 1e-6)
>     pm.VonMises("obs", mu=mu, kappa=kappa, observed=theta)
>     idata = pm.sample(1000, tune=1000, target_accept=0.9)
>
> # Projected-normal regression: pseudo-code (not runnable as written)
> # B ~ Normal(0, 1, shape=(p, 2)); latent W_i ~ Normal(X_i B, I_2)
> # theta_i = atan2(W_i2, W_i1)  -> sample W with an auxiliary radius r_i ~ density given theta_i
> # or write the marginal angular density with pm.CustomDist (Presnell et al. 1998 form)
> ```
> The second block is a *scaffold*: implement the projected-normal log-density with `pm.CustomDist` (Presnell et al. 1998 density for $\Theta=\operatorname{Arg}(W_1+iW_2)$ with $\boldsymbol\Sigma=\mathbf I$), or sample the unobserved radius $r_i$ as an auxiliary latent variable.
^ex-pymc-vm

**Pattern 2 — wrapped priors fail.** A prior $\mu\sim\text{VonMises}(0,\kappa_0)$ or a wrapped-normal prior on a mean direction is multimodal when the data are weak, and HMC step sizes adapted in one mode fail in another ("wrapped-prior and step-mode failures with zero divergences" in E81): zero divergences do not certify the posterior. Use the 2-D parameterisation above, or sample $(\cos\mu,\sin\mu)$ with a unit-circle constraint via `pm.Normal(..., shape=2)` and normalisation.

**Pattern 3 — hours and seasons.** Convert the clock/season to angle $w=2\pi t/P$ and use harmonics; compare number of harmonics $M$ by LOO. For a null (Oklahoma quakes in E81) the posterior harmonic amplitudes should concentrate near 0 and the Rayleigh test ([[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]]) should agree.

**Pattern 4 — periodic GP.** For smooth irregular seasonal profiles use a periodic kernel `pm.gp.cov.Periodic` or a Hilbert-space approximation ([[Hilbert Space Gaussian Processes]]).

## Examples

> [!example] Posterior predictive check on the circle
> Plot the observed rose histogram against posterior predictive draws $\theta^{rep}$ on the same polar axes; and check calibration of $\bar R$: compare observed $\bar R$ with the posterior predictive distribution of $\bar R$. See [[Posterior Predictive Checking]].
^ex-ppc-circle

## Relevance to marketing measurement

Hour-of-day/day-of-week conversion patterns, seasonal campaign lifts and call-centre arrival times; harmonic predictors are the same Fourier basis used for seasonality in MMMs.

## Connections

[[Generalized Linear Models]], [[Local Linear Trend and Seasonality]], [[Prior Predictive Checking]].

## See Also

[[Pewsey 2021 - Directional Statistics - Overview]]
