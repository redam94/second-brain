---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "Survey §1, pp. 1-3; Verma & Pearl (1990) UAI; Meek (1995) UAI"
date_ingested: 2026-07-27
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Meek's rules"
  - "v-structure"
  - "immorality"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs encode exactly the same conditional independence (CI) structure iff they share the
> same **skeleton** and **v-structures** (Verma & Pearl 1990). Their **Markov equivalence class (MEC)**
> is uniquely represented by a **CPDAG** — a mixed graph where directed edges are those shared by all
> DAGs in the class. **Meek's four orientation rules** complete the CPDAG from skeleton and v-structures
> alone. This is the foundation for all constraint-based and score-based causal discovery: both PC and GES
> output CPDAGs rather than individual DAGs, since observational data can never distinguish members of the same MEC.

## Overview

Structure learning from observational data faces a fundamental limit: multiple DAGs can encode exactly
the same CI relationships over the observed variables. Given only marginal and conditional distributions,
one cannot determine which member of the equivalence class is the "true" graph. The **Markov equivalence
class (MEC)** formalizes this limit; the **CPDAG** provides a unique, compact representation of the entire
class. Any consistent structure-learning algorithm — constraint-based (PC) or score-based (GES) — can
recover at most the CPDAG, not the true DAG, from purely observational data.

This note covers: (1) the graphical characterization of equivalence, (2) the CPDAG definition and
construction, and (3) Meek's orientation rules. All downstream notes ([[PC Algorithm]], [[GES Algorithm]])
take the CPDAG as their output object.

## Main Content

### Conditional Independence and d-Separation

A DAG $G = (\mathbf{V}, \mathbf{E})$ implies a set of **Markov assumptions**: each variable $X_i$ is
conditionally independent of all non-descendants given its parents $\text{pa}_G(X_i)$.

> [!definition] Definition: d-Separation (Pearl 1988)
> Variables $X$ and $Y$ are **d-separated** by a set $\mathbf{Z}$ in $G$ (written $X \perp\!\!\!\perp_G Y \mid \mathbf{Z}$) if every path between $X$ and $Y$ in the underlying undirected graph is **blocked** by $\mathbf{Z}$. A path is blocked by $\mathbf{Z}$ if:
> - It contains a **fork** $X \leftarrow M \rightarrow Y$ or a **chain** $X \rightarrow M \rightarrow Y$ with $M \in \mathbf{Z}$, OR
> - It contains a **collider** (v-structure) $X \rightarrow M \leftarrow Y$ with $M \notin \mathbf{Z}$ and no descendant of $M$ is in $\mathbf{Z}$.
^def-dsep

The full set of CI relationships entailed by $G$ equals the set of all d-separations in $G$.

### The Markov Equivalence Relation

> [!definition] Definition: Markov Equivalence
> Two DAGs $G_1$ and $G_2$ on the same variable set $\mathbf{V}$ are **Markov equivalent**, written $G_1 \sim G_2$, if they entail exactly the same set of conditional independence relationships:
> $$G_1 \sim G_2 \quad \iff \quad \{(X, Y, \mathbf{Z}) : X \perp\!\!\!\perp_{G_1} Y \mid \mathbf{Z}\} = \{(X, Y, \mathbf{Z}) : X \perp\!\!\!\perp_{G_2} Y \mid \mathbf{Z}\}.$$
^def-markov-equiv

> [!definition] Definition: Skeleton and V-Structures
> The **skeleton** of a DAG $G$ is the undirected graph $\text{skel}(G)$ obtained by ignoring all edge directions. A **v-structure** (or **immorality**) in $G$ is a triple of nodes $(X, Z, Y)$ such that $X \to Z \leftarrow Y$ in $G$ and $X$ and $Y$ are **not** adjacent (non-adjacent parents of a common child).
^def-skeleton-vstructure

> [!theorem] Theorem: Graphical Characterization of Equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if they have the same skeleton and the same set of v-structures.
> $$G_1 \sim G_2 \quad \iff \quad \text{skel}(G_1) = \text{skel}(G_2) \text{ and } \text{V-str}(G_1) = \text{V-str}(G_2).$$
> **Significance:** Equivalence is entirely determined by two purely graphical features. One does not need to enumerate all implied CIs — checking skeleton and v-structures suffices.
^thm-verma-pearl

**Why the collider condition matters.** A fork $X \leftarrow M \rightarrow Y$ and a chain $X \rightarrow M \rightarrow Y$ both have the same skeleton and both block paths through $M$ given $M$ — they are equivalent. But a collider $X \rightarrow M \leftarrow Y$ (v-structure) opens when conditioned on $M$ ("explaining away"), which is a fundamentally different CI pattern. This is why v-structures are the decisive distinguishing feature.

### Completed Partially Directed Acyclic Graph (CPDAG)

> [!definition] Definition: CPDAG
> The **CPDAG** (Completed Partially Directed Acyclic Graph) of a DAG $G$, written $\text{CPDAG}(G)$, is the unique graph on $\mathbf{V}$ with both directed ($\to$) and undirected ($-$) edges satisfying:
> - $X \to Y$ in $\text{CPDAG}(G)$ iff every DAG in the MEC $[G]$ contains the directed edge $X \to Y$.
> - $X - Y$ in $\text{CPDAG}(G)$ iff some DAGs in $[G]$ have $X \to Y$ and others have $X \leftarrow Y$.
> The CPDAG is the **canonical representative** of $[G]$: any two Markov equivalent DAGs have the same CPDAG.
^def-cpdag

**Existence and uniqueness.** The CPDAG exists and is unique for any DAG $G$ (proven in Andersson, Madigan & Perlman 1997). The MEC can be very large: for $d$ nodes, the largest MEC contains all $d!$ topological orderings of the complete DAG.

### Constructing the CPDAG: Meek's Rules

Given the skeleton and v-structures of a DAG, the CPDAG is obtained by applying **Meek's four rules** (Meek 1995) until no more edges can be oriented.

> [!theorem] Meek's Orientation Rules (Meek 1995)
> Let $C$ be a partially directed graph (some edges directed, some undirected) whose skeleton and v-structures match the true DAG. Apply the following rules until fixpoint to obtain the CPDAG:
>
> **R1 (Acyclicity via new v-structure prevention):** If $X \to Y - Z$ and $X \not\sim Z$, orient $Y \to Z$.
> *Reason:* orienting $Z \to Y$ would create a new v-structure $X \to Y \leftarrow Z$.
>
> **R2 (Acyclicity):** If $X \to Y \to Z$ and $X - Z$, orient $X \to Z$.
> *Reason:* orienting $Z \to X$ would create a directed cycle $X \to Y \to Z \to X$.
>
> **R3 (V-structure avoidance with multiple parents):** If $X - Z$, $W_1 \to Z$, $W_2 \to Z$, $X - W_1$, $X - W_2$, and $W_1 \not\sim W_2$, orient $X \to Z$.
> *Reason:* orienting $Z \to X$ with $W_1 \to Z$ and $W_2 \to Z$ creates new v-structures.
>
> **R4 (Discriminating paths):** If $X - Y - Z$, $W \to Y$, $W - X$, $W \not\sim Z$, orient $Y \to Z$.
> *Reason:* prevents creating v-structures along the path from $W$ through $Y$ to $Z$.
^thm-meek-rules

**Using the rules.** Start with skeleton + v-structures from a CI test (PC) or score search (GES). Apply R1–R4 exhaustively. The result is the CPDAG: every remaining undirected edge $X - Y$ is genuinely undirected — it cannot be oriented without violating acyclicity or introducing a spurious v-structure in some member of the MEC.

### Covered Edges

> [!definition] Definition: Covered Edge
> An edge $X \to Y$ in a DAG $G$ is **covered** if $\text{pa}_G(X) = \text{pa}_G(Y) \setminus \{X\}$ — the parents of $X$ are exactly the parents of $Y$ except $X$ itself.
^def-covered-edge

**Theorem (Chickering 1995).** Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if $G_2$ can be obtained from $G_1$ by a sequence of **covered edge reversals**. This characterization underlies the GES backward phase: each deletion in GES-II corresponds to reversing (then removing) a covered edge.

## Examples

> [!example] Example: Three-Node DAGs
> Consider three nodes $\{X, Y, Z\}$ with a single edge structure. The DAGs $X \to Y \to Z$, $X \leftarrow Y \to Z$, and $X \leftarrow Y \leftarrow Z$ all have skeleton $X - Y - Z$ and no v-structures — they are Markov equivalent. Their CPDAG is $X - Y - Z$ (all edges undirected, since no direction is invariant across the class).
>
> The DAG $X \to Y \leftarrow Z$ (with $X \not\sim Z$) has a v-structure at $Y$. Its MEC contains only itself — the CPDAG is $X \to Y \leftarrow Z$ (both edges directed). No observational data can distinguish the first three DAGs, but can detect the v-structure.
^ex-three-nodes

## Connections

- **Identifiability from observational data:** The CPDAG is the maximum that can be recovered from
  i.i.d. observational data alone. Distinguishing members of the same MEC requires either
  interventional/experimental data ([[The Experimental Ideal]]) or additional assumptions
  (equal error variances, non-Gaussian noise for LiNGAM).
- **d-separation and causal reasoning:** [[Directed Acyclic Graphs]] covers the do-calculus and
  back-door criterion — both use d-separation from a fixed DAG, not a CPDAG. When the CPDAG is
  the output, the causal estimand must be identified for all DAGs in the MEC.
- **PC and GES outputs:** Both algorithms output the CPDAG; see [[PC Algorithm]] and [[GES Algorithm]].
- **NOTEARS outputs a single DAG** (the minimizer of the LS score), not a CPDAG. This is a key
  difference: NOTEARS fixes a parameterization (linear SEM, $\ell_1$ regularization) that breaks
  the symmetry within the MEC. See [[DAG Structure Learning Problem]].
- **Faithfulness:** The identification of the true CPDAG from CI tests rests on the **faithfulness assumption**: every CI in the distribution is entailed by $G^*$. See [[PC Algorithm]] §2.3.

## See Also
- [[DAG Structure Learning Problem]] — the optimization setting PC/GES are solving
- [[PC Algorithm]] — uses CPDAG as output; faithfulness assumption here enables recovery
- [[GES Algorithm]] — searches directly in CPDAG space using a score
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, and causal reasoning
- [[Spurious Association and Confounds]] — fork/chain/collider patterns from a DAG perspective
- [[NOTEARS - Overview]] — contrast: continuous optimization, outputs a single weighted DAG
