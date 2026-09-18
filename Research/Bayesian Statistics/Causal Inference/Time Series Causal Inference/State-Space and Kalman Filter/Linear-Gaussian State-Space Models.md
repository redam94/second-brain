---
title: "Linear-Gaussian State-Space Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/time-series
  - type/definition
  - doc/textbook
source: "[[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]]"
source_location: "§3.6, §4.1, §4.3; pp. 39-46, 51-56"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter"
doc_type: textbook
depends_on:
  - "[[State-Space Models and the Kalman Filter - Overview]]"
used_by:
  - "[[The Kalman Filter]]"
  - "[[The RTS Smoother]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
aliases:
  - state-space model
  - probabilistic state space model
  - linear Gaussian model
  - observation equation
  - state transition equation
---

# Linear-Gaussian State-Space Models

> [!summary]
> A state-space model pairs a **state transition (dynamic) equation** describing how a hidden Markov state $\mathbf{x}_k$ evolves with an **observation (measurement) equation** describing how each measurement $\mathbf{y}_k$ depends on the current state. In the **linear-Gaussian** case both equations are linear with additive Gaussian noise, so the entire model is specified by the matrices $\mathbf{A}_{k-1}, \mathbf{H}_k$, the noise covariances $\mathbf{Q}_{k-1}, \mathbf{R}_k$, and a Gaussian prior $\mathcal{N}(\mathbf{m}_0,\mathbf{P}_0)$. This is the model the [[The Kalman Filter|Kalman filter]] solves exactly.

## Overview

Särkkä builds filtering on the *general probabilistic state-space model* (a hidden Markov model with continuous state), then specializes to the linear-Gaussian case. The general form makes the two structural assumptions — Markov dynamics and conditionally independent measurements — explicit; the linear-Gaussian form adds the closed-form algebra.

## Main Content

> [!definition] Definition: Probabilistic state-space model (Särkkä Def. 4.1)
> A probabilistic state-space model (a.k.a. non-linear filtering model) is a sequence of conditional distributions
> $$\mathbf{x}_k \sim p(\mathbf{x}_k \mid \mathbf{x}_{k-1}), \qquad \mathbf{y}_k \sim p(\mathbf{y}_k \mid \mathbf{x}_k), \qquad k = 1,2,\dots \tag{4.1}$$
> where
> - $\mathbf{x}_k \in \mathbb{R}^n$ is the **state** at time step $k$ (hidden);
> - $\mathbf{y}_k \in \mathbb{R}^m$ is the **measurement** at time step $k$ (observed);
> - $p(\mathbf{x}_k \mid \mathbf{x}_{k-1})$ is the **dynamic model** (how the state evolves stochastically);
> - $p(\mathbf{y}_k \mid \mathbf{x}_k)$ is the **measurement model** (distribution of measurements given the state).
^def-ssm

> [!note] Markov and conditional-independence assumptions (Särkkä Props. 4.1–4.2)
> The model is **Markovian** in two senses:
> - The state is a Markov sequence — the future is independent of the past given the present:
>   $$p(\mathbf{x}_k \mid \mathbf{x}_{1:k-1}, \mathbf{y}_{1:k-1}) = p(\mathbf{x}_k \mid \mathbf{x}_{k-1}). \tag{4.2}$$
> - Measurements are **conditionally independent** given the corresponding state:
>   $$p(\mathbf{y}_k \mid \mathbf{x}_{1:k}, \mathbf{y}_{1:k-1}) = p(\mathbf{y}_k \mid \mathbf{x}_k). \tag{4.4}$$
> These two properties are exactly what makes the predict/update recursion of [[The Kalman Filter]] valid. They also factor the joint prior and likelihood:
> $$p(\mathbf{x}_{0:T}) = p(\mathbf{x}_0)\prod_{k=1}^{T} p(\mathbf{x}_k \mid \mathbf{x}_{k-1}), \qquad p(\mathbf{y}_{1:T} \mid \mathbf{x}_{0:T}) = \prod_{k=1}^{T} p(\mathbf{y}_k \mid \mathbf{x}_k). \tag{4.7–4.8}$$
^markov

