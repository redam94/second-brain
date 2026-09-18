---
title: Global Sensitivity Analysis - Overview
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/overview
  - doc/paper
source: "[[raw/Review of Global Sensitivity Analysis Methods 2024.pdf]]"
source_location: "Sec. 1 (Global Sensitivity Analysis methods), pp. 2-6"
date_ingested: 2026-06-28
folder: "Agent-Based Modeling/Calibration and Validation/Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Local vs Global Sensitivity Analysis]]"
used_by:
  - "[[Variance-Based Sensitivity and Sobol Indices]]"
  - "[[Morris Elementary Effects Screening]]"
  - "[[Sampling and Estimation for Sobol Indices]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - GSA
  - Global Sensitivity Analysis
  - Variance-Based Sensitivity Analysis Overview
---

# Global Sensitivity Analysis - Overview

> [!summary]
> **Global sensitivity analysis (GSA)** apportions the uncertainty in a model's output across its uncertain inputs, with all inputs varied **simultaneously across their full ranges**. Sadeghi & Matwin (2024) organize GSA into four families: **variance-based** (Sobol, FAST/RBD), **derivative-based** (Morris elementary effects, DGSM), **distribution/moment-independent** (Delta), and feature-additive methods. The general workflow is two phases — **sample** the input space, then **analyze** how output variance/behavior attributes back to each factor. For ABMs this answers "which parameters actually drive the behavior, and which can be fixed?" while accounting for **interactions** that local one-at-a-time methods miss.

## Overview

For a model $Y = f(X_1, \dots, X_p)$ with $p$ uncertain inputs, GSA quantifies the contribution of each $X_i$ (and combinations of inputs) to the variability of $Y$. The paper frames GSA as the *global* counterpart to *local* explainability: global methods "explain the overall behavior of a model by varying the entire range of input factors and examining the joint effect and interaction between them," whereas local methods "study the effect of a parameter by exploring its local vicinity while holding all other parameters fixed at their baseline values." Local methods implicitly assume linearity and input independence; when factors interact, they "may produce misleading or inaccurate results." See [[Local vs Global Sensitivity Analysis]].

The general GSA paradigm has **two phases**:

1. **Sampling** — generate samples of the inputs $X_i$ over their distributions/ranges.
2. **Analysis** — run the model to produce $Y$, then assess each factor's impact.

> [!definition] The four families of GSA methods ^gsa-families
> The review (Sec. 1) groups GSA methods into four categories:
> - **Variance-based** — assume output variance fully characterizes output uncertainty (Saltelli et al.); decompose $V(Y)$ across factors. Includes **Sobol**, **FAST**, **RBD/FAST_RBD**. See [[Variance-Based Sensitivity and Sobol Indices]].
> - **Derivative-based** — sensitivity from (averaged) partial derivatives $\left|\frac{\partial f}{\partial x_i}\right|$. Includes **Morris** elementary effects and **DGSM**. See [[Morris Elementary Effects Screening]].
> - **Distribution / moment-independent** — examine the whole output PDF, not just its moments. Includes the **Delta** ($\delta_i$) index.
> - **Feature-additive** methods.

> [!definition] Screening vs. quantification ^screen-vs-quantify
> Two distinct goals drive method choice:
> - **Screening** (factor fixing): cheaply rank factors and identify the non-influential ones that can be frozen. Best served by **Morris** ($\mu^*$, $\sigma$) at $O(r(p+1))$ runs.
> - **Quantification**: produce accurate, decomposed importance shares (first-order $S_i$, total-effect $S_{Ti}$, interactions). Served by **Sobol/FAST**, which cost more model evaluations.
> Typical practice: screen first with Morris, then quantify the survivors with Sobol. See [[Sampling and Estimation for Sobol Indices]].

## Main Content

> [!definition] What a GSA answers ^gsa-questions
> - **Factor prioritization**: which inputs, if better determined, would most reduce output variance? → first-order $S_i$.
> - **Factor fixing**: which inputs can be fixed anywhere in their range without affecting $Y$? → total-effect $S_{Ti} \approx 0$.
> - **Interaction detection**: do factors act jointly rather than additively? → $S_{Ti} > S_i$, or Morris $\sigma$ large.

The paper's empirical takeaway (MNIST case study, Sec. Results): the **$S_T$ index of Sobol** and the **$\sigma$ and $\mu^*$ indices of Morris** "present superior results" in identifying the critical regions/factors, while DGSM's $v$ and FAST's $S_T$ showed "substantial inconsistency." Different global methods can yield "somewhat different rankings of feature importance" on the same model, so the authors stress careful, problem-specific method selection.

> [!theorem] Cost scales with method and dimension ^cost-overview
> Per the case-study sampling budgets (Table 1), relative cost ranking is roughly **Morris (cheapest screening) < FAST < Sobol < Delta ≈ DGSM**. For Sobol, the standard Saltelli estimator costs $N(p+2)$ model runs for first + total order indices (see [[Sampling and Estimation for Sobol Indices]]), so cost grows with both the base sample size $N$ and the number of factors $p$ — the central practical constraint for expensive ABMs.

## Examples

A modeler has an epidemiological ABM with 12 parameters and a budget of a few thousand runs. Workflow:

1. **Screen** with Morris ($r \approx 20$ trajectories $\Rightarrow 20 \times 13 = 260$ runs). Three parameters have large $\mu^*$; two more have small $\mu^*$ but large $\sigma$ (interaction/nonlinearity); the rest have $\mu^* \approx 0$ and are **fixed**.
2. **Quantify** the 5 survivors with Sobol via Saltelli sampling ($N=1024 \Rightarrow 1024 \times 7 \approx 7000$ runs) to get $S_i$ and $S_{Ti}$.
3. **Interpret**: transmission rate has $S_i = 0.55$ (drives most variance alone); contact-network parameter has $S_i = 0.05$ but $S_{Ti} = 0.30$ — its influence is almost entirely through interactions.

## Connections

- [[Local vs Global Sensitivity Analysis]] — why OAT fails for interacting, high-dimensional ABM parameter spaces.
- [[Variance-Based Sensitivity and Sobol Indices]] — the ANOVA/HDMR decomposition and $S_i$, $S_{Ti}$.
- [[Morris Elementary Effects Screening]] — the cheap screening method ($\mu^*$, $\sigma$).
- [[Sampling and Estimation for Sobol Indices]] — Saltelli scheme, FAST, costs, SALib.
- [[Population Initialization and Parameter Sensitivity]] — local OAT sensitivity already in the vault; GSA generalizes it.
- [[Uncertainty Quantification for ABM Calibration]] — GSA reduces parameter dimension before/alongside UQ.
- [[ABM Validation Challenges]] — sensitivity analysis as part of model credibility assessment.

## See Also

- [[Approximate Bayesian Computation for ABMs]] — GSA-screened parameters reduce ABC dimensionality.
- [[History Matching for ABMs]] — sensitivity guides which inputs to refine when ruling out implausible space.
- Saltelli et al., *Sensitivity Analysis in Practice* (2004); Sobol (2001).
