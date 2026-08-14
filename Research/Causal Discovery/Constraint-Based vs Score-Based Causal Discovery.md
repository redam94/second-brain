---
title: "Constraint-Based vs Score-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2016-selective-GES.pdf]]"
source_location: "§1 Introduction & §2 Related Work, pp. 1–2"
date_ingested: 2026-08-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[DAG Structure Learning Problem]]"
used_by: []
aliases:
  - "causal discovery paradigms"
  - "constraint-based causal discovery"
  - "score-based causal discovery"
  - "continuous optimisation causal discovery"
---

# Constraint-Based vs Score-Based Causal Discovery

> [!summary]
> Causal structure learning algorithms split into three paradigms, each with a different primary object: **constraint-based** methods (e.g. [[PC Algorithm]]) search for the graph consistent with a set of conditional independence (CI) constraints extracted from data; **score-based** methods (e.g. [[GES - Greedy Equivalence Search]]) optimise a statistical score over the space of DAGs or equivalence classes; and **continuous optimisation** methods (e.g. [[NOTEARS - Overview]]) reformulate the combinatorial DAG constraint as a smooth equality and use numerical solvers. All three target the same underlying object — the **DAG of the data-generating mechanism** — but differ sharply in what finite-sample guarantees they offer, what structural assumptions they require, and how they handle model misspecification. Under ideal conditions (Markov, faithfulness, causal sufficiency, large $n$), PC and GES both recover the true **CPDAG**; NOTEARS recovers a DAG (not a CPDAG), sacrificing identifiability for computational tractability.

## Overview

The three paradigms represent different answers to a single question: *how do you impose the acyclicity constraint while searching for the best-fitting graph?*

| Paradigm | Key object | Acyclicity handling | Output |
|----------|-----------|---------------------|--------|
| Constraint-based | CI test results | Implicit (skeleton + orientation rules) | CPDAG |
| Score-based | Score surface on CPDAG space | Operators preserve CPDAG validity | CPDAG |
| Continuous optimisation | Smooth acyclicity function $h(W)$ | Equality constraint $h(W)=0$ | DAG |

Choosing among paradigms requires understanding each one's assumptions, failure modes, and computational profile.

## Main Content

### Constraint-Based Methods

Exemplar: [[PC Algorithm]] (Spirtes, Glymour & Scheines 1993).

**Core idea**: The **Markov property** + **faithfulness** together imply that the skeleton and v-structures of the true DAG are identifiable from conditional independence relations in the data. Constraint-based methods extract these relations via CI tests, then apply deterministic orientation rules.

**Strengths**:
- **Model agnostic**: The only distributional requirement is that CI tests are reliable. Any CI test can be plugged in — kernel-based tests, permutation tests, rank-based tests — making the method applicable to non-Gaussian, non-linear, or discrete data without changing the algorithm.
- **Interpretable intermediate steps**: The skeleton phase, v-structure phase, and Meek propagation phase each have a clear causal interpretation. Failures are diagnosable.
- **Extends to latent confounders**: FCI replaces PC when causal sufficiency is violated; the PAG output encodes the additional uncertainty from hidden common causes.

