---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas2009-Bedford2002-Czado2019-Synthesis.md]]"
source_location: "Bedford & Cooke (2002), Secs. 3–4; Aas et al. (2009), Secs. 2–3"
date_ingested: 2026-07-18
date_updated: 2026-07-18
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Pair Copula Selection and Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - regular vine
  - R-vine
  - C-vine canonical vine
  - D-vine drawable vine
  - proximity condition
  - vine tree structure
---

# C-Vine and D-Vine Structures

> [!summary]
> A vine is a sequence of $n-1$ nested trees that indexes the $n(n-1)/2$ bivariate copulas in a pair-copula construction. The **proximity condition** (Bedford & Cooke 2002) ensures that conditioning sets grow consistently across trees. The **C-vine** (canonical vine) uses a star topology — one dominant variable conditions all others — while the **D-vine** (drawable vine) uses a chain topology suited to natural sequential orderings. Both are special cases of the general **R-vine**.

## Overview

The vine specifies *which* pairs get bivariate copulas and *which* conditioning sets are used. Not all orderings are valid — the proximity condition ensures the resulting product is a proper joint density. Bedford & Cooke (2002) proved that:
1. Every regular vine gives a valid factorisation of the joint density.
2. The density is the product of marginals and the pair-copula densities indexed by the vine edges.
3. There are $\tfrac{n!}{2}$ distinct C-vines and D-vines together, and an astronomically larger number of R-vines for $n \geq 4$.

## Main Content

> [!definition] Regular Vine (Bedford & Cooke 2002)
> A **regular vine** $\mathcal{V}$ on $n$ variables is a sequence of trees $T_1, T_2, \ldots, T_{n-1}$ such that:
> 1. $T_1$ has node set $\{1,\ldots,n\}$ and edge set $E_1$ with $n-1$ edges.
> 2. For $j \geq 2$: $T_j$ has node set = $E_{j-1}$ (edges of $T_{j-1}$) and edge set $E_j$ with $|E_{j-1}|-1$ edges.
> 3. **Proximity condition:** Two nodes $a$, $b$ in $T_{j+1}$ (which are edges of $T_j$) can be connected only if they share exactly one common node in $T_j$.
>
> Each edge $e \in E_j$ corresponds to a pair $(a(e), b(e))$ with conditioning set $D(e)$ = the common node of the two endpoints of $e$ in $T_j$, plus the conditioning sets of those endpoints. This gives a bivariate copula $c_{a(e),b(e)|D(e)}$.
> ^def-rvine

> [!definition] C-Vine (Canonical Vine)
> A C-vine is a regular vine in which *each tree* $T_j$ is a **star** — one central node connects to all others.
>
> - **$T_1$:** Node $\pi_1$ (the root) connects to all other $n-1$ nodes. Edges: $(\pi_1, \pi_k)$ for $k=2,\ldots,n$.
> - **$T_2$:** The node $(\pi_1, \pi_2)$ is the center; it connects to $(\pi_1, \pi_3), \ldots, (\pi_1, \pi_n)$. This gives pairs: $(\pi_2, \pi_3 | \pi_1), \ldots, (\pi_2, \pi_n | \pi_1)$.
> - **$T_j$:** Star centered at $(\pi_1,\ldots,\pi_j)$; pairs $(\pi_j, \pi_{j+i} | \pi_1,\ldots,\pi_{j-1})$ for $i=1,\ldots,n-j$.
>
> General C-vine density (Aas et al. 2009, Eq. 3):
> $$f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k)\cdot\prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{j,j+i|1,\ldots,j-1}\!\bigl(F(x_j|\mathbf{x}_{1:j-1}),\;F(x_{j+i}|\mathbf{x}_{1:j-1})\bigr)$$
> where the shorthand $1,\ldots,j-1$ denotes the root variables in the first $j-1$ trees.
>
> **Use when:** One variable (e.g., a market index, an interest rate) is expected to dominate pairwise dependence. Setting that variable as $\pi_1$ concentrates the unconditional pairs on it; after conditioning on $\pi_1$ the remaining pairs are modelled at the second level.
> ^def-cvine

