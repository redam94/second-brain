---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-arxiv-final.pdf]]"
source_location: "§2 Related Work (background on constraint-based methods)"
date_ingested: 2026-10-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000) is the
> canonical **constraint-based** method for learning the structure of a Bayesian network from
> observational data. Starting from a complete undirected graph, it removes edges whenever a
> conditional independence (CI) is detected among pairs of variables, then orients remaining
> edges using v-structure detection and Meek's rules. Under **causal Markov**, **faithfulness**,
> and **causal sufficiency**, PC is **sound and complete**: it returns the CPDAG of the true DAG
> in the limit of infinite data.

## Overview

Constraint-based methods take a fundamentally different approach to structure learning than
[[GES - Greedy Equivalence Search]] or [[NOTEARS - Overview]]. Rather than maximizing a
score over graphs, they **test conditional independence (CI) directly** and use the pattern of
observed (in)dependencies to reconstruct the graph skeleton and edge orientations.

The PC algorithm (named after its inventors **P**eter Spirtes and **C**lark Glymour) is the
foundational constraint-based algorithm. Its output is the [[Markov Equivalence Classes and CPDAGs|CPDAG]]
of the true DAG — the same identifiable target as all structure-learning algorithms.

**Contrast with score-based methods:**
- PC does not require a parametric likelihood or score; it needs only CI tests.
- PC is more sensitive to individual CI test errors (especially in high dimensions).
- PC is faster in sparse settings where most edges are absent.
- GES/score-based methods are less sensitive to CI errors but require a distributional assumption for scoring.

## Main Content

### Assumptions

> [!definition] Definition: The Three Assumptions of PC (Spirtes et al. 2000)
>
> **1. Causal Markov condition:** Every variable $X_i$ is conditionally independent of its
> non-descendants given its parents in the true DAG $\mathcal{G}^*$.
>
> **2. Causal faithfulness:** Every conditional independence that holds in the observed
> distribution is entailed by $\mathcal{G}^*$. There are no "accidental" independence
> relations beyond those implied by the graph structure.
>
> **3. Causal sufficiency:** All common causes of observed variables are themselves observed
> — there are no latent confounders. (Violation leads to the FCI algorithm instead.)
^def-pc-assumptions

The faithfulness assumption is crucial. It rules out parameter-level cancellations that would
create independence not encoded in the graph structure. Under Gaussian SEMs, the set of
parameter vectors that violate faithfulness has Lebesgue measure zero (generic faithfulness).

### Phase 1: Skeleton Recovery

> [!definition] Algorithm: PC Skeleton Phase (Spirtes et al. 2000, Algorithm 3.2)
> **Input:** Data $\mathbf{X}$; significance level $\alpha$ for CI tests.
>
> 1. Start with a **complete undirected graph** $C$ over all variables $\{X_1, \ldots, X_d\}$.
> 2. For each pair $(X_i, X_j)$ and for $k = 0, 1, 2, \ldots$:
>    - For each subset $S \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with $|S| = k$:
>      - Test $X_i \perp\!\!\!\perp X_j \mid S$ using a CI test (e.g., partial correlation for Gaussian, kernel CI test for non-Gaussian).
>      - If the test is not rejected: **remove** edge $(X_i, X_j)$; record $\text{sepset}(X_i, X_j) \leftarrow S$; break.
>    - Stop when $k > \max_i |\text{Adj}(X_i)|$.
> 3. Output: undirected **skeleton** and separation sets $\text{sepset}(\cdot, \cdot)$.
^alg-pc-skeleton

The sequential conditioning ensures the algorithm tests **only the adjacencies of $X_i$**,
not all $d$ variables — giving polynomial time $O(d^{k+2})$ when the true graph has maximum
degree $k$.

> [!note] CI test choices
> - **Gaussian data**: Fisher's $z$-transform of partial correlation. This is the canonical
>   choice in the pcalg R package (Kalisch & Bühlmann, 2007).
> - **Non-Gaussian / nonlinear**: Kernel-based CI tests (HSIC-based), or regression residual
>   tests. These are more expensive but handle general dependencies.
> - **Discrete data**: $G^2$ or $\chi^2$ tests on conditional contingency tables.

### Phase 2: V-structure Orientation

With the skeleton and separation sets in hand, orient **unshielded triples** to form v-structures:

> [!definition] Algorithm: V-structure Orientation (Spirtes et al. 2000)
> For every unshielded triple $(X_i, X_k, X_j)$ — i.e., $X_i \text{—} X_k \text{—} X_j$ in the
> skeleton with no direct edge $X_i \text{—} X_j$:
> - If $X_k \notin \text{sepset}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure).
> - If $X_k \in \text{sepset}(X_i, X_j)$: leave $X_k$'s edges undirected.
^alg-vstructures

The logic: if $X_i \perp\!\!\!\perp X_j \mid S$ and $X_k \notin S$, then $X_k$ cannot be the
"collider-blocker" — conditioning on $X_k$ would open the path, not close it. The Markov
condition forces $X_k$ to be a collider (head-to-head) rather than a conduit (chain or fork).

### Phase 3: Meek Orientation Rules

Apply Meek's four rules (see [[Markov Equivalence Classes and CPDAGs]]) repeatedly until no
further orientations are possible. These rules orient additional edges without creating new
v-structures or directed cycles, completing the CPDAG.

