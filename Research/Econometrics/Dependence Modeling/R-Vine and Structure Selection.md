---
title: "R-Vine and Structure Selection"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Dissmann-2013-Regular-Vine-Selection-stub.md]]"
source_location: "Dissmann et al. (2013), Secs. 2–4; arXiv:1202.2002"
date_ingested: 2026-10-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - R-vine
  - regular vine
  - vine structure selection
  - Dissmann 2013
---

# R-Vine and Structure Selection

> [!summary]
> A **regular vine** (R-vine) is the general graph-theoretic framework for pair-copula constructions: a sequence of nested spanning trees where each tree's nodes are the edges of the previous tree (the *proximity condition*). C-vines and D-vines are special cases. Dissmann et al. (2013) derive the general R-vine density and propose a sequential, tree-by-tree **structure selection algorithm**: at each tree level, choose the spanning tree that maximizes the sum of absolute Kendall $\tau$ values across its edges. The algorithm is implemented in the `VineCopula` R package and `pyvinecopulib`.

## Overview

While C-vines and D-vines are analytically convenient, neither may be optimal for a given dataset. Real data may exhibit a dependence structure where neither a star nor a path topology captures the strongest conditional dependencies at each tree level. Bedford & Cooke (2001, 2002) introduced the general **regular vine** (R-vine) to encompass all valid tree structures, and Dissmann et al. (2013) showed how to select the structure from data.

## Main Content

### R-vine graph definition

> [!definition] Regular vine (Bedford & Cooke 2002)
> A **regular vine** $\mathcal{V}$ on $n$ variables is a sequence of trees $T_1, T_2, \ldots, T_{n-1}$ where:
>
> 1. **$T_1$** is a connected tree with $n$ nodes (the variables $\{1, \ldots, n\}$) and $n-1$ edges.
> 2. **$T_k$ for $k \geq 2$**: nodes of $T_k$ are the edges of $T_{k-1}$; $T_k$ is a connected tree with $n-k$ edges.
> 3. **Proximity condition**: two nodes in $T_k$ (i.e. two edges in $T_{k-1}$) can be connected only if the corresponding edges in $T_{k-1}$ share a node.
>
> The proximity condition ensures that conditioning sets grow in a coherent way: if edge $\{e_1, e_2\}$ exists in $T_k$, then $e_1$ and $e_2$ share exactly one variable in common, and that variable forms part of the conditioning set for the corresponding pair copula.
^def-rvine

> [!definition] R-vine density (Dissmann et al. 2013)
> For an R-vine $\mathcal{V}$ on $n$ variables with edge set $E(\mathcal{V}) = \bigcup_{k=1}^{n-1} E(T_k)$, the joint density under the simplifying assumption is:
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{k=1}^{n-1} \prod_{e = \{j(e), k(e)\} \in E(T_k)} c_{j(e),k(e) | D(e)}\bigl(F(x_{j(e)}|\mathbf{x}_{D(e)}),\, F(x_{k(e)}|\mathbf{x}_{D(e)})\bigr)$$
> where for each edge $e \in E(T_k)$: $j(e)$ and $k(e)$ are the **conditioned** variables, $D(e)$ is the **conditioning set** (the symmetric difference of the two node labels in $T_k$, which are edge labels from $T_{k-1}$), and conditional CDFs are computed via iterated h-functions.
>
> **Key insight:** C-vines arise when every tree is a star. D-vines arise when every tree is a path. All other R-vines lie between these extremes and are covered by the same formula.
^def-rvine-density

### Structure selection algorithm

> [!definition] Sequential maximum-spanning-tree algorithm (Dissmann et al. 2013)
> **Idea:** At each tree level $T_k$, select the tree structure that maximizes empirical dependence strength (measured by absolute Kendall $\tau$) across its edges.
>
> **Algorithm:**
> 1. **Compute** pairwise absolute Kendall $\tau$ values for all eligible pairs at tree $T_k$ (all pairs satisfying the proximity condition).
> 2. **Select** the spanning tree that maximizes $\sum_{e \in T_k} |\hat{\tau}_e|$ — the **maximum-weight spanning tree** (Prim's or Kruskal's algorithm).
> 3. **Estimate** the pair-copula family and parameters for each selected edge using the AIC-optimal bivariate copula family (tested over Gaussian, $t$, Clayton, Gumbel, Frank, Joe and rotations).
> 4. **Compute** h-function outputs for each edge to form pseudo-observations for tree $T_{k+1}$.
> 5. Repeat steps 1–4 for $k = 1, \ldots, n-2$.
>
> **Justification:** The absolute Kendall $\tau$ measures the strength of pairwise dependence in a rank-based, copula-invariant way. Maximizing it over the spanning tree greedily ensures the most strongly dependent pairs are modeled at the lowest (unconditional) tree levels, where ignoring the conditioning set is least costly.
^def-structure-selection

> [!definition] Copula family selection per pair
> For each selected edge, the optimal copula family is chosen by AIC over a menu of candidate families. Standard menus include:
>
> | Family | Tail dependence | Asymmetry |
> |--------|----------------|-----------|
> | Gaussian | None | Symmetric |
> | Student's $t$ | Both tails | Symmetric |
> | Clayton | Lower tail only | Asymmetric |
> | Gumbel | Upper tail only | Asymmetric |
> | Frank | None | Symmetric |
> | Joe | Upper tail only | Asymmetric |
> | BB1 (Clayton-Gumbel) | Both tails | Asymmetric |
> | Rotated variants | Mirror image | — |
> | Independence | — | — |
>
> The independence copula ($c_{ij|\mathbf{d}} = 1$ everywhere) is an important option: if the conditional pair shows no dependence, pruning it reduces the model's parameter count without loss.
^def-family-selection

### The parsimonious truncated vine

> [!definition] Truncated R-vine
> When the conditional Kendall $\tau$ values at tree $T_k$ and beyond are all small, one can **truncate** the vine at level $k$: set all pair copulas for $T_{k+1}, \ldots, T_{n-1}$ to independence. A truncated vine at level $k$ has only $k(n-1) - \binom{k}{2}$ pair copulas instead of $\binom{n}{2}$ — a large saving for $n$ moderate and $k$ small (e.g. $k=2$ for $n=20$ uses 37 pair copulas vs. 190). This is a practical parsimony device widely used in empirical applications.
^def-truncated

## Connections

- [[Vine Copulas - Overview]] — motivation, C-vine vs D-vine intuition.
- [[Pair Copula Construction]] — the h-function recursion used at each tree level.
- [[Copula Architecture Comparison]] — how the vine's flexibility compares to the factor copula's parsimony.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the selection criterion at each tree level.
- [[SMM Estimation of Factor Copulas]] — contrast: vine copula selects structure, factor copula imposes structure.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — the factor copula's analogue to "structure selection" is choosing the number and grouping of factors (a much simpler choice).
- [[Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
