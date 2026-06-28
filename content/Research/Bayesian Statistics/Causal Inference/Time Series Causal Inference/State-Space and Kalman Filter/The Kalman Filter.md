---
title: "The Kalman Filter"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - type/theorem
  - doc/textbook
source: "[[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]]"
source_location: "§4.2-4.3, Thm 4.1-4.2; pp. 54-61"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter"
doc_type: textbook
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[The RTS Smoother]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
aliases:
  - Kalman filter
  - predict-update recursion
  - Kalman gain
  - innovation
  - filtering distribution
---

# The Kalman Filter

> [!summary]
> The **Kalman filter** is the closed-form solution to the Bayesian filtering equations for a [[Linear-Gaussian State-Space Models|linear-Gaussian state-space model]]. Every distribution stays Gaussian, so the filter propagates only a **mean** $\mathbf{m}_k$ and **covariance** $\mathbf{P}_k$ through a two-step recursion: a **prediction step** that pushes the state forward through the dynamics, and an **update step** that corrects it with the new measurement via the **Kalman gain** $\mathbf{K}_k$ and the **innovation** $\mathbf{v}_k$. It runs at constant cost per time step and is the forward pass feeding both [[The RTS Smoother]] and the [[Marginal Likelihood via the Kalman Filter|marginal likelihood]].

## Overview

Bayesian filtering computes the **filtering distribution** $p(\mathbf{x}_k \mid \mathbf{y}_{1:k})$ — the posterior of the current state given all measurements *up to now*. The general recursion (Särkkä Thm. 4.1) alternates a Chapman–Kolmogorov **prediction** and a Bayes-rule **update**. For linear-Gaussian models these reduce to matrix algebra on $(\mathbf{m}_k,\mathbf{P}_k)$.

## Main Content

> [!theorem] Theorem: Bayesian filtering equations (Särkkä Thm. 4.1)
> Starting from the prior $p(\mathbf{x}_0)$, the predicted and filtering distributions obey, for $k=1,2,\dots$:
> - **Prediction step** (Chapman–Kolmogorov equation):
>   $$
>   p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1}) = \int p(\mathbf{x}_k \mid \mathbf{x}_{k-1})\, p(\mathbf{x}_{k-1} \mid \mathbf{y}_{1:k-1})\, \mathrm{d}\mathbf{x}_{k-1}. \tag{4.11}
>   $$
> - **Update step** (Bayes' rule):
>   $$
>   p(\mathbf{x}_k \mid \mathbf{y}_{1:k}) = \frac{1}{Z_k}\, p(\mathbf{y}_k \mid \mathbf{x}_k)\, p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1}), \tag{4.12}
>   $$
>   $$
>   Z_k = \int p(\mathbf{y}_k \mid \mathbf{x}_k)\, p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1})\, \mathrm{d}\mathbf{x}_k. \tag{4.13}
>   $$
> The normalizer $Z_k = p(\mathbf{y}_k \mid \mathbf{y}_{1:k-1})$ is the one-step predictive density of the data — the building block of the [[Marginal Likelihood via the Kalman Filter|marginal likelihood]].
^thm-bayes-filter

> [!theorem] Theorem: Kalman filter (Särkkä Thm. 4.2)
> For the linear-Gaussian model $\mathbf{x}_k=\mathbf{A}_{k-1}\mathbf{x}_{k-1}+\mathbf{q}_{k-1}$, $\mathbf{y}_k=\mathbf{H}_k\mathbf{x}_k+\mathbf{r}_k$, the filtering distributions are Gaussian,
> $$
> p(\mathbf{x}_k \mid \mathbf{y}_{1:k-1}) = \mathcal{N}(\mathbf{x}_k \mid \mathbf{m}_k^-, \mathbf{P}_k^-), \quad p(\mathbf{x}_k \mid \mathbf{y}_{1:k}) = \mathcal{N}(\mathbf{x}_k \mid \mathbf{m}_k, \mathbf{P}_k), \quad p(\mathbf{y}_k \mid \mathbf{y}_{1:k-1}) = \mathcal{N}(\mathbf{y}_k \mid \mathbf{H}_k\mathbf{m}_k^-, \mathbf{S}_k), \tag{4.19}
> $$
> computed by the following recursion, started from $\mathbf{m}_0,\mathbf{P}_0$.
>
> **Prediction step:**
> $$
> \mathbf{m}_k^- = \mathbf{A}_{k-1}\,\mathbf{m}_{k-1}
> $$
> $$
> \mathbf{P}_k^- = \mathbf{A}_{k-1}\,\mathbf{P}_{k-1}\,\mathbf{A}_{k-1}^{\mathsf T} + \mathbf{Q}_{k-1} \tag{4.20}
> $$
>
> **Update step:**
> $$
> \mathbf{v}_k = \mathbf{y}_k - \mathbf{H}_k\,\mathbf{m}_k^- \qquad \text{(innovation / measurement residual)}
> $$
> $$
> \mathbf{S}_k = \mathbf{H}_k\,\mathbf{P}_k^-\,\mathbf{H}_k^{\mathsf T} + \mathbf{R}_k \qquad \text{(innovation covariance)}
> $$
> $$
> \mathbf{K}_k = \mathbf{P}_k^-\,\mathbf{H}_k^{\mathsf T}\,\mathbf{S}_k^{-1} \qquad \text{(Kalman gain)}
> $$
> $$
> \mathbf{m}_k = \mathbf{m}_k^- + \mathbf{K}_k\,\mathbf{v}_k
> $$
> $$
> \mathbf{P}_k = \mathbf{P}_k^- - \mathbf{K}_k\,\mathbf{S}_k\,\mathbf{K}_k^{\mathsf T} \tag{4.21}
> $$
^thm-kalman

