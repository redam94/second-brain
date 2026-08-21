---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "§2, §4"
date_ingested: 2026-08-21
date_updated: 2026-08-21
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - PCC density decomposition
  - h-function
  - conditional copula
  - simplifying assumption
---

# Pair-Copula Construction

> [!summary]
> A pair-copula construction (PCC) decomposes the $d$-dimensional joint density into a product of $d$ univariate marginal densities and $d(d-1)/2$ bivariate copula densities. Each bivariate copula acts on **conditional probability integral transforms** ($h$-functions) computed from bivariate copulas in lower trees of the vine. The **simplifying assumption** — that each conditional copula does not depend on the values of the conditioning variables — makes likelihood evaluation tractable and is exact for elliptical distributions.

## Overview

The key insight of the PCC is that Sklar's theorem works not just for unconditional marginals, but for **conditional** marginals too. Any conditional bivariate density $f_{ij|\mathbf{D}}(y_i, y_j \mid \mathbf{y}_\mathbf{D})$ can be written as a bivariate copula density times the product of conditional marginals. Iterating this decomposition across all conditioning sets yields a product form that is entirely determined by (a) the choice of vine structure and (b) the choice of bivariate copula family for each edge.

## Main Content

> [!definition] Density factorisation via conditioning
> Starting from the chain rule of probability:
> $$f(y_1, \ldots, y_d) = f_1(y_1) \cdot \prod_{k=2}^{d} f_{k|1,\ldots,k-1}(y_k \mid y_1, \ldots, y_{k-1})$$
> Applying Sklar's theorem to the bivariate pair $(y_k, y_{k-1})$ given the remaining conditioning variables yields:
> $$f_{k|1,\ldots,k-1}(y_k \mid y_1, \ldots, y_{k-1}) = c_{k,k-1|1,\ldots,k-2}\!\left(F_{k|1,\ldots,k-2},\; F_{k-1|1,\ldots,k-2};\; \boldsymbol{\theta}_{k,k-1|\cdot}\right) \cdot f_{k|1,\ldots,k-2}(y_k \mid y_1, \ldots, y_{k-2})$$
> Applying this decomposition recursively to each conditional density produces the full PCC product form (see [[Vine Copulas - Overview#^def-pcc]]).
^def-factorisation

> [!definition] $h$-function (conditional CDF via copula)
> The **$h$-function** of a bivariate copula $C(u, v; \boldsymbol{\theta})$ is the partial derivative with respect to its second argument:
> $$h_{1|2}(u \mid v;\; \boldsymbol{\theta}) \;=\; \frac{\partial C(u, v;\; \boldsymbol{\theta})}{\partial v}$$
> and symmetrically $h_{2|1}(v \mid u;\; \boldsymbol{\theta}) = \partial C(u,v)/\partial u$.
>
> The $h$-function is the **conditional CDF of the first argument given the second**, expressed in copula (uniform-marginal) space. It maps $[0,1]^2 \to [0,1]$ and is used to compute the conditional probability integral transforms needed as inputs to higher-level trees:
> $$F_{i|\mathbf{D}}(y_i \mid \mathbf{y}_\mathbf{D}) = h_{i|j,\mathbf{D}'}(F_{i|\mathbf{D}'}(y_i \mid \mathbf{y}_{\mathbf{D}'}) \mid F_{j|\mathbf{D}'}(y_j \mid \mathbf{y}_{\mathbf{D}'});\; \boldsymbol{\theta}_{ij|\mathbf{D}'})$$
> where $\mathbf{D} = \{j\} \cup \mathbf{D}'$ (i.e. we extend the conditioning set by one variable at each tree level).
>
> **Closed forms for common bivariate copulas:**
>
> | Copula | $h_{1|2}(u|v;\theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(\nu+(t_\nu^{-1}(v))^2)(1-\rho^2)}{\nu+1}}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1-1/\theta} \cdot v^{-\theta-1}$ |
> | Gumbel($\theta$) | $C(u,v;\theta) \cdot \frac{(-\ln v)^{\theta-1}}{v(-\ln u)^\theta + (-\ln v)^\theta)^{1-1/\theta}} \cdot \frac{1}{v}$ |
>
> The $h$-functions propagate probability integral transforms up the vine tree by tree, making simulation from vine copulas straightforward (use inverse $h$-functions in reverse tree order).
^def-hfunction

> [!definition] Simplifying assumption
> The **simplifying assumption** (Joe 2011; Stoeber, Joe & Czado 2013) states that the conditional copula $c_{ij|\mathbf{D}}$ does not depend on the **values** $\mathbf{y}_\mathbf{D}$ of the conditioning variables — only on the conditional CDFs $u = F_{i|\mathbf{D}}(y_i|\mathbf{y}_\mathbf{D})$ and $v = F_{j|\mathbf{D}}(y_j|\mathbf{y}_\mathbf{D})$:
> $$c_{ij|\mathbf{D}}(u, v;\; \mathbf{y}_\mathbf{D}) = c_{ij|\mathbf{D}}(u, v;\; \boldsymbol{\theta}_{ij|\mathbf{D}}) \qquad \forall\; \mathbf{y}_\mathbf{D}$$
> i.e. the copula parameter $\boldsymbol{\theta}_{ij|\mathbf{D}}$ is **constant** across the conditioning space.
>
> Under this assumption the vine copula density is a fully analytical expression in the copula parameters. Without it, the conditional copulas are functions of $\mathbf{y}_\mathbf{D}$, and the density requires integration — computationally infeasible for large $d$.
>
> **When it holds:** Exactly for **elliptical distributions** (multivariate Gaussian, Student-$t$) — in those cases the bivariate conditional distribution of any pair given any set of variables is also elliptical, and the copula parameter depends only on the partial correlation, not on the conditioning values. For skewed, heavy-tailed, or asymmetric data, the assumption may be violated.
>
> **Testing it:** Conditional copula tests (Acar, Czado & Lysy 2012) and the graphical SCAR tests (Nagler et al. 2024) assess whether the copula parameter varies with the conditioning variable. The `rvinecopulib` and `VineCopula` packages implement these tests.
^def-simplifying

## Examples

> [!example] $h$-function propagation in a D-vine with $d=3$
> **Setup:** D-vine on $(Y_1, Y_2, Y_3)$ with pair sequence $(1,2)$, $(2,3)$ in tree 1 and $(1,3|2)$ in tree 2.
>
> **Step 1 (Tree 1):** Fit $c_{12}$ (say Gumbel) and $c_{23}$ (say Clayton). Compute:
> $$u_{1|2} = h_{1|2}(F_1(y_1) \mid F_2(y_2);\; \boldsymbol{\theta}_{12}), \quad u_{3|2} = h_{3|2}(F_3(y_3) \mid F_2(y_2);\; \boldsymbol{\theta}_{23})$$
>
> **Step 2 (Tree 2):** Fit $c_{13|2}$ (say Gaussian) using inputs $(u_{1|2}, u_{3|2})$.
>
> **Log-likelihood:**
> $$\ell = \sum_{t=1}^{T} \left[\ln c_{12}(F_1(y_{1t}), F_2(y_{2t})) + \ln c_{23}(F_2(y_{2t}), F_3(y_{3t})) + \ln c_{13|2}(u_{1|2,t}, u_{3|2,t})\right]$$
>
> **Interpretation:** The Gumbel $c_{12}$ captures upper tail dependence between $Y_1$ and $Y_2$; Clayton $c_{23}$ captures lower tail dependence between $Y_2$ and $Y_3$; after conditioning on $Y_2$, $Y_1$ and $Y_3$ have a symmetric residual dependence modelled by $c_{13|2}$.

## Connections

- [[Vine Copulas - Overview]] — motivates and defines the PCC; the pair-copula construction makes the vine copula density fully analytical.
- [[C-Vine and D-Vine Structures]] — different vine structures produce different orderings of conditioning sets and $h$-function propagation paths.
- [[Vine Copula Estimation and Selection]] — sequential MLE uses this tree-by-tree $h$-function structure; joint MLE differentiates the full product-form log-likelihood.
- [[Factor Copula Construction]] — contrast: factor copulas use a latent-variable construction with no closed-form density; vine copulas have analytical density via the PCC.
- [[Tail Dependence in Factor Copulas]] — pair-copula tail dependence is bivariate-family-specific; the vine aggregate tail dependence is determined by which families are assigned to which edges.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ for bivariate copulas used as starting statistics in family selection.
- [[../_Index|Dependence Modeling]]
