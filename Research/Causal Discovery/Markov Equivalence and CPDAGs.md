---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Part 1 — Markov Equivalence and CPDAGs"
date_ingested: 2026-08-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - Markov equivalence class
  - MEC
  - CPDAG
  - essential graph
  - completed partially directed acyclic graph
---

# Markov Equivalence and CPDAGs

> [!summary]
> Observational data can identify a causal DAG only up to its **Markov equivalence class (MEC)**:
> the set of all DAGs encoding the same conditional independence relationships. The **Verma-Pearl
> theorem** characterises equivalence via shared skeleton and v-structures. The unique canonical
> representation of a MEC is its **CPDAG** (completed partially directed acyclic graph / essential
> graph): edges that point the same way in every member of the MEC are directed; others are
> undirected. CPDAGs are the output target of the PC and GES structure learning algorithms.

## Overview

Structure learning from purely observational data faces a fundamental ceiling: distributions
satisfying the Causal Markov assumption are generally consistent with *many* DAGs. The question
"which DAG generated the data?" is underdetermined — the best we can do without additional
assumptions (non-Gaussianity, interventions, time order) is identify the **equivalence class** of
DAGs that are indistinguishable from the distribution.

This note sets up the vocabulary that both the [[PC Algorithm]] and [[GES - Greedy Equivalence Search]]
require: what it means for two DAGs to be equivalent, the theorem that makes equivalence decidable
from graph structure alone, and how CPDAGs represent an entire class as a single object.

## Main Content

### The identification ceiling

Two DAGs $G$ and $G'$ on the same variable set are **Markov equivalent** if every conditional
independence statement that holds in the distribution induced by $G$ (under the Causal Markov
assumption) also holds in the distribution induced by $G'$, and vice versa. Formally,
$G \sim G'$ iff they entail the same d-separation relations.

> [!definition] Definition: d-separation (Pearl 1988)
> In a DAG $G$, variables $X$ and $Y$ are **d-separated** by set $S$ — written $X \perp_d Y \mid S$
> in $G$ — if every path between $X$ and $Y$ is *blocked* by $S$. A path is blocked at a node $Z$
> if either:
> 1. $Z \in S$ and $Z$ is a *non-collider* on the path (chain $X \to Z \to Y$ or fork $X \leftarrow Z \to Y$), or
> 2. $Z \notin S$ and no descendant of $Z$ is in $S$, and $Z$ is a *collider* on the path ($X \to Z \leftarrow Y$).
> Under the Causal Markov and Faithfulness assumptions, $X \perp_d Y \mid S$ in $G$ iff
> $X \perp\!\!\!\perp Y \mid S$ in the distribution.
^def-d-separation

The **faithfulness assumption** (Causal Faithfulness Condition) closes the gap between
d-separation and observed conditional independence: it asserts that every CI present in the
distribution is *implied* by a d-separation in $G$. Without faithfulness, a CI could appear
"by accident" (exact cancellation of paths) and mislead structure learning.

### Verma-Pearl theorem

> [!theorem] Theorem: Markov Equivalence Characterisation (Verma & Pearl 1990)
> Two DAGs $G$ and $G'$ are Markov equivalent if and only if they have the same:
> 1. **Skeleton** — the same set of edges, ignoring direction.
> 2. **V-structures (unshielded colliders)** — the same set of triples $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are *non-adjacent* in the skeleton.
>
> Equivalently: $G \sim G'$ iff they have the same skeleton and the same unshielded colliders.
^thm-verma-pearl

**Significance**: equivalence is a purely *graphical* property — no distributional calculations
required. Two DAGs that look very different may still be equivalent; a DAG that merely reverses
a non-collider edge while keeping the same skeleton is always equivalent to the original.

> [!example] Example: A 3-node equivalence class
> The following four DAGs are all Markov equivalent:
> $$A \to B \to C, \quad A \leftarrow B \to C, \quad A \to B \leftarrow C, \quad A \leftarrow B \leftarrow C$$
> Wait — not quite. Only the first three share the skeleton $A - B - C$ and *no v-structure*
> at $B$, so they form one MEC of size 3. The fourth is the same skeleton but also no
> v-structure, so all four are equivalent. However, $A \to B \leftarrow C$ has a v-structure
> at $B$ (if $A$ and $C$ are non-adjacent, they are here). So the chain and fork graphs form
> one MEC; the collider forms its own singleton MEC. This illustrates that v-structure
> orientation is the only "certain" causal information in observational data.
^ex-3node-mec

