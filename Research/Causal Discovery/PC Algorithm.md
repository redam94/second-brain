---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS-citation.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Algorithm 5.4.1, pp. 84–88; Kalisch & Bühlmann (2007) JMLR 8(3)"
date_ingested: 2026-08-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Discovery Algorithm Comparison]]"
  - "[[GES Algorithm]]"
aliases:
  - "PC algorithm"
  - "constraint-based causal discovery"
  - "Spirtes-Glymour-Scheines algorithm"
  - "skeleton discovery"
  - "Peter-Clark algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines 1993/2000) is the foundational
> **constraint-based** causal structure learning algorithm. It recovers the skeleton of the
> true DAG by iteratively testing for conditional independence (CI) and removing edges where
> CI holds, then orients edges using v-structures and Meek rules. Under the faithfulness
> assumption and causal sufficiency, PC returns the true **CPDAG** in the large-sample limit.
> Its adaptive conditioning strategy makes it efficient for sparse graphs — the dominant
> complexity bottleneck is the number of CI tests, which is at most $O(d^2 \cdot 2^{d-2})$
> in the worst case but typically $O(d^2)$ for sparse structures.

## Overview

The PC algorithm is named after its creators **P**eter Spirtes and **C**lark Glymour. It operates
in two phases: (1) **skeleton recovery** using conditional independence tests, and (2)
**orientation** via v-structures and Meek rules. The key insight is that in an observational
dataset from a faithful distribution, every missing edge corresponds to a conditional independence
— there exists a *separating set* $\mathrm{sep}(X, Y)$ such that $X \perp Y \mid \mathrm{sep}(X,Y)$.
The skeleton algorithm discovers these separating sets directly from data.

The algorithm presupposes a **CI oracle** (or a test statistic): in practice, Fisher's z-test for
Gaussian data (partial correlations), chi-squared tests for discrete data, or kernel-based
independence tests (KCI, dHSIC) for general distributions.

## Main Content

### Assumptions

> [!definition] Definition: Causal Markov Condition (CMC)
> A DAG $\mathsf{G}$ satisfies the **causal Markov condition** for distribution $P$ if every
> variable $X_i$ is conditionally independent of its non-descendants given its parents:
> $$X_i \perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Under the CMC, d-separation in $\mathsf{G}$ implies conditional independence in $P$.
^def-cmc

> [!definition] Definition: Faithfulness Assumption
> A distribution $P$ is **faithful** to DAG $\mathsf{G}$ if every conditional independence in $P$
> is entailed by d-separation in $\mathsf{G}$:
> $$X \perp_P Y \mid Z \implies X \perp_{\mathsf{G}} Y \mid Z \quad \forall\, X,Y,Z.$$
> Faithfulness rules out "accidental" cancellations of causal paths. Without faithfulness, a
> causal path might be present in the graph but cancelled by opposing paths, making the edge
> appear absent from data.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> The observed variable set $\mathsf{V}$ is **causally sufficient** if every common cause of any
> two variables in $\mathsf{V}$ is also in $\mathsf{V}$. This rules out unobserved confounders.
> Violations require the FCI algorithm (Fast Causal Inference), an extension of PC.
^def-causal-sufficiency

### Phase 1: Skeleton recovery

The skeleton algorithm starts from a complete undirected graph and removes edges where a
separating set is found.

