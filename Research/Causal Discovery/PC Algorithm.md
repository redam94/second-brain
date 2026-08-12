---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2, §5 (background and experiments); primary: Spirtes & Glymour (1991), Spirtes, Glymour & Scheines (2000)"
date_ingested: 2026-08-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "Spirtes-Glymour algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; named after its inventors **P**eter Spirtes and
> **C**lark Glymour) is the canonical **constraint-based** method for causal structure learning.
> It recovers the **CPDAG** (Markov equivalence class) of the underlying DAG from
> i.i.d. observational data by performing **conditional independence (CI) tests** to build the
> skeleton, then orienting v-structures and applying Meek rules. Under faithfulness and correct
> CI tests it is **consistent**: in large samples it returns the true CPDAG. Its main limitation
> is exponential worst-case complexity in CI test conditioning set size, and sensitivity to
> CI test errors.

## Overview

The PC algorithm takes a purely *statistical* approach to causal discovery: it extracts the
graph skeleton and orientation from the patterns of conditional independence in the data, without
ever fitting a parametric model. This contrasts with **score-based** methods (GES, NOTEARS) that
optimize a goodness-of-fit criterion over graph structures.

The key insight (Spirtes & Glymour, 1991) is that the **skeleton** can be recovered efficiently
by exploiting a *monotone-adjacency* property: if $X_i \perp\!\!\!\perp X_j \mid S$ for some $S$, then
$X_i$ and $X_j$ are not adjacent in *any* DAG faithful to the distribution. Moreover, if $X_i$
and $X_j$ are adjacent in the true DAG, the minimum separating set is a subset of the
**neighbours** of $X_i$ or $X_j$ — not the full variable set.

## Main Content

### Algorithm Overview

The PC algorithm has three phases.

> [!definition] Definition: PC Algorithm (Spirtes, Glymour & Scheines, 2000, Algorithm 3.4)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$ for CI tests.
> **Output**: CPDAG $\hat{\mathcal{C}}$ (estimated Markov equivalence class).
>
> **Phase 1 — Skeleton learning:**
> 1. Start with the complete undirected graph $\mathcal{G}^0$ on $d$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in the current graph:
>      - If there exists a set $S \subseteq \text{adj}(X_i) \setminus \{X_j\}$ with $|S| = \ell$
>        such that $X_i \perp\!\!\!\perp X_j \mid S$ (by CI test at level $\alpha$):
>        - Remove edge $X_i - X_j$ from the graph.
>        - Store $S$ as the **separating set** $\text{Sep}(i, j) \leftarrow S$.
>        - Break (move to next pair).
>    - Stop when no adjacent pair has $|\text{adj}(X_i)| - 1 \geq \ell + 1$.
>
> **Phase 2 — V-structure orientation:**
> - For each unshielded triple $X_i - X_m - X_j$ (i.e. $X_i$ and $X_j$ not adjacent):
>   - If $X_m \notin \text{Sep}(i, j)$: orient as $X_i \to X_m \leftarrow X_j$ (v-structure).
>
> **Phase 3 — Edge orientation propagation (Meek rules):**
> - Apply Meek's four orientation rules repeatedly until no more edges can be oriented.
> - Output the resulting **CPDAG** $\hat{\mathcal{C}}$.
^def-pc-algorithm

### Phase 1: Skeleton learning in detail

The key efficiency device is **incremental increase of conditioning set size** $\ell$. For
$\ell = 0$ one tests pairwise marginal independence $X_i \perp\!\!\!\perp X_j$ — removing many edges
cheaply. For $\ell = 1$ one conditions on single variables. The maximum conditioning set size
tested equals the maximum *adjacency* of any node in the skeleton, which for sparse graphs is
small.

