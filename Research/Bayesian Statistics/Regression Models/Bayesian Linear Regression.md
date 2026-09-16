---
title: "Bayesian Linear Regression"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regression
  - topic/regularization
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Bayesian regression"
  - "Bayesian lasso"
doc_type: concept
source_location: "BDA3 Ch.14:353-380"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[MCMC Basics]]"
  - "[[Bayesian Workflow - Overview]]"
used_by:
  - "[[Hierarchical Linear Models]]"
  - "[[Generalized Linear Models]]"
  - "[[Nonparametric Models Overview]]"
  - "[[Factor Analysis and PPCA]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
---

# Bayesian Linear Regression

> [!summary]
> Chapter 14 of BDA3 presents the Bayesian approach to linear regression. Priors on coefficients provide natural regularization, and the full posterior gives uncertainty intervals for predictions — not just point estimates.

## The Model

$$y \mid X, \beta, \sigma^2 \sim N(X\beta, \sigma^2 I)$$

With a noninformative prior $p(\beta, \sigma^2) \propto \sigma^{-2}$, the posterior for $\beta$ is a multivariate $t$ distribution centered at the OLS estimate $\hat{\beta}$ — the Bayesian and frequentist answers coincide.

## Regularization Through Priors

Informative priors on $\beta$ provide **regularization**:
- **Ridge-like**: $\beta_j \sim N(0, \tau^2)$ — shrinks coefficients toward zero
- **Lasso-like**: $\beta_j \sim \text{Laplace}(0, \lambda)$ — encourages sparsity
- **Horseshoe prior**: heavy-tailed, allows large signals while shrinking noise — state of the art for sparse problems (see gap #20 in [[Dream/_Index|Dream]])

## Key Topics

- **Causal inference**: regression for estimating treatment effects (incumbency and voting example) — connects to [[Regression and the CEF]]
- **Dimension reduction**: when $p$ is large relative to $n$, priors are essential
- **Unequal variances**: heteroscedastic models with $\text{var}(y_i) = \sigma_i^2$
- **Prior information**: incorporating external knowledge about coefficient magnitudes

## See Also

- [[Regression and the CEF]] — the frequentist perspective from Angrist & Pischke
- [[Hierarchical Linear Models]] — varying coefficients across groups
- [[Hierarchical Models]] — partial pooling as the multilevel generalization of this model
- [[Generalized Linear Models]] — extending beyond normality
- [[Omitted Variables Bias]] — Bayesian regularization (shrinkage) partially mitigates OVB in high-$p$ settings
- [[Conditional Independence Assumption]] — the assumption needed for causal interpretation of regression coefficients
- [[Bayesian Workflow - Overview]] — iterative model building context for regression
- [[MCMC Basics]] — computation for posterior inference when analytic forms are unavailable
- [[Statistical Rethinking - Overview]] — McElreath's pedagogical introduction to the same regression models from a code-first perspective
- [[Linear Models in Statistical Rethinking]] — McElreath's code-first treatment of the full linear model framework including priors and prediction
- [[Moderation Analysis]] — interaction terms as an extension of Bayesian linear regression
- [[Missing Data Models]] — Bayesian regression handles missing data naturally through the generative model
- Horseshoe and Regularized Horseshoe Priors — global-local shrinkage priors for sparse regression (Carvalho et al. 2010; Piironen & Vehtari 2017) — not yet ingested, tracked in [[Dream/_Index|Dream]] gap #20
