---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/spirtes00-CPS-source.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Skeleton Discovery]]"
  - "[[PC Algorithm - V-Structures and Meek Rules]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes Glymour Scheines"
  - "constraint-based structure learning"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter & Clark, introduced in Spirtes, Glymour & Scheines 2000)
> is the canonical **constraint-based** approach to causal structure learning. Starting
> from a complete graph, it removes edges by performing conditional independence tests
> at increasing conditioning set sizes, orients v-structures from the recorded separation
> sets, and completes the CPDAG using Meek's orientation rules. The algorithm is
> asymptotically consistent under the faithfulness and Markov assumptions, and in
> high-dimensional sparse graphs its worst-case complexity is $O(d^2 \cdot p^q)$ where
> $q$ is the maximum degree — polynomial when the graph is sparse.

## Overview

The PC algorithm belongs to the **constraint-based** family of structure-learning methods,
which proceed by:

1. Testing (statistical) conditional independence constraints in the data.
2. Using the results to identify the skeleton (which pairs of variables are adjacent).
3. Orienting edges using the implications of the Markov and faithfulness assumptions.

This contrasts with **score-based** methods like [[GES - Greedy Equivalence Search|GES]],
which directly optimize a model fit score (e.g. BIC) over the space of DAGs or CPDAGs,
and **continuous-optimization** methods like [[NOTEARS - Overview|NOTEARS]], which
reformulate the combinatorial constraint as a smooth equality constraint.

The algorithm is named after its inventors **P**eter Spirtes and **C**lark Glymour;
the full treatment appears in *Causation, Prediction, and Search* (Spirtes, Glymour &
Scheines 2000, MIT Press, 2nd ed.). The **high-dimensional consistent** version with
formal guarantees is due to Kalisch & Bühlmann (2007, JMLR).

## Main Content

### The Three Phases

```
Input: data X ∈ ℝⁿˣᵈ, conditional independence oracle (or test)
Output: CPDAG Ĝ

Phase 1 — Skeleton discovery
  Start with complete undirected graph G on d nodes
  For l = 0, 1, 2, …:
    For each adjacent pair (X, Y) in G:
      For each S ⊆ Adj(X) \ {Y} with |S| = l:
        If X ⊥⊥ Y | S in the data:
          Remove edge X-Y from G
          Record Sep(X, Y) = Sep(Y, X) = S
          Break inner loop
    If no edge was removed in this round, break outer loop

Phase 2 — V-structure orientation
  For each triple (X, Z, Y) where X-Z and Z-Y in skeleton,
    X and Y are non-adjacent, and Z ∉ Sep(X, Y):
      Orient X → Z ← Y (v-structure / immorality)

Phase 3 — CPDAG completion (Meek rules)
  Repeatedly apply R1–R4 until no further orientations possible
  (See [[PC Algorithm - V-Structures and Meek Rules]])
```

### Assumptions

> [!warning] Required Assumptions
> The PC algorithm is consistent under:
> 1. **Markov condition**: the data distribution $P$ satisfies the global Markov property
>    with respect to the true DAG $G^*$.
> 2. **Faithfulness**: every conditional independence in $P$ is entailed by a d-separation
>    in $G^*$ (no accidental cancellations).
> 3. **Sufficient sample size**: the conditional independence tests are consistent
>    (e.g., Fisher's $z$-test for Gaussian data with $\alpha \to 0$ as $n \to \infty$).
>
> Violation of faithfulness — e.g., exactly cancelling direct and indirect effects —
> leads to edge removal errors in Phase 1 that propagate through the algorithm.

### Complexity

| Setting | Worst-case CI tests | Notes |
|---------|--------------------|----|
| Dense graph (degree $\sim d$) | $O(d^2 \cdot 2^d)$ | Exponential |
| Sparse graph (max degree $q$) | $O(d^2 \cdot d^q)$ | Polynomial in $d$ for fixed $q$ |
| High-dim Gaussian, PC-stable | $O(d^2 \cdot d^{q_0})$ | $q_0$ = true skeleton degree |

The key insight: the outer loop in Phase 1 terminates as soon as no pair of adjacent
nodes has a conditioning set of size $l$ among its neighbours. For sparse graphs this
happens early. Kalisch & Bühlmann (2007) prove that the **PC-stable** variant
(which fixes the order of edge removals within each level $l$) is high-dimensionally
consistent when $d$ grows with $n$ at rate $d = O(n^a)$ for $a < 1$, provided the
true graph has bounded degree.

### PC-stable vs. Original PC

The original PC algorithm's output depends on the ordering of variables because edge
removals during skeleton discovery change the adjacency sets used to select conditioning
sets for subsequent tests. **PC-stable** (Colombo & Maathuis 2014) resolves this by
separating the adjacency update from the conditioning set selection: adjacency sets
are fixed within each level $l$ and updated only between levels. This makes the
skeleton **order-independent** (though the CPDAG can still depend on the ordering of
v-structure tests in Phase 2 — further variants address this).

### Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | Reference implementation; `pc()` function |
| `causal-learn` | Python | `PC` class; supports multiple CI tests |
| `pgmpy` | Python | `PC` estimator |
| `tetrad` | Java | The original SGS/Tetrad system from CMU |

## Connections

- **Contrast with GES**: PC operates in data space (tests CI relations); GES operates
  in score space (optimizes BIC). PC requires a CI test with calibrated $\alpha$;
  GES requires a decomposable score. See [[GES - Greedy Equivalence Search]].
- **Contrast with NOTEARS**: NOTEARS assumes a linear SEM and solves a continuous
  program; PC is non-parametric (any CI test can be plugged in). See [[NOTEARS - Overview]].
- **Output**: PC returns a [[Markov Equivalence Classes and CPDAGs|CPDAG]]; NOTEARS
  returns a single DAG.
- **Faithfulness failures**: the FCI algorithm extends PC to allow for latent confounders
  (non-Markovian distributions) at the cost of outputting a PAG instead of CPDAG.

## See Also
- [[PC Algorithm - Skeleton Discovery]] — Phase 1 in detail: CI tests and adjacency search
- [[PC Algorithm - V-Structures and Meek Rules]] — Phases 2–3: orienting the CPDAG
- [[Markov Equivalence Classes and CPDAGs]] — what the CPDAG represents
- [[GES - Greedy Equivalence Search]] — the score-based complement to PC
- [[DAG Structure Learning Problem]] — the NP-hard problem both PC and GES address
- [[Causal Discovery/_Index|Causal Discovery Index]]
