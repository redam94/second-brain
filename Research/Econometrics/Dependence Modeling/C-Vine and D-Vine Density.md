---
title: C-Vine and D-Vine Density
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.pdf]]"
source_location: "Aas et al. (2009), Secs. 3.1–3.2, Eqs. 8–9"
date_ingested: 2026-11-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Constructions and Regular Vines]]"
used_by:
  - "[[Vine Copula Estimation]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine density
  - D-vine density
---

# C-Vine and D-Vine Density

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most tractable special cases of regular vines. In a C-vine, each tree $T_j$ has a *star* structure — one root node connects to all others — concentrating all conditioning on successively lower-indexed variables. In a D-vine, each tree $T_j$ has a *path* structure — variables are conditionally linked in sequence. Both yield an explicit joint density as a product of $d(d-1)/2$ pair-copula densities, all computable from the h-function. The choice between them reflects whether one variable dominates the dependence structure (C-vine) or whether dependence decays with distance in a natural ordering (D-vine).

## Overview

For $d$ variables, a regular vine has $d-1$ trees with $d(d-1)/2$ edges in total. Among the many possible R-vine structures, C-vines and D-vines are distinguished by having a unique, symmetric topology in every tree. This makes the density formulas explicit without summing over all tree configurations, and makes the sequential estimation algorithm particularly clean.

Aas et al. (2009) derive the density formulas for both cases (their Equations 8 and 9) and show that the conditional arguments $F(x_i | x_1, \ldots, x_{j-1})$ (C-vine) or $F(x_i | x_{i+1}, \ldots, x_{i+j-1})$ (D-vine) can be computed iteratively using h-functions from tree $j-1$'s estimated pair copulas.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-vine structure
> In a **C-vine** on variables $1, 2, \ldots, d$:
> - **Tree $T_j$** ($j = 1, \ldots, d-1$) has a **star** topology: node $j$ is the root, connected to all $d - j$ remaining nodes $j+1, j+2, \ldots, d$.
> - The edges in $T_j$ are: $(j, j+k \mid 1, 2, \ldots, j-1)$ for $k = 1, \ldots, d-j$.
> - Conditioning set grows by one variable per tree: in tree $T_j$, all pair copulas condition on variables $\{1, \ldots, j-1\}$.
>
> **Interpretive role:** Variable 1 (the root of $T_1$) is the strongest "hub" — it drives dependence with all others. Variable 2 (the root of $T_2$) explains residual dependence after conditioning on variable 1, and so on. A C-vine is natural when one variable (e.g. a market index) dominates or when variables are hierarchically organised.
^cvine-structure

> [!theorem] C-vine joint density (Aas et al. 2009, Eq. 8)
> The joint density of $(X_1, X_2, \ldots, X_d)$ under a C-vine with bivariate copula families $\{c_{j,j+k|1,\ldots,j-1}\}$ is:
>
> $$\boxed{f(\mathbf{x}) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{k=1}^{d-j} c_{j,j+k|1,\ldots,j-1}\!\left(F(x_j \mid x_1,\ldots,x_{j-1}),\; F(x_{j+k} \mid x_1,\ldots,x_{j-1});\; \boldsymbol{\theta}_{j,j+k|1,\ldots,j-1}\right)}$$
>
> **Index interpretation:** $j$ indexes the tree (and the root node of that tree); $k$ indexes the non-root node. The outer product over $j=1,\ldots,d-1$ runs through trees; the inner product over $k=1,\ldots,d-j$ runs through the star's spokes.
>
> **Number of pair copulas:** $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$.
>
> **Conditional arguments:** The conditional CDFs $F(x_j \mid x_1, \ldots, x_{j-1})$ are computed iteratively via the h-function (see [[Vine Copula Estimation]]).
^cvine-density

> [!example] 4-variable C-vine: trees and density
> For $d = 4$, the C-vine with root ordering $1 \to 2 \to 3$ has:
>
> **Tree $T_1$ (root = 1):** Edges $(1,2)$, $(1,3)$, $(1,4)$
>
> **Tree $T_2$ (root = 2):** Edges $(2,3|1)$, $(2,4|1)$
>
> **Tree $T_3$ (root = 3):** Edge $(3,4|1,2)$
>
> **Density** (6 pair copulas):
> $$f = f_1 f_2 f_3 f_4$$
> $$\times\; c_{12}(F_1, F_2)\; c_{13}(F_1, F_3)\; c_{14}(F_1, F_4)$$
> $$\times\; c_{23|1}(F(x_2|x_1), F(x_3|x_1))\; c_{24|1}(F(x_2|x_1), F(x_4|x_1))$$
> $$\times\; c_{34|12}(F(x_3|x_1,x_2), F(x_4|x_1,x_2))$$
>
> **Estimation order:** Estimate $c_{12}, c_{13}, c_{14}$ first (tree 1). Then apply h-functions to get $F(x_j|x_1)$, estimate $c_{23|1}, c_{24|1}$ (tree 2). Apply h-functions again, estimate $c_{34|12}$ (tree 3).
^cvine-4d-example

