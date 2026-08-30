---
title: Pair-Copula Decomposition
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.md]]"
source_location: "Aas et al. (2009) Sec. 2; Bedford & Cooke (2002)"
date_ingested: 2026-08-30
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Regular Vines and Structure Selection]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - Bedford-Cooke decomposition
  - h-function
  - pair-copula construction
  - PCC density
  - conditional copula recursion
---

# Pair-Copula Decomposition

> [!summary]
> Any joint density factors into a product of **conditional bivariate copula densities** (pair copulas), as shown by Bedford & Cooke (2002). The pair copulas are evaluated at **conditional CDFs** computed via the **h-function** recursion. This makes the vine copula density exactly computable — no simulation needed — once the vine tree structure and pair copula families are chosen.

## Overview

The fundamental insight is a recursive factorization of a multivariate density. Starting from the chain rule of probability, Joe (1996) and Bedford & Cooke (2001, 2002) showed that *any* $d$-dimensional density can be written as a product of bivariate copula densities times univariate marginals, organized into a sequence of trees called a vine. The key technical tool is the **h-function** (conditional CDF operator), which allows each bivariate copula to be evaluated at the correct conditional inputs.

## Main Content

> [!theorem] Factorization theorem (Joe 1996; Bedford & Cooke 2002)
> Let $(X_1,\dots,X_d)$ have joint density $f(x_1,\dots,x_d)$, marginals $F_i$ with densities $f_i$, and let $\mathbf{x}_\mathbf{D} = (x_k)_{k\in\mathbf{D}}$ for any index set $\mathbf{D}$. Define the conditional CDF:
> $$F_{i|\mathbf{D}}(x_i|\mathbf{x}_\mathbf{D}) = \Pr(X_i \leq x_i \mid \mathbf{X}_\mathbf{D} = \mathbf{x}_\mathbf{D})$$
> Then any d-dimensional density admits a factorization into **univariate marginals and bivariate (conditional) copula densities**:
> $$f(x_1,\dots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{\ell=1}^{d-1}\prod_{(i,j|\mathbf{D})\in E_\ell} c_{ij|\mathbf{D}}\!\left(F_{i|\mathbf{D}}(x_i|\mathbf{x}_\mathbf{D}),\, F_{j|\mathbf{D}}(x_j|\mathbf{x}_\mathbf{D})\right)$$
> where $(i,j|\mathbf{D})$ ranges over edges in vine tree $T_\ell$. There are $d(d-1)/2$ pair copulas in total, matching the number of bivariate relationships in $d$ variables.
>
> **Key facts:**
> 1. There are $n!/2 \cdot \prod_{\ell=1}^{d-2}(d-\ell-1)^{d-\ell-2}$ valid vine structures (a rapidly growing number); different structures yield different factorizations, all valid.
> 2. Under the **simplifying assumption** (pair copulas do not depend on the conditioning value $\mathbf{x}_\mathbf{D}$), the product form holds exactly and the density is computable analytically.
> 3. Without the simplifying assumption, $c_{ij|\mathbf{D}}$ becomes a function of $\mathbf{x}_\mathbf{D}$ and the integral is intractable; in practice the assumption is tested and approximately valid in many applications.
^thm-factorization

> [!definition] h-function (conditional CDF operator)
> The **h-function** computes the conditional CDF of $U$ given $V=v$ under a bivariate copula $C$:
> $$h(u,v;\theta) := F_{U|V}(u|v;\theta) = \frac{\partial}{\partial v} C(u,v;\theta)$$
> This is a function of $(u,v) \in [0,1]^2$ and the copula parameter $\theta$. The h-function exists in closed form for all standard bivariate copula families.
>
> The **inverse h-function** $h^{-1}(u,v;\theta)$ is needed for simulation (Rosenblatt transform inversion).
^def-hfunction

> [!definition] h-function formulas for standard families
> | Family | Copula $C(u,v;\theta)$ | $h(u,v;\theta) = \partial_v C(u,v;\theta)$ |
> |--------|----------------------|-------------------------------------------|
> | Normal | $\Phi_\rho(\Phi^{-1}(u), \Phi^{-1}(v))$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t_\nu$ | $t_{\nu,\rho}(t_\nu^{-1}(u), t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho t_\nu^{-1}(v)}{\sqrt{(\nu+(t_\nu^{-1}(v))^2)(1-\rho^2)/(\nu+1)}}\right)$ |
> | Clayton$(\theta>0)$ | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel$(\theta\geq 1)$ | $\exp(-[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta})$ | $C(u,v;\theta) \cdot \frac{(-\ln v)^{\theta-1}}{v [(-\ln u)^\theta+(-\ln v)^\theta]^{1-1/\theta}}$ |
> | Frank$(\theta\neq 0)$ | $-\tfrac{1}{\theta}\ln\!\left(1+\tfrac{(e^{-\theta u}-1)(e^{-\theta v}-1)}{e^{-\theta}-1}\right)$ | $\frac{(e^{-\theta u}-1)e^{-\theta v}}{(e^{-\theta}-1)+(e^{-\theta u}-1)(e^{-\theta v}-1)}$ |
^def-hfunctions

