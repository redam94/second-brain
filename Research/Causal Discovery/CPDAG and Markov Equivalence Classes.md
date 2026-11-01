---
title: "CPDAG and Markov Equivalence Classes"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-source.md]]"
source_location: "Background: Markov equivalence, CPDAGs, Meek (1995)"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[V-Structures and Meek Orientation Rules]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "essential graph"
---

# CPDAG and Markov Equivalence Classes

> [!summary]
> Observational data can identify a causal DAG only up to its **Markov equivalence class** — the
> set of DAGs encoding the same conditional independence (CI) relations. The unique graphical
> representative of an equivalence class is the **CPDAG** (Completed Partially Directed Acyclic
> Graph), also called the *essential graph*: a mixed graph with directed edges where all DAGs
> agree and undirected edges where they disagree. Both [[PC Algorithm]] and
> [[GES - Greedy Equivalence Search]] return a CPDAG rather than a unique DAG.

## Overview

Even with infinite data, observational distributions cannot generally distinguish between all
DAGs: multiple DAGs can encode exactly the same set of conditional independence relations and
therefore produce identical joint distributions. The **Markov equivalence class** is the coarsest
object that observational data can identify without additional assumptions (non-Gaussianity,
functional form restrictions, or interventional data).

## Main Content

### Markov conditions

> [!definition] Definition: Causal Markov condition
> A DAG $\mathcal{G}$ and distribution $\mathbb{P}$ satisfy the **causal Markov condition** if,
> for every node $X_i$, $X_i$ is conditionally independent of its non-descendants given its
> parents:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{pa}_\mathcal{G}(X_i).$$
> Equivalently, the joint density factors as $p(x_1, \ldots, x_d) = \prod_{i} p(x_i \mid x_{\text{pa}(i)})$.
^def-markov-condition

> [!definition] Definition: Faithfulness
> A distribution $\mathbb{P}$ is **faithful** to $\mathcal{G}$ if every conditional independence
> $X_i \perp\!\!\!\perp X_j \mid S$ in $\mathbb{P}$ is entailed by d-separation in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp X_j \mid S \text{ in } \mathbb{P} \implies d\text{-sep}_\mathcal{G}(X_i, X_j \mid S).$$
> Faithfulness rules out accidental cancellations of causal paths. It holds generically (Lebesgue-
> almost-everywhere) for linear Gaussian SEMs.
^def-faithfulness

### Markov equivalence

> [!definition] Definition: Markov equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** if they entail exactly
> the same set of CI relations (d-separations). Equivalently, $\mathcal{G}_1 \sim \mathcal{G}_2$
> iff they have the **same skeleton** and the **same v-structures** (unshielded colliders:
> $X \to Z \leftarrow Y$ with $X, Y$ not adjacent).
>
> This is the **Verma-Pearl characterization** (1990), a purely graphical criterion.
^def-markov-equiv

> [!example] Example: Two equivalent DAGs
> Consider three nodes $\{X, Y, Z\}$. The DAGs $X \to Y \to Z$, $X \leftarrow Y \to Z$, and
> $X \leftarrow Y \leftarrow Z$ all have the same skeleton ($X - Y - Z$) and no v-structures.
> They are Markov equivalent: all three imply $X \perp\!\!\!\perp Z \mid Y$ and no other CI
> relations. In contrast, $X \to Y \leftarrow Z$ has a v-structure at $Y$ — it is **not**
> equivalent to the others.

### CPDAG (Essential Graph)

> [!definition] Definition: CPDAG (Meek 1995; Chickering 2002)
> The **Completed Partially Directed Acyclic Graph (CPDAG)** (also called the *essential graph*)
> is the unique graphical representative of a Markov equivalence class $[\mathcal{G}]$. It is a
> mixed graph on the same node set with:
> - A **directed edge** $X \to Y$ for every edge that is directed the same way in **all** DAGs in $[\mathcal{G}]$
> - An **undirected edge** $X - Y$ for every edge that appears in both orientations across $[\mathcal{G}]$
>
> The CPDAG is computable from any DAG in the class in $O(d^3)$ time (Dor & Tarsi 1992;
> Chickering 1995).
^def-cpdag

> [!theorem] Theorem: CPDAG characterization (Meek 1995)
> A mixed graph $\mathcal{C}$ is a CPDAG iff:
> 1. Its skeleton is an undirected graph (the shared skeleton of the equivalence class)
> 2. Every directed edge in $\mathcal{C}$ is a **compelled edge** — it appears in all DAGs of the class
> 3. Every undirected edge in $\mathcal{C}$ is a **reversible edge** — it appears in both orientations
> 4. $\mathcal{C}$ is acyclic (as a directed graph)
> 5. $\mathcal{C}$ contains no unshielded partially directed cycles (Meek's condition)
^thm-cpdag-characterization

### Meek orientation rules

After orienting v-structures (Phase II of PC), **Meek's four rules** are applied to extend the
orientation without creating new v-structures or directed cycles. See
[[V-Structures and Meek Orientation Rules]] for the full set of rules with diagrams.

## Why identifiability is limited to the equivalence class

In the purely observational, non-parametric setting, no method can distinguish two Markov
equivalent DAGs from data alone. The observational distribution is determined by the factorization
$p(x) = \prod_i p(x_i \mid x_{\text{pa}(i)})$, which is invariant to reorienting reversible edges.
The equivalence class is therefore the **coarsest identifiable object**.

**Exceptions** (additional structure enables unique DAG identification):
- **LiNGAM** (Shimizu et al. 2006): non-Gaussian noise + linear SEM → unique DAG identifiable
- **ANM** (Additive Noise Models, Hoyer et al. 2009): unique DAG under additive non-Gaussian noise
- **Interventional data**: hard interventions break the equivalence class structure
- **NOTEARS with non-Gaussian data**: continuous optimization implicitly leverages non-Gaussianity

## Connections

- **PC algorithm** uses d-separation tests to discover the skeleton and v-structures → computes
  the CPDAG via Meek rules. See [[PC Algorithm]].
- **GES** operates directly in CPDAG space (the search space is equivalence classes). The
  **Meek conjecture** (proved by Chickering 2002) ensures that covered edge reversals connect
  any two DAGs in the same class, justifying greedy search. See [[GES - Greedy Equivalence Search]].
- **NOTEARS** does *not* output a CPDAG — it outputs a single weighted adjacency matrix, which
  may not be acyclic at the global optimum and is identified only to a stationary point.
- **Directed Acyclic Graphs** in the vault covers d-separation, which is the CI criterion
  underpinning Markov equivalence. See [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm]] — algorithm that recovers the CPDAG via CI tests
- [[GES - Greedy Equivalence Search]] — algorithm that searches directly in CPDAG space
- [[V-Structures and Meek Orientation Rules]] — how the CPDAG is oriented from the skeleton
- [[Directed Acyclic Graphs]] — d-separation and Markov conditions in causal reasoning
- [[DAG Structure Learning Problem]] — the optimization problem PC and GES solve
