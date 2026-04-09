---
title: "Activity Bias in Advertising"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/causal-inference
  - topic/advertising
  - topic/activity-bias
source: "[[raw/ssrn-2080235.pdf]]"
date_ingested: 2026-04-08
folder: "Research Methodology"
aliases:
  - "Activity bias"
  - "Lewis Rao Reiley"
---

# Activity Bias in Advertising

> [!summary]
> Lewis, Rao, & Reiley (2011) demonstrate that observational methods massively overestimate the causal effects of online advertising. The key mechanism is **activity bias**: users who are exposed to ads are inherently more active online, and this correlated activity is misattributed to the ad.

## Three Experiments

### Experiment 1: Effects on Searches
- Large display ad campaign on Yahoo! Front Page
- **True effect** (from RCT): 5.4% increase in brand-related searches
- **Observational estimate**: 1198% increase (with no controls) to 872% (with all controls)
- Even with day dummies, session dummies, page views, and minutes spent as controls, observational methods overestimate by ~160x

### Experiment 2: Page Views
- Similar campaign tracking page views on advertiser's Yahoo! content
- Observational methods again showed large overestimates
- The "competitive effect" (supposedly driven by ad exposure) was minimal

### Experiment 3: Account Sign-ups
- Tracked sign-ups at a competitor website
- Control group showed the same spike in activity on the campaign day
- The observed correlation was entirely due to activity bias, not advertising

## Why Observational Methods Fail

> [!warning]
> The core problem is a violation of the [[Conditional Independence Assumption]]: ad exposure is correlated with browsing activity through unobserved confounders that cannot be controlled for, no matter how many observables are included.

- Users exposed to ads on a given day are **inherently more active** that day
- This activity bias affects *all* outcome measures — searches, page views, purchases
- Propensity score matching and regression with controls cannot fix this because the confounders (general online activity level) are too entangled with exposure

## See Also

- [[Observational vs Experimental Methods in Advertising]] — deeper analysis of why controls fail
- [[The Selection Problem]] — the fundamental challenge these experiments illustrate
- [[The Experimental Ideal]] — why RCTs are essential here
- [[Omitted Variables Bias]] — the formal framework for this bias
