---
title: "Choosing and Building Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Workflow"
doc_type: concept
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Bayesian Workflow - Overview]]"
  - "[[Hierarchical Models]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Fitting and Validating Computation]]"
  - "[[Iterative Model Improvement]]"
  - "[[Modeling as Software Development]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
aliases:
  - choosing and building Bayesian models
  - prior predictive checks workflow
  - model construction Bayesian workflow
---

> [!summary]
> Before fitting a model, the Bayesian workflow involves choosing a starting point, constructing the model modularly, scaling parameters for interpretability, performing prior predictive checks, and deciding on the generative scope of the model. These steps (Section 2 of Gelman et al., 2020) set the foundation for everything that follows.

## Choosing an Initial Model

The starting point for most analyses is adapting a model from a textbook, case study, or published paper applied to a similar problem. This is analogous to the *software design pattern* concept in engineering. Templates save time in model building and computing, and they provide useful starting points and comparison baselines.

Sometimes we start simple and add features; other times we start with a complex model and strip it down. The key insight is that model choice is provisional -- we expect to revise.

## Modular Construction

A Bayesian model is built from **modules** which can be viewed as replaceable placeholders:

- Swap a normal distribution for a $t$-distribution or mixture
- Replace a linear regression function with nonlinear splines or Gaussian processes
- Start with a weak prior, then strengthen it if the posterior shows unrealistic values

This modular thinking reduces pressure during initial model building because you can always go back and generalize or add information as necessary. See [[Hierarchical Models]] for a common modular pattern.

## Scaling and Transforming Parameters

Parameters should be put on **interpretable, roughly unit scales**. For example, if a parameter is expected to be around 50, model on $\log(\theta/50)$ so that 0 is interpretable. This serves two purposes:

1. **Ease of interpretation** for setting priors
2. **Effective hierarchical modeling** -- partial pooling works better on scale-free parameters

Common transformations include logarithmic, logit, and standardization ($z(v) = (v - \text{mean}(v))/\text{sd}(v)$).

## Prior Predictive Checking

Prior predictive checks simulate data from the model *before* observing real data, using only the prior $p(\theta)$ and the generative model $p(y|\theta)$. This reveals whether chosen priors imply sensible data ranges.

> [!warning] High-Dimensional Prior Implications
> Even independent $\text{normal}(0,1)$ priors on individual logistic regression coefficients become strongly informative as the number of predictors increases -- pushing predicted probabilities toward 0 or 1. Joint priors on outcomes can control this.

## Generative vs. Partially Generative Models

Fully Bayesian analysis requires a **generative model** -- a joint distribution $p(y, \theta)$. However, many practical models are only *partially generative* (e.g., regression models conditioned on predictors $x$ without modeling $x$ itself). The distinction matters for predictive simulation and [[Model Checking]].

## Related Notes

- [[Bayesian Workflow - Overview]] | [[Fitting and Validating Computation]]
- [[Model Checking]] | [[Hierarchical Models]]
