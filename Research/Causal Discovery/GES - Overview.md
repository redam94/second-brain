---
title: "GES - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-references.md]]"
source_location: "Chickering (2002), §1–2 (Introduction, Contributions); §6 (Consistency Theorem)"
date_ingested: 2026-10-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES Algorithm - Forward and Backward Phases]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES algorithm"
  - "Chickering 2002"
---

# GES - Overview

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based** causal
> structure-learning algorithm. It searches directly over the space of **Markov equivalence
> classes** (CPDAGs), adding edges in a forward phase and removing them in a backward phase,
> guided by a **decomposable, score-equivalent score** (typically BIC). Chickering's central result
> proves the **Meek Conjecture**: given a locally consistent score, GES recovers the true CPDAG in
> the large-sample limit. GES is the score-based counterpart to the PC algorithm and a key baseline
> for newer structure-learning methods including NOTEARS.

## Overview

The core idea of GES is to search for the CPDAG that maximises a decomposable score, using the
space of Markov equivalence classes as the search space. Unlike earlier greedy methods that searched
over individual DAGs and checked acyclicity, GES operates entirely in **equivalence-class space**:
it moves from one CPDAG to an adjacent one by adding or removing a single edge.

GES makes a different design choice from PC (constraint-based):

| Criterion | PC Algorithm | GES |
|-----------|-------------|-----|
| Evidence used | CI test outcomes (binary: independent/not) | Score differences (continuous: $\Delta$BIC) |
| Search space | Skeleton → CPDAG via rules | CPDAG space directly |
| Main assumption (beyond Markov + Faithfulness) | Causal sufficiency + CI test validity | Causal sufficiency + score-equivalence |
| Finite-sample behavior | Sensitive to CI test level $\alpha$ | Sensitive to score penalty (BIC: $\lambda \log n$) |
| Typical finite-$n$ accuracy | Moderate (many CI tests at high orders) | Often better (uses continuous score signal) |

## Main Content

### The Meek Conjecture and Chickering's Theorem

The central result Chickering (2002) establishes is the **Meek Conjecture** (originally conjectured
in Meek 1997):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Thm. 15)
> Let $G$ and $H$ be DAGs such that $H$ is an **independence map** of $G$ (i.e., every d-separation
> in $H$ also holds in $G$). Then there exists a sequence of elementary DAG transformations
> (single **edge additions** or **covered edge reversals**) transforming $G$ into $H$ such that
> every intermediate DAG remains an independence map of $G$.
>
> **Consequence for structure learning:** If the score is locally consistent, the forward phase
> of GES terminates at a DAG in the MEC of $G^*$, and the backward phase identifies the correct
> equivalence class. The algorithm is therefore consistent: $\hat{G} \to G^*$ as $n \to \infty$.
^thm-meek-conjecture

The Meek Conjecture is the theoretical cornerstone that makes GES's greedy two-phase search
provably correct — it guarantees that greedy one-edge-at-a-time moves in MEC space can reach
the true CPDAG without getting stuck in local optima (in the large-sample limit).

### Score Requirements

GES requires a score $s: \mathbb{D} \to \mathbb{R}$ satisfying:

> [!definition] Definition: Score Requirements for GES
> A scoring criterion $s$ is **suitable for GES** if it is:
> 1. **Score-equivalent**: $s(G) = s(G')$ whenever $G$ and $G'$ are Markov equivalent (same MEC).
>    *(Ensures the score is well-defined on MECs.)*
> 2. **Decomposable**: $s(G) = \sum_{i=1}^d s_i(G) = \sum_{i=1}^d s(X_i, \mathrm{Pa}_G(X_i))$
>    for some local family scores. *(Enables efficient incremental computation.)*
> 3. **Locally consistent**: in the limit $n \to \infty$:
>    - Adding a false edge to a DAG in $[G^*]$ decreases the score.
>    - Adding the correct parent to a node with a missing parent increases the score.
>
> The **BIC score** $s_{\text{BIC}}(G) = \ell(G; \mathbf{X}) - \frac{\log n}{2} |G|$ (where
> $|G|$ is the number of parameters) satisfies all three criteria for multivariate Gaussian data.
^def-score-requirements

### Two-Phase Structure

> [!definition] Definition: GES Algorithm Structure
> **Phase 1 (Forward / Insert):** Start from the empty CPDAG. Greedily add edges (Insert operators),
> one at a time, choosing at each step the operator that most increases the score. Stop when no
> single-edge insertion improves the score.
>
> **Phase 2 (Backward / Delete):** From the CPDAG produced by Phase 1, greedily remove edges
> (Delete operators), one at a time, choosing at each step the operator that most increases the
> score. Stop when no single-edge deletion improves the score.
>
> **Output:** The CPDAG produced by Phase 2.
>
> Each operator corresponds to a move in MEC space — it transforms the current CPDAG into an
> adjacent CPDAG with one more or one fewer edge. See [[GES Algorithm - Forward and Backward Phases]]
> for the detailed operator definitions.
^def-ges-structure

### Why Two Phases?

Phase 1 tends to **overshoot**: starting from the empty graph and adding edges greedily, the
algorithm may include spurious edges because the score locally improves even for false edges
(especially at finite $n$). Phase 2 cleans up by removing edges whose deletion improves the score.

In the large-sample ($n \to \infty$) limit:
- **End of Phase 1:** the algorithm has added all true edges (Meek Conjecture guarantees no local
  maximum before the true graph). It may have added false edges too.
- **End of Phase 2:** all false edges added in Phase 1 are removed. The final CPDAG equals $G^{*\text{CPDAG}}$.

### Complexity

GES has two sources of cost:
1. **Score evaluations**: each Insert or Delete operator requires computing $\Delta s = s(G') - s(G)$
   for one candidate move. Decomposability means only the local score of the affected node needs
   re-evaluation: $O(|\mathrm{Pa}_{new}|^3)$ for Gaussian BIC (matrix inversion).
2. **Number of operators**: at each greedy step, the algorithm considers $O(d^2)$ candidate moves.
   The total number of greedy steps is at most $O(d^2)$ edges.

Total complexity for GES is roughly $O(d^4)$ BIC evaluations with $O(d^4)$ to $O(d^5)$ arithmetic
operations for dense Gaussian data — tractable for hundreds of variables, challenging for thousands.

## Historical Context

GES was introduced as part of Chickering's proof of the Meek Conjecture. Earlier work by
Chickering (1995) showed that Markov equivalence $\iff$ same skeleton + same v-structures.
Chickering (1996) proved NP-hardness of the general structure-learning problem.
Together these results established the MEC search space as the right target and GES as the first
provably correct greedy search over it.

The key predecessor: **Greedy DAG search** (GDS) searched over individual DAGs using
score + acyclicity check; it was computationally expensive and had no consistency guarantee.
GES's innovation was moving to **CPDAG space** (the "turning" operators that maintain CPDAG
structure at each step).

## Connections

- **Score-based vs. constraint-based**: GES and PC target the same object (the CPDAG) but use
  different evidence. See [[Constraint-Based Causal Discovery]] for the CI-test paradigm.
- **NOTEARS comparison**: score-based, but continuous; see [[NOTEARS - Overview]]. NOTEARS beat
  GES in NOTEARS's experiments, especially on dense graphs; see [[NOTEARS Experiments]].
- **Extensions**: FGES (Fast GES, Ramsey et al. 2017) uses edge-score caching to scale GES to
  thousands of nodes — this is the "FGS" baseline NOTEARS compared against. SP (Solus et al.)
  and BOSS (Bryan et al. 2023) are more recent score-based methods inspired by GES.

## See Also
- [[GES Algorithm - Forward and Backward Phases]] — detailed description of Insert and Delete operators
- [[Markov Equivalence Classes and CPDAGs]] — the search space GES operates in
- [[DAG Structure Learning Problem]] — where GES fits in the landscape
- [[PC Algorithm]] — the constraint-based alternative
- [[NOTEARS - Overview]] — the continuous-optimization alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
