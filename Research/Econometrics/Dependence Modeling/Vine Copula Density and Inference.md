---
title: "Vine Copula Density and Inference"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.pdf]]"
source_location: "Secs. 3-5, pp. 8-25"
date_ingested: 2026-10-15
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Structures]]"
used_by:
  - "[[Factor Copulas - Overview]]"
aliases:
  - h-function
  - vine copula estimation
  - sequential MLE vine
  - Dißmann algorithm
  - simplifying assumption vine
---

# Vine Copula Density and Inference

> [!summary]
> This note covers the **mechanics of vine copula inference**: the h-function recursion that computes conditional CDFs required by higher-level pair copulas; the full R-vine density formula; the **simplifying assumption** that makes inference tractable; the **sequential MLE** procedure introduced by Aas et al. (2009); and the **Dißmann greedy algorithm** (2013) for simultaneously selecting the vine structure and bivariate copula families. The VineCopula R package (Schepsmeier et al.) and the pyvinecopulib Python library implement these methods.

## Overview

A vine copula density is a product of $d(d-1)/2$ bivariate copula densities. To evaluate this product for a given observation $(x_1, \ldots, x_d)$, one needs the conditional CDFs that serve as inputs to the higher-tree pair copulas. For example, the pair $c_{1,3|2}$ requires $F(x_1 | x_2)$ and $F(x_3 | x_2)$. These conditional CDFs are computed from the pair copulas in the previous tree via the **h-function** — a partial derivative of the bivariate copula CDF.

The full vine density thus requires:
1. Evaluating marginal densities $f_i(x_i)$.
2. Evaluating the tree-$T_1$ copula densities $c_{ij}(u_i, u_j)$ and CDFs.
3. Computing h-functions to obtain conditional CDFs for tree $T_2$.
4. Evaluating tree-$T_2$ copula densities, computing h-functions for tree $T_3$, and so on.

This sequential structure means vine copulas always have a **closed-form density** (no simulation required), unlike factor copulas. The trade-off is that model selection is harder.

## Main Content

> [!definition] H-function: the conditional CDF
> For a bivariate copula $C_{12}(u_1, u_2)$ with copula density $c_{12}$, the **h-function** is the conditional distribution of $U_1$ given $U_2 = u_2$:
> $$ h(u_1 | u_2; \boldsymbol{\theta}) = C_{1|2}(u_1 | u_2; \boldsymbol{\theta}) = \frac{\partial C_{12}(u_1, u_2; \boldsymbol{\theta})}{\partial u_2} $$
> In a vine, the h-function maps $(u_1, u_2) \mapsto u_{1|2}$, a conditional uniform. This is the input to the next-level pair copula.
>
> **Closed forms for common families:**
>
> | Family | $C_{12}(u,v)$ | $h(u|v)$ |
> |---|---|---|
> | Gaussian($\rho$) | $\Phi_2(\Phi^{-1}(u), \Phi^{-1}(v); \rho)$ | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu,\rho}(t_\nu^{-1}(u), t_\nu^{-1}(v))$ | $t_{\nu+1}\!\left(\sqrt{\frac{\nu+1}{\nu+x_v^2}}\cdot\frac{x_u - \rho x_v}{\sqrt{1-\rho^2}}\right)$, $x_u=t_\nu^{-1}(u)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta$) | $\exp\!\left(-[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta}\right)$ | (analytical but complex — see Joe 2014) |
>
> The h-function is called **h-function in first argument** when conditioning on the second argument, $h(u|v)$. Most implementations also need the **inverse h-function** $h^{-1}(u|v)$ for simulation.
^def-hfun

