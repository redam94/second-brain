---
title: "Markov Equivalence and CPDAG"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-structure-learning-sources.md]]"
source_location: "Verma & Pearl (1990); Chickering (1995); Meek (1995)"
date_ingested: 2026-11-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "v-structure"
  - "immorality"
---

# Markov Equivalence and CPDAG

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independence
> relations. By the Verma–Pearl theorem, Markov equivalence is fully characterised by two
> graphical criteria: identical **skeletons** (undirected edges) and identical **v-structures**
> (unshielded colliders). An equivalence class of DAGs is uniquely represented by a
> **CPDAG** (Completed Partially Directed Acyclic Graph) — a mixed graph with some directed and
> some undirected edges — which is the output of both the [[PC Algorithm]] and the
> [[GES Algorithm]].

## Overview

Observational data cannot in general identify a unique DAG: many different DAGs can produce
the same joint distribution (and therefore the same conditional independence structure). The
fundamental result is that the class of DAGs producing the *same* conditional independence
structure has a clean characterisation and can be represented compactly. This is the concept
of Markov equivalence.

Understanding Markov equivalence is prerequisite to interpreting the output of any
observational causal structure-learning algorithm. It explains both why these algorithms
return a *class* of graphs rather than a unique DAG, and which edges are *definitely* directed
in the data vs. those that remain ambiguous.

## Main Content

### The Markov Condition and Faithfulness

> [!definition] Definition: Causal Markov Condition
> A DAG $\mathcal{G}$ over variables $\mathbf{V}$ satisfies the **Causal Markov Condition**
> with respect to a distribution $P$ if every variable $X \in \mathbf{V}$ is conditionally
> independent of its non-descendants given its parents:
> $$X \perp\!\!\!\perp \mathrm{NonDesc}(X) \mid \mathrm{Pa}(X).$$
> Equivalently: $P$ factorises as $P(\mathbf{V}) = \prod_{X \in \mathbf{V}} P(X \mid \mathrm{Pa}(X))$.
^def-markov-condition

> [!definition] Definition: Faithfulness (Causal Faithfulness Condition)
> A distribution $P$ is **faithful** to a DAG $\mathcal{G}$ if every conditional independence
> that holds in $P$ is entailed by d-separation in $\mathcal{G}$. Formally:
> $$X \perp\!\!\!\perp Y \mid \mathbf{Z} \text{ in } P \implies X \perp\!\!\!\perp Y \mid \mathbf{Z} \text{ in } \mathcal{G}.$$
> Unfaithfulness occurs when path coefficients cancel exactly — a measure-zero event under
> continuous distributions, so faithfulness holds generically.
^def-faithfulness

Markov condition + faithfulness together mean that the conditional independence structure of
$P$ *exactly* identifies the DAG's d-separation structure — no more, no less. This is the
assumption that makes constraint-based structure learning possible.

### V-Structures (Immoralities)

> [!definition] Definition: V-Structure (Immorality)
> A **v-structure** (also called an **immorality** or **unshielded collider**) in a DAG
> $\mathcal{G}$ is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z$ and $Y \to Z$ (both point into $Z$),
> 2. $X$ and $Y$ are **not** adjacent in $\mathcal{G}$ (unshielded).
>
> The node $Z$ is called a **collider** on the path $X - Z - Y$.
^def-v-structure

V-structures are the key to identification: unlike forks ($X \leftarrow Z \rightarrow Y$)
and chains ($X \rightarrow Z \rightarrow Y$), the v-structure $X \rightarrow Z \leftarrow Y$
produces a distinctive conditional independence pattern — $X$ and $Y$ are marginally
*independent* but become *dependent* when conditioning on $Z$ or its descendants.
This distinguishing property means v-structures can be identified from data alone.

### The Verma–Pearl Characterisation Theorem

