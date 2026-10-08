---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/spirtes-2000-causation-prediction-search-ref.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Kalisch & Bühlmann (2007, JMLR)"
date_ingested: 2026-10-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Constraint-Based Causal Discovery - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour PC"
  - "constraint-based DAG learning"
  - "PC stable"
  - "Kalisch-Bühlmann PC"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named for Peter Spirtes and Clark Glymour) is the canonical
> **constraint-based** method for learning a Bayesian network (DAG) from observational data.
> It runs conditional independence (CI) tests in two phases: (1) **skeleton recovery** — removing
> edges for independent pairs, testing conditioning sets of increasing size; and (2) **orientation**
> — identifying unshielded colliders (v-structures) and propagating orientations via the Meek
> rules. Under the Causal Markov Condition, faithfulness, and causal sufficiency, PC recovers the
> **CPDAG** (the Markov equivalence class) of the true DAG in the large-sample limit.

## Overview

The PC algorithm was introduced by Spirtes & Glymour (1991) and formalized with consistency
proofs in Spirtes, Glymour & Scheines (2000). It was the dominant constraint-based algorithm for
two decades and remains a standard baseline for causal structure learning. Its key advantage over
exhaustive search is **exploiting the factorization of CI structure**: instead of testing all
$2^{p-2}$ possible conditioning sets for each pair, it only tests subsets of the *current
adjacency set*, which is typically sparse.

## Algorithm: Phase 1 — Skeleton Recovery

> [!definition] Algorithm: PC Skeleton Phase
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$, significance level $\alpha$.
>
> **Initialize:** Start with a complete undirected graph $\mathcal{H}$ on $p$ nodes.
>
> **For** $l = 0, 1, 2, \ldots$ (size of conditioning set):
> 1. **For** each pair of adjacent nodes $(X_i, X_j)$ in $\mathcal{H}$:
>    - Let $\text{Adj}(X_i) \setminus \{X_j\}$ be the current neighbors of $X_i$ (excluding $X_j$).
>    - **For** each subset $\mathbf{S} \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with
>      $|\mathbf{S}| = l$:
>      - Test $H_0: X_i \perp X_j \mid \mathbf{S}$ at level $\alpha$.
>      - If not rejected: **remove** edge $X_i - X_j$ from $\mathcal{H}$; store
>        $\text{Sepset}(X_i, X_j) \leftarrow \mathbf{S}$. Break.
> 2. Continue to next $l$ while any node has $\geq l+1$ neighbors.
>
> **Output:** Skeleton $\mathcal{H}$ (undirected graph) and separation sets $\{\text{Sepset}(i,j)\}$.
^algo-pc-skeleton

**Key efficiency insight:** At level $l$, we only test conditioning sets of size $l$ drawn from
the *current neighbors* of $X_i$. As edges are removed, the neighborhood shrinks, eliminating
tests that are no longer needed. This makes the algorithm polynomial in $p$ when the true DAG
has bounded degree.

> [!note] Complexity
> The number of CI tests is $O\bigl(p^2 \cdot \binom{\Delta-1}{l}\bigr)$ per level $l$, where
> $\Delta$ is the maximum degree of the true skeleton. For sparse graphs with $\Delta = O(1)$,
> the total test count is $O(p^2)$. For dense graphs, the algorithm becomes expensive: testing
> all subsets of size $l$ among $\Delta$ neighbors requires $\binom{\Delta}{l}$ tests per edge.

## Algorithm: Phase 2 — Orientation

After the skeleton is fixed, Phase 2 orients as many edges as possible.

### Step 2a: Orient Unshielded Colliders (V-Structures)

> [!definition] V-Structure Orientation Rule
> For each **unshielded triple** $(X_i, X_k, X_j)$ — where $X_i - X_k - X_j$ but $X_i$ and
> $X_j$ are **not adjacent**:
> - If $X_k \notin \text{Sepset}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$
>   (unshielded collider / v-structure).
> - If $X_k \in \text{Sepset}(X_i, X_j)$: leave $X_i - X_k - X_j$ undirected (it is
>   a chain or fork in the true DAG, but we cannot distinguish which).
>
> **Intuition:** If $X_i \perp X_j \mid \mathbf{S}$ is due to conditioning on the chain
> $X_i \to X_k \to X_j$ or the fork $X_i \leftarrow X_k \to X_j$, then $X_k \in \mathbf{S}$.
> If $X_k \notin \mathbf{S}$ (the marginal $X_i, X_j$ became independent without conditioning
> on $X_k$), then $X_k$ *must* be a collider.
^def-vstructure-rule

