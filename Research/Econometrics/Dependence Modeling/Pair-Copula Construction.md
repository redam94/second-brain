---
title: "Pair-Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/vine-copula-sources-reference.md]]"
source_location: "Aas et al. (2009), Secs. 2–3; Bedford & Cooke (2002)"
date_ingested: 2026-10-14
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Factor Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Tree Structures]]"
  - "[[R-vine Models and Structure Selection]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - PCC
  - pair-copula construction
  - vine density factorization
  - h-function
---

# Pair-Copula Construction

> [!summary]
> A pair-copula construction (PCC) expresses a $d$-dimensional joint density as a product of $d$ marginals and $d(d-1)/2$ **bivariate copula densities**, each evaluated at the appropriately conditioned marginals. The conditioning is computed recursively using the **h-function** (the conditional CDF from a bivariate copula). This note gives the formal density formula, the h-function definition, and the recursive algorithm for evaluating the density — the core machinery behind all vine copula models.

## Overview

The starting point is the observation (Joe 1996; Bedford & Cooke 2001, 2002) that any multivariate density can be written as a product of bivariate conditional copula densities plus marginals. Bedford & Cooke showed that a convenient graphical structure — the **vine** — organises these $d(d-1)/2$ bivariate copulas into nested trees, making it clear which variables condition which. Aas et al. (2009) turned this into a practical estimation framework by deriving the h-function recursion needed to compute conditional CDFs, which are the inputs to each pair copula.

## Main Content

