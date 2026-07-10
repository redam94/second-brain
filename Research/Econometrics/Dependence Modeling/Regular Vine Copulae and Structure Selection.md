---
title: Regular Vine Copulae and Structure Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Dissmann et al. (2013) §2–4; Bedford & Cooke (2002) §2–3; Czado & Nagler (2022) §3"
date_ingested: 2026-07-10
date_updated: 2026-07-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and h-Functions]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - R-vine
  - regular vine
  - Dissmann algorithm
  - vine matrix
  - RVine
---

# Regular Vine Copulae and Structure Selection

> [!summary]
> Regular vines (R-vines; Bedford & Cooke 2002) generalise C-vines and D-vines: any sequence of trees satisfying the **proximity condition** defines a valid vine copula. R-vines are parameterised by a **vine matrix** and selected by the **greedy maximum spanning tree algorithm** (Dissmann et al. 2013), which sequentially chooses the tree structure that maximises total absolute Kendall $\tau$ at each level. This is the current standard approach for moderate-dimensional dependence modelling (d ≤ 20).

## Overview

C-vines and D-vines are convenient but rigid: a C-vine requires a single hub variable; a D-vine requires a natural linear ordering. In practice, dependence is often heterogeneous — some pairs have strong tail dependence, others are nearly independent, and the dominant structure may not be a star or a path. Regular vines (Bedford & Cooke 2001, 2002) allow *any* valid tree sequence, giving the modeller complete flexibility over which bivariate copulas appear.

The challenge: the space of R-vine structures is astronomically large for $d \geq 10$. Dissmann, Brechmann, Czado & Kurowicka (2013) propose a greedy sequential algorithm that selects the structure by maximising dependence explained at each tree level — a tractable heuristic with good empirical performance.

## Main Content

> [!definition] Regular vine (R-vine): formal definition
> A **regular vine** $\mathcal{V}$ on $d$ variables is a sequence of $d-1$ trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:
> 1. $T_1$ is a connected tree with node set $N_1 = \{1,\ldots,d\}$ and edge set $E_1$ (any spanning tree of the complete graph $K_d$).
> 2. For $j = 2, \ldots, d-1$: $T_j$ is a connected tree with node set $N_j = E_{j-1}$ (the *edges* of $T_{j-1}$ become the *nodes* of $T_j$) and edge set $E_j$.
> 3. **Proximity condition**: For each edge $\{a, b\} \in E_j$, the nodes $a$ and $b$ (which are themselves edges of $T_{j-1}$) must share exactly one element.
>
> Condition 3 ensures that the conditioning set grows properly: if edge $e=\{a,b\}$ in $T_j$ has $a=(i,j|D_a)$ and $b=(k,j|D_b)$ with $D_a = D_b \cup \{j\}$ or $D_b = D_a \cup \{j\}$ for some $j$, then the pair $(i,k)$ conditional on $D_a \cup D_b$ is a valid conditional pair copula. C-vines and D-vines are special cases that always satisfy this condition.
^def-rvine

> [!definition] Vine matrix representation
> An R-vine on $d$ variables is fully encoded in a $d \times d$ lower-triangular **vine matrix** $M$. The columns represent the d trees; the rows encode the copula pair structure at each level.
>
> Specifically, for a vine matrix with entries $m_{ij}$:
> - The diagonal entry $m_{jj}$ is the "root" (conditioning variable) at tree level $j$
> - Off-diagonal entry $m_{ij}$ (for $i > j$) gives the second conditioned variable in the pair copula at tree level $i - j$
>
> Once $M$ is specified:
> 1. The edge set of each tree is directly readable from $M$
> 2. The pair copulas $c_{a,b|D}$ are indexed by columns and rows of $M$
> 3. The h-function recursion traverses $M$ from left to right and bottom to top
>
> Software (VineCopula R; rvinecopulib) stores the vine structure as this matrix and the copula families/parameters as parallel matrices of the same shape.
^def-matrix

> [!definition] Greedy maximum spanning tree (MST) selection (Dissmann et al. 2013)
> The **Dissmann algorithm** selects an R-vine structure sequentially, one tree at a time:
>
> **Tree $T_1$ selection:**
> 1. Compute absolute Kendall $\tau_{ij}$ for all $d(d-1)/2$ variable pairs.
> 2. Build a complete graph $G_1$ on $d$ nodes with edge weights $|\hat{\tau}_{ij}|$.
> 3. Find the **maximum spanning tree** of $G_1$ (Kruskal's or Prim's algorithm). This $T_1$ maximises the total absolute Kendall $\tau$ explained.
> 4. For each edge $(i,j)\in E_1$: select the pair copula family by AIC/BIC over a candidate set; estimate parameters by (sequential) MLE.
>
> **Tree $T_j$ selection** ($j = 2, \ldots, d-1$):
> 1. From $T_{j-1}$, identify all pairs of edges that satisfy the proximity condition → valid candidate edges for $T_j$.
> 2. Compute absolute Kendall $\tau$ of the h-function pseudo-observations $\hat{v}_{i|D}$ and $\hat{v}_{j|D}$ for each valid candidate pair.
> 3. Build a graph $G_j$ on node set $E_{j-1}$ with these weights. Find the maximum spanning tree satisfying the proximity condition.
> 4. Select and estimate pair copulas for each new edge.
>
> **Complexity**: $O(d^3)$ per tree level; $O(d^4)$ total — feasible for $d \leq 20$. For larger $d$, truncated vines (setting higher-tree copulas to independence) reduce cost dramatically.
^def-mst

