---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-citation.md]]"
source_location: "Chickering (2002), JMLR Vol. 3, §2–3; Verma & Pearl (1990)"
date_ingested: 2026-08-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "essential graph"
  - "equivalence class DAG"
  - "Verma-Pearl theorem"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode exactly the same set of conditional
> independence relationships — i.e., the same skeleton and the same set of **v-structures**
> (Verma & Pearl 1990). The equivalence class is uniquely represented by a **CPDAG** (Completed
> Partially Directed Acyclic Graph), in which directed edges appear only where all members of the
> class agree on direction. This is the fundamental identifiability limit of causal discovery from
> observational data: no constraint-based or score-based method can distinguish DAGs within a
> Markov equivalence class without additional assumptions (interventional data, non-Gaussian noise,
> restricted function classes).

## Overview

The DAG structure learning problem targets a DAG $\mathsf{G}^*$ generating the observed data. But
observational data alone can only identify the **Markov equivalence class** of $\mathsf{G}^*$ —
the set of all DAGs that imply the same conditional independence (CI) structure. Two DAGs in the
same class fit the data equally well under any CI-based criterion. The CPDAG is the canonical
representative of this class, and is the output of both the [[PC Algorithm]] and [[GES Algorithm]].

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ over the same vertex set $\mathsf{V}$ are
> **Markov equivalent** if they have the same set of conditional independence (CI) relations
> entailed by the Markov property — i.e., for all disjoint $A, B, C \subseteq \mathsf{V}$:
> $$A \perp_{\mathsf{G}_1} B \mid C \iff A \perp_{\mathsf{G}_2} B \mid C$$
> where $\perp_{\mathsf{G}}$ denotes d-separation in $\mathsf{G}$ (see [[Directed Acyclic Graphs]]).
^def-markov-equivalence

The key question: when are two DAGs Markov equivalent? The answer reduces to two structural
features.

### Skeleton and v-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $\mathsf{G}$ is the undirected graph obtained by replacing every
> directed edge $X \to Y$ with an undirected edge $X - Y$.
^def-skeleton

> [!definition] Definition: V-structure (Unshielded Collider)
> A **v-structure** (or unshielded collider) is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z$ and $Y \to Z$ (edges into $Z$ from both $X$ and $Y$)
> 2. $X$ and $Y$ are **not adjacent** in $\mathsf{G}$ (no edge between $X$ and $Y$)
>
> The qualifier "unshielded" is essential: a collider $X \to Z \leftarrow Y$ where $X$ and $Y$
> *are* adjacent is a **shielded collider** and does not appear as a v-structure.
^def-v-structure

> [!theorem] Theorem: Markov Equivalence Characterization (Verma & Pearl 1990)
> Two DAGs are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (same adjacencies, ignoring directions), and
> 2. The same set of **v-structures** (unshielded colliders).
>
> **Significance.** This reduces a model-theoretic equivalence (same CI structure) to a purely
> graphical criterion checkable in polynomial time.
^thm-markov-equivalence

> [!example] Example: A Markov equivalence class
> Consider three nodes $X, Y, Z$ with edges $X \to Y \to Z$ (a chain). This is Markov equivalent to
> $X \leftarrow Y \leftarrow Z$ and $X \leftarrow Y \rightarrow Z$ — all three have skeleton $X - Y - Z$
> and no v-structures ($Y$ is a collider in none). They are **not** equivalent to
> $X \to Y \leftarrow Z$, which has the v-structure $(X, Y, Z)$.
>
> The equivalence class $\{X\to Y\to Z,\; X\leftarrow Y\leftarrow Z,\; X\leftarrow Y\rightarrow Z\}$
> contains three DAGs; the v-structure DAG $X\to Y\leftarrow Z$ is its own class.
^ex-equivalence

### The CPDAG

The **completed partially directed acyclic graph (CPDAG)**, also called the **essential graph**, is
the unique representation of a Markov equivalence class.

> [!definition] Definition: CPDAG (Chickering 2002, §2)
> Given a Markov equivalence class $[G]$, the **CPDAG** $\mathsf{C}$ is the graph on the same vertex
> set where:
> - An edge $X \to Y$ (directed) appears in $\mathsf{C}$ **iff** every DAG in $[G]$ has $X \to Y$
>   (the direction is compelled)
> - An edge $X - Y$ (undirected) appears in $\mathsf{C}$ **iff** some DAGs in $[G]$ have $X \to Y$
>   and others have $X \leftarrow Y$ (the direction is reversible)
>
> A CPDAG has the same skeleton as every member of its class, and every v-structure of any member
> appears as a directed edge pair in the CPDAG.
^def-cpdag

> [!note] Existence and uniqueness
> Every Markov equivalence class has a unique CPDAG (Andersson et al. 1997). Any DAG that is a
> member of the class can be obtained from the CPDAG by consistently directing all undirected edges
> without creating new v-structures or cycles. Algorithms for this exist in O(d²) time.

### Meek orientation rules

When the PC algorithm orients v-structures, additional directed edges can be forced by
**Meek's orientation rules** (Meek 1995) to avoid creating new v-structures or cycles.

> [!theorem] Meek Orientation Rules (Meek 1995)
> Given a CPDAG in progress (after v-structure orientation), apply these rules exhaustively to complete
> the orientation into a CPDAG:
>
> - **R1** (non-v-structure): If $A \to B - C$ and $A$ is not adjacent to $C$, orient $B \to C$.
>   (Orienting $C \to B$ would create a new v-structure at $B$.)
> - **R2** (acyclicity): If $A \to B \to C$ and $A - C$, orient $A \to C$.
>   (Orienting $C \to A$ would create a cycle.)
> - **R3** (ambiguous collider avoidance): If $D - A \to B$, $D - C \to B$, $D - B$, and $A, C$ are
>   not adjacent, orient $D \to B$.
> - **R4** (ambiguous collider with chain): If $A - B \to C \to D$, $A$ adj $D$, $A$ not adj $C$,
>   orient $A \to B$.
>
> These four rules are **complete**: repeatedly applying them exhausts all orientations entailed by
> the v-structures (Meek 1995).
^thm-meek-rules

## Why identifiability is limited

Under faithfulness and the Markov property alone, the **best recoverable object from observational
data is the CPDAG** — not a unique DAG. Identifying the true DAG requires additional assumptions:

| Assumption | Enables | Method |
|-----------|---------|--------|
| Gaussian noise, equal variances | Full DAG identification | PC (linear, equal-variance) |
| Non-Gaussian noise | Full DAG identification | LiNGAM (ICA-based) |
| Additive noise models (ANMs) | Full DAG identification | ANM score test |
| Interventional data ($do(X_j)$) | Partial/full DAG identification | JCI, IGSP |
| Expert knowledge (edge constraints) | Partial DAG identification | Background knowledge in PC/GES |

Without such assumptions, the CPDAG is the identifiable target.

## Connections

- **Constraint-based learning (PC)**: the PC algorithm's output *is* the CPDAG — see [[PC Algorithm]].
- **Score-based learning (GES)**: GES searches over Markov equivalence classes directly using the
  CPDAG representation — see [[GES Algorithm]].
- **NOTEARS**: outputs a full DAG rather than a CPDAG, but the true identifiable target is the CPDAG —
  see [[NOTEARS - Overview]].
- **d-separation**: the mechanism by which DAG structure implies CI relations — see [[Directed Acyclic Graphs]].
- **Summary DAGs**: a different (coarser) equivalence notion for ABM-generated graphs — see [[Summary Causal DAGs]].

## See Also
- [[Directed Acyclic Graphs]] — d-separation and collider/fork/chain patterns
- [[DAG Structure Learning Problem]] — the score-based formulation that GES uses
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[GES Algorithm]] — score-based algorithm that searches over equivalence classes
- [[Causal Discovery Algorithm Comparison]] — PC vs GES vs NOTEARS
