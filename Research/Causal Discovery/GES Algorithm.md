---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-JMLR-ref.md]]"
source_location: "Chickering (2002) JMLR 3:507-554 — §1 (intro), §3 (FES), §4 (BES), §5 (optimality proofs)"
date_ingested: 2026-08-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
  - "score-based structure learning"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> method for causal structure learning. It searches directly in the space of **Markov
> equivalence classes** (CPDAGs) using two greedy phases: a **forward phase** that
> adds edges to maximize a decomposable score (BIC or BDe) until no further addition
> helps, and a **backward phase** that removes edges while still improving the score.
> Chickering's central theorem proves that GES identifies the **globally optimal CPDAG**
> (by score) in the large-sample limit under faithfulness — making it the first
> polynomial-time structure-learning algorithm with a provable global optimality guarantee.

## Overview

GES operates on the space of **CPDAGs** (Markov equivalence classes), not on individual
DAGs. This is the key insight that makes GES both efficient and globally optimal: because
**decomposable scores** (BIC, BDe) assign the same score to every DAG in a Markov
equivalence class, one can search over equivalence classes rather than individual DAGs
without losing any information.

The algorithm builds on two foundational properties:

1. **Score decomposability:** $\text{BIC}(\mathcal{G}) = \sum_{i=1}^p \text{BIC}(X_i, \text{PA}_{\mathcal{G}}(X_i))$
   — the score decomposes by node, so each edge addition/removal only changes the scores
   of the two endpoints.

2. **CPDAG adjacency:** Two CPDAGs are "adjacent" if they differ by a single covered
   edge addition or removal. GES moves between adjacent CPDAGs greedily, always increasing
   the score.

## Main Content

### The GES Score: BIC

