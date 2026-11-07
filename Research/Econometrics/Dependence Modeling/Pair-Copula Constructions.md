---
title: Pair-Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Aas-et-al-2009-Pair-Copula-Constructions-reference.md]]"
source_location: "Secs. 2–3, pp. 184–192"
date_ingested: 2026-11-07
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Copula Estimation]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Structure Selection and Estimation]]"
aliases:
  - PCC
  - h-function
  - pair copula
  - conditional CDF vine
---

# Pair-Copula Constructions

> [!summary]
> Any $d$-dimensional joint density can be decomposed into $d$ univariate marginals and $d(d-1)/2$ bivariate **pair-copula densities** evaluated at **conditional CDFs** — a result formalised by Bedford & Cooke and given statistical practicality by Aas et al. (2009). The key computational tool is the **h-function** (the conditional CDF through a bivariate copula), which enables recursive computation of all conditional distributions from Tree 1 to Tree $d-1$ of the vine.

## Overview

The pair-copula construction (PCC) rests on two key facts:

1. **Density factorisation through conditioning:** For any two random variables $X_i, X_j$ and conditioning set $\mathbf{V}$, the joint conditional density factorises as
   $$f(x_i, x_j | \mathbf{v}) = c_{ij|\mathbf{v}}\!\bigl(F(x_i|\mathbf{v}),\, F(x_j|\mathbf{v})\bigr) \cdot f(x_i|\mathbf{v}) \cdot f(x_j|\mathbf{v})$$
   where $c_{ij|\mathbf{v}}$ is the **pair copula density** for the conditional distribution of $(X_i, X_j) | \mathbf{V} = \mathbf{v}$.

2. **Recursive conditioning:** Any joint density can be written as a product of conditionals in many ways. The vine structure organises which conditioning sequence to use, and the h-function provides a computationally tractable recursion.

The decomposition is **not unique**: the ordering of variables and the choice of vine structure change which pair copulas appear. This is both a flexibility (we can choose the structure to reflect domain knowledge) and a selection problem (we need a criterion to choose among the many valid structures).

## Main Content

> [!theorem] Pair-Copula Density Decomposition (Aas et al. 2009, based on Bedford-Cooke)
> Let $X_1, \ldots, X_d$ be continuous random variables with joint density $f(x_1, \ldots, x_d)$,
> marginals $f_k(x_k)$, and marginal CDFs $F_k(x_k)$. Then:
> $$
> f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{\text{edges } e \in \mathcal{V}} c_e\!\bigl(F(x_{e_1} | \mathbf{x}_{\text{cond}(e)}),\, F(x_{e_2} | \mathbf{x}_{\text{cond}(e)})\bigr)
> $$
> where the second product is over all $d(d-1)/2$ edges of a regular vine $\mathcal{V}$, edge $e = \{e_1, e_2 | \text{cond}(e)\}$ connects variables $e_1$ and $e_2$ conditioned on $\text{cond}(e)$, and $c_e$ is the bivariate copula density for that conditional pair.
>
> **Key property:** Each $c_e$ can be from a *different* parametric copula family (Gaussian, Student-$t$, Clayton, Gumbel, Frank, independence, …), enabling highly heterogeneous tail-dependence patterns across variable pairs.
^thm-pcc-density

