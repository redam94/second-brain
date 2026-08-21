---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "§3"
date_ingested: 2026-08-21
date_updated: 2026-08-21
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - R-vine structure
---

# C-Vine and D-Vine Structures

> [!summary]
> Among all regular vine structures, the **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most commonly used in practice. The C-vine has a **star structure** at each tree level — one root node drives all pair copulas — making it natural when a single variable (e.g. a market index) centrally governs dependence. The D-vine has a **path structure** — sequential pairs with overlapping conditioning — making it natural for time series or variables with a natural ordering. Both are special cases of the general R-vine (Bedford & Cooke 2002).

## Overview

For a $d$-dimensional regular vine there are astronomically many possible tree structures: $d!/2$ distinct R-vines for $d$ variables. Structure selection — choosing which tree to use — is itself a modelling decision. The C-vine and D-vine restrict the search space to two interpretable families with distinctive graph shapes, each suited to different dependence patterns.

Aas et al. (2009) introduced and named these two vine families in the context of sequential MLE. Czado (2019) provides a comprehensive treatment of both including the graphical representation and practical guidance on choosing between them.

## Main Content

> [!definition] C-Vine (Canonical Vine)
> A **C-vine** on $d$ variables assigns a **star topology** to each tree: tree $T_k$ has one root node connected to all $d-k$ remaining nodes.
>
> For $d=4$ variables with root ordering $(1,2,3,4)$ (root of tree $k$ is variable $k$):
>
> | Tree | Edges (pairs) | Conditioning set |
> |---|---|---|
> | $T_1$ | $(1,2),\;(1,3),\;(1,4)$ | $\emptyset$ |
> | $T_2$ | $(2,3|1),\;(2,4|1)$ | $\{1\}$ |
> | $T_3$ | $(3,4|1,2)$ | $\{1,2\}$ |
>
> **General pattern:** in tree $T_k$, the root is variable $k$; all pairs are $(k, j \mid 1, \ldots, k-1)$ for $j = k+1, \ldots, d$.
>
> **Total copulas:** $d(d-1)/2$ — same as any regular vine.
>
> **When to use:**
> - One variable (the "root") has central importance: a financial market index, a key environmental driver, a policy treatment.
> - The scientific question is about the dependence of each variable on the key variable, after conditioning out its influence.
> - The ordering of roots is chosen to maximise dependence at each tree level (most-dependent pair first — see [[Vine Copula Estimation and Selection]]).
^def-cvine

> [!definition] D-Vine (Drawable Vine)
> A **D-vine** on $d$ variables assigns a **path topology** to each tree: tree $T_1$ is a Hamiltonian path $1 - 2 - 3 - \cdots - d$ through all nodes.
>
> For $d=4$ variables with ordering $(1,2,3,4)$:
>
> | Tree | Edges (pairs) | Conditioning set |
> |---|---|---|
> | $T_1$ | $(1,2),\;(2,3),\;(3,4)$ | $\emptyset$ |
> | $T_2$ | $(1,3|2),\;(2,4|3)$ | varies by edge |
> | $T_3$ | $(1,4|2,3)$ | $\{2,3\}$ |
>
> **General pattern:** edge $(j, j+k \mid j+1, \ldots, j+k-1)$ for offset $k=1,\ldots,d-1$ and position $j=1,\ldots,d-k$.
>
> **When to use:**
> - Variables have a **natural sequential ordering**: time series (the path order is the time order), spatial locations along a transect, or variables ordered by some attribute.
> - Dependence is expected to decay with distance from the diagonal — variables far apart in the ordering are nearly conditionally independent given the intermediaries.
> - The conditional Markov structure is scientifically plausible: $(Y_1 \perp Y_{k+1} \mid Y_2, \ldots, Y_k)$ for $k \geq 2$.
^def-dvine

