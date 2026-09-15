---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Meek (1995); Colombo & Maathuis (2014, arXiv:1211.3295) — PDF unavailable (network policy blocked academic domains)"
source_location: "Spirtes, Glymour & Scheines (2000) §5.4 (PC algorithm, pp. 84–90); Meek (1995) UAI (orientation rules)"
date_ingested: 2026-09-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Tests for Structure Learning]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Paradigm Overview]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1993/2000) is the canonical
> **constraint-based** method for learning causal structure from observational data.
> Starting from a complete undirected graph, it removes edges by testing conditional
> independence, then orients edges by detecting **v-structures** and applying **Meek's
> orientation rules**. The output is a **CPDAG** representing the Markov equivalence class of
> the true DAG. PC is consistent under faithfulness and causal sufficiency, and its
> computational complexity scales with the maximum neighbourhood degree of the graph rather
> than with $p$ alone.

## Overview

The PC algorithm is named after its inventors **P**eter Spirtes and **C**lark Glymour. It is
one of the oldest and most widely studied constraint-based algorithms for causal discovery, and
remains a key baseline in the literature (it appears as a comparison in [[NOTEARS Experiments]]).

The algorithm works in three phases:
1. **Skeleton recovery** — tests of conditional independence trim edges from a complete graph.
2. **V-structure identification** — colliders are detected using the stored separation sets.
3. **Meek orientation** — remaining edge orientations are propagated via four rules.

The key contrast with score-based methods ([[GES Algorithm]]) is that PC *separates* the
structure-learning problem from distributional assumptions: any CI test can be plugged in
(see [[Conditional Independence Tests for Structure Learning]]). This makes PC applicable to
Gaussian, discrete, and even non-parametric settings.

## Main Content

### Assumptions

> [!definition] Assumptions required by PC
> 1. **Acyclicity**: the true causal graph $\mathcal{G}^*$ is a DAG.
> 2. **Causal Markov Condition**: $P$ is Markov to $\mathcal{G}^*$ (every variable is conditionally
>    independent of its non-descendants given its parents).
> 3. **Faithfulness**: $P$ is faithful to $\mathcal{G}^*$ — no conditional independences beyond
>    those implied by d-separation. (See [[Conditional Independence Tests for Structure Learning]].)
> 4. **Causal sufficiency**: no hidden common causes (no unmeasured confounders); all common
>    causes of measured variables are themselves measured. (FCI relaxes this assumption.)
^def-pc-assumptions

### Phase 1: Skeleton recovery

> [!definition] Algorithm: PC Skeleton Recovery
> **Input:** $n$ observations of $\mathbf{X} = (X_1,\dots,X_p)$; significance level $\alpha$.
>
> 1. Start with the **complete undirected graph** $H$ on $p$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in $H$:
>      - For each subset $\mathbf{S} \subseteq \mathrm{Adj}(X_i) \setminus \{X_j\}$
>        with $|\mathbf{S}| = \ell$:
>        - If $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ (CI test at level $\alpha$):
>          - Remove edge $X_i - X_j$ from $H$.
>          - Store $\mathrm{Sep}(X_i, X_j) \leftarrow \mathbf{S}$.
>          - Break (move to next pair).
>    - If no edge was removed at level $\ell$: stop.
>
> **Output:** Skeleton $H$ (undirected) and separation sets $\mathrm{Sep}(X_i,X_j)$.
^def-pc-skeleton

> [!note] Complexity
> The outer loop runs up to $\ell_{\max} = \max_i |\mathrm{Adj}(X_i)| - 1$ times, bounded by
> the maximum **degree** $q$ of the true skeleton. Total CI tests: $O(p^{q+2})$. If the true
> graph is sparse (small $q$), this is polynomial even when $p$ is large.

### Phase 2: V-structure identification

