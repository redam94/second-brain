---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2 (background); primary sources: Verma & Pearl (1990), Chickering (2002), Meek (1995)"
date_ingested: 2026-08-12
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
  - "completed partially directed acyclic graph"
  - "Markov equivalence class"
  - "essential graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independence
> (CI) relations via d-separation — and hence are statistically indistinguishable from
> observational data alone. The equivalence class is represented compactly by a
> **CPDAG** (Completed Partially Directed Acyclic Graph), also called the *essential graph*,
> which shows the skeleton (undirected edges shared by all DAGs in the class) plus the
> **v-structures** (the only directed features identifiable without interventions). Both the
> [[PC Algorithm]] and [[GES - Greedy Equivalence Search]] return a CPDAG rather than a single DAG.

## Overview

Causal structure learning from observational data faces a fundamental *identifiability ceiling*:
without interventions, it is impossible to distinguish two DAGs that encode identical CI relations.
The collection of all such equivalent DAGs forms a **Markov equivalence class**, and any honest
algorithm must report the class, not an arbitrarily selected member. Understanding equivalence
classes is therefore a prerequisite for constraint-based (PC) and score-based (GES) structure
learning.

## Main Content

### D-separation and the Markov property

> [!definition] Definition: d-separation (Pearl, 1988)
> In a DAG $\mathcal{G} = (\mathsf{V}, \mathsf{E})$, a path $\pi$ between nodes $X_i$ and $X_j$
> is **blocked** by a set $S \subseteq \mathsf{V} \setminus \{i,j\}$ if:
> - $\pi$ contains a **chain** $X_i \to X_m \to X_j$ or **fork** $X_i \leftarrow X_m \to X_j$ with
>   $X_m \in S$, OR
> - $\pi$ contains a **v-structure (collider)** $X_i \to X_m \leftarrow X_j$ where neither
>   $X_m$ nor any of its descendants is in $S$.
>
> Variables $X_i$ and $X_j$ are **d-separated** by $S$ (written $X_i \perp\!\!\!\perp_{\mathcal{G}} X_j \mid S$)
> if every path between them is blocked by $S$. The **global Markov property** states that
> d-separation implies conditional independence in the distribution: if $X_i \perp\!\!\!\perp_{\mathcal{G}} X_j \mid S$
> then $X_i \perp\!\!\!\perp X_j \mid S$ in $\mathbb{P}$.
^def-dsep

### V-structures (immoralities)

> [!definition] Definition: V-structure / Immorality
> A **v-structure** (or *immorality*) in a DAG is a triple $(X_i, X_m, X_j)$ such that:
> $$X_i \to X_m \leftarrow X_j \quad \text{and} \quad X_i \not\!\!-\!\!\!- X_j$$
> i.e., $X_m$ is a **collider** on the path $X_i \to X_m \leftarrow X_j$ and the two
> parents $X_i, X_j$ are **not** adjacent. The node $X_m$ is called a *collider* or *common
> effect*.
^def-vstructure

V-structures behave uniquely under d-separation: $X_i$ and $X_j$ are d-separated by the empty set
$\varnothing$ at the collider, but become *dependent* when conditioning on $X_m$ or its descendants
(explaining away). This asymmetry is what makes v-structures the *only* locally identifiable
directed structure from observational data.

### Markov equivalence: Verma–Pearl theorem

> [!theorem] Theorem: Characterisation of Markov Equivalence (Verma & Pearl, 1990; Meek, 1995)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **Markov equivalent** — they encode the same set
> of CI relations via d-separation — **if and only if** they have:
> 1. the same **skeleton** (same pairs of adjacent nodes, ignoring direction), and
> 2. the same **v-structures** (same set of immoralities).
>
> Equivalently: two DAGs are Markov equivalent iff they have the same skeleton and the same
> v-structures.
^thm-verma-pearl

This theorem is central: checking equivalence requires only comparing skeletons and v-structures,
not exhaustively comparing all CI relations.

### The CPDAG representation

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $\mathcal{C}(\mathcal{G})$ of a DAG $\mathcal{G}$ is the unique graph on the
> same node set such that:
> - Every edge that has the **same orientation in every DAG** in the equivalence class is
>   represented as a **directed edge** in $\mathcal{C}$.
> - Every edge whose orientation **varies** across the equivalence class is represented as an
>   **undirected edge** in $\mathcal{C}$.
>
> The CPDAG is the **canonical representative** of the Markov equivalence class.
> Also called the *essential graph* (Andersson, Madigan & Perlman, 1997).
^def-cpdag

