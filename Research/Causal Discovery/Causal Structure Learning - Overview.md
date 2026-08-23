---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Based-Survey.md]]"
source_location: "Introduction and §PC vs. GES comparison"
date_ingested: 2026-08-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "causal discovery overview"
  - "DAG structure learning overview"
  - "constraint-based vs score-based discovery"
---

# Causal Structure Learning - Overview

> [!summary]
> **Causal structure learning** recovers the DAG (or its Markov equivalence class) from
> observational data. Three paradigms exist: **constraint-based** (test conditional independencies
> — PC algorithm), **score-based** (optimize a DAG quality score — GES), and **continuous
> optimization** (reformulate the NP-hard combinatorial problem as smooth optimization — NOTEARS).
> All three assume Markov + faithfulness + causal sufficiency and are asymptotically consistent.
> They differ in computational approach, finite-sample behavior, and output granularity (CPDAG
> vs. single DAG).

## Overview

Learning causal structure from observational data is one of the central problems in causal
inference. Unlike the *reasoning* side (given a DAG, compute effects via d-separation, back-door,
do-calculus), the *discovery* side asks: **given only data, what can we infer about the DAG?**

The vault already covers DAG reasoning extensively ([[Directed Acyclic Graphs]], [[Canonical
Causal DAGs]], [[Spurious Association and Confounds]]) and DAG construction from expert knowledge
([[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]]). This
note and its companions ([[PC Algorithm]], [[Greedy Equivalence Search]], plus the pre-existing
[[NOTEARS - Overview]]) fill the gap of **algorithmic causal discovery from data**.

Three paradigms have emerged:

| Paradigm | Key idea | Method | Output |
|----------|---------|--------|--------|
| **Constraint-based** | Independence tests reveal d-separations | [[PC Algorithm]] | CPDAG |
| **Score-based** | Maximize BIC/BDe over equivalence classes | [[Greedy Equivalence Search]] | CPDAG |
| **Continuous optimization** | Smooth acyclicity constraint $h(W)=0$ | [[NOTEARS - Overview]] | Single DAG |

## Main Content

### Fundamental Identification Limit

A key impossibility result sets the ceiling for what any method can recover from passive data:

> [!theorem] Theorem: Markov Equivalence as Identification Limit
> Under the Markov condition and faithfulness (and no additional distributional assumptions),
> the **best achievable identification** from passive observational data is the **Markov
> equivalence class** of the generating DAG $G^*$ — its CPDAG.
>
> *No algorithm can distinguish Markov-equivalent DAGs from passive observational data alone.*
> This is because equivalent DAGs encode identical independence models; the data can never
> provide evidence to distinguish between them.
^thm-identification-limit

**Implications**:
- A directed edge $X \to Y$ in the CPDAG is causally identified (same in all equivalent DAGs).
- An undirected edge $X - Y$ in the CPDAG is not identified — it could be $X \to Y$ or $X \leftarrow Y$.
- Interventional data (do-calculus, randomized experiments) can distinguish within-class DAGs.

**Exceptions where the full DAG is identified from passive data**:
1. **Non-Gaussian errors** (LiNGAM; Shimizu et al. 2006): Linear SEM with non-Gaussian noise
   identifies the full DAG, not just the CPDAG.
2. **Nonlinear additive noise** (ANM; Hoyer et al. 2009): Nonlinear SEMs with additive noise
   are identifiable.
3. **Time series**: Temporal ordering implies causal direction ($X_t \to Y_{t+1}$ but not
   $Y_{t+1} \to X_t$).

### Common Assumptions

All three paradigms share the same core assumptions:

> [!definition] Definition: Core Causal Discovery Assumptions
> 1. **Markov condition** (always assumed): $P$ satisfies the Markov condition w.r.t. $G^*$.
>    Equivalently: the joint distribution factorizes as $P(X) = \prod_i P(X_i \mid \mathrm{Pa}_{G^*}(X_i))$.
> 2. **Faithfulness** (always assumed): Only d-separations in $G^*$ produce independencies in $P$.
>    No accidental cancellations.
> 3. **Causal sufficiency** (assumed by PC, GES, NOTEARS; relaxed by FCI): No hidden common causes
>    / unmeasured confounders.
> 4. **Consistency of test/score** (asymptotic): Either the CI test is consistent, or the score
>    criterion is locally consistent (BIC, BDe).
^def-discovery-assumptions

### Paradigm 1: Constraint-Based (PC Algorithm)

The [[PC Algorithm]] recovers the CPDAG by testing conditional independence constraints directly.

**Key steps**:
1. **Skeleton discovery**: Start with the complete graph. Remove edge $X - Y$ if they are
   conditionally independent given some subset $Z$ of their neighbors. Record $Z$ as the
   separation set Sep($X,Y$).
2. **V-structure orientation**: For each unshielded triple $X - Y - Z$ (non-adjacent $X,Z$):
   orient $X \to Y \leftarrow Z$ if $Y \notin$ Sep$(X,Z)$.
3. **Meek rule propagation**: Apply rules R1–R4 to complete the CPDAG.

**Strengths**: Model-agnostic (test-based, not tied to distributional assumptions); scalable
on sparse graphs; intuitive.

**Weaknesses**: Multiple testing problem in Phase 1; order-dependent (use PC-stable variant);
choice of $\alpha$ affects sparsity; exponential worst-case for dense graphs.

### Paradigm 2: Score-Based (Greedy Equivalence Search)

[[Greedy Equivalence Search]] directly optimizes a scoring criterion over the space of
Markov equivalence classes.

