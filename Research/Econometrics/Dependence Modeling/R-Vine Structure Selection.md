---
title: R-Vine Structure Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Dissmann-Czado-Synthesis.md]]"
source_location: "Dissmann et al. (2013) §2-4; Czado & Nagler (2022) §3"
date_ingested: 2026-07-06
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair-Copula Construction]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - R-vine
  - regular vine
  - Dissmann 2013
  - vine structure selection
  - RVineStructureSelect
---

# R-Vine Structure Selection

> [!summary]
> A **regular vine (R-vine)** is the most general vine copula structure — any sequence of $d-1$ spanning trees satisfying Bedford & Cooke's proximity condition. C-vines (stars) and D-vines (paths) are special cases. For data-driven structure learning, Dissmann et al. (2013) propose a **greedy maximum-spanning-tree algorithm**: at each tree level, find the spanning tree that maximises the sum of absolute Kendall's $\hat{\tau}$ over its edges, then select pair copula families by AIC. The resulting model is implemented in the VineCopula R package via `RVineStructureSelect()`. **Truncation** (fixing higher-tree pair copulas to independence) is standard practice when $d$ is large.

## Overview

C-vines and D-vines impose strong structural assumptions — a single root variable (C-vine) or a natural path ordering (D-vine). When neither assumption is justified by domain knowledge, the researcher must **select the vine structure from data**. This is a combinatorial problem: the number of distinct regular vine structures on $d$ variables grows super-exponentially ($(d-2)! \cdot 2^{\binom{d-2}{2}}$ for labeled vines). Dissmann et al. (2013) solve this with a greedy heuristic that is fast, practical, and performs well empirically.

## Main Content

### Regular Vine: Formal Definition

> [!definition] Regular vine (Bedford & Cooke 2002)
> A **regular vine** $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ on $d$ variables is a sequence of trees satisfying:
>
> 1. **$T_1$ is a spanning tree** on nodes $\{1, 2, \ldots, d\}$.
> 2. **Node inheritance:** For $j \geq 2$, the nodes of $T_j$ are the edges of $T_{j-1}$: $N_{j} = E_{j-1}$.
> 3. **Proximity condition:** If two nodes of $T_{j+1}$ (i.e., two edges of $T_j$) are connected by an edge in $T_{j+1}$, then the two edges of $T_j$ must share exactly one common endpoint (node in $T_j$).
>
> The proximity condition ensures that each pair copula $c_{a,b|\mathbf{D}}$ at tree $T_j$ has $|\mathbf{D}| = j - 1$ (the conditioning set grows by exactly one variable per tree level).
>
> **C-vines and D-vines are both R-vines:** every star-sequence (C-vine) and every path-sequence (D-vine) satisfies the proximity condition.
^def-rvine

> [!definition] R-Vine matrix (compact encoding)
> A regular vine structure is stored as a lower-triangular $d \times d$ integer matrix $M$. The diagonal $M_{kk}$ stores variable $k$. Off-diagonal entries encode the conditioning structure: $M_{ij}$ (column $j$, row $i > j$) indicates the variable that pairs with column-$j$ variable at tree level $d - j$, conditioned on the variables in column $j$ below the diagonal.
>
> Most software (VineCopula, rvinecopulib) uses this matrix as the primary data structure for storing and transmitting vine structures. The matrix is upper-triangular in some implementations; conventions vary but the information content is the same.
^def-rvine-matrix

### Greedy Structure Selection (Dissmann et al. 2013)

> [!definition] Maximum-spanning-tree vine structure selection
> **Input:** $d$-dimensional pseudo-observations $(u_{1,t}, \ldots, u_{d,t})_{t=1}^T$.
>
> **Algorithm:**
> 1. **Compute pairwise dependence:** Calculate empirical Kendall's $\hat{\tau}_{ij}$ for all $\binom{d}{2}$ pairs.
> 2. **Tree 1 — Maximum spanning tree:** Construct a complete graph on $\{1,\ldots,d\}$ with edge weights $|\hat{\tau}_{ij}|$. Find the **maximum weight spanning tree** $T_1$ (Prim's or Kruskal's algorithm, $O(d^2 \log d)$). Assign a pair copula family $c_{ij}$ to each edge by AIC from a candidate set; estimate parameters by MLE.
> 3. **Transform data:** For each edge $(i,j) \in T_1$, compute $\tilde{u}_{i|j,t} = h(u_{i,t} \mid u_{j,t};\, \hat{\boldsymbol{\theta}}_{ij})$ and $\tilde{u}_{j|i,t} = h(u_{j,t} \mid u_{i,t};\, \hat{\boldsymbol{\theta}}_{ij})$.
> 4. **Tree 2 — Eligible edges only:** The candidate edges for $T_2$ are only those satisfying the **proximity condition** (the two $T_1$ edges share a node). Build the weighted graph on eligible edges with Kendall's $\hat{\tau}$ computed from the transformed pseudo-observations $\tilde{u}_{i|j,t}$. Find the maximum spanning tree. Assign and estimate pair copulas by AIC.
> 5. **Continue** through $T_3, \ldots, T_{d-1}$, each time restricting to proximity-eligible edges and using transformed pseudo-observations from the previous tree.
>
> **Greedy property:** This algorithm maximizes dependence captured at each tree level sequentially, not globally. It is a heuristic; the globally optimal R-vine structure (maximising total log-likelihood) is NP-hard to find for $d > 10$.
^def-greedy-structure-select

