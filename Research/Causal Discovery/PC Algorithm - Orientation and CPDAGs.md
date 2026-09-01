---
title: "PC Algorithm - Orientation and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), §5.4.3; Meek (1995), §2"
date_ingested: 2026-09-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Skeleton and Independence Tests]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES Algorithm - Overview]]"
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - "CPDAG orientation"
  - "Meek orientation rules"
  - "v-structure orientation"
  - "Markov equivalence class CPDAG"
---

# PC Algorithm — Orientation and CPDAGs

> [!summary]
> **Phase 2 of the PC algorithm**: given the undirected skeleton $\hat{H}$ and
> separating sets $\widehat{\text{Sep}}$ from Phase 1, orient edges to produce a CPDAG
> (Completed Partially Directed Acyclic Graph) representing the Markov equivalence class.
> Orientation proceeds in two steps: (1) find **v-structures** (unshielded colliders)
> using the separating sets; (2) apply **Meek's four orientation rules (R1–R4)** to
> propagate orientations without creating new v-structures or directed cycles.
> The CPDAG uniquely represents the equivalence class (Verma & Pearl, 1990).

## Overview

After Phase 1 recovers the skeleton, the remaining task is to orient as many edges as
possible using the constraints implied by the DAG structure. The key objects:

- **Unshielded triple**: $X_i - X_k - X_j$ where $X_i$ and $X_j$ are **non-adjacent** in
  the skeleton ($X_k$ is between them but the endpoints are not connected).
- **V-structure** (unshielded collider): $X_i \to X_k \leftarrow X_j$, an unshielded
  triple where $X_k$ is a collider. Identifiable from observational data because
  $X_k \notin \text{Sep}(i,j)$ — the collider is not in the conditioning set that
  d-separates $X_i$ and $X_j$.
- **CPDAG**: the unique graph with directed and undirected edges that represents the
  Markov equivalence class of the true DAG.

## Main Content

### Step 1 — V-structure orientation

