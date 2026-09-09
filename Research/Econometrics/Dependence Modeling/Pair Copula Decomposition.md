---
title: Pair Copula Decomposition
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Literature-Survey.md]]"
source_location: "Aas et al. (2009), Secs. 2-3, pp. 183-188; Bedford & Cooke (2001) Thm. 4"
date_ingested: 2026-09-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[R-Vine Structure Selection]]"
  - "[[Vine Copula Estimation and Software]]"
aliases:
  - h-function
  - conditional copula density
  - PCC density
  - pair copula construction
  - Rosenblatt transform
---

# Pair Copula Decomposition

> [!summary]
> The **pair copula construction (PCC)** expresses any $d$-dimensional joint density as a product of $d$ marginal densities and $\binom{d}{2}$ bivariate conditional copula densities. The conditional CDFs needed to pass pseudo-observations from one vine tree to the next are computed via **h-functions** — partial derivatives of bivariate copulas. Together, the vine structure and h-functions enable tractable sequential estimation of arbitrarily rich multivariate dependence models.

## Overview

Sklar's theorem factorizes any bivariate joint density into margins and a copula. The PCC extends this to $d$ dimensions by *iterating* the bivariate decomposition: condition on one variable at a time, building up a sequence of bivariate conditional copulas. The vine graphical structure [[Vine Copulas - Overview]] organizes which pairs are modelled at each conditioning level.

## Main Content

> [!theorem] Pair copula density factorization (Bedford & Cooke 2001, Thm. 4)
> Let $\mathbf{X} = (X_1, \ldots, X_d)$ have joint density $f$ with marginals $f_k$. For any ordering $(1, 2, \ldots, d)$ and corresponding D-vine structure, the joint density decomposes as:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1:\,i+j-1}\!\left(F(x_i|x_{i+1}, \ldots, x_{i+j-1}),\, F(x_{i+j}|x_{i+1}, \ldots, x_{i+j-1})\right)$$
> where $c_{i,i+j|\mathbf{v}}$ is the **conditional copula density** of $(X_i, X_{i+j})$ given $X_\mathbf{v} = \mathbf{x}_\mathbf{v}$, and $i+1:i+j-1$ denotes the set $\{i+1, \ldots, i+j-1\}$ (empty for $j=1$, unconditional copulas).
>
> The analogous formula holds for any R-vine structure; the D-vine ordering is a notational convenience.
>
> **Key insight:** Each $c_{ij|\mathbf{v}}$ can be a *different* bivariate copula family with its own parameters — there is no constraint linking the pair copulas together.
^thm-pcc-density

> [!definition] The h-function (conditional distribution function of a copula)
> For a bivariate copula $C(u, v; \boldsymbol{\theta})$, the **h-function** is the conditional CDF of $V$ given $U = u$:
> $$h(v|u;\boldsymbol{\theta}) \equiv F(v|u;\boldsymbol{\theta}) = \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial u}$$
> and symmetrically $h(u|v;\boldsymbol{\theta}) = \partial C(u,v)/\partial v$.
>
> The h-function transforms pseudo-observations from one vine tree to the next. If $(U,V)$ are uniform margins from tree $T_k$, then $h(V|U;\hat{\boldsymbol{\theta}})$ is a valid uniform $[0,1]$ variate (the conditional CDF of $V$ given $U=u$, evaluated at the realized $V$) that serves as the pseudo-observation for the conditioning variable in tree $T_{k+1}$.
^def-hfunction

> [!example] H-functions for common families
>
> | Family | $C(u,v)$ | $h(v|u)$ |
> |--------|----------|----------|
> | Gaussian($\rho$) | $\Phi_\rho(\Phi^{-1}(u),\Phi^{-1}(v))$ | $\Phi\!\left(\dfrac{\Phi^{-1}(v)-\rho\,\Phi^{-1}(u)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\rho,\nu}(t_\nu^{-1}(u),t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(v)-\rho\,t_\nu^{-1}(u)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(u))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $u^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta$) | $\exp(-((-\ln u)^\theta+(-\ln v)^\theta)^{1/\theta})$ | $C(u,v)\cdot\dfrac{1}{u}(-\ln u)^{\theta-1}((-\ln u)^\theta+(-\ln v)^\theta)^{1/\theta-1}$ |
>
> These are used in the sequential estimation algorithm: after fitting a pair copula, apply its h-function to the pseudo-observations to create inputs for the next tree.
^ex-hfunctions

> [!theorem] Recursive h-function construction for D-vine
> For a D-vine with ordering $1, 2, \ldots, d$, define:
> - **Tree 1** pseudo-observations (inputs): $u_i^{1,1} = F_i(x_i)$ (PIT-transformed margins)
> - **H-function recursion** for conditioning sets: for the pair $(i, i+j)$ conditioned on $\{i+1, \ldots, i+j-1\}$, the pseudo-observations entering the copula are:
>   $$v_{i|i+1:\,i+j-1} = h(v_{i|i+1:\,i+j-2}\; |\; v_{i+j-1|i+1:\,i+j-2};\; \hat{\boldsymbol{\theta}}_{i,i+j-1|i+1:\,i+j-2})$$
> - These recursively-computed values are the uniform $[0,1]$ inputs for each pair copula.
>
> The recursion has depth $j-1$ for a pair at conditioning depth $j-1$, so the full computation requires evaluating all lower-tree h-functions first. This makes estimation sequential: tree by tree, pair by pair within each tree.
^thm-h-recursion

## Examples

> [!example] Trivariate D-vine ($d=3$)
> Variables ordered $1, 2, 3$. Three pair copulas:
>
> **Tree 1** (unconditional): $c_{12}(u_1, u_2)$ and $c_{23}(u_2, u_3)$
>
> **Tree 2** (conditioned on $X_2$): $c_{13|2}(u_{1|2}, u_{3|2})$ where:
> $$u_{1|2} = h(u_1|u_2; \hat{\boldsymbol{\theta}}_{12}), \quad u_{3|2} = h(u_3|u_2; \hat{\boldsymbol{\theta}}_{23})$$
>
> **Full density:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)\cdot c_{12}(u_1,u_2)\cdot c_{23}(u_2,u_3)\cdot c_{13|2}(u_{1|2},u_{3|2})$$
>
> Each of the three pair copulas can be a different family — e.g. Gaussian for $(1,2)$, Clayton for $(2,3)$, and $t$ for $(1,3)|2$.

## Connections

- [[Vine Copulas - Overview]] — the vine graphical structure that organizes which pair copulas appear at each tree level.
- [[C-Vine and D-Vine Structures]] — specific tree topologies and their density formulas.
- [[R-Vine Structure Selection]] — how the vine structure $V$ (and hence which pairs appear) is chosen from data.
- [[Vine Copula Estimation and Software]] — uses h-functions recursively in sequential MLE.
- [[Factor Copula Construction]] — contrasting approach: one shared factor drives all pair copulas instead of independent pair-specific families.

## See Also

- [[Copula Estimation]] — Bayesian Gaussian-copula estimation (bivariate), the simplest vine case.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence as model-fit summaries.
- [[../_Index|Econometrics]]
