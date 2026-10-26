---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis2014-PC-algorithm.txt]]"
source_location: "Full paper; background from Spirtes, Glymour & Scheines (2000) Ch. 5-6"
date_ingested: 2026-10-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991; Spirtes, Glymour & Scheines 2000)
> is the canonical **constraint-based** approach to causal structure learning. It proceeds in two
> phases: (1) an **adjacency search** that removes edges via conditional independence tests,
> recovering the skeleton; and (2) an **orientation phase** that identifies v-structures from
> the recorded separating sets and completes the CPDAG via Meek rules. PC is consistent under
> **Faithfulness** and **Causal Sufficiency**, and computationally efficient for sparse graphs.
> The **PC-stable** variant (Colombo & Maathuis 2014) removes a problematic order-dependence
> in the adjacency search, making results reproducible regardless of variable ordering.

## Overview

The PC algorithm belongs to the **constraint-based** family of structure-learning methods:
it uses statistical *tests* of conditional independence as the primitive operation, inferring
the graph from which independences hold in the data. This contrasts with score-based methods
like [[Greedy Equivalence Search]], which optimize a global score over equivalence classes.

The key insight is that the Markov condition of a DAG implies specific conditional
independence relations, and the Faithfulness assumption ensures these are the *only*
independences. Conditional independences reveal which edges should be absent (removed
during the skeleton search) and, combined with the separating sets recorded, which
colliders to orient as v-structures.

## Main Content

### Assumptions

> [!definition] Definition: Faithfulness (Spirtes et al. 2000)
> A distribution $\mathbb{P}$ and a DAG $G$ satisfy **faithfulness** if every conditional
> independence in $\mathbb{P}$ corresponds to a d-separation statement in $G$. Formally:
> $$X \perp\!\!\!\perp Y \mid S \text{ in } \mathbb{P} \implies X \text{ d-sep-from } Y \text{ given } S \text{ in } G.$$
> Without faithfulness, a true edge might be cancelled by a precise numerical balance of
> path effects, making the independence test misleadingly suggest the edge is absent.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> A variable set $V$ satisfies **causal sufficiency** if every common cause of any two
> variables in $V$ is also in $V$ — i.e., there are no unmeasured confounders. PC requires
> causal sufficiency; the **FCI algorithm** (Fast Causal Inference, Spirtes et al. 2000)
> relaxes this at the cost of returning a **PAG** (Partial Ancestral Graph) rather than a CPDAG.
^def-causal-sufficiency

### Phase 1: Skeleton / Adjacency Search

The skeleton search eliminates edges that are conditionally independent given some subset of
the remaining adjacencies. It proceeds level by level, increasing the conditioning set size.

> [!theorem] PC Skeleton Algorithm (Spirtes et al. 2000, Algorithm 3.2)
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
> **Output:** Skeleton $H$ (undirected graph) and separation sets $\mathrm{sep}(X,Y)$ for
>   each non-adjacent pair $X, Y$.
>
> 1. Initialize $H$ as the complete undirected graph on $d$ nodes. Set $l \leftarrow 0$.
> 2. **Repeat** while there exists an adjacent pair $(X, Y)$ in $H$ with $|\mathrm{adj}(H, X) \setminus \{Y\}| \geq l$:
>    - **For each** adjacent pair $(X, Y)$ in $H$:
>      - **For each** $S \subseteq \mathrm{adj}(H, X) \setminus \{Y\}$ with $|S| = l$:
>        - If $X \perp\!\!\!\perp Y \mid S$ (by statistical test at level $\alpha$):
>          - Remove edge $X - Y$ from $H$
>          - Record $\mathrm{sep}(X,Y) \leftarrow S$, $\quad \mathrm{sep}(Y,X) \leftarrow S$
>          - Break (move to next pair)
>    - Increment $l \leftarrow l + 1$.
> 3. Return $H$ and $\{\mathrm{sep}(X,Y)\}$.
^alg-pc-skeleton

> [!note] Computational complexity
> For a sparse true graph with maximum degree $q$, the number of conditional independence
> tests is $O(d^2 \cdot p^q)$ — polynomial in $d$ for fixed $q$. In practice, the limiting
> factor is the number of tests at each level $l$: if the true graph has low in-degree, only
> a few subsets need to be tested at any level.

### Phase 2: Orientation — V-structures and Meek Rules

> [!theorem] V-structure Orientation (PC, Phase 2a)
> For each unshielded triple $X - Z - Y$ (where $X$ and $Y$ are not adjacent):
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure / collider).
> - If $Z \in \mathrm{sep}(X, Y)$: leave $X - Z - Y$ undirected (non-collider).
>
> **Intuition:** $X$ and $Y$ are d-separated by some set $S$. If $Z$ is not in $S$, then
> conditioning on $Z$ would *open* the path (collider activation), so $Z$ must be a collider.
> If $Z \in S$, then $Z$ being on the path blocks the dependence as a non-collider.
^alg-vstructures