> [!definition] Definition: Linear-Gaussian state-space model (Särkkä §4.3, Eq. 4.17–4.18)
> The linear-Gaussian (linear filtering) model is
> $$\mathbf{x}_k = \mathbf{A}_{k-1}\,\mathbf{x}_{k-1} + \mathbf{q}_{k-1}, \qquad \mathbf{q}_{k-1}\sim\mathcal{N}(\mathbf{0},\mathbf{Q}_{k-1}) \quad \text{(state / transition equation)}$$
> $$\mathbf{y}_k = \mathbf{H}_k\,\mathbf{x}_k + \mathbf{r}_k, \qquad \mathbf{r}_k\sim\mathcal{N}(\mathbf{0},\mathbf{R}_k) \quad \text{(observation / measurement equation)} \tag{4.17}$$
> with prior $\mathbf{x}_0 \sim \mathcal{N}(\mathbf{m}_0,\mathbf{P}_0)$. Equivalently, in density form:
> $$p(\mathbf{x}_k \mid \mathbf{x}_{k-1}) = \mathcal{N}(\mathbf{x}_k \mid \mathbf{A}_{k-1}\mathbf{x}_{k-1},\, \mathbf{Q}_{k-1}), \qquad p(\mathbf{y}_k \mid \mathbf{x}_k) = \mathcal{N}(\mathbf{y}_k \mid \mathbf{H}_k\mathbf{x}_k,\, \mathbf{R}_k). \tag{4.18}$$
>
> **Symbol glossary** (used throughout this folder):
> - $\mathbf{A}_{k-1}$ ($n\times n$): **transition matrix** of the dynamic model (step $k-1 \to k$).
> - $\mathbf{H}_k$ ($m\times n$): **measurement-model matrix** mapping state to observation space.
> - $\mathbf{q}_{k-1}$, $\mathbf{Q}_{k-1}$ ($n\times n$): **process noise** and its covariance.
> - $\mathbf{r}_k$, $\mathbf{R}_k$ ($m\times m$): **measurement noise** and its covariance.
> - $\mathbf{m}_0$, $\mathbf{P}_0$: prior mean and covariance of the initial state.
> - $\mathbf{q}_{k-1}\perp\mathbf{r}_k$ and both white (independent across time).
^def-lg

**Time-invariant special case.** When the matrices do not depend on $k$ ($\mathbf{A}_{k-1}=\mathbf{A}$, $\mathbf{H}_k=\mathbf{H}$, etc.) the model is **linear time-invariant (LTI)** — the usual setting for BSTS-style structural models, where each component contributes fixed blocks.

## Examples

> [!example] Gaussian random walk + noise (local level model; Särkkä Ex. 4.1)
> Scalar state, the simplest non-trivial state-space model:
> $$x_k = x_{k-1} + q_{k-1}, \quad q_{k-1}\sim\mathcal{N}(0,Q); \qquad y_k = x_k + r_k, \quad r_k\sim\mathcal{N}(0,R).$$
> Here $A=1$, $H=1$. The hidden signal $x_k$ random-walks; we see it through additive noise. This is the **local level** component of a structural time series — see [[Local Linear Trend and Seasonality]]. Filtered in [[The Kalman Filter]].

> [!example] Constant-velocity car tracking (Särkkä Ex. 3.6 / 4.3)
> A continuous-time Wiener-velocity model discretized to a 4-D state $\mathbf{x}=(x_1,x_2,\dot x_1,\dot x_2)$ (position + velocity). With sampling interval $\Delta t$:
> $$\mathbf{A} = \begin{pmatrix} 1&0&\Delta t&0\\ 0&1&0&\Delta t\\ 0&0&1&0\\ 0&0&0&1\end{pmatrix}, \qquad \mathbf{H} = \begin{pmatrix}1&0&0&0\\ 0&1&0&0\end{pmatrix},$$
> $$\mathbf{Q} = \begin{pmatrix} \tfrac{q_1^c\Delta t^3}{3} & 0 & \tfrac{q_1^c\Delta t^2}{2} & 0\\ 0 & \tfrac{q_2^c\Delta t^3}{3} & 0 & \tfrac{q_2^c\Delta t^2}{2}\\ \tfrac{q_1^c\Delta t^2}{2} & 0 & q_1^c\Delta t & 0\\ 0 & \tfrac{q_2^c\Delta t^2}{2} & 0 & q_2^c\Delta t \end{pmatrix}, \qquad \mathbf{R}=\begin{pmatrix}\sigma_1^2&0\\0&\sigma_2^2\end{pmatrix}$$
> where $q_1^c,q_2^c$ are the continuous-time process-noise spectral densities. Only position is measured; velocity is inferred. Demonstrates the **modular block structure** that carries over to structural time-series models.

## Connections

- [[State-Space Models and the Kalman Filter - Overview]] — where this model sits in the pipeline
- [[The Kalman Filter]] — exact filtering solution for this model
- [[The RTS Smoother]] — exact smoothing solution for this model
- [[Marginal Likelihood via the Kalman Filter]] — learning $\mathbf{A},\mathbf{H},\mathbf{Q},\mathbf{R}$ from data
- [[Bayesian Structural Time-Series Model]] — applied BSTS form (observation + state equations 2.1–2.2 map directly onto 4.17)
- [[Local Linear Trend and Seasonality]] — concrete trend/seasonal blocks for $\mathbf{A},\mathbf{Q},\mathbf{H}$

## See Also

- [[Carryover Effects and Distributed Lags]] — autoregressive/distributed-lag dynamics expressible in state-space form (cf. Särkkä Ex. 3.4, $x_k=\sum a_i x_{k-i}+q$)
- [[Single Marketing Time Series]] — ARIMA models have equivalent state-space representations
- [[Hilbert Space Gaussian Processes]] — temporal GPs as linear-Gaussian state-space models
