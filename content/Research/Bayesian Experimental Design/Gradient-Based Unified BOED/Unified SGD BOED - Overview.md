---
title: Unified SGD BOED - Overview
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/overview
  - doc/paper
source: "[[raw/Foster et al 2020 - Unified Stochastic Gradient BOED.pdf]]"
source_location: "AISTATS 2020, full paper"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Gradient-Based Unified BOED"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
  - "[[Variational BOED - Overview]]"
used_by:
  - "[[Adaptive Contrastive Estimation (ACE)]]"
  - "[[Prior Contrastive Estimation (PCE)]]"
  - "[[Likelihood-Free ACE and Gradient Estimation]]"
  - "[[High-Dimensional Design Applications]]"
  - "[[Optimization and Gradient Schemes for BED]]"
aliases:
  - Unified Stochastic Gradient BOED
  - Foster 2020
  - SGBOED
  - Gradient-based BOED
---

# Unified SGD BOED - Overview

> [!summary]
> **Foster et al. (2020), *A Unified Stochastic Gradient Approach to Designing Bayesian-Optimal Experiments* (AISTATS).** Replaces the standard *two-stage* BOED pipeline — estimate the EIG pointwise, then hand it to a separate outer optimizer — with a **single stochastic-gradient ascent** that simultaneously tightens a variational lower bound on the EIG *and* optimizes the design $\xi$. Introduces three lower bounds — **BA**, **ACE** (adaptive contrastive estimation), and **PCE** (prior contrastive estimation) — plus a likelihood-free extension. Because it uses SGA, it scales to **high-dimensional designs** (100s of dimensions) where gradient-free outer optimizers fail. Recommended default: **ACE**.

## Overview

**The problem with two-stage BOED.** Existing methods estimate $I(\xi)=\mathrm{EIG}(\xi)$ on a point-by-point basis and feed each estimate to an outer optimizer (Bayesian optimization, grid search). This is inefficient: it adds a level of nesting, must re-estimate $I(\xi)$ for every candidate $\xi$, and typically forces gradient-free optimization that does not scale to high-dimensional designs.

**The unified idea.** Build a variational *lower bound* $\mathcal{L}(\xi,\phi)\le I(\xi)$ and maximize it jointly over $(\xi,\phi)$ by stochastic gradient ascent. Optimizing $\phi$ tightens the bound (so EIG estimates stay accurate); optimizing $\xi$ moves the design toward high-EIG regions. One loop does both — no outer optimizer, and gradients let it scale.

> A **lower** bound is essential: maximizing over $(\xi,\phi)$ with an *upper* bound would give an ill-posed max–min problem. Foster 2020 uses lower bounds whose gradients with respect to $(\xi,\phi)$ are tractable expectations over $p(\theta)p(y\mid\theta,\xi)$.

## Main Content

### The three lower bounds

| Bound | Eq. | Idea | Tight when | Note |
|-------|-----|------|-----------|------|
| **$I_{BA}$** (Barber–Agakov) | 7 | learn posterior $q_\phi(\theta\mid y)$, optimize $(\xi,\phi)$ jointly | $q_\phi=$ true posterior | the one-stage version of Foster 2019's $\hat\mu_{\text{post}}$ |
| **$I_{ACE}$** (adaptive contrastive) | 11 | add $L$ contrastive samples $\theta_{1:L}\sim q_\phi$ to the denominator | $q_\phi=$ posterior **or** $L\to\infty$ | [[Adaptive Contrastive Estimation (ACE)]] |
| **$I_{PCE}$** (prior contrastive) | 12 | use the **prior** $p(\theta)$ to draw contrastive samples (no $\phi$ to learn) | $L\to\infty$ | [[Prior Contrastive Estimation (PCE)]] |

ACE improves on BA by being tight in **two** ways (good $q_\phi$ *or* many contrastive samples), and connects to the **InfoNCE** bound from representation learning. PCE drops the learned network entirely — cheaper, effective when the prior is a good proposal for $p(y\mid\xi)$.

### Key results

- **Theorem 1** ([[Adaptive Contrastive Estimation (ACE)]]): $I_{ACE}$ is a valid EIG lower bound, monotonically increasing in $L$, exact as $L\to\infty$, and exact for any $L$ if $q_\phi$ equals the true posterior. Error = an expected KL.
- **Theorem 2** ([[Likelihood-Free ACE and Gradient Estimation]]): replacing the likelihood with an **unnormalized** approximation $f_\psi(\theta,y)\ge 0$ *still* gives a valid lower bound — enabling implicit-likelihood models in a single optimization.
- **Gradient estimators** for $\partial I_{ACE}/\partial\xi$: score-function (REINFORCE), reparameterization, and Rao–Blackwellization for discrete $y$.

### Two-stage vs one-stage (the headline comparison)

On a 400-dimensional regression design, the gradient methods (BA/ACE/PCE) achieve **roughly double** the final EIG of two-stage baselines (Bayesian optimization / random search + VNMC). On biomolecular docking (100-dim) they **beat human experts**. The advantage grows with dimension.

## Examples

> [!example] Five experiments (Foster 2020 §4)
> **Death process** (2-D epidemiology, EIG surface known) — gradient methods beat BO even in low dimension. **Regression** (400-D) — ~2× EIG over BO/random search. **Advertising** (ablation over dimension $D$, analytic EIG) — gradient methods dominate as $D$ grows. **Biomolecular docking** (100-D, Lyu et al. 2019) — ACE beats expert designs. **CES** (6-D iterated behavioural economics) — ACE/PCE reduce posterior entropy faster than the Foster 2019 marginal+BO baseline. See [[High-Dimensional Design Applications]].

## Connections

- **Builds on** [[Variational BOED - Overview|Foster 2019]]: $I_{BA}$ is the one-stage $\hat\mu_{\text{post}}$; the **VNMC upper bound** is reused to verify designs (trap the EIG between ACE-lower and VNMC-upper).
- **Generalized / contextualized by** [[Modern Bayesian Experimental Design - Overview|Rainforth 2023]], which presents this unified SGA scheme (their Eq. 15) as the turning point that made gradient-based EIG optimization consistent.
- **Connects to** InfoNCE / contrastive representation learning (PCE ≈ InfoNCE with $\theta,y$ as the two views).

## See Also
- [[Adaptive Contrastive Estimation (ACE)]] — the recommended default bound (Theorem 1)
- [[Prior Contrastive Estimation (PCE)]] — the no-network contrastive bound
- [[Likelihood-Free ACE and Gradient Estimation]] — implicit likelihoods + gradient estimators
- [[High-Dimensional Design Applications]] — the five experiments
