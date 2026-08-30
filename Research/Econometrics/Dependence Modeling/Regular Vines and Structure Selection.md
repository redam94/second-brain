---
title: Regular Vines and Structure Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Czado-2019-Vine-Copulas.md]]"
source_location: "Czado (2019) Ch. 4–6; Dissmann et al. (2013) Computational Statistics & Data Analysis 59:52–69"
date_ingested: 2026-08-30
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair-Copula Decomposition]]"
used_by:
  - "[[Vine Copula Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - R-vine
  - regular vine
  - vine matrix
  - Dissmann algorithm
  - RVM
  - truncated vine
---

# Regular Vines and Structure Selection

> [!summary]
> A **regular vine (R-vine)** is the most general vine copula structure — it extends C- and D-vines to allow any valid tree sequence, not just stars or paths. The vine structure is encoded in an upper-triangular **RVine matrix** (RVM). Dissmann et al. (2013) provide the standard greedy algorithm for structure selection: at each tree level, choose the maximum spanning tree by Kendall's $\tau$. **Truncation** (setting higher-level pair copulas to independence) dramatically reduces model complexity for high-dimensional applications.

## Overview

The 3D example from [[C-Vine and D-Vine Structures]] admits only a handful of valid vine structures. In $d = 10$ dimensions, there are $\sim 10^{10}$ valid R-vine structures, far too many to compare exhaustively. Dissmann et al. (2013) address this by providing:
1. The **vine matrix (RVM)** — a compact encoding of any R-vine structure
2. A **greedy maximum spanning tree** algorithm — selects the structure that maximises dependence captured at each level
3. **Truncation** — sets all pair copulas at trees deeper than a threshold $m$ to independence

These tools make R-vine models practical for dimensions up to $d \sim 50$ and, with truncation, for $d$ into the hundreds.

## Main Content

> [!definition] Regular vine (R-vine)
> A **regular vine** on $d$ variables is a sequence of trees $V = (T_1,\dots,T_{d-1})$ where:
> 1. $T_1$ is a connected tree with node set $\{1,\dots,d\}$ and $d-1$ edges.
> 2. For $j \geq 2$: $T_j$ has node set equal to the edge set of $T_{j-1}$, and two nodes in $T_j$ are connected by an edge only if the corresponding edges in $T_{j-1}$ share a common node (**proximity condition**).
>
> A C-vine is a regular vine where every $T_j$ is a star; a D-vine is a regular vine where every $T_j$ is a path. A general R-vine allows any connected tree at each level, subject to the proximity condition.
^def-rvine

> [!definition] Vine matrix (RVM)
> The vine matrix is an upper-triangular $d\times d$ matrix (Dißmann et al. 2013; Czado 2019) that encodes the complete R-vine structure:
> - **Diagonal** $M_{kk} = $ the conditioned variable in tree $T_{d-k+1}$ for edge identified by column $k$.
> - **Column $k$, row $j < k$**: the "conditioning tree" structure.
> - The conditioning set for edge in column $k$, row $j$ is read from entries $M_{j+1,k}, M_{j+2,k},\dots,M_{k-1,k}$.
>
> Once the RVM is specified, the complete H-function recursion for evaluating the density and simulating from the vine is determined algorithmically.
>
> **Example (d=4 D-vine, order 1-2-3-4):**
> $$M = \begin{pmatrix} 1 & 1 & 1 & \cdot \\ \cdot & 2 & 2 & \cdot \\ \cdot & \cdot & 3 & \cdot \\ \cdot & \cdot & \cdot & 4 \end{pmatrix}$$
> (upper triangle; the diagonal reads off the variable ordering in reverse).
^def-rvm

> [!definition] Dissmann greedy structure selection
> **Dissmann et al. (2013)** propose selecting the R-vine structure sequentially, tree by tree:
>
> **Algorithm:**
> 1. Compute Kendall's $\tau$ for all $\binom{d}{2}$ pairs from the data (pseudo-observations).
> 2. **Tree $T_1$:** Select the **maximum spanning tree** with edge weights $|\hat\tau_{ij}|$ — the spanning tree that maximises $\sum_{(i,j)\in T_1} |\hat\tau_{ij}|$. (Uses Prim's or Kruskal's algorithm; $O(d^2)$.)
> 3. For each edge $(i,j)$ in $T_1$: estimate the pair copula $c_{ij}(\hat\theta_{ij})$ by the family-selection procedure.
> 4. **Tree $T_2$:** Compute pseudo-observations for each node (edge of $T_1$) using the h-function transform. Compute Kendall's $\tau$ for each possible edge (respecting proximity condition). Select maximum spanning tree.
> 5. Repeat until $T_{d-1}$.
>
> **Motivation:** Kendall's $\tau$ measures association strength; maximising it at each level ensures the most important pair-copula dependences are captured first. Higher-level pair copulas with near-zero $\tau$ are candidates for truncation.
^def-dissmann

