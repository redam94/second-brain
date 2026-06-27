---
title: Optimization and Gradient Schemes for BED
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §3.4"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[The Computational Revolution in EIG Estimation]]"
  - "[[Unified SGD BOED - Overview]]"
used_by:
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
aliases:
  - Design optimization BED
  - Stochastic gradient design
  - SGD schemes for EIG
---

# Optimization and Gradient Schemes for BED

> [!summary]
> Estimating the EIG is only half the job — the goal is to *optimize* it over designs. Historically optimization wrapped a black-box estimator (grid search, Bayesian optimization, evolutionary methods, coordinate exchange), all slow and poorly scaling because they perform many EIG estimations and cannot exploit gradients. The modern alternative is **stochastic-gradient ascent** directly on a differentiable EIG bound — first proposed by Huan & Marzouk (2014), made *consistent* by the debiasing and variational-bound advances, and unified by [[Unified SGD BOED - Overview|Foster et al. (2020)]] into a single optimization over design and variational parameters.

## Overview

The review §3.4 separates two eras of design optimization: estimator-wrapping schemes (the historical norm) and gradient-based schemes (the modern approach), the latter enabled by the §3.3 estimators being differentiable in $\xi$.

## Main Content

### Estimator-wrapping optimizers (the old way)

Most classical schemes treat the EIG estimator as a black box and optimize around it:
- simple **discretization / enumeration** of candidate designs (sometimes with dynamic resource allocation),
- **Bayesian optimization**,
- **evolutionary algorithms**,
- **coordinate exchange**.

All can be extremely slow (many EIG estimations per optimization), scale poorly to high-dimensional design spaces, and cannot exploit problem-specific gradient information. Sampling-based approaches that couple outer sampling $p(\theta)p(y\mid\theta,\xi)$ with optimization over $\xi$ (extended-space methods) can help but need custom proposals.

### Stochastic-gradient schemes (the modern way)

> [!example] The unified stochastic-gradient bound (Rainforth 2023, Eq. 15 = Foster 2020)
> Stochastic gradients side-step EIG approximation by directly leveraging small-sample estimates of $\nabla_\xi\mathrm{EIG}$. Foster et al. (2020) introduced a unified approach that simultaneously maximizes a variational **lower** bound and the design. The crucial adjustment that turns the NMC *upper* bound into a usable *lower* bound for ascent is including the outer sample $\theta_0$ in the contrastive denominator (this is [[Prior Contrastive Estimation (PCE)|PCE]] / [[Adaptive Contrastive Estimation (ACE)|ACE]]):
> $$
> \mathrm{EIG}_\theta(\xi) \ge \mathbb{E}\!\left[\log\frac{p(y\mid\theta_0,\xi)}{\frac{1}{M+1}\sum_{m=0}^{M}\frac{p(y\mid\theta_m,\xi)p(\theta_m)}{q(\theta_m\mid y,\xi)}}\right], \qquad \theta_0,y\sim p(\theta)p(y\mid\theta,\xi),\ \theta_m\sim q(\theta_m\mid y,\xi).
> $$
> Tight when $q$ matches the true posterior; tightness controlled by $M$; usable in conjunction with the NMC *upper* bound to bound the true EIG from both sides.
^ex-unified-sga

> [!example] Implicit models and the MLMC route (Rainforth 2023 §3.4.1)
> Foster et al. (2020) further showed the bound stays valid when $p(y\mid\theta,\xi)$ is replaced by any *unnormalized* approximation — a mechanism for implicit likelihoods ([[Likelihood-Free ACE and Gradient Estimation]]). Independently, **Kleinegesse & Gutmann (2020)** showed the MINE-style MI bound can be used the same way, collapsing posterior and likelihood approximations into one "critic" network — and gave the first practical demonstration in implicit-likelihood settings. The **Goda et al. (2022) MLMC** approach provides unbiased finite-variance estimates of $\nabla_\xi\mathrm{EIG}$ directly, enabling SGA with *no* variational distribution (higher per-sample cost, not yet empirically compared).
^ex-implicit-sga

### The two recurring difficulties

1. **Bias propagates into design.** Earlier stochastic-gradient schemes (Huan & Marzouk 2014; Carlon et al. 2020) used gradients of *biased* estimators (Laplace, plain NMC), so they could converge to sub-optimal designs. The importance of debiasing schemes and variational bounds is precisely that they make the gradient ascent **consistent**.
2. **Discrete / non-continuous designs.** Gradient methods need a continuous, differentiable design space. When design decisions are discrete (or the likelihood is non-smooth), relaxation schemes can sometimes help, but the review flags this as not yet fully resolved.

## Connections

- **Consumes** the differentiable bounds from [[The Computational Revolution in EIG Estimation]].
- **Centers on** [[Unified SGD BOED - Overview|Foster 2020]]'s unified scheme — Eq. 15 of the review is that paper's contribution.
- **Sets up** the policy leap: once you can optimize designs by SGA, you can equally optimize a *policy network* over designs — see [[From Designs to Policies (Deep Adaptive Design)]].

## See Also
- [[Unified SGD BOED - Overview]] — the unified gradient approach in full
- [[Likelihood-Free ACE and Gradient Estimation]] — the gradient estimators and implicit-model bound
- [[From Designs to Policies (Deep Adaptive Design)]] — SGA applied to learn adaptive policies
