---
title: "Synthetic Likelihood - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - type/overview
  - doc/paper
source: "[[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]]"
source_location: "Abstract & Introduction, pp. 1-2 (Nature 466:1102-1104)"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Synthetic Likelihood"
doc_type: paper
depends_on:
  - "[[Chaos and Phase-Insensitive Statistics]]"
  - "[[Synthetic Likelihood Construction]]"
used_by:
  - "[[Nicholson's Blowfly Application]]"
aliases:
  - synthetic likelihood
  - Wood 2010
  - synthetic likelihood overview
---

# Synthetic Likelihood - Overview

> [!summary]
> Wood (2010) introduces the **synthetic likelihood**: a simulation-based, likelihood-free method for fitting and comparing **noisy nonlinear dynamic models** in the chaotic and near-chaotic regimes, where conventional likelihood collapses. The raw data are reduced to **phase-insensitive summary statistics** $\mathbf{s}$ capturing dynamic structure; the model is simulated to estimate the mean $\boldsymbol\mu_\theta$ and covariance $\boldsymbol\Sigma_\theta$ of these statistics, and a **multivariate-normal "synthetic likelihood"** $\mathbf{s}\sim N(\boldsymbol\mu_\theta,\boldsymbol\Sigma_\theta)$ measures model fit. This likelihood is far smoother in $\theta$ than the true density and can be explored by MCMC, giving access to standard likelihood machinery (MLE, AIC, GLRT). Applied to Nicholson's classic blowfly experiments, it establishes that the fluctuations are **intrinsically-driven limit cycles perturbed by noise**, not noise-driven.

## Overview

Chaotic ecological dynamic systems defy conventional statistical analysis; near-chaotic systems are little better. Such systems are driven by endogenous dynamics plus process noise and observed with error. Their **sensitivity to history** means a minute change in the noise realization or the parameters drastically changes the trajectory — a sensitivity inherited and amplified by the joint density of the data and process noise, rendering it useless as a basis for measures of statistical fit. Because that joint density underlies essentially all conventional fit measures, this is a fundamental obstacle: dynamic theory was left without quantitative validation tools in the chaotic regime.

This note is the entry point to Wood's solution; the obstacle, the method, and the empirical demonstration are developed in the linked notes.

## Main Content

### Research question

How can we make **well-founded statistical inferences** (parameter estimates, confidence intervals, model comparison) about biological dynamic models whose plausibly-parameterized dynamics are **chaotic or near-chaotic** — using only the ability to *simulate* data from the model?

### The method in one line

Reduce data to phase-insensitive statistics $\mathbf{s}$; estimate, by simulation, the mean and covariance of $\mathbf{s}$ under the model; score fit with the multivariate-normal **synthetic likelihood**
$$
l_s(\boldsymbol\theta) = -\tfrac{1}{2}(\mathbf{s} - \hat{\boldsymbol\mu}_\theta)^\top \hat{\boldsymbol\Sigma}_\theta^{-1}(\mathbf{s} - \hat{\boldsymbol\mu}_\theta) - \tfrac{1}{2}\log|\hat{\boldsymbol\Sigma}_\theta|,
$$
and explore it by MCMC. See [[Synthetic Likelihood Construction]].

### Why it works (and what it requires)

1. **Phase-insensitivity.** The *local phase* of the data is a purely noise-driven feature that should not contribute to model–data match. Judging fit on statistics that reflect what is *dynamically* important (autocovariances, regression coefficients of the dynamics) while discarding local phase is what makes inference scientifically meaningful in the chaotic regime. See [[Chaos and Phase-Insensitive Statistics]].
2. **Smoothness.** $l_s(\boldsymbol\theta)$ is a *much* smoother function of $\boldsymbol\theta$ than the true density $f_\theta$, so it can actually be optimized/sampled.
3. **Only simulation needed.** The method requires solely the ability to simulate the observed data from the model — it handles hidden states, complicated observation processes, missing data, and multiple series.
4. **Likelihood-like behaviour.** $l_s$ is invariant to reparameterization, robust to including uninformative statistics, and behaves like a conventional likelihood as the number of simulation replicates $N_r \to \infty$.

### Key contribution and result

The first **general-purpose** method for well-founded statistical inference about noisy dynamic models in the chaotic / near-chaotic regime. Applied to **Nicholson's blowfly experiments** (see [[Nicholson's Blowfly Application]]), it shows the stochastic Nisbet–Gurney model fits quantitatively (good $\chi^2$ fit, $\Delta$AIC $> 1800$ over a demographic-stochasticity-only model) and that the population fluctuations are **intrinsically-driven limit cycles perturbed by noise** — not stochastically-forced quasi-cycles.

### Note map

| Section | Content | Note |
|---------|---------|------|
| Intro, Fig. 1 | Chaos obstacle, Ricker map, phase-insensitive statistics | [[Chaos and Phase-Insensitive Statistics]] |
| "Defining fit", Fig. 2, Methods | Synthetic likelihood construction, MCMC, diagnostics | [[Synthetic Likelihood Construction]] |
| Figs. 3-4 | Nicholson's blowfly application & conclusion | [[Nicholson's Blowfly Application]] |

## Connections

- A **likelihood-free / simulation-based inference** method — closely related to [[Approximate Bayesian Computation for ABMs|Approximate Bayesian Computation (ABC)]] (both match simulated and observed *summary statistics*) and to summary-statistic matching in [[Method of Simulated Moments]] / [[Indirect Inference]] / [[Simulated Moments Estimation - Overview|the SME]].
- Differs from ABC by building an explicit *parametric (MVN) likelihood* of the statistics rather than an acceptance threshold; this gives a smooth surface amenable to standard [[MCMC Basics|MCMC]] and likelihood theory.

## See Also

- [[Chaos and Phase-Insensitive Statistics]] — why conventional likelihood fails
- [[Synthetic Likelihood Construction]] — the estimator and its properties
- [[Nicholson's Blowfly Application]] — the empirical demonstration
- [[Approximate Bayesian Computation for ABMs]] — the closest likelihood-free relative
