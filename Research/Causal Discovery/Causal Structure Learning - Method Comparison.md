---
title: "Causal Structure Learning - Method Comparison"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "Chickering (2002); Spirtes, Glymour & Scheines (2000); Zheng et al. (2018)"
source_location: "Synthesis across NOTEARS §1, PC (CPS Ch. 5), GES (JMLR §6)"
date_ingested: 2026-09-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS - Overview]]"
used_by:
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "constraint-based vs score-based structure learning"
  - "PC GES NOTEARS comparison"
---

# Causal Structure Learning — Method Comparison

> [!summary]
> The three main paradigms for **learning a causal DAG from observational data** each make
> different computational and statistical tradeoffs. **Constraint-based methods** (PC) test
> conditional independencies and construct the CPDAG from separating sets. **Score-based
> methods** (GES) optimize a decomposable score over the space of CPDAGs. **Continuous
> optimization methods** (NOTEARS) relax the combinatorial constraint to a smooth equality
> and solve a numerical program over $\mathbb{R}^{d\times d}$. All three return some form of
> learned graph, but only PC and GES have proven asymptotic consistency guarantees for the
> Markov equivalence class; NOTEARS finds a single DAG with only stationarity guarantees.

## Overview

Structure learning reduces to three sub-problems: (1) identify the **skeleton** (which
pairs are adjacent?), (2) identify the **v-structures** (which colliders are present?), and
(3) identify the **orientable edges** (which non-collider edges can be directed from
observational data?). The three paradigms attack these differently, and their tradeoffs
become salient in different data regimes.

## Main Content

### Method Overview

| Feature | PC | GES | NOTEARS |
|---------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Input** | Data + CI test | Data + score function | Data |
| **Output** | CPDAG | CPDAG | Single DAG (weighted adjacency matrix $W$) |
| **Search space** | CPDAGs via CI testing | CPDAGs via Insert/Delete | $\mathbb{R}^{d\times d}$ |
| **Core criterion** | Conditional independence | BIC or BGe score | LS + $\ell_1$ + $h(W)=0$ |
| **Consistency** | Yes (oracle CI, faithfulness, sufficiency) | Yes (faithful, Gaussian, sufficiency) | No (only stationarity) |
| **Identifies MEC?** | Yes | Yes | No |
| **Handles hidden confounders** | No (use FCI extension) | No | No |
| **Computational complexity** | $O(d^2 \cdot \binom{q}{\ell})$ per CI test batch | $O(d^2 \cdot n)$ per BIC update | $O(d^3)$ per outer iteration |
| **Key assumption** | Faithfulness + causal sufficiency | Faithfulness + Gaussianity | Linear SEM, Gaussian noise |
| **Main software** | `pcalg` (R), `causal-learn` (Python) | `pcalg::ges` (R), `causal-learn` (Python) | `notears` (Python) |

### Constraint-Based Methods (PC and extensions)

PC is **model-agnostic** in a key sense: the CI test can be swapped for any distribution.
Fisher Z covers Gaussian data; $G^2$ covers discrete; KCI covers nonlinear. This
flexibility comes at a cost: the number of CI tests grows exponentially with conditioning
set size, and each test is a statistical decision that can err.

> [!note] PC's Core Tradeoff
> **Advantage:** Naturally outputs a CPDAG (MEC). Scales well with $d$ when the graph is
> sparse (bounded degree $q$): total tests $\approx O(d^2 q^{\ell_{\max}})$.
>
> **Disadvantage:** Accumulates Type I/II errors across many tests. Error propagates: a
> wrongly removed edge in the skeleton causes downstream orientation errors. PC-stable
> (Colombo & Maathuis 2014) reduces order-dependence; significance level calibration for
> high-$d$ settings (Kalisch & Bühlmann 2007) is necessary.

### Score-Based Methods (GES)

GES is **model-specific**: the score function encodes distributional assumptions (Gaussian
for BIC/BGe). But within those assumptions, GES searches more globally than PC.

