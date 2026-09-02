---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-sources.md]]"
source_location: "Verma & Pearl (1990), UAI; Andersson et al. (1997), Ann. Stat. 25(2)"
date_ingested: 2026-09-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - CPDAG
  - essential graph
  - Markov equivalence
  - MEC
  - equivalence class of DAGs
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional independencies
> (same d-separation statements). Markov equivalence is fully characterized by the **Verma-Pearl theorem**:
> two DAGs are equivalent iff they share the same **skeleton** (undirected graph of adjacencies) and
> the same **v-structures** (unshielded colliders). The equivalence class is compactly represented by
> a **CPDAG** (Completed Partially Directed Acyclic Graph), in which directed edges appear where all
> equivalent DAGs agree on direction and undirected edges mark ambiguous orientations. Structure learning
> algorithms — PC and GES — target the CPDAG, not an individual DAG, because only v-structures are
> identifiable from observational data under the faithfulness assumption.

## Overview

Causal structure learning from observational data faces a fundamental identifiability ceiling: no
matter how much data you collect, you cannot distinguish between DAGs that encode the same
conditional independencies. This is not a limitation of any particular algorithm — it is
information-theoretic. The best an observational algorithm can do is identify the **Markov
equivalence class (MEC)** of the true DAG.

This note formalizes the MEC, its graphical characterization (Verma & Pearl 1990), and its
canonical representation as a CPDAG (Andersson et al. 1997). These concepts underlie both
[[PC Algorithm]] (which outputs a CPDAG via conditional independence tests) and
[[GES - Greedy Equivalence Search]] (which searches directly over the space of CPDAGs).

## Main Content

### Markov property and d-separation

> [!definition] Definition: d-Separation (Pearl 1988)
> In a DAG $\mathcal{G}$ on variables $V$, disjoint sets $X, Y, Z \subseteq V$ are
> **d-separated** given $Z$, written $X \perp_\mathcal{G} Y \mid Z$, if every path between
> a node in $X$ and a node in $Y$ is **blocked** by $Z$. A path is blocked given $Z$ if:
> 1. it contains a **chain** $A \to C \to B$ or **fork** $A \leftarrow C \to B$ where $C \in Z$, or
> 2. it contains a **collider** $A \to C \leftarrow B$ where $C \notin Z$ and no descendant of $C$ is in $Z$.
>
> A DAG $\mathcal{G}$ satisfies the **Markov condition** with respect to distribution $P$ if
> d-separation implies conditional independence: $X \perp_\mathcal{G} Y \mid Z \Rightarrow X \perp_P Y \mid Z$.
^def-dsep

> [!definition] Definition: Faithfulness
> Distribution $P$ is **faithful** to DAG $\mathcal{G}$ if the converse also holds:
> every conditional independence in $P$ is entailed by d-separation in $\mathcal{G}$:
> $$X \perp_P Y \mid Z \Rightarrow X \perp_\mathcal{G} Y \mid Z.$$
> Faithfulness rules out "accidental" cancellations of path effects that produce spurious
> independencies. It holds for Lebesgue-almost-all parameter settings of a DAG model.
^def-faithfulness

Under Markov + faithfulness, the conditional independence structure of $P$ and the d-separation
structure of $\mathcal{G}$ coincide exactly. This is why CI tests can recover graph structure.

### Markov equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **Markov equivalent** if they encode the same
> set of d-separation statements:
> $$\mathcal{G} \sim \mathcal{G}' \iff \forall\, X, Y, Z:\; X \perp_\mathcal{G} Y \mid Z \Leftrightarrow X \perp_{\mathcal{G}'} Y \mid Z.$$
> Under faithfulness, this equals: $\mathcal{G}$ and $\mathcal{G}' $ entail the same conditional
> independencies in any faithful distribution.
^def-markov-equiv

**Example.** The three DAGs $A \to B \to C$, $A \leftarrow B \leftarrow C$, and $A \leftarrow B \to C$
all encode the single CI statement $A \perp C \mid B$ and are Markov equivalent. The DAG
$A \to B \leftarrow C$ (a v-structure / collider) encodes instead $A \perp C$ (marginally) and is
in a *different* equivalence class.

### Graphical characterization: the Verma-Pearl theorem

