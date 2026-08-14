---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2016-selective-GES.pdf]]"
source_location: "§2, Related Work, p. 2"
date_ingested: 2026-08-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "PC"
  - "Spirtes Glymour Scheines"
  - "Peter Clark algorithm"
  - "constraint-based causal discovery"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines 1993) is the canonical **constraint-based** algorithm for causal structure learning. It recovers the true CPDAG of the data-generating DAG in the large-sample limit, under the **Causal Markov**, **Faithfulness**, and **Causal Sufficiency** assumptions. Working with conditional independence (CI) tests rather than a score, PC proceeds in three phases: (1) **skeleton identification** via a sequence of CI tests of increasing conditioning-set size, (2) **v-structure orientation** using the separating-set criterion, and (3) **edge orientation** via Meek's (1995) propagation rules. Its output is a CPDAG, placing PC in the same target space as [[GES - Greedy Equivalence Search]].

## Overview

The PC algorithm — named for its authors **P**eter Spirtes and **C**lark Glymour — introduced constraint-based causal discovery as a systematic discipline. Rather than optimising a score over DAG space, PC operates on the *independence model* of the distribution: it queries whether pairs of variables are conditionally independent given various conditioning sets, then reads off the graph structure from the pattern of (in)dependencies.

The key insight is that the skeleton and v-structures of the true DAG are **identifiable** from conditional independence relations (under faithfulness): the skeleton is given by which pairs of variables cannot be separated by any conditioning set, and v-structures are given by which colliders were *not* in the separating set of their non-adjacent parents.

PC is **sound and complete** under its assumptions: in the infinite-sample limit with an oracle CI test, it recovers exactly the CPDAG of the true DAG — nothing more, nothing less.

## Main Content

### Assumptions

> [!definition] Definition: Causal Markov Condition
> A DAG $\mathcal{G}$ over variables $V$ satisfies the **Causal Markov Condition** with respect to a joint distribution $P$ if every variable is conditionally independent of its non-descendants given its parents in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}^\mathcal{G}(X_i).$$
> Equivalently: $P$ **factors** according to the DAG (the distribution is Markov with respect to $\mathcal{G}$).
^def-causal-markov

> [!definition] Definition: Faithfulness
> A distribution $P$ is **faithful** to a DAG $\mathcal{G}$ if every conditional independence in $P$ is implied by $\mathcal{G}$ via d-separation. Equivalently: no conditional independence arises from cancellation of path coefficients — only from graph structure.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> A set of observed variables $V$ is **causally sufficient** if every common cause of any two variables in $V$ is also in $V$. This rules out hidden confounders. Without this assumption one must use extensions such as the **FCI algorithm** (Fast Causal Inference), which outputs a PAG (Partial Ancestral Graph) representing a larger equivalence class.
^def-causal-sufficiency

Faithfulness is a genericity condition: it holds for Lebesgue-almost-all parameterisations of a faithful DAG. It can fail in **deterministic systems** or when path coefficients cancel precisely — a known fragility of the method.

### Phase 1 — Skeleton Identification

The skeleton is the undirected graph $\mathcal{H}$ obtained from the DAG by ignoring edge directions. PC identifies it by **conditional independence testing with growing conditioning sets**.

**Algorithm (skeleton phase)**:
1. Start with the complete undirected graph $\mathcal{H}$ on all variables.
2. For $\ell = 0, 1, 2, \ldots$:
   - For each adjacent pair $(X, Y)$ in $\mathcal{H}$ and each subset $S \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|S| = \ell$:
     - If $X \perp\!\!\!\perp Y \mid S$: remove edge $X - Y$ from $\mathcal{H}$; record $\mathrm{Sep}(X, Y) \leftarrow S$.
3. Stop when no $\ell$-sized conditioning set exists for any adjacent pair.

> [!note] Key property
> Under faithfulness and causal sufficiency, the true separating set of $X$ and $Y$ (if any) is a subset of $\mathrm{Adj}(X)$ in the true skeleton. So the algorithm only tests subsets of the current adjacency set, not all subsets of $V$ — this is the source of PC's **polynomial-in-adjacency** complexity.

**Complexity**: $O(q^{k_{\max}})$ where $q$ is the number of CI tests and $k_{\max}$ is the maximum adjacency size. Worst-case exponential in $d$ but tractable on sparse graphs.

**PC-stable** (Colombo & Maathuis 2014): The original PC has a non-deterministic ordering dependence — the skeleton can vary with the order in which edges are tested. PC-stable eliminates this by separating the adjacency update from the conditioning-set search within each level $\ell$, producing a **consistent** skeleton regardless of variable ordering.

### Phase 2 — V-Structure Orientation

Given the skeleton $\mathcal{H}$ and separating sets $\{\mathrm{Sep}(X, Y)\}$, orient v-structures:

> [!definition] Definition: V-Structure Orientation Rule
> For a triple $X - Z - Y$ in $\mathcal{H}$ where $X$ and $Y$ are **not** adjacent:
> - Orient as $X \to Z \leftarrow Y$ (a v-structure) **if and only if** $Z \notin \mathrm{Sep}(X, Y)$.
> - Otherwise, leave $X - Z - Y$ undirected (reversible edge).
^def-v-structure-orientation

