---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-JMLR.pdf]]"
source_location: "Full paper, JMLR Vol. 3, pp. 507–554"
date_ingested: 2026-08-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Constraint-Based Causal Discovery]]"
used_by:
  - "[[Causal Structure Learning - Methods Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering 2002, *JMLR* 3:507–554) is the canonical **score-based** algorithm for
> causal structure learning. Instead of conducting conditional independence tests (like the
> [[PC Algorithm - Constraint-Based Causal Discovery|PC algorithm]]), GES performs a
> **greedy search over the space of Markov equivalence classes** (CPDAGs), using a
> **decomposable score** (BIC or BDeu) to evaluate each step. Under the Markov, faithfulness,
> and causal sufficiency assumptions, GES is **consistent**: in the large-sample limit it
> recovers the true CPDAG exactly. Chickering (2002) also proved the **Meek Conjecture**,
> which underlies the correctness of both GES and PC's orientation phase.

## Overview

Score-based DAG learning searches for the DAG $G^*$ that maximises a score $Q(G)$ over all DAGs.
The difficulty: the space of DAGs is combinatorial and grows superexponentially in $d$ nodes
(Robinson 1977), making exhaustive search intractable beyond ~20 nodes.

**GES's key insight**: rather than searching over individual DAGs, search over **Markov
equivalence classes** of DAGs, each uniquely represented by a CPDAG. Equivalence classes are
fewer in number than DAGs, and the greedy moves within equivalence class space can be
characterised geometrically — the fundamental result Chickering (2002) proves as the Meek Conjecture.

GES was later extended to FGES (Fast GES, Ramsey et al. 2017), which scales to thousands of
variables, and to the interventional setting (IGSP, IGRS). The original GES is implemented in
the `pcalg` R package (`ges()`) and the `causal-learn` Python library.

## Main Content

### Score Function Requirements

GES requires a **decomposable**, **consistent** score:

> [!definition] Definition: Decomposable Score
> A score $Q(G, \mathbf{X})$ is **decomposable** if it can be written as a sum of
> local scores over each node and its parents:
> $$Q(G, \mathbf{X}) = \sum_{j=1}^{d} q(X_j, \mathrm{pa}_G(X_j), \mathbf{X})$$
> where $q$ depends only on $X_j$ and its parents. Decomposability means that adding or
> removing a single edge changes only the terms involving the endpoint nodes — enabling
> efficient local score updates during the greedy search.
^def-decomposable-score

> [!definition] Definition: Score Consistency
> A score $Q$ is **consistent** (for structure learning) if, as $n \to \infty$:
> 1. The true DAG $G^*$ has strictly higher score than any non-Markov-equivalent DAG.
> 2. Among Markov-equivalent DAGs, all achieve the same score.
>
> The **BIC score** is a consistent decomposable score for linear Gaussian SEMs:
> $$Q_{\mathrm{BIC}}(G, \mathbf{X}) = -2\log\hat{L}(G) + k(G) \log n$$
> where $\hat{L}(G)$ is the maximised log-likelihood and $k(G)$ the number of free parameters.
> The **BDeu score** (Bayesian Dirichlet equivalence uniform) serves the same role for
> discrete variables with an uninformative prior.
^def-score-consistency

### The Two-Phase GES Algorithm

> [!theorem] Algorithm: GES (Chickering 2002)
> **Input**: data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$, decomposable consistent score $Q$.
> **Output**: estimated CPDAG $\hat{C}$.
>
> **Phase 1 — Forward Equivalence Search (FES):**
> 1. Initialise: $\hat{C} \leftarrow$ empty graph (no edges).
> 2. Repeat until no improvement:
>    a. For every pair $(i,j)$ not yet adjacent in $\hat{C}$, and for every valid insert operator
>       (adding edge $i \to j$ in some DAG in the equivalence class of $\hat{C}$), compute the
>       score gain $\Delta Q$.
>    b. Apply the insert with the largest $\Delta Q > 0$.
>    c. Update $\hat{C}$ to the new equivalence class.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> 1. Repeat until no improvement:
>    a. For every edge in $\hat{C}$, and for every valid delete operator
>       (removing that edge from some DAG in the equivalence class of $\hat{C}$), compute
>       $\Delta Q$.
>    b. Apply the delete with the largest $\Delta Q > 0$.
>    c. Update $\hat{C}$ to the new equivalence class.
^thm-ges-algorithm

> [!note] Why a backward phase after greedy forward search?
> The forward phase can overshoot: it adds edges until no single addition improves the score,
> but the added edges may be artifacts — the score improvement from one spurious edge can
> enable other spurious edges to be added. The backward phase corrects this by greedily
> removing edges that no longer contribute positively, yielding a cleaner CPDAG.
> Chickering (2002) proves that if the true CPDAG is $C^*$, then FES reaches a CPDAG with
> at least as many edges as $C^*$ (no true edges are missed in the forward phase), and BES
> recovers $C^*$ exactly.

### The Insert and Delete Operators

The key technical contribution is a precise characterisation of valid moves in equivalence-class space:

> [!definition] Definition: Insert and Delete Operators (Chickering 2002)
> **Insert$(i, j, T)$**: Add edge $i \to j$ to the current equivalence class, where $T$ is a
> subset of the neighbours of $j$ in $\hat{C}$ that are *not* adjacent to $i$. Valid iff
> the induced subgraph on $T \cup \{i\}$ is a clique and $i$ is not in any
> semi-directed path from $j$ to $i$ (acyclicity preservation).
>
> **Delete$(i, j, H)$**: Remove edge $i$–$j$, where $H$ is a subset of the common
> neighbours of $i$ and $j$ in $\hat{C}$. Valid iff the induced subgraph on $H \cup \{i\}$
> is a clique.
>
> The score change for each operator decomposes locally by the decomposability of $Q$.
^def-operators

### The Meek Conjecture — Chickering's Core Result

The theoretical foundation of GES (and of PC's orientation phase) is:

> [!theorem] Meek Conjecture / Theorem (Chickering 2002, Theorem 15)
> Every DAG $G$ in an equivalence class $\mathcal{E}$ can be reached from any other DAG
> $G'$ in $\mathcal{E}$ by a sequence of **covered edge reversals** — a covered edge $i \to j$
> is one where $\mathrm{pa}(j) = \mathrm{pa}(i) \cup \{i\}$.
>
> **Significance for GES**: this means the search space is connected — from any
> CPDAG, greedy insert/delete moves can reach the true CPDAG. There are no local optima that
> trap the algorithm in an unreachable region. Combined with score consistency, this
> guarantees GES recovers $C^*$ in the large-sample limit.
^thm-meek-conjecture

### Consistency Guarantee

> [!theorem] GES Consistency (Chickering 2002, Theorem 15)
> Assume:
> (a) Causal Markov condition,
> (b) Faithfulness (see [[PC Algorithm - Constraint-Based Causal Discovery#^def-faithfulness]]),
> (c) Causal sufficiency (see [[PC Algorithm - Constraint-Based Causal Discovery#^def-causal-sufficiency]]),
> (d) Decomposable consistent score $Q$.
>
> Then as $n \to \infty$, GES returns the true CPDAG $C^*$ with probability 1.
^thm-ges-consistency

### Complexity

- **Time**: $O(d^3)$ per forward step (local score evaluation), $O(d^2)$ steps in the forward
  phase in the worst case → $O(d^5)$ overall for a dense graph. In practice, the true graph is
  sparse and GES is much faster.
- **FGES** (Ramsey et al. 2017): parallelises the score evaluations; scales to $d \sim 10^4$ nodes.
- **Memory**: $O(d^2)$ for the adjacency representation of $\hat{C}$.

## Examples

> [!example] Example: GES Recovering a 3-Node DAG
> True DAG: $X_1 \to X_2 \leftarrow X_3$ (v-structure). Score: BIC.
>
> **FES:**
> - Start: empty graph. Score $= Q(\emptyset)$.
> - Best insert: $X_1$–$X_2$. Add it: gain $\Delta Q > 0$. New CPDAG: $X_1$–$X_2$.
> - Next best: $X_2$–$X_3$. Add it. New CPDAG: $X_1$–$X_2$–$X_3$.
> - Try $X_1$–$X_3$: No score gain (faithfulness: $X_1 \perp\!\!\!\perp X_3$ marginally). Stop FES.
>
> **BES:**
> - All edges contribute positively. No deletions improve score. Stop BES.
> - Apply Meek rules to orient: $X_1$–$X_2$–$X_3$ with $X_1$ and $X_3$ not adjacent
>   → unshielded triple. Check sep-set: originally, $X_1$ and $X_3$ were d-separated
>   (for the empty conditioning set, marginally independent). So $X_2 \notin \mathrm{sep}(X_1,X_3)$
>   (the sep-set is $\emptyset$, not $\{X_2\}$).
>   → Orient as v-structure: $X_1 \to X_2 \leftarrow X_3$. ✓

## Connections

- **PC algorithm**: PC is constraint-based (CI tests), GES is score-based. Both output a CPDAG.
  GES is preferred when sample sizes are large and the Gaussian/decomposable score assumption
  holds; PC is preferred when CI tests are well-calibrated or data are non-Gaussian (using
  kernel CI tests). See [[Causal Structure Learning - Methods Comparison]].
- **NOTEARS**: NOTEARS estimates a continuous weighted adjacency matrix $W$ directly (bypassing
  CPDAG representation), benchmarks against GES in experiments, and generally matches GES on
  dense/large graphs — see [[NOTEARS Experiments]] (Table 1: GES baseline is included).
- **DAG Structure Learning Problem**: GES is one of the "local / approximate search" methods
  listed in the landscape table of [[DAG Structure Learning Problem]]. The Meek Conjecture
  (proved by Chickering) underlies the "FGS" entry in that table.
- **BIC connection**: BIC in the GES scoring context is exactly the model selection criterion
  from [[Overfitting and Information Criteria]] — but applied to the structural model rather than
  the coefficient estimates.

## See Also
- [[PC Algorithm - Constraint-Based Causal Discovery]] — constraint-based counterpart
- [[Causal Structure Learning - Methods Comparison]] — three-way comparison with NOTEARS
- [[DAG Structure Learning Problem]] — formal SEM setup and score definitions
- [[NOTEARS Algorithm]] — how NOTEARS avoids the CPDAG representation entirely
- [[NOTEARS Experiments]] — GES used as a baseline (FGS is FGES, a fast variant)
- [[Directed Acyclic Graphs]] — d-separation, Markov equivalence class background
- [[Causal Discovery/_Index|Causal Discovery Index]]
