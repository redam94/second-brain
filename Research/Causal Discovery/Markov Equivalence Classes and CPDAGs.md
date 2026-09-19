---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/constraint-score-based-sources.md]]"
source_location: "Verma & Pearl (1990); Chickering (2002), §2"
date_ingested: 2026-09-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalent DAGs"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they share the same **skeleton**
> (undirected adjacency structure) and the same **v-structures** (colliders $X \to Z \leftarrow Y$
> with $X \not\sim Y$). The equivalence class is canonically represented as a **CPDAG**
> — a graph with directed edges where all DAGs in the class agree, and undirected edges
> where they disagree. This concept is fundamental to causal discovery: both [[PC Algorithm]]
> (constraint-based) and [[GES - Greedy Equivalence Search]] (score-based) output a CPDAG,
> because data alone cannot distinguish DAGs within the same equivalence class.

## Overview

When learning a DAG from **observational data**, identifiability hits a ceiling: many
different DAGs can produce identical joint distributions. The set of all such "indistinguishable"
DAGs forms a **Markov equivalence class (MEC)**. Rather than trying to identify a single DAG
(impossible without additional assumptions or interventional data), causal discovery algorithms
aim to identify the MEC — which is already highly informative about causal structure.

## Main Content

### d-Separation and the Markov Property

> [!definition] Definition: d-Separation (Pearl 1988)
> In a DAG $G$, variables $X$ and $Y$ are **d-separated** by a set $Z$ (written $X \perp_G Y \mid Z$)
> if every path between $X$ and $Y$ is **blocked** by $Z$. A path $\pi$ is blocked by $Z$ if:
> 1. $\pi$ contains a **chain** $A \to C \to B$ or **fork** $A \leftarrow C \to B$ and $C \in Z$; or
> 2. $\pi$ contains a **collider** $A \to C \leftarrow B$ and $C \notin Z$ and no descendant of $C$ is in $Z$.
^def-dsep

> [!definition] Definition: Markov Property
> A distribution $\mathbb{P}$ over $(X_1, \ldots, X_d)$ **satisfies the Markov property**
> w.r.t. DAG $G$ if: every d-separation in $G$ implies conditional independence in $\mathbb{P}$,
> i.e. $X \perp_G Y \mid Z \Rightarrow X \perp_\mathbb{P} Y \mid Z$.
> Equivalently: each variable is independent of its non-descendants given its parents.
^def-markov

### Markov Equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $G$ and $G'$ are **Markov equivalent** if they encode exactly the same set of
> conditional independencies: for all disjoint sets $X, Y, Z$,
> $$X \perp_G Y \mid Z \iff X \perp_{G'} Y \mid Z.$$
> Equivalently: $G$ and $G'$ are Markov equivalent iff they have the same **skeleton** (same
> adjacency, ignoring edge directions) and the same **v-structures**.
^def-equiv

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $G$ is the undirected graph obtained by replacing every directed
> edge $X \to Y$ with an undirected edge $X - Y$.
^def-skeleton

> [!definition] Definition: V-Structure (Collider)
> A **v-structure** in a DAG $G$ is an ordered triple $(X, Z, Y)$ such that
> $X \to Z \leftarrow Y$ is a subgraph of $G$ and $X \not\sim Y$ (no edge between $X$ and $Y$).
> $Z$ is called a **collider** on the path $X - Z - Y$.
^def-vstructure

> [!theorem] Theorem: Characterization of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G$ and $G'$ over the same variables are **Markov equivalent** if and only if they
> have the same **skeleton** and the same **v-structures**.
>
> **Significance:** This gives a complete graphical characterization of the identifiability
> ceiling from observational data. The skeleton and collider structure are identifiable; the
> orientation of non-v-structure edges is not, in general.
^thm-verma-pearl

