---
title: Vine Structure Selection and Sequential MLE
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/r-vineCopula
source: "[[raw/Aas-2009-Czado-2019-Vine-Copulas-Survey.md]]"
source_location: "Aas et al. (2009) Secs. 4-5; Czado (2019) Chs. 5-7; Dißmann et al. (2013)"
date_ingested: 2026-08-05
date_updated: 2026-08-05
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - vine estimation
  - sequential vine MLE
  - RVineStructureSelect
  - Dißmann algorithm
  - vine model selection AIC
---

# Vine Structure Selection and Sequential MLE

> [!summary]
> Fitting a vine copula requires choosing (i) the vine **structure** (which tree $T_t$ connects which nodes), (ii) a **family** for each pair-copula, and (iii) estimating the **parameters** $\theta$. The dominant practical approach is **sequential (tree-by-tree) MLE**: fit tree $T_1$ first, transform observations to conditional uniforms via h-functions, then fit $T_2$, and so on. Structure selection typically uses **maximum spanning trees** on the absolute empirical Kendall's $\tau$ matrix. Family selection uses **AIC or BIC** over a menu of bivariate families. The **VineCopula** and **rvinecopulib** R packages implement this workflow.

## Overview

Unlike parametric families such as the Gaussian copula (one matrix inversion) or factor copulas (SMM on rank statistics), vine copulas require choosing the tree structure and pair-copula families simultaneously with estimating parameters. Three decisions nest:

1. **Structure** (vine tree sequence) — which variables are "close" at each level of conditioning.
2. **Family** for each pair-copula — Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, or rotation variants.
3. **Parameters** — MLE or method of moments within each chosen family.

These are often addressed sequentially rather than jointly, following the approach of Aas et al. (2009) and the Dißmann et al. (2013) structure-selection algorithm.

## Main Content

> [!definition] Sequential MLE Algorithm
> **Input:** Pseudo-observations $\hat{u}_{k,t} = \hat{F}_k(x_{k,t})$ for $k = 1, \ldots, d$ and $t = 1, \ldots, T$, obtained from probability-integral-transforming the data with estimated marginals (ECDF or parametric fit).
>
> **For tree $T_1$:**
> 1. Compute all pairwise empirical Kendall's $\tau$ values.
> 2. Find the tree $T_1$ (structure selection; see Dißmann algorithm below).
> 3. For each edge $(i,j)$ in $T_1$: select pair-copula family and estimate $\hat{\theta}_{ij}$ by bivariate MLE or $\tau$-inversion.
> 4. Compute conditional pseudo-observations: $\hat{v}_{ij,t} = h(\hat{u}_{i,t} | \hat{u}_{j,t}; \hat{\theta}_{ij})$ for use in $T_2$.
>
> **For tree $T_\ell$ ($\ell \geq 2$):**
> 1. Treat the conditional pseudo-observations $\hat{v}_{e,t}$ (output of $T_{\ell-1}$) as new data.
> 2. Compute pairwise empirical $\tau$ on these conditional pseudo-observations.
> 3. Find tree $T_\ell$ structure (Dißmann: maximum spanning tree on $|\hat{\tau}|$).
> 4. For each edge in $T_\ell$: select family and estimate $\hat{\theta}_e$ by bivariate MLE.
> 5. Compute new conditional pseudo-observations via h-functions for $T_{\ell+1}$.
>
> **Result:** A fitted vine specification $\hat{V} = \{(T_1, \ldots, T_{d-1}), (F_e)_{e \in E_t}, (\hat{\theta}_e)_{e \in E_t}\}$.
>
> **Note:** Sequential MLE is consistent but not fully efficient — each tree uses previously-estimated conditional transforms without accounting for their estimation uncertainty. **Full MLE** (joint maximization of the vine log-likelihood over all parameters simultaneously) is more efficient but computationally expensive for $d \geq 6$ and prone to convergence issues.
^def-sequential-mle

