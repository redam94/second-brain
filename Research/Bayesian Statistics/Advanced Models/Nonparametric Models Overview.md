---
title: "Nonparametric Models Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/nonparametric
  - topic/gaussian-processes
  - topic/mixture-models
  - topic/dirichlet-process
  - type/overview
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Advanced Models"
aliases:
  - "Gaussian processes"
  - "Mixture models"
  - "Dirichlet process"
  - "Splines"
  - "Basis functions"
doc_type: overview
source_location: "BDA3 Ch.19:471-486, Ch.20:487-498, Ch.21:501-516, Ch.22:519-543, Ch.23:545-573"
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Model Comparison]]"
  - "[[Efficient MCMC]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Hilbert Space Gaussian Processes]]"
  - "[[Nonparametric Causal Inference]]"
  - "[[Factor Analysis and PPCA]]"
  - "[[Spatial Models - BYM]]"
---

# Nonparametric Models Overview

> [!summary]
> Part V of BDA3 (Chapters 19-23) covers Bayesian approaches to flexible, nonparametric modeling — from splines and Gaussian processes to mixture models and Dirichlet processes. These allow the data to determine the functional form rather than imposing rigid parametric assumptions.

## Parametric Nonlinear Models (Ch 19)

- Nonlinear regression models (e.g., pharmacokinetics, dose-response)
- Hierarchical structure for population-level inference about nonlinear parameters

## Basis Function Models (Ch 20)

- **Splines**: piecewise polynomial fits with knots — smooth and flexible
- **Basis selection and shrinkage**: regularization over basis coefficients prevents overfitting
- Bayesian approach: prior on coefficients provides automatic smoothing

## Gaussian Process Models (Ch 21)

A **Gaussian process** defines a distribution over functions:

$$f \sim \mathcal{GP}(m(x), k(x, x'))$$

- Kernel function $k(x, x')$ encodes assumptions about smoothness and correlation
- Naturally provides uncertainty bands over the entire function
- Computationally $O(n^3)$ — challenging for large datasets

## Finite Mixture Models (Ch 22)

$$p(y \mid \theta) = \sum_{k=1}^K \lambda_k \, f(y \mid \phi_k)$$

- **Label switching**: posterior is invariant to permutation of component labels — requires care in interpretation
- Applications: clustering, density estimation, robust regression
- Hierarchical priors on $K$ or component parameters

## Dirichlet Process Models (Ch 23)

The **Dirichlet process** extends finite mixtures to an infinite number of components:

$$G \sim \text{DP}(\alpha, G_0)$$

- Concentration parameter $\alpha$ controls the number of clusters
- DP mixtures: nonparametric density estimation with automatic complexity selection
- Hierarchical DP: share clusters across groups

## See Also

- [[Bayesian Linear Regression]] — the parametric starting point
- [[Model Comparison]] — comparing parametric vs. nonparametric fits
- [[Efficient MCMC]] — computation for these complex models
