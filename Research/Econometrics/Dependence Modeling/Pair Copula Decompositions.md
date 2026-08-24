---
title: "Pair Copula Decompositions"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Aas-2009-vine-copulas-source-notes.md]]"
source_location: "Aas et al. (2009), Sec. 2-3; Bedford & Cooke (2002)"
date_ingested: 2026-08-24
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - h-function
  - pair copula
  - conditional copula density
  - vine density factorization
---

# Pair Copula Decompositions

> [!summary]
> A pair copula decomposition (PCC) expresses a $d$-dimensional joint density as a product of univariate marginals and $d(d-1)/2$ bivariate pair-copula densities. The decomposition is built by repeatedly applying Sklar's theorem to conditional distributions, using the **h-function** (a conditional CDF from a bivariate copula) to propagate transformed variables from one tree level to the next. Different orderings and tree structures yield different but equivalent decompositions; the canonical (C-vine) and drawable (D-vine) vine structures are the most commonly used choices.

## Overview

The starting point is the standard chain rule of probability:
$$f(x_1,\ldots,x_d) = f_1(x_1) \cdot f_{2|1}(x_2|x_1) \cdot f_{3|1,2}(x_3|x_1,x_2) \cdots f_{d|1,\ldots,d-1}(x_d|x_1,\ldots,x_{d-1})$$

Each conditional density $f_{k|1,\ldots,k-1}$ can, by Sklar's theorem applied to the conditional bivariate distribution $(X_k, X_j | \mathbf{X}_D)$, be written in terms of a bivariate copula density:
$$f_{k|j,D}(x_k|x_j,\mathbf{x}_D) = c_{kj|D}\!\left(F_{k|D}(x_k|\mathbf{x}_D),\, F_{j|D}(x_j|\mathbf{x}_D)\right) \cdot f_{k|D}(x_k|\mathbf{x}_D)$$

Applying this recursively across all $d-1$ trees of the vine yields a complete product-of-bivariate-copulas factorization.

## Main Content

### The h-function

The key computational object is the **h-function**, which computes one conditional CDF from a fitted bivariate copula.

> [!definition] h-function
> For a bivariate copula $C(u,v;\theta)$ with density $c(u,v;\theta)$, define:
> $$h(u \mid v;\theta) := F_{U|V}(u|v;\theta) = \frac{\partial C(u,v;\theta)}{\partial v}$$
> This is the conditional CDF of $U$ given $V=v$ under the copula $C$.
>
> **Notation:** We write $h_1(u|v;\theta) = \partial C/\partial v$ (conditioning on the second argument) and $h_2(u|v;\theta) = \partial C/\partial u$ (conditioning on the first argument). Different vine structures require different $h$ and $h^{-1}$ directions.
^def-hfunction

The h-function allows computation of any required conditional probability transform in closed form given the bivariate copula parameters. Common examples:

| Copula family | $h(u \mid v; \theta)$ |
|---|---|
| Gaussian $(\rho)$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho \,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Student-$t$ $(\rho,\nu)$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
| Clayton $(\theta>0)$ | $\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1/\theta - 1} \cdot v^{-\theta-1}$ |
| Gumbel $(\theta\geq 1)$ | $\frac{C(u,v;\theta)}{v} \cdot \left((-\ln v)^{\theta-1} \cdot \bigl[(-\ln u)^\theta + (-\ln v)^\theta\bigr]^{1/\theta - 1}\right)$ |

### Density factorization for $d=3$

For three variables $(X_1, X_2, X_3)$ with marginals $F_1, F_2, F_3$ and marginal densities $f_1, f_2, f_3$, the unique PCC (up to ordering choice) is:
$$f(x_1,x_2,x_3) = f_1(x_1)\, f_2(x_2)\, f_3(x_3) \cdot c_{12}(u_1,u_2) \cdot c_{23}(u_2,u_3) \cdot c_{13|2}\!\left(h(u_1|u_2;\theta_{12}),\; h(u_3|u_2;\theta_{23})\right)$$

where $u_i = F_i(x_i)$ are probability integral transforms and $h(\cdot|\cdot)$ is the h-function of the first-tree copula.

For $d=3$, there is only one tree-2 edge (the three-variable case has $3 \cdot 2/2 = 3$ pair copulas total, placed in 2 trees with 2 and 1 edges respectively). The C-vine and D-vine coincide.

### Density factorization for $d=4$

