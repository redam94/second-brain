---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-causal-structure-learning-survey.md]]"
source_location: "§3 — Chickering (2002) JMLR 3:507-554; Ramsey et al. (2017) FGS"
date_ingested: 2026-07-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Discovery Algorithms - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - GES
  - Greedy Equivalence Search
  - FES
  - BES
  - FGS
  - Fast GES
  - score-based structure learning
  - Chickering 2002
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical *score-based* method for
> learning a causal DAG structure. It searches the space of [[Markov Equivalence and CPDAGs|Markov
> equivalence classes]] (CPDAGs) using a **decomposable score** (BIC or BDe), exploiting the
> **score equivalence** property — all DAGs in the same MEC receive the same score — to avoid
> enumerating individual DAGs. Two greedy phases (Forward + Backward) provably recover the true
> MEC asymptotically under faithfulness. The proof rests on the **Meek conjecture**, proved by
> Chickering: greedy moves can always reach the true CPDAG from any starting point.

## Overview

GES is the natural score-based complement to the [[PC Algorithm]] (constraint-based). Both methods
output a CPDAG representing the [[Markov Equivalence and CPDAGs|Markov equivalence class]] of the
true DAG — the identifiability limit for observational data under faithfulness. The key difference:
PC uses CI tests to directly read off the skeleton and v-structures; GES greedily optimises a
statistical score over the space of MECs.

The score-based approach has practical advantages: scores like BIC can be evaluated with a single
regression (for Gaussian linear SEMs), avoiding the multiple-testing burden of CI tests. The
**TETRAD** and **pcalg** packages implement GES; NOTEARS's benchmark paper compares against **FGS**
(Ramsey et al. 2017), a parallelised variant.

## Main Content

### Score equivalence — why search over MECs

> [!definition] Decomposable Score (Chickering 2002, §2)
> A score $Q(G, \mathbf{X})$ is *decomposable* if it factors over the local family structures:
> $$Q(G) = \sum_{j=1}^{d} Q_j\!\bigl(\mathrm{pa}_G(X_j),\, X_j\bigr).$$
> Each term $Q_j$ depends only on variable $X_j$ and its parents in $G$. Examples:
> - **BIC** (Bayesian Information Criterion): $Q_j = \ell_j(\hat\theta_j; \mathbf{X}) - \frac{|\mathrm{pa}(X_j)|}{2}\log n$
> - **BDe/BGe** (Bayesian Dirichlet/Gaussian equivalent): a Bayesian marginal likelihood with
>   parameter prior, which also factorises by local family.
^def-decomposable-score

> [!theorem] Score Equivalence (Chickering 2002, Thm. 1)
> For any decomposable, *consistent*, *score-equivalent* scoring function, all DAGs within the
> same Markov equivalence class receive the **same score**: $Q(G_1) = Q(G_2)$ whenever $G_1$ and
> $G_2$ are Markov equivalent.
>
> **Consequence**: No decomposable consistent score can distinguish members of the same MEC.
> This makes searching over MECs (CPDAGs) rather than individual DAGs not just convenient but
> *necessary* — individual DAG scores are tied.
^thm-score-equivalence

The BIC score is both decomposable and score-equivalent for Gaussian linear SEMs; it is
the standard choice in the `pcalg` and `causal-learn` implementations.

### GES phases

> [!definition] GES Algorithm (Chickering 2002)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n\times d}$; decomposable score $Q$.
> **Output**: CPDAG.
>
> **Phase 1 — Forward Equivalence Search (FES)**:
> 1. Start from the empty CPDAG $\mathcal{C}^0$ (no edges).
> 2. At each step, consider all valid *insert* operators $I(X, Y, H)$ for edges not yet in $\mathcal{C}$:
>    - $I(X, Y, H)$: insert edge $X \to Y$ into the CPDAG, where $H \subseteq \mathrm{Ne}_\mathcal{C}(Y)$
>      is a subset of neighbours of $Y$ (those that become parents of $Y$ after insertion).
> 3. Apply the insert that maximally increases $Q$. Update $\mathcal{C}$.
> 4. Repeat until no insert increases $Q$.
>
> **Phase 2 — Backward Equivalence Search (BES)**:
> 1. Start from the CPDAG $\mathcal{C}^*$ returned by FES.
> 2. At each step, consider all valid *delete* operators $D(X, Y, H)$:
>    - $D(X, Y, H)$: remove edge $X \to Y$ (or $X - Y$) from $\mathcal{C}$, where $H \subseteq
>      \mathrm{Ne}_\mathcal{C}(Y) \cap \mathrm{adj}(X)$.
> 3. Apply the delete that maximally increases $Q$. Update $\mathcal{C}$.
> 4. Repeat until no delete increases $Q$.
>
> **Return**: Final CPDAG.
^def-ges

**Why two phases?** FES greedily adds edges — in finite samples it may overfit by including edges
that improve the score by chance. BES then prunes the excess. Together they implement a
forward-backward variable selection strategy, analogous to stepwise regression but in CPDAG space.

### The Meek conjecture and GES consistency

The key theoretical result proving that greedy search can find the global optimum:

> [!theorem] Meek Conjecture (proved by Chickering 2002, §4)
> If $G$ and $H$ are DAGs on the same variable set, and $H$ is an **independence map** (I-map)
> of $G$ (every d-separation in $H$ holds in $G$), then there exists a finite sequence of
> *covered edge reversals* from $G$ to $H$ such that at every intermediate step the graph remains
> an I-map of $G$.
>
> A *covered edge* $X \to Y$ satisfies $\mathrm{pa}(Y) = \mathrm{pa}(X) \cup \{X\}$ — reversing
> it preserves Markov equivalence.
^thm-meek-conjecture

