---
title: Pair Copula Decomposition
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.md]]"
source_location: "Sec. 2.1-2.2, pp. 183-186"
date_ingested: 2026-09-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - h-function
  - vine copula density factorization
  - conditional pair copula
---

# Pair Copula Decomposition

> [!summary]
> The pair copula decomposition expresses an $n$-dimensional joint density as a product of $n$ univariate densities and $\binom{n}{2}$ bivariate pair copulas, arranged according to a regular vine tree structure. The key computational tool is the **h-function** $h(u|v;\boldsymbol{\theta}) = \partial C(u,v;\boldsymbol{\theta})/\partial v$, which computes the conditional CDF needed to move from one tree level to the next. Under the simplifying assumption, each pair copula is a standard bivariate copula that can be estimated from pseudo-observations at that tree level.

## Overview

The decomposition generalises the bivariate identity $f(x,y) = f(x|y)\cdot f(y)$ to $n$ variables by applying it recursively. At the first tree, we work with raw marginals; at deeper trees, we work with conditional marginals computed from the pair copulas above. The h-function is the bridge: it converts a pair copula $C(u,v)$ into the conditional distribution $F(U|V=v)$, which is the input to the next tree's pair copulas. This recursive structure is the computational heart of vine copula estimation.

## Main Content

> [!theorem] Pair copula density factorization (Aas et al. 2009, Theorem 1)
> Let $\mathbf{x} = (x_1, \ldots, x_n)'$ have joint density $f(\mathbf{x})$ with marginals $f_k(x_k)$ and marginal CDFs $F_k(x_k)$ for $k = 1, \ldots, n$. Any $n$-dimensional density admits a **pair copula decomposition**:
> $$f(x_1, \ldots, x_n) = \left[\prod_{k=1}^n f_k(x_k)\right] \cdot \prod_{\ell=1}^{n-1}\prod_{j=1}^{n-\ell} c_{e(j,\ell)}\!\left(F(x_{a(j,\ell)}|\mathbf{x}_{D(j,\ell)}),\, F(x_{b(j,\ell)}|\mathbf{x}_{D(j,\ell)})\right)$$
> where the indices $a, b, D$ are determined by the vine structure (see [[C-vine and D-vine Structures]]), and each pair copula $c_{e}$ is a bivariate copula density evaluated at the two conditional CDFs. The decomposition is **not unique** — different vine structures give different (but all valid) factorizations. Under the simplifying assumption, $c_{e(j,\ell)}$ does not depend on the conditioning values $\mathbf{x}_{D(j,\ell)}$.
^thm-factorization

> [!definition] The h-function (conditional CDF operator)
> For a bivariate copula $C(u,v;\boldsymbol{\theta})$ with density $c(u,v;\boldsymbol{\theta})$, the **h-function** is defined as:
> $$h(u\mid v;\boldsymbol{\theta}) \;\equiv\; F(U\leq u \mid V=v;\boldsymbol{\theta}) \;=\; \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial v}$$
> This is the conditional distribution function of $U$ given $V=v$ under the copula model. It maps the pair $(u, v) \in [0,1]^2$ to $[0,1]$.
>
> **Why it is needed:** At tree $T_k$, the inputs to pair copulas are conditional CDFs $F(x_j|\mathbf{x}_D)$. The h-function computes these from the pair copula estimated at the previous tree level. Specifically, if at tree $T_{k-1}$ one estimates $C_{j,m|\mathbf{D}\setminus m}(u,v)$ for variables $j$ and $m$ conditioned on $\mathbf{D}\setminus m$, then:
> $$F(x_j | x_m, \mathbf{x}_{\mathbf{D}\setminus m}) = h\!\left(F(x_j|\mathbf{x}_{\mathbf{D}\setminus m}),\; F(x_m|\mathbf{x}_{\mathbf{D}\setminus m});\; \boldsymbol{\hat\theta}_{j,m|\mathbf{D}\setminus m}\right)$$
^def-h-function

