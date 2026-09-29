---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/vine-copula-sources.md]]"
source_location: "Bedford & Cooke (2002); Aas et al. (2009), Secs. 2-4; Dissmann et al. (2013)"
date_ingested: 2026-09-27
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Constructions]]"
used_by:
  - "[[Copula Architecture Comparison]]"
  - "[[Vine Copulas - Overview]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - regular vine structure
  - vine tree sequence
---

# C-Vine and D-Vine Structures

> [!summary]
> A vine copula's dependence structure is encoded in a sequence of $d-1$ trees. The two most common special cases are the **D-vine** (each tree is a path/chain — suitable for ordered data like time series) and the **C-vine** (each tree is a star centred on a hub variable — suitable when one variable dominates all pairwise dependencies). For fully flexible structure, the **R-vine** (regular vine) allows any tree topology satisfying the proximity condition. The vine structure determines *which* conditional pair copulas appear in the [[Pair-Copula Constructions|density factorisation]] and therefore which aspect of dependence is modelled at each conditioning level.

## Overview

A vine copula is not a single object but a *framework* — the specific bivariate copula families and their arrangement in trees are both chosen by the analyst (or data-driven selection algorithms). The tree sequence defines the conditioning structure: pairs in tree $T_1$ are modelled without conditioning; pairs in $T_2$ are conditional on one variable; pairs in $T_3$ are conditional on two variables; and so on. The tree structure determines these conditioning sets and therefore the interpretability and estimation complexity of the model.

## The Vine Tree Sequence

> [!definition] Definition: Regular Vine (Bedford & Cooke 2002)
> A **regular vine (R-vine)** on $d$ variables is a sequence of $d-1$ trees $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ where:
> 1. **Tree $T_1$** has nodes $\{1, 2, \ldots, d\}$ (the $d$ variables) and $d-1$ edges.
> 2. **Tree $T_j$ ($j \geq 2$)** has nodes = edges of $T_{j-1}$, and $d-j$ edges.
> 3. **Proximity condition:** Two nodes in $T_j$ can be connected by an edge only if the corresponding edges in $T_{j-1}$ share a node. This ensures that conditioning sets grow consistently.
>
> Each edge $e$ in tree $T_j$ corresponds to a bivariate copula $c_{a(e),b(e)|D(e)}$ where $a(e)$, $b(e)$ are the two *unique* nodes of the edge (not in the shared conditioning set $D(e)$).
^def-r-vine

> [!definition] Definition: Node and Constraint sets
> For an edge $e = \{U, V\}$ in tree $T_j$ (where $U$ and $V$ are nodes of $T_j$, i.e., edges of $T_{j-1}$):
> - **Complete union:** $U \cup V$ (all indices appearing in $U$ or $V$)
> - **Constraint set:** $D(e) = U \cap V$ (the shared index)
> - **Conditioned set:** $\{a(e), b(e)\} = (U \cup V) \setminus (U \cap V)$ (the two indices unique to each side)
>
> The pair copula for edge $e$ is $c_{a(e), b(e) | D(e)}$ — the copula of variables $a(e)$ and $b(e)$ given $D(e)$.
^def-constraint-sets

## D-Vine (Drawable Vine / Chain Structure)

> [!definition] Definition: D-Vine
> A **D-vine** is an R-vine where every tree $T_j$ is a **path** (chain graph): each node has degree at most 2. Equivalently, no node in any tree $T_j$ has more than two neighbours.
>
> For a $d$-variable D-vine with ordering $\sigma = (\sigma_1, \sigma_2, \ldots, \sigma_d)$:
> - **Tree $T_1$:** path $\sigma_1 - \sigma_2 - \sigma_3 - \cdots - \sigma_d$ with edges $\{\sigma_i, \sigma_{i+1}\}$ for $i=1,\ldots,d-1$
> - **Tree $T_2$:** path of nodes $\{\sigma_1\sigma_2\}, \{\sigma_2\sigma_3\}, \ldots, \{\sigma_{d-1}\sigma_d\}$ with edges connecting consecutive nodes (conditioning set = middle index)
> - **Tree $T_j$:** pair copulas of the form $c_{\sigma_i, \sigma_{i+j} | \sigma_{i+1},\ldots,\sigma_{i+j-1}}$ for $i=1,\ldots,d-j$
^def-d-vine

**Example (D-vine, $d=4$, ordering $1-2-3-4$):**

```
T₁:   1 ─ 2 ─ 3 ─ 4
           
T₂:  {1,2}─{2,3}─{3,4}   
      c₁₃|₂     c₂₄|₃

T₃: {1,2,3}─{2,3,4}
          c₁₄|₂₃
```

The 6 pair copulas are: $c_{12}$, $c_{23}$, $c_{34}$ (tree 1); $c_{13|2}$, $c_{24|3}$ (tree 2); $c_{14|23}$ (tree 3).

**When to use D-vine:**
- Ordered variables: time series, spatial sequences, ordered response levels
- When no single variable obviously dominates dependence
- When the path ordering reflects a natural sequence (e.g., maturities in a yield curve)

## C-Vine (Canonical Vine / Star Structure)

