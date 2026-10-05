---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/CITATIONS-constraint-score-based-discovery.md]]"
source_location: "Spirtes et al. 2000 Ch. 5-6; Kalisch & Bühlmann 2007 §3-4"
date_ingested: 2026-10-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Causal Discovery Assumptions]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
  - "[[Causal Discovery Methods - Overview]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "skeleton identification"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after its inventors **P**eter Spirtes and **C**lark
> Glymour) is the flagship **constraint-based** causal discovery algorithm. It
> recovers the **CPDAG** of the true DAG by: (1) starting from a complete
> undirected graph and removing edges via conditional independence (CI) tests
> (skeleton phase); (2) orienting unshielded colliders (v-structure phase);
> (3) propagating orientations via Meek's four rules (completion phase).
> Under Faithfulness + CMC + Causal Sufficiency, PC is **consistent**; in high
> dimensions, it is consistent whenever $d = O(n^a)$ for any $a$ under sparsity
> (Kalisch & Bühlmann 2007).

## Overview

The key insight of PC is that **conditional independence tests are cheap and
the Markov condition makes them informative**: if $X \perp Y \mid S$ in $P$,
then $X - Y$ cannot be an edge in the true skeleton. By systematically testing
all pairs at increasing conditioning set sizes, PC efficiently prunes a complete
graph to the true skeleton. Edge orientation then follows from the CI structure:
colliders $X \to Z \leftarrow Y$ are the only v-structures where removing $Z$
from the conditioning set creates dependence.

## Main Content

### Phase 1: Skeleton Identification

**Input**: $n$ i.i.d. samples from $P(X_1,\ldots,X_d)$.
**Start**: Complete undirected graph $C$ on $d$ nodes (all $\binom{d}{2}$ edges present).

> [!definition] Definition: PC Skeleton Algorithm (Spirtes et al. 2000, Alg. 5.4.1)
> 1. Set $\ell = 0$. Initialize $C$ as the complete undirected graph.
> 2. **For each ordered pair** $(X, Y)$ adjacent in $C$:
>    a. Collect $\mathrm{Adj}(C, X) \setminus \{Y\}$, the current neighbors of $X$ excluding $Y$.
>    b. If $|\mathrm{Adj}(C, X) \setminus \{Y\}| \geq \ell$:
>       - Test $X \perp Y \mid S$ for all $S \subseteq \mathrm{Adj}(C, X) \setminus \{Y\}$ with $|S|=\ell$.
>       - If any test accepts independence: remove edge $X - Y$ from $C$; record $\mathrm{Sep}(X,Y) = S$.
> 3. Increment $\ell \leftarrow \ell + 1$.
> 4. Repeat from step 2 until no edge in $C$ has $|\mathrm{Adj}(C, X) \setminus \{Y\}| \geq \ell$.
> 5. **Output**: skeleton $C$ and separating sets $\mathrm{Sep}(X,Y)$ for each removed edge.
^def-pc-skeleton

**Key efficiency gain over the naive approach**: PC only tests conditioning sets
$S \subseteq \mathrm{Adj}(C, X)$, not all subsets of $V$. For sparse DAGs where
max in-degree is bounded by $q$, this requires at most $O(d^2 \cdot d^q)$ CI
tests instead of $O(2^d)$.

**What the separating sets $\mathrm{Sep}(X,Y)$ encode**: The set $S$ that renders
$X$ and $Y$ independent. Crucially, $Z$ is a collider $X \to Z \leftarrow Y$ iff
$Z \notin \mathrm{Sep}(X,Y)$.

### Phase 2: V-Structure Orientation

After skeleton identification, orient **unshielded colliders**.

