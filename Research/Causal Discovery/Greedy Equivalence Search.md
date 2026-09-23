---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-JMLR.md]]"
source_location: "Chickering (2002) JMLR Vol. 3, pp. 507-554; §4-6"
date_ingested: 2026-09-23
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
  - "FES"
  - "BES"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
  - "Chickering 2002"
---

# Greedy Equivalence Search

> [!summary]
> **Greedy Equivalence Search (GES)** (Chickering, 2002) is the canonical **score-based**
> algorithm for learning Bayesian network structure. Rather than searching over individual
> DAGs, GES searches over **Markov equivalence classes** (CPDAGs), transitioning between
> adjacent classes via single-edge insertions (Forward phase) and deletions (Backward phase).
> The central theoretical result is the **proof of the Meek Conjecture**: if $H$ is an I-map
> of $G$, a finite sequence of covered reversals and edge additions connects $G$ to $H$. This
> guarantees that the two-phase greedy search is **asymptotically consistent**: it returns the
> CPDAG of the true generating DAG in the large-sample limit under faithfulness.

## Overview

Score-based structure learning optimizes a scoring criterion $Q(\mathsf{G})$ (e.g. BIC, BDeu)
over DAG structures. The score assigns higher values to structures that better explain the
data, penalized for complexity. Naively optimizing $Q$ over all $\mathbb{D}$ is NP-hard
(exponential search space). Local heuristics (hill-climbing, tabu search) improve one edge
at a time over DAGs but can get stuck in non-equivalent local maxima.

GES makes a key insight: **score-equivalent DAGs should be treated as one object**. Since
decomposable scoring criteria (BIC, BDeu) are constant across Markov-equivalent DAGs, there
is no reason to distinguish them. GES searches directly over **Markov equivalence classes**
(MECs) represented as CPDAGs, using insert/delete operators that move between *adjacent*
equivalence classes — those differing by a single edge. The two-phase structure ensures a
systematic traversal of MEC space.

## Main Content

### Scoring criteria

> [!definition] Decomposable Scoring Criterion
> A scoring criterion $Q(\mathsf{G}, \mathbf{X})$ is **decomposable** if it factors as:
> $$Q(\mathsf{G}, \mathbf{X}) = \sum_{j=1}^{d} Q_j(X_j, \text{pa}(X_j, \mathsf{G}), \mathbf{X}),$$
> where $Q_j$ depends only on variable $X_j$ and its parents in $G$. Decomposability enables
> efficient local score updates when edges are added or removed.
>
> **Score equivalence**: $Q$ is **score-equivalent** iff $G \sim H \implies Q(G) = Q(H)$.
> The BIC score and the BDeu score are both decomposable and score-equivalent.
^def-decomposable-score

> [!definition] BIC Score (Gaussian setting)
> For continuous Gaussian data with $n$ observations, the BIC score for DAG $G$ with
> adjacency matrix $W$ is:
> $$\text{BIC}(G) = -n \log \hat{\sigma}^2_G + k \log n,$$
> where $\hat{\sigma}^2_G$ is the MLE residual variance under $G$ and $k$ is the number of
> parameters (edges). The GES score is $Q = -\text{BIC}/2$, which decomposes as:
> $$Q(G) = \sum_{j} \Big[ -\tfrac{n}{2}\log\hat{\sigma}^2_j(G) - \tfrac{|\text{pa}(j)|}{2}\log n \Big].$$
> Maximizing $Q$ balances fit (residual variance) against complexity (penalty per edge).
^def-bic

### The equivalence class search space

> [!note] MEC graph structure
> Two MECs are **adjacent** if they differ by a single covered edge reversal or a single
> edge insertion/deletion. GES exploits this adjacency structure: it moves between adjacent
> MECs using the **Insert** and **Delete** operators. Each operator changes the CPDAG
> representation in a well-defined way and can be evaluated in $O(d)$ score updates.

### Forward Equivalence Search (FES)

