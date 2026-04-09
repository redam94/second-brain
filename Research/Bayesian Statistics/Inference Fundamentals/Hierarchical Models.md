---
title: "Hierarchical Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/partial-pooling
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Inference Fundamentals"
aliases:
  - "Multilevel models"
  - "Partial pooling"
  - "Eight schools"
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
- [[Local Average Treatment Effects]] — treatment effect heterogeneity in econometrics
