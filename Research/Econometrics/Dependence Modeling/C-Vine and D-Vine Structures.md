---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Sources.md]]"
source_location: "Aas et al. (2009), Secs. 3.1–3.2; Brechmann & Schepsmeier (2013), Sec. 2"
date_ingested: 2026-11-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair-Copula Construction]]"
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - vine structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most tractable subclasses of regular vines. In a C-vine, each tree has a single root node connected to all others (star topology), so one variable conditions all pairwise copulas at each level. In a D-vine, every node has degree at most 2 (path topology), giving a chain-like sequential conditioning structure. For $d$ variables, both use exactly $d(d-1)/2$ bivariate copulas and produce explicit density formulas. The choice between them reflects domain knowledge about which variable (C-vine) or which lag structure (D-vine) dominates the dependence.

## Overview

Both structures are defined by a specific constraint on how the vine trees are drawn. These constraints make the density formula — and especially the recursive h-function computation — explicit and efficient. All structure selection reduces to ordering the variables: for C-vines, pick the root variable for each tree; for D-vines, pick the linear order.

For $d > 4$, the general R-vine class is strictly richer than C-vine and D-vine, allowing different topologies in different trees. See [[Vine Copulas - Overview]] for the R-vine definition and structure-selection methods (Dißmann algorithm).

## Main Content

> [!definition] C-vine (canonical vine)
> In a C-vine on $d$ variables, **each tree $T_\ell$ has a single root node** $j_\ell$ connected to all $d - \ell$ other nodes in that tree (star topology). The root node of tree $\ell$ must be one of the edges adjacent to the root of tree $\ell - 1$ (proximity condition). With roots $j_1 = 1, j_2 = 2, \ldots, j_{d-1} = d-1$ (a common choice), the C-vine density is:
>
> $$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|1,\ldots,j-1}\!\bigl(F(x_j|x_1,\ldots,x_{j-1}),\, F(x_i|x_1,\ldots,x_{j-1})\bigr)$$
>
> **Interpretation:** Variable 1 (root of $T_1$) is paired with all others unconditionally. Variable 2 (root of $T_2$) conditions all subsequent pairs. Each root variable "explains" the remaining dependence before the next tree.
^def-cvine

> [!definition] D-vine (drawable vine)
> In a D-vine on $d$ variables, **every node in every tree has degree at most 2** (path/chain topology). With variable ordering $1, 2, \ldots, d$, the D-vine density is:
>
> $$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)$$
>
> **Interpretation:** Tree 1 pairs consecutive variables: $(1,2), (2,3), \ldots, (d-1,d)$. Tree 2 pairs variables two steps apart conditioned on the intermediate: $(1,3|2), (2,4|3), \ldots$. This "sliding window" structure is natural when the variables have a natural ordering (time series lags, spatial proximity).
^def-dvine

> [!definition] Parameter counts and tree structure
>
> | Vine type | Tree $\ell$ structure | Edges in $T_\ell$ | Total bivariate copulas |
> |-----------|----------------------|-------------------|------------------------|
> | C-vine | Star (root = $j_\ell$) | $d - \ell$ | $d(d-1)/2$ |
> | D-vine | Path | $d - \ell$ | $d(d-1)/2$ |
> | R-vine | Any valid tree | $d - \ell$ | $d(d-1)/2$ |
>
> Both C-vine and D-vine (and all R-vines) use **exactly** $d(d-1)/2$ bivariate copulas, one per edge. For $d = 5$: 10 copulas. For $d = 10$: 45 copulas. This is the parametric cost of full vine flexibility compared with a factor copula's 2–10 parameters.
^def-param-counts

> [!example] $d=4$ C-vine (variable 1 as root)
>
> ```
> Tree 1:   1 — 2,  1 — 3,  1 — 4       (3 unconditional copulas: c_{12}, c_{13}, c_{14})
> Tree 2:  (1,2)—(1,3), (1,2)—(1,4)    (2 copulas: c_{23|1}, c_{24|1})
> Tree 3:  (1,2,3)—(1,2,4)             (1 copula: c_{34|12})
> ```
>
> Density:
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(u_1,u_2) \cdot c_{13}(u_1,u_3) \cdot c_{14}(u_1,u_4) \cdot c_{23|1}(h_{21},h_{31}) \cdot c_{24|1}(h_{21},h_{41}) \cdot c_{34|12}(h_{3|21},h_{4|21})$$
>
> where $h_{ij} = h(u_i|u_j;\boldsymbol{\theta}_{ij})$ and $h_{3|21} = h(h_{31}|h_{21};\boldsymbol{\theta}_{3,2|1})$.
>
> **Choice guidance:** Use a C-vine with variable 1 as root when variable 1 is known to drive all pairwise dependence (e.g., a market index vs. individual stocks). The root variable conditions away its effect first, leaving residual copulas for the remaining structure.

> [!example] $d=4$ D-vine (order $1\text{–}2\text{–}3\text{–}4$)
>
> ```
> Tree 1:  1—2,  2—3,  3—4             (3 unconditional copulas: c_{12}, c_{23}, c_{34})
> Tree 2:  (1,2)—(2,3), (2,3)—(3,4)   (2 copulas: c_{13|2}, c_{24|3})
> Tree 3:  (1,2,3)—(2,3,4)            (1 copula: c_{14|23})
> ```
>
> Density:
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(u_1,u_2) \cdot c_{23}(u_2,u_3) \cdot c_{34}(u_3,u_4) \cdot c_{13|2}(h_{12},h_{32}) \cdot c_{24|3}(h_{23},h_{43}) \cdot c_{14|23}(h_{1|23},h_{4|23})$$
>
> **Choice guidance:** Use a D-vine with time-ordered variables (e.g., returns at consecutive maturities, or spatially ordered stations) where "proximity" in the ordering corresponds to stronger dependence.

## Connections

The C-vine generalises to multi-variate factor models: if a single common variable drives all pairwise dependence, the C-vine captures this naturally by putting that variable as the root in every tree. The factor copula of [[Factor Copulas - Overview]] achieves a similar factorisation but through a *latent* factor, gaining parsimony at the cost of flexibility per pair.

The D-vine structure is natural for **time-series applications**: a D-vine on $d$ lags of a process models the full temporal dependence structure via bivariate copulas between lags $h$ apart, conditioned on the intermediate lags. This gives nonlinear extensions of ARMA-like lag structures.

## See Also
- [[Vine Copulas - Overview]] — motivation and regular vine definition
- [[Pair-Copula Construction]] — h-function recursion for evaluating the density
- [[Vine Copula Estimation and Model Selection]] — how to choose the structure and pair families
- [[Copula Architecture Comparison]] — C-vine/D-vine vs factor copula vs elliptical copulas
- [[Multi-Factor and Block Dependence Structures]] — factor copula's approach to heterogeneous dependence
