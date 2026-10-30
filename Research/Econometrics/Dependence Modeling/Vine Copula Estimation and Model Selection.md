---
title: "Vine Copula Estimation and Model Selection"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/vine-copula-references.md]]"
source_location: "Aas et al. (2009) §3-4; Dißmann et al. (2013) §3"
date_ingested: 2026-10-30
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Structures]]"
  - "[[Pair Copula Construction]]"
used_by: []
aliases:
  - vine copula estimation
  - sequential MLE vine
  - vine model selection
  - rvinecopulib
  - VineCopula R package
  - Dißmann algorithm
---

# Vine Copula Estimation and Model Selection

> [!summary]
> Vine copula estimation combines **structure selection** (which R-vine tree sequence) with **family selection** (which bivariate copula per edge) and **parameter estimation** (MLE per pair). The dominant approach is **sequential maximum likelihood** (Aas et al. 2009): estimate Tree 1 first, extract conditional ranks via h-functions, then estimate Tree 2, and so on. Structure selection typically uses a greedy maximum-spanning-tree algorithm (Dißmann et al. 2013). Both tasks are automated in the `rvinecopulib` R/Python package.

## Overview

Unlike factor copulas (estimated globally via SMM — see [[SMM Estimation of Factor Copulas]]), vine copulas are typically estimated one tree at a time. This is possible because under the **simplifying assumption**, each tree's pair copulas are conditionally independent of the pair copulas in other trees given the lower-tree estimates. The sequential estimator is computationally attractive — it decomposes a $d$-dimensional optimisation into $d(d-1)/2$ bivariate optimisations — at some efficiency cost relative to full MLE.

## Main Content

> [!definition] Sequential maximum likelihood (Aas et al. 2009)
> **Step 0:** Estimate marginals $\hat{F}_i$ separately (parametric, kernel, or empirical). Compute pseudo-observations $\hat{u}_i = \hat{F}_i(y_i)$.
>
> **Step 1:** For each edge $e = \{j,k\} \in E_1$ (Tree 1, unconditional pairs), estimate:
> $$\hat{\boldsymbol{\theta}}_{jk} = \argmax_{\boldsymbol{\theta}} \sum_{t=1}^{T} \log c_{jk}(\hat{u}_{jt}, \hat{u}_{kt};\, \boldsymbol{\theta})$$
>
> **Step $\ell$ ($\ell = 2,\dots,d-1$):** For each edge $e = \{a,b\} \in E_\ell$:
> 1. Compute the conditional pseudo-observations using the h-function with previously estimated parameters:
>    $$\hat{v}_{j(e),t} = h(\hat{u}_{j(e),t|D(e)} \mid \hat{u}_{k(e),t|D(e)};\, \hat{\boldsymbol{\theta}}_{j(e),k(e)|D^{-}(e)})$$
>    where $D^{-}(e)$ is the reduced conditioning set from the previous level.
> 2. Estimate $\hat{\boldsymbol{\theta}}_{j(e),k(e)|D(e)}$ by MLE using $(\hat{v}_{j(e),t}, \hat{v}_{k(e),t})_{t=1}^T$.
>
> **Asymptotic properties:** The sequential estimator is consistent and asymptotically normal under mild regularity conditions. It is *not* fully efficient (the full MLE, which jointly optimises all $d(d-1)/2$ parameter sets simultaneously, is more efficient) but is much faster, especially for large $d$.
> ^def-seqmle

> [!definition] Full maximum likelihood
> Jointly maximize the complete vine log-likelihood:
> $$\hat{\boldsymbol{\Theta}} = \argmax_{\boldsymbol{\Theta}} \sum_{t=1}^{T} \log f_{\mathcal{V}}(y_{1t},\dots,y_{dt};\boldsymbol{\Theta})$$
> where $\boldsymbol{\Theta}$ collects all pair-copula parameters. The sequential estimate $\hat{\boldsymbol{\Theta}}_{\text{seq}}$ is used as starting values. Full MLE is practical for $d \leq 10$–$20$; for higher $d$ the Jacobian computation via the h-function recursion becomes expensive. Most software defaults to sequential.
> ^def-fullmle

> [!definition] Vine structure selection (Dißmann et al. 2013)
> **Greedy maximum-spanning-tree (MST) algorithm:**
>
> 1. Compute all $\binom{d}{2}$ pairwise absolute Kendall's $\tau$ values (or Spearman's $\rho$, or a penalised likelihood criterion).
> 2. Find $T_1^* = \argmax_{T_1} \sum_{e \in E_1} |\hat{\tau}_{j(e),k(e)}|$ — the maximum spanning tree (Kruskal's or Prim's algorithm).
> 3. After estimating Tree 1 parameters, compute conditional pseudo-observations (h-function), then compute pairwise conditional $|\hat{\tau}|$ values for all valid Tree 2 pairs (those satisfying the proximity condition).
> 4. Find $T_2^*$ as the maximum spanning tree on valid pairs.
> 5. Repeat for Trees $3,\dots,d-1$.
>
> **Rationale:** By placing the strongest pairwise dependencies in the first tree, the simplifying assumption is better justified for higher trees (residual dependence after conditioning is typically small). This also concentrates the explanatory power where misspecification matters most.
>
> **Alternative:** AIC/BIC-based structure selection jointly evaluates tree structure and bivariate copula family; this is more principled but computationally expensive. Implemented in `rvinecopulib` via `vine()`.
> ^def-mst

