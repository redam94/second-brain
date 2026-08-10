---
title: "PC Skeleton Discovery and CI Testing"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/causal-learn-pc-source.py]]"
source_location: "Spirtes, Glymour & Scheines (2000), §5.4; Colombo & Maathuis (2014)"
date_ingested: 2026-08-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[CPDAG Orientation - V-Structures and Meek Rules]]"
aliases:
  - "skeleton discovery"
  - "conditional independence testing causal"
  - "PC Phase 1"
  - "separating set"
---

# PC Skeleton Discovery and CI Testing

> [!summary]
> The first phase of the PC algorithm discovers the **skeleton** of the causal DAG
> by testing conditional independence for all pairs of variables $(X_i, X_j)$, using
> conditioning sets $S$ of increasing size drawn from the current adjacency sets. An
> edge is removed when a **separating set** $S$ is found such that $X_i \perp X_j | S$.
> The separating sets are recorded and used in Phase 2 to orient v-structures.
> Continuous data uses Fisher's Z test on partial correlations; discrete data uses
> $\chi^2$ or G-squared tests; kernel-based tests (KCI) handle nonlinear and non-Gaussian
> data. For sparse graphs (degree ≤ $k$), the algorithm runs in $O(d^{k+2})$ time.

## Overview

Phase 1 of PC (skeleton discovery) implements a principled search for the **absence of
edges**: an edge $X_i - X_j$ is absent from the true DAG iff $X_i$ and $X_j$ are
d-separated by some subset $S$ of the other variables. Under faithfulness, d-separation
implies conditional independence in the distribution — so statistical CI tests can
detect which edges to remove.

The key efficiency trick: rather than testing all $2^{d-2}$ subsets of the remaining
$d-2$ variables as potential conditioning sets, PC restricts $S$ to subsets of
$\text{adj}(X_i) \setminus \{X_j\}$ (or $\text{adj}(X_j) \setminus \{X_i\}$) and increases
$|S|$ from 0 upward. This is justified because if $X_i \perp X_j | S$ holds, then $S$
can always be found within the Markov blanket of $X_i$ (which shrinks as edges are removed).

## Main Content

### Skeleton discovery — formal algorithm

> [!definition] Definition: Skeleton Discovery Procedure (PC Phase 1)
> **Input**: data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$, significance $\alpha$
>
> **Initialise**: complete undirected graph $G = K_d$; $\text{sep}(i,j) = \emptyset$ for all $i \neq j$
>
> **For** $l = 0, 1, 2, \ldots$ **do**:
> - **For** each ordered pair $(X_i, X_j)$ adjacent in $G$:
>   - Let $\mathcal{A}_{ij} = \text{adj}(X_i, G) \setminus \{X_j\}$
>   - **If** $|\mathcal{A}_{ij}| \geq l$:
>     - **For** each $S \subseteq \mathcal{A}_{ij}$ with $|S| = l$:
>       - **If** $X_i \perp\!\!\!\perp_\alpha X_j \mid S$ (p-value $> \alpha$):
>         - Remove $X_i - X_j$ from $G$
>         - $\text{sep}(i,j) = \text{sep}(j,i) = S$
>         - **Break** (move to next pair)
> - **If** no pair $(X_i, X_j)$ has $|\text{adj}(X_i, G) \setminus \{X_j\}| \geq l+1$: **Stop**
>
> **Output**: skeleton $G$, separating sets $\text{sep}(\cdot, \cdot)$
^def-skeleton-discovery

> [!note] Why start from a complete graph?
> Starting complete and removing edges exploits the Markov condition: under faithfulness,
> if there is no edge between $X_i$ and $X_j$ in the true DAG, there *must* exist some
> separating set in the Markov blanket. The complete graph ensures we never miss edges
> that should remain.

### Why condition on adjacency sets only

> [!theorem] Theorem: Correctness of adjacency-set conditioning (Spirtes et al. 2000)
> Under faithfulness and causal sufficiency, if $X_i \perp\!\!\!\perp X_j \mid S$ for some
> $S \subseteq \mathbf{V} \setminus \{X_i, X_j\}$, then there exists a separating set
> $S^* \subseteq \text{adj}(X_i, \mathcal{G}^*) \setminus \{X_j\}$ that also makes
> $X_i$ and $X_j$ independent.
>
> **Consequence**: restricting the search to adjacency subsets is without loss of
> generality — we never miss a valid separation that would require conditioning on
> non-adjacent variables.
^thm-adjacency-sufficiency

### Separating sets and their role

The separating set $\text{sep}(i,j)$ is recorded for every removed edge and used in
Phase 2 (v-structure orientation). The logic: if $X_k$ was **in** the separating set
that removed the edge $X_i - X_j$, then $X_k$ is a *non-collider* on the path
$X_i - X_k - X_j$. If $X_k$ was **not** in any separating set for that pair, $X_k$
is a *collider* (v-structure candidate): $X_i \to X_k \leftarrow X_j$.

### Conditional independence tests

The CI test is the only domain-specific component of PC. Any consistent test can be
plugged in.

#### Fisher's Z test (Gaussian / linear data)

The standard test for continuous data under a Gaussian or linear assumption. It tests
whether the **partial correlation** $\rho_{ij|S}$ is zero:

> [!definition] Definition: Fisher's Z test for CI
> The partial correlation $\rho_{ij \cdot S}$ is computed as the $(i,j)$ entry of
> $\boldsymbol{\Sigma}_{-S}^{-1}$, the precision matrix after marginalising out the
> variables in $S$. The test statistic is:
> $$Z_{ij \cdot S} = \frac{\sqrt{n - |S| - 3}}{2} \log \frac{1 + \hat{\rho}_{ij \cdot S}}{1 - \hat{\rho}_{ij \cdot S}},$$
> which is approximately standard normal under $H_0: \rho_{ij \cdot S} = 0$.
> Reject independence if $|Z_{ij \cdot S}| > z_{\alpha/2}$ (two-sided test at level $\alpha$).
>
> **Note**: This is a *test of linear* conditional independence. For nonlinear
> relationships, the test may fail to detect dependence even when it exists.
^def-fisher-z

#### Chi-squared / G-squared tests (discrete data)

For categorical/discrete variables, conditional independence $X_i \perp X_j \mid S$
is tested using a contingency-table approach:

> [!definition] Definition: G-squared (likelihood ratio) CI test
> Conditional on each value $s \in \mathcal{S}$ of the conditioning variables $S$:
> $$G^2 = 2 \sum_{s} \sum_{x_i, x_j} n_{x_i x_j s} \log \frac{n_{x_i x_j s} \cdot n_{\cdot \cdot s}}{n_{x_i \cdot s} \cdot n_{\cdot x_j s}},$$
> which under $H_0$ is asymptotically $\chi^2$ with $(|\mathcal{X}_i| - 1)(|\mathcal{X}_j| - 1) \cdot |\mathcal{S}|$
> degrees of freedom. The chi-squared statistic $\chi^2$ replaces the log ratio with
> $\sum (O - E)^2 / E$.
^def-gsquared

#### Kernel CI test (nonlinear / non-Gaussian data)

The **Kernel Conditional Independence test (KCI)** (Zhang et al. 2012) detects
nonlinear conditional dependencies using kernel embeddings of the conditional
distribution. It is consistent under very general conditions but computationally
expensive ($O(n^3)$ kernel matrix operations).

In causal-learn: `indep_test="kci"`.

### Stable PC — order-independent skeleton discovery

The original PC algorithm is sensitive to the order in which pairs are tested: early
deletions affect later adjacency sets, so different orderings give different outputs.

> [!definition] Definition: Stable PC (Colombo & Maathuis 2014)
> In the **Stable** variant, the adjacency sets $\mathcal{A}_{ij}$ used for conditioning
> at level $l$ are **frozen** at the beginning of level $l$ and not updated until
> all pairs at level $l$ have been tested. Edge deletions are applied only after
> completing the full level-$l$ sweep.
>
> This makes the output **invariant** to the variable ordering and produces more
> reliable CPDAGs, especially in high dimensions. Implemented as `stable=True` in
> causal-learn (default).
^def-stable-pc-skeleton

### Complexity and practical considerations

| Setting | CI tests | Dominant cost |
|---------|----------|---------------|
| Dense graph, worst case | $O(d^2 \cdot 2^d)$ | Exponential — infeasible for $d > 20$ |
| Sparse graph (degree $\leq k$) | $O(d^{k+2})$ | Polynomial for fixed $k$ |
| High-dimensional with sparsity | Linear in $d$ per level | Feasible for $d \sim 1000$ if sparse |

**Practical guidance**:
- For Gaussian data, always use Fisher's Z test — it is exact under Gaussian assumptions
  and highly efficient.
- For discrete data with small cell counts, G-squared can be unreliable; consider
  pooling or using a shrinkage estimator.
- For nonlinear data, KCI is correct but slow; consider `rcit` (Random Fourier features
  approximation) as a fast alternative.
- Set $\alpha$ by sample size: larger $n$ → smaller $\alpha$ (fewer false positives).
  Typical values: $\alpha = 0.01$ (small $n$) to $\alpha = 0.001$ (large $n$).

## Connections

- **Faithfulness**: without faithfulness, the separating sets found may not correspond
  to true d-separations → [[Markov Equivalence Classes and CPDAGs]]
- **V-structure orientation** uses the recorded `sep` sets from Phase 1 directly
  → [[CPDAG Orientation - V-Structures and Meek Rules]]
- **Partial correlation testing**: the Fisher's Z test is equivalent to testing zero
  entries in the precision matrix $\boldsymbol{\Sigma}^{-1}$ — connects to Gaussian
  graphical models and the glasso
- **High-dimensional limit**: for $d \gg n$, multiple testing corrections may be needed;
  the original PC provides no correction but the sparse regime still controls errors
- **GES comparison**: GES avoids explicit CI testing; instead, the score implicitly
  encodes all CI information → [[GES - Greedy Equivalence Search]]

## See Also
- [[PC Algorithm - Overview]] — full algorithm and consistency guarantee
- [[CPDAG Orientation - V-Structures and Meek Rules]] — what happens after Phase 1
- [[Markov Equivalence Classes and CPDAGs]] — the target output (CPDAG) and why
- [[GES - Greedy Equivalence Search]] — score-based alternative (no explicit CI tests)
