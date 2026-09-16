---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002) — Optimal Structure Identification with Greedy Search, JMLR 3:507–554"
source_location: "Full paper (Theorem 15: consistency; §4–§5: FES and BES operators)"
date_ingested: 2026-09-16
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[ABM Calibration Overview]]"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) learns a causal DAG's structure by
> searching directly over the space of **Markov equivalence classes** (CPDAGs), greedily
> maximizing a decomposable score (typically BIC). Unlike the PC algorithm, GES makes no
> CI tests — it works by inserting and deleting edges one at a time, scoring each move, and
> accepting moves that improve the score. Chickering's central result (proving the Meek conjecture)
> guarantees that GES recovers the **true CPDAG** in the large-sample limit under faithfulness.
> It is the score-based counterpart to PC and the direct predecessor of NOTEARS.

## Overview

Every DAG belongs to a **Markov equivalence class**: a set of DAGs that share the same
conditional independence structure (same skeleton and same v-structures). Equivalence classes
are compactly represented by **CPDAGs** (completed partially directed acyclic graphs).

The key insight behind GES: the number of Markov equivalence classes is far smaller than the
number of DAGs, and moving between *adjacent* equivalence classes (those differing by a single
edge insertion, deletion, or reversal) is tractable via local score updates. GES exploits this
by doing a two-phase greedy search over CPDAGs rather than DAGs.

> [!definition] Decomposable Score
> A score $S(\mathcal{G})$ is **decomposable** if it factors over nodes:
> $$S(\mathcal{G}) = \sum_{i=1}^{p} s(X_i, \text{Pa}_{\mathcal{G}}(X_i))$$
> where $s(X_i, \text{Pa})$ depends only on the sufficient statistics for node $X_i$ and its
> parents. BIC, BDe/BDeu, and log-likelihood all have this form. Decomposability is essential
> for efficiently computing the score *change* when an operator modifies a single edge.
^def-decomposable-score

> [!definition] BIC Score for Gaussian DAGs
> For a Gaussian linear SEM with adjacency matrix $W$ and $n$ observations:
> $$\text{BIC}(\mathcal{G}) = \underbrace{-\frac{n}{2}\sum_{i=1}^{p}\ln\hat{\sigma}^2_i}_{\text{log-likelihood term}} - \underbrace{\frac{\ln n}{2}\sum_{i=1}^{p}|\text{Pa}_{\mathcal{G}}(X_i)|}_{\text{complexity penalty}}$$
> where $\hat{\sigma}^2_i$ is the residual variance in the regression of $X_i$ on its parents.
> The penalty selects for **sparse** graphs: adding an edge improves the score only if the
> likelihood gain exceeds $\frac{\ln n}{2}$ bits.
^def-bic

## Main Content

### GES Algorithm: Two Phases (+ Turning)

#### Phase 1: Forward Equivalence Search (FES)

> [!algorithm] Forward Phase (FES)
> Start from the empty CPDAG (no edges). Repeat until no improvement:
> 1. Consider all valid **Insert** operators: add edge $X_i \to X_j$ to some DAG in
>    the current equivalence class, orient as needed to maintain acyclicity.
> 2. Score the resulting CPDAG after each insertion.
> 3. Accept the insertion with the largest score improvement.
> Stop when no Insert operator improves the score.
^alg-fes

The **Insert** operator is formally defined as: given a CPDAG $\mathcal{C}$, the insertion of
edge $X_i \to X_j$ requires specifying a subset $T \subseteq \text{Ne}(X_j) \setminus \text{Adj}(X_i)$
(where $\text{Ne}$ are undirected neighbours) such that the resulting graph is a valid CPDAG.
Chickering (2002) provides exact characterization of valid insertions. The score change for
inserting $X_i \to X_j$ is:
$$\Delta_{\text{ins}} = s(X_j,\, \text{Pa}(X_j) \cup \{X_i\} \cup T) - s(X_j,\, \text{Pa}(X_j) \cup T)$$
This is computed in $O(p^2)$ per candidate edge using local score evaluations.

#### Phase 2: Backward Equivalence Search (BES)

> [!algorithm] Backward Phase (BES)
> Starting from the CPDAG output by FES. Repeat until no improvement:
> 1. Consider all valid **Delete** operators: remove some edge from a DAG in the
>    current equivalence class.
> 2. Score the resulting CPDAG.
> 3. Accept the deletion with the largest score improvement.
> Stop when no Delete operator improves the score.
^alg-bes

The backward phase is *not* merely undoing FES insertions. FES can overfit by adding edges
that marginally improve the score but are spurious — BES prunes these. The combination
FES+BES is stronger than either alone and is the step that Chickering proves is consistent.

#### Phase 3: Turning Phase (Hauser & Bühlmann 2012)

A third turning phase (not in the original GES paper, added by Hauser & Bühlmann 2012)
applies **Turn** operators — reversals of covered edges (edges $X \to Y$ where
$\text{Pa}(Y) = \text{Pa}(X) \cup \{X\}$) — to escape local optima reachable by neither
insertions nor deletions. It improves performance on finite samples but does not change the
asymptotic guarantee.

### Chickering's Consistency Theorem

> [!theorem] GES Consistency (Chickering 2002, Theorem 15)
> Let the data be generated by a DAG $\mathcal{G}^*$ with a Gaussian distribution satisfying
> the causal Markov condition and faithfulness. Suppose the score $S$ is decomposable and
> **consistent**: as $n \to \infty$, $S(\mathcal{G}^*) > S(\mathcal{G})$ for any
> $\mathcal{G} \not\equiv \mathcal{G}^*$ (BIC has this property). Then GES recovers the
> true CPDAG $\mathcal{C}(\mathcal{G}^*)$ with probability tending to 1 as $n \to \infty$.
^thm-ges-consistency