> [!theorem] Theorem: Markov Equivalence Criterion (Verma & Pearl, 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same variables are **Markov
> equivalent** (encode the same set of conditional independences) **if and only if** they
> have:
> 1. The same **skeleton** (the same set of adjacencies, ignoring edge directions), and
> 2. The same set of **v-structures** (unshielded colliders).
^thm-verma-pearl

This theorem reduces the infinite-dimensional question "do two DAGs represent the same
distribution?" to a purely graphical check on two finite combinatorial objects.

### CPDAG Definition and Construction

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (or **essential graph**) of a Markov equivalence class $[\mathcal{G}]$ is
> the unique mixed graph over the same variables in which:
> - An edge $X \to Y$ is **directed** iff it is directed in *every* DAG in $[\mathcal{G}]$
>   (the direction is forced by v-structure membership or Meek propagation rules),
> - An edge $X - Y$ is **undirected** iff both $X \to Y$ and $X \leftarrow Y$ appear in
>   different DAGs in $[\mathcal{G}]$ (the direction is not identifiable from $P$ alone).
^def-cpdag

The CPDAG is a lossless representation of the equivalence class — it contains exactly the
same information as the class as a whole. Any algorithm that correctly identifies the
equivalence class returns the CPDAG.

### Meek Orientation Rules

After placing v-structures, additional edge directions can be forced by the following four
rules (Meek, 1995), applied exhaustively until no new orientations can be derived:

> [!definition] Meek Orientation Rules (R1–R4)
> Let $U_{\mathcal{G}}$ denote an undirected edge in the partially directed graph. Apply
> each rule whenever it fires, until convergence:
>
> **R1** (avoid new v-structure): If $A \to B - C$ and $A$ is not adjacent to $C$,
> orient $B \to C$.
>
> **R2** (acyclicity): If $A \to C \leftarrow B$, $A - B$, and $A \to C$ creates a cycle
> in the undirected component, orient $A \to B$.
>
> **R3** (v-structure prevention): If $A - C$, $B - C$ with $A - B$ non-adjacent, and
> $A \to D \leftarrow B$ for some $D$ adjacent to $C$, orient $C \to D$.
>
> **R4**: If $A - B$, $A \to C \to B$ with $C$ non-adjacent to $B$, orient $A \to B$.
^def-meek-rules

### Chickering's Covered-Edge Characterisation

> [!definition] Definition: Covered Edge
> An edge $X \to Y$ in a DAG is **covered** if $\mathrm{Pa}(Y) = \mathrm{Pa}(X) \cup \{X\}$.
^def-covered-edge

> [!theorem] Theorem: Transformational Characterisation (Chickering, 1995)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are Markov equivalent if and only if
> $\mathcal{G}_1$ can be transformed into $\mathcal{G}_2$ by a sequence of **covered
> edge reversals** — reversing a single covered edge $X \to Y$ to $X \leftarrow Y$.
^thm-chickering-covered

This theorem is the mathematical cornerstone of the [[GES Algorithm]]: it means the space of
CPDAGs can be navigated by local moves (covered edge reversals), enabling a greedy search.

## Examples

> [!example] Example: Three-Variable Equivalence Class
> Consider three variables $\{X, Y, Z\}$ with $X \perp\!\!\!\perp Y \mid Z$ (a chain or fork)
> and $Z \not\perp\!\!\!\perp Y$, $X \not\perp\!\!\!\perp Z$.
>
> Three DAGs share the same skeleton ($X - Z - Y$) with no v-structure at $Z$:
> - $X \to Z \to Y$ (chain)
> - $X \leftarrow Z \leftarrow Y$ (chain reversed)
> - $X \leftarrow Z \rightarrow Y$ (fork)
>
> All three encode $X \perp\!\!\!\perp Y \mid Z$ and $X \not\perp\!\!\!\perp Y$. They are
> Markov equivalent. Their CPDAG is $X - Z - Y$ (all edges undirected).
>
> The DAG $X \to Z \leftarrow Y$ (v-structure) encodes $X \perp\!\!\!\perp Y$ but
> $X \not\perp\!\!\!\perp Y \mid Z$ — a *different* independence pattern — so it is NOT
> in the same equivalence class. Its CPDAG is $X \to Z \leftarrow Y$ (fully directed).

## Connections

- **[[PC Algorithm]]**: outputs the CPDAG of the true equivalence class (under faithfulness,
  Markov condition, and causal sufficiency, in the large-sample limit).
- **[[GES Algorithm]]**: searches directly in the space of CPDAGs via score-based greedy moves.
- **[[DAG Structure Learning Problem]]**: the landscape table there lists constraint-based
  (PC) and score-based (GES) methods; Markov equivalence explains why both output CPDAGs.
- **[[Directed Acyclic Graphs]]**: d-separation and the back-door criterion operate on DAGs;
  the CPDAG tells us which edges have identified orientations.
- **Interventional identifiability**: with interventional data (do-calculus), it is sometimes
  possible to identify the full DAG beyond the CPDAG — an extension the present notes do not cover.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[GES Algorithm]] — score-based algorithm that outputs a CPDAG
- [[DAG Structure Learning Problem]] — the broader structural learning context
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, and causal reasoning
- [[NOTEARS - Overview]] — continuous-optimization approach (outputs a DAG, not a CPDAG)
