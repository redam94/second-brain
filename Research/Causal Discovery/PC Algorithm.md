---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-causal-structure-learning-survey.md]]"
source_location: "§2 — Spirtes & Glymour (1991); Spirtes, Glymour & Scheines (2000) Ch. 5"
date_ingested: 2026-07-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Discovery Algorithms - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - Peter-Clark algorithm
  - PC-stable
  - Conservative PC
  - CPC
  - constraint-based structure learning
  - skeleton discovery
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991; SGS 2000) is the canonical
> *constraint-based* method for learning a Bayesian network structure (CPDAG) from observational
> data. It runs in three phases: (1) discover the skeleton by removing edges between conditionally
> independent pairs; (2) orient unshielded colliders (v-structures); (3) propagate orientations
> using Meek's rules. Under faithfulness and Markov conditions, PC is consistent — it asymptotically
> recovers the true CPDAG. The key practical advantage is flexibility: any statistical CI test
> can be plugged in, enabling use with Gaussian, discrete, or nonparametric data.

## Overview

The PC algorithm is the prototypical **constraint-based** approach to causal discovery — one of
the three families covered in the Causal Discovery section (alongside score-based [[Greedy Equivalence Search]]
and continuous-optimisation [[NOTEARS Algorithm|NOTEARS]]). Its name honours its inventors:
**P**eter Spirtes and **C**lark Glymour of Carnegie Mellon University.

The fundamental insight is that conditional independence (CI) relations in data encode d-separations
in the true DAG (under faithfulness), and CI tests can therefore reconstruct the graph. The output
is a **CPDAG** — the unique representation of the [[Markov Equivalence and CPDAGs|Markov equivalence class]]
of the true DAG. Under faithfulness, the CPDAG is the best achievable from observational data alone.

## Main Content

### Inputs and assumptions

> [!definition] PC Algorithm Setup (SGS 2000)
> - **Input**: Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; a conditional independence
>   oracle (in practice: a statistical test at level $\alpha$); variable set $\mathbf{V} = \{X_1,\ldots,X_d\}$.
> - **Output**: A CPDAG over $\mathbf{V}$.
> - **Assumptions**:
>   1. *Markov condition*: $\mathbb{P}$ is Markov with respect to true DAG $G^*$.
>   2. *Faithfulness*: all CI relations in $\mathbb{P}$ are entailed by d-separations in $G^*$.
>   3. *Causal sufficiency*: all common causes of variables in $\mathbf{V}$ are themselves in $\mathbf{V}$
>      (no hidden confounders). The **FCI algorithm** relaxes this assumption.
^def-pc-setup

### Phase 1: Skeleton discovery

> [!definition] Skeleton Discovery (PC Phase 1)
> **Initialize**: Set $H^0 = K_d$ (complete undirected graph). Let $\mathrm{sep}(X,Y) = \emptyset$ for all pairs.
>
> **For** $l = 0, 1, 2, \ldots$:
> 1. **For each** adjacent pair $(X, Y)$ in the current graph $H^l$:
>    - **For each** subset $S \subseteq \mathrm{adj}_{H^l}(X) \setminus \{Y\}$ with $|S| = l$:
>      - Test $H_0: X \perp\!\!\!\perp Y \mid S$ (using the chosen CI test at level $\alpha$).
>      - If accepted: **remove** edge $X - Y$; record $\mathrm{sep}(X, Y) := \mathrm{sep}(Y, X) := S$; break inner loop.
> 2. Increment $l$.
> 3. **Terminate** when for all adjacent pairs $(X, Y)$: $|\mathrm{adj}(X)| - 1 < l$.
>
> **Output**: Skeleton $H$; separating sets $\{\mathrm{sep}(X, Y)\}$.
^def-skeleton-discovery

**Key properties**:
- Tests subsets of increasing size — prioritises low-order CI tests (fast for sparse graphs).
- Under faithfulness: if $X \perp\!\!\!\perp Y \mid S$ for the true separating set $S^*$, then $X$ and $Y$ are not adjacent in the true DAG. So skeleton removal is correct.
- Under Max-degree $\leq k$: at most $O(d^{k+2})$ CI tests are performed — polynomial in $d$ for fixed $k$.

### Phase 2: V-structure orientation

> [!definition] V-structure Orientation (PC Phase 2)
> For each *unshielded triple* $(X, Z, Y)$ — meaning $X$ adj $Z$, $Z$ adj $Y$, and $X$ NOT adj $Y$:
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure / collider).
> - Else: leave $X - Z - Y$ undirected.
^def-vstructure-orient

**Intuition**: If $Z$ was **in** the separating set of $X$ and $Y$, conditioning on $Z$ blocked the path
$X - Z - Y$ — so $Z$ is not a collider. If $Z$ was **not** in the separating set, the path $X - Z - Y$
was already d-separated without conditioning on $Z$. The only structure consistent with this is
$X \to Z \leftarrow Y$ (a v-structure), because colliders are naturally blocked without conditioning.

### Phase 3: Edge orientation propagation

Apply Meek's rules R1–R3 (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]]) repeatedly until
no further edge can be oriented. This orients any remaining "compelled" edges — edges that would
introduce a new v-structure or directed cycle if reversed.

**Output**: CPDAG.

### Soundness and consistency

> [!theorem] PC Soundness and Consistency (SGS 2000, Meek 1995)
> Under the Markov condition, faithfulness, and causal sufficiency:
> 1. **(Soundness)**: Every orientation the PC algorithm makes is correct — the output CPDAG
>    contains only edges and orientations present in the true CPDAG.
> 2. **(Completeness / Consistency)**: As $n \to \infty$, using a consistent CI test, the PC algorithm
>    outputs the true CPDAG with probability approaching 1.
^thm-pc-consistency

