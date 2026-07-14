---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 3; Verma & Pearl (1990) UAI; Chickering (2002) JMLR §3; Andersson, Madigan & Perlman (1997) Ann. Stat."
date_ingested: 2026-07-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
aliases:
  - "Markov equivalence class"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "MEC"
  - "compelled edge"
  - "reversible edge"
  - "covered edge reversal"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** — entailing identical conditional independences for any
> faithful distribution — if and only if they share the same **skeleton** and the same
> **v-structures** (Verma & Pearl 1990). Each Markov equivalence class (MEC) is uniquely
> represented by a **Completed Partially Directed Acyclic Graph (CPDAG)**: directed edges
> appear in every member of the class, undirected edges are orientation-reversible without
> changing the class. CPDAGs are the output of the [[PC Algorithm]] and the search space of
> [[Greedy Equivalence Search (GES)]] — understanding them is prerequisite to both.

## Overview

Observational data cannot distinguish between all causal DAGs: any reparameterisation that
preserves the joint distribution is invisible without intervention. The set of DAGs that are
distribution-equivalent forms a **Markov equivalence class (MEC)**. Rather than searching
over individual DAGs (redundant: the same equivalence class may contain exponentially many
DAGs), structure-learning algorithms search over equivalence classes and report a CPDAG.

This note covers three nested questions:
1. *When* are two DAGs Markov equivalent? (Verma–Pearl characterisation)
2. *How* is a MEC represented? (CPDAG — directed vs. undirected edges)
3. *How* do you move between DAGs in the same MEC? (covered edge reversals)

## Main Content

### The Markov Equivalence Characterisation

> [!theorem] Theorem: Verma–Pearl characterisation of Markov equivalence (Verma & Pearl 1990)
> Two DAGs $G_1$ and $G_2$ over the same variables are **Markov equivalent** (for every
> faithful distribution $P$, $G_1$ and $G_2$ entail the same set of conditional independences)
> **if and only if** they have:
> 1. the same **skeleton** (same set of undirected edges $\{i,j\}$ ignoring direction), AND
> 2. the same **v-structures** (unshielded colliders): every triple $(X_i, X_j, X_k)$ where
>    $i \sim j$, $j \sim k$, and $i \not\sim k$ that is a collider $X_i \to X_j \leftarrow X_k$
>    in $G_1$ is also a collider in $G_2$, and vice versa.
>
> **Proof sketch.** The "if" direction: same skeleton + same v-structures implies the same
> d-separation statements by the definition of d-separation (blocking/active paths depend
> exactly on which nodes are colliders on which paths). The "only if" direction: a difference
> in skeleton or v-structure would produce a difference in some d-separation statement,
> contradicting equivalence.
^thm-verma-pearl

> [!definition] Definition: V-structure (unshielded collider)
> An ordered triple $(X_i, X_j, X_k)$ forms a **v-structure** in DAG $G$ if:
> - $X_i \to X_j \leftarrow X_k$ in $G$ (both edges point *into* $X_j$, making it a collider), AND
> - $X_i$ and $X_k$ are **not adjacent** in $G$ (no edge between them — "unshielded").
>
> The distinguishing property of v-structures for equivalence: conditioning on $X_j$ *activates*
> the path $X_i - X_j - X_k$, whereas conditioning on the *middle node* of a chain or fork
> *blocks* it. This asymmetry is what makes v-structures identifiable from CI tests.
^def-v-structure

> [!example] Example: Two Markov-equivalent DAGs vs. a non-equivalent one
> **Setup.** Three variables $X_1, X_2, X_3$.
>
> - $G_1$: $X_1 \to X_2 \to X_3$ (chain)
> - $G_2$: $X_1 \leftarrow X_2 \to X_3$ (fork at $X_2$)
> - $G_3$: $X_1 \to X_2 \leftarrow X_3$ (v-structure at $X_2$)
>
> **Equivalence.**
> $G_1$ and $G_2$ are Markov equivalent: both have skeleton $1-2-3$ (no edge $1-3$) and
> *no* v-structure (in $G_1$ the collider check requires $X_1 \not\sim X_3$, which holds, but
> $X_2$ is not a collider in $G_1$; in $G_2$ ditto). So $G_1 \equiv G_2$.
>
> $G_3$ has the same skeleton but *does* have a v-structure ($X_1 \to X_2 \leftarrow X_3$),
> so $G_3 \not\equiv G_1, G_2$.
>
> **Empirical consequence.** $G_1$ and $G_2$ both predict $X_1 \perp\!\!\!\perp X_3 \mid X_2$
> (conditioning on the middle node blocks the path). $G_3$ predicts $X_1 \perp\!\!\!\perp X_3$
> (collider at $X_2$ blocks unconditionally) but $X_1 \not\!\!\perp\!\!\!\perp X_3 \mid X_2$
> (conditioning on $X_2$ opens the path). One CI test distinguishes all three: test whether
> $X_1 \perp X_3 \mid \emptyset$ and $X_1 \perp X_3 \mid X_2$.

