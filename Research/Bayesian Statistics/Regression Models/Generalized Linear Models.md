---
title: "Generalized Linear Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/glm
  - topic/logistic-regression
  - topic/poisson-regression
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Bayesian GLM"
  - "Logistic regression"
  - "Poisson regression"
doc_type: concept
source_location: "BDA3 Ch.16:405-432"
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[Monsters and Mixtures]]"
  - "[[Spatial Models - BYM]]"
  - "[[Counterfactual Inference]]"
  - "[[Moderation Analysis]]"
---

# Generalized Linear Models

> [!summary]
> Chapter 16 of BDA3 covers the Bayesian treatment of GLMs — logistic, Poisson, and other models with non-normal likelihoods. Bayesian priors provide regularization that is especially valuable for separation in logistic regression.

## GLM Framework

A GLM has three components:
1. **Distribution**: $y_i \sim \text{ExponentialFamily}(\eta_i)$
2. **Linear predictor**: $\eta_i = X_i \beta$
3. **Link function**: $g(\mu_i) = \eta_i$

| Model | Distribution | Link |
|-------|-------------|------|
| Linear regression | Normal | Identity |
| Logistic regression | Binomial | Logit |
| Poisson regression | Poisson | Log |

## Weakly Informative Priors for Logistic Regression

> [!tip]
> For logistic regression, a weakly informative prior like $\beta_j \sim t_7(0, 2.5)$ (on standardized predictors) prevents separation problems and stabilizes estimates when data are sparse.

## Key Applications

- **Overdispersed Poisson regression**: modeling police stops with extra-Poisson variation
- **State-level opinion estimation**: multilevel regression with poststratification (MRP)
- **Multivariate/multinomial responses**: extending to multiple outcome categories
- **Loglinear models**: for contingency table data

## See Also

- [[Bayesian Linear Regression]] — the normal special case
- [[Hierarchical Linear Models]] — adding group-level structure
- [[Nonparametric Models Overview]] — when GLM linearity is too restrictive
- [[Discrete Choice Models]] — GLMs with categorical/multinomial likelihood for econometric choice data
- [[Quantile Regression]] — Bayesian quantile regression uses the asymmetric Laplace, a GLM-family distribution
- [[Monsters and Mixtures]] — zero-inflated and hurdle extensions of Poisson/binomial GLMs for over-dispersed count data
