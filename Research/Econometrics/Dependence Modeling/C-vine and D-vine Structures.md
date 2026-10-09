---
title: "C-vine and D-vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/vine-copula-sources.md]]"
source_location: "Aas et al. (2009) §2.1-2.2; Brechmann & Schepsmeier (2013) §2"
date_ingested: 2026-10-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - star vine
  - path vine
---

# C-vine and D-vine Structures

> [!summary]
> A **C-vine** has star-shaped trees (one central root variable at each level) and is best when one variable drives most of the dependence structure. A **D-vine** has path-shaped trees and is best when variables have a natural sequential or spatial ordering. Both are special cases of the [[Vine Copulas - Overview#^def-rvine|regular vine (R-vine)]]: the C-vine fixes a root ordering $(r_1, r_2, \ldots)$; the D-vine fixes a variable ordering $(\pi(1), \ldots, \pi(n))$. Their joint densities are explicit products of $n(n-1)/2$ bivariate copula densities.

## Overview

For an $n$-variable vine copula, Bedford & Cooke (2002) showed that the class of valid R-vines is rich — there are $n!/2$ distinct D-vines and $n!/2$ distinct C-vines on $n$ variables, among the vastly larger set of all R-vines (which grows super-exponentially). In the statistics and econometrics literature, the C-vine and D-vine were the first tractable subclasses studied in detail (Aas et al. 2009) before the full R-vine estimation framework of Dißmann et al. (2013) appeared.

## Main Content

### C-vine (Canonical vine)

> [!definition] C-vine structure
> A **C-vine** on $n$ variables is an R-vine where, at each tree level $j$, one root node is designated and all other $n-j$ nodes in that tree are leaves (degree 1). The tree $T_j$ is a **star** with root $r_j$.
>
> Defined by a **root ordering** $(r_1, r_2, \ldots, r_{n-1})$:
> - $T_1$: star with root $r_1$; edges $(r_1, i)$ for $i \neq r_1$ — gives $n-1$ pair copulas $c_{r_1, i}$.
> - $T_2$: star with root $r_2$, conditioning set $\{r_1\}$; edges $(r_2, i | r_1)$ for $i \neq r_1, r_2$ — gives $n-2$ pair copulas $c_{r_2, i | r_1}$.
> - $T_j$: star with root $r_j$, conditioning set $\{r_1, \ldots, r_{j-1}\}$; edges $(r_j, i | r_1, \ldots, r_{j-1})$ — gives $n-j$ pair copulas.
> - $T_{n-1}$: single edge — 1 pair copula.
>
> **Total:** $(n-1) + (n-2) + \cdots + 1 = n(n-1)/2$ pair copulas.
^def-cvine

> [!definition] C-vine joint density
> For a C-vine with root ordering $(1, 2, \ldots, n)$ the joint density is:
>
> $$
> f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k)
>   \cdot \prod_{j=1}^{n-1} \prod_{i=j+1}^{n}
>     c_{j,i|1,\ldots,j-1}\!\bigl(F(x_j | x_1,\ldots,x_{j-1}),\;
>                                F(x_i | x_1,\ldots,x_{j-1})\bigr)
> $$
>
> The outer product over $j$ indexes the tree level; the inner product over $i$ indexes the leaves in the star at level $j$.
^def-cvine-density

> [!example] C-vine density for $n = 4$, root ordering $(1, 2, 3, 4)$
> **Trees:** $T_1$ = star(1); $T_2$ = star(2|1); $T_3$ = single edge $(3,4|1,2)$.
>
> **Edges and pair copulas:**
>
> | Tree | Edge | Pair copula |
> |------|------|-------------|
> | $T_1$ | $1-2$ | $c_{12}(F_1(x_1),\, F_2(x_2))$ |
> | $T_1$ | $1-3$ | $c_{13}(F_1(x_1),\, F_3(x_3))$ |
> | $T_1$ | $1-4$ | $c_{14}(F_1(x_1),\, F_4(x_4))$ |
> | $T_2$ | $2-3\|1$ | $c_{23\|1}\bigl(h(u_2|u_1;c_{12}),\; h(u_3|u_1;c_{13})\bigr)$ |
> | $T_2$ | $2-4\|1$ | $c_{24\|1}\bigl(h(u_2|u_1;c_{12}),\; h(u_4|u_1;c_{14})\bigr)$ |
> | $T_3$ | $3-4\|12$ | $c_{34\|12}\bigl(h(u_3\|1|u_2\|1;c_{23\|1}),\; h(u_4\|1|u_2\|1;c_{24\|1})\bigr)$ |
>
> where $u_i = F_i(x_i)$ and $u_{i|j} = h(u_i|u_j; c_{ij})$ denotes the h-function output (the conditional CDF — see [[Vine Copula Estimation and Selection#^def-hfunc]]).

> [!note] When to use a C-vine
> A C-vine is appropriate when **one variable (or a small number) drives dependence** among all others. Variable $r_1$ is at the center of $T_1$ and its pairwise relationships with all other variables are captured in the first tree. The root ordering $(r_1, r_2, \ldots)$ should assign the variable with the highest total pairwise dependence (sum of $|\hat{\tau}|$ with all others) to $r_1$.
>
> Common applications: financial returns with a dominant market factor (market index as root); hierarchical models where one variable is causally upstream.

---

### D-vine (Drawable vine)

> [!definition] D-vine structure
> A **D-vine** on $n$ variables is an R-vine where, at each tree level $j$, all nodes have degree $\leq 2$ — the tree $T_j$ is a **path**.
>
> Defined by a single **variable ordering** $\pi = (\pi_1, \ldots, \pi_n)$:
> - $T_1$: path $\pi_1 - \pi_2 - \cdots - \pi_n$; edges $(\pi_k, \pi_{k+1})$ for $k = 1,\ldots,n-1$ — gives $n-1$ pair copulas.
> - $T_2$: path with $n-2$ nodes; edges $(\pi_k, \pi_{k+2} | \pi_{k+1})$ for $k=1,\ldots,n-2$ — gives $n-2$ pair copulas.
> - $T_j$: path with $n-j$ nodes; edges $(\pi_k, \pi_{k+j} | \pi_{k+1},\ldots,\pi_{k+j-1})$ for $k=1,\ldots,n-j$.
>
> **Total:** $(n-1)+(n-2)+\cdots+1 = n(n-1)/2$ pair copulas.
^def-dvine

> [!definition] D-vine joint density
> For a D-vine with ordering $(\pi_1, \ldots, \pi_n)$ the joint density is:
>
> $$
> f(x_{\pi_1},\ldots,x_{\pi_n}) = \prod_{k=1}^n f_{\pi_k}(x_{\pi_k})
>   \cdot \prod_{j=1}^{n-1} \prod_{k=1}^{n-j}
>     c_{\pi_k, \pi_{k+j} | \pi_{k+1},\ldots,\pi_{k+j-1}}\!\bigl(
>       F(x_{\pi_k}|x_{\pi_{k+1}},\ldots,x_{\pi_{k+j-1}}),\;
>       F(x_{\pi_{k+j}}|x_{\pi_{k+1}},\ldots,x_{\pi_{k+j-1}})
>     \bigr)
> $$
^def-dvine-density

> [!example] D-vine density for $n = 4$, ordering $(1, 2, 3, 4)$
> **Trees:** $T_1$ = path $1-2-3-4$; $T_2$ = path $(1,3|2)-(2,4|3)$; $T_3$ = edge $(1,4|23)$.
>
> **Edges and pair copulas:**
>
> | Tree | Edge | Pair copula |
> |------|------|-------------|
> | $T_1$ | $1-2$ | $c_{12}(u_1,\, u_2)$ |
> | $T_1$ | $2-3$ | $c_{23}(u_2,\, u_3)$ |
> | $T_1$ | $3-4$ | $c_{34}(u_3,\, u_4)$ |
> | $T_2$ | $1-3\|2$ | $c_{13\|2}\bigl(h(u_1|u_2;c_{12}),\; h(u_3|u_2;c_{23})\bigr)$ |
> | $T_2$ | $2-4\|3$ | $c_{24\|3}\bigl(h(u_2|u_3;c_{23}),\; h(u_4|u_3;c_{34})\bigr)$ |
> | $T_3$ | $1-4\|23$ | $c_{14\|23}\bigl(h(u_{1\|2}|u_{3\|2};c_{13\|2}),\; h(u_{4\|3}|u_{2\|3};c_{24\|3})\bigr)$ |

> [!note] When to use a D-vine
> A D-vine is appropriate when variables have a **natural sequential or spatial ordering**: time-series lags, geographic proximity, or an age/maturity sequence. The path structure captures nearest-neighbor dependence in $T_1$ and long-range conditional dependence through higher trees. Common applications: term structure of interest rates (short to long maturities), time-series auto-dependence modelling (Czado et al. 2012), longitudinal panel data.

---

### Structural comparison

| Feature | C-vine | D-vine | General R-vine |
|---------|--------|--------|----------------|
| $T_j$ shape | Star | Path | Any tree |
| Defined by | Root ordering $(r_1,\ldots,r_{n-1})$ | Variable ordering $(\pi_1,\ldots,\pi_n)$ | $n-1$ trees subject to proximity |
| Number of distinct structures | $n!/2$ | $n!/2$ | Super-exponential in $n$ |
| Best for | One dominant variable | Sequential ordering | Arbitrary dependence |
| Computational cost | Same as D-vine | Same as C-vine | Higher (structure search) |
| Parameters (1-param families) | $n(n-1)/2$ | $n(n-1)/2$ | $n(n-1)/2$ |

## Connections

- [[Vine Copulas - Overview]] — the pair-copula decomposition and Bedford–Cooke representation theorem that these structures instantiate.
- [[Vine Copula Estimation and Selection]] — h-functions for computing the conditional CDFs that appear in these densities; structure selection algorithms.
- [[Copula Architecture Comparison]] — how C/D-vine and factor-copula architectures compare for high-dimensional problems.
- [[Factor Copulas - Overview]] — [[Factor Copula Construction#^def-cvine|the factor-copula equivalent]] imposes a latent-variable structure; C/D-vines make no global latent-structure assumption.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence are used to select root/variable orderings and diagnose vine fit.