### CPDAGs (Essential Graphs)

> [!definition] Definition: CPDAG (Andersson, Madigan & Perlman 1997; Chickering 2002)
> The **completed partially directed acyclic graph (CPDAG)** of a Markov equivalence class $[G]$
> is the unique graph $C$ on the same node set such that:
> 1. $C$ has the same skeleton as every member of $[G]$.
> 2. An edge $X \to Y$ is *directed* in $C$ iff $X \to Y$ in *every* DAG in $[G]$.
> 3. An edge $X - Y$ is *undirected* in $C$ iff some members of $[G]$ have $X \to Y$ and others
>    have $X \leftarrow Y$.
> The CPDAG is also called the **essential graph** of the MEC.
^def-cpdag

The CPDAG is the canonical output of structure learning algorithms under observational data.
An undirected edge in the CPDAG means "we cannot determine the orientation from data alone."

### Meek's orientation rules

Given a skeleton and the identified v-structures, further edges can be *deterministically*
oriented using four rules (Meek 1995) that preserve acyclicity and do not create new v-structures:

> [!theorem] Theorem: Meek's Orientation Rules (Meek 1995)
> Let $C$ be a PDAG consistent with a skeleton and a set of v-structures. Apply the following
> rules exhaustively until no new orientations are possible:
>
> - **R1 (non-v-structure)**: If $A \to B - C$ and $A \not\sim C$, orient $B \to C$.
>   *(Otherwise $B \leftarrow C$ would create a new v-structure at $B$, contradicting our assumption.)*
> - **R2 (acyclicity)**: If $A \to B \to C$ and $A - C$, orient $A \to C$.
>   *(Otherwise $C \to A$ would create a directed cycle $A \to B \to C \to A$.)*
> - **R3 (acyclicity)**: If $A - C$, $B - C$, $A \to D \to C$, $B \to D$, and $A \not\sim B$,
>   orient $D \to C$. *(Prevents two new v-structures.)*
> - **R4**: Additional closure rule for mixed graphs (primarily relevant for FCI output).
>
> Applying R1–R4 until convergence yields the unique maximally oriented PDAG consistent with
> the skeleton and identified v-structures — the CPDAG.
^thm-meek-rules

### Covered edge reversals

> [!definition] Definition: Covered edge reversal (Chickering 1995)
> An edge $X \to Y$ in a DAG $G$ is **covered** if $\text{pa}_G(X) = \text{pa}_G(Y) \setminus \{X\}$
> (the parents of $X$ are exactly the parents of $Y$ minus $X$ itself). Reversing a covered edge
> $X \to Y$ to $X \leftarrow Y$ yields a Markov-equivalent DAG.
>
> **Transformational characterisation** (Chickering 1995): Two DAGs $G$ and $H$ are Markov
> equivalent iff one can be transformed into the other by a finite sequence of covered edge
> reversals. This is the basis for GES's proof of completeness.
^def-covered-edge

## Connections

- **Structure learning target**: Every structure learning algorithm under Causal Markov +
  Faithfulness + Sufficiency recovers at most a CPDAG from observational data. More is
  achievable only with: (a) non-Gaussian noise (LiNGAM can identify individual edges beyond
  the MEC), (b) interventional data, or (c) temporal/contextual ordering.
- **Bayesian networks**: A CPDAG simultaneously represents all the Bayesian network structures
  in its MEC — see [[Directed Acyclic Graphs]] for the causal-inference perspective.
- **PC and GES as CPDAG learners**: [[PC Algorithm]] identifies the CPDAG via CI tests;
  [[GES - Greedy Equivalence Search]] searches over CPDAGs directly using a score.
- **NOTEARS contrast**: [[NOTEARS - Overview]] returns a single point-estimate DAG, not a CPDAG.
  It operates in a continuous space and avoids the MEC search entirely, trading exactness
  for scalability.

## See Also
- [[PC Algorithm]] — uses d-separation oracle to recover the CPDAG
- [[GES - Greedy Equivalence Search]] — greedy search over CPDAGs; proof uses covered edge reversals
- [[DAG Structure Learning Problem]] — score-based framing; landscape of prior approaches
- [[NOTEARS - Overview]] — continuous optimization alternative that returns a point-estimate DAG
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (causal inference perspective)
- [[Spurious Association and Confounds]] — fork/pipe/collider DAG patterns for causal reasoning
