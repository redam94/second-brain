---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/lee25a-constraint-causal-discovery.pdf]]"
source_location: "§2 Background, pp. 2487–2489"
date_ingested: 2026-08-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independence
> (CI) relationships — the same d-separations. Because observational data only reveals CI
> structure, structure-learning algorithms can at best recover an equivalence class, not a unique
> DAG. The **CPDAG** (Completed Partially Directed Acyclic Graph) is the canonical
> representation of a Markov equivalence class: edges that all member-DAGs agree on are
> directed; remaining edges are undirected. The **Verma–Pearl theorem** gives a simple
> graphical certificate: two DAGs are Markov equivalent iff they share the same *skeleton*
> and the same *v-structures* (unshielded colliders).

## Overview

Structure learning from observational data faces a fundamental identifiability barrier: many
different DAGs can produce the same joint distribution. Specifically, interventions on a system
distinguish DAGs that observational data cannot. The Markov equivalence class is the finest
partition of DAGs that observational data *can* resolve — the best achievable target for
any purely observational causal discovery algorithm.

Understanding this object is prerequisite to understanding both constraint-based algorithms
(the [[PC Algorithm - Overview|PC algorithm]] learns the CPDAG) and score-based algorithms
([[GES - Greedy Equivalence Search|GES]] searches the space of CPDAGs directly).

## Main Content

### Markov Condition and Faithfulness

> [!definition] Definition: Causal Markov Condition
> Given variables $V$ with causal structure represented by DAG $D$, every variable is
> probabilistically independent of its non-descendants conditional on its parents in $D$:
> $$X_j \perp\!\!\!\perp X_{\text{non-desc}(j)} \mid X_{\text{pa}(j)}.$$
> ^def-markov-cond

> [!definition] Definition: Faithfulness
> A distribution $P$ is **faithful** to DAG $D$ if every conditional independence in $P$
> is entailed by a d-separation in $D$, and vice versa. Formally, for disjoint $X, Y, Z \subseteq V$:
> $$X \perp\!\!\!\perp Y \mid Z \text{ in } P \;\iff\; X \perp\!\!\!\perp Y \mid Z \text{ in } D.$$
>
> Without faithfulness, observational data could exhibit *accidental* cancellations of paths,
> creating spurious independences not implied by the graph. Faithfulness is the standard
> identifying assumption for constraint-based methods.
> ^def-faithfulness

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Lee et al., 2025 §2; Spirtes et al., 2000)
> Two DAGs $D_1, D_2$ over the same vertex set $V$ are **Markov equivalent** if they entail
> the same set of d-separations: for all disjoint $X, Y, Z \subseteq V$,
> $$(X \perp\!\!\!\perp Y \mid Z)_{D_1} \iff (X \perp\!\!\!\perp Y \mid Z)_{D_2}.$$
>
> The **Markov equivalence class** $[D]$ is the set of all DAGs Markov equivalent to $D$.
> ^def-markov-equiv

### The Verma–Pearl Theorem

> [!theorem] Theorem: Graphical Characterization of Markov Equivalence (Verma & Pearl, 1990; Andersson, Madigan & Perlman, 1997)
> Two DAGs $D_1, D_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (the same edges, ignoring orientation), and
> 2. The same **v-structures** (unshielded colliders): $X \to Z \leftarrow Y$ where $X$ and
>    $Y$ are non-adjacent.
>
> Equivalently (Andersson et al., 1997): two DAGs are Markov equivalent iff they have the
> same skeleton and the same set of unshielded triples that are v-structures.
>
> **Proof sketch:** The skeleton determines which pairs of variables are *ever* adjacent.
> Given the skeleton, a v-structure $X \to Z \leftarrow Y$ is identifiable because $Z \notin
> \text{sep}(X, Y)$ — the edge $X \to Z$ cannot be reversed to $X \leftarrow Z$ without
> creating or destroying this CI property. Non-collider triples ($X \to Z \to Y$, $X \leftarrow
> Z \leftarrow Y$, $X \leftarrow Z \to Y$) are all Markov equivalent to one another given the
> skeleton. $\square$
> ^thm-verma-pearl

### V-Structures (Unshielded Colliders)

