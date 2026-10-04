---
title: "Causal Discovery Methods - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/kalisch-buhlmann-2007-pc-algorithm.md]]"
source_location: "§1 Introduction, pp. 613–615"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal structure learning overview"
  - "DAG learning methods comparison"
  - "constraint-based vs score-based"
---

# Causal Discovery Methods - Overview

> [!summary]
> Causal discovery / structure learning learns the skeleton and orientation of a DAG from data.
> Three main paradigms exist: **constraint-based** methods (PC algorithm) test conditional
> independence relations; **score-based** methods (GES) maximize a score over Markov equivalence
> classes; and **continuous optimization** methods (NOTEARS) relax the acyclicity constraint to
> solve a smooth program. All three target the CPDAG of the true DAG under faithfulness, though
> they differ in assumptions, output, scalability, and sensitivity to errors. Extensions handle
> latent variables (FCI), non-Gaussian noise (LiNGAM), and time series (PCMCI).

## Overview

The three core paradigms were introduced at different times but are now unified by the insight
that causal structure is identifiable from observational data up to the Markov equivalence class,
under the Causal Markov Condition and Faithfulness (see [[Constraint-Based Causal Discovery]]).
All methods ultimately target the **CPDAG** of the true DAG (see [[Markov Equivalence and CPDAGs]]).

## Main Content

### The three paradigms

| Paradigm | Algorithm | Key idea | Output | Reference |
|----------|-----------|----------|--------|-----------|
| Constraint-based | **PC** | Test CI relations; build skeleton then orient | CPDAG | Spirtes & Glymour 1991 |
| Score-based | **GES** | Greedy search over CPDAGs by BIC score | CPDAG | Chickering 2002 |
| Continuous optimization | **NOTEARS** | Smooth acyclicity constraint; augmented Lagrangian | Weighted DAG $W$ | Zheng et al. 2018 |

See the dedicated notes [[PC Algorithm]], [[GES Algorithm]], [[NOTEARS - Overview]] for full details.

### Assumptions comparison

| Assumption | PC | GES | NOTEARS |
|------------|-----|-----|---------|
| Causal Markov Condition | Required | Required | Not explicitly required (SEM implies CMC) |
| Faithfulness | Required (for orientation) | Required (for consistency) | Not required |
| Causal sufficiency (no latent confounders) | Required | Required | Required |
| Functional form | Nonparametric | Nonparametric (via score) | Linear SEM |
| Noise distribution | Any (CI test determines) | Gaussian (BIC) / Discrete (BDeu) | Non-Gaussian ok; Gaussian has identifiability issues |

> [!note] When faithfulness is problematic
> Faithfulness fails when causal effects cancel (e.g., two paths of equal and opposite strength).
> This is more common in dense graphs and in systems with feedback (after linearization).
> NOTEARS is more robust here because it doesn't rely on CI tests.

### Scalability and practical performance

| Algorithm | Complexity | Sparse graphs | Dense graphs | High-$p$ ($p \gg n$) |
|-----------|------------|---------------|--------------|----------------------|
| PC | $O(p^{q+2})$, $q$=max degree | Fast | Slow | Consistent if $q = O(\log n)$ |
| GES / FGES | $O(p^4)$ per iteration (FGES: faster) | Good | Good | Consistent for fixed $p$; FGES scales to $p \sim 10^5$ |
| NOTEARS | $O(d^3)$ per L-BFGS step | Good | Good | Requires sparse penalty ($\lambda$) |

In the [[NOTEARS Experiments]] benchmark, NOTEARS outperforms FGS (FGES) decisively on
dense/large graphs, and the two are comparable on sparse graphs.

### Extensions and variants

**Relaxing causal sufficiency (latent variables):**
- **FCI** (Fast Causal Inference, Spirtes et al. 2000): extends PC to allow latent confounders;
  returns a **PAG** (Partial Ancestral Graph) with bidirected edges ($X \leftrightarrow Y$)
  representing latent common causes.
- **RFCI** (Really Fast Causal Inference, Colombo et al. 2012): computationally lighter version
  of FCI; fewer CI tests.

**Exploiting non-Gaussianity (full DAG identifiability):**
- **LiNGAM** (Shimizu et al. 2006): under non-Gaussian linear SEM, the full DAG (not just CPDAG)
  is identifiable using ICA. NOTEARS experiments include LiNGAM as a baseline.
- **ANM** (Additive Noise Models, Hoyer et al. 2009): non-linear additive noise; full DAG
  identifiable under non-Gaussian noise.

**Time series:**
- **PCMCI** (Runge et al. 2019): PC algorithm adapted for autocorrelated time series; handles
  the Granger causality problem with rigorous CI testing. Directly applicable to ABM simulated
  trajectories.
- **VARLiNGAM**: LiNGAM combined with VAR models for time series.

**Scalable score-based:**
- **BOSS** (Bryant et al. 2023): Bayesian Order-Based Structure Search; consistently outperforms
  FGES in recent benchmarks by exploiting ordering structure.
- **DAG-GNN**, **DYNOTEARS**, **GOLEM**: continuous optimization extensions of NOTEARS to
  non-linear and time-series settings.

### When to use which method

```
Use PC when:
  ✓ Graph is sparse (few edges per node)
  ✓ Good nonparametric CI tests are available (kernel CI, CMI)
  ✓ Fast skeleton construction is needed
  ✗ Dense graphs: exponentially more CI tests

Use GES / FGES when:
  ✓ Gaussian data with reliable BIC computation
  ✓ Dense graphs (score more robust than many CI tests)
  ✓ Large p (FGES implementation handles p ~ 10^5)
  ✗ Non-Gaussian or mixed data (use non-parametric score)

Use NOTEARS when:
  ✓ Linear SEM is a reasonable assumption
  ✓ Want a single DAG (not a CPDAG) with edge weights
  ✓ Simple implementation and integration into gradient-based pipelines
  ✗ Need valid CPDAGs for causal identification
  ✗ Non-linear relationships (use NOTEARS-MLP extension)
```

### Connection to vault themes

- **ABM structure learning**: [[Summary Causal DAGs]] (Zeng 2025) assumes the DAG is given;
  PC or GES applied to ABM simulation outputs would provide that DAG. The PCMCI variant is
  especially suited to the time series output of CUBES/Karakaya simulations.
- **Expert elicitation + data**: [[LLM Expert Elicitation for Bayesian Networks]] and
  [[BN Construction Methods Comparison]] describe eliciting structure from domain experts.
  Combining expert elicitation with PC/GES on data is a hybrid approach: use the expert graph
  as a prior, then refine with data-driven structure learning.
- **Bayesian networks vs causal DAGs**: [[Bayesian Networks - Foundational Methodology]] (gap #21
  in [[Dream/_Index|Dream Index]]) covers the probabilistic inference side; this note covers
  the structure *learning* side. Both use CPDAGs as the representational target.

## See Also
- [[PC Algorithm]] — full constraint-based algorithm
- [[GES Algorithm]] — full score-based algorithm
- [[NOTEARS - Overview]] — continuous optimization approach
- [[Constraint-Based Causal Discovery]] — assumptions and paradigm for PC
- [[Score Functions for Structure Learning]] — BIC, BDeu, BGe
- [[Markov Equivalence and CPDAGs]] — what all three methods target
- [[DAG Structure Learning Problem]] — problem setup and NOTEARS's landscape table of methods