> [!note] Complexity of Phase 1
> In the worst case (dense graph), the number of CI tests grows exponentially in $d$. For sparse
> graphs with maximum adjacency $\kappa$, the number of tests is $O(d^2 \cdot \binom{\kappa}{\ell})$
> for each level $\ell$, bounded by $O(d^\kappa)$ total. In practice for biology and social
> science networks $\kappa \ll d$, making PC tractable.

### Phase 2: V-structure identification

V-structures are the only locally identifiable directed features in observational data. The
separating sets from Phase 1 directly indicate v-structures:

> [!theorem] Theorem: V-structure identification via separating sets (Spirtes et al., 2000)
> Under **faithfulness**, $X_i \to X_m \leftarrow X_j$ is a v-structure if and only if $X_i$ and
> $X_j$ are not adjacent *and* the collider $X_m$ is **not** in the separating set $\text{Sep}(i,j)$.
>
> **Intuition**: If $X_m$ were in $\text{Sep}(i,j)$, conditioning on it would block the path
> $X_i \leftarrow X_m \rightarrow X_j$ in a chain or fork — meaning $X_m$ is not a collider but
> a mediator or common cause. The presence of $X_m$ in the separating set says "blocking $X_m$
> makes $i$ and $j$ independent," which is the chain/fork signature, not the collider signature.
^thm-vstructure-ident

### Phase 3: Meek rule propagation

