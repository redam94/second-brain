---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-references.md]]"
source_location: "Chickering 1995 (Transformational Characterization); Verma & Pearl 1990"
date_ingested: 2026-10-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[PC Algorithm]]"
  - "[[GES - Overview]]"
  - "[[GES Algorithm - Forward and Backward Phases]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Observational data (without interventions) cannot in general identify a unique causal DAG — only
> its **Markov equivalence class (MEC)**: the set of all DAGs that encode exactly the same
> conditional independence relations. Two DAGs belong to the same MEC **if and only if** they share
> the same **skeleton** (undirected adjacency) and the same **v-structures** (unshielded colliders).
> The MEC is uniquely represented by a **CPDAG** (Completed Partially Directed Acyclic Graph):
> a mixed graph whose directed edges are those shared by every DAG in the class, and whose
> undirected edges admit both orientations. Both the PC algorithm and GES target the CPDAG as their
> output, not a single DAG.

## Overview

A central limit of observational causal inference is **identifiability**: under the Markov and
Faithfulness assumptions, two different causal DAGs $G$ and $G'$ that encode the same
conditional independences are **statistically indistinguishable** from observational data alone.
The set of all such DAGs is the Markov equivalence class.

Understanding MECs and their CPDAG representation is the prerequisite for both main families of
structure-learning algorithms:
- **Constraint-based** methods (PC algorithm) output a CPDAG directly from conditional independence tests.
- **Score-based** methods (GES) search over the space of CPDAGs using a decomposable score.

## Main Content

### The Markov Condition and Faithfulness

> [!definition] Definition: Markov Condition
> A DAG $G$ satisfies the **Markov condition** for distribution $P$ if every variable $X_i$ is
> conditionally independent of its non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Equivalently, $P$ factorizes as $P(X_1, \ldots, X_d) = \prod_{i=1}^d P(X_i \mid \mathrm{Pa}(X_i))$.
^def-markov

> [!definition] Definition: Faithfulness Condition
> Distribution $P$ is **faithful** to DAG $G$ if all and only the conditional independences in $P$
> are entailed by the Markov condition applied to $G$ — i.e., no "accidental" independences arise
> from parameter cancellation. Formally: $X \perp\!\!\!\perp Y \mid Z$ in $P$ only if $X$ and $Y$
> are d-separated by $Z$ in $G$.
>
> Faithfulness is a generic condition: the set of parameter values that violate it has measure zero
> for continuous distributions (Meek 1995). It is the key structural assumption that makes
> structure learning from observations possible.
^def-faithfulness

### V-Structures (Unshielded Colliders)

> [!definition] Definition: V-Structure (Unshielded Collider)
> A **v-structure** in a DAG is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z$ and $Y \to Z$ (both $X$ and $Y$ are parents of $Z$), and
> 2. $X$ and $Y$ are **not adjacent** (no edge between them).
>
> V-structures are also called **unshielded colliders**: $Z$ is a collider on the path $X$–$Z$–$Y$,
> and it is unshielded because $X \not\!\!-\!\! Y$.
^def-vstructure

V-structures matter because they are **asymmetrically identifiable** from the distribution:
$X \to Z \leftarrow Y$ (collider) has different d-separation properties from $X \to Z \to Y$ (chain)
or $X \leftarrow Z \to Y$ (fork). In particular:
- In a **collider** $X \to Z \leftarrow Y$: $X \perp\!\!\!\perp Y$ unconditionally, but $X \not\!\!\perp Y \mid Z$.
- In a **chain** or **fork**: $X \not\!\!\perp Y$ unconditionally, but $X \perp\!\!\!\perp Y \mid Z$.

The separating set $\mathrm{Sepset}(X, Y)$ (the conditioning set that d-separates $X$ and $Y$)
encodes this: $Z \notin \mathrm{Sepset}(X, Y)$ identifies $(X, Z, Y)$ as a v-structure.

### The Markov Equivalence Theorem

