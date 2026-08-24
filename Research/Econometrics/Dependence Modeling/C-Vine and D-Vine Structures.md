---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Aas-2009-vine-copulas-source-notes.md]]"
source_location: "Aas et al. (2009), Sec. 2; Bedford & Cooke (2002); Brechmann & Schepsmeier (2013)"
date_ingested: 2026-08-24
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Decompositions]]"
used_by:
  - "[[Vine Copula Estimation]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - R-vine
  - regular vine
---

# C-Vine and D-Vine Structures

> [!summary]
> A vine organises the $d(d-1)/2$ pair copulas of a PCC into $d-1$ linked trees via a graphical rule (the proximity condition). The two special cases most used in practice are: the **C-vine** (canonical vine), where each tree has a hub variable connected to all others — suited when one variable drives the rest; and the **D-vine** (drawable vine), where each tree is a path — suited for ordered or sequential variables such as time series. Both are special cases of the general **R-vine** (regular vine), which allows any tree structure satisfying the proximity condition.

## Overview

The tree structure of a vine is not just notation — it determines *which* pairs of variables are modelled by a direct (unconditioned) bivariate copula and *which* are modelled through a sequence of conditioned copulas. In practice, different structures encode different hypotheses about the main sources of dependence in the data.

For a $d=5$ application:
- A **C-vine** with root variable 1 says: "Variable 1 is the central driver; all pairwise dependence flows through variable 1 first."
- A **D-vine** with ordering 1-2-3-4-5 says: "Dependence follows a sequential chain; $X_1$ and $X_5$ are only indirectly related through the intermediate variables."

## Main Content

### Regular Vine (R-vine)

> [!definition] Regular vine (Bedford & Cooke 2002)
> A **regular vine** (R-vine) $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ on $d$ variables satisfies:
> 1. **$T_1$** is a connected tree with nodes $N_1 = \{1,\ldots,d\}$ and edges $E_1$.
> 2. **$T_k$** (for $k \geq 2$) is a connected tree with nodes $N_k = E_{k-1}$ and edges $E_k$.
> 3. **Proximity condition:** For any edge $\{a,b\} \in E_k$, the corresponding nodes $a = \{j_1,j_2\}$ and $b = \{j_3,j_4\}$ in $N_k = E_{k-1}$ must share exactly one element: $|\{j_1,j_2\} \cap \{j_3,j_4\}| = 1$.
>
> Each edge $e = \{a,b\} \in E_k$ defines a pair copula $c_{j(e),\ell(e)|D(e)}$ where:
> - **conditioned set** $\{j(e), \ell(e)\} = \{j_1,j_2\} \triangle \{j_3,j_4\}$ (symmetric difference)
> - **conditioning set** $D(e) = \{j_1,j_2\} \cap \{j_3,j_4\}$ (intersection)
^def-rvine

### C-Vine (Canonical Vine)

> [!definition] C-vine
> A **C-vine** (canonical vine) is an R-vine where each tree $T_k$ has exactly one node (the **root**) connected to all other nodes — i.e., each tree has a star structure.
>
> For $d$ variables with root ordering $(\pi_1, \pi_2, \ldots, \pi_{d-1})$:
> - **Tree 1:** Star with root $\pi_1$; edges $\{(\pi_1,j) : j \neq \pi_1\}$.
> - **Tree 2:** Nodes are the $d-1$ edges of $T_1$; star with root $\{\pi_1,\pi_2\}$; edges condition on $\pi_1$.
> - **Tree $k$:** Star with root $\{\pi_1,\ldots,\pi_k\}$; all pair copulas condition on the set $\{\pi_1,\ldots,\pi_{k-1}\}$.
>
> Number of pair copulas: $\sum_{k=1}^{d-1}(d-k) = d(d-1)/2$.
^def-cvine

**C-vine structure for $d=5$, root ordering $(1,2,3,4)$:**

```
Tree 1 (root=1):     1-2, 1-3, 1-4, 1-5
Tree 2 (root={1,2}): 2-3|1, 2-4|1, 2-5|1
Tree 3 (root={1,2,3}): 3-4|12, 3-5|12
Tree 4 (root={1,2,3,4}): 4-5|123
```

The C-vine pair copulas are: $\{c_{12}, c_{13}, c_{14}, c_{15}, c_{23|1}, c_{24|1}, c_{25|1}, c_{34|12}, c_{35|12}, c_{45|123}\}$ — 10 pair copulas total.

