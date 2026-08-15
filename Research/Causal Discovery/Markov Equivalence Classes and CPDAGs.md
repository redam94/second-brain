---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SGES-Chickering-Meek-2015.pdf]]"
source_location: "§3 (Notation and Background), pp. 3–4"
date_ingested: 2026-08-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Algorithm]]"
aliases:
  - CPDAG
  - completed PDAG
  - Markov equivalence class
  - MEC
  - equivalence class of DAGs
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode identical conditional independence
> (CI) relations — they cannot be distinguished from observational data alone.
> Equivalence classes are represented by **CPDAGs** (Completed Partially Directed
> Acyclic Graphs): the unique mixed graph whose directed edges identify compelled
> orientations and whose undirected edges identify reversible ones. CPDAGs are the
> natural output of every constraint-based and score-based structure-learning
> algorithm, including [[PC Algorithm]], [[GES - Greedy Equivalence Search]], and
> the continuous-optimization approach of [[NOTEARS Algorithm]].

## Overview

A causal structure-learning algorithm cannot in general recover a unique DAG from
observational data — multiple DAGs may impose exactly the same independence
constraints and therefore fit the data equally well. The set of all such
observationally indistinguishable DAGs is called a **Markov equivalence class
(MEC)**, and the canonical compact representation of this class is the **CPDAG**.

Understanding CPDAGs is essential because:
1. They define what is *identifiable* from observational data (direction is certain
   only where the CPDAG has a directed edge).
2. Both constraint-based (PC) and score-based (GES) algorithms search the space of
   CPDAGs, not the space of all DAGs.
3. Interventional data can reduce the MEC further, orienting additional edges.

## Main Content

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1991)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **Markov equivalent** — written
> $\mathcal{G} \approx \mathcal{G}'$ — if they impose exactly the same set of
> conditional independence (CI) constraints on the joint distribution:
> $$\mathcal{G} \approx \mathcal{G}' \quad\iff\quad \text{every CI implied by } \mathcal{G} \text{ is also implied by } \mathcal{G}' \text{, and vice versa.}$$
> Equivalence is reflexive, symmetric, and transitive, so it partitions the space of
> all DAGs on $d$ nodes into disjoint **Markov equivalence classes (MECs)**.

> [!theorem] Theorem: Graphical Characterisation (Verma & Pearl, 1991)
> Two DAGs are Markov equivalent **if and only if** they have:
> 1. the same **skeleton** (same pairs of adjacent nodes, ignoring edge direction), and
> 2. the same **v-structures** (same set of colliders $X \to Z \leftarrow Y$ with
>    $X$ and $Y$ non-adjacent).
>
> **Significance:** This reduces equivalence-checking to two graph-theoretic
> properties — skeleton comparison is $O(d^2)$ and v-structure comparison is
> $O(d^3)$ — making it computationally tractable.

### V-Structures (Colliders)

> [!definition] Definition: V-Structure / Collider
> A **v-structure** (also called an **immorality**) is a triple $(X, Z, Y)$ in a
> DAG such that:
> - $X \to Z \leftarrow Y$ (both $X$ and $Y$ have directed edges into $Z$), and
> - $X$ and $Y$ are **not adjacent** (no edge between them).
>
> V-structures are the only features that distinguish Markov equivalence classes:
> edges whose direction is fixed across all DAGs in the class.

The terminology "v-structure" captures the visual shape: two arrows converging at a
central node $Z$. Conditioning on $Z$ (or its descendants) *opens* a blocked path
between $X$ and $Y$ — this is the collider rule in d-separation. V-structures can
therefore be detected from conditional independence tests by checking whether $Z$
appears in the separating set of $X$ and $Y$.

### PDAG and CPDAG

> [!definition] Definition: PDAG
> A **PDAG** (Partially Directed Acyclic Graph) is a mixed graph containing both
> directed ($\to$) and undirected ($-$) edges. The equivalence class of a PDAG
> $\mathcal{P}$ is the set of all DAGs that share the skeleton and v-structures
> of $\mathcal{P}$.

> [!definition] Definition: CPDAG (Completed PDAG)
> A **CPDAG** (Completed Partially Directed Acyclic Graph) $\mathcal{C}$ is the
> **unique** PDAG representing a Markov equivalence class, with:
> - A **directed** edge $X \to Y$ in $\mathcal{C}$ iff the corresponding edge is
>   **compelled** — it points in the same direction in *every* DAG in the class.
> - An **undirected** edge $X - Y$ in $\mathcal{C}$ iff the corresponding edge is
>   **reversible** — it can point either way in some member of the class.
>
> Unlike non-completed PDAGs, the CPDAG is unique for each equivalence class.

