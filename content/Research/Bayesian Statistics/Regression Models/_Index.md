---
title: "Index: Regression Models"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 9
---

# Regression Models

> [!abstract] Routing Summary
> This folder covers Bayesian regression from BDA3 Part IV, Statistical Rethinking Chapters 4-5, and PyMC tutorials. Contains 9 notes.
> - Need priors as regularization (ridge/lasso/horseshoe)? -> [[Bayesian Linear Regression]]
> - Need multilevel/varying slopes models? -> [[Hierarchical Linear Models]]
> - Need logistic or Poisson regression? -> [[Generalized Linear Models]]
> - Need missing data (multiple imputation or DAG-based)? -> [[Missing Data Models]] or [[Missing Data - Statistical Rethinking]]
> - Need counterfactual prediction or causal regression? -> [[Counterfactual Inference]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Priors as regularization, ridge/lasso/horseshoe | [[Bayesian Linear Regression]] | concept | [[Probability and Bayesian Inference]], [[MCMC Basics]], [[Bayesian Workflow - Overview]] | Priors encode regularization; horseshoe for sparsity |
| Varying intercepts/slopes, multilevel regression | [[Hierarchical Linear Models]] | concept | [[Bayesian Linear Regression]], [[Hierarchical Models]], [[Generalized Linear Models]], [[Efficient MCMC]] | Partial pooling improves out-of-sample prediction |
| Logistic, Poisson, weakly informative priors for GLMs | [[Generalized Linear Models]] | concept | [[Bayesian Linear Regression]], [[Hierarchical Linear Models]], [[Nonparametric Models Overview]] | Link functions connect linear predictor to outcome |
| Multiple imputation, MCAR/MAR/MNAR, Rubin's rules | [[Missing Data Models]] | concept | [[Data Collection Models]], [[Hierarchical Models]], [[MCMC Basics]] | Multiple imputation propagates missing-data uncertainty |
| Bayesian counterfactual prediction, do-operator | [[Counterfactual Inference]] | concept | [[Bayesian Linear Regression]], [[Generalized Linear Models]], [[Model Checking]], [[Spurious Association and Confounds]] | Posterior predictive sampling implements the do-operator |
| Interaction effects, moderator analysis, spotlight graphs | [[Moderation Analysis]] | concept | [[Spurious Association and Confounds]], [[Bayesian Linear Regression]], [[Generalized Linear Models]] | Moderation = how context changes causal effect size |
| DAG-based missing data (MCAR/MAR/MNAR via causal graphs) | [[Missing Data - Statistical Rethinking]] | concept | [[Missing Data Models]], [[Spurious Association and Confounds]], [[Data Collection Models]], [[Counterfactual Inference]] | DAGs clarify which missing-data mechanism applies |
| Gaussian models, MAP, prior predictive simulation | [[Linear Models in Statistical Rethinking]] | concept | [[Probability and Bayesian Inference]], [[Bayesian Workflow - Overview]] | Prior predictive simulation validates model assumptions |
| Multivariate regression, confounds, post-treatment bias | [[Spurious Association and Confounds]] | concept | [[Linear Models in Statistical Rethinking]], [[Bayesian Linear Regression]], [[Probability and Bayesian Inference]] | DAGs identify which variables to include/exclude |

## Notes
- [[Bayesian Linear Regression]] — CONTAINS: Priors as regularization, ridge/lasso/horseshoe, posterior predictive checks, causal interpretation
- [[Hierarchical Linear Models]] — CONTAINS: Varying intercepts and slopes, multilevel regression, election forecasting, partial pooling
- [[Generalized Linear Models]] — CONTAINS: Logistic regression, Poisson regression, weakly informative priors, link functions
- [[Missing Data Models]] — CONTAINS: Multiple imputation, MCAR/MAR/MNAR taxonomy, Rubin's rules, imputation diagnostics
- [[Counterfactual Inference]] — CONTAINS: Bayesian counterfactual time series, excess COVID deaths example, do-operator via posterior predictive
- [[Moderation Analysis]] — CONTAINS: Interaction terms, moderator variables, spotlight graphs, training x age on muscle mass example
- [[Missing Data - Statistical Rethinking]] — CONTAINS: DAG-based missing data analysis, MCAR/MAR/MNAR through causal graphs, imputation via DAGs
- [[Linear Models in Statistical Rethinking]] — CONTAINS: Gaussian models, MAP estimation, prior predictive simulation, prediction intervals
- [[Spurious Association and Confounds]] — CONTAINS: Multivariate regression, Waffle House divorce example, post-treatment bias, masked relationships, DAGs

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part IV (pp. 351-467)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015), Chapters 4-5
- [[raw/Counterfactual inference calculating excess deaths due to COVID-19]] — PyMC example: counterfactual time series regression
- [[raw/Bayesian moderation analysis]] — PyMC example: moderation analysis with interaction terms
- [[raw/Missing Data]] — PyMC port of Statistical Rethinking 2023, Lecture 18