> [!note] GES's Core Tradeoff
> **Advantage:** Score improvement at each step is verified globally across all possible
> Insert/Delete operators, making GES less prone to error propagation than PC. Proven
> consistent by Chickering (2002) via the Meek Conjecture proof. Better finite-sample
> accuracy than PC in many benchmarks under Gaussian data.
>
> **Disadvantage:** Requires a consistent score — BIC for Gaussian, BGe for Bayesian
> Gaussian, but harder to extend to non-Gaussian/non-parametric settings. Adding the
> Turning phase (Hauser & Bühlmann 2012) further improves finite-sample performance.

### Continuous Optimization Methods (NOTEARS)

NOTEARS represents a fundamentally different approach: it never explicitly reasons about
MECs, v-structures, or CPDAGs. Instead, it estimates $W$ by minimizing a penalized
least-squares objective subject to $h(W) = 0$.

> [!note] NOTEARS's Core Tradeoff
> **Advantage:** Simple, scalable, and easy to implement (~50 lines of Python). No
> graphical-model machinery needed. Scales to $d \sim 100$+ nodes where PC and GES are slow.
> Easily extended: nonlinear SEM (DAG-GNN), interventional data (DCDI), Bayesian posterior
> (NOTEARS-MLP).
>
> **Disadvantage:** Only guaranteed to find a stationary point (not the global optimum of
> the LS score). Does not output a CPDAG — returns a single DAG, which may not be the true
> DAG or even a member of the true MEC. No proven consistency. Works best for linear Gaussian
> SEM; extensions to nonlinear settings require careful regularization.

### Empirical Benchmarks

Benchmarks on Erdős-Rényi and scale-free random graphs (Zheng et al. 2018, NOTEARS experiments;
Chickering 2002, GES experiments; Heinze-Deml et al. 2018, comparative study):

| Setting | Typically Best |
|---------|---------------|
| Small $n$, Gaussian | GES > PC |
| Large $n$, Gaussian | PC ≈ GES |
| Large $d$ (100+), Gaussian | NOTEARS > PC, GES |
| Non-Gaussian / nonlinear | PC (KCI) > GES, NOTEARS |
| Hidden confounders | FCI (extension of PC) |
| Interventional data | GIES (extension of GES) |

> [!warning] Benchmark Sensitivity
> These rankings are distribution-specific and sample-size-specific. No single method
> dominates across all settings. The faithfulness assumption can be violated in practice
> (e.g., linear feedback cancellation), in which case all three methods can fail.

### When to Use Each

> [!definition] Method Selection Guide
> **Use PC when:**
> - Data is non-Gaussian or nonlinear (with KCI test).
> - $d$ is moderate (10–50), graph is sparse.
> - An MEC (CPDAG) output is needed.
> - Distribution-agnostic guarantees matter.
>
> **Use GES when:**
> - Data is Gaussian (BIC score is appropriate).
> - Higher accuracy than PC is needed in finite samples.
> - $d$ is moderate (10–100), graph is not too dense.
> - An MEC (CPDAG) output is needed.
>
> **Use NOTEARS when:**
> - $d$ is large (50–500+) and the graph is expected to be sparse.
> - A single DAG (not MEC) is acceptable.
> - Speed and simplicity are priorities.
> - Extensions to nonlinear SEM, multi-domain, or Bayesian settings are desired.

## Connections

- **ABM causal structure**: ABM outputs can be used as observational data for structure
  learning; all three methods apply, but the non-Gaussian nature of ABM outputs may favor
  PC (KCI) — see [[Summary Causal DAGs]] and [[Approximate Bayesian Computation for ABMs]].
- **DAG reasoning**: once a CPDAG is estimated, causal reasoning (do-calculus, backdoor
  criterion) proceeds using the DAG members of the MEC — see [[Directed Acyclic Graphs]].
- **Bayesian networks**: the estimated CPDAG defines the structure for BN inference —
  see [[LLM Expert Elicitation for Bayesian Networks]].

## See Also
- [[PC Algorithm]] — constraint-based structure learning
- [[GES - Greedy Equivalence Search]] — score-based structure learning
- [[NOTEARS - Overview]] — continuous optimization structure learning
- [[Markov Equivalence Classes and CPDAGs]] — the shared output concept
- [[DAG Structure Learning Problem]] — the shared problem formulation
- [[Conditional Independence Testing]] — the subroutine PC relies on
