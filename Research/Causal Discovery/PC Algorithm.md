---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2, p. 3 (cited as Spirtes & Glymour, 1991); pcalg R package"
date_ingested: 2026-09-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Structure Learning]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC causal discovery"
  - "Spirtes Glymour 1991"
  - "skeleton algorithm"
  - "constraint-based DAG learning"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes & Glymour, 1991) is the foundational
> **constraint-based** method for recovering the Markov equivalence class of a DAG
> from observational data. It has three phases: (1) **skeleton discovery** via
> conditional independence tests with increasing conditioning-set size, (2)
> **v-structure orientation** using recorded separation sets, and (3) **edge
> completion** via Meek's rules. The output is a CPDAG. Under the Markov,
> faithfulness, and causal-sufficiency assumptions, PC is **consistent** as
> $n \to \infty$. Its key advantage is applicability without a parametric model;
> its key limitation is sensitivity to multiple CI testing errors in finite samples.

## Overview

The PC algorithm was introduced by Peter Spirtes and Clark Glymour (1991) and
is detailed in their landmark monograph *Causation, Prediction, and Search*
(Spirtes, Glymour & Scheines, 2000). It is named after its two authors.

The algorithm exploits the fact that, under faithfulness, non-adjacencies in the
true DAG's skeleton correspond to conditional independences in the data.
Rather than testing all $2^{d-2}$ possible conditioning sets for each pair, PC
is efficient: it starts with small conditioning sets and increases their size,
halting pair-wise as soon as a separating set is found. In sparse graphs, most
separations are found at low conditioning-set sizes, making the algorithm
**polynomial in $d$** for fixed maximum in-degree.

## Main Content

### Phase 1: Skeleton Discovery

> [!definition] Algorithm: PC Skeleton Phase (Spirtes & Glymour, 1991)
> **Input:** $n$ i.i.d. observations of $(X_1,\dots,X_d)$; CI test significance level $\alpha$.
>
> 1. **Initialize** the complete undirected graph $H$ on $d$ nodes.
> 2. Set $k \leftarrow 0$.
> 3. **Repeat:**
>    a. For each adjacent pair $(i,j)$ in $H$:
>       - Let $\mathrm{adj}(i) = $ current neighbours of $i$ in $H$ (excluding $j$).
>       - For each subset $S \subseteq \mathrm{adj}(i)$ with $|S|=k$:
>         - Run CI test: $H_0\colon X_i \perp\!\!\!\perp X_j \mid X_S$.
>         - If not rejected at level $\alpha$: remove edge $i - j$ from $H$;
>           record $\mathrm{sep}(i,j) \leftarrow S$; **break** (move to next pair).
>    b. Set $k \leftarrow k+1$.
>    c. **Stop** when $|{\rm adj}(i)| \leq k$ for all $i$ (no more edges to check).
>
> **Output:** skeleton $H^{\mathrm{skel}}$ and separation sets $\{\mathrm{sep}(i,j)\}_{(i,j)\notin H}$.
^alg-skeleton

> [!note] Complexity
> The number of CI tests is at most $\sum_{j=1}^{d} \binom{d_j}{k}$ for each $k$,
> where $d_j$ is the maximum degree. In sparse graphs (bounded max degree $q$),
> the total number of tests is $O(d^2 \cdot 2^q)$ — polynomial in $d$.
> In dense graphs, exponentially many tests may be needed.

### Phase 2: V-Structure Orientation

> [!definition] Algorithm: V-Structure Orientation (Spirtes & Glymour, 1991)
> **Input:** Skeleton $H^{\mathrm{skel}}$ and separation sets $\mathrm{sep}(i,j)$.
>
> For each **unshielded triple** $i - k - j$ (where $i \not\sim j$):
> - If $k \notin \mathrm{sep}(i,j)$: orient as $i \to k \leftarrow j$ (a **v-structure**).
> - If $k \in \mathrm{sep}(i,j)$: leave $i - k - j$ unoriented.
>
> **Output:** Partially directed graph with all v-structures oriented.
^alg-vstructure

> [!note] The v-structure criterion
> A collider $i \to k \leftarrow j$ is created only if $k$ was *not* used to separate
> $i$ and $j$ in Phase 1. This is consistent with the observation that conditioning on a
> collider *opens* a path (explaining-away), while conditioning on a non-collider *blocks*
> it. If $k$ was in $\mathrm{sep}(i,j)$, then $k$ is a non-collider, so no v-structure.

### Phase 3: Edge Completion (Meek Rules)

