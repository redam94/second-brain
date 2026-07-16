---
title: Pair-Copula Decomposition
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Part 1 (Aas et al. 2009, Sec. 2)"
date_ingested: 2026-07-16
date_updated: 2026-07-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Regular Vine Copulas]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC density decomposition
  - vine copula density
  - h-function recursion
  - conditional copula density
---

# Pair-Copula Decomposition

> [!summary]
> Any $N$-variate joint density can be written as a product of $N$ marginal densities and $N(N-1)/2$ **bivariate copula densities**, each evaluated at recursively-defined **conditional marginal CDFs** (h-functions). The decomposition is not unique: different orderings of the variables give different but equally valid factorizations, organized by a vine graph. The h-function — the partial derivative of a bivariate copula with respect to one of its arguments — is the key computational primitive that turns the recursive formula into an algorithm.

## Overview

Sklar's theorem says every joint CDF has a unique copula representation $F(\mathbf{x}) = C(F_1(x_1),\ldots,F_N(x_N))$. Differentiating:
$$f(\mathbf{x}) = c(F_1(x_1),\ldots,F_N(x_N)) \cdot \prod_{k=1}^N f_k(x_k)$$

For $N \ge 3$, the $N$-dimensional copula density $c$ is what we want to model. The pair-copula construction rewrites this density as a cascade of **bivariate** copula densities applied to conditional CDFs, building from pairwise marginals up through increasingly complex conditioning sets. The key insight: a conditional joint density factors as:
$$f_{i,j|D}(x_i,x_j|\mathbf{x}_D) = c_{ij|D}(F_{i|D}(x_i|\mathbf{x}_D), F_{j|D}(x_j|\mathbf{x}_D)) \cdot f_{i|D}(x_i|\mathbf{x}_D) \cdot f_{j|D}(x_j|\mathbf{x}_D)$$

This recursion terminates because each conditional density has one fewer conditioning variable.

## Main Content

> [!theorem] Pair-copula decomposition (Joe 1996, Aas et al. 2009)
> Let $(X_1,\ldots,X_N)$ have joint density $f$ and marginals $f_1,\ldots,f_N$. Any ordering of the variables and any valid vine structure yields:
> $$f(x_1,\ldots,x_N) = \prod_{k=1}^N f_k(x_k) \cdot \prod_{i=1}^{N-1}\prod_{e\in T_i} c_{j(e),k(e)|D(e)}\!\left(F_{j(e)|D(e)}(x_{j(e)}|\mathbf{x}_{D(e)}),\; F_{k(e)|D(e)}(x_{k(e)}|\mathbf{x}_{D(e)})\right)$$
> where:
> - $T_1,\ldots,T_{N-1}$ is a vine (sequence of trees); $T_i$ has $N-i$ edges.
> - For edge $e \in T_i$: $j(e), k(e)$ are the **conditioned nodes** (variables whose dependence is being modelled by this pair); $D(e)$ is the **conditioning set** (nodes shared between the two endpoints of $e$ in $T_i$, which equals the union of the conditioning sets of the two edges that $e$ merges, minus the conditioned variables).
> - $c_{j,k|D}$ is a bivariate copula density (under the simplifying assumption, free of $\mathbf{x}_D$).
> - $F_{j|D}$ is the conditional CDF of $X_j$ given $\mathbf{X}_D = \mathbf{x}_D$, evaluated via the h-function recursion below.
>
> **Proof sketch:** Apply the chain rule for conditional densities $N-1$ times, then apply bivariate Sklar at each step. Non-uniqueness follows because there are multiple valid vine structures for $N \ge 4$.
> ^thm-pcc-density

> [!definition] H-function (bivariate conditioning transform)
> For a bivariate copula $C_{u_1,u_2}(u_1,u_2;\theta)$ with parameter(s) $\theta$, define:
> $$h(u_1|u_2;\theta) \equiv \frac{\partial C_{u_1,u_2}(u_1,u_2;\theta)}{\partial u_2}$$
> This is the **conditional CDF** $F_{U_1|U_2=u_2}(u_1)$ under the copula model. The h-function:
> 1. Is bounded in $[0,1]$ (it is itself a proper CDF).
> 2. Has a closed-form expression for every standard parametric bivariate copula family (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, etc.).
> 3. Is used to **propagate pseudo-observations** up the vine: the arguments for the bivariate copula in tree $T_{i+1}$ are obtained by applying h-functions from the copulas in tree $T_i$.
>
> **H-functions for standard families:**
> | Copula family | $h(u_1|u_2;\theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u_1) - \rho\,\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$ |
> | Clayton($\theta$) | $u_2^{-\theta-1}(u_1^{-\theta}+u_2^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta$) | $C_{\text{Gumbel}}(u_1,u_2;\theta)\cdot\dfrac{1}{u_2}\cdot\dfrac{(-\ln u_2)^\theta}{(-\ln u_1)^\theta+(-\ln u_2)^\theta}^{(\theta-1)/\theta}$ |
> | Frank($\theta$) | $\dfrac{e^{-\theta u_2}(e^{-\theta u_1}-1)}{(e^{-\theta u_2}-1)(e^{-\theta(u_1+u_2)/(e^{-\theta}-1)})}$ |
> | Student-$t(\rho,\nu)$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u_1)-\rho t_\nu^{-1}(u_2)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(u_2))^2)/(\nu+1)}}\right)$ |
>
> where $\Phi$ and $t_\nu$ are the standard normal and Student-$t$ CDFs respectively.
> ^def-hfunction

