---
title: "Pair-Copula Constructions"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/vine-copula-sources.md]]"
source_location: "Bedford & Cooke (2001, 2002); Aas et al. (2009), Secs. 2-3"
date_ingested: 2026-09-27
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - PCC
  - pair copula construction
  - vine density factorisation
  - cascade factorisation
  - regular vine density
---

# Pair-Copula Constructions

> [!summary]
> A **pair-copula construction (PCC)** is an exact factorisation of a $d$-dimensional joint density into a product of $d$ marginal densities and $d(d-1)/2$ bivariate copula densities, each potentially from a different parametric family. The bivariate copulas are arranged in a sequence of $d-1$ trees — a "vine" — where each tree describes which pairs are modelled unconditionally (tree $T_1$) and which conditionally on variables from earlier trees ($T_2, T_3, \ldots$). Under the **simplifying assumption** (conditional copulas do not depend on conditioning values), estimation is tractable via sequential or full maximum likelihood.

## Overview

The pair-copula construction resolves a core tension in multivariate modelling: full flexibility requires a $d$-dimensional density with potentially millions of parameters; tractable parametric families sacrifice flexibility for parsimony. The PCC achieves a middle ground by noting that any joint density factors into conditionals, and each conditional density factors via Sklar's theorem into a copula and a marginal. Iterating this argument yields an exact decomposition into bivariate building blocks.

## The Density Factorisation Theorem

The starting point is the chain rule for joint densities. For a three-dimensional case, the density $f(x_1, x_2, x_3)$ can be written as:

$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_{2|1}(x_2 | x_1) \cdot f_{3|12}(x_3 | x_1, x_2)$$

Each conditional density can be decomposed using Sklar's theorem. For any conditional density $f_{j|i}(x_j | x_i)$:
$$f_{j|i}(x_j | x_i) = c_{ij}(F_i(x_i), F_j(x_j)) \cdot f_j(x_j)$$
where $c_{ij}$ is the density of the bivariate copula of $(X_i, X_j)$ and $F_i, F_j$ are the marginal CDFs.

For the conditional density $f_{3|12}(x_3 | x_1, x_2)$, two decompositions are possible (corresponding to two different vine structures). Aas et al. (2009) show the general result:

> [!theorem] Theorem: Pair-Copula Construction (Aas et al. 2009, Prop. 1)
> Any $d$-dimensional density $f(x_1, \ldots, x_d)$ can be written as:
> $$f(x_1, \ldots, x_d) = \left[\prod_{k=1}^d f_k(x_k)\right] \times \left[\prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\bigl(F_{i|i+1,\ldots,i+j-1}(x_i|\cdot),\, F_{i+j|i+1,\ldots,i+j-1}(x_{i+j}|\cdot)\bigr)\right]$$
> for a **D-vine** ordering. Each $c_{a,b|D}$ is a bivariate copula density conditioning on the set $D$, evaluated at conditional CDFs $F_{a|D}$ and $F_{b|D}$.
>
> **Significance:** The full joint density depends on the marginals only through the marginal densities $f_k$; all dependence is captured by the $d(d-1)/2$ bivariate copulas $c_{a,b|D}$.
^thm-pcc-density

## Three-Variable Example

For $(X_1, X_2, X_3)$ with a D-vine ordering $1 - 2 - 3$:

$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3) \cdot c_{12}(F_1, F_2) \cdot c_{23}(F_2, F_3) \cdot c_{13|2}(F_{1|2}(x_1|x_2),\, F_{3|2}(x_3|x_2))$$

The three bivariate copulas are:
- $c_{12}$: unconditional copula of $(X_1, X_2)$ — tree $T_1$
- $c_{23}$: unconditional copula of $(X_2, X_3)$ — tree $T_1$
- $c_{13|2}$: copula of $(X_1, X_3)$ *conditional on $X_2$* — tree $T_2$

This is a **D-vine** (path $1-2-3$). The alternative C-vine (star centred at $X_2$) would have the same first-tree copulas but a different second-tree structure. For $d=3$ the two structures coincide.

> [!example] Four-variable D-vine density
> **Vine structure:** Path $1 - 2 - 3 - 4$ in $T_1$.
>
> **Density:**
> $$f(x_1,x_2,x_3,x_4) = \prod_{k=1}^4 f_k(x_k) \times \underbrace{c_{12} \cdot c_{23} \cdot c_{34}}_{T_1\text{ (unconditional)}} \times \underbrace{c_{13|2} \cdot c_{24|3}}_{T_2\text{ (cond. on 1 var.)}} \times \underbrace{c_{14|23}}_{T_3\text{ (cond. on 2 vars.)}}$$
>
> **Parameters:** 6 bivariate copulas = $4(4-1)/2$. Each copula can be a different family (e.g., $c_{12}$ Clayton, $c_{13|2}$ Frank, $c_{14|23}$ Gaussian), adapting to heterogeneous dependence.
^example-4var

## Computing Conditional CDFs

Evaluating the density requires computing conditional CDFs like $F_{1|2}(x_1|x_2)$. Under the simplifying assumption, this uses the *h-function*:

