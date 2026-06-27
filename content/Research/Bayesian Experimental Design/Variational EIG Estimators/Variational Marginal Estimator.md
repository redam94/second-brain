---
title: Variational Marginal Estimator
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "Foster 2019 §3 (Eq. 9), Appendix A"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Variational BOED - Overview]]"
  - "[[Variational Posterior Estimator (Barber-Agakov)]]"
used_by:
  - "[[Convergence Rates and Estimator Selection]]"
  - "[[Implicit Likelihood Estimator]]"
aliases:
  - Variational marginal estimator
  - mu_marg
  - Upper bound EIG estimator
---

# Variational Marginal Estimator

> [!summary]
> The **variational marginal estimator** $\hat\mu_{\text{marg}}$ learns an approximation $q_m(y\mid d)$ to the intractable marginal likelihood $p(y\mid d)$ and substitutes it into the likelihood form of the EIG. It yields an **upper bound** $\mathcal{U}_{\text{marg}}(d)\ge\mathrm{EIG}(d)$, tight iff $q_m$ equals the true marginal. It is the natural dual of the [[Variational Posterior Estimator (Barber-Agakov)|posterior estimator]] and is preferred when $\theta$ is high-dimensional (so a posterior approximation is hard) but $y$ is low-dimensional.

## Overview

When $\theta$ is high-dimensional, learning a good amortized *posterior* $q_p(\theta\mid y,d)$ is hard. The marginal estimator instead targets the (often lower-dimensional) outcome density: learn $q_m(y\mid d)\approx p(y\mid d)$ and plug it into the likelihood form of the EIG, $\mathbb{E}[\log p(y\mid\theta,d) - \log p(y\mid d)]$.

## Main Content

> [!definition] Definition: Variational marginal estimator (Foster 2019, Eq. 9)
> $$
> \mathrm{EIG}(d)\le \mathcal{U}_{\text{marg}}(d) := \mathbb{E}_{p(y,\theta\mid d)}\!\left[\log\frac{p(y\mid\theta,d)}{q_m(y\mid d)}\right] \approx \hat\mu_{\text{marg}}(d) := \frac1N\sum_{n=1}^N \log\frac{p(y_n\mid\theta_n,d)}{q_m(y_n\mid d)},
> $$
> with $y_n,\theta_n\overset{\text{i.i.d.}}{\sim} p(y,\theta\mid d)$. Train $q_m(y\mid d,\phi)$ by stochastic gradient descent to **minimize** $\mathcal{U}_{\text{marg}}$.
^def-mu-marg

> [!theorem] Upper-bound property and tightness
> $\mathcal{U}_{\text{marg}}(d)$ is an **upper bound** on the EIG, with equality **iff** $q_m(y\mid d)=p(y\mid d)$. The bound was studied in a mutual-information context (Poole et al. 2019) but not previously used for BOED. The gap is an expected KL from the true marginal to its approximation.
^thm-marg-bound

### Posterior vs marginal: choosing by dimension

| | Targets | Bound | Prefer when |
|---|---------|-------|-------------|
| [[Variational Posterior Estimator (Barber-Agakov)\|$\hat\mu_{\text{post}}$]] | distribution over $\theta$ | **lower** | $\dim(\theta)\ll\dim(y)$ |
| $\hat\mu_{\text{marg}}$ | distribution over $y$ | **upper** | $\dim(y)\ll\dim(\theta)$ |

The two are *complementary*: run both to **sandwich** the EIG ($\hat\mu_{\text{post}}\le\mathrm{EIG}\le\hat\mu_{\text{marg}}$) and bound a design's true value (Foster 2019 §6.1).

### Sequential advantage

In sequential BOED, $\hat\mu_{\text{marg}}$ needs only *samples* from the running posterior $p(\theta\mid d_{1:t-1},y_{1:t-1})$, not its density — unlike $\hat\mu_{\text{post}}$ and $\hat\mu_{\text{VNMC}}$. This makes it well suited to adaptive experiments where the posterior is only available through samples; it is the estimator used in the sequential CES experiment ([[High-Dimensional Design Applications]]).

## Examples

> [!example] Marginal estimator on revealed preference (Foster 2019 §6)
> On the revealed-preference economics benchmark (low-dimensional response $y$, higher-dimensional latent utility), the marginal estimator is the natural choice and is used to drive Bayesian-optimization-based design selection. In the sequential CES experiment it reduces posterior entropy and concentrates on the true parameters faster than NMC- or random-design baselines.

## Connections

- **Dual** of [[Variational Posterior Estimator (Barber-Agakov)]]: posterior↔lower, marginal↔upper.
- **Extended to implicit likelihoods** by [[Implicit Likelihood Estimator|$\hat\mu_{m+\ell}$]], which adds a *second* approximation $q_\ell(y\mid\theta,d)$ for the likelihood.
- In [[Unified SGD BOED - Overview|Foster 2020]] the marginal idea reappears as the **VNMC upper bound** used to verify designs found by ACE.

## See Also
- [[Variational Posterior Estimator (Barber-Agakov)]] — the complementary lower bound
- [[Variational NMC Estimator]] — a consistent upper bound (tight as $L\to\infty$)
- [[Implicit Likelihood Estimator]] — marginal + likelihood approximations for implicit models
