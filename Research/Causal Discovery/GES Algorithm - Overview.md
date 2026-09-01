---
title: "GES Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - type/theorem
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-sources.md]]"
source_location: "Chickering (2002), JMLR 3:507–554, full paper"
date_ingested: 2026-09-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Orientation and CPDAGs]]"
used_by:
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FGES"
  - "score-based causal discovery"
---

# GES Algorithm — Overview

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. Unlike the PC algorithm which conducts CI tests
> on the data, GES searches the space of **Markov equivalence classes** (CPDAGs) directly,
> greedily maximizing a scoring criterion (BIC or BDeu) in a forward phase (adding edges)
> followed by a backward phase (removing edges). Under faithfulness and a locally consistent
> score, GES is **provably asymptotically optimal**: it returns the true equivalence class.
> GES and FGES (a parallelized fast variant) are among the strongest baselines compared
> against NOTEARS in the benchmark of Zheng et al. (2018).

## Overview

The key insight of GES: instead of searching over individual DAGs (exponentially many),
GES searches over **Markov equivalence classes** — represented as CPDAGs. This is a smaller
and more structured search space: there are far fewer equivalence classes than individual
DAGs, and the space has a natural topology (Insert and Delete operators move between
adjacent classes).

Chickering (2002) proves that greedy search over this space in two phases is **sound and
complete** — it finds the optimal equivalence class — under a faithfulness assumption and
a decomposable, locally consistent scoring criterion. The paper also proves the **Meek
Conjecture** as a key lemma, establishing that any two distinct equivalence classes are
reachable from each other by a sequence of covered edge reversals.

### Historical context

GES builds on earlier work by Chickering (1996), who proved DAG learning NP-hard, and
Meek (1995), who established the CPDAG representation. Chickering (2002) is the paper
that **proves** a simple greedy algorithm over CPDAGs is optimal — an existence result
that elevates GES from a heuristic to a provably correct algorithm.

**FGES** (Fast GES, Ramsey et al. 2017): a parallelized, scalable variant using a priority
queue and parallel edge scoring that handles thousands of variables. FGES is what the
NOTEARS paper actually benchmarks against ("FGS" in Table 1 of Zheng et al. 2018).

## Main Content

### Scoring criterion

> [!definition] Decomposable Score (Chickering 2002, §3)
> A score $Q : \text{DAG} \to \mathbb{R}$ is **decomposable** if it factors over the local
> scores of each node given its parents:
> $$Q(G) = \sum_{i=1}^{d} q(X_i, \text{Pa}_G(X_i))$$
> The most common choices:
>
> - **BIC** (Bayesian Information Criterion, Gaussian case):
>   $$Q_{\text{BIC}}(G) = -\frac{n}{2}\sum_i \log\hat{\sigma}_{i \mid \text{Pa}(X_i)}^2 - \frac{\log n}{2} \sum_i |\text{Pa}(X_i)|$$
>   where $\hat{\sigma}_{i \mid \text{Pa}(X_i)}^2$ is the residual variance of $X_i$
>   given its parents. The first term rewards fit; the second penalizes complexity.
>
> - **BDeu** (Bayesian Dirichlet equivalent uniform, discrete case):
>   The marginal likelihood of the DAG under a Dirichlet prior — equivalent to the
>   Bayesian score with an equivalent sample size hyperparameter.
^def-score

> [!definition] Locally Consistent Score (Chickering 2002, Def. 4.3)
> A score $Q$ is **locally consistent** if, for any DAG $G$ and any pair of adjacent
> nodes $(X_i, X_j)$: (a) if $X_i$ is not independent of $X_j$ given $\text{Pa}(X_j)
> \setminus \{X_i\}$ in the distribution, then the score increases when $X_i$ is
> added as a parent of $X_j$; (b) if $X_j \perp\!\!\!\perp X_i$ given $\text{Pa}(X_j)
> \setminus \{X_i\}$, then the score decreases. BIC and BDeu are locally consistent
> under faithfulness.
^def-locally-consistent

### Two phases of GES

> [!definition] GES Algorithm (Chickering 2002, §5–6)
> **Input**: Data $\mathbf{X}$; decomposable, locally consistent score $Q$.
> **Output**: CPDAG $\hat{C}$ of the highest-scoring equivalence class.
>
> **Phase 1 — Forward Equivalence Search (FES)**:
> - Start with the **empty CPDAG** $C_0 = \emptyset$ (no edges).
> - **Repeat**:
>   - For all pairs $(X_i, X_j)$ not adjacent in $C$, compute the best **Insert** operator:
>     add the edge $X_i \to X_j$ to produce a higher-scoring CPDAG via the InsertA rule.
>   - Select the Insert that maximizes the score gain $\Delta Q$.
>   - If $\Delta Q > 0$: apply Insert, update $C$.
>   - Else: **break** (no insert improves the score).
> - Output: $C_1$ (the FES result, a CPDAG).
>
> **Phase 2 — Backward Equivalence Search (BES)**:
> - Start with $C_1$.
> - **Repeat**:
>   - For all edges in $C$, compute the best **Delete** operator:
>     remove an edge from the current CPDAG to produce a higher-scoring CPDAG.
>   - Select the Delete that maximizes the score gain $\Delta Q$.
>   - If $\Delta Q > 0$: apply Delete, update $C$.
>   - Else: **break**.
> - Output: $\hat{C} = C_2$ (the final CPDAG).
^def-ges

