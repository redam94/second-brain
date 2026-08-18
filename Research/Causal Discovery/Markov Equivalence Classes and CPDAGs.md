---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-ges.bib]]"
source_location: "Chickering (2002), §2–3; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-08-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Causal Markov and Faithfulness]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they share the same **skeleton** (undirected
> structure) and the same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$). The set
> of all Markov-equivalent DAGs forms a **Markov equivalence class (MEC)**, uniquely represented
> by a **CPDAG** (Completed Partially Directed Acyclic Graph): a mixed graph whose directed edges
> are the same in every DAG in the class, and whose undirected edges can be oriented either way.
> MECs are the finest structure identifiable from observational data under faithfulness.

## Overview

Observational data cannot distinguish among DAGs that impose identical conditional independence
constraints on the distribution. Knowing *which* DAGs are interchangeable — and having a single
canonical representative — is essential for:
1. **PC algorithm**: recovers the CPDAG directly from CI tests.
2. **GES**: searches the space of MECs rather than DAGs, visiting each "causal model" once.
3. **Identifiability analysis**: quantifying what structure can/cannot be learned from data.

## Main Content

### V-structures (unshielded colliders)

> [!definition] Definition: V-structure (Verma & Pearl 1990; Spirtes et al. 2000)
> A **v-structure** (also: unshielded collider, immorality) in a DAG $\mathcal{G}$ is a triple
> of nodes $X, Z, Y$ such that:
> 1. $X \to Z$ and $Y \to Z$ (both are parents of $Z$), and
> 2. $X$ and $Y$ are **not adjacent** in $\mathcal{G}$.
>
> The triple $X \to Z \leftarrow Y$ is distinguished from a **shielded collider** (where
> $X$ and $Y$ are also adjacent) by the term "unshielded." Shielded colliders are NOT
> v-structures.
^def-vstructure

V-structures matter because they are the only part of a DAG's structure that is **not** shared
with all Markov-equivalent DAGs. Two DAGs with the same skeleton but different v-structures
encode different conditional independence patterns.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Pearl 1988; Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same node set $\mathbf{V}$ are
> **Markov equivalent** (written $\mathcal{G}_1 \sim \mathcal{G}_2$) if they impose exactly
> the same set of conditional independence (CI) statements on every joint distribution that
> satisfies the Causal Markov Condition with respect to either graph:
> $$\mathcal{G}_1 \sim \mathcal{G}_2 \iff \forall X, Y, \mathbf{Z}: \; X \perp_{\mathcal{G}_1} Y \mid \mathbf{Z} \iff X \perp_{\mathcal{G}_2} Y \mid \mathbf{Z}.$$
^def-equivalence

