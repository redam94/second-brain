---
title: "PC Algorithm - Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/textbook
source: "[[raw/spirtes-glymour-scheines-2000-CPS.pdf]]"
source_location: "Ch. 5–6, pp. 84–134 (PC algorithm, skeleton learning, orientation)"
date_ingested: 2026-08-19
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Structure Learning - Methods Comparison]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm — Constraint-Based Causal Discovery

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** method for learning the structure of a DAG from observational
> data. It operates by conducting **conditional independence tests** — not by optimising a score
> — progressively pruning a complete graph and then orienting the remaining edges via
> **v-structure** detection and the four **Meek orientation rules**. Under the Markov,
> faithfulness, and causal sufficiency assumptions, PC consistently recovers the true DAG's
> **Markov equivalence class**, represented as a **CPDAG**.

## Overview

While score-based methods (GES, NOTEARS) optimise a function over DAGs or matrices, **constraint-based** methods take a different path: they ask, for each pair of variables, whether there exists a subset $S$ of other variables that renders them conditionally independent. The presence or absence of such a **separating set** (`sep-set`) directly encodes the edge structure of the underlying DAG via the **global Markov property**.

The PC algorithm is named after its creators, **P**eter Spirtes and **C**lark Glymour. It was first described in Spirtes & Glymour (1991) and systematically developed in the landmark monograph *Causation, Prediction, and Search* (Spirtes, Glymour & Scheines 2000). It is implemented in the `pcalg` R package (`pc()`) and the `causal-learn` Python library.

## Main Content

### Foundational Assumptions

The PC algorithm relies on three assumptions that are untestable from observational data alone:

> [!definition] Definition: Causal Markov Condition
> The joint distribution $P(X_1,\ldots,X_d)$ factorises according to the DAG $G$:
> $$P(X_1,\ldots,X_d) = \prod_{j=1}^{d} P(X_j \mid \mathrm{pa}_G(X_j))$$
> where $\mathrm{pa}_G(X_j)$ is the set of parents of $X_j$ in $G$.
> Equivalently: every variable is conditionally independent of its non-descendants
> given its parents in $G$.
^def-markov

> [!definition] Definition: Faithfulness
> The distribution $P$ is **faithful** to $G$ if the only conditional independences in $P$
> are those entailed by d-separation in $G$. Formally:
> $$X_i \perp\!\!\!\perp X_j \mid S \;\Leftrightarrow\; X_i \text{ and } X_j \text{ are d-separated by } S \text{ in } G.$$
> Without faithfulness, spurious independences caused by parameter cancellations could lead
> to incorrectly removed edges.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> There are **no hidden common causes**: every common cause of two observed variables is
> itself observed. Equivalently, no latent confounders. This rules out the FCI algorithm's
> setting and restricts PC to closed systems.
^def-causal-sufficiency

### The Three Phases of PC

**Phase 1 — Skeleton Learning.**
Start with a complete undirected graph $K_d$ on $d$ nodes. Remove edge $i$–$j$ if there
exists a set $S_{ij} \subseteq V \setminus \{i,j\}$ such that $X_i \perp\!\!\!\perp X_j \mid S_{ij}$.
The algorithm tests conditioning sets of increasing cardinality $|S| = 0, 1, 2, \ldots$ and
restricts candidate conditioning sets to the **current adjacency set** of $i$ or $j$, making the
search efficient (at most $O(d^{k_{\max}})$ tests for max degree $k_{\max}$).

> [!example] Example: Skeleton Discovery on 4 Nodes
> Variables: $A, B, C, D$ with true DAG $A \to B \to C \to D$.
>
> - Start: all 6 edges present.
> - $|S|=0$: Test all pairs. $A \perp\!\!\!\perp C$? No (B is intermediate). $A \perp\!\!\!\perp D$? No. $B \perp\!\!\!\perp D$? No. $A \perp\!\!\!\perp C$? No marginally…
>   Actually check $A \perp\!\!\!\perp D$? If we condition on $B$ and $C$: yes. But first test marginal.
>   Let's say only $A \perp\!\!\!\perp D$ marginally (plausible with the right params). Edge $A$–$D$ removed; $\mathrm{sep}(A,D) = \emptyset$.
> - $|S|=1$: Test $A$–$C$ conditional on $\{B\}$: $A \perp\!\!\!\perp C \mid B$ — yes (B is on the only path). Remove $A$–$C$; $\mathrm{sep}(A,C) = \{B\}$.
> - $|S|=1$: Test $B$–$D$ conditional on $\{C\}$: $B \perp\!\!\!\perp D \mid C$ — yes. Remove $B$–$D$; $\mathrm{sep}(B,D) = \{C\}$.
> - Remaining skeleton: $A$–$B$–$C$–$D$ (a path graph). ✓

**Phase 2 — V-Structure Orientation.**
For each **unshielded triple** $i$–$j$–$k$ (where $i$ and $k$ are *not* adjacent), check
whether $j \in \mathrm{sep}(i,k)$.

- If $j \notin \mathrm{sep}(i,k)$: orient as the **v-structure** (collider) $i \to j \leftarrow k$.
- If $j \in \mathrm{sep}(i,k)$: leave unoriented (not a collider).

This step is the primary source of orientational information from observational data.

> [!note] Why v-structures are identifiable
> Colliders and non-colliders produce different conditional independence patterns:
> in a fork $i \leftarrow j \rightarrow k$, conditioning on $j$ *blocks* the path (independence);
> in a collider $i \rightarrow j \leftarrow k$, conditioning on $j$ *opens* the path (dependence).
> The sep-set from Phase 1 records exactly which pattern held.

