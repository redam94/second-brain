---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Czado-Survey.md]]"
source_location: "Secs. 4.1-4.2 (Aas et al. 2009); Sec. 4.2 (Bedford & Cooke 2002)"
date_ingested: 2026-08-06
date_updated: 2026-08-06
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Vine Copula vs Factor Copula]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine structure
---

# C-Vine and D-Vine Structures

> [!summary]
> The two most practically useful vine structures are the **C-vine** (canonical vine, star-shaped trees) and the **D-vine** (drawable vine, path-shaped trees). C-vines are appropriate when one variable is a natural hub for all others; D-vines suit ordered sequences such as time series or spatial transects. Both are special cases of the R-vine and differ only in the tree topology — they produce the same density formula but with different conditioning sets for the pair-copulas.

## Overview

While the **R-vine** (regular vine) is maximally flexible — any tree structure satisfying the proximity condition is valid — two structured special cases are most used in applications. Their computational advantage is that the h-function recursions follow a simple deterministic pattern, making the IFM algorithm (see [[Pair-Copula Construction]]) easy to implement without general graph traversal.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-vine structure (Aas et al. 2009, Sec. 4.2)
> A **C-vine** on $n$ variables, ordered $(1, 2, \ldots, n)$, is an R-vine where every tree $T_j$ is a **star** centred on a **root node**:
>
> - **$T_1$**: Root node $1$ (the "key" variable) connects to all others.  
>   Edges: $(1,2),\, (1,3),\, \ldots,\, (1,n)$ — pair-copulas: $c_{12},\, c_{13},\, \ldots,\, c_{1n}$.
>
> - **$T_2$**: Root node $1|2$ (node representing edge $(1,2)$ from $T_1$).  
>   Edges: $(1,3|2),\, (1,4|2),\, \ldots,\, (1,n|2)$ — pair-copulas: $c_{13|2},\, c_{14|2},\, \ldots,\, c_{1n|2}$.
>
> - **$T_j$**: Root connects to all non-root nodes in the star.  
>   Pair-copulas: $c_{1,j+1|2,\ldots,j},\, c_{1,j+2|2,\ldots,j},\, \ldots,\, c_{1,n|2,\ldots,j}$.
>
> **h-function recursion (C-vine):** The conditional CDF of variable $k$ given the "root chain" $\{1, 2, \ldots, j\}$ is:
> $$F(x_k | x_1, \ldots, x_j) = h_{k|j}\!\left(F(x_k|x_1,\ldots,x_{j-1}),\; F(x_j|x_1,\ldots,x_{j-1})\right)$$
> evaluated using the pair-copula $c_{1k|2,\ldots,j}$ fitted in tree $T_j$.
>
> **Joint density (C-vine):**
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=j+1}^{n} c_{ji|1,\ldots,j-1}\!\left(F(x_j|\boldsymbol{x}_{1:j-1}),\; F(x_i|\boldsymbol{x}_{1:j-1})\right)$$
^c-vine-def

> [!example] C-vine for $n=4$
> **Variables:** $X_1$ (market factor), $X_2, X_3, X_4$ (three assets).
>
> **$T_1$** (star, root $= 1$): edges $(1,2),\,(1,3),\,(1,4)$.  
> Pair-copulas: $c_{12}, c_{13}, c_{14}$.
>
> **$T_2$** (star, root $= 1|2$): edges $(1,3|2),\,(1,4|2)$.  
> Pair-copulas: $c_{13|2}, c_{14|2}$, evaluated at $(h_{3|1}(u_3,u_1), h_{3|1}(u_2,u_1))$ etc.
>
> **$T_3$** (one edge): edge $(1,4|2,3)$.  
> Pair-copula: $c_{14|2,3}$.
>
> **Total:** 3+2+1 = 6 = $\binom{4}{2}$ pair-copulas. ✓
>
> **Interpretation:** Variable 1 (the market) mediates all pairwise dependence at the first level; after conditioning on $X_1$, variable 2 mediates residual dependence, etc. Suitable when the market index is the dominant driver.

**When to use C-vine:** One variable is a natural financial/economic "hub" (interest rate, FX rate, commodity price, market index) that drives all pairwise dependence. Selecting variable 1 as the root should place the most connected variable (largest sum of pairwise $|\tau|$) there.

---

### D-Vine (Drawable Vine)

