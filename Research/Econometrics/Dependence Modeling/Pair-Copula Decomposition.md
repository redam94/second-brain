---
title: "Pair-Copula Decomposition"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Aas-Czado-Frigessi-Bakken-2009-Pair-Copula-Constructions.md]]"
source_location: "Sec. 2, pp. 183-187"
date_ingested: 2026-11-03
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - h-function
  - pair copula density formula
  - Rosenblatt transform copula
  - conditional copula
---

# Pair-Copula Decomposition

> [!summary]
> Any *d*-dimensional density can be written as the product of *d* univariate marginal densities and *d(d-1)/2* **bivariate copula densities** applied to conditional CDFs. The key recursive tool is the **h-function**: $h(x \mid v, \theta) = F(x \mid v)$, the conditional CDF of $X$ given $V$ expressed via a bivariate copula. Together the decomposition and h-functions give a complete algorithm for evaluating the vine copula density and simulating from it.

## Overview

The density decomposition is the mathematical heart of vine copulas. It shows that the full *d*-dimensional density requires only bivariate marginal and conditional copulas — no *d*-dimensional copula density is needed. This makes vine copulas computationally tractable: standard bivariate copula software (Clayton, Gumbel, Student-*t*, etc.) is all that is needed at each step.

The decomposition traces to **Joe (1996)** (the original bivariate conditional decomposition idea) and was made precise and systematic by **Bedford & Cooke (2001, 2002)** via the regular vine graphical structure. **Aas et al. (2009)** provided the explicit D-vine and C-vine density formulas, the h-function recursion, and sequential estimation algorithms.

## Main Content

> [!theorem] General density decomposition (Joe 1996; Bedford & Cooke 2002)
> For any *d*-dimensional density $f(x_1, \ldots, x_d)$, the following factorisation holds:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{\ell=1}^{d-1} \prod_{(i,j|D) \in E_\ell} c_{ij|D}\!\left(F(x_i \mid \mathbf{x}_D),\; F(x_j \mid \mathbf{x}_D)\right)$$
> where:
> - $E_\ell$ are the edges of tree $T_\ell$ in a valid regular vine
> - $D$ is the **conditioning set** (the variables shared between the two edge-nodes in $T_\ell$)
> - $c_{ij|D}(\cdot, \cdot)$ is the bivariate copula density for $(X_i, X_j)$ conditional on $\mathbf{X}_D = \mathbf{x}_D$
> - $F(x_i \mid \mathbf{x}_D)$ is the conditional CDF of $X_i$ given $\mathbf{X}_D = \mathbf{x}_D$
>
> **Key implication:** The total number of pair-copulas is $\sum_{\ell=1}^{d-1}(d-\ell) = d(d-1)/2$, which equals the number of distinct pairs in a *d*-dimensional distribution.
^thm-general-decomp

> [!definition] The h-function (conditional CDF via bivariate copula)
> For a bivariate copula $C_{XY}(u, v; \theta)$ with density $c_{XY}$, the **h-function** is:
> $$h(x \mid y, \theta) \;:=\; F(x \mid y) \;=\; \frac{\partial C_{XY}(F_X(x),\, F_Y(y);\, \theta)}{\partial F_Y(y)}$$
> This is the conditional CDF of $X$ given $Y = y$, expressed using the copula $C_{XY}$ and marginal CDFs $F_X, F_Y$.
>
> **Role in vine copulas:** At each tree level $\ell \geq 2$, the conditioning arguments $F(x_i \mid \mathbf{x}_D)$ are computed from h-functions at the previous tree level. This creates a **recursive algorithm**: h-functions "pass information up" through the vine tree sequence.
>
> **Notation:** Some authors write $h_{12}(x_1 | x_2) := F(x_1 | x_2)$ for the conditioning on the second argument and $h_{21}(x_2 | x_1) := F(x_2 | x_1)$ for the reverse.
^def-h-function

> [!theorem] D-vine density (Aas et al. 2009, eq. 4)
> For a *d*-dimensional D-vine with ordering $(1, 2, \ldots, d)$, the joint density is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j\,|\,i+1,\ldots,i+j-1}\!\bigl(F(x_i\,|\,x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}\,|\,x_{i+1},\ldots,x_{i+j-1})\bigr)$$
>
> **Structure interpretation:** For $j = 1$ (tree $T_1$): unconditional bivariate copulas $c_{12}, c_{23}, \ldots, c_{d-1,d}$ — adjacent pairs. For $j = 2$ (tree $T_2$): conditional copulas $c_{13|2}, c_{24|3}, \ldots$ — pairs at lag 2 conditional on intermediate variable. And so on up to $c_{1d|2,\ldots,d-1}$ at tree $T_{d-1}$.
>
> **Example** ($d = 4$): The 6 pair-copulas are:
> - $T_1$: $c_{12}$, $c_{23}$, $c_{34}$
> - $T_2$: $c_{13|2}$, $c_{24|3}$
> - $T_3$: $c_{14|23}$
^thm-d-vine-density

> [!theorem] C-vine density (Aas et al. 2009, eq. 3)
> For a *d*-dimensional C-vine with root variable $X_1$ at each tree level (i.e. $X_1$ is the key variable), the joint density is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=2}^{d-j+1} c_{1,i|2,\ldots,i-1}\!\bigl(F(x_1\,|\,x_2,\ldots,x_{i-1}),\; F(x_i\,|\,x_2,\ldots,x_{i-1})\bigr)$$
>
> **Structure interpretation:** At each tree $T_j$, the root $X_1$ is connected to all remaining variables. The conditioning set grows as we go deeper in the tree sequence.
>
> **Example** ($d = 4$): The 6 pair-copulas are:
> - $T_1$: $c_{12}$, $c_{13}$, $c_{14}$  (root $X_1$ connects to $X_2, X_3, X_4$)
> - $T_2$: $c_{23|1}$, $c_{24|1}$  (root $X_2$ connects to $X_3, X_4$ conditional on $X_1$)
> - $T_3$: $c_{34|12}$  (root $X_3$ connects to $X_4$ conditional on $X_1, X_2$)
^thm-c-vine-density

> [!definition] Simplifying assumption: conditional copula independence
> In practice, evaluating the pair-copula $c_{ij|D}(F(x_i|\mathbf{x}_D), F(x_j|\mathbf{x}_D))$ exactly requires computing the h-functions at all previous tree levels — a correct but complex recursion. The **simplifying assumption** (standard in applied work) sets:
> $$c_{ij|D}(u, v) \approx c_{ij|D}(u, v; \hat{\theta}_{ij|D})$$
> using a fixed bivariate copula family $c_{ij|D}$ with parameters $\hat{\theta}_{ij|D}$ estimated from pseudo-observations $\hat{F}(x_i|\mathbf{x}_D), \hat{F}(x_j|\mathbf{x}_D)$. This ignores the dependence of the bivariate copula on the conditioning value — an approximation valid when the conditioning set has weak influence on the bivariate dependence structure.
^def-simplifying

## Examples

> [!example] H-function for the bivariate Gaussian copula
> For the Gaussian copula $C_\rho(u, v) = \Phi_2(\Phi^{-1}(u), \Phi^{-1}(v); \rho)$ where $\Phi_2$ is the bivariate standard normal CDF:
> $$h(x_1|x_2, \rho) = \Phi\!\left(\frac{\Phi^{-1}(F_1(x_1)) - \rho\,\Phi^{-1}(F_2(x_2))}{\sqrt{1-\rho^2}}\right)$$
> This is a standard normal CDF evaluated at the partial regression residual.

> [!example] H-function for the Clayton copula
> For the Clayton copula $C_\theta(u, v) = (u^{-\theta} + v^{-\theta} - 1)^{-1/\theta}$:
> $$h(u|v, \theta) = v^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1/\theta - 1}$$
> Note the asymmetry: $h(u|v, \theta) \neq h(v|u, \theta)$ — the Clayton copula is asymmetric, so the order of arguments matters.

> [!example] D-vine simulation algorithm (Aas et al. 2009)
> To draw $(x_1, \ldots, x_d)$ from a $d$-dimensional D-vine:
> 1. Draw $u_1 \sim \text{Uniform}(0,1)$; set $x_1 = F_1^{-1}(u_1)$.
> 2. For $k = 2, 3, \ldots, d$:
>    a. Draw $w_k \sim \text{Uniform}(0,1)$.
>    b. Set $u_k = h^{-1}(w_k \mid u_{k-1}, \hat{\theta}_{k-1,k})$ — the **inverse h-function** (quantile of the conditional distribution).
>    c. Apply h-function updates through previous conditioning levels (Rosenblatt transform in reverse).
>    d. Set $x_k = F_k^{-1}(u_k)$.
>
> The inverse h-function $h^{-1}$ requires numerical inversion for most copula families; closed forms exist for Gaussian and Clayton.

## Connections

- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[C-Vine and D-Vine Structures]] — graphical structures that determine the ordering of pair-copulas.
- [[Vine Copula Estimation and Selection]] — sequential MLE using h-functions, and how to choose the tree structure.
- [[Dependence Measures for Copulas]] — rank correlation and tail dependence measures also apply to each pair-copula.
- [[Tail Dependence in Factor Copulas]] — tail dependence in vine copulas is determined by the pair-copula families at tree $T_1$ (where conditioning sets are empty).

## See Also

- [[Factor Copula Construction]] — contrast: factor copulas do not have closed-form density; vine copulas do (via this decomposition) and use MLE.
- Joe (1996) — *Multivariate Models and Dependence Concepts*, Chapman & Hall — original density decomposition.
- Bedford & Cooke (2001) — *Annals of Statistics* 29(4) — regular vine graphical structure.
- [[../_Index|Econometrics]]
