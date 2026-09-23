---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS-and-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) §5.4.2; Colombo & Maathuis (2014)"
date_ingested: 2026-09-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Testing]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "constraint-based causal discovery"
  - "PC-stable"
  - "skeleton learning"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000) is
> the canonical **constraint-based** method for learning a Bayesian network structure from
> data. It repeatedly applies conditional independence (CI) tests to prune edges from a
> complete graph, then orients v-structures and propagates directions via Meek's rules.
> Under the faithfulness and causal sufficiency assumptions, PC is **asymptotically correct**:
> it returns the CPDAG of the true generating DAG. The algorithm is named after its
> inventors **P**eter Spirtes and **C**lark Glymour.

## Overview

The PC algorithm is the practical, computationally efficient variant of the complete but
intractable **SGS algorithm** (Spirtes, Glymour & Scheines, 1993). SGS tests all possible
conditioning sets for every pair of variables, which is exponential in $d$. PC exploits the
**Markov boundary** property: if $X$ and $Y$ are conditionally independent given *some* set
$S$, then $S$ can be found among the **current adjacency sets** of $X$ and $Y$, which shrink
as edges are removed. This restricts the conditioning sets to ever-smaller candidates, making
the algorithm polynomial in the maximum degree $q$ (the maximum number of adjacent nodes).

The three-phase structure is:

1. **Skeleton learning**: identify which pairs $(X_i, X_j)$ are adjacent by sequential CI
   testing with increasing conditioning-set sizes.
2. **V-structure orientation**: orient unshielded colliders using the separator sets found
   in phase 1.
3. **Meek rule propagation**: extend orientations to all edges that are forcibly directed
   by the acyclicity and v-structure constraints.

## Main Content

### Assumptions

> [!definition] Assumptions of the PC Algorithm
> 1. **Causal Markov condition**: the data-generating DAG $G^*$ and distribution $P$ satisfy
>    the global Markov condition (CI tests reflect d-separation in $G^*$).
> 2. **Faithfulness**: $P$ is faithful to $G^*$ — every CI in $P$ corresponds to a
>    d-separation in $G^*$.
> 3. **Causal sufficiency**: all common causes of measured variables are measured
>    (no latent confounders). Violated: FCI algorithm instead.
> 4. **Oracle CI tests** (asymptotic): the CI test correctly decides
>    $X_i \perp X_j \mid S$ for all $(i,j,S)$ in the limit of large $n$.
^def-pc-assumptions

### Phase 1: Skeleton learning

> [!definition] Algorithm: Skeleton Learning (PC Phase 1)
> **Input:** Data matrix $\mathbf{X}$, significance level $\alpha$.
>
> 1. Start with the **complete undirected graph** $G$ on all $d$ variables.
> 2. **For** $\ell = 0, 1, 2, \ldots$ (conditioning set size):
>    - **For** each adjacent pair $(X_i, X_j)$ in $G$:
>      - **For** each set $S \subseteq \text{adj}(X_i, G) \setminus \{X_j\}$ with $|S| = \ell$
>        (or symmetrically $S \subseteq \text{adj}(X_j, G) \setminus \{X_i\}$):
>        - Test $X_i \perp X_j \mid S$ using a CI test at level $\alpha$.
>        - If the test **accepts** $H_0$ (independence): remove edge $X_i - X_j$ from $G$,
>          store the **separation set** $\text{sep}(i,j) \leftarrow S$, and **break** the inner loop.
>    - **Stop** when no adjacent pair has $|\text{adj}(\cdot, G) \setminus \{X_j\}| \geq \ell$.
>
> **Output:** Undirected skeleton $G$; separation sets $\{\text{sep}(i,j)\}$.
^algo-skeleton

> [!note] Computational complexity of skeleton learning
> With maximum adjacency degree $q$ after pruning, the number of CI tests is at most
> $O(d^2 \binom{q}{\ell})$ at each level $\ell$. Total tests: $O(d^2 q^q)$ — **polynomial
> in $q$** but exponential in $q$. In sparse graphs $q \ll d$ and the algorithm is efficient.
> For dense graphs, order-restricted variants or score-based methods are preferred.

### Phase 2: V-structure orientation

> [!definition] Algorithm: V-structure Orientation (PC Phase 2)
> **Input:** Skeleton $G$; separation sets $\text{sep}(i,j)$.
>
> **For** each **unshielded triple** $(X_i, X_k, X_j)$ in $G$ (i.e. $X_i - X_k - X_j$ but
> $X_i$ and $X_j$ are **not** adjacent):
> - If $X_k \notin \text{sep}(i, j)$: orient as $X_i \to X_k \leftarrow X_j$ (collider at $X_k$).
> - If $X_k \in \text{sep}(i, j)$: leave $X_i - X_k - X_j$ undirected.
>
> **Output:** Partially directed graph with all v-structures oriented.
^algo-vstructure

The logic: if $X_k \notin \text{sep}(i,j)$, then no conditioning on $X_k$ made $X_i$ and $X_j$
independent. This is precisely the fingerprint of a **collider** — conditioning on $X_k$
would make $X_i$ and $X_j$ *dependent*, not independent. So $X_k$ is a common effect.

