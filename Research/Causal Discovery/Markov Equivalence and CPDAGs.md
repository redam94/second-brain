---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/sources-constraint-and-score-based-causal-discovery.md]]"
source_location: "Verma & Pearl (1990); Meek (1995); Spirtes et al. (2000) Ch. 3"
date_ingested: 2026-08-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "CPDAG"
  - "completed partially directed acyclic graph"
  - "MEC"
  - "essential graph"
  - "Markov equivalence class"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
> independence relationships, i.e., they have the same **skeleton** (undirected adjacency
> structure) and the same **v-structures** (unshielded colliders). The **CPDAG** (Completed
> Partially Directed Acyclic Graph) — also called the *essential graph* or *pattern* — is
> the unique graphical object that represents an entire Markov equivalence class: it has
> directed edges where every MEC member agrees on direction, and undirected edges elsewhere.
> Structure learning algorithms (PC, GES) can identify the true CPDAG but generally
> cannot identify the true DAG without additional assumptions.

## Overview

Observational data can only reveal the conditional independence (CI) structure of the
joint distribution — it cannot distinguish between DAGs that encode the same CIs.
This fundamental identifiability ceiling is captured by the notion of *Markov
equivalence*. Understanding it is prerequisite to interpreting the output of any
structure-learning algorithm.

## Main Content

### Markov Blanket and d-separation

The **Causal Markov condition** says that each variable is independent of its
non-descendants given its parents:

> [!definition] Definition: Causal Markov Condition
> A DAG $G$ over variables $\mathbf{X} = (X_1, \ldots, X_d)$ satisfies the **Causal
> Markov Condition** (CMC) with respect to distribution $P$ if, for each variable $X_i$,
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i) \quad [\text{w.r.t. } P].$$
> Equivalently, $P$ **Markov-factorizes** over $G$:
> $$P(x_1, \ldots, x_d) = \prod_{i=1}^d P(x_i \mid x_{\text{Pa}(i)}).$$
^def-cmc

> [!definition] Definition: d-Separation (Pearl, 1988)
> A path $\pi$ between $X$ and $Y$ in a DAG $G$ is **blocked** by a set $S$ (with
> $X, Y \notin S$) if:
> - The path contains a **chain** $X_i \to X_k \to X_j$ or a **fork** $X_i \leftarrow X_k
>   \to X_j$ with $X_k \in S$, OR
> - The path contains a **collider** (v-structure) $X_i \to X_k \leftarrow X_j$ with
>   $X_k \notin S$ and no descendant of $X_k$ in $S$.
>
> $X$ and $Y$ are **d-separated** by $S$ in $G$, written $X \perp_G Y \mid S$, if every
> path between them is blocked by $S$. Under the CMC, d-separation implies conditional
> independence in $P$.
^def-dsep

### Markov Equivalence

> [!definition] Definition: Markov Equivalence Class (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ are **Markov equivalent** (written $G \sim G'$) if they entail
> exactly the same conditional independence relationships — i.e., for all disjoint sets
> $X, Y, S$:
> $$X \perp_G Y \mid S \iff X \perp_{G'} Y \mid S.$$
> The **Markov equivalence class (MEC)** of $G$, written $[G]$, is the set of all DAGs
> Markov equivalent to $G$.
^def-mec

> [!theorem] Theorem: Skeletal Characterization of MECs (Verma & Pearl, 1990)
> Two DAGs $G$ and $G'$ are Markov equivalent **if and only if** they have:
> 1. The same **skeleton** (same adjacency structure, ignoring edge direction), AND
> 2. The same **v-structures** (unshielded colliders): $X \to Z \leftarrow Y$ where
>    $X$ and $Y$ are non-adjacent.
>
> *Equivalently*: $G \sim G'$ iff $\text{skel}(G) = \text{skel}(G')$ and the set of
> v-structures of $G$ equals that of $G'$.
^thm-verma-pearl

> [!example] Example: Three Markov-Equivalent DAGs
> The three DAGs on three variables $\{A, B, C\}$ with the same skeleton (chain
> $A - B - C$) and **no** v-structures form one MEC:
> $$A \to B \to C, \quad A \leftarrow B \to C, \quad A \leftarrow B \leftarrow C.$$
> All three encode the same independence: $A \perp\!\!\!\perp C \mid B$.
>
> By contrast, $A \to B \leftarrow C$ has a v-structure at $B$ and forms its own MEC.
> It encodes $A \perp\!\!\!\perp C$ (marginally independent, dependent given $B$) — a
> qualitatively different independence structure.

### CPDAG (Completed Partially Directed Acyclic Graph)

> [!definition] Definition: CPDAG / Essential Graph (Meek, 1995)
> The **CPDAG** (or *essential graph*, or *pattern*) of a MEC $[G]$ is the unique
> partially directed graph $\mathcal{C}$ such that:
> - $X - Y$ (undirected edge) in $\mathcal{C}$ iff **some** member of $[G]$ has $X \to Y$
>   and some has $X \leftarrow Y$ (the direction is not identified).
> - $X \to Y$ (directed edge) in $\mathcal{C}$ iff **all** members of $[G]$ have $X \to Y$
>   (the direction is uniquely identified).
>
> Every MEC has exactly one CPDAG; every CPDAG corresponds to exactly one MEC.
^def-cpdag

A directed edge in the CPDAG is called **essential** (or **compelled**). Compelled edges
are those whose reversal would create a new v-structure or create a cycle — they are
identifiable from observational data alone. Undirected edges are **reversible** (their
direction cannot be determined from data under the CMC + faithfulness).

### The Faithfulness Assumption

> [!definition] Definition: Faithfulness Assumption (Spirtes et al., 2000)
> Distribution $P$ is **faithful** to DAG $G$ if every conditional independence in $P$
> is entailed by d-separation in $G$. Formally: for all disjoint $X, Y, S$,
> $$X \perp\!\!\!\perp_P Y \mid S \implies X \perp_G Y \mid S.$$
^def-faithfulness

Faithfulness rules out the situation where CI relationships arise from "accidental"
parameter cancellations rather than structural zeros. Under faithfulness, CI tests
reveal the v-structures and skeleton directly, making the CPDAG identifiable.

> [!note] When is faithfulness violated?
> Faithfulness fails when path coefficients exactly cancel (e.g., $A \to B \to C$ with
> $A \to C$ where the direct and indirect effects cancel perfectly). This is
> measure-zero in the parameter space but can occur by design in some structural models.
> Non-parametric causal discovery methods (FCI, CCD) assume only the Markov condition
> and can handle unfaithful cases at cost of outputting a less informative MAG/PAG.

### Meek's Orientation Rules

After identifying v-structures, additional edge orientations can be inferred from
acyclicity and the requirement that no new v-structures are introduced. **Meek's four rules**
accomplish this:

> [!theorem] Meek's Orientation Rules (Meek, 1995)
> Let $\mathcal{C}$ be the current partially directed graph after v-structure identification.
> Apply these rules exhaustively until no further orientations are possible:
>
> | Rule | Condition | Action |
> |------|-----------|--------|
> | **R1** | $\alpha \to \beta - \gamma$ and $\alpha, \gamma$ non-adjacent | Orient $\beta \to \gamma$ (else new v-structure at $\beta$) |
> | **R2** | $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$ | Orient $\alpha \to \gamma$ (else cycle) |
> | **R3** | $\alpha - \beta$, $\alpha - \gamma_1 \to \beta$, $\alpha - \gamma_2 \to \beta$, $\gamma_1, \gamma_2$ non-adjacent | Orient $\alpha \to \beta$ |
> | **R4** | $\alpha - \beta$, $\delta \to \gamma \to \beta$, $\alpha - \gamma$, $\alpha, \delta$ non-adjacent | Orient $\alpha \to \beta$ |
>
> After exhaustive application, the result is the CPDAG.
^thm-meek-rules

## Why MECs Matter for Structure Learning

The CPDAG is both the **output** of constraint-based and score-based structure learning
algorithms and the **limit** of what observational data can identify:

1. **Identifiability limit**: under the CMC + faithfulness, observational data can at best
   identify the MEC. Different members of the same MEC are observationally *indistinguishable*.
2. **Interventional data can break the tie**: intervening on $X$ (setting $X = x$ externally)
   removes all incoming edges to $X$ in the causal DAG, producing a different distribution
   that can distinguish some MEC members.
3. **Score-based methods** (GES) search over MECs directly via CPDAGs.
4. **Constraint-based methods** (PC) reconstruct the CPDAG skeleton-first, then orient
   v-structures and apply Meek rules.

## Connections

- **PC algorithm** (→ [[PC Algorithm]]): outputs a CPDAG by testing CIs and orienting
  edges via v-structures + Meek rules.
- **GES** (→ [[Greedy Equivalence Search]]): searches CPDAG space using score operators;
  also outputs a CPDAG.
- **NOTEARS** (→ [[NOTEARS - Overview]]): outputs a DAG (not a CPDAG); the continuous
  optimization program targets a specific DAG, not the whole MEC.
- **Directed Acyclic Graphs** (→ [[Directed Acyclic Graphs]]): the causal-inference
  treatment of DAGs, d-separation, and the back-door/front-door criteria.

## See Also
- [[PC Algorithm]] — how the CPDAG is recovered from conditional independence tests
- [[Greedy Equivalence Search]] — how the CPDAG is recovered via score maximization
- [[DAG Structure Learning Problem]] — the broader landscape of structure-learning approaches
- [[Directed Acyclic Graphs]] — DAG semantics in causal inference
- [[Canonical Causal DAGs]] — fork/pipe/collider patterns (the building blocks of v-structures)
