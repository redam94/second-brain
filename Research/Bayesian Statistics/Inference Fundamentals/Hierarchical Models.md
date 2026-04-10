---
title: "Hierarchical Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/partial-pooling
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Multilevel models"
  - "Partial pooling"
  - "Eight schools"
doc_type: concept
source_location: "BDA3 Ch.5, pp. 101-138"
depends_on:
  - "[[Single-Parameter Models]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[Multiparameter Models]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Hierarchical Linear Models]]"
  - "[[MCMC Basics]]"
  - "[[Computational Troubleshooting]]"
  - "[[Choosing and Building Models]]"
  - "[[Iterative Model Improvement]]"
  - "[[Evaluating Fitted Models]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
---

# Hierarchical Models

> [!summary]
> Chapter 5 of BDA3 introduces hierarchical (multilevel) models — the workhorse of applied Bayesian statistics. Parameters are modeled as exchangeable draws from a common population distribution, enabling partial pooling between groups.

## The Core Idea: Exchangeability

Parameters $\theta_1, \ldots, \theta_J$ are **exchangeable** if their joint distribution is invariant to permutations. By de Finetti's theorem, exchangeable parameters can be modeled as conditionally i.i.d. given hyperparameters:

$$\theta_j \mid \mu, \tau \sim N(\mu, \tau^2), \quad j = 1, \ldots, J$$

## The Eight Schools Example

The iconic example: estimating treatment effects from 8 educational coaching experiments.

- **No pooling**: each school's estimate $\hat{\theta}_j$ used independently (high variance)
- **Complete pooling**: one common effect $\theta$ (high bias if effects truly differ)
- **Partial pooling**: hierarchical model shrinks estimates toward the group mean — more for imprecise estimates, less for precise ones

$$\hat{\theta}_j^{\text{Bayes}} \approx \frac{\frac{1}{\sigma_j^2} y_j + \frac{1}{\tau^2} \mu}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}$$

## Structure of a Hierarchical Model

$$y_j \mid \theta_j \sim p(y_j \mid \theta_j) \quad \text{(data model)}$$
$$\theta_j \mid \phi \sim p(\theta_j \mid \phi) \quad \text{(group-level model)}$$
$$\phi \sim p(\phi) \quad \text{(hyperprior)}$$

## Key Concepts

- **Weakly informative hyperpriors**: half-Cauchy or half-$t$ priors on $\tau$ (group-level SD) avoid boundary issues
- **Meta-analysis**: hierarchical models are natural for combining results across studies
- Connects to [[Hierarchical Linear Models]] in the regression setting

## See Also

- [[Single-Parameter Models]] — building block for each group
- [[Bayesian Workflow - Overview]] — iterative building of hierarchical models
- [[Partial Pooling as Multiple Comparisons Correction]] — how partial pooling formally serves as a multiple comparisons correction (z-score shrinkage algebra)
- [[Multiple Comparisons - Bayesian Perspective]] — Gelman et al. (2009) on multilevel models replacing classical corrections
- [[Type S and Type M Errors]] — the error framework that motivates hierarchical modeling over classical corrections
- [[Local Average Treatment Effects]] — treatment effect heterogeneity in econometrics
- [[Differences-in-Differences]] — frequentist panel approach using similar exchangeability assumptions
- [[Instrumental Variables]] — complier heterogeneity parallels hierarchical variation across groups
