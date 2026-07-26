---
title: Pair Copula Construction and Vine Density
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-2009-Vine-Copulas-Survey.md]]"
source_location: "Aas et al. (2009) §2–3, pp. 183–188; Joe (1996) §3"
date_ingested: 2026-07-26
date_updated: 2026-07-26
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Regular Vine Theory]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC density
  - vine density formula
  - h-function copula
  - pair copula construction density
  - simplifying assumption vine
---

# Pair Copula Construction and Vine Density

> [!summary]
> The vine density factorises a multivariate density into $n(n-1)/2$ bivariate copula densities applied to conditional distribution functions, evaluated along a vine tree structure. The key computational primitive is the *h-function* $h(u|v;\theta) \equiv \partial C(u,v;\theta)/\partial v$, which maps from raw pseudo-observations to the conditional marginals required at each tree level. The *simplifying assumption* — that conditional copulas do not depend on the value of the conditioning variables — is what makes the construction computationally tractable in practice.

## Overview

Sklar's theorem guarantees that any joint density $f(x_1,\ldots,x_n)$ can be written as a product of marginals and a copula density. But for $n \ge 3$, the copula density $c(u_1,\ldots,u_n)$ is itself a high-dimensional object. The pair copula construction (PCC) resolves this by showing that the copula density *also* factors — into $n(n-1)/2$ bivariate copula densities, each applied to conditional distribution functions. The factorisation is not unique; the vine specifies one particular factorisation, and different vines give (in principle) equally valid but differently parameterised factorisations.

The original insight is due to **Joe (1996)**, who showed that bivariate building blocks suffice for any $n$-variate density. Bedford & Cooke (2001, 2002) formalised the graphical structure (the vine) that organises the building blocks into a valid density. Aas et al. (2009) gave the explicit density formula, the h-function algorithm, and the full PCC workflow.

## Main Content

> [!definition] Trivariate example: two valid PCCs
> For $(X_1, X_2, X_3)$, two valid density factorisations:
>
> **Factorisation conditioning on $X_2$:**
> $$f(x_1,x_2,x_3) = f_1(x_1) f_2(x_2) f_3(x_3) \cdot c_{12}(F_1,F_2) \cdot c_{23}(F_2,F_3) \cdot c_{13|2}(F_{1|2}(x_1|x_2),\, F_{3|2}(x_3|x_2))$$
>
> **Factorisation conditioning on $X_1$:**
> $$f(x_1,x_2,x_3) = f_1(x_1) f_2(x_2) f_3(x_3) \cdot c_{12}(F_1,F_2) \cdot c_{13}(F_1,F_3) \cdot c_{23|1}(F_{2|1}(x_2|x_1),\, F_{3|1}(x_3|x_1))$$
>
> Both are valid. In both cases, three bivariate copulas appear. The *conditional copula* $c_{13|2}$ — the bivariate copula of $(X_1|X_2=x_2, X_3|X_2=x_2)$ — captures the residual dependence between $X_1$ and $X_3$ after removing the effect of $X_2$. Under the **simplifying assumption**, $c_{13|2}$ does not depend on the value $x_2$ but only on the conditioning set $\{2\}$.
^def-trivariate

> [!definition] The h-function (conditional distribution)
> The **h-function** of a bivariate copula $C(u,v;\theta)$ is the conditional distribution function of $U_1$ given $U_2 = v$:
> $$h(u \mid v;\, \theta) \equiv F_{U_1|U_2}(u|v) = \frac{\partial C(u,v;\theta)}{\partial v}$$
> For the common families:
>
> - **Gaussian** ($\rho$): $\displaystyle h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
>
> - **Clayton** ($\theta > 0$): $\displaystyle h(u|v;\theta) = v^{-\theta-1}\!\left(u^{-\theta}+v^{-\theta}-1\right)^{-1-1/\theta}$
>
> - **Gumbel** ($\theta \ge 1$): $\displaystyle h(u|v;\theta) = C(u,v;\theta)\cdot\frac{(-\ln v)^{\theta-1}}{v\,[(-\ln u)^\theta+(-\ln v)^\theta]^{1-1/\theta}}$
>
> The **inverse h-function** $h^{-1}(w|v;\theta)$ — i.e. the solution to $h(u|v;\theta) = w$ for $u$ — is used for simulation (drawing $w \sim \text{Unif}(0,1)$ and back-transforming).
>
> The h-function converts the observed pseudo-observations $u_k = F_k(x_k) \in (0,1)$ to the *conditional* pseudo-observations needed for the next tree level:
> $$u_{j|D} = h(u_j \mid u_k;\, \theta_{jk|D_-}) \equiv F_{U_j|U_k, U_{D_-}}(u_j|u_k, u_{D_-})$$
> where $D_-$ is the conditioning set with $k$ removed. Under the simplifying assumption, the h-function only depends on the conditioning set through the pair copula parameter $\theta_{jk|D_-}$, not on the conditioning *values* $u_{D_-}$.
^def-hfunction

