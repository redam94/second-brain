---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Synthesis-Survey.md]]"
source_location: "Sec. 4; Aas et al. (2009) §2.2–2.3; Czado (2010) §3–4"
date_ingested: 2026-07-29
date_updated: 2026-07-29
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine tree structure
  - R-vine matrix
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** and **D-vine** are the two most tractable special cases of the general regular vine (R-vine). They differ in how the pair copulas are arranged across trees: a C-vine uses a star graph (one variable at the centre of each tree), while a D-vine uses a path graph (variables in a chain). Both are closed-form special cases of the R-vine density. Their appropriate choice is data-driven: C-vines suit settings with a dominant driving variable; D-vines suit sequentially ordered variables. The R-vine matrix is the standard compact representation encoding any vine structure for software.

## Overview

Both C-vine and D-vine are special cases of a **regular vine** — a sequence of trees satisfying the proximity condition (see [[Vine Copulas - Overview]]^def-rvine). They differ only in the **topology of each tree** in the sequence.

For $d$ variables:
- A **C-vine** has $d-1$ trees, tree $k$ being a star with root $\pi_k$. Total pair copulas: $d(d-1)/2$.
- A **D-vine** has $d-1$ trees, each a path of $d-k$ edges. Total pair copulas: $d(d-1)/2$.

Both have the same total number of pair copulas as any other R-vine. The trees determine which pairs are at which levels (direct vs conditional) — not how many pair copulas there are.

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-vine structure (Aas et al. 2009, Def. 2)
> A **C-vine** with variable order $(\pi_1,\ldots,\pi_d)$ has the following tree structure:
>
> - $T_1$: star graph — $\pi_1$ is the root, connected to $\pi_2,\ldots,\pi_d$ ($d-1$ edges)
> - $T_2$: star graph — $\pi_2$ is the root, connected to $\pi_3,\ldots,\pi_d$ conditional on $\pi_1$ ($d-2$ edges)
> - $T_k$: star graph — $\pi_k$ is the root, connected to $\pi_{k+1},\ldots,\pi_d$ conditional on $\pi_1,\ldots,\pi_{k-1}$ ($d-k$ edges)
>
> The resulting density (setting $u_j = F_j(x_j)$, $v_{j|\pi_1\cdots\pi_{k-1}} = F(x_j|x_{\pi_1},\ldots,x_{\pi_{k-1}})$ computed via h-functions):
> $$f(x_1,\ldots,x_d) = \prod_{j=1}^d f_j(x_j) \cdot \prod_{k=1}^{d-1}\prod_{i=k+1}^d c_{\pi_k,\pi_i|\pi_1,\ldots,\pi_{k-1}}\!\left(v_{\pi_k|\pi_1\cdots\pi_{k-1}},\, v_{\pi_i|\pi_1\cdots\pi_{k-1}}\right)$$
>
> **Interpretation:** In each tree, variable $\pi_k$ is the "hub" whose conditional pairs with all other variables are specified. The C-vine is natural when one variable ($\pi_1$, the $T_1$ root) has a dominant role: a market index, disease severity, spatial centroid, or latent factor analogue.
>
> **Structure selection:** Choose $\pi_1$ as the variable with the largest sum of pairwise $|\hat\tau_{ij}|$ (most "connected" variable); proceed greedily at each subsequent level.
^def-cvine

> [!example] C-vine for $d=4$, root order $(1,2,3,4)$
> **Tree $T_1$ (star centred on 1):** Edges $\{1,2\},\{1,3\},\{1,4\}$. Pair copulas: $c_{12}, c_{13}, c_{14}$.
>
> **Tree $T_2$ (star centred on 2, conditional on 1):** Edges $\{2,3|1\},\{2,4|1\}$. Pair copulas: $c_{23|1}, c_{24|1}$.
> - Arguments: $(h_{2|1}(u_2,u_1),\, h_{3|1}(u_3,u_1))$ for $c_{23|1}$ and $(h_{2|1}(u_2,u_1),\, h_{4|1}(u_4,u_1))$ for $c_{24|1}$.
>
> **Tree $T_3$ (one edge, conditional on 1,2):** Edge $\{3,4|12\}$. Pair copula: $c_{34|12}$.
> - Arguments: $(h_{3|2,1}(v_{3|1},v_{2|1}),\, h_{4|2,1}(v_{4|1},v_{2|1}))$.
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}\cdot c_{13}\cdot c_{14}\cdot c_{23|1}\cdot c_{24|1}\cdot c_{34|12}$$
^ex-cvine-d4

### D-Vine (Drawable Vine)

