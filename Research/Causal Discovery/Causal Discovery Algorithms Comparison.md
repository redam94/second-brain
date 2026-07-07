---
title: "Causal Discovery Algorithms Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-CausalDiscovery-Survey.md]]"
source_location: "Part 4: Comparative Overview"
date_ingested: 2026-07-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "causal structure learning comparison"
  - "PC vs GES"
  - "constraint-based vs score-based"
---

# Causal Discovery Algorithms Comparison

> [!summary]
> The three main paradigms for learning causal DAGs from data are **constraint-based** (PC),
> **score-based** (GES), and **continuous optimization** (NOTEARS). They share the same
> identifiable target under faithfulness — the CPDAG — but differ radically in assumptions,
> scalability, robustness to finite samples, and output format. This note is the synthesis
> guide for choosing among them.

## Overview

All three methods — [[PC Algorithm]], [[Greedy Equivalence Search (GES)]], and
[[NOTEARS - Overview]] — solve the same fundamental problem: recover a causal DAG from
$n$ i.i.d. observations under the faithfulness assumption. But they operationalize this
differently, and the choice matters in practice.

The **constraint-based** paradigm (PC) uses statistical independence tests to prune the graph.
The **score-based** paradigm (GES) uses a scoring function to search over graph structures.
The **continuous optimization** paradigm (NOTEARS) relaxes the discrete DAG constraint to a
smooth equality constraint and uses gradient-based solvers. A fourth paradigm — **functional
causal models** (LiNGAM, CAM, ANMs) — exploits distributional assumptions (non-Gaussianity,
nonlinearity) to fully identify individual edge orientations beyond the MEC; it is not covered here.

## Full Comparison Table

| Dimension | PC / PC-stable | GES (+ FGES) | NOTEARS |
|-----------|---------------|--------------|---------|
| **Paradigm** | Constraint-based (CI tests) | Score-based (MEC navigation) | Continuous optimization |
| **Output** | CPDAG | CPDAG | Single DAG (thresholded $W$) |
| **Theoretical guarantee** | Consistent with oracle CI tester (SGS 2000) | Consistent with locally consistent score (Chickering 2002) | No global consistency guarantee from local stationarity |
| **Core assumption** | Faithfulness + causal sufficiency | Faithfulness + causal sufficiency | Faithfulness + linear SEM |
| **Hidden confounders** | No (FCI for PAGs) | No (RFCI for PAGs) | No |
| **Non-Gaussian data** | Use HSIC/KCI instead of Fisher Z | Use non-Gaussian score | Cannot exploit; use LiNGAM instead |
| **Scalability** | $O(d^2 \cdot p^{\delta})$ tests ($\delta$ = max degree) | $O(d^2 \cdot p^{\delta})$ score evals; FGES parallelizes | $O(d^3)$ per step (matrix exp); fast for large $d$ |
| **Sensitivity to errors** | Error propagation from CI tests to orientations | More robust: single global score | Sensitive to threshold choice $\omega$ |
| **Sparse regime** | Excellent (few CI tests needed) | Good | Good ($\ell_1$ regularization) |
| **Dense regime** | Poor (exponential CI tests) | Moderate | Good |
| **Software (R)** | `pcalg::pc()`, `pcalg::skeleton()` | `pcalg::ges()` | `notears` Python (no R package) |
| **Software (Python)** | `causal-learn` (`PC`) | `causal-learn` (`GES`), `cdt` | `notears` (github.com/xunzheng/notears) |
| **Software (GUI)** | TETRAD (`PC`) | TETRAD (`GES`, `FGES`) | — |
| **Invented by** | Spirtes & Glymour (1991), PC-stable: Colombo & Maathuis (2014) | Chickering (2002) | Zheng, Aragam, Ravikumar & Xing (2018) |

## Decision Guide: When to Use Each

### Use PC when:
1. **You have a reliable CI oracle** — large $n$, data that satisfies the Gaussian linearity
   assumption (or you can use KCIT), and you trust the test calibration.
2. **The graph is sparse** — low maximum degree $\delta$ keeps the conditioning set search
   tractable.
3. **Transparency is required** — every edge removal is justified by a specific CI test and
   separating set. Auditable.
4. **Discrete or mixed data** — the $\chi^2$ or $G^2$ CI test adapts PC to non-continuous data.
5. **You suspect hidden confounders** — switch to FCI (same skeleton phase; different orientation).

### Use GES when:
1. **You want theoretical guarantees in the Gaussian setting** — BIC + GES is provably consistent
   for linear Gaussian SEMs without needing an oracle CI tester.
2. **The sample size is moderate** ($n \gtrsim 500d$) — GES outperforms PC in finite samples
   because score optimization is less sensitive to individual test errors.
3. **You need a principled score to optimize** — e.g., for model averaging or integration with
   a Bayesian workflow.
4. **Large $d$** — FGES parallelizes over pairs and scales to thousands of variables.

### Use NOTEARS when:
1. **You want fast, simple implementation** — NOTEARS runs in ~50 lines of Python on top of
   any standard optimizer; no graph-theory knowledge required.
