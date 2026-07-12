---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-JMLR.md]]"
source_location: "Chickering (2002) JMLR 3:507–554"
date_ingested: 2026-07-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES algorithm"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FGES"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is a score-based causal discovery algorithm that searches the space
> of **CPDAGs** (Markov equivalence classes) directly, rather than individual DAGs. It has two
> phases: a **forward phase** that greedily adds edges to maximize a decomposable score (e.g. BIC),
> and a **backward phase** that removes edges. Under the Markov + faithfulness assumptions and with
> a score-equivalent consistent scoring criterion, GES is **asymptotically correct**: it recovers
> the CPDAG of the true data-generating DAG in the large-sample limit. GES avoids the multiple
> testing problem of constraint-based methods but requires a score and assumes linear-Gaussian
> data (if using BIC/BGe) or a discrete model (if using BDe).

## Overview

GES stands in contrast to [[PC Algorithm]] in that it replaces CI testing with score maximization.
Both methods target the CPDAG, but GES has several practical advantages for finite samples:
- No multiple-testing problem from many CI tests.
- A single tuning-free criterion (BIC is self-regularizing: the $\log n$ penalty adapts to $n$).
- The greedy CPDAG search is less sensitive to individual test errors.

The key insight behind GES is **score equivalence**: a score-equivalent criterion (like BIC or BGe)
assigns identical scores to all DAGs in the same Markov equivalence class. This means searching
over CPDAGs — not individual DAGs — and comparing scores of CPDAGs directly. Chickering (2002)
proved that GES is optimal over CPDAGs under the faithfulness assumption.

## Main Content

### Scoring Criteria

> [!definition] Definition: BIC Score (Bayesian Information Criterion)
> For a DAG $G$ with $d$ variables, $n$ observations, and maximum likelihood parameters $\hat\theta_G$:
> $$\text{BIC}(G, \mathcal{D}) = \log p(\mathcal{D} \mid \hat\theta_G, G) - \frac{\log n}{2} \cdot \dim(G)$$
> where $\dim(G) = \sum_{i=1}^d |\text{Pa}(X_i)| + 1$ (number of free parameters for Gaussian SEM).
>
> **Decomposability:** $\text{BIC}(G) = \sum_{i=1}^d S(X_i, \text{Pa}(X_i))$ where $S$ is the
> local BIC score for node $X_i$ given its parents. Only the modified node's local score must be
> recomputed after each edge insert/delete.
^def-bic

> [!definition] Definition: BGe Score (Bayesian Gaussian Equivalent Score)
> The marginal likelihood of data $\mathcal{D}$ under a multivariate Gaussian model with a
> Normal-Wishart conjugate prior. BGe is also **decomposable** and satisfies **score equivalence**
> (Geiger & Heckerman 1994).
> BGe is preferred over BIC when: (a) $n$ is small (proper Bayesian regularization), or (b) prior
> beliefs about edge probability or coefficient magnitude are available.
^def-bge

> [!definition] Definition: Score Equivalence
> A scoring criterion $S(G, \mathcal{D})$ is **score equivalent** if Markov-equivalent DAGs receive
> identical scores:
> $$G_1 \sim G_2 \implies S(G_1, \mathcal{D}) = S(G_2, \mathcal{D}).$$
> Score equivalence enables GES to work directly with CPDAGs — the score of a CPDAG is well-defined
> as the common score of all its member DAGs. BIC and BGe are score equivalent.
^def-score-equiv

### GES Algorithm

