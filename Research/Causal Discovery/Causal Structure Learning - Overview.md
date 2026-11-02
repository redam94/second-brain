---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/spirtes2000-PC-algorithm-source.md]]"
source_location: "Spirtes et al. (2000); Chickering (2002); Kalisch & Bühlmann (2007); Zheng et al. (2018)"
date_ingested: 2026-11-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[BN Construction Methods Comparison]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal discovery overview"
  - "DAG learning taxonomy"
  - "structure learning methods comparison"
---

# Causal Structure Learning - Overview

> [!summary]
> **Causal structure learning** is the problem of recovering a DAG (or its Markov equivalence
> class) from observational (and possibly interventional) data. Three paradigms dominate:
> (1) **constraint-based** methods (PC, FCI) use conditional independence tests;
> (2) **score-based** methods (GES, hill-climbing) optimise a model selection score over the
> DAG/CPDAG space; (3) **continuous optimization** methods (NOTEARS, DAGMA) reformulate the
> combinatorial constraint as a smooth equality constraint. Each paradigm has different
> assumptions, failure modes, and computational tradeoffs.

## Overview

Learning the structure of a directed acyclic graph from data is one of the central problems
in causal inference, Bayesian networks, and machine learning. The problem is NP-hard in general
(Chickering et al. 2004), which motivates a variety of approximate and asymptotically-consistent
algorithms.

This vault covers three paradigms:

| Paradigm | Key Algorithm | Core Idea | Output |
|----------|--------------|-----------|--------|
| Constraint-based | [[PC Algorithm]] (Spirtes et al. 2000) | CI tests → skeleton → v-structures → Meek rules | CPDAG |
| Score-based | [[Greedy Equivalence Search]] (Chickering 2002) | Greedy search over MEC space; BIC score | CPDAG |
| Continuous optimization | [[NOTEARS - Overview]] (Zheng et al. 2018) | $h(W)=\mathrm{tr}(e^{W\circ W})-d=0$ is a smooth DAG constraint | Weighted DAG |

## Main Content

### The Three Paradigms

#### 1. Constraint-Based Methods

**Core principle:** A pair $(X_i, X_j)$ is adjacent in $G^*$ if and only if there is no
conditioning set $\mathbf{S}$ for which $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ in $P$.
This is the **faithfulness** characterisation of adjacency.

The [[PC Algorithm]] implements this by:
1. Starting with the complete graph.
2. Removing edge $X_i - X_j$ if any CI test $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ passes.
3. Orienting remaining edges using v-structure detection and Meek's rules.

**Strengths:** Non-parametric in principle (kernel CI tests work for any distribution); does
not require a parametric score; FCI extension handles latent confounders.
**Weaknesses:** Sensitive to CI test errors (especially at small $n$ or large $p$); the number
of CI tests grows as $O(p^{q+2})$; no single likelihood to optimise.

#### 2. Score-Based Methods

**Core principle:** Define a score $S(G, \mathbf{X})$ (e.g., BIC) that measures how well $G$
fits the data, penalizing complexity. Find the DAG (or MEC) maximizing the score.

[[Greedy Equivalence Search]] implements this by:
1. Starting from the empty CPDAG.
2. Greedily inserting edges (Forward Phase) then removing edges (Backward Phase) in the
   CPDAG space, using Insert and Delete operators on Markov equivalence classes.
3. Using the Meek Conjecture ([[Markov Equivalence and CPDAGs#thm-meek-conjecture]]) to ensure
   correctness of the CPDAG operators.

**Strengths:** Single objective function (BIC); asymptotically consistent under local
consistency; Bayesian extensions (BGe score) fit naturally.
**Weaknesses:** Score-based methods require a parametric model; BIC consistency requires
$n \to \infty$ with $p$ fixed (or slow growth); GES can find local maxima.

#### 3. Continuous Optimization

**Core principle (NOTEARS, Zheng et al. 2018):** The DAG constraint (acyclicity) is
reformulated as a smooth equality: $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$. This converts
the NP-hard combinatorial problem into an equality-constrained numerical program solvable by
augmented Lagrangian + L-BFGS.

**Strengths:** Scales to $p \sim 100$ without graph-specialized machinery; ~50 lines of Python;
returns a weighted adjacency matrix with explicit edge weights.
**Weaknesses:** Assumes linear SEM; returns a *single DAG* (not the full CPDAG, unlike PC/GES);
not guaranteed to find a global optimum (only stationary points); sensitive to hyperparameters
($\lambda$ regularization, threshold $\omega$).

### Identifying Assumptions Comparison

| Assumption | PC | GES | NOTEARS |
|-----------|-----|-----|---------|
| Acyclicity | Required | Required | Required |
| Faithfulness | Required | Required | Not required (but needed for causal interpretation) |
| Causal sufficiency (no latent confounders) | Required (relax via FCI) | Required (relax via GIES) | Required |
| Linearity / parametric model | No (kernel CI tests work) | Parametric score | Linear SEM required |
| Gaussian errors | No (for kernel CI tests) | No (BGe/BDe work) | No (any noise distribution) |

### The Fundamental Identifiability Limit

From **purely observational data**, no algorithm can recover more than the **Markov equivalence
class** (CPDAG) under the standard assumptions. This is a mathematical impossibility, not a
limitation of any specific algorithm.

Full DAG identification requires additional assumptions:
- **Non-Gaussianity of noise** (LiNGAM, Shimizu et al. 2006): If errors are non-Gaussian,
  the full DAG is identifiable.
- **Nonlinear additive noise** (ANM, Peters et al. 2014): Identifiable if structural equations
  are nonlinear with additive noise.
- **Interventional data**: Performing randomised interventions orients reversible edges
  (see GIES, Hauser & Bühlmann 2012).

### Connection to ABM Structure Learning

The vault's ABM section ([[Summary Causal DAGs]], [[Approximate Bayesian Computation for ABMs]])
uses DAGs to summarize ABM causal structure. Structure learning provides the *data-driven*
complement:

1. **Run ABM → collect simulated data** (observational or interventional trajectories).
2. **Apply PC or GES** to the simulated data to recover the implied causal DAG.
3. **Compare to expert-specified DAG** — structure learning tests whether the ABM's implemented
   mechanisms match those implied by the data it generates.

This connection is noted in [[DAG Structure Learning Problem]]'s `used_by` field
(`Q - Using SMM to Calibrate Agent Based Models`). The structural estimation approach
(Grazzini & Richiardi 2015 — see [[Structural Estimation of ABMs via SMM]]) is complementary:
rather than learning DAG structure, it matches ABM output moments to real data moments.

## See Also
- [[PC Algorithm]] — constraint-based algorithm; full description with pseudocode
- [[Greedy Equivalence Search]] — score-based algorithm; full description with pseudocode
- [[Markov Equivalence and CPDAGs]] — the fundamental identifiability limit for observational data
- [[Conditional Independence Testing for Structure Learning]] — the CI tests that PC depends on
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — the formal problem definition shared by all three
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, and causal interpretation
- [[Summary Causal DAGs]] — using causal DAGs to summarize ABM structure
- [[BN Construction Methods Comparison]] — comparison of data-driven vs. expert-elicitation BN methods
