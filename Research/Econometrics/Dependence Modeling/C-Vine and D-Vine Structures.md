---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/aas2009-pair-copula-constructions.md]]"
source_location: "Sec. 3, pp. 185–190"
date_ingested: 2026-10-28
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair-Copula Construction]]"
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[R-Vine Matrices and Truncated Vines]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> C-vines (canonical vines) and D-vines (drawable vines) are two special cases of the general regular vine, introduced by Aas et al. (2009) as computationally tractable vine architectures. In a **D-vine**, every tree is a *path*: each variable connects to its two neighbours. In a **C-vine**, every tree is a *star*: one root node connects to all others. Both yield closed-form density recursions via the h-function and are strictly nested within the general R-vine class.

## Overview

A vine on $d$ variables consists of $d-1$ trees $T_1, \ldots, T_{d-1}$. Tree $T_1$ has $d$ nodes (one per variable) and $d-1$ edges; tree $T_j$ has the *edges* of $T_{j-1}$ as its nodes, linked by new edges that share a node in $T_{j-1}$ (the **proximity condition**). Each edge in tree $T_j$ corresponds to a bivariate conditional copula with conditioning set $D_e$ of size $j-1$, giving $\binom{d}{2}$ pair-copulas in total.

C-vines and D-vines specify particular tree shapes. Both can be described by their **density formula**, derivable by tracing which pair-copulas appear in the cascade.

## Main Content

### D-Vine (Drawable Vine)

> [!definition] D-Vine Structure
> A **D-vine** on $d$ variables specifies trees $T_1, \ldots, T_{d-1}$ where every tree $T_j$ is a **path** (each node has degree ≤ 2). The path ordering in $T_1$ is some permutation of $\{1, \ldots, d\}$; by convention, use the natural ordering $1 - 2 - 3 - \cdots - d$.
>
> Tree $T_1$ has edges: $(1,2), (2,3), \ldots, (d-1, d)$.  
> Tree $T_2$ has edges: $(1,3|2), (2,4|3), \ldots, (d-2, d|d-1)$.  
> Tree $T_j$ has edges: $(i, i+j | i+1, \ldots, i+j-1)$ for $i = 1, \ldots, d-j$.
>
> The conditioning set of edge $(i, i+j|\ldots)$ is $D_e = \{i+1, \ldots, i+j-1\}$ — the variables that lie between $i$ and $i+j$ in the path ordering.
^d-vine-definition

> [!definition] D-Vine Density Formula
> For a D-vine on $d$ variables with natural ordering, the joint density is
>
> $$f(x_1, \ldots, x_d) = \left[\prod_{k=1}^{d} f_k(x_k)\right] \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i | x_{i+1}, \ldots, x_{i+j-1}),\; F(x_{i+j} | x_{i+1}, \ldots, x_{i+j-1})\right)$$
>
> **Count:** $\binom{d}{2}$ pair-copulas. At tree level $j$, there are $d-j$ pair-copulas each with conditioning set of size $j-1$.
>
> **Total pair-copulas:** $\sum_{j=1}^{d-1} (d-j) = \binom{d}{2}$.
^d-vine-density

> [!example] D-Vine on 4 Variables
> **Tree $T_1$** (path 1–2–3–4): pair-copulas $c_{12}$, $c_{23}$, $c_{34}$.  
> **Tree $T_2$**: edges are $(1,3|2)$ and $(2,4|3)$; pair-copulas $c_{13|2}$, $c_{24|3}$.  
> **Tree $T_3$**: edge $(1,4|2,3)$; pair-copula $c_{14|23}$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}\cdot c_{23}\cdot c_{34}\cdot c_{13|2}\cdot c_{24|3}\cdot c_{14|23}$$
>
> with $c_{13|2}$ evaluated at $(h(x_1|x_2), h(x_3|x_2))$ and $c_{14|23}$ at $(h(x_1|x_2,x_3), h(x_4|x_2,x_3))$.
>
> **When to prefer:** D-vines are natural when variables have a sequential structure — e.g., time series where dependence decays with lag, or spatial data where proximity implies dependence.
^d-vine-4-example

