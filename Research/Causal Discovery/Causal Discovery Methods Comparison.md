---
title: "Causal Discovery Methods Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-SGS-reference.md]]"
source_location: "Synthesis across Spirtes et al. (2000), Chickering (2002), Zheng et al. (2018)"
date_ingested: 2026-09-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Constraint-Based Causal Discovery]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "Structure learning method comparison"
  - "PC vs GES vs NOTEARS"
---

# Causal Discovery Methods Comparison

> [!summary]
> Three paradigms dominate observational causal structure learning: **constraint-based** (PC),
> **score-based** (GES), and **continuous-optimization** (NOTEARS). They share the same goal
> — recovering the data-generating DAG from observational data — but differ fundamentally in
> their search strategy, assumptions, output representation, and practical behavior. This note
> synthesizes the three methods into a practitioner's decision guide.

## Overview

As of the late 2010s–early 2020s, the causal discovery literature has converged on three
complementary paradigms. No single method dominates:

- **PC** is model-agnostic, non-parametric, and applicable wherever a valid CI test exists.
  It struggles with order-dependence and high CI-test error accumulation in dense graphs.
- **GES** is asymptotically optimal under BIC and faithful distributions, but needs a likelihood
  model and becomes expensive when $d$ is very large (ameliorated by FGES).
- **NOTEARS** is continuous, differentiable, and extremely easy to implement (~50 lines).
  It assumes linear SEMs, targets a single DAG (not the full CPDAG), and requires
  careful thresholding.

## Main Content

### Summary comparison table

| Property | PC | GES (FGES) | NOTEARS |
|----------|-----|------------|---------|
| **Paradigm** | Constraint-based (CI tests) | Score-based (equivalence classes) | Continuous optimization |
| **Search space** | Undirected skeleton → CPDAG | CPDAG space (equivalence classes) | $\mathbb{R}^{d\times d}$ (all weighted matrices) |
| **Output** | CPDAG (MEC) | CPDAG (MEC) | Single DAG $\hat{W}$ |
| **Distributional assumption** | None (uses any CI test) | Yes (score, e.g. BIC with Gaussian) | Yes (linear SEM) |
| **Causal model assumption** | Markov, Faithfulness, Sufficiency | Markov, Faithfulness, Sufficiency | Linear SEM + Faithfulness |
| **Identifies full DAG?** | No (up to MEC ambiguity) | No (up to MEC ambiguity) | Yes (outputs one DAG, but may be wrong) |
| **Identifies MEC?** | Yes, consistently | Yes, consistently | No (does not output CPDAG) |
| **Consistency** | $\checkmark$ (under faithfulness + sparse) | $\checkmark$ (under faithfulness, BIC) | $\checkmark$ (for linear SEM + faithfulness) |
| **Scalability** | $O(d^{k+2})$ CI tests | $O(d^2)$ operators (FGES: parallel) | $O(d^2)$ matrix operations |
| **High-dim ($d \gg n$)?** | Yes (sparse graphs, Kalisch & Bühlmann) | Partial (FGES scales to $d\sim10^6$) | Yes (with $\ell_1$ regularization) |
| **Non-linear relationships** | Yes (use KCI or other tests) | Requires non-linear score | No (linear SEM only; extensions exist) |
| **Latent confounders?** | Use FCI extension | Not directly | Not directly |
| **Canonical reference** | Spirtes et al. (2000) | Chickering (2002) | Zheng et al. (2018) |
| **Software** | `pcalg` (R), `causal-learn` | TETRAD, `causal-learn` (FGES) | `notears` (Python), `causal-learn` |

### Detailed paradigm comparison

#### Constraint-based (PC)

> [!note] When to use PC
> - Data are **non-Gaussian** or **discrete**: PC can use a non-parametric CI test (kernel CI,
>   $G^2$) without assuming a likelihood family. GES and NOTEARS require distributional
>   assumptions.
> - **Exploratory skeleton analysis**: PC's skeleton phase gives a robust estimate of the
>   undirected adjacency structure, useful even when full CPDAG orientation is unreliable.
> - **Large sample sizes**: PC's CI tests are powerful in $n \gg d$ settings; high-dimensional
>   settings require careful $\alpha$ calibration.
>
> **Weakness**: PC accumulates errors from CI tests — a single false edge removal in Phase 1
> can propagate through v-structure and Meek orientation, yielding incorrect orientation.
> In dense graphs ($k$ large), the number of CI tests grows exponentially.

#### Score-based (GES/FGES)

> [!note] When to use GES/FGES
> - **Gaussian linear SEMs**: GES with BIC is provably optimal and has the strongest
>   consistency guarantees.
> - **Very high dimensions** ($d \sim 10^3$–$10^6$): FGES parallelizes well and caches
>   local scores efficiently.
> - **Fewer parameters to tune**: GES does not require choosing a significance level $\alpha$
>   (unlike PC). The BIC penalization is automatic.
>
> **Weakness**: GES requires a decomposable score (BIC), which assumes a parametric model
> for the conditional distributions. Non-Gaussian, discrete, or complex conditional
> distributions require a custom score.

