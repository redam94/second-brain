---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/CITATIONS-constraint-score-based-discovery.md]]"
source_location: "Chickering 2002 §2-5; Chickering 2002a"
date_ingested: 2026-10-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Causal Discovery Assumptions]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[Causal Discovery Methods - Overview]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the flagship
> **score-based** causal discovery algorithm. Instead of testing conditional
> independencies, GES optimizes a scoring criterion (BIC, BDeu, BGe) directly
> over the space of Markov equivalence classes — represented as CPDAGs.
> It performs two greedy phases: a **forward phase** (Insert operators adding edges)
> that overshoots the true MEC, then a **backward phase** (Delete operators removing
> edges) that corrects back. Chickering (2002) proves GES returns the **globally
> optimal CPDAG** in the large-sample limit under Faithfulness, making it one of the
> few structure-learning algorithms with a provable consistency guarantee.

## Overview

Score-based structure learning ([[DAG Structure Learning Problem]], Program 4)
minimizes a discrete score $Q(G)$ over DAGs — an NP-hard problem in general.
GES's key innovation is to **work in the space of Markov equivalence classes
rather than individual DAGs**. This space is smaller (one representative per
class), and Chickering (2002) discovered a set of local operators — Insert,
Delete — that navigate it efficiently.

The two-phase structure is not a heuristic: Chickering (2002, Theorem 15) proves
that under the BIC score and faithfulness, both phases together converge to the
globally optimal CPDAG. This was a surprising theoretical result, since greedy
hill-climbing normally has no such guarantee.

## Main Content

### Scores used by GES

GES requires a **decomposable score** — one that factors over the local structure
of each node (its parents), enabling efficient local updates.

> [!definition] Definition: Decomposable Score
> A scoring criterion $Q(G, \mathcal{D})$ is **decomposable** if:
> $$Q(G, \mathcal{D}) = \sum_{i=1}^{d} q(X_i, \mathrm{Pa}_G(X_i), \mathcal{D}),$$
> where $q(X_i, \mathrm{Pa}_G(X_i), \mathcal{D})$ depends only on $X_i$, its parents,
> and the data $\mathcal{D}$.
^def-decomposable-score

Decomposability means the score change from adding/removing an edge is computable
locally — only the affected node's local score changes.

**Common choices:**

| Score | Setting | Formula | Reference |
|-------|---------|---------|-----------|
| **BIC** | Gaussian, continuous | $\text{BIC}(G, \mathcal{D}) = \ell(G, \mathcal{D}) - \frac{|E|}{2}\log n$ | Schwarz 1978 |
| **BDeu** | Discrete, multinomial | Bayesian Dirichlet score with uniform equivalent sample size | Heckerman et al. 1995 |
| **BGe** | Gaussian, continuous | Bayesian Gaussian score (integrates out parameters) | Geiger & Heckerman 2002 |

For continuous data, **BIC** is the standard choice. The BIC score is asymptotically
consistent: the MEC achieving the highest BIC is the true MEC as $n \to \infty$,
under standard regularity conditions.

### Phase 1: Forward Phase (Insert Operators)

> [!definition] Definition: Insert Operator (Chickering 2002 §4)
> An **Insert$(X, Y, T)$** operator adds the edge $X \to Y$ to the current CPDAG
> $C$, where $T \subseteq \text{Ne}_C(Y) \setminus \text{Adj}_C(X)$ is a subset
> of undirected neighbors of $Y$ that are non-adjacent to $X$, with $T$ forming
> a clique in $C$.
>
> The operator:
> 1. Adds $X \to Y$.
> 2. Orients all $T \to Y$ (making them parents of $Y$).
> 3. Converts to CPDAG using the standard CPDAG conversion algorithm.
^def-insert-op

**Forward phase algorithm:**
1. Start: empty CPDAG (no edges).
2. Evaluate all valid Insert$(X, Y, T)$ operators and compute the score gain $\Delta Q$.
3. Apply the highest-scoring Insert with $\Delta Q > 0$.
4. Repeat until no Insert improves the score.

**Key property**: The forward phase is guaranteed to move through valid CPDAGs
at each step (Chickering 2002, Lemma 15). It terminates at an MEC that is a
local maximum of the forward phase score — possibly overshooting the true MEC.

**Why start from empty?** Starting from no edges ensures GES encounters every
possible skeleton — it cannot miss sparse structures. The forward phase adds
edges until adding more hurts the score.

### Phase 2: Backward Phase (Delete Operators)

> [!definition] Definition: Delete Operator (Chickering 2002 §4)
> A **Delete$(X, Y, H)$** operator removes the edge $X - Y$ or $X \to Y$
> from the current CPDAG $C$, where $H \subseteq \text{Ne}_C(Y) \cap \text{Adj}_C(X)$
> is a subset of undirected neighbors of $Y$ that are adjacent to $X$.
>
> The operator:
> 1. Removes $X - Y$ (or $X \to Y$).
> 2. Orients $H \to Y$ for $H$-members that were undirected toward $Y$.
> 3. Converts to CPDAG.
^def-delete-op

