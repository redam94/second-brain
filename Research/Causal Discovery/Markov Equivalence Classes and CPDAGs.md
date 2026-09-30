---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Verma & Pearl (1990); Chickering (1995, 2002) — PDFs not cached (proxy restriction; Chickering 2002 freely available at jmlr.org/papers/v3/chickering02b.html)"
source_location: "Verma & Pearl (1990) §3; Chickering (1995) §2–3; Chickering (2002) §2"
date_ingested: 2026-09-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional
> independence structure. The Verma-Pearl theorem characterizes equivalence
> graphically: same **skeleton** (undirected edge set) and same **v-structures**
> (unshielded colliders). Each equivalence class is uniquely represented by a
> **CPDAG** (Completed Partially Directed Acyclic Graph), also called the
> **essential graph**. Both the PC algorithm and GES return CPDAGs — from
> observational data alone, this is the finest resolution identifiable under
> faithfulness.

## Overview

Causal structure learning from observational data faces a fundamental constraint:
multiple DAGs can encode the same set of conditional independencies and thus be
statistically indistinguishable. The set of all such DAGs is the **Markov equivalence class**
(MEC). Understanding MECs is prerequisite to understanding what any consistent
structure-learning algorithm returns, and why no algorithm can do better without
additional assumptions.

## Main Content

### Markov equivalence: definition

> [!definition] Definition: Markov Equivalence
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ over the same vertex set $\mathsf{V}$
> are **Markov equivalent** (written $\mathsf{G}_1 \sim \mathsf{G}_2$) if for every
> triple $(X_i, X_j, \mathbf{S})$ with $X_i, X_j \in \mathsf{V}$ and
> $\mathbf{S} \subseteq \mathsf{V} \setminus \{X_i, X_j\}$:
> $$X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \text{ in } \mathsf{G}_1 \quad\Longleftrightarrow\quad X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \text{ in } \mathsf{G}_2.$$
> That is, they entail identical conditional independence (CI) relations via d-separation.
^def-markov-equivalence

The Markov equivalence relation partitions the set of DAGs on $d$ nodes into
**Markov equivalence classes**. Each class is a set of DAGs that share the same
skeleton and v-structures.

### The Verma-Pearl characterization

The key result that makes MECs computationally tractable is that Markov equivalence
can be read off the graph structure without enumerating all conditional independencies:

> [!theorem] Theorem: Verma-Pearl Characterization (Verma & Pearl 1990)
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ are Markov equivalent if and only if
> they have the same **skeleton** (same undirected edges) and the same
> **v-structures** (unshielded colliders).
>
> A **v-structure** is a triple $X \to Z \leftarrow Y$ where $X$ and $Y$ are
> non-adjacent (no edge between $X$ and $Y$). Such a triple is also called an
> **unshielded collider**.
^thm-verma-pearl

> [!note] Consequence
> Reversing an edge $A \to B$ to $A \leftarrow B$ preserves Markov equivalence if
> and only if (i) $A$ and $B$ have no common neighbors, or (ii) every common neighbor
> is adjacent to both $A$ and $B$ (shielded). Reversals that create or destroy
> unshielded colliders always change the equivalence class.

### CPDAG: the canonical representative

Each MEC has a unique canonical graphical representative called the
**CPDAG** (Completed Partially Directed Acyclic Graph), sometimes also called
the **essential graph** (Andersson, Madigan & Perlman, 1997).

> [!definition] Definition: CPDAG (Essential Graph)
> The **CPDAG** $\mathcal{C}(\mathsf{G})$ of a DAG $\mathsf{G}$ is the unique
> partially directed graph over the same vertex set satisfying:
>
> - **Directed edge** $A \to B \in \mathcal{C}(\mathsf{G})$: every DAG in the MEC
>   contains the edge $A \to B$ (the orientation is *compelled*).
> - **Undirected edge** $A - B \in \mathcal{C}(\mathsf{G})$: some DAGs in the MEC
>   contain $A \to B$ and others $A \leftarrow B$ (the orientation is *reversible*).
>
> The skeleton of $\mathcal{C}(\mathsf{G})$ equals the skeleton of $\mathsf{G}$.
^def-cpdag

