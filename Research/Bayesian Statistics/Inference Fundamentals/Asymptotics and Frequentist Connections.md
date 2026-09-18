---
title: "Asymptotics and Frequentist Connections"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/asymptotics
  - topic/frequentist
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-07-06
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Bayesian central limit theorem"
  - "Bernstein-von Mises"
doc_type: concept
source_location: "BDA3 Ch.4, pp. 83-100"
depends_on:
  - "[[Multiparameter Models]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Approximation Methods]]"
  - "[[Regression and the CEF]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[BDA3 - Overview]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Four Meanings of Calibration]]"
---

# Asymptotics and Frequentist Connections

> [!summary]
> Chapter 4 of BDA3 shows that under regularity conditions, the posterior distribution converges to a normal distribution centered at the MLE as $n \to \infty$. This bridges Bayesian and frequentist approaches.

## Normal Approximation to the Posterior

For large $n$, the posterior is approximately:

$$p(\theta \mid y) \approx N\!\left(\hat{\theta}, [I(\hat{\theta})]^{-1}\right)$$

where $\hat{\theta}$ is the posterior mode (asymptotically equal to the MLE) and $I(\hat{\theta})$ is the observed Fisher information matrix. This is related to the **Bernstein-von Mises theorem**.

## Large-Sample Theory

- The prior becomes irrelevant as $n \to \infty$ — data dominate
- Bayesian credible intervals and frequentist confidence intervals coincide asymptotically
- The normal approximation can be used as a quick computational shortcut (see [[Approximation Methods]])

## Counterexamples

The normal approximation fails when:
- **Underidentified models**: posterior does not concentrate
- **Near boundaries**: parameters near the edge of parameter space
- **Multimodal posteriors**: mixture-like structure
- **Number of parameters grows with $n$**: the prior never becomes negligible

## Frequency Evaluations of Bayesian Procedures

- Bayesian point estimates and intervals often have good frequentist properties
- [[Hierarchical Models]] provide a natural framework: partial pooling yields estimators that dominate classical ones (James-Stein phenomenon)
- Bayesian methods can be interpreted as regularized frequentist procedures

## See Also

- [[Multiparameter Models]] — the setting where these asymptotics apply
- [[Approximation Methods]] — computational use of these ideas (Laplace approximation)
- [[Regression and the CEF]] — frequentist regression; asymptotically equivalent to Bayesian under flat priors
- [[Standard Errors and Clustering]] — frequentist inference machinery; Bayesian posteriors approximate robust SEs asymptotically
- [[Partial Pooling as Multiple Comparisons Correction]] — the James-Stein estimator mentioned here (hierarchical models dominate unpooled ones) is a key result connecting Bayesian shrinkage to frequentist asymptotics
