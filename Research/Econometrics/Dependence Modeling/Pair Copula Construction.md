---
title: Pair Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/vine-copulas-sources.md]]"
source_location: "Aas et al. (2009), Secs. 2–3; Bedford & Cooke (2002), Thm. 1"
date_ingested: 2026-09-11
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - PCC
  - pair-copula construction
  - h-function
  - conditional CDF recursion
---

# Pair Copula Construction

> [!summary]
> A pair copula construction (PCC) expresses a $d$-dimensional joint density as a product of $d$ marginal densities and $d(d-1)/2$ **bivariate pair-copula densities**. The conditional CDFs required by each pair-copula are computed recursively via the **h-function** $h(u,v\mid\theta) = \partial C(u,v;\theta)/\partial v$. The result is a flexible, high-dimensional density that admits sequential maximum likelihood estimation and permits a different bivariate copula family for every pair.

## Overview

Joe (1997, §4.5) first derived the principle that any $d$-dimensional joint density can be decomposed as a product of bivariate conditional densities. Bedford & Cooke (2001, 2002) formalized this using the **vine graphical model** as the encoding structure. Aas et al. (2009) made the construction practically estimable by deriving the **h-function recursion** for propagating conditional CDFs through the tree levels.

The PCC is the exact representation used by C-vines and D-vines (see [[C-Vine and D-Vine Structures]]). It underlies the general R-vine class (see [[Vine Copulas - Overview]]). The key technical requirements are Sklar's theorem (which separates marginals from the copula structure) and the existence of conditional CDFs as partial derivatives of pair-copulas.

## Main Content

> [!definition] Building block: bivariate copula and Sklar's theorem
> For two random variables $U, V \sim \text{Uniform}[0,1]$, a **bivariate copula** $C: [0,1]^2 \to [0,1]$ specifies their joint distribution:
> $$P(U \leq u, V \leq v) = C(u,v;\theta)$$
> By Sklar's theorem, for any two continuous random variables $X_1, X_2$ with CDFs $F_1, F_2$:
> $$F_{12}(x_1,x_2) = C(F_1(x_1), F_2(x_2); \theta)$$
> so the joint density factors as $f_{12}(x_1,x_2) = f_1(x_1)\, f_2(x_2)\, c(F_1(x_1), F_2(x_2);\theta)$ where $c = \partial^2 C/\partial u_1 \partial u_2$ is the **copula density**. The pair-copula construction generalises this to $d$ dimensions by chaining bivariate copulas conditional on sets of other variables.
^def-bivariate-copula

> [!definition] The h-function (conditional CDF via pair-copula)
> For any bivariate copula $C(u,v;\theta)$ the **h-function** is:
> $$h(u \mid v; \theta) = \frac{\partial C(u,v;\theta)}{\partial v}$$
> It gives the conditional CDF of $U$ given $V = v$ as seen through the pair-copula. Equivalently:
> $$F(x_i \mid x_j) = h\bigl(F_i(x_i) \mid F_j(x_j); \theta_{ij}\bigr)$$
> The **inverse h-function** $h^{-1}(p \mid v;\theta)$ solves $h(u \mid v;\theta) = p$ for $u$, needed for simulation.
>
> **Closed-form examples:**
>
> | Copula family | $h(u \mid v; \theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student $t(\nu,\rho)$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta} + v^{-\theta} - 1)^{-1-1/\theta} \cdot v^{-\theta-1}$ |
> | Gumbel($\theta$) | $C(u,v;\theta) \cdot \frac{(-\log v)^{\theta-1}}{v(-\log u)^\theta + (-\log v)^\theta)^{(\theta-1)/\theta}}$ — via numerical derivative |
>
> For copulas without closed-form $h$, numerical differentiation is used.
^def-h-function

> [!definition] Recursive conditional CDF computation
> For a vine with more than two conditioning variables, conditional CDFs are computed recursively. Let $D = \{i_1, \ldots, i_m\}$ be the conditioning set and $-j = D \cup \{j\}$. The recursion is:
> $$F(u \mid \mathbf{u}_D) = h\bigl(F(u \mid \mathbf{u}_{D\setminus\{i_m\}}) \mid F(u_{i_m} \mid \mathbf{u}_{D\setminus\{i_m\}});\, \theta_{u, i_m | D\setminus\{i_m\}}\bigr)$$
> Starting from the marginal CDFs $F_1, \ldots, F_d$, each pass through the h-function adds one variable to the conditioning set. For a $d$-vine, this recursion has at most $d-1$ steps for the deepest conditioning set.
^def-recursion

