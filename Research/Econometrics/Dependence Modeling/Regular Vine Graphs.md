---
title: "Regular Vine Graphs"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Bedford & Cooke (2002) — 'Vines — a new graphical model for dependent random variables'"
source_location: "Annals of Statistics 30(4):1031–1068 (PDF unavailable — network policy blocks download)"
date_ingested: 2026-10-31
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Pair Copula Construction]]"
  - "[[C-Vines and D-Vines]]"
aliases:
  - regular vine
  - R-vine
  - vine graph
  - Bedford Cooke vines
  - proximity condition
---

# Regular Vine Graphs

> [!summary]
> A **regular vine** $\mathcal{V}$ on $n$ variables is a nested sequence of $n{-}1$ trees, where nodes at level $k$ are edges from level $k{-}1$, and the **proximity condition** ensures that the pair copulas at each level condition on exactly the right variables. Bedford & Cooke (2002) introduced this framework; it is the graphical scaffolding that organises the $n(n-1)/2$ bivariate copulas in a pair copula construction (PCC) into a valid joint density factorisation.

## Overview

The pair copula construction idea (see [[Vine Copulas - Overview]]) requires specifying which bivariate copulas to combine and which variables to condition on. Without organisation, there are many possible factorisations of an $n$-dimensional density into bivariate pieces — and most do not yield valid joint densities (the conditional distributions must be consistent). The **vine** graphical structure (Bedford & Cooke 2002) is precisely the constraint that guarantees a valid decomposition.

The vine grows tree by tree. Tree $T_1$ covers unconditional pairs. Tree $T_2$ covers pairs conditional on one variable. Tree $T_k$ covers pairs conditional on $k{-}1$ variables. The **proximity condition** — that two edges in tree $T_{k-1}$ can form a node-pair in tree $T_k$ only if they share a node in $T_{k-1}$ — ensures the conditioning sets grow consistently. Any vine satisfying this condition yields a valid joint density.

## Main Content

> [!definition] Vine — formal definition
> A **vine** $\mathcal{V} = (T_1, T_2, \dots, T_{n-1})$ on $n$ variables is a sequence of trees where:
> - $T_1 = (\mathcal{N}_1, \mathcal{E}_1)$: a tree with $\mathcal{N}_1 = \{1, 2, \dots, n\}$ (the $n$ variables) and $n{-}1$ edges.
> - $T_k = (\mathcal{N}_k, \mathcal{E}_k)$ for $k = 2, \dots, n{-}1$: a tree where $\mathcal{N}_k = \mathcal{E}_{k-1}$ (edges from the previous tree become the nodes of the current tree) and $n{-}k$ edges.
>
> The vine has $1 + (n{-}2) + \cdots + 1 = n(n-1)/2$ edges in total, one for each pair of variables (conditioned or unconditional).
^def-vine

> [!definition] Proximity condition (regular vine constraint)
> A vine $\mathcal{V}$ is a **regular vine** (R-vine) if and only if every pair of nodes connected by an edge $e \in \mathcal{E}_k$ satisfies the **proximity condition**:
> $$ \{a, b\} \in \mathcal{E}_k \implies \#(a \cap b) = k - 1 $$
> That is, viewing nodes $a, b \in \mathcal{N}_k$ as edge-sets from $T_{k-1}$, they must share exactly $k{-}1$ elements (one shared element in $T_2$, two in $T_3$, etc.). Equivalently: the two edges $a, b \in \mathcal{E}_{k-1}$ share a node in $T_{k-1}$.
>
> **Why it matters:** without proximity, the conditioning sets would be inconsistent and the product of pair copula densities would not integrate to a valid probability density.
^def-proximity

> [!definition] Edge labels — conditioned and conditioning sets
> Each edge $e = \{a, b\} \in \mathcal{E}_k$ receives a label $(j(e), k(e) \,|\, D(e))$ where:
> - **Conditioned set** $\{j(e), k(e)\} = a \triangle b$ (symmetric difference of $a$ and $b$ as subsets of $\{1,\dots,n\}$): the two variables whose bivariate copula is being specified.
> - **Conditioning set** $D(e) = a \cap b$: the variables being conditioned on; $|D(e)| = k{-}1$ in tree $T_k$.
>
> This labelling makes the density factorisation explicit: the pair copula associated with edge $e$ is $c_{j(e),k(e)|D(e)}$.
^def-labels

> [!theorem] Regular vine density factorisation (Bedford & Cooke 2002)
> Let $(Y_1, \dots, Y_n)$ have marginals $F_i$ and let $\mathcal{V}$ be a regular vine on $n$ variables. Then the joint density admits the factorisation:
> $$ f(y_1, \dots, y_n) = \prod_{i=1}^{n} f_i(y_i) \times \prod_{k=1}^{n-1} \prod_{e \in \mathcal{E}_k} c_{j(e),k(e)|D(e)}\!\Bigl(F(y_{j(e)} | \mathbf{y}_{D(e)}),\; F(y_{k(e)} | \mathbf{y}_{D(e)})\Bigr) $$
> **Conditions:** (i) Each $c_{j,k|D}$ is a valid bivariate copula density. (ii) The vine $\mathcal{V}$ satisfies the proximity condition. (iii) The conditional CDFs $F(y_j | \mathbf{y}_D)$ are evaluated using the $h$-function recursion (see [[Pair Copula Construction]]).
>
> **Significance:** This shows every regular vine generates a valid joint density. Different vine structures (which pairs to condition on) give different but all valid joint distributions. The **pair copulas** $c_{j,k|D}$ are free to be chosen independently — they are the model's building blocks.
^thm-density

> [!definition] Number of regular vines
> On $n$ variables, the number of distinct regular vines is:
> $$ \#\text{R-vines} = \frac{n!}{2} \prod_{k=2}^{n-2} 2^{\binom{k}{2}} $$
> which grows super-exponentially. For $n = 4$: 24 regular vines. For $n = 5$: 480. Even at $n = 5$, exhaustive search is feasible; for $n \geq 10$, greedy selection algorithms (maximum spanning tree at each level) are used in practice.
^def-count

## Examples

> [!example] Four-variable regular vine ($n=4$)
> **Tree $T_1$:** 4 nodes ($Y_1, Y_2, Y_3, Y_4$), 3 edges. One possibility: $\{1,2\}, \{2,3\}, \{3,4\}$ (a path).
>
> **Tree $T_2$:** nodes are $\{1,2\}, \{2,3\}, \{3,4\}$ (the 3 edges from $T_1$). Proximity condition: $\{1,2\}$ and $\{2,3\}$ share node $2$ → can be connected as edge labelled $(1,3|2)$. $\{2,3\}$ and $\{3,4\}$ share node $3$ → edge $(2,4|3)$. Two edges in $T_2$.
>
> **Tree $T_3$:** nodes are $(1,3|2)$ and $(2,4|3)$. Proximity check: $\{1,2,3\} \cap \{2,3,4\} = \{2,3\}$, size 2 = $k{-}1 = 2$ ✓. Edge $(1,4|2,3)$.
>
> **Result:** 6 pair copulas total: $c_{12}, c_{23}, c_{34}$ (unconditional); $c_{13|2}, c_{24|3}$ (one-variable conditioning); $c_{14|23}$ (two-variable conditioning). This is the D-vine $1{-}2{-}3{-}4$.

## Connections

- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Pair Copula Construction]] — the density formula and $h$-function that make the vine computable.
- [[C-Vines and D-Vines]] — the two canonical restricted vine structures (special cases of regular vines).
- [[Vine Copula Estimation and Selection]] — greedy maximum-spanning-tree (MST) algorithm for vine structure selection.

## See Also

- [[Factor Copulas - Overview]] — alternative approach to high-dimensional dependence via a factor model.
- [[Directed Acyclic Graphs]] — DAGs are a different kind of graphical model for dependence; vines are undirected trees, not DAGs.
- [[../_Index|Econometrics]]
