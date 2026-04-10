---
title: "Bayes' Theorem"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.3, pp. 6-8"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Statistical Notation and Framework]]"
  - "[[Three Steps of Bayesian Data Analysis]]"
used_by:
  - "[[Predictive Distributions]]"
  - "[[Likelihood and Odds Ratios]]"
  - "[[Discrete Bayesian Examples]]"
aliases:
  - Bayes rule
  - Bayes' rule
  - Posterior distribution
  - Bayesian inference
---

# Bayes' Theorem

> [!summary]
> Bayes' theorem is the mathematical foundation of Bayesian inference. It provides the formula for computing the posterior distribution $p(\theta|y)$ by combining the prior distribution $p(\theta)$ with the likelihood $p(y|\theta)$. The unnormalized form $p(\theta|y) \propto p(\theta)p(y|\theta)$ is the workhorse of practical Bayesian computation.

## Overview

Bayesian statistical conclusions about a parameter $\theta$, or unobserved data $\tilde{y}$, are made in terms of probability statements conditional on the observed value of $y$. These probability statements are written as $p(\theta|y)$ or $p(\tilde{y}|y)$, also implicitly conditioning on known covariates $x$. This approach departs fundamentally from frequentist inference, which evaluates procedures over the distribution of possible $y$ values conditional on the true unknown value of $\theta$.

## Main Content

### The Joint Distribution

To make probability statements about $\theta$ given $y$, we begin with a *model* providing a **joint probability distribution** for $\theta$ and $y$. The joint distribution can be written as a product of two densities:

$$p(\theta, y) = p(\theta)p(y|\theta)$$

where:
- $p(\theta)$ is the **prior distribution** 
- $p(y|\theta)$ is the **sampling distribution** (or data distribution)

> [!theorem] Theorem: Bayes' Rule (BDA3, Ch. 1, Eq. 1.1)
> Conditioning on the known value of the data $y$, using the basic property of conditional probability, yields the **posterior** density:
> $$p(\theta|y) = \frac{p(\theta, y)}{p(y)} = \frac{p(\theta)p(y|\theta)}{p(y)} \tag{1.1}$$
> where $p(y) = \sum_\theta p(\theta)p(y|\theta)$ (discrete case) or $p(y) = \int p(\theta)p(y|\theta)d\theta$ (continuous case).
>
> The factor $p(y)$ does not depend on $\theta$ and, with fixed $y$, can be considered a constant, yielding the **unnormalized posterior density**:
> $$p(\theta|y) \propto p(\theta)p(y|\theta) \tag{1.2}$$
>
> **Significance:** The second term $p(y|\theta)$ is taken as a function of $\theta$, not of $y$. These formulas encapsulate the technical core of Bayesian inference: the primary task is to develop the model $p(\theta, y)$ and perform computations to summarize $p(\theta|y)$.
^thm-bayes-rule

### Components of Bayes' Rule

| Component | Symbol | Role |
|-----------|--------|------|
| Prior distribution | $p(\theta)$ | Encodes knowledge/uncertainty about $\theta$ before seeing data |
| Sampling distribution / Likelihood | $p(y\|\theta)$ | Probability of data given parameters |
| Marginal likelihood / Evidence | $p(y)$ | Normalizing constant; total probability of the data |
| Posterior distribution | $p(\theta\|y)$ | Updated belief about $\theta$ after observing $y$ |

## Examples

> [!example] Example: Interpreting the Posterior (BDA3, Ch. 1, Sec. 1.3)
> **Setup:** A Bayesian probability interval for an unknown quantity of interest can be directly regarded as having a high probability of containing the unknown quantity.
>
> **Contrast with frequentist:** A frequentist confidence interval can strictly be interpreted only in relation to a sequence of similar inferences that might be made in repeated practice. Most users of standard confidence intervals give them a Bayesian interpretation, which provides a strong impetus to the Bayesian viewpoint.

## Connections

- The unnormalized form (Eq. 1.2) is the basis for all MCMC methods (Part III), which only need to evaluate $p(\theta)p(y|\theta)$ up to a proportionality constant
- The prior distribution $p(\theta)$ is the subject of extensive treatment in Chapters 2 (informative priors, conjugate priors) and 2.8-2.9 (noninformative and weakly informative priors)
- The normalizing constant $p(y)$ becomes important in model comparison via Bayes factors (Chapter 7)
- The flexibility of the Bayesian framework means there is no impediment in principle to fitting models with many parameters and complicated multilayered probability specifications

## See Also
- [[Predictive Distributions]] — Extending Bayes' theorem to predict future observables
- [[Likelihood and Odds Ratios]] — The likelihood function and the likelihood principle
- [[Three Steps of Bayesian Data Analysis]] — Bayes' theorem implements Step 2
- [[Discrete Bayesian Examples]] — Concrete applications of Bayes' rule
- [[Statistical Notation and Framework]] — Notation used in all formulas
