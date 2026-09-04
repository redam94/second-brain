---
title: Vine Copula Structures - C-vine and D-vine
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.pdf]]"
source_location: "Secs. 2-3, pp. 186-191"
date_ingested: 2026-09-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[Vine Copula Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - pair-copula tree structure
---

# Vine Copula Structures - C-vine and D-vine

> [!summary]
> The two canonical special cases of regular vines are the **C-vine** (canonical vine, star-structured trees) and **D-vine** (drawable vine, path-structured trees). Both give exact multivariate density formulas as products of bivariate pair-copula densities evaluated at conditional CDFs. The C-vine is best when one variable drives all pairwise dependences; the D-vine is best when variables have a natural linear order (e.g., lag-1, lag-2, … in time series). For $d$ variables, each vine uses exactly $\binom{d}{2}$ pair copulas across $d-1$ trees.

## Overview

Given a $d$-dimensional joint density, a vine organises the $\binom{d}{2}$ bivariate pair copulas into $d-1$ trees. The choice of tree structure determines which pairs appear in which tree (and hence which conditioning sets arise). The **C-vine** and **D-vine** are the two structurally simplest choices; they admit closed-form density formulas and are easy to implement. The general **R-vine** subsumes both and allows arbitrary tree structures selected by data-driven criteria.

See [[Vine Copulas - Overview]] for the general pair-copula construction framework and the regular vine definition.

## Main Content

### The D-vine (Drawable Vine)

> [!definition] D-vine structure
> A **D-vine** (drawable vine) is a regular vine in which every tree $T_j$ is a **path** — each node has degree at most 2. Equivalently, the $d$ variables are arranged in a sequence (a "line"), and the first tree connects adjacent pairs. Higher trees add pair copulas between variables separated by larger lags in the sequence.
^def-dvine

**D-vine density formula.** For variables $X_1, \dots, X_d$ arranged in the D-vine order:

$$f(x_1, \dots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i, i+j \mid i+1, \dots, i+j-1}\!\bigl(F(x_i \mid x_{i+1}, \dots, x_{i+j-1}),\, F(x_{i+j} \mid x_{i+1}, \dots, x_{i+j-1})\bigr)$$

Tree 1 ($j=1$) contributes $d-1$ unconditional pair copulas: $c_{12}$, $c_{23}$, $\dots$, $c_{d-1,d}$.  
Tree 2 ($j=2$) contributes $d-2$ pair copulas each conditioned on one variable: $c_{13|2}$, $c_{24|3}$, $\dots$  
Tree $d-1$ ($j=d-1$) contributes one pair copula conditioned on $d-2$ variables: $c_{1d|2,\dots,d-1}$.

> [!example] D-vine for $d=4$
> Tree 1 (pairs): $(1,2)$, $(2,3)$, $(3,4)$
> Tree 2 (conditioned on one): $(1,3|2)$, $(2,4|3)$
> Tree 3 (conditioned on two): $(1,4|2,3)$
>
> Total: $4 \times 3 / 2 = 6$ pair copulas. The joint density is:
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{13|2} c_{24|3} \cdot c_{1,4|2,3}$$
> where each $c$ is evaluated at the appropriate conditional CDFs computed by the recursion in [[Vine Copulas - Overview#Computing Conditional Distributions]].
^ex-dvine4

**Natural use case:** D-vines are natural for **time series** and **Markov models** where variables have a temporal or spatial ordering. In a $d$-lag model, tree-1 pair copulas capture lag-1 dependences, tree-2 captures lag-2 (residual after conditioning on the lag-1 pair), and so on.

### The C-vine (Canonical Vine)

> [!definition] C-vine structure
> A **C-vine** (canonical vine) is a regular vine in which every tree $T_j$ is a **star** — one central node (the "root") is connected to all other nodes in that tree. In tree $T_1$, one variable $X_r$ serves as root and is linked to all $d-1$ others. In tree $T_2$, the edge $(r, \cdot)$ in $T_1$ becomes the root node of $T_2$, and so on.
^def-cvine

**C-vine density formula.** Letting $X_1$ be the root of tree 1, $X_2$ be the root of tree 2 (i.e., the edge $(1,2)$ in tree 1), etc.:

$$f(x_1, \dots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j, j+i \mid 1, \dots, j-1}\!\bigl(F(x_j \mid x_1, \dots, x_{j-1}),\, F(x_{j+i} \mid x_1, \dots, x_{j-1})\bigr)$$

Tree 1 ($j=1$): $d-1$ unconditional pair copulas with $X_1$ as central variable: $c_{12}$, $c_{13}$, $\dots$, $c_{1d}$.  
Tree 2 ($j=2$): $d-2$ pair copulas conditioned on $X_1$: $c_{23|1}$, $c_{24|1}$, $\dots$

> [!example] C-vine for $d=4$
> Tree 1 (root = $X_1$): $(1,2)$, $(1,3)$, $(1,4)$
> Tree 2 (root = edge $(1,2)$, conditioning on $x_1$): $(2,3|1)$, $(2,4|1)$
> Tree 3 (root = edge $(2,3|1)$, conditioning on $x_1, x_2$): $(3,4|1,2)$
>
> Total: 6 pair copulas. The joint density is:
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} c_{13} c_{14} \cdot c_{23|1} c_{24|1} \cdot c_{3,4|1,2}$$
^ex-cvine4

**Natural use case:** C-vines are natural when **one variable drives most of the pairwise dependences** — for example, a market factor influencing all individual asset returns, or a clinical baseline variable affecting all outcomes. The root variable in tree 1 is typically chosen as the variable most correlated (by Kendall's $\tau$) with all others.

### C-vine vs D-vine vs R-vine

| Feature | C-vine | D-vine | R-vine |
|---|---|---|---|
| Tree structure | All trees are stars | All trees are paths | Arbitrary (includes both) |
| Best for | One dominant variable | Ordered sequence | General case |
| Parameters | $\binom{d}{2}$ pair copulas | $\binom{d}{2}$ pair copulas | $\binom{d}{2}$ pair copulas |
| Structure selection | Choose root variable ordering | Choose variable ordering | Optimal tree search (greedy or exhaustive) |
| Density computation | $O(d^2)$ | $O(d^2)$ | $O(d^2)$ (same) |
| Interpretability | High — root variable story | High — lag/spatial story | Lower — data-driven trees |
| Software | `VineCopula` (R), `pyvinecopulib` (Python) | Same | Same |

> [!theorem] Vine density is always valid
> For any choice of regular vine structure and any choice of bivariate copula families for the pair copulas, the resulting density $f(x_1, \dots, x_d)$ integrates to 1 over $\mathbb{R}^d$ — it is a valid joint density. This follows because each tree's pair copulas are valid bivariate copulas and the recursive conditional CDF construction (h-functions) preserves the uniform margins property.
^thm-valid

### Truncated Vines

In practice, only the first $K < d-1$ trees need to be specified. For trees $T_{K+1}, \dots, T_{d-1}$, the pair copulas are set to independence (the product copula). This **truncated vine** (Brechmann et al. 2012) has $K(d-1) - K(K-1)/2$ pair copulas instead of $\binom{d}{2}$, making it feasible for large $d$.

## Examples

> [!example] Which vine for equity returns?
> For a portfolio of 5 equities $(X_1, \dots, X_5)$, a natural approach: fit a C-vine with the market index or most-correlated stock as $X_1$ (the root). Tree 1 captures each stock's dependence with the market leader. Tree 2 captures residual pairwise dependences after removing that common driver. Compare to a factor copula ([[Factor Copulas - Overview]]): the factor copula also captures market-factor dependence but forces the same family across all pairs. The C-vine can use a Student-$t$ copula for pairs with high tail dependence and a Gaussian for others.

## Connections

- [[Vine Copulas - Overview]] — the general pair-copula construction and the regular vine definition.
- [[Vine Copula Estimation]] — how to fit C-vine, D-vine, and R-vine models to data.
- [[Copula Architecture Comparison]] — C/D-vine vs factor copula vs Archimedean vs parametric.
- [[Factor Copulas - Overview]] — the alternative for very high dimensions.
- [[Tail Dependence in Factor Copulas]] — contrast: vine copulas allow different tail-dependence levels per pair.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ are used for both variable ordering (structure selection) and pair-copula estimation.

## See Also

- [[../_Index|Dependence Modeling]]
