---
title: "Gordon et al 2019 - Advertising Measurement at Facebook"
tags:
  - source/ingested
  - topic/model-validation
  - topic/advertising-measurement
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Marketing Science 38(2), 193–225; quotes checked against author manuscript (12 Apr 2018), Abstract and p. 2"
citation: "Gordon, B. R., Zettelmeyer, F., Bhargava, N. & Chapsky, D. (2019). A comparison of approaches to advertising measurement: Evidence from big field experiments at Facebook. Marketing Science, 38(2), 193–225."
date_ingested: 2026-10-13
folder: "Model Validation/Advertising Measurement"
doc_type: paper
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Propensity Score Matching - Overview]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Blake et al 2015 - Paid Search Effectiveness Field Experiment]]"
used_by:
  - "[[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
aliases:
  - "Gordon Zettelmeyer Bhargava Chapsky 2019"
  - "A comparison of approaches to advertising measurement"
  - "Facebook lift study comparison"
---

# Gordon et al 2019 - Advertising Measurement at Facebook

> [!summary]
> Gordon, Zettelmeyer, Bhargava & Chapsky take a set of large randomized advertising experiments run on Facebook and ask whether standard observational methods, applied to the same campaigns with rich individual-level data, recover the experimental lift. They largely do not: in half the studies the estimated lift is off by a factor of three or more, with errors in both directions and no method reliably better. The result is direct evidence that causal claims from observational ad models need experimental validation, even when the data are unusually rich.

## Overview

**Citation:** Gordon, B. R., Zettelmeyer, F., Bhargava, N. & Chapsky, D. (2019). *Marketing Science* 38(2), 193–225.

**Research question:** Industry practice measures advertising effectiveness mostly with observational data — comparing exposed and unexposed users after adjusting for observed characteristics. How close do these methods get to the truth, as measured by a randomized controlled trial on the same campaign?

**Setting:** Facebook's "conversion lift" product randomly assigns users to a test group (eligible to see the campaign) and a control group (held out). Because assignment is random, the test–control comparison identifies the causal effect. The authors use 15 US campaigns across several industries, with very large samples, and outcomes such as purchases/checkouts, registrations and key page views tracked by advertiser pixels.

## Main Content

### Design: an internal benchmark

Within each experiment, the **test group** contains both exposed users (who actually saw the ad) and unexposed users (eligible but not reached). The RCT estimate of the average treatment effect on the treated is obtained from the intent-to-treat difference scaled by the exposure rate. The observational exercise discards the control group and tries to recover the same quantity by comparing exposed vs unexposed users *within the test group* — exactly the comparison an advertiser without an experiment would make. Since the true answer is known, each method's error can be measured directly.

> [!definition] Lift and its experimental estimator
> Let $Z\in\{0,1\}$ be random assignment, $W\in\{0,1\}$ actual exposure (only possible if $Z=1$), and $Y$ a conversion outcome. The intent-to-treat effect is $\text{ITT} = E[Y\mid Z=1] - E[Y\mid Z=0]$. With one-sided non-compliance (control users cannot be exposed), the effect on the exposed is
> $$ \text{ATT} = \frac{E[Y\mid Z=1] - E[Y\mid Z=0]}{P(W=1\mid Z=1)}, $$
> and **lift** is the ATT expressed as a percentage of the counterfactual conversion rate of exposed users. Observational methods instead estimate $E[Y\mid W=1] - E[Y\mid W=0]$ after adjusting for covariates $X$, which is unbiased only if exposure is independent of potential outcomes given $X$.
^def-lift-att

### Observational methods compared

Methods applied to the exposed-vs-unexposed comparison included simple exposed/unexposed differences, exact matching, propensity-score matching, stratification and regression adjustment, inverse-probability weighting, and doubly robust estimators (combining an outcome model with propensity weighting). Covariates ranged from basic demographics to rich Facebook-specific user activity variables.

### Results

- Observational estimates were frequently far from the RCT benchmark; in half the studies the estimated percentage lift was off by a factor of three or more across all methods.
- Errors were usually **overestimates** but not always; the direction and size of bias varied by campaign, so no single correction factor could fix them.
- More sophisticated estimators and richer covariates sometimes helped but did not reliably close the gap. The problem is unobserved selection: ad delivery algorithms target users who are likely to convert, and the drivers of that targeting are only partly in the analyst's covariates.
- The authors conclude that observational approaches based on data typically available in industry often fail, and that they are no substitute for experiments when the goal is a causal effect.

## Key Passages

> "The bias can be large: in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods." — Gordon et al. (2019), p. 2

> "Our findings suggest that commonly used observational approaches based on the data usually available in the industry often fail to accurately measure the true effect of advertising." — Gordon et al. (2019), Abstract

## Implications for Model Validation

- **Validate against randomized truth where it exists.** Any model that outputs incremental effects, ROI, or "what would happen if spend changed" should be benchmarked against lift tests or geo experiments; agreement with intuition is not evidence.
- **Better estimators and more features are not a fix for confounding.** Rich-feature ML models fitted to observational data inherit the same selection problem; adding covariates can even make a confident wrong answer look more credible.
- **Bias is campaign-specific.** Because error direction and size vary across studies, one cannot calibrate an observational model once and reuse a correction factor; validation must be ongoing.
- **The "within-test-group" design is a template.** When a randomized holdout is available, re-estimate the model as if it were not and measure the discrepancy — a direct test of the observational pipeline.

## Connections

- Earlier search-advertising evidence of the same failure: [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]] and display-ad evidence in [[Activity Bias in Advertising]].
- Why even the RCT estimates are noisy and why small selection effects dominate: [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]].
- Aggregate (MMM) analogue of ad-targeting selection bias: [[Chan and Perry 2017 - Challenges in Media Mix Modeling]].
- Feature attributions of observational models are not causal: [[Dillon et al - SHAP Predictive Models and Causal Insights]].
- When no experiment is available, simulated ground truth: [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]], [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]].

## See Also

- [[Observational vs Experimental Methods in Advertising]] — vault overview of the debate
- [[Propensity Score Matching - Overview]] — one of the methods benchmarked
- [[Conditional Independence Assumption]] — the assumption the observational methods require
- [[The Experimental Ideal]] — the benchmark logic
- [[The Selection Problem]] — mechanism behind the bias
