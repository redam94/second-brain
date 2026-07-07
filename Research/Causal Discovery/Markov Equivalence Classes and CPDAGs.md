---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-CausalDiscovery-Survey.md]]"
source_location: "Part 1: Markov Equivalence and CPDAGs"
date_ingested: 2026-07-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Causal Discovery Algorithms Comparison]]"
aliases:
  - "Markov equivalence"
  - "CPDAG"
  - "essential graph"
  - "MEC"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> From purely observational data, causal structure learning can identify at most the **Markov
> equivalence class (MEC)** of the true DAG — the set of all DAGs encoding the same conditional
> independence relations. The **CPDAG** (completed partially directed acyclic graph) is the
> unique canonical representative of an MEC: directed edges are invariantly oriented across the
> entire class, undirected edges can go either way. Both [[PC Algorithm]] and
> [[Greedy Equivalence Search (GES)]] output CPDAGs. Understanding CPDAGs is prerequisite for
> understanding what causal discovery algorithms can and cannot recover.

## Overview

A causal discovery algorithm sees only data — joint distributions over observed variables. From
that data, it can in principle recover all the **conditional independence** (CI) relations in
the distribution. But many structurally different DAGs can encode *exactly the same* set of CI
relations. These DAGs are **Markov equivalent**: they are statistically indistinguishable from
observational data alone.

This has a direct consequence for identifiability: **edge orientations that differ across Markov
equivalent DAGs are not identifiable from observational data alone.** The best any algorithm can
do — without additional assumptions (interventional data, non-Gaussianity, nonlinearity) — is to
recover the MEC, represented as a CPDAG.

## Main Content

### Markov Condition and Faithfulness

> [!definition] Definition: Causal Markov Condition (Spirtes, Glymour & Scheines 2000, Ch. 2)
> Given a DAG $G$ over variables $V$ and a joint distribution $P$, $P$ satisfies the **causal
> Markov condition** with respect to $G$ if every node $X \in V$ is conditionally independent
> of its non-descendants given its parents:
> $$X \perp\!\!\!\perp \mathrm{NonDesc}(X) \mid \mathrm{Pa}_G(X).$$
> Equivalently: $P$ factorises as $P(V) = \prod_{X \in V} P(X \mid \mathrm{Pa}_G(X))$.
^def-markov-condition

> [!definition] Definition: Faithfulness Condition
> $P$ is **faithful** to $G$ if every conditional independence in $P$ is entailed by the Markov
> condition applied to $G$ — i.e., implied by a d-separation in $G$. Formally:
> $$X \perp\!\!\!\perp Y \mid Z \text{ in } P \implies X \perp\!\!\!\perp Y \mid Z \text{ in } G \text{ (d-sep)}.$$
> There are no "accidental" independencies: only those the graph necessitates.
^def-faithfulness

Together, Markov + Faithfulness establish the **Causal Markov–Faithfulness Bridge**: $P$ encodes
*exactly* the d-separation relations of $G$. This bridge is the foundation on which PC and GES
are built. Without faithfulness, edge cancellations can create independencies not implied by the
graph structure, and the algorithm outputs an incorrect skeleton.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $G_1$ and $G_2$ over the same vertex set are **Markov equivalent** if they entail
> exactly the same d-separation relations — and hence, under faithfulness, represent the same
> class of distributions. The **Markov equivalence class (MEC)** of $G$, written $[G]$, is the
> set of all DAGs Markov equivalent to $G$.
^def-markov-equivalence

The MEC can be large. For example, the three DAGs $X \to Y \to Z$, $X \leftarrow Y \to Z$, and
$X \leftarrow Y \leftarrow Z$ are all Markov equivalent: same skeleton ($X-Y-Z$), no v-structures.
The DAG $X \to Y \leftarrow Z$ (with no edge $X-Z$) is *not* equivalent to these: it has a
v-structure (unshielded collider) at $Y$.

### Verma–Pearl Characterisation Theorem

