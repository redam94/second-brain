---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-ref.md]]"
source_location: "SGS 2000, §5; Spirtes & Glymour (1991); Colombo & Maathuis (2014)"
date_ingested: 2026-10-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based causal discovery"
  - "Spirtes Glymour 1991"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named for **P**eter Spirtes and **C**lark Glymour, 1991/2000) is the
> canonical **constraint-based** causal discovery method. It recovers the [[Markov Equivalence and CPDAGs|CPDAG]]
> of a DAG from observational data by: (1) building the skeleton via a sequence of conditional
> independence (CI) tests, (2) orienting v-structures from the recorded separating sets, and
> (3) propagating orientations using Meek's rules. Under faithfulness, Markov, and consistent
> CI tests, PC is **asymptotically correct**: it converges to the true CPDAG as $n \to \infty$.
> Its runtime is $O(d^{q+2})$ where $q$ is the maximum degree in the true skeleton, making it
> efficient for **sparse** graphs.

## Overview

PC belongs to the *constraint-based* paradigm: rather than optimizing a score over DAGs
(like [[GES Algorithm]]) or over continuous matrices (like [[NOTEARS Algorithm]]),
it tests for conditional independence (CI) in the data and builds the causal structure from
the CI pattern. The algorithm's key insight — attributed to Spirtes & Glymour (1991) — is
that the skeleton and v-structures of the true DAG can be read off from the **separating sets**
$\text{Sep}(X_i, X_j)$ that make $X_i \perp\!\!\!\perp X_j \mid \text{Sep}(X_i, X_j)$.

PC is order-dependent in its original form (the skeleton can vary with the order in which
variable pairs are tested). The **PC-stable** variant (Colombo & Maathuis 2014) removes this
dependence by updating adjacency sets only at the end of each cardinality level.

## Main Content

### Overview of the three phases

The PC algorithm proceeds in three phases, transforming the complete undirected graph into a
CPDAG:

```
Complete graph  -->  [Phase 1: CI tests]  -->  Skeleton + SepSets
                                              -->  [Phase 2: V-structures]
                                              -->  PDAG with v-structures
                                              -->  [Phase 3: Meek rules]
                                              -->  CPDAG
```

### Phase 1: Skeleton estimation

> [!definition] Definition: PC Skeleton Algorithm (SGS 2000, §5.4)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
> **Output:** Undirected skeleton $\hat{G}$ and separating sets $\text{Sep}(i,j)$ for each
> removed edge.
>
> 1. Start with complete undirected graph $G^0$ on $d$ nodes. Set $\ell = -1$.
> 2. **Repeat** (increasing conditioning set size $\ell \leftarrow \ell + 1$):
>    - For each ordered pair $(X_i, X_j)$ adjacent in the current graph:
>      - Let $\text{Adj}(X_i) \setminus \{X_j\}$ be the current neighbours of $X_i$ (excluding $X_j$).
>      - If $|\text{Adj}(X_i) \setminus \{X_j\}| \geq \ell$:
>        - For each subset $S \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>          - Test $H_0: X_i \perp\!\!\!\perp X_j \mid S$ at level $\alpha$.
>          - If the test **accepts** $H_0$: remove edge $X_i - X_j$; record $\text{Sep}(i,j) = S$.
>          - Break inner loop.
> 3. **Until** no adjacent pair has $|\text{Adj}(X_i) \setminus \{X_j\}| \geq \ell$.
^def-skeleton-alg

The algorithm is correct because: under faithfulness, $X_i \perp\!\!\!\perp X_j \mid S$ in the
population iff $S$ d-separates $X_i$ and $X_j$ in the true DAG. The true d-separating set
always exists as a subset of the **Markov blanket** of $X_i$, which is contained in the
neighbours of $X_i$ in the true skeleton. Hence the algorithm finds the true separator for
every non-edge, leaving only true edges intact.

#### Conditional independence tests for Gaussian data

For continuous data under the **Gaussian** assumption, the standard CI test uses the
**partial correlation** and **Fisher's z-transform**:

> [!definition] Definition: Fisher z-test for conditional independence (Kalisch & Bühlmann 2007)
> Let $\hat{\rho}_{ij \mid S}$ be the sample partial correlation of $X_i$ and $X_j$ given $S$.
> Under $H_0: X_i \perp\!\!\!\perp X_j \mid S$ in a multivariate Gaussian:
> $$z_{ij \mid S} = \frac{1}{2} \ln \frac{1 + \hat{\rho}_{ij\mid S}}{1 - \hat{\rho}_{ij\mid S}}$$
> and the test statistic $\sqrt{n - |S| - 3}\, |z_{ij\mid S}|$ converges to $\mathcal{N}(0,1)$
> under $H_0$. Reject independence (keep the edge) if this statistic exceeds $\Phi^{-1}(1 - \alpha/2)$.
^def-fisher-z

For **non-Gaussian continuous** data, kernel-based tests (HSIC, KCI) or
permutation-based tests are used. For **discrete** data, conditional $\chi^2$ or $G^2$ tests
apply. The algorithm is agnostic to the specific test.

#### Complexity

The key to PC's tractability over dense graphs is the **early termination** per pair: the
algorithm only searches conditioning sets of size up to $q^*$, the maximum degree in the true
skeleton. If $q^* \leq q$ is bounded, the number of CI tests is at most $O(d^{q+2})$,
polynomial in $d$. On **dense** graphs ($q^* = O(d)$), it becomes intractable.

### Phase 2: V-structure orientation

> [!definition] Definition: V-structure orientation (SGS 2000, §5.4)
> For each **unshielded triple** $X_i - X_k - X_j$ (meaning $X_i$ and $X_j$ are
> **non-adjacent** in the skeleton):
> - If $X_k \notin \text{Sep}(i, j)$: orient as the **v-structure** $X_i \to X_k \leftarrow X_j$.
> - Otherwise (if $X_k \in \text{Sep}(i, j)$): leave undirected.
^def-vstructure-orient

**Intuition:** $\text{Sep}(i,j) = S$ was the set that made $X_i \perp\!\!\!\perp X_j \mid S$.
If $X_k \in S$, conditioning on $X_k$ *broke* the path — $X_k$ is a non-collider on the
path between $X_i$ and $X_j$, consistent with $X_i \to X_k \to X_j$ or $X_i \leftarrow X_k \leftarrow X_j$
or any other chain/fork through $X_k$. But if $X_k \notin S$, the path was blocked without
conditioning on $X_k$ — the only configuration consistent with this is a **collider**
$X_i \to X_k \leftarrow X_j$ (conditioning on $X_k$ would *open* the path, not close it).

### Phase 3: Meek orientation rules

After v-structures are set, Meek's (1995) four orientation rules propagate the directed edges
to a maximally oriented PDAG (the CPDAG), applying each rule **repeatedly** until no new
orientations fire:

> [!definition] Definition: Meek's orientation rules (Meek 1995)
>
> Let $H$ be a PDAG containing both directed ($\to$) and undirected ($-$) edges.
> Apply rules until none fire:
>
> **R1 (Acyclicity / non-v-structure):**
> If $\alpha \to \beta - \gamma$ and $\alpha \notin \text{adj}(\gamma)$,
> orient $\beta \to \gamma$.
> *(Otherwise $\alpha \to \beta \leftarrow \gamma$ would be a new v-structure inconsistent
> with the separating set found in Phase 1.)*
>
> **R2 (Acyclicity via directed path):**
> If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$,
> orient $\alpha \to \gamma$.
> *(Otherwise $\alpha - \gamma \to \cdots \to \alpha$ could create a directed cycle.)*
>
> **R3 (Avoid new v-structures):**
> If $\alpha - \beta \leftarrow \gamma$, $\alpha - \delta - \gamma$,
> $\delta - \beta$, and $\alpha \notin \text{adj}(\gamma)$,
> orient $\delta \to \beta$.
>
> **R4 (Discriminating paths):**
> If $\alpha - \beta \leftarrow \delta$, $\delta - \gamma$, $\gamma \to \alpha$,
> and $\delta \notin \text{adj}(\beta)$,
> orient $\delta \to \beta$.
^def-meek-rules

The CPDAG produced after exhaustive application of R1–R4 is the unique maximally
informative representation of the Markov equivalence class.

