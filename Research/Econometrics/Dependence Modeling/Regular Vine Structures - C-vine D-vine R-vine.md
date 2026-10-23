---
title: Regular Vine Structures - C-vine D-vine R-vine
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/vine-copulas-sources.md]]"
source_location: "Bedford & Cooke (2002); Aas et al. (2009), Sec. 2; Dissmann et al. (2013), Sec. 2"
date_ingested: 2026-10-23
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and PCC Density]]"
used_by:
  - "[[Vine Copula Model Selection and Estimation]]"
aliases:
  - regular vine
  - C-vine
  - D-vine
  - R-vine
  - canonical vine
  - drawable vine
---

# Regular Vine Structures: C-vine, D-vine, R-vine

> [!summary]
> A **regular vine** $\mathcal{V}$ is the graphical structure that determines which bivariate copulas appear in a PCC decomposition. It is a sequence of $n-1$ trees, with each tree's nodes being the *edges* of the previous tree (the "proximity condition"). **C-vines** (star-shaped trees) are suited when one variable dominates the dependence structure; **D-vines** (path-shaped trees) are natural for ordered data such as time series. **R-vines** are the general class. Dissmann et al. (2013) provide the R-vine matrix representation and automated selection algorithms.

## Overview

The pair copula construction decomposes the joint density into $\binom{n}{2}$ bivariate copula densities. But *which* pairs of variables link at each tree level — and which variables appear in the conditioning set — is not fixed. A **regular vine** is the graphical object that encodes this choice. Different regular vine structures produce different decompositions of the same joint density (non-uniqueness).

## Main Content

### Vine trees and the proximity condition

A regular vine on $n$ variables has $n-1$ trees:

> [!definition] Regular Vine (Bedford & Cooke 2002, Def. 4.1)
> A **regular vine** $\mathcal{V} = (T_1, T_2, \ldots, T_{n-1})$ on $n$ variables satisfies:
> 1. **$T_1$**: nodes $N_1 = \{1,\ldots,n\}$; edges $E_1 \subseteq \binom{N_1}{2}$; $T_1$ is a *tree* (connected, no cycles) so $|E_1| = n-1$.
> 2. **$T_k$ for $k \geq 2$**: nodes $N_k = E_{k-1}$ (the edges of tree $T_{k-1}$); edges $E_k$; $T_k$ is a tree.
> 3. **Proximity condition**: Two nodes $\mathbf{a}, \mathbf{b} \in N_k = E_{k-1}$ can be connected by edge $(\mathbf{a}, \mathbf{b}) \in E_k$ only if $|\mathbf{a} \cap \mathbf{b}| = k-1$ (they share exactly $k-1$ variable indices, differing in exactly one).
>
> Each edge $e = (\mathbf{a}, \mathbf{b}) \in E_k$ is labeled by a **conditioned set** $\{j(e), k(e)\} = \mathbf{a} \triangle \mathbf{b}$ (the two unique variables) and a **conditioning set** $D(e) = \mathbf{a} \cap \mathbf{b}$ (the shared variables). The pair copula for edge $e$ is $c_{j(e),k(e)|D(e)}$.
^def-regular-vine

The proximity condition ensures that the conditioning set $D(e)$ for any edge $e$ in tree $T_k$ has exactly $k-1$ variables, and that the factorization is valid (each conditional independence structure is achievable).

### C-vine (canonical vine)

> [!definition] C-vine (Aas et al. 2009, Sec. 2.2)
> A **C-vine** (canonical vine) is a regular vine in which each tree $T_k$ has a single root node connected to all other nodes (**star topology**). In tree $T_k$, the root has $n-k$ edges.
>
> *Structure*: In tree $T_1$, variable $j_1$ connects to all others ($n-1$ edges). In tree $T_2$, the node $\{j_1, j_2\}$ connects to all remaining nodes. And so on.
>
> *Pair copulas*: The pair copula at tree $T_k$ involving root variable $j_k$ are:
> $$c_{j_k,\, i\,|\, j_1,\ldots,j_{k-1}}(F(x_{j_k}|x_{j_1},\ldots,x_{j_{k-1}}),\, F(x_i|x_{j_1},\ldots,x_{j_{k-1}}))$$
> for all $i \notin \{j_1,\ldots,j_k\}$.
>
> *Number of parameters*: $\binom{n}{2}$ pair copulas (same as D-vine and R-vine, but structured differently).
^def-cvine

**When to use C-vine**: C-vines are natural when one or a small number of "key variables" drive the dependence structure. For example, in finance, a market index might drive the dependence between all individual assets; a C-vine places this variable as the root. The roots are chosen by maximising total dependence (e.g., the sum of $|\hat\tau_{j_k, i}|$ over all non-root $i$).

### D-vine (drawable vine)

> [!definition] D-vine (Aas et al. 2009, Sec. 2.1)
> A **D-vine** (drawable vine) is a regular vine in which each tree $T_k$ is a **path** — each node has degree at most 2.
>
> *Structure*: In tree $T_1$, the nodes $1, 2, \ldots, n$ are connected in a path: edge $(1,2)$, edge $(2,3)$, ..., edge $(n-1, n)$.
>
> *Pair copulas*: At tree level $\ell$, pair copula $(i, i+\ell | i+1, \ldots, i+\ell-1)$ appears for $i = 1, \ldots, n-\ell$:
> $$c_{i,i+\ell|i+1,\ldots,i+\ell-1}(F(x_i|x_{i+1},\ldots,x_{i+\ell-1}),\, F(x_{i+\ell}|x_{i+1},\ldots,x_{i+\ell-1}))$$
^def-dvine

