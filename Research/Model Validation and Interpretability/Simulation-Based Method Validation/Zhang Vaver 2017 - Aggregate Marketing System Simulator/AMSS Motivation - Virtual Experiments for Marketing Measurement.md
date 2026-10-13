---
title: "AMSS Motivation - Virtual Experiments for Marketing Measurement"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/concept
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) Abstract p.1; §1 Introduction pp.1-2 (footnote 1)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]"
used_by:
  - "[[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]"
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
aliases:
  - Why simulate marketing measurement
  - Virtual experiment (marketing simulation)
---

# AMSS Motivation - Virtual Experiments for Marketing Measurement

> [!summary]
> Randomized experiments are the most reliable way to measure ad effects, but they are often unavailable (national TV),
> expensive, slow, low-powered for small effects, and only snapshots. Observational methods (MMM, digital attribution)
> rest on assumptions that are often **unstated, unverified, or unverifiable**, and they suffer hidden confounding and
> problems of data scope and granularity. Real ad systems are too complex for analytic validation. A **simulated ad
> system with a known environment** makes it cheap to run **virtual experiments**, obtain ground truth, and map "the
> situations under which methods do and do not work." AMSS is built for this. It targets aggregate time series and
> evaluates MMMs, campaign optimisation, and geo experiments.

## Overview

The abstract positions AMSS as a generator of "aggregate-level time series data related to marketing measurement (e.g.,
channel-level marketing spend, website visits, competitor spend, pricing, sales volume)." It can vary the mix of spend,
ad effectiveness, targeting, seasonality and competitor activity. Its "key feature" is that it produces ground truth
for ROAS and mROAS (Abstract, p.1). The named downstream uses are **MMMs**, **campaign optimisation** (citing Scott 2015
on multi-armed bandits) and **geo experiments** (citing Vaver & Koehler 2011).

## Main Content

### The argument of §1, step by step

1. **Demand.** Marketers need the long- and short-term impact of media, trade promotion and other tools, and they expect
   accurate, reliable measurement from quantitative analysis (p.1).
2. **Experiments are the gold standard** (Kohavi et al. 2009). Some platforms build them in: Facebook reports
   incremental effects through **Conversion Lift** (Facebook 2015) and Google through **Brand Lift** (Google 2011)
   ([[Conversion Lift Studies on Ad Platforms]]).
3. **But experiments have limits** (p.1):
   - rare in some media, such as national TV;
   - "expensive, impractical, or infeasible" (citing Lewis & Rao 2015 and Kohavi et al. 2009);
   - multi-channel measurement needs complex designs, advance planning and long test periods;
   - **small effects need large samples** ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]);
   - they constrain marketing flexibility;
   - they give "only snapshot views."
4. **So observational methods fill the gap.** MMM and digital attribution use aggregate or user-level historical data
   (Dekimpe & Hanssens 2000, 2010; Manchanda, Rossi & Chintagunta 2004). However, "correlation does not imply causation"
   (citing Holland, Ehrenberg & Barnard, Imbens & Rubin, Pearl, and Chan & Perry).
5. **Assumptions are the weak point.** Causal claims need assumptions about how ads change behaviour, how channels
   interact, and how price affects sales. These "will be inaccurate to varying degrees". They are often "unstated and/or
   unidentified", "often unverified, and indeed in some cases, unverifiable" (p.2). Results may also be biased by
   **hidden confounders** and **data scope and granularity** (Lewis & Rao 2015).
6. **Hence validation needs a source of truth.** Both observational and experimental methods "require evaluation and
   validation." Simulation can also analyse experimental designs (p.2).
7. **Why simulation.** A realistic ad system is "too complex for analytical validation," but its complexities can be
   represented in a simulated system, where it is "feasible and inexpensive to consider a wide variety of scenarios ...
   and to run virtual experiments" (p.2).
8. **What AMSS adds.** It captures complex purchase behaviour and response to marketing, can reproduce **different
   levels of aggregation and hidden confounders**, can vary system complexity, and gives ground truth for "any
   measurement approach grounded in the analysis of aggregate data" (p.2).

> [!definition] Virtual experiment (§1, footnote 1, p.2)
> "A virtual experiment is implemented in the virtual world of the simulation rather than in the real world." In AMSS
> it means generating data under a scenario and under a modified (counterfactual) scenario and comparing them
> ([[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]).
^def-amss-virtual-experiment

> [!definition] Purpose of a simulated ad system (§1, p.2)
> A simulated marketing environment "that is specified and known, allows modelers to explore statistical issues, verify
> model performance, and compare competing models. By simulating across a variety of reasonable market conditions, we
> can understand the situations under which methods do and do not work." The goal is measurement methods that are
> **robust to different market conditions**.
^def-amss-purpose

### Paper roadmap (end of §1)

1. A detailed description of the design and data-generating methodology (§2), covered in
   [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]] and the module notes.
2. Ground truth (§3), covered in [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]].
3. An example application to MMM (§4), covered in [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]].

## Examples

> [!example] Generic analytics use case: which assumption breaks a pipeline?
> A team fits weekly MMMs to 52-156 rows of spend and sales. The pipeline assumes geometric adstock, Hill saturation in
> spend, no channel synergy, and seasonality handled by a Fourier term. Assumptions such as "no synergy" cannot be
> checked against real data. In a simulator, the team can switch synergy on (let TV raise branded-query volume), keep
> everything else fixed, and measure how far ROAS estimates move. That turns an unverifiable assumption into a
> quantified **sensitivity**.
^ex-amss-generic-analytics-use-case

## Connections

- **The observational-vs-experimental gap** is measured with real RCTs in
  [[Experimental Benchmarks for Observational Ad Measurement]]. AMSS measures it with virtual ones.
- **The MMM failure list** that AMSS is designed to probe is in
  [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], the companion Google paper of the same year.
- **The simulation-study discipline** (aims, DGMs, estimands, methods, performance) is in
  [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. The Bayesian-workflow version of "simulate
  the process, then fit" is in [[Simulating an Underlying Process, Data Collection, and Inference]] and
  [[Designing Simulated-Data Experiments]].
- **Model risk framing.** Independent "effective challenge" of models with known-truth tests:
  [[SR 11-7 - Model Risk Management Guidance - Overview]].

## See Also

- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
- [[Geo-Experiment Methodology - Overview]]: one of AMSS's named evaluation targets
- [[Multi-Armed Bandits and Thompson Sampling - Overview]]: campaign optimisation (Scott 2015) is another
