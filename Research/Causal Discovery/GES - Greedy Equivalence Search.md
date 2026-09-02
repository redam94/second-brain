---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-sources.md]]"
source_location: "Chickering (2002), JMLR 3: 507–554; Hauser & Bühlmann (2012), JMLR 13"
date_ingested: 2026-09-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - GES
  - greedy equivalence search
  - FGS
  - fast GES
  - score-based structure learning
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering 2002) is the canonical score-based algorithm for learning a DAG's Markov
> equivalence class. Unlike [[PC Algorithm]], which uses conditional independence tests, GES
> **searches directly over the space of CPDAGs** using a locally decomposable, score-equivalent
> score (e.g., Gaussian BIC). The algorithm has two greedy phases: (1) **Forward Equivalence
> Search (FES)** — start with the empty CPDAG and greedily add edges; (2) **Backward Equivalence
> Search (BES)** — greedily remove edges. A third **Turning** phase (Hauser & Bühlmann 2012)
> reverses edge orientations to escape local optima. Under faithfulness and score equivalence,
> GES returns the true CPDAG asymptotically. Its scalable variant, **FGS** (Ramsey et al. 2017),
> handles millions of variables.

## Overview

Score-based structure learning optimizes a score $Q(\mathcal{G})$ over DAGs or equivalence classes.
The direct search over DAGs is NP-hard (Chickering, 1996). The key insight of GES is to **search
over CPDAGs** (the space of Markov equivalence classes) rather than individual DAGs:

1. CPDAGs form a connected graph under single-edge addition/removal (Chickering 2002, Theorem 10).
2. The score $Q$ is constant within an equivalence class (score equivalence), so moving between
   CPDAGs by greedy edge operations never evaluates the same DAG twice unnecessarily.
3. The search space of CPDAGs has size $2^{O(d^2/2)}$ — smaller than DAGs but still exponential;
   GES trades exact optimality for greedy consistency.

**Assumptions (GES):**
1. **Faithfulness** — the distribution is faithful to the true DAG $\mathcal{G}^*$.
2. **Score equivalence** — $Q(\mathcal{G}) = Q(\mathcal{G}')$ for all $\mathcal{G} \sim \mathcal{G}'$.
3. **Local decomposability** — $Q(\mathcal{G}) = \sum_i Q_i(X_i, \text{Pa}_\mathcal{G}(i))$, enabling
   efficient local score updates when a single edge is added/removed.
4. **Identifiability (consistency)** — the score should prefer the true DAG over non-Markov-equivalent
   alternatives as $n \to \infty$. BIC satisfies this under regularity conditions.

## Main Content

### The score: Gaussian BIC

> [!definition] Definition: Gaussian BIC Score
> For a DAG $\mathcal{G}$ with parameter MLE $\hat{\theta}_\mathcal{G}$, the **BIC score** is:
> $$Q_{\mathrm{BIC}}(\mathcal{G}) = \log P(\mathbf{X} \mid \hat{\theta}_\mathcal{G}) - \frac{|\theta_\mathcal{G}|}{2}\log n,$$
> where $|\theta_\mathcal{G}|$ is the number of free parameters. Under a linear Gaussian SEM,
> the BIC score decomposes locally:
> $$Q_{\mathrm{BIC}}(\mathcal{G}) = -\frac{n}{2}\sum_{i=1}^d \log \hat{\sigma}^2_{i|\text{Pa}(i)} - \frac{|\text{Pa}(i)|}{2}\log n + C,$$
> where $\hat{\sigma}^2_{i|\text{Pa}(i)}$ is the residual variance from regressing $X_i$ on $\text{Pa}_\mathcal{G}(i)$.
>
> BIC is **score equivalent** (same value for all DAGs in the same MEC) and **locally decomposable**
> (score change when adding/removing one edge depends only on the local family $\{X_i, \text{Pa}(i)\}$).
^def-bic-score

**Bayesian alternative:** The Bayesian Dirichlet (BDe/BDeu) score for categorical variables and
the Bayesian Gaussian equivalent (BGe) score for continuous variables satisfy the same properties.

### Phase 1: Forward Equivalence Search (FES)

> [!theorem] Algorithm: GES Phase 1 — Forward Search (Chickering 2002, §4)
>
> **Initialize:** $\mathcal{C} \leftarrow \emptyset$ (empty CPDAG = no edges)
>
> **Repeat until no improvement:**
> 1. For each pair $(i, j)$ not adjacent in $\mathcal{C}$:
>    - Consider every **Insert** operator $\text{Insert}(i, j, T)$: adds edge $i \to j$ to a valid
>      extension of $\mathcal{C}$ with a set $T \subseteq \text{Ne}(j) \setminus \text{adj}(i)$ of
>      previously undirected neighbors of $j$ also oriented toward $j$.
>    - Let $H_+ = \text{Ne}(j) \setminus (\text{adj}(i) \cup T)$ (neighbors that remain undirected).
>    - **Validity check:** The Insert is valid iff the induced subgraph on $H_+ \cup \{i\}$ is a clique
>      in $\mathcal{C}$.
>    - Compute score gain $\Delta Q = Q_{\text{after}} - Q_{\text{before}}$ using local decomposability.
> 2. Apply the Insert operator with the highest $\Delta Q > 0$.
>
> **Output:** CPDAG $\mathcal{C}^+$ (densified from empty graph)
^thm-ges-fes

**Interpretation of FES:** The forward search adds edges greedily. Starting from the empty graph
(which encodes global independence — strong departure from the truth), each Insert step brings
the CPDAG closer to the true one by adding a missing edge. The validity check (clique condition)
ensures the resulting graph remains a valid CPDAG after the insertion.

**Key theorem (Chickering 2002, Theorem 15):** If faithfulness holds, FES never inserts a
"wrong" edge — it only adds edges present in $\mathcal{G}^*$. Moreover, if FES terminates at
the correct CPDAG $\mathcal{C}(\mathcal{G}^*)$, all score gains become non-positive.

### Phase 2: Backward Equivalence Search (BES)

> [!theorem] Algorithm: GES Phase 2 — Backward Search (Chickering 2002, §5)
>
> **Initialize:** $\mathcal{C} \leftarrow$ output of FES (over-complete, or the true CPDAG)
>
> **Repeat until no improvement:**
> 1. For each adjacent pair $(i, j)$ in $\mathcal{C}$:
>    - Consider every **Delete** operator $\text{Delete}(i, j, H)$: removes edge $i - j$ or $i \to j$
>      and orients certain neighbors in $H \subseteq \text{Ne}(j) \cap \text{adj}(i)$ away from $j$.
>    - **Validity check:** The induced subgraph on $H \cup \{i\}$ is a clique in $\mathcal{C}$.
>    - Compute score gain $\Delta Q = Q_{\text{after}} - Q_{\text{before}}$.
> 2. Apply the Delete operator with the highest $\Delta Q > 0$.
>
> **Output:** CPDAG $\mathcal{C}^-$ (sparsified)
^thm-ges-bes

**Why BES after FES?** FES may overshoot if the score allows edges not in $\mathcal{G}^*$ to
give spurious improvements in finite samples. BES corrects this by removing over-fitted edges.
Under faithfulness and consistent scores: FES outputs $\mathcal{C}(\mathcal{G}^*)$ + possibly extra edges;
BES removes the extras, yielding $\mathcal{C}(\mathcal{G}^*)$.

### Phase 3: Turning (Hauser & Bühlmann 2012)

The original Chickering (2002) algorithm has only FES + BES. Hauser & Bühlmann (2012) add a
**Turning** phase to handle cases where the score landscape has plateaus or multiple local optima:

> [!definition] Definition: Turning Operator
> A **Turn** operator takes a directed edge $i \to j$ in $\mathcal{C}$ and a set
> $H \subseteq \text{Ne}(j) \setminus \{i\}$, then orients $i - j$ in the opposite direction
> ($j \to i$) and adjusts orientations of edges in $H$. Valid turns preserve the CPDAG validity.
^def-turning

The Turning phase uses the Turn operator greedily (like FES/BES), cycling through all valid turns
until convergence. This makes GES more robust to the ordering of FES moves.

### Consistency theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 18; Hauser & Bühlmann 2012)
> Let $Q_n$ be a sequence of score functions (e.g., BIC with $n$ observations) satisfying:
> 1. **Score equivalence:** $Q_n(\mathcal{G}) = Q_n(\mathcal{G}')$ if $\mathcal{G} \sim \mathcal{G}'$.
> 2. **Local decomposability:** $Q_n(\mathcal{G}) = \sum_i Q_{n,i}(X_i, \mathrm{Pa}_\mathcal{G}(i))$.
> 3. **Consistency:** $Q_n(\mathcal{G}^*) > Q_n(\mathcal{G})$ for all $\mathcal{G} \not\sim \mathcal{G}^*$
>    with probability $\to 1$ as $n \to \infty$.
> 4. **Faithfulness** of the distribution to $\mathcal{G}^*$.
>
> Then GES (FES + BES) returns $\mathcal{C}(\mathcal{G}^*)$ with probability tending to 1 as $n \to \infty$.
^thm-ges-consistency

This is GES's main theoretical guarantee: it is asymptotically correct under the same assumptions
as PC (Markov + faithfulness), but uses scores rather than CI tests.

### FGS: Fast GES for large graphs

**FGS** (Ramsey et al. 2017) scales GES to millions of variables by:
1. **Parallelizing** the search over candidate Insert/Delete operators across CPU cores.
2. **Restricting the search** to pairs with high correlation (using a prior knowledge graph or
   a correlation threshold) to avoid $O(d^2)$ pair enumeration.
3. **Caching** local score computations to avoid redundant regression fits.

FGS is implemented in the **TETRAD** toolbox (Java) and `causal-learn` (Python).

### Comparison

| Property | PC | GES |
|----------|-----|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC/BGe) |
| Phase 1 | Skeleton via CI tests (remove edges) | FES: add edges to empty graph |
| Phase 2 | V-structure + Meek rules | BES: remove over-fitted edges |
| Hyperparameter | $\alpha$ (CI test threshold) | Penalty weight in BIC |
| Finite-sample advantage | Good when CI tests are powerful | Good when scores are smooth/well-specified |
| Dense graphs | Struggles ($p_{\max}$ grows) | Handles better (score updates local) |
| NOTEARS vs GES | GES is combinatorial; NOTEARS continuous | — |

**Empirical comparison (Chickering 2002; NOTEARS paper):** On random Erdős-Rényi graphs,
GES/FGS outperforms PC for dense graphs and large $d$. NOTEARS (continuous) matches GES
for linear Gaussian SEMs and outperforms both when the graph is dense.

## Connections

- **NOTEARS:** [[NOTEARS - Overview]] references GES ("FGS") as the primary score-based competitor.
  The NOTEARS paper shows it outperforms FGS on ER4 (dense, $d=100$) graphs; see [[NOTEARS Experiments]].
  NOTEARS's advantage: avoids the combinatorial search entirely via continuous optimization.
- **PC Algorithm:** [[PC Algorithm]] provides the constraint-based alternative. The two algorithms
  produce the same object (CPDAG) under different computational strategies.
- **Bayesian structure learning:** GES's BIC score is a frequentist approximation to the log marginal
  likelihood. Fully Bayesian structure learning (e.g., DiBS, DAG-GNN) uses MCMC over DAGs but is
  far more expensive. GES with BGe score approximates Bayesian MAP.
- **Markov equivalence:** GES searches over the CPDAG space because score equivalence means
  individual DAGs in the same class cannot be distinguished by the score. See
  [[Markov Equivalence Classes and CPDAGs]].
- **causal-learn Python:** The `causal-learn` package implements both PC and GES in Python with
  a unified API, enabling direct comparison.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG space GES searches
- [[PC Algorithm]] — constraint-based alternative
- [[DAG Structure Learning Problem]] — formal setup, NOTEARS framing
- [[NOTEARS - Overview]] — continuous optimization approach
- [[NOTEARS Experiments]] — empirical comparison including GES/FGS
- [[Directed Acyclic Graphs]] — downstream causal reasoning with the output CPDAG
