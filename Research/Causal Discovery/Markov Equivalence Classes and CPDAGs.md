---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Verma & Pearl (1990); Chickering (1995); Meek (1995)"
source_location: "Foundational results in DAG equivalence theory"
date_ingested: 2026-09-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "essential graph"
  - "Markov equivalence"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same conditional
> independence (CI) structure — equivalently, they share the same **skeleton** (undirected
> adjacency graph) and the same **v-structures** (unshielded colliders). The equivalence
> class (MEC) is represented by a unique **CPDAG** (Completed Partially Directed Acyclic
> Graph), also called the essential graph: directed edges in the CPDAG are common to
> every member of the MEC; undirected edges are reversible across members. Structure
> learning algorithms (PC, GES) output CPDAGs rather than individual DAGs because
> observational data alone cannot distinguish members of the same MEC.

## Overview

Observational data generate a joint distribution $\mathbb{P}(X_1,\ldots,X_d)$. Multiple
DAGs can encode the *same* set of CI statements, and they cannot be distinguished from
purely observational data without interventions. The collection of all DAGs encoding
the same CI structure is a **Markov equivalence class (MEC)**. Because the goals of
structure learning — identifying the causal skeleton and the orientable edges — are
limited by this fundamental ambiguity, the natural target for constraint-based and
score-based methods alike is the MEC, represented as a CPDAG.

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same vertex set $V$ are **Markov equivalent**,
> written $G_1 \equiv G_2$, if they encode exactly the same set of conditional
> independencies: for all disjoint $A, B, C \subseteq V$,
> $$G_1 \models (A \perp\!\!\!\perp B \mid C) \iff G_2 \models (A \perp\!\!\!\perp B \mid C),$$
> where the CI statement is read off the DAG via d-separation (see [[Directed Acyclic Graphs]]).
^def-markov-equiv

### Graphical Characterization

The key result that makes equivalence checkable is purely graphical:

> [!theorem] Theorem: Graphical Characterization of MECs (Verma & Pearl 1990; Chickering 1995)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** — the same set of edges ignoring orientation.
> 2. The same **v-structures** (unshielded colliders) — for every triple of nodes
>    $(X, Z, Y)$ with $X-Z-Y$ adjacent but $X$ not adjacent to $Y$, both $G_1$ and $G_2$
>    contain $X \to Z \leftarrow Y$, or neither does.
>
> A **v-structure** $X \to Z \leftarrow Y$ is also called an *unshielded collider* (X, Z, Y);
> the pair $X, Y$ are *non-adjacent* (unshielded) parents of the common effect $Z$.
^thm-mec-char

> [!note] Distinguishability
> Edges in the skeleton that *reverse without creating or destroying v-structures* are
> **Markov equivalent** and cannot be oriented from observational data. Markov equivalence
> is therefore the precise boundary of identifiability for structure learning from
> observational data alone.

### CPDAG: The Canonical Representative

> [!definition] Definition: CPDAG — Completed Partially Directed Acyclic Graph
> The **CPDAG** (also called the **essential graph**) of an MEC is the unique partially
> directed graph $H$ such that:
> - $H$ contains a **directed** edge $X \to Y$ if and only if *every* DAG in the MEC
>   contains $X \to Y$.
> - $H$ contains an **undirected** edge $X - Y$ if and only if the MEC contains both a
>   DAG with $X \to Y$ and a DAG with $X \leftarrow Y$.
> - $H$ is **acyclic** and satisfies the Meek orientation rules.
^def-cpdag

The CPDAG is a **PDAG** (partially directed acyclic graph) — a mixed graph with both
directed and undirected edges — with the additional property that it is *complete*:
every undirected component is a chordal graph (clique tree), ensuring a unique, valid
completion exists.

### Meek Orientation Rules

The Meek rules (Meek 1995) propagate orientations through an undirected skeleton to
produce the CPDAG. They apply after v-structures have been oriented:

> [!definition] Definition: Meek Orientation Rules (Meek 1995)
> Apply repeatedly until no more changes occur:
>
> **R1 — Avoid new v-structure:** If $\alpha \to \beta - \gamma$ and $\alpha$ is not
> adjacent to $\gamma$, orient $\beta \to \gamma$.
> *(Orienting $\gamma \to \beta$ would create a new unshielded collider $\alpha \to \beta \leftarrow \gamma$.)*
>
> **R2 — Avoid directed cycle:** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$,
> orient $\alpha \to \gamma$.
> *(Orienting $\gamma \to \alpha$ would create a directed cycle.)*
>
> **R3 — Avoid cycle/v-structure via two parents:** If $\alpha - \beta \to \gamma$,
> $\alpha - \delta \to \gamma$, $\alpha - \gamma$, and $\beta$ not adjacent to $\delta$,
> orient $\alpha \to \gamma$.
>
> **R4 — Avoid cycle via chain:** If $\alpha - \beta \to \gamma \to \delta$, $\alpha$
> adjacent to $\delta$ but not adjacent to $\gamma$, orient $\alpha \to \delta$.
^def-meek-rules

> [!note] Sufficiency of Meek Rules
> Starting from a skeleton with v-structures oriented, iterative application of R1–R4
> yields the unique CPDAG of the MEC. No other edges can be consistently oriented from
> observational data.

### Size of an MEC

The number of DAGs in one MEC can range from 1 (fully oriented CPDAG, all edges directed)
to $2^{|E|}$ (fully undirected CPDAG). Across all $d$-node graphs, the number of distinct
MECs is much smaller than the $\approx 1.66^{d^2}$ total DAGs, but still exponential.

> [!example] Example: Simple 3-Node MEC
> Consider the DAG $X \to Z \leftarrow Y$ (a v-structure). This DAG is in its own
> equivalence class of size 1: the only Markov-equivalent DAG must have the same skeleton
> $X-Z-Y$ with Z as an unshielded collider, and reversing either arrow would change the
> v-structure, yielding a different MEC.
>
> Contrast with $X \to Z \to Y$ (a chain): the chain $X \to Z \to Y$ is Markov equivalent
> to $X \leftarrow Z \to Y$ (fork) and $X \leftarrow Z \leftarrow Y$ (reverse chain),
> since all three have the same skeleton $X-Z-Y$ and none has a v-structure at $Z$.
> These three DAGs form one MEC, represented by the CPDAG $X - Z - Y$ (both edges
> undirected).

## Connections

- **Identifiability boundary**: Structure learning from observational data identifies
  *at most* the MEC; identifying individual DAGs requires interventions or additional
  assumptions (e.g., non-Gaussianity in LiNGAM, equal noise variances in CAM).
- **PC algorithm**: Outputs the CPDAG of the true MEC by skeleton discovery + v-structure
  orientation + Meek rules — see [[PC Algorithm]].
- **GES**: Searches directly over CPDAGs rather than individual DAGs — see
  [[GES - Greedy Equivalence Search]].
- **NOTEARS**: Returns a single DAG (not a CPDAG) — the MEC is not the output, and
  NOTEARS makes no claim about which MEC member it finds — see [[NOTEARS - Overview]].
- **d-separation and conditional independence**: The MEC is defined via d-separation;
  see [[Directed Acyclic Graphs]] for the d-separation rules.

## See Also
- [[DAG Structure Learning Problem]] — the score-based formulation PC and GES address
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm over CPDAGs
- [[Directed Acyclic Graphs]] — d-separation and the Markov condition
