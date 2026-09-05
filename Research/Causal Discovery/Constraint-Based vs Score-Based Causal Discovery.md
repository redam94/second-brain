---
title: "Constraint-Based vs Score-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/kalisch2007-PC.txt]]"
source_location: "Chickering (2002) §1; Kalisch & Bühlmann (2007) §1; Zheng et al. (2018) §2.2"
date_ingested: 2026-09-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by: []
aliases:
  - "causal discovery methods comparison"
  - "structure learning algorithms overview"
---

# Constraint-Based vs Score-Based Causal Discovery

> [!summary]
> Causal structure learning algorithms fall into three major families: **constraint-based**
> (PC, FCI — use conditional independence tests), **score-based greedy** (GES, FGES — greedily
> maximize a likelihood score over the space of CPDAGs), and **continuous optimization**
> (NOTEARS — reformulate structure learning as differentiable constrained optimization). All
> three, under faithfulness, provably recover the CPDAG of the true DAG in large samples —
> but they differ substantially in their computational assumptions, failure modes, and practical
> performance in finite samples.

## Overview

This note synthesizes the three approaches covered in this folder — [[PC Algorithm]],
[[Greedy Equivalence Search]], and [[NOTEARS - Overview]] — to answer the practical question:
*which algorithm should I use?* The answer depends on sample size, dimensionality, graph
density, distributional assumptions, and available computational resources.

The vault's coverage of causal structure learning now covers:
- **Constraint-based**: [[PC Algorithm]] + [[Conditional Independence Tests for Causal Discovery]]
- **Score-based greedy**: [[Greedy Equivalence Search]]
- **Continuous optimization**: [[NOTEARS - Overview]], [[NOTEARS Algorithm]], [[Smooth Characterization of Acyclicity]], [[NOTEARS Experiments]]
- **Shared foundations**: [[DAG Structure Learning Problem]], [[Markov Equivalence Classes and CPDAGs]]

## Main Content

### Taxonomy of Approaches

| Family | Algorithm | Core primitive | Search space | Output |
|--------|-----------|---------------|-------------|--------|
| **Constraint-based** | PC (Spirtes & Glymour, 1991) | CI tests ($X_i \perp X_j \mid X_S$) | Test all pairs at increasing $\|S\|$ | CPDAG |
| **Constraint-based** | FCI | CI tests | Tests up to $|S| = d-2$ | PAG (partial ancestral graph) with latent vars |
| **Score-based greedy** | GES (Chickering, 2002) | BIC/BDeu score | CPDAGs via Insert/Delete operators | CPDAG |
| **Score-based greedy** | FGES (Ramsey et al., 2017) | BIC score, parallelized | Same as GES | CPDAG |
| **Continuous opt.** | NOTEARS (Zheng et al., 2018) | LS score + acyclicity constraint | Continuous matrix $W \in \mathbb{R}^{d\times d}$ | DAG (single $W$) |

### Constraint-Based: PC

**Strengths:**
- Computationally efficient for **sparse graphs** (bounded neighbourhood size $\kappa$): polynomial in $d$.
- Nonparametric in principle — can use KCI for non-Gaussian data.
- Identifies which edges are present/absent in the skeleton directly from CI tests.
- Transparent failure diagnostics: which CI tests failed reveals exactly where the algorithm struggles.

**Weaknesses:**
- **Multiple testing accumulation:** Tests $O(d^2 \cdot \binom{\kappa}{k})$ hypotheses; type-I error can accumulate even after Bonferroni correction.
- **Faithfulness sensitivity:** Near-cancellations cause CI test failures (false positives) that incorrectly remove edges.
- **Ordering sensitivity** (original PC; fixed by PC-stable).
- For dense graphs, the number of tests grows combinatorially — infeasible for large $\kappa$.

### Score-Based Greedy: GES

**Strengths:**
- Avoids multiple testing entirely — single-criterion greedy search.
- **Provably consistent** under faithfulness + BIC consistency (Chickering 2002, Theorem 17).
- Score-equivalent by design: all DAGs in the same Markov equivalence class receive the same score.
- The Forward Phase's greedy Insert is equivalent to a **stepwise regression** for Gaussian data — easy to interpret.