> [!theorem] Theorem: Verma-Pearl Characterization (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are Markov equivalent if and only if:
> 1. They have the **same skeleton** (same adjacency structure, ignoring edge directions), and
> 2. They have the **same v-structures** (same unshielded colliders):
>    $A \to C \leftarrow B$ is a v-structure in $\mathcal{G}$ iff it is also a v-structure in $\mathcal{G}'$,
>    where "unshielded" means $A$ and $B$ are not adjacent.
>
> **Significance:** Only the skeleton and v-structures are identifiable from observational data.
> All other edge orientations are ambiguous within the equivalence class.
^thm-verma-pearl

This theorem is the foundation of constraint-based discovery: the PC algorithm explicitly recovers
the skeleton (via CI tests) and then orients v-structures (via checking separation sets), producing
the CPDAG.

### CPDAG: canonical representative

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $\mathcal{C}(\mathcal{G})$ of a DAG $\mathcal{G}$ is the unique graph on the same
> vertices such that:
> 1. $\mathcal{C}(\mathcal{G})$ contains a **directed** edge $A \to B$ iff every DAG in the MEC
>    of $\mathcal{G}$ contains $A \to B$.
> 2. $\mathcal{C}(\mathcal{G})$ contains an **undirected** edge $A - B$ iff the MEC contains at
>    least one DAG with $A \to B$ and at least one with $A \leftarrow B$.
>
> A CPDAG is characterized by: (a) it is a DAG when restricted to any consistent extension,
> (b) it equals the intersection of all edge orientations in the MEC.
^def-cpdag

CPDAGs are also called **essential graphs** (Andersson et al. 1997). They are partially directed:
some edges are directed (those constrained by v-structures or Meek rules), others undirected
(free to orient either way within the MEC).

**Constructing a CPDAG from a DAG:** The PC algorithm builds the CPDAG directly. Alternatively,
given any DAG, the CPDAG can be obtained via the **Dor-Tarsi algorithm** or equivalently by:
(1) finding all v-structures, (2) applying Meek's orientation rules exhaustively.

### Meek's orientation rules

After fixing v-structures, three additional rules propagate directions without introducing new
v-structures or cycles (Meek 1995). Let $G$ be the partially oriented graph:

> [!theorem] Meek's Rules (Meek 1995)
> **R1 (Away from collider):** If $A \to B - C$ and $A, C$ not adjacent, orient $B \to C$.
> *(Otherwise $A \to B \leftarrow C$ would be a new v-structure.)*
>
> **R2 (Away from cycle):** If $A \to C \leftarrow B$ and $A - B$, orient $A \to B$.
> *(Otherwise $A - B \to C - A$ creates a directed cycle.)*
>
> **R3 (Double-triangle):** If $D - C$, $D - A \to C$, $D - B \to C$, $A$ and $B$ non-adjacent,
> orient $D \to C$.
>
> These three rules together with v-structure orientation are **complete**: applying them
> exhaustively produces the unique CPDAG of $\mathcal{G}$.
^thm-meek-rules

## Score equivalence

A key property that motivates the GES score-based approach:

> [!definition] Definition: Score Equivalence
> A score function $Q(\mathcal{G}, \mathbf{X})$ is **score equivalent** if $\mathcal{G} \sim \mathcal{G}'
> \Rightarrow Q(\mathcal{G}) = Q(\mathcal{G}')$. Under score equivalence, searching over CPDAGs is
> equivalent to searching over individual DAGs — we lose nothing by working in the space of
> equivalence classes.
^def-score-equiv

The Gaussian BIC score $\mathrm{BIC}(\mathcal{G}) = \log P(\mathbf{X} \mid \hat{\theta}_\mathcal{G}) - \frac{k}{2}\log n$
(where $k$ = number of free parameters) is score equivalent. So is the Bayesian Dirichlet (BDe/BDeu)
score for categorical data. This is why GES searches over CPDAGs rather than DAGs.

## Connections

- **Observational identifiability limit:** The MEC is the finest identifiable object from observational
  data under Markov + faithfulness. Going beyond requires interventional data, specific noise assumptions
  (e.g., LiNGAM assumes non-Gaussian noise → full DAG identifiable), or background knowledge.
- **Causal inference in the MEC:** If the true DAG is in a non-trivial MEC (≥2 members), causal
  effects involving ambiguously oriented edges are not point-identified. [[Directed Acyclic Graphs]]
  covers the do-calculus and back-door/front-door criteria that apply once the DAG is fixed.
- **LiNGAM (non-Gaussian):** Under non-Gaussian noise, Shimizu et al. (2006) show that the full DAG
  (not just CPDAG) is identifiable — LiNGAM uses ICA to recover it. This bypasses the MEC
  limitation at the cost of the non-Gaussianity assumption.
- **NOTEARS and the MEC:** [[NOTEARS - Overview]] estimates a DAG via continuous optimization.
  Its output is a specific DAG, not a CPDAG — if the identifiability ceiling is a concern, the
  returned DAG should be converted to its CPDAG.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that outputs the CPDAG
- [[GES - Greedy Equivalence Search]] — score-based search over the space of CPDAGs
- [[DAG Structure Learning Problem]] — the optimization setup NOTEARS uses
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, and causal reasoning with DAGs
- [[Conditional Independence Tests for Causal Discovery]] — the CI tests used by PC
