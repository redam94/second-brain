---
title: "Causal Discovery Algorithm Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "Zheng et al. (2018), §2.2 (prior method landscape) + §5 (experimental comparison)"
date_ingested: 2026-08-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by: []
aliases:
  - "structure learning comparison"
  - "causal discovery methods comparison"
  - "PC vs GES vs NOTEARS"
---

# Causal Discovery Algorithm Comparison

> [!summary]
> Three main paradigms now dominate observational causal structure learning from continuous data:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS and its descendants). All three assume faithfulness and causal sufficiency, and all
> three target the CPDAG (PC and GES explicitly; NOTEARS implicitly via DAG recovery). The choice
> between them depends on data type, graph density, sample size, and whether Gaussianity holds.
> For sparse graphs with large $n$, GES tends to win; for dense graphs or large $d$, NOTEARS-class
> methods dominate; for non-Gaussian or discrete data, constraint-based methods with appropriate
> CI tests are most flexible.

## Overview

The three algorithm families occupy distinct positions in the space of causal discovery:

| Feature | PC | GES | NOTEARS |
|---------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Primary input** | CI test results ($\alpha$) | Score function (BIC) | Continuous loss (LS + $\ell_1$) |
| **Core operation** | Edge removal by CI test | Greedy operator (insert/delete CPDAG) | Global matrix gradient descent |
| **Output** | CPDAG | CPDAG | Weighted DAG |
| **Asymptotic guarantee** | True CPDAG (faithfulness) | True CPDAG (faithfulness) | Stationary point (not always global optimum) |
| **Identifies unique DAG?** | No (only up to MEC) | No (only up to MEC) | Yes (but may be locally optimal) |
| **Faithfulness needed** | Yes | Yes | Implicitly (SEM faithfulness) |
| **Causal sufficiency** | Yes (FCI for relaxation) | Yes | Yes |
| **Gaussian data** | Fisher's z (exact) | BIC (exact) | LS score (exact) |
| **Non-Gaussian** | KCI / dHSIC (slower) | Modified score | Same LS (may be less efficient) |
| **Discrete data** | χ² / CMI | BDe score | Not directly applicable |
| **Worst-case complexity** | Exponential CI tests | Exponential operators | Polynomial (O(d³) per gradient) |
| **Sparse graph performance** | Good ($O(d^2)$ typical) | Good (polynomial ops) | Good |
| **Dense graph performance** | Poor (adj sets grow) | Poor (FES overshoot) | **Best** (global updates) |
| **Large $d$ scalability** | Moderate (pcalg) | Good (FGES) | Good (PyTorch / JAX) |

## Paradigm details

### Constraint-based: PC

The PC algorithm ([[PC Algorithm]]) searches for edges consistent with **conditional independence**
in the data. Its strength is flexibility: swap out the CI test and the same algorithm handles
Gaussian, discrete, or kernel-based settings. Its weakness is accumulation of CI testing errors —
the $\alpha$-level is not controlled globally, and errors in early steps (low $\ell$) propagate.

The output is the **CPDAG** — the correct answer under faithfulness. In finite samples, PC may
output an incorrect skeleton or incorrect orientations due to Type-I/II errors in the CI tests.

### Score-based: GES

GES ([[GES Algorithm]]) searches for the CPDAG that maximizes a **decomposable score**. Because
it searches the space of equivalence classes directly (not individual DAGs), it avoids the
combinatorial explosion of DAG enumeration. With BIC and Gaussian data, it is computationally
comparable to PC but often more accurate in finite samples because it uses the full likelihood
rather than sequential marginal tests.

The FES phase can overshoot in finite samples (add spurious edges), but BES corrects this. In
the NOTEARS paper's experiments, GES (implemented as FGS/FGES) is the strongest baseline on
sparse graphs.

### Continuous optimization: NOTEARS

NOTEARS ([[NOTEARS - Overview]]) rephrases structure learning as a continuous program using the
smooth acyclicity constraint $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$ ([[Smooth Characterization of Acyclicity]]).
The output is a **weighted DAG** (not a CPDAG), obtained by thresholding the solution matrix $\hat W$.