> [!theorem] Bedford-Cooke density factorization (Bedford & Cooke 2002, Thm. 1)
> Let $V = (T_1, \ldots, T_{d-1})$ be a regular vine on $d$ variables. Under the simplifying assumption, the $d$-dimensional density satisfying this vine specification is:
>
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{\ell=1}^{d-1} \prod_{e \in E_\ell} c_{j(e),k(e)|D(e)}\bigl(F(x_{j(e)} \mid x_{D(e)}),\; F(x_{k(e)} \mid x_{D(e)})\bigr)$$
>
> where, for each edge $e$ in tree $T_\ell$:
> - $j(e), k(e)$ are the two *conditioned* variables
> - $D(e)$ is the *conditioning set* (variables shared by the two endpoints of $e$ in $T_\ell$'s node representation)
> - $c_{j(e),k(e)|D(e)}$ is the pair-copula density (any bivariate copula family)
> - $F(x_{j(e)} \mid x_{D(e)})$ is computed recursively via h-functions
>
> **Key properties:**
> 1. The factorization is a valid joint density for any choice of marginals $f_k$ and pair-copulas $c_{j,k|D}$.
> 2. Different edges can have different copula families — e.g. Gaussian for weakly-dependent pairs, Clayton for lower-tail-dependent pairs.
> 3. The total number of pair-copulas is $d(d-1)/2$.
> 4. The model is identified up to labelling permutations of the vine structure.
^thm-factorization

> [!definition] Pseudo-observations (rank-based transformation)
> Before fitting a vine copula, the marginal distributions $F_k$ must be estimated. In practice, **pseudo-observations** (a.k.a. probability integral transform of ranks) are used:
> $$\hat{u}_{ik} = \frac{\text{rank}(x_{ik})}{n+1}, \quad k = 1, \ldots, d,\; i = 1, \ldots, n$$
> This non-parametric transform produces approximately $\text{Uniform}[0,1]$ observations, removing the need to specify marginal parametric families. Alternatively, parametric margins (e.g. GARCH-filtered returns → standardised residuals → $t$-distribution) can be used and plugged in.
^def-pseudoobs

## Examples

> [!example] 3-dimensional PCC (Aas et al. 2009, §2.2)
> **Setup:** Three variables $(X_1, X_2, X_3)$ with marginals $F_1, F_2, F_3$.
>
> **Joint density:**
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)$$
> $$\times\; c_{12}(F_1(x_1), F_2(x_2);\theta_{12})$$
> $$\times\; c_{23}(F_2(x_2), F_3(x_3);\theta_{23})$$
> $$\times\; c_{13|2}(F(x_1|x_2), F(x_3|x_2);\theta_{13|2})$$
>
> where $F(x_1|x_2) = h(F_1(x_1), F_2(x_2); \theta_{12})$ and $F(x_3|x_2) = h(F_3(x_3), F_2(x_2); \theta_{23})$.
>
> **Pair-copulas:** $c_{12}$ links $X_1$ and $X_2$ unconditionally; $c_{23}$ links $X_2$ and $X_3$ unconditionally; $c_{13|2}$ links $X_1$ and $X_3$ conditional on $X_2$ — capturing residual dependence after the shared connection through $X_2$ has been removed. This is the D-vine for $d=3$ (also the only possible vine for $d=3$).

## Connections

- [[Vine Copulas - Overview]] — motivation and the full R-vine structure.
- [[C-Vine and D-Vine Structures]] — the specific density formulas for C-vines and D-vines as special cases.
- [[Vine Copula Estimation]] — uses the h-function recursion to compute the log-likelihood and propagate pseudo-observations through tree levels.
- [[Factor Copula Construction]] — contrast: factor copula has no h-function recursion but also no closed-form density; pair copula construction has closed-form density (under the simplifying assumption) and requires h-functions.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's τ, upper/lower tail dependence coefficients; vine estimation uses τ for tree selection.
- [[Copula Estimation]] — Bayesian Gaussian copula; the pair-copula construction generalizes this to non-Gaussian, asymmetric, and higher-dimensional settings.
- [[../_Index|Econometrics]]