> [!definition] Definition: V-Structure (Unshielded Collider) Orientation
> For each **unshielded triple** $X - Z - Y$ (i.e., $X$ and $Y$ are non-adjacent):
> - If $Z \notin \mathrm{Sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (collider).
> - If $Z \in \mathrm{Sep}(X, Y)$: leave $X - Z - Y$ unoriented (non-collider).
^def-vstructure-orient

**Why this works**: Under faithfulness, $X \perp Y \mid S$ iff $S$ d-separates
$X$ and $Y$. If $Z$ is a collider $X \to Z \leftarrow Y$, then conditioning on
$Z$ (or its descendants) creates dependence between $X$ and $Y$ — so $Z$ must
*not* be in any separating set of $X,Y$.

### Phase 3: Edge Orientation Completion (Meek Rules)

After v-structure orientation, propagate directions to avoid creating new
v-structures or cycles. Meek (1995) proved four orientation rules are
complete for this task:

> [!theorem] Theorem: Meek's Orientation Rules (Meek 1995)
> Apply the following rules exhaustively (in any order) until no more apply:
>
> **Rule R1** (Non-collider): If $X \to Z - Y$ and $X$ and $Y$ are non-adjacent,
> orient $Z \to Y$.
> *Why*: Orienting $Z \leftarrow Y$ would create a new v-structure $X \to Z \leftarrow Y$,
> which is absent from the skeleton — contradiction.
>
> **Rule R2** (Acyclicity): If $X \to Y \to Z$ and $X - Z$ are present,
> orient $X \to Z$.
> *Why*: Orienting $Z \to X$ would create a directed cycle $X \to Y \to Z \to X$.
>
> **Rule R3** (Double non-collider): If $X - Z$, and there exist $W \to Z$ and
> $V \to Z$ with $W - X - V$ all present but $W$ and $V$ non-adjacent, orient $X \to Z$.
> *Why*: Both $W - X - Z$ and $V - X - Z$ must be non-colliders (or they would be
> v-structures). This forces a unique orientation.
>
> **Rule R4** (Discordant triple): If $W \to X - Y$ and $W - Z \to Y$ with $Z - X$
> present, orient $X \to Y$.
>
> Under CMC + Faithfulness, these four rules are **complete**: they recover the
> full CPDAG of the true MEC.
^thm-meek-rules

### CI tests in practice

The PC algorithm is **nonparametric** in principle — any valid CI test works.
In practice:

| Data type | CI test | Software |
|-----------|---------|---------|
| Gaussian continuous | **Fisher's Z** (partial correlation): $T = \frac{1}{2}\log\frac{1+\hat\rho_{XY|S}}{1-\hat\rho_{XY|S}} \cdot \sqrt{n - |S| - 3} \sim N(0,1)$ | pcalg (R) |
| Non-Gaussian continuous | **Kernel-based** (HSIC, KCI) | causal-learn (Python) |
| Discrete | **Chi-squared / G-test** | bnlearn (R) |
| Mixed | **Conditional distance correlation** | kpcalg (R) |

For Gaussian data, the standard practice is to use partial correlations and
Fisher's Z-test with significance level $\alpha$ (typical: $\alpha = 0.01$).

### High-dimensional consistency (Kalisch & Bühlmann 2007)

> [!theorem] Theorem: High-Dimensional PC Consistency (Kalisch & Bühlmann 2007, Thm. 3)
> Let $G^*$ be the true DAG with maximum in-degree (neighborhood size) $q$. Assume
> Gaussianity, CMC, Faithfulness, and Causal Sufficiency. Fix any $a > 0$.
> If $d = O(n^a)$ and the minimum partial correlation for an edge in $G^*$ satisfies
> $\min_{(i,j)\in E} |\rho_{ij|S}| \geq c \cdot \sqrt{\log d / n}$ for some $c > 0$,
> then with probability tending to 1, the PC algorithm (with Fisher's Z test at
> level $\alpha_n \to 0$) outputs the correct CPDAG.
^thm-highd-pc

This is a significant result: PC can consistently identify the DAG skeleton even
when $d \gg n$, provided the graph is sparse and edge partial correlations are
bounded away from zero.

### Order-dependence problem

A practical issue: the vanilla PC algorithm is **order-dependent** — the CPDAG
it returns may differ depending on the order in which pairs $(X, Y)$ are tested.
This is because an early decision to keep or remove an edge affects which
conditioning sets are available later.

**Fix**: Colombo & Maathuis (2014) propose the **PC-stable** algorithm, which
ensures order-independence by completing each level $\ell$ before using its
results to update adjacencies. This is the recommended implementation in the
`pcalg` R package.

### Computational complexity

- **Number of CI tests**: At most $O(d^2 \cdot d^q)$ for bounded degree $q$.
  For dense graphs this is expensive; the algorithm is practical for sparse settings.
- **Per-test cost**: For Fisher's Z, each CI test at order $\ell$ is $O(n \cdot \ell^2)$ (partial correlation).
- **Total**: For $q = O(1)$ (sparse), $O(d^2 n)$ tests dominate.
- **Comparison to GES**: GES can be faster for moderate $d$ due to CPDAG-space
  search; PC is faster for very sparse, high-dimensional $d \gg n$ settings.

## Examples

> [!example] Example: PC on the Sachs Protein Signaling Network
> **Data**: Sachs et al. (2005) — 7,466 measurements of 11 proteins.
> **True graph**: known from biological experiments (37 directed edges).
> **PC result** (Kalisch & Bühlmann 2007): At $\alpha = 0.01$, PC recovers a
> CPDAG with SHD (Structural Hamming Distance) ≈ 9–12 vs. the known DAG.
> **NOTEARS comparison** ([[NOTEARS Experiments]]): NOTEARS achieves SHD ≈ 10
> on the same data — both methods are competitive on real biological data.

## Connections

- [[GES - Greedy Equivalence Search]] — the score-based counterpart; different
  paradigm but same target (CPDAG) and same guarantees under faithfulness.
- [[NOTEARS Experiments]] — empirical benchmarks include PC as a baseline;
  NOTEARS often beats PC on Gaussian SEM data.
- [[Directed Acyclic Graphs]] — d-separation is the theoretical foundation for
  why CI tests recover the skeleton.
- [[Conditional Independence Assumption]] — observational causal inference also
  rests on conditional independence, but for *identifying effects*, not structure.

## See Also
- [[GES - Greedy Equivalence Search]] — score-based complement
- [[Markov Equivalence Classes and CPDAGs]] — the output space
- [[Causal Discovery Assumptions]] — what PC requires to be consistent
- [[Causal Discovery Methods - Overview]] — full landscape
- [[DAG Structure Learning Problem]] — problem setup and NP-hardness