---

### D-Vine (Drawable Vine)

> [!definition] D-vine structure
> In a **D-vine** on variables $1, 2, \ldots, d$:
> - **Tree $T_1$** has a **path** topology: edges $(1,2), (2,3), (3,4), \ldots, (d-1, d)$.
> - **Tree $T_j$** ($j \geq 2$) has edges $(i, i+j \mid i+1, \ldots, i+j-1)$ for $i = 1, \ldots, d-j$.
> - The conditioning set for each pair copula is the *interior* nodes of the path connecting the two conditioned nodes in $T_1$.
>
> **Interpretive role:** A D-vine is natural when variables have a natural sequential ordering (time, spatial proximity, a risk ladder) and dependence is strongest between neighbours and decays as the gap in the ordering grows. The path structure reflects proximity-based dependence.
^dvine-structure

> [!theorem] D-vine joint density (Aas et al. 2009, Eq. 9)
> The joint density of $(X_1, X_2, \ldots, X_d)$ under a D-vine is:
>
> $$\boxed{f(\mathbf{x}) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i \mid x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j} \mid x_{i+1},\ldots,x_{i+j-1});\; \boldsymbol{\theta}_{i,i+j|i+1,\ldots,i+j-1}\right)}$$
>
> **Index interpretation:** $j$ indexes the tree; $i$ indexes the starting node of the path edge. The conditioned nodes are $i$ and $i+j$; the conditioning set $\{i+1, \ldots, i+j-1\}$ is the *interior* of the path connecting them in $T_1$.
>
> **Number of pair copulas:** Identical to the C-vine: $d(d-1)/2$.
^dvine-density

> [!example] 4-variable D-vine: trees and density
> For $d = 4$, the D-vine with ordering $1 - 2 - 3 - 4$ has:
>
> **Tree $T_1$ (path):** Edges $(1,2)$, $(2,3)$, $(3,4)$
>
> **Tree $T_2$:** Edges $(1,3|2)$, $(2,4|3)$
>
> **Tree $T_3$:** Edge $(1,4|2,3)$
>
> **Density** (6 pair copulas):
> $$f = f_1 f_2 f_3 f_4$$
> $$\times\; c_{12}(F_1, F_2)\; c_{23}(F_2, F_3)\; c_{34}(F_3, F_4)$$
> $$\times\; c_{13|2}(F(x_1|x_2), F(x_3|x_2))\; c_{24|3}(F(x_2|x_3), F(x_4|x_3))$$
> $$\times\; c_{14|23}(F(x_1|x_2,x_3), F(x_4|x_2,x_3))$$
>
> **Comparison with C-vine:** The C-vine has the same 6 pair copulas but different conditional pairs. The C-vine $(1,4|-)$ pairs variable 1 with 4 at tree 1; the D-vine pairs them only at tree 3, mediated by variables 2 and 3. Neither is universally better: pick based on which conditional structure best captures the data.
^dvine-4d-example

---

### Structural Comparison

> [!definition] C-vine vs D-vine: when to use each
>
> | Property | C-vine | D-vine |
> |---|---|---|
> | **Tree $j$ topology** | Star (root $j$ connects to $d-j$ nodes) | Path (sequential connections) |
> | **Pairs in tree 1** | $(1,2), (1,3), \ldots, (1,d)$ | $(1,2), (2,3), \ldots, (d-1,d)$ |
> | **Conditioning set at tree $j$** | Always $\{1, \ldots, j-1\}$ | Interior of the path, varies by edge |
> | **Interpretive structure** | Hub-and-spoke: variable 1 dominates | Sequential: dependence decays with distance |
> | **Typical application** | Market factor + assets; climate variable + observations | Interest-rate maturities; spatial variables; ordered risk layers |
> | **h-function recursion** | Branch out from root; same conditioning set per tree | Follow path interior; conditioning set shifts per edge |
>
> **General R-vine:** When neither C-vine nor D-vine captures the data structure well, a general R-vine can be estimated by tree-by-tree greedy maximisation of Kendall's $\tau$ (Dißmann et al. 2013; implemented in `rvinecopulib`).
^structural-comparison

## Connections

- [[Pair Copula Constructions and Regular Vines]] — the Bedford-Cooke R-vine framework, h-function definition, and copula family choices.
- [[Vine Copula Estimation]] — the sequential ML algorithm that uses these densities, h-function recursion, and model selection.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ used to select vine structure (tree-by-tree greedy algorithm).

## See Also

- [[../_Index|Econometrics]]
