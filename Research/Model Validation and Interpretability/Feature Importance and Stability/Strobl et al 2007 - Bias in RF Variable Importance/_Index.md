---
title: "Index: Strobl et al 2007 - Bias in RF Variable Importance"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
parent: "[[../_Index|Feature Importance and Stability]]"
date_updated: 2026-10-13
concept_count: 7
---

# Strobl et al 2007 - Bias in RF Variable Importance

> [!abstract] Routing Summary
> This folder fully captures Strobl, Boulesteix, Zeileis & Hothorn (2007), *Bias in random forest variable importance measures* (BMC Bioinformatics 8:25): why random-forest importance (selection frequency, Gini, permutation) depends on a predictor's number of categories / scale of measurement, the two mechanisms behind it, and the `cforest` + subsampling remedy. Contains 7 notes.
> - Need the paper in one page, key numbers, or the section → note map? → [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
> - Need definitions of selection frequency, Gini importance, permutation importance, scaled importance, `ctree`/`cforest`, subagging? → [[Strobl 2007 - RF Importance Measures and the cforest Alternative]]
> - Need the simulation design (Tables 1-2, null vs power case)? → [[Strobl 2007 - Null and Power Case Simulation Design]]
> - Need the simulation results, Table 3 identification rates or Table 4 misclassification? → [[Strobl 2007 - Null and Power Case Results]]
> - Need why CART prefers many-category variables (cutpoint multiple testing, Fig. 10)? → [[Strobl 2007 - Split-Selection Bias in CART Trees]]
> - Need why bootstrap samples create spurious association (Fig. 11)? → [[Strobl 2007 - Bootstrap-Induced Association]]
> - Need the real-data example (C-to-U RNA editing, Table 5)? → [[Strobl 2007 - C-to-U RNA Editing Application]]
> - Need practical recommendations, scope, limitations? → [[Strobl 2007 - Conclusions, Scope and Practical Guidance]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Selection frequency / Gini / permutation importance | [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] | definition | [[Permutation Tests and Exact Inference]] | Three RF importance measures; scaled PI is default of `randomForest` |
| Conditional inference tree / `cforest` | [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] | definition | [[Permutation Tests and Exact Inference]] | Variable chosen by minimum $p$-value of independence test |
| Null / power case design | [[Strobl 2007 - Null and Power Case Simulation Design]] | example | [[Designing Simulated-Data Experiments]] | $X_1\sim N(0,1)$, $X_{2..5}\sim M(2,4,10,20)$, $n=120$, relevance 0.05-0.2 |
| Cardinality-dependent importance | [[Strobl 2007 - Null and Power Case Results]] | theorem | [[Strobl 2007 - Null and Power Case Simulation Design]] | Gini most biased; PI variance grows with categories; `cforest`+subsampling 0.729 vs 0.413 correct at rel. 0.1 |
| Split-selection (cutpoint) bias | [[Strobl 2007 - Split-Selection Bias in CART Trees]] | theorem | [[Multiple Testing Corrections]] | Best-of-many-cutpoints favours many categories; `ctree` unbiased (Fig. 10) |
| Bootstrap-induced association | [[Strobl 2007 - Bootstrap-Induced Association]] | theorem | [[Strobl 2007 - Split-Selection Bias in CART Trees]] | $\chi^2$ $p$-values shift toward 0 on bootstrap samples, worse with more categories, not cured by $n$ |
| Real-data check | [[Strobl 2007 - C-to-U RNA Editing Application]] | example | [[Strobl 2007 - Null and Power Case Results]] | `cforest` sharper importances, 0.2788 vs 0.2896 error |
| Scope & recommendations | [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] | concept | all above | Unbiased trees + sampling without replacement; unaffected if all predictors continuous or same cardinality |

## Notes

- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — CONTAINS: research question, contributions, key-number table, note set, full Source Map (every section, table, figure → note); marketing driver-chart example
- [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] — CONTAINS: Background paragraph-by-paragraph table (all 10 paras: applications survey incl. SNP-SNP, microarray gene selection, rpoB/rifampin, protein interactions vs six methods; scope claim; roadmap); Def. random forest; Def. selection frequency; Def. Gini importance (with Gini gain formula); Def. permutation importance (per-tree OOB formula, scaled vs unscaled); note on scaled importance depending on number of trees; Def. conditional inference tree; Def. `cforest`; Def. bootstrap vs 0.632 subsampling (subagging); example reading the three measures
- [[Strobl 2007 - Null and Power Case Simulation Design]] — CONTAINS: ADEMP table; Def. success criteria for null and power case (monotone separation with relevance); Table 1 predictors (with cutpoint counts); Table 2 response; effect-size/Bayes-error example; protocol steps; marketing placebo-design example
- [[Strobl 2007 - Null and Power Case Results]] — CONTAINS: Results N1-N3 (Figs 1-4); Results P1-P3 (Figs 5-8); full Table 3 (scaled and unscaled); MCSE example; monotonicity of correct-identification rate; 'fool' / 'can also be superior' accuracy claim; full Table 4; accuracy-cost argument; single-run ranking example
- [[Strobl 2007 - Split-Selection Bias in CART Trees]] — CONTAINS: Mechanism 1 (cutpoint multiple testing) with sketch; propagation to Gini, selection frequency, permutation importance; `ctree` unbiasedness; Figure 10; vault root-split reproduction table; high-cardinality marketing features example
- [[Strobl 2007 - Bootstrap-Induced Association]] — CONTAINS: Figure 11; Mechanism 2 (cell counts, $n$-invariance, subsampling fix, Bickel & Ren); relative size of the two mechanisms + final prescription; proof sketch ($\approx$ doubled $\chi^2$); vault reproduction at $n=120,1200$; bootstrapped screening example
- [[Strobl 2007 - C-to-U RNA Editing Application]] — CONTAINS: Cummings & Myers three-species context (only Arabidopsis re-analysed); Def. C-to-U data (876 obs, 43 predictors); Figure 9; seed-repetition advice; split-sample protocol; Table 5; significance example; computation times
- [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] — CONTAINS: Conclusion paras 1-2 (RF reach, small-n-large-p and importance as reasons for popularity); Def. requirement for importance measures; scope statement; six-step recommendations checklist; cost; future work (van der Laan); limitations; later developments; authors' contributions, supplement, funding, acknowledgements (Augustin, Leisch, Tutz, Bühlmann, referees), contributor information; driver-report audit example

## Sources
- [[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]] — full text (Europe PMC markdown), Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25

## See Also
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — follow-up on correlated predictors
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — extrapolation in permutation importance
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — importance across the Rashomon set
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — subsampling-based variable selection
- [[Garden of Forking Paths]] — multiplicity as the shared mechanism