> [!theorem] PC Skeleton Algorithm (Spirtes et al. 2000, Alg. 5.4.1)
>
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, significance level $\alpha$.  
> **Output:** Skeleton $\mathsf{S}$ (undirected graph) and separating sets $\mathrm{sep}(X, Y)$ for all
> removed edges.
>
> 1. Initialize $\mathsf{S}$ as the complete undirected graph on $d$ nodes; set $\ell = 0$.
> 2. **Repeat:**
>    a. For each adjacent pair $(X, Y)$ in $\mathsf{S}$:
>       - Let $\mathrm{Adj}(X) = \text{neighbors of } X$ in current $\mathsf{S}$.
>       - For each subset $H \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|H| = \ell$:
>         - If $X \perp_{\alpha} Y \mid H$ (CI test accepts at level $\alpha$):
>           - Remove edge $X - Y$ from $\mathsf{S}$.
>           - Record $\mathrm{sep}(X, Y) = \mathrm{sep}(Y, X) = H$.
>           - Break (move to next pair).
>    b. Increment $\ell \leftarrow \ell + 1$.
> 3. **Until** no edge in $\mathsf{S}$ has an adjacent set of size $\geq \ell$.
>
> **Return** $(\mathsf{S}, \{\mathrm{sep}(X,Y)\})$.
^alg-pc-skeleton

> [!note] Why test subsets of $\mathrm{Adj}(X)$, not all of $\mathsf{V}$?
> Under faithfulness, if $X \perp Y \mid H$ for some $H$, then $H \subseteq \mathrm{Adj}(X)$
> (and $\mathrm{Adj}(Y)$). Testing all subsets of $\mathsf{V}$ is wasteful — the separating set
> always lies within the adjacency. Crucially, as edges are removed, $\mathrm{Adj}(X)$ shrinks,
> **adaptively reducing the search space.** This makes PC efficient for sparse true graphs.

> [!note] The "level" $\ell$ scheduling
> The outer loop increments the **conditioning set size** $\ell$. Starting at $\ell = 0$
> (marginal independence tests), then $\ell = 1$ (pairwise conditioning), and so on. This
> ordering is economical: most edges are removed at low $\ell$ in sparse graphs, so the
> exponentially many large conditioning sets are rarely reached.

### Phase 2: Orientation

After the skeleton is found, the algorithm orients edges in two sub-steps.

#### Step 2a: V-structure orientation

> [!theorem] V-structure Detection (Spirtes et al. 2000)
> For every unshielded triple $X - Z - Y$ (where $X, Y$ are non-adjacent):
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (a v-structure at $Z$).
> - If $Z \in \mathrm{sep}(X, Y)$: leave $X - Z - Y$ undirected (no v-structure).
>
> **Intuition.** Under faithfulness, $X \perp Y \mid H$ for some $H$. If $Z \notin H$,
> then conditioning on $Z$ would *open* (not close) the path — consistent only with $Z$
> being a collider. If $Z \in H$, the path is closed by $Z$ being a fork or chain.
^thm-v-structure-orientation

#### Step 2b: Meek rule propagation

> [!theorem] Meek Rules (Meek 1995) — see [[Markov Equivalence and CPDAGs]]
> Apply rules R1–R4 exhaustively to orient all remaining edges that are compelled by the
> current directed edges, without introducing new v-structures or cycles.
> The result is the **CPDAG** of the true DAG.
^thm-meek-pc

### Full PC algorithm

> [!theorem] PC Algorithm (complete)
>
> 1. Run skeleton algorithm (Phase 1) → skeleton $\mathsf{S}$ and separating sets.
> 2. Orient v-structures (Step 2a).
> 3. Apply Meek rules exhaustively (Step 2b).
> 4. **Return** the resulting CPDAG $\mathsf{C}$.
^alg-pc-full

### Consistency and correctness

> [!theorem] Theorem: PC Consistency (Spirtes et al. 2000, Theorem 5.4.2)
> Assume:
> 1. The data is generated by some DAG $\mathsf{G}^*$ (Markov condition holds for $P$).
> 2. $P$ is faithful to $\mathsf{G}^*$.
> 3. Causal sufficiency.
>
> Then as $n \to \infty$, the PC algorithm with a consistent CI test returns the CPDAG
> of $\mathsf{G}^*$ with probability 1.
^thm-pc-consistency

### CI testing in practice

The choice of CI test drives the practical behaviour of PC:

| Data type | CI test | Null distribution | Notes |
|-----------|---------|------------------|-------|
| Multivariate Gaussian | Partial correlation (Fisher's z) | $z \sim \mathcal{N}(0,1)$ | Exact under Gaussian; fast |
| Discrete | Conditional mutual information (χ²) | Chi-squared | Requires sufficient cell counts |
| General (linear) | Partial correlation | $t$-distribution | Robust under near-Gaussian |
| General (non-linear) | Kernel CI (KCI) | Bootstrap/gamma | Slow; $O(n^3)$ per test |
| Copula | Partial Spearman / Kendall | Permutation | Rank-based; distribution-free |

For Gaussian data, $X \perp Y \mid H$ iff partial correlation $\rho_{XY \cdot H} = 0$; the
Fisher z-transform $z = \frac{1}{2}\ln\frac{1+\hat\rho}{1-\hat\rho}$ is asymptotically
$\mathcal{N}\bigl(0, \frac{1}{n-|H|-3}\bigr)$.

### Complexity

- **Worst case:** $O\bigl(d^2 \cdot 2^{d-2}\bigr)$ CI tests (complete graph, $\ell$ can reach $d-2$).
- **Sparse graphs ($k$-sparse, max degree $\Delta$):** $O\bigl(d^2 \binom{\Delta-1}{k}\bigr)$ tests — polynomial in $d$ for fixed $\Delta$.
- **High-dimensional regime:** Kalisch & Bühlmann (2007) prove consistency when $d \gg n$ provided
  the true CPDAG is sparse and the maximum degree $\Delta$ is bounded.

### Software implementations

| Package | Language | Features |
|---------|---------|----------|
| `pcalg` | R | Reference implementation; many CI tests; FCI |
| `causal-learn` | Python | PC, FCI, GES, LiNGAM in one library |
| `py-causal` | Python | Java bridge to TETRAD; full suite |
| `bnlearn` | R | Bayesian networks focus; PC variant |

```python
# causal-learn example
from causallearn.search.ConstraintBased.PC import pc
from causallearn.utils.cit import fisherz

cg = pc(data, alpha=0.05, indep_test=fisherz)
cg.draw_pydot_graph()  # visualize CPDAG
```

## Limitations

1. **Faithfulness violations.** Deterministic relationships, cancelling paths, or near-faithfulness
   regimes cause incorrect edge removal or incorrect orientation.
2. **Causal sufficiency.** Hidden confounders create spurious adjacencies; PC cannot detect them.
   The FCI algorithm handles this but is harder to implement and interpret.
3. **Multiple testing.** Running many CI tests inflates Type-I error; the $\alpha$ threshold is not
   automatically corrected. Conservative $\alpha$ (e.g. 0.001) is common.
4. **Order dependence.** The sequence in which pairs are tested can affect results in finite samples;
   the PC-stable variant (Colombo & Maathuis 2014) removes this dependence.
5. **Non-Gaussian data.** Fisher's z-test assumes Gaussian; kernel tests are more general but slow.

## Connections

- **GES** ([[GES Algorithm]]): achieves the same asymptotic target (CPDAG) via score-based search
  rather than CI tests — often more accurate in finite samples.
- **NOTEARS** ([[NOTEARS - Overview]]): a third paradigm (continuous optimization) that outputs a
  full DAG (not CPDAG); outperforms PC and GES on dense graphs in the NOTEARS experiments
  ([[NOTEARS Experiments]]).
- **CPDAG target** ([[Markov Equivalence and CPDAGs]]): why PC cannot recover more than the
  equivalence class.
- **d-separation** ([[Directed Acyclic Graphs]]): the theory underlying the skeleton algorithm.

## See Also
- [[Markov Equivalence and CPDAGs]] — the identifiability theory; v-structures and Meek rules
- [[GES Algorithm]] — score-based alternative; comparison in [[Causal Discovery Algorithm Comparison]]
- [[DAG Structure Learning Problem]] — score-based framing (NOTEARS, GES)
- [[NOTEARS Experiments]] — empirical comparison: PC vs GES vs FGS vs NOTEARS
- [[Causal Discovery/_Index|Causal Discovery Index]]
