---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/vine-copulas-sources.md]]"
source_location: "Aas et al. (2009), Secs. 2.1–2.2; Czado (2019), Ch. 4"
date_ingested: 2026-09-11
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - star vine
  - path vine
---

# C-Vine and D-Vine Structures

> [!summary]
> A **C-vine (canonical vine)** builds each tree as a star around a single root node, making it natural when one variable drives dependence for all others. A **D-vine (drawable vine)** builds each tree as a path, making it natural when variables have a natural ordering (time, space, latent continuum). Both are special cases of the R-vine and are the architectures most commonly used in practice. Their density formulas follow directly from the [[Pair Copula Construction]] but differ in the conditioning structure at each tree level.

## Overview

For $d$ variables, a vine copula has $d-1$ trees and $d(d-1)/2$ bivariate pair-copulas. The two simplest structures — C-vine and D-vine — were the original focus of Aas et al. (2009), who provided closed-form density expressions and worked examples before the general R-vine theory was made computational by Dißmann et al. (2013). The tree structures differ in the **connectivity pattern** of each tree, which determines (i) the conditioning sets at each level and (ii) which h-function sequences are needed.

## Main Content

### C-Vine (Canonical / Star Vine)

> [!definition] C-vine structure
> In a **C-vine**, each tree $T_\ell$ ($\ell = 1, \ldots, d-1$) is a **star**: one root node connected to all other $d-1-(\ell-1)$ remaining nodes. The root variable at level $\ell$ is the variable that, after conditioning on the roots chosen at levels $1, \ldots, \ell-1$, has the largest total absolute Kendall's τ with the remaining variables.
>
> **Tree structure (d=5 example):**
> - $T_1$: root $X_1$ → edges $(1,2), (1,3), (1,4), (1,5)$
> - $T_2$: root $(1,2)$ → edges $(1,3|2), (1,4|2), (1,5|2)$
> - $T_3$: root $(1,3|2)$ → edges $(1,4|23), (1,5|23)$
> - $T_4$: root $(1,4|23)$ → edge $(1,5|234)$
>
> The root node at each level mediates all remaining dependences.
^def-cvine-structure

> [!definition] C-vine density (d-dimensional)
> Let variable 1 be the root at level 1, variable 2 be the root at level 2, etc. The C-vine density is:
>
> $$f(\mathbf{x}) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1}\prod_{i=j+1}^{d} c_{j,i|1,\ldots,j-1}\bigl(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_i|x_1,\ldots,x_{j-1})\bigr)$$
>
> The pair-copulas and their arguments:
> - **Level 1** ($j=1$): $c_{1,2},\; c_{1,3},\; \ldots,\; c_{1,d}$ — unconditional pairs with variable 1
> - **Level 2** ($j=2$): $c_{2,3|1},\; c_{2,4|1},\; \ldots,\; c_{2,d|1}$ — pairs conditioned on variable 1
> - **Level $j$**: $c_{j,j+1|1,\ldots,j-1},\; c_{j,j+2|1,\ldots,j-1},\; \ldots$ — pairs conditioned on $\{1,\ldots,j-1\}$
>
> The conditional CDFs are computed via h-functions:
> $$F(x_i | x_1, \ldots, x_{j-1}) = h\bigl(F(x_i|x_1,\ldots,x_{j-2}),\; F(x_{j-1}|x_1,\ldots,x_{j-2})\bigr)$$
> with base case $F(x_i) = F_i(x_i)$.
^def-cvine-density

> [!definition] C-vine: when to use
> The C-vine is well-suited when:
> - One variable (the root) governs dependence between all others — e.g. a market index vis-à-vis individual stocks, a latent factor model with a known key driver, or a key macroeconomic variable whose co-movement with others is the primary focus.
> - The analyst has domain knowledge about which variable should be the root at each level.
> - Interpretability matters: each level of the C-vine tree describes the residual dependence after removing the influence of the root variables chosen so far.
^def-cvine-use

---

### D-Vine (Drawable / Path Vine)

> [!definition] D-vine structure
> In a **D-vine**, each tree $T_\ell$ ($\ell = 1, \ldots, d-1$) is a **path**: the nodes are arranged in a line so each node is connected to at most two others. The path ordering determines the conditioning structure at each level.
>
> **Tree structure (d=5 example, ordering 1–2–3–4–5):**
> - $T_1$: edges $(1,2), (2,3), (3,4), (4,5)$
> - $T_2$: edges $(1,3|2), (2,4|3), (3,5|4)$
> - $T_3$: edges $(1,4|23), (2,5|34)$
> - $T_4$: edge $(1,5|234)$
>
> Neighbours in the ordering are linked first (level 1); longer-range dependences are captured at deeper tree levels, conditioned on intermediate variables.
^def-dvine-structure

