---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/survey-GES-chickering2002-greedy-equivalence-search.md]]"
source_location: "Chickering (2002) JMLR 3:507-554; Ramsey et al. (2017) FGES"
date_ingested: 2026-07-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES algorithm"
  - "FES"
  - "BES"
  - "FGES"
  - "FGS"
  - "Chickering 2002"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. It searches the space of **CPDAGs** (Markov
> equivalence class representatives) in two greedy phases: **Forward Equivalence Search**
> (FES) inserts edges one at a time, and **Backward Equivalence Search** (BES) removes
> them. Under faithfulness + score consistency (BIC, BGe, BDe), GES provably recovers
> the true CPDAG as $n \to \infty$ — this is the **Meek conjecture**, proven by Chickering.
> FGES (Ramsey et al. 2017) is the scalable cached implementation used as the "FGS"
> baseline in the [[NOTEARS - Overview]] paper.

## Overview

Score-based causal discovery takes a different approach from constraint-based methods
([[PC Algorithm]]): instead of testing conditional independences, it defines a score
$Q(G, \mathbf{D})$ for each candidate DAG $G$ and searches for the highest-scoring
structure. The challenge is that the search space is superexponential in $d$ — the
number of DAGs on $d$ variables grows as $2^{O(d^2)}$.

GES's key insight: rather than searching over individual DAGs, search over **Markov
equivalence classes** (CPDAGs). The CPDAG space has better properties:
- Score ties (equivalent DAGs) are resolved by grouping into a single CPDAG.
- Local moves in CPDAG space (edge insertions/deletions) map to well-defined score changes.
- The forward-then-backward strategy is provably optimal under faithfulness.

## Main Content

### Score requirement: decomposability

> [!definition] Definition: Score Decomposability
> A score $Q(G, \mathbf{D})$ is **decomposable** if it factors as:
> $$Q(G, \mathbf{D}) = \sum_{i=1}^{d} Q_i(\mathbf{Pa}^G_i, \mathbf{D})$$
> where $\mathbf{Pa}^G_i$ are the parents of node $X_i$ in DAG $G$.
>
> **Score consistency (Chickering 2002, Def. 5):** A consistent score assigns strictly
> higher expected score to DAGs in the true equivalence class $[G^*]$ than to DAGs
> outside it, in the large-sample limit.
>
> Standard consistent scores: **BIC** ($-\frac{1}{2}\text{BIC}$, for linear Gaussian data),
> **BGe** (Bayesian Gaussian equivalent), **BDe** (Bayesian Dirichlet equivalent, discrete).
^def-score-decomposability

### Phase 1: Forward Equivalence Search (FES)

> [!definition] GES Phase 1: FES (Chickering 2002, §5)
>
> **Start:** Empty CPDAG $\mathcal{C}_0$ (no edges).
>
> **Repeat:**
> 1. Enumerate all valid **Insert operators** $\text{Insert}(X_i, X_j, \mathbf{T})$:
>    - $X_j \notin \text{Adj}(X_i)$ (currently non-adjacent).
>    - $\mathbf{T} \subseteq \text{Ne}(X_j) \setminus \text{Adj}(X_i)$ (subset of $X_j$'s
>      undirected neighbours not adjacent to $X_i$).
>    - $[\text{Ne}(X_j) \setminus \mathbf{T}] \cup \{X_i\}$ forms a clique (ensures valid CPDAG).
> 2. Compute score change for each valid insert:
>    $$\Delta Q(\text{Insert}) = Q_j(\mathbf{Pa}_j \cup \{X_i\} \cup \mathbf{T}) - Q_j(\mathbf{Pa}_j \cup \mathbf{T})$$
> 3. If $\max_{\text{Insert}} \Delta Q > 0$: apply the highest-scoring insert and update the CPDAG.
>    Otherwise: **stop FES**.
>
> **Output:** CPDAG $\hat{\mathcal{C}}_1$ (local maximum in the forward direction).
^def-fes

