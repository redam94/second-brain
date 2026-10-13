---
title: "AMSS Discussion, Limitations and Validation Practice"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/concept
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §5 Concluding Remarks pp.31-32; simplifications stated in §2.3.2 p.15 fn.5, §2.4.1 p.18, App. C.2 p.39; acknowledgements p.32"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]"
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
used_by:
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
aliases:
  - AMSS limitations
  - Using a marketing simulator to validate MMM
---

# AMSS Discussion, Limitations and Validation Practice

> [!summary]
> The authors' conclusion (§5): simulation is "an essential tool" for comparing measurement methods. AMSS is a
> flexible, general framework for evaluating both observational and experimental methods. The §4 regression study is an
> illustration, not a recommended MMM, and further MMM issues (Chan & Perry 2017) are left to "future publications."
> This note also lists the **simplifications the paper itself flags**, adds **critical limitations** (our analysis), and
> sets out a **protocol** for using an AMSS-style simulator to validate MMM and attribution pipelines.

## Overview

§5 (pp.31-32) restates the motivation. The marketplace is complex, many methods exist, and simulation is the way to
evaluate them. AMSS "can capture many important aspects of marketing and sales generation" and "can be used to evaluate
and guide the development of multiple measurement methods, both observational and experimental." The paper says it
does not aim "to recommend a particular Media Mix Model". AMSS "provides the foundation for creating a systematic
process for doing so." The acknowledgements (p.32) thank Jim Dravillas for help in understanding current models of consumer behaviour, and
the reviewers David Chan, Tony Fagan, Yuxue Jin, Jim Koehler, Michael Perry and Yunting Sun. Chan and Perry wrote the
companion [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview|MMM-challenges paper]], and Jin is the lead
author of the Bayesian MMM paper with carryover and shape effects (see [[Bayesian Media Mix Modeling - Overview]]).

## Main Content

### Simplifications acknowledged in the paper

| Simplification | Where | Consequence |
|---|---|---|
| Competitors summarised by $\gamma,\omega$ in sales and by a fixed bid range $[\eta^{(m)},\eta^{(M)}]$ in search | §2.4.1 p.18; App. C.2 p.39 | No strategic competitor reaction; the simplified model "doesn't allow competitors to change their bids in response to the advertiser's actions" (p.39) |
| Single campaign-level bid, not per keyword | §2.3.2 fn.5 | Keyword-level dynamics are absent |
| Search effect felt fully at frequency 1 | App. C.2 p.41 | No search frequency curve |
| Unit-cost model with gamma noise | App. C.1 | No audience-quality pricing beyond mean and variance |
| Segments are 198 discrete mindsets | §2.1.2 | Heterogeneity inside a segment is ignored |
| Simple example avoids lag, satiation, interactions and unknown seasonality | §4.1.1 | Results are a best case for regression |
| Fixing search spend is not a well-defined intervention | §3.1 | Counterfactuals are set on budgets or settings |

### Critical limitations (our analysis)

1. **Realism is asserted, not validated.** The paper gives no calibration of AMSS to real category data. The
   segment model rests on brand-growth frameworks (Sharp 2010; Millward Brown 2009), and parameter values are set by
   hand. A method that works in AMSS has passed a test **conditional on AMSS's theory of consumers**. This is the
   general ABM validation problem ([[ABM Validation Challenges]]).
2. **DGM-method alignment.** Simulators built by a team can share assumptions with that team's models: Hill
   saturation, additive channel structure in the simple case. Validation is strongest when the DGM is **structurally
   different** from the method. AMSS partly does this: saturation acts on frequency, lag comes from mindset
   persistence, and search spend is endogenous.
3. **Monte Carlo uncertainty is incomplete.** Ground-truth margins of error are reported, but performance measures
   (bias, MSE) carry no Monte Carlo SEs. [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]
   recommends reporting them. Uncertainty-quantification performance (coverage, interval width) is not examined, since
   OLS ROAS intervals are not scored.
4. **One factor, one level of difficulty.** Only lag is varied. Unknown seasonality, synergy, targeting-induced
   selection, satiation and competitive shocks are described as capabilities but not exercised.