> [!definition] R-vine density formula
> For an R-vine $V$ on $d$ variables with bivariate copulas $\{c_{j(e),k(e)|D(e)}\}_{e \in V}$, the joint density is:
> $$ f(x_1,\ldots,x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{m=1}^{d-1} \prod_{e \in T_m} c_{j(e),k(e)|D(e)}\!\left(F(x_{j(e)}|x_{D(e)}), F(x_{k(e)}|x_{D(e)})\right) $$
> where the conditional CDFs $F(x_{j(e)}|x_{D(e)})$ are evaluated recursively using h-functions from the lower trees. The outer product runs over all $d-1$ trees; the inner product over all $d-m$ edges in tree $T_m$.
>
> **Log-likelihood:** Adding up the log bivariate copula densities over all pairs and all observations:
> $$ \ell(\boldsymbol{\theta}) = \sum_{t=1}^n \sum_{m=1}^{d-1} \sum_{e \in T_m} \log c_{j(e),k(e)|D(e)}\!\left(F(x_{t,j(e)}|x_{t,D(e)}), F(x_{t,k(e)}|x_{t,D(e)})\right) $$
^def-density

> [!definition] Simplifying assumption
> For a vine to be tractable in general, one must evaluate $c_{j,k|D}(F(x_j|x_D), F(x_k|x_D))$ — a copula density that in principle depends not just on the conditional CDF values $(u_j, u_k)$ but also on the realized conditioning values $x_D$. The **simplifying assumption** (Hobæk Haff et al. 2010; Czado 2019) states:
> $$ c_{j,k|D}(u_j, u_k | x_D) = c_{j,k|D}(u_j, u_k) \quad \forall\, x_D $$
> i.e., the conditional copula is the same for all conditioning realizations. Under this assumption, the vine density simplifies to the formula above, and inference is vastly simpler.
>
> **Validity:** The simplifying assumption is exact only for the Gaussian copula (by the properties of the multivariate normal) and for Archimedean copulas under specific conditions. For most copula families in practice, it is an approximation. It is almost universally used, and Czado & Nagler (2022) note that misspecification tests rarely reject it in financial applications.
^def-simplifying

> [!definition] Sequential MLE (Aas et al. 2009)
> Given pseudo-observations $\hat{u}_i = \hat{F}_i(x_i)$ (either parametric marginal estimates or empirical probability integral transforms):
>
> **Step 1 — Tree $T_1$:** Fit each bivariate copula $c_{j(e),k(e)}$ independently by MLE on the pairs $(\hat{u}_{j(e)}, \hat{u}_{k(e)})$. Obtain estimated copula parameters $\hat{\boldsymbol{\theta}}_e^{(1)}$ and evaluate h-functions to get $\hat{u}_{j(e)|D(e)}$ for each pair.
>
> **Step 2 — Tree $T_2$:** Fit each bivariate copula $c_{j(e),k(e)|D(e)}$ by MLE on the pseudo-conditional-CDFs $(\hat{u}_{j(e)|D(e)}, \hat{u}_{k(e)|D(e)})$ obtained from Step 1. Compute h-functions to propagate to Tree $T_3$.
>
> **Steps 3 to $d-1$:** Continue the sequential pattern.
>
> **Properties:** Each step's MLE is a standard bivariate copula MLE — straightforward to maximize and fast to compute. The sequential estimator is consistent but **not efficient**: it ignores parameter uncertainty propagated through the h-function recursion. **Full MLE** maximizes the joint log-likelihood over all parameters simultaneously (slower, more efficient). Sequential estimates are good starting values for full MLE.
^def-sequential

> [!definition] Dißmann algorithm: structure and family selection (Dißmann et al. 2013)
> The Dißmann greedy algorithm simultaneously selects the vine structure and the bivariate copula family for each pair:
>
> **For tree $T_1$:**
> 1. Compute Kendall's $\hat{\tau}_{ij}$ for all $\binom{d}{2}$ pairs.
> 2. Build a complete graph with edge weights $|\hat{\tau}_{ij}|$.
> 3. Solve the **maximum spanning tree** problem (Prim's or Kruskal's algorithm). The MST is tree $T_1$ — it pairs the most strongly dependent variables first.
> 4. For each edge in $T_1$, select the best-fitting bivariate copula family by AIC (or BIC) from a candidate set (e.g., Gaussian, $t$, Clayton, Gumbel, Frank, Joe, plus their rotations for negative/asymmetric dependence).
>
> **For trees $T_2, \ldots, T_{d-1}$:**
> 1. Compute pseudo-observations for the conditional pairs using the h-functions from the fitted copulas in the previous tree.
> 2. Compute Kendall's $\hat{\tau}$ for all valid conditional pairs (those satisfying the proximity condition).
> 3. Solve the MST problem restricted to the R-vine proximity condition.
> 4. Select the bivariate copula family for each new edge by AIC.
>
> **Truncation:** For large $d$, fit only trees $T_1, \ldots, T_k$ for some truncation level $k \ll d-1$, and set all copulas in higher trees to independence copulas. AIC-based truncation level selection is standard practice.
^def-dissmann

> [!definition] Vine copula software
> - **VineCopula** (R package, Schepsmeier et al.): Implements the Dißmann algorithm, 27+ bivariate copula families, sequential and full MLE. The `RVineStructureSelect()` function implements the full Dißmann procedure. Also supports D-vine time-series models (SCAR models, Brechmann & Czado 2015).
> - **rvinecopulib** (R, Nagler et al.): Faster C++ backend, supports truncation and parallel fitting.
> - **pyvinecopulib** (Python): Python bindings for the rvinecopulib C++ library. Comparable functionality with a `Vinecop` class and `fit` method.
> - **CDVine** (older R package, Brechmann & Schepsmeier 2013): Restricted to C-vine and D-vine; superseded by VineCopula.
^def-software

## Examples

> [!example] Sequential estimation on $d=3$ D-vine
> **Setup:** Three variables $X_1, X_2, X_3$. D-vine: tree $T_1$ pairs $(1,2)$ and $(2,3)$; tree $T_2$ pairs $(1,3|2)$.
>
> **Step 1:**
> - Fit $c_{12}$ by MLE on $(\hat{u}_1, \hat{u}_2)$. Say it's a $t$ copula with $\hat{\rho}_{12} = 0.6$, $\hat{\nu}_{12} = 5$.
> - Fit $c_{23}$ by MLE on $(\hat{u}_2, \hat{u}_3)$. Say it's a Gumbel copula with $\hat{\theta}_{23} = 1.8$.
>
> **Step 2:**
> - Compute $\hat{u}_{1|2} = h({\hat{u}_1}|\hat{u}_2;\, \hat{\rho}_{12}, \hat{\nu}_{12})$ using the $t$-copula h-function.
> - Compute $\hat{u}_{3|2} = h(\hat{u}_3|\hat{u}_2;\, \hat{\theta}_{23})$ using the Gumbel h-function.
> - Fit $c_{13|2}$ by MLE on $(\hat{u}_{1|2}, \hat{u}_{3|2})$. Say it's a Clayton copula with $\hat{\theta}_{13|2} = 0.5$.
>
> **Density:** $f(x_1,x_2,x_3) = f_1(x_1)f_2(x_2)f_3(x_3) \cdot c_{12}^t(u_1,u_2) \cdot c_{23}^{\text{Gum}}(u_2,u_3) \cdot c_{13|2}^{\text{Clay}}(h(u_1|u_2),h(u_3|u_2))$
>
> **Interpretation:** The joint model mixes a symmetric ($t$ copula, pair $(1,2)$), upper-tail-dependent (Gumbel, pair $(2,3)$), and lower-tail-dependent (Clayton, pair $(1,3)$ conditional on $X_2$) copula — impossible with any single multivariate copula family.

> [!example] Dißmann algorithm for $d=5$: maximum spanning trees
> **Setup:** Five variables; compute all $\binom{5}{2}=10$ Kendall's $\tau$ values.
> Suppose the three strongest unconditional dependencies are: $|\tau_{12}|=0.55$, $|\tau_{34}|=0.52$, $|\tau_{25}|=0.48$, $|\tau_{23}|=0.44$, $|\tau_{45}|=0.40$, and the remaining five pairs have $|\tau| < 0.3$.
>
> **MST for $T_1$:** Adding edges in order of $|\tau|$: $(1,2)$, $(3,4)$, $(2,5)$, $(2,3)$ — the fifth would create a cycle. Final $T_1$: path $1-2-3-4$ plus edge $2-5$ (a tree with one hub at 2 — between D-vine and C-vine).
>
> **Interpretation:** The Dißmann algorithm finds a $T_1$ that is not a pure C-vine or D-vine; it is a general R-vine, reflecting the actual dependence structure.

## Connections

- [[Regular Vine Structures]] — the formal definition of vines, C-vine, D-vine, and R-vine.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Factor Copulas - Overview]] — contrasting architecture: factor copulas have no closed-form density and require SMM; vine copulas always have a closed-form density and can use MLE.
- [[SMM Estimation of Factor Copulas]] — the SMM estimator used for factor copulas; contrast with sequential/full MLE for vines.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ as an edge weight in the Dißmann MST algorithm.

## See Also

- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence," *Insurance: Mathematics and Economics*, 44(2), 182–198.
- Dißmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and estimating regular vine copulae and application to financial returns," *Computational Statistics & Data Analysis*, 59, 52–69. The greedy MST selection algorithm.
- Czado, C. (2019) — *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*, Springer.
- Czado & Nagler (2022) — "Vine Copula Based Modeling," *Annual Review of Statistics and Its Application*, 9, 453–477.
- [[../_Index|Dependence Modeling]]
