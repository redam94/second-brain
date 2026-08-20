---
title: C-vine and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-Frigessi-Bakken-2009-Vine-Copulas.md]]"
source_location: "Secs. 2.2–2.3, pp. 184–186; Bedford & Cooke 2002"
date_ingested: 2026-08-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - regular vine
  - R-vine
  - vine graphical structure
---

# C-vine and D-vine Structures

> [!summary]
> A vine is a nested sequence of $n-1$ trees that organises which bivariate pair copulas are estimated at each conditioning level. The two canonical vine types are the **C-vine** (canonical vine: star-shaped trees with a central root variable) and the **D-vine** (drawable vine: path-graph trees with sequential ordering). Both are special cases of the **regular vine** (R-vine, Bedford & Cooke 2002). The vine structure determines which conditional relationships are modelled at low vs. high conditioning depth — choosing the right structure is a key modelling decision that affects both interpretability and estimation accuracy.

## Overview

Recall from [[Pair-Copula Construction]] that any $n$-dimensional density has $\binom{n}{2}$
pair copulas organised over $n-1$ trees. The vine specifies which pairs appear in which tree
— i.e., at which conditioning depth. Pairs at tree $T_1$ are unconditional bivariate copulas;
pairs at tree $T_j$ are conditioned on $j-1$ variables.

Because pairs modelled at $T_1$ receive the most direct estimation (no h-function error
propagation), the vine structure should place the most important conditional relationships
at the earliest trees.

## Main Content

### Formal definition: Regular vine (Bedford & Cooke 2002)

> [!definition] Regular vine
> A **regular vine** (R-vine) $\mathcal{V}$ on $n$ variables is a sequence of trees $T_1, T_2, \dots, T_{n-1}$ satisfying:
>
> 1. $T_1 = (N_1, E_1)$ with $N_1 = \{1, \dots, n\}$ and $|E_1| = n - 1$.
> 2. For $j = 2, \dots, n-1$: $T_j = (N_j, E_j)$ with $N_j = E_{j-1}$ (the edges of the previous tree become the nodes of the next tree) and $|E_j| = n - j$.
> 3. **Proximity condition:** Two nodes $a, b \in N_j = E_{j-1}$ can be connected by an edge in $T_j$ only if $|a \cap b| = j - 1$ — they must share exactly $j-1$ elements of the original variable set.
>
> Each edge $e = \{a, b\} \in E_j$ has:
> - **Conditioned set**: $\{a \triangle b\} = (a \cup b) \setminus (a \cap b)$ — the two unique elements.
> - **Conditioning set**: $D(e) = a \cap b$ — the $j-1$ shared elements.
>
> The pair copula for edge $e$ is $c_{i,k|D(e)}$ where $\{i, k\} = a \triangle b$.
^def-regular-vine

The total number of edges across all trees is $\sum_{j=1}^{n-1}(n-j) = \binom{n}{2}$,
matching the number of pair copulas needed.

### C-vine (Canonical vine)

