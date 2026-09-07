---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo2014-PC-stable-source.md]]"
source_location: "§1 Introduction, §2 Background, pp. 3921–3930"
date_ingested: 2026-09-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "conditional independence testing structure learning"
  - "CI-based causal discovery"
  - "skeleton learning"
  - "constraint-based structure learning"
---

# Constraint-Based Causal Discovery

> [!summary]
> **Constraint-based causal discovery** learns DAG structure by testing conditional
> independence (CI) relationships in the data, treating each CI statement as a *constraint*
> the true graph must satisfy. The canonical approach is the **PC algorithm** (Spirtes,
> Glymour & Scheines, 2000). Under the Markov and faithfulness assumptions, these methods
> are **consistent**: they return the CPDAG of the true DAG in large samples. The key
> practical challenge is that CI testing in high dimensions requires many tests (exponential
> in the number of variables) and the tests themselves can be unreliable in finite samples —
> a sharp contrast with score-based methods like GES.

## Overview

The constraint-based paradigm rests on a simple idea: if $X \perp\!\!\!\perp Y \mid \mathbf{S}$
in the data, there should be no direct edge between $X$ and $Y$ in the graph (by faithfulness).
By testing all pairs and conditioning sets, we can reconstruct the graph skeleton; then
v-structure orientation and Meek rules determine the orientations.

Three components are required:
1. A **CI oracle** (in practice, a statistical CI test)
2. A **skeleton-learning algorithm** (determines the undirected graph)
3. An **orientation algorithm** (determines edge directions from v-structures + Meek rules)

## Main Content

### Conditional Independence Testing

The CI test is the computational workhorse. In finite samples, we must decide whether
$X \perp\!\!\!\perp Y \mid \mathbf{S}$ at some significance level $\alpha$.

> [!definition] Conditional Independence Test
> A **CI test** for variables $(X, Y, \mathbf{S})$ returns a p-value under the null
> $H_0: X \perp\!\!\!\perp Y \mid \mathbf{S}$. We **reject** adjacency (remove the edge $X-Y$)
> if the p-value exceeds $\alpha$ (i.e., we fail to reject independence).
>
> Common choices by data type:
>
> | Data type | CI test | Notes |
> |-----------|---------|-------|
> | Continuous, Gaussian | **Fisher's z-test** (partial correlation) | Exact for Gaussian; robust for large $n$ |
> | Continuous, non-Gaussian | **Kernel CI test** (HSIC-based) | Nonparametric; expensive |
> | Discrete (multinomial) | **$G^2$ or $\chi^2$ test** | Requires enough data per cell |
> | Mixed | **Conditional Gaussian test** | For mixed continuous/discrete |
> | General | **Invariant causal prediction** | Tests across environments |
^def-ci-test

**Fisher's z-test** for Gaussian data: for sample partial correlation $\hat{\rho}_{XY|\mathbf{S}}$
with $n$ samples:
$$z = \frac{1}{2}\ln\frac{1+\hat{\rho}_{XY|\mathbf{S}}}{1-\hat{\rho}_{XY|\mathbf{S}}}} \sim \mathcal{N}\!\left(0,\,(n-|\mathbf{S}|-3)^{-1}\right)$$
under $H_0$. This is the test used in the PC and PC-stable algorithms by default.

### Skeleton Learning Algorithm

The **skeleton** is the undirected graph with the same adjacencies as the true DAG.

> [!definition] Algorithm: Skeleton Learning (PC Phase 1)
> **Input:** Variables $\mathbf{X} = (X_1,\ldots,X_d)$, significance level $\alpha$, CI test.
>
> **Initialize:** Start with the complete undirected graph $\mathcal{C}$ (all pairs adjacent).
>
> **For** $\ell = 0, 1, 2, \ldots$ (conditioning set size):
>   **For** each adjacent pair $(X_i, X_j)$ in the current graph:
>     **For** each subset $\mathbf{S} \subseteq \mathrm{Adj}(X_i) \setminus \{X_j\}$ with $|\mathbf{S}|=\ell$:
>       **If** $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$: remove edge $X_i - X_j$,
>       store $\mathrm{Sep}(X_i, X_j) := \mathbf{S}$, **break** inner loop.
>
> **Return:** Skeleton $\hat{\mathcal{S}}$ and separation sets $\{\mathrm{Sep}(X_i, X_j)\}$.
^alg-skeleton-learning

**Key property:** At level $\ell$, we only need to condition on sets of size $\ell$. The
maximum conditioning set size needed equals the maximum **Markov blanket** size in the true
DAG. In sparse graphs (bounded in-degree $k$), the algorithm runs in $O(d^{k+2})$ time
rather than the $O(d^{2^d})$ of exhaustive search.

