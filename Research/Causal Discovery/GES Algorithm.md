---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002), JMLR 3:507–554 — PDF unavailable (network policy blocked jmlr.org)"
source_location: "Chickering (2002) JMLR 3:507–554, §§3–5 (forward/backward phases, consistency proof)"
date_ingested: 2026-09-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Paradigm Overview]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
  - "FGES"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based** algorithm
> for learning DAG structure. Instead of searching over individual DAGs, GES searches over
> **Markov equivalence classes** (CPDAGs) directly. A forward phase greedily adds edges that
> increase the score; a backward phase removes edges that further increase it. Under faithfulness
> and for consistent decomposable scores, GES is guaranteed to return the true CPDAG as
> $n \to \infty$. This is the result that proved the "Meek Conjecture" and showed greedy
> equivalence-class search can achieve global optimality.

## Overview

The key insight of GES is that **decomposable scores** (BIC, BDe) assign the same value to all
DAGs in a Markov equivalence class. Therefore there is no reason to distinguish between equivalent
DAGs — the correct search space is the space of **CPDAGs**, which is smaller and better structured
than the space of all DAGs.

GES navigates this space with **two greedy phases** that add and then remove edges. Chickering
(2002) proved that:
1. This two-phase strategy reaches the true equivalence class under faithfulness.
2. The forward phase corresponds to proving the **Meek Conjecture** — that every pair of
   adjacent CPDAGs in the search space is connected by a single "covered edge reversal."

GES is the strongest classical baseline for structure learning and is a primary comparison in
[[NOTEARS Experiments]] (reported as FGS, the fast GES implementation by Ramsey et al. 2016).

## Main Content

### Decomposable scores and their equivalence-class property

> [!definition] Definition: Decomposable Score (Chickering 2002, §3)
> A score function $Q(\mathcal{G}, \mathbf{X})$ is **decomposable** if it factors over the nodes
> as a sum of local scores:
> $$Q(\mathcal{G}, \mathbf{X}) = \sum_{i=1}^{p} q\!\left(X_i,\, \mathrm{Pa}_{\mathcal{G}}(X_i),\, \mathbf{X}\right),$$
> where each local score depends only on node $X_i$ and its parents in $\mathcal{G}$.
> All Markov-equivalent DAGs have the same **parent sets** for some topological ordering,
> so decomposable scores are constant on equivalence classes.
^def-decomposable

> [!definition] Definition: BIC Score (Schwarz 1978; Haughton 1988)
> The **Bayesian Information Criterion** score for a Gaussian DAG:
> $$\mathrm{BIC}(\mathcal{G}, \mathbf{X}) = \log P(\mathbf{X} \mid \mathcal{G},\hat\theta_{\mathcal{G}})
> - \frac{|\mathcal{G}|}{2}\log n,$$
> where $|\mathcal{G}|$ is the number of free parameters (edges) and $\hat\theta_{\mathcal{G}}$
> is the MLE. For linear Gaussian SEMs, the local score for node $X_i$ given parents $\mathbf{Pa}$
> is proportional to $-\frac{n}{2}\log\hat\sigma^2_{i|\mathbf{Pa}} - \frac{|\mathbf{Pa}|+1}{2}\log n$,
> where $\hat\sigma^2$ is the residual variance.
> BIC penalizes complexity: fewer edges (sparser DAGs) are preferred unless the data strongly
> supports additional structure.
^def-bic

### Covered edge reversals and the search space

> [!definition] Definition: Covered Edge (Chickering 2002, §2)
> An edge $X \to Y$ in a DAG $\mathcal{G}$ is **covered** if
> $\mathrm{Pa}_{\mathcal{G}}(Y) = \mathrm{Pa}_{\mathcal{G}}(X) \cup \{X\}$.
> That is, $Y$'s parents are exactly $X$'s parents plus $X$ itself.
^def-covered-edge

> [!theorem] Meek Conjecture (Chickering 2002, Theorem 15)
> Any two **adjacent** equivalence classes in the search space (CPDAGs that differ by a single
> edge) can be connected by a **single covered edge reversal**. Equivalently, the equivalence-class
> search space has a **lattice structure** where each step adds one covered edge reversal.
>
> **Significance.** This is the key structural result that makes GES's greedy search over
> equivalence classes provably correct. Without it, greedy steps might miss globally better classes.
^thm-meek-conjecture

### The GES algorithm

> [!definition] Algorithm: GES (Chickering 2002, Algorithm 1)
> **Input:** $n$ observations of $\mathbf{X} = (X_1,\dots,X_p)$; decomposable score $Q$.
>
> **Phase 1 — Forward (Insert) Phase:**
> 1. Start with the empty CPDAG $\mathcal{C}_0$.
> 2. Repeat until no improvement:
>    - Find the **insert operator** (adding a single directed edge to some DAG in the class
>      and converting back to a CPDAG) that maximally increases $Q$.
>    - Apply it: $\mathcal{C} \leftarrow \mathrm{Insert}(X_i \to X_j, \mathcal{C})$.
>
> **Phase 2 — Backward (Delete) Phase:**
> 1. Start with the CPDAG $\mathcal{C}$ from Phase 1.
> 2. Repeat until no improvement:
>    - Find the **delete operator** (removing a single edge) that maximally increases $Q$.
>    - Apply it: $\mathcal{C} \leftarrow \mathrm{Delete}(X_i \to X_j, \mathcal{C})$.
>
> **Output:** CPDAG $\mathcal{C}$.
^def-ges-algorithm

> [!note] Why two phases?
> The forward phase may overfit — adding too many edges because the score always improves
> with more edges in finite samples (overfitting). The backward phase corrects this by pruning
> edges that do not improve the score when removed. Together they implement a **forward-backward
> greedy** search over the CPDAG space.

### Correctness (consistency)

> [!theorem] GES Consistency (Chickering 2002, Theorem 28)
> Under:
> 1. Acyclicity,
> 2. Causal Markov Condition,
> 3. Faithfulness,
> 4. A **consistent** and **decomposable** score (BIC satisfies this for Gaussian models),
>
> the GES algorithm returns the **true CPDAG** of the data-generating DAG $\mathcal{G}^*$
> as $n \to \infty$.
>
> **Proof sketch.** The forward phase's greedy optimality follows from the Meek Conjecture:
> since covered-edge steps connect adjacent classes, no better class is skipped. The backward
> phase removes edges added in excess, recovering the true class.
^thm-ges-consistency

### Computational complexity

- **Insert operator evaluation:** $O(p^2 \cdot 2^q)$ per step for maximum degree $q$.
- **FGS (Fast GES, Ramsey et al. 2016):** Caches local scores and uses priority queues;
  scales to $p \sim 10{,}000$ variables.
- **Comparison to PC:** GES has better finite-sample performance when the score is well-specified
  (Gaussian); PC is more flexible (pluggable CI tests) but order-dependent and often weaker.

## Examples

> [!example] Example: GES on a three-node problem
> **Setup.** True DAG $A \to B \to C$ (also Markov equivalent to $A \leftarrow B \leftarrow C$
> and $A \leftarrow B \to C$). BIC score. $n = 500$ Gaussian observations.
>
> **Phase 1 (forward).**
> - Empty CPDAG. Best insert: add $A - B$ (large BIC gain due to $A$-$B$ correlation). CPDAG: $A - B$.
> - Next best: add $B - C$. CPDAG: $A - B - C$.
> - No further insertions increase BIC. End of forward phase.
>
> **Phase 2 (backward).**
> - Try removing $A - B$: BIC decreases (edge is real). Keep.
> - Try removing $B - C$: BIC decreases. Keep.
> - End of backward phase. CPDAG: $A - B - C$ (undirected path — true equivalence class).
>
> **Interpretation.** GES correctly identifies the Markov equivalence class: all three edges in
> the chain $A-B-C$ with no v-structures are undirected in the CPDAG, because without a v-structure
> the direction cannot be identified from observational data alone.

## Connections

- **[[PC Algorithm]]**: Constraint-based alternative. PC uses CI tests; GES uses scores.
  GES generally has better finite-sample accuracy under Gaussian assumptions; PC is more
  flexible. Both output CPDAGs.
- **[[NOTEARS - Overview]]** / **[[NOTEARS Experiments]]**: NOTEARS outperforms GES/FGS on
  dense scale-free graphs (high in-degree), where greedy local search degrades; on sparse ER
  graphs the methods are comparable.
- **[[Markov Equivalence Classes and CPDAGs]]**: GES's search space *is* the space of CPDAGs.
  The Meek Conjecture establishes the lattice structure that makes greedy search correct.
- **Exact methods (GOBNILP)**: GES finds the greedy optimum; GOBNILP finds the global optimum.
  Chickering (2002) shows GES attains scores close to global optimality in practice.
- **Score vs. constraint**: GES requires specifying a parametric score; PC works with any CI test.
  For non-Gaussian or nonlinear data, kernel-based CI tests (PC) or LiNGAM-type methods may
  be preferred over BIC-scored GES.

## Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | `ges()` function; reference implementation |
| `causal-learn` | Python | `ges()` with BIC and other scores |
| `tetrad` / `FGES` | Java/R | Fast GES (FGS); scales to thousands of variables |
| `gCastle` | Python | Includes GES alongside NOTEARS, PC |

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG representation GES searches over
- [[DAG Structure Learning Problem]] — problem formulation; GES in the landscape of methods
- [[PC Algorithm]] — constraint-based counterpart
- [[NOTEARS Algorithm]] — continuous optimization alternative
- [[Causal Structure Learning - Paradigm Overview]] — three paradigms compared
- [[NOTEARS Experiments]] — empirical comparison: NOTEARS vs. FGS/GES
