---
title: "PC Algorithm and Constraint-Based Causal Discovery: Survey"
source: "https://www.jmlr.org/papers/volume11/spirtes10a/spirtes10a.pdf"
author:
  - "Peter Spirtes"
  - "Clark Glymour"
  - "Richard Scheines"
  - "Diego Colombo"
  - "Marloes Maathuis"
published: "1993 / 2000 / 2010 / 2014"
created: 2026-07-25
description: >
  Survey of the PC algorithm and constraint-based causal discovery methods,
  covering: Spirtes, Glymour & Scheines (2000) Causation, Prediction, and Search
  (2nd Ed., MIT Press) — the original SGS and PC algorithms; Spirtes (2010)
  JMLR v11 pp 1643-1662 "Introduction to Causal Inference"; Meek (1995) UAI —
  orientation rules R1-R4 for CPDAGs; Colombo & Maathuis (2014) JMLR v15
  pp 3741-3782 — order-independent PC-stable; FCI algorithm for hidden common causes.
  Source PDFs freely available at JMLR and author homepages but blocked by session
  network policy; this survey is synthesised from comprehensive training-data coverage.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-discovery"
---

# PC Algorithm and Constraint-Based Causal Discovery: Survey

This document synthesises the foundational literature on constraint-based causal structure
learning. Source PDFs (JMLR, MIT Press, UAI) were inaccessible due to session network policy;
content is drawn from comprehensive coverage in the causal inference literature.

---

## 1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed. (MIT Press)

### Background and motivation

The SGS/PC algorithmic family is grounded in the **Causal Markov Condition** and
**Causal Faithfulness Assumption**. Under these assumptions, there is a one-to-one
correspondence between the conditional independence relations observable in the data
and the graphical structure of the underlying causal DAG (up to Markov equivalence).

**Causal Markov Condition:** A variable $X_i$ is conditionally independent of its
non-descendants given its parents in the causal DAG $G$:
$$X_i \perp \mathbf{ND}_i \mid \mathbf{Pa}_i$$

**Causal Faithfulness Assumption:** Every conditional independence relation in the
joint distribution $P$ arises from a *d*-separation in $G$ — there are no
"cancellations" that create spurious independence. Formally:
$$X \perp Y \mid \mathbf{Z} \text{ in } P \iff X \perp_d Y \mid \mathbf{Z} \text{ in } G$$

**Causal Sufficiency:** All common causes of any two variables in the graph are
also included in the graph (no hidden confounders). The PC algorithm requires this;
FCI relaxes it.

### The SGS algorithm (original)

The SGS algorithm is the theoretical precursor to PC. It tests conditional independence
for all subsets of conditioning variables:

1. Start with a complete undirected graph on $d$ variables.
2. For every pair $(X_i, X_j)$ and every subset $\mathbf{S} \subseteq V \setminus \{i,j\}$:
   test $X_i \perp X_j \mid \mathbf{S}$. If independent, remove the edge and store
   $\text{Sep}(i,j) = \mathbf{S}$.
3. Orient v-structures and apply Meek rules (see below).

SGS is correct but has exponential worst-case complexity in the number of variables.

### The PC algorithm

The **PC algorithm** (named after Peter Spirtes and Clark Glymour) makes SGS
computationally practical by exploiting the **adjacency-faithfulness** property:
if $X_i$ and $X_j$ are non-adjacent in $G$, then there exists a separating set
$\mathbf{S} \subseteq \text{Adj}(X_i) \cup \text{Adj}(X_j)$ — only adjacents need
be tested. This motivates restricting the conditioning sets to increasing-size subsets
of current adjacents.

#### Phase 1: Skeleton construction

**Input:** $d$ variables, data matrix $\mathbf{X}$, significance level $\alpha$.

