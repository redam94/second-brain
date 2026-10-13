---
title: SR 11-7 - Applying Model Risk Management to Marketing Analytics
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/marketing-analytics
  - type/application
  - type/example
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "Applied interpretation (not source text) of SR 11-7 §III pp. 3-5, §IV pp. 5-8, §V pp. 9-16, §VI pp. 16-21; every quoted phrase is from the cited page"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Model Risk Management Guidance - Overview]]"
  - "[[SR 11-7 - Model Definition, Model Risk and Effective Challenge]]"
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
  - "[[SR 11-7 - Outcomes Analysis and Back-Testing]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
used_by:
  - "[[NIST AI RMF 1.0 - Overview]]"
aliases:
  - SR 11-7 for Marketing Models
  - Model Risk Management for Media Mix Models
  - Marketing Model Validation Gate
---

# SR 11-7 - Applying Model Risk Management to Marketing Analytics

> [!summary]
> SR 11-7 is bank supervision, but none of its definitions are bank-specific: media-mix models, attribution models, key-driver models and budget optimisers all "process input data into quantitative estimates" that drive spending, so they are models under SR 11-7. The hard part is that the quantities marketing models are bought for — incremental contribution, ROI, driver "importance" — are **counterfactual and never observed**, so SR 11-7's strongest tool (outcomes analysis) cannot validate them directly. This is the situation SR 11-7 anticipates with "limited ability to use key model validation tools like back-testing" (p. 15): more scrutiny of limitations plus compensating controls. For marketing the controls are (a) **known-truth simulation** of the full pipeline, (b) **experiments as benchmarks**, (c) **pre-registered acceptance criteria**, and (d) an **independent validation gate**. This note gives an element-by-element mapping, three governance devices, generic red flags and a worked acceptance protocol. It is an applied interpretation, not SR 11-7 text.

## Overview

Every marketing-measurement model has the three SR 11-7 components ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-model]]): input (spend, impressions, KPI, controls), processing (the regression/Bayesian model, the feature-attribution method) and reporting (ROI tables, contribution charts, driver rankings, optimiser recommendations). Both sources of model risk apply: **fundamental error** (misspecified carryover, collinearity, spurious trends — [[Granger 2003 - Spurious Regression and Cointegration - Overview]]) and **misuse** (a forecasting model's feature importances reported as causal "impact" — [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]]).

## Main Content

### Why marketing models are a hard case

For a sales *forecast*, outcomes analysis works as SR 11-7 intends ([[Forecast Evaluation and Backtesting]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]). But a model can back-test well on total sales while attributing those sales to the wrong channels — collinear spend, shared trends and seasonality let many decompositions fit equally well ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]). Forecast validity therefore does not imply attribution validity: SR 11-7's use-specific quality dimensions ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-model-quality]]) must be checked separately for each intended use.

### Element-by-element mapping

