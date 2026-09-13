---
title: "Probability and Bayesian Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/probability
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Bayes' theorem"
  - "Bayesian inference"
doc_type: concept
source_location: "BDA3 Ch.1, pp. 3-28"
depends_on:
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Single-Parameter Models]]"
  - "[[Garden of Forking Data]]"
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Decision Analysis]]"
  - "[[BDA3 - Overview]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
---

# Probability and Bayesian Inference

> [!summary]
> Chapter 1 of BDA3 establishes the three steps of Bayesian data analysis and the notation used throughout the book. Bayesian inference treats all unknowns as random variables with probability distributions.

## The Three Steps of Bayesian Data Analysis

1. **Set up a full probability model** — a joint distribution $p(\theta, y)$ for all observable and unobservable quantities, consistent with domain knowledge
2. **Condition on observed data** — compute the posterior distribution $p(\theta \mid y)$
3. **Evaluate model fit** — check whether the model is adequate via [[Model Checking|posterior predictive checks]] and sensitivity analysis

## Core Formula

Bayes' theorem is the foundation:

$$p(\theta \mid y) = \frac{p(y \mid \theta)\, p(\theta)}{p(y)} \propto p(y \mid \theta)\, p(\theta)$$

where $p(\theta)$ is the **prior**, $p(y \mid \theta)$ is the **likelihood**, and $p(\theta \mid y)$ is the **posterior**.

## Key Concepts

- **Notation**: joint density $p(\theta, y) = p(\theta) \, p(y \mid \theta)$ — conditioning on the model $H$ is always implicit
- **Prediction**: posterior predictive distribution $p(\tilde{y} \mid y) = \int p(\tilde{y} \mid \theta)\, p(\theta \mid y)\, d\theta$
- **Law of total variance**: $\text{var}(u) = \text{E}(\text{var}(u \mid v)) + \text{var}(\text{E}(u \mid v))$
- **Computation**: simulation-based inference — draw $S$ samples from the posterior and use sample statistics as estimates (see [[Introduction to Bayesian Computation]])
- Uses R and Stan for computation (Appendix C)

## Summarizing Posterior Distributions

After computing $p(\theta \mid y)$, BDA3 recommends reporting (§1.3):

- **Point estimates**: posterior mean $\text{E}[\theta \mid y]$ or posterior median
- **Credible intervals**: central 95% interval $[\theta_{0.025}, \theta_{0.975}]$ (or highest density interval)
- **Tail probabilities**: $\Pr(\theta > 0 \mid y)$ for hypotheses of practical importance
- **Simulation-based summaries**: draw $S$ samples $\theta^{(s)} \sim p(\theta \mid y)$ and compute sample statistics directly (standard BDA3 workflow)

> [!definition] Definition: Posterior Predictive Distribution (BDA3 §1.4)
> The **posterior predictive distribution** integrates parameter uncertainty into predictions for new data $\tilde{y}$:
> $$p(\tilde{y} \mid y) = \int p(\tilde{y} \mid \theta)\, p(\theta \mid y)\, d\theta$$
> This differs from plug-in prediction $p(\tilde{y} \mid \hat{\theta})$ by propagating all posterior uncertainty.
^def-posterior-predictive

## Exchangeability

> [!definition] Definition: Exchangeability (BDA3 §1.2)
> A sequence of random variables $y_1, \ldots, y_n$ is **exchangeable** if their joint distribution is invariant to permutation: $p(y_1, \ldots, y_n) = p(y_{\pi(1)}, \ldots, y_{\pi(n)})$ for all permutations $\pi$.
>
> De Finetti's theorem: any exchangeable sequence has the form $p(y_1,\ldots,y_n) = \int \prod_i p(y_i \mid \theta) \, p(\theta) \, d\theta$ — exchangeability *justifies* the Bayesian model with i.i.d. observations conditional on $\theta$.
^def-exchangeability

Exchangeability is the foundational assumption that licenses treating observations as i.i.d. conditional on a parameter. It is weaker than i.i.d. (it allows within-sample dependence) but stronger than arbitrary dependence.

## Non-Informative and Weakly Informative Priors

BDA3 §1.5 discusses prior specification:
- **Non-informative**: $p(\theta) \propto 1$ (location) or $p(\theta) \propto 1/\theta$ (scale) — Jeffreys priors are invariant to reparameterization
- **Weakly informative**: priors that constrain to a plausible range without dominating the data — preferred in modern Bayesian workflow
- **Informative**: encode genuine prior knowledge; appropriate when expert information is available

## See Also

- [[Single-Parameter Models]] — first concrete applications of Bayes' theorem
- [[Hierarchical Models]] — modeling with multiple levels of uncertainty
- [[Bayesian Workflow - Overview]] — the full iterative workflow beyond these three steps
- [[Overfitting and Information Criteria]] — KL divergence and the information-theoretic score criteria are built on the probability framework here
- [[Model Checking]] — posterior predictive checks use the predictive distribution $p(\tilde{y} \mid y)$
