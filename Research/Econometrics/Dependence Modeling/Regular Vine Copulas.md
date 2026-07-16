---
title: Regular Vine Copulas
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Part 2 (Bedford & Cooke 2002); Part 3 (Dißmann et al. 2013)"
date_ingested: 2026-07-16
date_updated: 2026-07-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Decomposition]]"
  - "[[C-vine and D-vine Structures]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - R-vine
  - regular vine
  - Bedford-Cooke vine
  - vine graph
  - R-vine matrix
---

# Regular Vine Copulas

> [!summary]
> A **regular vine** (R-vine), introduced by Bedford & Cooke (2002), is the most general vine copula structure: a sequence of $N-1$ trees where each tree's nodes are the previous tree's edges, and any two connected nodes share exactly one element in their conditioning sets (the **proximity condition**). C-vines and D-vines are special cases. The vine is encoded as an $N\times N$ **structure matrix** $M$, which determines which bivariate copula occupies each position and what conditioning sets are used. Dißmann et al. (2013) showed how to select the optimal R-vine structure by greedy maximum spanning tree search on dependence-weighted graphs.

## Overview

For $N \ge 4$, C-vine and D-vine are not the only valid vine structures. A regular vine allows any topology that satisfies the proximity condition — giving enormous flexibility in how the bivariate building blocks are arranged. This matters because the optimal structure varies by application: a financial dataset might have one sector acting as a hub (C-vine) for some stocks and chain-like dependencies among others.

The R-vine framework unifies C-vine, D-vine, and all intermediate cases under one consistent mathematical object. In software (`VineCopula` in R, `pyvinecopulib` in Python), all vine structures are stored as R-vine matrices, with C-vine and D-vine as degenerate cases.

## Main Content

> [!definition] Vine (nested tree sequence)
> A **vine** $\mathcal{V}$ on $N$ variables is a set of $N-1$ trees $\{T_1, T_2, \ldots, T_{N-1}\}$ satisfying:
> 1. $T_1 = (N_1, E_1)$ has nodes $N_1 = \{1,\ldots,N\}$ and edges $E_1$; the graph is a connected spanning tree (no cycles, $N-1$ edges).
> 2. For $i \ge 2$: the nodes of $T_i$ are the **edges of $T_{i-1}$** ($N_i = E_{i-1}$), and $T_i$ itself is a connected spanning tree on these nodes.
> 3. (**Proximity condition**) Two nodes $e, f \in N_i = E_{i-1}$ can be connected by an edge in $T_i$ only if the corresponding edges of $T_{i-1}$ share a node (i.e. $|e \cap f| = 1$ as sets of variable indices).
>
> A vine satisfying all three is a **regular vine** (Bedford & Cooke 2002). The total number of edges across all trees is $\frac{N(N-1)}{2}$ — one for each bivariate copula building block.
> ^def-vine

> [!definition] Conditioned and conditioning sets
> For any edge $e = \{a, b\}$ in $T_i$ (where $a, b$ are edges of $T_{i-1}$, and therefore sets of variable indices themselves):
> - **Complete union:** $U_e = a \cup b$ — all variables involved in this edge.
> - **Conditioning set:** $D_e = a \cap b$ — variables shared by the two endpoints (inherited from $T_{i-1}$); $|D_e| = i-1$ for all edges in $T_i$.
> - **Conditioned set:** $\{j(e), k(e)\} = U_e \setminus D_e$ — the two variables whose pairwise copula is modelled at this edge; $|\{j(e),k(e)\}| = 2$ always.
>
> The bivariate copula at edge $e$ models the residual dependence between $X_{j(e)}$ and $X_{k(e)}$ after conditioning on $\mathbf{X}_{D_e}$. The conditioning set $D_e$ grows by one at each tree level, so tree $T_i$ has conditioning sets of size $i-1$.
> ^def-condset