For four variables, there are $4\cdot 3/2 = 6$ pair copulas in 3 trees.

> [!example] D-vine for $d=4$ (ordering $1-2-3-4$)
> **Tree 1** (3 edges): $C_{12}$, $C_{23}$, $C_{34}$
> **Tree 2** (2 edges): $C_{13|2}$, $C_{24|3}$
> **Tree 3** (1 edge): $C_{14|23}$
>
> The full density is:
> $$f(x_1,x_2,x_3,x_4) = \prod_{i=1}^4 f_i(x_i) \cdot c_{12}(u_1,u_2)\cdot c_{23}(u_2,u_3)\cdot c_{34}(u_3,u_4)$$
> $$\cdot\; c_{13|2}\!\left(u_{1|2}, u_{3|2}\right) \cdot c_{24|3}\!\left(u_{2|3}, u_{4|3}\right)$$
> $$\cdot\; c_{14|23}\!\left(u_{1|23}, u_{4|23}\right)$$
>
> where the transformed variables are:
> - $u_{1|2} = h(u_1|u_2;\theta_{12})$, $\;u_{3|2} = h(u_3|u_2;\theta_{23})$
> - $u_{2|3} = h(u_2|u_3;\theta_{23})$, $\;u_{4|3} = h(u_4|u_3;\theta_{34})$
> - $u_{1|23} = h(u_{1|2}|u_{3|2};\theta_{13|2})$, $\;u_{4|23} = h(u_{4|3}|u_{2|3};\theta_{24|3})$
^ex-dvine-d4

> [!example] C-vine for $d=4$ (root variable $1$)
> **Tree 1** (3 edges): $C_{12}$, $C_{13}$, $C_{14}$ (variable 1 is hub)
> **Tree 2** (2 edges): $C_{23|1}$, $C_{24|1}$ (variable 2 becomes hub, conditioning on 1)
> **Tree 3** (1 edge): $C_{34|12}$
>
> The full density is:
> $$f(x_1,x_2,x_3,x_4) = \prod_{i=1}^4 f_i(x_i) \cdot c_{12}(u_1,u_2)\cdot c_{13}(u_1,u_3)\cdot c_{14}(u_1,u_4)$$
> $$\cdot\; c_{23|1}\!\left(u_{2|1}, u_{3|1}\right) \cdot c_{24|1}\!\left(u_{2|1}, u_{4|1}\right)$$
> $$\cdot\; c_{34|12}\!\left(u_{3|12}, u_{4|12}\right)$$
>
> where:
> - $u_{i|1} = h(u_i|u_1;\theta_{1i})$ for $i=2,3,4$
> - $u_{3|12} = h(u_{3|1}|u_{2|1};\theta_{23|1})$, $\;u_{4|12} = h(u_{4|1}|u_{2|1};\theta_{24|1})$
^ex-cvine-d4

### Non-uniqueness of the factorization

For $d\geq 3$, there are **multiple valid PCCs** corresponding to different orderings of variables and different vine tree structures. All are exact (no approximation) if the full conditional copulas $c_{jk|D}$ are correctly specified. The simplifying assumption (see [[Vine Copulas - Overview#^def-simplifying]]) makes all orderings estimable from data, but the estimates will differ if the assumption is violated — which means the vine structure choice matters in practice.

For $d$ variables, the number of distinct R-vine structures is $\frac{d!}{2} \cdot \prod_{i=0}^{d-3}\binom{d-i}{2}^{?}$ — growing super-exponentially, so structure selection algorithms (see [[Vine Copula Estimation]]) are essential for $d\geq 5$.

## Connections

- [[Vine Copulas - Overview]] — motivation and position in the literature.
- [[C-Vine and D-Vine Structures]] — graphical representation of the vine trees; when each is preferred.
- [[Vine Copula Estimation]] — how to estimate the parameters $\theta_{jk|D}$ at each edge using sequential MLE.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, and quantile dependence for each pair copula.
- [[Copula Architecture Comparison]] — comparing the PCC architecture to factor copulas and standard parametric copulas.
- [[Factor Copula Construction]] — the alternative: latent factor model copula, no tree structure, analytical tail dependence.

## See Also

- [[Tail Dependence in Factor Copulas]] — for contrast: factor copulas yield tail dependence analytically via EVT; vine copulas get tail dependence through the chosen pair-copula families (e.g., $t$ or Clayton edges).