> [!definition] Pair copula family selection
> At each edge $(i,j|\mathbf{D})$, the pair copula family is selected by fitting a candidate set of families (Normal, Student-$t$, Clayton, Clayton 90°, Clayton 180°, Clayton 270°, Gumbel, Gumbel 90°, Gumbel 180°, Gumbel 270°, Frank, Joe, BB1, BB7, ...) and choosing the one minimising AIC or BIC:
> $$\text{AIC}_{ij|\mathbf{D}} = -2\ell_{ij|\mathbf{D}}(\hat\theta) + 2p$$
> where $p$ is the number of parameters (1 for most families, 2 for $t$, BB1, BB7).
>
> **Standard family set:** `{Normal, t, Clayton, Gumbel, Frank, Joe}` plus 90°, 180°, 270° rotations of Clayton, Gumbel, Joe (for lower/upper/mixed tail dependence). The rotation of a copula $C(u,v)$ by 90° gives $u - C(1-v,u)$; by 180° gives $u+v-1+C(1-u,1-v)$ (survival copula); by 270° gives $v - C(v,1-u)$.
^def-family-selection

> [!definition] Vine truncation
> A **truncated vine of order $m$** sets all pair copulas at trees $T_{m+1},\dots,T_{d-1}$ to the **independence copula** ($c = 1$). This reduces the number of estimated pair copulas from $d(d-1)/2$ to:
> $$m(d-1) - m(m-1)/2 = \sum_{\ell=1}^{m}(d-\ell)$$
> Truncation is justified when the higher-level pair copulas are close to independence — as indicated by Kendall's $\tau$ near zero or AIC/BIC favouring the independence copula.
>
> **AIC-based truncation:** At each tree level $\ell$, test whether the selected pair copulas improve over independence (AIC of pair copula vs AIC of independence = $0$). Stop when no improvement is found.
>
> **Practical impact:** For $d = 50$, a vine of order 2 has only $2(49) - 1 = 97$ pair copulas vs $50 \times 49/2 = 1225$ for the full vine — a 12× parameter reduction.
^def-truncation

## Examples

> [!example] Structure selection in R: rvinecopulib workflow
> ```r
> library(rvinecopulib)
> 
> # Fit an R-vine copula to data (pseudo-observations)
> u <- pobs(data)  # probability integral transform to [0,1]^d
> 
> # Automatic structure + family selection
> fit <- vinecop(u, family_set = c("parametric"), 
>                structure = NA,   # automatic Dissmann selection
>                selcrit = "aic",  # AIC-based family selection
>                trunc_lvl = 3)    # truncate at tree level 3
> 
> # View selected structure
> summary(fit)
> plot(fit, tree = 1:3)   # plot first 3 tree levels
> 
> # Simulate from fitted vine
> u_sim <- rvinecop(n = 1000, fit)
> ```
> The `vinecop()` function implements Dissmann's algorithm internally; `trunc_lvl` fixes the truncation depth.

> [!example] Reading a vine matrix
> For the 4-dimensional C-vine with root order $X_4, X_3, X_2, X_1$:
> $$M = \begin{pmatrix} 4 & 4 & 4 \\ & 3 & 3 \\ & & 2 \\ & & & 1 \end{pmatrix}$$
> - Edge in column 2, row 1 (from top): pair copula $c_{4,3}$ (variables 4 and 3, empty conditioning set).
> - Edge in column 3, row 1: pair copula $c_{4,2}$.
> - Edge in column 3, row 2: pair copula $c_{3,2|4}$ (conditioning on 4).

## Connections

- [[C-Vine and D-Vine Structures]] — special cases of R-vine: C-vine = all-star R-vine; D-vine = all-path R-vine.
- [[Pair-Copula Decomposition]] — the h-function recursion used at each tree level; the vine matrix determines the recursion order.
- [[Vine Copula Estimation]] — Dissmann's sequential structure selection is embedded in sequential estimation.
- [[Copula Architecture Comparison]] — R-vine's flexibility vs factor copula's parsimony.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the weight in Dissmann's maximum spanning tree.

## See Also

- [[SMM Estimation of Factor Copulas]] — the SMM alternative for high-dimensional ($d > 100$) dependence; vine copulas struggle in this regime.
- [[../_Index|Econometrics]]
