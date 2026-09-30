---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009)"
source_location: "§3-4, pp. 185-192"
date_ingested: 2026-09-26
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Regular Vines and the R-Vine Matrix]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine copula
  - D-vine copula
  - star tree structure
  - path tree structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two principal sub-families of regular vine copulas, introduced by Aas et al. (2009). A **C-vine** tree has a single root node connected to all others (star structure): the root variable drives the first layer of conditioning, naturally suited when one variable governs the others (a market index, a latent common factor). A **D-vine** tree is a path: variables are ordered along a chain, with each pair copula capturing the residual dependence between variables separated by one or more intermediaries in the ordering. Both produce fully identified $d(d-1)/2$ pair-copula decompositions; the choice of structure determines which pairs appear unconditionally and which are conditioned on progressively larger sets.

## Overview

For a $d$-dimensional distribution, both C-vine and D-vine encode the same total information ($d(d-1)/2$ pair copulas) but allocate it differently. In a C-vine each tree has a **root node** of maximal degree, making it a hub-and-spoke graph. In a D-vine each node has degree at most 2 (path graph). The vine structure governs:
1. **Which pairs are modelled unconditionally** (Tree 1 edges): the most important dependencies should be in Tree 1.
2. **Which residual pairs are modelled** at higher trees: pairs conditionally independent given the conditioning set collapse to the independence copula.
3. **Computation**: h-functions are applied differently in C-vine vs D-vine.

Both are special cases of the **regular vine** (R-vine; see [[Regular Vines and the R-Vine Matrix]]) and both are implemented in the `VineCopula` R package and `rvinecopulib`.

## Main Content

> [!definition] C-Vine (Canonical Vine)
> In a **C-vine** of dimension $d$, at each level $\ell$ ($1\le\ell\le d-1$), tree $T_\ell$ has one distinguished **root node** of degree $d-\ell$ connected to all other nodes. The root in tree $T_\ell$ corresponds to an edge (conditioning set) from tree $T_{\ell-1}$.
>
> **Tree structure for $d=4$, root sequence $(1,2,3)$:**
> - Tree 1: root=1, edges $(1,2)$, $(1,3)$, $(1,4)$ — 3 unconditional pair copulas.
> - Tree 2: root=2, edges $(2,3|1)$, $(2,4|1)$ — 2 pair copulas conditioning on $X_1$.
> - Tree 3: root=3, edge $(3,4|1,2)$ — 1 pair copula conditioning on $(X_1,X_2)$.
>
> **Joint density:**
> $$f(x_1,x_2,x_3,x_4) = \prod_{k=1}^4 f_k(x_k)\cdot c_{12}c_{13}c_{14}\cdot c_{23|1}c_{24|1}\cdot c_{34|12}$$
>
> **Argument computation:** All Tree-1 arguments are unconditional CDF values. For Tree 2, the arguments are $h(F_j(x_j)|F_1(x_1);\theta_{j1})$ — h-functions applied using the root's copula. For Tree 3, h-functions from Tree 2 are further transformed.
>
> **Root selection:** The root variable at each level should be the variable most strongly correlated with all others. In time series with a common market factor, a broad index is a natural root; after conditioning on it, residuals may be nearly independent.
> ^def-cvine

> [!definition] D-Vine (Drawable Vine)
> In a **D-vine** of dimension $d$, at each level $\ell$, tree $T_\ell$ is a **path**: nodes $N_\ell = \{n_1, n_2, \ldots, n_{d-\ell+1}\}$ are connected as $n_1 - n_2 - \cdots - n_{d-\ell+1}$, so each interior node has degree 2 and each endpoint has degree 1.
>
> **Tree structure for $d=4$, ordering $(1,2,3,4)$:**
> - Tree 1: path $1-2-3-4$, edges $(1,2)$, $(2,3)$, $(3,4)$ — 3 pair copulas.
> - Tree 2: path $(1,3|2)-(2,4|3)$, edges $(1,3|2)$, $(2,4|3)$ — 2 pair copulas.
> - Tree 3: edge $(1,4|2,3)$ — 1 pair copula.
>
> **Joint density:**
> $$f(x_1,\ldots,x_4) = \prod_{k=1}^4 f_k(x_k)\cdot c_{12}c_{23}c_{34}\cdot c_{13|2}c_{24|3}\cdot c_{14|23}$$
>
> **Argument computation for D-vine:** Arguments build sequentially using the **recursive h-function formulas**. Define $v_{j,i}^d$ (the "left h-function transform") and $v_{j,i}^e$ ("right h-function transform") for each node in the vine. For $d=4$:
> - $v_{12}^d = F_1(x_1)$, $v_{12}^e = F_2(x_2)$
> - $v_{1,3|2}^d = h(v_{12}^d|v_{12}^e;\theta_{12})$, $v_{1,3|2}^e = h(v_{23}^e|v_{23}^d;\theta_{23})$
>
> **Ordering selection:** The D-vine ordering governs which adjacent pairs appear at Tree 1 (strongest pairwise dependence) and which longer-range dependencies are left for higher trees. A maximum spanning tree (MST) on the Kendall-$\tau$ matrix (see [[Vine Copula Estimation and Model Selection]]) selects the best ordering.
> ^def-dvine

