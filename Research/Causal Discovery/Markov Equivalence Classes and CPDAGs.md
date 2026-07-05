---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "§1 — Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-07-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - Markov equivalence
  - CPDAG
  - essential graph
  - equivalence class of DAGs
  - MEC
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Observational data alone cannot distinguish between all DAGs — only between **Markov equivalence
> classes** (MECs): groups of DAGs that encode identical conditional independence relations. The
> **CPDAG** (Completed Partially Directed Acyclic Graph, also called the essential graph) is the
> unique representative of a MEC, with directed edges where all DAGs agree and undirected edges
> where they disagree. Both constraint-based (PC) and score-based (GES) causal discovery methods
> output CPDAGs, not DAGs. Understanding MECs is the prerequisite for any structure-learning method.

## Overview

When learning a causal DAG from observational data, a fundamental identifiability ceiling applies:
two DAGs that encode the same conditional independence (CI) relations generate identical probability
distributions (assuming the **Markov property**: d-separation implies conditional independence).
Because no statistical test on the distribution can tell these DAGs apart, the best any purely
observational method can achieve is identifying the **Markov equivalence class** of the true DAG.

This is not a limitation of any particular algorithm — it is an information-theoretic boundary.
Observational data can identify the equivalence class; further identification requires either
interventional data, background knowledge (edge constraints), or strong functional assumptions
(e.g., non-Gaussian noise as in LiNGAM).

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1990; Frydenberg, 1990)
> Two DAGs $G$ and $G'$ on the same vertex set are **Markov equivalent** if they encode the same
> set of **d-separation** relations: for all disjoint sets $X, Y, Z \subseteq V$,
> $$X \perp_G Y \mid Z \iff X \perp_{G'} Y \mid Z.$$
> Under the Markov property, Markov equivalence implies that $G$ and $G'$ generate identical
> families of distributions over the observed variables.
^def-markov-equivalence

> [!theorem] Theorem: Graphical Characterization of MECs (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (the same set of undirected adjacencies — the same edges, ignoring direction), AND
> 2. The same **v-structures** (unshielded colliders): triples $X \to Z \leftarrow Y$ where $X$ and
>    $Y$ are **not adjacent**.
>
> Note: a v-structure is **shielded** if $X$ and $Y$ are adjacent; shielded colliders do **not**
> affect Markov equivalence. Only unshielded colliders are diagnostic.
^thm-mec-characterization

> [!example] Example: Two Equivalent and One Non-Equivalent DAG
> **Setup.** Three variables: $X, Y, Z$.
>
> - $G_1$: $X \to Y \to Z$ (chain)
> - $G_2$: $X \leftarrow Y \to Z$ (fork at $Y$)
> - $G_3$: $X \to Y \leftarrow Z$ (v-structure at $Y$)
>
> **$G_1$ and $G_2$ are Markov equivalent:**
> - Same skeleton: $X - Y - Z$
> - No v-structures in either graph ($Y$ is not a collider in $G_1$ or $G_2$; in $G_1$ it's a chain;
>   in $G_2$ it's a fork)
> - Both encode: $X \perp Z \mid Y$ (but $X$ and $Z$ are dependent marginally)
>
> **$G_3$ is NOT equivalent to $G_1$ or $G_2$:**
> - Same skeleton, but $G_3$ has a v-structure at $Y$ (and $X, Z$ are not adjacent)
> - $G_3$ encodes: $X \perp Z$ marginally, but $X \not\perp Z \mid Y$ (conditioning on the collider
>   opens the path — Berkson's bias)
>
> **Implication:** From observational data, you can distinguish $G_3$ from $\{G_1, G_2\}$, but
> you cannot distinguish $G_1$ from $G_2$. The two chains of causation $X \to Y \to Z$ and
> $X \leftarrow Y \to Z$ are indistinguishable without intervention.
^ex-equivalence

### CPDAGs (Completed Partially Directed Acyclic Graphs)

> [!definition] Definition: CPDAG / Essential Graph (Andersson, Madigan & Perlman, 1997)
> The **CPDAG** (or **essential graph**) of a Markov equivalence class is the unique graph
> $H$ on the same vertex set satisfying:
> - **Directed edge** $X \to Y$ in $H$ iff $X \to Y$ appears in **every** DAG of the MEC.
> - **Undirected edge** $X - Y$ in $H$ iff both $X \to Y$ and $X \leftarrow Y$ appear in
>   **different** DAGs within the MEC (the orientation is not forced).
> - $H$ has no other edge types.
>
> Every MEC has a unique CPDAG. Structure learning algorithms (PC, GES) output CPDAGs.
^def-cpdag

> [!example] Example: CPDAG for the Three-Variable MEC
> - MEC: $\{G_1: X \to Y \to Z,\; G_2: X \leftarrow Y \to Z\}$
> - CPDAG: $X - Y \to Z$
>   - $Y \to Z$ is directed (same in both $G_1$ and $G_2$)
>   - $X - Y$ is undirected ($X \to Y$ in $G_1$, $X \leftarrow Y$ in $G_2$)
>
> The CPDAG tells us: "Z has Y as a parent, but whether X causes Y or Y causes X is
> unidentifiable from observational data."
^ex-cpdag

### Constructing a CPDAG: Meek's Rules

Given the skeleton and v-structures of a DAG $G$, the CPDAG is obtained by:
1. Orient all v-structures: if $X - Z - Y$ is unshielded and $Z \notin \text{sep}(X,Y)$, orient
   $X \to Z \leftarrow Y$.
2. Apply **Meek's four orientation rules** (Meek, 1995) repeatedly until no more edges can be oriented:

> [!theorem] Meek's Four Orientation Rules (Meek, 1995)
> Each rule propagates an orientation to prevent either a **new v-structure** or a **directed cycle**:
>
> **R1 (Prevent new v-structures):** If $Z \to X - Y$ and $Z$ and $Y$ are not adjacent:
> orient $X \to Y$.
> *Reason:* Leaving $X - Y$ allows $X \leftarrow Y$, creating a new v-structure $Z \to X \leftarrow Y$
> not in the original graph.
>
> **R2 (Prevent cycles):** If $X \to Z \to Y$ and $X - Y$:
> orient $X \to Y$.
> *Reason:* The orientation $X \leftarrow Y$ would create the cycle $X \to Z \to Y \leftarrow X$.
>
> **R3 (Unique sink):** If $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1$ and $Z_2$ not adjacent,
> and $X - Y$: orient $X \to Y$.
> *Reason:* Either $X \to Y$ or $X \leftarrow Y$; the latter forces both $Z_1$ and $Z_2$ to be
> non-colliders toward $Y$, creating new v-structures.
>
> **R4 (Chordal completion):** If $X - Z \to Y \to W$, $X - W$, $X$ not adjacent to $Y$:
> orient $X \to W$.
^thm-meek-rules

> [!note] Completeness of Meek's Rules
> Meek (1995) proved that R1–R4 are **complete**: applying them exhaustively from the skeleton
> + v-structures always produces the correct CPDAG. No additional rules are needed.

### Identifiability Beyond the MEC

Observational data can identify the full DAG (not just the MEC) under additional assumptions:
- **Non-Gaussian noise** (LiNGAM — Shimizu et al., 2006): if noise is non-Gaussian, the full
  DAG is identifiable even for linear SEMs.
- **Additive noise models** (ANM — Hoyer et al., 2009): $Y = f(X) + \varepsilon$ with $\varepsilon
  \perp X$ is generically identifiable under nonlinearity.
- **Interventional data**: conditioning on different intervention targets can break MEC symmetry.
- **Background knowledge / temporal ordering**: if causes precede effects in time, edge directions
  are known.

These are covered in the functional/causal model literature, not in PC or GES which remain
agnostic about the noise distribution.

## Connections

- **d-Separation and d-Connection** (see [[Directed Acyclic Graphs]]): the path-blocking rules
  (fork, chain, collider) define which conditional independences a DAG encodes. Markov equivalence
  is the equivalence relation induced by the same d-separation facts.
- **PC Algorithm** ([[PC Algorithm]]): outputs a CPDAG by discovering the skeleton and v-structures
  via CI tests, then applying Meek's rules. The MEC-characterization theorem is why PC can identify
  the MEC but not the full DAG.
- **GES** ([[GES - Greedy Equivalence Search]]): searches over the space of CPDAGs directly,
  making CPDAG the fundamental object of the search.
- **NOTEARS** ([[NOTEARS - Overview]]): avoids MEC reasoning by optimizing over the real matrix
  space — it outputs a fully directed DAG (not a CPDAG), at the cost of requiring a parametric
  linear SEM.
- **DAG Structure Learning Problem** ([[DAG Structure Learning Problem]]): the background note on
  score-based DAG learning where CPDAGs appear implicitly (FGS outputs a CPDAG, noted in the
  NOTEARS experiments).

## See Also
- [[Directed Acyclic Graphs]] — d-separation, fork/chain/collider; the semantics MECs are built on
- [[PC Algorithm]] — uses Theorem (Verma & Pearl) to orient edges from CI test results
- [[GES - Greedy Equivalence Search]] — searches CPDAG space directly
- [[DAG Structure Learning Problem]] — the score-based learning context
- [[Smooth Characterization of Acyclicity]] — NOTEARS's approach that bypasses MEC structure
- [[Spurious Association and Confounds]] — v-structures in practice (collider bias)
