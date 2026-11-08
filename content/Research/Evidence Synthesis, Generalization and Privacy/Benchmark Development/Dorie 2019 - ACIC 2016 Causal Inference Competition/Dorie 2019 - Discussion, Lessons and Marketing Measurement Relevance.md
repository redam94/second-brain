---
title: "Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Sec. 8 (pp. 24-25); marketing section is the note author's application"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Evaluation Metrics and Results by Method]]"
  - "[[Dorie 2019 - Predicting Performance and Variance Decomposition]]"
used_by:
  - "[[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]"
aliases:
  - ACIC lessons learned
  - Causal inference competition lessons
  - ACIC marketing measurement relevance
---

# Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance

> [!summary]
> Four themes: (1) nonlinear response surfaces and treatment effect heterogeneity created the most difficulty, so methods that flexibly model the response surface distinguished themselves; (2) lack of alignment between assignment mechanism and response surface was among the hardest data features; (3) good coverage was hard even when bias was low; (4) several good options exist for accurate estimation, with caveats because the testbed assumed ignorability, overlap for the treated and iid data. For marketing measurement, the competition is a template for validating methods in simulation before trusting them on observational ad data.

## Overview

The authors call this "the first large-scale data analysis competition for estimating causal effects in the context of observational studies" and hope it inspires competitions exploring other challenges.

## Main Content

> [!theorem] Lessons learned (Sec. 8)
> 1. **Flexible response-surface modelling wins.** Of the ways complexity was created in the data, two of the three most difficult for achieving low bias were nonlinear response surfaces and treatment effect heterogeneity. Methods flexibly modelling the response surface routinely distinguished themselves, even BART, which models only the response surface, and they beat approaches that flexibly model only the assignment mechanism (Balance Boost, Tree Strat, Adj. Tree Strat). Most ensembles succeeded because they could capitalise on the strengths of several models to reach this flexibility.
> 2. **Alignment is hard and under-discussed.** With many covariates and only some (even only certain transformations) true confounders, methods unable to privilege true confounders are disadvantaged. Payoff is larger for selection or re-weighting of inputs in the **response** surface than in the assignment mechanism, consistent with advice against variable selection in the assignment model and for attention to the importance of response-surface inputs (Austin et al. 2007; Hill 2008; Pearl 2010).
> 3. **Coverage is difficult.** Even with low bias, good coverage was hard; tweaks (TMLE adjustment often, not uniformly) helped, but "we don't feel like we have strong advice about how to optimize this aspect of performance."
> 4. **Several good options exist** for accurately estimating effects, particularly if the goal is bias reduction; many have readily available R packages. **Caveat:** the testbed restricted settings to ignorability, overlap for the inferential group and iid data.
^thm-acic-lessons

**Contribution beyond rankings.** The competition evaluates a wide range of methods across a much broader set of DGPs for the assignment mechanism and response surface than any single methodological paper, and benefits from crowdsourced implementations.

### Practical advice distilled (note author's reading of the paper)

| Situation | Guidance supported by the paper |
|---|---|
| Choosing an estimator for observational data when ignorability is plausible | Prefer methods that flexibly model the response surface (BART-type, ensembles with nonparametric learners); not linear OLS or first-order `teffects` |
| Need valid intervals | Do not rely on default intervals; consider TMLE correction, propensity score as covariate, symmetric intervals, and check coverage by simulation |
| Heterogeneous effects of interest | Report PEHE-type measures and require methods that output individual-level estimates |
| Wanting to predict which method will win in your data | Largely not possible; average quality dominates |
| Using conclusions beyond testbed | Not warranted for non-ignorable, poor-overlap, non-iid or non-continuous-outcome settings |

## Examples

> [!example] Application (note author): designing a simulation benchmark for marketing measurement methods
> **Goal.** Choose between estimators for the incremental effect of an ad on the exposed using observational data (exposure is not randomised), before trusting them on a real campaign.
> **Borrowed design.**
> 1. Take real covariates from the platform's logs (so correlations and variable types are realistic) and simulate exposure and conversion from a known DGP (ACIC's real-covariates, simulated-$Z$-and-$Y$ approach).
> 2. Vary knobs relevant to ad measurement: nonlinearity of conversion in user features; percentage exposed; overlap (segments with essentially no unexposed users, e.g., heavy users targeted by the algorithm); alignment (are the features driving targeting also driving conversion?); heterogeneity of lift across segments.
> 3. Evaluate bias, RMSE, **coverage and interval length**, and individual-effect accuracy; replicate (ACIC used 100 per setting); publish code.
> 4. Add a **randomised benchmark** where available, comparing estimates with the experiment's lift as in [[Experimental Benchmarks for Observational Ad Measurement]]; the simulation tells you why a method fails (nonlinearity, misalignment), the experiment tells you whether real data resemble the simulation.
> **Caveats.** Ad platforms violate ACIC's assumptions: unmeasured confounding (e.g., ad-targeting signals), interference, identity fragmentation ([[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]). The paper's own limits (Sec. 4.4) therefore bind hard.
^ex-marketing-simulation-benchmark

**Why the paper's findings matter for marketing measurement.** The ranking "flexible response surface first" is consistent with the vault's Bayesian nonparametric treatment ([[Nonparametric Causal Inference]]); and the coverage finding is a warning for Bayesian MMM or lift calibration: low bias does not imply credible intervals are honest.

## Connections

- Lottery view of benchmarks: the competition mitigates task-selection bias via breadth and mitigates statefulness via no leaderboard feedback: [[Dehghani 2021 - The Benchmark Lottery - Overview]].
- Documentation view: [[Gebru 2021 - Datasheets for Datasets - Overview]]; the knob table (Table 2) and released code are the datasheet-like artefacts.
- Experimental benchmark of observational estimators: [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]].
- Simulation validation of marketing models: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Toy ACIC-Style Simulation in Python]]
