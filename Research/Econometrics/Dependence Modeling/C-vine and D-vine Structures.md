---
title: C-vine and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Part 1 (Aas et al. 2009, Sec. 3); Part 2 (Bedford & Cooke 2002)"
date_ingested: 2026-07-16
date_updated: 2026-07-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Decomposition]]"
used_by:
  - "[[Regular Vine Copulas]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - C-vine copula
  - D-vine copula
  - canonical vine
  - drawable vine
  - star vine
  - chain vine
---

# C-vine and D-vine Structures

> [!summary]
> **C-vine (canonical vine)** and **D-vine (drawable vine)** are the two most commonly used special cases of regular vine copulas, distinguished by their tree topology. In a **D-vine**, variables are arranged in a chain: each tree level pairs adjacent nodes, making it suitable when no single variable drives all others. In a **C-vine**, one variable serves as a central hub at each tree level: it is paired with every other variable first, making it suitable when one variable (e.g. an index, or interest rate) strongly drives the rest. Both produce the same $N(N-1)/2$ bivariate copulas but in different orderings that imply different conditional independence assumptions.

## Overview

For $N$ variables, any vine structure uses exactly $N(N-1)/2$ bivariate copulas — $N-1$ in the first tree, $N-2$ in the second, and so on. The choice of structure determines **which pairs are modelled unconditionally** (tree $T_1$, most influence on fit) and **which pairs are modelled conditional on larger sets** (higher trees, marginal contribution). Since higher-level conditional copulas are closer to the independence copula (conditional independence is more plausible as the conditioning set grows), the vine structure mainly affects tree $T_1$ and $T_2$.

C-vine and D-vine are special cases because their tree structure is regular — no need for a general R-vine matrix — and their h-function recursions follow a simple pattern that is easy to implement and interpret.

## Main Content

> [!definition] D-vine (drawable vine / path vine)
> In a **D-vine** on $N$ variables ordered as $1, 2, \ldots, N$:
>
> **Tree $T_1$:** Edges form a path (chain): $\{1,2\},\{2,3\},\ldots,\{N-1,N\}$. These are the $N-1$ **unconditional** bivariate copulas $c_{j,j+1}$.
>
> **Tree $T_2$:** Nodes are the edges of $T_1$; edges connect overlapping pairs: $\{1,3|2\},\{2,4|3\},\ldots,\{N-2,N|N-1\}$. Copulas: $c_{j,j+2|j+1}$, each conditioned on the single "middle" variable.
>
> **Tree $T_k$ (general):** Edges are $\{j, j+k | j+1,\ldots,j+k-1\}$ for $j=1,\ldots,N-k$. The conditioning set always consists of the $k-1$ variables "between" $j$ and $j+k$ in the chain ordering.
>
> **Density:**
> $$f(\mathbf{x}) = \prod_{k=1}^N f_k(x_k)\cdot\prod_{i=1}^{N-1}\prod_{j=1}^{N-i} c_{j,j+i|\{j+1,\ldots,j+i-1\}}(v^{(i)}_{j},\; v^{(i)}_{j+i})$$
>
> where $v^{(1)}_j = F_j(x_j)$ and $v^{(i+1)}_j = h(v^{(i)}_j | v^{(i)}_{j+1}; \theta_{j,j+1|\ldots})$ (h-function applied sequentially along the chain).
>
> **Interpretation:** Variables connected in the first tree are the "most dependent" pairs. The D-vine is appropriate when dependence has a **temporal or spatial ordering** (each variable most directly depends on its neighbors in the sequence).
> ^def-dvine

> [!definition] C-vine (canonical vine / star vine)
> In a **C-vine** on $N$ variables with root sequence $r_1, r_2, \ldots, r_{N-1}$:
>
> **Tree $T_1$:** Variable $r_1$ is connected to all others: edges $\{r_1, j\}$ for $j \neq r_1$. These are $N-1$ unconditional bivariate copulas $c_{r_1,j}$.
>
> **Tree $T_2$:** Variable $r_2$ (from the remaining $N-1$ variables) is the new hub, now conditioned on $r_1$: edges $\{r_2, j|r_1\}$ for $j \neq r_1, r_2$. Copulas: $c_{r_2,j|r_1}$.
>
> **Tree $T_k$:** The hub is $r_k$, conditioned on $\{r_1,\ldots,r_{k-1}\}$: edges $\{r_k, j|r_1,\ldots,r_{k-1}\}$.
>
> **Density:**
> $$f(\mathbf{x}) = \prod_{k=1}^N f_k(x_k)\cdot\prod_{i=1}^{N-1}\prod_{j \notin \{r_1,\ldots,r_i\}} c_{r_i,j|\{r_1,\ldots,r_{i-1}\}}(F_{r_i|\{r_1,\ldots,r_{i-1}\}},\; F_{j|\{r_1,\ldots,r_{i-1}\}})$$
>
> **Interpretation:** The C-vine is appropriate when **one variable governs dependence among all others** — e.g. an equity index driving all stock returns, an interest rate driving yield-curve factors, or a macroeconomic variable driving regional consumption. The root variable $r_1$ should be the variable with the highest average pairwise Kendall $|\tau|$ with all others.
> ^def-cvine