> [!definition] Truncated R-vines
> For a dimension-$d$ R-vine, the pair copulas in trees $T_{j+1}, \ldots, T_{d-1}$ can be set to the **independence copula** to create a **truncated vine of order $j$**. This uses only $\sum_{k=1}^j (d-k) = jd - j(j+1)/2$ pair copulas instead of $d(d-1)/2$.
>
> **Rationale**: The greedy MST algorithm selects tree $T_1$ to maximise total dependence; later trees capture progressively weaker conditional dependence. For many applications, trees beyond $T_3$ or $T_4$ add little, and truncation avoids overfitting.
>
> **Order selection**: Use the Vuong test (likelihood ratio for non-nested models) or AIC/BIC to compare successive truncation orders. Czado & Nagler (2022) recommend order 5–6 as a practical upper bound for most financial applications.
^def-truncation

> [!definition] Pair copula family selection in R-vines
> At each vine edge, fit all candidate bivariate copula families and select by minimum AIC:
> $$\text{AIC}_{ij|D} = -2\,\ell_{ij|D}(\hat{\boldsymbol{\theta}}) + 2\,p$$
> where $\ell$ is the pair log-likelihood on the h-function pseudo-observations and $p$ is the number of parameters. Standard candidate sets include: Independence, Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, and their rotations (90°, 180°, 270° for asymmetric families to capture upper vs lower tail asymmetry).
>
> The resulting vine is a **mixed vine**: different pair copula families at different edges. This is the main flexibility advantage over factor copulas, which impose a single family for the common factor.
^def-families

## Examples

> [!example] 5-variable R-vine (Dissmann et al. 2013 application)
> **Data:** Daily log-returns on 5 stock indices: DAX, FTSE, CAC, SMI, S&P 500.
>
> **T₁ selection (MST of pairwise $|\tau|$):**
> Highest $|\tau|$ pairs are all European pairs: DAX-FTSE(0.52), DAX-CAC(0.57), DAX-SMI(0.56), CAC-SMI(0.51). The maximum spanning tree is: DAX—CAC—FTSE, DAX—SMI, and CAC—S&P (adding the cross-Atlantic link). This gives a "star around DAX/CAC" structure at T₁.
>
> **T₁ family selection:**
> - DAX-CAC: Student-$t$($\rho$=0.83, $\nu$=7) — symmetric upper/lower tail dependence (co-crashes)
> - DAX-FTSE: Student-$t$($\rho$=0.76, $\nu$=9)
> - DAX-SMI: Student-$t$($\rho$=0.77, $\nu$=8)
> - CAC-S&P: Gaussian($\rho$=0.43) — weaker, near-symmetric
>
> **T₂ selection (proximity condition applied to T₁ edges):**
> Valid edges include pairs like (FTSE,SMI|DAX), (FTSE,CAC|DAX), (S&P,DAX|CAC). MST selects those with highest conditional $|\tau|$.
>
> **Result:** The R-vine outperforms both C-vine and D-vine (by AIC) because no single variable is a universal hub; the structure adapts to the actual dependence pattern — strong European cluster, weaker trans-Atlantic link.

## Connections

- [[Vine Copulas - Overview]] — the big picture; R-vine as the most general vine class.
- [[C-Vine and D-Vine Structures]] — special cases of R-vines; preferred when data has hub or sequential structure.
- [[Pair Copula Construction and h-Functions]] — h-function recursion that implements the vine density; propagates through the vine matrix tree-by-tree.
- [[Copula Architecture Comparison]] — R-vine vs factor copula for high-dimensional settings.
- [[Factor Copulas - Overview]] — the competing high-dimensional approach; factor copulas dominate R-vines at $d \geq 50$.
- [[SMM Estimation of Factor Copulas]] — factor copulas use SMM instead of sequential MLE; compare the two estimation strategies.

## See Also

- [[Dependence Measures for Copulas]] — Kendall $\tau$ is the weight function in the MST selection algorithm; quantile dependence validates the selected vine.
- [[../_Index|Econometrics]]
