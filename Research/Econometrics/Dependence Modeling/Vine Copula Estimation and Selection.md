---
title: Vine Copula Estimation and Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.md]]"
source_location: "Sec. 3-5, pp. 189-196"
date_ingested: 2026-09-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[C-vine and D-vine Structures]]"
  - "[[Pair Copula Decomposition]]"
used_by: []
aliases:
  - vine copula maximum likelihood
  - sequential vine estimation
  - pair copula family selection
---

# Vine Copula Estimation and Selection

> [!summary]
> Vine copulas are estimated by **sequential maximum likelihood**: fit the pair copulas at tree $T_1$, compute h-function pseudo-observations for $T_2$, fit $T_2$, and so on. At each tree level, pair copula families are selected independently by AIC or BIC. The sequential estimator is consistent and asymptotically normal under mild regularity conditions, though it sacrifices some efficiency compared to the (computationally infeasible) full joint MLE. Software: `VineCopula` (R), `pyvinecopulib` (Python/C++).

## Overview

Because the vine copula density is a product of $\binom{n}{2}$ bivariate copula densities, the joint log-likelihood separates into a sum over trees — **if** the parameters are estimated tree by tree (sequential approach). This separation makes estimation tractable even for moderate $n$: a sequence of bivariate copula fitting problems, each standard. The cost is a mild efficiency loss relative to full joint MLE, which is typically small in practice.

## Main Content

> [!theorem] Sequential maximum likelihood estimator
> Let $\hat{\boldsymbol{\theta}}_{jk|D}^{(seq)}$ denote the sequential estimates obtained by, for each tree $T_\ell$ in order $\ell=1,2,\ldots$:
> 1. Computing pseudo-observations $\hat{v}_{j|D}$ and $\hat{v}_{k|D}$ via h-functions from the pair copulas estimated at levels $T_1, \ldots, T_{\ell-1}$ (see [[Pair Copula Decomposition]]).
> 2. Maximizing the bivariate log-likelihood:
>    $$\hat{\boldsymbol{\theta}}_{jk|D}^{(\ell)} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log c_{jk|D}\!\left(\hat v_{j|D,t},\, \hat v_{k|D,t};\, \boldsymbol{\theta}\right)$$
>
> Under mild regularity conditions (the simplifying assumption and standard ML regularity), the sequential estimator is:
> - **Consistent**: $\hat{\boldsymbol{\theta}}^{(seq)} \xrightarrow{p} \boldsymbol{\theta}_0$
> - **Asymptotically normal**: $\sqrt{T}(\hat{\boldsymbol{\theta}}^{(seq)} - \boldsymbol{\theta}_0) \xrightarrow{d} N(\mathbf{0}, \mathbf{V})$
> where the asymptotic variance $\mathbf{V}$ is a **sandwich matrix** that accounts for the propagation of estimation error through the h-functions (Aas et al. 2009; Haff 2013).
^thm-sequential-mle

> [!theorem] Full (joint) MLE
> The full joint log-likelihood is:
> $$\ell(\boldsymbol{\Theta}) = \sum_{t=1}^T \sum_{\ell=1}^{n-1}\sum_{(j,k|D) \in T_\ell} \log c_{jk|D}\!\left(F(x_{j,t}|\mathbf{x}_{D,t};\boldsymbol{\Theta}_{<\ell}),\, F(x_{k,t}|\mathbf{x}_{D,t};\boldsymbol{\Theta}_{<\ell});\, \boldsymbol{\theta}_{jk|D}\right)$$
> where $\boldsymbol{\Theta}_{<\ell}$ denotes all parameters at levels below $T_\ell$. Maximizing this jointly is feasible (numerically) for small $n$ and provides asymptotically efficient estimates, but the sequential estimates are an excellent starting point and often very close to the jointly optimal solution.
^thm-joint-mle

> [!definition] Pair copula family selection
> At each tree level, each pair copula must be assigned a **family** (Normal, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, or their rotations for negative dependence). The selection procedure:
> 1. **Fit** candidate families by MLE on the pair's pseudo-observations.
> 2. **Compare** using AIC or BIC. AIC is more common in practice (penalises parameter count moderately); BIC is preferred when $T$ is large.
> 3. **Optionally**, test whether the selected copula fits better than the independence copula ($c=1$) — if not, set $c_{jk|D}=1$ (truncate the vine at this tree level).
>
> Rotations of asymmetric copulas handle negative dependence or lower-tail vs upper-tail asymmetry:
> - **0° rotation**: $C(u,v;\theta)$ — upper-tail dependence (e.g. Gumbel)
> - **90° rotation**: $C(1-u,v;\theta)$ — lower-tail dependence for $u$, upper for $v$
> - **180° rotation**: $C(1-u,1-v;\theta)$ — lower-tail dependence (survival copula)
> - **270° rotation**: $C(u,1-v;\theta)$ — upper-tail dependence for $u$, lower for $v$
^def-family-selection

