---
title: "Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/textbook
source: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, MIT Press (https://www.mitpressjournals.org/doi/book/10.7551/mitpress/1754.001.0001)"
source_location: "Ch. 3–4 (Markov condition, faithfulness, equivalence); Verma & Pearl (1990)"
date_ingested: 2026-09-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[PC Algorithm - Orientation Rules]]"
  - "[[GES - Overview]]"
  - "[[Smooth Characterization of Acyclicity]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "Verma-Pearl equivalence"
---

# Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode exactly the same
> conditional independence (CI) relations — equivalently, if they share the same
> **skeleton** (adjacency graph) and the same set of **v-structures** (unshielded
> colliders). The Markov equivalence class is canonically represented by a
> **CPDAG** (Completed Partially Directed Acyclic Graph), also called the
> **essential graph**, in which directed edges are those shared by *all* DAGs in
> the class and undirected edges represent edges whose orientation is not
> identifiable from observational data alone. This is the output of constraint-based
> (PC) and score-based (GES) structure learning algorithms.

## Overview

Observational data can distinguish at most a **Markov equivalence class** of DAGs —
not an individual DAG. Two distinct DAGs $G_1$ and $G_2$ are observationally
indistinguishable (i.e., Markov equivalent) when they induce the same set of
CI statements via the Markov condition. Knowing which equivalence class the
true DAG belongs to is already highly informative: within the class all edges
are present or absent identically (same skeleton), and many edges are already
oriented (the compelled edges). Recovering the full equivalence class from data
is therefore the realistic target of structure learning under faithfulness.

The CPDAG provides a compact representation: rather than listing all
(exponentially many) DAGs in the class, a single mixed graph with directed and
undirected edges encodes them all. Both the [[PC Algorithm - Overview|PC algorithm]]
and [[GES - Overview|GES]] return a CPDAG.

## Main Content

### The Causal Markov and Faithfulness Assumptions

> [!definition] Definition: Causal Markov Condition
> A DAG $G$ and joint distribution $P$ satisfy the **Causal Markov Condition** if
> every variable $X$ is independent of its non-descendants given its parents:
> $$X \perp\!\!\!\perp \text{NonDesc}(X) \mid \text{Pa}(X).$$
> Equivalently, $P$ factorises as $P(X_1,\ldots,X_p) = \prod_{i=1}^p P(X_i \mid \text{Pa}_G(X_i))$.
^def-markov

> [!definition] Definition: Faithfulness
> $P$ is **faithful** to $G$ if all CIs in $P$ are entailed by the Markov condition
> applied to $G$ — i.e., no CI holds "accidentally." Formally:
> $$X \perp\!\!\!\perp Y \mid Z \text{ in } P \implies X \perp\!\!\!\perp Y \mid Z \text{ in every } P' \text{ faithful to } G.$$
> Faithfulness rules out parameter cancellations that create spurious independence.
^def-faithful

Faithfulness is generically satisfied: the set of parameter configurations
violating it has Lebesgue measure zero for linear Gaussian and discrete models.
It is the analogue of the "generic position" assumption in algebraic geometry.

### V-structures (Immoralities)

> [!definition] Definition: V-structure / Immorality
> A **v-structure** (also called an **immorality** or **unshielded collider**) in a DAG $G$
> is a triple $(X, Z, Y)$ such that:
> - $X \to Z \leftarrow Y$ (both edges directed into $Z$),
> - $X$ and $Y$ are **not** adjacent in $G$.
>
> V-structures are the only configurations in which two adjacent-to-$Z$ variables are
> *not* d-separated by $Z$'s parent set; they are the source of "explaining away" and
> **selection bias**.
^def-vstructure

V-structures are causally meaningful: $X \to Z \leftarrow Y$ means $X$ and $Y$
are marginally independent but become dependent given $Z$ (or its descendants) —
the hallmark of a collider. See [[Spurious Association and Confounds]] for the
d-separation semantics.

### The Markov Equivalence Theorem

> [!theorem] Theorem (Verma & Pearl 1990; Frydenberg 1990): Markov Equivalence Criterion
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** — i.e., they encode the same CI
> structure under the Markov condition — if and only if they have:
> 1. The **same skeleton** (same edges, ignoring orientation), and
> 2. The **same set of v-structures** (same unshielded colliders).
>
> Consequently, structure learning from observational data can identify the skeleton
> and v-structures, but cannot distinguish among the remaining edge orientations.
^thm-markov-equiv

**Proof sketch:** The Markov condition factorises $P$ over $G$; two factorisations
represent the same CI model iff their d-separation relations coincide. Skeleton
differences create adjacency differences (detectable by CI tests). V-structure
differences are the only orientation differences that affect d-separation: the
triple $X - Z - Y$ (non-adjacent $X,Y$) is a v-structure in $G_1$ but a chain/fork in
$G_2$ iff $G_1$ and $G_2$ differ in the CI $X \perp Y \mid Z$.

