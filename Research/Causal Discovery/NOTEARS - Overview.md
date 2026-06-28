---
title: "NOTEARS - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "Full paper, pp. 1-2 (Abstract, Intro, Contributions)"
date_ingested: 2026-06-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Smooth Characterization of Acyclicity]]"
  - "[[NOTEARS Algorithm]]"
  - "[[NOTEARS Experiments]]"
  - "[[Causal Discovery - Overview]]"
aliases:
  - "DAGs with NO TEARS"
  - "NOTEARS"
  - "Zheng et al. 2018"
  - "Non-combinatorial Optimization via Trace Exponential and Augmented lagRangian for Structure learning"
---

# NOTEARS - Overview

> [!summary]
> **NOTEARS** (Zheng, Aragam, Ravikumar & Xing, 2018) reformulates the NP-hard
> problem of learning the structure of a directed acyclic graph (DAG / Bayesian
> network) from a **combinatorial** search over graphs into a purely **continuous**
> optimization problem over real matrices. The key device is a **smooth, exact**
> algebraic characterization of acyclicity — $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$ —
> which replaces the discrete acyclicity constraint with one equality constraint.
> The resulting program is solved with off-the-shelf numerical solvers (augmented
> Lagrangian + L-BFGS) in ~50 lines of Python, and matches or beats specialized
> state-of-the-art structure-learning algorithms.

## Overview

Learning DAGs from data is NP-hard ([Chickering, 1996; Chickering et al., 2004]),
**mainly because of the acyclicity constraint**: the space $\mathbb{D}$ of DAGs on $d$
nodes is combinatorial and grows *superexponentially* in $d$. Essentially all prior
score-based methods cope with this by **local heuristics** — order search, greedy
edge addition, coordinate descent — that add/remove one edge at a time and check
acyclicity incrementally, often requiring structural assumptions (bounded in-degree
or treewidth) that are impossible to verify in real data.

NOTEARS makes a *fundamentally different* move. It converts the combinatorial program
(left) into a continuous one (right):

$$
\min_{W \in \mathbb{R}^{d\times d}} F(W) \quad \text{subject to} \quad \mathsf{G}(W) \in \mathbb{D}
\qquad\Longleftrightarrow\qquad
\min_{W \in \mathbb{R}^{d\times d}} F(W) \quad \text{subject to} \quad h(W) = 0
$$

Here $W$ is the weighted adjacency matrix of a linear structural equation model (SEM),
$F$ is a (regularized least-squares) score, and $h$ is the smooth acyclicity function.
Because the two programs are *equivalent*, NOTEARS eliminates the need for any
graph-specialized search machinery — it just runs a numerical solver over $\mathbb{R}^{d\times d}$.

## Main Content

### The four contributions

1. **Smooth acyclicity function** with computable derivatives over $\mathbb{R}^{d\times d}$,
   replacing the combinatorial constraint $\mathsf{G}\in\mathbb{D}$ with a smooth equality
   constraint. See [[Smooth Characterization of Acyclicity]].
2. **An equality-constrained program (ECP)** that jointly estimates the structure and
   parameters of a sparse DAG from (possibly high-dimensional) data, solvable by standard
   numerical solvers to stationarity. See [[NOTEARS Algorithm]].
3. **Empirical effectiveness** against state-of-the-art baselines (FGS, PC, GES, LiNGAM).
   See [[NOTEARS Experiments]].
4. **Comparison to the exact global minimizer** (GOBNILP): NOTEARS attains scores close
   to global optimality in practice despite only being *guaranteed* to find stationary points.

### Why the name

> [!note] NOTEARS = **N**on-combinatorial **O**ptimization via **T**race **E**xponential
> and **A**ugmented lag**R**angian for **S**tructure learning. The method is deliberately
> simple — implementable in ~50 lines of Python — and requires *no* background in graphical
> models. Code: <https://github.com/xunzheng/notears>.

### Intellectual lineage / analogy

The authors frame NOTEARS by analogy to **undirected** graphical models: there, recasting
structure learning as a continuous **log-det convex program** ([Banerjee et al., 2008])
sparked rapid progress. DAG learning had never benefited similarly because of the acyclicity
constraint. NOTEARS supplies the missing "closed-form, continuous program" for the *directed*
case — though unlike the undirected case the resulting program is **nonconvex**.

## Connections

- **Generalizes the modeling target**: operates on the continuous space $\mathbb{R}^{d\times d}$
  rather than the discrete DAG space $\mathbb{D}$ — see [[DAG Structure Learning Problem]].
- **Contrast with local search**: prior methods (FGS, GES, hill-climbing, MMHC) do *local*
  edge-at-a-time updates; NOTEARS does *global* updates of the entire matrix $W$ each step.
- **Relates to linear SEM**: the weighted adjacency matrix *is* the coefficient matrix of a
  linear SEM — see [[Confirmatory Factor Analysis and SEM]] for the Bayesian-SEM treatment of
  structural equation models, and [[Spurious Association and Confounds]] for DAG semantics in
  causal inference.

## See Also
- [[DAG Structure Learning Problem]] — the score-based / SEM formulation NOTEARS builds on
- [[Smooth Characterization of Acyclicity]] — the central theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)
- [[NOTEARS Algorithm]] — how the continuous program is actually solved
- [[NOTEARS Experiments]] — empirical results and benchmarks
- [[Causal Discovery - Overview]] — the broader constraint-/score-based discovery landscape
- [[Causal Discovery/_Index|Causal Discovery Index]]