> [!note] Structure of directed edges in a CPDAG
> A directed edge $X_i \to X_j$ appears in the CPDAG if and only if $X_i \to X_j$ has the
> same orientation in every DAG in the equivalence class. This happens precisely when
> $X_i \to X_j$ is *compelled* by either a v-structure or a Meek orientation rule.

### Meek orientation rules

After identifying the skeleton and v-structures, additional edges can be oriented by applying
**Meek's four rules** (Meek, 1995) to avoid creating new v-structures or directed cycles.
These rules propagate orientations consistently across the CPDAG:

| Rule | Pattern | Orientation |
|------|---------|------------|
| R1 (acyclicity) | $X_i \to X_m - X_j$, $X_i$ and $X_j$ not adjacent | orient $X_m \to X_j$ |
| R2 (acyclicity) | $X_i \to X_m \to X_j$, $X_i - X_j$ | orient $X_i \to X_j$ |
| R3 (v-structure prevention) | $X_i - X_m$, $X_i - X_k$, $X_m \to X_j \leftarrow X_k$, $X_i$ and $X_j$ adjacent | orient $X_i \to X_j$ |
| R4 (v-structure prevention) | $X_i - X_m \to X_k \to X_j$, $X_i - X_k$, $X_i$ and $X_j$ adjacent | orient $X_i \to X_j$ |

Meek (1995) proved that these rules are **complete**: applying them exhaustively yields the
CPDAG from any DAG representative of the equivalence class.

### Faithfulness assumption

> [!definition] Definition: Faithfulness (Spirtes, Glymour & Scheines, 2000)
> A distribution $\mathbb{P}$ is **faithful** to a DAG $\mathcal{G}$ if every CI relation
> in $\mathbb{P}$ is *entailed* by $\mathcal{G}$ via d-separation. Formally, for all disjoint
> $A, B, C \subseteq \mathsf{V}$:
> $$A \perp\!\!\!\perp_{\mathcal{G}} B \mid C \iff A \perp\!\!\!\perp B \mid C \text{ in } \mathbb{P}.$$
>
> Without faithfulness, cancellation of paths can create spurious independence relations, and
> no algorithm based on CI testing can recover the true structure.
^def-faithfulness

Faithfulness is the key *identifiability* assumption for constraint-based methods. It is generically
satisfied (holds except on a measure-zero set of parameters) but can fail in specific parametric
models.

## Examples

> [!example] Example: Distinguishable vs. indistinguishable DAGs
> Consider four nodes $W, X, Y, Z$. The three DAGs:
>
> 1. $W \to X \to Y$ and $W \to Z$
> 2. $W \leftarrow X \to Y$ and $W \to Z$
> 3. $W \to X \leftarrow Y$ and $W \to Z$
>
> DAGs 1 and 2 are Markov equivalent (same skeleton, no v-structures). DAG 3 is **not** equivalent
> to 1 or 2 because it contains a v-structure $W \to X \leftarrow Y$ (since $W$ and $Y$ are not
> adjacent).
>
> The CPDAG for the class {DAG 1, DAG 2} shows $W - X$ and $X - Y$ as undirected and $W \to Z$
> as directed. Any observational data generated from either DAG will exhibit identical CI patterns.

## Connections

- **PC algorithm** outputs the CPDAG by testing CIs to recover the skeleton and v-structures, then
  applying Meek rules. See [[PC Algorithm]].
- **GES** operates directly in CPDAG space, scoring Markov equivalence classes rather than
  individual DAGs. See [[GES - Greedy Equivalence Search]].
- **NOTEARS** (score-based, continuous) identifies a single DAG from $\mathbb{R}^{d\times d}$, not a
  CPDAG — it implicitly picks one member of the equivalence class. See [[NOTEARS - Overview]].
- **Interventional identifiability**: v-structures that remain ambiguous in the CPDAG can be
  identified by *targeted interventions* that break symmetry — this is the domain of active
  learning for causal discovery.
- **DAG semantics**: [[Directed Acyclic Graphs]] covers d-separation, back-door criterion, and
  do-calculus; [[Canonical Causal DAGs]] shows fork/pipe/collider patterns that correspond to
  the three types of path in a d-separation argument.

## See Also
- [[PC Algorithm]] — the constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based search over equivalence classes
- [[DAG Structure Learning Problem]] — the combinatorial optimization formulation
- [[Directed Acyclic Graphs]] — d-separation, back-door, do-calculus
- [[NOTEARS - Overview]] — continuous optimization alternative
