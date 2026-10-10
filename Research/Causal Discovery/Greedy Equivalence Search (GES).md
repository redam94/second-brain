---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-source.md]]"
source_location: "§3–§6 (Chickering 2002, JMLR 3:507–554)"
date_ingested: 2026-10-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS - Overview]]"
aliases:
  - "GES"
  - "Chickering 2002"
  - "score-based CPDAG search"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is a **score-based** causal structure learning algorithm that
> searches directly over the space of **Markov equivalence classes** (represented as CPDAGs).
> It operates in two greedy phases: a **forward phase** (FES) that adds edges to maximize a
> decomposable score, and a **backward phase** (BES) that removes edges. Chickering proves
> that GES is **consistent** — it recovers the true CPDAG as $n \to \infty$ under faithfulness
> and causal sufficiency — by establishing the Meek Conjecture (that the equivalence class
> space is connected via single-edge changes). GES is implemented in R (`pcalg::ges`) and Python
> (`causal-learn`).

## Overview

GES is the prototypical score-based causal discovery algorithm. Unlike the [[PC Algorithm]],
which uses conditional independence tests, GES directly optimizes a **decomposable score**
(such as BIC or BDe) over the space of Markov equivalence classes. The space of CPDAGs has
a convenient property: any two adjacent CPDAGs (differing by a single edge operator) differ
by a **locally computable** score increment, making greedy hill-climbing over this space
computationally tractable.

The algorithm's correctness rests on Chickering's (2002) proof of the **Meek Conjecture**:
that the equivalence class space is *connected* in a specific sense, so a greedy forward +
backward pass can reach the global optimum (in the population limit).

## Main Content

### Decomposable scoring functions

GES requires a **score-equivalent, decomposable** function. Score-equivalence means that all
DAGs in the same equivalence class receive the same score. Decomposability means the score
decomposes over nodes:

> [!definition] Definition: Decomposable score (Chickering 2002, §3)
> A score function $Q$ is **decomposable** if it can be written as:
> $$Q(G) = \sum_{i=1}^{d} q_i(X_i, \mathrm{pa}_G(X_i))$$
> where $\mathrm{pa}_G(X_i)$ is the parent set of $X_i$ in $G$, and each $q_i$ depends only
> on node $X_i$ and its parents.
>
> **Key implication:** when a single edge is added or removed, only the $q_i$ terms for the
> affected child node change. Score increments are locally computable.
>
> **Common decomposable scores:**
> - **BIC** (Bayesian Information Criterion): $q_i = \hat\ell_i - \frac{k_i}{2}\log n$, where
>   $\hat\ell_i$ is the log-likelihood of $X_i$ given its parents and $k_i$ is the number of
>   parameters.
> - **BDe / BDeu** (Bayesian Dirichlet, discrete variables): Bayesian marginal likelihood
>   score with uniform parameter prior.
> - **BGe** (Bayesian Gaussian equivalent, continuous): Bayesian marginal likelihood for
>   Gaussian data.
^def-decomposable-score

Score-equivalence is guaranteed by BIC and the Bayesian scores for Gaussian or discrete data.

### The three CPDAG operators

GES updates the current CPDAG using three operators:

> [!definition] Definition: GES Operators (Chickering 2002, §4–5)
>
> **Insert$(X, Y, T)$**: Add a directed edge $X \to Y$ to the current CPDAG $\mathcal{C}$.
> $T \subseteq \text{adj}(\mathcal{C}, Y) \setminus \{X\}$ is the set of nodes that become
> parents of $Y$ in the transformed CPDAG. Technically: the Insert operator acts on the
> current essential graph by inserting $X \to Y$ and re-orienting adjacent edges to maintain
> a valid CPDAG. **Score change:** $\Delta Q = q_Y(X_Y, \mathrm{pa}(Y) \cup T \cup \{X\}) - q_Y(X_Y, \mathrm{pa}(Y) \cup T)$.
>
> **Delete$(X, Y, H)$**: Remove an edge between $X$ and $Y$ (directed or undirected) from $\mathcal{C}$.
> $H \subseteq \text{adj}(\mathcal{C}, Y) \cap \text{adj}(\mathcal{C}, X)$ are nodes to "unhook."
> **Score change:** $\Delta Q = q_Y(X_Y, \mathrm{pa}(Y) \setminus H \setminus \{X\}) - q_Y(X_Y, \mathrm{pa}(Y))$.
>
> **Turn$(X, Y, C)$**: Reverse the orientation of an edge $X \to Y$ to $X \leftarrow Y$ while
> maintaining the CPDAG property. Equivalent to a Delete + Insert.
^def-ges-operators

### Forward Equivalence Search (FES)

> [!theorem] Theorem: Forward Phase (Chickering 2002, §5)
> **FES Algorithm:**
> 1. Start with the empty CPDAG $\mathcal{C}^{(0)}$ (no edges).
> 2. At each step, evaluate all valid Insert$(X, Y, T)$ operators.
> 3. Apply the operator with the **largest positive score increment** $\Delta Q > 0$.
> 4. Repeat until no Insert operator improves the score.
>
> **Invariant:** At each step, $\mathcal{C}^{(t)}$ is the unique CPDAG of some Markov
> equivalence class. The score is non-decreasing.
>
> **Output:** A CPDAG $\mathcal{C}_{\text{FES}}$ that is a local maximum under edge insertions.
^thm-fes

