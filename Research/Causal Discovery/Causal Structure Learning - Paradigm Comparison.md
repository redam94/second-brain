---
title: "Causal Structure Learning - Paradigm Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes et al. (2000); Chickering (2002); Zheng et al. (2018)"
source_location: "See individual notes for citations"
date_ingested: 2026-08-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Overview]]"
  - "[[NOTEARS - Overview]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "constraint-based vs score-based"
  - "causal discovery paradigms"
  - "structure learning comparison"
---

# Causal Structure Learning - Paradigm Comparison

> [!summary]
> Three paradigms dominate causal structure learning from observational data:
> **constraint-based** (PC: remove edges using CI tests), **score-based** (GES: greedily
> maximize a goodness-of-fit score over CPDAGs), and **continuous optimization** (NOTEARS:
> reformulate the combinatorial DAG constraint as a smooth equality). Each paradigm embodies
> different tradeoffs in assumptions, statistical efficiency, computational scaling, and
> interpretability. This note serves as a routing guide to the detailed notes in this folder.

## Overview

All three paradigms target the same goal: from $n$ i.i.d. observations of $d$ variables,
recover the CPDAG of the true causal DAG $\mathcal{G}^*$ (or a consistent estimate thereof).
They differ in *how* they use the data and *what structural assumptions* they require.

## Three paradigms

### 1. Constraint-based (PC algorithm)

> [!definition] Constraint-based approach
> Use **conditional independence tests** to determine which edges can be present in $\mathcal{G}^*$.
> Under faithfulness + Markov, every absent edge implies a CI statement; every CI statement
> implies an absent edge. The PC algorithm operationalizes this by iteratively removing edges
> that fail CI tests (skeleton phase) and orienting the remainder (v-structures + Meek rules).
>
> - **Core object**: conditional independence $X_i \perp\!\!\!\perp X_j \mid X_S$
> - **Output**: CPDAG
> - **Key papers**: Spirtes & Glymour (1991); Spirtes, Glymour & Scheines (2000)
> - **Primary note**: [[PC Algorithm - Overview]]

**Strength**: model-free — CI tests can be nonparametric (kernel, permutation), and the algorithm
does not assume a specific distributional family.

**Weakness**: In finite samples, CI test errors compound across the many tests performed.
Power degrades as $|S|$ increases. On dense graphs ($d$ large), the exponential number of
CI tests makes the algorithm infeasible without strong sparsity.

### 2. Score-based (GES)

> [!definition] Score-based approach
> Define a **score** $Q(\mathcal{G})$ measuring the fit of a graph $\mathcal{G}$ to the data.
> GES greedily optimizes this score over the space of Markov equivalence classes using
> Insert/Delete/Turn operators. Under faithfulness, Markov, and Gaussianity (with BIC),
> GES provably finds the globally optimal CPDAG as $n \to \infty$.
>
> - **Core object**: BIC score $Q(\mathcal{G}) = \sum_i Q_i(X_i, \text{pa}(X_i))$
> - **Output**: CPDAG
> - **Key paper**: Chickering (2002)
> - **Primary note**: [[GES - Overview]]

**Strength**: searches over equivalence classes directly — no CI testing, no compounding of
test errors. Provably consistent and statistically more efficient than PC under Gaussianity.

**Weakness**: requires a specific parametric family (Gaussian BIC for standard theory).
Non-Gaussian settings require custom scores. Edge-by-edge updates struggle on dense or
hub-heavy graphs (see [[NOTEARS Experiments]]).

### 3. Continuous optimization (NOTEARS)

> [!definition] Continuous optimization approach
> Reformulate the combinatorial acyclicity constraint $\mathcal{G}(W) \in \mathbb{D}$ as a
> smooth equality $h(W) = \text{tr}(e^{W \circ W}) - d = 0$, and minimize a regularized
> least-squares score over the full matrix $W \in \mathbb{R}^{d \times d}$ with this constraint.
> Solved with off-the-shelf numerical methods (augmented Lagrangian + L-BFGS).
>
> - **Core object**: weighted adjacency matrix $W$; smooth constraint $h(W) = 0$
> - **Output**: DAG (via thresholding) — not a CPDAG
> - **Key paper**: Zheng et al. (2018)
> - **Primary note**: [[NOTEARS - Overview]]

**Strength**: global updates of the full weight matrix — does not get stuck on hub nodes that
defeat edge-at-a-time search. Implementable in ~50 lines of code. Outperforms GES on denser
graphs in simulations.

**Weakness**: only guarantees a **stationary point** (not a global optimum); the program is
nonconvex. Outputs a single DAG (not a CPDAG), and may identify one member of an equivalence
class — the choice can be arbitrary in some settings. Requires a smooth score (gradient-based
solver).

## Assumptions comparison

| Assumption | PC | GES | NOTEARS |
|------------|-----|-----|---------|
| Causal Markov | ✓ required | ✓ required | ✓ implicitly |
| Faithfulness | ✓ required | ✓ required | Not needed for finite-sample |
| Causal sufficiency (no latent confounders) | ✓ required | ✓ required | ✓ required |
| Gaussian noise | Not required | Required for BIC consistency | Not required (any smooth noise) |
| Score equivalence | N/A | ✓ required | N/A |
| Linear SEM | Not required | Implied by BIC | ✓ required (basic NOTEARS) |

## Consistency comparison

| Property | PC | GES | NOTEARS |
|----------|-----|-----|---------|
| Population (oracle) | Finds true CPDAG | Finds true CPDAG | Finds stationary point |
| Finite-sample consistency | Yes (Kalisch & Bühlmann 2007) | Yes | Not established in general |
| High-dimensional ($p \gg n$) | Yes if sparse, CI test power | Not fully established | Not established |
| Output | CPDAG | CPDAG | Single DAG (may not be unique) |

## Computational comparison

| Metric | PC | GES | NOTEARS |
|--------|-----|-----|---------|
| Per-step cost | $O(d^3)$ Fisher's z (one CI test) | $O(d^2 k)$ local score update | $O(d^3)$ matrix exponential |
| Total complexity | $O(d^{q+2})$ ($q$=max degree) | $O(d^2)$ per phase (sparse) | Few (~10) outer iterations |
| Hub nodes (high degree) | Fails: $2^q$ tests per pair | Fails: local operator stuck | Good: global matrix update |
| Dense graphs | Fails | Fails | Best |

## Choosing a method

> [!note] Practical decision guide
> 1. **Non-Gaussian or nonparametric data**: use **PC** with a kernel or permutation CI test (KCI, HSIC).
> 2. **Gaussian linear data, $d < 100$, sparse**: use **GES** (BIC score, `pcalg::ges` or `causal-learn`).
> 3. **Large $d$, dense graphs, Gaussian or continuous**: try **NOTEARS** or its successors (DAGMA, NOTEARS-MLP for nonlinear).
> 4. **Latent confounders suspected**: use **FCI** (a PC extension that allows bidirected edges from hidden variables).
> 5. **Prior knowledge about some edges**: both PC and GES have extensions for background knowledge (forbidden/required edges).

## Extensions and successors

| Extension | Base algorithm | What it adds |
|-----------|---------------|-------------|
| FCI (Fast Causal Inference) | PC | Handles latent confounders (partial ancestral graphs / MAGs) |
| RFCI | PC | Faster FCI; fewer CI tests |
| GES + BDe score | GES | Bayesian scoring; works for discrete data |
| Hauser & Bühlmann (2012) | GES | Turning phase (Phase 3) for better finite-sample performance |
| DAGMA (Bello et al. 2022) | NOTEARS | Better-conditioned smooth acyclicity characterization |
| NOTEARS-MLP | NOTEARS | Nonlinear SEM via neural networks |

## Connections

- **[[NOTEARS - Overview]]** and [[NOTEARS Algorithm]] — the continuous-optimization paradigm in detail
- **[[PC Algorithm - Overview]]** — constraint-based, with [[PC Algorithm - Skeleton Phase]] and [[PC Algorithm - Orientation Phase]]
- **[[GES - Overview]]** — score-based paradigm in detail
- **[[DAG Structure Learning Problem]]** — the shared formal setup
- **[[Directed Acyclic Graphs]]** — d-separation, Markov equivalence, v-structures — foundations shared by all three
- **[[Approximate Bayesian Computation for ABMs]]** — structure learning can precede ABM calibration using the learned DAG as a summary

## See Also
- [[PC Algorithm - Overview]] — detailed PC reference
- [[GES - Overview]] — detailed GES reference
- [[NOTEARS - Overview]] — detailed NOTEARS reference
- [[Causal Discovery/_Index|Causal Discovery Index]]
