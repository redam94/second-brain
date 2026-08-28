---
title: "Causal Discovery Algorithm Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chan24a-autocd.pdf]]"
source_location: "§2 Related Work, full taxonomy; Chan et al. PMLR 2024"
date_ingested: 2026-08-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "causal discovery methods comparison"
  - "structure learning algorithms"
---

# Causal Discovery Algorithm Comparison

> [!summary]
> Three paradigms dominate **causal structure learning** from observational data:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous-optimization**
> (NOTEARS and its variants). All three target a DAG over observed variables — PC and GES
> return the **CPDAG** (Markov equivalence class); NOTEARS returns a single DAG. The
> choice between them depends on data type, sample size, graph density, and whether
> a CPDAG or a single graph is needed. Hybrid algorithms (e.g., MMHC) blend paradigms;
> gradient-based methods (DAG-GNN, DAGMA) extend the NOTEARS approach to non-linear SEMs.

## Overview

All three approaches share the same **identifiability ceiling**: without interventions or
distributional assumptions beyond faithfulness, causal structure is only recoverable up to
Markov equivalence. This is a fundamental limit, not an algorithmic shortcoming. To break
it, one needs either: (1) interventional data, (2) non-Gaussian noise (LiNGAM), or (3)
additional model restrictions (functional form assumptions, equal noise variances).

Within this ceiling, the three paradigms make different computational trade-offs.

## The Three Paradigms

### Paradigm 1 — Constraint-Based (PC algorithm)

**Core idea:** Use conditional independence (CI) tests as an oracle for d-separation.
Remove edges where CI holds; orient remaining edges using v-structure logic and Meek's rules.