**Weaknesses:**
- **Parametric assumption:** BIC score is correctly specified only for the assumed distribution (Gaussian for linear SEMs, multinomial for discrete data).
- **Local optima:** Greedy search can get stuck, especially in dense graphs or with model misspecification.
- **Computational cost:** Each greedy step requires evaluating all candidate Insert/Delete operators — $O(d^2)$ score evaluations per step, times $O(d^2)$ steps = $O(d^4)$ total. Slower than PC for sparse graphs.
- Does not directly detect or handle **latent variables** (unlike FCI).

### Continuous Optimization: NOTEARS

**Strengths:**
- **No graph-search machinery** required: the acyclicity constraint $h(W)=0$ replaces all graph-specific algorithms.
- Scales to **large dense graphs** via numerical optimization (augmented Lagrangian + L-BFGS).
- Outputs a single **DAG** (specific orientation), not a CPDAG — useful when a single representative DAG is needed.
- Extensible to nonlinear SEMs (NOTEARS-MLP) and Bayesian formulations.

**Weaknesses:**
- **No faithfulness guarantee:** NOTEARS does not provably recover the true CPDAG under faithfulness; it finds stationary points, which may not be the global optimum.
- **Nonconvex:** Multiple local optima can trap the optimizer; empirically close to global optimum but not guaranteed.
- Outputs a **single DAG** — does not represent the full uncertainty in edge orientations (the CPDAG).
- Requires choosing the $\ell_1$ regularisation parameter $\lambda$ (thresholding).

### Choosing an Algorithm

> [!note] Decision Guide
> | Scenario | Recommended algorithm | Reason |
> |----------|-----------------------|--------|
> | Sparse DAG, Gaussian data, $d \leq 200$, large $n$ | **PC** with Fisher's z-test | Fast, consistent, transparent |
> | Sparse DAG, non-Gaussian or nonparametric, small $d$ | **PC** with KCI | Flexible CI test |
> | Gaussian data, $d \leq 100$, want score-based consistency | **GES** with BIC | No multiple testing, provably correct |
> | Large dense graph, $d \gg 100$, scalability priority | **NOTEARS** | Numerical optimization scales well |
> | Suspected latent variables | **FCI** | Handles latents; outputs PAG |
> | Known intervention targets | **GIES** / **IGSP** | Incorporates intervention data |

### Shared Identifiability Ceiling

All three families share the same **fundamental identifiability limit**: without additional
assumptions (non-Gaussian noise, nonlinear mechanisms, interventions, known temporal ordering),
observational data identifies at most the **CPDAG** — the Markov equivalence class of the
true DAG. Neither more data nor a better algorithm can break this ceiling.

Conditions that allow full DAG identification from observational data:
- **Non-Gaussian noise**: LiNGAM (Shimizu et al., 2006) — the SEM is linear non-Gaussian, so
  independent component analysis identifies the full DAG.
- **Nonlinear mechanisms**: ANMs (additive noise models, Hoyer et al., 2008) — functional
  restrictions break Markov equivalence.
- **Equal error variances**: Peters & Bühlmann (2014) — same noise variance implies identifiability.

### Evaluation Metrics

Structure learning is evaluated on:
- **SHD** (Structural Hamming Distance): number of edge additions, deletions, and reversals to go from estimated CPDAG to true CPDAG.
- **FDR** (False Discovery Rate) and **TPR** (True Positive Rate) for edges.
- **F1 score** on the skeleton edges.
- **Normalised SHD** (divide by $d^2$) for cross-dataset comparison.

See [[NOTEARS Experiments]] for benchmarks comparing NOTEARS, GES (FGS), and PC.

## Connections

- **ABM applications:** ABM output data can be treated as observational data for structure
  learning — recovering the causal interaction structure of agents post-hoc. See
  [[Approximate Bayesian Computation for ABMs]] and [[Summary Causal DAGs]].
- **Prior knowledge integration:** PC and GES can be initialized with prior knowledge
  (forbidden/required edges) as background knowledge in the `pcalg` package.
- **Bayesian vs frequentist:** NOTEARS and GES use frequentist scores (BIC, LS); Bayesian
  structure learning uses BDeu or model averaging over CPDAGs — see [[BN Construction Methods Comparison]].

## See Also
- [[PC Algorithm]] — constraint-based algorithm details
- [[Greedy Equivalence Search]] — score-based greedy algorithm details
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — unified problem setup
- [[Markov Equivalence Classes and CPDAGs]] — shared output representation
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
- [[Summary Causal DAGs]] — downstream use of a learned DAG
- [[BN Construction Methods Comparison]] — related comparison of BN construction methods