> [!definition] General vine density formula (R-vine)
> Given a regular vine $\mathcal{V} = (T_1,\ldots,T_{n-1})$ on $n$ variables, with edge set $E_k$ for tree $T_k$, each edge $e \in E_k$ labelled by a conditioned pair $\{j(e),k(e)\}$ and conditioning set $D(e)$, the joint density is:
> $$\boxed{f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{k=1}^{n-1}\prod_{e \in E_k} c_{j(e),k(e)|D(e)}\!\left(F_{j(e)|D(e)}(x_{j(e)}|\mathbf{x}_{D(e)}),\; F_{k(e)|D(e)}(x_{k(e)}|\mathbf{x}_{D(e)})\right)}$$
> where $F_{j|D}(x_j|\mathbf{x}_D)$ denotes the conditional distribution of $X_j$ given $\mathbf{X}_D = \mathbf{x}_D$, and the product runs over all $n(n-1)/2$ edges across all $n-1$ trees.
>
> **Under the simplifying assumption**, each conditional copula $c_{j(e),k(e)|D(e)}(\cdot,\cdot)$ is taken to be the same function regardless of the specific value $\mathbf{x}_{D(e)}$ — it depends on the conditioning set only via the pair copula parameter $\theta_e$. This makes the density a product of standard bivariate copula densities, computable using only h-function evaluations.
^def-vine-density

> [!definition] The simplifying assumption
> The **simplifying assumption** (SA) states: for every edge $e$ in the vine, the *conditional copula* density $c_{j(e),k(e)|D(e)}(u,v \mid \mathbf{x}_{D(e)})$ does not depend on the conditioning values $\mathbf{x}_{D(e)}$:
> $$c_{j(e),k(e)|D(e)}(u,v \mid \mathbf{x}_{D(e)}) \equiv c_{j(e),k(e)|D(e)}(u,v) \quad \forall\, \mathbf{x}_{D(e)}$$
>
> Under SA, the conditional copula equals a standard (unconditional) bivariate copula — its family and parameters may vary across edges but are fixed for a given edge. SA is what transforms the vine density from an abstract factorisation theorem into a computable likelihood.
>
> **Status of the SA:** Bedford & Cooke's original framework does *not* require SA; SA is an additional modelling assumption. Empirically, the SA is often a good approximation but can fail — particularly when $|D(e)|$ is large (high tree levels) or when the conditioning variables create heteroscedastic residuals. Recent literature on "non-simplified vines" (Nagler et al.) relaxes SA by making the conditional copula parameter a function of $\mathbf{x}_{D(e)}$, at the cost of substantially increased complexity.
^def-SA

## Examples

> [!example] Four-variable PCC: explicit density
> **Setup:** Four variables $(X_1, X_2, X_3, X_4)$ with a D-vine (path $1-2-3-4$):
>
> **Tree $T_1$ pair copulas:** $c_{12}$, $c_{23}$, $c_{34}$.
> **Tree $T_2$ pair copulas:** $c_{13|2}$, $c_{24|3}$.
> **Tree $T_3$ pair copula:** $c_{14|23}$.
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot c_{34}(F_3,F_4)$$
> $$\cdot\; c_{13|2}(h(F_1|F_2;\theta_{12}),\, h(F_3|F_2;\theta_{23}))$$
> $$\cdot\; c_{24|3}(h(F_2|F_3;\theta_{23}),\, h(F_4|F_3;\theta_{34}))$$
> $$\cdot\; c_{14|23}(h(h(F_1|F_2;\theta_{12})|h(F_3|F_2;\theta_{23});\theta_{13|2}),\; h(h(F_4|F_3;\theta_{34})|h(F_2|F_3;\theta_{23});\theta_{24|3}))$$
>
> **Key point:** At tree $T_3$, the arguments of $c_{14|23}$ are already the outputs of several nested h-function calls. This nesting is why the h-function is the key computational primitive: all conditional pseudo-observations are built up recursively from raw $F_k(x_k)$ values.

## Connections

- [[C-Vine and D-Vine Structures]] — tree-specific density formulae and simulation algorithms (with h-function nesting spelled out per structure).
- [[Regular Vine Theory]] — Bedford-Cooke framework: how the vine tree structure determines which edges appear in the density formula.
- [[Vine Copula Estimation and Model Selection]] — the vine density as a log-likelihood; sequential tree-by-tree MLE using h-function transforms.
- [[Vine Copulas - Overview]] — motivation and comparison with factor/Archimedean copulas.
- [[Dependence Measures for Copulas]] — Kendall's τ, used to estimate the dependence matrix before structure selection.

## See Also

- [[Factor Copula Construction]] — factor copulas have *no* closed-form density; vine copulas have an explicit density via PCC and h-functions.
- [[Copula Estimation]] — the PyMC Gaussian-copula tutorial; the Gaussian copula is the all-Gaussian special case of a vine with Gaussian pair copulas.
- [[../_Index|Econometrics]]
