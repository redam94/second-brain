---
title: "Constraint-Based Skeleton Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-algorithm-source-notes.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), CPS Ch. 5, Algorithm 5.4.1; Kalisch & Bühlmann (2007)"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[V-Structures and Meek Orientation Rules]]"
aliases:
  - "skeleton recovery"
  - "adjacency search"
  - "PC Phase 1"
  - "conditional independence skeleton"
---

# Constraint-Based Skeleton Learning

> [!summary]
> Phase 1 of the PC algorithm recovers the **skeleton** (underlying undirected graph)
> of the true DAG by sequentially testing conditional independence at increasing
> conditioning set sizes $\ell = 0, 1, 2, \ldots$. For each adjacent pair $(X_i, X_j)$,
> the algorithm searches for a **separation set** $S$ — a conditioning set that
> d-separates $X_i$ and $X_j$. Under faithfulness and the Markov condition, the output
> skeleton exactly matches the true DAG's skeleton. Complexity is polynomial in the
> number of variables for sparse graphs.

## Overview

The skeleton of a DAG is the undirected graph obtained by ignoring all edge directions.
For the DAG $X \to Z \leftarrow Y$, the skeleton is $X - Z - Y$. **Skeleton learning**
is Phase 1 of the PC algorithm and is the computationally dominant phase.

The key insight: under the **Markov condition** and **faithfulness**, $X_i$ and $X_j$
are **not adjacent** in the true DAG if and only if there exists a **d-separating set**
$S \subseteq \mathbf{V} \setminus \{X_i, X_j\}$ such that $X_i \perp\!\!\!\perp X_j \mid S$.
(By the global Markov property and faithfulness, d-separations in the DAG and conditional
independences in the data are in exact correspondence.)

## Main Content

### The Adjacency Search Algorithm

> [!definition] Algorithm: PC Skeleton Recovery (CPS, Algorithm 5.4.1)
> **Input**: Data on $p$ variables; conditional independence (CI) oracle or test.
>
> **Initialise**: $C \leftarrow K_p$ (complete undirected graph on $p$ nodes);
> $\mathrm{sep}(i,j) \leftarrow \emptyset$ for all $i,j$.
>
> **Repeat** for $\ell = 0, 1, 2, \ldots$:
> - **For each** adjacent pair $(X_i, X_j)$ in the current graph $C$:
>   - Let $\mathrm{Adj}(i) \setminus \{j\}$ be the current adjacencies of $X_i$
>     excluding $X_j$.
>   - **For each** $S \subseteq \mathrm{Adj}(i) \setminus \{j\}$ with $\lvert S \rvert = \ell$:
>     - If $X_i \perp\!\!\!\perp X_j \mid S$ (test accepts): remove edge $X_i - X_j$ from
>       $C$; set $\mathrm{sep}(i,j) = \mathrm{sep}(j,i) = S$; break to next pair.
> - If all adjacent pairs had $\lvert\mathrm{Adj}(i)\rvert - 1 < \ell$: stop.
>
> **Output**: Skeleton $\hat{C}$ (undirected graph) and separation sets
> $\{\mathrm{sep}(i,j)\}_{(i,j) \notin \hat{C}}$.
> ^alg-skeleton

**Why test at increasing sizes $\ell$?**

This exploits the **Markov property**: if $X_i$ and $X_j$ have a true separating set,
it is necessarily a subset of the parents/adjacencies of $X_i$ or $X_j$. Starting with
$\ell = 0$ (marginal independence) is the cheapest test and eliminates clearly independent
variables early, shrinking the graph and reducing subsequent tests at higher $\ell$.

### Separation Sets and Their Use

The separation sets $\mathrm{sep}(i,j)$ are recorded for every removed edge. They are
used in Phase 2 (v-structure orientation): if $X_k \notin \mathrm{sep}(i,j)$, then
the unshielded triple $X_i - X_k - X_j$ is a v-structure ($X_i \to X_k \leftarrow X_j$).

### Conditional Independence Tests

The choice of CI test is the most consequential practical decision in PC:

| Data type | CI test | Null hypothesis | Statistic |
|-----------|---------|----------------|-----------|
| Gaussian / linear SEM | Partial correlation | $\rho_{ij \cdot S} = 0$ | Fisher's $z$: $z = \frac{1}{2}\ln\frac{1+\hat{\rho}}{1-\hat{\rho}}$, distributed $N(0, (n - \lvert S \rvert - 3)^{-1})$ |
| Discrete | G²/chi-squared | Independence in contingency table | $G^2 = 2\sum_{x,y,s} n_{xys}\ln\frac{n_{xys} n_s}{n_{xs} n_{ys}}$ |
| Non-parametric | Kernel-based HSIC | $\mathrm{HSIC}(X_i, X_j \mid S) = 0$ | Permutation-calibrated |
| Categorical + continuous | Mixed CIT | See Tsagris et al. 2018 | — |

**Significance level $\alpha$**: the p-value threshold for the CI test is the key tuning
parameter of PC. Lower $\alpha$ → fewer edges removed → denser skeleton → more edges
in the CPDAG (underdiscovery of independences). Higher $\alpha$ → more edges removed →
sparser skeleton (overdiscovery of independences). Typical values: $\alpha \in \{0.01, 0.05\}$.

