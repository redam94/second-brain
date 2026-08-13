---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/chickering-meek-sges.pdf]]"
source_location: "§1 Introduction (approach comparison); §3.1 (GES summary)"
date_ingested: 2026-08-13
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by: []
aliases:
  - "causal discovery overview"
  - "structure learning comparison"
---

# Causal Structure Learning - Overview

> [!summary]
> Causal structure learning (a.k.a. causal discovery) is the problem of recovering the DAG
> (Bayesian network) structure of a causal system from observational data. Three main
> paradigms exist: **constraint-based** (PC, FCI), **score-based** (GES, NOTEARS), and
> **hybrid** (MMHC). All three face the fundamental identifiability ceiling: observational
> data can recover at best the **Markov equivalence class** (CPDAG) of the true DAG.
> This note surveys and contrasts the key algorithms now represented in the vault.

## Overview

The vault's Causal Discovery folder grew from the NOTEARS paper (a continuous-optimization,
score-based method) and now includes the two other major paradigms. The table below gives a
one-screen comparison; the linked notes provide the full detail.

## Main Content

### Algorithm Comparison

| Dimension | [[PC Algorithm]] | [[Greedy Equivalence Search (GES)]] | [[NOTEARS - Overview\|NOTEARS]] |
|-----------|-----------------|-----------------------------------|---------------------------------|
| **Paradigm** | Constraint-based | Score-based | Score-based (continuous opt.) |
| **Output** | CPDAG | CPDAG | Single DAG ($W$) |
| **Search space** | Skeleton + orientations | Equivalence classes (CPDAGs) | $\mathbb{R}^{d \times d}$ continuous |
| **Key input** | CI oracle / test | Decomposable score (e.g. BIC) | LS loss + $\ell_1$ penalty |
| **Faithfulness needed?** | Yes | Yes (locally consistent score) | No |
| **Causal sufficiency?** | Yes (FCI relaxes) | Yes | Yes |
| **Linear SEM assumed?** | No | No | Yes |
| **Asymptotic guarantee** | CPDAG of true DAG | CPDAG of true DAG (Theorem 1) | Stationary point of ECP |
| **Complexity** | $O(d^{q+2})$ for degree $q$ | $O(d^2 \cdot 2^{d_{\max}})$/step | $O(d^3)$ per matrix-exp eval |
| **High-dim ($d \gg n$)?** | Yes (PC-stable + sparse) | Limited (score instability) | Yes (with LASSO penalty) |
| **Key reference** | Spirtes et al. (2000) | Chickering (2002, *JMLR*) | Zheng et al. (2018, NeurIPS) |

### The Identifiability Ceiling

All purely observational methods share the same fundamental limit: **observational data can
recover at most the Markov equivalence class** of the true DAG, not the DAG itself. This is
because Markov-equivalent DAGs imply exactly the same joint distribution for every parameter
setting (Verma & Pearl, 1991).

Directed edges in a CPDAG output are **identified** from data; undirected edges signal
ambiguity that can only be resolved by:
- **Interventional data** (do-calculus experiments), or
- **Functional constraints** — e.g., if the true SEM is linear with non-Gaussian noise
  (LiNGAM), all edge directions are identified even within an equivalence class.

### Constraint-Based Methods: PC

[[PC Algorithm]] starts with a complete graph and removes edges that are d-separated in data.
The appeal is conceptual clarity: every edge removal corresponds to a testable hypothesis.
The main limitation is **error propagation**: a CI test error in Phase 1 (skeleton) can
cascade into v-structure and orientation errors.

PC-stable (Colombo & Maathuis, 2014) eliminates **order-dependence** by batching skeleton
updates. This is now the recommended default.

### Score-Based Methods: GES

[[Greedy Equivalence Search (GES)]] starts empty, adds edges (FES), then removes spurious ones
(BES), always greedily improving a score. The BIC score is the standard choice:
$$\text{BIC}(G, D) = \sum_{i=1}^d \left[ \log \hat{p}(X_i \mid \mathrm{Pa}^G_i) - \frac{|\mathrm{Pa}^G_i| + 1}{2} \log n \right].$$

GES's appeal is the **asymptotic optimality guarantee** (Theorem 1): it returns the true CPDAG
in the large-sample limit given a locally consistent score. Its limitation is computational:
evaluating all INSERT/DELETE operators is expensive for dense graphs.

### Continuous Optimization: NOTEARS

[[NOTEARS - Overview|NOTEARS]] takes a third route: it casts DAG learning as a **continuous
optimization problem** over weight matrices $W \in \mathbb{R}^{d \times d}$, enforcing
acyclicity via the smooth constraint $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$.

Advantages: no explicit graph search; solvable with standard solvers (augmented Lagrangian +
L-BFGS); handles high-dimensional settings with LASSO. Limitation: assumes a linear SEM;
returns a single DAG (not a CPDAG); only guaranteed to reach a stationary point, not the
global optimum.

### When to Use Which

| Situation | Recommended approach |
|-----------|---------------------|
| Sparse graph, $d$ small–moderate, CI test available | PC-stable |
| Moderate $d$, BIC score tractable, faithfulness plausible | GES |
| High $d$ (hundreds–thousands), linear SEM, no faithfulness | NOTEARS |
| Latent confounders suspected | FCI (extension of PC) |
| Non-Gaussian noise, full DAG identification needed | LiNGAM |

## Connections

- [[DAG Structure Learning Problem]] — formalizes the optimization target ($F(W)$, NP-hardness,
  landscape of prior approaches including PC and GES)
- [[Markov Equivalence and CPDAGs]] — the shared identifiability ceiling and CPDAG concept
- [[PC Algorithm]] — constraint-based paradigm
- [[Greedy Equivalence Search (GES)]] — score-based paradigm
- [[NOTEARS - Overview]] — continuous-optimization paradigm
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal modeling material

## See Also
- [[Causal Discovery/_Index|Causal Discovery Index]] — all notes in this folder
- [[Directed Acyclic Graphs]] — foundational DAG definitions
