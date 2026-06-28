---
title: "Hierarchical Linear Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/multilevel-models
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Multilevel regression"
  - "Varying intercepts and slopes"
  - "Mixed effects models"
doc_type: concept
source_location: "BDA3 Ch.15:381-402"
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Hierarchical Models]]"
  - "[[Generalized Linear Models]]"
  - "[[Efficient MCMC]]"
used_by:
  - "[[Social Network Models]]"
  - "[[Spatial Models - BYM]]"
  - "[[Copula Estimation]]"
  - "[[Global-Local Shrinkage Priors]]"
---

# Hierarchical Linear Models

> [!summary]
> Chapter 15 of BDA3 extends [[Hierarchical Models]] to the regression setting. Coefficients vary across groups, partially pooled toward a common distribution — the Bayesian approach to mixed effects / multilevel models.

## Model Structure

For group $j = 1, \ldots, J$:

$$y_{ij} \mid \alpha_j, \beta_j, \sigma^2 \sim N(\alpha_j + x_{ij} \beta_j, \sigma^2)$$
$$\begin{pmatrix} \alpha_j \\ \beta_j \end{pmatrix} \sim N\!\left(\begin{pmatrix} \mu_\alpha \\ \mu_\beta \end{pmatrix}, \Sigma_{\alpha\beta}\right)$$

## Key Concepts

- **Varying intercepts**: $\alpha_j$ shifts baseline for each group (random intercepts)
- **Varying slopes**: $\beta_j$ allows different effects per group (random slopes)
- **Partial pooling**: groups with less data borrow more from the population — same principle as the [[Hierarchical Models|eight schools]] example
- **Computation**: reparameterization (centered vs. non-centered) critical for [[Efficient MCMC|HMC]] efficiency

## Applications

- **Forecasting elections**: varying intercepts/slopes across states (U.S. presidential elections)
- **ANOVA connection**: analysis of variance as a special case of hierarchical regression
- **Batching of variance components**: hierarchical structure for modeling heterogeneous variances

## See Also

- [[Bayesian Linear Regression]] — the non-hierarchical foundation
- [[Hierarchical Models]] — the general theory (Ch 5)
- [[Generalized Linear Models]] — hierarchical GLMs
- [[Differences-in-Differences]] — frequentist fixed effects approach; HLM is the Bayesian alternative for panel data
- [[Standard Errors and Clustering]] — clustering as a frequentist approach to the same grouped-data structure
- [[Nonparametric Models Overview]] — GP and mixture model extensions when parametric hierarchical structure is insufficient
- [[Global-Local Shrinkage Priors]] — shrinkage-prior view of the partial pooling used here
