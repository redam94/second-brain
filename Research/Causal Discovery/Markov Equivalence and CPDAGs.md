---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS-and-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 2, 5; Verma & Pearl (1990)"
date_ingested: 2026-09-23
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
  - "essential graph"
  - "CPDAG"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same set of conditional
> independence relations — equivalently, iff they have the same **skeleton** (undirected
> graph) and the same set of **v-structures** (unshielded colliders $X \to Z \leftarrow Y$).
> The canonical representative of an equivalence class is the **CPDAG** (completed partially
> directed acyclic graph), which orients only those edges whose direction is shared by every
> member of the class. This boundary — learning only up to the Markov equivalence class — is
> the fundamental identifiability limit for observational causal discovery.

## Overview

A central fact of causal inference from observational data is that **the data alone cannot
distinguish between Markov-equivalent DAGs**. Any intervention-free distribution that is
Markov and faithful to a DAG $G$ is also Markov and faithful to every other DAG in $G$'s
equivalence class. Recovering the full DAG therefore requires either interventional data,
additional assumptions (non-Gaussianity, equal noise variances), or domain knowledge.

Both constraint-based methods (see [[PC Algorithm]]) and score-based methods (see
[[Greedy Equivalence Search]]) output CPDAGs rather than DAGs — the correct representation
of what observational data can identify.

## Main Content

### Markov condition and faithfulness

> [!definition] Definition: Global Markov Condition
> A probability distribution $P$ satisfies the **global Markov condition** with respect to
> DAG $G = (\mathbf{V}, \mathbf{E})$ if every d-separation statement in $G$ implies a
> conditional independence statement in $P$:
> $$X \perp_G Y \mid Z \implies X \perp_P Y \mid Z \quad \forall\, X, Y, Z \subseteq \mathbf{V}.$$
^def-markov

> [!definition] Definition: Faithfulness
> $P$ is **faithful** to $G$ if the converse also holds — every conditional independence
> in $P$ is entailed by a d-separation in $G$:
> $$X \perp_P Y \mid Z \implies X \perp_G Y \mid Z.$$
> Faithfulness rules out "accidental" cancellations of path influences. It fails on
> measure-zero sets of parameters (for linear SEMs, when path coefficients cancel).
^def-faithfulness

Under both conditions, the DAG $G$ and the distribution $P$ are said to be **faithful to each other**.
This is the identifying assumption for constraint-based causal discovery: without faithfulness,
a CI statement could be a false-positive (paths cancel), leading to spurious skeleton removals.

### Markov equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $G$ and $H$ on the same variable set are **Markov equivalent** if they imply
> exactly the same set of conditional independence relations — i.e.\ the same d-separations.
> We write $G \sim H$.
^def-markov-equiv

> [!theorem] Theorem: Verma–Pearl Characterization (Verma & Pearl, 1990)
> Two DAGs $G$ and $H$ are Markov equivalent if and only if they have:
> 1. The same **skeleton** (same set of undirected adjacencies), and
> 2. The same set of **v-structures** (unshielded colliders): triples $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are not adjacent.
>
> Equivalently: same skeleton + same set of unshielded triples with the collider orientation.
^thm-verma-pearl

The proof uses the fact that, in a DAG, the d-separation statements are entirely determined
by the skeleton and the v-structures. Covered edges (where the parent set of the child
contains exactly the parents of the other node) can be reversed without changing d-separations.

### CPDAGs (essential graphs)

> [!definition] Definition: CPDAG
> The **CPDAG** (completed partially directed acyclic graph) $\mathcal{C}(G)$ of a DAG $G$
> is the unique graph over the same variables where:
> - An edge $X — Y$ is **directed** ($X \to Y$ in $\mathcal{C}$) iff every DAG in the
>   equivalence class of $G$ has $X \to Y$.
> - An edge $X — Y$ is **undirected** ($X - Y$ in $\mathcal{C}$) iff the class contains
>   both $X \to Y$ and $X \leftarrow Y$.
>
> Every equivalence class has exactly one CPDAG, and every CPDAG represents exactly one
> equivalence class.
^def-cpdag

