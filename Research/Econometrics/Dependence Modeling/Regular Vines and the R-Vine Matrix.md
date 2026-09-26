---
title: "Regular Vines and the R-Vine Matrix"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "Bedford & Cooke (2001, 2002); Dissmann, Brechmann, Czado & Kurowicka (2013)"
source_location: "Bedford & Cooke (2001) §2-4; Dissmann et al. (2013) §2-3, pp. 52-61 [arXiv:1202.2002]"
date_ingested: 2026-09-26
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - R-vine
  - regular vine copula
  - R-vine matrix
  - vine matrix
  - Bedford Cooke vine
  - Dissmann vine selection
---

# Regular Vines and the R-Vine Matrix

> [!summary]
> A **regular vine** (R-vine) is the most general graphical framework for pair-copula constructions, introduced by Bedford & Cooke (2001, 2002). It encompasses C-vines and D-vines as special cases. An R-vine on $d$ variables is a sequence of $d-1$ linked trees satisfying the **proximity condition**: two edges can be adjacent in tree $T_{\ell+1}$ only if they share exactly one node in $T_\ell$. Dissmann et al. (2013) introduced the **R-vine matrix** — an upper-triangular integer matrix encoding the complete tree structure — and a greedy **maximum spanning tree (MST)** algorithm for automatic model selection. The `VineCopula` R package and `rvinecopulib` implement this framework.

## Overview

The C-vine and D-vine impose strong structural constraints on the tree sequence (star vs. path at each level). The **regular vine** relaxes these constraints to allow any tree topology consistent with the proximity condition. This matters because empirical data may exhibit "hub" relationships for some pairs but "chain" structures for others — a mixed topology that neither pure C-vine nor pure D-vine captures.

The R-vine is specified by:
1. **Tree sequence $T_1,\ldots,T_{d-1}$** — the graphical structure.
2. **Copula families** — the bivariate family for each edge.
3. **Copula parameters** — one or more parameters per edge.

The **R-vine matrix** compresses all three pieces of the tree structure into a single $d\times d$ upper-triangular matrix, enabling efficient software implementation.

## Main Content

> [!definition] Regular vine (Bedford & Cooke)
> A **regular vine** $\mathcal{V}$ on variables $\{1,\ldots,d\}$ is a sequence of trees $T_1,\ldots,T_{d-1}$ where:
> 1. $T_1 = (N_1, E_1)$ is a tree with node set $N_1 = \{1,\ldots,d\}$ and $|E_1| = d-1$ edges.
> 2. For $\ell = 2,\ldots,d-1$: $T_\ell = (N_\ell, E_\ell)$ is a tree with **node set $N_\ell = E_{\ell-1}$** (edges of the previous tree become nodes of the next).
> 3. **Proximity condition:** for two nodes $a,b\in N_\ell$ to be connected by an edge in $E_\ell$, the corresponding edges in $T_{\ell-1}$ must share exactly one element: $|a\cap b| = 1$ (where nodes of $T_\ell$ are identified with edges of $T_{\ell-1}$ which are 2-element sets of variable indices or conditioning sets).
>
> The C-vine satisfies the proximity condition with star topology at each level. The D-vine satisfies it with path topology. Any other topology satisfying the proximity condition is also a valid R-vine.
>
> **Conditioning set of an edge:** For edge $e = \{a,b\}$ in $T_\ell$ (where $a,b$ are edges of $T_{\ell-1}$), the **complete union** is $U(e) = a\cup b$ and the **conditioning set** is $\mathcal{D}(e) = a\cap b$ (the shared element). The pair copula for edge $e$ models the dependence between variables $U(e)\setminus\mathcal{D}(e) = \{j_e, k_e\}$ conditional on $\mathcal{D}(e)$.
> ^def-rvine

> [!definition] R-Vine matrix (Dissmann et al. 2013)
> An $d\times d$ upper-triangular matrix $\mathbf{M}$ with integer entries from $\{1,\ldots,d\}$ encodes an R-vine structure. The convention (lower-triangular, diagonal):
>
> - **Diagonal entry $M_{ii}$** = the variable labelling the node at tree level $i$.
> - **Entry $M_{ji}$ for $j < i$** = conditioning variable added when moving from tree $T_j$ to $T_{j+1}$ for the path involving the $i$-th variable.
> - The **conditioning set** of the pair copula at tree $\ell$ for variables $(M_{\ell\ell}, M_{i\ell})$ is $\{M_{1\ell}, M_{2\ell},\ldots,M_{(\ell-1)\ell}\}$.
>
> **Example: 4-variable D-vine with ordering $(1,2,3,4)$:**
> $$\mathbf{M} = \begin{pmatrix} 1 & 1 & 1 & 1 \\ & 2 & 2 & 2 \\ & & 3 & 3 \\ & & & 4 \end{pmatrix}$$
> - Column 4: pairs at each tree level are $(1,4|\{2,3\})$, $(2,4|\{3\})$, $(3,4|\{\})$.
> - Column 3: pairs are $(1,3|\{2\})$, $(2,3|\{\})$.
> - Column 2: pair is $(1,2|\{\})$.
>
> **Example: 4-variable C-vine with root $(1,2,3)$:**
> $$\mathbf{M} = \begin{pmatrix} 1 & 1 & 1 & 1 \\ & 2 & 1 & 1 \\ & & 3 & 1 \\ & & & 4 \end{pmatrix}$$
> The R-vine matrix is the standard input/output format of `RVineMatrix()` in `VineCopula`.
> ^def-rvine-matrix

