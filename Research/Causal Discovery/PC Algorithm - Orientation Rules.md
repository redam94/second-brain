---
title: "PC Algorithm - Orientation Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/textbook
source: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, 2nd Ed., MIT Press (https://mitpress.mit.edu/9780262194402/); Meek (1995)"
source_location: "Ch. 5, Algorithm 5.4.2; Meek (1995) — complete set of orientation rules"
date_ingested: 2026-09-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[PC Algorithm - Skeleton Discovery]]"
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[GES - Overview]]"
aliases:
  - "Meek rules"
  - "PC orientation phase"
  - "v-structure detection"
---

# PC Algorithm - Orientation Rules

> [!summary]
> The **orientation phase** of the PC algorithm (Phase 2) turns the undirected skeleton
> from Phase 1 into a **CPDAG** by two steps: (1) **v-structure detection** — for each
> unshielded triple $i - k - j$ (with $i,j$ non-adjacent), orient as $i \to k \leftarrow j$
> if and only if $k \notin \widehat{\text{sep}}(i,j)$; and (2) **Meek's four rules** —
> propagate the orientations by repeatedly applying four deterministic rules that
> orient additional undirected edges without creating new v-structures or cycles.
> Meek (1995) proved that these four rules are *complete*: they orient every compelled
> edge, and no further orientations are possible from the skeleton and v-structures alone.

## Overview

After Phase 1 produces the skeleton $\hat{G}$ and separating sets
$\widehat{\text{sep}}(i,j)$, Phase 2 must determine which undirected edges $i - j$
in $\hat{G}$ are **compelled** (have a fixed orientation in every Markov equivalent
DAG) versus **reversible** (can go either way). The key facts:

- An edge is compelled if and only if it is **part of a v-structure** or **forced
  by a compelled edge through one of Meek's rules**.
- The **sepset criterion** is the only information needed to detect v-structures:
  $k$ is a collider in $i - k - j$ iff $k$ was not used to establish independence
  between $i$ and $j$ (i.e., $k \notin \widehat{\text{sep}}(i,j)$).
- Once v-structures are oriented, **Meek's four rules** propagate the orientations
  until no further orientation is possible.

The output is the CPDAG (directed edges = compelled; undirected = reversible).

## Main Content

### Step 2a: V-structure Detection

> [!definition] Algorithm: V-structure Detection
> For each **unshielded triple** $(i, k, j)$ in $\hat{G}$ — meaning:
> - $i - k$ and $k - j$ are both edges in $\hat{G}$, and
> - $i$ and $j$ are **not adjacent** in $\hat{G}$:
>
> Check whether $k \in \widehat{\text{sep}}(i,j)$:
> - If $k \notin \widehat{\text{sep}}(i,j)$: orient as $i \to k \leftarrow j$ (v-structure).
> - If $k \in \widehat{\text{sep}}(i,j)$: leave $i - k - j$ unoriented (chain or fork).
^alg-vstructure

**Intuition:** The separating set $\widehat{\text{sep}}(i,j)$ is the conditioning set
that made $i$ and $j$ independent. If $k$ is in the sepset, then conditioning on $k$
*blocks* the path $i - k - j$ — meaning $k$ is a non-collider on that path (chain $i \to k \to j$
or fork $i \leftarrow k \to j$). If $k$ is not in the sepset, then conditioning on $k$
would *open* (activate) the path — meaning $k$ is a collider (v-structure $i \to k \leftarrow j$).

> [!theorem] Theorem: V-structure Orientation is Correct
> Under the Causal Markov condition and faithfulness, the sepset criterion correctly
> identifies all v-structures: $i \to k \leftarrow j$ is a v-structure in the true
> DAG $G$ if and only if $k \notin \text{sep}_G(i,j)$ (where $\text{sep}_G$ is the
> true d-separating set used in the Markov sense).
^thm-vstructure-correct

This theorem relies on faithfulness: without it, the sepset might be non-unique
and the criterion might mis-classify non-colliders as colliders.

### Step 2b: Meek's Orientation Rules

After orienting v-structures, **four deterministic rules** (Meek 1995) propagate
orientations. Apply them exhaustively (repeat until no new orientations):

> [!definition] Meek's Four Rules (complete set for CPDAG orientation)
>
> **Rule R1 — Acyclicity avoidance:**
> If $\alpha \to \beta - \gamma$ and $\alpha$ and $\gamma$ are **not** adjacent:
> Orient $\beta \to \gamma$.
> *Reason:* $\gamma \to \beta$ would create a new v-structure $\alpha \to \beta \leftarrow \gamma$
> (since $\alpha \not\sim \gamma$), contradicting the detected structure.
>
> **Rule R2 — Cycle avoidance:**
> If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$:
> Orient $\alpha \to \gamma$.
> *Reason:* $\gamma \to \alpha$ would create a directed cycle $\alpha \to \beta \to \gamma \to \alpha$.
>
> **Rule R3 — Uniqueness of parent set:**
> If $\alpha - \gamma$, and there exist $\beta, \delta$ (both non-adjacent to each other)
> such that $\beta \to \gamma$, $\delta \to \gamma$, $\alpha - \beta$, $\alpha - \delta$:
> Orient $\alpha \to \gamma$.
> *Reason:* If $\gamma \to \alpha$, then one of $\alpha \to \beta \leftarrow \gamma$ or
> $\alpha \to \delta \leftarrow \gamma$ would become a new v-structure.
>
> **Rule R4 — Discrimination (disambiguation):**
> If $\alpha \to \beta \to \gamma$, $\delta - \gamma$, $\delta - \alpha$, $\delta \not\sim \beta$:
> If $\delta - \gamma$ and $\beta \to \gamma$: orient $\delta \to \gamma$.
> *Reason:* Orienting $\gamma \to \delta$ would require a new v-structure.
^def-meek-rules

