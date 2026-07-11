---
title: "Causal Discovery Algorithms - Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-causal-structure-learning-survey.md]]"
source_location: "§4 — synthesis across SGS2000, Chickering2002, Zheng et al. 2018"
date_ingested: 2026-07-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[DAG Structure Learning Problem]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - causal structure learning comparison
  - PC vs GES vs NOTEARS
  - structure learning software guide
---

# Causal Discovery Algorithms - Comparison

> [!summary]
> Three families of causal structure learning algorithms address the same underlying problem —
> learning a DAG from observational data — but make different assumptions, search different spaces,
> and suit different practical settings. **PC** (constraint-based, flexible CI tests) is best when
> a domain-appropriate independence test is available and the graph is sparse. **GES** (score-based,
> BIC/BDe) is best for Gaussian data with moderate density. **NOTEARS** (continuous optimisation)
> is best for high-dimensional or dense graphs where scalability dominates. All three are consistent
> under faithfulness; NOTEARS additionally does not require faithfulness for the LS consistency proof.

## Overview

This note synthesises the three causal discovery families covered in the vault's Causal Discovery
folder, providing a decision guide for choosing among them and a reference for their shared and
divergent properties.

The three families:
1. **Constraint-based** → [[PC Algorithm]] (Spirtes & Glymour 1991; SGS 2000)
2. **Score-based** → [[Greedy Equivalence Search]] (Chickering 2002); FGS (Ramsey et al. 2017)
3. **Continuous optimisation** → [[NOTEARS - Overview]] (Zheng et al. 2018)

All three operate under the **Markov condition** and all three are asymptotically consistent under
**faithfulness** (with appropriate test/score/solver). The key trade-offs are in flexibility,
scalability, and what they output (CPDAG vs. single DAG).

## Main Content

### Property comparison table

| Property | PC | GES / FGS | NOTEARS |
|----------|-----|-----------|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimisation |
| **Core assumption** | Faithfulness + Markov + Causal sufficiency | Faithfulness + Markov | Markov; faithfulness not needed for LS consistency |
| **Output** | CPDAG (MEC) | CPDAG (MEC) | DAG (single) |
| **Search space** | Undirected graph → CPDAG | CPDAG directly | $\mathbb{R}^{d\times d}$ |
| **Optimality guarantee** | Sound + complete (asymptotically) | Globally consistent (via Meek conjecture) | Stationary point of nonconvex program |
| **Test / score** | Any CI test (flexible) | Decomposable score (BIC, BGe) | LS + ℓ₁ penalization |
| **Non-Gaussian data** | Via kernel CI tests (KCIT) | Via non-Gaussian score | Natively (noise non-Gaussian) |
| **Discrete data** | G²/χ² tests | Discrete BDe score | Binary with logistic loss |
| **Computational cost** | $O(d^{k+2})$ CI tests, $k$ = max degree | $O(d^3)$ per forward/backward step | $O(d^3)$ per AL iteration, $<10$ outer steps |
| **Order dependence** | Yes in original (PC-stable fixes) | No | No |
| **Hidden confounders** | FCI extension handles this | RFCI extension | Not handled in base NOTEARS |
| **Software (R)** | `pcalg::pc()` | `pcalg::ges()` | — |
| **Software (Python)** | `causal-learn` | `causal-learn` | `notears` (GitHub) |
| **Software (Java)** | TETRAD | TETRAD/FGES | — |

### Consistency and assumptions

