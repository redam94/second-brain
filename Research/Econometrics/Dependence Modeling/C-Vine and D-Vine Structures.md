---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Survey-Aas-Czado-Bedford-Cooke.md]]"
source_location: "Aas et al. (2009), Secs. 3-4; Bedford & Cooke (2001, 2002)"
date_ingested: 2026-07-15
date_updated: 2026-07-15
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Regular Vine Copulas and R-Vine Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - pair-copula C-vine
  - pair-copula D-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> The **canonical vine** (C-vine) and **drawable vine** (D-vine) are the two most important special cases of regular vine copulas. Both decompose a $d$-dimensional density into $d(d-1)/2$ pair-copulas. They differ in tree topology: C-vines use **star** trees (one central node at each level), while D-vines use **path** (chain) trees. C-vines are natural when one variable dominates all others; D-vines are natural when variables have a natural ordering or are sequentially dependent (e.g., time series, spatial chains).

## Overview

For $d$ variables, both C-vines and D-vines organise the pair-copulas into $d-1$ tree levels. At tree level $k$, there are $d-k$ pair-copulas, each conditioning on a set of $k-1$ variables. The total pair-copulas at all levels: $\sum_{k=1}^{d-1}(d-k) = d(d-1)/2$, as expected.

**Key difference:** The tree topology (star vs. path) determines which pairs appear as unconditional pair-copulas in tree $T_1$ and which conditioning sets appear at higher trees. This choice is part of vine model specification and carries substantive meaning.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-vine structure
> In a **C-vine** with root ordering $(j_1, j_2, \ldots, j_{d-1})$:
> - **Tree $T_1$** is a **star** with root $j_1$: edges $\{j_1, j_\ell\}$ for $\ell = 2, \ldots, d$. Pair-copulas: $c_{j_1 j_\ell}$ for $\ell = 2, \ldots, d$.
> - **Tree $T_2$** is a star with root $j_2$ (conditioning on $j_1$): edges $\{j_2, j_\ell \mid j_1\}$ for $\ell = 3, \ldots, d$. Pair-copulas: $c_{j_2 j_\ell \mid j_1}$.
> - **Tree $T_k$** is a star with root $j_k$ (conditioning on $\{j_1, \ldots, j_{k-1}\}$): pair-copulas $c_{j_k j_\ell \mid j_1, \ldots, j_{k-1}}$ for $\ell = k+1, \ldots, d$.
>
> The key property: each tree has **one root node** that is the conditioned node in every pair-copula at that level. The root node at level $k$ is the variable most important for explaining residual dependence after conditioning on the first $k-1$ roots.
^def-cvine

> [!definition] C-vine joint density (4-variable example)
> For variables $(x_1, x_2, x_3, x_4)$ with C-vine root ordering $(1, 2, 3, 4)$:
>
> **Tree $T_1$ (root: variable 1):** pairs $(1,2)$, $(1,3)$, $(1,4)$
> **Tree $T_2$ (root: variable 2 | variable 1):** pairs $(2,3|1)$, $(2,4|1)$
> **Tree $T_3$ (root: variable 3 | variables 1,2):** pair $(3,4|1,2)$
>
> $$f(x_1, x_2, x_3, x_4) = \prod_{j=1}^4 f_j(x_j)$$
> $$\times\; c_{12}(F_1, F_2)\cdot c_{13}(F_1, F_3)\cdot c_{14}(F_1, F_4)$$
> $$\times\; c_{23|1}(F_{2|1}, F_{3|1})\cdot c_{24|1}(F_{2|1}, F_{4|1})$$
> $$\times\; c_{34|12}(F_{3|12}, F_{4|12})$$
>
> where $F_{j|D}$ is the conditional CDF of $x_j$ given $\{x_k : k \in D\}$, computed via h-functions from lower trees.
^def-cvine-density

> [!definition] C-vine h-function recursion
> **Level 1 (unconditional):** $F_{j|1} = h(F_j \mid F_1, \hat{\boldsymbol{\theta}}_{1j})$ for $j = 2, 3, 4$.
>
> **Level 2 (conditioning on $x_1$):**
> $F_{3|12} = h(F_{3|1} \mid F_{2|1}, \hat{\boldsymbol{\theta}}_{23|1})$
> $F_{4|12} = h(F_{4|1} \mid F_{2|1}, \hat{\boldsymbol{\theta}}_{24|1})$
>
> **Level 3 (conditioning on $x_1, x_2$):**
> $F_{4|123} = h(F_{4|12} \mid F_{3|12}, \hat{\boldsymbol{\theta}}_{34|12})$
>
> Each h-function call reduces the conditioning set by one variable, working from the outermost tree inward.
^def-cvine-h

---

### D-Vine (Drawable Vine)

> [!definition] D-vine structure
> In a **D-vine** with variable ordering $(1, 2, \ldots, d)$:
> - **Tree $T_1$** is a **path**: edges $\{j, j+1\}$ for $j = 1, \ldots, d-1$. Pair-copulas: $c_{j,j+1}$ — adjacent pairs in the ordering.
> - **Tree $T_2$**: edges $\{j, j+2 \mid j+1\}$ for $j = 1, \ldots, d-2$. Pair-copulas: $c_{j,j+2|j+1}$ — pairs two steps apart, conditioning on the intermediate variable.
> - **Tree $T_k$**: edges $\{j, j+k \mid j+1, \ldots, j+k-1\}$ for $j = 1, \ldots, d-k$. Pair-copulas: $c_{j,j+k|j+1,\ldots,j+k-1}$.
>
> The key property: the conditioning set at level $k$ is always the $k-1$ variables **between** the two conditioned variables in the ordering. This is natural for time-series or spatial data where "between" has a direct interpretation.
^def-dvine

