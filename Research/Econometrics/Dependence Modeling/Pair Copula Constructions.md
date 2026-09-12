---
title: Pair Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Czado-Survey.md]]"
source_location: "Aas et al. (2009), Secs. 2-3; Czado (2019), Ch. 3"
date_ingested: 2026-09-12
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - PCC
  - h-function
  - conditional copula density
  - pair copula density
---

# Pair Copula Constructions

> [!summary]
> Pair copula constructions (PCCs) formalise the sequential decomposition of a multivariate density into bivariate building blocks. The key computational primitive is the **$h$-function** — the conditional CDF of one variable given another, expressed through a bivariate copula. Sequential estimation proceeds tree-by-tree: after fitting tree $k$, one applies $h$-functions to transform the pseudo-observations before fitting tree $k+1$. This note covers the formal PCC decomposition, the $h$-function for common families, and how they combine to yield the full $n$-dimensional density.

## Overview

The central insight of pair-copula constructions is that any conditional density $f_{i|\mathbf{v}}(x_i | \mathbf{v})$ can be expressed using a bivariate copula between $x_i$ and any element of $\mathbf{v}$, plus a recursion on the remaining conditioning variables. This allows a full $n$-dimensional density to be decomposed into a product of $n(n-1)/2$ bivariate copula densities and $n$ marginal densities — without any distributional restrictions on the bivariate copulas chosen.

## Main Content

### The $h$-Function

> [!definition] $h$-Function (Conditional CDF)
> For a bivariate copula $C_{12}(u_1, u_2; \theta)$ with parameter $\theta$, the **$h$-function** is the conditional CDF of $U_1$ given $U_2 = u_2$:
> $$h(u_1 \mid u_2; \theta) \;:=\; \frac{\partial C_{12}(u_1, u_2; \theta)}{\partial u_2}$$
>
> This equals $F_{1|2}(F_1^{-1}(u_1) | F_2^{-1}(u_2))$ — the conditional CDF of $X_1$ given $X_2 = x_2$, evaluated at $x_1$, then transformed through the marginal of $X_1$.
>
> **Key property:** $h(u_1 | u_2; \theta)$ maps $[0,1]^2 \to [0,1]$ and is uniform on $[0,1]$ for fixed $u_2$ if $C_{12}$ is the correct copula. This makes it directly usable as a pseudo-observation for higher-tree pair copulas.
^def-hfunction