> [!definition] Vine structure selection
> For a general R-vine, the tree structure itself must be selected. The standard data-driven approach (Dissmann et al. 2013):
> 1. For $T_1$: Compute pairwise absolute Kendall's $\tau$ values for all $\binom{n}{2}$ variable pairs. Build the **maximum spanning tree** — the tree structure that maximises the sum of absolute $|\tau|$ values.
> 2. For $T_\ell$: Using pseudo-observations from $T_{\ell-1}$, compute pairwise absolute partial Kendall's $\tau$, and build the maximum spanning tree subject to the proximity condition.
>
> This greedy sequential procedure captures the strongest pairwise dependence at each level. It works well for moderate $n$; for large $n$ other criteria (e.g. Bayesian model comparison) may be preferred.
^def-structure-selection

> [!definition] Software implementations
> | Package | Language | Features |
> |---|---|---|
> | `VineCopula` (Nagler et al.) | R | C/D/R-vines, 40+ families, structure selection, simulation, tests |
> | `rvinecopulib` | R | Wraps `vinecopulib` C++ library; fast |
> | `pyvinecopulib` | Python | Python interface to `vinecopulib`; C++, fast, parallel |
> | `copulas` (SDV) | Python | Multivariate copulas including vines for tabular data synthesis |
>
> Key `VineCopula` functions: `RVineStructureSelect()` (structure + family selection), `RVineMLE()` (joint MLE), `RVineSimulate()` (simulation), `RVineLogLik()` (log-likelihood).
^def-software

## Examples

> [!example] Sequential estimation for a 4-variable D-vine
> **Setup:** $n=4$, D-vine ordering 1-2-3-4, $T=500$ observations.
>
> **Step 1 (Tree 1):** Fit bivariate copulas $C_{12}$, $C_{23}$, $C_{34}$ to the pairs $(u_1,u_2)$, $(u_2,u_3)$, $(u_3,u_4)$ where $u_k = \hat F_k(x_k)$ are empirical PITs.
>
> **Step 2 (compute $T_2$ inputs):**
> - $v_{1|2,t} = h(u_{1,t}|u_{2,t};\hat\theta_{12})$, $v_{3|2,t} = h(u_{3,t}|u_{2,t};\hat\theta_{23})$ for edge (1,3|2)
> - $v_{2|3,t} = h(u_{2,t}|u_{3,t};\hat\theta_{23})$, $v_{4|3,t} = h(u_{4,t}|u_{3,t};\hat\theta_{34})$ for edge (2,4|3)
>
> **Step 3 (Tree 2):** Fit $C_{13|2}$ to $(v_{1|2}, v_{3|2})$ and $C_{24|3}$ to $(v_{2|3}, v_{4|3})$.
>
> **Step 4 (compute $T_3$ inputs):**
> - $v_{1|23,t} = h(v_{1|2,t}|v_{3|2,t};\hat\theta_{13|2})$, $v_{4|23,t} = h(v_{4|3,t}|v_{2|3,t};\hat\theta_{24|3})$ for edge (1,4|2,3)
>
> **Step 5 (Tree 3):** Fit $C_{14|23}$ to $(v_{1|23}, v_{4|23})$.
>
> **Result:** 6 estimated pair copulas; AIC selects the family at each step independently.

## Connections

- [[Pair Copula Decomposition]] — the h-function that drives the sequential computation.
- [[C-vine and D-vine Structures]] — the tree structures that determine the estimation order.
- [[Vine Copulas - Overview]] — motivation, simplifying assumption, and comparison with factor copulas.
- [[SMM Estimation of Factor Copulas]] — compare: factor copulas require SMM (no likelihood); vine copulas have an explicit likelihood and can use standard MLE.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is used as the criterion for maximum spanning tree structure selection.

## See Also

- [[Factor Copula Application - S&P 100 and Systemic Risk]] — for comparison, this paper applies SMM to factor copulas on the same data type (equity returns) where vine copulas would be an alternative but less parsimonious approach.
- [[../_Index|Econometrics]]
