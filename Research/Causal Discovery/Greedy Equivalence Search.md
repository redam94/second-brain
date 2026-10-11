---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.md]]"
source_location: "Chickering (2002) JMLR §1–5, pp. 507–554"
date_ingested: 2026-10-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Orientation Phase]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based equivalence class search"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Chickering 2002) is a **score-based** structure learning algorithm that searches
> over the space of **CPDAGs** (Markov equivalence classes) in two phases: a forward phase
> that greedily adds edges to maximize a decomposable score, and a backward phase that removes
> edges. GES is **asymptotically optimal**: in the large-sample limit under faithfulness and
> a Gaussian linear SEM with BIC scoring, it returns the true CPDAG. The central theoretical
> contribution is a proof of the **Meek conjecture**: any two Markov-equivalent DAGs are
> connected by a sequence of *covered edge reversals*, which underlies the forward phase's
> correctness.

## Overview

Where the PC algorithm is *constraint-based* (uses CI tests to remove edges), GES is
*score-based* (maximizes a global score by adding and removing edges). The key insight is that
GES never searches over individual DAGs — it searches over **CPDAGs** using operators that
maintain CPDAG validity. This gives an efficient, principled greedy search over the
exponentially large MEC space.

The algorithm proceeds in two phases over the CPDAG space:

| Phase | Operation | Start | Termination |
|-------|-----------|-------|-------------|
| **Forward** | Insert edges via $\mathrm{Insert}(X,Y,T)$ | Empty DAG (empty CPDAG) | Score no longer increases |
| **Backward** | Delete edges via $\mathrm{Delete}(X,Y,H)$ | CPDAG from Forward | Score no longer increases |

## Main Content

### Decomposable scores

GES requires a **decomposable score** that factors over families (a node and its parents):

> [!definition] Definition: Decomposable score (Chickering 2002 §2)
> A score $Q(G, \mathbf{X})$ is **decomposable** if it can be written as
> $$Q(G, \mathbf{X}) = \sum_{j=1}^{d} q\bigl(X_j,\, \mathrm{Pa}(X_j)\bigr)$$
> where $q(X_j, \mathrm{Pa}(X_j))$ depends only on the values of $X_j$ and its parents. This
> allows local score computation when an edge is added or removed.
^def-decomposable-score

The BIC score is the standard choice:
$$\text{BIC}(G, \mathbf{X}) = \log \hat{L}(G, \mathbf{X}) - \frac{|\theta_G|}{2} \log n$$
where $\hat{L}$ is the maximized likelihood and $|\theta_G|$ is the number of free parameters.
BIC is decomposable for DAG models. For discrete data, the **BDe(u)** score (Bayesian Dirichlet
equivalent) is the standard decomposable score.

### Insert and Delete operators on CPDAGs

GES works with two operators that map one valid CPDAG to another.

> [!definition] Definition: Insert operator (Chickering 2002 §4.1)
> $\mathrm{Insert}(X, Y, T)$ adds an edge from $X$ to $Y$ in a CPDAG by:
> 1. Orienting the new edge $X \to Y$
> 2. Orienting edges in the neighborhood of $Y$ appropriately (re-running orientation rules)
>
> The set $T \subseteq \mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$ is a subset of the neighbors
> of $Y$ not adjacent to $X$ that must become parents of $Y$. The resulting graph is guaranteed
> to be a valid CPDAG for some MEC.
^def-insert

> [!definition] Definition: Delete operator (Chickering 2002 §4.2)
> $\mathrm{Delete}(X, Y, H)$ removes an edge between $X$ and $Y$ from the CPDAG.
> The set $H \subseteq \mathrm{Ne}(Y) \cap \mathrm{Adj}(X)$ specifies which neighbors of $Y$
> that are also adjacent to $X$ remain connected after deletion. The resulting graph is
> guaranteed to be a valid CPDAG.
^def-delete

### The GES Algorithm