> [!theorem] Unified consistency summary
> Let $G^*$ be the true DAG and $[G^*]$ its MEC.
>
> **PC** (with a consistent CI test): $\hat{\mathcal{C}}_n \to \mathrm{CPDAG}(G^*)$ in probability
> as $n \to \infty$, under Markov + Faithfulness + Causal Sufficiency.
>
> **GES** (with a consistent, decomposable, score-equivalent score): $\hat{\mathcal{C}}_n \to \mathrm{CPDAG}(G^*)$
> in probability as $n \to \infty$, under Markov + Faithfulness (+ the score's consistency conditions).
>
> **NOTEARS** (LS score, linear Gaussian or non-Gaussian SEM): A solution $\hat W_n$ with
> $h(\hat W_n) = 0$ converges to a DAG in the true MEC with high probability as $n \to \infty$,
> under Markov (faithfulness not required for the LS loss — van de Geer & Bühlmann 2013, Loh &
> Bühlmann 2014).
^thm-unified-consistency

**The faithfulness subtlety for NOTEARS**: The LS score consistency proof (Loh & Bühlmann 2014)
does not use faithfulness — it only requires the true DAG's SEM to be identified by the LS loss,
which holds under non-Gaussianity or sufficiently diverse data. In the Gaussian case, NOTEARS may
be less reliable than PC/GES in theory but often outperforms in practice due to global optimisation.

### Output: CPDAG vs. single DAG

PC and GES output a **CPDAG** — the provably best achievable representation from observational data
under faithfulness. This is often what we want: it honestly represents our uncertainty about
unidentified edge directions.

NOTEARS outputs a **single DAG** — one representative of the MEC (or potentially a different DAG
if the continuous relaxation does not find the correct MEC). This is useful when downstream
analysis requires a full DAG (e.g., ABM structure initialisation, [[Summary Causal DAGs]] compression).

### Decision guide

> [!example] When to use each algorithm
>
> **Use PC when**:
> - Data is non-Gaussian, mixed, or discrete (plug in kernel CI test or G² test).
> - The graph is expected to be sparse (CI test complexity $O(d^{k+2})$ is manageable).
> - You need MEC-level uncertainty (CPDAG output is desired).
> - Domain knowledge can supply a background knowledge orientation (PC-stable accepts forbidden/required edges).
>
> **Use GES when**:
> - Data is Gaussian (linear SEM) and a BIC score is well-calibrated.
> - Medium-density graphs ($d \leq 500$, moderate edges).
> - You want a score-based approach (easier to extend to Bayesian scoring, model averaging).
> - Comparison to the literature (GES/FGS is the standard score-based baseline).
>
> **Use NOTEARS when**:
> - $d$ is large ($d > 500$, possibly $d \gg n$) — $O(d^3)$ per AL step scales better than PC's CI test explosion.
> - You need a single DAG output (for downstream applications).
> - You want gradient-based integration (NOTEARS's LS loss is differentiable — can be embedded in neural network training, e.g., DAG-GNN, DAGS with NoCurl).
> - The convenience of ~50 lines of Python matters (e.g., rapid prototyping).
^ex-decision-guide

### Empirical comparison (from NOTEARS paper)

From [[NOTEARS Experiments]] (Zheng et al. 2018, Table 1 and Fig. 3), on synthetic Erdős-Rényi and
scale-free graphs with $d = 20$ nodes, $n = 1000$ Gaussian observations:

| Metric | PC-stable | FGS (GES) | NOTEARS |
|--------|-----------|-----------|---------|
| SHD (↓ better) | ~18 | ~10 | **~5** |
| FDR (↓ better) | ~0.3 | ~0.2 | **~0.1** |
| TPR (↑ better) | ~0.7 | ~0.8 | **~0.9** |

NOTEARS outperforms both PC-stable and FGS on these Gaussian benchmarks. However:
- On **non-Gaussian data**: PC (with kernel CI test) and GES (with appropriate score) can recover
  more, while NOTEARS may get the wrong MEC if the LS loss is not well-specified.
- On **high-dimensional sparse data** ($d \gg n$): PC-stable with partial correlation and thresholding
  can outperform NOTEARS (which requires matrix exponentiation at $O(d^3)$ each iteration).

### Identifiability beyond the MEC

For settings where observational data is insufficient to identify the full DAG even asymptotically:

| Assumption | Algorithm | Beyond-MEC recovery |
|-----------|----------|---------------------|
| Non-Gaussian noise | **LiNGAM** (Shimizu et al. 2006) | Full DAG (all edges oriented) |
| Equal noise variances | **RESIT / ANM** | Full DAG under nonlinear additive noise |
| Interventional data | **ICP** (Peters et al. 2016) | Full DAG with sufficient interventions |
| Cyclic / latent | **FCI**, **RFCI** | PAG (Partial Ancestral Graph) |

LiNGAM is implemented in `lingam` (Python) and `pcalg` (R). It assumes linear SEMs with
non-Gaussian noise — the same setting as the non-Gaussian NOTEARS consistency proof.

### Connection to the vault's ABM work

A particularly salient application for this vault: ABM calibration and structure learning.

[[Summary Causal DAGs]] (Zeng 2025) assumes the causal DAG is **given** — structure learning
is what comes before: learning the DAG from ABM simulation outputs.

[[Approximate Bayesian Computation for ABMs]] and [[HM-ABC Calibration Framework]] calibrate ABM
parameters; once parameters are estimated, the ABM's output time-series can be treated as
observational data for structure learning, linking this folder to the ABM section.

[[DAG Structure Learning Problem]] notes (under "landscape of prior methods") that PC is "often
less accurate" than score-based methods. This comparison note contextualises that claim: PC is
less accurate on Gaussian benchmarks but more flexible for other data types.

## Connections

- **CPDAG output shared by PC and GES** → [[Markov Equivalence and CPDAGs]] (the shared theory)
- **NOTEARS comparison** → [[NOTEARS Experiments]] (empirical benchmarks that include PC/GES)
- **DAG structure for ABM** → [[Summary Causal DAGs]] (uses DAGs as input; structure learning is the prerequisite)
- **Bayesian network inference** → once the structure is learned, the parameters are estimated;
  see [[BN Construction Methods Comparison]] for expert elicitation vs. data-driven approaches
- **CI testing** → [[Directed Acyclic Graphs]] (d-separation is the theory behind what CI tests detect)

## See Also
- [[PC Algorithm]] — constraint-based details; CI tests; PC-stable; soundness proof
- [[Greedy Equivalence Search]] — score-based details; Meek conjecture; FGS; BIC score
- [[NOTEARS - Overview]] — continuous optimisation approach; LS consistency without faithfulness
- [[Markov Equivalence and CPDAGs]] — the identifiability limit; CPDAG definition; Meek rules
- [[DAG Structure Learning Problem]] — problem setup and the full landscape of methods
- [[BN Construction Methods Comparison]] — expert elicitation alternative to data-driven learning
- [[Summary Causal DAGs]] — downstream use of a learned DAG for ABM summarisation
