---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-pc-algorithm.txt]]"
source_location: "Kalisch & Bühlmann (2007) §2–4; Spirtes, Glymour & Scheines (2000) Ch. 5–6"
date_ingested: 2026-09-20
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "skeleton discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines, 2000) is
> the canonical **constraint-based** causal discovery method. It recovers the CPDAG of
> the true DAG from i.i.d. observational data by conducting a sequence of conditional
> independence (CI) tests: first to remove edges from a complete graph (skeleton phase),
> then to orient v-structures, then to propagate orientation via Meek's rules. Under
> faithfulness and causal sufficiency, PC is **asymptotically consistent** and —
> crucially — **computationally feasible** in sparse high-dimensional settings because
> the conditioning sets remain small (Kalisch & Bühlmann, 2007).

## Overview

The PC algorithm is named after its authors **P**eter Spirtes and **C**lark Glymour.
It operationalises the Verma–Pearl characterisation of Markov equivalence: skeleton +
v-structures uniquely determine the CPDAG ([[Markov Equivalence and CPDAGs]]). The
algorithm exploits the **Markov condition** and **faithfulness** to read off these
structures from CI test results on the data.

The key computational insight is that the skeleton discovery phase orders CI tests by
the *size of the conditioning set*: starting from size 0 (marginal independence), then
size 1, and so on. In sparse graphs, most edges are removed by small conditioning sets,
so the algorithm rarely needs large-set tests. This is why PC is feasible for
high-dimensional sparse DAGs even though exact structure learning is NP-hard.

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> The PC algorithm assumes:
> 1. **Causal Markov condition**: the true data-generating process corresponds to a
>    DAG $G^*$, and the distribution $\mathbb{P}$ satisfies the global Markov property
>    with respect to $G^*$.
> 2. **Faithfulness**: $\mathbb{P}$ is faithful to $G^*$ (see [[Markov Equivalence and CPDAGs#^def-faithfulness]]).
>    Equivalently, no CI relation holds in $\mathbb{P}$ unless entailed by $d$-separation in $G^*$.
> 3. **Causal sufficiency**: there are no hidden common causes (latent confounders)
>    between any pair of observed variables. (The FCI algorithm relaxes this.)
> 4. **Oracle CI oracle** (for theoretical consistency): in practice, CI tests have finite-sample
>    errors; the PC-stable variant mitigates order-dependence issues.
^def-pc-assumptions

### Phase 1: Skeleton Discovery

The skeleton discovery phase removes edges by finding **separating sets**.

> [!definition] Definition: Separating Set
> For two variables $X_i$ and $X_j$, a set $S \subseteq \mathsf{V} \setminus \{i,j\}$
> is a **separating set** (or **d-separator**) if
> $$X_i \perp X_j \mid S$$
> holds in the distribution. Under faithfulness, this occurs if and only if $S$
> $d$-separates $i$ and $j$ in $G^*$.
^def-sep-set

> [!theorem] Algorithm: PC Skeleton Discovery (Spirtes et al. 2000, Ch. 5)
> **Input:** Variables $\{X_1,\dots,X_d\}$, significance level $\alpha$, CI oracle.
> **Output:** Skeleton $\hat{H}$ (undirected graph) and separating sets $\mathrm{sep}(i,j)$ for all non-adjacent pairs.
>
> 1. **Initialise** the complete undirected graph $G' \leftarrow K_d$.
> 2. **For** $l = 0, 1, 2, \ldots$:
>    - **For** each adjacent pair $(X_i, X_j)$ in the current $G'$:
>      - Let $\mathrm{Adj}(i) \setminus \{j\}$ be the current neighbours of $i$ excluding $j$.
>      - **For** each subset $S \subseteq \mathrm{Adj}(i) \setminus \{j\}$ with $|S| = l$:
>        - If $X_i \perp X_j \mid S$ (CI test passes at level $\alpha$):
>          - Remove edge $i \!-\! j$ from $G'$.
>          - Record $\mathrm{sep}(i,j) \leftarrow S$.
>          - **Break** (move to next pair).
>    - **If** no pair $(i,j)$ has $|\mathrm{Adj}(i) \setminus \{j\}| \geq l+1$: **Stop**.
> 3. **Return** skeleton $G'$ and separating sets.
^alg-skeleton

**Key observation:** the outer loop increments $l$ from 0, so the algorithm tests
small conditioning sets first. In a $q$-sparse DAG (max degree $q$), the loop ends
at $l = q$, and the total number of CI tests is $O(d^2 \binom{q}{l} \cdot d^0) = O(d^2 \cdot q^q)$
— polynomial in $d$ for fixed $q$.

### Phase 2: V-Structure Orientation

> [!theorem] Algorithm: V-Structure Orientation
> **Input:** Skeleton $G'$, separating sets $\mathrm{sep}(i,j)$.
> **Output:** PDAG with v-structures oriented.
>
> For every **unshielded triple** $X_i - X_k - X_j$ (i.e., $X_i$ and $X_j$ are
> *non-adjacent* in the skeleton):
> - If $X_k \notin \mathrm{sep}(i, j)$: orient as $X_i \to X_k \leftarrow X_j$
>   (v-structure / collider).
> - If $X_k \in \mathrm{sep}(i, j)$: leave $X_i - X_k - X_j$ undirected.
^alg-vstructures

**Intuition:** if $X_k$ was *not* in the separating set, then conditioning on $X_k$
creates a dependence between $X_i$ and $X_j$ (collider path opens). This marks $X_k$
as a collider in this triple.

### Phase 3: Meek Propagation

Apply Meek's orientation rules exhaustively to orient remaining undirected edges
without creating new v-structures or cycles (see
[[Markov Equivalence and CPDAGs#^thm-meek-rules]]). The output is the CPDAG of the
Markov equivalence class of $G^*$.

### Conditional Independence Tests

The CI test in Phase 1 must be chosen to match the data type:

| Data type | CI test | Test statistic |
|-----------|---------|----------------|
| Continuous Gaussian | Partial correlation | Fisher's $z$-transform of $r_{ij \mid S}$ |
| Continuous, non-Gaussian | KCIT or HSIC | Kernel CI test (Schölkopf et al.) |
| Discrete | $G^2$ or $\chi^2$ | Likelihood-ratio or Pearson |
| Mixed | CG-test | Conditional Gaussian |

For Gaussian data, the partial correlation test is: $H_0: \rho_{ij\mid S} = 0$, tested
via Fisher's $z$-transform $z_{ij\mid S} = \frac{1}{2}\ln\frac{1+\hat{r}_{ij\mid S}}{1-\hat{r}_{ij\mid S}}$,
which under $H_0$ is approximately $\mathcal{N}(0, 1/(n-|S|-3))$.

### Consistency in High Dimensions (Kalisch & Bühlmann, 2007)

> [!theorem] Theorem: PC Consistency for Sparse High-Dimensional DAGs
> (Kalisch & Bühlmann, 2007, Theorem 3.1)
>
> Let $G^*$ be the true DAG on $d$ nodes with **maximum neighbourhood size** $q$
> (i.e., maximum degree in the skeleton). Suppose the distribution is faithful to $G^*$
> and Gaussian with bounded condition numbers.
>
> If $d = O(n^a)$ for any $a > 0$, and the significance level $\alpha_n = \Phi(-c\sqrt{\log n})$
> for a sufficiently large constant $c > 0$, then
> $$\mathbb{P}\bigl(\hat{G}_{\mathrm{PC}} = \mathrm{CPDAG}(G^*)\bigr) \to 1 \quad \text{as } n \to \infty.$$
> That is, PC **consistently estimates the CPDAG** even when $d \gg n$, provided the
> true DAG is sparse ($q$ fixed or growing slowly).
^thm-pc-consistency

This result established that PC is not just a heuristic but a statistically consistent
method for high-dimensional settings — a key contribution of Kalisch & Bühlmann (2007).

### PC-Stable: Resolving Order-Dependence

The original PC algorithm's output can depend on the ordering of variables when CI tests
are non-exact (finite samples). **PC-stable** (Colombo & Maathuis, 2014) resolves this
by separating the CI test bookkeeping from edge removal: all tests at level $l$ are
conducted before any edges are removed at that level, ensuring the adjacency sets used
for conditioning remain consistent within each round.

## Computational Complexity

For a $d$-node DAG with maximum skeleton degree $q$:
- **Number of CI tests**: at most $\binom{d}{2} \cdot \binom{q-1}{l}$ per level $l$, totalling $O(d^2 \cdot q^q)$
- **Dominant cost**: computing partial correlations, each $O(|S|^3)$ for inversion; overall manageable for $q \leq 10$ and $d \leq 10^3$
- **Bottleneck**: kernel CI tests for non-Gaussian data scale poorly ($O(n^2)$ per test)

## Extensions and Variants

| Variant | Relaxed assumption | Output |
|---------|-------------------|--------|
| **FCI** (Fast Causal Inference) | Allows hidden confounders | PAG (Partial Ancestral Graph) |
| **RFCI** | Like FCI, faster | PAG |
| **CPC** (Conservative PC) | More conservative v-structure decisions | CPDAG (more undirected edges) |
| **PC-stable** | Order-independent | CPDAG |
| **PCMCI** | Time-series data | Summary causal graph |

## Software

- **R**: `pcalg` package — `pc()` function (Kalisch, Mächler, Colombo, Maathuis, Bühlmann)
- **Python**: `causal-learn` (`pc` function), `cdt` (Causal Discovery Toolbox)
- **Java/Python**: `Tetrad` suite — the reference implementation

## Connections

- **Compared to GES** ([[Greedy Equivalence Search]]): PC is constraint-based (uses CI tests);
  GES is score-based (maximises a decomposable score). Both output CPDAGs; GES is often more
  accurate in the large-sample limit but PC is faster for large $d$ with sparse $G^*$.
- **Compared to NOTEARS** ([[NOTEARS - Overview]]): NOTEARS is continuous optimization; PC is
  combinatorial. The [[DAG Structure Learning Problem]] note's landscape table lists PC as the
  canonical constraint-based approach against which continuous methods compare.
- **For latent confounders**: FCI generalises PC by allowing hidden common causes, outputting
  a PAG rather than a CPDAG.
- **Faithfulness and identification limits**: the best PC can achieve is the CPDAG — see
  [[Markov Equivalence and CPDAGs]] for why additional assumptions (non-Gaussianity,
  interventions) are needed to go further.
- **In the vault context**: [[Summary Causal DAGs]] derives a DAG summary of ABM dynamics —
  PC and GES are the natural tools for learning such a summary from ABM simulation output.

## See Also
- [[Markov Equivalence and CPDAGs]] — what PC's output represents
- [[Greedy Equivalence Search]] — score-based alternative; proven consistent under same assumptions
- [[DAG Structure Learning Problem]] — problem setup and the landscape of approaches
- [[NOTEARS - Overview]] — continuous optimization alternative; cites PC as baseline
- [[Directed Acyclic Graphs]] — d-separation and Markov conditions
- [[BN Construction Methods Comparison]] — expert elicitation vs. data-driven approaches