> [!definition] Algorithm: PC V-Structure Orientation
> For each unshielded triple $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are **not adjacent**):
>
> - If $X_k \notin \mathrm{Sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (collider).
> - If $X_k \in \mathrm{Sep}(X_i, X_j)$: leave $X_i - X_k - X_j$ undirected (non-collider).
>
> **Rationale.** The separation set $\mathrm{Sep}(X_i,X_j)$ is the set that d-separates $X_i$
> and $X_j$. A collider $X_i \to X_k \leftarrow X_j$ is *not* blocked by its own parent $X_k$
> (it is activated by conditioning on $X_k$ or descendants). Hence if $X_k \notin \mathrm{Sep}$,
> the only consistent orientation is the collider.
^def-pc-vstructures

### Phase 3: Meek orientation rules

After v-structures are placed, apply the four **Meek rules** (see [[Markov Equivalence Classes and
CPDAGs]]) iteratively until no new orientations can be made. The rules enforce:
- No new v-structures are introduced.
- No directed cycles are created.

> [!theorem] Correctness of the PC Algorithm (Spirtes, Glymour & Scheines 2000, §5.4)
> Under Assumptions 1–4 ([[PC Algorithm#^def-pc-assumptions]]) and with perfect (population-level) CI
> information:
> 1. The skeleton output of Phase 1 is the **true skeleton** of $\mathcal{G}^*$.
> 2. The v-structures output of Phase 2 are exactly the true v-structures of $\mathcal{G}^*$.
> 3. After Phase 3 (Meek rules), the output is the **true CPDAG** of $\mathcal{G}^*$.
>
> **Sample consistency:** With finite data and a CI test that is consistent at level
> $\alpha_n \to 0$ slowly enough, PC is a consistent estimator of the CPDAG as $n \to \infty$.
^thm-pc-correctness

### Order-dependence and PC-stable

A known issue with the original PC algorithm: the skeleton and v-structure identification can
depend on the **order** in which edges are processed, because early removals change the
adjacency set used for conditioning in later tests.

> [!note] PC-stable (Colombo & Maathuis 2014)
> The **PC-stable** variant resolves order-dependence by separating the adjacency-set update
> from the decision: for each level $\ell$, **all** CI tests at that level are performed using
> the adjacency structure from the *beginning* of that level (not updated mid-level).
> PC-stable produces reproducible results across variable orderings, with no loss of accuracy.
> Implemented in the `pcalg` R package and `causal-learn` Python package.

## Examples

> [!example] Example: Four-node graph recovery
> **Setup.** True DAG: $A \to C \leftarrow B \to D$. All other pairs non-adjacent ($A \not\sim B$,
> $A \not\sim D$, $C \not\sim D$). $n = 1000$, Gaussian SEM.
>
> **Phase 1.** Starting from the complete graph $\{A,B,C,D\}$:
> - $A \perp\!\!\!\perp B \mid \emptyset$? No (they're d-connected via B-C-A). Wait — $A$ and $B$ are
>   non-adjacent in the true graph. Test $A \perp\!\!\!\perp B \mid \emptyset$: yes (since the only
>   path goes through the collider $C$, which is not conditioned on). Remove edge $A-B$,
>   $\mathrm{Sep}(A,B) = \emptyset$.
> - Similarly test and remove $A-D$ (Sep = $\{B\}$ or $\emptyset$ depending on the path structure)
>   and $C-D$.
> - Skeleton: $A - C$, $B - C$, $B - D$.
>
> **Phase 2.** Unshielded triple $A - C - B$ (A and B not adjacent). $C \notin \mathrm{Sep}(A,B) = \emptyset$.
> Orient: $A \to C \leftarrow B$.
>
> **Phase 3.** Meek R1 with $B \to C$ (existing) forces no new orientations on $B - D$ (no conflict).
> Final CPDAG: $A \to C \leftarrow B - D$ (the B-D edge is undirected; $B \to D$ and $B \leftarrow D$
> are both consistent with the skeleton and v-structures).

## Connections

- **[[GES Algorithm]]**: Score-based alternative. GES searches over equivalence classes directly
  without CI tests. GES is typically more accurate when the score is well-specified; PC is more
  flexible (any CI test can be used).
- **[[NOTEARS - Overview]]**: Continuous optimization approach. NOTEARS targets a *single DAG*
  (not a CPDAG) and is particularly strong for dense graphs; PC targets the CPDAG.
- **FCI (Fast Causal Inference)**: Extension of PC that relaxes causal sufficiency, outputting
  a **PAG** (Partial Ancestral Graph) instead of a CPDAG to handle hidden confounders.
- **[[Conditional Independence Tests for Structure Learning]]**: CI tests are the primary
  ingredient of Phase 1.

## Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | Reference implementation; includes PC-stable, FCI, GES, LINGAM |
| `causal-learn` | Python | `pc()` function; supports multiple CI tests |
| `bnlearn` | R | `pc.stable()`, `mmpc()`, `iamb()` |
| `gCastle` | Python | Includes PC, GES, NOTEARS, and other methods |

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG output representation
- [[Conditional Independence Tests for Structure Learning]] — Fisher z, chi-square, KCI tests
- [[GES Algorithm]] — score-based alternative; typically the stronger method
- [[DAG Structure Learning Problem]] — problem formulation and prior methods landscape
- [[Causal Structure Learning - Paradigm Overview]] — three paradigms compared
- [[NOTEARS Experiments]] — empirical comparison where PC appears as a baseline
