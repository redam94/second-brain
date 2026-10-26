---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis2014-PC-algorithm.txt]]"
source_location: "Background material; Verma & Pearl (1990); Meek (1995); Chickering (1995, 2002)"
date_ingested: 2026-10-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
aliases:
  - "CPDAG"
  - "Markov equivalence"
  - "equivalence class of DAGs"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same conditional
> independence relations — characterized by sharing the same **skeleton** and the same
> set of **v-structures** (unshielded colliders). An equivalence class is uniquely
> represented by a **CPDAG** (Completed Partially Directed Acyclic Graph), also called
> an *essential graph*: directed edges appear in all DAGs in the class, undirected edges
> appear with opposite orientations in different members. This concept is the fundamental
> target of both constraint-based ([[PC Algorithm]]) and score-based ([[Greedy Equivalence
> Search]]) structure learning — observational data can identify a causal DAG only up to
> its equivalence class.

## Overview

Structure learning from purely observational data faces a fundamental identifiability
ceiling: multiple DAGs can encode the same joint distribution. Two DAGs are observationally
indistinguishable if and only if they are Markov equivalent. Because no statistical test on
i.i.d. data can distinguish Markov equivalent DAGs, the best any structure-learning
algorithm can do — without interventional data or additional assumptions — is identify the
**Markov equivalence class** of the true DAG.

This is not a limitation of particular algorithms; it is an information-theoretic constraint.
Algorithms like [[PC Algorithm]] and [[Greedy Equivalence Search]] therefore return a CPDAG,
not a single DAG.

## Main Content

### Skeleton and v-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G = (V, E)$ is the undirected graph obtained by replacing every
> directed edge $X \to Y$ with an undirected edge $X - Y$. The skeleton encodes *which* pairs
> of variables are adjacent (directly connected) in the graph.
^def-skeleton

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** (also called an *unshielded collider*) in a DAG is a triple of nodes
> $X \to Z \leftarrow Y$ such that $X$ and $Y$ are **not** adjacent in the graph (i.e., the
> triple is *unshielded*). The node $Z$ is the **collider** of the v-structure.
>
> In contrast, a *shielded collider* $X \to Z \leftarrow Y$ where $X - Y$ are adjacent is
> **not** a v-structure — it can be reversed by re-orienting edges without changing the
> conditional independence structure.
^def-vstructure

### Markov equivalence theorem

> [!theorem] Theorem: Verma & Pearl (1990) — Characterization of Markov Equivalence
> Two DAGs $G_1$ and $G_2$ over the same variable set $V$ are **Markov equivalent** if and
> only if they have:
> 1. The same **skeleton** (same undirected adjacency structure), and
> 2. The same set of **v-structures** (unshielded colliders $X \to Z \leftarrow Y$).
>
> *Equivalently*: $G_1$ and $G_2$ are Markov equivalent $\iff$ they satisfy exactly the same
> conditional independence relations of the form $X \perp\!\!\!\perp Y \mid S$ for all disjoint
> sets $X, Y, S \subseteq V$.
>
> **Significance:** This gives a purely graphical (non-distributional) test for equivalence.
> It also explains *what* constraint-based methods learn: the skeleton (from which pairs are
> d-separated) and the v-structures (from the separating sets).
^thm-verma-pearl

### Completed Partially Directed Acyclic Graphs (CPDAGs)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (Completed Partially Directed Acyclic Graph) of an equivalence class
> $[G]$ is the unique mixed graph $\mathcal{G}^*$ over $V$ defined by:
> - **Directed edge** $X \to Y$ in $\mathcal{G}^*$ $\iff$ $X \to Y$ appears in **every** DAG
>   in $[G]$ (the orientation is *invariant* across the class).
> - **Undirected edge** $X - Y$ in $\mathcal{G}^*$ $\iff$ both $X \to Y$ and $Y \to X$ appear
>   in different DAGs in $[G]$ (the orientation is *free* — either is consistent with the class).
>
> Every Markov equivalence class has a unique CPDAG. Constructing it from any member DAG
> involves: (1) computing the skeleton and v-structures, (2) applying the **Meek rules** to
> orient as many remaining edges as possible without creating new v-structures or cycles.
^def-cpdag

### Meek Orientation Rules

