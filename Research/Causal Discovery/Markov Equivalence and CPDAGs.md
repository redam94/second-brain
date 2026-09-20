---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-pc-algorithm.txt]]"
source_location: "Kalisch & Bühlmann (2007) §2; Chickering (2002) §2"
date_ingested: 2026-09-20
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
  - "Essential graph"
  - "Markov equivalence class"
  - "Completed partially directed acyclic graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs encode exactly the same conditional independence (CI) structure — and
> are therefore indistinguishable from observational i.i.d. data — if and only if
> they share the same **skeleton** (undirected edge set) and the same **v-structures**
> (unshielded colliders). The set of all DAGs satisfying these conditions is the
> **Markov equivalence class**. Every such class has a unique graphical representative
> called the **CPDAG** (Completed Partially Directed Acyclic Graph), or *essential
> graph*, in which directed edges are those common to all members of the class and
> undirected edges are those that differ. This is the best any constraint-based or
> score-based causal discovery algorithm can recover from observational data alone.

## Overview

A central limitation of observational causal discovery is that the data cannot
identify a unique DAG: many DAGs encode the same probability distribution. The
concept of Markov equivalence formalises exactly which DAGs are observationally
indistinguishable, and the CPDAG is the canonical representation of the equivalence
class. Understanding CPDAGs is essential for interpreting the output of both the
[[PC Algorithm]] (which outputs a CPDAG) and the [[Greedy Equivalence Search]]
(which searches the space of CPDAGs directly).

## Main Content

### Markov Property and I-Maps

> [!definition] Definition: Markov Property (Global)
> A DAG $G = (\mathsf{V}, \mathsf{E})$ and distribution $\mathbb{P}$ satisfy the
> **global Markov property** if, for all disjoint sets $A, B, C \subseteq \mathsf{V}$,
> $$A \perp_G B \mid C \quad\Longrightarrow\quad A \perp_{\mathbb{P}} B \mid C,$$
> where $A \perp_G B \mid C$ denotes $d$-separation of $A$ from $B$ given $C$ in $G$.
> Equivalently, the factorisation $p(x) = \prod_j p(x_j \mid x_{\mathrm{pa}_j})$ holds.
^def-markov

$G$ is an **I-map** of $\mathbb{P}$ when every CI implied by $d$-separation in $G$
also holds in $\mathbb{P}$. $G$ is a **perfect map** (or **faithful graph**) of $\mathbb{P}$
when the CI relations in $G$ and $\mathbb{P}$ coincide exactly.

### Characterisation of Markov Equivalence

