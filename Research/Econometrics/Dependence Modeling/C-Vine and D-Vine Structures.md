---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Literature-Survey.md]]"
source_location: "Aas et al. (2009), Secs. 3.1-3.2, pp. 185-188"
date_ingested: 2026-09-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Decomposition]]"
used_by:
  - "[[R-Vine Structure Selection]]"
  - "[[Vine Copula Estimation and Software]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine (canonical vine)** and **D-vine (drawable vine)** are the two most widely used special cases of regular vines. In a C-vine, each tree has a single "root" variable that connects to all others — appropriate when one variable drives dependence with the rest (e.g. a market index). In a D-vine, each tree is a path — appropriate when variables have a natural linear order (e.g. time, geography). Both are special cases of the general [[R-Vine Structure Selection|R-vine]].

## Overview

For $d$ variables, any R-vine has $d-1$ trees and $\binom{d}{2}$ pair copulas. C-vines and D-vines restrict the tree topology to two canonical forms, which (i) yield closed-form density expressions, (ii) make simulation and h-function recursion transparent, and (iii) require specifying only the *ordering* of variables (not a general graph). For small-to-moderate $d$, choosing between C-vine, D-vine, and general R-vine is one of the first modelling decisions.

## Main Content

> [!definition] C-Vine (Canonical Vine)
> A **C-vine** on $d$ variables is an R-vine where each tree $T_k$ ($k=1,\ldots,d-1$) has a **star topology**: one "root" node connects to all $d-k$ remaining nodes. Let $j_k$ denote the root of $T_k$. The pair copulas and conditioning sets are:
>
> - $T_1$: edges $\{j_1, \ell\}$ for all $\ell \neq j_1$ (no conditioning set); $d-1$ unconditional pair copulas.
> - $T_2$: edges $\{j_2, \ell\} | j_1$ for all $\ell \neq j_1, j_2$; $d-2$ pair copulas conditioned on $X_{j_1}$.
> - $T_k$: edges $\{j_k, \ell\} | j_1, \ldots, j_{k-1}$ for all $\ell \notin \{j_1,\ldots,j_k\}$; conditioning set has $k-1$ variables.
>
> **C-vine density** (with variables ordered $1, 2, \ldots, d$ and root $k$ for tree $T_k$):
> $$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,j+i|1,\ldots,j-1}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_{j+i}|x_1,\ldots,x_{j-1})\right)$$
>
> **When to use:** When a single variable (e.g. a market factor, temperature) is theoretically expected to drive all pairwise dependence. Placing that variable as root in $T_1$ captures its pairwise relationships first; subsequent trees model residual conditional dependence.
^def-cvine

> [!definition] D-Vine (Drawable Vine)
> A **D-vine** on $d$ variables is an R-vine where each tree $T_k$ is a **path**: every node has degree at most 2. Given an ordering $1, 2, \ldots, d$:
>
> - $T_1$: path $1 - 2 - 3 - \cdots - d$; edges $(1,2), (2,3), \ldots, (d-1,d)$; $d-1$ unconditional copulas.
> - $T_2$: nodes are edges of $T_1$; path is $(1,3)|2 - (2,4)|3 - \cdots - (d-2,d)|d-1$; $d-2$ copulas conditioned on one variable.
> - $T_k$: path of $d-k$ edges; each pair copula conditioned on $k-1$ variables.
>
> **D-vine density:**
> $$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1:\,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$
>
> **When to use:** When variables have a natural sequential order: time series (lag-1 dependence strongest), spatial locations along a transect, ordinal categories. The path structure in $T_1$ captures nearest-neighbour dependence; higher trees capture longer-range conditional dependence.
^def-dvine