> [!definition] Structure Selection: Dißmann et al. (2013) Algorithm
> **Goal:** Select $T_1, \ldots, T_{d-1}$ to maximize total absolute Kendall's $\tau$ across edges.
>
> **Step 1 — Tree $T_1$:** Construct a complete weighted graph on nodes $\{1, \ldots, d\}$ with edge weights $|\hat{\tau}_{ij}|$. Find the **maximum spanning tree** (MST, e.g. Prim's or Kruskal's algorithm). This connects the pairs with the strongest unconditional dependence, placing the most important bivariate relationships in $T_1$.
>
> **Steps 2 to $d-1$ — Trees $T_\ell$:** 
> - Nodes of $T_\ell$ are the edges of $T_{\ell-1}$; only pairs satisfying the **proximity condition** (sharing one node in $T_{\ell-1}$) are candidate edges.
> - Weight candidate edges by $|\hat{\tau}|$ of the corresponding conditional pseudo-observations.
> - Select the MST of this constrained graph.
>
> **Justification:** Placing the strongest dependence at the first (unconditional) tree ensures the most important structure is captured by the unconditioned pair copulas, which are most reliably estimated.
>
> **Alternatives:** For C-vines, the root can be chosen as the variable with the highest sum of $|\hat{\tau}|$ to all others. For D-vines, the path order can be optimized by a traveling-salesman-type heuristic.
^def-structure-selection

> [!definition] Pair-Copula Family Selection
> At each edge, the practitioner selects a bivariate copula family from a menu. Aas et al. (2009) and the VineCopula package consider:
>
> | Family (code) | Lower tail dep. | Upper tail dep. | Symmetric |
> |---|---|---|---|
> | Gaussian (1) | 0 | 0 | Yes |
> | Student $t$ (2) | $>0$ | $>0$ | Yes |
> | Clayton (3) | $>0$ | 0 | No (lower) |
> | Gumbel (4) | 0 | $>0$ | No (upper) |
> | Frank (5) | 0 | 0 | Yes |
> | Joe (6) | 0 | $>0$ | No (upper) |
> | BB1 (7) | $>0$ | $>0$ | No |
> | BB7 (9) | $>0$ | $>0$ | No |
> | Independence (0) | 0 | 0 | — |
> | 90°/180°/270° rotations | mirrors of above | | |
>
> Clayton rotated $180°$ has upper tail dependence; Gumbel rotated $180°$ has lower tail dependence. Rotations multiply the menu to $\approx 30$ families.
>
> **Selection criterion:** For each candidate family $k$: fit by MLE to get $\hat{\theta}_k$, compute $\text{AIC}_k = -2\hat\ell_k + 2p_k$ (or BIC). Choose the family with the lowest AIC/BIC. Optionally, use a formal independence test first: if $\hat{\tau} \approx 0$ or a Genest-Favre test does not reject independence, assign the independence copula and stop.
^def-family-selection

> [!definition] Truncated Vines
> In a truncated vine of order $T^*$, all pair copulas in trees $T_t$ for $t > T^*$ are set to the **independence copula** $C(u,v) = uv$ (zero dependence). The vine log-likelihood only sums over the first $T^*$ trees:
> $$\log L_{\text{trunc}} = \sum_{t=1}^{T^*} \sum_{e \in E_t} \sum_{s=1}^T \log c_e(\hat{u}_{j(e),s|D(e)}, \hat{u}_{k(e),s|D(e)};\, \hat{\theta}_e)$$
> Total pair copulas: $T^*(d - T^*/2 - 1/2)$ instead of $d(d-1)/2$.
>
> **Selecting $T^*$:** Vuong's test (comparing the truncated model to the $T^*-1$ truncated model), sequential independence tests at each tree level, or BIC comparison. In practice for financial returns, $T^* = 1$ or $T^* = 2$ is often adequate beyond $d = 15$.
^def-truncation

## Examples

