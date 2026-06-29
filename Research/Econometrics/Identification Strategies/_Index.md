---
title: "Index: Identification Strategies"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-06-29
concept_count: 19
---

# Identification Strategies

> [!abstract] Routing Summary
> This folder covers quasi-experimental methods from MHE Chapters 4-6, plus Bayesian and advanced synthetic control methods, DAG-based causal identification, propensity score matching, and Bayesian propensity score weighting. Contains 19 notes.
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
> - Need DAG concepts, forks/chains/colliders, backdoor adjustment, d-separation? → [[DAGs and Causal Identification]]
> - Need PSM theory (Rosenbaum-Rubin theorem, ATT estimand, balancing score)? → [[Propensity Score Matching]]
> - Need NN matching, caliper matching, k:1, MatchIt R code? → [[Matching Algorithms and Caliper Matching]]
> - Need SMDs, love plots, overlap plots, variance ratios after matching? → [[Covariate Balance Diagnostics]]
> - Need Bayesian inverse probability weighting / Liao-Zigler marginalization method? → [[Bayesian Propensity Score Weighting]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| 2SLS, Wald estimator, exclusion restriction | [[Instrumental Variables]] | concept | [[Omitted Variables Bias]], [[Regression and the CEF]], [[The Selection Problem]], [[Conditional Independence Assumption]] | IV estimates causal effect for compliers when CIA fails |
| LATE theorem, compliers/always-takers/never-takers | [[Local Average Treatment Effects]] | concept | [[Instrumental Variables]], [[The Selection Problem]], [[The Experimental Ideal]] | IV estimates LATE, not ATE — only for compliers |
| Fixed effects, common trends, Card & Krueger | [[Differences-in-Differences]] | concept | [[The Selection Problem]], [[Regression and the CEF]], [[Conditional Independence Assumption]], [[Omitted Variables Bias]] | DiD removes time-invariant unobserved confounders |
| Sharp and fuzzy RD, bandwidth choice | [[Regression Discontinuity Designs]] | concept | [[Instrumental Variables]], [[Local Average Treatment Effects]], [[Regression and the CEF]], [[The Selection Problem]] | RD exploits threshold discontinuities for local causal effects |
| Bayesian DiD, posterior over treatment effect | [[Bayesian Difference in Differences]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[The Experimental Ideal]], [[Regression and the CEF]] | Full posterior over counterfactual and treatment effect |
| Synthetic control, donor pool, convex weights, placebo inference | [[Synthetic Control]] | concept | [[Differences-in-Differences]], [[The Selection Problem]], [[The Experimental Ideal]] | Weighted combination of untreated units estimates counterfactual for single treated aggregate |
| Linear factor model, bias bound, sparsity theorem, V-matrix | [[Synthetic Control Bias Theory]] | concept | [[Synthetic Control]], [[The Selection Problem]] | Bias bounded by pre-treatment fit; convex hull projection guarantees sparsity |
| RMSPE ratio, permutation p-value, backdating, leave-one-out | [[Synthetic Control Inference and Diagnostics]] | concept | [[Synthetic Control]], [[Synthetic Control Bias Theory]] | Permutation inference valid without asymptotic theory; RMSPE ratio detects poor donors |
| 5 contextual + 3 data requirements, when not to use SC | [[Synthetic Control Requirements]] | concept | [[Synthetic Control]], [[Synthetic Control Bias Theory]] | SC needs large effect, clean comparison group, and pre-treatment fit within convex hull |
| Penalized SC, bias-corrected SC, elastic net, matrix completion | [[Synthetic Control Extensions]] | concept | [[Synthetic Control]], [[Synthetic Control Bias Theory]], [[Synthetic Control Inference and Diagnostics]] | Multiple extensions handle multiple treated units, sparse donors, and matrix completion |
| IFE model, ATT estimand, 3-step GSC, bootstrap inference | [[Generalized Synthetic Control Method]] | concept | [[Synthetic Control]], [[Differences-in-Differences]], [[The Selection Problem]] | GSC unifies DiD and SC via interactive fixed effects; valid for multiple treated units |
| DAGs, forks/chains/colliders, backdoor criterion, d-separation | [[DAGs and Causal Identification]] | concept | [[The Selection Problem]], [[The Experimental Ideal]] | Valid adjustment set blocks all backdoor paths; do-calculus enables causal inference from observational data |
| Propensity score (balancing score), ATT estimand, PS sufficiency theorem | [[Propensity Score Matching]] | concept | [[Potential Outcomes Framework]], [[The Selection Problem]], [[Conditional Independence Assumption]] | PS sufficiency: CIA given X ⟹ CIA given e(X); reduces p-dim balancing to 1-dim |
| NN matching, caliper (0.2 SD logit-e rule), k:1, with/without replacement, MatchIt | [[Matching Algorithms and Caliper Matching]] | concept | [[Propensity Score Matching]] | Caliper prevents poor matches; full matching is optimal; cluster SEs by matched pair |
| SMD (|SMD| < 0.1), love plot, variance ratio, KS statistic, overlap plot | [[Covariate Balance Diagnostics]] | concept | [[Propensity Score Matching]], [[Matching Algorithms and Caliper Matching]] | Balance necessary but not sufficient — follow with sensitivity analysis |
| Bayesian IPTW, Liao-Zigler marginalization, Rubin's rules SE | [[Bayesian Propensity Score Weighting]] | concept | [[DAGs and Causal Identification]], [[The Selection Problem]], [[Bayesian Linear Regression]] | Marginalize over posterior propensity scores to incorporate treatment-model uncertainty |

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
- [[DAGs and Causal Identification]] — CONTAINS: Forks, chains, colliders, conditioning rules, d-separation formal definition, backdoor path definition, backdoor adjustment formula, valid adjustment sets, Simpson's paradox
- [[Propensity Score Matching]] — CONTAINS: propensity score definition, PS sufficiency theorem (Rosenbaum & Rubin 1983, Thm 1), ATT estimand, PSM ATT estimator formula, treatment model variable selection guidance, comparison table PSM vs IPW vs regression vs DR
- [[Matching Algorithms and Caliper Matching]] — CONTAINS: NN matching (greedy vs optimal, with/without replacement), caliper definition and 0.2-SD rule, k:1 matching bias-variance tradeoff, full matching, Mahalanobis distance matching, MatchIt R implementation, Abadie-Imbens SE correction
- [[Covariate Balance Diagnostics]] — CONTAINS: SMD formula and |0.1| threshold, love plot interpretation, variance ratio [0.5,2.0] range, KS statistic, overlap plot (common support), cobalt/MatchIt/tableone R packages, overall assessment workflow
- [[Bayesian Propensity Score Weighting]] — CONTAINS: IPTW formula, pseudo-population interpretation, why Bayesian propensity scores are problematic (likelihood incompatibility), Liao-Zigler marginalization integral, brms R implementation, Rubin's rules SE combination

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 4-6
- [[raw/Difference in differences]] — PyMC example: Bayesian DiD with counterfactual inference
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: Synthetic control with Python (scipy, sklearn)
- [[raw/Abadie 2021 - Using Synthetic Controls.pdf]] — Abadie (2021), JEL 59(2): 391–425. Authoritative methodological guide: feasibility, bias theory, inference, requirements, extensions
- [[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]] — Xu (2017), Political Analysis 25(1): 57–76. GSC method: IFE model, 3-step estimator, cross-validation, bootstrap inference, gsynth R package
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023-04-06): DAGs, confounders, backdoor adjustment, d-separation
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — Li et al. (2022), §2 pp. 3–8: propensity score matching and frequentist causal estimation (Rosenbaum & Rubin 1983 framework, matching methods, balance)

## See Also

- [[Data Collection Models]] — Bayesian perspective on experimental design
- [[Counterfactual Inference]] — Bayesian counterfactual prediction methods
- [[Nonparametric Causal Inference]] — BART + propensity scores for ATE/ATT estimation
