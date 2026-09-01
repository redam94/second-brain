---
title: "PC Algorithm - Skeleton and Independence Tests"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), §5.4.2; Kalisch & Bühlmann (2007), §2"
date_ingested: 2026-09-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Orientation and CPDAGs]]"
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - "PC skeleton recovery"
  - "adjacency phase PC"
  - "conditional independence testing causal discovery"
---

# PC Algorithm — Skeleton and Independence Tests

> [!summary]
> **Phase 1 of the PC algorithm**: recover the undirected skeleton of the true DAG
> by testing conditional independence (CI) for each pair of variables $(X_i, X_j)$
> over subsets of their current adjacency set, in increasing order of conditioning
> set size. An edge is deleted whenever a separating set is found; the separating set
> $\text{Sep}(i,j)$ is stored for Phase 2 (v-structure orientation). Under the Gaussian
> model, the CI tests reduce to **partial correlation tests** — efficient in high
> dimensions. Kalisch & Bühlmann (2007) prove the skeleton is recovered consistently
> even when $d \gg n$, as long as the graph is sparse.

## Overview

The fundamental insight of constraint-based learning: **conditional independence** in
$\mathbb{P}$ corresponds to **d-separation** in the true DAG $G^*$ (under Markov and
faithfulness). Therefore, two variables $X_i$ and $X_j$ are adjacent in $G^*$ if and
only if no set $S \subseteq V \setminus \{X_i, X_j\}$ d-separates them. The PC
algorithm tests this systematically.

## Main Content

### The skeleton recovery algorithm