### Phase 3: Meek rule propagation

Apply Meek's four orientation rules (see [[Markov Equivalence and CPDAGs#^def-meek-rules]])
repeatedly until fixpoint. This propagates orientations from known directed edges and
v-structures to edges that are uniquely determined to avoid new cycles or new v-structures.

> [!example] Algorithm: PC Full Pseudocode
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, test level $\alpha$.
>
> **Step 1.** Run skeleton learning → $(G_{\text{skel}}, \{\text{sep}(i,j)\})$.
>
> **Step 2.** For each unshielded triple: orient v-structures as above.
>
> **Step 3.** Apply Meek rules R1–R4 until fixpoint.
>
> **Output:** CPDAG $\widehat{\mathcal{C}}$.
>
> **Correctness (oracle, Spirtes et al. 2000):** If $P$ is faithful to DAG $G^*$ and
> CI tests are exact, then $\widehat{\mathcal{C}} = \mathcal{C}(G^*)$ (the true CPDAG).
^algo-pc-full

### Order dependence and PC-stable

The original PC algorithm is **order-dependent**: the skeleton depends on the order in
which variables are listed, because removing an edge at level $\ell$ changes the adjacency
sets available for level $\ell+1$.

> [!definition] PC-stable (Colombo & Maathuis, 2014, JMLR)
> **PC-stable** fixes order dependence by a simple change: at conditioning-set size $\ell$,
> all CI tests for the full set of adjacent pairs are run **before** any edge removal.
> Edges flagged for removal are only removed when transitioning to level $\ell + 1$.
>
> This makes the skeleton **order-independent**: the output does not change under variable
> permutations. In high-dimensional settings (large $d$, small $n$) the difference can be
> substantial — standard PC produces highly variable results while PC-stable is stable.
>
> PC-stable is implemented as the default in the `pcalg` R package (`pc()` with
> `skel.method = "stable"`) and in the `causal-learn` Python package.
^def-pc-stable

### Finite-sample behaviour

With real data, CI tests have type I and type II errors. As a result:

- **Level $\alpha$ too large**: many false edges retained → overconnected skeleton.
- **Level $\alpha$ too small**: true edges removed → underconnected skeleton; some
  v-structures and orientations missed.
- A common choice is $\alpha \in [0.01, 0.05]$ for moderate $n$; for high-dimensional
  settings, $\alpha \in [10^{-3}, 10^{-5}]$ or data-adaptive thresholds (BIC-based CI tests).

## Examples

> [!example] Example: 4-variable system
> Variables: $\{X, W, Y, Z\}$. True DAG: $X \to W \to Y$, $X \to Y$, $Z \to Y$.
>
> Skeleton learning removes $X - Z$ (since $X \perp Z$ unconditionally).
> V-structures: the unshielded triple $(W, Y, Z)$ — $W$ and $Z$ are non-adjacent.
> Since $W \notin \text{sep}(W, Z) = \emptyset$, we orient $W \to Y \leftarrow Z$.
>
> Meek R1: $X \to W$ and $W \to Y$ are forced by the chain $X - W - Y$ with the
> existing $W \to Y$ direction. After R1, $X \to W$ is propagated as $X \to W$
> (acyclicity: $X - W$ undirected would form a cycle with $W \to Y$ if $Y \to X$ existed,
> so $X \to W$ is safe but not forced by R1 alone).
>
> Final CPDAG: $X - W \to Y \leftarrow Z$, $X \to Y$ (a mix of directed and undirected edges).

## Connections

- **Requires CI tests** — the choice of test is crucial. See [[Conditional Independence Testing]].
- **Outputs CPDAGs** — the correct representation under faithfulness; see [[Markov Equivalence and CPDAGs]].
- **Contrast with GES**: PC is constraint-based (distribution-free CI tests); GES is score-based
  (requires a decomposable score like BIC). See [[Greedy Equivalence Search]].
- **Contrast with NOTEARS**: PC assumes faithfulness + causal sufficiency, and recovers the MEC;
  NOTEARS maximizes a score and returns a DAG (orientation not guaranteed to be the true CPDAG).
  See [[NOTEARS - Overview]] and [[NOTEARS Experiments]].
- **Assumes causal sufficiency**: if latent confounders exist, use FCI (Fast Causal Inference),
  which outputs a **PAG** (partial ancestral graph) — not yet in vault.
- **Implementation**: `pc()` in the `pcalg` R package; `PC` in `causal-learn` Python;
  `pcalg::pc` also includes the stable version.

## See Also
- [[Conditional Independence Testing]] — the CI tests used in Phase 1
- [[Markov Equivalence and CPDAGs]] — the output representation (CPDAG, Meek rules)
- [[Greedy Equivalence Search]] — score-based alternative that also outputs CPDAGs
- [[DAG Structure Learning Problem]] — problem setup and landscape of methods
- [[NOTEARS - Overview]] — continuous optimization-based alternative
- [[Directed Acyclic Graphs]] — d-separation and causal DAG theory