> [!definition] Definition: C-Vine
> A **C-vine** is an R-vine where every tree $T_j$ is a **star**: there is one central *hub* node connected to all other nodes in that tree. The hub in tree $T_1$ is a variable; the hub in tree $T_2$ is an edge from $T_1$ (a pair); and so on.
>
> For a $d$-variable C-vine with hub ordering $(\pi_1, \pi_2, \ldots, \pi_{d-1})$:
> - **Tree $T_1$:** star with centre $\pi_1$, edges $\{\pi_1, j\}$ for $j \neq \pi_1$ — all pairs involving $\pi_1$ modelled unconditionally
> - **Tree $T_2$:** star with centre $\{\pi_1, \pi_2\}$, edges involving $\pi_2$ conditional on $\pi_1$
> - **Tree $T_j$:** pair copulas $c_{\pi_j, k | \pi_1, \ldots, \pi_{j-1}}$ for $k \notin \{\pi_1, \ldots, \pi_j\}$
^def-c-vine

**Example (C-vine, $d=4$, hub $\pi_1=1$, $\pi_2=2$, $\pi_3=3$):**

```
T₁:     2
        |
    3─ 1 ─ 4    (star centred at 1)

T₂:   {1,3}
         |
     {1,4}─{1,2}─...  (star: c₂₃|₁, c₂₄|₁, c₃₄|₁... wait, only 2 edges remain)
     
     c₂₃|₁,  c₂₄|₁   (star centred at {1,2})
     
T₃:   c₃₄|₁₂         (single edge)
```

The 6 pair copulas are: $c_{12}$, $c_{13}$, $c_{14}$ (tree 1, all involving variable 1); $c_{23|1}$, $c_{24|1}$ (tree 2, all involving variable 2 conditional on 1); $c_{34|12}$ (tree 3).

**When to use C-vine:**
- One variable (the hub of $T_1$) drives most of the pairwise dependence — e.g., a market index in a portfolio, or a key macroeconomic factor
- Hub selection: choose the variable with the highest sum of absolute pairwise Kendall's $\tau$ as the $T_1$ hub
- Interpretable: the $T_1$ copulas are all unconditional; only deeper trees condition

## R-Vine (Regular Vine / General Structure)

The **general R-vine** (also called a *regular vine*) permits any tree topology satisfying the proximity condition. It nests both D-vine and C-vine as special cases.

> [!definition] Definition: R-Vine matrix
> An R-vine structure is conveniently encoded in a **lower triangular matrix** $M$ (the *vine matrix* or *RVine matrix*): the diagonal entries give the variable order; entry $M_{i,j}$ ($i > j$) gives the conditioning set for the pair $(\text{diag}[j], M_{i,j})$ in the vine. This is the storage format used by `VineCopula` and `rvinecopulib`.
^def-rvine-matrix

**Dissmann's greedy structure selection algorithm (2013):**
1. Fit all $d(d-1)/2$ bivariate copulas and compute Kendall's $\tau$ for each pair.
2. For tree $T_1$: find the *maximum spanning tree* using $|\hat{\tau}_{ij}|$ as edge weights — this maximises total pairwise dependence captured at the unconditional level.
3. For trees $T_2, T_3, \ldots$: compute pseudo-observations via $h$-functions, fit copulas on the new pseudo-pairs, build the next maximum spanning tree subject to the proximity condition.

This greedy algorithm is implemented in `rvinecopulib::vinecop()` and `VineCopula::RVineStructureSelect()`.

## Comparison: D-Vine vs C-Vine vs R-Vine

| Property | D-vine | C-vine | R-vine |
|---|---|---|---|
| Tree $T_1$ shape | Path | Star | Any |
| Nodes in tree $T_j$ | $d - j$ (degree ≤ 2) | $d - j$ (one hub) | $d - j$ |
| Pairs in $T_1$ | $d - 1$ adjacent | $d - 1$ through hub | $d - 1$ any |
| Key assumption | Natural ordering of variables | Hub variable dominates | Data-driven |
| Interpretability | High (sequential conditioning) | High (hub captures common factor) | Moderate |
| Structure selection | Choose ordering $\sigma$ | Choose hub ordering $\pi$ | Greedy max. spanning tree |
| Software | `CDVine`, `VineCopula` | `CDVine`, `VineCopula` | `VineCopula`, `rvinecopulib` |
| Estimation | Sequential MLE or full MLE | Sequential MLE or full MLE | Sequential MLE or full MLE |

## Vine Truncation

For large $d$, fitting all $d(d-1)/2$ pair copulas is costly and higher-tree copulas typically capture diminishing amounts of dependence. **Truncated vine copulas** set all copulas in trees $T_j$ with $j > K$ to the independence copula, for a truncation level $K$ chosen by information criteria. A truncated vine at level 1 captures only pairwise (unconditional) dependence; level 2 adds one-variable conditional dependence.

## Software

- **`VineCopula`** (R): `CDVineCopTrunc`, `RVineStructureSelect`, `RVineMLE`, `RVineSimulate`
- **`rvinecopulib`** (R): `vinecop()` with `family_set`, `selcrit="bic"`, `trunc_lvl` arguments; uses C++ backend for speed; supports nonparametric pair copulas
- **`pyvinecopulib`** (Python): same C++ backend exposed via Python; `Vinecop` class with same API

## Connections

- [[Vine Copulas - Overview]] — broader context, motivation, and historical background
- [[Pair-Copula Constructions]] — the density formula whose tree-structure terms are indexed by the vine structure defined here
- [[Factor Copulas - Overview]] — alternative high-dimensional dependence model without tree structure; Oh & Patton note vines "have hard-to-interpret/test assumptions" at $d \gg 20$
- [[Copula Architecture Comparison]] — C-vine vs factor copula vs Gaussian copula trade-offs

## See Also

- [[Vine Copulas - Overview]] — overview and motivation
- [[Pair-Copula Constructions]] — the density factorisation and estimation
- [[Copula Architecture Comparison]] — when to use vine vs factor copulas
- [[Factor Copula Construction]] — latent-factor alternative