### CPDAGs (Completed Partially Directed Acyclic Graphs)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (or **essential graph**) of a Markov equivalence class $[G]$ is the
> unique mixed graph $\mathcal{E}(G)$ on the same vertices such that:
> - **Undirected edge** $X - Y$: the edge is present in all DAGs in $[G]$ but its
>   direction varies — some have $X \to Y$, others $X \leftarrow Y$.
> - **Directed edge** $X \to Y$: the edge is present and oriented $X \to Y$ in
>   *every* DAG in $[G]$ (called a **compelled** or **strongly protected** edge).
>
> Every DAG in $[G]$ is obtained by consistently orienting all undirected edges of
> $\mathcal{E}(G)$ such that no new v-structures are created and no directed cycles
> arise.
^def-cpdag

**Compelled edges** arise from three patterns: edges out of v-structures and edges
forced by Meek's four orientation propagation rules (see [[PC Algorithm - Orientation Rules]]).

**Construction:** Given the skeleton and the set of v-structures, the CPDAG is
computed by applying Meek's rules exhaustively — exactly the orientation phase of
the PC algorithm. Alternatively, the Dor–Tarsi (1992) algorithm constructs the CPDAG
directly from a single DAG representative.

### Identifiability Within the Equivalence Class

Under the Markov and faithfulness assumptions alone, the equivalence class is the
maximum identifiable structure. However, additional assumptions enable **full
identification** of the DAG:

| Additional assumption | Method | Identifiable? |
|----------------------|--------|---------------|
| No hidden confounders + linear Gaussian | ICA / LiNGAM | Yes (via non-Gaussianity) |
| No hidden confounders + non-linear additive noise | ANM | Yes |
| Hidden confounders allowed | FCI algorithm | CPDAG extended to PAG |
| Interventional data available | IDA / GIES | Partial or full DAG |

This table summarises the limits of observational causal discovery.

## Examples

> [!example] Example: Three-Variable Equivalence Class
> Consider the variables $X, Y, Z$ with true DAG $X \to Y \to Z$.
>
> **Markov equivalent DAGs:** $X \leftarrow Y \to Z$ (fork) and $X \to Y \to Z$ (chain) share
> the same skeleton ($X-Y-Z$) and no v-structures (since $X-Y-Z$ with $X,Z$ non-adjacent
> has $Y$ *not* as a collider). Hence both DAGs are Markov equivalent.
>
> **CPDAG:** $X - Y - Z$ (all edges undirected) — the chain direction is not identifiable.
>
> **Non-equivalent:** $X \to Y \leftarrow Z$ (v-structure at $Y$ with $X,Z$ non-adjacent).
> This is in a *different* equivalence class because $X \perp Z$ marginally but
> $X \not\perp Z \mid Y$ (collider $Y$ opens the path when conditioned on).

> [!example] Example: Compelled and Reversible Edges
> In the DAG $X \to Y \leftarrow Z, Z \to W$ with $X,Z$ non-adjacent:
> - Edge $X \to Y$: compelled (it is part of the v-structure $X \to Y \leftarrow Z$,
>   and reversing it would destroy the v-structure — not allowed).
> - Edge $Z \to Y$: compelled (same v-structure).
> - Edge $Z \to W$: compelled by Meek Rule R1 (since $Z \to Y \leftarrow X$ and
>   reversing $Z \to W$ would create a new v-structure or cycle).
>
> CPDAG: all four edges are directed (no undirected edges). The equivalence class
> is a singleton.

## Connections

- **PC algorithm** (see [[PC Algorithm - Overview]]): recovers the skeleton via CI tests,
  orients v-structures by the sepset criterion, and propagates orientations via Meek rules
  to output the CPDAG.
- **GES** (see [[GES - Overview]]): searches the space of CPDAGs directly (via the
  equivalence class representation), using a decomposable score function.
- **NOTEARS** (see [[NOTEARS - Overview]]): optimizes over the space of weighted
  adjacency matrices rather than CPDAGs — it returns a single DAG, not a CPDAG,
  and may not find a DAG in the correct equivalence class.
- **DAG Structure Learning Problem** (see [[DAG Structure Learning Problem]]): the
  NP-hardness of structure learning is the motivation for equivalence-class-based
  methods.
- **Hidden confounders:** Markov equivalence under faithfulness assumes causal
  sufficiency. When hidden common causes exist, the output is a PAG
  (Partial Ancestral Graph), produced by the FCI algorithm.

## See Also
- [[DAG Structure Learning Problem]] — the formal learning problem and score functions
- [[PC Algorithm - Overview]] — constraint-based learning returning the CPDAG
- [[GES - Overview]] — score-based learning over the CPDAG space
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Spurious Association and Confounds]] — fork/pipe/collider d-separation examples
- [[NOTEARS - Overview]] — continuous optimization alternative (returns DAG, not CPDAG)
