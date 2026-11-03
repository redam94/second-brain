---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-Frigessi-Bakken-2009-Pair-Copula-Constructions.md]]"
source_location: "Sec. 2.1-2.2, pp. 183-185"
date_ingested: 2026-11-03
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Decomposition]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - regular vine
  - R-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> A **vine** is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ whose edges specify which bivariate (conditional) copulas appear in the density decomposition. The **C-vine** (canonical vine) has one root node per tree connected to all others — capturing a "hub-and-spoke" dependence structure driven by one key variable. The **D-vine** (drawable vine) forms a path per tree — capturing serial or chain dependence where each variable mediates the relationship between its neighbours. Both are special cases of the general **R-vine** (regular vine). The choice of structure is a model selection decision (see [[Vine Copula Estimation and Selection]]).

## Overview

The vine structure is the scaffolding that organises the *d(d-1)/2* pair-copulas in a *d*-dimensional density decomposition. Different vines give different decompositions — all mathematically valid, but implying different interpretations of conditional independence. The number of possible R-vines grows super-exponentially with *d* ($(d!/2) \cdot \prod_{k=0}^{d-2} 2^{\binom{k}{2}}$ for *d* > 2), making exhaustive search infeasible beyond *d* ≈ 5. C- and D-vines are the two canonical sub-classes with structured tree geometries that permit efficient sequential estimation.

## Main Content

> [!definition] Regular vine (R-vine) — Bedford & Cooke (2002)
> A **regular vine** $\mathcal{V}$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:
> 1. **$T_1$** has nodes $\{1, 2, \ldots, d\}$ and edges $E_1 \subseteq \binom{[d]}{2}$.
> 2. **$T_j$** (for $j \geq 2$) has node set = edge set of $T_{j-1}$: $N_j = E_{j-1}$.
> 3. **Proximity condition:** Two nodes in $T_j$ are connected by an edge only if the corresponding edges in $T_{j-1}$ **share exactly one element** (i.e. $|a \triangle b| = 2$ where $\triangle$ denotes symmetric difference). This ensures the conditioning sets are well-defined.
>
> Each edge $(i,j|D) \in E_\ell$ specifies one pair-copula $c_{ij|D}$: the bivariate copula of $X_i$ and $X_j$ conditional on $\mathbf{X}_D$.
^def-r-vine

> [!definition] C-vine (canonical vine)
> A C-vine is an R-vine where **each tree $T_j$ has one node (the root) that is connected to all others**:
> - $T_1$: root $X_1$ connected to $X_2, X_3, \ldots, X_d$ — gives $d-1$ edges $\{(1,2), (1,3), \ldots, (1,d)\}$.
> - $T_2$: root $X_2$ connected to $X_3, X_4, \ldots, X_d$ conditional on $X_1$ — gives $d-2$ edges.
> - $T_j$: root $X_j$ connected to $X_{j+1}, \ldots, X_d$ conditional on $X_1, \ldots, X_{j-1}$.
>
> **Structure:** Each tree $T_j$ is a **star graph** with the root node of degree $d - j$.
>
> **Intuition:** C-vines are appropriate when one variable (the root at each level) is a "central" variable that drives dependence with all others. The root variable at tree 1 has the most influence on the joint distribution — it enters *every* pair-copula in $T_1$. This makes C-vines natural for financial applications with a market factor (e.g. the S&P 500 index), or for epidemiological studies with a shared environmental driver.
>
> **Parameters:** $C_j$ pair-copulas in tree $T_j$, so $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$ total.
^def-c-vine

> [!definition] D-vine (drawable vine)
> A D-vine is an R-vine where **each tree $T_j$ is a path (a chain)**:
> - $T_1$: path $1 - 2 - 3 - \cdots - d$ — gives $d-1$ edges $\{(1,2), (2,3), \ldots, (d-1,d)\}$.
> - $T_2$: path $\{1,2\} - \{2,3\} - \{3,4\} - \cdots$ with conditioning set $\{2\}$, $\{3\}$, etc.
> - No node in $T_j$ has degree greater than 2.
>
> **Structure:** Each tree $T_j$ is a **path graph**.
>
> **Intuition:** D-vines are natural for **time series** or any data with a sequential ordering (e.g. the autocorrelation of daily returns where yesterday's return is most relevant, the day-before's is next, etc.). The pair-copula at lag $j$ captures the dependence between $X_t$ and $X_{t+j}$ after conditioning on $X_{t+1}, \ldots, X_{t+j-1}$.
>
> **Parameters:** $d-j$ pair-copulas in tree $T_j$, so $d(d-1)/2$ total (same as C-vine).
^def-d-vine

