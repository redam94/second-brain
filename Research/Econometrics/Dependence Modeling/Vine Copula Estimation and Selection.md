---
title: Vine Copula Estimation and Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Source-Extract.md]]"
source_location: "Aas et al. (2009), Sec. 5; Dissmann et al. (2013); Czado & Nagler (2022), Sec. 3-4"
date_ingested: 2026-09-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine Structure]]"
  - "[[C-Vine and D-Vine]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - vine copula estimation
  - sequential ML vine
  - Dissmann algorithm
  - truncated vine
---

# Vine Copula Estimation and Selection

> [!summary]
> Vine copula estimation proceeds in two interleaved problems: **structure selection** (which R-vine
> tree sequence?) and **parameter estimation** (which bivariate family and parameters for each pair?).
> The standard approach is Dissmann et al.'s (2013) **greedy maximum-spanning-tree** algorithm for
> structure, followed by **sequential maximum likelihood** (tree-by-tree) for families and parameters,
> with **AIC/BIC** for family selection per pair. Truncation (dropping higher-tree pair-copulas) trades
> model fit for parsimony when $d$ is moderate.

## Overview

Given a $d$-dimensional dataset of uniform pseudo-observations (probability integral transforms of
marginals), vine copula fitting must select:
1. **The R-vine structure** — which tree topology across $T_1, \ldots, T_{d-1}$?
2. **The pair-copula family** for each of the $d(d-1)/2$ edges.
3. **The pair-copula parameters** for each edge.

These are combinatorially entangled: $3 \times$ the number of distinct vine structures (exponential in $d$)
exhaustive search is infeasible. Standard practice: greedy structure selection, then sequential ML.

## Main Content

### Sequential Maximum Likelihood

> [!theorem] Sequential ML estimator (Aas et al. 2009, Sec. 5)
> For a D-vine (or C-vine) on $d$ variables with $T$ observations:
>
> **For tree $T_1$** (edges $\{i, i+1\}$, $i=1,\ldots,d-1$):
> 1. For each edge, form pseudo-obs $(u_i^{(t)}, u_{i+1}^{(t)}) = (F_i(x_i^{(t)}), F_{i+1}(x_{i+1}^{(t)}))$.
> 2. Maximise $\hat{\ell}_1 = \sum_t \log c_{i,i+1}(u_i^{(t)}, u_{i+1}^{(t)}; \hat{\theta}_{i,i+1})$ over $\theta_{i,i+1}$.
> 3. Compute conditional CDFs: $v_{i,i+1}^{(t)} = h(u_i^{(t)} | u_{i+1}^{(t)}; \hat{\theta}_{i,i+1})$ and $v_{i+1,i}^{(t)} = h(u_{i+1}^{(t)} | u_i^{(t)}; \hat{\theta}_{i,i+1})$.
>
> **For tree $T_j$, $j \geq 2$:**
> 1. The pseudo-observations for each edge are computed from the h-functions fitted in trees $T_1, \ldots, T_{j-1}$.
> 2. Maximise the pair-copula likelihood for each edge using those pseudo-observations.
> 3. Compute h-functions for the next tree.
>
> This sequential procedure treats earlier-tree estimates as **fixed** — it is computationally fast
> but **not fully efficient** (ignores estimation error in earlier trees). Consistency holds under
> standard regularity conditions.
^thm-sequential-ml

> [!theorem] Full ML (Czado & Nagler 2022, Sec. 3.2)
> Full joint maximum likelihood maximises
> $$\hat{\boldsymbol{\theta}}_{\text{MLE}} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^{T} \log f(\mathbf{x}^{(t)}; \boldsymbol{\theta})$$
> where $f$ is the vine density from [[C-Vine and D-Vine]] (e.g., D-vine density formula).
> **Properties:** asymptotically efficient (achieves Cramér-Rao bound for the joint model); much
> costlier than sequential ML (gradient must propagate through all h-function recursions);
> typically used as a **refinement** starting from sequential ML estimates.
^thm-full-ml

### Bivariate Family Selection

> [!definition] Family selection per pair (AIC/BIC)
> For each edge $(i,j|D)$ at each tree level, fit a candidate set of bivariate copula families
> $\mathcal{F}$ (typically: Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, plus 90°/180°/270°
> rotations to capture negative or asymmetric dependence) by ML. Select the family minimising
> $$\text{AIC}_{ij|D} = -2\hat{\ell}_{ij|D} + 2p, \quad \text{BIC}_{ij|D} = -2\hat{\ell}_{ij|D} + p\log T$$
> where $p$ is the number of parameters in the pair-copula (1 for one-parameter families, 2 for
> Student-$t$ or BB-class). AIC tends to retain dependence; BIC is more parsimonious.
^def-family-selection

