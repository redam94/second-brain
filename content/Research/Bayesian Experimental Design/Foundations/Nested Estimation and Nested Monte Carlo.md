---
title: Nested Estimation and Nested Monte Carlo
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §3.1–3.2; Foster 2019 §2"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Foundations"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
  - "[[Introduction to Bayesian Computation]]"
used_by:
  - "[[Variational BOED - Overview]]"
  - "[[The Computational Revolution in EIG Estimation]]"
  - "[[Convergence Rates and Estimator Selection]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - NMC
  - Nested Monte Carlo
  - Nested estimation
  - Double intractability
---

# Nested Estimation and Nested Monte Carlo

> [!summary]
> Because the EIG is a *nested* expectation — an outer expectation over $(\theta,y)$ of a log-ratio whose inner term ($p(y\mid\xi)$ or $p(\theta\mid y,\xi)$) is itself an intractable expectation — it cannot be estimated by conventional Monte Carlo. The standard tool is the **nested Monte Carlo (NMC)** estimator, which is biased for finite inner sample size $M$, costs $C=NM$, and converges only at $\mathcal{O}(C^{-1/3})$ (optimally $M\propto\sqrt{N}$), far slower than the $\mathcal{O}(C^{-1/2})$ of ordinary MC. This slow rate is the bottleneck that variational, debiasing (MLMC), and gradient methods exist to break.

## Overview

The intractability of the EIG ([[Expected Information Gain]]) is *double*: both the posterior $p(\theta\mid y,\xi)$ and the marginal likelihood $p(y\mid\xi)=\mathbb{E}_{p(\theta)}[p(y\mid\theta,\xi)]$ are unavailable in closed form. Whichever form of the EIG we use, the integrand contains a term that is **both intractable and varies between realizations of $y$**, so we must estimate a fresh inner integral for every outer sample. This is the defining feature of nested estimation and the source of its poor convergence.

## Main Content

> [!definition] Definition: Nested Monte Carlo EIG estimator (Rainforth 2023 Eq. 7 / Foster 2019 Eq. 4)
> Approximate the inner marginal $p(y_n\mid\xi)$ with an $M$-sample average over fresh prior draws $\theta_{n,m}\sim p(\theta)$:
> $$
> \hat\mu_{\mathrm{NMC}}(\xi) := \frac1N\sum_{n=1}^N \log\frac{p(y_n\mid\theta_{n,0},\xi)}{\frac1M\sum_{m=1}^M p(y_n\mid\theta_{n,m},\xi)}, \qquad \theta_{n,0},\theta_{n,m}\overset{\text{i.i.d.}}{\sim} p(\theta),\ y_n\sim p(y\mid\theta_{n,0},\xi)
> $$
> Total computational cost is $C = NM$.
^def-nmc

> [!theorem] Convergence rate of NMC (Rainforth et al. 2018)
> The NMC estimator has asymptotic mean-squared error $\mathrm{MSE} = \mathcal{O}\!\left(\dfrac{a}{N} + \dfrac{b}{M^2}\right)$ for model-dependent constants $a,b$, and is **consistent** as $N,M\to\infty$ (under weak conditions). Balancing the two error terms at fixed budget $C=NM$ gives the optimal allocation $M\propto\sqrt{N}$, yielding an overall rate of
> $$
> \mathrm{RMSE} = \mathcal{O}\!\left(C^{-1/3}\right).
> $$
> Compare $\mathcal{O}(C^{-1/2})$ for conventional (non-nested) Monte Carlo. **Two undesirable properties:** (i) NMC is *biased* for any finite $M$ (a nonlinear $\log$ of unbiased inner estimates is biased), and (ii) it is *expensive* because cost scales as $C=NM$.
^thm-nmc-rate

### Importance-sampled NMC

Replacing the simple inner average with an importance-sampling estimate using a proposal $q(\theta\mid y,\xi)$ improves the constants $a,b$ and reduces finite-sample bias (Rainforth 2023, Eq. 8):
$$
\hat\mu_{\mathrm{NMC},q}(\xi) := \frac1N\sum_{n=1}^N \log\frac{p(y_n\mid\theta_n,\xi)}{\frac1M\sum_{m=1}^M \frac{p(y_n\mid\theta'_m,\xi)\,p(\theta'_m)}{q(\theta'_m\mid y_n)}}, \qquad \theta'_m\sim q(\theta'_m\mid y_n).
$$
Learning a good amortized proposal $q$ is precisely what the [[Variational NMC Estimator|variational NMC]] estimator does — standard NMC is the special case $q=p(\theta)$.

### Two routes past the $\mathcal{O}(C^{-1/3})$ wall

The review (Rainforth 2023 §3) frames modern progress as two complementary families:

1. **Debiasing schemes (Multi-Level Monte Carlo).** Goda et al. (2022) express the EIG as a telescoping sum of NMC estimators and use **randomized MLMC** with antithetic coupling to produce a *fully unbiased*, finite-variance estimator of the EIG and its gradient. With a randomization distribution $r(\ell)\propto 2^{-\tau\ell}$ ($1<\tau<2$), it recovers the standard $\mathcal{O}(C^{-1/2})$ rate and removes the variational family's approximation error — at higher per-sample cost. See [[The Computational Revolution in EIG Estimation]].
2. **Functional / variational approximation.** Learn an amortized approximation to the intractable density ($p(y\mid\xi)$ or $p(\theta\mid y,\xi)$) once and reuse it across outcomes, sharing information instead of re-estimating per $y$. This drops the cost from $\mathcal{O}(NM)$ to $\mathcal{O}(N+M)$ and yields $\mathcal{O}(T^{-1/2})$ estimators ([[Variational BOED - Overview]]). A learned normalized approximation also automatically gives a **variational bound** on the EIG.

## Examples

> [!example] Why the $\log$ makes NMC biased
> For fixed $y_n$, $\frac1M\sum_m p(y_n\mid\theta_{n,m},\xi)$ is an *unbiased* estimate of $p(y_n\mid\xi)$. But $\mathbb{E}[\log(\hat p)] \le \log(\mathbb{E}[\hat p]) = \log p(y_n\mid\xi)$ by Jensen's inequality, so the inner estimate is *negatively* biased in $\log$-space and the overall NMC EIG is biased upward. The bias is $\mathcal{O}(1/M)$ and vanishes only as $M\to\infty$ — the root cause of both the slow rate and the need for $M\propto\sqrt N$.

## Connections

- **Motivates** every fast estimator in this topic: [[Variational Posterior Estimator (Barber-Agakov)]], [[Variational Marginal Estimator]], [[Variational NMC Estimator]], and the contrastive bounds [[Adaptive Contrastive Estimation (ACE)]] / [[Prior Contrastive Estimation (PCE)]].
- **Shared machinery** with general nested-expectation problems and with simulation-based inference more broadly ([[Introduction to Bayesian Computation]]).
- The **contrastive bounds use a finite number of inner ("contrastive") samples on purpose** — turning the NMC bias into a *controlled bound* rather than an error to be eliminated.

## See Also
- [[Expected Information Gain]] — the nested expectation being estimated
- [[The Computational Revolution in EIG Estimation]] — debiasing (MLMC) vs variational, side by side
- [[Variational NMC Estimator]] — NMC with a learned proposal; asymptotically consistent
- [[Convergence Rates and Estimator Selection]] — the $\mathcal{O}(T^{-1/2})$ guarantee that beats NMC
