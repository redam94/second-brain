---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Survey.md]]"
source_location: "§3 (Bedford & Cooke 2002, Secs. 3–4; Aas et al. 2009, Secs. 2–3; Czado 2010, Sec. 3)"
date_ingested: 2026-07-19
date_updated: 2026-07-19
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine canonical vine
  - D-vine drawable vine
  - vine tree structure
  - R-vine regular vine
---

# C-Vine and D-Vine Structures

> [!summary]
> **C-vines** (canonical vines) and **D-vines** (drawable vines) are the two most common special cases of Bedford & Cooke's (2002) **regular vine**. In a C-vine, each tree is a *star* with one root node connected to all others — appropriate when one variable drives most co-movement (analogous to a factor model). In a D-vine, each tree is a *path* — appropriate when variables have a natural ordering (time, maturity, space). Both imply the same total parameter count $N(N-1)/2$ pair copulas but differ in which pairs are conditioned on which variables, and which copula families are most natural to use. The **R-vine** is the general case, allowing arbitrary tree shapes satisfying the proximity condition; structure selection uses a maximum spanning tree algorithm.

## Overview

A vine on $N$ variables is a sequence of $N-1$ trees that organizes the $N(N-1)/2$ pair copulas of the PCC. The choice of vine structure determines:
1. **Which variable pairs are modeled unconditionally** (tree 1) vs. conditionally (higher trees).
2. **The conditioning sets**: the larger the conditioning set, the more computation needed (more h-function passes) and the more the pair copula captures residual dependence.
3. **Interpretability**: C-vines make the "hub" variable's role explicit; D-vines follow a natural ordering.

This note covers the formal definitions, density forms, and typical use cases of C-vines, D-vines, and R-vines.

## Main Content

### Canonical Vine (C-Vine)

> [!definition] C-vine structure
> A **canonical vine** (C-vine) on $N$ variables with ordering $(j_1, j_2, \ldots, j_N)$ has:
>
> - **Tree $T_k$**: a star graph with root $j_k$ and leaves $\{j_{k+1}, \ldots, j_N\}$.
>   - Nodes of $T_k$: all pairs $(j_k, j_i | j_1, \ldots, j_{k-1})$ for $i = k+1, \ldots, N$.
>   - Edges of $T_k$: connect the root to all other nodes; there are $N-k$ edges.
>
> In tree $T_1$, the root $j_1$ is connected to all $N-1$ other variables. In tree $T_2$, the root $j_2$ conditions on $j_1$ and connects to all remaining variables. Etc.
>
> **Pair copulas** in a C-vine with variables $1, 2, \ldots, N$ and root ordering $1, 2, \ldots, N$:
> - Tree 1: $(1,2), (1,3), (1,4), \ldots, (1,N)$ — all unconditional pairs with variable 1.
> - Tree 2: $(2,3|1), (2,4|1), \ldots, (2,N|1)$ — pairs with variable 2, conditioned on 1.
> - Tree $k$: $(k, k+1|1:\ldots:k-1), \ldots, (k, N|1:\ldots:k-1)$.
> - Tree $N-1$: $(N-1, N|1:2:\ldots:N-2)$ — a single pair.
>
> Total pair copulas: $\sum_{k=1}^{N-1}(N-k) = N(N-1)/2$.
> ^def-cvine

> [!definition] C-vine density
> For $N$ variables with C-vine ordering $(1, 2, \ldots, N)$:
> $$f(\mathbf{x}) = \prod_{k=1}^N f_k(x_k) \cdot \prod_{j=1}^{N-1}\prod_{i=j+1}^{N} c_{j,i|1:\ldots:j-1}\!\bigl(F_{j|1:\ldots:j-1}(\cdot),\; F_{i|1:\ldots:j-1}(\cdot)\bigr)$$
> where $F_{j|1:\ldots:j-1}$ is the conditional CDF of $X_j$ given $(X_1, \ldots, X_{j-1})$, computed sequentially via h-functions:
> $$F_{j|1:\ldots:j-1}(x_j | x_1, \ldots, x_{j-1}) = h\!\bigl(F_{j|1:\ldots:j-2}(x_j|\cdot),\; F_{j-1|1:\ldots:j-2}(x_{j-1}|\cdot);\; \theta_{j-1,j|1:\ldots:j-2}\bigr)$$
> ^def-cvine-density