2. **The priority is speed over consistency** — NOTEARS is faster per iteration than GES at
   the same $d$, especially for dense graphs.
3. **You are post-processing outputs** — NOTEARS can be combined with thresholding and
   bootstrapping to produce uncertainty estimates over edges.
4. **You want differentiability** — NOTEARS fits naturally into neural network pipelines
   (e.g., DAG-GNN, NoCurl) where the acyclicity constraint must be differentiable.

> [!warning] NOTEARS Output Format
> NOTEARS returns a **single DAG** (thresholded weighted adjacency matrix $W$), not a CPDAG.
> To compare NOTEARS with PC/GES, convert the output to a CPDAG using the `dag2cpdag` function
> in `pcalg` (R) or the equivalent TETRAD transformation. The SHD (structural Hamming distance)
> metric used in [[NOTEARS Experiments]] benchmarks against the true CPDAG.

## Shared Assumptions: What All Three Require

All three methods assume:

> [!theorem] Faithfulness Is Required by All Paradigms
> Under **acyclicity** (the data-generating mechanism is a DAG), the **Causal Markov condition**
> (the distribution factorises over the DAG), and **faithfulness** (no accidental CIs), the
> observational distribution identifies the MEC of the true DAG. All three algorithms target
> this MEC. Without faithfulness, CI tests mislead PC, BIC misleads GES, and the NOTEARS
> objective has multiple local minima corresponding to incorrect DAGs.
^thm-shared-faithfulness

**Causal sufficiency** (no hidden confounders) is required by all three in their basic form.
When violated, use FCI (for PC), RFCI (for GES), or add latent variables to the SEM.

## Software Recommendations

### R ecosystem
```r
library(pcalg)
# PC (constraint-based)
pc.fit <- pc(suffStat = list(C = cor(X), n = nrow(X)),
             indepTest = gaussCItest, alpha = 0.01, p = ncol(X))
# GES (score-based)
ges.fit <- ges(new("GaussL0penObsScore", data = X))
```

### Python ecosystem
```python
from causal_learn.search.ConstraintBased.PC import PC
from causal_learn.search.ScoreBased.GES import ges
from causal_learn.score.LocalScoreFunction import local_score_BIC

# PC
pc = PC(X)
pc.learn()
pc_graph = pc.causal_matrix

# GES
ges_result = ges(X, score_func='local_score_BIC')
ges_graph = ges_result['G'].graph  # CPDAG
```

For NOTEARS, use `https://github.com/xunzheng/notears` directly.

## Evaluation Metrics

When benchmarking causal discovery algorithms (as in [[NOTEARS Experiments]]):

| Metric | Formula | Notes |
|--------|---------|-------|
| **SHD** (Structural Hamming Distance) | Symmetric difference of skeleton + v-structures | Lower is better; 0 = exact CPDAG recovery |
| **FDR** (False Discovery Rate) | $\mathrm{FP} / (\mathrm{FP} + \mathrm{TP})$ among estimated edges | |
| **FPR** | $\mathrm{FP} / (\mathrm{FP} + \mathrm{TN})$ among non-edges | |
| **TPR / Recall** | $\mathrm{TP} / (\mathrm{TP} + \mathrm{FN})$ | |
| **Time** | Wall-clock seconds | NOTEARS often fastest per run |

## Connections to the Broader Vault

- **NOTEARS theory:** The NOTEARS series ([[NOTEARS - Overview]], [[Smooth Characterization of Acyclicity]],
  [[NOTEARS Algorithm]], [[NOTEARS Experiments]]) covers the continuous optimization approach in depth.
- **Expert-elicited DAGs:** When expert knowledge is available, [[LLM Expert Elicitation for Bayesian Networks]]
  and [[BN Construction Methods Comparison]] cover hybrid approaches. Structure learning from
  data (this note cluster) is complementary — run GES first, then refine with expert knowledge.
- **ABM summary DAGs:** [[Summary Causal DAGs]] assumes a ground-truth DAG is given. In practice,
  structure learning (PC/GES/NOTEARS) on ABM simulation output is what *produces* this ground-truth
  candidate — see the gap discussion in the Dream index.
- **DAG causal semantics:** The back-door criterion, d-separation, and do-calculus in [[Directed Acyclic Graphs]]
  apply once the CPDAG has been oriented into a specific DAG using background knowledge or interventions.
- **Bayesian network inference:** [[LLM-BN Decision Support Application]] uses PyAgrum for BN
  inference — PC or GES would be the upstream structure-learning step before PyAgrum's CPT
  estimation.

## See Also
- [[PC Algorithm]] — constraint-based algorithm (full description)
- [[Greedy Equivalence Search (GES)]] — score-based algorithm (full description)
- [[NOTEARS - Overview]] — continuous optimization approach
- [[Markov Equivalence Classes and CPDAGs]] — the identifiable target all three target
- [[DAG Structure Learning Problem]] — problem setup and landscape of prior approaches
- [[Directed Acyclic Graphs]] — causal semantics once a DAG is selected from the CPDAG
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven learning
- [[Summary Causal DAGs]] — downstream application of learned causal structures
