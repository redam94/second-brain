---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02b-GES-source.md]]"
source_location: "Full paper: §1 Introduction, §3 Operators, §4–5 GES phases, §6 Optimality"
date_ingested: 2026-09-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Chickering 2002"
  - "Greedy Equivalence Search"
  - "score-based structure learning"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering, 2002) is a score-based algorithm for DAG structure learning that
> searches greedily over **Markov equivalence classes** (CPDAGs) rather than over individual
> DAGs. It operates in three phases: forward (add edges), backward (remove edges), and turning
> (covered edge reversals). Under the Markov condition, faithfulness, and a *decomposable*
> score (such as BIC), GES is **consistent**: it returns the true CPDAG in the large-sample
> limit. GES is the score-based counterpart to the constraint-based PC algorithm and is the
> standard baseline in structure-learning benchmarks.

## Overview

Score-based structure learning seeks the DAG $\mathcal{G}$ maximising a score $S(\mathcal{G}; \mathcal{D})$
such as BIC or BDe. Naively, this requires searching over the super-exponential space of
DAGs. GES addresses this by:

1. **Score equivalence**: because BIC/BDe assign equal scores to all DAGs in the same MEC
   (provable under Gaussianity or for BDe), the search can be performed over CPDAGs (MECs)
   rather than DAGs. The number of MECs grows much more slowly than the number of DAGs.

2. **Greedy search with local operators**: GES defines two graph-edit operators on CPDAGs
   (insert/delete edge in a CPDAG) and a turning operator (reverse a covered edge). Each
   step applies the highest-scoring operator.

