---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009) — 'Pair-copula constructions of multiple dependence'"
source_location: "Secs. 2–3, pp. 182–189; Insurance: Mathematics and Economics 44(2):182–198 (PDF unavailable — network policy blocks download)"
date_ingested: 2026-10-31
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Graphs]]"
used_by:
  - "[[C-Vines and D-Vines]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - h-function
  - PCC density
  - vine copula density
  - conditional copula distribution
---

# Pair Copula Construction

> [!summary]
> The **pair copula construction** (PCC) expresses a multivariate density as a product of univariate marginal densities and bivariate (conditional) copula densities, organised by a vine graph. The key computational tool is the **$h$-function** — the partial derivative of a bivariate copula CDF with respect to one of its arguments — which converts conditional distribution evaluations into recursive applications of already-fitted bivariate copulas. Aas et al. (2009) made the PCC computable for arbitrary vines.

## Overview

The vine graph (see [[Regular Vine Graphs]]) specifies *which* pairs to model and with *what* conditioning sets. The density factorisation theorem says the joint density is a product over vine edges of bivariate conditional copula densities. To evaluate this product, one needs conditional CDFs $F(y_j | \mathbf{y}_D)$ at each tree level — and these are computed from the bivariate copulas already estimated in lower trees via the $h$-function.

This recursive computation is what makes PCCs numerically feasible. It was first written down in this form by Aas et al. (2009), synthesising earlier theoretical work by Joe (1996) and Bedford & Cooke (2002).

## Main Content

> [!definition] PCC density — general formula
> Let $(Y_1, \dots, Y_n)$ have marginals $F_i$ and let $\mathcal{V} = (T_1, \dots, T_{n-1})$ be a regular vine. Define $u_i = F_i(y_i)$. The joint density is:
> $$ f(\mathbf{y}) = \prod_{i=1}^{n} f_i(y_i) \times \prod_{k=1}^{n-1} \prod_{e \in \mathcal{E}_k} c_{j(e),k(e)|D(e)}\!\bigl(F(y_{j(e)} | \mathbf{y}_{D(e)}),\, F(y_{k(e)} | \mathbf{y}_{D(e)})\bigr) $$
> where $c_{j,k|D}$ is a bivariate copula density (may differ in family across edges), and the conditional CDFs $F(y_j | \mathbf{y}_D)$ are evaluated via the $h$-function recursion below.
^def-pcc-density

> [!definition] The $h$-function
> For a bivariate copula $C(u, v; \theta)$ with parameter(s) $\theta$, define:
> $$ h(u \mid v;\, \theta) \;=\; \frac{\partial\, C(u, v;\, \theta)}{\partial v} $$
> This is the conditional CDF of $U$ given $V = v$ when $(U, V)$ have copula $C$. In the context of the vine:
> $$ F(y_j \mid \mathbf{y}_D) = h\!\bigl(F(y_j \mid \mathbf{y}_{D \setminus \{m\}}),\; F(y_m \mid \mathbf{y}_{D \setminus \{m\}})\bigm|\, \theta_{j,m \mid D \setminus \{m\}}\bigr) $$
> where $m$ is any element of $D$ (the conditioning set), and the arguments are themselves $h$-function values computed from lower tree levels. The recursion bottoms out at $h(u \mid v; \theta) = \partial C(u,v;\theta)/\partial v$ applied to raw probability-integral-transform arguments $u = F_j(y_j)$, $v = F_m(y_m)$.
>
> **Key insight:** every conditional CDF in the vine decomposes into nested $h$-function calls on bivariate copulas already estimated at lower tree levels.
^def-h-function

