---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/textbook
source: "[[raw/spirtes-glymour-scheines-2000-CPS-book.md]]"
source_location: "Ch. 5 (PC Algorithm); Spirtes & Glymour (1991) original paper"
date_ingested: 2026-10-22
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Causal Discovery Assumptions]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Stable PC and High-Dimensional Extensions]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes Glymour 1991"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991/2000) is the foundational
> **constraint-based** causal discovery algorithm. It recovers the CPDAG of the true
> causal DAG from conditional independence (CI) tests in two phases: (1) a **skeleton
> phase** that identifies the undirected graph by removing edges whenever a separating
> set is found, and (2) an **orientation phase** that orients v-structures and then
> applies Meek's 4 rules. Under the Causal Markov, Faithfulness, and Causal Sufficiency
> assumptions, PC is **consistent** in the large-sample limit. Its main weakness is that
> the standard version is **order-dependent**; Stable-PC (Colombo & Maathuis 2014) fixes this.

## Overview

The PC algorithm is named after its authors **P**eter Spirtes and **C**lark Glymour (Spirtes
& Glymour 1991; Spirtes, Glymour & Scheines 2000). It was the first efficient algorithm for
learning causal structure from data without assuming a topological ordering.

The key insight is that **adjacency in the causal DAG determines which conditioning sets are
relevant**: by the Markov and Faithfulness assumptions, $X$ and $Y$ are non-adjacent iff there
exists a *subset* of the remaining variables that d-separates them. The PC algorithm exploits
this by searching for separating sets $S \subseteq \text{Adj}(X) \setminus \{Y\}$, restricting
attention to subsets of the current adjacency set — which shrinks as edges are removed, making
larger conditioning sets rare.

## Main Content

### Algorithm

