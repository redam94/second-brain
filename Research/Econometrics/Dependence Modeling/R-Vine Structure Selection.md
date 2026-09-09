---
title: R-Vine Structure Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copulas-Literature-Survey.md]]"
source_location: "Dissmann et al. (2013), Computational Statistics & Data Analysis 59, pp. 52-69"
date_ingested: 2026-09-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair Copula Decomposition]]"
used_by:
  - "[[Vine Copula Estimation and Software]]"
aliases:
  - Dissmann algorithm
  - maximum spanning tree vine
  - R-vine matrix
  - vine structure selection
  - truncated vine
---

# R-Vine Structure Selection

> [!summary]
> The general **R-vine** allows any tree topology satisfying the proximity condition, encompassing both C-vine and D-vine as special cases. For $d$ variables, the number of distinct R-vine structures is super-exponential in $d$, so exhaustive search is infeasible for $d \geq 5$. **Dissmann et al. (2013)** propose a greedy sequential algorithm based on **maximum spanning trees** (MST): at each tree level, choose the pair copulas that explain the most dependence (strongest Kendall's $\tau$), placing the most important pairs in lower-conditioning trees.

## Overview

The key modelling decision in vine copulas beyond choosing bivariate families is the **vine structure** — which pairs appear in $T_1$, $T_2$, etc. Pairs in lower trees (small conditioning sets) are easier to estimate and more interpretable; higher trees model residual conditional dependence. Dissmann's algorithm operationalizes the principle "capture the strongest dependencies first."

An important practical tool is the **R-vine matrix**: a $d \times d$ upper-triangular matrix encoding the entire vine structure compactly, used by software implementations.

## Main Content

> [!definition] Regular vine (R-vine) — general definition
> A **regular vine (R-vine)** $V = (T_1, \ldots, T_{d-1})$ on $d$ variables is any sequence of trees where:
> 1. $T_1$ is any spanning tree on nodes $\{1,\ldots,d\}$ (every node connected, $d-1$ edges).
> 2. For $k \geq 2$: $T_k$ is a spanning tree on the edge-set of $T_{k-1}$, with the **proximity condition**: two edges of $T_{k-1}$ can be connected in $T_k$ only if they share exactly one node in $T_{k-1}$.
>
> The total number of distinct R-vine structures on $d$ nodes is $\frac{d!}{2}\prod_{k=0}^{d-2}2^{\binom{k}{2}}$ (grows super-exponentially). For $d=4$: 24 distinct R-vines. For $d=5$: 480. Exhaustive search is infeasible for $d \geq 7$.
^def-rvine

> [!definition] The R-vine matrix
> The vine structure can be encoded in a $d \times d$ lower-triangular matrix $M$ (Dissmann et al. 2013):
> - Diagonal entry $M[k,k]$ = the $k$-th variable
> - Entry $M[i,k]$ for $i < k$ = the conditioning variable in the pair copula linking $M[k,k]$ to $M[i,k]$ at tree $k-i$
> - Reading column $k$ from bottom to top gives the conditioning sequence for variable $M[k,k]$
>
> This compact representation is used directly in `VineCopula::RVineMatrix()` and `pyvinecopulib`. C-vines and D-vines correspond to specific patterns in $M$.
^def-rvine-matrix

> [!theorem] Dissmann MST algorithm for sequential R-vine structure selection (Dissmann et al. 2013)
> **Input:** Data $\mathbf{x} \in \mathbb{R}^{n \times d}$. **Output:** R-vine matrix $M$ and fitted pair copulas.
>
> **Algorithm** (greedy, tree by tree):
> 1. Compute the empirical Kendall's $\tau_{ij}$ for all $\binom{d}{2}$ pairs $(i,j)$.
> 2. **Tree $T_1$:** Build a complete graph on $d$ nodes with edge weights $|\hat\tau_{ij}|$. Select $T_1 =$ maximum spanning tree (MST). Each edge $(i,j)$ in $T_1$ defines an unconditional pair copula $c_{ij}$; fit and record.
> 3. **Tree $T_2$:** Build a graph on the $d-1$ edges of $T_1$ (nodes of $T_2$). Connect two edges of $T_1$ if they share a node (proximity condition). Compute $|\hat\tau|$ for each eligible pair using pseudo-observations $v_{i|\mathbf{v}}$ from the h-functions of $T_1$. Select $T_2 =$ MST. Fit pair copulas.
> 4. **Repeat** for $T_3, \ldots, T_{d-1}$, always using MST of the eligible graph weighted by $|\hat\tau|$ of the pseudo-observations.
>
> **Rationale:** Stronger pairwise dependence (high $|\tau|$) is captured early in low-conditioning trees where estimation is most accurate. Residual dependence in higher trees is typically weaker and can be modelled with simpler families or set to independence (truncation).
>
> **Computational complexity:** $O(d^2 n)$ for Kendall's $\tau$ estimation + $O(d^2 \log d)$ for MST (Prim's algorithm). Sequential over $d-1$ trees, so total is $O(d^3 n / d) = O(d^2 n)$ approximately. Feasible for $d \leq 50$ with modern software.
^thm-dissmann

> [!definition] Truncated R-vine
> A **truncated vine** of order $T^*$ sets all pair copulas in trees $T_k, k > T^*$, to the **independence copula** (i.e. $c_{ij|\mathbf{v}} = 1$ for $k > T^*$). This reduces the number of free pair copulas from $\binom{d}{2}$ to:
> $$\sum_{k=1}^{T^*}(d-k) = T^* d - \frac{T^*(T^*+1)}{2}$$
> For large $d$ with $T^*=2$: $2d-3$ pair copulas instead of $d(d-1)/2$.
>
> **Truncation criterion:** Fit the MST algorithm and stop when the average $|\hat\tau|$ of the remaining eligible pairs drops below a threshold (often 0.05 or the value at which AIC/BIC stops improving). Nagler et al. (2019) show that truncation is appropriate when higher-tree pair copulas are empirically close to independence.
^def-truncation

> [!definition] Family selection for each pair copula
> Given a fixed pair $(i,j)|\mathbf{v}$, choose the bivariate copula family by:
> 1. Compute pseudo-observations $(v_{i|\mathbf{v}}, v_{j|\mathbf{v}})$ from h-function recursion.
> 2. Fit each candidate family by MLE (or Kendall's $\tau$ inversion for speed).
> 3. Select the family minimising **AIC** or **BIC** over all candidates.
>
> Standard candidate set in VineCopula: Gaussian, Student-$t$, Clayton (+ rotations 90°, 180°, 270°), Gumbel (+ rotations), Frank, Joe (+ rotations), BB1, BB6, BB7, BB8 (+ rotations) — 40+ families. Rotations cover all four tail regions.
^def-family-selection

## Examples

> [!example] MST structure selection for 4 variables
> Suppose $|\hat\tau|$ values:
>
> | Pair | $|\hat\tau|$ |
> |------|------------|
> | (1,2) | 0.65 |
> | (1,3) | 0.40 |
> | (1,4) | 0.25 |
> | (2,3) | 0.55 |
> | (2,4) | 0.30 |
> | (3,4) | 0.15 |
>
> **MST of $T_1$:** Maximum spanning tree selects edges $(1,2)$, $(2,3)$, $(1,3)$... wait — spanning tree needs $d-1=3$ edges on 4 nodes with no cycles. Kruskal: add $(1,2), (2,3), (1,4)$ — total weight 0.65+0.55+0.25=1.45 ✓ (edge (1,3) would create a cycle).
>
> $T_1$ path: 4-1-2-3 with edges $(1,4),(1,2),(2,3)$. Fit $c_{14}, c_{12}, c_{23}$.
>
> **Eligible for $T_2$:** edges of $T_1$ sharing a node: $(1,4)$ and $(1,2)$ share node 1 → conditional pair $(4,2)|1$; $(1,2)$ and $(2,3)$ share node 2 → conditional pair $(1,3)|2$. Compute pseudo-observations, estimate $|\hat\tau_{42|1}|$ and $|\hat\tau_{13|2}|$; select both in MST of 3-node path.
>
> **$T_3$:** one eligible pair $(4,3)|1,2$. Fit $c_{43|12}$.

## Connections

- [[Vine Copulas - Overview]] — overview of vine copulas and the pair copula decomposition.
- [[C-Vine and D-Vine Structures]] — the two canonical special-case structures that the MST algorithm may or may not select.
- [[Pair Copula Decomposition]] — h-functions used to compute pseudo-observations at each tree level.
- [[Vine Copula Estimation and Software]] — `RVineStructureSelect` implements Dissmann's algorithm; R-vine matrix is the software interface.
- [[Multi-Factor and Block Dependence Structures]] — contrast: factor copulas select a parsimonious factor graph by industry/sector; vine structure selection is fully data-driven.

## See Also

- [[SMM Estimation of Factor Copulas]] — factor copulas use SMM (moment-based) rather than sequential MLE for parameter estimation.
- [[../_Index|Econometrics]]