> [!definition] V-structure (Unshielded Collider) Orientation Rule (SGS, §5.4.3)
> For each **unshielded triple** $X_i - X_k - X_j$ in the skeleton (i.e. $X_i$ and $X_j$
> are non-adjacent):
>
> $$\text{Orient } X_i \to X_k \leftarrow X_j \quad\iff\quad X_k \notin \widehat{\text{Sep}}(i, j)$$
>
> **Intuition**: If $X_k$ is a collider ($X_i \to X_k \leftarrow X_j$), then conditioning
> on $X_k$ **activates** the path $X_i - X_k - X_j$ (Berkson's paradox). Conversely, the
> **only way** $X_i$ and $X_j$ are marginally independent but conditionally dependent given
> $X_k$ is if $X_k$ is a collider. So $X_k \notin \text{Sep}(i,j)$ implies $X_k$ is a
> collider on the path.
^def-vstructure

> [!example] Example: Identifying a V-structure
> Suppose $d = 3$ variables: Rain $(R)$, Sprinkler $(S)$, Wet Grass $(W)$.
> True DAG: $R \to W \leftarrow S$ (classic Bayesian network example).
>
> - Skeleton after Phase 1: $R - W - S$ (no direct $R - S$ edge, since they are independent).
> - Unshielded triple: $R - W - S$ ($R$ and $S$ non-adjacent).
> - $\text{Sep}(R, S) = \emptyset$ (they are marginally independent, conditioning on
>   nothing d-separates them).
> - Since $W \notin \text{Sep}(R, S)$: orient $R \to W \leftarrow S$.
>
> This correctly recovers the true v-structure from observational data.

### Markov equivalence theorem

> [!theorem] Theorem: Markov Equivalence Characterization (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** (they encode identical conditional
> independence relations) **if and only if** they have the same:
> 1. **Skeleton** (same undirected edge set), and
> 2. **Unshielded colliders** (same set of v-structures: unshielded triples with a collider).
>
> **Implication**: The v-structure pattern is the only structural information recoverable
> from observational data under faithfulness alone. All other edges can be oriented in
> either direction without changing the CI implications.
^thm-markov-equivalence

### Step 2 — Meek's orientation rules (R1–R4)

After orienting v-structures, some additional edges can be oriented without ambiguity
by applying Meek's rules (Meek, 1995) — any orientation not following these rules would
either create a new unshielded collider (contradicting the data) or create a directed
cycle (violating acyclicity).

> [!definition] Meek's Orientation Rules R1–R4 (Meek, 1995)
> Apply iteratively until no more orientations are possible.
>
> **R1 (Non-v-structure prevention)**:
> If $\alpha \to \beta - \gamma$ and $\alpha$ is non-adjacent to $\gamma$, then orient
> $\beta \to \gamma$.
> *Why*: otherwise $\alpha \to \beta \leftarrow \gamma$ is an unshielded collider, but
> the separating set for $(\alpha, \gamma)$ would not contain $\beta$ — contradicting
> the current v-structure determination (unless $\beta \in \text{Sep}(\alpha,\gamma)$,
> but that would have removed the $\alpha-\gamma$ non-adjacency instead).
>
> **R2 (Acyclicity)**:
> If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$, then orient $\alpha \to \gamma$.
> *Why*: orienting $\gamma \to \alpha$ would create a directed cycle $\alpha \to \beta
> \to \gamma \to \alpha$.
>
> **R3 (Ambiguity resolution)**:
> If $\alpha - \beta_1 \to \gamma$, $\alpha - \beta_2 \to \gamma$, $\alpha - \gamma$,
> and $\beta_1$ and $\beta_2$ are non-adjacent, then orient $\alpha \to \gamma$.
> *Why*: both $\alpha \to \beta_1 \to \gamma$ and $\alpha \to \beta_2 \to \gamma$ would
> create cycles if $\gamma \to \alpha$; but orienting $\gamma \to \alpha$ and then
> $\alpha \to \beta_1$ or $\alpha \to \beta_2$ violates acyclicity.
>
> **R4 (Cycle prevention)**:
> If $\alpha - \beta \to \gamma \to \delta$, $\alpha - \delta$, and $\alpha$ is non-adjacent
> to $\gamma$, then orient $\alpha \to \delta$.
> *Why*: $\delta \to \alpha \to \beta \to \gamma \to \delta$ would form a cycle.
^def-meek-rules

> [!theorem] Completeness of R1–R4 (Meek, 1995, Theorem 2)
> The four rules R1–R4 are **sound and complete**: starting from the skeleton and
> v-structures, applying R1–R4 exhaustively produces exactly the CPDAG — all and only
> the edges that have a unique orientation in every DAG in the equivalence class.
^thm-meek-complete

### The CPDAG as output

> [!definition] CPDAG Structure (Meek, 1995)
> The **Completed Partially Directed Acyclic Graph (CPDAG)** $C$ for an equivalence
> class $[G^*]$ has:
> - A **directed edge** $X_i \to X_j$ in $C$ if and only if $X_i \to X_j$ in **every**
>   DAG in the equivalence class.
> - An **undirected edge** $X_i - X_j$ in $C$ if and only if both $X_i \to X_j$ and
>   $X_j \to X_i$ appear in different DAGs within the class.
>
> Every CPDAG corresponds to a **unique** Markov equivalence class; every Markov
> equivalence class has a unique CPDAG. CPDAGs are characterized as chain graphs
> satisfying acyclicity on the directed part plus specific constraints on the undirected parts.
^def-cpdag

### Identifiability limits under faithfulness

| Structural feature | Identifiable from observational data? |
|-------------------|--------------------------------------|
| Skeleton (edges vs. non-edges) | Yes (under faithfulness) |
| V-structures | Yes (under faithfulness) |
| Remaining edge directions | No — only identifiable via interventions or extra assumptions |
| Full DAG | Only if CPDAG has all edges directed (unique equivalence class) |

**Extra assumptions that break the equivalence class:**
- **Non-Gaussian errors** → LiNGAM identifies the full DAG via ICA.
- **Additive noise models** → Additive noise model (ANM) typically identifies direction.
- **Interventional data** → Breaks symmetry, can orient previously undirected edges.

## Connections

- **GES orientation**: GES also outputs a CPDAG, but via a different path — it operates
  directly on the space of CPDAGs using score operators. See [[GES Algorithm - Overview]].
- **NOTEARS**: The continuous NOTEARS program outputs a directed graph (not a CPDAG);
  its thresholded estimate is a DAG (a specific member of the equivalence class), not
  the full equivalence class. See [[NOTEARS - Overview]].
- **Causal reasoning with CPDAGs**: Not all causal queries are answerable from CPDAGs
  alone; the back-door criterion and identifiability results require a specific DAG or
  a PAG (for FCI). See [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm - Overview]] — full algorithm context and assumptions
- [[PC Algorithm - Skeleton and Independence Tests]] — Phase 1 skeleton recovery
- [[GES Algorithm - Overview]] — score-based method also producing CPDAGs
- [[Constraint vs Score-Based Causal Discovery]] — comparison of the two paradigms
- [[Directed Acyclic Graphs]] — d-separation and causal reasoning
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns
