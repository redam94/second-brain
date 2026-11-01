---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-source.md]]"
source_location: "Kalisch & Bühlmann (2007) JMLR 8:613–636; Spirtes, Glymour & Scheines (2000) Ch. 5"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence Classes]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Conditional Independence Testing in PC]]"
  - "[[V-Structures and Meek Orientation Rules]]"
  - "[[NOTEARS Experiments]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm causal discovery"
  - "Spirtes Glymour 1991"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes & Glymour 1991) is the canonical constraint-based
> structure learning algorithm. It recovers the **CPDAG** of the data-generating DAG using a
> sequence of conditional independence (CI) tests: first a **skeleton discovery** phase (which
> edges exist?), then a **v-structure orientation** phase (which unshielded colliders exist?),
> then **Meek rule propagation** (what else can be oriented?). Under faithfulness and the Markov
> condition, PC is asymptotically correct. Kalisch & Bühlmann (2007) established that PC is also
> consistent in high dimensions ($p \gg n$) when the true graph is sparse.

## Overview

The PC algorithm takes a fundamentally **distributional** approach to structure learning: rather
than specifying a score and optimizing it (as in [[GES - Greedy Equivalence Search]] or
[[NOTEARS - Overview]]), it asks the data directly which conditional independences hold, and
reads the DAG structure off from those independences via the graphical characterization of Markov
equivalence.

**Key advantages:**
- Does not require a parametric score or likelihood — any CI test works (Fisher Z, $G^2$,
  kernel-based HSIC)
- Has a clear statistical justification: consistency under faithfulness in finite and high-dimensional samples

**Key limitations:**
- Sensitive to CI test errors, especially in high dimensions where many tests are conducted
- Returns equivalence class (CPDAG), not a unique DAG
- Exponential worst-case runtime in dense graphs (bounded by max degree $q$ in practice)

## Main Content

### Algorithm overview

The PC algorithm has three phases:

