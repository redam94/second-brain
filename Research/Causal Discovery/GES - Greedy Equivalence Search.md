---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "§3 — Chickering (2002) JMLR 3:507–554"
date_ingested: 2026-07-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - GES
  - Greedy Equivalence Search
  - Chickering 2002
  - FGES
  - Fast Greedy Search
  - FGS
  - score-based causal discovery
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is the canonical **score-based** method
> for causal structure learning. Instead of testing conditional independences like PC, GES optimizes
> a **decomposable score** (e.g., BIC) over the space of CPDAGs by a two-phase greedy search:
> a **forward phase** adds edges to maximize the score, and a **backward phase** removes edges.
> Under Markov + faithfulness and with a consistent score, GES provably recovers the true CPDAG
> (Chickering's Theorem 15). In practice, the **FGES** (Fast GES) implementation is the standard
> scalable baseline used in structure learning benchmarks — including as the primary competitor
> to NOTEARS.

## Overview

GES was introduced by Chickering (2002) in JMLR as an elegant solution to the combinatorial
structure-learning problem. Its core insight: the space of CPDAGs has a **lattice structure**
ordered by the inclusion of Markov equivalence classes (edge additions correspond to moving up
the lattice). A greedy search on this lattice — using a locally computable, decomposable score
— provably reaches the global maximum in large samples.

GES's relationship to PC:
- **PC** is constraint-based: it uses CI tests to determine edges, then orients them.
- **GES** is score-based: it uses a BIC-type score to compare models, operating directly on CPDAGs.
- Both output CPDAGs. Both are consistent under the same Markov + faithfulness assumptions.
- In practice, GES/FGES tends to outperform PC on dense graphs; PC is preferred when a
  nonparametric CI test is needed (non-Gaussian, mixed data, nonlinear).

## Main Content

### Decomposable Scores

GES requires a **decomposable** score: one that sums over node-specific terms, so that a single
edge insertion/deletion changes only a small number of terms.

> [!definition] Definition: Decomposable Score (Chickering, 2002, §2.3)
> A score $S(G; \mathbf{X})$ is **decomposable** if it can be written as:
> $$S(G; \mathbf{X}) = \sum_{j=1}^d \text{LocalScore}(X_j, \text{PA}_j(G); \mathbf{X})$$
> where $\text{PA}_j(G)$ is the parent set of node $j$ in DAG $G$ (or CPDAG $H$) and
> $\text{LocalScore}$ depends only on $X_j$ and its parents.
^def-decomposable-score

> [!example] BIC Score for Gaussian Linear SEMs
> For Gaussian data and a linear SEM $X_j = \sum_{k \in \text{PA}_j} \beta_{jk} X_k + \varepsilon_j$,
> the **Bayesian Information Criterion (BIC)** score is:
> $$\text{BIC}(G; \mathbf{X}) = -\frac{n}{2}\sum_{j=1}^d \log\widehat{\sigma}^2_j(\text{PA}_j(G))
>   + \frac{\log n}{2} \cdot |G|$$
> where $\widehat{\sigma}^2_j$ is the residual variance from regressing $X_j$ on its parents,
> and $|G|$ is the total number of edges (effective parameter count).
>
> **Decomposable:** BIC splits as $\sum_j \text{LocalScore}_j$; adding edge $k \to j$ changes
> only $\text{LocalScore}_j$ (a local regression). This makes edge-by-edge greedy search tractable.
>
> **Consistent:** Under Gaussian SEMs, BIC is a consistent model selection criterion — in the
> limit $n \to \infty$, BIC assigns higher score to the true model than to any strictly larger
> or smaller model.
^ex-bic-score

### GES Algorithm

> [!definition] Algorithm: GES (Chickering, 2002)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; decomposable score $S$.
> **Output:** CPDAG $H$ maximizing $S$ (approximately).
>
> **Phase 1: Forward (Insert) Phase**
> - Initialize $H \leftarrow$ empty graph (score $= 0$).
> - Repeat:
>   - For every non-adjacent pair $(X, Y)$ and every **valid insert operator** $\text{Insert}(X, Y, T)$:
>     - $T$ is a subset of $\{\text{neighbors of } Y \text{ that are adjacent to } X\}$
>     - Compute $\Delta S = S(\text{Insert}(X,Y,T; H)) - S(H)$
>   - If $\max \Delta S > 0$: apply the highest-scoring insert; update $H$.
>   - Else: **stop** (local maximum of score reached in the forward direction).
>
> **Phase 2: Backward (Delete) Phase**
> - Continue from Phase 1's output.
> - Repeat:
>   - For every adjacent pair $(X, Y)$ in $H$ and every **valid delete operator** $\text{Delete}(X, Y, H')$:
>     - $H'$ is a clique subset of common neighbors of $X$ and $Y$
>     - Compute $\Delta S = S(\text{Delete}(X,Y,H'; H)) - S(H)$
>   - If $\max \Delta S > 0$: apply the highest-scoring delete; update $H$.
>   - Else: **stop**.
>
> The Insert and Delete operators are carefully defined by Chickering to guarantee that each step
> produces a valid CPDAG (not just any partially directed graph).
^def-ges-algorithm

> [!note] What is a "valid insert" $\text{Insert}(X, Y, T)$?
> Inserting edge $X \to Y$ is "valid" only if the resulting graph is still a valid CPDAG. The
> set $T \subseteq \text{Adj}(Y) \cap \text{Adj}(X)$ specifies which of $Y$'s neighbors get
> "turned into" new parents of $Y$ as part of the insertion (to preserve the CPDAG invariant).
> Chickering's paper derives the exact conditions for validity (Thm. 14 and Lemma 13). The key
> practical point is that these validity checks can be done locally (in constant or near-constant
> time per edge) using the graph's adjacency structure.

### The Optimality Theorem

> [!theorem] Theorem 15: GES Consistency (Chickering, 2002)
> Let $G^*$ be the true causal DAG, $\mathcal{C}^*$ its Markov equivalence class (MEC),
> and $H^*$ the true CPDAG. Assume:
> - **Markov condition** and **faithfulness**.
> - The score $S$ is **consistent**: in the limit $n \to \infty$, $S(H^*; \mathbf{X}) > S(H; \mathbf{X})$
>   for any CPDAG $H \neq H^*$ (with probability 1).
>
> Then, as $n \to \infty$:
> 1. **Phase 1 terminates at a superset** of $H^*$: the Phase-1 output contains all edges in
>    $H^*$ (no underfitting in the forward direction).
> 2. **Phase 2 terminates at $H^*$**: the backward phase removes all spurious edges, and the
>    output is the true CPDAG.
>
> **Corollary:** GES with BIC score is consistent for Gaussian linear SEMs.
^thm-ges-consistency

**Proof sketch:** The key lemma is that the CPDAG space is a **covered-edge graph** (every step
in the greedy search corresponds to a "covered edge" transformation). Chickering shows that:
- Phase 1 climbs a well-ordered lattice from the empty CPDAG up; faithfulness guarantees all
  true edges get inserted (their score improvement is positive in the limit).
- Phase 2 then prunes: spurious edges have negative score improvement in the limit, so they are
  all removed.

### FGES: Fast GES

The original GES algorithm was $O(d^4)$ per phase in the worst case, limiting it to small graphs.
**FGES** (Fast GES, Ramsey et al., 2017) achieves near-linear-time per step using:
- **Score caching:** pre-compute local scores and maintain a sorted priority queue of score changes.
- **Lazy re-scoring:** only re-score edges adjacent to the just-modified node.
- **Multi-threading:** parallelize across the node queue.

FGES scales to $d \approx 10^4$ variables and is the implementation used in the TETRAD suite
and as the FGS baseline in the NOTEARS paper. The theoretical guarantees of GES apply exactly.

> [!note] Naming conventions
> - **GES** = original Chickering (2002) algorithm
> - **FGES** = Fast GES (Ramsey et al., 2017), same theory, scalable implementation
> - **FGS** = the TETRAD implementation name (used as baseline in NOTEARS experiments)
> These three refer to the same algorithmic idea; "FGES" and "FGS" are the modern scalable variants.

### Comparison: GES vs. PC vs. NOTEARS

> [!definition] Comparison Table: Structure Learning Paradigms
>
> | Property | **PC** | **GES / FGES** | **NOTEARS** |
> |----------|--------|----------------|-------------|
> | Paradigm | Constraint-based | Score-based | Continuous optimization |
> | Key input | CI tests | Decomposable score | Score + smooth acyclicity |
> | Search space | Edges (then CPDAGs) | CPDAG space | Real matrix $\mathbb{R}^{d\times d}$ |
> | Output | CPDAG | CPDAG | DAG (fully directed) |
> | Data assumption | Any (with CI test) | Usually Gaussian/BIC | Linear SEM (flexible score) |
> | Faithfulness? | Required | Required | Not needed (different paradigm) |
> | Consistency | Yes (oracle CI tests) | Yes (Thm. 15) | Stationary points; near-optimal in practice |
> | Dense graphs | Struggles (large $\lvert S\rvert$) | FGES handles well | Excels (global matrix update) |
> | Non-Gaussian | Kernel CI tests | Score change needed | Built-in (noise-type agnostic) |
> | Software | pcalg, causal-learn | pcalg, TETRAD/FGES | NOTEARS Python (50 lines) |
^def-comparison

**NOTEARS vs. GES in experiments:** In the NOTEARS paper (see [[NOTEARS Experiments]]):
- GES (as FGS) was competitive with NOTEARS on **sparse** graphs (ER-2).
- On **denser** graphs (SF-4) and larger $d$, NOTEARS significantly outperformed FGS — because
  GES's CPDAG search still struggles when in-degrees are large (hub nodes).

## Examples

> [!example] GES Forward Phase on a Simple DAG
> **True structure:** $X_1 \to X_3$, $X_2 \to X_3$, $n = 1000$, Gaussian noise, BIC score.
>
> **Phase 1 (Forward):**
> - Round 1: Test all possible inserts. Best insert: $X_2 \to X_3$ (highest BIC improvement because
>   $X_3$ is strongly caused by $X_2$). Apply it.
> - Round 2: Next best: $X_1 \to X_3$. Apply it.
> - Round 3: Try inserting $X_1 \to X_2$ or $X_2 \to X_1$. BIC improvement ≈ 0 (no true edge).
>   Stop.
> - Phase 1 output: CPDAG with $\{X_1 \to X_3, X_2 \to X_3\}$ — the true CPDAG (since $X_1$ and
>   $X_2$ are non-adjacent, forming a v-structure; v-structures are always directed in CPDAGs).
>
> **Phase 2 (Backward):**
> - Try deleting each edge. No deletion improves BIC (true edges contribute positive fit).
>   Stop immediately.
>
> **Output:** The true CPDAG $X_1 \to X_3 \leftarrow X_2$.
^ex-ges-forward

## Connections

- **Markov Equivalence Classes** ([[Markov Equivalence Classes and CPDAGs]]): GES searches
  the CPDAG space directly — each step in the algorithm corresponds to a move in the CPDAG lattice.
  Chickering's proof relies on the lattice structure of MECs.
- **PC Algorithm** ([[PC Algorithm]]): complementary method — constraint-based vs. score-based.
  Both output CPDAGs; GES is generally preferred for Gaussian data; PC for nonparametric settings.
- **DAG Structure Learning Problem** ([[DAG Structure Learning Problem]]): the note's landscape
  table positions GES in the "local/approximate search" camp, though GES is more principled than
  hill-climbing variants.
- **NOTEARS Experiments** ([[NOTEARS Experiments]]): GES (as FGS) was the primary baseline;
  NOTEARS was compared against it on ER and SF graph benchmarks.
- **Method of Simulated Moments** ([[Method of Simulated Moments]]): for ABM structure learning,
  SMM/GES connections are being explored (Gap #25 in the Dream index) — GES's decomposable score
  is analogous to SMM's moment matching objective.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG space GES searches; the lattice structure
- [[PC Algorithm]] — constraint-based alternative; comparison in the Connections section
- [[DAG Structure Learning Problem]] — the setup GES addresses, landscape of prior approaches
- [[Smooth Characterization of Acyclicity]] — NOTEARS's approach to the same problem
- [[NOTEARS Algorithm]] — the continuous-optimization alternative to GES
- [[NOTEARS Experiments]] — empirical comparison of GES (FGS) vs. NOTEARS