#### Continuous-optimization (NOTEARS)

> [!note] When to use NOTEARS
> - **Linear SEM setting**: when the linear structural equation model is appropriate (or as
>   a first approximation), NOTEARS is the fastest and simplest to implement.
> - **Integration with deep learning**: the continuous formulation extends naturally to
>   non-linear SEMs via neural network parameterizations (DAG-GNN, GRAN-DAG, NOTEARS-MLP).
> - **Gradient-based optimization**: NOTEARS plugs into any automatic differentiation
>   framework (PyTorch, JAX), enabling joint learning of DAG structure and downstream tasks.
>
> **Weakness**: NOTEARS returns a **single DAG** with edge weights, not a CPDAG. It does
> not account for MEC uncertainty. Empirically, NOTEARS can find locally optimal solutions
> far from the true graph when the loss landscape is highly non-convex. Reitsma et al. (2021)
> showed that NOTEARS does not consistently identify the true DAG in the linear SEM even
> under faithfulness, due to the landscape structure — a fundamental limitation.

### Empirical comparison (from NOTEARS Experiments)

From [[NOTEARS Experiments]] (Zheng et al. 2018, Table 1 / Fig. 3), comparing
NOTEARS vs. FGS (FGES) on Erdős–Rényi (ER) and scale-free (SF) random graphs with
Gaussian, Exponential, and Gumbel noise:

| Setting | NOTEARS advantage | FGS/GES advantage |
|---------|------------------|-------------------|
| Dense graphs (ER, high avg. degree) | Lower SHD (structural Hamming distance) | — |
| Sparse graphs (low avg. degree) | Comparable | Slightly lower FDR in some settings |
| Non-Gaussian noise | Competitive | — |
| Real data (Sachs protein signaling) | Comparable | — |

> [!note] NOTEARS vs. global optimum
> The NOTEARS paper additionally compares against GOBNILP (the exact global optimizer).
> NOTEARS finds solutions within ~1–2% of the global optimum in most settings, despite only
> being guaranteed to find stationary points of the nonconvex program.

### Decision guide for practitioners

> [!example] Decision flowchart
>
> 1. **Do you have latent confounders?** → Yes → Use FCI (extension of PC). No → Continue.
>
> 2. **Is the relationship linear?** → No → Use PC with KCI test, or consider non-linear
>    extensions of NOTEARS (NOTEARS-MLP, DAG-GNN). Yes → Continue.
>
> 3. **Is $d > 500$?** → Yes → Use FGES (efficient GES) or NOTEARS (with $\ell_1$ sparsity).
>    No → Continue.
>
> 4. **Do you need MEC-level uncertainty?** (i.e., you want to know which edges are identifiable
>    and which are not) → Yes → Use PC or GES (both output CPDAGs). No → NOTEARS gives a
>    single DAG with edge weights.
>
> 5. **Is distributional form known (Gaussian)?** → Yes → GES/BIC is theoretically optimal.
>    No (non-parametric, discrete) → PC with an appropriate CI test.

## ABM context

This vault's ABM work ([[Summary Causal DAGs]], [[Approximate Bayesian Computation for ABMs]])
raises a specific use case: **learning DAGs from ABM simulation output**.

> [!note] Structure learning on ABM data
> ABM outputs (agent-level time series, aggregate statistics) can be treated as observational
> data for structure learning. The resulting DAG summarizes the causal mechanisms in the ABM's
> emergent behavior — as described in [[Summary Causal DAGs]] (Zeng et al., 2025).
>
> **Recommended approach for ABM structure learning**:
> - If the ABM generates linear-ish continuous outputs: NOTEARS is fastest and easiest.
> - If the ABM generates binary/categorical or strongly non-linear outputs: PC with a
>   non-parametric CI test (KCI) is more appropriate.
> - For high-dimensional ABM outputs ($d > 100$): FGES is scalable and does not require
>   linearity.
>
> **Key limitation**: all three methods assume *i.i.d.* data. ABM outputs are often
> time series with autocorrelation. Time-series extensions (PCMCI, DYNOTEARS, Granger
> causality testing) are needed for temporal ABM data.

## See Also
- [[PC Algorithm]] — constraint-based method
- [[Greedy Equivalence Search]] — score-based method
- [[NOTEARS - Overview]] — continuous-optimization method
- [[NOTEARS Experiments]] — empirical comparison
- [[Markov Equivalence and CPDAGs]] — what PC and GES output
- [[DAG Structure Learning Problem]] — the problem landscape
- [[Summary Causal DAGs]] — applying structure learning to ABM outputs
- [[Directed Acyclic Graphs]] — DAG causal semantics shared by all three methods
