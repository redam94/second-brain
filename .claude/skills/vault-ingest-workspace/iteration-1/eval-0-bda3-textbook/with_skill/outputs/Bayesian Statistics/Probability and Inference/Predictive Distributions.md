---
title: "Predictive Distributions"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - type/definition
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.3, p. 7"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Bayes Theorem]]"
  - "[[Statistical Notation and Framework]]"
used_by:
  - "[[Discrete Bayesian Examples]]"
aliases:
  - Prior predictive distribution
  - Posterior predictive distribution
  - Marginal distribution of y
  - Predictive inference
---

# Predictive Distributions

> [!summary]
> Predictive distributions integrate over parameter uncertainty to produce distributions for observable quantities. The prior predictive distribution $p(y) = \int p(\theta)p(y|\theta)d\theta$ gives the distribution of data before observing anything, while the posterior predictive distribution $p(\tilde{y}|y) = \int p(\tilde{y}|\theta)p(\theta|y)d\theta$ gives predictions for new data after conditioning on observations. Both are central to model checking and forecasting.

## Overview

Predictive inference is the process of making probability statements about observable quantities, as opposed to parameters. Bayesian predictive distributions naturally account for parameter uncertainty by integrating (averaging) over the parameter space, producing predictions that are more honest about uncertainty than plug-in estimates.

## Main Content

> [!definition] Definition: Prior Predictive Distribution (BDA3, Ch. 1, Sec. 1.3, Eq. 1.3)
> Before the data $y$ are observed, the distribution of the unknown but observable $y$ is:
> $$p(y) = \int p(y, \theta)d\theta = \int p(\theta)p(y|\theta)d\theta \tag{1.3}$$
>
> This is often called the **marginal distribution of $y$**, but a more informative name is the *prior predictive distribution*: **prior** because it is not conditional on a previous observation of the process, and **predictive** because it is the distribution for a quantity that is observable.
^def-prior-predictive

> [!definition] Definition: Posterior Predictive Distribution (BDA3, Ch. 1, Sec. 1.3, Eq. 1.4)
> After the data $y$ have been observed, we can predict an unknown observable $\tilde{y}$ from the same process. The distribution of $\tilde{y}$ is called the **posterior predictive distribution**, posterior because it is conditional on the observed $y$ and predictive because it is a prediction for an observable $\tilde{y}$:
> $$p(\tilde{y}|y) = \int p(\tilde{y}, \theta|y)d\theta = \int p(\tilde{y}|\theta, y)p(\theta|y)d\theta = \int p(\tilde{y}|\theta)p(\theta|y)d\theta \tag{1.4}$$
>
> The last step follows from the assumed **conditional independence** of $y$ and $\tilde{y}$ given $\theta$.
>
> **Interpretation:** The posterior predictive distribution displays the predictions as an average of conditional predictions over the posterior distribution of $\theta$.
^def-posterior-predictive

### Derivation of the Posterior Predictive

The three-line derivation in Eq. 1.4 uses:
1. Marginalization over $\theta$: $p(\tilde{y}|y) = \int p(\tilde{y}, \theta|y)d\theta$
2. Chain rule: $p(\tilde{y}, \theta|y) = p(\tilde{y}|\theta, y)p(\theta|y)$
3. Conditional independence given $\theta$: $p(\tilde{y}|\theta, y) = p(\tilde{y}|\theta)$

The conditional independence assumption (step 3) means that once the parameters $\theta$ are known, the new observation $\tilde{y}$ does not depend on the old data $y$. This is a consequence of the iid assumption under [[Exchangeability]].

## Examples

> [!example] Example: Weighing an Object (BDA3, Ch. 1, Sec. 1.3)
> **Setup:** Let $y = (y_1, \ldots, y_n)$ be the vector of recorded weights of an object weighed $n$ times on a scale. Let $\theta = (\mu, \sigma^2)$ be the unknown true weight of the object and the measurement variance of the scale. Let $\tilde{y}$ be the yet-to-be-recorded weight in a planned new weighing.
>
> **Application:** The distribution of $\tilde{y}$ is the posterior predictive distribution, conditioning on the observed $y$ and averaging over the posterior uncertainty in $(\mu, \sigma^2)$. This naturally accounts for both measurement noise and parameter uncertainty.

## Connections

- The prior predictive distribution $p(y)$ is the normalizing constant in [[Bayes Theorem]] (Eq. 1.1) and is also called the **marginal likelihood** or **evidence**
- The posterior predictive distribution is the primary tool for **posterior predictive checking** (Chapter 6), where observed data are compared to data simulated from $p(\tilde{y}|y)$
- In model comparison (Chapter 7), the prior predictive $p(y)$ under different models is used to compute **Bayes factors**
- Predictive distributions naturally incorporate parameter uncertainty, unlike plug-in predictions that condition on a single point estimate $\hat{\theta}$

## See Also
- [[Bayes Theorem]] — Provides $p(\theta|y)$, which is integrated over in the posterior predictive
- [[Exchangeability]] — Justifies the conditional independence assumption in Eq. 1.4
- [[Statistical Notation and Framework]] — Defines $\theta$, $y$, $\tilde{y}$
