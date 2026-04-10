---
title: "Bayes' Theorem"
aliases:
  - "Bayes' Rule"
  - "Bayes Rule"
  - "Bayes Theorem"
  - "Bayesian updating"
tags:
  - concept/theorem
  - topic/bayesian-statistics
  - topic/probability
created: 2026-04-09
---

# Bayes' Theorem

## Statement

> [!theorem] Bayes' Theorem
> Given a parameter $\theta$ and observed data $y$ with a joint distribution $p(\theta, y) = p(\theta)p(y|\theta)$:
>
> $$p(\theta|y) = \frac{p(\theta)p(y|\theta)}{p(y)}$$
>
> where $p(y) = \int p(\theta)p(y|\theta)\,d\theta$ is the marginal likelihood (normalizing constant).

## Unnormalized Form

In practice, the normalizing constant $p(y)$ is often difficult to compute. The unnormalized form is:

$$p(\theta|y) \propto p(\theta) \cdot p(y|\theta)$$

In words:
$$\text{posterior} \propto \text{prior} \times \text{likelihood}$$

## Components

| Component | Symbol | Role |
|-----------|--------|------|
| [[Prior Distribution]] | $p(\theta)$ | Encodes beliefs about $\theta$ before observing data |
| [[Likelihood Function]] | $p(y\|\theta)$ | Probability of observed data given parameter values |
| [[Posterior Distribution]] | $p(\theta\|y)$ | Updated beliefs about $\theta$ after observing data |
| Marginal likelihood | $p(y)$ | Normalizing constant; used in model comparison |

## Odds Form

For comparing two parameter values:
$$\frac{p(\theta_1|y)}{p(\theta_2|y)} = \frac{p(\theta_1)}{p(\theta_2)} \cdot \frac{p(y|\theta_1)}{p(y|\theta_2)}$$

**Posterior odds = Prior odds x Likelihood ratio**

## Key Properties

- **Sequential updating**: the posterior from one analysis becomes the prior for the next batch of data
- **Coherence**: Bayesian updating is the unique coherent method of updating beliefs
- The data affect inference *only* through the [[Likelihood Function]] ([[Likelihood Principle]])

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- formal derivation and context
- [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]] -- worked examples