> [!definition] Pair-copula construction density (general form)
> Let $\mathbf{X} = (X_1, \ldots, X_d)'$ with joint density $f(\mathbf{x})$ and marginals $f_k(x_k)$. Any valid pair-copula construction indexed by a regular vine $\mathcal{V}$ (see [[R-vine Models and Structure Selection]]) gives:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \; \cdot \; \prod_{\text{edges } (i,j|D) \in \mathcal{V}} c_{ij|D}\!\left(F(x_i \mid \mathbf{x}_D),\; F(x_j \mid \mathbf{x}_D)\right)$$
> where the product is over all $d(d-1)/2$ edges of the vine, indexed by the conditioned pair $(i,j)$ and conditioning set $D$, and $c_{ij|D}$ is the bivariate copula density for the pair $(X_i, X_j)$ given $\mathbf{X}_D = \mathbf{x}_D$.
>
> Under the **simplifying assumption** (see [[Vine Copulas - Overview#^def-simplifying-assumption]]), each $c_{ij|D}$ does not depend on $\mathbf{x}_D$ itself — only on the transformed values $F(x_i|\mathbf{x}_D)$ and $F(x_j|\mathbf{x}_D)$. This makes the density tractable.
^def-pcc-general

> [!definition] D-vine density (explicit formula)
> A **D-vine** with ordering $1, 2, \ldots, d$ has the density:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j \mid i+1,\ldots,i+j-1}\!\left(F(x_i \mid x_{i+1}, \ldots, x_{i+j-1}),\; F(x_{i+j} \mid x_{i+1}, \ldots, x_{i+j-1})\right)$$
> The outer product runs over **tree levels** $j = 1, \ldots, d-1$; the inner product over the $d-j$ edges in tree $T_j$. At level $j=1$, the conditioning set is empty — these are unconditional bivariate copulas. At level $j=2$, conditioning is on one variable; at level $j=3$, on two; etc.
>
> **Example ($d=4$, D-vine):** The density is $f_1 f_2 f_3 f_4$ times:
> $$ c_{12} \cdot c_{23} \cdot c_{34} \cdot c_{13|2} \cdot c_{24|3} \cdot c_{14|23} $$
> where $c_{13|2}$ is evaluated at $(F(x_1|x_2), F(x_3|x_2))$ etc.
^def-dvine-density

> [!definition] C-vine density (explicit formula)
> A **C-vine** with root ordering $1, 2, \ldots, d-1$ (node $j$ is the root of tree $T_j$) has the density:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i \mid 1,\ldots,j-1}\!\left(F(x_j \mid x_1, \ldots, x_{j-1}),\; F(x_i \mid x_1, \ldots, x_{j-1})\right)$$
> At level $j=1$ (tree $T_1$), the root node is 1 and the conditioning set is empty: $d-1$ unconditional copulas $c_{12}, c_{13}, \ldots, c_{1d}$. At level $j=2$, the root is 2, the conditioning set is $\{1\}$: $d-2$ copulas $c_{23|1}, c_{24|1}, \ldots, c_{2d|1}$, etc.
>
> **Example ($d=4$, C-vine with root order 1,2,3):**
> $$ c_{12} \cdot c_{13} \cdot c_{14} \cdot c_{23|1} \cdot c_{24|1} \cdot c_{34|12} $$
^def-cvine-density

> [!definition] The h-function (conditional CDF from a bivariate copula)
> The **h-function** is the key computational device for evaluating the conditional CDFs that appear as arguments to higher-level pair copulas. For a bivariate copula $C(u, v; \boldsymbol{\theta})$:
> $$h(u \mid v;\, \boldsymbol{\theta}) := F(x_i \mid x_j) = \frac{\partial C(u, v;\, \boldsymbol{\theta})}{\partial v}$$
> This is a function from $[0,1]^2$ to $[0,1]$. By Rosenblatt's transformation / the chain rule of probability, repeatedly applying h-functions yields any conditional distribution $F(x_i \mid x_{i+1}, \ldots, x_{i+k})$.
>
> **Closed forms for common families:**
> - Gaussian$(\rho)$: $h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho \Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
> - Clayton$(\theta)$: $h(u|v;\theta) = v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$
> - Gumbel$(\theta)$: $h(u|v;\theta) = C(u,v)\cdot(-\ln v)^{\theta-1} \cdot \frac{1}{v\,[-\ln C(u,v)]}$
^def-hfunction

> [!definition] Recursive algorithm for conditional CDFs
> To evaluate $F(x_1 \mid x_2, \ldots, x_k)$ for a D-vine, use the following recursion (Aas et al. 2009, Algorithm 1):
>
> Initialise: $v_{i,1} = F_i(x_i)$ (uniform marginals).
>
> For $j = 1, \ldots, d-1$, for $i = j+1, \ldots, d$:
> $$v_{i,j+1} = h\!\left(v_{i,j} \mid v_{j,j};\, \boldsymbol{\theta}_{j,i|1,\ldots,j-1}\right)$$
> and
> $$v_{i,j+1}^{\text{rev}} = h\!\left(v_{j,j} \mid v_{i,j};\, \boldsymbol{\theta}_{j,i|1,\ldots,j-1}\right)$$
>
> The pair copula density at edge $(j, i+j|1,\ldots,j-1)$ in tree $T_j$ is evaluated at $(v_{i,j}, v_{j+i,j})$.
>
> This algorithm has $O(d^2)$ h-function evaluations per density evaluation — tractable even for $d=20{-}30$.
^def-recursive-algorithm

> [!definition] Parameter count and the curse of dimensionality
> A $d$-dimensional vine copula has exactly $d(d-1)/2$ pair copulas. Each bivariate copula has at least 1 parameter (often 1–2). For $d = 10$: 45 pair copulas; for $d = 20$: 190; for $d = 50$: 1225. This quadratic growth means vine copulas become parameter-heavy in high dimensions — motivating **truncation** (setting higher-level pair copulas to independence) and **sparse vine selection** (e.g. using lasso-penalised structure selection). See [[R-vine Models and Structure Selection]].
^def-parameter-count

## Examples

> [!example] 3-dimensional C-vine with Clayton and Gaussian copulas
> **Setup:** $d=3$, C-vine with root node 1. Variables: $X_1$ = equity returns, $X_2$ = bond returns, $X_3$ = commodity returns. Suppose equity-bond pair has lower tail dependence (Clayton), equity-commodity has upper tail dependence (Gumbel), and bond-commodity conditional on equity is close to Gaussian.
>
> **Density factorization:**
> $$f(x_1, x_2, x_3) = f_1(x_1)f_2(x_2)f_3(x_3) \cdot c_{12}^{\text{Clay}}(u_1, u_2) \cdot c_{13}^{\text{Gum}}(u_1, u_3) \cdot c_{23|1}^{\text{Gauss}}\!\left(h(u_2|u_1;\theta_{12}),\, h(u_3|u_1;\theta_{13})\right)$$
> **Insight:** The pair copula $c_{23|1}$ models the *residual* dependence between bonds and commodities after removing the equity-driven component. Using different families for tree 1 vs. tree 2 reflects that the raw pairs have tail dependence but the conditional pair does not.

## Connections

- [[Vine Copulas - Overview]] — big picture, comparison to factor copulas.
- [[C-vine and D-vine Tree Structures]] — the tree diagrams and structure conventions for C- and D-vines.
- [[R-vine Models and Structure Selection]] — how to choose the vine structure and pair copula families.
- [[Vine Copula Estimation]] — using these formulas for maximum likelihood estimation.
- [[Factor Copula Construction]] — the competing architecture: a single factor $Z$ instead of $d(d-1)/2$ copulas.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence; used as diagnostics and structure-selection inputs.
- [[Tail Dependence in Factor Copulas]] — how tail dependence arises from the factor structure; in vine copulas it arises from the bivariate family choice.
