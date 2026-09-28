---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes00-CPS-source.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 3; Chickering (2002), §2"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[PC Algorithm - V-Structures and Meek Rules]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode identical conditional independence
> relations — meaning no observational data can distinguish them. The Verma–Pearl theorem
> gives a simple graphical criterion: same skeleton + same v-structures. The equivalence
> class is uniquely represented by a **CPDAG** (Completed Partially Directed Acyclic Graph),
> which directs exactly those edges that are shared across all member DAGs. Both the
> [[PC Algorithm - Overview|PC algorithm]] and [[GES - Greedy Equivalence Search|GES]]
> target the CPDAG as their output rather than a single DAG.

## Overview

Learning a DAG from observational (non-interventional) data faces a fundamental limit:
many DAGs imply exactly the same probability distribution. For example, the three DAGs

$$
X \to Y \to Z, \quad X \leftarrow Y \leftarrow Z, \quad X \leftarrow Y \to Z
$$

all encode $X \perp\!\!\!\perp Z \mid Y$ and no other non-trivial independence — they are
**Markov equivalent**. No matter how much data we collect from a faithful distribution
over any of these DAGs, we cannot statistically distinguish them. Identification of a
unique DAG requires either **interventional data** (do-calculus), **extra constraints**
(acyclicity + linearity + non-Gaussianity for LiNGAM), or **background knowledge**.

Structure-learning algorithms must therefore target the *equivalence class* rather than
a single DAG. The CPDAG is the canonical representation of that class.

## Main Content

### The Markov Property and Faithfulness

> [!definition] Definition: Global Markov Property
> A DAG $G$ over variables $V$ and a joint distribution $P$ satisfy the **global Markov
> property** if: for any three disjoint sets $A, B, C \subseteq V$, whenever $C$
> d-separates $A$ from $B$ in $G$, we have $A \perp\!\!\!\perp B \mid C$ in $P$.

> [!definition] Definition: Faithfulness
> $P$ is **faithful** to $G$ if the converse also holds: every conditional independence
> in $P$ is entailed by a d-separation in $G$. Faithfulness rules out
> *accidental cancellations* where paths cancel each other's effects.

Faithfulness is a generic condition (it holds for Lebesgue-almost-all parameters given
a DAG), but can fail for specific parametrizations (e.g., $X \to Y \to Z$ with $X \to Z$
where the direct and indirect effects exactly cancel).

### The Verma–Pearl Theorem

> [!theorem] Theorem: Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if and only if they have:
> 1. The **same skeleton** (same set of undirected adjacencies), and
> 2. The **same v-structures** (immoralities): every triple $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are non-adjacent appears in both or neither.
>
> **Significance:** Skeleton + v-structures fully determine the equivalence class.
> Anything beyond v-structures cannot be identified from observational data alone.

^thm-markov-equiv

This theorem has two implications:
- **Lower bound on identifiability**: all edge directions except those forced by v-structures
  are inherently unidentifiable from i.i.d. observational data.
- **Algorithm target**: any algorithm that recovers the correct skeleton + v-structures
  has done as well as possible from observational data.

### CPDAG (Essential Graph)

> [!definition] Definition: CPDAG
> The **Completed Partially Directed Acyclic Graph** (CPDAG) for a Markov equivalence
> class $[G]$ is the unique mixed graph (containing both directed and undirected edges)
> such that:
> - **Directed edge** $X \to Y$: $X \to Y$ appears in *every* member of $[G]$.
> - **Undirected edge** $X - Y$: both $X \to Y$ and $X \leftarrow Y$ appear in some
>   members of $[G]$.

A CPDAG is also called an **essential graph** (Andersson, Madigan & Perlman, 1997).
It is the maximally informative summary of what observational data can tell us about
causal directions.

> [!example] Example: Three-node equivalence class
> For the three-node chain $X - Y - Z$ (no v-structure at $Y$), the CPDAG has all edges
> undirected: $X - Y - Z$. The equivalence class contains three DAGs:
> $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, and $X \leftarrow Y \to Z$.
>
> By contrast, if the skeleton is $X - Y - Z$ but with $X$ and $Z$ also adjacent
> ($X - Y - Z$ forming a triangle), there is no v-structure and all three edges can
> be directed in either way consistent with acyclicity — again a large equivalence class.
>
> If instead $X - Z \leftarrow Y$ with $X$ and $Y$ non-adjacent, the v-structure
> $X \to Z \leftarrow Y$ is **identified**: this direction appears in the CPDAG.

### Counting and Complexity

The number of DAGs grows super-exponentially: $\sim 2^{\binom{d}{2}}$ graphs on $d$
nodes, each encoding a different structure. The number of Markov equivalence classes
(CPDAGs) is smaller but still exponential. This is why structure learning is NP-hard
in general (see [[DAG Structure Learning Problem]]).

## Connections

- **PC algorithm**: recovers the CPDAG by testing conditional independences in data
  — see [[PC Algorithm - Overview]].
- **GES**: searches directly over CPDAG space using a decomposable score
  — see [[GES - Greedy Equivalence Search]].
- **NOTEARS**: recovers individual DAGs (not CPDAGs) from continuous optimization
  — see [[NOTEARS - Overview]].
- **LiNGAM**: exploits non-Gaussianity to identify a single DAG, going beyond the
  equivalence class — contrasts with the purely observational setting here.
- **Interventional data**: do-calculus can identify edges beyond the equivalence
  class when experiments are available.

## See Also
- [[DAG Structure Learning Problem]] — the NP-hard combinatorial framing of structure learning
- [[Directed Acyclic Graphs]] — d-separation, Markov condition, back-door criterion
- [[PC Algorithm - Overview]] — constraint-based algorithm targeting the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm targeting the CPDAG
- [[PC Algorithm - V-Structures and Meek Rules]] — how to complete the CPDAG from skeleton + v-structures
