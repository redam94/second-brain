---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-structure-learning-survey.md]]"
source_location: "Spirtes & Glymour (1991); Spirtes, Glymour & Scheines (2000), Ch. 5–6; Kalisch & Bühlmann (2007)"
date_ingested: 2026-08-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991, named after Peter Spirtes and Clark Glymour)
> is the foundational **constraint-based** method for causal structure learning. It recovers the
> **CPDAG** of the true DAG by using conditional independence (CI) tests as the primary tool:
> edges are removed when a separating set is found, v-structures are oriented by inspecting
> separating sets, and the remaining orientations are propagated by the Meek rules. Under
> the **Markov condition**, **faithfulness**, and **causal sufficiency** (no hidden common causes),
> PC is asymptotically consistent — it recovers the true CPDAG in the limit of infinite data.
> In practice, PC is well-suited to sparse graphs; its computational cost scales exponentially
> with the maximum degree (conditioning set size) but polynomially with the number of nodes.

## Overview

Whereas score-based methods ([[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]]) treat
structure learning as a numerical optimization problem, PC treats it as a **hypothesis testing**
problem: for each pair of variables $(X_i, X_j)$, test whether there exists a conditioning set $Z$
that renders them conditionally independent. If yes, there is no direct edge; if no such $Z$ exists,
there is a direct edge.