**Key steps**:
1. **Forward Equivalence Search (FES)**: From the empty graph, greedily add edges (via the
   Insert operator) that most increase the BIC score, until no positive-gain insert exists.
2. **Backward Equivalence Search (BES)**: Greedily remove edges (via the Delete operator)
   until no positive-gain deletion exists.

**Strengths**: BIC penalty is calibrated for asymptotic consistency; two-phase structure
avoids certain local optima (via the Meek Conjecture); no multiple testing problem.

**Weaknesses**: Tied to a specific distributional assumption (Gaussian BIC or discrete BDe);
greedy search can miss global optimum; computationally intensive on dense graphs.

### Paradigm 3: Continuous Optimization (NOTEARS)

[[NOTEARS - Overview]] recasts the NP-hard combinatorial program as a **smooth continuous
optimization** by replacing the acyclicity constraint with $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$.

**Key steps**:
1. Define a weighted adjacency matrix $W \in \mathbb{R}^{d \times d}$ and minimize
   $F(W) = \frac{1}{2n}\|X - XW\|_F^2 + \lambda\|W\|_1$ subject to $h(W) = 0$.
2. Solve with augmented Lagrangian + L-BFGS (standard continuous optimizers).

**Strengths**: Conceptually simple; ~50 lines of Python; no graphical-model expertise needed.

**Weaknesses**: Non-convex program — only guaranteed to find stationary points; outputs a
single DAG, not a CPDAG (does not exploit equivalence class structure); requires a linear SEM
assumption for the loss $F(W)$.

### Three-Paradigm Comparison

| Property | [[PC Algorithm]] | [[Greedy Equivalence Search]] | [[NOTEARS - Overview]] |
|----------|------------------|-------------------------------|------------------------|
| **Target** | CPDAG | CPDAG | Single DAG $W$ |
| **Approach** | CI tests | Score maximization | Continuous optimization |
| **SEM assumption** | Not required | Not required (but BIC is Gaussian) | Linear SEM required |
| **Global optimum** | Yes (w/ oracle) | Not guaranteed (greedy) | Stationary point |
| **Computation (sparse)** | $O(p^2)$ | $O(p^2)$ per step | $O(d^3)$ per L-BFGS step |
| **Computation (dense)** | Exponential | Exponential (enumeration) | $O(d^3)$ (continuous) |
| **Multiple testing** | Yes (level $\alpha$) | No (BIC calibration) | No (regularization $\lambda$) |
| **Hidden confounders** | FCI extension | Extensions exist | No extension |
| **Empirical winner** (NOTEARS benchmark) | Worse on dense graphs | Comparable to NOTEARS | Best on dense/large graphs |

### When to Use Which

| Scenario | Recommendation |
|----------|---------------|
| Sparse graph, $p < 100$, Gaussian | PC-stable (fast, principled) |
| Sparse graph, $p < 100$, discrete data | GES with BDe score |
| Dense graph, large $p$ | NOTEARS or FGES |
| Non-linear / non-Gaussian SEM | ANM, LiNGAM, or NOTEARS extensions |
| Hidden confounders possible | FCI (constraint-based) |
| Time series | PCMCI (PC extension for temporal data) |
| ABM output → structure learning | GES or PC on simulation-averaged data |

### Connection to ABM Causal Discovery

The vault's ABM section (e.g., [[Summary Causal DAGs]], [[Approximate Bayesian Computation
for ABMs]]) typically *assumes* a DAG and uses it for reasoning or summarization. Causal
structure learning algorithms (PC, GES, NOTEARS) can be applied to:

1. **ABM simulation output**: Run the ABM many times, collect multivariate output trajectories,
   and apply PC or GES to learn which variables Granger-cause which others.
2. **Causal model validation**: Compare the learned CPDAG to the theorized causal model
   embedded in the ABM (expert knowledge vs. data-driven structure).
3. **Zeng 2025 DAG summarization** ([[Summary Causal DAGs]]): The summarization algorithm
   *assumes* a full DAG is given — structure learning is the step that *precedes* summarization.

## Connections

- **Theoretical foundation**: [[Markov Equivalence and CPDAGs]] defines the CPDAG and Meek rules
  that both PC and GES target as output.
- **Problem setup**: [[DAG Structure Learning Problem]] establishes the formal learning objective
  (score optimization over DAG space), the NP-hardness result, and the landscape of approaches
  (including the "constraint-based" and "local search" categories that PC and GES instantiate).
- **Causal reasoning**: [[Directed Acyclic Graphs]] covers what to *do* with a DAG once you
  have it (d-separation, back-door criterion, do-calculus). Structure learning is what precedes it.
- **BN construction alternatives**: [[BN Construction Methods Comparison]] and [[LLM Expert
  Elicitation for Bayesian Networks]] cover expert-knowledge-based alternatives to algorithmic
  discovery.
- **Empirical baseline**: [[NOTEARS Experiments]] compares GES and PC against NOTEARS on
  synthetic Erdős-Rényi and scale-free graphs.

## See Also
- [[PC Algorithm]] — constraint-based discovery: skeleton, V-structures, Meek propagation
- [[Greedy Equivalence Search]] — score-based discovery: FES + BES, Meek Conjecture
- [[Markov Equivalence and CPDAGs]] — theoretical foundation: faithfulness, CPDAG, Meek rules
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — problem setup and prior methods landscape
- [[Directed Acyclic Graphs]] — DAG reasoning: d-separation, back-door, do-calculus
- [[Summary Causal DAGs]] — application of learned DAGs from ABM output
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to discovery
