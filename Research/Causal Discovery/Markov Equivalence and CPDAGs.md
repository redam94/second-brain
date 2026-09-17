---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2 Background, pp. 2-3; Verma & Pearl (1990), Meek (1995)"
date_ingested: 2026-09-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Constraint-Based Structure Learning]]"
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "Meek rules"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** iff they encode the same conditional independence structure —
> formally, iff they share the same **skeleton** and the same set of **v-structures** (unshielded
> colliders). Observational data alone cannot distinguish Markov equivalent DAGs: the identifiable
> object is the **Markov equivalence class (MEC)**. A MEC has a unique compact representation, the
> **Completed Partially Directed Acyclic Graph (CPDAG)**, where directed edges are those shared by
> *all* DAGs in the class and undirected edges can be oriented either way. Both the **PC algorithm**
> and **GES** return a CPDAG as their output.

## Overview

Structural learning from observational data targets a DAG $G$ over variables
$X_1,\dots,X_d$.  But the same joint distribution $\mathbb{P}(X)$ is consistent
with many different DAGs: any two DAGs that entail exactly the same set of
conditional independence (CI) statements are **Markov equivalent** and
*indistinguishable* from observational data. Understanding which structure
features are identifiable — and which are not — is essential for interpreting
any structure-learning output.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ on the same vertex set $V$ are **Markov equivalent**,
> written $G_1 \sim G_2$, if they encode the same set of conditional independence
> relations; equivalently, if $\mathbb{P}(X)$ that is Markov to $G_1$ is also
> Markov to $G_2$ and vice versa for every distribution $\mathbb{P}$.
>
> **Theorem (Verma & Pearl, 1990):** Two DAGs are Markov equivalent **if and
> only if** they have the same:
> 1. **Skeleton** (undirected graph of adjacencies), *and*
> 2. **V-structures** (unshielded colliders): triples $A \to C \leftarrow B$ where
>    $A$ and $B$ are *non-adjacent*.
^def-markov-equivalence

> [!note] Why v-structures are the identifiable orientations
> A collider $A \to C \leftarrow B$ is *blocked* (d-separates $A$ and $B$) unless
> $C$ or a descendant of $C$ is conditioned on. The non-collider (mediator or fork)
> arrangement $A \to C \to B$ or $A \leftarrow C \leftarrow B$ is *open* by default.
> This difference in CI relations is what pins down the orientation of v-structures
> from data; chain and fork orientations are *not* identifiable from observational data alone.

### V-structures and the skeleton

> [!definition] Definition: Skeleton and V-structures
> - The **skeleton** of $G$ is the undirected graph $G^{\mathrm{skel}}$ obtained by replacing
>   every directed edge $A \to B$ with an undirected edge $A - B$.
> - A **v-structure** (unshielded collider) is a triple $(A, C, B)$ such that
>   $A \to C \leftarrow B \in G$ and $A \not\sim B$ (non-adjacent).
> - A **shielded collider** $A \to C \leftarrow B$ where $A \sim B$ is *not* a v-structure;
>   it is not identifiable from observational data alone.
^def-vstructure

### The Markov equivalence class (MEC)

> [!definition] Definition: Markov Equivalence Class
> The **Markov equivalence class (MEC)** of a DAG $G$ is
> $$[G] = \{G' : G' \sim G\}.$$
> Under the faithfulness assumption, the CI structure of the data identifies the MEC $[G^*]$
> of the true DAG $G^*$ but not $G^*$ itself (in general).
^def-mec

### CPDAG: the canonical representative

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> Every MEC $[G]$ has a unique representative, the **CPDAG** $\mathcal{C}(G)$:
> - $A - B$ (undirected) in $\mathcal{C}(G)$ iff $A \to B$ in some DAGs of $[G]$
>   and $A \leftarrow B$ in others — the edge orientation is *not* shared by all members.
> - $A \to B$ (directed) in $\mathcal{C}(G)$ iff $A \to B$ in **every** DAG in $[G]$
>   — this orientation is forced by the v-structure or transitivity constraints.
>
> A CPDAG is a **mixed graph** (both directed and undirected edges). Every consistent
> extension of a CPDAG is a DAG in the MEC.
^def-cpdag

