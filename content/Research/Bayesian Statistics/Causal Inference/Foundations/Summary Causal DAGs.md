---
title: "Summary Causal DAGs: Definition, Node Contraction, and NP-Hardness"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/definition
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "§2–§3, pp. 2–6"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Zeng 2025 - Overview]]"
used_by:
  - "[[Canonical Causal DAGs]]"
  - "[[CaGReS Algorithm]]"
  - "[[s-Separation in Summary DAGs]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
aliases:
  - summary DAG
  - causal DAG summarization problem
  - node contraction
---

# Summary Causal DAGs: Definition, Node Contraction, and NP-Hardness

> [!summary]
> A summary causal DAG is a smaller DAG obtained from a causal DAG by grouping (contracting) nodes into clusters, producing a graph with fewer nodes while preserving causal inference utility. The paper formally defines summary DAGs, identifies three constraints they must satisfy (size, CI preservation, no spurious dependencies), and proves that finding the optimal summary DAG is NP-hard. The fundamental operation — *node contraction* — is equivalent to adding edges to the input DAG.

## Overview

High-dimensional causal DAGs are cognitively overwhelming and error-prone to specify. Summary causal DAGs provide a principled way to reduce complexity: by merging semantically related nodes, the summary DAG becomes smaller and easier to use for inference while retaining the key causal information.

## Main Content

### Background: Causal DAGs and the RB

A **causal DAG** $\mathcal{G}$ is a Bayesian network — a DAG $\mathcal{G}$ in which:
- Nodes $X_i$ are random variables.
- Edges $X_i \to X_j$ represent direct causal influence.
- Joint distribution: $P(X_1, \ldots, X_n) = \prod_i P(X_i \mid \text{pa}(X_i))$, where $\text{pa}(X_i)$ are the parents of $X_i$.

A **causal DAG** $Y$ is a potential cause of $X$ iff there is a directed path $X \to \ldots \to Y$.

> [!definition] d-Separation (Background)
> Two sets of nodes $X, Y$ are **d-separated** given $Z$ in DAG $\mathcal{G}$ if all paths connecting them are *blocked* by $Z$ (via specific rules about active trails). $d$-separation implies conditional independence: $X \perp\!\!\!\perp Y \mid Z$.
^def-d-separation

> [!definition] Recursive Basis (RB)
> For a causal DAG $\mathcal{G}$, the **Recursive Basis** $\text{RB}(\mathcal{G})$ is a set of CIs (conditional independence statements) such that every CI encoded by $\mathcal{G}$ can be derived from $\text{RB}(\mathcal{G})$ using the semi-graphoid axioms.
>
> For a DAG $\mathcal{G}$, the RB $\text{RB}_\mathcal{G}$ says: for each node $X_i$, $X_i$ is independent of its non-descendants given its parents. This is sound and complete for d-separation.
^def-rb

The RB is the key object to preserve in summarization — a summary DAG that faithfully represents the RB of the original DAG preserves all its conditional independence structure.

### 3.1 Summary Causal DAGs

> [!definition] Summary Causal DAG (Definition 1)
> A **summary causal DAG** for a causal DAG $\mathcal{G}$ is a pair $(\mathcal{H}, f)$ where:
> - $\mathcal{H}$ is a DAG with $|\mathcal{V}(\mathcal{H})| < |\mathcal{V}(\mathcal{G})|$ (strictly fewer nodes)
> - $f: \mathcal{V}(\mathcal{G}) \to \mathcal{V}(\mathcal{H})$ is a function that partitions the nodes of $\mathcal{G}$ among the nodes of $\mathcal{H}$
>
> $\mathcal{H}$ is obtained by applying **node contraction**: given nodes $U, V \in \mathcal{V}(\mathcal{H})$, contracting them produces a single node $C = f(U) = f(V)$ that is now a neighbor of all former neighbors of $U$ and $V$. The edge between $U$ and $V$ is removed.
>
> We omit $f$ when it is clear from context.
^def-summary-dag

> [!definition] Compatibility (Definition 2)
> A causal DAG $\mathcal{G}$ is **compatible** with a summary DAG $\mathcal{H}$ if there exists a function $f$ that partitions nodes $\mathcal{V}(\mathcal{G})$ among nodes $\mathcal{V}(\mathcal{H})$ such that:
> - $(U, V) \in \mathcal{E}(\mathcal{H}) \Rightarrow (f(U), f(V)) \in \mathcal{E}(\mathcal{G})$ or $f(U) = f(V)$
> - $f(X_i) = f(X_j)$ and $i < j$ (topological order preserved within clusters)
>
> We denote the set of all causal DAGs compatible with $\mathcal{H}$ as $\{\mathcal{G}_i\}_\mathcal{H}$.
^def-compatibility