> [!definition] D-vine structure (Aas et al. 2009, Sec. 4.1)
> A **D-vine** on $n$ variables, ordered $(1, 2, \ldots, n)$, is an R-vine where every tree $T_j$ is a **path**:
>
> - **$T_1$**: Path $1-2-3-\cdots-n$.  
>   Edges: $(1,2),\,(2,3),\,(3,4),\,\ldots,\,(n-1,n)$ — pair-copulas: $c_{12}, c_{23}, \ldots, c_{n-1,n}$.
>
> - **$T_2$**: Path of edges from $T_1$ (nodes are edges of $T_1$).  
>   Edges: $(1,3|2),\,(2,4|3),\,(3,5|4),\,\ldots$ — pair-copulas: $c_{13|2}, c_{24|3}, \ldots$
>
> - **$T_j$**: Path of $n-j$ edges.  
>   Pair-copulas: $c_{i,i+j|i+1,\ldots,i+j-1}$ for $i = 1, \ldots, n-j$.
>
> **h-function recursion (D-vine):** The conditioning set is always a consecutive block in the ordering:
> $$F(x_i | x_{i+1}, \ldots, x_{i+j}) = h_{i|i+j}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$
>
> **Joint density (D-vine):**
> $$f(x_1,\ldots,x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i|\boldsymbol{x}_{i+1:i+j-1}),\; F(x_{i+j}|\boldsymbol{x}_{i+1:i+j-1})\right)$$
^d-vine-def

> [!example] D-vine for $n=4$
> **Variables:** $X_1, X_2, X_3, X_4$ (e.g., daily log-returns at lags 1-4 of a time series, or four maturities of a yield curve).
>
> **$T_1$** (path $1-2-3-4$): edges $(1,2),\,(2,3),\,(3,4)$.  
> Pair-copulas: $c_{12}, c_{23}, c_{34}$ — **adjacent pairs**.
>
> **$T_2$** (path of 2 edges): edges $(1,3|2),\,(2,4|3)$.  
> Pair-copulas: $c_{13|2}, c_{24|3}$ — **pairs at lag 2, conditioned on the intermediate**.
>
> **$T_3$** (one edge): $(1,4|2,3)$.  
> Pair-copula: $c_{14|2,3}$ — **pair at lag 3, conditioned on lags 1,2**.
>
> **Interpretation:** Adjacent variables in the ordering are directly modelled; variables farther apart are modelled conditionally. Natural for financial time series or spatial data — if conditioning on intermediate variables renders distant variables near-independent, the model is nearly Markov.

**When to use D-vine:** Variables have a **natural ordering** — temporal lags, geographic order, maturity structure of bonds, price deciles. The D-vine is the natural conditional Markov extension along that ordering.

---

### Choosing Between C-Vine, D-Vine, and R-Vine

> [!definition] Structure selection guidance
> | Criterion | C-vine | D-vine | R-vine (general) |
> |-----------|--------|--------|------------------|
> | Natural hub variable | ✓ Best | — | Possible |
> | Natural sequential ordering | — | ✓ Best | Possible |
> | No prior structure | — | — | ✓ Use Dißmann algorithm |
> | Interpretability | High (one root tells the story) | High (ordering tells the story) | Lower (arbitrary tree) |
> | Implementation complexity | Low | Low | Medium |
> | Scales to large $n$ | Yes (greedy root selection) | Yes (ordering-driven) | Harder (exponential possibilities) |
>
> For general R-vines with no prior structure, Dißmann et al.'s (2013) maximum spanning tree algorithm (see [[Pair-Copula Construction]]) is the standard approach.
^structure-selection

---

### Truncated Vines

A **truncated vine of order $m$** retains only trees $T_1, \ldots, T_m$ and sets all pair-copulas in $T_{m+1}, \ldots, T_{n-1}$ to the **independence copula** ($c \equiv 1$). This produces a model with $(m-1)(n - m/2)$ pair-copulas instead of $\binom{n}{2}$ — dramatically fewer parameters for large $n$.

For financial returns with $n=50$, a full vine has 1,225 pair-copulas; truncation at $m=3$ gives 141. Empirically, the strongest dependence is captured in the first 2-3 trees; residual conditional dependence in higher trees is often negligible (Dißmann et al. 2013).

## Connections

- [[Vine Copulas - Overview]] — the R-vine definition and Bedford-Cooke graphical model; C-vines and D-vines are special cases.
- [[Pair-Copula Construction]] — the h-function recursion and IFM estimation algorithm that implements C-vine and D-vine models in practice.
- [[Vine Copula vs Factor Copula]] — D-vines are natural for time series; factor copulas use a single latent dimension; neither imposes a path structure.
- [[Factor Copulas - Overview]] — the star/factor structure loosely mirrors the C-vine hub concept, but via a latent variable rather than an explicit tree.
- [[Multi-Factor and Block Dependence Structures]] — factor copulas use industry blocks to achieve heterogeneous dependence; vines achieve it through different pair-copula families at each edge.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ matrix used for tree structure selection.
- [[../_Index|Dependence Modeling]]
