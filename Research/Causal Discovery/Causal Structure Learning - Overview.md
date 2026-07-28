---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "§1, §5 — paradigm map and comparison table"
date_ingested: 2026-07-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Markov Equivalence and CPDAGs]]"
aliases:
  - "causal structure learning"
  - "causal discovery overview"
  - "constraint-based vs score-based"
---

# Causal Structure Learning - Overview

> [!summary]
> Causal structure learning (causal discovery) recovers the skeleton and direction of edges in
> a causal DAG from observational data. The two classical paradigms are **constraint-based**
> methods (PC algorithm — remove edges between conditionally independent pairs) and
> **score-based** methods (GES — greedily maximize a model score over the space of CPDAGs).
> Both return a **CPDAG** representing the Markov equivalence class of the true DAG, not a
> unique DAG, because data alone cannot distinguish Markov-equivalent structures.

## Overview

The central challenge: the DAG that generated the data is not directly observable. We observe only a joint distribution $P(\mathbf{X})$ over variables $\mathbf{V} = \{X_1, \ldots, X_d\}$. Many DAGs can produce the same distribution — they form a **Markov equivalence class (MEC)**. The best we can generally do from observational data is recover the MEC, represented as a **CPDAG** (completed PDAG / essential graph).

[[DAG Structure Learning Problem]] covers the formal problem statement (linear SEM, score functions, NP-hardness of exact search). [[NOTEARS - Overview]] introduces the continuous-optimization approach. This note maps the three families and motivates the classical constraint- and score-based methods covered by [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].

## Main Content

### The Three Algorithm Families

> [!definition] Three Families of Causal Structure Learning
> **Constraint-based:** Test conditional independence (CI) among variable pairs; remove edges between CI pairs; orient colliders; apply orientation rules. Output: CPDAG.
> Example: [[PC Algorithm]] (Spirtes, Glymour & Scheines, 2000).
>
> **Score-based:** Assign a score (e.g., BIC) to each candidate CPDAG; search for the maximum. Output: CPDAG.
> Example: [[GES - Greedy Equivalence Search]] (Chickering, 2002).
>
> **Continuous optimization:** Convert the NP-hard combinatorial search to a smooth constrained program; solve with off-the-shelf solvers. Output: DAG (not CPDAG).
> Example: [[NOTEARS - Overview]] (Zheng et al., 2018).

A fourth family, **hybrid methods** (e.g., MMHC), uses CI tests to build a skeleton candidate and then a score to orient edges, combining both approaches.

### Why CPDAGs, Not DAGs?

> [!theorem] Data Cannot Identify a Unique DAG (Markov Equivalence)
> Under the Markov condition and faithfulness, the observed distribution $P$ is consistent with
> every DAG in the Markov equivalence class of the true DAG. **Constraint-based and score-based
> methods return the equivalence class (CPDAG), not a single DAG.**
>
> Unique DAG identification requires additional assumptions:
> - **LiNGAM** (Shimizu et al., 2006): non-Gaussian errors allow unique identification.
> - **ANMs** (Additive Noise Models, Hoyer et al., 2009): non-linear mechanisms with additive noise.
> - **NOTEARS**: assumes linear SEM; still returns a DAG but is not guaranteed to be the true one (only a local stationary point in the nonconvex program).

See [[Markov Equivalence and CPDAGs]] for the formal characterization of equivalence classes.

### Correctness Assumptions

Both PC and GES require:

1. **Causal Markov condition**: $P$ is Markov with respect to the true DAG $G$. Every variable is independent of its non-descendants conditional on its parents.
2. **Faithfulness**: Every conditional independence in $P$ is *entailed* by the Markov condition — no accidental cancellations. This rules out measure-zero parameter settings.
3. **Causal sufficiency** (PC and GES): No hidden common causes (no latent confounders). If violated, use **FCI** (outputs a PAG, not CPDAG).

### Complexity and Tradeoffs

| Property | PC | GES | NOTEARS |
|-----------|----|-----|---------|
| Paradigm | Constraint-based | Score-based | Continuous opt. |
| Output | CPDAG | CPDAG | DAG |
| Complexity | $O(p^{q+2} \cdot n)$ (CI tests) | $O(p^2)$ per greedy step | $O(p^3)$ per L-BFGS step |
| High-dimensional | Yes (Kalisch & Bühlmann, 2007) | Harder | Better |
| Requires faithfulness | Yes | Yes | No (but assumes linear SEM) |
| Handles latent variables | FCI variant | No | No |

where $p$ = nodes, $q$ = max degree, $n$ = samples.

### Key Software

- **R**: `pcalg` package contains PC, GES, FCI, RFCI
- **Python**: `causal-learn` (Zheng et al., 2023) contains PC, GES, NOTEARS, LiNGAM, GRaSP
- **Python**: `gCastle` (Huawei) — broad coverage including GES
- **Python**: `cdt` (Causal Discovery Toolbox) — wrappers for many algorithms

## Connections

- [[NOTEARS - Overview]]: the continuous-optimization approach contrasted here; existing vault coverage
- [[DAG Structure Learning Problem]]: formal problem statement (SEM, score functions, NP-hardness)
- [[Directed Acyclic Graphs]]: DAG semantics, d-separation, back-door criterion (causal reasoning)
- [[LLM Expert Elicitation for Bayesian Networks]]: expert elicitation as an alternative to algorithmic discovery; these two approaches are complementary for the ABM summarization pipeline in [[Summary Causal DAGs]]
- [[Spurious Association and Confounds]]: the fork/pipe/collider patterns that causal structure learning must correctly identify

## See Also
- [[Markov Equivalence and CPDAGs]] — equivalence classes, CPDAGs, Meek rules
- [[PC Algorithm]] — constraint-based structure learning in detail
- [[GES - Greedy Equivalence Search]] — score-based structure learning in detail
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
