---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Part 3 — GES: Greedy Equivalence Search"
date_ingested: 2026-08-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - GES
  - Greedy Equivalence Search
  - score-based causal discovery
  - FES
  - BES
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering 2002) is the canonical **score-based** causal structure learning
> algorithm. It searches directly over Markov equivalence classes (CPDAGs) using a two-phase
> greedy strategy: **Forward Equivalence Search (FES)** adds edges while the score improves;
> **Backward Equivalence Search (BES)** removes edges while the score improves. The key
> theoretical result is Chickering's proof of the **Meek Conjecture**, which guarantees that
> GES is *consistent* — it recovers the true CPDAG as $n \to \infty$ under Causal Markov +
> Faithfulness + Causal Sufficiency + any locally consistent decomposable score.

## Overview

GES was introduced by Chickering (2002) as part of a paper that proved the Meek Conjecture —
a claim that was central to the theoretical understanding of Markov equivalence classes but had
resisted proof for years. The proof technique (showing every pair of MECs is connected via
covered edge reversals) simultaneously established that GES's two-phase search is *complete*:
it can reach the optimal CPDAG from the empty graph without getting trapped.

GES searches over **CPDAGs** rather than individual DAGs, which has two advantages:
(1) it avoids evaluating the same MEC multiple times (each CPDAG is visited at most once),
and (2) the score naturally aggregates the evidence for an entire equivalence class.

## Main Content

### The score function

GES requires a **decomposable, locally consistent score** $Q(G, D)$:

> [!definition] Definition: Decomposable score
> A score $Q(G, D)$ is **decomposable** if it factors as a sum of local terms, one per node:
> $$Q(G, D) = \sum_{j=1}^{d} Q_j(\text{pa}_G(X_j), D),$$
> where $Q_j$ depends only on $X_j$ and its parents $\text{pa}_G(X_j)$ in $G$.
> Decomposability enables efficient **local score updates**: when one edge is added/removed,
> only the affected node's local score needs to be recomputed.
^def-decomposable-score

> [!definition] Definition: BIC score (standard GES score)
> For Gaussian data (linear SEM with Gaussian noise):
> $$\text{BIC}(G, D) = \ell(G; D) - \frac{d_G}{2}\log n,$$
> where $\ell(G; D)$ is the maximised log-likelihood, $d_G$ is the number of free parameters,
> and $n$ is the number of observations. The penalty $\frac{d_G}{2}\log n$ penalises complexity.
> For Gaussian data, $\text{BIC}$ decomposes as a sum of regression log-likelihoods — one
> OLS regression of $X_j$ on $\text{pa}(X_j)$ per node — making local updates $O(d^2)$ or less.
^def-bic-score

### Local consistency