### Backward Equivalence Search (BES)

> [!theorem] Theorem: Backward Phase (Chickering 2002, §5)
> **BES Algorithm:**
> 1. Start with $\mathcal{C}_{\text{FES}}$ (output of forward phase).
> 2. At each step, evaluate all valid Delete$(X, Y, H)$ operators.
> 3. Apply the operator with the **largest positive score increment** $\Delta Q > 0$.
> 4. Repeat until no Delete operator improves the score.
>
> **Output:** A CPDAG $\mathcal{C}_{\text{GES}}$.
>
> **Why is a backward phase needed?** The forward phase may add edges that were beneficial early
> but become suboptimal once other edges are added. The backward phase corrects for these
> "greedy mistakes" in the forward phase. In the population limit, BES always improves or
> maintains the score; in finite samples, it typically prunes false positive edges.
^thm-bes

### Consistency (the main result)

> [!theorem] Theorem: Consistency of GES (Chickering 2002, Theorem 15)
> Under the following assumptions:
> 1. **Faithfulness**: $\mathbb{P}$ is faithful to the true DAG $G^*$.
> 2. **Causal sufficiency**: no latent confounders.
> 3. **Consistent score**: the score is consistent in the sense that $Q(G^*) > Q(G)$ for
>    any $G \neq G^*$ in the large-sample limit.
>
> **GES returns the true CPDAG $\mathcal{C}^*$ as $n \to \infty$.**
>
> **Proof sketch:** Relies on the Meek Conjecture (proved as Theorem 4 in the same paper):
> if $H$ is an independence map of $G$ (every d-separation in $G$ holds in $H$), then there
> is a finite sequence of Insert/Delete operators from the CPDAG of $G$ to the CPDAG of $H$,
> each step maintaining the independence-map property. This ensures the search space is
> "path-connected" enough for greedy forward + backward search to find $\mathcal{C}^*$.
^thm-ges-consistency

### Complexity

- **FES:** For each pair $(X,Y)$, the Insert operator considers subsets $T$ of size up to
  $|\text{adj}(Y)|$. Worst-case exponential in maximum degree, but fast in sparse graphs.
- **Practical speed:** GES is typically faster than PC on large networks because the forward
  phase terminates quickly (starts from the empty graph), and the backward phase only
  evaluates edges already added.
- The `pcalg` R implementation uses efficient caching of local score contributions.

## Examples

> [!example] Example: GES score trace on a 4-node DAG
> **True DAG:** $X_1 \to X_3$, $X_2 \to X_3$, $X_3 \to X_4$. Gaussian data, BIC score.
>
> **FES (forward phase):**
> - Step 1: Add $X_3 \to X_4$ (largest BIC increment — strong correlation).
> - Step 2: Add $X_1 \to X_3$ (large negative association conditional on $X_2$).
> - Step 3: Add $X_2 \to X_3$ (similarly).
> - No further improvement: FES terminates with 3-edge CPDAG.
>
> **BES (backward phase):**
> - Check if removing any edge improves BIC.
> - All three edges are necessary — no removals. BES terminates immediately.
>
> **Output CPDAG:** $X_1 \to X_3 \leftarrow X_2 \to X_3 \to X_4$ — the true CPDAG
> (v-structure at $X_3$ is identifiable; $X_3 \to X_4$ direction is identifiable via R1).

## Connections

- **vs. PC**: PC uses CI tests and can handle non-Gaussian, nonparametric settings well (with
  kernel CI tests). GES uses a parametric score; the BIC score is specifically Gaussian/discrete.
  In simulations, GES generally outperforms PC in terms of SHD (structural Hamming distance)
  when the model is well-specified, because score optimization is statistically more efficient
  than sequential CI testing.
- **vs. NOTEARS**: [[NOTEARS - Overview]] optimizes a continuous score over weighted adjacency
  matrices (not over CPDAGs). It is faster computationally ($O(d^3)$ matrix operations) and
  requires no enumeration of equivalence classes. NOTEARS outputs a *DAG*, not a CPDAG. In the
  NOTEARS experiments ([[NOTEARS Experiments]]), GES is used as a baseline and NOTEARS matches
  or beats it on dense/large graphs.
- **FGES / FGS**: Ramsey et al. (2017) developed "Fast GES" (FGES), a parallelized version of
  GES that scales to thousands of nodes. It is part of the TETRAD software (Java).
- **Greedy DAG search**: a simpler version of GES that searches over *DAGs* (not CPDAGs) with
  greedy hill-climbing, also called HC (hill-climbing). It lacks GES's consistency guarantees
  because the DAG space has local optima that the equivalence-class space does not.
- **Score vs. CI tradeoff**: score-based methods like GES require a parametric model; CI-based
  methods like PC are more assumption-free but less statistically efficient. For a comparison of
  all three paradigms (constraint-based, score-based, continuous optimization), see the updated
  [[Causal Discovery/_Index|Causal Discovery Index]].

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — CPDAGs, v-structures, score-equivalence
- [[PC Algorithm]] — constraint-based alternative
- [[DAG Structure Learning Problem]] — problem setup, NP-hardness, landscape of methods
- [[NOTEARS - Overview]] — continuous-optimization approach (GES used as baseline in experiments)
- [[NOTEARS Experiments]] — empirical comparison with GES
