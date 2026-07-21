---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "SGS (2000) §3, Verma & Pearl (1990), Chickering (2002) §2"
date_ingested: 2026-07-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - CPDAG
  - completed partially directed acyclic graph
  - Markov equivalence class
  - pattern
  - observational equivalence
---

# Markov Equivalence and CPDAGs

> [!summary]
> Observational data cannot distinguish among DAGs that encode the same conditional
> independence structure — they form a **Markov equivalence class**. This class has a
> unique representation, the **CPDAG** (Completed Partially Directed Acyclic Graph),
> whose directed edges are shared by all member DAGs and whose undirected edges are
> contested. The Verma-Pearl (1990) theorem characterises equivalence by skeleton and
> v-structures alone. Both the [[PC Algorithm]] and [[Greedy Equivalence Search]] output
> a CPDAG rather than a single DAG — the most that observational data alone can
> determine.

## Overview

One of the central facts of causal discovery is a **fundamental identifiability
ceiling**: from i.i.d. observational data, no algorithm can distinguish a DAG from
any other DAG that encodes the same conditional independence (CI) relations.
This is not a deficiency of a particular method but an information-theoretic limit —
different causal structures can generate identical joint distributions under the
Causal Markov condition.

The set of DAGs that generate the same CI relations form a **Markov equivalence
class**, and the object that structure-learning algorithms consistently target is
not a single DAG but this class, represented by its **CPDAG**.

## Main Content

### The Causal Markov Condition and Faithfulness

> [!definition] Definition: Causal Markov Condition
> DAG $\mathcal{G}$ satisfies the **Causal Markov condition** with respect to
> distribution $p$ if: for every variable $X_i$, $X_i$ is independent of its
> non-descendants given its parents $\mathrm{Pa}_\mathcal{G}(X_i)$.
>
> Equivalently (via d-separation): if $X$ and $Y$ are d-separated by $Z$ in
> $\mathcal{G}$, then $X \perp Y \mid Z$ in $p$.
^def-markov

> [!definition] Definition: Faithfulness (Stability)
> Distribution $p$ is **faithful** to DAG $\mathcal{G}$ if every conditional
> independence in $p$ is entailed by d-separation in $\mathcal{G}$:
>
> $$X \perp Y \mid Z \text{ in } p \implies X \text{ and } Y \text{ are d-separated by } Z \text{ in } \mathcal{G}$$
>
> Faithfulness is the converse of the Markov condition. Together, Markov + Faithfulness
> establish a **bijection** between conditional independencies in $p$ and d-separations in $\mathcal{G}$.
^def-faithfulness

Faithfulness fails when path coefficients cancel exactly (e.g., $X \to Z \to Y$ and
$X \to Y$ where the direct and indirect effects exactly cancel). This is a measure-zero
event for continuous distributions but can occur with structured models.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $\mathcal{G}$ and $\mathcal{H}$ are **Markov equivalent** (written
> $\mathcal{G} \sim \mathcal{H}$) if they encode exactly the same conditional
> independencies — equivalently, if they have the same d-separation statements.
>
> Under the Causal Markov condition + Faithfulness, $\mathcal{G} \sim \mathcal{H}$
> iff they generate the same joint distribution $p$ for every faithful parameterisation.
^def-markov-equiv

### The Verma-Pearl Characterisation

> [!theorem] Theorem: Characterisation of Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}$ and $\mathcal{H}$ are Markov equivalent **if and only if**:
>
> 1. They have the same **skeleton** (same set of edges when directions are ignored), and
> 2. They have the same **v-structures** (unshielded colliders) — triples $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are not adjacent.
>
> **Corollary:** DAGs can differ only in the orientation of edges that are not part of
> any v-structure (or that orient to avoid creating a new v-structure).
^thm-verma-pearl

