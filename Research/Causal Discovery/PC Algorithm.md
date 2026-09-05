---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-PC.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5–6; Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Conditional Independence Tests for Causal Discovery]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 1991/2000) is the canonical
> **constraint-based** approach to causal structure learning. It discovers the skeleton
> of the true DAG by iteratively testing conditional independence (CI) and removes edges
> that are rendered independent by some conditioning set; it then orients edges into
> **v-structures** and propagates orientations using Meek's rules. Under the Markov and
> **faithfulness** assumptions and with correct CI tests, PC provably recovers the **CPDAG**
> of the true DAG. For Gaussian data, the Fisher z-test makes PC **consistent in
> high dimensions** (Kalisch & Bühlmann, 2007) when the true graph is sparse.

## Overview

PC is named for its inventors: **P**eter Spirtes and **C**lark Glymour, from the book
*Causation, Prediction, and Search* (Spirtes, Glymour & Scheines, 2000). It is the
foundational constraint-based algorithm and remains the reference point for the entire
family of conditional-independence-based structure learners (FCI, RFCI, PCMCI, etc.).

The key insight is **order-independent skeleton discovery**: rather than testing *all*
$2^{d-2}$ conditioning sets for each pair, PC exploits the **Markov property** to limit
search to conditioning sets drawn from the current **adjacency set** — which shrinks
as edges are removed. Starting from the complete graph and testing sets of increasing size
$k = 0, 1, 2, \ldots$ makes the algorithm feasible even for moderate $d$.

## Main Content

### Assumptions

PC requires two assumptions on the joint distribution $\mathbb{P}$ and the true DAG $G^*$:

> [!definition] Markov and Faithfulness Assumptions
> 1. **Causal Markov condition:** Each variable $X_i$ is conditionally independent of its
>    non-descendants given its parents in $G^*$. Equivalently, the distribution $\mathbb{P}$
>    is Markov with respect to $G^*$ (d-separation $\Rightarrow$ conditional independence).
>
> 2. **Faithfulness:** Every conditional independence in $\mathbb{P}$ is entailed by
>    d-separation in $G^*$. That is, $X_i \perp X_j \mid X_S$ in $\mathbb{P}$ $\Rightarrow$
>    $X_i$ and $X_j$ are d-separated by $S$ in $G^*$. Equivalently, there are no
>    **accidental** cancellations of path effects.
^def-assumptions

**Violation of faithfulness** is the main failure mode: near-violations (almost-cancellations)
inflate false positive CI test results, causing PC to over-remove edges.

### Phase 1: Skeleton Discovery (PC-Skeleton)

> [!definition] PC-Skeleton Algorithm
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, CI oracle or test, significance $\alpha$.
> **Output:** Undirected skeleton graph $\hat{G}^{\mathrm{skel}}$ and separation sets $\mathrm{sep}(i,j)$.
>
> 1. Initialize $C$ = complete undirected graph on $\{1, \ldots, d\}$.
> 2. Set $k = 0$.
> 3. **While** any adjacent pair $(i, j)$ in $C$ has $|\mathrm{adj}(i) \setminus \{j\}| \geq k$:
>    - **For** each adjacent pair $(i, j)$ with $|\mathrm{adj}(i) \setminus \{j\}| \geq k$:
>       - **For** each set $S \subseteq \mathrm{adj}(i) \setminus \{j\}$ with $|S| = k$:
>         - If CI-test accepts $X_i \perp X_j \mid X_S$:
>           - Remove edge $(i, j)$ from $C$.
>           - Set $\mathrm{sep}(i,j) = \mathrm{sep}(j,i) = S$.
>           - Break (move to next pair).
>    - Increment $k \leftarrow k + 1$.
> 4. Return $C$ and $\{\mathrm{sep}(i,j)\}$.
^def-pc-skeleton

**Key complexity property:** At level $k$, only conditioning sets of size $k$ drawn from the
*current* adjacency sets are tested. For sparse graphs (bounded in-degree $\kappa$), only
$k \leq \kappa$ levels are needed, so the total number of tests is
$O(d^2 \cdot \binom{\kappa}{k})$ — polynomial in $d$ for fixed $\kappa$.

> [!note] PC-stable (order-independent variant)
> The original PC algorithm's output depends on the variable ordering because edges removed
> in one pair's test affect adjacency sets for subsequent pairs. **PC-stable** (Colombo &
> Maathuis, 2014) fixes this: adjacency sets for level $k$ are fixed at the *start* of each
> level (before any edges at level $k$ are removed), making the skeleton **order-independent**.
> The `pcalg` R package and `causal-learn` Python package implement PC-stable by default.

### Phase 2: V-Structure Orientation

Given the skeleton $\hat{G}^{\mathrm{skel}}$ and separation sets $\mathrm{sep}(i,j)$, orient
v-structures (unshielded colliders):

> [!definition] V-Structure Orientation Rule
> For every **unshielded triple** $(i, k, j)$ — i.e., $i - k - j$ in the skeleton and
> $i$ not adjacent to $j$:
>
> **If** $k \notin \mathrm{sep}(i, j)$: orient as $i \to k \leftarrow j$ (v-structure / collider).
>
> **Else:** leave $i - k - j$ unoriented (k is a non-collider: it was in the sep set because
> conditioning on $k$ breaks the path, not because $k$ is a collider).
^def-vstructure-orient

**Intuition:** A v-structure $X \to Z \leftarrow Y$ has $Z$ as a collider: $X \perp Y$ marginally
but $X \not\perp Y \mid Z$ (explaining away). If $Z \notin \mathrm{sep}(X, Y)$, then conditioning
on $Z$ does *not* separate $X$ and $Y$ — consistent with $Z$ being a collider, not a non-collider.

