---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02b-GES-citation.md]]"
source_location: "Chickering 2002, JMLR 3, §1–5; Hauser & Bühlmann 2012 (Turning phase)"
date_ingested: 2026-09-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Methods Overview]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "GES causal discovery"
  - "score-based DAG learning"
---

# GES Algorithm

> [!summary]
> **GES (Greedy Equivalence Search)** (Chickering 2002, JMLR) is the canonical **score-based**
> algorithm for causal structure learning. It searches over the space of **Markov equivalence
> classes** (CPDAGs) in two phases — forward edge-addition (FES) and backward edge-deletion (BES)
> — greedily maximizing a **decomposable, score-equivalent** scoring criterion (BIC / BDeu).
> The central theoretical contribution is the **proof of the Meek conjecture**, which implies
> GES correctly identifies the CPDAG of the data-generating distribution in polynomial expected
> time, given faithfulness and infinite data.

## Overview

GES is score-based rather than constraint-based: instead of testing conditional independences,
it assigns a score to each equivalence class (CPDAG) and searches greedily for the highest-scoring
class. The key insight enabling GES is that the search space of CPDAGs can be navigated
efficiently using operators that add or delete *one edge at a time* from the equivalence class —
because the Meek conjecture guarantees these operators connect all CPDAGs in a connected graph.

GES is implemented in the `pcalg` R package (function `ges`), the `py-causal` Python package,
and the `juangamella/ges` Python package.

## Assumptions

> [!definition] Definition: GES assumptions
>
> 1. **Faithfulness** (same as PC — see [[PC Algorithm]]).
> 2. **Causal Markov Condition (CMC).**
> 3. **Causal Sufficiency** (no latent confounders).
> 4. **Score-equivalence**: all DAGs in the same Markov equivalence class receive the same score.
>    BIC and BDeu both satisfy this.
> 5. **Local decomposability**: the score factorizes as
>    $Q(\mathcal{G}) = \sum_{i=1}^{p} q(X_i, \mathsf{pa}_{\mathcal{G}}(X_i))$
>    where each $q$ depends only on $X_i$ and its parents. This enables local updates when
>    a single edge is added/removed.
^def-ges-assumptions

## Main Content

### The key theoretical result: proof of the Meek conjecture

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> Let $\mathcal{G}$ and $\mathcal{H}$ be two DAGs on the same node set $\mathsf{V}$. Suppose
> $\mathcal{H}$ is an **I-map** of $\mathcal{G}$ (every d-separation in $\mathcal{H}$ also
> holds in $\mathcal{G}$, i.e. $\mathcal{H}$ "over-represents" the independences). Then there
> exists a finite sequence of **covered edge reversals** in $\mathcal{G}$:
> $$\mathcal{G} = \mathcal{G}_0 \to \mathcal{G}_1 \to \cdots \to \mathcal{G}_k = \mathcal{H}$$
> such that each $\mathcal{G}_l$ is an I-map of $\mathcal{G}$, and interspersed with at most
> one **edge addition** per step.
>
> **Corollary:** The space of CPDAGs is **connected** under the Insert and Delete operators
> (defined below), implying GES can reach the optimal CPDAG from any starting point.
^thm-meek-conjecture

> [!definition] Definition: Covered edge
> An edge $i \to j$ in a DAG $\mathcal{G}$ is **covered** if $\mathsf{pa}(j) = \mathsf{pa}(i) \cup \{i\}$.
> Reversing a covered edge (to $j \to i$) produces a Markov-equivalent DAG.
^def-covered-edge

### Score functions

