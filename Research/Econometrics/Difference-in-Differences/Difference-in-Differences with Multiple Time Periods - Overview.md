---
title: Difference-in-Differences with Multiple Time Periods - Overview
tags:
  - source/ingested
  - topic/econometrics
  - type/overview
  - doc/paper
source: "[[raw/1803.09015-Callaway-SantAnna-DiD-Multiple-Periods.pdf]]"
source_location: "Sec. 1, pp. 2-5; Sec. 6, pp. 32-33"
date_ingested: 2026-06-17
folder: "Econometrics/Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Difference in differences]]"
used_by:
  - "[[Group-Time Average Treatment Effects]]"
  - "[[Identifying Assumptions for Staggered DiD]]"
  - "[[Doubly-Robust Estimands for ATT(g,t)]]"
  - "[[Aggregating Group-Time Effects]]"
  - "[[Simultaneous Inference via Multiplier Bootstrap]]"
aliases:
  - Callaway Sant'Anna 2020
  - CS DiD
  - Staggered DiD framework
---

# Difference-in-Differences with Multiple Time Periods - Overview

> [!summary]
> Callaway & Sant'Anna (2020, *J. Econometrics*) provide a unified framework for DiD with (i) multiple time periods, (ii) staggered/variation-in-treatment-timing adoption, and (iii) parallel trends that may hold only after conditioning on covariates. The core move is to separate the analysis into three steps — **identify** disaggregated group-time average treatment effects $ATT(g,t)$, **aggregate** them into interpretable summary measures, and **estimate/infer** — which completely bypasses the negative-weighting pitfalls of two-way fixed effects (TWFE) regressions under treatment effect heterogeneity. Implemented in the R package `did`.

## Overview

The canonical DiD has two periods and two groups: under parallel trends, the ATT is the treated group's change in outcomes minus the comparison group's change. Most applications, however, have **more than two periods and variation in treatment timing** (staggered adoption: once treated, units stay treated). Naively extending DiD by running a TWFE regression $Y_{i,t} = \alpha_t + \alpha_g + \beta D_{i,t} + \epsilon_{i,t}$ and interpreting $\beta$ as "the" ATT is unreliable: $\beta$ is a weighted average of underlying effects whose weights can be **negative** and are driven by treatment timing and group sizes rather than by any policy question (the TWFE critique).

The paper's contribution rests on **three separated steps**:
1. **Identification** of policy-relevant disaggregated parameters: the group-time ATT, $ATT(g,t)$.
2. **Aggregation** of the $ATT(g,t)$'s into summary measures (event-study/dynamic, group, calendar-time, overall).
3. **Estimation and inference** about those targets — including simultaneous (uniform) confidence bands via a multiplier bootstrap.

A unique feature is that it shows how to flexibly **incorporate covariates** into staggered DiD with multiple groups/periods, allowing covariate-specific (non-parallel) trends across groups — the first paper to do so for variation-in-timing settings. It offers three observationally-equivalent estimands: **outcome regression (OR)**, **inverse probability weighting (IPW)**, and **doubly-robust (DR)**.

## Main Content

> [!definition] The three-step framework
> Given $\mathcal{T}$ periods $t = 1,\dots,\mathcal{T}$, a "group" $g$ is the period a unit is **first** treated ($G = \infty$ for never-treated). The building block is
> $$ ATT(g,t) = \mathbb{E}[Y_t(g) - Y_t(0) \mid G_g = 1], $$
> the average effect at calendar time $t$ for the cohort first treated at $g$. **Step 1** point-identifies the family $\{ATT(g,t)\}$ under limited-anticipation + conditional parallel trends + overlap. **Step 2** aggregates: $\theta = \sum_{g}\sum_{t} w(g,t)\,ATT(g,t)$ for researcher-chosen weights $w(g,t)$. **Step 3** estimates each $ATT(g,t)$ by a plug-in DR/OR/IPW estimator and conducts simultaneous inference via a multiplier bootstrap.
> ^framework

> [!note] The TWFE critique (why disaggregate first)
> In the static TWFE spec $Y_{i,t} = \alpha_t + \alpha_g + \beta D_{i,t} + \epsilon_{i,t}$, the OLS $\beta$ is a weighted sum of cohort-period effects with weights set by the estimator, not the question. Under treatment-effect dynamics these weights can be **negative**, so $\beta$ can be negative even when every unit's effect is positive (Goodman-Bacon 2019, Theorem 1). The dynamic/event-study TWFE spec $Y_{i,t} = \alpha_t + \alpha_g + \sum_{e=-K}^{-2}\delta_e^{anticip} D_{i,t}^e + \sum_{e=0}^{L}\beta_e D_{i,t}^e + v_{i,t}$ (with $D_{i,t}^e = \mathbf{1}\{t - G_i = e\}$) does **not** fix this: Sun & Abraham (2020) show the $\beta_e$ also suffer contamination from other cohorts' effects. CS's $ATT(g,t)$'s carry a clean causal interpretation regardless of heterogeneity.
> ^twfe-critique

The paper situates itself within the heterogeneous-treatment-effects-in-DiD literature: **Goodman-Bacon (2019)** (decomposition of TWFE into 2x2 comparisons), **Sun & Abraham (2020)** (interaction-weighted event study; cohort-specific effects), **de Chaisemartin & D'Haultfœuille (2020)** (instantaneous effect under weaker but staggered-general selection), Borusyak & Jaravel (2017), Athey & Imbens (2018, design-based). Relative to these, CS uniquely (a) allows **conditional** parallel trends with covariate-specific trends, (b) builds *families* of aggregations in a unified manner, and (c) uses **simultaneous** inference accounting for multiple testing.

## Examples

> [!example] Minimum wage and teen employment (Sec. 5)
> **Setup.** County-level teen employment, 2001-2007, federal minimum wage flat at \$5.15. Groups = year a state first raised its minimum wage above the federal floor; never-raisers = comparison group. Final sample: 2,284 counties in 29 states (after dropping states already above federal in 2000, states lacking employment data, and four Northern-region states). Data: Quarterly Workforce Indicators + 2000 County Data Book.
> **Result.** Under **conditional** parallel trends with the DR estimator, increasing the minimum wage **lowered teen employment**; the overall effect ($\theta^O_{sel}$) is about **-3.1%**, with dynamic effects growing with exposure. A naive TWFE post-dummy coefficient is small and statistically insignificant (-0.008).
> **Interpretation.** In a prominent application with all the hallmark complications (heterogeneity, dynamics, staggered adoption), the choice of estimation method changes the qualitative conclusion: TWFE finds "no effect," the heterogeneity-robust CS approach finds a clear negative effect. See [[Simultaneous Inference via Multiplier Bootstrap]] for the full numbers.
> ^min-wage

## Connections

- Builds the disaggregated target in [[Group-Time Average Treatment Effects]].
- Identification conditions in [[Identifying Assumptions for Staggered DiD]].
- Estimands in [[Doubly-Robust Estimands for ATT(g,t)]].
- Summary measures in [[Aggregating Group-Time Effects]].
- Asymptotics and uniform bands in [[Simultaneous Inference via Multiplier Bootstrap]].
- Generalizes the canonical 2x2 design in [[Difference in differences]] and the DiD chapter of [[Mostly Harmless Econometrics]].
- Conceptual cousin to [[Synthetic Control]] for staggered policy adoption.

## See Also

- [[The Experimental Ideal]] — the randomization benchmark DiD approximates
- [[Estimands in Longitudinal Research]] — potential-outcomes targets over time
- [[Directed Acyclic Graphs]] — graphical view of conditional parallel trends
