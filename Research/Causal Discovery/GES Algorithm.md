---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-ges.md]]"
source_location: "§4 The Greedy Equivalence Search, pp. 519–540"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Score Functions for Structure Learning]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based** algorithm
> for learning DAG structure. Unlike [[PC Algorithm]] (which uses CI tests), GES maximizes a
> **score function** (typically BIC) by greedy search over **Markov equivalence classes** (CPDAGs).
> GES has two phases: a **forward phase** that inserts edges and a **backward phase** that deletes
> them. Under faithfulness and score consistency (which BIC satisfies), GES provably returns the
> CPDAG of the true DAG. The R package `pcalg` and the Java toolkit Tetrad implement GES.

## Overview

GES searches the space of equivalence classes rather than individual DAGs, exploiting a key
insight: all DAGs in the same MEC have equal BIC score (score equivalence). Searching over
MECs thus avoids wasting time on structurally identical alternatives. Chickering (2002) proved
the "Meek Conjecture" — that greedy search over equivalence classes is consistent — by showing
that valid edge insertions and deletions can always be scored using only *local* functions of
the nodes, making the search computationally feasible.

The forward phase conceptually "builds up" the graph from scratch; the backward phase then
prunes edges that are not needed, arriving at the CPDAG of a local score maximum.

## Main Content

### Score functions and their properties

GES requires a **score** $S(G, \mathbf{X})$ with two properties:

> [!definition] Definition: Decomposability
> A score $S$ is **decomposable** if it can be written as:
> $$S(G, \mathbf{X}) = \sum_{i=1}^{p} s_i\!\bigl(X_i, \text{Pa}_G(X_i), \mathbf{X}\bigr),$$
> where each local term $s_i$ depends only on node $X_i$ and its parents in $G$. Decomposability
> enables scoring an edge *insertion* or *deletion* with only a local recomputation.
^def-decomposable

> [!definition] Definition: Score Equivalence
> A score $S$ is **score equivalent** if all DAGs in the same MEC receive the same score:
> $$G_1 \equiv G_2 \implies S(G_1, \mathbf{X}) = S(G_2, \mathbf{X}).$$
> Score equivalence ensures the search over CPDAGs is well-defined: every CPDAG represents
> a uniquely-scored equivalence class.
^def-score-equiv

The **BIC score** (Bayesian Information Criterion) for Gaussian data satisfies both properties:
$$S_{\text{BIC}}(G, \mathbf{X}) = \sum_{i=1}^p \bigl[\ell_i(X_i \mid \text{Pa}_G(X_i), \mathbf{X}) - \frac{|\text{Pa}_G(X_i)| + 1}{2}\log n\bigr],$$
where $\ell_i$ is the log-likelihood of the $i$-th node's local regression. See also
[[Score Functions for Structure Learning]] for BDeu (discrete data) and BGe (Bayesian Gaussian).

### Phase 1 — Forward Greedy Equivalence Search (FGES)

> [!definition] Algorithm: GES Forward Phase
> **Input:** data $\mathbf{X}$, score function $S$  
> **Start:** CPDAG $\mathcal{C} = $ empty graph (no edges)
>
> Repeat until no valid edge insertion increases $S$:
> 1. For each ordered pair $(X_i, X_j)$ not yet adjacent in $\mathcal{C}$, and for each valid
>    **Insert operator** $\text{Insert}(X_i, X_j, T)$ where $T \subseteq \text{adj}(X_j) \setminus \text{adj}(X_i)$:
>    - Compute the score improvement $\Delta S = S(\text{Insert}(X_i, X_j, T)) - S(\mathcal{C})$.
> 2. Apply the valid Insert with the largest $\Delta S > 0$.
> 3. Update $\mathcal{C}$ to the new CPDAG.
>
> **Output:** CPDAG $\mathcal{C}^+$ (forward-phase result)
^alg-ges-forward

The **Insert operator** $\text{Insert}(X_i, X_j, T)$ adds $X_i \to X_j$ plus edges
$T_k \to X_j$ for each $T_k \in T$, then applies Meek's rules to restore the CPDAG.
The set $T$ consists of nodes in $\text{adj}(X_j) \setminus \text{adj}(X_i)$ that should
be "turned into parents" of $X_j$ when the edge is inserted.