**Proof sketch:** The key technical result is the **Meek conjecture** (now a theorem):
given any two DAGs $G$ and $H$ where $H$ is an independence map of $G$, there exists a
sequence of edge additions and covered-edge reversals taking $G$ to $H$ such that each
intermediate graph is also an independence map of $G$. This guarantees that GES can navigate
from any starting CPDAG to the true CPDAG without getting stuck — every local maximum of the
BIC is the true CPDAG in the large-sample limit.

### Score-Equivalence and Non-Identifiability

A fundamental limitation shared with all observational causal discovery methods:
**Markov-equivalent DAGs have the same BIC score** (since they encode the same conditional
independencies and likelihood). GES can identify the equivalence class (CPDAG) but cannot
distinguish DAGs within the class without additional assumptions.

This non-identifiability can be broken by:
- **Non-Gaussian noise** (LiNGAM method — exploits non-Gaussianity to achieve full DAG identification)
- **Interventional data** (experimental manipulation fixes some variables; Hauser & Bühlmann 2012
  extend GES to use intervention targets)
- **Functional form assumptions** (additive noise models identify the full DAG from observational data)

### Comparison: PC vs. GES vs. NOTEARS

| | **PC** | **GES** | **NOTEARS** |
|---|---|---|---|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Search space** | Graphs (via CI tests) | CPDAG space | $\mathbb{R}^{d\times d}$ |
| **Key assumption** | Faithfulness + sufficiency | Faithfulness + score consistency | Linear SEM + Gaussian |
| **Output** | CPDAG | CPDAG | Adjacency matrix $\hat{W}$ |
| **Parametric?** | No (CI test choice) | Yes (Gaussian BIC standard) | Yes (linear Gaussian) |
| **Complexity** | Exp. in max degree | $O(p^3)$ per phase (BIC) | $O(d^3)$ per iter. (matrix exp.) |
| **Asymptotic guarantee** | Correct CPDAG | Correct CPDAG | Stationary point only |
| **Software** | `pcalg` (R), `causal-learn` (Python) | `ges` (Python), `bnlearn` (R) | `notears` (Python, original) |

### Software

- **R**: `pcalg` package — `ges()` function implements FES + BES; `gies()` for interventional GES.
- **Python**: `juangamella/ges` — clean GES implementation with the Hauser & Bühlmann turning phase.
  Also in `causal-learn` (pywhy) which provides unified API for PC, GES, NOTEARS, LiNGAM.
- **Score functions**: the `causal-learn` and `pcalg` packages provide BIC, BDe, and custom score
  hooks; kernel-based score extensions enable nonparametric GES.

## Examples

> [!example] GES on a Three-Variable Gaussian Example
> **Setup:** True DAG: $X \to Y \to Z$ (Gaussian SEM, $n=500$).
> BIC favors simpler models: each edge addition must increase log-likelihood by at least $\frac{\ln 500}{2} \approx 3.1$.
>
> **FES (Forward):**
> - Empty graph score: $S_0$
> - Insert $X \to Y$: BIC improves by $\delta_1 \approx 25.4 \gg 3.1$ → accept.
> - Insert $Y \to Z$: BIC improves by $\delta_2 \approx 18.2 \gg 3.1$ → accept.
> - Insert $X \to Z$: BIC improves by only $\delta_3 \approx 1.1 < 3.1$ (redundant path) → reject.
> FES terminates with CPDAG: $X - Y - Z$ (undirected skeleton with one v-structure check pending).
>
> **BES (Backward):**
> All deletion operators decrease BIC → no deletions accepted.
>
> **Output:** CPDAG $X \to Y \to Z$ (directions identified as the unique CPDAG for this skeleton).

## Connections

- **PC Algorithm** ([[PC Algorithm]]): the constraint-based alternative. PC removes edges via CI tests;
  GES inserts/deletes to maximize BIC. Both output CPDAGs. GES is generally preferred when the
  Gaussian assumption is reasonable (more power, no $\alpha$ tuning); PC is preferred for
  non-Gaussian or discrete data.
- **NOTEARS** ([[NOTEARS - Overview]]): reformulates DAG learning as continuous optimization,
  avoiding both CI tests and CPDAG search. NOTEARS is in the same comparison table in the
  NOTEARS experiments ([[NOTEARS Experiments]]) — it matches or beats GES on most benchmarks.
- **DAG Structure Learning Problem** ([[DAG Structure Learning Problem]]): the formalization GES
  solves. The NP-hardness justifies why GES does *greedy* equivalence search rather than exact search.
- **Bayesian network construction** ([[BN Construction Methods Comparison]]): GES is one of the
  main score-based BN structure learning algorithms alongside hill-climbing and exact methods.
- **ABM causal structure** ([[Summary Causal DAGs]]): causal discovery algorithms (PC, GES,
  NOTEARS) learn the graph that precedes DAG summarization in the ABM setting.
- **SMM/ABM calibration** ([[Structural Estimation of ABMs via SMM]]): ABM outputs treated as
  observational data could be analyzed with GES/PC to identify causal relationships among
  macro-level variables.

## See Also
- [[PC Algorithm]] — constraint-based alternative; same output (CPDAG), different mechanism
- [[DAG Structure Learning Problem]] — landscape of all methods, NP-hardness, score-based formulation
- [[NOTEARS - Overview]] — continuous optimization approach benchmarked against GES
- [[NOTEARS Experiments]] — GES appears in the comparison baselines
- [[BN Construction Methods Comparison]] — broader context of BN structure learning
- [[Directed Acyclic Graphs]] — the causal semantics (d-separation, do-calculus) GES discovers