### PC-Stable: Order-Independence Fix

A subtlety: the original PC algorithm produces different skeletons depending on the
**order in which pairs are tested** — removing an edge changes the adjacencies used for
subsequent tests. **PC-stable** (Colombo & Maathuis 2014) fixes this by completing
all CI tests at level $\ell$ before removing any edges, making the skeleton
order-independent.

> [!note] Practical Recommendation
> Always use **PC-stable** rather than original PC for reproducibility. The pcalg R
> package and causal-learn Python package both implement PC-stable as default.

### Complexity

> [!theorem] Complexity of Skeleton Recovery
> Let $q$ be the maximum adjacency (degree) in the true skeleton. The number of CI
> tests is at most:
> $$\binom{p}{2} \cdot \sum_{\ell=0}^{q-1}\binom{p-2}{\ell}$$
> which is $O(p^{q+2})$ — **polynomial in $p$ for fixed $q$**.
>
> **High-dimensional result (Kalisch & Bühlmann 2007)**: PC-stable is consistent even
> when $p = p(n) \to \infty$ with $n$, as long as $p = O(n^a)$ for some $a > 0$ and
> the skeleton is sparse ($q$ bounded).
> ^thm-skeleton-complexity

This is the key advantage of PC over score-based methods like GES in the high-dimensional
setting ($p \gg n$): partial correlation tests remain valid for $p = O(n^a)$ under
Gaussianity, while score-based methods typically require $n > p$.

### Correctness Under Oracle CI Tests

> [!theorem] Skeleton Consistency (CPS, Theorem 5.1)
> Under the faithfulness assumption and the Markov condition, and with an **oracle CI test**
> (returns true independence / dependence), the PC skeleton recovery algorithm outputs
> the **exact skeleton** of the true DAG.
>
> With finite-sample CI tests: the skeleton is consistent (converges to the true skeleton)
> as $n \to \infty$ under mild regularity conditions on the CI test.
> ^thm-skeleton-correct

## Examples

> [!example] Three-Variable Chain: Separating Set Identification
> **True DAG**: $X \to Z \to Y$ (chain).
>
> **Step $\ell = 0$**: Test $X \perp\!\!\!\perp Z$, $X \perp\!\!\!\perp Y$, $Z \perp\!\!\!\perp Y$.
> - $X \perp\!\!\!\perp Z$ is false (direct cause). Keep $X - Z$.
> - $X \perp\!\!\!\perp Y$ is false (indirect cause). Keep $X - Y$.
> - $Z \perp\!\!\!\perp Y$ is false (direct cause). Keep $Z - Y$.
>
> **Step $\ell = 1$**: Test $X \perp\!\!\!\perp Y \mid Z$.
> - In a chain $X \to Z \to Y$, conditioning on $Z$ blocks the path: $X \perp\!\!\!\perp Y \mid Z$.
> - **Accept**: remove $X - Y$; record $\mathrm{sep}(X,Y) = \{Z\}$.
>
> **Output**: Skeleton $X - Z - Y$ (correct). Separation set $\mathrm{sep}(X,Y) = \{Z\}$.
> This will correctly identify the triple as a non-collider in Phase 2.

> [!example] V-Structure: Collider Not Separated by Middle Node
> **True DAG**: $X \to Z \leftarrow Y$ (v-structure, $X$ and $Y$ not adjacent).
>
> **Step $\ell = 0$**: $X \perp\!\!\!\perp Y$ is true marginally (no direct path, no common cause).
> - **Accept**: remove $X - Y$; record $\mathrm{sep}(X,Y) = \emptyset$.
>
> **Step $\ell = 0$ (continued)**: $X \perp\!\!\!\perp Z$ is false; $Y \perp\!\!\!\perp Z$ is false. Keep both.
>
> **Output**: Skeleton $X - Z - Y$ with $\mathrm{sep}(X,Y) = \emptyset$.
> Since $Z \notin \mathrm{sep}(X,Y) = \emptyset$: Phase 2 correctly orients $X \to Z \leftarrow Y$.

## Connections

- **Phase 2**: [[V-Structures and Meek Orientation Rules]] uses the separation sets from
  Phase 1 to orient v-structures.
- **PC-stable**: Order-independent variant; always prefer this in practice.
- **FCI**: The FCI (Fast Causal Inference) algorithm uses the same skeleton recovery
  phase but adds a "possible-d-sep" procedure for latent variable settings.
- **NOTEARS vs. PC**: [[NOTEARS Algorithm]] performs a single continuous optimisation
  step rather than sequential CI tests, making it faster for dense graphs but lacking
  the polynomial-in-$p$ complexity guarantee under sparsity.

## See Also
- [[PC Algorithm - Overview]] — the full three-phase algorithm
- [[Markov Equivalence Classes and CPDAGs]] — the theoretical basis for skeleton learning
- [[V-Structures and Meek Orientation Rules]] — what happens after the skeleton is found
- [[GES - Greedy Equivalence Search]] — score-based alternative that avoids CI tests
- [[DAG Structure Learning Problem]] — the problem setup and landscape of methods
