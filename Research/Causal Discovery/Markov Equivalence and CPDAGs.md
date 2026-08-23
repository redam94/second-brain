---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Based-Survey.md]]"
source_location: "Background §1: Markov Equivalence and CPDAGs"
date_ingested: 2026-08-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "essential graph"
  - "equivalence class DAGs"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same conditional independence model.
> The Verma-Pearl theorem (1990) characterizes equivalence by shared skeleton and unshielded
> colliders. A Markov equivalence class is uniquely represented by a **CPDAG** (completed
> partially directed acyclic graph) — the target output of both [[PC Algorithm]] and
> [[Greedy Equivalence Search]]. Meek's (1995) four orientation rules complete the CPDAG from
> V-structures and acyclicity constraints.

## Overview

When learning causal structure from observational data, the **best we can do** (without
additional assumptions such as non-Gaussianity or functional form restrictions) is recover the
**Markov equivalence class** of the data-generating DAG — not the DAG itself. This is because
multiple DAGs can encode precisely the same set of conditional independencies, making them
statistically indistinguishable from passive observation.

Understanding Markov equivalence is the theoretical foundation for both the [[PC Algorithm]]
(which searches for equivalence classes via CI tests) and [[Greedy Equivalence Search]] (which
searches directly in equivalence-class space using a score function). This note develops the
three key results: the Markov condition, the Verma-Pearl characterization theorem, and the CPDAG
representation with Meek's orientation rules.

## Main Content

### The Markov Condition

The Markov condition connects a DAG to the distributions it can represent.

> [!definition] Definition: (Global) Markov Condition (SGS 2000, §2.2)
> A distribution $P$ satisfies the **Markov condition** with respect to DAG $G = (\mathbf{V}, \mathbf{E})$
> if every variable $X \in \mathbf{V}$ is conditionally independent of all its non-descendants
> given its parents:
> $$X \perp\!\!\!\perp \mathrm{NonDesc}_G(X) \mid \mathrm{Pa}_G(X)$$
> Equivalently, using the d-separation criterion: every conditional independence implied by
> d-separation in $G$ holds in $P$.
>
> **Intuition**: Parents screen off a variable from its causal "ancestry" — once you know the
> direct causes, knowing more remote ancestors adds no information.
^def-markov-condition

This implies the **Markov factorization**: $P(X_1,\ldots,X_d) = \prod_{i=1}^d P(X_i \mid \mathrm{Pa}_G(X_i))$, the product of local conditional distributions along the DAG.

### The Faithfulness Condition

The Markov condition says d-separations imply independence. Faithfulness says the converse also holds.

> [!definition] Definition: Faithfulness (SGS 2000, §2.3)
> Distribution $P$ is **faithful** to DAG $G$ if:
> $$(X \perp\!\!\!\perp Y \mid Z)_P \iff (X \perp\!\!\!\perp Y \mid Z)_G \quad \text{(d-separated by } Z \text{)}$$
> That is, the *only* conditional independencies in $P$ are those entailed by d-separation in $G$.
^def-faithfulness

Faithfulness rules out "accidental" cancellations. In a linear SEM, unfaithful distributions are
those where path coefficients cancel exactly — a set of measure zero under any distribution on
the parameters. Faithfulness holds **generically** (almost everywhere).

> [!note] Why faithfulness is needed
> Without faithfulness, the PC algorithm would *over-remove* edges: a path $X \to Z \to Y$ might
> appear as $X \perp\!\!\!\perp Y \mid \emptyset$ in $P$ if the indirect effect cancels, leading
> to a false independence. The algorithm would incorrectly remove the edge $X - Y$ from the
> skeleton.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $G_1$ and $G_2$ on vertex set $\mathbf{V}$ are **Markov equivalent** if they entail
> exactly the same set of conditional independence constraints — i.e., they have the same set of
> d-separations. Equivalently, every distribution that is faithful to $G_1$ is also faithful to $G_2$
> and vice versa.
^def-markov-equivalence

Markov equivalence partitions the space of DAGs into equivalence classes. Each class contains all
DAGs that are statistically indistinguishable from passive observational data (under the Markov
and faithfulness conditions). The observational distribution alone cannot tell us which DAG in a
class generated the data.

### The Skeleton-and-V-Structure Theorem

The following theorem is the central result of the constraint-based approach: it gives a
computable **signature** for each equivalence class.

> [!theorem] Theorem: Verma-Pearl Characterization (Verma & Pearl 1990; Meek 1995)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if**:
> 1. They have the same **skeleton** — the same undirected adjacency structure
>    (i.e., $X - Y$ in $G_1$ iff $X - Y$ in $G_2$, ignoring direction), AND
> 2. They have the same **unshielded colliders** (V-structures):
>    $X \to Z \leftarrow Y$ in $G_1$ iff $X \to Z \leftarrow Y$ in $G_2$,
>    for all non-adjacent pairs $(X, Y)$.
>
> An **unshielded collider** is a triple $X \to Z \leftarrow Y$ where $X$ and $Y$ are
> *not adjacent* (no edge between them). A **shielded collider** $X \to Z \leftarrow Y$ with
> $X - Y$ present is *not* a V-structure and does not distinguish equivalence classes.
^thm-verma-pearl

**Consequence**: Two operations that change only edge directions without altering the skeleton or
unshielded colliders produce equivalent DAGs. The only "safe" operation is **covered edge
reversal** (see [[Greedy Equivalence Search]]).

### CPDAGs (Completed Partially Directed Acyclic Graphs)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (also called the **essential graph**; Andersson, Madigan & Perlman 1997) of a
> Markov equivalence class $[\mathcal{G}]$ is the unique graph $H$ such that:
> - **Directed edge** $X \to Y$ in $H$ if $X \to Y$ in **every** DAG in $[\mathcal{G}]$
>   (compelled/forced edge),
> - **Undirected edge** $X - Y$ in $H$ if there exist DAGs $G_1, G_2 \in [\mathcal{G}]$
>   with $X \to Y$ in $G_1$ and $Y \to X$ in $G_2$ (reversible edge).
>
> Every Markov equivalence class has a unique CPDAG, and every CPDAG uniquely identifies
> a Markov equivalence class.
^def-cpdag

> [!theorem] Theorem: CPDAG Characterization (Meek 1995)
> A mixed graph $H$ (with directed and undirected edges) is a CPDAG if and only if:
> 1. $H$ contains no directed cycles,
> 2. $H$ contains no "almost directed cycle" of the form $X_1 \to X_2 \to \cdots \to X_k - X_1$,
> 3. Every undirected component of $H$ is a chordal (decomposable) graph, and
> 4. The orientations of the directed edges are consistent with Meek's rules R1–R4.
^thm-cpdag-characterization

### Meek's Orientation Rules

After identifying all unshielded colliders in a skeleton, Meek's (1995) four rules complete the
CPDAG by propagating implied orientations. They prevent the creation of new unshielded colliders
or directed cycles.

> [!theorem] Meek's Four Orientation Rules (Meek 1995)
> Apply the following rules exhaustively until no more edges can be oriented:
>
> **R1 (Acyclicity):** If $A \to B - C$ and $A$ is not adjacent to $C$,
> orient $B \to C$.
> *(Else $A \to B \leftarrow C$ would be a new unshielded collider.)*
>
> **R2 (Cycle prevention):** If $A \to C$, $B \to C$, and $A - B$ (with $A$ adjacent to $B$),
> orient $A \to B$.
> *(Else adding $B \to A$ would create a directed cycle $A \to C \leftarrow B \to A$.)*
>
> **R3 (Triangle):** If $A - C$, $B - C$, $A - B$ (three mutually adjacent), $A \to D$,
> $B \to D$, and $C - D$, orient $C \to D$.
> *(Forces the edge toward $D$ to avoid a conflict.)*
>
> **R4 (Chordal):** If $A - B$, $B \to C \to D$, $A - C$ present, $A - D$ absent,
> orient $A \to B$.
^thm-meek-rules

These rules are complete: after applying R1–R4 exhaustively, every remaining undirected edge is
genuinely reversible (belongs to multiple equivalent DAGs).

## Examples

> [!example] Example: Three-Variable Case
> Consider $d = 3$ variables $\{X, Y, Z\}$. There are four Markov equivalence classes:
>
> 1. **Complete independence**: No edges. DAG $\emptyset$ — only one member.
> 2. **One independence**: e.g., $X - Z \mid Y$ or $X - Y \mid Z$.
>    Skeleton has 2 edges; CPDAG has 2 undirected edges.
> 3. **Causal chain**: e.g., $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, $X \leftarrow Y \to Z$ are all
>    equivalent (same skeleton $X - Y - Z$, no colliders). CPDAG: $X - Y - Z$.
> 4. **V-structure (collider)**: $X \to Y \leftarrow Z$ — only member of its class.
>    CPDAG: $X \to Y \leftarrow Z$ (both edges forced).
>
> **Key**: The chain $X \to Y \to Z$ and the fork $X \leftarrow Y \to Z$ are Markov equivalent
> — purely observational data cannot distinguish them.

> [!example] Example: When Identifiability Is Lost
> Consider a linear Gaussian SEM: $Z = 0.5X + \varepsilon_Z$, $Y = 0.5Z - 0.5X + \varepsilon_Y$.
> Then $X \perp\!\!\!\perp Y$ in the distribution (the path coefficients cancel). This violates
> faithfulness: the direct path $X \to Y$ and the indirect path $X \to Z \to Y$ cancel. The
> PC algorithm would incorrectly remove the edge $X - Y$ from the skeleton. This illustrates
> why faithfulness is an assumption, not a guarantee.

## Connections

- **PC Algorithm**: Phase 2 of PC identifies V-structures using the skeleton and separation sets.
  Phase 3 applies Meek's rules. The final output is a CPDAG. See [[PC Algorithm]].
- **GES**: Searches directly in CPDAG space. Each Insert and Delete operator is defined to produce
  valid CPDAGs. The Meek Conjecture ensures GES can navigate between any two CPDAGs. See
  [[Greedy Equivalence Search]].
- **NOTEARS**: Does not target CPDAGs — returns a single DAG (possibly non-unique). NOTEARS
  operates on the continuous space of weighted adjacency matrices $W \in \mathbb{R}^{d\times d}$
  and does not exploit the equivalence class structure. See [[NOTEARS - Overview]].
- **LiNGAM / ICA-based methods**: When noise is non-Gaussian, the full DAG (not just the CPDAG)
  is identifiable — faithfulness is still needed, but the equivalence class reduces to a single
  DAG. See [[DAG Structure Learning Problem]] for this extension.
- **Bayesian Networks**: The CPDAG is the natural output of any distribution-faithful structure
  learner. In the BN inference context, a CPDAG defines a family of distributions, all with the
  same marginal independence structure. See [[Directed Acyclic Graphs]].

## See Also
- [[DAG Structure Learning Problem]] — problem setup, score functions, prior methods landscape
- [[PC Algorithm]] — the canonical constraint-based algorithm using this theory
- [[Greedy Equivalence Search]] — score-based search directly over CPDAGs
- [[NOTEARS - Overview]] — continuous optimization approach (targets a single DAG)
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, causal interpretation
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns; V-structures = colliders
