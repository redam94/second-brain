---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-Kalisch-Buehlmann2007-PC.md]]"
source_location: "Spirtes et al. (2000) Ch. 3; Chickering (2002) §2–3"
date_ingested: 2026-09-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "CPDAG"
  - "equivalence class"
  - "Markov equivalence class"
  - "completed partially directed acyclic graph"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same set of conditional
> independences — equivalently, they have the same **skeleton** (undirected edge set) and
> the same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$). The set of all
> Markov-equivalent DAGs is represented canonically by a **CPDAG** (Completed Partially
> Directed Acyclic Graph), in which some edges are directed (shared direction across the
> whole class) and some are undirected (orientation is not identifiable from observational
> data alone). Both the PC and GES algorithms target the CPDAG rather than a specific DAG.

## Overview

From observational data alone, under the Causal Markov Assumption and Faithfulness, one
can identify the **Markov equivalence class** of the true causal DAG — but not the DAG
itself. Two DAGs that encode identical conditional independence structures are
observationally indistinguishable without interventional data or additional assumptions
(functional form, noise, etc.).

This is the fundamental identifiability ceiling for constraint-based and score-based causal
discovery, and it motivates the CPDAG as the correct output object.

## Main Content

### The Causal Markov Assumption

> [!definition] Definition: Causal Markov Assumption
> A DAG $\mathcal{G}$ over variables $\mathbf{V}$ and a distribution $P$ satisfy the
> **Causal Markov Condition** if every variable $V_i \in \mathbf{V}$ is independent of
> its non-descendants given its parents in $\mathcal{G}$:
> $$V_i \perp\!\!\!\perp \text{NonDesc}(V_i) \mid \text{Pa}(V_i)$$

This implies that the joint distribution factorizes according to the DAG:
$$P(\mathbf{V}) = \prod_{i} P(V_i \mid \text{Pa}(V_i))$$

### The Faithfulness Assumption

> [!definition] Definition: Faithfulness (Stability)
> A distribution $P$ is **faithful** to a DAG $\mathcal{G}$ if every conditional
> independence present in $P$ is entailed by d-separation in $\mathcal{G}$. Equivalently:
> no conditional independence holds in $P$ unless it corresponds to a d-separation
> statement in $\mathcal{G}$.

Faithfulness rules out "accidental" cancellations of path effects. It fails when path
coefficients cancel exactly — a measure-zero event for continuous parameters (generic
faithfulness). For discrete models faithfulness can fail on a positive-measure set.

### Markov Equivalence

> [!theorem] Theorem: Verma-Pearl Characterization of Markov Equivalence
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are Markov equivalent — they encode the
> same d-separation relations — **if and only if** they have:
> 1. The same **skeleton** (the same pairs of adjacent vertices, ignoring edge direction), and
> 2. The same **v-structures**: for every triple $X, Z, Y$ with $X \to Z \leftarrow Y$ in
>    $\mathcal{G}_1$ and $X, Y$ non-adjacent, the same pattern holds in $\mathcal{G}_2$.
>
> (Verma & Pearl, 1990; Frydenberg, 1990)
^thm-markov-equiv

**Consequence:** To identify the causal structure, one must identify (a) which pairs are
adjacent, and (b) which triples form unshielded colliders. Everything else is
underdetermined.

### V-structures (Unshielded Colliders)

> [!definition] Definition: V-structure (Unshielded Collider)
> A triple $(X, Z, Y)$ forms a **v-structure** (also: unshielded collider, immorality)
> in DAG $\mathcal{G}$ if:
> - $X \to Z \leftarrow Y$ (Z is a common effect), and
> - $X$ and $Y$ are **not** adjacent in $\mathcal{G}$.
>
> The "unshielded" qualifier distinguishes this from shielded colliders $(X \to Z \leftarrow Y$
> with $X - Y$ adjacent), which are not identifiable.
^def-vstructure

