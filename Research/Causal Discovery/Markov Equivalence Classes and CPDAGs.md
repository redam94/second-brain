---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-algorithm-source-notes.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), CPS Ch. 2–3; Verma & Pearl (1990)"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[V-Structures and Meek Orientation Rules]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Constraint-Based Skeleton Learning]]"
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence"
  - "pattern graph"
  - "I-equivalence"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they have the same **skeleton**
> and the same **v-structures** (unshielded colliders). This equivalence class is
> represented by a **CPDAG** — a mixed graph with directed edges where all members
> agree and undirected edges where direction is data-undetermined. CPDAGs are the
> output of constraint-based (PC) and score-based (GES) causal discovery algorithms
> under pure observational data.

## Overview

In causal structure learning, the goal is to identify the data-generating DAG from
observations. But many DAGs encode the same statistical constraints — they imply the
same set of conditional independences. These DAGs form a **Markov equivalence class**,
and observational data can only distinguish between equivalence classes, not between
members of the same class.

Understanding Markov equivalence is essential for interpreting the output of structure
learning algorithms: the CPDAG is the *most informative* summary of what can be learned
from observational data.

## Main Content

### V-Structures: The Key Non-Equivalence Marker

> [!definition] Definition: V-structure (unshielded collider) (CPS, Ch. 2)
> In a DAG $G$, a **v-structure** is a triple $(X, Z, Y)$ such that:
> - $X \to Z$ and $Y \to Z$ (both edges point into $Z$), and
> - $X$ and $Y$ are **not adjacent** in $G$ (no edge between them).
>
> Also called an **unshielded collider** or **immorality**.
> ^def-vstructure

V-structures are identifiable from data because a collider $Z$ in $X \to Z \leftarrow Y$
**blocks** the path $X - Z - Y$ when $Z$ is not conditioned on, but **opens** the path
when $Z$ (or a descendant) is conditioned on. This is the opposite behaviour from
causal chains ($X \to Z \to Y$) and forks ($X \leftarrow Z \to Y$) — see
[[Directed Acyclic Graphs]] for d-separation rules.

### The Equivalence Characterisation

> [!theorem] Theorem: Markov Equivalence (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** (encode the same conditional
> independences) if and only if:
> 1. They have the same **skeleton** (same set of edges, ignoring direction), and
> 2. They have the same **v-structures** (same set of unshielded colliders).
>
> **Consequence**: changing any edge direction in $G_1$ that is not part of a
> v-structure and does not create a new v-structure or directed cycle yields
> another member of the same equivalence class.
> ^thm-markov-equiv

### CPDAGs: Representing an Equivalence Class

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> (CPS, Ch. 2; Andersson, Madigan & Perlman 1997)
> The **CPDAG** of a Markov equivalence class $[G]$ is the unique mixed graph $C$ on
> the same variables satisfying:
> 1. $C$ has a **directed edge** $X \to Y$ iff **every** DAG in $[G]$ has $X \to Y$.
> 2. $C$ has an **undirected edge** $X - Y$ iff some members of $[G]$ have $X \to Y$
>    and others have $X \leftarrow Y$.
>
> Also called the **essential graph** or **pattern** of $G$.
>
> **Key property**: A CPDAG always exists and is unique for each equivalence class.
> ^def-cpdag-formal

**Consequence for causal inference**: directed edges in the CPDAG are **identifiable
causal directions** from observational data alone. Undirected edges are **causally
indeterminate** without additional assumptions (interventions, non-Gaussianity,
equal-variance, etc.).

### Example: A Simple Three-Variable CPDAG

Consider three variables $\{X, Y, Z\}$.

**Equivalence class 1** — causal chain:
- $X \to Y \to Z$, $X \to Y \leftarrow Z$, and $X \leftarrow Y \to Z$ are all equivalent
  (same skeleton $X - Y - Z$, no v-structures).
- CPDAG: $X - Y - Z$ (all edges undirected).

**Equivalence class 2** — v-structure:
- $X \to Z \leftarrow Y$ (with $X - Y$ absent) is the **only** member of its class.
- CPDAG: $X \to Z \leftarrow Y$ (both edges directed, v-structure is identifiable).
- This is why v-structures can be oriented from data.

### Counting Equivalence Classes

For $p$ variables and $e$ edges:
- Number of DAGs: superexponential in $p$ (Bayesian network research).
- Number of equivalence classes: always $\leq$ number of DAGs; often much smaller.
- For $p = 3$: there are 25 DAGs but only 11 equivalence classes.

The smaller search space is why GES searches over **CPDAGs** rather than DAGs —
reducing the problem without losing information under observational data.

### Verifying and Constructing a CPDAG

Given a DAG $G$, its CPDAG is constructed by:
1. Start with all edges **undirected**.
2. Re-orient each v-structure $X \to Z \leftarrow Y$ as directed.
3. Apply **Meek's R1–R4 orientation rules** to propagate orientations consistently.
4. The resulting graph is the CPDAG.

See [[V-Structures and Meek Orientation Rules]] for the detailed rules.

### I-Maps and Perfect Maps

> [!definition] Definition: I-map and Perfect Map
> A DAG $G$ is an **I-map** of a distribution $P$ if every independence in $G$
> (d-separation) is also an independence in $P$. $G$ is a **perfect map** of $P$
> if it captures *exactly* the independences — no more, no less.
>
> A DAG $G'$ is an **I-map** of $G$ if every independence in $G$ holds in $G'$
> (i.e., $G'$ has at least as many edges as $G$, and all d-separations of $G$ are
> also d-separations of $G'$).
> ^def-imap

The Meek Conjecture (proved by Chickering 2002, see [[GES - Greedy Equivalence Search]])
relies on the I-map notion: the GES forward phase produces a sequence of CPDAGs that
are always I-maps of the true CPDAG.

## Connections

- **PC algorithm**: outputs a CPDAG; see [[PC Algorithm - Overview]].
- **GES**: searches CPDAG space directly; see [[GES - Greedy Equivalence Search]].
- **NOTEARS**: also outputs a DAG (not just a CPDAG); see [[NOTEARS - Overview]].
- **Causal reasoning**: the directed edges in a CPDAG support the back-door criterion;
  undirected edges require selecting a member DAG first — see [[Directed Acyclic Graphs]].
- **Identifiability with additional assumptions**: under linear non-Gaussian noise
  (LiNGAM), the full DAG (not just CPDAG) is identifiable — equivalent DAGs have
  different non-Gaussian signatures.

## See Also
- [[V-Structures and Meek Orientation Rules]] — how CPDAG is completed from skeleton + v-structures
- [[PC Algorithm - Overview]] — the constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm that searches CPDAG space
- [[DAG Structure Learning Problem]] — the NP-hardness context and SEM formulation
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
