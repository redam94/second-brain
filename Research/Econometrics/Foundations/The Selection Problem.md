---
title: The Selection Problem
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/selection-bias
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Foundations"
doc_type: concept
source_location: "MHE Ch. 2, pp. 9-17"
depends_on:
  - "[[Research Questions in Econometrics]]"
  - "[[Mostly Harmless Econometrics - Overview]]"
used_by:
  - "[[The Experimental Ideal]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Instrumental Variables]]"
  - "[[Differences-in-Differences]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - selection bias
  - potential outcomes framework
  - ATT
---

# The Selection Problem

> [!summary]
> Selection bias arises because individuals who receive treatment differ systematically from those who don't, even in the absence of treatment. This is the fundamental challenge that all causal inference methods aim to overcome.

## Potential Outcomes Framework

For individual $i$ with treatment $D_i \in \{0, 1\}$:
- $Y_{0i}$: outcome without treatment
- $Y_{1i}$: outcome with treatment
- Causal effect: $Y_{1i} - Y_{0i}$ (never directly observed for any individual)

The observed outcome:
$$Y_i = Y_{0i} + (Y_{1i} - Y_{0i})D_i$$

## The Decomposition

$$E[Y_i|D_i=1] - E[Y_i|D_i=0] = \underbrace{E[Y_{1i}-Y_{0i}|D_i=1]}_{\text{ATT}} + \underbrace{E[Y_{0i}|D_i=1] - E[Y_{0i}|D_i=0]}_{\text{selection bias}}$$

> [!warning] Selection Bias Can Be Large
> In the hospital example, selection bias is *negative* (sick people seek hospitals) and large enough to completely mask a positive treatment effect — making hospitals appear harmful.

## Solutions

| Method | How it addresses selection bias |
|--------|-------------------------------|
| [[The Experimental Ideal\|Random assignment]] | Makes $D_i$ independent of potential outcomes |
| [[Conditional Independence Assumption\|CIA/Matching]] | Controls for observables that drive selection |
| [[Instrumental Variables\|IV]] | Uses exogenous variation in treatment |
| [[Differences-in-Differences\|DD/Fixed effects]] | Controls for time-invariant unobservables |
| [[Regression Discontinuity Designs\|RD]] | Exploits arbitrary assignment rules |

## See Also

- [[The Experimental Ideal]]
- [[Omitted Variables Bias]]
- [[Mostly Harmless Econometrics - Overview]]
- [[Data Collection Models]] — Bayesian treatment of ignorability and selection mechanisms
- [[Synthetic Control Extensions]] — penalized and matrix completion methods that address selection when pre-treatment fit is imperfect
- [[Xu 2016 - Overview]] — GSC as a general solution to the selection problem under time-varying confounding
- [[Synthetic Control Inference and Diagnostics]] — permutation inference for the synthetic control estimator that addresses selection
