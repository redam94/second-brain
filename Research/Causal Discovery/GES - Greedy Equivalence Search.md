---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "§4 — GES algorithm, Meek conjecture, correctness, comparison to PC"
date_ingested: 2026-07-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Causal Structure Learning - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based structure learning"
  - "Meek conjecture"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering, 2002) is the canonical **score-based**
> causal structure learning algorithm. Unlike [[PC Algorithm]] (which removes edges via CI tests),
> GES searches directly in the space of **CPDAGs** (Markov equivalence classes), greedily
> adding and then removing edges to maximize a decomposable score (e.g., BIC). Chickering's
> proof of the **Meek Conjecture** establishes that GES finds the true CPDAG in the
> large-sample limit under faithfulness. Compared to PC, GES is more computationally
> demanding but avoids multiple CI-testing accumulation and naturally handles score-based
> model selection.

## Overview

GES operates on the space of Markov equivalence classes (CPDAGs) rather than individual DAGs.
This is conceptually clean: if we cannot distinguish Markov-equivalent DAGs from data alone,
why search over individual DAGs? The GES search space has order-of-magnitude fewer elements
than the DAG space, and the score of a CPDAG is well-defined as the maximum BIC score of
any DAG in the class.

The algorithm has two phases: a **forward** phase that greedily inserts edges until score
cannot be improved, then a **backward** phase that greedily removes edges. The Meek Conjecture
(proved by Chickering, 2002) guarantees this two-phase greedy search finds the global optimum
under faithfulness and a consistent score.

GES appears as a baseline in [[NOTEARS Experiments]], where it is labeled "FGS" (Fast GES,
an optimized implementation from the Tetrad package).

## Main Content

### Score Function

> [!definition] Decomposable Score
> GES requires a **decomposable** (locally scored) criterion:
> $$S(G) = \sum_{i=1}^{d} s(X_i, Pa_G(X_i))$$
> where each local score $s(X_i, Pa_G(X_i))$ depends only on the variable and its parents.
> Decomposability makes computing $\Delta S$ for a local CPDAG move efficient (only recompute
> affected nodes).
>
> Common choices:
>
> | Score | Data type | Formula |
> |-------|-----------|---------|
> | **BIC** | Gaussian | $\ell(\hat\theta; X_i, Pa) - \frac{k}{2}\ln n$ |
> | **BDeu** | Discrete | Bayesian Dirichlet marginal likelihood with uniform equivalent sample size |
> | **BGe** | Gaussian | Bayesian Gaussian equivalent, conjugate marginal likelihood |

The BIC score is **consistent**: the correct CPDAG achieves the highest BIC asymptotically.

### The CPDAG Insert and Delete Operators

Chickering (2002) defines valid CPDAG operators — moves that transform one CPDAG into another
without producing an invalid PDAG:

> [!definition] Insert and Delete Operators
>
> **Insert$(X, Y, \mathbf{H})$:** Add an edge between $X$ and $Y$ (directed $X \to Y$ or
> undirected $X - Y$, determined by the CPDAG rules), where $\mathbf{H} \subseteq \text{adj}(Y) \setminus \{X\}$
> specifies a set of neighbours of $Y$ whose edges to $Y$ are oriented toward $Y$ by the move.
>
> **Delete$(X, Y, \mathbf{H})$:** Remove edge between $X$ and $Y$, where
> $\mathbf{H} \subseteq \text{adj}(X) \cap \text{adj}(Y)$ specifies a subset of common neighbours
> to undirect.
>
> Both operators are guaranteed to produce valid CPDAGs (no new v-structures, no directed cycles).
> Their score changes $\Delta S$ can be computed locally in $O(p)$ time each.

### Algorithm

> [!definition] GES Algorithm (Chickering, 2002)
>
> **Input:** Variables $\mathbf{V}$; decomposable score $S$.
> **Output:** CPDAG.
>
> **Initialise:** $\mathcal{C} \leftarrow$ empty CPDAG (no edges, score = sum of marginal scores).
>
> **Phase 1 — Forward (Insert) phase:**
> $$\text{Repeat until no improvement:}$$
> $$\text{Find } (X, Y, \mathbf{H}) \text{ with } \Delta S = S(\text{Insert}(X,Y,\mathbf{H})(\mathcal{C})) - S(\mathcal{C}) > 0, \text{ maximising } \Delta S$$
> $$\mathcal{C} \leftarrow \text{Insert}(X, Y, \mathbf{H})(\mathcal{C})$$
>
> **Phase 2 — Backward (Delete) phase:**
> $$\text{Repeat until no improvement:}$$
> $$\text{Find } (X, Y, \mathbf{H}) \text{ with } \Delta S = S(\text{Delete}(X,Y,\mathbf{H})(\mathcal{C})) - S(\mathcal{C}) > 0, \text{ maximising } \Delta S$$
> $$\mathcal{C} \leftarrow \text{Delete}(X, Y, \mathbf{H})(\mathcal{C})$$
>
> **Why two phases?** The forward phase may add edges to improve score by fitting variance, even
> at the cost of an incorrect orientation. The backward phase corrects over-fitting by removing
> redundant edges — the Meek Conjecture guarantees this correction is achievable greedily.

^ges-algorithm

### The Meek Conjecture and Correctness

The theoretical foundation of GES is Chickering's proof of the **Meek Conjecture**:

