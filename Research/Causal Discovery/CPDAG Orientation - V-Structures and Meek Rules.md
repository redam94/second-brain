---
title: "CPDAG Orientation - V-Structures and Meek Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/causal-learn-pc-source.py]]"
source_location: "Meek (1995); Spirtes, Glymour & Scheines (2000), §5.4.2–5.4.3"
date_ingested: 2026-08-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Skeleton Discovery and CI Testing]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Meek rules"
  - "v-structure orientation"
  - "immorality detection"
  - "PC Phase 2 and 3"
  - "PDAG completion"
---

# CPDAG Orientation - V-Structures and Meek Rules

> [!summary]
> Phases 2 and 3 of the PC algorithm (and the post-phase completion step in GES)
> convert the undirected skeleton into a CPDAG by: (1) **orienting v-structures**
> (immoralities) — triples $X_i - X_k - X_j$ where $X_k \notin \text{sep}(i,j)$
> become $X_i \to X_k \leftarrow X_j$; (2) **applying Meek's four orientation rules**
> exhaustively to propagate directions without creating new v-structures or directed
> cycles. Meek (1995) proved this procedure is **complete**: it produces exactly the
> CPDAG with no further orientations possible.

## Overview

After skeleton discovery, many edges remain undirected. The task is to determine which
directed edges are *compelled* — i.e., must point in the same direction in **every**
DAG in the Markov equivalence class — and which are *reversible*. The compelled edges
come from two sources:

1. **V-structures (immoralities)**: the only configurations that are not Markov-equivalent
   under edge reversal. A triple $X_i \to X_k \leftarrow X_j$ with $X_i \not\sim X_j$
   fixes both edge directions.

2. **Meek rule propagation**: once some edges are oriented, logical constraints prevent
   creating *new* v-structures or directed cycles — these constraints force additional
   edge directions.

Together, Steps 2–3 of PC convert a skeleton + sep sets into the unique CPDAG of the
Markov equivalence class recovered by the data.

## Main Content

### Phase 2: V-structure (immorality) detection

> [!definition] Definition: V-structure orientation rule
> For each triple $(X_i, X_k, X_j)$ in the skeleton where:
> - $X_i - X_k$ and $X_k - X_j$ are edges (i.e., $X_k$ is a common neighbor),
> - $X_i$ and $X_j$ are **not adjacent** (no edge $X_i - X_j$),
> - $X_k \notin \text{sep}(i,j)$ (the set that rendered $X_i \perp X_j$):
>
> **Orient** the triple as $X_i \to X_k \leftarrow X_j$ (a collider/v-structure).
>
> **Why**: if $X_k$ had been in $\text{sep}(i,j)$, conditioning on $X_k$ would have
> *blocked* the path $X_i - X_k - X_j$ (non-collider semantics). Since $X_k \notin
> \text{sep}(i,j)$, the path was not blocked by conditioning on $X_k$, implying $X_k$
> is a collider (conditioning on a collider *opens* the path). This is the unique
> asymmetry that distinguishes colliders from chains/forks under faithfulness.
^def-vstructure-orient

> [!example] Example: V-structure detection
> Suppose skeleton has edges $A - C$ and $C - B$ with $A \not\sim B$.
> If $C \notin \text{sep}(A, B)$, orient as $A \to C \leftarrow B$.
> If $C \in \text{sep}(A, B)$, leave $A - C - B$ undirected (chain or fork).
^ex-vstructure

### Phase 3: Meek's four orientation rules

After v-structures are marked, Meek (1995) identified four rules that are both
**sound** (applying them never produces a wrong orientation) and **complete** (exhaustive
application produces all compelled edges):

