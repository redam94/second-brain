---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5; Kalisch & Bühlmann (2007) §2-3; Colombo & Maathuis (2014) §2-3 — synthesised from training knowledge"
date_ingested: 2026-07-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Structure Learning]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable algorithm"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 2000) is the canonical
> constraint-based algorithm for causal structure learning. Starting from a complete
> undirected graph, it removes edges by testing conditional independence and then
> orients the remaining edges via v-structure detection and Meek's propagation rules.
> Under the Markov and faithfulness assumptions with oracle CI tests, it consistently
> recovers the **CPDAG** of the true DAG. In high dimensions ($p \gg n$), it is
> consistent under sparsity (bounded max degree) with appropriate test thresholds
> (Kalisch & Bühlmann 2007). The **PC-stable** variant (Colombo & Maathuis 2014)
> makes the skeleton phase order-independent.

## Overview

The PC algorithm occupies a central place in the causal discovery literature: it is
the oldest and most widely implemented algorithm for learning DAG structure from
observational data, implemented in the `pcalg` R package, TETRAD (Java), and
`causal-learn` (Python). NOTEARS ([[NOTEARS - Overview]]) lists it as a primary
baseline — and indeed the NOTEARS paper uses PC as a comparison benchmark in its
experiments ([[NOTEARS Experiments]]).

The algorithm's key advantage is **minimal distributional assumptions**: only a valid
CI test and the Markov + faithfulness assumptions are required. Its main limitation
is that CI tests are noisy in finite samples, and errors in early skeleton phases
propagate to later orientation phases.

## Main Content

### Algorithm: Skeleton phase

The PC skeleton phase searches for the **separating set** for every pair of
variables — the conditioning set that renders them conditionally independent.

> [!definition] Algorithm: PC Skeleton (SGS 2000, PC variant)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n\times p}$; CI-test at level $\alpha$.
>
> 1. Start with the complete undirected graph $G^0$ on $p$ nodes.
> 2. Set $\ell \leftarrow 0$.
> 3. **While** there exists an adjacent pair $(X_i, X_j)$ with
>    $|\text{adj}(X_i) \setminus \{X_j\}| \geq \ell$:
>    - For each such pair, for each $S \subseteq \text{adj}(X_i) \setminus \{X_j\}$
>      with $|S| = \ell$:
>      - Test $H_0: X_i \perp X_j \mid S$.
>      - **If** the test accepts $H_0$: remove edge $(X_i, X_j)$; set
>        $\text{sep}(X_i, X_j) \leftarrow S$; break inner loop.
>    - Increment $\ell$.
> 4. **Return** the undirected skeleton $G^{\text{skel}}$ and separation sets $\text{sep}(\cdot,\cdot)$.
^alg-pc-skeleton

The key feature: at each level $\ell$, we only test conditioning sets of size $\ell$
drawn from the *current* adjacency set. Because the adjacency set shrinks as edges are
removed, later levels test over smaller candidate sets — the algorithm terminates when
no pair has an adjacency set large enough.

### Algorithm: V-structure identification

> [!definition] Algorithm: PC V-structure Detection
> **Input**: Skeleton $G^{\text{skel}}$; separation sets $\text{sep}(\cdot,\cdot)$.
>
> For each **unshielded triple** $(X_i, X_k, X_j)$ — where $X_i - X_k - X_j$
> in $G^{\text{skel}}$ and $X_i, X_j$ are not adjacent:
> - **If** $X_k \notin \text{sep}(X_i, X_j)$: orient $X_i \to X_k \leftarrow X_j$.
> - **Otherwise**: leave $X_i - X_k - X_j$ unoriented.
>
> **Return** the PDAG $G^{\text{pdag}}$.
^alg-pc-vstructure

> [!note] Intuition
> In a v-structure $X_i \to X_k \leftarrow X_j$, the common effect $X_k$ is a
> **collider**: conditioning on it opens the path (explaining away), so $X_i \not\perp X_j \mid X_k$
> but $X_i \perp X_j$ marginally. Hence $X_k$ is *not* in the separating set for
> $(X_i, X_j)$. In a chain or fork, $X_k$ blocks the path when conditioned on, so
> it *is* in the separating set.

### Algorithm: Meek orientation propagation

> [!definition] Algorithm: PC Orientation Phase
> **Input**: PDAG $G^{\text{pdag}}$ with identified v-structures.
>
> Apply Meek's rules R1–R4 (see [[Markov Equivalence and CPDAGs]]) **repeatedly**
> until no more edges can be oriented.
>
> **Return** CPDAG $\mathcal{C}$.
^alg-pc-orient

The output CPDAG $\mathcal{C}$ represents the Markov equivalence class: directed
edges are causally identified; undirected edges are ambiguous from observational data alone.

### Full PC algorithm (one procedure)

```
function PC(X, α):
    G ← complete undirected graph on nodes 1..p
    sep ← empty map
    ℓ ← 0
    while ∃ adjacent (i,j) with |adj(i) \ {j}| ≥ ℓ:
        for each adjacent (i,j):
            for each S ⊆ adj(i)\{j} with |S| = ℓ:
                if CI_test(i, j | S, X, α) accepts:
                    remove edge (i,j) from G
                    sep[i,j] = sep[j,i] = S
                    break
        ℓ ← ℓ + 1
    # V-structure orientation
    for each unshielded triple (i, k, j) in G:
        if k ∉ sep[i,j]:
            orient i → k ← j
    # Meek propagation
    apply Meek rules R1-R4 until fixed point
    return G  # CPDAG
```

