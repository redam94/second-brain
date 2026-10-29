---
title: "Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 3; Chickering (2002), §2"
date_ingested: 2026-10-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Meek's rules"
---

# Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independence
> relationships — they cannot be distinguished by any observational data alone. The set of all
> DAGs Markov-equivalent to a given DAG forms an **equivalence class**, represented compactly
> by a **CPDAG** (Completed Partially Directed Acyclic Graph): directed edges that are common to
> every member of the class, undirected edges that differ across members. Understanding CPDAGs is
> the key to the [[PC Algorithm]] (which outputs a CPDAG) and [[GES - Greedy Equivalence Search]]
> (which searches over CPDAGs rather than individual DAGs).

## Overview

When learning DAG structure from observational data, the best one can hope for — without
additional assumptions like non-Gaussianity or nonlinearity — is to identify the **Markov
equivalence class** of the true DAG. Two DAGs that are Markov equivalent are observationally
indistinguishable: no distribution consistent with one is inconsistent with the other. The
implication for structure learning is that algorithms output a CPDAG, not a unique DAG.

This is not merely a theoretical limitation: it has practical consequences for causal
interpretation. An undirected edge $X - Y$ in a CPDAG means the data cannot determine whether
$X \to Y$ or $Y \to X$. Directed edges in the CPDAG *can* be interpreted causally — they are
the same across every member of the equivalence class.

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same variable set $V$ are **Markov equivalent** if and only
> if they have:
> 1. The same **skeleton** (same set of undirected edges, ignoring orientation), and
> 2. The same set of **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ where $X$ and
>    $Y$ are not adjacent).
>
> Equivalently, $G_1 \equiv G_2$ iff they entail the same set of conditional independence
> statements via d-separation.
^def-markov-equiv

> [!note] Why v-structures determine equivalence
> An unshielded collider $X \to Z \leftarrow Y$ (with $X \not\!\!\!- Y$) is the only structure
> where the middle variable is a *collider* and the two outer variables are non-adjacent. This
> is identifiable from data because conditioning on $Z$ creates dependence between $X$ and $Y$
> — the opposite of the fork pattern. In contrast, $X \to Z \to Y$ (chain) and $X \leftarrow Z
> \to Y$ (fork) both entail $X \perp\!\!\!\perp Y \mid Z$ and are therefore indistinguishable.

### Completed Partially Directed Acyclic Graphs (CPDAGs)

> [!definition] Definition: CPDAG
> A **CPDAG** $\mathcal{C}$ for an equivalence class $[G]$ is a mixed graph (containing both
> directed and undirected edges) such that:
> - $X \to Y$ in $\mathcal{C}$ iff $X \to Y$ in **every** DAG in $[G]$ (compelled / identifiable
>   edges).
> - $X - Y$ in $\mathcal{C}$ iff there exist two DAGs in $[G]$ — one with $X \to Y$, one with
>   $Y \to X$ (reversible edges).
>
> Every CPDAG uniquely represents its equivalence class, and every equivalence class has a
> unique CPDAG.
^def-cpdag

The CPDAG is also called the **essential graph** of its equivalence class (Andersson, Madigan
& Perlman 1997). The pcalg R package returns the CPDAG as its standard output.

### Meek's Orientation Rules

After recovering the skeleton and orienting v-structures (both done in the PC algorithm's
first two phases), some additional edges can be oriented without additional data:

> [!theorem] Meek's Rules (Meek 1995)
> The following four rules complete the CPDAG. Apply them exhaustively until no new
> orientations are possible.
>
> **R1** (Acyclicity): If $X \to Y - Z$ and $X \not\!\!\!- Z$, then orient $Y \to Z$
> (otherwise $X \to Y \leftarrow Z$ would create a new v-structure).
>
> **R2** (Existing directed path): If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$
> (otherwise there would be a directed cycle).
>
> **R3** (Common cause): If $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1 \not\!\!\!- Z_2$,
> and $X - Y$, orient $X \to Y$.
>
> **R4** (Discriminating path): A technical rule for paths of length ≥ 4 that handles
> edge cases from path structure.
>
> These rules are both **sound** (every orientation preserves Markov equivalence) and
> **complete** (exhaustive application produces the unique CPDAG).
^thm-meek-rules

### Identifiable vs. Non-Identifiable Edges

In a CPDAG, a directed edge $X \to Y$ has a causal interpretation; an undirected edge $X - Y$
does not. The fraction of edges that are directed (identifiable) in a CPDAG depends on the
true graph's density and v-structure count. Sparse graphs with many v-structures tend to have
more identifiable edges.

| Edge type in CPDAG | Interpretation | Present in all equivalent DAGs? |
|--------------------|----------------|--------------------------------|
| $X \to Y$ (directed) | Compelled causal direction | Yes |
| $X - Y$ (undirected) | Reversible / non-identifiable | No (direction differs across members) |

## Connections

- **[[PC Algorithm]]** outputs a CPDAG by (1) recovering the skeleton via conditional
  independence tests, (2) orienting v-structures, and (3) applying Meek's rules.
- **[[GES - Greedy Equivalence Search]]** searches *directly* over CPDAGs rather than DAGs,
  using moves that add or remove edges within the equivalence class space — an approach whose
  efficiency hinges on CPDAGs being much smaller in number than individual DAGs.
- **[[NOTEARS - Overview]]** and [[NOTEARS Algorithm]] return a single DAG (not a CPDAG)
  because they use a continuous optimization over the linear SEM coefficient matrix — the
  non-Gaussian signal (or the particular stationary point found) implicitly breaks equivalence.
  Whether this is a feature or a limitation is context-dependent.
- **[[Directed Acyclic Graphs]]** covers d-separation and the causal Markov condition, which
  are the foundations for why two Markov-equivalent DAGs are observationally indistinguishable.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that outputs the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm that searches the CPDAG space
- [[DAG Structure Learning Problem]] — the optimization problem CPDAGs arise from
- [[Directed Acyclic Graphs]] — d-separation and Markov condition
