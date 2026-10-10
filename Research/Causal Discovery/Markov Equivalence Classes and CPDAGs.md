---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis2014-PC-source.md]]"
source_location: "§2.1 (Colombo & Maathuis 2014); Meek (1995)"
date_ingested: 2026-10-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalence"
  - "Meek orientation rules"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independence
> relations — they are statistically indistinguishable from observational data alone. A **CPDAG**
> (Completed Partially Directed Acyclic Graph) is the unique graphical representation of a
> Markov equivalence class: edges that must be directed the same way in every DAG in the class
> are shown directed; edges that can point either way are shown undirected. CPDAGs are the
> natural output of constraint-based (PC) and score-based (GES) structure learning algorithms.

## Overview

Structural causal learning from observational data faces a fundamental identifiability limit:
multiple DAGs can imply exactly the same joint distribution. A **Markov equivalence class (MEC)**
is the set of all DAGs indistinguishable by observational data. Without additional assumptions
(non-Gaussianity, functional form restrictions), the best an algorithm can identify is *which
equivalence class* the true DAG belongs to — not the specific DAG. The CPDAG is the compact
canonical representation of an equivalence class, encoding what *is* identifiable as directed
edges and what is *not* as undirected edges.

This is why [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]] both output CPDAGs rather
than DAGs.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990; Chickering 1995)
> Two DAGs $G_1$ and $G_2$ over the same node set $V$ are **Markov equivalent** if they have
> the same **skeleton** (same adjacencies, ignoring edge directions) and the same **v-structures**
> (same unshielded colliders $X \to Z \leftarrow Y$ with $X$ and $Y$ non-adjacent).
>
> Equivalently: $G_1 \sim G_2$ if and only if every CI statement implied by $G_1$ is also
> implied by $G_2$ and vice versa (same d-separation relations).
^def-markov-equiv

The key result is that two simple graphical features — skeleton and v-structures — completely
characterize equivalence. There is no need to compare all implied CI statements.

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if:
> 1. They have the same **skeleton** (undirected adjacency structure), and
> 2. They have the same set of **v-structures**: triples $(X, Z, Y)$ where
>    $X \to Z \leftarrow Y$ and $X$ and $Y$ are not adjacent.
^thm-equiv-characterization

### V-structures (unshielded colliders)

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** (or **unshielded collider**) in a DAG is a triple of nodes $(X, Z, Y)$
> such that:
> - $X \to Z$ and $Y \to Z$ (Z is a collider on the path $X - Z - Y$), and
> - $X$ and $Y$ are **not** adjacent (the collider is "unshielded").
>
> Contrast with a **shielded collider**: $X \to Z \leftarrow Y$ with $X - Y$ adjacent — this
> is *not* a v-structure because the shield prevents it from encoding a unique CI.
^def-v-structure

V-structures are the *only* edges that can be consistently oriented from observational data
without additional assumptions. All other edges are in principle reversible within the equivalence class.

### CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a Markov equivalence class $[G]$ is the unique graph $\mathcal{C}$ over
> the same node set where:
> - **Directed edge** $X \to Y \in \mathcal{C}$: every DAG in $[G]$ contains the edge $X \to Y$
>   (the direction is forced by the equivalence class structure).
> - **Undirected edge** $X - Y \in \mathcal{C}$: the class $[G]$ contains both a DAG with
>   $X \to Y$ and a DAG with $X \leftarrow Y$ (direction is not identifiable).
>
> The CPDAG is the **unique representative** of its equivalence class: two CPDAGs are the same
> if and only if they represent the same equivalence class.
^def-cpdag

Every DAG has a CPDAG (its equivalence class representative), and every CPDAG represents at
least one DAG. CPDAGs are sometimes called **essential graphs** in older literature.

### Meek orientation rules

Given a skeleton and its v-structures, additional edges can often be oriented without
introducing new v-structures or cycles. **Meek (1995)** identified four deterministic rules:

