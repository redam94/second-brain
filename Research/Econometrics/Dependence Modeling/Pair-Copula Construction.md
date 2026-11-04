---
title: "Pair-Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Sources.md]]"
source_location: "Aas et al. (2009), Secs. 2–3; Bedford & Cooke (2002), Thm. 4.2"
date_ingested: 2026-11-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Factor Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC
  - pair copula factorisation
  - h-function
  - vine density
  - conditional copula
---

# Pair-Copula Construction

> [!summary]
> The pair-copula construction (PCC) factorises a $d$-variate joint density into a product of marginal densities and $d(d-1)/2$ bivariate copula densities, one per edge in a **regular vine** graphical model. The key computational primitive is the **h-function** — the conditional CDF of one variable given another — which is used recursively to convert raw observations into the uniform pseudo-observations required by higher-tree copulas. Bedford & Cooke (2002) proved that any joint density admits such a decomposition.

## Overview

The chain rule of probability provides the starting point. For any four variables:
$$f(x_1,x_2,x_3,x_4) = f_1(x_1) \cdot f_{2|1}(x_2|x_1) \cdot f_{3|12}(x_3|x_1,x_2) \cdot f_{4|123}(x_4|x_1,x_2,x_3)$$
Sklar's theorem decomposes each conditional density as a product of a conditional marginal and a bivariate copula:
$$f_{j|k}(x_j|x_k) = c_{jk}(F_j(x_j), F_k(x_k)) \cdot f_j(x_j)$$
Applying this recursively produces a product of $d$ univariate densities and $d(d-1)/2$ bivariate copula densities. The PCC organises this decomposition through a vine graphical model; the **vine structure** (which pairs appear in which tree) determines the conditioning sets.

## Main Content

> [!definition] The h-function
> For a bivariate copula $C_{j|k}$ with parameter(s) $\boldsymbol{\theta}$, the **h-function** is:
> $$h(u|v;\boldsymbol{\theta}) \coloneqq F(x_j|x_k) = \frac{\partial C_{j,k}(u, v;\boldsymbol{\theta})}{\partial v}$$
> where $u = F_j(x_j)$ and $v = F_k(x_k)$ are the probability-integral-transformed (PIT) margins. The h-function maps $(u, v) \in [0,1]^2 \mapsto [0,1]$ and gives the conditional CDF of $X_j$ given $X_k = x_k$ on the uniform scale.
>
> **Why it matters:** In trees $\ell \geq 2$ of the vine, the arguments of the bivariate copulas are **conditional CDFs** of the form $F(x_j|\mathbf{x}_\mathbf{v})$. The h-function provides these recursively: $F(x_j|\mathbf{x}_\mathbf{v}) = h(F(x_j|\mathbf{x}_{\mathbf{v}\setminus k})\;|\; F(x_k|\mathbf{x}_{\mathbf{v}\setminus k});\boldsymbol{\theta}_{jk|\mathbf{v}\setminus k})$.
^def-h-function

> [!definition] H-functions for common bivariate copulas
> | Copula | $h(u|v;\theta)$ |
> |--------|-----------------|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u)-\rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton($\theta$) | $v^{-\theta-1}\left(u^{-\theta}+v^{-\theta}-1\right)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C(u,v)\cdot\dfrac{[-\ln v]^{\theta-1}}{v \cdot [-\ln u-\ln v]^{1-1/\theta}\cdot(-\ln C)}$ |
> | Student-$t$($\nu,\rho$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u)-\rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(\nu+[t_\nu^{-1}(v)]^2)(1-\rho^2)}{\nu+1}}}\right)$ |
> | Independence | $u$ |
>
> where $\Phi$ is the standard normal CDF and $t_\nu$ the Student-$t$ CDF with $\nu$ degrees of freedom.
^def-h-table

> [!definition] Vine density: general formula
> Let $\mathcal{V} = (T_1, \ldots, T_{d-1})$ be a regular vine on $d$ variables with edge sets $\mathcal{E}(\ell)$. For each edge $e = \{a,b\} \in \mathcal{E}(\ell)$, let $\mathbf{v}(e)$ be the conditioning set (nodes that the two path-edges in $T_{\ell-1}$ had in common). Then:
> $$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{\ell=1}^{d-1} \prod_{e \in \mathcal{E}(\ell)} c_{a,b|\mathbf{v}(e)}\!\bigl(F(x_a|\mathbf{x}_{\mathbf{v}(e)}),\, F(x_b|\mathbf{x}_{\mathbf{v}(e)})\bigr)$$
> The conditional CDFs $F(x_a|\mathbf{x}_{\mathbf{v}(e)})$ are computed by applying h-functions recursively from tree 1 upward.
^thm-vine-density