### CPDAGs: Canonical Representatives of MECs

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> A **CPDAG** (also called an *essential graph*) is a graph over $d$ variables with both
> directed ($\to$) and undirected ($-$) edges such that:
> 1. It represents a unique MEC: the set of DAGs consistent with its skeleton and v-structures.
> 2. A directed edge $X \to Y$ appears in the CPDAG iff $X \to Y$ in **every** DAG in the MEC
>    (i.e., the edge direction is **compelled**).
> 3. An undirected edge $X - Y$ appears iff the edge can be oriented in either direction
>    consistent with membership in the MEC (i.e., the edge direction is **reversible**).
>
> Every MEC has a unique CPDAG. Every CPDAG represents exactly one MEC.
^def-cpdag

### From a DAG to its CPDAG: Meek's Algorithm

Given any DAG $G$, its CPDAG is computed in three steps:

1. **Extract the skeleton**: replace all directed edges with undirected edges.
2. **Orient v-structures**: for each triple $X - Z - Y$ with $X \not\sim Y$,
   if $Z$ is a collider in $G$ ($X \to Z \leftarrow Y$), orient $X \to Z \leftarrow Y$ in the CPDAG.
3. **Apply Meek's orientation rules** (R1–R4, Meek 1995) until no more edges can be oriented:

> [!theorem] Meek's Orientation Rules (Meek 1995)
> The following four rules orient edges without introducing new v-structures or directed cycles.
> Apply them exhaustively and in any order.
>
> **R1 (no new v-structure):** If $X \to Z - Y$ and $X \not\sim Y$, orient $Z \to Y$.  
> *Reason: if $Z - Y$ stayed undirected and could become $Z \leftarrow Y$, then $X \to Z \leftarrow Y$
> would be a new v-structure contradicting the MEC.*
>
> **R2 (acyclicity):** If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$.  
> *Reason: orienting $X \leftarrow Y$ would create the cycle $X \to Z \to Y \to X$.*
>
> **R3 (unique collider):** If $W - X \to Y$, $W - Z \to Y$, $W - Y$, and $X \not\sim Z$,
> orient $W \to Y$.  
> *Reason: either $W \to X$ or $W \to Z$ must hold; in either case $W \to Y$ follows.*
>
> **R4 (discriminating path):** If $W - X \to Y \to Z$, $W - Z$, and $W \not\sim Y$,
> orient $X \to Y \to Z$ (confirming $Y$ as a collider on the discriminating path from $W$ to $Z$).
^thm-meek-rules

### Faithfulness Assumption

Both PC and GES (and almost all causal discovery algorithms) require:

> [!definition] Definition: Causal Faithfulness
> Distribution $\mathbb{P}$ is **faithful** to DAG $G$ if: the only conditional independencies
> in $\mathbb{P}$ are those implied by d-separation in $G$.
> $$X \perp_\mathbb{P} Y \mid Z \Rightarrow X \perp_G Y \mid Z.$$
> Faithfulness fails when "accidental" path cancellations make two variables independent despite
> being connected in the DAG (e.g. two paths with equal-and-opposite effects).
^def-faithfulness

Under faithfulness, the CI relations in data exactly identify the MEC of the true DAG —
making structure learning in principle possible.

## Connections

- **NOTEARS** (see [[NOTEARS - Overview]]) searches over the space of **weighted adjacency matrices**
  $W \in \mathbb{R}^{d \times d}$ rather than equivalence classes — it returns a single DAG
  (not a CPDAG), optimizing the continuous program $\min F(W)$ s.t. $h(W)=0$.
- **PC algorithm** uses conditional independence tests to discover the skeleton and v-structures,
  then applies Meek rules to produce a CPDAG — see [[PC Algorithm]].
- **GES** searches directly over CPDAGs (equivalence classes) using a scoring criterion —
  see [[GES - Greedy Equivalence Search]].
- **Directed Acyclic Graphs** in [[Directed Acyclic Graphs]] covers d-separation and the
  do-calculus from the econometric causal inference perspective. CPDAGs arise there when
  discussing which directions are and are not identifiable from observational data.

## See Also
- [[DAG Structure Learning Problem]] — the formal problem setup that PC and GES solve
- [[PC Algorithm]] — learns a CPDAG via conditional independence tests
- [[GES - Greedy Equivalence Search]] — learns a CPDAG via score optimization
- [[NOTEARS - Overview]] — continuous optimization approach; outputs a single DAG
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, causal DAG semantics
