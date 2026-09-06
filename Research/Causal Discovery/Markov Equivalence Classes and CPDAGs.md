---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 3; Verma & Pearl (1990)"
date_ingested: 2026-09-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Structure Learning - Comparison]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence"
  - "equivalence class of DAGs"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
> independence (CI) relationships — and therefore cannot be distinguished from observational
> data alone. A Markov equivalence class is represented by a **CPDAG** (Completed Partially
> Directed Acyclic Graph), also called an *essential graph*: directed edges appear in every
> DAG in the class; undirected edges appear in both directions across DAGs in the class.
> Both the PC algorithm and GES return a CPDAG, not a unique DAG — this is the **fundamental
> identifiability limit** of observational causal discovery.

## Overview

When we observe data from a joint distribution, we can estimate the CI structure — but the
causal DAG that generated the data may not be unique. Multiple DAGs can encode the same CI
structure (same Markov properties) while having different causal arrows. No observational
study can distinguish between Markov-equivalent DAGs without intervention.

This is not a limitation of the algorithm — it is a **mathematical impossibility result**:
with only observational data, the best any algorithm can do is identify the Markov equivalence
class. PC and GES both achieve this theoretical limit (under their assumptions).

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990; Spirtes et al. 2000, Ch. 3)
> Two DAGs $G_1$ and $G_2$ on the same vertex set $V$ are **Markov equivalent** (written
> $G_1 \sim G_2$) if they entail the same set of conditional independence relations: for
> all disjoint $A, B, C \subseteq V$,
> $$A \perp\!\!\!\perp B \mid C \text{ in } G_1 \iff A \perp\!\!\!\perp B \mid C \text{ in } G_2.$$
> Equivalently (by the global Markov property), $G_1 \sim G_2$ iff they have the same
> d-separation structure — see [[Directed Acyclic Graphs]].
^def-markov-equiv

> [!theorem] Theorem: Graphical Characterization (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if they have:
> 1. **The same skeleton** (the same set of edges, ignoring direction), and
> 2. **The same v-structures (unshielded colliders)**: for every triple $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are non-adjacent, the same triple is a collider in both $G_1$ and $G_2$.
>
> This provides an efficient way to check equivalence without enumerating all CI relations.
^thm-markov-equiv

> [!example] Example: Three equivalent and one non-equivalent DAG
> Consider the three DAGs on $\{X, Y, Z\}$:
> - $G_1$: $X \to Y \to Z$  (chain)
> - $G_2$: $X \leftarrow Y \to Z$ (fork)
> - $G_3$: $X \to Y \leftarrow Z$ (collider/v-structure)
> - $G_4$: $X \leftarrow Y \leftarrow Z$ (chain, reversed)
>
> Check: $G_1, G_2, G_4$ have the same skeleton ($X$–$Y$–$Z$) and no v-structures, so
> $G_1 \sim G_2 \sim G_4$. $G_3$ has the same skeleton but a **v-structure** at $Y$ (since
> $X$ and $Z$ are non-adjacent), so $G_3 \not\sim G_1$.
>
> **Implication:** From data, we can tell whether $Y$ is a collider ($G_3$) or not
> ($G_1 / G_2 / G_4$), but we cannot distinguish $X \to Y \to Z$ from $X \leftarrow Y \to Z$
> from $X \leftarrow Y \leftarrow Z$.
^ex-equivalence

### The CPDAG (essential graph)

An equivalence class can contain exponentially many DAGs. Rather than listing them all, we
represent the class with a single graph:

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> Given a Markov equivalence class $[G]$, the **CPDAG** (or *essential graph*) is the unique
> graph on the same vertex set such that:
> - Edge $X \to Y$ (directed) iff **all** DAGs in $[G]$ have $X \to Y$
> - Edge $X - Y$ (undirected) iff some DAGs in $[G]$ have $X \to Y$ and others have $X \leftarrow Y$
>
> Every directed edge in the CPDAG has the same direction in every Markov-equivalent DAG.
> Every undirected edge can be oriented either way (without violating acyclicity or creating
> new v-structures).
^def-cpdag

> [!example] Example: CPDAG for the chain equivalence class
> The equivalence class $\{X \to Y \to Z,\; X \leftarrow Y \to Z,\; X \leftarrow Y \leftarrow Z\}$
> has the CPDAG $X - Y - Z$ (all edges undirected) — because neither edge direction is
> consistent across all three DAGs.
>
> The equivalence class $\{X \to Z \leftarrow Y,\; X \to Z \leftarrow Y\}$ (just the collider)
> has CPDAG $X \to Z \leftarrow Y$ — both edges are directed because every equivalent DAG
> must have this v-structure.
^ex-cpdag

### Meek's orientation rules

Given a skeleton and all v-structures, remaining edge directions can sometimes be inferred
by **Meek's rules** — without any additional CI tests — to avoid creating new v-structures
or directed cycles:

> [!definition] Meek's Orientation Rules (Meek 1995)
> Apply these rules exhaustively to orient additional edges:
>
> **R1 (Away from collider):** If $Z \to X - Y$ and $Z$ and $Y$ are non-adjacent, then
> orient $X \to Y$ (orienting $Y \to X$ would create a new v-structure at $X$).
>
> **R2 (Away from cycle):** If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$
> (orienting $Z \to X$ would create a directed cycle).
>
> **R3 (Avoid new v-structure):** If $X - Y$, $X - Z$, $Z \to Y$, and $W - X$, $W - Z$,
> $W$ and $Y$ non-adjacent, orient $W \to X$ (details omitted; avoids a new v-structure).
>
> **R4:** A fourth rule for paths with a discriminating path structure.
^def-meek-rules

### What remains unidentified

Even after applying Meek's rules, some edges remain undirected in the CPDAG. These
**reversible edges** can point in either direction without contradicting the observed CI
structure. To identify these, one needs:
- **Interventional data** (do-calculus / experimental manipulations)
- **Non-Gaussian noise** (LiNGAM; Shimizu et al. 2006 — linear non-Gaussian acyclic model achieves full identifiability)
- **Equal error variances** — see Peters & Bühlmann (2014)

## Connections

- **PC algorithm** returns a CPDAG using CI tests: [[PC Algorithm]]
- **GES** returns a CPDAG using a score: [[GES - Greedy Equivalence Search]]
- **NOTEARS** returns a single DAG (weighted adjacency matrix) — not a CPDAG, because the
  linear SEM + LS score criterion can differentiate Markov-equivalent DAGs given a specific
  loss function: [[NOTEARS - Overview]]
- **DAG reasoning** (d-separation, back-door criterion) in [[Directed Acyclic Graphs]] operates
  on a specific DAG — when only a CPDAG is available, causal queries require care about which
  member of the equivalence class is the true DGP

## See Also
- [[PC Algorithm]] — discovers the CPDAG via conditional independence tests
- [[GES - Greedy Equivalence Search]] — discovers the CPDAG via greedy score optimization
- [[Directed Acyclic Graphs]] — d-separation, causal interpretation of DAGs
- [[DAG Structure Learning Problem]] — the score-based formulation of causal discovery
- [[NOTEARS - Overview]] — continuous-optimization approach that returns a single DAG
