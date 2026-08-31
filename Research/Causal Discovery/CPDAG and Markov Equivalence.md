---
title: "CPDAG and Markov Equivalence Classes"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Chs. 2–3; Meek (1995); Verma & Pearl (1990)"
date_ingested: 2026-08-31
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "essential graph"
---

# CPDAG and Markov Equivalence Classes

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode exactly the same set of
> conditional independence relations — i.e., they have the same **skeleton** (undirected
> adjacency structure) and the same **v-structures** (unshielded colliders). The **CPDAG**
> (Completed Partially Directed Acyclic Graph) is the unique canonical representative of a
> Markov equivalence class: compulsory edges (present in every member DAG) are directed,
> reversible edges are shown undirected. Since observational data alone cannot distinguish
> between Markov-equivalent DAGs, the CPDAG is the finest causal structure identifiable
> without interventions.

## Overview

Score-based DAG learning (see [[DAG Structure Learning Problem]]) optimizes a score such as
BIC over graphs. A fundamental problem: multiple distinct DAGs can receive *exactly the same*
score for any data distribution consistent with the model. These score-equivalent DAGs
form a **Markov equivalence class**, and no observational data — however large — can
distinguish among them. All constraint-based and score-based causal discovery algorithms
therefore target the equivalence class, not a single DAG.

The CPDAG is the unique directed / partially-directed graph that compactly represents this
class. It was introduced independently by Verma & Pearl (1990) and studied by Meek (1995),
and serves as the output format for both the [[PC Algorithm - Overview]] and
[[GES - Greedy Equivalence Search]].

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same vertex set $V$ are **Markov equivalent** if they
> imply the same conditional independence relations under the global Markov condition:
> for every triple of disjoint sets $A, B, C \subseteq V$,
> $$A \perp\!\!\!\perp_G B \mid C \iff A \perp\!\!\!\perp_{G'} B \mid C.$$
> Equivalently (Verma & Pearl 1990):
> $G_1 \sim G_2$ if and only if $G_1$ and $G_2$ have the same **skeleton** and the same
> **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ with $X$–$Y$ non-adjacent).
^def-markov-equiv

> [!theorem] Theorem: Characterisation of Markov Equivalence (Verma & Pearl 1990)
> Let $G_1$ and $G_2$ be two DAGs over $V$. Then $G_1$ and $G_2$ are Markov equivalent
> if and only if:
> 1. **Same skeleton**: $\{i,j\} \in E(G_1) \iff \{i,j\} \in E(G_2)$, and
> 2. **Same v-structures**: $X \to Z \leftarrow Y$ is a v-structure in $G_1$ iff it is
>    a v-structure in $G_2$.
^thm-markov-equiv

**Intuition**: Both conditions are necessary. The skeleton condition says the same pairs are
adjacent; the v-structure condition says the same "unshielded colliders" appear. Two DAGs
can share a skeleton but differ in orientation — but those different orientations either
create/destroy a v-structure (distinguishable) or correspond to a reversible edge (not
distinguishable).

### V-Structures (Unshielded Colliders)

> [!definition] Definition: V-structure
> A **v-structure** (also called an **unshielded collider** or **immorality**) in a DAG $G$
> is a triple $X \to Z \leftarrow Y$ such that $X$ and $Y$ are **not adjacent** in $G$.
> The variable $Z$ is the **collider** on the path $X - Z - Y$.
>
> Contrast: if $X$ and $Y$ *are* adjacent (forming a "shielded collider"), the triple is
> not a v-structure and the edge orientation at $Z$ may be reversible.
^def-vstructure

V-structures are **identifiable from data**: they are the only collider patterns that are
not conditional-independence-equivalent to another orientation, because conditioning on $Z$
opens (activates) the path $X - Z - Y$ in a v-structure, whereas conditioning on a chain
$X \to Z \to Y$ or fork $X \leftarrow Z \to Y$ blocks it.

### CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $\mathcal{C}(G)$ of a DAG $G$ is the unique partially directed graph over
> $V$ such that:
> 1. $X \to Y$ is directed in $\mathcal{C}(G)$ iff $X \to Y$ in **every** DAG Markov
>    equivalent to $G$ (i.e., the edge is compulsory / non-reversible).
> 2. $X - Y$ is undirected in $\mathcal{C}(G)$ iff $X \to Y$ in **some** but not all
>    DAGs equivalent to $G$ (i.e., the edge is reversible).
>
> $\mathcal{C}(G)$ is also called the **essential graph** of the equivalence class.
^def-cpdag

> [!theorem] Theorem: CPDAG Existence and Uniqueness (Meek 1995)
> Every Markov equivalence class has a unique CPDAG. The CPDAG can be constructed from any
> member DAG $G$ by:
> 1. Retaining all v-structures as directed edges.
> 2. Applying Meek's four orientation rules (R1–R4) to propagate orientations forced by
>    acyclicity + existing v-structures.
> 3. Leaving all remaining edges undirected.
>
> The resulting graph is the unique representation of the equivalence class.
^thm-cpdag-unique

### Meek's Orientation Rules

After fixing v-structures, the following four rules (Meek 1995) orient additional edges
without creating new v-structures or introducing directed cycles:

> [!definition] Meek Orientation Rules (R1–R4)
>
> **R1 (Away from collider):** If $\alpha \to \beta - \gamma$ and $\alpha \not\sim \gamma$,
> then orient $\beta \to \gamma$.
> *Reason*: otherwise $\alpha \to \beta \leftarrow \gamma$ would be a new v-structure.
>
> **R2 (Away from cycle):** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$,
> then orient $\alpha \to \gamma$.
> *Reason*: otherwise orienting $\gamma \to \alpha$ creates a directed cycle.
>
> **R3 (Double triangle):** If $\alpha - \beta$, $\alpha - \gamma_1$, $\alpha - \gamma_2$,
> $\gamma_1 \to \beta$, $\gamma_2 \to \beta$, $\gamma_1 \not\sim \gamma_2$,
> then orient $\alpha \to \beta$.
>
> **R4 (Zhangs's rule):** If $\alpha - \beta$, $\alpha - \gamma$, $\gamma \to \delta \to \beta$,
> $\alpha \not\sim \delta$, then orient $\alpha \to \beta$.
>
> Meek (1995) proved that rules R1–R3 are sufficient for DAG models (R4 is needed for
> maximal ancestral graphs / FCI).
^def-meek-rules

### What Cannot Be Identified from Observational Data

A key corollary: if a DAG $G$ has an equivalence class containing more than one member, then
observational data alone — no matter how large the sample — cannot determine the true
orientation of reversible edges. For example:

$$X \to Y \to Z \qquad \text{vs} \qquad X \leftarrow Y \leftarrow Z \qquad \text{vs} \qquad X \leftarrow Y \to Z$$

All three are Markov equivalent (same skeleton $X - Y - Z$, no v-structure) and cannot be
distinguished without interventions or structural assumptions (non-Gaussianity, non-linearity).

## Connections

- **Constraint-based algorithms** ([[PC Algorithm - Overview]]) output a CPDAG directly:
  the skeleton + oriented v-structures + Meek rules.
- **Score-based algorithms** ([[GES - Greedy Equivalence Search]]) search the space of
  CPDAGs, using scores that are constant within an equivalence class.
- **NOTEARS** ([[NOTEARS - Overview]]) estimates a *single DAG* $W$ rather than a CPDAG —
  its output implicitly assumes the true DAG is identifiable (e.g., non-Gaussian noise).
- **Interventional data** breaks Markov equivalence: intervening on $Z$ in $X \to Z \leftarrow Y$
  reveals both parents, allowing orientation of edges that are reversible under observation.
- **Non-Gaussian LiNGAM** (Shimizu et al. 2006): if noise is non-Gaussian, the full DAG (not
  just the equivalence class) is identifiable from observational data.

## See Also
- [[DAG Structure Learning Problem]] — the general score-based formulation
- [[PC Algorithm - Overview]] — constraint-based algorithm returning a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm returning a CPDAG
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, Markov condition
- [[Spurious Association and Confounds]] — causal DAG reasoning in the econometric context
