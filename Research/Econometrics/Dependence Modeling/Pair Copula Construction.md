---
title: Pair Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Survey.md]]"
source_location: "§2–4 (Aas et al. 2009, Secs. 2–3; Czado 2010, Secs. 2–3; Joe 1996)"
date_ingested: 2026-07-19
date_updated: 2026-07-19
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - PCC vine copula
  - h-function copula
  - conditional CDF pair copula
  - pair copula density factorization
---

# Pair Copula Construction

> [!summary]
> A **pair copula construction (PCC)** decomposes a multivariate density into a product of marginal densities and bivariate **pair copula** densities applied to pairs of raw and conditional uniform transforms. The key computational primitive is the **h-function** $h(u, v; \theta) = \partial C(u, v; \theta)/\partial v$, which maps any bivariate copula into the conditional CDF of $U_1 | U_2 = v$. By chaining h-functions across vine trees, one can compute the arguments of pair copulas in higher trees from those in lower trees, enabling sequential maximum likelihood estimation. Each pair copula can use a different bivariate family, giving the vine full per-pair flexibility.

## Overview

The pair copula construction traces back to Joe (1996) and was formalized in the vine-copula framework by Bedford & Cooke (2001, 2002) and made practically computable by Aas, Czado, Frigessi & Bakken (2009). The idea is simple: the conditional density $f(x_1 | x_2, \ldots, x_N)$ can always be written as a bivariate copula density of marginal CDFs, times a lower-dimensional conditional density. Applying this telescoping $N-1$ times produces a density that is a product of $N$ marginals and $N(N-1)/2$ bivariate pair copula densities.

The structure of which pairs appear at which conditioning level is the **vine structure** (see [[C-Vine and D-Vine Structures]] and [[Vine Copulas - Overview]]). This note focuses on the formal density, the h-function, and how to compute the likelihood.

## Main Content

### Density Factorization

> [!definition] Pair-copula density (general form)
> For $N$ variables with joint density $f(x_1, \ldots, x_N)$, marginal densities $f_i$, and marginal CDFs $F_i$, a pair copula construction yields:
> $$f(x_1, \ldots, x_N) = \prod_{k=1}^N f_k(x_k) \cdot \prod_{j=1}^{N-1}\prod_{i \in \text{Tree}_j} c_{\mathcal{A}(e)|\mathcal{V}(e)}\!\bigl(F_{\mathcal{A}(e)_1|\mathcal{V}(e)},\; F_{\mathcal{A}(e)_2|\mathcal{V}(e)}\bigr)$$
> where the product over edges $e$ of the vine runs over $N-1$ trees, $\mathcal{A}(e) = \{a(e), b(e)\}$ is the **conditioned pair** (the two endpoints), $\mathcal{V}(e)$ is the **conditioning set** (the variables $e$ conditions on), and $F_{i|\mathcal{V}(e)}$ is the CDF of $X_i | \mathbf{X}_{\mathcal{V}(e)} = \mathbf{x}_{\mathcal{V}(e)}$ — a conditional CDF computed by chaining h-functions through earlier trees.
>
> Under the **simplifying assumption** (see [[Vine Copulas - Overview#^def-simplifying]]), $c_{\mathcal{A}(e)|\mathcal{V}(e)}$ does not depend on the *value* $\mathbf{x}_{\mathcal{V}(e)}$, only on the conditioning *set*. This makes the likelihood computable.
> ^def-pcc-density

> [!example] Three-variable density: explicit form
> For $(X_1, X_2, X_3)$ with C-vine ordering $(1, 2, 3)$ (root = $X_1$):
>
> **Factorization** (Joe 1996):
> $$f(x_1, x_2, x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3) \cdot c_{12}\bigl(F_1(x_1), F_2(x_2)\bigr) \cdot c_{13}\bigl(F_1(x_1), F_3(x_3)\bigr) \cdot c_{23|1}\bigl(F_{2|1}(x_2|x_1),\, F_{3|1}(x_3|x_1)\bigr)$$
>
> **Conditional CDFs** (h-functions):
> $$F_{2|1}(x_2|x_1) = h\!\bigl(F_2(x_2),\, F_1(x_1);\, \theta_{12}\bigr) = \frac{\partial C_{12}(F_1(x_1), F_2(x_2))}{\partial F_1(x_1)}$$
>
> $$F_{3|1}(x_3|x_1) = h\!\bigl(F_3(x_3),\, F_1(x_1);\, \theta_{13}\bigr) = \frac{\partial C_{13}(F_1(x_1), F_3(x_3))}{\partial F_1(x_1)}$$
>
> **Three pair copulas**: $c_{12}$, $c_{13}$ (tree 1), and $c_{23|1}$ (tree 2). Each can be a different bivariate family.
>
> **Interpretation**: $c_{23|1}$ captures what $X_2$ and $X_3$ share beyond their shared relationship with $X_1$. If $X_1$ is a market factor, $c_{23|1}$ is the sector-specific co-movement after netting out market risk.

### The H-Function

> [!definition] H-function (partial copula / conditional CDF)
> For a bivariate copula $C(u, v; \theta)$, the **h-function** is:
> $$h(u, v; \theta) \;\equiv\; \frac{\partial C(u, v; \theta)}{\partial v} \;=\; F_{U_1|U_2=v}(u)$$
> where $(U_1, U_2) \sim C(\cdot; \theta)$ with uniform margins. The h-function maps $(u, v) \in [0,1]^2$ to $[0,1]$ and is the **conditional CDF of $U_1$ given $U_2 = v$**. It equals the conditional CDF $F_{X_i|\mathbf{X}_\mathbf{v}=\mathbf{x}_\mathbf{v}}(x_i)$ when the pair copula is applied to uniform transforms.
>
> The h-function is the key computational primitive: given pair-copula parameter estimates $\hat\theta$ from tree $k$, one computes h-function outputs to use as arguments in tree $k+1$.
> ^def-hfunction

> [!definition] H-functions for standard bivariate copulas
>
> | Family | $h(u, v; \theta)$ | Notes |
> |--------|-------------------|-------|
> | **Gaussian** ($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ | $\Phi$ = standard normal CDF |
> | **Student-$t(\rho,\nu)$** | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{\dfrac{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)}{\nu+1}}}\right)$ | Two parameters |
> | **Clayton** ($\theta > 0$) | $\left(v^{-\theta}\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1-1/\theta}\right)$ | Lower-tail dependence |
> | **Gumbel** ($\theta \ge 1$) | Involves generator derivative; computed numerically | Upper-tail dependence |
> | **Frank** ($\theta \ne 0$) | $\dfrac{(e^{-\theta}-1)\,e^{-\theta u}}{(e^{-\theta u}-1)(e^{-\theta v}-1)+(e^{-\theta}-1)}$ | No tail dependence |
> | **Independence** | $u$ | Zero dependence ($\theta=0$) |
>
> The h-function inherits the tail properties of its copula family. Clayton's h-function concentrates probability near the lower-left corner; Gumbel's near the upper-right.
> ^def-hfunctions-table

> [!definition] Recursive h-function computation through vine trees
> For a vine with trees $T_1, T_2, \ldots, T_{N-1}$:
>
> **Initialization**: Set $v_{j|} = F_j(x_j)$ for $j = 1, \ldots, N$ (marginal uniform transforms).
>
> **Tree 1 step**: For each edge $(a, b) \in T_1$:
> - Compute the pair copula density: $c_{ab}(v_{a|}, v_{b|})$ → contributes to the log-likelihood.
> - Compute h-function outputs: $v_{a|b} = h(v_{a|}, v_{b|}; \theta_{ab})$ and $v_{b|a} = h(v_{b|}, v_{a|}; \theta_{ab})$.
>
> **Tree $k$ step** ($k = 2, \ldots, N-1$): For each edge $(a, b|\mathbf{v}) \in T_k$:
> - The arguments $v_{a|\mathbf{v}}$ and $v_{b|\mathbf{v}}$ were computed in earlier trees (via h-functions).
> - Compute $c_{ab|\mathbf{v}}(v_{a|\mathbf{v}}, v_{b|\mathbf{v}})$ → log-likelihood contribution.
> - Compute updated h-function outputs for use in $T_{k+1}$.
>
> The log-likelihood is the sum of all pair copula log-densities plus marginal log-densities:
> $$\ell(\boldsymbol{\theta}) = \sum_{t=1}^T \left[\sum_{k=1}^N \log f_k(x_{kt}) + \sum_{j=1}^{N-1}\sum_{e \in T_j} \log c_{\mathcal{A}(e)|\mathcal{V}(e)}\bigl(v_{\mathcal{A}(e)_1|\mathcal{V}(e),t}, v_{\mathcal{A}(e)_2|\mathcal{V}(e),t}; \theta_e\bigr)\right]$$
> ^def-recursive-hfunc

## Examples

> [!example] Four-variable D-vine: density and h-function chain
> **Variables**: $(X_1, X_2, X_3, X_4)$. **D-vine ordering**: $1-2-3-4$.
>
> **Tree 1** edges: $(1,2), (2,3), (3,4)$.
> **Tree 2** edges: $(1,3|2), (2,4|3)$.
> **Tree 3** edge: $(1,4|2,3)$.
>
> **Density**:
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12}\,c_{23}\,c_{34} \cdot c_{13|2}\,c_{24|3} \cdot c_{14|23}$$
>
> where arguments $(u,v)$ for each $c$ are the appropriate h-function outputs.
>
> **H-function chain for $c_{14|23}$** (tree-3 edge):
> 1. Compute $v_{1|2} = h(F_1(x_1), F_2(x_2); \theta_{12})$ and $v_{4|3} = h(F_4(x_4), F_3(x_3); \theta_{34})$.
> 2. Compute $v_{1|23} = h(v_{1|2}, v_{3|2}; \theta_{13|2})$ where $v_{3|2} = h(F_3(x_3), F_2(x_2); \theta_{23})$ and $\theta_{13|2}$ is the tree-2 parameter.
> 3. Compute $v_{4|23} = h(v_{4|3}, v_{2|3}; \theta_{24|3})$ where $v_{2|3} = h(F_2(x_2), F_3(x_3); \theta_{23})$.
> 4. Evaluate $c_{14|23}(v_{1|23}, v_{4|23}; \theta_{14|23})$ — this is the tree-3 contribution.
>
> **Interpretation**: $c_{14|23}$ captures the dependence between $X_1$ and $X_4$ after conditioning away the influence of $X_2$ and $X_3$. In a time-series context (e.g., daily returns at lags 1–4), this is the $\text{lag-3}$ serial dependence after removing lags 1 and 2.

> [!example] Tail-dependence flexibility
> Consider a 5-dimensional financial portfolio: a market index + 4 assets in different sectors. A vine might specify:
> - **Tree 1**: Gaussian pair copulas for market-asset links (mild symmetric linear dependence).
> - **Tree 1**: Clayton for two credit-market pairs (strong lower-tail: joint defaults correlated more than joint surges).
> - **Tree 2**: Independence copulas for residual sector dependencies (conditional on market, sectors are independent).
>
> No single standard copula family can capture this mix. The vine captures it exactly, using three different families in three edges.

## Connections

- [[Vine Copulas - Overview]] — vine structure (C-vine, D-vine, R-vine) that organizes which pairs appear in which trees.
- [[C-Vine and D-Vine Structures]] — the specific tree structures; the pair indices $\mathcal{A}(e)$ and conditioning sets $\mathcal{V}(e)$ depend on which vine is chosen.
- [[Vine Copula Estimation and Selection]] — uses this density/likelihood for sequential MLE; pair-family selection applies AIC/BIC to each $c_e$ separately.
- [[Factor Copula Construction]] — contrasts with the PCC approach: the factor copula uses a single latent equation $X_i = \beta_i Z + \varepsilon_i$ rather than a cascade of pair copulas.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, and quantile dependence are used in vine structure selection (maximum spanning tree on pairwise $|\tau|$).

## See Also

- [[SMM Copula Asymptotic Theory]] — contrast: SMM estimation of factor copulas uses rank-based moments, not the h-function likelihood.
- [[Tail Dependence in Factor Copulas]] — tail dependence from factor copulas via EVT; vine copulas inherit the tail dependence of their chosen pair families (e.g., Clayton has lower-tail, Gumbel upper-tail, Gaussian none).
- [[../_Index|Econometrics]]
