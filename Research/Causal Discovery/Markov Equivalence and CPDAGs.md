---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-ref.md]]"
source_location: "SGS 2000, §3; Verma & Pearl (1990); Chickering (2002) §2"
date_ingested: 2026-10-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
aliases:
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalence class"
  - "essential graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independencies
> and are therefore indistinguishable from observational data alone. The Verma–Pearl theorem
> (1990) gives a clean graphical characterisation: same **skeleton** (undirected adjacency) + same
> **v-structures** (unshielded colliders). The canonical representation of a Markov equivalence
> class (MEC) is the **CPDAG** (Completed Partially Directed Acyclic Graph), also called the
> *essential graph*: a mixed graph in which edges that are shared across all DAGs in the MEC are
> directed, and edges that vary in orientation are left undirected.

## Overview

The fundamental limit of observational causal discovery is that multiple DAGs can be
*statistically equivalent*: they imply the exact same set of conditional independencies
(d-separation relations), so no amount of observational data can distinguish between them.
This means structure-learning algorithms cannot recover the unique true DAG — only its
**Markov equivalence class**. Understanding what is and is not identifiable from observations
motivates the CPDAG representation, which is the common target of both constraint-based
([[PC Algorithm]]) and score-based ([[GES Algorithm]]) discovery methods.

## Main Content

### Markov properties and d-separation

A DAG $G$ over variables $X_1,\ldots,X_d$ encodes conditional independencies via the
**global Markov property**: $X_A \perp\!\!\!\perp X_B \mid X_C$ in the distribution $\mathbb{P}$
whenever $A$ and $B$ are d-separated by $C$ in $G$.

> [!definition] Definition: d-separation
> In a DAG $G$, a path $\pi$ between $X$ and $Y$ is **blocked** by a set $S$ if
> - $\pi$ contains a **fork** $X_i \leftarrow Z \rightarrow X_j$ with $Z \in S$, or
> - $\pi$ contains a **chain** $X_i \rightarrow Z \rightarrow X_j$ with $Z \in S$, or
> - $\pi$ contains a **collider** $X_i \rightarrow Z \leftarrow X_j$ with $Z \notin S$
>   **and no descendant of $Z$ is in $S$**.
>
> $X$ and $Y$ are **d-separated** by $S$ if every path between them is blocked by $S$.
> We write $X \perp_G Y \mid S$. The induced conditional independence is $X \perp\!\!\!\perp Y \mid S$.
^def-dsep

### Skeleton and v-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G$ is the undirected graph $\text{skel}(G)$ obtained by
> replacing each directed edge $X_i \to X_j$ with an undirected edge $X_i - X_j$.
^def-skeleton

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** (or *unshielded collider*) in a DAG $G$ is a triple
> $(X_i, X_k, X_j)$ such that:
> 1. $X_i \to X_k \leftarrow X_j$ (i.e. $X_k$ has two parents $X_i, X_j$), and
> 2. $X_i$ and $X_j$ are **non-adjacent** in $G$ (the triple is unshielded).
>
> The distinction from *shielded* colliders $X_i \to X_k \leftarrow X_j$ with $X_i - X_j$
> is crucial: shielded colliders are not invariant across the MEC.
^def-vstructure

### The Verma–Pearl characterisation theorem

> [!theorem] Theorem: Markov equivalence characterisation (Verma & Pearl 1990)
> Two DAGs $G$ and $H$ are **Markov equivalent** — they encode the same set of
> conditional independencies — if and only if they have:
> 1. The **same skeleton**: $\text{skel}(G) = \text{skel}(H)$, and
> 2. The **same set of v-structures**.
>
> **Consequence:** the Markov equivalence class (MEC) of any DAG is fully determined by
> its skeleton and v-structures, a finite combinatorial object.
^thm-verma-pearl