> [!definition] Algorithm: PC Skeleton Recovery (SGS, §5.4.2)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
> **Output**: Undirected skeleton $\hat{H}$; separating sets $\{\widehat{\text{Sep}}(i,j)\}$.
>
> 1. Initialize: $\hat{H} \leftarrow K_d$ (complete graph on $d$ nodes), $\ell \leftarrow 0$.
> 2. **Repeat** until all adjacent pairs $(X_i, X_j)$ have $|\text{Adj}(\hat{H}, X_i)
>    \setminus \{X_j\}| < \ell$:
>    - For each ordered pair $(X_i, X_j)$ adjacent in $\hat{H}$:
>      - For each $S \subseteq \text{Adj}(\hat{H}, X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - Test $X_i \perp\!\!\!\perp X_j \mid S$ at level $\alpha$.
>        - If **independent** ($p$-value $\geq \alpha$):
>          - Delete edge $(X_i, X_j)$ from $\hat{H}$.
>          - Set $\widehat{\text{Sep}}(i,j) \leftarrow S$ and $\widehat{\text{Sep}}(j,i) \leftarrow S$.
>          - Break the inner loop over $S$.
>    - $\ell \leftarrow \ell + 1$.
> 3. Return $\hat{H}$, $\widehat{\text{Sep}}$.
^alg-skeleton

> [!note] Key design choice: test adjacency set, not all variables
> At level $\ell$, the conditioning sets $S$ are drawn from $\text{Adj}(\hat{H}, X_i)$
> — the *current* adjacency list of $X_i$ in the pruned graph, not all $d-2$ remaining
> variables. This is crucial for tractability: the adjacency set shrinks as edges are
> removed, so later levels have smaller search spaces. The correctness of this pruning
> follows from the Markov condition: if $X_j \notin G^*$ is not adjacent to $X_i$,
> a separating set always exists among $X_i$'s true neighbors.

### CI tests in the Gaussian case

For Gaussian distributions, $X_i \perp\!\!\!\perp X_j \mid S$ if and only if the
**partial correlation** $\rho_{ij \cdot S} = 0$.

> [!definition] Partial Correlation and Fisher's Z-test
> Given data $\mathbf{X}$, the partial correlation of $X_i$ and $X_j$ given $S$ is:
> $$\hat{\rho}_{ij \cdot S} = \frac{\hat{\sigma}_{ij \cdot S}}{\sqrt{\hat{\sigma}_{ii \cdot S} \cdot \hat{\sigma}_{jj \cdot S}}}$$
> where $\hat{\Sigma}_S$ is the estimated residual covariance after regressing out $S$.
>
> **Fisher's Z-transformation**: Under $H_0: \rho_{ij \cdot S} = 0$,
> $$Z_{ij \cdot S} = \frac{1}{2}\log\!\left(\frac{1 + \hat{\rho}_{ij \cdot S}}{1 - \hat{\rho}_{ij \cdot S}}\right) \stackrel{\text{approx}}{\sim} \mathcal{N}\!\left(0, \frac{1}{n - |S| - 3}\right)$$
> Reject independence if $|Z_{ij \cdot S}| > \Phi^{-1}(1-\alpha/2) / \sqrt{n - |S| - 3}$.
^def-partial-corr

> [!note] Non-Gaussian settings
> For discrete data: $G^2$ tests or mutual information CI tests.
> For non-parametric settings: kernel-based CI tests (HSIC, KCI — Kernel CI test).
> For mixed continuous-discrete: rank-based tests or copula-based CI tests.

### Order-dependence problem and PC-stable

The original PC algorithm has a subtle flaw identified by Colombo & Maathuis (2014):
the skeleton result **depends on the order in which variable pairs are tested** at each
level $\ell$.

> [!definition] PC-stable variant (Colombo & Maathuis, 2014)
> Before removing any edges at level $\ell$, first **collect all edges marked for
> removal** across all pairs $(X_i, X_j)$ at this level, then remove them all
> simultaneously. This ensures the adjacency lists used at level $\ell$ are identical
> for all pairs, making the skeleton output **order-independent**.
^def-pc-stable

### Consistency in high dimensions

> [!theorem] Theorem: PC Consistency (Kalisch & Bühlmann, 2007, Thm. 3.1)
> Let $G^*$ be the true DAG on $d$ nodes with Gaussian distribution. Assume:
> - **Faithfulness** for the Gaussian distribution.
> - **Sparsity**: the maximum neighborhood size in $G^*$ is bounded by $q < \infty$
>   (fixed, not growing with $n$).
> - **Significance level** $\alpha_n$ satisfies: $\alpha_n \to 0$, and
>   $n^{1/2} \alpha_n \to \infty$ as $n \to \infty$ (e.g., $\alpha_n = n^{-1/4}$
>   works; or fixed $\alpha$ for fixed $d$).
>
> If $d = O(n^a)$ for any $a > 0$ (i.e., $d$ may grow polynomially or even as
> $e^{n^\delta}$ for small $\delta$), then the PC-estimated skeleton converges to
> the true skeleton and the estimated v-structures converge to the true v-structures
> in probability as $n \to \infty$.
>
> **Implication**: PC is consistent in **high-dimensional sparse** regimes ($d \gg n$),
> unlike classical methods requiring $n \gg d$.
^thm-pc-consistency

### Computational complexity

The total number of CI tests depends on the graph's maximum neighborhood size $q$:

| Regime | Tests | Tractability |
|--------|-------|-------------|
| Dense graph ($q \sim d$) | $O(d^2 \cdot 2^d)$ | Intractable for $d > 30$ |
| Sparse graph ($q$ fixed) | $O(d^{q+2})$ | Polynomial in $d$ for fixed $q$ |
| Typical social/genomic networks | $q \sim 3$–$10$ | Feasible for $d$ in thousands |

The PC algorithm is **most effective when the true graph is sparse** — which is a natural
assumption for causal graphs in most scientific domains (each variable has few direct
causal parents).

## Connections

- **Faithfulness is critical**: If faithfulness fails (e.g., path coefficients cancel
  exactly), the CI pattern no longer uniquely identifies the skeleton, and PC may remove
  true edges. This is called **Markov but not faithful** distributions.
- **Score-based alternative**: GES avoids the faithfulness sensitivity by optimizing a
  score directly — see [[GES Algorithm - Overview]].
- **Continuous optimization**: NOTEARS (see [[DAG Structure Learning Problem]]) uses
  no CI tests; it optimizes the LS score subject to the smooth acyclicity constraint.

## See Also
- [[PC Algorithm - Overview]] — assumptions, high-level two-phase description
- [[PC Algorithm - Orientation and CPDAGs]] — Phase 2: v-structures and Meek's rules
- [[GES Algorithm - Overview]] — score-based alternative
- [[DAG Structure Learning Problem]] — context and landscape of methods
- [[Spurious Association and Confounds]] — DAG semantics for conditional independence
