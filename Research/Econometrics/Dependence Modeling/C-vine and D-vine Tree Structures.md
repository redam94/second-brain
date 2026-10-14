---
title: "C-vine and D-vine Tree Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/vine-copula-sources-reference.md]]"
source_location: "Aas et al. (2009), Secs. 2–3; Brechmann & Schepsmeier (2013)"
date_ingested: 2026-10-14
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[R-vine Models and Structure Selection]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine tree structure
---

# C-vine and D-vine Tree Structures

> [!summary]
> C-vines (canonical vines) and D-vines (drawable vines) are the two most tractable sub-families of R-vines. A **C-vine** has a star topology in every tree — one root node conditions all others; it is appropriate when one variable dominates dependence (e.g. a market factor). A **D-vine** has a path topology in tree $T_1$ — a natural sequential ordering; it is appropriate for time-ordered or spatially ordered data. Both impose specific conditioning sequences that simplify structure selection and estimation relative to the fully general R-vine ([[R-vine Models and Structure Selection]]).

## Overview

When Bedford & Cooke (2002) introduced R-vines as the general framework for pair-copula constructions, two special sub-cases were immediately useful because they (1) have a fixed, interpretable structure that does not need to be selected, and (2) admit simple recursive algorithms for h-function evaluation. These are the C-vine and D-vine. Aas et al. (2009) derived their explicit density formulas (reproduced in [[Pair-Copula Construction#^def-cvine-density]] and [[Pair-Copula Construction#^def-dvine-density]]) and showed how to apply them in exchange-rate and financial applications.

## Main Content

> [!definition] C-vine (canonical vine) — formal structure
> A **C-vine** for $d$ variables consists of $d-1$ trees $T_1, T_2, \ldots, T_{d-1}$ where:
> - **Tree $T_1$:** a star with $d$ nodes (the $d$ variables) and $d-1$ edges. One node — the **root** $r_1$ — connects to all others. Edges are $(r_1, j)$ for $j \neq r_1$. These $d-1$ edges represent the $d-1$ unconditional pair copulas involving variable $r_1$.
> - **Tree $T_2$:** a star on $d-1$ nodes (each = an edge of $T_1$). The root $r_2$ is the edge $(r_1, r_2^*)$ from $T_1$, where $r_2^*$ is a second variable. Edges of $T_2$ represent pair copulas conditioned on $\{r_1\}$: $c_{r_2, j | r_1}$ for $j \neq r_1, r_2$.
> - **Tree $T_j$:** a star on $d-j+1$ nodes; root conditions on $\{r_1, r_2, \ldots, r_{j-1}\}$; contributes $d-j$ pair copulas.
>
> Choosing a C-vine is equivalent to choosing the **root ordering** $r_1, r_2, \ldots, r_{d-1}$. There are $d!/(2!)$ possible root orderings for a $d$-dimensional C-vine.
>
> **Total pair copulas:** $\sum_{j=1}^{d-1} (d-j) = d(d-1)/2$ ✓
^def-cvine

> [!definition] D-vine (drawable vine) — formal structure
> A **D-vine** for $d$ variables in ordering $1, 2, \ldots, d$ consists of $d-1$ trees where:
> - **Tree $T_1$:** a **path** $1 - 2 - 3 - \cdots - d$. All $d-1$ edges are present: $(1,2), (2,3), \ldots, (d-1, d)$. These are the $d-1$ unconditional pair copulas of *adjacent* variables.
> - **Tree $T_2$:** edges of $T_1$ become nodes. Two nodes are connected iff they share one variable. This gives $d-2$ edges: $(1,3|2), (2,4|3), \ldots, (d-2, d|d-1)$.
> - **Tree $T_j$:** contributes $d-j$ pair copulas: $(1, j+1|2,\ldots,j), (2, j+2|3,\ldots,j+1), \ldots$
>
> Choosing a D-vine is equivalent to choosing the **variable ordering** $1, 2, \ldots, d$. There are $d!/2$ possible orderings (factor of 2 because reversing the path gives the same model).
^def-dvine

> [!definition] Structural comparison: star vs. path
>
> | Feature | C-vine | D-vine |
> |---|---|---|
> | $T_1$ topology | Star (one hub → all others) | Path (chain of edges) |
> | Root concept | Global root $r_1$; per-tree roots $r_1, \ldots, r_{d-1}$ | Variable ordering $1, 2, \ldots, d$ |
> | Pair copulas in $T_1$ | $c_{r_1, j}$ for all $j \neq r_1$ | $c_{i, i+1}$ for adjacent $i$ |
> | Conditioning set in $T_2$ | Always $\{r_1\}$ | Single adjacent variable |
> | Best for | One variable dominates all others | Natural sequential/spatial ordering |
> | Example domain | Finance (market factor), medicine (disease severity) | Time series, geography, genetic sequences |
>
> Note that in both cases the structure completely determines *which* conditioning sets appear. In C-vines, conditioning sets are always of the form $\{r_1, \ldots, r_{j-1}\}$ — a growing prefix of the root sequence. In D-vines, conditioning sets are always contiguous intervals $\{i+1, \ldots, i+j-1\}$ in the path ordering.
^def-comparison

> [!definition] Nesting in R-vines
> Both C-vines and D-vines are special cases of R-vines (see [[R-vine Models and Structure Selection]]). In an R-vine, any valid tree sequence satisfying the proximity condition is allowed. A C-vine with one root per tree satisfies this; a D-vine with path topology satisfies this. If the data exhibit neither a dominant conditioning variable nor a natural sequence, the R-vine with greedy structure selection (Dißmann et al. 2013) will generally be preferred — see [[R-vine Models and Structure Selection]].
^def-rvine-nesting

## Examples

> [!example] 5-dimensional C-vine (root order: 1, 2, 3, 4)
> Variables: $X_1$ = market return (S&P 500), $X_2$ = financials sector, $X_3$ = energy sector, $X_4$ = tech sector, $X_5$ = utilities sector.
>
> **Tree $T_1$ (root = market):** 4 edges: $(1,2), (1,3), (1,4), (1,5)$ — pair copulas $c_{12}, c_{13}, c_{14}, c_{15}$ (e.g. all $t$-copulas capturing symmetric tail dependence with the market).
>
> **Tree $T_2$ (root = financials $|$ market):** 3 edges: $(2,3|1), (2,4|1), (2,5|1)$ — pair copulas conditioned on the market. These capture the *residual* sectoral dependence once market movements are controlled for.
>
> **Tree $T_3$ (root = energy $|$ market, financials):** 2 edges: $(3,4|1,2), (3,5|1,2)$.
>
> **Tree $T_4$:** 1 edge: $(4,5|1,2,3)$.
>
> **Interpretation:** The C-vine imposes that the market index (variable 1) is the primary conditioning variable. All sectoral dependence is mediated through the market in $T_1$, with residual sector-to-sector co-movement captured at higher levels.

> [!example] 4-dimensional D-vine (exchange rates, Aas et al. 2009)
> Variables: $X_1$ = DEM/USD, $X_2$ = GBP/USD, $X_3$ = JPY/USD, $X_4$ = CHF/USD.
>
> **Tree $T_1$ (path: 1–2–3–4):** 3 edges: $(1,2), (2,3), (3,4)$ — copulas for geographically/economically adjacent pairs.
>
> **Tree $T_2$:** 2 edges: $(1,3|2), (2,4|3)$ — cross pairs, conditioning on the intervening currency.
>
> **Tree $T_3$:** 1 edge: $(1,4|2,3)$ — the residual DEM/CHF dependence after conditioning on GBP and JPY.
>
> **Families:** $t$-copulas for tree 1 (strong, symmetric tail dependence); Gaussian for tree 3 (near-independence once intermediate currencies are conditioned out). This illustrates how D-vine naturally models *decaying dependence* with path distance.

## Connections

- [[Pair-Copula Construction]] — the density formulas for C-vine ([[Pair-Copula Construction#^def-cvine-density]]) and D-vine ([[Pair-Copula Construction#^def-dvine-density]]) and the h-function.
- [[R-vine Models and Structure Selection]] — the general R-vine framework; C- and D-vines are special cases.
- [[Vine Copula Estimation]] — fitting procedure differences: in C-vines sequential estimation starts from the root; in D-vines from the path.
- [[Vine Copulas - Overview]] — motivation and comparison to the factor copula architecture.
- [[Multi-Factor and Block Dependence Structures]] — the block C-vine analogy in the factor copula world: groups of variables sharing a common sub-factor.

## See Also

- [[Factor Copulas - Overview]] — the competing architecture for high-dimensional dependence.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence; both used to choose root ordering (most dependent first) and to evaluate fit.
