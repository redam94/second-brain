---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search, 2nd ed. MIT Press; Colombo & Maathuis (2014) — JMLR 15:3921-3962"
source_location: "SGS Ch. 5–6 (skeleton recovery, orientation); Colombo & Maathuis §3 (PC-stable)"
date_ingested: 2026-09-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
  - "[[BN Construction Methods Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines PC"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000) is the
> foundational **constraint-based** method for causal structure learning. It recovers the
> skeleton of the true DAG via a sequence of conditional independence (CI) tests, orients
> v-structures using recorded separating sets, and applies Meek's propagation rules to
> produce a **CPDAG**. Under faithfulness and causal sufficiency it is asymptotically correct.
> Its computational cost is worst-case exponential in the maximum degree of the true graph;
> in sparse graphs it is polynomial. The **PC-stable** variant (Colombo & Maathuis, 2014)
> removes the order-dependence of the classic algorithm.

## Overview

The **PC algorithm** is named after its inventors **P**eter Spirtes and **C**lark Glymour.
It belongs to the **constraint-based** family of structure learning: rather than optimizing
a score over DAGs (as in [[GES - Greedy Equivalence Search]] or [[NOTEARS - Overview]]), it
reads off the graph structure directly from conditional independence relationships in the data.

The key insight is that under faithfulness, the **separating set** $\mathrm{sepset}(X_i, X_j)$
— the smallest set $\mathbf{S}$ such that $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ — corresponds
to a set that d-separates $X_i$ and $X_j$ in the true DAG. By collecting these separating sets
during skeleton recovery, the algorithm can both remove edges (Phase 1) and orient v-structures
(Phase 2) without ever scoring or enumerating DAGs.

## Main Content

### Assumptions