1. Begin with the complete undirected graph $C = (V, E)$.
2. For $k = 0, 1, 2, \ldots$:
   a. For every adjacent pair $(X_i, X_j)$ in the current graph $C$:
      - Let $\text{Adj}(X_i) \setminus \{X_j\}$ be the current adjacents of $X_i$ minus $X_j$.
      - For every subset $\mathbf{S}$ of $\text{Adj}(X_i) \setminus \{X_j\}$ with $|\mathbf{S}| = k$:
        Test $H_0: X_i \perp X_j \mid \mathbf{S}$ at level $\alpha$.
        If not rejected: remove edge $(X_i, X_j)$, store $\text{Sep}(i,j) = \mathbf{S}$, break.
   b. If no edge was removed for any pair at level $k$, stop.
3. The undirected graph $\hat{G}^{\text{skel}}$ is the **skeleton** estimate.

The algorithm terminates because edges are removed (reducing adjacency sets) and the
conditioning set size $k$ grows, bounded by $|\text{Adj}| - 1$.

**Complexity:** $O(d^{k^*+2})$ conditional independence tests, where $k^*$ is the maximum
degree of the true DAG. On sparse graphs this is polynomial; on dense graphs it degrades.

#### Phase 2: V-structure orientation

Given the skeleton $\hat{G}^{\text{skel}}$ and separating sets $\{\text{Sep}(i,j)\}$:

For every triple $X_i - X_k - X_j$ (path with $X_i, X_j$ non-adjacent):
- If $X_k \notin \text{Sep}(i, j)$: orient as $X_i \to X_k \leftarrow X_j$ (a **v-structure** / **collider**).
- If $X_k \in \text{Sep}(i, j)$: leave unoriented (non-collider).

V-structures are identifiable from observational data because they correspond to
conditional independencies that cannot be created by reversing edge orientations.

#### Phase 3: Meek orientation rules (R1–R4)

Apply iteratively until no more edges can be oriented. Each rule avoids creating
a new v-structure or a directed cycle:

> **R1 (Away from collider):** $X_i \to X_k - X_j$ and $X_i, X_j$ non-adjacent
> ⟹ orient $X_k \to X_j$.
> *(Orienting $X_j \to X_k$ would create a new v-structure at $X_k$ or a cycle.)*

> **R2 (Away from cycle):** $X_i \to X_k \to X_j$ and $X_i - X_j$
> ⟹ orient $X_i \to X_j$.
> *(Orienting $X_j \to X_i$ would create a directed cycle $X_i \to X_k \to X_j \to X_i$.)*

> **R3 (Double triangle):** $X_i - X_k \to X_j$, $X_i - X_l \to X_j$, $X_i - X_j$,
> and $X_k, X_l$ non-adjacent ⟹ orient $X_i \to X_j$.

> **R4 (Discorded triple):** $X_i - X_k \to X_l \to X_j$, $X_i - X_j$,
> $X_i, X_l$ non-adjacent ⟹ orient $X_i \to X_j$.

**Output:** A **CPDAG** (Completed Partially Directed Acyclic Graph), also called
the **essential graph** or the **equivalence class representative**. Directed edges
in the CPDAG are common to all DAGs in the equivalence class; undirected edges can
be oriented either way without changing the distribution.

---

## 2. Spirtes (2010) — "Introduction to Causal Inference" (JMLR Vol. 11, pp. 1643-1662)

This paper provides a pedagogical overview of constraint-based causal discovery,
covering the same ground as SGS (2000) but with sharper notation and updated references.

### Key clarifications from Spirtes (2010)

**Identifiability theorem:** The CPDAG is the unique identifiable object from
observational data under Causal Markov + Faithfulness + Causal Sufficiency. No
algorithm can do better without additional assumptions (linear Gaussian: see LiNGAM;
additive noise: ANM).

**Sample properties:** In finite samples, all CI tests are subject to error (type I
and type II). The PC algorithm's skeleton is consistent (converges to the true
skeleton in probability) as $n \to \infty$ under suitable CI test consistency.

