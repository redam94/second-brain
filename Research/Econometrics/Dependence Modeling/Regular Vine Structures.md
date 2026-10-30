---
title: "Regular Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/vine-copula-references.md]]"
source_location: "Bedford & Cooke (2002) §2-4; Aas et al. (2009) §2"
date_ingested: 2026-10-30
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
  - vine structure
  - proximity condition
---

# Regular Vine Structures

> [!summary]
> A **regular vine** on $d$ variables is a sequence of $d-1$ trees $T_1, T_2, \dots, T_{d-1}$ where each tree is a connected spanning graph, the nodes of $T_\ell$ are the edges of $T_{\ell-1}$, and adjacent edges in one tree share exactly one node (**proximity condition**). Each edge $e$ in $T_\ell$ is labeled with a bivariate copula $c_{j(e),k(e)|\mathbf{D}(e)}$ for the pair $(j(e), k(e))$ conditioned on the set $\mathbf{D}(e)$ determined by the tree structure. The two most-used special cases are the **C-vine** (star/hub trees) and the **D-vine** (path/chain trees).

## Overview

The vine graphical structure organises the $d(d-1)/2$ pairwise copula terms in the factorization (see [[Vine Copulas - Overview]], ^def-density) into a coherent hierarchy. The first tree $T_1$ captures the strongest pairwise dependencies (unconditional); each successive tree $T_\ell$ captures pairwise dependence *after conditioning* on the variables in the edges' conditioning sets. The tree sequence determines which pairs appear at each level and what their conditioning sets are — and therefore which $d(d-1)/2$ bivariate copulas must be estimated.

## Main Content

> [!definition] Vine (Bedford & Cooke 2002)
> A **vine** $\mathcal{V}$ on $d$ nodes is a sequence of trees $\mathcal{V} = (T_1, T_2, \dots, T_{d-1})$ where:
> 1. $T_1 = (N_1, E_1)$ with $N_1 = \{1, \dots, d\}$ and $E_1$ any set of edges forming a connected tree on $d$ nodes.
> 2. For $\ell \geq 2$: $T_\ell = (N_\ell, E_\ell)$ where $N_\ell = E_{\ell-1}$ (the edges of the previous tree become the nodes of the current one) and $E_\ell$ forms a connected tree on $N_\ell$.
>
> A **regular vine** satisfies additionally the **proximity condition**: two nodes $a = \{i,j\}$ and $b = \{i,k\}$ in $T_\ell$ can be joined by an edge in $T_{\ell+1}$ only if $|a \cap b| = 1$ (they share exactly one index). This ensures that the conditioning set $\mathbf{D}(e)$ for each edge $e \in E_\ell$ has exactly $\ell - 1$ elements.
> ^def-vine

> [!definition] Edge labels: conditioned and conditioning sets
> For an edge $e = \{a, b\} \in E_\ell$ where $a, b \in N_\ell = E_{\ell-1}$:
> - Write $a = \{U_a \cup \mathbf{D}_a\}$ and $b = \{U_b \cup \mathbf{D}_b\}$ as the complete constraint sets of the two nodes.
> - The **conditioning set** is $\mathbf{D}(e) = a \cap b$ (the shared indices; $|\mathbf{D}(e)| = \ell-1$ for a regular vine).
> - The **conditioned nodes** are $j(e) \in a \setminus b$ and $k(e) \in b \setminus a$ (the unique index in each node not shared with the other; $|j(e)| = |k(e)| = 1$).
> - Edge $e$ is labeled with the **conditional bivariate copula** $c_{j(e),k(e)|\mathbf{D}(e)}$ modeling the dependence of $(Y_{j(e)}, Y_{k(e)})$ given $\mathbf{Y}_{\mathbf{D}(e)}$.
>
> **Example ($d=4$, D-vine):** Tree $T_2$ has edges from $E_1 = \{12, 23, 34\}$:
> - Node $\{12\}$ and node $\{23\}$ share index 2 → edge labeled $c_{13|2}$ (pair 1,3 given 2).
> - Node $\{23\}$ and node $\{34\}$ share index 3 → edge labeled $c_{24|3}$ (pair 2,4 given 3).
> ^def-edge-labels