### PC-stable: removing order-dependence

A known limitation of the original PC algorithm is **order-dependence**: different orderings
of the variable pairs in Phase 1 can produce different skeletons for finite samples, because
removing an edge changes the adjacency sets used in subsequent tests.

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> PC-stable modifies Phase 1 by computing **all** CI tests at cardinality level $\ell$
> before removing any edges. Specifically, at each level $\ell$:
> 1. Compute CI tests for all pairs using the adjacency sets **from the previous level** $\ell - 1$.
> 2. Only after all tests at level $\ell$ are done, update the adjacency sets for level $\ell + 1$.
>
> This guarantees that all pairs at a given level see the same adjacency structure, removing
> the ordering artefact. PC-stable is the **default implementation** in the `pcalg` R package.
^def-pc-stable

### Consistency theorem

> [!theorem] Theorem: PC consistency (SGS 2000, Thm. 5.3; Kalisch & Bühlmann 2007)
> Suppose:
> 1. The true distribution $\mathbb{P}$ satisfies the **Markov condition** w.r.t. a DAG $G^*$.
> 2. $\mathbb{P}$ satisfies **faithfulness** w.r.t. $G^*$: every CI holding in $\mathbb{P}$ is
>    d-separation implied by $G^*$.
> 3. The CI test is **consistent**: $\Pr(\text{correct decision}) \to 1$ as $n \to \infty$.
>
> Then the output of PC converges to the CPDAG of $G^*$ as $n \to \infty$.
>
> **High-dimensional extension (Kalisch & Bühlmann 2007):** Under **sparse faithfulness** (only CI
> relationships with conditioning sets up to size $q^*$ are required), PC with the Fisher z-test
> is consistent even when $d = O(e^{n^\beta})$ for some $\beta < 1/2$ (exponentially many nodes).
^thm-pc-consistency

## Examples

> [!example] Example: Running PC on four variables
> Suppose the true DAG is $X_1 \to X_2 \leftarrow X_3 \to X_4$ with $X_2 - X_4$ an edge too.
>
> **Phase 1 (sketch):**
> - Start with complete graph on $\{X_1, X_2, X_3, X_4\}$ (6 edges).
> - Test $X_1 \perp\!\!\!\perp X_3$: if they are marginally dependent (e.g. through $X_2$),
>   test conditioning on $X_2$ — if $X_1 \perp\!\!\!\perp X_3 \mid X_2$, remove $X_1 - X_3$,
>   $\text{Sep}(1,3) = \{X_2\}$.
> - Continue until only true skeleton edges remain.
>
> **Phase 2 (sketch):**
> - Unshielded triple $X_1 - X_2 - X_3$: $X_2 \notin \text{Sep}(1,3) = \{...\}$ → v-structure
>   $X_1 \to X_2 \leftarrow X_3$.
>
> **Phase 3 (sketch):**
> - Apply Meek rules to propagate. $X_3 \to X_4$ may be oriented by R1 if applicable.

## Connections

- **Contrast with GES**: GES traverses the CPDAG space directly via a *score*; PC constructs
  the CPDAG indirectly via CI tests. PC is faster when the graph is sparse ($q^*$ small); GES
  is faster when the number of CI tests would be large.
- **Contrast with NOTEARS**: NOTEARS targets a single DAG via continuous optimisation —
  not the CPDAG. See [[NOTEARS - Overview]] and [[NOTEARS Experiments]] for a comparison.
- **FCI extension**: when **hidden confounders** may exist, the faithfulness assumption must be
  weakened. The **FCI** (Fast Causal Inference) algorithm (also SGS 2000, §6) extends PC to
  output a **PAG** (Partial Ancestral Graph), which represents the equivalence class of
  non-Markovian models.
- **Software**: `pcalg` R package (`pc()` function); `causal-learn` Python library (`PC()`).
  Both default to PC-stable.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG theory, Verma-Pearl theorem
- [[GES Algorithm]] — score-based alternative to PC
- [[NOTEARS - Overview]] — continuous optimisation alternative
- [[DAG Structure Learning Problem]] — problem formulation and comparison table
- [[Directed Acyclic Graphs]] — d-separation semantics
