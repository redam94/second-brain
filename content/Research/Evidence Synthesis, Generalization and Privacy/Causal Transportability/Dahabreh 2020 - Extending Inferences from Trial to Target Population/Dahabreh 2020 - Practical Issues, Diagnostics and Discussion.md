---
title: "Dahabreh 2020 - Practical Issues, Diagnostics and Discussion"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Secs. 8-9, pp. 14-17"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Identifiability Conditions and Identification]]"
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
used_by:
  - "[[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]"
aliases:
  - "positivity diagnostic for trial participation"
  - "sensitivity analysis and covariate selection for transportability"
---

# Dahabreh 2020 - Practical Issues, Diagnostics and Discussion

> [!summary]
> Practical guidance on the untestable exchangeability assumption (sensitivity analysis), covariate selection, flexible modelling with cross-fitting, positivity violations, and weight diagnostics, followed by the paper's discussion and recommendation of doubly robust estimators with normalized weights.

## Overview
All methods depend "critically" on conditional mean exchangeability over $S$. Where it fails, results have no causal interpretation.

## Main Content

### 8.1 Violations of exchangeability
Not testable. Explore how conclusions change under assumed violations, using sensitivity methods adapted from missing data / unmeasured confounding (refs [54]-[56]). A companion paper (ref. [56]) gives easy-to-implement sensitivity estimators built on the estimators of Sec. 5 that do not require detailed knowledge of the unmeasured variables.

### 8.2 Covariate selection
> [!note] Which covariates go where
> - Any subset of covariates satisfying exchangeability over $S$ is admissible.
> - For potential-outcome **means**: outcome predictors that also predict participation belong in both the outcome and participation models.
> - Outcome predictors *unrelated* to participation: include in the outcome model; they usually reduce variance of OM/DR.
> - Strong predictors of participation *unrelated* to outcome: including them in the participation model **raises variance** of IOW/DR without improving transportability.
> - For the **ATE** only: only effect modifiers (on the mean-difference scale) need modelling (refs [12],[8]). Because knowledge of effect modification is limited, it is "probably best to include as many outcome predictors as possible".

### 8.3 Model specification
- Check specification via **covariate balance**: compare the post-weighting covariate distribution in participants with the unweighted distribution in non-participants.
- Use flexible parametric models (splines, interactions) or semi/non-parametric/ML models. With slow-converging nuisance estimators, DR estimators remain $\sqrt n$-consistent even when the outcome or participation estimators converge more slowly than $\sqrt n$ (refs [60],[59]; the usual sufficient condition in that literature is that the product of the two nuisance error rates is $o(n^{-1/2})$ — standard double-machine-learning background, not stated in this paper); combine with **cross-fitting** (sample splitting) to curb overfitting bias.
- Fit separate outcome models per arm (equivalent to full treatment×covariate interactions).
- Specification is a bias-variance trade-off; formal search may be needed when many covariates must be modelled. In composite (non-nested) datasets, few shared covariates are measured, so specification is rarely the pressing problem — but that raises concerns about exchangeability itself.

### 8.4 Positivity violations and variable weights
- Ensure the target sample meets trial eligibility criteria (e.g., if the trial excluded age ≥85, apply the same restriction to the target sample).
- When positivity fails: IOW is inconsistent; OM and DR rely heavily on outcome-model extrapolation.
- Always inspect the distribution of estimated participation probabilities (near zero is a warning), even for OM.
- Inspect IO weight distribution for extreme values.

> [!definition] Positivity / weight diagnostic
> $$\Big(\sum_{i=1}^n(1-S_i)\Big)^{-1}\sum_{i=1}^n S_i\,\frac{1-p(X_i;\hat\beta)}{p(X_i;\hat\beta)}\;\approx\;1.$$ In words: the summed inverse odds of participation over trial participants should reproduce the number of non-participants (the paper phrases it as the sample proportion of non-participants divided by the average inverse odds). Rationale: $E\big[S\cdot\Pr[S=0\mid X]/\Pr[S=1\mid X]\big]=\Pr[S=0]$. Values far from 1 suggest positivity violations or misspecification of the participation model. ^def-positivity-diagnostic

Trimming or truncating extreme weights may help but "shift the causal estimand", often undesirable; better to fix modelling choices and the target sample.

### 9 Discussion
- Main challenge: collecting covariates in both trial and target adequate for exchangeability over $S$; use substantive knowledge, DAGs and graphical identification algorithms (refs [64]-[66]) and sensitivity analysis.
- Prior work mostly used weighting [6, 11, 14] or stratification [8-10]; exceptions: an estimator close to DR1 (ref. [12]) and targeted maximum likelihood (ref. [13]).
- Why combine models: (i) double robustness gives "two opportunities for approximately correct inference"; (ii) DR estimators are often more precise than weighting-only ones, even with a misspecified outcome model.
- **Recommendation**: avoid unnormalized weighted estimators.
- Limitations/future work: flexible estimation; behaviour under misspecification; estimators more robust to outcome-model misspecification (refs [70],[71]); assumed perfect adherence, no missing outcomes and no measurement error. Adherence adjustment (IPW), censoring, and measurement error can be layered in "modularly".

## Examples

> [!example] Applying the checklist to a lift study
> 1. List markets in the target (all DMAs) and shared covariates $X$.
> 2. Fit $p(X)$ = P(market in test | X). Plot its overlap; flag target markets with $p\approx0$.
> 3. Compute the weight-sum diagnostic; compare to 1.
> 4. Compute OM, normalized IOW, DR2; compare with the test-only estimate.
> 5. Re-run with a plausible sensitivity bias for unmeasured effect modifiers.

## Connections
Positivity is the "overlap" condition also discussed in [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] (normalized differences, rule of thumb 1/4).

## See Also
- [[Dahabreh 2020 - Identifiability Conditions and Identification]]
- [[Dahabreh 2020 - Simulation Study of Estimators]]
- [[Dahabreh 2020 - CASS Coronary Surgery Application]]
