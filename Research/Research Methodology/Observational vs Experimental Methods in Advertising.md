---
title: "Observational vs Experimental Methods in Advertising"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/causal-inference
  - topic/advertising
  - topic/selection-bias
  - type/concept
  - doc/paper
source: "[[raw/ssrn-2080235.pdf]]"
date_ingested: 2026-04-08
folder: "Research Methodology"
aliases:
  - "Advertising causal inference"
doc_type: concept
source_location: "ssrn-2080235.pdf pp. 1-30"
depends_on:
  - "[[Activity Bias in Advertising]]"
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Regression and the CEF]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[Bayesian Difference in Differences]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[User-Level Ad Experiments - Overview]]"
---

# Observational vs Experimental Methods in Advertising

> [!summary]
> The three experiments in [[Activity Bias in Advertising]] provide a powerful case study of observational methods failing spectacularly. Even sophisticated regression and matching techniques cannot recover the true causal effect when the fundamental selection mechanism is violated.

## The Failure of Regression Controls

From Experiment 1 (Table 2 in the paper):

| Model | Controls | Estimated Effect |
|-------|----------|-----------------|
| (0) | None | 1198% |
| (1) | Day dummies | 894% |
| (2) | + Session dummies | 871% |
| (3) | + Page views, minutes spent | 872% |
| **Truth** | **RCT** | **5.4%** |

Adding more controls barely reduces the bias. The fundamental problem: ad exposure is a proxy for being an active internet user on that day, and no set of behavioral controls fully captures this.

## Why Matching Fails

- **Propensity score matching** tries to find "similar" users who were/weren't exposed
- But in display advertising, exposure is determined by visiting specific pages
- The "matched" control group is fundamentally different from the treatment group in unobserved ways
- This is precisely the [[The Selection Problem|selection problem]] — exposed users are selected on activity

## Implications for Practice

1. **RCTs are essential** for measuring advertising effectiveness — observational estimates are not just noisy but systematically biased upward
2. **Activity bias** is not unique to advertising — any setting where exposure correlates with baseline activity will have similar issues
3. **The magnitude of bias** can be enormous (100x+), not just a modest overestimate
4. **More data doesn't help** if the identification strategy is wrong — this is a bias problem, not a variance problem

## Connection to Econometrics

This paper provides a vivid illustration of concepts from [[Regression and the CEF]] and [[Instrumental Variables]]. The failure here is that there is no valid instrument and the [[Conditional Independence Assumption]] is violated. The experimental design (random assignment of ad exposure) is the only reliable solution.

## See Also

- [[Activity Bias in Advertising]] — the paper overview and three experiments
- [[The Experimental Ideal]] — why randomization is the gold standard
- [[Differences-in-Differences]] — another strategy that could potentially help
- [[Data Collection Models]] — the ignorability conditions that are violated here
- [[Omitted Variables Bias]] — the econometric framing of what goes wrong in the regression tables above
- [[Nonparametric Causal Inference]] — Bayesian nonparametric (BART + propensity score) approaches to causal ATE/ATT estimation
- [[Bayesian Difference in Differences]] — Bayesian counterfactual framing of DiD that could be applied to advertising holdout experiments
- [[Type S and Type M Errors]] — the 1198% observational estimate vs 5.4% RCT is a textbook Type M error; the exaggeration ratio of ≈220× illustrates the scale of bias that can arise from violated identification assumptions
- [[User-Level Ad Experiments - Overview]] — how the experimental alternative is actually designed and analysed
