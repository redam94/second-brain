---
title: "PC Algorithm - Skeleton Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes00-CPS-source.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Kalisch & Bühlmann (2007), §2–3"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm - V-Structures and Meek Rules]]"
aliases:
  - "PC skeleton phase"
  - "adjacency search"
  - "PC Phase 1"
---

# PC Algorithm - Skeleton Discovery

> [!summary]
> Phase 1 of the PC algorithm recovers the **skeleton** (undirected adjacency graph) of
> the true DAG by iteratively removing edges whenever a **conditional independence** is
> found. It searches for separating sets of increasing size $l = 0, 1, 2, \ldots$,
> conditioning only on neighbours of the tested pair. The recorded **separation sets**
> $\mathrm{Sep}(X, Y)$ are used in Phase 2 to orient v-structures. For Gaussian data,
> Fisher's $z$-test is used; the significance threshold $\alpha$ must shrink as $n$
> grows for consistency.

## Overview

The skeleton phase is the most computationally intensive part of the PC algorithm.
It begins with a complete graph and greedily removes edges. The key efficiency insight:
**we only need to condition on neighbours**, not all variables. Since the true Markov
blanket of $X$ that d-separates it from $Y$ must be drawn from the adjacencies of $X$
or $Y$, the algorithm restricts search to subsets of $\mathrm{Adj}(X) \setminus \{Y\}$
(or $\mathrm{Adj}(Y) \setminus \{X\}$).

## Main Content

### Formal Procedure

> [!definition] Definition: Separation Set
> For variables $X, Y \in V$, the **separation set** $\mathrm{Sep}(X, Y)$ is the minimal
> subset $S \subseteq V \setminus \{X, Y\}$ such that $X \perp\!\!\!\perp Y \mid S$.
> Under faithfulness, $\mathrm{Sep}(X, Y) = \emptyset$ implies $X$ and $Y$ are
> marginally independent; $\mathrm{Sep}(X, Y) \neq \emptyset$ means the dependence
> is explained by $S$.

**Algorithm (Phase 1 — Skeleton)**:

1. Initialize: $G^0 \leftarrow$ complete undirected graph on $V$; $l \leftarrow 0$.
2. **Repeat**:
   - For every ordered pair $(X, Y)$ adjacent in $G^{l-1}$:
     - For every $S \subseteq \mathrm{Adj}_{G^{l-1}}(X) \setminus \{Y\}$ with $|S| = l$:
       - If $X \perp\!\!\!\perp Y \mid S$: remove edge $X$-$Y$; record $\mathrm{Sep}(X,Y) = S$; **break**.
   - $l \leftarrow l + 1$
3. **Until** no pair $(X, Y)$ has $|\mathrm{Adj}(X) \setminus \{Y\}| \geq l$.
4. Output: skeleton $\hat{G}$; separation sets $\{\mathrm{Sep}(X,Y)\}$.

> [!note] PC-stable Variant
> In the original PC, edge removals during level $l$ immediately reduce adjacency sets,
> making later tests at the same $l$ use already-pruned neighbourhoods. This introduces
> **order dependence**. The **PC-stable** variant (Colombo & Maathuis, 2014) fixes this
> by computing all $l$-tests before performing any removals within a level, so the
> adjacency set used for conditioning is the same regardless of processing order.

### Conditional Independence Tests

The choice of CI test determines the algorithm's applicability:

| Data type | CI test | Test statistic | Notes |
|-----------|---------|---------------|-------|
| Multivariate Gaussian | Fisher's $z$-test | $z = \frac{1}{2} \ln \frac{1 + \hat{\rho}_{XY \cdot S}}{1 - \hat{\rho}_{XY \cdot S}}$ | Exact under normality |
| Discrete (categorical) | $\chi^2$ test / $G^2$ | $G^2 = 2\sum_{x,y,s} n_{xys} \ln \frac{n_{xys} n_s}{n_{xs} n_{ys}}$ | Requires sufficient counts |
| Non-parametric | KCI (Kernel CI test) | MMD on residuals | Zhang et al. 2011 |
| Continuous (non-Gaussian) | Partial correlation + permutation | — | Bootstrap-based |

