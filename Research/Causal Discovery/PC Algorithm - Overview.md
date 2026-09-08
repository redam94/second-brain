---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/textbook
source: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, 2nd Ed., MIT Press (https://mitpress.mit.edu/9780262194402/)"
source_location: "Ch. 5–6 (PC algorithm, soundness, completeness)"
date_ingested: 2026-09-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Skeleton Discovery]]"
  - "[[PC Algorithm - Orientation Rules]]"
  - "[[GES - Overview]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes, Glymour & Scheines 1991/2000) is the
> canonical **constraint-based** causal structure learning algorithm. It recovers
> the Markov equivalence class of the true DAG in two phases: (1) a **skeleton
> discovery** phase that identifies adjacencies by repeatedly testing for conditional
> independence, and (2) an **orientation** phase that directs edges using v-structure
> detection and Meek's propagation rules. Under the Markov, faithfulness, and causal
> sufficiency assumptions, PC is **sound** (only outputs true CI implications) and
> **asymptotically complete** (recovers the true CPDAG in large samples).

## Overview

Causal structure learning from observational data can target at most the
**Markov equivalence class** of the true DAG — represented as a CPDAG — because
observationally indistinguishable DAGs encode exactly the same CI relations
(see [[Equivalence Classes and CPDAGs]]). The PC algorithm is the foundational
*constraint-based* approach to this problem: rather than scoring DAGs by fit to
data (as [[GES - Overview|GES]] does), PC reads structure directly from the pattern
of conditional independencies in the data, one CI test at a time.

The algorithm was introduced by Spirtes and Glymour in 1991 and is the core
algorithm of the landmark monograph *Causation, Prediction, and Search* (Spirtes,
Glymour & Scheines, 2000). Implementations exist in:
- **pcalg** (R): `pc()` — the standard research implementation
- **causal-learn** (Python): `pc()` — modern Python port
- **bnlearn** (R): constraint-based learners including PC variants

### Two-Phase Design

```
Input:  Data matrix X ∈ ℝ^{n×p}, significance level α
Output: CPDAG Ê representing the Markov equivalence class of the true DAG

Phase 1 — Skeleton Discovery:
  Start with complete undirected graph K_p
  For each pair (i,j), find minimal separating set S or confirm adjacency
  Output: undirected skeleton Ĝ + sepsets {sepset(i,j)}

Phase 2 — Orientation:
  Step 2a: Orient v-structures (unshielded colliders)
  Step 2b: Apply Meek rules to propagate orientations
  Output: CPDAG Ê
```

### Assumptions

The PC algorithm's correctness guarantees rest on three assumptions:

| Assumption | Content | When violated |
|-----------|---------|---------------|
| **Causal Markov** | The true DAG $G$ and distribution $P$ satisfy the Markov condition: each variable is independent of its non-descendants given its parents. | Model misspecification; feedback loops |
| **Faithfulness** | Every CI in $P$ is entailed by $G$; no CI holds "accidentally" due to parameter cancellation. | Near-exact cancellation in structured models; violated in measure-zero set |
| **Causal sufficiency** | No unmeasured common causes of observed variables. | Unobserved confounders — FCI algorithm handles this case |

Under these three assumptions, PC is **sound and asymptotically complete**: with
oracle CI tests and $n \to \infty$, PC returns exactly the true CPDAG.

## Main Content

### Theoretical Guarantees

> [!theorem] Theorem (Spirtes et al. 2000, Meek 1995): Soundness and Completeness of PC
> Let $(G, P)$ satisfy the Causal Markov condition, faithfulness, and causal
> sufficiency. With oracle conditional independence tests:
> 1. (**Soundness**) Every CI output by Phase 1 is a true CI in $P$.
> 2. (**Skeleton completeness**) Phase 1 recovers the true skeleton of $G$.
> 3. (**Orientation completeness**) Phase 2 recovers the true CPDAG of $G$, i.e.,
>    all compelled edge orientations are correctly identified.
^thm-pc-correctness

With finite samples, correctness holds "with probability approaching 1" as
$n \to \infty$ at fixed significance level $\alpha$, when using a consistent CI test.

### Computational Complexity

The number of CI tests is at most $\binom{p}{2} \cdot 2^{p-2}$ (exponential in $p$) in
the worst case (dense graphs). In practice, with the adjacency restriction that
only neighbours of $i$ and $j$ are tested as conditioning sets, the count is:

$$\text{tests} = O\!\left(p^{q+2}\right), \quad q = \max_{i} |\text{Adj}(i)|$$

For sparse graphs ($q \ll p$), this is polynomial in $p$.

### Key Variants

| Variant | Modification | Reference |
|---------|-------------|-----------|
| PC-stable | Adjacency phase is **order-independent**: all CI tests at conditioning-set size $k$ complete before removing edges | Colombo & Maathuis (2014) |
| Conservative PC (CPC) | Conservative orientation: only orient v-structure if *all* conditioning sets agree on collider/non-collider | Ramsey et al. (2006) |
| FCI | Relaxes causal sufficiency: allows hidden confounders; outputs PAG instead of CPDAG | Spirtes et al. (2000) |
| RFCI | Restricted FCI: faster, slightly weaker guarantees | Colombo et al. (2012) |
| PCMCI | Adapts PC to time series with lagged causal structure | Runge et al. (2019) |

The original PC algorithm is order-dependent: the skeleton found can vary with
the ordering of variable pairs in Phase 1. **PC-stable** is the recommended version
for reproducible research.

### Connection to GES

PC and GES are the two canonical algorithms for structure learning under faithfulness:

| Dimension | PC (constraint-based) | GES (score-based) |
|-----------|----------------------|-------------------|
| **Approach** | Test CIs one at a time | Greedily maximize a score |
| **CI tests needed?** | Yes (explicit) | No (implicit via score) |
| **Output** | CPDAG | CPDAG |
| **Sample efficiency** | Lower (many separate tests) | Higher (global score) |
| **Consistency** | Yes (with consistent CI test) | Yes (with consistent score) |
| **Finite-sample** | Sensitive to $\alpha$ and test choice | Score-dependent |
| **Implementation** | `pcalg::pc`, `causal-learn` | `pcalg::ges`, `causal-learn` |

## Connections

- **[[PC Algorithm - Skeleton Discovery]]** — Phase 1 in detail: the adjacency search,
  growing conditioning sets, separating set storage.
- **[[PC Algorithm - Orientation Rules]]** — Phase 2 in detail: v-structure detection via
  sepsets, Meek's four rules, when orientations propagate.
- **[[Equivalence Classes and CPDAGs]]** — The target of PC: the Markov equivalence class
  and its CPDAG representation.
- **[[GES - Overview]]** — The score-based alternative; both output CPDAGs but via
  fundamentally different mechanisms.
- **[[NOTEARS - Overview]]** — The continuous-optimization alternative; returns a DAG
  (not CPDAG) and does not require CI tests.
- **[[Directed Acyclic Graphs]]** — DAG semantics, d-separation, Markov condition.
- **[[BN Construction Methods Comparison]]** — How PC fits within the broader landscape
  of Bayesian network structure learning (constraint-based vs. score-based vs. hybrid).

## See Also
- [[PC Algorithm - Skeleton Discovery]] — Phase 1: CI testing and adjacency identification
- [[PC Algorithm - Orientation Rules]] — Phase 2: v-structures and Meek rules
- [[GES - Overview]] — Score-based complement to PC
- [[Equivalence Classes and CPDAGs]] — Mathematical framework for both algorithms
- [[DAG Structure Learning Problem]] — The formal optimization problem PC solves
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
