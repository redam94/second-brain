---
title: "C-vine and D-vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Bedford-Cooke-2002-Vines-Graphical-Model.txt]]"
source_location: "Secs. 2–3, pp. 1035–1048 (Bedford & Cooke 2002); Secs. 2.1–2.2, pp. 183–186 (Aas et al. 2009)"
date_ingested: 2026-10-01
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Constructions - PCC]]"
used_by:
  - "[[Vine vs Factor Copula Architectures]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - regular vine
  - R-vine
  - vine structure selection
---

# C-vine and D-vine Structures

> [!summary]
> Bedford & Cooke (2002) define the **regular vine (R-vine)** as the most general vine structure — a sequence of trees whose edges obey the **proximity condition**. The two practically important special cases are the **C-vine** (canonical vine: star-shaped trees, one hub per level) and the **D-vine** (drawable vine: path-shaped trees). C-vines are suited when one variable dominates all others; D-vines suit ordered sequences. **Structure selection** (which vine type and ordering maximises fit) is typically done by maximising Kendall's $\tau$ at each tree level, implemented in the `VineCopula` R package (Dißmann et al. 2013).

## Overview

Given $d$ variables, there are $(d-1)! / 2$ distinct C-vine orderings and the same number of D-vine orderings — and many more R-vine structures. The choice of structure (which pair copulas appear in early trees) strongly affects both model fit and the conditional CDF computations in the h-function recursion. Well-structured vines place the strongest unconditional dependencies in tree $T_1$, the strongest remaining dependencies in $T_2$ conditional on $T_1$, and so on — ensuring that truncating at a low level captures most of the dependence (see the **truncated vine** below).

## Main Content

> [!definition] Regular vine (R-vine) — Bedford & Cooke (2002)
> A **regular vine** on $d$ variables is a nested sequence of trees $V = (T_1, T_2, \dots, T_{d-1})$ satisfying:
>
> 1. $T_1$ is a tree with nodes $N_1 = \{1, 2, \dots, d\}$ and edge set $E_1 \subseteq \binom{N_1}{2}$, $|E_1| = d-1$.
>
> 2. For $j = 2, \dots, d-1$: $T_j$ has node set $N_j = E_{j-1}$ (the edges of the previous tree become nodes) and edge set $E_j \subseteq \binom{N_j}{2}$, $|E_j| = d - j$.
>
> 3. **Proximity condition:** two nodes of $T_j$ can be connected only if they share exactly one element as nodes of $T_{j-1}$. Formally, for an edge $\{e_a, e_b\} \in E_j$, the symmetric difference $e_a \triangle e_b$ has exactly two elements.
>
> Each edge $e = \{a, b | D\} \in E_j$ (where $a, b$ are the two "unconditioned" variables and $D$ is the shared conditioning set of size $j-1$) corresponds to one bivariate pair copula $C_{a,b|D}$.
>
> **Total pair copulas:** $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$, the same as the number of bivariate margins.
^def-rvine

> [!definition] C-vine (Canonical vine)
> A **C-vine** is an R-vine where every tree $T_j$ is a **star**: one hub node connects to all $d - j$ remaining nodes.
>
> - $T_1$: hub node $1$; edges $(1,2), (1,3), \dots, (1,d)$.
> - $T_2$: hub node $2$; edges $(2,3|1), (2,4|1), \dots, (2,d|1)$.
> - $T_j$: hub node $j$; edges $(j, j+1 | 1,\dots,j-1), \dots, (j, d | 1,\dots,j-1)$.
>
> **Pair copulas:** $c_{j,i|1,\dots,j-1}$ for $j = 1, \dots, d-1$ and $i = j+1, \dots, d$.
>
> **Key property:** Variable $j$ (the hub of tree $T_j$) acts as the unique "key" variable at level $j$. If variable 1 is the most influential (e.g., a market index, a major asset), placing it as the C-vine root concentrates the strongest dependencies in tree $T_1$ and allows tree $T_2$ and beyond to model residual conditional dependence. All $d-1$ h-function calls in tree $T_j$ condition on the *same* set $\{1, \dots, j-1\}$, which simplifies computation.
^def-cvine

> [!definition] D-vine (Drawable vine)
> A **D-vine** is an R-vine where every tree $T_j$ is a **path**: each node has degree at most 2.
>
> - $T_1$: path $1 - 2 - 3 - \dots - d$; edges $(1,2), (2,3), \dots, (d-1,d)$.
> - $T_2$: edges $(1,3|2), (2,4|3), \dots, (d-2,d|d-1)$.
> - $T_j$: edges $(i, i+j | i+1, \dots, i+j-1)$ for $i = 1, \dots, d-j$.
>
> **Key property:** The variable ordering is the D-vine's primary parameter — it determines which pairs appear in $T_1$ (adjacent pairs get direct unconditional copulas, non-adjacent pairs get progressively more conditioning). D-vines are the natural choice when variables have a **sequential** structure: time series, spatial locations, factor-ordered assets. The D-vine is also equivalent to certain **autoregressive model classes** for time series.
^def-dvine

