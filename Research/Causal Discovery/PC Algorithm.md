---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/sources-constraint-and-score-based-causal-discovery.md]]"
source_location: "Spirtes et al. (2000), Chs. 5–6; Spirtes & Glymour (1991)"
date_ingested: 2026-08-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-algorithm"
  - "constraint-based structure learning"
  - "Spirtes-Glymour-Scheines algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991) is the canonical
> **constraint-based** causal structure learning algorithm. It recovers the CPDAG of the
> true causal DAG by performing a cascade of **conditional independence (CI) tests** that
> progressively prune an initially complete graph. Under the Causal Markov condition,
> faithfulness, and causal sufficiency, PC is asymptotically correct: it returns the true
> CPDAG as sample size $n \to \infty$. Its computational advantage over exhaustive search
> is dramatic: CI tests are performed in order of conditioning-set size, and the skeleton
> is pruned early so that later tests condition on small sets.

## Overview

PC is the most widely used **constraint-based** structure-learning method. The constraint-based
paradigm proceeds from a simple observation: under faithfulness, an edge $X_i - X_j$ is absent
from the skeleton iff $X_i \perp\!\!\!\perp X_j \mid S$ for *some* subset $S$ of the other variables.
PC finds those separating sets $S$ efficiently by testing for independence at increasing
conditioning-set sizes.

The algorithm proceeds in three phases:
1. **Skeleton learning** — prune edges until the undirected skeleton of the CPDAG is found
2. **V-structure orientation** — use the separating sets to orient unshielded colliders
3. **Meek rule propagation** — propagate orientations using Meek's four rules

## Main Content

### Setup and Notation

We observe $n$ i.i.d. samples from distribution $P$ over $(X_1, \ldots, X_d)$.
Let $G^*$ be the true (unknown) causal DAG, with skeleton $\text{skel}(G^*)$ and CPDAG $\mathcal{C}^*$.
Let $\text{adj}(G, X_i)$ denote the adjacency set of $X_i$ in graph $G$.

PC operates under three assumptions:
1. **Causal Markov condition**: $P$ Markov-factorizes over $G^*$ (see [[Markov Equivalence and CPDAGs]]).
2. **Faithfulness**: every CI in $P$ is d-separation entailed by $G^*$.
3. **Causal sufficiency**: no hidden common causes (no latent confounders). Relaxed by FCI.

### Phase 1: Skeleton Learning

> [!definition] Algorithm: PC Skeleton Learning
> **Input**: Data $\mathbf{X}$, significance level $\alpha$. **Output**: Undirected graph $H$, separating sets $\text{Sep}(i,j)$.
>
> 1. Initialize $H$ as the **complete undirected graph** on $d$ nodes.
> 2. Set $\ell = 0$.
> 3. **Repeat** while $\max_{(i,j) \in H} |\text{adj}(H, X_i) \setminus \{X_j\}| \geq \ell$:
>    - For each edge $(X_i, X_j) \in H$ (in any order):
>      - For each $S \subseteq \text{adj}(H, X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - **Test** $X_i \perp\!\!\!\perp X_j \mid S$ at level $\alpha$.
>        - If **independent**: remove edge $(i,j)$ from $H$, record $\text{Sep}(i,j) = S$, break.
>    - Increment $\ell \leftarrow \ell + 1$.
> 4. Return $H$, $\{\text{Sep}(i,j)\}$.
^def-pc-skeleton

> [!note] Why iterate over increasing $\ell$?
> Under faithfulness, the separating set $\text{Sep}(i,j)$ is a subset of the *adjacency*
> of either $X_i$ or $X_j$. Starting with $\ell = 0$ (marginal independence tests) and
> increasing $\ell$ ensures the conditioning sets are always valid subsets of the current
> adjacency — and early pruning reduces the adjacency sets for later, more expensive tests.
> In sparse graphs (where the maximum degree $q$ is small), the algorithm terminates after
> $\ell = q$ steps, performing $O(d^{q+2})$ CI tests.

### Phase 2: V-Structure Orientation

After the skeleton $H$ is found, v-structures (unshielded colliders) are oriented using
the separating sets:

> [!definition] Algorithm: PC V-Structure Orientation
> For each **unshielded triple** $(X_i, X_k, X_j)$ — i.e., $X_i - X_k - X_j$ in $H$
> and $X_i, X_j$ non-adjacent:
> - If $X_k \notin \text{Sep}(i,j)$: orient as $X_i \to X_k \leftarrow X_j$ (collider).
> - If $X_k \in \text{Sep}(i,j)$: the edge directions at $X_k$ remain unknown (fork or chain).
^def-pc-vstructure

**Intuition**: conditioning on $X_k$ renders $X_i$ and $X_j$ *more* dependent (explaining away) when
$X_k$ is a collider. If $X_k$ is *not* in the separating set (the set that makes $X_i
\perp\!\!\!\perp X_j$), then $X_k$ is not a non-collider — so it must be a collider.

### Phase 3: Meek Rule Propagation

Apply the four **Meek rules** exhaustively to the partially directed graph to obtain the
CPDAG (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]] for the rule statements).
These rules orient additional edges that are *logically required* to avoid new v-structures
or directed cycles, even if they are not colliders.

### Statistical Tests for Conditional Independence

The algorithm requires a CI oracle. In practice, these are always estimated from finite samples:

| Data type | Standard test | Notes |
|-----------|--------------|-------|
| **Gaussian, linear** | Fisher's Z test (partial correlation) | Fast; exact for Gaussian; $z = \text{arctanh}(r_{xy\cdot S})$ |
| **Discrete** | G² (log-likelihood ratio) / χ² test | Requires sufficient counts per cell; sparse-table problem |
| **Non-Gaussian continuous** | KCI (Kernel CI test, Zhang et al. 2011) | Nonparametric; computationally expensive |
| **Mixed** | CMI (Conditional MI via KNN estimation) | Flexible; variance high in small samples |

