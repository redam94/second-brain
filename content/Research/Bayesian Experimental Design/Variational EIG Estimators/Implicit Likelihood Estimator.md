---
title: Implicit Likelihood Estimator
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "Foster 2019 §3 (Eqs. 12–13), Lemma 2, Appendix A"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Variational BOED - Overview]]"
  - "[[Variational Marginal Estimator]]"
used_by:
  - "[[Convergence Rates and Estimator Selection]]"
  - "[[Likelihood-Free ACE and Gradient Estimation]]"
  - "[[Q - Variational Bounds Compared from the ELBO to EIG Estimators]]"
aliases:
  - Implicit likelihood estimator
  - mu_m+l
  - m plus l estimator
  - Likelihood-free EIG estimator
---

# Implicit Likelihood Estimator

> [!summary]
> The **implicit-likelihood estimator** $\hat\mu_{m+\ell}$ handles models whose likelihood $p(y\mid\theta,d)$ can be **sampled but not evaluated** (e.g. random-effects / nuisance-variable models, where $p(y\mid\theta,d)=\mathbb{E}_{p(\psi\mid\theta)}[p(y\mid\theta,\psi,d)]$ is intractable). It learns **two** approximations — a marginal $q_m(y\mid d)$ and a likelihood $q_\ell(y\mid\theta,d)$ — and plugs both into the EIG. Unlike the other three, it is **not** a bound on the EIG, but Lemma 2 bounds its *error*, so minimizing that bound trains it.

## Overview

The posterior, marginal, and VNMC estimators all assume the likelihood $p(y\mid\theta,d)$ can be evaluated pointwise. Many important models cannot: introduce nuisance latents $\psi$ (random effects, latent confounders) and the likelihood becomes an intractable integral, even though you can still simulate $y$ by sampling $\psi$ then $y$. The variational posterior $\hat\mu_{\text{post}}$ works here unchanged (it needs only samples), but $\hat\mu_{\text{marg}}$ does not — it contains $p(y\mid\theta,d)$ explicitly. The fix is to approximate the likelihood too.

## Main Content

> [!definition] Definition: Implicit-likelihood estimator (Foster 2019, Eq. 12)
> Using a marginal approximation $q_m(y\mid d)$ and a likelihood approximation $q_\ell(y\mid\theta,d)$:
> $$
> \mathrm{EIG}(d)\approx \mathcal{I}_{m+\ell}(d) := \mathbb{E}_{p(y,\theta\mid d)}\!\left[\log\frac{q_\ell(y\mid\theta,d)}{q_m(y\mid d)}\right] \approx \hat\mu_{m+\ell}(d) := \frac1N\sum_{n=1}^N \log\frac{q_\ell(y_n\mid\theta_n,d)}{q_m(y_n\mid d)}.
> $$
> This is **not** a bound on the EIG (unlike the other three estimators).
^def-mu-ml

> [!theorem] Lemma 2 — EIG estimation error bound (Foster 2019)
> For any valid $q_m(y\mid d)$ and $q_\ell(y\mid\theta,d)$, the EIG estimation error is bounded:
> $$
> \left|\mathcal{I}_{m+\ell}(d) - \mathrm{EIG}(d)\right| \le -\mathbb{E}_{p(y,\theta\mid d)}\!\left[\log q_m(y\mid d) + \log q_\ell(y\mid\theta,d)\right] + C,
> $$
> where $C = -\mathrm{H}[p(y\mid d)] - \mathbb{E}_{p(\theta)}[\mathrm{H}[p(y\mid\theta,d)]]$ does **not** depend on $q_m$ or $q_\ell$. The RHS is $0$ **iff** $q_m=p(y\mid d)$ and $q_\ell=p(y\mid\theta,d)$ for almost all $y,\theta$.
^lemma2-ml

### Training implication

Lemma 2 says: learn $q_m$ and $q_\ell$ by **maximizing** $\mathbb{E}_{p(y,\theta\mid d)}[\log q_m(y\mid d) + \log q_\ell(y\mid\theta,d)]$ via stochastic gradient ascent (two ordinary maximum-likelihood density-estimation problems), then substitute into Eq. 12. In general $q_m$ and $q_\ell$ are learned *separately* with no weight sharing; Foster 2019 §A.4 discusses the coupled case $q_m(y\mid d)=\mathbb{E}_{p(\theta)}[q_\ell(y\mid\theta,d)]$.

### Where it sits among the four

From Foster 2019, Table 1: $\hat\mu_{m+\ell}$ is the only estimator marked **implicit-likelihood ✓** besides $\hat\mu_{\text{post}}$, and it relies on approximating a distribution over $y$ (so prefer it, like $\hat\mu_{\text{marg}}$, when $\dim(y)\ll\dim(\theta)$). It gave the lowest empirical MSE on the **mixed-effects** benchmark (the implicit-likelihood problem) in Table 2.

## Examples

> [!example] Mixed-effects / item-response model (Foster 2019 §6.1, §6.3)
> A psychology item-response model has *common* fixed effects $\theta$ (of interest) and per-participant random effects (nuisance $\psi$), making $p(y\mid\theta,d)$ implicit. $\hat\mu_{m+\ell}$ gives the best EIG accuracy here and is used to drive the **online adaptive face-perception experiment** on Mechanical Turk, producing lower-entropy posteriors than random design. See [[Sequential and Adaptive BED]].

## Connections

- **Generalizes** [[Variational Marginal Estimator|$\hat\mu_{\text{marg}}$]] (recover it when the likelihood is explicit, $q_\ell=p(y\mid\theta,d)$).
- **Anticipates** [[Likelihood-Free ACE and Gradient Estimation|likelihood-free ACE]] (Foster 2020, Theorem 2), which instead keeps the contrastive structure and replaces the likelihood with an *unnormalized* approximation while preserving a valid lower bound.
- **Related to** simulation-based / likelihood-free inference (LFIRE, ABC) for implicit models.

## See Also
- [[Variational Marginal Estimator]] — the explicit-likelihood version
- [[Variational Posterior Estimator (Barber-Agakov)]] — the other implicit-capable estimator
- [[Likelihood-Free ACE and Gradient Estimation]] — Foster 2020's bound-preserving implicit approach
- [[Neural Ratio Estimation]] — related ratio surrogates in experimental design
