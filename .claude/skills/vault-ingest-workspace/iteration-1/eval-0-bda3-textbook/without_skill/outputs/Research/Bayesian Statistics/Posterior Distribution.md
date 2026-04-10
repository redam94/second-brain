---
title: "Posterior Distribution"
aliases:
  - "Posterior"
  - "posterior distribution"
  - "posterior density"
tags:
  - concept/definition
  - topic/bayesian-statistics
created: 2026-04-09
---

# Posterior Distribution

## Definition

> [!abstract] Definition
> The **posterior distribution** $p(\theta|y)$ is the conditional probability distribution of the unobserved quantities $\theta$, given the observed data $y$. It represents the updated state of knowledge after combining the [[Prior Distribution|prior]] with the [[Likelihood Function|likelihood]].

## Computation

Via [[Bayes' Theorem]]:
$$p(\theta|y) = \frac{p(\theta)p(y|\theta)}{p(y)} \propto p(\theta)p(y|\theta)$$

## Interpretation

- The posterior distribution is the complete Bayesian answer to an inference problem
- All inferences (point estimates, intervals, predictions) are derived from the posterior
- Bayesian probability intervals from the posterior can be directly interpreted as having a specified probability of containing the unknown quantity, unlike frequentist confidence intervals

## Common Summaries

| Summary | Formula | Purpose |
|---------|---------|---------|
| Posterior mean | $\text{E}[\theta\|y] = \int \theta \, p(\theta\|y)\,d\theta$ | Point estimate |
| Posterior median | $\tilde{\theta}$ such that $\Pr(\theta \leq \tilde{\theta}\|y) = 0.5$ | Robust point estimate |
| Posterior mode (MAP) | $\arg\max_\theta p(\theta\|y)$ | Point estimate |
| Credible interval | $[a,b]$ such that $\Pr(a \leq \theta \leq b\|y) = 1-\alpha$ | Interval estimate |
| Posterior variance | $\text{Var}(\theta\|y)$ | Uncertainty quantification |

## Key Properties

- **Sequential updating**: the posterior from previous data becomes the prior for new data
- **Data enter only through the likelihood**: the posterior depends on the data only through $p(y|\theta)$
- As data accumulate, the posterior concentrates around the true parameter value (under regularity conditions)

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- derivation
- [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]] -- worked examples
- [[BDA3 - Ch02 - Single-Parameter Models]] -- detailed posterior computations
