---
title: "Constraint-Based Causal Discovery - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/textbook
source: "[[raw/spirtes-2000-causation-prediction-search-ref.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Chs. 1–5"
date_ingested: 2026-10-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Markov Equivalence and CPDAGs]]"
aliases:
  - "PC paradigm"
  - "constraint-based structure learning"
  - "CI-based causal discovery"
---

# Constraint-Based Causal Discovery - Overview

> [!summary]
> Constraint-based causal discovery learns a DAG (Bayesian network) from observational data by
> treating **conditional independence relationships in the data as constraints** on the causal
> structure. The flagship algorithm is the **PC algorithm** (Spirtes & Glymour, 1991; Spirtes,
> Glymour & Scheines, 2000). Under the Causal Markov Condition and Faithfulness assumptions, the
> d-separations of the true DAG correspond exactly to the conditional independences in the
> distribution — so CI tests determine the graph structure. The output is a **CPDAG** (Completed
> Partially Directed Acyclic Graph) representing the **Markov equivalence class** of all DAGs
> consistent with the observed conditional independences.

## Overview

Causal structure learning operates at the intersection of statistical testing and graph theory.
Given $n$ i.i.d. observations of $p$ variables $(X_1, \ldots, X_p)$, the goal is to recover the
DAG $\mathcal{G}$ that generated the data — or at least the **equivalence class** of DAGs that
cannot be distinguished from the data alone.

The **constraint-based paradigm** takes conditional independence (CI) as its primitive:

1. Test which pairs of variables are conditionally independent given which subsets.
2. Map the CI structure to a graph skeleton (which edges are *absent*).
3. Orient as many edges as possible while remaining consistent with the CI structure.

This contrasts with the **score-based paradigm** (e.g., GES, NOTEARS) which assigns a scalar
score to each candidate DAG and searches for the highest-scoring one.

## Core Assumptions

### Causal Markov Condition (CMC)

> [!definition] Causal Markov Condition (CMC)
> A DAG $\mathcal{G}$ satisfies the **Causal Markov Condition** relative to a distribution
> $P(X_1, \ldots, X_p)$ if every variable $X_i$ is conditionally independent of its
> **non-descendants** given its **parents** in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i).$$
>
> The CMC is equivalent to saying $P$ **factorizes** over $\mathcal{G}$:
> $$P(X_1,\ldots,X_p) = \prod_{i=1}^p P(X_i \mid \text{Pa}(X_i)).$$
> This is also called the **causal Markov factorization**.
^def-cmc

The CMC holds automatically whenever the data-generating process is a structural equation model
(SEM) — which is almost always assumed in causal modeling. It is rarely the binding constraint
in practice.

### Faithfulness / Stability Assumption

> [!definition] Faithfulness (Stability)
> A distribution $P$ and DAG $\mathcal{G}$ satisfy the **Faithfulness Condition** if every
> conditional independence that holds in $P$ is **entailed by d-separation** in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \text{ in } P
>   \implies X_i \text{ is d-separated from } X_j \text{ by } \mathbf{S} \text{ in } \mathcal{G}.$$
>
> Equivalently, $P$ has **no accidental cancellations**: all d-connections in $\mathcal{G}$
> produce non-zero dependences in $P$.
^def-faithfulness

Faithfulness can fail in measure-zero sets of parameter values (e.g., exact cancellation of
opposing paths). In practice it is a reasonable regularity assumption, though conservative
practitioners apply sensitivity analyses.

### Causal Sufficiency

> [!definition] Causal Sufficiency
> The observed variable set $\{X_1,\ldots,X_p\}$ is **causally sufficient** if there are
> **no unmeasured common causes**: for every pair $X_i, X_j$, every common cause of $X_i$
> and $X_j$ is in $\{X_1,\ldots,X_p\}$.
^def-causal-sufficiency

The PC algorithm requires causal sufficiency. Dropping it leads to the **FCI algorithm**
(Fast Causal Inference), which returns a **PAG** (Partial Ancestral Graph) with additional
edge marks indicating possible hidden confounders.

## D-Separation as the Bridge

