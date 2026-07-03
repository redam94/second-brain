---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-BedfordCooke-Survey.md]]"
source_location: "Aas et al. (2009) §2, pp. 183-187; Dißmann et al. (2013) §2, pp. 52-57; Bedford & Cooke (2002) §3, pp. 1040-1052"
date_ingested: 2026-07-03
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Software]]"
  - "[[High-Dimensional Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - regular vine
  - R-vine
  - vine structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine (canonical vine)** and **D-vine (drawable vine)** are the two most common special cases of the general Bedford-Cooke **regular vine (R-vine)**. They specify *which* variable pairs receive pair copulas at each tree level. In a C-vine, one variable is the conditioning root at every tree level, creating a star graph; in a D-vine, variables form a path. The general R-vine uses any spanning tree at each level (selected to maximise pairwise dependence). The R-vine matrix encodes these structures compactly for software implementation.

## Overview

For $n$ variables, a vine consists of $n-1$ trees $T_1, \ldots, T_{n-1}$. Tree $T_j$ has:
- **Nodes**: the $n-j+1$ edges of tree $T_{j-1}$ (so tree 1 has $n$ nodes, tree 2 has $n-1$ nodes, etc.)
- **Edges**: $n-j$ edges, each receiving a pair copula

The **proximity condition** (Bedford & Cooke 2002) ensures the decomposition is valid: every edge in $T_j$ must connect two nodes whose corresponding edges in $T_{j-1}$ share exactly $j-1$ common variables. This determines which conditioning sets $D(e)$ are valid.

Both C-vine and D-vine satisfy the proximity condition by design; the R-vine selects an *optimal* tree structure at each level from the set of all valid spanning trees.

## Main Content

> [!definition] C-vine (canonical vine)
> A **C-vine** specifies, at each tree level $j$, a **star graph** with one central root node connected to all other $n-j$ nodes. If the roots at successive levels are $r_1, r_2, \ldots$, the pair copulas are:
>
> - **Tree 1:** $n-1$ pair copulas $c_{r_1,i}$ for $i \neq r_1$. Each is an unconditional bivariate copula between $X_{r_1}$ and $X_i$.
> - **Tree 2:** $n-2$ pair copulas $c_{r_2,i|r_1}$ for $i \neq r_1, r_2$. Each is a conditional bivariate copula between $X_{r_2}$ and $X_i$ given $X_{r_1}$.
> - **Tree $j$:** $n-j$ pair copulas $c_{r_j,i|r_1,\ldots,r_{j-1}}$ for $i \notin \{r_1,\ldots,r_j\}$.
>
> **Total pair copulas:** $\sum_{j=1}^{n-1}(n-j) = n(n-1)/2$.
>
> **Best for:** When there is a natural "central" variable that drives dependence with all others — e.g., a market index, a dominant commodity price, or the most correlated variable. In equity data, a market factor makes a C-vine interpretable as "all assets depend on the market, then assets depend on each other conditional on the market."
^def-cvine

> [!definition] D-vine (drawable vine)
> A **D-vine** specifies, at each tree level $j$, a **path graph** through all active nodes. The pair copulas are:
>
> - **Tree 1:** $n-1$ pair copulas $c_{i,i+1}$ for $i = 1,\ldots,n-1$ (consecutive pairs along the path).
> - **Tree 2:** $n-2$ pair copulas $c_{i,i+2|i+1}$ for $i = 1,\ldots,n-2$ (pairs two apart, conditioned on the variable between them).
> - **Tree $j$:** $n-j$ pair copulas $c_{i,i+j|i+1,\ldots,i+j-1}$ (pairs $j$ apart, conditioned on all variables between them).
>
> **Total pair copulas:** Same as C-vine: $n(n-1)/2$.
>
> **Best for:** When there is a natural ordering of variables — e.g., time series lags (AR-type dependence), spatial adjacency, or a correlation structure that decreases with "distance." D-vines capture Markov-type dependence: given a variable, its neighbors contain most information about non-neighbors.
^def-dvine