After orienting all v-structures, the [[Markov Equivalence Classes and CPDAGs#^thm-meek-rules|Meek rules]] are applied
iteratively to orient additional edges without introducing new v-structures or cycles, yielding
the final CPDAG.

### The PC-stable Modification (Colombo & Maathuis 2014)

The original PC algorithm has a subtle **order-dependence problem**: in Phase 1, the
adjacency set `adj(H,X)` used to form the conditioning set $S$ is modified *during* the
level-$l$ loop, so the exact tests run depend on the order in which edges are processed.
Different orderings of variables can yield different skeletons in finite samples.

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> **PC-stable** fixes this by separating the *use* and *update* of adjacency sets within
> each level $l$:
> 1. At the start of level $l$, save the current adjacency set $\mathrm{adj}_l(H, X)$ for
>    all $X$ as a *snapshot*.
> 2. Form all conditioning sets $S$ for level $l$ using the **snapshot** $\mathrm{adj}_l$,
>    **not** the dynamically updated $H$.
> 3. Apply all edge removals found at level $l$ simultaneously (or in any order) before
>    advancing to $l+1$.
>
> This makes the skeleton output **order-independent**: the same skeleton is returned
> regardless of variable ordering. PC-stable is the default in the `pcalg` R package.
^def-pc-stable

### Conditional Independence Tests

The skeleton search requires a statistical oracle for conditional independence
$X \perp\!\!\!\perp Y \mid S$. Common implementations:

| Setting | Test | Notes |
|---------|------|-------|
| **Gaussian / linear** | Fisher's Z-test on partial correlations | Fast, parametric; assumes linearity |
| **Discrete** | $\chi^2$ test or $G$-test on contingency tables | Standard for categorical data |
| **Nonlinear / general** | Kernel Conditional Independence test (KCI; Zhang et al. 2012) | Nonparametric, expensive $O(n^3)$ |
| **Time series** | Momentary conditional independence (MCI; Runge 2018) | Adapted for lagged dependencies |

For Gaussian data, the partial correlation between $X$ and $Y$ given $S$ is computed from
the inverse covariance matrix (precision matrix), and Fisher's Z-transformation gives the
test statistic:
$$z = \frac{1}{2} \ln \frac{1 + \hat{\rho}_{XY|S}}{1 - \hat{\rho}_{XY|S}}, \qquad z \sim \mathcal{N}\!\left(0, \frac{1}{n - |S| - 3}\right) \text{ under } H_0: \rho_{XY|S} = 0.$$

### Consistency Guarantees

> [!theorem] Theorem: PC Consistency (Kalisch & Bühlmann 2007)
> Under Faithfulness, Causal Sufficiency, and a **sparse faithfulness** condition (bounding the
> Markov blanket sizes), the PC algorithm with a consistent conditional independence test
> (significance level $\alpha_n \to 0$ as $n \to \infty$) recovers the true CPDAG with probability
> approaching 1 as $n \to \infty$. This holds even in **high-dimensional** settings where
> $d \gg n$, as long as the maximum degree $q = O(\log n)$.
^thm-pc-consistency

## Extensions and Variants

| Variant | Extension | Key Reference |
|---------|-----------|--------------|
| **FCI** (Fast Causal Inference) | Relaxes causal sufficiency; returns PAG (Partial Ancestral Graph) allowing latent confounders | Spirtes et al. 2000 |
| **RFCI** (Really Fast CI) | FCI approximation with $O(d^2)$ tests; consistent under faithfulness | Colombo et al. 2012 |
| **PC-stable** | Order-independent skeleton search | Colombo & Maathuis 2014 |
| **Conservative PC** (CPC) | Tests every triple for definite non-collider status; reduces false colliders | Ramsey et al. 2006 |
| **PCMCI** | Time-series adaptation using lagged conditioning sets | Runge 2018 |

## Software

- **pcalg** (R): `pc()` for PC-stable; `fci()` for FCI. Available on CRAN.
- **causal-learn** (Python): `PC()` class with multiple CI test backends.
- **TETRAD** (Java): GUI-based, full suite of PC variants.
- **bnlearn** (R): `pc.stable()` and related functions.

## Connections

- [[Markov Equivalence Classes and CPDAGs]] — PC returns a CPDAG; the target is the
  equivalence class of the true DAG
- [[Greedy Equivalence Search]] — score-based alternative; does not require choosing a CI
  test but requires a decomposable score; generally more sample-efficient
- [[NOTEARS - Overview]] — continuous optimization alternative; unlike PC, returns a single
  DAG (not a CPDAG) and does not require a CI test
- [[DAG Structure Learning Problem]] — the landscape of prior methods where PC fits under
  "constraint-based"
- [[Summary Causal DAGs]] — DAG summarization that takes the learned DAG as input; PC/GES
  are what precede this step
- [[Directed Acyclic Graphs]] — d-separation semantics underlying the Faithfulness assumption

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG concept and Meek rules
- [[Greedy Equivalence Search]] — the score-based counterpart
- [[DAG Structure Learning Problem]] — problem setup and broader context
- [[Causal Discovery/_Index|Causal Discovery Index]]
