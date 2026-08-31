---
title: "Within-Between Persons Distinction - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/longitudinal-methods
  - type/overview
  - doc/paper
source: "[[Research/Research Methodology/raw/rohrer-murayama-2023.pdf]]"
source_location: "Abstract, Introduction, Conclusions, pp. 1–2, 10–11"
date_ingested: 2026-04-11
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Within-Between Persons Causal Inference]]"
  - "[[Fixed-Effects Model]]"
  - "[[Cross-Lagged and Dynamic Panel Models]]"
  - "[[Estimands in Longitudinal Research]]"
aliases:
  - Rohrer Murayama 2023
  - within-between persons
  - longitudinal causal inference overview
---

# Within-Between Persons Distinction — Overview

> [!summary]
> Rohrer & Murayama (2023) clarify the relationship between the within-/between-persons distinction and causal inference in longitudinal data. Their key argument: the within/between distinction is informative but not decisive for causal inference. Between-persons data from experiments can inform average causal effects. Within-persons data is not necessary and not sufficient for causal inference, but can be very helpful. Researchers should start from well-defined estimands, not from statistical models.

## Overview

Published in *Advances in Methods and Practices in Psychological Science*, 6(1), pp. 1–14, 2023 (Rohrer & Murayama). Addresses widespread confusion in psychological research about what within-persons longitudinal analysis can and cannot accomplish for causal inference.

## Three Main Claims

> [!theorem] Claim 1: Between-Persons Data Can Inform Average Causal Effects
> From the potential outcomes framework: randomization makes treatment groups exchangeable with respect to potential outcomes. Therefore, $E[Y^{a=1}] - E[Y^{a=0}] = E[Y \mid A=1] - E[Y \mid A=0]$. Between-persons comparisons from randomized experiments recover average causal effects. Longitudinal / within-persons data is **not required**.
^claim-between-persons

> [!theorem] Claim 2: Within-Persons Data Are Not Sufficient for Causal Inference
> Within-persons designs (fixed effects, within-person mean centering) control for **time-invariant** confounders (stable personality traits, sociodemographics, genetics) but cannot control for **time-varying** confounders — events and circumstances that vary within a person over time and affect both X and Y simultaneously.
>
> Example: On days with social events, both talkativeness ($X_t$) and happiness ($Y_t$) may be elevated. The within-person association is confounded by social events even in a pure within-persons design.
^claim-within-insufficient

> [!theorem] Claim 3: Within-Persons Data Can Be Very Helpful for Causal Inference
> Within-persons data: (1) eliminates a large class of confounders — all stable time-invariant traits; (2) enables individual-level causal inference (N-of-1 designs); (3) maps how effects unfold over time including reciprocal dynamics.
^claim-within-helpful

## Central Recommendation: Estimands First

The paper's most actionable message: **start with a well-defined theoretical estimand, not a statistical model**.

Researchers should not choose a "sophisticated" longitudinal model (CLPM, dynamic panel) because it appears methodologically advanced. Instead:
1. Define the causal effect of interest precisely in potential outcomes notation
2. Identify what assumptions are needed to estimate it from observational data
3. Choose the study design and statistical model that can, under those assumptions, recover the estimand

## Three Longitudinal Models Covered

| Model | Targets | Key Assumption Violated By | See |
|-------|---------|--------------------------|-----|
| Fixed-effects (FE) | Contemporaneous within-person effects | Time-varying confounders, lagged dynamics | [[Fixed-Effects Model]] |
| Cross-lagged panel (CLPM) | Lagged reciprocal effects | Trait-like stable confounders | [[Cross-Lagged and Dynamic Panel Models]] |
| Dynamic panel (DPM) | Lagged reciprocal effects + time-invariant control | Contemporaneous effects, heterogeneous slopes | [[Cross-Lagged and Dynamic Panel Models]] |

## Connections
- Directly extends [[The Selection Problem]] to the longitudinal setting
- [[Directed Acyclic Graphs]] underlie all three model specifications (Boxes 1–3 in the paper)
- [[Garden of Forking Paths]] — choosing a longitudinal model post-hoc without pre-specified estimand is a form of researcher degrees of freedom
- [[Researcher Degrees of Freedom]] — the menu of longitudinal models (FE, CLPM, DPM, RI-CLPM) creates analytic flexibility
- [[Causal Estimands]] — the general framework for defining causal targets
- [[Differences-in-Differences]] — DiD exploits the same within-vs-between logic: within-unit variation over time differences out time-invariant confounders, making it the natural econometric complement to the FE model
- [[Omitted Variables Bias]] — between-persons confounding in observational panel data is an instance of OVB from stable unobserved traits

## See Also
- [[Within-Between Persons Causal Inference]] — detailed treatment of when each approach helps
- [[Fixed-Effects Model]] — Box 1 content
- [[Cross-Lagged and Dynamic Panel Models]] — Box 2 and Box 3
- [[Estimands in Longitudinal Research]] — how to define the right causal target
- [[Differences-in-Differences]] — econometric panel estimator that controls for time-invariant confounders via the within-unit design logic
- [[Omitted Variables Bias]] — econometric framing of between-persons confounding
- [[Time-Varying Treatments and G-computation]] — addresses Claim 2 directly: the g-formula and MSMs handle time-varying confounders that within-persons designs cannot eliminate
