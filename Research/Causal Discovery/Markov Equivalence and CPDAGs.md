---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-ref.md]]"
source_location: "Ch. 3–4; Verma & Pearl (1991); Meek (1995)"
date_ingested: 2026-11-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
aliases:
  - "CPDAG"
  - "essential graph"
  - "Markov equivalence class"
  - "Verma and Pearl equivalence"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs over the same variables are **Markov equivalent** if and only if they entail exactly
> the same set of conditional independence relations — equivalently, iff they share the same
> **skeleton** (undirected edge set) and the same **v-structures** (unshielded colliders). The
> set of all DAGs Markov equivalent to a given DAG forms a **Markov equivalence class**,
> uniquely represented by a **CPDAG** (Complete Partial DAG, also called an *essential graph*):
> a mixed graph in which directed edges are those with the same orientation in every member
> of the class, and undirected edges are those whose orientation varies across members.
> Both the [[PC Algorithm]] and the [[Greedy Equivalence Search]] return a CPDAG — the best
> identifiable structure from observational data under the faithfulness assumption.

## Overview

Causal discovery from observational data faces a fundamental identifiability limit: without
interventions, we can at best recover a DAG's **Markov equivalence class**, not the unique
DAG. Two graphs in the same class entail the same joint distribution and are therefore
indistinguishable by any amount of observational data.

The CPDAG is the canonical compact representation of a Markov equivalence class. Because
all DAGs in the class agree on some edge orientations and disagree on others, the CPDAG uses:

- **Directed edges** $X \to Y$ for orientations fixed across the class  
- **Undirected edges** $X - Y$ for orientations that vary

Understanding CPDAGs is essential before reading [[PC Algorithm]] or [[Greedy Equivalence Search]],
since both algorithms output a CPDAG and both search over CPDAG space.

## Main Content

### Markov condition and faithfulness

> [!definition] Definition: Markov condition (global form)
> A DAG $\mathcal{G}$ over variables $\mathbf{V}$ satisfies the **Markov condition** with
> respect to distribution $P$ if every variable $X_j$ is independent of its non-descendants
> given its parents:
> $$X_j \perp\!\!\!\perp \mathrm{NonDesc}(X_j) \mid \mathrm{Pa}(X_j).$$
> Equivalently, $P$ **Markov factorizes** over $\mathcal{G}$:
> $$P(\mathbf{V}) = \prod_{j=1}^{d} P(X_j \mid \mathrm{Pa}(X_j)).$$
^def-markov

The Markov condition says "the graph encodes enough independence." The *faithfulness* assumption
says the graph encodes *only* the independencies that are truly there:

> [!definition] Definition: Faithfulness assumption
> Distribution $P$ is **faithful** to DAG $\mathcal{G}$ if every conditional independence
> $X \perp\!\!\!\perp Y \mid \mathbf{Z}$ in $P$ is also entailed by d-separation in $\mathcal{G}$.
> Formally, $X \perp\!\!\!\perp Y \mid \mathbf{Z}$ in $P$ $\Rightarrow$ $(X \perp_d Y \mid \mathbf{Z})$
> in $\mathcal{G}$.
^def-faithfulness

Faithfulness rules out "accidental" cancellations where path coefficients conspire to produce
independence not implied by graph structure. It fails on measure-zero parameter sets (Meek 1995),
so it holds generically but can be violated for specific parameter values.

### V-structures (unshielded colliders)

> [!definition] Definition: V-structure (unshielded collider)
> A **v-structure** in a DAG is a triple $(X, Z, Y)$ such that:
> 1. $X \to Z \leftarrow Y$ (Z is a *collider* on the path $X - Z - Y$)
> 2. $X$ and $Y$ are **not adjacent** (the collider is *unshielded*)
>
> V-structures are the only reason two DAGs can share a skeleton but be non-equivalent:
> changing the orientation of a *covered* edge (both endpoints have the same parent set
> except for each other) stays in the class; changing an orientation in a v-structure
> always leaves the class.
^def-vstructure

### Markov equivalence characterization

