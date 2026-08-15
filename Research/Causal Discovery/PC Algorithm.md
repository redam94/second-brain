---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SGES-Chickering-Meek-2015.pdf]]"
source_location: "§3 (Notation and Background), pp. 3–4; Spirtes, Glymour & Scheines (2000) §5"
date_ingested: 2026-08-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - PC
  - Peter-Clark algorithm
  - constraint-based structure learning
  - skeleton learning
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter–Clark; Spirtes, Glymour & Scheines, 2000) is the canonical
> **constraint-based** method for causal structure learning. It recovers the CPDAG of
> the true DAG by (1) learning the skeleton via adaptive conditional independence (CI)
> tests, (2) orienting v-structures from separating sets, and (3) propagating directions
> with Meek's rules. Under faithfulness and causal sufficiency, PC is **pointwise
> consistent**: with infinite data it recovers the true CPDAG exactly.

## Overview

Constraint-based algorithms treat each conditional independence (CI) test as a
*constraint* that rules out edges. The key insight is that two variables $X, Y$ are
d-separated by some set $Z$ in the true DAG if and only if — under faithfulness —
$X \perp\!\!\!\perp Y \mid Z$ in the distribution. PC exploits this to reconstruct the
skeleton without enumerating DAGs, then orients edges from the statistical evidence
already collected.

The algorithm is named for its inventors, **Peter Spirtes** and **Clark Glymour**,
and was first published in *Causation, Prediction, and Search* (Spirtes, Glymour &
Scheines, 2000, 2nd ed.). The high-dimensional consistency result (which shows PC
scales to $p \gg n$ under sparsity) is due to Kalisch & Bühlmann (2007).

## Assumptions

Three assumptions jointly guarantee correctness:

> [!definition] Causal Markov Condition
> Each variable $X_i$ is independent of all its non-descendants given its parents
> $\text{Pa}_i$ in the true DAG $\mathcal{G}^*$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}_i$$
> This makes the joint distribution factorise along the DAG.
^def-causal-markov

> [!definition] Faithfulness (Stability)
> Every conditional independence relation in the distribution $P$ is entailed by
> d-separation in $\mathcal{G}^*$. Equivalently: no conditional independence holds
> "by accident" (e.g., due to exact cancellation of path coefficients).
>
> **Why it matters:** Without faithfulness, the skeleton phase may remove edges that
> truly exist in $\mathcal{G}^*$. Faithfulness is violated on a measure-zero set of
> parameter values for any fixed DAG, so it holds generically.
^def-faithfulness

> [!definition] Causal Sufficiency
> All common causes of any two observed variables are themselves observed (no hidden
> confounders). Equivalently, there are no latent variables inducing bidirected "bow
> arcs" in the true graph.
>
> **When violated:** FCI (Fast Causal Inference) is the extension that handles
> latent confounders by outputting a PAG (Partial Ancestral Graph) instead of a CPDAG.
^def-causal-sufficiency

## The Algorithm

PC proceeds in three sequential phases.

### Phase 1 — Skeleton Learning

> [!theorem] Skeleton-Recovery Procedure
> **Input:** Variables $V = \{X_1, \ldots, X_d\}$, a CI oracle (or test).
>
> 1. Start with the **complete undirected graph** $H$ on $V$.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in $H$, test whether there exists a set
>      $S \subseteq \text{Adj}(X) \setminus \{Y\}$ with $|S| = \ell$ such that
>      $X \perp\!\!\!\perp Y \mid S$.
>    - If such $S$ exists: **remove** the edge $X - Y$ from $H$ and record
>      $\text{Sep}(X, Y) \leftarrow S$.
>    - Increment $\ell$ only after exhausting all pairs at the current level.
> 3. Terminate when no adjacent pair has a separating set of size $\ell$.
>
> **Output:** Skeleton (undirected graph) and separating sets $\text{Sep}(X,Y)$ for
> every non-adjacent pair.
^thm-skeleton

The **adaptive conditioning** is the key efficiency gain: edges removed early reduce the
adjacency sets of remaining vertices, so the CI tests at level $\ell+1$ consider fewer
candidate conditioning sets. In the worst case the total number of CI tests is
$O(d^{k+2})$ where $k$ is the maximum degree in $\mathcal{G}^*$.

### Phase 2 — V-Structure Orientation

> [!theorem] V-Structure Detection
> For every triple $(X, Z, Y)$ with $X - Z - Y$ in the skeleton and $X, Y$ not adjacent:
> - If $Z \notin \text{Sep}(X, Y)$: orient $X \to Z \leftarrow Y$ (a v-structure / collider).
> - If $Z \in \text{Sep}(X, Y)$: do **not** orient (the triple is a non-collider).
>
> **Why this works:** In any DAG, a collider $X \to Z \leftarrow Y$ blocks the path
> between $X$ and $Y$ marginally (d-separation), so $Z$ does *not* appear in the
> separating set. A chain or fork at $Z$ transmits dependence, so $Z$ *does* appear in
> the separating set (conditioning on $Z$ blocks it). The Sep sets collected in Phase 1
> encode exactly this information.
^thm-v-struct

