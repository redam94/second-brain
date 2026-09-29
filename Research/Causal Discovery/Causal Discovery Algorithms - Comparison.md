---
title: "Causal Discovery Algorithms - Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02b-GES-SOURCE.txt]]"
source_location: "Chickering (2002); Colombo & Maathuis (2014); Zheng et al. (2018)"
date_ingested: 2026-09-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[BN Construction Methods Comparison]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "structure learning algorithm comparison"
  - "PC GES NOTEARS comparison"
  - "causal discovery software"
---

# Causal Discovery Algorithms - Comparison

> [!summary]
> Three paradigms dominate algorithmic causal structure learning: **constraint-based** (PC),
> **score-based** (GES), and **continuous-optimization** (NOTEARS). They differ in their
> statistical assumptions, computational approach, output type, and practical failure modes.
> This note synthesises the three approaches into a practitioner's decision guide, connecting
> the detailed algorithm notes to help choose the right method for a given dataset.

## Overview

The vault's Causal Discovery folder now covers three algorithmic paradigms introduced in
roughly chronological order:

| Algorithm | Year | Paradigm | Key paper |
|-----------|------|----------|----------|
| [[PC Algorithm\|PC (PC-stable)]] | 1991 / 2014 | Constraint-based | Spirtes, Glymour & Scheines (2000); Colombo & Maathuis (2014) |
| [[Greedy Equivalence Search (GES)\|GES]] | 2002 | Score-based | Chickering (2002) |
| [[NOTEARS - Overview\|NOTEARS]] | 2018 | Continuous optimization | Zheng et al., NeurIPS 2018 |

All three assume **causal sufficiency** (no unmeasured confounders) and recover the CPDAG
or a DAG from observational data. Their paths diverge sharply after that.

## Main Content

### Structural comparison

> [!definition] Definition: Three Paradigm Overview
>
> | | **PC (constraint-based)** | **GES (score-based)** | **NOTEARS (continuous opt.)** |
> |---|---|---|---|
> | **Input** | CI tests (oracle) | Score function (BIC/BDe) | LS residuals |
> | **Search space** | DAGs via skeleton | Equivalence classes (CPDAGs) | $\mathbb{R}^{d\times d}$ matrices |
> | **Output** | CPDAG | CPDAG | DAG (specific) |
> | **Consistency** | Yes (faithful, sufficient) | Yes (faithful, sufficient) | Local opt. only |
> | **Global optimum** | Not guaranteed | Not guaranteed | Not guaranteed |
> | **Linear assumption** | No | No (if non-param. test) | Yes (linear SEM) |
> | **Gaussian** | No (with KCI test) | Assumed for BIC | Assumed for LS loss |
> | **Complexity** | Exp. in max degree | Exp. in num. parents | $O(d^3)$ per iter. |
> | **Tuning param.** | Significance $\alpha$ | Penalty $\lambda$ in BIC | $\lambda$ (sparsity) |
^def-comparison-table

### Assumptions: what each method requires

> [!note] Assumption Comparison
> **Faithfulness** is required by PC and GES. NOTEARS does not require faithfulness — it can
> recover a DAG even when faithfulness is violated — but it requires the **linear SEM**
> assumption, which PC and GES do not.
>
> **Causal Markov Condition** is required by all three.
>
> **Causal sufficiency** (no hidden confounders) is required by all three. The FCI algorithm
> extends PC to handle latent confounders, producing a PAG (partial ancestral graph) instead of
> a CPDAG.
>
> **Distribution class**: PC is non-parametric (with KCI test); GES requires a compatible
> score function (BIC for Gaussian, BDe for discrete); NOTEARS requires linearity.

### Computational characteristics

> [!note] Computational Complexity
> - **PC**: $O(d^{k+2})$ CI tests where $k$ = maximum degree in the skeleton. For sparse
>   graphs this is fast ($k \ll d$); for dense graphs it is exponential. Memory: $O(d^2)$.
> - **GES**: $O(d^4)$ score evaluations in the forward phase (each Insert evaluates at most
>   $O(d^2 \cdot 2^d)$ operators but the valid ones are much fewer for sparse graphs). In
>   practice, $O(d^3)$ to $O(d^4)$ for sparse graphs.
> - **NOTEARS**: $O(d^3)$ per augmented-Lagrangian step (matrix exponential). Fast-NOTEARS
>   variants achieve $O(d^2 \log d)$ with sparse structures. Very large $d$ (thousands) is
>   more tractable for NOTEARS than for PC/GES.

### When to use each method

