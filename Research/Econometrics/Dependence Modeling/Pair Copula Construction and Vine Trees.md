---
title: "Pair Copula Construction and Vine Trees"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Aas-et-al-2009-pair-copula-constructions.txt]]"
source_location: "Aas et al. (2009), Sec. 2, pp. 183-187; Bedford & Cooke (2001) Sec. 3-4; Bedford & Cooke (2002) Secs. 2-3"
date_ingested: 2026-10-25
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Density Formulas]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - vine tree structure
  - Bedford-Cooke vines
  - regular vine density factorization
  - h-function
---

# Pair Copula Construction and Vine Trees

> [!summary]
> Any $n$-dimensional density admits infinitely many pair-copula decompositions (PCDs), organized by a **regular vine** (sequence of trees). The **Bedford–Cooke theorem** (2001, 2002) establishes when such a factorization is unique and how to read the density from the vine structure. The key computational tool is the **h-function** — the conditional CDF of one variable given another under a bivariate copula — which propagates conditional CDFs from one tree to the next.

## Overview

The starting point is a classical fact from probability: any joint density can be decomposed as a product of conditional densities in any ordering. For $(X_1, X_2, X_3)$:
$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f(x_2 \mid x_1) \cdot f(x_3 \mid x_1, x_2)$$

Each conditional density $f(x_2 \mid x_1)$ can be written as a bivariate copula density $c_{12}$ applied to the marginal CDFs:
$$f(x_2 \mid x_1) = c_{12}(F_1(x_1), F_2(x_2)) \cdot f_2(x_2)$$

