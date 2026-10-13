---
title: "Chan Perry 2017 - Simulation-Based MMM Validation and Transparency"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - topic/simulation
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§5.6 Model validation (pp.14-15); §6 Final remarks (p.15); Acknowledgment (p.15)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]"
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]"
aliases:
  - Chan Perry model validation by simulation
  - Blind simulated-data RFP test for MMM vendors
  - MMM transparency requirements
  - Withheld ground truth MMM evaluation
---

# Chan Perry 2017 - Simulation-Based MMM Validation and Transparency

> [!summary]
> Section 5.6 of Chan & Perry (2017) proposes evaluating MMM methods on **simulated datasets with known ground truth**:
> a simulator produces MMM-like data under user-defined scenarios (e.g. types of selection bias), so modelers can see how
> each model type performs as conditions change, and advertisers can give vendors simulated data **with the truth
> withheld** as part of a request for proposals. Experiments give ground truth too, but usually only a point estimate.
> Section 6 then asks modelers to be forthright about what an MMM can and cannot answer and to disclose parameter
> uncertainty, model uncertainty, how the model was chosen, and how far results are driven by data versus the modeler's
> priors and filters.
^summary

## Overview

This is the paper's third opportunity area ("model evaluation through simulations", §5) and the reason the paper sits
in the vault's simulation-based method-validation cluster. The §4 failures are largely invisible in fit statistics on real
data (see [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]); the paper's proposal is to
measure them on simulated data, where "the true underlying ROAS is known" (p.15).

## Main Content

### §5.6 Model validation (pp.14-15)

> [!definition] MMM simulator (§5.6, p.14)
> "A software package that produces simulated MMM datasets defined by the user to capture important aspects of the real
> world" (p.14). The paper points to Zhang & Vaver (2017) for one such simulator; see
> [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].
^def-cp-simulator

> [!theorem] Uses of simulation in MMM validation (§5.6, pp.14-15)
> 1. **Scenario evaluation.** Evaluate "how accurately different types of models perform under different hypothesized
>    scenarios such as different types of selection bias" (p.14).
> 2. **Complement to experiments.** "While experiments are a source of ground truth, they usually provide a point
>    estimate" (p.14). Simulation gives more control over the marketing environment and "a flexible and inexpensive
>    environment from which to conduct virtual experiments" (p.15), yielding insight into how well models capture
>    different aspects of the environment.
> 3. **Robustness sweeps.** Generate "a series of simulated datasets with increasing lagged media effects, or
>    increasingly correlated media variables", fit MMMs to each, and track performance as the environment changes.
>    "Because the datasets are simulated, the true underlying ROAS is known and the model output can be compared to a
>    ground truth" (p.15).
> 4. **Procurement test.** Advertisers can include simulated data in their **request-for-proposals** process:
>    "Simulated data, where the ground truth is known but withheld, can be provided to third parties in order to evaluate
>    the performance their modeling process" (p.15).
^thm-cp-simulation-uses

> [!algorithm] Robustness sweep for an MMM method (operationalizing §5.6 use 3; vault formulation)
> 1. **Fix the estimand**: true ROAS (and mROAS) per channel under the simulator's counterfactual definition.
> 2. **Choose a stress axis** from §4: lag length; correlation between channels; spend range; strength of demand
>    targeting for a search-like channel; strength of a TV-to-search funnel; endogeneity of price.
> 3. For each level $k=1,\ldots,K$ of the stress axis, generate $R$ datasets of realistic size (e.g. 156 weekly rows).
> 4. Fit each candidate MMM specification to every dataset, **with the specification fixed in advance** (no peeking at
>    the truth).
> 5. For each level, compute bias, RMSE and interval coverage of ROAS, plus rank recovery of channels and the regret of
>    the recommended allocation, each with a Monte Carlo standard error.
> 6. Plot performance against stress level; report where each method breaks down.
^alg-cp-robustness-sweep