> [!definition] Regular vine (R-vine) — the general case
> A **regular vine** on $n$ variables allows *any* spanning tree at each level (subject to the proximity condition). This subsumes C-vine and D-vine as special cases. The R-vine is defined by a sequence of trees $V = (T_1,\ldots,T_{n-1})$ satisfying:
> 1. $T_1$ is any spanning tree on $\{1,\ldots,n\}$.
> 2. For $j \geq 2$: the nodes of $T_j$ are the edges $E_{j-1}$ of $T_{j-1}$, and the proximity condition holds: any two nodes connected by an edge in $T_j$ (i.e., edges $e, f \in E_{j-1}$) must satisfy $|e \cap f| = j-1$ (they share $j-1$ variables as a conditioning set).
>
> **Model selection:** In practice, the R-vine is constructed greedily: tree 1 is the **maximum spanning tree** of the complete graph with edge weights $|\hat\tau_{ij}|$ (empirical Kendall's tau), prioritising the most dependent pairs first. Subsequent trees are selected similarly on the conditional pseudo-observations (Dißmann et al. 2013).
^def-rvine

> [!definition] The R-vine matrix
> A regular vine on $n$ variables can be encoded as an $n\times n$ upper-triangular integer matrix $M$, widely used in VineCopula R and pyvinecopulib Python packages. Reading column $j$ from top to bottom:
> - Row $j$ (diagonal): the variable at position $j$ in the tree ordering.
> - Rows $j-1, j-2, \ldots, 1$: specify the conditioning set and pair-copula partners at successive tree levels.
>
> Example for $n=4$ with D-vine ordering $(1,2,3,4)$:
> $$M = \begin{pmatrix} 1 & 1 & 1 & 1 \\ & 2 & 2 & 2 \\ & & 3 & 3 \\ & & & 4 \end{pmatrix}$$
> Column 4 reads: at tree 1, pair $(4,3)$; at tree 2, pair $(4,2|3)$; at tree 3, pair $(4,1|2,3)$.
^def-rvinematrix

## Examples

> [!example] C-vine vs D-vine for four variables
> **Setup:** $n=4$ variables, ordering $(1,2,3,4)$, root of C-vine is variable 1.
>
> **C-vine pair copulas (root = 1):**
>
> | Tree | Pair copulas |
> |------|-------------|
> | $T_1$ | $c_{12},\; c_{13},\; c_{14}$ |
> | $T_2$ | $c_{23|1},\; c_{24|1}$ |
> | $T_3$ | $c_{34|12}$ |
>
> Conditional CDFs: $F_{2|1}, F_{3|1}, F_{4|1}$ at tree 2; $F_{3|12}, F_{4|12}$ at tree 3.
>
> **D-vine pair copulas (path $1-2-3-4$):**
>
> | Tree | Pair copulas |
> |------|-------------|
> | $T_1$ | $c_{12},\; c_{23},\; c_{34}$ |
> | $T_2$ | $c_{13|2},\; c_{24|3}$ |
> | $T_3$ | $c_{14|23}$ |
>
> **Key difference:** C-vine uses variable 1 to condition all tree-2 pairs; D-vine conditions on the middle variable of each consecutive triple. Both have exactly 6 pair copulas ($n(n-1)/2 = 6$ for $n=4$).

> [!example] Equidependence as a special vine
> If every pair copula in a D-vine or C-vine is chosen to be **Gaussian with the same $\rho$**, and all marginals are standard Normal, the resulting joint distribution is multivariate Gaussian with **equicorrelation** $\rho$. This is the same equicorrelation structure as the [[Factor Copula Construction|Gaussian factor copula]] — confirming that vine copulas nest the Gaussian copula as a special case.

## Connections

- [[Pair-Copula Construction]] — the formal density factorization and h-function; the vine structure determines which h-function calls occur at each tree level.
- [[Vine Copula Estimation and Software]] — the sequential MLE and R-vine matrix selection algorithms; VineCopula R implements all three vine types via `RVineStructureSelect`.
- [[High-Dimensional Copula Architecture Comparison]] — D-vine vs C-vine vs R-vine vs factor copula: practical guidance on which to choose.
- [[Multi-Factor and Block Dependence Structures]] — contrast: the block-equidependence factor copula assigns the same pair copula to all within-group pairs, while a C-vine can assign different copulas to each.

## See Also

- [[Vine Copulas - Overview]] — motivation and landscape.
- [[../_Index|Dependence Modeling]]