> [!definition] R-Vine (General Regular Vine)
> The **R-vine** (Bedford & Cooke 2002) subsumes C-vine and D-vine as special cases. In an R-vine, the tree structure at each level can be any tree satisfying the proximity condition (see [[Vine Copulas - Overview#^def-rvine]]). This allows, for example, a vine where some trees are star-shaped and others are path-shaped, or where the conditioning structure follows an empirically-derived network rather than a pre-specified C/D template.
>
> In practice, R-vine structure selection uses the **Maximum Spanning Tree (MST) algorithm** of Dissmann et al. (2013): at each tree level, fit all candidate bivariate copulas and choose the spanning tree that maximises the sum of pairwise (conditional) dependence (e.g. absolute Kendall's $\tau$), subject to the proximity condition from the previous tree.
>
> The MST R-vine is implemented in the `rvinecopulib` and `VineCopula` R packages.
^def-rvine

> [!definition] Graphical representation and the proximity condition
> The proximity condition is the key constraint ensuring R-vines have a valid density:
>
> > **Proximity condition:** If nodes $a$ and $b$ are connected in tree $T_{k+1}$, their corresponding edges in $T_k$ must share exactly one endpoint.
>
> Equivalently, if edge $e_1 = \{a_e, b_e | \mathbf{D}_e\}$ and $e_2 = \{a_{e'}, b_{e'} | \mathbf{D}_{e'}\}$ are nodes in $T_{k+1}$ connected by an edge, then $\{a_e, b_e\} \triangle \{a_{e'}, b_{e'}\} = \{a, b\}$ (the symmetric difference has exactly two elements — the **conditioned nodes** of the new edge), and $\mathbf{D}_e \cap \mathbf{D}_{e'}$ is the **conditioning set** of the new edge.
>
> This condition guarantees that each tree introduces exactly $d-k$ distinct conditional pairs, giving $d(d-1)/2$ edges total across all trees.
^def-proximity

## Examples

> [!example] D-vine for bivariate time series (Brechmann & Czado 2015)
> For a $d$-dimensional time series $(Y_1, \ldots, Y_d)$ indexed by time, a D-vine with path order $1-2-\cdots-d$ models:
> - **Lag-1 dependence** (tree 1): pair $(t, t+1)$ copulas for adjacent time points.
> - **Lag-2 dependence given lag-1** (tree 2): pair $(t, t+2 | t+1)$ copulas — remaining co-movement after conditioning on the intermediate observation.
> - **Higher-lag residual dependence** (trees 3+): often set to independence (truncated vine), capturing only the Markov decay.
>
> This is the basis of **D-vine quantile regression** (Kraus & Czado 2017; implemented in `vinereg` R package) and **D-vine copula-based regression**.

> [!example] C-vine for equity returns driven by a market factor
> For a portfolio of $d$ stocks with a market index as the first variable, a C-vine with root $Y_1 = \text{market}$:
> - **Tree 1:** Each stock $Y_i$ ($i=2,\ldots,d$) is paired with the market index $Y_1$ via a bivariate copula (e.g. skew-$t$ to capture asymmetric tail dependence with the market).
> - **Tree 2:** Pairs $(Y_i, Y_j | Y_1)$ model residual stock-to-stock dependence after conditioning out the market. These copulas should be nearly Gaussian if the market factor explains most of the dependence.
>
> This decomposition closely mirrors the **factor copula** of Oh & Patton (2012) with $Y_1$ playing the role of the common factor — but the vine approach allows each stock's copula with the market to have a different family, unlike the equidependence factor model.

## Connections

- [[Vine Copulas - Overview]] — the overall PCC framework; C-vine and D-vine are two special cases of R-vine.
- [[Pair-Copula Construction]] — the $h$-function computations that propagate conditional CDFs through the vine trees apply to both C-vine and D-vine in the same way.
- [[Vine Copula Estimation and Selection]] — the MST algorithm selects the vine structure empirically; C-vine/D-vine restrict the structure for interpretability.
- [[Factor Copulas - Overview]] — the C-vine with one central root closely resembles a one-factor copula; vine copulas generalise to heterogeneous bivariate families.
- [[Multi-Factor and Block Dependence Structures]] — block factor copulas and C-vines share the idea of a central driver; block structure in the factor model maps to the root ordering in the C-vine.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence used in MST structure selection.
- [[../_Index|Dependence Modeling]]
