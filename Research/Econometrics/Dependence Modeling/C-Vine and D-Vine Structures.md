---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions-source.md]]"
source_location: "Aas et al. (2009) §2.2–2.3, §4; Bedford & Cooke (2002) §5"
date_ingested: 2026-10-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction Framework]]"
used_by:
  - "[[Vine Copula Estimation]]"
  - "[[Vine vs Factor Copulas - Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine structure selection
---

# C-Vine and D-Vine Structures

> [!summary]
> The two most widely used vine structures are the **C-vine** (canonical vine), where each tree has a single hub node connected to all others, and the **D-vine** (drawable vine), where the tree forms a simple path. C-vines are natural when one variable drives all others (e.g. a market factor). D-vines are natural when variables have a natural ordering (e.g. time series, spatial data). Both are special cases of the regular vine (R-vine), which allows arbitrary tree structures.

## Overview

A vine on $n$ variables has $n-1$ trees and $n(n-1)/2$ edges in total. The structure determines *which pairs* are modelled at each tree level and *which conditioning sets* they use. Structure choice is important: a badly-chosen vine can be as restrictive as a simpler model, while a well-chosen vine makes the unconditional (Tree-1) pairs exactly those with the strongest pairwise dependence, reducing information loss from the simplifying assumption at higher trees.

Bedford & Cooke (2002) proved that for $n = 4$, there are exactly 240 distinct R-vines; for general $n$ the count grows super-exponentially. C-vines and D-vines are the two **totally ordered** families (each has a unique structure once the variable ordering is fixed), making them tractable for selection algorithms.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-Vine Structure
> A **C-vine** (canonical vine) is a regular vine where every tree $T_k$ has a unique node of maximum degree (connected to all other nodes in that tree). This node is the **root** of tree $T_k$.
>
> For $n$ variables:
> - $T_1$: star — one root node connected to $n-1$ leaves. Edges: $(r_1, 2), (r_1, 3), \ldots, (r_1, n)$ where $r_1$ is the chosen root.
> - $T_2$: star — the root is the edge $(r_1, r_2)$ from $T_1$, and it connects to all other $T_1$ edges. Edges: $(r_1 r_2, r_1 3), (r_1 r_2, r_1 4), \ldots$ — pairs $(r_2, j)$ conditioning on $\{r_1\}$.
> - $T_k$: star — root edges at previous level, linking remaining variables conditioning on $\{r_1, \ldots, r_{k-1}\}$.
>
> **Parameter labelling:** the pair-copula at tree $T_j$, linking the root $j$ with variable $i > j$ (in canonical ordering), is $C_{j,i|1,\ldots,j-1}$.
^def-cvine

> [!example] 4-Variable C-Vine
> Root ordering: $1, 2, 3$ (variable 1 roots $T_1$, variable 2 roots $T_2$, variable 3 roots $T_3$).
>
> **Tree 1** (root = node 1, star):
> ```
>     1
>   / | \
>  2  3  4
> ```
> Edges: $(1,2)$, $(1,3)$, $(1,4)$ → pair-copulas $c_{12}$, $c_{13}$, $c_{14}$.
>
> **Tree 2** (root = edge $(1,2)$, connects to $(1,3)$ and $(1,4)$):
> ```
>   (1,2)
>   /    \
> (1,3) (1,4)
> ```
> Edges link the edge-node $(1,2)$ with $(1,3)$ and $(1,4)$ → pair-copulas $c_{23|1}$ and $c_{24|1}$.
>
> **Tree 3** (one edge):
> ```
> (2,3|1) — (2,4|1)
> ```
> → pair-copula $c_{34|12}$.
>
> Total pair-copulas: 6 (= $n(n-1)/2$). Variable 1 appears in every Tree-1 copula, making it the **key variable** — best used when one variable (e.g. a market index) strongly mediates all others.

### D-Vine (Drawable Vine)

> [!definition] D-Vine Structure
> A **D-vine** (drawable vine) is a regular vine where every tree $T_k$ forms a **path** (no node has degree greater than 2 in any tree).
>
> For $n$ variables with ordering $(1, 2, \ldots, n)$:
> - $T_1$: path $1 - 2 - 3 - \cdots - n$. Edges: $(1,2), (2,3), \ldots, (n-1,n)$.
> - $T_2$: path using $T_1$ edges as nodes. Edges: $(1,3|2), (2,4|3), \ldots, (n-2,n|n-1)$.
> - $T_k$: edges link pairs $(i, i+k)$ conditioning on $\{i+1, \ldots, i+k-1\}$.
>
> **Interpretation:** Variables close together in the ordering share unconditional pair-copulas (Tree 1). Distant pairs are linked only through conditioning — Markov-chain-like structure.
^def-dvine

