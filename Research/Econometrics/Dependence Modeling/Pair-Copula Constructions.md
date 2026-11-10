---
title: Pair-Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009) — Insurance: Mathematics and Economics 44(2), 182–198"
source_location: "§2-3, pp. 183-192"
date_ingested: 2026-11-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Factor Copulas - Overview]]"
used_by:
  - "[[Regular Vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - PCC
  - pair copula
  - h-function
  - conditional copula CDF
---

# Pair-Copula Constructions

> [!summary]
> Aas et al. (2009) formalise the **pair-copula construction** (PCC) of Joe (1996): any multivariate density can be written as a product of bivariate *conditional* copula densities applied to conditional CDF arguments. The key computational primitive is the **h-function** — the partial derivative of a bivariate copula CDF with respect to one argument — which propagates conditional distributions through the vine trees. Sequential, tree-by-tree maximum likelihood is both efficient and statistically consistent.

## Overview

The pair-copula construction (PCC) addresses a fundamental difficulty in multivariate modelling: while Sklar's theorem guarantees the *existence* of a copula decomposition of any joint distribution, it does not say how to build a tractable, flexible model for the copula itself. For $d>3$ variables, most parametric copula families either impose strong symmetry constraints or lack closed-form densities.

Joe (1996) observed that any joint density can be decomposed into a *cascade* of bivariate copulas operating on *conditional* distribution functions. Bedford & Cooke (2002) organised these decompositions using **vine** graphical structures. Aas et al. (2009) popularised the approach in statistics and finance, deriving explicit likelihood formulae for the two most tractable vine types (C-vine and D-vine), and showing that sequential tree-by-tree estimation yields consistent, asymptotically efficient estimators.

## Main Content

### Conditioning and the h-function

> [!definition] h-function (Conditional copula CDF)
> For a bivariate copula $C(u, v; \theta)$ with parameter $\theta$, the **h-function** (partial derivative) is defined as:
> $$h(u, v; \theta) = \frac{\partial C(u, v; \theta)}{\partial v}$$
> This gives the conditional distribution $F(x_j | x_k) = h(F_j(x_j), F_k(x_k); \theta_{jk})$ when the pair copula for $(X_j, X_k)$ is $C_{jk}(\cdot, \cdot; \theta_{jk})$.
>
> **Why this matters:** The h-function is the key computational primitive for vine copulas. To evaluate a conditional CDF $F(x | \mathbf{v})$ where $\mathbf{v}$ is a conditioning set, one iterates h-functions through the vine trees. The inverse $h^{-1}(p, v; \theta)$ is used for simulation (inverse Rosenblatt transform).
^h-function

> [!definition] h-functions for standard families
> | Family | CDF $C(u,v;\theta)$ | h-function $h(u,v;\theta) = \partial C/\partial v$ |
> |---|---|---|
> | Gaussian | $\Phi_\rho(\Phi^{-1}(u), \Phi^{-1}(v))$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel | $\exp[-((-\ln u)^\theta+(-\ln v)^\theta)^{1/\theta}]$ | $C(u,v;\theta) \cdot \frac{1}{v}(-\ln v)^{\theta-1}((-\ln u)^\theta + (-\ln v)^\theta)^{1/\theta-1}$ |
> | Student-$t$ (df $\nu$) | $T_{\nu,\rho}(T_\nu^{-1}(u), T_\nu^{-1}(v))$ | $T_{\nu+1}\!\left(\frac{T_\nu^{-1}(u) - \rho\,T_\nu^{-1}(v)}{\sqrt{(\nu+(T_\nu^{-1}(v))^2)(1-\rho^2)/(\nu+1)}}\right)$ |
>
> For families without closed-form h-functions, numerical differentiation or copula-specific derivations apply.
^h-function-table

### D-vine density

> [!definition] D-vine density (Aas et al. 2009, Eq. 10)
> For a **D-vine** with variable ordering $1, 2, \ldots, d$, the joint density is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i | x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j} | x_{i+1},\ldots,x_{i+j-1})\right)$$
>
> - **Tree 1** ($j=1$): $d-1$ unconditional pair copulas $c_{12}, c_{23}, \ldots, c_{d-1,d}$ — neighbours in the chain.
> - **Tree 2** ($j=2$): $d-2$ conditional pair copulas $c_{13|2}, c_{24|3}, \ldots$ — pairs two apart in the chain, conditioned on the middle variable.
> - **Tree $j$** ($j \leq d-1$): $d-j$ conditional pair copulas with conditioning sets of size $j-1$.
>
> **Total pairs:** $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$.
^d-vine-density

> [!definition] C-vine density (Aas et al. 2009, Eq. 11)
> For a **C-vine** with root variable $k$ at each tree level (choose root for each tree), the density is:
> $$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,j+i|1,\ldots,j-1}\!\left(F(x_j | x_1,\ldots,x_{j-1}),\, F(x_{j+i} | x_1,\ldots,x_{j-1})\right)$$
>
> - **Tree 1:** Root variable $X_1$ pairs with all $X_2, \ldots, X_d$: copulas $c_{12}, c_{13}, \ldots, c_{1d}$.
> - **Tree 2:** Root variable $X_2$ pairs with all $X_3, \ldots, X_d$ conditional on $X_1$: copulas $c_{23|1}, c_{24|1}, \ldots, c_{2d|1}$.
> - **Tree $j$:** Root $X_j$ pairs with $X_{j+1}, \ldots, X_d$ conditional on $X_1,\ldots,X_{j-1}$.
>
> **Key difference from D-vine:** The same variable (the root) appears in all pairs within each tree, creating a star structure rather than a path. C-vines are natural when one variable (e.g. a market index) is known to influence all others.
^c-vine-density

### Sequential evaluation (h-function recursion)