> [!theorem] Theorem: Markov Equivalence Characterization (Verma & Pearl 1990; Chickering 1995)
> Two DAGs $G$ and $G'$ are **Markov equivalent** (encode the same conditional independences) **if
> and only if** they have:
> 1. The same **skeleton** (same set of adjacent pairs, ignoring edge direction), and
> 2. The same set of **v-structures**.
>
> **Proof sketch.** The "only if" direction follows because the skeleton determines the marginal
> independence structure and v-structures are identifiable from collider patterns. The "if" direction
> (Chickering 1995) uses a constructive argument showing that any DAG in the MEC can be reached
> from any other by a sequence of **covered edge reversals** (edges whose reversal preserves the MEC).
^thm-equiv

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $G^*$ of a DAG $G$ is the unique mixed graph (containing both directed and
> undirected edges) representing the MEC $[G]$ such that:
> 1. $G^*$ has the same **skeleton** as every DAG in $[G]$.
> 2. Edge $X \to Y$ in $G^*$ is **directed** iff the edge $X \to Y$ appears in **every** DAG in $[G]$
>    (it is **compelled** — reversing it would either create a new v-structure or a cycle).
> 3. Edge $X - Y$ in $G^*$ is **undirected** iff there exist $G, G' \in [G]$ with $X \to Y$ in $G$
>    and $Y \to X$ in $G'$ (the edge is **reversible**).
>
> CPDAGs are also called **essential graphs** (Andersson et al. 1997). They can be computed from
> any DAG in the MEC by (1) identifying v-structures, (2) applying Meek's four orientation rules.
^def-cpdag

> [!note] Why CPDAGs, not unique DAGs?
> Under faithfulness, the best any observational method can do is recover the MEC — not a unique DAG.
> Some edges will always remain undirected because no observational data can distinguish
> $X \to Y$ from $X \leftarrow Y$ without interventional data or additional assumptions
> (e.g., non-Gaussianity in LiNGAM, or equal error variances in ANM). The CPDAG encodes
> exactly this identifiable information.

### Meek's Orientation Rules

After identifying v-structures, additional edges can be directed by four **Meek rules** that
propagate orientations without creating new v-structures or directed cycles:

> [!definition] Meek Orientation Rules (Meek 1997)
> Given a partially directed graph with correct skeleton and v-structures, apply repeatedly:
>
> **R1 (Away from collider):** If $Z \to X - Y$ and $Z \not\!\!-\!\! Y$, then orient $X \to Y$.
> *(Orienting $Y \to X$ would create a new v-structure $Z \to X \leftarrow Y$.)*
>
> **R2 (Away from cycle):** If $X \to Z \to Y$ and $X - Y$, then orient $X \to Y$.
> *(Orienting $Y \to X$ would create a directed cycle.)*
>
> **R3 (Double-triangle):** If $X - Z$, $X - Y$, $W \to Z \to Y$, $W \to Y$, and $X \not\!\!-\!\! W$,
> orient $X \to Z$.
>
> **R4 (Disambiguation):** If $X - Z$, $Z - Y$, $W \to Z \to Y$, and $W \not\!\!-\!\! Y$,
> orient $Z \to Y$.
>
> Meek (1997) proved that R1–R3 are complete for directed edges in the CPDAG (R4 handles specific
> cases involving non-adjacent nodes and is required for completeness in some formulations).
^def-meek-rules

## Examples

> [!example] Example: A Simple MEC
> Consider four variables $\{A, B, C, D\}$ with skeleton $A - B - C - D$ (a path).
> The possible v-structures depend on which triples are colliders:
>
> - $A \to B \to C \to D$ — no v-structures → MEC contains 6 DAGs (all orientations without
>   creating v-structures)
> - $A \to B \leftarrow C \to D$ — v-structure at $B$; $A$ and $C$ non-adjacent → CPDAG has
>   directed $A \to B$ and $C \to B$, undirected $C - D$
>
> Two DAGs in the same MEC: $A \to B \to C \to D$ and $A \leftarrow B \to C \to D$ (same skeleton,
> no v-structures) are Markov equivalent. The CPDAG is $A - B \to C \to D$.

## Connections

- **Constraint-based methods** (see [[PC Algorithm]]) discover the MEC's skeleton via CI tests and
  orient edges using v-structures and Meek rules — outputting the CPDAG directly.
- **Score-based methods** (see [[GES - Overview]], [[GES Algorithm - Forward and Backward Phases]])
  search over the space of CPDAGs directly, using a decomposable score that is constant within each MEC
  (score-equivalence).
- **Identifiability limits**: the CPDAG is the maximum identifiable object from observational data
  under the Markov and Faithfulness assumptions. See [[Directed Acyclic Graphs]] for d-separation,
  [[Causal Estimands]] for the implications for causal effect identification.
- **Interventional data**: interventions can orient additional edges beyond the CPDAG; see
  [[NOTEARS - Overview]] for a comparison of observational vs. interventional structure learning.

## See Also
- [[Directed Acyclic Graphs]] — d-separation and causal DAG semantics
- [[PC Algorithm]] — constraint-based discovery using MECs
- [[GES - Overview]] — score-based search over MEC space
- [[DAG Structure Learning Problem]] — how MECs fit in the broader structure-learning landscape
- [[Causal Discovery/_Index|Causal Discovery Index]]
