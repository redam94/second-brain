---
title: "CPDAG and Markov Equivalence"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-structure-learning-survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 2–3; Chickering (2002), §2"
date_ingested: 2026-08-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "completed PDAG"
  - "essential graph"
---

# CPDAG and Markov Equivalence

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
> independences — that is, they have the same **skeleton** (undirected edges) and the same
> **v-structures** (unshielded colliders). The **CPDAG** (Completed Partially Directed Acyclic Graph),
> also called the *essential graph*, is the unique graph that represents an entire Markov equivalence
> class: directed edges are those that have the same direction in every DAG in the class; undirected
> edges are those that can be reversed without changing the independence model. Both the PC algorithm
> and GES output CPDAGs — learning a DAG from data is only possible up to Markov equivalence without
> additional assumptions (interventions, non-Gaussianity, or functional restrictions).

## Overview

DAG-based causal models link *graph structure* to *probabilistic independence*: every variable is
independent of its non-descendants given its parents (the **Markov condition**). But a given
probability distribution $p(X)$ may be consistent with more than one DAG. Any two DAGs consistent
with the same distribution must share the same conditional independence structure — they are
**Markov equivalent**.

Causal structure learning from observational data can therefore only ever identify the **Markov
equivalence class** of the true DAG, not the unique DAG itself (unless additional constraints are
imposed). The CPDAG is the canonical representation of this class.

## Main Content

### Conditional Independence and d-Separation

> [!definition] Definition: d-Separation (Pearl 1988)
> In a DAG $\mathcal{G}$, a path $p$ between nodes $X$ and $Y$ is **blocked** by a set $Z$ if:
> - There is a non-collider $M$ on $p$ (i.e., $M \leftarrow \cdots$ or $M \rightarrow \cdots$)
>   such that $M \in Z$, or
> - There is a collider $M$ on $p$ (i.e., $\cdots \rightarrow M \leftarrow \cdots$) such that
>   neither $M$ nor any of its descendants is in $Z$.
>
> $X$ and $Y$ are **d-separated** by $Z$ in $\mathcal{G}$ if every path between them is blocked by $Z$.
^def-d-separation

> [!definition] Definition: Markov Condition
> A distribution $p$ satisfies the **Markov condition** for DAG $\mathcal{G}$ if every
> d-separation statement in $\mathcal{G}$ implies a corresponding conditional independence in $p$:
> $$X \perp_{\mathcal{G}} Y \mid Z \implies X \perp_p Y \mid Z.$$
^def-markov-condition

### Markov Equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** if they encode the same
> set of d-separations — equivalently, the same set of conditional independence statements for
> *any* faithful distribution. Verma & Pearl (1990) characterised Markov equivalence:
>
> **Theorem:** Two DAGs are Markov equivalent if and only if they have the same:
> 1. **Skeleton** — the same edges, ignoring directions.
> 2. **V-structures** (unshielded colliders) — triples $X \rightarrow Z \leftarrow Y$ where $X$
>    and $Y$ are not adjacent.
^def-markov-equivalence

The v-structure criterion is the fundamental result that makes constraint-based learning possible:
by testing conditional independences, we can identify which colliders are "unshielded" and thereby
pin down the equivalence class.

### CPDAGs

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $\mathcal{C}(\mathcal{G})$ of a DAG $\mathcal{G}$ is the unique graph on the
> same nodes such that:
> - An edge $X \rightarrow Y$ is **directed** in $\mathcal{C}(\mathcal{G})$ if and only if it
>   has the same direction in *every* DAG in the Markov equivalence class of $\mathcal{G}$.
> - An edge $X - Y$ is **undirected** in $\mathcal{C}(\mathcal{G})$ if it can point in either
>   direction in some member of the equivalence class.
>
> Equivalently, $\mathcal{C}(\mathcal{G})$ is characterized by the skeleton and v-structures of
> $\mathcal{G}$ (by the Markov equivalence theorem). Also called the **essential graph**.
^def-cpdag

> [!example] Example: Three-node Markov Equivalence Class
> Consider the three DAGs: $X \rightarrow Y \rightarrow Z$, $X \leftarrow Y \rightarrow Z$, and
> $X \rightarrow Y \leftarrow Z$.
>
> The first two ($X \rightarrow Y \rightarrow Z$ and $X \leftarrow Y \rightarrow Z$) are Markov
> equivalent: same skeleton ($X-Y-Z$) and no v-structures. Their CPDAG is the undirected graph
> $X - Y - Z$.
>
> The third ($X \rightarrow Y \leftarrow Z$) has a v-structure at $Y$ (since $X$ and $Z$ are
> not adjacent). Its CPDAG is $X \rightarrow Y \leftarrow Z$ (all edges forced).

