---
title: "Causal Discovery Methods - Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes00-CPS-source.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 6; Chickering (2002), §1; Zheng et al. (2018), §1"
date_ingested: 2026-09-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "structure learning comparison"
  - "causal discovery taxonomy"
---

# Causal Discovery Methods - Comparison

> [!summary]
> Causal structure learning algorithms fall into three families: **constraint-based**
> (PC, FCI), **score-based** (GES, FGES), and **continuous-optimization** (NOTEARS,
> DAG-GNN). Each makes different assumptions, targets different outputs, and has different
> practical failure modes. This note synthesizes the trade-offs for practitioners choosing
> among them, and connects to the vault's existing ABM and Bayesian inference context.

## Overview

The vault's Causal Discovery folder now covers all three main families of structure
learning algorithms. This synthesis note maps out the methodological landscape, clarifies
when each approach is appropriate, and identifies how these methods connect to the broader
vault (ABM calibration, Bayesian networks, observational causal inference).

## Main Content

### Three Families

| Family | Prototype | Input | Output | Core assumption |
|--------|-----------|-------|--------|-----------------|
| Constraint-based | [[PC Algorithm - Overview\|PC]] | Data + CI test | CPDAG | Faithfulness + Markov |
| Score-based | [[GES - Greedy Equivalence Search\|GES]] | Data + score function | CPDAG | Faithfulness + consistent score |
| Continuous optimization | [[NOTEARS - Overview\|NOTEARS]] | Data (linear Gaussian) | Single DAG | Linear SEM, i.i.d. Gaussian |
| Exact / ILP | GOBNILP | Data + score | CPDAG | Decomposable score; exponential cost |
| Functional model | LiNGAM | Data (non-Gaussian) | Single DAG | Non-Gaussian noise |

### Constraint-based vs. Score-based

> [!note] Key trade-off
> **Constraint-based** (PC) avoids specifying a parametric likelihood — any CI test
> works (Gaussian, discrete, kernel-based). The trade-off: performance depends on the
> calibration of the CI test ($\alpha$), and errors compound across phases.
>
> **Score-based** (GES) avoids a significance threshold — instead it needs a consistent
> decomposable score, most naturally BIC under a parametric model. The trade-off:
> model misspecification in the score propagates silently.

From a Bayesian perspective, GES with a BDe/BDeu score is the closest to a fully Bayesian
structure-learning approach (Heckerman, Geiger & Chickering 1995). The BDe score is the
marginal likelihood $P(\mathcal{D} \mid G)$ under a Dirichlet parameter prior, which is
exactly what [[Choosing and Building Models|Bayesian model comparison]] maximizes.

### Identifiability Limits

All three methods in the vault are subject to the fundamental **Markov equivalence limit**:

> [!warning] Observational identifiability limit
> Under the Markov and faithfulness assumptions alone, no algorithm can identify more
> than the CPDAG from i.i.d. observational data (Verma & Pearl, 1990 — see
> [[Markov Equivalence Classes and CPDAGs#^thm-markov-equiv|Theorem: Markov Equivalence]]).
>
> Going beyond the CPDAG requires:
> - **Interventional data** (do-calculus, GIES)
> - **Non-Gaussianity** (LiNGAM, ParceLiNGAM)
> - **Non-linearity + additivity** (ANM, post-nonlinear causal models)
> - **Time series structure** (Granger causality, PCMCI)
> - **Background knowledge** (e.g., known temporal order)

NOTEARS outputs a *single* DAG rather than a CPDAG — but this is partly because it uses
a continuous score that can *accidentally* distinguish equivalent DAGs due to finite-sample
noise, not because it has true identifiability beyond the equivalence class.

### Assumptions Comparison

| Assumption | PC | GES | NOTEARS |
|------------|-----|-----|---------|
| Markov condition | ✓ required | ✓ required | ✓ required |
| Faithfulness | ✓ required | ✓ required | ✓ implicitly |
| Linear SEM | — | — | ✓ required |
| Gaussian noise | Optional (for Fisher $z$) | Optional (for BIC) | ✓ required |
| Acyclicity | ✓ required | ✓ required | ✓ via $h(W)=0$ |
| No latent confounders | ✓ required | ✓ required | ✓ required |

**Latent confounders**: when unmeasured common causes exist, PC and GES output incorrectly
oriented edges. The **FCI** (Fast Causal Inference) algorithm extends PC to handle latent
confounders, outputting a **PAG** (partial ancestral graph) instead of a CPDAG.

### Practical Guidance

> [!tip] When to use each method
>
> **Use PC when**:
> - You want a non-parametric approach (non-Gaussian, mixed types).
> - You have a domain-specific CI test (e.g., kernel-based for functional data).
> - The graph is sparse and $d$ is moderate to large.
>
> **Use GES / FGES when**:
> - You have a well-specified parametric model (e.g., linear Gaussian, discrete).
> - You want asymptotic guarantees without tuning an $\alpha$.
> - You have access to a fast score function (BIC for Gaussian).
>
> **Use NOTEARS when**:
> - The linear Gaussian SEM assumption is reasonable.
> - You want a simple implementation that runs in under a minute.
> - You need a starting point for a non-parametric extension (NOTEARS-MLP, etc.).
>
> **Use none of these when**:
> - You have interventional data → use GIES or do-calculus-based methods.
> - You suspect latent confounders → use FCI or RFCI.
> - You have time-series data → use PCMCI or structural VAR.

### Connection to the Vault's ABM Work

The vault's ABM calibration notes ([[Approximate Bayesian Computation for ABMs]],
[[HM-ABC Calibration Framework]]) assume the causal structure of the ABM is known
(specified by the modeler). Structure learning becomes relevant in two scenarios:

1. **ABM output as observational data**: run the ABM, treat the output trajectories as
   observational data, apply PC/GES to infer the *emergent* causal graph. This connects
   to [[Summary Causal DAGs]] (§4, Zeng 2025), which takes an estimated or known DAG
   and summarizes it.
2. **Real-world data calibration target**: if the calibration target is real panel data,
   structure learning on the real data can provide a prior over the causal structure
   before fitting the ABM parameters.

### Connection to Bayesian Networks

The vault's [[LLM Expert Elicitation for Bayesian Networks]] and [[BN Construction Methods Comparison]]
cover expert-knowledge-driven DAG construction. Structure learning is the *data-driven*
complement. In practice:
- **Expert knowledge** constrains the search (forbidden/required edges, ordering constraints).
- **Data-driven learning** (PC, GES) fills in the remaining structure.
- Hybrid approaches (MMHC — Max-Min Hill Climbing) combine both.

## See Also
- [[PC Algorithm - Overview]] — constraint-based approach
- [[GES - Greedy Equivalence Search]] — score-based approach
- [[NOTEARS - Overview]] — continuous-optimization approach
- [[Markov Equivalence Classes and CPDAGs]] — the theoretical identifiability limit
- [[DAG Structure Learning Problem]] — the NP-hard combinatorial problem all three solve approximately
- [[Summary Causal DAGs]] — downstream use of learned DAGs
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven alternative
- [[Directed Acyclic Graphs]] — DAG semantics in the vault's causal inference section
