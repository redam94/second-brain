---
title: Regular Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "Bedford & Cooke (2002) — Annals of Statistics 30(4), 1031–1068; Czado (2019) §2"
source_location: "Bedford & Cooke §2-4; Czado §2.1-2.4"
date_ingested: 2026-11-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Constructions]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - R-vine
  - regular vine
  - C-vine structure
  - D-vine structure
  - vine tree
---

# Regular Vine Structures

> [!summary]
> Bedford & Cooke (2002) introduce **regular vines** (R-vines) as the general graph-theoretic framework for pair-copula constructions. An R-vine on $d$ variables is a sequence of $d-1$ nested trees satisfying the **proximity condition** — only edges that share a node in tree $T_j$ may become nodes in tree $T_{j+1}$. This condition guarantees that the conditional independence implied by the vine is consistent with a valid probability model. C-vines (star trees) and D-vines (path trees) are the two special cases that admit closed-form density recursions and are easiest to fit.

## Overview

A vine is essentially a recipe for decomposing a joint density into bivariate building blocks. The graphical structure determines **which pairs** of variables are linked by unconditional copulas (at tree 1) and **which conditioning sets** are imposed on later-tree pair copulas (at trees 2, 3, ...). Different vine structures correspond to different factorizations of the same joint distribution.

Bedford & Cooke's key insight is that not all tree sequences form valid probability models. The **proximity condition** (also called the *running intersection property*) ensures that the implied conditional distributions are well-defined — specifically, that any pair copula in tree $j+1$ conditions on exactly the variables that appear in the two connecting tree-$j$ edges.

## Main Content

> [!definition] Vine (Bedford & Cooke 2002)
> A **vine** $\mathcal{V}$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ where:
>
> 1. $T_1$ is a connected tree with node set $N_1 = \{1, 2, \ldots, d\}$ and edge set $E_1 \subseteq N_1 \times N_1$.
> 2. For $j = 2, \ldots, d-1$: tree $T_j$ has node set $N_j = E_{j-1}$ (the edges of the previous tree become nodes) and edge set $E_j$.
> 3. **Proximity condition:** If two nodes in $T_j$ are connected by an edge in $T_j$, they must share exactly one common node in $T_{j-1}$.
>
> The node $a \in T_j$ inherits a **conditioning set** $D(a)$ (variables it conditions on) and a **conditioned set** $\{i,j\}$ (the two variables whose pair copula is modelled). Together, $D(a) \cup \{i,j\}$ is called the **complete union** $\mathcal{U}(a)$.
^vine-definition

> [!definition] Regular vine (R-vine)
> A vine is **regular** if, for each pair of nodes $a, b \in N_j$ connected by an edge $e = \{a, b\} \in E_j$, the conditioned sets $\{i_a, j_a\}$ and $\{i_b, j_b\}$ of $a$ and $b$ differ in exactly one element. The shared element forms the conditioning set $D(e) = D(a) \cup D(b) \cup (\mathcal{U}(a) \cap \mathcal{U}(b))$, and the symmetric difference $\{i, j\} = \mathcal{U}(a) \triangle \mathcal{U}(b)$ gives the conditioned set.
>
> The number of valid R-vine structures on $d$ nodes is $d!\,2^{\binom{d-1}{2}}/2$ (Morales-Napoles 2010), growing super-exponentially — which makes structure selection non-trivial for $d \geq 5$.
^r-vine-definition

> [!definition] C-vine (Canonical vine)
> A **C-vine** is a regular vine where every tree $T_j$ is a **star** — one node (the root) is connected to all other $d-j$ nodes in $T_j$.
>
> - $T_1$: root variable $X_1$ connects to $X_2, X_3, \ldots, X_d$ (star with centre $X_1$).
> - $T_2$: root is the edge $(1,2)$ from $T_1$; it connects to all other $T_1$ edges involving $X_1$. This creates a star of conditional copulas $c_{23|1}, c_{24|1}, \ldots, c_{2d|1}$ (conditioning on $X_1$).
> - $T_j$: conditioning set grows by one element per tree; root is always the most recently added conditioning variable.
>
> **C-vines are natural when** one variable is known to be a central driver of all others (e.g. a market factor, a temperature index).
>
> **Parameter count:** $d(d-1)/2$ pair copulas; each can be from a different family.
^c-vine-definition

> [!definition] D-vine (Drawable vine)
> A **D-vine** is a regular vine where every tree $T_j$ is a **path** — variables are ordered and each is connected only to its nearest neighbours at each tree level.
>
> - $T_1$: path $1 — 2 — 3 — \cdots — d$ with $d-1$ edges.
> - $T_2$: nodes are edges of $T_1$; path of length $d-2$ connecting $(1,2)—(2,3)—(3,4)—\cdots$ Each edge gives a conditional copula $c_{13|2}, c_{24|3}, \ldots$
> - $T_j$: path of length $d-j$ with conditioning sets of size $j-1$.
>
> **D-vines are natural when** variables have a natural linear ordering (time lags in a time series, spatial proximity, ordered categories) or when the researcher has no strong prior on which variable should be the central driver.
>
> **Parameter count:** Same as C-vine: $d(d-1)/2$ pair copulas.
^d-vine-definition

