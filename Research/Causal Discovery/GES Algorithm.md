---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002) — 'Optimal Structure Identification with Greedy Search', JMLR 3:507–554 (PDF not cached; proxy restriction; freely available at jmlr.org/papers/v3/chickering02b.html)"
source_location: "Chickering (2002) §1–5; §7 (consistency proof)"
date_ingested: 2026-09-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
  - "[[PC Algorithm]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the foundational **score-based**
> causal discovery algorithm. Unlike hill-climbing over individual DAGs, GES searches the
> space of **Markov equivalence classes** (CPDAGs) directly, using the **BIC score** as its
> objective. Two phases: a **Forward Equivalence Search** (FES) greedily adds edges until no
> single insertion raises the score; a **Backward Equivalence Search** (BES) greedily removes
> edges. Chickering (2002) proved GES is **score-consistent**: it recovers the true CPDAG
> asymptotically under faithfulness.

## Overview

Greedy hill-climbing over individual DAGs suffers from a fundamental problem: many
edge reversals are **Markov-equivalent** moves that leave the score unchanged. These
constant-score moves waste search effort and create irreproducible results.

GES solves this by lifting the search from the space of DAGs to the space of
**Markov equivalence classes** (MECs), represented as CPDAGs. In MEC space, every
valid move either improves or leaves the score unchanged without creating spurious
equivalent reversals. Chickering (2002) proved that, under faithfulness and a consistent
score, the two-phase GES procedure always terminates at the correct MEC — a much
stronger guarantee than plain hill-climbing provides.

## Main Content

### Decomposable scores

GES requires a **decomposable score**: one that factors over the local families
(each node and its parents) of the DAG.

> [!definition] Definition: Decomposable Score (Chickering 2002 §2)
> A score $Q(\mathsf{G}, \mathbf{X})$ is **decomposable** if it can be written as a sum of
> **local scores**:
> $$Q(\mathsf{G}, \mathbf{X}) = \sum_{i=1}^{d} q(X_i, \mathrm{Pa}^{\mathsf{G}}_i, \mathbf{X}),$$
> where $q(X_i, \mathrm{Pa}^{\mathsf{G}}_i, \mathbf{X})$ depends only on node $X_i$, its
> parent set $\mathrm{Pa}^{\mathsf{G}}_i$, and the data $\mathbf{X}$.
> The score changes by $\Delta q$ when parents of $X_i$ change; all other local scores
> are unaffected.
^def-decomposable-score

The standard choice is the **BIC score** (Bayesian Information Criterion):

> [!definition] Definition: BIC Score for DAG Learning
> For a linear Gaussian SEM with $d$ variables and $n$ observations:
> $$\mathrm{BIC}(\mathsf{G}, \mathbf{X}) = \log \hat{L}(\mathsf{G}) - \frac{|\mathsf{E}|}{2} \log n,$$
> where $\hat{L}(\mathsf{G})$ is the maximum log-likelihood under $\mathsf{G}$ and
> $|\mathsf{E}|$ is the number of edges (degrees of freedom). The penalty $-\frac{|\mathsf{E}|}{2}\log n$
> controls sparsity.
> BIC is a consistent score: the true graph $\mathsf{G}^*$ has strictly higher BIC than
> any other graph asymptotically (under faithfulness).
^def-bic-score

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Forward Equivalence Search (FES)
> **Input:** Data $\mathbf{X}$; score $Q$.
>
> 1. Initialize with **empty CPDAG** $\mathcal{C}_0$ (no edges).
> 2. Repeat until no valid insertion increases the score:
>    a. For each **valid edge insertion** $(X_i, X_j, \mathbf{T})$ where $\mathbf{T}$ is a
>       valid "turning set" (a subset of common neighbors satisfying the GES Insert condition):
>       - Compute $\Delta Q = Q(\mathcal{C} \oplus \mathrm{Insert}(X_i, X_j, \mathbf{T})) - Q(\mathcal{C})$.
>    b. Apply the highest-$\Delta Q$ insertion. Update $\mathcal{C}$.
>
> **Output:** CPDAG $\mathcal{C}_{\mathrm{FES}}$.
^def-fes

> [!note] The Insert operator
> The **Insert** operator adds edge $X_i \to X_j$ to a CPDAG $\mathcal{C}$
> while maintaining the CPDAG property. It involves: (1) orienting $X_i \to X_j$,
> (2) orienting edges between $\mathbf{T}$ and $X_j$ as $X_t \to X_j$ for $X_t \in \mathbf{T}$,
> and (3) applying Meek's rules to propagate. The valid turning sets $\mathbf{T}$ are chosen
> to ensure the result is a valid CPDAG.

> [!theorem] Theorem: FES Termination at True MEC (Forward Direction)
> Under a consistent decomposable score and faithfulness, the FES phase terminates at a
> CPDAG $\mathcal{C}_{\mathrm{FES}}$ that contains **at least** the edges in the true CPDAG
> $\mathcal{C}(\mathsf{G}^*)$ — it may contain extra edges but no missing edges (asymptotically).
^thm-fes-correctness

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Backward Equivalence Search (BES)
> **Input:** CPDAG $\mathcal{C}_{\mathrm{FES}}$ from Phase 1; score $Q$.
>
> 1. Start from $\mathcal{C}_{\mathrm{FES}}$.
> 2. Repeat until no valid deletion increases the score:
>    a. For each **valid edge deletion** $(X_i, X_j, \mathbf{H})$ where $\mathbf{H}$ is a
>       valid "heading set" (subset of neighbors of $X_j$ in current CPDAG satisfying Delete condition):
>       - Compute $\Delta Q = Q(\mathcal{C} \ominus \mathrm{Delete}(X_i, X_j, \mathbf{H})) - Q(\mathcal{C})$.
>    b. Apply the highest-$\Delta Q$ deletion. Update $\mathcal{C}$.
>
> **Output:** CPDAG $\mathcal{C}_{\mathrm{GES}} = \mathcal{C}_{\mathrm{BES}}$.
^def-bes