> [!definition] Algorithm: PC Edge Completion
> Apply [[Markov Equivalence and CPDAGs#^thm-meek-rules|Meek's four rules]] R1–R4 iteratively
> until no further orientations are possible.
>
> **Output:** CPDAG — the unique representation of the MEC of the true DAG.
^alg-completion

### Full PC Algorithm Pseudocode

> [!example] PC Algorithm (complete)
> ```
> Input: n × d data matrix X, significance α
>
> # Phase 1: Skeleton
> H ← complete undirected graph on {1,...,d}
> sep ← empty map
> for k = 0, 1, 2, ...:
>     for each adjacent (i,j) in H:
>         for each S ⊆ adj(i) \ {j} with |S| = k:
>             if CI_test(i, j | S, α) → independent:
>                 remove (i,j) from H
>                 sep(i,j) ← S
>                 break
>     if max_degree(H) ≤ k: break
>
> # Phase 2: V-structures
> for each unshielded triple (i, k, j) in H:
>     if k ∉ sep(i,j):
>         orient i → k ← j
>
> # Phase 3: Meek rules
> repeat until no change:
>     apply R1, R2, R3, R4
>
> return CPDAG H
> ```

### Theoretical Properties

> [!theorem] Consistency of PC (Spirtes et al., 2000)
> Under the following assumptions:
> - $\mathbb{P}$ is **Markov** to DAG $G^*$
> - $\mathbb{P}$ is **faithful** to $G^*$
> - The CI test is **consistent**: at level $\alpha_n \to 0$ with growing power
>
> The PC algorithm **consistently recovers** the CPDAG of $G^*$, i.e.
> $$\Pr(\hat{\mathcal{C}}_n = \mathcal{C}(G^*)) \to 1 \quad \text{as } n \to \infty.$$
^thm-pc-consistency

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann, 2007)
> Under **strong faithfulness** (CI values bounded away from zero) and Gaussian data,
> the PC algorithm is consistent even when $d = O(n^a)$ for some $a > 0$ — i.e.
> in high-dimensional settings with $d \gg n$. The key requirement is that conditioning
> sets remain small (sparse graphs).
^thm-pc-highdim

### Error modes in finite samples

| Error type | Cause | Consequence |
|---|---|---|
| False adjacency (false positive) | CI test incorrectly rejects $H_0$ | Extra edges in skeleton |
| Missing adjacency (false negative) | CI test incorrectly accepts $H_0$ | Missing edges; errors propagate to orientations |
| Wrong v-structure | Wrong Sep-set recorded | Incorrect orientation, wrong identifiable MEC |

Errors in Phase 1 cascade into Phases 2 and 3, since orientations depend on recorded
sep-sets. The **conservative PC** variant (Ramsey et al., 2012) addresses this by
using a majority-voting rule over multiple conditioning sets, reducing false positives.

### Software Implementations

| Package | Language | Notes |
|---|---|---|
| `pcalg` | R | Reference implementation; Kalisch & Bühlmann; supports Gaussian and non-parametric CI tests |
| `causal-learn` (CMU) | Python | PC + skeleton + many extensions; active development |
| `bnlearn` | R | Broader BN focus; includes PC with BIC-based test option |
| `gCastle` | Python | Industrial-scale; PC among many algorithms |

```r
# pcalg example (R)
library(pcalg)
# n x d data matrix
pc.fit <- pc(
  suffStat = list(C = cor(X), n = nrow(X)),
  indepTest = gaussCItest,
  alpha = 0.05,
  p = ncol(X)
)
# Returns a cpdag object
```

## Comparison to Other Methods

| Method | Paradigm | Output | Faithfulness? | Confounders? |
|---|---|---|---|---|
| **PC** | Constraint-based | CPDAG | Required | No (use FCI) |
| **GES** | Score-based | CPDAG | Required | No |
| **NOTEARS** | Continuous optimization | DAG | Not required | No |
| **FCI** | Constraint-based | PAG | Required | Yes (hidden) |
| **LiNGAM** | Functional model | Full DAG | Not required | No |

> [!note] PC in NOTEARS's experiments
> NOTEARS benchmarks (§5) found PC and LiNGAM "significantly weaker" than FGS and
> NOTEARS, noting they were "only reported in the supplement." PC's finite-sample
> CI errors, especially in dense graphs, hurt performance compared to global score-based
> methods. See [[NOTEARS Experiments]].

## Connections

- **Foundational theory**: the global Markov property + faithfulness — see [[Constraint-Based Structure Learning]]
- **Output**: the CPDAG and its properties — see [[Markov Equivalence and CPDAGs]]
- **Score-based alternative**: GES achieves similar consistency with fewer CI tests — see [[Greedy Equivalence Search]]
- **Extension to hidden confounders**: FCI (not yet covered in vault)
- **DAG learning problem** context: [[DAG Structure Learning Problem]]

## See Also
- [[Constraint-Based Structure Learning]] — assumptions and CI test choice
- [[Markov Equivalence and CPDAGs]] — what the CPDAG means and Meek's rules
- [[Greedy Equivalence Search]] — GES, the score-based alternative
- [[NOTEARS - Overview]] — the continuous optimization approach that outperforms PC on dense graphs
- [[DAG Structure Learning Problem]] — full landscape of structure learning methods
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion
