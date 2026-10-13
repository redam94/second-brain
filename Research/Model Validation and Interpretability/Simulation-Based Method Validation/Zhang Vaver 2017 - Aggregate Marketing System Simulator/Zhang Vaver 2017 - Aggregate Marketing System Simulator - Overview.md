---
title: "Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/overview
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017), 'Introduction to the Aggregate Marketing System Simulator', Google technical report, 13 April 2017, 43 pp. (whole paper: Abstract, §1-5, App. A-C, Tables 1-8, Figs. 1-14, Eqs. 1-14)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
aliases:
  - AMSS
  - Aggregate Marketing System Simulator (AMSS)
  - Aggregate Marketing System Simulator
  - Zhang and Vaver 2017
  - Marketing simulator for MMM evaluation
---

# Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview

> [!summary]
> **AMSS** (Zhang & Vaver, Google, 2017) is a **data-generating mechanism for aggregate marketing time series**: weekly
> spend, media volume, search queries, clicks, sales and revenue. Its engine is a **hidden-state Markov process** on
> counts in 198 consumer-mindset segments. Seasonality, media exposure and purchases move people between segments by
> multinomial draws from transition matrices. Its defining feature is **ground truth via counterfactual scenarios**:
> rerun the world with a channel's budget at zero (ROAS) or cut by 5% (mROAS), and average over many datasets. In the
> worked example, a regression MMM recovers TV ROAS reasonably well when ads have no carryover. As carryover strength
> $\alpha$ rises from 0 to 0.5, the no-lag model's year-4 TV-ROAS MSE grows from **0.025 to 1.618**, almost all of it
> bias. Adding three lags cuts the MSE to **0.067**. AMSS is the reference example of a realistic, structurally distinct
> DGM for validating MMM and attribution methods.

## Overview

### Research Question and Contribution

**Question.** How can marketing-measurement methods be evaluated when real data never reveal the truth? This covers
observational methods (MMM, attribution) and experimental ones (geo experiments).

**Contribution.**
1. A **modular simulator** with segmentation, natural migration, media modules (traditional and paid search), and a
   sales event with pricing and competition. Channel interactions, carryover, saturation and selection bias **emerge**
   from population dynamics instead of being written into a response equation.
2. A **ground-truth methodology** based on virtual experiments (counterfactual scenarios), including a clear statement
   of which interventions are well defined.
3. A **demonstration** that scores regression MMMs against truth and isolates the cost of unmodelled carryover.

## Main Content

### Key Findings

- Observational marketing models rest on assumptions that "will be inaccurate to varying degrees ... often unverified,
  and indeed in some cases, unverifiable" (§1, p.2). Simulation lets modelers "understand the situations under which
  methods do and do not work" (§1, p.2).
- A row-identical natural-migration matrix means **no lag**. Interpolating towards the identity,
  $Q_\alpha=(1-\alpha)Q_0+\alpha I$, gives geometric carryover with persistence $\alpha$ (App. B.3.1).
- Ground-truth ROAS is a **total effect** over all pathways, for example TV → search queries → search effectiveness
  (§3.1). Fixing uncapped search spend is **not** a well-defined intervention.
- Simple scenario: TV ROAS is about 2 but **TV mROAS is about 0.4**. Search ROAS and mROAS are both about 1.5-1.9
  (Table 4). OLS bias for TV ROAS is −0.16 (Table 5).
- Lag study: omitting carryover produces **growing negative bias** (Model 1). Distributed lags mostly fix it, at the
  cost of more variance, and the fix is still imperfect (Table 7, Fig. 14).

### Note Set

| Note | Covers |
|---|---|
| [[AMSS Motivation - Virtual Experiments for Marketing Measurement]] | Abstract, §1, the virtual-experiment concept |
| [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] | §2 intro, §2.1, §2.2 core, App. A |
| [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]] | §2.2.1-2.2.5, App. B.1-B.3.1 |
| [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] | §2.3 intro, §2.3.1, App. C.1 |
| [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]] | §2.3.2, App. C.2 |
| [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]] | §2.4, §2.4.1-2.4.2 |
| [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] | §3, §3.1, §3.2 |
| [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] | §4, §4.1.1-4.1.4, §4.2.1-4.2.3 |
| [[AMSS Discussion, Limitations and Validation Practice]] | §5, stated simplifications, critique, protocol |

### Source Map

Every section, table, figure and numbered equation of the source, with the note that holds it.

| Source item | Pages | Note |
|---|---|---|
| Abstract | 1 | [[AMSS Motivation - Virtual Experiments for Marketing Measurement]] |
| §1 Introduction (fn. 1, virtual experiment) | 1-2 | [[AMSS Motivation - Virtual Experiments for Marketing Measurement#^def-amss-virtual-experiment]] |
| §2 Data generating model; **Fig. 1** simulator structure | 3-4 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism#^def-amss-event-sequence]] |
| §2.1 Population segmentation (segment sizes set aggregate behaviour) | 4 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] |
| §2.1.1 Mindset features; **Table 1**; **Fig. 2** actions by activity state | 4-7 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism#^def-amss-mindset-dims]] |
| §2.1.2 Full segmentation; **Table 2** (6 category segments); **Table 3** (33 brand segments) | 7-8 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism#^def-amss-198-segments]] |
| §2.2 Population migration; **Eqs. 1-2** | 7-9 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism#^def-amss-migration-law]] |
| §2.2.1 Changing market size | 9 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-market-size]] |
| §2.2.2 De-satiation | 9-10 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-desatiation]] |
| §2.2.3 Marketing interventions | 10 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-actionable]] |
| §2.2.4 Lagged effects | 10 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^thm-amss-lag-family]] |
| §2.2.5 Post-purchase migration | 11 | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration#^def-amss-post-purchase]] |
| §2.3 Modeling specific marketing interventions (media modules) | 11 | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] |
| §2.3.1 Traditional media module; **Fig. 3**; **Eq. 3** Hill | 11-14 | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)#^alg-amss-traditional-media]] |
| §2.3.2 Paid search module; **Fig. 4**; fns. 4-6 | 14-17 | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)#^alg-amss-search]] |
| "Other marketing interventions" paragraph (new modules can be written; sequenced, separately parameterised modules) | 17 | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]] (Overview, "Other marketing interventions" paragraph) |
| §2.4 Sales event; §2.4.1 calculating sales; **Fig. 5** demand curves; **Fig. 6** competition | 18-20 | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration#^def-amss-competition]] |
| §2.4.2 Post-purchase migration (plus profit listed as an output but never defined) | 20-21 | [[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration#^def-amss-post-purchase]] |
| §3 Ground truth (prediction, attribution, optimization) | 21 | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] |
| §3.1 Counterfactual scenarios (pathways; 3 types) | 21-22 | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS#^def-amss-counterfactual-types]] |
| §3.2 Calculating the ground truth (ROAS estimator) | 22-23 | [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS#^thm-amss-roas]] |
| §4 Sample application to MMM | 23 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] |
| §4.1.1 Specification; **Eqs. 4-5**; **Figs. 7-9** | 23-26 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study#^def-amss-simple-assumptions]] |
| §4.1.2 Data; **Figs. 10-12**; base sales | 26-27 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] |
| §4.1.3 Ground truth; **Table 4** | 27-28 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] and [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]] |
| §4.1.4 Modeling; **Eq. 6**; **Fig. 13**; **Table 5** | 28-29 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study#^def-amss-model1]] |
| §4.2.1 Lag specification | 29 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study#^def-amss-lag-manipulation]] |
| §4.2.2 Ground truth; **Table 6** | 30 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] |
| §4.2.3 Modeling; **Eq. 7**; **Table 7**; **Fig. 14** | 30-31 | [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study#^thm-amss-lag-findings]] |
| §5 Concluding remarks; acknowledgements | 31-32 | [[AMSS Discussion, Limitations and Validation Practice]] |
| App. A Notation; **Table 8** | 32 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] |
| App. B.1 Changing market size; **Eqs. 8-10** | 32-33 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-market-matrices]] |
| App. B.2 De-satiation; **Eq. 11** | 33-34 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-desatiation]] |
| App. B.3 Natural migration in activity state; **Eq. 12** | 34 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^def-amss-natural-migration]] |
| App. B.3.1 Relationship to lagged effects; **Eqs. 13-14** | 35 | [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^thm-amss-no-lag]] |
| App. C.1 Traditional media module (audience, budget, spend, volume, reach/frequency, effect) | 36-38 | [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)#^def-amss-product-construction]] |
| App. C.2 Paid search module (settings, audience, volume and spend, effect; fn. 9) | 39-41 | [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)#^def-amss-search-effect]] |
| References | 41-43 | "Works cited by the source" section of this note; also cited inline across notes |
| Source inconsistencies: $l=5$/$l=6$ swap (§2.2.4); "marketing state" for market state (§2.2.3); *negative* vs *unfavorable* (Fig. 5, §4.1.1 vs Tables 1, 3); media events never numbered | 5, 10, 19, 24-26 | [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] (index note and favorability bullet) |

### Context and Placement

In [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview|ADEMP]] terms, AMSS is a sophisticated **D**
(data-generating mechanism). Its counterfactual machinery supplies the **E** (true ROAS and mROAS) when the estimand is
not a DGM parameter. §4 sketches the **M** (two regression MMMs) and the **P** (bias, MSE).

