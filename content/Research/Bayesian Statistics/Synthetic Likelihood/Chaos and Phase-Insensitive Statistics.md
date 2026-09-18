---
title: "Chaos and Phase-Insensitive Statistics"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - type/concept
  - doc/paper
source: "[[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]]"
source_location: "Fig. 1, 'Defining fit', pp. 2-3"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Synthetic Likelihood"
doc_type: paper
depends_on:
  - "[[Synthetic Likelihood - Overview]]"
used_by:
  - "[[Synthetic Likelihood Construction]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - Ricker map
  - phase-insensitive statistics
  - chaos likelihood collapse
  - why conventional likelihood fails for chaos
---

# Chaos and Phase-Insensitive Statistics

> [!summary]
> Why conventional likelihood-based inference collapses for chaotic dynamic models, and how to fix it. Because trajectories are hypersensitive to the noise realization and parameters, the joint density $f_\theta(\mathbf{y},\mathbf{e})$ of data and process noise is a wildly irregular, multimodal function of both $\mathbf{e}$ and $\boldsymbol\theta$ — useless for measuring fit and intractable to integrate or sample. The resolution is **philosophical**: the *local phase* of the data is a purely noise-driven, non-repeatable feature that should not enter any model–data comparison. So one judges fit using **phase-insensitive summary statistics** that capture the dynamically-important structure (autocovariances, autoregression coefficients) while discarding local phase.

## Overview

This note develops the obstacle that motivates the [[Synthetic Likelihood - Overview|synthetic likelihood]] and the design principle behind its summary statistics. The prototypical example is the scaled Ricker map, which shows the collapse of standard methods under chaotic dynamics.

## Main Content

> [!definition] The scaled Ricker map (Wood 2010, Eq. 1)
> The prototypic ecological model with complex dynamics describes a population $N_t$ by
> $$
> N_{t+1} = r\,N_t\,e^{-N_t + e_t},
> $$
> where $e_t \sim N(0, \sigma_e^2)$ are independent **process-noise** terms and $r$ is the intrinsic growth-rate parameter controlling the dynamics. Observations are Poisson deviates $y_t$ with mean $\phi N_t$ (a common sampling situation). The inference target is $\boldsymbol\theta^\top = (r, \sigma_e^2, \phi)$. For $\log r = 3.8$ the dynamics are chaotic.
> ^def-ricker

### The likelihood collapse

To do likelihood-based inference one must integrate the joint density $f_\theta(\mathbf{y}, \mathbf{e})$ over all process-noise vectors $\mathbf{e}$. But (Wood 2010, Fig. 1b–c):

- **As a function of the noise $\mathbf{e}$:** holding $\mathbf{y}$ and $\boldsymbol\theta$ fixed and varying a *single* noise deviate $e_1$, $\log f_\theta(\mathbf{y},\mathbf{e})$ is extraordinarily jagged and multimodal — so the integral over $\mathbf{e}$ is **analytically and numerically intractable**.
- **As a function of $\boldsymbol\theta$:** varying $r$ with $\mathbf{e}, \mathbf{y}$ fixed makes $\log f_\theta$ equally irregular.

Bayesian inference fares no better: sampling $(\mathbf{e}, \boldsymbol\theta)$ from a density proportional to such an irregular $f_\theta$ has no workable method. Since this joint density underlies *all* conventional fit measures, the chaotic regime defeats them.

> [!example] Why local phase must be discarded (Wood 2010, "Defining fit")
> Naive inference tries to make the model reproduce the *exact course* of the observed data — something the real system itself would not do if repeated. The dynamic processes driving the system are a **repeatable** feature about which inference is legitimate, but the **local phase** of the data is an entirely noise-driven feature that should contribute *nothing* to a measure of match or mismatch. To be scientifically meaningful, statistical fit must be judged on quantities that reflect what is *dynamically important*, discarding local phase. (The idea of phase-insensitive comparison is not itself new; what is new is assessing the consistency of model-simulation and data statistics in a way that gives access to likelihood-based inference.)
> ^ex-local-phase

### Designing the summary statistics

The first analysis step reduces the raw data $\mathbf{y}$ to a vector of summary statistics $\mathbf{s}$ designed to capture the **dynamic structure** of the model — specifying *what* matters about the dynamics, but not *how much* it matters. Suitable examples:

- coefficients of the **autocovariance function**;
- coefficients of **polynomial autoregressive models** of the dynamics;
- coefficients from **polynomial regression of the observed order statistics on fixed reference quantiles** (to summarize the marginal distribution).

Using regression coefficients as statistics promotes **approximate normality** of $\mathbf{s}$, which supports the key multivariate-normal approximation $\mathbf{s} \sim N(\boldsymbol\mu_\theta, \boldsymbol\Sigma_\theta)$ used in the [[Synthetic Likelihood Construction]]. There is complete freedom to transform statistics to improve this approximation, and the method is robust to including uninformative statistics, so careful selection is not essential.

## Connections

- The obstacle motivates the [[Synthetic Likelihood Construction]], which replaces the intractable $f_\theta$ with a smooth MVN likelihood of $\mathbf{s}$.
- Phase-insensitive summary statistics are the same device used in [[Approximate Bayesian Computation for ABMs|ABC]] and in [[Indirect Inference]] / [[Method of Simulated Moments]] (where an auxiliary model's coefficients or moments serve as the statistics).
- Chaotic sensitivity to initial conditions is the hallmark of the dynamical systems studied; the scaled Ricker map recurs in ecology much as the [[Brock-Mirman Model - SMM Estimation Exercise|Brock–Mirman map]] does in economics.

## See Also

- [[Synthetic Likelihood - Overview]] — where this obstacle fits in the method
- [[Synthetic Likelihood Construction]] — the synthetic likelihood built on these statistics
- [[Nicholson's Blowfly Application]] — the specific statistics used in practice
