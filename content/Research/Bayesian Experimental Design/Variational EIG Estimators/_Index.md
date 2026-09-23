---
title: "Index: Variational EIG Estimators"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Experimental Design]]"
date_updated: 2026-06-27
concept_count: 5
---

# Variational EIG Estimators

> [!abstract] Routing Summary
> **Foster et al. (2019), *Variational Bayesian Optimal Experimental Design* (NeurIPS).** Four fast variational EIG estimators that beat nested Monte Carlo: $\mathcal{O}(T^{-1/2})$ vs $\mathcal{O}(T^{-1/3})$, by amortizing an intractable density across outcomes. Contains 5 notes + overview.
> - New here / which estimator do I want / baselines? → [[Variational BOED - Overview]]
> - Lower bound via posterior approximation $q_p(\theta\mid y)$ (Barber–Agakov)? → [[Variational Posterior Estimator (Barber-Agakov)]]
> - Upper bound via marginal approximation $q_m(y)$? → [[Variational Marginal Estimator]]
> - Upper bound that stays consistent even with a wrong family (NMC + proposal)? → [[Variational NMC Estimator]]
> - Implicit-likelihood (random-effects) models, two approximations $q_m,q_\ell$? → [[Implicit Likelihood Estimator]]
> - The $\mathcal{O}(T^{-1/2})$ theorem, bias²/variance table, how to choose? → [[Convergence Rates and Estimator Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Four estimators; amortization; bounds; baselines | [[Variational BOED - Overview]] | overview | [[Nested Estimation and Nested Monte Carlo]] | Cost $\mathcal{O}(N+M)$, rate $\mathcal{O}(T^{-1/2})$ |
| $\hat\mu_{\text{post}}$; BA bound; forward KL gap | [[Variational Posterior Estimator (Barber-Agakov)]] | theorem | [[Expected Information Gain]] | $\mathrm{EIG}\ge\mathbb{E}[\log\frac{q_p(\theta\mid y,d)}{p(\theta)}]$, tight iff $q_p=$ posterior |
| $\hat\mu_{\text{marg}}$; upper bound; dimension duality | [[Variational Marginal Estimator]] | theorem | [[Variational Posterior Estimator (Barber-Agakov)]] | $\mathrm{EIG}\le\mathbb{E}[\log\frac{p(y\mid\theta,d)}{q_m(y\mid d)}]$, tight iff $q_m=$ marginal |
| $\hat\mu_{\text{VNMC}}$; Lemma 1; consistency as $L\to\infty$ | [[Variational NMC Estimator]] | theorem | [[Nested Estimation and Nested Monte Carlo]] | Upper bound, monotone in $L$, $\to$ EIG even for imperfect $q_v$ |
| $\hat\mu_{m+\ell}$; Lemma 2; implicit likelihood | [[Implicit Likelihood Estimator]] | theorem | [[Variational Marginal Estimator]] | $\mathcal{I}_{m+\ell}=\mathbb{E}[\log\frac{q_\ell(y\mid\theta,d)}{q_m(y\mid d)}]$; not a bound, error bounded |
| Theorem 1; three-term error; selection rules | [[Convergence Rates and Estimator Selection]] | theorem | [[Variational BOED - Overview]] | $\mathcal{O}(T^{-1/2})$ if $N\propto K$; choose by dimension/likelihood/consistency |

## Notes

- [[Variational BOED - Overview]] — CONTAINS: research question; amortization insight; Table 1 (all four estimators, bound type, implicit?, consistent?); why bounds sandwich the EIG; baselines (NMC, Laplace, LFIRE, DV); four benchmark problems.
- [[Variational Posterior Estimator (Barber-Agakov)]] — CONTAINS: $\hat\mu_{\text{post}}$ (Eqs. 6–7); lower-bound + forward-KL-gap theorem; SGD training (Eq. 8); dimension rule; sequential form (Eq. 14).
- [[Variational Marginal Estimator]] — CONTAINS: $\hat\mu_{\text{marg}}$ (Eq. 9); upper-bound theorem; posterior-vs-marginal dimension table; sequential sampling advantage.
- [[Variational NMC Estimator]] — CONTAINS: $\hat\mu_{\text{VNMC}}$ (Eqs. 10–11); Lemma 1 (monotone tightening, exactness, KL gap); two-stage training; cost $\mathcal{O}(KL+NM)$; Fig. 2 pre-training example.
- [[Implicit Likelihood Estimator]] — CONTAINS: $\hat\mu_{m+\ell}$ (Eq. 12); Lemma 2 (error bound, constant $C$); two-density training; mixed-effects example.
- [[Convergence Rates and Estimator Selection]] — CONTAINS: three-term error decomposition; Theorem 1 ($\mathcal{O}(T^{-1/2})$); VNMC debiasing; Table 2 (bias²/var); four selection rules; optimal $K/T$ split.

## Sources
- Foster et al 2019 - Variational Bayesian Optimal Experimental Design — Foster, A., Jankowiak, M., Bingham, E., Horsfall, P., Teh, Y.W., Rainforth, T., Goodman, N. (2019), *Variational Bayesian Optimal Experimental Design*, **NeurIPS 32**, 14036–14047. arXiv:1903.05480.

## See Also
- [[Research/Bayesian Experimental Design/Gradient-Based Unified BOED/_Index|Gradient-Based Unified BOED]] — Foster 2020 makes these bounds differentiable in the design
- [[Nested Estimation and Nested Monte Carlo]] — the NMC baseline these beat
- [[Approximation Methods]] — variational inference background
