---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Verma & Pearl (1990), UAI; Frydenberg (1990), Scand. J. Statistics 17:333–353; Meek (1995), UAI [PDFs not downloaded — network restricted]"
source_location: "Verma & Pearl (1990) §2–3; Frydenberg (1990) §2; Meek (1995) orientation rules"
date_ingested: 2026-11-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Markov equivalence class"
  - "essential graph"
  - "CPDAG"
  - "complete partial DAG"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independence
> (CI) relations. Markov equivalence is characterized entirely by two graph-structural properties:
> same **skeleton** (undirected edge set) and same **v-structures** (immoralities $X \to Z \leftarrow Y$
> with $X \not\!\!-\!\! Y$). Every Markov equivalence class has a unique canonical representative called
> the **CPDAG** (Complete Partial DAG) or **essential graph**, in which directed edges are those with
> the same orientation in *every* DAG in the class, and undirected edges admit both orientations in
> some DAG in the class. CPDAGs are the output of both the [[PC Algorithm]] and
> [[GES - Greedy Equivalence Search]].

## Overview

A central difficulty in causal discovery is **identifiability**: given only observational data, one
can at most identify the **Markov equivalence class** (MEC) of the true data-generating DAG, not
the DAG itself. Intervention data or additional assumptions (e.g., linear non-Gaussian noise, as
in LiNGAM) are required to identify a unique DAG. The CPDAG is the standard representation of
this identification boundary.

Understanding MECs is prerequisite to understanding any causal discovery algorithm:
- **Constraint-based** methods (PC) test for CI relations and recover the skeleton + v-structures
  directly, then orient the remaining edges as far as possible.
- **Score-based** methods (GES) search over *CPDAGs* directly, using operators that move between
  Markov equivalence classes.
- **Continuous optimization** methods ([[NOTEARS - Overview|NOTEARS]]) work in the DAG space
  directly but are compared against algorithms on CPDAG metrics (SHD over equivalence classes).

## Main Content

### Conditional independence and the Markov condition

> [!definition] Definition: Markov condition for a DAG
> A probability distribution $P$ over $(X_1, \ldots, X_d)$ satisfies the **Markov condition** for
> DAG $G = (V, E)$ if every node $X_i$ is conditionally independent of its non-descendants given
> its parents $\text{Pa}(X_i)$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i).$$
> Equivalently, by the global Markov condition, $P$ satisfies all CI relations implied by
> **d-separation** in $G$.
^def-markov-condition

> [!definition] Definition: Markov equivalence
> Two DAGs $G_1$ and $G_2$ on the same vertex set are **Markov equivalent** if they entail
> exactly the same set of CI relations; formally, if every distribution satisfying the Markov
> condition for $G_1$ also satisfies it for $G_2$ and vice versa. Equivalently:
> $$G_1 \sim_M G_2 \iff \forall\, (X,Y,Z): G_1 \text{ d-sep } X \perp\!\!\!\perp Y \mid Z \iff G_2 \text{ d-sep } X \perp\!\!\!\perp Y \mid Z.$$
^def-markov-equiv

### The Verma–Pearl characterization

The fundamental characterization of Markov equivalence reduces it to two syntactic graph properties.

> [!theorem] Theorem (Verma & Pearl 1990; Frydenberg 1990): Characterization of Markov equivalence
> Two DAGs $G_1$ and $G_2$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (the same set of adjacent pairs, ignoring edge directions), and
> 2. The same set of **v-structures** (immoralities): triples $(X, Z, Y)$ with $X \to Z \leftarrow Y$,
>    $X \not\!\!-\!\! Y$, in both $G_1$ and $G_2$.
>
> **Significance:** Observational data can distinguish at most the skeleton and v-structures.
> Any remaining edge without a unique orientation across the MEC is not identifiable from
> observations alone.
^thm-verma-pearl

V-structures encode the "collider" pattern. Crucially, two DAGs can have the same skeleton and
differ only in the direction of non-collider edges — those orientations are unidentifiable.

**Example.** On three nodes $\{X, Y, Z\}$ with skeleton $X - Y - Z$ ($X$ and $Z$ non-adjacent):
- $X \to Y \to Z$, $X \leftarrow Y \to Z$, and $X \leftarrow Y \leftarrow Z$ are **all Markov
  equivalent** (no v-structure at $Y$; all encode $X \perp\!\!\!\perp Z \mid Y$).
- $X \to Y \leftarrow Z$ is **not** Markov equivalent to the above (v-structure at $Y$;
  encodes $X \not\!\!\perp\!\!\!\perp Z \mid Y$ but $X \perp\!\!\!\perp Z$).

### The CPDAG (Essential Graph)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (Complete Partial DAG) of a Markov equivalence class $[G]$ is the unique
> mixed graph $\mathcal{E}$ with the same vertices as $G$ such that:
> - **Directed edge** $X \to Y$ in $\mathcal{E}$ $\iff$ $X \to Y$ in *every* DAG in $[G]$
>   (the edge is **compelled**).
> - **Undirected edge** $X - Y$ in $\mathcal{E}$ $\iff$ $X \to Y$ in *some* but not all DAGs in $[G]$
>   (the edge is **reversible**).
>
> Every directed edge in $\mathcal{E}$ either participates in a v-structure or is compelled by
> Meek's orientation rules (see below). The skeleton of $\mathcal{E}$ equals the skeleton of $G$.
^def-cpdag

The CPDAG is *complete* in that it uses all orientation information recoverable from observational
data under faithfulness. It is *partial* in that some edges remain undirected.

### Meek's orientation rules

After orienting v-structures in a skeleton, four deterministic rules (Meek 1995) propagate
orientations without creating new v-structures or directed cycles. Applied to exhaustion, they
produce the CPDAG.

> [!definition] Definition: Meek's Four Orientation Rules (Meek 1995)
> Given a partially oriented graph, apply the following until no more orientations are possible:
>
> **R1 (Away-from-v-structure):** If $a \to b \!-\! c$ and $a \not\!\!-\!\! c$, then orient $b \to c$.
> *(Orienting $c \to b$ would create a new v-structure at $b$, contradicting the CI relations.)*
>
> **R2 (Away-from-cycle):** If $a \!-\! b$ and there exists $a \to c \to b$, orient $a \to b$.
> *(Orienting $b \to a$ would create a directed cycle $a \to c \to b \to a$.)*
>
> **R3 (Discriminating path rule):** If $a \!-\! b$, $a \!-\! c_1$, $a \!-\! c_2$, $c_1 \to b$,
> $c_2 \to b$, and $c_1 \not\!\!-\!\! c_2$, orient $a \to b$.
>
> **R4 (Zaher's rule / double-triangle):** If $a \!-\! b \to c$ and $a \to c$,
> $a \!-\! d \to c$, $b \not\!\!-\!\! d$, then orient $a \to b$.
>
> **Completeness:** These four rules are complete — exhaustive application yields exactly the
> CPDAG of the equivalence class (no additional orientation information can be inferred).
^def-meek-rules

### Faithfulness

> [!definition] Definition: Faithfulness
> A distribution $P$ is **faithful** to DAG $G$ if every CI relation in $P$ is *entailed* by
> d-separation in $G$. That is, $X \perp\!\!\!\perp Y \mid Z$ in $P$ $\implies$ $X$ and $Y$ are
> d-separated by $Z$ in $G$. Equivalently, no CI relations arise from exact cancellation of
> opposite-sign paths.
>
> **Role:** Faithfulness is the key identifiability assumption used by PC and GES. Without it,
> CI tests may remove edges that should exist, leading to incorrect skeleton recovery.
^def-faithfulness

Violations of faithfulness are measure-zero in the parameter space (for linear SEMs with continuous
noise), so faithfulness holds generically but can fail in carefully constructed models or in
finite samples.

## Examples

> [!example] Example: Markov equivalence on 4 nodes
> Consider $G$: $X_1 \to X_2 \to X_4$ and $X_1 \to X_3 \to X_4$.
> The Markov equivalent DAGs include $G'$: $X_1 \leftarrow X_2 \to X_4$ and $X_1 \to X_3 \to X_4$
> provided the v-structures remain the same. The CPDAG has skeleton $1-2-4$, $1-3-4$ with
> the edges $X_1 \to X_2$, $X_1 \to X_3$ directed (appearing in every equivalent DAG) and
> $X_2 \to X_4$, $X_3 \to X_4$ directed if they form v-structures, otherwise undirected.

## Connections

- **PC algorithm**: recovers skeleton via CI tests → orients v-structures → applies Meek's rules → CPDAG. See [[PC Algorithm]].
- **GES**: searches over the space of CPDAGs using Insert/Delete operators. See [[GES - Greedy Equivalence Search]].
- **NOTEARS**: works in DAG space; results benchmarked on CPDAG metrics (SHD/FDR against
  equivalence class). See [[NOTEARS Experiments]].
- **LiNGAM** and functional causal models: by assuming non-Gaussian noise or specific functional
  form, the DAG (not just the MEC) can be identified — going beyond what CPDAGs represent.
- **Bayesian model averaging**: rather than a point-estimate CPDAG, Bayesian methods place a
  posterior over DAGs or MECs. See [[Directed Acyclic Graphs]] for the causal inference perspective.

## See Also
- [[PC Algorithm]] — recovers CPDAGs via constraint-based CI testing
- [[GES - Greedy Equivalence Search]] — recovers CPDAGs via score-based CPDAG search
- [[DAG Structure Learning Problem]] — the broader problem setting
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns in DAGs
