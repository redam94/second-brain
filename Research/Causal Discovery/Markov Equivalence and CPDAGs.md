---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-survey.md]]"
source_location: "§1, Verma & Pearl (1990), Meek (1995)"
date_ingested: 2026-07-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> From observational data alone, a DAG is identified only up to its **Markov equivalence
> class** — the set of all DAGs encoding exactly the same conditional independencies.
> Markov equivalence classes have a canonical representative called a **CPDAG** (Completed
> Partially Directed Acyclic Graph), in which directed edges are those shared by *every*
> member of the class and undirected edges can go either way. Two DAGs are Markov equivalent
> iff they have the same skeleton and the same v-structures (Verma & Pearl 1990; Meek 1995).
> This equivalence is the fundamental limit of what constraint-based (PC) and score-based
> (GES) causal discovery can achieve without additional assumptions.

## Overview

Learning a causal DAG from observational data is fundamentally limited: infinitely many
DAGs can be consistent with the same joint distribution. This is not a finite-sample
problem — it persists even with infinite data. Two graphs encoding the same set of
conditional independence (CI) relations produce identical observational data distributions
(under the Markov condition), and no statistical procedure can distinguish them.

The collection of DAGs encoding the same CI model is called a **Markov equivalence class**.
The best that constraint-based and score-based structure learning can do — without additional
assumptions about the functional form or noise distribution — is identify this class.

Understanding what can and cannot be identified from observational data is prerequisite to
understanding [[PC Algorithm]] and [[GES - Greedy Equivalence Search]], both of which output
CPDAGs rather than unique DAGs.

## Main Content

### The Markov condition and faithfulness

> [!definition] Definition: Causal Markov condition
> A DAG $G$ satisfies the **causal Markov condition** for distribution $P$ if every node $X_i$
> is conditionally independent of its non-descendants given its parents in $G$:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Equivalently, $P$ **Markov-factors** over $G$: $p(x_1,\dots,x_d) = \prod_i p(x_i \mid \mathrm{pa}_i)$.
^def-markov-condition

> [!definition] Definition: Faithfulness (Causal Faithfulness Assumption)
> $P$ is **faithful** to $G$ if every conditional independence in $P$ is entailed by the
> d-separation relations in $G$. That is, $X \perp\!\!\!\perp Y \mid Z$ in $P$ **only if**
> $X$ and $Y$ are d-separated by $Z$ in $G$.
>
> Faithfulness rules out "accidental" cancellations of paths — e.g. two paths from $X$ to
> $Y$ with equal and opposite coefficients would make $X \perp\!\!\!\perp Y$ despite the
> absence of d-separation, violating faithfulness.
^def-faithfulness

Without faithfulness, structure learning from CI tests is impossible: false independencies
would incorrectly remove edges from the estimated skeleton.

### Markov equivalence

> [!definition] Definition: Markov equivalence
> Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if they encode exactly the same set of
> conditional independence relations (i.e. the same d-separation statements). Write $G_1 \sim G_2$.
^def-equivalence

> [!theorem] Theorem: Characterization of Markov equivalence (Verma & Pearl 1990; Meek 1995)
> Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if they have:
> 1. The **same skeleton**: the same set of edges ignoring direction ($i$—$j$ iff $i \to j$ or $i \leftarrow j$).
> 2. The **same set of v-structures**: the same set of unshielded colliders $A \to C \leftarrow B$
>    where $A$ and $B$ are **not adjacent** in the skeleton.
>
> A v-structure $A \to C \leftarrow B$ is also called an **immorality** (the two parents are
> "unmarried" — non-adjacent — yet share a child).
^thm-verma-pearl

**Key intuition**: Reversing an edge $X \to Y$ changes the CI structure only if doing so creates
or destroys a v-structure. If $X$ and $Y$ have the same parents (a "covered" edge), reversing
produces a Markov equivalent DAG. If they do not, a new v-structure appears, breaking equivalence.

### V-structures and the identifiable part

V-structures are the only edges whose direction is **identifiable from observational data** under
faithfulness. The logic:

- $A \to C \leftarrow B$ with $A, B$ non-adjacent: testing $A \perp\!\!\!\perp B$ and $A \perp\!\!\!\perp B \mid C$
  reveals the collider — marginally $A \perp\!\!\!\perp B$ (the path is blocked at $C$), but conditionally
  $A \not\!\perp\!\!\!\perp B \mid C$ (conditioning on a collider opens the path).
