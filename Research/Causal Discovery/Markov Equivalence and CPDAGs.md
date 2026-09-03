---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-SGS-reference.md]]"
source_location: "Ch. 2–3, pp. 40–80; Verma & Pearl (1990)"
date_ingested: 2026-09-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Causal Discovery Methods Comparison]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> From observational data alone, the **data-generating DAG cannot be uniquely identified** —
> any DAG in the same **Markov equivalence class** (MEC) is equally compatible with the data.
> The canonical representation of a MEC is its **CPDAG** (Completed Partially Directed Acyclic
> Graph), also called the *essential graph*. Understanding CPDAGs is prerequisite to both
> [[PC Algorithm|PC]] (which outputs a CPDAG) and [[Greedy Equivalence Search|GES]] (which
> searches in CPDAG space). The key characterization: two DAGs are Markov equivalent if and
> only if they share the same **skeleton** and the same **v-structures** (unshielded colliders).

## Overview

A fundamental limit of causal structure learning from observational data is that many different
DAGs encode exactly the same conditional independence (CI) structure. The set of DAGs that share
this CI structure forms a **Markov equivalence class (MEC)**. No data-generating process
can distinguish two DAGs in the same MEC without intervention (experiments).

This observational identifiability limit is not a failure of an algorithm — it is a
mathematical impossibility result. The [[PC Algorithm]] and [[Greedy Equivalence Search|GES]]
return the most refined structure recoverable from observational data: the **CPDAG**.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ over the same vertex set $V$ are **Markov equivalent** if and only if
> they encode the same set of conditional independence relations — equivalently, if they
> define the same **d-separation statements**.
>
> Notation: $[G]$ denotes the Markov equivalence class of $G$.
^def-markov-equiv

