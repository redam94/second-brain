---
title: "Discrete Bayesian Examples"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/example
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.4, pp. 8-11"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Bayes Theorem]]"
  - "[[Likelihood and Odds Ratios]]"
  - "[[Statistical Notation and Framework]]"
used_by: []
aliases:
  - Genetics example
  - Hemophilia example
  - Spelling correction example
  - Discrete Bayes examples
---

# Discrete Bayesian Examples

> [!summary]
> Two worked examples demonstrate Bayes' theorem with discrete parameters: (1) inferring whether a woman is a carrier of the hemophilia gene based on her sons' health status, and (2) a spelling correction problem determining what word was intended when "radom" is typed. Both examples illustrate the full prior-likelihood-posterior workflow and the ease of sequential Bayesian updating.

## Overview

These examples demonstrate Bayes' theorem in cases where the parameter space is discrete and small, allowing exact computation of prior, likelihood, and posterior probabilities. They illustrate the core mechanics of Bayesian inference before moving to continuous-parameter models in Chapter 2.

## Main Content

### Example 1: Hemophilia Carrier Inference

> [!example] Example: Inference About Genetic Status (BDA3, Ch. 1, Sec. 1.4, pp. 8-9)
> **Setup:** Hemophilia is an X-chromosome-linked recessive disease. A woman whose mother is a carrier (her brother is affected) has a fifty-fifty chance of carrying the gene herself. Her father is unaffected. The unknown $\theta$ is binary: carrier ($\theta = 1$) or not ($\theta = 0$).
>
> **Prior distribution:**
> $$\Pr(\theta = 1) = \Pr(\theta = 0) = \frac{1}{2}$$
>
> **Data:** The woman has two sons, neither affected ($y_1 = 0, y_2 = 0$). Sons are exchangeable and, conditional on $\theta$, independent.
>
> **Likelihood:**
> $$\Pr(y_1 = 0, y_2 = 0 \mid \theta = 1) = (0.5)(0.5) = 0.25$$
> $$\Pr(y_1 = 0, y_2 = 0 \mid \theta = 0) = (1)(1) = 1$$
>
> If the woman is a carrier, each son has a 50% chance of being affected. If she is not a carrier, sons will be unaffected (ignoring rare mutations).
>
> **Posterior:**
> $$\Pr(\theta = 1 | y) = \frac{(0.25)(0.5)}{(0.25)(0.5) + (1.0)(0.5)} = \frac{0.125}{0.625} = 0.20$$
>
> **Interpretation:** Having two unaffected sons reduces the probability of being a carrier from 0.5 to 0.2. In odds terms: prior odds are $0.5/0.5 = 1$, the likelihood ratio is $0.25/1 = 0.25$, so posterior odds are $1 \cdot 0.25 = 0.25$, giving probability $0.25/(1+0.25) = 0.20$.
^ex-hemophilia

> [!example] Example: Sequential Updating in Hemophilia (BDA3, Ch. 1, Sec. 1.4, p. 9)
> **Setup:** The woman has a third unaffected son.
>
> **Solution:** Use the previous posterior as the new prior (sequential updating):
> $$\Pr(\theta = 1 | y_1, y_2, y_3) = \frac{(0.5)(0.20)}{(0.5)(0.20) + (1)(0.80)} = 0.111$$
>
> **Interpretation:** Each additional unaffected son further reduces the carrier probability. If the third son were affected, the posterior probability of being a carrier would become 1 (ignoring mutation). This demonstrates the ease of sequential Bayesian analysis -- previous posteriors become new priors without redoing the entire calculation.
^ex-hemophilia-sequential

### Example 2: Spelling Correction

> [!example] Example: Spelling Correction (BDA3, Ch. 1, Sec. 1.4, pp. 9-11)
> **Setup:** Someone types "radom." The task is to determine the intended word $\theta$ from three candidates: random, radon, or radom. Let $y$ = "radom" be the observed data.
>
> **Model:** The unnormalized posterior is:
> $$\Pr(\theta \mid y = \text{'radom'}) \propto p(\theta) \Pr(y = \text{'radom'} \mid \theta) \tag{1.6}$$
>
> **Prior distribution** (word frequencies from Google databases):
>
> | $\theta$ | $p(\theta)$ |
> |---------|-----------|
> | random | $7.60 \times 10^{-5}$ |
> | radon | $6.05 \times 10^{-6}$ |
> | radom | $3.12 \times 10^{-7}$ |
>
> **Likelihood** (conditional probabilities from Google's typing error model):
>
> | $\theta$ | $p(\text{'radom'}\|\theta)$ |
> |---------|----------------------|
> | random | 0.00193 |
> | radon | 0.000143 |
> | radom | 0.975 |
>
> The likelihood function is *not* a probability distribution -- it is a set of conditional probabilities from three different distributions for the same observed outcome.
>
> **Posterior:**
>
> | $\theta$ | $p(\theta)p(\text{'radom'}\|\theta)$ | $p(\theta\|\text{'radom'})$ |
> |---------|---------------------------|----------------------|
> | random | $1.47 \times 10^{-7}$ | 0.325 |
> | radon | $8.65 \times 10^{-10}$ | 0.002 |
> | radom | $3.04 \times 10^{-7}$ | 0.673 |
>
> **Interpretation:** The typed word "radom" is about twice as likely to be correct as to be a typographical error for "random," and it is very unlikely to be a mistaken instance of "radon." Despite "radom" being a very rare word, its high likelihood (97.5% chance of being typed as itself) outweighs its low prior.
>
> **Model checking insight:** The high prior probability of "radom" in the corpus seems surprising -- it is a city in Poland. This suggests the prior probabilities might not be appropriate for the application, illustrating the importance of model checking (Step 3 of [[Three Steps of Bayesian Data Analysis]]).
^ex-spelling-correction

## Connections

- Both examples use the exact same mathematical framework ([[Bayes Theorem]]), differing only in the specific prior and likelihood
- The hemophilia example demonstrates **sequential updating** -- a key practical advantage of Bayesian analysis
- The spelling correction example demonstrates **model checking** and the importance of choosing appropriate priors for the application at hand
- The spelling example also illustrates that the likelihood function is not a probability distribution (an important conceptual point from [[Likelihood and Odds Ratios]])
- These discrete examples allow exact computation; continuous parameters (Chapter 2) require integration techniques

## See Also
- [[Bayes Theorem]] — The theorem applied in both examples
- [[Likelihood and Odds Ratios]] — The odds formulation used in the hemophilia example
- [[Three Steps of Bayesian Data Analysis]] — The spelling example illustrates all three steps
- [[Exchangeability]] — The sons in the hemophilia example are treated as exchangeable