For Gaussian data, the **Fisher Z statistic** tests $H_0: \rho_{xy\cdot S} = 0$:

> [!definition] Definition: Fisher's Z Test for Partial Correlation
> Let $r_{xy\cdot S}$ be the sample partial correlation between $X_i$ and $X_j$ given $S$
> (computed from the precision matrix or via recursive conditioning). The test statistic is
> $$z = \frac{1}{2}\ln\frac{1 + r_{xy\cdot S}}{1 - r_{xy\cdot S}} \approx \mathcal{N}\!\left(0, \frac{1}{n - |S| - 3}\right)$$
> under $H_0$. Reject $H_0$ (keep the edge) if $|z| > z_{\alpha/2}$.
^def-fishers-z

### Correctness Theorem

> [!theorem] Theorem: Consistency of PC (Spirtes et al., 2000)
> Assume the Causal Markov condition, faithfulness, and causal sufficiency. Let
> $\hat{\mathcal{C}}_n$ be the CPDAG output by PC on $n$ observations with CI test
> significance level $\alpha_n \to 0$ as $n \to \infty$. Then:
> $$P(\hat{\mathcal{C}}_n = \mathcal{C}^*) \to 1 \quad \text{as} \quad n \to \infty.$$
> PC is **asymptotically consistent** — it recovers the true CPDAG with probability 1 in
> the large-sample limit.
^thm-pc-consistency

### Complexity

For a graph with $d$ nodes and maximum degree $q$:

| Phase | Operations | Complexity |
|-------|-----------|------------|
| Skeleton (Level-$\ell$ tests) | $O(d^2 \binom{q}{\ell})$ tests per level | $O(d^{q+2})$ total CI tests |
| V-structure orientation | $O(d^2 q)$ triples to check | $O(d^3)$ |
| Meek propagation | $O(d^2)$ passes | $O(d^4)$ worst case |

In sparse graphs (small $q$), PC is polynomial; in dense graphs ($q \sim d$), it becomes
exponential. This is the **fundamental limitation** of constraint-based methods on dense graphs.

## The FCI Extension (Hidden Variables)

PC assumes **causal sufficiency** (no latent confounders). The **Fast Causal Inference (FCI)**
algorithm relaxes this, allowing for hidden common causes. FCI adds an additional orientation
step that marks edges potentially due to confounding, producing a **PAG (Partial Ancestral
Graph)** rather than a CPDAG. The skeleton-learning phase is identical; FCI adds a
"possible-D-sep" test phase and more complex orientation rules.

## Examples

> [!example] Example: Running PC on a 4-Variable Chain
> **Setup**: True DAG is $X_1 \to X_2 \to X_3 \to X_4$ (a chain). Assume Gaussian data.
>
> **Skeleton Phase** (key tests at $\ell = 0$):
> - $X_1 \perp X_4$? No (marginally dependent via chain). Keep edge.
> - Actually: $X_1 \perp X_3 \mid X_2$? Yes (d-separated). Remove edge $X_1 - X_3$.
> - $X_1 \perp X_4 \mid X_2$? Yes. Remove edge $X_1 - X_4$.
> - $X_2 \perp X_4 \mid X_3$? Yes. Remove edge $X_2 - X_4$.
>
> **Result after skeleton phase**: $X_1 - X_2 - X_3 - X_4$ (chain skeleton, correct).
>
> **V-structure phase**: No unshielded triples remain where both endpoints are non-adjacent.
> No v-structures to orient.
>
> **Meek rules**: No forced orientations (chain is in an MEC of three Markov-equivalent DAGs).
>
> **Output CPDAG**: $X_1 - X_2 - X_3 - X_4$ (all undirected — correct, since the true DAG
> belongs to an MEC of size 3).

## Practical Limitations and Modern Extensions

| Issue | Impact | Mitigation |
|-------|--------|-----------|
| **Multiple testing** | False edges at high $d$ | Bonferroni correction; stable PC (Colombo & Maathuis, 2014) |
| **Order dependence** | Different edge orderings give different outputs | PC-stable (uses adjacency from previous iteration) |
| **Dense graphs** | Exponential CI test count | GES or NOTEARS preferred for dense graphs |
| **Small samples** | CI tests unreliable | Kernel-based tests; bootstrap CI; Bayesian structure learning |
| **Cyclic graphs** | PC assumes acyclicity | Extensions (CCD, ADMG) for cyclic structures |

## Connections

- **GES** (→ [[Greedy Equivalence Search]]): the score-based alternative; in the asymptotic
  limit GES and PC target the same CPDAG but via different mechanisms. GES is generally
  preferred when sample size is large enough and in sparse-score settings; PC is more
  interpretable and easier to implement.
- **NOTEARS** (→ [[NOTEARS - Overview]]): the continuous-optimization alternative; operates
  on a weighted adjacency matrix rather than in equivalence class space. NOTEARS benchmarks
  against PC and GES in its experiments.
- **Conditional independence tests**: PC implements CI-test-based structure learning, which
  [[DAG Structure Learning Problem]] contrasts with score-based approaches.
- **d-separation and CPDAGs**: PC directly implements the d-separation characterization of
  [[Markov Equivalence and CPDAGs]].

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG structure that PC outputs
- [[Greedy Equivalence Search]] — score-based alternative to constraint-based learning
- [[DAG Structure Learning Problem]] — where PC fits in the broader landscape
- [[NOTEARS Experiments]] — empirical comparison with PC
- [[Directed Acyclic Graphs]] — d-separation semantics underlying PC's CI tests
