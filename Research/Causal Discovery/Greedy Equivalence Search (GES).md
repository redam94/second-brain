---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-meek-sges.pdf]]"
source_location: "§3.1 (GES algorithm), §2 (background), Figure 1–2, Theorem 1, pp. 1-6"
date_ingested: 2026-08-13
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering, 2002, *JMLR*) is the canonical **score-based** causal structure-learning
> algorithm. Rather than searching over DAGs, it searches directly over **Markov equivalence
> classes** (represented as CPDAGs) using two greedy phases: **FES** (Forward Equivalence
> Search) adds edges to improve the score, and **BES** (Backward Equivalence Search) removes
> edges. Given a *score-equivalent*, *locally consistent*, and *decomposable* score, **Theorem 1**
> guarantees that GES returns a CPDAG $C \approx G$ in the limit of large samples — the unique
> asymptotically correct equivalence class.

## Overview

Score-based structure learning optimizes a score $\text{Score}(G, D)$ over graphs. The naive
approach searches over individual DAGs — exponential in $d$. GES improves on this by:

1. Searching over **equivalence classes** (CPDAGs), which are far fewer;
2. Using greedy **local operators** (INSERT and DELETE) that move between adjacent CPDAGs
   with provable score-improvement guarantees;
3. Separating the search into a **forward phase** (empty graph → add edges) and a **backward
   phase** (prune edges), exploiting the scoring function's decomposability.

GES is provably consistent and practically effective: Chickering (2002) showed it matches or
beats specialized algorithms including PC on synthetic benchmarks.

## Main Content

### Score Requirements

> [!definition] Definition: Score-equivalent score
> A scoring function $\text{Score}(G, D)$ is **score-equivalent** if Markov-equivalent DAGs
> receive the same score: $G \sim G' \Rightarrow \text{Score}(G, D) = \text{Score}(G', D)$.
> This means the score is well-defined on equivalence classes.
^def-score-equivalent

> [!definition] Definition: Decomposable score
> A score is **decomposable** if it factors over nodes:
> $$\text{Score}(G, D) = \sum_{i=1}^{d} \text{Score}(X_i, \mathrm{Pa}^G_i; D).$$
> Decomposability means inserting or deleting one edge only changes a bounded number of local
> terms, enabling efficient operator evaluation.
^def-decomposable

> [!definition] Definition: Locally consistent score
> A decomposable, score-equivalent scoring function $S$ is **locally consistent** if, for any
> DAG $G$ and any node $Y$ with parent set $\mathbf{P}$:
> 1. If $X \not\in \mathbf{P}$ but $X$ is an ancestor of $Y$ in the true DAG $G^*$, then
>    $S(Y, \mathbf{P} \cup \{X\}) > S(Y, \mathbf{P})$, and
> 2. If $X \in \mathbf{P}$ is *not* an ancestor of $Y$ in $G^*$, then
>    $S(Y, \mathbf{P} \setminus \{X\}) > S(Y, \mathbf{P})$.
>
> The BIC score (Bayesian Information Criterion) is locally consistent under faithfulness and
> regularity conditions. BIC: $S(Y, \mathbf{P}) = \log \hat{p}(Y \mid \mathbf{P}) - \frac{|\mathbf{P}|+1}{2}\log n$.
^def-locally-consistent

### The GES Algorithm

> [!theorem] Algorithm: GES (Chickering, 2002)
> **Input:** Data $D$; a score-equivalent, locally consistent, decomposable score $S$.
>
> **Output:** CPDAG $C$.
>
> ---
> **Phase 1 — FES (Forward Equivalence Search):**
> 1. Initialize $C \leftarrow$ the empty CPDAG (no edges).
> 2. Repeat:
>    - Evaluate all valid **INSERT** operators $(X, Y, \mathbf{T})$ on $C$.
>    - Let $(X^*, Y^*, \mathbf{T}^*)$ be the operator with the highest positive score improvement.
>    - If no operator has a positive improvement, stop.
>    - Apply INSERT$(X^*, Y^*, \mathbf{T}^*)$ to $C$; update to the resulting CPDAG.
>
> **Phase 2 — BES (Backward Equivalence Search):**
> 1. Initialize $C$ with the CPDAG output by FES.
> 2. Repeat:
>    - Evaluate all valid **DELETE** operators $(X, Y, \mathbf{H})$ on $C$.
>    - Let $(X^*, Y^*, \mathbf{H}^*)$ be the operator with the highest positive score improvement.
>    - If no operator has a positive improvement, stop.
>    - Apply DELETE$(X^*, Y^*, \mathbf{H}^*)$ to $C$; update to the resulting CPDAG.
>
> Return $C$.
^alg-ges

### The INSERT and DELETE Operators

Each GES operator corresponds to moving from one CPDAG to an adjacent one in the space of
equivalence classes.

> [!definition] Definition: INSERT operator $(X, Y, \mathbf{T})$
> Given: $X$ and $Y$ are non-adjacent in $C$; $\mathbf{T} \subseteq \mathrm{NA}_{Y,X}$
> (the set of nodes adjacent to $Y$ but not $X$ in $C$) such that $\mathbf{T}$ and
> $\mathrm{NA}_{Y,X} \setminus \mathbf{T}$ are cliques.
>
> **Score improvement:**
> $$\delta_{\mathrm{ins}} = S(Y,\, \mathrm{Pa}^C_Y \cup \mathbf{T} \cup \{X\}) - S(Y,\, \mathrm{Pa}^C_Y \cup \mathbf{T}).$$
>
> **Transformation:** Insert $X \to Y$; for each $T \in \mathbf{T}$, orient $T \to Y$;
> convert the resulting PDAG to a CPDAG.
^def-insert