| SR 11-7 element | Marketing-analytics translation |
|---|---|
| Statement of purpose (§IV p. 5) | Declare the decision supported (forecast? allocate budget? rank drivers?). A model valid for forecasting is not thereby valid for attribution |
| Alternatives (§IV p. 6; §V.1 p. 11) | Compare specifications (adstock/saturation forms, priors, variable sets): [[MMM Model Selection and Application]], [[Bayesian Estimation and Priors for MMM]] |
| Data relevance, proxies (§IV p. 6) | Spend vs impressions as exposure proxies; KPI definitions; whether weekly data with roughly 52-156 rows can support the parameter count ([[Riley et al 2020 - Sample Size for Prediction Models - Overview]]) |
| Conceptual soundness of reporting (§V.1 p. 11) | Do importance measures mean what reports say? [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] |
| Sensitivity analysis (§V.1 p. 11) | Prior sensitivity ([[Influence of Likelihood and Prior]]), perturbed hyperparameters, dropping one channel, resampling stability ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]); "unexpectedly large changes in outputs" in ROIs flag instability |
| Stress testing (§V.1 p. 11) | Behaviour at spend levels outside history; known-truth simulation with realistic collinearity ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) |
| Process verification (§V.2 p. 12) | Version control and tests for modelling code ([[Modeling as Software Development]]); spreadsheet post-processing is "particularly prone to model risk" |
| Override analysis (§V.2 p. 13) | Track how often analysts hand-adjust ROIs or rankings before delivery; frequent or consistently helpful overrides signal model failure |
| Benchmarking (§V.2 p. 13) | Geo or user-level experiments ([[Geo-Experiment Methodology - Overview]], [[Experimental Benchmarks for Observational Ad Measurement]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]]) — with SR 11-7's caveat that "The benchmark itself is an alternative prediction" and agreement can give "a false degree of comfort" |
| Back-testing (§V.3 p. 14) | Rolling-origin forecasts of the KPI on periods not used in fitting, at the decision horizon; necessary but not sufficient for attribution |
| Parallel outcomes analysis (§V.3 p. 14) | A re-specified model must beat the current one on realised outcomes before replacing it |
| Limited back-testing (§V.3 p. 15) | Attribution estimands are unobservable → disclose to decision makers; compensating controls |
| Vendor models (§V pp. 15-16) | Black-box attribution/optimisation tools and platform lift studies: validate own use, own outcomes ([[SR 11-7 - Validation of Vendor and Third-Party Models]]) |
| Aggregate model risk (§III p. 4) | Many per-segment models from one pipeline on one data feed share failure modes; validate the pipeline, not only a sample of outputs |
| Model inventory (§VI p. 20) | Each variant warranting separate validation (per brand, region, KPI) is its own entry; record discarded variants |
| Documentation (§VI p. 21) | A stranger must understand how the model works, its limitations and key assumptions |

### Three governance devices

1. **A validation gate.** Following [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^thm-validation-gate]], no model output reaches a budget decision until it has passed a documented review by someone who did not build it and is not rewarded for its adoption ([[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^def-validation-independence]]). Failure means the model is not allowed into use, is "permitted only under very tight constraints" (e.g. directional use only, no ROI point estimates), or is "rejected."
2. **Pre-registered acceptance criteria.** SR 11-7 asks for "targets for model accuracy, standards for acceptable levels of discrepancies" (p. 17) and "predetermined thresholds of acceptability" (p. 15). Writing these down *before* fitting — maximum out-of-sample KPI error, maximum ROI shift under prior perturbation, minimum recovery accuracy on simulated data, required agreement band with experiments — is the model-governance analogue of a [[Pre-analysis Plans and the Open Science Ecosystem|pre-analysis plan]]. It closes the forking paths that open when acceptance is judged after results are seen ([[Prediction vs Postdiction]], [[Garden of Forking Paths]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]).
3. **Known-truth simulation as the acceptance test.** Because true incrementality is unobservable, the nearest thing to outcomes analysis for attribution is to generate data from a simulator with known channel effects, run the *entire* production pipeline (feature engineering, model selection, reporting) and check that reported effects and rankings recover the truth. This is SR 11-7's stress testing (p. 11) applied to the estimand that matters. Design it with [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], generate data with [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]], and see [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] for why MMM needs it; [[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]] are the Bayesian-computation analogues.

### Generic red flags an SR 11-7-style review would raise