> [!example] 5-Variable Exchange Rate D-Vine (Aas et al. 2009, Sec. 5.2)
> **Setup:** Daily exchange rate returns for 5 currencies (DEM, GBP, JPY, CAD, CHF vs USD). $T = 1261$ observations. Marginals modelled as GARCH(1,1) with skew-$t$ innovations.
>
> **Tree 1 (path order: GBP–DEM–CHF–JPY–CAD):**
> - (GBP, DEM): Frank copula, $\hat\tau = 0.54$ — strong positive dependence (European currencies)
> - (DEM, CHF): Gumbel($\hat\theta = 4.3$) — strong upper tail dependence (CHF tracks DEM)
> - (CHF, JPY): $t$($\hat\rho = 0.30$, $\hat\nu = 6$) — moderate symmetric tail dependence
> - (JPY, CAD): Frank($\hat\theta = 1.2$) — weak dependence
>
> **Trees 2–4:** Progressively smaller $|\hat\tau|$ for conditional pairs; Frank and Gaussian dominate; independence copula selected for several pairs in $T_3, T_4$.
>
> **Interpretation:** The D-vine path order places the most strongly-dependent pairs in $T_1$; conditioning on DEM/CHF, the dependence between GBP and JPY is near-zero (independence copula). Different families at each pair: the vine flexibility is utilized.

## Software

> [!example] VineCopula R Package
> ```r
> library(VineCopula)
>
> # Fit vine to pseudo-observations (uniform [0,1])
> RVM <- RVineStructureSelect(
>   data      = u_mat,           # T x d matrix of pseudo-observations
>   familyset = c(1:6, 13, 14),  # Gaussian, t, Clayton, Gumbel, Frank, Joe + rotations
>   type      = 0,               # 0 = R-vine, 1 = C-vine, 2 = D-vine
>   selectioncrit = "AIC",       # or "BIC"
>   indeptest = TRUE,            # test for independence before fitting
>   method    = "mle"
> )
>
> # Inspect the result
> print(RVM)
> RVineAIC(RVM, data = u_mat)    # overall AIC
> RVineSim(n = 1000, RVM = RVM)  # simulate from the fitted model
> ```
> **Key functions:** `RVineStructureSelect` (full pipeline), `RVineCopSelect` (family selection given fixed structure), `RVineLogLik` (log-likelihood), `BiCopSelect` (bivariate copula selection).

> [!example] rvinecopulib R Package (Faster, Modern Alternative)
> ```r
> library(rvinecopulib)
>
> # Fit vine copula (R-vine by default)
> vc <- vinecop(data = u_mat,
>               family_set = "parametric",   # or "nonparametric", "tll"
>               selcrit    = "aic",
>               par_method = "mle",
>               trunc_lvl  = Inf)            # or integer for truncation
>
> summary(vc)
> logLik(vc)
> rosenblatt(u_mat, vc)       # conditional uniforms (h-function transforms)
> simulate(vc, n = 1000)
> ```
> `rvinecopulib` interfaces the C++ library `vinecopulib` (Nagler & Vatter), which is $\approx 10\times$ faster than the pure-R VineCopula package for large $d$ and $T$.

## Connections

- [[Vine Copulas - Overview]] — the vine structure (C-vine, D-vine, R-vine) being estimated here.
- [[Pair-Copula Construction]] — the density factorization and h-functions used in the likelihood.
- [[Copula Architecture Comparison]] — compare this estimation workflow (MLE) against factor copula estimation (SMM).
- [[Dependence Measures for Copulas]] — Kendall's $\tau$: both the tree-selection weight and the $\tau$-inversion estimator for pair copula parameters.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use simulated method of moments (no likelihood); vine copulas maximize a closed-form log-likelihood.

## See Also

- [[Method of Simulated Moments]] — SMM: the estimation paradigm for factor copulas, contrasting with MLE for vine copulas.
- [[Copula Estimation]] — Bayesian Gaussian-copula estimation; different paradigm (posterior), same univariate-marginal → dependence two-stage structure.
- [[../_Index|Econometrics]]
