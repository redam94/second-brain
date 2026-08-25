---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-canonical-references.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5; Spirtes & Glymour (1991)"
date_ingested: 2026-08-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Skeleton and Orientation]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm causal discovery"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 1991/2000) is the foundational
> **constraint-based** method for learning causal DAG structure from observational data.
> Instead of optimizing a score over graphs, it uses **conditional independence (CI) tests**
> to prune edges from an initially complete graph and then orients remaining edges using
> v-structure detection and Meek's propagation rules. The output is a **CPDAG** — a
> Completed Partially Directed Acyclic Graph representing the Markov equivalence class
> of all DAGs compatible with the data. PC is asymptotically correct under three
> assumptions: Causal Markov, Faithfulness, and Causal Sufficiency (no hidden confounders).

## Overview

The PC algorithm belongs to the **constraint-based** family of causal structure learning
methods, contrasted with **score-based** methods (see [[GES - Overview]]) and
**continuous-optimization** methods (see [[NOTEARS - Overview]]). Rather than assigning
a numerical score to candidate graphs and searching for the optimum, constraint-based
methods collect a set of observed conditional independences — each a *constraint* on
the graph — and find the graph that encodes exactly those constraints.

The name "PC" comes from the first initials of Peter Spirtes and Clark Glymour, the
two primary architects of the method. The algorithm was formalized in their 2000 book
*Causation, Prediction, and Search* (with Richard Scheines), which also gives the
impossibility results that motivate the focus on equivalence classes rather than
individual DAGs.

PC has three sequential phases:
1. **Skeleton discovery** — remove edges via conditional independence tests
2. **V-structure orientation** — identify colliders using the stored separating sets
3. **Meek orientation rules** — propagate known orientations to remaining undirected edges

For full algorithmic details, see [[PC Algorithm - Skeleton and Orientation]].

## Main Content

### The three assumptions

> [!definition] Assumption: Causal Markov Condition
> The joint distribution $P$ over variables $\mathbf{X} = (X_1,\dots,X_d)$ satisfies the
> **Causal Markov Condition** with respect to DAG $\mathcal{G}$ if every variable $X_i$
> is conditionally independent of its non-descendants given its parents $\mathrm{pa}_{\mathcal{G}}(X_i)$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \mathrm{pa}_{\mathcal{G}}(X_i).$$
> This is equivalent (for faithful distributions) to the factorization
> $P(\mathbf{X}) = \prod_{i=1}^d P(X_i \mid \mathrm{pa}_{\mathcal{G}}(X_i))$.
^def-causal-markov

> [!definition] Assumption: Causal Faithfulness
> Distribution $P$ is **faithful** to DAG $\mathcal{G}$ if every conditional independence
> in $P$ is entailed by d-separation in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \text{ in } P
> \;\Longleftrightarrow\;
> X_i \text{ and } X_j \text{ are d-separated by } \mathbf{S} \text{ in } \mathcal{G}.$$
> Faithfulness is violated when path-specific effects cancel exactly — a measure-zero event
> under "generic" parameters, but possible in practice for structural models with equality
> constraints.
^def-faithfulness

> [!definition] Assumption: Causal Sufficiency
> **Causal Sufficiency** holds if every common cause of two or more variables in
> $\mathbf{X}$ is itself observed in $\mathbf{X}$. Equivalently, there are no
> **latent confounders** (hidden common causes).
> When Causal Sufficiency fails, the correct method is **FCI** (Fast Causal Inference),
> which extends PC to output a partial ancestral graph (PAG) rather than a CPDAG.
^def-causal-sufficiency

### Markov equivalence classes and CPDAGs

PC cannot, in general, identify the unique DAG: multiple DAGs produce identical
conditional independence structures (they are **Markov equivalent**). PC therefore
identifies the **Markov equivalence class** — the set of all DAGs that generate the
same conditional independences.

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}$ and $\mathcal{G}'$ are **Markov equivalent** if and only if
> they have the same:
> 1. **Skeleton** (the same set of undirected edges when all arrows are removed), and
> 2. **V-structures** (also called *immoralities*): unshielded triples $X \to Z \leftarrow Y$
>    where $X$ and $Y$ are not adjacent.
> A v-structure exists only when $Z \notin \text{sep}(X, Y)$ — i.e., $Z$ is not in
> the separating set for $X$ and $Y$.
^def-markov-equivalence

