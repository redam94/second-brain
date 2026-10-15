---
title: "Regular Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions.pdf]]"
source_location: "Secs. 2-3, pp. 3-12"
date_ingested: 2026-10-15
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Density and Inference]]"
aliases:
  - C-vine
  - D-vine
  - R-vine
  - canonical vine
  - drawable vine
  - regular vine
  - Bedford-Cooke vine
---

# Regular Vine Structures

> [!summary]
> A **regular vine** (R-vine) on $d$ variables is a nested sequence of trees $T_1, \ldots, T_{d-1}$ that satisfies the **proximity condition**, ensuring every conditional pair in tree $T_j$ differs by exactly one conditioning variable from tree $T_{j-1}$. The two canonical special cases are the **C-vine** (each tree is a star) and the **D-vine** (each tree is a path). Bedford & Cooke (2001, 2002) established the graphical theory; Aas et al. (2009) developed statistical inference. The vine structure determines which $d(d-1)/2$ bivariate copulas are used and with which conditioning sets.

## Overview

Sklar's theorem decomposes a joint distribution into marginals and a copula, but choosing a multivariate copula for $d > 4$ variables is hard: available parametric families impose strong structural constraints. Bedford & Cooke (2001, 2002) showed that **any** $d$-dimensional density can be written as a product of bivariate copula densities — and that the structure of this decomposition can be represented as a *vine*, a nested sequence of trees where the edges of one tree become the nodes of the next.

A vine on $d$ variables yields $d(d-1)/2$ pairs spread across $d-1$ trees. Not all trees are valid: the proximity condition ensures the conditioning sets are nested in a coherent way, so the resulting product of bivariate densities is indeed a valid joint density.

## Main Content

> [!definition] Vine (informal)
> A **vine** $V$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ where:
> - $T_1$ has nodes $\{1, 2, \ldots, d\}$ and $d-1$ edges.
> - For $j \geq 2$: the nodes of $T_j$ are the *edges* of $T_{j-1}$; the edges of $T_j$ connect pairs of nodes in $T_j$ (i.e., pairs of edges in $T_{j-1}$) that share a common node in $T_{j-1}$ (the **proximity condition**).
>
> Each edge $e$ in tree $T_j$ corresponds to a **bivariate pair** $(j(e), k(e))$ conditioned on the set $D(e)$ (the **conditioning set**), which contains all the variables that the two edges of $T_{j-1}$ share. As $j$ increases, the conditioning set grows: pairs in $T_1$ are unconditioned; pairs in $T_j$ are conditioned on $j-1$ variables.
^def-vine

> [!definition] Regular vine (Bedford & Cooke 2002)
> A vine $V$ on $d$ variables is called a **regular vine** (R-vine) if, for every $j$ and every edge $e = \{a, b\}$ in $T_j$, the corresponding edges $a$ and $b$ in $T_{j-1}$ share exactly one node in $T_{j-1}$ — i.e., the symmetric difference $|a \triangle b| = 2$. Equivalently, the constraint nodes $D(e) = a \cap b$ of each edge $e$ have exactly $j-1$ elements.
>
> **Consequence:** In an R-vine on $d$ variables there are exactly $d-1$ trees, with $d-j$ edges each, giving $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$ pairs total. Each pair uses one bivariate copula. The total number of bivariate copulas equals the total number of unique pairs — every pair of variables is represented exactly once across all trees.
^def-rvine