NOTEARS's global updates handle **high in-degree (hub) nodes** better than local edge-at-a-time
methods, making it the winner on dense/scale-free graphs in [[NOTEARS Experiments]]. The cost:
nonconvexity means only stationary points are guaranteed (not global optima), though empirically
NOTEARS lands near global optima ([[NOTEARS Experiments]], Table 1).

## When to use each

> [!example] Decision guide
>
> **Use PC when:**
> - Data is non-Gaussian or discrete (kernel CI tests, χ², or CMI are more natural)
> - You need explicit CI test p-values for edge confidence
> - Background knowledge (forbidden/required edges) is available — easy to incorporate
> - Graph is small and sparse ($d \lesssim 50$, max degree $\lesssim 5$)
>
> **Use GES when:**
> - Data is multivariate Gaussian (BIC is exact and efficient)
> - Graph is sparse to moderate ($d \lesssim 500$ with FGES)
> - Score-based model selection is preferred (penalized likelihood framing)
> - Software environment is R (`pcalg::ges`) or Python (`causal-learn`)
>
> **Use NOTEARS when:**
> - Graph is dense or scale-free (hub nodes with high in-degree)
> - $d$ is large ($d \gtrsim 100$) and gradient-based solvers are available
> - A continuous, differentiable formulation is needed (e.g. for downstream learning)
> - You want a weighted adjacency matrix $W$ (not just structure)
>
> **Use FCI / RFCI when:**
> - Hidden confounders are plausible (causal sufficiency violated)
> - Output is a PAG (partial ancestral graph), a richer representation than CPDAG

## Assumptions and failure modes

All three methods fail under the same core assumption violation:

| Violation | Effect on PC | Effect on GES | Effect on NOTEARS |
|-----------|-------------|--------------|-----------------|
| Faithfulness | Missing edges, wrong orientations | Incorrect CPDAG | Incorrect DAG |
| Hidden confounders | Spurious adjacencies | Spurious edges | Spurious edges |
| Non-Gaussianity | Minor if KCI used; major if Fisher's z | BIC misspecified | LS still ok (non-Gaussian consistent) |
| Cycles | Algorithm fails (assumes DAG) | Algorithm fails | $h(W)=0$ prevents cycles |
| Measurement error | Attenuated correlations → missed edges | Similar | Similar |

## Connections to other vault topics

- **ABM structural learning** ([[Approximate Bayesian Computation for ABMs]], [[Summary Causal DAGs]]):
  ABM simulation outputs can be treated as observational data for structure learning. PC/GES/NOTEARS
  could be applied to ABM output time series, though time-series extensions (PCMCI, DYNOTEARS)
  are more appropriate.
- **Bayesian structure learning**: a Bayesian approach places a prior over DAGs and computes the
  posterior with MCMC (DiBS, BCCD) — a distinct paradigm not covered by PC/GES/NOTEARS.
- **BN knowledge elicitation** ([[LLM Expert Elicitation for Bayesian Networks]]): structure
  learning is the *data-driven* complement to expert elicitation. The vault's BN work assumes the
  DAG is given; PC/GES/NOTEARS would precede that step if the DAG is unknown.
- **Causal DAG reasoning** ([[Directed Acyclic Graphs]]): the do-calculus and backdoor criterion
  operate on a given DAG; structure learning is what produces that DAG from observational data.

## See Also
- [[PC Algorithm]] — constraint-based detail
- [[GES Algorithm]] — score-based detail
- [[NOTEARS - Overview]] — continuous optimization
- [[NOTEARS Experiments]] — empirical comparison (PC, GES/FGS, NOTEARS, LiNGAM)
- [[Markov Equivalence and CPDAGs]] — the shared output target
- [[DAG Structure Learning Problem]] — the problem all three solve
- [[Causal Discovery/_Index|Causal Discovery Index]]