> [!note] Reading the equations
> - $\mathbf{m}_k^-,\mathbf{P}_k^-$ are the **predicted** ("prior") mean and covariance *before* seeing $\mathbf{y}_k$; the superscript $-$ marks "one step ahead, no current measurement." $\mathbf{m}_k,\mathbf{P}_k$ are the **updated** ("posterior") quantities *after* $\mathbf{y}_k$.
> - The **innovation** $\mathbf{v}_k=\mathbf{y}_k-\mathbf{H}_k\mathbf{m}_k^-$ is what the measurement tells you beyond the prediction; $\mathbf{S}_k$ is its covariance.
> - The **Kalman gain** $\mathbf{K}_k$ is the optimal weight on the innovation: large when the prediction is uncertain ($\mathbf{P}_k^-$ large) or the measurement is precise ($\mathbf{R}_k$ small), small otherwise.
> - The update *always reduces* covariance: $\mathbf{P}_k = \mathbf{P}_k^- - \mathbf{K}_k\mathbf{S}_k\mathbf{K}_k^{\mathsf T} \preceq \mathbf{P}_k^-$. An equivalent "information" form is $\mathbf{P}_k=(\,(\mathbf{P}_k^-)^{-1}+\mathbf{H}_k^{\mathsf T}\mathbf{R}_k^{-1}\mathbf{H}_k\,)^{-1}$.
> - **Derivation** (Särkkä §4.3): apply the Gaussian joint/conditioning lemmas (Lemmas A.1–A.2) to $p(\mathbf{x}_{k-1},\mathbf{x}_k\mid\mathbf{y}_{1:k-1})$ for the prediction and to $p(\mathbf{x}_k,\mathbf{y}_k\mid\mathbf{y}_{1:k-1})$ for the update.
^reading

> [!note] Algorithm (per time step)
> ```text
> given m_{k-1}, P_{k-1}:
>   # predict
>   m⁻ = A m_{k-1}
>   P⁻ = A P_{k-1} Aᵀ + Q
>   # update with y_k
>   v  = y_k − H m⁻
>   S  = H P⁻ Hᵀ + R
>   K  = P⁻ Hᵀ S⁻¹
>   m_k = m⁻ + K v
>   P_k = P⁻ − K S Kᵀ
> ```
> Cost is constant per step (a few $n\times n$ / $m\times m$ products and one $m\times m$ inverse) — the key practical advantage of the recursive form over batch Bayes.
^algorithm

## Examples

> [!example] Kalman filter for the Gaussian random walk (Särkkä Ex. 4.2)
> For the local-level model ($A=1$, $H=1$, scalar $Q,R$) the recursion collapses to scalars:
> $$
> m_k^- = m_{k-1}, \qquad P_k^- = P_{k-1} + Q,
> $$
> $$
> m_k = m_k^- + \frac{P_k^-}{P_k^- + R}\,(y_k - m_k^-), \qquad P_k = P_k^- - \frac{(P_k^-)^2}{P_k^- + R}. \tag{4.31}
> $$
> The scalar gain $K_k = P_k^- / (P_k^- + R)$ interpolates between trusting the prediction ($R$ large $\Rightarrow K\to 0$) and trusting the measurement ($R$ small $\Rightarrow K\to 1$). This same filter is smoothed in [[The RTS Smoother]].

> [!example] Kalman filter for car tracking (Särkkä Ex. 4.3)
> Running the 4-D constant-velocity model (see [[Linear-Gaussian State-Space Models]]) on noisy position measurements recovers the full position+velocity trajectory. In Särkkä's simulation the position RMSE drops from $0.77$ (raw measurements) to $0.43$ (filter estimate) — the filter exploits the dynamics to denoise. The [[The RTS Smoother|RTS smoother]] lowers it further to $0.27$.

## Connections

- [[Linear-Gaussian State-Space Models]] — the model being filtered; defines $\mathbf{A},\mathbf{H},\mathbf{Q},\mathbf{R}$
- [[The RTS Smoother]] — backward pass that reuses $\mathbf{m}_k,\mathbf{P}_k,\mathbf{m}_{k+1}^-,\mathbf{P}_{k+1}^-$ from this filter
- [[Marginal Likelihood via the Kalman Filter]] — the innovations $\mathbf{v}_k$ and covariances $\mathbf{S}_k$ produced here factor the likelihood
- [[State-Space Models and the Kalman Filter - Overview]] — pipeline context

## See Also

- [[Bayesian Structural Time-Series Model]] — BSTS inference runs this filter (and its simulation-smoother variant) internally
- [[MCMC Inference for CausalImpact]] — Durbin–Koopman simulation smoother builds on Kalman filtering
- [[Local Linear Trend and Seasonality]] — the state components the filter tracks in practice
