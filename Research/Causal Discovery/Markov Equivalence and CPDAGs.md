---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-GES-JMLR.md]]"
source_location: "Chickering (2002) §2; Verma & Pearl (1990) UAI"
date_ingested: 2026-07-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Constraint-Based Causal Discovery]]"
aliases:
  - "CPDAG"
  - "Markov equivalence class"
  - "completed partially directed acyclic graph"
  - "Verma Pearl equivalence"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independencies.
> The Verma–Pearl theorem characterises the equivalence class by skeleton + v-structures.
> The **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique mixed graph
> representing an entire equivalence class: directed edges are those forced in *every* member DAG;
> undirected edges are those reversible without changing the encoded independencies. From observational
> data alone, the best one can generally recover is the CPDAG — the shared component of all
> compatible DAGs.

## Overview

From observational data under the Markov and faithfulness assumptions, causal structure learning
algorithms typically cannot identify a unique DAG. Multiple DAGs may encode the exact same
conditional independence structure and thus be indistinguishable without interventional data or
additional functional assumptions (non-Gaussianity, non-linearity). **Markov equivalence** is the
formal tool for characterising what *is* identifiable.

The CPDAG is the canonical representation output by both constraint-based algorithms ([[PC Algorithm]])
and score-based algorithms ([[Greedy Equivalence Search (GES)]]). Understanding equivalence classes is
prerequisite to interpreting any causal discovery result.

## Main Content

### The Markov Condition and Faithfulness

> [!definition] Definition: Markov Condition (Spirtes et al. 2000, Ch. 3)
> A DAG $G$ and a joint distribution $P$ over variables $\mathbf{X} = (X_1, \ldots, X_d)$ satisfy
> the **Markov condition** if every variable $X_i$ is conditionally independent of its
> non-descendants given its parents:
> $$X_i \perp_P \text{NonDesc}(X_i) \mid \text{Pa}_G(X_i) \quad \text{for all } i.$$
> Equivalently, $P$ factors as $P(\mathbf{X}) = \prod_{i=1}^d P(X_i \mid \text{Pa}_G(X_i))$.
^def-markov

> [!definition] Definition: Faithfulness (Spirtes et al. 2000, Ch. 3)
> $P$ and $G$ satisfy **faithfulness** (also called the "stability condition") if every conditional
> independence in $P$ is a consequence of the Markov condition applied to $G$:
> $$X_i \perp_P X_j \mid \mathbf{Z} \implies X_i \perp_G X_j \mid \mathbf{Z} \quad (\text{d-separation}).$$
> Faithfulness rules out "accidental cancellations" of path coefficients that would produce extra
> independencies not implied by the graph structure. Violations can occur for measure-zero sets of
> parameters — they are non-generic but can arise in practice near cancellation points.
^def-faithfulness

Together, Markov + faithfulness imply that the set of conditional independencies in $P$ is
**exactly** the set of d-separation statements in $G$. This equivalence is what makes
constraint-based discovery possible.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same variable set are **Markov equivalent**, written
> $G_1 \sim G_2$, if they encode the same set of conditional independence statements:
> for all disjoint sets $\mathbf{X}, \mathbf{Y}, \mathbf{Z}$,
> $$\mathbf{X} \perp_{G_1} \mathbf{Y} \mid \mathbf{Z} \iff \mathbf{X} \perp_{G_2} \mathbf{Y} \mid \mathbf{Z}.$$
^def-markov-equiv

Intuitively: two DAGs in the same equivalence class imply the same joint distribution
$P(\mathbf{X})$ (up to parametrisation), so no observational data can distinguish them.

### The Verma–Pearl Characterization

> [!theorem] Theorem: Skeleton + V-Structures Characterise Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (the same undirected graph of adjacencies), and
> 2. The same **v-structures** (unshielded colliders): $X \to Z \leftarrow Y$ with no edge $X$–$Y$.
>
> A **v-structure** / **unshielded collider** is a triple $(X, Z, Y)$ where $X \to Z$, $Y \to Z$,
> and $X, Y$ are not adjacent.
^thm-verma-pearl

> [!note] Why v-structures are identifiable
> The v-structure $X \to Z \leftarrow Y$ is distinguishable from the non-collider patterns
> $X \to Z \to Y$ or $X \leftarrow Z \to Y$ because in the collider, $X \perp Y$ marginally
> but $X \not\perp Y \mid Z$ (conditioning on $Z$ *opens* the path). The non-colliders have the
> opposite: $X \not\perp Y$ marginally but $X \perp Y \mid Z$. This asymmetry is detectable from
> the data without knowing the graph direction.

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a Markov equivalence class $[G]$ is the unique mixed graph (with both
> directed and undirected edges) such that:
> - $X \to Y$ appears in the CPDAG iff $X \to Y$ is in **every** DAG in $[G]$ (a **compelled** edge).
> - $X$–$Y$ appears undirected in the CPDAG iff there exist $G_1, G_2 \in [G]$ with $X \to Y$
>   in $G_1$ and $X \leftarrow Y$ in $G_2$ (a **reversible** edge).
>
> The CPDAG is the unique **maximally informative** representation of what the data can tell us
> about the causal graph under Markov + faithfulness.
^def-cpdag

