---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/GES-Chickering-2002-source-notes.md]]"
source_location: "Chickering (2002), JMLR 3:507–554, full paper"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[V-Structures and Meek Orientation Rules]]"
used_by:
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES"
  - "forward backward equivalence search"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. It performs a two-phase greedy search over
> the space of **CPDAGs** (Markov equivalence classes): a **Forward Equivalence Search**
> (FES) that adds edges greedily, followed by a **Backward Equivalence Search** (BES) that
> removes edges greedily. The central theoretical result is the **Meek Conjecture** (proved
> in the same paper), which guarantees that GES consistently recovers the true CPDAG
> as $n \to \infty$ under faithfulness, the Markov condition, and a locally consistent score.

## Overview

**Score-based structure learning** assigns a score — typically BIC or a Bayesian marginal
likelihood — to each candidate structure and searches for the highest-scoring one. The
challenge is the superexponential number of DAGs. GES avoids exhaustive search by:

1. **Searching CPDAG space**: Markov equivalent DAGs have the same score (scores based on
   observational data only), so the equivalence class is the right unit of search.
   The number of CPDAGs is fewer than the number of DAGs.

2. **Greedy two-phase search**: FES (forward) followed by BES (backward) — analogous to
   forward-backward stepwise regression over DAG equivalence classes.

3. **Meek Conjecture (Theorem)**: the forward phase cannot get stuck at a local optimum
   below the true structure (it is a global search in an appropriate sense).

## Main Content

### Score Requirements

> [!definition] Locally Consistent Score (Chickering 2002, Def. 10)
> A score $\mathcal{S}(G)$ is **locally consistent** if, for any two DAGs $G_1$ and $G_2$
> where $G_2$ is obtained from $G_1$ by removing one edge:
> - If $G_1$ is an $I$-map of the true distribution $P^*$ and $G_2$ is not:
>   $\mathcal{S}(G_1) > \mathcal{S}(G_2)$ (the true I-map scores better).
> - If $G_2$ is a perfect map of $P^*$:
>   $\mathcal{S}(G_2) > \mathcal{S}(G_1)$ (removing the spurious edge improves the score).
>
> **Standard locally consistent scores**:
> - **BIC**: $\mathcal{S}(G) = \log p(\mathbf{X} \mid \hat{\theta}_G) - \frac{d_G}{2}\log n$.
>   Consistent for Gaussian SEMs.
> - **BDe/BGe**: Bayesian marginal likelihoods (Dirichlet/Normal-Wishart priors). Equivalent
>   to BIC in the large-$n$ limit.
> - **Decomposability**: $\mathcal{S}(G) = \sum_i s(X_i, \mathrm{Pa}_G(X_i))$. The score
>   is a **sum of local terms**, enabling efficient incremental updates.
> ^def-locally-consistent

### CPDAG Operators: Insert and Delete

GES defines two operators on CPDAGs that correspond to adding or removing one edge:

> [!definition] Insert Operator (Chickering 2002, Def. 11)
> $\mathrm{Insert}(X, Y, T)$ — add an edge between $X$ and $Y$ to CPDAG $C$:
> - $X$ and $Y$ are not adjacent in $C$.
> - $T \subseteq \mathrm{Ne}(Y) \setminus \mathrm{adj}(X)$ (non-adjacent neighbours of $Y$).
>
> **Effect**: orient $X \to Y$; orient all $T \to Y$; apply Meek's R1–R4.
>
> **Score change**:
> $$\Delta_{\mathrm{Insert}}(X,Y,T) = s(Y,\,\mathrm{Pa}(Y) \cup \{X\} \cup T) - s(Y,\,\mathrm{Pa}(Y) \cup T)$$
>
> **Validity condition**: the resulting graph must be a valid CPDAG (acyclic + unique
> representative of its equivalence class). Chickering gives necessary and sufficient
> conditions.
> ^def-insert

> [!definition] Delete Operator (Chickering 2002, Def. 12)
> $\mathrm{Delete}(X, Y, H)$ — remove the edge between $X$ and $Y$ from CPDAG $C$:
> - $(X, Y)$ is an edge (directed or undirected) in $C$.
> - $H \subseteq \mathrm{Ne}(Y) \cap \mathrm{adj}(X)$.
>
> **Effect**: remove the edge; orient $H \to Y$; apply Meek's R1–R4.
>
> **Score change**:
> $$\Delta_{\mathrm{Delete}}(X,Y,H) = s(Y,\,(\mathrm{Pa}(Y) \cup H) \setminus \{X\}) - s(Y,\,\mathrm{Pa}(Y) \cup H)$$
> ^def-delete

### The GES Algorithm

> [!definition] Algorithm: GES (Chickering 2002, Algorithm 1–2)
>
> **Phase 1 — FES (Forward Equivalence Search)**:
> 1. Start with $C \leftarrow$ empty CPDAG (no edges).
> 2. **Repeat**: find the valid $\mathrm{Insert}(X, Y, T)$ that maximises
>    $\Delta_{\mathrm{Insert}}(X, Y, T) > 0$.
>    - If no improving Insert exists: break.
>    - Otherwise: apply $\mathrm{Insert}(X, Y, T)$ to $C$; apply Meek R1–R4.
> 3. Output $C_\mathrm{FES}$.
>
> **Phase 2 — BES (Backward Equivalence Search)**:
> 1. Start with $C \leftarrow C_\mathrm{FES}$.
> 2. **Repeat**: find the valid $\mathrm{Delete}(X, Y, H)$ that maximises
>    $\Delta_{\mathrm{Delete}}(X, Y, H) > 0$.
>    - If no improving Delete exists: break.
>    - Otherwise: apply $\mathrm{Delete}(X, Y, H)$ to $C$; apply Meek R1–R4.
> 3. Output $C_\mathrm{BES}$.
>
> **Final output**: $C_\mathrm{BES}$ (the estimated CPDAG).
> ^alg-ges

