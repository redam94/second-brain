---
title: SMM Estimation of Factor Copulas
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Oh-Patton-2012-Factor-Copulas.pdf]]"
source_location: "Sec. 3.1-3.2, pp. 12-14; App. B, pp. 31-33"
date_ingested: 2026-06-17
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Factor Copula Construction]]"
  - "[[Multi-Factor and Block Dependence Structures]]"
used_by:
  - "[[Factor Copula Application - S&P 100 and Systemic Risk]]"
aliases:
  - SMM factor copula estimation
  - simulated method of moments copula
  - rank-based SMM
---

# SMM Estimation of Factor Copulas

> [!summary]
> Since factor copulas have no closed-form likelihood, parameters are estimated by a **simulation-based method of moments (SMM)** (Oh & Patton 2011): match a vector of **rank-based dependence measures** (Spearman's rank correlation, quantile dependence) computed from data to those computed from simulated copula draws. The estimator is **consistent and asymptotically normal** under regularity conditions when $S/T\to\infty$, with a GMM-type sandwich covariance requiring bootstrap and numerical-derivative inputs.

## Overview

The "moments" are functions of **rank statistics** — strictly, this is not classical SMM (moments are not raw sample moments), but the asymptotics parallel SMM/GMM. Rank-based measures are **"pure" measures of dependence**: invariant to the marginals, so they isolate the copula. The data model is **semiparametric**: parametric conditional mean/variance dynamics, nonparametric (empirical CDF) marginals, and a parametric (factor) copula. Marginals are estimated in a first stage; copula parameters in a second stage by SMM on the standardized residuals.

## Main Content

> [!definition] Data generating process (semiparametric)
> The DGP (as in Chen & Fan 2006, Rémillard 2010, Oh & Patton 2011):
> $$
> \mathbf{Y}_t = \boldsymbol{\mu}_t(\boldsymbol{\phi}_0) + \boldsymbol{\sigma}_t(\boldsymbol{\phi}_0)\boldsymbol{\eta}_t
> $$
> $$
> \boldsymbol{\eta}_t = [\eta_{1t},\dots,\eta_{Nt}]' \sim \text{iid } \mathbf{F}_\eta = \mathbf{C}(F_1,\dots,F_N;\boldsymbol{\theta}_0)
> $$
> where $\boldsymbol{\mu}_t(\boldsymbol{\phi})$ and $\boldsymbol{\sigma}_t(\boldsymbol{\phi}) = \text{diag}\{\sigma_{1t}(\boldsymbol{\phi}),\dots,\sigma_{Nt}(\boldsymbol{\phi})\}$ are $\mathcal{F}_{t-1}$-measurable (functions of past data) and independent of $\boldsymbol{\eta}_t$. The $r\times 1$ dynamic parameter $\boldsymbol{\phi}_0$ is $\sqrt{T}$-consistently estimable. The copula is parameterized by the $p\times 1$ vector $\boldsymbol{\theta}_0 \in \boldsymbol{\Theta}$, estimated by SMM. Marginals are estimated nonparametrically via the empirical distribution function. The conditional copula is assumed **constant** (time-varying copulas need non-trivial asymptotic adjustments, not treated here).
^def-dgp

> [!definition] SMM objective function
> Estimate $\boldsymbol{\theta}_0$ from standardized residuals $\hat\eta_t \equiv \boldsymbol{\sigma}_t^{-1}(\hat{\boldsymbol{\phi}})[\mathbf{Y}_t - \boldsymbol{\mu}_t(\hat{\boldsymbol{\phi}})]$ and simulations from the copula. Let $\tilde{\mathbf{m}}_S(\boldsymbol{\theta})$ be the $m\times 1$ vector of dependence measures from $S$ simulations $\{\mathbf{X}_s\}_{s=1}^S$ of $\mathbf{F}_x(\boldsymbol{\theta})$, and $\hat{\mathbf{m}}_T$ the same measures from the residuals $\{\hat\eta_t\}_{t=1}^T$. The estimator:
> $$
> \hat{\boldsymbol{\theta}}_{T,S} \equiv \arg\min_{\boldsymbol{\theta}\in\boldsymbol{\Theta}} Q_{T,S}(\boldsymbol{\theta})
> $$
> $$
> Q_{T,S}(\boldsymbol{\theta}) \equiv \mathbf{g}_{T,S}'(\boldsymbol{\theta})\,\hat{W}_T\,\mathbf{g}_{T,S}(\boldsymbol{\theta}), \qquad \mathbf{g}_{T,S}(\boldsymbol{\theta}) \equiv \hat{\mathbf{m}}_T - \tilde{\mathbf{m}}_S(\boldsymbol{\theta})
> $$
> where $\hat{W}_T$ is a positive-definite weight matrix (may depend on data). The application uses the **identity weight matrix** $W=I$ (coverage rates are better than with the efficient weight matrix).
^def-objective

> [!definition] Dependence measures used as moments (App. B)
> The five "pure" dependence measures per pair: pairwise **Spearman's rank correlation** and **quantile dependence** at $q = [0.05, 0.10, 0.90, 0.95]$. They are invariant to the marginals, so they reflect only the copula. Let $\delta_{ij}$ be one such measure between variables $i,j$, forming the pairwise dependence matrix $D$ (entries $\delta_{ij}$, ones on the diagonal). To avoid $5N(N-1)/2$ moments in high dimension, the model's (block) equidependence is exploited:
> - **Equidependence model:** match the *average* of each measure across all pairs, $\bar\delta \equiv \frac{2}{N(N-1)}\sum_{i<j}\hat\delta_{ij}$ → just **5 moments**.
> - **Flexible weights:** use the $N$-vector of row-averages $\bar\delta_i \equiv \frac{1}{N}\sum_j \hat\delta_{ij}$ (variable $i$'s average dependence with all others) → **$5N$ moments** (model has $O(N)$, not $O(N^2)$, parameters).
> - **Block equidependence:** average within/between blocks to an $M\times M$ matrix $D^*$, then row-average to an $M$-vector → **$5M$ moments** (see [[Multi-Factor and Block Dependence Structures]]).
^def-measures

> [!theorem] Consistency and asymptotic normality (Oh & Patton 2011)
> Under regularity conditions, if $S/T\to\infty$ as $T\to\infty$, the SMM estimator is consistent and asymptotically normal:
> $$
> \sqrt{T}\left(\hat{\boldsymbol{\theta}}_{T,S} - \boldsymbol{\theta}_0\right) \xrightarrow{d} N(0,\Omega_0) \quad \text{as } T,S\to\infty
> $$
> $$
> \Omega_0 = (G_0' W_0 G_0)^{-1} G_0' W_0 \Sigma_0 W_0 G_0 (G_0' W_0 G_0)^{-1}
> $$
> where $\Sigma_0 \equiv \text{avar}[\hat{\mathbf{m}}_T]$ (asymptotic variance of the sample dependence measures), $G_0 \equiv \nabla_\theta \mathbf{g}_0(\boldsymbol{\theta}_0)$ (gradient of the limiting moment function), and $\mathbf{g}_0(\boldsymbol{\theta}) \equiv \text{p-lim}_{T,S\to\infty}\, \mathbf{g}_{T,S}(\boldsymbol{\theta})$. This is the standard **GMM sandwich form**, but $\Sigma_0$ and $G_0$ require non-standard estimation (the moments are rank statistics, and $\mathbf{g}_0$ is only available via simulation). (When $S/T\to 0$ instead, the rate becomes $\sqrt{S}$; here $S\gg T$ so the $\sqrt{T}$ case applies.)
^thm-asymptotics

> [!definition] Estimating the covariance: bootstrap + numerical derivative
> - $\Sigma_0$ is consistently estimated by a simple **iid bootstrap** of the dependence measures (1000 bootstraps in the application).
> - $G_0$ is consistently estimated by a **numerical derivative** $\hat{G}$ of $\mathbf{g}_{T,S}(\boldsymbol{\theta})$ at $\hat{\boldsymbol{\theta}}_{T,S}$, **provided the step size $\varepsilon_T \to 0$ slower than $T^{-1/2}$**. This condition is crucial: for $T=1000$ a step size $\varepsilon_T > 0.03$ is implied, *much larger* than typical numerical-derivative defaults ($\sim 6\times10^{-6}$ in Matlab). Coverage rates collapse if the step is too small (e.g. 38% coverage for a nominal 95% CI at $\varepsilon_T=0.0001$); $\varepsilon_T \in \{0.01, 0.03, 0.1\}$ give near-nominal coverage. The application uses $\varepsilon_T = 0.1$.
> - A **$J$-test of over-identifying restrictions** is available (Proposition 4 of Oh & Patton 2011); with $W=I$ it has a non-standard distribution whose critical values depend on $\hat{G}$ and are obtained by simulation.
^def-covariance

## Examples

> [!example] Efficiency cost of SMM vs ML and GMM (Normal copula)
> **Setup:** The Normal factor copula has a closed-form likelihood, so SMM can be benchmarked against MLE and (infeasible-moment) GMM. Simulation with $T=1000$, $S=25T$, $N\in\{3,10,100\}$.
> **Result:** SMM estimates are centered on true values (small bias relative to std). ML is always more efficient, but the loss from MLE→SMM is **moderate: ~25% for $N=3$ down to ~10% for $N=100$**. The loss from GMM→SMM (cost of simulating the moment function) is **at most 3%**, in some $N=100$ cases slightly negative. Adding parameters reduces precision; increasing $N$ (with equidependence) *improves* precision since more information bears on the same parameters.
> **Interpretation:** Moving to SMM because of the missing likelihood costs little efficiency, and the method scales well to high dimensions.

## Connections

- [[Factor Copula Construction]] — supplies the copula $\mathbf{C}(\boldsymbol{\theta})$ to simulate from.
- [[Multi-Factor and Block Dependence Structures]] — block averaging that makes high-dim moment-matching feasible.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — applies this estimator to 100 stocks.
- [[SMM Estimator for Copulas]] — the companion Oh & Patton (2011) paper deriving this estimator and its asymptotics in full.
- [[SMM Copula Asymptotic Theory]] — companion note on the consistency/normality proofs.
- [[Dependence Measures for Copulas]] — companion note detailing rank correlation and quantile dependence as "pure" measures.

## See Also

- [[19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]] — general SMM exposition (Evans 2024); this factor-copula application is a flagship use of the method.
- [[Method of Simulated Moments]] — the underlying MSM/GMM framework.
- [[SMM Weighting Matrix and Inference]] — weight-matrix choice and inference in SMM generally.
- [[Bayesian copula estimation Describing correlated joint distributions]] — contrast: a **Bayesian** (PyMC) Gaussian-copula estimation, vs the **frequentist** simulation-based moment-matching used here.
- [[../_Index|Econometrics]]
