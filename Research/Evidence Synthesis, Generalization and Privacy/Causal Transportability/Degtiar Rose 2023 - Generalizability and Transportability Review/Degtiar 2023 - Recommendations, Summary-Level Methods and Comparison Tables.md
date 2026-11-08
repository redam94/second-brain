---
title: "Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 6 Discussion (PDF pp. 21-23) and Appendix: Summary of Methods That Only Require Summary-Level Data (PDF p. 30); comparison tables are vault syntheses of Secs. 4-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Outcome Regression Methods]]"
used_by:
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - Generalizability recommendations
  - Summary-level data generalizability methods
  - Method comparison generalizability transportability
---

# Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables

> [!summary]
> The Discussion gives seven recommendations: define the target, plan for generalization in design, state and test assumptions, quantify dissimilarity (using several metrics), apply at least one generalizability estimator, use all available data, and release code. The Appendix tabulates which estimators remain available when only summary-level data exist. This note adds consolidated comparison tables (a vault synthesis) of every method family by data need, key assumption and failure mode.

## Overview

"Obtaining unbiased estimates for a relevant target population requires applying generalizability or transportability methods in studies that meet required identifiability assumptions. The internal validity of randomized trials is not sufficient to obtain unbiased causal effects; external validity also needs to be considered." Applications span RCT results transported to registry patients and cluster-randomized educational trials generalized to broader geographic areas. When effects are heterogeneous (often), study results may not hold for the target. Approaches to internal-validity bias can be borrowed to improve external-validity methods. The review also notes that improving use of observational data (electronic health databases) can improve inference for policy-relevant populations with reduced bias and improved precision.

## Main Content

### Section 6 recommendations (one by one)

> [!definition] Recommendations for researchers
> 1. **Explicitly define the target population(s)** and identify the study population your study sample is a simple random sample of. It may be hard, and there may be no practically meaningful population representing the study sample, but clarity lets you compare and align. Guide target choice by the decisions the study informs and practical constraints. When combining studies, meta-analyses should specify target populations and address (or rule out) effect heterogeneity. Without transparency about the target, one cannot estimate well-defined effects nor can readers judge generalizability.
> 2. **Plan for generalization in the design**, including generalizability in grant or study objectives. Enroll participants (or set observational inclusion criteria) so the sample represents the target or fully captures effect-modifier heterogeneity. Collect data on likely modifiers associated with participation. Identify and mitigate missingness or selection bias. If possible collect baseline characteristics and outcomes on non-participants in the target; otherwise find external data on the target's modifier composition and align variables.
> 3. **Clearly describe the internal and external validity assumptions**, assess their justifiability, test them where possible and perform sensitivity analyses.
> 4. **Quantify dissimilarity** between study and target using at least one method, ideally several: univariate and joint modifier distributions, differences in participation propensity, and (when target outcomes exist) differences in outcomes between study and target subjects on the same treatment. If differences are found, investigate which subpopulations drive them and whether they have heterogeneous effects. Also check differences in setting, treatment or outcome beyond subject characteristics.
> 5. **Incorporate at least one generalizability or transportability estimator** when target and study differ on modifiers; at minimum assess and describe sources of heterogeneity and whether they are likely to differ for the target.
> 6. **Derive estimates using as much data as possible** (use outcome data in a principled way). Method choice may be restricted by data availability (summary vs individual-level) but should follow the same principles as for confounding adjustment (outcome regression vs matching vs weighting vs double robust; van der Laan and Robins 2003; Neugebauer and van der Laan 2005; van der Laan and Rose 2011). Flexible nonparametric/semiparametric models with ensemble machine learning minimize parametric assumptions and have the potential to perform best (Kern et al. 2016).
> 7. **Release publicly available code** alongside papers and give implementation detail; the lack of computational tools is "a substantial barrier to the adoption of new statistical methods" in this area.
^def-recommendations

### Appendix: methods requiring only summary-level data

| Study data | Target data | Available estimators |
|---|---|---|
| Summary-level (covariate and outcome) | Summary-level (covariate) | **Post-stratification** (Miettinen 1972; Prentice et al. 2005) needing joint distributions or cell counts per stratum; with only study and target means, outcome regressions linear in predictors |
| Summary-level outcome | Summary-level outcome | **Bias-adjusted meta-analysis** (Turner et al. 2009; Greenland 2005) with per-study bias estimates; if stratified by modifiers: Eddy (1989), Prevost, Abrams and Jones (2000); if stratified by participants included vs excluded: **cross-design synthesis** (Begg 1992; Kaizar 2011) |
| Summary-level covariate and outcome | Individual-level covariate and outcome | **Hierarchical Bayesian evidence synthesis** (Verde et al. 2016; Verde 2019) |
| Individual-level covariate and outcome | Summary-level covariate | **Matching with reweighting** (Hartman et al. 2015), Signorovitch et al. (2010) or Phillippo et al. (2018) propensity/outcome-regression approaches; with joint distributions of target summary data: **IPPW** (Cole and Stuart 2010; Westreich et al. 2017) |