> [!definition] Algorithm: Forward Equivalence Search (FES) (Chickering 2002, §4)
> **Input:** Data $\mathbf{X}$, decomposable score $Q$.
>
> 1. Start with the **empty CPDAG** $\mathcal{C}_0$ (no edges).
> 2. **While** any Insert operator increases the score:
>    a. For each pair $(X_i, X_j)$ not currently adjacent in $\mathcal{C}$, and for each
>       subset $T \subseteq \text{adj}(X_i, \mathcal{C}) \setminus \{X_j\}$ such that
>       $\text{Insert}(X_i, X_j, T)$ yields a valid CPDAG:
>       - Compute the **score improvement** $\Delta Q = Q(\mathcal{C} + \text{Insert}(X_i, X_j, T)) - Q(\mathcal{C})$.
>    b. Apply the **Insert** with the highest $\Delta Q > 0$.
> 3. **Stop** when no Insert improves the score.
>
> **Output:** CPDAG $\mathcal{C}_{\text{FES}}$ (a local maximum of $Q$ with respect to forward moves).
^algo-fes

The **Insert$(X_i, X_j, T)$** operator adds an edge $X_i \to X_j$ to every DAG in
$\mathcal{C}$ that has $T$ as an intersection of $\text{pa}(X_j)$ and a subset of the
current neighbors of $X_j$ in the undirected part of $\mathcal{C}$. The operator is
valid iff the result is a CPDAG; checking validity takes $O(d)$ time.

### Backward Equivalence Search (BES)

> [!definition] Algorithm: Backward Equivalence Search (BES) (Chickering 2002, §4)
> **Input:** $\mathcal{C}_{\text{FES}}$, score $Q$.
>
> 1. Start with the FES result $\mathcal{C}_{\text{FES}}$.
> 2. **While** any Delete operator increases the score:
>    a. For each adjacent pair $(X_i, X_j)$ in $\mathcal{C}$, and for each
>       subset $H \subseteq \text{adj}(X_i, \mathcal{C}) \cap \text{adj}(X_j, \mathcal{C})$
>       such that $\text{Delete}(X_i, X_j, H)$ yields a valid CPDAG:
>       - Compute the **score improvement** $\Delta Q = Q(\mathcal{C} + \text{Delete}(X_i, X_j, H)) - Q(\mathcal{C})$.
>    b. Apply the **Delete** with the highest $\Delta Q > 0$.
> 3. **Stop** when no Delete improves the score.
>
> **Output:** CPDAG $\widehat{\mathcal{C}}$ (the final GES estimate).
^algo-bes

> [!note] Why the BES phase is needed
> FES can overshoot: starting from the empty graph and greedily adding edges may add
> edges that are beneficial *given* preceding edges but not in the final structure. The BES
> phase corrects these by removing edges whose removal now improves the score — taking
> into account the full graph context FES built.

### The Meek Conjecture and consistency

The central theoretical result of Chickering (2002) is the proof of the **Meek Conjecture**
(Meek, 1995):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> Let $G$ and $H$ be DAGs such that $H$ is an **I-map** of $G$ (every independence in $H$
> is also in $G$, i.e. $H$ has fewer or equal independence statements). Then there exists a
> finite sequence of **covered edge reversals** and **edge additions** from $G$ to $H$ such
> that every intermediate graph is also an I-map of $G$.
>
> A **covered edge** $X \to Y$ is one where $\text{pa}(Y) = \text{pa}(X) \cup \{X\}$.
> Reversing a covered edge yields a Markov-equivalent DAG.
^thm-meek-conjecture

This theorem implies that there is always a **score-increasing path** in the MEC graph from
the empty CPDAG to the true CPDAG (under the assumption that the score is consistent: it
asymptotically favors the true model). Hence greedy forward search from the empty graph
will reach the true MEC if the score is large-sample consistent.

> [!theorem] Theorem: Asymptotic Consistency of GES (Chickering 2002, Theorem 1)
> Let the data be generated from a distribution that is faithful to a DAG $G^*$. Let $Q$ be
> a score-equivalent decomposable scoring criterion that is **consistent** (i.e. assigns the
> highest score to the true model in the limit $n \to \infty$, e.g. BIC with Gaussian noise).
>
> Then as $n \to \infty$, the CPDAG returned by GES equals $\mathcal{C}(G^*)$ almost surely.
>
> **Implication**: GES is a correct algorithm for structure identification — it returns the
> true equivalence class in the large-sample limit.
^thm-ges-consistency

### Comparison to PC

