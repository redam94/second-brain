---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Aas-Czado-2009-Pair-Copula-Constructions.txt]]"
source_location: "Secs. 2–3, pp. 3–11; Bedford & Cooke (2002) Secs. 2–4"
date_ingested: 2026-10-24
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC density
  - pair copula decomposition
  - h-function
  - vine density factorisation
  - Bedford Cooke factorisation
---

# Pair Copula Construction

> [!summary]
> A pair copula construction (PCC) expresses an $n$-variate density as a product of $n$ marginals and $n(n-1)/2$ bivariate copula densities, each evaluated at conditional CDFs. The bivariate building blocks are organised by a **vine** — a sequence of $n-1$ trees. The key computational primitive is the **h-function**: the conditional CDF $F(x \mid \mathbf{v}) = \partial C_{xv}(F(x|\mathbf{v}_{-}), F(v|\mathbf{v}_{-}))/\partial F(v|\mathbf{v}_{-})$, which propagates conditioning sets down the vine trees. The construction was introduced by Bedford & Cooke (2002) and operationalised by Aas et al. (2009).

## Overview

The core idea of a pair copula construction is a recursive density factorisation. By the chain rule and Sklar's theorem, any joint density can be written as a product involving conditional densities, and each conditional density can in turn be expressed via a bivariate copula density applied to conditional CDFs. Repeating this decomposition produces a product of $n$ marginals and $\binom{n}{2}$ bivariate copula densities — one for each unique pair of variables (possibly conditioned on a set of others).

The vine graph organises **which** conditioning sets and variable pairs appear at each stage. Different vine structures yield different (but equally valid) decompositions; the analyst's choice of structure encodes assumptions about which conditional dependencies are modelled most flexibly.

## Main Content

> [!definition] Conditional pair copula and bivariate margin
> Let $\mathbf{v} = (v_1,\dots,v_k)$ be a conditioning set. For any two variables $x, y$ and conditioning set $\mathbf{v}$, the **pair copula** $C_{xy|\mathbf{v}}$ is defined as the bivariate copula of $(X, Y)$ given $\mathbf{V}=\mathbf{v}$. Under regularity conditions the **conditional joint density** factors as:
> $$ f(x, y | \mathbf{v}) = c_{xy|\mathbf{v}}\!\left(F(x|\mathbf{v}),\, F(y|\mathbf{v})\right) \cdot f(x|\mathbf{v}) \cdot f(y|\mathbf{v}) $$
> where $c_{xy|\mathbf{v}}$ is the bivariate copula density of $(F(X|\mathbf{V}), F(Y|\mathbf{V}))$.
>
> **Key assumption (simplifying):** In practice, most vine copula implementations use the **simplifying assumption**: $C_{xy|\mathbf{v}}$ does not depend on the realised value of $\mathbf{v}$, only on which variables are in the conditioning set. This makes estimation tractable; without it each conditional copula would be an arbitrary function of $\mathbf{v}$.
^def-pair-copula

> [!definition] The h-function (conditional CDF transform)
> The **h-function** is the conditional CDF of one variable given another under a specified bivariate copula. For a bivariate copula $C_{12}(u_1, u_2; \theta)$:
> $$ h(u_1 | u_2; \theta) = \frac{\partial C_{12}(u_1, u_2; \theta)}{\partial u_2} $$
> Equivalently, $h(u_1|u_2;\theta) = F(X_1 \mid X_2 = F_2^{-1}(u_2))$ where $u_1 = F_1(x_1)$.
>
> **Role in vine sampling and likelihood:** The h-function propagates conditioning down vine trees. When computing the conditional CDF $F(x_i | x_{i+1},\dots,x_{i+j-1})$ needed for an edge in tree $T_j$, one applies h-functions sequentially using the pair copula parameters from the preceding trees.
>
> **Closed-form examples:**
> - **Gaussian copula** $C(u,v;\rho)$: $h(u|v;\rho) = \Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
> - **Clayton copula** $C(u,v;\theta)=(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$: $h(u|v;\theta) = v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$
> - **Student-$t$ copula** $C(u,v;\rho,\nu)$: $h(u|v;\rho,\nu) = t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u)-\rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(\nu+(t_\nu^{-1}(v))^2)(1-\rho^2)}{\nu+1}}}\right)$
>
> where $\Phi$ is the standard normal CDF, $t_\nu$ the Student-$t$ CDF with $\nu$ degrees of freedom.
^def-h-function

