---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Verma & Pearl (1990), Meek (1995) — synthesised from training knowledge"
date_ingested: 2026-07-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Constraint-Based Structure Learning]]"
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence"
  - "MEC"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** — indistinguishable from purely observational data —
> if and only if they share the same **skeleton** and the same set of **v-structures**
> (Verma & Pearl 1990). The canonical representative of this equivalence class is the
> **CPDAG** (Completed Partially Directed Acyclic Graph): a partially directed graph in
> which directed edges are those common to all DAGs in the class, and undirected edges
> are those whose direction varies. This is the fundamental reason structure learning
> from observational data can, at best, return a CPDAG — not a unique DAG.

## Overview

Any structure-learning algorithm that uses only observational data faces a hard
identification ceiling: multiple DAGs can generate the same joint distribution. This
is not a failure of any particular algorithm — it is a logical consequence of the
Markov condition. Understanding which DAGs are observationally indistinguishable
(Markov equivalent) tells us precisely what observational data can and cannot reveal.

The connection to the [[DAG Structure Learning Problem]] is immediate: algorithms like
the [[PC Algorithm]] and [[GES - Greedy Equivalence Search]] both output a CPDAG,
not a DAG. The CPDAG encodes the *maximum* causal information recoverable from
observational data alone.

## Main Content

### Markov condition and d-separation

The starting point is the **global Markov condition**: a DAG $G$ imposes that
$X_i \perp X_j \mid S$ in $\mathbb{P}$ whenever $X_i$ and $X_j$ are
d-separated by $S$ in $G$. DAGs $G_1$ and $G_2$ are called **Markov equivalent**
if they impose exactly the same conditional independence (CI) constraints:
$\text{d-sep}_{G_1}(X,Y \mid S) \iff \text{d-sep}_{G_2}(X,Y \mid S)$ for all
$X, Y, S$.

For faithful distributions (see [[Constraint-Based Structure Learning]]), this equals
$X \perp Y \mid S$ in $\mathbb{P}$, so two Markov-equivalent DAGs produce the same
observational distribution. No amount of i.i.d. data can distinguish them.

### The characterisation theorem

