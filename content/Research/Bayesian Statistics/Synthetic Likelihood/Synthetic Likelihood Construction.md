---
title: "Synthetic Likelihood Construction"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - type/theorem
  - doc/paper
  - method/mcmc
source: "[[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]]"
source_location: "Fig. 2, 'Evaluating the synthetic likelihood', Methods summary, pp. 3-4, 7-8"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Synthetic Likelihood"
doc_type: paper
depends_on:
  - "[[Chaos and Phase-Insensitive Statistics]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Nicholson's Blowfly Application]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - synthetic likelihood estimator
  - log synthetic likelihood
  - l_s
  - MVN synthetic likelihood
---

# Synthetic Likelihood Construction

> [!summary]
> The core estimator. Given summary statistics $\mathbf{s}$ of the data, assume $\mathbf{s} \sim N(\boldsymbol\mu_\theta, \boldsymbol\Sigma_\theta)$. For any $\boldsymbol\theta$, simulate $N_r$ replicate data sets, convert each to a statistics vector, and estimate $\hat{\boldsymbol\mu}_\theta$ and $\hat{\boldsymbol\Sigma}_\theta$. The **log synthetic likelihood** $l_s(\boldsymbol\theta)$ is then the MVN log-density of the observed $\mathbf{s}$ under those estimates. $l_s$ is much smoother in $\boldsymbol\theta$ than the true density, invariant to reparameterization, robust to uninformative statistics, and behaves like a genuine likelihood as $N_r \to \infty$ — so it is explored by Metropolis–Hastings MCMC, with MLE recovered by quadratic regression and model comparison via AIC/GLRT.

## Overview

This note states the synthetic-likelihood algorithm and its statistical properties — the machinery that turns the [[Chaos and Phase-Insensitive Statistics|phase-insensitive statistics]] into well-founded inference. It is the computational heart of [[Synthetic Likelihood - Overview|Wood (2010)]].

## Main Content

> [!definition] Multivariate-normal approximation (Wood 2010, Eq. 2)
> The chosen summary statistics are taken to be approximately multivariate normal:
> $$
> \mathbf{s} \sim N(\boldsymbol\mu_\theta, \boldsymbol\Sigma_\theta).
> $$
> The mean $\boldsymbol\mu_\theta$ and covariance $\boldsymbol\Sigma_\theta$ are generally intractable functions of the model parameters $\boldsymbol\theta$, but for any $\boldsymbol\theta$ they can be **estimated by simulation**. Using regression coefficients as statistics promotes the normality that supports this approximation.
> ^def-mvn-approx

> [!theorem] Evaluating the synthetic likelihood (Wood 2010, Fig. 2 & Eq.)
> For a given parameter vector $\boldsymbol\theta$:
> 1. Use the model to simulate $N_r$ replicate data sets $\mathbf{y}_1^{*}, \mathbf{y}_2^{*}, \dots$ and convert each to a statistics vector $\mathbf{s}_1^{*}, \mathbf{s}_2^{*}, \dots$ — **exactly as $\mathbf{y}$ was converted to $\mathbf{s}$**.
> 2. Estimate the mean: $\hat{\boldsymbol\mu}_\theta = \sum_i \mathbf{s}_i^{*} / N_r$.
> 3. Form $\mathbf{S} = (\mathbf{s}_1^{*} - \hat{\boldsymbol\mu}_\theta,\ \mathbf{s}_2^{*} - \hat{\boldsymbol\mu}_\theta,\ \dots)$ and estimate the covariance: $\hat{\boldsymbol\Sigma}_\theta = \mathbf{S}\mathbf{S}^\top / (N_r - 1)$ (a **robust** covariance estimator can be advantageous here).
> 4. Drop irrelevant constants; the **log synthetic likelihood** is
> $$
> l_s(\boldsymbol\theta) = -\tfrac{1}{2}(\mathbf{s} - \hat{\boldsymbol\mu}_\theta)^\top \hat{\boldsymbol\Sigma}_\theta^{-1}(\mathbf{s} - \hat{\boldsymbol\mu}_\theta) - \tfrac{1}{2}\log|\hat{\boldsymbol\Sigma}_\theta|.
> $$
> ^thm-synthetic-likelihood