**Why start from the empty graph?** The empty graph has score $Q = 0$ (no edges = no parameters).
FES guarantees that every inserted edge strictly increases the score; in the large-sample limit,
every edge in the true DAG is eventually inserted (under faithfulness).

**Clique condition:** The condition that $[\text{Ne}(X_j) \setminus \mathbf{T}] \cup \{X_i\}$
forms a clique is purely graphical — it ensures the resulting CPDAG is valid (no new v-structures
are accidentally created). This is the key technical contribution of Chickering (2002).

### Phase 2: Backward Equivalence Search (BES)

> [!definition] GES Phase 2: BES (Chickering 2002, §6)
>
> **Start:** CPDAG $\hat{\mathcal{C}}_1$ from FES.
>
> **Repeat:**
> 1. Enumerate all valid **Delete operators** $\text{Delete}(X_i, X_j, \mathbf{H})$:
>    - $X_i - X_j$ or $X_i \to X_j$ is an edge in the current CPDAG.
>    - $\mathbf{H} \subseteq \text{Ne}(X_j) \cap \text{Adj}(X_i)$.
>    - $[\text{Ne}(X_j) \cap \text{Adj}(X_i)] \setminus \mathbf{H}$ forms a clique.
> 2. Compute score change:
>    $$\Delta Q(\text{Delete}) = Q_j(\mathbf{Pa}_j \setminus (\{X_i\} \cup \mathbf{H})) - Q_j(\mathbf{Pa}_j)$$
> 3. If $\max_{\text{Delete}} \Delta Q > 0$: apply the highest-scoring deletion and update.
>    Otherwise: **stop BES**.
>
> **Output:** Final CPDAG $\hat{\mathcal{C}}_2$.
^def-bes

**Why BES after FES?** FES overshoots in finite samples: it may insert spurious edges because
the BIC score rewards fit even for noise associations. BES removes edges whose deletion
improves the score — reversing the overshooting. The two phases together are necessary and
sufficient for asymptotic correctness (Theorem 15 below).

### The main theorem: Meek conjecture

> [!theorem] Theorem 15 (Chickering 2002): GES Optimality
> Under:
> - The data is generated by a distribution faithful to a DAG $G^*$,
> - The score $Q$ is decomposable and consistent (e.g. BIC, BGe, BDe),
>
> then as $n \to \infty$, GES outputs the true CPDAG $\mathcal{C}^*$ with probability
> tending to 1.
>
> **Corollary:** In the large-sample limit, GES recovers the Markov equivalence class
> of $G^*$ — the maximum possible from observational data alone.
^thm-ges-consistency

**Historical context:** This result proves the **Meek conjecture** (Meek 1997) — that
a two-phase greedy search (forward then backward) is sufficient for exact recovery in
the large-sample limit. The proof is the main technical contribution of Chickering (2002);
it required characterising all valid local moves in CPDAG space.

### Score computation: BIC for Gaussian data

> [!definition] BIC score for linear Gaussian data
> For a Gaussian linear SEM with $n$ observations, the BIC score for node $X_j$
> with parent set $\mathbf{Pa}_j$ is:
>
> $$Q_j(\mathbf{Pa}_j) = -\frac{n}{2}\ln\hat{\sigma}^2_j(\mathbf{Pa}_j) - \frac{|\mathbf{Pa}_j|+1}{2}\ln n$$
>
> where $\hat{\sigma}^2_j(\mathbf{Pa}_j)$ is the residual variance from regressing $X_j$
> on $\mathbf{Pa}_j$. The global score $Q = \sum_j Q_j$.
>
> **Score change from inserting $X_i \to X_j$:**
> $$\Delta Q = -\frac{n}{2}\bigl[\ln\hat{\sigma}^2_j(\mathbf{Pa}_j \cup \{X_i\}) - \ln\hat{\sigma}^2_j(\mathbf{Pa}_j)\bigr] - \frac{\ln n}{2}$$
>
> The second term ($-\frac{\ln n}{2}$) is the BIC penalty for adding one parameter.
> GES inserts the edge iff the variance reduction exceeds the penalty.
^def-bic-score

### FGES: scalable implementation

**Ramsey et al. (2017)** introduced **FGES** (Fast GES) with two key optimisations:

1. **Score caching:** $Q_j(\mathbf{Pa}_j)$ is computed once and cached; only $Q_j$
   updates are needed when an edge incident on $X_j$ is modified.
2. **Efficient FES enumeration:** Maintain a sorted priority queue of all candidate
   Insert operators. When an edge is inserted, only update the operators involving
   the modified variables.

**Performance:** FGES scales to $d = 10{,}000$ variables (with sparse true graphs)
in minutes. The reference implementation is in **Tetrad** (Java, CMU Center for
Causal Discovery).

> [!note] FGS in NOTEARS experiments
> The "FGS" baseline in [[NOTEARS Experiments]] is FGES v5.1 (Tetrad). NOTEARS matches
> or outperforms FGS on sparse graphs (ER-2) and decisively outperforms it on dense
> hub-containing graphs (SF-4), where GES's local greedy moves struggle against scale-free
> structure.

## Examples

> [!example] Example: GES on three variables
> True DAG: $X \to Y \leftarrow Z$ (v-structure; $X, Z$ non-adjacent). $n = 500$ Gaussian.
>
> **FES (start from empty graph):**
> - Insert $X - Y$: $\Delta Q > 0$ (large correlation). Apply.
> - Insert $Z - Y$: $\Delta Q > 0$. Apply.
> - Insert $X - Z$: $\Delta Q \approx 0$ ($X \perp Z$ marginally — small but non-zero
>   in finite samples). If $\Delta Q > 0$, inserted spuriously.
>
> **BES:**
> - Delete $X - Z$ (if spuriously inserted): $\Delta Q > 0$ (removing noise edge).
>
> **Final CPDAG:** $X \to Y \leftarrow Z$ (v-structure correctly identified because
> the BIC score for $Y$'s local family is highest when both $X$ and $Z$ are parents).

## Connections

- **PC vs. GES:** PC uses CI tests; GES uses a score. In large samples both recover the
  same CPDAG. In finite samples: GES tends to produce denser graphs (FES overshoots);
  PC tends sparser (CI tests reject many edges). Neither dominates.
- **NOTEARS ([[NOTEARS - Overview]]):** NOTEARS reformulates the score-based problem as
  a continuous program over real matrices, solving it with L-BFGS rather than the
  two-phase greedy FES+BES. Both use a least-squares / BIC-equivalent score; NOTEARS
  avoids the CPDAG search space entirely by working with the full matrix $W$.
- **Score vs. CI duality:** A decomposable score $Q$ and CI tests are related by the
  **Markov condition**: the score factorises over parent sets iff the distribution factorises
  over the DAG's independence model. BIC score differences correspond to partial correlations
  via the Fisher $Z$ statistic for Gaussian data.
- **Bayesian networks:** GES searches for the best-scoring Bayesian network structure.
  The runtime [[BN Construction Methods Comparison]] and [[LLM Expert Elicitation for Bayesian Networks]]
  notes cover alternative structure sources (expert elicitation), which complement
  algorithmic discovery from data.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG space GES searches
- [[DAG Structure Learning Problem]] — formal problem setup and score definition
- [[PC Algorithm]] — constraint-based alternative outputting the same CPDAG
- [[NOTEARS - Overview]] — continuous optimisation alternative
- [[NOTEARS Experiments]] — benchmarks where GES/FGS is the primary baseline
- [[Conditional Independence Tests for Causal Discovery]] — the CI-test analogue of scoring
- [[Method of Simulated Moments]] — related score-based estimation (SMM) in a different context
