---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-arxiv-final.pdf]]"
source_location: "§3 Notation and Background, pp. 3-4"
date_ingested: 2026-10-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "essential graph"
  - "MEC"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode exactly the same set of
> conditional independencies in observational data — equivalently, if they share the same
> **skeleton** (undirected edge set) and the same **v-structures** (unshielded colliders).
> Observational data alone cannot distinguish DAGs in the same equivalence class, so the
> correct output of any constraint-based or score-based structure learning algorithm is the
> **Markov equivalence class (MEC)**, canonically represented by its **completed partially
> directed acyclic graph (CPDAG)**. The CPDAG directs exactly those edges whose orientation
> is common to *every* DAG in the class; remaining edges are undirected.

## Overview

When we learn a Bayesian network from observational data, we face an identifiability ceiling:
any DAG in a Markov equivalence class implies the same joint distribution under the Markov
condition, so no purely observational data can favor one over another. This is not a failure
of the algorithm — it is a fundamental limit of passive observation.

The Markov equivalence class thus becomes the natural target for structure learning algorithms:

- **Constraint-based** methods (the [[PC Algorithm]]) recover the CPDAG directly via
  conditional independence tests.
- **Score-based** methods (the [[GES - Greedy Equivalence Search]]) search *through the
  space of CPDAGs* rather than individual DAGs, guaranteeing score-equivalent states map to
  the same score.
- **Continuous optimization** methods like [[NOTEARS - Overview]] estimate a specific DAG
  within an MEC, but their score-based objective is still MEC-grounded.

## Main Content

### DAG equivalence

> [!definition] Definition: Skeleton and V-structure (Chickering & Meek, §3)
> The **skeleton** of a DAG $\mathcal{G} = (\mathbf{V}, \mathbf{E})$ is the undirected graph
> obtained by ignoring edge directions. A **v-structure** (or **unshielded collider**) in
> $\mathcal{G}$ is a triple $(X, Z, Y)$ such that $X \to Z \leftarrow Y$ and $X$ and $Y$
> are **not adjacent** (no edge between them). The pair $X$ and $Y$ are the "tails" and $Z$
> is the "collider" or "common child."
^def-skeleton-vstructure

> [!theorem] Theorem: Verma-Pearl Equivalence Characterization (Verma & Pearl, 1990)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **Markov equivalent** — denoted $\mathcal{G} \approx \mathcal{G}'$
> — if and only if they have the same **skeleton** and the same set of **v-structures**.
>
> **Consequence:** the set of DAGs that are indistinguishable from observational data is
> determined entirely by undirected adjacency structure and the location of unshielded colliders.
> Changing any other edge direction (a "covered edge reversal") produces an equivalent DAG.
^thm-verma-pearl

A **covered edge reversal** is the only elementary transformation between equivalent DAGs.
An edge $X \to Y$ is **covered** if the parents of $Y$ equal the parents of $X$ together
with $X$ itself: $\mathrm{Pa}(X) \cup \{X\} = \mathrm{Pa}(Y)$.

> [!note] Meek's Conjecture (proved by Chickering 2002)
> If $\mathcal{H}$ is an independence map of $\mathcal{G}$ (i.e., the independence constraints of
> $\mathcal{H}$ are a subset of those of $\mathcal{G}$), then there exists a finite sequence of
> edge additions and covered-edge reversals transforming $\mathcal{G}$ into $\mathcal{H}$, such
> that $\mathcal{H}$ remains an independence map of $\mathcal{G}$ after each step. This fact
> underpins the correctness proof for [[GES - Greedy Equivalence Search]].

### PDAG and CPDAG

> [!definition] Definition: PDAG and CPDAG (Chickering & Meek, §3)
> A **partially directed acyclic graph (PDAG)** $\mathcal{P}$ is a graph with both directed
> $(\to)$ and undirected $(\text{—})$ edges that represents a set of DAGs: the **equivalence
> class** $[\mathcal{P}]_{\approx}$ is all DAGs with the same skeleton and v-structures as $\mathcal{P}$.
>
> A PDAG $\mathcal{C}$ is **completed** (a **CPDAG**) if:
> 1. Every **directed** edge in $\mathcal{C}$ is **compelled** — it is directed the same way
>    in *every* DAG in the equivalence class.
> 2. Every **undirected** edge in $\mathcal{C}$ is **reversible** — there exist DAGs in the
>    class with either orientation.
>
> The CPDAG of an equivalence class is **unique** and is often called the **essential graph**.
^def-cpdag

