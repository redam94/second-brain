---
title: Pair Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Survey-Synthesis.md]]"
source_location: "Aas et al. (2009) §2-3; Joe (1996); Bedford & Cooke (2002) §2-3"
date_ingested: 2026-07-22
date_updated: 2026-07-22
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[Regular Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - PCC
  - pair copula density decomposition
  - h-function
  - conditional CDF vine
---

# Pair Copula Constructions

> [!summary]
> A **pair copula construction (PCC)** decomposes any $N$-dimensional joint density into a product of $N(N-1)/2$ **bivariate copula densities** (pair copulas), some conditioned on sets of variables. Joe (1996) first showed this for the trivariate case; Bedford & Cooke (2002) systematised it for arbitrary $N$ using vine graphs. The key computational tool is the **h-function**: the partial derivative of a bivariate copula with respect to one argument, which gives the conditional CDF needed to move from one vine tree to the next.

## Overview

Sklar's theorem separates a joint distribution into marginals and a copula; the PCC idea goes further and **separates the copula itself** into $N(N-1)/2$ bivariate building blocks. This offers two advantages over imposing a single $N$-dimensional copula family:

1. **Flexibility**: each pair of variables gets its own copula family (Gaussian, $t$, Clayton, Gumbel, etc.) and its own parameters.
2. **Estimation tractability**: each bivariate copula is estimated in turn (sequential ML), requiring only bivariate optimisations of well-understood families.

## Main Content

### Trivariate Case (Joe 1996)

> [!theorem] Trivariate density factorisation
> For three random variables $x_1, x_2, x_3$ with marginal densities $f_i$ and CDFs $F_i$:
> $$f(x_1, x_2, x_3) = f_1(x_1)\, f_2(x_2)\, f_3(x_3) \cdot c_{12}(F_1(x_1),\, F_2(x_2)) \cdot c_{13}(F_1(x_1),\, F_3(x_3)) \cdot c_{23|1}(F_{2|1}(x_2|x_1),\, F_{3|1}(x_3|x_1))$$
> where:
> - $c_{12}, c_{13}$ are **unconditional pair copula densities** (bivariate, acting on marginal CDFs),
> - $c_{23|1}$ is the **conditional pair copula density** for $(x_2, x_3)$ conditioned on $x_1$, acting on the conditional CDFs $F_{2|1}, F_{3|1}$.
>
> **Derivation sketch:**
> $$f(x_1,x_2,x_3) = f_{3|12}(x_3|x_1,x_2)\cdot f_{2|1}(x_2|x_1)\cdot f_1(x_1)$$
> Apply Sklar conditionally: $f_{2|1}(x_2|x_1) = c_{12}(F_1,F_2)\cdot f_2(x_2)$ and $f_{3|12}(x_3|x_1,x_2) = c_{23|1}(F_{2|1},F_{3|1})\cdot f_{3|1}(x_3|x_1)$; the last factor $f_{3|1} = c_{13}(F_1,F_3)\cdot f_3(x_3)$ gives the result.
^thm-trivariate

> [!definition] Decomposition non-uniqueness
> The trivariate density admits **three** PCC decompositions (one per ordering of the conditioning tree):
> - $c_{12}, c_{13}, c_{23|1}$ (condition on $x_1$ first)
> - $c_{12}, c_{23}, c_{13|2}$ (condition on $x_2$ first)
> - $c_{13}, c_{23}, c_{12|3}$ (condition on $x_3$ first)
>
> All three represent the same joint distribution; they differ in *which* bivariate copulas appear and in *which* conditional CDFs serve as arguments. In high dimensions, the *vine* specifies which of the many possible decompositions is used. The choice is consequential for interpretability and estimation but not for validity — any decomposition corresponds to a valid joint density.
^def-nonuniqueness

### General N-Dimensional Case (Bedford & Cooke 2002)

> [!theorem] Regular vine density (Bedford & Cooke 2002)
> Let $\mathcal{V} = (T_1, T_2, \ldots, T_{N-1})$ be a regular vine on $N$ variables with edge set $E_k$ for tree $T_k$. Each edge $e = \{a,b\}|D_e \in E_k$ corresponds to a pair copula $c_{a,b|D_e}$ with conditioning set $|D_e|=k-1$. The joint density decomposes as:
> $$f(x_1,\ldots,x_N) = \prod_{i=1}^N f_i(x_i) \cdot \prod_{k=1}^{N-1} \prod_{e \in E_k} c_{a(e),b(e)|D(e)}\!\left(F_{a|D}(x_{a(e)}|\mathbf{x}_{D(e)}),\, F_{b|D}(x_{b(e)}|\mathbf{x}_{D(e)})\right)$$
>
> The product has $\sum_{k=1}^{N-1}(N-k) = N(N-1)/2$ terms — one pair copula per unique pair of variables, with conditioning set growing by one variable per tree level.
^thm-vine-density

### The h-Function: Moving Between Trees

> [!definition] h-function (Aas et al. 2009)
> Given a bivariate copula $C(u, v; \boldsymbol{\theta})$, the **h-function** is:
> $$h(u\,|\,v;\,\boldsymbol{\theta}) \equiv F(x\,|\,v) = \frac{\partial C(u,\,v;\,\boldsymbol{\theta})}{\partial v}$$
> where $u = F_j(x)$ and $v = F_k(v)$ are uniform marginals. The h-function gives the **conditional CDF** of $U$ given $V = v$ under the copula $C$.
>
> In PCC, after fitting a pair copula $c_{jk}$ in tree $T_k$, the inputs to tree $T_{k+1}$ are the h-function values:
> $$\hat{u}_{j|k} = h(\hat{u}_j\,|\,\hat{u}_k;\,\hat{\boldsymbol{\theta}}_{jk}), \qquad \hat{u}_{k|j} = h(\hat{u}_k\,|\,\hat{u}_j;\,\hat{\boldsymbol{\theta}}_{jk})$$
> These serve as the pseudo-uniform observations for the next tree's pair copulas.
^def-hfunction

> [!example] h-functions for standard copula families
>
> | Copula | $h(u\,|\,v;\,\theta)$ |
> |--------|----------------------|
> | **Gaussian** $\rho$ | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | **Student's $t$** $(\nu,\rho)$ | $t_{\nu+1}\!\left(\sqrt{\dfrac{\nu + [t_\nu^{-1}(v)]^2}{\nu + 1}}\cdot\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | **Clayton** $\theta>0$ | $(1 + \theta v^{-\theta}(u^{-\theta}-1))^{-1-1/\theta}$ |
> | **Gumbel** $\theta\ge 1$ | $C(u,v;\theta)\cdot v^{-1}\cdot(-\ln v)^{\theta-1}\cdot\bigl((-\ln u)^\theta + (-\ln v)^\theta\bigr)^{1/\theta - 1}$ |
> | **Frank** $\theta \ne 0$ | $\dfrac{e^{-\theta v}(e^{-\theta u}-1)}{e^{-\theta(u+v)} - e^{-\theta u} - e^{-\theta v} + 1}$ |
>
> **Note on symmetry:** $h(u|v;\theta) \neq h(v|u;\theta)$ in general. Both are required during vine estimation: each edge produces two h-function values, one for each direction.
^ex-hfunctions

### Simplifying Assumption

> [!definition] The simplifying assumption (Hobæk Haff, Aas & Frigessi 2010)
> A vine copula is **simplified** if every pair copula $c_{ab|D}$ depends on $\mathbf{x}_D$ *only through the conditional CDFs* $F(x_a|\mathbf{x}_D)$ and $F(x_b|\mathbf{x}_D)$, not on the actual values $\mathbf{x}_D$.
>
> Under the simplifying assumption, $c_{ab|D}(u,v|\mathbf{x}_D) = c_{ab|D}(u,v)$ for all $\mathbf{x}_D$ — the pair copula is the same function for all conditioning values. This assumption:
> - Makes density evaluation and simulation tractable (h-functions depend only on parameters, not on data values in the conditioning set).
> - Is reasonable when conditioning variables have limited effect on the dependence structure.
> - Is an approximation: the true conditional copula can vary with $\mathbf{x}_D$. Higher-order trees (deeper conditioning) are more susceptible to violation; empirically this matters most for small $N$ or very non-Gaussian distributions.
^def-simplifying

## Examples

> [!example] Four-dimensional D-vine density
> **Setup:** Variables $(x_1, x_2, x_3, x_4)$ with a D-vine structure. Tree 1 has edges $(1,2), (2,3), (3,4)$; Tree 2 has edges $(1,3;2), (2,4;3)$; Tree 3 has edge $(1,4;2,3)$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot c_{34}(F_3,F_4)$$
> $$\cdot\, c_{13|2}(h(F_1|F_2),\, h(F_3|F_2))\cdot c_{24|3}(h(F_2|F_3),\, h(F_4|F_3))$$
> $$\cdot\, c_{14|23}(h(h(F_1|F_2)|h(F_3|F_2)),\, h(h(F_4|F_3)|h(F_2|F_3)))$$
>
> **Key:** The Tree 3 inputs are obtained by applying h-functions from Trees 1 and 2. With $N=4$ there are $4\times3/2=6$ pair copulas, each freely chosen from any bivariate family.

## Connections

- [[Vine Copulas - Overview]] — motivation and position in the copula landscape
- [[Regular Vine Structures]] — the C-vine and D-vine graphical representations that organise this decomposition
- [[Vine Copula Estimation]] — the sequential ML algorithm exploiting h-functions
- [[Factor Copula Construction]] — the contrast: factor copulas have no closed-form density but impose a parsimonious factor structure; vine copulas have an explicit density but require $N(N-1)/2$ parameters

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence as pure copula functionals; used as structure-selection weights
- [[Copula Estimation]] — Bayesian estimation of a Gaussian copula (bivariate); vine copulas generalise this to $N$ variables
- [[../_Index|Econometrics]]
