---
title: C-vine and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Aas-et-al-2009-Pair-Copula-Constructions]]"
source_location: "Secs. 2.1–2.2, pp. 184–189"
date_ingested: 2026-10-21
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[R-vine Structures and Model Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
---

# C-vine and D-vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two original canonical vine structures introduced by Bedford & Cooke (2001) and made operational by Aas et al. (2009). A C-vine has one "key variable" at the centre of each tree (star structure); its density is well-suited to settings where one variable drives all others. A D-vine has a path structure in each tree, placing each variable at most at two edges; it is natural for time series and ordered variable sets. Both are special cases of the more general R-vine (see [[R-vine Structures and Model Selection]]).

## Overview

Given $d$ variables, a vine structure specifies which $d(d-1)/2$ bivariate pairs are modelled, and at which conditioning level. The two canonical structures — C-vine and D-vine — were the first to be made computationally practical because their tree sequences are fully determined by a single ordering of variables, and their density formulas have simple closed forms that enable sequential ML estimation.

## Main Content

### C-vine (Canonical Vine)

> [!definition] C-vine structure
> In a **C-vine** on $d$ variables, at each tree $T_j$ there is one **root node** (key variable) connected to all other $d - j$ nodes by edges. The root node of $T_j$ is determined by a chosen ordering $\{x_1, x_2, \ldots, x_d\}$ — typically, $x_j$ is the root of $T_j$.
>
> **Tree $T_1$:** star centred on $x_1$ — edges $(1,2)$, $(1,3)$, …, $(1,d)$.
> **Tree $T_2$:** star centred on $x_2$ — edges $(2,3|1)$, $(2,4|1)$, …, $(2,d|1)$.
> **Tree $T_j$:** star centred on $x_j$ — edges $(j, j+1|1,\ldots,j-1)$, …, $(j, d|1,\ldots,j-1)$.
>
> **Interpretation:** $x_1$ mediates all first-level dependence; $x_2$ mediates all second-level dependence conditional on $x_1$; etc. Ideal when there is a single dominant variable driving dependence (e.g., a market index in finance).
> ^c-vine-def

> [!theorem] C-vine density formula (Aas et al. 2009, Eq. 4)
> For $d$ variables with marginals $f_1, \ldots, f_d$:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,j+i|\underbrace{1,\ldots,j-1}_{=:D_j}}\!\left(F_{j|D_j}(x_j|\mathbf{x}_{D_j}),\; F_{j+i|D_j}(x_{j+i}|\mathbf{x}_{D_j});\; \boldsymbol{\theta}_{j,j+i|D_j}\right)$$
>
> where $D_j = \{1, 2, \ldots, j-1\}$ is the conditioning set for tree $T_j$, and all conditional CDFs are computed via h-functions (see [[Pair Copula Construction#^h-recursion]]).
>
> **Parameter count:** $d(d-1)/2$ pair copula parameters (plus marginal parameters estimated separately).
> ^c-vine-density

### D-vine (Drawable Vine)

> [!definition] D-vine structure
> In a **D-vine** on $d$ variables, each tree $T_k$ is a **path** — a linear chain of nodes. In tree $T_1$, the $d$ variables are connected in a chain: $(1,2)$, $(2,3)$, …, $(d-1, d)$. In tree $T_2$, the edges of $T_1$ become nodes, connected in a chain: $(1,3|2)$, $(2,4|3)$, …, $(d-2,d|d-1)$.
>
> **General pattern:** $T_k$ has edges $(i, i+k | i+1, \ldots, i+k-1)$ for $i = 1, \ldots, d-k$.
>
> **Interpretation:** Each pair of variables $(X_i, X_{i+k})$ is connected by a pair copula conditioned on the $k-1$ "intermediate" variables $\{X_{i+1}, \ldots, X_{i+k-1}\}$. Natural ordering (temporal, spatial, or by proximity) motivates the path structure. Widely used for time-series and financial time-series.
> ^d-vine-def

> [!theorem] D-vine density formula (Aas et al. 2009, Eq. 6)
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F_{i|\underbrace{i+1,\ldots,i+j-1}_{=:D_{ij}}}(x_i|\mathbf{x}_{D_{ij}}),\; F_{i+j|D_{ij}}(x_{i+j}|\mathbf{x}_{D_{ij}});\; \boldsymbol{\theta}_{i,i+j|D_{ij}}\right)$$
>
> The outer product over $j$ runs through the tree levels (tree $T_j$); the inner product over $i$ runs through the edges in that tree.
>
> **H-function recursion for D-vine:** the conditional CDF $F_{i|i+1,\ldots,i+j-1}$ requires $j-1$ sequential h-function applications. Aas et al. give explicit recursions.
> ^d-vine-density

### Comparison

> [!definition] C-vine vs D-vine: structural choice
>
> | Feature | C-vine | D-vine |
> |---------|--------|--------|
> | Tree structure | Star (one hub node per tree) | Path (linear chain per tree) |
> | Root node | One variable dominates each level | Variables appear at most at two edges |
> | Ordering | One variable ordering fixes entire vine | One variable ordering fixes entire vine |
> | Natural application | Factor-like dependence: one driver | Temporal/ordered data; Markovian structure |
> | # of pair copulas | $d(d-1)/2$ (same) | $d(d-1)/2$ (same) |
> | Parameter count | Same | Same |
> | Conditioning depth | Can be deep ($|D|$ up to $d-2$) | Conditioning set is always contiguous |
> | Flexibility | Same asymptotically; differs in structure | Same asymptotically; differs in structure |
>
> **Key insight:** Both vine types use the same number of pair copulas but organise them differently. The choice of vine structure determines which bivariate relationships are modelled at the "unconditional" level (tree $T_1$) and which are modelled conditionally — affecting interpretation and parameter estimation stability.
> ^c-vs-d-vine

## Examples

> [!example] 4-variable C-vine (Aas et al. 2009, Sec. 2.1)
> **Variables:** $X_1, X_2, X_3, X_4$; root ordering $(1, 2, 3, 4)$.
>
> **Tree $T_1$ (star on $x_1$):** edges $(1,2)$, $(1,3)$, $(1,4)$.
> **Tree $T_2$ (star on $x_2|x_1$):** edges $(2,3|1)$, $(2,4|1)$.
> **Tree $T_3$ (single edge):** edge $(3,4|1,2)$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(u_1, u_2)\cdot c_{13}(u_1, u_3)\cdot c_{14}(u_1, u_4)$$
> $$\cdot\; c_{23|1}(F_{2|1}, F_{3|1})\cdot c_{24|1}(F_{2|1}, F_{4|1})$$
> $$\cdot\; c_{34|12}(F_{3|12}, F_{4|12})$$
> where $F_{i|1} = h(u_i|u_1;\boldsymbol{\theta}_{1i})$ and $F_{i|12} = h(F_{i|1}|F_{2|1};\boldsymbol{\theta}_{2i|1})$.
>
> **Application:** $X_1$ could be a market index; $X_2, X_3, X_4$ are individual assets with dependence on the index captured in $T_1$, and residual inter-asset dependence after controlling for the index in $T_2$.

> [!example] 4-variable D-vine
> **Variables:** $X_1, X_2, X_3, X_4$; path ordering $(1, 2, 3, 4)$.
>
> **Tree $T_1$ (path):** edges $(1,2)$, $(2,3)$, $(3,4)$.
> **Tree $T_2$:** edges $(1,3|2)$, $(2,4|3)$.
> **Tree $T_3$:** edge $(1,4|2,3)$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4\cdot c_{12}(u_1,u_2)\cdot c_{23}(u_2,u_3)\cdot c_{34}(u_3,u_4)$$
> $$\cdot\; c_{13|2}(F_{1|2},F_{3|2})\cdot c_{24|3}(F_{2|3},F_{4|3})$$
> $$\cdot\; c_{14|23}(F_{1|23},F_{4|23})$$
>
> **Application:** $X_1, X_2, X_3, X_4$ are returns at successive days or maturities; the path structure reflects temporal adjacency.

## Connections

- [[Vine Copulas - Overview]] — motivation and the general vine construction.
- [[Pair Copula Construction]] — the h-function and density formula that underlie both C-vine and D-vine.
- [[R-vine Structures and Model Selection]] — the most general vine (R-vine) of which C-vine and D-vine are special cases; includes data-driven structure selection.
- [[Factor Copula Construction]] — the factor copula is *not* a vine copula, but both parametrise high-dimensional dependence parsimoniously. A C-vine with Gaussian pair copulas is algebraically distinct from a factor copula with Gaussian factor.
- [[Multi-Factor and Block Dependence Structures]] — the block factor copula (Oh & Patton) produces industry-level dependence heterogeneity similarly to how industry-specific D-vine orderings would.

## See Also

- [[../_Index|Dependence Modeling]]
