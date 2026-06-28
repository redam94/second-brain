---
title: Local vs Global Sensitivity Analysis
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[raw/Review of Global Sensitivity Analysis Methods 2024.pdf]]"
source_location: "Introduction (global vs local processing approach), pp. 1-2"
date_ingested: 2026-06-28
folder: "Agent-Based Modeling/Calibration and Validation/Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Global Sensitivity Analysis - Overview]]"
used_by:
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
  - "[[Morris Elementary Effects Screening]]"
aliases:
  - OAT
  - One-at-a-time Sensitivity
  - Local vs Global SA
  - Local Sensitivity Analysis
---

# Local vs Global Sensitivity Analysis

> [!summary]
> **Local sensitivity analysis (LSA / OAT)** perturbs one parameter at a time around a fixed baseline, measuring the local derivative $\partial f/\partial x_i$. It is cheap but assumes **linearity and input independence**, so it misses interactions and explores only a thin sliver of the parameter space. **Global SA** varies all inputs simultaneously across their full ranges, capturing main effects *and* interactions. For high-dimensional, nonlinear, interaction-heavy ABM parameter spaces, OAT can rank factors incorrectly and underestimate influential ones — which is why variance-based global methods are needed.

## Overview

The paper draws the distinction sharply: **global** methods "explain the overall behavior of a model by varying the entire range of input factors and examining the joint effect and interaction between them. In this approach, all input parameters are allowed to change simultaneously across all the possible range of values." **Local** methods "study the effect of a parameter by exploring its local vicinity while holding all other parameters fixed at their baseline values." This note motivates the rest of the folder; see [[Global Sensitivity Analysis - Overview]].

## Main Content

> [!definition] Local (one-at-a-time, OAT) sensitivity ^oat-definition
> Fix all factors at a baseline $x^0$; perturb a single $x_i$ and measure the local response, e.g. the partial derivative
> $$ S_i^{\text{local}} = \left.\frac{\partial f}{\partial x_i}\right|_{x = x^{0}} \approx \frac{f(x^0 + e_i\,\delta) - f(x^0)}{\delta}. $$
> Cost is just $O(p)$ runs, but the estimate is valid **only in the neighborhood of $x^0$** and **only one direction at a time**.

> [!theorem] Why OAT fails for ABMs ^oat-pitfalls
> Local interpretability methods "typically make the underlying assumption that the machine learning model exhibits nonlinear relationships and independence between the input parameters. Consequently, if the input factors exhibit significant interactions, local interpretability methods may produce misleading or inaccurate results, as they rely on the assumption of parameter independence." Concretely:
> - **No interactions captured** — holding others fixed hides any effect that only appears when factors co-vary (exactly the $S_{Ti}-S_i$ gap of [[Variance-Based Sensitivity and Sobol Indices]]).
> - **Baseline-dependent** — conclusions change with the chosen $x^0$; a factor flat at baseline may be steep elsewhere.
> - **Vanishing coverage in high dimensions** — an OAT design touches a measure-zero cross of the hypercube; the explored volume shrinks rapidly as $p$ grows, so most of an ABM's parameter space is never visited.
> - **Misses non-monotonicity** — local slope says nothing about behavior across the full range.

> [!definition] Global SA — the remedy ^global-remedy
> Global methods require **no assumptions** about input relationships, can treat the ABM as a black box, and apportion output variability across factors over their **entire joint range**. The cost is more model evaluations (see [[Sampling and Estimation for Sobol Indices]]), traded for correct rankings, interaction detection, and factor-fixing decisions. Morris (see [[Morris Elementary Effects Screening]]) is a global method built from *many* OAT-style steps at *random* base points — a conceptual bridge from local to global.

## Examples

ABM output $Y = a\,b$ (pure interaction, no main effects) with $a,b \in [-1,1]$, baseline $(a_0,b_0)=(0,0)$:

- **OAT**: perturbing $a$ at $b_0=0$ gives $Y = a\cdot 0 = 0$ → slope 0. Same for $b$. Local SA concludes **both parameters are irrelevant** — wrong.
- **Global (Sobol)**: $S_a = S_b = 0$ (no main effects) but $S_{Ta}=S_{Tb}=1$ — the entire output variance is the $a$–$b$ **interaction**, which OAT cannot see. This is the canonical failure case motivating the whole folder.

## Connections

- [[Global Sensitivity Analysis - Overview]] — the four global method families that replace OAT.
- [[Variance-Based Sensitivity and Sobol Indices]] — total-effect $S_{Ti}$ is precisely the interaction information OAT loses.
- [[Morris Elementary Effects Screening]] — global screening assembled from randomized OAT steps.
- [[Population Initialization and Parameter Sensitivity]] — the vault's existing **local OAT** sensitivity note that this generalizes.
- [[ABM Validation Challenges]] — interaction-rich ABMs make global SA part of credible validation.

## See Also

- [[Uncertainty Quantification for ABM Calibration]]; [[History Matching for ABMs]]; [[Approximate Bayesian Computation for ABMs]].
- Saltelli et al., *Sensitivity Analysis in Practice* (2004).
- Li et al. (2023), "Comparison of local and global sensitivity analysis methods."