> [!theorem] Theorem: Skeleton + V-structure Characterization (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ are Markov equivalent if and only if:
> 1. **Same skeleton**: the same pairs of vertices are adjacent (ignoring edge direction).
> 2. **Same v-structures**: the same set of *unshielded colliders* $X \to Z \leftarrow Y$
>    (with $X$ and $Y$ not directly adjacent).
>
> Equivalently, their MECs are the same. The skeleton and v-structures together fully determine
> the equivalence class.
^thm-verma-pearl

> [!example] Example: Three DAGs in one equivalence class
> Consider three variables $\{X, Y, Z\}$ with skeleton $X - Y - Z$ (a path, no $X$–$Z$ edge).
>
> - $G_1$: $X \to Y \to Z$
> - $G_2$: $X \leftarrow Y \to Z$
> - $G_3$: $X \leftarrow Y \leftarrow Z$
>
> All three encode exactly $X \perp\!\!\!\perp Z \mid Y$ and no other non-trivial CI. They share
> skeleton $X - Y - Z$ and have **no v-structures** (in each, $Y$ is a non-collider). Therefore
> they are Markov equivalent: $[G_1] = [G_2] = [G_3]$.
>
> Contrast: $G_4 : X \to Y \leftarrow Z$ has the same skeleton but **different v-structure**
> ($Y$ is a collider in $G_4$, creating $X \perp\!\!\!\perp Z$ but $X \not\!\perp\!\!\!\perp Z \mid Y$).
> So $[G_4] \neq [G_1]$.
^ex-three-dags

### CPDAG (Completed Partially Directed Acyclic Graph)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** of a Markov equivalence class $[G]$ is the unique graph $\mathcal{C}$ over $V$
> whose edges encode precisely what is identifiable from $[G]$:
>
> - **Directed edge** $X \to Y$ in $\mathcal{C}$: every DAG $G' \in [G]$ has $X \to Y$.
>   This edge is **compelled** — reversing it would change the skeleton or create a new
>   v-structure, leaving the equivalence class.
> - **Undirected edge** $X - Y$ in $\mathcal{C}$: some DAGs in $[G]$ have $X \to Y$ and
>   others have $X \leftarrow Y$. This edge is **reversible** and not identifiable from data.
>
> The CPDAG is also called the **essential graph** (Andersson, Madigan & Perlman, 1997).
^def-cpdag

> [!note] Compelled vs. reversible edges
> An edge $X \to Y$ in a DAG $G$ is **compelled** in its MEC if and only if:
> 1. It is in a v-structure: there exists $Z$ not adjacent to $X$ such that $Z \to Y$ (i.e.
>    $X \to Y \leftarrow Z$ is an unshielded collider), **or**
> 2. Reversing it would force some other compelled edge to change direction (a cascading effect).
>
> Chickering (1995) gives the complete algorithm for finding all compelled edges.

### Properties of CPDAGs

> [!theorem] Properties of a CPDAG (Andersson, Madigan & Perlman, 1997)
> A graph $\mathcal{C}$ is the CPDAG of some DAG if and only if:
> 1. **Chain components**: the undirected part of $\mathcal{C}$ (ignoring directed edges)
>    decomposes into connected subgraphs, each of which is a clique (complete subgraph).
> 2. **Acyclicity**: $\mathcal{C}$ contains no directed cycles.
> 3. **V-structure consistency**: every directed edge $X \to Y$ with $Y$ having an additional
>    directed edge $Y \to Z$ forces $X$ not adjacent to $Z$ (no "shielded" v-structures are
>    ever created by directed edges in $\mathcal{C}$).
^thm-cpdag-characterization

### Identifiability limits

> [!note] What observational data can and cannot identify
> From i.i.d. observational data:
> - **Identified**: the skeleton and all v-structures → the CPDAG.
> - **Not identified**: the orientation of reversible edges. There may be many DAGs compatible
>   with the data.
>
> Additional information that can break equivalence:
> - **Interventional data**: hard interventions $\mathrm{do}(X=x)$ can identify the direction
>   of some reversible edges (Yang et al., 2018).
> - **Non-Gaussianity**: the LiNGAM model (Shimizu et al., 2006) identifies the full DAG from
>   observational data when noise is non-Gaussian.
> - **Functional form assumptions**: e.g. additive noise models (ANMs) achieve full DAG
>   identification under certain conditions.

## Examples

> [!example] Example: CPDAGs from the PC algorithm
> **Input**: 4-variable DAG $G$: $X_1 \to X_2 \to X_4 \leftarrow X_3 \to X_2$
> (with v-structure $X_1 \to X_2 \leftarrow X_3$ unshielded because $X_1 \not\sim X_3$,
> and $X_2 \to X_4 \leftarrow X_3$ unshielded because $X_2 \not\sim X_3$... wait, $X_3 \to X_2$
> means $X_2$ is adjacent to $X_3$, so the v-structure at $X_4$ is unshielded but the one at
> $X_2$ is shielded by the $X_3 - X_2$ adjacency).
>
> **Result**: PC outputs a CPDAG that has directed edges wherever the true DAG's edges are
> compelled, and undirected edges for the reversible ones. A practitioner sees the CPDAG and
> knows: directed edges are certain causal claims; undirected edges require intervention or
> domain knowledge to orient.

## Connections

- **PC algorithm** (→ [[PC Algorithm]]): the output of the skeleton + v-structure + orientation
  phase is a CPDAG. The PC algorithm works *on* an undirected skeleton and produces a CPDAG.
- **GES** (→ [[Greedy Equivalence Search]]): GES explicitly searches over *CPDAG space* rather
  than DAG space. Its insert/delete operators move between CPDAGs (equivalence classes), which
  is more efficient than exploring individual DAGs.
- **NOTEARS** (→ [[NOTEARS - Overview]]): NOTEARS outputs a single DAG (a weighted adjacency
  matrix), not a CPDAG. It does not explicitly operate on equivalence classes. The output DAG
  may not be in the same MEC as the true DAG even when the skeleton is correct.
- **LiNGAM**: avoids the MEC ambiguity by assuming non-Gaussian noise, permitting full DAG
  identification. See [[DAG Structure Learning Problem]] for the landscape of methods.

## See Also
- [[PC Algorithm]] — uses CPDAGs as output; skeleton + v-structures → CPDAG
- [[Greedy Equivalence Search]] — searches equivalence-class space; operates on CPDAGs directly
- [[DAG Structure Learning Problem]] — problem setup and the landscape of methods
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Causal Discovery Methods Comparison]] — how PC, GES, and NOTEARS differ in what they output