> [!theorem] Theorem: Markov Equivalence Characterisation (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if and only if they share:
> 1. The same **skeleton** — the same set of undirected adjacencies
>    (edge $(X,Y)$ exists in $G_1$ iff it exists in $G_2$), and
> 2. The same **v-structures** (immoralities) — the same set of triples
>    $(X, Z, Y)$ where $X \to Z \leftarrow Y$ and $X$ and $Y$ are not adjacent.
>
> **Proof sketch**: Skeleton determines which pairs are d-separated by the
> empty set. V-structures are the only triples where a common child does *not*
> "block" the path when conditioned on — they are the unique source of directional
> information in the Markov condition. Any additional directed edge can be reversed
> without changing d-separations, provided no new v-structure is created.
^thm-markov-equiv

**Example**: Consider three DAGs on $\{X, Y, Z\}$:
- $G_1: X \to Z \to Y$ (pipe / chain)
- $G_2: X \leftarrow Z \to Y$ (fork / common cause)
- $G_3: X \to Z \leftarrow Y$ (v-structure / common effect)

$G_1$ and $G_2$ are Markov equivalent: both have skeleton $X - Z - Y$ and no v-structures ($Z \notin \text{sep}(X,Y) = \{Z\}$ in $G_1$ and $G_2$ blocks the path when conditioned). $G_3$ is **not** equivalent to $G_1$/$G_2$: it has the same skeleton but a v-structure at $Z$. In $G_3$, $X \perp Y$ marginally but $X \not\perp Y \mid Z$ (explaining away), whereas in $G_1$, $X \not\perp Y$ marginally but $X \perp Y \mid Z$.

### The CPDAG

The Markov equivalence class (MEC) of a DAG $G$, denoted $[G]$, can contain
exponentially many DAGs. Working with each individually is intractable. The
**CPDAG** provides a compact, unique representation.

> [!definition] Definition: CPDAG (Meek 1995; Chickering 1995)
> The **Completed Partially Directed Acyclic Graph** (CPDAG) for an MEC $[G]$ is
> the unique graph $\mathcal{C}$ on the same vertex set $V$ such that:
> - $\mathcal{C}$ has a **directed edge** $X \to Y$ if and only if $X \to Y$
>   appears in **every** DAG in $[G]$.
> - $\mathcal{C}$ has an **undirected edge** $X - Y$ if and only if both $X \to Y$
>   and $Y \to X$ appear in different DAGs in $[G]$.
> - $\mathcal{C}$ has no other edges.
^def-cpdag

Every DAG in $[G]$ can be recovered from $\mathcal{C}$ by replacing each
undirected edge $X - Y$ with a directed edge (either $X \to Y$ or $Y \to X$)
such that no new v-structures or directed cycles are created.

### Meek's orientation rules

Given a skeleton and a set of v-structures (a **PDAG** — partially directed
acyclic graph), additional edges can often be oriented without adding new
v-structures or directed cycles. Meek (1995) identifies four exhaustive rules
for this propagation:

> [!definition] Meek Orientation Rules (Meek 1995)
> Repeat until no more edges can be oriented:
>
> **R1** (Avoid new v-structure): If $A \to B - C$ and $A$ is not adjacent to $C$,
> then orient $B \to C$. (Otherwise $A - B \leftarrow C$ would be a new v-structure.)
>
> **R2** (Avoid directed cycle): If $A \to B \to C$ and $A - C$ is undirected,
> then orient $A \to C$. (Otherwise $A \leftarrow C \to B \to A$ would be a cycle.)
>
> **R3** (Two-path convergence): If $B_1 \to C$, $B_2 \to C$, $A - B_1$, $A - B_2$,
> $A - C$ undirected, and $B_1$ not adjacent to $B_2$, then orient $A \to C$.
> (Either orientation of $A - B_i$ would create a new v-structure otherwise.)
>
> **R4** (Discriminating path): If $A - C$ is undirected and there is a directed path
> $B \to \cdots \to C$ not through $A$ such that every non-endpoint is a parent of $C$
> and adjacent to $A$, then orient $A \to C$.
^def-meek-rules

Meek proved that these four rules are *complete*: if an edge's orientation is forced
by the Markov equivalence constraints, R1–R4 will find it. After applying R1–R4 to
exhaustion, any remaining undirected edge $A - B$ can be oriented either way without
leaving the MEC.

### What observational data cannot reveal

An undirected edge in the CPDAG represents **genuine causal ambiguity** — no
amount of observational data can orient it. To orient such edges requires:

1. **Interventional data**: Intervening on $X$ (setting $X = x$ by external
   manipulation) breaks the observational distribution in a way that reveals
   edge directions. The IDA algorithm (Maathuis et al. 2009) and ICP
   (Peters et al. 2016) use interventions to identify more edge orientations.
2. **Non-Gaussianity**: LiNGAM (Shimizu et al. 2006) exploits non-Gaussian
   noise to identify the full DAG (not just the MEC) from observational data.
   See [[DAG Structure Learning Problem]] for context.
3. **Functional form constraints**: Additive noise models (ANM, Hoyer et al. 2009)
   identify edge directions from the asymmetry of the joint density.

## Examples

> [!example] Example: Three-Node MEC
> Consider the DAG $G: X_1 \to X_2 \leftarrow X_3$ with $X_1 - X_3$ non-adjacent.
>
> **Skeleton**: $X_1 - X_2 - X_3$ (V-shape).
> **V-structures**: $(X_1, X_2, X_3)$ — common effect at $X_2$.
>
> This MEC has only one element (the single DAG above) because the v-structure forces
> both edges to point into $X_2$. The CPDAG is $X_1 \to X_2 \leftarrow X_3$.
>
> Contrast with the chain $X_1 \to X_2 \to X_3$: its MEC also contains
> $X_1 \leftarrow X_2 \to X_3$, and its CPDAG is $X_1 - X_2 - X_3$
> (all undirected) since neither edge direction is forced.

## Connections

- **PC algorithm output**: [[PC Algorithm]] outputs the CPDAG of the true MEC,
  assuming faithful distribution and correct CI tests.
- **GES output**: [[GES - Greedy Equivalence Search]] searches directly over
  CPDAGs (the MEC lattice) and outputs a CPDAG.
- **Causal inference post-discovery**: After obtaining a CPDAG, the IDA algorithm
  can compute bounds on causal effects without knowing which DAG in the MEC is true.
- **DAG reasoning**: [[Directed Acyclic Graphs]] covers d-separation and the
  back-door/front-door criteria — those apply to a specific DAG, not a CPDAG.

## See Also
- [[DAG Structure Learning Problem]] — the score-based learning problem that GES and NOTEARS solve
- [[Constraint-Based Structure Learning]] — the CI-test paradigm that uses Markov equivalence
- [[PC Algorithm]] — the algorithm that outputs the CPDAG from CI tests
- [[GES - Greedy Equivalence Search]] — searches over CPDAGs to maximise a score
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, do-calculus)
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns (the building blocks of v-structures)