> [!definition] h-function for common copula families
> | Copula | $h(u\mid v;\boldsymbol{\theta})$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho$, $\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $v^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C(u,v;\theta)\dfrac{(-\log v)^{\theta-1}}{v(-\log v \cdot (-\log u))^{1/\theta-1}\cdot ((-\log u)^\theta + (-\log v)^\theta)^{1-1/\theta}}$ |
>
> where $\Phi$ is the standard normal CDF, $t_\nu$ is the Student-$t$ CDF with $\nu$ degrees of freedom. The Gaussian h-function is closed-form; the $t$ and Archimedean h-functions require numerical evaluation.
^def-h-families

> [!definition] Recursive computation: moving up the trees
> Given data $\mathbf{x}$ and estimated pair copulas $\hat{C}_{jk|D}$:
>
> **Tree 1:** Compute pseudo-observations $u_k = \hat{F}_k(x_k)$ (probability integral transforms) for all $k$.
>
> **Tree 2 inputs:** For each edge $(j,k)$ in $T_1$ (estimated pair copula $\hat{C}_{jk}$ with parameter $\hat{\theta}_{jk}$), compute:
> $$v_{j|k} = h(u_j | u_k;\, \hat\theta_{jk}), \quad v_{k|j} = h(u_k | u_j;\, \hat\theta_{kj})$$
>
> **Tree $\ell+1$ inputs:** For each edge $(j,k)|\mathbf{D}$ in $T_\ell$:
> $$v_{j|k,\mathbf{D}} = h\!\left(v_{j|\mathbf{D}}\mid v_{k|\mathbf{D}};\, \hat\theta_{jk|\mathbf{D}}\right), \quad v_{k|j,\mathbf{D}} = h\!\left(v_{k|\mathbf{D}}\mid v_{j|\mathbf{D}};\, \hat\theta_{kj|\mathbf{D}}\right)$$
>
> This propagates pseudo-observations upward through the vine trees, so that at each tree level the inputs are already on the uniform scale $[0,1]$, suitable for fitting bivariate copulas.
^def-recursive

## Examples

> [!example] Three-dimensional C-vine decomposition
> **Setup:** Three variables $x_1, x_2, x_3$ with $x_1$ as the root.
>
> **Tree 1:** Two pair copulas: $C_{12}(u_1, u_2)$ and $C_{13}(u_1, u_3)$.
> **Tree 2:** One pair copula on the conditional CDFs:
> $$C_{23|1}\!\left(h(u_2|u_1;\hat\theta_{12}),\; h(u_3|u_1;\hat\theta_{13})\right)$$
>
> **Full density:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\cdot f_2(x_2)\cdot f_3(x_3) \cdot c_{12}(u_1,u_2) \cdot c_{13}(u_1,u_3) \cdot c_{23|1}(v_{2|1}, v_{3|1})$$
> where $v_{2|1} = h(u_2|u_1;\hat\theta_{12})$ and $v_{3|1} = h(u_3|u_1;\hat\theta_{13})$.
>
> **Interpretation:** The $x_1$–$x_2$ and $x_1$–$x_3$ marginal dependence are captured directly. The residual dependence of $x_2$ and $x_3$ **after accounting for their shared exposure to $x_1$** is captured by $c_{23|1}$ — a partial correlation copula.

## Connections

- [[Vine Copulas - Overview]] — motivation and position in the literature; the simplifying assumption.
- [[C-vine and D-vine Structures]] — the specific tree arrangements that determine indices $a$, $b$, $D$ in the factorization.
- [[Vine Copula Estimation and Selection]] — the h-function drives the sequential estimation algorithm.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence apply to each pair copula $c_{jk|D}$.
- [[Factor Copula Construction]] — contrasting architecture: factor copulas use a latent additive model; vine copulas use a recursive bivariate decomposition.

## See Also

- [[SMM Estimator for Copulas]] — factor copulas require simulation-based estimation because the density has no closed form; vine copulas have an explicit density via the pair copula product.
- [[../_Index|Econometrics]]
