---
title: "Causal Structure Learning - Methods Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/chickering02b-GES-citation.md]]"
source_location: "Chickering 2002; Kalisch & Bühlmann 2007; Zheng et al. 2018 (NOTEARS)"
date_ingested: 2026-09-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "structure learning survey"
  - "causal discovery methods"
  - "DAG learning algorithms"
---

# Causal Structure Learning — Methods Overview

> [!summary]
> **Causal structure learning** (or causal discovery) infers the structure of the underlying
> DAG (Bayesian network) from observational data. Three major algorithm families cover the
> landscape: **constraint-based** (PC, FCI — test conditional independences), **score-based**
> (GES — optimize a scoring criterion over equivalence classes), and **continuous-optimization**
> (NOTEARS — reformulate as a smooth equality-constrained program). All three assume the
> Causal Markov Condition and Faithfulness; all output a CPDAG (or DAG in NOTEARS's case)
> that identifies only those causal directions distinguishable from observational data.

## Overview

Across the vault's DAG-related notes, a common assumption is that the DAG is either *given* or
*elicited from experts* (see [[LLM Expert Elicitation for Bayesian Networks]],
[[BN Construction Methods Comparison]]). Structure learning is the complementary scenario: learn
the DAG *from data*. The three families now documented in this vault cover the major approaches:

| Family | Algorithm(s) | Input | Core idea |
|--------|-------------|-------|-----------|
| **Constraint-based** | [[PC Algorithm]], FCI | Any data + CI test | Remove edges where CI holds |
| **Score-based** | [[GES Algorithm]], FGES | Parametric data | Greedy search over CPDAG space |
| **Continuous-optimization** | [[NOTEARS - Overview\|NOTEARS]] | Linear SEM data | Smooth acyclicity constraint |

## Common framework and assumptions

All three families share the same statistical foundations:

> [!definition] Definition: Shared assumptions for observational causal discovery
>
> 1. **Causal Markov Condition (CMC):** $\mathbb{P}(X)$ is Markov with respect to the true DAG
>    $\mathcal{G}^*$ — each variable is independent of its non-descendants given its parents.
>
> 2. **Causal Faithfulness:** All conditional independences in $\mathbb{P}(X)$ are entailed by
>    $\mathcal{G}^*$; no "accidental" cancellations.
>
> 3. **Causal Sufficiency (for PC and GES):** No unmeasured common causes (no latent confounders).
>    NOTEARS and FCI relax or sidestep this differently.
>
> 4. **I.I.D. data:** $n$ i.i.d. draws from the structural distribution $\mathbb{P}(X)$.
^def-shared-assumptions

Under CMC + Faithfulness, the identifiability limit is the **Markov Equivalence Class (MEC)**
— a set of DAGs all encoding the same conditional independences. All three algorithms ultimately
target the CPDAG of this class. See [[Markov Equivalence Classes and CPDAGs]].

## Constraint-based methods: PC and FCI

**Central idea:** the conditional independence (CI) structure of the distribution is a direct
fingerprint of the DAG's d-separation structure. Testing which CI statements hold in the data
reveals which edges are absent.

- [[PC Algorithm]]: the canonical method. Three phases — skeleton (CI tests at increasing
  conditioning-set sizes), v-structure orientation (collider detection), Meek propagation.
  Assumes causal sufficiency; outputs CPDAG. Complexity polynomial in $p$ for sparse graphs.

- **FCI** (Fast Causal Inference, Spirtes et al. 2000): relaxes causal sufficiency, producing
  a **Partial Ancestral Graph (PAG)** that distinguishes genuine causes from spurious associations
  due to latent confounders. Adds a "possible ancestors" phase after the PC skeleton.

> [!note] When to use constraint-based
> - Distribution is non-Gaussian or unspecified, and a suitable CI test exists.
> - Latent confounders are suspected (use FCI).
> - Qualitative independence structure is of interest independently of edge weights.

## Score-based methods: GES

**Central idea:** assign a statistical score to each equivalence class and search greedily.
Score-equivalence ensures all DAGs in the same MEC receive the same score, so search over
CPDAGs is equivalent to search over DAGs.

- [[GES Algorithm]]: two-phase greedy search (FES: add edges; BES: remove edges). Core
  result is the proof of the **Meek conjecture**, which guarantees the CPDAG space is connected
  under the Insert/Delete operators. Uses BIC (Gaussian) or BDeu (discrete) scores.
  Outputs CPDAG. Consistent under faithfulness as $n \to \infty$.

> [!note] When to use score-based
> - Distribution is well-specified (Gaussian with BIC, or discrete with BDeu).
> - CI tests are computationally expensive or unreliable.
> - Finite-sample: score-based methods tend to outperform PC when the distributional assumption
>   is correct.

## Continuous-optimization: NOTEARS

**Central idea:** instead of searching over the discrete space of DAGs, optimize a smooth score
over real matrices $W \in \mathbb{R}^{p \times p}$, enforcing acyclicity via the smooth
constraint $h(W) = \mathrm{tr}(e^{W \circ W}) - p = 0$.

- [[NOTEARS - Overview]]: linear SEM with LS score + augmented Lagrangian solver. Does not
  require faithfulness for its statistical guarantees (van de Geer & Bühlmann 2013).
  Computationally efficient; implementable in ~50 lines. Returns a single DAG (not a CPDAG).
  Extensions: NOTEARS-MLP (nonlinear SEM), GOLEM, DAGMA.

> [!note] When to use continuous-optimization
> - Linear SEM is plausible; point estimate of $W$ is needed.
> - High dimensions with dense structure.
> - Embedded in a differentiable pipeline (can backpropagate through $h$).

## Comparison table

| Property | [[PC Algorithm]] | [[GES Algorithm]] | [[NOTEARS - Overview\|NOTEARS]] |
|----------|-----------------|------------------|------|
| Core mechanism | CI tests | Score optimization | Continuous optimization |
| Output | CPDAG | CPDAG | DAG (possibly CPDAG with post-processing) |
| Faithfulness needed | Yes | Yes | No (for LS statistical guarantees) |
| Distribution assumption | Flexible | BIC/BDeu | Linear SEM + LS |
| Latent confounders | No (FCI does) | No | No |
| High-dimensional ($p \gg n$) | Yes (Kalisch 2007, sparse) | FGES variant | Yes (regularized $\ell_1$) |
| R implementation | `pcalg::pc()` | `pcalg::ges()` | `notears` (Python) |
| Python implementation | `causal-learn` | `ges`, `py-causal` | `notears`, `causaldag` |
| Key reference | SG 2000; Kalisch 2007 | Chickering 2002 | Zheng et al. 2018 |

## Connecting structure learning to the rest of the vault

The three algorithms above are the *input side* of several other vault topics:

- **[[Summary Causal DAGs]]**: assumes the DAG is given; structure learning is what precedes
  summarization in the Zeng 2025 workflow (§4 of that note explicitly notes this).
- **[[LLM Expert Elicitation for Bayesian Networks]]** and **[[BN Construction Methods Comparison]]**:
  cover expert-knowledge DAG construction — the alternative to data-driven structure learning.
- **[[Approximate Bayesian Computation for ABMs]]**: ABM outputs can serve as observational data
  for structure learning; connecting these sections to produce causal graphs from ABM simulations
  is an open research direction.
- **[[Directed Acyclic Graphs]]**: covers the *use* of DAGs (d-separation, back-door criterion,
  do-calculus) — the output of structure learning feeds directly into those methods.

## See Also
- [[PC Algorithm]] — constraint-based method (full treatment)
- [[GES Algorithm]] — score-based method (full treatment)
- [[NOTEARS - Overview]] — continuous-optimization method
- [[DAG Structure Learning Problem]] — the shared formal setup
- [[Markov Equivalence Classes and CPDAGs]] — the shared identifiability target
- [[Conditional Independence Testing for Causal Discovery]] — the CI tests PC uses
- [[Directed Acyclic Graphs]] — downstream use of learned DAGs
