---
title: "Index: Identification Strategies"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-10
concept_count: 14
---

# Identification Strategies

> [!abstract] Routing Summary
> This folder covers quasi-experimental methods from MHE Chapters 4-6, plus Bayesian and advanced synthetic control methods. Contains 14 notes.
> - Need instrumental variables or 2SLS? → [[Instrumental Variables]]
> - Need LATE theorem or complier characterization? → [[Local Average Treatment Effects]]
> - Need difference-in-differences or fixed effects? → [[Differences-in-Differences]]
> - Need sharp/fuzzy RD designs? → [[Regression Discontinuity Designs]]
> - Need Bayesian DiD with posterior over treatment effect? → [[Bayesian Difference in Differences]]
> - Need synthetic control estimator with Python code? → [[Synthetic Control]]
> - Need the linear factor model and bias bound theory? → [[Synthetic Control Bias Theory]]
> - Need RMSPE inference, backdating, or leave-one-out checks? → [[Synthetic Control Inference and Diagnostics]]
> - Need to assess if SC is appropriate for your setting? → [[Synthetic Control Requirements]]
> - Need multiple treated units, bias correction, or matrix completion? → [[Synthetic Control Extensions]]
> - Need GSC for multiple treated units with IFE model and bootstrap inference? → [[Generalized Synthetic Control Method]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| 2SLS, Wald estimator, exclusion restriction | [[Instrumental Variables]] | concept | [[Omitted Variables Bias]], [[Regression and the CEF]], [[The Selection Problem]], [[Conditional Independence Assumption]] | IV estimates causal effect for compliers when CIA fails |
| LATE theorem, compliers/always-takers/never-takers | [[Local Average Treatment Effects]] | concept | [[Instrumental Variables]], [[The Selection Problem]], [[The Experimental Ideal]] | IV estimates LATE, not ATE — only for compliers |
| Fixed effects, common trends, Card & Krueger | [[Differences-in-Differences]] | concept | [[The Selection Problem]], [[Regression and the CEF]], [[Conditional Independence Assumption]], [[Omitted Variables Bias]] | DiD removes time-invariant unobserved confounders |
| Sharp and fuzzy RD, bandwidth choice | [[Regression Discontinuity Designs]] | concept | [[Instrumental Variables]], [[Local Average Treatment Effects]], [[Regression and the CEF]], [[The Selection Problem]] | RD exploits threshold discontinuities for local causal effects |
| Bayesian DiD, posterior over treatment effect | [[Bayesian Difference in Differences]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[The Experimental Ideal]], [[Regression and the CEF]] | Full posterior over counterfactual and treatment effect |
| Synthetic control, donor pool, convex weights, placebo inference | [[Synthetic Control]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[The Experimental Ideal]] | Weighted combination of untreated units estimates counterfactual for single treated aggregate |

## Notes
- [[Mostly Harmless Econometrics - Overview]] — CONTAINS: Full book structure map, key concepts by chapter, cross-links to all identification strategy notes
- [[Instrumental Variables]] — CONTAINS: 2SLS estimation, Wald estimator, exclusion restriction, quarter-of-birth and draft lottery examples, first-stage F-test
- [[Local Average Treatment Effects]] — CONTAINS: LATE theorem, complier/always-taker/never-taker/defier taxonomy, characterizing compliers, external validity
- [[Differences-in-Differences]] — CONTAINS: Fixed effects regression, common trends assumption, Card & Krueger minimum wage, event studies
- [[Regression Discontinuity Designs]] — CONTAINS: Sharp and fuzzy RD, Lee incumbency example, Maimonides' Rule, bandwidth selection, McCrary test
- [[Bayesian Difference in Differences]] — CONTAINS: PyMC implementation, posterior over treatment effect delta, explicit counterfactual prediction, parallel trends as model constraint
- [[Synthetic Control]] — CONTAINS: Formal potential outcomes setup, OLS weights (overfitting), constrained convex weights, scipy optimisation, California Proposition 99 cigarette tax example, placebo/permutation inference, Fisher's exact test p-value
- [[Abadie 2021 - Overview]] — CONTAINS: Full paper structure map, German reunification running example, 5 key takeaways, links to all derived notes
- [[Synthetic Control Bias Theory]] — CONTAINS: Linear factor model (Eq. 10), bias bound theorem, sparsity theorem (convex hull projection), V matrix cross-validation, comparison with regression weights
- [[Synthetic Control Inference and Diagnostics]] — CONTAINS: RMSPE definition, RMSPE ratio (Eq. 12), permutation p-value, backdating definition, leave-one-out robustness
- [[Synthetic Control Requirements]] — CONTAINS: 5 contextual requirements (effect size, comparison group, no anticipation, no interference, convex hull), 3 data requirements, when not to use
- [[Synthetic Control Extensions]] — CONTAINS: Penalized SC for multiple treated units (Eq. 13), uniqueness/sparsity theorem, bias-corrected SC (Eq. 15–16), elastic net SC (Eq. 17–18), matrix completion methods
- [[Xu 2016 - Overview]] — CONTAINS: Paper overview, contribution summary, GSC vs DID/IFE/SC comparison table, caveats
- [[Generalized Synthetic Control Method]] — CONTAINS: IFE model Assumption 1, strict exogeneity Assumption 2, ATT estimand, 3-step GSC estimator, LOO cross-validation Algorithm 1, parametric bootstrap Algorithm 2, Monte Carlo performance (Table 1), EDR voter turnout example

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 4-6
- [[raw/Difference in differences]] — PyMC example: Bayesian DiD with counterfactual inference
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: Synthetic control with Python (scipy, sklearn)
- [[raw/Abadie 2021 - Using Synthetic Controls.pdf]] — Abadie (2021), JEL 59(2): 391–425. Authoritative methodological guide: feasibility, bias theory, inference, requirements, extensions
- [[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]] — Xu (2017), Political Analysis 25(1): 57–76. GSC method: IFE model, 3-step estimator, cross-validation, bootstrap inference, gsynth R package

## See Also

- [[Data Collection Models]] — Bayesian perspective on experimental design
- [[Counterfactual Inference]] — Bayesian counterfactual prediction methods
