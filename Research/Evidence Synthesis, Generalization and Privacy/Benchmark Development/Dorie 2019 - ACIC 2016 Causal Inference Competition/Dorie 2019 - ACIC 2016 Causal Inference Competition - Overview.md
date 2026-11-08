---
title: "Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Whole paper, arXiv:1707.02641v5, pp. 1-41 (Statistical Science 34(1), 2019)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]]"
used_by:
  - "[[Dorie 2019 - Simulation Design and Knobs]]"
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
  - "[[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]"
aliases:
  - ACIC 2016 competition
  - Is Your SATT Where It's At
  - Dorie et al causal inference competition
---

# Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview

> [!summary]
> Dorie, Hill, Shalit, Scott and Cervone ran the 2016 Atlantic Causal Inference Conference data analysis challenge "Is Your SATT Where It's At?": organisers who did not compete generated simulated observational data sets calibrated to real covariates, 30 competitor methods (15 black-box, 15 do-it-yourself) estimated the sample average treatment effect on the treated (SATT), and post-hoc analyses explained performance. The most consistent conclusion is that methods that flexibly model the response surface perform best overall; coverage was hard for almost everyone, and method-by-setting interactions were small.

## Overview

**Research question.** How should applied researchers choose among the explosion of semi- and non-parametric causal inference methods, given that method papers compare few competitors, often with unfair or uncalibrated testing grounds, and suffer a file-drawer effect?

**Design.** A competition with separate designers and submitters, 77 simulation settings built from 58 real covariates (4,802 observations from the Collaborative Perinatal Project), six "knobs", ignorability and overlap-for-the-treated assumed throughout, a continuous outcome and binary treatment. Black-box methods ran on 77 settings x 100 replications = 7,700 data sets; do-it-yourself (DIY) analysts each analysed 20 data sets.

**Key results.**
- Best DIY methods on the 20 DIY data sets by bias and RMSE: the two DR w/GBM+MDIA submissions. Best originally submitted black-box methods: **BART, SL+TMLE, calCause, h2o Ensemble**.
- Most black-box methods had absolute bias and RMSE at or below about 0.05 outcome SDs.
- Original submissions had disappointing **interval coverage**; BART coverage was about 82%, rising to nearly nominal with a TMLE correction; the last nine methods had coverage below 75%.
- Predicting performance from data features: with non-oracle metrics $R^2$ rarely exceeds 0.10 per method; methods account for 37% of variance in log absolute bias, settings only 5%.
- Flexible nonparametric response-surface modelling explains most between-method differences.

## Main Content

### Source Map