> [!definition] Definition: PC Algorithm (Spirtes, Glymour & Scheines 2000; Kalisch & Bühlmann 2007)
>
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$
>
> **Phase I — Skeleton discovery (Algorithm 1):**
> 1. Initialize: complete undirected graph $\hat{\mathcal{G}}$ on $\{1, \ldots, d\}$
> 2. For $k = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(i, j)$ in $\hat{\mathcal{G}}$:
>      - For each $S \subseteq \text{adj}(i) \setminus \{j\}$ with $|S| = k$:
>        - Test $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$ at level $\alpha$
>        - If not rejected: remove edge $i - j$, store $\text{sep}(i,j) = S$; break inner loop
>    - Stop when all adjacent pairs $(i,j)$ have $|\text{adj}(i)| - 1 < k$
>
> **Phase II — V-structure orientation:**
> 3. For each unshielded triple $i - k - j$ (where $i$ and $j$ are not adjacent):
>    - If $k \notin \text{sep}(i, j)$: orient as $i \to k \leftarrow j$ (v-structure)
>
> **Phase III — Meek rule propagation:**
> 4. Apply [[V-Structures and Meek Orientation Rules|Meek's four orientation rules]] repeatedly
>    until no more edges can be oriented
>
> **Output:** CPDAG $\hat{\mathcal{C}}$ representing the estimated Markov equivalence class
^def-pc-algorithm

### Phase I: Skeleton discovery in detail

The skeleton discovery phase uses **order-independent conditional independence testing**. The
key insight is that for a DAG with maximum degree $q$, one only needs to test conditioning sets
up to size $q-1$ — any pair $(X_i, X_j)$ not connected by an edge has a separating set of size
at most $q-1$ (the neighbors of $X_i$ in the true skeleton).

> [!example] Example: Skeleton discovery on a chain $X_1 \to X_2 \to X_3$
>
> **$k=0$ (unconditional tests):**
> - Test $X_1 \perp\!\!\!\perp X_2$: rejected (they are dependent). Keep edge $1 - 2$.
> - Test $X_1 \perp\!\!\!\perp X_3$: rejected (they are marginally dependent via path through $X_2$). Keep edge $1 - 3$.
> - Test $X_2 \perp\!\!\!\perp X_3$: rejected. Keep edge $2 - 3$.
>
> **$k=1$ (conditioning on one variable):**
> - Test $X_1 \perp\!\!\!\perp X_3 \mid X_2$: **accepted** (d-separation: $X_2$ blocks the path
>   $X_1 \to X_2 \to X_3$). Remove edge $1 - 3$; set $\text{sep}(1,3) = \{2\}$.
>
> **Result:** Skeleton is $1 - 2 - 3$ (a path). ✓

### Phase II: V-structure orientation in detail

An **unshielded triple** $X_i - X_k - X_j$ is one where $X_i$ and $X_j$ are not adjacent. The
orientation rule exploits the **d-separation criterion for v-structures**:

> [!theorem] Theorem: V-structure identification criterion
> Under faithfulness, $X_i \to X_k \leftarrow X_j$ is a v-structure in the true DAG iff:
> 1. $X_i - X_k - X_j$ is an unshielded triple (no edge $i - j$)
> 2. $X_k \notin \text{sep}(i, j)$ — the node in the middle is **not** in the separating set
>
> Intuition: in $X_i \to X_k \leftarrow X_j$, $X_k$ is a collider. Marginally, $X_i \perp\!\!\!\perp X_j$
> (blocked path), but conditioning on $X_k$ creates dependence (Berkson's paradox / collider bias).
> So $\text{sep}(i,j)$ will be a set that does **not** contain $X_k$.
^thm-vstructure-criterion

> [!example] Example: V-structure identification
>
> True DAG: $X_1 \to X_3 \leftarrow X_2$ (v-structure at $X_3$, no edge $1-2$).
>
> Phase I will find: $\text{sep}(1,2) = \emptyset$ (since $X_1 \perp\!\!\!\perp X_2$ marginally but
> $X_1 \not\perp\!\!\!\perp X_2 \mid X_3$ — conditioning on the collider opens the path).
>
> Phase II: unshielded triple $1 - 3 - 2$. Is $X_3 \in \text{sep}(1,2) = \emptyset$? No.
> Therefore orient as $1 \to 3 \leftarrow 2$. ✓

### High-dimensional consistency (Kalisch & Bühlmann 2007)

The classical PC algorithm is consistent for fixed $d$ as $n \to \infty$. Kalisch & Bühlmann
(2007) proved that PC is also **uniformly consistent** in a high-dimensional sparse setting:

> [!theorem] Theorem: High-dimensional consistency of PC (Kalisch & Bühlmann 2007, Theorem 1)
> Let the distribution be multivariate Gaussian and faithful to a DAG $\mathcal{G}^*$ with
> maximum degree $q^* = q^*(n)$. Let the PC algorithm use Fisher's Z CI test at level
> $\alpha_n = 2\bigl(1 - \Phi(n^{1/4})\bigr)$.
>
> If $q^* = o\bigl(n^{1/2} / \log p\bigr)$, then:
> $$P\bigl(\hat{\mathcal{C}}_n \neq \mathcal{C}^*\bigr) \to 0 \quad \text{as } n, p \to \infty,$$
> where $\mathcal{C}^*$ is the true CPDAG and the probability is taken over random samples.
>
> In particular, $p$ can grow as fast as $\exp(n^{1/3})$ while maintaining consistency (under the
> stronger condition $q^* \cdot \log p = O(n^{1/2})$).
^thm-hd-consistency

**Implication:** PC is a valid high-dimensional structure learning method for sparse graphs.
The sparsity condition $q^* \ll \sqrt{n}/\log p$ is the price paid for not specifying a score.

### CI test choices

See [[Conditional Independence Testing in PC]] for the full treatment. Briefly:

| Data type | Recommended test | Null distribution |
|-----------|-----------------|-------------------|
| Continuous Gaussian | Fisher's Z (partial correlation) | Normal |
| Continuous non-Gaussian | Kernel-based (HSIC), distance correlation | Permutation |
| Discrete | $G^2$-test, $\chi^2$-test | $\chi^2$ |
| Mixed (discrete + continuous) | Conditional distance correlation | Permutation |

### Software

- **`pcalg` R package**: `pc()` function. Supports multiple CI test functions via `indepTest` argument.
  ```r
  library(pcalg)
  suffStat <- list(C = cor(X), n = nrow(X))
  pc.fit <- pc(suffStat, indepTest = gaussCItest, p = ncol(X), alpha = 0.01)
  ```
- **`causal-learn` Python**: `from causallearn.search.ConstraintBased.PC import pc`
- **`bnlearn` R**: implements several CI-based algorithms; PC variant via `pc.stable()`

## Connections

- **Output = CPDAG**: see [[CPDAG and Markov Equivalence Classes]] for what a CPDAG represents
  and why it is the identifiable object
- **GES as alternative**: [[GES - Greedy Equivalence Search]] finds the same CPDAG using a score
  rather than CI tests; in simulations the two methods often agree on dense enough data
- **NOTEARS as alternative**: [[NOTEARS - Overview]] bypasses the equivalence class entirely by
  using a continuous objective; PC and GES are used as **baselines** in [[NOTEARS Experiments]]
- **CI testing details**: [[Conditional Independence Testing in PC]] covers Fisher's Z, the
  partial correlation formula, and how to handle the multiple testing burden

## See Also
- [[CPDAG and Markov Equivalence Classes]] — what PC returns and why
- [[Conditional Independence Testing in PC]] — the CI tests used in Phase I
- [[V-Structures and Meek Orientation Rules]] — Phases II and III in detail
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[Causal Discovery - Landscape]] — comparison of all three methods
- [[NOTEARS Experiments]] — empirical comparison against PC
