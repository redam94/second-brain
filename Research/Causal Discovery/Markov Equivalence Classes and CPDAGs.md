---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SpirtesGlymourScheines2000-PC-reference.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 3–5; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-10-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Causal Discovery Methods Overview]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> From observational i.i.d. data alone, one generally cannot identify a unique DAG — only the
> **Markov equivalence class** it belongs to, which is the set of all DAGs encoding the same
> conditional independence (CI) relations. This class has a unique graphical representative:
> the **CPDAG** (Completed Partially DAG, also called the *essential graph*), whose undirected
> edges indicate unidentifiable orientations and whose directed edges are shared by all members
> of the class. Both [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]] return a CPDAG
> as their output, not a unique DAG.

## Overview

Suppose the true data-generating process is a DAG $\mathcal{G}^*$. A second DAG $\mathcal{G}'$
is **observationally equivalent** to $\mathcal{G}^*$ if every distribution that is Markov to
$\mathcal{G}^*$ is also Markov to $\mathcal{G}'$ — i.e., they imply the same CI structure.
This means: no matter how much i.i.d. data we collect, the two graphs are statistically
indistinguishable without intervention or additional structural assumptions (e.g., non-Gaussianity
of noise, exploited by LiNGAM and NOTEARS variants).

The Markov equivalence class is therefore the fundamental **identification limit** of
observational causal discovery.

## Main Content

### The Causal Markov Condition and Faithfulness

Two assumptions underpin all identification results:

> [!definition] Definition: Causal Markov Condition
> A DAG $\mathcal{G}$ and joint distribution $\mathbb{P}$ satisfy the **Causal Markov Condition**
> if every variable $X_i$ is conditionally independent of its non-descendants given its parents
> in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Equivalently, $\mathbb{P}$ factorizes as $\mathbb{P}(X_1,\ldots,X_d) = \prod_{i=1}^d \mathbb{P}(X_i \mid \mathrm{Pa}(X_i))$.
^def-markov

> [!definition] Definition: Faithfulness
> A distribution $\mathbb{P}$ is **faithful** to $\mathcal{G}$ if every CI relation in
> $\mathbb{P}$ is *entailed* by $\mathcal{G}$ via d-separation. That is, no CI relation
> is a "coincidence" — if $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ holds in $\mathbb{P}$,
> then $X_i$ is d-separated from $X_j$ given $\mathbf{Z}$ in $\mathcal{G}$.
>
> **Interpretation:** Faithfulness rules out structural cancellations — e.g., two paths
> of equal and opposite strength that create spurious marginal independence.
^def-faithfulness

### Markov Equivalence: The Verma–Pearl Theorem

> [!theorem] Theorem: Verma–Pearl Characterization (Verma & Pearl 1990; Frydenberg 1990)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ on the same vertex set are **Markov equivalent**
> (entail the same set of CI relations for all faithful distributions) if and only if:
> 1. They have the **same skeleton** (same undirected edges ignoring orientation), and
> 2. They have the **same v-structures** (same unshielded colliders $X_i \to X_k \leftarrow X_j$
>    where $X_i$ and $X_j$ are non-adjacent).
>
> An **unshielded collider** (v-structure) $i \to k \leftarrow j$ requires that $i$ and $j$
> have no direct edge between them — the "shield" being the absence of $i$–$j$ adjacency.
^thm-verma-pearl

### The CPDAG (Essential Graph)

> [!definition] Definition: CPDAG / Essential Graph (Andersson, Madigan & Perlman 1997)
> The **CPDAG** (Completed Partially Directed Acyclic Graph) of a Markov equivalence class
> $[\mathcal{G}]$ is the unique graph on the same vertex set such that:
> - A directed edge $X_i \to X_j$ appears in the CPDAG iff $X_i \to X_j$ appears in
>   **every** DAG in $[\mathcal{G}]$ (the edge orientation is **compelled**).
> - An undirected edge $X_i - X_j$ appears iff both $X_i \to X_j$ and $X_i \leftarrow X_j$
>   appear in *some* members of $[\mathcal{G}]$ (the orientation is **reversible**).
>
> The CPDAG is the **union graph** of the equivalence class and uniquely represents it.
> It is also called the *essential graph*.
^def-cpdag