> [!definition] Definition: BIC score for Gaussian data
> For a Gaussian linear SEM with $p$ nodes and $n$ observations:
> $$\text{BIC}(\mathcal{G}) = \sum_{i=1}^{p} \text{BIC}_i = \sum_{i=1}^{p}
>   \left[ -\frac{n}{2} \log\!\hat{\sigma}^2_{i|\mathsf{pa}(i)} - \frac{|\mathsf{pa}(i)|+1}{2}\log n \right]$$
> where $\hat{\sigma}^2_{i|\mathsf{pa}(i)}$ is the residual variance from regressing $X_i$ on
> $\mathsf{pa}(i)$. The BIC penalizes model complexity (number of parents) and rewards
> fit (low residual variance).
^def-bic-score

> [!definition] Definition: BDeu score for discrete data
> For discrete (categorical) data with a Dirichlet prior and equivalent sample size $N_0$:
> $$\text{BDeu}(\mathcal{G}) = \sum_{i=1}^{p} \sum_{j \in \text{configs of } \mathsf{pa}(i)}
>   \left[\log\frac{\Gamma(N_0 / r_{ij})}{\Gamma(N_0 / r_{ij} + N_{ij})} +
>   \sum_{k=1}^{r_i}\log\frac{\Gamma(N_0 / (r_i r_{ij}) + N_{ijk})}{\Gamma(N_0 / (r_i r_{ij}))}\right]$$
> where $r_i$ = number of levels of $X_i$, $N_{ij}$ = count of rows with $\mathsf{pa}(i) = j$,
> $N_{ijk}$ = count with $\mathsf{pa}(i)=j$ and $X_i=k$. BDeu is score-equivalent and
> locally decomposable.
^def-bdeu-score

### The three GES operators

GES navigates CPDAG space using three operators. Each operator modifies the current
CPDAG by inserting or deleting a single edge:

> [!definition] Definition: Insert operator $\text{Insert}(X, Y, T)$
> Given a CPDAG $\mathcal{C}$ and nodes $X, Y$ with $X \not\sim Y$ in $\mathcal{C}$,
> and $T \subseteq \mathsf{adj}(Y) \setminus \mathsf{adj}(X)$ (a set of nodes adjacent to $Y$
> but not $X$), the **Insert** operator:
> 1. Adds a directed edge $X \to Y$ to every DAG in the equivalence class represented by $\mathcal{C}$.
> 2. Orients edges in $T$ toward $Y$ (turning them from $- Y$ to $\to Y$).
> 3. Returns the CPDAG of the resulting set of DAGs.
>
> The **score change** is:
> $\Delta\text{Insert}(X, Y, T) = q(Y, \mathsf{pa}(Y) \cup T \cup \{X\}) - q(Y, \mathsf{pa}(Y) \cup T)$.
^def-insert

> [!definition] Definition: Delete operator $\text{Delete}(X, Y, H)$
> Given a CPDAG $\mathcal{C}$ with an edge $X - Y$ or $X \to Y$, and
> $H \subseteq \mathsf{adj}(X) \cap \mathsf{adj}(Y)$ (nodes adjacent to both $X$ and $Y$),
> the **Delete** operator:
> 1. Removes the edge between $X$ and $Y$.
> 2. Orients edges from $H$ toward $X$ (turning $H - X$ into $H \to X$).
> 3. Returns the CPDAG.
>
> The score change is:
> $\Delta\text{Delete}(X, Y, H) = q(Y, \mathsf{pa}(Y) \setminus (\{X\} \cup H)) - q(Y, \mathsf{pa}(Y))$.
^def-delete

### GES algorithm (two phases)