This theorem is the foundation of identifiability analysis: any edge $X_i \to X_j$ that
belongs to the same orientation in *all* DAGs in the MEC is identified; edges whose
orientation varies are unidentifiable from observational data.

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a MEC $[G]$ is the unique mixed graph — containing both directed ($\to$)
> and undirected ($-$) edges — that satisfies:
> - An edge $X_i \to X_j$ appears **directed** in the CPDAG iff it is directed the same way
>   in **every** DAG in $[G]$ (a *compelled* edge).
> - An edge appears **undirected** $X_i - X_j$ iff there exist DAGs in $[G]$ with $X_i \to X_j$
>   and others with $X_i \leftarrow X_j$ (a *reversible* edge).
>
> Every CPDAG is a valid **PDAG** (partially directed acyclic graph): a mixed graph from which
> at least one DAG extension exists that is acyclic.
^def-cpdag

> [!note] Why "completed"?
> The "C" in CPDAG refers to applying Meek's (1995) orientation rules exhaustively until no
> further edges can be oriented. An incompletely oriented PDAG and its CPDAG represent the same
> MEC; the CPDAG is the maximally informative representation.

### Characterising compelled vs. reversible edges

Chickering (1995) showed that an edge $X_i \to X_j$ is **compelled** (must be directed in
the CPDAG) if and only if there exists a node $X_k$ such that $X_k \to X_i$ but $X_k$ is
not a parent of $X_j$. Otherwise the edge is reversible and appears undirected in the CPDAG.

### Implications for structure learning

The CPDAG is the **correct output** of an observational causal discovery algorithm:

| Algorithm class | Target object | Method |
|-----------------|---------------|--------|
| Constraint-based (PC) | CPDAG | CI tests → skeleton + v-structures + Meek rules |
| Score-based (GES) | CPDAG | Greedy score maximisation in CPDAG space |
| Continuous optimisation (NOTEARS) | DAG (one member of MEC) | Smooth acyclicity constraint |

NOTEARS recovers one specific DAG, not the full equivalence class; PC and GES recover the
CPDAG. The CPDAG is preferable for causal interpretation because it makes explicit which
causal directions are *identified* from data.

## Examples

> [!example] Example: Three-node MECs
> Consider three variables $X_1, X_2, X_3$. The DAG $X_1 \to X_2 \to X_3$ is Markov
> equivalent to $X_1 \leftarrow X_2 \leftarrow X_3$ and to $X_1 \leftarrow X_2 \to X_3$.
> All three have skeleton $X_1 - X_2 - X_3$ and **no v-structures** (since $X_1$ and $X_3$
> are not adjacent). Their CPDAG is $X_1 - X_2 - X_3$ (all edges undirected).
>
> By contrast, the **collider** $X_1 \to X_2 \leftarrow X_3$ (with $X_1, X_3$ non-adjacent)
> is **alone in its MEC**: it has the same skeleton but a v-structure at $X_2$ that the others
> lack. Its CPDAG is $X_1 \to X_2 \leftarrow X_3$ (both edges compelled).

## Connections

- **Faithfulness assumption**: almost all observational discovery results assume
  **faithfulness** (no CI holds in the distribution that is not implied by d-separation in $G$).
  Under faithfulness + the Markov property, the population-level MEC is identifiable from the
  joint distribution.
- **DAG learning algorithms**: [[PC Algorithm]] recovers the CPDAG via CI tests;
  [[GES Algorithm]] recovers it via greedy score search over CPDAG space.
- **Causal identification**: once the CPDAG is known, causal effects on directed edges are
  point-identified; effects along undirected edges are identified only up to a range. See
  [[Directed Acyclic Graphs]] for do-calculus identification.
- **Interventional data**: with interventional data, some reversible edges become compelled,
  shrinking the equivalence class to an **I-MEC** (Hauser & Bühlmann 2012).

## See Also
- [[DAG Structure Learning Problem]] — the optimization problem NOTEARS and GES solve
- [[PC Algorithm]] — constraint-based recovery of the CPDAG
- [[GES Algorithm]] — score-based recovery of the CPDAG
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, back-door criterion
- [[Spurious Association and Confounds]] — fork/chain/collider patterns in causal DAGs