After v-structure orientation, further edges can be oriented by four **Meek rules** (1995) that
enforce consistency: no new v-structures should be introduced, and no directed cycles. See
[[Markov Equivalence and CPDAGs#Meek orientation rules]] for the full rule table.

### CI tests for continuous data

For multivariate Gaussian data, the standard CI test is the **partial correlation test**:

> [!definition] Definition: Partial correlation CI test
> Under a multivariate Gaussian model, $X_i \perp\!\!\!\perp X_j \mid S$ if and only if the
> **partial correlation** $\rho_{ij \cdot S} = 0$. The sample partial correlation can be
> computed from the correlation matrix via the recursion:
> $$\hat{\rho}_{ij \cdot S} = \frac{\hat{\rho}_{ij \cdot S \setminus \{k\}} - \hat{\rho}_{ik \cdot S \setminus \{k\}} \cdot \hat{\rho}_{jk \cdot S \setminus \{k\}}}{\sqrt{(1 - \hat{\rho}^2_{ik \cdot S \setminus \{k\}})(1 - \hat{\rho}^2_{jk \cdot S \setminus \{k\}})}}$$
> The test statistic $z = \sqrt{n - |S| - 3} \cdot \text{arctanh}(\hat{\rho}_{ij \cdot S})$ follows
> approximately $\mathcal{N}(0,1)$ under $H_0: \rho_{ij \cdot S} = 0$ (Fisher's z-transformation).
> Reject $H_0$ (keep edge) if $|z| > z_{\alpha/2}$.
^def-ci-test-gaussian

For non-Gaussian or non-linear data, kernel-based CI tests (HSIC, KCI), rank-based tests, or
regression-residual tests are used. The `pcalg` R package (Kalisch et al., 2012) provides all
of these.

### Consistency result

> [!theorem] Theorem: Consistency of PC (Kalisch & Bühlmann, 2007; Spirtes et al., 2000)
> Assume the data are generated by a faithful DAG $\mathcal{G}^*$. Under mild regularity conditions,
> as $n \to \infty$ and with $\alpha = \alpha_n \to 0$ at an appropriate rate, the PC algorithm
> **consistently recovers the CPDAG**: $\hat{\mathcal{C}} \xrightarrow{p} \mathcal{C}(\mathcal{G}^*)$.
>
> Kalisch & Bühlmann (2007) extend this to the **high-dimensional** setting ($d \gg n$) under
> sparsity: PC is consistent when the true graph has bounded neighbourhood size $\kappa$ and
> $n > c \log d$ for a constant depending on $\kappa$.
^thm-pc-consistency

## Performance and Limitations

### Strengths
- **Model-agnostic**: works with any CI test — parametric or non-parametric
- **Interpretable output**: CPDAG makes explicit which edges are identifiable
- **Provably consistent** under faithfulness + correct CI tests
- **Scalable in sparse graphs**: $O(d^\kappa)$ tests, polynomial in $d$ for fixed $\kappa$

### Weaknesses
- **CI test errors compound**: Phase 2 depends on the correctness of Phase 1 skeletons; one
  wrong edge can cascade into incorrect v-structures and orientations
- **Faithfulness violations**: near-faithfulness (almost-cancelled paths) leads to very large
  conditioning sets that blow up the test count and degrade power
- **Order-dependence**: the original PC algorithm's skeleton is *order-dependent* (the result
  depends on the order in which pairs $(i,j)$ are tested). The **PC-stable** variant (Colombo &
  Maathuis, 2014) fixes this by separating the adjacency updates from the removal decisions
- **Dense graphs**: worst-case exponential tests when $\kappa$ is large
- **Accuracy vs. FGS/GES**: NOTEARS reports that "the accuracy of PC and LiNGAM was
  significantly lower than either FGS or NOTEARS" in its experiments (§5), consistent with
  previous benchmarks where score-based methods generally outperform constraint-based ones

## Examples

> [!example] Example: PC on a 4-variable chain
> **True graph**: $X_1 \to X_2 \to X_3 \to X_4$ (Markov chain).
>
> **Phase 1**: Testing at $\ell=0$: all pairwise tests find all adjacent pairs dependent. At
> $\ell=1$: test $X_1 \perp\!\!\!\perp X_3 \mid X_2$ → *independent* (chain blocks via $X_2$). Remove
> $X_1 - X_3$ edge; $\text{Sep}(1,3) = \{X_2\}$. Similarly test $X_1 \perp\!\!\!\perp X_4 \mid \{X_2, X_3\}$
> at $\ell=2$ → *independent*. Skeleton: $X_1 - X_2 - X_3 - X_4$.
>
> **Phase 2**: Check unshielded triples. $X_1 - X_2 - X_3$: $X_2 \in \text{Sep}(1,3) = \{X_2\}$
> → NOT a v-structure. Similarly for $(X_2, X_3, X_4)$. No v-structures found.
>
> **Phase 3**: No Meek rules fire. Output: fully **undirected** skeleton $X_1 - X_2 - X_3 - X_4$.
> This is correct: the chain $X_1 \to X_2 \to X_3 \to X_4$ and the reverse chain
> $X_1 \leftarrow X_2 \leftarrow X_3 \leftarrow X_4$ are Markov equivalent (same skeleton, no
> v-structures).

## Software

- **`pcalg` (R)**: Kalisch, Mächler, Colombo, Maathuis & Bühlmann (2012) — the primary R
  implementation. Supports `pc()`, `fci()`, `ges()` functions with multiple CI tests.
- **`causal-learn` (Python)**: py-why library implementing PC and many variants
  (PC-stable, FCI, RFCI). Uses a unified API for pluggable CI tests.
- **`gCastle` (Python)**: Huawei's causal structure learning toolkit, includes PC.

## Connections
- [[Markov Equivalence and CPDAGs]] — the theoretical target (CPDAG) and the Meek rules
- [[GES - Greedy Equivalence Search]] — score-based alternative that also returns a CPDAG
- [[NOTEARS - Overview]] — continuous optimization alternative; NOTEARS outperforms PC on
  dense graphs per Zheng et al. (2018)
- [[DAG Structure Learning Problem]] — the optimization landscape and comparison of approaches
- [[LLM Expert Elicitation for Bayesian Networks]] — when structure is elicited from experts
  rather than learned from data

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, v-structures, Meek rules
- [[GES - Greedy Equivalence Search]] — score-based complement to PC
- [[DAG Structure Learning Problem]] — the general problem formulation
- [[Directed Acyclic Graphs]] — d-separation and DAG semantics