### Properties

- **Measures fit, but smoothly.** Like any likelihood, $l_s(\boldsymbol\theta)$ measures the consistency of $\boldsymbol\theta$ with the data — but it is a *much smoother* function of $\boldsymbol\theta$ than the true density $f_\theta$, making it optimizable and samplable.
- **Generality.** Handles hidden state variables, complicated observation processes, missing data, and multiple data series.
- **Invariance & robustness.** $l_s$ is invariant to reparameterization and robust to the inclusion of uninformative statistics, so very careful statistic selection is unnecessary; statistics may be freely transformed to improve the normality approximation (Eq. 2).
- **Asymptotic in $N_r$.** $l_s$ behaves like a conventional likelihood in the $N_r \to \infty$ limit, giving access to likelihood-based inference machinery.

### Exploring $l_s$ by MCMC

> [!definition] Metropolis–Hastings exploration (Wood 2010, Methods summary)
> $l_s$ usually displays residual small-scale roughness, so smooth-function optimizers fail; instead use Metropolis–Hastings MCMC. From a parameter guess $\boldsymbol\theta^{[0]}$, iterate for $k = 1, 2, \dots$:
> 1. Propose $\boldsymbol\theta^{*} = \boldsymbol\theta^{[k-1]} + \boldsymbol\delta^{[k]}$, with $\boldsymbol\delta^{[k]}$ from a convenient symmetric distribution.
> 2. Set $\boldsymbol\theta^{[k]} = \boldsymbol\theta^{*}$ with probability $\min\bigl[1,\ \exp\{ l_s(\boldsymbol\theta^{*}) - l_s(\boldsymbol\theta^{[k-1]}) \}\bigr]$; otherwise $\boldsymbol\theta^{[k]} = \boldsymbol\theta^{[k-1]}$.
>
> The chain both locates and quantifies the range of parameter values consistent with the data. (A flat prior makes the acceptance ratio depend only on $l_s$; informative priors enter multiplicatively as usual.)
> ^def-mcmc

### Point estimation, model comparison, and checking

- **MLE via quadratic regression.** Near the maximum-likelihood estimate $\hat{\boldsymbol\theta}$, the $N_r \to \infty$ limit of $l_s$ is estimated by **quadratic regression of the sampled $l_s(\boldsymbol\theta^{[k]})$ values on the $\boldsymbol\theta^{[k]}$** from the converged chain — recovering $\hat{\boldsymbol\theta}$ and the standard likelihood theory for inference.
- **Model comparison.** Alternative models compared by **AIC** or **generalized likelihood-ratio testing**.
- **Model-checking diagnostic.** If the model fits,
$$
(\mathbf{s} - \hat{\boldsymbol\mu}_\theta)^\top \hat{\boldsymbol\Sigma}_\theta^{-1}(\mathbf{s} - \hat{\boldsymbol\mu}_\theta) \sim \chi^2_{\dim(\mathbf{s})}.
$$
^diag-chisq

## Connections

- Built on the [[Chaos and Phase-Insensitive Statistics|phase-insensitive statistics]] that make $\mathbf{s}$ approximately normal.
- The simulate-statistics-then-score loop parallels [[Method of Simulated Moments|MSM]] / [[Indirect Inference]] / [[Simulated Moments Estimation - Overview|the SME]] (match simulated vs. observed summaries) but yields an explicit *parametric likelihood* rather than a quadratic moment criterion.
- Closely related to [[Approximate Bayesian Computation for ABMs|ABC]]: both are likelihood-free and summary-statistic-based, but synthetic likelihood replaces ABC's acceptance threshold with an MVN density, enabling standard [[MCMC Basics|MCMC]] and likelihood theory.

## See Also

- [[Synthetic Likelihood - Overview]] — method summary and contribution
- [[Chaos and Phase-Insensitive Statistics]] — the statistics fed into $l_s$
- [[Nicholson's Blowfly Application]] — $l_s$, MCMC, and the $\chi^2$/AIC diagnostics in action
- [[Model Comparison]] — AIC and likelihood-ratio model selection
