---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Aas-Czado-Survey.md]]"
source_location: "Aas et al. (2009) §2.1-2.2; Bedford & Cooke (2002) §3; Czado & Nagler (2022) §2"
date_ingested: 2026-07-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - pair copula tree structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two standard special cases of the regular vine structure used in applied copula modelling. The C-vine places one root variable at the centre of each tree (star topology), while the D-vine chains variables in a path. Both admit explicit density formulas and recursive h-function calculations; the choice of structure is determined by data characteristics and the Dissmann (2013) greedy selection algorithm.

## Overview

A regular vine on $d$ variables requires specifying $d-1$ trees, each connecting the nodes (variables, then conditional pairs) into an undirected graph satisfying the proximity condition (see [[Vine Copulas - Overview]]). The C-vine and D-vine are the two extreme special cases that appear most frequently in practice. For $d \leq 4$, both structures are equivalent up to variable reordering; differences emerge for $d \geq 5$.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-Vine Structure (Bedford & Cooke 2002; Aas et al. 2009 §2.1)
> In a **C-vine**, every tree $T_j$ has a single root node connected to all $d - j$ other nodes. This produces a **star topology** at each tree level.
>
> For $d$ variables with root ordering $(r_1, r_2, \ldots, r_{d-1})$ (variable $r_j$ is the root of tree $T_j$), the C-vine density is:
> $$f(x_1, \ldots, x_d) = \left[\prod_{k=1}^{d} f_k(x_k)\right] \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{r_j, v(j,i) | D(j,i)}\!\bigl(F(x_{r_j}|\mathbf{x}_{D(j,i)}),\; F(x_{v(j,i)}|\mathbf{x}_{D(j,i)})\bigr)$$
> where $v(j,i)$ indexes the non-root nodes in tree $T_j$ and $D(j,i) = \{r_1, \ldots, r_{j-1}\}$ is the conditioning set (the roots of all prior trees).
>
> **Interpretation:** In tree $T_1$, variable $r_1$ (the dominant variable) is paired with each of the other $d-1$ variables. In tree $T_2$, variable $r_2$ is paired with all remaining variables, conditional on $r_1$. The root variable at each level drives the most dependence at that conditioning level.
^def-cvine

> [!example] 4-Variable C-Vine (Variable 1 as Overall Root)
> With variable 1 as the $T_1$ root, variable 2 as the $T_2$ root:
>
> **Tree $T_1$** (3 edges): $(1,2)$, $(1,3)$, $(1,4)$ — variable 1 paired with all others
>
> **Tree $T_2$** (2 edges): $(2,3|1)$, $(2,4|1)$ — variable 2 paired with 3 and 4, conditioned on 1
>
> **Tree $T_3$** (1 edge): $(3,4|1,2)$ — the single remaining pair, conditioned on 1 and 2
>
> **Full density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} \cdot c_{13} \cdot c_{14} \cdot c_{23|1} \cdot c_{24|1} \cdot c_{34|12}$$
>
> **Total:** 3 + 2 + 1 = 6 pair copulas, as required for $d=4$.
>
> **When to use:** When one variable drives most of the dependence (e.g. an index vs. its constituent stocks; a macroeconomic factor vs. sector returns). The root variable at tree 1 is modelled jointly with every other variable in marginal space.

### D-Vine (Drawable Vine)

> [!definition] D-Vine Structure (Bedford & Cooke 2002; Aas et al. 2009 §2.2)
> In a **D-vine**, every tree $T_j$ is a **path** — each node has at most 2 neighbours. The nodes of $T_1$ are the variables themselves, arranged in a chosen ordering $(1, 2, \ldots, d)$; adjacency in $T_1$ determines the path.
>
> For $d$ variables with path ordering $(1, 2, \ldots, d)$, the D-vine density is:
> $$f(x_1, \ldots, x_d) = \left[\prod_{k=1}^{d} f_k(x_k)\right] \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j | i+1,\ldots,i+j-1}\!\bigl(F(x_i|\mathbf{x}_{i+1:i+j-1}),\; F(x_{i+j}|\mathbf{x}_{i+1:i+j-1})\bigr)$$
> where $\mathbf{x}_{i+1:i+j-1} = (x_{i+1}, \ldots, x_{i+j-1})$.
>
> **Interpretation:** Tree $T_1$ connects consecutive pairs $(1,2), (2,3), \ldots, (d-1,d)$ — the bivariate copulas of adjacent variables. Tree $T_2$ connects pairs one step apart, conditioned on their intermediate neighbour: $(1,3|2), (2,4|3), \ldots$ The path ordering should reflect a natural proximity ordering of the variables (e.g. time lags, geographic proximity).
^def-dvine