> [!definition] R-vine structure matrix
> Any R-vine structure can be encoded as a lower-triangular $d \times d$ matrix $M$ where:
> - Column $k$ gives the conditioning path for the pair copula of variable $k$ at each tree level.
> - Entry $M_{j,k}$ ($j < k$) gives the variable conditioned on at tree $j$ when modelling the dependence of variable $k$.
> - Diagonal $M_{k,k} = k$ identifies the variable.
>
> **C-vine matrix:** All off-diagonal entries in column $k$ equal the C-vine root variable at tree $k$:
> $$M = \begin{pmatrix} d & & & \\ d-1 & d-1 & & \\ \vdots & \vdots & \ddots & \\ 1 & 1 & \cdots & 1 \end{pmatrix}$$
>
> **D-vine matrix:** Entries form a staircase pattern reflecting the path ordering. The R-vine matrix is the standard input format for the `RVineMatrix` class in the **VineCopula** R package.
^r-vine-matrix

## Comparison Table

> [!definition] C-vine vs D-vine vs R-vine summary
> | Property | C-vine | D-vine | R-vine (general) |
> |---|---|---|---|
> | Tree structure | Star at each level | Path at each level | Arbitrary spanning trees |
> | Variable role | Root at each tree = "driver" | Variables ordered in chain | No special roles |
> | Natural application | Factor-like structure | Time series / spatial ordering | General flexible dependence |
> | Structure selection | Choose root at each tree ($d-1$ choices) | Choose variable ordering ($d!/2$ orderings) | Exponential search space |
> | Log-likelihood recursion | Explicit (Aas et al. 2009 Eq. 11) | Explicit (Aas et al. 2009 Eq. 10) | General R-vine formula |
> | R package | `C.VineLogLik` in VineCopula | `D.VineLogLik` in VineCopula | `RVineLogLik` in VineCopula / rvinecopulib |
>
> Every C-vine and every D-vine is a valid R-vine; R-vine is strictly more general.
^vine-comparison

## Examples

> [!example] R-vine structure on $d=4$ variables
> **Setup:** 4 variables. Consider a vine that is neither a pure C-vine nor a pure D-vine.
>
> **Tree 1:** Spanning tree $1–2–3–4$ (path), giving edges $(1,2), (2,3), (3,4)$ — this is D-vine so far.
>
> **Tree 2:** Nodes are $\{(1,2), (2,3), (3,4)\}$. Edges connect nodes sharing variable 2 or 3:
> - $(1,2)–(2,3)$: edge gives $c_{13|2}$ ✓ (share variable 2)
> - $(2,3)–(3,4)$: edge gives $c_{24|3}$ ✓ (share variable 3)
> This is still D-vine structure.
>
> **Tree 3:** Nodes are $\{(1,3|2), (2,4|3)\}$. Only one possible edge, giving $c_{14|2,3}$.
>
> An R-vine would differ in Tree 2 by choosing e.g. $(1,2)–(3,4)$ as a non-adjacent edge — but this violates the proximity condition (nodes $(1,2)$ and $(3,4)$ share no variable). So for $d=4$, the C-vine and D-vine structures are the only R-vines for the two most common designs; a genuinely different R-vine would arise if $T_1$ were not a path or star (possible only for $d \geq 5$).

> [!example] $d=5$ R-vine that is neither C nor D
> **Tree 1:** $1–3–5–2–4$ (path with this ordering). Edges $(1,3), (3,5), (5,2), (2,4)$.
>
> **Tree 2:** Instead of continuing the path (D-vine) or centring on one node (C-vine), use:
> - $(1,3)–(3,5)$ → $c_{15|3}$
> - $(3,5)–(5,2)$ → $c_{32|5}$
> - $(5,2)–(2,4)$ → $c_{54|2}$ ... 
>
> Here all pairs satisfy the proximity condition, but the conditioning sets differ from both C and D cases. This is a genuine R-vine that is neither C nor D. For $d=5$ there are $4!/2 = 12$ D-vine orderings and 5 C-vine root choices, but thousands of valid R-vine structures.

## Connections

- [[Vine Copulas - Overview]] — motivation and position relative to factor copulas.
- [[Pair-Copula Constructions]] — the PCC density formula and h-function recursion that the vine structure determines.
- [[Vine Copula Estimation and Selection]] — Dissmann's greedy maximum-spanning-tree algorithm for R-vine structure selection.
- [[Directed Acyclic Graphs]] — DAGs encode conditional independences; vines encode conditional *dependences*. The proximity condition is the vine analogue of the d-separation criterion.
- [[Factor Copulas - Overview]] — the factor copula imposes a specific "hub" structure analogous to a C-vine with one common factor.

## See Also

- [[_Index|Dependence Modeling]] — folder index
- Bedford & Cooke (2001) — "Probability density decomposition for conditionally dependent random variables modeled by vines" (*Ann. Math. Artif. Intell.*) — companion paper