> [!theorem] Theorem: Verma–Pearl Characterisation (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** — they encode the same set of
> conditional independencies — if and only if they satisfy both:
> 1. **Same skeleton**: $G_1$ and $G_2$ have the same set of undirected edges (ignoring
>    orientation).
> 2. **Same v-structures**: every **unshielded collider** $X \to Z \leftarrow Y$ (where
>    $X$ and $Y$ are *non-adjacent*) is present in both or absent from both.
>
> A **v-structure** (also called an *unshielded collider* or *immorality*) is a triple
> of nodes $X, Z, Y$ such that $X \to Z$, $Z \leftarrow Y$, and $X \not\!\!\!—\!\!— Y$.
^thm-verma-pearl

This theorem is the foundation of all observational causal discovery: the skeleton
and v-structures are the *identifiable* part of the DAG. All remaining edge
orientations are undetermined without additional assumptions (interventions,
non-Gaussianity, equal error variances, etc.).

### The CPDAG

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (Completed Partially Directed Acyclic Graph) of a DAG $G$, written
> $\text{CPDAG}(G)$, is the unique mixed graph on the same vertex set satisfying:
> - **Directed edge** $X \to Y$: $X \to Y$ in *every* DAG in the equivalence class
>   (the orientation is **compelled** — it appears in all members).
> - **Undirected edge** $X - Y$: there exist DAGs in the class with $X \to Y$ and
>   others with $X \leftarrow Y$ (the orientation is **reversible**).
>
> The CPDAG is also called the **essential graph** of the equivalence class.
^def-cpdag

Equivalently, an edge is directed in the CPDAG if and only if reversing it would
either (i) create a new v-structure, or (ii) create a directed cycle.

> [!example] Example: 3-Node Equivalence Class
> Consider three variables $X, Y, Z$ with the DAG $X \to Y \to Z$ (a pipe / chain).
> - Skeleton: $X \!-\! Y \!-\! Z$, no $X$–$Z$ edge.
> - V-structures: none (the collider would require $X \to Y \leftarrow Z$, but here
>   the chain runs in one direction and $X$–$Z$ are not adjacent, so $Y$ is *not* a
>   collider in the $X \to Y \to Z$ orientation).
>
> The equivalence class also contains $X \leftarrow Y \to Z$ (fork) and $X \leftarrow
> Y \leftarrow Z$ (reverse chain). All three encode the same CI: $X \perp Z \mid Y$.
> The CPDAG is $X - Y - Z$ (all undirected) because no orientation is compelled.
>
> In contrast, the DAG $X \to Y \leftarrow Z$ with $X \not\!\!\!—\!\!\!— Z$ is in
> *its own* equivalence class (the v-structure $X \to Y \leftarrow Z$ distinguishes it).
> Its CPDAG has $X \to Y \leftarrow Z$ (both edges directed — orientations are compelled).
^ex-3node

### Faithfulness Assumption

> [!definition] Definition: Faithfulness (Stability)
> A distribution $\mathbb{P}$ is **faithful** to a DAG $G$ if every CI relation in
> $\mathbb{P}$ is also entailed by $d$-separation in $G$. That is, $G$ is both an
> I-map *and* a minimal I-map of $\mathbb{P}$.
> $$A \perp_{\mathbb{P}} B \mid C \quad\Longrightarrow\quad A \perp_G B \mid C.$$
^def-faithfulness

Faithfulness is the key assumption that makes observational causal discovery
possible. Under faithfulness, the distribution has a *unique* perfect map (up to
Markov equivalence), so the skeleton and v-structures are identifiable from data.
Faithfulness can fail due to exact parameter cancellations (e.g., two paths of
equal magnitude with opposite signs), but such cancellations form a set of measure
zero in the parameter space.

### Meek Rules for CPDAG Completion

Given a skeleton and v-structures, **Meek's orientation rules** (Meek, 1995) derive
all compelled edge orientations by propagation. The four rules are:

> [!theorem] Meek's Orientation Rules
> Let $G'$ be a PDAG (partially directed acyclic graph) consistent with a set of
> v-structures. Apply the following rules exhaustively until no more apply:
>
> - **R1** (Acyclicity): $A \to B - C$ with $A$ not adjacent to $C$ → orient $B \to C$
>   (otherwise $A \to B \leftarrow C$ would be a new v-structure, or $C \to B \to A$
>   creates a cycle).
> - **R2** (Cycle avoidance): $A \to B \to C$ and $A - C$ → orient $A \to C$
>   (otherwise $C \to A$ creates a cycle with $A \to B \to C$).
> - **R3** (V-structure avoidance): $A - B$, $A - C$, $B \to D$, $C \to D$, and $B$
>   not adjacent to $C$ → orient $A \to D$.
> - **R4**: $A - B$, $A - C$, $B \to C \to D$, and $B$ not adjacent to $D$ → orient
>   $A \to B$.
>
> Meek (1995) proved this set of rules is *complete*: any PDAG with the same
> skeleton and v-structures as a DAG reaches the CPDAG after exhaustive application.
^thm-meek-rules

## Identifiability Under Different Assumptions

| Information | Identifiable structure |
|------------|----------------------|
| Observational data only | CPDAG (skeleton + v-structures) |
| + Non-Gaussianity (LiNGAM) | Full DAG (orientation) |
| + Equal error variances | Full DAG |
| + Interventional data | Partial orientation beyond CPDAG |
| + Faithfulness + known ordering | Full DAG |

## Connections

- **PC algorithm** outputs the CPDAG of the true DAG's equivalence class: see [[PC Algorithm]].
- **GES** searches the CPDAG space directly, guided by a decomposable score: see
  [[Greedy Equivalence Search]].
- **NOTEARS** ([[NOTEARS - Overview]]) works with a continuous matrix $W$ and recovers
  the full DAG structure — but needs faithfulness + acyclicity assumptions too.
- **d-separation** is the graphical test for conditional independence in DAGs and is
  the mechanism behind all CI-based causal reasoning: see [[Directed Acyclic Graphs]].
- **DAG structure learning problem** — the full landscape of approaches: see
  [[DAG Structure Learning Problem]].

## See Also
- [[PC Algorithm]] — uses skeleton + v-structures + Meek rules to recover the CPDAG
- [[Greedy Equivalence Search]] — score-based search directly over CPDAG space
- [[DAG Structure Learning Problem]] — problem setup, score functions, NP-hardness
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, DAG causal reasoning
- [[Summary Causal DAGs]] — DAG summarisation for ABM output
- [[LLM Expert Elicitation for Bayesian Networks]] — BN construction without data
