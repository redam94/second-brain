---
title: "Causal Structure Learning - Paradigm Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000); Chickering (2002); Zheng et al. (2018, NeurIPS) — survey based on canonical literature"
source_location: "Cross-cutting overview; primary references: SGS (2000) Ch. 5; Chickering (2002) JMLR 3:507–554; Zheng et al. (2018)"
date_ingested: 2026-09-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by: []
aliases:
  - "causal discovery paradigms"
  - "structure learning overview"
  - "PC vs GES vs NOTEARS"
---

# Causal Structure Learning - Paradigm Overview

> [!summary]
> Three main paradigms exist for learning the structure of a causal DAG from observational data:
> **constraint-based** methods (PC algorithm) test conditional independence to trim a full graph;
> **score-based** methods (GES) greedily optimize a decomposable score over equivalence classes;
> and **continuous optimization** methods (NOTEARS and its variants) reformulate DAG learning as
> a smooth constrained program. All three recover the CPDAG (or a DAG) under faithfulness and
> consistency conditions, but differ in computational scaling, distributional assumptions,
> finite-sample behavior, and conceptual machinery. This note is the high-level routing map
> for the vault's causal discovery cluster.

## Overview

The **causal structure learning** problem asks: given $n$ i.i.d. observations of $p$ variables,
recover the DAG $\mathcal{G}^*$ — or its CPDAG — that causally generated the data. See
[[DAG Structure Learning Problem]] for the formal setup.

Three paradigms have dominated:

| Paradigm | Representative Method | Search Space | Data Requirement |
|----------|----------------------|-------------|-----------------|
| **Constraint-based** | [[PC Algorithm]] | Tests of CI | Any (pluggable CI test) |
| **Score-based** | [[GES Algorithm]] | CPDAG space | Decomposable score (e.g. BIC) |
| **Continuous optimization** | [[NOTEARS - Overview]] | $\mathbb{R}^{d\times d}$ | Linear SEM (Gaussian or non-Gaussian) |

## Main Content

### Constraint-based: PC algorithm

**Core idea:** Conditional independence implies absence of an edge (faithfulness); so test all
pairs, condition on subsets, trim the graph. Detect v-structures from separation sets; apply
Meek rules. See [[PC Algorithm]] for full details.

**Strengths:**
- Distributional flexibility (plug in any CI test: Gaussian, discrete, kernel-based)
- Naturally handles non-Gaussian and nonlinear settings with appropriate CI tests
- Clear statistical interpretation: each edge removal is a hypothesis test

**Weaknesses:**
- Order-dependent skeleton (fixed in PC-stable)
- Sensitive to CI test errors (Type I/II) which compound across tests
- Computationally bottlenecked by the number of CI tests: $O(p^{q+2})$

### Score-based: GES

**Core idea:** Decomposable scores (BIC, BDe) are constant within Markov equivalence classes,
so search over CPDAGs directly. Two greedy phases (forward insert + backward delete) guaranteed
to reach the true CPDAG under faithfulness. See [[GES Algorithm]] for full details.

**Strengths:**
- Provably consistent (Chickering 2002) — recovers true CPDAG as $n\to\infty$
- Strong finite-sample accuracy when score is well-specified (Gaussian + BIC)
- Faster than exhaustive search by leveraging CPDAG structure

**Weaknesses:**
- Requires specifying a parametric score
- Greedy local search degrades on **dense, high-in-degree** graphs (hub nodes in scale-free graphs)
- Still combinatorial search — FGS/fast GES scales to $p \sim 10{,}000$ but is $O(p^2 \cdot 2^q)$

### Continuous optimization: NOTEARS

**Core idea:** Replace the combinatorial DAG constraint $\mathcal{G}(W) \in \mathbb{D}$ with the
smooth acyclicity function $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$ and solve with standard
numerical solvers. See [[NOTEARS - Overview]] for full details.

**Strengths:**
- **Simple implementation** (~50 lines of Python, no graphical-model machinery)
- **Global** matrix updates — handles hub nodes and dense graphs better than local search
- Scales to $p \sim 100$ nodes with $O(d^3)$ per iteration (matrix exponential)
- Matches or beats FGS/GES on dense scale-free graphs ([[NOTEARS Experiments]])

**Weaknesses:**
- Assumes **linear SEM** (extensions exist: NOTEARS-MLP for non-linear, NOTEARS-LR for binary)
- Only guaranteed to find **stationary points** (not global optimum) due to nonconvexity
- $O(d^3)$ cost of matrix exponential is the bottleneck; recent methods (DAGMA) use cheaper $h$

### Shared assumptions and identifiability limits

All three paradigms share:
- **Acyclicity**: the true DGP is a DAG
- **Causal Markov Condition**: the distribution is Markov to the true graph
- **Faithfulness**: no accidental conditional independences beyond those implied by the graph
- **Causal sufficiency** (PC, GES): no hidden common causes — FCI, RFCI relax this

Under these assumptions, the **best identifiable object** from observational data is the
**CPDAG** of $\mathcal{G}^*$ — not the full DAG. See [[Markov Equivalence Classes and CPDAGs]].

Additional assumptions break equivalences:
- **Non-Gaussianity of noise** (LiNGAM, Shimizu et al. 2006): identifies a unique DAG
- **Non-linear mechanisms with additive Gaussian noise** (ANM): generically identifies DAG
- **Interventional data**: breaks symmetries in the CPDAG

### Choosing a paradigm

| Situation | Recommended method |
|-----------|-------------------|
| Gaussian data, moderate $p$ | **GES** (best theoretical guarantees + strong finite-sample) |
| Non-Gaussian / discrete / nonlinear data | **PC** with appropriate CI test |
| Dense graphs, hub nodes, scalability | **NOTEARS** (or DAGMA/GOLEM for variants) |
| Need to handle hidden confounders | **FCI** (constraint-based extension of PC) |
| High-dimensional ($p \gg n$), sparse | **PC** (sparse skeleton → few conditioning sets) |
| Want simplest implementation | **NOTEARS** (~50 lines) |

## Connections

- [[PC Algorithm]] — constraint-based; pluggable CI tests; CPDAG output
- [[GES Algorithm]] — score-based; CPDAG space search; Meek Conjecture
- [[NOTEARS - Overview]] — continuous optimization; single DAG output
- [[Markov Equivalence Classes and CPDAGs]] — the shared output object (CPDAG)
- [[Conditional Independence Tests for Structure Learning]] — the CI tests PC uses
- [[DAG Structure Learning Problem]] — formal problem statement and landscape table

## See Also
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, back-door criterion) for causal *reasoning*
- [[Summary Causal DAGs]] — causal DAG summarization (post-learning step)
- [[LLM Expert Elicitation for Bayesian Networks]] — alternative: building DAGs from expert knowledge
- [[Approximate Bayesian Computation for ABMs]] — ABM outputs as observational data for structure learning
