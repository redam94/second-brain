---
title: "Index: Identification Strategies"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-06-30
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
> - Need Bayesian inverse probability weighting / Liao-Zigler marginalization method? → [[Bayesian Propensity Score Weighting]]
> - Need propensity score matching theory (balancing property, Rosenbaum & Rubin)? → [[Propensity Score Matching - Overview]]
> - Need matching algorithms (nearest-neighbor, caliper, kernel, Mahalanobis)? → [[PSM Algorithms and Matching Estimators]]
> - Need balance diagnostics (SMD, love plots, overlap plots, Rosenbaum bounds)? → [[Covariate Balance and Overlap Diagnostics]]

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
| Bayesian IPTW, Liao-Zigler marginalization, Rubin's rules SE | [[Bayesian Propensity Score Weighting]] | concept | [[DAGs and Causal Identification]], [[The Selection Problem]], [[Bayesian Linear Regression]] | Marginalize over posterior propensity scores to incorporate treatment-model uncertainty |
| Propensity score theorem, balancing property, ATT vs ATE, when PSM fails | [[Propensity Score Matching - Overview]] | concept | [[Conditional Independence Assumption]], [[The Selection Problem]], [[Causal Estimands]] | Rosenbaum & Rubin (1983): PS is a balancing score; conditioning on scalar e(X) removes multivariate confounding |
| NNM, caliper matching, kernel matching, Mahalanobis, with/without replacement, Abadie-Imbens BC | [[PSM Algorithms and Matching Estimators]] | concept | [[Propensity Score Matching - Overview]], [[Causal Estimands]] | Caliper = 0.2σ(logit PS) standard; Abadie-Imbens bias correction required for √N-consistent inference |
| SMD, variance ratio, love plots, overlap plots, common support, trimming, Rosenbaum bounds | [[Covariate Balance and Overlap Diagnostics]] | concept | [[Propensity Score Matching - Overview]], [[PSM Algorithms and Matching Estimators]] | Balance threshold |SMD| < 0.10; love plots are the standard visualization; Rosenbaum Γ quantifies sensitivity to hidden bias |

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
- [[Bayesian Propensity Score Weighting]] — CONTAINS: IPTW formula, pseudo-population interpretation, why Bayesian propensity scores are problematic (likelihood incompatibility), Liao-Zigler marginalization integral, brms R implementation, Rubin's rules SE combination
- [[Propensity Score Matching - Overview]] — CONTAINS: Rosenbaum & Rubin (1983) propensity score theorem, balancing property (Theorem 1), sufficiency for ignorability (Theorem 2), subclassification result (90% bias removal with J=5 strata), ATT/ATE/ATC estimands, when PSM fails (selection on unobservables, activity bias), PSM vs DiD/IV/RD/SC comparison table
- [[PSM Algorithms and Matching Estimators]] — CONTAINS: Nearest-neighbor matching (greedy/optimal, k:1, with/without replacement), caliper matching (Cochran-Rubin 0.2σ rule), kernel matching formula, radius matching, Mahalanobis distance matching, combined Mahalanobis+caliper, Abadie-Imbens bias-corrected estimator, algorithm comparison table, MatchIt/cobalt R workflow
- [[Covariate Balance and Overlap Diagnostics]] — CONTAINS: SMD formula, balance threshold (|SMD| < 0.10), variance ratio (0.5–2.0), love plot construction, KS statistic for continuous covariates, propensity score overlap plots, common support condition (min-max rule), Crump et al. (2009) optimal trimming (α ≈ 0.10), Rosenbaum Γ sensitivity bounds, PSM reporting checklist

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapters 4-6
- [[raw/Difference in differences]] — PyMC example: Bayesian DiD with counterfactual inference
- [[raw/15 - Synthetic Control — Causal Inference for the Brave and True]] — Causal Inference for the Brave and True, Ch. 15: Synthetic control with Python (scipy, sklearn)
- [[raw/Abadie 2021 - Using Synthetic Controls.pdf]] — Abadie (2021), JEL 59(2): 391–425. Authoritative methodological guide: feasibility, bias theory, inference, requirements, extensions
- [[raw/Xu 2016 - Generalized Synthetic Control Method.pdf]] — Xu (2017), Political Analysis 25(1): 57–76. GSC method: IFE model, 3-step estimator, cross-validation, bootstrap inference, gsynth R package
- [[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]] — Graham Harrison, Towards Data Science (2023-04-06): DAGs, confounders, backdoor adjustment, d-separation
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW in R/brms
- [[raw/Rosenbaum Rubin 1983 - The Central Role of the Propensity Score]] — Rosenbaum & Rubin (1983), Biometrika 70(1): 41–55. Foundational paper: propensity score definition, balancing property theorem, sufficiency for ignorability, subclassification result
- [[raw/Imbens 2004 - Nonparametric Estimation of Average Treatment Effects]] — Imbens (2004), REStat 86(1): 4–29 (NBER WP t0294). Review of matching, weighting, and series estimation under unconfoundedness; Abadie-Imbens bias correction; optimal trimming
- [[raw/Caliendo Kopeinig 2008 - Practical Guidance for PSM]] — Caliendo & Kopeinig (2008), Journal of Economic Surveys 22(1): 31–72 (IZA DP 1588). Practitioner's guide: algorithm selection, common support, balance assessment, Rosenbaum bounds

## See Also

- [[Data Collection Models]] — Bayesian perspective on experimental design
- [[Counterfactual Inference]] — Bayesian counterfactual prediction methods
- [[Nonparametric Causal Inference]] — BART + propensity scores for ATE/ATT estimation
