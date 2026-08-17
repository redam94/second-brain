---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-algorithm-source-notes.md]]"
source_location: "Spirtes & Glymour (1991); Spirtes, Glymour & Scheines (2000), CPS 2nd ed., Chs. 5–6"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Constraint-Based Skeleton Learning]]"
  - "[[V-Structures and Meek Orientation Rules]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "SGS algorithm"
  - "constraint-based causal discovery"
  - "Spirtes Glymour Scheines"
  - "CPS algorithm"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000)
> is the foundational **constraint-based** approach to causal structure learning.
> It recovers the skeleton of a DAG from observational data via conditional independence
> (CI) tests, orients v-structures (unshielded colliders), and applies Meek's (1995) rules
> to produce the unique **CPDAG** of the true Markov equivalence class. Under faithfulness,
> the Markov condition, and causal sufficiency, PC is asymptotically correct and runs in
> polynomial time for sparse graphs.

## Overview

**Causal structure learning** is the problem of inferring the DAG of a data-generating
process from observations, without randomised interventions. This is distinct from:
- *Causal reasoning given a known DAG* (back-door criterion, do-calculus — covered in
  [[Directed Acyclic Graphs]]).
- *Structure learning with continuisation optimisation* (NOTEARS — [[NOTEARS - Overview]]).

The PC algorithm belongs to the **constraint-based** paradigm: it uses **conditional
independence (CI) tests** to identify which edges the data is compatible with. The name
"PC" stands for **Peter** (Spirtes) and **Clark** (Glymour), its inventors. The algorithm
is formalised in Chapter 5 of *Causation, Prediction, and Search* (Spirtes, Glymour &
Scheines 2000 — hereafter CPS), which is a landmark text that also introduced the
FCI algorithm (for latent variables), the Markov condition for causal models, and the
faithfulness assumption.

## Main Content

### Three Core Assumptions

> [!definition] Assumptions for PC Correctness (CPS, Ch. 3)
> The PC algorithm is sound and complete under:
>
> 1. **Causal Markov condition**: $P(\mathbf{X})$ is Markov relative to the true DAG $G$.
>    Each variable $X_i$ is conditionally independent of its non-descendants
>    $\mathbf{X}_{ND(i)}$ given its parents $\mathbf{X}_{Pa(i)}$.
>
> 2. **Faithfulness**: Every conditional independence in $P$ arises from a
>    d-separation in $G$ — i.e., there are no "accidental" cancellations among
>    path coefficients.
>
> 3. **Causal sufficiency**: No latent common causes. Every common cause of
>    observed variables is itself observed. (Relaxed by FCI.)
> ^def-pc-assumptions

### What PC Outputs

PC does not identify the true DAG uniquely — it identifies the **Markov equivalence class**:

> [!definition] Output: CPDAG (Completed Partially Directed Acyclic Graph)
> A **CPDAG** (also called an *essential graph* or *pattern*) is the unique
> representative of a Markov equivalence class. In a CPDAG:
> - A **directed** edge $X \to Y$ appears in **every** DAG in the class.
> - An **undirected** edge $X - Y$ means the direction is not determined by
>   observational data: some class members have $X \to Y$, others $X \leftarrow Y$.
> ^def-cpdag

This is an **unavoidable limit** under pure observational data + the three assumptions.
Additional structure (non-Gaussianity, equal error variances, interventional data)
is required to pin down a unique DAG; see [[Markov Equivalence Classes and CPDAGs]].

### Three-Phase Algorithm

PC proceeds in three phases:

| Phase | Input | Operation | Output |
|-------|-------|-----------|--------|
| 1. Skeleton | Complete graph | CI tests at increasing order | Undirected skeleton + separation sets |
| 2. V-structures | Skeleton | Unshielded triple classification | Partially directed PDAG |
| 3. Meek rules | PDAG | R1–R4 orientation propagation | CPDAG |

See [[Constraint-Based Skeleton Learning]] for Phase 1 details and
[[V-Structures and Meek Orientation Rules]] for Phases 2–3.

### Computational Complexity

> [!theorem] Complexity of PC (CPS, Theorem 5.4; Kalisch & Bühlmann 2007)
> Let $q$ be the maximum **adjacency** in the true skeleton (number of edges per node).
> The number of CI tests in the skeleton phase is $O(p^{q+2})$ — **polynomial in $p$
> for fixed sparsity** $q$.
>
> Without the sparsity assumption: the number of CI tests can be $O(2^p)$.
>
> **Consequence**: PC is practical for sparse graphs ($q \ll p$). Kalisch & Bühlmann
> (2007) proved PC is consistent for $p \gg n$ under sparsity, making it applicable to
> high-dimensional settings where NOTEARS cannot be used.
> ^thm-pc-complexity

## Connections

- **Vs. NOTEARS**: PC is constraint-based; [[NOTEARS - Overview]] is score-based and
  optimisation-based. PC handles non-Gaussian data naturally (via non-parametric CI
  tests); NOTEARS assumes a linear SEM. [[Causal Discovery Algorithm Comparison]] contrasts
  all three methods.

- **Vs. GES**: [[GES - Greedy Equivalence Search]] (Chickering 2002) is the score-based
  analogue that searches CPDAG space directly. GES typically outperforms PC statistically
  (more efficient use of data) but requires a score function, while PC only needs a CI test.

- **Extends to latent variables**: the **FCI algorithm** (also in CPS) relaxes causal
  sufficiency. It outputs a **PAG** (Partial Ancestral Graph), a more expressive structure
  that can represent the possibility of latent confounders.

- **Vs. causal reasoning**: PC *learns* the DAG structure; [[Directed Acyclic Graphs]]
  covers *reasoning* with a known DAG (d-separation, back-door criterion, do-calculus).

- **Vault connection**: the NOTEARS notes refer to PC as a "constraint-based" baseline
  in [[NOTEARS Experiments]] — PC is one of the algorithms NOTEARS outperforms on dense
  graphs.

## See Also
- [[Constraint-Based Skeleton Learning]] — Phase 1 in detail (CI tests, order $\ell$ search)
- [[V-Structures and Meek Orientation Rules]] — Phases 2–3 (v-structures, R1–R4)
- [[Markov Equivalence Classes and CPDAGs]] — the equivalence theory underpinning PC output
- [[GES - Greedy Equivalence Search]] — the score-based counterpart
- [[Causal Discovery Algorithm Comparison]] — PC vs. GES vs. NOTEARS
- [[DAG Structure Learning Problem]] — the NP-hardness context and score-based framing
- [[NOTEARS - Overview]] — continuous-optimization alternative
