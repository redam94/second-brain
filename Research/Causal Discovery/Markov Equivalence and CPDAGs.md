---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Synthesis-Survey.md]]"
source_location: "Part I, §1.1–1.3"
date_ingested: 2026-07-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "Verma-Pearl equivalence"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** iff they share the same skeleton and same v-structures
> (Verma & Pearl, 1990). Observational data alone cannot distinguish between equivalent DAGs —
> they encode identical conditional independence relationships. The unique canonical
> representative of each equivalence class is the **CPDAG** (Completed Partially Directed
> Acyclic Graph): directed edges hold in all equivalent DAGs; undirected edges admit either
> direction. Both the [[PC Algorithm - Overview|PC algorithm]] and
> [[GES - Greedy Equivalence Search|GES]] output CPDAGs; recovering a unique DAG requires
> additional assumptions (interventions, non-Gaussianity, or temporal ordering).

## Overview

A fundamental limit of observational causal discovery is that the data distribution $P$
is generally **compatible with many DAGs simultaneously** — specifically, with an entire
equivalence class. The PC and GES algorithms therefore target the coarsest object
identifiable from observational data: the **Markov equivalence class**, represented as a
CPDAG. Understanding this object is essential for interpreting any constraint-based or
score-based causal discovery result.

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G$ and $H$ over the same node set $V$ are **Markov equivalent** if and only if:
> 1. They have the **same skeleton**: $(X, Y)$ is an edge in $G$ iff it is an edge in $H$
>    (ignoring directions).
> 2. They have the **same v-structures**: $X \to Z \gets Y$ is present in $G$ with $X, Y$
>    not adjacent iff the same v-structure is present in $H$.
>
> Equivalently: $G$ and $H$ encode the same set of **d-separation** relations, which by
> the Markov condition translate to the same conditional independence (CI) constraints
> in any faithful distribution.
^def-markov-equiv

**Why this is the identifiability limit.** If we observe any distribution $P$ faithful to
$G$, that same distribution is also faithful to every $H$ in the same equivalence class.
No amount of i.i.d. observational data can distinguish $G$ from $H$.

> [!example] Example: A Three-Node Chain
> The three DAGs:
>
> $$X \to Y \to Z \qquad X \gets Y \to Z \qquad X \gets Y \gets Z$$
>
> share the skeleton $X - Y - Z$ and have no v-structures. They are **Markov equivalent**.
> Each encodes the single CI statement $X \perp\!\!\!\perp Z \mid Y$.
>
> In contrast, $X \to Y \gets Z$ (with $X, Z$ non-adjacent) is **NOT** equivalent to the
> above: it introduces the v-structure $X \to Y \gets Z$, encoding the CI statement
> $X \perp\!\!\!\perp Z$ (marginal independence) but **not** $X \perp\!\!\!\perp Z \mid Y$
> (conditioning on $Y$ creates dependence via the collider).

### CPDAGs: Canonical Representatives

> [!definition] Definition: CPDAG (Andersson, Madigan & Perlman, 1997)
> The **Completed Partially Directed Acyclic Graph (CPDAG)** $\mathcal{C}(G)$ is the unique
> graph representing the Markov equivalence class of a DAG $G$. It has:
> - **Directed edge** $X \to Y$: this direction holds in **all** DAGs in the equivalence class.
> - **Undirected edge** $X - Y$: both $X \to Y$ and $X \gets Y$ appear in some member of
>   the class.
>
> A CPDAG is characterised by:
> 1. It is a **chain graph with no flags**: a partially directed graph with no directed cycles.
> 2. Every directed edge in $\mathcal{C}(G)$ is present and in the same direction in every DAG
>    in the equivalence class.
> 3. Every undirected edge $X - Y$ in $\mathcal{C}(G)$ admits a consistent DAG extension with
>    $X \to Y$ and another with $X \gets Y$.
^def-cpdag

### Meek's Orientation Rules

Given a skeleton and a set of v-structures, the CPDAG is completed by applying Meek's
four rules (Meek, 1995) until no further edges can be oriented:

> [!definition] Definition: Meek's Orientation Rules (Meek, 1995)
> - **R1 (Acyclicity / Non-collider):** $Z \to X - Y$ and $Z \not\sim Y$ ⟹ orient $X \to Y$.
>   *(Otherwise $Y \to X$ creates a new collider at $X$.)*
> - **R2 (Acyclicity cycle prevention):** $X \to Z \to Y$ and $X - Y$ ⟹ orient $X \to Y$.
>   *(Otherwise $Y \to X$ forms a directed cycle $X \to Z \to Y \to X$.)*
> - **R3 (Disambiguation):** $X - Z \to Y$, $X - W \to Y$, $X - Y$, $Z \not\sim W$
>   ⟹ orient $X \to Y$.
> - **R4 (Chordal completion):** $X - Z \to W \gets Y$, $X - W$, $X \sim Z$, $Y \not\sim Z$
>   ⟹ orient $X \to W$.
>
> Applied exhaustively, these rules maximally orient edges without introducing new
> v-structures or directed cycles. The result is the unique CPDAG.
^def-meek-rules

### Size and Structure of Equivalence Classes

The Markov equivalence class can range in size from 1 to exponentially many DAGs:

| Skeleton structure | # DAGs in class | Notes |
|--------------------|----------------|-------|
| No edges (empty graph) | 1 | Only one DAG with no edges |
| Single edge $X - Y$ | 2 | $X \to Y$ or $X \gets Y$ |
| $d$-node chain $X_1 - X_2 - \cdots - X_d$ | $d$ | One per direction of chain |
| Complete graph $K_d$ | Up to $d!/2^d$ (roughly) | Highly non-unique |

In practice, most real-world sparse graphs have moderate-sized equivalence classes where
many edges are determined (directed in the CPDAG) and some are undirected.

## Connections

- **Observational identifiability limit.** The CPDAG is the most that can be identified
  from i.i.d. observations under faithfulness. To fully identify a DAG, one needs
  additional information: **interventional data** (Pearl 2000; Hauser & Bühlmann 2012),
  **non-Gaussianity** (the LiNGAM approach; Shimizu et al. 2006), or **functional
  restrictions** (additive noise models; Peters et al. 2014).
- **Connects PC and GES.** Both algorithms target the CPDAG — PC by using CI tests and
  Meek's rules, GES by searching over CPDAG space with a score. See
  [[PC Algorithm - Overview]] and [[GES - Greedy Equivalence Search]].
- **Relates to DAG reasoning.** The d-separation semantics of CPDAGs are inherited
  from [[Directed Acyclic Graphs]] — every directed path, fork, and collider analysis
  applies to the directed edges of a CPDAG. Undirected edges are agnostic.
- **Connects to NOTEARS output.** [[NOTEARS - Overview]] outputs a fully directed DAG
  (the entire weighted adjacency matrix $W$ is oriented), not a CPDAG. The NOTEARS
  solution is a specific DAG representative of an equivalence class, not the class itself.
  Its empirical choice among equivalent DAGs is driven by the LS score landscape.

## See Also
- [[DAG Structure Learning Problem]] — score-based formulation NOTEARS builds on
- [[PC Algorithm - Overview]] — constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm over CPDAG space
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, back-door criterion)
- [[Causal Discovery/_Index|Causal Discovery Index]]
