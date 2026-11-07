---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Aas-et-al-2009-Pair-Copula-Constructions-reference.md]]"
source_location: "Secs. 2.1–2.2, pp. 184–190"
date_ingested: 2026-11-07
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Constructions]]"
used_by:
  - "[[Vine Copula Structure Selection and Estimation]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most tractable special cases of regular vine copulas (Bedford & Cooke 2001/2002; Aas et al. 2009). A C-vine has star-shaped trees — one "root" variable conditions all others at each tree level, making it suited when one variable drives the dependence of all others (e.g., a market index). A D-vine has path-shaped trees — variables are linked in a chain, making it natural for ordered data (time series, spatial variables). Both have $d(d-1)/2$ pair copulas, explicit recursive density formulae, and sequential MLE estimators.

## Overview

For a $d$-dimensional vine, the first tree $T_1$ has $d-1$ edges (a spanning tree on $d$ nodes), and subsequent trees reduce by one node each time. The total number of pair copulas is $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$.

The **key choice** in a vine copula model is the vine structure — which spanning trees to use. While the general regular vine (R-vine) allows any valid spanning tree, two canonical structures are analytically tractable and correspond to domain intuitions:

| Feature | C-vine | D-vine |
|---------|--------|--------|
| Tree shape | Stars (one hub node per tree) | Paths (each node degree ≤ 2) |
| Root node | Explicit "key" variable conditioning all others | No global root; variables ordered in a chain |
| Natural for | Panel data with common factor; one variable drives others | Time series; ordered variables; local dependence |
| Conditioning set size | $j-1$ variables at Tree $j$ (same root) | $j-1$ variables at Tree $j$ (accumulate along path) |

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-Vine Structure
> A **C-vine** on variables $X_1, \ldots, X_d$ (ordered so that $X_1$ is the root) is defined by trees:
> - **Tree 1:** Root node $X_1$ connected to $X_2, X_3, \ldots, X_d$ (star with $d-1$ edges).
> - **Tree 2:** Root node $(X_1, X_2)$ connected to $(X_1, X_3), (X_1, X_4), \ldots, (X_1, X_d)$ (star with $d-2$ edges), where nodes are edges of Tree 1 satisfying the proximity condition.
> - **Tree $j$:** Root node $\{1, j\}$ (the edge shared by all previous trees) connects to $d-j$ other nodes.
>
> The pair copulas and their arguments are:
> $$
> \text{Tree 1:} \quad c_{1,j}\bigl(F_1(x_1),\, F_j(x_j)\bigr), \quad j = 2, \ldots, d
> $$
> $$
> \text{Tree 2:} \quad c_{2,j|1}\bigl(F(x_2|x_1),\, F(x_j|x_1)\bigr), \quad j = 3, \ldots, d
> $$
> $$
> \text{Tree }j: \quad c_{j, j+i \,|\, 1,\ldots,j-1}\bigl(F(x_j|x_1,\ldots,x_{j-1}),\, F(x_{j+i}|x_1,\ldots,x_{j-1})\bigr), \quad i = 1, \ldots, d-j
> $$
^defn-cvine