- $A \to C \to B$, $A \leftarrow C \to B$, $A \leftarrow C \leftarrow B$: all produce the same marginal and conditional
  independence pattern — $A \perp\!\!\!\perp B \mid C$ — and are therefore indistinguishable.

### CPDAGs (essential graphs)

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (also called the *essential graph*) of a Markov equivalence class $[G]$ is the
> unique graph on the same vertex set satisfying:
> - $X \to Y$ in the CPDAG **iff** $X \to Y$ in *every* DAG in the equivalence class (a **compelled edge**).
> - $X - Y$ in the CPDAG **iff** some DAGs in the class have $X \to Y$ and others have $X \leftarrow Y$
>   (a **reversible edge**).
>
> Every Markov equivalence class has a unique CPDAG. The CPDAG is itself acyclic on its directed
> edges, but may contain undirected edges.
^def-cpdag

CPDAGs are more informative than the skeleton (they show which edges are compelled) while being
more honest than a DAG (they don't pretend to know reversible edge directions). All of [[PC Algorithm]]
and [[GES - Greedy Equivalence Search]] produce CPDAGs as output.

### Meek orientation rules

Given the skeleton and v-structures of the CPDAG, additional edges can be oriented using Meek's
(1995) rules applied exhaustively:

> [!theorem] Meek Rules R1–R4 (Meek 1995)
> Let the current partially oriented graph contain $X - Y$ (undirected). Orient $X - Y$ as $X \to Y$ if:
>
> - **R1** ("avoid new v-structure"): $\exists$ a directed $Z \to X$ where $Z$ not adjacent to $Y$.
>   Orienting $Y \to X$ would create the new v-structure $Z \to X \leftarrow Y$.
>
> - **R2** ("avoid directed cycle"): $\exists$ a directed path $X \to Z \to Y$.
>   Orienting $Y \to X$ would create a directed cycle $X \to Z \to Y \to X$.
>
> - **R3** ("avoid two new v-structures"): $\exists$ $Z_1 - X \leftarrow Z_2$ and $Z_1 \to Y$ and
>   $Z_2 \to Y$ with $Z_1$ not adjacent to $Z_2$. Complex disambiguation.
>
> - **R4** (Meek 1995 extension, used in PC-stable): A similar disambiguation rule for
>   double-triangle configurations.
>
> Applying R1–R4 exhaustively from the v-structures produces the full CPDAG.
^thm-meek-rules

### What remains unidentifiable

Even after applying all Meek rules, some edges in the CPDAG remain undirected. These are
genuinely non-identifiable from i.i.d. observational data under faithfulness alone. To
resolve them, one needs:
- **Interventional data** (do-operator experiments)
- **Non-Gaussian noise** (LiNGAM: Shimizu et al. 2006 — the full DAG is identifiable)
- **Nonlinear additive noise** (ANM: Peters et al. 2014 — again fully identifiable)
- **Background knowledge** (known edge directions)

## Connections

- **PC Algorithm**: uses CI tests to recover the skeleton and v-structures, then applies Meek rules — outputs a CPDAG. See [[PC Algorithm]].
- **GES**: searches CPDAG space directly using a decomposable score — outputs a CPDAG. See [[GES - Greedy Equivalence Search]].
- **NOTEARS**: outputs a specific *DAG* (not a CPDAG) because it imposes a linear SEM with no symmetry. See [[NOTEARS - Overview]].
- **d-separation**: the graph-theoretic criterion for reading off conditional independencies from a DAG. See [[Directed Acyclic Graphs]] (d-separation rules are the foundation of the Markov condition).
- **Faithfulness in practice**: Strong faithfulness (Kalisch & Bühlmann 2007) is required for high-dimensional consistency; it fails when partial correlations are nearly zero without being exactly zero.

## See Also
- [[DAG Structure Learning Problem]] — the problem setup; landscape of prior methods
- [[PC Algorithm]] — constraint-based algorithm that outputs the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm that searches CPDAG space
- [[NOTEARS - Overview]] — continuous-optimization approach; outputs a DAG, not a CPDAG
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, causal semantics
- [[Spurious Association and Confounds]] — how v-structures (colliders) explain spurious associations