> [!definition] D-vine density (d-dimensional)
> Let the path ordering be $1, 2, \ldots, d$. The D-vine density is:
>
> $$f(\mathbf{x}) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{d-1}\prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)$$
>
> The pair-copulas and their arguments:
> - **Level 1** ($j=1$): $c_{12},\; c_{23},\; \ldots,\; c_{d-1,d}$ — consecutive neighbours
> - **Level 2** ($j=2$): $c_{13|2},\; c_{24|3},\; \ldots$ — skip-one pairs conditioned on the intermediate variable
> - **Level $j$**: pairs $(i, i+j)$ conditioned on all variables $\{i+1, \ldots, i+j-1\}$ between them
>
> The conditional CDFs are computed via h-function recursion as in [[Pair Copula Construction]].
^def-dvine-density

> [!definition] D-vine: when to use
> The D-vine is well-suited when:
> - Variables have a **natural linear ordering**: time series lags, spatial distance, a latent scale (e.g. rating grades in credit risk).
> - Dependence is strongest between neighbours in the ordering and decreases with "distance" — the D-vine captures this efficiently via tree levels.
> - Longitudinal/panel data: D-vine copulas can model serial dependence non-parametrically, as an alternative to ARMA models.
> - The conditioning sets at each level are interpretable (e.g. "dependence between period 1 and period 4, given periods 2 and 3").
^def-dvine-use

---

### Comparing C-vine and D-vine

> [!definition] Structural comparison
>
> | Property | C-vine | D-vine |
> |---|---|---|
> | Tree $T_\ell$ shape | Star (one root, $d-1-\ell+1$ leaves) | Path (each node has at most 2 neighbours) |
> | Pair-copulas at level 1 | $d-1$ pairs, all involving root | $d-1$ consecutive pairs |
> | Conditioning sets | Always $\{1, \ldots, j-1\}$ (root sequence) | Variables between the pair in the ordering |
> | Natural interpretation | Root variable mediates all dependences | Neighbouring variables most dependent |
> | Best use case | One key driver / latent factor | Temporal/spatial ordering; Markov-like structure |
> | Parameter count | Same: $d(d-1)/2$ pair-copulas | Same: $d(d-1)/2$ pair-copulas |
> | Estimation challenge | Choosing root order | Choosing path order |
>
> For $d = 2$, C-vine and D-vine coincide (one pair-copula). For $d = 3$, there is only one possible vine structure (3 nodes, 3 pair-copulas, 2 trees of 2 edges each) shared by both C-vine and D-vine.
^def-comparison

## Examples

> [!example] 4-variable D-vine (Aas et al. 2009, §2.2, Example 2)
> **Variables:** $(X_1, X_2, X_3, X_4)$ with ordering 1–2–3–4.
>
> **Pair-copulas (6 total):**
> - Tree 1: $c_{12}$, $c_{23}$, $c_{34}$
> - Tree 2: $c_{13|2}$, $c_{24|3}$
> - Tree 3: $c_{14|23}$
>
> **Joint density:**
> $$f(x_1,x_2,x_3,x_4) = f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{13|2}(v_{1|2}, v_{3|2}) \cdot c_{24|3}(v_{2|3}, v_{4|3}) \cdot c_{14|23}(v_{1|23}, v_{4|23})$$
>
> **h-function cascade:**
> - $v_{1|2} = h(F_1(x_1), F_2(x_2); \theta_{12})$ and $v_{3|2} = h(F_3(x_3), F_2(x_2); \theta_{23})$
> - $v_{2|3} = h(F_2(x_2), F_3(x_3); \theta_{23})$ and $v_{4|3} = h(F_4(x_4), F_3(x_3); \theta_{34})$
> - $v_{1|23} = h(v_{1|2}, v_{3|2}; \theta_{13|2})$ and $v_{4|23} = h(v_{4|3}, v_{2|3}; \theta_{24|3})$
>
> **Flexibility:** each of the six pair-copulas can be a different bivariate family. For example, $c_{12}$ might be Clayton (lower-tail dependence between $X_1$ and $X_2$) while $c_{34}$ is Gaussian (symmetric dependence between $X_3$ and $X_4$).

> [!example] 4-variable C-vine with root sequence (1, 2, 3)
> **Variables:** $(X_1, X_2, X_3, X_4)$ with $X_1$ as root at level 1, $X_2$ at level 2, $X_3$ at level 3.
>
> **Pair-copulas (6 total):**
> - Tree 1 (star at $X_1$): $c_{12}$, $c_{13}$, $c_{14}$
> - Tree 2 (star at $X_2$ conditioned on $X_1$): $c_{23|1}$, $c_{24|1}$
> - Tree 3: $c_{34|12}$
>
> **Interpretation:** $X_1$ is the "market factor" — after removing $X_1$'s influence, $X_2$ mediates residual dependences; then $X_3$ mediates what remains after both $X_1$ and $X_2$ are partialed out.

## Connections

- [[Vine Copulas - Overview]] — the general R-vine framework of which C-vine and D-vine are special cases.
- [[Pair Copula Construction]] — the h-function recursion and density factorization used by both structures.
- [[Vine Copula Estimation]] — Dißmann's algorithm selects the best R-vine; C-vine is selected when the maximum spanning tree consistently picks star-like topologies.
- [[Copula Architecture Comparison]] — where C/D-vine fit relative to factor copulas and standard copulas.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — the factor copula analogue of heterogeneous dependence; compare with how D/C-vine handles heterogeneity.
- [[../_Index|Econometrics]]
