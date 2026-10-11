---
title: "PC Algorithm - Orientation Phase"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-algorithm-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) §5.4.2; Meek (1995)"
date_ingested: 2026-10-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Skeleton Phase]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "v-structure orientation"
  - "Meek rules"
  - "CPDAG construction"
  - "immorality detection"
---

# PC Algorithm - Orientation Phase

> [!summary]
> After the skeleton phase produces an undirected graph and separating sets, the orientation
> phase first identifies **v-structures** (immoralities: $X \to Z \leftarrow Y$ with $X, Y$
> non-adjacent), then applies the four **Meek rules** (Meek 1995) to propagate orientations
> and produce the **CPDAG** — the unique representative of the true Markov equivalence class.
> The CPDAG has directed edges where all equivalent DAGs agree and undirected edges where
> they disagree. Only v-structures are identifiable from observational data alone.

## Overview

Given the skeleton $G$ and the separating sets $\mathrm{Sepset}(\cdot,\cdot)$ from the skeleton
phase, orientation proceeds in two sub-steps:

1. **V-structure identification**: orient immoralities $X \to Z \leftarrow Y$.
2. **Meek rule propagation** (Meek 1995): orient further edges without introducing new v-structures or cycles, until no more rules apply.

The result is the CPDAG ([[PC Algorithm - Overview#^def-cpdag]]).

## Main Content

### Step 1: V-structure identification

> [!definition] Definition: V-structure (Immorality)
> A **v-structure** (also *immorality*) in a DAG is a triple $X \to Z \leftarrow Y$ where
> $X$ and $Y$ are **not** adjacent. The name comes from the shape: two arrows pointing in
> ("V"). An immorality creates a *collider* at $Z$: conditioning on $Z$ makes $X$ and $Y$
> **dependent** even if they were marginally independent. This is the reverse of d-separation's
> behavior at non-colliders (forks and chains).
^def-v-structure

V-structures are identifiable from data because they leave a specific statistical signature:
$X \perp\!\!\!\perp Y$ marginally (or given other variables excluding $Z$), but $X \not\!\perp\!\!\!\perp Y \mid Z$.

```
For each triple (Xi, Xk, Xj) such that:
  - Xi — Xk is an edge (Xi and Xk are adjacent)
  - Xk — Xj is an edge (Xk and Xj are adjacent)
  - Xi and Xj are NOT adjacent:
    
  if Xk ∉ Sepset(Xi, Xj):
    orient Xi → Xk ← Xj   (v-structure / immorality)
  else:
    leave Xi — Xk — Xj undirected
```

**Why sepset?** The separating set $S$ for non-adjacent $X_i, X_j$ is the set of variables
that d-separates them in the true DAG. If $X_k \notin S$, then $X_k$ is a collider on the
path $X_i - X_k - X_j$, so the triple must be a v-structure. If $X_k \in S$, conditioning
on $X_k$ blocks the path (non-collider), so the triple is not a v-structure.

### Step 2: Meek rules (R1–R4)

Meek (1995) shows that once v-structures are placed, exactly four orientation rules can be
applied repeatedly to orient additional edges *without* creating new v-structures or directed
cycles. These rules are **complete**: applying them exhaustively produces the CPDAG.

> [!theorem] Theorem: Meek rules are complete (Meek 1995)
> Starting from the v-structures in the true CPDAG, the four rules R1–R4 applied exhaustively
> produce the full CPDAG. No other edges can be oriented from observational data alone under
> Markov and faithfulness.
^thm-meek-complete

**Rule R1** — Extending a chain to avoid a new v-structure:
> If $\alpha \to \beta — \gamma$ and $\alpha, \gamma$ are non-adjacent:
> orient $\beta \to \gamma$.
> (Otherwise $\gamma$ would become an unidentified v-structure at $\beta$.)

**Rule R2** — Completing a triangle with an acyclicity constraint:
> If $\alpha \to \beta \to \gamma$ and $\alpha — \gamma$:
> orient $\alpha \to \gamma$.
> (Otherwise $\gamma \to \alpha$ would create a cycle.)

**Rule R3** — Resolving a "diamond" pattern:
> If $\alpha — \beta \to \gamma$, $\alpha — \delta \to \gamma$, $\alpha — \gamma$,
> and $\beta, \delta$ are non-adjacent:
> orient $\alpha \to \gamma$.
> (Otherwise one of the two unoriented edges would be forced into an inconsistent v-structure.)

**Rule R4** — Longer-range acyclicity:
> If $\alpha — \beta \to \gamma \to \delta$, $\alpha — \gamma$, and $\alpha — \delta$:
> orient $\alpha \to \delta$.

### Algorithm 2: Full orientation phase

```
OrientPC(skeleton G, Sepset):
  # Step 1: V-structures
  for each unshielded triple (Xi — Xk — Xj):   # Xi, Xj non-adjacent
    if Xk ∉ Sepset(Xi, Xj):
      orient Xi → Xk ← Xj

  # Step 2: Meek rules (repeat until no change)
  repeat:
    apply R1, R2, R3, R4 to all eligible triples
  until no more edges can be oriented

  return CPDAG G
```

### What the CPDAG tells us

> [!note] Reading identifiability from the CPDAG
> - **Directed edges** in the CPDAG ($X \to Y$): causal direction is **identified** from data —
>   all Markov-equivalent DAGs have this same orientation.
> - **Undirected edges** ($X - Y$): the direction is **not identifiable** from observational
>   data — the MEC contains DAGs with $X \to Y$ and others with $Y \to X$.
>
> To orient the remaining edges, one needs:
> - **Interventional data** (do-calculus interventions orient some edges),
> - **Non-Gaussianity** (LiNGAM: non-Gaussian noise makes the full DAG identifiable), or
> - **Additive noise models** (ANM: asymmetry of residuals).

## Examples

> [!example] Example: Identifying v-structure in a three-variable system
> **Setup**: Variables $X, Y, Z$. True DAG: $X \to Z \leftarrow Y$, $X$ and $Y$ independent.
>
> **Skeleton phase**: test $X \perp\!\!\!\perp Y$ (marginal) — accepted → remove $X-Y$ edge.
> Test $X \perp\!\!\!\perp Z$ — rejected (since $X \to Z$). Test $Y \perp\!\!\!\perp Z$ — rejected.
> Skeleton: $X - Z - Y$, $\mathrm{Sepset}(X,Y) = \emptyset$.
>
> **Orientation**: $Z \notin \mathrm{Sepset}(X,Y) = \emptyset$, so orient $X \to Z \leftarrow Y$.
>
> **CPDAG**: $X \to Z \leftarrow Y$ (fully oriented = unique MEC member).

## Connections

- **Output = input to GES backward phase** ([[Greedy Equivalence Search]]): GES also operates on and returns a CPDAG — the same mathematical object produced here.
- **Faithfulness is critical**: if faithfulness fails (e.g. two paths cancel), the sepsets will be wrong and v-structures will be misidentified.
- **Colliders vs. non-colliders**: the v-structure logic is grounded in d-separation ([[Directed Acyclic Graphs]]) — a collider at $Z$ opens conditional on $Z$; non-colliders close. The sepset test detects exactly this.

## See Also
- [[PC Algorithm - Overview]] — algorithm structure, assumptions, consistency
- [[PC Algorithm - Skeleton Phase]] — the CI-testing phase that produces the skeleton and sepsets
- [[Greedy Equivalence Search]] — score-based alternative that also outputs a CPDAG
- [[Directed Acyclic Graphs]] — d-separation and collider/non-collider logic