The key insight is that d-separation ([[CPDAG and Markov Equivalence]]) connects graph structure to
conditional independence: $X_i$ and $X_j$ are d-separated by exactly the sets that are "on the
path" between them. The algorithm exploits the **Markov boundary** — each variable's independence
from non-descendants given parents — to prune the graph.

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> PC requires three conditions on the data-generating process:
>
> 1. **Markov condition:** $p(X)$ satisfies the Markov condition for the true DAG $\mathcal{G}^*$.
>    Equivalently: each variable is independent of its non-descendants given its parents.
>
> 2. **Faithfulness:** All conditional independences in $p(X)$ correspond to d-separations in
>    $\mathcal{G}^*$ (no "accidental" cancellations). See [[CPDAG and Markov Equivalence#^def-faithfulness]].
>
> 3. **Causal sufficiency:** All common causes of any two variables are included in the dataset
>    (no latent confounders). Violated confounders require the **FCI algorithm** instead.
^def-pc-assumptions

### Phase 1: Skeleton Recovery

The skeleton is the undirected graph with an edge $i - j$ wherever the true DAG has an edge
$i \rightarrow j$ or $i \leftarrow j$.

> [!definition] Definition: PC Skeleton Recovery (Algorithm 1)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; CI test $\perp_\alpha$; significance level $\alpha$.
> **Output:** Skeleton $\hat{\mathcal{S}}$ and separating sets $\widehat{\text{sep}}(i,j)$ for each pair.
>
> 1. Initialize $\mathcal{H} \leftarrow K_d$ (complete undirected graph on $d$ nodes).
> 2. Set $k \leftarrow 0$.
> 3. **While** there exists an edge $i - j$ in $\mathcal{H}$ with $|\text{Adj}(i) \setminus \{j\}| \geq k$:
>    - For each adjacent pair $(i,j)$ in $\mathcal{H}$:
>      - For each subset $Z \subseteq \text{Adj}(i) \setminus \{j\}$ with $|Z| = k$:
>        - **If** $X_i \perp_\alpha X_j \mid X_Z$ (CI test passes):
>          - Remove edge $i - j$ from $\mathcal{H}$.
>          - Store $\widehat{\text{sep}}(i,j) \leftarrow Z$ and $\widehat{\text{sep}}(j,i) \leftarrow Z$.
>          - **Break** (move to next pair).
>    - $k \leftarrow k + 1$.
> 4. Return $(\mathcal{H}, \widehat{\text{sep}})$.
^def-skeleton-recovery

> [!note] Computational complexity of skeleton recovery
> The inner loop iterates over subsets of size $k$. The maximum $k$ reached is $q^* - 1$, where
> $q^*$ is the maximum neighborhood size in the true DAG. The number of CI tests is at most
> $O(d^2 \cdot d^{q^*})$, which is exponential in $q^*$ but polynomial in $d$ for sparse graphs.
> For dense graphs (large $q^*$), PC is intractable — this is its key limitation.

**Separating sets** $\widehat{\text{sep}}(i,j)$ are crucial: they record which conditioning set
caused the edge to be removed. They drive v-structure orientation in Phase 2.

### Phase 2: V-Structure Orientation

> [!definition] Definition: V-Structure Orientation (PC Phase 2)
> For each triple $(i, k, j)$ in the skeleton such that:
> - $i - k - j$ (both $i-k$ and $k-j$ are edges), and
> - $i$ and $j$ are **not adjacent**,
>
> orient $i \rightarrow k \leftarrow j$ (a **v-structure / collider** at $k$) if and only if
> $k \notin \widehat{\text{sep}}(i,j)$.
>
> **Why this works:** If $k$ were *not* a collider, then the path $i - k - j$ would be blocked
> by any set containing $k$. Since $i$ and $j$ are not adjacent but $k$ is not in their separating
> set, $k$ must be an active (collider) path — hence $i \rightarrow k \leftarrow j$.
^def-v-structure-orientation

> [!example] Example: V-Structure Detection
> Suppose the skeleton has $A - C - B$ with $A$ and $B$ not adjacent. The CI test found
> $A \perp B \mid \{D\}$ (so $\widehat{\text{sep}}(A,B) = \{D\}$, not containing $C$).
> Therefore, orient $A \rightarrow C \leftarrow B$.
>
> If instead $\widehat{\text{sep}}(A,B) = \{C\}$, then $C$ blocks the path $A - C - B$, so
> $C$ is not a collider: leave $A - C - B$ undirected for now.

### Phase 3: Orientation Propagation (Meek Rules)

After orienting all v-structures, apply the four Meek rules exhaustively to propagate remaining
edge orientations without introducing new cycles or v-structures. See
[[CPDAG and Markov Equivalence#^def-meek-rules]].

> [!definition] Definition: PC Output
> The output is the **CPDAG** $\widehat{\mathcal{C}}$: a PDAG whose directed edges are identifiable
> (forced by v-structures or Meek rules) and whose undirected edges represent directions that are not
> identifiable from the observational distribution.
^def-pc-output

### Consistency

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines 2000, Theorem 5.1)
> Suppose $p(X)$ satisfies the Markov condition and faithfulness for a DAG $\mathcal{G}^*$.
> If the CI tests are consistent (correct in the limit $n \to \infty$), then the PC algorithm
> recovers the CPDAG $\mathcal{C}(\mathcal{G}^*)$ with probability tending to 1 as $n \to \infty$.
^thm-pc-consistency

> [!theorem] Theorem: High-Dimensional Consistency of PC (Kalisch & Bühlmann 2007)
> Suppose additionally that the graph is **sparse** — the maximum neighborhood size $q^*$ satisfies
> $q^* = O(n^{1-b})$ for some $b \in (0,1)$. Use the Fisher Z-transform CI test at level
> $\alpha_n = O(n^{-(1-b)/2})$. Then:
> $$P(\hat{\mathcal{C}} = \mathcal{C}(\mathcal{G}^*)) \to 1 \quad \text{as } n \to \infty,$$
> even when $d \gg n$ — the number of variables can grow as fast as $O(n^a)$ for any $a > 0$.
^thm-kalisch-highdim

### PC-Stable: Order-Independent Variant

The standard PC algorithm is **order-dependent**: removing edges in one order changes the adjacency
sets used in later tests, so different variable orderings can yield different skeletons.

> [!definition] Definition: PC-Stable (Colombo & Maathuis 2014)
> **PC-stable** modifies skeleton recovery so that, within each level $k$, all edges are removed
> simultaneously at the *end* of the level rather than immediately when a separating set is found.
> This makes the skeleton output — and hence the CPDAG output — independent of the variable ordering.
> PC-stable is the default in the `pcalg` R package.
^def-pc-stable

### Conditional Independence Tests

PC is **nonparametric** in the sense that any CI test can be plugged in:

| Data type | CI test | Implementation |
|-----------|---------|---------------|
| Gaussian, linear | Fisher's Z-transform: $z = \frac{1}{2}\log\frac{1+\hat{\rho}}{1-\hat{\rho}} \cdot \sqrt{n-|Z|-3}$ | `gaussCItest` in `pcalg` |
| Discrete | $\chi^2$ or $G^2$ test | `disCItest` in `pcalg` |
| Non-parametric | Kernel-based CI test (Zhang et al. 2012) | `kcitest` in `bnlearn` |
| General (non-linear) | Generalized covariance measure (Shah & Peters 2020) | `pcalg::gCItest` |

The choice of test is crucial: if the test is underpowered (high $\alpha$ / small $n$), too many
edges are retained; if it is over-powered (tiny $\alpha$), edges are spuriously removed.

### Software Implementation

```r
library(pcalg)

# Fit Gaussian data with PC
suffStat <- list(C = cor(X), n = nrow(X))
alpha <- 0.01

pc_fit <- pc(
  suffStat  = suffStat,
  indepTest = gaussCItest,      # Fisher Z CI test
  alpha     = alpha,            # significance level
  p         = ncol(X),          # number of variables
  skel.method = "stable"        # PC-stable (order-independent)
)

# Extract adjacency matrix and plot
summary(pc_fit)
plot(pc_fit, main = "PC Algorithm CPDAG")
```

## Failure Modes

| Failure | When it occurs | Consequence |
|---------|---------------|-------------|
| CI test errors at finite $n$ | Sparse data, weak CI tests | False edge removals / retentions |
| Faithfulness violated | "Cancellation" of path coefficients | Wrong skeleton, wrong v-structures |
| Hidden confounders | Latent common causes | Spurious edges; use FCI instead |
| Dense graph (large $q^*$) | Many connections per node | Combinatorial explosion in Phase 1 |
| Non-IID data | Time series, spatial data | Independence tests invalid |

## Connections

- **Contrast with [[GES - Greedy Equivalence Search]]**: GES is score-based (minimizes BIC) whereas
  PC is test-based (uses CI tests). GES tends to be more accurate in practice at the cost of
  a parametric model assumption. Both output CPDAGs.
- **Contrast with [[NOTEARS - Overview]]**: NOTEARS is a score-based continuous-optimization method
  that outputs a DAG (not a CPDAG). NOTEARS is compared against PC and GES in [[NOTEARS Experiments]].
- **Relation to [[Causal Structure Learning - PC and GES]]**: see overview.

## See Also
- [[CPDAG and Markov Equivalence]] — the mathematical target of PC and GES
- [[DAG Structure Learning Problem]] — problem setup, NP-hardness, landscape of methods
- [[GES - Greedy Equivalence Search]] — the score-based alternative that searches CPDAG space directly
- [[NOTEARS - Overview]] — continuous-optimization approach (compared against PC in [[NOTEARS Experiments]])
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicitation alternative to PC/GES when data are limited
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG already learned — PC/GES is what precedes it)
