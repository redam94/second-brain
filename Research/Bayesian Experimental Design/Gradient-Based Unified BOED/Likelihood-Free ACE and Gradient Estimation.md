---
title: Likelihood-Free ACE and Gradient Estimation
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]]"
source_location: "Foster 2020 §3.4–3.6 (Eqs. 14, 16–19), Theorem 2"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Gradient-Based Unified BOED"
doc_type: paper
depends_on:
  - "[[Adaptive Contrastive Estimation (ACE)]]"
  - "[[Implicit Likelihood Estimator]]"
used_by:
  - "[[High-Dimensional Design Applications]]"
  - "[[Optimization and Gradient Schemes for BED]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - Likelihood-free ACE
  - ACE gradient estimation
  - Theorem 2 Foster 2020
  - Reparameterized EIG gradient
---

# Likelihood-Free ACE and Gradient Estimation

> [!summary]
> Two extensions that make ACE deployable. **(1) Likelihood-free ACE** (Theorem 2): when the likelihood $p(y\mid\theta,\xi)$ is implicit, replacing it with an *unnormalized* approximation $f_\psi(\theta,y)\ge 0$ — trained jointly with $(\xi,\phi)$ — **still yields a valid EIG lower bound**, so design and inference are learned in one optimization. **(2) Gradient estimators** for $\partial I_{ACE}/\partial\xi$: the high-variance **score-function** (REINFORCE) form, the lower-variance **reparameterization** form, and **Rao–Blackwellization** for discrete outcomes.

## Overview

ACE/PCE as stated need a pointwise likelihood and gradients of the bound in $\xi$. Section 3.4 removes the first requirement (implicit models); Section 3.6 supplies the second (how to actually compute $\partial I_{ACE}/\partial\xi$ and $\partial I_{ACE}/\partial\phi$ with low variance). Together they let a single SGA loop optimize design, inference network, and (if needed) a likelihood surrogate simultaneously.

## Main Content

### Likelihood-free ACE

> [!theorem] Theorem 2 — Unnormalized likelihood still bounds the EIG (Foster 2020)
> Consider a model $p(\theta)p(y\mid\theta,\xi)$ and inference network $q_\phi(\theta\mid y)$. Let $f_\psi(\theta,y)\ge 0$ be an **unnormalized** likelihood approximation. Then
> $$I(\xi)\ge \mathbb{E}\!\left[\log\frac{f_\psi(\theta_0,y)}{\frac{1}{L+1}\sum_{\ell=0}^L \frac{p(\theta_\ell)f_\psi(\theta_\ell,y)}{q_\phi(\theta_\ell\mid y)}}\right],$$
> expectation over $p(\theta_0)\,p(y\mid\theta_0,\xi)\,q_\phi(\theta_{1:L}\mid y)$. So one can train $\psi$ (likelihood surrogate), $\phi$ (inference network), and $\xi$ (design) jointly by maximizing a single lower bound — the basis for ACE on implicit-likelihood models such as random-effects models.
^thm2-lface

This is the contrastive-bound analogue of Foster 2019's [[Implicit Likelihood Estimator|$\hat\mu_{m+\ell}$]], but crucially it **preserves the lower-bound property** (whereas $\hat\mu_{m+\ell}$ only bounds the *error*), so it can be safely maximized over $\xi$.

### Gradient estimation for ACE (Foster 2020 §3.6)

Write $g(y,\theta_{0:L},\phi,\xi) := \log\frac{p(y\mid\theta_0,\xi)}{\frac{1}{L+1}\sum_{\ell=0}^{L}\frac{p(\theta_\ell)p(y\mid\theta_\ell,\xi)}{q_\phi(\theta_\ell\mid y)}}$ for the integrand.

> [!definition] Score-function (REINFORCE) gradient (Eqs. 16–17)
> $$\frac{\partial I_{ACE}}{\partial\xi} = \mathbb{E}\!\left[\frac{\partial g}{\partial\xi} + g\cdot\frac{\partial}{\partial\xi}\log p(y\mid\theta_0,\xi)\right],$$
> expectation over $p(\theta_0)\,p(y\mid\theta_0,\xi)\,q_\phi(\theta_{1:L}\mid y)$. Unbiased but **high variance**.
^def-score-grad

> [!definition] Reparameterized gradient (Eq. 18)
> Introduce noise variables $\epsilon,\epsilon'_{1:L}$ independent of $(\xi,\phi)$ with $y=y(\theta_0,\xi,\epsilon)$ and $\theta_\ell=\theta(y,\phi,\epsilon'_\ell)$. Then
> $$\frac{\partial I_{ACE}}{\partial\xi} = \mathbb{E}\!\left[\frac{\partial g}{\partial\xi} + \frac{\partial g}{\partial y}\frac{\partial y}{\partial\xi} + \sum_{\ell=1}^L \frac{\partial g}{\partial\theta_\ell}\frac{\partial\theta_\ell}{\partial y}\frac{\partial y}{\partial\xi}\right],$$
> expectation over $p(\epsilon)p(\epsilon'_{1:L})$. Typically **much lower variance** than the score-function estimator — important for hard design problems.
^def-reparam-grad

> [!definition] Rao–Blackwellized gradient for discrete $y$ (Eq. 19)
> When $y$ is discrete, sum over outcomes instead of sampling:
> $$\frac{\partial I_{ACE}}{\partial\xi} = \sum_{y\in\mathcal{Y}}\mathbb{E}\!\left[\frac{\partial g}{\partial\xi}p(y\mid\theta_0,\xi) + g\,\frac{\partial}{\partial\xi}p(y\mid\theta_0,\xi)\right],$$
> expectation over $p(\theta_0)\prod_\ell q_\phi(\theta_\ell\mid y)$. Used for the death-process experiment (66 discrete outcomes).
^def-rb-grad

The $\phi$-gradient $\partial I_{ACE}/\partial\phi$ is handled analogously — if the contrastive $\theta_{1:L}$ are reparameterizable, use the double-reparameterization of Tucker et al. (2018).

## Examples

> [!example] Where each gradient is used (Foster 2020 §4)
> **Rao–Blackwellization** drives the discrete death process (66 outcomes). **Reparameterization** is the workhorse for the continuous high-dimensional designs (400-D regression, 100-D docking). Likelihood-free ACE (Theorem 2) is what allows the gradient methods to be applied to implicit-likelihood models like the mixed-effects / CES settings.

## Connections

- **Extends** [[Adaptive Contrastive Estimation (ACE)]] and [[Prior Contrastive Estimation (PCE)]] to implicit models and supplies their training gradients.
- **Bound-preserving analogue** of [[Implicit Likelihood Estimator|$\hat\mu_{m+\ell}$]] (Foster 2019), improving it from an error bound to a valid EIG lower bound.
- **Independent parallel work:** Kleinegesse & Gutmann (2020) showed the MINE-style MI bound can likewise be used in implicit settings, collapsing posterior and likelihood approximations into one critic — see [[Optimization and Gradient Schemes for BED]].

## See Also
- [[Adaptive Contrastive Estimation (ACE)]] — the bound being differentiated/extended
- [[High-Dimensional Design Applications]] — the experiments these gradients enable
- [[Optimization and Gradient Schemes for BED]] — Rainforth 2023's view of stochastic-gradient design
