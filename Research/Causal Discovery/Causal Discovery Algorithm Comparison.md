---
title: "Causal Discovery Algorithm Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/GES-Chickering-2002-source-notes.md]]"
source_location: "Chickering (2002), §4–5; Heinze-Deml, Maathuis & Meinshausen (2018), Annual Review"
date_ingested: 2026-08-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by: []
aliases:
  - "PC vs GES"
  - "structure learning comparison"
  - "causal discovery algorithms overview"
---

# Causal Discovery Algorithm Comparison

> [!summary]
> This note compares the three major causal structure learning approaches in the vault:
> **PC** (constraint-based, CI tests, Spirtes et al. 2000), **GES** (score-based, CPDAG
> search, Chickering 2002), and **NOTEARS** (continuous optimization, linear SEM, Zheng
> et al. 2018). Each occupies a different niche: PC is statistically interpretable and
> high-dimensional; GES is data-efficient with theoretical guarantees; NOTEARS is fast
> and simple to implement but assumes linear SEMs.

## Overview

Three paradigms dominate modern causal structure learning:

| Paradigm | Method | Search space | Key input | Output |
|----------|--------|-------------|-----------|--------|
| **Constraint-based** | PC | Edges via CI tests | CI oracle / test | CPDAG |
| **Score-based** | GES | CPDAG space | Score (BIC/BDe) | CPDAG |
| **Continuous optimization** | NOTEARS | $\mathbb{R}^{d\times d}$ (weighted adjacency) | LS loss + acyclicity | DAG |

## Detailed Comparison

### Assumptions

| Assumption | PC | GES | NOTEARS |
|------------|-----|-----|---------|
| Causal Markov condition | ✓ Required | ✓ Required | ✓ Required (linear SEM) |
| Faithfulness | ✓ Required | ✓ Required | — (Not explicitly) |
| Causal sufficiency | ✓ Required | ✓ Required | ✓ Required |
| Linearity | Not required | Not required | ✓ Required |
| Gaussian noise | Not required | Not required | Not required |
| Fixed graph structure | — | — | ✓ (scores as LS loss) |

**Key difference**: PC and GES are nonparametric in their CI/score formulations and do
not require linearity. NOTEARS targets the linear SEM and scores via least-squares loss,
making it misspecified for nonlinear causal relationships.

### Output: DAG vs CPDAG

| | PC | GES | NOTEARS |
|-|-----|-----|---------|
| **Output** | CPDAG | CPDAG | DAG (single) |
| **Identifiability** | Equivalence class only | Equivalence class only | Returns one DAG; may be any DAG in the equivalence class |
| **Directed edges** | Identifiable directions only | Identifiable directions only | All edges directed (may misidentify non-identifiable ones) |

> [!note] NOTEARS Returns a Single DAG
> NOTEARS outputs one weighted adjacency matrix $\hat{W}$, which represents a single
> DAG — not a CPDAG. In general, this DAG may be any member of the true Markov
> equivalence class (or even a wrong one). For causal interpretation, the user should
> be aware that undirected edges in the true CPDAG may be arbitrarily assigned by
> NOTEARS. PC and GES are conservative and honest about this ambiguity.

### Statistical Properties

| Property | PC | GES | NOTEARS |
|----------|-----|-----|---------|
| **Consistency** | Yes (oracle CI) → finite-sample w/ regularity | Yes (locally consistent score, $n \to \infty$) | Yes (high-dim LS consistency, van de Geer & Bühlmann 2013) |
| **Efficiency** | Less efficient (each CI test uses only one conditioning set) | More efficient (score uses all data jointly) | Depends on LS estimator |
| **High-dimensional** | Yes ($p \gg n$ under sparsity, Kalisch & Bühlmann 2007) | Requires $n > p$ for reliable BIC | Designed for high-dim; regularised LS |
| **Tuning parameter** | Significance level $\alpha$ | None (score-based) | $\lambda$ (L1 regularization) |
| **Order dependence** | Original PC: yes; PC-stable: no | No | No (continuous optimization) |

### Computational Complexity