> [!definition] Definition: h-function (Aas et al. 2009)
> For a bivariate copula $C_{ij}$ with density $c_{ij}$, the $h$-function is the conditional CDF of one uniform margin given the other:
> $$h(u, v; \boldsymbol{\theta}) = F_{U|V}(u | v) = \frac{\partial C_{ij}(u, v; \boldsymbol{\theta})}{\partial v}$$
>
> **Usage in vine evaluation:** Given pseudo-observations $(F_{i|D}(x_i), F_{j|D}(x_j))$ from tree $T_k$, the conditional CDFs for tree $T_{k+1}$ are computed as:
> $$F_{i|D \cup \{j\}}(x_i | x_D, x_j) = h(F_{i|D}(x_i|\mathbf{x}_D),\, F_{j|D}(x_j|\mathbf{x}_D);\, \hat{\boldsymbol{\theta}}_{ij|D})$$
>
> Each tree level produces new pseudo-observations by applying $h$-functions to those from the level below.
^def-h-function

**Closed-form h-functions** exist for the major copula families:
- **Gaussian copula** ($\rho$): $h(u,v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
- **Student-$t$ copula** ($\rho, \nu$): analogous expression with $t_\nu$ quantiles and $t_{\nu+1}$ distribution
- **Clayton copula** ($\theta$): $h(u,v;\theta) = v^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1-1/\theta}$

## Sequential Maximum Likelihood Estimation

Aas et al. (2009) propose a tree-by-tree estimation procedure:

> [!definition] Sequential MLE for vine copulas
> **Input:** Data $(x_{1t}, \ldots, x_{d,t})$ for $t = 1, \ldots, T$; vine structure (which pairs in each tree).
>
> **Step 1 (Tree $T_1$):** Compute pseudo-observations $\hat{u}_{it} = \hat{F}_i(x_{it})$ using empirical CDFs (or parametric marginals). Estimate each pair-copula $c_{ij}$ in $T_1$ by maximising its log-likelihood over its parameters $\boldsymbol{\theta}_{ij}$.
>
> **Step 2 (Tree $T_2$):** Use the estimated $T_1$ copulas to transform pseudo-observations to the next level:
> $$\hat{u}_{i|j,t} = h(\hat{u}_{it}, \hat{u}_{jt};\, \hat{\boldsymbol{\theta}}_{ij})$$
> Estimate each $T_2$ pair-copula from these transformed pseudo-observations.
>
> **Steps 3 to $d-1$:** Repeat — apply $h$-functions using estimated copulas from the previous tree, then fit the next tree's copulas.
>
> **Properties:** Sequential MLE is not the same as full MLE (which maximises the joint log-likelihood over all $d(d-1)/2$ copulas simultaneously), but it is consistent and asymptotically normal (under regularity conditions). It provides good starting values for full MLE. The sequential estimator is much faster — $O(d^2)$ bivariate optimisations vs a single $O(d^2)$-parameter joint optimisation.
^def-sequential-mle

## Pair Copula Family Selection

At each tree level, the analyst must choose the copula family for each pair. The standard approach:
1. Fit several candidate families (Gaussian, $t$, Clayton, Gumbel, Frank, BB1, BB7, independence) to the pseudo-observations.
2. Select by AIC or BIC (or the modified mBICV in `rvinecopulib`).
3. Use the selected family for $h$-function computation in the next tree.

The independence copula (density = 1) is a special selection that truncates the vine — trees above the truncation level contribute no dependence and need not be estimated. This is the **truncated vine** approximation used in very high dimensions.

## Full MLE

Given the sequential estimates as starting values, full MLE maximises:
$$\ell(\boldsymbol{\Theta}) = \sum_{t=1}^T \sum_{j=1}^{d-1} \sum_{e \in E_j} \log c_{a(e),b(e)|D(e)}\bigl(\hat{F}_{a(e)|D(e),t},\, \hat{F}_{b(e)|D(e),t};\, \boldsymbol{\theta}_{a(e),b(e)|D(e)}\bigr)$$
jointly over all pair-copula parameters $\boldsymbol{\Theta} = \{\boldsymbol{\theta}_{a,b|D}\}$. This is feasible for $d \leq 15$–$20$; in higher dimensions, sequential MLE or truncated vines are used.

## Connections

- [[Vine Copulas - Overview]] — the high-level picture and historical context
- [[C-Vine and D-Vine Structures]] — the specific tree topologies that determine which conditional copulas appear
- [[Factor Copula Construction]] — the alternative latent-factor approach that achieves parsimony with a single shared factor instead of $d(d-1)/2$ pair copulas
- [[SMM Estimation of Factor Copulas]] — factor copulas require SMM (no closed-form likelihood); vine copulas use (sequential) MLE, which is faster for small-to-medium dimensions
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ are used as diagnostics; Dissmann's structure selection algorithm uses Kendall's $\tau$ as the criterion

## See Also

- [[Vine Copulas - Overview]] — motivation and types
- [[C-Vine and D-Vine Structures]] — tree topologies
- [[Copula Architecture Comparison]] — vine vs factor vs other copulas
- [[SMM Estimator for Copulas]] — factor copula estimation contrast
