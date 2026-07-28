---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "§2 — Markov equivalence theory and Meek orientation rules"
date_ingested: 2026-07-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Spurious Association and Confounds]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "v-structure"
  - "immorality"
  - "Meek orientation rules"
  - "compelled edge"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** iff they share the same skeleton (undirected edge set) and
> the same **v-structures** (immoralities: $X \to Z \leftarrow Y$ with $X, Y$ not adjacent).
> The **CPDAG** (completed PDAG / essential graph) is the unique graphical representation of an
> equivalence class: directed edges in the CPDAG are shared by every DAG in the class, undirected
> edges can go either way. Understanding CPDAGs is prerequisite to both [[PC Algorithm]] and
> [[GES - Greedy Equivalence Search]], which return CPDAGs, not individual DAGs.

## Overview

When learning causal DAGs from observational data, we can at best identify the **Markov equivalence
class** of the true DAG — the set of all DAGs that encode exactly the same conditional
independencies. A single CPDAG represents this entire class compactly. This note covers:
the characterisation of Markov equivalence (Verma & Pearl, 1990), the CPDAG construction,
and Meek's orientation rules for completing a PDAG into a CPDAG.

## Main Content

### Markov Condition and Faithfulness

> [!definition] Causal Markov Condition
> A DAG $G$ over variables $\mathbf{V}$ satisfies the **Markov condition** with respect to
> distribution $P$ if every variable $X_i$ is conditionally independent of its
> *non-descendants* given its *parents* in $G$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid Pa_G(X_i)$$

> [!definition] Faithfulness
> Distribution $P$ is **faithful** to DAG $G$ if every conditional independence in $P$ is
> *implied* by the Markov condition applied to $G$ via d-separation. Equivalently, no
> conditional independence in $P$ arises from "accidental" parameter cancellations.
>
> **Why it matters:** Without faithfulness, a variable pair could be marginally independent
> while being connected by two paths that cancel exactly — making the edge invisible to CI tests.
> Faithfulness is not testable but holds for "almost all" parameterizations of any fixed DAG model
> (Meek, 1995; zero measure of exceptions).

### Markov Equivalence

> [!definition] Markov Equivalence
> DAGs $G_1$ and $G_2$ are **Markov equivalent** if they encode identical d-separation statements,
> i.e., the same set of conditional independence relations:
> $$G_1 \sim G_2 \iff \forall\, X, Y, \mathbf{Z}: (X \perp\!\!\!\perp_d Y \mid \mathbf{Z})_{G_1} \iff (X \perp\!\!\!\perp_d Y \mid \mathbf{Z})_{G_2}$$

