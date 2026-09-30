---
title: "Causal Structure Learning - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000); Chickering (2002); Zheng et al. (2018) — PDFs not cached (proxy restriction; freely available at MIT Press / jmlr.org / arXiv:1803.01422)"
source_location: "Synthesis across three paradigms"
date_ingested: 2026-09-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[NOTEARS - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
aliases:
  - "Structure learning overview"
  - "Causal discovery paradigms"
  - "DAG learning methods"
---

# Causal Structure Learning - Overview

> [!summary]
> Learning a DAG from observational data is the core problem of **causal structure
> learning** (also called causal discovery). Three algorithmic paradigms have emerged:
> **constraint-based** (PC algorithm — uses conditional independence tests),
> **score-based** (GES — searches equivalence classes by BIC score), and
> **continuous-optimization** (NOTEARS — converts the combinatorial DAG constraint
> into a smooth equality). All three assume the same identifiability ceiling: under
> faithfulness and causal sufficiency, observational data can recover at most the
> **Markov equivalence class** (MEC) of the true DAG, represented as a CPDAG.

## Overview

The goal of causal structure learning is to infer a DAG $\mathsf{G} = (\mathsf{V}, \mathsf{E})$
from $n$ i.i.d. observations of $d$ variables $X = (X_1, \ldots, X_d)$. The
vault's coverage of **DAG reasoning** (d-separation, do-calculus — [[Directed Acyclic Graphs]],
[[Canonical Causal DAGs]], [[Summary Causal DAGs]]) and **DAG construction from expert
knowledge** ([[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]])
is extensive. Structure learning — inferring the DAG *from data*, without prior expert specification
of the graph — was the missing piece (Dream index gap #9).

This note is the bridge. It maps the three algorithmic paradigms to one another and to the
identifiability theory that governs all of them.

## Main Content

### The identifiability ceiling: Markov equivalence

Before choosing an algorithm, it is essential to understand what is and is not identifiable from
observational data alone.

> [!theorem] Theorem: Observational Identifiability Ceiling
> Under the **Causal Markov Condition** and **Faithfulness**, observational data from a
> distribution faithful to a DAG $\mathsf{G}$ can identify **at most** the **Markov equivalence
> class** (MEC) of $\mathsf{G}$ — not the DAG itself.
> The MEC is uniquely represented by the **CPDAG** (Completed Partially Directed Acyclic Graph).
> See [[Markov Equivalence Classes and CPDAGs]] for the formal statement and the Verma-Pearl theorem.
^thm-identifiability-ceiling

This means that any consistent algorithm returns a CPDAG, not a unique DAG.
Algorithms that claim to return a DAG are either leveraging additional assumptions
(non-Gaussian noise: LiNGAM; equal error variances; interventional data) or making arbitrary
choices among the Markov-equivalent DAGs.

### Core assumptions

All three paradigms rely on the same three assumptions:

> [!definition] Assumption: Causal Markov Condition
> Each variable $X_i$ is independent of its non-descendants in $\mathsf{G}$
> conditional on its parents: $X_i \perp\!\!\!\perp \mathrm{NonDesc}_i \mid \mathrm{Pa}_i$.
> Equivalently, the joint distribution factorizes as
> $p(x_1, \ldots, x_d) = \prod_{i=1}^{d} p(x_i \mid x_{\mathrm{Pa}_i})$.
^def-markov-condition

> [!definition] Assumption: Faithfulness (Stability)
> Every conditional independence present in the distribution $\mathbb{P}$ arises from
> d-separation in $\mathsf{G}$ — there are no "accidental" cancellations. Formally,
> $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ in $\mathbb{P}$ $\Rightarrow$ $X_i$ and $X_j$
> are d-separated by $\mathbf{S}$ in $\mathsf{G}$.
^def-faithfulness

> [!definition] Assumption: Causal Sufficiency
> There are no unmeasured common causes (hidden confounders) of the observed
> variables. Every common cause of two measured variables is itself measured.
> Algorithms that relax this assumption (FCI, RFCI) output PAGs (Partial Ancestral Graphs)
> rather than CPDAGs.
^def-causal-sufficiency

### The three algorithmic paradigms

| Paradigm | Algorithm | Key idea | Output | Complexity |
|----------|-----------|----------|--------|-----------|
| Constraint-based | [[PC Algorithm]] | CI tests → skeleton → orient | CPDAG | $O(p^{k_{\max}+2})$ |
| Score-based | [[GES Algorithm]] | BIC search in MEC space | CPDAG | $O(p^k n)$ per step |
| Continuous optimization | [[NOTEARS - Overview]] | $h(W)=0$ replaces discrete constraint | Weighted DAG | $O(d^3)$ per gradient |

**Constraint-based methods** (PC, FCI, RFCI):
- Separate the skeleton and orientation steps.
- Skeleton recovery uses statistical tests for conditional independence (Fisher's Z, $\chi^2$, KCI).
- Sensitive to individual CI test errors, especially for small $n$.
- Theoretically transparent: identifiability follows directly from d-separation.

**Score-based methods** (GES, hill-climbing, GOBNILP):
- Evaluate graph quality via a decomposable score (BIC, BDe, BGe).
- GES provably finds the correct MEC under faithfulness (Chickering 2002).
- More robust to individual CI test failures (scores are aggregated over all edges).
- Computationally heavier than PC for large sparse graphs but theoretically stronger.

**Continuous-optimization methods** (NOTEARS, DAGMA, NoCurl):
- Convert the discrete acyclicity constraint $\mathsf{G}(W) \in \mathbb{D}$ into a smooth
  equality $h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$ ([[Smooth Characterization of Acyclicity]]).
- Scalable to high dimensions ($d \gg 100$); differentiable and GPU-compatible.
- Return a weighted adjacency matrix $W$ rather than a CPDAG — orientation is implicit in the
  magnitudes of $W$.
- Less principled identifiability theory but strong empirical performance.

### When to use which method

| Scenario | Recommended method | Why |
|----------|--------------------|-----|
| $d \leq 20$, want principled CPDAG | **GES** | Provably consistent under faithfulness; score-based aggregation is robust |
| $d \leq 50$, sparse, $n \geq 500$ | **PC** (PC-stable) | Fast for sparse graphs; well-calibrated CI tests at moderate $n$ |
| $d \gg 50$, continuous data | **NOTEARS** or DAGMA | Scalable continuous optimization |
| Hidden confounders suspected | **FCI** (Fast Causal Inference) | Outputs PAG, relaxes causal sufficiency |
| Non-Gaussian noise | **LiNGAM** | Full DAG identification, not just MEC |
| Interventional data available | **UT-IGSP**, **DCDI** | Use intervention targets to break MEC indeterminacy |

### Relationship to the rest of the vault

- **[[DAG Structure Learning Problem]]** sets up the score-based formulation (linear SEM, LS score)
  that NOTEARS and GES both use — read it first.
- **[[Directed Acyclic Graphs]]** covers d-separation, back-door criterion, do-calculus —
  the DAG reasoning that structure learning tries to recover.
- **[[Summary Causal DAGs]]** (Zeng 2025) uses a learned DAG as input; structure learning
  is the step that precedes DAG summarization.
- **[[BN Construction Methods Comparison]]** and **[[LLM Expert Elicitation for Bayesian Networks]]**
  cover expert-knowledge-driven DAG specification — the alternative to data-driven learning.
- **[[Approximate Bayesian Computation for ABMs]]**: ABM simulation outputs can feed structure
  learning algorithms as observational data to reverse-engineer the agent interaction graph.

## See Also
- [[PC Algorithm]] — constraint-based causal discovery
- [[GES Algorithm]] — score-based causal discovery (Chickering 2002)
- [[Markov Equivalence Classes and CPDAGs]] — the object all consistent algorithms return
- [[NOTEARS - Overview]] — continuous-optimization causal discovery
- [[DAG Structure Learning Problem]] — score and SEM setup
- [[Directed Acyclic Graphs]] — d-separation and causal reasoning