An edge $X \to Y$ in a DAG is **covered** if $X$ and $Y$ have the same parents
(with $X$ not counting as its own parent). Covered edges can be reversed to obtain
another (equivalent) DAG — they are always reversible. The compelled/reversible
distinction is computed by Meek's orientation rules.

### Meek's Orientation Rules

Starting from a skeleton with v-structures oriented, four rules propagate additional
directions without creating new v-structures or cycles:

> [!theorem] Meek's Rules (Meek, 1995)
> Applied repeatedly to exhaustion, these four rules complete a PDAG into its
> CPDAG:
>
> **(R1)** Orient $b - c \to b \to c$ if there is an arrow $a \to b$ and $a, c$
> are non-adjacent. *(Prevents a new v-structure at $b$.)*
>
> **(R2)** Orient $a - b \to a \to b$ if there is a chain $a \to c \to b$.
> *(Prevents a directed cycle.)*
>
> **(R3)** Orient $a - b \to a \to b$ if there exist two chains $a - k \to b$ and
> $a - l \to b$ with $k$ and $l$ non-adjacent. *(Forces consistency.)*
>
> **(R4)** Orient $a - b \to a \to b$ if there is $a - k$ and a chain $k \to l \to b$
> with $k$ and $b$ non-adjacent.
>
> **Completeness (Meek, 1995):** These four rules are sound and complete — applying
> them until convergence produces exactly the CPDAG.

### IMAP Ordering

Structure learning algorithms often move through a lattice of equivalence classes
ordered by independence maps:

> [!definition] Definition: Independence Map (IMAP)
> Equivalence class $[\mathcal{F}]_\approx$ is an **IMAP** of $[\mathcal{E}]_\approx$
> if every CI relation implied by $\mathcal{F}$ is also implied by $\mathcal{E}$.
> Equivalently, $\mathcal{F}$ is at least as restrictive (has at least as many edges)
> as $\mathcal{E}$. Written $\mathcal{G} \leq \mathcal{H}$ (meaning $\mathcal{H}$
> is an IMAP of $\mathcal{G}$, i.e. $\mathcal{H}$ has strictly more CI constraints
> than $\mathcal{G}$).

The IMAP partial order is important for GES: the Forward phase drives the search from
the empty (independence-richest) model toward an IMAP of the true DAG.

## Examples

> [!example] Example: Three Equivalent DAGs
> Consider three variables $X, Y, Z$. The three DAGs
> $X \to Y \to Z$, $X \leftarrow Y \to Z$, and $X \leftarrow Y \leftarrow Z$
> all have the **same skeleton** ($X - Y - Z$) and **no v-structures**
> (in each case $Y$ is a middle node that is in the separating set of $X$ and $Z$).
> Therefore they are all Markov equivalent and belong to the same MEC.
>
> Their common CPDAG is $X - Y - Z$ (fully undirected), indicating that neither
> edge direction is identified from observational data alone.
>
> The fourth DAG on this skeleton, $X \to Y \leftarrow Z$ (with $X$ and $Z$
> non-adjacent), has a **v-structure** at $Y$. It is in a different MEC: its
> CPDAG is $X \to Y \leftarrow Z$ (both edges directed, since the collider is
> compelled).

> [!example] Example: Counting CPDAGs
> On $d = 3$ nodes, there are 25 distinct DAGs but only 11 distinct CPDAGs
> (Markov equivalence classes). The compression ratio grows rapidly: by $d = 6$
> there are 543 CPDAGs but 3,781,503 DAGs, illustrating why searching the
> CPDAG space is much more tractable than the DAG space.

## Connections

- **PC algorithm output**: PC learns the skeleton, orients v-structures from
  separating sets, then applies Meek's rules → [[PC Algorithm]]
- **GES search space**: GES searches directly over CPDAGs using insert/delete
  operators defined on equivalence classes → [[GES - Greedy Equivalence Search]]
- **NOTEARS**: solves a continuous program over $\mathbb{R}^{d\times d}$; its output
  must be post-processed to a CPDAG to reflect identifiability limits →
  [[NOTEARS Algorithm]]
- **Interventional identifiability**: interventions (hard do-operations) can orient
  edges that are reversible in the observational CPDAG — connecting to
  [[Directed Acyclic Graphs]] and the do-calculus

## See Also
- [[PC Algorithm]] — discovers CPDAGs using CI tests
- [[GES - Greedy Equivalence Search]] — discovers CPDAGs via score maximisation
- [[DAG Structure Learning Problem]] — formal setup of the learning problem
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Summary Causal DAGs]] — related DAG representation for ABM causal summaries
