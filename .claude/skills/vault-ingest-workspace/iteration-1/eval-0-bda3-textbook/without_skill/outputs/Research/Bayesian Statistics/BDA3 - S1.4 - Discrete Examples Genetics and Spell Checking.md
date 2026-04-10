---
title: "Section 1.4: Discrete Examples - Genetics and Spell Checking"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.4
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/bayes-theorem
  - topic/examples
created: 2026-04-09
---

# Section 1.4: Discrete Examples - Genetics and Spell Checking

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

Two discrete examples demonstrating [[Bayes' Theorem]] where the goal is inference about a particular discrete quantity rather than parameter estimation. These allow us to see the prior, likelihood, and posterior probabilities directly.

## Example 1: Inference About a Genetic Status

### Setup
- Hemophilia is X-chromosome-linked recessive: a male who inherits the gene is affected; a female carrying it on one of two X-chromosomes is not
- A woman has an affected brother, implying her mother is a carrier (one "good" and one "bad" hemophilia gene)
- Her father is not affected
- Unknown: is the woman a carrier ($\theta = 1$) or not ($\theta = 0$)?

### Prior Distribution
$$\Pr(\theta = 1) = \Pr(\theta = 0) = \tfrac{1}{2}$$

### Data and Likelihood
The woman has two sons, neither affected. Let $y_i = 1$ (affected) or $0$ (unaffected). Sons are exchangeable and conditionally independent given $\theta$:

$$\Pr(y_1{=}0, y_2{=}0 \mid \theta{=}1) = (0.5)(0.5) = 0.25$$
$$\Pr(y_1{=}0, y_2{=}0 \mid \theta{=}0) = (1)(1) = 1$$

### Posterior Distribution

> [!example] Applying Bayes' Rule
> $$\Pr(\theta{=}1|y) = \frac{(0.25)(0.5)}{(0.25)(0.5) + (1.0)(0.5)} = \frac{0.125}{0.625} = 0.20$$

Equivalently via odds: prior odds are $0.5/0.5 = 1$, likelihood ratio is $0.25/1 = 0.25$, so posterior odds are $1 \cdot 0.25 = 0.25$, giving probability $0.25/(1+0.25) = 0.20$.

### Sequential Updating
With a third unaffected son, use the previous posterior as the new prior:

$$\Pr(\theta{=}1 \mid y_1, y_2, y_3) = \frac{(0.5)(0.20)}{(0.5)(0.20) + (1)(0.80)} = 0.111$$

> [!tip] Key Insight
> Sequential analysis is natural in Bayesian inference: the previous posterior becomes the new prior distribution, and the entire calculation does not need to be redone.

If the third son were *affected*, the posterior probability of carrier status becomes 1 (ignoring mutation).

## Example 2: Spelling Correction

### Setup
Someone types "radom" -- is the intended word "random," "radon," or "radom"?

The unnormalized posterior for each candidate word $\theta$ is:
$$\Pr(\theta \mid y{=}\text{'radom'}) \propto p(\theta) \cdot \Pr(y{=}\text{'radom'} \mid \theta) \tag{1.6}$$

### Prior Distribution
Based on word frequencies from Google databases:

| $\theta$ | $p(\theta)$ |
|----------|------------|
| random | $7.60 \times 10^{-5}$ |
| radon | $6.05 \times 10^{-6}$ |
| radom | $3.12 \times 10^{-7}$ |

### Likelihood
Conditional probabilities from Google's spelling/typing error model:

| $\theta$ | $p(\text{'radom'} \mid \theta)$ |
|----------|------|
| random | 0.00193 |
| radon | 0.000143 |
| radom | 0.975 |

### Posterior Distribution

| $\theta$ | $p(\theta)p(\text{'radom'} \mid \theta)$ | $p(\theta \mid \text{'radom'})$ |
|----------|-----|-----|
| random | $1.47 \times 10^{-7}$ | 0.325 |
| radon | $8.65 \times 10^{-10}$ | 0.002 |
| radom | $3.04 \times 10^{-7}$ | 0.673 |

> [!example] Interpretation
> The typed word "radom" is about twice as likely to be correct as to be a typographical error for "random," and it is very unlikely to be a mistaken instance of "radon."

### Model Improvement with Context
The model can incorporate contextual information $x$:
$$p(\theta|x, y) \propto p(\theta|x)p(y|\theta, x)$$

If the document is a statistics book, "random" becomes more likely a priori, shifting the posterior.

## Key Takeaways

1. [[Bayes' Theorem]] provides a formal mechanism for combining prior information with data
2. Sequential updating is natural and elegant
3. Model checking is important -- if posterior probabilities seem unreasonable, this suggests the prior or likelihood needs refinement
4. Context can be incorporated to improve inference

## Connections

- Demonstrates [[Bayes' Theorem]], [[Prior Distribution]], [[Likelihood Function]], [[Posterior Distribution]]
- Sequential updating connects to online learning and adaptive methods
- Model checking theme continues in [[BDA3 - Ch06 - Model Checking]]
