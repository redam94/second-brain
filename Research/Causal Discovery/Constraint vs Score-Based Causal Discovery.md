---
title: "Constraint vs Score-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-sources.md]]"
source_location: "Zheng et al. (2018) §2.2; Chickering (2002); Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[GES Algorithm - Overview]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal structure learning methods comparison"
  - "PC vs GES vs NOTEARS"
  - "paradigms of causal discovery"
---

# Constraint vs Score-Based Causal Discovery

> [!summary]
> Causal structure learning from observational data has three main algorithmic paradigms:
> **constraint-based** (PC, FCI), **score-based** (GES, FGES), and **continuous optimization**
> (NOTEARS). All three recover the Markov equivalence class of the true DAG (as a CPDAG)
> under faithfulness and causal sufficiency. They differ in what they optimize (CI tests vs.
> a score function vs. a continuous loss), their sensitivity to finite-sample errors,
> computational scaling, and the assumptions they stress most. This note is the synthesis
> bridge connecting the PC and GES notes to the existing NOTEARS coverage in the vault.

## Overview

The three paradigms share a common goal but differ fundamentally in methodology:

| Paradigm | Algorithm | Core idea | Output |
|----------|-----------|-----------|--------|
| Constraint-based | PC, FCI | Test conditional independences; prune graph | CPDAG (or PAG for FCI) |
| Score-based (combinatorial) | GES, FGES | Maximize decomposable score over CPDAGs | CPDAG |
| Score-based (continuous) | NOTEARS | Minimize continuous loss with smooth acyclicity constraint | DAG (single graph, not equivalence class) |

## Main Content

### Shared assumptions

All three methods assume:

> [!definition] Common Assumptions for Causal Discovery
> 1. **Causal Markov condition**: the distribution $\mathbb{P}$ is Markov with respect to $G^*$.
> 2. **Faithfulness**: every CI in $\mathbb{P}$ corresponds to a d-separation in $G^*$.
>    This is the **most critical shared assumption** — all three methods rely on it.
> 3. **Causal sufficiency**: no latent confounders. (FCI relaxes this; NOTEARS and GES
>    do not.)
>
> Under these assumptions, **observational data can identify the Markov equivalence class**
> — the CPDAG — but not the full DAG.
^def-shared-assumptions

### Constraint-based: PC and FCI

**Mechanism**: Conduct a sequence of CI tests ($X_i \perp\!\!\!\perp X_j \mid S$?) to
prune the skeleton, then orient v-structures and apply Meek's rules.

**What can go wrong in finite samples**:
- CI tests have **Type I errors** (false rejections) and **Type II errors** (false
  acceptances). A single wrong test result can cascade: a falsely removed edge corrupts
  the separating sets, which corrupts v-structure orientation, which corrupts Meek
  propagation.
- The **order-dependence** problem of the original PC (fixed by PC-stable).
- Faithfulness violations: if path coefficients cancel (accidental CIs), PC removes
  true edges.

**Strengths**:
- Computationally efficient for **sparse** graphs (bounded neighborhood size $q$):
  $O(d^{q+2})$ CI tests.
- **High-dimensional consistency** (Kalisch & Bühlmann 2007): consistent even when
  $d \gg n$ under Gaussian model and sparsity.
- No model specification required beyond the distributional family for CI tests.
- **FCI variant**: handles latent confounders by outputting a PAG instead of a CPDAG.

### Score-based (combinatorial): GES and FGES

**Mechanism**: Greedily maximize BIC (or BDeu) over the space of CPDAGs in two phases
(FES: add edges; BES: remove edges).

**What can go wrong in finite samples**:
- The greedy search can get stuck in **local optima** of the score landscape.
- BIC finite-sample behavior may favor over- or under-sparse graphs at small $n$.
- Score computation for dense graphs is expensive: each Insert/Delete requires evaluating
  a regression.

**Strengths**:
- **Provably optimal** in the oracle setting (Chickering 2002, Theorem 15).
- Searches equivalence classes directly — one Insert step = one CPDAG step, not one edge.
- FGES scales to thousands of variables via parallelism and the priority queue.
- Less sensitive to single CI test failures (unlike PC, which can cascade).

### Score-based (continuous): NOTEARS

