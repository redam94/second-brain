---
title: C-Vine and D-Vine
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Source-Extract.md]]"
source_location: "Aas et al. (2009), Secs. 4.1-4.2, pp. 5-7; Bedford & Cooke (2002), Ex. 4.2"
date_ingested: 2026-09-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Structure]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine density
  - D-vine density
  - h-function copula
---

# C-Vine and D-Vine

> [!summary]
> The **canonical vine** (C-vine) and **drawable vine** (D-vine) are the two simplest regular vine
> sub-classes (Aas et al. 2009). In a C-vine, each tree is a **star** — one root node dominates all
> pairings, ideal when one variable drives most dependence. In a D-vine, each tree is a **path** —
> variables pair with their neighbours sequentially, natural for time series or ordered variables.
> Both have explicit density formulas and a recursive **h-function** algorithm for computing
> conditional CDFs, enabling tractable sequential maximum likelihood estimation.

## Overview

Aas et al. (2009) introduced the C-vine and D-vine as the first practically computable vine
copula sub-classes, providing explicit density formulas and a sequential estimation algorithm.
The key computational primitive is the **h-function**, which converts a fitted bivariate copula
into the conditional CDF needed to form arguments for higher-tree pair-copulas.

## Main Content

### D-Vine (Drawable Vine)

> [!definition] D-vine structure
> In a D-vine on $d$ variables (labelled $1, \ldots, d$), every tree $T_j$ is a **path**. Tree $T_1$
> has edges $\{1,2\}, \{2,3\}, \ldots, \{d-1,d\}$. In subsequent trees, nodes correspond to
> overlapping sequences of variables, and the path structure is preserved: no node in $T_j$ has
> degree greater than 2. The conditioning sets grow outward: in tree $T_j$, a pair $\{i, i+j\}$ is
> conditioned on the "interior" variables $\{i+1, \ldots, i+j-1\}$.
^def-dvine

> [!definition] D-vine density (Aas et al. 2009, Eq. 3)
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$
>
> Here $j$ indexes the tree (distance between paired variables) and $i$ indexes the edge within that
> tree. The pair-copula $c_{i,i+j|i+1,\ldots,i+j-1}$ links variable $i$ and variable $i+j$,
> conditioning on the $j-1$ "interior" variables.
>
> **Parameter count:** $d(d-1)/2$ bivariate copulas.
^def-dvine-density

> [!example] D-vine on $d=4$: full density
> **Variables:** $X_1, X_2, X_3, X_4$ with marginals $F_1, F_2, F_3, F_4$.
>
> **Tree $T_1$:** pairs $(1,2)$, $(2,3)$, $(3,4)$ — 3 unconditional pair-copulas.
> **Tree $T_2$:** pairs $(1,3|2)$, $(2,4|3)$ — 2 pair-copulas conditioning on one variable.
> **Tree $T_3$:** pair $(1,4|2,3)$ — 1 pair-copula conditioning on two variables.
>
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1,F_2) \cdot c_{23}(F_2,F_3) \cdot c_{34}(F_3,F_4)$$
> $$\cdot\; c_{13|2}(F(x_1|x_2), F(x_3|x_2)) \cdot c_{24|3}(F(x_2|x_3), F(x_4|x_3))$$
> $$\cdot\; c_{14|23}(F(x_1|x_2,x_3), F(x_4|x_2,x_3))$$
>
> **Use case:** Natural for ordered panels (time lags) or spatial data along a transect.

### C-Vine (Canonical Vine)

> [!definition] C-vine structure
> In a C-vine on $d$ variables, every tree $T_j$ is a **star**: node $j$ is the root and is
> directly connected to all other $d-j$ nodes. The ordering of variables determines which is the
> root at each level. Tree $T_1$ stars around variable 1 (edges $\{1,2\}, \{1,3\}, \ldots, \{1,d\}$);
> tree $T_2$ stars around variable 2 within the set of conditioning-on-1 nodes; and so on.
^def-cvine

