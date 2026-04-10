---
title: "Section 1.3: Bayesian Inference"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.3
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/bayes-theorem
  - topic/posterior-distribution
  - topic/likelihood
created: 2026-04-09
---

# Section 1.3: Bayesian Inference

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

Bayesian statistical conclusions about a parameter $\theta$, or unobserved data $\tilde{y}$, are made in terms of *probability statements*. These statements are conditional on the observed value of $y$, written as $p(\theta|y)$ or $p(\tilde{y}|y)$. This section presents the core mathematical machinery of Bayesian inference.

## Probability Notation

> [!note] Notation Convention
> - $p(\cdot|\cdot)$ denotes a conditional probability density, with arguments determined by context
> - $p(\cdot)$ denotes a marginal distribution
> - The same notation is used for continuous density functions and discrete probability mass functions
> - When using a standard distribution: $\theta \sim \text{N}(\mu, \sigma^2)$ or $p(\theta) = \text{N}(\theta|\mu, \sigma^2)$
> - **Coefficient of variation**: $\text{sd}(\theta)/\text{E}(\theta)$
> - **Geometric mean**: $\exp(\text{E}[\log(\theta)])$
> - **Geometric standard deviation**: $\exp(\text{sd}[\log(\theta)])$

## Bayes' Rule

To make probability statements about $\theta$ given $y$, we begin with a *model* providing a **joint probability distribution** for $\theta$ and $y$:

$$p(\theta, y) = p(\theta)p(y|\theta)$$

where $p(\theta)$ is the [[Prior Distribution|prior distribution]] and $p(y|\theta)$ is the *sampling distribution* (or *data distribution*).

> [!theorem] Bayes' Rule (Equation 1.1)
> $$p(\theta|y) = \frac{p(\theta,y)}{p(y)} = \frac{p(\theta)p(y|\theta)}{p(y)}$$
> where $p(y) = \sum_\theta p(\theta)p(y|\theta)$ (discrete) or $p(y) = \int p(\theta)p(y|\theta)\,d\theta$ (continuous).

Since $p(y)$ does not depend on $\theta$ and, with fixed $y$, can be considered a constant:

> [!theorem] Unnormalized Posterior Density (Equation 1.2)
> $$p(\theta|y) \propto p(\theta)p(y|\theta)$$

The second term $p(y|\theta)$ is taken as a function of $\theta$, not of $y$. The primary task of Bayesian inference is to develop the model $p(\theta, y)$ and perform computations to summarize $p(\theta|y)$.

## Prediction

### Prior Predictive Distribution

> [!abstract] Definition: Prior Predictive Distribution (Equation 1.3)
> $$p(y) = \int p(y,\theta)\,d\theta = \int p(\theta)p(y|\theta)\,d\theta$$
> The marginal distribution of $y$, averaging over $\theta$. Called "prior" because it is not conditional on previous observations, and "predictive" because it is the distribution for a quantity that is observable.

### Posterior Predictive Distribution

> [!abstract] Definition: Posterior Predictive Distribution (Equation 1.4)
> $$p(\tilde{y}|y) = \int p(\tilde{y}|\theta)p(\theta|y)\,d\theta$$
> The distribution of a future observable $\tilde{y}$, conditional on observed data $y$. This is an average of conditional predictions over the posterior distribution of $\theta$.
>
> The last step uses the assumed conditional independence of $y$ and $\tilde{y}$ given $\theta$.

## Likelihood

> [!abstract] Definition: Likelihood Function
> The data $y$ affect the posterior inference (Eq. 1.2) *only* through $p(y|\theta)$, which, when regarded as a function of $\theta$ for fixed $y$, is called the **likelihood function**. Bayesian inference thereby obeys the [[Likelihood Principle|likelihood principle]].

The likelihood principle is reasonable but only within the framework of the model or family of models adopted. In practice, sampling distributions play an important role in checking model assumptions (see [[BDA3 - Ch06 - Model Checking]]).

## Likelihood and Odds Ratios

> [!theorem] Posterior Odds (Equation 1.5)
> $$\frac{p(\theta_1|y)}{p(\theta_2|y)} = \frac{p(\theta_1)}{p(\theta_2)} \cdot \frac{p(y|\theta_1)}{p(y|\theta_2)}$$
> The **posterior odds** equal the **prior odds** multiplied by the **likelihood ratio** $p(y|\theta_1)/p(y|\theta_2)$.

## Connections

- [[Bayes' Theorem]] is the central formula
- [[Prior Distribution]], [[Posterior Distribution]], [[Likelihood Function]] are the core components
- [[Prior Predictive Distribution]] and [[Posterior Predictive Distribution]] are key for model checking
- Applied in [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]]
