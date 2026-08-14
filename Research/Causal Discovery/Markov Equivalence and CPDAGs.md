---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2016-selective-GES.pdf]]"
source_location: "§3, Notation and Background, pp. 2–3"
date_ingested: 2026-08-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "CPDAG"
  - "Completed PDAG"
  - "Markov equivalence class"
  - "equivalence class of DAGs"
  - "Verma Pearl 1991"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode exactly the same conditional independences. Verma & Pearl (1991) proved that equivalence holds iff the two DAGs share the same **skeleton** (underlying undirected graph) and the same **v-structures** (collider triples $X \to Z \leftarrow Y$ with $X,Y$ non-adjacent). Every equivalence class has a unique canonical representation: the **Completed Partially Directed Acyclic Graph (CPDAG)**, which shows each compelled edge as directed and each reversible edge as undirected. Both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]] target CPDAGs, not individual DAGs, because observational data alone cannot distinguish members of the same equivalence class.

## Overview

The goal of causal structure learning from observational data is to identify the DAG encoding the data-generating mechanism. A fundamental constraint: observational data can only distinguish DAGs up to **Markov equivalence**. Any two equivalent DAGs imply the same set of conditional independence constraints, so no amount of data can tell them apart — interventional data (randomised experiments) is needed to go further.

This is not merely a statistical sample-size problem. It is a logical limit: equivalent DAGs are literally indistinguishable by any passive observation. Structure-learning algorithms must therefore output the **equivalence class** of the true DAG, represented by a CPDAG.

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1991)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **equivalent** — denoted $\mathcal{G} \approx \mathcal{G}'$ — if the independence constraints implied by $\mathcal{G}$ and $\mathcal{G}'$ are identical. The induced partition over all DAGs on $d$ nodes is the set of **Markov equivalence classes**.
^def-markov-equivalence

> [!theorem] Theorem: Skeleton + V-Structures Characterisation (Verma & Pearl 1991)
> Two DAGs are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** — the undirected graph obtained by ignoring edge directions.
> 2. The same **v-structures** — triples $X \to Z \leftarrow Y$ where $X$ and $Y$ are **not** adjacent.
>
> An edge $X - Z$ in the skeleton is a v-structure at $Z$ iff $Z \notin \mathrm{Sep}(X,Y)$, the separating set of $X$ and $Y$.
^thm-verma-pearl

**Example.** The three DAGs $X \to Y \to Z$, $X \leftarrow Y \leftarrow Z$, and $X \leftarrow Y \to Z$ all share the skeleton $X - Y - Z$ and have no v-structures — they are equivalent. But $X \to Y \leftarrow Z$ (with $X,Z$ non-adjacent) has a v-structure at $Y$, so it forms its own equivalence class.

### Partially Directed Acyclic Graphs (PDAGs)

A **PDAG** $\mathcal{P}$ is a mixed graph over the same variables as a DAG, containing both directed ($\to$) and undirected ($-$) edges. A PDAG $\mathcal{P}$ represents the set of DAGs that share the same skeleton and v-structures as $\mathcal{P}$.

### Completed PDAGs (CPDAGs)

> [!definition] Definition: Compelled and Reversible Edges
> An edge $e$ in a DAG $\mathcal{G}$ is **compelled** if it appears with the same orientation in every DAG in $[\mathcal{G}]_\approx$. It is **reversible** if its direction can be flipped while remaining within the equivalence class (i.e., via a sequence of covered-edge reversals that preserve the skeleton and v-structures).
^def-compelled-reversible

> [!definition] Definition: CPDAG (Completed PDAG)
> The **CPDAG** $\mathcal{C}$ of an equivalence class $[\mathcal{G}]_\approx$ is the unique PDAG satisfying:
> 1. Every **directed** edge in $\mathcal{C}$ corresponds to a **compelled** edge in $\mathcal{G}$.
> 2. Every **undirected** edge in $\mathcal{C}$ corresponds to a **reversible** edge in $\mathcal{G}$.
>
> The CPDAG is the unique canonical representative of the equivalence class. Unlike non-completed PDAGs, the CPDAG representation is unique.
^def-cpdag

