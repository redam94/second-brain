---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-ges-full.pdf]]"
source_location: "§3 Notation and Background, pp. 3-4"
date_ingested: 2026-10-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "CPDAG"
  - "Completed Partially DAG"
  - "Markov equivalence"
  - "PDAG"
  - "Markov equivalence class"
  - "Meek rules"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs encode the same set of conditional independencies if and only if they share
> the same **skeleton** (undirected edges) and the same **v-structures** (unshielded
> colliders). The unique graphical representative of this equivalence class is the
> **CPDAG** (Completed Partially Directed Acyclic Graph): a mixed graph whose directed
> edges are those that have the same orientation in every DAG in the class, and whose
> undirected edges are those that are reversible. CPDAGs are the output of both the
> [[PC Algorithm]] and the [[GES Algorithm]], and the fundamental reason structure
> learning algorithms can only identify a *class* of DAGs, not a unique DAG, from
> observational data.

## Overview

Structure learning algorithms cannot, in general, uniquely identify a DAG from
observational data. When two DAGs encode exactly the same statistical constraints —
the same conditional independence relations — they are **Markov equivalent** and are
indistinguishable without interventional data. This creates an identifiability ceiling:
the best any algorithm can achieve from observational data is recovering the **Markov
equivalence class** (MEC) of the true DAG.

The MEC is represented by a single mixed graph called a CPDAG (or essential graph).
The CPDAG describes which edges are **compelled** (must have a specific orientation in
every member of the class) and which are **reversible** (can be flipped while remaining
in the class).

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1991; Chickering & Meek 2002)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ over the same variables are **equivalent** —
> denoted $\mathcal{G} \approx \mathcal{G}'$ — if and only if they impose the same set of
> independence constraints on the joint distribution. Concretely:
>
> **Graphical criterion (Verma & Pearl 1991):** $\mathcal{G} \approx \mathcal{G}'$ if and
> only if:
> 1. $\mathcal{G}$ and $\mathcal{G}'$ have the same **skeleton** (same set of edges, ignoring
>    directionality), *and*
> 2. $\mathcal{G}$ and $\mathcal{G}'$ have the same **v-structures** (unshielded colliders:
>    triples $X \to Z \leftarrow Y$ where $X$ and $Y$ are non-adjacent).
^def-markov-equiv

> [!definition] Definition: V-structure (Unshielded Collider)
> A triple $(X, Z, Y)$ forms a **v-structure** (also called an *unshielded collider*) in
> DAG $\mathcal{G}$ if:
> - $X \to Z \leftarrow Y$ (Z is a collider on the path X–Z–Y), *and*
> - $X$ and $Y$ are *not* adjacent in $\mathcal{G}$ (the collider is "unshielded").
>
> V-structures are the only orientations that are *compelled* by the joint distribution:
> they produce a distinctive conditional independence pattern ($X \not\!\perp Y$ but
> $X \perp Y \mid Z$) that no equivalent DAG without that v-structure can replicate.
^def-v-structure

### Compelled and reversible edges

> [!definition] Definition: Compelled and Reversible Edges (Chickering 2002)
> An edge $X \to Y$ in a DAG $\mathcal{G}$ is:
> - **Compelled** if every DAG in the equivalence class $[\mathcal{G}]_\approx$ has the
>   edge oriented as $X \to Y$.
> - **Reversible** if there exists a DAG in $[\mathcal{G}]_\approx$ with the edge oriented
>   as $Y \to X$.
>
> Compelled edges arise from v-structures and from edges that are constrained by the
> acyclicity requirement. Reversible edges can be flipped without creating a new
> v-structure or a cycle — they form *chains* or *paths* in the skeleton that are
> orientation-symmetric.
^def-compelled-reversible

### CPDAG (Completed Partially DAG)

> [!definition] Definition: CPDAG (Essential Graph) (Chickering & Meek 2002, §3)
> A **completed partially directed acyclic graph (CPDAG)** $\mathcal{C}$ is a mixed graph
> (containing both directed and undirected edges) with the properties:
> 1. Every directed edge $X \to Y$ in $\mathcal{C}$ is **compelled**: it appears with the
>    same orientation in every DAG in the equivalence class.
> 2. Every undirected edge $X - Y$ in $\mathcal{C}$ is **reversible**: there exist members
>    of the equivalence class in which the edge is oriented as $X \to Y$ and others in
>    which it is $Y \to X$.
>
> The CPDAG representation of an equivalence class is **unique** — each equivalence class
> has exactly one CPDAG. (Non-completed PDAGs are not unique representations of a class.)
^def-cpdag

The CPDAG is computed from any DAG $\mathcal{G}$ in the class by:
1. Identifying all v-structures and marking their edges as directed (compelled).
2. Applying **Meek's orientation rules** (below) to orient additional edges.
3. Leaving all remaining edges undirected (reversible).

### Meek's four orientation rules

After orienting v-structures, Meek (1995) showed that four rules suffice to complete
the CPDAG by orienting all remaining compelled edges, without creating any new
v-structures or directed cycles.