The consistency proof relies on the CI tests converging to the correct conclusions (accept/reject
the true CI/non-CI relations) as $n \to \infty$ — satisfied by Fisher's Z-test under Gaussianity,
and by G²/KCIT tests under their respective model assumptions.

### Order-dependence and PC-stable

A subtle finite-sample pathology of the original PC: the **output can depend on the ordering of
variables** passed to the algorithm. In Phase 1, when two CI tests about adjacent pairs $(X,Y)$ and
$(U,V)$ disagree (one edge should be removed but two tests give conflicting results due to sampling
error), the order in which pairs are processed determines which edge is removed first — changing the
adjacency set for later tests.

> [!definition] PC-stable (Colombo & Maathuis 2014)
> **PC-stable** is a modification of the PC algorithm that fixes order-dependence in the skeleton
> by collecting *all* edges to remove at level $l$ before removing any:
> - At each level $l$: determine all pairs $(X, Y)$ where some $S$ d-separates them at level $l$,
>   using the adjacency sets from the **start** of level $l$ (not updated mid-level).
> - Remove all such edges simultaneously; then advance to level $l+1$.
>
> PC-stable is fully order-independent in the skeleton; residual order-dependence in v-structure
> orientation (Phase 2) is handled by *Conservative PC* (CPC).
^def-pc-stable

### Conditional independence tests

| Data type | Test | Statistic | Notes |
|-----------|------|-----------|-------|
| Continuous / Gaussian | **Fisher's Z-test** | $Z = \tanh^{-1}(\hat\rho_{XY\mid S})\sqrt{n - |S| - 3}$ | Fast; exact under Gaussianity |
| Discrete | **G²-test** | $2\sum_{x,y,s} c_{xys} \log\frac{c_{xys} c_s}{c_{xs} c_{ys}}$ | Can be sparse in high dim |
| Discrete | **χ²-test** | Pearson chi-squared | Similar; G² preferred |
| Nonparametric | **KCIT** (Kernel CI Test) | Hilbert-Schmidt Independence Criterion | Slow; handles complex distributions |
| Mixed / general | **CMIknn** | KNN conditional mutual information | Practical for moderate $n, d$ |

Under Gaussian data, the PC algorithm with Fisher's Z-test has $O(d^{k+2})$ complexity where $k$
is the max degree — competitive with GES for sparse graphs.

## Examples

> [!example] PC algorithm on a 4-node DAG
> **True DAG**: $X_1 \to X_3$, $X_2 \to X_3$, $X_3 \to X_4$ (a chain/collider hybrid).
>
> **Phase 1** (Gaussian data, Fisher's Z at $\alpha=0.05$):
> - $l=0$: Test all unconditional pairs. Accept $X_1 \perp\!\!\!\perp X_2$ (they are unconditionally
>   independent — no direct edge and $X_3$ is a collider blocking the path). Remove $X_1 - X_2$.
>   Accept $X_1 \perp\!\!\!\perp X_4 \mid X_3$ at level $l=1$. Remove $X_1 - X_4$.
>   Similarly remove $X_2 - X_4$.
> - Skeleton: $\{X_1 - X_3, X_2 - X_3, X_3 - X_4\}$.
>
> **Phase 2** (v-structures): Unshielded triple $(X_1, X_3, X_2)$ — $X_3 \notin \mathrm{sep}(X_1, X_2) = \emptyset$.
> Orient as $X_1 \to X_3 \leftarrow X_2$ (v-structure).
>
> **Phase 3** (Meek R1): $X_1 \to X_3 - X_4$, and $X_1$ not adjacent to $X_4$. Apply R1: orient
> $X_3 \to X_4$.
>
> **Output CPDAG**: $X_1 \to X_3 \leftarrow X_2 \to X_4$ — matches the true DAG, fully oriented.
^ex-pc-4node

## Connections

- **GES** ([[Greedy Equivalence Search]]): score-based alternative to PC. Under faithfulness, both
  asymptotically recover the same CPDAG; GES is often more accurate in finite samples on Gaussian data.
- **NOTEARS** ([[NOTEARS Algorithm]]): continuous-optimisation alternative. Outputs a single DAG rather
  than a CPDAG; different consistency assumptions (LS consistency without faithfulness).
- **FCI (Fast Causal Inference)**: extension of PC that allows hidden common causes (no causal
  sufficiency assumption); outputs a PAG (Partial Ancestral Graph) instead of a CPDAG.
- **LiNGAM**: exploits non-Gaussianity to go beyond MEC identification, recovering the full DAG.
- **TETRAD software** (CMU): reference implementation of PC-stable and CPC; also includes GES, FCI.
- **Sachs et al. (2005)** protein signalling network: canonical benchmark for PC and GES — 11 proteins,
  cytometry data, interventional gold standard available.

## See Also
- [[Markov Equivalence and CPDAGs]] — v-structures, CPDAG definition, Meek rules (used in Phase 2-3)
- [[DAG Structure Learning Problem]] — problem setup, NP-hardness, landscape table of methods
- [[Directed Acyclic Graphs]] — d-separation, fork/chain/collider (needed to understand PC's phases)
- [[Greedy Equivalence Search]] — score-based counterpart; same CPDAG output
- [[Causal Discovery Algorithms - Comparison]] — when to use PC vs GES vs NOTEARS
- [[NOTEARS Experiments]] — experimental comparison that benchmarks PC-stable vs FGS vs NOTEARS
