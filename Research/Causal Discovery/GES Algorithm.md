---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/chickering-2002-GES-JMLR.md]]"
source_location: "Chickering (2002) JMLR 3:507–554; §3 (FES), §4 (BES), §6 (consistency)"
date_ingested: 2026-10-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Causal Discovery Assumptions]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[Stable PC and High-Dimensional Extensions]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "FES"
  - "BES"
  - "Chickering 2002"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the foundational **score-based**
> causal discovery algorithm. Unlike [[PC Algorithm]] which uses conditional independence
> tests, GES greedily searches the space of **equivalence classes** (CPDAGs) using a
> decomposable score (BIC, BDeu). It runs in two phases: **FES** (Forward Equivalence Search)
> adds edges from the empty graph to a local score maximum, then **BES** (Backward Equivalence
> Search) removes edges to a second local maximum. Chickering proved GES is **consistent** under
> CMC, Faithfulness, and a decomposable score: it returns the true CPDAG in large samples.

## Overview

The central insight behind GES is that consistency guarantees for greedy search are
easier to prove in **equivalence class space** than in individual-DAG space. Each step
of GES makes a single edge insertion or deletion and immediately computes the score
change using only **local** information (the Markov blankets of the endpoints) — the
score is never computed over the full graph. This locality makes GES polynomial in
the number of variables and edges.

GES was proved consistent by Chickering (2002) by establishing the **Meek Conjecture**:
from any DAG with a higher score than all DAGs in the same class, there exists a sequence
of "covered edge reversals" (flipping edges without score change) and a single insertion
that leads closer to the true structure. This structural theorem underpins the FES phase.

## Main Content

### Decomposable scores

GES requires a **decomposable** (Markov-factorizable) score:

> [!definition] Definition: Decomposable Score
> A score $Q$ over DAGs is **decomposable** iff
> $$Q(\mathcal{G}) = \sum_{j=1}^d q_j\!\left(X_j,\, \text{Pa}_{\mathcal{G}}(X_j)\right),$$
> where each local score $q_j$ depends only on variable $X_j$ and its parent set in $\mathcal{G}$.
^def-decomposable-score

> [!example] Decomposable Scores in Practice
>
> | Score | Formula | Setting |
> |-------|---------|---------|
> | **BIC** | $q_j = \hat\ell_j - \frac{k_j}{2}\log n$ | Continuous/Gaussian; penalizes complexity |
> | **BDeu** | $q_j = \log P(X_j, \text{Pa}(X_j) \mid \alpha)$ | Discrete; Bayesian Dirichlet score with prior $\alpha$ |
> | **BGe** | $q_j = \log P(X_j, \text{Pa}(X_j) \mid \alpha)$ | Gaussian; Bayesian Gaussian equivalent |
> | **L0-penalized Gaussian** | $q_j = -\frac{n}{2}\log\hat\sigma_j^2 - \lambda|\text{Pa}(X_j)|$ | High-dimensional; penalizes edge count |
^ex-scores

A key property: any two Markov-equivalent DAGs receive the **same score** from a Bayesian
consistent decomposable score (the BGe or BDeu score with the right priors). This makes the
equivalence-class space flat in terms of score within a class, while between classes the
score distinguishes the true structure.

### FES: Forward Equivalence Search (Phase 1)

> [!definition] Algorithm: FES (Chickering 2002, §3)
> **Input:** Decomposable score $Q$, variable set $\mathbf{V}$.
>
> 1. Initialize $\mathcal{C} \leftarrow$ the **empty graph** (CPDAG with no edges).
> 2. **While** there exists a valid edge insertion that increases $Q$:
>    - Among all valid insertions, select the one with the **largest score increase**.
>    - Apply the insertion: add edge $X \to Y$ to the current CPDAG representation,
>      orient the resulting pattern consistently, and update $\mathcal{C}$.
> 3. **Return** the local maximum CPDAG $\mathcal{C}^+$.
>
> A **valid insertion** of $X \to Y$ into CPDAG $\mathcal{C}$ requires that $X$ and $Y$
> are currently non-adjacent, and the insertion does not introduce a new v-structure
> inconsistent with the current PDAG.
^def-fes

The score change for inserting $X \to Y$ can be computed **locally**:
$$\Delta Q(\text{insert } X \to Y) = q_Y(X_Y, \text{Pa}(Y) \cup \{X\}) - q_Y(X_Y, \text{Pa}(Y)).$$
No re-scoring of the full graph is needed.