### Meek's Orientation Rules

Given the correct skeleton and v-structures, Meek (1995) provided four sound-and-complete
rules that propagate orientations to produce the full CPDAG:

> [!theorem] Meek's Rules (Meek 1995)
> Starting from a partially directed graph (skeleton with v-structures marked), repeatedly
> apply until no change:
>
> **R1 (Acyclicity):** If $i \to j - k$ and $i$ and $k$ are non-adjacent, orient $j \to k$
> (otherwise $k \to j$ would create a new v-structure $i \to j \leftarrow k$).
>
> **R2 (Cycle prevention):** If $i \to k \to j$ and $i - j$, orient $i \to j$
> (otherwise a directed cycle would form).
>
> **R3 (Disambiguation):** If $i - k \to j$ and $i - l \to j$ and $i - j$ and $k,l$
> non-adjacent, orient $i \to j$.
>
> **R4 (Disambiguation):** If $i - k \to l \to j$ and $i - j$ and $k$ and $j$ non-adjacent,
> orient $i \to j$.
>
> Repeated application of R1–R4 yields the unique CPDAG. Rules R1–R3 suffice when there
> are no background-knowledge constraints.
^thm-meek-rules

### What Cannot Be Identified from Observational Data

The undirected edges in the CPDAG mark orientations that are **not identifiable** from
observational data under the Markov + faithfulness assumptions. To identify these, one needs:
- **Interventional data** (do-calculus; Pearl 2009)
- **Structural constraints**: non-Gaussian noise (LiNGAM; Shimizu et al. 2006) — if noise is
  non-Gaussian, every variable's causal order is identifiable from data
- **Equal-variance Gaussian noise** (Peters & Bühlmann 2014): when noise variances are equal,
  the DAG is identifiable up to the true DAG (not just CPDAG)

## Examples

> [!example] Example: Three-Variable Equivalence Class
> Consider three variables $X, Y, Z$ with skeleton $X - Y - Z$ (no $X$–$Z$ edge).
>
> **Case 1 — Chain:** $X \to Y \to Z$ and $X \leftarrow Y \leftarrow Z$ are Markov equivalent
> (same skeleton $X - Y - Z$, no v-structures). CPDAG has $X - Y - Z$ with all edges undirected.
>
> **Case 2 — Fork:** $X \leftarrow Y \to Z$ is also equivalent to Cases 1a/1b. Same CPDAG.
>
> **Case 3 — V-structure (collider):** $X \to Y \leftarrow Z$. This has a v-structure at $Y$
> and is NOT equivalent to the chain/fork cases. CPDAG has directed edges: $X \to Y \leftarrow Z$.
>
> **Key takeaway:** The collider $X \to Y \leftarrow Z$ is identifiable from data; the
> chain/fork direction is not.

## Connections

- **Constraint-based discovery** ([[PC Algorithm]]): recovers the CPDAG by first identifying
  the skeleton (removing edges via CI tests) and then orienting v-structures using stored
  separating sets.
- **Score-based discovery** ([[Greedy Equivalence Search (GES)]]): searches directly over the
  space of CPDAGs, treating each equivalence class as one search state.
- **Continuous optimization** ([[NOTEARS - Overview]]): works over weighted adjacency matrices
  rather than equivalence classes; does not output a CPDAG directly.
- **DAG semantics** ([[Directed Acyclic Graphs]]): the CPDAG inherits the causal semantics
  (backdoor adjustment, d-separation, do-calculus) from its member DAGs.
- **Bayesian network structure learning** ([[BN Construction Methods Comparison]]): the CPDAG
  is the target of constraint-based and score-based Bayesian network structure learning.

## See Also
- [[PC Algorithm]] — recovers the CPDAG via conditional independence testing
- [[Greedy Equivalence Search (GES)]] — score-based search over equivalence classes
- [[DAG Structure Learning Problem]] — the general NP-hard problem
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
- [[Causal Discovery Methods Overview]] — comparison of PC, GES, and NOTEARS
