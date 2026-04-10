---
title: "Likelihood Function"
aliases:
  - "Likelihood"
  - "likelihood function"
  - "likelihood"
tags:
  - concept/definition
  - topic/bayesian-statistics
  - topic/statistical-inference
created: 2026-04-09
---

# Likelihood Function

## Definition

> [!abstract] Definition
> The **likelihood function** is the sampling distribution $p(y|\theta)$ regarded as a function of $\theta$ for fixed observed data $y$. It measures how "likely" different parameter values are to have generated the observed data.

## Role in Bayesian Inference

In [[Bayes' Theorem]], the data $y$ affect the [[Posterior Distribution|posterior]] inference *only* through the likelihood function:

$$p(\theta|y) \propto p(\theta) \cdot \underbrace{p(y|\theta)}_{\text{likelihood}}$$

## Likelihood Principle

> [!abstract] Definition: Likelihood Principle
> The **likelihood principle** states that all the information about $\theta$ contained in the data $y$ is captured by the likelihood function $p(y|\theta)$. Two datasets that produce proportional likelihood functions should lead to the same inferences about $\theta$.

Bayesian inference automatically obeys the likelihood principle. However, this principle is reasonable only within the framework of the chosen model. Sampling distributions can still play an important role in checking model assumptions.

## Likelihood vs. Probability

- The likelihood $L(\theta) = p(y|\theta)$ is a function of $\theta$, not a probability distribution over $\theta$
- It does not integrate to 1 over $\theta$ in general
- The likelihood ratio $p(y|\theta_1)/p(y|\theta_2)$ measures the relative support the data provide for $\theta_1$ versus $\theta_2$

## Likelihood Ratio

$$\frac{p(y|\theta_1)}{p(y|\theta_2)}$$

The posterior odds equal the prior odds multiplied by the likelihood ratio (Eq. 1.5 in BDA3).

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- formal introduction
- [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]] -- discrete likelihood examples
- [[Bayes' Theorem]] -- how likelihood combines with prior
