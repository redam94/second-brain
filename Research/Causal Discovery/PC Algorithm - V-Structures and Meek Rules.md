---
title: "PC Algorithm - V-Structures and Meek Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes00-CPS-source.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Meek (1995)"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Skeleton Discovery]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Meek orientation rules"
  - "v-structure orientation"
  - "immorality detection"
  - "PC Phase 2 Phase 3"
  - "CPDAG completion"
---

# PC Algorithm - V-Structures and Meek Rules

> [!summary]
> Phases 2 and 3 of the PC algorithm orient the edges in the recovered skeleton into
> a **CPDAG**. Phase 2 detects **v-structures** (immoralities $X \to Z \leftarrow Y$
> where $Z \notin \mathrm{Sep}(X, Y)$) — the only edges identifiable from observational
> data alone. Phase 3 applies **Meek's four orientation rules** (R1–R4) to propagate
> directions without creating new v-structures or cycles. The result is the maximally
> informative CPDAG for the equivalence class.

## Overview

After Phase 1 yields the skeleton and separation sets, the algorithm orients edges in two
sub-phases. Phase 2 is about identifying **v-structures** (immoralities): triples
$X$-$Z$-$Y$ where $X$ and $Y$ are non-adjacent and $Z$ was *not* used to separate $X$
and $Y$ — meaning the path $X \to Z \leftarrow Y$ is the only way to explain their
dependence. Phase 3 propagates orientations using **Meek's rules**, which are the complete
set of orientation rules that do not create new v-structures or directed cycles.

## Main Content

### Phase 2: V-Structure (Immorality) Detection

> [!definition] Definition: V-structure (Immorality)
> A **v-structure** (or **immorality**) is a triple $(X, Z, Y)$ where:
> - $X$-$Z$ and $Z$-$Y$ are edges in the skeleton,
> - $X$ and $Y$ are **non-adjacent**,
> - $Z \notin \mathrm{Sep}(X, Y)$.
>
> Such triples are oriented as $X \to Z \leftarrow Y$ in the CPDAG.

^def-vstructure

The logic: if $Z$ were the cause of $X$ and $Y$ (a "common cause"), then conditioning
on $Z$ would make $X$ and $Y$ *independent*. But $Z \notin \mathrm{Sep}(X,Y)$ means
conditioning on $Z$ did **not** produce independence — so $Z$ cannot be the common cause.
Instead, $Z$ is a **common effect** of $X$ and $Y$: a collider.

> [!example] Example: V-structure detection
> Skeleton: $X$-$Z$-$Y$ where $X$ and $Y$ are non-adjacent.
> $\mathrm{Sep}(X, Y) = \emptyset$ (found in $l=0$ round: $X \perp\!\!\!\perp Y$ marginally).
>
> Since $Z \notin \emptyset = \mathrm{Sep}(X, Y)$, orient: $X \to Z \leftarrow Y$.
>
> Interpretation: $Z$ is a collider. Conditioning on $Z$ would *induce* dependence
> between $X$ and $Y$ (collider bias / Berkson's paradox — see [[Spurious Association and Confounds]]).

### Phase 3: Meek's Orientation Rules

After Phase 2, some edges remain undirected. Meek (1995) proved that the following four
rules are **sound and complete** for orienting all edges that must have the same direction
across the entire equivalence class, without creating new v-structures or directed cycles.

> [!theorem] Meek's Orientation Rules (Meek, 1995)
> In a PDAG (partially directed acyclic graph), apply the following rules repeatedly until
> no further orientations are possible:
>
> **R1** — Extend a chain to avoid a new v-structure:
> If $A \to B - C$ and $A$ is not adjacent to $C$, orient $B \to C$.
> *(Otherwise $A \to B \leftarrow C$ would be a new v-structure not discovered in Phase 2.)*
>
> **R2** — Avoid a directed cycle:
> If $A \to B \to C$ and $A - C$ (undirected), orient $A \to C$.
> *(Otherwise $C \to A \to B \to C$ would be a directed cycle.)*
>
> **R3** — Complete a "diamond":
> If $A - B \to C$ and $A - D \to C$, where $B$ and $D$ are non-adjacent and $A - C$
> (undirected), orient $A \to C$.
> *(Otherwise both $B \to C \leftarrow A$ and $D \to C \leftarrow A$ would create new
> v-structures.)*
>
> **R4** — Avoid a new v-structure via a chain:
> If $A - B \to C \to D$ and $A - D$ (undirected) and $A$ is not adjacent to $C$,
> orient $A \to D$.
> *(Otherwise $A \leftarrow D$ would make $\ldots \to C \to D \leftarrow A$ a new v-structure.)*

^thm-meek-rules

**Completeness**: Meek (1995) proved that these four rules are *complete* — every edge
orientation that can be determined from the equivalence class structure is derived by
R1–R4. Any undirected edge remaining after exhaustive application of R1–R4 is
**genuinely unidentifiable** from observational data (both orientations are consistent
with some DAG in the equivalence class).

### Worked Example: Four-node DAG

> [!example] Four-node CPDAG completion
> True DAG: $A \to C \leftarrow B$, $C \to D$. Skeleton: $A - C - B$ (with $A,B$ non-adjacent) and $C - D$.
>
> **Phase 2**: Triple $(A, C, B)$: $A,B$ non-adjacent; $\mathrm{Sep}(A,B) = \emptyset$ (marginally independent);
> $C \notin \emptyset$. → Orient $A \to C \leftarrow B$.
>
> **Phase 3**: Directed edges so far: $A \to C$, $B \to C$. Undirected: $C - D$.
> - Apply R1 with $A \to C - D$, $A$ not adjacent to $D$: orient $C \to D$. ✓
>
> Final CPDAG: $A \to C \leftarrow B$, $C \to D$. All edges directed (single-member equivalence class).

### Order Dependence in Phase 2

The original PC algorithm can be **order-dependent** in Phase 2: when multiple triples
qualify as v-structures, the order in which they are processed can affect later edge
orientations via the Meek rules. Two variants mitigate this:

- **Conservative PC** (CPC): before orienting a triple as a v-structure, checks that
  $Z \notin S$ for **every** separating set $S$ between $X$ and $Y$ — not just the
  recorded one. Edges are marked "ambiguous" if some separating sets include $Z$ and
  some do not.
- **Majority rule PC** (MPC): orients the v-structure if $Z$ is absent from a majority
  of the separating sets found.

## Connections

- **V-structures and observational identifiability**: v-structures are exactly the
  features that distinguish DAG equivalence classes ([[Markov Equivalence Classes and CPDAGs]],
  [[#^thm-markov-equiv|Verma-Pearl Theorem]]).
- **GES**: the GES algorithm also produces a CPDAG and implicitly applies Meek rules
  when converting between DAG operations and CPDAG representations —
  see [[GES - Greedy Equivalence Search]].
- **Collider bias**: v-structures are colliders; conditioning on them opens a
  path and induces spurious association — see [[Spurious Association and Confounds]].
- **FCI algorithm**: extends Phase 2–3 to handle latent confounders by replacing
  v-structures with a broader class of orientation rules producing a PAG.

## See Also
- [[PC Algorithm - Overview]] — full algorithm overview
- [[PC Algorithm - Skeleton Discovery]] — Phase 1 (skeleton + separation sets)
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG as the output representation
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[Spurious Association and Confounds]] — collider bias and d-separation semantics