### BES: Backward Equivalence Search (Phase 2)

> [!definition] Algorithm: BES (Chickering 2002, §4)
> **Input:** CPDAG $\mathcal{C}^+$ from FES.
>
> 1. Initialize $\mathcal{C} \leftarrow \mathcal{C}^+$.
> 2. **While** there exists a valid edge deletion that increases $Q$:
>    - Among all valid deletions, select the one with the **largest score increase**.
>    - Apply the deletion: remove edge $X - Y$ (or $X \to Y$) from $\mathcal{C}$,
>      reorient the affected edges using the CPDAG rules, and update $\mathcal{C}$.
> 3. **Return** $\mathcal{C}$.
^def-bes

> [!note] Why is a backward phase needed?
> FES starts from the empty graph and can get stuck in a local maximum that includes
> **extra** edges (false positives). BES starts from FES's local maximum and prunes
> edges that increase the score. The two phases together produce a better local maximum
> than either alone. Under faithfulness, consistency is guaranteed.

### Consistency theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, §6)
> Under the Causal Markov Condition, Faithfulness, and a consistent decomposable score $Q$:
>
> 1. **(Population)** With the exact population score, FES + BES returns the true CPDAG $\mathcal{C}^\star$.
>
> 2. **(Finite sample)** With a consistent score (e.g. BIC, BGe, BDeu), as $n \to \infty$,
>    GES returns $\mathcal{C}^\star$ with probability tending to 1.
^thm-ges-consistency

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, §5)
> For any DAG $\mathcal{G}$ whose score is strictly higher than the scores of all DAGs in
> the same equivalence class as the true DAG $\mathcal{G}^\star$, there is a **covered edge**
> in $\mathcal{G}$ whose reversal yields a DAG with an even higher score and closer to $\mathcal{G}^\star$.
>
> A **covered edge** $X \to Y$ is one where $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$
> (reversing it gives another DAG in the same or a better equivalence class without violating
> any Markov constraint). This theorem proves that the greedy forward search can always
> navigate toward the true structure.
^thm-meek-conj

### FGES: Fast GES (Ramsey 2017)

Ramsey (2017) introduced **FGES** (Fast Greedy Equivalence Search), which parallelizes the
FES/BES score evaluations and scales to thousands of variables:

- Maintains a priority queue of candidate insertions/deletions sorted by score change.
- Evaluates only the "bump": changes to the adjacency of touched variables.
- Used in the **Tetrad** software suite (CMU) and integrated into `causal-learn` (Python).

FGES is the version commonly cited as the GES baseline in benchmarks, including
[[NOTEARS Experiments]].

## Connections

- **PC vs. GES**: PC uses CI tests (hypothesis tests); GES uses a score (information criterion).
  Both recover the same CPDAG under the same assumptions in large samples. PC may be preferred
  when a good CI test is available and the graph is very sparse; GES is typically preferred
  in moderate-dimensional settings where BIC captures the right trade-off.
- **NOTEARS comparison**: [[NOTEARS Experiments]] shows NOTEARS (continuous optimization)
  dominates GES/FGS in dense graphs and large node counts. GES can be more accurate in sparse
  settings because it explicitly searches over equivalence classes (the identifiable object),
  while NOTEARS returns a single DAG.
- **Hauser & Bühlmann (2012) extension**: The **GIES** (Greedy Interventional Equivalence
  Search) algorithm extends GES to interventional data, adding a third "turning" phase and
  recovering more edge directions. The `pcalg::gies()` function implements it.
- **Bayesian structure learning**: BGe and BDeu scores in GES connect to [[Bayesian
  Inverse Probability Weighting|Bayesian]] model selection. Using a BGe score with flat
  prior makes GES equivalent to a greedy search under a Gaussian likelihood.
- **ABM calibration connection**: [[Method of Simulated Moments]] and [[Indirect Inference]]
  cover simulation-based estimation; GES-style score evaluation applied to ABM output moments
  could in principle calibrate an ABM graph structure — the connection noted in the Dream index
  as a bridge between econometrics and ABM sections.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — CPDAGs, Meek rules, identifiability
- [[PC Algorithm]] — constraint-based alternative to GES
- [[Stable PC and High-Dimensional Extensions]] — order-independence, high-$d$ consistency
- [[Causal Discovery Assumptions]] — Markov, Faithfulness, Sufficiency
- [[DAG Structure Learning Problem]] — problem setup; where GES fits in the landscape
- [[NOTEARS Experiments]] — GES/FGS benchmark comparison