> [!definition] $h$-functions for common bivariate copula families
> Closed-form $h$-functions exist for all standard copula families:
>
> | Copula family | $C(u,v;\theta)$ | $h(u \mid v;\theta) = \partial C/\partial v$ |
> |---|---|---|
> | Gaussian | $\Phi_2(\Phi^{-1}(u), \Phi^{-1}(v);\rho)$ | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t(\nu)$ | $t_{\nu,\rho}(t_\nu^{-1}(u), t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\sqrt{\tfrac{\nu+1}{\nu+1-(t_\nu^{-1}(v))^2}} \cdot \dfrac{t_\nu^{-1}(u)-\rho\,t_\nu^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton$(\theta>0)$ | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel$(\theta\geq1)$ | $\exp[{-((-\ln u)^\theta+(-\ln v)^\theta)^{1/\theta}}]$ | $C(u,v)\,\dfrac{(-\ln v)^{\theta-1}}{v\,[(-\ln u)^\theta+(-\ln v)^\theta]^{1-1/\theta}}$ |
>
> These closed forms make the $h$-function recursion computationally cheap — no numerical integration needed.
^def-h-families

> [!definition] Simulation from a vine copula
> Simulation proceeds by inverting the $h$-function recursion:
> 1. Draw $u_1, w_2, \dots, w_n \sim \text{Uniform}(0,1)$ independently.
> 2. Set $u_2 = h^{-1}(w_2 \mid u_1;\, \theta_{12})$ where $h^{-1}(w \mid v;\theta)$ inverts $h(\cdot \mid v;\theta)$ numerically.
> 3. For the D-vine ordering, apply sequential inversions of $h$-functions up the tree hierarchy, solving for each $u_k$ given previously-computed values.
>
> The structure of the vine determines the exact order of inversions. For the C-vine and D-vine cases, closed-form algorithms are given in [[C-Vines and D-Vines]].
^def-simulation

## Examples

> [!example] Three-variable PCC computation step-by-step
> **Setup:** D-vine $1{-}2{-}3$, marginals $F_1, F_2, F_3$, pair copulas $C_{12}(\theta_{12})$, $C_{23}(\theta_{23})$, $C_{13|2}(\theta_{13|2})$.
>
> **Density evaluation at $(y_1, y_2, y_3)$:**
>
> Step 1: Compute marginal PIT values $u_i = F_i(y_i)$.
>
> Step 2: $T_1$ contribution: $c_{12}(u_1, u_2;\theta_{12}) \times c_{23}(u_2, u_3;\theta_{23})$.
>
> Step 3: Compute conditional CDFs for $T_2$:
> $$v_{1|2} = h(u_1 \mid u_2;\, \theta_{12}), \quad v_{3|2} = h(u_3 \mid u_2;\, \theta_{23})$$
>
> Step 4: $T_2$ contribution: $c_{13|2}(v_{1|2},\, v_{3|2};\, \theta_{13|2})$.
>
> Step 5: Joint density: $f_1(y_1)\cdot f_2(y_2)\cdot f_3(y_3) \times c_{12}\times c_{23}\times c_{13|2}$.
>
> **Interpretation:** The $h$-function $h(u_1 | u_2; \theta_{12})$ is the conditional CDF of $Y_1$ given $Y_2 = y_2$, computed directly from the already-fitted bivariate copula $C_{12}$ — no parametric model for $F(Y_1|Y_2)$ is required beyond the copula.

> [!example] Four-variable C-vine $h$-function computation
> **Setup:** C-vine with root node 1 in $T_1$. Pair copulas: $C_{12}, C_{13}, C_{14}$ in $T_1$; $C_{23|1}, C_{24|1}$ in $T_2$; $C_{34|12}$ in $T_3$.
>
> **Conditional CDFs needed for $T_2$:**
> $$v_{2|1} = h(u_2 \mid u_1;\, \theta_{12}), \quad v_{3|1} = h(u_3 \mid u_1;\, \theta_{13}), \quad v_{4|1} = h(u_4 \mid u_1;\, \theta_{14})$$
>
> **$T_2$ density terms:** $c_{23|1}(v_{2|1}, v_{3|1})$ and $c_{24|1}(v_{2|1}, v_{4|1})$.
>
> **Conditional CDFs for $T_3$:**
> $$v_{3|12} = h(v_{3|1} \mid v_{2|1};\, \theta_{23|1}), \quad v_{4|12} = h(v_{4|1} \mid v_{2|1};\, \theta_{24|1})$$
>
> **$T_3$ density term:** $c_{34|12}(v_{3|12}, v_{4|12})$.
>
> This illustrates how each level of the vine tree corresponds to one additional application of the $h$-function, building up the conditioning set one variable at a time.

## Connections

- [[Regular Vine Graphs]] — the tree structure $(T_1, \dots, T_{n-1})$ that organises the pair copulas.
- [[C-Vines and D-Vines]] — explicit density formulas for the two canonical restricted vines, with full $h$-function recursions.
- [[Vine Copula Estimation and Selection]] — sequential MLE uses the $h$-function to compute pseudo-observations for higher tree levels.
- [[Factor Copula Construction]] — contrast: factor copulas have no $h$-function recursion; they use simulation and rank-based moments instead.

## See Also

- [[Copula Estimation]] — bivariate Bayesian Gaussian copula; the $h$-function is not needed for bivariate models (no conditioning required).
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence computed from both bivariate copulas (vine building blocks) and full vine models.
- [[../_Index|Econometrics]]
