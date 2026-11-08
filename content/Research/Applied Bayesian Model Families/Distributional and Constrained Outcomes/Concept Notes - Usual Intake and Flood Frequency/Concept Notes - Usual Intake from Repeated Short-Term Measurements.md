---
title: "Concept Notes - Usual Intake from Repeated Short-Term Measurements"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "concept note, no raw source"
source_location: "Concept note citing Nusser et al. 1996 (ISU), Tooze et al. 2006 (NCI method), Dodd et al. 2006; figures from memory of standard literature, verify before use"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Concept Notes - Usual Intake and Flood Frequency"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
used_by:
  - "[[Stasinopoulos 2007 - GAMLSS in R - Overview]]"
aliases:
  - usual intake distribution
  - NCI method
  - ISU method
  - measurement error deconvolution
  - 24-hour recall usual intake
---

# Concept Notes - Usual Intake from Repeated Short-Term Measurements

> [!summary]
> **Concept note, no raw source.** One 24-hour recall mixes a person's long-run *usual* intake with day-to-day within-person noise, so the distribution of one-day intakes is far too wide for estimating the share above or below a recommended level. Repeated recalls on a subset let you separate the two variance components and estimate the distribution of the latent usual intake (ISU method, Nusser et al. 1996; NCI method, Tooze et al. 2006). This is hierarchical deconvolution on a Box-Cox scale.

## Overview

Motivating PyMC example **E108**: "One day is not your diet: usual salt intake from two 24-hour recalls" (NHANES 2017-2018: 4,863 adults, 9,102 recall days) at <https://redam94.github.io/pymc-challenges/examples.html>. The example list gives: usual intake as a latent quantity, replicate-measurement deconvolution (ISU/NCI), Box-Cox scale and Gauss-Hermite back-transform, a funnel and a mixed centred/non-centred fix, prior swap, one-day and two-day predictive checks.

## Main Content

> [!definition] Two-component measurement model on the transformed scale
> For person $i$ and recall day $j=1..J_i$: $T(y_{ij})=u_i+e_{ij}$, with $T$ a Box-Cox (or other normalising) transformation, $u_i\sim N(\mathbf x_i^\top\boldsymbol\beta,\sigma_u^2)$ the person's usual intake on the transformed scale, $e_{ij}\sim N(0,\sigma_e^2)$ within-person day-to-day error, independent. Observed variance of one-day values on the transformed scale $=\sigma_u^2+\sigma_e^2$; of the person's $J$-day mean: $\sigma_u^2+\sigma_e^2/J$.
^def-usual-intake

> [!definition] Usual intake on the original scale
> $\text{usual}_i=E[T^{-1}(u_i+e)\mid u_i]=\int T^{-1}(u_i+\sigma_e z)\varphi(z)\,dz\approx\sum_{k=1}^{K}w_k\,T^{-1}(u_i+\sqrt2\sigma_e\xi_k)/\sqrt\pi$ - a **Gauss-Hermite** back-transformation (nodes $\xi_k$, weights $w_k$). A naive $T^{-1}(u_i)$ gives the median, not the mean, intake. The distribution of $\text{usual}_i$ across the population (and the share above a cut-off) is the quantity of interest, computed by integrating over $u_i$ (draw $u_i\sim N(\mathbf x^\top\beta,\sigma_u^2)$).
^def-back-transform

**Methods.** ISU (Nusser et al. 1996): transform to approximate normality, estimate variance components from replicates, then transform back via a flexible semi-parametric step, giving the usual-intake distribution (and handling the skew via a power transformation before normalisation). NCI method (Tooze et al. 2006): two-part model for episodically consumed foods (probability of consumption x amount) with correlated random effects; for ubiquitously consumed nutrients such as sodium a one-part version. Covariates (sex, age, weekend/weekday, season, recall order) enter both the mean and the day effect.

**Why not just average two days?** The mean of two days still has variance $\sigma_u^2+\sigma_e^2/2$; the share above a threshold is overestimated at the top tail and underestimated in the middle. Bayesian shrinkage towards the group mean gives the best estimate of an individual's $u_i$ ([[Hierarchical Models]]).

**Sampling issues (E108).** Hierarchical funnel in $u_i$ with small $\sigma_u$: use non-centred for people with 1 recall and centred where there are 2+ (mixed parameterisation, as in E108); sensitivity to the prior on $\sigma_e$ (replicates identify it; one-recall-only designs do not); transformation parameter $\lambda$ could be fixed from a pilot or estimated.

## Examples

> [!example] PyMC 5 sketch (untested)
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt
> # y: positive intakes per recall, person: index 0..N-1, X: person-level covariates, lam: Box-Cox power (fixed)
> z = (y**lam - 1) / lam
> with pm.Model() as usual_intake:
>     beta = pm.Normal("beta", 0, 2, shape=X.shape[1])
>     s_u = pm.HalfNormal("s_u", 1.0); s_e = pm.HalfNormal("s_e", 1.0)
>     u_raw = pm.Normal("u_raw", 0, 1, shape=X.shape[0])
>     u = pm.Deterministic("u", pt.dot(X, beta) + s_u * u_raw)          # non-centred
>     pm.Normal("z", mu=u[person], sigma=s_e, observed=z)
>     idata = pm.sample(1000, tune=1000, target_accept=0.9)
>
> # usual intake on original scale: Gauss-Hermite (K nodes) per posterior draw
> xi, w = np.polynomial.hermite.hermgauss(9)
> def usual_orig(u_draw, s_e_draw, lam):
>     arg = u_draw[..., None] + np.sqrt(2) * s_e_draw * xi
>     return (np.clip(lam*arg + 1, 1e-8, None) ** (1/lam) * w).sum(-1) / np.sqrt(np.pi)
> ```
^ex-usual-intake-pymc

**Checks.** One-day and two-day predictive checks: simulate $T^{-1}(u_i+e_{ij})$ for one and for the average of two recalls and compare with the observed distributions; both must match (one-day: wide; two-day mean: narrower). A model that matches only one is mis-specified in $\sigma_e$ or transformation.

## Relevance to marketing measurement

The same structure appears in panel data with noisy weekly exposure/ad-recall measures: a person's usual exposure is latent and a single-wave survey overstates dispersion; deconvolution matters when you condition on or threshold a noisy survey measure (reach-and-frequency, brand-tracking).

## Connections

[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]] (Box-Cox power transforms and back-transformation), [[Hierarchical Models]], [[Prior Predictive Checking]].

## See Also

[[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]]