**Completeness of Meek's rules:**

> [!theorem] Theorem (Meek 1995): Completeness of Orientation Rules
> The four rules R1–R4 are **complete**: starting from the skeleton and all correctly
> identified v-structures, repeated application of R1–R4 identifies *every*
> compelled edge in the CPDAG. No additional orientation rules are needed.
>
> Equivalently: after applying all applicable rules to exhaustion, every remaining
> undirected edge is genuinely reversible (its orientation is not determined by the
> data under faithfulness alone).
^thm-meek-complete

**Implementation:** Rules are applied in any order; the result is the same (the CPDAG
is unique given the skeleton and v-structures). In practice, a queue-based implementation
propagates orientations efficiently.

### Full Phase 2 Algorithm

> [!definition] Algorithm: PC Orientation Phase (Phase 2)
> **Input:** Skeleton $\hat{G}$, separating sets $\widehat{\text{sep}}(i,j)$  
> **Output:** CPDAG $\hat{\mathcal{E}}$
>
> 1. For each unshielded triple $(i,k,j)$ in $\hat{G}$ with $i \not\sim j$:
>    - If $k \notin \widehat{\text{sep}}(i,j)$: orient $i \to k \leftarrow j$.
> 2. Repeat until no new orientations:
>    - Apply R1: if $\alpha \to \beta - \gamma$, $\alpha \not\sim \gamma$ → orient $\beta \to \gamma$.
>    - Apply R2: if $\alpha \to \beta \to \gamma$, $\alpha - \gamma$ → orient $\alpha \to \gamma$.
>    - Apply R3: if $\beta \to \gamma$, $\delta \to \gamma$, $\beta \not\sim \delta$, $\alpha \sim \beta$,
>      $\alpha \sim \delta$, $\alpha - \gamma$ → orient $\alpha \to \gamma$.
>    - Apply R4: if $\alpha \to \beta \to \gamma$, $\delta - \gamma$, $\delta \sim \alpha$,
>      $\delta \not\sim \beta$ → orient $\delta \to \gamma$.
> 3. Return $\hat{\mathcal{E}}$ (mixed graph with oriented and unoriented edges).
^alg-pc-orient

## Examples

> [!example] Example: V-structure and Meek Rule R1
> **Skeleton:** $X_1 - X_2 - X_3 - X_4$, $X_1 - X_3$ (shielded), $X_2 \not\sim X_4$.
>
> **V-structure check** for $(X_1, X_3, X_4)$ — unshielded since $X_1 \not\sim X_4$:
> If $X_3 \notin \widehat{\text{sep}}(1,4)$: orient $X_1 \to X_3 \leftarrow X_4$.
>
> **Meek R1:** Now $X_4 \to X_3 - X_2$ and $X_4 \not\sim X_2$:
> → Orient $X_3 \to X_2$.
>
> **Result:** $X_1 \to X_3 \leftarrow X_4$, $X_3 \to X_2$, $X_1 - X_2$ remains undirected.

> [!example] Example: Conservative PC Disagreement
> In the standard PC algorithm, if an unshielded triple $(i,k,j)$ is found, it is
> oriented as a v-structure if $k \notin \widehat{\text{sep}}(i,j)$ — using one
> separating set.
>
> **Conservative PC** checks *all* minimal separating sets between $i$ and $j$:
> - If $k$ is absent from *all* of them: definitely a v-structure → orient.
> - If $k$ is present in *all* of them: definitely not a v-structure → do not orient.
> - If $k$ is present in some but not others: **ambiguous** → leave unoriented
>   (mark as "non-definite non-collider" in the output).
>
> CPC is more conservative and avoids false v-structure orientations at the cost
> of fewer total orientations.

## Connections

- **[[PC Algorithm - Skeleton Discovery]]** — Phase 1 produces the skeleton and sepsets
  that Phase 2 consumes.
- **[[Equivalence Classes and CPDAGs]]** — The mathematical object produced: directed edges
  are compelled, undirected are reversible.
- **[[GES - Overview]]** — GES also uses a CPDAG representation, but orients edges via
  score-based operations (turn operators) rather than Meek rules.
- **[[Directed Acyclic Graphs]]** — D-separation semantics underlying the correctness
  of the sepset criterion and Meek rules.

## See Also
- [[PC Algorithm - Skeleton Discovery]] — Phase 1: CI testing and skeleton
- [[PC Algorithm - Overview]] — Full algorithm context, variants, guarantees
- [[Equivalence Classes and CPDAGs]] — CPDAG definition and properties
- [[GES - Overview]] — Score-based complement
