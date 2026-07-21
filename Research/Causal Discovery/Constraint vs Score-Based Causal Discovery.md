---
title: "Constraint vs Score-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Spirtes et al. (2000); Chickering (2002); Zheng et al. (2018); Survey: arXiv:2303.15027"
date_ingested: 2026-07-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by: []
aliases:
  - causal discovery paradigms
  - structure learning comparison
  - PC vs GES vs NOTEARS
---

# Constraint vs Score-Based Causal Discovery

> [!summary]
> Causal structure learning from observational data has three main algorithmic paradigms:
> **constraint-based** (PC algorithm — uses conditional independence tests to prune edges),
> **score-based** (GES — maximises a decomposable penalised score over the CPDAG space),
> and **continuous optimization** (NOTEARS — reformulates the problem as a smooth constraint
> program over $\mathbb{R}^{d \times d}$). All three recover the same **CPDAG** in the large-sample
> limit under faithfulness — but differ substantially in assumptions, outputs, finite-sample
> performance, and scalability. Choosing among them requires understanding these tradeoffs.

## Overview

The three paradigms attack the same fundamental problem — recovering a DAG's structure from
data — with different strategies:

| Paradigm | Key idea | Output | Faithfulness | Linearity | Ref. |
|----------|---------|--------|-------------|-----------|------|
| **Constraint-based** | CI test results constrain the graph | CPDAG | Required | Not required | SGS 2000 |
| **Score-based** | Maximise a global score over equivalence classes | CPDAG | Required | Not required | Chickering 2002 |
| **Continuous optimization** | Smooth acyclicity constraint → off-the-shelf solver | Single DAG | Required | Required (linear SEM) | Zheng et al. 2018 |

## Main Content

### Shared Foundations

All three assume:
1. **Causal Markov condition**: the true distribution is Markov to the true DAG $\mathcal{G}^*$
2. **Faithfulness**: the distribution is faithful to $\mathcal{G}^*$ (no accidental independencies)
3. **Causal sufficiency**: all common causes of observed variables are observed (no hidden confounders)

Under these three conditions, the **CPDAG of $\mathcal{G}^*$ is the most that observational data
alone can determine** — any algorithm that claims to return a unique DAG beyond the CPDAG is
either exploiting additional assumptions (non-Gaussianity, nonlinearity) or is not provably valid.

> [!note] What breaks the CPDAG ceiling
> Additional assumptions that enable unique DAG identification (beyond CPDAG):
> - **Non-Gaussian errors** (LiNGAM, Shimizu et al. 2006): uses skewness / higher moments
> - **Nonlinear additive noise** (ANM, Hoyer et al. 2009): asymmetry of $X \to Y$ vs $Y \to X$
> - **Interventional data** (GIES, Hauser & Bühlmann 2012): experiments break equivalence
> - **Equal error variances** (Peters & Bühlmann 2014): variance constraint orients edges

### Constraint-Based: The PC Algorithm

[[PC Algorithm]] operationalises the Markov + Faithfulness bijection directly:
- **Adjacency $\Leftrightarrow$ conditional dependence**: edge $X_i - X_j$ is kept iff no conditioning
  set $S$ renders $X_i \perp X_j \mid S$
- **V-structures**: identified from separating sets
- **Further orientations**: Meek rules from structure alone

**Strengths:**
- Works for any distribution (CI test is pluggable: Gaussian, discrete, kernel-based)
- Each edge removal is directly interpretable (which CI test caused it, at which $\alpha$)
- Efficient for sparse graphs (stops early when $\ell$-size conditioning sets suffice)
- FCI extension handles hidden confounders (outputs PAG)

**Weaknesses:**
- Sensitive to CI test errors in finite samples: a wrong independence/dependence decision early
  propagates to later phases (cascade errors)
- Order-dependent in original form (fixed by PC-stable)
- Exponential worst-case in maximum degree
- The $\alpha$ threshold is a tuning parameter with no principled cross-validation

### Score-Based: GES

[[Greedy Equivalence Search]] treats structure learning as model selection with a penalised score:
- **Score = BIC / BDe**: integrates all variables' evidence globally
- **Search in CPDAG space**: avoids cycling among equivalent DAGs
- **Two-phase**: FES (insert) + BES (delete) — global greedy over equivalence classes

**Strengths:**
- Statistically more efficient than PC in large samples when the score model is correct
  (uses global evidence, not individual CI tests)
- No order-dependence (unlike original PC)
- Score function is principled (BIC = penalised likelihood with well-understood properties)
- FGES variant scales to thousands of variables via parallelism

**Weaknesses:**
- Requires specifying the score function (Gaussian, discrete, or a custom decomposable score)
- Score model misspecification (e.g. using BIC for a non-Gaussian process) leads to inconsistency
- Less interpretable than PC (cannot directly see which conditional independence drove each edge)
- Does not natively handle hidden confounders (requires GIES extension for interventions)

### Continuous Optimization: NOTEARS

[[NOTEARS - Overview]] makes a fundamentally different move: it reformulates the NP-hard
combinatorial structure search as a smooth constrained optimization problem using the
acyclicity function $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$:

$$\min_{W \in \mathbb{R}^{d\times d}} F(W) \quad \text{s.t.} \quad h(W)=0$$