> [!definition] Conditional CDF recursion via h-functions
> For a vine with tree sequence $T_1,\dots,T_{d-1}$, the conditional CDFs needed at each tree level are computed recursively from the previous level's h-functions. If the conditioning set $\mathbf{D} = \mathbf{D}_{-j} \cup \{j\}$ (i.e., adding variable $j$ to the set $\mathbf{D}_{-j}$), then:
> $$F_{i|\mathbf{D}}(u_i | \mathbf{u}_\mathbf{D}) = h\!\left(F_{i|\mathbf{D}_{-j}}(u_i|\mathbf{u}_{\mathbf{D}_{-j}}),\, F_{j|\mathbf{D}_{-j}}(u_j|\mathbf{u}_{\mathbf{D}_{-j}})\,;\, \theta_{ij|\mathbf{D}_{-j}}\right)$$
> This recursion makes pair copula evaluation tractable: each tree's conditional CDFs are computed from the tree above, using only the bivariate h-functions. Starting from $F_{i|\emptyset}(u_i) = u_i$ (the raw PIT-transformed observation), the recursion builds the conditioning up through the tree levels.
^def-recursion

## Examples

> [!example] 3-dimensional factorization
> **Setup:** $(U_1,U_2,U_3)$ with joint density $f(u_1,u_2,u_3)$.
>
> **Factorization:** One valid decomposition (D-vine order $1-2-3$):
> $$f(u_1,u_2,u_3) = f_1(u_1) \cdot f_2(u_2) \cdot f_3(u_3) \cdot c_{12}(u_1,u_2) \cdot c_{23}(u_2,u_3) \cdot c_{13|2}(F_{1|2}(u_1|u_2),\, F_{3|2}(u_3|u_2))$$
>
> where $F_{1|2}(u_1|u_2) = h(u_1,u_2;\theta_{12})$ and $F_{3|2}(u_3|u_2) = h(u_3,u_2;\theta_{23})$.
>
> **Interpretation:** $c_{12}$ captures unconditional $1\text{-}2$ dependence; $c_{23}$ captures $2\text{-}3$; $c_{13|2}$ captures the *residual* $1\text{-}3$ dependence after conditioning on $2$. Using $c_{13|2} = \Pi$ (independence copula) is equivalent to saying $X_1 \perp\!\!\!\perp X_3 \mid X_2$ — a testable conditional independence.

> [!example] Dimension count check
> A 5-dimensional vine has $5(5-1)/2 = 10$ pair copulas: $d-1=4$ in tree 1, $d-2=3$ in tree 2, $d-3=2$ in tree 3, and $d-4=1$ in tree 4.
> Each pair copula has its own family and 1–2 parameters, giving 10–20 model parameters total (vs $5\times 4/2 = 10$ parameters in the Gaussian copula with equicorrelation or a full $5\times 5$ correlation matrix).

## Connections

- [[Vine Copulas - Overview]] — the framework within which the factorization operates.
- [[C-Vine and D-Vine Structures]] — apply this decomposition with specific tree shapes (star vs path).
- [[Regular Vines and Structure Selection]] — the general vine; the vine matrix encodes which h-function recursion to apply.
- [[Vine Copula Estimation]] — the log-likelihood is the log of this product; sequential estimation applies the h-function tree by tree.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ for each pair copula governs pairwise dependence strength.

## See Also

- [[Factor Copula Construction]] — no h-function recursion; simulation-based density approximation instead.
- [[../_Index|Econometrics]]
