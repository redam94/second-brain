---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-algorithm-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5–6; Kalisch & Bühlmann (2007) §1–2"
date_ingested: 2026-10-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Skeleton Phase]]"
  - "[[PC Algorithm - Orientation Phase]]"
  - "[[Greedy Equivalence Search]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes Glymour Scheines"
  - "constraint-based structure learning"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** method for learning the structure of a directed acyclic graph
> from observational data. It uses a sequence of conditional independence (CI) tests to prune
> a complete graph down to a skeleton, identifies v-structures (immoralities), and applies
> orientation rules to produce a **CPDAG** — the unique representative of a Markov equivalence
> class. Under faithfulness and causal sufficiency, it is consistent. Kalisch & Bühlmann (2007)
> prove it is uniformly consistent even when $p \to \infty$ with $n$ (high-dimensional sparse DAGs).

## Overview

Causal structure learning from observational data falls into three paradigms:

| Paradigm | Key idea | Examples |
|----------|----------|----------|
| **Constraint-based** | Use CI tests to determine which edges to include | **PC**, FCI, RFCI |
| **Score-based** | Maximize a global score over the DAG/MEC space | **GES**, NOTEARS |
| **Hybrid** | Score-based search restricted by CI-test constraints | MMHC, GFCI |

The PC algorithm is the prototype of the constraint-based approach. Its name comes from its
inventors: **P**eter Spirtes and **C**lark Glymour. The algorithm operates in two high-level stages:

1. **Skeleton learning** (undirected graph via CI tests) → [[PC Algorithm - Skeleton Phase]]
2. **Orientation** (v-structures + Meek rules → CPDAG) → [[PC Algorithm - Orientation Phase]]

## Main Content

### The learning target: CPDAGs and Markov equivalence

Two DAGs are **Markov equivalent** (Verma & Pearl 1990) if and only if they have:
- the same **skeleton** (undirected edges), and
- the same **v-structures** (immoralities: $X \to Z \leftarrow Y$ with $X, Y$ non-adjacent).

> [!definition] Definition: Markov Equivalence Class (MEC) and CPDAG
> A **Markov equivalence class (MEC)** is the set of all DAGs with the same skeleton and
> v-structures. The **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique graph
> representing a MEC:
> - a directed edge $X \to Y$ appears in the CPDAG iff *every* DAG in the MEC has $X \to Y$;
> - an undirected edge $X - Y$ appears iff some DAGs have $X \to Y$ and others $Y \to X$.
^def-cpdag

From observational data alone, we can identify a distribution's MEC but not the unique DAG —
observational data cannot distinguish Markov-equivalent structures. The PC algorithm correctly
targets the MEC, not a single DAG.

### Assumptions

> [!definition] Definition: Faithfulness and Causal Sufficiency
> **Faithfulness** (Spirtes et al. 2000, Ch. 3): every conditional independence in $P(X)$ is
> *entailed* by the DAG (i.e., follows from d-separation). No CI relationship arises by
> "accidental" cancellation of paths.
>
> **Causal sufficiency**: there are no hidden common causes (latent confounders) of any two
> observed variables. All common causes are measured.
^def-assumptions

Faithfulness is necessary for the PC algorithm to identify the correct MEC from CI tests.
Causal sufficiency rules out confounded settings — the FCI algorithm (Spirtes et al. 2000)
relaxes causal sufficiency at the cost of a less informative output (PAG rather than CPDAG).

### Algorithm structure

The PC algorithm can be summarized in three steps:

```
PC(data X, CI test oracle, significance level α):
  1. SKELETON: Learn undirected adjacency via CI tests (→ see PC Algorithm - Skeleton Phase)
  2. V-STRUCTURES: Orient immoralities X → Z ← Y (→ see PC Algorithm - Orientation Phase)
  3. MEEK RULES: Propagate orientations to more edges (→ see PC Algorithm - Orientation Phase)
  Return: CPDAG Ĝ
```

### Consistency result (Kalisch & Bühlmann 2007)

> [!theorem] Theorem: High-dimensional consistency of PC (Kalisch & Bühlmann 2007, Thm. 3.1)
> Under a Gaussian linear SEM, faithful causal sufficiency, and sparsity (max degree $q$ fixed
> as $p, n \to \infty$), PC is **uniformly consistent**: it recovers the true skeleton and
> v-structures with probability $\to 1$ as $n \to \infty$, even when $p = O(n^a)$ for any
> $a < \infty$. The test used is Fisher's $z$-transform for partial correlation.
^thm-consistency

This result — that PC is consistent in the high-dimensional regime — was unexpected given the
algorithm's worst-case exponential complexity in $p$ and made PC competitive with lasso-type
estimators for Gaussian DAGs.

## Connections

- **vs. GES** ([[Greedy Equivalence Search]]): GES is score-based and provably optimal in the large-sample limit; PC is test-based and consistent under the same assumptions. GES is generally more reliable on small samples; PC scales better in $p$ under sparsity.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS is a continuous optimization method; PC is combinatorial but avoids the NP-hard discrete search by using CI tests to directly prune edges. NOTEARS is mentioned as a comparison baseline in Kalisch & Bühlmann's framework.
- **Extension to hidden variables**: FCI (Fast Causal Inference) replaces causal sufficiency with the weaker assumption of no selection bias, producing PAGs instead of CPDAGs.
- **DAG semantics**: d-separation in [[Directed Acyclic Graphs]] is the mathematical foundation for reading off conditional independence from a DAG — the CI oracle PC calls implicitly tests this.

## See Also
- [[PC Algorithm - Skeleton Phase]] — the CI-testing phase in detail
- [[PC Algorithm - Orientation Phase]] — v-structures and Meek rules
- [[Greedy Equivalence Search]] — score-based alternative producing same CPDAG target
- [[DAG Structure Learning Problem]] — the general problem setting (SEM, score functions, NP-hardness)
- [[NOTEARS - Overview]] — continuous-optimization alternative to both PC and GES
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, and DAG semantics