3. **Optimality guarantee (Meek Conjecture / Chickering's proof)**: Chickering (2002) proves
   that if the true CPDAG is reachable from any starting point via greedy forward insertion,
   then the backward phase can always recover it. This guarantees consistency.

## Main Content

### Score Functions

GES requires a **decomposable, score-equivalent** score function.

> [!definition] Decomposable Score
> A score $S(\mathcal{G}; \mathcal{D})$ is **decomposable** if it can be written as a sum
> over nodes, each term depending only on the node and its parents:
> $$S(\mathcal{G}; \mathcal{D}) = \sum_{i=1}^d s(X_i, \mathrm{Pa}_{\mathcal{G}}(X_i); \mathcal{D})$$
> This allows *local* score updates: when an edge is added/removed, only the scores of
> the affected nodes need recomputation — not the whole graph.
^def-decomposable-score

> [!definition] Score Equivalence
> A score is **score-equivalent** if it assigns the same score to all DAGs in the same MEC:
> $S(\mathcal{G}_1; \mathcal{D}) = S(\mathcal{G}_2; \mathcal{D})$ whenever $\mathcal{G}_1$
> and $\mathcal{G}_2$ are Markov equivalent.
>
> **BIC score for Gaussian linear SEMs:**
> $$\mathrm{BIC}(\mathcal{G}; \mathcal{D}) = \log P(\mathcal{D} \mid \hat{\theta}_{\mathcal{G}}) - \frac{|\hat{\theta}_{\mathcal{G}}|}{2}\log n$$
> where $|\hat{\theta}_{\mathcal{G}}|$ is the number of free parameters. BIC is both
> decomposable and score-equivalent for Gaussian data.
>
> **BDe score** (Heckerman et al., 1995): Bayesian Dirichlet equivalent score for discrete
> data; also score-equivalent.
^def-score-equivalence

### GES Operators on CPDAGs

GES uses three operators to traverse the space of CPDAGs.

> [!definition] Insert Operator (Forward phase)
> $\mathrm{Insert}(X, Y, \mathbf{T})$: adds edge $X \to Y$ to the CPDAG (where $\mathbf{T}$
> is a subset of the undirected neighbors of $Y$ not adjacent to $X$). The operator is
> *valid* if the resulting PDAG is a valid CPDAG (no new v-structures or cycles created).
> The score change is:
> $$\Delta S_{\mathrm{Ins}} = s(Y, \mathrm{Pa}(Y) \cup \{X\} \cup \mathbf{T}) - s(Y, \mathrm{Pa}(Y) \cup \mathbf{T})$$
^def-insert-operator

> [!definition] Delete Operator (Backward phase)
> $\mathrm{Delete}(X, Y, \mathbf{H})$: removes edge $X - Y$ (directed or undirected) from
> the CPDAG (where $\mathbf{H}$ is a subset of undirected neighbors of $Y$ adjacent to $X$).
> Score change:
> $$\Delta S_{\mathrm{Del}} = s(Y, \mathrm{Pa}(Y) \setminus (\{X\} \cup \mathbf{H})) - s(Y, \mathrm{Pa}(Y))$$
^def-delete-operator

> [!definition] Turn Operator (Turning phase)
> $\mathrm{Turn}(X, Y, \mathbf{C})$: reverses a *covered* edge $X \to Y$ (one where
> $\mathrm{Pa}(X) \cup \{X\} = \mathrm{Pa}(Y)$). Score-equivalent for covered reversals
> by construction — the turning phase was introduced in later work (Hauser & Bühlmann, 2012)
> to ensure GES reaches all CPDAGs from any starting point.
^def-turn-operator

### The Three Phases of GES

> [!definition] GES Algorithm (Chickering, 2002; extended by Hauser & Bühlmann, 2012)
>
> **Initialise:** Start from the empty CPDAG (no edges).
>
> **Phase 1 — Forward Equivalence Search (FES):**
> Repeatedly apply the insert operator with the highest positive score improvement
> $\Delta S_{\mathrm{Ins}} > 0$, updating the CPDAG after each step. Stop when no valid
> insert operator improves the score.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> From the output of FES, repeatedly apply the delete operator with the highest positive
> score improvement $\Delta S_{\mathrm{Del}} > 0$. Stop when no valid delete operator
> improves the score.
>
> **Phase 3 — Turning (optional, Hauser & Bühlmann 2012):**
> Repeatedly apply covered edge reversals that improve the score. Stop when no improvement.
>
> **Output:** CPDAG $\hat{\mathcal{C}}$.
^alg-ges

**Why three phases?** FES alone could over-connect the graph (adding spurious edges that
cancel in the score). BES prunes these. The turning phase is necessary for completeness
in finite samples — Chickering's original two-phase GES is optimal asymptotically but can
miss CPDAGs that require a covered reversal to reach in finite samples.

### Optimality (The Meek Conjecture)

The key result that makes GES work is Chickering's (2002) proof of the Meek Conjecture:

> [!theorem] Meek Conjecture (Chickering, 2002, Theorem 15)
> Let $\mathcal{G}$ and $\mathcal{H}$ be DAGs such that $\mathcal{H}$ is an independence
> map of $\mathcal{G}$ (i.e., $\mathcal{G}$'s d-separation statements are a subset of
> $\mathcal{H}$'s). Then there exists a finite sequence of:
> - edge additions ($+$ edge), and
> - covered edge reversals ($\circlearrowleft$ covered)
>
> that transforms $\mathcal{G}$ into $\mathcal{H}$ while maintaining $\mathcal{H}$ as an
> independence map of the intermediate graph at each step.
>
> **Consequence:** Starting from the empty graph (which is an independence map of every DAG),
> the Forward Equivalence Search can always reach a perfect independence map of the true
> distribution. The Backward phase then removes superfluous edges to reach a minimal one —
> the true CPDAG.
^thm-meek-conjecture

> [!theorem] Consistency of GES (Chickering, 2002, Thm. 18)
> Under i.i.d. data, the Markov condition, faithfulness, and a decomposable, consistent
> score (e.g., BIC with $\lambda_n \to \infty$, $\lambda_n/n \to 0$), GES returns the
> true CPDAG with probability tending to 1 as $n \to \infty$.
^thm-ges-consistency

### Score-Equivalence and Why GES Works Over CPDAGs

BIC is score-equivalent: all DAGs $\mathcal{G}$ in the same MEC have the same BIC score.
This means:
- The greedy search over CPDAGs is equivalent to a greedy search over DAGs with score
  equivalence — we don't need to choose *which* DAG in the class to evaluate.
- The insert/delete operators can be computed efficiently by working with the CPDAG structure
  directly (no need to expand to individual DAGs).

This property fails for non-score-equivalent scores (e.g., MDL with asymmetric penalty),
which would require searching over DAGs rather than CPDAGs.

### Comparison to PC Algorithm

| Aspect | GES | PC / PC-stable |
|--------|-----|---------------|
| Core mechanism | Score optimization (BIC/BDe) | CI hypothesis tests |
| Search space | CPDAGs (MECs) | CPDAGs via edge removal |
| Consistency | Yes | Yes |
| Finite-sample behaviour | Score stability; robust to single test | Error accumulation across many CI tests |
| Dense graphs | Better (fewer phases, global objective) | Poor (exponentially many large CI tests) |
| Sparse graphs | Good | Very good (few tests needed) |
| Assumptions | Faithfulness + Markov + decomposable score | Faithfulness + Markov + causal sufficiency |
| Latent variables | No (use GFCI) | No (use FCI) |
| Software | `pcalg::ges()` (R), `causal-learn` GES (Python) | `pcalg::pc()`, `causal-learn` PC (Python) |

### Benchmarks (NOTEARS Experiments)

In Zheng et al. (2018), GES (referred to as "FGS", the fast version in the Tetrad software)
is the primary baseline against which NOTEARS is compared. NOTEARS matches or beats GES on
SHD (Structural Hamming Distance) and FDR for dense graphs and large $d$, while GES retains
advantages for sparse graphs at moderate $d$. See [[NOTEARS Experiments]] for details.

## Connections

- [[Markov Equivalence Classes and CPDAGs]] — GES searches the space of CPDAGs; Meek Conjecture is proved here
- [[DAG Structure Learning Problem]] — GES is one of the canonical methods in the prior-methods landscape table
- [[NOTEARS Experiments]] — GES (as FGS) is the primary baseline in the NOTEARS benchmark
- [[PC Algorithm]] — the constraint-based counterpart to GES; both output CPDAGs
- [[Constraint-Based Causal Discovery]] — contrast: CI tests vs. score optimization
- [[BN Construction Methods Comparison]] — broader context of Bayesian network construction methods

## See Also
- [[PC Algorithm]] — the constraint-based alternative to GES
- [[Markov Equivalence Classes and CPDAGs]] — MEC theory underlying GES operators
- [[NOTEARS - Overview]] — the continuous optimization alternative on the same benchmarks
- [[LLM Expert Elicitation for Bayesian Networks]] — expert elicitation as an alternative to data-driven learning
