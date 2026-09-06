---
title: "Causal Structure Learning - Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.md]]"
source_location: "Multiple sources: Spirtes et al. (2000); Chickering (2002); Zheng et al. (2018); Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "Causal discovery comparison"
  - "Structure learning methods"
  - "PC vs GES vs NOTEARS"
---

# Causal Structure Learning - Comparison

> [!summary]
> Three paradigms dominate causal structure learning from observational data:
> (1) **Constraint-based** (PC algorithm) — uses conditional independence tests to build the skeleton
> and orient v-structures; (2) **Score-based** (GES) — greedy search over CPDAGs guided by a
> decomposable score; (3) **Continuous optimization** (NOTEARS) — reformulates DAG learning as
> an equality-constrained program over real matrices. All three are consistent under their
> assumptions; they differ in assumptions, output type, computational complexity, finite-sample
> accuracy, and applicability. This note synthesises the tradeoffs.

## Overview

The vault's causal discovery section now covers all three paradigms:
- **Constraint-based**: [[PC Algorithm]] (Spirtes, Glymour & Scheines 2000; Kalisch & Bühlmann 2007)
- **Score-based**: [[GES - Greedy Equivalence Search]] (Chickering 2002)
- **Continuous optimization**: [[NOTEARS - Overview]] (Zheng, Aragam, Ravikumar & Xing 2018)

The fundamental question is: given i.i.d. observations of $(X_1, \ldots, X_p)$, can we recover
the underlying causal DAG? And if so, up to what level of detail? This note maps the answer
across the three paradigms.

## Main Content

### Identifiability: what can be recovered?

> [!theorem] Identifiability Limit for Observational Data (Verma & Pearl 1990)
> From observational data alone (no interventions), the best any consistent algorithm can recover
> is the **Markov equivalence class** of the true DAG — represented as a CPDAG. Individual edge
> directions within the CPDAG are **not identifiable** without additional assumptions.
>
> **Exception 1 (LiNGAM)**: If the noise is non-Gaussian, the full DAG is identifiable (Shimizu
> et al. 2006).
>
> **Exception 2 (Equal variance)**: If all error variances are equal, the full DAG is identifiable
> (Peters & Bühlmann 2014).
>
> PC and GES respect this limit — they return CPDAGs. NOTEARS returns a single DAG (by using
> the LS score, which can differentiate Markov-equivalent models at finite $n$), but this
> determinism is statistical artifact, not causal identification.
^thm-identifiability

### Key assumptions comparison

| Assumption | PC | GES | NOTEARS |
|-----------|-----|-----|---------|
| **Faithfulness** | Required | Required | Not required (LS score is consistent without it) |
| **Causal sufficiency** | Required (no hidden confounders) | Required | Required |
| **Functional form** | None (nonparametric CI tests available) | Depends on score (BIC=linear Gaussian or discrete) | Linear SEM (extensions exist for non-linear) |
| **Noise distribution** | None (with rank-based tests) | Gaussian (BIC) or discrete (BDe) | Not assumed Gaussian, but score is LS |
| **Acyclicity** | Assumed (output is DAG) | Assumed (search over DAGs/CPDAGs) | Enforced via $h(W) = 0$ constraint |

> [!note] Faithfulness is the key battleground
> PC and GES both require faithfulness — no "accidental" CI in the distribution that doesn't
> correspond to d-separation in the true DAG. This can fail when coefficients in an SEM cancel
> out (e.g., two paths from $X$ to $Y$ cancel). In practice, faithfulness violations are rare
> but can cause both PC and GES to miss edges. NOTEARS's LS score is consistent under weaker
> conditions (van de Geer & Bühlmann 2013).

### Full algorithm comparison

| Dimension | PC | GES | NOTEARS |
|-----------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Search space** | All valid CPDAGs (via edge removal) | CPDAGs (Insert/Delete operators) | $\mathbb{R}^{d\times d}$ (real matrices) |
| **Output** | CPDAG | CPDAG | Single DAG (weighted adjacency matrix) |
| **Starting point** | Complete graph | Empty CPDAG | $W_0 = 0$ (or random) |
| **Core operation** | CI tests | Score function evaluation | Gradient/proximal steps on $L^\rho(W, \alpha)$ |
| **Time complexity** | $O(p^{q+2})$ for degree-$q$ skeleton | $O(p^{q+2})$ per phase | $O(d^3)$ per augmented-Lagrangian step |
| **Space complexity** | $O(p^2)$ for adjacency + sep sets | $O(p^2)$ for CPDAG | $O(d^2)$ for $W$ |
| **Consistency** | Yes (faithfulness + sufficiency) | Yes (faithfulness + sufficiency) | Yes (faithfulness not needed) |
| **Finite-sample** | More error (CI test errors accumulate) | Better than PC (score is global) | Different errors (nonconvex, stationary points) |
| **Dense graphs** | Poor (exponential in $q$) | Poor (exponential in $q$) | Good (linear in $d^2$) |
| **Implementation** | `pcalg::pc()`, `causal-learn` | `pcalg::ges()`, TETRAD | `notears` (Python, ~50 lines) |