> [!theorem] Theorem: Markov Equivalence Characterisation (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if they have the same:
> 1. **Skeleton** — the same undirected edges (ignoring orientations), and
> 2. **V-structures (unshielded colliders)** — for every triple $X, Z, Y$ with $X-Z-Y$ and
>    $X$ non-adjacent to $Y$: $X \to Z \leftarrow Y$ is a v-structure in $G_1$ iff it is in $G_2$.
>
> A **v-structure** (unshielded collider) at $Z$ is a triple $X \to Z \leftarrow Y$ where
> $X$ and $Y$ are **non-adjacent** (no edge between them). Shielded colliders — where $X$ and
> $Y$ are adjacent — are not v-structures and do not distinguish MECs.
^thm-verma-pearl

**Intuition:** The skeleton tells you *which* variables are related; v-structures tell you which
arrows are forced by the pattern of conditional independencies. Every other edge orientation is
unconstrained by observational data.

### CPDAGs (Completed Partially Directed Acyclic Graphs)

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> A **CPDAG** (also called the *essential graph* of a MEC) is a partially directed graph $C$
> over $V$ that uniquely represents the MEC $[G]$ as follows:
> - **Directed edge $X \to Y$ in $C$** $\iff$ $X \to Y$ appears in *every* DAG in $[G]$
>   (compelled/invariant orientation).
> - **Undirected edge $X - Y$ in $C$** $\iff$ $X \to Y$ appears in *some but not all* DAGs in $[G]$
>   (reversible orientation).
^def-cpdag

Every MEC has a unique CPDAG, and every CPDAG represents a unique MEC. Converting a DAG $G$ to
its CPDAG amounts to "forgetting" all orientations that are not forced by v-structures and
then re-applying Meek's orientation rules (below).

### Meek's Orientation Rules

After orienting v-structures, the following four rules (Meek 1995) propagate additional
compelled orientations to edges that remain undirected in a PDAG:

> [!theorem] Theorem: Meek's Orientation Rules (Meek 1995)
> The following rules are **sound** (every orientation produced is invariant across the MEC)
> and **complete** (they orient every edge that can be oriented). Apply until quiescence.
>
> **Rule 1 (Acyclicity-1):** If $A \to B - C$ and $A, C$ non-adjacent → orient $B \to C$.
>
> **Rule 2 (Acyclicity-2):** If $A \to B \to C$ and $A - C$ → orient $A \to C$.
>
> **Rule 3 (Ambiguity):** If $A - B$, $A - C$, $B \to D$, $C \to D$, $B, C$ non-adjacent → orient $A \to D$.
>
> **Rule 4 (Cycle):** If $A - B$, $B \to C \to D$, $A - D$, $B, D$ non-adjacent → orient $A \to B$.
^thm-meek-rules

**Why these rules work:** Each rule identifies an orientation that, if reversed, would either
(a) create a new v-structure (violating MEC membership) or (b) introduce a directed cycle (violating
acyclicity). Since neither is allowed, the orientation is forced.

### Identifiability Limits under Faithfulness

Even with infinite data and oracle CI tests, only the MEC is identifiable from observational
data. Directed edges in the CPDAG can be oriented causally ($X \to Y$ means $X$ is a cause of $Y$),
but undirected edges remain ambiguous.

**Conditions enabling full DAG identification:**
- **Interventional data** — do-calculus or randomized experiments on some variables
- **Non-Gaussianity** — LiNGAM (Shimizu et al. 2006) exploits non-Gaussian noise to orient all edges
- **Nonlinearity** — Additive Noise Models (ANMs) achieve full identification in many nonlinear settings
- **Acyclic time structure** — known causal ordering (time precedes effect)

## Examples

> [!example] Example: Identifying the CPDAG for a 3-node Graph
> **Given DAG:** $X \to Y \to Z$ with $X, Z$ non-adjacent.
>
> **Skeleton:** $X - Y - Z$ (chain).
>
> **V-structures:** None. The only triple is $X - Y - Z$, but $Y$ is not a collider (it's a
> non-collider/chain). The v-structure rule $X \to Y \leftarrow Z$ requires $X, Z$ non-adjacent
> *and* $Y$ being a common effect, which is not the case here.
>
> **CPDAG:** Since there are no v-structures, no orientation is compelled by the Verma–Pearl
> theorem. Meek's rules find no additional orientations. Result: $X - Y - Z$ (all undirected).
>
> **MEC:** Contains 3 DAGs: $X \to Y \to Z$, $X \leftarrow Y \to Z$, $X \leftarrow Y \leftarrow Z$.
> All three are statistically indistinguishable from observational data.

> [!example] Example: V-Structure Forces Orientation
> **Given DAG:** $X \to Z \leftarrow Y$ with $X, Y$ non-adjacent.
>
> **Skeleton:** $X - Z - Y$.
>
> **V-structures:** $X \to Z \leftarrow Y$ (collider at $Z$, $X-Y$ not adjacent).
>
> **CPDAG:** $X \to Z \leftarrow Y$ (both edges directed). The v-structure is compelled.
>
> **MEC:** Contains only 1 DAG: $X \to Z \leftarrow Y$ itself. The common cause pattern
> $X \leftarrow Z \rightarrow Y$ has no v-structure; the chain $X \to Z \to Y$ has a different
> independence structure. Only the collider DAG encodes $X \perp\!\!\!\perp Y$ (marginally).

## Connections

- **PC algorithm** outputs the CPDAG by applying v-structure orientation + Meek's rules to the
  learned skeleton — see [[PC Algorithm]].
- **GES** navigates the space of CPDAGs directly using Insert/Delete operators that move between
  adjacent MECs — see [[Greedy Equivalence Search (GES)]].
- **NOTEARS** outputs a single DAG (thresholded $W$ matrix), not a CPDAG. To compare with
  PC/GES, one converts the NOTEARS DAG to its CPDAG — see [[NOTEARS - Overview]].
- **D-separation** is the graph-theoretic criterion for reading off CIs from a DAG. The CPDAG
  preserves all d-separation relations of its MEC members — see [[Directed Acyclic Graphs]].
- **Intervention and do-calculus** can resolve the ambiguity in undirected CPDAG edges. The
  interventional Markov equivalence class is typically smaller than the observational one — see
  [[Directed Acyclic Graphs]] and [[Spurious Association and Confounds]].

## See Also
- [[DAG Structure Learning Problem]] — the problem CPDAG identification solves
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[Greedy Equivalence Search (GES)]] — score-based algorithm that outputs a CPDAG
- [[NOTEARS - Overview]] — continuous-optimization approach (outputs a DAG, not CPDAG)
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Spurious Association and Confounds]] — fork/pipe/collider in causal DAG reasoning
- [[Causal Discovery Algorithms Comparison]] — practical guidance on when to use each algorithm
