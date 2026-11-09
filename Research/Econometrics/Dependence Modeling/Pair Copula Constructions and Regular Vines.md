---
title: Pair Copula Constructions and Regular Vines
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.pdf]]"
source_location: "Bedford & Cooke (2001, 2002); Aas et al. (2009), Secs. 2-3"
date_ingested: 2026-11-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Factor Copula Construction]]"
used_by:
  - "[[C-Vine and D-Vine Density]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - Bedford Cooke 2001
  - regular vine
  - R-vine
  - h-function
  - pair copula
---

# Pair Copula Constructions and Regular Vines

> [!summary]
> Bedford & Cooke (2001, 2002) organised Joe's (1996) pair-copula decomposition idea into **regular vines (R-vines)** — a graphical structure of nested trees that ensures the product of bivariate conditional copula densities is a valid joint density. The key computational tool is the **h-function**, which converts a bivariate copula into a conditional CDF, enabling the sequential computation of the conditional arguments needed in deeper trees. R-vines generalise C-vines and D-vines (the two most common special cases) and admit $d!\cdot 2^{d(d-1)/2 - d + 1}/2$ distinct structures for $d$ variables.

## Overview

Joe (1996) first showed that any bivariate conditional copula $C_{X_i X_j | X_k = x_k}(u, v)$ defines a valid conditional distribution, and that products of such copulas can build multivariate densities. The challenge was organisational: for $d$ variables there are many possible conditioning orderings, and not every product of bivariate densities integrates to 1. Bedford & Cooke (2001) solved this with the **regular vine** — a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ where every node in tree $T_{j+1}$ corresponds to an edge in tree $T_j$. Any such sequence, when combined with bivariate copulas on each edge, yields a valid joint density.

## Main Content

### Regular Vine Definition

> [!definition] Regular vine (R-vine) on $d$ variables
> A **regular vine** $\mathcal{V}$ on $d$ variables consists of a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:
>
> 1. **Tree 1:** $T_1 = (N_1, E_1)$ is a connected tree with node set $N_1 = \{1, 2, \ldots, d\}$ and edge set $E_1$. It has $d-1$ edges.
>
> 2. **Nesting:** For $j \geq 2$, the node set of $T_j$ is the edge set of $T_{j-1}$: $N_j = E_{j-1}$.
>
> 3. **Proximity condition:** If two nodes in $T_j$ are joined by an edge, the corresponding edges in $T_{j-1}$ must share a node (i.e. they were "adjacent" in $T_{j-1}$).
>
> Each edge $e = (a, b | D_e) \in E_j$ is labelled by its **conditioned set** $\{a, b\}$ and **conditioning set** $D_e$. The conditioning set consists of the nodes shared by the two $T_{j-1}$ edges that form edge $e$ in $T_j$. Together, $\{a, b\} \cup D_e$ identifies which $j+1$ variables are involved in that pair copula.
>
> **R-vine density:** Given marginals $f_1, \ldots, f_d$ and bivariate copula densities $\{c_{ab|D_e}\}_{e \in E_j, j=1}^{d-1}$, the joint density is:
> $$f(\mathbf{x}) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{e=(a,b|D_e) \in E_j} c_{ab|D_e}\!\left(F(x_a \mid \mathbf{x}_{D_e}),\; F(x_b \mid \mathbf{x}_{D_e});\; \boldsymbol{\theta}_{ab|D_e}\right)$$
> This product has $d(d-1)/2$ pair-copula factors and is a valid $d$-variate density (Bedford & Cooke 2001, Theorem 4.2).
^rvine-def