> [!info] Assumptions required by PC
> 1. **Acyclicity**: the true data-generating process is a DAG.
> 2. **Causal Markov condition**: the distribution factorises over the DAG
>    (see [[Markov Equivalence and CPDAGs#^def-markov]]).
> 3. **Faithfulness**: every CI in the data corresponds to a d-separation in the true DAG
>    (see [[Markov Equivalence and CPDAGs#^def-faithfulness]]). Without this, skeleton
>    recovery can add spurious edges or miss true ones.
> 4. **Causal sufficiency**: no latent common causes
>    (see [[Markov Equivalence and CPDAGs#^def-causal-sufficiency]]).
>    Relax this to get the FCI algorithm (PAG output).

### Phase 1: Skeleton Recovery

The skeleton is the undirected graph obtained by forgetting edge directions. PC recovers
it by progressively testing CI given larger conditioning sets, removing edges when a
separating set is found.

> [!example] Algorithm: Skeleton Recovery (PC/PC-stable)
> **Input:** Variables $\{X_1,\dots,X_d\}$; CI oracle or test.
>
> 1. Initialise $\hat{G}$ as the complete undirected graph on $d$ nodes.
>    Set $\ell = 0$.
> 2. **While** there exist adjacent pairs $(X_i, X_j)$ with $|\mathrm{adj}_{\hat{G}}(X_i) \setminus \{X_j\}| \geq \ell$:
>    - For each adjacent pair $(X_i, X_j)$:
>      - For each $\mathbf{S} \subseteq \mathrm{adj}_{\hat{G}}(X_i) \setminus \{X_j\}$
>        with $|\mathbf{S}| = \ell$:
>        - If $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ (by CI test):
>          - Store $\mathrm{sepset}(X_i, X_j) = \mathbf{S}$.
>          - **Remove** edge $X_i - X_j$ from $\hat{G}$.
>          - Break (skip remaining $\mathbf{S}$ for this pair).
>    - Set $\ell \leftarrow \ell + 1$.
> 3. **Output:** Skeleton $\hat{G}$ and $\{\mathrm{sepset}(X_i, X_j)\}$.
>
> **PC-stable variant:** At each level $\ell$, record all independence decisions but defer
> edge removal until the *end* of the level. This ensures the skeleton is independent of
> variable ordering (Colombo & Maathuis, 2014).
^alg-skeleton

> [!note] Why small conditioning sets first?
> Testing marginal independence (level $\ell=0$) first removes the most edges cheaply.
> Higher-level conditioning sets are only tested for pairs that *remain* adjacent after
> lower-level removals, keeping the adjacency sets $\mathrm{adj}(X_i)$ shrinking.
> In a true sparse DAG the algorithm terminates at $\ell = k_{\max}$ where $k_{\max}$
> is the maximum degree — no higher-order tests are needed.

### Phase 2: V-Structure Identification

Using the recorded separating sets, orient unshielded colliders (v-structures).

> [!definition] Definition: Unshielded Triple and V-Structure
> A triple $(X_i, X_k, X_j)$ is **unshielded** if $X_i \sim X_k$, $X_k \sim X_j$, and
> $X_i \not\sim X_j$ (no direct edge between $X_i$ and $X_j$). It is a **v-structure
> (collider)** if $X_i \to X_k \leftarrow X_j$.
^def-vstructure

> [!theorem] V-Structure Rule
> For each unshielded triple $(X_i, X_k, X_j)$, orient as $X_i \to X_k \leftarrow X_j$
> if and only if $X_k \notin \mathrm{sepset}(X_i, X_j)$.
>
> **Intuition:** If $X_k$ is the collider, conditioning on $X_k$ creates dependence
> (Berkson's paradox / collider bias) — so the separating set that renders
> $X_i \perp\!\!\!\perp X_j$ does *not* include $X_k$.
^thm-vstructure

This step uses exactly the characterisation of [[Markov Equivalence and CPDAGs#^thm-markov-equiv]]:
v-structures are the only orientations that are invariant across the Markov equivalence class.

### Phase 3: Edge Orientation via Meek's Rules

After orienting v-structures, apply Meek's (1995) rules to propagate orientations without
introducing new v-structures or directed cycles. Repeat until no further orientation is possible.

> [!theorem] Meek's Orientation Rules (Meek, 1995)
> Let $\hat{G}$ be the PDAG after Phase 2.  Apply iteratively:
>
> **R1** (Avoid new collider): If $X_i \to X_k - X_j$ and $X_i \not\sim X_j$, orient $X_k \to X_j$.
> *(Orienting $X_j \to X_k$ would create a new v-structure at $X_k$.)*
>
> **R2** (Avoid cycle): If $X_i - X_j$ and there is a directed path $X_i \to X_k \to X_j$,
> orient $X_i \to X_j$.
> *(Orienting $X_j \to X_i$ would create a directed cycle.)*
>
> **R3** (Fork resolution): If $X_i - X_j$ with $X_i - X_k \to X_j$ and $X_i - X_m \to X_j$
> and $X_k \not\sim X_m$, orient $X_i \to X_j$.
>
> **R4** (Meek, 1995): If $X_i - X_j$ with $X_m \to X_k$, $X_k \to X_j$, $X_m - X_i$,
> $X_m \not\sim X_j$, orient $X_i \to X_j$.
>
> **Output:** CPDAG $\hat{G}$.
^thm-meek-rules

### Correctness

> [!theorem] Asymptotic Correctness of PC (Spirtes, Glymour & Scheines, 2000)
> In the **oracle setting** (perfect CI tests), under acyclicity, CMC, faithfulness, and
> causal sufficiency, PC returns the **correct CPDAG** of the data-generating distribution.
>
> In **finite samples** with a consistent CI test at significance level $\alpha_n \to 0$
> (slowly enough as $n \to \infty$), the output converges in probability to the true CPDAG.
^thm-pc-correct

### Conditional Independence Tests

The choice of CI test determines both Type I error (false edge removal) and power (false edge retention).

| Data Type | Test | Key Properties |
|-----------|------|----------------|
| Continuous Gaussian | Partial correlation $\rho_{X_iX_j\cdot\mathbf{S}}$; Fisher's Z-test | $O(n)$ per test; analytic null distribution |
| Continuous, non-Gaussian | KCI (kernel CI test; Zhang et al., 2012) | Non-parametric; $O(n^3)$ |
| Continuous, large $n$ | RCIT (Random Fourier approximate kernel CI) | $O(n)$; approximates KCI |
| Discrete / categorical | $G^2$ or $\chi^2$ test | Requires sufficient marginal counts |
| Mixed continuous/discrete | Mixed KCI; MGCM | — |

For **Gaussian** data: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ iff partial correlation
$\rho_{X_iX_j\cdot\mathbf{S}} = 0$. Fisher's Z-statistic for this test under $H_0$:
$$z = \frac{1}{2} \ln\frac{1+\hat\rho}{1-\hat\rho} \sim \mathcal{N}\!\left(0, \frac{1}{n - |\mathbf{S}| - 3}\right).$$

### Complexity

**Worst-case:** The number of CI tests at level $\ell$ is at most
$O\!\left(d^2 \binom{d-2}{\ell}\right)$. In the worst case (dense graphs) this is
$O(d^{k_{\max}+2})$ where $k_{\max}$ is the maximum degree of the true graph.

**In practice (sparse graphs):** When the true graph has max degree $k_{\max}$, the adjacency
sets shrink to at most $k_{\max}$ after early levels, and no level $> k_{\max}$ is reached.
The algorithm is then polynomial: $O(d^{k_{\max}+2})$ for fixed $k_{\max}$.

**Order-dependence:** The classic PC output can depend on the variable ordering. Colombo &
Maathuis (2014) show the effect is worst in high dimensions and propose **PC-stable** (record
all CIs at each level before removing any edges). Always prefer `skeleton = 'stable'` in
`pcalg::pc()`.

## Software

| Package | Language | Key Function | Notes |
|---------|----------|-------------|-------|
| `pcalg` | R | `pc()` | Reference implementation; supports stable skeleton; multiple CI tests via `indepTest` |
| `causal-learn` | Python | `PC` | Active development; supports KCI, Fisher Z, G$^2$ |
| `bnlearn` | R | `pc.stable()` | BN-centric; simpler interface |
| `pgmpy` | Python | `PC` | Probabilistic graphical models framework |

## Connections

- **[[Markov Equivalence and CPDAGs]]**: the CPDAG is the object PC outputs; v-structure identification
  in Phase 2 implements the Verma-Pearl equivalence theorem directly.
- **[[GES - Greedy Equivalence Search]]**: the score-based counterpart. Both output the same CPDAG
  under faithfulness + causal sufficiency in the large-sample limit. GES avoids CI testing and is
  generally preferred when reliable CI tests are unavailable.
- **[[NOTEARS - Overview]]**: continuous-optimization alternative; [[NOTEARS Experiments]] shows
  PC is outperformed by FGS and NOTEARS on dense/large graphs (reported in the supplement).
- **[[DAG Structure Learning Problem]]**: classifies PC as "constraint-based" in the prior-method
  landscape table; NP-hardness of the discrete search is the motivation for constraint-based methods
  in sparse settings.
- **[[Directed Acyclic Graphs]]**: d-separation is the theoretical tool that justifies both
  Phase 1 (CIs ↔ separating sets) and Phase 2 (v-structures = invariant orientations).
- **[[LLM Expert Elicitation for Bayesian Networks]]**: automated PC structure learning is the
  data-driven alternative to expert elicitation; [[BN Construction Methods Comparison]] provides
  the comparison.
- **[[Approximate Bayesian Computation for ABMs]]**: CI tests connect to the ABC idea of matching
  distributional features; in both cases structure/parameters are inferred from observable statistics.

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG output and its foundations
- [[GES - Greedy Equivalence Search]] — score-based counterpart to PC
- [[NOTEARS - Overview]] — continuous-optimization alternative, compared empirically vs PC
- [[DAG Structure Learning Problem]] — problem setup and prior-method landscape
- [[Directed Acyclic Graphs]] — d-separation foundation for CI-based reasoning