**Significance**: The Meek conjecture proves that the GES search space is **connected** under valid
greedy moves. There is always a path from any CPDAG to the true CPDAG that the greedy algorithm
can follow — ruling out disconnected local optima that block convergence.

> [!theorem] GES Consistency (Chickering 2002, Thm. 15 + Thm. 17)
> Under the Markov condition, faithfulness, and a decomposable, consistent, score-equivalent
> scoring function, GES:
> 1. (FES consistency) Phase 1 terminates at the correct MEC with probability → 1 as $n \to \infty$.
> 2. (BES consistency) Phase 2 does not remove any true edge with probability → 1.
> 3. (GES consistency) The output CPDAG equals the true CPDAG with probability → 1 as $n \to \infty$.
^thm-ges-consistency

### Covered edges and the CPDAG update rule

After each insert or delete operator, the algorithm must update the CPDAG by re-applying
Meek's orientation rules. The valid insert/delete operators are defined to ensure the resulting
graph is still a valid CPDAG (acyclic, no new v-structures created spuriously). This is non-trivial:
not every edge insertion corresponds to a valid CPDAG transition. Chickering (2002) characterises
the valid operators precisely via the *clique* conditions on $H$.

### FGS: Parallelised GES (Ramsey et al. 2017)

> [!definition] FGS / FGES (Fast GES)
> **FGS** (Fast Greedy Search, Ramsey et al. 2017) is a parallelised Java implementation of GES
> that scales to thousands of variables ($d \sim 10{,}000$) by:
> 1. **Sparsity restriction**: Restricting parent candidates using a preliminary adjacency estimate,
>    reducing the effective search space.
> 2. **Parallel score computation**: Evaluating multiple edge candidates simultaneously across threads.
> 3. **Cached score updates**: Tracking which local scores change after each operator and only
>    recomputing affected terms.
>
> FGS is the **reference baseline in the NOTEARS benchmark** (Zheng et al. 2018).
^def-fgs

The key finding from [[NOTEARS Experiments]]: NOTEARS matches or beats FGS on SHD (structural
Hamming distance) for Erdős-Rényi and scale-free graphs, with much simpler code (~50 lines Python
vs. a large Java codebase).

### Software

**R — pcalg**:
```r
library(pcalg)
# BIC score for Gaussian data
score <- new("BIC", data = X)
ges.fit <- ges(score)
# Access CPDAG:
ges.fit$essgraph
```

**Python — causal-learn**:
```python
from causallearn.search.ScoreBased.GES import ges

Record = ges(data, score_func='local_score_BIC')
# Access CPDAG:
Record['G'].draw_pydot_graph()
```

**Java — TETRAD / FGES**:
The reference implementation from CMU. Also available via `py-tetrad` Python wrapper.

### BIC score for Gaussian linear SEM

For a Gaussian linear SEM with data $\mathbf{X} \in \mathbb{R}^{n\times d}$, the local BIC score for
variable $X_j$ with parent set $\mathbf{Pa}_j$ is:

$$Q_j(\mathbf{Pa}_j) = -n\log\hat\sigma_j^2(\mathbf{Pa}_j) - |\mathbf{Pa}_j|\log n$$

where $\hat\sigma_j^2(\mathbf{Pa}_j)$ is the residual variance from regressing $X_j$ on $\mathbf{Pa}_j$.
The global score is $Q(G) = \sum_j Q_j(\mathbf{Pa}_j)$. Adding an edge increases a local term if
the variance reduction outweighs the BIC penalty.

## Connections

- **PC algorithm** ([[PC Algorithm]]): constraint-based alternative. Under faithfulness, PC and GES
  asymptotically identify the same CPDAG. GES is often preferred under Gaussian linear SEMs
  (parametric score is well-calibrated); PC is preferred when a flexible CI test is needed.
- **NOTEARS** ([[NOTEARS Algorithm]]): continuous optimisation alternative. Outputs a single DAG
  rather than a CPDAG; different theoretical guarantee (LS consistency, no faithfulness needed).
  In [[NOTEARS Experiments]], NOTEARS matches FGS on SHD and outperforms it on dense graphs.
- **BIC and model selection**: the BIC score used in GES is the same criterion used in
  [[Overfitting and Information Criteria]] for model selection in regression — structure learning
  is, in a sense, variable selection applied to every variable simultaneously.
- **Score equivalence** grounds the [[Markov Equivalence and CPDAGs]] framework: once we know
  all DAGs in the same MEC have the same score, the MEC is the natural unit of search.
- **Sachs protein data**: 11 proteins, 853 observations, 17 known interventional edges. Both PC
  and GES recover approximately 12 of 17 edges; the benchmark is standard in the causal discovery
  literature.

## See Also
- [[Markov Equivalence and CPDAGs]] — score equivalence foundation; CPDAG definition
- [[DAG Structure Learning Problem]] — problem setup; landscape table of methods (GES is in "local/approximate search")
- [[PC Algorithm]] — constraint-based counterpart
- [[NOTEARS Experiments]] — benchmark comparing GES (FGS) vs NOTEARS
- [[Causal Discovery Algorithms - Comparison]] — practical guide to choosing PC vs GES vs NOTEARS
- [[Overfitting and Information Criteria]] — BIC in the regression / model selection context