> [!definition] Definition: BIC Score for DAG Structure Learning
> For a DAG $\mathcal{G}$ and data $\mathbf{X}$ ($n$ observations of $p$ variables),
> the **BIC score** (Schwarz 1978) is:
> $$\text{BIC}(\mathcal{G}; \mathbf{X}) = \log P(\mathbf{X} \mid \hat\theta_{\mathcal{G}}, \mathcal{G}) - \frac{d_{\mathcal{G}}}{2} \log n$$
> where $\hat\theta_{\mathcal{G}}$ are the MLEs given $\mathcal{G}$ and $d_{\mathcal{G}}$ is
> the number of free parameters (edges). For Gaussian data:
> $$\text{BIC}(\mathcal{G}; \mathbf{X}) = \sum_{i=1}^p \left[ -\frac{n}{2} \log \hat\sigma^2_{i \cdot \text{PA}(i)} - \frac{|\text{PA}(i)|+1}{2} \log n \right]$$
>
> The BIC score is:
> - **Consistent** (selects the correct model in the large-sample limit)
> - **Locally decomposable** (each node's score depends only on its parents)
> - **Equivalent** across CPDAGs (all DAGs in one class share the same BIC score)
^def-bic-score

### Forward Equivalence Search (FES)

> [!definition] Forward Equivalence Search (Chickering 2002, §3)
> Starting from the **empty CPDAG** (no edges):
>
> **Repeat until no improvement:**
> 1. For every pair $(X_i, X_j)$ not yet adjacent in the current CPDAG $\mathcal{C}$,
>    and every valid subset $T \subseteq \mathrm{adj}(\mathcal{C}, X_i) \cap \mathrm{adj}(\mathcal{C}, X_j)$
>    (T must satisfy the "clique in the subgraph" validity condition):
>    - Compute the score **gain** from inserting edge $X_i - X_j$ with parent set $T$.
> 2. If any insertion has positive gain: apply the **highest-gain** valid insertion, updating
>    the CPDAG using the Insert$(X_i, X_j, T)$ operator.
>
> **Insert$(X_i, X_j, T)$:** Insert edge $X_i \to X_j$; orient $X_k \to X_j$ for $X_k \in T$;
> then convert the result to a CPDAG via Meek rules.
>
> **Output:** The CPDAG $\mathcal{C}^+$ maximizing the BIC score over all sparse graphs.
^def-fes

> [!note] Validity condition for T
> The set $T$ must be a *clique* in the subgraph of $\mathcal{C}$ induced by
> $\mathrm{adj}(X_i) \cap \mathrm{adj}(X_j)$. This ensures that the Insert operation
> produces a valid CPDAG (not an invalid PDAG). Chickering (2002, Theorem 15) proves
> that every valid insertion can be characterized this way.

### Backward Equivalence Search (BES)

> [!definition] Backward Equivalence Search (Chickering 2002, §4)
> Starting from the CPDAG $\mathcal{C}^+$ output by FES:
>
> **Repeat until no improvement:**
> 1. For every adjacent pair $(X_i, X_j)$ in $\mathcal{C}^+$, and every valid subset
>    $H \subseteq \mathrm{adj}(\mathcal{C}^+, X_i) \cap \mathrm{adj}(\mathcal{C}^+, X_j)$:
>    - Compute the score **gain** from deleting edge $X_i - X_j$ with $H$-context.
> 2. If any deletion has positive gain: apply the **highest-gain** valid deletion via
>    Delete$(X_i, X_j, H)$ operator, then re-apply Meek rules.
>
> **Output:** The CPDAG $\mathcal{C}^*$ that is a local maximum of the score with respect
> to both insertions and deletions.
^def-bes

> [!note] Why does BES help?
> FES may overshoot: starting from the empty graph and greedily adding edges, it can
> include edges that improve the score locally but are not in the true model. BES removes
> "false positive" edges by checking if their removal improves the score. The two-phase
> structure is analogous to a forward-backward stepwise regression but operates in
> CPDAG space with a consistent model selection criterion.

### The Central Optimality Theorem

> [!theorem] Theorem: GES Global Optimality (Chickering 2002, Theorem 18)
> Assume:
> 1. **Faithful distribution**: the observational distribution $P$ is faithful to the
>    true DAG $\mathcal{G}^*$.
> 2. **Consistent score**: the score $Q$ is consistent — for large $n$, the true CPDAG
>    $\mathcal{C}^*$ scores higher than any other CPDAG. (BIC and BDe satisfy this.)
>
> Then GES (FES followed by BES) returns the **true CPDAG** $\mathcal{C}^*$ in the
> large-sample limit.
>
> **Proof sketch (Meek Conjecture):** The key lemma proved by Chickering (the "Meek Conjecture")
> is that if $\mathcal{G}_H$ is an I-map of $\mathcal{G}$ (i.e., $\mathcal{G}$ encodes all
> the CI relations of $\mathcal{G}_H$), then there is a finite sequence of covered-edge
> reversals transforming $\mathcal{G}_H$ into $\mathcal{G}$, with each intermediate graph
> remaining an I-map. This means FES can always reach the equivalence class of $\mathcal{G}^*$
> by a sequence of valid insertions, and BES can always reach it by valid deletions.
^thm-ges-optimality

### Score Decomposability: The Computational Engine

> [!definition] Decomposable Scores
> A score $Q(\mathcal{G}; \mathbf{X})$ is **locally decomposable** if:
> $$Q(\mathcal{G}; \mathbf{X}) = \sum_{i=1}^p q(X_i, \mathrm{PA}_{\mathcal{G}}(X_i); \mathbf{X})$$
> for some local score function $q$. BIC is locally decomposable:
> $$q(X_i, \mathrm{PA}_i) = \log \hat{L}_i - \frac{d_i}{2}\log n$$
> where $\hat{L}_i$ is the local MLE likelihood and $d_i$ is the number of parameters for $X_i$.
>
> **Consequence:** When an edge is added or removed, only the local scores of the two
> endpoints change. The score gain from Insert$(X_i, X_j, T)$ is:
> $$\Delta Q = q(X_j, \mathrm{PA}^{\text{new}}(X_j)) - q(X_j, \mathrm{PA}^{\text{old}}(X_j))$$
> which can be computed without re-evaluating all $p$ node scores.
^def-decomposable-score

### Algorithm Summary

```
Input:  Data X (n × p), score Q (BIC or BDe)
Output: CPDAG C*

GES:
  C = empty CPDAG  (no edges)

  // Phase 1: Forward search
  loop:
    gain*, (i*,j*,T*) = argmax over valid insertions of ΔQ(Insert(i,j,T))
    if gain* ≤ 0: break
    C ← Apply Insert(i*,j*,T*) to C; update to CPDAG via Meek rules

  // Phase 2: Backward search
  loop:
    gain*, (i*,j*,H*) = argmax over valid deletions of ΔQ(Delete(i,j,H))
    if gain* ≤ 0: break
    C ← Apply Delete(i*,j*,H*) to C; update to CPDAG via Meek rules

  return C
```

## Properties and Complexity

| Property | GES |
|----------|-----|
| **Optimality** | Global optimum in the large-sample limit (under faithfulness + score consistency) |
| **Output** | CPDAG (Markov equivalence class) |
| **Complexity per step** | $O(p^2 \cdot k^q)$ where $k$ = max clique size of adjacency sets, $q$ = max degree |
| **Phases** | Two (FES + BES); more phases can be added (FGES adds a pruning phase) |
| **Score** | BIC (Gaussian), BDe (discrete), any locally decomposable score |
| **Assumptions** | Faithfulness, Markov, causal sufficiency |
| **Starting point** | Empty graph (FES); FES output (BES) |

**FGES (Fast GES):** Ramsey et al. (2017) implement a parallelized, more efficient GES
with a parallel forward phase (FGES) that scales to thousands of variables by exploiting
the decomposability of the score and pruning the search space.

## Comparison to PC Algorithm

| Dimension | GES | PC |
|-----------|-----|-----|
| Paradigm | Score-based | Constraint-based |
| Starting point | Empty graph | Complete graph |
| Direction | Forward (add) then backward (remove) | Prune to skeleton |
| Global optimality | **Yes** (Theorem 18) | **No** (local CI decisions) |
| CI tests needed | **No** (only likelihood score) | **Yes** (one per candidate edge/conditioning set) |
| Parametric assumptions | Gaussian (for BIC) or discrete (BDe) | Minimal (only CI test) |
| Scales to | $p \sim 10^3$ (FGES), $\sim 10^2$ (GES) | $p \sim 10^4$ (PC-stable, sparse) |
| Multiple testing | No (single score optimization) | Yes (many CI tests) |

## Software Implementations

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` (Maathuis et al.) | R | Reference implementation; `ges()` function |
| `causal-learn` (`py-why`) | Python | `lingam.GES`, `ges()` function |
| `tetrad` (CMU) | Java | FGES (parallel GES), multiple scores |
| `gcastle` | Python | GES + NOTEARS + other methods |

## Connections

- **[[Markov Equivalence and CPDAGs]]** — GES operates in CPDAG space; this note defines the space.
- **[[PC Algorithm]]** — constraint-based alternative; PC and GES are the two canonical approaches.
- **[[NOTEARS - Overview]]** — continuous optimization approach that bypasses the discrete CPDAG space entirely; NOTEARS compares to GES empirically in [[NOTEARS Experiments]].
- **[[DAG Structure Learning Problem]]** — places GES in the landscape (Table 1 in the DAG Problem note: "Local/approximate search" camp).
- **[[LLM Expert Elicitation for Bayesian Networks]]** — GES as alternative to expert elicitation when sufficient observational data are available.
- **[[Summary Causal DAGs]]** — GES / PC output is the CPDAG that precedes the DAG summarization step in Zeng (2025).
- **[[Approximate Bayesian Computation for ABMs]]** — score-based methods like GES could be applied to ABM output trajectories as a structure-learning step.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAGs and Meek rules that GES uses
- [[PC Algorithm]] — constraint-based alternative
- [[DAG Structure Learning Problem]] — problem setup and method landscape
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[NOTEARS Experiments]] — GES as a baseline
