---
title: "Canonical Causal DAGs: Node Contraction as Edge Addition"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/theorem
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "§4, pp. 6–9"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Summary Causal DAGs]]"
used_by:
  - "[[CaGReS Algorithm]]"
  - "[[s-Separation in Summary DAGs]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
aliases:
  - canonical causal DAG
  - node contraction equals edge addition
  - CaGReS canonical DAG
---

# Canonical Causal DAGs: Node Contraction as Edge Addition

> [!summary]
> The *canonical causal DAG* $\mathcal{G}_\mathcal{H}$ of a summary DAG $\mathcal{H}$ is obtained by decomposing the summary DAG's cluster nodes back into distinct nodes connected by edges. Theorem 4.1 shows that the RB of $\mathcal{H}$ is *equivalent* to that of $\mathcal{G}_\mathcal{H}$. This means node contraction is precisely equivalent to adding edges to the input DAG — the number of added edges quantifies information loss. This connection enables CaGReS to optimize summarization by minimizing edge additions.

## Overview

Section 4 establishes the key theoretical connection between summary DAGs and edge additions. This connection is what makes the CaGReS algorithm tractable: instead of searching over all possible node partitions, CaGReS can evaluate the cost of each contraction by counting the edges that would be added to the canonical DAG.

## Main Content

### 4.1 The Canonical Causal DAG

> [!definition] CI Sets Equivalence
> Let $S$ and $T$ denote two sets of CIs over variables $\{X_1, \ldots, X_n\}$. We say $S \equiv T$ if every CI $\sigma \in S$ can be derived from $T$ using the semi-graphoid axioms, and vice versa. We say $T$ is equivalent to $S$, written $S \Leftrightarrow T$.
^def-ci-equivalence

> [!definition] Canonical Causal DAG (Definition 5)
> Let $(\mathcal{H}, f)$ be a summary DAG for a causal DAG $\mathcal{G}$. Let $\mathcal{H}$ denote a complete topological order over $\mathcal{V}(\mathcal{H})$.
>
> The **canonical causal DAG** $\mathcal{G}_\mathcal{H}$ associated with $(\mathcal{H}, f)$ is defined as:
> - $\mathcal{V}(\mathcal{G}_\mathcal{H}) = \mathcal{V}(\mathcal{G})$ (same nodes as original)
> - $(X_i, X_j) \in \mathcal{E}(\mathcal{G}_\mathcal{H})$ if and only if:
>   - $(X_i, X_j) \in \mathcal{E}(\mathcal{G})$, **or**
>   - $(f(X_i), f(X_j)) \in \mathcal{E}(\mathcal{H})$, **or**
>   - $f(X_i) = f(X_j)$ and $i < j$
>
> In other words: $\mathcal{G}_\mathcal{H}$ contains all original edges, plus edges induced by the summary structure, plus a total order within each cluster (the second and third conditions).
^def-canonical-dag

**Intuition**: The canonical DAG $\mathcal{G}_\mathcal{H}$ is a *supergraph* of the original $\mathcal{G}$. All edges of $\mathcal{G}$ are preserved; additional edges are added between nodes that now belong to the same cluster or whose clusters are connected in $\mathcal{H}$. The canonical DAG is always compatible with $\mathcal{H}$.

> [!example] Example: Canonical DAG Construction (Fig. 5)
> Consider a causal DAG $\mathcal{G}_1$ (Fig. 3a, from the paper's Fig. 3) and a 3-node summary $\mathcal{H}_1$. After contracting nodes $B$ and $C$ into cluster $\mathcal{H}_1 = BC$:
>
> The canonical causal DAG $\mathcal{G}_{\mathcal{H}_1}$ keeps all original edges and adds:
> - $B \to C$ (within-cluster order, since $B < C$ topologically)
> - Any edges needed to make the cluster's neighborhood consistent
>
> Note: Fig. 5c shows the canonical DAG has more edges than Fig. 5a (original) — the difference $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})|$ is the information loss measure.
^ex-canonical-construction

### 4.2 Key Theorem: RB Equivalence

> [!theorem] Theorem 4.1 — Node Contraction ≡ Edge Addition
> Let $(\mathcal{H}, f)$ be a summary DAG for causal DAG $\mathcal{G}$, and let $\mathcal{G}_\mathcal{H}$ be its corresponding canonical causal DAG.
>
> The Recursive Basis of $\mathcal{H}$ equals the Recursive Basis of $\mathcal{G}_\mathcal{H}$:
> $$
> \text{RB}_{\text{XRB}}(\mathcal{H}) = \text{RB}_{\mathcal{G}_\mathcal{H}}(\mathcal{G})
> $$
>
> Equivalently, the set of CIs encoded by $\mathcal{H}$ is equivalent to the set of CIs encoded by $\mathcal{G}_\mathcal{H}$.
>
> **Corollary**: Optimizing over summary DAGs $\mathcal{H}$ is equivalent to optimizing over edge additions to $\mathcal{G}$. The number of added edges $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})|$ is a valid proxy for information loss in causal inference.
>
> **Proof intuition**: The RB of $\mathcal{H}$ (a DAG over clusters) says each cluster-node is independent of its non-descendant clusters given its parent clusters. When expanded back to individual nodes via the canonical DAG, this is precisely captured by the within-cluster and between-cluster edges added to form $\mathcal{G}_\mathcal{H}$.
^thm-rb-equivalence

**Significance**: This theorem is the theoretical foundation of CaGReS. It transforms the summarization problem from searching over exponentially many node partitions to the more tractable problem of greedily minimizing edge additions — since each contraction's cost can be computed directly on the canonical DAG.

### Why Adding Edges ≠ Destroying Causal Information

An important asymmetry in causal DAGs:
- **Adding edges** to a causal DAG indicates *potential* causal dependence — never asserts false independence. The identified causal effects may be more conservative (larger adjustment sets) but remain valid.
- **Removing edges** from a causal DAG incorrectly implies conditional independence — can lead to biased estimates if a true confounder is excluded.

Pearl (2009) already observed: *"The addition of arcs to a causal diagram can never assist, the identification of causal effects in nonparametric models."* Adding edges leads to a more conservative but never incorrect causal model.

Therefore, the canonical DAG $\mathcal{G}_\mathcal{H}$ (a supergraph of $\mathcal{G}$) is a **valid** causal model — it never introduces incorrect CI assumptions, only potential new dependencies.

## Connections

- Directly extends [[Summary Causal DAGs]] — the canonical DAG operationalizes the abstract definition of summary DAG compatibility.
- The RB equivalence connects to [[Directed Acyclic Graphs]] — the RB is a standard concept in graphical models, and this theorem extends it to the summarization setting.
- The edge-addition cost measure feeds into [[CaGReS Algorithm]] — the GetCost procedure computes exactly $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})|$ for a proposed contraction.

## See Also
- [[Summary Causal DAGs]] — the summary DAG definition and constraints
- [[CaGReS Algorithm]] — exploits Theorem 4.1 for efficient greedy search
- [[s-Separation in Summary DAGs]] — builds on the canonical DAG for CI identification