### Order-Dependence Problem and PC-Stable

**Problem (Colombo & Maathuis, 2014):** In the original PC algorithm, edge removals during
skeleton learning affect which conditioning sets are later considered. This makes the
skeleton **order-dependent**: different orderings of the variables can yield different
skeletons in finite samples.

> [!definition] PC-Stable Fix
> In **PC-stable**, the adjacency sets used for conditioning are frozen at the start of each
> level $\ell$: all CI tests for level $\ell$ are collected before any edges are removed.
> Formally: compute $\mathrm{Sep}(i,j)$ for all adjacent pairs at level $\ell$, then remove
> all edges found to be separable. This one change yields an **order-independent skeleton**
> in finite samples.
^def-pc-stable

### Orientation: V-Structures and Meek Rules

After skeleton learning, edges are oriented in two sub-steps:

**Step 1 — V-structure orientation:** For each unshielded triple $X_i - X_k - X_j$
(where $X_i \not\sim X_j$): orient as $X_i \to X_k \leftarrow X_j$ iff $X_k \notin
\mathrm{Sep}(X_i, X_j)$. (A collider is in the conditioning sets that *don't* separate the
endpoints, but *not* in the sets that do — faithfulness forces the non-adjacent endpoints to
be marginally dependent when we condition on the collider.)

**Step 2 — Meek rules:** Apply Meek's (1995) orientation rules R1–R4 exhaustively until no
more orientations can be made. See [[Markov Equivalence Classes and CPDAGs#thm-meek-rules]].

### Assumptions and Consistency

> [!theorem] Consistency of PC-Stable (Colombo & Maathuis, 2014, Thm. 3)
> Suppose:
> (A1) The CI oracle is correct (or CI tests are consistent at level $\alpha_n \to 0$, $n\alpha_n \to \infty$).
> (A2) The data-generating DAG $\mathcal{G}^*$ satisfies the **Markov condition** w.r.t. $P$.
> (A3) $P$ is **faithful** to $\mathcal{G}^*$.
> (A4) **Causal sufficiency**: no unmeasured common causes.
>
> Then PC-stable consistently estimates the CPDAG of $\mathcal{G}^*$ as $n \to \infty$.
^thm-pc-stable-consistency

**Failure modes:**
- Faithfulness fails (measure-zero but can happen in designed systems)
- Causal sufficiency violated (hidden common causes) → use FCI (Fast Causal Inference)
  instead, which outputs a PAG (Partial Ancestral Graph)
- CI tests unreliable in high dimensions with small $\ell$ caps

### Complexity

| Phase | Time complexity | Bottleneck |
|-------|----------------|------------|
| Skeleton learning (general) | $O\!\left(d^{k+2} \binom{d}{k}\right)$ where $k=$ max degree | CI tests with large conditioning sets |
| V-structure orientation | $O(d^3)$ | Looping over unshielded triples |
| Meek rules | $O(d^2)$ | Propagation |

For sparse DAGs (bounded max degree), the CI test is the bottleneck, not the graph search.
For dense graphs, the algorithm becomes infeasible and score-based approaches (GES) are preferable.

## Contrast with Score-Based Methods

| Criterion | Constraint-based (PC) | Score-based (GES) |
|-----------|----------------------|-------------------|
| Core operation | CI tests (hypothesis tests) | Score optimization (BIC, BDe) |
| Output | CPDAG | CPDAG |
| Consistency | Yes (faithfulness + Markov) | Yes (faithfulness + Markov + score) |
| Finite-sample performance | Sensitive to test choices and $\alpha$ | Robust to score calibration |
| Scalability | Poor for dense graphs | Better for moderate $d$ |
| Interpretability | Direct: edge ↔ CI test | Indirect: score improvement |
| Main failure mode | CI test errors accumulate | Greedy search may miss global optimum |

## Connections

- [[PC Algorithm]] — the full PC algorithm implementing this framework
- [[Markov Equivalence Classes and CPDAGs]] — the MEC structure that determines what can be identified
- [[Greedy Equivalence Search (GES)]] — the score-based alternative; both output CPDAGs
- [[NOTEARS - Overview]] — continuous optimization approach that bypasses CI testing entirely
- [[DAG Structure Learning Problem]] — the problem setup shared by all structure-learning methods
- [[Directed Acyclic Graphs]] — d-separation, the CI criterion used in constraint-based discovery

## See Also
- [[PC Algorithm]] — implementation details and PC-stable pseudocode
- [[Greedy Equivalence Search (GES)]] — the score-based complement
- [[Summary Causal DAGs]] — downstream use of learned DAG structure
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven learning
