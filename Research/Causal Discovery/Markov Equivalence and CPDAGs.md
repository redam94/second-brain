---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/spirtes-2000-causation-prediction-search-ref.txt]]"
source_location: "Verma & Pearl (1990); Meek (1995); Spirtes, Glymour & Scheines (2000), Ch. 3"
date_ingested: 2026-10-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Constraint-Based Causal Discovery - Overview]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "essential graph"
  - "completed partially directed acyclic graph"
  - "equivalence class of DAGs"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** iff they encode exactly the same set of conditional
> independence relationships — equivalently, iff they have the same **skeleton** (undirected
> adjacency structure) and the same **unshielded colliders** (v-structures). From observational
> data alone, one can only identify the **Markov equivalence class** of the true DAG, not the
> DAG itself. A **CPDAG** (Completed Partially Directed Acyclic Graph), also called an
> *essential graph*, is the unique graphical representation of an equivalence class: edges common
> to all members of the class are directed; the remaining edges are undirected.

## Overview

When we observe data and run a constraint-based algorithm (like the PC algorithm), we are
recovering the conditional independence (CI) structure of the distribution. This CI structure
determines the causal graph only up to a **Markov equivalence class** — many distinct DAGs may
encode the same set of CI relationships and hence be indistinguishable from observational data.
Understanding what is and isn't identifiable is essential for interpreting structure-learning output.

## Markov Equivalence: the Verma–Pearl Theorem

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ on the same node set are **Markov equivalent**
> (i.e., encode the same CI structure, $\mathcal{I}(\mathcal{G}_1) = \mathcal{I}(\mathcal{G}_2)$)
> if and only if they have:
> 1. The same **skeleton** — the same set of undirected edges $\{i \text{---} j\}$, ignoring
>    edge directions, and
> 2. The same set of **unshielded colliders** — triples $i \to k \leftarrow j$ where $i$ and
>    $j$ are *not* adjacent (no edge $i \text{---} j$).
>
> **Corollary:** DAGs that differ only in the direction of edges that are *not* part of any
> unshielded collider are Markov equivalent — their CI structures are identical.
^thm-verma-pearl

