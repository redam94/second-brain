---
title: "Ji 2024 - Infinitesimal Jackknife Standard Errors"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Sec. 3-3.1, Eqs. (4)-(5) and clustered extension, pp. 8-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Ji 2024 - Asymmetric Laplace Working Likelihood]]"
used_by:
  - "[[Ji 2024 - Simulation Results and Applications]]"
aliases:
  - infinitesimal jackknife
  - IJ standard errors
  - Giordano Broderick influence function
  - cluster robust IJ
---

# Ji 2024 - Infinitesimal Jackknife Standard Errors

> [!summary]
> The Bayesian infinitesimal jackknife approximates the resampling (bootstrap) variance of a posterior mean using a first-order expansion in data-point weights. The influence of unit $i$ is $n\,\mathrm{cov}_{\theta\mid D}[\theta,\ell_i(D\mid\theta)]$ - computable from a single MCMC run if per-unit log-likelihood contributions are saved. A cluster version sums the influence over clusters.

## Overview

Resampling-based SEs (bootstrap, jackknife) are standard in frequentist quantile regression (Bose and Chatterjee 2003; Portnoy 2014; Koenker 2021) but infeasible for repeated MCMC. IJ (Jaeckel 1972; Jennrich 2008 in covariance structure analysis; Giordano and Broderick 2024 for Bayes, built on Giordano et al. 2018, 2020; Giordano 2020) gives a linear approximation. The R package `StanSensitivity` computes IJ for sensitivity analysis; the authors' `IJSE` is tailored to `brms`.

## Main Content

> [!definition] Weighted log-likelihood and resampling weights
> Let $\mathbf w\in\mathbb R^n$ have $w_i$ = number of times unit $i$ appears in a resample. The weighted log-likelihood is $\sum_{i=1}^nw_i\ell_i(D\mid\theta)$ ($\ell_i$ = contribution of unit $i$).
^def-weights

> [!theorem] Linear approximation of the resampled posterior mean (Eqs. 4-5; Giordano et al. 2018, Thm. 1; Efron 2015)
> $$
> E(\theta\mid D,\mathbf w)\approx E(\theta\mid D,\mathbf 1_n)+\frac{dE(\theta\mid D,\mathbf w)}{d\mathbf w'}\Big|_{\mathbf w=\mathbf 1_n}(\mathbf w-\mathbf 1_n)=E(\theta\mid D,\mathbf 1_n)+\mathrm{cov}_{\theta\mid D}[\theta,\ell(D\mid\theta)]\,(\mathbf w-\mathbf 1_n),
> $$
> where $\ell(D\mid\theta)$ is the $n$-vector of unit log-likelihood contributions. The matrix of derivatives equals the posterior covariance of $\theta$ with each $\ell_i$; estimate it by the empirical covariance across MCMC draws.
^thm-ij-linear

> [!definition] IJ variance estimator
> Empirical influence of unit $i$: $I_i=\dfrac{dE(\theta\mid D,\mathbf w)}{dw_i}\Big|_{\mathbf w=\mathbf 1}\cdot n=n\,\mathrm{cov}_{\theta\mid D}[\theta,\ell_i(D\mid\theta)]$. Then
> $$
> \hat V^\text{IJ}=\frac{1}{n(n-1)}\sum_{i=1}^n(I_i-\bar I)(I_i-\bar I)',
> $$
> $\bar I$ the mean influence. The "standard error" is the square root of the diagonal; intervals use a normal approximation about the posterior mean.
^def-ij

> [!definition] Clustered IJ
> With $J$ clusters and $n$ units, cluster $j$ influence $I_j^{(cl)}=J\sum_{i\in j}I_i/n=J\,\mathrm{cov}_{\theta\mid D}[\theta,\ell_j^{(cl)}(D\mid\theta)]$ with $\ell_j^{(cl)}=\sum_{i\in j}\ell_i$, and
> $$
> \hat V^\text{IJ}_{(cl)}=\frac{1}{J(J-1)}\sum_{j=1}^J(I_j^{(cl)}-\bar I^{(cl)})(I_j^{(cl)}-\bar I^{(cl)})'.
> $$
> Justified by resampling entire clusters. Targets the *marginal* quantile (ignore clustering for point estimation, correct only the SE, as in Hagemann 2017's cluster-robust bootstrap); regression coefficients in cluster-specific random/fixed-effects quantile models (Koenker and Hallock 2004; Geraci and Bottai 2007, 2014; Reich et al. 2010) have no meaningful marginal interpretation.
^def-ij-cluster

**Variants.** `IJf` = IJ with $\sigma$ fixed (e.g. 1); `IJ` = IJ with $\sigma$ estimated (half-$t$(3) prior in `brms`), preferred in applications. The AL assumption of independence is violated by clustered data, which is why clustering is handled in the SE rather than the likelihood.

## Examples

> [!example] Python: IJ variance from posterior draws
> ```python
> import numpy as np
> def ij_cov(theta_draws, loglik_draws, cluster=None):
>     """theta_draws: (S, p) draws; loglik_draws: (S, n) per-unit log-lik at each draw."""
>     S, n = loglik_draws.shape
>     if cluster is None:
>         L, scale = loglik_draws, n; m = n
>     else:
>         ids = np.unique(cluster)
>         L = np.stack([loglik_draws[:, cluster == j].sum(1) for j in ids], 1)
>         m = len(ids); scale = m
>     th = theta_draws - theta_draws.mean(0)
>     Lc = L - L.mean(0)
>     infl = scale * (th.T @ Lc) / (S - 1)          # (p, m) influence matrix, cov(theta, l_i) * scale
>     infl_c = infl - infl.mean(1, keepdims=True)
>     return infl_c @ infl_c.T / (m * (m - 1))
> ```
> With PyMC use `pm.compute_log_likelihood(idata)` for the per-unit contributions, flattening chains and draws.
^ex-ij-python

## Connections

[[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] (competitor); the bootstrap-calibrated learning rate in [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] also uses resampling but tunes $\omega$ instead of the SE. Cluster-robust ideas parallel those in [[Geo-Experiment Methodology - Overview]].

## See Also

[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