> [!note] Practical implication
> Structure-learning algorithms that recover the MEC output a CPDAG.
> The set of directed edges in the CPDAG is the *maximum* identifiable information
> about edge orientations from observational data alone (absent additional
> faithfulness-like identifiability conditions such as non-Gaussianity or non-linearity).

### Meek's Orientation Rules

After orienting all v-structures, additional edges can be oriented without
creating new v-structures or cycles by applying **Meek's four rules** iteratively
(Meek, 1995). These rules complete a CPDAG from its skeleton + v-structures.

> [!theorem] Meek's Orientation Rules (Meek, 1995)
> Let $E_u$ be the set of undirected edges in a partially directed graph.
> Apply the following rules until no more orientations are possible:
>
> **R1 (Away from collider):** If $a \to b - c$ and $a \not\sim c$,
> orient $b \to c$.
> *Rationale: orienting $c \to b$ would create a new v-structure at $b$.*
>
> **R2 (Away from cycle):** If $a \to c \to b$ and $a - b$,
> orient $a \to b$.
> *Rationale: orienting $b \to a$ would create a directed cycle.*
>
> **R3 (Double triangle):** If $d \sim a \sim c$, $d \to b \leftarrow c$,
> $c \not\sim d$, and $a - b$, orient $a \to b$.
> *Rationale: any other orientation creates a new v-structure.*
>
> **R4 (Zap):** If $d \sim a \sim c$, $d \to c \to b$, $b \not\sim d$,
> and $a - b$, orient $a \to b$.
^thm-meek-rules

> [!note] Completeness
> Meek (1995) proved that R1–R4 are **sound and complete**: applying them exhaustively
> to a skeleton with oriented v-structures yields exactly the CPDAG for the MEC.
> Any remaining undirected edge after full application genuinely cannot be oriented
> from observational data alone.

### From CPDAG back to DAGs

A CPDAG $\mathcal{C}$ represents multiple DAGs. To recover a specific DAG from a CPDAG
(e.g. for downstream causal effect computation), one must pick an **orientation extension**:
orient all undirected edges consistently (no new colliders, no cycles). Multiple valid
extensions exist — all are in the same MEC. The **random DAG extension** (Dor & Tarsi, 1992)
can be computed in polynomial time.

## Examples

> [!example] Three equivalent DAGs
> Consider four variables $\{W, X, Y, Z\}$ with skeleton $W - X - Y - Z$ (a path graph).
> No v-structures exist. All $2^3 = 8$ orientations of the three edges that produce a DAG
> are Markov equivalent; the CPDAG is simply $W - X - Y - Z$ (all undirected). Observational
> data cannot determine *any* causal direction in this chain.
>
> Now add $W - Z$ to the skeleton (creating a diamond). Suppose the true DAG has
> $W \to X \leftarrow Z$ (a v-structure) and $W \to Y \to Z$. The CPDAG will have
> $W \to X \leftarrow Z$ directed (v-structure) and $W - Y - Z$ undirected (chain direction
> not identifiable given the v-structure is already oriented).

## Connections

- **PC algorithm output**: the PC algorithm recovers the skeleton and v-structures, then
  applies Meek's rules → outputs a CPDAG. See [[PC Algorithm]].
- **GES output**: GES searches over CPDAG space directly, also returning a CPDAG.
  See [[Greedy Equivalence Search]].
- **NOTEARS**: outputs a DAG (a specific member of the MEC) rather than a CPDAG, since it
  optimizes a continuous score over the full real matrix $W$. See [[NOTEARS - Overview]].
- **Faithfulness**: the identifiability of the MEC requires the faithfulness assumption —
  see [[Constraint-Based Structure Learning]].
- **Causal effects under MEC**: with a CPDAG, some causal effects are *identifiable*
  (if the causal path is fully directed), while others require additional interventional data.
  See [[Directed Acyclic Graphs]] for d-separation and the back-door criterion.

## See Also
- [[DAG Structure Learning Problem]] — the overall learning problem and prior method landscape
- [[Constraint-Based Structure Learning]] — the CI-testing approach that identifies the MEC
- [[PC Algorithm]] — algorithm that recovers the CPDAG via CI tests
- [[Greedy Equivalence Search]] — score-based algorithm operating over CPDAG space
- [[Directed Acyclic Graphs]] — d-separation and causal semantics
