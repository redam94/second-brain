---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2 Prior Approaches, p. 3; Chickering (2002) JMLR 3:507–554"
date_ingested: 2026-09-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Constraint-Based Structure Learning]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
  - "FGS"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is the foundational **score-based**
> algorithm for learning the Markov equivalence class of a DAG from observational data.
> GES operates directly over **CPDAG space** (equivalence classes), not over individual
> DAGs. It has two phases: **Forward Equivalence Search (FES)** greedily adds edges
> that improve a score, and **Backward Equivalence Search (BES)** greedily removes
> edges that improve the score further. Under the Markov, faithfulness, and score-consistency
> assumptions, GES returns the CPDAG of the true DAG in the large-sample limit.
> **Fast GES (FGS/FGES)** achieves super-consistency in high dimensions under sparsity.

## Overview

GES was introduced by Chickering (2002) in the paper "Optimal Structure Identification
with Greedy Search" (*JMLR* 3: 507–554), where he also proved the **Meek conjecture**:
that every DAG can be reached from any other DAG in the same MEC via a sequence of
covered edge reversals. This result underwrites GES's ability to search over equivalence
classes rather than individual DAGs.

GES is the score-based analogue of the PC algorithm. While PC uses CI tests as
binary constraints to eliminate edges, GES uses a **scoring criterion** (typically BIC)
to evaluate the quality of each candidate CPDAG and greedily moves to the highest-scoring
neighbor. Both converge to the same population-limit object (the MEC of the true DAG)
under their respective assumptions.

## Main Content

### Score Requirements

GES requires a scoring criterion $Q$ with two properties:

> [!definition] Definition: Score-Equivalent and Locally Decomposable Score
> A scoring criterion $Q : \mathbb{D} \to \mathbb{R}$ is:
>
> 1. **Score-equivalent**: every DAG in the same MEC receives the same score,
>    i.e. $G_1 \sim G_2 \implies Q(G_1) = Q(G_2)$.
>    *Motivation*: since the population CI structure determines only the MEC, scores
>    that vary within a MEC reward arbitrary orientation choices.
>
> 2. **Locally decomposable**: $Q(G) = \sum_{j=1}^{d} Q_j\!\left(X_j \mid X_{\mathrm{pa}(j)}\right)$,
>    where each local score $Q_j$ depends only on $X_j$ and its parents.
>    *Motivation*: allows efficient incremental score updates when a single
>    edge is added or removed.
^def-score-requirements

> [!example] Standard scoring criteria for GES
>
> **BIC (Gaussian data):**
> $$Q_j^{\mathrm{BIC}} = \log \hat\sigma_j^2 + \frac{|\mathrm{pa}(j)|+1}{n} \log n,$$
> where $\hat\sigma_j^2$ is the residual variance of $X_j$ regressed on its parents.
> BIC is score-equivalent and locally decomposable.
>
> **BDeu (discrete data):** The Bayesian Dirichlet equivalent uniform score is the
> natural discrete analogue; it is also score-equivalent and decomposable.
>
> **BGe (Bayesian Gaussian equivalent):** The Bayesian analogue for continuous Gaussian
> data with a conjugate Normal-Wishart prior.

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Algorithm: FES (Chickering, 2002)
> **Input:** Score $Q$; Start CPDAG $\mathcal{C}_0$ (typically: empty graph, no edges).
>
> **Repeat until no improvement:**
> - For each pair of non-adjacent vertices $(i,j)$:
>   - Consider all valid **insert** operators: adding edge $i \to j$ plus orienting
>     a subset $H \subseteq \mathrm{adj}(j) \setminus \{i\}$ of $j$'s current undirected
>     edges away from $j$.
>   - Compute the score change $\Delta Q$ for each valid insert.
> - Choose the insert with **maximum** $\Delta Q > 0$.
> - Apply it to the current CPDAG (update structure, recompute orientations via Meek rules).
>
> **Output:** CPDAG $\mathcal{C}_{\mathrm{FES}}$.
^alg-fes

> [!note] Local score updates in FES
> Because $Q$ is locally decomposable, the score change from adding $i \to j$ equals
> $$\Delta Q = Q_j\!\left(X_j \mid X_{\mathrm{pa}_{\mathrm{new}}(j)}\right) - Q_j\!\left(X_j \mid X_{\mathrm{pa}_{\mathrm{old}}(j)}\right),$$
> which requires recomputing only $j$'s local score. This makes each insert evaluation cheap.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Algorithm: BES (Chickering, 2002)
> **Input:** CPDAG $\mathcal{C}_{\mathrm{FES}}$ from Phase 1; Score $Q$.
>
> **Repeat until no improvement:**
> - For each adjacent pair $(i,j)$ in the current CPDAG:
>   - Consider all valid **delete** operators: removing edge $i \sim j$ and orienting
>     a subset $H \subseteq \mathrm{adj}(i) \cap \mathrm{adj}(j)$ (shared neighbours) away.
>   - Compute the score change $\Delta Q$ for each valid delete.
> - Choose the delete with **maximum** $\Delta Q > 0$ (score *increase* from removal).
> - Apply it (update CPDAG, re-apply Meek rules).
>
> **Output:** CPDAG $\mathcal{C}_{\mathrm{GES}}$.
^alg-bes

> [!note] Why BES is necessary
> FES starts from the empty graph and may overshoot: it can include edges that improve
> the forward score but are unnecessary in the final structure. BES corrects this by
> pruning edges whose removal further improves the score. Together, FES + BES achieves
> a two-pass greedy search that is provably consistent under faithfulness in the large-sample limit.