### Phase 3 — Meek's Orientation Rules

Starting from the PDAG with v-structures oriented, apply Meek's four rules repeatedly
until no new orientations can be made:

> [!theorem] Meek's Rules (Meek, 1995) — applied to complete the CPDAG
> **(R1)** If $a \to b - c$ and $a, c$ non-adjacent: orient $b \to c$.
> *(Avoids a new v-structure at $b$.)*
>
> **(R2)** If $a - b$ and there is a directed path $a \to c \to b$: orient $a \to b$.
> *(Avoids a directed cycle.)*
>
> **(R3)** If $a - b$ and there are two chains $a - k \to b$, $a - l \to b$ with
> $k$ and $l$ non-adjacent: orient $a \to b$.
> *(Forces consistency.)*
>
> **(R4)** If $a - b$ and there is $a - k$ and a directed chain $k \to l \to b$ with
> $k$ and $b$ non-adjacent: orient $a \to b$.
>
> **Completeness (Meek, 1995):** Applying R1–R4 to convergence yields exactly the CPDAG.
^thm-meek

## Complexity

| Phase | Calls | Conditioning set size | Complexity |
|-------|-------|----------------------|-----------|
| Skeleton (worst) | $O(d^{k+2})$ CI tests | Up to $k$ variables | $k$ = max degree |
| Skeleton (sparse) | $O(d^2)$ CI tests | 0 or 1 | Under bounded-degree |
| V-structure | $O(d^2)$ triples | — | $O(d^3)$ total |
| Meek's rules | $O(d^2)$ edges | — | $O(d^2)$ per sweep |

The bottleneck is Phase 1 when the true graph is dense. Under **strong faithfulness**
and sparsity ($k = O(\log d)$), Kalisch & Bühlmann (2007) show PC is **uniformly
consistent** even when $d \gg n$ (high-dimensional regime).

## High-Dimensional Consistency

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann, 2007)
> Let $n$ be the sample size and $d$ the number of variables. Assume:
> 1. The true DAG $\mathcal{G}^*$ has maximum degree bounded by $k = O(\log n)$.
> 2. **Strong faithfulness** holds with parameter $\lambda$ (partial correlations bounded
>    away from zero by at least $\lambda$).
> 3. Partial correlations are estimated by Fisher's $z$-test with significance level
>    $\alpha_n \to 0$ at rate $\alpha_n = O(n^{-\epsilon})$ for small $\epsilon > 0$.
>
> Then the PC-stable algorithm (order-independent variant) returns the true CPDAG with
> probability approaching 1 as $n \to \infty$, even when $d = O(n^a)$ for $a < 1 - \epsilon$.
^thm-high-dim

This makes PC one of the few structure-learning algorithms with provable guarantees in
the $p \gg n$ regime — the key reason it remains widely used in genomics and neuroscience.

## PC-Stable (Order-Independent Variant)

The original PC algorithm is **order-dependent**: the skeleton it produces can vary with
the order in which variables or edges are processed. The **PC-stable** fix (Colombo &
Maathuis, 2014) computes all adjacencies before removing any, making the skeleton
step fully order-independent. The v-structure and Meek phases are unaffected.

## Output and Identifiability

PC outputs a **CPDAG** (see [[Markov Equivalence Classes and CPDAGs]]):
- **Directed edges** = compelled — every DAG in the MEC agrees on this direction.
- **Undirected edges** = reversible — some DAGs in the MEC disagree.

The CPDAG defines what is identifiable from **observational data alone**. Adding
interventions (experiments, do-operations) can orient reversible edges further.

## Implementation

The canonical implementation is the **`pcalg`** R package (Kalisch et al., 2012),
which provides `pc()` with pluggable CI tests for Gaussian (Fisher's $z$), discrete
(χ²), and kernel-based (HSIC) data. Python implementations include `causal-learn`
(formerly `cdt`).

## Connections

- [[Markov Equivalence Classes and CPDAGs]] — PC produces CPDAGs; understanding what
  directed vs. undirected edges mean requires this background
- [[GES - Greedy Equivalence Search]] — score-based alternative; often more efficient
  but requires a decomposable score; can be combined with PC output
- [[DAG Structure Learning Problem]] — formal problem setup PC is solving
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion underlying Phase 1 logic

## See Also
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[Markov Equivalence Classes and CPDAGs]] — prerequisite; defines CPDAGs and Meek's rules
- [[DAG Structure Learning Problem]] — formal SEM setup
- [[NOTEARS Algorithm]] — continuous optimization alternative (no CI tests)