> [!definition] GES: Forward-Backward CPDAG Search (Chickering 2002)
> **Initialise:** $\mathcal{C}_0$ = empty CPDAG (no edges; all $d$ variables isolated).
>
> ---
> **Phase 1: Forward Equivalence Search (FES)**
> Repeat:
> - For each valid **Insert** operator $(X_i, X_j, T)$ (adds the edge $X_i \to X_j$ in a way
>   that preserves valid-CPDAG structure, with a "turning set" $T \subseteq \text{Adj}(X_j)$):
>   - Compute the score change $\Delta(X_i, X_j, T) = S(X_j, \text{Pa}(X_j) \cup \{X_i\}) - S(X_j, \text{Pa}(X_j))$
>     (local score improvement for $X_j$).
> - Select the Insert with the maximum positive $\Delta$.
> - If max $\Delta > 0$: apply the Insert, update $\mathcal{C}$ to the resulting CPDAG.
> - Else: break (no score-improving insert exists).
>
> ---
> **Phase 2: Backward Equivalence Search (BES)**
> Repeat:
> - For each valid **Delete** operator $(X_i, X_j, H)$ (removes the edge $X_i$–$X_j$):
>   - Compute the score change $\Delta(X_i, X_j, H)$ (local score change for the modified nodes).
> - Select the Delete with the maximum positive $\Delta$.
> - If max $\Delta > 0$: apply the Delete, update $\mathcal{C}$.
> - Else: break.
>
> **Return:** Final CPDAG $\mathcal{C}$.
^def-ges-algo

### Why Two Phases?

> [!note] Why a Forward then Backward Pass?
> **FES** (forward) can add too many edges in finite samples: the BIC penalty may not fully
> compensate for overfitting with limited data, leading to a supergraph of the true CPDAG.
> **BES** (backward) corrects this by removing spurious edges. In the large-sample limit,
> FES adds no spurious edges and BES makes no deletions — they are both needed for finite
> samples.
>
> Contrast with greedy hill-climbing over individual DAGs, which can add/remove edges but
> has no guarantee that the final graph is the CPDAG of any equivalence class.

### The Insert and Delete Operators