### Structure Selection

> [!definition] Dissmann algorithm (Dissmann et al. 2013)
> Greedy tree-by-tree structure selection:
>
> **For tree $T_1$:**
> 1. Compute empirical Kendall's $\hat{\tau}_{ij}$ for all $\binom{d}{2}$ variable pairs.
> 2. Solve the **maximum spanning tree** (MST) problem on the complete graph with edge weights
>    $|\hat{\tau}_{ij}|$: find the spanning tree $T_1^*$ maximising $\sum_{\{i,j\} \in E_1} |\hat{\tau}_{ij}|$.
>    This is solved exactly in $O(d^2 \log d)$ by Kruskal's or Prim's algorithm.
> 3. Fit pair-copulas for $T_1^*$ and compute h-function pseudo-observations.
>
> **For tree $T_j$, $j \geq 2$:**
> 1. The nodes of $T_j$ are the edges of $T_{j-1}^*$; eligible edges in $T_j$ must satisfy the
>    **proximity condition** from [[Regular Vine Structure]].
> 2. Compute empirical Kendall's $\hat{\tau}$ on pseudo-observations for each eligible pair.
> 3. Solve MST restricted to eligible edges.
>
> **Rationale:** Placing the strongest bivariate dependencies in the first trees ensures that the
> most important dependence structure is captured early; higher-tree pair-copulas (weaker conditional
> dependence) are more likely to be well approximated by independence or Gaussian copulas.
^def-dissmann

### Truncation

> [!definition] Truncated R-vine (Brechmann et al. 2012)
> A **$m$-truncated R-vine** sets all pair-copulas in trees $T_{m+1}, \ldots, T_{d-1}$ to the
> independence copula $\Pi$ (zero parameters). This reduces the parameter count from $d(d-1)/2$
> bivariate copulas to $\sum_{j=1}^{m}(d-j) = md - m(m+1)/2$ pair-copulas. Selection of the
> truncation level $m$:
> - Compare AIC or BIC of the $m$-truncated model across $m = 1, 2, \ldots$
> - Or use a sequential likelihood-ratio test: stop when the fitted pair-copulas in tree $T_{m+1}$
>   are not significantly different from independence.
>
> **Practical guidance:** For financial returns ($d \leq 50$), $m = 3$ or $m = 4$ usually suffices.
> For $d > 50$, $m = 1$ (a tree-1-only model, like a factor model with $d-1$ pairs) may be needed.
^def-truncation

## Examples

> [!example] Sequential ML on a 5-variable D-vine
> **Data:** $T = 500$ observations on $d = 5$ variables; uniform pseudo-obs $u_1, \ldots, u_5$.
>
> **Tree 1** (4 pairs): fit $c_{12}, c_{23}, c_{34}, c_{45}$ independently by ML.
> Chosen families (AIC): Clayton for $(1,2)$, Gumbel for $(2,3)$, Gaussian for $(3,4)$, $t$ for $(4,5)$.
> Compute 8 sets of h-function pseudo-obs for tree 2.
>
> **Tree 2** (3 pairs): fit $c_{13|2}, c_{24|3}, c_{35|4}$ using pseudo-obs from tree 1.
> Chosen families: Gaussian for $(1,3|2)$ and $(2,4|3)$, independence for $(3,5|4)$.
>
> **Tree 3** (2 pairs): fit $c_{14|23}, c_{25|34}$ — both chosen as Gaussian (weak conditional dependence).
>
> **Tree 4** (1 pair): fit $c_{15|234}$ — AIC selects independence; **truncate at $m=3$**.
>
> **Final model:** 10 pair-copulas, 4 different families, 1 truncation.

## Connections

- [[C-Vine and D-Vine]] — the density formulas and h-functions used by sequential ML.
- [[Regular Vine Structure]] — the R-vine proximity condition constraining eligible edges in Dissmann's algorithm.
- [[Vine Copulas - Overview]] — overview of the vine framework.
- [[Copula Architecture Comparison]] — vine vs factor copula: factor copula avoids structure selection but is less flexible.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use SMM (rank-based moments) because they lack a closed-form density; vine copulas have one and use ML.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used as the structure-selection criterion in Dissmann's algorithm.

## See Also

- [[Factor Copula Application - S&P 100 and Systemic Risk]] — an application where the factor copula was preferred over vine copulas for $d=100$.
- [[../_Index|Econometrics]]