- **Selecting among model fits by something other than held-out performance.** Choosing, from several fitted variants, the one with the largest total SHAP mass on media variables (or the most plausible-looking ROIs) rewards the desired answer — the asymmetric user challenge of [[SR 11-7 - Model Development, Implementation and Use#^thm-user-challenge-asymmetry]] automated into the pipeline. It fails conceptual soundness and outcomes analysis at once ([[Model Selection and Overfitting]], [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- **Per-segment tree models of a shared aggregate KPI.** Fitting separate flexible models per segment to the same aggregate target multiplies variants (each an inventory entry) while each sees a small, autocorrelated sample — an aggregate-risk and sample-size problem, not a modelling detail ([[Riley et al 2020 - Sample Size for Prediction Models - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]]).
- **Predictive importance reported as causal effect.** A reporting component labelling importance scores as "impact" is misuse risk (source 2 of [[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-model-risk]]) even if the model forecasts well ([[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Causal Machine Learning - Overview]]).
- **No record of what was tried.** Without inventory entries for discarded variants, nobody can assess the multiplicity behind the delivered model ([[Researcher Degrees of Freedom]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]).
- **Holdout accuracy offered as validation of attribution.** SR 11-7: in-sample fit and holdout performance "are not substitutes for back-testing" (p. 14) — and back-testing the KPI is in turn not a test of attribution.
- **Validator paid on adoption, or never blocks anything.** Fails the effective-challenge triad ([[SR 11-7 - Model Definition, Model Risk and Effective Challenge#^def-effective-challenge]]).

## Examples

> [!example] Example: An SR 11-7-style acceptance protocol for a weekly media-mix model (generic illustration)
> **Setup:** a team will deliver channel ROIs from a Bayesian MMM fitted to 104 weeks of national data with 8 media channels plus controls.
>
> **Before fitting (pre-registered, signed off by an independent reviewer):**
> 1. *Purpose:* budget reallocation across channels at a quarterly horizon.
> 2. *Back-test:* rolling-origin 13-week-ahead forecasts on the last 26 weeks; accept if out-of-sample MAPE is within a stated bound and prediction intervals achieve roughly nominal coverage.
> 3. *Sensitivity:* re-fit under two alternative adstock priors and with each channel's spend perturbed by ±10%; accept if no channel's ROI moves by more than a stated fraction of its posterior interval width.
> 4. *Known-truth simulation:* simulate 200 data sets of identical shape from a generator with known ROIs and realistic collinearity; run the full pipeline; accept if ROI ranking recovery and interval coverage exceed stated thresholds (report Monte Carlo SEs).
> 5. *Benchmark:* where a geo experiment exists for a channel, the MMM's ROI should fall inside a stated band around the experimental estimate; disagreement triggers investigation, not automatic adjustment.
>
> **Gate outcome:** pass all → approved for budget use; fail (3) or (4) → "permitted only under very tight constraints" (directional ranking only, no ROI point estimates); fail (2) and (4) → rejected. Decision, thresholds and results go into the inventory and validation report.
>
> **Why it maps to SR 11-7:** steps 2-5 are back-testing (p. 14), sensitivity analysis (p. 11), stress testing with known boundaries (p. 11) and benchmarking (p. 13); fixing thresholds in advance implements "predetermined thresholds of acceptability" (p. 15).
^ex-an-sr-11-7

> [!example] Example: Override analysis on delivered ROIs (generic illustration)
> Over four quarterly refreshes, analysts manually capped 3 of 8 channel ROIs each time "because they looked too high." Per SR 11-7 §V.2 p. 13, a high override rate means the model "needs revision or redevelopment" — and the overrides themselves must be documented and their performance tracked (e.g. against later experiments), since overrides driven by plausibility are another forking path.
^ex-override-analysis-on-delivered

## Connections

- Successor framework for AI systems: [[NIST AI RMF 1.0 - Overview]].
- Experiment economics constrain how good benchmarks can be: [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]], [[User-Level Ad Experiments - Overview]].
- Calibration in its several senses (forecast calibration vs calibrating an MMM with experiments): [[Q - Four Meanings of Calibration]].
- Practical deployment of market response models: [[Implementation of Market Response Models]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]] — source map
- [[SR 11-7 - Outcomes Analysis and Back-Testing#^thm-limited-backtesting]] — the rule this note builds on
- [[Bayesian Workflow - Overview]]
- [[ROAS, mROAS, and Optimal Media Mix]]