**When to use D-vine**: D-vines are natural for **ordered data** (time series, spatial data) where variable $i$ is most directly related to variable $i+1$. In a time-lagged panel, observations at adjacent lags are paired first. The ordering of variables in the D-vine determines the path structure and affects the pair copulas at higher trees.

### R-vine (regular vine)

> [!definition] R-vine (Dissmann et al. 2013)
> A **regular vine (R-vine)** is any vine satisfying the regular vine definition — it encompasses both C-vines and D-vines as special cases. A general R-vine allows any spanning tree at each level, subject only to the proximity condition.
>
> *Counting*: For $n$ variables, the number of distinct labeled R-vines grows as $\prod_{k=1}^{n-2} \binom{n-k-1+1}{1}^{n-k-1}$ — super-exponential. For $n=4$: 24 distinct R-vines; $n=5$: 240. This makes exhaustive search infeasible for $n \geq 6$.
^def-rvine

### R-vine matrix representation

Dissmann et al. (2013) represent any R-vine structure as an upper-triangular integer matrix $M \in \mathbb{Z}^{n \times n}$:

> [!definition] R-vine Matrix
> The $n \times n$ upper triangular matrix $M$ encodes the R-vine structure as follows:
> - Column $k$ (from right to left) encodes the edges of tree $T_{n-k}$.
> - Diagonal entry $M_{kk}$ is the root node of tree $T_{n-k}$.
> - Entry $M_{ik}$ for $i < k$ gives the conditioning variable unique to edge $i$ in tree $T_{n-k}$.
>
> *Example* ($n = 4$, D-vine with ordering $1-2-3-4$):
> $$M = \begin{pmatrix} 1 & 1 & 1 & 1 \\ & 2 & 2 & 2 \\ & & 3 & 3 \\ & & & 4 \end{pmatrix}$$
>
> This matrix representation is used by the **VineCopula** R package and **pyvinecopulib** Python package for compact storage and efficient likelihood computation.
^def-rvine-matrix

### Truncated vines

> [!definition] Truncated Vine (Brechmann et al. 2012)
> A vine is **truncated at level $k$** if all pair copulas in trees $T_{k+1}, \ldots, T_{n-1}$ are set to the **independence copula** (i.e., those $C_{j,l|D} = \Pi$ where $\Pi(u,v) = uv$).
>
> *Effect*: The number of estimated pair copulas reduces from $\binom{n}{2}$ to $kn - k(k+1)/2$. Most dependence is captured in lower-level trees; truncation is appropriate when partial autocorrelations at high lags are negligible.
>
> *Selection*: Truncation level is selected by testing each tree's pair copulas for significant departure from independence (likelihood ratio test per edge or information criterion for the whole tree).
^def-truncated-vine

### Counting vine structures

| $n$ | C-vine structures | D-vine structures | All R-vines |
|---|---|---|---|
| 3 | 3 | 3 | 3 |
| 4 | 24 | 24 | 24 |
| 5 | 60 | 60 | 240 |
| 6 | 360 | 360 | 3,840 |
| 10 | 181,440 | 181,440 | $\approx 3.2 \times 10^{10}$ |

For $n \geq 6$ exhaustive search over R-vine structures is infeasible; the MST greedy algorithm (see [[Vine Copula Model Selection and Estimation]]) is the standard approach.

## Examples

> [!example] 4-variable vine structures
> **Setup:** Variables $\{1, 2, 3, 4\}$.
>
> **D-vine $(1-2-3-4)$:**
> - Tree $T_1$: edges $(1,2)$, $(2,3)$, $(3,4)$.
> - Tree $T_2$: nodes $\{1,2\}$, $\{2,3\}$, $\{3,4\}$; edges $(\{1,2\}, \{2,3\}) = (1,3|2)$ and $(\{2,3\}, \{3,4\}) = (2,4|3)$.
> - Tree $T_3$: nodes $\{1,3|2\}$, $\{2,4|3\}$; edge $(\{1,3|2\}, \{2,4|3\}) = (1,4|2,3)$.
> - Pair copulas: $c_{12}$, $c_{23}$, $c_{34}$, $c_{13|2}$, $c_{24|3}$, $c_{14|23}$.
>
> **C-vine (root sequence $1 \to 2 \to 3$):**
> - Tree $T_1$: star at node 1; edges $(1,2)$, $(1,3)$, $(1,4)$.
> - Tree $T_2$: star at node $\{1,2\}$; edges $(2,3|1)$, $(2,4|1)$.
> - Tree $T_3$: node $\{1,3|2\}$; edge $(3,4|1,2)$.
> - Pair copulas: $c_{12}$, $c_{13}$, $c_{14}$, $c_{23|1}$, $c_{24|1}$, $c_{34|12}$.

## Connections

- [[Vine Copulas - Overview]] — overview and positioning of vine copulas.
- [[Pair Copula Construction and PCC Density]] — the density formula and h-function that use the vine structure.
- [[Vine Copula Model Selection and Estimation]] — MST algorithm selects the vine structure from data.
- [[Factor Copula Construction]] — contrasting approach: uses a latent factor structure rather than conditional independence trees.
- [[Directed Acyclic Graphs]] — vine trees encode conditional independence but through a different graphical language than DAGs (vines are undirected; DAGs are directed).

## See Also

- [[raw/vine-copulas-sources.md]] — Bedford & Cooke (2002) and Dissmann et al. (2013) formal statements
