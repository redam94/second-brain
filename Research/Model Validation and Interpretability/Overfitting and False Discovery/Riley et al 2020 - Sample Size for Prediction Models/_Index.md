---
title: "Index: Riley et al 2020 - Sample Size for Prediction Models"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/sample-size
  - topic/overfitting
parent: "[[../_Index|Overfitting and False Discovery]]"
date_updated: 2026-10-13
concept_count: 7
---

# Riley et al 2020 - Sample Size for Prediction Models

> [!abstract] Routing Summary
> This folder covers Riley et al. (2020, BMJ 368:m441), a guide to the **minimum sample size for developing a regression prediction model** (continuous, binary, time-to-event). It contains 8 notes spanning the critique of the 10 EPV rule, precision criteria (overall risk, MAPE, residual SD), overfitting criteria (shrinkage $S\ge0.9$, optimism $\delta\le0.05$), choosing the anticipated Cox-Snell $R^2$, Box 1 with `pmsampsize` examples, and extensions (subgroups, variable selection, ML, updating), plus the full reference list, supplement map and back matter.
> - Need the paper map or headline numbers? → [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]
> - Need why 10 events per variable is wrong, or how to count candidate parameters (EPP)? → [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]
> - Need the margin-of-error formula for overall risk, the van Smeden MAPE formula, or $234+P$? → [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]]
> - Need $n = P/[(S-1)\ln(1-R^2_{cs}/S)]$ or the optimism version? → [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]
> - Need max($R^2_{cs}$) by prevalence, Nagelkerke $R^2$, or how to pick $R^2_{cs}$? → [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]
> - Need the B1-B4 / T1-T3 / C1-C4 checklist, `pmsampsize` syntax, or the worked examples? → [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]
> - Need guidance on ML data hunger, lasso instability, model updating, or data splitting? → [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]
> - Need to resolve a reference number, find what supplement S1-S6 holds, or check funding, contributors or dates? → [[Riley 2020 - References, Supplements and Back Matter]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Paper overview and source map | [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] | overview | Overfitting; power analysis | Four criteria, take the max; EPP needed ranges 8.5-25.5 in the paper's examples |
| EPP and candidate parameters | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] | definition | Overview | Overfitting depends on all candidate $\beta$s; 10 EPV comes from coefficient-bias simulations |
| Overall-risk precision (B1/T1/C1) | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] | theorem | Margin of error | $n=(1.96/\delta)^2\phi(1-\phi)$; 385 at $\phi=0.5$ |
| MAPE criterion (B2) | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] | theorem | Simulation meta-model | $\ln\text{MAPE}=-0.508-0.544\ln n+0.259\ln\phi+0.504\ln P$; 461 for $\phi=.3,P=10$ |
| Residual SD (C2) | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] | theorem | — | $n=234+P$ for a 10% SD error |
| Shrinkage criterion (B3/T2/C3) | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] | theorem | $R^2_{cs}$ | $n=P/[(S-1)\ln(1-R^2_{cs}/S)]$; 1698 for $P=20$, $R^2_{cs}=0.1$ |
| Optimism criterion (B4/T3/C4) | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] | theorem | max($R^2_{cs}$) | $S=R^2_{cs}/(R^2_{cs}+\delta\max R^2_{cs})$; 1079 example |
| Shrinkage paradox | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] | concept | Shrinkage | Estimated shrinkage least reliable when most needed |
| max($R^2_{cs}$), Nagelkerke | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] | definition | Likelihood | 0.75 / 0.48 / 0.33 / 0.11 at $\phi$ = 0.5 / 0.1 / 0.05 / 0.01 |
| Choosing $R^2_{cs}$ (Fig 4) | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] | algorithm | Existing models | Default $R^2_{Nagelkerke}=0.15$ (0.5 for direct predictors) |
| Box 1 and examples | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] | example | All criteria | 5249 (binary), 5143 (survival), 254 (continuous) |
| Extensions | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] | concept | Box 1 | ML may need more than 10x EPP; intercept updating needs only B1/T1/C1; avoid data splitting |
| References, supplements, back matter | [[Riley 2020 - References, Supplements and Back Matter]] | reference | Overview | Refs 1-78 itemised; S1-S6 citation map; accepted 19 Dec 2019, published 18 Mar 2020 |

