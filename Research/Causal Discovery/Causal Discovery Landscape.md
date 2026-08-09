---
title: "Causal Discovery Landscape"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/tutorial
source: "[[raw/causal-learn-README.md]]"
source_location: "Package Overview"
date_ingested: 2026-08-09
folder: "Causal Discovery"
doc_type: tutorial
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "Structure learning paradigms"
  - "Causal structure learning overview"
---

# Causal Discovery Landscape

> [!summary]
> **Causal discovery** (structure learning) is the task of recovering the causal DAG — or
> its Markov equivalence class — from observational data alone, without interventional
> experiments. Three main paradigms exist: **constraint-based** methods (PC, FCI) use
> conditional independence (CI) tests; **score-based** methods (GES, FGS) greedily optimize
> a scoring criterion over equivalence classes; and **continuous optimization** methods
> (NOTEARS, DAGMA) relax the combinatorial acyclicity constraint. All three operate
> on the same problem — they differ in assumptions made and computational trade-offs.

## Overview

The problem is formally defined in [[DAG Structure Learning Problem]]: given $n$ i.i.d.
observations of $d$ variables, recover the Markov equivalence class of the generating DAG.
Because the number of DAGs grows superexponentially in $d$, exhaustive search is infeasible
and all practical methods make at least one of the following assumptions:

> [!definition] Definition: Standard Identifiability Assumptions
> 1. **Causal Markov condition**: the joint distribution $P(X_1,\dots,X_d)$ factorizes
>    according to the DAG, i.e. each $X_i \perp\!\!\!\perp X_{\mathrm{non-descendants}(i)} \mid
>    X_{\mathrm{pa}(i)}$.
> 2. **Faithfulness** (or stability): every conditional independence in $P$ is *entailed* by
>    d-separation in $\mathsf{G}$ — there are no exact cancellations in path coefficients.
> 3. **Causal sufficiency**: no hidden common causes; all relevant variables are observed.
>
> Without Markov + Faithfulness + Causal Sufficiency, the equivalence class is generally
> not identifiable from purely observational data.
^def-assumptions

## Main Content

### The output: Markov equivalence classes and CPDAGs

Structure learning algorithms can recover the generating DAG only **up to Markov
equivalence**: two DAGs are equivalent if they encode the same conditional independencies
(same skeleton and same v-structures). The equivalence class is represented by a
**CPDAG** (Completed Partially Directed Acyclic Graph): a mixed graph with directed
edges where the orientation is shared by all DAGs in the class, and undirected edges
where orientation varies. The CPDAG is also called the **essential graph** of the
equivalence class.

> [!note] Identifiability beyond Markov equivalence
> Under additional assumptions, the full DAG can sometimes be identified:
> - **Non-Gaussian noise + linear SEM**: LiNGAM (Shimizu et al. 2006) — all DAGs in
>   the equivalence class produce different non-Gaussian distributions.
> - **Additive noise models** (Hoyer et al. 2009): non-linear SEM with additive noise
>   provides full identifiability.
> - **Discrete variables** with specific parameterizations can also break Markov equivalence.

### Paradigm 1: Constraint-based methods

Constraint-based methods treat the CI tests as *constraints* that must be satisfied by
the graph's d-separations. The canonical algorithm is **PC** (after **P**eter Spirtes
and **C**lark Glymour), from *Causation, Prediction, and Search* (Spirtes, Glymour &
Scheines 2000). A more general version, **FCI** (Fast Causal Inference), handles hidden
common causes (drops causal sufficiency).

| Property | Value |
|----------|-------|
| Assumptions | Markov, Faithfulness, Causal Sufficiency |
| Input | Data matrix + CI test (e.g. Fisher's $z$, $\chi^2$) |
| Output | CPDAG |
| Correctness | Consistent in the limit of infinite data |
| Key weakness | CI tests are unreliable in finite samples; number of tests grows; assumes correct null model |

See [[Constraint-Based Causal Discovery]] for the full PC algorithm.

### Paradigm 2: Score-based methods

Score-based methods optimize a **scoring criterion** — typically BIC (Bayesian Information
Criterion, penalized log-likelihood) — over the space of CPDAGs. The canonical algorithm
is **GES** (Greedy Equivalence Search, Chickering 2002). A fast implementation, **FGS**
(Fast Greedy Search, Ramsey et al. 2017), uses a CPDAG representation that avoids explicit
PDAG-to-CPDAG conversions.

| Property | Value |
|----------|-------|
| Assumptions | Markov, Faithfulness, Causal Sufficiency, Score-equivalence |
| Input | Data matrix + score function (BIC, BDe, BGe) |
| Output | CPDAG |
| Correctness | Consistent in the limit of infinite data (Chickering 2002) |
| Key weakness | Greedy search can get stuck at local optima; forward phase may over-insert |

See [[GES - Greedy Equivalence Search]] for the full GES algorithm.

### Paradigm 3: Continuous optimization methods

Continuous optimization methods relax the combinatorial acyclicity constraint $\mathsf{G}\in\mathbb{D}$
into a smooth equality constraint $h(W)=0$, converting the discrete DAG search into a
continuous program solvable by numerical solvers. **NOTEARS** (Zheng et al. 2018) introduced
the matrix-exponential characterization $h(W)=\mathrm{tr}(e^{W\circ W})-d$; subsequent work
includes DAGMA (Bello et al. 2022, $\log$-det characterization) and NOCURL (Yu et al. 2021).

| Property | Value |
|----------|-------|
| Assumptions | Linear SEM (NOTEARS); extensions to nonlinear |
| Input | Data matrix |
| Output | Directed graph (DAG up to threshold) |
| Correctness | Finds stationary points, not guaranteed global optimum |
| Key strength | Implementable in ~50 lines of Python; no graphical-model expertise required |

See [[NOTEARS - Overview]], [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]].

### Paradigm comparison

| | Constraint-based (PC) | Score-based (GES) | Continuous opt. (NOTEARS) |
|---|---|---|---|
| **Core object** | CI tests | Score over CPDAGs | Weighted adjacency matrix |
| **Search space** | Skeleton + orientations | CPDAGs via operators | $\mathbb{R}^{d\times d}$ |
| **Acyclicity** | Enforced by construction | Enforced by PDAG operations | $h(W)=0$ as equality constraint |
| **Finite sample** | CI test errors accumulate | Score estimation errors | Continuous optima |
| **Scalability** | Limited by CI test count | Better; FGS scales well | Best; matrix ops |
| **Assumptions** | Markov + Faithfulness | + Score-equivalence | + Linear SEM |
| **Software** | `pcalg` (R), `causal-learn` (Python) | `pcalg`, `causal-learn`, `ges` | `notears`, `causal-learn` |

## Connections

- The landscape table in [[DAG Structure Learning Problem]] summarizes the same paradigms
  from NOTEARS's perspective.
- [[Directed Acyclic Graphs]] covers DAG semantics (d-separation, back-door, do-calculus).
- [[Summary Causal DAGs]] and [[Approximate Bayesian Computation for ABMs]] represent
  downstream uses where the learned DAG is assumed given — structure learning is what
  precedes.
- [[Confirmatory Factor Analysis and SEM]] covers SEM from the Bayesian statistics side.

## See Also
- [[Constraint-Based Causal Discovery]] — PC algorithm in detail
- [[GES - Greedy Equivalence Search]] — Chickering (2002) score-based search
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — formal problem setup (SEM, score, NP-hardness)
- [[Directed Acyclic Graphs]] — DAG fundamentals for causal inference
