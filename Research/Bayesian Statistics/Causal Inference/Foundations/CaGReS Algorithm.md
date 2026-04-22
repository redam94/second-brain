---
title: "CaGReS Algorithm: Greedy Causal DAG Summarization"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/concept
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "§5, pp. 9–13"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Canonical Causal DAGs]]"
  - "[[Summary Causal DAGs]]"
used_by:
  - "[[Do-Calculus in Summary Causal DAGs]]"
aliases:
  - CaGReS
  - causal greedy summarization
  - GetCost procedure
---

# CaGReS Algorithm: Greedy Causal DAG Summarization

> [!summary]
> CaGReS (Causal Greedy Summarization) is a bottom-up greedy algorithm for causal DAG summarization. In each iteration it finds the pair of nodes whose contraction adds the fewest edges to the canonical causal DAG (measured by GetCost), and merges them — until the size constraint $k$ is met. Four optimizations improve runtime: semantic similarity constraint (only semantically related nodes are merged), caching (invalid pairs and scores), low-cost merges (pre-contract non-branching chains), and time complexity of $O((n-k) \cdot n^2)$.

## Overview

Since optimal causal DAG summarization is NP-hard (Theorem 3.2 in [[Summary Causal DAGs]]), CaGReS uses a greedy approximation. The key insight from [[Canonical Causal DAGs]] (Theorem 4.1) is that contraction costs can be measured precisely by counting the edges added to the canonical DAG — enabling a well-defined greedy objective.

## Main Content

### Algorithm 1: CaGReS

> [!definition] CaGReS Algorithm
> **Input**: Causal DAG $\mathcal{G}$, node count bound $k$.
> **Output**: Summary causal DAG $\mathcal{H}$ with $k$ nodes.
>
> ```
> 1.  H ← G
> 2.  H ← LowCostMerges(H)        # pre-contract cheap pairs
> 3.  while size(H.nodes) > k do
> 4.      min_cost ← ∞
> 5.      (X, Y) ← Null
> 6.      for (U, V) ∈ H.nodes do
> 7.          if IsValidPair(U, V, H) then
> 8.              cost_UV ← GetCost(U, V, H)
> 9.              if cost_UV < min_cost then
> 10.                 min_cost ← cost_UV
> 11.                 (X, Y) ← (U, V)
> 12.             if cost_UV == min_cost then
> 13.                 randomly decide whether to replace (X, Y)
> 14.     H.Merge(X, Y)
> 15. return H
> ```
^def-cagres-algorithm

**IsValidPair**: A pair $(U, V)$ is valid if neither $U$ nor $V$ are neighbors of each other in $\mathcal{H}$ — merging neighboring nodes could create self-loops (violates DAG acyclicity).

**GetCost**: Computes the number of edges added to the canonical DAG when contracting $U$ and $V$. See Algorithm 2 below.

**Random tie-breaking** (line 13): When multiple pairs achieve the minimum cost, CaGReS randomly selects among them. This can be determinized with a fixed random seed for reproducibility.

### Algorithm 2: GetCost Procedure

> [!definition] GetCost Procedure
> **Input**: Summary causal DAG $\mathcal{H}$, node pair $U$ and $V$.
> **Output**: Cost of contracting $U$ and $V$.
>
> The cost equals the number of edges to be added in the canonical causal DAG when merging $U$ and $V$:
>
> 1. **Within-cluster edges** (line 3–4): If $\mathcal{H}$.HasEdge$(U, V) = \text{False}$, cost += $\text{size}(U) \cdot \text{size}(V)$. These are new within-cluster edges connecting the two groups.
>
> 2. **New parents** (lines 6–11): Let $\text{parents}_U$ and $\text{parents}_V$ be the predecessors of $U$ and $V$.
>    - $\text{parentsOnlyU} \leftarrow \text{parents}_U \setminus \text{parents}_V$: parents of $U$ that are not parents of $V$ post-merge.
>    - cost += $\text{size}(\text{parentsOnlyU}) \cdot \text{size}(V)$
>    - Similarly for parentsOnlyV and size$(U)$.
>
> 3. **New children** (lines 12–17): Symmetrically for successors:
>    - $\text{childrenOnlyU} \leftarrow \text{children}_U \setminus \text{children}_V$
>    - cost += $\text{size}(\text{childrenOnlyU}) \cdot \text{size}(V)$
>    - Similarly for childrenOnlyV.
>
> 4. Return total cost.
^def-getcost