**Interpretation:** The skeleton gives the adjacency structure (who is connected to whom).
V-structures are the only orientations that are **uniquely identifiable** from observational data
because they create a distinctive conditional dependence pattern: $X$ and $Y$ are marginally
independent but conditionally dependent given $Z$ (collider bias / Berkson's paradox).

### The CPDAG

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a Markov equivalence class is the unique mixed graph (containing
> both directed and undirected edges) that:
>
> 1. Has the same skeleton as any member DAG
> 2. Has a **directed edge** $X \to Y$ iff every member DAG has $X \to Y$
> 3. Has an **undirected edge** $X - Y$ iff some member DAGs have $X \to Y$ and others have $X \leftarrow Y$
>
> The CPDAG is also called a **pattern** (Verma & Pearl) or an **essential graph**.
^def-cpdag

> [!example] Example: A 3-Variable Equivalence Class
> Consider the skeleton $X_1 - X_2 - X_3$ with $X_1$ and $X_3$ not adjacent.
> This is an **unshielded triple**. Two cases:
>
> - **$X_2 \in \mathrm{sep}(X_1, X_3)$** (e.g., $X_1 \perp X_3 \mid X_2$):
>   The triple is a fork ($X_1 \leftarrow X_2 \to X_3$) or chain ($X_1 \to X_2 \to X_3$ or reverse).
>   All three share the same CI structure. CPDAG edge: $X_1 - X_2 - X_3$ (both undirected).
>
> - **$X_2 \notin \mathrm{sep}(X_1, X_3)$** (e.g., $X_1 \perp X_3$ but $X_1 \not\perp X_3 \mid X_2$):
>   The triple **must** be a v-structure $X_1 \to X_2 \leftarrow X_3$.
>   CPDAG edge: $X_1 \to X_2 \leftarrow X_3$ (both directed, uniquely identified).

### Meek's Orientation Rules

After v-structures are identified, additional edges can be oriented by **Meek's rules** (1995)
to avoid introducing new v-structures or directed cycles:

> [!definition] Definition: Meek Orientation Rules
> Apply until no changes occur:
>
> **R1 (Acyclicity):** $A \to B - C$ and $A \not\sim C$ $\Rightarrow$ orient $B \to C$.
> *(Otherwise $A \to B \leftarrow C$ would be a new v-structure.)*
>
> **R2 (Avoid cycle):** $A \to B \to C$ and $A - C$ $\Rightarrow$ orient $A \to C$.
> *(Otherwise $C \to A$ creates a directed cycle.)*
>
> **R3 (Disambiguation):** $D - A \to C$, $D - B \to C$, $D - C$ undirected, $A \not\sim B$ $\Rightarrow$ orient $C \to D$.
>
> **R4 (Shortcut):** $A - B \to C \to D$, $A - D$, $A \not\sim C$ $\Rightarrow$ orient $A \to B$.
>
> These rules are **complete**: applying them exhaustively yields the full CPDAG.
^def-meek-rules

### Covered Edge Reversals (Chickering 2002)

> [!definition] Definition: Covered Edge
> An edge $X \to Y$ in DAG $\mathcal{G}$ is **covered** if
> $\mathrm{Pa}_\mathcal{G}(X) = \mathrm{Pa}_\mathcal{G}(Y) \setminus \{X\}$
> (the parents of $X$ equal the parents of $Y$ minus $X$ itself).
^def-covered-edge

> [!theorem] Theorem: Covered Edge Reversals Preserve Equivalence (Chickering 2002)
> Reversing a covered edge $X \to Y$ (yielding $X \leftarrow Y$) yields a DAG in the
> **same** Markov equivalence class.
>
> **Meek Conjecture (proved by Chickering, Theorem 15):** If $\mathcal{H}$ is an I-map of
> $\mathcal{G}$, there exists a sequence of covered edge reversals that transforms
> $\mathcal{G}$ into $\mathcal{H}$ such that every intermediate graph is also an I-map of $\mathcal{G}$.
>
> **Consequence:** The space of Markov equivalence classes is **navigable** by local moves
> (insert/delete + covered edge reversal), which is what GES exploits.
^thm-covered-reversal

### What Breaks Markov Equivalence (and Enables Identification)

Several settings break the equivalence bound and allow identification of a unique DAG:

| Assumption | Method | What it identifies |
|------------|--------|--------------------|
| Non-Gaussian errors | LiNGAM (Shimizu et al. 2006) | Unique DAG (full direction) |
| Nonlinear + additive noise | ANM (Hoyer et al. 2009) | Unique DAG |
| Equal error variances | Peters & Bühlmann (2014) | Unique DAG in some cases |
| Interventional data | Joint-IDA, GIES | More edges oriented |
| Temporal ordering | Time-series methods (PCMCI) | Lagged causal effects |

## Connections

- **To structure learning algorithms**: [[PC Algorithm]] recovers the CPDAG via CI tests;
  [[Greedy Equivalence Search]] recovers it by score maximization. [[NOTEARS - Overview]]
  returns a single DAG (not the CPDAG) — an artifact of its continuous parameterization.
- **To causal DAG reasoning**: [[Directed Acyclic Graphs]] covers d-separation, the
  backdoor criterion, and causal identification from a *given* DAG. CPDAGs are what
  you get when the DAG is *unknown* and must be learned.
- **To identifiability limits**: The CPDAG is the *maximum* amount of causal information
  recoverable from observational data under the Markov + Faithfulness assumptions.
  Any algorithm claiming a unique DAG from observational data either makes additional
  assumptions (non-Gaussianity, nonlinearity) or is overidentifying.

## See Also
- [[PC Algorithm]] — learns the CPDAG via conditional independence tests
- [[Greedy Equivalence Search]] — learns the CPDAG via score maximization
- [[DAG Structure Learning Problem]] — the formal setup for causal structure learning
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion, do-calculus
- [[Constraint vs Score-Based Causal Discovery]] — comparison of all three paradigms
- [[Canonical Causal DAGs]] — DAG semantics (fork, pipe, collider) in the causal inference context
