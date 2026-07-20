---
title: C-vine and D-vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Survey.md]]"
source_location: "Aas et al. (2009) §2–3; Bedford & Cooke (2002) §3; Czado (2019) Ch. 3–4"
date_ingested: 2026-07-20
date_updated: 2026-07-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Density and Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - pair copula construction C-vine D-vine
---

# C-vine and D-vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most widely used special cases of the regular vine (R-vine) framework for pair-copula constructions. In a C-vine each tree is a **star** — one root node is paired with every other — making it natural when one variable acts as a common driver. In a D-vine each tree is a **path**, pairing adjacent variables in a chain — making it natural for ordered data like time series. Both give a **closed-form $d$-variate density** as a product of bivariate copula densities and admit efficient sequential sampling via the $h$-function recursion.

## Overview

For $d$ variables there are $d(d-1)/2$ pair-copulas in any vine decomposition. The vine structure determines *which* pairs are fitted without conditioning (Tree 1) and which are fitted conditionally (Trees 2 through $d-1$). Strong pairwise relationships should appear in the earliest trees — which is why structure selection heuristics (e.g. the Dissmann maximum spanning tree algorithm) place the highest-dependence pairs in $T_1$.

C-vines and D-vines encode two natural structures. For $d = 4$ variables:
- **C-vine** (root node 1): $T_1$ has edges $(1,2), (1,3), (1,4)$; $T_2$ has edges $(2,3|1), (2,4|1)$; $T_3$ has edge $(3,4|1,2)$.
- **D-vine** (order $1,2,3,4$): $T_1$ has edges $(1,2), (2,3), (3,4)$; $T_2$ has edges $(1,3|2), (2,4|3)$; $T_3$ has edge $(1,4|2,3)$.

## Main Content

### C-vine (Canonical Vine)

> [!definition] C-vine structure
> A **C-vine** on $d$ variables with root ordering $(r_1, r_2, \ldots, r_{d-1})$ is the R-vine where:
> - **Tree $T_j$** has $d-j$ edges, all emanating from a single root node $r_j$. The root is connected to every other node.
> - The root $r_j$ in tree $T_j$ is the node corresponding to the edge from the previous-level root in $T_{j-1}$.
>
> With root ordering $(1, 2, \ldots, d-1)$, the pair-copulas are indexed as $c_{j, i | 1, \ldots, j-1}$ for $j = 1, \ldots, d-1$ and $i = j+1, \ldots, d$.
^def-cvine

> [!definition] C-vine joint density
> The joint density of a C-vine with root ordering $(1, 2, \ldots, d-1)$ is:
> $$f(y_1, \ldots, y_d) = \prod_{k=1}^d f_k(y_k) \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d} c_{j,i|1,\ldots,j-1}\!\left(F(y_j|y_1,\ldots,y_{j-1}),\, F(y_i|y_1,\ldots,y_{j-1})\right)$$
> The total number of pair-copulas is $d(d-1)/2$, arranged in a triangular array: row $j$ contains $d - j$ copulas.
>
> The arguments $F(y_j | y_1, \ldots, y_{j-1})$ and $F(y_i | y_1, \ldots, y_{j-1})$ are computed recursively using the $h$-function from pair-copulas at earlier tree levels.
^def-cvine-density

> [!example] C-vine density for $d = 4$ (root node 1)
> $$f(y_1,y_2,y_3,y_4) = \prod_{k=1}^4 f_k(y_k)$$
> $$\times\; c_{12}(F_1(y_1),F_2(y_2))\cdot c_{13}(F_1(y_1),F_3(y_3))\cdot c_{14}(F_1(y_1),F_4(y_4))$$
> $$\times\; c_{23|1}(F(y_2|y_1),F(y_3|y_1))\cdot c_{24|1}(F(y_2|y_1),F(y_4|y_1))$$
> $$\times\; c_{34|12}(F(y_3|y_1,y_2),F(y_4|y_1,y_2))$$
> **Tree 1 (3 copulas):** $y_1$ is paired with each of $y_2, y_3, y_4$ unconditionally.
> **Tree 2 (2 copulas):** $y_2$ paired with $y_3$ and $y_4$, conditioning on $y_1$.
> **Tree 3 (1 copula):** $y_3$ paired with $y_4$, conditioning on both $y_1$ and $y_2$.

### D-vine (Drawable Vine)

> [!definition] D-vine structure
> A **D-vine** on $d$ variables with ordering $(1, 2, \ldots, d)$ is the R-vine where every tree $T_j$ is a **path** (each node has degree at most 2). 
> - **Tree $T_1$:** Path $1 - 2 - 3 - \cdots - d$ with $d-1$ edges: $(1,2), (2,3), \ldots, (d-1,d)$.
> - **Tree $T_j$:** Path of $d-j$ edges: $(1,j+1|2,\ldots,j), (2,j+2|3,\ldots,j+1), \ldots$ — each new edge skips $j$ positions in the ordering.
^def-dvine

> [!definition] D-vine joint density
> The joint density of a D-vine with ordering $(1, 2, \ldots, d)$ is:
> $$f(y_1,\ldots,y_d) = \prod_{k=1}^d f_k(y_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(y_i|y_{i+1},\ldots,y_{i+j-1}),\, F(y_{i+j}|y_{i+1},\ldots,y_{i+j-1})\right)$$
> - $j = 1$ (Tree 1): adjacent-pair copulas $c_{12}, c_{23}, \ldots, c_{(d-1)d}$ — no conditioning.
> - $j = 2$ (Tree 2): "skip-one" copulas $c_{13|2}, c_{24|3}, \ldots$ — each conditioned on the linking variable.
> - $j = d-1$ (Tree $d-1$): A single copula $c_{1d|2,\ldots,d-1}$ — the two endpoint variables conditioned on all interior variables.
^def-dvine-density