> [!definition] H-function recursion for computing conditional CDFs
> The conditional CDFs $F_{j|D}$ required in the vine density formula are computed by iterating the h-function:
>
> **Base case:** $F_{j|\emptyset}(x_j) = F_j(x_j)$ — the unconditional marginal CDF.
>
> **Recursive step:** To condition on one more variable, say $v$ (with existing conditioning set $D\setminus\{v\}$):
> $$F_{j|D}(x_j|\mathbf{x}_D) = h\!\left(F_{j|D\setminus\{v\}}(x_j|\mathbf{x}_{D\setminus\{v\}})\,\Big|\, F_{v|D\setminus\{v\}}(x_v|\mathbf{x}_{D\setminus\{v\}})\,;\, \theta_{j,v|D\setminus\{v\}}\right)$$
>
> This says: to additionally condition on $v$, apply the h-function of the bivariate copula linking $j$ and $v$ (given the rest of $D$) to the two already-computed conditional CDFs. The order in which variables are added to the conditioning set determines the vine structure used.
> ^def-hrecursion

## Examples

> [!example] Three-variable pair-copula decompositions
> For $(X_1,X_2,X_3)$, there are **three distinct D-vine orderings**:
>
> **Ordering 1-2-3:**
> $$f(x_1,x_2,x_3) = f_1 f_2 f_3 \cdot c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot c_{13|2}(h(F_1|F_2;\hat\theta_{12}),\; h(F_3|F_2;\hat\theta_{23});\theta_{13|2})$$
>
> **Ordering 2-1-3:**
> $$f(x_1,x_2,x_3) = f_1 f_2 f_3 \cdot c_{12}(F_1,F_2)\cdot c_{13}(F_1,F_3)\cdot c_{23|1}(h(F_2|F_1;\hat\theta_{12}),\; h(F_3|F_1;\hat\theta_{13});\theta_{23|1})$$
>
> **Both are valid** representations of the same joint density (given the true conditional copulas $c_{13|2}$ and $c_{23|1}$ are correctly specified). In practice, the orderings differ in which pair's residual dependence is modelled at the highest conditioning level — choose the ordering that makes the most conditional-independence assumptions plausible.

> [!example] Computing the bivariate copula argument for tree $T_2$
> In the D-vine ordering 1-2-3, the copula $c_{13|2}$ takes arguments $(F_{1|2}, F_{3|2})$:
> - $F_{1|2}(x_1|x_2) = h(F_1(x_1)|F_2(x_2);\hat\theta_{12})$ — apply h-function of the $(1,2)$ copula.
> - $F_{3|2}(x_3|x_2) = h(F_3(x_3)|F_2(x_2);\hat\theta_{23})$ — apply h-function of the $(2,3)$ copula.
>
> After substituting estimated marginals $\hat{F}_i$ and estimated copula parameters $\hat\theta$, these become **pseudo-observations** $(\hat{v}_{1|2},\hat{v}_{3|2})$ on which the copula $c_{13|2}$ is estimated in the next step.

## Connections

- [[Vine Copulas - Overview]] — motivation, non-uniqueness, and the simplifying assumption.
- [[C-vine and D-vine Structures]] — how the vine ordering determines which variables are conditioned on first.
- [[Regular Vine Copulas]] — the general Bedford-Cooke structure organizing arbitrary orderings via rooted spanning trees.
- [[Vine Copula Estimation and Model Selection]] — how h-functions power the sequential estimation algorithm: each tree uses pseudo-observations from the previous tree's h-function outputs.
- [[Dependence Measures for Copulas]] — bivariate dependence measures (Kendall's $\tau$, quantile dependence) applied at each node.
- [[Factor Copula Construction]] — the alternative: a latent factor model that also avoids an explicit multivariate copula density, but via simulation rather than pair-copula cascades.

## See Also

- Joe (1996), IMS Lecture Notes 28, pp. 120–141 — the original conditional decomposition.
- Aas et al. (2009), *Insurance: Mathematics and Economics*, 44(2) — systematic estimation framework.
- [[_Index|Dependence Modeling]]
- [[../_Index|Econometrics]]
