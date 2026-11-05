---
title: "Vine Copula Structure and Tree Representation"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-2009-Pair-Copula-Constructions]]"
source_location: "Secs. 2–3, pp. 2–9; Appendix on h-functions"
date_ingested: 2026-11-05
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - D-vine density
  - C-vine density
  - pair copula construction
  - h-function vine
  - vine tree structure
---

# Vine Copula Structure and Tree Representation

> [!summary]
> This note gives the formal density decompositions for C-vines and D-vines. For a $d$-variable D-vine the joint density is a product of $d$ marginals and $d(d-1)/2$ bivariate copula densities, computed by working through $d-1$ tree levels. The key computational tool is the **h-function** — the conditional CDF of one variable given another through a bivariate copula — which allows the recursive computation of conditional CDFs needed for deeper tree levels.

## Overview

A vine copula organises the $d(d-1)/2$ pairwise dependences into a cascade of trees. The first tree captures unconditional dependences; each subsequent tree captures conditional dependences given the variables already processed. This note derives the density formulas for the two most-used structures (C-vine and D-vine) and defines the h-functions that make sequential computation tractable.

## Main Content

### D-vine density

> [!definition] D-vine: variable ordering and tree structure
> Fix a variable ordering $\pi = (1, 2, \ldots, d)$. The D-vine on $d$ variables has:
>
> **Tree $T_1$**: $d-1$ edges connecting adjacent variables in the sequence:
> $$(1,2),\; (2,3),\; (3,4),\; \ldots,\; (d-1, d)$$
>
> **Tree $T_2$**: $d-2$ edges connecting variables one step apart, conditioned on the middle variable:
> $$(1,3|2),\; (2,4|3),\; (3,5|4),\; \ldots,\; (d-2, d|d-1)$$
>
> **Tree $T_k$**: $d-k$ edges connecting variables $k$ positions apart, conditioned on the $k-1$ variables between them:
> $$(1, k+1|2,\ldots,k),\; (2, k+2|3,\ldots,k+1),\; \ldots,\; (d-k, d|d-k+1,\ldots,d-1)$$
>
> Total trees: $d-1$. Total pair copulas: $d(d-1)/2$.
^def-dvine-structure

> [!definition] D-vine density (Aas et al. 2009, Eq. 4)
> The joint density for a $d$-variate D-vine is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|\{i+1,\ldots,i+j-1\}}\!\!\left(F(x_i | x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$
> where:
> - $j$ indexes the tree level (from 1 for unconditional to $d-1$ for the deepest level)
> - $i$ indexes the starting variable within tree $j$
> - $c_{a,b|\mathbf{K}}$ is a bivariate copula density with conditioning set $\mathbf{K}$
> - $F(x_i|x_{i+1},\ldots,x_{i+j-1})$ is the conditional CDF, computed recursively using h-functions
^def-dvine-density

> [!example] 4-variable D-vine density (variable order: 1-2-3-4)
> **Tree structure:**
> - $T_1$: edges (1,2), (2,3), (3,4)
> - $T_2$: edges (1,3|2), (2,4|3)
> - $T_3$: edge (1,4|2,3)
>
> **Joint density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 \cdot f_2 \cdot f_3 \cdot f_4$$
> $$\times\; c_{12}(F_1(x_1), F_2(x_2)) \cdot c_{23}(F_2(x_2), F_3(x_3)) \cdot c_{34}(F_3(x_3), F_4(x_4))$$
> $$\times\; c_{13|2}(F(x_1|x_2), F(x_3|x_2)) \cdot c_{24|3}(F(x_2|x_3), F(x_4|x_3))$$
> $$\times\; c_{14|23}(F(x_1|x_2,x_3), F(x_4|x_2,x_3))$$
>
> Nine factors total: 4 marginal densities + 5 bivariate copula densities. Each $c_{ab|K}$ can be a **different** copula family (e.g. $c_{12}$ Normal, $c_{23}$ Clayton, $c_{14|23}$ Frank).
^ex-4var-dvine

---

### C-vine density

> [!definition] C-vine: root selection and tree structure
> Choose one **root variable** per tree. By convention, let the root of tree $T_k$ be variable $k$. The C-vine on $d$ variables has:
>
> **Tree $T_1$**: root variable 1; $d-1$ edges forming a star:
> $$(1,2),\; (1,3),\; \ldots,\; (1,d)$$
>
> **Tree $T_2$**: root variable 2 (conditioned on variable 1); $d-2$ edges:
> $$(2,3|1),\; (2,4|1),\; \ldots,\; (2,d|1)$$
>
> **Tree $T_k$**: root variable $k$ (conditioned on $1,\ldots,k-1$); $d-k$ edges:
> $$(k, k+1|1,\ldots,k-1),\; (k,k+2|1,\ldots,k-1),\; \ldots,\; (k,d|1,\ldots,k-1)$$
>
> The variable chosen as root of $T_1$ should be the one most *influential* on the others — a natural choice if one variable is a known driver (e.g. a market factor, a temperature variable).
^def-cvine-structure

> [!definition] C-vine density (Aas et al. 2009, Eq. 3)
> The joint density for a $d$-variate C-vine is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|\{1,\ldots,j-1\}}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_i|x_1,\ldots,x_{j-1})\right)$$
> where $j$ is the tree level and $i$ indexes non-root nodes at that level.
^def-cvine-density

