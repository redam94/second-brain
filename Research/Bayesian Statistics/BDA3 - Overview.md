---
title: "Bayesian Data Analysis 3rd Edition - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/overview
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "full book, pp. 1-673"
date_ingested: 2026-04-08
folder: "Bayesian Statistics"
doc_type: overview
depends_on: []
used_by: []
aliases:
  - "BDA3"
  - "Bayesian Data Analysis"
---

# Bayesian Data Analysis, 3rd Edition

> [!summary]
> The definitive textbook on Bayesian statistics by Gelman, Carlin, Stern, Dunson, Vehtari, and Rubin (2013, updated 2025). Covers Bayesian inference from first principles through advanced computation and modeling. Uses R and Stan throughout.

## Structure

### Part I: Fundamentals of Bayesian Inference (Ch 1-5)
- [[Probability and Bayesian Inference]] — Bayes' theorem, the three steps
- [[Single-Parameter Models]] — beta-binomial, conjugate priors
- [[Multiparameter Models]] — nuisance parameters, marginal posteriors
- [[Asymptotics and Frequentist Connections]] — normal approximation, BvM theorem
- [[Hierarchical Models]] — exchangeability, partial pooling, eight schools

### Part II: Fundamentals of Bayesian Data Analysis (Ch 6-9)
- [[Model Checking]] — posterior predictive checks, Bayesian p-values
- [[Model Comparison]] — WAIC, LOO-CV, Bayes factors
- [[Data Collection Models]] — ignorability, surveys, experiments
- [[Decision Analysis]] — utility, loss functions, optimal decisions

### Part III: Advanced Computation (Ch 10-13)
- [[Introduction to Bayesian Computation]] — simulation, importance sampling
- [[MCMC Basics]] — Gibbs sampler, Metropolis-Hastings, convergence
- [[Efficient MCMC]] — HMC, NUTS, Stan
- [[Approximation Methods]] — variational inference, Laplace, EP

### Part IV: Regression Models (Ch 14-18)
- [[Bayesian Linear Regression]] — priors as regularization
- [[Hierarchical Linear Models]] — varying intercepts/slopes
- [[Generalized Linear Models]] — logistic, Poisson, GLMs
- [[Missing Data Models]] — multiple imputation

### Part V: Nonlinear and Nonparametric Models (Ch 19-23)
- [[Nonparametric Models Overview]] — splines, GPs, mixtures, Dirichlet processes

## Key Themes

1. **Iterative model building**: start simple, check, expand — formalized in [[Bayesian Workflow - Overview]]
2. **Hierarchical modeling**: the core of applied Bayesian statistics
3. **Computation and software**: Stan as the modern platform
4. **Practical focus**: real examples over pure theory

## Authors

Andrew Gelman (Columbia), John Carlin (Melbourne), Hal Stern (UC Irvine), David Dunson (Duke), Aki Vehtari (Aalto), Donald Rubin (Harvard)

## See Also (Cross-Domain)

- [[Bayesian Workflow - Overview]] — the companion paper codifying applied workflow practice
- [[Mostly Harmless Econometrics - Overview]] — the frequentist/econometric counterpart to BDA3
- [[Forking Paths and Bayesian Approaches]] — Bayesian rationale for addressing multiple comparisons
