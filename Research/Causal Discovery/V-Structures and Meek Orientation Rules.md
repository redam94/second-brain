---
title: "V-Structures and Meek Orientation Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-source.md]]"
source_location: "Meek (1995); Spirtes, Glymour & Scheines (2000) §3.4; Chickering (2002) §2"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[CPDAG and Markov Equivalence Classes]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[CPDAG and Markov Equivalence Classes]]"
aliases:
  - "Meek rules"
  - "V-structure orientation"
  - "Immoralities"
  - "Collider orientation"
---

# V-Structures and Meek Orientation Rules

> [!summary]
> After the [[PC Algorithm]] recovers the skeleton, two orientation steps convert it into a
> **CPDAG**: (1) **V-structure orientation** — unshielded colliders $X \to Z \leftarrow Y$ are
> identified by the separating-set criterion; (2) **Meek's four rules** propagate orientation
> to remaining edges without creating new v-structures or directed cycles. The set of orientable
> edges (via Meek rules) is provably **complete**: every edge that is directed the same way in
> all Markov-equivalent DAGs is oriented by the rules.

## Overview

The skeleton (undirected graph) recovered by Phase I of PC is agnostic about edge directions.
Directionality can only be partially recovered from observational data, because Markov equivalent
DAGs produce identical distributions. The **orientable edges** are those that appear as directed
edges in every DAG in the Markov equivalence class — these are identifiable from data.

Two mechanisms orient edges:
1. **V-structures** (unshielded colliders) — directly identified from the skeleton and sep sets
2. **Meek rules** — propagated orientations derived from already-oriented edges

## Main Content

### V-structures (unshielded colliders)

> [!definition] Definition: Unshielded triple and v-structure
> An **unshielded triple** is a path $X_i - X_k - X_j$ in the skeleton where $X_i$ and $X_j$
> are **not** adjacent (no edge $i - j$).
>
> An unshielded triple is a **v-structure** (or **immorality**) if it is oriented as
> $X_i \to X_k \leftarrow X_j$ in the true DAG.
>
> V-structures are identifiable from observational data: they are the only edge configurations
> that differ between Markov equivalence classes.
^def-vstructure

> [!theorem] Theorem: V-structure identification from sep sets (Verma & Pearl 1990)
> In the output of Phase I of the PC algorithm, orient unshielded triple $X_i - X_k - X_j$ as
> a v-structure ($X_i \to X_k \leftarrow X_j$) if and only if:
> $$X_k \notin \text{sep}(i, j)$$
> where $\text{sep}(i, j)$ is the separating set stored during skeleton discovery.
>
> **Intuition:** In a v-structure, $X_k$ is a collider. Marginally $X_i \perp\!\!\!\perp X_j$
> (the path $i \to k \leftarrow j$ is blocked by the collider), so $\text{sep}(i, j)$ is some
> set that does **not** include $X_k$. In contrast, for a pipe ($X_i \to X_k \to X_j$) or fork
> ($X_i \leftarrow X_k \to X_j$), $X_k$ is a non-collider, and the path is blocked by
> conditioning on $X_k$, so $X_k \in \text{sep}(i, j)$.
^thm-vstructure-ident

> [!example] Example: V-structure vs. pipe — same skeleton, different sep sets
>
> **Case A:** True DAG = $X_1 \to X_3 \leftarrow X_2$ (v-structure at $X_3$)
> - No edge $1-2$; $X_1 \perp\!\!\!\perp X_2$ marginally; $X_1 \not\perp\!\!\!\perp X_2 \mid X_3$
> - $\text{sep}(1, 2) = \emptyset$ (empty set). $X_3 \notin \emptyset$ → orient as v-structure. ✓
>
> **Case B:** True DAG = $X_1 \to X_3 \to X_2$ (pipe at $X_3$)
> - No edge $1-2$; $X_1 \perp\!\!\!\perp X_2 \mid X_3$ (conditioning blocks the pipe)
> - $\text{sep}(1, 2) = \{X_3\}$. $X_3 \in \{X_3\}$ → do **not** orient as v-structure.
>   Edge $X_3 - X_2$ remains undirected (equivalence class ambiguity). ✓

### Meek's four orientation rules

After v-structures are oriented, **Meek's rules** (Meek 1995) propagate orientation to
remaining undirected edges. The rules fire when their pattern is present in the current
(partially oriented) graph and ensure: (a) no new v-structures are created; (b) no directed
cycles are created. They are applied repeatedly until no further orientations are possible.

> [!theorem] Theorem: Meek's orientation rules (Meek 1995)
> Apply each rule repeatedly until quiescence. $A \to B$ denotes an already-oriented edge;
> $A - B$ denotes an undirected edge to be oriented.
>
> **Rule R1 (Orient away from v-structure):**
> If $A \to B - C$ and $A$ and $C$ are not adjacent, orient as $B \to C$.
> *Reason:* $B \to C$ would create a new v-structure $A \to B \leftarrow C$ (since $A \not\sim C$),
> contradicting the CPDAG.
>
> **Rule R2 (Avoid directed cycle):**
> If $A \to B \to C$ and $A - C$, orient as $A \to C$.
> *Reason:* $C \to A$ would create a directed cycle $A \to B \to C \to A$.
>
> **Rule R3 (Avoid new v-structure via two paths):**
> If $A - C$, $A - B_1$, $A - B_2$, $B_1 \to C$, $B_2 \to C$, and $B_1 \not\sim B_2$,
> orient $A \to C$.
> *Reason:* $C \to A$ would make $B_1 \to C \to A$ and $B_2 \to C \to A$ — two directed paths.
> But $B_1$ and $B_2$ are not adjacent, so if $A \leftarrow C$ were correct, both
> $B_1 - A - B_2$ would need to be a v-structure at $A$, contradicting the initial v-structure
> orientation.
>
> **Rule R4 (Avoid v-structure via discriminating path):**
> If a discriminating path exists between $A$ and $C$ through $B$, and $B - C$, orient $B \to C$
> or $B \leftarrow C$ based on whether $B$ is in $\text{sep}(A, C)$.
> *(See Spirtes, Glymour & Scheines 2000 §3.4 for full formal statement.)*
^thm-meek-rules

### Completeness of Meek rules

> [!theorem] Theorem: Completeness of Meek rules (Meek 1995)
> The four orientation rules are **complete** for recovering the CPDAG from the skeleton and
> v-structures: after applying all v-structure orientations and all four Meek rules to
> quiescence, the resulting graph is exactly the CPDAG of the equivalence class.
>
> That is, **every** edge that is directed identically in all Markov-equivalent DAGs is
> correctly directed by this procedure.
^thm-meek-completeness

This completeness theorem is what makes the PC algorithm (and GES) correct: given correct
skeleton and v-structures, the CPDAG is uniquely determined by the Meek rules.

### Example: Full orientation on a 4-node DAG

True DAG: $X_1 \to X_3 \leftarrow X_2$, $X_3 \to X_4$, no other edges.
Equivalence class: same, since $X_3 \to X_4$ is compelled (R1 applies).

1. **Phase I skeleton:** $1-3$, $2-3$, $3-4$ (and $1 \not\sim 2$, $1 \not\sim 4$, $2 \not\sim 4$)
2. **Phase II v-structure:** $1-3-2$ unshielded; $X_3 \notin \text{sep}(1,2)$ → orient $1 \to 3 \leftarrow 2$
3. **Meek R1:** $X_2 \to X_3 - X_4$, $X_2 \not\sim X_4$ → orient $X_3 \to X_4$ ✓

CPDAG = $1 \to 3 \leftarrow 2$, $3 \to 4$. Every edge is directed. This is a single-DAG
equivalence class (all edges compelled).

## Connections

- **PC algorithm**: Phases II and III of [[PC Algorithm]] implement v-structure detection and
  Meek rule propagation respectively
- **GES**: [[GES - Greedy Equivalence Search]] operates in CPDAG space and implicitly uses the
  CPDAG representation maintained by v-structure + Meek rules at each step; the Meek conjecture
  (covered edge reversals) is the complementary result that justifies GES's search
- **CPDAG**: see [[CPDAG and Markov Equivalence Classes]] for the definition of CPDAGs and what
  makes an edge "compelled" vs. "reversible"
- **d-separation**: the v-structure criterion connects to d-separation in [[Directed Acyclic Graphs]] —
  v-structures are the only unshielded triples that are not d-separators

## See Also
- [[PC Algorithm]] — the algorithm these orientation phases belong to
- [[CPDAG and Markov Equivalence Classes]] — what the resulting oriented graph represents
- [[GES - Greedy Equivalence Search]] — uses Meek rules internally during CPDAG search
- [[Directed Acyclic Graphs]] — d-separation and the Markov semantics of DAGs
