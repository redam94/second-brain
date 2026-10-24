---
title: "C-vine and D-vine Structures"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-Czado-2009-Pair-Copula-Constructions.txt]]"
source_location: "Secs. 3.1–3.2, pp. 6–11; Bedford & Cooke (2002) Secs. 3–4"
date_ingested: 2026-10-24
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Construction]]"
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine density
  - D-vine density
  - vine copula structure
---

# C-vine and D-vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most tractable special cases of a regular vine. In a C-vine, every tree is a **star** — one root node connects to all others, making it natural when one variable drives the dependence of all others. In a D-vine, every tree is a **path** — the dependence structure is symmetric and suited when variables have a natural ordering (e.g., time, spatial proximity). Both yield explicit joint densities as products of bivariate copula densities applied to h-function transforms.

## Overview

A regular vine on $n$ variables contains $n-1$ trees $T_1,\dots,T_{n-1}$. In general the tree structure at each level can be any valid graph satisfying the proximity condition (see [[Pair Copula Construction]]). Two structures stand out for their analytic tractability and interpretability:

- **C-vine**: each tree $T_j$ is a star with a single root node, so the root variable conditions all pairs in that tree. If the root sequence is $(1, 2, \dots, n-1)$, variable $j$ is the root of tree $T_j$.
- **D-vine**: each tree $T_j$ is a path — the variables have a linear ordering, and each tree is the subpath obtained by one step of path-graph tree construction.

For $n \leq 3$, C-vines and D-vines on the same variables are equivalent up to relabelling. Structural differences emerge at $n \geq 4$.

## Main Content

