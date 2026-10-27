---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02-GES-REFERENCE.md]]"
source_location: "Chickering (2002) §3–7; Hauser & Bühlmann (2012) §3 (turning phase)"
date_ingested: 2026-10-27
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm - Overview]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based structure learning"
  - "FES BES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the foundational **score-based**
> causal structure learning algorithm. It searches over **Markov equivalence classes** (MECs,
> represented as CPDAGs) rather than individual DAGs, using a decomposable score such as BIC
> that assigns equal scores to Markov-equivalent DAGs (**score equivalence**). GES consists of
> two greedy search phases — a **forward phase** (FES) adding edges and a **backward phase** (BES)
> removing them — plus an optional **turning phase**. Under faithfulness and a consistent
> scoring function, GES asymptotically recovers the true MEC. It is the score-based benchmark
> against which [[NOTEARS - Overview]] is evaluated.

## Overview

Score-based structure learning optimizes a scoring function $Q(G)$ over the space of DAGs.
The naive search is NP-hard (see [[DAG Structure Learning Problem]]) because the DAG space
is superexponential. GES exploits a key insight: **decomposable, score-equivalent scores are
constant within a MEC**. Therefore the search can operate over MECs rather than individual
DAGs — and the MEC space is much smaller. GES uses CPDAGs as its search states and applies
valid **graph edit operators** that move between adjacent MECs.

The critical theoretical contribution of Chickering (2002) is the proof of the **Meek
Conjecture**, which establishes that GES's forward phase *can always reach* the true MEC
from the empty graph — guaranteeing asymptotic correctness.

## Main Content

### Scoring functions

> [!definition] Definition: Decomposable Score
> A score $Q(G, \mathbf{X})$ is **decomposable** if it factors as a sum over nodes:
> $$Q(G, \mathbf{X}) = \sum_{j=1}^{d} q_j(\mathrm{Pa}_G(X_j), \mathbf{X}),$$
> where $q_j$ depends only on node $X_j$ and its parents in $G$. The **BIC** score is the
> canonical decomposable score:
> $$\text{BIC}(G, \mathbf{X}) = \log \hat{L}(G) - \frac{\log n}{2} |\theta_G|,$$
> where $\hat{L}(G)$ is the maximized log-likelihood and $|\theta_G|$ is the number of free
> parameters. For Gaussian linear SEMs, the node-wise BIC scores are easily computed from
> local regressions.
^def-decomposable-score

> [!definition] Definition: Score Equivalence
> A score $Q$ is **score-equivalent** if all DAGs in the same Markov equivalence class
> receive the same score: $G_1 \sim G_2 \Rightarrow Q(G_1) = Q(G_2)$.
>
> **Why this matters for GES:** score equivalence means there is no benefit to distinguishing
> between DAGs in the same MEC. GES can score an entire equivalence class by scoring any
> representative DAG, or equivalently by working directly with the CPDAG.
^def-score-equivalence

BIC is both decomposable and score-equivalent for Gaussian linear SEMs. Decomposability enables
efficient local score updates when an edge is added/removed; score-equivalence justifies working
with CPDAGs.

> [!definition] Definition: Consistency
> A scoring function $Q_n$ is **consistent** if, as $n \to \infty$:
> $$\underset{G \in [G^*]}{\max}\, Q_n(G) > \underset{G \notin [G^*]}{\max}\, Q_n(G) \quad
> \text{with probability} \to 1,$$
> i.e., the true MEC $[G^*]$ achieves a strictly higher score than any other MEC in the limit.
> BIC is consistent under standard regularity conditions.
^def-consistency

### GES phases

#### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Forward Equivalence Search (FES)
> **Input:** Empty CPDAG $\mathcal{C}_0$ (no edges); data $\mathbf{X}$.
>
> 1. Compute the **Insert operator score change** $\Delta^+(X, Y, T)$ for all ordered
>    pairs $(X, Y)$ and all **valid** subsets $T \subseteq \mathrm{Adj}_{\mathcal{C}}(X) \setminus \mathrm{Adj}_{\mathcal{C}}(Y)$.
> 2. Apply the Insert operator achieving the maximum positive $\Delta^+$:
>    update $\mathcal{C} \leftarrow \text{Insert}(\mathcal{C}, X, Y, T)$.
> 3. Repeat until no operator produces a positive score change.
>
> **Output:** CPDAG $\mathcal{C}_{\text{FES}}$ — a local maximum in the forward direction.
^def-fes

The **Insert$(X, Y, T)$** operator adds an edge $X \to Y$ to a DAG in the current MEC,
resulting in a new (larger) MEC. The set $T$ controls which edges are additionally oriented
to maintain a valid DAG; valid $T$ sets are those for which the result is still a CPDAG.

> [!note] Why start from empty?
> Starting from no edges ensures the forward phase cannot miss any global maximum by starting
> in a wrong region. The Meek Conjecture (Theorem 15 of Chickering 2002) guarantees that the
> true MEC is **always reachable** from the empty graph by successive edge insertions.

#### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Backward Equivalence Search (BES)
> **Input:** CPDAG $\mathcal{C}_{\text{FES}}$.
>
> 1. Compute the **Delete operator score change** $\Delta^-(X, Y, H)$ for all pairs $(X, Y)$
>    and valid subsets $H \subseteq \mathrm{Adj}_{\mathcal{C}}(X) \cap \mathrm{Adj}_{\mathcal{C}}(Y)$.
> 2. Apply the Delete operator achieving the maximum positive $\Delta^-$:
>    update $\mathcal{C} \leftarrow \text{Delete}(\mathcal{C}, X, Y, H)$.
> 3. Repeat until no operator produces a positive score change.
>
> **Output:** Final CPDAG $\hat{\mathcal{C}}$.
^def-bes

The **Delete$(X, Y, H)$** operator removes an edge between $X$ and $Y$ and updates
orientations. The two-phase structure (add then prune) is analogous to forward-backward
selection in regression: FES may add too many edges, BES removes the spurious ones.

#### Phase 3: Turning phase (Hauser & Bühlmann 2012)

A **turning phase** (TES) was added by Hauser & Bühlmann (2012) to improve finite-sample
performance:

> [!definition] Definition: Turning Phase (Hauser & Bühlmann 2012)
> Starting from $\hat{\mathcal{C}}$ (output of BES), apply **Turn$(X, Y, C)$** operators
> that reverse an edge $X \to Y$ to $X \leftarrow Y$ while adjusting surrounding orientations.
> Repeat until no positive score change.
>
> The turning phase is not required for asymptotic consistency but improves recovery in
> finite samples when FES/BES get stuck in different local optima.
^def-turning-phase

### The Meek Conjecture and asymptotic correctness

The central theoretical result is the proof of a conjecture by Meek (1997):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> Let $G$ and $H$ be two DAGs such that $H$ is an **independence map (I-map)** of $G$
> (i.e., every d-separation in $H$ is also a d-separation in $G$). Then there exists a
> sequence of **edge additions** and **covered edge reversals** transforming $G$ into $H$,
> each step maintaining a valid DAG.
>
> A **covered edge** $X \to Y$ in DAG $G$ is one where $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$.
^thm-meek-conjecture

> [!theorem] Theorem: GES Asymptotic Correctness (Chickering 2002, Corollary 33)
> Under the causal Markov condition and faithfulness, with a decomposable, score-equivalent,
> and consistent scoring function:
> $$\mathbb{P}(\hat{\mathcal{C}}_n = \mathcal{C}^*) \to 1 \quad \text{as } n \to \infty,$$
> where $\mathcal{C}^*$ is the CPDAG of the true DAG $G^*$.
>
> **Proof sketch:** (1) The Meek Conjecture guarantees FES can reach $[G^*]$ from the empty
> graph. (2) Consistency of the score ensures the forward phase adds edges until reaching
> (or overshooting) $[G^*]$, and the backward phase prunes back to it exactly.
^thm-ges-correctness

### Relationship to NOTEARS

[[NOTEARS - Overview]] benchmarks against GES (and FGS, an accelerated version):

> The "local / approximate search" camp in the DAG structure learning landscape includes GES
> and its faster variant FGS (**F**ast **G**reedy **S**earch). NOTEARS contrasts itself with GES
> as follows:
> - **GES**: local edge-at-a-time updates; requires structural assumptions (bounded in-degree);
>   adds/removes one edge per step, checking acyclicity incrementally.
> - **NOTEARS**: global update of the full matrix $W$ each step; no graphical-model knowledge
>   required; treats acyclicity as a smooth constraint.

In [[NOTEARS Experiments]], GES and FGS serve as baselines. NOTEARS outperforms GES/FGS on
dense graphs; performance is comparable on sparse Erdős-Rényi graphs.

### FGS: Accelerated GES

**FGS** (Fast GES; Ramsey et al. 2017) is an implementation that accelerates GES for large
sparse graphs by limiting the neighborhood sets explored during edge scoring. FGS is the
version used in the `causal-learn` Python package and the TETRAD Java toolkit. Asymptotically
equivalent to GES; faster in practice for $p > 100$.

## Connections

- **PC vs. GES**: PC uses CI tests (constraint-based); GES uses a score (score-based).
  For Gaussian models, PC and GES are both asymptotically correct under faithfulness.
  PC is faster for large sparse graphs; GES has slightly stronger guarantees (doesn't require
  choosing a significance level). See [[PC Algorithm - Overview]].
- **NOTEARS vs. GES**: GES searches over MECs (a combinatorial but much-reduced space);
  NOTEARS searches over $\mathbb{R}^{d\times d}$ continuously. See [[NOTEARS - Overview]].
- **Empirical Bayes connection**: The BIC score used by GES can be viewed as a marginal
  likelihood under a Gaussian prior on edge weights — connecting GES to Bayesian model
  selection. See [[Overfitting and Information Criteria]].
- **ABM structural learning**: ABM outputs can be used as observational data for structure
  learning; GES/PC could recover the agent interaction graph from simulation output.
  See [[Approximate Bayesian Computation for ABMs]] and [[Summary Causal DAGs]].

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES (CPDAGs, Meek rules)
- [[PC Algorithm - Overview]] — constraint-based alternative; both output CPDAGs
- [[DAG Structure Learning Problem]] — score-based formulation and landscape of methods
- [[NOTEARS - Overview]] — continuous optimization alternative; benchmarks against GES
- [[NOTEARS Experiments]] — empirical comparison: NOTEARS vs. FGS, SHD/FDR benchmarks