### Turning Phase (Hauser & Bühlmann, 2012)

A third **turning phase** was added by Hauser & Bühlmann (2012) for the interventional
GES (GIES) setting, but is also used in observational GES:

> [!definition] Algorithm: Turning Phase
> Consider all **turn** operators: reorienting an edge $i \to j$ to $j \to i$ (or
> $i - j$ to a directed version) if the score increases. Apply greedily until no
> turning improves the score.
>
> The turning phase helps escape local optima that FES + BES may settle in.
^alg-turning

### Theoretical Properties

> [!theorem] Consistency of GES (Chickering, 2002)
> Under the following assumptions:
> - $\mathbb{P}$ is **Markov** to $G^*$
> - $\mathbb{P}$ is **faithful** to $G^*$
> - $Q$ is **score-consistent**: for large $n$, $Q(G) > Q(G')$ iff $G$ is a better model
>   (BIC satisfies this under standard regularity conditions)
>
> GES **consistently recovers** the CPDAG of $G^*$:
> $$\Pr\!\left(\hat{\mathcal{C}}_n^{\mathrm{GES}} = \mathcal{C}(G^*)\right) \to 1 \quad \text{as } n \to \infty.$$
>
> The Meek Conjecture (proved in the same paper) guarantees that the greedy search
> over insert/delete/turn operators in CPDAG space can reach any MEC from any other —
> i.e. the search space is connected.
^thm-ges-consistency

> [!theorem] Meek Conjecture (Chickering, 2002)
> Let $G^*$ be the true DAG. Then for any starting DAG $G_0$, there exists a sequence
> of edge additions and **covered edge reversals** (reversing $A \to B$ where
> $\mathrm{pa}(A) = \mathrm{pa}(B) \setminus \{A\}$) that transforms $G_0$ into $G^*$.
>
> **Significance**: this guarantees that GES's greedy search over CPDAG operators
> does not get trapped in unreachable regions of the MEC space.
^thm-meek-conjecture

### Fast GES (FGS / FGES)

The **Fast Greedy Equivalence Search** (Ramsey et al., 2017; also called FGES in
the Tetrad software) achieves significant speed-ups for large $d$ and $n$:

- **Parallelism**: score updates for different variables are computed in parallel.
- **Caching**: local score values are cached and reused across iterations.
- **Super-consistency**: under sparsity conditions, FGS achieves
  $\Pr(\hat{\mathcal{C}}_n = \mathcal{C}(G^*)) \to 1$ at rates faster than
  consistent — even when $d \gg n$.

> [!note] FGS in NOTEARS experiments
> NOTEARS uses **FGS** (the Ramsey et al. implementation) as its primary baseline,
> not vanilla GES, because FGS is the strongest scalable method at the time. NOTEARS
> outperforms FGS on **dense graphs** (SF-4, high in-degree) while FGS is competitive
> on **sparse graphs** (ER-2). See [[NOTEARS Experiments]] for results.

### GES vs PC: Key Differences

| Property | PC (Constraint-based) | GES (Score-based) |
|---|---|---|
| **Core operation** | CI tests (binary) | Score evaluations (continuous) |
| **Faithfulness** | Required | Required |
| **Search space** | Edge-by-edge CI tests | Operators over CPDAG space |
| **Score model** | None (non-parametric CI test) | BIC / BDeu (parametric) |
| **Multiple testing** | Many CI tests; FDR issue | Single score; no multiple-testing problem |
| **Dense graphs** | Poor (exponential CI tests) | Poor (many insert candidates) |
| **High-dimensional** | Consistent (Kalisch & Bühlmann 2007) | Consistent (FGS) |
| **Implementation** | `pcalg`, `causal-learn` | `pcalg` (ges), `ges` (Python), Tetrad (FGS) |

### Software Implementations

| Package | Language | Algorithm | Notes |
|---|---|---|---|
| `pcalg` | R | `ges()` | Reference implementation; Hauser & Bühlmann (2012) |
| `ges` (Gamella) | Python | GES + turning | Minimal NumPy-only; validates against pcalg |
| Tetrad | Java | FGES | FGS; large-scale; parallelized |
| `causal-learn` | Python | GES | CMU implementation |

```python
# Example: Python GES (Gamella's ges package)
import ges
import numpy as np

# X: n × d data matrix (columns = variables)
estimate, score = ges.fit_bic(X)
# estimate: d × d adjacency matrix of CPDAG (1 = directed edge)
# score: total BIC score
```

```r
# Example: R pcalg GES
library(pcalg)
score <- new("GaussL0penObsScore", X)
ges.fit <- ges(score)
# Returns an object with CPDAG in ges.fit$essgraph
```

## Connections

- **CPDAG output**: both GES and PC return a CPDAG — see [[Markov Equivalence and CPDAGs]]
- **Score-based vs constraint-based**: the paradigm contrast — see [[Constraint-Based Structure Learning]]
- **NOTEARS comparison**: NOTEARS optimizes over continuous $\mathbb{R}^{d\times d}$ and returns a DAG; GES searches over discrete CPDAG space — see [[NOTEARS - Overview]]
- **Problem setup**: the SEM, scores, and NP-hardness — see [[DAG Structure Learning Problem]]

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG structure GES operates on
- [[PC Algorithm]] — the CI-based alternative
- [[DAG Structure Learning Problem]] — full landscape including exact methods and continuous optimization
- [[NOTEARS - Overview]] — the continuous-optimization approach, showing GES limitations on dense graphs
- [[NOTEARS Experiments]] — empirical comparison of NOTEARS vs FGS