### Phase 3: Meek Rule Propagation

Apply Meek's orientation rules R1–R4 (see [[Markov Equivalence Classes and CPDAGs]]) until
no further orientations are possible. The output is a CPDAG.

### Full Algorithm

> [!definition] PC Algorithm (complete)
> **Input:** Data $\mathbf{X}$, CI test with level $\alpha$.
> **Output:** CPDAG $\hat{G}^*$ representing the estimated Markov equivalence class.
>
> 1. Run **PC-Skeleton** $\to$ skeleton $C$, separation sets $\{\mathrm{sep}(i,j)\}$.
> 2. For each unshielded triple $(i, k, j)$ in $C$:
>    orient $i \to k \leftarrow j$ if $k \notin \mathrm{sep}(i, j)$.
> 3. Apply Meek rules R1–R4 until no new orientations.
> 4. Return the resulting CPDAG $\hat{G}^*$.
^def-pc-algorithm

### Correctness (Oracle Setting)

> [!theorem] Correctness of PC (Spirtes et al., 2000; Meek, 1995)
> Assume the Markov and faithfulness conditions hold for the true DAG $G^*$. If the CI oracle
> returns exact answers (infinite samples), then PC outputs $\mathrm{CPDAG}(G^*)$ — the true
> CPDAG.
^thm-pc-correctness

### Consistency in High Dimensions

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann, 2007)
> Assume:
> 1. $(X_1,\ldots,X_d) \sim \mathcal{N}(\mathbf{0}, \Sigma)$ with $d = d(n)$ growing with $n$.
> 2. True DAG $G^*$ is sparse: maximum neighborhood size $|\mathrm{adj}(i)| \leq \kappa(n)$.
> 3. The maximum partial correlation in $G^*$ is bounded away from 0 by $c > 0$ (sparse
>    faithfulness: $\min |\rho_{ij|S}| \geq c$ for all true edges $(i,j)$ and $S$).
> 4. $\kappa(n) = O(n^{1-b})$ for some $0 < b < 1$ and $\log d(n) = O(n^{1-b})$.
> 5. CI test significance $\alpha_n \to 0$ with $n$ at rate $\alpha_n = O(n^{-c'})$ for some $c' > 0$.
>
> Then PC with Fisher's z-test at level $\alpha_n$ is **consistent**:
> $$\mathbb{P}(\hat{G}^* = \mathrm{CPDAG}(G^*)) \to 1 \quad \text{as } n \to \infty.$$
>
> In particular, $d$ may grow faster than any polynomial in $n$ — $d = O(e^{n^{1-b}})$ —
> while the algorithm remains consistent, provided the true graph is sufficiently sparse.
^thm-pc-consistency

## Examples

> [!example] Example: 4-variable DAG
> True DAG: $X_1 \to X_2 \to X_4$ and $X_3 \to X_2$, with $X_1 \not\sim X_3$.
>
> **Level 0:** Test all pairs for marginal independence. $X_1 \perp X_3$? Yes (assuming so)
> $\to$ remove $X_1 - X_3$.
>
> **Level 1:** Test $X_1 - X_4$ given $\{X_2\}$: $X_1 \perp X_4 \mid X_2$? Yes (since $X_2$
> blocks $X_1 \to X_2 \to X_4$) $\to$ remove $X_1 - X_4$, $\mathrm{sep}(1,4) = \{2\}$.
> Similarly remove $X_3 - X_4$ with $\mathrm{sep}(3,4) = \{2\}$.
>
> **Skeleton:** $X_1 - X_2 - X_4$ and $X_3 - X_2$.
>
> **V-structures:** Unshielded triple $(X_1, X_2, X_3)$ — $X_1 \not\sim X_3$, and
> $X_2 \notin \mathrm{sep}(X_1, X_3) = \emptyset$ $\to$ orient $X_1 \to X_2 \leftarrow X_3$.
>
> **Meek R1:** $X_1 \to X_2 - X_4$, $X_1 \not\sim X_4$ $\to$ orient $X_2 \to X_4$.
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3$, $X_2 \to X_4$. ✓

## Limitations

| Limitation | Description |
|------------|-------------|
| **Faithfulness violations** | Near-cancellation of path effects → false positives in CI tests |
| **Multiple testing** | $O(d^2 \cdot \binom{d}{k})$ tests; type-I error accumulates |
| **Exponential worst case** | Dense graphs with large neighborhood size: $\binom{d}{k}$ explodes |
| **Ambiguity in ordering** | Original PC is order-dependent (fixed by PC-stable) |
| **Asymptotic inference only** | Fisher's z-test is valid only in large samples; CI tests on conditioning sets with $|S|$ near $n$ are unreliable |

## Connections

- **Versus GES**: GES uses a score function instead of CI tests, avoids multiple-testing issues,
  but is computationally more expensive on large dense graphs. See [[Greedy Equivalence Search]].
- **Versus NOTEARS**: NOTEARS is a continuous optimization approach that avoids both CI tests and
  score-based search; outputs a DAG (not CPDAG) that can be post-processed. See [[NOTEARS - Overview]].
- **Software**: `pcalg` (R package, Kalisch et al., 2012), `causal-learn` (Python, Zheng et al., 2023).

## See Also
- [[Conditional Independence Tests for Causal Discovery]] — Fisher z, G-test, KCI
- [[Markov Equivalence Classes and CPDAGs]] — what the output CPDAG means
- [[Greedy Equivalence Search]] — the score-based complement
- [[DAG Structure Learning Problem]] — problem setup shared with all structure learners
- [[Constraint-Based vs Score-Based Causal Discovery]] — when to use PC vs GES vs NOTEARS
