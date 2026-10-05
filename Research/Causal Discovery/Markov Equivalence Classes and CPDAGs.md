---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/CITATIONS-constraint-score-based-discovery.md]]"
source_location: "Verma & Pearl 1990; Andersson et al. 1997 §2-3; Chickering 2002 §2"
date_ingested: 2026-10-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Discovery Methods - Overview]]"
aliases:
  - "MEC"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "essential graph"
  - "Markov equivalence"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Observational data cannot distinguish DAGs that entail the same conditional
> independence relations. Such DAGs form a **Markov equivalence class (MEC)**.
> The canonical graphical summary of an MEC is the **CPDAG** (Completed Partially
> Directed Acyclic Graph), also called the **essential graph**: edges that are
> identically directed across all DAGs in the class appear directed; the rest
> appear undirected. MECs are characterized by a pair (skeleton, v-structures),
> and the CPDAG is the unique representative. Structure-learning algorithms
> ([[PC Algorithm]], [[GES - Greedy Equivalence Search]]) target the CPDAG, not
> a specific DAG.

## Overview

When fitting a DAG model to data, we can identify the joint distribution
$P(X_1,\ldots,X_d)$ — but not the generating DAG. Many DAGs encode the same
conditional independencies (CI) and therefore the same joint distribution. These
observationally indistinguishable DAGs form a **Markov equivalence class**.

The practical consequence: from observational data alone, we can at best
recover *which MEC* the true DAG belongs to. To recover a unique DAG one
needs additional leverage — interventions, non-Gaussian noise, or equal variances.

## Main Content

### Characterization

