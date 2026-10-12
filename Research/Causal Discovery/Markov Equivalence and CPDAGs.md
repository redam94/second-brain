---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/causal-structure-learning-sources.md]]"
source_location: "Verma & Pearl (1990) UAI; Meek (1995) UAI; Chickering (2002) JMLR §2"
date_ingested: 2026-10-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "Equivalence class of DAGs"
---

# Markov Equivalence and CPDAGs

> [!summary]
> **Observational data cannot distinguish between all DAGs** — many DAGs encode the
> same conditional independence (CI) structure and are therefore **Markov equivalent**.
> A **Markov equivalence class** (MEC) groups all such indistinguishable DAGs, and is
> uniquely represented by a **CPDAG** (Completed Partially Directed Acyclic Graph) —
> a graph with directed edges where every DAG in the class agrees on direction, and
> undirected edges where direction cannot be determined from data alone.
> The Verma-Pearl theorem shows that two DAGs are Markov equivalent **if and only if**
> they share the same **skeleton** (undirected structure) and the same set of
> **v-structures** (unshielded colliders). This is the fundamental target of both
> [[PC Algorithm]] and [[GES Algorithm]].

## Overview

Structure learning from observational i.i.d. data cannot recover the full DAG — it
can only recover the equivalence class of DAGs that are consistent with the data's
conditional independence structure. Both major families of structure-learning algorithms
(constraint-based and score-based) therefore target the **CPDAG**, not a specific DAG.

This has important consequences: some causal directions are **identifiable** from data
(directed edges in the CPDAG), while others are **fundamentally unidentifiable** without
interventional data or additional assumptions (undirected edges in the CPDAG).

## Main Content

### Markov compatibility

> [!definition] Definition: Markov compatible DAG (d-separation faithfulness)
> A DAG $\mathcal{G}$ over variables $\mathbf{V}$ is **Markov compatible** with distribution
> $\mathbb{P}$ if every **d-separation** statement in $\mathcal{G}$ corresponds to a conditional
> independence in $\mathbb{P}$:
> $$X \perp_{\mathcal{G}} Y \mid \mathbf{Z} \;\Longrightarrow\; X \perp_{\mathbb{P}} Y \mid \mathbf{Z}.$$
> Under the **faithfulness assumption** (Spirtes et al. 2000), the converse also holds:
> every CI in $\mathbb{P}$ is captured by some d-separation in $\mathcal{G}$.
^def-markov-compat

The faithfulness assumption is crucial: it ensures the data is **informative** about the
causal structure, so the CI tests used by the PC algorithm can reliably recover edges.

### Markov equivalence

