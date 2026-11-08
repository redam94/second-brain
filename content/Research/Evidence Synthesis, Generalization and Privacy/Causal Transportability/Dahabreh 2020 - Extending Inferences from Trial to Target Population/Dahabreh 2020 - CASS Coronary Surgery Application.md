---
title: "Dahabreh 2020 - CASS Coronary Surgery Application"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Sec. 7, pp. 11-13, Tables 4-5, Figure 1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
used_by:
  - "[[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]"
aliases:
  - "Coronary Artery Surgery Study transportability analysis"
---

# Dahabreh 2020 - CASS Coronary Surgery Application

> [!summary]
> Re-analysis of the Coronary Artery Surgery Study (CASS), a randomized trial nested in a cohort of 2099 eligible patients (780 randomized, 1319 declined), estimating 10-year mortality for surgery versus medical therapy among *non-participants*. All six estimators agree with each other and with the trial-only result because participants and non-participants were similar on measured covariates.

## Overview
Design is nested (Sec. 2.2). Of 2099 eligible patients, 780 consented to randomization and 1319 declined; six patients were excluded for consistency with prior CASS analyses, leaving 2093. Complete covariate data: 1686 patients — 731 randomized (368 surgery, 363 medical) and 955 non-randomized (430 surgery, 525 medical). Only complete cases are reported "for simplicity". Outcome: 10-year all-cause mortality risk (cumulative incidence; no censoring in the first 10 years).

## Main Content

### Models
Logistic regression working models for the outcome, trial participation and treatment, each with: age, severity of angina, history of MI, % obstruction of the proximal left anterior descending (LAD) artery, left-ventricular wall motion score, number of diseased vessels, and ejection fraction. Age and ejection fraction used restricted cubic splines (5 knots). Covariates chosen from prior CASS outcome-model work; the same set was used in every model. Intervals: 10,000-sample non-parametric percentile bootstrap.

### Baseline covariates

> [!example] Table 4 - baseline covariates, mean (SD) or n (%)
> | Variable | Level | Non-randomized, surgery (430) | Non-randomized, medical (525) | Randomized, surgery (368) | Randomized, medical (363) |
> |---|---|---|---|---|---|
> | Age, years | | 51.3 (7.7) | 50.6 (7.8) | 51.4 (7.2) | 50.9 (7.4) |
> | Angina | None | 70 (16.3%) | 125 (23.8%) | 83 (22.6%) | 81 (22.3%) |
> | | Present | 360 (83.7%) | 400 (76.2%) | 285 (77.4%) | 282 (77.7%) |
> | History of MI | No | 194 (45.1%) | 212 (40.4%) | 159 (43.2%) | 135 (37.2%) |
> | | Yes | 236 (54.9%) | 313 (59.6%) | 209 (56.8%) | 228 (62.8%) |
> | LAD % obstruction | | 48.2 (39.8) | 31.7 (36.2) | 36.4 (38.0) | 34.9 (37.0) |
> | Left ventricular score | | 7.1 (2.7) | 7.1 (2.7) | 7.4 (2.9) | 7.3 (2.8) |
> | Diseased vessels | 0 | 113 (26.3%) | 234 (44.6%) | 146 (39.7%) | 133 (36.6%) |
> | | $\ge1$ | 317 (73.7%) | 291 (55.4%) | 222 (60.3%) | 230 (63.4%) |
> | Ejection fraction, % | | 60.2 (12.0) | 60.1 (12.5) | 60.9 (13.0) | 59.8 (12.8) |
>
> Note the confounding by indication *within* the non-randomized group (e.g., mean LAD obstruction 48.2 vs 31.7 by chosen treatment), which is why non-participants' own treatment-outcome data are not used. ^tbl-cass-covariates

> [!example] Table 5 - 10-year mortality, risk difference and risk ratio (95% bootstrap CI)
> | Estimator | Risk, surgery | Risk, medical | Risk difference | Risk ratio |
> |---|---|---|---|---|
> | Trial-only | 17.4% (13.6, 21.4) | 20.4% (16.3, 24.6) | -3.0% (-8.7, 2.7) | 0.85 (0.62, 1.15) |
> | OM | 18.9% (13.9, 22.7) | 20.1% (15.9, 24.5) | -1.3% (-7.9, 4.2) | 0.94 (0.65, 1.24) |
> | IOW1 | 18.2% (13.9, 22.7) | 20.1% (15.9, 24.4) | -1.9% (-7.8, 4.2) | 0.91 (0.66, 1.24) |
> | IOW2 | 18.2% (14.6, 23.5) | 20.1% (16.0, 24.4) | -1.9% (-7.2, 4.8) | 0.91 (0.69, 1.28) |
> | DR1 | 18.7% (14.5, 23.3) | 20.1% (16.0, 24.4) | -1.4% (-7.3, 4.7) | 0.93 (0.68, 1.27) |
> | DR2 | 18.7% (14.5, 23.3) | 20.1% (16.0, 24.4) | -1.4% (-7.3, 4.7) | 0.93 (0.68, 1.27) |
> | DR3 | 18.7% (14.4, 23.2) | 20.0% (15.9, 24.3) | -1.4% (-7.3, 4.6) | 0.93 (0.68, 1.27) |
>
> Row "Trial-only" is the unadjusted trial estimate (effect among participants); all others target non-participants. ^tbl-cass-results

### Diagnostics (Figure 1)
Figure 1 plots kernel densities of the estimated participation probability (participants vs non-participants; horizontal axis spans roughly 0.2 to 0.6, i.e., far from zero, with similar distributions in both groups) and of the estimated weights for participants (horizontal axis runs to about 8). The positivity diagnostic — (non-participant fraction) ÷ (mean inverse odds among participants) — was about **1.001** (target 1). Post-weighting covariate balance is in Appendix Section E (not in the PDF).

## Examples

### Interpretation
- Estimates are in the same range across OM, IOW and DR, "suggesting that findings are not driven by model specification decisions".
- Target-population effect estimates (-1.3 to -1.9 pp) are slightly closer to zero than the trial-only -3.0 pp, but every interval overlaps and covers 0.
- Intervals for target-population estimates are wider than naive because the target outcome is *predicted*, not observed; running the analysis is "necessary to obtain proper estimates of uncertainty" even when the point estimates barely move.
- Differences would be "more striking when the covariate distributions are more different and in the presence of strong effect modification by measured variables".

## Connections
Illustrates the practical checklist from [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]: participation-probability overlap, weight distribution, positivity identity near 1, post-weighting balance.

## See Also
- [[Dahabreh 2020 - Simulation Study of Estimators]]
- [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]
