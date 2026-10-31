---
title: "C-Vines and D-Vines"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009) — 'Pair-copula constructions of multiple dependence'"
source_location: "Secs. 2.1–2.2, pp. 183–187; Insurance: Mathematics and Economics 44(2):182–198 (PDF unavailable — network policy blocks download)"
date_ingested: 2026-10-31
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Regular Vine Graphs]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - star vine
  - path vine
---

# C-Vines and D-Vines

> [!summary]
> C-vines and D-vines are the two most widely used restricted classes of regular vines. A **D-vine** organises pair copulas along a path (no node in $T_k$ has degree greater than 2), while a **C-vine** uses stars (each $T_k$ has one central node connected to all others). Aas et al. (2009) provide explicit density formulas for both via the $h$-function recursion. The two structures embody different assumptions about how dependence propagates and suit different application contexts.

## Overview

Among all regular vines on $n$ variables (exponentially many; see [[Regular Vine Graphs]]), C-vines and D-vines are the two tractable special cases studied most thoroughly in the literature. They constrain the vine structure to simple patterns that make the density formula explicit and the estimation algorithm straightforward.

Both are special cases of the general PCC density (see [[Pair Copula Construction]]); the restricted structure simply specifies exactly *which* pairs appear at each tree level and *what* conditioning sets they carry.

## Main Content

> [!definition] D-vine (drawable vine)
> A **D-vine** on $n$ variables is a regular vine where every tree $T_k$ is a **path**: every node in $T_k$ has degree at most 2.
>
> - $T_1$: a path $1 \text{---} 2 \text{---} 3 \text{---} \cdots \text{---} n$. Pair copulas: $c_{12}, c_{23}, \dots, c_{n-1,n}$.
> - $T_2$: path $(1,3|2) \text{---} (2,4|3) \text{---} \cdots \text{---} (n-2,n|n-1)$. Pair copulas: $c_{1,3|2}, c_{2,4|3}, \dots, c_{n-2,n|n-1}$.
> - $T_k$: pair copulas $c_{j,j+k|j+1,\dots,j+k-1}$ for $j = 1, \dots, n-k$.
>
> The D-vine density is:
> $$f(\mathbf{y}) = \prod_{i=1}^n f_i(y_i) \prod_{k=1}^{n-1} \prod_{j=1}^{n-k} c_{j,j+k \mid j+1,\dots,j+k-1}\!\bigl(F(y_j|\mathbf{y}_{\{j+1,\dots,j+k-1\}}),\; F(y_{j+k}|\mathbf{y}_{\{j+1,\dots,j+k-1\}})\bigr)$$
^def-d-vine

> [!definition] C-vine (canonical vine)
> A **C-vine** on $n$ variables is a regular vine where every tree $T_k$ is a **star**: one node (the "root" of $T_k$) is connected to all others.
>
> - $T_1$: variable 1 is the root, connected to $2, 3, \dots, n$. Pair copulas: $c_{1,2}, c_{1,3}, \dots, c_{1,n}$.
> - $T_2$: variable 2 is the root (conditional on 1), connected to $(3|1), (4|1), \dots, (n|1)$. Pair copulas: $c_{2,3|1}, c_{2,4|1}, \dots, c_{2,n|1}$.
> - $T_k$: variable $k$ is the root (conditional on $1,\dots,k-1$), connected to $(k+1|1,\dots,k-1), \dots, (n|1,\dots,k-1)$. Pair copulas: $c_{k,k+j|1,\dots,k-1}$ for $j=1,\dots,n-k$.
>
> The C-vine density is:
> $$f(\mathbf{y}) = \prod_{i=1}^n f_i(y_i) \prod_{k=1}^{n-1} \prod_{j=1}^{n-k} c_{k,k+j \mid 1,\dots,k-1}\!\bigl(F(y_k|\mathbf{y}_{\{1,\dots,k-1\}}),\; F(y_{k+j}|\mathbf{y}_{\{1,\dots,k-1\}})\bigr)$$
^def-c-vine

> [!definition] Structural comparison: star vs path
> | Property | D-vine | C-vine |
> |---|---|---|
> | $T_k$ structure | Path (all nodes degree $\leq 2$) | Star (one node connects to all others) |
> | Pair copulas in $T_k$ | $c_{j,j+k|j+1,\dots,j+k-1}$ (overlapping conditioning) | $c_{k,k+j|1,\dots,k-1}$ (nested conditioning on 1 to $k-1$) |
> | Interpretation | Natural ordering — variable $j$ relates to $j+k$ through the chain $j{+}1, \dots, j{+}k{-}1$ | Factor hierarchy — variable $k$ at each level drives all remaining variables given $1,\dots,k-1$ |
> | When to use | Temporal sequences, yield curves, spatial chains | One dominant factor per tree level (e.g. market return, then sector, then firm) |
> | Root choice | The path ordering of variables in $T_1$ | Variable with highest average pairwise $|\tau|$ chosen as root of $T_1$ |
> | Count (on $n$ vars) | $n!/2$ distinct D-vines | $n!/2$ distinct C-vines |
^def-comparison

