---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo2014-PC-stable-source.md]]"
source_location: "§2, pp. 3924–3928 (background on MECs, CPDAGs, Meek rules)"
date_ingested: 2026-09-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Constraint-Based Causal Discovery]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence"
  - "essential graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same conditional independence (CI)
> structure — formally, the same set of d-separations. The **CPDAG** (Completed Partially
> Directed Acyclic Graph) is the unique canonical representative of each equivalence class:
> an edge is directed in the CPDAG iff it has the same orientation in *every* member of the
> class. Constraint-based methods (PC algorithm) and score-based methods (GES) both return a
> CPDAG, not a single DAG, because observational data can at most identify the MEC — not the
> true DAG — without additional assumptions (e.g., non-Gaussianity, equal variances).

## Overview

When we learn a DAG from observational data, we face a fundamental identifiability limit:
multiple DAGs can encode identical conditional independence statements. For example, the
three DAGs $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, and $X \leftarrow Y \to Z$ all
imply that $X \perp\!\!\!\perp Z \mid Y$ (and no other CI constraints among $\{X,Y,Z\}$) —
so no amount of i.i.d. observational data can distinguish them. They form a **Markov
equivalence class** (MEC).

The CPDAG of an MEC represents what *can* be identified:
- **Directed edges** in the CPDAG are the same in every DAG in the MEC (forced orientations).
- **Undirected edges** in the CPDAG can be oriented either way across the MEC members.

Understanding MECs is essential because both PC and GES output CPDAGs, not DAGs.

## Main Content

### Markov and Faithfulness Assumptions

> [!definition] Markov Condition
> A DAG $\mathcal{G}$ and distribution $P$ satisfy the **Markov condition** if every variable
> $X_i$ is conditionally independent of its non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i) \qquad \text{in } P.$$
> Equivalently, $P$ factorizes as $P(X_1,\ldots,X_d) = \prod_{i=1}^d P(X_i \mid \mathrm{Pa}(X_i))$.
^def-markov-condition

> [!definition] Faithfulness Condition
> The distribution $P$ is **faithful** to $\mathcal{G}$ if every CI statement in $P$ is
> implied by the Markov condition on $\mathcal{G}$. Equivalently, there are no
> "accidental" cancellations: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ in $P$ iff
> $X_i$ and $X_j$ are **d-separated** by $\mathbf{S}$ in $\mathcal{G}$.
>
> Faithfulness fails on a Lebesgue-measure zero set of parameterizations — it holds "almost
> everywhere" but can fail by construction (e.g., two paths that exactly cancel).
^def-faithfulness

Together, Markov + faithfulness imply that the CI structure in $P$ exactly characterizes
the d-separation structure of the true DAG $\mathcal{G}^*$.

### Characterizing Markov Equivalence

> [!theorem] Verma & Pearl (1990): Characterization of Markov Equivalence
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** iff they have the
> same **skeleton** (same undirected adjacencies) and the same **v-structures** (unshielded
> colliders).
>
> A **v-structure** is a triple $X \to Z \leftarrow Y$ where $X$ and $Y$ are non-adjacent.
> It implies that $Z$ is a collider on the path $X - Z - Y$ and hence $X \not\perp\!\!\!\perp Y \mid Z$
> (conditioning on a collider opens the path).
^thm-verma-pearl

This theorem provides a simple test for equivalence and is the basis for identifying the
orientations that are *shared* across the MEC.

### CPDAGs (Essential Graphs)

> [!definition] CPDAG
> The **Completed Partially Directed Acyclic Graph (CPDAG)** of an MEC is the unique graph
> on the same variables where:
> - Edge $X \to Y$ is present (directed) iff every DAG in the MEC has $X \to Y$.
> - Edge $X - Y$ is present (undirected) iff some members have $X \to Y$ and others have
>   $X \leftarrow Y$.
>
> CPDAGs are also called **essential graphs**. Every MEC has a unique CPDAG.
^def-cpdag

A CPDAG always satisfies: (a) it is a chain graph with chordal chain components, and (b)
each undirected component is a clique.

### Meek Orientation Rules

After identifying v-structures, additional edges can sometimes be oriented by applying
Meek's (1995) orientation rules repeatedly until no more apply. These rules preserve the
acyclicity of the DAG and ensure no new v-structures are created.

> [!theorem] Meek's Orientation Rules (Meek, 1995)
> Given a PDAG that represents an MEC, the following rules, applied exhaustively, complete
> all orientable edges:
>
> **R1 (Non-v-structure orientation):** If $X \to Y - Z$ and $X \not\sim Z$, then orient $Y \to Z$.
> *(Otherwise $X \to Y \leftarrow Z$ would be a new v-structure.)*
>
> **R2 (Acyclicity):** If $X \to Y \to Z$ and $X - Z$, then orient $X \to Z$.
> *(Otherwise $X \leftarrow Z$ would create a cycle.)*
>
> **R3 (Disambiguation):** If $X - Z$, $X - W$, $W \to Y$, $Z \to Y$, and $W \not\sim Z$,
> then orient $X \to Y$.
> *(Prevents creating conflicting v-structures.)*
>
> **R4 (Chain):** If $X - Z - W \to Y$, $X \to Y$, and $Z \not\sim Y$, then orient $Z \to Y$.
^thm-meek-rules

These four rules are **complete**: the CPDAG produced by orienting v-structures and then
exhaustively applying R1–R4 is the unique CPDAG of the MEC.

### What Observational Data Can and Cannot Identify

| Information source | What it identifies |
|---|---|
| Observational data + faithfulness | The CPDAG (MEC), not the DAG |
| Interventional data | May resolve some undirected edges |
| Non-Gaussianity (LiNGAM) | Full DAG (direction of every edge) |
| Known temporal ordering | Restricts which orientations are allowed |

Under purely observational data and the Markov + faithfulness assumptions, the best any
algorithm can achieve is consistent estimation of the CPDAG — not the unique DAG.

## Examples

> [!example] Three-Variable MEC
> The three DAGs $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, $X \leftarrow Y \to Z$
> are Markov equivalent (same skeleton $X - Y - Z$, no v-structures).
> Their CPDAG is $X - Y - Z$ (all edges undirected).
>
> The DAG $X \to Y \leftarrow Z$ (with $X \not\sim Z$) is in a *different* MEC because it
> has the v-structure $X \to Y \leftarrow Z$. Its CPDAG is $X \to Y \leftarrow Z$ (both
> edges directed, since the v-structure forces them).

> [!example] Forced Orientation via Meek R1
> Suppose we have identified the skeleton $A - B - C$ and the v-structure
> $A \to B \leftarrow C$ is absent (B is not a collider). If we orient $A \to B$ (from
> some other rule), Meek R1 forces $B \to C$: otherwise $A \to B \leftarrow C$ would be a
> new v-structure, contradicting the absence of that v-structure in the skeleton step.

## Connections

- **PC algorithm** ([[PC Algorithm]]): first discovers the skeleton via CI tests, then orients
  v-structures, then applies Meek rules — outputting the CPDAG.
- **GES** ([[Greedy Equivalence Search (GES)]]): searches directly over CPDAGs (equivalence
  classes) rather than over DAGs, exploiting the score-equivalence property.
- **NOTEARS** ([[NOTEARS Algorithm]]): searches over the space of weighted adjacency matrices
  and produces a single DAG (not a CPDAG); post-hoc MEC identification is needed for
  comparison to constraint-based outputs.
- **d-separation** ([[Directed Acyclic Graphs]]): the fundamental criterion that determines
  whether two variables are CI given a set; MECs share their d-separation structure.
- **LiNGAM**: exploits non-Gaussianity to identify the full DAG beyond the MEC; in contrast
  to PC/GES which only return the CPDAG.

## See Also
- [[PC Algorithm]] — uses MEC theory to determine what can be output from CI tests
- [[Greedy Equivalence Search (GES)]] — searches the space of MECs using a score
- [[Constraint-Based Causal Discovery]] — overview of the constraint-based paradigm
- [[NOTEARS - Overview]] — continuous optimization alternative that outputs a single DAG
- [[Directed Acyclic Graphs]] — d-separation and DAG semantics
