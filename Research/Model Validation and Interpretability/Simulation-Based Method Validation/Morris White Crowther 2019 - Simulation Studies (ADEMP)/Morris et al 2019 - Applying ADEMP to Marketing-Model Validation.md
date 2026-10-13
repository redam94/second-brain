---
title: "Morris et al 2019 - Applying ADEMP to Marketing-Model Validation"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/marketing-measurement
  - type/example
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "Application note: applies §3 (ADEMP), §4.1-4.3 (coding), §5.1-5.4 (analysis, Eq. 1), §6 (reporting) and §8.1 (protocols) of Morris, White & Crowther (2019) to marketing-analytics validation. The marketing scenarios are illustrative and not from the paper."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]"
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
used_by:
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
aliases:
  - ADEMP for media mix models
  - Simulation validation protocol for marketing models
  - ADEMP for driver analysis pipelines
---

# Morris et al 2019 - Applying ADEMP to Marketing-Model Validation

> [!summary]
> Two worked ADEMP protocols that carry Morris, White & Crowther's framework into marketing analytics: **(1)** validating a Bayesian media mix model's ROAS recovery and interval coverage, and **(2)** validating a SHAP-based driver-ranking pipeline built from per-segment tree models of a shared aggregate KPI. Each lists aims, a factorial DGM grid with positive and negative controls, estimands, the method *as actually run* (including any selection step), performance measures with Monte Carlo SEs, and an $n_{\text{sim}}$ calculation from Eq. (1). The recurring lesson: any data-dependent choice in the pipeline — choosing a model fit by total SHAP mass instead of held-out accuracy, refitting on non-convergence — is **part of the Method** and must sit inside the simulation loop.
^summary-applying-ademp-marketing

## Overview

