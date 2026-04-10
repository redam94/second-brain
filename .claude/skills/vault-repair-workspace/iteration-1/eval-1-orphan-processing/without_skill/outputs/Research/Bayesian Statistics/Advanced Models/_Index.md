---
title: "Index: Advanced Models"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
---

# Advanced Models

> [!abstract] Summary
> BDA3 Part V (Chapters 19-23): Nonlinear and nonparametric Bayesian models -- splines, Gaussian processes, mixture models, and Dirichlet processes for flexible, data-driven modeling. Plus PyMC tutorials covering copulas, spatial models, social networks, HSGP time series, CFA/SEM, and non-parametric causal inference.

## Notes

- [[Nonparametric Models Overview]] -- Splines, basis functions, GPs, finite mixtures, Dirichlet processes
- [[Factor Analysis and PPCA]] -- Probabilistic PCA and factor analysis: identifiability, constrained $W$, amortized inference, minibatch ADVI
- [[Identifiability in Latent Variable Models]] -- Non-identifiability in FA/PPCA: rotational invariance, diagnostic symptoms, constrained parametrisation fix
- [[Amortized Inference]] -- Marginalizing latent variables for scalability: tradeoffs, minibatch ADVI, covariance inversion cost
- [[Post-hoc Factor Score Recovery]] -- Recovering factor scores after amortized fitting via conjugate posterior
- [[Hilbert Space Gaussian Processes]] -- HSGP approximation: basis function expansion for fast GP inference in time series
- [[Copula Estimation]] -- Gaussian copula for joint distributions with complex correlation; two-stage Bayesian estimation
- [[Spatial Models - BYM]] -- Besag-York-Mollie model: ICAR prior + unstructured RE for areal spatial data
- [[Social Network Models]] -- Dyadic models for social network analysis; reciprocity and generalised giving
- [[Confirmatory Factor Analysis and SEM]] -- CFA and SEM for psychometric latent variable models
- [[Nonparametric Causal Inference]] -- BART-based causal inference: ATE/ATT estimation with propensity scores

### From Statistical Rethinking
- [[Monsters and Mixtures]] -- Maximum entropy GLMs, zero-inflated Poisson, beta-binomial, overdispersion, ordered categorical

## Sources

- [[raw/BDA3.pdf]] -- Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part V (pp. 469-573)
- [[raw/Factor analysis]] -- PyMC tutorial: factor analysis and PPCA with identifiability fixes
- [[raw/Baby Births Modelling with HSGPs]] -- PyMC HSGP tutorial: time series decomposition with Hilbert Space GPs
- [[raw/Bayesian copula estimation Describing correlated joint distributions]] -- PyMC copula tutorial: Gaussian copula estimation
- [[raw/The Besag-York-Mollie Model for Spatial Data]] -- PyMC BYM tutorial: areal spatial modelling on NYC traffic data
- [[raw/Social Networks]] -- PyMC port of Statistical Rethinking Lecture 15: dyadic network models
- [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] -- PyMC CFA/SEM case study
- [[raw/Bayesian Non-parametric Causal Inference]] -- PyMC BART tutorial: non-parametric causal inference
