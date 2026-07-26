---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-2009-Vine-Copulas-Survey.md]]"
source_location: "Aas et al. (2009) §2.2–2.3, pp. 184–188"
date_ingested: 2026-07-26
date_updated: 2026-07-26
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Construction and Vine Density]]"
used_by:
  - "[[Regular Vine Theory]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - C-vine simulation
  - D-vine simulation
---

# C-Vine and D-Vine Structures

> [!summary]
> The two most common special vine structures are the **C-vine** (star-shaped trees; one variable conditions all others at each level) and the **D-vine** (path-shaped trees; a natural linear ordering governs the conditioning hierarchy). Both yield explicit density formulas and sequential simulation algorithms via nested h-function calls. C-vines suit settings with a dominant driver variable; D-vines suit time-series and spatially-ordered data. Both are special cases of the more general R-vine.

## Overview

Among all valid regular vine structures on $n$ variables, the C-vine and D-vine are the two canonical restrictions that allow especially clean tree diagrams and recursive simulation algorithms. For small $n \le 5$ the distinction matters less; for $n \ge 6$ the choice of structure becomes an important modelling decision that can be guided by domain knowledge or automated structure selection.

## Main Content

> [!definition] C-Vine (Canonical Vine)
> In a **C-vine**, *each tree $T_k$ is a star*: one root node has degree $n-k$ and is connected to all other nodes in that tree. The root variables $p_1, p_2, \ldots, p_{n-1}$ are chosen to represent the most "central" variables.
>
> **Tree structure for $n=4$ with root order $p_1=1, p_2=2, p_3=3$:**
> - $T_1$: star rooted at 1 → edges $(1,2)$, $(1,3)$, $(1,4)$
> - $T_2$: star rooted at 2 → edges $(2,3|1)$, $(2,4|1)$
> - $T_3$: single edge $(3,4|1,2)$
>
> **C-vine density ($n$ variables, root order $p_1,\ldots,p_n$):**
> $$f(\mathbf{x}) = \prod_{k=1}^n f_k(x_k)\cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{j,j+i|1,\ldots,j-1}\!\left(F_{j|1,\ldots,j-1}(x_j|\mathbf{x}_{1:j-1}),\; F_{j+i|1,\ldots,j-1}(x_{j+i}|\mathbf{x}_{1:j-1})\right)$$
>
> **Root variable selection:** Choose the variable with the highest *average absolute pairwise Kendall's* $\tau$ with all others as $p_1$. Iteratively, $p_2$ is the variable with the highest average dependence with the remaining variables *after conditioning on* $p_1$.
^def-cvine

> [!definition] C-Vine simulation algorithm
> To generate one observation $(u_1,\ldots,u_n)$ with $n$ variables and root order $p_1,\ldots,p_n$:
>
> 1. Draw $w_1, w_2, \ldots, w_n \sim \text{iid Unif}(0,1)$.
> 2. Set $u_{p_1} = w_1$.
> 3. For $k = 2, 3, \ldots, n$:
>    - Set $v_{1,k} = w_k$.
>    - For $j = k-1, k-2, \ldots, 1$ (reverse order): $v_{1,k} = h^{-1}(v_{1,k} \mid v_{j,k};\, \theta_{p_j,\cdot|p_1,\ldots,p_{j-1}})$ where $v_{j,k}$ is the appropriate h-function output from the previous tree.
>    - Set $u_{p_k} = v_{1,k}$.
>
> This procedure is sequential: each new variable $u_{p_k}$ is obtained by applying $k-1$ inverse h-functions, one per tree level. Complexity is $O(n^2)$ h-function evaluations per observation.
^def-cvine-sim

> [!definition] D-Vine (Drawable Vine)
> In a **D-vine**, *each tree $T_k$ is a path* (no node has degree $> 2$). The variables are ordered along the path $1 - 2 - 3 - \cdots - n$.
>
> **Tree structure for $n=4$:**
> - $T_1$: path $1-2-3-4$ → edges $(1,2)$, $(2,3)$, $(3,4)$
> - $T_2$: path $(1,2)-(2,3)-(3,4)$ → edges $(1,3|2)$, $(2,4|3)$
> - $T_3$: edge $(1,4|2,3)$
>
> **D-vine density:**
> $$f(\mathbf{x}) = \prod_{k=1}^n f_k(x_k)\cdot \prod_{k=1}^{n-1}\prod_{i=1}^{n-k} c_{i,i+k|i+1,\ldots,i+k-1}\!\left(F_{i|i+1,\ldots,i+k-1},\; F_{i+k|i+1,\ldots,i+k-1}\right)$$
>
> The pair copulas are enumerated by "diagonal stripes": the first tree has adjacent pairs $(1,2),(2,3),\ldots,(n-1,n)$; the second tree has once-removed pairs $(1,3|2),(2,4|3),\ldots$; the $k$-th tree has pairs $(i,i+k|i+1,\ldots,i+k-1)$ for $i = 1,\ldots,n-k$.
>
> **Variable ordering selection:** For time-series data, the natural time ordering is the D-vine path. For cross-sectional data, order by hierarchical clustering on the absolute Kendall $\tau$ matrix — adjacent variables in the path should be most strongly dependent.
^def-dvine

