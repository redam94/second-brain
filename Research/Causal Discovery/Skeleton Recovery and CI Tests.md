---
title: "Skeleton Recovery and CI Tests"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Survey.md]]"
source_location: "§3, Phase 1: Skeleton Recovery; Spirtes et al. (2000) Ch. 5, Alg. 5.4.1"
date_ingested: 2026-07-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[V-Structures and Meek Rules]]"
aliases:
  - "skeleton learning"
  - "conditional independence testing causal discovery"
  - "PC Phase 1"
  - "separating set"
---

# Skeleton Recovery and CI Tests

> [!summary]
> **Phase 1 of the PC algorithm** recovers the **skeleton** of the true DAG — the
> undirected graph of adjacencies — using **conditional independence (CI) tests** of
> increasing order. Starting from a complete graph, it removes edge $X - Y$ whenever
> it finds a **separating set** $S$ such that $X \perp\!\!\!\perp Y \mid S$. The key efficiency
> trick is to test only subsets $S$ of the *current adjacency set* of $X$ or $Y$, not
> all subsets of all variables. The output (skeleton + separating sets) feeds directly
> into **v-structure detection** in Phase 2.

## Overview

The skeleton-recovery phase operationalizes the **Markov condition**: if the true DAG
$G^*$ satisfies the Markov condition, then every pair of non-adjacent variables $X, Y$
in $G^*$ has a **d-separating set** $S \subseteq \mathbf{V} \setminus \{X, Y\}$ such
that $X \perp\!\!\!\perp Y \mid S$ in $\mathbb{P}$. The PC algorithm finds this separating
set for each non-edge, using CI tests as an oracle.

## Main Content

### The Skeleton Recovery Algorithm

> [!definition] Definition: PC Skeleton Algorithm (Spirtes et al. 2000, Alg. 5.4.1 / PC variant)
> **Input**: Variable set $\mathbf{V} = \{X_1, \dots, X_d\}$, CI oracle $\mathcal{I}$.
> **Output**: Skeleton graph $C$ and separating sets $\text{Sep}(X_i, X_j)$ for all non-edges.
>
> 1. Initialize $C$ as the **complete undirected graph** on $\mathbf{V}$.
> 2. Initialize $\text{Sep}(X_i, X_j) \leftarrow \emptyset$ for all $i \neq j$.
> 3. Set $\ell \leftarrow 0$.
> 4. **Repeat**:
>    - For each **ordered** pair $(X_i, X_j)$ adjacent in $C$:
>      - Let $\text{Adj}(C, X_i) \setminus \{X_j\}$ be the current adjacency set of $X_i$, excluding $X_j$.
>      - If $|\text{Adj}(C, X_i) \setminus \{X_j\}| \geq \ell$:
>        - For each $S \subseteq \text{Adj}(C, X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>          - If $\mathcal{I}(X_i, X_j \mid S)$ (CI test returns independence):
>            - Remove edge $X_i - X_j$ from $C$.
>            - Set $\text{Sep}(X_i, X_j) \leftarrow \text{Sep}(X_j, X_i) \leftarrow S$.
>            - **Break** (move to next pair).
>    - Increment $\ell \leftarrow \ell + 1$.
>    - **Until** no adjacent pair $(X_i, X_j)$ in $C$ has $|\text{Adj}(C, X_i) \setminus \{X_j\}| \geq \ell$.
> 5. Return $(C, \text{Sep})$.
^def-skeleton-algorithm

### Why the Adjacency Restriction Works

The crucial observation: under **faithfulness**, if $X \perp\!\!\!\perp Y \mid S$ in $\mathbb{P}$,
then $S$ must be a subset of the **Markov blanket** of $X$ (which equals the adjacency set
of $X$ in $G^*$). Therefore, restricting $S$ to the current adjacency set of $X$ does not
miss any valid separating set — it is guaranteed to find one if it exists.

> [!theorem] Theorem: Correctness of Adjacency Restriction (Spirtes et al. 2000)
> Under the Markov condition, faithfulness, and causal sufficiency:
> $$(X \not\!\perp\!\!\!\perp Y \mid \text{every } S \subseteq \text{Adj}(G^*, X) \setminus \{Y\}) \implies X - Y \in G^*.$$
> Contrapositive: if $X$ and $Y$ are non-adjacent in $G^*$, there exists a separating set
> $S^* \subseteq \text{Adj}(G^*, X) \setminus \{Y\}$ (or $\subseteq \text{Adj}(G^*, Y) \setminus \{X\}$).
^thm-adjacency-restriction

This is what makes PC efficient: it avoids testing all $2^{d-2}$ subsets of $\mathbf{V}$
and instead tests only subsets of the current neighbor list, which shrinks as edges are removed.

### Conditional Independence Tests

Phase 1 is agnostic to the CI test used — any consistent test gives asymptotic correctness.

> [!definition] Definition: Partial Correlation (Gaussian CI Test)
> For Gaussian data, $X_i \perp\!\!\!\perp X_j \mid S$ iff the **partial correlation**
> $\rho_{ij \cdot S} = 0$. The test statistic is:
>
> $$z_{ij|S} = \frac{1}{2}\log\frac{1 + \hat\rho_{ij|S}}{1 - \hat\rho_{ij|S}} = \tanh^{-1}(\hat\rho_{ij|S})$$
>
> which follows $\mathcal{N}(0, 1)$ under $H_0: \rho_{ij|S} = 0$ with effective sample size
> $(n - |S| - 3)$ by Fisher's $z$-transformation. Reject $H_0$ at level $\alpha$ if
>
> $$|z_{ij|S}| \cdot \sqrt{n - |S| - 3} > z_{\alpha/2}.$$
>
> Computing $\hat\rho_{ij|S}$ requires a $(|S|+2)\times(|S|+2)$ matrix inversion —
> $O(|S|^3)$ per test.
^def-partial-correlation

**Non-Gaussian / nonlinear alternatives:**

| Test | Assumption | Notes |
|------|-----------|-------|
| Fisher $z$ | Multivariate Gaussian | Fast; fails under non-Gaussianity |
| $G^2$ / $\chi^2$ | Discrete variables | Requires discretization for continuous |
| HSIC (Gretton et al. 2007) | Any distribution | Kernel method; $O(n^2)$ |
| CMIknn (Runge 2018) | Any distribution | $k$-NN estimator of CMI; $O(n \log n)$ |
| Partial distance correlation | Any distribution | Distribution-free; moderate power |

### Separating Sets and Their Role

> [!definition] Definition: Separating Set
> For non-adjacent $X_i, X_j$ in the recovered skeleton, the **separating set**
> $\text{Sep}(X_i, X_j)$ is the set $S$ that was found to satisfy $X_i \perp\!\!\!\perp X_j \mid S$.
> The algorithm stores $\text{Sep}(X_i, X_j) = \text{Sep}(X_j, X_i) = S$ symmetrically.
>
> The separating set plays a crucial role in Phase 2: a triple $X_i - X_k - X_j$ (with
> $X_i, X_j$ non-adjacent) is a **v-structure** iff $X_k \notin \text{Sep}(X_i, X_j)$.
^def-sepset

### PC-Stable: Fixing Order-Dependence

The original algorithm removes edges as it finds them, meaning later tests use updated
adjacency sets. This creates **order-dependence**: the output can differ based on the
order variables are listed.

> [!definition] Definition: PC-Stable Algorithm (Colombo & Maathuis 2014)
> Modify Step 4 of the skeleton algorithm as follows:
> - **Collect** all edges to remove at level $\ell$ (do not remove them yet).
> - After testing all pairs at level $\ell$, **batch-remove** all collected edges.
> - Update adjacency sets only after the batch removal.
>
> This ensures the adjacency sets used for level-$\ell$ tests are identical regardless
> of the order in which pairs are processed.
^def-pc-stable

PC-stable is the recommended standard: it is asymptotically equivalent to PC but produces
order-independent results and is implemented as the default in `pcalg` and `causal-learn`.

### Example: Linear Gaussian Case

Consider $d = 4$ variables $\{A, B, C, D\}$ with true DAG $A \to B \to C$ and $A \to C$,
with $D$ independent of all others.

| $\ell$ | Pair tested | Conditioning set $S$ | Result |
|--------|------------|----------------------|--------|
| 0 | $(A, D)$ | $\emptyset$ | Indep. → remove $A - D$ |
| 0 | $(B, D)$ | $\emptyset$ | Indep. → remove $B - D$ |
| 0 | $(C, D)$ | $\emptyset$ | Indep. → remove $C - D$ |
| 0 | $(A, B)$ | $\emptyset$ | Dep. → keep |
| 0 | $(A, C)$ | $\emptyset$ | Dep. → keep |
| 0 | $(B, C)$ | $\emptyset$ | Dep. → keep |
| 1 | $(A, C)$ | $\{B\}$ | $A \not\perp C \mid B$ → keep |
| 1 | $(B, C)$ | $\{A\}$ | $B \not\perp C \mid A$ → keep |

Resulting skeleton: $A - B - C$, $A - C$ (a triangle), with $D$ isolated.
Separating sets: $\text{Sep}(A, D) = \text{Sep}(B, D) = \text{Sep}(C, D) = \emptyset$.

Phase 2 then orients the triangle. Since the true DAG has $A \to B, A \to C, B \to C$,
and no v-structure among $\{A, B, C\}$, the output CPDAG should have $A - B - C$, $A - C$
with at least one directed edge (Meek rules may orient the cycle).

## Connections

- **Phase 2**: the separating sets from Phase 1 feed directly into v-structure detection
  in [[V-Structures and Meek Rules]].
- **NOTEARS**: [[NOTEARS Algorithm]] bypasses CI testing entirely — it minimizes a
  continuous score over all edges simultaneously, rather than testing pairs.
- **FCI extension**: when causal sufficiency fails, Phase 1 runs an augmented skeleton
  procedure with a second pass to handle **inducing paths** (paths along which all
  non-endpoint variables are ancestors of both endpoints).

## See Also
- [[PC Algorithm - Overview]] — the full two-phase algorithm this note is Phase 1 of
- [[V-Structures and Meek Rules]] — Phase 2: orientation using the Sep sets produced here
- [[Markov Equivalence and CPDAGs]] — the Verma–Pearl theorem underlying the correctness
- [[GES - Greedy Equivalence Search]] — the score-based alternative that avoids CI tests
- [[DAG Structure Learning Problem]] — problem framing (NOTEARS approach)
