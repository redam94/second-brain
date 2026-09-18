---
title: "Xu 2016 - Generalized Synthetic Control Method: Causal Inference with Interactive Fixed Effects Models"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - topic/panel-data
  - type/overview
  - doc/paper
source: "[[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]]"
source_location: "Political Analysis 25(1): 57–76"
date_ingested: 2026-04-10
date_updated: 2026-08-24
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Differences-in-Differences]]"
  - "[[Synthetic Control Bias Theory]]"
used_by:
  - "[[Generalized Synthetic Control Method]]"
aliases:
  - "Xu 2016"
  - "Xu 2017"
  - "GSC overview"
---

# Xu (2016) — Generalized Synthetic Control Method

> [!summary]
> Yiqing Xu proposes the **Generalized Synthetic Control (GSC)** method, which unifies difference-in-differences and the synthetic control method under a single interactive fixed effects (IFE) framework. GSC handles multiple treated units and variable treatment periods, produces frequentist uncertainty estimates (standard errors and confidence intervals) via parametric bootstrap, and embeds cross-validation for automatic model selection — addressing the key limitations of both DID (parallel trends) and SC (single treated unit, no inference).

## Citation

> Xu, Yiqing. 2017. "Generalized Synthetic Control Method: Causal Inference with Interactive Fixed Effects Models." *Political Analysis* 25 (1): 57–76. https://doi.org/10.1017/pan.2016.2

## Overview

DID requires parallel trends — that treated and control units would have followed the same trajectory in the absence of treatment. Synthetic controls require a single treated unit and provide no formal uncertainty estimates. The GSC method addresses both limitations by modeling unobserved time-varying confounders explicitly via an **interactive fixed effects (IFE)** model.

The key insight: by estimating the IFE model on the control group only, then projecting treated units' pre-treatment outcomes onto the estimated factor space, the method imputes what the treated units' outcomes would have been without treatment. DID is the special case where factor loadings are constant ($\lambda_i = \lambda$); synthetic control is the special case with one treated unit and no parametric model.

## Paper Structure

| Section | Title | Key content |
|---------|-------|-------------|
| 1 | Introduction | DID parallel trends problem; IFE as solution; GSC as unification |
| 2 | Framework | Assumption 1 (IFE functional form); ATT estimand; Assumptions 2–5 |
| 2.1 | Identification assumptions | Strict exogeneity (Assumption 2); weak serial dependence |
| 3 | Estimation Strategy | 3-step GSC estimator; Algorithm 1 (cross-validation); Algorithm 2 (bootstrap) |
| 3.1 | Model selection | LOO cross-validation for number of factors $r$ |
| 3.2 | Inference | Parametric bootstrap procedure for $\text{Var}(\widehat{ATT})$ |
| 4 | Monte Carlo Evidence | Simulation: GSC vs DID, IFE, SC; Table 1 (bias, SD, RMSE, coverage) |
| 5 | Empirical Example | Election Day Registration (EDR) and voter turnout, 47 US states 1920–2012 |
| 6 | Conclusion | Caveats: $T_0 < 10$ or $N_{co} < 40$; diagnostics recommended |

## Key Contributions

1. **Unification of DID and SC**: The GSC framework encompasses DID (constant factor loadings) and SC (single treated unit) as special cases.

2. **Multiple treated units, variable treatment timing**: The IFE model is estimated once on the control group; factor loadings for each treated unit are estimated separately in Step 2. No need to run separate SC optimizations for each treated unit.

3. **Frequentist uncertainty estimates**: The parametric bootstrap (Algorithm 2) produces standard errors and confidence intervals, filling the gap left by the permutation-only inference of canonical SC.

4. **Automatic model selection**: Cross-validation (Algorithm 1) selects the number of factors $r$ without researcher discretion, guarding against specification search.

5. **Performance vs. alternatives**: Monte Carlo shows GSC has less bias than DID/IFE when treatment is heterogeneous and less bias than IFE when treatment effect is heterogeneous across units; more efficient than original SC.

## Relationship to Existing Notes

| Concept | Vault Note | Relationship |
|---------|-----------|-------------|
| Basic SC estimator | [[Synthetic Control]] | GSC generalizes: multiple units, parametric bootstrap |
| Linear factor model | [[Synthetic Control Bias Theory]] | Same model; GSC estimates it directly on controls |
| Bias bound | [[Synthetic Control Bias Theory]] | GSC bias → 0 as $N_{co}, T_0 \to \infty$ (Remark 2) |
| DID/parallel trends | [[Differences-in-Differences]] | DID is the special case $\lambda_i = \lambda$ in Assumption 1 |
| Multiple treated units | [[Synthetic Control Extensions]] | GSC is the primary multi-unit extension (vs. penalized SC) |
| Bayesian IFE/TSCS | [[Bayesian Difference in Differences]] | Bayesian analog; Pang (2014) cited as a complement |

## Caveats (from Conclusion)

1. **Small samples**: Bias increases when $T_0 < 10$ or $N_{co} < 40$ due to imprecise estimation of factor loadings ("incidental parameters" problem)
2. **Common support requirement**: If treated and control units do not share common support in factor loadings, GSC may extrapolate — diagnostics essential (plot factor loadings as in Figure 3b)
3. **Limitations vs. complex DGPs**: Cannot accommodate dynamic treatment–outcome relationships, structural breaks, multiple treatment intensities, or random coefficients for observed covariates

## Notes Generated from This Paper

- [[Xu 2016 - Overview]] — this note
- [[Generalized Synthetic Control Method]] — full formal treatment: IFE model, assumptions, 3-step estimator, cross-validation, bootstrap, empirical application

## See Also

- [[Synthetic Control]] — the canonical single-unit estimator that GSC generalizes
- [[Synthetic Control Bias Theory]] — the linear factor model underpinning GSC
- [[Synthetic Control Extensions]] — survey of extensions including GSC, elastic net, matrix completion
- [[Differences-in-Differences]] — the special case when parallel trends holds
- [[Difference-in-Differences with Multiple Time Periods - Overview]] — Callaway-Sant'Anna handles staggered timing at the DiD level; GSC handles time-varying factors at the IFE level
- [[Abadie 2021 - Overview]] — complementary methodological guide on canonical SC feasibility
- [[The Selection Problem]] — GSC addresses the selection problem when parallel trends (DiD) or convex hull (SC) conditions fail
