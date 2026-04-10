---
title: "Posterior Predictive Distribution"
aliases:
  - "posterior predictive"
  - "predictive distribution"
tags:
  - concept/definition
  - topic/bayesian-statistics
  - topic/prediction
  - topic/model-checking
created: 2026-04-09
---

# Posterior Predictive Distribution

## Definition

> [!abstract] Definition (BDA3 Eq. 1.4)
> The **posterior predictive distribution** is the distribution of a future observable $\tilde{y}$, conditional on the observed data $y$:
>
> $$p(\tilde{y}|y) = \int p(\tilde{y}|\theta)p(\theta|y)\,d\theta$$
>
> It is an average of conditional predictions $p(\tilde{y}|\theta)$ over the [[Posterior Distribution|posterior distribution]] of $\theta$.

## Derivation

Starting from the joint:
$$p(\tilde{y}|y) = \int p(\tilde{y}, \theta|y)\,d\theta = \int p(\tilde{y}|\theta, y)p(\theta|y)\,d\theta$$

The last step uses the assumed conditional independence of $y$ and $\tilde{y}$ given $\theta$:
$$p(\tilde{y}|\theta, y) = p(\tilde{y}|\theta)$$

## Interpretation

- Provides predictions that properly account for **parameter uncertainty** (unlike plug-in predictions that use a single point estimate of $\theta$)
- The posterior predictive distribution is typically wider than $p(\tilde{y}|\hat{\theta})$ because it integrates over uncertainty in $\theta$
- It is "posterior" because it conditions on observed data, and "predictive" because it predicts an observable

## Uses

1. **Prediction**: forecasting future observations
2. **Model checking**: comparing observed data to replicated data from the model (see [[Posterior Predictive Checking]])
3. **Decision making**: evaluating expected outcomes under different actions

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- formal definition
- [[Prior Predictive Distribution]] -- the analogous concept before observing data
- [[BDA3 - Ch06 - Model Checking]] -- posterior predictive checks
