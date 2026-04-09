---
title: "Index: Regression Models"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
---

# Regression Models

> [!abstract] Summary
> BDA3 Part IV (Chapters 14-18): Bayesian approaches to regression — linear, hierarchical/multilevel, generalized linear models, and missing data handling via multiple imputation. Extended with PyMC tutorials on counterfactual inference, moderation analysis, and missing data (Statistical Rethinking).

## Notes

- [[Bayesian Linear Regression]] — Priors as regularization, ridge/lasso/horseshoe, causal inference with regression
- [[Hierarchical Linear Models]] — Varying intercepts and slopes, multilevel regression, election forecasting
- [[Generalized Linear Models]] — Logistic, Poisson, weakly informative priors for GLMs
- [[Missing Data Models]] — Multiple imputation, MCAR/MAR/MNAR, Rubin's rules
- [[Counterfactual Inference]] — Bayesian counterfactual prediction (excess COVID deaths); the do-operator via posterior predictive sampling
- [[Moderation Analysis]] — Interaction effects: how a moderator $m$ changes the $x \to y$ slope; spotlight graphs
- [[Missing Data - Statistical Rethinking]] — DAG-based missing data analysis (Lecture 18); MCAR/MAR/MNAR through the lens of causal graphs

### From Statistical Rethinking
- [[Linear Models in Statistical Rethinking]] — Gaussian models, MAP estimation, prior predictive simulation, prediction intervals
- [[Spurious Association and Confounds]] — Multivariate regression, Waffle House example, post-treatment bias, masked relationships

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part IV (pp. 351-467)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015), Chapters 4–5
- [[raw/Counterfactual inference calculating excess deaths due to COVID-19]] — PyMC example: counterfactual time series regression, England & Wales deaths
- [[raw/Bayesian moderation analysis]] — PyMC example: moderation analysis with training × age on muscle mass
- [[raw/Missing Data]] — PyMC port of Statistical Rethinking 2023, Lecture 18 (McElreath)