> [!definition] $h$-function recursion for D-vine simulation
> To simulate $(U_1, \dots, U_n)$ from a D-vine:
> 1. Draw $u_1, w_2, \dots, w_n \sim \text{Uniform}(0,1)$ independently.
> 2. Set $u_2 = h^{-1}(w_2 \mid u_1;\, \theta_{12})$.
> 3. For $i = 3, \dots, n$: let $v_{i-1|i-2,\dots,1} = w_i$ and back-solve through the $h$-function chain to recover $u_i$.
>    Specifically, define $v^{(1)}_{i-1} = w_i$ and for $k = i-1, i-2, \dots, 1$:
>    $$v^{(k)}_? = h^{-1}(v^{(k-1)}_? \mid h(\cdots);\, \theta_{\cdot,\cdot|\cdot})$$
>    (the exact index depends on the path ordering).
>
> The $h^{-1}$ inversion is typically done by root-finding (bisection or Newton's method); for Gaussian and $t$ copulas, semi-closed forms exist.
^def-d-vine-sim

## Examples

> [!example] D-vine density — four variables
> **Setting:** D-vine $1{-}2{-}3{-}4$.
>
> **$T_1$ pair copulas:** $c_{12}$, $c_{23}$, $c_{34}$.
>
> **$T_2$ pair copulas:** $c_{13|2}$, $c_{24|3}$.
>
> **$T_3$ pair copula:** $c_{14|23}$.
>
> **Conditional CDFs (using $h$-function from [[Pair Copula Construction]]):**
> $v_{1|2} = h(u_1|u_2;\theta_{12})$, $v_{3|2} = h(u_3|u_2;\theta_{23})$, $v_{2|3} = h(u_2|u_3;\theta_{23})$, $v_{4|3} = h(u_4|u_3;\theta_{34})$.
>
> $v_{1|23} = h(v_{1|2} | v_{3|2};\theta_{13|2})$, $v_{4|23} = h(v_{4|3}|v_{2|3};\theta_{24|3})$.
>
> **Joint density:** $f_1 f_2 f_3 f_4 \times c_{12}(u_1,u_2)\cdot c_{23}(u_2,u_3)\cdot c_{34}(u_3,u_4) \times c_{13|2}(v_{1|2},v_{3|2})\cdot c_{24|3}(v_{2|3},v_{4|3}) \times c_{14|23}(v_{1|23},v_{4|23})$.

> [!example] C-vine density — four variables (root order 1,2,3)
> **$T_1$ (root=1):** $c_{12}$, $c_{13}$, $c_{14}$.
>
> **$T_2$ (root=2|1):** $c_{23|1}$, $c_{24|1}$.
>
> **$T_3$ (root=3|12):** $c_{34|12}$.
>
> **Conditional CDFs:**
> $v_{2|1}=h(u_2|u_1;\theta_{12})$, $v_{3|1}=h(u_3|u_1;\theta_{13})$, $v_{4|1}=h(u_4|u_1;\theta_{14})$.
>
> $v_{3|12}=h(v_{3|1}|v_{2|1};\theta_{23|1})$, $v_{4|12}=h(v_{4|1}|v_{2|1};\theta_{24|1})$.
>
> **Joint density:** $f_1f_2f_3f_4\times c_{12}c_{13}c_{14}\times c_{23|1}c_{24|1}\times c_{34|12}$.
>
> **Interpretation:** Variable 1 (e.g. market index) directly conditions $Y_2,Y_3,Y_4$. Variable 2 (e.g. sector index) then conditions $Y_3, Y_4$ given market. Variable 3 conditions $Y_4$ given market and sector.

## Connections

- [[Regular Vine Graphs]] — the general vine framework of which C-vines and D-vines are restricted cases.
- [[Pair Copula Construction]] — the $h$-function recursion used to evaluate and simulate from both structures.
- [[Vine Copula Estimation and Selection]] — sequential MLE exploits the tree-by-tree structure; structure selection chooses C-vine vs D-vine vs general R-vine.
- [[Factor Copulas - Overview]] — contrast: C-vine with a single dominant root per tree is conceptually similar to the factor copula's "common factor drives all" story, but implemented through bivariate copulas rather than a latent variable model.
- [[Multi-Factor and Block Dependence Structures]] — block factor copulas (industry + market factors) resemble multi-level C-vines in spirit.

## See Also

- [[Tail Dependence in Factor Copulas]] — tail-dependence analysis for factor copulas; vine copulas can also exhibit tail dependence when the bivariate building blocks (Clayton, Gumbel, $t$) have tail dependence.
- [[../_Index|Econometrics]]