| Property | PC algorithm | GES |
|----------|-------------|-----|
| **Paradigm** | Constraint-based (CI tests) | Score-based (BIC/BDeu) |
| **Starting point** | Complete graph | Empty CPDAG |
| **Direction** | Prune edges | Add then remove edges |
| **Key assumption** | Faithfulness + causal sufficiency | Faithfulness + score consistency |
| **Test / score** | CI test (Fisher's Z, G-test, KCIT) | Decomposable score (BIC, BDeu) |
| **Finite-sample** | Sensitive to $\alpha$ threshold | Sensitive to $n \log n$ BIC penalty |
| **Consistency** | Yes (oracle tests) | Yes (BIC) |
| **Complexity** | $O(d^2 q^q)$ CI tests | $O(d^2 2^q)$ score evaluations |
| **Multiple testing** | Yes, accumulates errors | No multiple testing problem |
| **Implementations** | `pcalg::pc`, `causal-learn::PC` | `pcalg::ges`, `causal-learn::GES` |

In practice:
- PC tends to perform better when the skeleton is sparse and CI tests are well-powered.
- GES tends to be more stable in high-dimensional settings with continuous data.
- Both are surpassed by NOTEARS in computational speed on large $d$ — but NOTEARS
  requires a parametric linear SEM and does not guarantee output of the true CPDAG.

### Fast GES (FGES)

Ramsey et al. (2017) introduced **FGES** (Fast GES), which parallelizes the FES operator
search and uses caching to achieve near-linear scaling. FGES is the default implementation
in the **TETRAD** software and the **py-tetrad** Python bindings. It is used for large
datasets ($d > 100$ variables) where standard GES is too slow.

## Examples

> [!example] Example: BIC-GES on a 3-variable chain
> True DAG: $X \to Y \to Z$ (chain). BIC score with Gaussian residuals.
>
> **FES phase**: Starting from empty graph.
> - Best Insert: add $X - Y$ (strongest pairwise correlation). $\Delta Q > 0$.
> - Next best: add $Y - Z$ (also correlated). $\Delta Q > 0$.
> - Adding $X - Z$ directly: score improvement is smaller because $X \perp Z \mid Y$ in
>   the true model (chain), so BIC penalizes the extra edge → $\Delta Q < 0$.
> - FES stops with skeleton $X - Y - Z$.
>
> **V-structure check**: The unshielded triple $(X, Y, Z)$ — $X$ and $Z$ not adjacent.
> FES has already assigned directions based on the insert order, consistent with
> $X \to Y \to Z$ or $X \leftarrow Y \leftarrow Z$ or $X \leftarrow Y \to Z$ (all equivalent).
>
> **BES phase**: No Delete operator improves the score → stops immediately.
>
> **Output**: CPDAG $X - Y - Z$ (undirected chain, reflecting the 3-element equivalence class).
> This is the correct CPDAG of the true DAG $X \to Y \to Z$.

## Connections

- **Requires decomposable score**: BIC (Gaussian), BDeu (discrete). See [[DAG Structure Learning Problem]] for the score formulation.
- **Outputs CPDAGs**: the correct observational identifiability object — see [[Markov Equivalence and CPDAGs]].
- **Connects to PC**: both are asymptotically correct but use different finite-sample decisions; see [[PC Algorithm]].
- **Connects to NOTEARS experiments**: NOTEARS Experiments benchmarks against FGS (the predecessor to FGES) — see [[NOTEARS Experiments]]. GES outperforms PC in some settings and vice versa.
- **Connects to structure learning overview**: see [[DAG Structure Learning Problem]] §Landscape table for GES's position as "Local / approximate search."
- **NOTEARS vs GES**: NOTEARS optimizes a continuous score; GES optimizes a discrete decomposable score. Their solution concepts differ — GES returns the true CPDAG; NOTEARS returns a specific DAG that may not be the true CPDAG.

## See Also
- [[Markov Equivalence and CPDAGs]] — the MEC search space and CPDAG representation
- [[PC Algorithm]] — the constraint-based alternative
- [[Conditional Independence Testing]] — the CI tests PC uses instead of scores
- [[DAG Structure Learning Problem]] — problem setup; NP-hardness; landscape of methods
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[NOTEARS Experiments]] — empirical comparison of GES (as FGS) vs NOTEARS