> [!theorem] Theorem: Verma-Pearl Characterization of Markov Equivalence (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are Markov equivalent if and only if they
> have the same **skeleton** (the same undirected edges, ignoring orientation) and the same
> set of **v-structures** (unshielded colliders).
>
> **Significance:** This gives a purely graphical, easily checkable criterion for equivalence —
> no distributional comparison needed. The skeleton and v-structures together determine the MEC.
^thm-verma-pearl

### Markov Equivalence Classes (MECs)

> [!definition] Definition: Markov Equivalence Class
> The **Markov equivalence class** $[\mathcal{G}]$ of a DAG $\mathcal{G}$ is the set of all
> DAGs Markov equivalent to $\mathcal{G}$:
> $$[\mathcal{G}] = \{ \mathcal{H} : \mathcal{H} \sim \mathcal{G} \}.$$
> The MECs partition the space of all DAGs on $d$ nodes into groups that are statistically
> indistinguishable from observational data alone.
^def-mec

The size of a MEC varies: a complete DAG (with all possible edges, forming a total order) has
a singleton MEC. A totally disconnected DAG (no edges) also has a singleton MEC. In between,
MECs can be large — for 5 nodes, some MECs contain hundreds of equivalent DAGs.

### CPDAGs (Essential Graphs)

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (also: **essential graph**) of a MEC $[\mathcal{G}]$ is the unique mixed graph
> $\mathcal{C}$ over $\mathbf{V}$ satisfying:
> 1. $\mathcal{C}$ contains a **directed edge** $X \to Y$ iff $X \to Y$ in *every* DAG in $[\mathcal{G}]$.
> 2. $\mathcal{C}$ contains an **undirected edge** $X - Y$ iff $X \to Y$ in *some* but not all
>    DAGs in $[\mathcal{G}]$ (i.e., the orientation is not determined by the MEC).
> 3. Every DAG consistent with $\mathcal{C}$ belongs to $[\mathcal{G}]$.
>
> The CPDAG is the canonical representative of the MEC.
^def-cpdag

> [!note] Constructing the CPDAG from a DAG
> Given a DAG $\mathcal{G}$:
> 1. Find all v-structures — these produce forced directed edges in $\mathcal{C}$.
> 2. Apply **Meek's orientation rules** (R1–R4, see [[PC Algorithm - Phases]]) exhaustively to
>    propagate orientations forced by the v-structures.
> 3. Any remaining edges are undirected in $\mathcal{C}$.
>
> Alternatively, Dor & Tarsi (1992) give a direct algorithm for computing the essential graph.

> [!example] Example: Two equivalent DAGs and their CPDAG
> Consider three variables $\{X, Y, Z\}$ with true DAG $X \to Y \to Z$ (a chain).
> This DAG is Markov equivalent to $X \leftarrow Y \leftarrow Z$ and $X \leftarrow Y \to Z$.
> (All three have the same skeleton $X - Y - Z$ and no v-structures.)
>
> The CPDAG is the fully undirected graph $X - Y - Z$ — no edge direction is identified.
>
> **Contrast:** If the true DAG were $X \to Y \leftarrow Z$ (v-structure at $Y$), then
> the CPDAG has **directed** edges $X \to Y \leftarrow Z$ (both arrows are forced), and
> the MEC is a singleton (only one DAG consistent with this CPDAG).

### Identifiability of CPDAGs

The CPDAG is the finest causal structure identifiable from observational data under the
[[Causal Markov and Faithfulness|Faithfulness assumption]]. Points to note:

1. **Directed edges in the CPDAG are causally identified**: $X \to Y$ in the CPDAG means
   every faithful model of the data has this causal direction.
2. **Undirected edges are *not* identified**: $X - Y$ in the CPDAG means the data is
   compatible with $X \to Y$ or $X \leftarrow Y$ — external knowledge (interventions,
   domain expertise) is needed to orient them.
3. **Breaking the tie**: additional assumptions such as equal error variances (Peters & Mooij 2014),
   linear non-Gaussian errors (LiNGAM, Shimizu et al. 2006), or known temporal ordering
   can identify a unique DAG within the MEC.

### The Space of CPDAGs

[[GES - Greedy Equivalence Search]] operates directly in the space of MECs (represented as
CPDAGs). A key property enabling GES is that this space has a **partially ordered** structure
amenable to greedy search:

> [!theorem] Theorem: Meek's Conjecture (proved in Chickering 2002, Theorem 15)
> If $\mathcal{H}$ is an I-map (independence map) of $\mathcal{G}$ — meaning every independence
> in $\mathcal{G}$ is also in $\mathcal{H}$ — then there exists a finite sequence of:
> - single edge additions, and
> - **covered edge reversals** ($X \to Y$ where $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$),
>
> that transforms $\mathcal{G}$ into $\mathcal{H}$, with $\mathcal{H}$ remaining an I-map
> after each step.
>
> **Consequence for GES:** The forward phase of GES (which only adds edges, never reverses them)
> can reach the true MEC from the empty graph via a sequence of single-edge insertions. This
> is what makes the greedy forward search provably complete.
^thm-meek-conjecture

## Connections

- **PC algorithm** recovers the CPDAG via CI tests + v-structure detection + Meek rules.
  See [[PC Algorithm - Overview]] and [[PC Algorithm - Phases]].
- **GES** searches the CPDAG space using score-based greedy operators.
  See [[GES - Greedy Equivalence Search]].
- **Causal identification**: CPDAGs with many directed edges allow more causal claims;
  undirected edges are the "unidentified" parts. See [[Causal Estimands]] for how this
  affects downstream inference.
- **Contrast with NOTEARS**: [[NOTEARS - Overview]] recovers a single DAG (a point in the
  MEC) rather than the full CPDAG — identifying the MEC requires additional post-processing.

## See Also
- [[Causal Markov and Faithfulness]] — the assumptions under which MECs are identifiable
- [[PC Algorithm - Overview]] — constraint-based recovery of the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based search over the MEC space
- [[Directed Acyclic Graphs]] — d-separation and the graphical foundations
- [[DAG Structure Learning Problem]] — the formal setup and score functions
