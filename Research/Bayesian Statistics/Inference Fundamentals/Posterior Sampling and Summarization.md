---
title: "Posterior Sampling and Summarization"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/posterior-inference
  - topic/prediction
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Sampling the imaginary"
  - "HPDI"
  - "Posterior predictive distribution"
  - "Loss functions"
---

# Posterior Sampling and Summarization

> [!summary]
> Chapter 3 of Statistical Rethinking shows how to work with posterior distributions using samples. Three tasks: (1) summarizing with intervals and point estimates, (2) simulating predictions via the posterior predictive distribution, and (3) model checking through posterior predictive checks.

## Working with Samples

The fundamental tool: draw samples from the posterior, then manipulate those samples. This transforms integral calculus into data summary:
- Probability of $p < 0.5$? → count samples below 0.5
- 89% credible interval? → find quantiles of samples
- Expected prediction? → simulate data for each sample

## Summarizing the Posterior

### Intervals

| Type | Definition | Property |
|------|-----------|----------|
| **Percentile interval (PI)** | Central quantiles (e.g., 5.5% and 94.5%) | Equal mass in each tail |
| **Highest posterior density interval (HPDI)** | Narrowest interval containing X% of mass | Always includes the mode |

> [!tip] When PI and HPDI Disagree
> If the two intervals differ substantially, don't rely on either — plot the entire posterior instead. The posterior *is* the estimate.

### Point Estimates and Loss Functions

Different loss functions imply different point estimates:
- **Absolute loss** $|d - p|$ → **median** minimizes expected loss
- **Quadratic loss** $(d - p)^2$ → **mean** minimizes expected loss
- **Zero-one loss** → **mode** (MAP) minimizes expected loss

McElreath's key insight: you rarely *need* a point estimate. The entire posterior distribution is the Bayesian answer.

## Posterior Predictive Distribution

Two sources of uncertainty in predictions:
1. **Parameter uncertainty** — the posterior distribution over $\theta$
2. **Observation uncertainty** — the sampling process given $\theta$

The **posterior predictive distribution** integrates over both:

$$p(y^{\text{new}} | y) = \int p(y^{\text{new}} | \theta) \, p(\theta | y) \, d\theta$$

In practice: for each posterior sample of $\theta$, simulate an observation → the collection of simulated observations *is* the posterior predictive distribution.

## Model Checking

Use posterior predictive checks to assess model adequacy — compare simulated data to observed data on various dimensions. If the model fits well, simulated data should "look like" the real data.

> [!warning] A model can fit the observed summary (e.g., total count) while failing on other aspects (e.g., longest run, number of switches). Always check multiple summary statistics.

## See Also

- [[Model Checking]] — BDA3's formal treatment of posterior predictive checks (Ch 6)
- [[Decision Analysis]] — BDA3's treatment of loss functions and optimal decisions
- [[Garden of Forking Data]] — building the posterior that this chapter summarizes
- [[Bayesian Workflow - Overview]] — the iterative cycle of fitting, checking, and revising
- [[Statistical Rethinking - Overview]]
