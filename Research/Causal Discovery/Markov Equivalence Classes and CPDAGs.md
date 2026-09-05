---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-PC.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 3; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-09-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "essential graph"
  - "completed partially directed acyclic graph"
  - "Meek rules"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs encode the **same set of conditional independencies** (are Markov equivalent) if
> and only if they share the same **skeleton** (undirected adjacency structure) and the same
> **v-structures** (unshielded colliders). A **CPDAG** (completed partially directed acyclic
> graph) is the unique canonical representative of each equivalence class: directed edges that
> are shared by every DAG in the class, undirected edges where orientation varies. Structure
> learning from observational data can identify the CPDAG but not, in general, the true DAG
> itself — this is the fundamental identifiability ceiling of constraint-based and score-based
> causal discovery.

## Overview

Observational data cannot distinguish between Markov equivalent DAGs: they assign exactly
the same joint distribution to any dataset. Consequently, learning DAGs from observational
data can at best recover the **Markov equivalence class** (MEC) of the true DAG. This
identifiability limit motivates the CPDAG representation: rather than reporting one arbitrary
DAG from the class, algorithms such as [[PC Algorithm]] and [[Greedy Equivalence Search]]
report a CPDAG — the unique graphical object that encodes precisely what the data can tell
you about the true causal graph.

Understanding the MEC is **prerequisite** to understanding what PC and GES output, why they
are evaluated on CPDAGs rather than DAGs, and what additional assumptions (functional form
restrictions, intervention data) are needed to fully orient a CPDAG.

## Main Content

### Skeleton and V-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G = (V, E)$ is the undirected graph $G^{\mathrm{skel}}$
> obtained by replacing every directed edge $X \to Y$ in $G$ with an undirected edge
> $X - Y$. Two DAGs with the same skeleton have the same set of variable pairs that are
> directly causally connected.
^def-skeleton

> [!definition] Definition: V-structure (unshielded collider / immorality)
> A **v-structure** in a DAG $G$ is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z \leftarrow Y$ (both $X$ and $Y$ point into $Z$, so $Z$ is a **collider**), and
> 2. $X$ and $Y$ are **not adjacent** in $G$ (the triple is **unshielded**).
>
> V-structures are also called **immoralities** — the phrase "two parents not married to
> each other." They are visible in the data as conditional independence patterns (the
> **explaining away** effect: $X \perp Y$ marginally but $X \not\perp Y \mid Z$).
^def-vstructure

### The Verma–Pearl Markov Equivalence Theorem

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ on the same vertex set $V$ are **Markov equivalent** — they encode
> the same set of conditional independence relations via d-separation — if and only if they
> have:
> 1. The **same skeleton**, and
> 2. The **same set of v-structures**.
>
> Equivalently: $G$ and $G'$ are Markov equivalent $\iff$ for every path in $G^{\mathrm{skel}}$,
> the colliders and non-colliders are the same in both $G$ and $G'$.
^thm-markov-equiv

**Consequence for identifiability.** Any algorithm that uses only conditional independence
information (or any score that depends only on the distribution) can identify the skeleton
and the v-structures, but *cannot* orient edges that are not in v-structures. That is the
best any purely observational method can do.

### Completed Partially Directed Acyclic Graph (CPDAG)

> [!definition] Definition: CPDAG (Essential Graph)
> The **CPDAG** $G^* = \mathrm{CPDAG}(G)$ of a DAG $G$ is the unique graph with the same
> vertex set $V$ satisfying:
> 1. $X \to Y$ is a **directed** edge in $G^*$ if and only if every DAG in the Markov
>    equivalence class of $G$ has the edge $X \to Y$.
> 2. $X - Y$ is an **undirected** edge in $G^*$ if and only if the MEC contains a DAG
>    with $X \to Y$ and another DAG with $Y \to X$.
> 3. $G^*$ represents the same Markov equivalence class as $G$: the set of DAGs consistent
>    with $G^*$ is exactly the MEC of $G$.
>
> CPDAGs are also called **essential graphs** (Andersson, Madigan & Perlman, 1997).
^def-cpdag

A CPDAG is always a DAG or a chain graph (possibly with undirected edges). Its directed
edges are **compelled** by the distribution; its undirected edges are **reversible**.

### Meek's Orientation Rules

Given the **skeleton** and **v-structures** of a DAG, the CPDAG can be constructed by
propagating orientations using four deterministic rules (Meek, 1995). These rules are
applied repeatedly until no new orientations can be derived.