> [!definition] Definition: DELETE operator $(X, Y, \mathbf{H})$
> Given: $X$ and $Y$ are adjacent in $C$; $\mathbf{H} \subseteq \mathrm{NA}_{Y,X}$
> such that $\bar{\mathbf{H}} = \mathrm{NA}_{Y,X} \setminus \mathbf{H}$ is a clique.
>
> **Score improvement:**
> $$\delta_{\mathrm{del}} = S\!\left(Y,\, \{\mathrm{Pa}^C_Y \cup \bar{\mathbf{H}}\} \setminus \{X\}\right) - S\!\left(Y,\, \{X\} \cup \mathrm{Pa}^C_Y \cup \bar{\mathbf{H}}\right).$$
>
> **Transformation:** Remove edge $X - Y$; for each $H \in \mathbf{H}$, orient $Y \to H$
> (and $X \to H$ if $X - H$ was undirected); convert to CPDAG.
>
> (Chickering & Meek, *SGES*, Figure 2)
^def-delete

> [!note] $\mathrm{NA}_{Y,X}$: neighbors adjacent to both
> $\mathrm{NA}_{Y,X}$ denotes the set of nodes that are adjacent to $Y$ in $C$ and that are
> non-adjacent to $X$ in $C$ (the "neighborhood" of $Y$ exclusive of $X$'s side). The clique
> conditions on $\mathbf{T}$ and $\mathbf{H}$ ensure the resulting PDAG after the operator
> application is acyclic and can be completed to a valid CPDAG.

### Asymptotic Consistency

> [!theorem] Theorem 1: Consistency of GES (Chickering, 2002)
> Let $C$ be the CPDAG that results from applying the GES algorithm to $m$ records sampled
> from a distribution that is **perfect** with respect to DAG $G^*$ (i.e., the distribution
> is faithful to $G^*$ and no additional independences hold). Then in the **limit of large**
> $m$:
> $$C \approx G^*,$$
> meaning $C$ is the unique CPDAG of the Markov equivalence class containing $G^*$.
>
> (Chickering & Meek, *SGES*, §3.1; originally Chickering, *JMLR* 3:507-554, 2002)
^thm-ges-consistency

> [!note] Proof sketch
> The key arguments are:
> 1. **FES terminates at a supergraph** of the true skeleton: local consistency implies the
>    score improves whenever a true edge is missing, so FES adds all true edges (and possibly
>    spurious ones). Faithfulness ensures no independence is created incorrectly.
> 2. **BES removes spurious edges**: local consistency implies removing a non-true edge
>    improves the score in the large-sample limit; BES greedily removes them all.
> 3. At each step, operators move to strictly higher-scoring CPDAGs, so GES cannot cycle.
>    Combined with 1 and 2, GES converges to the true CPDAG.

### Complexity

| Phase | Score evaluations | Bottleneck |
|-------|-----------------|-----------|
| FES | $O(d^2 \cdot 2^{d_{\max}})$ per greedy step | Over all $(X,Y,\mathbf{T})$ triples |
| BES | $O(d^2 \cdot 2^{d_{\max}})$ per greedy step | Over all $(X,Y,\mathbf{H})$ triples |
| GES total | $O(d^2)$ greedy steps × per-step cost | Sparse graphs: very fast |

Here $d_{\max}$ is the maximum degree in the output graph. The SGES extension (Chickering &
Meek) achieves a **polynomial** number of score evaluations by restricting to $\Pi$-consistent
operators, at the cost of requiring slightly stronger assumptions.

## Connections

- **vs. PC Algorithm** ([[PC Algorithm]]): PC uses CI tests; GES uses a score function. GES
  is generally preferable when a good score is available (e.g., BIC for Gaussian data) and
  with moderate $d$. PC is preferred when CI testing is cheap and the graph is sparse.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS optimizes over individual DAG weight
  matrices $W$ via continuous methods; GES operates in the CPDAG space. GES is model-free
  (any decomposable score); NOTEARS assumes a linear SEM.
- **Score decomposability** links to the LS score in [[DAG Structure Learning Problem]]:
  the regularized LS score $F(W) = \frac{1}{2n}\|X - XW\|_F^2 + \lambda\|W\|_1$ decomposes
  over columns of $W$, making it a candidate for GES-style search.
- **Equivalence class representation** ([[Markov Equivalence and CPDAGs]]): GES's correctness
  proof relies on the uniqueness of the CPDAG and on covered-edge connectivity of equivalence
  classes.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, covered edges, INSERT/DELETE context
- [[DAG Structure Learning Problem]] — problem setup, LS score, NP-hardness
- [[PC Algorithm]] — constraint-based alternative to GES
- [[Causal Structure Learning - Overview]] — comparison of all approaches
- [[raw/chickering-meek-sges.pdf]] — Chickering & Meek SGES paper; §3.1 formalizes GES