> [!definition] R-vine vs C-vine vs D-vine: structural relationship
> Every C-vine and D-vine is an R-vine. The converse does not hold: most R-vines are neither C-vines nor D-vines. For $d=4$:
>
> | | $T_1$ structure | $T_2$ structure | $T_3$ structure |
> |---|---|---|---|
> | **C-vine** | star (1 hub, 3 edges) | star (1 hub, 2 edges) | single edge |
> | **D-vine** | path (4 nodes, 3 edges) | path (3 nodes, 2 edges) | single edge |
> | **R-vine** | any spanning tree | any spanning tree of edges from $T_1$ satisfying proximity | single edge |
>
> For $d \le 4$ all R-vines can be classified as either C-vines or D-vines (up to relabelling). For $d \ge 5$, truly general R-vines exist. The number of distinct labeled R-vines grows super-exponentially: for $d=5$ there are 240 distinct R-vines.
^def-rvine-comparison

> [!definition] Vine structure selection (Dißmann et al. 2013)
> Given $d$ variables, selecting the vine structure is a high-dimensional combinatorial problem. The standard greedy algorithm of Dißmann, Brechmann, Czado & Kurowicka (2013):
>
> 1. For tree $T_1$: compute all $\binom{d}{2}$ pairwise Kendall's $\hat\tau_{ij}$. Find the **maximum spanning tree** with weights $|\hat\tau_{ij}|$ (maximise total pairwise absolute rank correlation in $T_1$).
>
> 2. For each edge of the selected $T_1$: fit the pair copula by maximising bivariate log-likelihood; compute h-function outputs.
>
> 3. For tree $T_j$ ($j \ge 2$): compute Kendall's $\hat\tau$ for all $\binom{d-j+1}{2}$ eligible conditional pairs (from h-function outputs). Find the maximum spanning tree of eligible pairs satisfying the proximity condition.
>
> 4. Repeat until $T_{d-1}$.
>
> **Pair copula family selection at each edge:** choose the bivariate family (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, independence, …) by minimising AIC or BIC over the tested families after fitting each by MLE. The `VineCopula` R package (Schepsmeier et al.) and `pyvinecopulib` (Python) implement this algorithm.
^def-structure-selection

> [!definition] Truncated vine copulas (Brechmann & Czado 2013)
> For large $d$, estimating all $d(d-1)/2$ pair copulas becomes impractical. A **truncated vine of order $M$** sets all pair copulas in trees $T_{M+1}, \dots, T_{d-1}$ to the **independence copula** ($c_{a,b|D} = 1$ for $j > M$). This retains $M(2d-M-1)/2$ pair copulas instead of $d(d-1)/2$. Truncation is motivated by the observation that high-tree-level conditional pairs, after all lower-level conditioning, are nearly independent: the contribution to the log-likelihood from trees above $M$ is small once the most important dependencies are captured.
>
> **Model selection for $M$:** Vuong test or likelihood-ratio test comparing truncated models at successive levels; stop when adding the next tree gives no significant improvement.
^def-truncated-vine

## Examples

> [!example] C-vine for $d = 4$ with market factor
> **Setup:** Variables $X_1$ (market return), $X_2$ (bank sector), $X_3$ (insurance sector), $X_4$ (utilities sector). Variable 1 dominates all others. Use a C-vine with root 1.
>
> Tree $T_1$ (star): $(1,2)$ Gumbel (strong upper tail), $(1,3)$ Gumbel, $(1,4)$ Gaussian (weak tail).
> Tree $T_2$ (star): $(2,3|1)$ Gaussian, $(2,4|1)$ independence.
> Tree $T_3$: $(3,4|12)$ independence (truncated).
>
> **Interpretation:** Most joint extremes are driven by the market factor. Conditional on the market, the sector pairs are nearly independent (suitable for a truncated vine). The C-vine captures this "hub-and-spoke" financial structure naturally.

> [!example] D-vine for $d = 4$ time-series variables
> **Setup:** $X_t, X_{t-1}, X_{t-2}, X_{t-3}$ — four lags of a stock return. Use variable ordering $(1,2,3,4)$ = $(t, t-1, t-2, t-3)$.
>
> Tree $T_1$ (path): $(1,2)$, $(2,3)$, $(3,4)$ — adjacent-lag copulas (strong, short-memory).
> Tree $T_2$: $(1,3|2)$, $(2,4|3)$ — skip-one-lag conditional copulas (weaker after conditioning).
> Tree $T_3$: $(1,4|23)$ — skip-three conditional copula (weakest; may be set to independence).
>
> **Interpretation:** The D-vine encodes the temporal ordering of lags naturally. If the process is a first-order Markov chain, trees $T_2$ and $T_3$ would have independence copulas everywhere — the D-vine structure selection would discover this.

## Connections

- [[Vine Copulas - Overview]] — motivation and the general vine framework.
- [[Pair Copula Constructions - PCC]] — the density formulas for C-vine and D-vine, and the h-function recursion for computing conditional CDFs.
- [[Vine vs Factor Copula Architectures]] — how vine structure choices compare with the factor copula's parameter economy.
- [[Factor Copula Construction]] — factor copulas impose equidependence by construction (one loading per variable); vines have heterogeneous dependence by design at the cost of more parameters.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the selection criterion for vine structure (maximum spanning tree algorithm).

## See Also

- [[Multi-Factor and Block Dependence Structures]] — the analogous structure-choice problem for factor copulas: block/industry equidependence vs. full flexibility.
- [[SMM Estimation of Factor Copulas]] — factor copula estimation; compare parameter count with vine's $O(d^2)$.
- [[Econometrics/_Index|Econometrics]]