```
GES(data X, decomposable score Q):

  # Phase 1: Forward search
  G ← empty CPDAG (no edges)
  repeat:
    for each valid Insert(Xi, Xj, T) operation on G:
      ΔQ ← Q(Insert(Xi, Xj, T), X) - Q(G, X)
    if max(ΔQ) > 0:
      apply Insert(Xi*, Xj*, T*) = argmax ΔQ
  until no Insert improves Q

  # Phase 2: Backward search
  repeat:
    for each valid Delete(Xi, Xj, H) operation on G:
      ΔQ ← Q(Delete(Xi, Xj, H), X) - Q(G, X)
    if max(ΔQ) > 0:
      apply Delete(Xi*, Xj*, H*) = argmax ΔQ
  until no Delete improves Q

  return CPDAG G
```

### The Meek conjecture and optimality

The theoretical core of Chickering (2002) is a proof of a conjecture attributed to Meek:

> [!theorem] Theorem: Meek conjecture (Chickering 2002, Thm. 15)
> Let $G_1$ and $G_2$ be two DAGs in the same Markov equivalence class. Then there exists a
> sequence of DAGs $G_1 = H_0, H_1, \dots, H_k = G_2$, all in the same MEC, such that each
> $H_{t+1}$ is obtained from $H_t$ by a **covered edge reversal**.
>
> A **covered edge** $X \to Y$ satisfies $\mathrm{Pa}(X) \cup \{X\} = \mathrm{Pa}(Y)$ —
> reversing it to $Y \to X$ gives a DAG in the same MEC.
^thm-meek-conjecture

This result is why the GES forward phase can legitimately search CPDAGs rather than individual
DAGs: Insert operators on CPDAGs correspond to covered edge reversals in the underlying DAGs,
and the Meek conjecture guarantees that all MECs are reachable by such operations.

> [!theorem] Theorem: Asymptotic optimality of GES (Chickering 2002, Thm. 27)
> Under a faithful distribution and a Gaussian linear SEM, if the score $Q$ is consistent
> (BIC, BDe(u) under their respective models), then in the limit $n \to \infty$, GES returns
> the true CPDAG with probability 1.
^thm-ges-optimality

### Complexity

- **Forward phase**: each Insert step costs $O(p^2 q)$ score evaluations ($q$ = max degree).
  Total forward phase: $O(p^2 q \cdot |\text{edges}|) = O(p^4 q)$ in worst case.
- **Backward phase**: $O(p^4 q)$ similarly.
- GES is **much faster than exact methods** (which are NP-hard) while being asymptotically
  optimal — the same MEC-level target as solving the NP-hard combinatorial program exactly.

### GES vs PC: practical tradeoffs

| Property | PC | GES |
|----------|----|----|
| **Approach** | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| **Output** | CPDAG | CPDAG |
| **Finite-sample** | Can be less reliable; test calibration matters | Generally more reliable |
| **High-dimensional** | Consistent for $p \gg n$ under sparsity | Less studied for $p \gg n$ |
| **Complexity** | $O(p^{q+2})$ CI tests | $O(p^4 q)$ score evaluations |
| **Assumptions** | Faithfulness + causal sufficiency | Same + specific noise model (for score) |
| **Software** | `pcalg::pc`, `causal-learn` | `pcalg::ges`, `causal-learn` |

## Connections

- **NOTEARS** ([[NOTEARS - Overview]]): also score-based but uses continuous optimization over matrices rather than greedy MEC search; Chickering (2002) is cited as the hardness result that NOTEARS works around.
- **PC algorithm** ([[PC Algorithm - Overview]]): GES achieves the same asymptotic target (true CPDAG) as PC but through score maximization rather than CI testing. NOTEARS experiments compare GES and PC as primary baselines.
- **Interventional GES** (Hauser & Bühlmann 2012): extends GES to interventional data, where known interventions on variables help orient edges that are undirected in the observational CPDAG.
- **Fast GES (FGES)**: Ramsey et al. (2017) scales GES to thousands of variables using parallelism, making it practical for genomics applications.

## See Also
- [[DAG Structure Learning Problem]] — the score-based formulation GES optimizes
- [[PC Algorithm - Overview]] — constraint-based alternative to GES
- [[PC Algorithm - Orientation Phase]] — CPDAGs and Meek rules (shared with GES output)
- [[NOTEARS - Overview]] — third paradigm: continuous optimization
- [[NOTEARS Experiments]] — empirical comparison of GES, PC, and NOTEARS