> [!definition] Definition: CPDAG
> A **Completed Partially Directed Acyclic Graph (CPDAG)** represents a Markov
> equivalence class. It is a mixed graph with both directed ($\to$) and undirected ($-$)
> edges:
> - Edge $X \to Y$ appears in the CPDAG iff $X \to Y$ in **every** DAG of the equivalence class
>   (the edge direction is *identifiable* from observational data alone)
> - Edge $X - Y$ appears in the CPDAG iff both $X \to Y$ and $Y \to X$ exist in *some* DAG
>   of the class (the direction is *not* identifiable from data alone)
^def-cpdag

### Complexity and practical behavior

| Regime | Time complexity | Comment |
|--------|----------------|---------|
| Dense graph ($d$ large) | $O(n^{d-1} \cdot d^2)$ | Exponential in maximum degree |
| Sparse graph (bounded degree $k$) | $O(n^k \cdot d^2)$ | Polynomial in $d$ for fixed $k$ |
| High-dimensional ($d \gg n$) | Unreliable | Kalisch & Bühlmann (2007) analyze this regime |

The bottleneck is the conditioning set size in skeleton discovery: testing all subsets
of size $k$ for every pair requires $\binom{d-2}{k}$ tests per pair. For sparse graphs
(bounded maximum degree), the maximum $k$ reached is small and PC is efficient.

### Stable PC and order-dependence

The original PC algorithm is **order-dependent**: the skeleton found in Phase 1 can differ
depending on the order in which pairs $(X_i, X_j)$ are tested. **Stable PC** (Colombo &
Maathuis 2014) fixes this by completing all tests at depth $k$ before advancing to depth
$k+1$, storing the graph from depth $k-1$ for the neighbor lookups. This is the default
in all modern implementations (`stable=True` in causal-learn).

## Examples

> [!example] Example: Two-Cause Structure
> **Setup:** Three variables $A$, $B$, $C$ with true DAG $A \to C \leftarrow B$
> (v-structure at $C$), and $A$ and $B$ are independent.
>
> **What PC finds:**
> - Phase 1: Tests $A \perp B$ (yes, remove), $A \perp C$ (no — $A$ causes $C$),
>   $B \perp C$ (no). Skeleton: $A - C - B$.
> - $\text{sep}(A, B) = \emptyset$ (they are marginally independent with empty separator).
> - Phase 2: Unshielded triple $A - C - B$ with $C \notin \text{sep}(A,B) = \emptyset$.
>   Orient: $A \to C \leftarrow B$. ✓ (v-structure identified)
> - Note: conditioning on $C$ would make $A$ and $B$ *dependent* — the classic
>   **explaining-away** effect (Berkson's paradox).

## Connections

- **Contrast with GES**: GES searches over CPDAGs using a score (BIC); PC tests
  independence constraints. GES is often more accurate; PC scales better to very large
  $d$ under sparsity.
- **Contrast with NOTEARS**: NOTEARS casts DAG learning as continuous optimization
  (see [[NOTEARS - Overview]]); the NOTEARS experiments benchmark PC as a baseline
  (see [[NOTEARS Experiments]]).
- **FCI extension**: When Causal Sufficiency fails, FCI replaces Phase 1 with an
  augmented adjacency phase that allows for latent common causes, producing a PAG.
- **Bayesian networks**: The assumptions and CPDAG output connect directly to
  [[LLM Expert Elicitation for Bayesian Networks]] and [[BN Construction Methods Comparison]]
  — PC is how you learn the BN structure from data, not from expert knowledge.
- **Causal reasoning after discovery**: The CPDAG output feeds into the do-calculus
  and back-door criterion machinery in [[Directed Acyclic Graphs]] and [[Summary Causal DAGs]].

## See Also

- [[PC Algorithm - Skeleton and Orientation]] — full algorithmic description (all 3 phases)
- [[GES - Overview]] — the score-based alternative to PC
- [[NOTEARS - Overview]] — the continuous-optimization reformulation (benchmarks PC)
- [[DAG Structure Learning Problem]] — setup, SEM, NP-hardness context
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[BN Construction Methods Comparison]] — broader landscape of Bayesian network construction