**Strengths:**
- *Interpretable*: every edge removal has a statistical justification (a specific CI test result)
- *Flexible*: changing the CI test changes the data type handled (Gaussian → Fisher's Z; discrete → $G^2$; non-linear → KCI)
- *Efficient* for sparse graphs: complexity is polynomial in $d$ for fixed max-degree

**Weaknesses:**
- *CI test power degrades* with conditioning set size — unreliable for large $k$
- *Order-dependent* (fixed by PC-stable, Colombo et al., 2014)
- *No score*: cannot compare two different CPDAGs — the output is qualitative (present/absent edges)
- *Fails with latent confounders*: requires causal sufficiency (FCI fixes this)

See [[PC Algorithm - Overview]] for the full algorithm.

### Paradigm 2 — Score-Based (GES)

**Core idea:** Define a scoring function $Q$ over CPDAGs (typically BIC or BDe); greedily
add edges (FES) then remove edges (BES) to maximize the score.

**Strengths:**
- *Provably consistent* under faithfulness + score consistency (Chickering, 2002)
- *No CI tests*: avoids the small-sample fragility of CI testing
- *Score interpretable*: BIC is a well-understood model selection criterion
- *FGES variant* (Ramsey et al., 2017): scales to $d > 1000$ variables

**Weaknesses:**
- *Score evaluation cost*: requires $O(\text{adj}^2)$ evaluations per step — slower than PC for very sparse graphs
- *BIC assumes Gaussian linear SEM* for Gaussian data; non-Gaussian requires modified scores
- *Still exponential* in principle (max-clique operations): needs bounded max-degree assumption

See [[GES - Greedy Equivalence Search]] for the full algorithm.

### Paradigm 3 — Continuous Optimization (NOTEARS and variants)

**Core idea:** Replace the discrete DAG constraint with a smooth algebraic constraint
$h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$, solving a continuous program over real matrices.

**Strengths:**
- *No graph-specialized machinery*: implementable in ~50 lines using off-the-shelf solvers
- *Differentiable*: integrates naturally with neural networks (DAG-GNN, DAGMA, NOTEARS-MLP)
- *Scalable*: gradient-based methods parallelise on GPUs

**Weaknesses:**
- *Non-convex*: only guarantees stationary points, not global optima
- *Returns a single DAG*, not a CPDAG — cannot quantify equivalence class uncertainty
- *Linear SEM assumption* for base NOTEARS; extensions to non-linear require neural networks
- *Thresholding sensitivity*: the hard threshold $\omega$ on edge weights affects sparsity

See [[NOTEARS - Overview]] and [[NOTEARS Algorithm]] for the full algorithm.

## Head-to-Head Comparison

| Dimension | PC | GES | NOTEARS |
|---------|---|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Output** | CPDAG | CPDAG | Single DAG |
| **Key oracle** | CI tests | BIC/BDe score | Least-squares gradient |
| **Identifiability** | CPDAG | CPDAG | DAG (within CPDAG) |
| **Starting point** | Dense graph (removes) | Empty graph (adds) | Random init (gradient) |
| **Faithfulness needed** | Yes | Yes | No (but consistency requires it) |
| **Causal sufficiency** | Yes (else use FCI) | Yes | Yes |
| **Gaussian linear** | Fisher's Z test | BIC | Least-squares loss |
| **Non-Gaussian** | KCI, RCIT | Modified score | NOTEARS-MLP (non-linear) |
| **Discrete data** | $G^2$ test | BDe score | Not directly |
| **Consistency** | ✓ (large $n$) | ✓ (Chickering 2002) | ∼ (stationary point only) |
| **Speed (sparse)** | Fast $O(d \cdot q^k)$ | Moderate $O(d^2)$ | Depends on solver |
| **Speed (dense)** | Slow (exponential $k$) | FGES handles well | Fast (batch gradient) |
| **Interpretability** | High (CI test reasons) | High (BIC reasons) | Medium (gradient) |
| **Software (R)** | `pcalg::pc()` | `pcalg::ges()` | `notears` (Python) |
| **Software (Python)** | `causal-learn` | `causal-learn`, `ges` | `notears`, `dagma` |

## When to Use Which

> [!example] Decision Guide
> **Use PC when:**
> - You want interpretable CI-based reasons for each edge decision
> - Data is mixed type (continuous + discrete) — different CI tests for each
> - You have domain knowledge to set $\alpha$ thoughtfully
> - The graph is known to be sparse (small max-degree)
>
> **Use GES when:**
> - You want a provably consistent score-based result
> - Data is purely Gaussian + linear (BIC is exact)
> - $d$ is moderate (10–1000) and FGES is used for speed
> - You need to compare multiple candidate structures
>
> **Use NOTEARS (or DAGMA/DAG-GNN) when:**
> - You want integration with deep learning (non-linear functional forms)
> - You have a GPU and large $d$ (>1000)
> - A single DAG point estimate suffices (no CPDAG needed)
> - You are using it as part of an end-to-end differentiable pipeline

## Hybrid Methods

Several algorithms blend paradigms:

| Method | Blend | Key idea |
|--------|-------|---------|
| **MMHC** (Tsamardinos et al., 2006) | Constraint + score | PC for skeleton, hill-climbing for orientation |
| **GFCI** | GES + FCI | Score-based skeleton + FCI orientation for latent confounders |
| **BOSS** (Chickering et al., 2020) | Score + order | SP / BOSS order-search over permutation space |
| **DAG-GNN** (Yu et al., 2019) | NOTEARS + VAE | Continuous optimization with non-linear VAE |
| **DAGMA** (Bello et al., 2022) | NOTEARS variant | Log-det characterization of acyclicity — avoids matrix exponential |
| **AutoCD** (Chan et al., 2024) | AutoML + BO | Bayesian optimization over the space of causal discovery algorithms |

## Connections to Vault Topics

- **ABM structure learning**: the Zeng (2025) DAG summarization work ([[Summary Causal DAGs]])
  assumes a DAG is given; PC or GES would precede summarization in a full pipeline.
- **LLM-assisted elicitation**: [[LLM Expert Elicitation for Bayesian Networks]] builds graphs
  from expert knowledge rather than data — complementary to these algorithms.
- **NOTEARS in vault**: comprehensively covered in [[NOTEARS - Overview]], [[NOTEARS Algorithm]],
  [[Smooth Characterization of Acyclicity]], [[NOTEARS Experiments]].
- **ABM calibration**: [[Approximate Bayesian Computation for ABMs]] could use PC/GES outputs
  as structure inputs for calibration.

## See Also
- [[PC Algorithm - Overview]] — full PC algorithm description
- [[GES - Greedy Equivalence Search]] — full GES algorithm description
- [[NOTEARS - Overview]] — full NOTEARS description
- [[DAG Structure Learning Problem]] — landscape table of all prior approaches
- [[Markov Equivalence Classes and CPDAGs]] — shared target of PC and GES
- [[Directed Acyclic Graphs]] — DAG foundations for all three methods
