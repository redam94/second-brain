---
title: "Overfitting and Information Criteria"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/model-comparison
  - topic/information-theory
  - topic/overfitting
  - type/concept
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-07-27
folder: "Bayesian Statistics/Model Assessment"
aliases:
  - "WAIC"
  - "DIC"
  - "AIC"
  - "Information criteria"
  - "Regularization"
  - "KL divergence"
doc_type: concept
source_location: "Statistical Rethinking Ch.9:267-290"
depends_on:
  - "[[Linear Models in Statistical Rethinking]]"
  - "[[Model Comparison]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Monsters and Mixtures]]"
  - "[[Decision Analysis]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
---

# Overfitting and Information Criteria

> [!summary]
> Chapter 6 of Statistical Rethinking covers the bias-variance tradeoff using the metaphors of Scylla (overfitting) and Charybdis (underfitting). Introduces information theory, KL divergence, and information criteria (AIC, DIC, WAIC) as tools for navigating this tradeoff. Also covers regularizing priors as a Bayesian alternative.

## The Problem with Parameters

- **$R^2$ always increases** with more parameters — even random predictors improve in-sample fit
- **More complex models overfit** — they learn noise and predict new data worse
- **Simpler models underfit** — they miss real patterns

The brain-size example (6 hominin species): a 5th-degree polynomial achieves $R^2 = 0.99$ but predicts *negative* brain volumes between data points.

## Two Families of Solutions

### 1. Regularizing Priors

Informative priors that are skeptical of extreme parameter values:
- Prevent overfitting by keeping parameters modest
- The Bayesian version of "penalized likelihood" / ridge / lasso
- See [[Bayesian Linear Regression]] for specific prior choices (horseshoe, etc.)

### 2. Information Criteria

Score models on **out-of-sample predictive accuracy** estimated from in-sample fit.

## Information Theory Foundations

**Kullback-Leibler divergence** measures the distance from a model $q$ to the true distribution $p$:

$$D_{KL}(p, q) = \sum_i p_i \log\frac{p_i}{q_i}$$

We can't compute $D_{KL}$ directly (don't know $p$), but we can estimate *differences* in $D_{KL}$ between models using **deviance**:

$$D = -2 \sum_i \log q(y_i)$$

## The Criteria Zoo

| Criterion | Formula | Assumptions |
|-----------|---------|-------------|
| **AIC** | $D_{\text{train}} + 2k$ | Flat priors, Gaussian posterior, $n \gg k$ |
| **DIC** | $\bar{D} + p_D$ where $p_D = \bar{D} - D(\bar{\theta})$ | Point-estimate posterior |
| **WAIC** | $-2(\text{lppd} - p_{\text{WAIC}})$ | Fully Bayesian, pointwise |

WAIC is the most general: it uses the full posterior, makes no Gaussian approximation, and computes the effective number of parameters pointwise.

> [!tip] WAIC is Preferred
> Among information criteria, WAIC is the most Bayesian and makes the fewest assumptions. It converges to AIC when priors are flat and the posterior is Gaussian.

## See Also

- [[Model Comparison]] — BDA3's treatment of model comparison (Ch 7)
- [[Model Checking]] — posterior predictive checks, complementary to information criteria
- [[Bayesian Linear Regression]] — regularizing priors in regression context
- [[Linear Models in Statistical Rethinking]] — the models this chapter evaluates
- [[Statistical Rethinking - Overview]]
- [[Hierarchical Models]] — partial pooling is a form of regularization that directly reduces effective model complexity
- [[Bayesian Workflow - Overview]] — information criteria (WAIC/LOO) are the quantitative tools in the iterative model comparison step
- [[Probability and Bayesian Inference]] — KL divergence and the log score are grounded in the probability theory introduced there
- [[Model Selection and Exploratory Analysis]] — applies AIC/BIC and cross-validation in the market response modeling context (Ch. 5 of Hanssens et al.)