> [!definition] Definition: Meek Orientation Rules (Meek 1995)
>
> **R1 — Avoid new v-structure**
> If $X_i \to X_j$ is directed and $X_j - X_k$ is undirected with $X_i \not\sim X_k$:
> orient $X_j \to X_k$.
> *Reason*: reversing would create the v-structure $X_i \to X_j \leftarrow X_k$,
> but $X_i \not\sim X_k$ — this contradicts the v-structure already identified
> (or would introduce a new one not found by Phase 2 — inconsistency).
>
> **R2 — Avoid directed cycle**
> If $X_i \to X_k \to X_j$ (directed path) and $X_i - X_j$ is undirected:
> orient $X_i \to X_j$.
> *Reason*: reversing ($X_j \to X_i$) would create a directed cycle $X_i \to X_k \to X_j \to X_i$.
>
> **R3 — Avoid ambiguous v-structure**
> If $X_k \to X_j$, $X_l \to X_j$, $X_k - X_i - X_l$ (undirected), $X_k \not\sim X_l$,
> and $X_i - X_j$ is undirected:
> orient $X_i \to X_j$.
> *Reason*: reversing $X_j \to X_i$ would require either $X_k \to X_i \leftarrow X_l$
> (impossible since $X_k \not\sim X_l$ would then be a new v-structure) or direct
> inconsistency.
>
> **R4 — Avoid cycle via discriminating path**
> If there is a discriminating path for $(X_i, X_j, X_k)$ and $X_j - X_k$ is undirected:
> - If $X_j \in \text{sep}(i, k)$: orient $X_j - X_k$ as non-collider $X_j - X_k$
>   (leave the adjacency undirected, or orient $X_j \to X_k$ in some formulations).
> - If $X_j \notin \text{sep}(i, k)$: orient $X_j \to X_k$ and $X_j$ as collider.
> *(R4 is used in the FCI extension and some PC implementations.)*
^def-meek-rules

> [!theorem] Theorem: Completeness of Meek Rules (Meek 1995)
> Let $\mathcal{G}$ be any DAG and $\mathcal{C}$ its CPDAG. Starting from the skeleton
> of $\mathcal{C}$ with all v-structures correctly oriented (Phase 2), applying rules
> R1–R3 (R4 for FCI) exhaustively in any order produces **exactly** $\mathcal{C}$
> — all compelled edges are oriented, and no reversible edge is incorrectly oriented.
^thm-meek-complete

### PDAG-to-CPDAG completion (in GES)

In GES ([[GES - Greedy Equivalence Search]]), each Insert or Delete operator produces
a PDAG (Partially Directed Acyclic Graph) that must be *completed* to a CPDAG. The
completion algorithm (Dor & Tarsi 1992; also implemented in `ges.utils` in the
`juangamella/ges` package) finds the unique CPDAG of the PDAG:

1. Find an **undirected edge** whose removal does not disconnect the undirected subgraph
   and whose endpoint has no compelled incoming edges.
2. Orient it in the direction required by the CPDAG.
3. Repeat until fully oriented.

This step is $O(d^3)$ and is called after *every* GES operator application.

### Orienting covered edges (Turning Phase)

A **covered edge** $X_i \to X_j$ is one where $\text{Pa}(X_j) = \text{Pa}(X_i) \cup \{X_i\}$.
Reversing a covered edge produces a different DAG in the same MEC (or an equivalent MEC with
higher score).

The **Turning Phase** (Hauser & Bühlmann 2012), added to GES, applies Turn operators that
reverse covered edges to find CPDAGs with higher scores. See [[GES - Greedy Equivalence Search]].

## Connections

- **Skeleton + sep sets** from [[PC Skeleton Discovery and CI Testing]] are the direct
  inputs to both v-structure detection and the Meek rules
- **CPDAG definition** — understanding what a CPDAG is and why it is the right target
  requires [[Markov Equivalence Classes and CPDAGs]]
- **GES completion**: GES calls the same PDAG-to-CPDAG completion after each score-
  improving operator — the same logical machinery applies → [[GES - Greedy Equivalence Search]]
- **NOTEARS comparison**: NOTEARS outputs a DAG (adjacency matrix $W$), and experiments
  compare it to the CPDAG of the true DAG using structural Hamming distance (SHD)
  → [[NOTEARS Experiments]]
- **FCI algorithm**: extends Phase 2–3 to allow hidden confounders by generalising
  orientation rules and the output graph (PAG instead of CPDAG)

## See Also
- [[PC Algorithm - Overview]] — full algorithm context
- [[PC Skeleton Discovery and CI Testing]] — Phase 1 output that feeds into these phases
- [[Markov Equivalence Classes and CPDAGs]] — why CPDAGs are the right target
- [[GES - Greedy Equivalence Search]] — uses the same CPDAG completion logic
