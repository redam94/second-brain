---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002) — JMLR 3:507–554 (open access: jmlr.org/papers/v3/chickering02b)"
source_location: "§2 (background), §3 (FES), §4 (BES), §5 (correctness theorem)"
date_ingested: 2026-09-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Causal Structure Learning - Method Comparison]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based structure learning"
  - "FES BES"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering 2002) is the canonical **score-based** method for learning the Markov
> equivalence class of a causal DAG. Instead of testing individual conditional independencies,
> GES greedily maximizes a **decomposable score** (e.g., BIC) over the space of CPDAGs.
> It has two phases: **Forward Equivalence Search (FES)** adds edges via Insert operators until
> the score cannot improve; **Backward Equivalence Search (BES)** removes edges via Delete
> operators. Chickering proved that GES recovers the true CPDAG **asymptotically** under the
> Gaussian faithfulness assumption — the first such proof for a score-based structure-learning
> algorithm.

## Overview

PC identifies the MEC by asking "which pairs are conditionally independent?" GES asks
a complementary question: "which MEC maximizes the score of the data?" The key insight
is that a **decomposable score** (one that factors over nodes) enables GES to evaluate
each Insert or Delete operation *locally* — changing only the parents of one node —
without re-scoring the entire graph.

The search space is the set of *CPDAGs*, not individual DAGs. This is crucial: searching
over DAGs directly is intractable because two different DAGs in the same MEC would give
identical scores (score equivalence), generating a flat landscape. By searching over
CPDAGs, GES avoids this degeneracy.

Chickering's proof of correctness rests on the **Meek Conjecture**, which Chickering himself
proved: any I-map can be reached from the true MEC by a sequence of covered-edge reversals
that each increase the MEC ordering — this guarantees GES cannot get stuck in a sub-optimal MEC.

## Main Content

### Score Function

> [!definition] Definition: Decomposable, Score-Equivalent Score
> A scoring function $\sigma(G, \mathbf{X})$ is **decomposable** if
> $$\sigma(G, \mathbf{X}) = \sum_{i=1}^{d} \sigma_i(X_i, \operatorname{Pa}_G(X_i), \mathbf{X}),$$
> i.e., it sums local scores $\sigma_i$ that depend only on node $X_i$ and its parents.
>
> It is **score-equivalent** if $G_1 \equiv G_2 \Rightarrow \sigma(G_1) = \sigma(G_2)$ —
> all DAGs in the same MEC receive the same score.
>
> Under Gaussian data, the **BIC score** is decomposable and score-equivalent:
> $$\sigma_{\text{BIC}}(G, \mathbf{X}) = \sum_{i=1}^{d} \left[ -\frac{n}{2}\ln\hat{\sigma}^2_i - \frac{|\operatorname{Pa}_G(X_i)| + 1}{2}\ln n \right],$$
> where $\hat{\sigma}^2_i$ is the MLE noise variance for the regression of $X_i$ on its parents.
^def-ges-score

> [!note] Local Score Increments
> The decomposability means that Insert$(X, Y, T)$ changes only $\sigma_Y$ (the score
> of node $Y$ with a new parent $X$). The **score gain** of the operation is
> $\Delta\sigma = \sigma_Y(X_Y \cup \{X\}, T \to Y) - \sigma_Y(X_Y, -)$, computable without
> touching the rest of the graph.

### Phase 1: Forward Equivalence Search (FES)

FES starts from the empty CPDAG (no edges) and repeatedly applies the best Insert operator.

> [!definition] Definition: Insert Operator — Insert$(X, Y, \mathbf{T})$
> Given a CPDAG $C$ and nodes $X$, $Y$ not adjacent in $C$, and a subset
> $\mathbf{T} \subseteq \operatorname{adj}_C(Y) \setminus \operatorname{adj}_C(X)$:
>
> 1. Add the edge $X \to Y$ to $C$.
> 2. For each $T \in \mathbf{T}$: orient $T \to Y$ (previously undirected $T - Y$).
> 3. Complete the resulting PDAG into a CPDAG by applying the PDAG-to-CPDAG completion
>    algorithm (Dor & Tarsi 1992; Meek 1995).
>
> The operator is **valid** if it yields a DAG in the resulting CPDAG (i.e., the PDAG
> is consistent with some DAG). Chickering (2002) characterizes precisely when each
> Insert is valid via the **clique condition** on $\mathbf{T}$.
^def-insert-op

> [!definition] Definition: FES Phase
> 1. Initialize $C_0 \leftarrow$ empty CPDAG.
> 2. While any valid Insert$(X, Y, \mathbf{T})$ improves the score:
>    - Select the Insert that gives the maximum $\Delta\sigma > 0$.
>    - Apply the Insert, update $C$.
> 3. Output $C_{\text{FES}}$.
^def-fes

> [!note] FES Overshoot in Finite Samples
> FES terminates at the correct CPDAG **asymptotically**. In finite samples, the BIC
> score may not penalize extra edges strongly enough, causing FES to add spurious edges.
> BES exists precisely to remove these.

### Phase 2: Backward Equivalence Search (BES)

BES starts from $C_{\text{FES}}$ and repeatedly applies the best Delete operator.

