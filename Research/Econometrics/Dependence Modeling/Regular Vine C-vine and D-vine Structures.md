---
title: Regular Vine, C-vine, and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/VineCopula-R-Package-README.md]]"
source_location: "Bedford & Cooke (2001, 2002); Dißmann et al. (2013); Aas et al. (2009) Sec. 2"
date_ingested: 2026-09-18
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Pair Copula Construction]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - R-vine
  - C-vine
  - D-vine
  - regular vine
  - canonical vine
  - drawable vine
  - vine tree sequence
---

# Regular Vine, C-vine, and D-vine Structures

> [!summary]
> A **vine** (Bedford & Cooke 2001, 2002) is a sequence of $d-1$ trees that specifies which $d(d-1)/2$ bivariate conditional copulas form a valid factorization of a $d$-dimensional density. The **C-vine** (star-tree structure) and **D-vine** (path-tree structure) are the two tractable special cases of the general **R-vine** (regular vine); R-vines are stored compactly as the **R-vine matrix** introduced by Dißmann et al. (2013).

## Overview

The pair-copula construction (PCC; see [[Vine Copulas - Overview]]) requires $d(d-1)/2$ bivariate conditional copulas. Not all assignments of variables-to-pairs are valid: a vine structure must satisfy the **proximity condition**, which ensures that the conditioning set for each pair copula in tree $T_j$ is exactly the set of variables shared by its two node-endpoints, and that this set grows correctly from one tree level to the next.

Bedford & Cooke (2001, 2002) introduced **regular vines (R-vines)** as the general class of valid vine structures. For $d=4$ there are already $16$ distinct R-vines; the combinatorics grow quickly. Two sub-classes have closed-form tree shapes that are easy to visualize and implement: **C-vines** and **D-vines**.

## Main Content

> [!definition] Regular Vine (R-vine)
> A **regular vine** $\mathcal{V}$ on $d$ variables is a sequence of $d-1$ trees $T_1, T_2, \dots, T_{d-1}$ satisfying:
> 1. **Tree $T_1$**: nodes $\{1,2,\dots,d\}$, edges $\mathcal{E}_1 \subseteq \binom{[d]}{2}$; connected tree with $d-1$ edges.
> 2. **Tree $T_j$ (for $j \geq 2$)**: nodes are the **edges** of $T_{j-1}$ (i.e., $\mathcal{E}_{j-1}$); two nodes of $T_j$ may be connected by an edge only if they share exactly one node in $T_{j-1}$ (**proximity condition**).
>
> Each edge $e = \{a,b\} \in \mathcal{E}_j$ corresponds to a bivariate copula $c_{a,b|\mathbf{D}(e)}$, where the **conditioning set** $\mathbf{D}(e)$ is the symmetric difference of the complete variable sets of the two endpoint nodes of $e$.
>
> **Parameter count:** A $d$-dimensional R-vine has exactly $d(d-1)/2$ edges (pair copulas), one per unique variable pair.
^r-vine-definition

