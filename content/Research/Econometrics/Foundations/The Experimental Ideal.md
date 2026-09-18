---
title: The Experimental Ideal
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/experiments
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Foundations"
doc_type: concept
source_location: "MHE Ch. 2, pp. 9-17"
depends_on:
  - "[[The Selection Problem]]"
  - "[[Research Questions in Econometrics]]"
  - "[[Regression and the CEF]]"
used_by:
  - "[[Conditional Independence Assumption]]"
  - "[[Instrumental Variables]]"
  - "[[Differences-in-Differences]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Randomization Inference - Overview]]"
  - "[[Online Experimentation - Overview]]"
  - "[[CUPED and Regression-Adjusted Variance Reduction]]"
  - "[[Interference and Marketplace Experiments]]"
  - "[[Sample Ratio Mismatch and Trustworthiness Checks]]"
---

# The Experimental Ideal

> [!summary]
> Randomized experiments provide the gold standard for causal inference because random assignment eliminates selection bias. The chapter uses the Tennessee STAR experiment as an exemplary case study.

## The Selection Problem

The core challenge: comparing outcomes between treated and untreated groups conflates the **causal effect** with **[[The Selection Problem|selection bias]]**.

Observed difference = Average treatment effect on the treated + Selection bias

$$
E[Y_i|D_i=1] - E[Y_i|D_i=0] = \underbrace{E[Y_{1i}-Y_{0i}|D_i=1]}_{\text{ATT}} + \underbrace{E[Y_{0i}|D_i=1] - E[Y_{0i}|D_i=0]}_{\text{selection bias}}
$$

The hospital example illustrates: people who go to hospitals are sicker to begin with, making hospitals *appear* harmful in naive comparisons.

## Random Assignment Solves Selection Bias

When treatment $D_i$ is randomly assigned, potential outcomes are independent of treatment status:

$$
E[Y_i|D_i=1] - E[Y_i|D_i=0] = E[Y_{1i} - Y_{0i}]
$$

This gives us the **average treatment effect (ATE)** — the effect on a randomly chosen person.

## The Tennessee STAR Experiment

- $12M randomized trial (1985/86) with ~11,600 children
- Assigned students to: small classes (13-17), regular (22-25), or regular with aide
- Small classes raised test scores by **5-6 percentile points** (~0.2σ)
- Balance checks confirm randomization worked (no significant differences in demographics)

## Regression Analysis of Experiments

With constant treatment effects $\rho$:

$$
Y_i = \alpha + \rho D_i + \eta_i
$$

- Random assignment makes $E[\eta_i|D_i] = 0$, so OLS estimates $\rho$
- Adding covariates $X_i$ doesn't change the estimate but **reduces standard errors**

## See Also

- [[Mostly Harmless Econometrics - Overview]]
- [[The Selection Problem]]
- [[Regression and the CEF]]
- [[Data Collection Models]] — randomized experiments ensure Bayesian ignorability by design
- [[Forking Paths and Bayesian Approaches]] — how randomization complements Bayesian approaches to inference
- [[Omitted Variables Bias]] — the confounding mechanism that randomization eliminates by design
- [[Multiple Testing Corrections]] — multiple comparisons inflate false positives even in well-designed experiments
- [[Regression Discontinuity Designs]] — the local experiment analogue: credible quasi-experimental identification near a threshold
- [[Multiple Comparisons - Bayesian Perspective]] — even well-designed experiments face multiplicity; Bayesian multilevel models handle it structurally
- [[Randomization Inference - Overview]] — inference that follows directly from the randomization this note motivates