> [!definition] Definition: Markov Equivalent DAGs (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same node set $V$ are **Markov equivalent** if
> $d$-sep in $G_1$ and $d$-sep in $G_2$ produce the same set of conditional
> independencies — equivalently, if every distribution that factorizes according to
> $G_1$ also factorizes according to $G_2$, and vice versa.
>
> **Graphical characterization (Verma & Pearl 1990; Andersson et al. 1997):**
> $G_1 \sim G_2$ (Markov equivalent) if and only if:
> 1. $G_1$ and $G_2$ have the **same skeleton** (same pairs of adjacent nodes, ignoring direction), and
> 2. $G_1$ and $G_2$ have the **same v-structures** (same set of unshielded triples $X \to Z \leftarrow Y$ where $X$ and $Y$ are non-adjacent).
^def-mec

This is a complete characterization — skeleton + v-structures determine the MEC.
Edges not involved in any v-structure (or present in some v-structures and absent
in others) cannot be oriented from data alone.

### Compelled vs reversible edges

> [!definition] Definition: Compelled and Reversible Edges
> An edge $X \to Y$ in a DAG $G$ is **compelled** if every DAG in the same MEC as
> $G$ also contains $X \to Y$ (same direction). An edge $X - Y$ is **reversible**
> if the MEC contains DAGs with both orientations $X \to Y$ and $X \leftarrow Y$.
^def-compelled-reversible

Compelled edges arise from v-structures and their propagation via the Meek
(1995) orientation rules. Reversible edges are those whose reversal preserves
the skeleton and all v-structures.

### The CPDAG (Essential Graph)

> [!definition] Definition: CPDAG / Essential Graph (Andersson et al. 1997)
> The **CPDAG** (Completed Partially Directed Acyclic Graph) of a Markov equivalence
> class $[G]$ is the unique graph with the same node set $V$ such that:
> - An edge $X \to Y$ (directed) appears in the CPDAG iff $X \to Y$ is compelled — i.e., directed identically in *every* DAG in $[G]$.
> - An edge $X - Y$ (undirected) appears in the CPDAG iff $X \to Y$ and $X \leftarrow Y$ both appear in some DAGs of $[G]$ (the edge is reversible).
>
> The CPDAG is the **unique** representative of the MEC. Also called the
> **essential graph**.
^def-cpdag

The CPDAG satisfies two technical conditions that ensure it is a valid
representation:
1. **Acyclicity of the adjacency graph** (ignoring directions).
2. **Maximality**: every undirected edge lies on a chain $X - Z - Y$ for some non-adjacent $X, Y$ (no undirected edges can be oriented without creating a new v-structure or a cycle in some DAG in the MEC).

### Example

```
DAGs in the same MEC:
  G1: X → Z → Y      G2: X → Z ← Y (different v-structure — NOT in MEC)
  G3: X ← Z → Y      — G1 and G3 are Markov equivalent

CPDAG of {G1, G3}:
  X - Z → ... wait, let's check v-structures:
  G1: triple X-Z-Y is a non-collider (pipe) since Z ∈ Sep(X,Y) if X ⊥ Y | Z
  G3: same skeleton, same separation sets → same CPDAG
  CPDAG: X - Z - Y (all edges undirected if no v-structures fixed)
```

More concretely: the chain $X \to Z \to Y$ and the fork $X \leftarrow Z \to Y$
are Markov equivalent (both entail $X \perp Y \mid Z$). Their CPDAG is $X - Z - Y$
(both edges undirected). The collider $X \to Z \leftarrow Y$ is in a *different*
MEC (it entails $X \not\perp Y \mid Z$).
^example-chain-fork-collider

### Counting MECs

The number of MECs grows rapidly with $d$:

| $d$ nodes | MECs | DAGs |
|-----------|------|------|
| 3 | 11 | 25 |
| 4 | 185 | 543 |
| 5 | 6 782 | 29 281 |

The ratio of MECs to DAGs decreases with $d$, reflecting that larger graphs
have relatively fewer reversible edges (more are pinned by v-structures and
Meek propagation).

### Move operators on MECs (for GES)

Chickering (2002) shows that the space of CPDAGs is connected via three
local operators, enabling greedy search:

> [!definition] Definition: GES Move Operators (Chickering 2002 §4)
> Let $C$ be a CPDAG representing an MEC. Three operators transform $C$ into
> an adjacent CPDAG in the space of MECs:
>
> **Insert($X$, $Y$, $T$)**: Add edge $X \to Y$ to $C$, orienting $T \cup \{X\} \to Y$
> (where $T$ is a clique in the undirected neighbors of $Y$ not adjacent to $X$).
> Used in [[GES - Greedy Equivalence Search]] forward phase.
>
> **Delete($X$, $Y$, $H$)**: Remove edge $X - Y$ or $X \to Y$ from $C$, where $H$
> is a subset of undirected neighbors of $Y$ adjacent to $X$.
> Used in [[GES - Greedy Equivalence Search]] backward phase.
>
> **Turn($X$, $Y$, $C$)**: Reverse edge $X \to Y$ (or turn $X - Y$ to $X \to Y$),
> optionally with a re-orientation of a clique $C$. Used in the turn phase of
> GGES (generalized GES).
^def-ges-operators

## Connections

- **d-separation and the Markov condition**: The CPDAG encodes all and only the
  CI relations implied by the DAG; see [[Directed Acyclic Graphs]] for d-separation.
- **PC algorithm output**: the [[PC Algorithm]] recovers the CPDAG skeleton by
  CI testing and orients v-structures + Meek rules.
- **GES output**: [[GES - Greedy Equivalence Search]] performs greedy search over
  CPDAG space via Insert/Delete operators.
- **Bayesian networks**: probabilistic BNs and causal BNs share MEC identifiability;
  see [[Bayesian Networks - Foundational Methodology]] (gap 21) for the BN side.

## See Also
- [[PC Algorithm]] — recovers CPDAG from CI tests
- [[GES - Greedy Equivalence Search]] — greedy search over MEC space
- [[Causal Discovery Methods - Overview]] — full landscape
- [[DAG Structure Learning Problem]] — score-based formulation
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion
