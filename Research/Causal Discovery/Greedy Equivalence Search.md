---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-ges-ref.md]]"
source_location: "Chickering (2002), JMLR 3:507-554, full paper"
date_ingested: 2026-11-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "fGES"
  - "FES-BES"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for learning a DAG's [[Markov Equivalence and CPDAGs|CPDAG]] from i.i.d. data.
> It searches directly over Markov equivalence-class space using two greedy phases:
> (1) **FES** (Forward Equivalence Search): add edge operators that maximize a decomposable
> score (typically BIC); (2) **BES** (Backward Equivalence Search): delete edge operators
> that further maximize the score. Under the Markov and faithfulness assumptions with a
> consistent score, GES is **provably correct in the large-sample limit** — it recovers
> the true CPDAG. Its key advantage over [[PC Algorithm]] is that the score directly
> captures model fit, avoiding the need for a CI test threshold.

## Overview

The [[PC Algorithm]] recovers DAG structure by testing conditional independence constraints.
GES takes the complementary approach: it **optimizes a score** (typically penalized
log-likelihood) over the space of Markov equivalence classes. The key theoretical contribution
of Chickering (2002) is showing:

1. **Meek Conjecture (proved)**: the graph of covered-edge reversals between equivalence
   classes is connected and structured enough for greedy search to work.
2. **Local scoring**: adding or removing a single edge changes the score by a term that
   depends only on the **local family** (node + its parents) of one variable — enabling
   scalable search.
3. **Two-phase completeness**: the FES + BES procedure finds the optimal CPDAG in the
   large-sample limit.

GES is implemented in the R package **pcalg** (Kalisch et al. 2012) and Python packages
**causal-learn** and **gcastle**. The variant **fGES** (Fast GES; Ramsey et al. 2017)
uses preliminary CI tests to prune the search space and runs in $O(d^2 \log d)$ time.

## Main Content

### Score functions

GES requires a **decomposable, locally computable** score $Q$. A score is locally computable
if for any DAG $\mathcal{G}$:
$$Q(\mathcal{G}) = \sum_{j=1}^{d} Q_j\!\left(X_j, \mathrm{Pa}_{\mathcal{G}}(X_j)\right),$$
i.e., the total score decomposes into a sum of local family scores. This decomposability is
what allows adding or deleting one edge to be evaluated by recomputing only one term.

> [!definition] Definition: BIC score for GES
>
> For Gaussian data with $n$ observations, the **BIC (Bayesian Information Criterion) score** for
> variable $X_j$ given parent set $\mathbf{Pa}_j$ is:
> $$Q_j(X_j, \mathbf{Pa}_j) = \hat{\ell}_j(\mathbf{Pa}_j) - \frac{|\mathbf{Pa}_j| + 1}{2}\log n,$$
> where $\hat{\ell}_j$ is the maximized log-likelihood of the linear regression $X_j \sim \mathbf{Pa}_j$.
>
> For linear Gaussian SEMs, $\hat{\ell}_j \propto -n \log \hat{\sigma}_j^2$ where $\hat{\sigma}_j^2$
> is the residual variance of regressing $X_j$ on $\mathbf{Pa}_j$. The penalty
> $-\frac{|\mathbf{Pa}_j|+1}{2}\log n$ penalizes model complexity (number of parents + intercept).
>
> The total BIC score is $Q(\mathcal{G}) = \sum_j Q_j$, maximized jointly over structure
> and parameters.
^def-bic-score

For discrete data, common alternatives:
- **BDeu** (Bayesian Dirichlet uniform): proper Bayesian score with Dirichlet priors on CPTs
- **BGe** (Bayesian Gaussian equivalent): proper Bayesian score for Gaussian data with
  Normal-Wishart conjugate prior (Geiger & Heckerman 1994)

### Phase 1: Forward Equivalence Search (FES)

**Input:** Empty graph $\mathcal{C}_0$ (which represents the DAG with no edges).  
**Goal:** Greedily add edges in CPDAG space to maximize the score.

> [!theorem] Algorithm: FES phase (Chickering 2002, Algorithm 1)
>
> **Initialization:** $\mathcal{C} \leftarrow$ empty CPDAG (no edges).
>
> **Repeat** until no improving operator exists:
> 1. Consider all **Insert$(X, Y, \mathbf{T})$** operators: add directed edge $X \to Y$ where
>    $\mathbf{T} \subseteq \mathrm{Adj}(X, \mathcal{C}) \setminus \mathrm{Adj}(Y, \mathcal{C})$
>    is a subset of X's neighbors that are not Y's neighbors (turns them into parents of Y).
> 2. For each valid Insert, compute the **score change**:
>    $$\Delta Q = Q_Y(X, \mathbf{T} \cup \mathbf{Pa}(Y)) - Q_Y(\mathbf{Pa}(Y))$$
>    (only the local score for $Y$ changes, since only $Y$'s parent set changes).
> 3. Apply the Insert operator with the **largest** positive $\Delta Q$.
> 4. Recompute the CPDAG of the resulting DAG using Meek's rules.
>
> **Output:** CPDAG $\mathcal{C}_{\mathrm{FES}}$.
^alg-fes

An Insert operator is **valid** (maintains a DAG) only if the graph formed after the insertion
is still a DAG. The validity check exploits the CPDAG structure to determine this efficiently.

### Phase 2: Backward Equivalence Search (BES)

**Input:** CPDAG $\mathcal{C}_{\mathrm{FES}}$ from the FES phase.  
**Goal:** Greedily delete edges in CPDAG space to further maximize the score (pruning
overfitting from finite samples).

> [!theorem] Algorithm: BES phase (Chickering 2002, Algorithm 2)
>
> **Initialization:** $\mathcal{C} \leftarrow \mathcal{C}_{\mathrm{FES}}$.
>
> **Repeat** until no improving operator exists:
> 1. Consider all **Delete$(X, Y, \mathbf{H})$** operators: remove edge $X - Y$ or $X \to Y$,
>    where $\mathbf{H} \subseteq \mathrm{Adj}(X, \mathcal{C}) \cap \mathrm{Adj}(Y, \mathcal{C})$
>    is a subset of common neighbors (turned into non-parents of $Y$).
> 2. For each valid Delete, compute the **score change**:
>    $$\Delta Q = Q_Y(\mathbf{Pa}(Y) \setminus (\{X\} \cup \mathbf{H})) - Q_Y(\mathbf{Pa}(Y))$$
> 3. Apply the Delete operator with the **largest** positive $\Delta Q$.
> 4. Recompute the CPDAG.
>
> **Output:** Final CPDAG $\hat{\mathcal{C}}$.
^alg-bes

The BES phase is necessary because FES can overshoot in finite samples: it may add more
edges than present in the true graph. BES prunes spurious edges. In the large-sample limit,
FES already returns the correct skeleton and BES makes no deletions.

### Consistency theorem

> [!theorem] Theorem: GES consistency (Chickering 2002, Thm. 15)
>
> Let data be generated i.i.d. from a distribution $P$ that is **Markov and faithful** to
> a DAG $\mathcal{G}^*$ with CPDAG $\mathcal{C}^*$. Use a **consistent score** (e.g., BIC,
> BGe) such that $Q(\mathcal{G}) \geq Q(\mathcal{H})$ in expectation iff $\mathcal{G}$ has
> a better-fitting Markov equivalence class. Then as $n \to \infty$:
>
> $$\Pr\!\left(\hat{\mathcal{C}} = \mathcal{C}^*\right) \to 1.$$
>
> GES returns the unique CPDAG of $\mathcal{G}^*$ with probability approaching 1.
^thm-ges-consistency

The proof proceeds in two parts:
- **FES consistency**: in the large-sample limit, every Insert operator adds an edge if and
  only if it is in the true skeleton (the score identifies true parents). By the Meek Conjecture,
  the FES phase reaches $\mathcal{C}^*$.
- **BES consistency**: the BES phase makes no deletions since all retained edges are in the
  true skeleton.

### The Meek Conjecture (proved by Chickering)

A central lemma underlying GES consistency is the **Meek Conjecture**:

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Thm. 2)
>
> Let $\mathcal{G}_1$ and $\mathcal{G}_2$ be two DAGs such that $\mathcal{G}_1$ is an I-map
> of $\mathcal{G}_2$ (every independence entailed by $\mathcal{G}_2$ is also entailed by
> $\mathcal{G}_1$). Then there exists a finite sequence of **covered edge reversals**
> (see [[Markov Equivalence and CPDAGs#^def-covered-edge]]) transforming $\mathcal{G}_1$
> into a DAG $\mathcal{G}_1'$ in the same equivalence class as $\mathcal{G}_2$, such that
> $\mathcal{G}_1'$ remains an I-map of $\mathcal{G}_2$ throughout the sequence.
^thm-meek-conjecture

This shows the equivalence-class graph is **connected** in the right way: greedy search
can always reach the optimal class from any starting point by following covered-edge reversals.

### fGES: Fast GES variant (Ramsey et al. 2017)

The original GES enumerates $O(d^2)$ Insert/Delete operators at each step. **fGES** prunes
this using preliminary CI tests:

1. For each pair $(X, Y)$, run a marginal independence test $X \perp\!\!\!\perp Y$
2. Only consider Insert operators for pairs that are **not** marginally independent
3. This reduces the search space from $O(d^2)$ to $O(d \cdot \bar{k})$ where $\bar{k}$ is
   the average adjacency count in the initial CI-based skeleton

fGES runs in $O(d^{q+2} \log d)$ time and handles $d \sim 10^4$ variables where standard
GES is infeasible. It is the recommended implementation for large-scale problems and is
the default in the TETRAD software (Ramsey et al. 2017) and Python's **causal-learn**.

### Score vs. constraint trade-offs

> [!note] GES vs. PC in practice
> - **GES** is typically more accurate than **PC** in small-to-moderate samples because
>   the BIC score integrates all data rather than relying on binary CI test decisions.
>   Multiple CI test failures can cascade through the PC skeleton step.
> - **PC** can be faster when the graph is very sparse and the CI tests are cheap (e.g.,
>   partial correlations for Gaussian data).
> - Both require **faithfulness** and **causal sufficiency**. Neither handles latent
>   confounders without extension (FCI for PC, RFCI for GES-based approach).
> - **NOTEARS** ([[NOTEARS - Overview]]) is a third paradigm that optimizes a continuous
>   score over real-valued $W$ matrices; it benchmarks favorably vs. FGS (fast GES) on
>   dense graphs and large $d$.

## Examples

> [!example] Example: GES on a three-variable chain
> True structure: $X_1 \to X_2 \to X_3$ (a chain / pipe pattern). The CPDAG is
> $X_1 - X_2 - X_3$ (since $X_1 \to X_2 \to X_3$ and $X_1 \leftarrow X_2 \leftarrow X_3$
> are Markov equivalent — same skeleton, no v-structures).
>
> **FES phase**: Starting from empty graph, GES first adds the edge with the largest
> marginal BIC improvement. If $X_1 - X_2$ is added first (highest marginal dependency),
> then $X_2 - X_3$ is added next. At this point, the CPDAG is $X_1 - X_2 - X_3$.
> No v-structures are created.
>
> **BES phase**: Both edges have positive BIC contribution; neither is removed.
>
> **Output**: $X_1 - X_2 - X_3$ (correct CPDAG — the two edge orientations cannot be
> determined from observational data).
^ex-chain

> [!example] Example: GES recovers v-structure
> True structure: $X \to Z \leftarrow Y$ with $X$ and $Y$ non-adjacent (a v-structure / collider).
> The CPDAG for this class is exactly $X \to Z \leftarrow Y$ (forced orientation since
> changing either edge introduces a new v-structure or cycle).
>
> **FES phase**: After adding $X - Z$ and $Y - Z$ (both have positive BIC), the CPDAG
> is $X \to Z \leftarrow Y$ (the Insert operator orients the edges as a v-structure since
> $X$ and $Y$ are not adjacent and $Z \notin \mathrm{Sepset}(X, Y)$).
>
> **BES phase**: Both edges retained. Output: $X \to Z \leftarrow Y$ (fully identified).

## Connections

- **[[Markov Equivalence and CPDAGs]]**: GES searches in CPDAG space; every step consists
  of Insert/Delete operators that traverse the CPDAG graph via covered-edge reversals.
  The Meek Conjecture (proved in Chickering 2002) guarantees the search space is connected.
- **[[PC Algorithm]]**: GES's score-based counterpart. Both return CPDAGs and both are
  consistent under faithfulness. GES is empirically more reliable at finite samples; PC
  is interpretable as a CI-testing procedure.
- **[[DAG Structure Learning Problem]]**: the landscape table in that note places GES in the
  "local/approximate search" category — this note provides the full details.
- **[[NOTEARS Experiments]]**: NOTEARS (Zheng et al. 2018) benchmarks against FGS (fast GES)
  and finds it competitive on sparse graphs but better on dense/large graphs.
- **[[Directed Acyclic Graphs]]**: the d-separation and do-calculus framework underlying causal
  interpretations of the recovered CPDAG.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, Meek's rules, covered edges
- [[PC Algorithm]] — constraint-based alternative to GES
- [[DAG Structure Learning Problem]] — SEM, score formulation, NP-hardness
- [[NOTEARS - Overview]] — continuous-optimization alternative to both PC and GES
- [[Approximate Bayesian Computation for ABMs]] — Bayesian alternative for learning ABM structure