> [!theorem] Verma-Pearl Characterisation (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (the undirected graph obtained by ignoring edge directions), AND
> 2. The same set of **v-structures** (immoralities).
>
> **Proof sketch:** Same d-separation implies same marginal independencies (same skeleton).
> V-structures are the only DAG configurations where changing arrow direction changes the
> d-separation, so they must also match. Conversely, same skeleton + same v-structures implies
> same d-separation by induction on path length.

### V-Structures (Immoralities)

> [!definition] V-Structure (Immorality, Collider)
> A **v-structure** (also called an *immorality* or *unshielded collider*) is a triple
> $X \to Z \leftarrow Y$ in a DAG where:
> - $X$ and $Y$ are **not adjacent** (no edge between them)
> - $Z$ is the **collider** — it has two incoming arrows
>
> **Collider vs non-collider:** $Z$ in $X \to Z \leftarrow Y$ is a collider on the path
> $X-Z-Y$ (the path is *blocked* by conditioning on $Z$).
> In $X \to Z \to Y$ or $X \leftarrow Z \to Y$ or $X \leftarrow Z \leftarrow Y$, $Z$ is a
> *non-collider* (the path is blocked by conditioning on $Z$ only in the non-collider case).

V-structures are the **identifiable** features of a DAG: they distinguish between otherwise
equivalent graphs. See [[Spurious Association and Confounds]] for the collider (v-structure) bias
story in causal inference: conditioning on a collider opens a blocked path, inducing spurious
association.

### CPDAGs (Essential Graphs)

> [!definition] CPDAG (Completed PDAG / Essential Graph)
> The **CPDAG** of a Markov equivalence class is the unique graph $\mathcal{C}$ such that:
> - $\mathcal{C}$ contains a **directed** edge $X \to Y$ iff $X \to Y$ is present in **every**
>   DAG in the equivalence class ("compelled" edge)
> - $\mathcal{C}$ contains an **undirected** edge $X - Y$ iff both $X \to Y$ and $X \leftarrow Y$
>   appear in different DAGs of the equivalence class ("reversible" edge)
>
> Directed edges in the CPDAG are causally identified from data; undirected edges are causally
> ambiguous without additional assumptions.

**Construction:** Given any DAG $G$, its CPDAG can be computed by:
1. Finding all v-structures (orient them as $X \to Z \leftarrow Y$)
2. Applying Meek's orientation rules repeatedly until no further orientation is possible

### Meek's Orientation Rules (R1–R4)

After orienting v-structures, the remaining undirected edges in a PDAG can be further oriented
without creating new v-structures or directed cycles using four rules:

> [!definition] Meek Orientation Rules (Meek, 1995)
>
> **R1** (Avoid new v-structure):
> If $X \to Y - Z$ and $X$ not adjacent to $Z$, orient $Y \to Z$.
> *Reason:* Otherwise $X \to Y \leftarrow Z$ would be a new unshielded collider.
>
> **R2** (Avoid directed cycle):
> If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$.
> *Reason:* Otherwise, if $Z \to X$, a directed cycle $X \to Y \to Z \to X$ forms.
>
> **R3** (Acyclicity with two paths):
> If $X - Y$ and there exist $W, Z$ with $W - X$, $W \to Z$, $Z \to Y$, $W$ not adjacent to $Y$,
> and $X$ not adjacent to $Z$: orient $X \to Y$.
>
> **R4** (Acyclicity with longer chain):
> If $X - Z$, $X - W$, $W \to Z$, $Z \to Y$, $X$ not adjacent to $Y$: orient $X \to Z$.
>
> **Completeness (Meek, 1995):** Rules R1–R4 are *complete* — applying them exhaustively
> to a PDAG with all v-structures correctly oriented produces the unique CPDAG.

## Examples

> [!example] Example: 3-variable equivalence class
> Consider DAGs on variables $\{X, Y, Z\}$ with edges $\{X-Y, Y-Z\}$ (a chain):
>
> - $X \to Y \to Z$ (mediation chain)
> - $X \leftarrow Y \to Z$ (common cause / fork)
> - $X \leftarrow Y \leftarrow Z$ (reverse chain)
>
> All three have the same skeleton ($X-Y$, $Y-Z$) and **no v-structures** (since $X$ and $Z$
> are not adjacent in the skeleton). They are all Markov equivalent.
>
> **CPDAG:** $X - Y - Z$ (all edges undirected — no edge can be oriented from data alone).
>
> Now add a v-structure: $X \to Y \leftarrow Z$ (with $X, Z$ non-adjacent). This is NOT
> equivalent to the three chain DAGs above — it has a different v-structure at $Y$. Its
> CPDAG is $X \to Y \leftarrow Z$ (the directed edges are "compelled").

> [!example] Example: Applying R1
> Suppose after orienting v-structures we have the PDAG: $A \to B - C$, and $A$ is not adjacent
> to $C$. Rule R1 applies: orient $B \to C$.
>
> *Reason:* If we left $B - C$ undirected and it were oriented $B \leftarrow C$, then
> $A \to B \leftarrow C$ would be a new v-structure not present in the original v-structure
> set — contradicting the Verma-Pearl theorem.

## Connections

- **PC Algorithm** [[PC Algorithm]]: identifies the skeleton via CI tests, orients v-structures via
  the separating set, then applies Meek rules. The CPDAG it returns represents this note's object.
- **GES** [[GES - Greedy Equivalence Search]]: searches CPDAG space directly; the Insert/Delete
  operators are valid CPDAG transformations. Understanding CPDAGs is essential to understanding
  why GES is correct.
- **Directed Acyclic Graphs** [[Directed Acyclic Graphs]]: d-separation, Markov condition, causal
  interpretation — the foundation for all equivalence reasoning.
- **Spurious Association and Confounds** [[Spurious Association and Confounds]]: v-structures as
  colliders; conditioning on a collider opens a path (the causal inference flip-side of why
  v-structures are identifiable).
- **NOTEARS** [[NOTEARS - Overview]]: outputs a DAG, not a CPDAG — one limitation of the
  continuous-optimization approach is that it does not respect Markov equivalence.

## See Also
- [[PC Algorithm]] — uses CPDAGs as output; Meek rules in Step 3
- [[GES - Greedy Equivalence Search]] — searches CPDAG space directly
- [[Causal Structure Learning - Overview]] — the broader paradigm map
- [[Directed Acyclic Graphs]] — d-separation and Markov condition
- [[Spurious Association and Confounds]] — colliders in causal reasoning
- [[Causal Discovery/_Index|Causal Discovery Index]]