> [!definition] C-vine structure and density
> In a **C-vine** with ordering $(1, 2, \dots, n)$ and root sequence $(1, 2, \dots, n-1)$:
>
> - **Tree $T_j$** ($j=1,\dots,n-1$) has root $j$ and edges $\{(j, j+1), (j, j+2), \dots, (j, n)\}$ in the $j$-th level.
> - The **conditioning set** for pair $(j, i+j)$ in tree $T_j$ is $\{1, \dots, j-1\}$.
>
> **Density formula** (Aas et al. 2009, Eq. (4)):
> $$f_{\text{C}}(x_1,\dots,x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{j,j+i|1,\dots,j-1}\!\left(F(x_j|x_1,\dots,x_{j-1}),\; F(x_{j+i}|x_1,\dots,x_{j-1})\right)$$
>
> where each conditional CDF $F(x_j|x_1,\dots,x_{j-1})$ is computed via h-function recursion from earlier trees (see [[Pair Copula Construction]]).
>
> **Parameter count:** $n(n-1)/2$ bivariate copula parameters (one per pair copula edge).
>
> **When to use a C-vine:** When one variable is a natural "hub" — a key financial index, a global factor, a central node in a network — that drives the dependence of all other variables. In tree $T_1$, the root has the highest sum of absolute Kendall's $\tau$ values with all other variables, which is the standard criterion for greedy root selection.
^def-cvine

> [!definition] D-vine structure and density
> In a **D-vine** with ordering $(1, 2, \dots, n)$:
>
> - **Tree $T_j$** has edges $\{(1,j+1), (2,j+2), \dots, (n-j, n)\}$ — a path through variables $1 \to 2 \to \cdots \to n$ with steps of length $j$.
> - The **conditioning set** for pair $(i, i+j)$ in tree $T_j$ is $\{i+1, \dots, i+j-1\}$ — the $j-1$ variables between them in the ordering.
>
> **Density formula** (Aas et al. 2009, Eq. (3)):
> $$f_{\text{D}}(x_1,\dots,x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,i+j|i+1,\dots,i+j-1}\!\left(F(x_i|x_{i+1},\dots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\dots,x_{i+j-1})\right)$$
>
> **When to use a D-vine:** When variables have a natural linear ordering and pairwise dependence decays with distance in that ordering (e.g., daily return correlations decay over time; spatial data; time series with Markov structure). Variable ordering can be chosen by maximising the sum of $|\tau_{i,i+1}|$ (adjacent pair correlations) via a greedy algorithm or the Traveling Salesman Problem.
^def-dvine

> [!definition] Comparison: C-vine vs D-vine vs general R-vine
> | Property | C-vine | D-vine | R-vine |
> |---|---|---|---|
> | **Tree structure** | Star (one root per tree) | Path (chain of variables) | Any valid regular vine |
> | **Root variable** | High-degree hub | N/A (path has no root) | N/A |
> | **Best for** | One dominant common driver | Ordered/sequential variables | Arbitrary dependence structure |
> | **Structure selection** | Choose root sequence | Choose variable ordering | Graph optimisation (NP-hard for large $n$) |
> | **Conditioning sets** | $\{1,\dots,j-1\}$ for tree $T_j$ | $\{i+1,\dots,i+j-1\}$ for lag-$j$ pair | Arbitrary (vine-dependent) |
> | **# valid structures** | $(n-1)!/2$ | $(n-1)!/2$ | $\frac{n!}{4}\prod_{k=0}^{n-2} 2^k$ (Bedford & Cooke 2002) |
> | **$n=4$ count** | 3 | 3 | 24 |
> | **Interpretability** | High (root = driver) | High (order = proximity) | Lower |
>
> For $n=4$: 24 valid R-vines; 3 are C-vines, 3 are D-vines. For large $n$, the number of R-vine structures is astronomically large; most applications restrict to C-vine or D-vine for tractability and interpretability.
^comparison-table

> [!definition] H-function recursion for C-vine
> To evaluate the C-vine density one needs $F(x_j|x_1,\dots,x_{j-1})$ for each $j$. These are computed recursively using the **h-function**:
> $$F(x_j|x_1) = h(F_j(x_j)|F_1(x_1);\theta_{j,1})$$
> $$F(x_j|x_1, x_2) = h\!\left(F(x_j|x_1)\mid F(x_2|x_1);\theta_{j,2|1}\right)$$
> $$\vdots$$
> $$F(x_j|x_1,\dots,x_{j-1}) = h\!\left(F(x_j|x_1,\dots,x_{j-2})\mid F(x_{j-1}|x_1,\dots,x_{j-2});\theta_{j,j-1|1,\dots,j-2}\right)$$
>
> where $h(u|v;\theta) = \partial C(u,v;\theta)/\partial v$ is the h-function of copula $C$ with parameter $\theta$ (see [[Pair Copula Construction]]).
>
> For the D-vine, the same h-function recursion applies but the conditioning sets run "inward" from both ends of the path rather than from a common root.
^h-recursion

## Examples

> [!example] C-vine for four Norwegian financial series
> **Setup:** Aas et al. (2009) fit a 4-variate D-vine to four Norwegian financial time series: Brent crude oil (OIL), MSCI World (MSCI), German bond futures (BOND), and USD/NOK exchange rate (USD). After removing serial dependence via GARCH marginals, the copula is fitted to the standardised residuals.
>
> **Structure chosen:** D-vine with ordering OIL–MSCI–USD–BOND, based on the pair-wise Kendall's $\tau$ values (OIL–MSCI strongest at 0.40; USD–BOND weakest at −0.05).
>
> **Copula families selected (AIC):** Student-$t$ for OIL–MSCI and MSCI–USD (heavy-tailed joint risk); Gaussian for USD–BOND; Independence for OIL–USD|MSCI and BOND–OIL|MSCI–USD (conditional independence after removing common factor).
>
> **Result:** The D-vine pair copula model achieves substantially lower AIC than the 4-variate Gaussian copula and the 4-variate Student-$t$ copula, capturing the tail dependence between oil and equities that the Gaussian copula misses.

> [!example] Vine structure on $n=4$ variables
> **C-vine** with root sequence $(1, 2, 3)$:
> - Tree $T_1$: star edges $(1,2), (1,3), (1,4)$ → pair copulas $c_{12}, c_{13}, c_{14}$
> - Tree $T_2$: star edges $(2,3|1), (2,4|1)$ → pair copulas $c_{23|1}, c_{24|1}$
> - Tree $T_3$: edge $(3,4|1,2)$ → pair copula $c_{34|12}$
>
> **D-vine** with ordering $(1,2,3,4)$:
> - Tree $T_1$: path edges $(1,2), (2,3), (3,4)$ → pair copulas $c_{12}, c_{23}, c_{34}$
> - Tree $T_2$: path edges $(1,3|2), (2,4|3)$ → pair copulas $c_{13|2}, c_{24|3}$
> - Tree $T_3$: edge $(1,4|2,3)$ → pair copula $c_{14|23}$
>
> Both structures use exactly $\binom{4}{2} = 6$ pair copulas. In the C-vine, variable 1 is the root and appears in every tree-$T_1$ edge; in the D-vine, variables are symmetric — each appears in exactly $n-1$ edges across all trees.

## Connections

- [[Pair Copula Construction]] — the general PCC framework; this note is the special-case instantiation.
- [[Vine Copula Estimation and Model Selection]] — how to select the variable ordering / root sequence and the copula families at each edge.
- [[Vine Copulas - Overview]] — overview and comparison with factor copulas.
- [[Factor Copula Construction]] — for comparison: a single latent factor vs. a cascade of bivariate building blocks.
- [[Multi-Factor and Block Dependence Structures]] — factor copulas achieve similar heterogeneous dependence via multiple factors rather than per-edge copula families.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence at each tree edge.
- [[Tail Dependence in Factor Copulas]] — EVT characterisation of tail dependence in factor copulas; vine copulas achieve tail dependence by choosing Student-$t$ or Clayton/Gumbel pair copulas.
- [[Econometrics/_Index|Econometrics]]
