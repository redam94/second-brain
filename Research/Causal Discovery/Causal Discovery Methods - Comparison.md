---
title: "Causal Discovery Methods - Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.txt]]"
source_location: "Chickering (2002), §1; Spirtes et al. (2000), Ch. 5; Zheng et al. (2018), §2.2"
date_ingested: 2026-08-31
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[CPDAG and Markov Equivalence]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal structure learning comparison"
  - "PC vs GES vs NOTEARS"
---

# Causal Discovery Methods - Comparison

> [!summary]
> The three dominant paradigms for learning causal DAGs from observational data are:
> **constraint-based** (PC), **score-based** (GES), and **continuous optimization** (NOTEARS).
> They differ in assumptions, output format, computational complexity, and practical
> suitability. PC and GES output a [[CPDAG and Markov Equivalence|CPDAG]] (the equivalence
> class of the true DAG); NOTEARS outputs a single DAG (assuming identifiability). The best
> choice depends on graph density, dimensionality, whether the noise is Gaussian, and
> whether the user needs a single DAG or an equivalence class.

## Overview

The [[DAG Structure Learning Problem]] note catalogues the landscape of prior approaches.
As of Zheng et al. (2018), three paradigms dominate:

| Paradigm | Canonical Method | Output | Assumption | Complexity |
|----------|-----------------|--------|-----------|-----------|
| Constraint-based | PC | CPDAG | Faithfulness + CI tests | $O(d^{q+2})$ |
| Score-based | GES | CPDAG | Faithfulness + Gaussian | $O(d^4 q^3)$ |
| Continuous optim. | NOTEARS | Single DAG | Linear SEM | $O(d^3)$ per iter |
| Exact | GOBNILP | True DAG | Bounded in-degree | Exponential |
| Order-based | Order MCMC | CPDAG | Faithfulness | $O(d^2 \cdot d!)$ |

## Main Content

### Paradigm 1: Constraint-Based (PC)

The [[PC Algorithm - Overview]] tests conditional independences directly:
- **Output**: CPDAG (the finest structure identifiable from observational data).
- **Strength**: Non-parametric CI tests available (kernel-based, mixed data); principled
  asymptotic guarantees even for non-Gaussian distributions.
- **Weakness**: CI tests have low power in high dimensions (conditioning on large sets $S$
  inflates type-II error); multiple testing burden; order-dependent output (remedied by PC-stable).
- **Best for**: Moderate $d$ (< 50), non-Gaussian data, or when distributional flexibility
  matters more than efficiency.

### Paradigm 2: Score-Based (GES)

[[GES - Greedy Equivalence Search]] optimizes BIC over the space of CPDAGs:
- **Output**: CPDAG.
- **Strength**: Statistically efficient for Gaussian data; uses all data rather than
  conditioning on subsets; less sensitivity to individual CI test errors.
- **Weakness**: Assumes score-equivalence and Gaussian noise for correctness guarantees;
  BIC penalty requires choosing $\lambda$ (analogous to $\alpha$ in PC).
- **Best for**: Moderate $d$ (< 100), Gaussian data, when statistical efficiency is
  more important than non-parametric flexibility.

### Paradigm 3: Continuous Optimization (NOTEARS)

[[NOTEARS - Overview]] reformulates DAG learning as minimizing a least-squares score
subject to a smooth acyclicity constraint $h(W) = 0$:
- **Output**: Single DAG (weighted adjacency matrix $W$).
- **Strength**: $O(d^3)$ per iteration; no CI tests; simple implementation; gradient-based
  solvers; naturally extends to nonlinear SEMs.
- **Weakness**: Returns a single DAG (not a CPDAG), implicitly requiring identifiability;
  no consistency guarantee for general distributions; sensitive to initialization and
  thresholding.
- **Best for**: Large $d$ (hundreds to thousands), linear Gaussian SEMs, when a single DAG
  estimate is acceptable.

### Identifiability and When the Full DAG is Recoverable