> [!definition] Comparing C-vine and D-vine: topology and h-function pattern
>
> | Property | D-vine | C-vine |
> |---|---|---|
> | Tree $T_1$ shape | Path (chain) | Star (hub-and-spoke) |
> | Variables in $T_1$ | Adjacent pairs $(j, j+1)$ | Hub $r_1$ with all others |
> | Conditioning set growth | "Middle" variables in chain | Cumulative hub set |
> | Best for | Sequential/temporal data | Hub-driven dependence |
> | Identification of hub | Not needed | Choose by max avg $|\tau|$ |
> | h-function pattern | One h-function per step along chain | All h-functions through hub |
>
> **A key difference in h-function cost:** In the C-vine, the same h-function argument $F_{r_i|\{r_1,\ldots,r_{i-1}\}}$ is reused for all pairs involving the $i$-th hub — it is computed once per tree level and shared. In the D-vine, each edge requires its own h-function computation with no reuse. C-vines can therefore be faster to evaluate when $N$ is large and a hub structure is appropriate.
> ^def-comparison

> [!definition] Selecting the optimal D-vine ordering
> For a D-vine, the ordering of variables in the chain determines which pairs appear in $T_1$ (unconditional) vs higher trees (conditional). Since the unconditional copulas carry the most parameter information, pair the most strongly dependent variables in $T_1$.
>
> **Optimal ordering heuristic (Aas et al. 2009):** Arrange variables so that the **sum of absolute pairwise Kendall $\tau$** in tree $T_1$ is maximised. For a chain $1-2-3-\ldots-N$, this means finding the Hamiltonian path through the complete graph of variables that maximises the sum of edge weights $|\hat\tau_{ij}|$. For small $N$ this is solved by exhaustive search; for large $N$ use a greedy nearest-neighbor approach or the minimum spanning tree heuristic.
>
> **For C-vines:** The root variable $r_1$ should be the variable with the highest $\sum_j |\hat\tau_{r_1,j}|$ (average dependence with all others). Each subsequent root $r_k$ is chosen to maximise the sum of conditional Kendall $\tau$ in the remaining tree.
> ^def-selection

## Examples

> [!example] Four-variable D-vine (N=4)
> Ordering: $1-2-3-4$. Trees:
>
> **$T_1$ (3 edges):** $(1,2),\; (2,3),\; (3,4)$ — bivariate copulas $c_{12}, c_{23}, c_{34}$.
>
> **$T_2$ (2 edges):** $(1,3|2),\; (2,4|3)$ — bivariate copulas $c_{13|2}, c_{24|3}$.
> - Arguments: $h(F_1|F_2;\theta_{12})$ and $h(F_3|F_2;\theta_{23})$ for $(1,3|2)$.
> - Arguments: $h(F_2|F_3;\theta_{23})$ and $h(F_4|F_3;\theta_{34})$ for $(2,4|3)$.
>
> **$T_3$ (1 edge):** $(1,4|2,3)$ — bivariate copula $c_{14|23}$.
> - Arguments: $h(v_{1|2}|v_{3|2};\theta_{13|2})$ and $h(v_{4|3}|v_{2|3};\theta_{24|3})$ — two further h-function applications.
>
> **Total:** 6 bivariate copulas = $4\times3/2$.

> [!example] Four-variable C-vine with hub variable 1 (N=4)
> Root sequence: $r_1=1,\; r_2=2$.
>
> **$T_1$ (3 edges):** $(1,2),\; (1,3),\; (1,4)$ — bivariate copulas $c_{12}, c_{13}, c_{14}$.
>
> **$T_2$ (2 edges):** $(2,3|1),\; (2,4|1)$ — bivariate copulas $c_{23|1}, c_{24|1}$.
> - Arguments: $h(F_2|F_1;\theta_{12}),\; h(F_3|F_1;\theta_{13}),\; h(F_4|F_1;\theta_{14})$ — all using variable 1 as conditioner.
>
> **$T_3$ (1 edge):** $(3,4|1,2)$ — bivariate copula $c_{34|12}$.
> - Arguments: $h(v_{3|1}|v_{2|1};\theta_{23|1})$ and $h(v_{4|1}|v_{2|1};\theta_{24|1})$.
>
> **Interpretation:** If variable 1 is a market index, $T_1$ directly captures how each stock co-moves with the index; $T_2$ captures residual co-movement between stocks after removing the index effect; $T_3$ captures any residual between stocks 3 and 4 not explained by the index and stock 2.

## Connections

- [[Vine Copulas - Overview]] — the general pair-copula construction they instantiate.
- [[Pair-Copula Decomposition]] — the h-function recursion that both C-vine and D-vine use.
- [[Regular Vine Copulas]] — how C-vine and D-vine embed as special cases of the general Bedford-Cooke R-vine.
- [[Vine Copula Estimation and Model Selection]] — how tree-by-tree sequential estimation works for both structures.
- [[Factor Copulas - Overview]] — contrasting architecture: factor copula imposes equidependence via a latent variable rather than a vine structure.
- [[Multi-Factor and Block Dependence Structures]] — block equidependence in factor copulas is analogous to choosing a block-structured vine.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is used to choose the vine ordering.

## See Also

- Aas et al. (2009), *Insurance: Mathematics and Economics*, 44(2), 182–198 — original C-vine and D-vine treatment.
- Czado (2019), *Analyzing Dependent Data with Vine Copulas*, Springer — comprehensive reference.
- [[_Index|Dependence Modeling]]
- [[../_Index|Econometrics]]