> [!definition] Definition: Delete Operator — Delete$(X, Y, \mathbf{H})$
> Given CPDAG $C$ and nodes $X$, $Y$ adjacent in $C$, and a subset
> $\mathbf{H} \subseteq \operatorname{adj}_C(X) \cap \operatorname{adj}_C(Y)$:
>
> 1. Remove the edge $X - Y$ or $X \to Y$ from $C$.
> 2. For each $H \in \mathbf{H}$: orient $H \to X$ and $H \to Y$ if needed (or make undirected).
> 3. Complete the resulting PDAG into a CPDAG.
>
> The operator is valid if the resulting PDAG is consistent with a DAG.
^def-delete-op

> [!definition] Definition: BES Phase
> 1. Initialize $C \leftarrow C_{\text{FES}}$.
> 2. While any valid Delete$(X, Y, \mathbf{H})$ improves (or does not decrease) the score:
>    - Select the Delete with maximum (non-negative) $\Delta\sigma$.
>    - Apply the Delete, update $C$.
> 3. Output $C_{\text{BES}}$.
^def-bes

### Correctness Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let the true data-generating DAG be $G^*$, and let the score $\sigma$ be **consistent**
> (in the sense that asymptotically the true DAG maximizes $\sigma$ over all DAGs) and
> **decomposable** and **score-equivalent**. Under the **Gaussian faithfulness assumption**,
> GES returns the CPDAG of $G^*$ in the limit as $n \to \infty$.
>
> More precisely:
> - **FES converges**: at the limit, FES terminates at a CPDAG that is at least as dense
>   as the true MEC (includes all true edges, possibly with extras).
> - **BES converges**: BES removes all spurious edges added by FES, reaching the true CPDAG.
^thm-ges-consistency

> [!note] The Meek Conjecture (Chickering 2002, Theorem 2)
> A key lemma in the proof: *if $G$ is an I-map of $G^*$ (i.e., d-separations of $G$ are
> a superset of $G^*$'s), then there is a sequence of covered-edge reversals transforming
> $G$ into $G^*$ such that each intermediate graph is also an I-map of $G^*$.*
>
> This "Meek Conjecture" (named after Meek 1995 who stated but did not prove it) was the
> main open problem in score-based structure learning; Chickering's proof of it establishes
> that GES's greedy path through CPDAG space is guaranteed to reach the global optimum
> asymptotically.

### Hauser–Bühlmann Extension: Turning Phase

Hauser & Bühlmann (2012) add a third **Turning phase** between FES and BES:

> [!definition] Definition: Turn Operator — Turn$(X, Y, \mathbf{C})$
> Reverses an undirected edge $X - Y$ by a structured sequence of Insert/Delete sub-steps.
> The Turning phase improves finite-sample performance without affecting asymptotic consistency.
^def-turn-op

The three-phase variant (FES → Turning → BES) is sometimes called **GIES** in the context
of interventional data (Hauser & Bühlmann 2012).

## Examples

> [!example] Example: GES on a 3-Node Graph
> **True graph:** $G^* = X_1 \to X_2 \to X_3$ (chain); MEC = $\{X_1 - X_2 - X_3\}$.
>
> **FES, step 1:** Empty CPDAG. Candidate inserts: Insert$(X_1, X_2, \emptyset)$,
> Insert$(X_2, X_3, \emptyset)$, Insert$(X_1, X_3, \emptyset)$. The edge $X_1 - X_2$
> gives the largest BIC gain (direct cause). Orient: $X_1 \to X_2$.
>
> **FES, step 2:** Insert$(X_2, X_3, \emptyset)$ gives next best gain. CPDAG: $X_1 \to X_2 \to X_3$.
>
> **FES, step 3 (finite samples):** Insert$(X_1, X_3, \{X_2\})$ may also improve BIC
> slightly. If it does, add: CPDAG becomes $X_1 \to X_2 \to X_3$, $X_1 \to X_3$
> (a triangle). FES terminates.
>
> **BES:** Delete$(X_1, X_3, \{X_2\})$ improves BIC (penalizes the extra edge). Remove it.
> Final CPDAG: $X_1 - X_2 - X_3$ (undirected, as no v-structures can be oriented). ✓

## Connections

- **PC comparison**: PC uses CI tests (constraint-based); GES uses a score (score-based).
  GES typically has better finite-sample accuracy but PC scales better with $d$ for
  sparse graphs. See [[Causal Structure Learning - Method Comparison]].
- **NOTEARS comparison**: NOTEARS is also score-based (LS + L1) but optimizes over
  $\mathbb{R}^{d\times d}$ rather than CPDAGs — it finds a single DAG, not a CPDAG, and
  has weaker theoretical guarantees. See [[NOTEARS - Overview]].
- **Interventional GES (GIES)**: Hauser & Bühlmann (2012) extend GES to interventional
  data, with Insert/Delete/Turn operators adapted for hard and soft interventions.
- **Score function connection**: the decomposable BIC score used here is related to the
  BIC model selection criteria in [[Overfitting and Information Criteria]].

## See Also
- [[DAG Structure Learning Problem]] — the problem GES optimizes
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES
- [[PC Algorithm]] — the constraint-based alternative
- [[Causal Structure Learning - Method Comparison]] — PC vs GES vs NOTEARS
- [[NOTEARS - Overview]] — continuous optimization alternative
