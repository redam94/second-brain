---
title: "C-vine and D-vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-PCC-Survey.md]]"
source_location: "Aas et al. (2009) §2.1–2.2, pp. 185–189; Czado (2019) Ch. 4–5"
date_ingested: 2026-07-09
date_updated: 2026-07-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine copula structure
---

# C-vine and D-vine Structures

> [!summary]
> The two canonical [[Pair Copula Construction|regular vine]] special cases are the **C-vine (Canonical vine)**, where each tree is a star graph with one root variable, and the **D-vine (Drawable vine)**, where each tree is a path graph. For $d$ variables both require exactly $d(d-1)/2$ pair copulas but impose different conditioning patterns: the C-vine conditions everything on one "hub" variable per level, while the D-vine conditions on a rolling window along a sequence. C-vines suit hub-and-spoke dependence (one driving variable); D-vines suit ordered sequences (time series, spatial data). Both are special cases of the general R-vine.

## Overview

Bedford & Cooke (2002) showed that the number of valid R-vine structures on $d$ variables is $d! \cdot 2^{\binom{d-1}{2}}$ — an astronomically large space for large $d$. The C-vine and D-vine are two interpretable, tractable extremes that cover a wide range of applications.

| Property | C-vine | D-vine |
|----------|--------|--------|
| Tree structure | Star at each level | Path at each level |
| Root per tree | One hub variable/edge | No hub |
| Conditioning pattern | Hub-centric | Sequential / rolling |
| Best for | One common driver | Ordered variables |
| # pair copulas | $d(d-1)/2$ | $d(d-1)/2$ |

## C-vine (Canonical Vine)

> [!definition] Definition: C-vine
> A **canonical vine (C-vine)** is an R-vine $\mathcal{V} = (T_1, \ldots, T_{d-1})$ where **every tree $T_k$ is a star graph**: one node (the **root**) is connected to all other nodes.
>
> - **$T_1$**: star with root $r_1 \in \{1, \ldots, d\}$; edges $(r_1, j)$ for all $j \neq r_1$.
> - **$T_2$**: star with root edge $(r_1, r_2)$ from $T_1$ (where $r_2$ is the next root choice); edges connect $(r_1, r_2)$ to $(r_1, j)$ for all $j \neq r_1, r_2$.
> - Continue inductively. Tree $T_k$ has $d-k$ edges.
^c-vine-definition

### C-vine for d=4 (Explicit Example)

Let variables be $\{1, 2, 3, 4\}$ with root ordering $1, 2, 3$.

**Tree $T_1$ — star with root 1:**

```
    2
    |
1 - 3
    |
    4
```

| Edge | Pair copula |
|------|------------|
| $(1,2)$ | $c_{12}(F_1(x_1), F_2(x_2))$ |
| $(1,3)$ | $c_{13}(F_1(x_1), F_3(x_3))$ |
| $(1,4)$ | $c_{14}(F_1(x_1), F_4(x_4))$ |

**Tree $T_2$ — star with root edge $(1,2)$:**

Nodes of $T_2$: $\{12, 13, 14\}$. Root = node $12$.

| Edge in $T_2$ | Conditioning set $D$ | Pair copula |
|---------------|----------------------|------------|
| $\{12, 13\}$ | $D = \{1\}$ | $c_{23|1}(F_{2|1}(x_2|x_1),\; F_{3|1}(x_3|x_1))$ |
| $\{12, 14\}$ | $D = \{1\}$ | $c_{24|1}(F_{2|1}(x_2|x_1),\; F_{4|1}(x_4|x_1))$ |

**Tree $T_3$ — single edge:**

Nodes: $\{23|1,\; 24|1\}$. Both share node $2$, so $D = \{1,2\}$.

| Edge | Pair copula |
|------|------------|
| $\{23|1,\; 24|1\}$ | $c_{34|12}(F_{3|12}(x_3|x_1,x_2),\; F_{4|12}(x_4|x_1,x_2))$ |

**Joint density:**
$$f(x_1, x_2, x_3, x_4) = \prod_{i=1}^4 f_i(x_i) \cdot c_{12}\, c_{13}\, c_{14} \cdot c_{23|1}\, c_{24|1} \cdot c_{34|12}$$

> [!example] When C-vine is natural
> Suppose $X_1$ is a market index return and $X_2, X_3, X_4$ are individual stock returns. All pairwise relationships are driven primarily by the common market factor $X_1$. The C-vine with root $X_1$ captures this hub-and-spoke structure: tree $T_1$ pairs each stock with the index directly; tree $T_2$ models residual dependence between stocks *after* controlling for the index; tree $T_3$ models deeper residual dependence. This is structurally analogous to a factor model with an **observed** factor.

## D-vine (Drawable Vine)

