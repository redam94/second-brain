---
title: "Single-Parameter Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/conjugate-priors
  - type/chapter-notes
source: "[[raw/BDA3.pdf]]"
source_location: "Chapter 2, pp. 33-61"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
doc_type: chapter-notes
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Multiparameter Models]]"
  - "[[Hierarchical Models]]"
aliases:
  - "Conjugate priors"
  - "Beta-binomial"
---

# Single-Parameter Models

> [!summary]
> Chapter 2 of BDA3 develops Bayesian inference for one-parameter models — the simplest cases where the posterior can often be computed analytically. The posterior is always a compromise between prior and data.

## Beta-Binomial Model

The canonical example: estimating a probability $\theta$ from binomial data $y \sim \text{Bin}(n, \theta)$.

- **Conjugate prior**: $\theta \sim \text{Beta}(\alpha, \beta)$
- **Posterior**: $\theta \mid y \sim \text{Beta}(\alpha + y, \beta + n - y)$
- **Posterior mean**: $\frac{\alpha + y}{\alpha + \beta + n}$ — a weighted average of the prior mean $\frac{\alpha}{\alpha+\beta}$ and sample proportion $\frac{y}{n}$

## Normal Model with Known Variance

For data $y_1, \ldots, y_n \sim N(\mu, \sigma^2)$ with $\sigma^2$ known and prior $\mu \sim N(\mu_0, \tau_0^2)$:

$$\mu \mid y \sim N\!\left(\frac{\frac{1}{\tau_0^2}\mu_0 + \frac{n}{\sigma^2}\bar{y}}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}},\; \frac{1}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}\right)$$

The posterior precision equals the sum of prior and data precisions.

## Key Concepts

- **Informative priors**: encode genuine prior knowledge (e.g., cancer rates from neighboring counties)
- **Noninformative priors**: attempt to "let the data speak" — uniform, Jeffreys' prior $p(\theta) \propto [I(\theta)]^{1/2}$
- **Weakly informative priors**: constrain to reasonable ranges without dominating the likelihood
- **Posterior summarization**: point estimates (mean, median, mode), credible intervals, posterior predictive distribution

## See Also

- [[Probability and Bayesian Inference]] — foundations
- [[Multiparameter Models]] — extending to multiple unknowns
- [[Hierarchical Models]] — priors informed by data from related groups