> [!definition] D-Vine simulation algorithm
> To generate one observation $(u_1,\ldots,u_n)$:
>
> 1. Draw $w_1,\ldots,w_n \sim \text{iid Unif}(0,1)$.
> 2. Set $u_1 = w_1$.
> 3. Set $u_2 = h^{-1}(w_2 \mid u_1;\, \theta_{12})$.
> 4. For $k = 3, 4, \ldots, n$:
>    - Let $v = w_k$.
>    - For $j = k-1, k-2, \ldots, 1$: compute $v = h^{-1}(v \mid F_{j|j+1,\ldots,k-1};\, \theta_{j,k|j+1,\ldots,k-1})$ where the conditioning quantiles $F_{j|j+1,\ldots,k-1}$ are computed from earlier outputs.
>    - Set $u_k = v$.
>
> Complexity is $O(n^2)$ h-function evaluations per observation.
^def-dvine-sim

> [!definition] C-vine vs D-vine: when to use which
> | Criterion | C-Vine | D-Vine |
> |-----------|--------|--------|
> | Tree shape | Stars (one root per tree) | Paths (no node has degree > 2) |
> | Best when | One variable drives all others | Variables have a natural linear order |
> | Domain examples | Portfolio returns + market index; survey responses + a key covariate | Time-series lags; spatial data along a transect; ordinal scales |
> | Root selection | Max avg. |τ| variable | Max spanning path on τ matrix |
> | Factor copula analogy | C-vine with Gaussian pair copulas ≈ factor copula | No natural factor analogy |
> | Pair copulas in T_1 | $n-1$ spokes from root | $n-1$ adjacent-pair edges |
> | Pair copulas total | $n(n-1)/2$ (same as all vines) | $n(n-1)/2$ (same as all vines) |
>
> Both C-vine and D-vine are special cases of the **R-vine** (see [[Regular Vine Theory]]), which allows arbitrary tree shapes and is the most flexible structure.
^def-comparison

## Examples

> [!example] C-vine vs D-vine for five financial returns
> **Setup:** Five equity returns $(R_1,\ldots,R_5)$; $R_1$ = market index return; $R_2$–$R_5$ individual stocks.
>
> **C-vine with root $p_1=1$ (market index):**
> - $T_1$: market vs each stock: $(1,2),(1,3),(1,4),(1,5)$ — 4 bivariate copulas capturing "beta" dependence of each stock on the market.
> - $T_2$: conditional copulas given market: $(2,3|1),(2,4|1),(2,5|1),(3,4|1)$, ... — residual pairwise dependencies after removing market.
> - $T_3$, $T_4$: increasingly high-order conditioning.
>
> **Interpretation:** The C-vine mirrors a factor model structure. The market index root naturally absorbs most pairwise dependence; residual conditional dependencies in $T_2$ are typically near-independence, so a truncated C-vine (set $T_2$ pair copulas to independence) can work well.
>
> **D-vine with order $1-2-3-4-5$ (by GICS sector):**
> - $T_1$: adjacent-sector pairs $(1,2),(2,3),(3,4),(4,5)$ — 4 bivariate copulas for adjacent-sector correlations.
> - $T_2$: two-step dependencies conditional on intermediate sector.
>
> **Comparison:** The C-vine is preferred here because the market factor is a natural driver. The D-vine would be preferred if the five variables were returns at lags $t, t-1, \ldots, t-4$ of a single asset — a natural path ordering.

## Connections

- [[Pair Copula Construction and Vine Density]] — the general density formula that C-vine and D-vine instantiate; the h-function is the key primitive for both.
- [[Regular Vine Theory]] — C-vine and D-vine are special R-vines; the R-vine matrix representation can encode both.
- [[Vine Copula Estimation and Model Selection]] — structure selection between C-vine, D-vine, and R-vine; sequential MLE proceeds tree by tree using the h-function transforms defined here.
- [[Vine Copulas - Overview]] — motivation and positioning.

## See Also

- [[Factor Copulas - Overview]] — C-vine with all-Gaussian pair copulas approximates a Gaussian factor copula; the C-vine root variable plays the role of the latent factor.
- [[Multi-Factor and Block Dependence Structures]] — the factor copula's block-equidependence extension is analogous to a C-vine with industry roots at $T_1$.
- [[../_Index|Econometrics]]
