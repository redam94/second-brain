---
title: "PC Algorithm - Phases"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.bib]]"
source_location: "Spirtes, Glymour & Scheines (2000), Algorithm 3.4; Kalisch & Bühlmann (2007), §2"
date_ingested: 2026-08-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Causal Markov and Faithfulness]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "PC algorithm phases"
  - "skeleton learning"
  - "Meek orientation rules"
  - "v-structure identification"
---

# PC Algorithm - Phases

> [!summary]
> The PC algorithm recovers the CPDAG in three phases. **Phase 1 (skeleton)**: start with a
> complete graph and remove edges between variables that are conditionally independent given
> some subset, recording the *separating sets*. **Phase 2 (v-structures)**: orient unshielded
> triples as colliders when the middle node was absent from the separating set. **Phase 3
> (Meek rules)**: propagate orientations using four acyclicity/non-collider rules until no
> further orientation is implied. The output is the CPDAG of the true data-generating DAG.

## Overview

The PC algorithm's design follows directly from the [[Causal Markov and Faithfulness|faithfulness
assumption]]: every missing edge in the true DAG corresponds to a conditional independence
in the distribution (and vice versa), so removing edges where CI tests accept yields the true
skeleton. V-structures can be detected because their separating sets have a specific structure.
Meek's rules then orient all remaining orientable edges.

## Main Content

### Notation

Let $\mathbf{V} = \{X_1, \ldots, X_d\}$ be the observed variables, $\mathcal{G}$ the complete
undirected graph initially, $\text{adj}(X, \mathcal{G})$ the set of variables adjacent to $X$
in the current graph, and $\text{Sep}(X, Y)$ the **separating set** for pair $(X, Y)$.

---

### Phase 1: Skeleton Learning

> [!theorem] Algorithm: PC Skeleton Phase (Spirtes et al. 2000, §5.4.2)
> **Input:** $n$ i.i.d. samples of $(X_1, \ldots, X_d)$, significance level $\alpha$.
> **Output:** Undirected skeleton $\mathcal{S}$, separating sets $\text{Sep}(X_i, X_j)$ for all pairs.
>
> 1. Initialize $\mathcal{G}^0 \leftarrow$ complete undirected graph on $\mathbf{V}$.
>    Set $k \leftarrow 0$.
> 2. **Repeat** while there exists an edge $(X_i, X_j)$ with $|\text{adj}(X_i, \mathcal{G}^k) \setminus \{X_j\}| \geq k$:
>    a. For each adjacent pair $(X_i, X_j)$ in $\mathcal{G}^k$:
>       - For each subset $\mathbf{Z} \subseteq \text{adj}(X_i, \mathcal{G}^k) \setminus \{X_j\}$
>         with $|\mathbf{Z}| = k$:
>         - **Test** $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ at level $\alpha$.
>         - If $H_0$ is **accepted**: remove edge $(X_i, X_j)$ from $\mathcal{G}^k$;
>           set $\text{Sep}(X_i, X_j) \leftarrow \mathbf{Z}$; break inner loop.
>    b. $k \leftarrow k + 1$.
> 3. **Output** $\mathcal{S} \leftarrow \mathcal{G}^k$, and all $\text{Sep}(\cdot, \cdot)$.
^alg-skeleton

> [!note] Choice of CI test
> The test used depends on the data type:
> - **Gaussian data**: Fisher's z-test on partial correlations, $z(\rho_{XY|\mathbf{Z}}) = \frac{1}{2}\ln\frac{1+\hat{\rho}_{XY|\mathbf{Z}}}{1-\hat{\rho}_{XY|\mathbf{Z}}}$, asymptotically $\mathcal{N}(0, (n - |\mathbf{Z}| - 3)^{-1})$ under the null.
> - **Discrete data**: $G^2$ test or $\chi^2$ test on contingency tables.
> - **Non-parametric**: kernel-based CI tests (e.g., HSIC with conditioning, Zhang et al. 2012) or rank-based tests.
>
> The key requirement (Kalisch & Bühlmann 2007): the test must have correct Type I error control
> asymptotically, and Type II error $\to 0$ as $n \to \infty$.

**Why the incremental conditioning set size?** Starting with $k=0$ (marginal independence tests)
removes many edges cheaply. Larger conditioning sets are only needed for edges that survive
lower-order tests. Under sparsity (bounded neighborhood size $q$), the algorithm terminates
by $k = q$ and runs in time $O(d^{q+2})$ — polynomial in $d$ for fixed $q$.

**Key finite-sample property** (Kalisch & Bühlmann 2007, Theorem 1): Under Gaussian data and
strong faithfulness with parameter $\lambda$, the skeleton is recovered exactly with probability
$\geq 1 - \eta$ whenever $n \geq C \cdot \log d$ for constants depending on $\lambda, \alpha$.
This establishes **high-dimensional consistency** — the algorithm works in the "$d \gg n$" regime.

---

### Phase 2: V-Structure Identification

> [!theorem] Algorithm: V-Structure Orientation (Spirtes et al. 2000, §5.4.3)
> **Input:** Skeleton $\mathcal{S}$, separating sets $\text{Sep}(\cdot, \cdot)$.
> **Output:** Skeleton with some edges oriented (as v-structures).
>
> For each **unshielded triple** $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are NOT adjacent):
> - If $X_k \notin \text{Sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure).
> - If $X_k \in \text{Sep}(X_i, X_j)$: leave both edges undirected.
^alg-vstructure

**Why does this work?** Under faithfulness, $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ iff
$\mathbf{Z}$ d-separates $X_i$ and $X_j$ in $\mathcal{G}^*$. For an unshielded triple:
- If the true structure is a **v-structure** ($X_i \to X_k \leftarrow X_j$): $X_k$ is a collider
  on the path $X_i \to X_k \leftarrow X_j$, so $X_k$ is NOT in the separating set (conditioning
  on a collider opens the path).
