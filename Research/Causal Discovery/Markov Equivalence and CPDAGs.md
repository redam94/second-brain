---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-chickering02b-GES-JMLR.txt]]"
source_location: "Chickering (2002) §2; Spirtes, Glymour & Scheines (2000) Ch. 2-3"
date_ingested: 2026-10-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Essential graph"
  - "CPDAG"
  - "Markov equivalence class"
  - "Verma-Pearl equivalence"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs over the same variables are **Markov equivalent** if and only if they have
> the **same skeleton** (undirected adjacency graph) and the **same v-structures**
> (unshielded colliders). This is the Verma–Pearl theorem. The canonical representative
> of a Markov equivalence class is a **CPDAG** (Complete Partially Directed Acyclic Graph):
> directed edges encode orientations shared by every member of the class; undirected edges
> can be flipped. Both the PC algorithm and GES output CPDAGs, which is the most that
> purely observational data can recover without additional assumptions (interventions or
> non-Gaussianity).

## Overview

Structure learning from observational data faces a fundamental identifiability ceiling:
many different DAGs encode the same set of conditional independence relations over
observed variables. From i.i.d. observational data alone, no consistent algorithm can
distinguish between Markov-equivalent DAGs — they predict the same distribution under
every intervention-free regime. The correct output of a causal discovery algorithm
is therefore not a single DAG but the **Markov equivalence class** of the true DAG,
represented as a CPDAG.

Understanding which edges can and cannot be oriented is essential for both the
**PC algorithm** (which recovers the CPDAG via constraint-based testing) and
**GES** (which searches directly over the space of CPDAGs). It also determines
which causal effects are identifiable from observational data alone.

## Main Content

### V-structures and the equivalence characterization

> [!definition] Definition: Skeleton (Spirtes et al. 2000, §2)
> The **skeleton** of a DAG $\mathsf{G}$ is the undirected graph obtained by replacing
> every directed edge $X \to Y$ with an undirected edge $X - Y$. Two DAGs have the same
> skeleton iff they have the same adjacency structure, ignoring edge direction.
^def-skeleton

> [!definition] Definition: V-structure / Unshielded Collider (Spirtes et al. 2000, §2)
> A **v-structure** (also called an *unshielded collider*) in a DAG $\mathsf{G}$ is a triple
> $(X, Z, Y)$ such that:
> - $X \to Z$ and $Y \to Z$ (both $X$ and $Y$ are parents of $Z$), and
> - $X$ and $Y$ are **not adjacent** in $\mathsf{G}$ (the collider is *unshielded*).
>
> By contrast, a **shielded collider** has $X$ and $Y$ adjacent; its orientation is not
> identified from observational data and appears as an undirected edge in the CPDAG.
^def-vstructure

> [!theorem] Theorem: Verma–Pearl Equivalence Criterion (Verma & Pearl 1990; Spirtes et al. 2000)
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ over the same vertex set $\mathsf{V}$ are
> **Markov equivalent** — they encode the same set of conditional independence relations
> for every faithful distribution — **if and only if** they have:
> 1. The same **skeleton**, and
> 2. The same **v-structures**.
>
> Consequence: the equivalence class is entirely determined by the undirected skeleton
> plus the set of unshielded colliders. Every algorithm that outputs a CPDAG must
> correctly recover both.
^thm-verma-pearl

### CPDAG representation

> [!definition] Definition: CPDAG (Complete Partially Directed Acyclic Graph)
> (Chickering 2002, §2; also called the *essential graph*)
>
> A **CPDAG** $\mathcal{C}$ for a Markov equivalence class $[\mathsf{G}]$ is a graph
> on the same vertex set as $\mathsf{G}$ where:
> - A directed edge $X \to Y$ appears iff **every** DAG in $[\mathsf{G}]$ has $X \to Y$.
> - An undirected edge $X - Y$ appears iff $[\mathsf{G}]$ contains a DAG with $X \to Y$
>   **and** a DAG with $Y \to X$ (the edge direction is not identified).
>
> A CPDAG is always a **partial DAG** (a mix of directed and undirected edges) that is
> itself acyclic. Every directed edge in the CPDAG corresponds to an oriented edge shared
> by the entire class; undirected edges are the *unresolvable* ambiguities.
^def-cpdag