**Mechanism**: Replace the combinatorial DAG constraint with the smooth function
$h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$; minimize the $\ell_1$-regularized LS
loss subject to $h(W) = 0$ using augmented Lagrangian + L-BFGS.

**Differences from PC and GES**:
- **No CI tests and no equivalence class search**: NOTEARS operates on the full
  weighted adjacency matrix $W$.
- **Output is a DAG** (a single weighted graph after thresholding), not a CPDAG.
  This means NOTEARS implicitly picks one representative from the equivalence class.
- **Stationarity, not optimality**: NOTEARS is only guaranteed to find a stationary
  point of the augmented Lagrangian, not the global optimum. Empirically it approaches
  global optimality (NOTEARS §4.3, Table 1).
- **Nonlinear generalization**: NOTEARS extends naturally to nonlinear SEMs via neural
  networks in the score (DAG-GNN, GRAN-DAG — later works).

**Strengths**:
- Requires **no special graphical-model knowledge** to implement — just standard numerical
  solvers.
- Scalable: matrix operations exploit GPU acceleration.
- No faithfulness assumption needed for the optimization itself (though needed for
  consistency results).

### Direct comparison: PC vs. GES in NOTEARS benchmarks

From the NOTEARS paper (Table 1 and Figure 3, [[NOTEARS Experiments]]):

| Method | Erdős-Rényi (dense) | Scale-free | Runtime |
|--------|--------------------|-----------| --------|
| PC | Higher SHD | Higher SHD | Fast |
| FGS (FGES) | Lower SHD | Lower SHD | Moderate |
| NOTEARS | **Lowest SHD** | **Lowest SHD** | Fast (L-BFGS) |

NOTEARS beats both PC and FGS on structural Hamming distance (SHD), especially for
**dense** and **large** graphs — exactly the settings where PC's bounded-conditioning
assumption breaks down and GES's greedy search struggles with local optima.

> [!note] Caveat
> Benchmarks favor the method designed for the benchmark. NOTEARS (linear SEM, Gaussian)
> works best under its own model. PC can be more reliable with robust non-parametric CI
> tests for non-Gaussian data. GES is provably optimal; NOTEARS is only provably stationary.

### Choosing a method in practice

| Situation | Recommended |
|-----------|-------------|
| $d \gg n$, sparse graph, Gaussian | **PC / PC-stable** (Kalisch & Bühlmann 2007 theory applies) |
| $n \gg d$, want optimality guarantee | **GES / FGES** |
| Non-Gaussian data (ICA-identifiable) | **LiNGAM** (Shimizu 2006) |
| Latent confounders suspected | **FCI** (outputs PAG, not CPDAG) |
| Want a single DAG, not equivalence class | **NOTEARS** (or GES + DAG selection from CPDAG) |
| Large $d$ (thousands), parallel hardware | **FGES** (Ramsey 2017) |
| ABM calibration / moment matching | **NOTEARS / GES** (score-based, compatible with external simulators) |

### Connection to the vault's ABM context

[[Summary Causal DAGs]] (Zeng 2025, §4) assumes the DAG is **given** as input and applies
LLM-assisted summarization. The current notes complete the missing preceding step: how
to *learn* that DAG from ABM-generated observational data. PC and GES are both natural
choices for this:
- PC with partial correlation tests on ABM-generated Monte Carlo samples.
- GES/FGES with BIC, treating each ABM run as a "sample" from the agent-level distribution.
- NOTEARS for end-to-end differentiable structure learning pipelines.

This connection is flagged in the Dream index gap description: "ABM outputs can be used as
observational data for structure learning, and the Zeng 2025 DAG summarization work
assumes the DAG is given — structure learning is what precedes summarization."

## See Also
- [[PC Algorithm - Overview]] — constraint-based approach in detail
- [[PC Algorithm - Skeleton and Independence Tests]] — Phase 1 of PC
- [[PC Algorithm - Orientation and CPDAGs]] — Phase 2, CPDAGs, Meek's rules
- [[GES Algorithm - Overview]] — score-based approach in detail
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — landscape of all methods (Table from NOTEARS §2.2)
- [[Summary Causal DAGs]] — where structure learning feeds in (downstream use)
- [[Directed Acyclic Graphs]] — causal reasoning once the DAG is known
- [[Causal Discovery/_Index|Causal Discovery Index]]