**Weaknesses**:
- **Multiple testing burden**: The skeleton phase performs $O(d^2 \cdot 2^{k_{\max}})$ CI tests in the worst case. Each test has finite-sample error; errors compound as the skeleton is progressively refined.
- **Threshold sensitivity**: CI test significance level $\alpha$ is a global tuning parameter. A single false positive in Phase 1 propagates to wrong v-structures and wrong orientations.
- **Order dependence (classical PC)**: The skeleton can differ based on the order in which edges are processed. Fixed by [[PC Algorithm#^def-pc-stable|PC-stable]] (Colombo & Maathuis 2014).
- **Faithfulness fragility**: Near-faithfulness violations (near-cancellations in linear SEMs) produce unreliable CI tests on moderate samples.

### Score-Based Methods

Exemplar: [[GES - Greedy Equivalence Search]] (Chickering 2002).

**Core idea**: Fit a **score** (e.g. BIC, BDeu) to the data, and search over graph space for the score-maximising structure. GES searches directly over the CPDAG space via Insert/Delete operators, in two greedy phases (FES → BES).

**Strengths**:
- **Single statistical model**: All decisions flow from one coherent score function — no multiple CI testing. Finite-sample fluctuations are bounded by the score's rate of convergence.
- **Native CPDAG space search**: GES operators are designed to stay within the space of valid CPDAGs. The IMAP ordering provides an elegant framework: FES builds up to an IMAP of the truth; BES peels back to the truth.
- **Theoretical guarantees**: Theorem 1 (Chickering 2002) — see [[GES - Greedy Equivalence Search#^thm-ges-consistency]] — is among the strongest consistency results in the field.
- **Polynomial complexity via SGES**: Chickering & Meek (2016) show that restricting BES to Π-consistent delete operators reduces complexity to polynomial without sacrificing correctness.

**Weaknesses**:
- **Score misspecification**: If the assumed parametric family (e.g. Gaussian linear) is wrong, the score is biased and GES may recover the wrong structure even at large $n$. Constraint-based methods with nonparametric CI tests are more robust.
- **Equivalence-invariant scores required**: Scores must assign equal values to all members of an equivalence class — a non-trivial condition that rules out some natural scoring functions.
- **Computationally heavier operators**: Each Insert/Delete operator requires evaluating a score delta over a family of variables. FES is cheap (no false negatives to correct); BES is expensive (all potential deletions must be evaluated).

### Continuous Optimisation Methods

Exemplar: [[NOTEARS - Overview]] (Zheng, Aragam, Ravikumar & Xing 2018).

**Core idea**: Replace the combinatorial DAG constraint $\mathsf{G}(W) \in \mathbb{D}$ with a **smooth equality constraint** $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$ (see [[Smooth Characterization of Acyclicity]]), and solve the resulting equality-constrained program with an augmented Lagrangian solver.

**Strengths**:
- **No specialised graph machinery**: Standard numerical optimisers (L-BFGS) apply directly. The full matrix $W$ is updated at each step — global updates rather than edge-at-a-time local search.
- **Scalable to dense graphs**: Empirically outperforms FGS (= FGES) on dense/hub-heavy graphs (SF-4 setting; see [[NOTEARS Experiments]]). Local-search methods struggle when hub nodes have many parents.
- **Modular**: The score $F(W)$ can be swapped to handle non-linear SEMs (follow-up work), time series, or other data types.

**Weaknesses**:
- **Outputs a DAG, not a CPDAG**: NOTEARS picks an arbitrary representative of the equivalence class. This is a principled identification limitation: the algorithm cannot, from observational data, distinguish equivalent DAGs. Practical consequence: reported edges may have wrong orientations for reversible edges.
- **Nonconvex program**: Only local (stationary point) convergence guaranteed. In practice, close to the global optimum for ER/SF graphs at $n=1000$ (see [[NOTEARS Experiments#^def-setup]]), but worst-case guarantees are absent.
- **Smoothness requirement**: Requires a smooth score (gradient-based solver). Non-smooth or discrete scores (e.g. BDeu) need special treatment (Nesterov smoothing), not yet developed.
- **$O(d^3)$ matrix exponential**: Cubic cost per iteration from the matrix exponential; limits applicability to moderate $d$ without approximation.

### Side-by-Side Comparison

> [!example] Algorithm Comparison Table
>
> | Property | PC | GES / SGES | NOTEARS |
> |----------|----|-----------| --------|
> | **Paradigm** | Constraint-based | Score-based | Continuous opt. |
> | **Primary statistic** | CI test p-values | Score (BIC/BDeu) | Score + $h(W)$ |
> | **Output** | CPDAG | CPDAG | DAG |
> | **Identifiability** | Up to Markov equiv. class | Up to Markov equiv. class | Single DAG (arbitrary orientation) |
> | **Consistency** | ✓ (large $n$, faithfulness) | ✓ (Theorem 1, Chickering 2002) | Stationary point only |
> | **Causal sufficiency needed** | ✓ (FCI relaxes) | ✓ | ✓ |
> | **Complexity** | $O(q^{k_{\max}})$ | $O(d^2 \cdot 2^{k_{\max}})$ BES; poly. w/ SGES | $O(d^3)$/iter, $\sim$10 iters |
> | **Misspecification robustness** | High (nonparam. CI tests possible) | Lower (score must be correct) | Lower (smooth score required) |
> | **Dense graph performance** | Poor | Poor (improves w/ SGES) | **Strong** |
> | **Software** | pcalg, causal-learn | pcalg, TETRAD/FGES | notears (Python) |
^tbl-comparison

### When to Use Which

**Use PC when**:
- Data may be non-Gaussian or non-linear (use kernel CI tests).
- Causal sufficiency is suspected to be violated (switch to FCI).
- You need an interpretable, step-by-step causal argument and diagnosable failure points.
- Sample size is large enough for reliable CI testing at the needed conditioning depths.

**Use GES/SGES when**:
- Data fit a well-specified parametric model (Gaussian linear, or discrete with BDeu).
- You want the strongest theoretical guarantee of CPDAG recovery.
- Computational budget allows the two-phase search (SGES makes this manageable).
- You do not need to handle hidden confounders.

**Use NOTEARS (or follow-up differentiable DAG methods) when**:
- The graph is dense or contains hub nodes (high in-degree).
- You want to leverage numerical optimisation tooling (GPUs, automatic differentiation).
- Exact CPDAG recovery is less important than good structural Hamming distance to the truth.
- You are in a setting where the equivalence-class ambiguity (reversible edges) is acceptable or will be resolved by intervention.

## Connections

- **Shared target (PC & GES)**: Both output CPDAGs — the canonical representation of the Markov equivalence class. See [[Markov Equivalence and CPDAGs]].
- **Landscape context**: [[DAG Structure Learning Problem]] contains the broader landscape table situating all three paradigms alongside exact methods (GOBNILP), order-based methods (GSP), and hybrid methods (MMHC).
- **Empirical ranking**: [[NOTEARS Experiments]] provides direct GES vs NOTEARS comparisons across ER/SF graph families and multiple noise models. GES is competitive on sparse graphs; NOTEARS wins on dense.
- **Theoretical depth**: [[GES - Greedy Equivalence Search#^thm-ges-consistency]] (Chickering 2002) and the IMAP ordering give GES the strongest theoretical footing of the three.

## See Also
- [[PC Algorithm]] — constraint-based algorithm, Phase 1–3, Meek rules
- [[GES - Greedy Equivalence Search]] — score-based algorithm, FES + BES, SGES
- [[Markov Equivalence and CPDAGs]] — shared output format: CPDAGs
- [[DAG Structure Learning Problem]] — problem setup and prior-method landscape
- [[NOTEARS - Overview]] — continuous optimisation paradigm
- [[NOTEARS Experiments]] — PC, GES, and NOTEARS empirical comparison
