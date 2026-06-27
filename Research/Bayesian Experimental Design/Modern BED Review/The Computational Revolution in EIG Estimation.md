---
title: The Computational Revolution in EIG Estimation
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §3.1–3.3"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[Modern Bayesian Experimental Design - Overview]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
used_by:
  - "[[Optimization and Gradient Schemes for BED]]"
aliases:
  - EIG estimation revolution
  - Debiasing schemes BED
  - Multi-level Monte Carlo EIG
  - Variational bounds EIG
---

# The Computational Revolution in EIG Estimation

> [!summary]
> The review's §3 organizes the recent breakthroughs in EIG estimation into three threads, all aimed at escaping nested Monte Carlo's biased, $\mathcal{O}(C^{-1/3})$ trap. **(1) Debiasing via Multi-Level Monte Carlo (MLMC)** — Goda et al. (2022) produce a *fully unbiased*, finite-variance EIG (and gradient) estimator recovering the $\mathcal{O}(C^{-1/2})$ rate. **(2) Functional / variational approximation** — learn an amortized approximation to the intractable density; a *normalized* one automatically gives a variational *bound*. **(3) Implicit-likelihood estimation** — bounds that need only samples of $y\mid\theta$, enabling simulator-based models.

## Overview

Whichever form of the EIG we use, we hit a doubly-intractable nested expectation ([[Nested Estimation and Nested Monte Carlo]]). The traditional fixes — nested Laplace approximations (biased) and nested Monte Carlo (consistent but slow, biased at finite $M$, cost $NM$) — both have serious drawbacks. The review frames modern progress as two largely complementary families (debiasing vs functional approximation), plus the special case of implicit models.

## Main Content

### Thread 1 — Debiasing schemes (Multi-Level Monte Carlo)

> [!example] Goda et al. (2022) unbiased MLMC EIG (Rainforth 2023, Eqs. 9–11)
> Express the EIG as the expectation of the $N=1$, $M=\infty$ NMC estimator, then write that as a telescoping sum:
> $$\mathrm{EIG}_\theta(\xi) = \mathbb{E}[\hat\mu_{1,\infty,q}] = \mathbb{E}\!\left[\sum_{\ell=0}^\infty \Delta_\ell\right], \quad \Delta_\ell := \hat\mu_{1,M_0 2^\ell,q} - \tfrac12\big(\hat\mu^{(a)}_{1,M_0 2^{\ell-1},q} + \hat\mu^{(b)}_{1,M_0 2^{\ell-1},q}\big),$$
> where the level-$\ell$ inner samples are split into two **antithetically coupled** halves $(a),(b)$. An importance sampler over levels, $r(\ell)\propto 2^{-\tau\ell}$ with $1<\tau<2$, produces an unbiased estimate of the infinite sum from a single sampled term:
> $$\mathrm{EIG}_\theta(\xi) = \mathbb{E}_{\ell\sim r,\,\Delta_\ell}\!\left[\Delta_\ell/r(\ell)\right].$$
> The antithetic coupling gives the estimator (and its $\xi$-gradient) **finite expected variance and cost**, recovering the standard (unnested) Monte Carlo rate $\mathcal{O}(C^{-1/2})$. Cost per sample can still be significant ($M_0 2^\ell+1$ likelihood evaluations), but it needs *no* variational family — and so removes any family-misspecification bias.

### Thread 2 — Functional and variational approximation

Rather than re-estimate the nested term $p(y\mid\xi)$ from scratch for each $y$, exploit its smoothness and learn a functional approximation $q(y\mid\xi)\approx p(y\mid\xi)$, then plug it into the EIG via standard Monte Carlo. Costs become **additive** ($\mathcal{O}(C^{-1/2})$ achievable), not multiplicative.

> [!theorem] Variational bounds from normalized approximations (Rainforth 2023, Eqs. 12–14)
> If $q(y\mid\xi)$ is a valid *normalized* density, it produces a variational **upper** bound: $\mathrm{EIG}_\theta(\xi)\le\mathbb{E}_{p(\theta)p(y\mid\theta,\xi)}[\log p(y\mid\theta,\xi)-\log q(y\mid\xi)]$, equality iff $q=p(y\mid\xi)$.
> An amortized inference network $q(\theta\mid y,\xi)\approx p(\theta\mid y,\xi)$ instead gives a **lower** bound: $\mathrm{EIG}_\theta(\xi)\ge\mathbb{E}_{p(\theta)p(y\mid\theta,\xi)}[\log q(\theta\mid y,\xi)-\log p(\theta)]$, equality iff $q$ is exact (this is exactly the classical Barber–Agakov MI bound).
> The expectation of the importance-sampled NMC estimator is itself a variational upper bound $\le\mathbb{E}[\hat\mu_{1,M,q}]$, tightenable by increasing $M$ — and the learned $q$ can also serve as the NMC proposal.
^thm-var-bounds-review

These are precisely the [[Variational BOED - Overview|Foster 2019 estimators]] ($\hat\mu_{\text{marg}}$ ↔ upper, $\hat\mu_{\text{post}}$ ↔ lower) and the [[Adaptive Contrastive Estimation (ACE)|ACE]] / [[Prior Contrastive Estimation (PCE)|PCE]] family, since the EIG is a mutual information and *any* MI bound applies.

### Thread 3 — Estimation for implicit models (§3.3.2)

When $y\mid\theta,\xi$ can be sampled but $p(y\mid\theta,\xi)$ cannot be evaluated, an extra intractable term appears. Approaches: approximate that density in isolation; estimate the ratio $p(y\mid\theta,\xi)/p(y\mid\xi)$ by logistic regression (LFIRE-style); or use variational bounds that allow implicit likelihoods ([[Implicit Likelihood Estimator|$\hat\mu_{m+\ell}$]], [[Likelihood-Free ACE and Gradient Estimation|likelihood-free ACE]]). Implicit *priors* are easier than implicit likelihoods — formulations based on the likelihood form of the EIG (Eqs. 3, 7, 12) avoid the prior density.

### Debiasing vs variational — the trade-off

| | MLMC debiasing | Variational/functional |
|---|----------------|------------------------|
| Bias | **none** (unbiased) | family-misspecification bias (unless $L,M\to\infty$) |
| Rate | $\mathcal{O}(C^{-1/2})$ | $\mathcal{O}(C^{-1/2})$ (when family contains target) |
| Per-sample cost | higher ($M_0 2^\ell+1$ evals) | lower |
| Needs variational family? | no | yes |
| Gives a usable gradient? | yes ($\nabla_\xi\mathrm{EIG}$ directly) | yes (differentiate the bound) |

## Connections

- **Directly extends** [[Nested Estimation and Nested Monte Carlo]] — the two threads are its two escape routes.
- **Subsumes** [[Variational BOED - Overview|Foster 2019]] (variational bounds) and feeds [[Optimization and Gradient Schemes for BED]] (which uses these bounds' gradients).
- **MLMC debiasing** is an alternative to variational families that the review notes "has not yet been empirically compared" to them at scale (an open question).

## See Also
- [[Nested Estimation and Nested Monte Carlo]] — the problem these solve
- [[Variational BOED - Overview]] — the variational-thread estimators in detail
- [[Optimization and Gradient Schemes for BED]] — turning bounds into design optimization
- [[Synthetic Likelihood - Overview]] — a related likelihood-free inference idea