> [!definition] Definition: GES algorithm (Chickering 2002)
>
> **Input:** Data $\mathbf{X}$, decomposable score $Q$.
>
> **Forward Equivalence Search (FES):**
> Initialize $\mathcal{C}^0$ = empty CPDAG (no edges).
> **Repeat** until no improving Insert exists:
> &nbsp;&nbsp;Find the Insert$(X, Y, T)$ with the greatest positive $\Delta\text{Insert}$
> &nbsp;&nbsp;Apply it: $\mathcal{C}^{k+1} \leftarrow \text{Insert}(\mathcal{C}^k, X, Y, T)$
> **Output:** $\mathcal{C}^{\text{FES}}$.
>
> **Backward Equivalence Search (BES):**
> Initialize $\mathcal{C}^0 = \mathcal{C}^{\text{FES}}$.
> **Repeat** until no improving Delete exists:
> &nbsp;&nbsp;Find the Delete$(X, Y, H)$ with the greatest positive $\Delta\text{Delete}$
> &nbsp;&nbsp;Apply it: $\mathcal{C}^{k+1} \leftarrow \text{Delete}(\mathcal{C}^k, X, Y, H)$
> **Output:** CPDAG $\mathcal{C}^*$.
^def-ges-algorithm

The intuition for the two phases:
- **FES** builds up a CPDAG that is an I-map of the true graph (too many edges; over-represents
  independences).
- **BES** then prunes it down to the perfect map (the true CPDAG).

The Meek conjecture guarantees the FES phase can reach the true CPDAG's equivalence class from
the empty graph via a sequence of Insert operators, and BES can then remove superfluous edges.

### Correctness and complexity

> [!theorem] Correctness of GES (Chickering 2002, Theorem 15 + Corollary)
> Under CMC, Faithfulness, Causal Sufficiency, and an asymptotically consistent score (e.g.
> BIC with $n \to \infty$), GES returns the CPDAG of the true data-generating DAG.
>
> **Complexity:** For bounded in-degree $q$, each FES/BES step examines at most $O(p^2 \cdot 2^q)$
> operator applications. Total time is polynomial in $p$ for fixed $q$.
^thm-ges-correctness

### The Turning phase (Hauser & Bühlmann 2012)

Hauser & Bühlmann (2012) proved that a **third phase** — greedy covered edge reversals —
can be added between BES and the output, increasing GES's finite-sample performance. This
is analogous to the "turning" moves that naturally arise in the Meek conjecture proof.
Modern implementations (e.g. FGES — Fast GES — Ramsey et al. 2017) include this phase.

## Comparison: PC vs GES vs NOTEARS

| Property | [[PC Algorithm]] | GES | [[NOTEARS - Overview\|NOTEARS]] |
|----------|----------------|-----|---------|
| Method family | Constraint-based | Score-based | Continuous optimization |
| Core operation | CI tests | Score evaluation | Gradient + Lagrange multiplier |
| Output | CPDAG | CPDAG | DAG (one per run) |
| Distributional assumption | Flexible (any CI test) | Specific (BIC/BDeu) | LS loss (linear SEM) |
| Faithfulness needed | Yes | Yes | No (statistical guarantees) |
| Latent confounders | No (use FCI) | No | No |
| High-dimensional | Yes (sparse; Kalisch 2007) | Slower for dense $p$ | Yes (regularized) |
| Implementation | `pcalg`, `causal-learn` | `pcalg`, `py-causal`, `ges` | Python (50 lines) |

## Connections

- **Meek conjecture link**: the proof in Chickering (2002) uses a constructive argument
  showing that any two DAGs in the same Markov equivalence class are reachable from each
  other by covered edge reversals and single edge insertions, matching the GES operators.
- **[[Markov Equivalence Classes and CPDAGs]]**: GES operates *in the space of equivalence
  classes*, which is strictly smaller than the DAG space, making the search more efficient.
- **NOTEARS comparison**: [[NOTEARS - Overview]] benchmarks against GES (FGS) in
  [[NOTEARS Experiments]], showing NOTEARS matches or outperforms GES on dense/large graphs
  because it avoids the exponential cost of enumerating operator applications.
- **FGES (Ramsey et al. 2017)**: scales GES to thousands of variables using sparse
  regression and the adjacency-faithfulness assumption.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space GES navigates
- [[PC Algorithm]] — constraint-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[DAG Structure Learning Problem]] — score formulation
- [[Causal Structure Learning - Methods Overview]] — family comparison
