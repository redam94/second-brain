---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-ref.md]]"
source_location: "Kalisch & Bühlmann (2007) JMLR 8:613-636; Spirtes, Glymour & Scheines (2000) Ch. 5–6"
date_ingested: 2026-08-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines 1991/2000) is the foundational
> **constraint-based** method for causal structure learning. It recovers the **CPDAG**
> of the data-generating DAG by performing conditional independence (CI) tests to
> prune the skeleton, identifying v-structures from the test results, and applying
> Meek's rules. Its computational key: starting from a complete undirected graph,
> it tests only the **adjacency sets** of each node pair — not all $2^p$ subsets —
> which gives polynomial time for sparse graphs. Kalisch & Bühlmann (2007) prove
> high-dimensional consistency when $p = O(n^a)$ for any $a > 0$, given a consistent
> CI test and a sparse faithfulness assumption.

## Overview

The PC algorithm (named for its inventors **P**eter Spirtes and **C**lark Glymour) is
the canonical constraint-based causal discovery method. Unlike [[NOTEARS - Overview|NOTEARS]] and
[[GES Algorithm|GES]], which optimize a score, PC is **assumption-free** in the sense that
it makes no parametric assumptions about the data distribution — it only needs a CI test.
This makes PC applicable to any distribution for which conditional independence can be tested
(Gaussian, discrete, nonparametric via kernel tests, etc.).

**Key assumptions:**
- **Causal Markov condition:** Every variable is independent of its non-descendants given its parents.
- **Faithfulness:** Every conditional independence in the distribution is *entailed* by the DAG
  (no accidental cancellations create spurious independencies).
- **Causal sufficiency:** No hidden common causes (no unmeasured confounders); all common causes
  of measured variables are measured.

Under these assumptions, the CPDAG of the generating DAG is identifiable from the observational
distribution, and PC recovers it consistently.

## Main Content

### Algorithm Overview

PC runs in three phases:

```
Input:  Data matrix X (n × p), significance level α, CI test
Output: CPDAG C over p variables

Phase 1: Skeleton Discovery
  Start with complete undirected graph H on p nodes
  For ℓ = 0, 1, 2, ... :
    For every adjacent pair (X, Y) in H:
      For every subset S ⊆ adj(X)\{Y} with |S| = ℓ:
        Test X ⊥⊥ Y | S
        If independent: remove edge X-Y; record sepset(X,Y) = S; break inner loop
    Stop when no |adj|-ℓ-sized set exists for any remaining edge

Phase 2: V-Structure Orientation
  For every unshielded triple X-Z-Y (X,Y not adjacent) in H:
    If Z ∉ sepset(X,Y): orient X → Z ← Y  (v-structure / collider)
    Else:               leave X-Z-Y undirected

Phase 3: Edge Propagation (Meek Rules)
  Apply Meek's four rules (R1–R4) to H until no further orientations possible
  → yields the CPDAG C
```

### Phase 1: Skeleton Discovery

> [!definition] Skeleton Discovery (PC, Phase 1)
> Given a significance level $\alpha$ and a CI test $T$, start with the complete undirected
> graph $H = K_p$. For each conditioning set size $\ell = 0, 1, 2, \ldots$:
>
> For each adjacent pair $(X_i, X_j)$ in $H$, test $X_i \perp\!\!\!\perp X_j \mid S$ for
> every $S \subseteq \mathrm{adj}_H(X_i) \setminus \{X_j\}$ with $|S| = \ell$.
>
> If any test accepts independence at level $\alpha$:
> - Remove edge $X_i - X_j$ from $H$
> - Record $\mathrm{sepset}(X_i, X_j) = S$
>
> Stop when $\ell > \max_{(i,j) \in H} |\mathrm{adj}_H(X_i)| - 1$.
>
> **Output:** Skeleton (undirected adjacency graph) and separation sets.
^def-skeleton-discovery

> [!note] Why test only adjacency sets?
> The key insight: if $X \perp\!\!\!\perp Y \mid S$ for some $S$, then $X$ and $Y$ must be
> **d-separated** in the true DAG by some subset of the parents of $X$ or $Y$ (by the
> Markov condition). Since parents are adjacent, the conditioning set is always a
> subset of the adjacency set. Testing all $2^p$ subsets is unnecessary.
> For a DAG with maximum in-degree $q$, only sets of size $\leq q$ need be tested,
> giving $O(p^{q+2})$ tests — polynomial in $p$ for fixed $q$.

**Common CI tests by data type:**

| Data type | Test | Null hypothesis |
|-----------|------|----------------|
| Gaussian | Fisher's z-test on partial correlations | $\rho_{XY \cdot S} = 0$ |
| Discrete | $\chi^2$ / G-test | $P(X,Y \mid S) = P(X \mid S) P(Y \mid S)$ |
| Nonparametric | Kernel CI test (HSIC), CMIknn | distributional independence |
| Mixed | CItest-based on residuals | model-residual independence |

For Gaussian data, the partial correlation $\hat{\rho}_{XY \cdot S}$ is the CI test
statistic, with Fisher's z-transform: $Z = \frac{1}{2}\ln\frac{1+\hat\rho}{1-\hat\rho}$,
asymptotically $N(0, (n-|S|-3)^{-1})$ under the null.

### Phase 2: V-Structure Orientation