> [!definition] D-vine structure (Aas et al. 2009, Def. 3)
> A **D-vine** with variable order $(\pi_1,\ldots,\pi_d)$ has the following tree structure:
>
> - $T_1$: path — $\pi_1-\pi_2-\pi_3-\cdots-\pi_d$ ($d-1$ edges: $\{\pi_i,\pi_{i+1}\}$ for $i=1,\ldots,d-1$)
> - $T_2$: path — edges $\{\pi_i,\pi_{i+2}|\pi_{i+1}\}$ for $i=1,\ldots,d-2$ ($d-2$ edges)
> - $T_k$: path — edges $\{\pi_i,\pi_{i+k}|\pi_{i+1},\ldots,\pi_{i+k-1}\}$ for $i=1,\ldots,d-k$
>
> The resulting density:
> $$f(x_1,\ldots,x_d) = \prod_{j=1}^d f_j(x_j) \cdot \prod_{j=1}^{d-1}\prod_{i=1}^{d-j} c_{\pi_i,\pi_{i+j}|\pi_{i+1},\ldots,\pi_{i+j-1}}\!\left(v_{\pi_i|\pi_{i+1}\cdots\pi_{i+j-1}},\, v_{\pi_{i+j}|\pi_{i+1}\cdots\pi_{i+j-1}}\right)$$
>
> **Interpretation:** Tree $T_1$ links consecutive variable pairs; $T_2$ links "two-apart" pairs conditional on the middle variable; $T_k$ links variables $k$ positions apart in the ordering conditional on all intermediate variables. The D-vine imposes a Markov-like structure: if the pair copulas at level $k+1$ and above are set to independence, the result is a $(k)$-th order Markov chain for the conditionals.
>
> **D-vine quantile regression** (Kraus & Czado 2017): place $Y$ as the last variable in the D-vine ordering $(\pi_1=X_1,\ldots,\pi_{d-1}=X_{d-1},\pi_d=Y)$. The conditional $F(y|x_1,\ldots,x_{d-1})$ is then the output of a sequence of h-function evaluations — the D-vine provides a flexible, copula-based conditional distribution from which any quantile can be inverted.
^def-dvine

> [!example] D-vine for $d=4$, order $(1,2,3,4)$
> **$T_1$ (path $1-2-3-4$):** Edges $\{1,2\},\{2,3\},\{3,4\}$. Pair copulas: $c_{12},c_{23},c_{34}$.
>
> **$T_2$ (path of length 2):** Edges $\{1,3|2\},\{2,4|3\}$. Pair copulas: $c_{13|2},c_{24|3}$.
> - $c_{13|2}$ arguments: $(h_{1|2}(u_1,u_2),\, h_{3|2}(u_3,u_2))$
> - $c_{24|3}$ arguments: $(h_{2|3}(u_2,u_3),\, h_{4|3}(u_4,u_3))$
>
> **$T_3$ (single edge):** Edge $\{1,4|2,3\}$. Pair copula: $c_{14|23}$.
> - Arguments: $(h_{1|3,2}(v_{1|2},v_{3|2}),\, h_{4|2,3}(v_{4|3},v_{2|3}))$
>
> **Density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12}\cdot c_{23}\cdot c_{34}\cdot c_{13|2}\cdot c_{24|3}\cdot c_{14|23}$$
^ex-dvine-d4

### R-Vine Matrix Representation

> [!definition] R-vine matrix (Dißmann et al. 2013, Def. 3)
> Any R-vine structure can be encoded as a lower-triangular $d\times d$ matrix $M = (m_{ij})$ with $i \geq j$. Rows and columns correspond to a variable ordering. The matrix is read from bottom to top and left to right to recover the vine structure:
>
> - **Diagonal entries** $m_{jj}$: the root/focal variable for column $j$
> - **Off-diagonal entries** $m_{ij}$ ($i > j$): the conditioning variable added at tree $i-j$
>
> For a D-vine with order $(1,2,3,4)$, the R-vine matrix is:
> $$M = \begin{pmatrix}1 & & & \\ 2 & 2 & & \\ 3 & 3 & 3 & \\ 4 & 4 & 4 & 4\end{pmatrix}$$
> This compact representation is used by `VineCopula` and `rvinecopulib` R packages.
^def-rvine-matrix

### Software

| Package | Language | Key functions |
|---------|----------|--------------|
| `VineCopula` | R | `RVineStructureSelect`, `RVineCopSelect`, `RVineSim`, `RVineLogLik`, `RVineSeqEst` |
| `rvinecopulib` | R | `vinecop`, `rvine_structure`, `simulate.vinecop_dist` |
| `pyvinecopulib` | Python | `Vinecop`, `Bicop`, `simulate`, `loglik` |

Selecting a C-vine in `VineCopula`: set `type=1` in `RVineStructureSelect`. D-vine: set `type=2`.

## Connections

- [[Vine Copulas - Overview]] — definition of regular vines and the overall pair-copula decomposition
- [[Pair-Copula Construction]] — the h-function recursion and density formula underlying both C-vine and D-vine
- [[Vine Copula Estimation and Selection]] — Dißmann et al. (2013) greedy structure-selection algorithm
- [[Copula Architecture Comparison]] — when to choose C-vine vs D-vine vs R-vine vs factor copula

## See Also

- [[Factor Copulas - Overview]] — the competing O(d) param model; compare tree structure to latent factor structure
- [[Dependence Measures for Copulas]] — Kendall's tau is the weight used in maximum spanning tree selection of vine trees
- [[Multi-Factor and Block Dependence Structures]] — factor copula analogue of the C-vine (market factor + industry blocks)
- [[../_Index|Dependence Modeling]]