### Consistency in high dimensions (Kalisch & Bühlmann 2007)

> [!theorem] High-Dimensional Consistency of PC (Kalisch & Bühlmann 2007)
> Let $G^*$ be the true DAG with $p$ nodes and maximum adjacency $q$. Let the data
> $\mathbf{X}$ be i.i.d. from a multivariate Gaussian distribution faithful to $G^*$.
> Suppose:
> - (Sparsity) $q = O(1)$ (bounded max degree).
> - (Signal) The minimum partial correlation: $\min |\rho_{XY\cdot S}| \geq c_{\min} > 0$.
> - (Significance) CI-test level $\alpha = O(n^{-\kappa})$ for some $\kappa \in (0, 1/2)$.
>
> Then the PC algorithm recovers the skeleton and all v-structures of $G^*$ with
> probability $\to 1$ as $n \to \infty$, even when $\log p = O(n^{1-2\kappa})$
> (so $p$ can grow near-exponentially in $n$).
^thm-pc-consistency

The signal condition ($c_{\min} > 0$) is the faithfulness assumption made quantitative
for finite samples: it requires that conditional independences are not "almost true"
accidentally due to near-cancellation.

### PC-stable: order-independent skeleton (Colombo & Maathuis 2014)

The original PC skeleton phase is **order-dependent**: the set of edges removed at
level $\ell$ depends on the order in which pairs are tested, because removing an
edge changes the adjacency set used by subsequent tests at the same level.

> [!definition] PC-stable Algorithm
> In PC-stable, at each level $\ell$, **all** edges to be removed (based on the
> adjacency sets computed *before* any removal at this level) are collected first,
> and then all are removed simultaneously before moving to level $\ell + 1$.
>
> **Result**: The skeleton is identical regardless of variable and edge-pair ordering.
^def-pc-stable

In practice, PC-stable is always preferred over original PC when reproducibility
matters. The `pc()` function in the `pcalg` R package implements PC-stable by default.

## Examples

> [!example] Example: Linear Gaussian, Three Variables
> Data: $n=500$ observations from $X_1 \to X_2 \leftarrow X_3$,
> $X_1 = z_1$, $X_2 = 0.8 X_1 + 0.7 X_3 + z_2$, $X_3 = z_3$,
> $z_i \sim \mathcal{N}(0,1)$ i.i.d.
>
> **Level 0**: Test $X_1 \perp X_2$, $X_1 \perp X_3$, $X_2 \perp X_3$ unconditionally.
> $X_1 \not\perp X_2$ (corr ≈ 0.8), $X_1 \perp X_3$ (corr = 0), $X_2 \not\perp X_3$.
> Remove $X_1 - X_3$; set $\text{sep}(1,3) = \emptyset$.
>
> **Level 1**: Only adjacent pairs remaining are $(X_1, X_2)$ and $(X_2, X_3)$:
> Test $X_1 \perp X_2 \mid X_3$: partial corr $r_{12\cdot 3} \approx 0.8 \neq 0$, not removed.
> Test $X_2 \perp X_3 \mid X_1$: partial corr $r_{23\cdot 1} \approx 0.7 \neq 0$, not removed.
> Stop (no adjacency set of size 1 for remaining pairs).
>
> **V-structures**: Unshielded triple $(X_1, X_2, X_3)$ since $X_1$ and $X_3$ are
> non-adjacent. $X_2 \notin \text{sep}(1,3) = \emptyset$. Orient: $X_1 \to X_2 \leftarrow X_3$.
>
> **Meek rules**: No further orientations possible. Output CPDAG: $X_1 \to X_2 \leftarrow X_3$.
> This matches the true DAG exactly (the MEC contains only this one DAG).

## Connections

- **NOTEARS comparison**: [[NOTEARS Experiments]] reports SHD comparisons between NOTEARS
  and PC; NOTEARS consistently outperforms PC on dense Erdős-Rényi graphs, particularly
  where CI test power is low due to small conditioning sets.
- **GES comparison**: [[GES - Greedy Equivalence Search]] avoids CI tests entirely; tends
  to be more robust when the true DAG is moderately dense and sample sizes are small.
- **Software**: `pcalg::pc()` (R), `causal-learn` `PC()` (Python), TETRAD's PC module (Java).
- **Expert elicitation connection**: [[LLM Expert Elicitation for Bayesian Networks]] constructs
  DAGs from expert knowledge — PC constructs them from data. Both produce a DAG over the same
  variable set; in principle the outputs could be combined via interventional search.
- **Nonparametric extension**: Replacing Fisher's z-test with kernel HSIC yields the
  **kernel PC algorithm** — applicable to nonlinear, non-Gaussian distributions.

## See Also
- [[Constraint-Based Structure Learning]] — the paradigm and CI test details
- [[Markov Equivalence and CPDAGs]] — why PC outputs a CPDAG and Meek's rules
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[DAG Structure Learning Problem]] — problem setup and comparison table of methods
- [[NOTEARS - Overview]] — continuous-optimization alternative that lists PC as a baseline
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to algorithmic discovery
- [[BN Construction Methods Comparison]] — overview of construction approaches
