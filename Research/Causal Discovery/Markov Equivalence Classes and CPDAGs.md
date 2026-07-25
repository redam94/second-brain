---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/survey-PC-algorithm-constraint-based-causal-discovery.md]]"
source_location: "Chickering (1995), Meek (1995), Andersson et al. (1997)"
date_ingested: 2026-07-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "essential graph"
  - "equivalence class of DAGs"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they have the same **skeleton**
> (undirected graph of adjacencies) and the same **v-structures** (colliders
> $X \to Z \leftarrow Y$ with $X, Y$ non-adjacent). Every Markov equivalence class
> has a unique representative called the **CPDAG** (Completed Partially Directed
> Acyclic Graph) or **essential graph**: directed edges in the CPDAG are shared by
> all DAGs in the class; undirected edges can be oriented either way. Observational
> data can identify at most the equivalence class — not an individual DAG.

## Overview

Causal structure learning from observational data faces a fundamental identifiability
ceiling: many different directed acyclic graphs encode exactly the same set of conditional
independence relations and therefore produce exactly the same joint distribution. These
are **Markov equivalent** graphs, and no observational dataset — however large — can
distinguish between them. Knowing the equivalence class is what structure learning can
maximally recover; recovering more requires either interventional data, functional
assumptions (e.g. linear non-Gaussian noise), or expert knowledge.

This note establishes the algebraic characterisation of equivalence classes, the unique
representative (CPDAG), and the orientation rules for constructing it from a skeleton
and v-structures. Both the [[PC Algorithm]] and [[GES - Greedy Equivalence Search]]
output CPDAGs as their canonical result.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990; Chickering 1995)
> Two DAGs $G_1$ and $G_2$ over the same variable set $V$ are **Markov equivalent**,
> written $G_1 \sim G_2$, if and only if they encode exactly the same set of
> conditional independence relations — i.e., for all disjoint sets $\mathbf{X}, \mathbf{Y},
> \mathbf{Z} \subseteq V$:
> $$G_1 \text{-d-separates } \mathbf{X} \text{ from } \mathbf{Y} \text{ given } \mathbf{Z}
> \iff G_2 \text{-d-separates } \mathbf{X} \text{ from } \mathbf{Y} \text{ given } \mathbf{Z}$$
> Under causal faithfulness, this is equivalent to: $G_1$ and $G_2$ produce the same
> joint distribution $P$ for every parameterisation compatible with the graph.
^def-markov-equivalence

### Graphical characterisation: the Verma-Pearl theorem

> [!theorem] Theorem: Graphical Characterisation of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if they have:
> 1. The same **skeleton** — the same undirected graph of adjacencies ($X_i - X_j$ exists
>    in both iff $X_i$ and $X_j$ are adjacent in both).
> 2. The same **v-structures** (immoralities) — for every triple $(X_i, X_k, X_j)$ where
>    $X_i$ and $X_j$ are non-adjacent: $X_i \to X_k \leftarrow X_j$ appears in $G_1$ iff
>    it appears in $G_2$.
>
> **Consequence:** the only edges whose directions are invariant across all DAGs in the
> class are edges that participate in compelled orientation — everything else is free to
> flip.
^thm-verma-pearl

### The CPDAG (essential graph)

> [!definition] Definition: CPDAG / Essential Graph (Andersson, Madigan & Perlman 1997)
> The **Completed Partially Directed Acyclic Graph** (**CPDAG**), also called the
> **essential graph**, of a Markov equivalence class $[G]$ is the unique partially
> directed graph $\mathcal{C}$ over $V$ satisfying:
> 1. **Same skeleton:** $\mathcal{C}$ has the same undirected adjacencies as any $G \in [G]$.
> 2. **Compelled directed edges:** $X_i \to X_j$ is a directed edge in $\mathcal{C}$ iff
>    every DAG in $[G]$ has $X_i \to X_j$.
> 3. **Undirected edges:** $X_i - X_j$ is undirected in $\mathcal{C}$ iff some DAGs in
>    $[G]$ have $X_i \to X_j$ and others have $X_j \to X_i$.
>
> The CPDAG is a **unique** representative: two equivalence classes have the same CPDAG
> iff they are the same class.
^def-cpdag

