---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch07-PC-algorithm-REFERENCE.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 3; Chickering (2002) §2"
date_ingested: 2026-10-27
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalence"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
> independence (d-separation) relationships. Their **Markov equivalence class (MEC)** is the set
> of all such DAGs. A **CPDAG** (completed partially directed acyclic graph, also called *essential
> graph*) is the canonical graphical representation of a MEC: an edge is directed in the CPDAG iff
> it has the same orientation in *every* member of the MEC. Both [[PC Algorithm - Overview]] and
> [[GES - Greedy Equivalence Search]] output CPDAGs rather than individual DAGs, because observational
> data alone cannot distinguish between Markov-equivalent structures.

## Overview

Causal structure learning from **observational** (non-experimental) data faces a fundamental
identifiability limit: multiple DAGs are compatible with the same joint distribution. The correct
target for structure learning is therefore the **equivalence class** of all DAGs that are
distribution-compatible — not any particular DAG within it. Every constraint-based and score-based
algorithm (PC, GES, FGS, NOTEARS's post-processing) ultimately returns a representation of this
class.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $G_1$ and $G_2$ over the same node set $V$ are **Markov equivalent** if for every
> triple $(X, Y, Z)$ of disjoint node sets:
> $$G_1 \models X \perp\!\!\!\perp Y \mid Z \quad\Longleftrightarrow\quad G_2 \models X \perp\!\!\!\perp Y \mid Z,$$
> where $\models X \perp\!\!\!\perp Y \mid Z$ means "$X$ is d-separated from $Y$ given $Z$."
^def-markov-equiv

Equivalently, $G_1$ and $G_2$ generate the same set of conditional independence relations under
any faithful distribution.

### Graphical characterization

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (same set of undirected edges, ignoring directions), and
> 2. The same **v-structures** (unshielded colliders): the same set of triples
>    $X \to Z \leftarrow Y$ where $X$ and $Y$ are not adjacent.
^thm-equiv-characterization

This is the key result: the skeleton and v-structures are the *invariants* of a MEC. All other
edge orientations may differ across members of the class.

> [!note] V-structures vs. shielded colliders
> An **unshielded collider** (v-structure) $X \to Z \leftarrow Y$ has $X$ and $Y$ non-adjacent.
> A **shielded collider** $X \to Z \leftarrow Y$ with $X$–$Y$ edge present is *not* a v-structure
> and does not constrain the equivalence class.

### CPDAG (essential graph)

> [!definition] Definition: CPDAG / Essential Graph (Chickering 1995; Andersson et al. 1997)
> The **CPDAG** (completed partially directed acyclic graph) of a MEC $[G]$ is the unique
> mixed graph $\mathcal{C}$ on $V$ such that:
> - $\mathcal{C}$ has the same skeleton as every $G' \in [G]$.
> - An edge $X \to Y$ is **directed** in $\mathcal{C}$ iff $X \to Y$ in *every* $G' \in [G]$
>   (the orientation is **compelled** or **forced**).
> - An edge $X - Y$ is **undirected** in $\mathcal{C}$ iff the orientation varies across $[G]$
>   (the orientation is **reversible**).
^def-cpdag

The CPDAG is equivalent to the **essential graph** of Andersson, Madigan & Perlman (1997).
It is the minimal sufficient representation of the identifiable causal structure.

### Meek's orientation rules

Given the skeleton and v-structures, the remaining compelled orientations in the CPDAG can be
propagated by four **Meek rules** (Meek 1995):

> [!definition] Definition: Meek Orientation Rules (Meek 1995)
> Let $G$ be a partially oriented graph consistent with the identified v-structures. Apply
> repeatedly until no new orientations are possible:
>
> **R1** (Acyclicity): If $X \to Y - Z$ and $X$ not adjacent to $Z$, orient $Y \to Z$.
> *(Otherwise $Y \leftarrow Z$ creates a v-structure $X \to Y \leftarrow Z$.)*
>
> **R2** (Acyclicity): If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$.
> *(Otherwise $X \leftarrow Z$ creates a directed cycle.)*
>
> **R3** (V-structure preservation): If $X - Y \to Z$, $X - W \to Z$, $X - Z$, $Y$ not adjacent
> to $W$, then orient $X \to Z$.
>
> **R4** (V-structure preservation): If $X - Y \to W \to Z$ and $X - Z$, $X$ not adjacent to $W$,
> orient $X \to Z$.
^def-meek-rules

These four rules are **complete**: they generate all compelled orientations from the
skeleton + v-structure information (Meek 1995; Chickering 2002).

### Markov equivalence class size

Most MECs contain multiple DAGs. In the worst case, all $d!$ orderings of $d$ nodes could belong
to one MEC (e.g., a complete graph has a unique skeleton and no v-structures). In practice, sparse
graphs tend to have many small MECs. The number of MECs on $d$ nodes grows much more slowly
than the number of DAGs, which justifies using MECs as the search space in GES.

## Examples

> [!example] Example: A Three-Node MEC
> Consider variables $X$, $Y$, $Z$ with skeleton $X - Y - Z$ (no $X$-$Z$ edge) and
> no v-structures. The MEC contains two DAGs:
> - $X \leftarrow Y \rightarrow Z$ (Y causes X and Z)
> - $X \rightarrow Y \rightarrow Z$ (causal chain, direction 1)
> - $X \leftarrow Y \leftarrow Z$ (causal chain, direction 2)
>
> Wait — all three have the same skeleton and no v-structures, so they are all Markov
> equivalent. The CPDAG has all edges undirected: $X - Y - Z$.
>
> If instead $X \to Y \leftarrow Z$ (v-structure at Y), the CPDAG directs *both* edges:
> $X \to Y \leftarrow Z$ is the unique DAG in its MEC.

## Connections

- **Identifiability limit**: Observational data can only identify the MEC, not the individual DAG.
  Experimental interventions can break this symmetry — see [[Directed Acyclic Graphs]] (do-calculus).
- **Score equivalence**: Decomposable scores like BIC assign the same score to all DAGs in a MEC.
  This is why GES can use the CPDAG as its search state — see [[GES - Greedy Equivalence Search]].
- **PC algorithm output**: PC recovers the skeleton and v-structures and applies Meek rules to
  produce the CPDAG — see [[PC Algorithm - Overview]].
- **Beyond equivalence**: With non-Gaussian noise, individual DAGs are identifiable from observational
  data (LiNGAM, Peters et al. 2014). [[NOTEARS - Overview]] notes this but targets the linear
  Gaussian case (recovering the correct DAG up to MEC).

## See Also
- [[PC Algorithm - Overview]] — constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based search over MECs
- [[DAG Structure Learning Problem]] — the broader structure learning setup
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus in the causal inference vault