> [!example] C-vine for a market factor model
> **Setting**: $N=4$ assets where $X_1$ is the market index and $X_2, X_3, X_4$ are sector ETFs.
>
> **Tree 1** (market ↔ sectors): pairs $(1,2), (1,3), (1,4)$. Use **Student-$t$** copulas to capture fat-tailed market co-movement.
>
> **Tree 2** (sector ↔ sector conditional on market): pairs $(2,3|1), (2,4|1), (3,4|1)$. Use **Clayton** copulas for credit-related sectors (lower-tail dependence in downturns), **independence** for uncorrelated residual sectors.
>
> **Tree 3** (conditional on market and first sector): pair $(3,4|1,2)$. Often use **independence copula** here — by tree 3, most dependence has been absorbed.
>
> **Interpretation**: The C-vine centers the model on the market index; all dependence flows through $X_1$ in tree 1, and residual sector co-movement is captured in tree 2. This mirrors the factor-model intuition but uses flexible pair copula families rather than a linear factor equation.
>
> **Total parameters**: $3 + 3 + 1 = 7$ pair copulas, each with 1–2 parameters.

### Drawable Vine (D-Vine)

> [!definition] D-vine structure
> A **drawable vine** (D-vine) on $N$ variables with ordering $(1, 2, \ldots, N)$ has:
>
> - **Tree $T_k$**: a path graph $1 - 2 - 3 - \cdots - (N-k)$ where the nodes are edges of $T_{k-1}$.
>   - Tree 1 edges: $(1,2), (2,3), (3,4), \ldots, (N-1, N)$ — $N-1$ adjacent pairs.
>   - Tree 2 edges: $(1,3|2), (2,4|3), \ldots, (N-2, N|N-1)$ — $N-2$ skip-1 pairs.
>   - Tree $k$ edges: $(i, i+k | i+1, \ldots, i+k-1)$ for $i=1, \ldots, N-k$ — $N-k$ pairs at lag $k$.
>
> **Key structure**: The conditioning set for pair $(i, i+k)$ is the "bridge" variables $\{i+1, \ldots, i+k-1\}$.
> ^def-dvine

> [!definition] D-vine density
> For $N$ variables with D-vine ordering $(1, 2, \ldots, N)$:
> $$f(\mathbf{x}) = \prod_{k=1}^N f_k(x_k) \cdot \prod_{j=1}^{N-1}\prod_{i=1}^{N-j} c_{i,i+j|i+1:\ldots:i+j-1}\!\bigl(F_{i|i+1:\ldots:i+j-1}(\cdot),\; F_{i+j|i+1:\ldots:i+j-1}(\cdot)\bigr)$$
>
> The "lag-$j$" pair copulas in tree $T_j$ capture dependence between observations that are $j$ positions apart in the variable ordering, conditional on the $j-1$ bridge variables.
> ^def-dvine-density

> [!example] D-vine for yield curve term structure
> **Setting**: $N=5$ maturities: 3-month, 1-year, 2-year, 5-year, 10-year interest rates. Natural ordering by maturity.
>
> **Tree 1** (adjacent maturities): $(3m,1y), (1y,2y), (2y,5y), (5y,10y)$. Use **Gaussian** copulas (smooth, moderate dependence between adjacent maturities).
>
> **Tree 2** (skip-1 pairs | middle maturity): $(3m,2y|1y), (1y,5y|2y), (2y,10y|5y)$. Residual dependence after conditioning on the bridging maturity.
>
> **Trees 3–4**: Higher-lag residual dependencies, often well-approximated by independence copulas.
>
> **Interpretation**: The D-vine exploits the term-structure ordering: rates at adjacent maturities are most correlated, and conditioning on intermediate maturities captures most cross-maturity co-movement. This is more natural than a C-vine for term structure because there is no single "hub" maturity.

