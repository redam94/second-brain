---
title: "C-vine and D-vine Density Formulas"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Aas-et-al-2009-pair-copula-constructions.txt]]"
source_location: "Aas et al. (2009), Secs. 2.2-2.3, pp. 184-187"
date_ingested: 2026-10-25
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and Vine Trees]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - C-vine copula
  - D-vine copula
  - canonical vine
  - drawable vine
  - C-vine density
  - D-vine density
---

# C-vine and D-vine Density Formulas

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most widely-used special cases of regular vines. C-vines have a **star structure** at each tree — one root node connects to all others — and are suited to settings where one variable drives all dependence. D-vines have a **path structure** — each variable connects to its two nearest neighbours — and are natural for ordered sequences. Both have explicit, closed-form density formulas using h-function recursions.

## Overview

A regular vine (see [[Pair Copula Construction and Vine Trees]]) can have any tree topology consistent with the proximity condition, which admits a combinatorially large space of possible vine structures. Two canonical choices cover most practical applications:

- **C-vine (canonical vine):** At each tree $T_\ell$, one node (the "root") is connected to all $n - \ell$ other nodes. This root ordering determines which variable conditions all pairs in that tree.
- **D-vine (drawable vine):** At each tree $T_\ell$, the tree is a **path** — each node has degree at most 2. This produces a natural sequential structure amenable to time-series and spatial data.

For $n = 4$, both vines use $\binom{4}{2} = 6$ bivariate copulae; they differ in which pairs are modelled unconditionally (tree 1) and which are modelled conditionally on which variables (trees 2 and 3).

## Main Content

### C-vine