> [!example] Example: Three Markov-equivalent DAGs
> The three DAGs on three nodes $A, B, C$ with skeleton $A - B - C$ and no edge $A - C$:
> $$A \to B \to C, \qquad A \leftarrow B \leftarrow C, \qquad A \leftarrow B \to C$$
> are all Markov equivalent: each has the same skeleton and none has an unshielded collider
> ($B$ is not a collider in any of them). They all imply $A \perp C \mid B$ and no other CI.
>
> But the DAG $A \to B \leftarrow C$ (with the same skeleton $A-B-C$, no edge $A-C$) is
> **not** equivalent to the others: it contains the **unshielded collider** $A \to B \leftarrow C$,
> and its CI structure is just $A \perp C$ (unconditionally), with $A, C$ becoming *dependent*
> when conditioning on $B$ (explaining-away / Berkson's paradox).
^ex-three-dags

## Unshielded Colliders (V-Structures)

> [!definition] Unshielded Collider (V-Structure)
> In a DAG $\mathcal{G}$, an **unshielded collider** (also called **v-structure** or
> **immorality**) is a triple of nodes $(X, Z, Y)$ such that:
> - $X \to Z$ and $Y \to Z$ (both parents point into $Z$), and
> - $X$ and $Y$ are **not adjacent** (no edge between $X$ and $Y$).
>
> V-structures are the only directed structures that are identifiable from observational data
> alone: the orientation $X \to Z \leftarrow Y$ is forced by the CI structure ($Z$ not in
> $\text{Sepset}(X,Y)$) while the undirected skeleton forces only adjacency.
^def-v-structure

V-structures are identifiable because they create a distinctive CI signature: $X \perp Y$ (if no
other path) but $X \not\perp Y \mid Z$ (conditioning on the collider opens the path). This
is "explaining away" or Berkson's paradox — see [[Directed Acyclic Graphs]] for the general
d-separation rules governing colliders.

## The CPDAG (Essential Graph)

Given a Markov equivalence class $[\mathcal{G}]$, its **CPDAG** is the unique mixed graph
(containing both directed and undirected edges) that represents the class compactly.

> [!definition] CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (or *essential graph*) $\mathcal{C}$ of a Markov equivalence class $[\mathcal{G}]$
> is the mixed graph on the same nodes defined by:
> - A **directed edge** $i \to j$ in $\mathcal{C}$ iff $i \to j$ in **every** DAG in $[\mathcal{G}]$
>   (the direction is forced by the CI structure).
> - An **undirected edge** $i \text{---} j$ in $\mathcal{C}$ iff $i \to j$ is in **some** but not
>   all members of $[\mathcal{G}]$ (the direction is unidentifiable from CI alone).
>
> **Key property:** The CPDAG is a DAG with some edges replaced by undirected lines. It is
> *not* itself a DAG — it may contain partially directed cycles, but each consistent completion
> (replacing undirected edges with directed ones) must yield a valid DAG.
^def-cpdag

> [!theorem] Theorem: CPDAG Existence and Uniqueness (Andersson, Madigan & Perlman, 1997)
> Every Markov equivalence class has a unique CPDAG. The directed edges in the CPDAG are
> exactly those that belong to **all** DAGs in the class.
^thm-cpdag-unique

### Which edges are forced?

An edge $X \to Y$ is directed in the CPDAG (forced) iff reversing it ($X \leftarrow Y$) would
either (a) create a new v-structure, or (b) create a cycle. Otherwise the edge is left
undirected.

## Meek Rules: Orienting CPDAG Edges

Starting from the skeleton and the identified v-structures, Meek (1995) showed that four
orientation rules suffice to complete the CPDAG — they propagate consequences of the v-structure
orientations across the graph without introducing new v-structures or cycles.

> [!theorem] Meek Orientation Rules R1–R4 (Meek, 1995)
> Let $\mathcal{H}$ be a PDAG (partially directed acyclic graph). The following rules, applied
> repeatedly until no new orientations are possible, complete the CPDAG:
>
> **R1 (Tail-to-arrow):** If $A \to B \text{---} C$ and $A$ is not adjacent to $C$, orient
> $B \to C$. (Reversing would make $A \to B \leftarrow C$ a new unshielded collider.)
>
> **R2 (Cycle prevention):** If $A \to B \to C$ and $A \text{---} C$, orient $A \to C$.
> (Reversing $A \leftarrow C$ would create a directed cycle $A \to B \to C \leftarrow A$.)
>
> **R3 (Fork disambiguation):** If $D \text{---} A \to C$, $D \text{---} B \to C$, $D \text{---} C$,
> and $A, B$ are not adjacent, orient $D \to C$. (Either completion would create a new v-structure
> unless $D \to C$.)
>
> **R4 (Chain):** If $B \to C \to D$ with $B \text{---} D$, and $A \to C$ with $A \text{---} D$,
> orient $D \to \ldots$ (less commonly triggered in practice).
>
> **Completeness:** Rules R1–R3 (and R4 for the non-Gaussian/latent extensions) exhaustively
> orient all orientable edges in the CPDAG.
^thm-meek-rules

## What Remains Unidentifiable

The undirected edges in the CPDAG represent **observationally equivalent** edge directions.
Without additional assumptions or data, these edges cannot be oriented:

- **Interventional data**: Hard or soft interventions on specific variables break Markov
  equivalences and orient previously undirected edges (Hauser & Bühlmann, 2012).
- **Non-Gaussianity (LiNGAM)**: When noise is non-Gaussian, the full DAG is identifiable
  (Shimizu et al., 2006; Peters, Mooij et al., 2014) — the equivalence class collapses to a
  singleton.
- **Additive noise models (ANM)**: In bivariate settings $Y = f(X) + \varepsilon$, the causal
  direction is often identifiable under non-linearity + Gaussian noise (Peters et al., 2014).

## Connections

- **PC algorithm output**: The [[PC Algorithm]] outputs the CPDAG of the true equivalence class
  in the large-sample limit.
- **GES output**: [[GES - Greedy Equivalence Search]] searches directly over CPDAGs and outputs
  the same equivalence class from the score-based direction.
- **NOTEARS**: [[NOTEARS - Overview]] outputs a (directed) DAG, not a CPDAG — in principle it
  selects one member of the equivalence class, but without faithfulness guarantees about which
  member.
- **Causal identification**: [[Directed Acyclic Graphs]] covers how to *use* a known DAG for
  identification; Markov equivalence marks the boundary of what is *learnable* from data.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that outputs the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm that outputs the CPDAG
- [[Constraint-Based Causal Discovery - Overview]] — the assumptions enabling CPDAG recovery
- [[Directed Acyclic Graphs]] — d-separation rules and the causal interpretation of graphs
- [[Summary Causal DAGs]] — DAG summarization (assumes the DAG is *given*, not learned)
- [[Causal Discovery/_Index|Causal Discovery Index]]