## Notes

- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — CONTAINS: research question, contribution, five key findings, section map, full Source Map checklist (all sections, Figs 1-5, Box 1, Examples 1-3), summary table of every numerical example, connections, standfirst motivation, gaps (supplement S1-S6 contents not in PDF).
- [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] — CONTAINS: standfirst motivation (too-small datasets, inaccurate predictions, wrong decisions), introduction (diagnostic vs prognostic models, regression types, supplement S1 pointer, development dataset), all 9 Summary points, effective-sample-size definition, EPV vs EPP definition with candidate-parameter rule and verbatim rationale, history of the 10 EPV rule and counter-proposals (below 10 to 50), 2-per-predictor continuous rule, claim that EPP alone cannot determine adequacy, parameter-counting example, MMM parameter-count illustration.
- [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] — CONTAINS: Step 1 and Fig 1 (binary margin-of-error formula; 385/139/246; exponential survival CI; 2366 person-years example), C1 note, Step 2 and Fig 2 (MAPE definition; van Smeden formula with conditions $\phi\le0.5$, $P\le30$; 461 and 695), C2 $234+P$ with a reconstruction sketch, verification code, marketing illustration.
- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] — CONTAINS: definitions of overfitting and uniform shrinkage, shrinkage paradox (verbatim), Fig 3 formula with proof sketch, 1698 example (EPP 8.5 vs 25.5), signal:noise intuition, continuous 206 example with a discrepancy caveat, optimism definition, Fig 5 formula with proof sketch and 1079 example plus rounding note, condition for when B4 binds, verification code, weekly-MMM parameter-budget table.
- [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] — CONTAINS: $R^2_{cs}$ definition, max($R^2_{cs}$) and Nagelkerke definitions, max($R^2_{cs}$) table with closed-form reconstruction, Fig 4 three-route algorithm (existing models; conversion from C statistic, D, pseudo-$R^2$s; defaults 0.15/0.5), applied examples, conversion-model illustration.
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] — CONTAINS: Box 1 in full (B1-B4, T1-T3, C1-C4, inputs, conservatism, existing-dataset use), software (`pmsampsize` syntax, BeyondEPV), Example 1 pre-eclampsia (5249/263/8.75; B2 544; 3500 with $P=20$; other criteria computed), Example 2 VTE (5143/692/23.1; 3429), Example 3 fat-free mass (254 vs 68; criterion-label inconsistency), reproduction code, reverse-use illustration for 156 weekly rows.
- [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] — CONTAINS: subgroup precision determinants, separation and sparse-data bias, existing-dataset algorithm with blind data reduction (refs 57-58 gloss marked as interpretation), lasso/elastic net caveats and selection instability, ML data-hunger claim (more than 10x EPP; unstable above 200 EPP) with mechanism, three model-updating regimes, conclusion (use more data; representativeness; no data splitting; bootstrap; external validation differs), marketing translations.
- [[Riley 2020 - References, Supplements and Back Matter]] — CONTAINS: publication record (accepted 19 Dec 2019, published 18 Mar 2020, provenance), contributors (RDR/MvS methodology; JE `pmsampsize`), funding, competing interests, patient and public involvement, S1-S6 supplement citation map, full itemised reference list 1-78 with clusters (core methodology 13-16, alternative $R^2$ 39-42, external validation 75-78).

## Sources

- [[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]] — Riley, Ensor, Snell, Harrell, Martin, Reitsma, Moons, Collins & van Smeden, BMJ 2020;368:m441 (13-page PDF including repository cover sheet; journal pp. 1-12).

## See Also

- [[Model Selection and Overfitting]], [[Overfitting and Information Criteria]] — optimism and complexity penalties
- [[Power Analysis and Sample Size]] — sample-size planning for tests
- [[Empirical Bayes Interpretation of Shrinkage]], [[Global-Local Shrinkage Priors]] — shrinkage theory
- [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]] — why candidate parameters and "quick looks" count
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — sibling sources on false discovery
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — instability of selected predictor sets
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — algorithmic vs data models