> [!definition] C-vine tree structure
> In a **C-vine** on $n$ variables, tree $T_\ell$ ($\ell = 1, \dots, n-1$) is a **star**: a single root node connects to all $n-\ell$ other nodes. The root in tree $T_\ell$ is the $\ell$-th variable (by convention; in practice the root ordering is chosen to maximise fit, e.g. by placing the variable with the highest sum of pairwise Kendall's $\tau$ as root of $T_1$).
>
> The **edge set** of tree $T_\ell$ in the C-vine (with root $\ell$) is:
> $$E(T_\ell) = \{(\ell, \ell+k \mid 1, 2, \dots, \ell-1) : k = 1, \dots, n-\ell\}$$
>
> **Interpretation:** In tree 1, the root variable 1 is directly modelled against all others ($c_{12}, c_{13}, \dots, c_{1n}$). In tree 2, the root variable 2 conditions all remaining pairs ($c_{23|1}, c_{24|1}, \dots$). This makes C-vines appropriate when *one variable drives most of the dependence* — e.g., a market index in a stock return model.
^def-cvine-structure

> [!theorem] C-vine density formula (Aas et al. 2009, Eq. 5)
> The joint density of $(X_1, \dots, X_n)$ under the C-vine with root ordering $1, 2, \dots, n-1$ is:
>
> $$\boxed{f(x_1, \dots, x_n) = \prod_{k=1}^n f_k(x_k) \;\cdot\; \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{j,j+i \mid 1,\dots,j-1}\!\left(F(x_j \mid x_1, \dots, x_{j-1}),\, F(x_{j+i} \mid x_1, \dots, x_{j-1})\right)}$$
>
> For $n = 4$, expanding explicitly:
> $$f = f_1 f_2 f_3 f_4 \cdot \underbrace{c_{12}\,c_{13}\,c_{14}}_{\text{tree 1}} \cdot \underbrace{c_{23|1}\,c_{24|1}}_{\text{tree 2}} \cdot \underbrace{c_{34|12}}_{\text{tree 3}}$$
>
> where:
> - Tree 1 arguments: $(F_1(x_1), F_2(x_2))$, $(F_1(x_1), F_3(x_3))$, $(F_1(x_1), F_4(x_4))$
> - Tree 2 arguments: $(F(x_2\mid x_1), F(x_3\mid x_1))$, $(F(x_2\mid x_1), F(x_4\mid x_1))$
> - Tree 3 arguments: $(F(x_3\mid x_1, x_2), F(x_4\mid x_1, x_2))$
>
> **Conditional CDFs via h-functions (C-vine):**
> - $F(x_j \mid x_1, \dots, x_{j-1})$ is computed as a nested h-function:
>   - $F(x_j \mid x_1) = h(F_j(x_j) \mid F_1(x_1); \theta_{1j})$
>   - $F(x_j \mid x_1, x_2) = h(F(x_j \mid x_1) \mid F(x_2 \mid x_1); \theta_{2j|1})$
>   - and so on recursively.
^thm-cvine-density

---

### D-vine

> [!definition] D-vine tree structure
> In a **D-vine** on $n$ variables ordered $(1, 2, \dots, n)$, tree $T_\ell$ ($\ell = 1, \dots, n-1$) is a **path**: variable $i$ connects to variable $i+\ell$ conditional on $(i+1, \dots, i+\ell-1)$.
>
> The **edge set** of tree $T_\ell$ in the D-vine is:
> $$E(T_\ell) = \{(i, i+\ell \mid i+1, \dots, i+\ell-1) : i = 1, \dots, n-\ell\}$$
>
> **Interpretation:** Tree 1 connects adjacent variables $(1,2), (2,3), \dots, (n-1, n)$ — the "nearest-neighbour" pairs. Tree 2 connects next-to-adjacent pairs conditional on the intervening variable: $(1,3\mid 2), (2,4\mid 3), \dots$. The D-vine is appropriate for **ordered sequences** where proximity in the ordering implies stronger dependence — e.g., time series, spatial panels, or term structure variables.
^def-dvine-structure

> [!theorem] D-vine density formula (Aas et al. 2009, Eq. 4)
> The joint density of $(X_1, \dots, X_n)$ under the D-vine with ordering $(1, 2, \dots, n)$ is:
>
> $$\boxed{f(x_1, \dots, x_n) = \prod_{k=1}^n f_k(x_k) \;\cdot\; \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{i,i+j \mid i+1,\dots,i+j-1}\!\left(F(x_i \mid x_{i+1}, \dots, x_{i+j-1}),\, F(x_{i+j} \mid x_{i+1}, \dots, x_{i+j-1})\right)}$$
>
> For $n = 4$, expanding explicitly:
> $$f = f_1 f_2 f_3 f_4 \cdot \underbrace{c_{12}\,c_{23}\,c_{34}}_{\text{tree 1}} \cdot \underbrace{c_{13|2}\,c_{24|3}}_{\text{tree 2}} \cdot \underbrace{c_{14|23}}_{\text{tree 3}}$$
>
> where:
> - Tree 1 arguments: $(F_1(x_1), F_2(x_2))$, $(F_2(x_2), F_3(x_3))$, $(F_3(x_3), F_4(x_4))$
> - Tree 2: $(F(x_1\mid x_2), F(x_3\mid x_2))$, $(F(x_2\mid x_3), F(x_4\mid x_3))$
> - Tree 3: $(F(x_1\mid x_2, x_3), F(x_4\mid x_2, x_3))$
>
> **Conditional CDFs via h-functions (D-vine):**
> For the D-vine, the conditional CDFs $F(x_i \mid x_{i+1}, \dots, x_{i+j-1})$ are computed by the forward/backward h-function recursion:
> $$F(x_i \mid x_{i+1}, \dots, x_{i+j-1}) = h\!\left(F(x_i \mid x_{i+1}, \dots, x_{i+j-2}) \;\Big|\; F(x_{i+j-1} \mid x_{i+1}, \dots, x_{i+j-2}); \,\theta_{i,i+j-1 \mid i+1,\dots,i+j-2}\right)$$
> and symmetrically for the right-to-left direction.
^thm-dvine-density

## Examples

> [!example] 4-variable C-vine: one driving variable (Aas et al. 2009)
> **Setup:** $X_1$ = market index return; $X_2, X_3, X_4$ = three individual stocks. Hypothesis: the market index drives most of the co-movement.
>
> **Tree 1 (root = market):** Fit $c_{12}$, $c_{13}$, $c_{14}$ — pairwise copulae of each stock with the market. Each can have a different family (e.g., $t$-copula for symmetric tail co-movement).
>
> **Tree 2 (root = 2, conditioning on market):** Fit $c_{23|1}$, $c_{24|1}$ — *residual* co-movement between stocks after removing market influence. May use a Gaussian copula if residual dependence is weak.
>
> **Tree 3:** Fit $c_{34|12}$ — the residual dependence between stocks 3 and 4 after conditioning on the market and stock 2. May be near-independence (copula parameter $\approx 0$).
>
> **Result:** 6 bivariate copulae with potentially different families, capturing the hierarchical structure of equity return dependence. The C-vine makes "conditioned on the market" explicit in the tree structure, aiding interpretation.

> [!example] 4-variable D-vine: ordered time series (Aas et al. 2009)
> **Setup:** $(X_1, X_2, X_3, X_4)$ = term structure yields at maturities 3m, 1y, 5y, 10y (ordered by maturity).
>
> **Tree 1:** Adjacent maturities have strongest dependence: $c_{12}$ (3m–1y), $c_{23}$ (1y–5y), $c_{34}$ (5y–10y). Likely strong positive dependence; a Gaussian copula may suffice.
>
> **Tree 2:** Next-to-adjacent conditional: $c_{13|2}$ (3m–5y given 1y), $c_{24|3}$ (1y–10y given 5y). Lower residual dependence.
>
> **Tree 3:** Longest-range conditional: $c_{14|23}$ (3m–10y given 1y and 5y). Likely near-independence.
>
> **Result:** The D-vine ordering mirrors the natural "distance in maturity" — closer maturities are more dependent — and residual dependence decays across trees, making the simplifying assumption (and conditional independence in high trees) more plausible.

## Connections

- [[Vine Copulas - Overview]] — overall architecture and position vs. factor copulas.
- [[Pair Copula Construction and Vine Trees]] — the general regular vine density theorem and h-function recursion that these formulas instantiate.
- [[Vine Copula Estimation and Model Selection]] — how the density formulas are used in maximum likelihood, and how the tree structure and copula families are chosen.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is used to select the root of the C-vine (root = variable with highest average $|\tau|$ with others).

## See Also

- [[Factor Copula Construction]] — the latent-factor alternative; C-vine with a market-root variable parallels the factor copula conceptually (one "driver"), but vine explicitly specifies each pair.
- [[Econometrics/_Index|Econometrics]]