> [!example] D-vine density for $d = 4$ (ordering $1,2,3,4$)
> $$f(y_1,y_2,y_3,y_4) = \prod_{k=1}^4 f_k(y_k)$$
> $$\times\; c_{12}(F_1(y_1),F_2(y_2))\cdot c_{23}(F_2(y_2),F_3(y_3))\cdot c_{34}(F_3(y_3),F_4(y_4))$$
> $$\times\; c_{13|2}(F(y_1|y_2),F(y_3|y_2))\cdot c_{24|3}(F(y_2|y_3),F(y_4|y_3))$$
> $$\times\; c_{14|23}(F(y_1|y_2,y_3),F(y_4|y_2,y_3))$$
> **Tree 1:** Adjacent pairs $(1,2), (2,3), (3,4)$ — strongest sequential dependence modelled directly.
> **Tree 2:** Skip-one pairs, conditioned on the linking variable.
> **Tree 3:** Endpoint pair $(1,4)$ conditioned on the two interior variables $(2,3)$ — residual long-range dependence.

### The $h$-function Recursion

> [!definition] $h$-function (conditional CDF of a bivariate copula)
> For a bivariate copula $C(u,v;\theta)$, the **$h$-function** is the conditional CDF of $U$ given $V = v$:
> $$h(u \mid v; \theta) \equiv F_{U|V}(u|v;\theta) = \frac{\partial C(u,v;\theta)}{\partial v}$$
> The inverse $h$-function $h^{-1}(u \mid v; \theta)$ gives the conditional quantile function.
>
> The $h$-function is the key computational primitive for both evaluating the density and sampling from a vine. For each pair-copula in tree $j$, its arguments $F(y_i | y_{i+1}, \ldots, y_{i+j-1})$ are computed by composing $h$-functions from all earlier trees. Closed-form $h$-functions exist for all standard bivariate families: Normal, Student-$t$, Clayton, Gumbel, Frank, Joe, BB1, BB7.
^def-hfunc

### Sampling Algorithms

> [!definition] Sampling from a D-vine (Aas et al. 2009, Algorithm 1)
> To simulate $(y_1, \ldots, y_d) \sim f$ from a D-vine with ordering $(1, \ldots, d)$:
> 1. Sample $w_1 \sim \text{Unif}(0,1)$, set $u_1 = w_1$.
> 2. Sample $w_2 \sim \text{Unif}(0,1)$, set $u_2 = h^{-1}(w_2 \mid u_1; \theta_{12})$.
> 3. For $k = 3, \ldots, d$:
>    a. Sample $w_k \sim \text{Unif}(0,1)$.
>    b. Set $\nu_{k,1} = w_k$.
>    c. For $j = k-1, k-2, \ldots, 1$ (back-solve through conditioning layers):
>       $$\nu_{k,j+1} = h^{-1}(\nu_{k,j} \mid \nu_{k-j,j}; \theta_{k-j,k|k-j+1,\ldots,k-1})$$
>    d. Set $u_k = \nu_{k,k}$.
> 4. Apply marginal quantile functions: $y_i = F_i^{-1}(u_i)$.
^alg-dvine-sample

> [!definition] Sampling from a C-vine
> To simulate from a C-vine with root ordering $(1, \ldots, d-1)$:
> 1. Sample $w_1 \sim \text{Unif}(0,1)$, set $u_1 = w_1$ (root variable).
> 2. For $i = 2, \ldots, d$: sample $w_i \sim \text{Unif}(0,1)$, then:
>    - Set $p_1 = h^{-1}(w_i \mid u_1; \theta_{1i})$.
>    - For $j = 2, \ldots, i-1$: set $p_j = h^{-1}(p_{j-1} \mid F(u_j|u_1,\ldots,u_{j-1}); \theta_{j,i|1,\ldots,j-1})$.
>    - Set $u_i = p_{i-1}$.
> 3. Apply marginal quantile functions.
>
> The C-vine sampling is slightly more complex because the root's influence must be "peeled off" at each step; the D-vine's path structure makes back-solving more uniform.
^alg-cvine-sample

## Connections

- [[Vine Copulas - Overview]] — the general R-vine framework and the pair-copula construction idea.
- [[Vine Copula Density and Estimation]] — sequential MLE using these density formulas; $h$-function implementation details; structure and family selection.
- [[Copula Architecture Comparison]] — when to choose C-vine vs D-vine vs factor copulas vs Gaussian copulas.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence are used to select which pairs appear in Tree 1 (maximum spanning tree heuristic).
- [[Factor Copulas - Overview]] — factor copulas contrast with vines: factor structure (one latent variable driving all) vs vine structure (each pair modelled directly).

## See Also

- [[Factor Copula Construction]] — the equidependence factor copula can be seen as a C-vine where the common factor plays the role of the root variable.
- [[SMM Estimator for Copulas]] — the SMM estimator used for factor copulas (no closed-form density) contrasts with the vine's tractable MLE.
- [[../_Index|Econometrics]]