### The IMAP Partial Order

> [!definition] Definition: IMAP Relation
> An equivalence class $\mathcal{F}$ is an **independence map (IMAP)** of $\mathcal{E}$ if every independence implied by $\mathcal{F}$ is also implied by $\mathcal{E}$. For DAGs $\mathcal{G}$ and $\mathcal{H}$, write $\mathcal{G} \leq \mathcal{H}$ when $[\mathcal{H}]_\approx$ is an IMAP of $[\mathcal{G}]_\approx$ — i.e. $\mathcal{H}$ makes at least as many independence claims as $\mathcal{G}$.
^def-imap

The IMAP ordering is crucial for GES: the **forward phase** (FES) builds up a graph that is an IMAP of the truth (more edges = fewer claimed independences = fewer false claims), and the **backward phase** (BES) removes spurious independences to reach the truth.

### Covered Edges and Edge Reversibility

> [!definition] Definition: Covered Edge
> An edge $X \to Y$ in a DAG $\mathcal{G}$ is **covered** if $X$ and $Y$ have the same parents, except that $X$ is not a parent of itself:
> $$\mathrm{Pa}^\mathcal{G}_Y \setminus \{X\} = \mathrm{Pa}^\mathcal{G}_X.$$
> A DAG property is **equivalence-invariant** iff it is invariant under covered-edge reversals.
^def-covered-edge

Covered edges are precisely the reversible edges in a DAG. This characterisation connects the graphical definition of reversibility to an algebraic condition that can be checked locally.

## Examples

> [!example] Example: Three-Node Equivalence Classes
> Over three nodes $\{X, Y, Z\}$, the CPDAGs are:
> - **Fork**: $X \leftarrow Y \rightarrow Z$ — CPDAG is $X - Y - Z$ with directed edges from $Y$ (the fork edges $Y \to X$ and $Y \to Z$ are compelled because reversing either would create a new v-structure).
> - Wait — actually the fork $X \leftarrow Y \rightarrow Z$ is equivalent to $X \leftarrow Y \leftarrow Z$ and $X \rightarrow Y \rightarrow Z$? No — let's be careful. The skeleton is $X-Y-Z$ and there are no v-structures in the fork case. So the equivalence class of the chain $X \to Y \to Z$ includes the fork $X \leftarrow Y \to Z$, the reverse chain $X \leftarrow Y \leftarrow Z$, and the chain itself. Their CPDAG is $X - Y - Z$ (all undirected, since all edges are reversible).
> - **Collider**: $X \rightarrow Y \leftarrow Z$ — CPDAG has directed $X \to Y$ and $Z \to Y$, since the v-structure is the only constraint on this skeleton. Both edges are compelled.
>
> Thus two distinct CPDAGs exist over this skeleton $X-Y-Z$: the undirected $X - Y - Z$ (representing 3 DAGs) and the collider $X \to Y \leftarrow Z$ (representing 1 DAG).

## Connections

- **Learning algorithms target CPDAGs**: [[PC Algorithm]] outputs a CPDAG by running independence tests; [[GES - Greedy Equivalence Search]] searches directly over the CPDAG space using score operators. [[NOTEARS - Overview]] outputs a DAG (not a CPDAG) — a known limitation noted in the [[NOTEARS Experiments]].
- **CPDAGs in the vault**: [[DAG Structure Learning Problem]] defines the learning objective in terms of the CPDAG; [[Directed Acyclic Graphs]] covers the d-separation criterion that defines the independence implications of DAGs.
- **Interventional identifiability**: Given a CPDAG, some edges remain undirected. A single ideal intervention on one variable can orient all edges adjacent to it, progressively resolving the CPDAG into a DAG.

## See Also
- [[DAG Structure Learning Problem]] — score-based DAG learning setup
- [[Directed Acyclic Graphs]] — d-separation and Markov conditions
- [[PC Algorithm]] — constraint-based algorithm outputting a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm searching over CPDAGs
- [[NOTEARS - Overview]] — continuous optimization approach (outputs a DAG, not CPDAG)
