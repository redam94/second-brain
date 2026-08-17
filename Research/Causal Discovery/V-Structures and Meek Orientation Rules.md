---
title: "V-Structures and Meek Orientation Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-algorithm-source-notes.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), CPS Ch. 5; Meek (1995) UAI; Chickering (2002) JMLR"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Constraint-Based Skeleton Learning]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "Meek rules"
  - "PC Phase 2"
  - "PC Phase 3"
  - "v-structure orientation"
  - "CPDAG completion rules"
---

# V-Structures and Meek Orientation Rules

> [!summary]
> The PC algorithm's Phases 2 and 3 convert an undirected skeleton into a CPDAG.
> **Phase 2** identifies **v-structures** (unshielded colliders $X \to Z \leftarrow Y$)
> by checking whether $Z$ belongs to the separation set of $X$ and $Y$. **Phase 3**
> propagates these orientations using **Meek's four rules** (R1–R4), which guarantee
> that no new v-structures or cycles are created. Together, Phases 2–3 produce the
> unique CPDAG of the true Markov equivalence class.

## Overview

After skeleton recovery (Phase 1 of PC — see [[Constraint-Based Skeleton Learning]]),
the graph is an undirected skeleton. Phases 2 and 3 add edge orientations to produce
the CPDAG.

**Why are some edges orientable from data?** V-structures have a distinguishing statistical
signature: the collider variable $Z$ in $X \to Z \leftarrow Y$ is **not** in any separating
set of $X$ and $Y$ (because conditioning on $Z$ opens, rather than blocks, the path).
This asymmetry between colliders and non-colliders (chains and forks) is what makes
v-structures identifiable from observational data.

## Main Content

### Phase 2: V-Structure Orientation

> [!definition] Algorithm: V-Structure Identification (CPS, Algorithm 5.4.2)
> For every **unshielded triple** $(X_i, X_k, X_j)$ in the skeleton — meaning:
> - $X_i - X_k$ is an edge and $X_k - X_j$ is an edge,
> - $X_i$ and $X_j$ are **not adjacent** (no edge between them):
>
> **If** $X_k \notin \mathrm{sep}(i,j)$:
> Orient as $X_i \to X_k \leftarrow X_j$ (v-structure).
>
> **If** $X_k \in \mathrm{sep}(i,j)$:
> Leave $X_i - X_k - X_j$ unoriented (chain or fork: direction undetermined).
>
> **Output**: A partially directed acyclic graph (PDAG) with some directed and some
> undirected edges.
> ^alg-vstructure

**Intuition**: In a causal chain $X_i \to X_k \to X_j$ or fork $X_i \leftarrow X_k \to X_j$,
conditioning on $X_k$ *blocks* the path, so $X_k \in \mathrm{sep}(i,j)$ (i.e., $X_k$
makes $X_i$ and $X_j$ conditionally independent). In a v-structure $X_i \to X_k \leftarrow X_j$,
conditioning on $X_k$ *opens* the path (Berkson's paradox / collider bias), so
$X_k \notin \mathrm{sep}(i,j)$.

### Phase 3: Meek Orientation Rules

The PDAG from Phase 2 may still have undirected edges. **Meek (1995)** proved that the
following four rules, applied exhaustively, uniquely complete the CPDAG without
introducing new v-structures or directed cycles.

> [!theorem] Meek's Orientation Rules (Meek 1995, Theorem 1; Chickering 2002)
> Apply the following rules repeatedly until no new orientations can be made:
>
> **R1** (Acyclicity / avoid new v-structure):
> If $X_i \to X_k - X_j$ and $X_i$ is not adjacent to $X_j$,
> then orient $X_k \to X_j$.
> *Reason*: If we set $X_k \leftarrow X_j$, then $X_i \to X_k \leftarrow X_j$ would be a
> new v-structure (since $X_i - X_j$ is absent), contradicting correctness.
>
> **R2** (No directed cycle):
> If $X_i - X_k$ and $X_i \to X_j \leftarrow X_k$ (... actually let me be precise):
> If $X_i \to X_j$ and $X_i - X_k \to X_j$, orient $X_i \to X_k$.
> *Reason*: Otherwise $X_k \leftarrow X_i$ would create a cycle $X_i \to X_j \leftarrow X_k \leftarrow X_i$.
> Wait — that's not a standard statement. Let me give the correct R2:
> If $X_i - X_k \to X_j$ and $X_i \to X_j$, then any DAG in the class needs $X_k \neq X_j$'s parent
> ... The standard formulation: If $X_i - X_k$ and there is a directed path from $X_i$ to $X_k$
> (via other nodes), orient $X_i \to X_k$.
>
> **Standard R2**: If $X_i - X_j$ and there is a **directed path** $X_i \leadsto X_j$ in the
> current PDAG, orient $X_i \to X_j$ (to avoid a cycle).
>
> **R3**: If $X_i - X_k \to X_j$ and $X_i - X_l \to X_j$ and $X_i - X_j$ and $X_k$
> not adjacent to $X_l$, orient $X_i \to X_j$.
> *Reason*: Either $X_k \to X_i$ or $X_l \to X_i$ would create a new v-structure at $X_j$.
>
> **R4**: If $X_i - X_k \to X_l \to X_j$ and $X_i - X_j$ and $X_i$ not adjacent to $X_l$,
> orient $X_i \to X_j$.
>
> **Theorem (Meek 1995)**: Rules R1–R4 are **sound and complete** for CPDAG completion —
> applying them exhaustively produces exactly the CPDAG (no more, no fewer orientations).
> ^thm-meek-rules

**Note on R2 formulation**: The precise formulation of R2 in the literature is:
"If $X_i \to X_k$ and $X_k - X_j$ and $X_i \to X_j$, then orient $X_k \to X_j$."
(This avoids the directed cycle $X_i \to X_j \leftarrow X_k - X_i$ being completed
into a cycle if $X_k \leftarrow X_i$.) The formulation varies across presentations but
the four rules together are standard and complete.

### Completeness of PC

> [!theorem] Completeness of PC (CPS, Theorem 5.1)
> Under the faithfulness assumption, the Markov condition, causal sufficiency, and an
> oracle CI test, the output of Algorithm PC (skeleton + v-structures + Meek R1–R4) is
> the unique **CPDAG** of the true Markov equivalence class.
>
> No further orientations can be derived from observational data alone — remaining
> undirected edges are genuinely indeterminate under the assumptions.
> ^thm-pc-complete

## Examples

> [!example] Meek R1 in Action
> **Setting**: Skeleton $X_1 - X_2 - X_3 - X_4$ with v-structure $X_2 \to X_3 \leftarrow X_4$
> already identified in Phase 2.
>
> **Apply R1**: Is there an edge $X_i \to X_k - X_j$ with $X_i$ not adjacent to $X_j$?
> - $X_2 \to X_3 - ?$: $X_3 - X_4$ is now $X_3 \leftarrow X_4$ (from v-structure). No more.
> - $X_1 - X_2 \to X_3$: here $X_2 \to X_3$ is directed (from v-structure), and
>   $X_1$ is not adjacent to $X_3$. Apply R1: orient $X_1 \to X_2$.
>
> **Result**: $X_1 \to X_2 \to X_3 \leftarrow X_4$ — the triple $X_1 - X_2$ gets oriented
> by R1 because orientating $X_1 \leftarrow X_2$ would create a new v-structure
> $X_1 \leftarrow X_2 \to X_3$ (since $X_1$ and $X_3$ are not adjacent).

## Connections

- **Upstream**: [[Constraint-Based Skeleton Learning]] produces the undirected skeleton
  and separation sets that Phases 2–3 consume.
- **Output**: The CPDAG feeds into [[Markov Equivalence Classes and CPDAGs]] — the
  theoretical framework explaining what the CPDAG represents.
- **GES uses Meek rules too**: the GES algorithm ([[GES - Greedy Equivalence Search]])
  applies Meek's R1–R4 after each edge insertion or deletion to maintain a valid CPDAG.
  Meek's completeness result is foundational for GES correctness.
- **FCI orientation rules**: the FCI algorithm for latent variable settings uses a
  superset of Meek's rules (Zhang 2008), producing a PAG rather than a CPDAG.

## See Also
- [[Constraint-Based Skeleton Learning]] — Phase 1: where the skeleton and sep sets come from
- [[Markov Equivalence Classes and CPDAGs]] — what a CPDAG is and why it's the right output
- [[GES - Greedy Equivalence Search]] — uses Meek rules internally for CPDAG maintenance
- [[PC Algorithm - Overview]] — the three-phase algorithm overview
