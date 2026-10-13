---
title: "Zhang and Vaver 2017 - Aggregate Marketing System Simulator"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation-studies
  - topic/advertising-measurement
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Google technical paper (2017); quotes from pp. 2 and 31"
citation: "Zhang, S. & Vaver, J. (2017). Introduction to the Aggregate Marketing System Simulator. Google Inc. technical paper."
date_ingested: 2026-10-13
folder: "Model Validation/Simulation and Governance"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
used_by:
  - "[[SR 11-7 - Supervisory Guidance on Model Risk Management]]"
  - "[[NIST AI RMF 1.0 - AI Risk Management Framework]]"
  - "[[Blake et al 2015 - Paid Search Effectiveness Field Experiment]]"
aliases:
  - "Zhang Vaver 2017"
  - "AMSS"
  - "Aggregate Marketing System Simulator"
---

# Zhang and Vaver 2017 - Aggregate Marketing System Simulator

> [!summary]
> Zhang & Vaver (Google) introduce **AMSS**, a flexible simulator that generates realistic aggregate weekly marketing data — media spend, search queries, competitor activity, price and sales — from an explicit model of how consumers' mindsets evolve in response to marketing. Because the simulator knows the true causal effects, any measurement method (MMMs, regression, ML models) can be run on its output and scored against ground truth. It is the marketing-specific tool for the simulation-based validation that Morris et al. describe in general.

## Overview

**Citation:** Zhang, S. & Vaver, J. (2017). *Introduction to the Aggregate Marketing System Simulator*. Google technical paper; released with an open-source R package (`amss`).

**Problem:** Real marketing data never reveal the true effect of a channel, so one cannot tell whether an analysis method is accurate merely by applying it to real data. Experiments provide truth only for specific interventions. A simulator that produces data with the statistical features that make real analysis hard — seasonality, ad targeting, carryover, diminishing returns, interaction between channels, the role of search — gives a testbed where truth is known.

## Main Content

### Model structure

AMSS simulates a population in discrete (weekly) time. The population is divided into **segments defined by consumer mindset**, where a mindset combines several state dimensions — broadly, whether a person is in the market for the category, their satisfaction, their current activity (e.g. inactive, exploring, purchasing), and their attitude toward the brand (from unaware through favourable to loyal). Each week:

1. Non-marketing forces (seasonality, market trends) move people between states.
2. **Media modules** (e.g. TV, display, paid and organic search) reach a share of each segment, depending on spend and on targeting; exposure shifts transition probabilities between states, with carryover and saturation arising from how exposure moves people through mindsets.
3. **Search** is modelled as driven by consumer activity, so paid search volume depends on underlying demand — reproducing the endogeneity of search spend discussed in [[Chan and Perry 2017 - Challenges in Media Mix Modeling]] and [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]].
4. **Sales** are generated from the purchasing segments, with price and competitor effects.

Only aggregate time series are output — what an analyst would actually observe — while the state dynamics stay hidden.

> [!definition] Ground truth by counterfactual scenario
> Let $Y(\mathbf{x})$ be total simulated sales over a period under media plan $\mathbf{x}$ (spend by channel and week). Holding the random-number stream and all other inputs fixed, the true effect of channel $m$ is obtained by re-running the simulation under a counterfactual plan $\mathbf{x}'$ that differs only in channel $m$:
> $$ \text{ROAS}_m = \frac{E[Y(\mathbf{x})] - E[Y(\mathbf{x}')]}{\sum_t x_{t,m} - \sum_t x'_{t,m}}. $$
> Setting $x'_{t,m}=0$ gives average ROAS; a small change gives marginal ROAS. This is the estimand against which an analysis method's output is scored (see [[ROAS, mROAS, and Optimal Media Mix]]).
^def-amss-ground-truth

### Uses

- Evaluating whether a given MMM specification recovers true ROAS under realistic conditions, including when its assumptions (additivity, functional forms) are wrong.
- Comparing analysis options — data granularity, priors, control variables for search — on a common footing.
- Showing how biases arise, e.g. from targeting ads at people already likely to buy.

## Key Passages

> "it is important to have a source of truth against which the accuracy of estimates can be verified" — Zhang & Vaver (2017), p. 2

> "Given the complex marketing environment and the multitude of analytical methods that are available, simulation is an essential tool for evaluating and comparing analysis options." — Zhang & Vaver (2017), p. 31

## Implications for Model Validation

- **A realistic simulator turns "is this model right?" into a measurable question.** Run the complete pipeline — feature engineering, model search, importance ranking, forecast or uplift calculation — on simulated data and compare outputs with known truth.
- **Simulate the hard features, not an idealized world.** Endogenous spend, collinear channels, seasonality and short histories are what break models; a simulator without them will flatter the method.
- **Use counterfactual runs to define ground truth** for any "what if" quantity a model reports (effect of raising a driver, forecast under a changed plan).
- **Blind tests:** hold the truth back from the modelling team, as suggested by [[Chan and Perry 2017 - Challenges in Media Mix Modeling]], so the evaluation cannot be tuned to the answer.
- Plan and report the study with ADEMP and Monte Carlo errors ([[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]).

## Connections

- General methodology: [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]].
- Companion Google MMM papers: [[Chan and Perry 2017 - Challenges in Media Mix Modeling]], [[Bayesian Media Mix Modeling - Overview]] (whose simulation shows bias at two years of weekly data).
- Real-world ground truth from experiments: [[Gordon et al 2019 - Advertising Measurement at Facebook]], [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]].
- Governance requirement for benchmarking and outcomes analysis: [[SR 11-7 - Supervisory Guidance on Model Risk Management]].

## See Also

- [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]] — how to design and report the simulation
- [[Bayesian Media Mix Modeling - Overview]] — the model class AMSS was built to stress-test
- [[Carryover (Adstock) Functional Forms]] — one of the effects the simulator reproduces
- [[Shape (Saturation) Effects]] — diminishing returns in the simulator
- [[CUBES Simulator Architecture]] — another consumer-behaviour simulator in the vault