V-structures are identifiable because $X \perp\!\!\!\perp Y \mid \emptyset$ but
$X \not\perp\!\!\!\perp Y \mid Z$ (conditioning on the collider opens the path).
The separator set $\text{Sep}(X,Y)$ — the set $S$ such that $X \perp\!\!\!\perp Y \mid S$
— does not contain $Z$ for a v-structure.

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** (also called the **essential graph**) of a Markov equivalence class is
> the unique mixed graph $\mathcal{C}$ such that:
> 1. $\mathcal{C}$ has the same skeleton as every DAG in the class.
> 2. An edge $X \to Y$ is **directed** in $\mathcal{C}$ iff it has the same direction
>    in **every** DAG in the equivalence class (it is **compelled**).
> 3. An edge appears **undirected** ($X - Y$) in $\mathcal{C}$ iff it is **reversible** —
>    there exist equivalent DAGs with both $X \to Y$ and $X \leftarrow Y$.
>
> (Andersson, Madigan & Perlman, 1997)
^def-cpdag

**How to construct a CPDAG from a DAG** (the **DAG-to-CPDAG** algorithm):
1. Find all v-structures; these edges are always compelled.
2. Apply the **Meek orientation rules** (R1–R4) to propagate directed edges.
3. Remaining edges are reversible — draw them undirected.

### Meek Orientation Rules

Given a skeleton with v-structures oriented, the following four rules orient additional
edges without creating new v-structures or cycles. They are **complete**: any edge not
oriented by these rules is reversible.

> [!definition] Meek Rules R1–R4
> **R1** (Away from collider): If $\alpha \to \beta - \gamma$ and $\alpha, \gamma$ not
> adjacent, then $\beta \to \gamma$.
>
> **R2** (Away from cycle): If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$, then
> $\alpha \to \gamma$.
>
> **R3** (Double-triangle): If $\alpha - \gamma$, $\alpha - \beta_1 \to \gamma$,
> $\alpha - \beta_2 \to \gamma$, and $\beta_1, \beta_2$ not adjacent, then $\alpha \to \gamma$.
>
> **R4** (Zeta-pattern): If $\alpha - \beta \to \gamma \to \delta$, $\alpha - \delta$,
> and $\alpha, \gamma$ not adjacent, then $\alpha \to \delta$.
>
> (Meek, 1995)
^def-meek-rules

## Examples

> [!example] Example: Three-Variable Equivalence Class
> Consider DAGs on $\{X, Z, Y\}$ with edges $X - Z - Y$ (a chain or fork).
>
> **Chain** $X \to Z \to Y$, **Fork** $X \leftarrow Z \to Y$, **Chain reversed**
> $X \leftarrow Z \leftarrow Y$ are all Markov equivalent: same skeleton, no v-structures.
>
> The CPDAG for all three is $X - Z - Y$ (all edges undirected).
>
> In contrast, **V-structure** $X \to Z \leftarrow Y$ is in its own equivalence class
> (same skeleton but different v-structure). Its CPDAG is $X \to Z \leftarrow Y$.

## Connections

- **PC algorithm** ([[PC Algorithm]]) outputs a CPDAG by (1) learning the skeleton via
  conditional independence tests, then (2) orienting v-structures, then (3) applying Meek rules.
- **GES** ([[GES Algorithm]]) searches *directly* over CPDAGs using Insert/Delete operators
  that maintain validity of the CPDAG throughout the search.
- **NOTEARS** ([[NOTEARS - Overview]]) outputs a specific DAG (via continuous optimization),
  not a CPDAG — it thus makes a specific choice within the equivalence class that may not
  be identifiable from observational data alone.
- **Interventional identifiability**: With interventional data (do-calculus, randomization),
  one can often uniquely identify the DAG within the equivalence class. See
  [[Directed Acyclic Graphs]] for the do-calculus framework.

## See Also
- [[PC Algorithm]] — uses Markov equivalence to define algorithm output
- [[GES Algorithm]] — searches over equivalence classes directly
- [[DAG Structure Learning Problem]] — the general problem context
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
- [[Spurious Association and Confounds]] — canonical DAG patterns (fork/pipe/collider)
