---
title: "PC Algorithm - Orientation Phase"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000); Meek (1995)"
source_location: "SGS (2000) Ch. 5–6; Meek (1995) UAI"
date_ingested: 2026-08-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Skeleton Phase]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[Causal Structure Learning - Paradigm Comparison]]"
aliases:
  - "v-structure detection"
  - "Meek orientation rules"
  - "CPDAG construction"
  - "unshielded collider"
---

# PC Algorithm - Orientation Phase

> [!summary]
> Stage 2 of the PC algorithm converts the undirected **skeleton** into a **CPDAG** by
> (a) identifying **v-structures** (unshielded colliders) using the stored separation sets, and
> (b) propagating orientations via **Meek's four rules** (R1–R4). Directed edges in the output
> CPDAG are those whose orientation is forced by the data; undirected edges represent
> **Markov-equivalent** orientation choices that cannot be resolved without interventional data.

## Overview

After skeleton learning, many edges remain undirected. Some can be oriented using information
already in the data — specifically, the **v-structure** (unshielded collider) pattern which
is the only structural difference between Markov-equivalent DAGs.

> [!definition] V-structure (unshielded collider)
> A triple $(X_i, X_k, X_j)$ in the skeleton forms a **v-structure** (also called an
> **unshielded collider** or **immorality**) if:
> - $X_i - X_k - X_j$ in the skeleton (both edges present)
> - $X_i - X_j$ is **absent** (they are not adjacent: "unshielded")
> - $X_k \notin \text{sep}(i,j)$ (the collider is not in the separation set)
>
> A v-structure is oriented as $X_i \to X_k \leftarrow X_j$.
^def-vstructure

The intuition: if $X_k$ is not in the set that makes $X_i, X_j$ conditionally independent,
then $X_k$ is a **common effect** of $X_i$ and $X_j$ — conditioning on $X_k$ would induce
a dependence (explaining-away / Berkson's paradox), while not conditioning blocks the path.

## Step 2a: V-structure detection

> [!definition] V-structure Detection Procedure
> **For** each pair $(X_i, X_j)$ with no direct edge in the skeleton **do:**
> - **For** each $X_k$ adjacent to both $X_i$ and $X_j$ (i.e., $X_i - X_k - X_j$ in skeleton) **do:**
>   - **If** $X_k \notin \text{sep}(i,j)$: orient $X_i \to X_k \leftarrow X_j$
>   - **Else**: leave $X_i - X_k - X_j$ undirected (for now)
^def-vstruct-detect

V-structures are **identifiable from observational data** — every DAG in the same Markov
equivalence class has the same v-structures. They are the unique orientation information the
data can provide without interventions.

## Step 2b: Meek's orientation rules

After orienting v-structures, further edges can be directed by applying four logical rules
(Meek 1995) that propagate the known orientations without creating new v-structures or cycles.

> [!definition] Meek's Orientation Rules (R1–R4)
> Apply these rules **repeatedly** until no more edges can be oriented:
>
> **R1 — Prevent new v-structures:**
> If $X_i \to X_j - X_k$ and $X_i - X_k$ is absent (unshielded), then orient $X_j \to X_k$.
> *Reason:* if $X_k \to X_j$ were oriented, that would create a new v-structure $X_i \to X_j \leftarrow X_k$ not supported by the data.
>
> **R2 — Prevent cycles:**
> If $X_i \to X_k \to X_j$ and $X_i - X_j$, then orient $X_i \to X_j$.
> *Reason:* if $X_j \to X_i$, a cycle $X_i \to X_k \to X_j \to X_i$ would arise.
>
> **R3 — Discriminating path:**
> If $X_i - X_j$, and there exist $X_k, X_l$ such that $X_k \to X_i$, $X_k \to X_l$,
> $X_l \to X_j$, and $X_i - X_l$ is absent, orient $X_i \to X_j$.
> *Reason:* prevents a new v-structure at $X_j$.
>
> **R4 — Avoid cycles in compound paths:**
> If $X_i - X_j$, $X_k \to X_i$, $X_k \to X_l$, $X_l \to X_j$, and
> $X_k - X_j$ and $X_l - X_i$ are absent, orient $X_i \to X_j$.
^def-meek-rules

Meek (1995) proved that R1–R4 are **complete**: applying them exhaustively yields all
orientable edges, and the result is a valid CPDAG.

## The output: CPDAG

> [!definition] Reading a CPDAG
> In the output CPDAG $\hat{\mathcal{G}}$:
> - **$X_i \to X_j$ (directed)**: $X_i \to X_j$ in **every** DAG in the equivalence class — this causal direction is **identified**.
> - **$X_i - X_j$ (undirected)**: both $X_i \to X_j$ and $X_i \leftarrow X_j$ are consistent with the data — the direction is **unidentified** from observational data alone.
>
> To resolve undirected edges, one needs:
> - **Interventional data** (randomized experiments, do-calculus)
> - **Non-Gaussianity** of the noise (LiNGAM approach: Shimizu et al. 2006)
> - **Equal error variances** (identifiability in Peters & Mooij 2013)
^def-cpdag-reading

## Example: a four-node graph

Consider the DAG $X_1 \to X_3 \leftarrow X_2$, $X_1 \to X_4$, $X_3 \to X_4$
(no edge $X_1 - X_2$). The skeleton has edges: 1-3, 2-3, 1-4, 3-4.

V-structure detection: $(X_1, X_2)$ have no direct edge; $X_3$ is adjacent to both; test
whether $X_3 \in \text{sep}(1,2)$. Since $X_1$ and $X_2$ become independent only when
conditioning on $X_3$ (because $X_3$ is a collider), and the skeleton phase removed $1-2$ with
$\text{sep}(1,2) = \emptyset$ (marginal independence), $X_3 \notin \text{sep}(1,2)$ — so
$X_1 \to X_3 \leftarrow X_2$ is oriented as a v-structure.

Then R2 orients $X_3 \to X_4$ (else cycle $X_1 \to X_3 \to X_4 \to X_1$ could arise if
$X_4 \to X_1$ were placed, combined with $X_1 \to X_3$). Edge $X_1 - X_4$ remains undirected
since both $X_1 \to X_4$ and $X_4 \to X_1$ are consistent — there is no v-structure or cycle
forced by the data.

## Completeness of orientation

> [!theorem] Meek completeness (Meek 1995; Andersson, Madigan & Perlman 1997)
> An undirected edge $X_i - X_j$ in the CPDAG corresponds to **both orientations being
> Markov-equivalent**. The four Meek rules identify **all and only** the edges that must be
> oriented in every DAG of the equivalence class. No further orientation is possible from
> observational data under the faithfulness assumption.
^thm-meek-complete

## Connections

- **[[PC Algorithm - Skeleton Phase]]** — provides the skeleton and sep-sets used here
- **[[PC Algorithm - Overview]]** — overall algorithm, assumptions, and consistency
- **[[Directed Acyclic Graphs]]** — d-separation and equivalence classes of DAGs (Markov equivalence)
- **[[Canonical Causal DAGs]]** — fork, pipe, and collider patterns that determine v-structure logic
- **[[GES - Overview]]** — GES also outputs a CPDAG; its orientation is exact by construction since it searches over equivalence classes directly

## See Also
- [[PC Algorithm - Skeleton Phase]] — the first stage that produces the skeleton and sep-sets
- [[GES - Overview]] — score-based alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