> [!example] Example: Three-variable equivalence classes
> Over three variables $\{X, Y, Z\}$, the chain $X \to Y \to Z$ and the chain
> $X \leftarrow Y \leftarrow Z$ and the chain $X \leftarrow Y \rightarrow Z$ are all
> Markov equivalent (same skeleton $X - Y - Z$, no v-structures). Their CPDAG is
> the undirected path $X - Y - Z$.
>
> The v-structure $X \to Y \leftarrow Z$ (with $X, Z$ non-adjacent) is in its own
> equivalence class; its CPDAG has the directed edges $X \to Y \leftarrow Z$ (both
> compelled) — the only three-variable DAG not Markov equivalent to the chain.

### Constructing the CPDAG: Meek's orientation rules

Given the skeleton and v-structures, the CPDAG is constructed by applying **Meek's
orientation rules** (R1–R4) exhaustively (Meek 1995). Each rule orients an undirected
edge $X_i - X_j$ without creating a new v-structure or directed cycle.

> [!theorem] Meek's Orientation Rules R1–R4
>
> **R1 (Away from collider):** If $X_i \to X_k - X_j$ and $X_i, X_j$ are non-adjacent,
> then orient $X_k \to X_j$.
> *Rationale: orienting $X_j \to X_k$ would create the v-structure $X_i \to X_k \leftarrow X_j$.*
>
> **R2 (Away from cycle):** If $X_i \to X_k \to X_j$ and $X_i - X_j$,
> then orient $X_i \to X_j$.
> *Rationale: orienting $X_j \to X_i$ would create the directed cycle $X_i \to X_k \to X_j \to X_i$.*
>
> **R3 (Double fork):** If $X_i - X_k \to X_j$, $X_i - X_l \to X_j$, $X_i - X_j$,
> and $X_k, X_l$ are non-adjacent, then orient $X_i \to X_j$.
>
> **R4 (Discorded triple):** If $X_i - X_k \to X_l \to X_j$, $X_i - X_j$,
> and $X_i, X_l$ are non-adjacent, then orient $X_i \to X_j$.
>
> **Meek's completeness theorem:** R1–R4 applied to exhaustion produce exactly the CPDAG
> — every compelled edge is oriented, no non-compelled edge is wrongly forced.
^thm-meek-rules

### How many DAGs are in a typical equivalence class?

The fraction of edges in the CPDAG that are directed (compelled) varies widely:
- **Sparse graphs:** many undirected edges; large equivalence classes.
- **Dense graphs with many v-structures:** most edges compelled; smaller equivalence classes.
- **Empty graph:** one equivalence class containing only the empty graph.
- **Complete DAG:** every DAG on $d$ variables with a fixed ordering is in its own
  singleton class (all edges compelled by transitivity).

On random ER graphs, roughly 40–60% of edges are typically compelled.

## Connections

- **Identifiability:** without additional assumptions (linearity, non-Gaussianity, acyclicity
  in the SEM noise), observational data identifies at most the equivalence class. This is
  why both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]] output CPDAGs, not
  individual DAGs.
- **Interventional data:** an intervention on variable $X_i$ (fixing $X_i = x$) can
  orient edges incident on $X_i$, shrinking the equivalence class (Hauser & Bühlmann 2012).
- **NOTEARS** — see [[NOTEARS - Overview]] — operates on the continuous matrix $W$ and
  returns a DAG, not a CPDAG. It can discover the DAG up to the equivalence class; in
  practice, NOTEARS may output one arbitrary member of the equivalence class.
- **Directed Acyclic Graphs (DAGs)** in the vault — see [[Directed Acyclic Graphs]] — cover
  the *causal semantics* (d-separation, do-calculus, back-door criterion); this note covers
  the *statistical identifiability* structure.

## See Also
- [[PC Algorithm]] — constraint-based algorithm outputting the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm searching CPDAG space
- [[NOTEARS - Overview]] — continuous optimization approach, outputs a single DAG
- [[DAG Structure Learning Problem]] — formal problem setup
- [[Directed Acyclic Graphs]] — causal semantics of DAGs in the vault
- [[Conditional Independence Tests for Causal Discovery]] — CI testing used to recover skeleton/v-structures