> [!example] 4-Variable D-Vine
> Ordering: $1 - 2 - 3 - 4$.
>
> **Tree 1** (path):
> ```
> 1 — 2 — 3 — 4
> ```
> Edges: $(1,2)$, $(2,3)$, $(3,4)$ → pair-copulas $c_{12}$, $c_{23}$, $c_{34}$.
>
> **Tree 2** (path using $T_1$ edges):
> ```
> (1,2) — (2,3) — (3,4)
> ```
> Edges: $(1,3|2)$, $(2,4|3)$ → pair-copulas $c_{13|2}$, $c_{24|3}$.
>
> **Tree 3** (single edge):
> ```
> (1,3|2) — (2,4|3)
> ```
> Edge: $(1,4|2,3)$ → pair-copula $c_{14|23}$.
>
> Natural for **time-ordered data** or spatial proximity: lag-1 pairs $(1,2),(2,3),(3,4)$ get their own copulas; longer-lag pairs are modelled conditionally.

### General R-Vine

> [!definition] R-Vine (Regular Vine)
> An **R-vine** allows arbitrary tree structures beyond C-vine and D-vine, subject only to the proximity and constraint conditions from [[Vine Copulas - Overview]]. For $n \leq 5$ variables, C- and D-vines cover most practically distinct cases. For $n \geq 6$, neither C nor D-vine may reflect the true dependence structure optimally.
>
> R-vine structure selection is an active research area (Dißmann et al. 2013 proposed the maximum spanning tree algorithm: at each tree level, build the spanning tree that maximises the sum of absolute pairwise Kendall's $\tau$ values). This ensures the strongest pairwise associations appear at the shallowest tree levels.
^def-rvine

### Choosing C-Vine vs. D-Vine vs. R-Vine

> [!definition] Structure Selection Heuristics
>
> | Situation | Recommended structure |
> |-----------|----------------------|
> | One variable mediates all others (market factor, common shock) | C-vine with that variable as root of $T_1$ |
> | Natural ordering exists (time, space, proximity) | D-vine following that ordering |
> | No clear structure; $n$ small ($\leq 10$) | R-vine via max-spanning-tree algorithm |
> | $n$ large ($\geq 20$) | Truncated vine (independence copula beyond tree $K$, e.g. $K=2$–$5$) or factor copula |
>
> The **max-spanning-tree** heuristic for R-vine: in tree $T_1$, connect variables whose pairwise Kendall's $\tau$ is largest. In $T_2$, among eligible edges (satisfying the proximity condition), connect pairs with the largest $\tau$ of the conditioning h-function values. Repeat.
^def-structure-selection

## Examples

> [!example] C-Vine for Equity Returns with a Market Factor
> Consider 5 stocks plus a market index (6 variables total). Place the market index as root of $T_1$ in a C-vine. The 5 Tree-1 copulas $c_{\text{mkt},i}$ capture each stock's unconditional dependence with the market (the dominant dependence signal). Conditional copulas $c_{i,j|\text{mkt}}$ capture stock-specific co-movements *net of* the market factor — a natural decomposition aligned with CAPM intuition.

> [!example] D-Vine for Forward Interest Rates
> Forward rates at maturities $1, 2, 3, 5, 10$ years have a natural proximity ordering: adjacent maturities are most correlated. A D-vine with this ordering puts the $(1,2)$, $(2,3)$, $(3,5)$, $(5,10)$ pairs in Tree 1, capturing the dominant term-structure correlation directly. The (1,10) pair — driven largely by the intermediate rates — appears only in Tree 4.

## Connections

- [[Vine Copulas - Overview]] — the vine definition and h-function.
- [[Pair-Copula Construction Framework]] — the formal density for C-vine and D-vine.
- [[Vine Copula Estimation]] — sequential estimation exploits the tree structure directly.
- [[Vine vs Factor Copulas - Architecture Comparison]] — when vine structures are preferred over factor copulas.
- [[Multi-Factor and Block Dependence Structures]] — block structure in factor copulas analogises to C-vine with industry-group roots.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used in max-spanning-tree structure selection.
- [[Factor Copulas - Overview]] — alternative architecture; factor copulas can be seen as a heavily constrained C-vine.
- [[../_Index|Econometrics]]