> [!example] 4-variable C-vine density (variable 1 as root, then 2, then 3)
> **Tree structure:**
> - $T_1$: (1,2), (1,3), (1,4) — star with centre 1
> - $T_2$: (2,3|1), (2,4|1) — star with centre 2 given 1
> - $T_3$: (3,4|1,2) — the last pair
>
> **Joint density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 \cdot f_2 \cdot f_3 \cdot f_4$$
> $$\times\; c_{12}(F_1(x_1),F_2(x_2)) \cdot c_{13}(F_1(x_1),F_3(x_3)) \cdot c_{14}(F_1(x_1),F_4(x_4))$$
> $$\times\; c_{23|1}(F(x_2|x_1), F(x_3|x_1)) \cdot c_{24|1}(F(x_2|x_1), F(x_4|x_1))$$
> $$\times\; c_{34|12}(F(x_3|x_1,x_2), F(x_4|x_1,x_2))$$
^ex-4var-cvine

---

### H-functions

> [!definition] H-function (conditional CDF through a bivariate copula)
> For a bivariate copula $C_{uv}(u,v;\theta)$ with parameter $\theta$, the **h-function** is:
> $$h(u|v;\theta) \;=\; F(x_1|x_2) \;=\; \frac{\partial C_{uv}(u, v;\theta)}{\partial v}$$
> where $u = F_1(x_1)$ and $v = F_2(x_2)$. The h-function gives the conditional CDF of $X_1$ given $X_2 = x_2$ expressed through the copula alone (using probability integral transform). It is the key computation in the **sequential vine estimation** algorithm.
>
> Under the simplifying assumption, $h(u|v;\theta)$ does not depend on the values of further conditioning variables — only on $u$ and $v$ — so it can be computed recursively by applying the same formula at each tree level.
^def-h-function

> [!example] H-functions for common copula families
> **Gaussian copula** with correlation $\rho$:
> $$h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$$
>
> **Clayton copula** with parameter $\theta > 0$:
> $$h(u|v;\theta) = v^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1/\theta - 1}$$
>
> **Frank copula** with parameter $\theta \neq 0$:
> $$h(u|v;\theta) = \frac{e^{-\theta v}(e^{-\theta u}-1)}{(e^{-\theta}-1) + (e^{-\theta u}-1)(e^{-\theta v}-1)}$$
>
> These formulas allow recursive computation of conditional CDFs needed for deeper tree levels. Aas et al. (2009, Appendix A) tabulates h-functions for all standard bivariate copula families.
^ex-h-functions

## Connections

- [[Vine Copulas - Overview]] — motivation, key insight, C-vine vs D-vine overview
- [[Vine Copula Estimation and Model Selection]] — uses h-functions to compute log-likelihood sequentially
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ summarises bivariate dependence at each edge
- [[Factor Copulas - Overview]] — no tree structure; uses a single latent factor instead
- [[Copula Architecture Comparison]] — where D-vine and C-vine fit in the broader landscape

## See Also

- [[Tail Dependence in Factor Copulas]] — tail dependence coefficients for the competing factor copula approach
- [[Multi-Factor and Block Dependence Structures]] — how factor copulas achieve heterogeneous dependence without a vine structure
- [[Bayesian copula estimation Describing correlated joint distributions]] — Gaussian copula in PyMC; a D-vine with all-Normal pair copulas reduces to this in the bivariate case