> [!example] Practical Decision Guide
> **Use PC when:**
> - Data is non-Gaussian or non-linear (use kernel CI test).
> - You want assumption-minimal inference — only faithfulness and sufficiency.
> - $n \gg d$ (large sample, moderate $d$).
> - You want the CPDAG (full equivalence class), not a specific DAG.
> - Interpretability of the testing procedure is important.
>
> **Use GES when:**
> - Data is continuous Gaussian or discrete multinomial (BIC/BDe scores apply cleanly).
> - You want faster computation than PC for the same graph sparsity level.
> - $d$ is moderate (few hundred) and sparsity is mild.
> - You want score-based model selection built in (BIC handles overfitting).
>
> **Use NOTEARS when:**
> - Data satisfies a linear SEM (or you're willing to assume it).
> - $d$ is large (hundreds to thousands) and graph is dense — PC/GES become exponentially slow.
> - You want a specific DAG (not a CPDAG) — e.g., for direct causal interpretation.
> - You want to leverage GPU acceleration / black-box numerical solvers.
> - You need a differentiable structure-learning objective (e.g., for downstream NN training).

### Common pitfalls

> [!warning] Common Failure Modes
> - **PC / GES**: Faithfulness violations (path cancellations) cause false edge removals
>   that cascade through the algorithm. Dense graphs with many latent confounders → use FCI.
> - **GES BIC score**: Assumes equal noise variance across nodes by default; misspecified scores
>   lead to incorrect adjacency detection.
> - **NOTEARS**: Nonconvex program — finds stationary points, not global optima. Can produce
>   different DAGs on re-runs with different initialisations. The specific DAG output is
>   sensitive to the choice of $\lambda$ (sparsity).
> - **All methods**: Causal sufficiency is strong. Real datasets with unmeasured confounders
>   will see spurious edges. FCI (constraint-based) or RFCI are more appropriate.

### Empirical comparison on benchmarks

From the NOTEARS paper (Zheng et al. 2018), evaluated on Erdős-Rényi and scale-free graphs
with Gaussian/non-Gaussian noise, linear SEM:

| Method | SHD (lower = better) | Runtime |
|--------|---------------------|---------|
| FGS (fast GES) | Low for sparse graphs | Fast |
| PC | Moderate | Moderate |
| NOTEARS | **Lowest on linear SEM** | **Fastest at large $d$** |
| LiNGAM | Competitive (non-Gaussian) | Moderate |

See [[NOTEARS Experiments]] for detailed benchmarks. Note: GES/FGS and PC perform comparably
or better under non-linear / non-Gaussian settings where NOTEARS's linear assumption is violated.

### Software ecosystem

| Package | Language | PC | GES | NOTEARS | Notes |
|---------|----------|----|----|---------|-------|
| **pcalg** | R | ✓ (PC-stable, CPC) | ✓ (GES, ARGES) | ✗ | Reference implementation; Maathuis group |
| **causal-learn** | Python | ✓ | ✓ | ✓ | Active; port of pcalg + extensions |
| **gCastle** | Python | ✓ | ✓ | ✓ | Huawei; includes graph metrics |
| **Tetrad** | Java | ✓ | ✓ | ✗ | CMU; GUI + Java API |
| **notears** | Python | ✗ | ✗ | ✓ | Original Zheng et al. code; github.com/xunzheng/notears |

## Connections

- **ABM calibration**: structure learning can be applied to ABM output time-series —
  learn the causal graph *produced* by an ABM, then compare to domain knowledge.
  See [[Approximate Bayesian Computation for ABMs]] and [[Summary Causal DAGs]].
- **Bayesian Networks**: both PC and GES recover Bayesian network structures;
  see [[BN Construction Methods Comparison]] for expert-elicitation alternatives.
- **DAG Summarization**: [[Summary Causal DAGs]] (Zeng 2025) assumes the DAG is given;
  structure learning (PC/GES/NOTEARS) is the prerequisite step.
- **LLM elicitation**: [[LLM Expert Elicitation for Bayesian Networks]] builds BNs from
  expert knowledge; PC/GES/NOTEARS are the data-driven complement for when data is abundant.

## See Also
- [[PC Algorithm]] — constraint-based algorithm
- [[Greedy Equivalence Search (GES)]] — score-based algorithm
- [[NOTEARS - Overview]] — continuous-optimization algorithm
- [[Markov Equivalence and CPDAGs]] — common output representation
- [[DAG Structure Learning Problem]] — shared problem formulation
- [[Directed Acyclic Graphs]] — DAG semantics for causal reasoning
- [[Summary Causal DAGs]] — downstream use of learned structures
