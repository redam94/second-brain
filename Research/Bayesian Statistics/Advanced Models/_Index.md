---
title: "Index: Advanced Models"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-11
concept_count: 10
doc_type: index
folder: "Research/Bayesian Statistics/Advanced Models"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Advanced Models

> [!abstract] Routing Summary
> This folder covers nonlinear and nonparametric Bayesian models from BDA3 Part V plus PyMC tutorials. Contains 10 notes. (Rank dependence measures moved to [[Extensions/_Index|Econometrics/Extensions]].)
> - Need GPs, splines, or Dirichlet processes? -> [[Nonparametric Models Overview]]
> - Need factor analysis or probabilistic PCA? -> [[Factor Analysis and PPCA]]
> - Need fast GP approximation (HSGP)? -> [[Hilbert Space Gaussian Processes]]
> - Need spatial areal models (ICAR)? -> [[Spatial Models - BYM]]
> - Need BART-based causal inference? -> [[Nonparametric Causal Inference]]
> - Need Bayesian propensity scores / IPW (Liao-Zigler method)? -> [[Bayesian Inverse Probability Weighting]]

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
| Maximum entropy GLMs, zero-inflated Poisson, ordered categorical | [[Monsters and Mixtures]] | concept | [[Generalized Linear Models]], [[Linear Models in Statistical Rethinking]], [[Hierarchical Models]], [[Overfitting and Information Criteria]] | Entropy-based justification for link functions |
| Bayesian IPW, Liao-Zigler two-stage method, Rubin's rules | [[Bayesian Inverse Probability Weighting]] | concept | [[Nonparametric Causal Inference]], [[Directed Acyclic Graphs]], [[The Selection Problem]] | Posterior propensity scores propagate treatment-model uncertainty into ATE |

## Notes
- [[Nonparametric Models Overview]] — CONTAINS: Splines, basis functions, Gaussian processes, finite mixtures, Dirichlet processes, kernel methods
- [[Factor Analysis and PPCA]] — CONTAINS: Probabilistic PCA, factor analysis, identifiability constraints, amortized inference, minibatch ADVI
- [[Hilbert Space Gaussian Processes]] — CONTAINS: HSGP approximation, basis function expansion, time series decomposition, trend + seasonality
- [[Copula Estimation]] — CONTAINS: Gaussian copula, marginal-copula separation, two-stage Bayesian estimation, correlation matrices
- [[Spatial Models - BYM]] — CONTAINS: Besag-York-Mollie model, ICAR prior, unstructured random effects, NYC traffic data example
- [[Social Network Models]] — CONTAINS: Dyadic network models, reciprocity parameters, generalised giving, social ties analysis
- [[Confirmatory Factor Analysis and SEM]] — CONTAINS: CFA measurement models, SEM structural paths, latent variables, psychometric applications
- [[Nonparametric Causal Inference]] — CONTAINS: BART for causal inference, ATE/ATT estimation, propensity score weighting, treatment heterogeneity
- [[Monsters and Mixtures]] — CONTAINS: Maximum entropy GLMs, zero-inflated Poisson, beta-binomial, overdispersion, ordered categorical regression
- [[Bayesian Inverse Probability Weighting]] — CONTAINS: Frequentist IPW baseline, why Bayesian IPW fails naively, Liao-Zigler two-stage method, posterior propensity scores, Rubin's rules, brms/R implementation, mosquito net example

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
- [[raw/How to use Bayesian propensity scores and inverse probability weights]] — Andrew Heiss (2021-12-18): Liao-Zigler Bayesian IPW method in R/brms
