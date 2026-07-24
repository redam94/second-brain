---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Survey.md]]"
source_location: "§2: Markov Equivalence; Verma & Pearl (1990) UAI; Spirtes et al. (2000) Ch. 3"
date_ingested: 2026-07-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[V-Structures and Meek Rules]]"
aliases:
  - CPDAG
  - completed partially directed acyclic graph
  - essential graph
  - Markov equivalence class
  - MEC
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independences.
> The **Verma–Pearl theorem** characterizes equivalence purely graphically: same skeleton
> + same v-structures. The **CPDAG** (completed partially directed acyclic graph) is the
> canonical representative of an equivalence class: directed edges in the CPDAG appear
> in *every* member DAG; undirected edges appear in some but not all. All constraint-based
> ([[PC Algorithm - Overview]]) and score-based ([[GES - Greedy Equivalence Search]])
> causal discovery algorithms output a CPDAG, not a unique DAG, because observational
> data alone cannot distinguish Markov equivalent models.

## Overview

Causal structure learning from observational data is fundamentally limited: multiple
DAGs can generate the same joint distribution. The question "which DAG is the true one?"
is often unanswerable without interventional data. The **Markov equivalence class (MEC)**
characterises exactly what can and cannot be learned.

Understanding MECs is essential for interpreting the output of PC, GES, and similar
algorithms — they return a CPDAG, and every DAG consistent with that CPDAG is equally
supported by the data.

## Main Content

### Definitions

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G = (\mathbf{V}, \mathbf{E})$ is the undirected graph
> obtained by replacing every directed edge $X \to Y$ with an undirected edge $X - Y$.
^def-skeleton

> [!definition] Definition: V-Structure (Immorality)
> A **v-structure** in DAG $G$ is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z$ and $Y \to Z$ are both in $G$ (Z is a "common effect"), and
> 2. $X$ and $Y$ are **not** adjacent in $G$ (no direct edge between them).
>
> V-structures are also called **immoralities** (Pearl 1988). Note: $Z$ is *not* in
> the separating set of $X$ and $Y$ — it is a collider, not a conditioner.
^def-vstructure

> [!definition] Definition: Markov Equivalence Class (MEC)
> Two DAGs $G_1$ and $G_2$ over the same vertex set $\mathbf{V}$ are **Markov equivalent**
> if they encode the same set of conditional independence relations, i.e.,
> $$(X \perp\!\!\!\perp Y \mid S)_{G_1} \iff (X \perp\!\!\!\perp Y \mid S)_{G_2} \quad \forall X, Y, S.$$
> The **Markov equivalence class** of $G$ is the set $[G]$ of all DAGs Markov equivalent to $G$.
^def-mec

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of an MEC $[G]$ is the unique graph $\mathcal{C}$ such that:
> - $X \to Y$ in $\mathcal{C}$ iff $X \to Y$ in **every** DAG in $[G]$ (compelled/protected edge).
> - $X - Y$ in $\mathcal{C}$ iff the edge $X - Y$ is present in $[G]$ but directed *differently*
>   in different member DAGs (reversible edge).
>
> The CPDAG is also called the **essential graph** of the MEC. It is a chain graph
> (directed + undirected edges, with undirected components being cliques in a DAG-like structure).
^def-cpdag

### The Verma–Pearl Theorem

> [!theorem] Theorem: Graphical Characterization of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over $\mathbf{V}$ are **Markov equivalent** if and only if:
> 1. They have the same **skeleton** (same set of adjacent pairs), and
> 2. They have the same set of **v-structures** (same immoralities).
>
> **Consequence**: two graphs that differ only in the orientation of an edge that is not
> part of any v-structure are Markov equivalent.
^thm-verma-pearl

This theorem is the cornerstone of constraint-based and score-based causal discovery:
it tells us exactly what we can learn (skeleton + v-structures) and what we cannot
(the orientation of reversible edges).

### Example: A Three-Node Equivalence Class

Consider three variables $X, Y, Z$. The three DAGs $X \to Y \to Z$, $X \leftarrow Y \to Z$,
and $X \to Y \leftarrow Z$ all have the same skeleton $X - Y - Z$, but only $X \to Y \leftarrow Z$
has a v-structure at $Y$. Therefore:

- $\{X \to Y \to Z\}$ and $\{X \leftarrow Y \to Z\}$ are Markov equivalent (same skeleton,
  no v-structures). Their CPDAG is $X - Y - Z$ (all undirected).
- $\{X \to Y \leftarrow Z\}$ is its own equivalence class (unique v-structure at $Y$).
  Its CPDAG is $X \to Y \leftarrow Z$ (fully directed).

### Score Equivalence

> [!theorem] Theorem: Score Equivalence
> Under a **faithful Gaussian** structural equation model, the **BIC score** assigns the
> same value to all DAGs in the same MEC:
> $$Q(G_1) = Q(G_2) \quad \text{whenever } G_1 \sim_M G_2.$$
> This holds because Markov equivalent DAGs fit the data identically — they have the
> same likelihood at the MLE, and the same number of free parameters (both consequences
> of same skeleton + same v-structures).
^thm-score-equiv

Score equivalence is what makes **[[GES - Greedy Equivalence Search]]** possible: GES
searches over MECs (CPDAGs) rather than individual DAGs, and all members of an MEC
get the same score.

### Covered Edge Reversals

> [!definition] Definition: Covered Edge
> An edge $X \to Y$ in DAG $G$ is **covered** if the parents of $X$ in $G$ equal the
> parents of $Y$ minus $\{X\}$: $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$.
^def-covered

> [!theorem] Theorem: Meek (1997) — MEC Reachability via Covered Reversals
> Any two Markov equivalent DAGs $G_1, G_2$ are connected by a sequence of **covered
> edge reversals**: there is a path $G_1 = G^{(0)}, G^{(1)}, \dots, G^{(k)} = G_2$
> where each step reverses one covered edge and stays within the same MEC.
>
> This is the **"Meek Conjecture"** proved by Chickering (2002) as Theorem 2.
^thm-meek-conjecture

The Meek conjecture is the graph-theoretic foundation of GES: the CPDAG search space is
connected via covered edge reversals, which means GES's insert/delete operators can
reach any member of the MEC.

## Identifiability and Its Limits

CPDAGs reveal what **cannot** be identified from observational data:
- **Directed edges** in the CPDAG are identifiable: they must point that way in the true DAG.
- **Undirected edges** reflect a genuine non-identifiability: additional assumptions are needed
  to orient them, such as:
  - **Non-Gaussianity of noise** (LiNGAM — Shimizu et al. 2006): in non-Gaussian linear SEMs,
    the full DAG is identifiable, not just its MEC.
  - **Equal noise variances** (Peters & Mooij 2013): imposes constraints that identify orientation.
  - **Interventional data**: performing a do-operation on a variable resolves its incoming edge orientations.

## Connections

- **PC algorithm**: recovers the CPDAG from data using conditional independence tests.
  See [[PC Algorithm - Overview]] and [[Skeleton Recovery and CI Tests]].
- **GES**: searches over CPDAGs using a decomposable score. See [[GES - Greedy Equivalence Search]].
- **V-structures**: the central orientable structure; see [[V-Structures and Meek Rules]]
  for how PC orients them and propagates orientation via Meek's rules.
- **NOTEARS**: returns a single DAG $\hat{W}$ (not a CPDAG), because the continuous
  score is not score-equivalent — the $\ell_1$ regularizer breaks the symmetry.
  See [[NOTEARS - Overview]].
- **Directed Acyclic Graphs**: the causal semantics (d-separation, do-calculus, back-door
  criterion) that motivate why learning a DAG is useful.
  See [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm - Overview]] — uses Verma–Pearl theorem to orient edges from data
- [[GES - Greedy Equivalence Search]] — searches CPDAG space using BIC
- [[V-Structures and Meek Rules]] — how v-structures are identified and how Meek rules propagate orientation
- [[DAG Structure Learning Problem]] — the underlying estimation problem (NOTEARS framing)
- [[Directed Acyclic Graphs]] — causal semantics of DAGs (d-separation, back-door)
- [[Summary Causal DAGs]] — CPDAG-like structures in the causal ABM literature
