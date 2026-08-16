---
title: Pair Copula Constructions and Vine Structure
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Survey-Aas2009-BedfordCooke-Czado]]"
source_location: "Aas et al. (2009), §2–3; Bedford & Cooke (2002), §3–4"
date_ingested: 2026-08-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - h-function
  - vine density decomposition
  - pair copula
  - conditional copula vine
---

# Pair Copula Constructions and Vine Structure

> [!summary]
> This note derives the density factorisation underlying vine (pair-copula) constructions and introduces the computational infrastructure — the **h-function** — that makes these factorizations numerically tractable. It covers the vine tree structure formally for the C-vine and D-vine, with full density formulas for $d = 3$ and $d = 4$, and explains how conditional CDFs propagate through the vine.

## Overview

The pair-copula construction rests on a simple identity: any bivariate density $f(x_1, x_2)$ factors as $f_{1\mid 2}(x_1\mid x_2) \cdot f_2(x_2)$. Repeated application to multivariate densities yields a cascade of bivariate quantities. The **vine** is the graphical bookkeeping device that keeps track of which pairs are being decomposed at each stage and what conditioning sets are implied.

## Main Content

### The h-function

> [!definition] h-function (conditional CDF from a bivariate copula)
> For a bivariate copula $C(u, v; \boldsymbol{\theta})$ with density $c$, the **h-function** is:
>
> $$h(u, v; \boldsymbol{\theta}) \equiv C_{U\mid V}(u\mid v; \boldsymbol{\theta}) = \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial v}$$
>
> This gives the conditional CDF of $U$ given $V = v$, which is itself uniform on $[0,1]$ (by the probability integral transform). The h-function is the key primitive for propagating conditional distributions through the vine tree sequence. Its inverse $h^{-1}(u,v;\boldsymbol{\theta})$ — solving $h(\cdot, v;\boldsymbol{\theta}) = u$ for the first argument — is used for simulation.
>
> **Closed-form examples:**
>
> | Copula | $h(u,v;\theta)$ |
> |--------|----------------|
> | Normal($\rho$) | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton($\kappa$) | $v^{-\kappa-1}(u^{-\kappa}+v^{-\kappa}-1)^{-1/\kappa-1}$ |
> | Gumbel($\delta$) | $C(u,v)\cdot\frac{1}{v}\cdot\frac{(-\ln v)^{\delta-1}}{(-\ln u)^{\delta} + (-\ln v)^{\delta}}^{(\delta-1)/\delta}$ |
> | Frank($\alpha$) | $\dfrac{e^{-\alpha v}(e^{-\alpha u}-1)}{(e^{-\alpha u}-1)(e^{-\alpha v}-1) + (e^{-\alpha}-1)}$ |
>
> The h-function for the Normal copula reduces to evaluating a standard normal CDF at a linear combination of the probit-transformed arguments.
^def-hfunction

### Conditional distributions via the h-function

Given a vine structure, the **conditional CDF** $C_{j\mid \mathcal{D}}(u_j \mid \mathbf{u}_\mathcal{D})$ needed as the argument to pair copulas in higher trees is computed recursively:

$$C_{j\mid\{k\}\cup\mathcal{D}}(u_j \mid u_k, \mathbf{u}_\mathcal{D}) = h\!\left(C_{j\mid\mathcal{D}}(u_j\mid\mathbf{u}_\mathcal{D}),\; C_{k\mid\mathcal{D}}(u_k\mid\mathbf{u}_\mathcal{D});\; \boldsymbol{\theta}_{jk\mid\mathcal{D}}\right)$$

This recursion peels off conditioning variables one at a time, each step applying one h-function. For a vine with $d$ variables, the conditional CDFs in tree $T_k$ involve $k$ nested h-function evaluations.

### C-vine density formulas

> [!definition] C-vine density (Aas et al. 2009, Eq. 4)
> For $d$ variables with root ordering $1, 2, \ldots, d-1$, the **C-vine density** is:
>
> $$c_{1\ldots d}(u_1, \ldots, u_d) = \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i\mid 1,\ldots,j-1}\!\left(C_{j\mid 1,\ldots,j-1}(u_j), C_{i\mid 1,\ldots,j-1}(u_i)\right)$$
>
> - Tree 1 ($j=1$): $d-1$ unconditional pair copulas: $c_{1,2}, c_{1,3}, \ldots, c_{1,d}$
> - Tree 2 ($j=2$): $d-2$ pair copulas conditioned on variable 1: $c_{2,3\mid 1}, c_{2,4\mid 1}, \ldots, c_{2,d\mid 1}$
> - Tree $k$ ($j=k$): $d-k$ pair copulas conditioned on variables $\{1,\ldots,k-1\}$
>
> The **conditional CDFs** are computed recursively:
> $$C_{j\mid 1,\ldots,j-1}(u_j) = h(C_{j\mid 1,\ldots,j-2}(u_j),\; C_{j-1\mid 1,\ldots,j-2}(u_{j-1});\; \boldsymbol{\theta}_{j-1,j\mid 1,\ldots,j-2})$$
> with base case $C_{j\mid\emptyset}(u_j) = u_j$.
^def-cvine-density