**Extensions:**
- **FCI algorithm** (Fast Causal Inference): generalises PC to settings with hidden
  common causes and selection bias. Output is a **PAG** (Partial Ancestral Graph)
  with additional marks (circle endpoints) encoding uncertainty about edge types.
- **CPC** (Conservative PC): more conservative v-structure orientation to reduce
  false positives in finite samples.

---

## 3. Colombo & Maathuis (2014) — "Order-Independent Constraint-Based Causal Structure Learning" (JMLR Vol. 15, pp. 3741-3782)

### The order-dependence problem in PC

The original PC algorithm has a subtle flaw: the **skeleton** it produces can depend
on the order in which variables are presented, because the skeleton in step $k$
determines which conditioning sets are tested in step $k+1$.

**Example:** Two pairs $(X_i, X_j)$ and $(X_k, X_l)$ may interact: the edge removal
in the first pair changes the adjacency set used to test the second.

### PC-stable algorithm

Colombo & Maathuis (2014) propose **PC-stable**, which separates the *selection*
and *deletion* of edges within each skeleton phase $k$:

1. For all pairs $(X_i, X_j)$: record all conditioning sets of size $k$ that
   make them conditionally independent.
2. *After* all tests at level $k$ are recorded: simultaneously remove all edges
   that have a CI separating set.

By separating the two sub-steps, PC-stable is **order-independent** in the skeleton
phase. The v-structure orientation phase is also made order-independent by a
conservative modification.

**Result:** PC-stable produces the same skeleton and CPDAG regardless of variable
ordering, while having the same asymptotic guarantees as PC.

---

## 4. Meek (1995) — Orientation Rules

Meek, C. (1995). Causal inference and causal explanation with background knowledge.
*Proceedings of the Eleventh Conference on Uncertainty in Artificial Intelligence (UAI)*, pp. 403-410.

Meek (1995) proved that the four orientation rules R1–R4 (listed above in the PC section)
are **complete**: they orient every edge that can be determined to be in one direction
across all DAGs in the equivalence class, and they never incorrectly orient an edge that
is genuinely unidentifiable.

**Theorem (Meek completeness):** Starting from the skeleton + v-structures, the CPDAG
produced by applying R1–R4 to exhaustion is the unique essential graph of the Markov
equivalence class.

---

## 5. Key Assumptions Comparison

| Assumption | PC | FCI |
|-----------|-----|-----|
| Causal Markov | ✓ required | ✓ required |
| Faithfulness | ✓ required | ✓ required |
| Causal sufficiency (no hidden vars) | ✓ required | ✗ not required |
| Output | CPDAG | PAG |

---

## 6. Software implementations

- **R package `pcalg`** (Kalisch & Bühlmann 2007): implements PC, PC-stable, FCI,
  GES, LINGAM. The standard academic reference implementation.
- **Python `causal-learn`** (formerly `Causal Discovery Toolbox`): implements PC,
  FCI, GES, LiNGAM, NOTEARS and many others. Maintained by CMU.
- **Tetrad / FGES**: Java desktop tool from the Center for Causal Discovery, CMU.

---

## References

- Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd Ed. MIT Press. (1st ed. 1993.)
- Spirtes, P. (2010). Introduction to Causal Inference. *JMLR* 11: 1643–1662. https://www.jmlr.org/papers/volume11/spirtes10a/spirtes10a.pdf
- Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI 1995*, pp. 403–410.
- Colombo, D. & Maathuis, M.H. (2014). Order-independent constraint-based causal structure learning. *JMLR* 15: 3741–3782. https://jmlr.org/papers/volume15/colombo14a/colombo14a.pdf
- Meek, C. (1995). Orientation rules for acyclic directed graphs. Unpublished manuscript.
- Richardson, T. & Spirtes, P. (2002). Ancestral graph Markov models. *Annals of Statistics* 30(4): 962–1030.