> [!definition] C-vine (canonical vine / star structure)
> In a **C-vine**, each tree $T_\ell$ is a **star**: one node (the root) is connected to all other $d-\ell$ nodes, while the others form leaves. Tree $T_1$ has root $r_1 \in \{1,\dots,d\}$ connected to all others; $T_2$ has a new root $r_2$ in the remaining nodes; and so on.
>
> **Density for $d=4$ (roots 1, 2, 3):**
> $$f = \prod f_i \cdot c_{12}\,c_{13}\,c_{14} \cdot c_{23|1}\,c_{24|1} \cdot c_{34|12}$$
> (3+2+1 = 6 pair copulas for $d=4$.)
>
> **When to use:** When one variable is a known *driver* of all others (e.g. a market index driving all sector returns), making it the root of each tree captures the dominant structure directly. The C-vine is natural for factor-like dependence with a clear common variable. Computationally efficient: the root's unconditional copulas are estimated first, then the conditional ones.
> ^def-cvine

> [!definition] D-vine (drawable vine / chain/path structure)
> In a **D-vine**, each tree $T_\ell$ is a **path** (chain): nodes are ordered and each is connected only to its neighbors. $T_1$ is the path $1 - 2 - 3 - \cdots - d$; $T_2$ links edges $\{12\}-\{23\}-\{34\}-\cdots$; and so on.
>
> **Density for $d=4$:**
> $$f = \prod f_i \cdot c_{12}\,c_{23}\,c_{34} \cdot c_{13|2}\,c_{24|3} \cdot c_{14|23}$$
> (3+2+1 = 6 pair copulas for $d=4$.)
>
> **When to use:** When dependence is primarily between *neighboring* variables in some natural ordering — most common in **time series**, where $Y_t$ is most closely related to $Y_{t-1}$, less to $Y_{t-2}$, and so on. Also used for financial return series ordered by market capitalization or sector proximity. The path structure means each variable connects to two neighbors, so no single variable is over-parameterised.
> ^def-dvine

> [!definition] R-vine (regular vine / general case)
> An **R-vine** allows any valid tree structure at each level, subject only to the proximity condition. The C-vine and D-vine are special cases. For $d \geq 5$ the number of valid R-vine structures grows super-exponentially: $\frac{d!}{2}(d-2)^{d-2} \cdot \ldots$ distinct labeled R-vines exist for $d$ nodes (exact count per Bedford & Cooke 2002), making exhaustive structure search infeasible for $d \geq 10$.
>
> **Structure selection:** In practice, the first tree is typically built greedily: maximize the sum of edge weights (absolute Kendall's $\tau$ or Spearman's $\rho$), giving a maximum spanning tree (Dißmann et al. 2013, JMVA). This concentrates strongest dependencies in Tree 1 and leaves residual/conditional dependence for later trees. Later trees are then also built greedily on the conditional rank correlations.
> ^def-rvine

## The Proximity Condition: Why It Matters

The proximity condition is not merely technical — it ensures that conditioning sets grow by exactly one variable per level. Without it, the conditional copula $c_{jk|\mathbf{D}}$ might have conditioning sets of different sizes at the same tree level, making the density formula inconsistent. The proximity condition guarantees that:
1. Every edge $e \in E_\ell$ has a conditioning set of size exactly $\ell-1$.
2. The h-function recursion (see [[Pair Copula Construction]]) terminates correctly.
3. The density factors *uniquely* given the vine structure (no double-counting).

## Examples

> [!example] Vine count for small $d$
> | $d$ | Pair copulas | Trees | R-vine count (labeled) |
> |---|---|---|---|
> | 2 | 1 | 1 | 1 |
> | 3 | 3 | 2 | 3 |
> | 4 | 6 | 3 | 24 |
> | 5 | 10 | 4 | 480 |
> | 10 | 45 | 9 | $\approx 1.6 \times 10^{13}$ |
> | 20 | 190 | 19 | astronomically large |
>
> **Implication:** For $d \geq 6$, exhaustive search over vine structures is infeasible; greedy or sequential selection must be used.

## Connections

- [[Vine Copulas - Overview]] — the motivation and density formula that these structures serve.
- [[Pair Copula Construction]] — how each edge's conditional CDF arguments are computed (h-functions).
- [[Vine Copula Estimation and Model Selection]] — greedy tree selection (Dißmann et al. algorithm) and sequential MLE.
- [[Factor Copulas - Overview]] — the competing high-dimensional approach where structure is imposed via latent factors rather than tree graphs.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ are used as edge weights in maximum-spanning-tree selection.
- [[Tail Dependence in Factor Copulas]] — tail dependence properties that a vine can also capture, per-pair rather than through a single factor.
- [[Econometrics/_Index|Econometrics]]
