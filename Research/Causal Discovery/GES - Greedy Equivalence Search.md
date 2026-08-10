---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/ges-python-implementation-readme.md]]"
source_location: "Chickering (2002), full paper; Hauser & Bühlmann (2012), §3 (Turning Phase)"
date_ingested: 2026-08-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[CPDAG Orientation - V-Structures and Meek Rules]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "FGES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for learning CPDAGs. It operates directly in the space of Markov equivalence
> classes, represented as CPDAGs. The algorithm has two phases: **FES** (Forward
> Equivalence Search) greedily adds edges via Insert operators until no score-increase
> is possible; **BES** (Backward Equivalence Search) greedily removes edges via Delete
> operators. Chickering (2002) proved the **Meek Conjecture**, establishing that under
> faithfulness and a consistent score, GES is asymptotically consistent — it recovers
> the true CPDAG. A **Turning Phase** (Hauser & Bühlmann 2012) reverses covered edges
> to improve finite-sample performance.

## Overview

GES differs from the PC algorithm ([[PC Algorithm - Overview]]) in a fundamental way:
instead of testing for conditional independence and then orienting edges, GES **scores
entire CPDAGs** and searches for the highest-scoring one.

The search space is the set of all CPDAGs. GES exploits the fact that this space has a
graph structure: adjacent CPDAGs differ by a single Insert, Delete, or Turn operator.
By searching over this compact space rather than over DAGs (which are much more numerous
per equivalence class), GES avoids the need for explicit CI tests and makes better use
of the score's global information.

## Main Content

### Decomposable scores

> [!definition] Definition: Locally decomposable score
> A score $\mathcal{S}(\mathcal{G}, \mathbf{X})$ is **locally decomposable** if it
> decomposes over nodes as:
> $$\mathcal{S}(\mathcal{G}, \mathbf{X}) = \sum_{i=1}^{d} \mathcal{S}_i(X_i, \text{Pa}_\mathcal{G}(X_i), \mathbf{X}),$$
> where $\mathcal{S}_i$ depends only on node $X_i$, its parents, and the data.
>
> **Score equivalence**: a score is **score-equivalent** if all DAGs in the same MEC
> receive the same score. Score-equivalence + decomposability ensures GES can work
> in CPDAG space without breaking ties arbitrarily.
^def-decomposable-score

> [!definition] Definition: Gaussian BIC score (GES default)
> For a linear Gaussian SEM, the **BIC score** for node $X_i$ given parents $\text{Pa}(X_i)$:
> $$\mathcal{S}_i = -n \log \hat{\sigma}^2_{i|\text{Pa}} - |\text{Pa}(X_i)| \log n,$$
> where $\hat{\sigma}^2_{i|\text{Pa}}$ is the residual variance of $X_i$ regressed on
> its parents (LS estimate). The BIC is score-equivalent and locally decomposable.
>
> BIC penalises model complexity ($|\text{Pa}(X_i)| \log n$) to encourage sparsity.
> In causal-learn: `score_func="local_score_BIC"`.
^def-bic-score

### The three phases of GES

#### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Insert Operator
> An **Insert operator** $\text{Insert}(X_i, X_j, T)$ on a CPDAG $\mathcal{C}$ adds
> the edge $X_i \to X_j$ and simultaneously orients edges of $T$ into $X_j$, where
> $T \subseteq \text{Ne}(X_j, \mathcal{C}) \cap \text{Adj}(X_i, \mathcal{C})$
> (neighbours of $X_j$ that are adjacent to $X_i$ in $\mathcal{C}$). The resulting
> PDAG is then completed to a CPDAG.
>
> The **score change** (always computed locally via decomposability):
> $$\Delta \mathcal{S}_{\text{Insert}}(X_i, X_j, T) = \mathcal{S}_j(X_j, \text{Pa}(X_j) \cup \{X_i\} \cup T) - \mathcal{S}_j(X_j, \text{Pa}(X_j)).$$
^def-insert-operator

**FES algorithm:**
1. Start from the empty CPDAG $\mathcal{C}_0 = \emptyset$.
2. Compute $\Delta\mathcal{S}$ for all valid Insert operators.
3. Apply the Insert with highest $\Delta\mathcal{S} > 0$.
4. Complete the resulting PDAG to CPDAG.
5. Repeat until no Insert has $\Delta\mathcal{S} > 0$.

> [!theorem] Theorem: FES terminates at an I-map (Chickering 2002, Thm. 15)
> In the large-sample limit with a consistent score, FES terminates at a CPDAG
> $\mathcal{C}^+$ that is an **inclusion-optimal I-map**: a supergraph of the true CPDAG
> with no unnecessary extra edges that can be removed by a single deletion while
> remaining an I-map. FES never adds an edge whose deletion strictly improves the score
> when the true distribution is faithful to some DAG.
^thm-fes-terminate

#### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Delete Operator
> A **Delete operator** $\text{Delete}(X_i, X_j, H)$ on a CPDAG $\mathcal{C}$ removes
> the edge $X_i \to X_j$ (or $X_i - X_j$) and simultaneously undirects edges of $H$
> into $X_j$, where $H \subseteq \text{Ne}(X_j, \mathcal{C}) \cap \text{Adj}(X_i, \mathcal{C})$.
> The resulting PDAG is completed to a CPDAG.
>
> Score change:
> $$\Delta \mathcal{S}_{\text{Delete}}(X_i, X_j, H) = \mathcal{S}_j(X_j, \text{Pa}(X_j) \setminus \{X_i\} \setminus H) - \mathcal{S}_j(X_j, \text{Pa}(X_j)).$$
^def-delete-operator

