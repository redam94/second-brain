---
title: Variational NMC Estimator
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "Foster 2019 §3 (Eqs. 10–11), Lemma 1, Appendix A"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Variational BOED - Overview]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
used_by:
  - "[[Convergence Rates and Estimator Selection]]"
  - "[[High-Dimensional Design Applications]]"
aliases:
  - Variational NMC
  - VNMC
  - mu_VNMC
---

# Variational NMC Estimator

> [!summary]
> The **variational nested Monte Carlo (VNMC)** estimator $\hat\mu_{\text{VNMC}}$ combines a learned posterior proposal $q_v(\theta\mid y,d)$ with importance-sampled NMC. It gives an **upper bound** $\mathcal{U}_{\text{VNMC}}(d,L)$ on the EIG that is tight when $q_v$ is the true posterior **or** as the number of inner samples $L\to\infty$. This is the key property: VNMC is the *only* one of the four estimators that remains **asymptotically consistent even when the variational family does not contain the target** — it trades NMC's slow consistency against variational speed.

## Overview

The posterior and marginal estimators are fast but converge to a *biased* answer if the variational family cannot represent the target. NMC has the opposite profile: unbiased in the limit but slow. VNMC interpolates: use a learned proposal to make NMC efficient, keeping NMC's asymptotic consistency. Think of it as NMC ([[Nested Estimation and Nested Monte Carlo]]) where the inner importance-sampling proposal $q_v$ is *learned* rather than fixed to the prior.

## Main Content

> [!definition] Definition: VNMC bound and estimator (Foster 2019, Eqs. 10–11)
> The upper bound uses one sample $y,\theta_0$ from the model and $L$ samples $\theta_{1:L}$ from the proposal:
> $$\mathrm{EIG}(d)\le \mathcal{U}_{\text{VNMC}}(d,L) := \mathbb{E}\!\left[\log p(y\mid\theta_0,d) - \log\frac1L\sum_{\ell=1}^L \frac{p(\theta_\ell,y\mid d)}{q_v(\theta_\ell\mid y,d)}\right],$$
> expectation over $y,\theta_0\sim p(y,\theta_0\mid d)\prod_{\ell=1}^L q_v(\theta_\ell\mid y,d)$. The final EIG estimator uses $M\gg L$ inner samples after training $\phi$:
> $$\hat\mu_{\text{VNMC}}(d) := \frac1N\sum_{n=1}^N\!\left(\log p(y_n\mid\theta_{n,0},d) - \log\frac1M\sum_{m=1}^M \frac{p(y_n,\theta_{n,m}\mid d)}{q_v(\theta_{n,m}\mid y_n,d,\phi_K)}\right).$$
^def-vnmc

> [!theorem] Lemma 1 — Properties of the VNMC bound (Foster 2019)
> For any model $p(\theta)p(y\mid\theta,d)$ and valid $q_v(\theta\mid y,d)$:
> 1. **Monotone tightening:** $\lim_{L\to\infty}\mathcal{U}_{\text{VNMC}}(d,L) = \mathrm{EIG}(d)$ and $\mathcal{U}_{\text{VNMC}}(d,L_2)\le\mathcal{U}_{\text{VNMC}}(d,L_1)$ for $L_2\ge L_1\ge 1$.
> 2. **Exactness:** $\mathcal{U}_{\text{VNMC}}(d,L)=\mathrm{EIG}(d)\ \forall L\ge 1$ **iff** $q_v(\theta\mid y,d)=p(\theta\mid y,d)$ for all $y,\theta$.
> 3. **Gap as expected KL:** $\mathcal{U}_{\text{VNMC}}(d,L)-\mathrm{EIG}(d) = \mathbb{E}_{p(y\mid d)}\!\left[\mathrm{KL}\!\left(\prod_{\ell=1}^L q_v(\theta_\ell\mid y,d)\,\big\|\,\frac1L\sum_{\ell}p(\theta_\ell\mid y,d)\prod_{k\ne\ell}q_v(\theta_k\mid y,d)\right)\right]$.
^lemma1-vnmc

### The defining advantage: consistency without a perfect family

Property 1 means we can obtain **asymptotically unbiased EIG estimates even for an imperfect $q_v$** simply by increasing $L$. Training: first run $K$ steps of stochastic gradient on $\mathcal{U}_{\text{VNMC}}(d,L)$ with fixed $L$ (fast, cost $KL$); then form the final NMC estimator with $M\gg L$ (slow refinement, cost $NM$), removing residual bias. Standard NMC is the special case where the proposal is naively the prior ($q_v=p(\theta)$) — it skips the cheap first stage and so needs a far larger budget for the same accuracy.

### Cost and rate

Total cost is $T=\mathcal{O}(KL + NM)$. With the $M\propto\sqrt N$ NMC allocation, $\hat\mu_{\text{VNMC}}$ converges at $\mathcal{O}((NM)^{-1/3})$ in its second stage — and unlike $\hat\mu_{\text{post}}/\hat\mu_{\text{marg}}$, it **keeps improving past the variational plateau** because it removes asymptotic bias (Foster 2019, Fig. 2).

## Examples

> [!example] VNMC pre-training (Foster 2019 §6.2, Fig. 2)
> On the A/B-test design point, plotting EIG estimates with $M=\sqrt N$ and "0 steps" of pre-training corresponds to plain NMC. Spending some budget training $q_v$ (125–2500 steps) gives noticeably better estimates, and increasing $N,M$ continues to improve — VNMC does not plateau like the pure variational estimators.

## Connections

- **Bridges** [[Nested Estimation and Nested Monte Carlo|NMC]] (consistent, slow) and the variational estimators (fast, biased). Foster 2019 notes the variational/MC interplay is *not* analogous to standard inference because the NMC EIG estimator is itself inherently biased.
- In [[Unified SGD BOED - Overview|Foster 2020]], the VNMC *upper* bound is paired with the ACE *lower* bound to trap the true EIG when verifying high-dimensional designs.
- Property 3 (gap = expected KL of a product proposal) parallels the **importance-weighted autoencoder (IWAE)** bound structure.

## See Also
- [[Adaptive Contrastive Estimation (ACE)]] — the lower-bound contrastive counterpart, also tight as $L\to\infty$
- [[Variational Marginal Estimator]] — the other upper bound (biased if family wrong)
- [[Convergence Rates and Estimator Selection]] — full rate analysis (Theorem 1) and selection guidance
