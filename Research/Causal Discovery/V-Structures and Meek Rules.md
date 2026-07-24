---
title: "V-Structures and Meek Rules"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Survey.md]]"
source_location: "§3, Phase 2: V-structure orientation + Meek (1995) UAI; Spirtes et al. (2000) Ch. 5"
date_ingested: 2026-07-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Skeleton Recovery and CI Tests]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[PC Algorithm - Overview]]"
aliases:
  - "Meek orientation rules"
  - "collider detection"
  - "immorality orientation"
  - "PC Phase 2"
---

# V-Structures and Meek Rules

> [!summary]
> **Phase 2 of the PC algorithm** orients as many edges as possible using two tools.
> First, **v-structure detection**: for each unshielded triple $X - Z - Y$ (with $X, Y$
> non-adjacent), orient $X \to Z \leftarrow Y$ (a collider) iff $Z \notin \text{Sep}(X, Y)$.
> Second, **Meek's four orientation rules** (Meek 1995): apply R1–R4 exhaustively to
> propagate orientations implied by acyclicity and the already-identified v-structures.
> The output is the CPDAG: directed edges that appear in every member of the true MEC,
> and undirected edges whose direction is not identifiable from observational data alone.

## Overview

After Phase 1 recovers the skeleton, Phase 2 determines which edges can be **oriented**
from observational data. Not all edges can be oriented — the undirected edges in the CPDAG
are those whose direction is genuinely unidentifiable without additional assumptions or
interventional data. Phase 2 identifies the maximum set of orientable edges in two steps.

## Main Content

### Step 1: V-Structure (Collider) Detection

> [!definition] Definition: Unshielded Triple
> A triple $(X_i, X_k, X_j)$ is an **unshielded triple** in skeleton $C$ if:
> - $X_i - X_k$ and $X_k - X_j$ are both edges in $C$ (forming a path), and
> - $X_i$ and $X_j$ are **not** adjacent in $C$.
>
> The node $X_k$ is the middle variable — it is a potential collider or non-collider.
^def-unshielded-triple