> [!definition] Definition: Markov equivalence (Verma & Pearl, 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same variable set are **Markov
> equivalent** if they encode exactly the same set of conditional independence relations —
> i.e., for all disjoint $\mathbf{X}, \mathbf{Y}, \mathbf{Z}$:
> $$X \perp_{\mathcal{G}_1} Y \mid \mathbf{Z} \;\iff\; X \perp_{\mathcal{G}_2} Y \mid \mathbf{Z}.$$
> The **Markov equivalence class (MEC)** of $\mathcal{G}$ is the set of all DAGs Markov
> equivalent to $\mathcal{G}$.
^def-markov-equiv

### The Verma-Pearl characterisation theorem

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are Markov equivalent **if and only if** they
> have the same:
> 1. **Skeleton** — the same set of undirected edges (ignoring directions), and
> 2. **V-structures** — the same set of unshielded colliders.
>
> A **v-structure** (unshielded collider) is a triple $X \to Z \leftarrow Y$ where
> there is **no** edge between $X$ and $Y$.
^thm-verma-pearl

> [!note] Why v-structures are identifiable
> A v-structure $X \to Z \leftarrow Y$ induces $X \perp Y$ marginally but
> $X \not\perp Y \mid Z$ (conditioning on the collider $Z$ opens the path).
> The reverse orientation $X \leftarrow Z \rightarrow Y$ induces the opposite pattern.
> This asymmetry makes v-structures **uniquely detectable** from conditional independence
> tests — and is why skeleton + v-structures fully characterize the MEC.

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (also called the **essential graph**) is the unique graph that
> represents a Markov equivalence class:
> - A **directed edge** $X \to Y$ appears in the CPDAG iff *every* DAG in the MEC
>   has the edge $X \to Y$ (all agree on direction).
> - An **undirected edge** $X - Y$ appears in the CPDAG iff there exist two DAGs in the
>   MEC, one with $X \to Y$ and one with $X \leftarrow Y$.
>
> Every CPDAG is a **valid partial DAG**: it is acyclic and any completion of the
> undirected edges into directed ones that preserves the v-structure set yields a
> valid DAG in the MEC.
^def-cpdag

> [!example] Example: Small 3-node MEC
> Consider three variables $X, Y, Z$. The DAGs $X \to Y \to Z$ and $X \leftarrow Y \to Z$
> and $X \to Y \leftarrow Z$ are **not** Markov equivalent:
> - $X \to Y \to Z$: skeleton $X\!-\!Y\!-\!Z$, no v-structures → CPDAG: $X\!-\!Y\!-\!Z$
> - $X \leftarrow Y \to Z$: skeleton $X\!-\!Y\!-\!Z$, no v-structures → same CPDAG
> - $X \to Y \leftarrow Z$: skeleton $X\!-\!Y\!-\!Z$, v-structure $X \to Y \leftarrow Z$ → CPDAG: $X \to Y \leftarrow Z$
>
> So the first two DAGs are Markov equivalent (same MEC, CPDAG is $X\!-\!Y\!-\!Z$),
> but the third is in its own MEC.

### Meek's orientation rules

After identifying v-structures, additional edges can sometimes be oriented without
introducing new v-structures or creating cycles. Meek (1995) proved that four rules
suffice:

> [!theorem] Meek's Orientation Rules R1–R4 (Meek, 1995)
> Given a partially oriented graph (after v-structure identification), apply:
>
> **R1** (*Away from collider*): $X \to Y - Z$ with no edge $X\!-\!Z$ → orient as $X \to Y \to Z$.
> *(Orienting $Z \to Y$ would create a new v-structure.)*
>
> **R2** (*Away from cycle*): $X \to Z \to Y$ and $X - Y$ → orient as $X \to Y$.
> *(Orienting $Y \to X$ would create a directed cycle.)*
>
> **R3** (*Double-triangle*): $X - Z \to Y$, $X - W \to Y$, $X - Y$, no $Z\!-\!W$ edge →
> orient as $X \to Y$.
> *(Orienting $Y \to X$ would force $X$ between two colliders inconsistently.)*
>
> **R4** (*Discriminating path*): more complex; applies when a longer path forces
> an orientation to avoid new v-structures.
>
> Apply R1–R4 **exhaustively** (until no new orientations are possible). The result
> is the CPDAG.
^thm-meek-rules

## Connections

- **Score-based methods (GES)**: search directly in the space of CPDAGs, using a scoring
  function (BIC) that is constant across a Markov equivalence class — see [[GES Algorithm]].
- **Constraint-based methods (PC)**: identify the CPDAG by first recovering the skeleton
  via CI tests, then orienting v-structures, then applying Meek rules — see [[PC Algorithm]].
- **NOTEARS**: the NOTEARS paper (Zheng et al. 2018) focuses on recovering the **DAG** (not
  just the CPDAG) by exploiting the linear SEM assumption; see [[NOTEARS - Overview]].
- **Interventional identifiability**: with interventional data, some undirected CPDAG edges
  can be resolved, leading to an **I-MEC** (interventional Markov equivalence class).
- **Faithfulness assumption**: in [[DAG Structure Learning Problem]], the landscape table notes
  that PC is "constraint-based (PC, [Spirtes & Glymour, 1991]) | conditional-independence tests."
  The faithfulness assumption underlying this is discussed in [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm]] — uses skeleton + v-structures + Meek rules to construct the CPDAG
- [[GES Algorithm]] — searches over CPDAGs using a decomposable score
- [[DAG Structure Learning Problem]] — problem setup; landscape of methods
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, back-door criterion
- [[Smooth Characterization of Acyclicity]] — algebraic handle on the acyclicity constraint