> [!theorem] Meek's Orientation Rules (Meek 1995)
> Let $\mathcal{P}$ be a PDAG with the skeleton and v-structures of $\mathcal{G}$.
> Apply the following rules exhaustively until no more edges can be oriented:
>
> **R1 (Avoid new v-structure):**
> If $A \to B - C$ and $A$ and $C$ are non-adjacent, then orient $B \to C$.
>
> *Reason:* If $B - C$ were oriented $C \to B$, then $A \to B \leftarrow C$ would be a
> new v-structure (since $A \not\sim C$), contradicting the assumption that we are working
> within the equivalence class.
>
> **R2 (Avoid directed cycle):**
> If $A - B$ and $A \to C \to B$, then orient $A \to B$.
>
> *Reason:* If $B \to A$ were allowed, then together with $A \to C \to B$ we would have
> a directed cycle.
>
> **R3 (Avoid new v-structure with two paths):**
> If $A - B$, $A - C_1 \to B$, $A - C_2 \to B$, and $C_1 \not\sim C_2$, then orient
> $A \to B$.
>
> *Reason:* If $B \to A$ held, then both $C_1 \to B \leftarrow A$ and
> $C_2 \to B \leftarrow A$ would be v-structures (since $C_1 \not\sim C_2$ and $C_2
> \not\sim C_1$), but only one of these can be a v-structure consistent with the class.
>
> **R4 (Zhang's extension for ancestral graphs):**
> If $A - B$, $D \to A$, $D$ adjacent to $C$, $C \to B$, and $D$ non-adjacent to $B$,
> then orient $A \to B$.
>
> Rules R1–R3 are sufficient for DAGs. R4 is needed only for certain generalized
> graphical models (maximal ancestral graphs, FCI algorithm output).
^thm-meek-rules

## Worked Example

> [!example] Example: Computing a CPDAG from a DAG
> **Setup:** Consider the DAG $\mathcal{G}$:
> $$A \to C \to D, \quad B \to C, \quad B \to D$$
> The skeleton is: $A - C - D$, $B - C$, $B - D$, with no edge between $A$ and $B$,
> $A$ and $D$.
>
> **Step 1: Identify v-structures.**
> - Triple $(A, C, B)$: $A \to C \leftarrow B$, and $A \not\sim B$. → **V-structure.**
> - Triple $(A, C, D)$: $A \to C \to D$, not a collider.
> - Triple $(C, D, B)$: $C \to D \leftarrow B$, and $C \sim B$ (adjacent). **Shielded** collider → *not* a v-structure.
>
> **Step 2: Orient the v-structure.** Mark $A \to C$ and $B \to C$ as compelled.
>
> **Step 3: Apply Meek R1.** $B \to C \to D$ with $B \sim D$ — R1 requires $B \not\sim D$.
> Since $B$ and $D$ *are* adjacent, R1 does not fire here. No further orientations
> are forced.
>
> **CPDAG result:** $A \to C \leftarrow B$, $C - D$, $B - D$.
> The undirected edges $C - D$ and $B - D$ are reversible — either orientation is
> consistent with the same set of independence constraints.

## Why MECs Matter for Structure Learning

1. **Fundamental limit of observational data.** Without interventions, observational data
   can only identify the equivalence class — not a unique DAG. This is a *fundamental*
   statistical limit, not just an algorithmic one.
2. **Algorithms target CPDAGs.** Both constraint-based ([[PC Algorithm]]) and score-based
   ([[GES Algorithm]]) methods output CPDAGs rather than DAGs. [[NOTEARS - Overview]]
   outputs a DAG, which *belongs to* the true CPDAG's equivalence class (in principle).
3. **Interventions resolve ambiguity.** Oriented edges can be identified from
   interventional data (randomized experiments). The *intervention graph* $G_{\text{do}(X)}$
   is different from $G$, breaking the symmetry.
4. **Number of MECs grows super-exponentially.** While the number of DAGs grows
   super-exponentially in the number of nodes, the number of equivalence classes is much
   smaller — many DAGs share the same CPDAG.

## Connections

- **[[DAG Structure Learning Problem]]**: the score-based DAG learning problem (which NOTEARS
  solves) outputs a DAG; understanding equivalence is needed to interpret which class it
  belongs to.
- **[[PC Algorithm]]**: the PC algorithm explicitly searches for v-structures and applies
  Meek rules, outputting a CPDAG.
- **[[GES Algorithm]]**: GES searches over equivalence classes directly (each state in the
  search is a CPDAG), which gives it computational and statistical advantages.
- **[[Directed Acyclic Graphs]]**: d-separation, back-door criterion, and do-calculus
  operate on DAGs; MECs describe which causal structures are *indistinguishable* from
  observational data.

## See Also
- [[PC Algorithm]] — uses v-structure detection + Meek rules to build the CPDAG
- [[GES Algorithm]] — greedy search over the space of CPDAGs
- [[DAG Structure Learning Problem]] — the learning problem CPDAGs solve
- [[Directed Acyclic Graphs]] — causal DAG semantics (back-door, do-calculus)
- [[NOTEARS - Overview]] — continuous optimization approach, outputs a DAG rather than CPDAG
