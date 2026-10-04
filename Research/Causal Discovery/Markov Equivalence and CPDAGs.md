---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch-buhlmann-2007-pc-algorithm.md]]"
source_location: "§2 Background, pp. 614–616"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Constraint-Based Causal Discovery]]"
aliases:
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalence class"
  - "MEC"
  - "observational equivalence"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independences —
> they are indistinguishable from observational data alone. The set of all Markov-equivalent DAGs
> forms a **Markov Equivalence Class (MEC)**, which is uniquely represented by a **Completed
> Partially Directed Acyclic Graph (CPDAG)**. This is the maximum output causal structure learning
> algorithms can identify from purely observational data without further assumptions. Both
> [[PC Algorithm]] and [[GES Algorithm]] target the CPDAG of the true data-generating DAG.

## Overview

The fundamental identifiability limit in causal discovery from observational data is
*Markov equivalence*. Suppose the true data-generating mechanism is a DAG $G^*$. From
observational data alone, we can at best identify the **Markov equivalence class** of $G^*$
— the set of DAGs that share all the same conditional independence (CI) relations.
No statistical test, however powerful, can distinguish among DAGs within the same MEC using
only observational data (additional assumptions such as non-Gaussianity or interventional data
are needed to break the tie).

## Main Content

### d-separation and conditional independence

> [!definition] Definition: d-separation (Pearl, 1988)
> A set of nodes $Z$ **d-separates** $X$ from $Y$ in a DAG $G$ if every path between $X$ and $Y$
> is *blocked* by $Z$. A path is blocked if it contains either:
> 1. A **chain** $X \to Z_i \to Y$ or **fork** $X \leftarrow Z_i \to Y$ where $Z_i \in Z$, or
> 2. A **collider** $X \to Z_i \leftarrow Y$ where $Z_i \notin Z$ and no descendant of $Z_i$ is in $Z$.
>
> Notation: $X \perp_G Y \mid Z$ if $Z$ d-separates $X$ from $Y$ in $G$.
^def-dsep

The **global Markov property** asserts that d-separation in $G$ implies conditional independence
in the distribution: $X \perp_G Y \mid Z \Rightarrow X \perp_{\mathbb{P}} Y \mid Z$.

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if they induce exactly the same set of
> d-separation statements:
> $$G_1 \equiv G_2 \iff \{(X, Y, Z) : X \perp_{G_1} Y \mid Z\} = \{(X, Y, Z) : X \perp_{G_2} Y \mid Z\}.$$
^def-markov-equiv