### Faithfulness

> [!definition] Definition: Faithfulness (Spirtes, Glymour & Scheines 2000)
> A distribution $p$ is **faithful** to a DAG $\mathcal{G}$ if the conditional independence
> structure of $p$ exactly matches the d-separation structure of $\mathcal{G}$:
> $$X \perp_p Y \mid Z \implies X \perp_{\mathcal{G}} Y \mid Z.$$
> Faithfulness rules out "accidental" cancellations — situations where two causal paths cancel
> each other so that no net association is observable.
^def-faithfulness

Faithfulness is the key assumption for constraint-based methods (PC) and score-based methods (GES)
alike. Without it, a conditional independence could be observed even though there is an edge, making
the true graph unidentifiable.

### Meek Rules for PDAG Completion

Once a partial orientation (skeleton + v-structures) is established, Meek (1995) showed that
exactly four rules propagate orientations without introducing cycles or new v-structures:

> [!definition] Definition: Meek Orientation Rules (Meek 1995)
> Given a PDAG with some directed and some undirected edges, the following rules must be applied
> exhaustively:
>
> **R1 (Avoid new v-structure):** If $X \rightarrow Y - Z$ and $X, Z$ not adjacent, orient $Y \rightarrow Z$.
>
> **R2 (Avoid cycle):** If $X \rightarrow Y \rightarrow Z$ and $X - Z$, orient $X \rightarrow Z$.
>
> **R3 (Avoid new v-structure via two paths):** If $X - Y$, $W \rightarrow Y$, $Z \rightarrow Y$, $X - W$,
> $X - Z$, and $W, Z$ not adjacent, orient $X \rightarrow Y$.
>
> **R4 (Avoid cycle via two paths):** If $X - Y$, $W \rightarrow Y \rightarrow Z$, $X - Z$, and
> $W, X$ not adjacent, orient $X \rightarrow Z$.
>
> These four rules are **complete**: applying them exhaustively to a skeleton + v-structure
> configuration yields exactly the CPDAG.
^def-meek-rules

## Why Only CPDAGs are Identifiable

Without additional assumptions, observational data can never distinguish Markov-equivalent DAGs.
The only extra information that breaks equivalence is:

- **Interventions** (perturbations that fix a variable's value): an intervention on $X$ in
  $X \rightarrow Y$ vs. $X \leftarrow Y$ produces different observational distributions.
- **Non-Gaussianity**: the LiNGAM framework (Shimizu et al. 2006) shows that in linear SEMs
  with non-Gaussian noise, the DAG is identifiable up to a finite set (often uniquely).
- **Equal variances / additive noise**: under restricted noise structures, the CPDAG can be further
  oriented.
- **NOTEARS / continuous optimization** ([[NOTEARS - Overview]]): in practice, with finite samples,
  the score landscape may prefer one DAG — but this preference is not asymptotically consistent.

## Connections

- **Relation to [[DAG Structure Learning Problem]]**: the problem is to learn $\mathcal{G}$ or its
  CPDAG from data. NOTEARS targets a DAG by continuous optimization; PC and GES target the CPDAG
  as the natural identifiable object.
- **Relation to [[Directed Acyclic Graphs]]**: d-separation and the Markov condition are the
  probabilistic backbone of DAG-based causal reasoning. CPDAGs are what remains when we remove
  the unidentifiable edge directions.
- **Relation to [[Confirmatory Factor Analysis and SEM]]**: structural equation models define the
  DAG as a coefficient matrix; Markov equivalence means many SEMs can produce the same distribution.

## See Also
- [[Directed Acyclic Graphs]] — DAG formalism, d-separation, back-door criterion
- [[DAG Structure Learning Problem]] — the NP-hardness and score-based formulation NOTEARS builds on
- [[PC Algorithm]] — constraint-based algorithm that outputs a CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm that searches the CPDAG space
- [[NOTEARS - Overview]] — continuous-optimization approach that bypasses the CPDAG and targets a DAG
- [[Spurious Association and Confounds]] — DAG semantics for causal inference (fork, pipe, collider)