5. **Estimand subtleties.** The ROAS estimator averages pairwise ratios. With channel interactions, a total-effect
   ground truth differs from what a multi-regressor MMM estimates
   ([[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS#^def-amss-total-effect]]).
6. **Reproducibility.** The paper describes the design but gives no code location. (An open-source R implementation
   was released separately. That is outside this source, so it is not detailed here.)

### Protocol: validating a measurement pipeline with an AMSS-style simulator

> [!algorithm] Simulator-based validation of an MMM or attribution pipeline (synthesis)
> 1. **Fix the aims and estimands.** Choose ROAS, mROAS, contribution shares or the optimal budget, and decide whether
>    each is a total or direct effect and over what time window.
> 2. **Design the scenario grid.** Start from an easy base case, as in §4.1. Vary one difficulty at a time: lag
>    strength, saturation, synergy, targeting and selection, unknown seasonality, competitor shocks, signal-to-noise.
>    Then add realistic combinations.
> 3. **Compute ground truth by counterfactual.** Use zero-budget runs for ROAS, 5% cuts for mROAS and all-zero runs for
>    base. Report margins of error.
> 4. **Run the full pipeline unchanged** on each dataset, including data prep, model selection rules and priors.
>    Freezing the pipeline prevents tuning to the simulator.
> 5. **Score** bias, empirical SE, MSE, interval coverage and rank agreement across channels, all with Monte Carlo SEs.
> 6. **Report the failure map**: which scenarios break which estimand, and by how much.
^alg-amss-validation-protocol

## Examples

> [!example] Vetting a predictive driver-importance pipeline (illustrative, not from the paper)
> **Setup.** A hypothetical pipeline ranks marketing drivers by mean |SHAP| from per-segment gradient-boosted models of a
> shared weekly KPI, and chooses among model fits by total SHAP mass rather than held-out accuracy.
>
> **Simulation design.**
> 1. Build a scenario with a targeted channel (search-like, reaching high-intent segments), a mass channel (TV-like),
>    seasonality, and a **placebo channel** with zero true effect whose spend is scheduled to follow seasonality.
> 2. Compute each channel's ground-truth incremental KPI by its zero-budget counterfactual.
> 3. Run the pipeline unchanged on each of many datasets, **including its model-selection rule**.
> 4. Score rank agreement with the truth, how often the placebo is ranked important, and rank stability across datasets.
>
> **Expected outcome.** The targeted channel's spend co-moves with latent demand, and so does the placebo's. A
> predictive model can give both large SHAP mass that their counterfactual returns do not justify. Selecting fits by
> total SHAP mass rewards exactly that confounded signal.
>
> **Why.** Predictive attribution answers "which inputs the model uses," not "what would happen if spend changed"
> ([[Dillon et al - SHAP and Causal Insights - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]],
> [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]). The selection rule turns the attribution
> metric into a target ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
^ex-amss-vetting-predictive-driver-importance

> [!example] Rashomon check inside a simulator (illustrative)
> Fit many near-equally-accurate models to the same AMSS dataset and compare their implied TV ROAS. Because the truth is
> known, the spread of ROAS across the Rashomon set can be scored directly, not just reported
> ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]).
^ex-amss-rashomon-check-inside-simulator

## Connections

- **Governance.** Simulation with known truth is a form of the "effective challenge" and outcomes analysis expected in
  model-risk practice ([[SR 11-7 - Model Risk Management Guidance - Overview]]) and of the test, evaluation,
  verification and validation activity in [[NIST AI RMF 1.0 - Overview]].
- **Calibration.** In a Bayesian MMM, [[Simulation-Based Calibration - Overview]] checks the *inference engine* under
  the model's own prior. An AMSS-style check tests the *model* against a **different** world. Both are needed.
- **Analytic flexibility.** Unconstrained specification search on 156 weekly rows inflates false discoveries
  ([[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Researcher Degrees of Freedom]]).
  A simulator lets the whole search procedure be scored, not just its final model.
- **Experiments as ground truth in the wild.** [[Experimental Benchmarks for Observational Ad Measurement]] and
  [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- **Prediction vs explanation.** [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: a simulator
  rewards models that recover mechanism, not only those that predict.

## See Also

- [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