> [!algorithm] Blind simulated-data RFP (operationalizing §5.6 use 4; vault formulation)
> 1. The advertiser (or an independent evaluator) generates several simulated datasets covering the §4 failure modes,
>    including at least one channel with **zero** true effect and one demand-targeted channel.
> 2. Datasets are shipped to bidders **without** the generating parameters.
> 3. Bidders return ROAS estimates with intervals and a recommended allocation.
> 4. The evaluator scores against the withheld truth (bias, coverage, false attribution to the null channel, allocation
>    regret).
> 5. Because bidders never see the truth, they cannot tune specifications toward it, which closes the specification-search
>    route that real-data fit leaves open.
^alg-cp-blind-rfp

The design and reporting standards for such studies (aims, data-generating mechanisms, estimands, methods, performance
measures; Monte Carlo SEs; choosing the number of repetitions) are in
[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]; the Bayesian-workflow view of fake-data checks is
[[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]].

### §6 Final remarks (p.15)

> [!theorem] Transparency obligations of the MMM modeler (§6, p.15)
> 1. Be forthright about the **types of questions an MMM can and can't answer**.
> 2. **Acknowledge the uncertainty** in the modeling process.
> 3. Maintain **transparency between the modeler and the end user** of the results, including the capabilities and
>    limitations of MMMs.
> 4. Where possible, discuss **metrics of parameter uncertainty and model uncertainty** with the end user.
> 5. End users "should be aware of the process by which a model was chosen, the amount of model uncertainty and the
>    degree to which final results are data-driven versus driven by the modeler's chosen priors and filters" (p.15).
^thm-cp-transparency

The introduction (§1, p.2) adds a third element to these remarks: the need to **educate end-users** of MMMs on their
capabilities and limitations.

**Acknowledgment (p.15).** The authors thank three groups of people:

| Group | People | Role |
|---|---|---|
| Encouragement and support | Tony Fagan, Penny Chu | — |
| "numerous helpful discussions and editorial comments" | Jim Koehler, Robert Bell, Stephanie Zhang | Koehler co-authors all four companion papers and Zhang co-authors the simulator paper ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) |
| "their comments and discussions" | Yuxue Jin, Yunting Sun, Yueqing Wang, Aiyou Chen | authors of the companion papers on Bayesian MMM (Jin et al.), geo MMM (Sun et al.), category MMM (Wang et al.) and paid-search bias correction (Chen et al.) |

## Examples

> [!example] A minimal disclosure table implementing §6 (vault illustration)
> | Item | Example entry |
> |---|---|
> | Questions in scope | mROAS near current spend for channels with ≥2 years of varied spend |
> | Questions out of scope | Average ROAS for always-on channels; spend > 1.5x historical max |
> | Selection process | 5 specifications pre-registered; all shown; none chosen by $R^2$ |
> | Model uncertainty | Range of channel ROAS across specifications; allocation under each |
> | Parameter uncertainty | 90% posterior intervals for ROAS and mROAS |
> | Prior vs. data | Prior-to-posterior shrinkage per channel; results under weaker priors |
> | Simulation evidence | Bias and coverage of this pipeline on simulated data with a null channel and a targeted channel |
^ex-cp-disclosure-table

> [!example] Applying §5.6 to a driver-importance pipeline (vault illustration)
> Before trusting SHAP-based driver rankings from tree models on weekly aggregate data, simulate weekly datasets with the
> same row count, correlation structure and a known set of true drivers (including a demand-targeted channel and a
> null channel). Run the whole pipeline, including whatever model-choice rule is used, and measure how often the null
> channel is ranked in the top five and how often the targeted channel is over-credited. See
> [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] and
> [[Dillon et al - SHAP and Causal Insights - Overview]].
^ex-cp-shap-sim-validation

## Connections

- Governance analogues: "effective challenge", documentation of model limitations and outcomes analysis in
  [[SR 11-7 - Model Risk Management Guidance - Overview]]; test, evaluation, verification and validation (TEVV) and
  transparency in [[NIST AI RMF 1.0 - Overview]].
- Out-of-sample validation for time series and why random splits fail (footnote 2 of the paper):
  [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- Experiments as point-estimate ground truth and as calibration targets:
  [[Geo-Experiment Methodology - Overview]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
  The §6 point about results being driven by "the modeler's chosen priors" is quantified in
  [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]; a worked simulation-with-known-truth
  design for this model class is [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]].
- Disclosure of analytic flexibility in science: [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]],
  [[Researcher Degrees of Freedom]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]: the simulator §5.6 cites
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: how to design and report the study