> [!definition] C-vine vs D-vine: 4-dimensional example
> With $d = 4$ variables, both structures yield $4 \cdot 3/2 = 6$ pair-copulas:
>
> **C-vine** (root order $1, 2, 3$):
> ```
> T₁:  1─2  1─3  1─4   (star: node 1 is root)
> T₂:  2─3|1  2─4|1    (star: node 2 is root, conditioning on 1)
> T₃:  3─4|1,2          (single edge)
> ```
> Pair-copulas: $c_{12}$, $c_{13}$, $c_{14}$, $c_{23|1}$, $c_{24|1}$, $c_{34|12}$
>
> **D-vine** (order $1, 2, 3, 4$):
> ```
> T₁:  1─2  2─3  3─4   (path)
> T₂:  1─3|2  2─4|3    (path, conditioning on middle variable)
> T₃:  1─4|2,3          (single edge)
> ```
> Pair-copulas: $c_{12}$, $c_{23}$, $c_{34}$, $c_{13|2}$, $c_{24|3}$, $c_{14|23}$
^def-4d-example

> [!definition] R-vine and when to use it
> A **regular vine** that is neither a C-vine nor a D-vine allows **mixed tree structures**: some trees are stars, others are paths, others are intermediate. The general R-vine is specified by a **vine array** or **R-vine matrix** — a $d \times d$ upper triangular matrix encoding the tree structure (Dissman et al. 2013, implemented in `VineCopula` and `pyvinecopulib`).
>
> **When to use R-vines:** When domain knowledge suggests neither a central key variable (C-vine) nor a serial ordering (D-vine). Model selection via maximum spanning tree at each tree level selects the structure from data.
^def-r-vine-general

## Comparison Table

| Feature | C-vine | D-vine | R-vine |
|---|---|---|---|
| **Tree structure** | Star at each level | Path at each level | General (mixed) |
| **Degree constraint** | Root has degree $d-j$ | Max degree 2 | Max degree $d-j$ |
| **Natural for** | Central "key" variable, financial factor | Serial dependence, time series | General dependence |
| **Estimation** | Sequential MLE via h-functions | Sequential MLE via h-functions | Sequential MLE (more complex) |
| **Model selection** | Choose root ordering | Choose variable ordering | Max spanning tree algorithm |
| **Software** | `VineCopula::CVineMatrix()` | `VineCopula::DVineMatrix()` | `VineCopula::RVineStructureSelect()` |

## Examples

> [!example] C-vine for stock returns with a market factor
> **Setup:** $d = 5$ assets: market index (variable 1) + 4 stocks. The market index dominates dependence.
> **C-vine choice:** Fix variable 1 as root in $T_1$. The pair-copulas $c_{12}, c_{13}, c_{14}, c_{15}$ capture each stock's dependence with the market; the conditional copulas $c_{23|1}, c_{24|1}, \ldots$ capture idiosyncratic co-dependence after removing market exposure.
> **Advantage over factor copula:** Each market-stock pair can have its own copula family (e.g. asymmetric Clayton for defensive stocks, Gumbel for growth stocks); factor copulas force all stocks to share the same bivariate family.

> [!example] D-vine for an AR(1)-type temporal dependence
> **Setup:** $d = 5$ consecutive daily log-returns. The autocorrelation structure decays with lag.
> **D-vine choice:** Variable ordering $1, 2, 3, 4, 5$ (time order). Tree $T_1$ captures lag-1 dependence ($c_{12}, c_{23}, c_{34}, c_{45}$); tree $T_2$ captures lag-2 dependence after conditioning on the intermediate day ($c_{13|2}, c_{24|3}, c_{35|4}$); etc.
> **Advantage:** Naturally encodes the decaying dependence structure of time series; conditional copulas at higher tree levels are often near-independence (can be replaced with independence copula), achieving parsimony.

## Connections

- [[Vine Copulas - Overview]] — motivation and context.
- [[Pair-Copula Decomposition]] — the density formula that C- and D-vine structures organise.
- [[Vine Copula Estimation and Selection]] — how to choose between C-vine, D-vine, and R-vine; sequential MLE algorithm.
- [[Factor Copulas - Overview]] — alternative architecture; the C-vine's root variable plays a role analogous to the common factor in a factor copula.
- [[Multi-Factor and Block Dependence Structures]] — block structure in factor copulas parallels industry-structured vine trees.

## See Also

- Bedford & Cooke (2001) — original regular vine definition.
- Aas et al. (2009) — C-vine and D-vine density formulas and estimation.
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas*, Ch. 3–5 — full vine matrix representation.
- `VineCopula` R package — `RVineStructureSelect()`, `CVineMatrix()`, `DVineMatrix()`.
- `pyvinecopulib` Python package — the modern Python alternative.
- [[../_Index|Econometrics]]
