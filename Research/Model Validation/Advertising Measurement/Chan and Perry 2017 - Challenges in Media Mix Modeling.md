---
title: "Chan and Perry 2017 - Challenges in Media Mix Modeling"
tags:
  - source/ingested
  - topic/model-validation
  - topic/advertising-measurement
  - topic/media-mix-modeling
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Google Inc. white paper (2017); quotes from p. 6, fn. 2 pp. 10–11, §5.6 p. 15"
citation: "Chan, D. & Perry, M. (2017). Challenges and Opportunities in Media Mix Modeling. Google Inc."
date_ingested: 2026-10-13
folder: "Model Validation/Advertising Measurement"
doc_type: paper
depends_on:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[The Selection Problem]]"
  - "[[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]"
used_by:
  - "[[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]]"
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
  - "[[Bergmeir et al 2018 - Cross-Validation for Time Series]]"
  - "[[MMM Model Selection and Application]]"
aliases:
  - "Chan Perry 2017"
  - "Challenges and Opportunities in Media Mix Modeling"
---

# Chan and Perry 2017 - Challenges in Media Mix Modeling

> [!summary]
> Chan & Perry (Google) catalogue why media mix models (MMMs) — regressions of aggregate sales on media spend — struggle to deliver reliable causal estimates: too few data points, too little independent variation in spend, correlated channels, and spend that follows demand. They argue that MMM outputs need outside validation, and propose simulation with known-but-withheld ground truth, geo-level data, informative priors and experiments as remedies. The paper is a practitioner's checklist for validating any model of weekly marketing KPIs.

## Overview

**Citation:** Chan, D. & Perry, M. (2017). *Challenges and Opportunities in Media Mix Modeling*. Google Inc. white paper.

**Context:** Written by Google's marketing-measurement research team alongside [[Bayesian Media Mix Modeling - Overview|Jin et al. (2017)]] and [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator|Zhang & Vaver (2017)]], it surveys the statistical obstacles facing MMM and the research directions that might address them.

## Main Content

### Data limitations

- **Small samples.** A typical national weekly dataset over three years has only 156 observations, yet the model has an intercept, trend and seasonality terms, controls, and for each channel a coefficient plus carryover and saturation parameters (see [[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]]). The ratio of parameters to observations is high and the information per parameter low.
- **Limited range of variation.** Spend levels in a channel often move within a narrow band, so the response curve is only observed locally; extrapolating to much higher or lower spend (as budget optimization does) relies on the functional form, not data.
- **Correlated inputs.** Channels are planned together (flighting campaigns across TV, digital and search at the same time), making their effects hard to separate; small changes in data or specification can shuffle credit between them.

### Selection bias and endogeneity

Advertisers raise spend when they expect demand to be high (seasonal peaks, product launches), and some channels — notably paid search — mechanically scale with demand because ads are served in response to consumer queries. Spend is therefore correlated with the error term unless the demand driver is modelled. The paper discusses **ad targeting bias** and the special case of search, where including a measure of underlying query volume can help control for demand (see [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]] for the experimental counterpart).

### Model selection and validation

Many specifications fit the data about equally well but imply different ROAS and different optimal budgets (compare [[MMM Model Selection and Application]] and [[Fisher et al 2019 - Model Class Reliance]]). Standard cross-validation is hard to apply because of small samples and serial dependence (fn. 2). Good in-sample fit or holdout forecast accuracy does not establish that the causal attributions are right.

### Proposed remedies

- **More granular data:** geo-level models multiply observations and add cross-sectional variation in spend.
- **Informative priors** from experiments, meta-analyses or related brands (Bayesian approach; see [[Bayesian Estimation and Priors for MMM]]).
- **Experiments** — geo experiments and lift tests — to calibrate or validate MMM estimates.
- **Simulation:** generate datasets from a realistic simulator where true ROAS is known, run the MMM on them, and compare estimates with truth (§5.6). They suggest advertisers evaluate a vendor's modelling process by giving it simulated data with the ground truth known but withheld.

> [!definition] Ground-truth validation of an MMM via simulation
> Given a data-generating simulator $G$ with known channel effects (true ROAS$_m$ for each channel $m$), draw datasets $D_1,\dots,D_S \sim G$, fit the modelling pipeline $\mathcal{M}$ to each, and compute the error $\widehat{\text{ROAS}}_m(D_s) - \text{ROAS}_m$. Bias, variance and interval coverage over $s=1,\dots,S$ measure whether $\mathcal{M}$ recovers the truth under realistic conditions — a direct application of the ADEMP framework in [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]].
^def-mmm-ground-truth-validation

## Key Passages

> "A typical MMM dataset, consisting of three years of national weekly data is only 156 data points." — Chan & Perry (2017), p. 6

> "The scope for meaningful cross-validation of an MMM is typically limited due to small datasets and the time-series nature of the data which doesn't allow for simple random sampling to produce a validation set." — Chan & Perry (2017), fn. 2, pp. 10–11

> "Because the datasets are simulated, the true underlying ROAS is known and the model output can be compared to a ground truth." — Chan & Perry (2017), §5.6, p. 15

The raw file also records their suggestion that advertisers give vendors simulated data "where the ground truth is known but withheld" to evaluate the modelling process.

## Implications for Model Validation

- **Count the data, then count the parameters.** For any model of weekly KPIs, compare the number of observations per segment with the number of parameters and candidate features considered ([[Riley et al 2020 - Sample Size for Prediction Models]]).
- **Use time-respecting holdouts**, not random K-fold splits, and recognise that forecast accuracy does not validate attribution ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]).
- **Treat spend as potentially endogenous.** Inputs that follow demand will look important to any predictive model.
- **Blind simulation tests are a strong validation gate:** a pipeline that cannot recover known effects from realistic simulated data should not be trusted on real data ([[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]]).
- **Calibrate against experiments** wherever possible ([[Gordon et al 2019 - Advertising Measurement at Facebook]]).

## Connections

- Companion Google papers: [[Bayesian Media Mix Modeling - Overview]] (Jin et al. 2017 — models bias at two years of weekly data) and [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]].
- Faint signal relative to noise: [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]].
- Spurious time-series correlation: [[Granger and Newbold 1974 - Spurious Regressions]], [[Yule 1926 - Nonsense Correlations Between Time Series]].
- Instability of variable importance among correlated inputs: [[Strobl et al 2008 - Conditional Variable Importance]], [[Meinshausen and Buhlmann 2010 - Stability Selection]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — the MMM specification these challenges apply to
- [[MMM Model Selection and Application]] — near-identical fits, different implications
- [[ROAS, mROAS, and Optimal Media Mix]] — the downstream quantities whose reliability is at stake
- [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]] — how to design the simulation validation
- [[Single Marketing Time Series]] — time-series properties of weekly marketing data