> [!note] CPDAG vs PDAG
> A **PDAG** (partially directed acyclic graph) is any mixed graph without directed cycles.
> A **CPDAG** is the special PDAG that is the canonical representative of a Markov
> equivalence class. Not every PDAG is a valid CPDAG.

### Constructing the CPDAG from a DAG

Given a DAG $G$, the CPDAG can be constructed by the **Dor & Tarsi (1992) algorithm**
or equivalently by:
1. Orient all v-structures.
2. Apply **Meek's orientation rules** (R1–R4) repeatedly until no more orientations fire.
3. All remaining unoriented edges become undirected in the CPDAG.

> [!definition] Meek's Orientation Rules (Meek, 1995)
> Given an adjacency matrix with a mix of directed and undirected edges, apply until fixpoint:
>
> **R1 (Acyclicity):** If $Z - Y$ and $X \to Z$, with $X$ not adjacent to $Y$: orient $Z \to Y$.
>
> **R2 (Transitivity):** If $X \to Z \to Y$ and $X - Y$: orient $X \to Y$.
>
> **R3:** If $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1$ not adjacent to $Z_2$, and $X - Y$:
> orient $X \to Y$.
>
> **R4:** If $Z - W \to Y$, $Z \to X \to Y$, $W$ adjacent to $X$ but not $Z$, and $Z - Y$:
> orient $Z \to Y$.
>
> These rules are **sound and complete**: applying them until fixpoint yields exactly the CPDAG.
^def-meek-rules

### Why the CPDAG is the right output

From observational data alone (under faithfulness and causal sufficiency), the **equivalence
class** is the finest identifiable object. Score functions like BIC are constant across
equivalent DAGs (for decomposable scores), and constraint-based tests produce the same
skeleton and v-structure set for all equivalent DAGs. Hence:

- Constraint-based algorithms (PC) output the CPDAG of the generating DAG.
- Score-based algorithms (GES) search over equivalence classes and output the CPDAG.
- Non-observational methods (interventional, LiNGAM for non-Gaussian data, equal-variance
  restriction) can go further and identify the DAG.

## Examples

> [!example] Example: A 3-node Markov equivalence class
> Consider four DAGs on nodes $\{X, Y, Z\}$ with skeleton $X - Y - Z$ (no edge $X - Z$):
>
> - $X \to Y \to Z$
> - $X \leftarrow Y \leftarrow Z$
> - $X \leftarrow Y \to Z$
> - $X \to Y \leftarrow Z$ ← **this one is different**
>
> The first three share v-structure set $\emptyset$ (no unshielded collider at $Y$) and the same
> skeleton, so they are Markov equivalent. Their CPDAG is $X - Y - Z$.
>
> The fourth has a v-structure $X \to Y \leftarrow Z$, making it a different equivalence class.
> Its CPDAG is $X \to Y \leftarrow Z$ (fully directed, since this v-structure is shared by all
> members of that one-element equivalence class).
>
> This explains why the PC algorithm can orient the collider $X \to Y \leftarrow Z$ but cannot
> determine the direction of $X - Y$ in the first equivalence class.

## Connections

- **Identifiability limit**: CPDAGs are the finest structural information recoverable from
  observational data under faithfulness. See [[Directed Acyclic Graphs]] for d-separation.
- **PC algorithm**: outputs the CPDAG by: skeleton learning → v-structure identification
  → Meek rule propagation. See [[PC Algorithm]].
- **GES algorithm**: searches directly over CPDAGs using Insert/Delete operators that move
  between adjacent equivalence classes. See [[Greedy Equivalence Search]].
- **Non-Gaussian methods**: [[DAG Structure Learning Problem]] notes that LiNGAM and
  post-nonlinear models can identify the full DAG by exploiting distributional structure.
- **NOTEARS**: NOTEARS operates over matrices and recovers an oriented DAG, not a CPDAG;
  its orientations are not necessarily identifiable from observational data — the output
  may not equal the true CPDAG in finite samples. See [[NOTEARS - Overview]].

## See Also
- [[DAG Structure Learning Problem]] — formal problem setup (SEM, score functions)
- [[PC Algorithm]] — constraint-based algorithm outputting CPDAGs
- [[Greedy Equivalence Search]] — score-based algorithm searching over MECs
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, Markov condition
- [[NOTEARS - Overview]] — continuous optimization for DAG learning