> [!example] Example: Two Markov-equivalent DAGs
>
> Consider three variables $X, Y, Z$.
> - DAG 1: $X \to Y \to Z$ (a chain)
> - DAG 2: $X \leftarrow Y \to Z$ (a fork / common cause)
>
> Both have skeleton $X - Y - Z$ and no v-structures ($Y$ is *not* a collider in either).
> By the Verma–Pearl theorem they are Markov equivalent. Their CPDAG is $X - Y - Z$
> (all edges undirected), signaling that neither orientation is identified.
>
> Now add $X \to Z$ (to either DAG). This creates the v-structure $X \to Z \leftarrow Y$
> in the new graph. This v-structure *is* identified, so the CPDAG has $X \to Z \leftarrow Y$
> as directed edges in the equivalence class.
^ex-cpdag

### Meek orientation rules

Once v-structures are placed, additional edges can sometimes be oriented by **acyclicity**
and **no-new-v-structure** constraints (orienting them the other way would either create
a cycle or introduce an unidentified v-structure).

> [!theorem] Meek's Orientation Rules (Meek 1995, arXiv:1302.4972)
> Given the skeleton and all v-structures, apply the following rules exhaustively until
> no new orientations are possible:
>
> **R1** (*Acyclicity*): If $A \to B - C$ and $A$ is not adjacent to $C$, orient $B \to C$.
> (Otherwise $C \to B$ would create the new v-structure $A \to B \leftarrow C$, but $A \not\sim C$.)
>
> **R2** (*Chain*): If $A \to C \to B$ and $A - B$, orient $A \to B$.
> (Otherwise $B \to A \to C \to B$ forms a directed cycle.)
>
> **R3** (*Ambiguous fork*): If $A - C \to B$, $A - D \to B$, $A - B$, and $C \not\sim D$,
> orient $A \to B$.
>
> **R4** (*Discriminating path*): If $A - B$, $A \to C \to B$, and every node on the path
> $A, \ldots, C$ is a parent of $B$, orient $A \to B$ (if $A \to B$ would create no v-structure).
>
> These four rules are **complete** (Meek 1995): applying them until convergence fully
> specifies the CPDAG from skeleton + v-structures.
^thm-meek-rules

### The Meek conjecture and covered edge reversals

Chickering (2002) needed to prove a related result for the correctness of GES:

> [!theorem] Meek Conjecture (proved by Chickering 2002, Theorem 15)
> If $\mathsf{H}$ is an independence map of $\mathsf{G}$ (i.e. every conditional independence
> in $\mathsf{G}$ also holds in $\mathsf{H}$), then there exists a finite sequence of
> **covered edge reversals** in $\mathsf{G}$ — reversing an edge $X \to Y$ where $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$ — that transforms $\mathsf{G}$ into $\mathsf{H}$,
> with every intermediate graph also an independence map of $\mathsf{H}$.
>
> This is the structural backbone of GES's proof of consistency: it guarantees that the
> forward search phase can always reach the equivalence class of the true DAG via a
> sequence of "covered" moves that preserve validity.
^thm-meek-conjecture

## Connections

- **PC algorithm** uses the Verma–Pearl theorem directly: after skeleton discovery and
  v-structure orientation, Meek's rules complete the CPDAG. See [[PC Algorithm]].
- **GES** searches over the space of CPDAGs using insert/delete operators. The Meek
  conjecture guarantees that this search is sufficient. See [[GES - Greedy Equivalence Search]].
- **NOTEARS** does *not* search over equivalence classes — it optimizes over individual
  weight matrices and may return any DAG in the true class. See [[NOTEARS - Overview]].
- **Identifiability ceiling**: CPDAGs are the identifiability limit for observational data.
  To do better, one needs: interventional data, LiNGAM-type non-Gaussianity assumptions
  (all edges identifiable), or additive noise assumptions (ANMs).
- **d-separation and DAG reasoning**: see [[Directed Acyclic Graphs]] for the semantics
  that make two DAGs "equivalent" (same d-separation relations).

## See Also
- [[PC Algorithm]] — recovers CPDAGs from conditional independence tests
- [[GES - Greedy Equivalence Search]] — searches over CPDAGs via score optimization
- [[DAG Structure Learning Problem]] — the general problem setup and score functions
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Spurious Association and Confounds]] — v-structures as confounders vs. mediators