> [!definition] Meek Rules R1–R4 (Meek, 1995)
> Let $G$ be an undirected/partially directed graph. Apply these rules in any order until
> no further orientations result:
>
> **R1 (Away from collider):** If $X \to Y - Z$ and $X$ is not adjacent to $Z$,
> orient $Y \to Z$.
> *Reason:* orienting $Z \to Y$ would create a new v-structure at $Y$, absent from the
> skeleton + v-structure specification.
>
> **R2 (Away from cycle):** If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$.
> *Reason:* orienting $Z \to X$ would create a directed cycle.
>
> **R3 (Hybrid):** If $X - Y \to Z$ and $X - W \to Z$ and $X - Z$ and $Y$ not adjacent to $W$,
> orient $X \to Z$.
> *Reason:* any other orientation of $X - Z$ violates the acyclicity or v-structure
> specification.
>
> **R4 (Cycle avoidance):** If $X - Y \to Z \to W$ and $X - W$ and $X$ adjacent to $Z$,
> orient $X \to W$.
^def-meek-rules

Meek (1995) proves these four rules are **sound** (every derived orientation is correct) and
**complete** (combined with the v-structures, they derive all compelled edge orientations).

### Characterizing CPDAGs

A partially directed graph $H$ is a valid CPDAG if and only if it satisfies:
1. **Chordal skeleton**: the undirected part of $H$ has a chordal (triangulated) subgraph
   induced by the chain components.
2. **V-structure consistency**: every induced v-structure in $H$ is a genuine v-structure
   of every DAG it represents.
3. **Meek completeness**: $H$ cannot be further oriented by R1–R4.

The **PDAG-to-CPDAG** completion algorithm (Dor & Tarsi, 1992) converts any valid PDAG
(partially directed acyclic graph) into its unique CPDAG in polynomial time.

## Examples

> [!example] Example: Chain vs. Fork vs. Collider
> Consider three variables $X, Y, Z$. The three DAGs
> $X \to Y \to Z$, $X \leftarrow Y \to Z$, and $X \leftarrow Y \leftarrow Z$ are all
> **Markov equivalent**: they share the same skeleton ($X-Y-Z$) and have no v-structures.
> Their CPDAG is $X - Y - Z$ (fully undirected).
>
> The DAG $X \to Y \leftarrow Z$ (with $X$ not adjacent to $Z$) is **not** equivalent to the
> above three: it has the v-structure $(X, Y, Z)$. Its CPDAG is $X \to Y \leftarrow Z$
> (fully directed, since the v-structure compels both orientations).

> [!example] Example: When edges are compelled
> Add a fourth variable: $X \to Y \leftarrow Z$ and $X \to W \to Z$.
> Now $X \to Z$ via $W$ but $X \not\to Z$ directly. By R2 (away from cycle), the edge
> $X - W$ (if undirected) must be oriented $X \to W$ to avoid the cycle $X \to Z \to \ldots$
> — illustrating how Meek rules propagate.

## Connections

- **Faithfulness assumption**: the correspondence between d-separation and conditional
  independence in the data (necessary for PC/GES to identify the correct MEC).
  See [[DAG Structure Learning Problem]] for the SEM setup and [[Directed Acyclic Graphs]]
  for d-separation.
- **PC algorithm**: uses CI tests to discover skeleton and v-structures, then applies Meek
  rules — outputs a CPDAG. See [[PC Algorithm]].
- **GES**: searches directly over the space of CPDAGs using a decomposable score. See
  [[Greedy Equivalence Search]].
- **NOTEARS**: outputs a DAG (weighted adjacency matrix $W$), which can be converted to a
  CPDAG if needed — see [[NOTEARS - Overview]].
- **Beyond observational data**: the CPDAG can be further oriented using **interventional
  data** (Pearl's do-calculus, [[Directed Acyclic Graphs]]) or **functional restrictions**
  (linear non-Gaussian: LiNGAM assumes non-Gaussian noise to identify the full DAG).

## See Also
- [[PC Algorithm]] — uses skeleton + v-structures + Meek rules to construct a CPDAG
- [[Greedy Equivalence Search]] — score-based search over the CPDAG space
- [[Directed Acyclic Graphs]] — d-separation, causal DAG reasoning
- [[DAG Structure Learning Problem]] — score-based formulation and SEM setup
- [[Constraint-Based vs Score-Based Causal Discovery]] — comparative overview