> [!definition] C-vine (Canonical Vine)
> A **C-vine** on $d$ variables has a **star structure** at each tree level: in tree $T_j$, one node (the **root**) is connected to all $d-j$ remaining nodes.
>
> - Tree $T_1$: star with root $r_1$, edges $\{(r_1, k) : k \neq r_1\}$ — $d-1$ unconditional bivariate copulas.
> - Tree $T_2$: star with root $r_2$, edges $\{(r_1 r_2, r_1 k) : k \neq r_1, r_2\}$ — $d-2$ conditional bivariate copulas with conditioning set $\{r_1\}$.
> - Tree $T_j$: $d-j$ pair copulas, all conditioned on $\{r_1, \dots, r_{j-1}\}$.
>
> The root sequence $(r_1, r_2, \dots, r_{d-1})$ uniquely determines the C-vine. In the Aas et al. (2009) parameterization, the bivariate copula at level $j$ between variable $i$ and variable $i+j$ is:
> $$c_{i,i+j|i+1,\dots,i+j-1}$$
> **Practical interpretation:** the root $r_1$ is typically chosen as the variable with the highest average pairwise dependence. A C-vine is natural when one variable acts as a "common driver" of all others (analogy with a factor model structure, but without the factor copula's equidependence restriction).
^c-vine-definition

> [!definition] D-vine (Drawable Vine)
> A **D-vine** on $d$ variables has a **path structure** at tree level 1: the $d$ variables are ordered along a path, with each adjacent pair connected.
>
> - Tree $T_1$: path $1 - 2 - 3 - \cdots - d$; edges $(1,2),(2,3),\dots,(d-1,d)$ — $d-1$ unconditional bivariate copulas between **adjacent** variables.
> - Tree $T_2$: path of $d-1$ edges; each edge $(i,i+2|i+1)$ for $i=1,\dots,d-2$ — one-lag conditional copulas.
> - Tree $T_j$: edges $(i, i+j | i+1,\dots,i+j-1)$ for $i=1,\dots,d-j$.
>
> **Practical interpretation:** the D-vine variable ordering matches sequential or time-series data where each variable depends primarily on its nearest neighbours. A D-vine with $d$ time points models a time-series-like structure with explicit lag-$j$ conditional dependence at level $j$; this is exploited in **D-vine copula quantile regression** (Kraus & Czado 2017).
^d-vine-definition

> [!definition] R-vine Matrix
> Dißmann et al. (2013) introduced a compact $d \times d$ **lower-triangular matrix** representation for any R-vine:
> - The diagonal entries encode the variables.
> - Off-diagonal entry at row $i$, column $j$ ($i > j$) specifies which variable is the "new" variable in the pair copula at tree $d-j+1$, column $j$; the conditioning set is read from the column entries above.
>
> This encoding is implemented as `RVineMatrix` in the `VineCopula` R package and the corresponding class in `pyvinecopulib`. The C-vine and D-vine are special cases: `C2RVine` and `D2RVine` construct the corresponding matrices.
^rvine-matrix

## Examples

> [!example] Four-variable structures
> **Variables:** $(X_1, X_2, X_3, X_4)$.
>
> **D-vine structure:**
> - $T_1$: $(1,2),(2,3),(3,4)$
> - $T_2$: $(1,3|2),(2,4|3)$
> - $T_3$: $(1,4|2,3)$
>
> **C-vine structure (root = variable 1):**
> - $T_1$: $(1,2),(1,3),(1,4)$
> - $T_2$: $(2,3|1),(2,4|1)$
> - $T_3$: $(3,4|1,2)$
>
> Both use $\binom{4}{2}=6$ bivariate copulas. The difference is which pairs are unconditional ($T_1$) vs. conditioned on 1, 2, or 3 variables.

> [!example] Choosing between C-vine and D-vine
> **Financial equities ($d = 5$):** If stock 1 is the market index and stocks 2–5 are sector funds all correlated with 1, a **C-vine** with root 1 places the (1,2),(1,3),(1,4),(1,5) unconditional copulas at level 1 — exactly capturing the market-factor structure.
>
> **Macro time series ($d = 5$ time points):** If the data are $Y_{t-2},Y_{t-1},Y_t,Y_{t+1},Y_{t+2}$ and dependence decays with lag, a **D-vine** along the natural time order places adjacent-period copulas at level 1 and captures the Markov-like structure directly.

## Connections

- [[Vine Copulas - Overview]] — the motivation and general PCC framework that vine structures organize.
- [[Pair Copula Construction]] — the mathematical density formula and h-function recursion that use the vine structure.
- [[Vine Copula Estimation and Model Selection]] — Dißmann et al. (2013) greedy max-spanning-tree algorithm for selecting the R-vine structure from data.
- [[Copula Architecture Comparison]] — where C-vine / D-vine fit in the landscape of copula families.

## See Also

- [[Factor Copulas - Overview]] — the competing high-dimensional approach; the factor model implicitly imposes an equidependence "C-vine-like" structure but with a latent variable rather than observed conditioning.
- [[raw/VineCopula-R-Package-README.md]] — `C2RVine`, `D2RVine`, `RVineMatrix` objects.
- [[../_Index|Econometrics]]
