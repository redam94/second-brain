---
title: "Index: Dorie 2019 - ACIC 2016 Causal Inference Competition"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 8
---

# Dorie 2019 - ACIC 2016 Causal Inference Competition

> [!abstract] Routing Summary
> This folder fully captures Dorie, Hill, Shalit, Scott and Cervone (2019), *Automated versus Do-It-Yourself Methods for Causal Inference: Lessons Learned from a Data Analysis Competition* (Statistical Science 34(1); arXiv:1707.02641v5): the motivation, estimand and assumptions, the 77-setting simulation design with six knobs and Table 2, the method taxonomy and top performers, RMSE/bias/coverage/PEHE/run-time results, the variance-decomposition analysis and the lessons, plus a runnable toy simulation. It contains 8 notes.
> - Need the paper on one page or the section-to-note map? -> [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
> - Need why method comparisons in papers are biased and how the competition responds? -> [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]]
> - Need SATT, ignorability, overlap, the design restrictions and scope limits? -> [[Dorie 2019 - Estimands, Ignorability and Design Choices]]
> - Need the data-generating process, knob definitions, oracle metrics, or Table 2 (all 77 settings)? -> [[Dorie 2019 - Simulation Design and Knobs]]
> - Need Table 1, descriptions of BART, SL+TMLE, calCause, h2o, DR w/GBM+MDIA, or the post-competition variants? -> [[Dorie 2019 - Submitted Methods and Taxonomy]]
> - Need the metric definitions and results (bias, RMSE, coverage, PEHE, time)? -> [[Dorie 2019 - Evaluation Metrics and Results by Method]]
> - Need the regression and variance-component analysis (Tables 5-6)? -> [[Dorie 2019 - Predicting Performance and Variance Decomposition]]
> - Need the lessons and a marketing-measurement application? -> [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]
> - Need runnable code that mimics the design? -> [[Dorie 2019 - Toy ACIC-Style Simulation in Python]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| ACIC 2016 competition | [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] | overview | none | 30 methods, 77 settings, 7,700 data sets |
| Shortcomings of method comparisons | [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]] | concept | Overview | few/unfair comparisons, uncalibrated testbeds, file drawer |
| SATT; strong ignorability | [[Dorie 2019 - Estimands, Ignorability and Design Choices]] | definition | Motivation | overlap needed only for the treated |
| Simulation DGP and knobs | [[Dorie 2019 - Simulation Design and Knobs]] | definition | Estimands | 6 knobs, 216 combinations reduced to 77 |
| Table 2 settings | [[Dorie 2019 - Simulation Design and Knobs]] | example | knobs | 20 DIY sets and 57 additional settings |
| Method features and top performers | [[Dorie 2019 - Submitted Methods and Taxonomy]] | concept | Knobs | BART, SL+TMLE, calCause, h2o, DR w/GBM+MDIA |
| Performance metrics and results | [[Dorie 2019 - Evaluation Metrics and Results by Method]] | theorem | Taxonomy | bias/RMSE at most about 0.05 SD for most; BART coverage about 82% |
| Variance decomposition | [[Dorie 2019 - Predicting Performance and Variance Decomposition]] | theorem | Results | methods 37%, settings 5%, interaction 4% of log absolute bias variance |
| Lessons learned | [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]] | concept | all | flexible response surface; coverage is hard |
| Toy simulation | [[Dorie 2019 - Toy ACIC-Style Simulation in Python]] | example | knobs, results | flexible RA RMSE 0.068 vs OLS 0.394 |

## Notes

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] — CONTAINS: research question, design, key results, full Source Map (sections, tables, figures, appendices), competition structure.
- [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]] — CONTAINS: four shortcomings; competition responses; leaderboard note; metric-choice example.
- [[Dorie 2019 - Estimands, Ignorability and Design Choices]] — CONTAINS: potential outcomes notation; SATE/SATT/SATC; ignorability and overlap definitions; rationale for each design restriction; Sec. 4.4 scope limits; SATT-overlap example.
- [[Dorie 2019 - Simulation Design and Knobs]] — CONTAINS: real-data calibration; DGP factorisation; six knobs with oracle-metric ranges; alignment discussion; Table 2 with all 77 settings; counts by level.
- [[Dorie 2019 - Submitted Methods and Taxonomy]] — CONTAINS: ten-feature taxonomy; Table 1 transcribed; top-performer descriptions; nine post-competition methods; glossary of all other methods; submitter list.
- [[Dorie 2019 - Evaluation Metrics and Results by Method]] — CONTAINS: metric definitions; DIY results; black-box results; coverage repairs; PEHE; run times; family summary.
- [[Dorie 2019 - Predicting Performance and Variance Decomposition]] — CONTAINS: 25-metric list; Table 5 transcribed; Table 6 transcribed with variance shares; model-by-model findings; arithmetic example and code.
- [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]] — CONTAINS: four lessons; practical guidance; marketing simulation-benchmark design.
- [[Dorie 2019 - Toy ACIC-Style Simulation in Python]] — CONTAINS: tested numpy code; observed output; code-to-concept map.

## Sources
- Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference — Dorie V, Hill J, Shalit U, Scott M, Cervone D (2019), Statistical Science 34(1); arXiv:1707.02641v5 (41 pages), the sole source. Figures 1-5 are plots without tabulated values; only text-stated values are reproduced.

## See Also
- [[Experimental Benchmarks for Observational Ad Measurement]] — constructed observational studies in advertising, the alternative benchmark design.
- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] — experimental benchmark for observational estimators.
- [[Dehghani 2021 - The Benchmark Lottery - Overview]] — lottery mechanisms the competition mitigates.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — how to plan and report simulation studies.
- [[Potential Outcomes Framework]], [[Causal Estimands]], [[Nonparametric Causal Inference]].