> [!definition] D-vine joint density (4-variable example)
> For variables $(x_1, x_2, x_3, x_4)$ with D-vine ordering $(1, 2, 3, 4)$:
>
> **Tree $T_1$ (adjacent pairs):** $(1,2)$, $(2,3)$, $(3,4)$
> **Tree $T_2$ (skip-one pairs):** $(1,3|2)$, $(2,4|3)$
> **Tree $T_3$ (skip-two pair):** $(1,4|2,3)$
>
> $$f(x_1, x_2, x_3, x_4) = \prod_{j=1}^4 f_j(x_j)$$
> $$\times\; c_{12}(F_1, F_2)\cdot c_{23}(F_2, F_3)\cdot c_{34}(F_3, F_4)$$
> $$\times\; c_{13|2}(F_{1|2}, F_{3|2})\cdot c_{24|3}(F_{2|3}, F_{4|3})$$
> $$\times\; c_{14|23}(F_{1|23}, F_{4|23})$$
^def-dvine-density

> [!definition] D-vine h-function recursion
> The recursion for D-vines is more symmetric: each conditional marginal is built from h-functions on both left and right ends.
>
> **Level 1:** $F_{1|2} = h(F_1 \mid F_2, \theta_{12})$; $F_{3|2} = h(F_3 \mid F_2, \theta_{23})$; $F_{2|3} = h(F_2 \mid F_3, \theta_{23})$; $F_{4|3} = h(F_4 \mid F_3, \theta_{34})$.
>
> **Level 2:** $F_{1|23} = h(F_{1|2} \mid F_{3|2}, \theta_{13|2})$; $F_{4|23} = h(F_{4|3} \mid F_{2|3}, \theta_{24|3})$.
>
> **Level 3:** $c_{14|23}(F_{1|23}, F_{4|23})$ — this is the final pair-copula; no h-function required unless $d > 4$.
^def-dvine-h

---

### Choosing Between C-Vine and D-Vine

> [!theorem] Structural interpretation and selection criterion
> **Use a C-vine** when one variable (the root $j_1$ of $T_1$) drives the dependence of all others. The unconditional pair-copulas $c_{j_1, j_\ell}$ capture the direct pairwise dependence between the hub variable and each other; residual dependence after accounting for the hub is captured at higher trees. Natural applications: **a market index** explaining equity returns (the index is the C-vine root), **a macroeconomic factor** explaining sector performance, or **a central variable** in a Bayesian network that is a parent of all others.
>
> **Use a D-vine** when variables have a natural **sequential ordering** and dependence decays with distance in the ordering. Pair-copulas in $T_1$ link adjacent variables; higher trees capture the conditional dependence of variables further apart given those between them. Natural applications: **time-series lag dependence** (variables ordered chronologically), **spatial chains** (variables ordered by geographic proximity), **multivariate copula regression** (response variable at one end of the chain).
>
> **Quantitative selection:** Choose the ordering (root sequence for C-vine, variable sequence for D-vine) that maximises the sum of absolute Kendall's $\tau$ of the pair-copulas in tree $T_1$. For the full order selection across C- and D-vines and general R-vines, see [[Regular Vine Copulas and R-Vine Selection]].
^thm-choice

## Examples

> [!example] 5-variable C-vine vs. D-vine parameter count
> For $d=5$: $5 \times 4 / 2 = 10$ pair-copulas in both cases.
>
> **C-vine** (root ordering $1, 2, 3, 4, 5$):
> - $T_1$: $(1,2), (1,3), (1,4), (1,5)$ — 4 pair-copulas
> - $T_2$: $(2,3|1), (2,4|1), (2,5|1)$ — 3 pair-copulas
> - $T_3$: $(3,4|12), (3,5|12)$ — 2 pair-copulas
> - $T_4$: $(4,5|123)$ — 1 pair-copula
>
> **D-vine** (ordering $1, 2, 3, 4, 5$):
> - $T_1$: $(1,2), (2,3), (3,4), (4,5)$ — 4 pair-copulas
> - $T_2$: $(1,3|2), (2,4|3), (3,5|4)$ — 3 pair-copulas
> - $T_3$: $(1,4|23), (2,5|34)$ — 2 pair-copulas
> - $T_4$: $(1,5|234)$ — 1 pair-copula

> [!example] R implementation (rvinecopulib)
> ```r
> library(rvinecopulib)
>
> # Fit a D-vine with specified variable ordering
> structure <- dvine_structure(order = 1:d)
> fit <- vinecop(u, structure = structure, family_set = "parametric")
>
> # Fit a C-vine with specified root order
> structure <- cvine_structure(order = 1:d)
> fit <- vinecop(u, structure = structure, family_set = "parametric")
>
> # Automatic R-vine structure selection (Dissmann et al. 2013)
> fit <- vinecop(u, family_set = "parametric")  # default: greedy R-vine
>
> # Simulate from fitted vine
> sim <- rvinecop(1000, fit)
> ```

## Connections

- [[Vine Copulas - Overview]] — the PCC idea and general density decomposition.
- [[Regular Vine Copulas and R-Vine Selection]] — the general R-vine that subsumes C- and D-vines; greedy structure selection.
- [[Copula Architecture Comparison]] — vine vs. factor copula architectures: when each is preferred.
- [[Factor Copulas - Overview]] — the competing architecture (latent factor structure, SMM estimation).
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used to select vine ordering.

## See Also

- [[Tail Dependence in Factor Copulas]] — for C-vine or D-vines with Student's $t$ pair-copulas, tail dependence at each bivariate margin is positive and analytically tractable; the vine's tail dependence structure is more flexible but harder to characterise analytically
- [[../_Index|Econometrics]]