| Paper section | Pages | Content | Covered in |
|---|---|---|---|
| Abstract, 1 Introduction | 1-2 | Aims, headline finding | This note |
| 2 Motivation (2.1 shortcomings, 2.2 how the competition responds) | 2-5 | Few and unfair comparisons, uncalibrated testing grounds, constructed observational studies, file drawer | [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]] |
| 3 Notation and assumptions (3.1-3.3) | 5-6 | Potential outcomes, SATE/SATT/SATC, ignorability, overlap, parametric assumptions | [[Dorie 2019 - Estimands, Ignorability and Design Choices]] |
| 4.1 Embedded assumptions and design choices | 7 | Ignorability, estimand SATT, overlap for the inferential group, simulate Z and Y | [[Dorie 2019 - Estimands, Ignorability and Design Choices]] |
| 4.2 Calibration to real data | 8 | Collaborative Perinatal Project; 4,802 obs, 58 covariates | [[Dorie 2019 - Simulation Design and Knobs]] |
| 4.3 Simulation procedure and knobs | 8-11 | Factorisation, generalised additive functions, six knobs with oracle metrics | [[Dorie 2019 - Simulation Design and Knobs]] |
| 4.4 Issues not addressed | 11-12 | Non-binary treatment, non-continuous response, non-iid, size, measurement error, violated assumptions | [[Dorie 2019 - Estimands, Ignorability and Design Choices]] |
| 4.5 Logistics | 12 | Announcement April 21, 2016 | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| 5.1-5.2 Features, submissions, Table 1 | 12-16 | Method taxonomy | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| 5.3 Top performers | 16-17 | BART, SL+TMLE, calCause, h2o, DR w/GBM+MDIA | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| 5.4 Post-competition methods | 17-18 | Nine added methods | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| 6 Evaluation (6.1 DIY, 6.2 black box), Figs. 1-3 | 18-22 | RMSE, bias, coverage, interval length, PEHE, run time | [[Dorie 2019 - Evaluation Metrics and Results by Method]] |
| 7 Predicting performance (7.1-7.3) | 23-24 | 25 metrics; regressions; multilevel decomposition | [[Dorie 2019 - Predicting Performance and Variance Decomposition]] |
| 8 Discussion | 24-25 | Four themes | [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]] |
| References | 25-28 | Citation list | Cited inline |
| A.1 Simulation framework, Table 2 | 28-31 | 77 settings enumerated | [[Dorie 2019 - Simulation Design and Knobs]] |
| A.2 Glossary, Tables 3-4 | 31-34 | DIY and black-box method descriptions | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| A.3 Extra DIY results, Figs. 4-5 | 34-35 | Coverage, interval length, PEHE on DIY | [[Dorie 2019 - Evaluation Metrics and Results by Method]] |
| A.4 Explaining variance, Tables 5-6 | 35-38 | Regression $R^2$ and variance components | [[Dorie 2019 - Predicting Performance and Variance Decomposition]] |
| A.5 Metrics list | 38-39 | 25 oracle and non-oracle metrics | [[Dorie 2019 - Predicting Performance and Variance Decomposition]] |
| A.6 Submissions and acknowledgements | 39-41 | Submitter list | [[Dorie 2019 - Submitted Methods and Taxonomy]] |
| (Python illustration) | n/a | Toy ACIC-style simulation | [[Dorie 2019 - Toy ACIC-Style Simulation in Python]] |

> [!definition] Competition structure
> | Component | Black-box (BB) | Do-it-yourself (DIY) |
> |---|---|---|
> | Submissions | 15 received (a near-duplicate BART submission dropped; Table 1 lists 15 black-box rows including the organisers' linear-model baseline) | 15 received; the text says two were omitted for inadequate description, while Table 1 lists 15 DIY rows (including two DR w/GBM+MDIA variants); the counts as printed do not reconcile exactly |
> | Data | 77 settings x 100 replications = 7,700 data sets | 20 data sets (one per DIY setting #1-20 in Table 2) |
> | Who runs the method | Organisers run submitted code | Competitor analyses data themselves |
> | Metrics reported in body | RMSE, bias, coverage, interval length, PEHE, run time | RMSE, bias (coverage and PEHE in App. A.3) |
^def-competition-structure

## Examples

See [[Dorie 2019 - Toy ACIC-Style Simulation in Python]] for a runnable miniature of the design and its qualitative finding.

## Connections

- **Existing vault note.** Constructed observational studies (experiment as benchmark for observational methods) are the alternative design the authors discuss; the advertising version is in [[Experimental Benchmarks for Observational Ad Measurement]] and [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]. Dorie et al. note the weakness: one DGP per constructed study, unknown ignorability, and no yardstick for "close enough."
- **Benchmark methodology.** The competition addresses several lottery mechanisms from [[Dehghani 2021 - The Benchmark Lottery - Overview]]: broad method set, separate designers, no leaderboard feedback, public code.
- **Documentation.** Released simulation code plays the role of a datasheet: [[Gebru 2021 - Datasheets for Datasets - Overview]].
- **Simulation methodology.** ADEMP framing: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Related causal methods.** [[Potential Outcomes Framework]], [[Causal Estimands]], [[Nonparametric Causal Inference]], [[Propensity Score Matching - Overview]].

## See Also

- [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]]
- [[Dorie 2019 - Evaluation Metrics and Results by Method]]
- [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]