**Intuition**: Merging $U$ and $V$ means every node in $U$'s cluster must now be connected to every node in $V$'s cluster (and vice versa for parents/children). The cost counts exactly how many new edges this requires in the canonical DAG.

### Four Optimizations

> [!definition] CaGReS Optimizations
>
> **1. Semantic Constraint**: Only semantically related node pairs are considered for contraction. A semantic similarity measure $\text{sim}(\cdot, \cdot)$ assigns values in $[0, 1]$ to variable pairs; a summary DAG $\mathcal{H}$ satisfies the semantic constraint if for every cluster $C \in \mathcal{V}(\mathcal{H})$, $\text{sim}(V_i, V_j) \geq \tau$ for all $V_i, V_j \in C$. This reduces the search space and ensures that only meaningfully related variables are merged.
>
> **2. Caching**: Two cache mechanisms — one for *invalid* pairs (pairs that would violate acyclicity, checked via IsValidPair; cost is unchanged after merging a different node pair), and one for *cost scores* (GetCost results; a contraction of $(X', Y')$ only changes the cost of pairs involving $X'$ or $Y'$'s neighbors). Caches are updated incrementally after each merge.
>
> **3. Low-Cost Merges** (`LowCostMerges`): As pre-processing, contract node pairs that share identical children and parents (non-branching paths). These have cost 0 and are always optimal to merge first. Additionally, merge nodes linked along non-branching paths with at most one parent and one child. This is experimentally shown to be effective for small-to-medium density DAGs.
>
> **4. Time Complexity**: A single cost computation for pair $(U, V)$ takes $O(n)$ (checking at most $n$ neighbors). The algorithm runs $(n-k)$ iterations, evaluating $O(n^2)$ pairs each time (with at most $n$ neighbors per node). Overall: $O((n-k) \cdot n^2)$.
^def-optimizations

### Algorithm Properties

- **Acyclicity preservation**: CaGReS only contracts *non-neighboring* pairs (IsValidPair check). The contracted result maintains DAG acyclicity because no self-loops are created.
- **CI preservation**: By Theorem 4.1, the cost function (edge additions to canonical DAG) correctly measures CI information loss — minimizing cost = maximizing preserved CIs.
- **No theoretical guarantee**: CaGReS is a heuristic; it does not guarantee the optimal solution. But experimentally it produces summary DAGs that are very close to Brute-Force (optimal) on small graphs, and outperforms all other practical baselines on large graphs.

## Examples

> [!example] FLIGHTS Dataset (21 nodes → 10 nodes)
> CaGReS groups semantically similar query metrics: e.g., `Num Tables`, `Num Joins`, `Num Columns` → one cluster (all query structural features). The resulting 10-node summary has fewer additional edges in the canonical DAG than k-Snap's summary, and 83.3% of its CIs are implied by Brute-Force (vs. only 50% for k-Snap).
^ex-flights

## Connections

- CaGReS implements the optimization problem defined in [[Summary Causal DAGs]] using the cost function derived from [[Canonical Causal DAGs]].
- The semantic constraint makes CaGReS appropriate for high-dimensional data where domain knowledge is available — analogous to informative priors in [[General Structure of Bayesian CI|Bayesian inference]].
- The $O((n-k) \cdot n^2)$ complexity makes CaGReS the only algorithm (besides k-Snap) that handles DAGs with $>20$ nodes in practice.

## See Also
- [[Summary Causal DAGs]] — the problem being solved
- [[Canonical Causal DAGs]] — the theoretical basis for the cost function
- [[s-Separation in Summary DAGs]] — using the summary DAG output for CI identification
- [[Do-Calculus in Summary Causal DAGs]] — using the summary DAG for causal inference