> [!note] Why start from the empty graph?
> The forward phase adds edges in order of score improvement. Starting from an empty CPDAG
> means the first edges added are those with the strongest marginal associations. The process
> continues until adding any edge would hurt the score. The resulting CPDAG $\mathcal{C}^+$
> may be "too dense" (overfit), which is why the backward phase is needed.

### Phase 2 — Backward Greedy Equivalence Search

> [!definition] Algorithm: GES Backward Phase
> **Input:** CPDAG $\mathcal{C}^+$ from forward phase
>
> Repeat until no valid edge deletion increases $S$:
> 1. For each edge $(X_i, X_j)$ in $\mathcal{C}^+$ and each valid
>    **Delete operator** $\text{Delete}(X_i, X_j, H)$ where $H \subseteq \text{adj}(X_i) \cap \text{adj}(X_j)$:
>    - Compute the score improvement $\Delta S = S(\text{Delete}(X_i, X_j, H)) - S(\mathcal{C}^+)$.
> 2. Apply the valid Delete with the largest $\Delta S > 0$.
> 3. Update $\mathcal{C}^+$ to the new CPDAG.
>
> **Output:** CPDAG $\hat{\mathcal{C}}$ (final result)
^alg-ges-backward

The **Delete operator** $\text{Delete}(X_i, X_j, H)$ removes the edge $(X_i, X_j)$, undirects
edges from $H$ to $X_j$, and then applies Meek's rules. The $H$ subset specifies which
currently-directed edges should revert to undirected when the edge is removed.

### Consistency theorem

> [!theorem] Theorem: GES Consistency (Chickering, 2002, Thm. 15 + 17)
> Assume:
> 1. (CMC + Faithfulness) $\mathbb{P}$ is faithful to the true DAG $G^*$.
> 2. (Score consistency) The score $S$ is decomposable, score equivalent, and *consistent*:
>    as $n \to \infty$, $S(G, \mathbf{X}) > S(G^*, \mathbf{X})$ iff $G \equiv G^*$ (i.e. same MEC).
>    BIC is consistent; BDeu is consistent for fixed $p$.
>
> Then GES returns the CPDAG of $G^*$ in the large-sample limit:
> $$\hat{\mathcal{C}} \xrightarrow{n \to \infty} \mathcal{C}(G^*).$$
^thm-ges-consistency

This is the "Meek Conjecture" Chickering proved. The key insight is that forward GES always
reaches an equivalence class that *contains* the true DAG (by monotone score increase), and
backward GES then trims back to the true MEC.

### Scalability: Fast GES (FGES)

The original GES is $O(p^4)$ per iteration for dense graphs. **Fast GES (FGES)** (Ramsey et al.,
2017) uses a priority queue to avoid re-scoring unchanged edges, achieving much better practical
performance for high-dimensional data ($p$ up to hundreds of thousands in fMRI applications).

FGES is what the [[NOTEARS Experiments]] paper uses as a baseline under the label "FGS" — and
NOTEARS outperforms it on dense/large synthetic graphs while being competitive on sparse ones.

## Connections

- **PC vs GES**: Both target the CPDAG. PC uses CI tests (error-prone but fast for sparse graphs);
  GES uses a global score (more robust to individual test errors, better on dense graphs).
  See [[Constraint-Based Causal Discovery]] for a comparison table.
- **NOTEARS vs GES**: NOTEARS uses a LS score (similar to BIC in Gaussian SEMs) but searches
  via continuous optimization rather than greedy equivalence search. NOTEARS implicitly does not
  enforce the MEC representation — it returns a specific DAG, not a CPDAG.
- **Score functions**: GES requires a consistent, decomposable, score-equivalent function.
  [[Score Functions for Structure Learning]] covers BIC, BDeu, and BGe in detail.
- **BMA connection**: Bayesian Model Averaging over DAGs is related to GES: BMA averages
  predictions over all DAGs weighted by their posterior $P(G \mid \mathbf{X}) \propto e^{S(G)}$,
  while GES greedily maximizes that posterior.

## See Also
- [[Markov Equivalence and CPDAGs]] — what GES targets and why
- [[Score Functions for Structure Learning]] — BIC, BDeu, BGe
- [[PC Algorithm]] — the constraint-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[DAG Structure Learning Problem]] — problem setup, score-based formulation