> [!definition] C-vine (canonical vine)
> A **C-vine** on $d$ variables is an R-vine in which **every tree $T_j$ is a star**: there is a single *root node* in $T_j$ connected to all $d-j$ other nodes. The root of $T_1$ is one variable, say variable $r_1$; it is paired with all other $d-1$ variables, giving $d-1$ edges in $T_1$:
> $$ T_1: \; r_1-2,\; r_1-3,\; \ldots,\; r_1-d $$
> The root of $T_2$ is the edge $r_1-r_2$ in $T_1$; it is connected to all $d-2$ remaining edges in $T_1$, generating $d-2$ edges in $T_2$ — each pair $(r_2, i)$ conditioned on $r_1$:
> $$ T_2: \; c_{r_2, 3|r_1},\; c_{r_2, 4|r_1},\; \ldots $$
> The pattern continues: tree $T_j$ has root $r_1-r_2-\cdots-r_j$ and is a star conditioning on $r_1, \ldots, r_{j-1}$.
>
> **C-vine density:**
> $$ f(x_1,\ldots,x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{r_j,i|r_1,\ldots,r_{j-1}} \!\left(F(x_{r_j}|x_{r_1},\ldots,x_{r_{j-1}}),\, F(x_i|x_{r_1},\ldots,x_{r_{j-1}})\right) $$
>
> **When to use:** The C-vine is natural when **one variable drives all others** — for example, a market index driving individual stock returns, or a key macroeconomic variable conditioning a system. The root variable of each tree should be the one with the highest average dependence with the others.
^def-cvine

> [!definition] D-vine (drawable vine)
> A **D-vine** on $d$ variables is an R-vine in which **every tree $T_j$ is a path** — no node has degree greater than 2. This implies a linear ordering of the $d$ variables, say $1, 2, \ldots, d$. Tree $T_1$ has edges $1-2, 2-3, \ldots, (d-1)-d$:
> $$ T_1: \; 1-2,\; 2-3,\; \ldots,\; (d-1)-d $$
> Tree $T_2$ connects adjacent edges of $T_1$ to give pairs conditioned on one variable: $c_{1,3|2}$, $c_{2,4|3}$, $\ldots$, $c_{d-2,d|d-1}$. Tree $T_j$ has pairs conditioned on $j-1$ variables: $c_{1,1+j|2,\ldots,j}$, $c_{2,2+j|3,\ldots,j+1}$, etc.
>
> **D-vine density (for natural ordering $1,2,\ldots,d$):**
> $$ f(x_1,\ldots,x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right) $$
>
> **When to use:** The D-vine is natural when variables have a **natural ordering** — for example, time series with sequential conditioning, or portfolio positions ordered by maturity. It treats the ordering symmetrically: adjacent variables are paired first; longer-lag pairs appear in higher trees where the conditioning set grows.
^def-dvine

> [!definition] R-vine vs. C-vine vs. D-vine
> For $d \leq 3$, C-vine and D-vine are equivalent (all regular vines on three variables are the same up to labeling). For $d \geq 4$, they differ:
>
> | | C-vine | D-vine | General R-vine |
> |---|---|---|---|
> | Tree topology | Star (one root per tree) | Path (max degree 2) | Any tree structure |
> | Root variable | Fixed for each tree | Not applicable | Not applicable |
> | Natural use | One variable drives all | Sequential/time ordering | General |
> | Number of valid vine structures | $d!$ (choose root order) | $d!/2$ (reversible path) | $\text{Very large}^*$ |
>
> $^*$ The number of R-vines on $d$ variables grows super-exponentially: $\frac{d!}{2} \cdot 2^{\binom{d-2}{2}}$ for $d\geq 2$.
>
> **Practical implication:** For $d \geq 5$, exhaustive search over all R-vine structures is infeasible. The **Dißmann algorithm** (greedy maximum-spanning-tree) is the standard selection procedure — see [[Vine Copula Density and Inference]].
^comparison-types

> [!definition] Edge notation: conditioned and conditioning sets
> Each edge $e$ in an R-vine is written as $j(e), k(e) | D(e)$ where:
> - $j(e), k(e)$: the **conditioned pair** — the two variables being paired
> - $D(e)$: the **conditioning set** — variables being conditioned on
>
> For an edge in tree $T_m$, $|D(e)| = m-1$. The bivariate copula density assigned to this edge is $c_{j(e),k(e)|D(e)}$, evaluated at the conditional CDFs $F(x_{j(e)}|x_{D(e)})$ and $F(x_{k(e)}|x_{D(e)})$.
>
> **Example (D-vine, $d=4$):**
> - $T_1$ edges: $(1,2|\emptyset)$, $(2,3|\emptyset)$, $(3,4|\emptyset)$
> - $T_2$ edges: $(1,3|2)$, $(2,4|3)$
> - $T_3$ edges: $(1,4|2,3)$
^notation

## Examples

> [!example] D-vine vs. C-vine for $d=4$
> **Setup:** Four variables $X_1, X_2, X_3, X_4$.
>
> **D-vine $T_1$:** path $1-2-3-4$ → edges $(1,2)$, $(2,3)$, $(3,4)$. Each variable is a node; edges are unconditioned pairs.
>
> **D-vine $T_2$:** path $(1,2)-(2,3)-(3,4)$ → edges $(1,3|2)$, $(2,4|3)$.
>
> **D-vine $T_3$:** edge $(1,4|2,3)$. The "end" variables $X_1$ and $X_4$ are paired, conditioned on the two "middle" variables.
>
> **C-vine $T_1$ (root = variable 2):** star centered on $2$ → edges $(1,2)$, $(2,3)$, $(2,4)$. Variable 2 is paired with everything.
>
> **C-vine $T_2$ (root = edge $(1,2)$ in $T_1$, i.e., conditioning on 2):** star centered on $(2,\cdot)$ → edges $(1,3|2)$, $(1,4|2)$. Note: variable 1, already paired with root 2, is now the "new hub" conditioning on 2.
>
> **C-vine $T_3$:** edge $(3,4|1,2)$. The two "leaf" variables $X_3$ and $X_4$ get paired, conditioned on both root variables.
>
> **Interpretation:** The two vines use the same six pairs but differ in conditioning sets. The D-vine reflects a sequential ordering ($X_1 \to X_2 \to X_3 \to X_4$); the C-vine reflects a hub variable (variable 2 drives everything else).

## Connections

- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Vine Copula Density and Inference]] — the h-function recursion needed to evaluate the conditional CDFs $F(x_i|x_{D(e)})$, and the sequential estimation procedure.
- [[Factor Copula Construction]] — the alternative copula architecture (latent factor) that does not use a vine structure.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence; used as edge weights in vine structure selection.

## See Also

- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence," *Insurance: Mathematics and Economics*, 44(2), 182–198. Foundational paper for statistical inference on pair-copula constructions.
- Bedford & Cooke (2001) — "Probability density decomposition for conditionally dependent random variables modeled by vines," *Annals of Mathematics and Artificial Intelligence*, 32, 245–268. Mathematical foundations of the vine framework.
- Bedford & Cooke (2002) — "Vines — a new graphical model for dependent random variables," *Annals of Statistics*, 30(4), 1031–1068. The formal proof that any joint density has a vine decomposition.
- [[../_Index|Dependence Modeling]]
