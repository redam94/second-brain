---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Kalisch & Bühlmann (2007), JMLR 8:613-636"
date_ingested: 2026-09-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "PC causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after **P**eter Spirtes and **C**lark Glymour; Spirtes, Glymour
> & Scheines 2000) is the canonical **constraint-based** causal discovery algorithm. Starting
> from a complete undirected graph, it removes edges via conditional independence (CI) tests
> and then orients edges using v-structure detection and Meek's rules. The result is a **CPDAG**
> representing the Markov equivalence class of the true DAG. Kalisch & Bühlmann (2007) proved
> PC is consistent in high dimensions: with $p = O(n^a)$ variables and a sparse true graph,
> the skeleton and all v-structures are recovered correctly with probability → 1.

## Overview

PC is the oldest and most widely used causal discovery algorithm. It operates in a fundamentally
different paradigm from score-based methods (GES, NOTEARS): instead of optimizing a global
objective, it runs **conditional independence tests** to determine which edges exist and how to
orient them.

The algorithm is named after its authors: **P**eter Spirtes and **C**lark Glymour (from the
book *Causation, Prediction, and Search*, 1993/2000). It requires two key assumptions:
1. **Causal Markov condition**: each variable is CI of its non-descendants given its parents.
2. **Faithfulness**: every CI in the distribution corresponds to a d-separation in the true DAG
   (no "accidental" cancellations in the distribution).
3. **Causal sufficiency**: no hidden common causes (no unmeasured confounders).

## Main Content

### Phase 1: Skeleton Discovery

The skeleton is the undirected graph obtained by ignoring edge directions.

> [!definition] Definition: Algorithm PC — Skeleton Discovery (Spirtes et al. 2000, Ch. 5)
> **Input:** $n$ i.i.d. observations of $(X_1, \ldots, X_p)$; a CI oracle $\perp\!\!\!\perp$ (or
>   test at level $\alpha$).
>
> 1. Start with the **complete undirected graph** $C$ on $p$ nodes ($\binom{p}{2}$ edges).
> 2. Initialize separation sets $\mathrm{sep}(X, Y) = \emptyset$ for all pairs.
> 3. For $\ell = 0, 1, 2, \ldots$:
>    - For each pair of adjacent nodes $(X, Y)$ in the current graph:
>      - For each subset $S$ of size $\ell$ of the **adjacency set** $\mathrm{adj}(X) \setminus \{Y\}$:
>        - If $X \perp\!\!\!\perp Y \mid S$: remove edge $X$–$Y$, set $\mathrm{sep}(X, Y) = S$, break.
>    - Stop when $\ell$ exceeds the maximum adjacency size.
>
> **Output:** Skeleton graph + separation sets $\{\mathrm{sep}(X, Y)\}$.
^algo-pc-skeleton

> [!note] Why condition only on adjacents?
> By **Markov faithfulness**, if $X$ and $Y$ are d-separated by $S$, then $S$ must lie on the
> path between them — so $S$ can only contain adjacents of $X$ (or $Y$). This bounds the search
> to $O(p^2 \cdot 2^q)$ tests where $q$ is the maximum degree, making PC **polynomial** in $p$
> for sparse graphs (Kalisch & Bühlmann 2007, Theorem 1).

### Phase 2: V-Structure Orientation

Using the separation sets from Phase 1, PC identifies **unshielded colliders**:

> [!definition] Definition: V-structure orientation rule (Spirtes et al. 2000)
> For every triple $X - Z - Y$ where $X$ and $Y$ are **non-adjacent** (i.e., no direct edge
> between $X$ and $Y$ in the skeleton):
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure / collider at $Z$)
> - If $Z \in \mathrm{sep}(X, Y)$: leave $X - Z - Y$ undirected (the path is a non-collider;
>   separating on $Z$ makes $X$ and $Y$ independent)
^def-vstructure-orient

> [!note] Intuition for the v-structure rule
> In a collider $X \to Z \leftarrow Y$: conditioning on $Z$ *activates* the path (opens a
> blocked path), so $Z$ is **not** in $\mathrm{sep}(X, Y)$ (conditioning on $Z$ would make $X$
> and $Y$ dependent, not independent). Conversely, in a chain $X \to Z \to Y$ or fork
> $X \leftarrow Z \to Y$, conditioning on $Z$ *blocks* the path — so $Z \in \mathrm{sep}(X, Y)$.

### Phase 3: Meek's Orientation Rules

After orienting all unshielded colliders, PC applies Meek's rules exhaustively to propagate
orientations without creating new v-structures or directed cycles:

> [!definition] Definition: Meek's Rules (Meek 1995; used in PC Phase 3)
> See [[Markov Equivalence Classes and CPDAGs#^def-meek-rules]] for the four rules R1–R4.
> Applied iteratively until no more edges can be oriented.
^pc-meek-phase

The result after all three phases is a **CPDAG** — see [[Markov Equivalence Classes and CPDAGs]].

### Complexity

> [!definition] Computational Complexity of PC
> Let $p$ = number of nodes, $q$ = maximum degree of the true skeleton, $n$ = sample size.
>
> - **Number of CI tests**: $O(p^2 \cdot p^q)$ in the worst case; $O(p^{q+2})$ for sparse graphs.
> - **For a Gaussian CI test** (testing $\rho_{XY|S} = 0$ via Fisher's $z$-transform), each test
>   is $O(q^3)$ (matrix inversion). Total cost: $O(p^{q+2} \cdot q^3)$ — polynomial in $p$ for
>   fixed $q$.
> - **Dense graphs** (large $q$): exponential in $q$ — PC is not designed for dense DAGs.
^pc-complexity

### Consistency in High Dimensions

> [!theorem] Theorem: PC Consistency (Kalisch & Bühlmann 2007, Theorem 2)
> Let $p = p(n)$ grow with $n$ (possibly $p \gg n$). Assume:
> 1. **Faithful** multivariate Gaussian distribution on a DAG $G^*$,
> 2. **Sparse skeleton**: max degree $q = q(n)$ grows slowly (e.g. $q = O(\log n)$),
> 3. **CI tests** at level $\alpha(n) \to 0$ slowly (e.g. $\alpha = 1/n$).
>
> Then the PC algorithm recovers the **true CPDAG** (skeleton + v-structures) with
> probability $\to 1$ as $n \to \infty$, even when $p = O(n^a)$ for any $a < \infty$.
^thm-pc-consistency

> [!note] What "sparse" means here
> Kalisch & Bühlmann's key insight: the PC skeleton search only tests subsets of the current
> adjacency set (not all $p$ variables). So even with $p \gg n$, each CI test conditions on
> at most $q$ variables — feasible as long as $q < n$. This is the *sparsity* assumption:
> no node has too many parents/children.

### Assumptions and failure modes

| Assumption | If violated |
|-----------|------------|
| **Faithfulness** | PC returns a super-graph of the true skeleton (spurious edges remain) |
| **Causal sufficiency** | Hidden confounders create spurious edges; use FCI algorithm instead |
| **Correct CI test** | False positives (Type I) → too many edges; false negatives (Type II) → too few |
| **No measurement error** | Attenuated partial correlations → wrong skeleton |

## Examples

> [!example] Example: PC on Sachs protein signaling data
> The Sachs dataset (Sachs et al. 2005) has $p = 11$ protein/phospholipid variables measured in
> immune cells ($n \approx 853$ observations). Known gold-standard: 17 directed edges from biology.
>
> PC (and also GES, NOTEARS) have been benchmarked on this dataset. PC at $\alpha = 0.01$
> recovers approximately 12–15 of the 17 true edges in the skeleton, with a structural Hamming
> distance (SHD) of ~8–12 depending on the specific run. NOTEARS (Zheng et al. 2018, Table 1)
> reports SHD=15 for NOTEARS vs SHD=12 for PC on this data — showing PC is competitive on
> real data even compared to the continuous-optimization approach.
^ex-sachs

## Connections

- **Constraint-based paradigm**: PC uses CI tests as the "oracle," GES uses a score — see
  [[Causal Structure Learning - Comparison]] for the tradeoffs.
- **Output is a CPDAG**: see [[Markov Equivalence Classes and CPDAGs]] — the fundamental
  identifiability limit.
- **FCI algorithm**: an extension of PC that handles hidden common causes (latent confounders)
  by returning a PAG (partial ancestral graph) instead of a CPDAG.
- **NOTEARS experiments** compare against PC as a baseline: [[NOTEARS Experiments]].
- **Software**: `pcalg::pc()` in R (Kalisch et al. 2012), `causal-learn` in Python
  (Zheng et al. 2023), `bnlearn` (Scutari 2010).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG output of PC
- [[GES - Greedy Equivalence Search]] — score-based alternative (same CPDAG output)
- [[Causal Structure Learning - Comparison]] — PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — the general learning problem PC addresses
- [[NOTEARS Experiments]] — empirical comparison including PC as a baseline
- [[Directed Acyclic Graphs]] — d-separation and causal DAG reasoning underlying PC