Given the skeleton and v-structures, the following four rules (Meek 1995) orient additional
edges in a CPDAG without introducing new v-structures or directed cycles. They are applied
iteratively until no further orientations are possible.

> [!theorem] Meek Rules (Meek 1995) — Completing a CPDAG
> Let $G^*$ be a partially oriented graph with skeleton and v-structures already fixed.
> Apply these rules until convergence:
>
> **Rule R1 (orient away from collider):** If $X \to Y - Z$ and $X, Z$ non-adjacent,
> then orient $Y \to Z$ (otherwise $X \to Y \leftarrow Z$ would be a new v-structure at $Y$).
>
> **Rule R2 (acyclicity):** If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$
> (otherwise a directed cycle $X \leftarrow Z$ would be created).
>
> **Rule R3 (double triangle):** If $X - Z$, $X - Y_1 \to Z$, $X - Y_2 \to Z$,
> and $Y_1, Y_2$ non-adjacent, orient $X \to Z$.
>
> **Rule R4 (discriminating path):** If there exists a discriminating path from $W$ to $Y$
> for $X$, and $X - Y$ is undirected, then $X \to Y$ or orient the v-structure.
>
> After convergence, all remaining undirected edges are genuinely free (both orientations
> appear in some member of the equivalence class).
^thm-meek-rules

### The Meek Conjecture (Chickering 2002)

A key property of equivalence classes, later proven by Chickering (2002) in the course of
establishing GES's correctness, is how DAGs within a class relate to each other by local
transformations:

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Thm. 2)
> Let $G_1$ and $G_2$ be two DAGs in the same Markov equivalence class. Then $G_1$ can be
> transformed into $G_2$ by a sequence of operations that each either:
> 1. **Add** an edge to $G_1$ (while remaining in the class, then transitioning to another class), or
> 2. **Reverse** a *covered edge* $X \to Y$ (where $\mathrm{pa}(X) = \mathrm{pa}(Y) \setminus \{X\}$
>    — the parents of $X$ equal the parents of $Y$ minus $X$).
>
> **Significance for GES:** This theorem is what makes greedy search on equivalence classes
> well-defined — it ensures that the CPDAG space is *connected* under the Insert/Delete
> operators used by [[Greedy Equivalence Search]], so the algorithm can traverse between any
> two equivalence classes.
^thm-meek-conjecture

## Identifiability and Interventions

The Markov equivalence class is the fundamental identifiability limit for *observational*
data. To identify edge orientations beyond the CPDAG, one needs either:

- **Interventional data**: A hard intervention on $X$ (setting $X := x$) breaks the
  symmetry between $X \to Y$ and $Y \to X$ within the equivalence class.
- **Non-Gaussian noise**: Under the **Linear Non-Gaussian Acyclic Model** (LiNGAM;
  Shimizu et al. 2006), non-Gaussianity of noise makes the full DAG identifiable — not
  just the equivalence class.
- **Equal error variances**: Under the Gaussian equal-variance model (Peters & Bühlmann 2014),
  the DAG is fully identifiable.
- **Additive noise models**: Nonlinear additive noise models are identifiable under mild
  conditions (Hoyer et al. 2009).

## Connections

- **NOTEARS** ([[NOTEARS - Overview]]) estimates a single DAG from the equivalence class
  (not the full CPDAG) by minimizing a continuous score — it returns one member of $[G]$,
  not the essential graph.
- **PC Algorithm** ([[PC Algorithm]]) returns a CPDAG directly, using conditional independence
  tests to find the skeleton and v-structures, then applying Meek rules.
- **GES** ([[Greedy Equivalence Search]]) searches *over CPDAGs* (equivalence classes), not
  individual DAGs — the Meek Conjecture theorem is what makes this search well-defined.
- **d-separation** in [[Directed Acyclic Graphs]]: two DAGs are Markov equivalent $\iff$
  they agree on all d-separation statements — so the CPDAG is the finest-grained structure
  that observational data can identify.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that returns a CPDAG
- [[Greedy Equivalence Search]] — score-based algorithm that searches CPDAG space
- [[DAG Structure Learning Problem]] — problem setup (SEM, NP-hardness, prior methods)
- [[NOTEARS - Overview]] — continuous optimization approach, returns a single DAG not a CPDAG
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
- [[Spurious Association and Confounds]] — causal reasoning with DAGs