> [!definition] Computing conditional distributions through the vine
> Let $\mathbf{x}_{-j}$ be the conditioning set at tree $j$. The conditional CDF arguments needed for tree $j+1$ are computed from the previous tree's pair copulas:
>
> For the D-vine, the conditional distributions are:
> $$F(x_i | x_{i+1}, \ldots, x_{i+j}) = h(F(x_i | x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j} | x_{i+1},\ldots,x_{i+j-1});\, \theta_{i,i+j|i+1:\ldots:i+j-1})$$
>
> This recursion starts with $F(x_i) = F_i(x_i)$ (marginal CDF) for tree 1, and each tree's pair copula h-function feeds the next tree's arguments.
>
> **Computation cost:** $O(d^2)$ h-function evaluations per observation; for sequential estimation with $n$ observations and $d$ variables, the total cost is $O(n d^2)$ per tree.
^h-recursion

### Sequential log-likelihood and estimation

> [!definition] Sequential maximum likelihood (Aas et al. 2009, §4)
> Let $\hat{\theta}^{(j)}$ denote the parameter estimates at tree $j$. Sequential estimation proceeds:
>
> **Step 1 (Tree 1):** Fit each pair copula $c_{ij}$ using the pseudo-observations $\hat{u}_{it} = \hat{F}_i(x_{it})$ (empirical CDF ranks). Maximize:
> $$\hat{\theta}^{(1)} = \arg\max \sum_{k \in \text{Tree 1}} \sum_{t=1}^{n} \log c_{k}(u_{it}, u_{jt}; \theta_k)$$
>
> **Step $j$ (Tree $j \geq 2$):** Given $\hat{\theta}^{(1)}, \ldots, \hat{\theta}^{(j-1)}$, compute conditional pseudo-observations using the fitted h-functions, then fit tree $j$'s pair copulas:
> $$\hat{\theta}^{(j)} = \arg\max \sum_{k \in \text{Tree}_j} \sum_{t=1}^{n} \log c_{k}(\hat{F}(x_{it}|\mathbf{x}_{\mathbf{D}(k),t}),\, \hat{F}(x_{jt}|\mathbf{x}_{\mathbf{D}(k),t});\, \theta_k)$$
> where $\mathbf{D}(k)$ is the conditioning set for pair $k$.
>
> **Statistical properties:** Sequential MLE is consistent and asymptotically normal for fixed $d$ and $n \to \infty$ (Hobæk Haff, Aas & Frigessi 2010). Full joint MLE (using sequential estimates as starting values) is more efficient but computationally expensive for large $d$.
^sequential-estimation

## Examples

> [!example] 4-dimensional D-vine: constructing the h-function recursion
> **Setup:** Variables $(X_1, X_2, X_3, X_4)$, D-vine ordering $1–2–3–4$.
>
> **Tree 1 (3 pairs):**
> - $c_{12}$: fit to $(u_1, u_2)$ where $u_i = F_i(x_i)$
> - $c_{23}$: fit to $(u_2, u_3)$
> - $c_{34}$: fit to $(u_3, u_4)$
>
> **Conditional distributions for Tree 2:**
> - $F(x_1|x_2) = h(u_1, u_2; \hat\theta_{12})$
> - $F(x_3|x_2) = h(u_3, u_2; \hat\theta_{23})$
> - $F(x_2|x_3) = h(u_2, u_3; \hat\theta_{23})$  
> - $F(x_4|x_3) = h(u_4, u_3; \hat\theta_{34})$
>
> **Tree 2 (2 pairs):**
> - $c_{13|2}$: fit to $(F(x_1|x_2), F(x_3|x_2))$
> - $c_{24|3}$: fit to $(F(x_2|x_3), F(x_4|x_3))$
>
> **Conditional distributions for Tree 3:**
> - $F(x_1|x_2,x_3) = h(F(x_1|x_2),\, F(x_3|x_2);\, \hat\theta_{13|2})$
> - $F(x_4|x_2,x_3) = h(F(x_4|x_3),\, F(x_2|x_3);\, \hat\theta_{24|3})$
>
> **Tree 3 (1 pair):**
> - $c_{14|23}$: fit to $(F(x_1|x_2,x_3), F(x_4|x_2,x_3))$
>
> **Total:** 3+2+1 = 6 pair copulas for $d=4$.

> [!example] Simulation from a vine copula (inverse Rosenblatt)
> Generate $d$ uniform[0,1] samples $w_1, \ldots, w_d$ independently.
>
> For a D-vine with ordering $1–2–\ldots–d$:
> 1. $u_1 = w_1$; $u_2 = h^{-1}(w_2, u_1; \theta_{12})$
> 2. For $k = 3, \ldots, d$: apply $k-1$ successive inverse h-functions using the conditional distributions already computed.
>
> The inverse h-function $h^{-1}(p, v; \theta)$ satisfies $h(h^{-1}(p,v;\theta), v; \theta) = p$; for most families it requires numerical root-finding. The simulation is exact (not approximate) under the simplifying assumption.

## Connections

- [[Regular Vine Structures]] — the graph-theoretic vine tree framework; R-vine generalises both C-vine and D-vine.
- [[Vine Copula Estimation and Selection]] — Dissmann's structure-selection algorithm and R package implementations.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copula architecture.
- [[Factor Copula Construction]] — the competing factor-based latent-variable architecture.
- [[SMM Estimation of Factor Copulas]] — SMM-based estimation for factor copulas; contrast with the MLE-based vine approach.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ links to copula parameters; central to vine structure selection.

## See Also

- [[_Index|Dependence Modeling]] — folder index
- Joe (1996) — original pair-copula construction proposal
- Hobæk Haff, Aas & Frigessi (2010) — consistency of sequential vine MLE
