---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-causal-structure-learning-survey.md]]"
source_location: "§1 — Spirtes, Glymour & Scheines (2000) Ch. 3; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-07-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[Causal Discovery Algorithms - Comparison]]"
aliases:
  - CPDAG
  - essential graph
  - Markov equivalence class
  - MEC
  - "Verma-Pearl theorem"
---

# Markov Equivalence and CPDAGs

> [!summary]
> **Markov equivalence** is the fundamental identifiability ceiling for causal discovery from
> observational data: two DAGs are equivalent if and only if they encode the same conditional
> independence (CI) relations. The unique graphical representation of a Markov equivalence class
> (MEC) is the **CPDAG** (Completed Partially Directed Acyclic Graph, also called "essential graph"),
> where directed edges are those that point the same way in *every* member of the class. The
> Verma-Pearl theorem characterises MECs via skeleton + v-structures, and Meek's four orientation
> rules complete the CPDAG from those two ingredients.

## Overview

A central negative result motivates all structure-learning algorithms: **observational data
alone cannot distinguish two DAGs that encode the same set of conditional independence relations**.
Both the [[PC Algorithm]] (constraint-based) and [[Greedy Equivalence Search]] (score-based)
are designed to output the MEC rather than a single DAG, because that is the best achievable
guarantee from i.i.d. observational data without non-Gaussianity or interventional assumptions.

This is in contrast to [[NOTEARS Algorithm|NOTEARS]], which outputs a single DAG by combining
the score with the continuous acyclicity constraint. Under non-Gaussianity, LiNGAM-style methods
can break MEC ambiguity and recover the full DAG — but the CPDAG is the general answer.

## Main Content

### Markov condition and faithfulness

> [!definition] Markov Condition
> A distribution $\mathbb{P}$ satisfies the **Markov condition** with respect to DAG $G$ if
> every variable $X_j$ is independent of all its non-descendants given its parents in $G$:
> $$X_j \perp\!\!\!\perp \mathrm{NonDesc}(X_j) \;\big|\; \mathrm{pa}_G(X_j).$$
> Equivalently, $\mathbb{P}$ factorises as $p(X) = \prod_{j=1}^{d} p(X_j \mid \mathrm{pa}_G(X_j))$.
^def-markov

> [!definition] Faithfulness Assumption
> $\mathbb{P}$ is **faithful** to $G$ if *all* CI relations in $\mathbb{P}$ are entailed by
> d-separation in $G$ — no CI arises from canceling path coefficients. Formally: $X \perp\!\!\!\perp Y \mid Z$ in $\mathbb{P}$ implies $Z$ d-separates $X$ from $Y$ in $G$.
>
> **Why it matters**: under faithfulness, a CI test tells us exactly what the graph structure
> is. Without faithfulness, a zero partial correlation might exist despite an open d-connected
> path — making CI-based inference unreliable.
^def-faithfulness

### Key concepts: skeleton and v-structures

> [!definition] Skeleton
> The **skeleton** of a DAG $G$ is the undirected graph $\mathrm{skel}(G)$ obtained by replacing
> every directed edge $X \to Y$ with an undirected edge $X - Y$.
^def-skeleton

> [!definition] V-structure (Immorality)
> A **v-structure** (or *immorality*) in DAG $G$ is an ordered triple $(X, Z, Y)$ such that:
> 1. $X \to Z$ and $Y \to Z$ are edges in $G$ (Z is a collider), AND
> 2. There is **no** edge between $X$ and $Y$ (the triple is *unshielded*).
>
> V-structures create the distinctive "explaining away" patterns in probabilistic reasoning:
> $X$ and $Y$ are marginally independent but become dependent when $Z$ (or a descendant) is
> conditioned on — collider bias / Berkson's bias.
^def-vstructure

### The Verma-Pearl characterisation theorem

