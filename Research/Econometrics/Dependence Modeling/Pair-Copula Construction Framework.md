---
title: "Pair-Copula Construction Framework"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions-source.md]]"
source_location: "Aas et al. (2009) §2; Bedford & Cooke (2002) §4"
date_ingested: 2026-10-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation]]"
aliases:
  - PCC framework
  - pair-copula construction
  - R-vine density
  - vine density factorisation
---

# Pair-Copula Construction Framework

> [!summary]
> The pair-copula construction (PCC) framework gives the explicit density factorisation for any regular vine: the joint density equals the product of univariate marginal densities and $n(n-1)/2$ bivariate copula densities, each evaluated at conditional CDFs computed recursively via h-functions. The factorisation for C-vines is a star-of-stars structure; for D-vines it is a path-of-paths. Both are special cases of the general R-vine formula.

## Overview

The PCC framework makes the abstract vine definition concrete: it gives the exact formula for the joint density in terms of bivariate copula densities and h-functions. This formula is the basis for likelihood evaluation (needed for MLE and model selection), simulation, and sequential estimation. The derivation follows the density factorisation:
$$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{\text{edges } e \text{ in vine}} c_{ij|D_e}\!\left(F(x_i \mid \mathbf{x}_{D_e}),\; F(x_j \mid \mathbf{x}_{D_e})\right)$$
The challenge is computing the conditional CDFs $F(x_i \mid \mathbf{x}_{D_e})$ recursively. The h-function defined in [[Vine Copulas - Overview]] provides this recursion.

## Main Content

### C-Vine Density

> [!theorem] C-Vine Density Factorisation
> For a **C-vine** with root nodes $j_1, j_2, \ldots, j_{n-1}$ (root of tree $T_k$ is $j_k$), the joint density is:
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=j+1}^{n} c_{j,i|1,\ldots,j-1}\!\bigl(F(x_j \mid x_1, \ldots, x_{j-1}),\; F(x_i \mid x_1, \ldots, x_{j-1})\bigr)$$
> The double product ranges over $n(n-1)/2$ pair-copulas: tree 1 has $n-1$ edges (root vs. all others), tree 2 has $n-2$ edges, …, tree $n-1$ has 1 edge.
>
> **Root node interpretation:** In tree $T_j$, the root $j$ is linked to all other nodes. The root acts as the "hub" — it is paired with every other variable, conditioning on all previously-rooted variables. Roots are chosen to be the variables that mediate the strongest dependence.
^thm-cvine-density

> [!theorem] D-Vine Density Factorisation
> For a **D-vine** with ordering $(1, 2, \ldots, n)$, the joint density is:
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\bigl(F(x_i \mid x_{i+1}, \ldots, x_{i+j-1}),\; F(x_{i+j} \mid x_{i+1}, \ldots, x_{i+j-1})\bigr)$$
> Tree 1 links adjacent pairs $(1,2), (2,3), \ldots, (n-1, n)$; tree 2 links pairs two steps apart $(1,3|2), (2,4|3), \ldots$; and so on. The conditioning set for the pair $(i, i+j)$ is the *interior* set $\{i+1, \ldots, i+j-1\}$.
>
> **Path interpretation:** The D-vine ordering makes the dependence structure a Markov chain analogue — variables further apart in the ordering are linked only through longer conditioning sets.
^thm-dvine-density

### The h-Function Recursion

> [!definition] h-Function for Standard Copula Families
> Given a bivariate copula $C_{12}(u, v; \theta)$, the h-function and its inverse are:
> - **h-function**: $h_1(u \mid v; \theta) = \partial C_{12}(u, v; \theta) / \partial v$
> - **Inverse h-function**: $h_1^{-1}(p \mid v; \theta)$ solves $h_1(u \mid v; \theta) = p$ for $u$
>
> | Family | h-function $h_1(u \mid v; \theta)$ |
> |------|------|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t(\rho, \nu)$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $v^{-\theta-1}(u^{-\theta} + v^{-\theta} - 1)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C(u,v;\theta)\frac{(-\ln v)^{\theta-1}}{v\,(-\ln u)^\theta + (-\ln v)^\theta)^{1-1/\theta}(-\ln u \cdot -\ln v)^{\theta-1}}$ |
>
> where $\Phi$ is the standard normal CDF and $t_\nu$ the $t$-distribution CDF. The key property: if $(U_1, U_2) \sim C_{12}$, then $h_1(U_1 \mid U_2) \sim \text{Uniform}[0,1]$ and is independent of $U_2$, enabling recursive transformation of the pair-copula inputs tree by tree.
^def-h-functions