**Why FES then BES?**
FES starting from the empty graph guarantees no false non-edges early on — it builds up.
But it may overshoot (add edges that collectively improve score even though individually
unnecessary). BES then prunes back. The two-phase structure is essential for consistency.

### The Meek Conjecture (Now Theorem)

This is the central theoretical contribution of Chickering (2002):

> [!theorem] Meek Conjecture / Chickering's Theorem 15 (Chickering 2002)
> Let $G^*$ be any DAG in the true Markov equivalence class $[G^*]$. Let $G$ be any
> DAG such that $G$ is an **$I$-map** of $G^*$ (the Markov conditions of $G^*$ are
> a subset of those of $G$ — $G$ has at least as many edges as $G^*$).
>
> Then there exists a **sequence of valid single-edge insertions** (using the Insert
> operator) such that:
> 1. Each step in the sequence produces a DAG that is also an $I$-map of $G^*$.
> 2. The final DAG in the sequence is $G^*$ itself.
>
> **Consequence for GES**: FES cannot be "trapped" by a local optimum that is an
> $I$-map of the true structure. If FES is at an I-map of $G^*$, it can always
> insert an edge to reduce the I-map towards $G^*$ while keeping the intermediate
> graphs as I-maps. Hence FES reaches a CPDAG that is an I-map of the true CPDAG
> (possibly with extra edges, which BES removes).
>
> This was conjectured by Meek (1997) and proved by Chickering (2002) — the proof
> of the conjecture is the main technical contribution of the paper.
> ^thm-meek-conjecture

### Consistency of GES

> [!theorem] Consistency of GES (Chickering 2002, Theorem 18)
> Under:
> - The causal faithfulness assumption,
> - The causal Markov condition,
> - Causal sufficiency (no hidden confounders),
> - A locally consistent score,
>
> GES is **consistent**: as $n \to \infty$, $C_\mathrm{BES}$ converges to the true
> CPDAG $[G^*]$ with probability 1.
>
> **Proof sketch**:
> 1. *FES consistency*: By the Meek Conjecture, FES reaches a CPDAG $C_\mathrm{FES}$
>    that is an $I$-map of the true CPDAG. By local consistency of the score, FES
>    continues improving as long as the current CPDAG is not a perfect map — so it
>    overshoots to at most an I-map.
> 2. *BES consistency*: Starting from $C_\mathrm{FES}$, BES removes spurious edges
>    because the locally consistent score penalises edges that are not in the true
>    perfect map (condition 2 of local consistency: a perfect map scores better than
>    any I-map).
> 3. Combining: GES converges to the unique perfect map of $P^*$ — the true CPDAG.
> ^thm-ges-consistent

### Complexity and Practical Considerations

| Aspect | Detail |
|--------|--------|
| **FES worst case** | $O(p^2 \cdot 2^p)$ Insert evaluations (exponential in $p$) |
| **FES sparse** | $O(p^2 \cdot p^d)$ where $d$ = max in-degree, polynomial for fixed $d$ |
| **BES worst case** | Similar to FES |
| **Score computation** | $O(p \cdot n)$ per local score evaluation (decomposability) |
| **Vs. PC** | GES uses data more efficiently (no $\alpha$ tuning), but requires $n > p$ for reliable BIC estimation |
| **High-dim** | FGES (Ramsey et al. 2017) extends GES to $p \gg n$ with parallelism |

### FGES: Scaling GES to High Dimensions

**Fast GES** (Ramsey et al. 2017) reformulates GES using a priority queue over Insert
operators and parallelises the search. Benchmarks show FGES can handle $p = 10{,}000$
variables on a modern workstation. Key modifications:

1. Maintain a sorted priority queue of the best Insert/Delete for each pair $(X, Y)$.
2. After applying an operator, only update the queue for affected pairs (those sharing
   a variable with the modified edge).
3. Parallelise score evaluations across pairs.

FGES is implemented in the Tetrad software (CMU) and the py-causal Python wrapper.

## Connections

- **Vs. PC**: [[PC Algorithm - Overview]] uses CI tests (constraint-based); GES uses a
  score (score-based). GES is typically more statistically efficient (extracts more
  information from data) but less interpretable (no explicit CI decisions). See
  [[Causal Discovery Algorithm Comparison]] for a full contrast.

- **Vs. NOTEARS**: [[NOTEARS - Overview]] reformulates structure learning as a
  continuous optimization problem. NOTEARS does not search over CPDAGs — it outputs
  a DAG, not a CPDAG. GES is theoretically grounded in the Markov equivalence framework;
  NOTEARS is grounded in continuous SEM optimization.

- **Meek rules dependency**: GES applies [[V-Structures and Meek Orientation Rules]]
  (R1–R4) after each Insert and Delete to maintain a valid CPDAG. The completeness of
  Meek's rules is essential for GES correctness.

- **Software**: `pcalg` R package implements both PC and GES. `causal-learn` Python
  package implements GES. `gCastle` (Huawei) implements FGES. Tetrad implements FGES
  with GUI.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the theory of CPDAGs that GES searches over
- [[V-Structures and Meek Orientation Rules]] — used by GES internally after every step
- [[PC Algorithm - Overview]] — the constraint-based counterpart
- [[Causal Discovery Algorithm Comparison]] — PC vs. GES vs. NOTEARS
- [[DAG Structure Learning Problem]] — problem setup and NP-hardness context
- [[NOTEARS - Overview]] — continuous optimization alternative