**BES algorithm:**
1. Start from $\mathcal{C}^+$ (FES output).
2. Compute $\Delta\mathcal{S}$ for all valid Delete operators.
3. Apply the Delete with highest $\Delta\mathcal{S} > 0$.
4. Complete to CPDAG.
5. Repeat until no Delete has $\Delta\mathcal{S} > 0$.

> [!theorem] Theorem: GES consistency (Chickering 2002, Thm. 18 — the Meek Conjecture)
> Let $\mathcal{G}^*$ be a DAG generating i.i.d. data from a distribution faithful
> to $\mathcal{G}^*$. Let $\mathcal{S}$ be a locally decomposable, score-equivalent,
> consistent score (e.g. BIC). In the large-sample limit:
>
> 1. **FES** terminates at the inclusion-optimal I-map $\mathcal{C}^*_+$ — the unique
>    CPDAG that is a minimal supergraph of $\mathcal{C}^*$ (the true CPDAG).
> 2. **BES**, starting from $\mathcal{C}^*_+$, terminates at the **true CPDAG**
>    $\mathcal{C}^*$.
>
> Hence GES recovers the true CPDAG exactly in the large-sample limit.
>
> **Proof idea**: Chickering proved the Meek Conjecture, which states that from any
> inclusion-optimal I-map, there exists a finite sequence of covered edge reversals
> and edge deletions that reaches the true CPDAG, each step non-decreasing in score.
> This guarantees BES will reach $\mathcal{C}^*$.
^thm-ges-consistency

#### Phase 3: Turning Phase (Hauser & Bühlmann 2012)

> [!definition] Definition: Turn Operator
> A **Turn operator** $\text{Turn}(X_i, X_j, C)$ reverses the directed edge
> $X_i \to X_j$ to $X_j \to X_i$ and simultaneously orients a subset $C$ of
> undirected edges adjacent to $X_j$. It is valid when $X_i \to X_j$ is a
> **covered edge**: $\text{Pa}(X_j) = \text{Pa}(X_i) \cup \{X_i\}$.
>
> The Turn operator was absent from the original Chickering (2002) formulation.
> Hauser & Bühlmann (2012) showed it is needed for completeness in the interventional
> MEC setting (GIES), and it also improves finite-sample performance in the
> observational setting.
^def-turn-operator

**Turning Phase algorithm:**
1. Starting from BES output $\mathcal{C}^*$.
2. For each covered edge $X_i \to X_j$ in $\mathcal{C}^*$:
   - Compute $\Delta\mathcal{S}$ for all Turn$(X_i, X_j, C)$ operators.
3. Apply the Turn with highest $\Delta\mathcal{S} > 0$.
4. Repeat until no Turn improves the score.

In practice: `phases=['forward', 'backward', 'turning']` in the `juangamella/ges` package.

### Score changes and decomposability in practice

Because the BIC score decomposes by node, computing $\Delta\mathcal{S}$ for an Insert/Delete
operator only requires re-scoring node $X_j$ — a regression of $X_j$ on its new parent
set. This is $O(|\text{Pa}(X_j)|^2 n)$ per operator evaluation, making GES practical
for moderate dimensions.

### Comparison with PC

| Property | PC | GES |
|----------|-----|-----|
| **Input needed** | CI test + $\alpha$ | Decomposable score |
| **Type of search** | Constraint-based edge removal | Score-based CPDAG search |
| **Sensitivity** | CI test errors compound in Phase 1 | Score landscape; local optima possible |
| **High-dim behaviour** | Sparse graphs: $O(d^{k+2})$ | $O(d^3)$ per BIC evaluation |
| **Consistency** | ✓ (with consistent CI test) | ✓ (with consistent score) |
| **V-structure quality** | Direct from sep sets | Induced by score maximisation |
| **Non-Gaussian data** | KCI test | Non-Gaussian scores (e.g. BDeu) |

**Practical recommendation**: Use PC when CI testing is cheap and graph is known sparse.
Use GES (with BIC) when the score naturally reflects model fit and you want a single
consistent search without tuning a significance level.

## Connections

- **CPDAG space**: GES operates in the same space that PC outputs — understanding
  CPDAGs and MECs is prerequisite → [[Markov Equivalence Classes and CPDAGs]]
- **PDAG-to-CPDAG completion**: GES calls the completion algorithm after each operator
  — the Meek rules underlie this step → [[CPDAG Orientation - V-Structures and Meek Rules]]
- **NOTEARS comparison**: NOTEARS (score-based but not in CPDAG space) is compared to
  GES in the NOTEARS experiments — GES is the baseline NOTEARS must beat
  → [[NOTEARS Experiments]]
- **DAG Structure Learning Problem**: the general landscape of prior methods, in which
  GES occupies the "score-based local search / order-search" row → [[DAG Structure Learning Problem]]
- **Bayesian score equivalents**: the BDe(u) / BGe Bayesian scores (uniform Dirichlet
  priors) are score-equivalent and can replace BIC in GES for a Bayesian flavour
- **GIES (Hauser & Bühlmann 2012)**: extends GES to interventional data — uses
  interventional Markov equivalence classes (I-MECs) and adds an Intervention phase
- **FGS / FGES**: Fast GES — RAM-efficient, parallelised version (Ramsey et al. 2017)
  used in the Tetrad/causal-learn `FGES` implementation

## See Also
- [[PC Algorithm - Overview]] — constraint-based complement to GES
- [[Markov Equivalence Classes and CPDAGs]] — prerequisite: MEC, CPDAG definitions
- [[CPDAG Orientation - V-Structures and Meek Rules]] — Meek rules used in GES completion
- [[DAG Structure Learning Problem]] — the problem GES and NOTEARS both address
- [[NOTEARS - Overview]] — continuous-optimization alternative; GES is its main baseline
- [[NOTEARS Experiments]] — GES vs NOTEARS on simulated and real graphs
