---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/ges-python-implementation-readme.md]]"
source_location: "Chickering (2002), §2; Meek (1995); Verma & Pearl (1990)"
date_ingested: 2026-08-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[CPDAG Orientation - V-Structures and Meek Rules]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "Markov equivalence"
  - "Completed partially directed acyclic graph"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
> independence relations — they are observationally indistinguishable from i.i.d. data.
> The characterisation theorem (Verma & Pearl 1990; Frydenberg 1990) says equivalence
> holds iff the two DAGs have the **same skeleton** and the **same v-structures
> (immoralities)**. Every Markov equivalence class (MEC) has a unique canonical
> representative called the **CPDAG** (Completed Partially Directed Acyclic Graph),
> which orients only those edges that point the same way in every member of the class.
> Structure-learning algorithms (PC, GES) output CPDAGs because individual DAGs within
> a MEC cannot be distinguished from purely observational data.

## Overview

Causal structure learning from observational data faces a fundamental identifiability
ceiling: different DAGs can impose exactly the same conditional independence structure
on the joint distribution. No amount of observational data can distinguish them. The
right target for learning algorithms is therefore not an individual DAG but the entire
**Markov equivalence class** — the set of DAGs that all encode the same (conditional)
independencies. The CPDAG is the canonical, compact representation of this class.

Understanding MECs is prerequisite for reading the PC algorithm
([[PC Algorithm - Overview]]) and GES ([[GES - Greedy Equivalence Search]]), which both
output CPDAGs rather than DAGs.

## Main Content

### Markov condition and faithfulness

> [!definition] Definition: Markov Condition
> A DAG $\mathcal{G}$ over variables $X = (X_1, \ldots, X_d)$ satisfies the **Markov
> condition** for distribution $\mathbb{P}$ if every node $X_i$ is conditionally
> independent of its non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i).$$
> By the Markov factorisation, this implies:
> $$p(x_1,\ldots,x_d) = \prod_{i=1}^{d} p(x_i \mid x_{\text{Pa}(i)}).$$
^def-markov-condition

> [!definition] Definition: Faithfulness
> A distribution $\mathbb{P}$ is **faithful** to $\mathcal{G}$ if every conditional
> independence holding in $\mathbb{P}$ is entailed by the Markov condition on
> $\mathcal{G}$ (d-separation). Faithfulness excludes coincidental cancellations
> of paths — it ensures no "extra" independencies exist beyond what the graph implies.
^def-faithfulness

Under faithfulness, the conditional independencies in the data uniquely determine
which edges exist in the graph (skeleton) and which triples form v-structures.

### Skeleton and v-structures

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $\mathcal{G}$ is the undirected graph obtained by
> ignoring all edge directions. Two nodes are adjacent iff there is a directed
> edge between them in either direction.
^def-skeleton

> [!definition] Definition: V-Structure (Immorality)
> A **v-structure** (or immorality) in a DAG is a triple $X_i \to X_k \leftarrow X_j$
> where $X_i$ and $X_j$ are **not adjacent** (no edge between them).
> The node $X_k$ is a **collider** on the path $X_i - X_k - X_j$.
>
> V-structures are the only triples that make a collider a *dependent* conditioner:
> conditioning on $X_k$ (or its descendants) *opens* the path and induces dependence
> between $X_i$ and $X_j$.
^def-vstructure

### The characterisation theorem