> [!theorem] Theorem: Skeleton + V-structures Characterization (Verma & Pearl, 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (same undirected edges, ignoring arrow directions), and
> 2. The same **v-structures** (unshielded colliders): $X \to Z \leftarrow Y$ with $X$ and $Y$
>    not adjacent appears as a v-structure in both $G_1$ and $G_2$, or in neither.
>
> A **v-structure** (unshielded collider) is a triple $X \to Z \leftarrow Y$ where
> $X \not\sim Y$ (non-adjacent). **Shielded** colliders $X \to Z \leftarrow Y$ with $X \sim Y$
> are *not* v-structures and may differ across Markov-equivalent DAGs.
^thm-markov-equiv-char

This result is crucial: it means that to identify an equivalence class, one only needs to
identify the skeleton (which pairs of variables are dependent) and the v-structures (which
unshielded colliders are present). This is precisely what [[PC Algorithm]] does.

### The CPDAG

The **Completed Partially Directed Acyclic Graph (CPDAG)**, also called the *essential graph*
or *pattern*, is the unique representative of a Markov equivalence class.

> [!definition] Definition: CPDAG (Andersson, Madigan & Perlman, 1997; Meek, 1995)
> The **CPDAG** $\mathcal{C}(G)$ for the MEC of DAG $G$ is the unique graph where:
> - An edge $X - Y$ (undirected) appears if $X \to Y$ in **some** member of the MEC and
>   $Y \to X$ in another member.
> - An edge $X \to Y$ (directed) appears if $X \to Y$ in **every** member of the MEC.
>
> Equivalently: directed edges in the CPDAG are those **compelled** by the skeleton and
> v-structures; undirected edges are **reversible** without changing the MEC.
^def-cpdag

> [!note] Why CPDAGs matter for causal discovery
> A causal discovery algorithm returns a CPDAG, not a unique DAG. This means:
> - **Directed edges** in the CPDAG can be given a causal interpretation (the direction is
>   identifiable from observational data).
> - **Undirected edges** cannot be causally oriented from observational data alone — the
>   direction is not identified. Additional assumptions (non-Gaussian noise → LiNGAM; equal
>   variances; hard interventions) can resolve them.

### From CPDAG to DAG: Meek's extension theorem

> [!theorem] Meek's Completeness (Meek, 1995)
> Any DAG in the MEC of a CPDAG $\mathcal{C}$ can be obtained by orienting the undirected
> edges of $\mathcal{C}$ consistently (without creating new v-structures or cycles). Furthermore,
> the CPDAG can be uniquely constructed from any member DAG via Meek's four orientation rules
> applied to the skeleton and v-structures.
^thm-meek-completeness

Meek's four rules (R1–R4) are the propagation rules used in [[PC Algorithm]] Phase 3 to
extend v-structure orientations to the rest of the graph:

| Rule | Condition | Action |
|------|-----------|--------|
| **R1** | $Z \to X - Y$ and $Z \not\sim Y$ | Orient $X \to Y$ (avoid new v-structure) |
| **R2** | $X \to Z \to Y$ and $X - Y$ | Orient $X \to Y$ (avoid cycle) |
| **R3** | $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1 \not\sim Z_2$, $X - Y$ | Orient $X \to Y$ |
| **R4** | $X - Z \to W \to Y$, $X - Y$, $Z \not\sim Y$, $X \not\sim W$ | Orient $X \to Y$ |

## Examples

> [!example] Example: Three-Node MECs
>
> **MEC 1 (chain):** $X \to Y \to Z$ is Markov equivalent to $X \leftarrow Y \leftarrow Z$
> and $X \leftarrow Y \to Z$. All three DAGs have skeleton $X - Y - Z$ with no v-structure.
> CPDAG: $X - Y - Z$ (all undirected — direction of chain is not identified).
>
> **MEC 2 (v-structure):** $X \to Z \leftarrow Y$ with $X \not\sim Y$. This is the *only*
> DAG in its MEC — no other orientation of $X - Z - Y$ (non-adjacent $X,Y$) gives the same
> CI structure. CPDAG: $X \to Z \leftarrow Y$ (both edges directed — both are compelled).
>
> **Key contrast:** The v-structure is the *only* pattern identifiable from observational data.
> This is why v-structure detection (Phase 2 of PC) is the key orientable step.
^ex-three-node-mecs

## Connections

- **NOTEARS targets DAGs, not CPDAGs**: [[NOTEARS - Overview]] returns a single (weighted)
  DAG $W$, not a CPDAG, because the linear SEM has identifiable edge directions under the
  LS score (even within an MEC, different orientations have different LS scores). This is
  a difference in both the problem setup and the solution guarantees.
- **Faithfulness is needed for identification**: [[Constraint-Based Causal Discovery]]
  explains why the faithfulness assumption is required — without it, there may be CI relations
  not implied by any d-separation in the true DAG, making identification impossible.
- **Intervention data breaks equivalence**: Under hard interventions on a variable $X$,
  edges incident to $X$ may become oriented even in an undirected edge of the CPDAG.

## See Also
- [[DAG Structure Learning Problem]] — score-based framing of the problem NOTEARS solves
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion, do-calculus
- [[Constraint-Based Causal Discovery]] — the PC algorithm's framework
- [[PC Algorithm]] — uses skeleton + v-structures to recover the CPDAG
- [[GES Algorithm]] — score-based search over CPDAGs
