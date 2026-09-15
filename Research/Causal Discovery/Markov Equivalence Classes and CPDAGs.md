---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Verma & Pearl (1990); Frydenberg (1990); Meek (1995) — PDFs unavailable (network policy blocked academic domains)"
source_location: "Verma & Pearl (1990) UAI; Frydenberg (1990) Scand. J. Stat. 17(4); Meek (1995) UAI"
date_ingested: 2026-09-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Causal Structure Learning - Paradigm Overview]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "essential graph"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs encode the same set of conditional independence relationships if and only if they
> share the same **skeleton** (undirected edge set) and **v-structures** (unshielded colliders).
> Such DAGs are **Markov equivalent**. Their equivalence class is represented by a **CPDAG**
> (Completed Partially Directed Acyclic Graph) — the canonical object that constraint-based
> ([[PC Algorithm]]) and score-based ([[GES Algorithm]]) structure-learning algorithms output.
> Identifiability of DAGs from observational data is limited to this class without additional
> assumptions.

## Overview

Learning a DAG from purely observational data faces an inherent identifiability limit: multiple
DAGs can imply the same joint distribution. The **Markov equivalence class** formalizes this
limit. From observational data alone, the best any algorithm can do — under standard assumptions —
is recover the **CPDAG**, not a unique DAG. Oriented edges in the CPDAG are identifiable;
undirected edges could go either way without changing the implied distribution.

This structure is central to all major causal discovery paradigms: the PC algorithm outputs a
CPDAG; GES searches over CPDAGs directly. NOTEARS, which targets linear SEMs, can additionally
leverage non-Gaussianity or non-linearity of noise to break equivalences ([[NOTEARS - Overview]]).

## Main Content

### Skeleton and V-structures

> [!definition] Definition: Skeleton (Spirtes, Glymour & Scheines 2000)
> The **skeleton** of a DAG $\mathcal{G} = (\mathbf{V}, \mathbf{E})$ is the undirected graph obtained
> by replacing every directed edge $X \to Y$ with an undirected edge $X - Y$. Two DAGs have the
> same skeleton if they have the same set of adjacent pairs.
^def-skeleton

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** (also: unshielded collider, immorality) is a triple $(X, Z, Y)$ where
> $X \to Z \leftarrow Y$ and $X$ and $Y$ are **not adjacent** in $\mathcal{G}$.
> The node $Z$ is the **collider** in this triple. A collider with adjacent parents ($X$ and $Y$
> are adjacent) is a *shielded collider* and does **not** constrain the Markov equivalence class.
^def-vstructure

### The Markov equivalence theorem

> [!theorem] Theorem: Characterisation of Markov Equivalence (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same vertex set are **Markov equivalent**
> (they imply the same conditional independence model) if and only if:
> 1. They have the same **skeleton**, and
> 2. They have the same **v-structures** (unshielded colliders).
>
> **Consequence.** The observable data distribution — even with infinite samples — cannot
> distinguish between Markov-equivalent DAGs. Structure learning can at best recover the
> **equivalence class**, not a unique DAG.
^thm-markov-equivalence

### CPDAGs as canonical representations

> [!definition] Definition: CPDAG / Essential Graph (Meek 1995)
> A **CPDAG** (Completed Partially Directed Acyclic Graph), also called the **essential graph**,
> is the unique mixed graph (containing both directed and undirected edges) representing a Markov
> equivalence class:
>
> - An edge $X \to Y$ is **directed** in the CPDAG if and only if it is directed the same way in
>   *every* DAG in the equivalence class.
> - An edge $X - Y$ is **undirected** if and only if there exist two equivalent DAGs — one with
>   $X \to Y$ and one with $X \leftarrow Y$.
>
> A CPDAG is **unique** for each equivalence class and can be constructed from any member DAG.
^def-cpdag

### Meek's orientation rules

Given the skeleton and the v-structures of a DAG, the CPDAG is obtained by applying **Meek's
rules** iteratively until no more apply. These rules enforce acyclicity and preservation of
the v-structure set.

> [!theorem] Meek's Orientation Rules (Meek 1995)
> Let $H$ be a partially oriented graph with directed and undirected edges. Apply these rules:
>
> **R1 (new v-structure prevention).** If $A \to B - C$ and $A \not\sim C$, orient $B \to C$.
> *Reason:* orienting $B \leftarrow C$ would create the v-structure $A \to B \leftarrow C$ (since
> $A \not\sim C$), but this v-structure was absent in the original graph — contradiction.
>
> **R2 (cycle prevention).** If $A \to B \to C$ and $A - C$, orient $A \to C$.
> *Reason:* orienting $A \leftarrow C$ would create the directed cycle $A \to B \to C \to A$.
>
> **R3 (double-chain).** If $A - B \to C$ and $A - D \to C$ and $B \not\sim D$ and $A - C$,
> orient $A \to C$.
>
> **R4.** If $A - B \to C \to D$ and $A - C$ and $A \not\sim D$, orient $A \to C$.
>
> These four rules are **complete**: repeated application until fixpoint yields the CPDAG.
^thm-meek-rules

## Examples

> [!example] Example: Three-node equivalence class
> Consider $d = 3$ variables $\{A, B, C\}$. The two DAGs $A \to B \to C$ and $A \leftarrow B \to C$
> have the same skeleton ($A - B - C$) and both have *no* v-structures (B is not a collider in
> either). By the Markov equivalence theorem they are equivalent. Their CPDAG is the undirected
> path $A - B - C$ (no edges can be oriented).
>
> In contrast, $A \to B \leftarrow C$ (with $A$ and $C$ not adjacent) contains the v-structure
> $(A, B, C)$ — it belongs to a *different* equivalence class. Its CPDAG is $A \to B \leftarrow C$
> (both edges directed).

> [!example] Example: Identifiable vs. unidentifiable directions
> In a four-node DAG $A \to B \leftarrow C \to D$:
> - The v-structure $A \to B \leftarrow C$ fixes the orientation of $A-B$ and $C-B$.
> - The edge $C-D$ can be $C \to D$ or $C \leftarrow D$ without introducing new v-structures (if
>   $B \not\sim D$). Meek's R1 may or may not constrain it depending on the full graph.
>
> This illustrates that v-structures propagate orientation information via Meek's rules.

## Connections

- **Constraint-based discovery ([[PC Algorithm]])**: Phase 2 of PC identifies v-structures from
  separation sets, and Phase 3 applies Meek's rules to orient remaining edges. Output is a CPDAG.
- **Score-based discovery ([[GES Algorithm]])**: GES searches over the space of CPDAGs directly,
  using the fact that all DAGs in an equivalence class achieve the same score on decomposable
  score functions (BIC, BDe).
- **NOTEARS ([[NOTEARS - Overview]])**: Outputs a single DAG, not a CPDAG. For linear SEMs
  with non-Gaussian noise (LiNGAM), the full DAG is identifiable — the equivalence class
  collapses to a singleton.
- **Identifiability limits**: Without additional assumptions (non-Gaussianity, non-linear SEMs,
  temporal ordering, interventional data), the CPDAG is the finest identifiable object.

## See Also
- [[DAG Structure Learning Problem]] — the general setup: score, acyclicity, NP-hardness
- [[PC Algorithm]] — constraint-based algorithm that produces a CPDAG
- [[GES Algorithm]] — score-based algorithm searching the CPDAG space
- [[Directed Acyclic Graphs]] — DAG causal semantics (d-separation, back-door criterion)
- [[Causal Structure Learning - Paradigm Overview]] — three paradigms compared
