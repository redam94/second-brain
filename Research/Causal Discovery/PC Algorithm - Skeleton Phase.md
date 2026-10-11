---
title: "PC Algorithm - Skeleton Phase"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-algorithm-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) §5.4.2; Kalisch & Bühlmann (2007) §2.1"
date_ingested: 2026-10-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[PC Algorithm - Orientation Phase]]"
aliases:
  - "skeleton learning"
  - "adjacency search PC"
  - "conditional independence testing structure learning"
---

# PC Algorithm - Skeleton Phase

> [!summary]
> The **skeleton phase** of the PC algorithm discovers the undirected adjacency structure of
> the true DAG by iteratively removing edges when a **conditional independence** (CI) test
> finds a *separating set* (sepset) for a pair of variables. The key efficiency insight is
> to search conditioning sets $S$ in order of increasing size $|S|$, beginning with $|S|=0$
> (marginal independence). Under faithfulness, this finds the correct skeleton with probability
> approaching 1, while requiring at most $O(p^q)$ CI tests for max-degree $q$ graphs.

## Overview

Starting from the **complete undirected graph** on $p$ variables, the skeleton phase removes
edges one by one. An edge $X_i - X_j$ is removed when a set $S \subseteq \{X_1,\dots,X_p\} \setminus \{X_i, X_j\}$ is found such that $X_i \perp\!\!\!\perp X_j \mid S$. This set is stored as the **separating set** (sepset) for the pair $(X_i, X_j)$ — it is needed in the orientation phase for v-structure identification.

## Main Content

### Algorithm 1: Skeleton learning (Spirtes, Glymour & Scheines 2000 §5.4.2)

> [!definition] Definition: Separating set (sepset)
> For variables $X_i, X_j$, the **separating set** $\mathrm{Sepset}(X_i, X_j)$ is any set $S$ of
> other variables such that $X_i \perp\!\!\!\perp X_j \mid S$ holds in the distribution $P$.
> Under faithfulness, a separating set exists iff $X_i$ and $X_j$ are d-separated in the
> true DAG given $S$.
^def-sepset

```
SkeletonPC(variables V, CI oracle, significance α):
  G ← complete undirected graph on V
  Sepset ← {} (empty dictionary)
  l ← 0

  repeat:
    for each adjacent pair (Xi, Xj) in G:
      let Adj(Xi, G) = neighbors of Xi in current G
      for each S ⊆ Adj(Xi, G) \ {Xj} with |S| = l:
        if CI_test(Xi, Xj | S) is not rejected at level α:
          remove edge Xi — Xj from G
          Sepset(Xi, Xj) ← S; Sepset(Xj, Xi) ← S
          break (move to next pair)
    l ← l + 1
  until no more edges removed or max |S| exceeded

  return (G, Sepset)
```

### Why order conditioning sets by size?

Two key properties justify the size-ordering:
1. **Computational efficiency under sparsity**: in a true DAG with max degree $q$, each pair
   $(X_i, X_j)$ that should be separated requires a separating set of size at most $q-1$
   (the neighbors of one endpoint). Ordering by $|S|$ finds small separating sets first and
   terminates early, giving $O(p^q)$ tests rather than $O(p^{2^p})$.
2. **Faithfulness entails existence**: by the faithfulness assumption, $X_i \not\!\perp\!\!\!\perp X_j$
   iff there is no separating set. So the algorithm will *not* falsely remove an existing edge:
   if no separating set exists, no CI test will accept, and the edge is retained.

### The CI test oracle in practice

> [!note] CI tests for the PC algorithm
> The choice of CI test is crucial and application-dependent:
>
> | Setting | Test | Null distribution |
> |---------|------|------------------|
> | Gaussian / linear | Fisher's $z$-transform of partial correlation | $N(0,1)$ |
> | Discrete variables | $\chi^2$ test on conditional tables | $\chi^2$ |
> | Non-linear / non-parametric | Kernel-based HSIC, CMI, or GP-based tests | Permutation |
>
> Kalisch & Bühlmann (2007) establish consistency specifically for Fisher's $z$-transform under
> Gaussian SEM. For non-Gaussian data, non-parametric CI tests are preferred but lose the
> high-dimensional consistency result.

Fisher's $z$-transform test for partial correlation $\hat{\rho}_{XY|S}$:
$$z_{XY|S} = \frac{1}{2} \log\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}}, \qquad z_{XY|S} \approx N\!\left(0,\, \frac{1}{n-|S|-3}\right).$$

Reject independence at level $\alpha$ if $|z_{XY|S}| > \Phi^{-1}(1 - \alpha/2)/\sqrt{n-|S|-3}$.

### Complexity

> [!theorem] Theorem: Complexity bound (Kalisch & Bühlmann 2007, §2.1)
> In the worst case, the skeleton phase makes $O(p^{q+2})$ CI tests, where $q$ is the maximum
> degree of the true underlying DAG. For **sparse** graphs ($q$ fixed as $p \to \infty$),
> this is **polynomial** in $p$. For dense graphs ($q = O(p)$), the worst case is exponential.
^thm-complexity

This polynomial complexity under sparsity is what makes PC practical for high-dimensional settings.

### Order-dependence and Stable-PC

**Known limitation**: the original PC algorithm is **order-dependent** — the skeleton it returns
depends on the order in which variables appear in the adjacency list, because different orderings
test different conditioning sets first and may reach different marginal decisions.

> [!note] Stable-PC (Colombo & Maathuis 2014)
> **Stable-PC** fixes order-dependence by:
> 1. In each pass, forming the adjacency sets $\mathrm{Adj}(X_i, G)$ from the graph at the
>    **start** of that pass (not as edges are deleted mid-pass).
> 2. Recording **all** sets $S$ that separate a pair before removing the edge, rather than
>    stopping at the first one found.
>
> Stable-PC produces the same population-limit result as the original but is **order-independent**
> in finite samples. It is the recommended default in the `pcalg` R package.

## Connections

- **Output feeds orientation**: the skeleton $G$ and sepsets are the only inputs to the orientation phase ([[PC Algorithm - Orientation Phase]]).
- **vs. GES forward phase** ([[Greedy Equivalence Search]]): GES *adds* edges greedily (starting from empty) rather than removing them from complete. Both approaches converge to the same skeleton in population, but have different finite-sample behavior.
- **DAG faithfulness**: the correctness of the skeleton phase relies entirely on the faithfulness assumption in [[PC Algorithm - Overview]].

## See Also
- [[PC Algorithm - Overview]] — assumptions, consistency, algorithm overview
- [[PC Algorithm - Orientation Phase]] — using the skeleton and sepsets to orient edges
- [[Greedy Equivalence Search]] — score-based approach to the same skeleton recovery problem