> [!note] The Delete operator
> The **Delete** operator removes an edge from a CPDAG while maintaining validity.
> It reverses edge orientations caused by the edge being removed and re-applies Meek's rules.
> The valid heading sets $\mathbf{H}$ ensure no invalid CPDAGs are generated.

### Consistency

The central theorem of Chickering (2002):

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $\mathbb{P}$ be a distribution faithful to DAG $\mathsf{G}^*$ and let $Q$ be a
> decomposable, **consistent** score (e.g., BIC). In the limit $n \to \infty$, GES returns
> the true CPDAG $\mathcal{C}(\mathsf{G}^*)$ with probability 1.
>
> The proof proceeds in two parts:
> 1. **FES correctness**: under faithfulness, the FES phase will eventually add all true edges
>    and no spurious edges (since adding a spurious edge cannot increase the score asymptotically).
> 2. **BES correctness**: after FES, BES removes all spurious edges added (which have negative
>    score contributions asymptotically) and leaves the true edges.
^thm-ges-consistency

> [!note] Meek Conjecture — key to BES correctness
> The BES phase requires a result known as the **Meek Conjecture** (now a theorem, proved by
> Chickering 2002 as a prerequisite): *any two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ with
> the same skeleton can be connected by a sequence of single covered-edge reversals.* This
> ensures BES can navigate between any two MECs via single-step deletions.
^thm-meek-conjecture

### GES vs. PC: comparison

| Property | PC | GES |
|----------|----|------|
| Paradigm | Constraint-based | Score-based |
| Primary input | CI test (binary decisions) | Decomposable score (real values) |
| Robustness to noise | Sensitive to individual CI errors | Aggregates over all edges (more robust) |
| Consistency | Yes (consistent CI test) | Yes (consistent score) |
| For sparse graphs | Fast ($O(d^2 k_{\max}^{k_{\max}})$ CI tests) | Can be slower (search over CPDAGs) |
| Guarantees | Returns CPDAG under faithfulness | Stronger: returns true MEC by score consistency |
| Output | CPDAG | CPDAG |
| Main assumption | Faithfulness + causal sufficiency | Same + consistent score |
| Key sensitivity | False-positive/negative CI tests | Score consistency + $n$ for penalty |

### Practical implementation

GES is implemented in the `pcalg` R package (`ges()` function, Hauser & Bühlmann 2012)
and in `causal-learn` Python (Zheng et al., 2023). Key parameters:
- **Score**: `"BIC-g"` for Gaussian; `"BDeu"` for discrete/Bayesian Dirichlet equivalent.
- **Penalty discount**: multiplier on the BIC penalty $\lambda \cdot \frac{|\mathsf{E}|}{2}\log n$;
  controls sparsity (higher = sparser graph).
- **Phase**: can run FES only or full FES + BES.

```r
# pcalg example
library(pcalg)
score <- new("GaussL0penObsScore", data = X)   # BIC with Gaussian L0 penalty
ges_result <- ges(score)
plot(ges_result$essgraph)                        # plot CPDAG
```

```python
# causal-learn example
from causallearn.search.ScoreBased.GES import ges
result = ges(X, score_func='local_score_BIC')
result['G'].draw_pydot_graph()
```

### Extensions

| Extension | What it adds | Reference |
|-----------|-------------|-----------|
| **GIES** (Greedy Interventional ES) | Interventional data; can break MEC ambiguity | Hauser & Bühlmann (2012) |
| **AGES** (Adaptively restricted GES) | Restricts FES search space for speed | Chickering & Meek (2015) |
| **fGES** (Fast GES) | Parallelized; handles $d > 1000$ | Ramsey et al. (2017) |
| **RFCI + GES hybrid** | Hidden confounders + score | — |

## Connections

- **[[Markov Equivalence Classes and CPDAGs]]**: GES directly operates over CPDAGs — the
  key novelty over DAG-space hill-climbing.
- **[[DAG Structure Learning Problem]]**: the BIC score and SEM formulation used in GES are
  defined there. The "local / approximate search" row in the landscape table includes GES.
- **[[PC Algorithm]]**: the main constraint-based competitor. PC is faster for sparse graphs;
  GES is more robust.
- **[[NOTEARS - Overview]]**: NOTEARS benchmarks against GES (§4 Experiments) — GES is one of
  the strongest baselines.
- **[[BN Construction Methods Comparison]]**: data-driven GES vs. expert-knowledge BN elicitation.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the MEC space GES navigates
- [[PC Algorithm]] — constraint-based alternative
- [[Causal Structure Learning - Overview]] — all three paradigms
- [[NOTEARS Experiments]] — empirical comparison including GES as a baseline
- [[DAG Structure Learning Problem]] — score formulation and landscape of prior methods