> [!definition] Definition: D-vine
> A **drawable vine (D-vine)** is an R-vine $\mathcal{V} = (T_1, \ldots, T_{d-1})$ where **every tree $T_k$ is a path graph**: nodes are connected in a line with each node having degree $\leq 2$.
>
> - **$T_1$**: path $\sigma(1) - \sigma(2) - \cdots - \sigma(d)$ for some ordering $\sigma$.
> - **$T_k$**: path connecting pairs of $T_{k-1}$ edges sharing a node; conditioning set grows as a rolling window.
^d-vine-definition

### D-vine for d=4 (Explicit Example)

**Tree $T_1$ — path $1 - 2 - 3 - 4$:**

| Edge | Pair copula |
|------|------------|
| $(1,2)$ | $c_{12}(F_1, F_2)$ |
| $(2,3)$ | $c_{23}(F_2, F_3)$ |
| $(3,4)$ | $c_{34}(F_3, F_4)$ |

**Tree $T_2$ — path $\{12\} - \{23\} - \{34\}$:**

Edges connect adjacent $T_1$-edges sharing a node:

| Edge in $T_2$ | Conditioning set | Pair copula |
|---------------|-----------------|------------|
| $\{12, 23\}$ | $D = \{2\}$ | $c_{13|2}(F_{1|2}(x_1|x_2),\; F_{3|2}(x_3|x_2))$ |
| $\{23, 34\}$ | $D = \{3\}$ | $c_{24|3}(F_{2|3}(x_2|x_3),\; F_{4|3}(x_4|x_3))$ |

**Tree $T_3$ — single edge:**

Nodes: $\{13|2,\; 24|3\}$. They share node $23$ in $T_2$, so $D = \{2, 3\}$.

| Edge | Pair copula |
|------|------------|
| $\{13|2,\; 24|3\}$ | $c_{14|23}(F_{1|23}(x_1|x_2,x_3),\; F_{4|23}(x_4|x_2,x_3))$ |

**Joint density:**
$$f(x_1, x_2, x_3, x_4) = \prod_{i=1}^4 f_i(x_i) \cdot c_{12}\, c_{23}\, c_{34} \cdot c_{13|2}\, c_{24|3} \cdot c_{14|23}$$

> [!example] When D-vine is natural
> Suppose $X_1, X_2, X_3, X_4$ are interest rate swap rates at maturities 1, 2, 5, and 10 years. Neighbouring maturities are most directly related ($c_{12}, c_{23}, c_{34}$); once these are controlled for, the remaining dependence is between maturities two steps apart ($c_{13|2}, c_{24|3}$); and finally the long-run residual ($c_{14|23}$). The D-vine's sequential conditioning mirrors the term-structure structure. Similarly, in a time series $X_t, t=1,\ldots,d$, a D-vine with the natural time ordering models decaying lag-$k$ dependence.

## Comparison of C-vine and D-vine

| Criterion | C-vine | D-vine |
|-----------|--------|--------|
| Tree $T_k$ structure | Star (hub-centric) | Path (sequential) |
| Conditioning pattern | All conditioned on root variable | Rolling window along path |
| Natural application | One variable drives all others | Natural ordering exists |
| Root selection | One key variable per level | Ordering of variables |
| # pair copulas | $d(d-1)/2$ | $d(d-1)/2$ |
| Parameter count | Identical | Identical |
| Interpretability | High (hub = common factor) | High (sequential lag structure) |
| Connection to factor models | Close: root ≈ observed factor | Less direct |

**Note on R-vines:** When neither a hub variable nor a natural ordering exists, the general R-vine (selected via the [[Vine Copula Estimation and Model Selection#Dissmann|Dissmann algorithm]]) fits any tree structure. R-vines are more flexible but harder to interpret.

## Structure Selection for C-vine and D-vine

For C-vines, the key choice is the **root variable sequence**. A common heuristic: order roots by decreasing sum of absolute pairwise Kendall $\tau$ values. The variable most correlated with all others becomes the first root.

For D-vines, the key choice is the **ordering** $\sigma$. Aas et al. (2009) suggest ordering variables to maximise the sum of adjacent pair Kendall $\tau$ values in tree $T_1$ — this places the strongest dependencies at the first conditioning level.

For the general R-vine, see [[Vine Copula Estimation and Model Selection#Dissmann|Dissmann's algorithm]].

## Connections

- [[Pair Copula Construction]] — formal definitions of R-vine, h-function, simplifying assumption; the common foundation.
- [[Vine Copulas - Overview]] — motivation, history, position relative to factor copulas and other architectures.
- [[Vine Copula Estimation and Model Selection]] — sequential MLE using the tree structures defined here; Dissmann algorithm for R-vine structure selection.
- [[Copula Architecture Comparison]] — how C/D/R-vines compare to factor copulas, Normal/$t$, and Archimedean families.
- [[Factor Copulas - Overview]] — factor copula as an alternative: latent factor plays a similar role to the C-vine root, but the factor is *unobserved*.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used to select roots and orderings; quantile dependence used for diagnostics.

## See Also

- [[Multi-Factor and Block Dependence Structures]] — the Oh & Patton block factor model; contrast with the pair-level flexibility of vine copulas.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — the high-dimensional application where factor copulas were chosen over vine copulas.
