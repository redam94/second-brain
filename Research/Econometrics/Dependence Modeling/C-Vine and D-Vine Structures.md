---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-2009-Vine-Copula-Survey.md]]"
source_location: "Survey §2 (Aas et al. 2009, Secs. 2-3, pp. 184-188)"
date_ingested: 2026-07-13
date_updated: 2026-07-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - h-function
  - pair copula construction density
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most widely used regular vine structures (Aas et al. 2009). A C-vine has a **star** at each tree level — one root variable connects to all others, so the ordering of root variables encodes which variable most strongly drives dependence with the rest. A D-vine has a **path** at each level — variables are arranged in a line, so conditioning sets grow from the interior of the path. Conditional CDFs needed to evaluate either density are computed recursively via the **h-function**.

## Overview

The general vine density requires specifying a tree sequence and evaluating conditional CDFs. The C-vine and D-vine simplify the tree structure to two extremes: star (C-vine) and path (D-vine). Both are regular vines with $n(n-1)/2$ bivariate copulas for $n$ variables, but differ in which pairs appear in each tree and in which conditioning sets arise.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-Vine Structure
> In a C-vine, tree $T_k$ is a **star**: one node (the root) connects to all $n-k$ others. The root of $T_k$ is variable $k$ (given the ordering $1, 2, \ldots, n$). The edges of $T_k$ correspond to the pairs:
>
> $$\text{Edges of } T_k = \{(k, j \mid \{1, \ldots, k-1\}) : j = k+1, \ldots, n\}$$
>
> For $n = 4$ with ordering $(1,2,3,4)$:
> - $T_1$ (star at node 1): edges $(1,2)$, $(1,3)$, $(1,4)$
> - $T_2$ (star at node 2): edges $(2,3|1)$, $(2,4|1)$
> - $T_3$ (star at node 3): edge $(3,4|1,2)$
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12} c_{13} c_{14} \cdot c_{23|1} c_{24|1} \cdot c_{34|12}$$
>
> where the pair copulas are evaluated at the appropriate conditional CDFs.
^def-cvine

> [!definition] C-Vine General Formula ($n$ Variables)
> $$f(x_1,\ldots,x_n) = \prod_{i=1}^n f_i(x_i) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{j,i+j|\{1,\ldots,j-1\}}\!\Big(F(x_j|\mathbf{x}_{\{1,\ldots,j-1\}}),\; F(x_{i+j}|\mathbf{x}_{\{1,\ldots,j-1\}})\Big)$$
>
> **Interpretation:** Variable 1 is the most "central" — it appears in all $n-1$ unconditional pairs. Variable 2 appears in $n-2$ pairs conditional on variable 1. And so on. If variable 1 has the strongest pairwise dependence with all others (highest $|\tau|$ with all other variables), a C-vine with variable 1 as root captures this efficiently.
^def-cvine-general

### D-Vine (Drawable Vine)

> [!definition] D-Vine Structure
> In a D-vine, tree $T_k$ is a **path**: variables $1, 2, \ldots, n$ are arranged in a line, and $T_k$ contains all pairs at distance $k$ in the path. The edges of $T_k$ are:
>
> $$\text{Edges of } T_k = \{(i, i+k \mid \{i+1, \ldots, i+k-1\}) : i = 1, \ldots, n-k\}$$
>
> For $n = 4$ with ordering $(1,2,3,4)$:
> - $T_1$ (path): edges $(1,2)$, $(2,3)$, $(3,4)$
> - $T_2$: edges $(1,3|2)$, $(2,4|3)$
> - $T_3$: edge $(1,4|2,3)$
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{13|2} c_{24|3} \cdot c_{14|23}$$
^def-dvine

> [!definition] D-Vine General Formula ($n$ Variables)
> $$f(x_1,\ldots,x_n) = \prod_{i=1}^n f_i(x_i) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{i,i+j|\{i+1,\ldots,i+j-1\}}\!\Big(F(x_i|\mathbf{x}_{\{i+1,\ldots,i+j-1\}}),\; F(x_{i+j}|\mathbf{x}_{\{i+1,\ldots,i+j-1\}})\Big)$$
>
> **Interpretation:** Adjacent pairs $(i,i+1)$ are modelled unconditionally (Tree 1). Each subsequent tree adds one variable to the conditioning set from the interior of the path. The D-vine is natural when variables have a sequential ordering (e.g., time, frequency, maturity) and "close" variables are more strongly dependent than "distant" ones.
^def-dvine-general

### C-Vine vs D-Vine: When to Use Which