> [!example] Example: CPDAG with both directed and undirected edges
> Consider three variables $(X_1, X_2, X_3)$ and DAG $X_1 \to X_2 \to X_3$.
> Its MEC also contains $X_1 \leftarrow X_2 \leftarrow X_3$ and $X_1 \leftarrow X_2 \to X_3$,
> since none of these create or destroy v-structures. The CPDAG is
> $X_1 - X_2 - X_3$ (fully undirected chain) — no orientation is compelled.
>
> Contrast with $X_1 \to X_2 \leftarrow X_3$ (unshielded collider at $X_2$, with $X_1 - X_3$
> absent). This is its own equivalence class (singleton), so its CPDAG is
> $X_1 \to X_2 \leftarrow X_3$ (fully directed) — both orientations are compelled.
^ex-cpdag

### Characterizing compelled edges: Chickering's rules

Chickering (1995) proved that the compelled edges in the CPDAG can be determined by
a set of orientation rules. The key insight:

> [!theorem] Theorem: Compelled-Edge Characterization (Chickering 1995)
> An edge $X \to Y$ in a DAG $\mathsf{G}$ is **compelled** (i.e., $X \to Y$ appears
> in the CPDAG $\mathcal{C}(\mathsf{G})$ as a directed edge) if and only if there
> exists a path into $X$ from some vertex $Z$ such that $Z$ is not adjacent to $Y$.
> Equivalently: $X \to Y$ is compelled whenever reversing it would create or destroy
> a v-structure.
^thm-compelled-edges

In practice, CPDAGs are computed from a DAG by:
1. Starting with the skeleton.
2. Inserting directed edges for all v-structures.
3. Applying **Meek's orientation rules** (R1–R4) until no further orientations can be inferred
   (see [[PC Algorithm]] for the rules).

### Scale of MECs

The number of DAGs in a MEC can vary widely:
- **Singleton MECs** (DAGs with no reversible edges): DAGs that are their own CPDAG,
  e.g., complete DAGs (every ordering gives a different v-structure pattern).
- **Large MECs**: DAGs with many reversible edges, e.g., a chain $X_1 \to X_2 \to \cdots \to X_d$
  whose MEC contains $2^{d-1}$ DAGs (any orientation of the chain edges is equivalent).

### Identifiability: what observational data can and cannot recover

> [!theorem] Theorem: Observational Identifiability (under Markov + Faithfulness)
> Let $\mathbb{P}$ be a distribution faithful to DAG $\mathsf{G}^*$.
> From i.i.d. data from $\mathbb{P}$, the finest identifiable object is the
> MEC of $\mathsf{G}^*$ (equivalently, its CPDAG $\mathcal{C}(\mathsf{G}^*)$).
> The individual DAG $\mathsf{G}^*$ is not identifiable from observational data
> alone without additional assumptions.
^thm-obs-identifiability

**Breaking the identifiability ceiling** — additional assumptions that allow full DAG recovery:

| Assumption | Method | Reference |
|------------|--------|-----------|
| Non-Gaussian additive noise | LiNGAM | Shimizu et al. (2006) |
| Equal error variances, linear Gaussian | Peters & Bühlmann (2014) | — |
| Non-linear additive noise (ANM) | ANM / RESIT | Hoyer et al. (2009) |
| Interventional data | UT-IGSP, DCDI | Hauser & Bühlmann (2012) |

## Connections

- **[[PC Algorithm]]**: returns the CPDAG of the true MEC via constraint-based search.
- **[[GES Algorithm]]**: searches the space of CPDAGs directly, scoring each by BIC.
- **[[NOTEARS - Overview]]**: returns a weighted DAG matrix $W$, not a CPDAG; orientation is
  implicit in edge weights. Unlike PC/GES, NOTEARS does not explicitly operate in MEC space.
- **[[Directed Acyclic Graphs]]**: d-separation, which defines Markov equivalence.
- **[[Bayesian Networks: Foundational Methodology]]** (gap #21): Bayesian network inference
  is done on a specific DAG; structure learning provides that DAG (or CPDAG) as input.

## See Also
- [[PC Algorithm]] — returns a CPDAG using CI tests
- [[GES Algorithm]] — searches CPDAGs using a score
- [[Causal Structure Learning - Overview]] — three paradigms and identifiability summary
- [[Directed Acyclic Graphs]] — d-separation, the foundation of Markov equivalence
- [[DAG Structure Learning Problem]] — score-based problem formulation