> [!definition] MST-based model selection (Dissmann et al. 2013)
> When the vine structure is unknown, Dissmann et al. (2013) propose a greedy algorithm:
>
> 1. **Tree 1:** Build the complete graph on $\{1,\ldots,d\}$. Assign weight $w(i,j) = |\hat\tau_{ij}|$ (absolute Kendall's $\hat\tau$) to each edge. Find the **maximum weight spanning tree** $T_1^*$ using Prim's or Kruskal's algorithm.
>
> 2. **Tree $\ell$** ($\ell = 2,\ldots,d-1$): Construct the **proximity graph** $G_\ell$: nodes are edges of $T_{\ell-1}^*$; edges of $G_\ell$ connect pairs of $T_{\ell-1}^*$-edges that share exactly one node (proximity condition). Assign weight $w(a,b) = |\hat\tau_{j_e,k_e|\mathcal{D}_e}|$ — the Kendall's $\tau$ between the h-function-transformed pseudo-observations at this level. Find the MST.
>
> 3. **Repeat** through $T_{d-1}^*$.
>
> This puts the strongest bivariate dependencies at Tree 1, the strongest residual dependencies at Tree 2, etc. The algorithm is $O(d^2 \log d)$ in complexity.
>
> **Truncation:** After selecting $k$ trees, all remaining pair copulas are set to the **independence copula** $c=1$. A **truncated vine** of order $k$ uses only $k(d-1) - k(k-1)/2$ pair copulas instead of $d(d-1)/2$. The truncation level is selected by comparing AIC/BIC of truncated vs. untruncated models.
> ^def-mst-selection

> [!definition] Software: VineCopula and rvinecopulib
> The R package **VineCopula** (Dissmann et al., maintained by Nagler) implements:
> - `RVineMatrix()` — create/store vine structures.
> - `RVineCopSelect()` — select copula families and estimate parameters for a given structure.
> - `RVineStructureSelect()` — full structure + family + parameter selection via MST.
> - `RVineSim()` — simulate from a fitted vine.
> - `RVineLogLik()` — evaluate the vine log-likelihood.
>
> The C++ backend package **rvinecopulib** (Nagler & Vatter) provides faster implementations using the **vine copula library (vinecopulib)**:
> - Python interface: `pyvinecopulib`.
> - Handles continuous and discrete margins.
> - Supports Bayesian estimation, kernel-smoothed bivariate copulas, and truncated vines.
>
> Standard bivariate families available: Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, BB1, BB6, BB7, BB8, and their rotations. Rotations (90°, 180°, 270°) extend Archimedean families to different tail behaviours (e.g., rotated Clayton = upper tail dependence).
> ^def-software

## Examples

> [!example] 3-variable R-vine that is neither C-vine nor D-vine
> **Note:** In 3 dimensions, all R-vines are either a C-vine or a D-vine — the smallest dimension where distinct R-vine topologies appear is $d=4$. For $d=4$:
>
> **Mixed R-vine:** Tree 1 has edges $(1,2), (1,3), (3,4)$ (neither a star [that would need root connected to 2,3,4] nor a path). Tree 2 nodes are $\{(1,2),(1,3),(3,4)\}$; the only valid edges under proximity are $(1,2)-(1,3) = $ edge $(2,3|1)$ and $(1,3)-(3,4) = $ edge $(1,4|3)$. So Tree 2 has edges $(2,3|1)$ and $(1,4|3)$. Tree 3: edge $(2,4|1,3)$.
>
> **Structure:** This vine treats variable 3 as a hub for the $(1,4)$ pair but variable 1 as a hub for the $(2,3)$ pair — a mixed topology that C-vine and D-vine cannot represent simultaneously.

> [!example] Truncated vine for 20 financial returns
> **Setup:** $d=20$ equity returns; a full vine has $20\cdot19/2 = 190$ pair copulas.
>
> **Procedure:** Run MST to select $T_1,\ldots,T_5$; set Trees 6–19 to independence.
>
> **Result:** 85 pair copulas active (vs. 190 full vine), with AIC improvement over independence (tests at each tree level whether residual Kendall's $\tau$ is significantly non-zero). In practice, most empirical evidence of non-trivial dependence is exhausted after 3–5 trees for financial returns.

## Connections

- [[C-Vine and D-Vine Structures]] — special cases of the R-vine: C-vine = star topology at each tree, D-vine = path topology.
- [[Pair Copula Construction]] — the h-function evaluation that the R-vine matrix encodes and drives.
- [[Vine Copula Estimation and Model Selection]] — the MST algorithm selects the tree structure; the R-vine matrix representation enables sequential estimation.

## See Also

- [[SMM Estimation of Factor Copulas]] — factor copulas avoid the model selection problem by parameterising dependence as a common factor; vine copulas require structure selection.
- [[Factor Copulas - Overview]] — an alternative framework for $d\ge50$ where vine selection becomes burdensome.
- [[../_Index|Econometrics]]
