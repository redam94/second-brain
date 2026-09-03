---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-SGS-reference.md]]"
source_location: "Ch. 5, §5.4 (PC algorithm); Kalisch & Bühlmann (2007) for high-dim extension"
date_ingested: 2026-09-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Methods Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm causal discovery"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000)
> is the canonical **constraint-based causal discovery** algorithm. It recovers the
> [[Markov Equivalence and CPDAGs|CPDAG]] of the true data-generating DAG from observational
> data using **conditional independence (CI) tests**. Three phases: (1) skeleton learning
> by testing pairs at increasing conditioning set sizes, (2) v-structure orientation, (3)
> Meek orientation rules. Under the Causal Markov Condition, Faithfulness, and Causal
> Sufficiency, PC is consistent in the large-sample limit and has complexity polynomial in the
> number of variables $d$ when the maximum in-degree $k$ is bounded.

## Overview

PC is the workhorse of observational causal discovery. Unlike score-based methods (GES) or
continuous-optimization methods (NOTEARS), PC makes **no parametric model assumption** for the
joint distribution — it only needs a valid CI test appropriate for the data type (Fisher's
$z$ for Gaussian, $G^2$ for discrete, kernel tests for non-parametric settings).

The key insight that makes PC practical (over the exponential SGS algorithm) is **order-based
pruning**: when testing whether $X - Y$ should be removed from the skeleton, only subsets of
the *current adjacency sets* of $X$ and $Y$ need to be considered. For sparse graphs with
bounded degree $k$, this reduces CI tests from $2^{d-2}$ per edge to $O(d^{k-1})$.

## Main Content

### Algorithm overview

> [!example] PC Algorithm (Spirtes, Glymour & Scheines, 2000, Ch. 5; Kalisch & Bühlmann, 2007)
>
> **Input:** Data matrix $\mathbf{X}\in\mathbb{R}^{n\times d}$, CI test at significance level $\alpha$.
>
> **Output:** Estimated CPDAG $\hat{\mathcal{C}}$.
>
> ---
>
> **PHASE 1 — Skeleton learning** (order-independent CI testing):
>
> 1. Initialize $\hat{G}$ = complete undirected graph $K_d$ on $d$ nodes.
>    Initialize separating sets $\mathrm{sep}(i,j) = \emptyset$ for all pairs.
>    Set $\ell = 0$ (conditioning set size).
>
> 2. **Repeat** until no edge in $\hat{G}$ has $|\mathrm{Adj}(X_i,\hat{G})\setminus X_j| \geq \ell$:
>    - For each adjacent pair $(X_i, X_j)$ in $\hat{G}$:
>      - For each subset $Z \subseteq \mathrm{Adj}(X_i, \hat{G}) \setminus \{X_j\}$ with $|Z| = \ell$:
>        - Test $H_0: X_i \perp\!\!\!\perp X_j \mid Z$ at level $\alpha$.
>        - **If accepted**: remove edge $X_i - X_j$ from $\hat{G}$;
>          set $\mathrm{sep}(X_i, X_j) = \mathrm{sep}(X_j, X_i) = Z$; **break** inner loop.
>    - Increment $\ell \leftarrow \ell + 1$.
>
> 3. Output skeleton $\hat{S} = \hat{G}$ and separating sets $\{\mathrm{sep}(i,j)\}$.
>
> ---
>
> **PHASE 2 — V-structure orientation**:
>
> For each **unshielded triple** $X_i - X_k - X_j$ (path of length 2 with $X_i\not\sim X_j$):
> - If $X_k \notin \mathrm{sep}(X_i, X_j)$: orient $X_i \to X_k \leftarrow X_j$ (collider).
> - Else: leave $X_i - X_k - X_j$ undirected (non-collider; $X_k$ d-separates $X_i, X_j$).
>
> ---
>
> **PHASE 3 — Meek orientation rules** (Meek, 1995):
>
> Apply the following rules **repeatedly** until no more edges can be oriented:
>
> - **R1 (avoid new v-structure)**: If $X \to Z - Y$ and $X \not\sim Y$,
>   orient $Z \to Y$.
>   *(Reason: orienting $Y \to Z$ would create the unshielded collider $X \to Z \leftarrow Y$,
>   contradicting our v-structure orientation in Phase 2.)*
>
> - **R2 (avoid directed cycle)**: If $X - Y$ and there exists a directed path $X \to Z \to Y$,
>   orient $X \to Y$.
>   *(Reason: orienting $Y \to X$ would create the directed cycle $X \to Z \to Y \to X$.)*
>
> - **R3 (non-collider consistency)**: If $X - Z$ is undirected, $X \to Y \leftarrow Z$
>   (unshielded collider at $Y$), and $X - W - Z$ with $W \not\sim X$ and $W \not\sim Z$...
>   orient $W \to Y$.
>   *(Avoids creating a second path that would force contradictory orientation.)*
>
> **Output:** Partially directed graph $\hat{\mathcal{C}}$ — the estimated CPDAG.
^algo-pc

### Complexity

