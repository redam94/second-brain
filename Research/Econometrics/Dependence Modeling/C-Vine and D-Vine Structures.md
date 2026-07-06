---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Dissmann-Czado-Synthesis.md]]"
source_location: "Aas et al. (2009) §2-3, Figs. 1-4"
date_ingested: 2026-07-06
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[R-Vine Structure Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - star vine
  - path vine
---

# C-Vine and D-Vine Structures

> [!summary]
> **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two canonical special cases of regular vine structures for pair-copula constructions. A C-vine has **star-shaped trees** with a single root node per tree — ideal when one variable drives all others (e.g., a market index). A D-vine has **path-shaped trees** — ideal for naturally ordered variables (e.g., time series lags, spatial data along a transect). Both support sequential MLE via the h-function. For $d$ variables, both use exactly $d(d-1)/2$ pair copulas. When no natural C- or D-vine structure suggests itself, use [[R-Vine Structure Selection]].

## Overview

The choice of vine structure is a modelling decision analogous to choosing a covariance parametrisation. The vine graph encodes *which pairs* are modelled directly and *which pairs* are modelled conditionally. In a C-vine, the root node of each tree is the most-connected variable — its direct pairwise copulas are estimated most accurately. In a D-vine, the path ordering means adjacent-in-path variables are modelled directly, and more-distant pairs are modelled conditionally.

## Main Content

### C-Vine: Star Trees

> [!definition] C-Vine (canonical vine)
> A **C-vine** on $d$ variables is a regular vine $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ where each tree $T_j$ is a **star**: one central node (the root of tree $j$) is connected to all remaining $d-j$ nodes.
>
> For variables labelled $1, 2, \ldots, d$ with $1$ as the root of $T_1$, $2$ as root of $T_2$, etc.:
> - $T_1$: edges $(1,2),\, (1,3),\, \ldots,\, (1,d)$
> - $T_2$: edges $(2,3|1),\, (2,4|1),\, \ldots,\, (2,d|1)$
> - $T_3$: edges $(3,4|1,2),\, (3,5|1,2),\, \ldots,\, (3,d|1,2)$
> - $T_j$: edges $(j,j+1|1,\ldots,j-1),\, \ldots,\, (j,d|1,\ldots,j-1)$
>
> **Total pair copulas:** $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$.
^def-cvine

> [!theorem] C-Vine density (Aas et al. 2009, Eq. 6)
> $$\boxed{f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,\,j+i\,|\,1,\ldots,j-1}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_{j+i}|x_1,\ldots,x_{j-1})\right)}$$
> The inner product over $i$ gives the $d-j$ pair copulas at tree level $j$ (all involving the root $j$ and the variable $j+i$, conditioned on $\{1,\ldots,j-1\}$).
^thm-cvine-density

> [!example] C-Vine for $d=4$ (explicit tree sequence)
> **Variables:** 1, 2, 3, 4.
>
> **$T_1$ (root = 1):** 3 edges → pair copulas $c_{12}$, $c_{13}$, $c_{14}$
>
> **$T_2$ (root = 2, conditioned on $\{1\}$):** 2 edges → pair copulas $c_{23|1}$, $c_{24|1}$
>
> **$T_3$ (root = 3, conditioned on $\{1,2\}$):** 1 edge → pair copula $c_{34|1,2}$
>
> **Total:** $3+2+1 = 6 = 4\cdot 3/2$ pair copulas. ✓
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1,F_2)\cdot c_{13}(F_1,F_3)\cdot c_{14}(F_1,F_4)$$
> $$\qquad\cdot\, c_{23|1}(F_{2|1},F_{3|1})\cdot c_{24|1}(F_{2|1},F_{4|1}) \cdot c_{34|12}(F_{3|12},F_{4|12})$$
> where $F_{i|j} = h(F_i \mid F_j;\, \hat{\boldsymbol{\theta}}_{1j})$ and $F_{i|jk} = h(F_{i|k}\mid F_{j|k};\, \hat{\boldsymbol{\theta}}_{jk|1})$.

### D-Vine: Path Trees