> [!definition] The H-Function (Conditional CDF)
> The **h-function** (Aas et al. 2009, based on Joe 1996) is the conditional CDF of $X | V$ derived from their pair copula $C_{XV}$:
> $$
> h(x | v) \;=\; h(x, v;\, \boldsymbol{\theta}) \;=\; \frac{\partial C_{XV}(F_X(x),\, F_V(v);\, \boldsymbol{\theta})}{\partial F_V(v)}
> $$
> where $C_{XV}$ is the bivariate copula for the pair $(X, V)$ with parameter $\boldsymbol{\theta}$.
>
> **Remark 1 (simplifying assumption):** Aas et al. assume that the conditional copula $c_{ij|\mathbf{v}}$ depends on the conditioning variables $\mathbf{v}$ *only through* $F(x_i|\mathbf{v})$ and $F(x_j|\mathbf{v})$, not on $\mathbf{v}$ directly. This "simplifying assumption" makes the PCC identifiable and tractable; it is a modelling choice, not a consequence of Sklar's theorem.
>
> **Remark 2 (closed forms):** For standard families:
> - **Gaussian:** $h(x,v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
> - **Student-$t_\nu$:** $h(x,v;\rho,\nu) = t_{\nu+1}\!\left(\frac{t_\nu^{-1}(x) - \rho\,t_\nu^{-1}(v)}{\sqrt{\frac{(1-\rho^2)(\nu+(t_\nu^{-1}(v))^2)}{\nu+1}}}\right)$
> - **Clayton$(\theta)$:** $h(x,v;\theta) = v^{-\theta-1}\bigl(x^{-\theta} + v^{-\theta} - 1\bigr)^{-1-1/\theta}$
^defn-hfunction

> [!theorem] Recursive Computation of Conditional CDFs
> Let $F(x_{e_1} | \mathbf{x}_{\text{cond}(e)})$ denote the conditional CDF needed for a pair copula at Tree level $j \geq 2$. This is computed recursively from pair copulas at lower tree levels.
>
> For $\mathbf{v} = (v_{-m}, v_m)$ (a conditioning set with an element $v_m$ removed):
> $$
> F(x | \mathbf{v}) = h\!\bigl(F(x | \mathbf{v}_{-m}),\; F(v_m | \mathbf{v}_{-m});\; \boldsymbol{\theta}_{x,v_m|\mathbf{v}_{-m}}\bigr)
> $$
> where $\boldsymbol{\theta}_{x,v_m|\mathbf{v}_{-m}}$ are the parameters of the pair copula $c_{x,v_m|\mathbf{v}_{-m}}$ already estimated in a lower tree.
>
> **In words:** Each level of the vine peels off one conditioning variable using the h-function, until only the bivariate conditional CDF needed for the current edge is left.
^thm-recursive

> [!definition] The Simplifying Assumption
> The **simplifying assumption** (Joe 1996; Hobæk Haff, Aas & Frigessi 2010) states that the
> conditional copula $C_{X_i X_j | \mathbf{V}}$ does not depend on the realisation $\mathbf{v}$ of the
> conditioning variables — only on its own parameters $\boldsymbol{\theta}_{ij|\mathbf{v}}$.
>
> Without this assumption, the pair copula at level $j$ would itself be a function of $\mathbf{v}$,
> creating an intractable infinite regress. Under the simplifying assumption, estimating the pair
> copula at each level reduces to a standard bivariate estimation problem using as inputs the
> conditional CDFs computed by h-functions from lower levels.
>
> **Validity:** The simplifying assumption is not implied by Sklar's theorem and is in general false,
> but simulation studies show that well-chosen vine structures with standard pair-copula families
> provide good approximations even when the true model is not a simplified vine.
^defn-simplifying

## Examples

> [!example] H-function recursion for $d=4$ D-vine (tree levels 1–3)
> **Ordering:** $X_1, X_2, X_3, X_4$.
>
> **Tree 1** pair copulas (unconditional bivariate):
> - $c_{12}(F_1(x_1),\, F_2(x_2))$ → compute $F(x_1|x_2) = h(F_1(x_1),\, F_2(x_2))$, $F(x_2|x_1) = h(F_2(x_2),\, F_1(x_1))$ (using the $c_{12}$ family and parameters)
> - Similarly for $c_{23}$, $c_{34}$.
>
> **Tree 2** pair copulas (conditioned on one variable):
> - $c_{13|2}(F(x_1|x_2),\, F(x_3|x_2))$ → inputs are h-function outputs from Tree 1
> - $c_{24|3}(F(x_2|x_3),\, F(x_4|x_3))$ → similarly.
>
> **Tree 3** pair copulas (conditioned on two variables):
> - $c_{14|23}(F(x_1|x_2,x_3),\, F(x_4|x_2,x_3))$ → inputs computed by applying h-functions using Tree 2 copulas.
>
> **Full density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}\,c_{23}\,c_{34} \cdot c_{13|2}\,c_{24|3} \cdot c_{14|23}$$

## Connections

- [[C-Vine and D-Vine Structures]] — specific vine structures with their explicit density products.
- [[Vine Copula Structure Selection and Estimation]] — estimation using sequential MLE; the h-function recursion is the forward pass.
- [[Vine Copulas - Overview]] — the big-picture comparison with factor copulas and other approaches.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, quantile dependence: target statistics for estimation.
- [[Copula Estimation]] — Bayesian Gaussian copula using PyMC; contrast with frequentist vine MLE.

## See Also

- [[../_Index|Econometrics]]