The authors' guidance: "Investigators should strive to maximally use the available data and hence use methods that incorporate individual-level data where they are available."

### Consolidated comparison: assessment tools (vault synthesis)

| Tool | Question answered | Data | Section |
|---|---|---|---|
| SMD / univariate tests | do modifier means differ? | summary or individual | 4.1 |
| Generalizability index | do selection-propensity distributions overlap? | individual (both) | 4.1 |
| Extrapolation share (outside 5-95 pct) | how much of the target is outside the study's support? | individual (both) | 4.1 |
| Covariate-shift classifier | can study and target be told apart? | individual (both) | 4.1 |
| Outcome comparison / equivalence tests | do measured modifiers explain outcome differences? | outcomes on same arm in both | 4.2 |
| Sensitivity analysis / bounds | how much would unmeasured modification change results? | assumptions | 4.2 |
| Interaction, tree, BART, global tests | are effects heterogeneous? | individual (study) | 4.3 |

### Consolidated comparison: estimators (vault synthesis)

| Estimator | Models required | Consistent if | Data | Main failure modes |
|---|---|---|---|---|
| Post-stratification | none (strata) | strata capture all modifiers | summary OK | empty strata, coarse strata |
| IPPW / odds weights | selection propensity (and treatment propensity) | selection model correct | individual | extreme weights, high variance, low power for many arms |
| Matching (full / fine balance) | distance metric | balance on all modifiers | individual | metric ignores effect modifiers, unmatched regions |
| Outcome regression (OLS) | outcome with all treatment-by-modifier interactions | outcome model correct | individual (study) + target covariates | extrapolation, no variance inflation |
| BART | flexible outcome | smoothness/prior reasonable | individual | undercoverage under large shift |
| A-IPPW / TMLE / calibration | both | **either** model correct | individual | multiple solutions, out-of-range estimates, MSE worse if both wrong |
| Cross-design synthesis | stratified summaries | constant unmeasured confounding across eligible/ineligible | summary OK | limited strata |
| Calibrated risk-adjusted regression | parametric + selection propensity | observational data overlaps both RCT and target | individual (both) | needs observational overlap |
| Bayesian evidence synthesis | hierarchical with bias term | bias term adequate | summary RCT + individual observational | prior sensitivity |
| Domain-adaptation network | representation + weights | not claimed doubly robust | individual | observational only, black-box |

### Contrast with the graphical papers

| Question | Pearl-Bareinboim | Degtiar-Rose |
|---|---|---|
| Is it possible at all? | transportable iff do-calculus reduction exists; non-transportable regardless of sample size | assumptions B1-B3 plus positivity |
| What formula? | derived from the diagram (e.g. Eqs. 3.1, 3.4, 5.9) | choose among IPPW, outcome regression, A-IPPW |
| Post-treatment differences | explicit (Eq. 3.4, Eq. 14) | mentioned; principal stratification, SUTVA for selection |
| Estimation, variance, finite samples | out of scope ("not addressed") | central |
| Where knowledge enters | selection diagram | choice of $X$, assumptions, sensitivity analysis |

## Examples

> [!example] Applying the seven recommendations to a geo-test rollout (our illustration)
> 1. Target: the 200 rollout DMAs in FY26, spend level as planned, outcome = incremental 8-week revenue.
> 2. Design: the 20 test DMAs were stratified by tier but not by digital share; plan a supplementary cell next quarter.
> 3. Assumptions: B1 requires digital share measured everywhere; B3 flags a creative change between test and rollout (sensitivity analysis planned).
> 4. Dissimilarity: SMDs, selection-score overlap, generalizability index; compare control-arm trends.
> 5. Estimator: normalized A-IPPW plus a BART outcome model as a cross-check.
> 6. Data: also use pre-period observational data from rollout DMAs (outcome regression on controls).
> 7. Share the code.

## Connections

- Individual estimator notes: [[Degtiar 2023 - Weighting and Matching Methods]], [[Degtiar 2023 - Outcome Regression Methods]], [[Degtiar 2023 - Doubly Robust and Combined Methods]].
- Worked simulation comparing four of these: [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].
- Graphical counterpart of the table above: [[Pearl 2014 - Conclusions, Extensions and Limits]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
