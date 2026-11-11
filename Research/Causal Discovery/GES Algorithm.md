---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-structure-learning-sources.md]]"
source_location: "Chickering (2002) JMLR 3:507–554; Meek (1997)"
date_ingested: 2026-11-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAG]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGS"
  - "Fast Greedy Search"
  - "Chickering 2002"
  - "score-based structure learning"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for DAG structure learning. Rather than operating on individual DAGs, GES
> searches directly in the space of **Markov equivalence classes (CPDAGs)**, using
> greedy moves that maximise a decomposable score (BIC for Gaussian data). It proceeds in
> two phases: a **forward search** that adds edges (starting from the empty graph) and a
> **backward search** that removes edges. Chickering (2002) proves that GES is
> **consistent** — it recovers the CPDAG of the true DAG in the large-sample limit under
> faithfulness, Markov, and causal-sufficiency assumptions. The practical variant **FGS**
> (Fast Greedy Search) achieves the same asymptotic guarantees with lower constant factors.

## Overview

The key insight behind GES is Chickering's (1995) **covered-edge characterisation**
([[Markov Equivalence and CPDAG#^thm-chickering-covered]]): any two Markov-equivalent DAGs
can be connected by a sequence of **covered edge reversals**. This means the space of
equivalence classes (CPDAGs) can be navigated by local graph operations — adding and
removing edges while maintaining a valid CPDAG — without enumerating individual DAGs.

GES thus avoids two problems:
1. The combinatorial explosion of searching over all $2^{O(p^2)}$ DAGs.
2. Repeated checking of the acyclicity constraint (the hard part of score-based combinatorial
   search).

The price is that greedy search over CPDAGs does not in general find the global optimum
at finite sample sizes. The consistency guarantee is *asymptotic*: with enough data, GES
finds the right answer.

## Main Content

### Scoring Criterion

> [!definition] Definition: Decomposable Score
> A score $Q(\mathcal{G}, \mathbf{X})$ is **decomposable** if it factors as a sum over
> nodes and their parent sets:
> $$Q(\mathcal{G}, \mathbf{X}) = \sum_{j=1}^{p} q(X_j, \mathrm{Pa}(X_j), \mathbf{X}),$$
> where $\mathbf{X}$ is the data matrix. Decomposability means that inserting or deleting
> one edge only requires recomputing the local score of the affected node.
^def-decomposable-score

The two standard decomposable scores are:

**BIC for Gaussian data** (Gaussian GES):
$$Q_{\text{BIC}}(\mathcal{G}, \mathbf{X}) = \sum_{j} \left[ n \log \hat\sigma_j^2(\mathrm{Pa}(X_j)) + k_j \log n \right],$$
where $\hat\sigma_j^2(\mathrm{Pa}(X_j))$ is the residual variance of regressing $X_j$ on
its parents and $k_j = |\mathrm{Pa}(X_j)| + 1$ is the number of parameters. GES **minimises**
this score (lower BIC = better fit with penalty for complexity).

**BDe for discrete data** (Bayesian Dirichlet equivalent; Heckerman et al. 1995): the
Bayesian score for multinomial CPTs with Dirichlet priors. Exactly score-equivalent
(gives the same score to Markov-equivalent DAGs) and consistent.

> [!note] Score equivalence
> Both BIC and BDe are **score equivalent**: all DAGs in the same Markov equivalence class
> receive the same score. This is essential for GES — without score equivalence, the
> greedy moves over CPDAGs would not reliably find the optimal equivalence class.

### The Two-Phase Algorithm

> [!definition] GES Algorithm (Chickering, 2002)
>
> **Input**: Data matrix $\mathbf{X} \in \mathbb{R}^{n \times p}$; decomposable score $Q$.
>
> **Phase 1 — Forward Equivalence Search (FES):**
>
> 1. Initialise: CPDAG $\mathcal{C} \leftarrow$ empty graph (no edges).
> 2. While an edge insertion improves the score:
>    - Find the **Insert** operator $(X, Y, \mathbf{T})$ that maximally increases $Q$:
>      add directed edge $X \to Y$ (with $\mathbf{T}$ a subset of non-adjacent neighbours
>      of $Y$ pointing into $Y$).
>    - Apply the operator to $\mathcal{C}$; complete the CPDAG using Meek's rules.
> 3. Output: CPDAG $\mathcal{C}_{\text{FES}}$.
>
> **Phase 2 — Backward Equivalence Search (BES):**
>
> 1. Initialise: CPDAG $\mathcal{C} \leftarrow \mathcal{C}_{\text{FES}}$.
> 2. While an edge deletion improves the score:
>    - Find the **Delete** operator $(X, Y, \mathbf{H})$ that maximally increases $Q$:
>      remove edge between $X$ and $Y$ (with $\mathbf{H}$ a subset of common neighbours).
>    - Apply the operator; complete the CPDAG using Meek's rules.
> 3. **Output**: CPDAG $\mathcal{C}_{\text{GES}}$.
^def-ges-algorithm

The Insert and Delete operators are defined precisely in Chickering (2002) to ensure that
each move transitions between valid CPDAGs (no cycles, correct orientation rules). The
score change for each move is computed **locally** thanks to decomposability — only the
score of node $Y$ changes when inserting $X \to Y$.

### The Meek Conjecture / GES Consistency Theorem

The central result that makes GES theoretically justified:

> [!theorem] Theorem: GES Consistency (Chickering, 2002, Main Theorem)
> Let $\mathcal{G}^*$ be the true DAG satisfying:
> (a) the Causal Markov condition, (b) faithfulness, (c) causal sufficiency, (d) acyclicity.
> Let $Q$ be a consistent, score-equivalent, decomposable scoring criterion
> (e.g., BIC). As $n \to \infty$:
> $$\Pr\left[\mathcal{C}_{\text{GES}} = \text{CPDAG}(\mathcal{G}^*)\right] \to 1.$$
> That is, GES returns the CPDAG of the true DAG with probability tending to 1.
^thm-ges-consistency

The proof proceeds in two parts, corresponding to the two phases:

1. **FES consistency**: Under the population score (infinite data), every greedy insertion
   step in FES is a move *toward* the true equivalence class. FES terminates at a
   CPDAG that is a subgraph of the true skeleton.

2. **BES consistency**: Starting from the FES output (which may be a dense supergraph),
   every greedy deletion step removes exactly the spurious edges. BES terminates at the
   true CPDAG.

The critical lemma used is Chickering (1995)'s covered-edge theorem: by moving through
covered edge reversals, the algorithm can reach any CPDAG in the equivalence class from
any other — proving that FES cannot overshoot and that BES can always eliminate spurious
edges one by one.

### GES vs. PC: Key Differences

| Property | PC | GES |
|----------|-----|-----|
| **Approach** | Constraint-based (CI tests) | Score-based (BIC/BDe optimisation) |
| **Search space** | Tests edges sequentially | Greedy moves over CPDAGs |
| **Output** | CPDAG | CPDAG |
| **Order dependence** | Yes (PC); fixed by PC-stable | No (order-independent by design) |
| **Complexity** | $O(p^{d^*+2})$ CI tests | $O(p^2)$ score evaluations per step (Gaussian) |
| **Assumptions** | Markov, faithfulness, sufficiency | Markov, faithfulness, sufficiency |
| **Latent variables** | No (use FCI) | No (not easily extended) |
| **Preferred when** | Good CI tests available; large $d^*$ | Gaussian data; moderate $p$ |

GES has a theoretical advantage: it is fully **order-independent** and the greedy moves
are well-defined in terms of optimising the score. PC's behaviour depends on the order
in which CI tests are performed (unless PC-stable is used). In practice, both are competitive
on moderate-sized Gaussian data.

### Fast Greedy Search (FGS)

**FGS** (Ramsey et al., 2016) is an optimised implementation of GES used in the Tetrad
software and in the NOTEARS benchmarks ([[NOTEARS Experiments]]). FGS achieves the same
asymptotic guarantees as GES with significantly better constant factors by:
1. Caching score increments so that only affected entries are recomputed after each insertion.
2. Parallelizing the search for the best insert/delete operator.
3. Using a priority queue over candidate edge additions.

The [[NOTEARS Experiments]] compares against FGS (not GES directly) and reports that NOTEARS
outperforms FGS on denser graphs (SF-4) while being competitive on sparse ones (ER-2).

## Examples

> [!example] Example: GES Forward Phase on Four Variables
> **Data**: $n = 500$, $p = 4$ variables, true DAG: $X_1 \to X_3 \leftarrow X_2 \to X_4$.
>
> **FES step 1**: Compute all $\binom{4}{2} = 6$ pairwise BIC improvements. The insertion
> that most improves BIC might be $X_2 \to X_4$ (the edge with the strongest marginal
> association). Apply it; $\mathcal{C} = \{X_2 \to X_4\}$.
>
> **FES step 2**: Re-compute score improvements for all 5 remaining pairs and their
> conditioning sets. Best: $X_2 \to X_3$. Apply; Meek rules may orient further edges.
>
> **FES continues** until adding any edge worsens BIC (or no improvement above zero).
>
> **BES**: The BES phase then removes any edges that were added in FES but are not in the
> true skeleton (spurious insertions due to finite $n$).
>
> **Output**: The CPDAG — $X_1 - X_3 \leftarrow X_2 \to X_4$, with $X_1 - X_3$ undirected
> (Markov equivalent to both $X_1 \to X_3$ and $X_1 \leftarrow X_3$).

## Connections

- **[[Markov Equivalence and CPDAG]]**: GES is defined and understood only through this
  framework. The search space is the space of CPDAGs, not individual DAGs.
- **[[PC Algorithm]]**: constraint-based alternative. Both output CPDAGs under the same
  assumptions. GES is preferred for Gaussian data; PC is preferred when good nonparametric
  CI tests are available.
- **[[DAG Structure Learning Problem]]**: GES is the canonical "local / approximate search"
  method in the landscape table ([[DAG Structure Learning Problem#thm-program4]]); NOTEARS
  is the continuous-optimisation alternative.
- **[[NOTEARS Experiments]]**: GES is listed as a baseline in NOTEARS experiments (reported
  in supplement); FGS is the main competitor.

## See Also
- [[Markov Equivalence and CPDAG]] — prerequisite; defines CPDAG, v-structures, Meek rules
- [[PC Algorithm]] — constraint-based alternative; same output format
- [[DAG Structure Learning Problem]] — sets up the combinatorial score-based learning problem
- [[NOTEARS - Overview]] — continuous-optimisation approach; GES/FGS is its main competitor
- [[NOTEARS Experiments]] — empirical comparison including GES/FGS baselines