where $F$ is the regularised least-squares score and $W$ is the weighted adjacency matrix.

**Strengths:**
- Polynomial-time per iteration ($O(d^3)$ for matrix exponential)
- Conceptually simple: ~50 lines of Python using off-the-shelf solvers
- No specialized graphical-model knowledge needed
- Directly leverages the SEM coefficient matrix interpretation

**Weaknesses:**
- Assumes **linear SEM**: $X_j = w_j^T X + z_j$. Non-linear relationships violate the model.
- Returns a **single DAG** (not the CPDAG): equivalent DAGs score equally under the
  least-squares loss, so the returned $W$ is one arbitrary member of its equivalence class —
  without orientation, the result is not more informative than a CPDAG
- Nonconvex optimization: only guaranteed to find a stationary point, not the global minimum
- The $\ell_1$ regularization parameter $\lambda$ is a tuning parameter

### Head-to-Head Comparison

> [!example] Benchmarking Context (Zheng et al. 2018, Table 1)
> NOTEARS compared to PC (via FGS baseline, a variant of GES) on:
> - Erdős-Rényi (ER) and scale-free (SF) graphs, $d = 20$, $n = 1000$
> - Gaussian, Exponential, and Gumbel noise distributions
>
> NOTEARS matched or beat FGS/GES on Structural Hamming Distance (SHD) and
> False Discovery Rate (FDR) for ER graphs. On scale-free graphs with hub nodes,
> NOTEARS was particularly competitive because scale-free networks violate the
> bounded-degree assumption that PC/GES rely on for polynomial runtime.
> See [[NOTEARS Experiments]] for full results.

### Decision Guide: Which Paradigm to Use?

| Situation | Recommended paradigm | Reason |
|-----------|---------------------|--------|
| Distribution is non-Gaussian, non-linear | PC (with kernel CI test) | Score-based requires correct score model; NOTEARS requires linearity |
| Large $n$, parametric model known | GES (BIC or BGe) | More statistically efficient; no $\alpha$ tuning |
| High-dimensional ($d$ large, graph sparse) | PC-stable or FGES | PC-stable polynomial for sparse; FGES parallelises |
| Computational speed priority, linear SEM | NOTEARS | Continuous optimization, polynomial iterations |
| Hidden confounders suspected | FCI (extension of PC) | GES/NOTEARS assume causal sufficiency |
| Interventional data available | GIES (extension of GES) | Uses both observational and interventional data |
| Unique DAG orientation desired | LiNGAM (non-Gaussian), ANM | Breaks CPDAG ceiling with functional-form restrictions |
| Reproducibility / interpretability | PC-stable | Explicit CI test decisions; order-independent |

### Software Ecosystem

```
causal-learn (Python)      pcalg (R)           Tetrad (Java)
├── PC                     ├── pc()             ├── PC
├── PC-stable (default)    ├── ges()            ├── FCI
├── FCI                    ├── fci()            ├── GES
├── GES                    └── ...              ├── BOSS
└── LiNGAM                                      └── ...

notears (Python)
└── notears_linear(), notears_nonlinear()
```

### Identifiability Summary Table

> [!note] What each paradigm identifies
> Under the shared Markov + Faithfulness + Causal Sufficiency assumptions:
>
> | Algorithm | Identifies | Conditions |
> |-----------|------------|-----------|
> | PC, GES | CPDAG | Markov + Faithfulness + Sufficiency |
> | FCI | PAG (Partial Ancestral Graph) | Markov + Faithfulness (no sufficiency) |
> | LiNGAM | Unique DAG | Markov + Faithfulness + Sufficiency + Non-Gaussian |
> | NOTEARS | One DAG from the CPDAG's class | Markov + Faithfulness + Sufficiency + Linearity |
> | GIES | More oriented CPDAG | Markov + Faithfulness + Sufficiency + Interventions |

## Connections

- **Causal reasoning from a given DAG**: [[Directed Acyclic Graphs]] covers what to do
  *after* the structure is learned — backdoor criterion, do-calculus, adjustment sets. Structure
  learning is the upstream step.
- **Summary DAGs and ABM**: [[Summary Causal DAGs]] discusses using DAGs summarised from
  ABM outputs (Zeng 2025). Structure learning (especially PC and GES) is the method that
  would produce such a DAG from ABM-simulated data.
- **LLM elicitation as an alternative**: [[LLM Expert Elicitation for Bayesian Networks]]
  elicits DAG structure from LLMs rather than learning it from data — complementary approach
  when data is scarce.
- **BN inference downstream**: [[BN Construction Methods Comparison]] discusses how the
  learned structure feeds into Bayesian network inference (variable elimination, belief propagation).

## See Also
- [[PC Algorithm]] — constraint-based algorithm (Phase 1–3 detail)
- [[Greedy Equivalence Search]] — score-based algorithm (FES + BES detail)
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[Markov Equivalence and CPDAGs]] — the shared target (CPDAG) of PC and GES
- [[DAG Structure Learning Problem]] — the formal landscape of all prior methods
- [[Directed Acyclic Graphs]] — what to do with a learned DAG (reasoning, adjustment)
- [[Summary Causal DAGs]] — downstream use: DAG summarization for ABM outputs
- [[LLM Expert Elicitation for Bayesian Networks]] — non-data-driven structure construction
