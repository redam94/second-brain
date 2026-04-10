---
title: "Likelihood Principle"
aliases:
  - "likelihood principle"
tags:
  - concept/principle
  - topic/bayesian-statistics
  - topic/statistical-inference
created: 2026-04-09
---

# Likelihood Principle

## Statement

> [!abstract] Definition
> The **likelihood principle** states that all the information about the parameter $\theta$ contained in the observed data $y$ is captured by the [[Likelihood Function|likelihood function]] $p(y|\theta)$. Two datasets yielding proportional likelihood functions should lead to the same inferences about $\theta$.

## In Bayesian Inference

Bayesian inference automatically obeys the likelihood principle, because the data enter the posterior only through the likelihood:

$$p(\theta|y) \propto p(\theta) \cdot p(y|\theta)$$

## Caveats

As noted in [[BDA3 - S1.3 - Bayesian Inference]]:
- The principle is reasonable *within* the framework of the chosen model or family of models
- In practice, one can rarely be confident that the chosen model is correct
- Sampling distributions (which go beyond the likelihood) play an important role in checking model assumptions (see [[BDA3 - Ch06 - Model Checking]])

## Contrast with Frequentist Approach

Frequentist methods often violate the likelihood principle -- for example, the interpretation of a p-value depends on the stopping rule used in data collection, even if two stopping rules produce the same data and the same likelihood function.

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- discussion in context
- [[Likelihood Function]] -- the central concept