> [!note] When can we recover more than the CPDAG?
> From purely observational data under faithfulness, **the CPDAG is the finest recoverable
> structure** for general distributions. However, additional assumptions enable full DAG
> identification:
>
> - **Non-Gaussian noise (LiNGAM)**: Shimizu et al. (2006) show that for linear SEMs with
>   non-Gaussian noise, the full DAG (not just CPDAG) is identifiable.
> - **Nonlinear additive noise (ANM)**: Hoyer et al. (2009) show identifiability for
>   additive noise models $X_j = f_j(\mathrm{Pa}_j) + \varepsilon_j$.
> - **Functional constraints**: Causal direction can be inferred from asymmetry in model fit.
>
> NOTEARS implicitly exploits the linear SEM structure — for non-Gaussian noise, its
> solution will tend toward the true DAG rather than just any member of the equivalence class.

### Decision Guide

> [!summary] When to use which algorithm
>
> **Use PC when:**
> - Data are non-Gaussian or mixed (continuous + discrete).
> - You need a non-parametric approach.
> - $d < 50$ and you want well-understood asymptotic guarantees.
> - The faithfulness assumption holds but you are unsure about parametric form.
>
> **Use GES when:**
> - Data are approximately Gaussian.
> - You want high statistical power and trust the BIC score.
> - $d < 100$ and computational cost of score evaluation is manageable.
> - You need the equivalence class (CPDAG) rather than a single DAG.
>
> **Use NOTEARS when:**
> - $d$ is large (hundreds or more).
> - Linear SEM is a reasonable model.
> - A single DAG estimate suffices (or you'll post-process to CPDAG).
> - You want gradient-based optimization with automatic differentiation frameworks.
>
> **Use hybrid methods (MMHC, GFCI) when:**
> - You want both constraint-based skeleton discovery and score-based orientation.
> - Latent confounders may be present (use FCI or GFCI output as PAG).

### Connection to ABM Causal Discovery

In the vault's ABM context ([[Approximate Bayesian Computation for ABMs]],
[[Summary Causal DAGs]]), causal structure learning appears as a pre-step before
DAG summarization:

- ABM simulation output $\{(X_t, Y_t, Z_t)\}_{t=1}^T$ can be treated as observational data.
- PC or GES can learn the causal skeleton from ABM outputs (Bonchev & Buck 2005; Grazzini
  & Richiardi 2015).
- The Zeng (2025) DAG summarization method in [[Summary Causal DAGs]] *assumes* the causal
  DAG is given — causal structure learning is the step that would produce that input DAG
  from simulation data.
- For ABM contexts: **GES** on Gaussian-approximated output moments; or **NOTEARS** for
  high-dimensional ABM state spaces.

### Hybrid and Recent Extensions

| Method | Base | Extension |
|--------|------|-----------|
| MMHC | PC + hill-climbing | Skeleton from CI tests, orientation by score |
| FGES | GES | Parallelized; scales to $d = 10{,}000$ |
| PC-stable | PC | Order-independent (fixes variability over variable ordering) |
| FCI / RFCI | PC | Handles latent confounders; output is PAG |
| GFCI | GES + FCI | Combines GES skeleton with FCI orientation |
| DAG-GNN | NOTEARS | Neural network parameterization of the SEM |
| DAGMA | NOTEARS | Log-determinant acyclicity function (avoids numerical issues with matrix exponential) |

## See Also
- [[PC Algorithm - Overview]] — constraint-based algorithm
- [[GES - Greedy Equivalence Search]] — score-based algorithm
- [[NOTEARS - Overview]] — continuous optimization algorithm
- [[CPDAG and Markov Equivalence]] — the CPDAG representation
- [[DAG Structure Learning Problem]] — problem formulation and prior landscape
- [[Summary Causal DAGs]] — downstream use of causal DAGs in ABM contexts
- [[Directed Acyclic Graphs]] — DAG fundamentals and d-separation