> [!theorem] C-Vine Density Formula (Aas et al. 2009)
> The joint density of a $d$-dimensional C-vine with root ordering $(1, 2, \ldots, d)$ is:
> $$
> f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,\,j+i\,|\,1,\ldots,j-1}\!\bigl(F(x_j|x_1,\ldots,x_{j-1}),\, F(x_{j+i}|x_1,\ldots,x_{j-1})\bigr)
> $$
> where the conditional CDFs $F(x_j|x_1,\ldots,x_{j-1})$ are computed recursively by h-functions (see [[Pair-Copula Constructions#^defn-hfunction]]).
>
> **For $d=4$:** The 6 pair copulas are:
> Tree 1: $c_{12},\ c_{13},\ c_{14}$
> Tree 2: $c_{23|1},\ c_{24|1}$
> Tree 3: $c_{34|12}$
^thm-cvine-density

> [!example] C-Vine Intuition: Market Conditioning
> A C-vine is natural when variable $X_1$ is a "market factor" — e.g., a stock market index — and all other variables $X_2, \ldots, X_d$ are individual assets. The root structure says: once we condition on the market ($X_1$), the residual dependences among assets are described by pair copulas $c_{j,k|1}$ that capture sector or idiosyncratic co-movement. This is conceptually similar to the [[Factor Copulas - Overview|factor copula]] latent-factor structure, but the C-vine represents it explicitly through bivariate copulas rather than a continuous latent variable.

### D-Vine (Drawable Vine)

> [!definition] D-Vine Structure
> A **D-vine** on variables $X_1, \ldots, X_d$ (ordered $1, 2, \ldots, d$ along the path) is defined by trees:
> - **Tree 1:** Path $X_1 - X_2 - X_3 - \cdots - X_d$ (a path with $d-1$ edges; each node has degree at most 2).
> - **Tree 2:** Edges of Tree 1 become nodes; the proximity condition means only adjacent edges can be linked, giving another path.
> - **Tree $j$:** A path of length $d-j$.
>
> The pair copulas and their arguments are:
> $$
> \text{Tree 1:} \quad c_{i,\,i+1}\bigl(F_i(x_i),\, F_{i+1}(x_{i+1})\bigr), \quad i = 1, \ldots, d-1
> $$
> $$
> \text{Tree 2:} \quad c_{i,\,i+2\,|\,i+1}\bigl(F(x_i|x_{i+1}),\, F(x_{i+2}|x_{i+1})\bigr), \quad i = 1, \ldots, d-2
> $$
> $$
> \text{Tree }j: \quad c_{i,\,i+j\,|\,i+1,\ldots,i+j-1}\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)
> $$
^defn-dvine

> [!theorem] D-Vine Density Formula (Aas et al. 2009)
> The joint density of a $d$-dimensional D-vine with ordering $(1, 2, \ldots, d)$ is:
> $$
> f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,\,i+j\,|\,i+1,\ldots,i+j-1}\!\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)
> $$
> **For $d=4$:** The 6 pair copulas are:
> Tree 1: $c_{12},\ c_{23},\ c_{34}$
> Tree 2: $c_{13|2},\ c_{24|3}$
> Tree 3: $c_{14|23}$
^thm-dvine-density

> [!example] D-Vine Intuition: Time Series Ordering
> A D-vine is natural when variables have a natural ordering along which dependence decays — e.g., returns at consecutive time lags $r_t, r_{t+1}, r_{t+2}, r_{t+3}$. The first-tree pair copulas $c_{12}, c_{23}, c_{34}$ capture adjacent-lag dependence. Higher-tree pair copulas $c_{13|2}, c_{14|23}$ capture residual dependence after conditioning on intervening lags. Setting higher-tree pair copulas to independence ($c=1$) gives a Markov-like truncated vine. See [[Vine Copula Structure Selection and Estimation]] for the truncation idea.

### Counting Vines and Orderings

> [!definition] Number of C-vine and D-vine Orderings
> For $d$ variables, there are $(d-1)!/2$ distinct C-vine orderings (choosing which variable is the root node at each tree level, up to reflection) and $(d-1)!/2$ distinct D-vine orderings. For $d=4$: 3 C-vine and 3 D-vine orderings. For $d=10$: $181{,}440$ of each.
>
> The total number of R-vine structures grows super-exponentially: for $d=4$, there are 24 distinct R-vines (Bedford & Cooke 2002, Morales-Nápoles et al. 2010). For large $d$, exhaustive search is infeasible — see [[Vine Copula Structure Selection and Estimation]] for greedy algorithms.
^defn-counting

## Examples

> [!example] $d=4$ C-vine vs D-vine: Explicit Trees
> **C-vine** (root $X_1$):
> - $T_1$: $X_1 - X_2$, $X_1 - X_3$, $X_1 - X_4$ (star)
> - $T_2$: $(1,2) - (1,3)$, $(1,2) - (1,4)$ (star at node $12$)
> - $T_3$: $(12,3) - (12,4)$
>
> **D-vine** (path $X_1 - X_2 - X_3 - X_4$):
> - $T_1$: $X_1 - X_2$, $X_2 - X_3$, $X_3 - X_4$ (path)
> - $T_2$: $(12) - (23)$, $(23) - (34)$ (path)
> - $T_3$: $(12,3) - (23,4)$ (single edge, pair $14|23$)

## Connections

- [[Pair-Copula Constructions]] — the h-function recursion used to compute all conditional CDFs.
- [[Vine Copula Structure Selection and Estimation]] — choosing between C-vine, D-vine, and general R-vine; sequential MLE.
- [[Vine Copulas - Overview]] — the overview including comparison with factor copulas.
- [[Factor Copulas - Overview]] — the factor copula as an alternative architecture (C-vine analogy: market factor = root variable).

## See Also

- [[../_Index|Econometrics]]
