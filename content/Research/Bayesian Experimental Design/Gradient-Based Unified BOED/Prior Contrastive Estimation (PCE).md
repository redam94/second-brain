---
title: Prior Contrastive Estimation (PCE)
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]]"
source_location: "Foster 2020 §3.3 (Eqs. 12–13, 15)"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Gradient-Based Unified BOED"
doc_type: paper
depends_on:
  - "[[Adaptive Contrastive Estimation (ACE)]]"
used_by:
  - "[[High-Dimensional Design Applications]]"
  - "[[The Computational Revolution in EIG Estimation]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - PCE
  - Prior Contrastive Estimation
  - I_PCE
  - InfoNCE BOED bound
---

# Prior Contrastive Estimation (PCE)

> [!summary]
> **Prior Contrastive Estimation (PCE)** is the simplification of [[Adaptive Contrastive Estimation (ACE)|ACE]] that draws the contrastive samples from the **prior** $p(\theta)$ instead of a learned inference network $q_\phi$. This removes the need to learn any variational parameters — there is no $\phi$ — so it is cheaper and simpler to train, at the cost of only being tight as $L\to\infty$ (it loses ACE's "good network" route to tightness). PCE is essentially the **InfoNCE** mutual-information bound applied to experimental design.

## Overview

ACE's inference network $q_\phi(\theta\mid y)$ must be learned, adding parameters and training cost. If the prior is already a reasonable proposal for estimating the marginal $p(y\mid\xi)$, we can skip the network and use prior draws as contrasts. The bound then depends only on the design $\xi$, so optimization is a pure design problem.

## Main Content

> [!definition] Definition: PCE lower bound (Foster 2020, Eq. 12)
> With $\theta_0\sim p(\theta)$, $y\sim p(y\mid\theta_0,\xi)$, and contrastive samples $\theta_{1:L}\sim p(\theta)$ drawn from the **prior**:
> $$
> I_{PCE}(\xi,L) := \mathbb{E}\!\left[\log\frac{p(y\mid\theta_0,\xi)}{\frac{1}{L+1}\sum_{\ell=0}^{L} p(y\mid\theta_\ell,\xi)}\right],
> $$
> expectation over $p(\theta_0)\,p(y\mid\theta_0,\xi)\,p(\theta_{1:L})$. This is the $q_\phi=p(\theta)$ special case of ACE, so it **inherits Theorem 1**: it is a valid lower bound, monotone in $L$, and tight as $L\to\infty$ (but only case-2 tightness — no "perfect network" route).
^def-pce

> [!example] Connection to InfoNCE (Foster 2020, Eq. 13)
> The InfoNCE / information-noise-contrastive-estimation bound from representation learning (van den Oord et al. 2018) is, for data $x_k$, representations $z_k$, and critic $f_\psi(x,z)\ge 0$:
> $$
> \mathrm{MI}(x;z)\ge \mathbb{E}\!\left[\frac1K\sum_{k=1}^K \log\frac{f_\psi(x_k,z_k)}{\frac1K\sum_{\ell=1}^K f_\psi(x_\ell,z_k)}\right].
> $$
> Writing $\theta$ for $x$ and $y$ for $z$, PCE is the case where the *optimal critic* $p(z\mid x)=p(y\mid\theta,\xi)$ is known (it is the likelihood) — so PCE is the experimental-design instance of InfoNCE with a known critic.
^ex-infonce

### Unnormalized prior densities

A practical bonus: PCE (and ACE) only need the prior **up to proportionality**. If $p(\theta)=A\cdot\gamma(\theta)$ with $A$ independent of $(\xi,\phi,y)$ and $\gamma$ an unnormalized density, then (Foster 2020, Eq. 15)
$$
I(\xi)\ge \mathbb{E}\!\left[\log\frac{p(y\mid\theta_0,\xi)}{\frac{1}{L+1}\sum_{\ell=0}^L \frac{\gamma(\theta_\ell)p(y\mid\theta_\ell,\xi)}{q_\phi(\theta_\ell\mid y)}}\right] - \log A,
$$
and the derivatives of $\log A$ vanish. This matters in **iterated** design, where the prior at step $t$ is the previous posterior $p(\theta\mid y_{1:t-1},\xi_{1:t-1})$, known only up to its normalizing constant.

### When to prefer PCE vs ACE

- **PCE:** prior is an adequate proposal for $p(y\mid\xi)$; no variational training wanted; low-to-moderate dimension. PCE performed well in low dimensions but **degraded as dimension increased** (the prior becomes an inefficient proposal).
- **ACE:** the inference network can closely approximate the posterior, or sampling from the prior is inefficient (high dimension) — ACE/BA learn adaptive proposals and avoid the under-estimation.

## Connections

- **Special case of** [[Adaptive Contrastive Estimation (ACE)]] (set $q_\phi=p(\theta)$).
- **InfoNCE / NCE lineage:** ties BOED to contrastive representation learning and noise-contrastive estimation.
- In [[Modern Bayesian Experimental Design - Overview|Rainforth 2023]], PCE is one of the "contrastive bounds" cited as enabling consistent stochastic-gradient design optimization (their §3.3.1).

## See Also
- [[Adaptive Contrastive Estimation (ACE)]] — the adaptive (learned-proposal) generalization
- [[Likelihood-Free ACE and Gradient Estimation]] — gradient estimation that applies to PCE too
- [[High-Dimensional Design Applications]] — where PCE wins (low-D) and loses (high-D)