### The CPDAG Representation

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** $H$ of a Markov equivalence class $[G]$ is the unique graph over the same
> vertices such that:
> - There is an **undirected edge** $X_i - X_j$ in $H$ iff the edge is **reversible**: there
>   exists at least one DAG $G' \in [G]$ with $X_i \to X_j$ and at least one with $X_i \leftarrow X_j$.
> - There is a **directed edge** $X_i \to X_j$ in $H$ iff the edge is **compelled**: every DAG
>   $G' \in [G]$ has $X_i \to X_j$.
>
> Every MEC has a unique CPDAG (Andersson, Madigan & Perlman 1997), and every valid CPDAG
> represents exactly one MEC.
^def-cpdag

> [!theorem] Theorem: Compelled edge characterisation (Chickering 2002, Lemma 5)
> An edge $X_i - X_j$ in the CPDAG skeleton is **compelled** (directed) if and only if it
> participates in at least one v-structure as either the "left wing" or "right wing":
> there exists $X_k$ such that $X_i \to X_j \leftarrow X_k$ is a v-structure in every
> member of the MEC.
^thm-compelled

> [!note] Why this matters for algorithms
> The CPDAG immediately tells a practitioner which edges are **causally identified** from
> observational data (directed, compelled) vs. **undecidable** without intervention (undirected).
> If a policy question concerns a compelled edge $X_i \to X_j$, it can be answered from
> observational data. If it concerns a reversible edge, an experiment is needed.

### Covered Edges and Moving Within a MEC

> [!definition] Definition: Covered edge
> A directed edge $X_i \to X_j$ in a DAG $G$ is **covered** if
> $$\mathrm{Pa}_G(X_i) = \mathrm{Pa}_G(X_j) \setminus \{X_i\}.$$
> That is, $X_j$ has exactly the parents of $X_i$ plus $X_i$ itself — so flipping the edge
> direction does not change any v-structure.
^def-covered-edge

> [!theorem] Theorem: Covered edge reversals characterise MEC membership (Meek 1995; Chickering 2002)
> Let $G_1$ and $G_2$ be DAGs. The following are equivalent:
> 1. $G_1$ and $G_2$ are Markov equivalent ($G_1 \equiv G_2$).
> 2. $G_2$ can be obtained from $G_1$ by a sequence of **covered edge reversals** — each step
>    reverses a covered edge $X_i \to X_j$ to $X_i \leftarrow X_j$, and after each reversal
>    the graph remains a DAG.
>
> **Significance.** This is the "Meek Conjecture," conjectured in Meek (1995) and proved as a
> central lemma in Chickering (2002). It enables GES's proof of optimality: the score-based
> forward/backward search navigates between MECs by applying covered edge reversals, and the
> consistency theorem uses this path structure.
^thm-covered-reversals

## Computing the CPDAG from a DAG

Given any DAG $G$, compute its CPDAG $H$ via the **DAG-to-CPDAG algorithm**:
1. Find all v-structures in $G$; these edges become compelled (directed in $H$).
2. Apply Meek's four orientation rules (R1–R4, see [[PC Algorithm]]) to propagate directed
   edges; any edge not forced into a direction by the rules becomes undirected.
3. The resulting partially directed graph is the CPDAG.

In `pcalg` R: `dag2cpdag(dag)`. In `causal-learn` Python: `dag2pdag(dag)`.

## Examples

> [!example] Example: CPDAG for a 4-variable DAG
> **DAG:** $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to X_4$, $X_3 \to X_4$. (Diamond without $X_2 - X_3$ edge)
>
> **V-structures:** The triple $(X_2, X_4, X_3)$: both $X_2 \to X_4$ and $X_3 \to X_4$, and
> $X_2 \not\sim X_3$. This is a v-structure.
>
> **CPDAG construction:**
> - Compelled by v-structure: $X_2 \to X_4$ and $X_3 \to X_4$ are compelled.
> - Apply R1: $X_1 \to X_2 - X_4$ would create new v-structure $X_1 \to X_2 \leftarrow X_4$;
>   orient $X_2 \to X_4$ (already directed). Similarly $X_1 \to X_3 \to X_4$.
> - After rules: $X_1 - X_2$ and $X_1 - X_3$ remain undirected (reversible);
>   $X_2 \to X_4$, $X_3 \to X_4$ are directed.
>
> **Interpretation:** Observational data can identify that $X_4$ has two parents but cannot
> determine which of $X_1 \to X_2$ or $X_1 \leftarrow X_2$ is correct.

## Connections

- **Why equivalence matters for identification:** Under faithfulness, observational data can
  at best identify the CPDAG — the full DAG is not identifiable from observational data alone
  without additional assumptions (linear non-Gaussian: LiNGAM; equal noise variances: ANM).
  See [[Directed Acyclic Graphs]] for DAG semantics and the back-door criterion.
- **PC algorithm output:** The skeleton and v-structure learning phases directly target the
  Verma–Pearl characterisation — [[PC Algorithm]] produces a CPDAG by detecting exactly the
  structure that defines the MEC.
- **GES search space:** [[Greedy Equivalence Search (GES)]] performs greedy search over
  CPDAGs rather than DAGs, using covered edge reversals to navigate between MECs.
- **Interventional identifiability:** With known interventions, the identifiable region expands
  beyond the CPDAG — but this requires interventional data.

## See Also
- [[PC Algorithm]] — uses Verma–Pearl characterisation to output a CPDAG
- [[Greedy Equivalence Search (GES)]] — searches over equivalence classes
- [[DAG Structure Learning Problem]] — landscape of methods; CPDAG as output target
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Constraint-Based Causal Discovery]] — the CI paradigm underlying PC
