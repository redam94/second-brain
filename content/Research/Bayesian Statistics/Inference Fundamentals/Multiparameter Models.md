---
title: "Multiparameter Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/multiparameter
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Nuisance parameters"
  - "Marginal posterior"
doc_type: concept
source_location: "BDA3 Ch.3, pp. 63-82"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Single-Parameter Models]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Asymptotics and Frequentist Connections]]"
  - "[[BDA3 - Overview]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
---

# Multiparameter Models

> [!summary]
> Chapter 3 of BDA3 extends Bayesian inference to models with multiple parameters. The key technique is averaging over "nuisance parameters" to obtain marginal posteriors for quantities of interest.

## Marginalizing Over Nuisance Parameters

For parameters $(\theta_1, \theta_2)$ where $\theta_2$ is a nuisance parameter:

$$p(\theta_1 \mid y) = \int p(\theta_1, \theta_2 \mid y)\, d\theta_2$$

This is conceptually clean but often analytically intractable — motivating computational methods in [[Introduction to Bayesian Computation|Part III]].

## Normal Data with Unknown Mean and Variance

With $y_i \sim N(\mu, \sigma^2)$ and a noninformative prior $p(\mu, \sigma^2) \propto \sigma^{-2}$:

1. **Marginal posterior for $\sigma^2$**: scaled inverse-$\chi^2$ distribution
2. **Conditional posterior**: $\mu \mid \sigma^2, y \sim N(\bar{y}, \sigma^2/n)$
3. **Marginal posterior for $\mu$**: $\frac{\mu - \bar{y}}{s/\sqrt{n}} \mid y \sim t_{n-1}$ — recovering the familiar $t$-distribution

## Other Models Covered

- **Multinomial model**: Dirichlet-multinomial conjugacy for categorical data
- **Multivariate normal**: conjugate analysis with known/unknown covariance
- **Bioassay example**: logistic regression with two parameters — non-conjugate, requires grid or simulation methods

## Key Insight

> [!tip]
> With simulation, multiparameter problems reduce to repeated single-parameter problems: draw from the joint posterior, then examine marginals by simply looking at individual components.

## See Also

- [[Single-Parameter Models]] — the building blocks
- [[Asymptotics and Frequentist Connections]] — large-sample behavior
- [[Bayesian Linear Regression]] — the full regression setting
