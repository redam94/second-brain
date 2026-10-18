---
title: "Causal Discovery Methods Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/SpirtesGlymourScheines2000-PC-reference.md]]"
source_location: "Synthesized from Spirtes et al. (2000), Chickering (2002), Zheng et al. (2018), and survey literature"
date_ingested: 2026-10-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[BN Construction Methods Comparison]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal structure learning comparison"
  - "PC GES NOTEARS comparison"
---

# Causal Discovery Methods Overview

> [!summary]
> Causal structure learning aims to recover a DAG (or equivalence class of DAGs) from
> observational data. Three algorithmic paradigms now dominate: **constraint-based** methods
> ([[PC Algorithm]] — test CIs, recover skeleton and v-structures), **score-based** methods
> ([[Greedy Equivalence Search (GES)]] — greedily maximize a score over CPDAGs), and
> **continuous optimization** methods ([[NOTEARS - Overview]] — minimize a continuous score
> subject to a smooth acyclicity constraint). Each paradigm makes different assumptions,
> has different failure modes, and scales differently. This note synthesizes the comparison.

## Overview

All three paradigms share a common setup: given $n$ i.i.d. observations of $(X_1,\ldots,X_d)$,
recover the causal graph. They differ in:
- **What they optimize**: CI tests vs. a score vs. a penalized continuous loss
- **What they return**: CPDAG (PC, GES) vs. a DAG (NOTEARS) vs. neither (FCI)
- **What assumptions they need**: faithfulness + sufficiency (PC, GES) vs. functional
  form (NOTEARS with non-Gaussian noise for full DAG identification)
- **How they scale**: CI tests are slow for non-Gaussian data; score computations are fast

## Main Content

### The Three Paradigms at a Glance

| Property | PC | GES | NOTEARS |
|----------|------|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Core operation** | CI tests | Score maximization (BIC) | Penalized regression + acyclicity |
| **Search space** | Adjacency sets → skeleton | CPDAG space | $\mathbb{R}^{d\times d}$ |
| **Output** | CPDAG | CPDAG | Weighted DAG $W$ |
| **Requires faithfulness?** | Yes | Yes | No (but consistent only if true) |
| **Requires causal sufficiency?** | Yes (else use FCI) | Yes | Yes |
| **Parametric assumption?** | Depends on CI test | Gaussian (BIC) | Linear SEM (Gaussian or not) |
| **Consistency** | $n \to \infty$ (oracle CI) | $n \to \infty$ (consistent score) | Stationary point; no CPDAG guarantee |
| **Scales to large $d$?** | Polynomial (sparse), bad (dense) | $O(d^4)$ sparse | $O(d^3)$ per step |
| **Reference** | Spirtes et al. (2000) | Chickering (2002) | Zheng et al. (2018) |

### Shared Assumptions

All three algorithms (in their basic forms) assume:

1. **Acyclicity**: The true data-generating process is a DAG (no feedback loops).
2. **Causal sufficiency**: All common causes of observed variables are themselves observed.
   Violation leads to spurious edges; [[PC Algorithm]] relaxes this via FCI.
3. **i.i.d. data**: Observations are exchangeable.

PC and GES additionally require **faithfulness**. NOTEARS requires the linear SEM model
to be correctly specified.

### When to Use Each Method

> [!note] Practical Guidance
>
> **Use PC when:**
> - You need interpretable, step-by-step reasoning about why each edge was included/excluded.
> - Your data is non-Gaussian and you have a good non-parametric CI test (kernel-based).
> - The graph is sparse (bounded degree) — PC is fastest here.
> - You suspect hidden confounders → use the FCI variant.
>
> **Use GES when:**
> - Your data is approximately Gaussian (BIC is well-calibrated).
> - You want consistency guarantees without specifying a parametric CI test.
> - The graph may be moderately dense — GES handles this better than PC.
> - You need a fast, off-the-shelf solution: `ges()` in pcalg or causal-learn.
>
> **Use NOTEARS when:**
> - You want a *single* DAG (not an equivalence class), especially for downstream use in
>   an SEM or for visualizing edge weights.
> - You can assume a linear SEM, and potentially leverage non-Gaussianity for full identifiability.
> - You need Python-native, differentiable structure learning (e.g., for gradient-based
>   hyperparameter optimization or integration with neural networks).
> - $d$ is very large (hundreds+) — NOTEARS's $O(d^3)$ per iteration is more tractable.

