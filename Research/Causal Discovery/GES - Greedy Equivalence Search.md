---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/chickering02b-GES-source.txt]]"
source_location: "Chickering (2002), JMLR vol. 3, pp. 507-554"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - V-Structures and Meek Rules]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES"
  - "score-based structure learning"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. It searches directly over the space of Markov
> equivalence classes (CPDAGs) in two phases: a **Forward Equivalence Search** (FES)
> that greedily adds edges, then a **Backward Equivalence Search** (BES) that greedily
> removes them. Under the **faithfulness** assumption and a **decomposable, consistent**
> score (e.g. BIC), GES is guaranteed to return the true CPDAG in the large-sample limit.
> Unlike the PC algorithm, GES requires no CI tests and no significance threshold.

## Overview

GES belongs to the **score-based** family: it assigns a score to each candidate model
and searches for the highest-scoring one. The key innovations of Chickering (2002) are:

1. **Searching over CPDAGs** (equivalence classes) rather than individual DAGs — this
   avoids the pitfall of distinguishing Markov-equivalent models that will score identically.
2. **The Insert and Delete operators** — local moves on CPDAGs that correspond to adding
   or removing a single edge from the equivalence class, with provably correct CPDAG
   maintenance via [[PC Algorithm - V-Structures and Meek Rules|Meek rules]].
3. **The optimality theorem** — GES finds the globally highest-scoring CPDAG when the
   score is decomposable and consistent.

The algorithm was popularized in causal inference by Hauser & Bühlmann (2012), who
extended it to interventional data (GIES), and by its implementation in the `pcalg`
R package and Tetrad suite.

## Main Content

### The Score

GES requires a **decomposable, consistent** score. The most common choice is **BIC**
(Bayesian Information Criterion):

$$
\mathrm{BIC}(G, \mathcal{D}) = \log P(\mathcal{D} \mid \hat{\theta}_G, G) - \frac{|\theta_G|}{2} \log n
$$

For linear Gaussian SEMs, this simplifies to (up to constants):

$$
\mathrm{BIC}(G, \mathcal{D}) = -\frac{n}{2} \sum_{j=1}^{d} \log \hat{\sigma}^2_{j \mid \mathrm{pa}_G(j)} - \frac{k}{2} \log n
$$

where $\hat{\sigma}^2_{j \mid \mathrm{pa}_G(j)}$ is the residual variance of regressing
$X_j$ on its parents, and $k$ counts the total parameters.

> [!definition] Definition: Decomposability
> A score $s(G, \mathcal{D})$ is **decomposable** if it factors as a sum over nodes:
> $$s(G, \mathcal{D}) = \sum_{j=1}^{d} s_j\!\left(X_j \mid \mathrm{Pa}_G(X_j), \mathcal{D}\right)$$
> Each node's local score depends only on the node and its parents.
> BIC, BDe, and BDeu scores are all decomposable.

^def-decomposable

Decomposability is crucial because it means the score **change** from adding or removing
a single edge can be computed locally, without re-scoring the entire graph.

### Phase 1: Forward Equivalence Search (FES)

**Start**: Empty graph (CPDAG = $\emptyset$).

At each step, consider all possible **Insert** operators: adding the edge $X \to Y$
to the current CPDAG, for each pair $(X, Y)$ not currently adjacent and each valid
subset $T \subseteq \mathrm{NA}_{YX} \setminus \mathrm{Adj}(X)$ (a technical set
that controls which new v-structures are introduced). Apply the Insert yielding the
greatest BIC improvement.

**Terminate** when no Insert improves the score.

> [!note] Insert Operator
> $\mathrm{Insert}(X, Y, T)$: adds the directed edge $X \to Y$ and orients all edges
> in $T$ toward $Y$. The set $T$ must be chosen so that the resulting graph remains
> a valid CPDAG (no new non-v-structure immoralities, no cycle). Chickering (2002)
> characterizes the valid $T$ sets precisely and proves that the CPDAG can be maintained
> after each Insert using [[PC Algorithm - V-Structures and Meek Rules|Meek rules]].

**Key property of FES**: The forward phase overshoots — it adds edges beyond the true
skeleton because it can only add, not remove. BES then corrects this.

### Phase 2: Backward Equivalence Search (BES)

**Start**: CPDAG output of FES.

At each step, consider all possible **Delete** operators: removing the edge $X$-$Y$
(directed or undirected) from the current CPDAG, for each valid subset $H \subseteq
\mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$ (controls how removing the edge affects the
neighbourhood structure). Apply the Delete yielding the greatest BIC improvement.

**Terminate** when no Delete improves the score.

> [!note] Delete Operator
> $\mathrm{Delete}(X, Y, H)$: removes the edge $X$-$Y$ and unorients edges in $H$
> (making them undirected). After deletion, Meek rules are applied to restore a valid
> CPDAG.

### The Optimality Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $G^*$ be the true DAG over variables $V$, let $P$ be faithful to $G^*$, and let
> $s$ be a **decomposable, consistent** scoring criterion (i.e., $s$ selects the true
> DAG in the large-sample limit among nested models). Then in the large-sample limit
> ($n \to \infty$), **GES returns the CPDAG of $G^*$** — the Markov equivalence class
> of the true graph.
>
> More precisely: FES terminates at a CPDAG whose skeleton is a **supergraph** of
> the true skeleton; BES then removes all spurious edges, leaving exactly the true CPDAG.

^thm-ges-consistency

The two-phase structure is essential for this result. FES alone would overshoot (too many
edges); a single greedy backward pass from the empty graph would undershoot. The forward
then backward structure mirrors the two-phase approach in stepwise model selection.

### Complexity

GES is polynomial in $d$ for **sparse** graphs:

| Phase | Operations | Cost per step |
|-------|-----------|---------------|
| FES | $O(d^2 \cdot 2^q)$ Inserts tested per step | $O(q)$ local BIC |
| BES | $O(d^2 \cdot 2^q)$ Deletes tested per step | $O(q)$ local BIC |

where $q$ is the maximum degree of the true graph. For dense graphs the inner loop
is exponential in degree.

### FGES (Fast GES)

Ramsey et al. (2017) introduce **FGES** (Fast GES), which parallelizes the Insert/Delete
search using a priority queue of candidate scores. FGES has the same asymptotic guarantees
as GES but is substantially faster in practice, enabling application to thousands of
variables. It is the default in the Tetrad system.

### Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | `ges()` function; BIC/BDe scores |
| `causal-learn` | Python | `GES` class |
| `tetrad` / `py-tetrad` | Java / Python | FGES; highly optimized |

## Connections

- **Contrast with PC**: PC uses CI tests (non-parametric, requires $\alpha$); GES uses
  a score (parametric, no threshold). PC works with any CI test; GES requires a
  decomposable score. See [[PC Algorithm - Overview]].
- **NOTEARS**: operates on individual DAGs not equivalence classes; see [[NOTEARS - Overview]].
- **Consistency**: GES is consistent without a faithfulness assumption if the score is
  consistent — but faithfulness is still needed for finite-sample guarantees in practice.
- **Score = BIC**: the BIC penalty $\frac{k}{2} \log n$ plays the same regularization
  role as the $\lambda \|W\|_1$ penalty in NOTEARS ([[DAG Structure Learning Problem]]).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG space GES searches over
- [[PC Algorithm - Overview]] — the constraint-based complement to GES
- [[DAG Structure Learning Problem]] — the NP-hard problem GES addresses
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