> [!definition] D-Vine (drawable vine)
> A **D-vine** on $d$ variables is a regular vine $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ where each tree $T_j$ is a **path**: each node has degree at most 2 (maximum one left and one right neighbour).
>
> For the natural ordering $1, 2, \ldots, d$:
> - $T_1$: path $1$-$2$-$3$-$\ldots$-$d$; edges $(1,2),\,(2,3),\,\ldots,\,(d-1,d)$
> - $T_2$: edges $(1,3|2),\,(2,4|3),\,\ldots,\,(d-2,d|d-1)$
> - $T_j$: edges $(i,i+j|i+1,\ldots,i+j-1)$ for $i = 1,\ldots,d-j$
^def-dvine

> [!theorem] D-Vine density (Aas et al. 2009, Eq. 4)
> $$\boxed{f(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,\,i+j\,|\,i+1,\ldots,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)}$$
> The inner product runs over the $d-j$ edges at tree level $j$, each conditioning on the $j-1$ variables $\{i+1,\ldots,i+j-1\}$ between positions $i$ and $i+j$ in the path.
^thm-dvine-density

> [!example] D-Vine for $d=4$ (explicit tree sequence)
> **Variables:** 1, 2, 3, 4 (in natural order along the path).
>
> **$T_1$ (path 1-2-3-4):** edges $(1,2)$, $(2,3)$, $(3,4)$
>
> **$T_2$:** edges $(1,3|2)$, $(2,4|3)$
>
> **$T_3$:** edge $(1,4|2,3)$
>
> **Total:** $3+2+1 = 6$ pair copulas. ✓
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12}\cdot c_{23}\cdot c_{34}$$
> $$\qquad\cdot\, c_{13|2}(F_{1|2},F_{3|2})\cdot c_{24|3}(F_{2|3},F_{4|3}) \cdot c_{14|23}(F_{1|23},F_{4|23})$$

### Sampling from C-Vine and D-Vine

> [!definition] Simulation via Rosenblatt transform (inverse h-function)
> **Input:** $d$ independent uniform draws $(w_1, \ldots, w_d)$.
>
> **C-Vine simulation:**
> 1. Set $u_1 = w_1$
> 2. For $i = 2, 3, \ldots, d$: compute $u_i = h^{-1}(w_i \mid u_1; \hat{\boldsymbol{\theta}}_{1i})$, then apply iterated h-function inversions for deeper conditioning levels.
>
> **D-Vine simulation (sequential):**
> 1. Set $u_1 = w_1$, $u_2 = h^{-1}(w_2 \mid u_1; \hat{\boldsymbol{\theta}}_{12})$
> 2. For $i = 3, \ldots, d$: iterate h-function inversions through the path conditioning sets.
>
> Crucially, each h-function inverse is a **univariate root-finding problem** (bisection or Newton-Raphson) — all bivariate operations.
^def-simulation

### Choosing Between C-Vine and D-Vine

| Feature | C-Vine | D-Vine |
|---|---|---|
| **Tree shape** | Star (one root per tree) | Path (chain of nodes) |
| **Root variable** | Strongest "hub" — most connected to others | Most natural adjacent variable |
| **Best for** | One driver variable (market index, common factor) | Ordered variables (time, space, latent scale) |
| **Higher-tree copulas** | All condition on root variables 1,…,j-1 | Condition on intermediate variables |
| **Truncation** | Natural: root-driven dependence dominates | Natural: lag-1, lag-2 copulas dominate |

**Practical heuristic for C-vine root selection:** rank variables by the sum of absolute Kendall's $\hat{\tau}$ with all others. Choose the variable with the highest sum as root of $T_1$, second-highest as root of $T_2$, etc.

**Practical heuristic for D-vine ordering:** arrange variables so that adjacent pairs in the path have the strongest pairwise dependence (maximising a spanning tree criterion). This is exactly the Dissmann et al. (2013) greedy algorithm applied to the path structure — see [[R-Vine Structure Selection]].

## Connections

- [[Vine Copulas - Overview]] — motivation and overview of all vine types.
- [[Pair-Copula Construction]] — the density factorisation theorem and h-function that underlie both C-vine and D-vine.
- [[R-Vine Structure Selection]] — the general R-vine, which subsumes C-vine and D-vine and allows data-adaptive structure choice.
- [[Copula Architecture Comparison]] — how C/D-vine compare with factor copulas and elliptical copulas.
- [[Factor Copulas - Overview]] — the competing high-dimensional approach based on a latent factor.
- [[Dependence Measures for Copulas]] — tail dependence and rank correlation; used to select vine structure.

## See Also

- [[SMM Estimation of Factor Copulas]] — simulation-based estimation for the factor copula alternative.
- [[../_Index|Econometrics]]
