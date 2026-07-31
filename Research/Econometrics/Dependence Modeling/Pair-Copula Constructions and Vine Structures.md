---
title: Pair-Copula Constructions and Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Synthesis-Survey.md]]"
source_location: "Bedford & Cooke (2002) Secs. 2-4; Aas et al. (2009) Secs. 2-3"
date_ingested: 2026-07-31
date_updated: 2026-07-31
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Architecture Comparison]]"
aliases:
  - C-vine density
  - D-vine density
  - vine copula density
  - h-function copula
  - pair copula factorization
---

# Pair-Copula Constructions and Vine Structures

> [!summary]
> This note gives the formal density factorizations for C-vines and D-vines with complete
> $d=4$ worked examples, defines the **h-function** that makes recursive evaluation tractable,
> and states Bedford & Cooke's (2002) theorem that every valid R-vine yields a proper density.
> The pair-copula construction expresses a $d$-variate density as a product of $d$ univariate
> marginals and $d(d-1)/2$ bivariate copula densities, each evaluated at conditional CDFs
> computed from lower-level pair copulas.

## Overview

The pair-copula construction (PCC) recursively applies the factorization:
$$f(x_1, x_2) = c_{12}(F_1(x_1), F_2(x_2)) \cdot f_1(x_1) \cdot f_2(x_2)$$
to each conditional distribution, replacing the complicated multivariate dependence structure
with a sequence of bivariate copulas. Each bivariate copula can independently belong to any
bivariate copula family, enabling local control over tail behaviour, symmetry, and dependence
strength at each conditioning level.

## Formal Definitions

> [!definition] Regular Vine (Bedford & Cooke 2002, Def. 4.1)
> A **regular vine** $V$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$
> satisfying:
> 1. **$T_1$**: nodes $N_1 = \{1, \ldots, d\}$; edges $E_1 \subset \binom{N_1}{2}$ with $|E_1| = d-1$ (a spanning tree).
> 2. **$T_k$** ($k \geq 2$): nodes $N_k = E_{k-1}$ (edges of the previous tree); $|E_k| = d-k$.
> 3. **Proximity condition**: edge $\{a, b\} \in E_k$ requires $|a \cap b| = k-1$ (the two
>    node-edges share exactly $k-1$ variables). Equivalently, the corresponding conditioned sets
>    are complements of a single variable in a conditioning set.
>
> The **conditioned set** of an edge $e = \{a, b\} \in E_k$ is $\{a \triangle b\}$ (symmetric
> difference); the **conditioning set** is $D(e) = a \cap b$.
^def-rvine

> [!definition] R-Vine density (Bedford & Cooke 2002, Thm. 4.2)
> For a $d$-variate vector with marginals $F_k$ and an R-vine $V$:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k)
>   \cdot \prod_{k=1}^{d-1} \prod_{e \in E_k}
>     c_{j(e),\ell(e)|D(e)}\!\left(F_{j(e)|D(e)},\, F_{\ell(e)|D(e)};\,\boldsymbol{\theta}_e\right)$$
> where $j(e)$ and $\ell(e)$ are the two conditioned variables of edge $e$ and $D(e)$ is its
> conditioning set. Each $c_{j,\ell|D}$ is a bivariate copula density evaluated at the
> conditional CDFs of $X_j$ and $X_\ell$ given $\mathbf{X}_D = \mathbf{x}_D$ (under the
> simplifying assumption, these are computed using h-functions, not on the actual values
> $\mathbf{x}_D$). There are $d(d-1)/2$ pair copulas in total.
^thm-rvine-density

> [!definition] The h-function (Joe 1997)
> For a bivariate copula $C(u,v;\theta)$, the **h-function** is:
> $$h(u, v; \theta) \equiv \frac{\partial C(u,v;\theta)}{\partial v}$$
> It computes $F_{X|Y}(x|y)$ when $u = F_X(x)$ and $v = F_Y(y)$: the conditional CDF of $X$
> given $Y = y$ under the copula $C$. Closed-form h-functions exist for all standard bivariate
> copula families:
>
> | Family | $h(u,v;\theta)$ |
> |--------|-----------------|
> | Gaussian($\rho$) | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t(\rho,\nu)$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1/\theta - 1} v^{-\theta-1}$ |
> | Gumbel($\theta$) | $C_\text{Gum}(u,v;\theta) \cdot \frac{(-\log v)^{\theta-1}}{v\left[(-\log u)^\theta + (-\log v)^\theta\right]}$ |
> | Frank($\theta$) | $\frac{e^{-\theta v}(e^{-\theta u}-1)}{(e^{-\theta}-1)+(e^{-\theta u}-1)(e^{-\theta v}-1)}$ |
>
> **Usage:** Under the simplifying assumption, $F_{j|D}(x_j | \mathbf{x}_D)$ is approximated
> by iterating h-functions from lower tree levels. This transforms the problem of computing
> conditional CDFs into a sequence of closed-form operations.
^def-hfunction

## D-vine: Worked d=4 Example

A D-vine with variable ordering $1{-}2{-}3{-}4$ has the following tree structure:

```
Tree 1:  1 ——— 2 ——— 3 ——— 4
         c₁₂   c₂₃   c₃₄

Tree 2:  (1,3)|2 ——— (2,4)|3
              c₁₃|₂   c₂₄|₃
           [edge: {1,2}—{2,3}] [edge: {2,3}—{3,4}]

Tree 3:  (1,4)|{2,3}
              c₁₄|₂₃
           [edge: {1,3|2}—{2,4|3}]
```