It was written alongside [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], which names AMSS as a way to
study MMM challenges, and Jin et al. 2017 (the Bayesian MMM with Hill and adstock,
[[Bayesian Media Mix Modeling - Overview]], [[Shape (Saturation) Effects]], [[Carryover (Adstock) Functional Forms]]).
The simulator was also meant to evaluate geo experiments ([[Geo-Experiment Methodology - Overview]],
[[Geo-Experiment Design and Power Analysis]], [[TBR Design Sensitivity and the Stationarity Assumption]]) and bandit-style
campaign optimisation ([[Multi-Armed Bandits and Thompson Sampling - Overview]]).

### Works cited by the source

The paper's reference list (pp.41-43), grouped by the role each work plays:

- **Experiments as the gold standard and their limits.** Kohavi, Longbotham, Sommerfield & Henne (2009), controlled
  experiments on the web; Lewis & Rao (2015), the unfavourable economics of measuring ad returns
  ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]); Google (2011) Brand Lift and Facebook
  (2015) Conversion Lift as built-in platform experiments.
- **Observational marketing models.** Dekimpe & Hanssens (2000, 2010), time-series models in marketing; Manchanda,
  Rossi & Chintagunta (2004), response modelling with non-random marketing-mix variables.
- **Causality.** Holland (1986); Ehrenberg & Barnard (2000); Imbens & Rubin (2015); Pearl (2009); Chan & Perry (2017)
  ([[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]).
- **Consumer-mindset theory behind the segmentation.** Sharp (2010), *How Brands Grow* (ch. 7 loyalty, ch. 12
  availability); Millward Brown (2009), *The Business of Brands*.
- **Hill response curve.** Hill (1910); Gesztelyi et al. (2012); Jin, Wang, Sun, Chan & Koehler (2017)
  ([[Shape (Saturation) Effects]]).
- **Paid search pricing.** Google (2016), AdWords quality score.
- **Methods AMSS is meant to evaluate.** Scott (2015), multi-armed bandit experiments (campaign optimisation); Vaver &
  Koehler (2011), geo experiments.

## Examples

> [!example] Reading the headline lag result as an analyst would
> **Setup.** Year-4 true TV ROAS falls from 2.23 at $\alpha=0$ to 2.11 at $\alpha=0.5$ (Table 6). The no-lag regression
> (Model 1) has TV-ROAS MSE 1.618 at $\alpha=0.5$ (Table 7), and Fig. 14 puts its bias near $-1.25$.
>
> **Solution.** Bias$^2\approx1.56$, so variance is about $1.618-1.56\approx0.06$. Almost all the error is bias. The
> typical Model 1 estimate is about $2.11-1.25\approx0.86$, so the model reports TV as returning under \$1 per \$1 when
> it truly returns about \$2.1. The distributed-lag Model 2 has MSE 0.067 and bias near $-0.25$, an estimate of about
> 1.86.
>
> **Interpretation.** Omitting carryover flips a profitable channel to an apparently unprofitable one, and a fit
> statistic would not reveal it, because media is only about 5% of sales. Only ground truth exposes the failure.
^ex-amss-overview-headline-lag

## Connections

- **Other validation tools in this run.** Simulation-study design:
  [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. Time-series CV:
  [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]. Spurious regression of trending series:
  [[Granger 2003 - Spurious Regression and Cointegration - Overview]]. Model risk:
  [[SR 11-7 - Model Risk Management Guidance - Overview]].
- **Real-world ground truth.** [[Experimental Benchmarks for Observational Ad Measurement]],
  [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] and [[Activity Bias in Advertising]] show, with
  real experiments, the selection effects that AMSS's search module reproduces.
- **Attribution vs causation.** [[Dillon et al - SHAP and Causal Insights - Overview]] and
  [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]. A simulator with known counterfactuals is
  the natural testbed for "does this importance score track causal effect?"
- **Bayesian workflow.** [[Simulating an Underlying Process, Data Collection, and Inference]],
  [[Designing Simulated-Data Experiments]] and [[Simulation-Based Calibration - Overview]]: fake-data checks under the
  model's own assumptions, which complement AMSS's structurally different world.
- **Agent-based modelling.** [[ABM in Marketing Strategy]] and [[ABM Validation Challenges]]. AMSS is a
  segment-count cousin of a marketing ABM.

## See Also

- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator/_Index|Index: Zhang Vaver 2017 - Aggregate Marketing System Simulator]]
- [[AMSS Discussion, Limitations and Validation Practice]]: protocol for using a simulator in practice
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — ADEMP protocol around the AMSS data-generating mechanism
- [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] — AMSS as the simulator for scenario evaluation
- [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] — known-truth simulation as a compensating control
- [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] — ground truth may not exist; a simulator constructs it
- [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] — Jin et al. propose AMSS for testing