> [!definition] The h-function (conditional CDF operator)
> For a bivariate copula $C_{UV}(u, v; \theta)$, define:
>
> $$h(u \mid v;\, \theta) \;:=\; \frac{\partial C_{UV}(u, v;\, \theta)}{\partial v} \;=\; P(U \leq u \mid V = v)$$
>
> The h-function converts the copula into the **conditional CDF of $U$ given $V = v$** (after probability integral transform). It is used recursively in the sequential estimation algorithm to compute the conditional arguments $F(x_a \mid \mathbf{x}_{D_e})$ required in deeper trees.
>
> **Closed forms for common families:**
>
> | Copula | $h(u \mid v; \theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1 - \rho^2}}\right)$ |
> | Student-$t$($\rho$, $\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{\dfrac{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)}{\nu+1}}}\right)$ |
> | Clayton($\theta$) | $\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1 - 1/\theta} v^{-\theta - 1}$ |
> | Frank($\theta$) | $\dfrac{e^{-\theta v}(e^{-\theta u} - 1)}{e^{-\theta u} + e^{-\theta v} - e^{-\theta(u+v)} - 1}$ |
>
> The inverse h-function $h^{-1}(p \mid v; \theta)$ (quantile of $U$ given $V$) is used in simulation.
^h-function

### Three-variable illustrative decomposition

> [!example] Trivariate density decomposition (d = 3)
> **Case 1 — C-vine / fan:** Root = variable 1. Tree $T_1$ has edges $(1,2)$ and $(1,3)$. Tree $T_2$ has the single edge $(2,3 | 1)$ (conditioned on variable 1).
>
> Density:
> $$f(x_1, x_2, x_3) = f_1 f_2 f_3 \cdot c_{12}(F_1(x_1), F_2(x_2)) \cdot c_{13}(F_1(x_1), F_3(x_3)) \cdot c_{23|1}(F(x_2|x_1), F(x_3|x_1))$$
>
> **Case 2 — D-vine / path:** Tree $T_1$ has edges $(1,2)$ and $(2,3)$ (a path). Tree $T_2$ has edge $(1,3|2)$.
>
> Density:
> $$f(x_1, x_2, x_3) = f_1 f_2 f_3 \cdot c_{12}(F_1, F_2) \cdot c_{23}(F_2, F_3) \cdot c_{13|2}(F(x_1|x_2), F(x_3|x_2))$$
>
> Both are valid R-vines. They differ only in which conditional dependence is captured at the second level: $c_{23|1}$ vs $c_{13|2}$. For $d=3$ these two are the only non-isomorphic R-vine structures.
^trivariate-example

### Pair copula families

> [!definition] Common bivariate copula families used in vines
> Each edge of the vine can use a different family, chosen by AIC/BIC during estimation:
>
> | Family | Parameter(s) | Tail dependence | Rotation |
> |---|---|---|---|
> | Gaussian | $\rho \in (-1,1)$ | None | — |
> | Student-$t$ | $\rho \in (-1,1)$, $\nu > 2$ | Symmetric ($\tau^U = \tau^L$) | — |
> | Clayton | $\theta > 0$ | Lower only | Yes (90°/180°/270°) |
> | Gumbel | $\theta \geq 1$ | Upper only | Yes |
> | Frank | $\theta \neq 0$ | None | — |
> | Joe | $\theta \geq 1$ | Upper only | Yes |
> | Independence | — | None | — |
>
> **Rotations:** Rotating a Clayton copula by 90° gives upper-tail, 180° gives upper-left, 270° gives lower-right dependence. Rotations effectively provide coverage of all four tail-dependence quadrants from a single asymmetric family.
^copula-families

## Connections

- [[C-Vine and D-Vine Density]] — explicit density formulas for the two special cases, with the C-vine/D-vine structure definitions.
- [[Vine Copula Estimation]] — the sequential ML algorithm uses the h-function to recurse through the tree hierarchy.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ can be computed analytically for each pair copula family and used for estimation targets.
- [[Factor Copula Construction]] — contrasting latent-variable architecture.
- [[Copula Estimation]] — bivariate Bayesian copula estimation; the h-function and pair-copula families also appear in that context.

## See Also

- [[../_Index|Econometrics]]
