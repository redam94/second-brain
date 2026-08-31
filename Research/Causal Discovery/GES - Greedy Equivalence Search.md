---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.txt]]"
source_location: "Chickering (2002), JMLR 3:507–554, §§1–5"
date_ingested: 2026-08-31
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[CPDAG and Markov Equivalence]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[Causal Discovery Methods - Comparison]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FGES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> causal discovery algorithm. It searches directly in the space of **Markov equivalence
> classes** (represented as CPDAGs), applying a greedy two-phase strategy: a forward phase
> that greedily inserts edges into the CPDAG until no further score gain is possible, and a
> backward phase that greedily removes edges. Under causal faithfulness and Gaussian noise,
> GES returns the true CPDAG in the large-sample limit. The paper also proves the
> **Meek Conjecture** — the key structural result enabling correctness of CPDAG-space search.

## Overview

Score-based structure learning (Program 4 in [[DAG Structure Learning Problem]]) minimizes a
discrete score $Q(\mathsf{G})$ over DAGs. The fundamental insight of GES: instead of searching
over the super-exponential space of DAGs $\mathbb{D}$, one can search over the much smaller
space of **Markov equivalence classes** (CPDAGs), because score-equivalent DAGs have
identical scores. GES exploits this by:

1. Representing each equivalence class by its [[CPDAG and Markov Equivalence|CPDAG]].
2. Defining **local operators** (Insert and Delete) that move between adjacent CPDAGs.
3. Running a greedy two-phase algorithm over CPDAG space.

This is the directed-graph analogue of greedy approaches to undirected structure learning —
but the search space is CPDAGs, not adjacency matrices.

## Main Content

### The Score: BIC / BGe

GES can use any score that is **decomposable** (factors over nodes) and
**score-equivalent** (constant over Markov equivalence classes):

> [!definition] BIC Score (Bayesian Information Criterion)
> For a Gaussian linear SEM with DAG $G$ over $d$ nodes and $n$ observations:
> $$\text{BIC}(G) = \log P(\mathbf{X} \mid G, \hat{\theta}_G) - \frac{|E(G)|}{2} \log n$$
> where $\hat{\theta}_G$ are the maximum likelihood parameters for DAG $G$.
> BIC is **score-equivalent**: if $G_1 \sim G_2$ (Markov equivalent), then $\text{BIC}(G_1) = \text{BIC}(G_2)$.
>
> For Gaussian data, the BIC decomposes as:
> $$\text{BIC}(G) = \sum_{j=1}^{d} \left[ -\frac{n}{2}\log(\hat\sigma^2_j) - \frac{|\mathrm{Pa}_G(j)|}{2}\log n \right]$$
> where $\hat\sigma^2_j$ is the residual variance of node $j$ regressed on its parents.
^def-bic-score

The **BGe** (Bayesian Gaussian equivalent) score is an alternative that marginalizes over
parameters; it is also score-equivalent and consistent for structure recovery.

### The Meek Conjecture (Proven by Chickering 2002)

The key structural result enabling GES correctness:

> [!theorem] The Meek Conjecture (Chickering 2002, Theorem 15)
> Let $G$ and $H$ be two DAGs over $V$ such that $G$ is an **I-map** of $H$ (i.e., every
> d-separation in $H$ holds in $G$: $\mathcal{I}(H) \supseteq \mathcal{I}(G)$). Then there
> exists a sequence of DAGs $G = G_0, G_1, \ldots, G_k = H$ such that:
> - Each $G_i$ is an I-map of $H$, and
> - $G_{i+1}$ is obtained from $G_i$ by a **covered edge reversal**: reversing an edge $X \to Y$
>   where $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$.
>
> **Consequence**: every pair of adjacent equivalence classes in CPDAG space is reachable
> by a single Insert or Delete operator, so GES's greedy search does not miss the optimal class.
^thm-meek-conjecture

> [!note] What is a covered edge?
> Edge $X \to Y$ is **covered** in DAG $G$ if $\mathrm{Pa}_G(Y) = \mathrm{Pa}_G(X) \cup \{X\}$
> (the parent sets differ only in $X$ itself). Reversing a covered edge moves to an adjacent
> equivalence class — a minimal step in CPDAG space.

### GES Algorithm

> [!theorem] GES Algorithm (Chickering 2002)
>
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, score function $Q$ (e.g., BIC).
>
> **Phase 1: Forward Search (GES-I, Insert)**
> 1. Initialize: $\mathcal{C} \leftarrow$ empty CPDAG (no edges).
> 2. Repeat:
>    - Find the **Insert operator** $(X, Y, T)$ — adding edge $X \to Y$ into $\mathcal{C}$
>      with $T \subseteq \mathrm{Ne}_\mathcal{C}(Y) \setminus \mathrm{Adj}_\mathcal{C}(X)$ —
>      that **maximally increases** $Q$.
>    - If no Insert increases $Q$: terminate Phase 1.
>    - Apply the Insert, update $\mathcal{C}$.
>
> **Phase 2: Backward Search (GES-II, Delete)**
> 1. Starting from the CPDAG $\mathcal{C}$ at end of Phase 1.
> 2. Repeat:
>    - Find the **Delete operator** $(X, Y, H)$ — removing edge $X - Y$ from $\mathcal{C}$
>      with $H \subseteq \mathrm{Ne}_\mathcal{C}(Y) \cap \mathrm{Adj}_\mathcal{C}(X)$ —
>      that **maximally increases** $Q$.
>    - If no Delete increases $Q$: terminate Phase 2.
>    - Apply the Delete, update $\mathcal{C}$.
>
> **Output:** CPDAG $\hat{\mathcal{C}}$.
^alg-ges