> [!definition] V-Structure Identification (PC, Phase 2)
> For each **unshielded triple** $(X_i, X_k, X_j)$ in the skeleton — where $X_i - X_k - X_j$
> and $X_i, X_j$ are **not** adjacent — check the recorded separation set:
>
> $$X_i \to X_k \leftarrow X_j \quad \text{(v-structure)} \iff X_k \notin \mathrm{sepset}(X_i, X_j)$$
>
> Intuition: if $X_k$ is a collider, then conditioning on $X_k$ would *induce* dependence
> between $X_i$ and $X_j$ (explaining away). The tests that removed the edge $X_i - X_j$
> must have found $X_i \perp\!\!\!\perp X_j \mid S$ for some $S$ not containing $X_k$.
^def-vstructure-id

### Phase 3: Meek Rules

Apply Meek's four orientation rules (see [[Markov Equivalence and CPDAGs#^def-meek-rules]])
to the PDAG resulting from Phases 1–2, until no further orientations are possible.
The output is the **CPDAG** — the unique representative of the true model's Markov
equivalence class.

### The PC-Stable Variant

The original PC algorithm is **order-dependent**: the skeleton it recovers depends on
the order in which variables are examined in Phase 1. The **PC-stable** variant
(Colombo & Maathuis 2014) fixes this by:
1. Fixing the adjacency set $\mathrm{adj}_H(X_i)$ at the beginning of each size-$\ell$ round
   (not updating after each removal within a round).
2. Breaking ties between equally-sized conditioning sets consistently.

PC-stable recovers the same skeleton and equivalence class as PC in the population limit,
but is reproducible with respect to variable ordering.

### High-Dimensional Consistency (Kalisch & Bühlmann 2007)

> [!theorem] Theorem: High-Dimensional PC Consistency (Kalisch & Bühlmann 2007)
> Assume:
> 1. **Gaussian data** with a DAG-faithful distribution.
> 2. **Sparse DAG**: maximum in-degree bounded by $q$ (fixed).
> 3. **Sparse faithfulness**: all partial correlations that are nonzero are bounded
>    away from zero: $|\rho_{XY \cdot S}| \geq c > 0$ for relevant $S$.
>
> Then PC with Fisher's z-test at level $\alpha_n \to 0$ such that $\alpha_n = O(n^{-\beta})$
> for some $\beta > 0$ is **consistent**: the output CPDAG equals the true CPDAG
> **with probability tending to 1** as $n \to \infty$, even when $p = O(n^a)$ for any $a > 0$.
>
> **Significance:** PC is consistent for $p \gg n$ (high-dimensional settings) under sparsity,
> unlike classical asymptotics that assume $p$ fixed and $n \to \infty$.
^thm-kb-consistency

## Complexity and Limitations

| Property | PC Algorithm |
|----------|-------------|
| **Complexity** | $O(p^{q+2})$ CI tests for fixed max-degree $q$; exponential in $q$ |
| **Output** | CPDAG (not a unique DAG) |
| **Assumptions** | Faithfulness, Markov, causal sufficiency |
| **CI test dependency** | Output quality depends entirely on CI test validity |
| **Multiple testing** | $O(p^{q+2})$ tests → multiple comparison inflation; correction needed |
| **Order dependence** | Original PC is order-dependent (fixed by PC-stable) |
| **Confounders** | Fails if causal sufficiency violated (use FCI instead) |

**Failure modes:**
- **Faithfulness violations**: Near-cancellation of paths creates near-zero partial correlations
  that are falsely declared zero. More common in high-$p$ settings.
- **Finite-sample type I/II errors in CI tests**: A single wrong decision in Phase 1 propagates
  through all subsequent steps. Skeleton errors are not correctable in Phase 2 or 3.
- **Dense graphs**: Exponential in max-degree — infeasible for hub variables.

## Comparison to Score-Based Methods

| Dimension | PC (constraint-based) | GES (score-based) |
|-----------|----------------------|-------------------|
| Core object | CI tests (distributional) | Score function (likelihood-based) |
| Search space | Start complete, prune | Start empty, add/remove |
| Global optimality | No (local CI decisions) | Yes (GES is globally optimal in limit) |
| Distributional assumptions | Minimal (only CI test needed) | Requires likelihood model |
| Speed (sparse graphs) | Fast ($O(p^{q+2})$) | Fast (decomposable scores) |
| Speed (dense graphs) | Slow (exponential in $q$) | Slow (more operations per step) |
| Software | `pcalg` (R), `causal-learn` (Python) | `pcalg` (R), `causal-learn` (Python) |

## Connections

- **[[Markov Equivalence and CPDAGs]]** — PC outputs the CPDAG; understand CPDAG before running PC.
- **[[GES Algorithm]]** — the score-based alternative that is globally optimal in the limit.
- **[[NOTEARS - Overview]]** — continuous optimization alternative; bypasses both CI tests and score optimization over discrete space.
- **[[NOTEARS Experiments]]** — PC is one of the baselines NOTEARS compares against (Table 1/Fig. 3).
- **[[DAG Structure Learning Problem]]** — places PC in the landscape of prior structure-learning methods.
- **[[Directed Acyclic Graphs]]** — d-separation theory underlying the Markov and faithfulness conditions.
- **[[LLM Expert Elicitation for Bayesian Networks]]** — PC as an alternative to expert-elicited BN structure when observational data are plentiful.
- **[[Summary Causal DAGs]]** — structure learning (PC/GES) is the step that precedes DAG summarization.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG representation and Meek rules
- [[GES Algorithm]] — score-based alternative with global optimality guarantee
- [[DAG Structure Learning Problem]] — problem landscape
- [[NOTEARS - Overview]] — continuous optimization approach
- [[Directed Acyclic Graphs]] — d-separation semantics