**When to use a C-vine:**
- There is a natural "central" variable that mediates most of the dependence (e.g., a market index driving stock returns; a latent health variable driving multiple biomarkers).
- Financial: a market factor copula can be approximated by a C-vine with the market index as root.
- The C-vine explicitly models each variable's direct dependence on the root, then residual dependence.

### D-Vine (Drawable Vine)

> [!definition] D-vine
> A **D-vine** (drawable vine) is an R-vine where each tree $T_k$ is a **path** — every node connects to at most two edges.
>
> For $d$ variables with ordering $(\pi_1, \pi_2, \ldots, \pi_d)$:
> - **Tree 1:** Path $\pi_1 - \pi_2 - \cdots - \pi_d$; edges $\{(\pi_k, \pi_{k+1}) : k=1,\ldots,d-1\}$.
> - **Tree 2:** Edges $\{(\pi_k,\pi_{k+2})|\pi_{k+1} : k=1,\ldots,d-2\}$ — each pair two steps apart in the ordering, conditioned on the intermediate variable.
> - **Tree $k$:** Pair copulas for variables $k$ positions apart in the ordering, conditioned on the $k-1$ intermediate variables.
^def-dvine

**D-vine structure for $d=5$, ordering $(1,2,3,4,5)$:**

```
Tree 1: 1-2, 2-3, 3-4, 4-5
Tree 2: 1-3|2, 2-4|3, 3-5|4
Tree 3: 1-4|23, 2-5|34
Tree 4: 1-5|234
```

The D-vine pair copulas are: $\{c_{12}, c_{23}, c_{34}, c_{45}, c_{13|2}, c_{24|3}, c_{35|4}, c_{14|23}, c_{25|34}, c_{15|234}\}$ — again 10 total.

**When to use a D-vine:**
- The variables have a natural **sequential or ordered** structure: time series, spatial locations along a line, ordered survey items.
- The D-vine places direct (unconditioned) pair copulas on *adjacent* variable pairs — the most likely to be most strongly dependent.
- D-vines are especially popular for time-series copula models and longitudinal data (see D-vine copula regression, Kraus & Czado 2017).

### General R-Vine

> [!definition] R-vine structure matrix
> An R-vine on $d$ variables is encoded by a $d \times d$ lower-triangular integer matrix $M$ (the **vine matrix** or **R-vine matrix**). The $(i,j)$ entry encodes the conditioned variable at position $(i,j)$ and the conditioning set is read from the column above. Different software packages (CDVine, VineCopula, pyvinecopulib) use slight variants of this encoding.
^def-rvine-matrix

The general R-vine allows any tree structure satisfying the proximity condition. C-vine and D-vine are special cases; a general R-vine can mix hub and path structures at different tree levels.

**Number of distinct R-vine structures:** grows super-exponentially with $d$. For $d=4$: 3 distinct R-vines (2 D-vine orderings and 1 C-vine shape, up to relabelling). For $d=10$: millions of structures. Structure selection algorithms (see [[Vine Copula Estimation]]) are essential.

## Graphical summary

| Vine type | Tree shape | When preferred | Root/order selection |
|---|---|---|---|
| C-vine | Star (one hub per tree) | One variable drives all others | Choose root = variable with highest sum of pairwise Kendall's $\tau$ |
| D-vine | Path (chain) | Sequential/ordered variables | Choose ordering = variable sequence maximising sum of adjacent $|\tau|$ |
| R-vine | Any valid tree | General high-dimensional dependence | Dissmann et al. (2013) max-spanning-tree algorithm |

## Connections

- [[Vine Copulas - Overview]] — motivation and role of vine copulas in the dependence modelling literature.
- [[Pair Copula Decompositions]] — the mathematical machinery (h-functions, density formulas) used to evaluate any vine.
- [[Vine Copula Estimation]] — structure selection algorithms; sequential MLE given a vine structure.
- [[Copula Architecture Comparison]] — where vine structures sit relative to factor copulas and standard parametric copulas.
- [[Multi-Factor and Block Dependence Structures]] — factor copula alternative: industry-block structure parallels C-vine with industry as hub.

## See Also

- [[SMM Estimation of Factor Copulas]] — for contrast: factor copulas are estimated via SMM; vine copulas via sequential or full MLE.