> [!definition] The simplifying assumption
> Computing $c_{a,b|\mathbf{v}}(F(x_a|\mathbf{x}_\mathbf{v}), F(x_b|\mathbf{x}_\mathbf{v}))$ requires that the **conditional copula** — the copula of $(X_a, X_b)$ given $\mathbf{X}_\mathbf{v} = \mathbf{x}_\mathbf{v}$ — not depend on the specific *value* $\mathbf{x}_\mathbf{v}$, but only on the conditional uniform margins $F(x_a|\mathbf{x}_\mathbf{v})$ and $F(x_b|\mathbf{x}_\mathbf{v})$.
>
> The **simplifying assumption** imposes exactly this: $C_{a,b|\mathbf{v}}(\cdot,\cdot|\mathbf{x}_\mathbf{v}) = C_{a,b|\mathbf{v}}(\cdot,\cdot)$ for all $\mathbf{x}_\mathbf{v}$. Under this assumption, the h-functions only need the copula parameters $\boldsymbol{\theta}_{ab|\mathbf{v}}$, not the conditioning value, making sequential ML estimation tractable.
>
> **When it fails:** The simplifying assumption is incorrect when the conditional dependence between $X_a$ and $X_b$ changes with the conditioning value — e.g., asset correlations that increase in market crashes conditional on a third asset. It is testable (Czado & Nagler 2022; `vinecopulib` provides tests) and is typically a good approximation in lower trees.
^def-simplifying

## Examples

> [!example] $d=4$ D-vine: explicit density
> For the D-vine with ordering $1\text{–}2\text{–}3\text{–}4$:
>
> **Tree 1 edges:** $(1,2)$, $(2,3)$, $(3,4)$ — three unconditional bivariate copulas.
>
> **Tree 2 edges:** $(1,3|2)$, $(2,4|3)$ — two copulas with one conditioning variable each.
>
> **Tree 3 edge:** $(1,4|2,3)$ — one copula with two conditioning variables.
>
> The density is:
> $$f(x_1,x_2,x_3,x_4) = \prod_{k=1}^4 f_k(x_k) \cdot c_{12} \cdot c_{23} \cdot c_{34} \cdot c_{13|2}\!\bigl(h(u_1|u_2), h(u_3|u_2)\bigr) \cdot c_{24|3}\!\bigl(h(u_2|u_3), h(u_4|u_3)\bigr) \cdot c_{14|23}\!\bigl(h(F(x_1|x_2)|F(x_3|x_2)),\, h(F(x_4|x_3)|F(x_2|x_3))\bigr)$$
> where $u_k = F_k(x_k)$ and the h-function arguments in tree 3 are themselves h-functions from tree 2. This shows the recursive nature of the construction.

> [!example] Log-likelihood for ML estimation
> Under the simplifying assumption, the log-likelihood of a vine copula given data $\{(x_{1t},\ldots,x_{dt})\}_{t=1}^T$ is:
> $$\ell(\boldsymbol{\theta}) = \sum_{t=1}^T \sum_{\ell=1}^{d-1} \sum_{e \in \mathcal{E}(\ell)} \log c_{a(e),b(e)|\mathbf{v}(e)}\!\bigl(\hat F(x_{a(e),t}|\mathbf{x}_{\mathbf{v}(e),t}),\, \hat F(x_{b(e),t}|\mathbf{x}_{\mathbf{v}(e),t});\boldsymbol{\theta}_e\bigr)$$
> This separates into $d(d-1)/2$ bivariate sub-problems under sequential estimation — see [[Vine Copula Estimation and Model Selection]].

## Connections

The h-function is the central computational building block: it appears in both the density formula (to compute conditional CDF arguments) and the sequential estimator (to transform observations before each tree's estimation). Its closed form is known for all standard bivariate families (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, and their rotations).

The simplifying assumption connects vine copulas to their limitation vs. factor copulas: in a factor copula the conditional independence structure is built into the model by construction (given the common factor, the variables are independent), which is a stronger but different assumption.

## See Also
- [[Vine Copulas - Overview]] — motivation and historical context
- [[C-Vine and D-Vine Structures]] — the two special vine classes with explicit density formulas
- [[Vine Copula Estimation and Model Selection]] — how parameters are estimated in practice
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and tail dependence used in vine diagnostics
- [[Factor Copula Construction]] — the competing factor model construction, for comparison
