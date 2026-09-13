---
title: C-vine and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.md]]"
source_location: "Sec. 2.3-2.4, pp. 186-189"
date_ingested: 2026-09-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Decomposition]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - regular vine tree
---

# C-vine and D-vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two simplest and most-used regular vine structures. A C-vine at each tree has one "root" variable connected to all others (star topology); a D-vine at each tree arranges variables in a path (path topology). For $n$ variables, both have exactly $\binom{n}{2}$ pair copulas. The choice between them is a modelling decision: C-vines are natural when one variable drives the dependence of all others (e.g. a market index); D-vines are natural when variables are ordered sequentially (e.g. a time series of lags).

## Overview

A regular vine on $n$ variables produces $n-1$ trees and $\binom{n}{2}$ pair copulas. The C-vine and D-vine provide two particular ways to arrange the tree edges that are easy to specify, interpret, and estimate. More general R-vine structures allow any valid tree sequence and can be selected by data-driven algorithms (e.g. maximum spanning tree on pairwise Kendall's $\tau$).

## Main Content

> [!definition] C-vine (canonical vine)
> In a **C-vine**, each tree $T_k$ has a single **root node** — one variable that is connected to all $n-k$ other nodes in that tree. The root at level $k$ is the variable that has already conditioned on the roots of levels $1, \ldots, k-1$.
>
> For $n=4$ variables with roots $1, 2, 3$:
> - **$T_1$:** Root = node 1; edges: (1,2), (1,3), (1,4) — 3 pair copulas $c_{12}$, $c_{13}$, $c_{14}$.
> - **$T_2$:** Root = node 2 | 1; edges: (2,3|1), (2,4|1) — 2 pair copulas $c_{23|1}$, $c_{24|1}$.
> - **$T_3$:** Root = node 3 | 1,2; edge: (3,4|1,2) — 1 pair copula $c_{34|12}$.
>
> **Density:**
> $$f(x_1,\ldots,x_4) = \left[\prod_{k=1}^4 f_k(x_k)\right]\cdot c_{12}\cdot c_{13}\cdot c_{14}\cdot c_{23|1}\cdot c_{24|1}\cdot c_{34|12}$$
> where all copulas are evaluated at the appropriate conditional CDFs (computed via h-functions — see [[Pair Copula Decomposition]]).
>
> **General formula (C-vine):**
> $$f(\mathbf{x}) = \prod_{k=1}^n f_k(x_k)\cdot \prod_{j=1}^{n-1}\prod_{i=j+1}^{n} c_{j,i|1,\ldots,j-1}$$
>
> **When to use:** C-vines are natural when one variable is a common driver of all others — e.g. a market index (variable 1 conditions all other asset pairs), a latent factor, or an explanatory variable in a regression context.
^def-cvine

> [!definition] D-vine (drawable vine)
> In a **D-vine**, variables are arranged along a **path** at each tree level. Each node has at most 2 neighbours, giving the tree a path (chain) topology.
>
> For $n=4$ variables ordered as 1–2–3–4:
> - **$T_1$:** Path: edges (1,2), (2,3), (3,4) — 3 pair copulas $c_{12}$, $c_{23}$, $c_{34}$.
> - **$T_2$:** Path: edges (1,3|2), (2,4|3) — 2 pair copulas $c_{13|2}$, $c_{24|3}$.
> - **$T_3$:** Path: edge (1,4|2,3) — 1 pair copula $c_{14|23}$.
>
> **Density:**
> $$f(x_1,\ldots,x_4) = \left[\prod_{k=1}^4 f_k(x_k)\right]\cdot c_{12}\cdot c_{23}\cdot c_{34}\cdot c_{13|2}\cdot c_{24|3}\cdot c_{14|23}$$
>
> **General formula (D-vine):**
> $$f(\mathbf{x}) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,i+j|i+1,\ldots,i+j-1}$$
>
> **When to use:** D-vines are natural when there is a natural ordering of the variables — a time series of lags, a spatial sequence, or variables whose direct neighbour dependence is strongest and higher-order dependence decays. Common in time-series applications.
^def-dvine

> [!definition] Comparison of vine structures
> | Property | C-vine | D-vine |
> |---|---|---|
> | Tree topology | Star (one root per tree) | Path (chain) |
> | Root variable | Specified at each level | Determined by the ordering |
> | Interpretability | Root captures common driver | Sequential dependence along a path |
> | Pair copulas at $T_1$ | $n-1$ (all share root) | $n-1$ (consecutive pairs) |
> | Parameters | $\binom{n}{2}$ pair copulas total | $\binom{n}{2}$ pair copulas total |
> | Natural use case | Market/common factor data | Time series, spatial data |
> | R-vine special case? | Yes | Yes |
>
> Both C-vine and D-vine are special cases of the general **R-vine** (regular vine). The most general R-vine structure can be selected by data-driven tree-building algorithms (maximum spanning tree on pairwise dependence measures at each level), implemented in the `VineCopula` R package and `pyvinecopulib`.
^def-comparison

> [!definition] Truncated vines
> When $n$ is large, fitting all $\binom{n}{2}$ pair copulas is computationally expensive and may overfit. A **truncated vine** of order $m$ uses pair copulas only at levels $T_1, \ldots, T_m$ and assumes conditional independence at deeper levels (i.e., $c_{jk|D} = 1$ for $|D| \geq m$). This reduces the number of parameters to $m(n - m/2 - 1/2)$, balancing flexibility and parsimony. Truncation is selected by testing conditional independence at each tree level (Brechmann et al. 2012).
^def-truncated

## Examples

> [!example] 4-variable C-vine vs D-vine: which pair copulas differ?
> For $n=4$ variables, both C-vine and D-vine have 6 pair copulas (trees $T_1$ through $T_3$).
>
> **C-vine (root order 1, 2, 3):** $c_{12}$, $c_{13}$, $c_{14}$, $c_{23|1}$, $c_{24|1}$, $c_{34|12}$
> **D-vine (order 1-2-3-4):** $c_{12}$, $c_{23}$, $c_{34}$, $c_{13|2}$, $c_{24|3}$, $c_{14|23}$
>
> They share $c_{12}$ and (by different routes) $c_{34}$, but the higher-level conditioning is different. The C-vine captures how variables 2, 3, 4 are mutually related *after conditioning out variable 1*; the D-vine captures how adjacent variables are related and then propagates the conditioning sequentially.
>
> **Practical choice:** If variable 1 is a market return and 2–4 are individual stocks, the C-vine is natural (variable 1 is the common driver). If variables are temperature readings at locations 1–4 along a river, the D-vine is natural (adjacent locations are most directly dependent).

## Connections

- [[Vine Copulas - Overview]] — motivation and the simplifying assumption that makes both structures tractable.
- [[Pair Copula Decomposition]] — the formal density factorization and h-function that both structures rely on.
- [[Vine Copula Estimation and Selection]] — how to estimate pair copulas tree by tree and select the vine structure and pair copula families.
- [[Factor Copulas - Overview]] — the main alternative for high dimensions; compare the star topology of C-vine (one root, like a factor) with the full factor copula's latent-variable formulation.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — factor copulas with industry blocks; compare with the C-vine where the first tree has one variable connected to all others.
- [[../_Index|Econometrics]]
