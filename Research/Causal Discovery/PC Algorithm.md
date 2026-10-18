---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SpirtesGlymourScheines2000-PC-reference.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5; Kalisch & Bühlmann (2007) JMLR"
date_ingested: 2026-10-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Methods Overview]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> foundational **constraint-based** approach to causal structure learning. It recovers the
> **CPDAG** of the true DAG by (1) removing edges via conditional independence (CI) tests
> with growing conditioning sets, (2) orienting v-structures from stored separating sets,
> and (3) propagating orientations via Meek's rules. Under faithfulness, acyclicity, and
> causal sufficiency, PC is **consistent** in the large-sample limit. Its worst-case complexity
> is exponential in the maximum node degree, but is polynomial for sparse graphs.

## Overview

Constraint-based methods take a *hypothesis-testing* view of structure learning: they run
statistical CI tests on the data, collect the *pattern of independencies*, and reconstruct
the equivalence class that would entail exactly that pattern under faithfulness.

The PC algorithm (named after **P**eter Spirtes and **C**lark Glymour) is the canonical
example. It is provably correct and much faster than exact search — especially under the
**sparse graph assumption** where the maximum number of parents per node, $q_{\max}$, is
small (bounded), because the skeleton phase only tests conditioning sets drawn from current
adjacency sets, not all subsets of $\{1,\ldots,d\}$.

## Main Content

### Assumptions

