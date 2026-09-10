---
title: Regular Vine Structure
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Source-Extract.md]]"
source_location: "Bedford & Cooke (2002), Defs. 3.1-4.2; Czado & Nagler (2022), Sec. 2"
date_ingested: 2026-09-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - R-vine
  - regular vine
  - vine tree structure
  - Bedford Cooke vine
---

# Regular Vine Structure

> [!summary]
> A **regular vine** (Bedford & Cooke 2002) on $d$ variables is a sequence of $d-1$ nested trees
> $V = (T_1, \ldots, T_{d-1})$ satisfying the **proximity condition**: nodes connected in tree $T_j$
> must correspond to edges in $T_{j-1}$ that share exactly one element. This structure uniquely
> determines all $d(d-1)/2$ bivariate pair-copulas and their conditioning sets, giving a general
> framework for which C-vine and D-vine are special cases.

## Overview

Bedford & Cooke (2001, 2002) introduced **vines** as a graphical language for organising
pair-copula constructions. The vine tells the model builder:
1. *Which* variables to pair (the edges of each tree), and
2. *What* to condition on (the constraint set of each edge, inherited from earlier trees).

The **regular vine** (R-vine) is the most general class; the **canonical vine** (C-vine) and
**drawable vine** (D-vine) are special cases with simpler tree structures (see [[C-Vine and D-Vine]]).
Any valid R-vine yields a valid PCC density — the vine just determines the factorisation structure.

## Main Content

> [!definition] Regular Vine — formal definition (Bedford & Cooke 2002, Def. 4.1)
> A **regular vine** on $d$ elements is a sequence $V = (T_1, T_2, \ldots, T_{d-1})$ of trees where:
> - $T_1 = (N_1, E_1)$ with $N_1 = \{1, \ldots, d\}$ and $E_1 \subseteq \binom{N_1}{2}$, i.e., $T_1$
>   has all $d$ variables as nodes and its edges define the first-tree pairings.
> - For $j = 2, \ldots, d-1$: $T_j = (N_j, E_j)$ with $N_j = E_{j-1}$ — the nodes of tree $j$ are
>   exactly the edges of tree $j-1$. Each $T_j$ must be a **connected** tree on $|E_{j-1}|$ nodes.
> - **Proximity condition:** for $j = 2, \ldots, d-1$, if $\{a, b\} \in E_j$ (an edge of $T_j$),
>   then the corresponding two edges $a, b \in N_j = E_{j-1}$ must share exactly one node in $T_{j-1}$.
^def-rvine

> [!definition] Constraint set and edge label
> For edge $e = \{a, b\} \in E_j$ (where $a, b \in N_j = E_{j-1}$), the **complete union** is
> $a \cup b$ and the **constraint set** is $D(e) = a \cap b$ (the shared node from the proximity
> condition). The pair of variables linked by edge $e$ in tree $T_j$ is $(i(e), k(e))$ where
> $\{i(e)\} \cup D(e) = a$ and $\{k(e)\} \cup D(e) = b$, so the edge is labelled $i(e), k(e) | D(e)$.
>
> **Interpretation:** $D(e)$ is the set of variables being conditioned on in the pair-copula $c_{i(e),k(e)|D(e)}$. The proximity condition ensures $|D(e)| = j-1$ for all edges in tree $T_j$.
^def-constraint

> [!definition] Full R-vine density
> Given a regular vine $V$ on $d$ variables, and a choice of bivariate copula family for each
> edge $e$ in each tree $T_j$, the joint density is:
> $$f(x_1,\ldots,x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{e \in E_j} c_{i(e),k(e)|D(e)}\!\left(F(x_{i(e)}\,|\,\mathbf{x}_{D(e)}),\, F(x_{k(e)}\,|\,\mathbf{x}_{D(e)})\right)$$
> Under the simplifying assumption (see [[Vine Copulas - Overview]]), the conditional CDFs
> $F(x_i|\mathbf{x}_{D(e)})$ are computed recursively from the h-functions of earlier-tree pair-copulas.
^def-rvine-density

> [!definition] Scale of the model
> A regular vine on $d$ variables contains:
> - $d-1$ trees: $T_1, \ldots, T_{d-1}$
> - Tree $T_j$ has $d-j$ edges, so the **total number of pair-copulas** is $\sum_{j=1}^{d-1}(d-j) = \dfrac{d(d-1)}{2}$
> - With one-parameter families, this yields $\dfrac{d(d-1)}{2}$ parameters — the same count as a
>   full correlation matrix, but with much richer distributional flexibility.
> - For $d = 5$: 10 pair-copulas across 4 trees.
> - For $d = 10$: 45 pair-copulas across 9 trees.
> - For $d = 100$: 4,950 pair-copulas — infeasible without truncation.
^def-scale

> [!definition] Number of distinct R-vine structures
> The number of distinct R-vine tree structures on $d$ nodes is $\dfrac{d!\,(d-1)!}{2^{d-1}}$ for
> $d \geq 2$ (a rapidly growing number). For $d=4$: 24; for $d=5$: 480. This combinatorial explosion
> is why greedy structure-selection algorithms (Dissmann et al. 2013) are used in practice rather
> than exhaustive search — see [[Vine Copula Estimation and Selection]].
^def-count

## Examples

> [!example] Four-variable R-vine tree sequence
> **Variables:** $(X_1, X_2, X_3, X_4)$.
> **Tree $T_1$** (on nodes $\{1,2,3,4\}$): edges $\{1,2\}, \{2,3\}, \{3,4\}$ — a path (D-vine).
> **Tree $T_2$** (nodes = edges of $T_1$): nodes $\{12, 23, 34\}$; edges $\{12,23\}$ and $\{23,34\}$.
>   - Edge $\{12,23\}$: $a = \{1,2\}$, $b = \{2,3\}$, $D(e) = \{2\}$, so pair-copula is $c_{1,3|2}$.
>   - Edge $\{23,34\}$: $a = \{2,3\}$, $b = \{3,4\}$, $D(e) = \{3\}$, so pair-copula is $c_{2,4|3}$.
> **Tree $T_3$** (nodes = edges of $T_2$): nodes $\{13|2, 24|3\}$; one edge, pair-copula $c_{1,4|23}$.
>
> **Result:** 6 pair-copulas over 3 trees. The density is:
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{1,3|2} c_{2,4|3} \cdot c_{1,4|23}$$
>
> **This is a D-vine.** A C-vine on the same 4 variables would instead star each tree around a root.

## Connections

- [[Vine Copulas - Overview]] — the pair-copula construction that R-vines organise.
- [[C-Vine and D-Vine]] — the two tractable special cases of R-vines.
- [[Vine Copula Estimation and Selection]] — Dissmann's greedy spanning-tree algorithm for structure selection.
- [[Factor Copulas - Overview]] — contrast: factor copulas impose equidependence through a common factor; R-vines impose no constraint beyond the tree structure.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence used in structure selection.
- [[../_Index|Econometrics]]