**Intuition**: A summary DAG $\mathcal{H}$ represents a *set of possible worlds* — all causal DAGs compatible with it. The CIs encoded by the summary are the intersection of CIs that hold across all compatible DAGs: those that are *certainly* present, regardless of the fine-grained structure within clusters.

### Summarization Constraints

A valid summary causal DAG must satisfy:

| Constraint | Description |
|-----------|-------------|
| **Size** | $|\mathcal{V}(\mathcal{H})| \leq k$ for a user-specified $k$ |
| **CI Preservation** | Causal dependencies in the original DAG must be faithfully preserved (directed edges $A \to B$ in $\mathcal{G}$ should still hold in $\mathcal{H}$) |
| **No spurious dependencies** | Summary should not introduce conditional dependencies that the original DAG does not imply |

**The RB and missing edges**: In causal DAGs, information is encoded by *missing* edges (absent edges imply CI). Removing edges can undermine the causal model (incorrectly implies CI). Adding edges indicates only *potential* causal dependence (does not necessarily compromise validity if acyclicity is maintained). Therefore: **summarization = adding edges** (grouping nodes that were connected = merging paths into single edges).

### 3.2 Causal DAG Summarization Problem

> [!definition] Causal DAG Summarization Problem
> **Input**: A causal DAG $\mathcal{G}$ and a bound $k$.
> **Goal**: Find a summary causal DAG $(\mathcal{H}, f)$ with $|\mathcal{V}(\mathcal{H})| = k$ such that:
> 1. $\mathcal{H}$ preserves causal dependencies of $\mathcal{G}$
> 2. $\mathcal{H}$ preserves the CIs represented in $\mathcal{G}$ (to the greatest extent possible)
> 3. $\mathcal{H}$ does not introduce spurious conditional dependencies
>
> **Objective**: Minimize $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})|$, the number of edges added to the canonical causal DAG $\mathcal{G}_\mathcal{H}$ (a proxy for information loss).
^def-summarization-problem

> [!theorem] Theorem 3.2 — NP-Hardness of Optimal Summarization
> Finding a summary DAG $(\mathcal{H}, f)$ whose canonical causal DAG $\mathcal{G}_\mathcal{H}$ results in the smallest number of added edges $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})|$ is **NP-hard**.
>
> Specifically, finding $(\mathcal{H}, f)$ where $|\mathcal{E}(\mathcal{G}_\mathcal{H})| - |\mathcal{E}(\mathcal{G})| \leq \tau$ for some threshold $\tau \geq 0$ is NP-complete.
>
> **Proof intuition**: The problem reduces to finding an optimal graph partition that minimizes edge additions when nodes are merged — a variant of the graph $k$-bisection problem known to be NP-hard.
^thm-np-hard

This NP-hardness motivates the greedy approximation in [[CaGReS Algorithm]].

## Examples

> [!example] Example: REDSHIFT Causal DAG (12 nodes, 23 edges)
> The REDSHIFT cloud monitoring DAG tracks query execution performance: nodes include `Query Template`, `Returned Rows`, `Ret. Bytes`, `Num Tables`, `Compile Time`, `Plan Time`, `Exec. Time`, `Lock Wait Time`, `Elapsed Time`, and others.
>
> A summary DAG with $k = 5$ groups semantically related variables (e.g., compile/plan/exec time → query execution cluster). The 5-node summary in Fig. 2b has 9 edges vs. the 23 in the original — dramatically reducing complexity while preserving the key paths from query characteristics to elapsed time.
^ex-redshift

## Connections

- Builds directly on [[Directed Acyclic Graphs]] — uses d-separation, do-calculus, and the Recursive Basis.
- The CI preservation goal connects to [[Frequentist Causal Estimation]] — adjustment sets for ATE estimation depend on d-separation, which must be preserved in the summary.
- The NP-hardness motivates the greedy [[CaGReS Algorithm]].

## See Also
- [[Canonical Causal DAGs]] — the canonical DAG and node-contraction-as-edge-addition
- [[CaGReS Algorithm]] — greedy solution to the NP-hard problem
- [[s-Separation in Summary DAGs]] — CI identification in summary DAGs
- [[Do-Calculus in Summary Causal DAGs]] — do-calculus identifiability in the summarized graph
- [[Zeng 2025 - Overview]] — paper overview
- [[Frequentist Causal Estimation]] — the adjustment set framework that CI preservation in summary DAGs must protect
- [[Bayesian Outcome Models]] — Bayesian causal estimation that relies on DAG structure for confounding adjustment
