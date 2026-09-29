---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/colombo-maathuis-2014-PC-SOURCE.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 2–3; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-09-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Causal Discovery Algorithms - Comparison]]"
aliases:
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "Markov equivalence class"
  - "essential graph"
  - "Verma-Pearl theorem"
  - "Meek rules"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** when they encode exactly the same set of conditional
> independence relations. Verma & Pearl (1990) characterise equivalence by a simple
> graph-theoretic criterion: same **skeleton** plus same **v-structures**. The equivalence
> class is represented by a **Complete Partially Directed Acyclic Graph (CPDAG)** — a mixed
> graph in which edges that can point either way are left undirected. CPDAGs are the output
> of all identifiable causal discovery algorithms: without interventional data, the
> direction of non-v-structure edges is unidentifiable from observational data alone.

## Overview

When we learn a causal DAG from data, we typically cannot recover the **exact** DAG —
multiple DAGs can imply the same set of conditional independence relations (Markov
properties). The **Markov equivalence class** captures the limits of what observational
data can tell us about the causal graph. Understanding this class is essential for
interpreting the output of constraint-based algorithms like [[PC Algorithm]] and score-based
algorithms like [[Greedy Equivalence Search (GES)]].

## Main Content

### Markov conditions

> [!definition] Definition: Causal Markov Condition
> A DAG $\mathcal{G}$ satisfies the **Causal Markov Condition** w.r.t. a distribution
> $\mathbb{P}$ if every variable $X_i$ is conditionally independent of its non-descendants
> given its parents:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i).$$
> The Markov condition connects the graphical separation criterion (d-separation) to
> probabilistic conditional independence.
^def-markov-condition

> [!definition] Definition: Faithfulness
> A distribution $\mathbb{P}$ is **faithful** to a DAG $\mathcal{G}$ if every conditional
> independence in $\mathbb{P}$ is entailed by d-separation in $\mathcal{G}$. That is,
> $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ in $\mathbb{P}$ **if and only if** $X_i$ and $X_j$
> are d-separated by $\mathbf{Z}$ in $\mathcal{G}$.
>
> Faithfulness fails when path-specific effects cancel exactly (e.g., equal and opposite
> direct and indirect effects). It is assumed by virtually all constraint-based and
> score-based discovery algorithms.
^def-faithfulness

### Markov equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** if they have the same
> set of d-separation relations — equivalently, the same set of conditional independencies
> under faithfulness. We write $\mathcal{G}_1 \sim \mathcal{G}_2$.
^def-markov-equiv

> [!theorem] Theorem: Verma–Pearl Characterisation of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (same set of adjacencies, ignoring edge direction), **and**
> 2. The same **v-structures** (same set of unshielded colliders $X_i \to X_k \leftarrow X_j$
>    where $X_i$ and $X_j$ are non-adjacent).
>
> **Consequence**: the direction of edges that are not part of any v-structure cannot be
> determined from observational data alone under faithfulness.
^thm-verma-pearl

### The CPDAG

> [!definition] Definition: Complete Partially Directed Acyclic Graph (CPDAG)
> The **CPDAG** (also called **essential graph**) of an equivalence class $[\mathcal{G}]$ is
> the unique **mixed graph** with:
> - A **directed edge** $X_i \to X_j$ if **every** DAG in $[\mathcal{G}]$ has $X_i \to X_j$
>   (the direction is compelled by the data).
> - An **undirected edge** $X_i - X_j$ if **some** DAG has $X_i \to X_j$ and another has
>   $X_j \to X_i$ (the direction is free).
>
> Every Markov equivalence class has a unique CPDAG, and every CPDAG corresponds to exactly
> one equivalence class. Discovery algorithms that output CPDAGs give the most information
> about causal structure that observational data can provide.
^def-cpdag

### Meek orientation rules

After identifying the skeleton and all v-structures, the remaining undirected edges are
oriented by Meek's (1995) four **orientation rules**, applied exhaustively until no further
orientation is possible.

> [!theorem] Theorem: Meek Orientation Rules (Meek 1995)
> The following rules are **complete**: applying them exhaustively to a PDAG produces the CPDAG.
>
> **R1 — Away from collider:** If $\alpha \to \beta - \gamma$ and $\alpha$ and $\gamma$ are
> non-adjacent, orient as $\beta \to \gamma$ (otherwise a new v-structure would be created).
>
> **R2 — Away from cycle:** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$, orient
> as $\alpha \to \gamma$ (otherwise an undirected cycle would be created).
>
> **R3 — Double triangle:** If $\alpha - \gamma$, $\alpha - \beta_1 \to \gamma$, and
> $\alpha - \beta_2 \to \gamma$ with $\beta_1$ and $\beta_2$ non-adjacent, orient $\alpha \to \gamma$.
>
> **R4 — Disambiguation:** If $\alpha - \beta \to \gamma$ and $\beta - \delta \to \gamma$
> with $\alpha$ adjacent to $\delta$ and $\alpha - \gamma$, orient $\alpha \to \beta$.
>
> Meek (1995) proved these four rules are **sound** (each orientation is valid for all DAGs
> in the class) and **complete** (they orient all compelled edges).
^thm-meek-rules

## Examples

> [!example] Example: A Simple Three-Variable Equivalence Class
> Consider three variables $X$, $Y$, $Z$ with all three pairs adjacent (a complete graph on 3 nodes).
>
> **Case 1 — No v-structure:** $X \to Y \to Z$ and $X \to Z \to Y$ and $X \leftarrow Y \to Z$
> and $X \leftarrow Z \to Y$ (chains and forks — all Markov equivalent). The CPDAG has all
> edges undirected: $X - Y - Z$ (with the $X-Z$ edge also present).
>
> **Case 2 — v-structure:** $X \to Z \leftarrow Y$ with $X, Y$ non-adjacent. This DAG is
> **its own equivalence class** — the v-structure $X \to Z \leftarrow Y$ is compelled.
> The CPDAG has $X \to Z \leftarrow Y$ (both edges directed, no free edges).

## Connections

- **PC Algorithm**: outputs the CPDAG by finding the skeleton, marking v-structures, and
  applying Meek rules. See [[PC Algorithm]].
- **GES**: searches directly over equivalence classes (CPDAGs). See [[Greedy Equivalence
  Search (GES)]].
- **Identifiability**: in special cases (linear non-Gaussian, additive noise models) the full
  DAG can be identified from observational data even within an equivalence class — this goes
  beyond the CPDAG representation.
- **NOTEARS**: outputs a specific DAG (not a CPDAG) because it optimizes a continuous score over
  $\mathbb{R}^{d\times d}$ — see [[NOTEARS - Overview]] for why.

## See Also
- [[PC Algorithm]] — algorithm for learning CPDAGs via constraint-based testing
- [[Greedy Equivalence Search (GES)]] — score-based algorithm operating in CPDAG space
- [[DAG Structure Learning Problem]] — the score-based formulation from NOTEARS
- [[Directed Acyclic Graphs]] — d-separation, backdoor adjustment, causal DAG semantics
- [[BN Construction Methods Comparison]] — practitioner comparison of DAG elicitation methods
