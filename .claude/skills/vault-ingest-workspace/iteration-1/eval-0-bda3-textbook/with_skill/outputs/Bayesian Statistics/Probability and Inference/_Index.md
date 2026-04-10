---
title: "Index: Probability and Inference"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 8
---

# Probability and Inference

> [!abstract] Routing Summary
> This folder covers the foundational concepts of Bayesian inference from BDA3 Chapter 1. Contains 8 notes spanning the three-step Bayesian workflow, notation, Bayes' theorem, exchangeability, predictive distributions, likelihood, and worked examples.
> - Need the Bayesian workflow? --> [[Three Steps of Bayesian Data Analysis]]
> - Need notation conventions ($\theta$, $y$, $\tilde{y}$)? --> [[Statistical Notation and Framework]]
> - Need Bayes' rule / posterior formula? --> [[Bayes Theorem]]
> - Need exchangeability definition? --> [[Exchangeability]]
> - Need prior/posterior predictive? --> [[Predictive Distributions]]
> - Need likelihood function or odds? --> [[Likelihood and Odds Ratios]]
> - Need worked examples (genetics, spelling)? --> [[Discrete Bayesian Examples]]
> - Need probability interpretation? --> [[Probability as Measure of Uncertainty]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Three steps of BDA | [[Three Steps of Bayesian Data Analysis]] | concept | -- | Model, condition, evaluate (iterate) |
| Notation ($\theta$, $y$, $\tilde{y}$, $x$) | [[Statistical Notation and Framework]] | concept | -- | Greek for params, Roman for data |
| Exchangeability | [[Exchangeability]] | definition | [[Statistical Notation and Framework]] | $p(y_1,\ldots,y_n)$ invariant to permutation |
| Bayes' rule | [[Bayes Theorem]] | theorem | [[Statistical Notation and Framework]], [[Three Steps of Bayesian Data Analysis]] | $p(\theta\|y) \propto p(\theta)p(y\|\theta)$ |
| Predictive distributions | [[Predictive Distributions]] | definition | [[Bayes Theorem]] | $p(\tilde{y}\|y) = \int p(\tilde{y}\|\theta)p(\theta\|y)d\theta$ |
| Likelihood & odds | [[Likelihood and Odds Ratios]] | concept | [[Bayes Theorem]] | Posterior odds = prior odds $\times$ likelihood ratio |
| Discrete examples | [[Discrete Bayesian Examples]] | example | [[Bayes Theorem]], [[Likelihood and Odds Ratios]] | Hemophilia carrier, spelling correction |
| Probability as uncertainty | [[Probability as Measure of Uncertainty]] | concept | [[Bayes Theorem]] | Probability is empirical and measurable |

## Notes

- [[Three Steps of Bayesian Data Analysis]] -- CONTAINS: Definition of the three-step iterative process (model, condition, evaluate), motivation for Bayesian approach
- [[Statistical Notation and Framework]] -- CONTAINS: Definition of $\theta$, $y$, $\tilde{y}$, $x$; estimands; observational units; probability notation conventions
- [[Exchangeability]] -- CONTAINS: Definition of exchangeability, exchangeability with covariates, connection to iid, hierarchical exchangeability
- [[Bayes Theorem]] -- CONTAINS: Bayes' rule (Eq. 1.1), unnormalized posterior (Eq. 1.2), joint distribution decomposition
- [[Predictive Distributions]] -- CONTAINS: Prior predictive distribution (Eq. 1.3), posterior predictive distribution (Eq. 1.4), weighing example
- [[Likelihood and Odds Ratios]] -- CONTAINS: Likelihood function definition, likelihood principle, posterior odds formula (Eq. 1.5), likelihood ratio
- [[Discrete Bayesian Examples]] -- CONTAINS: Hemophilia carrier example (full prior-likelihood-posterior), sequential updating, spelling correction example (full computation with tables)
- [[Probability as Measure of Uncertainty]] -- CONTAINS: BDA3 pragmatic probability interpretation, calibration checking, contrast with frequentist and subjective views

## Sources
- [[raw/BDA3.pdf]] -- Bayesian Data Analysis, Third Edition (Gelman et al.), Chapter 1, pp. 3-13

## See Also
- [[BDA3 - Overview]] -- Overview of the full textbook structure
