---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch07a-PC-citation.md]]"
source_location: "Kalisch & Bühlmann 2007, §2; Chickering 2002, §2; Verma & Pearl 1990"
date_ingested: 2026-09-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Causal Structure Learning - Methods Overview]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence"
  - "equivalence class of DAGs"
  - "Verma-Pearl characterization"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same set of conditional
> independences — formally, they share the same **skeleton** and the same **v-structures**
> (Verma & Pearl 1990). The set of all DAGs equivalent to a given DAG is its **Markov
> equivalence class (MEC)**; a MEC is represented uniquely by a **Completed Partially
> Directed Acyclic Graph (CPDAG)**, which directs only those edges whose direction is shared
> by *every* DAG in the class. Both [[PC Algorithm]] and [[GES Algorithm]] output a CPDAG,
> not a unique DAG — this is the identifiability limit of observational data under standard
> assumptions.

## Overview

In causal structure learning, the ultimate goal is to recover the true causal DAG $\mathcal{G}^*$
from data. Under the **Causal Markov Condition** (CMC) and **Faithfulness**, the distribution
$\mathbb{P}(X)$ encodes precisely the conditional independences entailed by $\mathcal{G}^*$ via
d-separation — no more, no less. The problem is that multiple distinct DAGs can entail
*exactly* the same set of conditional independences. These DAGs form a Markov equivalence class,
and from purely observational data we cannot distinguish among members of the same class.

This is not merely a computational limitation — it is a fundamental identifiability result.
Recovering the full equivalence class (the CPDAG) is the best one can do under faithfulness
and causal sufficiency without further assumptions.

## Main Content

### Skeleton and V-structures

> [!definition] Definition: Skeleton (Spirtes, Glymour & Scheines 2000)
> The **skeleton** of a DAG $\mathcal{G} = (\mathsf{V}, \mathsf{E})$ is the undirected graph
> obtained by replacing each directed edge $i \to j$ with the undirected edge $i - j$.
> It records which pairs of nodes are adjacent, irrespective of edge direction.
^def-skeleton

> [!definition] Definition: V-structure (Immorality) (Verma & Pearl 1990)
> A **v-structure** (also called an *immorality* or *unshielded collider*) in a DAG is a
> triple $i \to k \leftarrow j$ where nodes $i$ and $j$ are **not adjacent** in the skeleton.
> Equivalently, $k$ is a collider on the path $i - k - j$, and neither $i$ nor $j$ is a parent
> of the other.
^def-vstructure

V-structures are special because they are the only triples whose orientation can be inferred
from conditional independence alone: $i \to k \leftarrow j$ iff $i \not\!\perp\!\!\!\perp j$ but
$i \perp\!\!\!\perp j \mid k$ (conditioning on the collider *activates* the path, conditioning
on the non-collider *blocks* it).

### The Verma–Pearl Characterization

> [!theorem] Theorem: Markov Equivalence Characterization (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** (encode the same
> conditional independences under CMC + Faithfulness) **if and only if** they have the same
> skeleton **and** the same v-structures.
>
> Equivalently: $\mathcal{G}_1 \sim \mathcal{G}_2 \iff$ for every pair $i,j$ and every set
> $S$ not containing $i$ or $j$:
> $$i \perp\!\!\!\perp j \mid S \text{ in } \mathcal{G}_1 \iff i \perp\!\!\!\perp j \mid S \text{ in } \mathcal{G}_2.$$
^thm-verma-pearl

This result is fundamental: **skeleton differences imply distributional differences** (testable
with CI tests), and **v-structure differences also imply distributional differences**. But two
DAGs differing only in the *direction of a non-v-structure edge* are indistinguishable from
observational data.

### The CPDAG Representation

> [!definition] Definition: CPDAG (Chickering 2002; Dor & Tarsi 1992)
> The **Completed Partially Directed Acyclic Graph (CPDAG)** of a Markov equivalence class is
> the unique mixed graph on $\mathsf{V}$ satisfying:
>
> 1. $i \to j$ in the CPDAG $\iff$ $i \to j$ in **every** DAG of the equivalence class.
> 2. $i - j$ (undirected) in the CPDAG $\iff$ there exist DAGs in the class with $i \to j$ and
>    with $j \to i$.
> 3. The CPDAG has the same skeleton as all DAGs in the class.
> 4. The CPDAG has the same v-structures as all DAGs in the class.
^def-cpdag

A CPDAG is always a valid **MPDAG** (maximally oriented PDDAG): it directs every edge it can
without creating new v-structures or cycles. The directed edges of a CPDAG are the *identifiable*
causal directions; the undirected edges are *non-identifiable*.

> [!example] Example: Three-node CPDAG
> Consider $X_1 \to X_2 \to X_3$ (a chain). Its Markov equivalence class contains *two* DAGs:
> $X_1 \to X_2 \to X_3$ and $X_1 \leftarrow X_2 \leftarrow X_3$
> (same skeleton $1-2-3$, no v-structures since $1$ and $3$ are non-adjacent, $2 \notin$ sep$(1,3)$... wait, actually for the chain there IS an independence: $X_1 \perp X_3 \mid X_2$, and $X_3$ is a *non-collider* on $1-2-3$).
>
> The CPDAG is $1 - 2 - 3$: both edges undirected. Contrast with the v-structure
> $X_1 \to X_2 \leftarrow X_3$ (fork with $1,3$ non-adjacent): its CPDAG has *both edges directed*
> $1 \to 2 \leftarrow 3$ since that v-structure is unique to this equivalence class.

### When can we identify a unique DAG?

Observational data alone — under faithfulness and causal sufficiency — only identifies the CPDAG.
Additional assumptions that enable **full DAG identification**:

| Assumption | Method | Reference |
|-----------|--------|-----------|
| Non-Gaussian noise | LiNGAM (ICA on residuals) | Shimizu et al. 2006 |
| Equal error variances | Equal-variance LiNGAM | Peters & Mooij 2013 |
| Nonlinear + additive noise | ANM (Hoyer et al. 2009) | Hoyer et al. 2009 |
| Interventional data | JCI / IGSP | Magliacane et al., 2016 |

## Connections

- **Why PC/GES output CPDAGs**: both algorithms work with conditional independence information,
  which can only ever distinguish Markov-equivalent structures (Theorem above). See [[PC Algorithm]]
  and [[GES Algorithm]].
- **NOTEARS and identifiability**: [[NOTEARS - Overview]] circumvents the combinatorial DAG
  constraint, but still targets a specific DAG in the equivalence class — the LS-minimizer need
  not be unique without additional assumptions.
- **Causal inference interpretation**: in [[Directed Acyclic Graphs]], non-identifiable edges
  correspond to causal directions that cannot be inferred without experimental data or additional
  functional-form assumptions. The back-door criterion applies to any consistent extension of
  the CPDAG to a DAG.

## See Also

- [[DAG Structure Learning Problem]] — score formulation NOTEARS builds on
- [[PC Algorithm]] — outputs the CPDAG by conditional independence testing
- [[GES Algorithm]] — outputs the CPDAG by score-based search
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, causal DAG reasoning
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
