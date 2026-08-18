---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.bib]]"
source_location: "Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search, 2nd Ed.; Kalisch & Bühlmann (2007), JMLR 8:613–636"
date_ingested: 2026-08-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Causal Markov and Faithfulness]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm - Phases]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 1991/2000) is the canonical
> **constraint-based** approach to causal structure learning: it recovers the CPDAG of the
> true data-generating DAG by performing a series of **conditional independence (CI) tests**
> to prune edges from a fully connected graph, identifying v-structures, and propagating
> orientations via Meek's rules. Under faithfulness and in the Gaussian case, Kalisch &
> Bühlmann (2007) prove it is **consistent in high dimensions** ($d \gg n$, with $d = O(n^a)$).

## Overview

There are two broad paradigms for learning a DAG from observational data:

| Paradigm | Key operation | Canonical algorithm |
|----------|--------------|---------------------|
| **Constraint-based** | Test conditional independence, use CI failures to prune edges | **PC**, FCI, RFCI |
| **Score-based** | Optimize a scoring function (BIC, BDeu) over the graph space | **GES**, FGES, MMHC |
| **Continuous-optimization** | Reformulate acyclicity as a smooth constraint | **NOTEARS** |

PC is the founding constraint-based method. Its name comes from the initials of its two
inventors, Peter Spirtes and Clark Glymour, who developed it as part of the Tetrad project
at Carnegie Mellon University.

## Setting and Assumptions

PC requires four assumptions (see [[Causal Markov and Faithfulness]]):

1. **Causal Markov Condition**: the true DAG $\mathcal{G}^*$ d-separates exactly the CI
   relations in $\mathbb{P}$.
2. **Faithfulness**: every CI in $\mathbb{P}$ is represented as a d-separation in $\mathcal{G}^*$.
3. **Causal Sufficiency**: no hidden common causes — all confounders are observed.
4. **Consistent CI tests**: the chosen test has correct asymptotic Type I and II error control.

Without (3), the PC algorithm is replaced by **FCI** (Fast Causal Inference), which produces
a **PAG** (Partial Ancestral Graph) rather than a CPDAG.

## Algorithm Summary

The algorithm runs in three sequential phases:

> [!note] PC Algorithm (Spirtes et al. 2000, Algorithm 3.4; Kalisch & Bühlmann 2007)
>
> **Phase 1 — Skeleton:** Start from a complete graph. For conditioning set size
> $k = 0, 1, 2, \ldots$, test each adjacent pair $(X_i, X_j)$ for conditional independence
> given subsets $\mathbf{Z}$ of $k$ neighbors. Remove edges where independence is found;
> record the separating set $\text{Sep}(X_i, X_j) = \mathbf{Z}$.
>
> **Phase 2 — V-structures:** For each unshielded triple $X_i - X_k - X_j$
> (where $X_i \not\sim X_j$): orient as $X_i \to X_k \leftarrow X_j$ iff $X_k \notin \text{Sep}(X_i, X_j)$.
>
> **Phase 3 — Meek rules:** Propagate orientations using rules R1–R4 exhaustively.
>
> **Output:** The CPDAG $\hat{\mathcal{C}}$.

See [[PC Algorithm - Phases]] for the full formal statement of all three phases.

## Key Properties

**Consistency.** Kalisch & Bühlmann (2007) prove that for Gaussian data, PC recovers
the true CPDAG $\mathcal{C}^*$ with probability $\to 1$ as $n \to \infty$, even when
$d = O(n^a)$ for any $a > 0$, provided a **strong faithfulness** condition holds
(partial correlations bounded away from zero by $\lambda > 0$).

**Computational complexity.** The skeleton phase makes at most $O(d^{q+2})$ CI tests,
where $q$ is the maximum neighborhood size in $\mathcal{G}^*$. For sparse graphs (bounded $q$),
this is polynomial in $d$ — a key advantage over score-based methods that search
an exponential space of graphs.

**Order-dependence.** The original PC algorithm is sensitive to the ordering of variables
when multiple separating sets exist. **PC-stable** (Colombo & Maathuis 2014) addresses
this by completing all tests at each level $k$ before removing any edge.

**Output guarantees.** Under faithfulness + consistent tests, PC recovers:
- The **correct skeleton** (no false edges, no missing edges).
- The **correct v-structures** (unshielded colliders).
- The **complete CPDAG** (all identifiable orientations, via Meek rules).

## CI Test Choices

| Data type | Test | Reference |
|-----------|------|-----------|
| Gaussian (linear) | Fisher's z-test on $\hat{\rho}_{XY|\mathbf{Z}}$ | Kalisch & Bühlmann 2007 |
| Discrete | $G^2$ or $\chi^2$ | Spirtes et al. 2000 |
| Non-parametric (continuous) | HSIC-based CI test | Zhang et al. 2012 |
| Non-parametric (rank-based) | Rank PC | Harris & Drton 2013 |

## Comparison with GES and NOTEARS

| Property | PC | GES | NOTEARS |
|----------|----|----|---------|
| Output | CPDAG | CPDAG | Single DAG |
| Input | CI tests | Score function | Least-squares loss |
| Complexity (skeleton) | $O(d^{q+2})$ CI tests | Forward + backward scan | $O(d^3)$ per step |
| Assumptions | CMC + Faithfulness + Sufficiency | CMC + Faithfulness | No faithfulness needed |
| Finite-sample behavior | Accumulates CI test errors | Score fluctuations | Smooth optimization |
| Software | `pcalg` (R), `causal-learn` (Python) | `pcalg` (R), `causal-learn` | `notears` (Python) |

PC and GES target the **same object** (the CPDAG), but PC's CI-test approach makes it
sensitive to Type I/II errors in each test, while GES's score-based approach can leverage
regularization and avoids the multiple-testing burden.

## Connections to the Vault

- **DAG structure**: [[DAG Structure Learning Problem]] introduces the score-based formulation
  that motivates NOTEARS; PC is the contrasting "constraint-based" camp in its landscape table.
- **DAG semantics**: [[Directed Acyclic Graphs]] covers d-separation, which is the graphical
  concept PC exploits.
- **ABM application**: [[Summary Causal DAGs]] discusses DAG summarization of ABM outputs,
  which presupposes a DAG structure — PC or GES could be used to discover it.
- **BN construction**: [[BN Construction Methods Comparison]] and [[LLM Expert Elicitation for
  Bayesian Networks]] cover expert-elicited BN structure; PC is the data-driven alternative.
- **Bayesian structure learning**: PC gives a frequentist CPDAG; Bayesian structure learning
  (not yet in vault) places a prior over DAGs and computes a posterior over structures.

## See Also
- [[PC Algorithm - Phases]] — full algorithmic detail (all three phases + Meek rules)
- [[Causal Markov and Faithfulness]] — the assumptions PC relies on
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG target and Verma-Pearl theorem
- [[GES - Greedy Equivalence Search]] — score-based complement recovering the same CPDAG
- [[NOTEARS - Overview]] — the continuous-optimization alternative