| | PC | GES | NOTEARS |
|-|-----|-----|---------|
| **Sparse graph** | $O(p^{d+2})$ CI tests | $O(p^{d+1})$ score evaluations | $O(p^3)$ per L-BFGS step |
| **Dense graph** | $O(2^p)$ (exponential) | $O(p^2 \cdot 2^p)$ | $O(p^3 \cdot T)$ where $T$ = number of dual steps |
| **Practical limit (vanilla)** | $p \lesssim 1{,}000$ (sparse) | $p \lesssim 100$ (vanilla GES) | $p \lesssim 1{,}000$ |
| **Optimised variants** | — | FGES: $p \sim 10{,}000$ | — |

### Identifiability Beyond the CPDAG

Under the three standard assumptions, all three algorithms identify at most the
CPDAG. To recover the **full DAG** uniquely, additional structure is needed:

| Additional assumption | Method | Identifiable? |
|----------------------|--------|--------------|
| Linear non-Gaussian noise (≥1 non-Gaussian) | LiNGAM | Full DAG |
| Equal error variances | Peters & Bühlmann 2014 | Full DAG |
| Nonlinear additive noise | ANM (Hoyer et al. 2009) | Full DAG |
| Interventional data | IDA, ICP | Partial or full DAG |

### Practical Guidance

> [!note] When to Use Which Algorithm
>
> **Use PC when**:
> - You need high-dimensional consistency ($p \gg n$): PC with partial correlation tests
>   is consistent for $p = O(n^a)$ under Gaussianity and sparsity.
> - The CI test is well-calibrated and interpretable (you want to know *which* CI tests
>   fired and with which conditioning sets).
> - You have discrete or non-parametric data with a natural CI test.
> - Data are non-linear (use a kernel-based CI test).
>
> **Use GES when**:
> - You have a well-specified score function (BIC for Gaussian/linear, BDe for discrete).
> - $n$ is moderate and $p < n$ (or $p$ slightly larger with BIC correction).
> - You want no tuning parameter (GES is parameter-free once the score is chosen).
> - Statistical efficiency matters more than high-dimensional scaling.
>
> **Use NOTEARS when**:
> - The linear SEM assumption is reasonable.
> - You want implementation simplicity (50 lines of Python).
> - You are in a pipeline that requires a differentiable structure learning step
>   (gradient-based integration with other losses).
> - You need speed: augmented Lagrangian converges in <10 dual steps for typical problems.
> - You are willing to accept a single DAG output rather than a CPDAG.

### Empirical Comparison (from NOTEARS experiments)

From [[NOTEARS Experiments]], comparing PC, GES (FGS), and NOTEARS on random Erdős-Rényi
DAGs with $d = 20$ nodes:

| Setting | FGS (GES variant) | PC | NOTEARS |
|---------|-------------------|-----|---------|
| Sparse, Gaussian | Competitive | Competitive | **Best SHD** |
| Dense, Gaussian | Degrades | **Worst** | **Best** |
| Non-Gaussian | Competitive | Competitive | Competitive |

NOTEARS shows the largest advantage on **dense graphs** where the CI test approach of PC
runs into the exponential conditioning set problem and GES's score function has high
variance from dense local neighbourhoods.

### Software Landscape

| Package | Language | Includes |
|---------|----------|---------|
| `pcalg` | R | PC (stable), GES, LINGAM, FCI, IDA |
| `causal-learn` | Python | PC, GES, FCI, LINGAM, NOTEARS, DirectLiNGAM |
| `gCastle` | Python | PC, GES, FGES, NOTEARS, RL-BIC, CORL |
| `Tetrad` | Java | PC, FCI, GES, FGES, GFCI (GUI + API) |
| `py-causal` | Python | Wraps Tetrad |
| `notears` (GitHub) | Python | NOTEARS, NOTEARS-MLP, NOTEARS-SOB |

## Connections

- [[PC Algorithm - Overview]] — the constraint-based algorithm
- [[GES - Greedy Equivalence Search]] — the score-based algorithm
- [[NOTEARS - Overview]] — the continuous-optimization algorithm
- [[DAG Structure Learning Problem]] — the landscape of all three in context
- [[Summary Causal DAGs]] — downstream use of learned DAGs

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — why PC and GES output CPDAGs
- [[Constraint-Based Skeleton Learning]] — the CI-testing phase of PC
- [[V-Structures and Meek Orientation Rules]] — shared orientation machinery
- [[Approximate Bayesian Computation for ABMs]] — alternative for ABM structure learning (non-DAG)