### General Regular Vine (R-Vine)

> [!definition] R-vine (general case)
> A **regular vine** $\mathcal{V}$ on $N$ variables is a sequence of trees $T_1, \ldots, T_{N-1}$ satisfying:
> 1. $T_1$ is a tree on $N$ nodes.
> 2. Nodes of $T_k$ = edges of $T_{k-1}$.
> 3. **Proximity condition**: Two nodes of $T_k$ (i.e., edges of $T_{k-1}$) are connected iff they share exactly one variable.
>
> C-vines and D-vines are special R-vines. Any tree shape satisfying the proximity condition is valid. The **number of R-vines** grows super-exponentially; for $N=4$ there are 96 distinct R-vines (including both C- and D-vine cases).
>
> **Structure selection**: In practice, the structure is selected by the **maximum spanning tree (MST)** algorithm of Dißmann et al. (2013): at each tree level $T_k$, find the MST on the complete graph of available nodes weighted by pairwise absolute Kendall's $\tau$. This greedily places the strongest dependencies in the earliest trees, where they can condition later dependencies most effectively.
>
> **Implementation**: `RVineStructureSelect()` in the `VineCopula` R package; `rvinecopulib::vinecop()` in the `rvinecopulib` R package and `pyvinecopulib.Vinecop()` in Python.
> ^def-rvine

## Examples

> [!example] C-vine vs D-vine: which to choose?
>
> | Criterion | C-Vine | D-Vine | R-Vine |
> |---|---|---|---|
> | **Natural ordering** | Hub variable dominates | Sequential ordering exists | No strong prior |
> | **Interpretation** | Hub = common driver | Adjacency = stronger dependence | Flexible |
> | **Best for** | Financial: index + assets; insurance: systematic risk | Yield curves, time-lag dependence, spatial | General; high $N$ |
> | **Estimation** | Easy: root fixed a priori (often) | Easy: ordering often natural | Requires structure selection |
> | **Tail asymmetry** | Hub can have different families vs leaves | Same per lag-level | Fully flexible |
>
> **Rule of thumb**: If one variable clearly drives others (a factor), use a C-vine centered on it. If variables have a natural ordering (time, space, maturity), use a D-vine. Otherwise use R-vine with MST structure selection (Dißmann et al. 2013) — particularly for $N \le 15$ where the selection is computationally feasible.

> [!example] R-vine for a 5-variable return dataset (Aas et al. 2009, App.)
> Aas et al. (2009) fit a D-vine to 5-dimensional financial data (weekly exchange rates: USD/DEM, USD/GBP, USD/JPY, USD/CAD, USD/CHF). Ordering: DEM–GBP–JPY–CAD–CHF. Selected families: Gaussian for most pairs; Student-$t$ for the tree-1 edges with strongest tail dependence. The D-vine significantly outperforms (by AIC) the multivariate Gaussian and Student-$t$ copulas, and the Gumbel and Clayton copulas, demonstrating the value of per-pair family flexibility.

## Connections

- [[Vine Copulas - Overview]] — the overall motivation, the regular vine definition (Bedford & Cooke 2002), and comparison with factor copulas.
- [[Pair Copula Construction]] — the density factorization and h-functions that make the vine density computable for any tree structure.
- [[Vine Copula Estimation and Selection]] — the MST structure-selection algorithm, sequential MLE, and pair-family selection (AIC/BIC) that turn the vine structure into an estimated model.
- [[Copula Architecture Comparison]] — C-vine vs D-vine vs factor copula vs elliptical vs Archimedean, by dimension, parsimony, and typical application.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used by the MST algorithm to rank pairwise dependencies.
- [[Multi-Factor and Block Dependence Structures]] — the factor-copula's answer to heterogeneous dependence; C-vine provides an alternative for moderate $N$.

## See Also

- [[Factor Copulas - Overview]] — factor copula: one latent equation per variable; C-vine: one pair copula per adjacent pair in the star. Both can capture heterogeneous dependence for moderate $N$.
- [[../_Index|Econometrics]]
