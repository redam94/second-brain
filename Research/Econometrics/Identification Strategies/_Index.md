---
title: "Index: Identification Strategies"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-10
concept_count: 8
---

# Identification Strategies

> [!abstract] Routing Summary
> This folder covers quasi-experimental methods from MHE Chapters 4-6, a Bayesian DiD implementation, plus newer causal inference tools (synthetic control, DAGs, Bayesian IPW). Contains 8 notes.
> - Need instrumental variables or 2SLS? → [[Instrumental Variables]]
> - Need LATE theorem or complier characterization? → [[Local Average Treatment Effects]]
> - Need difference-in-differences or fixed effects? → [[Differences-in-Differences]]
> - Need sharp/fuzzy RD designs? → [[Regression Discontinuity Designs]]
> - Need Bayesian DiD with posterior over treatment effect? → [[Bayesian Difference in Differences]]
> - Need a data-driven control for a single treated unit (aggregate data)? → [[Synthetic Control]]
> - Need to understand confounders, forks, colliders, backdoor paths in a causal graph? → [[Directed Acyclic Graphs]]
> - Need to apply Bayesian inference with propensity score weighting? → [[Bayesian Propensity Scores and IPW]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| 2SLS, Wald estimator, exclusion restriction | [[Instrumental Variables]] | concept | [[Omitted Variables Bias]], [[Regression and the CEF]], [[The Selection Problem]], [[Conditional Independence Assumption]] | IV estimates causal effect for compliers when CIA fails |
| LATE theorem, compliers/always-takers/never-takers | [[Local Average Treatment Effects]] | concept | [[Instrumental Variables]], [[The Selection Problem]], [[The Experimental Ideal]] | IV estimates LATE, not ATE — only for compliers |
| Fixed effects, common trends, Card & Krueger | [[Differences-in-Differences]] | concept | [[The Selection Problem]], [[Regression and the CEF]], [[Conditional Independence Assumption]], [[Omitted Variables Bias]] | DiD removes time-invariant unobserved confounders |
| Sharp and fuzzy RD, bandwidth choice | [[Regression Discontinuity Designs]] | concept | [[Instrumental Variables]], [[Local Average Treatment Effects]], [[Regression and the CEF]], [[The Selection Problem]] | RD exploits threshold discontinuities for local causal effects |
| Bayesian DiD, posterior over treatment effect | [[Bayesian Difference in Differences]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[The Experimental Ideal]], [[Regression and the CEF]] | Full posterior over counterfactual and treatment effect |
| Donor pool, simplex weights, placebo tests | [[Synthetic Control]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[Counterfactual Inference]] | Constructs data-driven control for single treated unit; permutation inference |
| Forks, chains, colliders, backdoor adjustment | [[Directed Acyclic Graphs]] | concept | [[The Selection Problem]], [[Conditional Independence Assumption]] | Valid adjustment sets identify minimal conditioning to recover causal effects |
| IPTW, pseudo-populations, Liao–Zigler marginalization | [[Bayesian Propensity Scores and IPW]] | concept | [[Directed Acyclic Graphs]], [[The Selection Problem]], [[Conditional Independence Assumption]], [[Bayesian Linear Regression]] | Bayesian posterior over ATE propagating propensity score uncertainty |

## Notes

- [[Instrumental Variables]] — CONTAINS: 2SLS estimation, Wald estimator, exclusion restriction, quarter-of-birth and draft lottery examples, first-stage F-test
- [[Local Average Treatment Effects]] — CONTAINS: LATE theorem, complier/always-taker/never-taker/defier taxonomy, characterizing compliers, external validity
- [[Differences-in-Differences]] — CONTAINS: Fixed effects regression, common trends assumption, Card & Krueger minimum wage, event studies
- [[Regression Discontinuity Designs]] — CONTAINS: Sharp and fuzzy RD, Lee incumbency example, Maimonides' Rule, bandwidth selection, McCrary test
- [[Bayesian Difference in Differences]] — CONTAINS: PyMC implementation, posterior over treatment effect delta, explicit counterfactual prediction, parallel trends as model constraint
- [[Synthetic Control]] — CONTAINS: Donor pool, potential outcomes framing, synthetic control as constrained regression, simplex weights, Fisher-style placebo/permutation tests, Python implementation (scipy, sklearn), California Proposition 99 example
- [[Directed Acyclic Graphs]] — CONTAINS: DAG vocabulary (nodes, edges, paths), fork/chain/collider junction rules, backdoor paths, valid adjustment sets, optimal adjustment set, backdoor adjustment formula, Simpson's Paradox, collider bias
- [[Bayesian Propensity Scores and IPW]] — CONTAINS: IPTW formula, pseudo-populations, Robins–Hernán–Wasserman impossibility, Liao–Zigler two-stage marginalization, brms implementation in R, posterior over ATE, mosquito net example

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 4-6
- [[raw/Difference in differences]] — PyMC example: Bayesian DiD with counterfactual inference
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Python tutorial: synthetic control via constrained regression and permutation inference
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Article: DAG vocabulary, junction rules, backdoor adjustment
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Tutorial: Liao–Zigler Bayesian IPW in R/brms

## See Also

- [[Data Collection Models]] — Bayesian perspective on experimental design
- [[Counterfactual Inference]] — Bayesian counterfactual prediction methods
- [[Directed Acyclic Graphs]] — causal graph framework underlying identification logic
