---
title: "Garden of Forking Data"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-updating
  - topic/probability
  - type/concept
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-04-13
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Bayesian updating"
  - "Grid approximation"
  - "Small world vs large world"
doc_type: concept
source_location: "Statistical Rethinking Ch.2, pp. 19-47"
depends_on:
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[raw/StatRethink-Bayes.pdf]]"
used_by:
  - "[[Posterior Sampling and Summarization]]"
---

# Garden of Forking Data

> [!summary]
> Chapter 2 of Statistical Rethinking introduces Bayesian inference through the metaphor of a "garden of forking data" — counting the ways data could have been produced under each possible parameter value. This chapter covers the globe-tossing example, Bayesian updating, and three computational approaches: grid approximation, quadratic approximation, and MCMC.

## Small Worlds and Large Worlds

- **Small world**: the self-contained logical world of the model, where all possibilities are known
- **Large world**: the real world, where the model is always an approximation

Bayesian inference guarantees optimal answers in the small world. Whether those answers are useful in the large world depends on how well the model captures reality.

## The Garden of Forking Data

For each possible parameter value $p$, count the number of paths through the data that are consistent with $p$. More consistent paths → higher plausibility.

This is Bayes' theorem in counting form:

$$\text{Posterior} \propto \text{Likelihood} \times \text{Prior}$$

The globe-tossing example: estimating the proportion of water on Earth by tossing a globe and recording "water" or "land."

## Components of the Model

Every Bayesian model has three components:
1. **Likelihood**: $\Pr(W, L | p) = \binom{W+L}{W} p^W (1-p)^L$ — the binomial distribution
2. **Prior**: initial plausibility of each $p$ value before seeing data
3. **Posterior**: updated plausibility after conditioning on data

> [!tip] Bayesian Updating is Sequential
> The posterior from one batch of data becomes the prior for the next. The final result is the same regardless of whether you update one observation at a time or all at once.

## Three Computational Engines

| Method | How it works | When to use |
|--------|-------------|-------------|
| Grid approximation | Evaluate posterior at discrete grid points | Small number of parameters |
| Quadratic (Laplace) approximation | Approximate posterior as Gaussian at the mode | Medium problems; see [[Approximation Methods]] |
| MCMC | Draw samples proportional to posterior | Complex models; see [[MCMC Basics]] |

## See Also

- [[Probability and Bayesian Inference]] — BDA3's formal treatment (Ch 1)
- [[Single-Parameter Models]] — the first worked examples extending the globe-tossing logic (BDA3 Ch 2)
- [[Posterior Sampling and Summarization]] — Ch 3, working with samples from the posterior
- [[Statistical Rethinking - The Golem of Prague]] — the philosophical setup
- [[Garden of Forking Paths]] — Gelman's related concept about researcher flexibility (different "garden")
- [[Statistical Rethinking - Overview]]