- If the true structure is **non-colliding** ($X_i \to X_k \to X_j$ or $X_i \leftarrow X_k \leftarrow X_j$
  or a fork $X_i \leftarrow X_k \to X_j$): $X_k$ IS in the separating set (conditioning on the
  middle node blocks the path).

This distinction makes v-structures the **unique identifiable orientations** from observational data.

---

### Phase 3: Meek Orientation Rules

After v-structure orientation, remaining edges may still be orientable by acyclicity and
non-collider consistency. Meek (1995) proved these four rules are **complete**: applying them
exhaustively yields the CPDAG.

> [!definition] Definition: Meek's Orientation Rules R1–R4 (Meek 1995)
> Apply these rules repeatedly until quiescence (no new orientation).
>
> **R1 (Non-collider propagation):** If $X \to Y - Z$ and $X \not\sim Z$ (not adjacent),
> then orient $Y \to Z$.
> *Reason:* orienting $Z \to Y$ would create a new v-structure $X \to Y \leftarrow Z$,
> contradicting that no new v-structures should be introduced.
>
> **R2 (Acyclicity):** If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$.
> *Reason:* orienting $Z \to X$ would create a directed cycle $X \to Y \to Z \to X$.
>
> **R3 (Double non-collider):** If $X - Z_1 \to Y$, $X - Z_2 \to Y$, $X - Y$, and
> $Z_1 \not\sim Z_2$, then orient $X \to Y$.
> *Reason:* either orientation of $X - Y$ creates a new v-structure at $Y$ or a cycle.
>
> **R4 (Discriminating path):** If there is a path $\langle W, \ldots, X, Y, Z \rangle$
> such that $W \not\sim Z$, $W \to Y$, $X \to Y$, and $Y - Z$, then:
> - If $Y \in \text{Sep}(W, Z)$: orient $Y - Z$ as $Y \leftarrow Z$ (Y is not a collider).
> - If $Y \notin \text{Sep}(W, Z)$: orient $Y \to Z$ (making $X \to Y \to Z$ or $Y$ is a collider w.r.t. $W$).
^def-meek-rules

> [!theorem] Theorem: Completeness of Meek Rules (Meek 1995; Chickering 2002, Corollary 2)
> Let $\mathcal{G}^*$ be the true DAG and $\mathcal{C}$ its CPDAG. After Phase 2 identifies
> all v-structures, applying R1–R4 exhaustively on the resulting partially directed graph
> yields exactly $\mathcal{C}$.
>
> **In other words:** the PC algorithm (all three phases) is guaranteed to recover the full
> CPDAG — including every directed edge that can be identified — under faithfulness and
> consistent CI tests.
^thm-meek-completeness

---

### Full PC Algorithm

> [!theorem] Algorithm: PC (Peter-Clark)
> **Inputs:** Data $\mathbf{X}$, significance level $\alpha$.
> **Output:** CPDAG $\hat{\mathcal{C}}$.
>
> 1. **Phase 1:** Run skeleton learning → $(\mathcal{S}, \text{Sep})$.
> 2. **Phase 2:** Identify v-structures using Sep → partially directed graph $\mathcal{P}$.
> 3. **Phase 3:** Apply R1–R4 exhaustively on $\mathcal{P}$ → $\hat{\mathcal{C}}$.
>
> **Computational complexity:** $O(d^{q+2})$ CI tests where $q = \max_j |\text{Pa}_{\mathcal{G}^*}(X_j)|$.
> Under sparsity ($q$ fixed), polynomial in $d$.
>
> **Consistency (Kalisch & Bühlmann 2007, Theorem 2):** Under the Gaussian CMC, faithfulness,
> and strong faithfulness with $\lambda > 0$, for any $\epsilon > 0$ there exists $N$ such that
> for $n > N$: $\mathbb{P}(\hat{\mathcal{C}} = \mathcal{C}^*) \geq 1 - \epsilon$, even when
> $d = O(n^a)$ for some $a > 0$. This is **high-dimensional consistency**.
^thm-pc-consistency

### Order-Dependence Issue

A known weakness: the skeleton phase processes edges in a fixed order, and when multiple
subsets of size $k$ could serve as a separating set, the first one found is recorded. Different
edge orderings can yield different $\text{Sep}(\cdot, \cdot)$ and hence different CPDAGs
(especially in finite samples). The **PC-stable** variant (Colombo & Maathuis 2014) addresses
this by deferring edge removal until all pairs at level $k$ have been tested, making the
output order-independent.

## Connections

- **Input to GES**: GES ([[GES - Greedy Equivalence Search]]) produces the same CPDAG target
  via a different route — score optimization rather than CI testing.
- **NOTEARS contrast**: [[NOTEARS Algorithm]] outputs a single DAG (in the MEC, not the CPDAG),
  using continuous optimization rather than combinatorial testing.
- **pcalg R package**: implements PC (including PC-stable), FCI, and RFCI with Gaussian and
  non-parametric CI tests. See Kalisch et al. (2012), *Journal of Statistical Software*.
- **Causal Discovery folder**: this note completes the constraint-based side; see
  [[GES - Greedy Equivalence Search]] for the score-based side.

## See Also
- [[PC Algorithm - Overview]] — high-level framing and comparison
- [[Causal Markov and Faithfulness]] — the assumptions the algorithm relies on
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG target and Meek rules motivation
- [[GES - Greedy Equivalence Search]] — score-based alternative recovering the same CPDAG
- [[DAG Structure Learning Problem]] — formal setup and relationship to NOTEARS