**Phase 3 — Meek Orientation Rules.**
To orient remaining undirected edges without creating new v-structures or cycles, PC applies the
four **Meek rules** (Meek 1995) repeatedly until no more orientations are possible:

> [!theorem] Meek's Four Orientation Rules (Meek 1995)
> Let $i$–$j$ be an unoriented edge. Orient $i \to j$ if any of the following hold:
>
> **R1 — Acyclicity:** There is an oriented $k \to i$ and $k$ is not adjacent to $j$
> (orienting $i \leftarrow j$ would create a new v-structure $k \to i \leftarrow j$, contradiction).
>
> **R2 — Acyclicity:** There is a directed path $i \to k \to j$
> (orienting $i \leftarrow j$ would create a directed cycle $i \leftarrow j \to k \to i$, contradiction).
>
> **R3 — Meek:** There are nodes $k$ and $l$ such that $k \to j$, $l \to j$, $k$–$i$–$l$ are
> unoriented, $k$ and $l$ are not adjacent, and $i$ is adjacent to $j$
> (the only acyclic non-v-structure consistent assignment forces $i \to j$).
>
> **R4 — Meek:** There are nodes $k$ and $l$ such that $l \to k \to j$ with $l$–$i$ and $i$–$j$
> unoriented and $l$ not adjacent to $j$
> (forces $i \to j$ to avoid a new collider).
^thm-meek-rules

### Output: The CPDAG

The PC algorithm returns a **Completed Partially Directed Acyclic Graph (CPDAG)**, also called the
**essential graph** of the Markov equivalence class:

> [!definition] Definition: CPDAG / Essential Graph
> A CPDAG is a graph with both directed and undirected edges representing a **Markov
> equivalence class** — the set of all DAGs with the same skeleton and same v-structures.
> - A **directed edge** $i \to j$ in the CPDAG appears with the same orientation in *every*
>   member of the equivalence class.
> - An **undirected edge** $i$–$j$ can be oriented either way in some member of the class.
>
> Two DAGs are Markov equivalent iff they have the same skeleton and the same set of unshielded
> colliders (Verma & Pearl 1990).
^def-cpdag

### Conditional Independence Tests in Practice

The PC algorithm is agnostic about the CI test used — the appropriate test depends on the
data type:

| Setting | CI Test | Test Statistic |
|---------|---------|----------------|
| Gaussian / linear | Fisher's Z-test on partial correlations | $z = \frac{1}{2}\ln\frac{1+\hat{\rho}}{1-\hat{\rho}} \sim \mathcal{N}(0, (n-|S|-3)^{-1})$ |
| Discrete | $G^2$ or $\chi^2$ test | On contingency tables |
| Non-parametric | Kernel CI test (KCI), HSIC | Hilbert-Schmidt independence criterion |
| Mixed | Conditional mutual information | With appropriate estimators |

For Gaussian data, the partial correlation $\hat{\rho}_{ij|S}$ is computed from the inverse
covariance matrix (precision matrix): $\hat{\rho}_{ij|S} = -\Sigma^{-1}_{ij}/\sqrt{\Sigma^{-1}_{ii}\Sigma^{-1}_{jj}}$.

### Complexity and High-Dimensional Behaviour

- **Time complexity**: $O(d^{k_{\max}+2})$ independence tests, where $k_{\max}$ is the maximum
  degree in the skeleton. When the true DAG is sparse ($k_{\max}$ small), this is polynomial in $d$.
- **Sample complexity**: requires $\Omega(\log d)$ samples for the CI tests to have adequate power.
  Kalisch & Bühlmann (2007) established that PC is **consistent in high dimensions** ($d = O(n^\alpha)$
  for some $\alpha > 0$) under a **strong faithfulness** condition.
- **Order-dependence**: the original PC algorithm's skeleton phase is **order-dependent** (results
  depend on the order in which CI tests are applied). Colombo & Maathuis (2014) introduced the
  **PC-stable** variant that resolves this by batching edge removals.

## Connections

- **Contrast with GES**: PC is constraint-based (CI tests), GES is score-based (BIC). Both output
  a CPDAG. GES is consistent and asymptotically efficient; PC is consistent but can be less accurate
  in finite samples with many tests. See [[GES - Greedy Equivalence Search]].
- **Contrast with NOTEARS**: NOTEARS avoids the equivalence class and directly estimates edge weights
  in $\mathbb{R}^{d\times d}$ — no CI tests. See [[DAG Structure Learning Problem]] and [[NOTEARS - Overview]].
- **Comparison table**: → [[Causal Structure Learning - Methods Comparison]].
- **DAG reasoning**: the CPDAG output connects directly to the d-separation calculus in
  [[Directed Acyclic Graphs]]. The PC algorithm is how you *learn* a DAG before applying the
  do-calculus or back-door criterion documented there.
- **Bayesian Networks**: the skeleton and orientations PC learns are precisely the BN graph structure
  that [[LLM Expert Elicitation for Bayesian Networks]] attempts to elicit from experts — PC
  automates this from data.

## See Also
- [[GES - Greedy Equivalence Search]] — score-based alternative; same CPDAG output
- [[Causal Structure Learning - Methods Comparison]] — PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — formal setup (SEM, score, combinatorial obstacle)
- [[NOTEARS - Overview]] — continuous-optimization approach
- [[Directed Acyclic Graphs]] — d-separation, Markov properties, do-calculus
- [[Summary Causal DAGs]] — DAG reasoning for ABM outputs
- [[Causal Discovery/_Index|Causal Discovery Index]]