> [!example] D-vine density (d=4)
> **Setup:** Four variables $X_1, X_2, X_3, X_4$ with marginals $F_1, F_2, F_3, F_4$.
> Variable ordering follows the path $1{-}2{-}3{-}4$.
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = \underbrace{f_1 f_2 f_3 f_4}_{\text{marginals}}
>   \cdot \underbrace{c_{12}(F_1, F_2)\, c_{23}(F_2, F_3)\, c_{34}(F_3, F_4)}_{\text{Tree 1 (3 pair copulas)}}$$
> $$\cdot \underbrace{c_{13|2}(F_{1|2},\, F_{3|2})\, c_{24|3}(F_{2|3},\, F_{4|3})}_{\text{Tree 2 (2 pair copulas)}}
>   \cdot \underbrace{c_{14|23}(F_{1|23},\, F_{4|23})}_{\text{Tree 3 (1 pair copula)}}$$
>
> where, under the simplifying assumption:
> - $F_{1|2} = h(F_1, F_2;\theta_{12})$, $\quad F_{3|2} = h(F_3, F_2;\theta_{23})$
> - $F_{2|3} = h(F_2, F_3;\theta_{23})$, $\quad F_{4|3} = h(F_4, F_3;\theta_{34})$
> - $F_{1|23} = h(F_{1|2},\, F_{2|3};\theta_{13|2})$
> - $F_{4|23} = h(F_{4|3},\, F_{2|3};\theta_{24|3})$
>
> **Total:** $3 + 2 + 1 = 6 = 4 \cdot 3/2$ pair copulas.
^ex-dvine4

**General D-vine density:**
$$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j}
  c_{i,i+j|\{i+1,\ldots,i+j-1\}}(F_{i|\text{cond}},\, F_{i+j|\text{cond}};\,\boldsymbol{\theta}_{i,i+j|\text{cond}})$$

## C-vine: Worked d=4 Example

A C-vine with root node 1 at Tree 1 has the following structure:

```
Tree 1:       2
              |
         4 —— 1 —— 3
          c₁₄  c₁₂  c₁₃   (star centred at node 1)

Tree 2:  (2,3)|1 ——— (2,4)|1
               c₂₃|₁   c₂₄|₁    (root: node 2)
            [edge: {1,2}—{1,3}]  [edge: {1,2}—{1,4}]

Tree 3:  (3,4)|{1,2}
               c₃₄|₁₂
```

> [!example] C-vine density (d=4)
> **Setup:** Root ordering: node 1 is root at Tree 1, node 2 at Tree 2.
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4$$
> $$\cdot \underbrace{c_{12}(F_1, F_2)\, c_{13}(F_1, F_3)\, c_{14}(F_1, F_4)}_{\text{Tree 1: star at node 1}}$$
> $$\cdot \underbrace{c_{23|1}(F_{2|1},\, F_{3|1})\, c_{24|1}(F_{2|1},\, F_{4|1})}_{\text{Tree 2}}$$
> $$\cdot \underbrace{c_{34|12}(F_{3|12},\, F_{4|12})}_{\text{Tree 3}}$$
>
> where:
> - $F_{2|1} = h(F_2, F_1;\theta_{12})$, $\quad F_{3|1} = h(F_3, F_1;\theta_{13})$, $\quad F_{4|1} = h(F_4, F_1;\theta_{14})$
> - $F_{3|12} = h(F_{3|1},\, F_{2|1};\theta_{23|1})$, $\quad F_{4|12} = h(F_{4|1},\, F_{2|1};\theta_{24|1})$
>
> **Interpretation:** When variable 1 drives dependence among all others (e.g., a market index),
> conditioning on 1 at Tree 1 captures most of the dependence. If the residual dependence among
> $X_2, X_3, X_4$ after conditioning on $X_1$ is weak, low-dimensional pair copulas at Trees 2
> and 3 suffice — a truncated C-vine with just 3 pair copulas.
^ex-cvine4

**General C-vine density:**
$$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d}
  c_{j,i|1,\ldots,j-1}(F_{j|1,\ldots,j-1},\, F_{i|1,\ldots,j-1};\,\boldsymbol{\theta}_{j,i|1,\ldots,j-1})$$

where node $j$ is the root of Tree $T_j$.

## Counting Pair Copulas

For a $d$-variate vine, the total number of pair copulas is:
$$\sum_{k=1}^{d-1} (d-k) = \frac{d(d-1)}{2}$$

| $d$ | Pair copulas | Parameters (Gaussian) | Parameters ($t$-copula) |
|-----|-------------|----------------------|------------------------|
| 3 | 3 | 3 | 6 |
| 5 | 10 | 10 | 20 |
| 10 | 45 | 45 | 90 |
| 20 | 190 | 190 | 380 |
| 100 | 4,950 | 4,950 | 9,900 |

For comparison, the Oh & Patton block factor copula for $d=100$ uses 16 parameters. Vine
copulas are feasible only for moderate $d$ unless truncated or sparsified.

## Connections

- [[Vine Copulas - Overview]] — motivation, historical development, and positioning.
- [[Vine Copula Estimation and Architecture Comparison]] — how to fit these pair copulas
  sequentially, select vine structure, choose bivariate families, and compare with factor copulas.
- [[Factor Copula Construction]] — the alternative $\mathbf{X}_i = \beta_i Z + \varepsilon_i$
  approach; compare the $d(d-1)/2$ pair copula parameters here vs. $O(d)$ factor parameters.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence are used
  as edge weights in vine structure selection.
- [[SMM Estimator for Copulas]] — contrast: factor copulas cannot write a closed-form density;
  vine copulas (under simplifying assumption) have a closed-form h-function-based likelihood.

## See Also

- [[_Index|Dependence Modeling]] — parent index.
- [[Tail Dependence in Factor Copulas]] — EVT-based tail dependence for factor copulas; vine
  copulas achieve non-zero tail dependence by choosing Clayton, Gumbel, or $t$ pair copulas
  at first-tree edges.