[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview|Chan & Perry (2017)]] argue that MMMs should be evaluated on simulated data with known ground truth, and [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview|AMSS]] provides such a DGM. Morris et al. supply the missing experimental discipline: a protocol, factorial DGMs, pre-specified performance measures and Monte Carlo SEs. Without it, a claim of the form *we simulated it and it worked* is one point of light, not a landscape ([[Morris et al 2019 - Protocols, Code Release, Consortia and Limits#^def-three-remedies|§8]]).

## Main Content

### Protocol 1 — Bayesian MMM: does it recover ROAS with honest intervals?

> [!example] ADEMP protocol for a media mix model (illustrative)
> **A — Aims.** (i) Is channel ROAS estimated without material bias? (ii) Are 90% credible intervals calibrated in the frequentist sense? (iii) Where does the model break — stretch/break aims for high spend collinearity and short histories.
>
> **D — DGMs.** Weekly KPI with known adstock and saturation per channel ([[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]]), trend, seasonality and noise. Factorial grid:
>
> | Factor | Levels |
> |---|---|
> | History length $T$ | 52, 104, 156 weeks |
> | Inter-channel spend correlation | 0, 0.5, 0.9 |
> | Unobserved confounder (demand shock driving both spend and KPI) | off, on |
> | Signal-to-noise | low, high |
>
> 36 DGMs. **Negative control:** one channel with zero true effect. **Positive control:** a DGM matching the model's assumptions exactly (where nominal coverage must appear).
>
> **E — Estimands.** True ROAS per channel, computed as the counterfactual difference in KPI with and without each channel's spend — estimated **by simulation from one very large run on a separate RNG stream** when the DGM is specified in response-curve terms ([[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^alg-estimate-theta|§5.4]]).
>
> **M — Methods.** The MMM as actually run (priors, adstock form, sampler settings, *and the fallback when sampling fails*), plus a simpler comparator (e.g. regularised regression with fixed transforms).
>
> **P — Performance.** Missing-fit rate (divergences / $\hat R$ failures) first; bias and relative bias of ROAS; empirical SE; average posterior SD vs empirical SE (relative error in "model SE"); coverage and bias-eliminated coverage of 90% intervals; rate of the zero-effect channel's interval excluding 0 (type I error). All with MCSEs from [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^thm-table6|Table 6]].
>
> **$n_{\text{sim}}$.** Key measure: coverage, expected 90%, required MCSE 1.5 pp: $n_{\text{sim}}=0.9\times0.1/0.015^2=400$ per DGM, 14,400 fits in total.
^ex-mmm-protocol

### Protocol 2 — SHAP driver ranking from per-segment tree models

> [!example] ADEMP protocol for a driver-importance pipeline (illustrative)
> Consider a hypothetical pipeline that fits gradient-boosted tree models of a shared aggregate KPI separately per segment on weekly data (52-156 rows), then ranks drivers by mean |SHAP|. Among several fits it keeps the one with the largest total SHAP mass rather than the best held-out accuracy (a deliberately flawed selection rule, chosen to show why selection steps belong inside the simulation loop).
>
> **A.** Does the ranking recover the true ordering of driver effects? Is it stable across reruns and segments? How often is a zero-effect driver ranked in the top $k$?
>
> **D.** Linear-plus-saturation DGM with known driver effects; vary $T\in\{52,104,156\}$, driver correlation $\in\{0,0.5,0.9\}$, number of irrelevant drivers $\in\{2,10\}$, and a confounder on/off. Include at least one **zero-effect driver** (negative control) and a DGM where drivers are independent (positive control).
>
> **E.** True rank order of contributions; true per-unit effects; the indicator "zero-effect driver in top $k$".
>
> **M.** The pipeline **including the selection-by-SHAP-mass step**, compared with (a) selection by held-out accuracy and (b) a correctly specified regression with its coefficients as importances. Selection rules belong *inside* the loop ([[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-pure-vs-procedure|procedure as method]]; [[Researcher Degrees of Freedom]]).
>
> **P.** Spearman correlation of estimated vs true ranking; top-$k$ recall; false top-$k$ rate for zero-effect drivers; rank stability across seeds; all with MCSEs. Interpret feature importance with care under correlated drivers ([[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]).
>
> **$n_{\text{sim}}$.** False top-$k$ rate expected near 5%, required ±1 pp: $n_{\text{sim}}=0.05\times0.95/0.01^2\approx475$ per DGM.
^ex-shap-protocol

### Execution and reporting checklist for marketing teams

1. Write the protocol (both tables above) **before** running anything; commit it with the code.
2. Seed once, store RNG states, use streams for parallel chunks ([[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^alg-seed-once|§4.1]]).
3. Apply every method to the **same** simulated datasets.
4. Report missing-fit rates first; plot estimates; then tabulate with methods side-by-side and MCSEs ([[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^alg-reporting-checklist|reporting checklist]]).
5. Use a zip plot to check whether coverage is achieved for the right reasons.
6. Report performance **by DGM**; do not average over true parameter values ([[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^imp-condition-on-truth|§5.2]]).

## Examples

> [!example] Reading a Protocol 1 result with its Monte Carlo SE (illustrative)
> With $n_{	ext{sim}}=400$ in one DGM ($T=52$, correlation 0.9, confounder on), suppose the 90% intervals for the zero-effect channel cover 0 in 340 of 400 repetitions: coverage 85.0%, MCSE $=\sqrt{0.85	imes0.15/400}=1.8$ pp. Nominal 90% is about 2.8 MCSE away, so the shortfall is unlikely to be Monte Carlo noise. The next checks are bias-eliminated coverage and posterior SD vs empirical SE, to separate bias from intervals that are too narrow ([[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^def-bias-eliminated-coverage|§5.2]]).
^ex-protocol1-readout

## Connections

- [[MMM Model Selection and Application]] and [[TBR Design Sensitivity and the Stationarity Assumption]] contain simulation studies of marketing methods already in the vault that can be audited against this checklist.
- [[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]] are the Bayesian-workflow versions of the same checks for a single model.
- For prediction-target pipelines, sample-size needs are covered by [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
- Validation evidence of this kind is what governance frameworks ask for: [[SR 11-7 - Model Risk Management Guidance - Overview]].
- Gaming risk when a single summary (e.g. SHAP mass) becomes the selection target: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].

## See Also

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
- [[Dillon et al - SHAP and Causal Insights - Overview]] — why SHAP importance is not a causal effect
