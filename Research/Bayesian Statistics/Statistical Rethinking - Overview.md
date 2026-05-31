---
title: "Statistical Rethinking: A Bayesian Course with Examples in R and Stan"
aliases:
  - "Statistical Rethinking"
  - "McElreath"
  - "SR"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/statistical-modeling
  - type/overview
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics"
authors:
  - Richard McElreath
year: 2015
doc_type: overview
source_location: "StatRethink pp. 1–469 (full text)"
depends_on:
  - "[[Statistical Rethinking - The Golem of Prague]]"
  - "[[Garden of Forking Data]]"
  - "[[Posterior Sampling and Summarization]]"
  - "[[Linear Models in Statistical Rethinking]]"
  - "[[Spurious Association and Confounds]]"
  - "[[HMC and Stan in Practice]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Monsters and Mixtures]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Bayesian Workflow - Overview]]"
used_by: []
---

# Statistical Rethinking

> [!summary]
> A pedagogical Bayesian course that teaches statistical modeling as **golem engineering** — building and understanding statistical models as purposeful machines, not black boxes. Emphasizes code-first learning with R and Stan, and argues against null hypothesis testing in favor of building and comparing multiple non-null models.

## Core Philosophy

McElreath frames statistics through the **Golem of Prague** metaphor: statistical models are powerful but mindless constructs that do exactly what they're told. Like the golem, they can be destructive if not carefully engineered. The book teaches three tools for responsible golem engineering:

1. **[[Probability and Bayesian Inference|Bayesian data analysis]]** — using probability to describe uncertainty
2. **[[Hierarchical Models|Multilevel models]]** — "it's parameters all the way down"
3. **[[Model Comparison|Model comparison with information criteria]]** — WAIC, DIC, and their information-theoretic foundations

## Structure

| Part          | Chapters | Topics                                                                                                                                                                  |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundations   | Ch 1–3   | [[Statistical Rethinking - The Golem of Prague\|Philosophy]],[[Garden of Forking Data\|Bayesian updating]],[[Posterior Sampling and Summarization\|Posterior sampling]] |
| Linear Models | Ch 4–7   | [[Linear Models in Statistical Rethinking\|Gaussian model]], [[Spurious Association and Confounds\|Multivariate regression]], interactions                              |
| MCMC & GLMs   | Ch 8–11  | [[HMC and Stan in Practice\|HMC/Stan]], [[Overfitting and Information Criteria\|Information theory]],[[Monsters and Mixtures\|GLMs,zero-inflation]]                     |
| Multilevel    | Ch 12–13 | Varying effects, [[Hierarchical Linear Models\|partial pooling]], Gaussian processes                                                                                    |
| Missing Data  | Ch 14–15 | Measurement error, imputation, concluding reflections                                                                                                                   |

## Key Principles

- **Hypotheses are not models**: multiple process models can produce the same statistical model, and vice versa — rejecting a null model tells you little
- **All models are wrong**: the goal is to build and compare useful ones, not to test whether one is "true"
- **Multilevel regression deserves to be the default**: papers not using multilevel approaches should have to justify *not* using them
- **Code is not optional**: understanding comes from implementation, not just theory
- **Fitting is easy, prediction is hard**: $R^2$ always improves with more parameters, but out-of-sample prediction does not

## Comparison with BDA3

| Aspect        | Statistical Rethinking                             | [[BDA3 - Overview\|BDA3]]                          |
| ------------- | -------------------------------------------------- | -------------------------------------------------- |
| Approach      | Course/pedagogical                                 | Reference/comprehensive                            |
| Math level    | Accessible, code-first                             | Rigorous, proof-heavy                              |
| Software      | R + Stan (`rethinking` package)                    | General (Stan, BUGS)                               |
| Emphasis      | Model building philosophy, causal thinking         | Posterior computation, theory                      |
| Unique topics | Golem metaphor, maximum entropy GLMs, Waffle House | Asymptotics, decision theory, nonparametric models |

## See Also

- [[BDA3 - Overview]] — the comprehensive Bayesian reference that complements this course
- [[Bayesian Workflow - Overview]] — the Gelman et al. paper that formalizes the iterative workflow McElreath teaches
- [[Forking Paths and Bayesian Approaches]] — McElreath's "garden of forking data" is related to Gelman's "garden of forking paths"
- [[Mostly Harmless Econometrics - Overview]] — frequentist causal inference toolkit; McElreath covers some of the same causal reasoning from a Bayesian angle
- [[Bayesian Linear Regression]] — BDA3's treatment of the same regression models McElreath introduces in Chapters 4-7
- [[Model Checking]] — posterior predictive checks are central to McElreath's iterative model-building philosophy (Ch. 6)