For the fully conditional term, under the **simplifying assumption** (see [[Vine Copulas - Overview#^def-simplifying]]):
$$f(x_3 \mid x_1, x_2) = c_{13|2}(F(x_1 \mid x_2), F(x_3 \mid x_2)) \cdot f(x_3 \mid x_2)$$

Chaining these gives the full pair-copula decomposition. The challenge is that different orderings and decompositions produce different (valid) PCDs. The regular vine formalizes which decompositions are valid and gives a graphical representation.

## Main Content

> [!theorem] Density factorization via regular vine (Bedford & Cooke 2001, 2002)
> Let $\mathcal{V} = (T_1, T_2, \dots, T_{n-1})$ be a regular vine on $n$ variables (see [[Vine Copulas - Overview#^def-rvine]]). For each edge $e = (j, k \mid D_e) \in T_\ell$, let $c_{jk|D_e}$ be a bivariate copula density (under the simplifying assumption, independent of $x_{D_e}$). Then the joint density of $(X_1, \dots, X_n)$ is:
>
> $$\boxed{f(x_1, \dots, x_n) = \prod_{k=1}^n f_k(x_k) \;\cdot\; \prod_{\ell=1}^{n-1} \prod_{e \in T_\ell} c_{j(e),k(e)|D_e}\!\left(F(x_{j(e)} \mid \mathbf{x}_{D_e}),\, F(x_{k(e)} \mid \mathbf{x}_{D_e})\right)}$$
>
> where $j(e), k(e)$ are the two **conditioned** variables in edge $e$, $D_e$ is the **conditioning set**, and $F(x_j \mid \mathbf{x}_{D_e})$ is the conditional CDF computed via h-function recursion.
>
> The total product has $n$ marginal density terms and $\binom{n}{2}$ bivariate copula density terms, one per vine edge.
>
> **Bedford & Cooke (2001):** Showed that any positive continuous density admits a PCC for any regular vine on $n$ nodes, so the vine structure determines *which* pairs are directly linked (tree 1) vs. linked conditional on other variables (higher trees), but not whether a decomposition exists.
^thm-density-factorization

> [!definition] Separating set and conditioned set
> For an edge $e = \{a, b\}$ in tree $T_\ell$ ($\ell \geq 2$), where $a$ and $b$ are themselves edges $a = \{j, k\}$ and $b = \{k, l\}$ of tree $T_{\ell-1}$:
>
> - The **conditioned set** is $\{j, l\}$ — the variables that are "new" in this edge.
> - The **conditioning set** (separating set) is $D_e = \{k\}$ — the shared variable.
>
> More generally, in tree $T_\ell$, each edge connects two $(\ell-1)$-element sets, and their symmetric difference forms the conditioned set (two variables), while their intersection forms the conditioning set ($\ell - 1$ variables).
>
> This means that in tree $T_\ell$, all conditioning sets have size $\ell - 1$. Tree 1 has no conditioning; tree 2 conditions on one variable; tree 3 on two; and so on.
^def-sep-set

> [!definition] h-function (conditional CDF under a bivariate copula)
> For a bivariate copula $C_{uv}(u, v; \theta)$, the **h-function** is:
> $$h(u \mid v; \theta) \equiv F_{U|V}(u \mid v) = \frac{\partial C_{uv}(u, v; \theta)}{\partial v}$$
>
> The h-function gives the conditional CDF of $U$ given $V = v$ under the copula $C_{uv}$. Equivalently, if we set $u = F(x \mid \cdot)$ and $v = F(y \mid \cdot)$, then $h(u \mid v)$ is the conditional CDF $F(x \mid y, \cdot)$.
>
> **Key property:** For most parametric bivariate copula families, $h$ has a closed form:
>
> | Copula | $C_{uv}(u,v;\theta)$ | $h(u \mid v;\theta)$ |
> |---|---|---|
> | Gaussian($\rho$) | $\Phi_\rho(\Phi^{-1}(u), \Phi^{-1}(v))$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | $t_\nu(\rho)$ | $T_{\nu,\rho}(t_\nu^{-1}(u), t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + [t_\nu^{-1}(v)]^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta$) | $\exp\!\left(-[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta}\right)$ | $\frac{C(u,v)}{v} \cdot \frac{[(-\ln u)^\theta + (-\ln v)^\theta]^{1/\theta - 1} (-\ln v)^{\theta-1}}{-\ln v}$ |
> | Frank($\theta$) | $-\frac{1}{\theta}\ln\!\left(1 + \frac{(e^{-\theta u}-1)(e^{-\theta v}-1)}{e^{-\theta}-1}\right)$ | closed form via logarithmic terms |
>
> Note: For Gumbel the h-function is slightly more complex — the table shows its structure; implementations use the exact derivative.
^def-h-function

> [!theorem] Recursive conditional CDF computation
> Given a regular vine, the conditional CDF $F(x_j \mid x_{D_e})$ needed to evaluate each copula term in the density is computed by the following recursion, starting from the marginal CDFs:
>
> **Initialization (tree 1):** For any edge $(j, k)$ in $T_1$:
> $$F(x_j \mid x_k) = h(F_j(x_j) \mid F_k(x_k); \theta_{jk})$$
>
> **Recursion (tree $\ell \geq 2$):** For edge $(j, k \mid D)$ in $T_\ell$, let $D = \{m\} \cup D'$ where $m$ is the variable that was "pivoted" in passing from $T_{\ell-1}$ to $T_\ell$. Then:
> $$F(x_j \mid x_D) = h\!\left(F(x_j \mid x_{D'}) \;\Big|\; F(x_m \mid x_{D'}); \,\theta_{jm|D'}\right)$$
>
> Each h-function evaluation consumes two conditional CDFs produced in the previous tree level, and outputs a conditional CDF for use in the next tree level. This makes the vine density computation a **recursive message-passing** algorithm over the tree structure.
^thm-recursive-cdf

## Examples

> [!example] 3-variable PCD (Aas et al. 2009, Sec. 2.1)
> **Setup:** Variables $(X_1, X_2, X_3)$; marginals $F_1, F_2, F_3$.
>
> **One valid decomposition (ordering 1-2-3):**
> $$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3) \cdot c_{12}(F_1(x_1), F_2(x_2)) \cdot c_{23}(F_2(x_2), F_3(x_3)) \cdot c_{13|2}(F(x_1 \mid x_2), F(x_3 \mid x_2))$$
>
> **Tree structure:**
> - $T_1$: nodes $\{1, 2, 3\}$, edges $\{1\text{-}2, 2\text{-}3\}$ (a path = D-vine for $n=3$)
> - $T_2$: nodes $\{1\text{-}2, 2\text{-}3\}$, edge $\{1\text{-}3 \mid 2\}$
>
> **h-function computation for tree 2:**
> - $F(x_1 \mid x_2) = h(F_1(x_1) \mid F_2(x_2); \theta_{12})$ — from tree 1 edge $(1,2)$
> - $F(x_3 \mid x_2) = h(F_3(x_3) \mid F_2(x_2); \theta_{23})$ — from tree 1 edge $(2,3)$
> - These two quantities are the arguments of $c_{13|2}$.
>
> **Interpretation:** The copula $c_{12}$ directly models the $1$-$2$ dependence; $c_{23}$ directly models the $2$-$3$ dependence; and $c_{13|2}$ models the *residual* $1$-$3$ dependence after accounting for their common dependence on $2$.

## Connections

- [[Vine Copulas - Overview]] — motivation and position vs. factor copulas.
- [[C-vine and D-vine Density Formulas]] — explicit density formulas for the canonical vine types, using this recursive h-function structure.
- [[Vine Copula Estimation and Model Selection]] — how the density formula is used in maximum likelihood estimation.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence, used to guide tree-1 edge selection (pair highest-$|\tau|$ variables in tree 1).

## See Also

- [[Factor Copulas - Overview]] — the contrasting architecture: instead of a product of bivariate copulae over trees, the dependence is generated by a latent factor.
- [[Econometrics/_Index|Econometrics]]
