---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/causal-structure-learning-sources.md]]"
source_location: "Chickering (2002) JMLR; Kalisch & Bühlmann (2007) JMLR; Zheng et al. (2018) NeurIPS"
date_ingested: 2026-10-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "structure learning overview"
  - "causal discovery overview"
  - "learning DAGs from data"
---

# Causal Structure Learning - Overview

> [!summary]
> **Causal structure learning** (DAG structure learning) recovers a causal graph from
> observational data. Three algorithmic families dominate: **constraint-based** methods
> (PC algorithm: CI test the skeleton, orient v-structures), **score-based** methods
> (GES: greedy search over CPDAGs with BIC), and **continuous optimization** methods
> (NOTEARS: reformulate acyclicity as a smooth equality constraint). All three target
> the same object — a DAG or its Markov equivalence class (CPDAG) — but make different
> assumptions, have different computational profiles, and fail in different regimes.

## Overview

The vault's causal inference section covers DAG **reasoning** extensively ([[Directed Acyclic Graphs]],
[[Canonical Causal DAGs]], [[Summary Causal DAGs]]) and DAG **construction** from expert knowledge
([[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]]). This
cluster of notes fills the remaining gap: learning DAGs **from observational data**.

## Three Algorithmic Families

### 1. Constraint-based: PC algorithm

**Core idea**: test conditional independences (CIs) to determine which edges are absent,
then orient the remaining skeleton into a CPDAG.

- **Target**: CPDAG (Markov equivalence class).
- **Key papers**: Spirtes, Glymour & Scheines (2000); Kalisch & Bühlmann (2007) JMLR.
- **Consistency**: uniformly consistent even when $d \gg n$, under sparsity and faithfulness.
- **Strength**: makes minimal distributional assumptions; swappable CI tests allow adaptation
  to non-linear, non-Gaussian settings.
- **Weakness**: sensitive to CI test errors (multiple testing); causal sufficiency required.
- **See**: [[PC Algorithm]], [[Conditional Independence Tests for Causal Discovery]]

### 2. Score-based: GES algorithm

**Core idea**: define a scoring function (BIC) constant within each Markov equivalence class,
then greedily search the CPDAG space via Insert and Delete operators.

- **Target**: CPDAG.
- **Key papers**: Chickering (2002) JMLR (proves the Meek conjecture + consistency).
- **Consistency**: large-sample consistent under faithfulness + consistent score.
- **Strength**: implicit handling of multiple testing via single score; natural Bayesian
  interpretation (BIC approximates log-marginal likelihood).
- **Weakness**: assumes the model family (BIC for Gaussian; BGe for exact Bayesian);
  $O(d^5)$ naive complexity (mitigated by FGS).
- **See**: [[GES Algorithm]]

### 3. Continuous optimization: NOTEARS

**Core idea**: replace the discrete acyclicity constraint on DAGs with a smooth equality
constraint $h(W) = \text{tr}(e^{W \circ W}) - d = 0$, converting structure learning to
a continuous nonlinear program.

- **Target**: DAG (not just CPDAG) — the linear SEM assumption makes the full DAG identifiable.
- **Key papers**: Zheng et al. (2018) NeurIPS.
- **Consistency**: leverages linear SEM consistency theory (van de Geer & Bühlmann, 2013).
- **Strength**: implementable in ~50 lines of Python; no graphical-model specialized code.
- **Weakness**: linear SEM assumption; nonconvex program (stationary points only).
- **See**: [[NOTEARS - Overview]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]

## Comparison Table

| Property | PC | GES | NOTEARS |
|---|---|---|---|
| Target output | CPDAG | CPDAG | DAG |
| Algorithmic primitive | CI tests | Score (BIC) | Continuous optimization |
| Faithfulness needed | Yes | Yes | No (uses SEM consistency) |
| Distributional assumption | None (with kernel CI) | Gaussian / discrete | Linear SEM |
| Handles non-Gaussian | Yes (kernel CI) | Partially (rank) | Yes (non-Gaussian SEM) |
| Hidden confounders | No | No | No |
| Consistency | $d = o(e^{n^{1/3}})$, sparse | $n \to \infty$, sparse | $n \to \infty$, sparse |
| Complexity (sparse) | $O(d^{q+2})$ | $O(d^{q+2})$ (FGS) | $O(d^3)$ per iter |
| Software | `pcalg` R, `causal-learn` | `pcalg`, TETRAD/FGS | `notears` (GitHub) |
| NOTEARS benchmark | Outperformed by NOTEARS | Outperformed by NOTEARS | Best overall (dense/large) |

## Identifiability boundary

> [!note] What is identifiable from observational data?
> Under the **faithfulness + causal sufficiency** assumptions, observational data identifies
> the **CPDAG** — not the full DAG. The CPDAG's directed edges are causally identified;
> its undirected edges are not. Additional assumptions break this:
> - **Linear SEM + non-Gaussian noise**: LiNGAM (Shimizu et al. 2006) identifies the full DAG.
> - **Additive noise models**: non-linear cause + noise (Peters et al. 2014).
> - **Interventional data**: replaces some unoriented edges with oriented ones.
> NOTEARS exploits the linear SEM assumption to recover a full DAG rather than a CPDAG.

## ABM connection

> [!note] Structure learning for ABM outputs
> [[Summary Causal DAGs]] (§4, Zeng 2025) assumes the DAG is given — structure learning is
> the step that **precedes** DAG summarization. ABM simulation outputs (time series of agent
> states) can be treated as observational data, and PC or GES applied to learn the causal
> structure among aggregate variables. This is especially relevant for:
> - Validating whether a hypothesised causal structure is consistent with simulated data.
> - Discovering unexpected feedback loops in high-dimensional ABMs.
> The [[Approximate Bayesian Computation for ABMs]] framework conditions on moments of the
> simulated data; structure learning conditions on the conditional independence structure.

## See Also
- [[PC Algorithm]] — constraint-based; CI test skeleton + Meek orientation
- [[GES Algorithm]] — score-based; two-phase greedy search over CPDAGs
- [[Markov Equivalence and CPDAGs]] — the fundamental target (CPDAG) and its characterization
- [[Conditional Independence Tests for Causal Discovery]] — CI tests for the PC algorithm
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[DAG Structure Learning Problem]] — formal setup and prior method landscape
- [[Directed Acyclic Graphs]] — d-separation, faithfulness, back-door criterion
- [[Summary Causal DAGs]] — DAG summarization (post-structure-learning)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to learning
