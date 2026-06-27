---
title: Variational Posterior Estimator (Barber-Agakov)
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "Foster 2019 §3 (Eqs. 6–8), Appendix A"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Variational BOED - Overview]]"
  - "[[Expected Information Gain]]"
used_by:
  - "[[Adaptive Contrastive Estimation (ACE)]]"
  - "[[Convergence Rates and Estimator Selection]]"
aliases:
  - Variational posterior estimator
  - Barber-Agakov bound
  - BA bound
  - mu_post
---

# Variational Posterior Estimator (Barber-Agakov)

> [!summary]
> The **variational posterior estimator** $\hat\mu_{\text{post}}$ learns an amortized approximation $q_p(\theta\mid y,d)$ to the true posterior and substitutes it into the EIG. It yields a **lower bound** $\mathcal{L}_{\text{post}}(d)\le\mathrm{EIG}(d)$, tight iff $q_p$ equals the true posterior. This is the **Barber–Agakov (BA)** mutual-information bound, here connected to experimental design for the first time. Best when $\dim(\theta)\ll\dim(y)$.

## Overview

The posterior form of the EIG ([[Expected Information Gain]]) needs the intractable posterior $p(\theta\mid y,d)$. Rather than run inference separately for every outcome $y$ (as NMC effectively does), we **amortize** the inner expectation: learn one parametric family $q_p(\theta\mid y,d,\phi)$ that maps any outcome $y$ to an approximate posterior, then reuse it everywhere.

## Main Content

> [!definition] Definition: Variational posterior estimator (Foster 2019, Eqs. 6–7)
> Define the lower bound and its Monte Carlo estimator:
> $$\mathrm{EIG}(d)\ge \mathcal{L}_{\text{post}}(d) := \mathbb{E}_{p(y,\theta\mid d)}\!\left[\log\frac{q_p(\theta\mid y,d)}{p(\theta)}\right] \approx \hat\mu_{\text{post}}(d) := \frac1N\sum_{n=1}^N \log\frac{q_p(\theta_n\mid y_n,d)}{p(\theta_n)},$$
> with $y_n,\theta_n\overset{\text{i.i.d.}}{\sim} p(y,\theta\mid d)$ (sample $\theta\sim p(\theta)$ then $y\sim p(y\mid\theta,d)$).
^def-mu-post

> [!theorem] Lower-bound property and tightness (Foster 2019, Appendix A)
> $\mathcal{L}_{\text{post}}(d)$ is a **lower bound** on the EIG, $\mathrm{EIG}(d)\ge\mathcal{L}_{\text{post}}(d)$, with equality **iff** $q_p(\theta\mid y,d)=p(\theta\mid y,d)$ for almost all $y$. The gap is the expected KL divergence from the true posterior to the approximation:
> $$\mathrm{EIG}(d) - \mathcal{L}_{\text{post}}(d) = \mathbb{E}_{p(y\mid d)}\!\left[\mathrm{KL}\!\left(p(\theta\mid y,d)\,\|\,q_p(\theta\mid y,d)\right)\right]\ge 0.$$
> This is the **Barber–Agakov (2003)** bound, originally for mutual information over noisy channels; the connection to experiment design had not previously been made.
^thm-ba-bound

### Training the variational parameters

Optimize $\phi$ by maximizing the bound — no reparameterization needed because $p(y,\theta\mid d)$ does not depend on $\phi$ (Foster 2019, Eq. 8):
$$\phi^\* = \arg\max_\phi \mathbb{E}_{p(y,\theta\mid d)}\!\left[\log\frac{q_p(\theta\mid y,d,\phi)}{p(\theta)}\right], \qquad \nabla_\phi\mathcal{L}_{\text{post}} \approx \frac1S\sum_{i=1}^S \nabla_\phi\log q_p(\theta_i\mid y_i,d,\phi).$$
Maximizing $\mathcal{L}_{\text{post}}$ is equivalent to minimizing the expected *forward* KL $\mathbb{E}_{p(y\mid d)}[\mathrm{KL}(p(\theta\mid y,d)\,\|\,q_p)]$ — i.e. learning an amortized proposal by moment-matching the true posterior.

### When to use it

Because $\hat\mu_{\text{post}}$ amortizes a distribution over $\theta$, it is preferable when $\dim(\theta)\ll\dim(y)$ (a simpler density-estimation target than $\hat\mu_{\text{marg}}$). Empirically (Foster 2019, Fig. 1) it **substantially outperforms** the marginal estimator on the A/B-test benchmark, plausibly because $\theta$ is lower-dimensional than $y$ there.

## Examples

> [!example] Sequential BOED form (Foster 2019, Eq. 14)
> In iterated design the prior $p(\theta)$ becomes the running posterior $p(\theta\mid d_{1:t-1},y_{1:t-1})$. Substituting and dropping the design-independent constant $\log p(y_{1:t-1}\mid d_{1:t-1})$ gives a usable bound — but note $\hat\mu_{\text{post}}$ requires the *density* of the running posterior (a limitation the marginal/implicit estimators avoid).

## Connections

- **Is the one-stage** [[Adaptive Contrastive Estimation (ACE)|ACE]] **bound's predecessor**: Foster 2020's $I_{BA}$ is exactly this bound, now optimized jointly over design and variational parameters; ACE then improves on it by adding contrastive samples.
- **Lower bound** — pairs with the **upper bounds** $\hat\mu_{\text{marg}}$ / $\hat\mu_{\text{VNMC}}$ to sandwich the EIG.
- **Same KL-gap structure** appears in the ELBO / variational inference generally.

## See Also
- [[Variational Marginal Estimator]] — the dual (upper) bound targeting $p(y\mid d)$
- [[Adaptive Contrastive Estimation (ACE)]] — the joint-optimization successor
- [[Convergence Rates and Estimator Selection]] — $\mathcal{O}(T^{-1/2})$ rate and estimator choice