> [!theorem] Meek Conjecture (proved by Chickering, 2002)
> If DAG $H$ is an **independence map (I-map)** of DAG $G$ — every independence in $H$ holds
> in $G$ — then there exists a finite sequence of **covered edge reversals** and **edge additions**
> transforming $H$ into a perfect map of $G$.
>
> A **covered edge reversal** reverses $X \to Y$ when $Pa(X) = Pa(Y) \setminus \{X\}$ (the
> parents of $X$ and $Y$ minus $X$ are the same). Covered reversals do not change the
> Markov equivalence class — they are "free" moves within the class.
>
> **Significance:** This implies GES's forward phase can always reach the true I-map by a
> sequence of Insert moves (each improving the score), and the backward phase can always
> reach the true perfect map from the I-map.

^meek-conjecture

> [!theorem] GES Consistency (Chickering, 2002)
> Under:
> 1. Causal Markov condition
> 2. Faithfulness
> 3. A consistent decomposable score (e.g., BIC)
> 4. Perfect data (or $n \to \infty$)
>
> GES returns the **CPDAG of the true data-generating DAG**.
>
> **Proof sketch:**
> - Forward phase: the empty graph is always an I-map of $G$. Meek Conjecture guarantees a
>   sequence of Insert moves reaches $G$'s CPDAG. BIC consistency ensures each step towards
>   the true CPDAG improves the score in expectation.
> - Backward phase: Meek Conjecture guarantees Delete moves refine to the true CPDAG without
>   removing true edges (score decreases for incorrect deletions asymptotically).

### Comparison to PC Algorithm

> [!definition] PC vs GES: Core Tradeoffs
>
> | Property | PC | GES |
> |----------|----|-----|
> | Paradigm | Constraint-based (CI tests) | Score-based (BIC) |
> | Search space | Skeleton, then CPDAG | CPDAG directly |
> | Statistical tool | Partial correlations / G² | BIC or BDeu |
> | Finite-sample errors | Multiple testing accumulation | Score overfitting (forward phase) |
> | Handle missing data | Listwise deletion (default) | Via score modification |
> | Latent variables | FCI variant | No direct extension |
> | Computational cost | $O(p^{q+2} \cdot n)$ CI tests | $O(p^2)$ Insert/Delete evaluations per step |
> | High-dimensional | Yes (KB 2007, Gaussian) | Harder (large local score tables) |
>
> **Rule of thumb:** Use PC when interpretable CI tests are desired and when $p \gg n$
> (with the high-dimensional extension). Use GES when a clean Bayesian score is preferred,
> the graph is moderate in size, and multiple testing accumulation is a concern.

### Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg::ges()` | R | Reference implementation; also PC, FCI |
| `causal-learn` | Python | `py-ges`; also PC, NOTEARS, LiNGAM |
| `gCastle` | Python | Huawei; GES + many others |
| Tetrad (FGS) | Java | Fast GES; used in [[NOTEARS Experiments]] as baseline |

## Examples

> [!example] GES Forward Phase on a 3-Variable Example
> Variables: $\{X, Y, Z\}$, true DAG: $X \to Z \leftarrow Y$.
>
> **Initialise:** Empty CPDAG; score = sum of marginal BICs.
>
> **Forward phase, step 1:** Evaluate all Insert moves. The Insert$(X, Z, \emptyset)$ move
> (add edge $X - Z$) increases the score most (since $X$ and $Z$ are dependent). Apply it.
>
> **Forward phase, step 2:** Insert$(Y, Z, \emptyset)$ (add $Y - Z$) increases score. Apply.
>
> **Forward phase, step 3:** Insert$(X, Y, \emptyset)$ (add $X - Y$) does NOT improve score
> (since $X \perp\!\!\!\perp Y$ in the true distribution; BIC penalises the extra parameter).
> Phase 1 ends.
>
> **CPDAG after Phase 1:** $X - Z - Y$ (skeleton identified; v-structure not yet oriented
> in all forward-phase implementations; depends on the exact CPDAG operator logic).
>
> **Backward phase:** Evaluate Delete moves. No edge deletion improves score (both $X-Z$
> and $Y-Z$ are true edges).
>
> **Output:** CPDAG consistent with $X \to Z \leftarrow Y$ (the v-structure is the only
> valid orientation given skeleton $X-Z-Y$ with $X, Y$ non-adjacent).

## Connections

- [[PC Algorithm]]: constraint-based alternative; GES and PC are the two classical
  approaches. [[NOTEARS - Overview]] introduces the continuous-optimization alternative.
- [[Markov Equivalence and CPDAGs]]: GES operates on the CPDAG space; the Insert/Delete
  operators are valid CPDAG transformations.
- [[DAG Structure Learning Problem]]: the score functions (BIC, BDeu) used by GES correspond
  to the LS score ($F(W)$ in NOTEARS notation) but with appropriate penalization for discrete
  vs continuous data.
- [[NOTEARS Experiments]]: GES (as "FGS") is the primary baseline in the NOTEARS benchmark;
  NOTEARS matches or beats FGS on dense/large synthetic graphs.
- [[BN Construction Methods Comparison]]: GES is the score-based BN learning strategy;
  contrasted with constraint-based (PC) and expert elicitation.

## See Also
- [[PC Algorithm]] — constraint-based alternative; same CPDAG target
- [[Markov Equivalence and CPDAGs]] — CPDAG space that GES searches
- [[NOTEARS - Overview]] — continuous-optimization alternative; GES is a key baseline
- [[Causal Structure Learning - Overview]] — paradigm map
- [[DAG Structure Learning Problem]] — score functions and NP-hardness
- [[BN Construction Methods Comparison]] — GES in the broader BN learning landscape
- [[Causal Discovery/_Index|Causal Discovery Index]]