> [!theorem] Consistency of greedy structure selection (informal, Dissmann et al. 2013)
> Under mild regularity conditions and when the true data-generating process is a simplified R-vine copula, the greedy maximum-spanning-tree estimator is **consistent** for the true vine structure as $T \to \infty$. In finite samples, the algorithm recovers the dominant conditional dependence structure.
^thm-consistency

### Pair Copula Family Selection

> [!definition] AIC-based family selection at each edge
> For each edge $e$ of each tree, fit all candidate pair copula families from a prespecified **family set** and select by AIC:
> $$\hat{F}_e = \arg\min_{F \in \mathcal{F}} \left[-2\,\ell_e(\hat{\boldsymbol{\theta}}_e^F) + 2\,p_e^F\right]$$
>
> **Standard family set** (VineCopula package):
> | Family | Tail dependence | Parameters |
> |---|---|---|
> | Gaussian | None | $\rho \in (-1,1)$ |
> | Student-$t$ | Symmetric upper + lower | $\rho, \nu > 2$ |
> | Clayton | Lower only | $\theta > 0$ |
> | Gumbel | Upper only | $\theta \geq 1$ |
> | Frank | None (but symmetric) | $\theta \in \mathbb{R}$ |
> | Joe | Upper only | $\theta > 1$ |
> | BB1 (Clayton-Gumbel) | Both | $\delta > 0,\; \theta \geq 1$ |
> | BB7 (Joe-Clayton) | Both | $\theta \geq 1,\; \delta > 0$ |
>
> Rotated versions ($90°$, $180°$, $270°$) handle negative dependence and alternative tail configurations.
^def-family-selection

### Truncated R-Vines

> [!definition] Vine truncation
> In a **truncated R-vine at level $m$**, all pair copulas at tree levels $j > m$ are set to the **independence copula** ($c_{ij|\mathbf{D}} \equiv 1$). This is motivated by the empirical observation that conditional dependences weaken rapidly as the conditioning set grows, and by parsimony in high dimensions.
>
> **Model selection for truncation level:** Compare AIC/BIC across truncated vines at levels $m = 1, 2, \ldots, d-1$. Alternatively, stop adding trees when no pair copula at the current level is significantly different from independence (e.g., Vuong's test).
>
> **Parameters saved:** Truncating at level $m$ uses $\sum_{j=1}^m(d-j) \cdot \bar{p}$ parameters instead of $d(d-1)/2 \cdot \bar{p}$, where $\bar{p}$ is the average parameter count per pair copula.
^def-truncation

## Software

```r
library(VineCopula)

# Fit R-vine structure with automatic family selection
# u: T × d matrix of pseudo-observations (empirical CDFs)
RVM <- RVineStructureSelect(
  data  = u,
  familyset = c(1, 2, 3, 4, 5, 6),  # Gaussian, t, Clayton, Gumbel, Frank, Joe
  type = 0,   # 0 = R-vine; 1 = C-vine; 2 = D-vine
  selectioncrit = "AIC",
  indeptest = TRUE,
  level = 0.05   # threshold for independence test (truncation decision)
)

# Simulate from the fitted R-vine
u_sim <- RVineSim(n = 1000, RVM = RVM)

# Compute copula log-likelihood
ll <- RVineLogLik(data = u, RVM = RVM)

# Plot vine tree structure
plot(RVM, tree = 1)  # tree = 1, 2, ..., d-1
```

## Connections

- [[Vine Copulas - Overview]] — motivation and overview of vine types.
- [[C-Vine and D-Vine Structures]] — the special cases of R-vine that this algorithm generalises.
- [[Pair-Copula Construction]] — the h-function and sequential estimation underpinning the algorithm.
- [[Copula Architecture Comparison]] — R-vine in context of other copula architectures.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence used as edge weights.

## See Also

- [[Factor Copulas - Overview]] — the competing high-dimensional copula approach using a latent factor structure.
- [[SMM Estimation of Factor Copulas]] — how SMM handles factor copulas that also lack a closed-form likelihood.
- [[../_Index|Econometrics]]