> [!definition] Assumptions of the PC Algorithm
> 1. **Causal Markov Condition:** The joint distribution $\mathbb{P}$ is Markov to the true DAG
>    $\mathcal{G}^*$ — see [[Markov Equivalence Classes and CPDAGs#^def-markov]].
> 2. **Faithfulness:** $\mathbb{P}$ is faithful to $\mathcal{G}^*$ — no CI relations hold by
>    structural cancellation — see [[Markov Equivalence Classes and CPDAGs#^def-faithfulness]].
> 3. **Causal Sufficiency:** All common causes of observed variables are also observed (no hidden
>    confounders). Violated → the FCI algorithm should be used instead.
> 4. **Correct CI decisions:** In the large-sample limit, the CI test correctly identifies all
>    (conditional) independencies. In finite samples, this is only approximately satisfied.
^def-assumptions

### Phase 1: Skeleton Recovery

> [!definition] Algorithm: PC Skeleton Phase (Spirtes et al. 2000, Ch. 5)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, CI test oracle, significance level $\alpha$.
>
> 1. Start with the **complete undirected graph** $\mathcal{H}$ on $d$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in the current graph:
>      - Search over all subsets $\mathbf{Z} \subseteq \mathrm{Adj}(X_i) \setminus \{X_j\}$
>        (or $\mathrm{Adj}(X_j) \setminus \{X_i\}$) of size $\ell$.
>      - If CI test accepts $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$:
>        - Remove edge $X_i - X_j$ from $\mathcal{H}$.
>        - Store the **separating set** $\mathrm{Sep}(i,j) \leftarrow \mathbf{Z}$.
>        - Break (move to next pair).
>    - Stop when $|\mathrm{Adj}(X_i)| \leq \ell$ for all remaining nodes $X_i$.
> 3. **Output:** Skeleton $\mathcal{H}$ (undirected graph) and separating sets.
>
> **Key efficiency trick:** only conditioning sets from the *current* adjacency are tested.
> This makes complexity polynomial in $n$ and $d$ for sparse graphs.
^def-skeleton

### Phase 2: V-Structure Orientation

> [!definition] Algorithm: PC V-Structure Phase
> For every **unshielded triple** $X_i - X_k - X_j$ where $X_i$ and $X_j$ are not adjacent:
>
> - If $X_k \notin \mathrm{Sep}(i,j)$: orient as v-structure $X_i \to X_k \leftarrow X_j$.
>
> **Rationale:** Under faithfulness, $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ holds iff $X_k$
> d-separates them. If $X_k$ is *not* in the separating set, then conditioning on $X_k$
> opens the path (collider logic), so $X_k$ must be a collider.
^def-vstructure

### Phase 3: Meek Rule Propagation

Apply [[Markov Equivalence Classes and CPDAGs#^thm-meek-rules]] (Meek 1995) repeatedly
until no further orientations can be deduced. This completes the CPDAG.

### Output

The PC algorithm returns a **CPDAG** — see [[Markov Equivalence Classes and CPDAGs#^def-cpdag]].
Directed edges in the CPDAG are **compelled** (orientation is the same in all equivalent DAGs).
Undirected edges mark orientations that are unidentifiable from observational data alone.

### Statistical Properties

> [!theorem] Consistency of PC (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Under the Causal Markov Condition, Faithfulness, and Causal Sufficiency, the PC algorithm
> with an oracle CI test outputs the true CPDAG of $\mathcal{G}^*$.
>
> **High-dimensional extension (Kalisch & Bühlmann 2007):** With partial correlations and
> a Gaussian model, PC with the Fisher-z CI test is consistent even when $d \gg n$, provided
> the maximum degree $q_{\max} = o\!\left(\sqrt{n/\log d}\right)$. This requires a sequential
> Bonferroni-style significance adjustment.
^thm-consistency

### Complexity

| Regime | Complexity |
|--------|-----------|
| Worst case | Exponential in $d$ — conditioning sets can reach size $d-2$ |
| Sparse graphs ($q_{\max}$ bounded) | $O(d^{q_{\max}+2})$ — polynomial in $d$ for fixed degree |
| Gaussian CI test | $O(d^{q_{\max}+2} \cdot n)$ — each test is $O(n)$ |

In practice, the sparse-graph assumption is essential. PC is efficient on biological networks,
market graphs, and other real-world sparse DAGs.

### The Order-Dependence Problem

A subtle issue: the PC skeleton phase processes variable *pairs in a fixed order*, which
can yield different results on finite samples because once an edge is removed, it affects
which conditioning sets are tried for subsequent pairs. The **PC-stable** variant (Colombo &
Maathuis 2014) addresses this by separating the skeleton and separating-set steps into order-
independent passes.

### Conditional Independence Tests

The choice of CI test determines what distributional assumptions are required:

| Data type | Common test | Notes |
|-----------|------------|-------|
| Continuous Gaussian | Fisher-z (partial correlation) | Fast; $H_0: \rho_{ij|\mathbf{Z}}=0$ |
| Continuous non-Gaussian | KCI (kernel CI test; Zhang et al. 2012) | Nonparametric; slower |
| Discrete / categorical | $\chi^2$ or $G$-test | Tabular data |
| Mixed | RCIT (randomized CI test) | Flexible |

The **causal-learn** Python package (Zheng et al. 2024) and **pcalg** R package provide
all standard CI tests alongside the PC algorithm.

## Examples

> [!example] Example: PC on 4 Variables
> Variables: $\{X_1, X_2, X_3, X_4\}$. Suppose the true DAG is $X_1 \to X_2 \to X_4$
> and $X_3 \to X_2$ (so $X_2$ is a collider between $X_1$ and $X_3$ for paths through $X_2$).
>
> **Skeleton phase** ($\ell=0$): test unconditional independence. $X_1 \perp\!\!\!\perp X_3$ (no path)?
> If yes, remove $X_1 - X_3$. Continue removing edges with empty conditioning set.
>
> **Skeleton phase** ($\ell=1$): test $X_1 \perp\!\!\!\perp X_4 \mid X_2$? Since $X_2$ blocks
> the path $X_1 \to X_2 \to X_4$, yes. Remove $X_1 - X_4$ conditioned on $X_2$.
>
> **V-structure phase**: unshielded triple $X_1 - X_2 - X_3$, with $X_1 \perp\!\!\!\perp X_3$.
> $X_2 \notin \mathrm{Sep}(1,3)$ (empty set was the separator), so orient $X_1 \to X_2 \leftarrow X_3$.
>
> **Meek rules**: propagate $X_2 \to X_4$ (R1: acyclicity).

## Connections

- **Score-based alternative:** [[Greedy Equivalence Search (GES)]] achieves the same consistency
  result but via score optimization — avoids CI testing, which is sensitive to distributional
  assumptions in finite samples.
- **Causal sufficiency violated:** the **FCI** (Fast Causal Inference) algorithm relaxes
  the causal sufficiency assumption, outputting a PAG (Partial Ancestral Graph) instead of CPDAG.
- **Identifiability beyond CPDAG:** [[NOTEARS - Overview]] plus non-Gaussian noise (LiNGAM)
  achieves full DAG identification without the faithfulness assumption.
- **Background knowledge:** Prior knowledge of edge presence/absence or orientation can be
  incorporated into the orientation phase to produce additional directed edges.

## Software

| Package | Language | Functions |
|---------|----------|----------|
| **pcalg** | R | `pc()`, `skeleton()`, `udag2cpdag()` |
| **causal-learn** | Python | `pc()` from `causallearn.search.ConstraintBased` |
| **Tetrad** | Java (GUI) | Full visual interface, multiple CI tests |

**Usage example (causal-learn):**
```python
from causallearn.search.ConstraintBased.PC import pc
from causallearn.utils.cit import fisherz

cg = pc(data, alpha=0.05, indep_test=fisherz)
# cg.G is the CPDAG
```

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG target and Meek rules
- [[Greedy Equivalence Search (GES)]] — score-based alternative achieving the same consistency
- [[DAG Structure Learning Problem]] — formal problem setup and NP-hardness
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, backdoor criterion)
- [[Causal Discovery Methods Overview]] — PC vs GES vs NOTEARS comparison
- [[BN Construction Methods Comparison]] — broader context of BN construction approaches
