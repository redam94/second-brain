---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-BedfordCooke-Survey.md]]"
source_location: "Aas et al. (2009) §2-3, pp. 183-191; Bedford & Cooke (2002) §3-4, pp. 1040-1058"
date_ingested: 2026-07-03
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Software]]"
aliases:
  - pair-copula density
  - h-function vine
  - PCC factorization
  - vine density decomposition
---

# Pair-Copula Construction

> [!summary]
> The **pair-copula construction (PCC)** provides the formal machinery for vine copulas: any $n$-dimensional density can be factored into $n$ univariate densities times $n(n-1)/2$ **bivariate copula densities** (called pair copulas), where pair copulas at higher tree levels act on **conditional CDFs** computed from lower levels. The **h-function** is the core primitive: it computes the conditional CDF of $X$ given $V$ from their bivariate copula, enabling recursive propagation through the vine. Under the **simplifying assumption** (conditional copulas constant in the conditioning value), this becomes a fully explicit, computationally feasible factorization.

## Overview

The pair-copula construction was developed by Joe (1996) for the trivariate case and extended to arbitrary $n$ dimensions by Bedford & Cooke (2001, 2002) through the vine graphical framework. Aas et al. (2009) made it practical with the h-function algorithm and sequential MLE. The construction starts from the basic rule of probability:

$$f(x_1, \ldots, x_n) = f(x_n|x_1,\ldots,x_{n-1}) \cdot f(x_{n-1}|x_1,\ldots,x_{n-2}) \cdots f(x_2|x_1) \cdot f(x_1)$$

The key result is that each conditional density $f(x_j|x_1,\ldots,x_{j-1})$ can be decomposed into a bivariate copula density times lower-dimensional conditional densities, cascading all the way down to univariate densities.

## Main Content

> [!theorem] Theorem: Conditional density via copula (Joe 1996)
> Let $(X,V)$ be bivariate with joint copula $C_{XV}$ and marginals $F_X, F_V$. The conditional density of $X$ given $V=v$ is:
> $$f(x|v) = c_{XV}(F_X(x), F_V(v)) \cdot f_X(x)$$
> where $c_{XV}(u_1, u_2) = \partial^2 C_{XV}(u_1,u_2)/\partial u_1 \partial u_2$ is the copula density. Integrating yields the conditional CDF:
> $$F(x|v) = \frac{\partial C_{XV}(F_X(x), F_V(v))}{\partial F_V(v)}$$
> This is the **h-function** (defined below). The theorem applies recursively: conditioning on a set $\mathbf{v}$ reduces to conditioning on one element at a time, with new copulas at each step.
^thm-conditional-density

> [!definition] The h-function
> For a bivariate copula $C_{12}(u,v;\theta)$ with parameter $\theta$, the **h-function** is the conditional CDF of $U_1$ given $U_2 = v$:
> $$h(u|v;\theta) \;=\; F_{U_1|U_2}(u|v) \;=\; \frac{\partial C_{12}(u,v;\theta)}{\partial v}$$
>
> **Important cases:**
>
> *Gaussian copula* ($\rho \in (-1,1)$):
> $$h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$$
>
> *Student's $t$ copula* ($\rho, \nu$):
> $$h(u|v;\rho,\nu) = t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(\nu + (t_\nu^{-1}(v))^2)(1-\rho^2)}{\nu+1}}}\right)$$
>
> *Clayton copula* ($\theta > 0$):
> $$h(u|v;\theta) = v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta - 1}$$
>
> The inverse h-function $h^{-1}(p|v;\theta)$ maps a uniform $p$ to a conditional quantile — needed for simulation.
^def-h-function

> [!theorem] Theorem: Pair-copula density factorization (Bedford & Cooke 2002, Theorem 4.2)
> Let $(X_1,\ldots,X_n)$ have density $f$ with marginals $F_1,\ldots,F_n$. Given a regular vine $V = (T_1,\ldots,T_{n-1})$, the joint density factors as:
> $$f(x_1,\ldots,x_n) = \prod_{k=1}^{n} f_k(x_k) \;\cdot\; \prod_{j=1}^{n-1} \prod_{e \in E_j} c_{a(e),b(e)|D(e)}\!\Big(F_{a(e)|D(e)}\!\left(x_{a(e)}\,\big|\,\mathbf{x}_{D(e)}\right),\; F_{b(e)|D(e)}\!\left(x_{b(e)}\,\big|\,\mathbf{x}_{D(e)}\right)\Big)$$
> where:
> - $e \in E_j$ denotes an edge in tree $T_j$
> - $a(e), b(e)$ are the two variables linked by edge $e$
> - $D(e)$ is the **conditioning set** of edge $e$ (the $j-1$ variables that appear in both endpoint nodes of $e$ in the vine)
> - $c_{a,b|D}$ is a bivariate copula density, called the **pair copula** for edge $e$
> - $F_{a|D}(x_a|\mathbf{x}_D)$ is the conditional CDF of $X_a$ given $X_D = \mathbf{x}_D$
>
> **Total pair copulas:** $\sum_{j=1}^{n-1} |E_j| = \binom{n}{2} = n(n-1)/2$.
>
> **Note:** In full generality, the conditional copula $c_{a,b|D}$ may depend on the value $\mathbf{x}_D$ — a *non-simplified* vine. The **simplifying assumption** sets it constant.
^thm-pcc

> [!definition] The simplifying assumption
> The vine density in [[Pair-Copula Construction#^thm-pcc|the theorem above]] is not fully specified until the dependence of $c_{a,b|D}$ on $\mathbf{x}_D$ is stated. The **simplifying assumption** sets:
> $$c_{a,b|D}(u_1,u_2\,|\,\mathbf{x}_D) = c_{a,b|D}(u_1,u_2) \qquad \forall\, \mathbf{x}_D$$
> treating conditional pair copulas as *unconditional* bivariate copulas applied to conditional CDFs. Under this assumption, $F_{a|D}(x_a|\mathbf{x}_D)$ is computed recursively by applying h-functions along the vine from tree 1 upward — fully explicit. The assumption is standard in applications (VineCopula, pyvinecopulib) and is exact for multivariate Gaussian vines; for other families, Nagler (2024) reviews when it fails.
^def-simplifying

## Examples

> [!example] Trivariate D-vine factorization
> **Setup:** Three variables $(X_1, X_2, X_3)$. Vine: $T_1$ is the path $1-2-3$; $T_2$ is the edge $1-3|2$.
>
> **Density:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3) \;\cdot\; c_{12}(F_1,F_2) \;\cdot\; c_{23}(F_2,F_3) \;\cdot\; c_{13|2}(F_{1|2},\, F_{3|2})$$
>
> where:
> - $F_1 = F_1(x_1)$, $F_2 = F_2(x_2)$, $F_3 = F_3(x_3)$ (marginal CDFs)
> - $F_{1|2} = h(F_1\,|\,F_2;\,\theta_{12})$ (conditional CDF of $X_1$ given $X_2=x_2$, using tree-1 copula)
> - $F_{3|2} = h(F_3\,|\,F_2;\,\theta_{23})$
> - $c_{13|2}(F_{1|2},F_{3|2})$ is the pair copula for the conditional pair $(X_1, X_3)\,|\,X_2$.
>
> **Interpretation:** After conditioning out the dependence through $X_2$ (the middle variable in the path), the residual dependence between $X_1$ and $X_3$ is captured by $c_{13|2}$.

> [!example] Trivariate C-vine factorization (root = variable 1)
> **Setup:** Same three variables. Vine: $T_1$ is the star $2-1-3$; $T_2$ is edge $2-3|1$.
>
> **Density:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3) \;\cdot\; c_{12}(F_1,F_2) \;\cdot\; c_{13}(F_1,F_3) \;\cdot\; c_{23|1}(F_{2|1},\, F_{3|1})$$
>
> where $F_{2|1} = h(F_2|F_1;\theta_{12})$ and $F_{3|1} = h(F_3|F_1;\theta_{13})$.
>
> **Comparison:** In D-vine, $X_2$ is the hub; in C-vine, $X_1$ is the hub. If $X_1$ is a dominant driving variable (e.g., a market index, or the most correlated asset), the C-vine is more natural.

## Connections

- [[Vine Copulas - Overview]] — motivation and landscape position.
- [[C-Vine and D-Vine Structures]] — the specific tree structures that determine which pairs $(a,b)$ appear at each tree level.
- [[Vine Copula Estimation and Software]] — the sequential MLE algorithm applies the h-function iteratively.
- [[Tail Dependence in Factor Copulas]] — contrast: vine copulas specify tail behaviour per edge; factor copulas derive tail dependence analytically from the factor distribution.

## See Also

- [[Dependence Measures for Copulas]] — rank correlation, quantile dependence, and tail dependence: the moments that diagnose each pair copula.
- [[../_Index|Dependence Modeling]]
