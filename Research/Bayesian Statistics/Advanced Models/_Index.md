---
title: "Index: Advanced Models"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-10
concept_count: 10
---

# Advanced Models

> [!abstract] Routing Summary
> This folder covers nonlinear and nonparametric Bayesian models from BDA3 Part V plus PyMC tutorials. Contains 9 notes.
> - Need GPs, splines, or Dirichlet processes? -> [[Nonparametric Models Overview]]
> - Need factor analysis or probabilistic PCA? -> [[Factor Analysis and PPCA]]
> - Need fast GP approximation (HSGP)? -> [[Hilbert Space Gaussian Processes]]
> - Need spatial areal models (ICAR)? -> [[Spatial Models - BYM]]
> - Need BART-based causal inference? -> [[Nonparametric Causal Inference]]
> - Need Bayesian propensity scores and IPW (Liao-Zigler method)? -> [[Bayesian Propensity Scores and IPW]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Splines, basis functions, GPs, finite mixtures, Dirichlet processes | [[Nonparametric Models Overview]] | overview | [[Bayesian Linear Regression]], [[Model Comparison]], [[Efficient MCMC]], [[Hierarchical Models]] | Flexible models that grow with data |
| Probabilistic PCA, factor analysis, identifiability, ADVI | [[Factor Analysis and PPCA]] | concept | [[Bayesian Linear Regression]], [[Nonparametric Models Overview]], [[Approximation Methods]], [[Generalized Linear Models]] | Constrained W matrix resolves rotational invariance |
| HSGP basis function expansion for fast GP inference | [[Hilbert Space Gaussian Processes]] | concept | [[Nonparametric Models Overview]], [[Bayesian Linear Regression]], [[Spatial Models - BYM]] | Basis expansion makes GPs O(nm^2) instead of O(n^3) |
| Gaussian copula for joint distributions | [[Copula Estimation]] | concept | [[Nonparametric Models Overview]], [[Factor Analysis and PPCA]], [[Hierarchical Linear Models]] | Model marginals and dependence separately |
| BYM model: ICAR prior + unstructured RE | [[Spatial Models - BYM]] | concept | [[Nonparametric Models Overview]], [[Hierarchical Linear Models]], [[Generalized Linear Models]], [[Hilbert Space Gaussian Processes]] | Spatial smoothing via neighborhood structure |
| Dyadic models for social networks | [[Social Network Models]] | concept | [[Copula Estimation]], [[Hierarchical Linear Models]], [[Spatial Models - BYM]], [[Generalized Linear Models]] | Reciprocity and generalised giving in networks |
| CFA and SEM for psychometric latent variables | [[Confirmatory Factor Analysis and SEM]] | concept | [[Factor Analysis and PPCA]], [[Hierarchical Models]], [[Spurious Association and Confounds]], [[Nonparametric Models Overview]] | Latent variable measurement models with structural paths |
| BART-based ATE/ATT with propensity scores | [[Nonparametric Causal Inference]] | concept | [[Nonparametric Models Overview]], [[Counterfactual Inference]], [[Data Collection Models]], [[Bayesian Linear Regression]] | Flexible causal effect estimation without parametric assumptions |
| Bayesian IPW, Liao-Zigler two-stage propensity score analysis | [[Bayesian Propensity Scores and IPW]] | concept | [[Directed Acyclic Graphs]], [[The Selection Problem]], [[Bayesian Workflow - Overview]] | Marginalise over posterior propensity scores via K outcome models + Rubin's rules |
| Maximum entropy GLMs, zero-inflated Poisson, ordered categorical | [[Monsters and Mixtures]] | concept | [[Generalized Linear Models]], [[Linear Models in Statistical Rethinking]], [[Hierarchical Models]], [[Overfitting and Information Criteria]] | Entropy-based justification for link functions |

## Notes
- [[Nonparametric Models Overview]] — CONTAINS: Splines, basis functions, Gaussian processes, finite mixtures, Dirichlet processes, kernel methods
- [[Factor Analysis and PPCA]] — CONTAINS: Probabilistic PCA, factor analysis, identifiability constraints, amortized inference, minibatch ADVI
- [[Hilbert Space Gaussian Processes]] — CONTAINS: HSGP approximation, basis function expansion, time series decomposition, trend + seasonality
- [[Copula Estimation]] — CONTAINS: Gaussian copula, marginal-copula separation, two-stage Bayesian estimation, correlation matrices
- [[Spatial Models - BYM]] — CONTAINS: Besag-York-Mollie model, ICAR prior, unstructured random effects, NYC traffic data example
- [[Social Network Models]] — CONTAINS: Dyadic network models, reciprocity parameters, generalised giving, social ties analysis
- [[Confirmatory Factor Analysis and SEM]] — CONTAINS: CFA measurement models, SEM structural paths, latent variables, psychometric applications
- [[Nonparametric Causal Inference]] — CONTAINS: BART for causal inference, ATE/ATT estimation, propensity score weighting, treatment heterogeneity
- [[Bayesian Propensity Scores and IPW]] — CONTAINS: IPTW definition, pseudo-populations, why Bayesian IPW is incompatible with standard Bayes, Liao-Zigler two-stage method, K posterior propensity score draws, Rubin's rules, mosquito net/malaria example
- [[Monsters and Mixtures]] — CONTAINS: Maximum entropy GLMs, zero-inflated Poisson, beta-binomial, overdispersion, ordered categorical regression

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part V (pp. 469-573)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015), Chapters 9-11
- [[raw/Factor analysis]] — PyMC tutorial: factor analysis and PPCA with identifiability fixes
- [[raw/Baby Births Modelling with HSGPs]] — PyMC HSGP tutorial: time series decomposition with Hilbert Space GPs
- [[raw/Bayesian copula estimation Describing correlated joint distributions]] — PyMC copula tutorial: Gaussian copula estimation
- [[raw/The Besag-York-Mollie Model for Spatial Data]] — PyMC BYM tutorial: areal spatial modelling on NYC traffic data
- [[raw/Social Networks]] — PyMC port of Statistical Rethinking Lecture 15: dyadic network models
- [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] — PyMC CFA/SEM case study
- [[raw/Bayesian Non-parametric Causal Inference]] — PyMC BART tutorial: non-parametric causal inference
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss blog (2021): Bayesian propensity scores and IPW via Liao-Zigler two-stage method