> [!definition] Definition: Locally consistent score (Chickering 2002)
> A decomposable score $Q$ is **locally consistent** if, for any DAG $G$ and any pair of
> Markov-equivalent DAGs $G'$ differing from $G$ by a single covered edge reversal:
> 1. $Q(G, D) = Q(G', D)$ (equivalent DAGs have the same score), and
> 2. $Q(G + \{X \to Y\}, D) > Q(G, D)$ iff $X \not\perp\!\!\!\perp Y \mid \text{pa}(X) \cup \text{pa}(Y)$
>    in the true distribution (adding a true edge always increases the score asymptotically).
>
> BIC satisfies local consistency for all Gaussian SEMs and, more generally, for models from
> the exponential family.
^def-locally-consistent

### Phase 1 — Forward Equivalence Search (FES)

1. Start with the **empty CPDAG** (no edges).
2. Compute the score $Q_0 = Q(\text{empty}, D)$.
3. For each possible edge insertion $(X, Y)$ into the current CPDAG $C$:
   - Check validity: does inserting $X \to Y$ into $C$ yield a valid CPDAG? (This requires
     checking that the new edge does not introduce inconsistent orientations.)
   - Compute the local score gain $\Delta Q(X, Y, C) = Q_j(\text{pa}_C(Y) \cup \{X\}, D) - Q_j(\text{pa}_C(Y), D)$.
4. Select the insertion that maximises $\Delta Q$.
5. Apply it. Repeat from step 3.
6. Stop when no single edge insertion increases $Q$.

> [!note] FES output
> FES returns a CPDAG that is a **local optimum** with respect to single edge insertions.
> Under local consistency, FES provably over-recovers: it may include spurious edges,
> but it includes all true edges. BES corrects this.

### Phase 2 — Backward Equivalence Search (BES)

1. Start from the CPDAG output by FES.
2. For each possible edge deletion $(X, Y)$ from the current CPDAG $C$:
   - Check validity: does deleting this edge yield a valid CPDAG?
   - Compute the score gain $\Delta Q(X, Y, C)$.
3. Select the deletion that maximises $\Delta Q$.
4. Apply it. Repeat.
5. Stop when no single edge deletion increases $Q$.

**Output**: A CPDAG that is a local optimum under both single edge insertions and single
edge deletions — by the Meek Conjecture proof, this is the global optimum for locally
consistent scores as $n \to \infty$.

### The Meek Conjecture and Chickering's proof

> [!theorem] Theorem: Meek Conjecture (Chickering 2002)
> For any two DAGs $G$ and $H$ with the same skeleton, there exists a finite sequence of
> **covered edge reversals** in $G$ that produces a DAG Markov-equivalent to $H$. More
> precisely: if $H$ is an **independence map (I-map)** of $G$ (i.e., every independence in
> $G$ holds in $H$), then there is a sequence of covered edge reversals + edge additions
> from $G$ to $H$ that **monotonically increases the BIC score**.
^thm-meek-conjecture

The proof proceeds in two steps:
1. If $H$ is an I-map of $G$, show there is always a covered edge reversal available that
   moves "closer" to $H$ in a well-defined sense.
2. Two Markov-equivalent DAGs are always mutual I-maps of each other.

**Consequence for GES**: GES's FES+BES operators collectively span the space of all CPDAGs —
there is always a finite sequence of insertions/deletions that transforms any CPDAG into
any other. This means GES cannot get trapped at a CPDAG that is not globally optimal (under
the score) for large enough $n$.

### Consistency

> [!theorem] Theorem: GES Consistency (Chickering 2002)
> Under Causal Markov + Faithfulness + Causal Sufficiency, with a locally consistent
> decomposable score, GES returns the CPDAG of the true data-generating DAG with
> probability approaching 1 as $n \to \infty$.
^thm-ges-consistency

### Practical performance and extensions

**FGES (Fast GES, Ramsey et al. 2017)**: A parallelised, scalable variant of GES that
avoids recomputing scores from scratch after each edge operation. FGES scales to thousands
of variables and is implemented in the Tetrad software suite.

**Variants and extensions**:

| Variant | Modification | Use case |
|---------|-------------|----------|
| FGES | Parallelised score caching | Large $d$ (hundreds to thousands of variables) |
| GES with non-Gaussian score | Replace BIC with a score for non-Gaussian SEMs | Non-linear/non-Gaussian data |
| GDS (Greedy DAG Search) | Search over DAGs directly instead of CPDAGs | When within-MEC distinctions matter |
| RFCI / FCI-GES | Add latent variable handling | Unobserved confounders |

**Software**: `pcalg::ges()` in R (standard reference implementation); `ges` Python package
(juangamella/ges on GitHub, a direct implementation of Chickering 2002).

## Connections

- **NOTEARS benchmark**: GES is the primary score-based baseline in [[NOTEARS Experiments]].
  NOTEARS outperforms GES on dense/large graphs; GES outperforms NOTEARS on small, sparse
  graphs with Gaussian data.
- **PC complement**: [[PC Algorithm]] (constraint-based) and GES (score-based) target the
  same CPDAG under the same assumptions. In practice, PC is preferred when the CI test
  is well-specified for non-Gaussian data; GES when the Gaussian BIC is appropriate.
- **Meek Conjecture link to CPDAGs**: The proof relies on the covered edge reversal
  characterisation of MECs — see [[Markov Equivalence and CPDAGs#^def-covered-edge]].
- **ABM calibration**: The [[Method of Simulated Moments]] compares simulated ABM moments
  to observed moments; GES could be applied to ABM output to recover the graph of ABM
  emergent causal relationships.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAGs, Meek's rules, covered edge reversals (prerequisites)
- [[PC Algorithm]] — constraint-based alternative; same CPDAG target, different methodology
- [[DAG Structure Learning Problem]] — problem framing; GES appears in the "local/approximate search" row
- [[NOTEARS - Overview]] — continuous optimization alternative; [[NOTEARS Experiments]] benchmarks against GES
- [[Directed Acyclic Graphs]] — causal inference use of DAGs once the structure is learned
- [[BN Construction Methods Comparison]] — broader survey including GES as the score-based entry