> [!theorem] Complexity of PC (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Let $d$ = number of variables, $k$ = maximum adjacency degree in the true skeleton.
>
> - **CI tests performed**: $O\!\left(\binom{d}{2} \binom{d}{k}\right) = O(d^{k+2})$.
> - **Time per CI test**: $O(n)$ for Fisher's $z$ (Gaussian), $O(n \cdot |Z|!)$ for discrete.
> - **Overall**: polynomial in $d$ and $n$ when $k$ is bounded (sparse graphs).
>
> Compare SGS: $O(2^d)$ CI tests — exponential and impractical for $d > 15$.
^thm-complexity

### Consistency

> [!theorem] Consistency of PC (Spirtes et al. 2000, Th. 5.1; Kalisch & Bühlmann 2007, Th. 3.1)
> Under the **Causal Markov Condition**, **Faithfulness**, and **Causal Sufficiency**:
>
> *Low-dimensional* ($d$ fixed, $n\to\infty$): PC correctly recovers the true CPDAG
> $\mathcal{C}$ with probability $\to 1$ as $n\to\infty$.
>
> *High-dimensional* (Kalisch & Bühlmann 2007): If the maximum degree satisfies
> $k = O\!\left(n^{1-b}\right)$ for some $0 < b < 1$, and the CI tests are calibrated at
> level $\alpha_n \to 0$ slowly enough, then PC consistently recovers the skeleton and
> all v-structures even when $d = O(e^{n^b})$ (allowing $d \gg n$).
>
> This makes PC applicable to genomics ($d \sim 10{,}000$, $n \sim 200$) under sparsity.
^thm-consistency

### PC-stable: removing order-dependence {#pc-stable}

> [!note] Order-dependence problem in original PC
> In the original PC algorithm, the skeleton learned in Phase 1 can differ depending on the
> **ordering of variables and edges** in the adjacency loop — because removing an edge
> in one iteration changes the adjacency sets used to form conditioning sets in subsequent
> iterations.

> [!definition] PC-stable (Colombo & Maathuis, 2014; extended by Kalisch & Bühlmann 2007)
> **PC-stable** fixes order-dependence by separating the *testing* step from the *edge removal*
> step within each level $\ell$:
>
> 1. For each $\ell = 0, 1, \dots$:
>    - **Test** all edges $(X_i, X_j)$ with size-$\ell$ subsets of the *current* adjacency sets.
>    - Record all edge removals determined at level $\ell$.
>    - **After** testing all pairs at level $\ell$, apply all recorded removals simultaneously.
>
> This ensures the adjacency sets used during level-$\ell$ testing are consistent across
> all pairs, removing order-dependence from the skeleton phase. PC-stable is implemented
> in the `pcalg` R package and `causal-learn` Python library.
^def-pc-stable

## Examples

> [!example] Example: Running PC on Gaussian data
> **Setup**: $d = 5$ variables, true DAG $G$: $X_1 \to X_3 \leftarrow X_2$, $X_3 \to X_4$,
> $X_3 \to X_5$, $X_4 \leftarrow X_5$ (note the unshielded v-structure at $X_3$ and a path
> from $X_4$ to $X_5$). Linear Gaussian SEM, $n = 500$.
>
> **Phase 1**: Start with $K_5$. At $\ell = 0$: test all pairs unconditionally.
> Remove $X_1 - X_2$ (independent marginally, since they have no direct path without going
> through $X_3$, but $X_3$ is a collider so $X_1 \perp\!\!\!\perp X_2$ marginally — yes).
> Continue removing non-adjacent pairs. At $\ell = 1, 2$: prune remaining edges.
>
> **Phase 2**: Find $X_1 - X_3 - X_2$ unshielded. $X_3 \notin \mathrm{sep}(X_1, X_2) = \emptyset$,
> so orient $X_1 \to X_3 \leftarrow X_2$ ✓.
>
> **Phase 3**: Apply R1 to orient $X_3 \to X_4$ and $X_3 \to X_5$. Check $X_4 - X_5$
> — oriented if further rules apply.
>
> **Output**: CPDAG with v-structure $X_1 \to X_3 \leftarrow X_2$ compelled; further edges
> partially oriented.

## Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | `pc()` function; PC-stable by default; Fisher's $z$, $G^2$ tests built in |
| `causal-learn` | Python | `PC()` class; multiple CI tests (Fisher's z, KCI, chi-sq, ...); GPU-accelerated |
| `pgmpy` | Python | `PC()` class; discrete and continuous support |
| `bnlearn` | R | `pc.stable()` and related; good for Bayesian networks |

## Connections

- **GES** (→ [[Greedy Equivalence Search]]): the score-based counterpart. GES directly optimizes
  BIC in equivalence-class space; PC tests CI constraints. Both output CPDAGs.
- **NOTEARS** (→ [[NOTEARS - Overview]]): continuous optimization over $W \in \mathbb{R}^{d\times d}$;
  does not test CI constraints or operate on CPDAGs. Compared empirically in [[NOTEARS Experiments]]
  where NOTEARS matches or outperforms PC on dense graphs.
- **FCI**: the extension of PC for latent confounders (when causal sufficiency fails).
  Outputs a PAG instead of a CPDAG.
- **Causal sufficiency**: → [[Constraint-Based Causal Discovery#def-causal-sufficiency]]

## See Also
- [[Constraint-Based Causal Discovery]] — the general framework PC instantiates
- [[Markov Equivalence and CPDAGs]] — the CPDAG output representation
- [[Greedy Equivalence Search]] — score-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative; compared in [[NOTEARS Experiments]]
- [[Causal Discovery Methods Comparison]] — when to use PC vs. GES vs. NOTEARS
- [[DAG Structure Learning Problem]] — the problem PC solves; landscape of methods
