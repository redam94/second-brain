---
title: "Probability and Bayesian Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/probability
  - type/chapter-notes
source: "[[raw/BDA3.pdf]]"
source_location: "Chapter 1, pp. 1-31"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
doc_type: chapter-notes
depends_on:
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Single-Parameter Models]]"
  - "[[Multiparameter Models]]"
  - "[[Hierarchical Models]]"
  - "[[Garden of Forking Data]]"
  - "[[Statistical Rethinking - The Golem of Prague]]"
aliases:
  - "Bayes' theorem"
  - "Bayesian inference"
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

## See Also

- [[Single-Parameter Models]] — first concrete applications of Bayes' theorem
- [[Hierarchical Models]] — modeling with multiple levels of uncertainty
- [[Bayesian Workflow - Overview]] — the full iterative workflow beyond these three steps
