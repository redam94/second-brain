---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-ref.md]]"
source_location: "Ch. 5–6; Kalisch & Bühlmann (2007) for high-dim extension"
date_ingested: 2026-11-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "PC-algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based causal discovery"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; full treatment: Spirtes, Glymour & Scheines 2000)
> is the canonical **constraint-based** algorithm for learning the Markov equivalence class
> of a DAG from i.i.d. observational data. It has two phases: (1) **skeleton discovery** — start
> from a fully connected undirected graph and remove edges $X - Y$ whenever a **conditional
> independence** $X \perp\!\!\!\perp Y \mid \mathbf{S}$ is detected for some set $\mathbf{S}$
> of conditioning variables; and (2) **orientation** — orient v-structures and apply Meek's
> rules to produce the unique [[Markov Equivalence and CPDAGs|CPDAG]]. The algorithm is
> consistent under the **Markov, faithfulness, and causal sufficiency** assumptions. Kalisch &
> Bühlmann (2007) proved high-dimensional consistency when $d \gg n$ under graph sparsity,
> using partial correlations as the CI test for Gaussian data.

## Overview

The PC algorithm addresses the following problem: given $n$ i.i.d. samples from $P(\mathbf{V})$,
recover the CPDAG of the DAG $\mathcal{G}$ that generated the data. It is "constraint-based"
because it queries **conditional independence** (CI) constraints implied by the data, rather
than optimizing a score over graph structures (as [[Greedy Equivalence Search]] does).

The name "PC" comes from the first names of the original authors: **P**eter Spirtes and
**C**lark Glymour. It was introduced in Spirtes & Glymour (1991) and given its definitive
treatment in *Causation, Prediction, and Search* (Spirtes, Glymour & Scheines 2000, MIT Press).

## Main Content

### Assumptions

The PC algorithm is correct under three assumptions:

> [!definition] Definition: PC algorithm assumptions
>
> **A1 — Markov condition**: $P$ is Markov with respect to the true DAG $\mathcal{G}^*$
> (joint factorizes over the graph). See [[Markov Equivalence and CPDAGs#^def-markov]].
>
> **A2 — Faithfulness**: $P$ is faithful to $\mathcal{G}^*$ — every conditional independence
> in $P$ is entailed by d-separation in $\mathcal{G}^*$.
> See [[Markov Equivalence and CPDAGs#^def-faithfulness]].
>
> **A3 — Causal sufficiency**: the observed variables $\mathbf{V}$ include all common causes
> of any pair in $\mathbf{V}$. There are no latent/unmeasured confounders.
>
> Under A1–A3, the PC algorithm is **correct in the large-sample limit**: it returns the
> CPDAG of $\mathcal{G}^*$. When causal sufficiency fails, the FCI algorithm (Spirtes et al.
> 2000) is used instead, returning a Partial Ancestral Graph (PAG).
^def-assumptions

### Phase 1: Skeleton Discovery

**Input:** A complete undirected graph over $d$ nodes.  
**Goal:** Remove edges $X - Y$ whenever $X$ and $Y$ are conditionally independent given some
set of variables $\mathbf{S} \subseteq \mathbf{V} \setminus \{X, Y\}$. The set $\mathbf{S}$
achieving independence is the **separating set** $\mathrm{Sepset}(X, Y)$.

The key efficiency insight: by the Markov condition, if $X$ and $Y$ are non-adjacent in
$\mathcal{G}^*$, their separating set is a subset of their **adjacencies** at the current
iteration. So we only need to test conditioning sets drawn from the current neighbor sets.

> [!theorem] Algorithm: PC Skeleton Discovery (Spirtes, Glymour & Scheines 2000, Ch. 5)
>
> **Initialization:** Let $\mathcal{H}$ be the complete undirected graph on $\mathbf{V}$.
> Set the adjacency sets $\mathrm{Adj}(X, \mathcal{H})$ for all $X$. Set $\ell = -1$.
>
> **Loop:** Repeat:
> 1. Increment $\ell \leftarrow \ell + 1$.
> 2. For each pair of adjacent nodes $(X, Y)$ in $\mathcal{H}$:
>    - Let $\mathcal{N} = \mathrm{Adj}(X, \mathcal{H}) \setminus \{Y\}$ (or $\mathrm{Adj}(Y, \mathcal{H}) \setminus \{X\}$).
>    - If $|\mathcal{N}| \geq \ell$: test all subsets $\mathbf{S} \subseteq \mathcal{N}$ with $|\mathbf{S}| = \ell$.
>    - If $X \perp\!\!\!\perp Y \mid \mathbf{S}$ for some $\mathbf{S}$: remove edge $X - Y$ from $\mathcal{H}$; store $\mathrm{Sepset}(X,Y) = \mathbf{S}$.
> 3. Until no adjacency set has cardinality $\geq \ell$.
>
> **Output:** Skeleton $\mathcal{H}$ and all Sepsets.
^alg-skeleton

The level-$\ell$ loop tests CI conditional on sets of size $\ell$. When the true graph has
maximum degree $q$, the algorithm terminates at $\ell = q$ having run at most
$O(d^{q+2})$ CI tests — tractable when $q$ is small.

### Phase 2: V-structure Orientation

**Input:** Skeleton $\mathcal{H}$ and Sepsets.  
**Goal:** Orient edges into v-structures (unshielded colliders), then apply Meek's rules.

> [!theorem] Algorithm: V-structure orientation
>
> For every triple $(X, Z, Y)$ where $X - Z$, $Z - Y$, and $X$ and $Y$ are **non-adjacent**:
> - If $Z \notin \mathrm{Sepset}(X, Y)$: orient as $X \to Z \leftarrow Y$ (a v-structure / collider).
> - Otherwise: leave $X - Z$ and $Z - Y$ undirected.
>
> Then apply Meek's rules R1–R4 (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]])
> until no more orientations are possible.
>
> **Output:** CPDAG.
^alg-orient

The logic: if $Z$ is not in the separating set of $X$ and $Y$, then $Z$ cannot be d-separating
them on the path $X - Z - Y$. It must therefore be a collider on this path: $X \to Z \leftarrow Y$.

### Conditional independence tests

The PC algorithm is a framework; the CI test is plugged in externally. Common choices:

| Data type | CI test | Statistic |
|-----------|---------|-----------|
| Gaussian | Partial correlation | Fisher's z-transform |
| Discrete | $\chi^2$ / $G^2$ | Conditional mutual information |
| Non-parametric | Kernel-based | HSIC, KCI (Zhang et al. 2012) |
| General | Regression-based | Residual independence |

> [!definition] Definition: Fisher's z-test for Gaussian data (Kalisch & Bühlmann 2007)
>
> For Gaussian $(X, Y, \mathbf{Z})$, let $\rho_{XY \cdot \mathbf{Z}}$ be the partial correlation
> of $X$ and $Y$ given $\mathbf{Z}$ (the $(X,Y)$ element of $\Sigma_{\mathbf{Z}}^{-1}$ normalized
> appropriately). Define the **Fisher z-transform**:
> $$z_{XY\cdot\mathbf{Z}} = \frac{1}{2}\log\frac{1 + \hat{\rho}_{XY\cdot\mathbf{Z}}}{1 - \hat{\rho}_{XY\cdot\mathbf{Z}}}.$$
> Under $H_0: \rho_{XY\cdot\mathbf{Z}} = 0$, the statistic $\sqrt{n - |\mathbf{Z}| - 3}\,|z_{XY\cdot\mathbf{Z}}|$
> is asymptotically standard normal. Reject at significance level $\alpha$ when this exceeds $\Phi^{-1}(1 - \alpha/2)$.
^def-fisher-z

The significance level $\alpha$ is a tuning parameter: larger $\alpha$ removes more edges (sparser
graph), smaller $\alpha$ keeps more edges (denser graph). In practice, $\alpha \in [0.01, 0.05]$.

### High-dimensional consistency (Kalisch & Bühlmann 2007)

> [!theorem] Theorem: High-dimensional consistency of PC (Kalisch & Bühlmann 2007, Thm. 3)
>
> Let the true DAG $\mathcal{G}^*$ have maximum degree $q$. Let the data be i.i.d. Gaussian
> with $n$ observations on $d$ variables. Use the Fisher z-test at level $\alpha_n$ with
> $\alpha_n \to 0$ as $n \to \infty$ and $\alpha_n \geq 1 - \Phi(c\sqrt{\log d})$ for some
> constant $c$. Then under the Markov and faithfulness assumptions:
>
> $$\Pr\big(\hat{\mathcal{C}}_n = \mathcal{C}^*\big) \to 1 \quad \text{as } n \to \infty,$$
>
> even when $d$ grows polynomially in $n$ (e.g., $d = O(n^a)$ for $a < 1$),
> provided the minimum absolute partial correlation is bounded away from zero at rate
> $(\log d / n)^{1/2}$.
>
> **Implication**: PC is consistent in high dimensions as long as the graph is **sparse**
> ($q$ fixed) and **signals are not too weak** (minimum nonzero partial correlation $\gtrsim \sqrt{\log d/n}$).
^thm-highdim

### Complexity

- **Number of CI tests**: $O(d^{q+2})$ where $q$ is the maximum degree.  
- **Each test at level $\ell$**: $O\binom{d}{2}\binom{d-2}{\ell}$ tests — exponential in $\ell$ but
  manageable for small $q$ (sparse graphs).
- **Memory**: $O(d^2)$ for the skeleton.
- **Comparison to GES**: GES is $O(d^{q+2})$ for each phase and also scales with $q$; in practice
  PC and GES have similar scaling on sparse graphs.

### PC-stable variant

The standard PC algorithm is **order-dependent**: the resulting CPDAG can differ depending
on the order in which variables are enumerated (because removing an edge in one iteration
changes neighbor sets and hence which CI tests are run next). The **PC-stable** version
(Colombo & Maathuis 2014) fixes this by separating the edge-removal step from the
neighbor-set update: at each level $\ell$, all CI tests are run on the **current** skeleton
before any edges are removed.

## Comparison with Score-Based Methods

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (optimize score) |
| Output | CPDAG | CPDAG |
| Consistency | Yes, under A1–A3 + faithfulness | Yes, under A1–A3 + faithfulness |
| Primary tuning | Significance level $\alpha$ | Score function (BIC $\lambda$) |
| High-dim. scaling | Needs sparse graph ($q$ small) | Needs sparse graph ($q$ small) |
| Non-Gaussian data | Requires non-parametric CI test | Score adapts directly |
| Practical accuracy | Good for small-medium $d$ | Often better empirically (Ramsey 2017) |
| NOTEARS comparison | Used as baseline in [[NOTEARS Experiments]] | Used as baseline in [[NOTEARS Experiments]] |

## Connections

- **[[Markov Equivalence and CPDAGs]]**: PC's output is a CPDAG. The CPDAG characterization
  (Verma & Pearl 1991) and Meek's orientation rules are prerequisites.
- **[[Greedy Equivalence Search]]**: GES is the score-based counterpart to PC. Both return a
  CPDAG and have the same consistency guarantees under faithfulness; GES often has better
  empirical performance on small samples.
- **[[NOTEARS Experiments]]**: NOTEARS (Zheng et al. 2018) benchmarks against PC and finds
  it competitive on dense graphs and large $d$ where PC's CI tests are noisy.
- **[[Directed Acyclic Graphs]]**: the d-separation criterion used in Phase 1 is explained there.
- **FCI (Fast Causal Inference)**: PC's extension for latent confounders (violating causal
  sufficiency A3); returns a PAG (Partial Ancestral Graph) instead of a CPDAG.
- **[[Approximate Bayesian Computation for ABMs]]**: constraint-based discovery can be applied
  to ABM output data as a first pass for structure identification before causal modeling.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, Meek's rules, v-structures
- [[Greedy Equivalence Search]] — score-based alternative to PC
- [[DAG Structure Learning Problem]] — the general structure learning setup
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion
- [[Summary Causal DAGs]] — applied causal DAG construction (Zeng 2025)