**Backward phase algorithm:**
1. Start: CPDAG output of the forward phase.
2. Evaluate all valid Delete$(X, Y, H)$ operators and compute $\Delta Q$.
3. Apply the highest-scoring Delete with $\Delta Q > 0$.
4. Repeat until no Delete improves the score.

**Correctness**: Chickering (2002, Theorem 15) proves that under Faithfulness
and BIC, the forward phase produces a CPDAG "above" the true MEC in the DAG
lattice, and the backward phase descends to the true MEC exactly.

### Main consistency theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Assume:
> 1. Causal Markov Condition holds for the true DAG $G^*$.
> 2. $P$ is faithful to $G^*$.
> 3. The scoring criterion $Q$ is decomposable and **consistent**: $Q(G) > Q(H)$
>    as $n \to \infty$ if $G$ is a better fit than $H$ (achieved by BIC under
>    standard conditions).
>
> Then, as $n \to \infty$, GES returns the **unique CPDAG** of $G^*$ (the true
> Markov equivalence class).
>
> Furthermore, Chickering (2002, Theorem 14) proves the **Meek Conjecture**: under
> Faithfulness, GES's two phases (Insert + Delete) are provably sufficient to reach
> any CPDAG from any starting point in the space of MECs.
^thm-ges-consistency

The Meek Conjecture is the key combinatorial result: it says the Insert + Delete
operators are **complete** for the space of CPDAGs, analogous to how Meek's
orientation rules are complete for CPDAG completion.

### Score computation and efficient updates

For Gaussian data with BIC, the local score for node $X_i$ with parent set $S$ is:

$$q(X_i, S, \mathcal{D}) = -\frac{n}{2}\log\hat\sigma^2_{X_i | S} - \frac{|S|+1}{2}\log n,$$

where $\hat\sigma^2_{X_i | S}$ is the residual variance of $X_i$ regressed on $S$.
The **score gain** for Insert$(X, Y, T)$ is:

$$\Delta Q(\text{Insert}(X,Y,T)) = q(Y, \mathrm{Pa}(Y) \cup T \cup \{X\}) - q(Y, \mathrm{Pa}(Y) \cup T).$$

This local decomposability makes each operator evaluation $O(n \cdot |S|^2)$
(regression) and means GES can cache partial results across steps.

### Comparison to PC

| Dimension | PC Algorithm | GES |
|-----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (optimize BIC) |
| Works nonparametrically | Yes (kernel CI tests) | No (parametric score required) |
| High-dimensional ($d \gg n$) | Yes (Kalisch & Bühlmann 2007) | Harder without regularization |
| Runs from empty graph | No (starts complete) | Yes |
| Order-dependence | Yes (PC-stable fixes this) | No |
| Guaranteed global consistency | Yes (oracle CI) | Yes (BIC) |
| Computational cost | $O(d^2 \cdot d^q)$ CI tests | $O(d^2)$ operators but expensive CPDAG updates |
| Robust to faithfulness violations | More fragile | More fragile (score plateau) |

In practice on synthetic Gaussian SEM data ([[NOTEARS Experiments]]), GES and
NOTEARS achieve comparable Structural Hamming Distance (SHD), both outperforming PC.

### Extensions

**FGES** (Fast GES, Ramsey et al. 2017): parallelizes the forward phase by
identifying all locally optimal inserts simultaneously. Scales to thousands of
variables. Implemented in the Tetrad/py-causal toolkit.

**GGES** (Generalized GES, Hauser & Bühlmann 2012): adds a Turn operator, enabling
GES to handle interventional data alongside observational data.

**Structural Agnostic Modeling (SAM)** and other neural-network-based scores can
replace BIC as the local scoring function.

## Examples

> [!example] Example: GES on Erdős–Rényi Graphs (from NOTEARS benchmarks)
> **Setup**: ER-2 graphs ($d=20$ nodes, expected 2 parents per node), $n=1000$,
> Gaussian noise. 12 random trials.
> **GES result** (from [[NOTEARS Experiments]] Table 1): Mean SHD ≈ 6.3 (vs.
> NOTEARS ≈ 3.8, PC ≈ 11.2). GES outperforms PC but is beaten by NOTEARS on
> dense graphs. On ER-1 (sparse), GES and NOTEARS are nearly identical.

## Connections

- [[PC Algorithm]] — the constraint-based counterpart; same output (CPDAG),
  different computational approach.
- [[DAG Structure Learning Problem]] — GES solves Program (4), the combinatorial
  score-based program, via greedy CPDAG-space search.
- [[Markov Equivalence Classes and CPDAGs]] — GES navigates the space of CPDAGs
  using the Insert/Delete operators defined there.
- [[Overfitting and Information Criteria]] — BIC is the standard score; the
  penalty $\frac{|E|}{2}\log n$ balances fit and complexity.
- [[Method of Simulated Moments]] — both GES and SMM calibrate models by
  matching statistics, but in completely different frameworks.

## See Also
- [[PC Algorithm]] — constraint-based complement
- [[Markov Equivalence Classes and CPDAGs]] — GES's search space
- [[Causal Discovery Assumptions]] — what GES requires
- [[NOTEARS - Overview]] — the continuous-optimization approach
- [[Causal Discovery Methods - Overview]] — full landscape