> [!definition] C-vine (canonical vine)
> A **C-vine** is a regular vine in which **every tree $T_j$ is a star graph**: one "root" node is connected to all $n-j$ other nodes in that tree. Equivalently, the root node at tree $T_j$ has degree $n-j$ (the maximum).
>
> The root variable at tree $T_j$ is variable $j_j^*$ — typically chosen as the variable with the highest average pairwise dependence (by sum of absolute Kendall's $\tau$) among the remaining variables.
^def-c-vine

**Example — 4-variable C-vine** (root ordering: 1, 2, 3):

```
T₁:   1 — 2,   1 — 3,   1 — 4
      Pair copulas: c₁₂, c₁₃, c₁₄

T₂:   (1,2) — (1,3);   (1,2) — (1,4)
      ≡ edges (2,3|1) and (2,4|1)   [proximity: share element 1]
      Pair copulas: c₂₃|₁, c₂₄|₁

T₃:   (2,3|1) — (2,4|1)
      ≡ edge (3,4|1,2)   [share elements 1,2]
      Pair copula: c₃₄|₁₂
```

**Full C-vine density for $n=4$:**
$$f(x_1,x_2,x_3,x_4) = \prod_{k=1}^4 f_k(x_k) \cdot c_{12} \cdot c_{13} \cdot c_{14} \cdot c_{23|1} \cdot c_{24|1} \cdot c_{34|12}$$

**When to use C-vine:** When one variable (the root) has strong dependence with all others and serves as a common driver (analogous to a latent factor). Examples:
- Market index and individual stocks.
- Interest rate and yield curve factors.
- A key macroeconomic variable (GDP growth) and sectoral indicators.

The C-vine "concentrates" all conditioning on the root variable, making lower-tree pair copulas easy to interpret as marginal pairwise relationships with the root.

### D-vine (Drawable vine)

> [!definition] D-vine (drawable vine)
> A **D-vine** is a regular vine in which **every tree $T_j$ is a path graph**: each node has degree at most 2 (connected to at most two other nodes). The variables are arranged in a sequence (ordering) $\pi_1, \pi_2, \dots, \pi_n$.
>
> In tree $T_1$: adjacent pairs in the ordering are connected — edges $(\pi_1,\pi_2), (\pi_2,\pi_3), \dots, (\pi_{n-1},\pi_n)$.
>
> In tree $T_j$: the path at level $j$ connects "skipping-$j$" pairs conditional on the intervening variables.
^def-d-vine

**Example — 4-variable D-vine** (ordering: 1, 2, 3, 4):

```
T₁: 1 — 2 — 3 — 4
    Pair copulas: c₁₂, c₂₃, c₃₄

T₂: (1,2) — (2,3) — (3,4)
    ≡ edges (1,3|2) and (2,4|3)
    Pair copulas: c₁₃|₂, c₂₄|₃

T₃: (1,3|2) — (2,4|3)
    ≡ edge (1,4|2,3)
    Pair copula: c₁₄|₂₃
```

**Full D-vine density for $n=4$:**
$$f(x_1,x_2,x_3,x_4) = \prod_{k=1}^4 f_k(x_k) \cdot c_{12} \cdot c_{23} \cdot c_{34} \cdot c_{13|2} \cdot c_{24|3} \cdot c_{14|23}$$

**When to use D-vine:** When there is a natural sequential ordering of variables (temporal, spatial, or by closeness in some attribute). Examples:
- Time series at different lags: $Y_t, Y_{t-1}, Y_{t-2}, \dots$
- Maturity-ordered bond yields: 1Y, 2Y, 5Y, 10Y.
- Variables ordered by economic closeness (inputs → intermediate goods → outputs).

D-vines are also common in **quantile regression** (D-vine quantile regression, Kraus & Czado 2017) where the response variable is placed at one end of the path.

### Regular vine (R-vine)

A **regular vine** (R-vine) generalises both C-vine and D-vine. In an R-vine, the tree
structure is not constrained to be a star or a path — any spanning tree satisfying the
proximity condition is allowed. The number of possible R-vine structures for $n$ variables
grows super-exponentially with $n$; automatic vine structure selection by maximum spanning
tree (Dißmann et al. 2013) is standard in practice.

**Maximum spanning tree algorithm (Dißmann et al. 2013):**
1. Compute pairwise Kendall's $\tau$ (or other dependence measure) for all $\binom{n}{2}$ variable pairs.
2. Select $T_1$ as the spanning tree that maximises total edge weight (absolute Kendall's $\tau$) — places highest-dependence pairs at $T_1$.
3. Apply h-functions to obtain pseudo-observations for $T_2$.
4. Repeat: select $T_j$ as the maximum spanning tree on the $T_j$ nodes, using Kendall's $\tau$ on the conditional pseudo-observations.

This greedy algorithm is computationally practical and produces interpretable structures. It is implemented in `VineCopula::RVineStructureSelect` and `vinecopulib::RVineMatrix`.

### Comparison of vine types

> [!definition] C-vine vs. D-vine vs. R-vine summary
>
> | Feature | C-vine | D-vine | R-vine |
> |---------|--------|--------|--------|
> | Tree $T_1$ structure | Star (one root node) | Path (sequential ordering) | Any spanning tree |
> | Key modelling assumption | One dominant variable | Natural variable ordering | None |
> | Parameter count | $\binom{n}{2}$ pair copulas | $\binom{n}{2}$ pair copulas | $\binom{n}{2}$ pair copulas |
> | Root/ordering selection | By max pairwise dependence | By sequential structure | By max spanning tree algorithm |
> | Interpretation | Root variable as "hub" | Chain of conditional relationships | General pairwise structure |
> | Estimation difficulty | Moderate | Moderate | Requires automated structure selection |
> | Software support | `VineCopula`, `CDVine` | `VineCopula`, `CDVine` | `VineCopula`, `vinecopulib` |
^def-comparison

## Examples

> [!example] Choosing between C-vine and D-vine: equity returns vs. bond yields
>
> **Case 1: Four equity sector returns** (tech, financials, industrials, utilities) where
> the tech ETF has the highest average pairwise $|\tau|$ with the other three.
>
> → **C-vine** with tech as the root at $T_1$. This places the three "tech-vs-other" pair
> copulas at the unconditional level, and the three remaining pair copulas at $T_2/T_3$
> conditional on tech. Interpretation: conditional on the tech market movement, the
> remaining pairwise dependences are estimated from residuals.
>
> **Case 2: Four bond yields** (2Y, 5Y, 10Y, 30Y) ordered by maturity.
>
> → **D-vine** with ordering $2\text{Y}$–$5\text{Y}$–$10\text{Y}$–$30\text{Y}$. Adjacent
> maturities have highest unconditional dependence; the $T_1$ pair copulas capture the
> strongest pairwise links; $T_2$ pair copulas (2Y-10Y|5Y, 5Y-30Y|10Y) capture residual
> term-structure dependence; $T_3$ (2Y-30Y|5Y,10Y) models the residual long-short link.

## Connections

- [[Pair-Copula Construction]] — the factorisation theorem and h-function recursion that underpin the vine structure.
- [[Vine Copula Estimation and Model Selection]] — how to select the vine type, ordering, and pair copula families in practice.
- [[Vine Copulas - Overview]] — motivation and the copula landscape.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used for max-spanning-tree vine structure selection.
- [[Factor Copulas - Overview]] — compare: factor copulas impose equidependence or block structure rather than a tree-based conditioning hierarchy.

## See Also

- [[Factor Copula Construction]] — the factor-model alternative to vine's pair-copula structure.
- [[Multi-Factor and Block Dependence Structures]] — industry-block factor copula; analogous to a C-vine with industry-group roots.
- [[../_Index|Dependence Modeling]]
