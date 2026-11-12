---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Sources.md]]"
source_location: "Bedford & Cooke (2002), Defs. 3.1–3.4; Aas et al. (2009), Secs. 2.2–2.3"
date_ingested: 2026-11-12
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Decomposition Theorem]]"
used_by:
  - "[[Vine Copula Estimation]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine structure
  - D-vine structure
  - regular vine R-vine
  - vine tree structure
---

# C-Vine and D-Vine Structures

> [!summary]
> **D-vines** (drawable vines) and **C-vines** (canonical vines) are the two most tractable special cases of regular vines (R-vines). In a D-vine, every tree is a **path graph**: each node has at most two edges, so dependence is propagated "along a chain." In a C-vine, every tree is a **star graph**: a single root node connects to all others, making root-node dependence the first-order structure. Both are R-vines with a fixed tree structure; the R-vine nests both and allows any spanning tree at each stage. For $n$ variables there are $n!/2$ D-vine orderings and $n!/2$ C-vine root-node choices (up to reflection/permutation).

## Overview

A vine is a **sequence of nested trees** $T_1, T_2, \ldots, T_{n-1}$ satisfying a **proximity condition**: an edge in tree $T_{k+1}$ is allowed only if the two nodes it connects share exactly one element in their conditioning sets. This condition ensures the pair copulas in each tree condition on exactly the right set of variables, maintaining a coherent joint density factorisation.

The D-vine and C-vine differ in the **shape of each tree**:
- **D-vine:** Every tree $T_k$ is a **path** (a chain graph). The node with the highest degree in any tree has degree two (or one at the endpoints).
- **C-vine:** Every tree $T_k$ is a **star**. One root node connects to all $n-k$ other nodes in $T_k$.

## Main Content

> [!definition] Regular vine (R-vine) — Bedford & Cooke (2002)
> A **regular vine** on $n$ variables is a sequence of linked trees $\mathcal{V} = (T_1, T_2, \ldots, T_{n-1})$ satisfying:
> 1. **Tree structure:** $T_1$ has $n$ nodes (the variables $\{1,\ldots,n\}$) and $n-1$ edges; tree $T_k$ has $n-k+1$ nodes (the edges of $T_{k-1}$) and $n-k$ edges.
> 2. **Proximity condition:** For any two nodes $e = (j,k;\mathbf{D})$ and $f = (\ell,m;\mathbf{E})$ in $T_{k+1}$ sharing an edge in $T_{k+1}$, the conditioned sets satisfy $|\{j,k\} \cap \{\ell,m\}| = 1$ — the two edges in $T_k$ share exactly one endpoint (variable).
>
> The proximity condition ensures that conditioning sets grow consistently and the factorisation is valid. Any spanning tree on $n-1$ edges that satisfies the proximity condition at each level defines a valid R-vine structure.
^def-rvine

> [!definition] D-vine (drawable vine)
> A **D-vine** is an R-vine where every tree $T_k$ is a **path graph** — each node has degree at most 2. This means no variable acts as a "hub" connecting many others; instead variables are ordered in a chain $1-2-\cdots-n$ and dependence is "along" the chain.
>
> **Tree $T_1$ (path):** Edges $\{1,2\}, \{2,3\}, \ldots, \{n-1,n\}$. The $n-1$ pair copulas are $c_{12}, c_{23}, \ldots, c_{n-1,n}$.
>
> **Tree $T_2$ (path of length $n-2$):** Nodes are the edges of $T_1$; edges connect consecutive $T_1$-edges. Edge between $\{j,j+1\}$ and $\{j+1,j+2\}$ gives pair copula $c_{j,j+2|j+1}$, conditioned on the common variable $j+1$.
>
> For $n=4$, the D-vine on ordering 1-2-3-4 has:
> - $T_1$: edges $\{12\}, \{23\}, \{34\}$ → pair copulas $c_{12}, c_{23}, c_{34}$
> - $T_2$: edges $\{13;2\}, \{24;3\}$ → pair copulas $c_{13|2}, c_{24|3}$
> - $T_3$: edge $\{14;23\}$ → pair copula $c_{14|23}$
>
> **Total pair copulas:** $n(n-1)/2$; for $n=4$, six pair copulas with 6 parameters (1 per Gaussian pair copula).
^def-dvine

> [!definition] C-vine (canonical vine)
> A **C-vine** is an R-vine where every tree $T_k$ is a **star graph** — there is a unique **root node** connecting to all $n-k$ other nodes in $T_k$. The root node selection determines the vine structure, and should be chosen to maximise fit (e.g., the variable with the highest sum of squared Kendall's $\tau$ with all others is a natural root for $T_1$).
>
> **Tree $T_1$ (star with root $r_1$):** Edges $\{r_1,1\}, \{r_1,2\}, \ldots, \{r_1,n\} \setminus \{r_1,r_1\}$. Pair copulas are $c_{r_1,j}$ for all $j \ne r_1$.
>
> **Tree $T_2$ (star with root $r_2$):** Nodes are the $n-1$ edges of $T_1$; edge between $\{r_1,r_2\}$ and $\{r_1,j\}$ gives pair copula $c_{r_2,j|r_1}$ for all $j \ne r_1, r_2$.
>
> For $n=4$ with roots $r_1=1, r_2=2, r_3=3$:
> - $T_1$: edges $\{12\}, \{13\}, \{14\}$ → pair copulas $c_{12}, c_{13}, c_{14}$
> - $T_2$: edges $\{23;1\}, \{24;1\}$ → pair copulas $c_{23|1}, c_{24|1}$
> - $T_3$: edge $\{34;12\}$ → pair copula $c_{34|12}$
>
> **Interpretation:** The root variable $r_1$ is modelled as the "common driver" of all others in $T_1$ — analogous to the latent factor in a factor copula, but explicit and observable.
^def-cvine

> [!definition] Comparison: D-vine vs C-vine vs R-vine
>
> | Property | D-vine | C-vine | R-vine |
> |---|---|---|---|
> | **Tree shape** | Path | Star | Any spanning tree |
> | **Max degree** in any tree | 2 | $n-1$ (root) | Unrestricted |
> | **Number of distinct structures** | $n!/2$ orderings | $n!/2$ root sequences | $\text{much larger}$ |
> | **Recommended when** | Dependence is "chain-like" (time series, spatial lag) | One variable drives all others (a "risk factor") | No structural prior; use AIC/BIC |
> | **Computation** | $O(n^2)$ h-function evaluations | $O(n^2)$ h-function evaluations | $O(n^2)$ h-function evaluations |
> | **Model selection** | Choose ordering $\pi$ | Choose root sequence $(r_1,\ldots,r_{n-1})$ | Choose full tree sequence |
^def-comparison

> [!definition] Structure selection heuristic (Dissmann et al. 2013)
> A popular heuristic for R-vine structure selection chooses the tree at each stage to **maximize the sum of absolute Kendall's $\tau$** over all edges. This is a maximum spanning tree problem solvable in $O(n^2 \log n)$ with Prim's or Kruskal's algorithm, using empirical Kendall's $\tau$ as edge weights.
>
> For C-vine, a simpler heuristic: at each stage, choose as root the variable with the **largest sum of squared Kendall's $\tau$** to all currently unrooted variables. For D-vine, choose the ordering that places the most correlated consecutive pairs first.
^def-structure-selection

## Examples

> [!example] Five-variable D-vine and C-vine
> **D-vine on 5 variables (ordering 1-2-3-4-5):** 4 trees, 10 pair copulas total.
> - $T_1$: 4 edges — $c_{12}, c_{23}, c_{34}, c_{45}$
> - $T_2$: 3 edges — $c_{13|2}, c_{24|3}, c_{35|4}$
> - $T_3$: 2 edges — $c_{14|23}, c_{25|34}$
> - $T_4$: 1 edge — $c_{15|234}$
>
> **C-vine on 5 variables (roots 1, 2, 3, 4):**
> - $T_1$: 4 edges (root=1) — $c_{12}, c_{13}, c_{14}, c_{15}$
> - $T_2$: 3 edges (root=2, all conditioned on 1) — $c_{23|1}, c_{24|1}, c_{25|1}$
> - $T_3$: 2 edges (root=3, conditioned on $\{1,2\}$) — $c_{34|12}, c_{35|12}$
> - $T_4$: 1 edge (root=4, conditioned on $\{1,2,3\}$) — $c_{45|123}$
>
> **Observation:** Both structures have $5 \times 4/2 = 10$ pair copulas. The D-vine has each conditioning set grow by one variable per tree; the C-vine has tree $T_k$ conditioning on $k-1$ variables (the previous roots).

> [!example] Choosing between D-vine and C-vine for financial returns
> **Context:** Modelling 4 equity return series with pairwise Kendall's $\tau$ matrix:
> $$ \tau = \begin{pmatrix} 1 & 0.60 & 0.55 & 0.52 \\ & 1 & 0.40 & 0.38 \\ & & 1 & 0.35 \\ & & & 1 \end{pmatrix} $$
> Variable 1 has the highest sum of $|\tau|$ with others (0.60+0.55+0.52=1.67). This suggests using **variable 1 as root in a C-vine**: its pair copulas $c_{12}, c_{13}, c_{14}$ each capture strong first-order dependence, and after conditioning on variable 1, the remaining correlations are weaker. If instead the data exhibited a lag structure (each variable influences the next), a **D-vine ordering 1-2-3-4** would be more natural.

## Connections

- [[Vine Copulas - Overview]] — the high-level context, the architecture comparison table (factor vs vine), and position in the literature.
- [[Pair-Copula Decomposition Theorem]] — the density factorisation formula that depends on the vine structure specified here; h-function recursion for computing pseudo-observations up the vine.
- [[Vine Copula Estimation]] — how structure selection (this note) feeds into estimation: sequential MLE fits pair copulas tree by tree once the structure is fixed.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, the statistic used in the structure-selection heuristic above.
- [[Factor Copula Construction]] — in a C-vine, the root variable plays a role analogous to the latent factor; the C-vine makes this "factor" explicit and observable at the cost of modelling $n-1$ bivariate copulas.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — block-equidependence factor copula; conceptually similar to a C-vine where the root is a latent factor.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — Oh & Patton (2012) used a 8-factor block copula for 100 variables rather than a vine because vine model selection becomes infeasible at $N=100$.
- [[Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