> [!theorem] Theorem: Meek Orientation Rules (Meek 1995)
> Given a PDAG $\mathcal{P}$ (partially directed acyclic graph) consistent with an equivalence
> class, apply these rules exhaustively to obtain the CPDAG:
>
> **R1** (Away from v-structure):
> If $\alpha \to \beta - \gamma$ and $\alpha$ and $\gamma$ are non-adjacent, orient $\beta \to \gamma$.
> (Orienting $\beta \leftarrow \gamma$ would create a new v-structure $\alpha \to \beta \leftarrow \gamma$.)
>
> **R2** (Away from cycle):
> If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$ is undirected, orient $\alpha \to \gamma$.
> (Orienting $\alpha \leftarrow \gamma$ would create a directed cycle $\alpha \to \beta \to \gamma \to \alpha$.)
>
> **R3** (Double triangle):
> If $\alpha - \gamma$, $\beta - \gamma$, $\alpha - \beta$, and also $\alpha \to \mu \leftarrow \beta$
> with $\mu - \gamma$ undirected and $\gamma$ non-adjacent to $\mu$, orient $\gamma \to \mu$.
>
> **R4** (Complete rule set):
> If $\alpha \to \beta - \gamma$ with $\alpha \to \mu \to \gamma$, $\alpha - \gamma$, and
> $\beta - \mu$, orient $\beta \to \gamma$.
>
> **Completeness (Meek 1995):** Rules R1–R4 are sound (preserve equivalence) and complete
> (orient every edge that can be determined without arbitrary choice). Applying them exhaustively
> converts a skeleton + v-structures into the full CPDAG.
^thm-meek-rules

In practice, most real datasets only trigger R1 and R2; R3 and R4 are rarer.

### How many DAGs per equivalence class?

An equivalence class can contain as few as one DAG (a DAG all of whose edges are directed in the
CPDAG — this happens when every undirected component is a complete graph with a unique perfect
elimination ordering) or as many as $O(2^{d^2})$ DAGs. In sparse real networks, equivalence
classes tend to be small.

### Faithful extension

> [!definition] Definition: Faithful extension
> A DAG $G$ is a **faithful extension** of a CPDAG $\mathcal{C}$ if:
> 1. $G$ belongs to the equivalence class of $\mathcal{C}$, and
> 2. Every directed edge in $\mathcal{C}$ is directed the same way in $G$.
>
> Any CPDAG has at least one faithful extension, and it can be found in linear time
> (Dor & Tarsi 1992).
^def-faithful-extension

## Examples

> [!example] Example: Three-node DAGs and their equivalence classes
> Consider three nodes $X, Y, Z$ with one directed path $X \to Y \to Z$ (no direct $X - Z$ edge).
>
> **DAGs in the same MEC:**
> - $X \to Y \to Z$
> - $X \leftarrow Y \to Z$
> - $X \leftarrow Y \leftarrow Z$
>
> These three all imply $X \perp Z \mid Y$ and have the same skeleton $X - Y - Z$.
> None has a v-structure (Z is not a collider with X non-adjacent to Z... wait: actually X and Z
> ARE non-adjacent but in $X \to Y \to Z$ the orientation at Y is *away* not *toward*, so no
> v-structure). So all three are in the same class.
>
> **CPDAG:** $X - Y - Z$ (both edges undirected) — neither direction is identifiable.
>
> **Contrast:** $X \to Y \leftarrow Z$ with $X$ and $Z$ non-adjacent. This IS a v-structure.
> It is in a singleton equivalence class: its CPDAG has both edges directed $X \to Y \leftarrow Z$.

## Connections

- **Causal identifiability**: the CPDAG is the *most* that observational data can tell you about
  a causal DAG. Moving from CPDAG to DAG requires interventional data, temporal ordering
  assumptions, or non-Gaussianity assumptions (e.g., LiNGAM exploits non-Gaussianity to
  identify the full DAG).
- **PC algorithm output**: [[PC Algorithm]] recovers the skeleton and v-structures, then applies
  Meek rules to get the CPDAG.
- **GES output**: [[Greedy Equivalence Search (GES)]] searches directly over CPDAGs (equivalence
  classes as states), and its forward/backward phases produce a CPDAG.
- **NOTEARS output**: [[NOTEARS Algorithm]] outputs a DAG (a specific member of an equivalence
  class), not the CPDAG — because it optimizes over the space of weighted adjacency matrices,
  not equivalence classes.
- **Do-calculus**: [[Directed Acyclic Graphs]] covers d-separation and the back-door criterion;
  these apply to specific DAGs. The CPDAG encodes which interventional distributions are
  identified across the whole class.

## See Also
- [[PC Algorithm]] — recovers CPDAG via CI testing
- [[Greedy Equivalence Search (GES)]] — searches over CPDAGs using score operators
- [[DAG Structure Learning Problem]] — the general problem setting (score-based view)
- [[Directed Acyclic Graphs]] — d-separation, causal semantics
- [[NOTEARS - Overview]] — continuous optimization approach that outputs a single DAG