> [!definition] Insert and Delete Operators (Chickering 2002, §3)
> **Insert$(X_i, X_j, T)$:** Given current CPDAG $\mathcal{C}$, valid if the resulting graph
> (after inserting $X_i \to X_j$ and orienting edges in $T \cup X_j$'s neighbours consistently)
> represents a valid equivalence class. Chickering gives an $O(d^2)$ validity check.
>
> **Delete$(X_i, X_j, H)$:** Removes the undirected or directed edge between $X_i$ and $X_j$,
> with $H$ a subset of the "adjacents" of $X_j$ that become disconnected from $X_i$. Also
> $O(d^2)$ to check validity.
>
> Both operators maintain the invariant that the graph is a valid CPDAG throughout search.
^def-ges-operators

### Correctness Theorem

> [!theorem] Theorem: GES Oracle Consistency (Chickering 2002, Theorem 15)
> Assume:
> 1. The Markov condition and faithfulness hold (true distribution $P$ is faithful to the true DAG $G^*$).
> 2. The scoring criterion $S$ is **score equivalent** and **consistent**: for large $n$,
>    $S(G, \mathcal{D}) > S(G', \mathcal{D})$ iff $G$ is "closer" to $G^*$ in a precise sense.
>    BIC and BGe satisfy this under $n\to\infty$.
>
> Then GES recovers the **CPDAG of $G^*$** as $n \to \infty$.
>
> **Proof sketch (two parts):**
> - *FES consistency:* In the large-sample limit, BIC penalises every spurious edge; the forward
>   phase terminates at a CPDAG that is a supergraph of the true CPDAG (no false negatives, but
>   possibly false positives in finite samples).
> - *BES consistency:* In the large-sample limit, BIC rewards removal of every spurious edge;
>   the backward phase removes all such edges, leaving the true CPDAG.
^thm-ges-consistent

### Comparison: GES vs PC

| Dimension | GES | PC |
|-----------|-----|----|
| **Search space** | CPDAGs (equivalence classes) | Pairwise adjacencies |
| **Decision rule** | Score improvement (BIC/BGe) | CI test rejection |
| **Tuning** | None (BIC self-regularizes) | $\alpha$ (significance level) |
| **Multiple testing** | Not an issue (one score) | $O(d^{k+2})$ tests → FWER accumulation |
| **Finite-sample** | Can overfit in FES; BES corrects | Can misidentify v-structures |
| **Distributional assumptions** | Gaussian (BIC/BGe) or discrete (BDe) | Depends on CI test |
| **Scalability** | $O(d^2)$ per step, $O(d^{k+2})$ steps | $O(d^{k+2})$ tests |
| **Interventional data** | Extended by GIES (Hauser & Bühlmann 2012) | Extended by IGSP |

### Faster GES: FGES

> [!note] FGES (Fast GES, Ramsey et al. 2017)
> The `FGES` (Fast Greedy Equivalence Search) algorithm implements GES with computational
> optimizations for large graphs ($d$ up to thousands):
> - **Parallelization:** Score changes for different edges computed in parallel.
> - **Adjacency tracking:** Only "touched" adjacencies rescored after each insert/delete.
> - **Efficient CPDAG updates:** Use the Meek rules incrementally rather than recomputing
>   from scratch after each step.
>
> FGES achieves runtime $O(d^2 \cdot s^3)$ where $s$ is the max neighborhood size,
> enabling GES on $d \sim 1000$ variables.
^note-fges

## Examples

> [!example] Example: GES on a 3-Variable DAG
> **True DAG:** $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to X_3$ (a "chain with shortcut").
>
> **FES:**
> - Start: empty graph (BIC of isolated nodes).
> - Test Insert $(X_1, X_2, \emptyset)$: BIC improves. Apply → $X_1 \to X_2$.
> - Test Insert $(X_1, X_3, \emptyset)$ and $(X_2, X_3, \emptyset)$: both improve BIC.
>   Select the one with higher $\Delta$, say $(X_2, X_3)$. Apply → $X_2 \to X_3$.
> - Next best Insert is $(X_1, X_3)$: apply → $X_1 \to X_3$ or as part of the CPDAG.
> - No more improving inserts. FES terminates.
>
> **BES:**
> - Check all deletes: in large-sample limit, no delete improves BIC (all edges are in the
>   true DAG). BES terminates immediately.
>
> **Output CPDAG:** Depends on which edges are compelled vs. reversible.
> Here, $X_2 \to X_3$ is compelled (part of a v-structure? No — $X_1$ is adjacent to both
> $X_2$ and $X_3$, so $X_1$–$X_2$–$X_3$ is a *shielded* triple, not a v-structure). The
> CPDAG has $X_1 \to X_2$ and $X_1 \to X_3$ compelled (by Meek R1), and $X_2$–$X_3$ reversible.
^ex-ges

## Software

> [!note] R Implementation: pcalg::ges()
> ```r
> library(pcalg)
> # Gaussian data: use BIC score via new("GaussL0penObsScore", data)
> score <- new("GaussL0penObsScore", data = my_data)
> ges_result <- ges(score)
> cpdag <- ges_result$essgraph  # CPDAG as EssGraph object
> plot(cpdag)
> ```
>
> For discrete data: `new("DiscrL0penObsScore", data = my_data)` (BDe score).
> For interventional data (GIES): `gies(score, targets = list(...))`.
^note-ges-r

## Connections

- **Requires score equivalence**: relies on BIC/BGe treating all DAGs in the same equivalence
  class equally — see [[Markov Equivalence and CPDAGs#^def-score-equiv]].
- **NOTEARS as a complement**: NOTEARS identifies a single DAG under a linear SEM assumption,
  circumventing the equivalence class ambiguity — see [[NOTEARS - Overview]]. The NOTEARS paper
  empirically benchmarks against GES in [[NOTEARS Experiments]].
- **PC as the constraint-based analogue**: GES and PC target the same CPDAG, using different
  statistical evidence (score vs. CI tests) — see [[PC Algorithm]].
- **Method of Simulated Moments for ABMs**: GES and PC could be applied to ABM output data to
  recover causal structure from simulated agents — connecting to [[Method of Simulated Moments]]
  and gap #25 in the Dream index.
- **Bayesian Networks**: GES searches the same space as Bayesian Network structure learning with
  BDe/BIC scores — see [[BN Construction Methods Comparison]].

## See Also
- [[Markov Equivalence and CPDAGs]] — the search space GES operates in
- [[PC Algorithm]] — constraint-based alternative
- [[Constraint-Based Causal Discovery]] — the CI-testing paradigm
- [[Conditional Independence Tests for Structure Learning]] — what PC uses instead of a score
- [[DAG Structure Learning Problem]] — the formal problem GES solves
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[NOTEARS Experiments]] — empirical comparison of GES vs PC vs NOTEARS
- [[BN Construction Methods Comparison]] — broader Bayesian network structure comparison