| Feature | C-Vine | D-Vine |
|---------|--------|--------|
| Tree structure | Star (one root per tree) | Path (variables in a line) |
| Root variable | Placed at center of star; models all pairs with it | Variable ordering determines the "path" |
| Conditioning sets | Sets of root variables $\{1,\ldots,k-1\}$ | Interior path segments $\{i+1,\ldots,i+j-1\}$ |
| Best use case | One variable dominates all pairwise dependence (hub structure; e.g., a market index vs many assets) | Sequential/ordered data (time series, yield curves, spatial transects); pairs near each other in the ordering are more dependent |
| D-vine regression | — | Kraus & Czado (2017): use D-vine as a flexible regression model for $Y$ given $X_1, \ldots, X_d$ |

### The h-Function (Conditional CDF Recursion)

> [!definition] h-Function
> The **h-function** for a bivariate copula $C_{UV}(u,v;\theta)$ is the partial derivative with respect to $v$:
>
> $$h(u | v, \theta) \coloneqq F(U|V=v) = \frac{\partial C_{UV}(u,v;\theta)}{\partial v}$$
>
> This gives the conditional CDF of $U$ given $V = v$. Its inverse $h^{-1}(p|v,\theta)$ (with respect to $u$) is needed for simulation.
^def-h-function

> [!example] h-Functions for Common Copulas
> **Gaussian copula** (parameter $\rho \in (-1,1)$): $$h(u|v,\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$$
>
> **Clayton copula** (parameter $\theta > 0$): $$h(u|v,\theta) = v^{-\theta-1}\!\left(u^{-\theta}+v^{-\theta}-1\right)^{-1/\theta - 1}$$
>
> **Student-$t$ copula** (parameters $\rho, \nu$): $$h(u|v,\rho,\nu) = t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(\nu+(t_\nu^{-1}(v))^2)(1-\rho^2)}{\nu+1}}}\right)$$
>
> where $t_\nu^{-1}$ is the Student-$t$ quantile function with $\nu$ degrees of freedom.
^example-h-functions

> [!definition] Conditional CDF Recursion (Vine Evaluation)
> To evaluate the vine density, one needs $F(x_j|\mathbf{x}_{D(e)})$ for each pair. This is computed recursively using the vine tree structure:
>
> 1. **Base case:** $F(x_i) = F_i(x_i) \eqqcolon u_i$ from the estimated univariate marginal.
>
> 2. **Recursive step:** For a conditioning set $D = \{v_1, \ldots, v_k\}$, denote $D_{-1} = D \setminus \{v_1\}$:
>    $$F(x | \mathbf{x}_D) = h\!\Big(F(x|\mathbf{x}_{D_{-1}})\;\Big|\; F(v_1|\mathbf{x}_{D_{-1}}),\; \theta_{x,v_1|D_{-1}}\Big)$$
>
> This recursion peels one conditioning variable at a time, working back through the vine tree sequence. For a $d$-variable vine, at most $d-1$ h-function calls are needed to compute any single conditional CDF.
^def-cdf-recursion

## Examples

> [!example] Evaluating a 3-Variable C-Vine Density
> **Structure (ordering 1, 2, 3):**
> - $T_1$: pairs $(1,2)$, $(1,3)$
> - $T_2$: pair $(2,3|1)$
>
> **Density:** $f(x_1,x_2,x_3) = f_1 f_2 f_3 \cdot c_{12}(u_1,u_2) \cdot c_{13}(u_1,u_3) \cdot c_{23|1}(h_{21},h_{31})$
>
> where $u_i = F_i(x_i)$ and:
> - $h_{21} = h(u_2|u_1, \theta_{12})$ — conditional CDF of $X_2$ given $X_1 = x_1$
> - $h_{31} = h(u_3|u_1, \theta_{13})$ — conditional CDF of $X_3$ given $X_1 = x_1$
>
> **Interpretation:** Once we condition on variable 1, the residual pair $(X_2, X_3)$ is modelled by its own bivariate copula $c_{23|1}$.

## Connections

- [[Vine Copulas - Overview]] — the vine density factorization theorem and the general vine graphical model.
- [[Vine Copula Estimation and Selection]] — how to fit these models: sequential MLE proceeds tree by tree, using h-functions to compute Tree $k+1$ pseudo-observations from Tree $k$ fits.
- [[Copula Architecture Comparison]] — C-vine and D-vine vs factor copulas.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the criterion for choosing the root variable order in a C-vine (place the variable with highest average $|\tau|$ with all others as root $j=1$) and for structure selection in R-vines.
- [[Factor Copula Construction]] — contrast: the factor copula uses a latent factor model generating a copula with *no tree structure*; vines impose a tree structure but allow arbitrary bivariate copulas at each node.

## See Also

- [[../_Index|Econometrics]]