### Step 2b: Apply Meek Rules

After orienting all v-structures, apply the **Meek rules R1–R4** (see [[Markov Equivalence and CPDAGs]])
exhaustively — each rule propagates orientation to edges that must be directed to avoid creating
new v-structures or directed cycles. The result is the **CPDAG**.

## Consistency Theorem

> [!theorem] Theorem: PC Algorithm Consistency (Spirtes, Glymour & Scheines, 2000)
> Let $P(X_1, \ldots, X_p)$ be a distribution satisfying the **Causal Markov Condition**
> and **Faithfulness** with respect to a DAG $\mathcal{G}$, and assume **causal sufficiency**.
> If the CI tests are performed at a level $\alpha_n \to 0$ with $\alpha_n = o(1/n)$ (or
> using exact population independence), the PC algorithm **recovers the CPDAG** of $\mathcal{G}$
> with probability $\to 1$ as $n \to \infty$.
>
> **Condition on $\alpha$:** In finite samples, $\alpha$ controls a bias-variance tradeoff:
> small $\alpha$ → sparse graph (miss edges); large $\alpha$ → dense graph (spurious edges).
^thm-pc-consistency

## High-Dimensional Setting: PC-Stable (Colombo & Maathuis, 2014)

The original PC algorithm has an **order-dependence problem**: the skeleton phase result depends
on the order in which CI tests are performed, because edge removals in one iteration affect the
adjacency sets used for conditioning in the next.

> [!definition] PC-Stable Algorithm
> **PC-stable** (Colombo & Maathuis, 2014) modifies the skeleton phase to be order-independent:
> - All CI tests at level $l$ are performed using the **adjacency sets from level $l-1$** (before
>   any edges are removed at level $l$). Edge removals are only applied *after* all tests at
>   level $l$ complete.
> - This makes the skeleton output identical regardless of variable ordering.
>
> **Kalisch & Bühlmann (2007)** established that in the **high-dimensional sparse** regime
> ($p \gg n$, bounded graph degree), PC with the Fisher z-test CI is consistent for Gaussian
> distributions with $\Delta \leq C \log n / n$ degree bound.
^def-pc-stable

## Order-Dependence of the Orientation Phase

Even with PC-stable skeletons, the orientation phase can still be order-dependent in finite
samples because the Meek rules can orient edges differently depending on which v-structures were
identified first (if CI tests disagree marginally). Conservative practice: report multiple runs
with different orderings and check for stability.

## Software

| Library | Language | Notes |
|---------|----------|-------|
| **`pcalg`** | R | Reference implementation; PC, FCI, GES, LINGAM |
| **`causal-learn`** | Python | Comprehensive; PC, GES, FCI, LiNGAM, NOTEARS |
| **TETRAD** | Java | Carnegie Mellon's full graphical-model suite; FGES, PC |
| **`bnlearn`** | R | Bayesian networks; PC + many score-based methods |

Standard benchmark: Gaussian data, $n \in \{100, 500, 1000\}$, $p \in \{10, 50, 100\}$, Erdős–Rényi
or scale-free skeletons, evaluate with SHD (structural Hamming distance) and FDR/TPR.

## Connections to Other Approaches

- **NOTEARS (Zheng et al., 2018)**: NOTEARS reports in [[NOTEARS Experiments]] that it outperforms
  both PC and GES in SHD on dense/large graphs; but NOTEARS assumes linear SEM (Gaussian noise or
  known GLM form), while PC is distribution-free.
- **GES**: [[GES - Greedy Equivalence Search]] reaches the same CPDAG from the score-based
  direction — asymptotically equivalent but with different finite-sample behavior.
- **FCI (Spirtes et al., 2000)**: Relaxes causal sufficiency — allows hidden confounders. Outputs
  a PAG (Partial Ancestral Graph) with additional edge marks ($\circ$) for uncertainty. The
  skeleton phase is identical to PC; orientation differs.

## See Also
- [[Constraint-Based Causal Discovery - Overview]] — assumptions, CI tests, the paradigm
- [[Markov Equivalence and CPDAGs]] — what the CPDAG output represents; Meek rules
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative that bypasses CI testing
- [[DAG Structure Learning Problem]] — landscape of prior methods (includes PC in context)
- [[Causal Discovery/_Index|Causal Discovery Index]]