> [!definition] $h$-Functions for Common Bivariate Copulas
>
> **Gaussian copula** $C(u_1, u_2; \rho)$:
> $$h(u_1 | u_2; \rho) = \Phi\!\left(\frac{\Phi^{-1}(u_1) - \rho\,\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$$
>
> **Student-$t$ copula** $C(u_1, u_2; \rho, \nu)$:
> $$h(u_1 | u_2; \rho, \nu) = t_{\nu+1}\!\!\left(\frac{t_\nu^{-1}(u_1) - \rho\, t_\nu^{-1}(u_2)}{\sqrt{\frac{(\nu + (t_\nu^{-1}(u_2))^2)(1-\rho^2)}{\nu+1}}}\right)$$
>
> **Clayton copula** $C(u_1, u_2; \theta)$ ($\theta > 0$):
> $$h(u_1 | u_2; \theta) = u_2^{-\theta-1}\!\left(u_1^{-\theta} + u_2^{-\theta} - 1\right)^{-1-1/\theta}$$
>
> **Gumbel copula** $C(u_1, u_2; \theta)$ ($\theta \geq 1$):
> $$h(u_1 | u_2; \theta) = C(u_1, u_2; \theta) \cdot \frac{1}{u_2} \cdot \frac{(-\log u_2)^{\theta-1}}{\left((-\log u_1)^\theta + (-\log u_2)^\theta\right)^{1-1/\theta}}$$
>
> The $h$-function is implemented for all standard families in the `VineCopula` R package and the `pyvinecopulib` Python library.
^def-hfunction-families

### PCC Sequential Density Evaluation

> [!definition] 4-Variable D-Vine Density (Explicit)
> For a D-vine on variables $X_1, X_2, X_3, X_4$ with ordering $1-2-3-4$, the joint density is:
>
> $$f(x_1, x_2, x_3, x_4) = \bigl[f_1 f_2 f_3 f_4\bigr] \cdot \bigl[c_{12}(u_1, u_2) \cdot c_{23}(u_2, u_3) \cdot c_{34}(u_3, u_4)\bigr]$$
> $$\cdot \bigl[c_{13|2}(u_{1|2}, u_{3|2}) \cdot c_{24|3}(u_{2|3}, u_{4|3})\bigr] \cdot \bigl[c_{14|23}(u_{1|23}, u_{4|23})\bigr]$$
>
> where the $u$ arguments are defined recursively:
>
> | Argument | Formula | Level |
> |---|---|---|
> | $u_{1|2}$ | $h(u_1 \mid u_2; \theta_{12})$ | Tree 2 |
> | $u_{3|2}$ | $h(u_3 \mid u_2; \theta_{23})$ | Tree 2 |
> | $u_{2|3}$ | $h(u_2 \mid u_3; \theta_{23})$ | Tree 2 |
> | $u_{4|3}$ | $h(u_4 \mid u_3; \theta_{34})$ | Tree 2 |
> | $u_{1|23}$ | $h(u_{1|2} \mid u_{3|2}; \theta_{13|2})$ | Tree 3 |
> | $u_{4|23}$ | $h(u_{4|3} \mid u_{2|3}; \theta_{24|3})$ | Tree 3 |
>
> The pair copula $c_{14|23}$ takes inputs $(u_{1|23}, u_{4|23})$ from tree 2 $h$-function outputs.
^def-4var-density

> [!definition] 4-Variable C-Vine Density (Explicit)
> For a C-vine on $X_1, X_2, X_3, X_4$ with root ordering $1, 2, 3$ (variable 1 is the root of tree 1, variable 2 is the root of tree 2, etc.):
>
> **Tree 1** (root = var 1): pairs $(1,2), (1,3), (1,4)$
> **Tree 2** (root = var 2, conditioning on var 1): pairs $(2,3|1), (2,4|1)$
> **Tree 3** (conditioning on vars 1,2): pair $(3,4|1,2)$
>
> $$f(x_1, x_2, x_3, x_4) = \bigl[f_1 f_2 f_3 f_4\bigr]$$
> $$\cdot \bigl[c_{12}(u_1, u_2) \cdot c_{13}(u_1, u_3) \cdot c_{14}(u_1, u_4)\bigr]$$
> $$\cdot \bigl[c_{23|1}(u_{2|1}, u_{3|1}) \cdot c_{24|1}(u_{2|1}, u_{4|1})\bigr]$$
> $$\cdot \bigl[c_{34|12}(u_{3|12}, u_{4|12})\bigr]$$
>
> where $u_{2|1} = h(u_2|u_1; \theta_{12})$, $u_{3|1} = h(u_3|u_1; \theta_{13})$, etc.
^def-4var-cvine

### Relation to Conditional Density

> [!theorem] Pair-Copula Representation of Conditional Densities
> For any pair $(X_i, X_j)$ conditionally on a set $\mathbf{V} = \mathbf{v}$, the conditional density of $X_i$ given $X_j = x_j$ and $\mathbf{V}=\mathbf{v}$ is:
> $$f_{i|j\mathbf{v}}(x_i | x_j, \mathbf{v}) = c_{ij|\mathbf{v}}\!\left(F_{i|\mathbf{v}}(x_i|\mathbf{v}),\, F_{j|\mathbf{v}}(x_j|\mathbf{v})\right) \cdot f_{i|\mathbf{v}}(x_i|\mathbf{v})$$
> where $c_{ij|\mathbf{v}}$ is the conditional copula density of $(X_i, X_j)$ given $\mathbf{V}=\mathbf{v}$.
>
> Under the **simplifying assumption** (see [[Vine Copulas - Overview#^def-simplifying]]), $c_{ij|\mathbf{v}} = c_{ij|\mathbf{v}}(u, v)$ for all $\mathbf{v}$ — the copula family and parameters do not depend on the conditioning value $\mathbf{v}$, only on the conditional CDFs $u = F_{i|\mathbf{v}}$ and $v = F_{j|\mathbf{v}}$.
^thm-cond-density

## Examples

> [!example] Simulating from a D-Vine
> **Setup:** $n=3$, D-vine: $1-2-3$. Pair copulas: $C_{12}$ (Clayton, $\theta=2$), $C_{23}$ (Gumbel, $\theta=1.5$), $C_{13|2}$ (Gaussian, $\rho=0.4$). Marginals: all standard normal.
>
> **Simulation algorithm:**
> 1. Draw $u_1 \sim U[0,1]$
> 2. Draw $u_2 \sim U[0,1]$; transform to get $u_{2|\text{cond}}$ via $h^{-1}$: use $C_{12}$ to get the joint uniform pair $(u_1, u_2)$ correctly
> 3. Draw $u_{3|2} \sim U[0,1]$; apply $h^{-1}$-function of $C_{23}$ at $u_2$: $u_3 = h^{-1}(u_{3|2} | u_2; C_{23})$ giving the marginal-uniform $u_3$
> 4. Apply $h$-function to get $u_{1|2} = h(u_1|u_2; C_{12})$, $u_{3|2}$ already has been drawn
> 5. The conditional copula $C_{13|2}$ takes $(u_{1|2}, u_{3|2})$ as inputs
> 6. Transform to original scale: $x_i = \Phi^{-1}(u_i)$
>
> **Key insight:** The $h^{-1}$-function (inverse of $h$ in the first argument) is needed for simulation, while the $h$-function itself is needed for density evaluation and sequential estimation.

## Connections

- [[Vine Copulas - Overview]] — the big picture of PCCs in the dependence modelling landscape.
- [[C-Vine and D-Vine Structures]] — the vine tree structures that determine which $h$-functions are applied in sequence.
- [[Vine Copula Estimation]] — how $h$-functions enable tree-by-tree sequential MLE.
- [[Factor Copulas - Overview]] — compare: factor copulas have no closed-form density (simulated); vine copulas have an explicit product density via PCC.
- [[Copula Estimation]] — the Bayesian Gaussian-copula estimation; contrast the Gaussian copula's single closed-form density with the vine's product-of-pair-copulas density.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and rank-based dependence measures used in tree selection and goodness of fit.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — broader context for simulation-based estimation methods.