For Gaussian data, Fisher's $z$-test is the standard choice:

$$
z_{XY \cdot S} = \frac{1}{2} \ln \frac{1 + \hat{\rho}_{XY \cdot S}}{1 - \hat{\rho}_{XY \cdot S}}
\sim \mathcal{N}\!\left(0, \frac{1}{n - |S| - 3}\right) \text{ under } H_0: \rho_{XY \cdot S} = 0
$$

The partial correlation $\hat{\rho}_{XY \cdot S}$ is computed from the $(|S|+2) \times (|S|+2)$
submatrix of the empirical covariance matrix.

### The Role of the Significance Level $\alpha$

> [!warning] Consistency requires $\alpha = \alpha(n) \to 0$
> For finite samples, $\alpha$ controls the trade-off between type I and type II errors:
> - **Large $\alpha$** (e.g., 0.10): more edges removed → sparser skeleton. Risk of
>   removing true edges (false negatives in CI detection).
> - **Small $\alpha$** (e.g., 0.001): fewer edges removed → denser skeleton. Risk of
>   retaining spurious edges.
>
> Kalisch & Bühlmann (2007) show that for high-dimensional consistency, $\alpha$ must
> satisfy $\alpha = O(1/\log n)$ or similar — a schedule that tightens with sample size.
> In practice, typical values are $\alpha \in [0.01, 0.05]$ for moderate $n$.

### Error Propagation

A key concern in skeleton discovery is **error propagation**: incorrect edge removals
in early (small $l$) rounds change the conditioning set available for later rounds,
potentially causing correct edges to be removed (because the conditioning set no longer
contains the true separator). This makes PC sensitive to sample noise, especially for:

- **Dense graphs** (high degree): large conditioning sets at high $l$, low power.
- **Near-faithfulness violations**: weak CI relationships that are statistically marginal.
- **High-dimensional settings**: many spurious correlations, increasing false-positive CI detections.

PC-stable mitigates within-level error propagation; the FCI algorithm and RFCI address
the more fundamental problem of latent confounders.

## Examples

> [!example] Example: Three-variable linear Gaussian DAG
> True DAG: $X \to Y \to Z$ (chain).
>
> **Level $l=0$** (marginal independence tests):
> - $X \perp\!\!\!\perp Z$? No — $X$ and $Z$ are marginally dependent (through $Y$). Keep edge.
> - $X \perp\!\!\!\perp Y$? No. Keep edge.
> - $Y \perp\!\!\!\perp Z$? No. Keep edge.
> → No edges removed at $l=0$.
>
> **Level $l=1$** (conditioning on one variable):
> - Test $X \perp\!\!\!\perp Z \mid Y$: Yes! $Y$ d-separates $X$ from $Z$ in the chain.
>   Remove edge $X$-$Z$; record $\mathrm{Sep}(X, Z) = \{Y\}$.
> → Skeleton: $X$-$Y$-$Z$ (correct).
>
> In Phase 2: since $\mathrm{Sep}(X, Z) = \{Y\}$ and the triple is $X$-$Y$-$Z$ with $Y$
> in the separator, there is **no v-structure** at $Y$.

## Connections

- **Phase 2 dependency**: the separation sets $\mathrm{Sep}(X, Y)$ recorded here are
  directly used in [[PC Algorithm - V-Structures and Meek Rules]] to detect v-structures
  (triples where $Z \notin \mathrm{Sep}(X, Y)$).
- **GES Phase 1 analogue**: the FES phase of GES also recovers the skeleton, but via
  greedy score improvement rather than CI tests — see [[GES - Greedy Equivalence Search]].
- **Faithfulness dependence**: every edge removal assumes faithfulness (no accidental
  independencies). See [[Markov Equivalence Classes and CPDAGs]] for the definition.

## See Also
- [[PC Algorithm - Overview]] — algorithm overview and all three phases
- [[PC Algorithm - V-Structures and Meek Rules]] — what happens after the skeleton is found
- [[Markov Equivalence Classes and CPDAGs]] — why the skeleton + v-structures suffice to identify the CPDAG
