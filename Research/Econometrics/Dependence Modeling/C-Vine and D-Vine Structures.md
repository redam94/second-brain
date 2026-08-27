---
title: "C-Vine and D-Vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Aas-et-al-2009-Vine-Copula-Survey.md]]"
source_location: "Aas et al. (2009) §2.2–2.3, pp. 185–190"
date_ingested: 2026-08-27
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Construction]]"
used_by:
  - "[[Sequential Estimation for Vine Copulas]]"
aliases:
  - Canonical vine
  - Drawable vine
  - C-vine
  - D-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> Aas et al. (2009) introduce two tractable R-vine special cases. The **C-vine** (canonical vine) uses a **star topology** at each tree level: one root node connects to all others, appropriate when a single dominant variable drives all pairwise dependencies. The **D-vine** (drawable vine) uses a **path topology**: nodes connected as a chain, appropriate for time-series or ordered data where adjacent units are most correlated. Both allow any bivariate copula family at each edge and are estimated by the sequential h-function procedure (see [[Sequential Estimation for Vine Copulas]]).

## Overview

An R-vine on $n$ variables has $\binom{n}{2}$ pair copulas spread across $n-1$ trees. Without restrictions, the number of valid vine structures is super-exponential in $n$. Two important subclasses fix the tree topology, making structure selection trivial and estimation well-organized:

- **C-vine**: each tree is a star (one node connects to all others).
- **D-vine**: each tree is a path (nodes connected in a single chain).

Both are R-vines satisfying the proximity condition (see [[Pair Copula Construction]]^def-rvine). All R-vine factorizations are mathematically equivalent; C- and D-vines impose additional topology constraints for tractability.

## Main Content

### Canonical vine (C-vine)

> [!definition] C-vine (canonical vine)
> In a **C-vine**, tree $T_j$ is a star: one root node connects to all $n-j$ remaining nodes.
>
> The root of $T_1$ is some variable $x_{i_1}$ (the one most strongly correlated with the others, as measured by the sum of absolute Kendall's $\tau$). Its edges give unconditional pair copulas $c_{i_1, j}$ for all $j \neq i_1$.
>
> The root of $T_2$ is the node corresponding to edge $\{i_1, i_2\}$ in $T_1$. Its edges give conditional pair copulas $c_{i_2, j | i_1}$ for all remaining $j$.
>
> At level $k$, root $i_k$ is connected to all remaining nodes conditioned on $\{i_1, \ldots, i_{k-1}\}$.
^def-cvine

**C-vine density ($n$ variables):**

$$f(\mathbf{x}) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{j,\,j+i\,|\,1,\ldots,j-1}\!\left(F_{j|\,1:\!(j-1)},\; F_{j+i|\,1:\!(j-1)}\right)$$

**Example — 4-variable C-vine rooted at $X_1$:**

Tree $T_1$ (star centred on $X_1$):
$$c_{12},\; c_{13},\; c_{14}$$

Tree $T_2$ (star centred on $X_2$, conditioned on $X_1$):
$$c_{23|1},\; c_{24|1}$$

Tree $T_3$ (star centred on $X_3$, conditioned on $X_1, X_2$):
$$c_{34|12}$$

Total: 6 pair copulas = $\binom{4}{2}$.

**When to use C-vine:** A single variable is the dominant driver of all pairwise dependence. Example: a market index $X_1$ and $n-1$ stocks — the index mediates most pairwise correlations among stocks. The root ordering can be chosen empirically by maximising $\sum_{j>1} |\hat{\tau}_{1j}|$.

### Drawable vine (D-vine)

> [!definition] D-vine (drawable vine)
> In a **D-vine**, tree $T_j$ is a path: nodes are connected as $x_1 - x_2 - \cdots - x_{n-j+1}$ (or equivalently, a Hamiltonian path).
>
> Tree $T_1$ has edges $\{1,2\}, \{2,3\}, \ldots, \{n-1,n\}$ — adjacent pairs.
> Tree $T_2$ has edges $\{1,3|2\},\; \{2,4|3\},\; \ldots,\; \{n-2,n|n-1\}$ — pairs two steps apart, conditioned on the middle.
> At level $j$, edges connect variables $j$ steps apart in the ordering, conditioned on the $j-1$ intermediate variables.
^def-dvine

**D-vine density ($n$ variables):**

$$f(\mathbf{x}) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,\,i+j\,|\,i+1,\ldots,i+j-1}\!\left(F_{i|\,i+1:\!(i+j-1)},\; F_{i+j|\,i+1:\!(i+j-1)}\right)$$

**Example — 4-variable D-vine with ordering $X_1-X_2-X_3-X_4$:**

Tree $T_1$ (path $1-2-3-4$):
$$c_{12},\; c_{23},\; c_{34}$$

Tree $T_2$ (path on $T_1$ edges):
$$c_{13|2},\; c_{24|3}$$

Tree $T_3$:
$$c_{14|23}$$

Total: 6 pair copulas.

**When to use D-vine:** Data have a natural ordering (time, space, severity) and adjacent units are most correlated. The D-vine is the standard choice for:
- **Time series:** daily returns $\{r_t, r_{t+1}, \ldots\}$; adjacent days most correlated.
- **Longitudinal data:** repeated measurements per subject; earlier observations most predictive of adjacent later ones.
- **Ordered categories:** risk grades, credit ratings.

### Structure selection in practice

For general (R-vine) structure selection, Dissmann et al. (2013) propose a greedy algorithm:

1. **Fit $T_1$**: build the maximum spanning tree where edge weight is $|\hat{\tau}_{ij}|$ (absolute Kendall's $\tau$). The strongest pairwise dependences get unconditional pair copulas.
2. **Fit $T_2$**: nodes of $T_2$ are edges of $T_1$; apply proximity condition; again maximum spanning tree by partial $|\hat{\tau}|$.
3. Continue greedily through all trees.

For C-vine and D-vine, structure selection reduces to choosing the variable ordering — the root sequence for C-vine, or the path ordering for D-vine.

### Truncation

For large $n$, the vine can be **truncated at level $k$**: pair copulas in trees $T_{k+1}, \ldots, T_{n-1}$ are replaced by the independence copula. The truncated vine has $k(n-1) - \binom{k}{2}$ pair copulas instead of $\binom{n}{2}$.

> [!definition] Truncated vine
> A vine truncated at level $k \leq n-1$ replaces all pair copulas in $T_{k+1}, \ldots, T_{n-1}$ with the independence copula $c = 1$. This is justified when higher-tree conditional dependencies are negligible after controlling for lower-tree structure. Truncation is standard for $n > 20$.

## Connections

- [[Pair Copula Construction]] — the general R-vine density factorization and proximity condition.
- [[Sequential Estimation for Vine Copulas]] — how C-vine and D-vine structure determines the sequential MLE algorithm.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Factor Copulas - Overview]]^literature — the competing architecture for $n > 50$.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used in tree construction and structure selection.

## See Also

- [[../_Index|Econometrics]]