> [!example] Example: A 3-Variable Equivalence Class
> Consider $X \to Z \leftarrow Y$ (v-structure): $Z \notin \text{SepSet}(X,Y)$.
> Its equivalence class is a singleton: this DAG is its own CPDAG because the collider
> orientation is uniquely identified.
>
> Compare $X \to Y \to Z$ (chain): $Y \in \text{SepSet}(X,Z)$. This is equivalent to
> $X \leftarrow Y \to Z$ (fork) and $X \leftarrow Y \leftarrow Z$ (reverse chain) — all three
> share the same skeleton and have no v-structures. The CPDAG is $X$ – $Y$ – $Z$ (fully undirected):
> the direction of any edge in this chain is not identifiable from observational data.
^ex-cpdag

### Covered Edge Reversals and Transformational Characterization

> [!theorem] Theorem: Transformational Characterization (Chickering 1995)
> $G_1 \sim G_2$ if and only if $G_1$ can be transformed into $G_2$ by a sequence of **covered
> edge reversals**. An edge $X \to Y$ in $G$ is **covered** if
> $\text{Pa}_G(Y) = \text{Pa}_G(X) \cup \{X\}$ (i.e. $Y$'s parents are exactly $X$'s parents plus $X$ itself).
>
> Reversing a covered edge preserves Markov equivalence (the same conditional independencies hold).
> The score of a score-equivalent criterion is invariant under covered edge reversals.
^thm-covered-edge

This theorem underlies the correctness of the **GES** algorithm — see [[Greedy Equivalence Search (GES)]].

### Meek Orientation Rules

After orienting v-structures, Meek (1995) showed that the remaining undirected edges can be
partially oriented by four **orientation propagation rules**, applied iteratively until no more
edges can be directed:

> [!definition] Meek Rules (Meek 1995; Spirtes et al. 2000 §5)
> Given the current partially directed graph:
>
> **R1 (New v-structure prevention):** If $X \to Y$ – $Z$ and $X$–$Z$ is not an edge, then orient $Y \to Z$.
> (Otherwise $X \to Y \leftarrow Z$ would be a new v-structure not found in Phase 2.)
>
> **R2 (Cycle prevention):** If $X \to Y \to Z$ and $X$ – $Z$ is undirected, then $X \to Z$.
> (Otherwise $X \leftarrow Z$ would create a directed cycle $X \to Y \to Z \to X$.)
>
> **R3 (Double-triangle rule):** If $X$ – $Y$ and $X$ – $W$ and $X$ – $Z$ and $W \to Y$ and $Z \to Y$
> and $W$–$Z$ not adjacent, orient $X \to Y$.
>
> **R4 (Discriminating path rule):** For a discriminating path for $Y$ through a node $X$, if
> $Y \notin \text{SepSet}(U,V)$ along the path, orient the relevant edge as a v-structure.
^def-meek-rules

## Connections

- **PC Algorithm** uses the Verma–Pearl characterisation to orient edges in Phase 2 (v-structures via
  separation sets) and Phase 3 (Meek rules) — see [[PC Algorithm]].
- **GES** operates directly on the CPDAG space, using covered edge reversals to guarantee that each
  step stays within a valid equivalence class — see [[Greedy Equivalence Search (GES)]].
- **NOTEARS** and other continuous methods identify a single DAG (not the equivalence class), but only
  under additional functional assumptions (linear SEM, noise model) — see [[NOTEARS - Overview]].
- **Score Equivalence**: BIC and BGe scores assign identical values to Markov-equivalent DAGs — see
  [[Greedy Equivalence Search (GES)]].
- **Full identifiability** (recovering a unique DAG beyond the CPDAG) requires non-Gaussianity
  (LiNGAM), nonlinear additive noise, or interventional data.

## See Also
- [[DAG Structure Learning Problem]] — the score-based formulation of DAG learning CPDAG sits within
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, Markov condition) in causal inference
- [[Constraint-Based Causal Discovery]] — general framework using CI tests
- [[PC Algorithm]] — outputs the CPDAG via CI testing
- [[Greedy Equivalence Search (GES)]] — outputs the CPDAG via score optimization
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[Canonical Causal DAGs]] — d-separation, path types, in the causal inference vault
