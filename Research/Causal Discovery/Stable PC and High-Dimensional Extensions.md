---
title: "Stable PC and High-Dimensional Extensions"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/colombo-maathuis-2014-stable-pc.md]]"
source_location: "Full paper; Kalisch & Bühlmann (2007) §3–5"
date_ingested: 2026-10-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Causal Discovery Assumptions]]"
used_by:
  - "[[GES Algorithm]]"
aliases:
  - "Stable-PC"
  - "PC-stable"
  - "order-independent PC"
  - "Colombo Maathuis 2014"
  - "Kalisch Bühlmann 2007"
---

# Stable PC and High-Dimensional Extensions

> [!summary]
> The standard PC algorithm is **order-dependent**: different orderings of variables in the
> input can produce different CPDAGs, especially in high dimensions. **Stable-PC** (Colombo
> & Maathuis 2014) fixes this by collecting all CI test results at each conditioning level
> $l$ before updating any adjacency set, ensuring the same conditioning sets are used
> regardless of variable ordering. Separately, **Kalisch & Bühlmann (2007)** proved that PC
> is uniformly consistent for Gaussian DAGs in the high-dimensional regime $d = O(n^a)$,
> provided the graph is sparse (bounded degree).

## Overview

The order-dependence problem in PC is subtle: as the skeleton phase removes edges, the
conditioning sets available for subsequent tests shrink. In the standard PC, an edge removal
immediately updates the adjacency sets, so the order in which pairs are tested — which is
determined by variable ordering — changes what conditioning sets are available. In low
dimensions this typically matters little; in high dimensions it can substantially affect
which CPDAG is returned.

## Main Content

### The order-dependence problem

> [!definition] Order-Dependence in PC Skeleton Phase
> In the standard PC skeleton phase, the conditioning sets at level $l$ are drawn from
> $\text{Adj}^{(l)}(X) \setminus \{Y\}$, where $\text{Adj}^{(l)}$ is the adjacency set
> **after removing edges tested at levels $0, 1, \ldots$**. The order in which variables
> are processed determines the sequence of edge removals, and hence the conditioning sets
> used in later tests at the same level $l$.
>
> Consequence: the skeleton $\mathcal{S}$ and separation sets $\{\text{sep}(X,Y)\}$ can
> differ across variable orderings, leading to different v-structures and different CPDAGs.
^def-order-dependence

### Stable-PC fix

> [!definition] Stable-PC Algorithm (Colombo & Maathuis 2014)
> Modify the skeleton phase to separate **testing** from **updating**:
>
> For each level $l = 0, 1, 2, \ldots$:
> 1. **Collect** all CI test decisions at level $l$ using the adjacency sets
>    $\text{Adj}^{(l-1)}$ (the adjacency sets from the *previous* level — not yet updated).
> 2. After all pairs have been tested at level $l$: **update** adjacency sets by removing
>    all edges for which a separating set of size $l$ was found.
> 3. Increment $l$.
>
> This ensures that all pairs at level $l$ use the **same adjacency sets** for conditioning,
> regardless of variable ordering. The output skeleton is therefore **order-independent**.
^def-stable-pc

> [!note] Conservative-PC
> **Conservative-PC** (also in Colombo & Maathuis 2014) adds an additional check for
> v-structure orientation: an unshielded triple $X - Z - Y$ is oriented as a v-structure
> only if $Z \notin S$ for **all** minimal separating sets $S$ of $(X,Y)$ — using a
> "majority rule" when multiple minimal separating sets exist. This avoids orienting
> ambiguous v-structures and produces a more conservative but robust CPDAG.

### High-dimensional consistency (Kalisch & Bühlmann 2007)