### The Full PC Algorithm

```
PC(data X, significance α):
  C ← complete undirected graph
  sepset ← empty
  
  # Phase 1: skeleton
  for k = 0, 1, 2, ...:
    for each adjacent pair (X_i, X_j) in C:
      for each S ⊆ Adj(X_i)\{X_j} with |S| = k:
        if X_i ⊥ X_j | S (at level α):
          remove edge (X_i, X_j) from C
          sepset(X_i, X_j) = S
          break
    if max degree of C < k: break
  
  # Phase 2: v-structures  
  for each unshielded triple (X_i, X_k, X_j):
    if X_k ∉ sepset(X_i, X_j):
      orient X_i → X_k ← X_j
  
  # Phase 3: Meek rules
  repeat until no change:
    apply Meek rules R1–R4
  
  return CPDAG C
```

### Soundness and Completeness

> [!theorem] Theorem: PC Correctness (Spirtes et al. 2000, Theorem 5.1)
> Under the causal Markov condition, faithfulness, and causal sufficiency, with a consistent
> CI test (i.e., correct at the oracle / infinite-data limit):
>
> The PC algorithm returns the **CPDAG** $\mathcal{C}^*$ of the true generating DAG $\mathcal{G}^*$.
>
> **Soundness:** PC never orients an edge that is not in the CPDAG.
> **Completeness:** PC orients every compelled edge in the CPDAG.
^thm-pc-correctness

### PC-stable: Order-Independent Version

A subtle problem with the original PC algorithm: the skeleton depends on the **order in which
edges are tested**, because removing an edge changes the adjacency sets used for subsequent
tests. This makes the output **order-dependent** for finite samples.

**PC-stable** (Colombo & Maathuis, 2014) fixes this by only updating the skeleton *after* all
tests at each value of $k$ are complete, rather than updating immediately after each removal.
PC-stable is **order-independent** and has the same large-sample guarantees.

PC-stable is now the default in the `pcalg` R package and `causal-learn` Python library.

## High-Dimensional Consistency

> [!theorem] Theorem: Consistency of PC in High Dimensions (Kalisch & Bühlmann, 2007, JMLR)
> For **Gaussian data** from a linear SEM with Gaussian errors, PC is **uniformly consistent**
> for very high-dimensional sparse DAGs where $d = O(n^a)$ for any $a < \infty$, provided the
> true skeleton has bounded degree. That is, as $n \to \infty$, PC recovers the true CPDAG
> with probability going to 1, even when $d \gg n$.
>
> **Key conditions:** bounded in-degree $k$; faithfulness; Gaussian distribution.
^thm-pc-highdim

This result means PC is usable even when there are more variables than observations, as long
as the true graph is sparse — a common assumption in genomics and other high-dimensional settings.

## Comparison with Other Approaches

| Property | PC (constraint-based) | [[GES - Greedy Equivalence Search\|GES]] (score-based) | [[NOTEARS - Overview\|NOTEARS]] (continuous) |
|----------|----------------------|----------------------|----------------------|
| What it optimizes | CI test outcomes | Decomposable score (BIC) | Penalized LS loss |
| Distributional requirement | Only a CI test | Score (e.g., BIC for Gaussian) | Parametric loss function |
| Error sensitivity | Accumulates CI test errors | Robust to individual CI errors | Sensitive to model misspecification |
| Handling of high-$d$ | Polynomial if sparse | Polynomial if sparse | Matrix operations on $d \times d$ |
| Output | CPDAG | CPDAG | A single DAG (within an MEC) |
| Key software | `pcalg` (R), `causal-learn` (Python) | `pcalg`, `causal-learn`, `ges` (Python) | `notears` (Python) |

## Software

- **R**: `pcalg` package — `pc()` function implements PC-stable with Fisher's $z$ CI test
  by default; `GaussParDAG` for score-based.
- **Python**: `causal-learn` (py-why project) — `PC` class; supports multiple CI test backends
  including FISHERZ, KCIPT, chi-square.
- **Tetrad** (Java): the original TETRAD software from the CMU group supports PC, GES, FCI,
  and many variants.

## Connections

- **Output target**: [[Markov Equivalence Classes and CPDAGs]] — the CPDAG is the identifiable
  summary PC recovers.
- **With latent confounders**: use the **FCI algorithm** (Fast Causal Inference) instead of PC;
  FCI outputs a Partial Ancestral Graph (PAG) that represents uncertainty about latent variables.
- **Score-based alternative**: [[GES - Greedy Equivalence Search]] — avoids reliance on
  individual CI tests but requires a decomposable score.
- **DAG reasoning**: [[Directed Acyclic Graphs]] — d-separation semantics that PC exploits.
- **Application to ABM outputs**: ABM simulation outputs can be treated as observational data
  for structure learning; see [[Approximate Bayesian Computation for ABMs]] and
  [[Summary Causal DAGs]] for the Zeng 2025 approach that assumes the DAG is given.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG, equivalence, and Meek rules
- [[GES - Greedy Equivalence Search]] — score-based alternative to PC
- [[DAG Structure Learning Problem]] — SEM formulation and the landscape of methods
- [[NOTEARS - Overview]] — continuous optimization approach; PC is listed as a baseline
- [[Directed Acyclic Graphs]] — causal DAG semantics
- [[Causal Discovery/_Index|Causal Discovery Index]]