This rule faithfully implements the Verma & Pearl (1991) characterisation: see [[Markov Equivalence and CPDAGs#^thm-verma-pearl]].

### Phase 3 — Meek Orientation Rules

After orienting all v-structures, Meek (1995) showed that **four additional rules** propagate orientation to additional edges without creating new v-structures or cycles — they enforce that the result remains consistent with some DAG in the equivalence class. These rules are applied until no further edges can be oriented.

> [!definition] Meek's Orientation Rules (Meek 1995)
> Applied to the partially directed graph after v-structure orientation:
> - **R1 (Acyclicity)**: If $Z \to X - Y$ and $Z, Y$ non-adjacent, then orient $X \to Y$ (else $Z \to X \leftarrow Y$ is a new v-structure).
> - **R2 (Cycle avoidance)**: If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$ (else a directed cycle would form if $Y \to X$).
> - **R3 (Non-v-structure preservation)**: If $X - Z_1 \to Y$, $X - Z_2 \to Y$, $Z_1 \not\sim Z_2$, and $X - Y$, orient $X \to Y$.
> - **R4 (Discriminating path)**: Technical rule avoiding a specific v-structure along longer paths; ensures completeness of the orientation procedure.
>
> Together R1–R4 are **complete**: the resulting PDAG is the unique CPDAG of the equivalence class.
^def-meek-rules

### Output

The output of PC is a **CPDAG** $\mathcal{C}$: a partially directed acyclic graph where:
- Directed edges are **compelled** — they appear with the same direction in every DAG of the class.
- Undirected edges are **reversible** — their direction cannot be determined from observational data alone.

This is the same object targeted by [[GES - Greedy Equivalence Search]], making direct comparison of the two algorithms meaningful.

### Extensions

- **FCI (Fast Causal Inference)**: Extends PC to the case of latent confounders (causal insufficiency). Outputs a **PAG** (Partial Ancestral Graph). Computationally heavier.
- **RFCI**: Computationally faster approximation of FCI.
- **CPC (Conservative PC)**: Addresses ambiguous v-structures (where the separating-set criterion is inconclusive for some triple) by flagging them rather than forcing an orientation.
- **PC-stable** (Colombo & Maathuis 2014): The order-independent variant; recommended for practical use.

## Examples

> [!example] Example: Three-Node Skeleton $X - Y - Z$
> Suppose $Y$ is a common cause: true DAG $X \leftarrow Y \rightarrow Z$. Then $X \perp\!\!\!\perp Z \mid Y$ (d-separation). Phase 1: PC tests $X \perp\!\!\!\perp Z \mid \emptyset$ (false), then $X \perp\!\!\!\perp Z \mid \{Y\}$ (true) — removes edge $X - Z$. Records $\mathrm{Sep}(X, Z) = \{Y\}$. Phase 2: $X - Y - Z$ with $Y \in \mathrm{Sep}(X, Z)$ — **no** v-structure; edges remain undirected. Output: $X - Y - Z$ (the correct CPDAG for this class, which also includes $X \to Y \to Z$ and $X \leftarrow Y \leftarrow Z$).
>
> Now suppose the true DAG is $X \to Y \leftarrow Z$ (collider at $Y$, $X \perp\!\!\!\perp Z$). Phase 1: $X \perp\!\!\!\perp Z \mid \emptyset$ (true) — removes $X - Z$. Records $\mathrm{Sep}(X, Z) = \emptyset$. Phase 2: $X - Y - Z$ with $Y \notin \mathrm{Sep}(X, Z)$ — orients $X \to Y \leftarrow Z$. Output: $X \to Y \leftarrow Z$ (the correct CPDAG — this DAG is its own class).

## Connections

- **Targets the same output** as [[GES - Greedy Equivalence Search]]: both output CPDAGs. PC uses CI tests; GES uses a score. Comparison: [[Constraint-Based vs Score-Based Causal Discovery]].
- **Prerequisite**: [[Markov Equivalence and CPDAGs]] — defines CPDAGs, v-structures, and compelled/reversible edges that Phase 2 and 3 rely on.
- **Extension target**: [[NOTEARS - Overview]] describes a third paradigm (continuous optimisation) that outputs a DAG, not a CPDAG — a noted limitation vs. PC/GES.
- **Score-based setting**: The role of **separating sets** in PC mirrors the role of the **IMAP ordering** in GES; both characterise what the algorithm can and cannot determine from observational data.

## Software

- **pcalg** (R): `pc()` and `skeleton()` functions. Supports Gaussian, discrete, and rank-based CI tests. Also implements FCI, RFCI, GIES.
- **causal-learn** (Python): `pc()` in the `causallearn` package.
- **TETRAD** (Java/GUI): Graphical interface for PC, FCI, and many variants.

## See Also
- [[Markov Equivalence and CPDAGs]] — foundation: CPDAGs, v-structures, compelled/reversible edges
- [[GES - Greedy Equivalence Search]] — score-based alternative targeting the same CPDAG
- [[Constraint-Based vs Score-Based Causal Discovery]] — comparison of the two paradigms
- [[DAG Structure Learning Problem]] — problem setup and landscape of methods
- [[Directed Acyclic Graphs]] — d-separation, the CI criterion underlying Phase 1
