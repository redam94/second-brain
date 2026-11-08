---
title: "Degtiar Rose 2023 - Generalizability and Transportability Review - Overview"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/overview
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Annual Review of Statistics and Its Application (2023); arXiv 2102.11904v1, whole paper incl. Appendix (30 pp.)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]"
used_by:
  - "[[Degtiar 2023 - Populations, Estimands and External Validity Bias]]"
  - "[[Degtiar 2023 - Identifying Assumptions]]"
  - "[[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]]"
  - "[[Degtiar 2023 - Testing Treatment Effect Heterogeneity]]"
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Outcome Regression Methods]]"
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
  - "[[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]"
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - Degtiar and Rose review
  - Generalizability and transportability review
  - A Review of Generalizability and Transportability
---

# Degtiar Rose 2023 - Generalizability and Transportability Review - Overview

> [!summary]
> Degtiar and Rose give a potential-outcomes-based framework for **external validity bias**: define the target population and the population average treatment effect (PATE), state the identifying assumptions (internal validity plus external validity), quantify how far study and target populations differ and whether effects are heterogeneous, and then apply a weighting/matching, outcome-regression or doubly robust estimator to move the study estimate to the target. The review also covers methods that combine randomized and observational data and those requiring only summary-level data. The core message: internal validity of an RCT is not enough; both internal and external validity are needed for unbiased effects in a target population.

## Overview

**Research question.** How can causal effect estimates from a study (randomized or observational) be generalized (study population is a subset of the target) or transported (study population is at least partly external to the target) to a target population when effect modifiers have different distributions?

**Why a review.** Prior reviews were narrower: only RCT-to-target (Stuart et al.; Kern et al.; Tipton and Olsen; Ackerman et al.), identifiability but not estimation (Bareinboim and Pearl 2016), summary-level meta-analysis (Verde and Ohmann; Kaizar), or combining randomized and observational data with a simulation study (Colnet et al. 2020). This paper covers the full range of methods across statistics, epidemiology, computer science and economics, techniques for evaluating generalizability, and recommendations. Reporting guidelines (CONSORT, RECORD, STROBE) recognize the importance of describing generalizability but give no tests or estimation procedures.

**Framework (Fig. 2).** Estimand $\to$ Assumptions $\to$ Evaluating generalizability (is there effect modification? do modifiers differ in distribution?) $\to$ Generalizability and transportability methods.

**Headline decomposition.** If the focus is subject-characteristic differences, external validity bias arises solely from (1) variation in the probability of enrollment in the study, (2) heterogeneity in treatment effects, and (3) the correlation between (1) and (2) (Olsen et al. 2013).

## Main Content

### Source Map

| Paper section | PDF pages | Content | Covered in |
|---|---|---|---|
| Abstract; 1. Background | 1-4 | target/study/analysis populations (Fig. 1), generalizability vs transportability, internal vs external validity, four sources of external-validity bias, design solutions, framework (Fig. 2), literature gap | [[Degtiar 2023 - Populations, Estimands and External Validity Bias]] |
| 2. Estimand | 5-6 | notation, PATE $\tau$, SATE $\tau_s$, PCATE $\tau_x$, PATT, Fig. 3 | [[Degtiar 2023 - Populations, Estimands and External Validity Bias]] |
| 3.1-3.2 Assumptions | 6-7 | internal validity (exchangeability, positivity, SUTVA); external validity (selection exchangeability, selection positivity, SUTVA for selection) | [[Degtiar 2023 - Identifying Assumptions]] |
| 3.3 Transportability | 7-8 | modifications for transport; SEM/graphical counterpart | [[Degtiar 2023 - Identifying Assumptions]] |
| 4.1 Dissimilarity: baseline characteristics | 8-9 | SMD, generalization score, generalizability index, covariate-shift classifier | [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]] |
| 4.2 Dissimilarity: outcomes | 9-10 | outcome comparisons, equivalence tests, sensitivity analysis | [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]] |
| 4.3 Testing for treatment effect heterogeneity; failing generalizability | 10-12 | subgroup tests, data-driven subgroup discovery, global tests, paths forward | [[Degtiar 2023 - Testing Treatment Effect Heterogeneity]] |
| 5 intro; 5.1 Weighting and matching | 12-16 | matching, post-stratification, IPPW, odds weights, propensity strata | [[Degtiar 2023 - Weighting and Matching Methods]] |
| 5.2 Outcome regression | 16-18 | OLS, BART, meta-analytic and Bayesian synthesis, hierarchical Bayesian evidence synthesis | [[Degtiar 2023 - Outcome Regression Methods]] |
| 5.3 Combined propensity and outcome regression | 18-21 | TMLE, A-IPPW, calibration, domain adaptation, cross-design synthesis, calibrated risk-adjusted regression | [[Degtiar 2023 - Doubly Robust and Combined Methods]] |
| 6. Discussion | 21-23 | recommendations, code release, conclusion | [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]] |
| Appendix | 30 | summary-level-data-only methods | [[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]] |
| Acknowledgments, References | 23-29 | funding, reference list | cited inline |
| (added) marketing worked example | n/a | simulated geo-test transport with four estimators | [[Degtiar 2023 - Marketing Application Transporting Experiment Results]] |

### Key vocabulary at a glance

| Term | Meaning in the paper |
|---|---|
| Generalizability | study population is a subset of the target population |
| Transportability | study population is at least partly external to the target |
| Internal validity | estimate unbiased for the effect in the population the sample simple-randomly represents (vertical move in Fig. 1) |
| External validity | the internally valid estimate is unbiased for the effect in a different setting (lateral move in Fig. 1) |
| PATE / SATE / PCATE | population / sample / conditional average treatment effect |
| IPPW | inverse probability of participation weighting (Horvitz-Thompson-like) |
| A-IPPW | augmented IPPW (doubly robust) |

## Examples

Illustration used by the authors: a cancer RCT with no African American participants. The *target sample* is the clinic's patients; the *study sample* is the trial's enrollees; the *study population* is the hypothetical population those enrollees represent (which includes no African Americans). Dropout of patients with severe adverse events creates an *analysis sample* of those without severe side effects. A physician applying the trial to their patients is moving laterally in Fig. 1 and incurs external validity bias; Chen and Wong (2018) show African Americans are widely underrepresented in cancer RCTs.

## Connections

- Graphical, identification-only counterpart: [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]], [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]. The review says the corresponding SEM assumptions "have also been derived" (Pearl and Bareinboim 2014; Pearl 2015; Bareinboim and Pearl 2016; Correa, Tian and Bareinboim 2018).
- Potential-outcomes background: [[Potential Outcomes Framework]], [[Causal Estimands]].
- Weighting machinery familiar from [[Bayesian Inverse Probability Weighting]] and [[Propensity Score Matching - Overview]] (here the propensity is of *selection into the study*, not of treatment).
- Marketing: geo and lift experiments are RCTs on a convenience set of markets; the review's framework tells you how to move their result to the markets you will actually spend in. See [[Degtiar 2023 - Marketing Application Transporting Experiment Results]], [[Geo-Experiment Methodology - Overview]].

## See Also

- [[Hierarchical Models]] (multilevel regression and post-stratification is one of the review's pooling devices)
- [[Instrumental Variables and Principal Stratification]] (principal stratification for post-treatment differences, cited in Sec. 5.1.2)
- Sibling sources in this cluster: [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]] (identification and doubly robust estimation for trial-to-target inference) and [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] (site selection bias, marketing implications).