> [!example] C-vine, $d=4$, explicit expansion
> With root ordering $1, 2, 3$ and shorthand $h_{ab} = h(u_a, u_b; \boldsymbol{\theta}_{ab})$:
>
> **Tree 1:** $c_{12}(u_1, u_2) \cdot c_{13}(u_1, u_3) \cdot c_{14}(u_1, u_4)$
>
> **Tree 2 arguments:** $v_{2\mid 1} = h(u_2, u_1;\boldsymbol{\theta}_{12})$, $\quad v_{3\mid 1} = h(u_3, u_1;\boldsymbol{\theta}_{13})$, $\quad v_{4\mid 1} = h(u_4, u_1;\boldsymbol{\theta}_{14})$
>
> **Tree 2:** $c_{23\mid 1}(v_{2\mid 1}, v_{3\mid 1}) \cdot c_{24\mid 1}(v_{2\mid 1}, v_{4\mid 1})$
>
> **Tree 3 arguments:** $v_{3\mid 12} = h(v_{3\mid 1}, v_{2\mid 1};\boldsymbol{\theta}_{23\mid 1})$, $\quad v_{4\mid 12} = h(v_{4\mid 1}, v_{2\mid 1};\boldsymbol{\theta}_{24\mid 1})$
>
> **Tree 3:** $c_{34\mid 12}(v_{3\mid 12}, v_{4\mid 12})$
>
> Full density = product of all 6 terms.

### D-vine density formulas

> [!definition] D-vine density (Aas et al. 2009, Eq. 6)
> For $d$ variables with path ordering $1, 2, \ldots, d$, the **D-vine density** is:
>
> $$c_{1\ldots d}(u_1, \ldots, u_d) = \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j\mid i+1,\ldots,i+j-1}\!\left(C_{i\mid i+1,\ldots,i+j-1}(u_i),\; C_{i+j\mid i+1,\ldots,i+j-1}(u_{i+j})\right)$$
>
> - Tree 1 ($j=1$): $d-1$ adjacent pairs: $c_{12}, c_{23}, \ldots, c_{d-1,d}$
> - Tree 2 ($j=2$): $d-2$ spanning-one pairs: $c_{13\mid 2}, c_{24\mid 3}, \ldots$
> - Tree $j$: pairs spanning $j$ positions in the path ordering
>
> The recursive structure follows the same h-function pattern; the conditioning set $\{i+1,\ldots,i+j-1\}$ grows one variable at a time moving outward from the center of each span.
^def-dvine-density

> [!example] D-vine, $d=4$, explicit expansion
> Path ordering $1{-}2{-}3{-}4$:
>
> **Tree 1:** $c_{12}(u_1,u_2) \cdot c_{23}(u_2,u_3) \cdot c_{34}(u_3,u_4)$
>
> **Tree 2 arguments:** $v_{1\mid 2} = h(u_1,u_2;\boldsymbol{\theta}_{12})$, $\quad v_{3\mid 2} = h(u_3,u_2;\boldsymbol{\theta}_{23})$, $\quad v_{2\mid 3} = h(u_2,u_3;\boldsymbol{\theta}_{23})$, $\quad v_{4\mid 3} = h(u_4,u_3;\boldsymbol{\theta}_{34})$
>
> **Tree 2:** $c_{13\mid 2}(v_{1\mid 2}, v_{3\mid 2}) \cdot c_{24\mid 3}(v_{2\mid 3}, v_{4\mid 3})$
>
> **Tree 3 argument:** $v_{1\mid 23} = h(v_{1\mid 2}, v_{3\mid 2};\boldsymbol{\theta}_{13\mid 2})$, $\quad v_{4\mid 23} = h(v_{4\mid 3}, v_{2\mid 3};\boldsymbol{\theta}_{24\mid 3})$
>
> **Tree 3:** $c_{14\mid 23}(v_{1\mid 23}, v_{4\mid 23})$
>
> Full density = product of all 6 terms.

### Regular vine (R-vine) generality

For a general R-vine, the proximity condition (each edge in $T_k$ shares a node in $T_{k-1}$) ensures the conditioning sets nest properly. The C-vine and D-vine are special cases; a general R-vine allows any tree structure satisfying the proximity condition, giving $\frac{d!}{2}$ possible vine structures for $d$ variables. For $d = 5$ this is 60 structures; for $d = 10$ it is over $10^5$.

The **vine matrix** (also called the R-vine matrix or $M$ matrix) is a compact $d\times d$ upper-triangular representation of the vine structure used in software. The entry $M[k,j]$ for $k \leq j$ encodes which variable forms a pair with variable $j$ in tree $T_k$.

## Connections

- [[Vine Copulas - Overview]] — the motivation, the simplifying assumption, and C/D/R-vine definitions.
- [[Vine Copula Estimation and Model Selection]] — the h-function is the computational primitive for both evaluation of the log-likelihood and propagation of pseudo-observations in sequential estimation.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ for each bivariate copula used in structure selection.
- [[Tail Dependence in Factor Copulas]] — tail dependence for vine copulas can be computed from the tail dependence coefficients of each first-tree pair copula; unlike factor copulas, no EVT theory is needed.
- [[Copula Architecture Comparison]] — the h-function recursion and parameter count are key inputs to the scalability comparison.

## See Also

- [[raw/Vine-Copulas-Survey-Aas2009-BedfordCooke-Czado]] — source survey.
- [[../_Index|Econometrics]]
