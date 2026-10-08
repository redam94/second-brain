---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/chickering-2002-GES-ref.txt]]"
source_location: "Chickering (2002), JMLR Vol. 3, pp. 507-554"
date_ingested: 2026-10-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Constraint-Based Causal Discovery - Overview]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FGES"
  - "FES"
  - "BES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> algorithm for causal DAG structure learning. Rather than searching over individual DAGs or
> testing conditional independences, GES searches directly over **Markov equivalence classes**
> (CPDAGs), greedily applying local graph operators that maximally increase a decomposable score
> (e.g., BIC). It proceeds in two phases: **FES** (Forward Equivalence Search — add edges)
> followed by **BES** (Backward Equivalence Search — remove edges). Under faithfulness and a
> consistent scoring criterion, GES recovers the true CPDAG in the large-sample limit.

## Overview

GES occupies the second major paradigm in causal discovery: instead of testing CI relationships,
it asks "which equivalence class has the highest score?" The score-based approach has several
advantages: it naturally handles finite-sample noise (the score integrates evidence), it
leverages well-developed model selection theory (BIC consistency), and it avoids the
multiple-testing issues of sequential CI testing.

The key algorithmic insight is that **equivalence classes, not individual DAGs, should be the
search states**. Moving directly between equivalence classes via local operators enables a
greedy search that is both tractable and theoretically grounded.

## Decomposable Scoring Criteria

GES requires a **decomposable** score — one that factors over nodes:

> [!definition] Decomposable Score
> A score $Q(\mathcal{G})$ is **decomposable** if it factors as
> $$Q(\mathcal{G}) = \sum_{i=1}^p s(X_i, \text{Pa}(X_i) \mid \mathbf{X})$$
> where $s(X_i, \text{Pa}(X_i) \mid \mathbf{X})$ depends only on node $X_i$, its parents
> $\text{Pa}(X_i)$, and the data. Decomposability enables **local score computations** — only
> the parent sets of nodes adjacent to a modified edge need recomputation.
^def-decomposable-score

Common choices:
- **BIC** (Bayesian Information Criterion): $s_\text{BIC}(X_i, \text{Pa}) = \log P(\mathbf{X}_i \mid \mathbf{X}_{\text{Pa}}, \hat{\theta}) - \frac{|\text{Pa}|+1}{2}\log n$; consistent under regularity conditions.
- **BDeu** (Bayesian Dirichlet equivalent uniform): Bayesian marginal likelihood with Dirichlet prior; used for discrete variables.
- **BGe** (Bayesian Gaussian equivalent): Bayesian marginal likelihood for Gaussian data.

## The Meek Conjecture (Proved by Chickering)

The theoretical foundation of GES is a key result about score improvability:

> [!theorem] Meek Conjecture (Proved by Chickering, 2002)
> Let $\mathcal{G}$ be any DAG and $\mathcal{H}$ be any DAG that is an **I-map** of $\mathcal{G}$
> (i.e., every d-separation in $\mathcal{H}$ is also a d-separation in $\mathcal{G}$). Then
> there exists a finite sequence of **covered edge reversals** in $\mathcal{G}$ — each step
> keeping $\mathcal{G}$ a DAG — such that $\mathcal{G}$ becomes a subgraph of $\mathcal{H}$.
>
> An edge $X \to Y$ is **covered** if $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$ (i.e.,
> $X$ and $Y$ have the same parents other than $X$ itself). Reversing a covered edge keeps the
> DAG in the same Markov equivalence class.
>
> **Consequence for GES:** Under faithfulness + a consistent score, the true CPDAG has strictly
> higher score than any other equivalence class, and GES can always find a sequence of
> local operators that increase the score until the true class is reached.
^thm-meek-conjecture

This theorem proves that the GES search landscape is "benign" — there are no local maxima in the
equivalence class space (under faithfulness), so a greedy search finds the global optimum
asymptotically.

## Algorithm: Phase 1 — Forward Equivalence Search (FES)

> [!definition] Algorithm: GES Forward Phase (FES)
> **Input:** Data $\mathbf{X}$, decomposable score $Q$.
>
> **Initialize:** Start with the empty CPDAG $\mathcal{C}_0 = \emptyset$ (no edges).
>
> **Repeat:**
> 1. Compute the score gain $\Delta Q(\text{Insert}(X, Y, \mathbf{T}))$ for all valid
>    **Insert operators** — adding edge $X \to Y$ to the current CPDAG.
>    - The **Insert$(X, Y, \mathbf{T})$ operator** adds a directed edge $X \to Y$, where
>      $\mathbf{T} \subseteq \text{Ne}_\mathcal{C}(Y) \cap \text{Ad}_\mathcal{C}(X)$
>      (a subset of neighbors of $Y$ that are also adjacent to $X$) are simultaneously
>      converted from neighbors of $Y$ to parents of $Y$.
>    - Validity condition: the operation must yield a valid CPDAG.
> 2. If $\max \Delta Q > 0$: apply the highest-gain Insert operator; update $\mathcal{C}$.
> 3. Else: stop.
>
> **Output:** CPDAG $\mathcal{C}_\text{FES}$ at the local maximum of the forward phase.
^algo-ges-fes

**Intuition:** FES greedily adds edges (increases model complexity), starting from the empty
graph. Each Insert operator adds one edge to the skeleton and possibly re-orients some existing
edges to maintain a valid CPDAG. FES terminates when no additional edge increases the score —
typically when the model has reached something close to the true skeleton (possibly with extra
edges that the backward phase will prune).

## Algorithm: Phase 2 — Backward Equivalence Search (BES)

> [!definition] Algorithm: GES Backward Phase (BES)
> **Input:** CPDAG $\mathcal{C}_\text{FES}$ from Phase 1, decomposable score $Q$.
>
> **Repeat:**
> 1. Compute the score gain $\Delta Q(\text{Delete}(X, Y, \mathbf{H}))$ for all valid
>    **Delete operators** — removing edge $X - Y$ (or $X \to Y$) from the current CPDAG.
>    - The **Delete$(X, Y, \mathbf{H})$ operator** removes the edge between $X$ and $Y$
>      and re-orients some adjacent edges, where $\mathbf{H} \subseteq \text{Ne}_\mathcal{C}(Y) \cap \text{Ne}_\mathcal{C}(X)$.
>    - Validity condition: the operation must yield a valid CPDAG.
> 2. If $\max \Delta Q > 0$: apply the highest-gain Delete operator; update $\mathcal{C}$.
> 3. Else: stop.
>
> **Output:** Final CPDAG $\hat{\mathcal{C}}$.
^algo-ges-bes

**Intuition:** BES prunes the over-dense CPDAG from FES. It removes edges that hurt the score
(penalized by complexity). Combined with FES, this two-phase strategy — first overshoot by
adding, then prune — avoids the local-minimum traps of single-direction search.

> [!note] Why two phases?
> A single forward search from the empty graph might add an incorrect edge early that "blocks"
> the correct structure. BES can remove it. Conversely, a single backward search from the
> complete graph might prune needed edges early. The two-phase strategy is more robust.

## Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering, 2002)
> Let $P(X_1, \ldots, X_p)$ be a distribution satisfying the **Causal Markov Condition** and
> **Faithfulness** w.r.t. a DAG $\mathcal{G}$ (with causal sufficiency). Suppose $Q$ is a
> **decomposable, consistent** scoring criterion (e.g., BIC for Gaussian data). Then as
> $n \to \infty$, GES returns the **CPDAG of $\mathcal{G}$** with probability $\to 1$.
>
> **The Meek-conjecture proof** provides the key intermediate result: under faithfulness,
> the score landscape over CPDAGs has no spurious local maxima, so the greedy two-phase
> search finds the global maximum.
^thm-ges-consistency

## FGES: Fast GES (Ramsey et al., 2017)

> [!definition] FGES — Fast Greedy Equivalence Search
> **FGES** (Ramsey et al., 2017; *Int. J. Data Science and Analytics*, 3:219-230) is a
> parallelized reimplementation of GES with two key optimizations:
> 1. **Score caching**: Pre-computes and caches local score contributions, avoiding
>    redundant computation when evaluating multiple Insert operators.
> 2. **Parallelism**: Evaluates Insert/Delete candidates for different nodes concurrently.
>
> FGES scales to **millions of variables** on modern multi-core machines — tested on $p = 1\,000\,000$
> with sparse graphs. It is the default structure-learning algorithm in TETRAD (Carnegie Mellon).
^def-fges

## Comparison with PC Algorithm

| Feature | PC | GES |
|---------|-----|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (decomposable score) |
| Input assumptions | Faithfulness + CMC + Sufficiency | Same + consistent score |
| Output | CPDAG | CPDAG |
| Consistency | Yes (large-sample) | Yes (large-sample) |
| Finite-sample behavior | Multiple-testing; sensitive to $\alpha$ | Regularized by score penalty |
| Order-dependence | Yes (PC); fixed by PC-stable | No |
| Computational complexity | $O(p^{2\Delta})$ CI tests ($\Delta$ = degree) | $O(p^2 \cdot \text{score evaluations})$ |
| Distribution-free | Yes (with appropriate CI test) | No (requires parametric score) |
| High-dimensional | PC-stable + FDR control (Kalisch & Bühlmann) | FGES (Ramsey et al., 2017) |

> [!note] Score-based vs. constraint-based in practice
> Both recover the same CPDAG asymptotically. In practice: PC tends to be more direct but
> sensitive to CI test calibration and ordering; GES is more robust to test calibration but
> requires a correct parametric model (e.g., Gaussian for BGe/BIC). On sparse Gaussian data
> with $p \lesssim 100$, performance is comparable. On dense graphs or with non-Gaussian data,
> neither dominates clearly.

## Comparison with NOTEARS

[[NOTEARS - Overview]] outperforms GES in SHD on dense graphs in the NeurIPS 2018 experiments
(see [[NOTEARS Experiments]]). Key differences:
- **NOTEARS** optimizes a continuous objective without explicit equivalence classes; it outputs a
  single DAG (not a CPDAG).
- **GES** is consistent under faithfulness + consistent scoring; NOTEARS's theoretical guarantees
  are weaker (stationary point only, not global optimum).
- **GES** is distribution-free within the score family; NOTEARS assumes a specific SEM form.

## See Also
- [[Markov Equivalence and CPDAGs]] — what GES outputs and why it searches over CPDAGs
- [[Constraint-Based Causal Discovery - Overview]] — the PC paradigm (GES's complement)
- [[PC Algorithm]] — constraint-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[NOTEARS Experiments]] — benchmark comparing GES/FGS, PC, and NOTEARS
- [[DAG Structure Learning Problem]] — landscape of all prior approaches
- [[Causal Discovery/_Index|Causal Discovery Index]]
