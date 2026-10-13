---
title: "Blake et al 2015 - Paid Search Effectiveness Field Experiment"
tags:
  - source/ingested
  - topic/model-validation
  - topic/advertising-measurement
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Econometrica 83(1), 155–174; quotes checked against NBER Working Paper 20171 (May 2014), p. 5"
citation: "Blake, T., Nosko, C. & Tadelis, S. (2015). Consumer heterogeneity and paid search effectiveness: A large-scale field experiment. Econometrica, 83(1), 155–174."
date_ingested: 2026-10-13
folder: "Model Validation/Advertising Measurement"
doc_type: paper
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[The Selection Problem]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Gordon et al 2019 - Advertising Measurement at Facebook]]"
  - "[[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
aliases:
  - "Blake Nosko Tadelis 2015"
  - "Consumer heterogeneity and paid search effectiveness"
  - "eBay paid search experiment"
---

# Blake et al 2015 - Paid Search Effectiveness Field Experiment

> [!summary]
> Using large-scale field experiments at eBay, Blake, Nosko & Tadelis show that paid search advertising returns were strongly negative (experimental ROI of −63%), while standard OLS regressions on the same kind of observational data produced ROIs of +1,400% to +4,100%. The paper is a canonical demonstration that a plausible-looking, well-controlled observational model of advertising can have the wrong sign and be off by orders of magnitude — so model output must be validated against experimental ground truth, not judged by plausibility.

## Overview

**Citation:** Blake, T., Nosko, C. & Tadelis, S. (2015). *Econometrica* 83(1), 155–174 (NBER WP 20171, 2014).

**Research question:** Does paid search (sponsored links on search engines) causally increase sales for a large, well-known retailer, and for whom? At the time, eBay was one of the largest buyers of search advertising, and the industry standard for evaluating it was attribution of clicks-to-purchases or regressions of sales on spend. Those methods confound the ad's effect with the consumer's pre-existing intent: people who search "eBay shoes" and click an ad were usually going to buy on eBay anyway. This is the paid-search version of the [[The Selection Problem|selection problem]] and of [[Activity Bias in Advertising|activity bias]].

## Main Content

### Two experiments

1. **Brand-keyword search.** eBay stopped bidding on brand keywords (queries containing "eBay") on some search engines (Microsoft/Yahoo), keeping them on Google as a comparison. Almost all of the lost paid clicks were recovered through the **organic** search result directly beneath the ad: users who type the brand name substitute to the free link. The incremental value of brand-keyword ads was close to zero.
2. **Non-brand keyword search.** eBay switched off non-brand keyword advertising (e.g. product terms) in a randomly selected set of US Designated Market Areas (DMAs) while continuing in the rest — a **geo-randomized** experiment. Comparing treated and control DMAs gives a causal estimate of the effect of paid search on sales.

### Main results

- The average effect of non-brand paid search on sales was small and the implied return on investment was strongly **negative**: about **−63%**, with a 95% confidence interval of roughly −124% to −3%.
- **Heterogeneity:** the effect was concentrated among new and infrequent users, who may not know eBay sells the item. Frequent, recent buyers — who account for most of the clicks and therefore most of the spend — were essentially unaffected; their purchases would have happened anyway. Paid search was being "bought" mostly for consumers whose behaviour it does not change.
- **Observational benchmark:** OLS regressions of sales on paid-search spend, using the kind of data a marketer would have outside an experiment, gave ROIs of over **4,100%** without time and geographic controls and over **1,400%** with them. Adding controls reduced the bias but left the estimate wildly wrong in sign and magnitude.

> [!definition] Return on investment for an ad channel
> For incremental revenue $\Delta R$ caused by the ad (the difference between actual revenue and the counterfactual revenue without the ad), gross margin applied as appropriate, and ad cost $C$:
> $$ \text{ROI} = \frac{\Delta R - C}{C}. $$
> An ROI of $-100\%$ means the spend generated nothing; $-63\%$ means each dollar returned about 37 cents. The crucial quantity is the *counterfactual* $\Delta R$ — which observational regressions estimate by assuming spend is as-good-as-random conditional on controls.
^def-ad-roi

### Why the regressions fail

Spend on paid search is endogenous: bids and impressions scale with search volume, which scales with underlying demand. When demand is high (seasonally, regionally, or for a user who already intends to buy), both spend and sales are high. Time and geography fixed effects remove only part of this; the remaining demand variation within a week and market still loads onto the spend coefficient. This is a textbook case of [[Omitted Variables Bias]] and a violated [[Conditional Independence Assumption]].

## Key Passages

> "we calculate Return on Investment (ROI) using typical OLS methods, which result in a ROI of over 4,100% without time and geographic controls, and a ROI of over 1,400% with such controls." — Blake, Nosko & Tadelis (2015), p. 5 (NBER WP version)

The raw file records the experimental ROI as −63% (95% CI −124% to −3%).

## Implications for Model Validation

- **Plausibility is not validation.** A positive, significant ROI from a regression with sensible controls looked reasonable and was badly wrong; the only reliable check was a randomized holdout.
- **Model rankings of drivers can mislead in the same way.** A predictive model of weekly KPIs will rank paid search (or any demand-following input) as highly "important" because it tracks demand, not because it causes sales — see [[Dillon et al - SHAP Predictive Models and Causal Insights]].
- **Heterogeneity matters for decisions.** Average effects can hide the fact that most spend falls on unresponsive segments; per-segment models need per-segment causal evidence.
- **Geo experiments are a practical ground truth.** Randomizing spend across regions is feasible for many advertisers and gives an external benchmark against which observational models (including MMMs) can be scored.
- **Controls reduce but do not remove bias.** Adding fixed effects moved the estimate by a factor of ~3 yet left it off by more than an order of magnitude — sensitivity of an estimate to controls is a warning sign, not reassurance.

## Connections

- Same pattern, display ads: [[Activity Bias in Advertising]] (Lewis, Rao & Reiley 2011) and [[Gordon et al 2019 - Advertising Measurement at Facebook]].
- Why even experiments struggle to estimate ROI precisely (note the very wide CI here): [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]].
- Selection bias from ad targeting in aggregate models: [[Chan and Perry 2017 - Challenges in Media Mix Modeling]].
- Using simulated ground truth when experiments are unavailable: [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]].
- Predictive importance vs causal effect: [[Kumar et al 2020 - Problems with Shapley-Value Explanations]], [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]].

## See Also

- [[Observational vs Experimental Methods in Advertising]] — broader comparison of the two approaches
- [[The Experimental Ideal]] — why randomization identifies the causal effect
- [[The Selection Problem]] — the bias mechanism behind the 1,400–4,100% ROI
- [[Omitted Variables Bias]] — formal account of why adding controls only partly helps
- [[Bayesian Media Mix Modeling - Overview]] — aggregate models that face the same endogeneity of spend
