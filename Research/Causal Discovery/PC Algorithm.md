---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.pdf]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Kalisch & Bühlmann (2007), §2"
date_ingested: 2026-10-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "constraint-based structure learning"
  - "PC-algorithm"
  - "Spirtes-Glymour-Scheines algorithm"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** approach to causal structure learning. It recovers the skeleton
> of the true DAG by testing every pair of variables for conditional independence (conditioning
> on increasing-size subsets of their neighbors), then orients edges by detecting v-structures
> and applying [[Equivalence Classes and CPDAGs#^thm-meek-rules|Meek's orientation rules]].
> Output: a CPDAG representing the Markov equivalence class of the true DAG. The algorithm
> is consistent in the large-sample limit under the **faithfulness** assumption and is the
> baseline that score-based methods like [[GES - Greedy Equivalence Search]] and continuous
> methods like [[NOTEARS - Overview]] are compared against.

## Overview

All causal structure learning algorithms face the same fundamental problem: observational data
cannot distinguish between Markov-equivalent DAGs (see [[Equivalence Classes and CPDAGs]]).
The PC algorithm sidesteps this by recovering not a unique DAG but the **equivalence class** —
the CPDAG — using a minimal set of **conditional independence tests** rather than an
exhaustive score optimization.

The name "PC" honours the first names of its inventors, Peter Spirtes and Clark Glymour. The
algorithm is described in full in Chapter 5 of *Causation, Prediction, and Search* (Spirtes,
Glymour & Scheines 1993/2000) and implemented in the pcalg R package (Kalisch et al. 2012)
and Tetrad (Ramsey et al. 2018).

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> The PC algorithm is consistent under the following three assumptions:
>
> 1. **Causal Markov condition**: Every variable is conditionally independent of its
>    non-descendants, given its parents in the true DAG $G^*$.
> 2. **Faithfulness**: Every conditional independence in the distribution $P$ corresponds
>    to a d-separation in $G^*$ (the converse of the Markov condition). Equivalently,
>    no cancellation of paths makes variables independent "by coincidence."
> 3. **Causal sufficiency**: No unmeasured common causes (latent confounders) of any pair
>    of observed variables. (Relaxed by the FCI algorithm.)
^def-assumptions

> [!note] When faithfulness fails
> Faithfulness can be violated in non-generic cases — e.g. in linear Gaussian models where
> two paths have equal and opposite effects that cancel. Such cancellations are measure-zero
> events in parameter space and are typically treated as negligible in practice. However,
> near-faithfulness violations cause finite-sample problems and inflated false-positive rates.

### Phase 1: Skeleton Recovery

> [!definition] Definition: Skeleton Recovery (PC Algorithm, Phase 1)
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$. Conditional independence oracle
> (in practice: partial correlation test for Gaussian data, kernel-based CI test for
> non-linear/non-Gaussian, etc.).
>
> **Procedure:**
> 1. Start with the **complete undirected graph** on $d$ nodes.
> 2. For $l = 0, 1, 2, \ldots$:
>    - For each pair $(X_i, X_j)$ still connected by an edge, and each subset $S \subseteq
>      \mathrm{adj}(X_i) \setminus \{X_j\}$ (or $\mathrm{adj}(X_j) \setminus \{X_i\}$) with
>      $|S| = l$:
>      - Test $X_i \perp\!\!\!\perp X_j \mid S$.
>      - If the test accepts ($p > \alpha$): **remove the edge** $X_i - X_j$ and record $S$
>        as the **separation set** $\mathrm{Sep}(X_i, X_j) \leftarrow S$.
>    - Stop increasing $l$ when $|\mathrm{adj}(X_i)| \leq l$ for all $i$.
>
> **Output:** Skeleton (undirected graph) and separation sets.
^def-skeleton-recovery

> [!note] Computational complexity
> The number of CI tests in Phase 1 is $O\!\left(\binom{d}{2} \binom{d-2}{k}\right)$ where
> $k$ is the maximum node degree. This is **polynomial in $d$ for sparse graphs** (bounded $k$)
> but **exponential for dense graphs**. PC is therefore well-suited to sparse DAGs — a
> realistic assumption for most scientific applications. See the complexity bound in
> Kalisch & Bühlmann (2007).

### Phase 2: V-Structure Orientation

> [!definition] Definition: V-Structure Orientation (PC Algorithm, Phase 2)
> For every triple $(X_i, X_k, X_j)$ such that:
> - $X_i - X_k$ and $X_k - X_j$ (adjacent), but
> - $X_i \not\!\!\!- X_j$ (non-adjacent), and
> - $X_k \notin \mathrm{Sep}(X_i, X_j)$
>
> Orient as the v-structure $X_i \to X_k \leftarrow X_j$.
>
> Rationale: if $X_k$ were in the separation set, it would have been used to make $X_i$ and
> $X_j$ independent, so $X_k$ must be a collider — an active non-ancestor path that
> *creates* dependence.
^def-vstructure-orient

### Phase 3: Edge Propagation (Meek's Rules)

Apply [[Equivalence Classes and CPDAGs#^thm-meek-rules|Meek's rules]] (R1–R4) exhaustively to
orient any remaining undirected edges without introducing new v-structures or directed cycles.

**Output:** CPDAG representing the Markov equivalence class of the true DAG $G^*$.

### Full Algorithm Summary

```
PC-algorithm(X, α):
  Phase 1 — Skeleton:
    G ← complete undirected graph on d nodes
    Sep ← ∅
    for l = 0, 1, ...:
      for each edge (i,j) in G:
        for each S ⊆ adj(i)\{j} with |S| = l:
          if CI-test(i, j | S, X) accepts:
            remove edge (i,j); Sep(i,j) ← S; break
      if max-degree(G) ≤ l: break

  Phase 2 — V-structures:
    for each unshielded triple (i,k,j):
      if k ∉ Sep(i,j): orient i → k ← j

  Phase 3 — Meek's rules:
    repeat until no change:
      apply R1, R2, R3, R4

  return CPDAG G
```
^alg-pc

### PC-Stable: Order-Invariant Variant

The original PC algorithm's skeleton recovery is **order-dependent**: the edges removed depend
on the order in which CI tests are applied, affecting the adjacency sets used in subsequent
tests. **PC-stable** (Colombo & Maathuis 2014) fixes this by computing adjacency sets from the
graph at the *start* of each level $l$, not updating them within the same level. PC-stable
is the recommended implementation.

## Examples

> [!example] Example: Gaussian Linear Models (Partial Correlations)
> For Gaussian data, conditional independence $X_i \perp\!\!\!\perp X_j \mid S$ is equivalent to
> zero **partial correlation** $\rho_{ij \cdot S} = 0$. Fisher's z-transform converts the
> sample partial correlation to an approximate standard normal, enabling a simple $z$-test at
> significance level $\alpha$.
>
> ```R
> library(pcalg)
> suffStat <- list(C = cor(X), n = nrow(X))
> pc.fit <- pc(suffStat, indepTest = gaussCItest,
>              alpha = 0.01, p = ncol(X))
> plot(pc.fit)
> ```
>
> The `pcalg` package implements PC-stable by default. The `alpha` parameter controls
> the CI test significance level — a key tuning parameter that trades between false
> positives (too large $\alpha$) and missed edges (too small $\alpha$).

## Connections

- **[[GES - Greedy Equivalence Search]]**: The score-based alternative. GES is provably
  consistent under the same assumptions and is typically more accurate in finite samples
  (fewer false discoveries from multiple testing), but requires a closed-form score function.
  PC is more flexible: any CI test can be plugged in, including kernel methods for
  non-Gaussian data.
- **[[NOTEARS - Overview]]**: The continuous optimization alternative. NOTEARS is compared
  directly against PC in the [[NOTEARS Experiments]] note. NOTEARS generally outperforms PC
  on dense graphs (where PC's exponential complexity is costly) and in moderate dimensions.
- **[[DAG Structure Learning Problem]]**: Contains the landscape table where PC appears as the
  canonical "constraint-based" approach.
- **FCI (Fast Causal Inference)**: A generalization of PC that drops the causal sufficiency
  assumption, allowing latent confounders. It outputs a PAG (Partial Ancestral Graph) instead
  of a CPDAG.
- **[[BN Construction Methods Comparison]]**: Covers expert-elicitation vs. data-driven BN
  construction; the PC algorithm is the canonical data-driven constraint-based alternative to
  expert elicitation.

## See Also
- [[Equivalence Classes and CPDAGs]] — CPDAGs, Meek's rules, identifiability
- [[GES - Greedy Equivalence Search]] — the score-based counterpart
- [[DAG Structure Learning Problem]] — problem formulation and method landscape
- [[NOTEARS Experiments]] — empirical comparison of PC vs. NOTEARS vs. FGS
- [[Directed Acyclic Graphs]] — d-separation and the Markov condition (prerequisites)