### Empirical benchmarks (Zheng et al. 2018)

The NOTEARS paper (Table 1 / Figure 3 in [[NOTEARS Experiments]]) benchmarks on:
- **Synthetic data**: Erdős-Rényi (ER) and Scale-Free (SF) random DAGs with Gaussian, Exponential,
  and Gumbel noise, varying $d \in \{10, 20, 50, 100\}$
- **Real data**: Sachs et al. (2005) protein signaling ($p=11$, $n=853$)

Key findings:
- **GES (FGS in TETRAD)** performs best among existing algorithms on most settings — confirming
  score-based > constraint-based in finite samples
- **NOTEARS** matches or beats GES on synthetic data, especially dense/high-$d$ settings
- **PC** underperforms GES in most settings due to accumulated CI test errors
- On the Sachs real data: PC and GES are competitive (SHD ≈ 8–15)

### When to use which

> [!example] Decision Guide for Structure Learning
>
> **Use PC when:**
> - You need nonparametric CI tests (non-Gaussian, ordinal, mixed data) — partial correlation
>   tests are valid for Gaussian, rank-based tests for non-Gaussian
> - You want to understand which edges are uncertain (undirected edges in CPDAG are explicit)
> - You want a fast algorithm with clear causal assumptions and transparent separation sets
>
> **Use GES when:**
> - Data is Gaussian (BIC score is the right criterion)
> - You want better finite-sample performance than PC
> - You want the theoretically "cleanest" score-based method with proven consistency
> - Large $p$ with FGES (Fast GES): the TETRAD implementation parallelizes well
>
> **Use NOTEARS when:**
> - You want a continuous optimization framing (useful when embedding structure learning in a
>   larger pipeline, e.g., reinforcement learning, neural networks)
> - The true DAG may be dense (NOTEARS scales in $O(d^3)$; PC/GES scale exponentially in degree)
> - You want a simple, maintainable implementation (~50 lines of Python)
> - You are willing to accept a single DAG rather than a CPDAG (and verify post-hoc)
^ex-decision-guide

### Connection to ABM causal discovery

The vault's ABM notes ([[Approximate Bayesian Computation for ABMs]], [[Summary Causal DAGs]])
generate DAGs from ABM simulation outputs. The choice of discovery method matters:
- **PC** is the natural first choice when working with non-Gaussian ABM outputs (agent decisions,
  counts, proportions) — rank-based CI tests handle non-Gaussian distributions
- **GES** works well when the ABM outputs are approximately Gaussian (aggregate statistics)
- **NOTEARS** is attractive when the ABM is embedded in a differentiable pipeline or the number
  of variables (outputs) is large — NOTEARS's $O(d^3)$ scaling is preferable for $d \geq 50$

## Connections

- **Underlying problem**: [[DAG Structure Learning Problem]] — the score-based formulation
  common to all three paradigms
- **Output concept**: [[Markov Equivalence Classes and CPDAGs]] — what PC and GES return
- **NOTEARS theory**: [[Smooth Characterization of Acyclicity]] — the key to NOTEARS's continuous
  reformulation
- **ABM applications**: [[Summary Causal DAGs]] — uses structure learning results as inputs
- **Bayesian structure learning**: an alternative not covered here — places a prior over DAGs
  and computes a posterior (e.g., MCMC over orderings); see [[Approximate Bayesian Computation for ABMs]]
  for ABC-based approaches that can incorporate DAG structure uncertainty

## See Also
- [[PC Algorithm]] — constraint-based method (full detail)
- [[GES - Greedy Equivalence Search]] — score-based method (full detail)
- [[NOTEARS - Overview]] — continuous optimization method
- [[Markov Equivalence Classes and CPDAGs]] — identifiability and CPDAG representation
- [[DAG Structure Learning Problem]] — problem setup common to all three
- [[NOTEARS Experiments]] — empirical benchmarks
- [[Summary Causal DAGs]] — vault application of causal discovery