> [!definition] C-vine density (Aas et al. 2009, Eq. 4)
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,j+i|1,\ldots,j-1}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\, F(x_{j+i}|x_1,\ldots,x_{j-1})\right)$$
>
> Here $j$ is the tree level and the root at level $j$ is variable $j$, paired with each of
> $j+1, j+2, \ldots, d$ — all conditioned on $\{1, \ldots, j-1\}$.
>
> **Parameter count:** $d(d-1)/2$ bivariate copulas (same as D-vine).
^def-cvine-density

> [!example] C-vine on $d=4$: structure and comparison
> **Tree $T_1$:** node 1 is root → edges $\{1,2\}, \{1,3\}, \{1,4\}$ (3 unconditional pairs).
> **Tree $T_2$:** node 2 is root (given 1) → edges $\{2,3|1\}$, $\{2,4|1\}$ (2 pairs, cond. on $X_1$).
> **Tree $T_3$:** node 3 is root (given 1,2) → edge $\{3,4|1,2\}$ (1 pair, cond. on $X_1,X_2$).
>
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1,F_2) \cdot c_{13}(F_1,F_3) \cdot c_{14}(F_1,F_4)$$
> $$\cdot\; c_{23|1} \cdot c_{24|1} \cdot c_{34|12}$$
>
> **Use case:** Natural when one "key" variable (e.g., a market index, a common factor) drives
> most pairwise dependence. The root at each level captures the dominant driver after conditioning.

### The H-Function

> [!definition] H-function (conditional CDF)
> The **h-function** converts a bivariate copula into the conditional CDF of one variable given
> the other (Aas et al. 2009, Eq. 9):
> $$h(x \,|\, v;\, \boldsymbol{\theta}) = F(X \leq x \,|\, V = v) = \frac{\partial C(F(x), F(v);\, \boldsymbol{\theta})}{\partial F(v)}$$
>
> **Closed forms for common families:**
>
> | Family | $h(x|v;\boldsymbol{\theta})$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu+1}\!\left(\sqrt{\dfrac{\nu+1}{\nu+(\Phi_t^{-1}(v))^2}}\cdot\dfrac{\Phi_t^{-1}(x)-\rho\,\Phi_t^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton($\theta$) | $v^{-\theta-1}(x^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C(x,v)\,(-\log v)^{\theta-1}[(-\log x)^\theta + (-\log v)^\theta]^{1/\theta-1}/v$ |
> | Frank($\theta$) | $\dfrac{\exp(-\theta x)(1-e^{-\theta})}{(e^{-\theta x}-1)(e^{-\theta v}-1)+(e^{-\theta}-1)}$ |
^def-hfunction

> [!theorem] H-function recursion for sequential computation
> To evaluate $F(x_i|\mathbf{x}_D)$ for a conditioning set $|D| = m$, apply h-functions recursively:
> $$F(x_i \,|\, x_{j_1}, \ldots, x_{j_m}) = h(F(x_i\,|\,x_{j_1},\ldots,x_{j_{m-1}}) \;|\; F(x_{j_m}\,|\,x_{j_1},\ldots,x_{j_{m-1}});\; c_{i,j_m|j_1,\ldots,j_{m-1}})$$
> Each recursive call uses the h-function of the pair-copula at the corresponding tree level.
> **Complexity:** computing one conditional CDF of depth $m$ requires $O(m)$ h-function evaluations.
^thm-hrecursion

## Connections

- [[Regular Vine Structure]] — the general R-vine of which C-vine and D-vine are special cases.
- [[Vine Copula Estimation and Selection]] — sequential ML uses h-functions to form pseudo-observations at each tree level; full ML exploits the density formulas above.
- [[Vine Copulas - Overview]] — the PCC idea underlying both vine types.
- [[Copula Architecture Comparison]] — how to choose between C-vine, D-vine, R-vine, and factor copula.
- [[Factor Copula Construction]] — contrast: factor copulas get tail dependence from the factor distribution; vine copulas get it from pair-copula family choice (e.g., rotated Clayton for lower-tail, Gumbel for upper-tail).

## See Also

- [[Tail Dependence in Factor Copulas]] — EVT-based tail dependence in factor copulas; vine copulas achieve asymmetric tail dependence by choosing different pair-copula families in each tree.
- [[../_Index|Econometrics]]