### Failure Modes and Limitations

| Issue | PC | GES | NOTEARS |
|-------|------|-----|---------|
| **Faithfulness violation** | Incorrect skeleton | Inconsistent | N/A (different issue) |
| **Hidden confounders** | Spurious edges | Spurious edges | Spurious edges |
| **Finite sample CI tests** | Order-dependent; PC-stable helps | Score selection bias | Non-identifiability of stationary pts |
| **Dense graphs** | Exponential in degree | $O(d^4)$ | $O(d^3)$ per step |
| **Non-linear relationships** | Needs nonparametric CI test | Needs non-linear score | Misspecified; use DAG-GNN variants |
| **Output** | CPDAG (not a unique DAG) | CPDAG (not a unique DAG) | DAG (overfit risk without thresholding) |

### Identifiability Beyond the CPDAG

The CPDAG is the finest identification that is achievable from observational i.i.d. data
under the Markov + faithfulness assumptions. Full DAG identification requires additional
structural constraints:

> [!theorem] Identifiability Results (Summary)
>
> 1. **Non-Gaussian noise (LiNGAM):** If the noise is non-Gaussian, Shimizu et al. (2006)
>    showed the DAG is identifiable up to the true graph (ICA-based method).
>
> 2. **Equal-variance Gaussian noise:** Peters & Bühlmann (2014) showed identifiability of
>    the true DAG when noise variances are all equal.
>
> 3. **Additive noise models (ANM):** Peters et al. (2014) showed that if $X_j = f_j(\mathrm{Pa}(X_j)) + \varepsilon_j$
>    with nonlinear $f_j$ and non-Gaussian $\varepsilon_j$, the DAG is identifiable.
>
> NOTEARS can exploit identifiability (1) and (2) with appropriate score functions,
> recovering the full DAG rather than just the CPDAG.
^thm-identifiability

### Connection to Bayesian Network Structure Learning

Causal structure learning is closely related to **Bayesian network structure learning**,
but the goal differs:
- **BN structure learning**: find a DAG that maximizes a Bayesian score (BDe, BIC) for
  *prediction* — the directed graph is a computational device for factorizing the joint.
- **Causal structure learning**: find a DAG that represents *causal mechanisms*, enabling
  prediction under interventions (do-calculus).

GES straddles both goals: BIC optimization is a BN structure learning criterion, but under
faithfulness and causal sufficiency, the output CPDAG is also the correct causal CPDAG.
See [[BN Construction Methods Comparison]] for the broader BN construction context.

### ABM Application Context

For the vault's ABM work, causal structure learning connects in two ways:

1. **ABM output → structure learning**: ABM simulations generate synthetic data from a
   known causal model. Running PC or GES on the synthetic data can validate whether the
   assumed model structure is recoverable from realistic sample sizes.

2. **Observational data → DAG → ABM model**: In the Zeng (2025) summarization work
   ([[Summary Causal DAGs]]), the causal DAG is assumed known. Structure learning from
   observational data (using PC, GES, or NOTEARS) is the step that *produces* this DAG —
   the precursor to DAG summarization.

## Connections

- **DAG reasoning** ([[Directed Acyclic Graphs]]): PC and GES produce a CPDAG, which
  inherits all DAG semantics (backdoor, d-separation, do-calculus).
- **SEM** ([[DAG Structure Learning Problem]]): All three methods work with linear SEMs;
  NOTEARS is explicit about the SEM parameterization.
- **BN construction** ([[BN Construction Methods Comparison]]): PC and GES are standard BN
  structure learning algorithms; this note situates them in the causal discovery context.
- **ABM calibration** ([[Approximate Bayesian Computation for ABMs]]): structure learning
  could be applied to ABM output data to recover the model's causal graph.
- **Causal DAG summarization** ([[Summary Causal DAGs]]): structure learning is the
  upstream step that produces the DAG which summarization then compresses.

## See Also
- [[PC Algorithm]] — constraint-based; CI test-based; returns CPDAG
- [[Greedy Equivalence Search (GES)]] — score-based; BIC; returns CPDAG
- [[NOTEARS - Overview]] — continuous optimization; returns weighted DAG
- [[Markov Equivalence Classes and CPDAGs]] — the identification limit of observational discovery
- [[Directed Acyclic Graphs]] — DAG semantics
- [[BN Construction Methods Comparison]] — broader BN construction methods
