---
title: Adaptive Contrastive Estimation (ACE)
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]]"
source_location: "Foster 2020 §3.1–3.2 (Eqs. 7, 9–11), Theorem 1, Appendix A"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Gradient-Based Unified BOED"
doc_type: paper
depends_on:
  - "[[Unified SGD BOED - Overview]]"
  - "[[Variational Posterior Estimator (Barber-Agakov)]]"
used_by:
  - "[[Prior Contrastive Estimation (PCE)]]"
  - "[[Likelihood-Free ACE and Gradient Estimation]]"
  - "[[High-Dimensional Design Applications]]"
aliases:
  - ACE
  - Adaptive Contrastive Estimation
  - I_ACE
  - ACE bound
---

# Adaptive Contrastive Estimation (ACE)

> [!summary]
> **Adaptive Contrastive Estimation (ACE)** is Foster 2020's recommended EIG lower bound. It augments the Barber–Agakov bound with $L$ **contrastive samples** $\theta_{1:L}\sim q_\phi(\theta\mid y)$ in the denominator, alongside the original sample $\theta_0$ from which $y$ was drawn. The resulting bound $I_{ACE}(\xi,\phi,L)$ is tight in **two complementary regimes** — when the inference network $q_\phi$ is good, *or* when $L\to\infty$ — and is optimized jointly over design $\xi$ and parameters $\phi$ by stochastic gradient ascent.

## Overview

The [[Variational Posterior Estimator (Barber-Agakov)|Barber–Agakov bound]] $I_{BA}$ is tight only if the inference network $q_\phi(\theta\mid y)$ can represent the true posterior. When it cannot, $I_{BA}$ is loose. ACE fixes this *adaptively*: it borrows VNMC's idea of contrastive/importance samples, but arranges them to keep a valid **lower** bound (VNMC is an upper bound, unusable for joint maximization over $\xi$). Including the original sample $\theta_0$ in the denominator prevents the catastrophic under-estimation of $p(y\mid\xi)$ that pure contrastive samples would cause.

## Main Content

> [!definition] Definition: ACE lower bound (Foster 2020, Eq. 11)
> With $\theta_0\sim p(\theta)$, $y\sim p(y\mid\theta_0,\xi)$, and contrastive samples $\theta_{1:L}\sim q_\phi(\theta\mid y)$:
> $$
> I_{ACE}(\xi,\phi,L) = \mathbb{E}\!\left[\log\frac{p(y\mid\theta_0,\xi)}{\frac{1}{L+1}\sum_{\ell=0}^{L}\frac{p(\theta_\ell)\,p(y\mid\theta_\ell,\xi)}{q_\phi(\theta_\ell\mid y)}}\right],
> $$
> expectation over $p(\theta_0)\,p(y\mid\theta_0,\xi)\,q_\phi(\theta_{1:L}\mid y)$. The denominator is a self-normalized importance estimate of the marginal $p(y\mid\xi)$ using the contrasts plus $\theta_0$.
^def-ace

> [!theorem] Theorem 1 — Properties of ACE (Foster 2020)
> For any model $p(\theta)p(y\mid\theta,\xi)$ and inference network $q_\phi(\theta\mid y)$:
> 1. **Lower bound with KL error:** $I(\xi) - I_{ACE}(\xi,\phi,L) = \mathbb{E}_{p(y\mid\xi)}\!\left[\mathrm{KL}\!\left(P(\theta_{0:L}\mid y)\,\big\|\,\prod_\ell q_\phi(\theta_\ell\mid y)\right)\right]\ge 0$, where $P(\theta_{0:L}\mid y)=\frac{1}{L+1}\sum_{\ell=0}^L p(\theta_\ell\mid y,\xi)\prod_{k\ne\ell}q_\phi(\theta_k\mid y)$.
> 2. **Asymptotic exactness:** $\lim_{L\to\infty} I_{ACE}(\xi,\phi,L) = I(\xi)$.
> 3. **Monotone in $L$:** $I_{ACE}(\xi,\phi,L_2)\ge I_{ACE}(\xi,\phi,L_1)$ for $L_2\ge L_1\ge 0$.
> 4. **Exact with perfect network:** if $q_\phi(\theta\mid y)=p(\theta\mid y,\xi)$ then $I_{ACE}(\xi,\phi,L)=I(\xi)$ for all $L$.
^thm1-ace

### Why ACE beats BA

$I_{BA}$ (Foster 2020, Eq. 7) is recovered as the $L=0$ case. ACE adds a *second* route to tightness: even a poor $q_\phi$ gives an accurate bound if $L$ is large (property 2). This is the same adaptive-tightening logic as [[Variational NMC Estimator|VNMC]], but oriented to give a lower bound suitable for **joint** $(\xi,\phi)$ maximization. Foster 2020 reports that across all five experiments **ACE generally does at least as well as the better of BA and PCE**, hence the recommendation to use it as the default.

### Connection to InfoNCE

ACE generalizes the **InfoNCE** mutual-information bound of representation learning: with $\theta\leftrightarrow x$ and $y\leftrightarrow z$, the contrastive denominator is the InfoNCE critic. PCE ([[Prior Contrastive Estimation (PCE)]]) is the special case using the prior as the contrastive distribution.

## Examples

> [!example] Death process trajectory (Foster 2020 §4.2, Figs. 1–2)
> On the 2-D death-process design ($\xi_1,\xi_2\ge 0$, measure infected counts at two times), ACE's SGA trajectory climbs the known EIG surface to the optimum, reaching final EIG $\mathbf{0.9830\pm0.0001}$ — beating BA (0.9822), PCE (0.9822), and Bayesian optimization + NMC (0.9732), and converging faster in wall-clock time.

## Connections

- **Improves** [[Variational Posterior Estimator (Barber-Agakov)|BA]] ($L=0$ special case) by adaptive contrastive tightening.
- **Lower-bound dual** of [[Variational NMC Estimator|VNMC]] (which is the analogous *upper* bound); pairing ACE-lower with VNMC-upper traps the true EIG to verify designs ([[High-Dimensional Design Applications]]).
- **Specializes to** [[Prior Contrastive Estimation (PCE)]] when $q_\phi$ is replaced by the prior; both are **gradient-optimized** via [[Likelihood-Free ACE and Gradient Estimation]].

## See Also
- [[Prior Contrastive Estimation (PCE)]] — the no-learning contrastive variant
- [[Likelihood-Free ACE and Gradient Estimation]] — Theorem 2 and the $\partial I_{ACE}/\partial\xi$ estimators
- [[Variational NMC Estimator]] — the upper-bound counterpart from Foster 2019