> [!definition] C-vine vs D-vine: structural comparison
>
> | Property | C-vine | D-vine |
> |----------|--------|--------|
> | $T_k$ topology | Star (one root) | Path (each node degree ≤ 2) |
> | Pairs in $T_1$ | $(j_1, \ell)$ for all $\ell \neq j_1$ | $(1,2),(2,3),\ldots,(d-1,d)$ |
> | Root variable | One per tree, must be chosen | N/A (path ordering) |
> | Natural for | One dominant variable | Ordered/sequential variables |
> | Conditioning set size | Grows as conditioning set $\{j_1,\ldots,j_{k-1}\}$ | $k-1$ consecutive variables |
> | Parameters (total) | $\binom{d}{2}$ pair copulas | $\binom{d}{2}$ pair copulas |
> | Special case of | R-vine | R-vine |
>
> Both C-vine and D-vine are special cases of the general [[R-Vine Structure Selection|R-vine]]; for $d \leq 3$, all three coincide.
^def-comparison

## Examples

> [!example] 4-dimensional C-vine with root order 1, 2, 3, 4
>
> **Tree $T_1$** (star at node 1): edges $(1,2), (1,3), (1,4)$.
> Pair copulas: $c_{12}(u_1,u_2)$, $c_{13}(u_1,u_3)$, $c_{14}(u_1,u_4)$.
>
> **Tree $T_2$** (star at node 2, conditioned on $X_1$): edges $(2,3)|1, (2,4)|1$.
> Inputs: $v_{2|1}=h(u_2|u_1;\hat\theta_{12})$; $v_{3|1}=h(u_3|u_1;\hat\theta_{13})$; $v_{4|1}=h(u_4|u_1;\hat\theta_{14})$.
> Pair copulas: $c_{23|1}(v_{2|1},v_{3|1})$, $c_{24|1}(v_{2|1},v_{4|1})$.
>
> **Tree $T_3$** (one edge $(3,4)|1,2$): Input: $v_{3|12}=h(v_{3|1}|v_{2|1};\hat\theta_{23|1})$; $v_{4|12}=h(v_{4|1}|v_{2|1};\hat\theta_{24|1})$.
> Pair copula: $c_{34|12}(v_{3|12},v_{4|12})$.
>
> **Total:** 6 pair copulas = $\binom{4}{2}$.

> [!example] 4-dimensional D-vine with ordering 1, 2, 3, 4
>
> **Tree $T_1$** (path 1-2-3-4): edges $(1,2),(2,3),(3,4)$.
> Pair copulas: $c_{12},\,c_{23},\,c_{34}$ (all unconditional).
>
> **Tree $T_2$** (path $(1,3)|2 \;-\; (2,4)|3$):
> $u_{1|2}=h(u_1|u_2;\hat\theta_{12})$, $u_{3|2}=h(u_3|u_2;\hat\theta_{23})$, $u_{2|3}=h(u_2|u_3;\hat\theta_{23})$, $u_{4|3}=h(u_4|u_3;\hat\theta_{34})$.
> Pair copulas: $c_{13|2}(u_{1|2},u_{3|2})$, $c_{24|3}(u_{2|3},u_{4|3})$.
>
> **Tree $T_3$** (edge $(1,4)|2,3$):
> $u_{1|23}=h(u_{1|2}|u_{3|2};\hat\theta_{13|2})$, $u_{4|23}=h(u_{4|3}|u_{2|3};\hat\theta_{24|3})$.
> Pair copula: $c_{14|23}(u_{1|23},u_{4|23})$.

## Connections

- [[Vine Copulas - Overview]] — the general vine framework; C-vine and D-vine are named special cases.
- [[Pair Copula Decomposition]] — the h-functions and density formula that both structures use.
- [[R-Vine Structure Selection]] — the general R-vine, of which C-vine and D-vine are special cases; Dissmann's algorithm selects structures data-adaptively and often produces neither.
- [[Vine Copula Estimation and Software]] — VineCopula `C2RVine` and `D2RVine` functions implement these specific structures.
- [[Factor Copulas - Overview]] — factor copulas impose an implicit equidependence structure (all pairs share a copula); C-vine allows a dominant variable but each pair has its own copula.

## See Also

- [[../_Index|Econometrics]]
