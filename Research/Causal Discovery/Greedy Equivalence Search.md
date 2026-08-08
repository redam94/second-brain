---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/sources-constraint-and-score-based-causal-discovery.md]]"
source_location: "Chickering (2002), JMLR 3:507–554"
date_ingested: 2026-08-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "score-based structure learning"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering, 2002) is the canonical **score-based** causal structure learning
> algorithm. It performs a two-phase greedy search *directly in the space of Markov
> equivalence classes* (CPDAGs): a **Forward Equivalence Search (FES)** phase that greedily
> inserts edges, followed by a **Backward Equivalence Search (BES)** phase that greedily
> removes them. The score used (typically BIC) decomposes over nodes, making each greedy
> step computable in polynomial time. Chickering's key theorem proves that, for large
> enough samples, GES provably recovers the true CPDAG — making GES **asymptotically optimal**
> among score-based methods under faithfulness and the Causal Markov condition.

## Overview

The score-based paradigm asks: which CPDAG (Markov equivalence class) maximizes a statistical
score? GES solves this by searching the combinatorial CPDAG space greedily, but with a
crucial guarantee: the two-phase structure of FES followed by BES ensures the algorithm
reaches a global score maximum that corresponds to the true CPDAG asymptotically.

The central innovation is Chickering's proof of the **Meek Conjecture** (renamed the GES
Operators Theorem): every pair of MECs adjacent in the search graph can be reached via a
single Insert, Delete, or Turn operator applied to a CPDAG — and these operators are
efficiently computable. This enables a polynomial-time greedy search that nonetheless
provably finds the true CPDAG in the large-sample limit.

## Main Content

### Decomposable Scoring Functions

GES requires a **decomposable score** $Q$ that factors over individual variables:

> [!definition] Definition: Decomposable Score (Chickering, 2002)
> A score $Q(\mathsf{G}, \mathbf{X})$ is **decomposable** if it factors as
> $$Q(\mathsf{G}, \mathbf{X}) = \sum_{i=1}^d Q_i(X_i, \text{Pa}_\mathsf{G}(X_i), \mathbf{X})$$
> where each local score $Q_i$ depends only on $X_i$ and its parents in DAG $\mathsf{G}$.
> Decomposability means the effect of adding or removing a single edge on $Q$ can be
> computed locally from a single node's score change.
^def-decomposable-score

**BIC Score** (Schwarz, 1978; standard choice for GES):

> [!definition] Definition: BIC Score for a DAG
> For DAG $\mathsf{G}$ and data $\mathbf{X}$ with $n$ observations:
> $$\text{BIC}(\mathsf{G}, \mathbf{X}) = \sum_{i=1}^d \left[\log \hat{P}(X_i \mid \text{Pa}(X_i); \hat{\theta}_i) - \frac{k_i}{2}\log n\right]$$
> where $\hat{\theta}_i$ is the MLE of the local parameters given parents $\text{Pa}(X_i)$,
> and $k_i = |\text{Pa}(X_i)| + 1$ (for linear Gaussian models) is the local parameter count.
> For Gaussian SEMs, the local log-likelihood is:
> $$\log \hat{P}(X_i \mid \text{Pa}(X_i); \hat{\theta}_i) = -\frac{n}{2}\log\hat{\sigma}_i^2 + C$$
> where $\hat{\sigma}_i^2$ is the residual variance of $X_i$ on its parents.
^def-bic-score

> [!note] BDe Score (for discrete data)
> The **Bayesian Dirichlet equivalent (BDe) score** (Heckerman et al., 1995) is the standard
> decomposable score for discrete variables. It integrates out the parameters under a
> Dirichlet prior, giving a closed-form marginal likelihood. Like BIC, it is consistent and
> decomposable. BDe satisfies score equivalence: Markov-equivalent DAGs receive the same score.

**Score equivalence** is crucial for GES: since all DAGs in the same MEC receive the same
BIC/BDe score, the score is well-defined on MECs, and GES can search MECs directly without
ambiguity about which DAG representative to evaluate.

### GES Operators

GES searches the space of CPDAGs using three operators due to Chickering:

> [!definition] Definition: Insert, Delete, Turn Operators (Chickering, 2002)
>
> Let $\mathcal{C}$ be a CPDAG. The three operators are:
>
> **Insert$(X, Y, T)$**: Add edge $X \to Y$ to $\mathcal{C}$, where:
> - $X$ and $Y$ are non-adjacent in $\mathcal{C}$
> - $T \subseteq \text{Ne}_\mathcal{C}(Y) \setminus \text{Adj}_\mathcal{C}(X)$ is a set of
>   **undirected** neighbors of $Y$ not adjacent to $X$
> - $T \cup \{X\}$ forms a clique in $\mathcal{C}$
> - $T$ is a clique-separator between $X$ and $Y$ in $\mathcal{C}[Ne_\mathcal{C}(Y) \cup \{Y\}]$
>
> **Delete$(X, Y, H)$**: Remove edge $X - Y$ (or $X \to Y$) from $\mathcal{C}$, where:
> - $X$ and $Y$ are adjacent in $\mathcal{C}$
> - $H \subseteq \text{Ne}_\mathcal{C}(Y) \cap \text{Adj}_\mathcal{C}(X)$ is a subset of
>   common neighbors of $X$ and $Y$
> - $H \cup \{X\}$ forms a clique
>
> **Turn$(X, Y, C)$**: Turn edge $X \to Y$ into $X \leftarrow Y$, where:
> - $X$ and $Y$ are adjacent in $\mathcal{C}$ with $X \to Y$ directed
> - $C \subseteq \text{Ne}_\mathcal{C}(X) \setminus \text{Adj}_\mathcal{C}(Y)$
> - $C \cup \{Y\}$ forms a clique
>
> Each operator transforms $\mathcal{C}$ into a new valid CPDAG $\mathcal{C}'$.
^def-ges-operators

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Algorithm: FES Phase
> **Input**: Empty CPDAG $\mathcal{C}_0 = \emptyset$, decomposable score $Q$, data $\mathbf{X}$.
> **Output**: CPDAG $\hat{\mathcal{C}}_\text{FES}$.
>
> 1. Initialize $\mathcal{C} \leftarrow \mathcal{C}_0$ (empty graph).
> 2. **Repeat**:
>    - Find the **Insert$(X, Y, T)$** operator that maximally increases $Q(\mathcal{C}, \mathbf{X})$
>    - If $\Delta Q = Q(\text{Insert}(\mathcal{C})) - Q(\mathcal{C}) > 0$: apply Insert.
>    - Else: break.
> 3. Return $\hat{\mathcal{C}}_\text{FES} = \mathcal{C}$.
^def-fes

FES starts from the empty graph and greedily adds edges that improve the score. It terminates
at a local maximum of $Q$ in the Insert-operator neighborhood — which Chickering proves
corresponds to the true MEC in the large-sample limit.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Algorithm: BES Phase
> **Input**: CPDAG $\hat{\mathcal{C}}_\text{FES}$, decomposable score $Q$, data $\mathbf{X}$.
> **Output**: Final CPDAG $\hat{\mathcal{C}}$.
>
> 1. Initialize $\mathcal{C} \leftarrow \hat{\mathcal{C}}_\text{FES}$.
> 2. **Repeat**:
>    - Find the **Delete$(X, Y, H)$** operator that maximally increases $Q(\mathcal{C}, \mathbf{X})$.
>    - If $\Delta Q > 0$: apply Delete.
>    - Else: break.
> 3. Return $\hat{\mathcal{C}}$.
^def-bes

> [!note] Why do we need BES after FES?
> In finite samples, FES can overshoot — adding spurious edges because the BIC penalty is
> not yet strong enough. BES prunes these edges. In the asymptotic limit ($n \to \infty$),
> BES makes no further changes: the FES output already equals the true CPDAG. But for
> finite $n$, BES is essential for correctness.

### The GES Consistency Theorem (Chickering, 2002)

This is the central theoretical result justifying GES:

> [!theorem] Theorem: GES Consistency (Chickering, 2002)
> Let $G^*$ be the true DAG over $d$ variables. Assume:
> 1. **Causal Markov condition**: the data-generating distribution $P$ is Markov w.r.t. $G^*$.
> 2. **Faithfulness**: $P$ is faithful to $G^*$.
> 3. **Causal sufficiency**: no hidden common causes.
> 4. **Consistent score**: the scoring function satisfies score equivalence and is
>    consistent (e.g., BIC: the true model's score dominates all others asymptotically).
>
> Then the CPDAG $\hat{\mathcal{C}}$ returned by GES satisfies:
> $$P(\hat{\mathcal{C}} = \mathcal{C}^*) \to 1 \quad \text{as} \quad n \to \infty,$$
> where $\mathcal{C}^*$ is the CPDAG of $G^*$.
^thm-ges-consistency

**Key to the proof**: Chickering proves the **Meek Conjecture** (now a theorem): if $H$
is an independence map of $G$ (i.e., every d-separation in $H$ holds in $G$), then there
exists a sequence of edge additions and covered edge reversals in $G$ such that $H$
remains an independence map at each step and eventually $G = H$. This establishes that
the GES search graph is connected — so the greedy search cannot get trapped in a region
disconnected from the true CPDAG.

### Score Change Formulae

Because the score is decomposable, the score change from an operator can be computed locally:

> [!theorem] Score Change: Insert Operator
> For Insert$(X, Y, T)$, the score change is:
> $$\Delta Q_\text{insert}(X, Y, T) = Q_Y(X_Y, \text{Pa}(Y) \cup T \cup \{X\}) - Q_Y(X_Y, \text{Pa}(Y) \cup T)$$
> where $\text{Pa}(Y)$ is the current parent set of $Y$ in any DAG in the current MEC.
> Only the local score of $Y$ changes (decomposability).
^thm-score-change-insert

This local score-change computation is what makes GES polynomial per step: no need to
re-evaluate the full graph score.

### Computational Complexity

| Phase | Operators to evaluate | Per-operator cost | Total |
|-------|--------------------|------------------|-------|
| FES | $O(d^2 \cdot 2^q)$ Insert operators | $O(d)$ per update | $O(d^3 \cdot 2^q)$ |
| BES | $O(d^2 \cdot 2^q)$ Delete operators | $O(d)$ per update | $O(d^3 \cdot 2^q)$ |

In sparse graphs (max degree $q$ small), GES is polynomial. The fast GES variant (fGES,
Ramsey et al., 2017) uses priority queues and reuses score computations, achieving
$O(d^2 \log d)$ amortized complexity in sparse graphs.

## Comparison: PC vs. GES vs. NOTEARS

| Property | PC | GES | NOTEARS |
|----------|----|----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Input** | CI tests | Decomposable score | Data (LS loss) |
| **Search space** | CI graph → CPDAG | CPDAG space | $\mathbb{R}^{d \times d}$ |
| **Output** | CPDAG | CPDAG | Weighted DAG |
| **Assumptions** | CMC + Faithfulness + Sufficiency | CMC + Faithfulness + Sufficiency | Identifiability via non-Gaussianity or model class |
| **Consistency** | Yes (asymptotic) | Yes (asymptotic) | Finds stationary points (not global optimum) |
| **Dense graphs** | Exponential CI tests | Polynomial | Polynomial |
| **Hidden confounders** | Via FCI extension | Via RFCI extension | Not handled |
| **Implementation** | Simple; standard CI tests | Moderate; operator validation | Minimal; numerical solver |

## Practical Implementation

**Available software**:
- `causal-learn` (Python, `lingam` / `pcalg` package): `from causallearn.search.ScoreBased.GES import ges`
- `pcalg` (R): `ges(suffStat, score, ...)` implements Chickering (2002) + Hauser & Bühlmann (2012) extensions
- `cdt` (Python, Causal Discovery Toolbox): `CDT.causality.graph.GES`

**Hyper-parameter**: only the **score function** and its hyperparameters (e.g., BIC penalty factor $\lambda$ — default $\frac{1}{2}\log n$ but can be tuned). Higher penalty → sparser graph → fewer false edges, more missed edges.

## Connections

- **PC algorithm** (→ [[PC Algorithm]]): the constraint-based counterpart; asymptotically
  equivalent under faithfulness, but different finite-sample behavior. PC is faster for very
  sparse graphs; GES is more robust to CI test errors.
- **CPDAGs** (→ [[Markov Equivalence and CPDAGs]]): GES's search space; each GES step
  moves from one valid CPDAG to an adjacent one via an operator.
- **NOTEARS** (→ [[NOTEARS - Overview]]): score-based but continuous; operates on a weighted
  adjacency matrix rather than CPDAG space. NOTEARS does not guarantee finding the true CPDAG.
- **DAG Structure Learning Problem** (→ [[DAG Structure Learning Problem]]): the landscape
  of methods, where GES is classified as "local/approximate search" (approximated in the
  NOTEARS paper's table, but this is a misnomer — GES is actually asymptotically exact).
- **BIC and model selection** (→ [[Overfitting and Information Criteria]]): the BIC score
  GES maximizes is the same criterion used for model selection in regression and time series.

## See Also
- [[PC Algorithm]] — constraint-based alternative; different mechanism, same asymptotic target
- [[Markov Equivalence and CPDAGs]] — the CPDAG space that GES searches
- [[DAG Structure Learning Problem]] — broader landscape of structure-learning methods
- [[NOTEARS - Overview]] — continuous-optimization alternative to GES
- [[NOTEARS Experiments]] — empirical comparison with GES (and FGS/GES variants)
- [[Overfitting and Information Criteria]] — BIC score in other contexts