> [!definition] D-Separation
> In a DAG $\mathcal{G}$, variables $X$ and $Y$ are **d-separated** by a set $\mathbf{S}$
> (written $X \perp_\mathcal{G} Y \mid \mathbf{S}$) if every path between $X$ and $Y$
> is **blocked** by $\mathbf{S}$. A path is blocked by $\mathbf{S}$ if it contains:
> - a **chain** $X \to Z \to Y$ or **fork** $X \leftarrow Z \to Y$ with $Z \in \mathbf{S}$, **or**
> - a **collider** $X \to Z \leftarrow Y$ where $Z \notin \mathbf{S}$ and **no descendant
>   of $Z$** is in $\mathbf{S}$.
^def-d-separation

The CMC + Faithfulness together give the **d-separation criterion** as an exact characterization:
$$X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \text{ in } P
  \iff X_i \perp_\mathcal{G} X_j \mid \mathbf{S}.$$

This is the key link from statistical tests to graph structure.

## Conditional Independence Tests

In practice, CI testing is the computational bottleneck of constraint-based algorithms.

| Setting | CI Test | Notes |
|---------|---------|-------|
| Continuous, Gaussian | **Partial correlation** $\rho_{XY|\mathbf{S}} = 0$, Fisher z-test | Exact under multivariate normal |
| Continuous, non-Gaussian | **Kernel-based CI tests** (KCI, HSIC) | Non-parametric; slower |
| Discrete / categorical | **$G^2$ test** or Pearson $\chi^2$ | Requires sufficient counts per cell |
| Mixed | **CMIknn** (KNN-based CMI), **CCIT** | Active research area |
| High-dimensional sparse | **PC-stable** with FDR control | Colombo & Maathuis (2014) |

The significance level $\alpha$ used for CI tests acts as a regularization parameter for the PC
algorithm — larger $\alpha$ yields denser graphs.

## What Constraint-Based Methods Recover

Given only observational data, structure learning can recover the **Markov equivalence class**
of the true DAG, but generally **not** the true DAG itself (Verma & Pearl, 1990). Two DAGs are
Markov equivalent iff they share:
1. The same **skeleton** (same adjacencies, ignoring edge directions), and
2. The same set of **unshielded colliders** (v-structures: $X \to Z \leftarrow Y$ with $X, Y$
   not adjacent).

The CPDAG (see [[Markov Equivalence and CPDAGs]]) encodes this class: directed edges appear in
all DAGs of the class, undirected edges can go either way.

## Algorithmic Landscape

| Method | Paradigm | Output | Assumptions |
|--------|----------|--------|-------------|
| **PC** | Constraint-based | CPDAG | CMC + Faithfulness + Sufficiency |
| **FCI** | Constraint-based | PAG | CMC + Faithfulness (allows latents) |
| **GES** | Score-based | CPDAG | CMC + Faithfulness + Decomposable score |
| **NOTEARS** | Continuous opt. | DAG / CPDAG | Linear SEM + CMC |
| **LiNGAM** | Non-Gaussian | DAG (unique) | Linear SEM + non-Gaussian noise |

See [[GES - Greedy Equivalence Search]] and [[NOTEARS - Overview]] for the score-based alternatives.

## Connections

- **Contrast with NOTEARS**: NOTEARS optimizes a continuous score over $\mathbb{R}^{d\times d}$
  without ever running CI tests. PC instead counts CI relationships to build the graph structure.
  NOTEARS is parametric (linear SEM); PC is distribution-free (any CI test).
- **Foundational role of d-separation**: [[Directed Acyclic Graphs]] in the vault covers
  d-separation from the causal inference (identification) angle; here it functions as the
  bridge between the statistical distribution and the graph structure.
- **Score-based complement**: [[GES - Greedy Equivalence Search]] achieves the same CPDAG output
  via a different mechanism — optimizing a score over equivalence classes rather than testing CIs.

## See Also
- [[PC Algorithm]] — the full skeleton + orientation algorithm
- [[Markov Equivalence and CPDAGs]] — what the output represents
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[DAG Structure Learning Problem]] — the general problem formulation (score-based framing)
- [[Directed Acyclic Graphs]] — DAG semantics for causal inference
- [[Causal Discovery/_Index|Causal Discovery Index]]