> [!definition] R-vine structure matrix (Dißmann et al. 2013)
> A regular vine on $N$ variables can be encoded in a lower-triangular $N\times N$ integer matrix $M = (m_{ij})_{i \ge j}$ where:
> - **Diagonal:** $m_{jj} = j$ (column $j$ is "owned by" variable $j$).
> - **Column $j$, row $i > j$:** $m_{ij}$ is the variable paired with $j$ at tree level $i - j$, conditioned on the variables $\{m_{j+1,j}, m_{j+2,j}, \ldots, m_{i-1,j}\}$ listed in the column above $m_{ij}$.
>
> **Reading the matrix:** Column $j$ (from bottom to top) traces the vine "spine" anchored at variable $j$:
> - Row $j$ (diagonal): variable $j$ itself.
> - Row $j+1$: the variable directly paired with $j$ in $T_1$ — gives the unconditional copula $c_{j, m_{j+1,j}}$.
> - Row $j+2$: paired with $j$ in $T_2$, conditioned on $m_{j+1,j}$ — gives $c_{j, m_{j+2,j} | m_{j+1,j}}$.
> - Row $j+k$: gives the copula in tree $T_k$, with conditioning set $\{m_{j+1,j},\ldots,m_{j+k-1,j}\}$.
>
> **C-vine matrix example (N=4, root 1):**
> $$M = \begin{pmatrix} 1 & & & \\ 1 & 2 & & \\ 1 & 1 & 3 & \\ 2 & 3 & 4 & 4 \end{pmatrix}$$
> Reading column 4 bottom-to-top: variable 4 is paired with 2 (unconditional, $T_1$), then with 3|{2}, then with 1|{2,3}.
>
> **D-vine matrix example (N=4, order 1-2-3-4):**
> $$M = \begin{pmatrix} 1 & & & \\ 2 & 2 & & \\ 3 & 3 & 3 & \\ 4 & 4 & 4 & 4 \end{pmatrix}$$
> Reading column 4 bottom-to-top: variable 4 paired with 3 ($T_1$), then 2|{3} ($T_2$), then 1|{2,3} ($T_3$).
> ^def-matrix

> [!theorem] Bedford-Cooke density theorem
> Let $\mathcal{V} = \{T_1,\ldots,T_{N-1}\}$ be a regular vine on variables $\{1,\ldots,N\}$. Under the simplifying assumption, the joint density is:
> $$f(x_1,\ldots,x_N) = \prod_{k=1}^N f_k(x_k) \cdot \prod_{i=1}^{N-1}\prod_{e\in E_i} c_{j(e),k(e)|D(e)}\!\left(F_{j(e)|D(e)}(x_{j(e)}|\mathbf{x}_{D(e)}),\; F_{k(e)|D(e)}(x_{k(e)}|\mathbf{x}_{D(e)})\right)$$
> **Proof (sketch):** Induction on $N$ using the chain rule for conditional densities. For any node $j$ in $T_1$, write $f(\mathbf{x}) = f_j(x_j) \cdot f(\mathbf{x}_{-j}|x_j)$. Apply bivariate Sklar to factor $f_{j,k}$ for each neighbor $k$ of $j$ in $T_1$, then recurse into the conditional density $f(\mathbf{x}_{-j}|x_j)$ using the $N-1$-dimensional vine $\mathcal{V}^{(-j)}$ induced on the remaining variables with $x_j$ in the conditioning set. The proximity condition ensures this residual is itself a valid vine. $\square$
>
> **Consequence:** Any valid R-vine matrix determines a valid multivariate density. The number of valid R-vines on $N$ nodes is $\frac{N!}{2}\cdot 2^{N(N-1)/2-N+1}$ (Bedford & Cooke 2002) — astronomical for $N \ge 5$, motivating structure selection algorithms.
> ^thm-bdcooke

## Examples

> [!example] An R-vine that is neither C-vine nor D-vine (N=5)
> Consider a vine where $T_1$ is the path $1-2-3-4-5$ (D-vine pattern) but $T_2$ has a star rooted at node $(2,3)$:
> - $T_1$ edges: $(1,2),(2,3),(3,4),(4,5)$.
> - $T_2$ nodes = $T_1$ edges; a possible $T_2$: $(1,3|2)$ connected to $(2,4|3)$, $(2,4|3)$ connected to $(3,5|4)$, plus $(1,4|{2,3})$ — this would need to satisfy the proximity condition.
>
> Regular vines that are neither C-vine nor D-vine arise naturally when the maximum-spanning-tree algorithm is applied to data: some variables may form a local hub while others follow a chain pattern. The `VineCopula` R package and `pyvinecopulib` handle arbitrary R-vine matrices.

## Connections

- [[Vine Copulas - Overview]] — the general pair-copula construction; R-vines are its fully general instantiation.
- [[Pair-Copula Decomposition]] — the density formula and h-function recursion that R-vines organize.
- [[C-vine and D-vine Structures]] — special cases that are easier to interpret and implement.
- [[Vine Copula Estimation and Model Selection]] — the Dißmann et al. (2013) greedy spanning tree algorithm for selecting the R-vine structure.
- [[Factor Copulas - Overview]] — alternative modelling approach: the factor copula avoids vine selection entirely by imposing an (equi-)dependence structure via a latent variable.
- [[Multi-Factor and Block Dependence Structures]] — the block equidependence factor copula has structural parallels to a block-structured R-vine.

## See Also

- Bedford & Cooke (2002), *Annals of Statistics*, 30(4), 1031–1068 — foundational vine graph paper.
- Dißmann, Brechmann, Czado & Kurowicka (2013), *Computational Statistics & Data Analysis*, 59, 52–69 — R-vine structure selection; arXiv:1202.2002.
- Czado (2019), *Analyzing Dependent Data with Vine Copulas*, Springer — Chapter 4: R-vine matrices.
- [[_Index|Dependence Modeling]]
- [[../_Index|Econometrics]]
