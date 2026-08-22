---
title: "GES - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "Chickering (2002); Hauser & Bühlmann (2012)"
source_location: "Chickering (2002), JMLR 3:507–554; Hauser & Bühlmann (2012), JMLR 13"
date_ingested: 2026-08-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Structure Learning - Paradigm Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGS"
  - "Fast Greedy Search"
  - "Chickering 2002"
---

# GES - Overview

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** algorithm
> for causal structure learning. It searches directly over **Markov equivalence classes** (CPDAGs)
> rather than individual DAGs, using two greedy phases — a **forward phase** (insert edges to
> increase the score) and a **backward phase** (delete edges to increase the score). Under
> faithfulness, causal Markov, Gaussianity, and using a consistent score (e.g. BIC), GES
> consistently recovers the true CPDAG as $n \to \infty$.

## Overview

The central insight of GES is to search over **equivalence classes** rather than individual DAGs.
Because all DAGs in the same Markov equivalence class produce the same observed distribution,
any consistent score must assign them equal value — there is no point optimizing within a class.
GES exploits this by representing the search space as a graph of CPDAGs and moving between them
using local operators that add or delete a single edge.

GES provably finds the **globally optimal CPDAG** in the large-sample limit. This is stronger than PC
(which finds the correct CPDAG only asymptotically under faithfulness + oracle CI tests) — GES
reaches the global optimum of the score function, whereas PC's correctness depends on the power of
individual CI tests.

## Score requirements

GES requires a score $Q(\mathcal{G})$ that is:

> [!definition] Score requirements for GES
> 1. **Score equivalence**: all DAGs in the same Markov equivalence class receive the same score.
>    $$\mathcal{G}_1 \sim \mathcal{G}_2 \implies Q(\mathcal{G}_1) = Q(\mathcal{G}_2).$$
> 2. **Decomposability** (local decomposability): the score decomposes as a sum of **local scores**,
>    one per node:
>    $$Q(\mathcal{G}) = \sum_{i=1}^{d} Q_i(X_i,\, \text{pa}_{\mathcal{G}}(X_i)),$$
>    where $Q_i$ depends only on $X_i$ and its parent set. This enables **local updates**: inserting
>    or deleting one edge changes only two local scores.
^def-ges-score-requirements

**Standard score:** the **Gaussian BIC** (Bayesian Information Criterion):
$$Q_{\text{BIC}}(\mathcal{G}) = \sum_{i=1}^{d} \left[ \log \hat{L}(X_i \mid \text{pa}(X_i)) - \frac{k_i}{2} \log n \right],$$
where $\hat{L}$ is the maximized Gaussian likelihood for the $i$-th node's regression on its
parents and $k_i = |\text{pa}(X_i)| + 1$ is the number of free parameters. BIC is score-equivalent
and decomposes locally — and is consistent for linear Gaussian models.

## Algorithm: three phases

> [!definition] GES Algorithm
> **Input:** score $Q(\cdot)$, data $\mathbf{X}$.
> **Initialization:** $\hat{\mathcal{G}} \leftarrow$ empty graph (no edges).
>
> **Phase 1 — Forward (FGES):**
> Repeat until no score-improving Insert exists:
> - Find the **Insert operator** $(X_i, X_j, T)$ that most increases $Q$:
>   the operator adds edge $X_i \to X_j$ and, for nodes $T \subseteq \text{adj}(j)$,
>   turns previously undirected edges $X_t - X_j$ into $X_t \to X_j$.
> - Apply the best Insert and update $\hat{\mathcal{G}}$.
>
> **Phase 2 — Backward (BGES):**
> Repeat until no score-improving Delete exists:
> - Find the **Delete operator** $(X_i, X_j, H)$ that most increases $Q$:
>   the operator removes edge $X_i - X_j$ (or $X_i \to X_j$) and orients a subset $H$ of
>   edges incident to $X_j$.
> - Apply the best Delete and update $\hat{\mathcal{G}}$.
>
> **Phase 3 — Turning (optional; Hauser & Bühlmann 2012):**
> Repeat until no score-improving Turn exists:
> - Find a **Turn operator** $(X_i, X_j, C)$ that reverses an edge $X_i \to X_j$ into $X_i \leftarrow X_j$
>   while updating orientation of neighbors $C$ of $X_j$.
> - Apply the best Turn and update $\hat{\mathcal{G}}$.
>
> **Output:** CPDAG $\hat{\mathcal{G}}$.
^def-ges-algorithm

### Why forward then backward?

The **forward phase** can overshoot — it adds edges until no single insertion improves the score,
but the greedy sequence may add an edge that is spurious. The **backward phase** corrects this by
removing edges that no longer improve the score once the full structure is in place. Chickering
(2002, Theorem 15) proves that in the large-sample limit both phases are necessary and sufficient
to reach the globally optimal CPDAG.

## Consistency theorem

> [!theorem] GES Consistency (Chickering 2002, Theorem 15)
> Assume:
> - Causal Markov and faithfulness hold in the true DAG $\mathcal{G}^*$
> - The true distribution is **multivariate Gaussian** (linear SEM with Gaussian noise)
> - The score is **consistent** (e.g. BIC) and **decomposes locally**
> - **Score equivalence** holds
>
> Then as $n \to \infty$, GES returns the **CPDAG of the true DAG** $\mathcal{G}^*$ with
> probability 1. Moreover, the forward phase terminates at the correct CPDAG of the **maximum
> scoring** consistent DAG; the backward phase produces the globally optimal CPDAG under the score.
^thm-ges-consistency

**The Meek conjecture.** The key technical result that Chickering (2002) proved is the
**Meek conjecture**: if DAG $H$ is an independence map of DAG $G$
(i.e. $\text{I}(H) \supseteq \text{I}(G)$ where $\text{I}(\cdot)$ is the set of conditional
independences), then there is a sequence of **covered edge reversals** in $G$ — each preserving
the Markov equivalence class relative to the score — that transforms $G$ into $H$.
This guarantees that the greedy search does not get trapped in local optima of the equivalence class.

## Comparison to PC

| Property | PC | GES |
|----------|----|------|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC optimization) |
| Search space | Over edges (test-by-test) | Over equivalence classes (Insert/Delete/Turn operators) |
| Assumption | Faithfulness + Markov + sufficiency | Faithfulness + Markov + Gaussianity + score requirements |
| Output | CPDAG (same) | CPDAG (same) |
| Consistency | Yes (oracle CI tests) | Yes (consistent score, $n\to\infty$) |
| Finite-sample | CI test power determines accuracy | Score + BIC penalty determines accuracy |
| Scalability | $O(d^{q+2})$ CI tests | $O(d^2)$ per phase under sparsity; harder on dense graphs |
| Noise distribution | Nonparametric (CI test specific) | Gaussian (for BIC; other scores for non-Gaussian) |

See [[Causal Structure Learning - Paradigm Comparison]] for fuller discussion.

## FGS: the fast version

The **Fast GES (FGS)** implementation (Ramsey, Glymour et al. 2016) is the main practical version
used in benchmarks, including the [[NOTEARS Experiments]]. FGS uses a priority queue to avoid
re-evaluating all possible operators after each change, giving substantial speed improvements.
FGS is implemented in the `tetrad` Java library and wrapped in `py-why/causal-learn`.

> [!note] GES vs NOTEARS empirical results
> In the [[NOTEARS Experiments]], PC and GES (FGS) are compared against NOTEARS. The paper
> reports that PC and LiNGAM are "significantly weaker" and moved to the supplement. FGS (GES) is
> the primary baseline: NOTEARS matches FGS on sparse graphs (ER-2) and substantially outperforms
> it on denser graphs (SF-4) because GES's local edge-at-a-time operators struggle with high-degree
> hub nodes, while NOTEARS updates the entire weight matrix globally.

## Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg::ges()` | R | Kalisch et al. (2012); reference implementation |
| `causal-learn` | Python | py-why; includes GES + FGS variant |
| `tetrad` / `py-tetrad` | Java / Python | Ramsey et al.; FGS (Fast GES) standard benchmark |
| `ges` (PyPI) | Python | Pure-Python Chickering 2002 implementation (Gamella et al.) |

## Connections

- **[[DAG Structure Learning Problem]]** — the combinatorial program GES optimizes (Program 4)
- **[[PC Algorithm - Overview]]** — constraint-based competitor; same output (CPDAG)
- **[[NOTEARS - Overview]]** — continuous-optimization alternative; GES is the main benchmark
- **[[Directed Acyclic Graphs]]** — d-separation, equivalence classes
- **[[Causal Structure Learning - Paradigm Comparison]]** — systematic comparison of paradigms

## See Also
- [[PC Algorithm - Overview]] — constraint-based alternative
- [[Causal Structure Learning - Paradigm Comparison]] — when to choose which method
- [[NOTEARS Experiments]] — GES as a benchmark baseline
- [[Causal Discovery/_Index|Causal Discovery Index]]