> [!example] 4-Variable D-Vine with Ordering $(1,2,3,4)$
> **Tree $T_1$** (3 edges): $(1,2)$, $(2,3)$, $(3,4)$ — consecutive pairs
>
> **Tree $T_2$** (2 edges): $(1,3|2)$, $(2,4|3)$ — pairs two steps apart, conditioned on the intermediate variable
>
> **Tree $T_3$** (1 edge): $(1,4|2,3)$ — endpoints conditioned on interior variables
>
> **Full density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} \cdot c_{23} \cdot c_{34} \cdot c_{13|2} \cdot c_{24|3} \cdot c_{14|23}$$
>
> **H-function recursion for conditional CDFs:**
> - $F(x_1 | x_2) = h_{12}(F_1(x_1) | F_2(x_2))$ using the $(1,2)$ pair copula's h-function.
> - $F(x_3 | x_2) = h_{32}(F_3(x_3) | F_2(x_2))$ using the $(2,3)$ pair copula's h-function.
> - $F(x_1 | x_2, x_3) = h_{13|2}(F(x_1|x_2) | F(x_3|x_2))$ using the $(1,3|2)$ pair copula's h-function.
>
> **When to use:** When variables have a natural ordered structure — a time series (lags), a spatial sequence, or variables ordered by frequency of interaction.

### General Regular Vine (R-Vine)

> [!definition] R-Vine Matrix Representation
> Any regular vine structure can be encoded by a $d \times d$ lower-triangular matrix $M$ (Dissmann et al. 2013). The matrix encodes:
> - Which two variables are paired at each edge
> - The conditioning set for each pair
>
> For a 4-variable D-vine with ordering $(1,2,3,4)$:
> $$M = \begin{pmatrix} 1 & & & \\ 2 & 2 & & \\ 3 & 3 & 3 & \\ 4 & 4 & 4 & 4 \end{pmatrix}$$
>
> Software packages (VineCopula, rvinecopulib, pyvinecopulib) read and write vine structures via this matrix, allowing arbitrary R-vine structures beyond C- and D-vines.
^def-rvinematrix

## Choosing Between C-Vine and D-Vine

| | C-Vine | D-Vine |
|---|---|---|
| Tree topology | Star (hub-and-spoke) | Path |
| Natural application | One dominant driving variable | Ordered variables (time, space) |
| Parameters in $T_1$ | $d-1$ copulas (all involving the root) | $d-1$ copulas (consecutive pairs) |
| Higher-tree complexity | Conditioning set grows from one root | Conditioning set grows from both ends |
| Example use case | Market index driving sector returns | Time-series lag dependence modelling |
| Variable ordering | Root chosen as the most correlated variable | Ordering by maximum spanning tree (MST) |

For general data with no clear structural motivation for either form, use a **regular vine** (R-vine) with the Dissmann structure selection algorithm; see [[Vine Copula Estimation and Model Selection]].

## Connections

- [[Vine Copulas - Overview]] — the general pair-copula decomposition, the simplifying assumption, and the full comparison with factor and Normal/t copulas.
- [[Vine Copula Estimation and Model Selection]] — how to select the vine structure and estimate pair copulas in practice (sequential MLE, Dissmann algorithm, truncated vines).
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence used to rank variable pairs and guide structure selection in tree $T_1$.
- [[Factor Copulas - Overview]] — the alternative: all pairs share a common latent factor rather than having individual copulas.
- [[SMM Estimation of Factor Copulas]] — factor copula estimation by SMM; contrast with vine's sequential MLE.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — industry-block factor structure: conceptually analogous to vine truncation (dropping higher-tree detail).
- [[../_Index|Dependence Modeling]]
