---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-meek-sges.pdf]]"
source_location: "§2, pp. 1-3 (Background on Equivalence Classes)"
date_ingested: 2026-08-13
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "equivalence class of DAGs"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independences,
> i.e. they have the same skeleton and the same v-structures (Verma & Pearl, 1991).
> An equivalence class of DAGs has a unique canonical representative — the **CPDAG**
> (Completed Partially Directed Acyclic Graph) — in which directed edges are edges that are
> compelled (identical across all DAGs in the class) and undirected edges are reversible.
> Because observational data alone can at best identify the Markov equivalence class, the CPDAG
> is the finest-grained causal structure recoverable without interventions.

## Overview

Score-based and constraint-based structure-learning algorithms aim to learn a DAG from data,
but purely observational data can never distinguish between Markov-equivalent DAGs: they imply
exactly the same joint distribution for every parameter setting. The natural target is therefore
the **Markov equivalence class** of the true DAG, represented as its CPDAG.

Understanding equivalence is essential for:
- interpreting the output of [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]] (both
  return CPDAGs, not individual DAGs);
- knowing which causal directions are *identified* from data vs. which require interventions;
- understanding why operators in GES work over equivalence classes rather than DAGs.

## Main Content

### Skeleton and V-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G = (\mathbf{V}, \mathbf{E})$ is the undirected graph obtained by
> replacing every directed edge $X \to Y$ (or $X \leftarrow Y$) with an undirected edge $X - Y$.
> The skeleton records which pairs of variables are adjacent, ignoring orientation.
^def-skeleton

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** in a DAG $G$ is a triple $(X, Y, Z)$ such that:
> - $X \to Y \leftarrow Z$ (both $X$ and $Z$ point into $Y$), and
> - $X$ and $Z$ are *not* adjacent in $G$.
>
> $Y$ is called a **collider** on the path $X - Y - Z$. The "unshielded" qualifier (used in
> the PC algorithm literature) emphasizes the non-adjacency of $X$ and $Z$.
^def-vstructure

### Markov Equivalence

> [!theorem] Theorem: Verma-Pearl Characterization (Verma & Pearl, 1991)
> Two DAGs $G$ and $G'$ are **Markov equivalent** — they encode the same set of conditional
> independences via d-separation — **if and only if** they have:
> 1. the same **skeleton**, and
> 2. the same **v-structures**.
>
> Equivalently, $G \sim G'$ iff $\mathrm{d\text{-}sep}(G) = \mathrm{d\text{-}sep}(G')$.
^thm-verma-pearl

> [!note] Why equivalence is the limit of observational learning
> A distribution $P$ is **Markov** with respect to $G$ if every d-separation in $G$ implies
> a conditional independence in $P$. It is **faithful** to $G$ if the converse also holds —
> no conditional independence in $P$ beyond those entailed by $G$. Under faithfulness, the
> observational distribution identifies exactly the Markov equivalence class of $G$, not $G$
> itself. Directed edges that appear in all Markov-equivalent DAGs are *compelled*;
> those that can be reversed without leaving the class are *reversible*.

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> A **CPDAG** $C$ for an equivalence class $[G]$ is a partially directed acyclic graph (PDAG)
> satisfying two properties:
> 1. Every **directed** edge $X \to Y$ in $C$ corresponds to a **compelled** edge — the edge
>    $X \to Y$ (not $X \leftarrow Y$) appears in *every* DAG in the equivalence class.
> 2. Every **undirected** edge $X - Y$ in $C$ corresponds to a **reversible** edge — both
>    $X \to Y$ and $X \leftarrow Y$ appear in different DAGs within the equivalence class.
>
> Unlike non-completed PDAGs, the CPDAG representation of an equivalence class is **unique**.
> (Chickering & Meek, *SGES*, §2)
^def-cpdag

> [!note] Practical implication
> Given a CPDAG, every undirected edge $X - Y$ signals that the causal direction between $X$
> and $Y$ is **not identifiable** from observational data alone. Directed edges $X \to Y$ are
> identifiable; they represent genuine causal claims recoverable under faithfulness.

### Covered Edges and Transformations

> [!definition] Definition: Covered edge
> An edge $X \to Y$ is **covered** in a DAG $G$ if $X$ and $Y$ have the same parent set except
> that $X$ is not its own parent:
> $$\mathrm{Pa}^G(X) = \mathrm{Pa}^G(Y) \setminus \{X\}.$$
>
> Reversing a covered edge is the elementary operation linking DAGs within the same equivalence
> class. Chickering (1995) showed that any two Markov-equivalent DAGs are connected by a sequence
> of covered-edge reversals.
^def-covered-edge

> [!theorem] Theorem: Covered-edge connectivity (Chickering, 1995)
> Let $G$ and $G'$ be Markov-equivalent DAGs. Then there exists a sequence of DAGs
> $G = G_0, G_1, \ldots, G_k = G'$ such that each $G_{i+1}$ is obtained from $G_i$ by
> reversing a single covered edge. Moreover, every intermediate $G_i$ is Markov-equivalent to $G$.
^thm-covered-edge-connectivity

### d-Separation

> [!definition] Definition: d-Separation
> A path $\pi$ between nodes $X$ and $Y$ in a DAG is **blocked** by a set $\mathbf{Z}$ if
> there exists a node $W$ on $\pi$ such that either:
> - $W$ is a **non-collider** on $\pi$ (i.e., both edges on $\pi$ at $W$ point away from $W$,
>   or one points in) and $W \in \mathbf{Z}$, or
> - $W$ is a **collider** on $\pi$ (i.e., both edges point into $W$) and neither $W$ nor any
>   descendant of $W$ is in $\mathbf{Z}$.
>
> $X$ and $Y$ are **d-separated** given $\mathbf{Z}$ in $G$ (written $X \perp_G Y \mid \mathbf{Z}$)
> if every path between them is blocked by $\mathbf{Z}$.
^def-dsep

## Connections

- **Constraint-based learning** ([[PC Algorithm]]) estimates the equivalence class by testing
  d-separation statements (conditional independences) in data; the output is a CPDAG.
- **Score-based learning** ([[Greedy Equivalence Search (GES)]]) searches *directly over CPDAGs*,
  applying INSERT and DELETE operators that move between adjacent equivalence classes; consistency
  is proved in terms of $C \approx G$ (CPDAG approximating the true DAG's class).
- **NOTEARS** ([[NOTEARS - Overview]]) learns a single DAG $W$ via continuous optimization and
  does not explicitly represent the equivalence class, though in practice multiple equivalent
  solutions may achieve similar scores.
- The **faithfulness assumption** (see [[PC Algorithm]]) is what lets the equivalence class be
  identified from observational data; without it, the Markov property gives only a superset.

## See Also
- [[Directed Acyclic Graphs]] — foundational DAG definitions in the causal-inference sense
- [[DAG Structure Learning Problem]] — the score and optimization targets that build on this
- [[PC Algorithm]] — constraint-based algorithm returning a CPDAG
- [[Greedy Equivalence Search (GES)]] — score-based algorithm searching over equivalence classes
- [[Causal Structure Learning - Overview]] — comparison of approaches