> [!theorem] Theorem: V-Structure Identification (Spirtes et al. 2000, Lemma 5.1.3)
> Under the Markov condition, faithfulness, and causal sufficiency, for every unshielded
> triple $(X_i, X_k, X_j)$ in skeleton $C$:
> - $X_k \notin \text{Sep}(X_i, X_j) \implies$ orient as $X_i \to X_k \leftarrow X_j$ (v-structure)
> - $X_k \in \text{Sep}(X_i, X_j) \implies$ the edges at $X_k$ are **not** a v-structure (non-collider)
>
> **Intuition**: if $X_k$ is not in the separating set of $(X_i, X_j)$, conditioning on
> $X_k$ would create a dependence between the formerly independent $X_i$ and $X_j$
> (Berkson's paradox / collider bias). This means $X_k$ must be a collider.
^thm-vstructure-id

> [!example] Example: V-Structure vs Non-Collider
> **Scenario**: skeleton $A - B - C$, with $A$ and $C$ non-adjacent, $\text{Sep}(A, C) = \emptyset$.
>
> - Since $B \notin \text{Sep}(A, C) = \emptyset$, orient as $A \to B \leftarrow C$ (v-structure).
>
> **Contrast**: if $\text{Sep}(A, C) = \{B\}$:
> - Since $B \in \{B\}$, the triple is a **non-collider**. Edges $A - B - C$ remain undirected
>   (or get a consistent orientation in a later rule).
^ex-vstructure

### Step 2: Meek's Orientation Rules

After identifying all v-structures, additional edges can be oriented by logical necessity
(acyclicity + no new v-structures). **Meek (1995)** proved that four rules suffice to
orient all such compelled edges:

> [!theorem] Theorem: Meek's Orientation Rules (Meek 1995, Thm. 2)
> The following four rules, applied **exhaustively** (until no new orientation can be made),
> produce the CPDAG of the true MEC, given the skeleton and v-structures:
>
> **R1 — Acyclicity propagation**:
> If $A \to B - C$ and $A$ is **not adjacent** to $C$, orient $B \to C$.
> *Reason*: orienting $C \to B$ would create a new v-structure $A \to B \leftarrow C$
> (since $A \not\text{adj} C$), but we know the v-structure set is already correct.
>
> **R2 — Acyclicity (cycle prevention)**:
> If $A \to B \to C$ and $A - C$ (undirected), orient $A \to C$.
> *Reason*: orienting $C \to A$ would create a directed cycle $A \to B \to C \to A$.
>
> **R3 — Meek's three-path rule**:
> If $A - B$, $A - C$, $B \to D$, $C \to D$, and $A - D$ (undirected, $B$ not adj. $C$),
> orient $A \to D$.
> *Reason*: orienting $D \to A$ creates a new v-structure at $D$ (since $B \not\text{adj} C$),
> contradicting the already-identified v-structure set.
>
> **R4 — Meek's four-path rule**:
> If $A - B$, $B \to C \to D$, $A - D$ (undirected), orient $A \to D$.
> *Reason*: orienting $D \to A$ creates a directed cycle via $D \to A - B \to C \to D$,
> combined with the constraint that $A \to B$ or $B \to A$ must be set to avoid new v-structures.
^thm-meek-rules

> [!note] Completeness of Meek's Rules
> Meek (1995) proved that rules R1–R4 are **complete**: applying them exhaustively to
> the skeleton with the identified v-structures produces exactly the CPDAG of the true MEC.
> No fifth rule is needed. After exhaustion, any remaining undirected edge represents a
> **genuinely reversible** edge — one that points in different directions in different
> member DAGs.

### Algorithm: Phase 2

```
Phase 2 (Orientation, given skeleton C and Sep(·,·)):

  Step 2a — V-structures:
    For each unshielded triple (Xi, Xk, Xj) in C:
      If Xk ∉ Sep(Xi, Xj):
        Orient Xi → Xk ← Xj
        (Mark Xk as a collider / v-structure node)

  Step 2b — Meek rules (iterate until convergence):
    While any rule applies:
      Apply R1 if pattern A → B - C (A not adj. C) → orient B → C
      Apply R2 if pattern A → B → C, A - C → orient A → C
      Apply R3 if pattern A - B, A - C, B → D, C → D, A - D, (B not adj C) → orient A → D
      Apply R4 if pattern A - B, B → C → D, A - D → orient A → D

  Output: CPDAG C with all compelled edges directed, reversible edges undirected
```

### What Remains Undirected

After Phase 2, any undirected edge $X - Y$ in the CPDAG is a **reversible edge**: there
exist two Markov equivalent DAGs, one with $X \to Y$ and one with $X \leftarrow Y$, that
are both consistent with the observed data. To determine the true direction, one would need:

1. **Interventional data**: observing $Y$ after intervening on $X$ vs. $Y$ after intervening on $Y$.
2. **Non-Gaussianity (LiNGAM)**: non-Gaussian noise renders all edges identifiable in linear models
   (Shimizu et al. 2006).
3. **Functional form restrictions**: e.g., additive noise model $Y = f(X) + \epsilon$ with
   asymmetric noise distribution (Peters, Mooij et al. 2014).

## Connections

- **Input from Phase 1**: [[Skeleton Recovery and CI Tests]] provides the skeleton $C$ and
  all separating sets $\text{Sep}(X_i, X_j)$ that this phase uses to identify v-structures.
- **CPDAG output**: the graph produced here is the same CPDAG that [[GES - Greedy Equivalence Search]]
  would produce from a score-based perspective — the two approaches converge to the same object.
- **Markov equivalence**: the theoretical foundation explaining why some edges remain
  undirected is in [[Markov Equivalence and CPDAGs]] (Verma–Pearl theorem).
- **Summary causal DAGs**: [[Summary Causal DAGs]] (Zeng 2025) receives a CPDAG as input;
  the orientation rules here are what produce that CPDAG.
- **Collider bias**: the v-structure rule directly exploits collider bias — see
  [[Spurious Association and Confounds]] for the fork/pipe/collider framework in causal inference.

## See Also
- [[PC Algorithm - Overview]] — the complete two-phase algorithm this note implements Phase 2 of
- [[Skeleton Recovery and CI Tests]] — Phase 1 that produces the skeleton and Sep sets used here
- [[Markov Equivalence and CPDAGs]] — theoretical foundation: Verma–Pearl theorem and CPDAG definition
- [[GES - Greedy Equivalence Search]] — produces the same CPDAG via score-based search
- [[Spurious Association and Confounds]] — fork/pipe/collider semantics; v-structures are colliders