> [!theorem] Theorem: Markov Equivalence Characterisation (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** — they encode
> the same set of conditional independencies via d-separation — if and only if they have:
> 1. the **same skeleton** (same pairs of adjacent nodes), and
> 2. the **same set of v-structures** (same unshielded colliders $X_i \to X_k \leftarrow X_j$
>    with $X_i \not\sim X_j$).
>
> **Proof intuition:** Skeleton encodes marginal independencies (missing edges = 
> independence); v-structures encode which colliders are present. All other triples 
> (chains $X_i \to X_k \to X_j$ and forks $X_i \leftarrow X_k \to X_j$) are Markov
> equivalent to each other because they all make $X_k$ a non-collider, blocking the
> path when conditioned upon.
^thm-markov-equiv

### CPDAGs — the canonical MEC representative

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a MEC $[\mathcal{G}]$ is the unique mixed graph $\mathcal{C}$
> (directed and undirected edges) satisfying:
> - An edge $X_i \to X_j$ appears in $\mathcal{C}$ iff $X_i \to X_j$ in every
>   member of $[\mathcal{G}]$ (the edge direction is **compelled**).
> - An undirected edge $X_i - X_j$ appears in $\mathcal{C}$ iff the edge is
>   present but its direction varies across members of $[\mathcal{G}]$
>   (the edge is **reversible**).
> - $\mathcal{C}$ encodes the skeleton of all members of $[\mathcal{G}]$.
>
> Also called the **essential graph** of $[\mathcal{G}]$.
^def-cpdag

> [!example] Example: A small MEC
> Consider three DAGs on $\{A, B, C\}$:
> - $\mathcal{G}_1$: $A \to B \to C$
> - $\mathcal{G}_2$: $A \leftarrow B \to C$  
> - $\mathcal{G}_3$: $A \to B \leftarrow C$  ← v-structure ($A$ not adjacent to $C$)
>
> $\mathcal{G}_1$ and $\mathcal{G}_2$ have the same skeleton $A - B - C$ and the same
> set of v-structures (none — $B$ is not a collider in either). They are Markov
> equivalent. The CPDAG is $A - B - C$ (both edges reversible).
>
> $\mathcal{G}_3$ has the same skeleton but a v-structure at $B$. It is **not**
> equivalent to $\mathcal{G}_1$/$\mathcal{G}_2$. Its CPDAG is $A \to B \leftarrow C$
> (both edges compelled — the v-structure forces the directions).
^ex-small-mec

### Meek's orientation rules

Meek (1995) identified four deterministic rules that, when exhaustively applied to an
undirected skeleton with marked v-structures, produce the full CPDAG. These rules
orient remaining edges without creating new v-structures or directed cycles.

See [[CPDAG Orientation - V-Structures and Meek Rules]] for the full statement of all
four rules.

> [!theorem] Theorem: Completeness of Meek Rules (Meek 1995)
> Let $\mathcal{G}$ be a DAG and $\mathcal{C}$ its CPDAG. Starting from the skeleton
> of $\mathcal{C}$ with v-structures oriented, applying Meek's four rules exhaustively
> produces exactly $\mathcal{C}$ — no more, no less.
^thm-meek-completeness

### Identifiability limit

> [!note] What observational data cannot determine
> Under the Markov condition and faithfulness, the best any algorithm using purely
> observational (non-interventional) data can do is identify the **CPDAG** of the
> true DAG, not the DAG itself. Reversible edges (those undirected in the CPDAG)
> cannot be oriented without:
> - **Interventional data** — actively intervening on a variable and observing effects
>   (see Hauser & Bühlmann 2012 for GIES)
> - **Functional assumptions** — e.g. linear non-Gaussian noise (LiNGAM), which breaks
>   Markov equivalence by exploiting the noise distribution

## Connections

- **PC algorithm**: outputs the estimated CPDAG by combining skeleton discovery
  (CI tests) with v-structure orientation and Meek rules
  → [[PC Algorithm - Overview]]
- **GES**: operates in the CPDAG space directly, using Insert/Delete operators that
  move between CPDAGs → [[GES - Greedy Equivalence Search]]
- **NOTEARS**: outputs a DAG (not CPDAG), but evaluated against the CPDAG for
  comparison → [[NOTEARS - Overview]]
- **D-separation** in [[Directed Acyclic Graphs]] determines all conditional
  independencies encoded by a DAG — equivalent DAGs have the same d-separations
- **Bayesian networks**: same structure — see [[Spurious Association and Confounds]]
  for the fork/pipe/collider taxonomy that underlies v-structure identification

## See Also
- [[PC Algorithm - Overview]] — algorithm exploiting this characterisation to learn CPDAGs
- [[GES - Greedy Equivalence Search]] — score-based search in CPDAG space
- [[CPDAG Orientation - V-Structures and Meek Rules]] — the four Meek rules
- [[DAG Structure Learning Problem]] — the score-based formulation NOTEARS uses
- [[Directed Acyclic Graphs]] — DAG fundamentals and d-separation
