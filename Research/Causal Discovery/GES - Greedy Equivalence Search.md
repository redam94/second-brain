---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-arxiv-final.pdf]]"
source_location: "§3.1 Greedy Equivalence Search, pp. 4-5; §4 Selective GES, pp. 5-6"
date_ingested: 2026-10-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "SGES"
  - "Chickering 2002"
  - "FES"
  - "BES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> method for learning Bayesian network structure. It searches through the space of
> **Markov equivalence classes** (represented as CPDAGs) using two greedy phases: a
> **forward phase** (FES) that adds edges until no insert improves the score, and a
> **backward phase** (BES) that removes edges until no delete improves the score.
> Under a **consistent, decomposable, score-equivalent** score (e.g., BIC) and faithfulness,
> GES **provably identifies the true CPDAG** in the large-sample limit — without ever testing
> any conditional independence directly.

## Overview

Constraint-based methods (the [[PC Algorithm]]) accumulate CI test errors across many tests.
Score-based methods avoid this by operating on a single global objective: choose the graph
that maximizes a penalized likelihood score. The challenge is that the space of DAGs is
combinatorially large ($> 2^{d(d-1)/2}$ graphs on $d$ nodes).

GES solves this by searching through the space of **equivalence classes** (CPDAGs) rather
than individual DAGs. Because a score-equivalent score assigns identical scores to all DAGs
in the same equivalence class, this space is the natural domain. Each search step transitions
between adjacent equivalence classes using **insert** and **delete** operators, scored
locally using the decomposability property.

**Key advantages over constraint-based:**
- No individual CI tests — more robust to variable ordering and finite-sample CI errors.
- Directly optimizes a global objective (BIC or Bayesian score).
- Polynomial time when the CPDAG is sparse (bounded clique size).

## Main Content

### Score Requirements

> [!definition] Definition: Score Properties for GES (Chickering 2002; Chickering & Meek)
> A DAG scoring function $\text{Score}(\mathcal{G}, \mathbf{D})$ must satisfy three properties
> for GES to be correct:
>
> 1. **Score-equivalent:** Equivalent DAGs $\mathcal{G} \approx \mathcal{G}'$ receive the same
>    score: $\text{Score}(\mathcal{G}, \mathbf{D}) = \text{Score}(\mathcal{G}', \mathbf{D})$.
>    This ensures the search through CPDAG space is well-defined.
>
> 2. **Decomposable:** The score factors over variables:
>    $$\text{Score}(\mathcal{G}, \mathbf{D}) = \sum_{i=1}^{d} \text{Score}(X_i, \mathrm{Pa}^{\mathcal{G}}(X_i), \mathbf{D})$$
>    so each insert/delete operator changes only the local scores of affected nodes.
>
> 3. **Locally consistent:** In the large-sample limit, (1) if $\mathcal{G}$ contains an
>    incorrect independence (i.e., $\mathcal{G}$ is *not* an IMAP of the true graph), the
>    score prefers edge additions that remove that spurious independence; (2) if $\mathcal{G}$
>    *is* an IMAP of the true graph, the score prefers edge deletions that remove incorrect
>    dependencies.
^def-score-properties

> [!example] BIC Score (most common in practice)
> For Gaussian data with $n$ observations:
> $$\text{BIC}(\mathcal{G}, \mathbf{D}) = \log p(\mathbf{D} \mid \hat{\theta}_{\mathcal{G}}) - \frac{|\mathcal{G}|}{2} \log n$$
> where $|\mathcal{G}|$ is the number of parameters. BIC is score-equivalent (DAGs in the same
> MEC have the same log-likelihood when optimized), decomposable (the likelihood factors over
> nodes given a DAG), and locally consistent (the penalty $\frac{1}{2}\log n$ per parameter is
> consistent). BGe (Bayesian Gaussian equivalent) score satisfies the same properties.

### The GES Algorithm

> [!definition] Algorithm: GES (Chickering 2002; Chickering & Meek, Figure 1)
> ```
> GES(Data D):
>   C ← FES(D)          # Forward Equivalence Search
>   C ← BES(D, C)       # Backward Equivalence Search
>   return C             # CPDAG
> ```
> Two phases operate on the CPDAG representation and return a CPDAG.
^alg-ges

#### Phase 1: Forward Equivalence Search (FES)

> [!definition] Algorithm: FES — Forward Phase
> Start from $\mathcal{C}_0 = $ empty CPDAG (no edges). Repeat:
> 1. Evaluate all **insert operators** $\text{Insert}(X, Y, \mathbf{H})$ for every non-adjacent
>    pair $(X, Y)$ and every valid subset $\mathbf{H}$ of the neighbors of $Y$ (see below).
> 2. If any insert operator has a **positive score improvement**: apply the highest-scoring one,
>    obtain the new CPDAG $\mathcal{C}_{k+1}$.
> 3. Stop when no insert operator improves the score.
^alg-fes

The **Insert operator** $\text{Insert}(X, Y, \mathbf{H})$ adds a directed edge $X \to Y$ to
the current CPDAG and re-orients the edges in $\mathbf{H}$ from undirected to pointing at $Y$.
The preconditions ensure the result is a valid CPDAG:
- $X$ and $Y$ are not adjacent in $\mathcal{C}$.
- $\mathbf{H} \subseteq \mathbf{NA}_{Y,X} = \text{neighbors of } Y \text{ that are also adjacent to } X$.
- $\mathbf{T} \cup \{X\}$ is a clique in $\mathcal{C}$, where $\mathbf{T} = \mathbf{NA}_{Y,X} \setminus \mathbf{H}$.

After applying the insert operator, the resulting PDAG is completed to a CPDAG using the
PDAG-completion algorithm of Dor & Tarsi (1992), at cost $O(d \cdot e)$ for a graph with $e$ edges.

#### Phase 2: Backward Equivalence Search (BES)

> [!definition] Algorithm: BES — Backward Phase
> Starting from the CPDAG $\mathcal{C}$ returned by FES. Repeat:
> 1. Evaluate all **delete operators** $\text{Delete}(X, Y, \mathbf{H})$ for every adjacent
>    pair $(X, Y)$ and every valid $\mathbf{H}$.
> 2. If any delete operator has a **positive score improvement**: apply the highest-scoring one.
> 3. Stop when no delete operator improves the score.
^alg-bes

The **Delete operator** $\text{Delete}(X, Y, \mathbf{H})$ (Chickering & Meek, Figure 2):
- **Preconditions:** $X$ and $Y$ are adjacent; $\mathbf{H} \subseteq \mathbf{NA}_{Y,X}$;
  $\bar{\mathbf{H}} = \mathbf{NA}_{Y,X} \setminus \mathbf{H}$ is a clique.
- **Scoring:** $\text{Score}(Y, \{\mathrm{Pa}^{\mathcal{C}}_Y \cup \bar{\mathbf{H}}\} \setminus X) - \text{Score}(Y, \mathrm{Pa}^{\mathcal{C}}_Y \cup \bar{\mathbf{H}})$
- **Transformation:** Remove edge $(X, Y)$; for each $H \in \mathbf{H}$, replace $Y \text{—} H$
  with $Y \to H$; convert to CPDAG.

The backward phase corrects the overfitting from FES: FES finds an IMAP of $\mathcal{G}^*$
(a graph with too many edges, all in the correct direction asymptotically), and BES removes
the spurious edges to recover the true CPDAG.

### Large-Sample Correctness

> [!theorem] Theorem 1 (Chickering 2002; Chickering & Meek, p. 5)
> Let $\mathcal{C}$ be the CPDAG returned by GES on $m$ records sampled from a distribution
> that is **perfect** with respect to DAG $\mathcal{G}^*$. Then in the limit of large $m$:
> $$\mathcal{C} \approx \mathcal{G}^*$$
> That is, GES recovers the **CPDAG** of the true generating DAG in the large-sample limit.
>
> **Proof sketch:** (1) FES converges to a CPDAG for which $\mathcal{G}^* \leq \mathcal{C}$
> (i.e., $\mathcal{G}^*$ is an IMAP of $\mathcal{C}$). (2) BES then deletes all spurious
> edges, each of which has a negative score contribution in large data — by local consistency.
> The result follows from Meek's Conjecture (proved by Chickering 2002): there is always a
> path of covered edge reversals from $\mathcal{G}^*$ to a DAG equivalent to $\mathcal{C}$
> that maintains the IMAP ordering.
^thm-ges-correctness

### Selective GES (SGES)

Chickering & Meek (the paper in this vault) extend GES to **SGES** (Selective GES), which:
- Restricts the backward phase to a subset of delete operators: those satisfying a
  **$\Pi$-consistent** property for a hereditary, equivalence-invariant graph property $\Pi$.
- Achieves the same large-sample guarantees as GES (Theorem 3 of SGES paper) but with
  **polynomial complexity** in the number of score evaluations when $\Pi$ imposes a bounded
  graph measure such as maximum parent-set size, maximum clique size, or **v-width** (a new
  measure defined by the authors, tighter than clique size).

SGES is useful when the backward phase is the bottleneck: for dense graphs or large $d$,
GES's worst-case exponential branching is replaced by polynomial enumeration.

### GES Complexity

Without structural constraints, GES's worst case is exponential in $d$ (the backward phase
can have exponentially many valid delete operators per step). In practice:
- **Sparse graphs with bounded degree $k$**: $O(d^{k+2})$ time, same as PC.
- **Gaussian data with BIC score**: the local score evaluations dominate, each taking
  $O(n \cdot k^2)$ for regression with $k$ parents.

Modern implementations (FGS/FGES in Tetrad; ges in `causal-learn`) use priority queues and
memoization to handle hundreds of variables.

## Comparison with Constraint-Based (PC)

| Criterion | PC | GES |
|-----------|-----|-----|
| **Error accumulation** | Each CI test can err; errors compound | Single global objective; no CI tests |
| **Finite-sample behavior** | Depends heavily on CI test calibration | Depends on score overfitting correction |
| **Assumptions** | Markov, Faithfulness, Sufficiency | Markov, Faithfulness, Sufficiency + score choice |
| **Non-Gaussian data** | Easy (just swap CI test) | Harder (need a non-Gaussian score) |
| **Discovery of v-structures** | Explicit via sepsets | Implicit via FES greedy structure |
| **Speed** | Often faster for sparse graphs | Often faster for denser graphs |
| **Output** | CPDAG | CPDAG |

In the NOTEARS experiments (Zheng et al. 2018), GES (labeled "FGS" in the paper — Fast GES
implementation in Tetrad) and PC are the two main baselines. NOTEARS outperforms both on
dense graphs; all three are comparable on sparse graphs.

## Software

- **R — `pcalg`**: `ges()` function implements GES with BIC (Gaussian) or BGe scores; the
  default. `pcalg` is the reference implementation by Maathuis, Kalisch & Bühlmann.
- **Python — `causal-learn`** (py-why): `GES` class with BIC and other score options.
- **Java — Tetrad**: `FGES` (Fast GES) is a parallelized implementation, orders of magnitude
  faster for large $d$; used in bioinformatics and genome-wide association studies.

## Connections

- **CPDAG space**: GES's search domain is the space of [[Markov Equivalence Classes and CPDAGs|CPDAGs]].
  Every state in the search is a CPDAG; insert/delete operators move between adjacent CPDAGs.
- **Constraint-based alternative**: [[PC Algorithm]] — finds the same CPDAG via CI tests.
- **NOTEARS**: [[NOTEARS - Overview]] — continuous optimization that returns a single DAG (in
  an MEC); GES and PC are baselines in the NOTEARS experiments.
- **BIC score**: connects to [[Overfitting and Information Criteria]] — BIC is the standard
  model-selection criterion for consistent structure recovery.
- **Bayesian networks**: [[LLM Expert Elicitation for Bayesian Networks]] — once the BN
  structure is learned (by GES or expert), this covers eliciting the CPTs.
- **ABM causal discovery**: ABM output data can be treated as observations for GES; the
  learned CPDAG would be a data-derived structural summary preceding [[Summary Causal DAGs]].

## See Also
- [[PC Algorithm]] — constraint-based complement to GES
- [[Markov Equivalence Classes and CPDAGs]] — the object GES searches through
- [[DAG Structure Learning Problem]] — sets up the score-based program GES solves
- [[NOTEARS - Overview]] — continuous alternative; GES is a baseline
- [[NOTEARS Experiments]] — empirical comparison of PC, GES/FGS, and NOTEARS
- [[Causal Discovery/_Index|Causal Discovery Index]]
