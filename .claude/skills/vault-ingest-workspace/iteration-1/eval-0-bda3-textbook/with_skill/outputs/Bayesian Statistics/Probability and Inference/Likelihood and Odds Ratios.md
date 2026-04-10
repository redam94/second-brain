---
title: "Likelihood and Odds Ratios"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - type/definition
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.3, pp. 7-8"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Bayes Theorem]]"
  - "[[Statistical Notation and Framework]]"
used_by:
  - "[[Discrete Bayesian Examples]]"
aliases:
  - Likelihood function
  - Likelihood principle
  - Posterior odds
  - Likelihood ratio
  - Odds ratio in Bayesian inference
---

# Likelihood and Odds Ratios

> [!summary]
> The likelihood function $p(y|\theta)$, viewed as a function of $\theta$ for fixed $y$, is the sole channel through which data influence the posterior in Bayesian inference (the likelihood principle). Posterior odds equal prior odds multiplied by the likelihood ratio, providing an intuitive decomposition of how evidence updates beliefs.

## Overview

The likelihood function and the odds representation of Bayes' theorem provide two complementary perspectives on how data inform inference. The likelihood function isolates the data's contribution, while the odds formulation makes the multiplicative update structure of Bayesian learning transparent.

## Main Content

> [!definition] Definition: Likelihood Function (BDA3, Ch. 1, Sec. 1.3, p. 7)
> Using Bayes' rule with a chosen probability model means that the data $y$ affect the posterior inference (Eq. 1.2) *only* through $p(y|\theta)$, which, when regarded as a function of $\theta$ for fixed $y$, is called the **likelihood function**. In this way Bayesian inference obeys the **likelihood principle**.
>
> **Key distinction:** The likelihood function $L(\theta) = p(y|\theta)$ is *not* a probability distribution over $\theta$. It is a set of conditional probabilities of a particular outcome ($y$) evaluated at different values of $\theta$.
^def-likelihood

> [!definition] Definition: Posterior Odds and Likelihood Ratio (BDA3, Ch. 1, Sec. 1.3, Eq. 1.5)
> The ratio of the posterior density $p(\theta|y)$ evaluated at the points $\theta_1$ and $\theta_2$ is called the **posterior odds** for $\theta_1$ compared to $\theta_2$:
> $$\frac{p(\theta_1|y)}{p(\theta_2|y)} = \frac{p(\theta_1)p(y|\theta_1)/p(y)}{p(\theta_2)p(y|\theta_2)/p(y)} = \frac{p(\theta_1)}{p(\theta_2)} \cdot \frac{p(y|\theta_1)}{p(y|\theta_2)} \tag{1.5}$$
>
> In words: **posterior odds = prior odds $\times$ likelihood ratio**.
>
> The **likelihood ratio** $p(y|\theta_1)/p(y|\theta_2)$ quantifies the relative support the data provide for $\theta_1$ versus $\theta_2$.
^def-posterior-odds

### The Likelihood Principle

The likelihood principle states that all the information that the data provide about $\theta$ is contained in the likelihood function. This principle is reasonable, but only within the framework of the model or family of models adopted for a particular analysis. In practice, one can rarely be confident that the chosen model is correct -- sampling distributions can play an important role in checking model assumptions (Chapter 6).

## Examples

> [!example] Example: Odds Form of Bayes' Rule (BDA3, Ch. 1, Sec. 1.3)
> **Setup:** For discrete parameters where $\theta_2$ is taken to be the complement of $\theta_1$, the posterior odds formulation is particularly intuitive.
>
> **Application:** If the prior odds are $1:1$ (equal prior probability) and the likelihood ratio is $4:1$, then the posterior odds are $4:1$, corresponding to a posterior probability of $4/5 = 0.80$ for $\theta_1$.
>
> **Interpretation:** This multiplicative structure makes it easy to see how data update beliefs sequentially -- each new piece of data multiplies the current odds by its likelihood ratio.

## Connections

- The likelihood ratio is the key quantity in **Bayes factors** for model comparison (Chapter 7, Sec. 7.4)
- The likelihood principle connects Bayesian inference to the broader philosophy of statistical evidence
- An applied Bayesian statistician is one who is willing to apply Bayes' rule under a variety of possible models, recognizing that the likelihood depends on model choice
- The odds formulation makes sequential updating transparent, as demonstrated in the [[Discrete Bayesian Examples]] genetics example

## See Also
- [[Bayes Theorem]] — The full theorem from which odds and likelihood are derived
- [[Discrete Bayesian Examples]] — Worked examples using likelihood ratios and odds
- [[Predictive Distributions]] — The marginal likelihood $p(y)$ cancels in the odds form
