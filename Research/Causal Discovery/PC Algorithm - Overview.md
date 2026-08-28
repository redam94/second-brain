---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/lee25a-constraint-causal-discovery.pdf]]"
source_location: "§1 Introduction, §2 Background; Lee et al. UAI 2025"
date_ingested: 2026-08-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Testing in Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm"
  - "Spirtes Glymour algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm — Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000)
> is the canonical **constraint-based** algorithm for causal structure learning. It recovers
> the **CPDAG** of the true causal DAG from observational data using a sequence of conditional
> independence (CI) tests, without evaluating any score function over the graph space.
> Starting from a complete undirected graph, PC progressively removes edges wherever a
> separating set is found, then orients v-structures and propagates directions via Meek's
> rules. Under the Causal Markov condition, faithfulness, and causal sufficiency, PC is
> **asymptotically correct** — it returns the true CPDAG in the large-sample limit.

## Overview

Spirtes and Glymour named the algorithm "PC" after its inventors (**P**eter Spirtes and
**C**lark Glymour). It was the first asymptotically correct algorithm for causal discovery
and established the constraint-based paradigm. The key insight: d-separation in the true
DAG $D^*$ maps exactly onto conditional independence in the data distribution (under the
Markov condition and faithfulness), so CI tests can be used as *oracles* for graph structure.

The PC algorithm exploits a crucial **efficiency trick**: instead of testing all $\binom{d}{2}$
variable pairs against all $\binom{d-2}{k}$ conditioning sets of size $k$, it restricts tests
to variables that are *currently adjacent* in the evolving skeleton. This makes the complexity
polynomial in $d$ for sparse graphs.

## Main Content

### Assumptions

> [!definition] Definition: Three Core Assumptions of PC
> 1. **Causal Markov**: each variable is independent of its non-descendants conditional on
>    its parents (see [[Markov Equivalence Classes and CPDAGs#^def-markov-cond]]).
> 2. **Faithfulness**: no CI in the data is accidental — all CIs are entailed by d-separations
>    (see [[Markov Equivalence Classes and CPDAGs#^def-faithfulness]]).
> 3. **Causal sufficiency**: all common causes of the observed variables are among the
>    observed variables (no hidden confounders / latent variables). If violated, the FCI
>    algorithm (Fast Causal Inference) is needed instead.
> ^def-pc-assumptions

### The Three-Phase Algorithm

#### Phase 1 — Skeleton Recovery

> [!definition] Definition: Skeleton Recovery (PC Phase 1)
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
>
> **Algorithm:**
> 1. Start with the **complete undirected graph** $G = K_d$ (edge between every pair).
> 2. For $k = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in current $G$:
>      - For each set $S$ of size $k$ drawn from $\text{adj}(X_i) \setminus \{X_j\}$
>        (or symmetrically $\text{adj}(X_j) \setminus \{X_i\}$):
>        - Test $H_0: X_i \perp\!\!\!\perp X_j \mid S$ using a CI test.
>        - If independence is accepted (p-value $> \alpha$): **remove edge** $X_i - X_j$,
>          record $\text{sep}(X_i, X_j) \leftarrow S$.
>    - Terminate when no adjacent pair has $|\text{adj}(X_i)| \geq k+1$.
>
> **Output:** Skeleton graph (undirected) and separation sets $\text{sep}(X_i, X_j)$.
>
> **Correctness:** Under faithfulness, an edge $X_i - X_j$ is absent from the true skeleton
> iff there exists a separating set $S$ (a set d-separating $X_i$ from $X_j$). The search
> over $\text{adj}(\cdot)$ finds this set without exhaustive search.
> ^def-phase1

> [!note] Why conditioning sets grow incrementally
> Starting at $k=0$ (marginal independence tests) and increasing $k$ exploits the **Lauritzen
> property**: if $X_i$ and $X_j$ are separated by some set, the smallest separating set
> is a subset of the neighbors of either $X_i$ or $X_j$ in the true graph. So we only need
> to search among current adjacencies — dramatically reducing the number of tests for
> sparse graphs.

#### Phase 2 — V-Structure Orientation

> [!definition] Definition: V-Structure Orientation (PC Phase 2)
> For every **unshielded triple** $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are non-adjacent):
>
> - If $X_k \notin \text{sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure).
> - Otherwise: leave the triple undirected.
>
> **Rationale:** A v-structure $X_i \to X_k \leftarrow X_j$ is present iff $X_k$ is *not*
> in any separating set of $X_i$ and $X_j$ — because conditioning on a collider $X_k$ makes
> its parents dependent, so $X_k$ in the sep set would correspond to a non-collider.
> ^def-phase2

#### Phase 3 — Edge Orientation via Meek's Rules

After Phase 2, propagate orientations using Meek's four rules (R1–R4), which prevent
the introduction of new v-structures or directed cycles. See
[[Markov Equivalence Classes and CPDAGs]] for the full rule table.

> [!definition] Definition: Output of PC
> The output is the **CPDAG** of the Markov equivalence class containing $D^*$ — the
> finest resolution of causal structure achievable from observational data under the
> Markov + faithfulness + sufficiency assumptions.
> ^def-pc-output

### Complexity

| Resource | Bound |
|---------|-------|
| CI tests (dense graph) | $O\bigl(d^2 \cdot d^k / k!\bigr)$ for max conditioning-set size $k$ |
| CI tests (sparse, max degree $q$) | $O\bigl(d \cdot q^k\bigr)$ — polynomial in $d$ for fixed $q$ |
| Time per test (partial correlation) | $O(k^3)$ matrix operations |
| Memory | $O(d^2)$ for adjacency matrix + sep sets |

**Practical note:** In high dimensions, the inner loop's conditioning set size $k$ rarely
exceeds 3–5 in practice, keeping the algorithm fast. The bottleneck is the CI test's
statistical power, which degrades with conditioning-set size.

### Worked Example (d = 4 variables)

> [!example] PC Skeleton Recovery on a 4-Node Graph
> **True DAG:** $X \to Z \to Y$, $Z \to W$.
> **True skeleton:** $X-Z$, $Z-Y$, $Z-W$ (no edges $X-Y$, $X-W$, $Y-W$).
>
> **Phase 1 ($k=0$):** Test marginal independence for all pairs:
> - $X \perp\!\!\!\perp Y$? No (path $X \to Z \to Y$ is active). Keep $X-Y$ for now.
> - $X \perp\!\!\!\perp W$? No (path $X \to Z \to W$ active). Keep.
> - $Y \perp\!\!\!\perp W$? No (path $Y \leftarrow Z \to W$ active). Keep.
> - Others test dependent. Keep all at $k=0$.
>
> **Phase 1 ($k=1$):** Test pairs given one neighbor:
> - $X \perp\!\!\!\perp Y \mid Z$? Yes ($Z$ blocks $X \to Z \to Y$). Remove $X-Y$; $\text{sep}(X,Y)=\{Z\}$.
> - $X \perp\!\!\!\perp W \mid Z$? Yes. Remove $X-W$; $\text{sep}(X,W)=\{Z\}$.
> - $Y \perp\!\!\!\perp W \mid Z$? Yes. Remove $Y-W$; $\text{sep}(Y,W)=\{Z\}$.
>
> **Phase 2:** Unshielded triples: $X - Z - Y$, $X - Z - W$, $Y - Z - W$.
> - $Z \in \text{sep}(X,Y) = \{Z\}$? Yes → no v-structure at $Z$.
> - $Z \in \text{sep}(X,W) = \{Z\}$? Yes → no v-structure.
> - $Z \in \text{sep}(Y,W) = \{Z\}$? Yes → no v-structure.
>
> **Output:** All three edges remain undirected ($X-Z-Y-Z-W$), giving the correct CPDAG:
> $X - Z - Y$ and $Z - W$ (the three orientations $X \to Z \to Y$, $X \leftarrow Z \to Y$,
> $X \leftarrow Z \leftarrow Y$, and $Z \to W$ vs $Z \leftarrow W$ are Markov equivalent).

### Statistical Assumptions and Failure Modes

| Assumption | Violation effect | Remedy |
|-----------|-----------------|--------|
| Faithfulness | Cancellation of paths → spurious independences → spurious edge removal | Weaker faithfulness (Zhang & Spirtes); larger $\alpha$ |
| Causal sufficiency | Hidden confounders → spurious v-structures | FCI algorithm (adds bi-directed edges) |
| CI test power | Small $n$, large $k$ → high Type I/II errors → wrong skeleton | Limit conditioning set size; use robust CI tests |
| Consistency of sep sets | Order-dependence: different orderings of CI tests may yield different skeletons | PC-stable (Colombo et al., 2014) fixes order-dependence |

> [!note] PC-stable
> The standard PC algorithm is *order-dependent*: the skeleton found can vary with the order
> in which edges are tested. **PC-stable** (Colombo & Maathuis, 2014) stores all CI test results
> from pass $k$ before deleting any edges, making the skeleton (and CPDAG) unique regardless
> of the order of tests. This is the recommended implementation.

### Software Implementations

| Package | Language | Notes |
|---------|---------|-------|
| `pcalg::pc()` | R | Reference implementation; supports many CI tests |
| `causal-learn` (py-causal) | Python | `PC` class; multiple CI test options |
| `causaldag` | Python | `PC` and `GES`; adjacency-faithful assumption |
| `gCastle` | Python | GPU-accelerated; includes `PC` |
| CDT (`cdt.causality.graph.PC`) | Python | Wraps R's `pcalg` via rpy2 |

## Connections

- **Contrast with GES**: PC tests CIs and removes edges; GES optimizes a score and adds/removes
  edges — see [[GES - Greedy Equivalence Search]].
- **Contrast with NOTEARS**: PC is constraint-based (CI tests); NOTEARS is score-based continuous
  optimization. PC outputs a CPDAG; NOTEARS outputs a single DAG — see [[NOTEARS - Overview]].
- **Conditional independence testing**: the quality of Phase 1 depends entirely on the CI test —
  see [[Conditional Independence Testing in Causal Discovery]].
- **FCI extension**: when causal sufficiency fails, the FCI (Fast Causal Inference) algorithm
  replaces PC, allowing bi-directed edges for latent confounders.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — what the CPDAG is and Meek's rules
- [[Conditional Independence Testing in Causal Discovery]] — the CI tests used in Phase 1
- [[GES - Greedy Equivalence Search]] — the score-based alternative to PC
- [[Causal Discovery Algorithm Comparison]] — PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — the problem context (includes landscape table)
- [[Directed Acyclic Graphs]] — d-separation and DAG foundations