> [!definition] Bivariate copula family selection per edge
> For each edge, select the bivariate copula family from a candidate set by AIC (or BIC):
> $$\hat{F}_{e} = \argmin_{F \in \mathcal{F}} \left[-2\,\ell(\hat{\boldsymbol{\theta}}_F) + 2\,k_F\right]$$
> where $k_F$ is the number of parameters of family $F$. Candidate families typically include:
>
> | Family | Parameters | Tail dependence | Asymmetry |
> |---|---|---|---|
> | Gaussian | $\rho \in (-1,1)$ | None | Symmetric |
> | Student's $t$ | $(\rho, \nu)$; $\nu>2$ | Symmetric upper/lower | Symmetric |
> | Clayton | $\theta > 0$ | Lower only | Asymmetric |
> | Gumbel | $\theta \geq 1$ | Upper only | Asymmetric |
> | Frank | $\theta \in \mathbb{R}$ | None | Symmetric |
> | Joe | $\theta \geq 1$ | Upper only | Asymmetric |
> | BB1 (Clayton-Gumbel) | $(\delta, \theta)$ | Both | Asymmetric |
> | Rotated variants | — | Lower/Upper flipped | — |
> | Independence | 0 | None | — |
>
> **Vine truncation:** If AIC selects the independence copula for all edges in Tree $\ell$ (conditional dependencies at that level are negligible), truncate the vine at level $\ell-1$. A **truncated vine** at level $m < d-1$ uses only $m$ trees and $\sum_{k=1}^{m}(d-k)$ pair copulas, reducing parameters significantly.
> ^def-family-selection

## Software

> [!definition] `rvinecopulib` (R and Python via `pyvinecopulib`)
> The standard package for vine copula estimation, wrapping a fast C++ library:
> ```r
> library(rvinecopulib)
>
> # Fit a vine copula to data matrix (n × d), pseudo-observations in [0,1]
> fit <- vinecop(data = u_matrix,           # n×d matrix of pseudo-observations
>                family_set = "parametric", # candidate families
>                structure = NA,            # NA = automatic MST selection
>                selcrit = "bic",           # selection criterion: "aic" or "bic"
>                par_method = "mle",        # estimation: "mle" (sequential) or "itau" (fast)
>                trunc_lvl = Inf)           # Inf = no truncation; integer = truncate
>
> summary(fit)      # shows selected vine structure and pair copulas
> plot(fit)         # tree diagram
>
> # Simulate from fitted vine
> u_sim <- rvinecop(n = 1000, vinecop = fit)
>
> # Evaluate log-density
> loglik <- sum(log(dvinecop(u_new, fit)))
>
> # H-function (conditional CDF)
> v <- hbicop(u = 0.7, cond_var = 2, bicop = fit$pair_copulas[[1]][[1]], inverse = FALSE)
> ```
>
> **Key functions:**
> - `vinecop()` — fit vine copula; auto-selects structure and family
> - `bicop()` — fit a single bivariate copula
> - `rvinecop()` — simulation
> - `dvinecop()` — density evaluation
> - `hbicop()` — h-function and its inverse
> ^def-rvinecopulib

> [!definition] `VineCopula` (R, older package)
> ```r
> library(VineCopula)
>
> # Automatic structure + family selection
> fit <- RVineStructureSelect(data = u_matrix,
>                             familyset = c(1,2,3,4,5),  # 1=Gauss,2=t,3=Clayton,4=Gumbel,5=Frank
>                             type = 0,                   # 0=RVine, 1=CVine, 2=DVine
>                             selectioncrit = "AIC")
>
> # Inspect the fitted vine
> fit$family        # matrix of selected families
> fit$par           # matrix of estimated parameters
> fit$RVM           # RVineMatrix object
>
> # Simulate and evaluate
> u_sim <- RVineSim(N = 1000, RVM = fit)
> loglik <- RVineLogLik(data = u_new, RVM = fit)
> ```
> ^def-vineCopula

## Connection to the Factor Copula

The Oh & Patton (2012) factor copula estimated via SMM (see [[SMM Estimation of Factor Copulas]]) and the vine copula estimated via sequential MLE are both high-dimensional copula models, but they use fundamentally different estimation strategies:

| Aspect | Factor copula (SMM) | Vine copula (seq. MLE) |
|---|---|---|
| **Likelihood** | No closed form → SMM | Closed form via PCC → MLE |
| **Parameters** | Very few (factor distributions + loadings) | $d(d-1)/2$ bivariate copula params |
| **Scalability** | Scales to $d=100$+ | Practical up to $d \approx 30$–$50$ |
| **Flexibility** | All pairs use the same bivariate structure | Different family per pair |
| **Pre-filtering** | AR(1)-GJR-GARCH marginals → rank transforms | Same: fit marginals first |
| **Theory** | Consistency+normality via SMM theory | Consistency+normality of MLE |

A natural hybrid: use vine copulas for the cross-sectional structure at moderate $d$, with GARCH marginal filtering (see [[Factor Copula Application - S&P 100 and Systemic Risk]] for the marginal step).

## Connections

- [[Pair Copula Construction]] — the density formula and h-function recursion that enables sequential MLE.
- [[Regular Vine Structures]] — the tree structures and the greedy MST algorithm.
- [[Vine Copulas - Overview]] — motivation, simplifying assumption, comparison with factor copulas.
- [[SMM Estimation of Factor Copulas]] — the competing estimation approach for the factor copula.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used as edge weights in tree selection.

## See Also

- [[Factor Copula Application - S&P 100 and Systemic Risk]] — high-dimensional copula application with AR(1)-GJR-GARCH marginals; same marginal pre-filtering step applies to vine copulas.
- [[SMM Estimator for Copulas]] — asymptotic theory for SMM; contrast with the sequential MLE approach here.
- [[Econometrics/_Index|Econometrics]]