> [!definition] Number of vine structures
> The number of distinct C-vine or D-vine structures on $d$ variables grows rapidly:
> - C-vines: $d!/2$ distinct structures (rooted tree at each level; root permutation matters).
> - D-vines: $d!/2$ distinct structures (path orderings up to reflection symmetry).
> - General R-vines: grow combinatorially faster — see [[Regular Vines and the R-Vine Matrix]].
>
> For $d=4$: there are $4!/2 = 12$ distinct C-vine and 12 distinct D-vine structures. For $d=10$: $10!/2 = 1{,}814{,}400$ each. Model selection by exhaustive search is infeasible beyond $d\approx6$; sequential greedy selection (maximum spanning tree) is used in practice.
> ^def-count

> [!definition] C-vine vs D-vine: when to use each
> | Criterion | Prefer C-vine | Prefer D-vine |
> |---|---|---|
> | Dependence structure | One variable drives most pairs (hub variable: market index, temperature) | Dependence decays with "distance" (time series, spatial data, factor models with no dominant variable) |
> | Interpretation | Root variable's marginal and pairwise dependences are the key quantities | Sequential ordering encodes a natural chain or Markov-like structure |
> | Computation | Slightly simpler h-function recursion (all conditioned on a growing set from the same root) | Symmetric recursion along the chain |
> | Financial returns | Use when one asset or factor dominates (e.g., market return as root) | Use when returns exhibit sequential dependence along a sorted correlation structure |
>
> When no a-priori structure is known, use the general **R-vine** with automatic tree selection; see [[Regular Vines and the R-Vine Matrix]].
> ^def-choice

## Examples

> [!example] C-vine for five financial assets with a market factor
> **Setup:** Daily returns on five stocks $R_1,\ldots,R_5$ where $R_1$ is the S&P 500 index, more strongly correlated with each other asset than any pair of non-index assets.
>
> **Model:** C-vine with root sequence $(1,2,3,4,5)$.
> - Tree 1: 4 pair copulas $(1,i)$, $i=2,3,4,5$ — likely Student-$t$ or skew-$t$ to capture equity tail dependence.
> - Tree 2: 3 pair copulas $(i,j|1)$, $i=2,3,j=3,4,5$, $i<j$ — capture residual cross-sectional correlation after removing market dependence.
> - Trees 3-4: increasingly sparse residual dependence, likely near-independence copulas.
>
> **Interpretation:** Tree 1 directly parametrises the market exposure of each stock. The root structure naturally aligns with an approximate one-factor model; the higher trees capture idiosyncratic cross-sectional effects.

> [!example] D-vine for foreign exchange rates in geographic ordering
> **Setup:** Log-returns on EUR/USD, GBP/USD, SEK/USD, NOK/USD, DKK/USD — naturally ordered by geographic/economic proximity.
>
> **Model:** D-vine with ordering $(EUR, GBP, SEK, NOK, DKK)$.
> - Tree 1: 4 adjacent-pair copulas — physically or economically nearest neighbours are expected to have the strongest dependence.
> - Tree 2: 3 "skip-one" pair copulas $(EUR,SEK|GBP)$, etc. — residual dependence between currencies one step apart.
> - Trees 3-4: long-range residuals, likely near-independence.
>
> **Interpretation:** The D-vine ordering encodes the belief that proximity predicts dependence strength; conditioning removes the "middle" currency's effect.

## Connections

- [[Vine Copulas - Overview]] — the broad context and comparison with other copula architectures.
- [[Pair Copula Construction]] — the h-function machinery that evaluates arguments at each tree level.
- [[Regular Vines and the R-Vine Matrix]] — the general R-vine framework of which C-vine and D-vine are special cases.
- [[Vine Copula Estimation and Model Selection]] — tree selection algorithms (MST for D-vine ordering; variable-importance ranking for C-vine root).

## See Also

- [[Multi-Factor and Block Dependence Structures]] — factor copula with an industry block structure; analogous to a C-vine with industry sub-roots but with a more parsimonious parametrisation.
- [[Factor Copulas - Overview]] — the alternative to vine copulas in high dimensions: equal-dependence structure in Tree 1, fewer parameters.
- [[../_Index|Econometrics]]