> [!theorem] Theorem: Uniform Consistency of PC in High Dimensions (Kalisch & Bühlmann 2007)
> Let $\mathcal{G}^\star$ be the true DAG with $d$ nodes and maximum degree $q^\star$.
> Under the Causal Markov Condition, Faithfulness, and Causal Sufficiency, if the data are
> i.i.d. Gaussian with distribution faithful to $\mathcal{G}^\star$, and the thresholding
> level $\alpha_n \to 0$ satisfies $\alpha_n = O(n^{-c})$ for some $c > 0$:
>
> 1. **Sparse regime**: If $q^\star = O(n^{1-b})$ for some $b > 0$ (bounded growth of degree),
>    the PC-estimated skeleton converges to the true skeleton **uniformly** as $n \to \infty$.
>
> 2. **High-dimensional regime**: The number of variables $d$ may grow with $n$ as fast as
>    $d = O(n^a)$ for any $0 < a < \infty$ — thus allowing $d \gg n$ in sparse settings.
>
> 3. **CPDAG consistency**: The estimated CPDAG converges to the true CPDAG in probability.
>
> *Key condition*: The maximum degree $q^\star$ must not grow too fast (sparsity is required).
^thm-highdim

> [!note] Practical implication
> The high-dimensional result says PC can be used even when $d \gg n$, provided the true
> graph is sparse. This is the same sparsity condition as in high-dimensional regression
> (lasso, ridge): many variables but few causal parents per variable. In dense graphs
> ($q^\star \sim d$), PC's consistency guarantee breaks down.

### The pcalg R package

The primary software implementation is the `pcalg` R package (Kalisch, Mächler, Colombo,
Maathuis & Bühlmann 2012, JOSS):

```r
library(pcalg)

# Run Stable-PC on a data matrix X (n x d)
suffStat <- list(C = cor(X), n = nrow(X))
pc_fit <- pc(
  suffStat  = suffStat,
  indepTest = gaussCItest,    # Fisher's z-test for Gaussian data
  alpha     = 0.01,           # CI test significance level
  p         = ncol(X),        # number of variables
  skel.method = "stable"      # Stable-PC (order-independent)
)

# Plot the CPDAG
plot(pc_fit@graph)

# Run GES
ges_fit <- ges(new("GaussL0penObsScore", X))
```

Key functions:
- `pc()` — Stable-PC and standard-PC skeleton + orientation
- `fci()` / `rfci()` — FCI variants for latent confounders (PAG output)
- `ges()` — Greedy Equivalence Search (see [[GES Algorithm]])
- `ida()` — Intervention-calculus when structure is a CPDAG (bounds on causal effects)
- `jointIda()` — Joint intervention effects

Python alternative: the `causal-learn` package (Zheng et al., PyPI) implements PC, GES,
FCI, LiNGAM, and other methods in a sklearn-like API.

## Connections

- **Score-based comparison**: GES ([[GES Algorithm]]) is the score-based counterpart to PC. Under
  the same assumptions, they recover the same CPDAG in large samples, but by different routes
  (CI tests vs. BIC/BDeu scoring).
- **NOTEARS comparison**: [[NOTEARS Experiments]] benchmarks NOTEARS against PC (and FGS, a
  fast GES variant). NOTEARS dominates in dense/large graphs; PC can be more accurate in very
  sparse settings with a good CI test.
- **Post-PC causal effects**: Once the CPDAG is estimated, `pcalg::ida()` uses the
  **IDA algorithm** (Maathuis, Kalisch & Bühlmann 2009) to bound total causal effects
  of $X_i$ on $X_j$ across all DAGs in the equivalence class — addressing the fact that
  a CPDAG doesn't uniquely determine a causal effect.

## See Also
- [[PC Algorithm]] — the base algorithm; skeleton + orientation phases
- [[GES Algorithm]] — score-based alternative to PC
- [[Causal Discovery Assumptions]] — Markov, Faithfulness, Sufficiency
- [[Markov Equivalence Classes and CPDAGs]] — the identifiable output (CPDAG)
- [[NOTEARS Experiments]] — empirical comparison with PC
