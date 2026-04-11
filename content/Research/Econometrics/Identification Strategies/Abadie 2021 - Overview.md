---
title: "Abadie 2021 - Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - type/overview
  - doc/paper
source: "[[raw/Abadie 2021 - Using Synthetic Controls.pdf]]"
source_location: "JEL 59(2): 391–425"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Synthetic Control Bias Theory]]"
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[Synthetic Control Requirements]]"
  - "[[Synthetic Control Extensions]]"
aliases:
  - "Abadie 2021"
  - "Using Synthetic Controls"
---

# Abadie 2021 — Using Synthetic Controls

> [!summary]
> Alberto Abadie's 2021 *JEL* review provides the authoritative methodological guide to synthetic controls: when they are appropriate, how to implement them correctly, how to conduct inference, and where they fail. Written by the method's creator, it moves beyond the basic estimator to cover the linear factor model underpinning bias bounds, five contextual requirements, data requirements, robustness diagnostics, and a survey of extensions (multiple treated units, bias correction, elastic net, matrix completion).

## Citation

> Abadie, Alberto. 2021. "Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects." *Journal of Economic Literature* 59 (2): 391–425. https://doi.org/10.1257/jel.20191450

## Overview

Synthetic control methods (Abadie and Gardeazabal 2003; Abadie, Diamond, and Hainmueller 2010) have become *"arguably the most important innovation in the policy evaluation literature in the last 15 years"* (Athey and Imbens 2017). This article provides practical guidance on when and how to apply them — and, crucially, when not to.

The central thesis: **mechanical application of synthetic controls without regard for contextual and data requirements is risky**. The method's interpretability and transparent counterfactual are its greatest strengths, but they also reveal failures that are invisible in regression-based methods.

## Paper Structure

| Section | Title | Key content |
|---------|-------|-------------|
| 2 | A Primer on SC Estimators | Setup, estimator definitions (Eq. 1–6) |
| 3 | Formal Aspects | Setting, estimation, bias bound, variable selection, inference |
| 3.1 | The Setting | Potential outcomes, donor pool, predictors $X_{1j}$ |
| 3.2 | Estimation | Weight selection, V matrix via cross-validation |
| 3.3 | Bias Bound | Linear factor model, bias ∝ 1/T₀ |
| 3.4 | Variable Selection | Pre-intervention outcomes as predictors; out-of-sample validation |
| 3.5 | Inference | RMSPE ratio, permutation p-value |
| 4 | Why Use Synthetic Controls? | Advantages over regression: no extrapolation, sparsity, transparency |
| 5 | Contextual Requirements | 5 conditions: effect size, comparison group, no anticipation, no interference, convex hull |
| 6 | Data Requirements | Aggregate data, sufficient pre-/post-intervention windows |
| 7 | Robustness and Diagnostics | Backdating, robustness tests, leave-one-out |
| 8 | Extensions | Multiple treated units, bias correction, elastic net, matrix completion |
| 9 | Conclusions | Open areas for research |

## Key Takeaways

1. **Sparsity is a feature, not a bug.** Synthetic control weights are bounded by $k$ (the number of predictors) and typically only a few donor units carry nonzero weight. This makes the counterfactual transparent and interpretable.

2. **The bias bound depends critically on pre-treatment fit.** Under the [[Synthetic Control Bias Theory#^thm-bias-bound|linear factor model]], bias is bounded by a function that decreases with $T_0$ — but only if the synthetic control closely tracks the treated unit pre-intervention. A large $T_0$ alone does not guarantee low bias.

3. **Do not use synthetic controls when the treated unit is outside the convex hull.** If no weighted average of donor units can approximate the treated unit's pre-treatment characteristics, the method is inadmissible and extrapolation biases may be large.

4. **Permutation inference is exact in small samples.** The RMSPE ratio $r_j$ is the correct test statistic — not the raw treatment effect — because it accounts for heterogeneous pre-treatment fit across donor units.

5. **Postregistration of weights is crucial.** Because weights can be calculated from pre-intervention data only, the synthetic control design supports pre-analysis plans that are formally verified before outcomes are observed.

## Running Example: German Reunification (Abadie, Diamond, and Hainmueller 2015)

- **Treated unit**: West Germany
- **Intervention**: 1990 German reunification
- **Donor pool**: 16 OECD countries
- **Outcome**: Per capita GDP (PPP 2002 USD), 1960–2003
- **Predictors**: GDP per capita (avg 1981–90), trade openness, inflation rate, industry share, schooling, investment rate
- **Synthetic West Germany**: Austria (42%), United States (22%), Japan (16%), Switzerland (11%), Netherlands (9%)
- **Key result**: The synthetic control closely tracks West Germany pre-1990, then diverges post-reunification, implying a negative causal effect of reunification on per capita GDP

## Notes Generated from This Paper

- [[Synthetic Control]] — existing note covering basic estimator, California Prop 99 example, constrained optimization
- [[Synthetic Control Bias Theory]] — linear factor model, bias bound theorem, variable selection
- [[Synthetic Control Inference and Diagnostics]] — RMSPE inference, permutation test, backdating, robustness
- [[Synthetic Control Requirements]] — 5 contextual requirements, data requirements, when not to use
- [[Synthetic Control Extensions]] — multiple treated units, bias correction, elastic net, matrix completion

## See Also

- [[Synthetic Control]] — the core estimator (from CIBT tutorial + this paper)
- [[Differences-in-Differences]] — the classical panel method SC generalizes
- [[Local Average Treatment Effects]] — LATE is the estimand when compliance matters; SC targets the ATT for the treated aggregate
- [[The Selection Problem]] — SC addresses selection by constructing a matched counterfactual
- [[Bayesian Difference in Differences]] — Bayesian alternative for the same aggregate time-series setting