> [!note] Why two phases?
> The **FES phase** may add too many edges because it is greedy: it can commit to edges
> that look locally beneficial but are globally suboptimal. The **BES phase** corrects
> this by removing edges that no longer help once the full structure is visible. Chickering
> proves (Theorem 15, the Meek Conjecture result) that this two-phase structure is
> sufficient: if the FES phase reaches a supergraph of the true DAG, the BES phase can
> always find the true equivalence class via single-edge removals. This relies on the
> decomposability of the score.

### The Insert and Delete operators

> [!definition] Insert Operator (Chickering 2002, Def. 5.1)
> $\text{Insert}(X_i, X_j, T)$: given a CPDAG $C$, add the edge $X_i \to X_j$
> with a subset $T \subseteq \text{Adj}(X_j) \setminus \text{Adj}(X_i)$ that becomes
> the new parents of $X_j$ through $X_i$. The score gain is:
> $$\Delta Q_{\text{Insert}} = q(X_j, \text{Pa}(X_j) \cup T \cup \{X_i\}) - q(X_j, \text{Pa}(X_j) \cup T)$$
> Feasibility conditions ensure the resulting graph is still a valid CPDAG.
^def-insert

> [!definition] Delete Operator (Chickering 2002, Def. 5.2)
> $\text{Delete}(X_i, X_j, H)$: remove the edge $X_i - X_j$ (directed or undirected)
> from the CPDAG, disconnecting a subset $H$ of neighbors. The score gain is:
> $$\Delta Q_{\text{Delete}} = q(X_j, \text{Pa}(X_j) \setminus \{X_i\}) - q(X_j, \text{Pa}(X_j))$$
> Feasibility ensures the result is a valid CPDAG.
^def-delete

### Main consistency theorem

> [!theorem] Theorem: GES Optimality (Chickering 2002, Theorem 15)
> Let $Q$ be a locally consistent, decomposable scoring criterion. Under the **faithfulness**
> assumption and **causal sufficiency** (no latent confounders), if the data are
> generated from a DAG $G^*$ faithful to the true distribution $\mathbb{P}$:
>
> **With sufficient data** (oracle setting with infinite $n$):
> GES returns the CPDAG of $G^*$ — the unique maximizer of $Q$ over all DAGs.
>
> **With finite data** (BIC score, Gaussian case):
> Under appropriate conditions on $n$ and $d$, the BIC score is locally consistent,
> and GES converges to the true equivalence class with high probability as $n \to \infty$.
>
> **Key lemma (Meek Conjecture, Lemma 12)**: If $G_1$ and $G_2$ are DAGs in different
> Markov equivalence classes and $Q(G_2) > Q(G_1)$, then there exists a sequence of
> **covered edge reversals** converting $G_1$ to a DAG in $[G_2]$'s class, each
> strictly increasing the score. This is what makes the two-phase greedy search sufficient.
^thm-ges-consistency

### FGES: parallelized variant

FGES (Fast GES, Ramsey et al. 2017):
- Same two-phase structure but uses a **priority queue** to avoid recomputing all edge
  scores at each step — only scores affected by the last Insert/Delete are updated.
- **Parallelizes** score computations across variables.
- Scales to thousands of variables ($d \sim 10{,}000$) on genomics data.
- This is the "FGS" benchmark in NOTEARS Table 1.

## Connections

- **vs. PC**: GES is score-based; PC is constraint-based. GES's FES phase operates on
  equivalence classes (CPDAGs) while PC tests individual conditional independences.
  See [[Constraint vs Score-Based Causal Discovery]].
- **vs. NOTEARS**: NOTEARS replaces combinatorial search (GES/PC) with continuous
  optimization of a score ($\ell_1$-penalized LS) subject to the smooth acyclicity
  constraint $h(W)=0$. NOTEARS is a single-phase algorithm; GES is two-phase.
  See [[NOTEARS - Overview]] and [[DAG Structure Learning Problem]].
- **BIC connection**: The BIC score used by GES is asymptotically equivalent (up to
  constants) to minus the $\ell_1$-penalized LS score in NOTEARS for the Gaussian SEM.
  The algorithms differ in how they optimize the score (greedy equivalence vs. continuous).

## See Also
- [[PC Algorithm - Overview]] — the constraint-based counterpart
- [[PC Algorithm - Orientation and CPDAGs]] — CPDAGs, Meek rules, shared concepts
- [[Constraint vs Score-Based Causal Discovery]] — full comparison
- [[DAG Structure Learning Problem]] — GES in context (Table 1 of NOTEARS paper)
- [[NOTEARS - Overview]] — the continuous optimization approach
- [[Causal Discovery/_Index|Causal Discovery Index]]