> [!definition] D-Vine (Drawable Vine)
> A D-vine is a regular vine in which *each tree* $T_j$ is a **path** (Hamiltonian path).
>
> - **$T_1$:** Edges: $(1,2), (2,3), \ldots, (n-1,n)$ — a chain from variable 1 to variable $n$.
> - **$T_2$:** Edges: $(1,3|2), (2,4|3), \ldots, (n-2,n|n-1)$ — a shorter chain.
> - **$T_j$:** Edges: $(1, j+1|2,\ldots,j), (2, j+2|3,\ldots,j+1), \ldots$
>
> General D-vine density (Aas et al. 2009, Eq. 4):
> $$f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k)\cdot\prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\bigl(F(x_i|\mathbf{x}_{i+1:i+j-1}),\;F(x_{i+j}|\mathbf{x}_{i+1:i+j-1})\bigr)$$
>
> **Use when:** Variables have a natural sequential ordering (term-structure maturities, time lags, ordered categories). Adjacent pairs (T1) capture the bulk of dependence; longer-range pairs are modelled conditionally.
> ^def-dvine

> [!definition] R-Vine (General Regular Vine)
> An R-vine allows any tree topology satisfying the proximity condition. C-vines and D-vines are two of the $\tfrac{n!}{2}\prod_{k=1}^{n-2}2^{\binom{k}{2}}$ distinct R-vines on $n$ variables. For $n=4$, there are 3 distinct vine structures; for $n=5$, there are 24.
>
> The **structure matrix** $M$ (upper-triangular, $n\times n$) encodes an R-vine: diagonal entries give the conditioning-set indices, off-diagonal entries give the conditioned variable. The VineCopula R package and pyvinecopulib represent R-vines via this matrix.
>
> Structure selection for R-vines: at tree $T_1$ use maximum spanning tree of the complete graph with edge weights $|\hat\tau_{ij}|$ (Kendall's $\tau$). At tree $T_j$, apply maximum spanning tree to the graph of eligible edges (proximity condition), weighted by the pseudo-observations' Kendall's $\tau$.
> ^def-rvine-general

## Examples

> [!example] Four-Variable C-Vine and D-Vine (Aas et al. 2009, Fig. 1–2)
> For $n=4$, both C-vine and D-vine have $4(3)/2 = 6$ pair copulas across 3 trees.
>
> **C-vine** (root = variable 1):
> - $T_1$: $(1,2),\,(1,3),\,(1,4)$
> - $T_2$: $(2,3|1),\,(2,4|1)$
> - $T_3$: $(3,4|1,2)$
>
> **D-vine** (chain 1–2–3–4):
> - $T_1$: $(1,2),\,(2,3),\,(3,4)$
> - $T_2$: $(1,3|2),\,(2,4|3)$
> - $T_3$: $(1,4|2,3)$
>
> The two structures use the *same* set of variable indices but pair them differently. In the C-vine, variable 1 appears in *every* unconditional pair at $T_1$; in the D-vine, no variable has this central role.

## Connections

- [[Vine Copulas - Overview]] — the PCC idea and why vine structures produce valid joint densities.
- [[Pair Copula Selection and Estimation]] — how pair copula families are chosen at each edge and how h-functions propagate conditioning sets.
- [[Factor Copula Construction]] — contrast: factor structure vs vine tree structure as two ways to build a high-dimensional copula.
- [[Multi-Factor and Block Dependence Structures]] — block structure in factor copulas is analogous to grouping vine variables by industry sector.
- [[Copula Architecture Comparison]] — when to use C-vine, D-vine, or factor copula for a given application.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the standard weight used in vine structure selection.
- [[Factor Copulas - Overview]] — the alternative architecture for $N \geq 50$.
- [[../_Index|Dependence Modeling]]
