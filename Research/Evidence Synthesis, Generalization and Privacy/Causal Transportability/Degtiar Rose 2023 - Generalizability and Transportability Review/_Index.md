---
title: "Index: Degtiar Rose 2023 - Generalizability and Transportability Review"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Causal Transportability]]"
date_updated: 2026-11-08
concept_count: 16
---

# Degtiar Rose 2023 - Generalizability and Transportability Review

> [!abstract] Routing Summary
> This folder fully captures Degtiar and Rose (2023), *A Review of Generalizability and Transportability* (Annual Review of Statistics and Its Application; arXiv 2102.11904): estimands (PATE, SATE), identifying assumptions, dissimilarity diagnostics, heterogeneity tests, weighting/matching, outcome-regression, doubly robust and combined-data estimators, recommendations and the summary-level appendix. 10 notes plus this index, with consolidated comparison tables and a reproducible marketing simulation.
> - Need the paper on one page or the section-to-note map? -> [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
> - Need PATE vs SATE, generalizability vs transportability, the sources of external validity bias? -> [[Degtiar 2023 - Populations, Estimands and External Validity Bias]]
> - Need the exact identifying assumptions (exchangeability, positivity, SUTVA for selection)? -> [[Degtiar 2023 - Identifying Assumptions]]
> - Need SMD, generalizability index, covariate shift, equivalence tests? -> [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]]
> - Need tests of treatment effect heterogeneity or what to do when generalizability fails? -> [[Degtiar 2023 - Testing Treatment Effect Heterogeneity]]
> - Need IPPW, odds weights, post-stratification, matching? -> [[Degtiar 2023 - Weighting and Matching Methods]]
> - Need outcome regression, BART, Bayesian evidence synthesis, bias-adjusted meta-analysis? -> [[Degtiar 2023 - Outcome Regression Methods]]
> - Need A-IPPW, TMLE, cross-design synthesis, combining RCT and observational data? -> [[Degtiar 2023 - Doubly Robust and Combined Methods]]
> - Need the recommendations, summary-level-data methods, or the method comparison tables? -> [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]
> - Need a runnable marketing simulation comparing the estimators? -> [[Degtiar 2023 - Marketing Application Transporting Experiment Results]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| PATE, SATE, PCATE, PATT | [[Degtiar 2023 - Populations, Estimands and External Validity Bias]] | definition | [[Causal Estimands]] | $\tau=E(Y^1-Y^0)$ in target |
| External validity bias decomposition | [[Degtiar 2023 - Populations, Estimands and External Validity Bias]] | theorem | PATE, SATE | selection x heterogeneity x correlation |
| Internal validity assumptions A1-A3 | [[Degtiar 2023 - Identifying Assumptions]] | definition | [[Potential Outcomes Framework]] | exchangeability, positivity, SUTVA |
| External validity assumptions B1-B3 | [[Degtiar 2023 - Identifying Assumptions]] | definition | A1-A3 | $Y^a\perp S\mid X$, selection positivity, SUTVA |
| Generalizability index | [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]] | definition | selection propensity | $\sum\sqrt{w_{pj}w_{sj}}$; <0.5 hard, >0.9 high |
| Tipton's three paths | [[Degtiar 2023 - Testing Treatment Effect Heterogeneity]] | concept | dissimilarity | change target, state limits, new study |
| Post-stratification | [[Degtiar 2023 - Weighting and Matching Methods]] | definition | B1, B2 | $\frac1n\sum n_l\bar Y_l^a$ |
| IPPW and odds weights | [[Degtiar 2023 - Weighting and Matching Methods]] | definition | selection propensity | $w=\frac{1-\pi_s}{\pi_s\pi_a}$ for transport |
| Outcome regression standardization | [[Degtiar 2023 - Outcome Regression Methods]] | definition | B1 | marginalize fitted means over target $X$ |
| Hierarchical Bayesian evidence synthesis | [[Degtiar 2023 - Outcome Regression Methods]] | concept | bias term | adjusts unmeasured confounding in observational data |
| A-IPPW | [[Degtiar 2023 - Doubly Robust and Combined Methods]] | definition | IPPW, outcome regression | consistent if either model right |
| TMLE for encouragement designs | [[Degtiar 2023 - Doubly Robust and Combined Methods]] | definition | IV, EIC | clever covariate $C$ |
| Cross-design synthesis | [[Degtiar 2023 - Doubly Robust and Combined Methods]] | concept | RCT + observational | constant unmeasured confounding assumption |
| Seven recommendations | [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]] | concept | all | define target, design, test, quantify, estimate, use all data, share code |
| Summary-level-data methods | [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]] | concept | data availability | appendix table |
| Simulation: four estimators | [[Degtiar 2023 - Marketing Application Transporting Experiment Results]] | example | all estimators | PATE 0.6 vs naive 1.8 |

## Notes

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]] — CONTAINS: abstract; contributions; framework; Source Map; vocabulary table.
- [[Degtiar 2023 - Populations, Estimands and External Validity Bias]] — CONTAINS: Sec. 1 populations (Fig. 1), definitions, sources of bias, designs, Fig. 2 framework; Sec. 2 notation and estimands.
- [[Degtiar 2023 - Identifying Assumptions]] — CONTAINS: A1-A3, B1-B3 with weak forms; transportability modifications; correspondence with selection diagrams.
- [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]] — CONTAINS: Sec. 4.1 and 4.2 diagnostics table; generalizability index; Python.
- [[Degtiar 2023 - Testing Treatment Effect Heterogeneity]] — CONTAINS: Sec. 4.3 tests; Tipton's three paths; comparison table; Python.
- [[Degtiar 2023 - Weighting and Matching Methods]] — CONTAINS: Sec. 5.1: matching, post-stratification, IPPW, odds weights, PS strata; summary table.
- [[Degtiar 2023 - Outcome Regression Methods]] — CONTAINS: Sec. 5.2: standardization, OLS, BART; multi-study Bayesian and meta-analytic methods.
- [[Degtiar 2023 - Doubly Robust and Combined Methods]] — CONTAINS: Sec. 5.3: TMLE, A-IPPW, calibration, domain adaptation, RCT+observational methods table.
- [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]] — CONTAINS: Sec. 6 recommendations; Appendix; consolidated comparison tables; contrast with graphical approach.
- [[Degtiar 2023 - Marketing Application Transporting Experiment Results]] — CONTAINS: DGP, full code, single-run and 200-seed results, interpretation.

## Sources

- [[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]] — Degtiar I and Rose S (2023), Annual Review of Statistics and Its Application (arXiv 2102.11904v1), the sole source. The simulation and marketing mappings are interpretation.

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]], [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]] — graphical identification counterparts.
- [[Potential Outcomes Framework]], [[Causal Estimands]], [[Bayesian Inverse Probability Weighting]], [[Propensity Score Matching - Overview]], [[Hierarchical Models]], [[Geo-Experiment Methodology - Overview]].
