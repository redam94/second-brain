---
title: "Prior Predictive Distribution"
aliases:
  - "prior predictive"
  - "marginal likelihood"
  - "marginal distribution of y"
tags:
  - concept/definition
  - topic/bayesian-statistics
  - topic/prediction
created: 2026-04-09
---

# Prior Predictive Distribution

## Definition

> [!abstract] Definition (BDA3 Eq. 1.3)
> The **prior predictive distribution** is the marginal distribution of the data $y$, obtained by averaging the sampling distribution over the prior:
>
> $$p(y) = \int p(\theta)p(y|\theta)\,d\theta$$
>
> It is called "prior" because it is not conditional on a previous observation of the process, and "predictive" because it is the distribution for an observable quantity.

## Interpretation

- Represents what data we would expect to observe *before* seeing any data, under our model
- Also called the **marginal likelihood** or **evidence** when used for model comparison
- Serves as the normalizing constant in [[Bayes' Theorem]]

## Uses

1. **Model checking**: compare observed data to the prior predictive to assess whether the model is reasonable *a priori*
2. **Model comparison**: the ratio $p(y|M_1)/p(y|M_2)$ is the [[Bayes Factor]] for comparing models
3. **Normalization**: ensures the posterior integrates to 1

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- formal definition
- [[Posterior Predictive Distribution]] -- the analogous concept after observing data
- [[BDA3 - Ch07 - Evaluating, Comparing, and Expanding Models]] -- use in model comparison