> [!definition] Recursive Computation of Conditional CDFs
> For any edge $e = \{a, b | D_e\}$ in the vine, the required conditional CDFs $F(x_a \mid \mathbf{x}_{D_e})$ and $F(x_b \mid \mathbf{x}_{D_e})$ are obtained by recursively applying h-functions along the path from variable $a$ (or $b$) up through the vine trees to the conditioning set $D_e$.
>
> **D-vine recursion (Aas et al. 2009, Eq. 10):** Define $F(x_i \mid x_{i+1}, \ldots, x_{i+j-1})$ as $v_{i|i+1,\ldots,i+j-1}$. Then:
> $$v_{i,i+j|i+1,\ldots,i+j-1} = h\!\left(v_{i|i+1,\ldots,i+j-2} \;\middle|\; v_{i+j|i+1,\ldots,i+j-1};\; \theta_{i,i+j|i+1,\ldots,i+j-2}\right)$$
> This is evaluated using the h-function of the pair-copula $C_{i,i+j-1|i+1,\ldots,i+j-2}$ from the previous tree. The recursion starts with $v_{i} = F_i(x_i)$ (the marginal CDFs, estimated first).
^def-recursive-cdfs

### Parameter Count and Flexibility

> [!definition] Number of Parameters
> A regular vine on $n$ variables contains exactly $n(n-1)/2$ edges, one pair-copula per edge. Each pair-copula may have its own family and parameters:
>
> | Vine | Total pair-copulas | Parameters (Gaussian family) | Parameters (family-selected) |
> |------|---|---|---|
> | C-vine, $n=5$ | 10 | 10 ($\rho$ per pair) | 10 + 10 family indicators |
> | D-vine, $n=5$ | 10 | 10 | 10 + 10 family indicators |
> | Factor copula, $K=1$, $n=100$ | — | 3 ($\sigma_z$, DoF, skew) | 3 |
>
> The vine's flexibility is its greatest strength and its curse: for $n = 100$, there are 4,950 pair-copulas to specify. Truncation (setting higher-tree pair-copulas to independence) and structure selection algorithms address this.
^def-parameter-count

## Examples

> [!example] 4-Variable D-Vine: Explicit Density
> Variables $x_1, x_2, x_3, x_4$ with ordering $1 \to 2 \to 3 \to 4$:
>
> **Tree 1 (adjacent pairs):** $c_{12}$, $c_{23}$, $c_{34}$
>
> **Tree 2 (pairs 2 apart, conditioned on middle):** $c_{13|2}$, $c_{24|3}$
>
> **Tree 3 (pair 3 apart, conditioned on both middle):** $c_{14|23}$
>
> Joint density:
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12}(F_1, F_2)\, c_{23}(F_2, F_3)\, c_{34}(F_3, F_4)$$
> $$\times\; c_{13|2}\!\bigl(h(F_1|F_2;\theta_{12}),\, h(F_3|F_2;\theta_{23})\bigr)$$
> $$\times\; c_{24|3}\!\bigl(h(F_2|F_3;\theta_{23}),\, h(F_4|F_3;\theta_{34})\bigr)$$
> $$\times\; c_{14|23}\!\bigl(h_{13|2}(F_1|F_2,F_3),\, h_{24|3}(F_4|F_3,F_2)\bigr)$$
> This decomposes 6 bivariate dependence parameters into 3 unconditional (Tree 1) and 3 conditional (Trees 2–3), each independently chosen from any bivariate copula family.

## Connections

- [[Vine Copulas - Overview]] — motivation, high-level definition of vines.
- [[C-Vine and D-Vine Structures]] — the tree diagrams and structural choices.
- [[Vine Copula Estimation]] — how h-functions are applied sequentially to estimate parameters tree by tree.
- [[Factor Copula Construction]] — the alternative construction via a latent factor model.

## See Also

- [[SMM Estimation of Factor Copulas]] — estimation of factor copulas via SMM when no closed-form density is available; vine copulas have closed-form density under the simplifying assumption.
- [[Dependence Measures for Copulas]] — rank-correlation and tail-dependence statistics used for model checking.
- [[../_Index|Econometrics]]
