---
title: "Monsters and Mixtures"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/glm
  - topic/maximum-entropy
  - topic/zero-inflation
  - type/concept
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Advanced Models"
aliases:
  - "Maximum entropy"
  - "GLM in Statistical Rethinking"
  - "Zero-inflated models"
  - "Overdispersion"
doc_type: concept
source_location: "Statistical Rethinking Ch.9:267-290, Ch.10:291-329, Ch.11:331-353"
depends_on:
  - "[[Generalized Linear Models]]"
  - "[[Linear Models in Statistical Rethinking]]"
  - "[[Hierarchical Models]]"
  - "[[Overfitting and Information Criteria]]"
used_by:
  - "[[Nonparametric Models Overview]]"
  - "[[Generalized Linear Models]]"
---

# Monsters and Mixtures

> [!summary]
> Chapters 9–11 of Statistical Rethinking cover generalized linear models (GLMs) through the lens of maximum entropy, then extend to "monster" models: zero-inflated Poisson, beta-binomial, gamma-Poisson (negative binomial), and ordered categorical outcomes.

## Maximum Entropy and GLMs (Ch 9)

Why use exponential family distributions? Because they are the **maximum entropy** distributions for given constraints:

| Constraint | MaxEnt Distribution | Link |
|------------|-------------------|------|
| Known mean and variance | **Gaussian** | Identity |
| Two outcomes, constant $p$ | **Binomial** | Logit |
| Count of events, constant rate | **Poisson** | Log |

> [!tip] Nature Loves Entropy
> Exponential family distributions arise naturally because there are more ways to produce them than any other distribution with the same constraints. Using them is not an assumption about mechanism — it's the least informative choice.

The GLM framework:
$$y_i \sim \text{Distribution}(\theta_i)$$
$$f(\theta_i) = \alpha + \beta x_i$$

where $f$ is the **link function** that maps the linear model to the natural parameter.

## Counting and Classification (Ch 10)

### Binomial Regression (Logistic)
- Model binary or proportion outcomes
- **Logit link**: $\log\frac{p_i}{1-p_i} = \alpha + \beta x_i$
- Interpret on log-odds scale; exponentiate for odds ratios

### Poisson Regression
- Model counts when there's no known maximum
- **Log link**: $\log \lambda_i = \alpha + \beta x_i$
- Offset term for varying exposure: $\log \lambda_i = \log \tau_i + \alpha + \beta x_i$

## Monsters and Mixtures (Ch 11)

### Ordered Categorical (Ordinal)
- Cumulative logit model: each threshold gets its own intercept
- $\Pr(y_i \leq k) = \text{logit}^{-1}(\alpha_k - \phi_i)$

### Zero-Inflated Poisson
A mixture: with probability $p$ the outcome is always 0 (never even attempts); with probability $1-p$ it follows a Poisson process.

$$\Pr(y=0) = p + (1-p) e^{-\lambda}$$
$$\Pr(y=k, k>0) = (1-p) \frac{\lambda^k e^{-\lambda}}{k!}$$

### Over-Dispersed Models
When variance exceeds what the simple model predicts:
- **Beta-binomial**: continuous mixture of binomial probabilities
- **Gamma-Poisson** (negative binomial): continuous mixture of Poisson rates

These are the observational-level equivalents of multilevel models — they model unexplained heterogeneity without explicitly modeling groups.

## See Also

- [[Generalized Linear Models]] — BDA3's treatment (Ch 16)
- [[Discrete Choice Models]] — econometric discrete choice, a GLM application
- [[Overfitting and Information Criteria]] — model comparison for these models
- [[Hierarchical Models]] — multilevel models as an alternative to overdispersion mixtures
- [[Statistical Rethinking - Overview]]