---

### C-Vine (Canonical Vine)

> [!definition] C-Vine Structure
> A **C-vine** on $d$ variables specifies trees $T_1, \ldots, T_{d-1}$ where every tree $T_j$ is a **star**: one root node connects to all remaining $d-j$ nodes.
>
> **Root sequence:** $(r_1, r_2, \ldots, r_{d-1})$ where $r_j$ is the root of star $T_j$.
>
> Tree $T_1$: root $r_1$ connects to all of $\{1, \ldots, d\} \setminus \{r_1\}$ — giving $d-1$ edges.  
> Tree $T_2$: root $r_2$ (an edge from $T_1$) connects to all remaining edges of $T_1$ — $d-2$ edges.
>
> The conditioning set of the edge from $r_j$ to node $k$ in tree $T_j$ is $D_e = \{r_1, \ldots, r_{j-1}\}$.
^c-vine-definition

> [!definition] C-Vine Density Formula
> For a C-vine with root sequence $(1, 2, \ldots, d-1)$, the joint density is
>
> $$f(x_1, \ldots, x_d) = \left[\prod_{k=1}^{d} f_k(x_k)\right] \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|1,\ldots,j-1}\!\left(F(x_j | x_1, \ldots, x_{j-1}),\; F(x_i | x_1, \ldots, x_{j-1})\right)$$
>
> **Structure:** At each tree $T_j$, the root variable $j$ is paired with all subsequent variables $\{j+1, \ldots, d\}$, conditioning on all prior roots $\{1, \ldots, j-1\}$.
>
> **When to prefer:** C-vines are natural when one variable drives the others — e.g., a market index that is the dominant common factor, paired with all individual asset returns.
^c-vine-density

> [!example] C-Vine on 4 Variables (Root Sequence 1, 2, 3)
> **Tree $T_1$** (root = 1): edges $(1,2)$, $(1,3)$, $(1,4)$.  
> **Tree $T_2$** (root = 2): edges $(2,3|1)$, $(2,4|1)$.  
> **Tree $T_3$** (root = 3): edge $(3,4|1,2)$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}\cdot c_{13}\cdot c_{14}\cdot c_{23|1}\cdot c_{24|1}\cdot c_{34|12}$$
>
> Variable 1 appears in the first tree as a star center — it is the "key variable" whose marginal dependence with all others is captured at level 1.
^c-vine-4-example

---

### Comparison

| Feature | D-Vine | C-Vine |
|---------|--------|--------|
| **Tree shape** | Path | Star |
| **Root variable** | None (path defined by endpoint ordering) | Root $r_j$ at each tree level |
| **Natural application** | Sequential/lag dependence | One dominant factor |
| **h-function depth** | Increases along path | All deepest via one root sequence |
| **R-vine special case** | Yes | Yes |
| **Number of structures** | $d!/2$ distinct D-vines | $d!/2$ distinct C-vines |
| **Both subsumed by** | [[R-Vine Matrices and Truncated Vines|R-vine]] | [[R-Vine Matrices and Truncated Vines|R-vine]] |

## Connections

- [[Pair-Copula Construction]] — h-function machinery used to evaluate both vine types.
- [[R-Vine Matrices and Truncated Vines]] — the general R-vine that nests C- and D-vines as special cases; the vine matrix encodes any structure.
- [[Vine Copula Estimation and Selection]] — structure selection chooses among C-vine, D-vine, and general R-vine orderings.
- [[Factor Copulas - Overview]] — C-vine with a common conditioning variable is structurally analogous to a 1-factor model, but uses observed conditioning rather than a latent factor.
- [[Multi-Factor and Block Dependence Structures]] — factor copulas with block structure parallel C-vines with multiple star-center variables.

## See Also

- [[Vine Copulas - Overview]] — introduction, motivation, contrast with other copula classes.
- [[../_Index|Econometrics]]