> [!example] Example: Two equivalent DAGs
> Consider three variables $X, Y, Z$ with the chain $X \to Y \to Z$. The reverse chain
> $X \leftarrow Y \leftarrow Z$ has the same skeleton (X-Y-Z path) and no v-structures — so
> they are Markov equivalent. The CPDAG has undirected edges $X \text{—} Y \text{—} Z$ with
> no arrowheads, since neither orientation is compelled.
>
> By contrast, $X \to Y \leftarrow Z$ introduces a v-structure at $Y$: the CPDAG must direct
> *both* edges into $Y$, so it is $X \to Y \leftarrow Z$ (fully directed).

### Why the CPDAG is unique

A theorem due to Andersson, Madigan & Perlman (1997) shows that every MEC has a unique CPDAG
representation, and provides an efficient algorithm to convert any DAG into its CPDAG:

1. Identify all compelled edges using a topological-order sweep.
2. Leave all reversible edges undirected.

The resulting CPDAG is a **chain graph** whose undirected components are **chordal** (every
cycle of length ≥ 4 has a chord). This chordal structure is exploited by the backward phase
of GES.

### Independence map (IMAP) ordering

> [!definition] Definition: Independence Map (IMAP) (Chickering & Meek, §3)
> An equivalence class $[\mathcal{F}]_{\approx}$ is an **independence map (IMAP)** of
> $[\mathcal{G}]_{\approx}$ if every independence constraint implied by $\mathcal{F}$ is also
> implied by $\mathcal{G}$ — i.e., $\mathcal{F}$ makes *fewer or equal* independence claims.
> We write $[\mathcal{F}]_{\approx} \leq [\mathcal{G}]_{\approx}$ (more edges = less claimed
> independence = IMAP). A **perfect map** satisfies $\mathcal{F} \approx \mathcal{G}$.
^def-imap

The IMAP ordering gives GES a convergence structure: the forward phase finds an IMAP of the
true graph $\mathcal{G}^*$, and the backward phase removes the spurious edges to reach the
perfect map.

## Meek Orientation Rules

After identifying the skeleton and v-structures, [[PC Algorithm]] applies four deterministic
rules to orient additional edges without creating new v-structures or cycles:

| Rule | Pattern | Action |
|------|---------|--------|
| **R1** | $Z \to X \text{—} Y$, $Z$ not adj. to $Y$ | Orient $X \to Y$ (else new v-structure at $X$) |
| **R2** | $X \to Z \to Y$, $X \text{—} Y$ | Orient $X \to Y$ (else directed cycle) |
| **R3** | $X \text{—} Z \to Y$, $W \text{—} Y$, $X \text{—} W$, $X, W$ not adj. | Orient $Z \to Y$ if applicable |
| **R4** | (Meek's fourth rule) | Context-dependent; prevents additional v-structures |

These rules are **sound and complete** for orienting all compelled edges given the skeleton
and v-structures (Meek, 1995; Andersson et al., 1997).

## Connections

- **PC algorithm** uses the CPDAG as its output: the skeleton and v-structures are found
  from CI tests, then Meek's rules complete the CPDAG. See [[PC Algorithm]].
- **GES** searches through the space of CPDAGs directly, using insert/delete operators that
  maintain the CPDAG representation. See [[GES - Greedy Equivalence Search]].
- **NOTEARS** estimates a single DAG; the CPDAG equivalence class of that DAG is the correct
  target. See [[DAG Structure Learning Problem]].
- **Bayesian Networks** connect to this via d-separation: two DAGs in the same MEC give
  identical d-separation statements. See [[Directed Acyclic Graphs]].
- **Interventions**: intervening on a variable $X$ (do-calculus) can break equivalences —
  interventional data identifies a finer graph (the interventional essential graph). See
  [[Canonical Causal DAGs]].

## See Also
- [[PC Algorithm]] — uses CPDAG as output via CI tests
- [[GES - Greedy Equivalence Search]] — searches through CPDAG space
- [[DAG Structure Learning Problem]] — sets up the SEM / score-based view
- [[Directed Acyclic Graphs]] — d-separation and DAG semantics
- [[Causal Discovery/_Index|Causal Discovery Index]]