> [!definition] Definition: V-Structure
> In a DAG $D$, a **v-structure** (also called an *unshielded collider* or *immorality*)
> is a triple $X \to Z \leftarrow Y$ where:
> - Both $X$ and $Y$ are **parents** of $Z$, and
> - $X$ and $Y$ are **not adjacent** in $D$ (the triple is *unshielded*).
>
> V-structures are identifiable from data because $Z$ is a collider: conditioning on $Z$
> (or its descendants) activates the path $X - Z - Y$, making $X$ and $Y$ dependent
> even though they are marginally independent given the empty set.
> ^def-v-structure

> [!example] Example: Equivalence Class of Size 3
> The three DAGs $X \to Z \to Y$, $X \leftarrow Z \to Y$, $X \leftarrow Z \leftarrow Y$
> are all Markov equivalent: same skeleton $\{X-Z, Z-Y\}$ and no v-structures.
>
> But $X \to Z \leftarrow Y$ with $X$ and $Y$ non-adjacent is *not* equivalent to these —
> it has a v-structure at $Z$. The equivalence classes here are:
> - Class 1: $\{X \to Z \to Y,\; X \leftarrow Z \to Y,\; X \leftarrow Z \leftarrow Y\}$ (chain / fork)
> - Class 2: $\{X \to Z \leftarrow Y\}$ (collider — identifiable alone)

### CPDAG: The Canonical Representative

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (also called the *essential graph*) of a Markov equivalence class $[D]$ is a
> graph $G$ over the same vertex set where:
> - Edge $X \to Y$ is **directed** in $G$ if *every* DAG in $[D]$ orients it $X \to Y$.
> - Edge $X - Y$ is **undirected** in $G$ if some DAG in $[D]$ has $X \to Y$ and another
>   has $X \leftarrow Y$.
>
> The CPDAG exists and is unique for each equivalence class (Andersson et al., 1997).
> It is the output of both the [[PC Algorithm - Overview|PC algorithm]] and [[GES - Greedy Equivalence Search|GES]].
> ^def-cpdag

### Meek's Orientation Rules

After orienting v-structures, additional edges can be consistently oriented using four local
rules (Meek, 1995) without creating new v-structures or directed cycles:

| Rule | Pattern | Orientation | Reason |
|------|---------|-------------|--------|
| **R1** | $Z \to X - Y$ (Z, Y non-adj) | $X \to Y$ | Else $Z \to X \leftarrow Y$ is new v-structure |
| **R2** | $X \to Z \to Y$, $X - Y$ | $X \to Y$ | Else directed cycle $X \to Z \to Y \to X$ |
| **R3** | $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1,Z_2$ non-adj, $X - Y$ | $X \to Y$ | Avoid two new v-structures simultaneously |
| **R4** | $X - Z \to W \to Y$, $X - Y$, $Z - Y$ | $X \to Y$ | Meek (1995), completes acyclic orientation |

Meek proved these four rules are **complete**: applying them exhaustively to any partial
orientation (skeleton + v-structures) yields exactly the CPDAG.

## Practical Implications for Structure Learning

| Property | Consequence |
|---------|-------------|
| Identifiability ceiling | Purely observational data cannot distinguish within a Markov equivalence class |
| Multiple DAGs per class | A CPDAG with $k$ undirected edges represents $\leq 2^k$ DAGs |
| Intervention | A single perfect intervention on $Z$ can distinguish $X \to Z$ from $X \leftarrow Z$ |
| Non-Gaussian errors | LiNGAM: non-Gaussian noise breaks Markov equivalence — individual DAGs become identifiable |

## Connections

- **PC algorithm** uses CI tests to discover the skeleton and v-structures, then applies Meek's
  rules — see [[PC Algorithm - Overview]].
- **GES** searches directly over equivalence classes (CPDAGs) rather than individual DAGs,
  avoiding the need to enumerate within-class members — see [[GES - Greedy Equivalence Search]].
- **NOTEARS** returns a single DAG (within the class), not the full CPDAG — see [[NOTEARS - Overview]].
- **d-separation and faithfulness**: the foundational machinery is shared with DAG causal
  reasoning in [[Directed Acyclic Graphs]] and [[Spurious Association and Confounds]].

## See Also
- [[PC Algorithm - Overview]] — uses CPDAGs as output target
- [[GES - Greedy Equivalence Search]] — searches CPDAG space directly
- [[DAG Structure Learning Problem]] — the computational formulation of structure learning
- [[Directed Acyclic Graphs]] — d-separation and do-calculus foundations
- [[Canonical Causal DAGs]] — fork, pipe, collider patterns relate to Markov equivalence
