---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.md]]"
source_location: "Aas et al. (2009) Sec. 2.1–2.3; Brechmann & Schepsmeier (2013) Sec. 2"
date_ingested: 2026-08-30
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Decomposition]]"
used_by:
  - "[[Regular Vines and Structure Selection]]"
  - "[[Vine Copula Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine tree structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine (canonical vine)** and **D-vine (drawable vine)** are the two structured special cases of vine copulas introduced by Aas et al. (2009). In a C-vine, each tree is a **star** — one root variable governs all conditional pairs. In a D-vine, each tree is a **path** — no variable is privileged. The choice between them determines which variable is the "hub" of dependence in each tree level and drives both interpretability and estimation efficiency.

## Overview

When using vine copulas, the practitioner must choose a vine structure — which variable is paired with which at each tree level, and what the conditioning sets are. The canonical (C-) and drawable (D-) vine are two structured templates that restrict the combinatorial choice and make model interpretation transparent:

- **C-vine:** one variable is chosen as the "root" at each tree level; it is paired with every other variable unconditionally (tree 1) or conditionally (deeper trees). Appropriate when one variable (e.g., a market index or a common shock) dominates the dependence structure.
- **D-vine:** variables are ordered along a path; each variable is paired only with its neighbours. Appropriate for ordered structures like time series lags, spatial gradients, or interest rate maturities.

## Main Content

> [!definition] C-vine (canonical vine)
> For variables $(X_1,\dots,X_d)$ ordered so that $X_1$ is the most important in the first tree, $X_2$ the most important conditional on $X_1$, etc., the **C-vine** has:
>
> **Tree $T_1$:** $d-1$ edges, all involving $X_1$ as the root:
> $$\text{Edges: } (1,2),\;(1,3),\;\dots,\;(1,d)$$
> Pair copulas: $c_{12}, c_{13}, \dots, c_{1d}$ — all unconditional.
>
> **Tree $T_2$:** $d-2$ edges, all conditioned on $X_1$:
> $$\text{Edges: } (2,3|1),\;(2,4|1),\;\dots,\;(2,d|1)$$
> Pair copulas: $c_{23|1}, c_{24|1}, \dots, c_{2d|1}$.
>
> **Tree $T_j$:** $d-j$ edges; root $X_j$ is paired with each remaining variable, all conditioned on $\{X_1,\dots,X_{j-1}\}$:
> $$\text{Edges: } (j,j+1|1,\dots,j-1),\;\dots,\;(j,d|1,\dots,j-1)$$
>
> **Joint density:** With $F_{i|j,1,\dots,j-1}$ denoting the conditional CDF of $X_i$ given $X_j$ and all previous roots:
> $$f(x_1,\dots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|1,\dots,j-1}\!\left(F_{j|1,\dots,j-1},\, F_{i|1,\dots,j-1}\right)$$
^def-cvine

> [!definition] D-vine (drawable vine)
> For variables $(X_1,\dots,X_d)$ arranged in a sequence (a "path order"), the **D-vine** has:
>
> **Tree $T_1$:** $d-1$ edges along the path:
> $$\text{Edges: } (1,2),\;(2,3),\;(3,4),\;\dots,\;(d-1,d)$$
> Pair copulas: $c_{12}, c_{23}, \dots, c_{d-1,d}$ — adjacent unconditional pairs.
>
> **Tree $T_2$:** $d-2$ edges; skip-one pairs, conditioned on the middle:
> $$\text{Edges: } (1,3|2),\;(2,4|3),\;\dots,\;(d-2,d|d-1)$$
>
> **Tree $T_j$:** $d-j$ edges; each edge $(i, i+j\,|\,i+1,\dots,i+j-1)$ for $i=1,\dots,d-j$:
>
> **Joint density:**
> $$f(x_1,\dots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\dots,i+j-1}\!\left(F_{i|i+1,\dots,i+j-1},\, F_{i+j|i+1,\dots,i+j-1}\right)$$
^def-dvine

> [!definition] Comparing C-vine and D-vine
> | Property | C-vine | D-vine |
> |----------|--------|--------|
> | Tree $T_j$ shape | Star (one root, all others as leaves) | Path (linear chain) |
> | Root of $T_j$ | Variable $X_j$ | No single root |
> | # pair copulas | $d(d-1)/2$ (same) | $d(d-1)/2$ (same) |
> | Conditioning set size at $T_j$ | $j-1$ (grows by 1 each level) | $j-1$ (same) |
> | Interpretable structure | When one variable drives dependence | When variables have a natural order |
> | Application example | Factor model, market index dominant | Term structure, lag order, spatial proximity |
> | Ordering choice | Root variable order per tree | Path order of variables |
^def-comparison

> [!definition] Tree diagrams — 4-dimensional example
> **C-vine (order $X_1, X_2, X_3, X_4$):**
>
> Tree $T_1$:
> $X_1 -\!\!\!-\!\!\!- X_2$, $X_1 -\!\!\!-\!\!\!- X_3$, $X_1 -\!\!\!-\!\!\!- X_4$
> (star centred at $X_1$; pair copulas $c_{12}, c_{13}, c_{14}$)
>
> Tree $T_2$ (edges of $T_1$ become nodes; share $X_1$):
> $(1,2) -\!\!\!- (1,3)$ with pair copula $c_{23|1}$
> $(1,2) -\!\!\!- (1,4)$ with pair copula $c_{24|1}$
> (star centred at node $(1,2)$)
>
> Tree $T_3$:
> $(2,3|1) -\!\!\!- (2,4|1)$ with pair copula $c_{34|12}$
> (single edge)
>
> **D-vine (order $X_1, X_2, X_3, X_4$):**
>
> Tree $T_1$: path $X_1 -\!\!\!- X_2 -\!\!\!- X_3 -\!\!\!- X_4$; pair copulas $c_{12}, c_{23}, c_{34}$
>
> Tree $T_2$: path $(1,2) -\!\!\!- (2,3) -\!\!\!- (3,4)$; pair copulas $c_{13|2}, c_{24|3}$
>
> Tree $T_3$: single edge $(1,3|2) -\!\!\!- (2,4|3)$; pair copula $c_{14|23}$
^def-4d-trees

> [!definition] h-function recursion for C-vine
> Starting from $v_{j,1} = F_j(x_j) = u_j$ (PIT-transformed observations), the conditional CDFs needed for the $j$-th root pair copulas are built as:
> $$v_{i,j+1} = h\!\left(v_{i,j},\, v_{j,j}\,;\, \theta_{j,i|1,\dots,j-1}\right), \quad i > j$$
> where $h(u,v;\theta) = \partial C(u,v;\theta)/\partial v$ is the h-function (→ [[Pair-Copula Decomposition]]).
> Similarly for D-vine: the h-function is applied sequentially along the path, alternating $h$ and $h^{-1}$ directions.
^def-hrecursion

## Examples

> [!example] Application heuristics
> **When to choose C-vine:** financial data with one dominant sector/market index; data where one variable clearly has the highest average dependence with all others. In practice: compute Kendall's $\tau$ between all pairs; choose as root the variable with the highest sum of $|\tau|$ with all others.
>
> **When to choose D-vine:** ordered data — interest rate maturities (yield curve shape), time series (autoregressive lags), or spatial data (grid neighbours). The natural ordering captures the path dependence explicitly.
>
> **Empirical evidence:** Aas et al. (2009) applied both C- and D-vine to Norwegian financial data (4 stocks + 2 currencies). Model selection via AIC/BIC typically identified Student-$t$ pair copulas for most pairs; the fit was substantially better than a Gaussian copula baseline.

## Connections

- [[Vine Copulas - Overview]] — the general vine copula concept of which C- and D-vines are special cases.
- [[Pair-Copula Decomposition]] — the h-function recursion that makes these densities computable.
- [[Regular Vines and Structure Selection]] — the general R-vine that allows arbitrary tree structures, not just star or path; Dissmann's greedy algorithm for structure selection.
- [[Vine Copula Estimation]] — sequential MLE estimation tree by tree using the h-function; applied identically to C- and D-vines.

## See Also

- [[Factor Copulas - Overview]] — an alternative that imposes factor structure rather than pair-by-pair structure; dominates in $d > 50$.
- [[../_Index|Econometrics]]