> [!note] Why two phases?
> **Phase 1 overshoots**: the greedy forward phase may add too many edges (because adding
> an edge to an empty graph always increases BIC for finite data). **Phase 2 corrects**:
> the backward phase removes superfluous edges. Together they navigate from the empty CPDAG
> through a sequence of score-improving equivalence classes to (provably) the true one.

### Insert and Delete Operators

The Insert and Delete operators are defined over CPDAGs, not individual DAGs. This is crucial:
each operator moves between adjacent Markov equivalence classes.

> [!definition] Insert Operator $(X, Y, T)$
> Given CPDAG $\mathcal{C}$, $X$ and $Y$ non-adjacent, $T \subseteq \mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$:
> **Insert$(X, Y, T)$** performs the operation:
> 1. Add directed edge $X \to Y$.
> 2. For each $Z \in T$: orient $Z \to Y$ (turning undirected $Z - Y$ into $Z \to Y$).
> 3. Recompute orientations via Meek rules.
>
> The score change from Insert$(X, Y, T)$ is:
> $$\Delta Q = Q\!\left(Y \mid \mathrm{Pa}(Y) \cup \{X\} \cup T\right) - Q\!\left(Y \mid \mathrm{Pa}(Y) \cup T\right)$$
> (only the local score at $Y$ changes, by decomposability).
^def-insert-operator

> [!definition] Delete Operator $(X, Y, H)$
> Given CPDAG $\mathcal{C}$, $X \to Y$ or $X - Y$ in $\mathcal{C}$, $H \subseteq \mathrm{Ne}(Y) \cap \mathrm{Adj}(X)$:
> **Delete$(X, Y, H)$** removes the edge $X$–$Y$ and, for each $Z \in H$, removes the edge
> $Z$–$Y$ (replacing it with an undirected edge $Z - Y'$ from the orientation update).
> Score change again involves only node $Y$.
^def-delete-operator

### Correctness Theorem

> [!theorem] GES Consistency (Chickering 2002, Theorem 18)
> Let $P$ be a Gaussian distribution faithful to DAG $G^*$ and let $Q$ be the BIC score.
> Then in the large-sample limit ($n \to \infty$), GES returns the true CPDAG:
> $$\hat{\mathcal{C}} \xrightarrow{n\to\infty} \mathcal{C}(G^*).$$
>
> **Proof sketch**: (i) Phase 1 terminates at a CPDAG containing the true skeleton (no excess
> edges removed, no missing edges); (ii) Phase 2 removes only the excess edges; (iii) the
> Meek Conjecture guarantees that the greedy search does not get "stuck" — adjacent CPDAGs
> always exist that improve the score until the truth is reached.
^thm-ges-consistency

### Complexity

- **Phase 1**: In the worst case, $O(d^2)$ Insert evaluations per step, each taking $O(q^3)$
  to compute the local BIC (regressing on parents). $O(d^2)$ steps total → $O(d^4 q^3)$.
- **Phase 2**: Similar complexity.
- **FGES** (Fast GES; Ramsey et al. 2017): a parallelized implementation exploiting score
  decomposability; scales to thousands of variables.
- **For dense graphs**: GES is generally more efficient than PC because it avoids exponential CI tests.

### Software

- **R package `pcalg`**: `ges()` function.
- **Python `causal-learn`**: `GES` class with BIC and BDeu score options.
- **TETRAD**: `GES` and `FGES` (Java; Ramsey et al. 2017).

## Examples

> [!example] GES Forward Phase on a Simple DAG
> **True DAG:** $X \to Y \to Z$, linear Gaussian, $n = 500$.
> **Empty CPDAG:** No edges.
>
> **Phase 1 steps:**
> 1. Best Insert: $(X, Y, \emptyset)$. CPDAG becomes $X - Y$ (undirected).
> 2. Best Insert: $(Y, Z, \emptyset)$. CPDAG becomes $X - Y - Z$.
>    (Or possibly $(X, Z, \emptyset)$ first — GES considers all pairs.)
> 3. No Insert improves BIC further (once the skeleton is correct, adding spurious edges
>    incurs the $(\log n)/2$ penalty in BIC).
>
> **Phase 2 steps:**
> No Delete improves BIC (both edges are in the true skeleton).
>
> **Output CPDAG:** $X - Y - Z$ (all edges present, none oriented — correctly reflecting
> that $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, and $X \leftarrow Y \to Z$ are
> all Markov equivalent).

## Connections

- **vs. PC** ([[PC Algorithm - Overview]]): PC is CI-test-based; GES is score-based. For
  small–medium $d$, GES tends to be more accurate under Gaussian assumptions; PC is more
  flexible (supports non-parametric CI tests).
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS optimizes a continuous program over
  matrices, not CPDAGs. NOTEARS returns a single DAG (not a CPDAG) and requires the linear
  SEM assumption.
- **Hybrid methods**: **MMHC** (Max-Min Hill Climbing; Tsamardinos et al. 2006) combines
  CI-test-based skeleton discovery (PC phase 1) with score-based orientation (GES phase 1).
- **GFCI** (Greedy FCI; Ogarrio et al. 2016): combines GES's skeleton with FCI's
  orientation rules, handling latent confounders.

## See Also
- [[CPDAG and Markov Equivalence]] — the CPDAG representation GES searches over
- [[PC Algorithm - Overview]] — constraint-based alternative
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[DAG Structure Learning Problem]] — the score-based formulation
- [[Causal Discovery Methods - Comparison]] — when to use GES vs PC vs NOTEARS