> [!theorem] Theorem: Verma & Pearl (1991); Frydenberg (1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** if and only if they
> have:
> 1. The same **skeleton** (the same adjacencies, ignoring edge directions), and
> 2. The same **v-structures** (the same set of unshielded colliders).
^thm-markov-equiv

This characterization is the theoretical foundation for both constraint-based discovery
(the [[PC Algorithm]] recovers the skeleton and v-structures from CI tests) and score-based
discovery ([[Greedy Equivalence Search]] searches over equivalence classes using this representation).

### CPDAG definition and properties

> [!definition] Definition: CPDAG (Complete Partial DAG)
> The **CPDAG** (also called the *essential graph* or *pattern*) of a Markov equivalence class
> $[\mathcal{G}]$ is the unique mixed graph $\mathcal{C}$ on the same vertex set such that:
> - $X \to Y$ is a **directed** edge in $\mathcal{C}$ iff $X \to Y$ in every DAG in $[\mathcal{G}]$
> - $X - Y$ is an **undirected** edge in $\mathcal{C}$ iff $X \to Y$ in some but not all members of $[\mathcal{G}]$
> - $X$ and $Y$ are non-adjacent in $\mathcal{C}$ iff they are non-adjacent in every $\mathcal{G} \in [\mathcal{G}]$
>
> CPDAGs are **semi-directed graphs**: their directed part is acyclic, and they are closed
> under a set of *completed* orientation rules (Meek 1995 rules R1–R4).
^def-cpdag

### Meek's orientation rules

After orienting v-structures, the following four rules deterministically orient further edges
without introducing new v-structures or directed cycles. They are applied repeatedly until
no more orientations are possible.

> [!theorem] Theorem: Meek's Rules (Meek 1995) — completing a CPDAG from skeleton + v-structures
> Let $\mathcal{H}$ be a skeleton with v-structures already oriented. Apply repeatedly:
>
> **R1** *(avoid new v-structure)*: If $A \to B - C$ and $A$ and $C$ are non-adjacent,
> orient $B - C$ as $B \to C$.
>
> **R2** *(avoid directed cycle)*: If $A \to B \to C$ and $A - C$, orient $A \to C$.
>
> **R3** *(avoid new v-structure)*: If $A - B \to C$, $A - D \to C$, $A - C$, and $B$ and $D$
> are non-adjacent, orient $A \to C$.
>
> **R4** *(avoid new v-structure)*: If $A - B \to C \to D$, $A - D$, and $A$ and $C$ are
> non-adjacent, orient $A \to D$.
>
> The resulting graph is the unique CPDAG of the equivalence class.
^thm-meek-rules

### Covered edge reversals

> [!definition] Definition: Covered edge
> An edge $X \to Y$ in a DAG is **covered** if $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$
> (X and Y have the same parent set except that X is a parent of Y but not vice versa).
> Reversing a covered edge — turning $X \to Y$ into $X \leftarrow Y$ — stays within the
> same Markov equivalence class.
^def-covered-edge

Covered edge reversals are the atomic moves [[Greedy Equivalence Search]] uses to traverse
the equivalence-class space. Chickering (2002) proves the **Meek Conjecture**: the graph of
covered-edge reversals between equivalence classes is connected — any two DAGs can be
connected by a sequence of covered-edge reversals (staying within or moving between classes).

## Examples

> [!example] Example: A three-variable equivalence class
> Consider three variables $\{X, Y, Z\}$. The two DAGs
> $X \to Y \to Z$ and $X \leftarrow Y \to Z$
> are **not** Markov equivalent: they have the same skeleton ($X-Y-Z$) but the first has no
> v-structure while the second has $X \leftarrow Y \to Z$ — a *source* at $Y$, not a collider.
>
> The two DAGs $X \to Y \to Z$ and $X \to Y \leftarrow Z$ are **also** not equivalent:
> the second has v-structure $X \to Y \leftarrow Z$.
>
> However, $X \to Y \to Z$ and $X \leftarrow Y \leftarrow Z$ **are** Markov equivalent:
> same skeleton $X-Y-Z$, same v-structures (none). Their CPDAG is $X - Y - Z$ with no
> directed edges, since neither orientation of either edge is forced.
>
> And $X \to Y \leftarrow Z$ alone forms its own equivalence class (the v-structure
> $X \to Y \leftarrow Z$ cannot be reversed). Its CPDAG is $X \to Y \leftarrow Z$.
^ex-three-var

> [!example] Example: Counting equivalence classes
> With $d=3$ variables there are 25 DAGs but only 11 distinct Markov equivalence classes.
> As $d$ grows, the number of classes grows roughly as $2^{d^2/2}$, far less than the
> $d! \cdot 2^{d(d-1)/2}$ possible DAGs — this is why searching in CPDAG space (as GES does)
> can be more efficient than searching over DAGs.

## Connections

- **For PC algorithm**: the skeleton + v-structure recovery directly produces the CPDAG via
  Meek's rules — see [[PC Algorithm]].
- **For GES**: GES searches directly over CPDAG space using covered-edge reversals and
  edge-insertion/deletion operators — see [[Greedy Equivalence Search]].
- **For NOTEARS**: NOTEARS returns a DAG (not a CPDAG) since it recovers a full edge-weight
  matrix; the CPDAG of that DAG can be computed post-hoc — see [[NOTEARS Experiments]] (Sachs data).
- **Identifiability**: under faithfulness, the CPDAG is the **maximum identifiable structure**
  from observational data. To identify a unique DAG, interventional data or non-Gaussianity
  is needed (LiNGAM, ICA-based methods).
- **FCI extension**: with latent confounders (violating causal sufficiency), the equivalence class
  expands to a PAG (Partial Ancestral Graph); the FCI algorithm of Spirtes et al. (2000) handles this.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that recovers the CPDAG from CI tests
- [[Greedy Equivalence Search]] — score-based algorithm that searches CPDAG space
- [[DAG Structure Learning Problem]] — problem setup: SEM, scores, NP-hardness
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns in DAGs