> [!definition] Algorithm: PC (Spirtes, Glymour & Scheines 2000, Ch. 5)
>
> **Input:** Variable set $\mathbf{V}$, significance level $\alpha$, CI oracle (or test).
>
> **Phase 1 — Skeleton:**
>
> 1. Start with the **complete undirected graph** $\mathcal{H}$ on $\mathbf{V}$.
> 2. Set $l = 0$.
> 3. **While** some pair of adjacent variables $(X, Y)$ has $|\text{Adj}(X) \setminus \{Y\}| \geq l$:
>    - For each adjacent pair $(X, Y)$:
>      - For each $S \subseteq \text{Adj}(X) \setminus \{Y\}$ with $|S| = l$:
>        - If $X \perp\!\!\!\perp Y \mid S$ (CI test passes):
>          - Remove edge $X - Y$ from $\mathcal{H}$.
>          - Record $\text{sep}(X, Y) = \text{sep}(Y, X) \leftarrow S$.
>          - **Break** (stop testing this pair).
>    - $l \leftarrow l + 1$.
>
> 4. **Output:** Skeleton $\mathcal{S}$ and separation sets $\{\text{sep}(X,Y)\}$.
>
> **Phase 2 — Orientation:**
>
> 5. **Orient v-structures:** For each unshielded triple $X - Z - Y$ (where $X, Y$ non-adjacent):
>    - If $Z \notin \text{sep}(X, Y)$: orient as $X \to Z \gets Y$ (v-structure / collider).
>
> 6. **Apply Meek's rules** (R1–R4) exhaustively until no further orientation is possible.
>    (See [[Markov Equivalence Classes and CPDAGs#^thm-meek-rules]] for the four rules.)
>
> **Output:** A CPDAG $\mathcal{C}$ representing the Markov equivalence class.
^algo-pc

### Why conditioning on adjacencies (not all subsets)

The earlier **SGS algorithm** (Spirtes, Glymour & Scheines 1993) tested all $2^{d-2}$ possible
conditioning sets for each pair, making it exponential in $d$. PC's key computational saving
is restricting to sets $S \subseteq \text{Adj}(X) \setminus \{Y\}$:

> [!theorem] Theorem: PC Skeletal Correctness (Spirtes et al. 2000)
> Under CMC + Faithfulness + Causal Sufficiency, if $X$ and $Y$ are non-adjacent in $\mathcal{G}$,
> then there exists a separating set $S \subseteq \text{Adj}_{\mathcal{G}}(X) \setminus \{Y\}$
> (or $\text{Adj}_{\mathcal{G}}(Y) \setminus \{X\}$) — i.e., it is sufficient to test
> conditioning sets drawn from adjacencies in the graph.
>
> This makes the test count at most $\sum_{X,Y} \binom{|\text{Adj}(X)|-1}{l}$ for each level $l$,
> which is polynomial for sparse graphs.
^thm-skeleton

### V-structure orientation

> [!definition] Unshielded Triple and V-Structure
> An **unshielded triple** is a path $X - Z - Y$ where $X$ and $Y$ are non-adjacent.
> Such a triple is a **v-structure** (immorality, collider) iff $Z \notin \text{sep}(X, Y)$.
>
> *Intuition:* The separator test for $X$ and $Y$ tells us whether conditioning on $Z$
> creates or removes dependence. If $Z$ is a collider $X \to Z \gets Y$, then $Z$ is NOT
> in the separating set (it is d-connected when conditioned on). If $Z$ is a chain
> $X \to Z \to Y$ or fork $X \gets Z \to Y$, then $Z$ IS in the separating set.
^def-v-structure

### Conditional independence tests

The choice of CI test determines whether PC is applicable:

| Setting | CI Test | Notes |
|---------|---------|-------|
| Continuous, linear Gaussian | Fisher's z-test on partial correlations | Standard for Gaussian SEMs |
| Continuous, nonparametric | Kernel-based CI tests (KCIT, HSIC) | Distribution-free, expensive |
| Discrete | $G^2$ or $\chi^2$ tests | Requires sufficient counts |
| Mixed (continuous + discrete) | `MXM` package tests | Uses MI or regression-based tests |

For Gaussian data: $\rho_{XY \cdot S} \to 0$ iff $X \perp\!\!\!\perp Y \mid S$. Fisher's z-statistic
$z = \frac{1}{2}\log\frac{1+\hat\rho}{1-\hat\rho}$ has standard normal distribution under the null.

### Consistency

> [!theorem] Theorem: PC Consistency (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Under CMC, Faithfulness, Causal Sufficiency, Acyclicity, and correct CI tests:
>
> 1. **(Population level)** Given the exact CI model (infinite data), PC returns the unique CPDAG.
>
> 2. **(Finite sample, Gaussian, sparse)** With Fisher's z-test and threshold $\alpha_n \to 0$
>    appropriately as $n \to \infty$, PC is consistent in the high-dimensional regime
>    $d = O(n^a)$ for any $0 < a < \infty$, provided the maximum degree $q$ satisfies
>    $q = O\!\left(n^{1-b}\right)$ for some $b > 0$ (Kalisch & Bühlmann 2007).
^thm-pc-consistency

## Connections

- **Constraint-based vs. score-based**: PC uses CI tests to constrain the graph; [[GES Algorithm]]
  uses a scoring function (BIC, BDeu) to search over equivalence classes. Both recover the same
  CPDAG under the same assumptions in large samples.
- **Contrast with NOTEARS**: PC searches for zeros in the CI model (constraint-based);
  [[NOTEARS - Overview]] optimizes a score over continuous matrices (score-based + penalization).
  PC's output is a CPDAG; NOTEARS's output is a single (possibly incorrect) DAG.
- **Order dependence**: The standard PC skeleton phase is order-dependent (the adjacency sets
  used for conditioning change as edges are removed, and the order in which edges are removed
  depends on variable ordering). [[Stable PC and High-Dimensional Extensions]] documents the fix.
- **FCI extension**: When Causal Sufficiency fails, FCI (Fast Causal Inference, Spirtes et al.
  2000) returns a **Partial Ancestral Graph (PAG)** with circle endpoints indicating potential
  latent confounders. `pcalg::fci()` implements FCI.
- **`pcalg` implementation**: The R package `pcalg` (Kalisch et al. 2012) implements PC,
  Stable-PC, FCI, RFCI, and GES. Key functions: `pc()`, `fci()`, `ges()`.

## Examples

> [!example] Example: Sachs Protein-Signaling Network
> The Sachs et al. (2005) dataset measures 11 proteins/phospholipids in T-cells under
> 9 interventional conditions. The true network (from literature) has 17 directed edges.
>
> **NOTEARS** (Zheng et al. 2018) recovers this structure with SHD = 5 using observational
> data (see [[NOTEARS Experiments]]). **PC with Fisher's z-test** on the Gaussian data also
> recovers a similar skeleton, though the orientation depends on the faithfulness assumption
> being approximately satisfied (intervention data would help).
^ex-sachs

## See Also
- [[Causal Discovery Assumptions]] — Markov, Faithfulness, Sufficiency
- [[Markov Equivalence Classes and CPDAGs]] — the output object; Meek rules
- [[Stable PC and High-Dimensional Extensions]] — order-independence fix, high-$d$ consistency
- [[GES Algorithm]] — the score-based alternative
- [[DAG Structure Learning Problem]] — landscape of prior methods (where PC fits in)
- [[NOTEARS Experiments]] — comparison of NOTEARS vs PC and GES on benchmarks
