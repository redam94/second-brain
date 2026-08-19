---
title: "Causal Structure Learning - Methods Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2 Background, Table 1 (prior methods landscape)"
date_ingested: 2026-08-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Constraint-Based Causal Discovery]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
aliases:
  - "causal discovery overview"
  - "structure learning methods"
  - "PC vs GES vs NOTEARS"
---

# Causal Structure Learning — Methods Comparison

> [!summary]
> Three major paradigms exist for learning DAG structure from observational data: **constraint-based**
> methods (PC algorithm), **score-based search** (GES), and **continuous optimization** (NOTEARS
> and successors). This note maps the landscape, compares the three approaches on assumptions,
> output type, scalability, software, and empirical behaviour, and provides decision guidance for
> choosing a method. All three target the same problem — recovering the causal DAG's Markov
> equivalence class — but via fundamentally different computational strategies.

## Overview

The problem of learning a causal DAG from observational data — **causal structure learning** or
**causal discovery** — is one of the central open problems in causal inference. The three main
paradigms represent different answers to the question: *how do you tractably search over the
astronomically large space of DAGs?*

The three paradigms are:

1. **Constraint-based** (PC, FCI): directly exploit conditional independence structure.
2. **Score-based greedy search** (GES, FGES): optimise a score over equivalence class space.
3. **Continuous optimization** (NOTEARS, DAGMA, GOLEM): relax the combinatorial constraint to a smooth program.

## Three-Way Comparison

| Dimension | PC Algorithm | GES | NOTEARS |
|-----------|-------------|-----|---------|
| **Core idea** | CI tests → prune skeleton | Greedy score search over CPDAGs | Continuous $\ell_1$-penalised LS with smooth acyclicity constraint |
| **Output** | CPDAG (equivalence class) | CPDAG (equivalence class) | Weighted adjacency matrix $W$ (point estimate within an equivalence class) |
| **Key assumption** | Markov + Faithfulness + Causal sufficiency | Markov + Faithfulness + Causal sufficiency | Markov + Faithfulness OR just consistency of LS estimator |
| **Faithfulness required?** | Yes — for edge removal | Yes — for score consistency | No — consistency proved without faithfulness for Gaussian/non-Gaussian SEM |
| **Runtime** | $O(d^{k_{\max}+2})$ CI tests | $O(d^5)$ worst-case, $O(d^3)$ typical | $O(d^3)$ per iteration (matrix exp), $<10$ augmented Lagrangian steps |
| **Scales to** | $d \sim 1000$ (sparse, Gaussian) | $d \sim 10^4$ with FGES | $d \sim 1000$ (current implementations) |
| **R implementation** | `pcalg::pc()` | `pcalg::ges()` | `notears` (Python) |
| **Python** | `causal-learn` (pcalg port) | `causal-learn::GES` | `notears` package; `causal-learn::NOTEARS` |
| **Handles non-Gaussian?** | Yes (with kernel CI tests) | Partially (score must be specified) | Yes (non-Gaussian SEM is theoretically justified) |
| **Key references** | Spirtes, Glymour & Scheines (2000) | Chickering (2002, *JMLR*) | Zheng, Aragam, Ravikumar & Xing (2018, NeurIPS) |

## Assumptions and Identifiability

All three methods face the fundamental **observational equivalence** limit:

> [!theorem] Fundamental Limit of Observational Causal Discovery
> From observational data alone (no interventions), it is impossible to distinguish between
> all DAGs in the same **Markov equivalence class** (same skeleton + same unshielded colliders).
> At best, we can recover the **CPDAG** representing the entire equivalence class.
> Uniquely identifying the true DAG requires either:
> (a) Additional assumptions (e.g., non-Gaussianity → LiNGAM; equal noise variances → Identifiable SEM), or
> (b) Interventional data (experiments, do-calculus).
^thm-obs-limit

### When is the DAG uniquely identifiable?

| Assumption | Method | Claim |
|------------|--------|-------|
| Linear SEM + Gaussian noise | PC / GES | Identify CPDAG only |
| Linear SEM + **non-Gaussian** noise | LiNGAM (Shimizu et al. 2006) | Identify **full DAG** (ICA-based) |
| Linear SEM + **equal noise variances** | Peters & Bühlmann (2014) | Identify full DAG |
| Non-linear SEM + additive noise (ANM) | ANM methods | Identify full DAG |
| Interventional data | Perfect interventions / ICP | Identify DAG up to the intervention targets |

## Decision Guide

**Use PC when:**
- The CI test is well-calibrated for your data type (Gaussian: Fisher's Z; discrete: $\chi^2$/$G^2$; non-Gaussian: kernel CI).
- You want a method that is transparent — you can audit which CI tests drove each edge removal.
- Sample sizes are moderate and $d$ is large but the graph is very sparse.

**Use GES when:**
- You have a well-defined decomposable score function for your data (BIC for Gaussian; BDeu for discrete).
- You want asymptotic optimality guarantees (GES recovers the score-optimal CPDAG).
- $d$ is very large → use FGES (Fast GES) which parallelises score evaluations.

**Use NOTEARS (or DAGMA) when:**
- You want a point estimate of edge weights (not just skeleton), allowing magnitude comparisons.
- You need a simple, gradient-friendly implementation that plugs into a machine learning pipeline.
- Faithfulness is a concern — NOTEARS's LS estimator is consistent without faithfulness for Gaussian SEMs.
- You need to extend to non-linear SEMs (use DAG-GNN, NOTEARS-MLP variants).

## Connections to the Rest of the Vault

- **ABM causal structure discovery**: [[Summary Causal DAGs]] uses Zeng et al. (2025) to
  summarise complex ABM causal graphs — the input DAG to that workflow can come from running
  PC or GES on ABM simulation outputs. See also [[Approximate Bayesian Computation for ABMs]].
- **Expert elicitation vs. data-driven**: [[LLM Expert Elicitation for Bayesian Networks]] and
  [[BN Construction Methods Comparison]] cover expert-driven BN construction. PC/GES are the
  data-driven alternative, and hybrid approaches (expert priors + data constraint) are an active area.
- **DAG reasoning**: once a CPDAG is estimated by PC/GES, all the d-separation, back-door, and
  front-door results in [[Directed Acyclic Graphs]] apply to the estimated graph.
- **Interventional learning**: PC has a generalization (FCI) for latent confounders (outputs a PAG,
  not a CPDAG); GES has an interventional extension (IGSP). These connect to the do-calculus
  coverage in [[Directed Acyclic Graphs]].

## Software Ecosystem Summary

```
R:        pcalg (pc, ges, fci, rfci, ida, gies)
Python:   causal-learn (PC, GES, NOTEARS, LiNGAM, GRANGER, ...)
          notears   (original NOTEARS implementation)
          dagma     (DAGMA: NOTEARS successor with log-det acyclicity constraint)
```

The `pcalg` package also implements `skeleton()` (Phase 1 only), `udag2pdag()` (Phase 3 only),
and `RFCI` (Really Fast Causal Inference, approximate FCI for large $d$).

## See Also
- [[PC Algorithm - Constraint-Based Causal Discovery]] — detailed PC algorithm treatment
- [[GES - Greedy Equivalence Search]] — detailed GES treatment
- [[DAG Structure Learning Problem]] — formal problem setup
- [[NOTEARS - Overview]] — NOTEARS in detail
- [[Directed Acyclic Graphs]] — d-separation, Markov properties, do-calculus
- [[Summary Causal DAGs]] — downstream use of learned DAGs
- [[LLM Expert Elicitation for Bayesian Networks]] — expert elicitation alternative
- [[Causal Discovery/_Index|Causal Discovery Index]]