> [!theorem] Verma-Pearl Theorem (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** (encode the same CI relations) if and
> only if:
> 1. $\mathrm{skel}(G_1) = \mathrm{skel}(G_2)$ — same skeleton, AND
> 2. $G_1$ and $G_2$ have the same **v-structures**.
>
> **Proof direction (⇒)**: If two DAGs have the same skeleton and v-structures, they have the
> same d-separations — by the characterisation of d-separation via Bayes Balls / active paths.
> Different v-structures would produce different d-separations.
>
> **Significance**: This reduces the infinite-dimensional equivalence question to checking a
> finite combinatorial property of the graph.
^thm-verma-pearl

### The CPDAG (essential graph)

> [!definition] CPDAG — Completed Partially Directed Acyclic Graph
> The **CPDAG** (also called *essential graph*) of a Markov equivalence class is the unique
> partially directed graph $\mathcal{C}$ in which:
> - An edge $X \to Y$ is **directed** in $\mathcal{C}$ iff it is directed $X \to Y$ in *every*
>   DAG belonging to the MEC (a "compelled" edge).
> - An edge $X - Y$ is **undirected** in $\mathcal{C}$ iff there exist members of the MEC with
>   the edge oriented in each direction.
>
> Every CPDAG is a valid acyclic partially directed graph (APDAG): it contains no directed cycles
> and no purely undirected cycles either (a chain graph condition).
^def-cpdag

**Algorithm to construct the CPDAG from a DAG $G$**:
1. Find all v-structures in $G$; orient them (these are compelled).
2. Apply Meek's orientation rules R1–R3 iteratively until no more edges can be oriented.
3. All remaining undirected edges are reversible within the MEC.

### Meek's orientation rules

> [!theorem] Meek's Orientation Rules R1–R3 (Meek 1995)
> Given a partially directed graph, apply these rules until convergence to propagate orientations
> without creating new v-structures or directed cycles:
>
> **R1** (Away from collider): If $Z \to X - Y$ and $Z$ is not adjacent to $Y$, orient $X \to Y$.
> *(Otherwise $Z \to X \leftarrow Y$ would be a new v-structure not in the original DAG.)*
>
> **R2** (Away from cycle): If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$.
> *(Otherwise the undirected edge combined with the directed path creates an almost-cycle.)*
>
> **R3** (Double-triangle): If $X - Z_1 \to Y$ and $X - Z_2 \to Y$ with $Z_1$ not adjacent to $Z_2$,
> and $X - Y$, orient $X \to Y$.
^thm-meek-rules

### What the CPDAG tells us (and doesn't)

| Feature | Determined from observational data? |
|---------|-------------------------------------|
| Skeleton (which pairs are adjacent) | Yes |
| V-structures (unshielded colliders) | Yes |
| Compelled directed edges (from Meek rules) | Yes |
| Reversible undirected edges | **No** — need interventions or non-Gaussian assumptions |
| Full DAG within the MEC | **No** in general |

## Examples

> [!example] CPDAG with undirected edges
> **Setup**: True DAG $G_1: X \to Z \to Y$ and $G_2: X \leftarrow Z \to Y$ are both Markov
> equivalent (same skeleton $\{X-Z, Z-Y\}$, same v-structures: none). Observational data alone
> cannot distinguish whether $X$ causes $Z$ or $Z$ causes $X$.
>
> **CPDAG**: $X - Z - Y$ (both edges undirected). Only interventional data (do($X$=x)) can
> distinguish $G_1$ from $G_2$.

> [!example] V-structure pins an orientation
> **Setup**: Three DAGs on nodes $X, Z, Y$:
> - $G_1: X \to Z \leftarrow Y$ (v-structure at $Z$)
> - $G_2: X \leftarrow Z \to Y$ (fork at $Z$)
> - $G_3: X \to Z \to Y$ (chain)
>
> $G_1$ is NOT equivalent to $G_2$ or $G_3$: $G_1$ has a v-structure, $G_2$ and $G_3$ do not.
> $G_2$ and $G_3$ ARE equivalent (same skeleton $\{X-Z, Z-Y\}$, no v-structures).
>
> **CPDAG of $\{G_2, G_3\}$**: $X - Z - Y$ (undirected).
> **CPDAG of $\{G_1\}$**: $X \to Z \leftarrow Y$ (both directed — fully determined by the v-structure).
^ex-vstructure-pins

## Connections

- **PC algorithm** ([[PC Algorithm]]): outputs a CPDAG by discovering the skeleton via CI tests and
  then orienting v-structures and applying Meek's rules.
- **GES** ([[Greedy Equivalence Search]]): searches the space of CPDAGs directly, using score
  equivalence to justify working at the MEC level.
- **NOTEARS** ([[NOTEARS Algorithm]]): outputs a single DAG (not a CPDAG). In practice, NOTEARS
  picks one representative from the MEC; its consistency guarantees hold for the LS score without
  requiring faithfulness.
- **d-separation** ([[Directed Acyclic Graphs]]): Markov equivalence is defined by having the same
  d-separations; the CPDAG encodes exactly the d-separation structure recoverable from observational
  data.
- **Interventional identification**: Only interventional distributions $P(Y \mid do(X=x))$ can
  distinguish members of a MEC. See [[Directed Acyclic Graphs#^thm-backdoor-adjustment]].

## See Also
- [[Directed Acyclic Graphs]] — d-separation, fork/chain/collider, backdoor adjustment
- [[DAG Structure Learning Problem]] — how the learning problem is set up (SEM, NP-hardness)
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[Greedy Equivalence Search]] — score-based algorithm that searches CPDAG space
- [[Smooth Characterization of Acyclicity]] — NOTEARS's continuous encoding of DAG-ness
- [[NOTEARS - Overview]] — the approach that outputs a single DAG via continuous optimisation