> [!theorem] Pair copula density decomposition (Bedford & Cooke 2002, Theorem 1; Aas et al. 2009, Prop. 1)
> For an $n$-variate random vector $(X_1,\dots,X_n)$ with marginals $F_1,\dots,F_n$ and joint density $f$, any **regular vine** $\mathcal{V}$ on $n$ variables induces a valid factorisation:
> $$f(x_1,\dots,x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{e \in E_j} c_{i(e),j(e)|\mathcal{D}(e)}\!\left(F(x_{i(e)}|\mathbf{x}_{\mathcal{D}(e)}),\; F(x_{j(e)}|\mathbf{x}_{\mathcal{D}(e)})\right)$$
> where $E_j$ is the edge set of tree $T_j$, $i(e), j(e)$ are the two endpoint variables of edge $e$, and $\mathcal{D}(e)$ is the **conditioning set** for edge $e$ (the set of variables that both endpoint nodes share after the proximity condition is applied).
>
> **Validity:** The product is a proper density (integrates to 1) for *any* choice of valid regular vine structure and *any* choice of bivariate copula families $c_{i,j|\mathcal{D}}$ and marginals $F_k$.
>
> **Interpretation:** There are $\binom{n}{2}$ bivariate copulas in the product. Trees $T_1,\dots,T_{n-1}$ are ordered: tree $T_1$ handles unconditional bivariate dependence; tree $T_j$ handles dependence given $j-1$ conditioning variables.
^thm-pcc-density

> [!definition] The vine structure (regular vine, proximity condition)
> A **regular vine** $\mathcal{V} = (T_1,\dots,T_{n-1})$ on $n$ variables is a sequence of trees where:
> 1. $T_1$ has nodes $\{1,\dots,n\}$ and $n-1$ edges.
> 2. For $j \geq 2$: $T_j$ has the edges of $T_{j-1}$ as its nodes, and two nodes in $T_j$ are connected only if the corresponding edges in $T_{j-1}$ share a node (**proximity condition**).
>
> The proximity condition ensures the conditioning sets $\mathcal{D}(e)$ are well-defined and grow by exactly one variable per tree level. The number of valid regular vine structures on $n$ variables grows super-exponentially; exhaustive search is infeasible for $n > 6$, motivating greedy structure selection algorithms.
^def-vine-structure

## Examples

> [!example] Three-variable PCC decomposition
> **Setup:** Variables $X_1, X_2, X_3$ with marginals $F_1, F_2, F_3$. The simplest vine has two trees.
>
> **D-vine decomposition (ordering $1-2-3$):**
> $$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3)$$
> $$\times\; c_{12}(F_1(x_1),\, F_2(x_2))$$
> $$\times\; c_{23}(F_2(x_2),\, F_3(x_3))$$
> $$\times\; c_{13|2}(F(x_1|x_2),\, F(x_3|x_2))$$
>
> where $F(x_1|x_2) = h(F_1(x_1)|F_2(x_2);\theta_{12})$ from copula $C_{12}$.
>
> **C-vine decomposition (root $X_2$):**
> $$f(x_1, x_2, x_3) = f_1 \cdot f_2 \cdot f_3$$
> $$\times\; c_{21}(F_2,F_1) \cdot c_{23}(F_2,F_3) \cdot c_{13|2}(F(x_1|x_2),\,F(x_3|x_2))$$
>
> In three dimensions, C-vine and D-vine produce different orderings of the same three pair copulas ($C_{12}$, $C_{23}$, $C_{13|2}$). For $n=3$ the structures are equivalent up to labelling; differences emerge at $n \geq 4$.
>
> **Interpretation:** The conditioned copula $c_{13|2}$ captures the remaining dependence between $X_1$ and $X_3$ after removing what is explained by $X_2$. If $X_1, X_3$ are independent given $X_2$, setting $c_{13|2} = \text{Independence}$ collapses the model to a simpler one — this is the basis for model selection via copula family testing.

> [!example] H-function applied: Gaussian example
> **Setup:** $C_{12}$ is Gaussian with $\rho = 0.6$. Compute $F(x_1|x_2=0.7)$ for use as input to tree $T_2$.
>
> **Solution:**
> 1. Transform to copula arguments: $u_1 = F_1(x_1)$, $u_2 = F_2(0.7) = 0.7$.
> 2. Apply h-function: $h(u_1 | 0.7; 0.6) = \Phi\!\left(\dfrac{\Phi^{-1}(u_1) - 0.6\cdot\Phi^{-1}(0.7)}{\sqrt{1-0.36}}\right)$
> 3. Since $\Phi^{-1}(0.7) \approx 0.524$: $h(u_1|0.7;0.6) = \Phi\!\left(\dfrac{\Phi^{-1}(u_1) - 0.314}{0.8}\right)$
>
> **Interpretation:** $F(x_1|x_2=0.7)$ is a shifted/scaled standard-normal CDF. This value is passed to the tree-$T_2$ copula to compute the density contribution for edge $(1,3|2)$.

## Connections

- [[Vine Copulas - Overview]] — motivation, comparison with factor copulas.
- [[C-vine and D-vine Structures]] — explicit density formulas using the PCC for the two canonical vines.
- [[Vine Copula Estimation and Model Selection]] — how pair copula parameters are estimated and which families are selected.
- [[Factor Copula Construction]] — the factor-copula approach avoids the h-function recursion but requires simulation for estimation; the PCC here has a closed-form likelihood.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ can be computed analytically for each pair copula edge given the copula family, aiding interpretation.

## See Also

- [[Copula Estimation]] — bivariate Gaussian-copula tutorial (PyMC); the vine generalises this.
- [[Factor Copulas - Overview]] — contrast: factor copulas are compact and simulation-based; PCCs are modular and likelihood-based.
- [[Econometrics/_Index|Econometrics]]
