---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - topic/dependence-modeling
  - type/concept
  - doc/paper
source: "[[raw/Vine-PairCopula-Survey.md]]"
source_location: "Bedford & Cooke (2002) §3; Aas et al. (2009) §2; Czado (2019) Ch. 6"
date_ingested: 2026-10-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Model Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - R-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> The C-vine (canonical vine) and D-vine (drawable vine) are the two most-used regular vine structures. In a **C-vine** each tree is a star: one pivotal variable at the root conditions all others. In a **D-vine** each tree is a path: variables follow a natural ordering and each interior variable conditions only its two neighbours. The general **R-vine** allows any tree satisfying the proximity condition, but its $d^{d-2}$ possible structures require algorithmic selection. The choice between C-vine, D-vine, and R-vine is part of vine model selection.

## Overview

The density decomposition theorem ([[Vine Copulas - Overview#^thm-vine-density]]) factorises the joint density for *any* regular vine structure. The choice of structure determines:
1. Which bivariate pairs are modelled directly (unconditioned, in $T_1$) versus as residuals (higher-order conditioning).
2. Which variables serve as conditioning variables and at what depth.
3. The order of h-function computations in sequential estimation.

Two canonical subclasses — C-vine and D-vine — correspond to two extremes of tree topology. Bedford & Cooke (2002) introduced both; Aas et al. (2009) show their difference in practice on financial data.

## Main Content

> [!definition] Definition: C-Vine (Canonical Vine)
> A **C-vine** on $d$ variables is a regular vine in which, at each tree $T_k$, exactly one node has degree $d-k$ (the **root** or **pivot**) and all other nodes have degree 1. The tree is a **star**: the pivot connects to all other nodes.
>
> **Labelling convention:** denote the pivot of tree $T_k$ as $j_k$. Often the same variable serves as pivot for all trees (if it drives all dependence), or a different variable is chosen at each level.
>
> **Pair copulas in a C-vine ($d=4$, pivot $j_1=1$, $j_2=2$):**
>
> | Tree | Edges | Pair copulas |
> |---|---|---|
> | $T_1$ | (1,2), (1,3), (1,4) | $c_{12}$, $c_{13}$, $c_{14}$ |
> | $T_2$ | (2,3\|1), (2,4\|1) | $c_{23|1}$, $c_{24|1}$ |
> | $T_3$ | (3,4\|1,2) | $c_{34|12}$ |
>
> **Interpretation:** Every pair copula in $T_1$ involves the pivot $X_1$. Pairs in $T_2$ involve $X_2$ conditioned on $X_1$. The deepest edge captures only the residual dependence between $X_3$ and $X_4$ after removing the influence of both $X_1$ and $X_2$.
^def-c-vine

> [!definition] Definition: D-Vine (Drawable Vine)
> A **D-vine** on $d$ variables is a regular vine in which, at each tree $T_k$, every node has degree at most 2. The trees are **paths** — a Hamiltonian path on $d-k+1$ nodes.
>
> **Labelling convention:** order variables $1, 2, \ldots, d$ along the path in $T_1$. The pairs in $T_1$ are all adjacent pairs $(j, j+1)$; pairs in $T_2$ are $(j, j+2 | j+1)$; and so on.
>
> **Pair copulas in a D-vine ($d=4$, order $1-2-3-4$):**
>
> | Tree | Edges | Pair copulas |
> |---|---|---|
> | $T_1$ | (1,2), (2,3), (3,4) | $c_{12}$, $c_{23}$, $c_{34}$ |
> | $T_2$ | (1,3\|2), (2,4\|3) | $c_{13|2}$, $c_{24|3}$ |
> | $T_3$ | (1,4\|2,3) | $c_{14|23}$ |
>
> **Interpretation:** $T_1$ captures all adjacent-pair dependences. $T_2$ captures dependences between pairs that are two steps apart in the ordering, conditioned on the variable between them. The deepest edge captures dependence between the endpoints of the ordering, conditioned on all intermediate variables.
^def-d-vine

> [!definition] Definition: R-Vine (Regular Vine)
> An **R-vine** is a regular vine with no additional structural constraint: any tree sequence satisfying the proximity condition is allowed. C-vines and D-vines are special cases.
>
> **Counting:** For $d$ variables, the number of possible $T_1$ tree structures alone is $d^{d-2}$ (Cayley's formula for labelled trees). The total number of R-vine structures grows super-exponentially in $d$, making exhaustive search infeasible beyond $d \approx 5$.
>
> **Practical selection:** Use the Dissmann et al. (2013) algorithm (see [[Vine Model Selection]]) — greedily build a maximum-spanning tree at each level using empirical conditional Kendall's $\tau$ as edge weights.
^def-r-vine

### When to use each structure

> [!definition] Choosing between C-vine, D-vine, and R-vine
>
> | Situation | Recommended structure |
> |---|---|
> | One variable drives all pairwise dependencies (market factor, key regressor) | **C-vine** — pivot $=$ the driving variable |
> | Variables have a natural ordering: time series lags, geographic neighbours, or a factor score | **D-vine** — order by proximity |
> | No clear pivot or natural ordering; want maximum flexibility; small $d$ | **R-vine** with algorithmic selection |
> | Very high dimensions ($d > 20$) | **Factor copula** ([[Factor Copulas - Overview]]): parsimonious, scales well |
>
> **C-vine intuition:** Setting the variable with the highest sum of absolute Kendall's $\tau$ values as pivot maximises the explained dependence at $T_1$, leaving less residual dependence for deeper trees.
>
> **D-vine intuition:** If variables are ordered by time (e.g. AR(1) process) or space, the strongest dependences are adjacent, and the vine naturally attenuates at higher-order conditioning.
^def-structure-choice

### Counting pair copulas

For a $d$-dimensional vine (any structure):
- $T_k$ contributes $d-k$ pair copulas.
- Total: $\sum_{k=1}^{d-1}(d-k) = \binom{d}{2} = d(d-1)/2$ pair copulas.

For $d=10$: 45 pair copulas, each with an independent family and parameters. The vine is therefore a very **high-dimensional** object in terms of model selection, even if each individual piece is bivariate.

## Examples

> [!example] C-vine vs. D-vine for 4 variables — same data, different trees
>
> **C-vine (pivot = variable 1):** 6 pair copulas with all $T_1$ edges incident on variable 1.
> Best when $X_1$ (say, a market index) explains most pairwise co-movement.
>
> **D-vine (order 1-2-3-4):** 6 pair copulas with $T_1$ as a path.
> Best when variables are ordered by a latent scale — e.g. stocks ordered by size or beta.
>
> Both use 6 pair copulas and 6 bivariate parameter sets. The *which* pairs are at $T_1$ differs, affecting whether the fit picks up the strongest dependencies early (at $T_1$) or diffusely.

> [!example] High-dimensional R-vine — German DAX stocks (Czado 2019, Ch. 10)
>
> **Setup:** 10 DAX constituent stock returns.
> **R-vine selection:** Dissmann algorithm builds the maximum spanning tree at each level using $|\hat\tau|$ as weights. The resulting R-vine structure has no particular topology — the most dependent pairs appear at $T_1$ regardless of variable labelling.
>
> **Result:** The R-vine fits strictly better (lower AIC) than the best-aligned C-vine or D-vine, because it is unconstrained. The gain over a D-vine is small here (stocks don't have a natural ordering), but the gain over a Gaussian copula is large (heterogeneous tail dependence across pairs is captured).

## Connections

- [[Vine Copulas - Overview]] — the mathematical framework underlying all vine types.
- [[Pair Copula Construction]] — the h-function recursion, which is applied differently for C-vine (star topology: all conditioning sets involve the pivot) and D-vine (path topology: conditioning sets involve the "between" variable).
- [[Vine Model Selection]] — the algorithms for selecting among R-vine structures; the C-vine / D-vine vs. R-vine choice is the first design decision.
- [[Factor Copulas - Overview]] — the factor copula is architecturally closer to a C-vine (one common factor ≈ one pivot variable) but is non-parametric in the marginals and uses a different estimation strategy entirely.
- [[Multi-Factor and Block Dependence Structures]] — the block factor copula groups variables into sectors; the analogous vine structure would assign sector-level pivot variables in a hierarchical C-vine.

## See Also

- [[Vine Model Selection]] — choosing structure, families, parameters
- [[Vine Copulas - Overview]] — foundations and motivation
